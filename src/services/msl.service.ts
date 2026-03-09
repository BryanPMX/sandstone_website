import "server-only";

import type { PropertyCard } from "@/types";
import { getMslFeedUrl } from "@/config";

/**
 * Legacy Rolu/MSL feed fallback kept for backwards compatibility.
 * Spark API is now the primary listings source.
 */
export async function fetchLegacyFeedPropertyCards(
  options?: { fresh?: boolean }
): Promise<PropertyCard[]> {
  const feedUrl = getMslFeedUrl();

  if (!feedUrl) {
    throw new Error("MSL_FEED_URL is not set.");
  }

  const request: RequestInit & { next?: { revalidate: number } } = {
    next: { revalidate: 300 },
    headers: {
      Accept: "application/json",
    },
  };

  if (options?.fresh) {
    request.cache = "no-store";
    delete request.next;
  }

  const res = await fetch(feedUrl, request);

  if (!res.ok) {
    throw new Error(`[MSL] Feed error ${res.status}`);
  }

  const data = (await res.json()) as unknown;

  if (!Array.isArray(data)) {
    throw new Error("[MSL] Feed response was not an array.");
  }

  // Map arbitrary feed shape into our card contract defensively.
  return data.map((item, idx) => {
    const safeItem = item as Record<string, unknown>;
    const beds = safeItem.beds ?? safeItem.bedrooms;
    const baths = safeItem.baths ?? safeItem.bathrooms;
    const sqftValue = safeItem.sqft ?? safeItem.squareFeet;
    const latitudeRaw =
      safeItem.latitude ??
      safeItem.lat ??
      safeItem.geoLat ??
      (safeItem.coordinates as { lat?: unknown } | undefined)?.lat;
    const longitudeRaw =
      safeItem.longitude ??
      safeItem.lng ??
      safeItem.lon ??
      safeItem.geoLng ??
      (safeItem.coordinates as { lng?: unknown; lon?: unknown } | undefined)?.lng ??
      (safeItem.coordinates as { lng?: unknown; lon?: unknown } | undefined)?.lon;
    const latitude = typeof latitudeRaw === "number"
      ? latitudeRaw
      : typeof latitudeRaw === "string"
        ? Number(latitudeRaw)
        : undefined;
    const longitude = typeof longitudeRaw === "number"
      ? longitudeRaw
      : typeof longitudeRaw === "string"
        ? Number(longitudeRaw)
        : undefined;

    return {
      id: String(safeItem.id ?? idx),
      routeId: String(safeItem.listingNumber ?? safeItem.id ?? idx),
      title: (safeItem.title ?? safeItem.name ?? "MSL Listing") as string,
      location: (safeItem.location ?? safeItem.address ?? "El Paso, TX") as string,
      mapAddress: (safeItem.address ?? safeItem.location ?? safeItem.title) as
        | string
        | undefined,
      latitude: Number.isFinite(latitude) ? latitude : undefined,
      longitude: Number.isFinite(longitude) ? longitude : undefined,
      price: (safeItem.price ?? safeItem.listPrice ?? "$—") as string,
      image:
        (safeItem.image as { url?: string } | undefined)?.url ??
        (safeItem.photo as string | undefined) ??
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      beds: typeof beds === "number" ? beds : undefined,
      baths: typeof baths === "number" ? baths : undefined,
      sqft:
        typeof sqftValue === "number" || typeof sqftValue === "string"
          ? String(sqftValue)
          : undefined,
      featured: Boolean(safeItem.featured ?? idx === 0),
    } satisfies PropertyCard;
  });
}
