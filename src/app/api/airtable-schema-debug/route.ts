// Temporary: lists table + field names in the Airtable base so we can see
// what data already exists before designing a new form/table. Schema only,
// no record data. Delete once the scorecard-sync design is finalized.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

export async function GET() {
  if (!AIRTABLE_TOKEN) {
    return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  }
  try {
    const res = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables`, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: "Airtable meta call failed", detail: data }, { status: res.status });

    const tables = (data.tables || []).map((t: { name: string; fields: { name: string; type: string }[] }) => ({
      name: t.name,
      fields: t.fields.map((f) => ({ name: f.name, type: f.type })),
    }));
    return NextResponse.json({ tables });
  } catch (err) {
    return NextResponse.json({ error: "Failed", detail: String(err) }, { status: 502 });
  }
}
