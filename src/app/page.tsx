import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { ArrowRight, Home as HomeIcon, MapPin, KeyRound } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { ContactForm } from "@/components/ContactForm";
import { GoogleReviews } from "@/components/GoogleReviews";
import { SiteFooter } from "@/components/SiteFooter";
import ExploreNearbyAreas from "@/components/ExploreNearbyAreas";
import { agents } from "@/data/agents";

import { fetchMyPropertyCards, getSortedPosts } from "@/services";
import { isAlejandroListing } from "@/lib";
import {
  HOME_FAQ_SCHEMA_EN,
  HOME_FAQ_SCHEMA_ES,
} from "@/constants/site";

export const revalidate = 600;

const HOME_STARTING_POINTS = [
  {
    title: "Find a Home",
    description: "Explore available homes and find your next address.",
    href: "/listings/map",
    icon: HomeIcon,
  },
  {
    title: "Sell My Home",
    description: "Get a personalized strategy for your home sale.",
    href: "/sell",
    icon: KeyRound,
  },
  {
    title: "Moving to Fort Bliss",
    description: "Plan your PCS with local guidance and relocation resources.",
    href: "/pcs",
    icon: MapPin,
  },
] as const;

export const metadata = {
  title: "Sandstone Real Estate Group | Luxury Homes in El Paso, TX",
  description:
    "Explore luxury homes, military relocation services, and real estate opportunities in El Paso, Texas with Sandstone Real Estate Group. Buy, sell, and rent homes near Fort Bliss and across the Southwest.",
};

export default async function Home() {
  const [properties, posts] = await Promise.all([
    fetchMyPropertyCards(),
    getSortedPosts(),
  ]);

  const latestPosts = posts.slice(0, 3);

  const alejandroSparkProperties = properties
    .filter(
      (property) =>
        Boolean(property.sparkSource) && isAlejandroListing(property)
    )
    .slice(0, 12);

  return (
    <>
      <Script
        id="local-business-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["RealEstateAgent", "LocalBusiness"],
            name: "Sandstone Real Estate Group",
            url: "https://sandstone.homes",
            description:
              "Luxury real estate and military PCS specialist serving El Paso, Fort Bliss, Horizon City, Upper Valley, Canutillo, and Santa Teresa.",
            telephone: "+19152776707",
            address: {
              "@type": "PostalAddress",
              addressLocality: "El Paso",
              addressRegion: "TX",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 31.7619,
              longitude: -106.485,
            },
            areaServed: [
              "El Paso, TX",
              "Fort Bliss, TX",
              "Horizon City, TX",
              "Upper Valley, TX",
              "Canutillo, TX",
              "Santa Teresa, NM",
            ],
            serviceType: [
              "Real Estate Sales",
              "Military PCS",
              "VA Home Buying",
              "Luxury Homes",
              "Home Selling",
            ],
          }),
        }}
      />

      <Script
        id="home-faq-schema-es"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_FAQ_SCHEMA_ES),
        }}
      />

      <Script
        id="home-faq-schema-en"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_FAQ_SCHEMA_EN),
        }}
      />

      <SiteHeader overlayDesktop />

      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />

        <nav
          aria-label="Start your real estate journey"
          className="bg-[var(--sandstone-off-white)] py-6 sm:py-8"
        >
          <ul className="container mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 md:grid-cols-3 md:gap-5">
            {HOME_STARTING_POINTS.map(({ title, description, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white px-5 py-5 text-[var(--sandstone-navy)] shadow-sm transition hover:border-[var(--sandstone-sand-gold)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)]/10 text-[var(--sandstone-sand-gold)]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-base font-bold sm:text-lg">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[var(--sandstone-charcoal)]/75">
                      {description}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 transition group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <FeaturedListingsSection properties={alejandroSparkProperties} />

        <section
          aria-labelledby="why-sandstone-heading"
          className="bg-[var(--sandstone-navy)] py-14 text-white md:py-20"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--sandstone-sand-gold)]">
              Why Sandstone
            </p>
            <h2 id="why-sandstone-heading" className="mt-3 max-w-2xl font-heading text-3xl font-bold md:text-4xl">
              Local knowledge. A plan built around you.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
              From your first home search to your next move, connect with a team
              that brings together buyer guidance, property marketing, and military
              relocation support.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                { title: "Explore with local guidance", description: "Compare homes and neighborhoods across El Paso with guidance on the details that matter to your move.", href: "/areas", label: "Explore neighborhoods" },
                { title: "Give your home a clear strategy", description: "See how pricing, professional video, drone coverage, and marketing come together to present your property.", href: "/sell", label: "See our seller approach" },
                { title: "Make your PCS easier to plan", description: "Find Fort Bliss relocation resources, a PCS checklist, and VA home-buying information in one place.", href: "/pcs", label: "Explore PCS resources" },
              ].map(({ title, description, href, label }) => (
                <div key={href} className="border-t border-white/20 pt-6">
                  <h3 className="font-heading text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">{description}</p>
                  <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-[var(--sandstone-sand-gold)] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                    {label}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ExploreNearbyAreas compact />

        <GoogleReviews />

        <section
          id="team"
          aria-labelledby="home-team-heading"
          className="bg-[var(--sandstone-off-white)] py-14 md:py-20"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--sandstone-sand-gold)]">
              Meet your team
            </p>
            <h2 id="home-team-heading" className="mt-3 font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              The people behind your next move.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--sandstone-charcoal)]/75">
              Get to know the Sandstone agents who help buyers, sellers, and
              relocating clients navigate their next chapter. Select an agent to
              read their story and specialties.
            </p>
            <ul className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <li key={agent.slug}>
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sandstone-navy)]/5">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover object-top transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-[var(--sandstone-navy)]">{agent.name}</h3>
                      <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/75">{agent.role}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--sandstone-navy)]">
                        View bio<ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactForm />

        <BlogTeaserSection posts={latestPosts} />
      </main>

      <SiteFooter />
    </>
  );
}
