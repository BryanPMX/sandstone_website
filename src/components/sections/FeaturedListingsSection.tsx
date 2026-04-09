import type { PropertyCard } from "@/types";
import { ListingCarousel } from "@/components/properties";

interface FeaturedListingsSectionProps {
  properties: PropertyCard[];
  searchQuery?: string;
}

export function FeaturedListingsSection({
  properties,
  searchQuery = "",
}: FeaturedListingsSectionProps) {
  return (
    <section
      id="listings"
      className="scroll-mt-20 bg-gradient-to-b from-[#f1ece4] via-[#f8f6f3] to-white py-16 md:py-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-[2.15rem]">
            Sandstone Collection
          </h2>
          {searchQuery ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--sandstone-charcoal)]/70 md:text-base">
              {`Showing matches from Keller Williams & Sandstone Flexmls listings for "${searchQuery}".`}
            </p>
          ) : null}
        </div>

        {properties.length === 0 ? (
          <p className="mx-auto mt-12 max-w-xl rounded-xl border border-[var(--sandstone-navy)]/10 bg-white px-4 py-6 text-center text-sm text-[var(--sandstone-charcoal)]/85">
            No listings matched <strong>{searchQuery}</strong>. Try a different search.
          </p>
        ) : (
          <ListingCarousel properties={properties} />
        )}

        {properties.length > 0 && (
          <div className="mt-10 flex justify-center md:mt-12">
            <a
              href="/listings?page=1"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--sandstone-sand-gold)] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
            >
              View all active listings
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
