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

const UV_CENTER: [number, number] = [31.882, -106.582];
const UV_ZOOM = 12;
const PAGE_SIZE = 6;

const SELECT_CLS =
  "h-11 min-w-[120px] appearance-none cursor-pointer rounded-full border border-[var(--sandstone-navy)]/15 bg-[var(--sandstone-off-white)] pl-4 pr-8 text-sm font-medium text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-sand-gold)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/30 bg-no-repeat [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23111c3d%22%20opacity%3D%220.55%22%20d%3D%22M2%204l4%204%204-4z%22%2F%3E%3C%2Fsvg%3E')] [background-position:right_0.6rem_center] [background-size:12px]";

type ListingType = "active" | "rental";

export function UpperValleyListings() {
  const [allListings, setAllListings] = useState<PropertyCard[]>([]);
  const [loading, setLoading]         = useState(true);
  const [listingType, setListingType] = useState<ListingType>("active");
  const [price, setPrice]             = useState<PropertySearchPricePreset>("any");
  const [beds,  setBeds]              = useState<PropertySearchCountPreset>("any");
  const [baths, setBaths]             = useState<PropertySearchCountPreset>("any");
  const [page,  setPage]              = useState(1);

  useEffect(() => {
    fetch("/api/listings/active")
      .then(r => r.json())
      .then((data: PropertyCard[]) => {
        const uv = data.filter(l => {
          const addr = (l.mapAddress ?? "").toLowerCase();
          const loc  = (l.location  ?? "").toLowerCase();
          return addr.includes("79922") || loc.includes("upper valley");
        });
        setAllListings(uv);
      })
      .catch(() => setAllListings([]))
      .finally(() => setLoading(false));
  }, []);

  const priceOptions = useMemo(() => getPropertySearchPriceOptions(listingType), [listingType]);

  const filtered = useMemo(() => {
    const { minPrice, maxPrice, minBeds, minBaths } = resolvePresetFiltersToNumeric({
      pricePreset: price,
      bedsPreset:  beds,
      bathsPreset: baths,
    });
    return filterPropertyCardsWithFilters(allListings, {
      minPrice, maxPrice, minBeds, minBaths,
      listingType,
    });
  }, [allListings, price, beds, baths, listingType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const visible    = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const startIdx   = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endIdx     = Math.min(safePage * PAGE_SIZE, filtered.length);

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

      {/* ── Filter bar ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 px-4 py-3 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.3)]">

        <div className="flex rounded-full border border-[var(--sandstone-navy)]/15 bg-[var(--sandstone-off-white)] p-1">
          {(["active", "rental"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleListingTypeChange(type)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                listingType === type
                  ? "bg-[var(--sandstone-navy)] text-white shadow-sm"
                  : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/8"
              }`}
            >
              {type === "active" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={price}
            onChange={e => handleFilterChange(setPrice, e.target.value as PropertySearchPricePreset)}
            className={SELECT_CLS}
          >
            {priceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="relative">
          <select
            value={beds}
            onChange={e => handleFilterChange(setBeds, e.target.value as PropertySearchCountPreset)}
            className={SELECT_CLS}
          >
            <option value="any">Beds</option>
            <option value="1">1+ Beds</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
          </select>
        </div>

        <div className="relative">
          <select
            value={baths}
            onChange={e => handleFilterChange(setBaths, e.target.value as PropertySearchCountPreset)}
            className={SELECT_CLS}
          >
            <option value="any">Baths</option>
            <option value="1">1+ Baths</option>
            <option value="2">2+ Baths</option>
            <option value="3">3+ Baths</option>
          </select>
        </div>
      </div>

      {/* ── Map + Listings ───────────────────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,1fr)]">

        <ListingsMapPanel
          properties={filtered}
          initialCenter={UV_CENTER}
          initialZoom={UV_ZOOM}
          mapContextQuery={{ from: "upper-valley" }}
        />

        <div className="flex flex-col">

          {/* Count + page label */}
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

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-[var(--sandstone-navy)]/6 aspect-[3/4]" />
              ))}
            </div>
          ) : visible.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {visible.map((listing, i) => (
                <ListingCard key={listing.id} property={listing} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-[var(--sandstone-navy)]/8 bg-[var(--sandstone-off-white)] py-16 text-center">
              <p className="font-heading text-base font-bold text-[var(--sandstone-navy)]">
                No listings match your filters
              </p>
              <button
                onClick={() => { setPrice("any"); setBeds("any"); setBaths("any"); setListingType("active"); setPage(1); }}
                className="mt-3 text-sm font-semibold text-[var(--sandstone-sand-gold)] underline underline-offset-2"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="rounded-full border border-[var(--sandstone-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-sand-gold)]/50 disabled:opacity-30"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, k) => k + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1)
                .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                  if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
                  acc.push(n);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "…" ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-sm text-[var(--sandstone-charcoal)]/40">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item as number)}
                      className={`h-9 w-9 rounded-full text-sm font-bold transition ${
                        item === safePage
                          ? "bg-[var(--sandstone-navy)] text-white"
                          : "border border-[var(--sandstone-navy)]/15 text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-sand-gold)]/50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="rounded-full border border-[var(--sandstone-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-sand-gold)]/50 disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
