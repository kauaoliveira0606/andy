// One-time: deletes the two test records created verifying the paid/organic zaps.
import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const TEST_RECORD_IDS = ["reckFLY4Qp7pYO2Xq", "recK07OlOvQAWOmCK"];

export async function GET() {
  if (!AIRTABLE_TOKEN) return NextResponse.json({ error: "AIRTABLE_TOKEN not set" }, { status: 500 });
  const params = new URLSearchParams();
  TEST_RECORD_IDS.forEach((id) => params.append("records[]", id));
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/Leads?${params.toString()}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
  return NextResponse.json(data);
}
