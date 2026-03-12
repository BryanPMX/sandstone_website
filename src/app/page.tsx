import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { PrimaryActionTiles } from "@/components/sections/PrimaryActionTiles";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchMyPropertyCards } from "@/services";
import { filterPropertyCards } from "@/lib";

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    price?: string;
    beds?: string;
    baths?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const filters = {
    query: (params.search ?? "").trim(),
    type: params.type as "buy" | "rent" | "sell" | undefined,
    price: params.price,
    beds: params.beds,
    baths: params.baths,
  };
  const properties = await fetchMyPropertyCards();
  const filteredProperties = filterPropertyCards(properties, filters);

  return (
    <>
      <SiteHeader overlayDesktop />
      <main className="min-h-screen">
        <HeroSection
          initialQuery={filters.query}
          initialType={filters.type}
          initialPrice={filters.price}
          initialBeds={filters.beds}
          initialBaths={filters.baths}
        />
        <FeaturedListingsSection
          properties={filteredProperties}
          searchQuery={filters.query}
        />
        <PrimaryActionTiles />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
