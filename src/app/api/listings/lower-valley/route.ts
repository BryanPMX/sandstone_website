import { NextResponse } from "next/server";
import { fetchActiveSparkPropertyCardsByPostalCode } from "@/services/spark.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await fetchActiveSparkPropertyCardsByPostalCode("79915");
    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : String(error), 
      },
      { status: 500 }
    );
  }
}
