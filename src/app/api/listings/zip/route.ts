import { NextResponse } from "next/server";
import { fetchActiveSparkPropertyCardsByPostalCode } from "@/services/spark.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get("zip");
    if (!zip || !/^\d{5}$/.test(zip)) {
      return NextResponse.json({ error: "Invalid zip code" }, { status: 400 });
    }
    const properties = await fetchActiveSparkPropertyCardsByPostalCode(zip);
    return NextResponse.json(properties);
  } catch (error) {
    console.error(`Failed to fetch zip listings:`, error);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}
