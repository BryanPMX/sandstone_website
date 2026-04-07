"use client";

import { useEffect, useRef, useState } from "react";
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
  onViewportChange,
}: ListingsMapPanelProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    let idleTimer: number | null = null;

    const enableMap = () => {
      if (!cancelled) {
        setShouldRenderMap(true);
      }
    };

    const initializeSoon = () => {
      idleTimer = window.setTimeout(enableMap, 120);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            initializeSoon();
          }
        },
        { rootMargin: "180px 0px" }
      );

      observer.observe(container);

      return () => {
        cancelled = true;
        observer.disconnect();
        if (idleTimer != null) {
          window.clearTimeout(idleTimer);
        }
      };
    }

    initializeSoon();

    return () => {
      cancelled = true;
      if (idleTimer != null) {
        window.clearTimeout(idleTimer);
      }
    };
  }, []);

  return (
    <section ref={containerRef}>
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
    </section>
  );
}
