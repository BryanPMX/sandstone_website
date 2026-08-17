import { NextResponse } from "next/server";
import { fetchActiveSparkPropertyCardsByPostalCode } from "@/services/spark.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await fetchActiveSparkPropertyCardsByPostalCode("79835");

    return NextResponse.json(Array.isArray(properties) ? properties : []);
  } catch (error) {
    console.error("Failed to fetch Canutillo listings:", error);
    return NextResponse.json([], { status: 500 });
  }
}