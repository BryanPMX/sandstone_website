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
    inspectListingsTarget("my", { fresh: true }),
    inspectListingsTarget("active", { fresh: true }),
    inspectListingsTarget("rental", { fresh: true }),
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
  });
}
