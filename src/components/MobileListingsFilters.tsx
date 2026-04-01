"use client";

import type { PropertySearchPresetFilters } from "@/lib";
import {
  PROPERTY_SEARCH_PRICE_OPTIONS,
  PROPERTY_SEARCH_BED_OPTIONS,
  PROPERTY_SEARCH_BATH_OPTIONS,
} from "@/lib";

interface MobileListingsFiltersProps {
  listingType: "active" | "rental";
  pricePreset: PropertySearchPresetFilters["pricePreset"];
  bedsPreset: PropertySearchPresetFilters["bedsPreset"];
  bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  onListingTypeChange: (type: "active" | "rental") => void;
  onPriceChange: (price: PropertySearchPresetFilters["pricePreset"]) => void;
  onBedsChange: (beds: PropertySearchPresetFilters["bedsPreset"]) => void;
  onBathsChange: (baths: PropertySearchPresetFilters["bathsPreset"]) => void;
}

export function MobileListingsFilters({
  listingType,
  pricePreset,
  bedsPreset,
  bathsPreset,
  onListingTypeChange,
  onPriceChange,
  onBedsChange,
  onBathsChange,
}: MobileListingsFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-4 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.48)]">
      {/* Buy/Rent Filter - Always visible */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--sandstone-charcoal)]">
          Property Type
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onListingTypeChange("active")}
            className={`flex-1 rounded-lg py-3 px-4 text-sm font-bold transition-all ${
              listingType === "active"
                ? "bg-[var(--sandstone-navy)] text-white shadow-[0_4px_12px_rgba(37,52,113,0.3)]"
                : "border-2 border-[var(--sandstone-navy)]/20 bg-white text-[var(--sandstone-navy)] hover:border-[var(--sandstone-navy)]/40"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => onListingTypeChange("rental")}
            className={`flex-1 rounded-lg py-3 px-4 text-sm font-bold transition-all ${
              listingType === "rental"
                ? "bg-[var(--sandstone-navy)] text-white shadow-[0_4px_12px_rgba(37,52,113,0.3)]"
                : "border-2 border-[var(--sandstone-navy)]/20 bg-white text-[var(--sandstone-navy)] hover:border-[var(--sandstone-navy)]/40"
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--sandstone-charcoal)]">
          Price Range
        </label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_SEARCH_PRICE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onPriceChange(option.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                pricePreset === option.value
                  ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_rgba(37,52,113,0.2)]"
                  : "border border-[var(--sandstone-navy)]/20 bg-white text-[var(--sandstone-navy)] hover:border-[var(--sandstone-navy)]/40"
              }`}
            >
              {option.value === "any" ? "Any" : option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Beds Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--sandstone-charcoal)]">
          Bedrooms
        </label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_SEARCH_BED_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onBedsChange(option.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                bedsPreset === option.value
                  ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_rgba(37,52,113,0.2)]"
                  : "border border-[var(--sandstone-navy)]/20 bg-white text-[var(--sandstone-navy)] hover:border-[var(--sandstone-navy)]/40"
              }`}
            >
              {option.value === "any" ? "Any" : option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Baths Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--sandstone-charcoal)]">
          Bathrooms
        </label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_SEARCH_BATH_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onBathsChange(option.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                bathsPreset === option.value
                  ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_rgba(37,52,113,0.2)]"
                  : "border border-[var(--sandstone-navy)]/20 bg-white text-[var(--sandstone-navy)] hover:border-[var(--sandstone-navy)]/40"
              }`}
            >
              {option.value === "any" ? "Any" : option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
