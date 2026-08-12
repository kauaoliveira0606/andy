// Port of bronson's dashboard/index.html scorecard logic (weekly funnel scorecard +
// deterministic "Weekly Intelligence Summary"), adapted for Andy - EcomSimulation's
// (low-ticket only) metric set. Edit the section arrays below once the real sheet's
// metric list is finalized.

export function parseCSVLine(line: string): string[] {
  const cols: string[] = [];
  let cur = "",
    inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQ = !inQ;
    else if (c === "," && !inQ) {
      cols.push(cur);
      cur = "";
    } else cur += c;
  }
  cols.push(cur);
  return cols;
}

// Metrics that are ratios/dollar values and must never be shown as a percentage.
export const NEVER_PERCENT = new Set(["roas - total", "roas - low ticket", "cost per lead (meta)", "cpa - low ticket"]);

export type ParsedVal = { display: string; num: number | null };

export function parseVal(raw: string | undefined, noPct = false): ParsedVal {
  if (!raw || raw.trim() === "" || raw === "#DIV/0!" || raw === "#REF!") return { display: "—", num: null };
  const s = raw.trim();
  if (s.startsWith("$")) {
    const n = parseFloat(s.replace(/[$,]/g, ""));
    return { display: s, num: isNaN(n) ? null : n };
  }
  if (s.endsWith("%")) {
    const n = parseFloat(s);
    return { display: s, num: isNaN(n) ? null : n };
  }
  const n = parseFloat(s);
  if (!isNaN(n)) {
    if (!noPct && n > 0 && n < 1) return { display: (n * 100).toFixed(1) + "%", num: n * 100 };
    return { display: noPct ? parseFloat(n.toFixed(2)).toString() : s, num: n };
  }
  return { display: s, num: null };
}

export type Status = "green" | "yellow" | "red" | null;

// yellow = within 20% of goal, red = more than 20% away.
export function trackStatus(actual: ParsedVal, goalRaw: string): Status {
  if (actual.num === null) return null;
  const g = goalRaw.trim();
  if (!g || g === "" || g === "#DIV/0!") return null;
  const lessThan = /^[<]/.test(g) || /[<]$/.test(g);
  const goalParsed = parseVal(g.replace(/[<>]/g, "").trim());
  if (goalParsed.num === null || goalParsed.num === 0) return null;
  const gNum = goalParsed.num;
  const aNum = actual.num;
  if (lessThan) {
    if (aNum < gNum) return "green";
    if (aNum < gNum * 1.2) return "yellow";
    return "red";
  } else {
    if (aNum >= gNum) return "green";
    if (aNum >= gNum * 0.8) return "yellow";
    return "red";
  }
}

// Parse "Jun-21" style headers into Date objects.
export function parseDayHeader(label: string): Date | null {
  if (!label) return null;
  const clean = label.trim().replace("-", " ");
  if (!clean || !/[A-Za-z]/.test(clean)) return null;
  const tmp = new Date(`${clean} ${new Date().getFullYear()}`);
  if (isNaN(tmp.getTime())) return null;
  return new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate());
}

export type Metric = {
  name: string;
  days: string[];
  weeklyActual: string;
  weeklyGoal: string;
  last7Actual: string;
  last30Actual: string;
  allTimeActual: string;
};

export type ScorecardData = {
  dayHeaders: string[];
  dayDates: (Date | null)[];
  metrics: Metric[];
};

// Edit these to match the real metric names on Andy's sheet.
export const LEADING = [
  "ad spend meta",
  "cost per lead (meta)",
  "funnel conversion rate (lt sales/opt ins)",
  "cpa - low ticket",
  "roas - low ticket",
  "roas - total",
  "cash collected - low ticket",
  "total cash collected",
];
export const LEAD_FLOW = ["opt ins (paid)", "opt ins (organic)", "vsl views"];
export const SALES_CONV = ["dials", "pick up rate (on dials)", "sales - low ticket", "close rate - low ticket"];
export const MARKETING = [
  "landing page connect rate",
  "opt in rate (opt ins vs views)",
  "vsl play rate",
  "vsl engagement rate",
  "confirmation email open rate",
];

export function sectionOf(metricName: string): "leading" | "leadFlow" | "salesConv" | "marketing" | "backend" {
  const n = metricName.toLowerCase().trim();
  if (LEADING.includes(n)) return "leading";
  if (LEAD_FLOW.includes(n)) return "leadFlow";
  if (SALES_CONV.includes(n)) return "salesConv";
  if (MARKETING.includes(n)) return "marketing";
  return "backend";
}

