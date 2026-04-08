"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingsMapPanel, ListingsMapSidebar } from "@/components/properties";
import { MobileListingsFilters } from "@/components/MobileListingsFilters";
import {
  filterPropertyCardsWithFilters,
  getPropertySearchPriceOptions,
  resolvePresetFiltersToNumeric,
  type PropertySearchPresetFilters,
} from "@/lib";
import type { PropertyCard } from "@/types";

type ListingType = "active" | "rental";
const EL_PASO_LAT_MIN = 31.58;
const EL_PASO_LAT_MAX = 31.95;
const EL_PASO_LNG_MIN = -106.72;
const EL_PASO_LNG_MAX = -106.23;
const DEFAULT_MAP_ZOOM = 11;
const SINGLE_MARKER_ZOOM = 13;
const VIEWPORT_DEBOUNCE_MS = 240;
const MAP_REFRESH_INITIAL_DELAY_MS = 2_000;
const MAP_REFRESH_INTERVAL_MS = 20_000;

interface MapViewport {
  north: number;
  south: number;
  east: number;
  west: number;
  zoom: number;
}

const DEFAULT_VIEWPORT: MapViewport = {
  north: EL_PASO_LAT_MAX,
  south: EL_PASO_LAT_MIN,
  east: EL_PASO_LNG_MAX,
  west: EL_PASO_LNG_MIN,
  zoom: DEFAULT_MAP_ZOOM,
};

