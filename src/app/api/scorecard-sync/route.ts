// Pushes today's Dials / Sales - Low Ticket / Cash Collected - Low ticket
// totals (summed across all reps' Airtable EOD submissions for today) into
// the correct cells of the current week's tab in the Andy Scorecard Google
// Sheet. Triggered by an Airtable Automation webhook on every EOD submission
// — safe to call repeatedly, it always recomputes today's totals fresh
// rather than incrementing, so duplicate/late calls can't double-count.
import { NextResponse } from "next/server";
import { getGoogleAccessToken, sheetsFetch, colLetter, nyToday, isoDate, findTodayTabAndColumn } from "../_lib/googleSheets";

export const maxDuration = 60;

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE"; // Andy - EcomSimulation
const AIRTABLE_TABLE = "Affiliate EOD";
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

// Fixed row numbers in every weekly tab (confirmed against the sheet layout).
const ROW_DIALS = 14;
const ROW_SALES_LOW_TICKET = 16;
const ROW_CASH_COLLECTED_LOW_TICKET = 17;

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

async function fetchTodaysAirtableTotals(today: Date) {
  const formula = `IS_SAME({Date},"${isoDate(today)}","day")`;
  const records: Record<string, unknown>[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100", filterByFormula: formula });
    if (offset) params.set("offset", offset);
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}?${params.toString()}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }, cache: "no-store" }
    );
    const data = await res.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    records.push(...(data.records || []).map((r: { fields: Record<string, unknown> }) => r.fields));
    offset = data.offset;
  } while (offset);

  let dials = 0;
  let salesLowTicket = 0;
  let cashCollectedLowTicket = 0;
  for (const f of records) {
    dials += parseNum(f["Outbound dials"]);
    salesLowTicket += parseNum(f["software closed"]);
    cashCollectedLowTicket += parseNum(f["Cash collected low ticket"]);
  }
  return { dials, salesLowTicket, cashCollectedLowTicket, recordCount: records.length };
}

export async function POST() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
    return NextResponse.json({ error: "GOOGLE_SERVICE_ACCOUNT_KEY not set" }, { status: 500 });
  }

  try {
    const today = nyToday();
    const accessToken = await getGoogleAccessToken();
    const target = await findTodayTabAndColumn(accessToken, today);

    if (!target) {
      return NextResponse.json(
        { error: `No tab found with a column for today (${isoDate(today)}). Check the current week's tab exists and dates are filled in.` },
        { status: 404 }
      );
    }

    const totals = await fetchTodaysAirtableTotals(today);
    const col = colLetter(target.col);
    const sheetName = target.title.replace(/'/g, "''");

    await sheetsFetch(accessToken, "/values:batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        valueInputOption: "RAW",
        data: [
          { range: `'${sheetName}'!${col}${ROW_DIALS}`, values: [[totals.dials]] },
          { range: `'${sheetName}'!${col}${ROW_SALES_LOW_TICKET}`, values: [[totals.salesLowTicket]] },
          { range: `'${sheetName}'!${col}${ROW_CASH_COLLECTED_LOW_TICKET}`, values: [[totals.cashCollectedLowTicket]] },
        ],
      }),
    });

    return NextResponse.json({
      ok: true,
      date: isoDate(today),
      tab: target.title,
      column: col,
      recordCount: totals.recordCount,
      written: {
        dials: totals.dials,
        salesLowTicket: totals.salesLowTicket,
        cashCollectedLowTicket: totals.cashCollectedLowTicket,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Sync failed", detail: String(err) }, { status: 502 });
  }
}

// Convenience for manual testing from a browser — same behavior as POST.
export async function GET() {
  return POST();
}
