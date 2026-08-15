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

// Names to keep off the By Rep table entirely — not real active reps.
const REP_NAME_BLOCKLIST = new Set(["jaidensuesue", "Raj Karan Tiwana", "Unknown"]);

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
  display_name?: string;
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

// GET /lead/ does not reliably filter by date_created via query params or
// via POST /data/search/ moment_range conditions (both were tested live
// against this account and returned unfiltered/partially-filtered results).
// Its "-date_created" sort is ALSO unreliable — verified live: ~59% of a
// 500-record sample was out of order — so we can't early-stop once we see
// an old lead either (a newer one could be sitting further down the list).
// Only safe option: scan every page up to the cap and filter client-side.
async function fetchLeadsInRange(gte: string | undefined, lt: string | undefined): Promise<CloseLead[]> {
  const gteTime = gte ? new Date(gte).getTime() : -Infinity;
  const ltTime = lt ? new Date(lt).getTime() : Infinity;
  const inRange: CloseLead[] = [];
  let skip = 0;
  const limit = 100;
  const maxPages = 60;

  for (let page = 0; page < maxPages; page++) {
    const data = await closeFetch<{ data: CloseLead[]; has_more?: boolean }>("/lead/", {
      _limit: String(limit),
      _skip: String(skip),
      _fields: "id,date_created,display_name",
    });
    const items = data.data || [];
    if (!items.length) break;

    for (const lead of items) {
      const t = new Date(lead.date_created).getTime();
      if (t >= gteTime && t < ltTime) inRange.push(lead);
    }
    if (!data.has_more) break;
    skip += items.length;
  }
  return inRange;
}

// The sales team operates on Eastern Time, so "today"/"yesterday"/"this
// week" must follow the Eastern calendar day, not a raw UTC slice.
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

// Converts an Eastern-local calendar date to the UTC instant of its midnight.
function nyMidnightUTC(y: number, m: number, d: number): Date {
  // Use noon UTC as an unambiguous reference point to read Eastern's current
  // UTC offset (handles the EST/EDT switch), then apply that offset to the
  // actual midnight instant.
  const noonGuess = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const offsetParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "shortOffset",
  }).formatToParts(noonGuess);
  const offsetStr = offsetParts.find((p) => p.type === "timeZoneName")?.value || "GMT-5";
  const offsetHours = parseInt(offsetStr.replace("GMT", ""), 10) || -5;
  // Eastern midnight, expressed in UTC, is UTC midnight minus the (negative) offset.
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0) - offsetHours * 3600000);
}

function rangeBounds(range: string): { gte?: string; lt?: string } {
  if (range === "all") return {};

  const { y, m, d, dow } = nyDatePartsNow();
  const today = nyMidnightUTC(y, m, d);

  if (range === "yesterday") {
    const start = new Date(today);
    start.setUTCDate(start.getUTCDate() - 1);
    return { gte: start.toISOString(), lt: today.toISOString() };
  }

  const start = new Date(today);
  if (range === "today") {
    // start stays at today
  } else if (range === "7d") {
    start.setUTCDate(start.getUTCDate() - 6);
  } else if (range === "30d") {
    start.setUTCDate(start.getUTCDate() - 29);
  } else {
    // "week" and default: this calendar week (Sun–Sat), Eastern-local
    start.setUTCDate(start.getUTCDate() - dow);
  }

  const lt = new Date(today);
  lt.setUTCDate(lt.getUTCDate() + 1);
  return { gte: start.toISOString(), lt: lt.toISOString() };
}

// Reps with zero calls in the selected range were silently missing from
// the By Rep table (it was only ever seeded from calls). Fetch the full
// org member list so every rep shows up regardless of activity, and so
// calls can be matched by user_id (stable) rather than user_name (can
// mismatch/be blank).
async function fetchOrgMembers(): Promise<Record<string, string>> {
  const me = await closeFetch<{ id?: string; organizations?: { id: string }[] }>("/me/", {});
  const orgId = me.organizations?.[0]?.id;
  if (!orgId) return {};
  const org = await closeFetch<{ memberships?: { user_id: string; user_full_name?: string; user_email?: string }[] }>(
    `/organization/${orgId}/`,
    {}
  );
  const map: Record<string, string> = {};
  for (const m of org.memberships || []) {
    // Skip the API key's own account (the org owner/integration user, not
    // a real rep) and members with no real name set (shows as a raw email
    // otherwise, not a useful "rep" row).
    if (m.user_id === me.id) continue;
    if (!m.user_full_name) continue;
    map[m.user_id] = m.user_full_name;
  }
  return map;
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
  talkTimeMinutes: number;
};

