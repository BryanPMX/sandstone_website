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
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen">
        <LeadCaptureSection
          formType="sell"
          sectionId="sell-lead"
          heading="Sell a Property"
          subheading="Tell us about your property and timeline, and we&apos;ll reach out with a tailored selling strategy."
          showAside={false}
          hero
          heroBackgroundUrl="/hero1.webp"
          ctaLabel="REQUEST A SELLER CONSULTATION"
          messagePlaceholder="Share your address, timing, and any details about the property..."
        />
      </main>
      <SiteFooter />
    </>
  );
}
