import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "zachcarrejo07@gmail.com",
      subject: `World Cup Bracket - ${data.name}`,
      html: `
        <h2>New World Cup Bracket Submission</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>

        <p><strong>Champion:</strong> ${data.champion}</p>

        <pre>${JSON.stringify(data, null, 2)}</pre>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}