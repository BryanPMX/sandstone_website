"use client";

import { useState, useMemo, useEffect } from "react";
import { ListingCard } from "@/components/properties/ListingCard";
import { ListingsMapPanel } from "@/components/properties/ListingsMapPanel";
import {
  filterPropertyCardsWithFilters,
  resolvePresetFiltersToNumeric,
  getPropertySearchPriceOptions,
  type PropertySearchPricePreset,
  type PropertySearchCountPreset,
} from "@/lib";
import type { PropertyCard } from "@/types";

const NE_CENTER: [number, number] = [31.892, -106.431];
const NE_ZOOM = 12;
const PAGE_SIZE = 6;

const SELECT_CLS =
  "h-11 min-w-[120px] appearance-none cursor-pointer rounded-full border border-[var(--sandstone-navy)]/15 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-sand-gold)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/30 bg-no-repeat [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23111c3d%22%20opacity%3D%220.55%22%20d%3D%22M2%204l4%204%204-4z%22%2F%3E%3C%2Fsvg%3E')] [background-position:right_0.6rem_center] [background-size:12px]";

type ListingType = "active" | "rental";

export function NortheastListings() {
  const [allListings, setAllListings] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState<ListingType>("active");
  const [price, setPrice] = useState<PropertySearchPricePreset>("any");
  const [beds, setBeds] = useState<PropertySearchCountPreset>("any");
  const [baths, setBaths] = useState<PropertySearchCountPreset>("any");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/listings/northeast-el-paso")
      .then(async (r) => {
        if (!r.ok) throw new Error();

        const data = await r.json();

        // Always make sure we end up with an array
        if (Array.isArray(data)) {
          setAllListings(data);
        } else if (Array.isArray(data.properties)) {
          setAllListings(data.properties);
        } else if (Array.isArray(data.results)) {
          setAllListings(data.results);
        } else {
          setAllListings([]);
        }
      })
      .catch(() => setAllListings([]))
      .finally(() => setLoading(false));
  }, []);

  const priceOptions = useMemo(
    () => getPropertySearchPriceOptions(listingType),
    [listingType]
  );

  const filtered = useMemo(() => {
    const { minPrice, maxPrice, minBeds, minBaths } =
      resolvePresetFiltersToNumeric({
        pricePreset: price,
        bedsPreset: beds,
        bathsPreset: baths,
      });

    return filterPropertyCardsWithFilters(allListings, {
      minPrice,
      maxPrice,
      minBeds,
      minBaths,
      listingType,
    });
  }, [allListings, listingType, price, beds, baths]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const visible = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const startIdx =
    filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;

  const endIdx = Math.min(safePage * PAGE_SIZE, filtered.length);

  function handleFilterChange<T>(setter: (v: T) => void, value: T) {
    setter(value);
    setPage(1);
  }

  function handleListingTypeChange(type: ListingType) {
    setListingType(type);
    setPrice("any");
    setPage(1);
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 px-4 py-3 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.3)]">

        <div className="flex rounded-full border border-[var(--sandstone-navy)]/15 bg-[var(--sandstone-off-white)] p-1">
          {(["active", "rental"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleListingTypeChange(type)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                listingType === type
                  ? "bg-[var(--sandstone-navy)] text-white"
                  : "text-[var(--sandstone-charcoal)]"
              }`}
            >
              {type === "active" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>

        <select
          value={price}
          onChange={(e) =>
            handleFilterChange(
              setPrice,
              e.target.value as PropertySearchPricePreset
            )
          }
          className={SELECT_CLS}
        >
          {priceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={beds}
          onChange={(e) =>
            handleFilterChange(
              setBeds,
              e.target.value as PropertySearchCountPreset
            )
          }
          className={SELECT_CLS}
        >
          <option value="any">Beds</option>
          <option value="1">1+ Beds</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
        </select>

        <select
          value={baths}
          onChange={(e) =>
            handleFilterChange(
              setBaths,
              e.target.value as PropertySearchCountPreset
            )
          }
          className={SELECT_CLS}
        >
          <option value="any">Baths</option>
          <option value="1">1+ Baths</option>
          <option value="2">2+ Baths</option>
          <option value="3">3+ Baths</option>
        </select>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,1fr)]">

        <ListingsMapPanel
          properties={filtered}
          initialCenter={NE_CENTER}
          initialZoom={NE_ZOOM}
          mapContextQuery={{ from: "northeast-el-paso" }}
        />

        <div className="flex flex-col">

          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--sandstone-charcoal)]/55">
              {loading
                ? "Loading listings..."
                : filtered.length === 0
                ? "No listings found"
                : `Showing ${startIdx}–${endIdx} of ${filtered.length}`}
            </p>

            {!loading && totalPages > 1 && (
              <p className="text-[11px] text-[var(--sandstone-charcoal)]/40">
                Page {safePage} of {totalPages}
              </p>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] animate-pulse rounded-2xl bg-[var(--sandstone-navy)]/6"
                />
              ))}
            </div>
          ) : visible.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {visible.map((listing, i) => (
                <ListingCard
                  key={listing.id}
                  property={listing}
                  priority={i < 4}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] py-16 text-center">
              <p className="font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                No Northeast El Paso listings found.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}