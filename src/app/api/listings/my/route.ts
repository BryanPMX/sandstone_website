import { NextResponse } from "next/server";
import { fetchMyPropertyCards } from "@/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await fetchMyPropertyCards();
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Failed to fetch my listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}