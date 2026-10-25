import "server-only";

import { unstable_cache } from "next/cache";
import { resolvePropertyListingType } from "@/lib/properties";

import { fetchVerifiedMapPropertyCards } from "@/services/listings.service";
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
const getActive = unstable_cache(() => fetchVerifiedMapPropertyCards("active"), ["map-active-real-v3"], { revalidate: 3600 });
const getCompany = unstable_cache(() => fetchVerifiedMapPropertyCards("my"), ["map-company-real-v3"], { revalidate: 3600 });
const getRental = unstable_cache(() => fetchVerifiedMapPropertyCards("rental"), ["map-rental-real-v3"], { revalidate: 3600 });

export async function getMapListingsForInitialLoad(
  listingType: "active" | "rental" = "active"
): Promise<{ properties: PropertyCard[]; partial: boolean }> {
  const results = await Promise.allSettled([
    listingType === "rental" ? getRental() : getActive(),
    getCompany(),
  ]);
  const successful = results.filter((result) => result.status === "fulfilled");
  if (successful.length === 0) throw new Error("Listing feeds are temporarily unavailable.");
  return {
    properties: dedupeProperties(successful.flatMap((result) => result.value))
      .filter((property) => resolvePropertyListingType(property) === listingType)
      .map(toMapClientProperty),
    partial: successful.length < results.length,
  };
}
