// Temporary: dump Organic leads for today and yesterday to diagnose the
// organic tracked-vs-manual mismatch.
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

async function fetchDay(dateStr: string) {
  const formula = `IS_SAME({Created At},"${dateStr}","day")`;
  const params = new URLSearchParams({ pageSize: "100", filterByFormula: formula });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent("Leads")}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  return (data.records || []).map((r: { id: string; createdTime: string; fields: Record<string, unknown> }) => ({
    id: r.id,
    createdTime: r.createdTime,
    ...r.fields,
  }));
}

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  const yesterday = nyDateParts(-1);
  const today = nyDateParts(0);
  const [yestRecords, todayRecords] = await Promise.all([fetchDay(yesterday), fetchDay(today)]);
  return NextResponse.json({
    yesterday,
    today,
    yesterdayOrganic: yestRecords.filter((r: { Source?: string }) => r.Source === "Organic"),
    todayOrganic: todayRecords.filter((r: { Source?: string }) => r.Source === "Organic"),
    yesterdayAll: yestRecords,
  });
}
