"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  LISTINGS_MAP_PATH,
  DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
  getPropertySearchPriceOptions,
  PROPERTY_SEARCH_BED_OPTIONS,
  PROPERTY_SEARCH_BATH_OPTIONS,
  buildListingsMapHref,
  type PropertySearchPresetFilters,
} from "@/lib";

const SEARCH_PLACEHOLDER = "Enter an address, ZIP…";

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

declare global {
  interface Window {
    google?: {
      maps?: GoogleMapsWithPlaces;
    };
    __sandstoneGoogleMapsPromise?: Promise<void>;
  }
}

function getSelectedOptionLabel<T extends string>(
  options: Array<{ value: T; label: string }>,
  value: T
): string {
  return options.find((option) => option.value === value)?.label ?? options[0]?.label ?? "";
}

export function HeroSection() {
  const router = useRouter();
  const [isNavigatingToMap, setIsNavigatingToMap] = useState(false);
  const [isPending, startTransition] = useTransition();
  const hasTriggeredRedirectRef = useRef(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<PropertySearchPresetFilters & { listingType: "active" | "rental" }>(
    {
      ...DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
      listingType: "active",
    }
  );
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<PlaceSuggestion | null>(null);
  const [mapsReady, setMapsReady] = useState(false);
  const autocompleteServiceRef = useRef<GooglePlacesAutocompleteService | null>(null);
  const placesServiceRef = useRef<GooglePlacesDetailsService | null>(null);

  useEffect(() => {
    router.prefetch(LISTINGS_MAP_PATH);
    router.prefetch("/rent");
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

  const navigateToMap = (params: {
    search?: string;
    centerLat?: number;
    centerLng?: number;
    radiusMiles?: number;
  }) => {
    if (hasTriggeredRedirectRef.current) {
      return;
    }

    hasTriggeredRedirectRef.current = true;
    const href = buildListingsMapHref({
      ...params,
      filterPresets: filters,
      listingType: filters.listingType,
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
      navigateToMap({});
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

    const autocompleteService = autocompleteServiceRef.current;
    autocompleteService.getPlacePredictions(
      {
        input: value,
        types: ["address"],
        componentRestrictions: { country: "us" },
      },
      (predictions) => {
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
  const priceOptions = getPropertySearchPriceOptions(filters.listingType);

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
              className="absolute left-1/2 top-[32%] z-10 hidden w-[min(760px,calc(100%-8rem))] -translate-x-1/2 lg:block xl:top-[34%]"
            >
              <div className="flex flex-col items-center">
                <div className="rounded-[1.55rem] bg-white px-6 py-2.5 shadow-[0_16px_36px_-28px_rgba(17,24,61,0.68)]">
                  <div className="inline-flex items-center gap-3 border-b border-[var(--sandstone-charcoal)]/48 pb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          listingType: "active",
                          pricePreset: "any",
                        }))
                      }
                      className={`border-b-[2px] pb-0.5 font-heading text-[0.94rem] font-semibold tracking-[0.01em] transition ${
                        filters.listingType === "active"
                          ? "border-[var(--sandstone-charcoal)] text-[var(--sandstone-charcoal)]"
                          : "border-transparent text-[var(--sandstone-charcoal)]/58 hover:text-[var(--sandstone-charcoal)]"
                      }`}
                    >
                      Buy
                    </button>
                    <span
                      aria-hidden
                      className="text-[1.2rem] font-light leading-none text-[var(--sandstone-charcoal)]/48"
                    >
                      |
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          listingType: "rental",
                          pricePreset: "any",
                        }))
                      }
                      className={`pb-0.5 font-heading text-[0.94rem] font-medium tracking-[0.01em] transition ${
                        filters.listingType === "rental"
                          ? "border-b-[2px] border-[var(--sandstone-charcoal)] text-[var(--sandstone-charcoal)]"
                          : "text-[var(--sandstone-charcoal)]/58 hover:text-[var(--sandstone-charcoal)]"
                      }`}
                    >
                      Rent
                    </button>
                  </div>
                </div>

                <div className="relative mt-3.5 w-full max-w-[670px]">
                  <div className="rounded-[999px] bg-white p-1.5 shadow-[0_22px_52px_-34px_rgba(0,0,0,0.68)]">
                    <div className="relative">
                      <input
                        type="search"
                        name="search"
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder={SEARCH_PLACEHOLDER}
                        className="h-[54px] w-full rounded-full border border-white bg-white pl-7 pr-[4.4rem] font-heading text-[0.92rem] font-medium tracking-[0.01em] text-[var(--sandstone-charcoal)] placeholder:font-sans placeholder:text-[0.88rem] placeholder:font-normal placeholder:text-[var(--sandstone-charcoal)]/38 focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/28"
                        aria-label="Search by address or ZIP code"
                        autoComplete="off"
                      />

                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white shadow-[0_12px_24px_-18px_rgba(37,52,113,0.9)] transition hover:bg-[var(--sandstone-navy-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]"
                        aria-label="Search homes near this address"
                      >
                        <Search className="h-4.5 w-4.5" strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>

                  {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 top-[calc(100%+0.7rem)] z-20 max-h-64 overflow-y-auto rounded-[1.2rem] border border-[var(--sandstone-charcoal)]/12 bg-white/98 py-1.5 text-[0.84rem] text-[var(--sandstone-charcoal)] shadow-[0_24px_54px_-30px_rgba(0,0,0,0.62)]">
                      {suggestions.map((suggestion) => (
                        <li key={suggestion.placeId}>
                          <button
                            type="button"
                            className="block w-full px-4 py-2 text-left transition hover:bg-[var(--sandstone-off-white)]"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion.description}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
                  <div className="relative focus-within:outline-none">
                    <div className="inline-flex h-9 items-center gap-0.5 rounded-full border border-[var(--sandstone-charcoal)]/14 bg-white px-4 text-[0.84rem] font-medium text-[var(--sandstone-charcoal)] shadow-[0_14px_30px_-24px_rgba(17,24,61,0.56)] transition focus-within:border-[var(--sandstone-sand-gold)] focus-within:ring-2 focus-within:ring-[var(--sandstone-sand-gold)]/22">
                      <span>{getSelectedOptionLabel(priceOptions, filters.pricePreset)}</span>
                      <ChevronDown
                        aria-hidden
                        className="h-3.5 w-3.5 text-[var(--sandstone-charcoal)]/55"
                      />
                    </div>
                    <select
                      name="price"
                      aria-label="Filter by price"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      value={filters.pricePreset}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          pricePreset: e.target.value as PropertySearchPresetFilters["pricePreset"],
                        }))
                      }
                    >
                      {priceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative focus-within:outline-none">
                    <div className="inline-flex h-9 items-center gap-0.5 rounded-full border border-[var(--sandstone-charcoal)]/14 bg-white px-4 text-[0.84rem] font-medium text-[var(--sandstone-charcoal)] shadow-[0_14px_30px_-24px_rgba(17,24,61,0.56)] transition focus-within:border-[var(--sandstone-sand-gold)] focus-within:ring-2 focus-within:ring-[var(--sandstone-sand-gold)]/22">
                      <span>{getSelectedOptionLabel(PROPERTY_SEARCH_BED_OPTIONS, filters.bedsPreset)}</span>
                      <ChevronDown
                        aria-hidden
                        className="h-3.5 w-3.5 text-[var(--sandstone-charcoal)]/55"
                      />
                    </div>
                    <select
                      name="beds"
                      aria-label="Filter by bedrooms"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      value={filters.bedsPreset}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          bedsPreset: e.target.value as PropertySearchPresetFilters["bedsPreset"],
                        }))
                      }
                    >
                      {PROPERTY_SEARCH_BED_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative focus-within:outline-none">
                    <div className="inline-flex h-9 items-center gap-0.5 rounded-full border border-[var(--sandstone-charcoal)]/14 bg-white px-4 text-[0.84rem] font-medium text-[var(--sandstone-charcoal)] shadow-[0_14px_30px_-24px_rgba(17,24,61,0.56)] transition focus-within:border-[var(--sandstone-sand-gold)] focus-within:ring-2 focus-within:ring-[var(--sandstone-sand-gold)]/22">
                      <span>{getSelectedOptionLabel(PROPERTY_SEARCH_BATH_OPTIONS, filters.bathsPreset)}</span>
                      <ChevronDown
                        aria-hidden
                        className="h-3.5 w-3.5 text-[var(--sandstone-charcoal)]/55"
                      />
                    </div>
                    <select
                      name="baths"
                      aria-label="Filter by bathrooms"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      value={filters.bathsPreset}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          bathsPreset: e.target.value as PropertySearchPresetFilters["bathsPreset"],
                        }))
                      }
                    >
                      {PROPERTY_SEARCH_BATH_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
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
          <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-4 text-sm font-semibold">
            <button
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  listingType: "active",
                  pricePreset: "any",
                }))
              }
              className={`px-2 py-1 transition ${
                filters.listingType === "active"
                  ? "border-b-2 border-white text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  listingType: "rental",
                  pricePreset: "any",
                }))
              }
              className={`px-2 py-1 transition ${
                filters.listingType === "rental"
                  ? "border-b-2 border-white text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Rent
            </button>
          </div>
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

          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="mx-auto mt-3 flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <span>{showMobileFilters ? "Hide" : "Show"} Filters</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showMobileFilters ? "rotate-180" : ""}`}
            />
          </button>

          {showMobileFilters ? (
            <div className="mx-auto mt-4 w-full max-w-sm space-y-3">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">Price</p>
                <div className="flex flex-wrap gap-1.5">
                  {priceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          pricePreset: option.value,
                        }))
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        filters.pricePreset === option.value
                          ? "bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)]"
                          : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {option.value === "any" ? "Any" : option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">Beds</p>
                <div className="flex flex-wrap gap-1.5">
                  {PROPERTY_SEARCH_BED_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          bedsPreset: option.value,
                        }))
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        filters.bedsPreset === option.value
                          ? "bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)]"
                          : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {option.value === "any" ? "Any" : option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">Baths</p>
                <div className="flex flex-wrap gap-1.5">
                  {PROPERTY_SEARCH_BATH_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          bathsPreset: option.value,
                        }))
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        filters.bathsPreset === option.value
                          ? "bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)]"
                          : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {option.value === "any" ? "Any" : option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/20 pt-3">
                <div className="flex flex-wrap justify-center gap-4 text-center">
                  <button
                    type="button"
                    onClick={() => router.push("/listings")}
                    className="text-xs font-semibold text-white/80 transition hover:text-white"
                  >
                    All Listings
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/listings/map")}
                    className="text-xs font-semibold text-white/80 transition hover:text-white"
                  >
                    Map Search
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        ...DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
                        listingType: "active",
                      })
                    }
                    className="text-xs font-semibold text-white/80 transition hover:text-white"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          ) : null}
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
