import { NextResponse } from "next/server";
import { fetchRentalPropertyCards } from "@/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await fetchRentalPropertyCards();
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Failed to fetch rental listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch rental listings" },
      { status: 500 }
    );
  }
}
