// One-time: converts the Leads table's "Source" field from free text to a
// Single Select with exactly two options (Paid, Organic). A locked option
// set means a bad value can't silently slip in and split the counts —
// Airtable will reject anything that isn't an exact match.
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
  if (!leadsTable) return NextResponse.json({ error: "Leads table not found" }, { status: 404 });
  const sourceField = leadsTable.fields.find((f: { name: string }) => f.name === "Source");
  if (!sourceField) return NextResponse.json({ error: "Source field not found" }, { status: 404 });

  // Airtable's API doesn't support changing a field's type in place.
  // The field is empty (confirmed before this was built), so delete and
  // recreate under the same name is safe — no data loss.
  const delRes = await fetch(
    `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables/${leadsTable.id}/fields/${sourceField.id}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const delData = await delRes.json();
  if (!delRes.ok) return NextResponse.json({ error: "Field delete failed", detail: delData }, { status: delRes.status });

  const createRes = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE}/tables/${leadsTable.id}/fields`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Source",
      type: "singleSelect",
      options: { choices: [{ name: "Paid" }, { name: "Organic" }] },
    }),
  });
  const data = await createRes.json();
  if (!createRes.ok) return NextResponse.json({ error: "Field create failed", detail: data }, { status: createRes.status });
  return NextResponse.json({ ok: true, field: data });
}
