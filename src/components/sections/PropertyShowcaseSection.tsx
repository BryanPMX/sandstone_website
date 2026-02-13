"use client";

import type { PropertyCard } from "@/types";
import { BentoGrid } from "@/components/properties/BentoGrid";

interface PropertyShowcaseSectionProps {
  properties: PropertyCard[];
}

export function PropertyShowcaseSection({ properties }: PropertyShowcaseSectionProps) {
  const hasFeed = properties.length > 0;

  return (
    <section className="pt-[49px] pb-[70px] md:pt-[63px] md:pb-[84px]" id="listings">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="section-frame flex flex-col gap-4 p-5 sm:gap-[21px] sm:p-[28px] md:flex-row md:items-center md:justify-between md:p-[35px]">
          <div>
            <p className="badge-sandstone mb-4">Featured listings</p>
            <h2 className="font-heading text-3xl font-bold text-sandstone-gold md:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 max-w-2xl text-sandstone-text/75">
              Pulled in real-time via Rolu webhooks so buyers see the newest inventory first.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[35px]">
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
