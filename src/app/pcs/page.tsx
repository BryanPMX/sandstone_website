import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingCarousel } from "@/components/properties";
import { fetchMyPropertyCards } from "@/services";
import type { PropertyCard } from "@/types";
import { PcsHeroSearch } from "./PcsHeroSearch.client";
import { PcsHeader } from "./PcsHeader.client";
import { FinancingBanner } from "@/components/FinancingBanner";

export const metadata = {
  title: "VA Loan Homes in El Paso | Fort Bliss Military Homes",
  description:
    "Browse VA loan homes in El Paso near Fort Bliss. Search military-friendly homes, learn about VA loans, calculate your BAH, and plan your PCS move with Sandstone.",
};

const SECTION_MAX = "mx-auto w-full max-w-6xl px-4 lg:px-6";

const FORT_BLISS_CENTER = {
  lat: 31.8126,
  lng: -106.4222,
};

const FORT_BLISS_MAX_MILES = 25;

const resourceTiles = [
  {
    title: "BAH Calculator",
    description: "Estimate your Fort Bliss housing allowance and plan your budget.",
    href: "/bah-calculator",
    cta: "Calculate Now",
    icon: "/tinified/calculator_ion.webp",
  },
  {
    title: "VA Loan Guide",
    description: "Learn how to use your VA benefit with confidence on your PCS move.",
    href: "/pcs/va-loan-guide",
    cta: "View Guide",
    icon: "/tinified/medal_icon.webp",
  },
  {
    title: "Fort Bliss Area Guide",
    description:
      "Schools, commute times, neighborhoods, and local insights for military families.",
    href: "/blog",
    cta: "Explore Guide",
    icon: "/tinified/mountain_icon.webp",
  },
  {
    title: "Fort Bliss BAH 2026",
    description:
      "Review 2026 BAH rates and see how your housing allowance affects your home search.",
    href: "/bah-fort-bliss-2026",
    cta: "View BAH Rates",
    icon: "/tinified/calculator_ion.webp",
  },
  {
    title: "VA Loans",
    description:
      "Learn how VA loans work for military buyers relocating to El Paso and Fort Bliss.",
    href: "/va-loans",
    cta: "Learn More",
    icon: "/tinified/medal_icon.webp",
  },
  {
    title: "PCS El Paso Checklist",
    description:
      "Follow a step-by-step PCS checklist for moving to El Paso, Fort Bliss, and nearby areas.",
    href: "/pcs-el-paso-checklist",
    cta: "Open Checklist",
    icon: "/VA_Loan_Guide_Imgs/Downland_Checklist_VA.png",
  },
] as const;

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
  const haystack = `${property.location ?? ""} ${property.mapAddress ?? ""}`;

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
      .filter((property) => rankByFortBliss(property) <= FORT_BLISS_MAX_MILES)
      .sort((a, b) => rankByFortBliss(a) - rankByFortBliss(b));

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

    const picked = (preferred.length >= 3 ? preferred : nearByDistance).slice(
      0,
      6
    );

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
                <PcsHeroSearch formId="pcs-hero-search" showCta={false} />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-10 z-10">
              <div className="flex justify-center px-4">
                <button
                  type="submit"
                  form="pcs-hero-search"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-10 text-[13px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_-26px_rgba(37,52,113,0.85)] transition hover:bg-[var(--sandstone-navy-deep)]"
                >
                  Search VA Loan Homes
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ACTION TILES */}
        <section className="py-12">
          <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
            <div className="rounded-3xl border border-[var(--sandstone-charcoal)]/8 bg-white p-5 shadow-[0_22px_56px_-40px_rgba(37,52,113,0.35)] sm:p-6">
              <div className="mb-6 text-center">
                <h2 className="font-heading text-2xl font-bold tracking-normal text-[var(--sandstone-navy)]">
                  Military Buyer Resources
                </h2>

                <p className="mt-2 text-sm tracking-normal text-[var(--sandstone-charcoal)]/70">
                  Tools and guides to help you plan your PCS move, VA loan, and
                  Fort Bliss home search.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resourceTiles.map((tile) => (
                  <Link
                    key={tile.title}
                    href={tile.href}
                    className="group flex min-h-[190px] flex-col rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/60 p-5 transition hover:-translate-y-1 hover:border-[var(--sandstone-sand-gold)]/50 hover:bg-white hover:shadow-[0_18px_40px_-30px_rgba(37,52,113,0.45)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-12 w-12 shrink-0 rounded-xl bg-white shadow-sm">
                        <Image
                          src={tile.icon}
                          alt=""
                          fill
                          className="object-contain p-2"
                          sizes="48px"
                        />
                      </div>

                      <div>
                        <h3 className="font-heading text-base font-bold tracking-normal text-[var(--sandstone-navy)]">
                          {tile.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed tracking-normal text-[var(--sandstone-charcoal)]/75">
                          {tile.description}
                        </p>
                      </div>
                    </div>

                    <span className="mt-auto pt-5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)] group-hover:underline">
                      {tile.cta} &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FinancingBanner />

        {/* FEATURED HOMES */}
        <section className="pb-16">
          <div className={SECTION_MAX}>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                VA Loan Homes in El Paso Near Fort Bliss
              </h2>

              <p className="mt-3 text-center text-[var(--sandstone-charcoal)]/70">
                Browse homes that are ideal for military buyers using their VA
                home loan benefit.
              </p>
            </div>

            {featuredNearFortBliss.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-[var(--sandstone-charcoal)]/80">
                  We&rsquo;re updating Fort Bliss listings right now.
                </p>
              </div>
            ) : (
              <ListingCarousel properties={featuredNearFortBliss.slice(0, 9)} />
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[var(--sandstone-navy)]/10 bg-white py-16">
          <div className={SECTION_MAX}>
            <h2 className="text-center font-heading text-3xl font-extrabold text-[var(--sandstone-navy)]">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-center text-[var(--sandstone-charcoal)]/70">
              Answers to common questions about using a VA loan during your PCS
              move.
            </p>

            {[
              {
                q: "Can I buy a home before I PCS?",
                a: "Yes. Many military families purchase before arriving using virtual tours, electronic signatures, and remote closings.",
              },
              {
                q: "Do I need a down payment with a VA loan?",
                a: "Most eligible buyers can purchase with no down payment, although normal closing costs and prepaid expenses may still apply.",
              },
              {
                q: "What documents do I need?",
                a: "Typically you'll need your ID, COE, PCS orders, LES, pay stubs, bank statements, and any lender-requested financial documents.",
              },
              {
                q: "Can I use my VA loan benefit more than once?",
                a: "Yes. Many eligible borrowers can reuse their VA benefit if they meet current eligibility requirements.",
              },
              {
                q: "How long does a VA loan take to close?",
                a: "Many VA loans close in about 30-45 days depending on the transaction.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="mt-5 rounded-xl border border-[var(--sandstone-navy)]/10 p-6"
              >
                <h3 className="font-bold text-[var(--sandstone-navy)]">
                  {item.q}
                </h3>

                <p className="mt-2 text-[var(--sandstone-charcoal)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
