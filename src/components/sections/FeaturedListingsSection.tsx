"use client";

import Link from "next/link";
import Image from "next/image";
import type { PropertyCard } from "@/types";

interface FeaturedListingsSectionProps {
  properties: PropertyCard[];
}

export function FeaturedListingsSection({ properties }: FeaturedListingsSectionProps) {
  const displayList = properties.slice(0, 4);

  return (
    <section id="listings" className="bg-[var(--sandstone-off-white)] py-14 md:py-20 scroll-mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-center font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
          Sandstone Collection
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[var(--sandstone-charcoal)]/80">
          Curated listings in El Paso and the Southwest.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
          {displayList.map((property) => (
            <Link
              key={property.id}
              href={`/listings/${property.id}`}
              className="group block overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/80 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-heading text-lg font-bold text-white">
                    {property.price}
                  </p>
                  <p className="text-sm text-white/90">{property.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#listings"
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3.5 font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 sm:w-auto"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
