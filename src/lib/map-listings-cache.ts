import "server-only";

import {
  fetchActivePropertyCards,
  fetchMyPropertyCards,
  fetchRentalPropertyCards,
} from "@/services";
import type { PropertyCard } from "@/types";

const MAP_LISTINGS_CACHE_TTL_MS = 60_000;
const MAP_LISTINGS_REFRESH_COOLDOWN_MS = 12_000;

let cachedMapListings: PropertyCard[] | null = null;
let cachedMapListingsAt = 0;
let inFlightRefreshPromise: Promise<PropertyCard[]> | null = null;

function dedupeProperties<T extends { id: string; routeId: string; sparkId?: string }>(
  properties: T[]
): T[] {
  const seen = new Set<string>();

  return properties.filter((property) => {
    const key = property.sparkId ?? property.routeId ?? property.id;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function toMapClientProperty(property: PropertyCard): PropertyCard {
  return {
    id: property.id,
    routeId: property.routeId,
    sparkId: property.sparkId,
    sparkSource: property.sparkSource,
    title: property.title,
    location: property.location,
    mapAddress: property.mapAddress,
    latitude: property.latitude,
    longitude: property.longitude,
    price: property.price,
    image: property.image,
    beds: property.beds,
    baths: property.baths,
    sqft: property.sqft,
  };
}

function isFresh(now: number): boolean {
  return cachedMapListings != null && now - cachedMapListingsAt <= MAP_LISTINGS_CACHE_TTL_MS;
}

async function fetchFreshMapListings(): Promise<PropertyCard[]> {
  const [active, my, rental] = await Promise.all([
    fetchActivePropertyCards(),
    fetchMyPropertyCards(),
    fetchRentalPropertyCards(),
  ]);

  return dedupeProperties([...active, ...my, ...rental]).map(toMapClientProperty);
}

export async function refreshMapListingsCache(): Promise<PropertyCard[]> {
  const now = Date.now();

  if (inFlightRefreshPromise) {
    return inFlightRefreshPromise;
  }

  if (cachedMapListings && now - cachedMapListingsAt < MAP_LISTINGS_REFRESH_COOLDOWN_MS) {
    return cachedMapListings;
  }

  inFlightRefreshPromise = fetchFreshMapListings()
    .then((properties) => {
      cachedMapListings = properties;
      cachedMapListingsAt = Date.now();
      return properties;
    })
    .finally(() => {
      inFlightRefreshPromise = null;
    });

  return inFlightRefreshPromise;
}

export async function getMapListingsForInitialLoad(): Promise<PropertyCard[]> {
  const now = Date.now();

  if (isFresh(now) && cachedMapListings) {
    return cachedMapListings;
  }

  if (cachedMapListings) {
    void refreshMapListingsCache();
    return cachedMapListings;
  }

  return refreshMapListingsCache();
}
