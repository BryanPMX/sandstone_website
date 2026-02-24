import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { LeadPageIntro } from "@/components/LeadPageIntro";

export const metadata = {
  title: "Sell My House | Sandstone Real Estate Group",
  description: "Sell your home with confidence. Strategy-first guidance and cinematic marketing in El Paso.",
};

export default function SellPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadPageIntro
          eyebrow="Sandstone Seller Services"
          title="Sell My House"
          description="Step inside your next chapter and we&apos;ll help you prepare, price, and present your home with a strategy built around your goals."
          highlights={[
            "Pricing Strategy",
            "Showing Readiness",
            "Marketing Exposure",
          ]}
        />

        <LeadCaptureSection
          formType="sell"
          sectionId="sell-lead"
          heading="Sell My House"
          subheading="Tell us about your property and timeline, and we&apos;ll reach out with a tailored selling strategy."
          showHeader={false}
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
