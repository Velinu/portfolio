import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  // Log contact for now — integrate with email service (Resend, SendGrid) later
  console.log("[Contato]", { name, email, message });

  return NextResponse.json({ ok: true });
}
