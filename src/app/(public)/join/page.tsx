import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { agents } from "@/data/agents";

export const metadata = {
  title: "Meet Our Team | Sandstone Real Estate Group",
  description:
    "Meet the dedicated real estate professionals behind Sandstone Real Estate Group, serving El Paso and the Southwest with local expertise and exceptional service.",
  alternates: {
    canonical: "/join",
  },
};

const benefits = [
  {
    number: "01",
    title: "A Brand Built to Stand Out",
    description:
      "Build your business with polished marketing, modern technology, and a recognizable local brand.",
  },
  {
    number: "02",
    title: "Support That Moves You Forward",
    description:
      "Get practical guidance, useful resources, and hands-on support designed around your goals.",
  },
  {
    number: "03",
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

      <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#17211d]">
        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}

        <section className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-[#111a16] text-white lg:min-h-[620px]">
          <div
            className="absolute inset-0 -z-30 bg-cover bg-center"
            style={{
              backgroundImage: "url('/uploads/real_estate_el_paso.webp')",
            }}
          />

          <div className="absolute inset-0 -z-20 bg-[#102439]/80" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

          <div className="mx-auto w-full max-w-7xl px-6 py-24 text-center lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#d8c3a5]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e2ceb0] sm:text-xs">
                Sandstone Real Estate Group
              </p>

              <span className="h-px w-10 bg-[#d8c3a5]" />
            </div>

            <h1 className="mt-8 font-serif text-6xl leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]">
              Exceptional People.
              <span className="mt-2 block text-[#e2ceb0]">
                Exceptional Real Estate.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Local knowledge. Meaningful relationships. A shared commitment to
              delivering an exceptional real estate experience throughout El
              Paso and the Southwest.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#meet-the-agents"
                className="inline-flex min-h-14 items-center justify-center bg-[#d8c3a5] px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#17211d] transition duration-300 hover:bg-white"
              >
                Meet Our Team
                <span className="ml-4" aria-hidden="true">
                  →
                </span>
              </a>

              <a
                href="#grow-with-sandstone"
                className="inline-flex min-h-14 items-center justify-center border border-white/40 px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-white hover:text-[#17211d]"
              >
                Join Our Brokerage
              </a>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* COMPANY INTRODUCTION */}
        {/* ========================================= */}

        <section className="border-b border-[#17211d]/10 bg-[#f7f3ec] px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b56]">
              More Than Real Estate
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Built on trust.
              <span className="block">Driven by relationships.</span>
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-[#b89b72]" />

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#5b625e] sm:text-lg">
              At Sandstone Real Estate Group, we believe real estate is about
              more than buying and selling properties. It is about understanding
              people, building lasting relationships, and helping every client
              move forward with confidence.
            </p>
          </div>
        </section>

        {/* ========================================= */}
        {/* LUXURY AGENT DIRECTORY */}
        {/* ========================================= */}

        <section
          id="meet-the-agents"
          className="scroll-mt-24 bg-[#f7f3ec] px-6 py-20 sm:py-24 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            {/* Directory Heading */}

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b56]">
                The People Behind Sandstone
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-tight tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                Meet Our Team
              </h2>

              <div className="mx-auto mt-7 h-px w-20 bg-[#b89b72]" />

              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#5b625e] sm:text-lg">
                Meet the dedicated professionals who bring local expertise,
                integrity, and personalized service to every client
                relationship.
              </p>
            </div>

            {/* Agent Count */}

            <div className="mt-14 flex items-center justify-between border-b border-[#17211d]/15 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b7b56]">
                Our Professionals
              </p>

              <p className="text-sm text-[#5b625e]">
                {agents.length} Team Members
              </p>
            </div>

            {/* Agent Grid */}

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <article key={agent.slug} className="group flex flex-col">
                  {/* Agent Portrait */}

                  <Link
                    href={`/agents/${agent.slug}`}
                    aria-label={`View ${agent.name}'s profile`}
                    className="relative block aspect-[4/5] overflow-hidden bg-[#e7dfd2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b7b56]"
                  >
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      unoptimized
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#17211d]/35 via-transparent to-transparent" />

                    <div className="absolute inset-4 border border-white/0 transition duration-500 group-hover:border-white/40" />

                    <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/15 text-xl text-white backdrop-blur-sm transition duration-300 group-hover:bg-white group-hover:text-[#17211d]">
                      <span aria-hidden="true">↗</span>
                    </div>
                  </Link>

                  {/* Agent Information */}

                  <div className="flex flex-1 flex-col border-b border-[#17211d]/15 pb-7 pt-6">
                    <p className="min-h-[32px] text-[10px] font-semibold uppercase leading-4 tracking-[0.16em] text-[#9b7b56]">
                      {agent.role}
                    </p>

                    <h3 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-[#17211d] sm:text-4xl">
                      {agent.name}
                    </h3>

                    {/* Agent Specialties */}

                    {agent.specialties?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {agent.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="border border-[#b89b72]/35 px-3 py-1.5 text-[11px] text-[#5b625e]"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Agent Actions */}

                    <div className="mt-auto flex flex-wrap items-center gap-5 pt-7">
                      <Link
                        href={`/agents/${agent.slug}`}
                        className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#17211d] transition hover:text-[#9b7b56]"
                      >
                        View Profile
                        <span
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>

                      <Link
                        href={`/agents/${agent.slug}#agent-contact`}
                        className="border-l border-[#17211d]/20 pl-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b7355] transition hover:text-[#17211d]"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* COMPANY VALUES */}
        {/* ========================================= */}

        <section className="bg-[#102439] px-6 py-20 text-white sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8c3a5]">
                The Sandstone Difference
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Real Estate. Elevated.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70">
                Our approach is built around the principles that matter most to
                our clients and our community.
              </p>
            </div>

            <div className="mt-14 grid divide-y divide-white/15 border-y border-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
              {[
                {
                  number: "01",
                  title: "Local Expertise",
                  description:
                    "A deep understanding of El Paso, surrounding communities, and the Southwest real estate market.",
                },
                {
                  number: "02",
                  title: "Personalized Service",
                  description:
                    "Thoughtful guidance tailored to the individual needs and goals of every client.",
                },
                {
                  number: "03",
                  title: "Lasting Relationships",
                  description:
                    "A commitment to integrity, communication, and service beyond the transaction.",
                },
              ].map((value) => (
                <article
                  key={value.number}
                  className="px-4 py-10 text-center sm:px-8"
                >
                  <p className="font-serif text-4xl text-[#d8c3a5]">
                    {value.number}
                  </p>

                  <h3 className="mt-5 font-serif text-3xl">{value.title}</h3>

                  <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/70">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* RECRUITMENT SECTION */}
        {/* ========================================= */}

        <section
          id="grow-with-sandstone"
          className="scroll-mt-24 bg-white px-6 py-20 sm:py-24 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
              {/* Recruitment Image */}

              <div className="relative min-h-[380px] overflow-hidden bg-[#17211d] lg:min-h-[500px]">
                <Image
                  src="/uploads/real_estate_el_paso.webp"
                  alt="El Paso real estate"
                  fill
                  unoptimized
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#102439]/85 via-transparent to-transparent" />

                <div className="absolute inset-5 border border-white/35" />

                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d8c3a5]">
                    Your Next Chapter
                  </p>

                  <p className="mt-3 font-serif text-4xl text-white">
                    Build a career.
                    <span className="block">Create a legacy.</span>
                  </p>
                </div>
              </div>

              {/* Recruitment Content */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b56]">
                  Grow With Sandstone
                </p>

                <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Your Future Starts Here.
                </h2>

                <div className="mt-7 h-px w-20 bg-[#b89b72]" />

                <p className="mt-7 text-lg leading-8 text-[#33403a]">
                  Great agents deserve more than a place to hang their license.
                </p>

                <p className="mt-5 text-base leading-8 text-[#5b625e]">
                  Sandstone combines local leadership, intentional branding,
                  practical tools, and a collaborative culture designed to help
                  you grow with confidence.
                </p>

                <a
                  href="#join-lead"
                  className="mt-8 inline-flex min-h-14 items-center justify-center gap-4 bg-[#102439] px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#17211d]"
                >
                  Join Our Team
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Recruitment Benefits */}

            <div className="mt-20 grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article
                  key={benefit.number}
                  className="border border-[#17211d]/10 bg-[#f7f3ec] p-8 transition duration-300 hover:border-[#b89b72] hover:shadow-lg"
                >
                  <p className="font-serif text-4xl text-[#b89b72]">
                    {benefit.number}
                  </p>

                  <div className="mt-5 h-px w-12 bg-[#b89b72]" />

                  <h3 className="mt-6 font-serif text-3xl leading-tight">
                    {benefit.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#5b625e]">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* RECRUITMENT PROCESS */}
        {/* ========================================= */}

        <section className="border-t border-[#17211d]/10 bg-[#f7f3ec] px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9b7b56]">
                What To Expect
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                A Simple Path Forward.
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-8 text-[#5b625e]">
                No pressure and no complicated process — just a real
                conversation about where you want to go next.
              </p>
            </div>

            <div className="relative mt-14 grid gap-6 md:grid-cols-3">
              <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden border-t border-dashed border-[#9b7b56]/40 md:block" />

              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative border border-[#17211d]/10 bg-white px-8 py-9 text-center transition duration-300 hover:border-[#b89b72]/60 hover:shadow-lg"
                >
                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#b89b72]/60 bg-[#f7f3ec] font-serif text-2xl text-[#9b7b56]">
                    {step.number}
                  </div>

                  <h3 className="mt-7 font-serif text-3xl">{step.title}</h3>

                  <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#5b625e]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* EXISTING APPLICATION FORM */}
        {/* ========================================= */}

        <section className="relative border-t border-[#17211d]/10 bg-[#17211d]">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent" />

          <div className="relative">
            <LeadCaptureSection
              formType="join"
              sectionId="join-lead"
              heading="Let’s Start a Conversation"
              subheading="Tell us about your experience, goals, and what you’re looking for in your next team. A member of the Sandstone team will be in touch."
              showAside={false}
              ctaLabel="SUBMIT YOUR INTEREST"
              messagePlaceholder="Share your real estate experience, licensing status, professional goals, and what you’re looking for in your next opportunity..."
              turnstileSiteKey={turnstileSiteKey}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
