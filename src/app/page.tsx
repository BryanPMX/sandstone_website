import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMyPropertyCards, getSortedPosts } from "@/services";
import { isAlejandroListing } from "@/lib";
import Script from "next/script";

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
            "name": "Sandstone Real Estate Group",
            "description": "Luxury. Lifestyle. Legacy. Redefining real estate in El Paso and the Southwest through trust, lifestyle, and innovation.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "El Paso",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "31.7619",
              "longitude": "-106.485"
            },
            "url": "https://sandstone.homes",
            "areaServed": {
              "@type": "City",
              "name": "El Paso",
              "addressRegion": "TX"
            },
            "serviceType": ["Real Estate Sales", "Property Management", "Real Estate Consulting"]
          })
        }}
      />
      <SiteHeader overlayDesktop />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedListingsSection properties={alejandroSparkProperties} />
        <BlogTeaserSection posts={latestPosts} />
        <PrimaryActionTiles />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
