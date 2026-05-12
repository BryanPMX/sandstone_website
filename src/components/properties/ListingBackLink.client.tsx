"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ListingBackLinkProps {
  mapBackHref: string | null;
  fallbackHref: string;
}

const MAP_SESSION_KEY = "sandstone:last-map-href";

function canUseHistoryBackForMap(mapBackHref: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.history.length <= 1) {
    return false;
  }

  const storedMapHref = window.sessionStorage.getItem(MAP_SESSION_KEY);

  if (storedMapHref && storedMapHref === mapBackHref) {
    return true;
  }

  const referrer = document.referrer;

  if (!referrer) {
    return false;
  }

  try {
    const referrerUrl = new URL(referrer);

    if (referrerUrl.origin !== window.location.origin) {
      return false;
    }

    return referrerUrl.pathname === "/listings/map";
  } catch {
    return false;
  }
}

export function ListingBackLink({ mapBackHref, fallbackHref }: ListingBackLinkProps) {
  const router = useRouter();
  const href = mapBackHref ?? fallbackHref;
  const label = mapBackHref ? "\u2190 Back to map results" : "\u2190 Back to listings";

  useEffect(() => {
    void router.prefetch(href);
  }, [href, router]);

  return (
    <Link
      href={href}
      prefetch={false}
      onClick={(event) => {
        if (!mapBackHref || !canUseHistoryBackForMap(mapBackHref)) {
          return;
        }

        event.preventDefault();
        router.back();
      }}
      className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
    >
      {label}
    </Link>
  );
}
