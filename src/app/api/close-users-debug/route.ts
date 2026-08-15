// Temporary: inspect Close's /me/ and /organization/ responses to find the
// right shape for listing all reps (so reps with zero calls in a range
// still show up in the By Rep table instead of being silently omitted).
import { NextResponse } from "next/server";

const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
const CLOSE_BASE = "https://api.close.com/api/v1";

function authHeader() {
  return "Basic " + Buffer.from(`${CLOSE_API_KEY}:`).toString("base64");
}

export async function GET() {
  if (!CLOSE_API_KEY) return NextResponse.json({ error: "CLOSE_API_KEY not set" }, { status: 500 });

  const me = await fetch(`${CLOSE_BASE}/me/`, { headers: { Authorization: authHeader() } }).then((r) => r.json());

  let org = null;
  const orgId = me.organizations?.[0]?.id;
  if (orgId) {
    org = await fetch(`${CLOSE_BASE}/organization/${orgId}/`, { headers: { Authorization: authHeader() } }).then((r) =>
      r.json()
    );
  }

  return NextResponse.json({ me, orgId, org });
}