export async function GET(req: NextRequest) {
  if (!CLOSE_API_KEY) {
    return NextResponse.json({ error: "CLOSE_API_KEY not set" }, { status: 500 });
  }

  const range = req.nextUrl.searchParams.get("range") || "week";
  const bounds = rangeBounds(range);

  try {
    // Fire the Close list pulls concurrently — running them one after
    // another was blowing past Vercel's function timeout on accounts with
    // real call volume.
    const [calls, leads, outboundCallsRaw, orgMembers] = await Promise.all([
      fetchAllPages<CloseCall>("/activity/call/", {
        date_created__gte: bounds.gte,
        date_created__lt: bounds.lt,
      }),
      fetchLeadsInRange(bounds.gte, bounds.lt),
      // direction is not a supported filter on this endpoint — filtered
      // client-side below instead of trusting the server to do it.
      fetchAllPages<CloseCall>("/activity/call/", {
        date_created__gte: bounds.gte,
        _fields: "id,lead_id,direction,date_created",
      }),
      fetchOrgMembers(),
    ]);
    const outboundCalls = outboundCallsRaw.filter((c) => c.direction === "outbound");

    const repMap: Record<string, RepStats> = {};
    // Seed every org member at zero so reps with no activity in this range
    // still show up, instead of only ever appearing once they have a call.
    for (const [userId, name] of Object.entries(orgMembers)) {
      repMap[userId] = { name, outboundDials: 0, pickups: 0, longConversations: 0, talkTimeMinutes: 0 };
    }

    let totalOutboundDials = 0;
    let totalPickups = 0;
    let totalLongConversations = 0;
    let totalTalkTimeMinutes = 0;

    for (const call of calls) {
      const key = call.user_id || call.user_name || "unknown";
      if (!repMap[key]) {
        repMap[key] = { name: call.user_name || "Unknown", outboundDials: 0, pickups: 0, longConversations: 0, talkTimeMinutes: 0 };
      }
      const duration = call.duration || 0;
      const durationMinutes = duration / 60;

      repMap[key].talkTimeMinutes += durationMinutes;
      totalTalkTimeMinutes += durationMinutes;

      if (call.direction === "outbound") {
        repMap[key].outboundDials += 1;
        totalOutboundDials += 1;
      }
      if (duration >= PICKUP_MIN_SECONDS) {
        repMap[key].pickups += 1;
        totalPickups += 1;
      }
      if (duration >= LONG_CONVO_MIN_SECONDS) {
        repMap[key].longConversations += 1;
        totalLongConversations += 1;
      }
    }
    for (const rep of Object.values(repMap)) {
      rep.talkTimeMinutes = Math.round(rep.talkTimeMinutes * 10) / 10;
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
    type LeadRow = {
      name: string;
      createdAt: string;
      firstCalledAt: string | null;
      minutesToCall: number | null;
      status: "green" | "yellow" | "red" | "pending";
    };
    const leadRows: LeadRow[] = [];

    for (const lead of leads) {
      const firstCall = firstCallByLead[lead.id];
      if (!firstCall) {
        leadsWithNoCall += 1;
        leadRows.push({
          name: lead.display_name || "Unknown",
          createdAt: lead.date_created,
          firstCalledAt: null,
          minutesToCall: null,
          status: "pending",
        });
        continue;
      }
      const diffMs = new Date(firstCall).getTime() - new Date(lead.date_created).getTime();
      const minutesToCall = diffMs >= 0 ? diffMs / 60000 : null;
      if (minutesToCall !== null) speedMinutes.push(minutesToCall);

      const status: LeadRow["status"] =
        minutesToCall === null ? "pending" : minutesToCall < 5 ? "green" : minutesToCall < 10 ? "yellow" : "red";

      leadRows.push({
        name: lead.display_name || "Unknown",
        createdAt: lead.date_created,
        firstCalledAt: firstCall,
        minutesToCall: minutesToCall !== null ? Math.round(minutesToCall * 10) / 10 : null,
        status,
      });
    }
    leadRows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
        leadRows,
      },
      totals: {
        outboundDials: totalOutboundDials,
        pickups: totalPickups,
        longConversations: totalLongConversations,
        talkTimeMinutes: Math.round(totalTalkTimeMinutes * 10) / 10,
      },
      reps: Object.values(repMap)
        .filter((r) => !REP_NAME_BLOCKLIST.has(r.name))
        .sort((a, b) => b.outboundDials - a.outboundDials),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach Close CRM", detail: String(err) }, { status: 502 });
  }
}
