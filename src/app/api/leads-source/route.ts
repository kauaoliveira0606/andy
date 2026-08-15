// Paid vs Organic lead counts for the Overview tab, read from the Leads
// table (fed by the two webhook endpoints, source hardcoded at intake —
// see _lib/leadsIntake.ts). Also surfaces the manually-typed Opt-ins
// numbers from Marketing Daily Metrics for the same range side by side, so
// a drift between "what was actually tracked" and "what someone typed in"
// is visible immediately instead of silently compounding.
import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const LEADS_TABLE = "Leads";
const MARKETING_TABLE_ID = "tblRdiOjEHQgth0TN";

function nyTodayISO() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function rangeFormula(dateField: string, range: string): string {
  const [y, m, d] = nyTodayISO().split("-").map(Number);
  const today = new Date(y, m - 1, d);

  if (range === "today") return `IS_SAME({${dateField}},"${isoDate(today)}","day")`;
  if (range === "yesterday") {
    const yest = new Date(today);
    yest.setDate(today.getDate() - 1);
    return `IS_SAME({${dateField}},"${isoDate(yest)}","day")`;
  }
  if (range === "all") return "";

  const start = new Date(today);
  if (range === "7d") start.setDate(today.getDate() - 6);
  else if (range === "30d") start.setDate(today.getDate() - 29);
  else start.setDate(today.getDate() - today.getDay()); // week / default

  const startIso = isoDate(start);
  return `OR(IS_SAME({${dateField}},"${startIso}","day"), IS_AFTER({${dateField}},"${startIso}"))`;
}

async function fetchAllRecords(tableIdOrName: string, formula: string) {
  const records: Record<string, unknown>[] = [];
  let offset: string | undefined;
  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (formula) params.set("filterByFormula", formula);
    if (offset) params.set("offset", offset);
    const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(tableIdOrName)}?${params.toString()}`, {
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

function parseNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const n = parseFloat(v.replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
}

export async function GET(req: NextRequest) {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }
  const range = req.nextUrl.searchParams.get("range") || "today";

  try {
    const [leadRecords, marketingRecords] = await Promise.all([
      fetchAllRecords(LEADS_TABLE, rangeFormula("Created At", range)),
      fetchAllRecords(MARKETING_TABLE_ID, rangeFormula("Date", range)),
    ]);

    let paid = 0;
    let organic = 0;
    let unlabeled = 0;
    for (const r of leadRecords) {
      const source = r["Source"];
      if (source === "Paid") paid += 1;
      else if (source === "Organic") organic += 1;
      else unlabeled += 1;
    }

    let manualPaid = 0;
    let manualOrganic = 0;
    for (const r of marketingRecords) {
      manualPaid += parseNum(r["Opt ins (Paid)"]);
      manualOrganic += parseNum(r["Opt ins (Organic)"]);
    }

    return NextResponse.json({
      range,
      tracked: { paid, organic, unlabeled, total: leadRecords.length },
      manualEntry: { paid: manualPaid, organic: manualOrganic },
      mismatch: { paid: manualPaid - paid, organic: manualOrganic - organic },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach Airtable", detail: String(err) }, { status: 502 });
  }
}
