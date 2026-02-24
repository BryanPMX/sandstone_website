import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";

export const metadata = {
  title: "Join the Team | Sandstone Real Estate Group",
  description: "Join Sandstone Real Estate Group. Build your career with a team that elevates lifestyles.",
};

export default function JoinPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadCaptureSection
          formType="join"
          sectionId="join-lead"
          heading="Join the Team"
          subheading="Tell us about your background and goals, and we&apos;ll connect with you about opportunities at Sandstone."
          showAside={false}
          ctaLabel="APPLY TO CONNECT"
          messagePlaceholder="Share your experience, licensing status, and what you are looking for in your next team..."
        />
      </main>
      <SiteFooter />
    </>
  );
}
