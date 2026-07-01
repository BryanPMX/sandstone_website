import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingCarousel } from "@/components/properties";
import { fetchMyPropertyCards } from "@/services";
import type { PropertyCard } from "@/types";
import { PcsHeroSearch } from "./PcsHeroSearch.client";
import { Star } from "lucide-react";
import { PcsHeader } from "./PcsHeader.client";

export const metadata = {
  title: "PCS | Homes Near Fort Bliss",
  description:
    "Military-focused home search near Fort Bliss. Filter by drive time to gates and find the right home for your next PCS move.",
};

const SECTION_MAX = "mx-auto w-full max-w-6xl px-4 lg:px-6";

const FORT_BLISS_CENTER = {
  lat: 31.8126,
  lng: -106.4222,
};

const FORT_BLISS_MAX_MILES = 25;

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8;

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function rankByFortBliss(property: PropertyCard): number {
  if (
    typeof property.latitude !== "number" ||
    typeof property.longitude !== "number"
  ) {
    return Number.POSITIVE_INFINITY;
  }

  return distanceMiles(
    FORT_BLISS_CENTER.lat,
    FORT_BLISS_CENTER.lng,
    property.latitude,
    property.longitude
  );
}

function extractZipCode(
  property: Pick<PropertyCard, "location" | "mapAddress">
): string | null {
  const haystack = `${property.location ?? ""} ${
    property.mapAddress ?? ""
  }`;

  const match = haystack.match(/\b(\d{5})(?:-\d{4})?\b/);

  return match?.[1] ?? null;
}

export default async function PCSPage() {
  const properties = await fetchMyPropertyCards();

  const featuredNearFortBliss = (() => {
    const withCoords = properties.filter(
      (property) =>
        typeof property.latitude === "number" &&
        Number.isFinite(property.latitude) &&
        typeof property.longitude === "number" &&
        Number.isFinite(property.longitude)
    );

    const nearByDistance = withCoords
      .filter(
        (property) =>
          rankByFortBliss(property) <= FORT_BLISS_MAX_MILES
      )
      .sort(
        (a, b) =>
          rankByFortBliss(a) - rankByFortBliss(b)
      );

    const inZipRange = (property: PropertyCard) => {
      const zip = extractZipCode(property);

      if (!zip) return false;

      const zipNumber = Number(zip);

      return (
        Number.isFinite(zipNumber) &&
        zipNumber >= 79916 &&
        zipNumber <= 79918
      );
    };

    const preferred = nearByDistance.filter(inZipRange);

    const picked = (
      preferred.length >= 3
        ? preferred
        : nearByDistance
    ).slice(0, 6);

    return picked;
  })();

  return (
    <>
      <PcsHeader />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--sandstone-navy)]">
          <div className="relative h-[36vh] min-h-[250px] w-full lg:h-[760px] lg:min-h-[760px]">

            <picture className="absolute inset-0 block h-full w-full">
              <img
                src="/tinified/hero.webp"
                alt=""
                className="h-full w-full object-cover object-[center_40%]"
                fetchPriority="high"
              />
            </picture>

            <div className="absolute inset-x-0 bottom-28 z-10">
              <div className={SECTION_MAX}>
                <PcsHeroSearch
                  formId="pcs-hero-search"
                  showCta={false}
                />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-10 z-10">
              <div className="flex justify-center px-4">
                <button
                  type="submit"
                  form="pcs-hero-search"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-10 text-[13px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_-26px_rgba(37,52,113,0.85)] transition hover:bg-[var(--sandstone-navy-deep)]"
                >
                  Start the mission
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ACTION TILES */}
        <section className="py-12">
          <div className={SECTION_MAX}>
            <div className="grid gap-6 rounded-2xl border border-[var(--sandstone-charcoal)]/8 bg-white p-6 shadow-[0_22px_56px_-40px_rgba(37,52,113,0.35)] md:grid-cols-3 md:gap-4">

              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-xl bg-[var(--sandstone-off-white)]">
                  <Image
                    src="/tinified/calculator_ion.webp"
                    alt=""
                    fill
                    className="object-contain p-2"
                    sizes="48px"
                  />
                </div>

                <div>
                  <p className="font-heading text-sm font-extrabold tracking-wide text-[var(--sandstone-navy)]">
                    BAH Calculator
                  </p>

                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/75">
                    Estimate your Fort Bliss housing allowance and plan your budget.
                  </p>

                  <Link
                    href="/sell#mortgage-calculator"
                    className="mt-2 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)] hover:underline"
                  >
                    Calculate now →
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-xl bg-[var(--sandstone-off-white)]">
                  <Image
                    src="/tinified/medal_icon.webp"
                    alt=""
                    fill
                    className="object-contain p-2"
                    sizes="48px"
                  />
                </div>

                <div>
                  <p className="font-heading text-sm font-extrabold tracking-wide text-[var(--sandstone-navy)]">
                    VA Loan Guide
                  </p>

                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/75">
                    Learn how to use your VA benefit with confidence on your PCS move.
                  </p>

                  <Link
                    href="/pcs/va-loan-guide"
                    className="mt-2 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)] hover:underline"
                  >
                    View guide →
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-xl bg-[var(--sandstone-off-white)]">
                  <Image
                    src="/tinified/mountain_icon.webp"
                    alt=""
                    fill
                    className="object-contain p-2"
                    sizes="48px"
                  />
                </div>

                <div>
                  <p className="font-heading text-sm font-extrabold tracking-wide text-[var(--sandstone-navy)]">
                    Fort Bliss Area Guide
                  </p>

                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/75">
                    Schools, commute times, neighborhoods, and local insights for military families.
                  </p>

                  <Link
                    href="/blog"
                    className="mt-2 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)] hover:underline"
                  >
                    Explore guide →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED HOMES */}
        <section className="pb-16">
          <div className={SECTION_MAX}>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                Featured homes near Fort Bliss
              </h2>
            </div>

            {featuredNearFortBliss.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-[var(--sandstone-charcoal)]/80">
                  We’re updating Fort Bliss listings right now.
                </p>
              </div>
            ) : (
              <ListingCarousel
                properties={featuredNearFortBliss.slice(0, 9)}
              />
            )}
          </div>
        </section>



      </main>

      <SiteFooter />
    </>
  );
}