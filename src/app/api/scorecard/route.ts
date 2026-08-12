// Reads Andy's "Andy Scorecard" Google Sheet directly — no Apps Script dependency.
// New weekly tabs are picked up automatically based on date, same approach as bronson/section8.
import { NextRequest } from "next/server";

const SHEET_ID = "1boFzY7vi2ZMBZSjj9juJXWZwLKdtP1xH55DnnACjTJU";

const MONTHS_ARR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_IDX: Record<string, number> = Object.fromEntries(MONTHS_ARR.map((m, i) => [m, i]));

// Rate metrics: average across periods, not sum.
const RATE_METRICS = new Set([
  "cost per lead (meta)",
  "landing page connect rate",
  "opt in rate (opt ins vs views)",
  "vsl play rate",
  "vsl engagement rate",
  "confirmation email open rate",
  "pick up rate (on dials)",
  "close rate - low ticket",
  "funnel conversion rate (lt sales/opt ins)",
]);

// Derived post-accumulation — skip in the raw daily/col9 accumulation loops.
const SKIP = new Set(["roas - total", "roas - low ticket", "cpa - low ticket", "total cash collected"]);

const r2 = (v: number) => parseFloat(v.toFixed(2));

function getTabName(sunday: Date) {
  const sat = new Date(sunday);
  sat.setDate(sat.getDate() + 6);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${sunday.getMonth() + 1}/${pad(sunday.getDate())}-${sat.getMonth() + 1}/${pad(sat.getDate())}`;
}

// Returns all plausible tab-name variants for a week (padded, unpadded, space vs slash).
function getTabNameVariants(sunday: Date) {
  const sat = new Date(sunday);
  sat.setDate(sat.getDate() + 6);
  const pad = (n: number) => String(n).padStart(2, "0");
  const sm = sunday.getMonth() + 1,
    sd = sunday.getDate();
  const em = sat.getMonth() + 1,
    ed = sat.getDate();
  return [
    `${sm}/${pad(sd)}-${em}/${pad(ed)}`,
    `${sm}/${sd}-${em}/${ed}`,
    `${pad(sm)}/${pad(sd)}-${pad(em)}/${pad(ed)}`,
    `${sm}/${pad(sd)} - ${em}/${pad(ed)}`,
    `${sm}/${sd} - ${em}/${ed}`,
  ];
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  for (const line of text.split("\n")) {
    const row: string[] = [];
    let inQ = false,
      cur = "";
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = !inQ;
      } else if (c === "," && !inQ) {
        row.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

function parseSheetDate(s: string | undefined, refYear: number): Date | null {
  const m = (s || "").trim().match(/^([A-Za-z]+)-(\d+)$/);
  if (!m) return null;
  const mo = MONTHS_IDX[m[1]];
  if (mo === undefined) return null;
  return new Date(refYear, mo, parseInt(m[2], 10));
}

function parseVal(s: string | undefined): number {
  if (!s || typeof s !== "string") return NaN;
  const t = s.trim();
  if (!t || t.startsWith("#") || t === "-%" || t === "-") return NaN;
  const clean = t.replace(/[$,]/g, "");
  if (clean.endsWith("%")) {
    const n = parseFloat(clean);
    return isNaN(n) ? NaN : n / 100;
  }
  return parseFloat(clean);
}

async function discoverGidMap(): Promise<Record<string, string>> {
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 10000);
    const r = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/htmlview`, { signal: ctrl.signal });
    clearTimeout(tid);
    if (!r.ok) return {};
    const html = await r.text();
    const re = /name:\s*"((?:[^"\\]|\\.)*)"\s*,\s*pageUrl[^}]*gid:\s*"(\d+)"/g;
    const map: Record<string, string> = {};
    let m;
    while ((m = re.exec(html)) !== null) {
      const name = m[1].replace(/\\\//g, "/").replace(/\\x3d/gi, "=");
      map[name] = m[2];
    }
    return map;
  } catch {
    return {};
  }
}

