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
        <section className="px-4 pb-6 pt-16">
          <div className="container mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
              Join the Team
            </h1>
            <p className="mt-4 text-[var(--sandstone-charcoal)]/80">
              We&apos;re building the most recognizable and trusted real estate brand in the region. If you share our values, we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <LeadCaptureSection
          formType="join"
          sectionId="join-lead"
          heading="Join the Team"
          subheading="Tell us about your background and goals, and we&apos;ll connect with you about opportunities at Sandstone."
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
