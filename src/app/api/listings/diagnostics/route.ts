import { NextResponse } from "next/server";
import {
  getMslFeedUrl,
  getSparkActiveListingsFilter,
  getSparkApiBaseUrl,
  getSparkListingsPath,
  getSparkMyListingsFilter,
  getSparkMyListingsPath,
  hasSparkAccessToken,
} from "@/config";
import { inspectListingsTarget } from "@/services/listings.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [my, active] = await Promise.all([
    inspectListingsTarget("my", { fresh: true }),
    inspectListingsTarget("active", { fresh: true }),
  ]);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    config: {
      sparkConfigured: hasSparkAccessToken(),
      legacyFeedConfigured: Boolean(getMslFeedUrl()),
      sparkApiBaseUrl: getSparkApiBaseUrl(),
      sparkListingsPath: getSparkListingsPath(),
      sparkMyListingsPath: getSparkMyListingsPath(),
      sparkActiveListingsFilter: getSparkActiveListingsFilter(),
      sparkMyListingsFilter: getSparkMyListingsFilter(),
    },
    my,
    active,
  });
}
