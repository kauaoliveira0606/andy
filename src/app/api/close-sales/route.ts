// Pulls rep call activity from Close CRM.
// Requires CLOSE_API_KEY (Close → Settings → API Keys).
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
const CLOSE_BASE = "https://api.close.com/api/v1";

// A call counts as a "pickup" once it's connected long enough to not be a
// dead line / voicemail drop. A "long conversation" is a real qualifying talk.
const PICKUP_MIN_SECONDS = 45;
const LONG_CONVO_MIN_SECONDS = 120;

type CloseCall = {
  id: string;
  lead_id: string;
  user_id: string;
  user_name?: string;
  direction: "inbound" | "outbound";
  duration: number | null;
  date_created: string;
};

type CloseLead = {
  id: string;
  date_created: string;
};

function authHeader() {
  return "Basic " + Buffer.from(`${CLOSE_API_KEY}:`).toString("base64");
}

async function closeFetch<T = unknown>(path: string, params: Record<string, string | undefined>): Promise<T> {
  const url = new URL(CLOSE_BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString(), { headers: { Authorization: authHeader() }, cache: "no-store" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Close API ${path} failed: ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function fetchAllPages<T>(
  path: string,
  baseParams: Record<string, string | undefined>,
  maxPages = 20
): Promise<T[]> {
  const all: T[] = [];
  let skip = 0;
  const limit = 100;
  for (let page = 0; page < maxPages; page++) {
    const data = await closeFetch<{ data: T[]; has_more?: boolean }>(path, {
      ...baseParams,
      _limit: String(limit),
      _skip: String(skip),
    });
    const items = data.data || [];
    all.push(...items);
    if (!data.has_more || items.length === 0) break;
    skip += items.length;
  }
  return all;
}

function rangeBounds(range: string): { gte?: string; lt?: string } {
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (range === "all") return {};

  const start = new Date(today);
  if (range === "today") {
    // start stays at today
  } else if (range === "7d") {
    start.setUTCDate(today.getUTCDate() - 6);
  } else if (range === "30d") {
    start.setUTCDate(today.getUTCDate() - 29);
  } else {
    // "week" and default: this calendar week (Sun–Sat)
    start.setUTCDate(today.getUTCDate() - today.getUTCDay());
  }

  const lt = new Date(today);
  lt.setUTCDate(today.getUTCDate() + 1);
  return { gte: start.toISOString(), lt: lt.toISOString() };
}

function median(nums: number[]): number | null {
  if (!nums.length) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

type RepStats = {
  name: string;
  outboundDials: number;
  pickups: number;
  longConversations: number;
};

export async function GET(req: NextRequest) {
  if (!CLOSE_API_KEY) {
    return NextResponse.json({ error: "CLOSE_API_KEY not set" }, { status: 500 });
  }

  const range = req.nextUrl.searchParams.get("range") || "week";
  const bounds = rangeBounds(range);

  try {
    // Fire all three Close list pulls concurrently — running them one after
    // another was blowing past Vercel's function timeout on accounts with
    // real call volume.
    const [calls, leads, outboundCalls] = await Promise.all([
      fetchAllPages<CloseCall>("/activity/call/", {
        date_created__gte: bounds.gte,
        date_created__lt: bounds.lt,
      }),
      fetchAllPages<CloseLead>("/lead/", {
        date_created__gte: bounds.gte,
        date_created__lt: bounds.lt,
        _fields: "id,date_created",
      }),
      fetchAllPages<CloseCall>("/activity/call/", {
        direction: "outbound",
        date_created__gte: bounds.gte,
        _fields: "id,lead_id,direction,date_created",
      }),
    ]);

    const repMap: Record<string, RepStats> = {};
    let totalOutboundDials = 0;
    let totalPickups = 0;
    let totalLongConversations = 0;

    for (const call of calls) {
      const name = call.user_name || "Unknown";
      if (!repMap[name]) {
        repMap[name] = { name, outboundDials: 0, pickups: 0, longConversations: 0 };
      }
      const duration = call.duration || 0;

      if (call.direction === "outbound") {
        repMap[name].outboundDials += 1;
        totalOutboundDials += 1;
      }
      if (duration >= PICKUP_MIN_SECONDS) {
        repMap[name].pickups += 1;
        totalPickups += 1;
      }
      if (duration >= LONG_CONVO_MIN_SECONDS) {
        repMap[name].longConversations += 1;
        totalLongConversations += 1;
      }
    }

    // Speed to lead: for leads created in this range, find the first outbound
    // call logged against them (which may land after the range window ends).
    const firstCallByLead: Record<string, string> = {};
    for (const call of outboundCalls) {
      const existing = firstCallByLead[call.lead_id];
      if (!existing || call.date_created < existing) {
        firstCallByLead[call.lead_id] = call.date_created;
      }
    }

    const speedMinutes: number[] = [];
    let leadsWithNoCall = 0;
    for (const lead of leads) {
      const firstCall = firstCallByLead[lead.id];
      if (!firstCall) {
        leadsWithNoCall += 1;
        continue;
      }
      const diffMs = new Date(firstCall).getTime() - new Date(lead.date_created).getTime();
      if (diffMs >= 0) speedMinutes.push(diffMs / 60000);
    }

    const avgMinutes = speedMinutes.length
      ? speedMinutes.reduce((a, b) => a + b, 0) / speedMinutes.length
      : null;

    return NextResponse.json({
      range,
      speedToLead: {
        avgMinutes: avgMinutes !== null ? Math.round(avgMinutes * 10) / 10 : null,
        medianMinutes: (() => {
          const m = median(speedMinutes);
          return m !== null ? Math.round(m * 10) / 10 : null;
        })(),
        sampleSize: speedMinutes.length,
        leadsWithNoCall,
        totalLeads: leads.length,
      },
      totals: {
        outboundDials: totalOutboundDials,
        pickups: totalPickups,
        longConversations: totalLongConversations,
      },
      reps: Object.values(repMap).sort((a, b) => b.outboundDials - a.outboundDials),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach Close CRM", detail: String(err) }, { status: 502 });
  }
}
