import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { PcsResourcesCarousel } from "@/components/pcs/PcsResourcesCarousel";
import { PcsSpecialistCard } from "@/components/pcs/PcsSpecialistCard";
import { getTurnstileSiteKey } from "@/config";
import { fetchMyPropertyCards } from "@/services";
import { isAlejandroListing } from "@/lib";

export const metadata: Metadata = {
  title: "Military PCS to El Paso | Sandstone Real Estate Group",
  description:
    "Relocating to El Paso for PCS? Explore homes with military-focused guidance, curated search filters, and a local team ready to help.",
};

export const revalidate = 300;
export const dynamic = "force-dynamic";

const MISSION_TIMELINE = [
  {
    title: "Orders In Hand",
    description: "Share report date and must-haves so we can prioritize your search fast.",
  },
  {
    title: "Targeted Home Search",
    description: "We shortlist mission-fit homes based on BAH, family size, and commute realities.",
  },
  {
    title: "Close With Confidence",
    description: "From offer to closing, we keep your PCS timeline protected and on track.",
  },
] as const;

const PCS_FAQS = [
  {
    question: "How early should I start searching after receiving PCS orders?",
    answer:
      "Most families get the best results when they start 60 to 90 days before report date. We can build a search plan around your exact timeline.",
  },
  {
    question: "Can I buy before arriving in El Paso?",
    answer:
      "Yes. We support remote tours, digital paperwork, and coordinated steps so you can move forward even before arrival.",
  },
  {
    question: "How do I know if a home fits my BAH?",
    answer:
      "Use the BAH Mission Calculator in this page, then we align options to your budget, benefits, and monthly comfort range.",
  },
  {
    question: "Do you help with neighborhoods near Fort Bliss?",
    answer:
      "Yes. We guide families through commute-aware neighborhoods, schools, and daily-life factors around the Fort Bliss area.",
  },
  {
    question: "Can you help us compare buying versus renting for this PCS move?",
    answer:
      "Absolutely. We can map both options against your report-date timeline, BAH range, and expected length of stay so you can choose confidently.",
  },
  {
    question: "What if my timeline changes or orders get updated?",
    answer:
      "We adjust quickly. Your search plan, showing schedule, and negotiation strategy can be updated to stay aligned with new military timelines.",
  },
] as const;

export default async function PcsPage() {
  const turnstileSiteKey = getTurnstileSiteKey();
  const properties = await fetchMyPropertyCards();
  const alejandroSparkProperties = properties.filter(
    (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
  );
  const fortBlissKeywords = [
    "fort bliss",
    "northeast el paso",
    "east el paso",
    "hondo pass",
    "horizon city",
  ];

  const fortBlissListings = alejandroSparkProperties.filter((property) => {
    const haystack = `${property.title} ${property.location}`.toLowerCase();
    return fortBlissKeywords.some((keyword) => haystack.includes(keyword));
  });

  const featuredFortBlissListings =
    fortBlissListings.length > 0
      ? fortBlissListings.slice(0, 9)
      : alejandroSparkProperties.slice(0, 9);

  return (
    <>
      <SiteHeader overlayDesktop />

      <main className="min-h-screen">
        <HeroSection
          desktopImageSrc="/PCS_Section_Imgs/hero.webp"
          mobileImageSrc="/PCS_Section_Imgs/hero.webp"
          imageAlt="Military family arriving home"
          imagePositionClassName="object-[center_56%] lg:object-[center_52%]"
          initialFilters={{
            listingType: "active",
            pricePreset: "250-500",
            bedsPreset: "3",
            bathsPreset: "2",
          }}
          initialSearchValue="Fort Bliss, El Paso, TX"
        />

        <section className="bg-white px-4 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)] p-5 shadow-[0_20px_40px_-32px_rgba(17,24,61,0.55)] sm:p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-navy)]/65">
              PCS Mission Timeline
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {MISSION_TIMELINE.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--sandstone-navy)]/62">
                    Step {index + 1}
                  </p>
                  <h2 className="mt-1 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PcsResourcesCarousel />

        <FeaturedListingsSection
          properties={featuredFortBlissListings}
          heading="Mission-Ready Homes Near Fort Bliss"
          ctaHref="/listings/map?search=Fort+Bliss&radiusMiles=20"
          ctaLabel="View all Fort Bliss listings"
          sectionClassName="bg-white pb-8 md:pb-10"
          ctaClassName="!bg-[var(--sandstone-navy)] px-9 py-3.5 text-base hover:!bg-[var(--sandstone-navy-deep)] focus-visible:!ring-[var(--sandstone-navy)]"
        />

        <section className="bg-white px-4 py-8 sm:py-10">
          <div className="mx-auto grid w-full max-w-6xl gap-6 rounded-3xl border border-[var(--sandstone-navy)]/12 bg-white p-6 shadow-[0_24px_46px_-32px_rgba(17,24,61,0.4)] lg:grid-cols-[0.85fr_1fr_1.15fr] lg:items-center lg:p-8">
            <div className="flex items-center justify-center lg:justify-start">
              <Image
                src="/PCS_Section_Imgs/pcslogo.webp"
                alt="Military Relocation Professional"
                width={240}
                height={180}
                className="h-auto w-[200px] object-contain sm:w-[230px]"
              />
            </div>

            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/PCS_Section_Imgs/family2.webp"
                alt="The Miller family"
                width={760}
                height={920}
                className="h-full w-full object-cover"
              />
            </div>

            <blockquote className="text-[var(--sandstone-charcoal)]">
              <p className="font-heading text-2xl font-bold uppercase leading-tight text-[var(--sandstone-navy)]">
                SANDSTONE HOMES made our PCS stress-free!
              </p>
              <p className="mt-4 text-sm leading-7 sm:text-base">
                From the first call to closing day, the team understood our needs and took care of everything. They know Fort Bliss and the El Paso area better than anyone.
              </p>
              <p className="mt-4 text-sm leading-7 sm:text-base">
                Proud to be a Military Relocation Professional committed to serving those who serve.
              </p>
              <footer className="mt-5 text-sm font-semibold text-[var(--sandstone-navy)]">
                - The Miller Family, U.S. Army
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="bg-white px-4 pb-24 pt-4 sm:pb-16 sm:pt-6">
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.95fr] lg:items-start">
            <div className="rounded-3xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)] p-5 shadow-[0_20px_42px_-30px_rgba(17,24,61,0.48)] sm:p-6">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                PCS FAQ
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--sandstone-charcoal)]/75">
                Quick answers for military families relocating to El Paso and Fort Bliss.
              </p>

              <div className="mt-5 space-y-3">
                {PCS_FAQS.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-4"
                  >
                    <summary className="cursor-pointer list-none pr-7 font-semibold text-[var(--sandstone-navy)] marker:content-none">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm leading-6 text-[var(--sandstone-charcoal)]/82">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <PcsSpecialistCard turnstileSiteKey={turnstileSiteKey} />
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-4 z-[90] px-4 sm:hidden">
          <Link
            href="/listings/map?search=Fort+Bliss&radiusMiles=20&price=250-500&beds=3&baths=2"
            className="mx-auto flex h-12 w-full max-w-sm items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-6 text-sm font-semibold text-white shadow-[0_18px_34px_-20px_rgba(17,24,61,0.75)] transition hover:bg-[var(--sandstone-navy-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
          >
            View PCS Homes Near Fort Bliss
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
