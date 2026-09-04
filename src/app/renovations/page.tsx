import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Bath,
  ChefHat,
  CheckCircle2,
  Hammer,
  Trees,
  Waves,
  Wrench,
} from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { SITE_ADDRESS } from "@/constants/site";

/**
 * Sandstone Renovation Pros landing page.
 * URL: https://sandstone.homes/renovations
 */
export const metadata: Metadata = {
  title: "Home Renovations in El Paso, TX | Sandstone Renovation Pros",
  description:
    "Full home renovations, kitchen and bathroom remodeling, landscaping, and pool projects in El Paso, TX. Get a free consultation from Sandstone Renovation Pros.",
  alternates: {
    canonical: "https://www.sandstone.homes/renovations",
  },
};

const SECTION_MAX = "mx-auto w-full max-w-6xl px-4 lg:px-6";

const services = [
  {
    icon: Hammer,
    title: "Full Home Renovations",
    description:
      "Whole-home remodels that update layout, finishes, and function room by room.",
  },
  {
    icon: ChefHat,
    title: "Kitchen Remodeling",
    description:
      "Cabinets, countertops, layouts, and finishes designed around how you actually cook and gather.",
  },
  {
    icon: Bath,
    title: "Bathroom Remodeling",
    description:
      "Refreshed or fully reconfigured bathrooms, from tile and fixtures to walk-in showers.",
  },
  {
    icon: Trees,
    title: "Landscaping",
    description:
      "Front and backyard design, hardscaping, and outdoor living spaces built for El Paso's climate.",
  },
  {
    icon: Waves,
    title: "Pool Installation & Repair",
    description:
      "New pool installations and repairs for existing pools, coordinated with licensed pool contractors.",
  },
  {
    icon: Wrench,
    title: "General Home Improvements",
    description:
      "Flooring, painting, fixtures, and the smaller projects that add up to a better home.",
  },
] as const;

const processSteps = [
  {
    step: "1. Consultation",
    detail:
      "Tell us about your project and walk us through your home, in person or over the phone.",
  },
  {
    step: "2. Design & Estimate",
    detail:
      "We put together a scope of work and a detailed estimate before anything gets scheduled.",
  },
  {
    step: "3. Renovation",
    detail:
      "Our team and trusted trade partners complete the work with regular updates along the way.",
  },
  {
    step: "4. Final Walkthrough",
    detail:
      "We walk the finished project with you to confirm everything meets your expectations.",
  },
] as const;

const whySandstone = [
  {
    title: "Backed by Sandstone Real Estate Group",
    detail:
      "Renovation Pros is run through the same team El Paso homeowners already trust for real estate.",
  },
  {
    title: "One point of contact",
    detail:
      "Jorge Gamboa oversees your project directly from your first call to the final walkthrough.",
  },
  {
    title: "Local trade partners",
    detail:
      "We work with contractors who know El Paso homes, permitting, and local building requirements.",
  },
] as const;

const serviceAreas = [
  "El Paso, TX",
  "West El Paso",
  "East El Paso",
  "Northeast El Paso",
  "Upper Valley",
  "Lower Valley",
  "Horizon City, TX",
  "Santa Teresa, NM",
] as const;

const faqs = [
  {
    question: "What areas do you serve?",
    answer:
      "Sandstone Renovation Pros works throughout El Paso, TX and nearby communities, including Horizon City, TX and Santa Teresa, NM.",
  },
  {
    question: "Do you handle both small projects and full renovations?",
    answer:
      "Yes. We take on everything from a single-room refresh to a full whole-home renovation, plus kitchen and bathroom remodels, landscaping, and pool work.",
  },
  {
    question: "Are your contractors licensed and insured?",
    answer:
      "We work with licensed, insured trade partners for every project. Ask us for documentation specific to your renovation during your consultation.",
  },
  {
    question: "How long will my project take?",
    answer:
      "Timelines depend on the scope of work. After your consultation and walkthrough, we'll give you a project timeline specific to your renovation before anything is scheduled.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the form below or call (915) 538-7697, and Jorge Gamboa will follow up to schedule your free consultation.",
  },
] as const;

