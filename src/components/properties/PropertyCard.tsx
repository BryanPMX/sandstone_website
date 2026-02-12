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
    <Card className="group overflow-hidden border-white/65 bg-white/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_45px_-28px_rgba(37,52,113,0.46)]">
      <div className="light-sweep image-structure relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="badge-sandstone-price absolute left-3 top-3">
          {price}
        </div>
        {featured && (
          <div className="badge-sandstone-accent absolute right-3 top-3 px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
            Featured
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sandstone-navy/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <CardContent className="p-[28px]">
        <h3 className="font-heading text-lg font-bold text-sandstone-gold">
          {title}
        </h3>
        <p className="mt-[7px] text-sm text-sandstone-text/80">{location}</p>
        {details && (
          <p className="mt-[14px] text-xs text-sandstone-text/70">{details}</p>
        )}
      </CardContent>
    </Card>
  );
}
