import { NextResponse } from "next/server";
import { fetchActivePropertyCards, fetchMyPropertyCards, fetchRentalPropertyCards } from "@/services";
import { isAlejandroListing } from "@/lib";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ListingTypeQuery = "all" | "active" | "rental";

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

function resolveListingTypeQuery(value: string | null): ListingTypeQuery {
  if (value === "active" || value === "rental") {
    return value;
  }

  return "all";
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const listingType = resolveListingTypeQuery(url.searchParams.get("listingType"));
    const activeFetches = [fetchActivePropertyCards(), fetchMyPropertyCards()] as const;
    let allProperties;

    if (listingType === "rental") {
      allProperties = await fetchRentalPropertyCards();
    } else if (listingType === "active") {
      const [activeProperties, myProperties] = await Promise.all(activeFetches);
      allProperties = [...activeProperties, ...myProperties];
    } else {
      const [activeProperties, myProperties, rentalProperties] = await Promise.all([
        ...activeFetches,
        fetchRentalPropertyCards(),
      ]);

      allProperties = [...activeProperties, ...myProperties, ...rentalProperties];
    }

    const filteredProperties = dedupeProperties(allProperties).filter(
      (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
    );

    return NextResponse.json(filteredProperties);
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}