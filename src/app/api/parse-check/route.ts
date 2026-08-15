// Temporary: verifies parseNum is deployed and behaving correctly against
// Ewan's actual raw record.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const AIRTABLE_TABLE = "Affiliate EOD";

function parseNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const cleaned = v.replace(/[^0-9.-]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}?pageSize=100`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  const ewanRecords = (data.records || []).filter((r: { fields: Record<string, unknown> }) =>
    String(r.fields["Your name"] || "").toLowerCase().includes("ewan")
  );

  return NextResponse.json({
    version: "parseNum-check-v1",
    records: ewanRecords.map((r: { id: string; fields: Record<string, unknown> }) => ({
      id: r.id,
      rawCashLow: r.fields["Cash collected low ticket"],
      parsedCashLow: parseNum(r.fields["Cash collected low ticket"]),
      rawCashHigh: r.fields["Cash collected high ticket"],
      parsedCashHigh: parseNum(r.fields["Cash collected high ticket"]),
    })),
  });
}
