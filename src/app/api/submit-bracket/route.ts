import { NextResponse } from "next/server";

const GOOGLE_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxtc5W3RGh2l0yOjUSmuq3PDdBlad39dkxfEDlsKmM4xxZOd7ojbKgFi5glvfDvGXEP/exec";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("=== BRACKET SUBMISSION RECEIVED ===");
    console.log("Name:", data.name);
    console.log("Email:", data.email);

    const sheetsResponse = await fetch(
      GOOGLE_SHEETS_WEBHOOK_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),

          fullName: data.name,
          phone: data.phone,
          email: data.email,

          championPick: data.champion,

          groupStagePicks: JSON.stringify(
            data.groupPicks || {}
          ),

          top8ThirdPlacePicks: JSON.stringify(
            data.topThirdPlaceTeams || []
          ),

          roundOf32Picks: JSON.stringify(
            data.roundOf32Picks || []
          ),

          fullBracketJson: JSON.stringify(data),
        }),
      }
    );

    console.log(
      "Google Sheets Status:",
      sheetsResponse.status
    );

    const sheetsText =
      await sheetsResponse.text();

    console.log(
      "Google Sheets Response:",
      sheetsText
    );

    return NextResponse.json({
      success: true,
      message:
        "Bracket submitted successfully",
    });
  } catch (error) {
    console.error(
      "Submit bracket error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}