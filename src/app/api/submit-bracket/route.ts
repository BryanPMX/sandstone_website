import { Resend } from "resend";
import { NextResponse } from "next/server";

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL!;

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await request.json();

    console.log("=== BRACKET SUBMISSION RECEIVED ===");
    console.log("GHL URL exists:", !!process.env.GHL_WEBHOOK_URL);
    console.log("Name:", data.name);
    console.log("Email:", data.email);

    // Send bracket data to GoHighLevel
    try {
      const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      });

      console.log("GHL Status:", ghlResponse.status);

      const ghlText = await ghlResponse.text();

      console.log("GHL Response:", ghlText);
    } catch (err) {
      console.error("GHL webhook failed:", err);
    }

    // Send email notification
    const result = await resend.emails.send({
      from: "World Cup Challenge <bracket@sandstone.homes>",
      to: "zachcarrejo07@gmail.com",
      subject: `World Cup Bracket - ${data.name}`,
      html: `
        <h2>New World Cup Bracket Submission</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Champion:</strong> ${data.champion}</p>

        <hr />

        <h3>Full Submission</h3>

        <pre style="white-space: pre-wrap;">
${JSON.stringify(data, null, 2)}
        </pre>
      `,
    });

    console.log("Resend result:", result);

    return NextResponse.json({
      success: true,
      resend: result,
    });
  } catch (error) {
    console.error("Submit bracket error:", error);

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