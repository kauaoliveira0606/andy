// One-time: corrects 9 leads that were mis-dated Aug 16 instead of Aug 15
// due to the UTC-vs-Eastern Created At bug (already fixed going forward),
// and deletes 2 leftover test records found while diagnosing it.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";

const RECORDS_TO_REDATE = [
  "rec7QpZ9dG7Ghn3kM", // Ayden
  "recCui10FkOdpSsds", // Rob Amazon Ai
  "recYhGAmzErvImtkr", // LaShawn
  "recZ1VmrFVFPjJ3Nd", // Casper
  "recdu2IsKkHVsi6we", // Tatiana
  "recq8lsewE1ekACwb", // Cora
  "rectuAsw3tkNIsiaN", // Timothy
  "recwArIu8Vpeg5fOm", // JANICE
  "recx80ksIWu2BjMz8", // Antonio
];

const RECORDS_TO_DELETE = [
  "rec8v4WWJhR3Xa66G", // testlast
  "recIuaVItma3m2Do9", // orgtest
];

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });

  const patchRes = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/Leads`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      records: RECORDS_TO_REDATE.map((id) => ({ id, fields: { "Created At": "2026-08-15" } })),
    }),
  });
  const patchData = await patchRes.json();
  if (!patchRes.ok) return NextResponse.json({ error: "Redate failed", detail: patchData }, { status: patchRes.status });

  const params = new URLSearchParams();
  RECORDS_TO_DELETE.forEach((id) => params.append("records[]", id));
  const delRes = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/Leads?${params.toString()}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
  });
  const delData = await delRes.json();
  if (!delRes.ok) return NextResponse.json({ error: "Delete failed", detail: delData }, { status: delRes.status });

  return NextResponse.json({ ok: true, redated: patchData.records?.length, deleted: delData.records?.length });
}
