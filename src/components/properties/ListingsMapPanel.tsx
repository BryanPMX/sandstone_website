"use client";

import dynamic from "next/dynamic";
import type { PropertyCard } from "@/types";

const ListingsMapPanelClient = dynamic(
  () => import("./ListingsMapPanel.client").then((module) => module.ListingsMapPanelClient),
  {
    ssr: false,
    loading: () => (
      <section className="relative h-[56vh] min-h-[420px] overflow-hidden rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:sticky lg:top-24 lg:h-[calc(100vh-9.25rem)]">
        <div className="flex h-full w-full items-center justify-center text-sm text-[var(--sandstone-charcoal)]/70">
          Loading map...
        </div>
      </section>
    ),
  }
);

interface ListingsMapPanelProps {
  properties: PropertyCard[];
  mapContextQuery?: Record<string, string | undefined>;
  initialCenter?: [number, number];
  initialZoom?: number;
  isRefreshing?: boolean;
  onViewportChange?: (viewport: {
    north: number;
    south: number;
    east: number;
    west: number;
    zoom: number;
  }) => void;
}

export function ListingsMapPanel({
  properties,
  mapContextQuery,
  initialCenter,
  initialZoom,
  isRefreshing = false,
  onViewportChange,
}: ListingsMapPanelProps) {
  return (
    <section className="relative">
      <ListingsMapPanelClient
        properties={properties}
        mapContextQuery={mapContextQuery}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
        onViewportChange={onViewportChange}
      />

      {isRefreshing ? (
        <div className="pointer-events-none absolute right-3 top-3 z-[500] inline-flex items-center gap-2 rounded-full border border-[var(--sandstone-navy)]/18 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[var(--sandstone-charcoal)] shadow-[0_10px_24px_-14px_rgba(17,24,61,0.45)]">
          <span
            aria-hidden
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--sandstone-sand-gold)]/35 border-t-[var(--sandstone-sand-gold)]"
          />
          Updating map
        </div>
      ) : null}
    </section>
  );
}
