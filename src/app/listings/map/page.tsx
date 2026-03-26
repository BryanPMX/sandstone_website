"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  const [allProperties, setAllProperties] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    listingType: "active" | "my";
    pricePreset: PropertySearchPresetFilters["pricePreset"];
    bedsPreset: PropertySearchPresetFilters["bedsPreset"];
    bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  }>({
    listingType: "active",
    pricePreset: "any",
    bedsPreset: "any",
    bathsPreset: "any",
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
            <SearchToolbar onFiltersChange={setFilters} initialFilters={filters} />
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
