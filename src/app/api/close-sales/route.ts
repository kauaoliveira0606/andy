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
    const retryAfter = res.headers.get("retry-after");
    throw new Error(`Close API ${path} failed: ${res.status} retry-after=${retryAfter} ${body.slice(0, 200)}`);
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

// The GET /lead/ list endpoint does NOT support date_created__gte/lt as query
// params (Close silently ignores unknown filters and returns everything) —
// filtering leads by date requires POST /data/search/ instead.
async function searchLeadsByDateRange(gte: string | undefined, lt: string | undefined): Promise<CloseLead[]> {
  const all: CloseLead[] = [];
  let cursor: string | null = null;
  const maxPages = 20;

  const dateCondition: Record<string, string> = { type: "moment_range" };
  if (gte) dateCondition.gte = gte;
  if (lt) dateCondition.lt = lt;

  const query = {
    type: "and",
    queries: [
      { type: "object_type", object_type: "lead" },
      {
        type: "field_condition",
        field: { type: "regular_field", object_type: "lead", field_name: "date_created" },
        condition: dateCondition,
      },
    ],
  };

  for (let page = 0; page < maxPages; page++) {
    const body: Record<string, unknown> = {
      query,
      _limit: 100,
      _fields: { lead: ["id", "date_created"] },
    };
    if (cursor) body.cursor = cursor;

    const res = await fetch(`${CLOSE_BASE}/data/search/`, {
      method: "POST",
      headers: { Authorization: authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const retryAfter = res.headers.get("retry-after");
      throw new Error(
        `Close API /data/search/ failed: ${res.status} retry-after=${retryAfter} ${text.slice(0, 500)}`
      );
    }
    const data: { data: CloseLead[]; cursor: string | null } = await res.json();
    all.push(...(data.data || []));
    if (!data.cursor) break;
    cursor = data.cursor;
  }
  return all;
}

// Close stores date_created in UTC, but "today"/"this week" should follow the
// sales team's actual business day, not a raw UTC midnight-to-midnight slice
// (which clips real activity — matches the NY-timezone convention already
// used elsewhere in this dashboard, e.g. dashboard-data/route.ts).
function nyDatePartsNow(): { y: number; m: number; d: number; dow: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts = fmt.formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  const y = Number(get("year"));
  const m = Number(get("month"));
  const d = Number(get("day"));
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { y, m, d, dow: dowMap[get("weekday")] ?? 0 };
}

// Converts a NY-local calendar date to the UTC instant of its midnight.
function nyMidnightUTC(y: number, m: number, d: number): Date {
  // Use noon UTC as an unambiguous reference point to read NY's current
  // UTC offset (handles the EST/EDT switch), then apply that offset to
  // the actual midnight instant.
  const noonGuess = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const offsetParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "shortOffset",
  }).formatToParts(noonGuess);
  const offsetStr = offsetParts.find((p) => p.type === "timeZoneName")?.value || "GMT-5";
  const offsetHours = parseInt(offsetStr.replace("GMT", ""), 10) || -5;
  // NY midnight, expressed in UTC, is UTC midnight minus the (negative) offset.
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0) - offsetHours * 3600000);
}

function rangeBounds(range: string): { gte?: string; lt?: string } {
  if (range === "all") return {};

  const { y, m, d, dow } = nyDatePartsNow();
  const today = nyMidnightUTC(y, m, d);

  const start = new Date(today);
  if (range === "today") {
    // start stays at today
  } else if (range === "7d") {
    start.setUTCDate(start.getUTCDate() - 6);
  } else if (range === "30d") {
    start.setUTCDate(start.getUTCDate() - 29);
  } else {
    // "week" and default: this calendar week (Sun–Sat), NY-local
    start.setUTCDate(start.getUTCDate() - dow);
  }

  const lt = new Date(today);
  lt.setUTCDate(lt.getUTCDate() + 1);
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
    const [calls, leads, outboundCallsRaw] = await Promise.all([
      fetchAllPages<CloseCall>("/activity/call/", {
        date_created__gte: bounds.gte,
        date_created__lt: bounds.lt,
      }),
      searchLeadsByDateRange(bounds.gte, bounds.lt),
      // direction is not a supported filter on this endpoint — filtered
      // client-side below instead of trusting the server to do it.
      fetchAllPages<CloseCall>("/activity/call/", {
        date_created__gte: bounds.gte,
        _fields: "id,lead_id,direction,date_created",
      }),
    ]);
    const outboundCalls = outboundCallsRaw.filter((c) => c.direction === "outbound");

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