function dedupeProperties<T extends { id: string; routeId: string; sparkId?: string }>(
  properties: T[]
): T[] {
  const seen = new Set<string>();

  return properties.filter((property) => {
    const key = property.sparkId ?? property.routeId ?? property.id;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function resolvePropertyIdentity(property: { id: string; routeId: string; sparkId?: string }): string {
  return property.sparkId ?? property.routeId ?? property.id;
}

function haveSamePropertyIdentities(current: PropertyCard[], next: PropertyCard[]): boolean {
  if (current.length !== next.length) {
    return false;
  }

  for (let index = 0; index < current.length; index += 1) {
    if (resolvePropertyIdentity(current[index]) !== resolvePropertyIdentity(next[index])) {
      return false;
    }
  }

  return true;
}

async function fetchLatestMapProperties(signal: AbortSignal): Promise<PropertyCard[] | null> {
  const response = await fetch("/api/listings/map", {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as unknown;

  if (!Array.isArray(payload)) {
    return null;
  }

  return dedupeProperties(payload as PropertyCard[]);
}

function isWithinElPasoBounds(lat: number, lng: number): boolean {
  return (
    lat >= EL_PASO_LAT_MIN &&
    lat <= EL_PASO_LAT_MAX &&
    lng >= EL_PASO_LNG_MIN &&
    lng <= EL_PASO_LNG_MAX
  );
}

function isElPasoListing(property: PropertyCard): boolean {
  const location = property.location.toLowerCase();
  if (location.includes("el paso")) {
    return true;
  }

  if (
    typeof property.latitude === "number" &&
    Number.isFinite(property.latitude) &&
    typeof property.longitude === "number" &&
    Number.isFinite(property.longitude)
  ) {
    return isWithinElPasoBounds(property.latitude, property.longitude);
  }

  return false;
}

function resolveListingTypeParam(value: string | null): ListingType {
  return value === "rental" ? "rental" : "active";
}

function resolvePricePresetParam(
  value: string | null
): PropertySearchPresetFilters["pricePreset"] {
  if (
    value === "under-150" ||
    value === "150-250" ||
    value === "250-500" ||
    value === "500-750" ||
    value === "750-plus" ||
    value === "rent-under-1000" ||
    value === "rent-1000-2500" ||
    value === "rent-2500-5000" ||
    value === "rent-5000-plus"
  ) {
    return value;
  }

  return "any";
}

function isRentalPricePreset(value: PropertySearchPresetFilters["pricePreset"]): boolean {
  return (
    value === "rent-under-1000" ||
    value === "rent-1000-2500" ||
    value === "rent-2500-5000" ||
    value === "rent-5000-plus"
  );
}

function normalizePricePresetForListingType(
  listingType: ListingType,
  pricePreset: PropertySearchPresetFilters["pricePreset"]
): PropertySearchPresetFilters["pricePreset"] {
  if (listingType === "rental") {
    return isRentalPricePreset(pricePreset) || pricePreset === "any"
      ? pricePreset
      : "any";
  }

  return isRentalPricePreset(pricePreset) ? "any" : pricePreset;
}

function resolveCountPresetParam(
  value: string | null
): PropertySearchPresetFilters["bedsPreset"] {
  if (value === "1" || value === "2" || value === "3" || value === "4") {
    return value;
  }

  return "any";
}

function parseOptionalNumber(value: string | null): number | undefined {
  if (value == null || value.trim() === "") {
    return undefined;
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
}

function normalizeMapSearchQuery(value: string): string {
  const normalized = value.trim();

  if (!normalized) {
    return "";
  }

  const lower = normalized.toLowerCase();

  if (lower === "all" || lower === "any" || lower === "*") {
    return "";
  }

  return normalized;
}

function extractZipTokens(value: string): string[] {
  const matches = value.match(/\b\d{5}(?:-\d{4})?\b/g);
  return matches ?? [];
}

function matchesAddressOrZip(property: PropertyCard, searchQuery: string): boolean {
  const normalizedQuery = normalizeMapSearchQuery(searchQuery).toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableAddress = [property.location, property.mapAddress]
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .join(" ")
    .toLowerCase();

  if (searchableAddress.includes(normalizedQuery)) {
    return true;
  }

  const zipTokens = [
    ...extractZipTokens(property.location ?? ""),
    ...extractZipTokens(property.mapAddress ?? ""),
  ];

  return zipTokens.some((zip) => zip.toLowerCase().includes(normalizedQuery));
}

function isWithinViewportBounds(property: PropertyCard, viewport: MapViewport): boolean {
  if (
    typeof property.latitude !== "number" ||
    !Number.isFinite(property.latitude) ||
    typeof property.longitude !== "number" ||
    !Number.isFinite(property.longitude)
  ) {
    return false;
  }

  const withinLatitude =
    property.latitude >= viewport.south && property.latitude <= viewport.north;

  if (viewport.west <= viewport.east) {
    return (
      withinLatitude &&
      property.longitude >= viewport.west &&
      property.longitude <= viewport.east
    );
  }

  return (
    withinLatitude &&
    (property.longitude >= viewport.west || property.longitude <= viewport.east)
  );
}

interface ListingsMapClientProps {
  properties: PropertyCard[];
}

export function ListingsMapClient({ properties }: ListingsMapClientProps) {
  const searchParams = useSearchParams();
  const [liveProperties, setLiveProperties] = useState<PropertyCard[]>(() => properties);
  const searchQuery = normalizeMapSearchQuery(searchParams.get("search") ?? "");
  const initialCenterLat = parseOptionalNumber(searchParams.get("lat"));
  const initialCenterLng = parseOptionalNumber(searchParams.get("lng"));
  const initialMapCenter =
    typeof initialCenterLat === "number" && typeof initialCenterLng === "number"
      ? ([initialCenterLat, initialCenterLng] as [number, number])
      : undefined;
  const initialMapZoom = initialMapCenter ? SINGLE_MARKER_ZOOM : DEFAULT_MAP_ZOOM;

  const initialListingType = resolveListingTypeParam(searchParams.get("listingType"));
  const initialPricePreset = normalizePricePresetForListingType(
    initialListingType,
    resolvePricePresetParam(searchParams.get("price"))
  );
  const initialBedsPreset = resolveCountPresetParam(searchParams.get("beds"));
  const initialBathsPreset = resolveCountPresetParam(searchParams.get("baths"));

  const [filters, setFilters] = useState<{
    listingType: ListingType;
    pricePreset: PropertySearchPresetFilters["pricePreset"];
    bedsPreset: PropertySearchPresetFilters["bedsPreset"];
    bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  }>({
    listingType: initialListingType,
    pricePreset: initialPricePreset,
    bedsPreset: initialBedsPreset,
    bathsPreset: initialBathsPreset,
  });
  const [viewport, setViewport] = useState<MapViewport>(DEFAULT_VIEWPORT);
  const [debouncedViewport, setDebouncedViewport] = useState<MapViewport>(DEFAULT_VIEWPORT);
  const [isMapRefreshing, setIsMapRefreshing] = useState(false);

  useEffect(() => {
    setLiveProperties(properties);
  }, [properties]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedViewport(viewport);
    }, VIEWPORT_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [viewport]);

  useEffect(() => {
    let pollTimer: number | null = null;
    let cancelled = false;
    let activeController: AbortController | null = null;

    const refreshOnce = async () => {
      if (cancelled || typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }

      if (activeController) {
        activeController.abort();
      }

      activeController = new AbortController();
      setIsMapRefreshing(true);

      try {
        const latest = await fetchLatestMapProperties(activeController.signal);

        if (cancelled || !latest) {
          return;
        }

        setLiveProperties((current) =>
          haveSamePropertyIdentities(current, latest) ? current : latest
        );
      } catch {
        // Keep existing data when refresh fails.
      } finally {
        if (!cancelled) {
          setIsMapRefreshing(false);
        }
      }
    };

    const scheduleNextRefresh = (delayMs: number) => {
      pollTimer = window.setTimeout(async () => {
        await refreshOnce();
        scheduleNextRefresh(MAP_REFRESH_INTERVAL_MS);
      }, delayMs);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refreshOnce();
      }
    };

    scheduleNextRefresh(MAP_REFRESH_INITIAL_DELAY_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (pollTimer != null) {
        window.clearTimeout(pollTimer);
      }

      if (activeController) {
        activeController.abort();
      }
    };
  }, []);

  const elPasoOnlyProperties = useMemo(
    () => liveProperties.filter((property) => isElPasoListing(property)),
    [liveProperties]
  );

  const filteredProperties = useMemo(() => {
    const numericFilters = resolvePresetFiltersToNumeric({
      pricePreset: filters.pricePreset,
      bedsPreset: filters.bedsPreset,
      bathsPreset: filters.bathsPreset,
    });

    const numericFiltered = filterPropertyCardsWithFilters(elPasoOnlyProperties, {
      ...numericFilters,
      listingType: filters.listingType,
      search: undefined,
    });

    return numericFiltered
      .filter((property) => matchesAddressOrZip(property, searchQuery))
      .filter((property) => isWithinViewportBounds(property, debouncedViewport));
  }, [debouncedViewport, elPasoOnlyProperties, filters, searchQuery]);

  const priceOptions = useMemo(
    () => getPropertySearchPriceOptions(filters.listingType),
    [filters.listingType]
  );

  const mapContextQuery = useMemo(
    () => ({
      from: "map",
      search: searchQuery || undefined,
      listingType: filters.listingType,
      price: filters.pricePreset === "any" ? undefined : filters.pricePreset,
      beds: filters.bedsPreset === "any" ? undefined : filters.bedsPreset,
      baths: filters.bathsPreset === "any" ? undefined : filters.bathsPreset,
    }),
    [filters, searchQuery]
  );

  const totalCount = filteredProperties.length;

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
        <section className="container mx-auto max-w-[1360px] px-4 pb-3 pt-8 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
                <span>Back to home page</span>
              </Link>
              <h1 className="mt-3 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
                Search by Map
              </h1>
            </div>
            <p className="text-sm text-[var(--sandstone-charcoal)]/70">
              Showing {totalCount} listing{totalCount === 1 ? "" : "s"} on the map
            </p>
          </div>

          <div className="mt-6">
            <div className="hidden md:flex flex-wrap items-center gap-3 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 p-4 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.48)]">
              <div className="flex rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] p-1">
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    listingType: "active",
                    pricePreset: "any",
                  }))}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filters.listingType === "active"
                      ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
                      : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    listingType: "rental",
                    pricePreset: "any",
                  }))}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filters.listingType === "rental"
                      ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
                      : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
                  }`}
                >
                  Rent
                </button>
              </div>

              <select
                value={filters.pricePreset}
                onChange={(e) => setFilters(prev => ({ ...prev, pricePreset: e.target.value as PropertySearchPresetFilters["pricePreset"] }))}
                className="h-12 min-w-[156px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
                style={{
                  backgroundImage: `url(\"data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E\")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "12px",
                }}
              >
                {priceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.bedsPreset}
                onChange={(e) => setFilters(prev => ({ ...prev, bedsPreset: e.target.value as PropertySearchPresetFilters["bedsPreset"] }))}
                className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
                style={{
                  backgroundImage: `url(\"data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E\")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "12px",
                }}
              >
                <option value="any">Beds</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>

              <select
                value={filters.bathsPreset}
                onChange={(e) => setFilters(prev => ({ ...prev, bathsPreset: e.target.value as PropertySearchPresetFilters["bathsPreset"] }))}
                className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
                style={{
                  backgroundImage: `url(\"data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E\")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "12px",
                }}
              >
                <option value="any">Baths</option>
                <option value="1">1+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
              </select>
            </div>

            <div className="md:hidden">
              <MobileListingsFilters
                listingType={filters.listingType}
                pricePreset={filters.pricePreset}
                bedsPreset={filters.bedsPreset}
                bathsPreset={filters.bathsPreset}
                onListingTypeChange={(type) => setFilters(prev => ({
                  ...prev,
                  listingType: type,
                  pricePreset: "any",
                }))}
                onPriceChange={(price) => setFilters(prev => ({ ...prev, pricePreset: price }))}
                onBedsChange={(beds) => setFilters(prev => ({ ...prev, bedsPreset: beds }))}
                onBathsChange={(baths) => setFilters(prev => ({ ...prev, bathsPreset: baths }))}
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-[1360px] px-4 pb-3 lg:px-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.95fr)]">
            <ListingsMapPanel
              properties={filteredProperties}
              mapContextQuery={mapContextQuery}
              initialCenter={initialMapCenter}
              initialZoom={initialMapZoom}
              onViewportChange={setViewport}
              isRefreshing={isMapRefreshing}
            />
            <ListingsMapSidebar
              properties={filteredProperties}
              mapContextQuery={mapContextQuery}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
