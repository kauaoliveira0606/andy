// Temporary: fetches a large batch of leads sorted -date_created WITHOUT
// the early-stop optimization, to check whether fetchLeadsInRange's
// "stop as soon as we cross the lower bound" logic is silently truncating
// results due to Close's sort not being strictly reliable.
import { NextResponse } from "next/server";

const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
const CLOSE_BASE = "https://api.close.com/api/v1";

function authHeader() {
  return "Basic " + Buffer.from(`${CLOSE_API_KEY}:`).toString("base64");
}

export async function GET() {
  if (!CLOSE_API_KEY) return NextResponse.json({ error: "CLOSE_API_KEY not set" }, { status: 500 });

  const all: { id: string; date_created: string }[] = [];
  let skip = 0;
  for (let page = 0; page < 5; page++) {
    const url = new URL(`${CLOSE_BASE}/lead/`);
    url.searchParams.set("_limit", "100");
    url.searchParams.set("_skip", String(skip));
    url.searchParams.set("_order_by", "-date_created");
    url.searchParams.set("_fields", "id,date_created");
    const res = await fetch(url.toString(), { headers: { Authorization: authHeader() }, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
    const items = data.data || [];
    all.push(...items);
    if (!data.has_more || items.length === 0) break;
    skip += items.length;
  }

  return NextResponse.json({
    fetched: all.length,
    first10: all.slice(0, 10),
    // Check for any out-of-order entries (proves whether sort is reliable)
    outOfOrderCount: all.reduce((count, lead, i) => {
      if (i === 0) return count;
      return new Date(lead.date_created) > new Date(all[i - 1].date_created) ? count + 1 : count;
    }, 0),
  });
}
