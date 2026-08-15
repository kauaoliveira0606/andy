// Temporary: inspect the current "Leads" table's schema + sample records to
// understand what's already there before designing the paid/organic
// attribution system on top of it.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });

  const metaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    cache: "no-store",
  });
  const meta = await metaRes.json();
  const leadsTable = (meta.tables || []).find((t: { name: string }) => t.name === "Leads");

  let records: unknown[] = [];
  if (leadsTable) {
    const recRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent("Leads")}?pageSize=20&sort[0][field]=Created At&sort[0][direction]=desc`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }, cache: "no-store" }
    );
    const recData = await recRes.json();
    records = recData.records || recData;
  }

  return NextResponse.json({ tableFound: !!leadsTable, fields: leadsTable?.fields, sampleRecords: records });
}
