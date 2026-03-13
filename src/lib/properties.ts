import type { PropertyCard } from "@/types";

/**
 * Basic text search helper for property cards. Keeps filtering logic out of pages/components.
 */
export function filterPropertyCards(
  properties: PropertyCard[],
  query: string
): PropertyCard[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return properties;

  return properties.filter((property) => {
    const haystack = `${property.title} ${property.location} ${property.price}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export interface PropertySearchFilters {
  search?: string;
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function getDistanceInMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function parsePriceToNumber(price: string): number | null {
  const normalized = price.replace(/[^\d.]/g, "");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

/**
 * Advanced filtering helper that supports:
 * - Text search
 * - Radius filtering from a map center (in miles)
 * - Min/max price
 * - Minimum beds/baths
 */
export function filterPropertyCardsWithFilters(
  properties: PropertyCard[],
  filters: PropertySearchFilters
): PropertyCard[] {
  const {
    search,
    centerLat,
    centerLng,
    radiusMiles,
    minPrice,
    maxPrice,
    minBeds,
    minBaths,
  } = filters;

  const hasRadiusFilter =
    typeof centerLat === "number" &&
    Number.isFinite(centerLat) &&
    typeof centerLng === "number" &&
    Number.isFinite(centerLng) &&
    typeof radiusMiles === "number" &&
    radiusMiles > 0;

  const normalizedQuery = search?.trim().toLowerCase() ?? "";

  return properties.filter((property) => {
    if (hasRadiusFilter) {
      if (
        typeof property.latitude !== "number" ||
        !Number.isFinite(property.latitude) ||
        typeof property.longitude !== "number" ||
        !Number.isFinite(property.longitude)
      ) {
        return false;
      }

      const distance = getDistanceInMiles(
        centerLat as number,
        centerLng as number,
        property.latitude,
        property.longitude
      );

      if (distance > (radiusMiles as number)) {
        return false;
      }
    }

    if (typeof minBeds === "number") {
      const beds = property.beds ?? 0;
      if (beds < minBeds) {
        return false;
      }
    }

    if (typeof minBaths === "number") {
      const baths = property.baths ?? 0;
      if (baths < minBaths) {
        return false;
      }
    }

    if (typeof minPrice === "number" || typeof maxPrice === "number") {
      const numericPrice = parsePriceToNumber(property.price);
      if (numericPrice == null) {
        return false;
      }

      if (typeof minPrice === "number" && numericPrice < minPrice) {
        return false;
      }

      if (typeof maxPrice === "number" && numericPrice > maxPrice) {
        return false;
      }
    }

    if (normalizedQuery) {
      const haystack = `${property.title} ${property.location} ${property.price}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}
