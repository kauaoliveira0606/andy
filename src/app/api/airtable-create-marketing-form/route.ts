// One-time setup: attempts to create a Form view on the Marketing Daily
// Metrics table via the Airtable Meta API. Airtable's public API has
// historically not supported creating Form-type views programmatically —
// this either works or returns a clear error we can report back.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const TABLE_ID = "tblRdiOjEHQgth0TN"; // Marketing Daily Metrics

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables/${TABLE_ID}/views`, {
      method: "POST",
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Daily Submission Form", type: "form" }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "Form view creation failed", status: res.status, detail: data }, { status: res.status });
    }
    return NextResponse.json({ ok: true, view: data });
  } catch (err) {
    return NextResponse.json({ error: "Failed", detail: String(err) }, { status: 502 });
  }
}
