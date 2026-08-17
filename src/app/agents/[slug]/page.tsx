import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTurnstileSiteKey } from "@/config";
import { agents, getAgentBySlug } from "@/data/agents";

type AgentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return agents.map((agent) => ({
    slug: agent.slug,
  }));
}

export async function generateMetadata({
  params,
}: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return {
      title: "Team Member Not Found | Sandstone Real Estate Group",
    };
  }

  return {
    title: `${agent.name} | Sandstone Real Estate Group`,
    description: `Learn more about ${agent.name}, ${agent.role} at Sandstone Real Estate Group.`,
  };
}

export default async function AgentBioPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  const turnstileSiteKey = getTurnstileSiteKey();

  if (!agent) {
    notFound();
  }

  const firstName = agent.name.split(" ")[0];

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[#f7f3ec] text-black">
        <section className="px-6 pb-20 pt-32 sm:pt-40 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/join#meet-the-agents"
              className="inline-flex items-center gap-3 border-b border-[#b89b72] pb-2 text-xs font-bold tracking-[0.18em] text-[#9b7b56] transition hover:border-black hover:text-black"
            >
              ← BACK TO THE TEAM
            </Link>

            <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
              <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,0.16)]">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.26em] text-[#9b7b56]">
                  {agent.role}
                </p>

                <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-0.035em] text-black sm:text-6xl lg:text-7xl">
                  {agent.name}
                </h1>

                {agent.license ? (
                  <p className="mt-5 text-sm font-semibold tracking-wide text-black/65">
                    {agent.license}
                  </p>
                ) : null}

                <div className="mt-9 h-px w-20 bg-[#b89b72]" />

                <p className="mt-9 max-w-2xl text-lg leading-9 text-black/70">
                  {agent.bio}
                </p>

                {agent.specialties?.length ? (
                  <div className="mt-10">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-[#9b7b56]">
                      SPECIALTIES
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {agent.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="border border-black/15 bg-white px-4 py-2 text-sm text-black/70"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {agent.email || agent.phone ? (
                  <div className="mt-11 flex flex-col gap-4 sm:flex-row">
                    {agent.email ? (
                      <a
                        href={`mailto:${agent.email}`}
                        className="inline-flex min-h-14 items-center justify-center bg-black px-7 text-xs font-bold tracking-[0.18em] text-white transition hover:bg-black/80"
                      >
                        EMAIL {firstName.toUpperCase()}
                      </a>
                    ) : null}

                    {agent.phone ? (
                      <a
                        href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                        className="inline-flex min-h-14 items-center justify-center border border-black/25 bg-white px-7 text-xs font-bold tracking-[0.18em] text-black transition hover:border-black"
                      >
                        CALL {firstName.toUpperCase()}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Agent Contact Form */}
        <section className="relative border-t border-[#17211d]/10 bg-[#17211d]">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent" />

          <div className="relative">
            <LeadCaptureSection
              formType="contact"
              sectionId="agent-contact"
              heading={`Contact ${agent.name}`}
              subheading={`Send a message to ${agent.name} and they or a member of the Sandstone team will follow up with you.`}
              showAside={false}
              ctaLabel="SEND MESSAGE"
              messagePlaceholder={`Tell ${firstName} how they can help you...`}
              mappingReference={`agent-${agent.slug}`}
              turnstileSiteKey={turnstileSiteKey}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}