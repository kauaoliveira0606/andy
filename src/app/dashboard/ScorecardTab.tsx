"use client";

import { useEffect, useState } from "react";
import {
  parseScorecardPayload,
  getFilteredActual,
  parseVal,
  trackStatus,
  generateSummary,
  sectionOf,
  NEVER_PERCENT,
  type ScorecardData,
  type Metric,
  type RangeFilter,
  type Status,
} from "./scorecard";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const GREEN = "#22c55e";
const RED = "#ef4444";
const BLUE = "#3b82f6";
const YELLOW = "#f59e0b";

const statusColor = (s: Status) => (s === "green" ? GREEN : s === "yellow" ? YELLOW : s === "red" ? RED : INK);

const FILTERS: { label: string; value: RangeFilter }[] = [
  { label: "This Week", value: "week" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "alltime" },
];

const SECTION_LABELS: Record<ReturnType<typeof sectionOf>, string> = {
  leading: "💰 Leading Metrics",
  leadFlow: "🔥 Lead Flow",
  salesConv: "🤝 Sales Conversion",
  marketing: "📣 Marketing Metrics",
  backend: "📊 Backend",
};
const SECTION_ORDER: ReturnType<typeof sectionOf>[] = ["leading", "leadFlow", "salesConv", "marketing", "backend"];

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-3 py-1.5 text-xs font-bold transition-colors"
      style={{
        background: active ? INK : "transparent",
        color: active ? "#F3EFE1" : MUTED,
        border: `1px solid ${active ? INK : BORDER}`,
      }}
    >
      {children}
    </button>
  );
}

function MetricCard({ m, filter }: { m: Metric; filter: RangeFilter }) {
  const noPct = NEVER_PERCENT.has(m.name.toLowerCase().trim());
  const actual = parseVal(getFilteredActual(m, filter), noPct);
  const goal = parseVal(m.weeklyGoal, noPct);
  const status = trackStatus(actual, m.weeklyGoal);
  const color = statusColor(status);

  let pct: number | null = null;
  if (goal.num !== null && actual.num !== null && goal.num > 0) {
    pct = Math.min(100, Math.round((actual.num / goal.num) * 100));
  }

  return (
    <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
        {m.name}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold" style={{ color }}>
        {actual.display}
      </p>
      <p className="mt-1 text-[11px]" style={{ color: goal.display !== "—" ? color : MUTED }}>
        {goal.display !== "—" ? `Goal: ${goal.display}` : "No goal set"}
      </p>
      {pct !== null && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full" style={{ background: BORDER }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </div>
      )}
    </div>
  );
}

