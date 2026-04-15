"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { PropertyCard } from "@/types";

const MAP_MOUNT_DELAY_MS = 60;
const MAP_MOUNT_FALLBACK_MS = 1200;

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
  const containerRef = useRef<HTMLElement>(null);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    // Warm up map chunk as early as possible to keep above-the-fold mount snappy.
    void import("./ListingsMapPanel.client");

    let cancelled = false;
    let idleTimer: number | null = null;
    let fallbackTimer: number | null = null;
    let observer: IntersectionObserver | null = null;

    const enableMap = () => {
      if (!cancelled) {
        setShouldRenderMap(true);
      }
    };

    const initializeSoon = () => {
      if (idleTimer != null) {
        window.clearTimeout(idleTimer);
      }

      idleTimer = window.setTimeout(enableMap, MAP_MOUNT_DELAY_MS);
    };

    fallbackTimer = window.setTimeout(enableMap, MAP_MOUNT_FALLBACK_MS);

    const rect = container.getBoundingClientRect();
    const isNearViewport = rect.top < window.innerHeight + 220 && rect.bottom > -220;

    if (isNearViewport) {
      initializeSoon();
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            initializeSoon();
          }
        },
        { rootMargin: "180px 0px" }
      );

      observer.observe(container);
    } else if (!isNearViewport) {
      initializeSoon();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();

      if (idleTimer != null) {
        window.clearTimeout(idleTimer);
      }

      if (fallbackTimer != null) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative">
      {shouldRenderMap ? (
        <ListingsMapPanelClient
          properties={properties}
          mapContextQuery={mapContextQuery}
          initialCenter={initialCenter}
          initialZoom={initialZoom}
          onViewportChange={onViewportChange}
        />
      ) : (
        <section className="relative h-[56vh] min-h-[420px] overflow-hidden rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:sticky lg:top-24 lg:h-[calc(100vh-9.25rem)]">
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--sandstone-charcoal)]/70">
            Preparing map...
          </div>
        </section>
      )}

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
