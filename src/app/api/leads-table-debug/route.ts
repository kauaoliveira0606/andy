// Temporary: dump yesterday's Leads records to diagnose an undercount report.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

function nyDateParts(offsetDays: number) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date())
    .split("-")
    .map(Number);
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  const yesterday = nyDateParts(-1);
  const formula = `IS_SAME({Created At},"${yesterday}","day")`;
  const params = new URLSearchParams({ pageSize: "100", filterByFormula: formula });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent("Leads")}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  const records = (data.records || []).map((r: { id: string; createdTime: string; fields: Record<string, unknown> }) => ({
    id: r.id,
    createdTime: r.createdTime,
    ...r.fields,
  }));
  return NextResponse.json({ yesterday, totalRecords: records.length, records });
}
