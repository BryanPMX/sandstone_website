"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchToolbar } from "@/components/SearchToolbar";
import { buildListingsMapHref, type PropertySearchPresetFilters } from "@/lib";

type SearchFilters = {
  listingType: "active" | "rental";
  pricePreset: PropertySearchPresetFilters["pricePreset"];
  bedsPreset: PropertySearchPresetFilters["bedsPreset"];
  bathsPreset: PropertySearchPresetFilters["bathsPreset"];
};

const PCS_SUGGESTED_FILTERS: SearchFilters = {
  listingType: "active",
  pricePreset: "250-500",
  bedsPreset: "3",
  bathsPreset: "2",
};

export function PcsSearchPanel() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>(PCS_SUGGESTED_FILTERS);

  const handleOpenMapSearch = () => {
    const href = buildListingsMapHref({
      listingType: filters.listingType,
      filterPresets: {
        pricePreset: filters.pricePreset,
        bedsPreset: filters.bedsPreset,
        bathsPreset: filters.bathsPreset,
      },
    });

    router.push(href);
  };

  return (
    <div className="rounded-[2rem] border border-white/30 bg-white/12 p-4 shadow-[0_24px_44px_-32px_rgba(17,24,61,0.55)] ring-1 ring-white/20 backdrop-blur-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
          Suggested PCS filters loaded
        </p>
        <button
          type="button"
          onClick={() => setFilters(PCS_SUGGESTED_FILTERS)}
          className="text-xs font-semibold text-white/85 transition hover:text-white"
        >
          Reset to PCS default
        </button>
      </div>

      <SearchToolbar
        initialFilters={filters}
        onFiltersChange={(nextFilters) => setFilters(nextFilters)}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleOpenMapSearch}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--sandstone-navy-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-navy)] focus-visible:ring-offset-2"
        >
          Explore PCS Matches
        </button>
        <a
          href="#pcs-contact"
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/55 bg-white/8 px-6 text-sm font-semibold text-white transition hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
        >
          Talk to a PCS Specialist
        </a>
      </div>
    </div>
  );
}
