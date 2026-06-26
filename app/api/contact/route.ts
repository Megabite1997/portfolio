import { NextResponse } from "next/server";
import { profile } from "@/lib/data";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const company = (body.company || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured → graceful mailto fallback so the form still "works".
  if (!apiKey) {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      "",
      message,
    ].filter(Boolean);
    const fallback = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(
      lines.join("\n")
    )}`;
    return NextResponse.json({ ok: true, fallback });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: profile.email,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: "Could not send" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }
}
