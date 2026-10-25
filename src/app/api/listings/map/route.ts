import { NextRequest, NextResponse } from "next/server";
import { getMapListingsForInitialLoad } from "@/lib/map-listings-cache";

import { getSparkRetryAfterSeconds } from "@/lib/spark-rate-limit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const listingType = request.nextUrl.searchParams.get("listingType") === "rental" ? "rental" : "active";
    const { properties, partial } = await getMapListingsForInitialLoad(listingType);

    return NextResponse.json(properties, {
      headers: {
        "Cache-Control": partial ? "no-store" : "s-maxage=60, stale-while-revalidate=300",
        ...(partial ? { "X-Listings-Partial": "1", "Retry-After": String(getSparkRetryAfterSeconds() || 60) } : {}),
      },
    });
  } catch (error) {
    console.error("Failed to fetch map listings:", error);

    return NextResponse.json(
      { error: "Failed to fetch map listings" },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(getSparkRetryAfterSeconds() || 60),
        },
      }
    );
  }
}