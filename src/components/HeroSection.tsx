"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

const SEARCH_PLACEHOLDER = "Enter an address, ZIP…";
const LISTINGS_MAP_PATH = "/listings/map";

type SearchMode = "buy" | "rent" | "sell";

interface HeroSearchFilters {
  pricePreset: "any" | "0-250" | "250-500" | "500-750" | "750-plus";
  bedsPreset: "any" | "1" | "2" | "3" | "4";
  bathsPreset: "any" | "1" | "2" | "3" | "4";
}

interface PlaceSuggestion {
  description: string;
  placeId: string;
}

interface GooglePlacePrediction {
  description: string;
  place_id: string;
}

interface GooglePlaceDetailsResult {
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface GooglePlacesAutocompleteService {
  getPlacePredictions: (
    request: {
      input: string;
      types?: string[];
      componentRestrictions?: { country: string };
    },
    callback: (
      predictions: GooglePlacePrediction[] | null,
      status?: string
    ) => void
  ) => void;
}

interface GooglePlacesDetailsService {
  getDetails: (
    request: { placeId: string; fields: string[] },
    callback: (place: GooglePlaceDetailsResult | null, status: string) => void
  ) => void;
}

interface GoogleMapsWithPlaces {
  places?: {
    AutocompleteService: new () => GooglePlacesAutocompleteService;
    PlacesService: new (container: HTMLElement) => GooglePlacesDetailsService;
  };
}

interface BuildListingsMapHrefParams {
  search?: string;
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  mode?: SearchMode;
}

function buildListingsMapHref(params: BuildListingsMapHrefParams): string {
  const url = new URL(LISTINGS_MAP_PATH, typeof window !== "undefined" ? window.location.origin : "https://sandstone.homes");
  const searchParams = url.searchParams;

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (typeof params.centerLat === "number" && Number.isFinite(params.centerLat)) {
    searchParams.set("lat", String(params.centerLat));
  }

  if (typeof params.centerLng === "number" && Number.isFinite(params.centerLng)) {
    searchParams.set("lng", String(params.centerLng));
  }

  if (typeof params.radiusMiles === "number" && params.radiusMiles > 0) {
    searchParams.set("radiusMiles", String(params.radiusMiles));
  }

  if (typeof params.minPrice === "number") {
    searchParams.set("minPrice", String(params.minPrice));
  }

  if (typeof params.maxPrice === "number") {
    searchParams.set("maxPrice", String(params.maxPrice));
  }

  if (typeof params.minBeds === "number") {
    searchParams.set("beds", String(params.minBeds));
  }

  if (typeof params.minBaths === "number") {
    searchParams.set("baths", String(params.minBaths));
  }

  if (params.mode) {
    searchParams.set("mode", params.mode);
  }

  return `${LISTINGS_MAP_PATH}?${searchParams.toString()}`;
}

export function HeroSection() {
  const router = useRouter();
  const [isNavigatingToMap, setIsNavigatingToMap] = useState(false);
  const [isPending, startTransition] = useTransition();
  const hasTriggeredRedirectRef = useRef(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState<SearchMode>("buy");
  const [filters, setFilters] = useState<HeroSearchFilters>({
    pricePreset: "any",
    bedsPreset: "any",
    bathsPreset: "any",
  });
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<PlaceSuggestion | null>(null);
  const [mapsReady, setMapsReady] = useState(false);
  const autocompleteServiceRef = useRef<GooglePlacesAutocompleteService | null>(null);
  const placesServiceRef = useRef<GooglePlacesDetailsService | null>(null);

  useEffect(() => {
    router.prefetch(LISTINGS_MAP_PATH);
  }, [router]);

  useEffect(() => {
    const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
    const existingMapsApi = window.google?.maps as
      | GoogleMapsWithPlaces
      | undefined;

    if (!googleMapsKey || typeof window === "undefined") {
      return;
    }

    if (existingMapsApi?.places) {
      autocompleteServiceRef.current =
        new existingMapsApi.places.AutocompleteService();
      placesServiceRef.current = new existingMapsApi.places.PlacesService(
        document.createElement("div")
      );
      setMapsReady(true);
      return;
    }

    const existingPromise = window.__sandstoneGoogleMapsPromise;

    const loaderPromise =
      existingPromise ??
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
          googleMapsKey
        )}&v=weekly&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(
            new Error("Failed to load Google Maps. Verify NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.")
          );
        document.head.appendChild(script);
      });

