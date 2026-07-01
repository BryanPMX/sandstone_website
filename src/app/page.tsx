import Link from "next/link";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { GoogleReviews } from "@/components/GoogleReviews";
import { SiteFooter } from "@/components/SiteFooter";
import ExploreNearbyAreas from "@/components/ExploreNearbyAreas";
import { fetchMyPropertyCards, getSortedPosts } from "@/services";
import { isAlejandroListing } from "@/lib";
import { HOME_FAQ_SCHEMA_EN, HOME_FAQ_SCHEMA_ES } from "@/constants/site";

export const revalidate = 600;

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

      <main className="min-h-screen">
        <HeroSection />

        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
          <Link href="/pcs" className="block w-full">
            <img
              src="/uploads/Banner%20PCS3.jpeg"
              alt="Military PCS Specialist — start your move"
              className="block h-[90px] w-full object-cover object-[center_85%] md:h-auto"
            />
          </Link>
        </section>

        <FeaturedListingsSection properties={alejandroSparkProperties} />

        <ExploreNearbyAreas />

        <BlogTeaserSection posts={latestPosts} />

        <PrimaryActionTiles />

        <ContactForm />

        <GoogleReviews />
      </main>

      <SiteFooter />
    </>
  );
}