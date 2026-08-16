// Temporary: dump today's Leads records to diagnose an undercount report.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

function nyTodayISO() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  const today = nyTodayISO();
  const formula = `IS_SAME({Created At},"${today}","day")`;
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
  const paid = records.filter((r: { Source?: string }) => r.Source === "Paid");
  return NextResponse.json({ today, totalRecordsToday: records.length, paidCount: paid.length, paidRecords: paid });
}
