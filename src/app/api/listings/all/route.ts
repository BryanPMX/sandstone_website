import { NextResponse } from "next/server";
import { fetchActivePropertyCards, fetchMyPropertyCards, fetchRentalPropertyCards } from "@/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [activeProperties, myProperties, rentalProperties] = await Promise.all([
      fetchActivePropertyCards(),
      fetchMyPropertyCards(),
      fetchRentalPropertyCards(),
    ]);

    const allProperties = [...activeProperties, ...myProperties, ...rentalProperties];

    return NextResponse.json(allProperties);
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}