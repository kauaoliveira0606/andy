// Temporary: checks whether Airtable's public API exposes any endpoint for
// creating/managing Automations. As of general knowledge, Airtable does not
// expose this via its REST or Metadata API — automations are UI-only. This
// probes a few plausible paths to confirm rather than assume.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }

  const candidates = [
    `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/automations`,
    `https://api.airtable.com/v0/${AIRTABLE_BASE}/automations`,
  ];

  const results: Record<string, unknown> = {};
  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } });
      const text = await res.text();
      results[url] = { status: res.status, body: text.slice(0, 300) };
    } catch (e) {
      results[url] = { error: String(e) };
    }
  }

  return NextResponse.json({ results });
}
