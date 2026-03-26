"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { PropertySearchPresetFilters } from "@/lib";
import {
  PROPERTY_SEARCH_PRICE_OPTIONS,
  PROPERTY_SEARCH_BED_OPTIONS,
  PROPERTY_SEARCH_BATH_OPTIONS,
  DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
} from "@/lib";

interface SearchToolbarProps {
  onFiltersChange: (filters: {
    listingType: "active" | "my";
    pricePreset: PropertySearchPresetFilters["pricePreset"];
    bedsPreset: PropertySearchPresetFilters["bedsPreset"];
    bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  }) => void;
  initialFilters?: {
    listingType: "active" | "my";
    pricePreset: PropertySearchPresetFilters["pricePreset"];
    bedsPreset: PropertySearchPresetFilters["bedsPreset"];
    bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  };
}

export function SearchToolbar({ onFiltersChange, initialFilters }: SearchToolbarProps) {
  const router = useRouter();
  const [listingType, setListingType] = useState<"active" | "my">(
    initialFilters?.listingType ?? "active"
  );
  const [pricePreset, setPricePreset] = useState<PropertySearchPresetFilters["pricePreset"]>(
    initialFilters?.pricePreset ?? DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.pricePreset
  );
  const [bedsPreset, setBedsPreset] = useState<PropertySearchPresetFilters["bedsPreset"]>(
    initialFilters?.bedsPreset ?? DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.bedsPreset
  );
  const [bathsPreset, setBathsPreset] = useState<PropertySearchPresetFilters["bathsPreset"]>(
    initialFilters?.bathsPreset ?? DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.bathsPreset
  );

  useEffect(() => {
    onFiltersChange({
      listingType,
      pricePreset,
      bedsPreset,
      bathsPreset,
    });
  }, [listingType, pricePreset, bedsPreset, bathsPreset, onFiltersChange]);

  const handleJoinClick = () => {
    router.push("/join");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 p-4 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.48)]">
      {/* Buy/Sell Toggle Buttons */}
      <div className="flex rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] p-1">
        <button
          type="button"
          onClick={() => setListingType("active")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            listingType === "active"
              ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
              : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setListingType("my")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            listingType === "my"
              ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
              : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Filter Selects */}
      <select
        value={pricePreset}
        onChange={(e) => setPricePreset(e.target.value as PropertySearchPresetFilters["pricePreset"])}
        className="h-12 min-w-[156px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20"
      >
        {PROPERTY_SEARCH_PRICE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={bedsPreset}
        onChange={(e) => setBedsPreset(e.target.value as PropertySearchPresetFilters["bedsPreset"])}
        className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20"
      >
        {PROPERTY_SEARCH_BED_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={bathsPreset}
        onChange={(e) => setBathsPreset(e.target.value as PropertySearchPresetFilters["bathsPreset"])}
        className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20"
      >
        {PROPERTY_SEARCH_BATH_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Join Button */}
      <button
        type="button"
        onClick={handleJoinClick}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-6 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:bg-[var(--sandstone-sand-gold)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/50"
      >
        Join
      </button>
    </div>
  );
}