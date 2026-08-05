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
        <section className="relative isolate min-h-[760px] overflow-hidden bg-[#111a16] text-white lg:min-h-[820px]">
          <div
            className="absolute inset-0 -z-30 bg-cover bg-[center_42%] scale-[1.02]"
            style={{
              backgroundImage: "url('/uploads/real_estate_el_paso.webp')",
            }}
          />
          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#0d1511]/95 via-[#0d1511]/72 to-[#0d1511]/25" />
          <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#0d1511] via-transparent to-black/20" />
          <div className="absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-[#d8c3a5]/10 blur-3xl" />

          <div className="mx-auto flex min-h-[760px] max-w-7xl items-center px-6 pb-20 pt-32 sm:pb-24 sm:pt-40 lg:min-h-[820px] lg:px-8">
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
        <section id="grow-with-sandstone" className="relative bg-[#f8f5ef] px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <div className="absolute left-0 top-0 h-full w-px bg-[#17211d]/5 lg:left-[8%]" />

          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-24">
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#b89b72]">
                GROW WITH SANDSTONE
              </p>
              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-black sm:text-5xl lg:text-6xl">
                More than a brokerage. A place to build something meaningful.
              </h2>
            </div>

            <div className="border-l border-[#17211d]/10 pl-7 sm:pl-10 lg:mt-12">
              <p className="text-xl leading-9 text-[#33403a] sm:text-2xl sm:leading-10">
                Great agents deserve an environment that helps them do their
                best work not one that gets in the way.
              </p>

              <div className="mt-8 space-y-6 text-base leading-8 text-[#5b625e] sm:text-lg">
                <p>
                  At Sandstone Real Estate Group, that means strong leadership,
                  intentional branding, practical tools, and a team that
                  genuinely wants to see you succeed.
                </p>
                <p>
                  Whether you are an established professional or beginning your
                  real estate career, we want to meet people who value integrity,
                  service, collaboration, and continued growth.
                </p>
              </div>

              <a
                href="#join-lead"
                className="mt-9 inline-flex items-center gap-3 border-b border-[#9b7b56] pb-2 text-xs font-bold tracking-[0.2em] text-[#8b7355] transition hover:border-[#17211d] hover:text-[#17211d]"
              >
                START A CONVERSATION
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative overflow-hidden bg-white px-6 py-20 text-black sm:py-28 lg:px-8 lg:py-32">
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:72px_72px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.3em] text-[#9b7b56]">
                  WHY SANDSTONE
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  Built for agents who want more.
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-black/60 lg:justify-self-end">
                Thoughtful leadership, practical resources, and a collaborative
                culture designed to help every team member do their best work.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="group relative min-h-[360px] overflow-hidden border border-black/10 bg-[#f7f1e7] p-8 transition duration-500 hover:-translate-y-2 hover:border-black/25 hover:bg-white hover:shadow-[0_24px_70px_rgba(0,0,0,0.09)] sm:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-xs font-semibold tracking-[0.24em] text-[#9b7b56]">
                      {benefit.eyebrow.toUpperCase()}
                    </span>

                    <span className="font-serif text-5xl leading-none text-black/10 transition duration-500 group-hover:text-[#b89b72]/35">
                      {benefit.number}
                    </span>
                  </div>

                  <div className="mt-16">
                    <h3 className="max-w-xs font-serif text-3xl leading-tight text-black">
                      {benefit.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-black/60">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[#9b7b56] sm:bottom-10 sm:left-10">
                    <span className="h-px w-10 bg-current transition-all duration-500 group-hover:w-16" />
                    <span className="text-xs">+</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="meet-the-agents"
          className="scroll-mt-24 bg-[#f4efe7] px-6 py-20 text-[#17211d] sm:py-28 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.3em] text-[#9b7b56]">
                  MEET THE TEAM
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  The people behind Sandstone.
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-[#5b625e] lg:justify-self-end">
                Meet the professionals who bring local knowledge, creative
                thinking, and thoughtful service to every relationship.
              </p>
            </div>

            <AgentsCarousel agents={agents} />
          </div>
        </section>

        {/* Process */}
        <section className="bg-white px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#b89b72]">
                WHAT TO EXPECT
              </p>
              <h2 className="mt-5 font-serif text-4xl tracking-[-0.02em] text-[#17211d] sm:text-5xl lg:text-6xl">
                A simple path forward.
              </h2>
              <p className="mt-5 leading-7 text-[#5b625e]">
                No pressure and no complicated process—just a real conversation
                about where you want to go next.
              </p>
            </div>

            <div className="relative mt-16 grid gap-6 md:grid-cols-3">
              <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden border-t border-dashed border-[#9b7b56]/40 md:block" />

              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-sm border border-[#17211d]/10 bg-[#fbf9f5] px-7 pb-9 pt-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#9b7b56]/45 hover:shadow-[0_20px_50px_rgba(23,33,29,0.08)] sm:px-9"
                >
                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#9b7b56]/45 bg-white font-serif text-2xl text-[#8b7355] shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="mt-7 font-serif text-2xl text-[#17211d]">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#5b625e]">
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