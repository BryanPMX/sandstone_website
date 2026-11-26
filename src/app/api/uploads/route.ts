import { NextResponse } from "next/server";

/**
 * Legacy uploads are disabled until secure administrator
 * authorization and file validation are implemented.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "Legacy image uploads are temporarily disabled.",
    },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
