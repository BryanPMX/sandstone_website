import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";

export const metadata = {
  title: "Join the Team | Sandstone Real Estate Group",
  description:
    "Explore career opportunities with Sandstone Real Estate Group and connect with a team focused on growth, service, and elevating lifestyles.",
};

export default function JoinPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadCaptureSection
          formType="join"
          sectionId="join-lead"
          heading="Join the Team"
          subheading="Tell us a little about your experience and goals. We’ll be in touch to explore opportunities with Sandstone."
          showAside={false}
          ctaLabel="SUBMIT YOUR INTEREST"
          messagePlaceholder="Share your experience, licensing status, career goals, and what you’re looking for in your next team..."
          turnstileSiteKey={turnstileSiteKey}
        />
      </main>

      <SiteFooter />
    </>
  );
}