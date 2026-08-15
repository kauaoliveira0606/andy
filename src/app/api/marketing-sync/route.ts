// Pushes today's "Marketing Daily Metrics" Airtable submission into the
// matching cells of the current week's tab in the Andy Scorecard Google
// Sheet. Fully dynamic — every Airtable field (other than Date) is matched
// by name against column A's row labels in the sheet, so adding a new
// metric only requires adding a same-named field in Airtable and a
// same-named row in the sheet. No code change needed either side.
import { NextResponse } from "next/server";
import {
  getGoogleAccessToken,
  sheetsFetch,
  colLetter,
  nyToday,
  isoDate,
  findTodayTabAndColumn,
  fetchRowLabelMap,
  normalizeLabel,
} from "../_lib/googleSheets";

export const maxDuration = 60;

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE"; // Andy - EcomSimulation
const TABLE_ID = "tblRdiOjEHQgth0TN"; // Marketing Daily Metrics
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

type AirtableFieldMeta = { name: string; type: string };

async function fetchTableFieldMeta(): Promise<AirtableFieldMeta[]> {
  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Airtable meta fetch failed: ${res.status} ${JSON.stringify(data)}`);
  const table = (data.tables || []).find((t: { id: string }) => t.id === TABLE_ID);
  if (!table) throw new Error(`Table ${TABLE_ID} not found in base`);
  return table.fields as AirtableFieldMeta[];
}

async function fetchTodaysMarketingRecord(today: Date): Promise<Record<string, unknown> | null> {
  const formula = `IS_SAME({Date},"${isoDate(today)}","day")`;
  const params = new URLSearchParams({ pageSize: "1", filterByFormula: formula, "sort[0][field]": "Date", "sort[0][direction]": "desc" });
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE_ID}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  const record = (data.records || [])[0];
  return record ? record.fields : null;
}

/** Formats an Airtable field value the way a human would type it into Sheets, so USER_ENTERED parses it correctly (e.g. percent -> "42.00%"). */
function formatForSheet(value: unknown, fieldType: string): string | number | null {
  if (value === undefined || value === null || value === "") return null;
  if (fieldType === "percent") {
    const n = Number(value);
    if (isNaN(n)) return null;
    return `${(n * 100).toFixed(2)}%`;
  }
  if (fieldType === "currency" || fieldType === "number") {
    const n = Number(value);
    return isNaN(n) ? null : n;
  }
  return String(value);
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

    const [fieldMeta, record] = await Promise.all([fetchTableFieldMeta(), fetchTodaysMarketingRecord(today)]);

    if (!record) {
      return NextResponse.json({ ok: true, skipped: true, reason: `No Marketing Daily Metrics submission for ${isoDate(today)} yet.` });
    }

    const accessToken = await getGoogleAccessToken();
    const target = await findTodayTabAndColumn(accessToken, today);
    if (!target) {
      return NextResponse.json(
        { error: `No tab found with a column for today (${isoDate(today)}). Check the current week's tab exists and dates are filled in.` },
        { status: 404 }
      );
    }

    const rowMap = await fetchRowLabelMap(accessToken, target.title);
    const col = colLetter(target.col);
    const sheetName = target.title.replace(/'/g, "''");

    const writes: { range: string; values: (string | number)[][] }[] = [];
    const matched: Record<string, string | number> = {};
    const unmatchedFields: string[] = [];

    for (const field of fieldMeta) {
      if (field.name === "Date") continue;
      const raw = record[field.name];
      const formatted = formatForSheet(raw, field.type);
      if (formatted === null) continue; // field wasn't filled in on this submission

      const row = rowMap[normalizeLabel(field.name)];
      if (!row) {
        unmatchedFields.push(field.name);
        continue;
      }
      writes.push({ range: `'${sheetName}'!${col}${row}`, values: [[formatted]] });
      matched[field.name] = formatted;
    }

    if (writes.length) {
      await sheetsFetch(accessToken, "/values:batchUpdate", {
        method: "POST",
        body: JSON.stringify({ valueInputOption: "USER_ENTERED", data: writes }),
      });
    }

    return NextResponse.json({
      ok: true,
      date: isoDate(today),
      tab: target.title,
      column: col,
      written: matched,
      unmatchedFields, // fields on the Airtable form with no matching row label in the sheet — add a row with this exact name to pick it up
    });
  } catch (err) {
    return NextResponse.json({ error: "Sync failed", detail: String(err) }, { status: 502 });
  }
}

export async function GET() {
  return POST();
}
