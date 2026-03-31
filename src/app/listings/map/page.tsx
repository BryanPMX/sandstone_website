"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SearchToolbar } from "@/components/SearchToolbar";
import { ListingsMapPanel, ListingsMapSidebar } from "@/components/properties";
import {
  filterPropertyCardsWithFilters,
  resolvePresetFiltersToNumeric,
  type PropertySearchPresetFilters,
} from "@/lib";
import type { PropertyCard } from "@/types";

export default function ListingsMapPage() {
  const searchParams = useSearchParams();
  const [allProperties, setAllProperties] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get initial filters from URL params
  const initialListingType = (searchParams.get("listingType") || "active") as "active" | "rental";
  const initialPricePreset = (searchParams.get("price") || "any") as PropertySearchPresetFilters["pricePreset"];
  const initialBedsPreset = (searchParams.get("beds") || "any") as PropertySearchPresetFilters["bedsPreset"];
  const initialBathsPreset = (searchParams.get("baths") || "any") as PropertySearchPresetFilters["bathsPreset"];
  
  const [filters, setFilters] = useState<{
    listingType: "active" | "rental";
    pricePreset: PropertySearchPresetFilters["pricePreset"];
    bedsPreset: PropertySearchPresetFilters["bedsPreset"];
    bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  }>({
    listingType: initialListingType,
    pricePreset: initialPricePreset,
    bedsPreset: initialBedsPreset,
    bathsPreset: initialBathsPreset,
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch("/api/listings/all");

        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const properties: PropertyCard[] = await response.json();
        setAllProperties(properties);
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    const numericFilters = resolvePresetFiltersToNumeric({
      pricePreset: filters.pricePreset,
      bedsPreset: filters.bedsPreset,
      bathsPreset: filters.bathsPreset,
    });

    return filterPropertyCardsWithFilters(allProperties, {
      ...numericFilters,
      listingType: filters.listingType,
    });
  }, [allProperties, filters]);

  const totalCount = filteredProperties.length;

  if (loading) {
    return (
      <>
        <SiteHeader variant="lead" showDesktopCenterLogo={false} />
        <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
          <section className="container mx-auto max-w-[1360px] px-4 pb-3 pt-8 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Link
                  href="/listings"
                  className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
                >
                  ← Back to listings
                </Link>
                <h1 className="mt-3 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
                  Search by Map
                </h1>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center py-12">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[var(--sandstone-sand-gold)] border-t-transparent"></div>
                <p className="mt-4 text-[var(--sandstone-charcoal)]/70">Loading listings...</p>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
        <section className="container mx-auto max-w-[1360px] px-4 pb-3 pt-8 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/listings"
                className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
              >
                ← Back to listings
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
            <div className="flex flex-wrap items-center gap-3 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 p-4 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.48)]">
              {/* Buy/Rent Buttons */}
              <div className="flex rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] p-1">
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, listingType: "active" }))}
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
                  onClick={() => setFilters(prev => ({ ...prev, listingType: "rental" }))}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filters.listingType === "rental"
                      ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
                      : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
                  }`}
                >
                  Rent
                </button>
              </div>

              {/* Price, Beds, Baths Filters */}
              <select
                value={filters.pricePreset}
                onChange={(e) => setFilters(prev => ({ ...prev, pricePreset: e.target.value as PropertySearchPresetFilters["pricePreset"] }))}
                className="h-12 min-w-[156px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '12px'
                }}
              >
                <option value="any">Price</option>
                <option value="0-250">Under $250k</option>
                <option value="250-500">$250k - $500k</option>
                <option value="500-750">$500k - $750k</option>
                <option value="750-plus">$750k+</option>
              </select>

              <select
                value={filters.bedsPreset}
                onChange={(e) => setFilters(prev => ({ ...prev, bedsPreset: e.target.value as PropertySearchPresetFilters["bedsPreset"] }))}
                className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '12px'
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
                  backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '12px'
                }}
              >
                <option value="any">Baths</option>
                <option value="1">1+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
              </select>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-[1360px] px-4 pb-3 lg:px-6">
          {filteredProperties.length === 0 ? (
            <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-8 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No listings match the current filters.
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
              <ListingsMapPanel properties={filteredProperties} />
              <ListingsMapSidebar properties={filteredProperties} />
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
