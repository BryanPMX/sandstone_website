"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PropertyCard } from "@/types";
import { shouldBypassNextImageOptimization } from "@/lib";

interface ListingCardProps {
  property: PropertyCard;
  priority?: boolean;
}

/**
 * Presentational listing card used across listing surfaces.
 */
export function ListingCard({ property, priority = false }: ListingCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);
  const shouldShowTransitionOverlay = property.sparkSource === "active";
  const bypassOptimization = shouldBypassNextImageOptimization(property.image);
  const details = [
    property.beds != null && `${property.beds} beds`,
    property.baths != null && `${property.baths} baths`,
    property.sqft && `${property.sqft} sq ft`,
  ]
    .filter(Boolean)
    .join(" · ");
  const detailHref = (() => {
    const searchParams = new URLSearchParams();

    if (property.sparkId) {
      searchParams.set("sparkId", property.sparkId);
    }

    if (property.sparkSource) {
      searchParams.set("src", property.sparkSource);
    }

    const queryString = searchParams.toString();
    return queryString
      ? `/listings/${property.routeId}?${queryString}`
      : `/listings/${property.routeId}`;
  })();

  useEffect(() => {
    if (!(shouldShowTransitionOverlay && isNavigating)) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isNavigating, shouldShowTransitionOverlay]);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!shouldShowTransitionOverlay) {
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setIsNavigating(true);

    startTransition(() => {
      router.push(detailHref);
    });
  };

  const showOverlay = shouldShowTransitionOverlay && (isNavigating || isPending);

  return (
    <>
      <Link
        href={detailHref}
        onClick={handleClick}
        aria-busy={showOverlay}
        className="group block overflow-hidden rounded-2xl border border-white/65 bg-white/72 shadow-[0_18px_36px_-24px_rgba(37,52,113,0.55)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(37,52,113,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            priority={priority && !bypassOptimization}
            unoptimized={bypassOptimization}
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

      {showOverlay && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[color:rgba(248,246,243,0.82)] backdrop-blur-md">
          <div
            role="status"
            aria-live="polite"
            className="flex min-w-[240px] flex-col items-center rounded-[1.75rem] border border-white/70 bg-white/92 px-8 py-7 text-center shadow-[0_30px_80px_-36px_rgba(37,52,113,0.38)]"
          >
            <span
              aria-hidden
              className="h-11 w-11 animate-spin rounded-full border-4 border-[var(--sandstone-sand-gold)]/20 border-t-[var(--sandstone-navy)]"
            />
            <p className="mt-4 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
              Loading listing
            </p>
            <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/72">
              Preparing the Sandstone Collection detail page.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