function ScorecardTable({ data, filter }: { data: ScorecardData; filter: RangeFilter }) {
  const dayLabels = data.dayHeaders.length ? data.dayHeaders : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="overflow-x-auto rounded-lg" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
            <th className="whitespace-nowrap px-3 py-2 text-left font-bold" style={{ color: MUTED }}>
              Metric
            </th>
            {dayLabels.map((d, i) => (
              <th key={i} className="px-3 py-2 text-right font-bold" style={{ color: MUTED }}>
                {d || "—"}
              </th>
            ))}
            <th className="px-3 py-2 text-right font-bold" style={{ color: MUTED }}>
              Goal
            </th>
            <th className="px-3 py-2 text-right font-bold" style={{ color: MUTED }}>
              Actual
            </th>
          </tr>
        </thead>
        <tbody>
          {data.metrics.map((m) => {
            const noPct = NEVER_PERCENT.has(m.name.toLowerCase().trim());
            const actual = parseVal(getFilteredActual(m, filter), noPct);
            const goal = parseVal(m.weeklyGoal, noPct);
            const status = trackStatus(actual, m.weeklyGoal);
            const color = statusColor(status);
            return (
              <tr key={m.name} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td className="whitespace-nowrap px-3 py-2 font-semibold" style={{ color: INK }}>
                  {m.name}
                </td>
                {m.days.map((v, i) => (
                  <td key={i} className="px-3 py-2 text-right" style={{ color: MUTED }}>
                    {v || "—"}
                  </td>
                ))}
                <td className="px-3 py-2 text-right" style={{ color: MUTED }}>
                  {goal.display}
                </td>
                <td className="px-3 py-2 text-right font-bold" style={{ color }}>
                  {actual.display}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function IntelligenceSummary({ data, filter }: { data: ScorecardData; filter: RangeFilter }) {
  const summary = generateSummary(data.metrics, filter);
  const healthColor = summary ? (summary.score >= 70 ? GREEN : summary.score >= 45 ? YELLOW : RED) : MUTED;
  const itemColor = { high: RED, medium: YELLOW, info: BLUE } as const;

  return (
    <div className="rounded-lg p-5" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
          style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff" }}
        >
          ✦
        </div>
        <div>
          <p className="text-sm font-extrabold" style={{ color: INK }}>
            Weekly Intelligence Summary
          </p>
          <p className="text-[11px]" style={{ color: MUTED }}>
            Based on live scorecard data — rule-based, not AI-generated
          </p>
        </div>
      </div>

      {!summary && (
        <p className="text-sm" style={{ color: MUTED }}>
          Not enough data yet — every metric for this range is either missing a goal (Daily Goal column) or has no
          actual value on the sheet (shows as #DIV/0!). Once goals are set and daily numbers come in, this section
          will fill in with a health score and prioritized action items.
        </p>
      )}

      {summary && (
        <>
          <div className="mb-4 flex items-center gap-4">
            <div className="text-3xl font-extrabold" style={{ color: healthColor }}>
              {summary.score}%
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: INK }}>
                Overall Health — {summary.healthLabel}
              </p>
              <p className="text-xs" style={{ color: MUTED }}>
                {summary.healthDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {summary.items.map((item, i) => (
              <div key={i} className="flex gap-3 rounded-md p-3" style={{ background: "#F3EFE1" }}>
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: itemColor[item.type] }} />
                <div>
                  <p className="text-xs font-bold" style={{ color: INK }}>
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: MUTED }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ScorecardTab() {
  const [filter, setFilter] = useState<RangeFilter>("week");
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState<ScorecardData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/scorecard?week=${weekOffset}&t=${Date.now()}`)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        const parsed = parseScorecardPayload(text);
        setData(parsed);
        setStatus("ready");
      })
      .catch((e) => {
        if (cancelled) return;
        setErrorMsg(String(e));
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [weekOffset]);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
            Weekly Scorecard
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <Pill key={f.value} active={filter === f.value} onClick={() => setFilter(f.value)}>
                {f.label}
              </Pill>
            ))}
            <div className="mx-1 h-4 w-px" style={{ background: BORDER }} />
            <Pill active={false} onClick={() => setWeekOffset((w) => w + 1)}>
              ← Prev
            </Pill>
            <span className="min-w-[90px] text-center text-xs" style={{ color: MUTED }}>
              {weekOffset === 0 ? "Current Week" : `${weekOffset}w ago`}
            </span>
            <button
              disabled={weekOffset === 0}
              onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
              className="rounded-md px-3 py-1.5 text-xs font-bold transition-colors disabled:opacity-40"
              style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}` }}
            >
              Next →
            </button>
          </div>
        </div>

        {status === "loading" && (
          <p className="text-sm" style={{ color: MUTED }}>
            Loading scorecard…
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-semibold" style={{ color: RED }}>
            Scorecard error: {errorMsg}
          </p>
        )}
        {status === "ready" && data && (
          <div className="flex flex-col gap-4">
            {SECTION_ORDER.map((section) => {
              const items = data.metrics.filter((m) => sectionOf(m.name) === section);
              if (!items.length) return null;
              return (
                <div key={section}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: MUTED }}>
                    {SECTION_LABELS[section]}
                  </p>
                  <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
                    {items.map((m) => (
                      <MetricCard key={m.name} m={m} filter={filter} />
                    ))}
                  </div>
                </div>
              );
            })}
            <ScorecardTable data={data} filter={filter} />
          </div>
        )}
      </section>

      {status === "ready" && data && (
        <section>
          <IntelligenceSummary data={data} filter={filter} />
        </section>
      )}
    </div>
  );
}
