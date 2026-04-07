import { NextResponse } from "next/server";
import { fetchMyPropertyCards } from "@/services";
import {
  filterPropertyCardsWithFilters,
  isAlejandroListing,
  resolvePropertyListingType,
} from "@/lib";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ListingTypeQuery = "all" | "active" | "rental";

interface BoundsQuery {
  north?: number;
  south?: number;
  east?: number;
  west?: number;
}

function parseOptionalNumber(value: string | null): number | undefined {
  if (value == null || value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseBounds(searchParams: URLSearchParams): BoundsQuery {
  return {
    north: parseOptionalNumber(searchParams.get("north")),
    south: parseOptionalNumber(searchParams.get("south")),
    east: parseOptionalNumber(searchParams.get("east")),
    west: parseOptionalNumber(searchParams.get("west")),
  };
}

function isWithinBounds(
  latitude: number | undefined,
  longitude: number | undefined,
  bounds: BoundsQuery
): boolean {
  const { north, south, east, west } = bounds;

  if (
    typeof north !== "number" ||
    typeof south !== "number" ||
    typeof east !== "number" ||
    typeof west !== "number"
  ) {
    return true;
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return false;
  }

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return false;
  }

  const normalizedLatitude = latitude;
  const normalizedLongitude = longitude;
  const withinLatitude = normalizedLatitude >= south && normalizedLatitude <= north;

  if (west <= east) {
    return (
      withinLatitude &&
      normalizedLongitude >= west &&
      normalizedLongitude <= east
    );
  }

  return withinLatitude && (normalizedLongitude >= west || normalizedLongitude <= east);
}

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
    const bounds = parseBounds(url.searchParams);
    const search = url.searchParams.get("search")?.trim() || undefined;
    const minPrice = parseOptionalNumber(url.searchParams.get("minPrice"));
    const maxPrice = parseOptionalNumber(url.searchParams.get("maxPrice"));
    const minBeds = parseOptionalNumber(url.searchParams.get("minBeds"));
    const minBaths = parseOptionalNumber(url.searchParams.get("minBaths"));
    const limit = parseOptionalNumber(url.searchParams.get("limit"));
    const myProperties = await fetchMyPropertyCards();
    const alejandroSparkProperties = dedupeProperties(myProperties).filter(
      (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
    );

    const listingTypeFilteredProperties = listingType === "all"
      ? alejandroSparkProperties
      : alejandroSparkProperties.filter(
          (property) => resolvePropertyListingType(property) === listingType
        );

    const serverFiltered = filterPropertyCardsWithFilters(listingTypeFilteredProperties, {
      search,
      minPrice,
      maxPrice,
      minBeds,
      minBaths,
    }).filter((property) => isWithinBounds(property.latitude, property.longitude, bounds));

    const maxResultCount = typeof limit === "number" && limit > 0
      ? Math.floor(Math.min(limit, 5000))
      : 2000;
    const filteredProperties = serverFiltered.slice(0, maxResultCount);

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