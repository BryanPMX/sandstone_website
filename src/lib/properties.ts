import type { PropertyCard } from "@/types";

export interface FilterOptions {
  /** free-text search (address/zip/title/etc) */
  query?: string;
  type?: "buy" | "rent" | "sell";
  price?: string;
  beds?: string;
  baths?: string;
}

/**
 * Pure filtering helper for property cards. Keeps filtering out of pages/components.
 * Can handle text searches, listing type, price ranges, beds and baths.
 */
export function filterPropertyCards(
  properties: PropertyCard[],
  opts: FilterOptions | string
): PropertyCard[] {
  const filters: FilterOptions =
    typeof opts === "string" ? { query: opts } : opts || {};

  const normalizeText = (s: string) => s.trim().toLowerCase();

  let result = properties;

  // free-text search
  if (filters.query) {
    const nq = normalizeText(filters.query);
    result = result.filter((property) => {
      const haystack = `${property.title} ${property.location} ${property.price}`.toLowerCase();
      return haystack.includes(nq);
    });
  }

  // listing type (best-effort based on price string)
  if (filters.type && filters.type !== "sell") {
    const wantRent = filters.type === "rent";
    result = result.filter((property) => {
      const priceText = (property.price || "").toLowerCase();
      const isRent = priceText.includes("/mo") || priceText.includes("per month") || priceText.includes("rent");
      return wantRent ? isRent : !isRent;
    });
  }

  // numeric helpers
  const extractNumber = (txt: string): number | null => {
    const match = txt.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  };

  // price range filter
  if (filters.price) {
    const raw = filters.price;
    const num = (property: PropertyCard) => extractNumber(property.price || "") ?? 0;

    result = result.filter((property) => {
      const val = num(property);
      if (raw.startsWith("Less than")) {
        const target = extractNumber(raw) ?? 0;
        return val < target;
      }
      if (raw.startsWith("More than")) {
        const target = extractNumber(raw) ?? 0;
        return val > target;
      }
      if (raw.includes("-")) {
        const parts = raw.split("-").map((p) => extractNumber(p) ?? 0);
        if (parts.length === 2) {
          const [min, max] = parts;
          return val >= min && val <= max;
        }
      }
      return true;
    });
  }

  // beds
  if (filters.beds) {
    if (filters.beds === "More than 5") {
      result = result.filter((p) => (p.beds ?? 0) > 5);
    } else {
      const [low, high] = filters.beds.split("-").map((n) => Number(n));
      result = result.filter((p) => {
        const b = p.beds ?? 0;
        return b >= low && b <= high;
      });
    }
  }

  // baths
  if (filters.baths) {
    if (filters.baths === "More than 5") {
      result = result.filter((p) => (p.baths ?? 0) > 5);
    } else {
      const [low, high] = filters.baths.split("-").map((n) => Number(n));
      result = result.filter((p) => {
        const b = p.baths ?? 0;
        return b >= low && b <= high;
      });
    }
  }

  return result;
}