export default function RenovationsPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <Script
        id="renovations-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "Sandstone Renovation Pros",
            description:
              "Home renovation, remodeling, landscaping, and pool services in El Paso, TX, operated by Sandstone Real Estate Group.",
            url: "https://www.sandstone.homes/renovations",
            telephone: "+19155387697",
            email: "j.gamboa@kw.com",
            areaServed: "El Paso, TX",
            address: {
              "@type": "PostalAddress",
              streetAddress: SITE_ADDRESS.line1,
              addressLocality: SITE_ADDRESS.city,
              addressRegion: SITE_ADDRESS.state,
              postalCode: SITE_ADDRESS.zip,
              addressCountry: "US",
            },
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--sandstone-navy)] to-[var(--sandstone-navy-deep)] py-20 text-white lg:py-28">
          <div className={`${SECTION_MAX} text-center`}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--sandstone-sand-gold)]">
              Sandstone Renovation Pros
            </p>

            <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
              Home Renovations in El Paso, TX
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
              Full renovations, kitchen and bathroom remodeling, landscaping, and pool
              projects, backed by the Sandstone Real Estate Group team.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-8 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
              >
                Get a Free Consultation
              </Link>

              <a
                href="tel:19155387697"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-white"
              >
                Call (915) 538-7697
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16">
          <div className={SECTION_MAX}>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                Renovation Services
              </h2>

              <p className="mt-3 text-[var(--sandstone-charcoal)]/70">
                From a single room to a full remodel, here&rsquo;s what Sandstone
                Renovation Pros can take on.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(37,52,113,0.35)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sandstone-off-white)] text-[var(--sandstone-navy)]">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--sandstone-charcoal)]/75">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-t border-[var(--sandstone-navy)]/10 bg-white py-16">
          <div className={SECTION_MAX}>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                How It Works
              </h2>

              <p className="mt-3 text-[var(--sandstone-charcoal)]/70">
                A straightforward process from first call to final walkthrough.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(({ step, detail }) => (
                <div
                  key={step}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/60 p-6"
                >
                  <h3 className="font-heading text-base font-bold text-[var(--sandstone-navy)]">
                    {step}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--sandstone-charcoal)]/75">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY SANDSTONE */}
        <section className="py-16">
          <div className={SECTION_MAX}>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                Why Sandstone Renovation Pros
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {whySandstone.map(({ title, detail }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(37,52,113,0.35)]"
                >
                  <CheckCircle2
                    className="mx-auto h-8 w-8 text-[var(--sandstone-sand-gold)]"
                    strokeWidth={1.8}
                  />

                  <h3 className="mt-4 font-heading text-base font-bold text-[var(--sandstone-navy)]">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--sandstone-charcoal)]/75">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREA */}
        <section className="border-t border-[var(--sandstone-navy)]/10 bg-white py-16">
          <div className={SECTION_MAX}>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
                Where We Work
              </h2>

              <p className="mt-3 text-[var(--sandstone-charcoal)]/70">
                Sandstone Renovation Pros serves homeowners across El Paso and the
                surrounding area.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[var(--sandstone-navy)]/15 bg-[var(--sandstone-off-white)] px-4 py-2 text-sm font-semibold text-[var(--sandstone-navy)]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className={SECTION_MAX}>
            <h2 className="text-center font-heading text-3xl font-extrabold text-[var(--sandstone-navy)]">
              Frequently Asked Questions
            </h2>

            {faqs.map((item) => (
              <div
                key={item.question}
                className="mt-5 rounded-xl border border-[var(--sandstone-navy)]/10 bg-white p-6"
              >
                <h3 className="font-bold text-[var(--sandstone-navy)]">
                  {item.question}
                </h3>

                <p className="mt-2 text-[var(--sandstone-charcoal)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <LeadCaptureSection
          formType="contact"
          sectionId="contact"
          heading="Start Your Renovation"
          subheading="Tell us about your project and Jorge Gamboa will follow up to schedule your free consultation."
          ctaLabel="Request a Consultation"
          messagePlaceholder="Tell us about your renovation project..."
          mappingReference="renovations"
          asideImage="/agents/jorge-headshot.png"
          asideImageAlt="Jorge Gamboa, Sandstone Renovation Pros"
          asideLayout="agent-profile"
          asideEyebrow="Sandstone Renovation Pros"
          asideTitle="Jorge Gamboa"
          asideDescription="Jorge leads Sandstone Renovation Pros and works directly with homeowners from your first call through the final walkthrough. Call or text (915) 538-7697 or email j.gamboa@kw.com to get started."
          asideCtaLabel="View Jorge's Profile"
          asideCtaHref="/agents/jorge-gamboa"
          turnstileSiteKey={turnstileSiteKey}
        />
      </main>

      <SiteFooter />
    </>
  );
}
