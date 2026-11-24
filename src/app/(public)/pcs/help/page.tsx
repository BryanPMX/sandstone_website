import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";

export const metadata = {
  title: "Get PCS Help | Sandstone Real Estate Group",
  description:
    "Request PCS support from our military relocation team. Share your move details and we\'ll help you plan your Fort Bliss transition.",
};

export default function PcsHelpPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadCaptureSection
          formType="pcs"
          sectionId="pcs-help-lead"
          heading="Get PCS Help"
          headingTag="h1"
          subheading="Tell us about your PCS orders, timeline, and housing needs, and we\'ll connect you with military relocation support for El Paso."
          showAside={false}
          ctaLabel="REQUEST PCS SUPPORT"
          messagePlaceholder="Share your PCS status, expected move date, and any special housing requirements..."
          mappingReference="GoHighLevel PCS Help"
          turnstileSiteKey={turnstileSiteKey}
        />
      </main>
      <SiteFooter />
    </>
  );
}