async function fetchTabCsv(gid: string | undefined): Promise<string | null> {
  if (!gid) return null;
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}&t=${Date.now()}`;
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 10000);
    const r = await fetch(url, { signal: ctrl.signal });
    clearTimeout(tid);
    if (!r.ok) return null;
    const text = await r.text();
    if (text.trim().startsWith("google.visualization")) return null;
    if (text.trim().startsWith("<!DOCTYPE")) return null;
    return text;
  } catch {
    return null;
  }
}

type TabData = {
  dateMap: Record<number, Date>;
  metrics: Record<string, string[]>;
  fingerprint: string;
};

function parseTabData(csvText: string, sunday: Date): TabData | null {
  const rows = parseCsv(csvText);
  const refYear = sunday.getFullYear();

  let dateRowIdx = -1;
  const dateMap: Record<number, Date> = {};
  for (let r = 0; r < Math.min(rows.length, 6); r++) {
    const row = rows[r];
    let found = 0;
    for (let c = 1; c <= 7; c++) {
      const d = parseSheetDate(row[c], refYear);
      if (d) {
        dateMap[c] = d;
        found++;
      }
    }
    if (found >= 1) {
      dateRowIdx = r;
      break;
    }
  }
  if (dateRowIdx < 0) return null;

  const metrics: Record<string, string[]> = {};
  for (let r = dateRowIdx + 1; r < rows.length; r++) {
    const row = rows[r];
    const name = (row[0] || "").trim();
    if (name && !metrics[name]) metrics[name] = row;
  }

  const adRow = metrics["Ad Spend Meta"] || [];
  const fingerprint = [1, 2, 3, 4, 5, 6, 7].map((c) => (adRow[c] || "").replace(/[$,]/g, "").trim()).join("|");

  return { dateMap, metrics, fingerprint };
}

type Accum = { sums: Record<string, number>; cnts: Record<string, number> };
const mkAccum = (): Accum => ({ sums: {}, cnts: {} });

function addToAccum(accum: Accum, name: string, v: number) {
  if (isNaN(v) || v === 0) return;
  accum.sums[name] = (accum.sums[name] || 0) + v;
  accum.cnts[name] = (accum.cnts[name] || 0) + 1;
}

function buildSection(accum: Accum) {
  return Object.entries(accum.sums)
    .map(([name, total]) => {
      const isRate = RATE_METRICS.has(name.toLowerCase());
      const count = accum.cnts[name] || 1;
      const val = isRate ? total / count : total;
      return `${name},${r2(val)}`;
    })
    .join("\n");
}

function derive(accum: Accum) {
  const g = (k: string) => accum.sums[k] || 0;
  const adSpend = g("Ad Spend Meta");
  const cashLT = g("Cash Collected - Low ticket");
  const salesLT = g("Sales - Low Ticket");

  if (cashLT) accum.sums["Total Cash Collected"] = r2(cashLT);
  if (adSpend > 0 && salesLT > 0) accum.sums["CPA - Low ticket"] = r2(adSpend / salesLT);
  if (adSpend > 0 && cashLT > 0) {
    accum.sums["Roas - Total"] = r2(cashLT / adSpend);
    accum.sums["Roas - Low ticket"] = r2(cashLT / adSpend);
  }
}

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cut7 = new Date(today);
    cut7.setDate(today.getDate() - 7);
    const cut30 = new Date(today);
    cut30.setDate(today.getDate() - 30);

    const weekOffset = Math.max(0, parseInt(req.nextUrl.searchParams.get("week") || "0", 10) || 0);

    const curSunday = new Date(today);
    curSunday.setDate(today.getDate() - today.getDay());

    const targetSunday = new Date(curSunday);
    targetSunday.setDate(curSunday.getDate() - weekOffset * 7);

    const tabCount = weekOffset + 27;
    const tabDefs = Array.from({ length: tabCount }, (_, i) => {
      const sun = new Date(targetSunday);
      sun.setDate(targetSunday.getDate() - i * 7);
      const sat = new Date(sun);
      sat.setDate(sun.getDate() + 6);
      return { variants: getTabNameVariants(sun), name: getTabName(sun), sunday: sun, saturday: sat };
    });

    const gidMap = await discoverGidMap();

    const csvList = await Promise.all(
      tabDefs.map(async (t) => {
        for (const v of t.variants) {
          const csv = await fetchTabCsv(gidMap[v]);
          if (csv) return csv;
        }
        return null;
      })
    );

    const tabs = tabDefs
      .map((def, i) => {
        const csv = csvList[i];
        if (!csv) return null;
        const data = parseTabData(csv, def.sunday);
        if (!data) return null;
        return { ...def, csv, ...data };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);

    const targetTab = tabs.find((t) => t.sunday.getTime() === targetSunday.getTime()) || null;
    const targetIdx = tabDefs.findIndex((t) => t.sunday.getTime() === targetSunday.getTime());
    const targetCsvRaw = targetIdx > -1 ? csvList[targetIdx] : null;

    const currentTab = tabs.find((t) => t.saturday >= today) || null;
    const pastTabs = tabs.filter((t) => t.saturday < today);

    const seenFp = new Set<string>();
    const completedTabs = pastTabs.filter((t) => {
      const fp = t.fingerprint;
      if (!fp || fp.replace(/\|/g, "") === "") return true;
      if (seenFp.has(fp)) return false;
      seenFp.add(fp);
      return true;
    });

    const L7 = mkAccum(),
      L30 = mkAccum(),
      ALL = mkAccum();

    function accumulateTab(tab: (typeof tabs)[number]) {
      const { dateMap, metrics } = tab;

      const l7Cols = Object.entries(dateMap)
        .filter(([, d]) => d >= cut7 && d < today)
        .map(([c]) => +c);
      if (l7Cols.length > 0) {
        for (const [name, row] of Object.entries(metrics)) {
          if (SKIP.has(name.toLowerCase())) continue;
          for (const c of l7Cols) addToAccum(L7, name, parseVal(row[c]));
        }
      }

      const l30Cols = Object.entries(dateMap)
        .filter(([, d]) => d >= cut30 && d < today)
        .map(([c]) => +c);
      if (l30Cols.length > 0) {
        for (const [name, row] of Object.entries(metrics)) {
          if (SKIP.has(name.toLowerCase())) continue;
          for (const c of l30Cols) addToAccum(L30, name, parseVal(row[c]));
        }
      }

      const col9 = (name: string) => parseVal((metrics[name] || [])[9]);
      for (const name of Object.keys(metrics)) {
        if (SKIP.has(name.toLowerCase())) continue;
        addToAccum(ALL, name, col9(name));
      }
    }

    for (const tab of completedTabs) accumulateTab(tab);
    if (currentTab) accumulateTab(currentTab);

    derive(L7);
    derive(L30);
    derive(ALL);

    const mainCsv = (targetCsvRaw || targetTab?.csv || currentTab?.csv || completedTabs[0]?.csv || "").trim();

    if (req.nextUrl.searchParams.get("debug") === "1") {
      const fmt = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "null");
      const tabInfo = tabs.map((t) => ({
        name: t.name,
        sunday: fmt(t.sunday),
        saturday: fmt(t.saturday),
        completed: t.saturday < today,
      }));
      return Response.json({
        today: fmt(today),
        cut7: fmt(cut7),
        cut30: fmt(cut30),
        currentTab: currentTab ? currentTab.name : null,
        completedTabCount: completedTabs.length,
        tabs: tabInfo.slice(0, 8),
        l7Keys: Object.keys(L7.sums),
        mainCsvPreview: mainCsv.slice(0, 400),
      });
    }

    const out =
      mainCsv +
      "\n__LAST7__\n" +
      buildSection(L7) +
      "\n__LAST30__\n" +
      buildSection(L30) +
      "\n__ALLTIME__\n" +
      buildSection(ALL);

    return new Response(out, { headers: { "Content-Type": "text/plain" } });
  } catch (e) {
    return new Response("Error: " + (e as Error).message, { status: 500 });
  }
}
