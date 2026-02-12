"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { PropertyCard as PropertyCardType } from "@/types";

interface PropertyCardProps {
  property: PropertyCardType;
}

/**
 * Presentational component: renders a single property card.
 * Single responsibility: display one listing; no data fetching or business logic.
 */
export function PropertyCard({ property }: PropertyCardProps) {
  const { title, location, price, image, beds, baths, sqft, featured } =
    property;

  const details = [
    beds != null && `${beds} beds`,
    baths != null && `${baths} baths`,
    sqft && `${sqft} sq ft`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card className="group overflow-hidden border-white/65 bg-white/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_45px_-28px_rgba(75,31,47,0.48)]">
      <div className="light-sweep image-structure relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full border border-white/35 bg-sandstone-navy/85 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
          {price}
        </div>
        {featured && (
          <div className="absolute right-3 top-3 rounded-full border border-white/35 bg-sandstone-bronze/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Featured
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sandstone-navy/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <CardContent className="p-5">
        <h3 className="font-heading text-lg font-bold text-sandstone-navy">
          {title}
        </h3>
        <p className="mt-1 text-sm text-sandstone-text/80">{location}</p>
        {details && (
          <p className="mt-2 text-xs text-sandstone-text/70">{details}</p>
        )}
      </CardContent>
    </Card>
  );
}
