"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  buildListingsMapHref,
  DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
  type PropertySearchCountPreset,
} from "@/lib";

const FORT_BLISS_CENTER = { lat: 31.8126, lng: -106.4222 };

type DriveTimePreset = "5" | "10" | "15" | "30";

function driveTimeToRadiusMiles(value: DriveTimePreset): number {
  // Approx miles assuming ~35mph average drive near El Paso.
  switch (value) {
    case "5":
      return 3;
    case "10":
      return 6;
    case "15":
      return 9;
    case "30":
      return 18;
    default:
      return 6;
  }
}

export function PcsHeroSearch({
  formId = "pcs-hero-search",
  showCta = true,
}: {
  formId?: string;
  showCta?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState<PropertySearchCountPreset>(
    DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.bedsPreset
  );
  const [baths, setBaths] = useState<PropertySearchCountPreset>(
    DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.bathsPreset
  );
  const [driveTime, setDriveTime] = useState<DriveTimePreset>("10");

  const href = useMemo(() => {
    return buildListingsMapHref({
      market: "el-paso",
      search: address.trim() || undefined,
      centerLat: FORT_BLISS_CENTER.lat,
      centerLng: FORT_BLISS_CENTER.lng,
      radiusMiles: driveTimeToRadiusMiles(driveTime),
      filterPresets: {
        bedsPreset: beds,
        bathsPreset: baths,
      },
      listingType: "active",
    });
  }, [address, baths, beds, driveTime]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => router.push(href));
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="w-full"
      aria-label="Search homes near Fort Bliss"
    >
      <div className="grid gap-2 rounded-2xl border border-[var(--sandstone-charcoal)]/14 bg-[#eef0f4] p-2 shadow-[0_18px_50px_-38px_rgba(37,52,113,0.45)] md:grid-cols-4 md:grid-rows-2 md:gap-x-4 md:gap-y-2 md:rounded-[1.35rem] md:p-4">
        {/* Row 1: labels */}
        <p className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/62 md:block">
          ZIP / Address
        </p>
        <p className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/62 md:block">
          Beds
        </p>
        <p className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/62 md:block">
          Baths
        </p>
        <p className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/62 md:block">
          Drive time to gates
        </p>

        {/* Mobile: show label+control per field */}
        <div className="rounded-xl bg-white px-3 py-2 md:hidden">
          <label
            htmlFor="pcs-search"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/58"
          >
            ZIP / Address
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)]">
            <Search aria-hidden className="h-4 w-4 text-[var(--sandstone-charcoal)]/45" />
            <input
              id="pcs-search"
              type="search"
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
              placeholder="Enter ZIP or address"
              className="h-9 w-full border-none bg-transparent text-[13px] font-semibold text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/36 focus:outline-none"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="rounded-xl bg-white px-3 py-2 md:hidden">
          <label
            htmlFor="pcs-beds"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/58"
          >
            Beds
          </label>
          <select
            id="pcs-beds"
            value={beds}
            onChange={(e) => setBeds(e.currentTarget.value as PropertySearchCountPreset)}
            className="mt-1.5 h-9 w-full rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 text-[13px] font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/24"
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="rounded-xl bg-white px-3 py-2 md:hidden">
          <label
            htmlFor="pcs-baths"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/58"
          >
            Baths
          </label>
          <select
            id="pcs-baths"
            value={baths}
            onChange={(e) => setBaths(e.currentTarget.value as PropertySearchCountPreset)}
            className="mt-1.5 h-9 w-full rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 text-[13px] font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/24"
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="rounded-xl bg-white px-3 py-2 md:hidden">
          <label
            htmlFor="pcs-drive-time"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sandstone-charcoal)]/58"
          >
            Drive time to gates
          </label>
          <select
            id="pcs-drive-time"
            value={driveTime}
            onChange={(e) => setDriveTime(e.currentTarget.value as DriveTimePreset)}
            className="mt-1.5 h-9 w-full rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 text-[13px] font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/24"
          >
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
          </select>
        </div>

        {/* Desktop row 2: controls */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)]">
          <Search aria-hidden className="h-4 w-4 text-[var(--sandstone-charcoal)]/45" />
          <input
            id="pcs-search"
            type="search"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="Enter ZIP or address"
            className="h-10 w-full border-none bg-transparent text-[13px] font-semibold text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/36 focus:outline-none"
            autoComplete="off"
          />
        </div>

        <select
          id="pcs-beds"
          value={beds}
          onChange={(e) => setBeds(e.currentTarget.value as PropertySearchCountPreset)}
          className="hidden md:block h-10 w-full rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 text-[13px] font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/24"
        >
          <option value="any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <select
          id="pcs-baths"
          value={baths}
          onChange={(e) => setBaths(e.currentTarget.value as PropertySearchCountPreset)}
          className="hidden md:block h-10 w-full rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 text-[13px] font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/24"
        >
          <option value="any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <select
          id="pcs-drive-time"
          value={driveTime}
          onChange={(e) => setDriveTime(e.currentTarget.value as DriveTimePreset)}
          className="hidden md:block h-10 w-full rounded-lg border border-[var(--sandstone-charcoal)]/18 bg-white px-2.5 text-[13px] font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.12)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/24"
        >
          <option value="5">5 min</option>
          <option value="10">10 min</option>
          <option value="15">15 min</option>
          <option value="30">30 min</option>
        </select>
      </div>

      {showCta ? (
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-10 text-[13px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_-26px_rgba(37,52,113,0.85)] transition hover:bg-[var(--sandstone-navy-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            Start the mission
          </button>
        </div>
      ) : null}
    </form>
  );
}

