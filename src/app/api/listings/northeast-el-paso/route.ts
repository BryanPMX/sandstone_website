import { NextResponse } from "next/server";
import { fetchActiveSparkPropertyCardsByPostalCode } from "@/services/spark.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NORTHEAST_ZIPS = ["79924", "79934", "79904", "79906", "79930"];

export async function GET() {
  try {
    const results = await Promise.all(
      NORTHEAST_ZIPS.map((zip) => fetchActiveSparkPropertyCardsByPostalCode(zip))
    );

    const properties = results.flat();

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Failed to fetch Northeast El Paso listings:", error);
    return NextResponse.json([], { status: 200 });
  }
}