import { NextResponse } from "next/server";

/**
 * Review submissions are temporarily disabled until
 * server-side administrator authorization is implemented.
 *
 * Existing published reviews remain unaffected.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "Review submissions are temporarily disabled.",
    },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
