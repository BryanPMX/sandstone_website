import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMslPropertyCards } from "@/services";

export default async function Home() {
  const properties = await fetchMslPropertyCards();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedListingsSection properties={properties} />
        <PrimaryActionTiles />
        <AboutSection />
        <ContactForm />
        <SiteFooter />
      </main>
    </>
  );
}
