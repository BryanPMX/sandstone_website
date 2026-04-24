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

export default async function Home() {
  const properties = await fetchMyPropertyCards();
  const latestPosts = (await getSortedPosts()).slice(0, 3);
  const alejandroSparkProperties = properties.filter(
    (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
  );

  return (
    <>
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
