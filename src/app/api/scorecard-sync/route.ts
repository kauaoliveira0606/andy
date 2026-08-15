// Pushes today's Dials / Sales - Low Ticket / Cash Collected - Low ticket
// totals (summed across all reps' Airtable EOD submissions for today) into
// the correct cells of the current week's tab in the Andy Scorecard Google
// Sheet. Triggered by an Airtable Automation webhook on every EOD submission
// — safe to call repeatedly, it always recomputes today's totals fresh
// rather than incrementing, so duplicate/late calls can't double-count.
import { NextResponse } from "next/server";
import crypto from "crypto";

export const maxDuration = 60;

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE"; // Andy - EcomSimulation
const AIRTABLE_TABLE = "Affiliate EOD";

const SHEET_ID = "1boFzY7vi2ZMBZSjj9juJXWZwLKdtP1xH55DnnACjTJU";
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

const MONTHS_ARR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_IDX: Record<string, number> = Object.fromEntries(MONTHS_ARR.map((m, i) => [m, i]));

// Fixed row numbers in every weekly tab (confirmed against the sheet layout).
const ROW_DIALS = 14;
const ROW_SALES_LOW_TICKET = 16;
const ROW_CASH_COLLECTED_LOW_TICKET = 17;

function base64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getGoogleAccessToken(): Promise<string> {
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");
  const creds = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY) as { client_email: string; private_key: string };

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: creds.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto.createSign("RSA-SHA256").update(signingInput).sign(creds.private_key);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${JSON.stringify(data)}`);
  return data.access_token;
}

async function sheetsFetch(accessToken: string, path: string, init?: RequestInit) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Sheets API ${path} failed: ${res.status} ${JSON.stringify(data)}`);
  return data;
}

function parseSheetDate(s: string | undefined, refYear: number): Date | null {
  const m = (s || "").trim().match(/^([A-Za-z]+)-(\d+)$/);
  if (!m) return null;
  const mo = MONTHS_IDX[m[1]];
  if (mo === undefined) return null;
  return new Date(refYear, mo, parseInt(m[2], 10));
}

function colLetter(index0: number): string {
  // 0 -> A, 1 -> B, ...
  let n = index0 + 1;
  let s = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function nyToday(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .split("-")
    .map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
    dials += Number(f["Outbound dials"]) || 0;
    salesLowTicket += Number(f["software closed"]) || 0;
    cashCollectedLowTicket += Number(f["Cash collected low ticket"]) || 0;
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

    const meta = await sheetsFetch(accessToken, "?fields=sheets.properties.title");
    const titles: string[] = (meta.sheets || []).map((s: { properties: { title: string } }) => s.properties.title);

    // Find the tab whose date row actually contains today — read each
    // candidate tab's header rows rather than guessing the title format,
    // since tab names have proven inconsistent (see 8/9-8/15 rename fix).
    let targetTitle: string | null = null;
    let targetCol: number | null = null;

    for (const title of titles) {
      const range = `'${title.replace(/'/g, "''")}'!A1:Z3`;
      let values: string[][];
      try {
        const res = await sheetsFetch(accessToken, `/values/${encodeURIComponent(range)}`);
        values = res.values || [];
      } catch {
        continue;
      }
      const dateRow = values[1] || [];
      for (let c = 1; c < dateRow.length; c++) {
        const d = parseSheetDate(dateRow[c], today.getFullYear());
        if (d && d.getTime() === today.getTime()) {
          targetTitle = title;
          targetCol = c;
          break;
        }
      }
      if (targetTitle) break;
    }

    if (!targetTitle || targetCol === null) {
      return NextResponse.json(
        { error: `No tab found with a column for today (${isoDate(today)}). Check the current week's tab exists and dates are filled in.` },
        { status: 404 }
      );
    }

    const totals = await fetchTodaysAirtableTotals(today);
    const col = colLetter(targetCol);
    const sheetName = targetTitle.replace(/'/g, "''");

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
      tab: targetTitle,
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
