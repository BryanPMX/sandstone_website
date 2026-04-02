import { NextResponse } from "next/server";
import { fetchMyPropertyCards } from "@/services";
import { isAlejandroListing, resolvePropertyListingType } from "@/lib";

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
    const myProperties = await fetchMyPropertyCards();
    const alejandroSparkProperties = dedupeProperties(myProperties).filter(
      (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
    );

    const filteredProperties = listingType === "all"
      ? alejandroSparkProperties
      : alejandroSparkProperties.filter(
          (property) => resolvePropertyListingType(property) === listingType
        );

    return NextResponse.json(filteredProperties, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}