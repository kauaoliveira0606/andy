// Shared Google Sheets write helpers (service-account JWT auth, no external
// deps) used by both scorecard-sync and marketing-sync.
import crypto from "crypto";

const SHEET_ID = "1boFzY7vi2ZMBZSjj9juJXWZwLKdtP1xH55DnnACjTJU";
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

const MONTHS_ARR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_IDX: Record<string, number> = Object.fromEntries(MONTHS_ARR.map((m, i) => [m, i]));

function base64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function getGoogleAccessToken(): Promise<string> {
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
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${JSON.stringify(data)}`);
  return data.access_token;
}

export async function sheetsFetch(accessToken: string, path: string, init?: RequestInit) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Sheets API ${path} failed: ${res.status} ${JSON.stringify(data)}`);
  return data;
}

export function parseSheetDate(s: string | undefined, refYear: number): Date | null {
  const m = (s || "").trim().match(/^([A-Za-z]+)-(\d+)$/);
  if (!m) return null;
  const mo = MONTHS_IDX[m[1]];
  if (mo === undefined) return null;
  return new Date(refYear, mo, parseInt(m[2], 10));
}

export function colLetter(index0: number): string {
  let n = index0 + 1;
  let s = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

export function nyToday(): Date {
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

export function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Finds the weekly tab + column whose date row matches `today`. */
export async function findTodayTabAndColumn(
  accessToken: string,
  today: Date
): Promise<{ title: string; col: number } | null> {
  const meta = await sheetsFetch(accessToken, "?fields=sheets.properties.title");
  const titles: string[] = (meta.sheets || []).map((s: { properties: { title: string } }) => s.properties.title);

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
        return { title, col: c };
      }
    }
  }
  return null;
}

/** All tabs with their sheetId/title/index, plus the date range found in each one's row 2 (cols B-H). */
export async function listTabsWithDateRanges(
  accessToken: string
): Promise<{ sheetId: number; title: string; index: number; dates: Date[] }[]> {
  const meta = await sheetsFetch(accessToken, "?fields=sheets.properties");
  const props: { sheetId: number; title: string; index: number }[] = (meta.sheets || []).map(
    (s: { properties: { sheetId: number; title: string; index: number } }) => s.properties
  );

  const out: { sheetId: number; title: string; index: number; dates: Date[] }[] = [];
  for (const p of props) {
    const range = `'${p.title.replace(/'/g, "''")}'!A1:Z3`;
    let values: string[][];
    try {
      const res = await sheetsFetch(accessToken, `/values/${encodeURIComponent(range)}`);
      values = res.values || [];
    } catch {
      out.push({ ...p, dates: [] });
      continue;
    }
    const dateRow = values[1] || [];
    const dates: Date[] = [];
    // A tab's dates could span a year boundary in theory; use the current
    // year as a base guess since these are always near-term weekly tabs.
    const refYear = new Date().getFullYear();
    for (let c = 1; c < dateRow.length; c++) {
      const d = parseSheetDate(dateRow[c], refYear);
      if (d) dates.push(d);
    }
    out.push({ ...p, dates });
  }
  return out;
}

export function fmtSheetDate(d: Date): string {
  return `${MONTHS_ARR[d.getMonth()]}-${d.getDate()}`;
}

export function fmtTabTitle(start: Date, end: Date): string {
  return `${start.getMonth() + 1}/${start.getDate()}-${end.getMonth() + 1}/${end.getDate()}`;
}

/** Duplicates a sheet tab and renames the copy. Returns the new sheet's sheetId. */
export async function duplicateTab(accessToken: string, sourceSheetId: number, newTitle: string): Promise<number> {
  const res = await sheetsFetch(accessToken, ":batchUpdate", {
    method: "POST",
    body: JSON.stringify({
      requests: [
        {
          duplicateSheet: {
            sourceSheetId,
            insertSheetIndex: 9999,
            newSheetName: newTitle,
          },
        },
      ],
    }),
  });
  return res.replies[0].duplicateSheet.properties.sheetId;
}

export function normalizeLabel(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Reads column A of a tab and returns a normalized-label -> row-number map. */
export async function fetchRowLabelMap(accessToken: string, title: string): Promise<Record<string, number>> {
  const range = `'${title.replace(/'/g, "''")}'!A1:A60`;
  const res = await sheetsFetch(accessToken, `/values/${encodeURIComponent(range)}`);
  const values: string[][] = res.values || [];
  const map: Record<string, number> = {};
  values.forEach((row, i) => {
    const label = (row[0] || "").trim();
    if (label) map[normalizeLabel(label)] = i + 1; // 1-indexed row number
  });
  return map;
}
