// One-time: adds a "Cash Collected" currency field to the Leads table.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });

  const metaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const meta = await metaRes.json();
  const leadsTable = (meta.tables || []).find((t: { name: string }) => t.name === "Leads");
  if (!leadsTable) return NextResponse.json({ error: "Leads table not found" }, { status: 404 });

  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables/${leadsTable.id}/fields`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Cash Collected", type: "currency", options: { precision: 2, symbol: "$" } }),
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: "Field create failed", detail: data }, { status: res.status });
  return NextResponse.json({ ok: true, field: data });
}
