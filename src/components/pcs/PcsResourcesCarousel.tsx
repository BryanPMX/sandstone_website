"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type BahLocation = "fort-bliss" | "el-paso" | "horizon-city";
type BahRank = "E1-E4" | "E5" | "E6" | "E7" | "E8-E9" | "O1-O2" | "O3" | "O4+";

const BAH_RATES: Record<
  BahLocation,
  Record<BahRank, { withDependents: number; withoutDependents: number }>
> = {
  "fort-bliss": {
    "E1-E4": { withDependents: 1500, withoutDependents: 1280 },
    E5: { withDependents: 1720, withoutDependents: 1460 },
    E6: { withDependents: 1880, withoutDependents: 1600 },
    E7: { withDependents: 2040, withoutDependents: 1740 },
    "E8-E9": { withDependents: 2280, withoutDependents: 1950 },
    "O1-O2": { withDependents: 2140, withoutDependents: 1840 },
    O3: { withDependents: 2360, withoutDependents: 2030 },
    "O4+": { withDependents: 2590, withoutDependents: 2220 },
  },
  "el-paso": {
    "E1-E4": { withDependents: 1460, withoutDependents: 1240 },
    E5: { withDependents: 1680, withoutDependents: 1420 },
    E6: { withDependents: 1840, withoutDependents: 1560 },
    E7: { withDependents: 1990, withoutDependents: 1700 },
    "E8-E9": { withDependents: 2230, withoutDependents: 1910 },
    "O1-O2": { withDependents: 2100, withoutDependents: 1800 },
    O3: { withDependents: 2310, withoutDependents: 1980 },
    "O4+": { withDependents: 2540, withoutDependents: 2180 },
  },
  "horizon-city": {
    "E1-E4": { withDependents: 1420, withoutDependents: 1210 },
    E5: { withDependents: 1640, withoutDependents: 1390 },
    E6: { withDependents: 1790, withoutDependents: 1520 },
    E7: { withDependents: 1940, withoutDependents: 1660 },
    "E8-E9": { withDependents: 2170, withoutDependents: 1860 },
    "O1-O2": { withDependents: 2050, withoutDependents: 1760 },
    O3: { withDependents: 2250, withoutDependents: 1930 },
    "O4+": { withDependents: 2470, withoutDependents: 2120 },
  },
};

const locationOptions: Array<{ value: BahLocation; label: string }> = [
  { value: "fort-bliss", label: "Fort Bliss" },
  { value: "el-paso", label: "El Paso" },
  { value: "horizon-city", label: "Horizon City" },
];

const rankOptions: BahRank[] = ["E1-E4", "E5", "E6", "E7", "E8-E9", "O1-O2", "O3", "O4+"];

