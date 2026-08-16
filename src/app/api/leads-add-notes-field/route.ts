// One-time: adds an optional "Changes Made Today" notes field to Marketing
// Daily Metrics, so the submitter can log what was changed in the funnel
// that day for later reference (why did a number move).
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const MARKETING_TABLE_ID = "tblRdiOjEHQgth0TN";

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });

  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables/${MARKETING_TABLE_ID}/fields`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Changes Made Today", type: "multilineText" }),
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: "Field create failed", detail: data }, { status: res.status });
  return NextResponse.json({ ok: true, field: data });
}
