import Link from "next/link";
import Image from "next/image";
import type { PropertyCard } from "@/types";

interface ListingCardProps {
  property: PropertyCard;
  priority?: boolean;
}

/**
 * Presentational listing card used across listing surfaces.
 */
export function ListingCard({ property, priority = false }: ListingCardProps) {
  const details = [
    property.beds != null && `${property.beds} beds`,
    property.baths != null && `${property.baths} baths`,
    property.sqft && `${property.sqft} sq ft`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/listings/${property.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/65 bg-white/72 shadow-[0_18px_36px_-24px_rgba(37,52,113,0.55)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(37,52,113,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          priority={priority}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/70 via-transparent to-transparent"
          aria-hidden
        />
        <p className="absolute left-3 top-3 rounded-full bg-[var(--sandstone-sand-gold)] px-3 py-1 text-xs font-semibold text-white">
          {property.price}
        </p>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-base font-bold text-[var(--sandstone-navy)] md:text-lg">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/80">
          {property.location}
        </p>
        {details && (
          <p className="mt-2 text-xs text-[var(--sandstone-charcoal)]/70">
            {details}
          </p>
        )}
      </div>
    </Link>
  );
}
