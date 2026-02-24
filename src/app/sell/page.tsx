import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";

export const metadata = {
  title: "Sell My House | Sandstone Real Estate Group",
  description: "Sell your home with confidence. Strategy-first guidance and cinematic marketing in El Paso.",
};

export default function SellPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <section className="px-4 pb-6 pt-16">
          <div className="container mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
              Sell My House
            </h1>
            <p className="mt-4 text-[var(--sandstone-charcoal)]/80">
              Step inside your next chapter and we&apos;ll help you prepare, price, and present your home with a strategy built around your goals.
            </p>
          </div>
        </section>

        <LeadCaptureSection
          formType="sell"
          sectionId="sell-lead"
          heading="Sell My House"
          subheading="Tell us about your property and timeline, and we&apos;ll reach out with a tailored selling strategy."
          ctaLabel="REQUEST A SELLER CONSULTATION"
          messagePlaceholder="Share your address, timing, and any details about the property..."
          asideTitle="Plan Your Sale With Confidence"
          asideDescription="From pricing strategy to marketing execution, we help you maximize exposure and results."
        />
      </main>
      <SiteFooter />
    </>
  );
}
