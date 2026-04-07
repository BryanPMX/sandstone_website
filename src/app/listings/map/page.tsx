import { ListingsMapClient } from "./ListingsMapClient";
import {
  fetchActivePropertyCards,
  fetchMyPropertyCards,
  fetchRentalPropertyCards,
} from "@/services";
import type { PropertyCard } from "@/types";

export const revalidate = 300;
const MAP_LISTINGS_CACHE_TTL_MS = revalidate * 1000;

let cachedMapClientProperties: PropertyCard[] | null = null;
let cachedMapClientPropertiesAt = 0;
let inFlightMapListingsPromise: Promise<PropertyCard[]> | null = null;

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

async function fetchMapListings(): Promise<PropertyCard[]> {
  const [active, my, rental] = await Promise.all([
    fetchActivePropertyCards(),
    fetchMyPropertyCards(),
    fetchRentalPropertyCards(),
  ]);

  return dedupeProperties([...active, ...my, ...rental]);
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

async function fetchCachedMapClientProperties(): Promise<PropertyCard[]> {
  const isFresh =
    cachedMapClientProperties != null &&
    Date.now() - cachedMapClientPropertiesAt <= MAP_LISTINGS_CACHE_TTL_MS;

  if (isFresh && cachedMapClientProperties) {
    return cachedMapClientProperties;
  }

  if (!inFlightMapListingsPromise) {
    inFlightMapListingsPromise = fetchMapListings()
      .then((properties) => properties.map(toMapClientProperty))
      .then((mapClientProperties) => {
        cachedMapClientProperties = mapClientProperties;
        cachedMapClientPropertiesAt = Date.now();
        return mapClientProperties;
      })
      .finally(() => {
        inFlightMapListingsPromise = null;
      });
  }

  return inFlightMapListingsPromise;
}

export default async function ListingsMapPage() {
  const mapClientProperties = await fetchCachedMapClientProperties();

  return <ListingsMapClient properties={mapClientProperties} />;
}
