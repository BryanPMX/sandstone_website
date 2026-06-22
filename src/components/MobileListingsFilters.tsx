"use client";

import type { PropertySearchPresetFilters } from "@/lib";
import {
  getPropertySearchPriceOptions,
  type PropertySearchMarket,
} from "@/lib";

interface MobileListingsFiltersProps {
  market: PropertySearchMarket;
  listingType: "active" | "rental";
  pricePreset: PropertySearchPresetFilters["pricePreset"];
  bedsPreset: PropertySearchPresetFilters["bedsPreset"];
  bathsPreset: PropertySearchPresetFilters["bathsPreset"];
  onMarketChange: (market: PropertySearchMarket) => void;
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
  const priceOptions = getPropertySearchPriceOptions(listingType);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-center gap-3 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 p-4 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.48)]">
        <div className="flex rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] p-1">
          <button
            type="button"
            onClick={() => onListingTypeChange("active")}
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
            onClick={() => onListingTypeChange("rental")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              listingType === "rental"
                ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
                : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
            }`}
          >
            Rent
          </button>
        </div>

        <select
          value={pricePreset}
          onChange={(e) =>
            onPriceChange(
              e.target.value as PropertySearchPresetFilters["pricePreset"]
            )
          }
          className="h-12 min-w-[156px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E")',
            backgroundPosition: "right 0.8rem center",
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
          value={bedsPreset}
          onChange={(e) =>
            onBedsChange(
              e.target.value as PropertySearchPresetFilters["bedsPreset"]
            )
          }
          className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E")',
            backgroundPosition: "right 0.8rem center",
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
          value={bathsPreset}
          onChange={(e) =>
            onBathsChange(
              e.target.value as PropertySearchPresetFilters["bathsPreset"]
            )
          }
          className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20 appearance-none bg-no-repeat"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%22%23111c3d%22 opacity=%220.55%22 d=%22M2 4l4 4 4-4z%22/%3E%3C/svg%3E")',
            backgroundPosition: "right 0.8rem center",
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
    </div>
  );
}