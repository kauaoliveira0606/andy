// One-time: adds Dials / Sales - Low Ticket / Cash Collected - Low ticket
// fields to the Marketing Daily Metrics table, now that this one form covers
// every scorecard metric directly rather than pulling those three from
// aggregated rep EOD data. Delete this route once run.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const TABLE_ID = "tblRdiOjEHQgth0TN"; // Marketing Daily Metrics

const FIELDS_TO_ADD = [
  { name: "Dials", type: "number", options: { precision: 0 } },
  { name: "Sales - Low Ticket", type: "number", options: { precision: 0 } },
  { name: "Cash Collected - Low ticket", type: "currency", options: { precision: 2, symbol: "$" } },
];

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }

  const results: unknown[] = [];
  for (const field of FIELDS_TO_ADD) {
    try {
      const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables/${TABLE_ID}/fields`, {
        method: "POST",
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(field),
      });
      const data = await res.json();
      results.push(res.ok ? { ok: true, field: data } : { ok: false, status: res.status, detail: data });
    } catch (e) {
      results.push({ ok: false, error: String(e) });
    }
  }

  return NextResponse.json({ results });
}
