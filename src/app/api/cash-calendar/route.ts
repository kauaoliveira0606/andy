// Per-day cash collected for a given month, read from Affiliate EOD, for
// the calendar view on the Overview tab.
import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE"; // Andy - EcomSimulation
const AIRTABLE_TABLE = "Affiliate EOD";

function parseNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const n = parseFloat(v.replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function fetchAllRecords(formula: string) {
  const records: Record<string, unknown>[] = [];
  let offset: string | undefined;
  do {
    const params = new URLSearchParams({ pageSize: "100", filterByFormula: formula });
    if (offset) params.set("offset", offset);
    const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    records.push(...(data.records || []).map((r: { fields: Record<string, unknown> }) => r.fields));
    offset = data.offset;
  } while (offset);
  return records;
}

export async function GET(req: NextRequest) {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }

  const year = parseInt(req.nextUrl.searchParams.get("year") || "", 10);
  const month = parseInt(req.nextUrl.searchParams.get("month") || "", 10); // 1-12
  if (!year || !month || month < 1 || month > 12) {
    return NextResponse.json({ error: "year and month (1-12) query params are required" }, { status: 400 });
  }

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0); // last day of the month

  try {
    const formula = `AND(OR(IS_SAME({Date},"${isoDate(start)}","day"), IS_AFTER({Date},"${isoDate(start)}")), OR(IS_SAME({Date},"${isoDate(end)}","day"), IS_BEFORE({Date},"${isoDate(end)}")))`;
    const records = await fetchAllRecords(formula);

    const byDay: Record<string, number> = {};
    for (const f of records) {
      const rawDate = f["Date"] as string | undefined;
      if (!rawDate) continue;
      const day = rawDate.slice(0, 10);
      const cash = parseNum(f["Cash collected high ticket"]) + parseNum(f["Cash collected low ticket"]);
      byDay[day] = (byDay[day] || 0) + cash;
    }

    return NextResponse.json({
      year,
      month,
      daysInMonth: end.getDate(),
      byDay,
      monthTotal: Object.values(byDay).reduce((a, b) => a + b, 0),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach Airtable", detail: String(err) }, { status: 502 });
  }
}
