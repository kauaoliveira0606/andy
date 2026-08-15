// One-time setup endpoint: creates the "Marketing Daily Metrics" table in
// the Airtable base via the Meta API. Safe to call more than once — Airtable
// will just error "table already exists" rather than duplicate it. Delete
// this route once the table has been created.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }

  const body = {
    name: "Marketing Daily Metrics",
    fields: [
      { name: "Date", type: "date", options: { dateFormat: { name: "local" } } },
      { name: "Ad Spend Meta", type: "currency", options: { precision: 2, symbol: "$" } },
      { name: "Cost per Lead (Meta)", type: "currency", options: { precision: 2, symbol: "$" } },
      { name: "Landing Page Connect Rate", type: "percent", options: { precision: 2 } },
      { name: "Opt ins (Paid)", type: "number", options: { precision: 0 } },
      { name: "Opt ins (Organic)", type: "number", options: { precision: 0 } },
      { name: "Opt in rate (opt ins vs views)", type: "percent", options: { precision: 2 } },
      { name: "VSL Views", type: "number", options: { precision: 0 } },
      { name: "VSL Play Rate", type: "percent", options: { precision: 2 } },
      { name: "VSL Engagement Rate", type: "percent", options: { precision: 2 } },
      { name: "Confirmation Email open rate", type: "percent", options: { precision: 2 } },
      { name: "Connection rate (Pick ups vs opt ins)", type: "percent", options: { precision: 2 } },
      { name: "Close rate - Low ticket", type: "percent", options: { precision: 2 } },
      { name: "Funnel Conversion rate (Lt Sales/opt ins)", type: "percent", options: { precision: 2 } },
    ],
  };

  try {
    const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables`, {
      method: "POST",
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "Airtable table creation failed", status: res.status, detail: data }, { status: res.status });
    }
    return NextResponse.json({ ok: true, table: data });
  } catch (err) {
    return NextResponse.json({ error: "Failed", detail: String(err) }, { status: 502 });
  }
}
