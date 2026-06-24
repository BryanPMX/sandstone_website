import { NextResponse } from "next/server";
import { fetchActiveSparkPropertyCardsByPostalCode } from "@/services/spark.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await fetchActiveSparkPropertyCardsByPostalCode("79922");
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Failed to fetch Upper Valley listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
