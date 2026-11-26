import { NextResponse } from "next/server";

function unavailable() {
  return NextResponse.json(
    {
      error: "This legacy blog management endpoint is disabled.",
    },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function GET() {
  return unavailable();
}

export async function POST() {
  return unavailable();
}

export async function PUT() {
  return unavailable();
}

export async function DELETE() {
  return unavailable();
}
