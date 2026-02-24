import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { LeadPageIntro } from "@/components/LeadPageIntro";

export const metadata = {
  title: "Join the Team | Sandstone Real Estate Group",
  description: "Join Sandstone Real Estate Group. Build your career with a team that elevates lifestyles.",
};

export default function JoinPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadPageIntro
          eyebrow="Sandstone Careers"
          title="Join the Team"
          description="We&apos;re building the most recognizable and trusted real estate brand in the region. If you share our values, we&apos;d love to hear from you."
          highlights={[
            "Brand Standards",
            "Mentorship",
            "Long-Term Growth",
          ]}
        />

        <LeadCaptureSection
          formType="join"
          sectionId="join-lead"
          heading="Join the Team"
          subheading="Tell us about your background and goals, and we&apos;ll connect with you about opportunities at Sandstone."
          showHeader={false}
          ctaLabel="APPLY TO CONNECT"
          messagePlaceholder="Share your experience, licensing status, and what you are looking for in your next team..."
          asideTitle="Build Your Next Chapter"
          asideDescription="We are looking for professionals who care about service, standards, and long-term growth."
        />
      </main>
      <SiteFooter />
    </>
  );
}
