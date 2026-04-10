import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { PcsSearchPanel } from "@/components/PcsSearchPanel";
import { fetchMyPropertyCards } from "@/services";
import { isAlejandroListing } from "@/lib";

export const metadata: Metadata = {
  title: "Military PCS to El Paso | Sandstone Real Estate Group",
  description:
    "Relocating to El Paso for PCS? Explore homes with military-focused guidance, curated search filters, and a local team ready to help.",
};

export const revalidate = 300;
export const dynamic = "force-dynamic";

const PCS_BENEFITS = [
  {
    title: "Move Timeline Support",
    description:
      "We help you align showings, offer strategy, and close dates with your PCS timeline.",
  },
  {
    title: "Fort Bliss Commute Focus",
    description:
      "Search homes with neighborhoods and drive-time realities that fit your daily routine.",
  },
  {
    title: "Family-Ready Options",
    description:
      "Find homes with the space, layout, and features military families usually need first.",
  },
] as const;

export default async function PcsPage() {
  const properties = await fetchMyPropertyCards();
  const alejandroSparkProperties = properties.filter(
    (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
  );

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <section className="bg-gradient-to-b from-[var(--sandstone-navy)] via-[var(--sandstone-navy)] to-[#1f2854] px-4 pb-12 pt-10 sm:pb-14 sm:pt-12">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
                Sandstone Military PCS Desk
              </p>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.65rem]">
                PCSing to El Paso? Start with a home search built for your timeline.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                Same Sandstone experience and same trusted team, now with a dedicated relocation flow for military families arriving to ELP and Fort Bliss.
              </p>
            </div>

            <PcsSearchPanel />
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-3">
              {PCS_BENEFITS.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)] p-5"
                >
                  <h2 className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                    {benefit.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FeaturedListingsSection properties={alejandroSparkProperties} />

        <ContactForm
          sectionId="pcs-contact"
          leadSource="pcs"
          heading="Need a PCS Relocation Plan?"
          subheading="Share your timeline and priorities, and our team will help you shortlist the right properties fast."
          ctaLabel="SCHEDULE MY PCS CONSULT"
        />
      </main>

      <SiteFooter />
    </>
  );
}
