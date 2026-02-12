import "server-only";

import type { PropertyCard } from "@/types";
import { getMslFeedUrl } from "@/config";

const FALLBACK_PROPERTIES: PropertyCard[] = [
  {
    id: "demo-1",
    title: "Sunset Ridge Estate",
    location: "West El Paso · Franklin Mountains view",
    price: "$845,000",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    beds: 4,
    baths: 3.5,
    sqft: "3,950",
    featured: true,
  },
  {
    id: "demo-2",
    title: "Cimarron Canyon Modern",
    location: "Cimarron Canyon · El Paso",
    price: "$629,900",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    beds: 3,
    baths: 2.5,
    sqft: "2,780",
  },
  {
    id: "demo-3",
    title: "Mission Hills Haven",
    location: "Mission Hills · Downtown access",
    price: "$712,000",
    image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
    beds: 4,
    baths: 3,
    sqft: "3,120",
  },
];

/**
 * Fetch live property cards from MSL Real Estate feed (Rolu-controlled webhook).
 * Falls back to curated demo data when the feed is unavailable so the UI stays hydrated.
 */
export async function fetchMslPropertyCards(): Promise<PropertyCard[]> {
  const feedUrl = getMslFeedUrl();

  if (!feedUrl) return FALLBACK_PROPERTIES;

  try {
    const res = await fetch(feedUrl, {
      // Cache for a few minutes to help Lighthouse/PSI while staying fresh.
      next: { revalidate: 300 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("[MSL] Feed error", res.status);
      return FALLBACK_PROPERTIES;
    }

    const data = (await res.json()) as unknown;

    if (!Array.isArray(data)) {
      return FALLBACK_PROPERTIES;
    }

    // Map arbitrary feed shape into our card contract defensively.
    return data.map((item, idx) => {
      const safeItem = item as Record<string, unknown>;
      const beds = safeItem.beds ?? safeItem.bedrooms;
      const baths = safeItem.baths ?? safeItem.bathrooms;
      const sqftValue = safeItem.sqft ?? safeItem.squareFeet;

      return {
        id: String(safeItem.id ?? idx),
        title: (safeItem.title ?? safeItem.name ?? "MSL Listing") as string,
        location: (safeItem.location ?? safeItem.address ?? "El Paso, TX") as string,
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
  } catch (err) {
    console.error("[MSL] Feed fetch failed", err);
    return FALLBACK_PROPERTIES;
  }
}
