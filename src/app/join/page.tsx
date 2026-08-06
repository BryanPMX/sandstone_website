import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { AgentsCarousel } from "@/components/AgentsCarousel";
import { getTurnstileSiteKey } from "@/config";
import { agents } from "@/data/agents";

export const metadata = {
  title: "About the Team | Sandstone Real Estate Group",
  description:
    "Explore career opportunities with Sandstone Real Estate Group and connect with a team focused on growth, service, and elevating lifestyles.",
};

const benefits = [
  {
    number: "01",
    eyebrow: "Brand",
    title: "A Brand Built to Stand Out",
    description:
      "Build your business with polished marketing, modern technology, and a recognizable local brand.",
  },
  {
    number: "02",
    eyebrow: "Growth",
    title: "Support That Moves You Forward",
    description:
      "Get practical guidance, useful resources, and hands-on support designed around your goals.",
  },
  {
    number: "03",
    eyebrow: "Culture",
    title: "A Team That Wins Together",
    description:
      "Work alongside people who value communication, shared success, and exceptional client service.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell Us About Yourself",
    description:
      "Share your background, licensing status, experience, and professional goals.",
  },
  {
    number: "02",
    title: "Meet the Team",
    description:
      "We’ll have a relaxed conversation about your goals and what Sandstone can offer.",
  },
  {
    number: "03",
    title: "Build Your Future",
    description:
      "If we’re a strong fit, we’ll help you prepare for your next chapter with confidence.",
  },
];

export default function JoinPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen overflow-hidden bg-[var(--sandstone-off-white)]">
        {/* Hero */}
        <section className="relative isolate min-h-[650px] overflow-hidden bg-[#111a16] text-white lg:min-h-[700px]">
          <div
            className="absolute inset-0 -z-30 bg-cover bg-top scale-[1.02]"
            style={{
              backgroundImage: "url('/uploads/real_estate_el_paso.webp')",
            }}
          />
          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#0d1511]/95 via-[#0d1511]/72 to-[#0d1511]/25" />
          <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#0d1511] via-transparent to-black/20" />
          <div className="absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-[#d8c3a5]/10 blur-3xl" />

          <div className="mx-auto flex min-h-[650px] max-w-7xl items-start px-6 pb-12 pt-32 sm:pt-40 lg:min-h-[700px] lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#d8c3a5]" />
                <p className="text-xs font-semibold tracking-[0.32em] text-[#e2ceb0] sm:text-sm">
                  ABOUT SANDSTONE
                </p>
              </div>

              <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                Build a career
                <span className="block text-white">Create a legacy</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                Join a real estate team where local expertise, thoughtful
                service, modern marketing, and meaningful growth come together.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#grow-with-sandstone"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#d8c3a5] px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#17211d] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  DISCOVER OUR TEAM
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href="#meet-the-agents"
                  className="inline-flex min-h-14 items-center justify-center border border-white/35 bg-white/5 px-8 py-4 text-xs font-bold tracking-[0.2em] text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white hover:text-[#17211d]"
                >
                  MEET THE TEAM
                </a>
              </div>

            </div>
          </div>

        </section>

        {/* Intro */}
        <section
          id="grow-with-sandstone"
          className="relative overflow-hidden bg-[#f8f5ef] px-6 py-20 sm:py-24 lg:px-8 lg:py-28"
        >
          <div className="absolute left-0 top-0 h-full w-px bg-[#17211d]/5 lg:left-[8%]" />
          <div className="absolute right-0 top-0 h-full w-px bg-[#17211d]/5 lg:right-[8%]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-[#17211d]/10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#b89b72]" />
                  <p className="text-xs font-semibold tracking-[0.3em] text-[#9b7b56]">
                    GROW WITH SANDSTONE
                  </p>
                </div>

                <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.03] tracking-[-0.03em] text-[#17211d] sm:text-5xl lg:text-6xl">
                  Build your business with a team invested in your future.
                </h2>
              </div>

              <div className="lg:pb-2">
                <p className="text-xl leading-9 text-[#33403a] sm:text-2xl sm:leading-10">
                  Great agents deserve more than a place to hang their license.
                </p>

                <p className="mt-5 max-w-xl text-base leading-8 text-[#5b625e] sm:text-lg">
                  Sandstone combines local leadership, intentional branding,
                  practical tools, and a collaborative culture designed to help
                  you grow with confidence.
                </p>

                <a
                  href="#join-lead"
                  className="group mt-8 inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#8b7355] transition hover:text-[#17211d]"
                >
                  START A CONVERSATION
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="grid divide-y divide-[#17211d]/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {[
                {
                  number: "01",
                  title: "Local Leadership",
                  text: "Guidance from people who understand the El Paso market and the work it takes to succeed here.",
                },
                {
                  number: "02",
                  title: "Modern Support",
                  text: "Thoughtful marketing, useful technology, and practical resources that strengthen your business.",
                },
                {
                  number: "03",
                  title: "Shared Growth",
                  text: "A collaborative team culture centered on integrity, service, and long-term professional growth.",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="group px-0 py-9 first:pl-0 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-3xl text-[#b89b72]/55">
                      {item.number}
                    </span>
                    <span className="h-px flex-1 bg-[#17211d]/10 transition-colors duration-300 group-hover:bg-[#b89b72]/60" />
                  </div>

                  <h3 className="mt-7 font-serif text-2xl text-[#17211d]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#5b625e]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="meet-the-agents"
          className="scroll-mt-24 bg-[#f4efe7] px-6 py-16 text-[#17211d] sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end lg:gap-20">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.3em] text-[#9b7b56]">
                MEET THE TEAM BEHIND SANDSTONE
                </p>

                <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  Local expertise. Shared purpose.
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-[#5b625e] lg:justify-self-end">
                Meet the professionals who bring deep market knowledge, creative
                thinking, and thoughtful service to every client relationship.
              </p>
            </div>

            <AgentsCarousel agents={agents} />
          </div>
        </section>

        {/* Process */}
        <section className="bg-white px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#b89b72]">
                WHAT TO EXPECT
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[#17211d] sm:text-5xl">
                A simple path forward.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5b625e]">
                No pressure and no complicated process—just a real conversation
                about where you want to go next.
              </p>
            </div>

            <div className="relative mt-10 grid gap-5 md:grid-cols-3">
              <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden border-t border-dashed border-[#9b7b56]/40 md:block" />

              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative min-h-[245px] rounded-sm border border-[#17211d]/10 bg-[#fbf9f5] px-7 py-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#9b7b56]/45 hover:shadow-[0_20px_50px_rgba(23,33,29,0.08)] sm:px-8"
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#9b7b56]/45 bg-white font-serif text-xl text-[#8b7355] shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-[#17211d]">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5b625e]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="relative border-t border-[#17211d]/10 bg-[#17211d]">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent" />
          <div className="relative">
            <LeadCaptureSection
              formType="join"
              sectionId="join-lead"
              heading="Let’s Start a Conversation"
              subheading="Tell us about your experience and goals. We’ll be in touch to explore opportunities with Sandstone."
              showAside={false}
              ctaLabel="SUBMIT YOUR INTEREST"
              messagePlaceholder="Share your experience, licensing status, career goals, and what you’re looking for in your next team..."
              turnstileSiteKey={turnstileSiteKey}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}