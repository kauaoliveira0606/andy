// Last 3 days of Marketing Daily Metrics, each paired with whatever note
// was logged in "Changes Made Today" — lets the Overview tab show "here's
// what I changed, here's what happened to the numbers" side by side.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const MARKETING_TABLE_ID = "tblRdiOjEHQgth0TN";

const METRIC_FIELDS = [
  "Ad Spend Meta",
  "Cost per Lead (Meta)",
  "Landing Page Connect Rate",
  "Opt ins (Paid)",
  "Opt ins (Organic)",
  "Opt in rate (opt ins vs views)",
  "VSL Views",
  "VSL Play Rate",
  "VSL Engagement Rate",
  "Confirmation Email open rate",
  "Dials",
  "Connection rate (Pick ups vs opt ins)",
  "Sales - Low Ticket",
  "Cash Collected - Low ticket",
  "Close rate - Low ticket",
  "Funnel Conversion rate (Lt Sales/opt ins)",
] as const;

function nyDateParts(offsetDays: number) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date())
    .split("-")
    .map(Number);
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseNum(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (typeof v !== "string" || !v.trim()) return null;
  const n = parseFloat(v.replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? null : n;
}

async function fetchDay(dateStr: string) {
  const formula = `IS_SAME({Date},"${dateStr}","day")`;
  const params = new URLSearchParams({ pageSize: "1", filterByFormula: formula });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${MARKETING_TABLE_ID}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  const record = (data.records || [])[0];
  const fields = record?.fields || {};

  const metrics: Record<string, number | null> = {};
  for (const f of METRIC_FIELDS) metrics[f] = parseNum(fields[f]);

  return {
    date: dateStr,
    hasSubmission: !!record,
    notes: (fields["Changes Made Today"] as string) || "",
    metrics,
  };
}

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }
  try {
    const dates = [nyDateParts(0), nyDateParts(-1), nyDateParts(-2)];
    const days = await Promise.all(dates.map(fetchDay));
    return NextResponse.json({ days });
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach Airtable", detail: String(err) }, { status: 502 });
  }
}
