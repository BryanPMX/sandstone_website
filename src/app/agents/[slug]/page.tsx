import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Check,
} from "lucide-react";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTurnstileSiteKey } from "@/config";
import { agents, getAgentBySlug } from "@/data/agents";
import { AlejandroVeteransTribute } from "@/components/VeteransDayTribute";
import { VeteransDayOnly } from "@/components/VeteransDaySchedule";
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
    description: `Meet ${agent.name}, ${agent.role} at Sandstone Real Estate Group. Discover their experience, specialties, and personalized approach to real estate.`,
    alternates: {
      canonical: `/agents/${agent.slug}`,
    },
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
  const otherAgents = agents
    .filter((member) => member.slug !== agent.slug)
    .slice(0, 3);
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#17211d]">
        {/* ========================================= */}
        {/* BREADCRUMB NAVIGATION */}
        {/* ========================================= */}
        <section className="border-b border-[#17211d]/10 bg-[#f7f3ec] px-6 py-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <Link
              href="/join#meet-the-agents"
              className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8b7355] transition hover:text-[#17211d]"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Back to Our Team
            </Link>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-3 text-xs text-[#5b625e]"
            >
              <Link href="/" className="transition hover:text-[#9b7b56]">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/join" className="transition hover:text-[#9b7b56]">
                Our Team
              </Link>
              <span aria-hidden="true">/</span>
              <span
                aria-current="page"
                className="font-semibold text-[#17211d]"
              >
                {agent.name}
              </span>
            </nav>
          </div>
        </section>
        {/* ========================================= */}
        {/* LUXURY AGENT PROFILE */}
        {/* ========================================= */}
        <section className="px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:items-center lg:gap-16">
              {/* Agent Portrait */}
              <div>
                <div className="group relative aspect-[4/5] overflow-hidden bg-[#e7dfd2]">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-4 border border-white/40" />
                </div>
                {/* Brokerage Information */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#17211d]/15 py-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7b56]">
                      Brokerage
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#17211d]">
                      Sandstone Real Estate Group
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5b625e]">
                    <MapPin
                      size={16}
                      className="text-[#9b7b56]"
                      aria-hidden="true"
                    />
                    El Paso, Texas
                  </div>
                </div>
              </div>
              {/* Agent Information */}
              <div className="min-w-0">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#b89b72]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b7b56]">
                    Meet Your Real Estate Professional
                  </p>
                </div>
                <h1 className="mt-6 font-serif text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  {agent.name}
                </h1>
                <p className="mt-5 text-sm font-semibold uppercase leading-7 tracking-[0.15em] text-[#9b7b56]">
                  {agent.role}
                </p>
                {agent.license ? (
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#5b625e]">
                    {agent.license}
                  </p>
                ) : null}
                <div className="mt-8 h-px w-24 bg-[#b89b72]" />
                {/* Veterans Day Tribute */}
                {agent.slug === "alejandro-gamboa" ? (
                  <VeteransDayOnly>
                    <AlejandroVeteransTribute />
                  </VeteransDayOnly>
                ) : null}
                {/* Primary Contact Actions */}
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#agent-contact"
                    className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#102439] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-[#17211d]"
                  >
                    <Mail size={17} aria-hidden="true" />
                    Contact {firstName}
                  </a>
                  {agent.phone ? (
                    <a
                      href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-flex min-h-14 items-center justify-center gap-3 border border-[#17211d]/20 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#17211d] transition hover:border-[#9b7b56] hover:text-[#9b7b56]"
                    >
                      <Phone size={16} aria-hidden="true" />
                      Call {firstName}
                    </a>
                  ) : null}
                  {agent.email ? (
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex min-h-14 items-center justify-center gap-3 border border-[#17211d]/20 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#17211d] transition hover:border-[#9b7b56] hover:text-[#9b7b56]"
                    >
                      <Mail size={16} aria-hidden="true" />
                      Email {firstName}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-[#17211d]/10 bg-white px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Biography */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b7b56]">
                Get to Know Your Agent
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">
                About {firstName}
              </h2>
              {agent.slug === "alejandro-gamboa" ? (
                <VeteransDayOnly>
                  <h3 className="mt-5 font-serif text-2xl leading-tight">
                    Serving those who serve.
                  </h3>
                </VeteransDayOnly>
              ) : null}
              <p className="mt-6 max-w-4xl whitespace-pre-line text-base leading-8 text-[#5b625e] sm:text-lg sm:leading-9">
                {agent.bio}
              </p>
              {agent.slug === "alejandro-gamboa" ? (
                <VeteransDayOnly>
                  <a
                    href="#agent-contact"
                    className="mt-6 inline-flex min-h-12 items-center justify-center border border-[#9b7b56] px-5 py-3 text-sm font-semibold text-[#705231] transition hover:bg-[#102439] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b7b56]"
                  >
                    Connect with Alejandro
                  </a>
                </VeteransDayOnly>
              ) : null}
            </div>
          </div>
        </section>
        {agent.specialties?.length ? (
          <section className="px-6 py-12 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-6xl">
              {/* Specialties */}
              {agent.specialties?.length ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b7b56]">
                    Areas of Expertise
                  </p>
                  <h2 className="mt-4 font-serif text-3xl tracking-tight">
                    Specialties
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {agent.specialties.map((specialty) => (
                      <div
                        key={specialty}
                        className="flex min-h-16 items-center gap-3 border border-[#17211d]/10 bg-white/70 px-4 py-4 transition hover:border-[#b89b72]/70"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e9dfce] text-[#8b7355]">
                          <Check size={14} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium leading-6 text-[#33403a]">
                          {specialty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
        {/* ========================================= */}
        {/* CONTACT INFORMATION */}
        {/* ========================================= */}
        {agent.email || agent.phone ? (
          <section className="border-b border-[#17211d]/10 bg-white px-6 py-14 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
              {agent.email ? (
                <a
                  href={`mailto:${agent.email}`}
                  className="group flex items-center gap-5 border border-[#17211d]/10 bg-[#f7f3ec] p-6 transition hover:border-[#b89b72]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#b89b72]/40 text-[#9b7b56]">
                    <Mail size={23} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7b56]">
                      Email Address
                    </p>
                    <p className="mt-2 break-all text-sm font-medium text-[#17211d] sm:text-base">
                      {agent.email}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[#9b7b56]"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
              {agent.phone ? (
                <a
                  href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                  className="group flex items-center gap-5 border border-[#17211d]/10 bg-[#f7f3ec] p-6 transition hover:border-[#b89b72]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#b89b72]/40 text-[#9b7b56]">
                    <Phone size={23} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7b56]">
                      Phone Number
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#17211d] sm:text-base">
                      {agent.phone}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[#9b7b56]"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          </section>
        ) : null}
        {/* ========================================= */}
        {/* EXISTING AGENT CONTACT FORM */}
        {/* ========================================= */}
        <section className="relative scroll-mt-24 border-t border-[#17211d]/10 bg-[#17211d]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent" />
          <div className="relative">
            <LeadCaptureSection
              formType="contact"
              sectionId="agent-contact"
              heading={`Connect With ${agent.name}`}
              subheading={`Ready to take the next step? Send a message to ${agent.name} and they or a member of the Sandstone team will follow up with you.`}
              showAside={false}
              ctaLabel="SEND MESSAGE"
              messagePlaceholder={`Tell ${firstName} about your real estate goals and how they can help you...`}
              mappingReference={`agent-${agent.slug}`}
              turnstileSiteKey={turnstileSiteKey}
            />
          </div>
        </section>
        {/* ========================================= */}
        {/* MEET MORE OF OUR TEAM */}
        {/* ========================================= */}
        {otherAgents.length > 0 ? (
          <section className="bg-[#f7f3ec] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9b7b56]">
                    The People Behind Sandstone
                  </p>
                  <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    Meet More of Our Team.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-[#5b625e]">
                    Discover the dedicated professionals who share our
                    commitment to exceptional real estate service.
                  </p>
                </div>
                <Link
                  href="/join#meet-the-agents"
                  className="group inline-flex items-center gap-3 self-start border-b border-[#b89b72] pb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#17211d] transition hover:text-[#9b7b56] lg:self-end"
                >
                  View Our Entire Team
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {otherAgents.map((member) => (
                  <article key={member.slug} className="group">
                    <Link
                      href={`/agents/${member.slug}`}
                      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b7b56]"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#e7dfd2]">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17211d]/35 via-transparent to-transparent" />
                        <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#17211d]">
                          <ArrowUpRight size={19} aria-hidden="true" />
                        </div>
                      </div>
                      <div className="border-b border-[#17211d]/15 pb-6 pt-6">
                        <p className="min-h-[32px] text-[10px] font-semibold uppercase leading-4 tracking-[0.16em] text-[#9b7b56]">
                          {member.role}
                        </p>
                        <h3 className="mt-2 font-serif text-3xl tracking-tight">
                          {member.name}
                        </h3>
                        <p className="mt-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#17211d] transition group-hover:text-[#9b7b56]">
                          View Profile
                          <ArrowRight size={15} aria-hidden="true" />
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
