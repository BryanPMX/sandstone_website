import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";

export const metadata = {
  title: "Rent My House | Sandstone Real Estate Group",
  description:
    "Get expert rental guidance for your El Paso property. Sandstone Real Estate Group helps property owners prepare, market, and rent with confidence.",
};

export default function RentPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadCaptureSection
          formType="rent"
          sectionId="rent-lead"
          heading="Rent My House"
          subheading="Tell us about your property and rental goals. We’ll help you understand your options and plan the next steps."
          showAside={false}
          ctaLabel="GET MY RENTAL PLAN"
          messagePlaceholder="Tell us about your property, target move-in date, current condition, and the kind of rental support you need..."
          turnstileSiteKey={turnstileSiteKey}
        />
      </main>

      <SiteFooter />
    </>
  );
}