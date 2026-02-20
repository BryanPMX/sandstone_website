import Link from "next/link";
import type { PropertyCard } from "@/types";
import { ListingCard } from "@/components/properties";

interface FeaturedListingsSectionProps {
  properties: PropertyCard[];
  searchQuery?: string;
}

export function FeaturedListingsSection({
  properties,
  searchQuery = "",
}: FeaturedListingsSectionProps) {
  const displayList = properties.slice(0, 4);
  const viewMoreHref = searchQuery
    ? `/listings?search=${encodeURIComponent(searchQuery)}`
    : "/listings";

  return (
    <section
      id="listings"
      className="scroll-mt-20 bg-gradient-to-b from-[#f1ece4] via-[#f8f6f3] to-white py-12 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-center font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-[2rem]">
          Sandstone Collection
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-[var(--sandstone-charcoal)]/70">
          Curated listings in El Paso and the Southwest.
        </p>

        {displayList.length === 0 ? (
          <p className="mx-auto mt-10 max-w-xl rounded-xl border border-[var(--sandstone-navy)]/10 bg-white px-4 py-6 text-center text-sm text-[var(--sandstone-charcoal)]/85">
            No listings matched <strong>{searchQuery}</strong>. Try a different search.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {displayList.map((property, index) => (
              <ListingCard
                key={property.id}
                property={property}
                priority={index < 2}
              />
            ))}
          </div>
        )}

        {displayList.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              href={viewMoreHref}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-2 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 sm:w-[180px]"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
