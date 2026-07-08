import { NextResponse } from "next/server";

import { appointmentSchema } from "@/lib/validations/appointment";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ошибка валидации", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: a filled `company` field means a bot. Pretend success, drop it.
  if (data.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { company: _honeypot, ...appointment } = data;

  try {
    const webhook = process.env.APPOINTMENT_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...appointment,
          submittedAt: new Date().toISOString(),
          source: "website",
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      // No CRM configured — log so submissions aren't silently lost in dev.
      console.info("[appointment] new lead:", appointment);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[appointment] delivery failed:", error);
    return NextResponse.json(
      { error: "Не удалось обработать заявку" },
      { status: 500 },
    );
  }
}
