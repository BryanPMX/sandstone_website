import Link from "next/link";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMyPropertyCards, getSortedPosts } from "@/services";
import { isAlejandroListing } from "@/lib";
import { HOME_FAQ_SCHEMA_EN, HOME_FAQ_SCHEMA_ES } from "@/constants/site";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sandstone Real Estate Group | Luxury Homes in El Paso, TX",
  description: "Find your dream home in El Paso, Texas. Luxury real estate services from Sandstone Real Estate Group. Buy, sell, and rent properties in the Southwest.",
  keywords: ["El Paso real estate", "Texas homes", "luxury homes El Paso", "real estate agent El Paso", "property listings El Paso"],
};

export default async function Home() {
  const properties = await fetchMyPropertyCards();
  const latestPosts = (await getSortedPosts()).slice(0, 3);
  const alejandroSparkProperties = properties.filter(
    (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
  );

  return (
    <>
      <Script
        id="local-business-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Sandstone Real Estate Group",
            description:
              "Luxury. Lifestyle. Legacy. Redefining real estate in El Paso and the Southwest through trust, lifestyle, and innovation.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "El Paso",
              addressRegion: "TX",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "31.7619",
              longitude: "-106.485",
            },
            url: "https://sandstone.homes",
            areaServed: {
              "@type": "City",
              name: "El Paso",
              addressRegion: "TX",
            },
            serviceType: [
              "Real Estate Sales",
              "Property Management",
              "Real Estate Consulting",
            ],
          }),
        }}
      />
      <Script
        id="home-faq-schema-es"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA_ES) }}
      />
      <Script
        id="home-faq-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA_EN) }}
      />
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
        <Script
          id="google-maps"
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly&libraries=places`}
        />
      ) : null}
      <SiteHeader overlayDesktop />
      <main className="min-h-screen">
        <HeroSection />
        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
          <Link href="/pcs" className="block w-full">
            <img
              src="/uploads/Banner%20PCS3.jpeg"
              alt="Military PCS Specialist — start your move"
              className="block w-full h-[90px] object-cover object-center md:h-auto"
            />
          </Link>
        </section>
        <FeaturedListingsSection properties={alejandroSparkProperties} />
        <BlogTeaserSection posts={latestPosts} />
        <PrimaryActionTiles />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
