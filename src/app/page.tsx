import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Home as HomeIcon, MapPin, KeyRound } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { GoogleReviews } from "@/components/GoogleReviews";
import { SiteFooter } from "@/components/SiteFooter";
import ExploreNearbyAreas from "@/components/ExploreNearbyAreas";
import { FinancingBanner } from "@/components/FinancingBanner";

import { fetchMyPropertyCards, getSortedPosts } from "@/services";
import { isAlejandroListing } from "@/lib";
import {
  HOME_FAQ_SCHEMA_EN,
  HOME_FAQ_SCHEMA_ES,
} from "@/constants/site";

export const revalidate = 600;

const SHOW_LUXURY_BANNER = false;

const HOME_STARTING_POINTS = [
  {
    title: "Find a Home",
    description: "Explore available homes and find your next address.",
    href: "/listings",
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

        <section className="w-full overflow-hidden">
          <Link
            href="/pcs"
            className="block w-full"
            aria-label="Learn more about military PCS services"
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/uploads/new_usa_banner-mobile@2x.webp"
              />
              <img
                src="/uploads/new_usa_banner.png"
                alt="Military PCS Specialist — start your move"
                className="block h-auto w-full"
              />
            </picture>
          </Link>
        </section>

        {SHOW_LUXURY_BANNER && (
          <section className="w-full overflow-hidden bg-[#071a33]">
            <Link
              href="/luxury-homes"
              className="block w-full"
              aria-label="Explore luxury homes with Sandstone Real Estate Team"
            >
              <img
                src="/uploads/luxury_banner.png"
                alt="Luxury Homes — exclusive properties and exceptional lifestyles"
                className="block h-auto w-full"
              />
            </Link>
          </section>
        )}

        <FeaturedListingsSection properties={alejandroSparkProperties} />

        <GoogleReviews />

        <ContactForm />

        <FinancingBanner />

        <ExploreNearbyAreas compact />

        <BlogTeaserSection posts={latestPosts} />

        <PrimaryActionTiles />
      </main>

      <SiteFooter />
    </>
  );
}
