import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMyPropertyCards, getSortedPosts } from "@/services";
import { isAlejandroListing } from "@/lib";

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
