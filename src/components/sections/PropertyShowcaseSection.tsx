"use client";

import type { PropertyCard } from "@/types";
import { BentoGrid } from "@/components/properties/BentoGrid";

interface PropertyShowcaseSectionProps {
  properties: PropertyCard[];
}

export function PropertyShowcaseSection({ properties }: PropertyShowcaseSectionProps) {
  const hasFeed = properties.length > 0;

  return (
    <section className="pt-10 pb-16 md:pt-12 md:pb-20" id="listings">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="section-frame flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <p className="badge-sandstone">Featured listings</p>
            <h2 className="font-heading text-3xl font-bold text-sandstone-navy md:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 max-w-2xl text-sandstone-text/75">
              Pulled in real-time via Rolu webhooks so buyers see the newest inventory first.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <BentoGrid properties={properties} showHeader={false} />
      </div>

      {!hasFeed && (
        <div className="mx-auto mt-6 max-w-6xl px-4 text-sm text-sandstone-text/70">
          Using curated demo listings until your feed is connected.
        </div>
      )}
    </section>
  );
}
