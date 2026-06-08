import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await request.json();

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "zachcarrejo07@gmail.com",
      subject: `World Cup Bracket - ${data.name}`,
      html: `
        <h2>New World Cup Bracket Submission</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Champion:</strong> ${data.champion}</p>

        <h3>Full Bracket Data</h3>

        <pre>
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
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}