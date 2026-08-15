// Temporary: lists the most recent records in Marketing Daily Metrics
// (all fields) so we can see exactly what Date value got saved.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const TABLE_ID = "tblRdiOjEHQgth0TN";

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }
  const params = new URLSearchParams({ pageSize: "10", "sort[0][field]": "Date", "sort[0][direction]": "desc" });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE_ID}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: "Airtable fetch failed", detail: data }, { status: res.status });
  return NextResponse.json({
    records: (data.records || []).map((r: { id: string; fields: Record<string, unknown> }) => ({ id: r.id, fields: r.fields })),
  });
}