    window.__sandstoneGoogleMapsPromise = loaderPromise;

    loaderPromise
      .then(() => {
        const mapsApi = window.google?.maps as
          | GoogleMapsWithPlaces
          | undefined;
        if (!mapsApi?.places) {
          return;
        }
        autocompleteServiceRef.current =
          new mapsApi.places.AutocompleteService();
        placesServiceRef.current = new mapsApi.places.PlacesService(
          document.createElement("div")
        );
        setMapsReady(true);
      })
      .catch(() => {
        // Silently fall back to simple text search if Maps fails.
      });
  }, []);

  useEffect(() => {
    if (!(isNavigatingToMap || isPending)) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hasTriggeredRedirectRef.current = false;
      setIsNavigatingToMap(false);
    }, 10000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isNavigatingToMap, isPending]);

  const resolveFiltersToNumeric = () => {
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    switch (filters.pricePreset) {
      case "0-250":
        minPrice = 0;
        maxPrice = 250_000;
        break;
      case "250-500":
        minPrice = 250_000;
        maxPrice = 500_000;
        break;
      case "500-750":
        minPrice = 500_000;
        maxPrice = 750_000;
        break;
      case "750-plus":
        minPrice = 750_000;
        break;
      default:
        break;
    }

    const minBeds =
      filters.bedsPreset === "any" ? undefined : Number.parseInt(filters.bedsPreset, 10);
    const minBaths =
      filters.bathsPreset === "any" ? undefined : Number.parseInt(filters.bathsPreset, 10);

    return { minPrice, maxPrice, minBeds, minBaths };
  };

  const navigateToMap = (params: Omit<BuildListingsMapHrefParams, "mode">) => {
    if (hasTriggeredRedirectRef.current) {
      return;
    }

    hasTriggeredRedirectRef.current = true;
    const numericFilters = resolveFiltersToNumeric();
    const href = buildListingsMapHref({
      ...params,
      ...numericFilters,
      mode: activeTab,
    });

    setIsNavigatingToMap(true);

    startTransition(() => {
      router.push(href);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchValue.trim();

    if (!trimmed) {
      return;
    }

    const goToMap = (center?: { lat: number; lng: number }) => {
      navigateToMap({
        search: trimmed,
        centerLat: center?.lat,
        centerLng: center?.lng,
        radiusMiles: 5,
      });
    };

    const placesService = placesServiceRef.current;

    if (mapsReady && placesService && (selectedSuggestion || suggestions[0])) {
      const placeId = (selectedSuggestion ?? suggestions[0])!.placeId;
      placesService.getDetails(
        { placeId, fields: ["geometry.location"] },
        (place, status) => {
          if (
            status === "OK" &&
            place?.geometry?.location &&
            typeof place.geometry.location.lat === "function" &&
            typeof place.geometry.location.lng === "function"
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            goToMap({ lat, lng });
          } else {
            goToMap();
          }
        }
      );
    } else {
      goToMap();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
    setSelectedSuggestion(null);

    if (!value.trim() || !mapsReady || !autocompleteServiceRef.current) {
      setSuggestions([]);
      return;
    }

    setIsSuggestionsLoading(true);
    const autocompleteService = autocompleteServiceRef.current;
    autocompleteService.getPlacePredictions(
      {
        input: value,
        types: ["address"],
        componentRestrictions: { country: "us" },
      },
      (predictions) => {
        setIsSuggestionsLoading(false);

        if (!predictions || predictions.length === 0) {
          setSuggestions([]);
          return;
        }

        const mapped: PlaceSuggestion[] = predictions.slice(0, 6).map((prediction) => ({
          description: prediction.description,
          placeId: prediction.place_id,
        }));

        setSuggestions(mapped);
      }
    );
  };

  const handleSuggestionClick = (suggestion: PlaceSuggestion) => {
    setSearchValue(suggestion.description);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
  };

  const showTransition = isNavigatingToMap || isPending;

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[var(--sandstone-navy)]">
        <div className="relative h-[46vh] min-h-[320px] w-full lg:h-[640px] lg:min-h-[640px]">
          <div className="relative h-full w-full">
            <picture className="absolute inset-0 block h-full w-full">
              <source
                media="(min-width: 1024px)"
                srcSet="/desktop%20hero.webp"
                type="image/webp"
              />
              <img
                src="/mobile%20hero.webp"
                alt=""
                className="h-full w-full object-cover object-[center_45%] lg:object-[center_40%]"
                fetchPriority="high"
              />
            </picture>
            <div
              className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/62 via-[var(--sandstone-navy)]/26 to-[var(--sandstone-navy)]/10 lg:from-[var(--sandstone-navy)]/70 lg:via-[var(--sandstone-navy)]/30 lg:to-[var(--sandstone-navy)]/12"
              aria-hidden
            />

            <form
              onSubmit={handleSearchSubmit}
              className="absolute left-1/2 top-[34%] z-10 hidden w-[620px] max-w-[calc(100%-3rem)] -translate-x-1/2 lg:block xl:top-[36%]"
            >
              <div className="rounded-[999px] bg-white/96 p-1.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.65)] backdrop-blur-md">
                <div className="flex items-stretch gap-1.5">
                  <div className="flex flex-col justify-center rounded-full bg-[var(--sandstone-off-white)]/80 px-1.5 py-1 text-xs font-semibold text-[var(--sandstone-charcoal)]/80">
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        className={`rounded-full px-3 py-1 transition ${
                          activeTab === "buy"
                            ? "bg-white text-[var(--sandstone-charcoal)] shadow-sm"
                            : "text-[var(--sandstone-charcoal)]/70"
                        }`}
                        onClick={() => setActiveTab("buy")}
                      >
                        Buy
                      </button>
                      <button
                        type="button"
                        className={`rounded-full px-3 py-1 transition ${
                          activeTab === "rent"
                            ? "bg-white text-[var(--sandstone-charcoal)] shadow-sm"
                            : "text-[var(--sandstone-charcoal)]/70"
                        }`}
                        onClick={() => setActiveTab("rent")}
                      >
                        Rent
                      </button>
                      <button
                        type="button"
                        className={`rounded-full px-3 py-1 transition ${
                          activeTab === "sell"
                            ? "bg-white text-[var(--sandstone-charcoal)] shadow-sm"
                            : "text-[var(--sandstone-charcoal)]/70"
                        }`}
                        onClick={() => setActiveTab("sell")}
                      >
                        Sell
                      </button>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <input
                      type="search"
                      name="search"
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder={SEARCH_PLACEHOLDER}
                      className="w-full rounded-full border border-white/40 bg-transparent px-4 py-3 pr-12 text-sm text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/60 focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/35"
                      aria-label="Search by address or ZIP code"
                      autoComplete="off"
                    />

                    {suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 top-[110%] z-20 max-h-64 overflow-y-auto rounded-2xl border border-[var(--sandstone-charcoal)]/12 bg-white/98 py-1 text-sm text-[var(--sandstone-charcoal)] shadow-[0_16px_40px_-24px_rgba(0,0,0,0.58)]">
                        {suggestions.map((suggestion) => (
                          <li key={suggestion.placeId}>
                            <button
                              type="button"
                              className="block w-full px-3 py-2 text-left hover:bg-[var(--sandstone-off-white)]"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion.description}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {isSuggestionsLoading && (
                      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-xs text-[var(--sandstone-charcoal)]/55">
                        Searching…
                      </div>
                    )}

                    <button
                      type="submit"
                      className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white transition hover:bg-[var(--sandstone-navy-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]"
                      aria-label="Search homes near this address"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--sandstone-charcoal)]/80">
                    <select
                      className="min-w-[88px] rounded-full border border-[var(--sandstone-charcoal)]/16 bg-[color:rgba(255,255,255,0.96)] px-3 py-2 pr-5 text-[0.7rem] shadow-sm focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--sandstone-sand-gold)]/40"
                      value={filters.pricePreset}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          pricePreset: e.target.value as HeroSearchFilters["pricePreset"],
                        }))
                      }
                    >
                      <option value="any">Price</option>
                      <option value="0-250">Under $250k</option>
                      <option value="250-500">$250k – $500k</option>
                      <option value="500-750">$500k – $750k</option>
                      <option value="750-plus">$750k+</option>
                    </select>

                    <select
                      className="min-w-[72px] rounded-full border border-[var(--sandstone-charcoal)]/16 bg-[color:rgba(255,255,255,0.96)] px-3 py-2 pr-5 text-[0.7rem] shadow-sm focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--sandstone-sand-gold)]/40"
                      value={filters.bedsPreset}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          bedsPreset: e.target.value as HeroSearchFilters["bedsPreset"],
                        }))
                      }
                    >
                      <option value="any">Beds</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>

                    <select
                      className="min-w-[72px] rounded-full border border-[var(--sandstone-charcoal)]/16 bg-[color:rgba(255,255,255,0.96)] px-3 py-2 pr-5 text-[0.7rem] shadow-sm focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--sandstone-sand-gold)]/40"
                      value={filters.bathsPreset}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          bathsPreset: e.target.value as HeroSearchFilters["bathsPreset"],
                        }))
                      }
                    >
                      <option value="any">Baths</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <div
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[var(--sandstone-navy)]/50 via-60% to-[var(--sandstone-navy)] lg:hidden"
              aria-hidden
            />
            <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 h-[44px] w-[206px] -translate-x-1/2 lg:hidden">
              <Image
                src="/mobile-logo-hero.webp"
                alt="Sandstone Real Estate Group"
                fill
                className="object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
                sizes="206px"
                priority
              />
            </div>
          </div>
        </div>

        <div className="bg-[var(--sandstone-navy)] px-4 pb-5 pt-4 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="mx-auto mt-3 w-full max-w-sm">
            <input
              type="search"
              name="search"
              placeholder={SEARCH_PLACEHOLDER}
              value={searchValue}
              onChange={handleInputChange}
              className="w-full rounded-full border border-white/35 bg-white/96 px-5 py-3 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/58 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.55)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/35"
              aria-label="Search by address or ZIP code"
            />

            <button
              type="submit"
              className="mx-auto mt-2.5 block w-[72%] max-w-[220px] rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3 font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--sandstone-navy)]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {showTransition && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[color:rgba(37,52,113,0.28)] backdrop-blur-md">
          <div className="mx-4 w-full max-w-[430px] rounded-[1.85rem] border border-white/62 bg-white/92 px-8 py-7 text-center shadow-[0_28px_70px_-28px_rgba(17,24,61,0.6)]">
            <span
              aria-hidden
              className="mx-auto block h-12 w-12 animate-spin rounded-full border-[3px] border-[var(--sandstone-sand-gold)]/26 border-t-[var(--sandstone-sand-gold)]"
            />
            <p className="mt-4 font-heading text-xl font-bold text-[var(--sandstone-navy)]">
              Opening map search
            </p>
            <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/74">
              Loading available homes near El Paso.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
