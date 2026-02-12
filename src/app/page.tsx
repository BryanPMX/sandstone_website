import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { OurSuccessesSection } from "@/components/OurSuccessesSection";
import { NewsSection } from "@/components/NewsSection";
import { AgentsSection } from "@/components/AgentsSection";
import { ContactForm } from "@/components/ContactForm";
import { GallerySection } from "@/components/sections/GallerySection";
import { PropertyShowcaseSection } from "@/components/sections/PropertyShowcaseSection";
import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { StickyCTA } from "@/components/StickyCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMslPropertyCards } from "@/services";
import type { GalleryImage } from "@/types";

export default async function Home() {
  const properties = await fetchMslPropertyCards();
  const gallery: GalleryImage[] = properties.slice(0, 9).map((p) => ({
    src: p.image,
    alt: p.title,
    location: p.location,
    price: p.price,
    stats: [p.beds && `${p.beds} bd`, p.baths && `${p.baths} ba`, p.sqft && `${p.sqft} sqft`]
      .filter(Boolean)
      .join(" · "),
  }));

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ExperienceStrip />
        <OurSuccessesSection />
        <PropertyShowcaseSection properties={properties} />
        <GallerySection images={gallery} />
        <AgentsSection />
        <NewsSection />
        <ContactForm />
        <SiteFooter />
      </main>
      <StickyCTA />
    </>
  );
}
