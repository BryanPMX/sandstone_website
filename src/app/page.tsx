import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { PcsEntrySection } from "@/components/sections/PcsEntrySection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMyPropertyCards } from "@/services";
import { isAlejandroListing } from "@/lib";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await fetchMyPropertyCards();
  const alejandroSparkProperties = properties.filter(
    (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
  );

  return (
    <>
      <SiteHeader overlayDesktop />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedListingsSection properties={alejandroSparkProperties} />
        <PrimaryActionTiles />
        <PcsEntrySection />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
