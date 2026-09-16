// Same-origin proxy for opt-in forms. The browser posts here (no CORS issues),
// and this forwards the lead server-side to Zapier, which has no CORS restriction.
import { NextRequest, NextResponse } from "next/server";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/21197109/4409gj4/";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  try {
    const zapierRes = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!zapierRes.ok) {
      return NextResponse.json({ ok: false, error: "zapier_error" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "zapier_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
