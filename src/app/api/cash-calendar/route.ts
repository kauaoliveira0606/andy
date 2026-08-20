// Per-day cash collected for a given month, read from Marketing Daily
// Metrics (the daily marketing submissions form), for the calendar view on
// the Overview tab. Days with no Airtable submission (the marketing-sync
// automation has dropped submissions before) fall back to the Andy
// Scorecard Google Sheet, which the submission still reaches on the days
// the sync ran — same "Cash Collected - Low ticket" row, just already
// written into the weekly tab.
import { NextRequest, NextResponse } from "next/server";
import { getGoogleAccessToken, sheetsFetch, colLetter, nyToday, findTodayTabAndColumn, fetchRowLabelMap, normalizeLabel } from "../_lib/googleSheets";

export const maxDuration = 60;

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE"; // Andy - EcomSimulation
const MARKETING_TABLE_ID = "tblRdiOjEHQgth0TN"; // Marketing Daily Metrics
const CASH_ROW_LABEL = "Cash Collected - Low ticket";

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
    const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${MARKETING_TABLE_ID}?${params.toString()}`, {
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
      const cash = parseNum(f["Cash Collected - Low ticket"]);
      byDay[day] = (byDay[day] || 0) + cash;
    }

    // Backfill only the days Airtable has no submission for at all — never
    // overwrite a real (even zero) Airtable value, and never reach into the
    // future.
    const today = nyToday();
    const lastDayToCheck = new Date(Math.min(end.getTime(), today.getTime()));
    const missingDays: Date[] = [];
    for (let d = new Date(start); d <= lastDayToCheck; d.setDate(d.getDate() + 1)) {
      if (!(isoDate(d) in byDay)) missingDays.push(new Date(d));
    }

    if (missingDays.length > 0 && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        const accessToken = await getGoogleAccessToken();
        for (const day of missingDays) {
          const target = await findTodayTabAndColumn(accessToken, day);
          if (!target) continue;
          const rowMap = await fetchRowLabelMap(accessToken, target.title);
          const row = rowMap[normalizeLabel(CASH_ROW_LABEL)];
          if (!row) continue;
          const col = colLetter(target.col);
          const sheetName = target.title.replace(/'/g, "''");
          const res = await sheetsFetch(accessToken, `/values/${encodeURIComponent(`'${sheetName}'!${col}${row}`)}`);
          const raw = res.values?.[0]?.[0];
          if (raw === undefined) continue;
          byDay[isoDate(day)] = parseNum(raw);
        }
      } catch {
        // Sheet fallback is best-effort — missing days just stay absent (rendered as $0) if it fails.
      }
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