/** Parses the raw text response from /api/scorecard into structured data. */
export function parseScorecardPayload(rawText: string): ScorecardData {
  const text = rawText.replace(/"([^"]|\n)*"/g, (m) => m.replace(/\n/g, " "));
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 4) throw new Error("Sheet empty");

  const MONTHS = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i;
  let dateRowIdx = 1;
  for (let i = 1; i < Math.min(lines.length, 6); i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.slice(1, 8).some((c) => MONTHS.test(c.trim()))) {
      dateRowIdx = i;
      break;
    }
  }
  const dateRow = parseCSVLine(lines[dateRowIdx]);
  const dayHeaders = dateRow.slice(1, 8).map((d) => d.trim());
  const dayDates = dayHeaders.map(parseDayHeader);

  const l7Idx = lines.findIndex((l) => l.trim() === "__LAST7__");
  const l30Idx = lines.findIndex((l) => l.trim() === "__LAST30__");
  const atIdx = lines.findIndex((l) => l.trim() === "__ALLTIME__");
  const mainEnd = l7Idx > -1 ? l7Idx : l30Idx > -1 ? l30Idx : atIdx > -1 ? atIdx : lines.length;

  function parseSection(startIdx: number, endIdx: number) {
    const map: Record<string, string> = {};
    for (let r = startIdx + 1; r < (endIdx > -1 ? endIdx : lines.length); r++) {
      const cols = parseCSVLine(lines[r]);
      const n = (cols[0] || "").trim();
      if (n) map[n.toLowerCase()] = (cols[1] || "").trim();
    }
    return map;
  }
  const last7Map = l7Idx > -1 ? parseSection(l7Idx, l30Idx) : {};
  const last30Map = l30Idx > -1 ? parseSection(l30Idx, atIdx) : {};
  const allTimeMap = atIdx > -1 ? parseSection(atIdx, -1) : {};

  const goalColIdx = 8;
  const actualColIdx = 9;

  const metrics: Metric[] = [];
  for (let r = 3; r < mainEnd; r++) {
    const cols = parseCSVLine(lines[r]);
    const name = cols[0] ? cols[0].trim() : "";
    if (!name) continue;
    const days = cols.slice(1, 8).map((v) => (v || "").trim());
    const weeklyGoal = (cols[goalColIdx] || "").trim();
    const weeklyActual = (cols[actualColIdx] || "").trim();
    const key = name.toLowerCase();
    metrics.push({
      name,
      days,
      weeklyActual,
      weeklyGoal,
      last7Actual: last7Map[key] || "",
      last30Actual: last30Map[key] || "",
      allTimeActual: allTimeMap[key] || "",
    });
  }

  return { dayHeaders, dayDates, metrics };
}

export type RangeFilter = "week" | "7d" | "30d" | "alltime";

export function getFilteredActual(metric: Metric, filter: RangeFilter): string {
  if (filter === "week") return metric.weeklyActual;
  if (filter === "7d") return metric.last7Actual || metric.weeklyActual;
  if (filter === "30d") return metric.last30Actual || metric.weeklyActual;
  if (filter === "alltime") return metric.allTimeActual || metric.weeklyActual;
  return metric.weeklyActual;
}

/* ------------------------------------------------------------------------ */
/* Weekly Intelligence Summary — deterministic, rule-based (no LLM call)    */
/* ------------------------------------------------------------------------ */

export type SummaryItem = { type: "high" | "medium" | "info"; title: string; body: string };

export type Summary = {
  score: number;
  healthLabel: "On Track" | "Needs Attention" | "Behind";
  healthDesc: string;
  items: SummaryItem[];
};

const SUMMARY_EXCLUDE = ["vsl engagement", "vsl"];

export function generateSummary(metrics: Metric[], filter: RangeFilter): Summary | null {
  const analyzed = metrics
    .filter((m) => !SUMMARY_EXCLUDE.some((ex) => m.name.toLowerCase().includes(ex)))
    .map((m) => {
      const actual = parseVal(getFilteredActual(m, filter), NEVER_PERCENT.has(m.name.toLowerCase().trim()));
      const goal = parseVal(m.weeklyGoal);
      const status = trackStatus(actual, m.weeklyGoal);
      const pctOfGoal = actual.num !== null && goal.num !== null && goal.num > 0 ? Math.round((actual.num / goal.num) * 100) : null;
      return { ...m, actual, goal, status, pctOfGoal };
    })
    .filter((m) => m.status !== null);

  if (!analyzed.length) return null;

  const red = analyzed.filter((m) => m.status === "red").sort((a, b) => (a.pctOfGoal || 0) - (b.pctOfGoal || 0));
  const yellow = analyzed.filter((m) => m.status === "yellow").sort((a, b) => (a.pctOfGoal || 0) - (b.pctOfGoal || 0));
  const green = analyzed.filter((m) => m.status === "green");

  const total = analyzed.length;
  const score = Math.round(((green.length + yellow.length * 0.5) / total) * 100);
  const healthLabel = score >= 70 ? "On Track" : score >= 45 ? "Needs Attention" : "Behind";
  const healthDesc =
    score >= 70
      ? `${green.length} of ${total} metrics are hitting goal. Keep the momentum.`
      : score >= 45
        ? `${red.length} metric${red.length !== 1 ? "s" : ""} are significantly behind. Focus there first.`
        : `Most metrics are off track. Prioritize the highest-revenue levers below.`;

  const items: SummaryItem[] = [];

  red.forEach((m, i) => {
    const gap = m.pctOfGoal !== null ? `at ${m.pctOfGoal}% of goal` : "below goal";
    const lever =
      i === 0
        ? `This is your #1 lever this week. Every point of improvement here has the most downstream impact on revenue. Identify what's blocking it and remove that friction today.`
        : `Address this after ${red[0].name}. Small gains here compound quickly.`;
    items.push({ type: "high", title: `↑ Prioritize: ${m.name} (${gap})`, body: lever });
  });

  yellow.forEach((m) => {
    const gap = m.pctOfGoal !== null ? `${m.pctOfGoal}% of goal` : "close to goal";
    items.push({
      type: "medium",
      title: `⚡ Quick Win: ${m.name} (${gap})`,
      body: `You're within 20% of target — a focused push today could flip this green. This is low-effort, high-payoff.`,
    });
  });

  const topRed = red[0];
  if (topRed) {
    items.push({
      type: "info",
      title: `📌 This Week's Focus`,
      body: `If you could only fix one thing, fix ${topRed.name}. It's the furthest from goal and likely has the highest revenue impact. Everything else is secondary until that moves.`,
    });
  }

  return { score, healthLabel, healthDesc, items };
}
