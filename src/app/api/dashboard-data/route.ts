import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE"; // Andy - EcomSimulation
const AIRTABLE_TABLE = "Affiliate EOD";
const MARKETING_TABLE_ID = "tblRdiOjEHQgth0TN"; // Marketing Daily Metrics

// Airtable field names as they exist in the base today.
export const NUMERIC_FIELDS = [
  "Cash collected high ticket",
  "Cash collected low ticket",
  "revenue high ticket",
  "Outbound dials",
  "Pick ups",
  "total talk time",
  "calls showed",
  "calls on the calendar",
  "cancelled calls",
  "new high ticket calls booked",
  "high ticket call pitched",
  "Software pitched",
  "software closed",
  "set closed",
  "How many monthly plans",
  "How many yearly plans",
] as const;

// Several Airtable fields we read are plain text, not numbers — a rep
// typing "$350" instead of "350" made Number() return NaN, which silently
// fell back to 0. Strip currency/formatting characters before parsing.
function parseNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const cleaned = v.replace(/[^0-9.-]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function nyTodayISO() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Builds an Airtable filterByFormula for the requested range. Empty string means no filter (all time). */
function rangeFormula(range: string, customStart?: string | null, customEnd?: string | null): string {
  const [y, m, d] = nyTodayISO().split("-").map(Number);
  const today = new Date(y, m - 1, d);

  if (range === "today") {
    return `IS_SAME({Date},"${isoDate(today)}","day")`;
  }
  if (range === "yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return `IS_SAME({Date},"${isoDate(yesterday)}","day")`;
  }
  if (range === "all") {
    return "";
  }
  if (range === "custom" && customStart && customEnd) {
    return `AND(OR(IS_SAME({Date},"${customStart}","day"), IS_AFTER({Date},"${customStart}")), OR(IS_SAME({Date},"${customEnd}","day"), IS_BEFORE({Date},"${customEnd}")))`;
  }

  const start = new Date(today);
  if (range === "week") start.setDate(today.getDate() - today.getDay());
  else if (range === "7d") start.setDate(today.getDate() - 6);
  else if (range === "30d") start.setDate(today.getDate() - 29);
  else start.setDate(today.getDate() - today.getDay()); // default: this week

  const startIso = isoDate(start);
  return `OR(IS_SAME({Date},"${startIso}","day"), IS_AFTER({Date},"${startIso}"))`;
}

async function fetchAllRecords(tableIdOrName: string, formula: string) {
  const records: Record<string, unknown>[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (formula) params.set("filterByFormula", formula);
    if (offset) params.set("offset", offset);

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(tableIdOrName)}?${params.toString()}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }, cache: "no-store" }
    );
    const data = await res.json();
    if (data.error) throw new Error(JSON.stringify(data.error));

    records.push(...(data.records || []).map((r: { fields: Record<string, unknown> }) => r.fields));
    offset = data.offset;
  } while (offset);

  return records;
}

/** Sums Opt-ins (Paid/Organic) from Marketing Daily Metrics for the same date range. */
async function fetchMarketingTotals(formula: string) {
  const records = await fetchAllRecords(MARKETING_TABLE_ID, formula);
  let optInsPaid = 0;
  let optInsOrganic = 0;
  let adSpend = 0;
  for (const f of records) {
    optInsPaid += parseNum(f["Opt ins (Paid)"]);
    optInsOrganic += parseNum(f["Opt ins (Organic)"]);
    adSpend += parseNum(f["Ad Spend Meta"]);
  }
  return { optInsPaid, optInsOrganic, adSpend };
}

type RepRow = { name: string } & Record<string, number>;

export async function GET(req: NextRequest) {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }

  const range = req.nextUrl.searchParams.get("range") || "week";
  const customStart = req.nextUrl.searchParams.get("start");
  const customEnd = req.nextUrl.searchParams.get("end");

  try {
    const formula = rangeFormula(range, customStart, customEnd);
    const [records, marketingTotals] = await Promise.all([
      fetchAllRecords(AIRTABLE_TABLE, formula),
      fetchMarketingTotals(formula),
    ]);

    const totals: Record<string, number> = {};
    NUMERIC_FIELDS.forEach((f) => (totals[f] = 0));
    totals["Opt ins (Paid)"] = marketingTotals.optInsPaid;
    totals["Opt ins (Organic)"] = marketingTotals.optInsOrganic;
    totals["Ad Spend Meta"] = marketingTotals.adSpend;

    const repMap: Record<string, RepRow> = {};

    for (const f of records) {
      const name = (f["Your name"] as string) || "Unknown";
      if (!repMap[name]) {
        repMap[name] = { name } as RepRow;
        NUMERIC_FIELDS.forEach((field) => (repMap[name][field] = 0));
      }
      for (const field of NUMERIC_FIELDS) {
        const v = parseNum(f[field]);
        totals[field] += v;
        repMap[name][field] += v;
      }
    }

    return NextResponse.json({
      range,
      recordCount: records.length,
      totals,
      reps: Object.values(repMap).sort((a, b) => b["software closed"] - a["software closed"]),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach Airtable", detail: String(err) }, { status: 502 });
  }
}
