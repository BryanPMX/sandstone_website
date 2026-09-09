import Link from "next/link";
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
      className="scroll-mt-20 bg-gradient-to-b from-[#f1ece4] via-[#f8f6f3] to-white pt-6 pb-16 sm:pt-16 md:pt-20 md:pb-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-xl font-bold whitespace-nowrap text-[var(--sandstone-charcoal)] sm:whitespace-normal sm:text-3xl md:text-[2.15rem]">
            <span className="sm:hidden">Homes Listed in El Paso, Tx</span>
            <span className="hidden sm:inline">
              Homes listed in El Paso Texas
            </span>
          </h2>
          {searchQuery ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--sandstone-charcoal)]/70 md:text-base">
              {`Showing matches from my Flexmls listings for "${searchQuery}".`}
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
            <Link
              href="/listings?page=1"
              prefetch={false}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--sandstone-sand-gold)] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
            >
              View all active listings
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
