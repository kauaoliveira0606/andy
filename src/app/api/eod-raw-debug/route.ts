// Temporary: dumps raw Affiliate EOD records for a given rep name so we can
// see the literal stored string value of the cash fields (not our parsed
// number), to check for non-numeric characters breaking Number() parsing.
import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const AIRTABLE_TABLE = "Affiliate EOD";

export async function GET(req: NextRequest) {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  const nameFilter = req.nextUrl.searchParams.get("name") || "";

  const params = new URLSearchParams({ pageSize: "100" });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });

  const records = (data.records || [])
    .map((r: { id: string; fields: Record<string, unknown> }) => ({ id: r.id, fields: r.fields }))
    .filter((r: { fields: Record<string, unknown> }) => {
      const name = String(r.fields["Your name"] || "").toLowerCase();
      return !nameFilter || name.includes(nameFilter.toLowerCase());
    });

  return NextResponse.json({ count: records.length, records });
}
