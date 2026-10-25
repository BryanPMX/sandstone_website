import "server-only";

import { unstable_cache } from "next/cache";
import { resolvePropertyListingType } from "@/lib/properties";

import {
  fetchActivePropertyCards,
  fetchMyPropertyCards,
  fetchRentalPropertyCards,
} from "@/services";
import type { PropertyCard } from "@/types";

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

// Next's Data Cache survives server instance restarts. Cache each feed separately
// so opening Buy does not wait for the rental feed (and vice versa).
const getActive = unstable_cache(fetchActivePropertyCards, ["map-active-v2"], { revalidate: 3600 });
const getCompany = unstable_cache(fetchMyPropertyCards, ["map-company-v2"], { revalidate: 3600 });
const getRental = unstable_cache(fetchRentalPropertyCards, ["map-rental-v2"], { revalidate: 3600 });

export async function getMapListingsForInitialLoad(
  listingType: "active" | "rental" = "active"
): Promise<PropertyCard[]> {
  const [inventory, company] = await Promise.all([
    listingType === "rental" ? getRental() : getActive(),
    getCompany(),
  ]);

  return dedupeProperties([...inventory, ...company])
    .filter((property) => resolvePropertyListingType(property) === listingType)
    .map(toMapClientProperty);
}