export function PcsResourcesCarousel() {
  const [location, setLocation] = useState<BahLocation>("fort-bliss");
  const [rank, setRank] = useState<BahRank>("E6");
  const [hasDependents, setHasDependents] = useState(true);

  const estimatedBah = useMemo(() => {
    const rates = BAH_RATES[location][rank];
    return hasDependents ? rates.withDependents : rates.withoutDependents;
  }, [hasDependents, location, rank]);

  return (
    <section className="bg-white px-4 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-navy)]/65">
            PCS Mission Resources
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
            Relocation Tools for Military Families
          </h2>
        </div>

        <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
          <div className="mb-3 flex min-w-[920px] gap-4 md:grid md:min-w-0 md:grid-cols-3">
            <div className="flex justify-start md:justify-center">
              <span className="rounded-full border border-[var(--sandstone-navy)]/16 bg-[var(--sandstone-off-white)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-navy)]/75">
                Budget-Ready Estimate
              </span>
            </div>
            <div className="flex justify-start md:justify-center">
              <span className="rounded-full border border-[var(--sandstone-navy)]/16 bg-[var(--sandstone-off-white)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-navy)]/75">
                VA-Savvy Guidance
              </span>
            </div>
            <div className="flex justify-start md:justify-center">
              <span className="rounded-full border border-[var(--sandstone-navy)]/16 bg-[var(--sandstone-off-white)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-navy)]/75">
                Fort Bliss Focused
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
          <div className="flex min-w-[920px] gap-4 md:grid md:min-w-0 md:grid-cols-3">
            <article className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)] p-5 shadow-[0_18px_35px_-28px_rgba(17,24,61,0.5)]">
              <div className="flex items-center gap-3">
                <Image
                  src="/PCS_Section_Imgs/calculator_ion.webp"
                  alt="BAH calculator"
                  width={52}
                  height={52}
                  className="h-12 w-12 object-contain"
                />
                <h2 className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                  BAH Planning Calculator
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
                Estimate your monthly housing allowance by rank, dependents, and local market.
              </p>

              <div className="mt-4 grid gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-charcoal)]/70">
                  Location
                  <select
                    value={location}
                    onChange={(event) => setLocation(event.target.value as BahLocation)}
                    className="mt-1.5 block h-10 w-full rounded-xl border border-[var(--sandstone-navy)]/20 bg-white px-3 text-sm text-[var(--sandstone-charcoal)]"
                  >
                    {locationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-charcoal)]/70">
                  Rank
                  <select
                    value={rank}
                    onChange={(event) => setRank(event.target.value as BahRank)}
                    className="mt-1.5 block h-10 w-full rounded-xl border border-[var(--sandstone-navy)]/20 bg-white px-3 text-sm text-[var(--sandstone-charcoal)]"
                  >
                    {rankOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-charcoal)]/70">
                  Dependents
                  <select
                    value={hasDependents ? "with" : "without"}
                    onChange={(event) => setHasDependents(event.target.value === "with")}
                    className="mt-1.5 block h-10 w-full rounded-xl border border-[var(--sandstone-navy)]/20 bg-white px-3 text-sm text-[var(--sandstone-charcoal)]"
                  >
                    <option value="with">With dependents</option>
                    <option value="without">Without dependents</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 rounded-xl border border-[var(--sandstone-sand-gold)]/45 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--sandstone-charcoal)]/70">
                  Estimated Monthly BAH
                </p>
                <p className="mt-1 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                  ${estimatedBah.toLocaleString()}
                </p>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-[var(--sandstone-charcoal)]/65">
                Planning estimate only. Final BAH can vary by official DoD rates and duty status.
              </p>
            </article>

            <article className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)] p-5 shadow-[0_18px_35px_-28px_rgba(17,24,61,0.5)]">
              <div className="flex items-center gap-3">
                <Image
                  src="/PCS_Section_Imgs/medal_icon.webp"
                  alt="VA Loan Guide"
                  width={52}
                  height={52}
                  className="h-12 w-12 object-contain"
                />
                <h2 className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                  VA Loan Guide
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
                Step-by-step guidance to use your VA loan benefit with confidence in El Paso.
              </p>

              <a
                href="https://www.va.gov/housing-assistance/home-loans/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[var(--sandstone-sand-gold)]/65 px-6 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:bg-white"
              >
                View Guide
              </a>
            </article>

            <article className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)] p-5 shadow-[0_18px_35px_-28px_rgba(17,24,61,0.5)]">
              <div className="flex items-center gap-3">
                <Image
                  src="/PCS_Section_Imgs/mountain_icon.webp"
                  alt="Fort Bliss Area Guide"
                  width={52}
                  height={52}
                  className="h-12 w-12 object-contain"
                />
                <h2 className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                  Fort Bliss Area Guide
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
                Explore communities around Fort Bliss, commute zones, schools, and local essentials.
              </p>

              <Link
                href="/listings/map?search=Fort+Bliss&radiusMiles=20"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[var(--sandstone-sand-gold)]/65 px-6 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:bg-white"
              >
                Explore Guide
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
