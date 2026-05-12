import { NextResponse } from "next/server";
import { refreshMapListingsCache } from "@/lib/map-listings-cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await refreshMapListingsCache();

    return NextResponse.json(properties, {
      headers: {
        "Cache-Control": "s-maxage=15, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Failed to fetch map listings:", error);

    return NextResponse.json(
      { error: "Failed to fetch map listings" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}