"use client";

import { useMemo, useState } from "react";
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

interface ListingsMapClientProps {
  properties: PropertyCard[];
}

export function ListingsMapClient({ properties }: ListingsMapClientProps) {
  const searchParams = useSearchParams();

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

  const elPasoOnlyProperties = useMemo(
    () => properties.filter((property) => isElPasoListing(property)),
    [properties]
  );

  const filteredProperties = useMemo(() => {
    const numericFilters = resolvePresetFiltersToNumeric({
      pricePreset: filters.pricePreset,
      bedsPreset: filters.bedsPreset,
      bathsPreset: filters.bathsPreset,
    });

    return filterPropertyCardsWithFilters(elPasoOnlyProperties, {
      ...numericFilters,
      listingType: filters.listingType,
    });
  }, [elPasoOnlyProperties, filters]);

  const priceOptions = useMemo(
    () => getPropertySearchPriceOptions(filters.listingType),
    [filters.listingType]
  );

  const mapContextQuery = useMemo(
    () => ({
      from: "map",
      listingType: filters.listingType,
      price: filters.pricePreset === "any" ? undefined : filters.pricePreset,
      beds: filters.bedsPreset === "any" ? undefined : filters.bedsPreset,
      baths: filters.bathsPreset === "any" ? undefined : filters.bathsPreset,
    }),
    [filters]
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
          {filteredProperties.length === 0 ? (
            <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-8 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No El Paso listings match the current filters.
              </p>
              <button
                onClick={() => setFilters({
                  listingType: "active",
                  pricePreset: "any",
                  bedsPreset: "any",
                  bathsPreset: "any",
                })}
                className="mt-4 inline-block rounded-full bg-[var(--sandstone-navy)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.95fr)]">
              <ListingsMapPanel
                properties={filteredProperties}
                mapContextQuery={mapContextQuery}
              />
              <ListingsMapSidebar
                properties={filteredProperties}
                mapContextQuery={mapContextQuery}
              />
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
