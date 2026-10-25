import { NextResponse } from "next/server";
import {
  getMslFeedUrl,
  getSparkActiveListingsFilter,
  getSparkApiBaseUrl,
  getSparkListingsPath,
  getSparkMyListingsFilter,
  getSparkMyListingsPath,
  getSparkRentalListingsFilter,
  getSparkRentalListingsPath,
  hasSparkAccessToken,
} from "@/config";
import { inspectListingsTarget } from "@/services/listings.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [my, active, rental] = await Promise.all([
    inspectListingsTarget("my"),
    inspectListingsTarget("active"),
    inspectListingsTarget("rental"),
  ]);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    config: {
      sparkConfigured: hasSparkAccessToken(),
      legacyFeedConfigured: Boolean(getMslFeedUrl()),
      sparkApiBaseUrl: getSparkApiBaseUrl(),
      sparkListingsPath: getSparkListingsPath(),
      sparkMyListingsPath: getSparkMyListingsPath(),
      sparkRentalListingsPath: getSparkRentalListingsPath(),
      sparkActiveListingsFilter: getSparkActiveListingsFilter(),
      sparkMyListingsFilter: getSparkMyListingsFilter(),
      sparkRentalListingsFilter: getSparkRentalListingsFilter(),
    },
    my,
    active,
    rental,
  }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}
