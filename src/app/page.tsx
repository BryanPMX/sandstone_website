import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchActivePropertyCardsPage } from "@/services";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export default async function Home() {
  const { properties } = await fetchActivePropertyCardsPage(1);

  return (
    <>
      <SiteHeader overlayDesktop />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedListingsSection properties={properties} />
        <PrimaryActionTiles />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
