"use client";

import { useEffect, useState } from "react";
import { buildMetrics, type Metric, type Totals } from "./metrics";
import ScorecardTab from "./ScorecardTab";
import SalesTeamTab from "./SalesTeamTab";

/* ---------------------------------------------------------------------- */
/* Theme                                                                   */
/* ---------------------------------------------------------------------- */

const BG = "#F3EFE1";
const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const SERIES_YEARLY = "#2a78d6";
const SERIES_MONTHLY = "#eb6834";

/* ---------------------------------------------------------------------- */
/* Building blocks                                                         */
/* ---------------------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
      {children}
    </p>
  );
}

function MetricCard({ m }: { m: Metric }) {
  return (
    <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
        {m.label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold" style={{ color: INK }}>
        {m.value}
      </p>
    </div>
  );
}

function MetricGrid({ items }: { items: Metric[] }) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
      {items.map((m) => (
        <MetricCard key={m.key} m={m} />
      ))}
    </div>
  );
}

function PlanSplitBar({ monthly, yearly }: { monthly: number; yearly: number }) {
  const total = monthly + yearly;
  if (!total) {
    return (
      <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
        <p className="text-sm" style={{ color: MUTED }}>
          No monthly or yearly plans in this range.
        </p>
      </div>
    );
  }

  const yearlyPct = (yearly / total) * 100;
  const monthlyPct = (monthly / total) * 100;

  return (
    <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <div className="mb-3 flex items-center gap-5 text-xs font-bold" style={{ color: MUTED }}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: SERIES_YEARLY }} />
          Yearly — {yearly.toLocaleString()} ({yearlyPct.toFixed(1)}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: SERIES_MONTHLY }} />
          Monthly — {monthly.toLocaleString()} ({monthlyPct.toFixed(1)}%)
        </span>
      </div>
      <div className="flex h-6 w-full overflow-hidden rounded-md" style={{ background: BG }}>
        {yearlyPct > 0 && (
          <div
            className="flex items-center justify-center text-[11px] font-bold text-white"
            style={{ width: `${yearlyPct}%`, background: SERIES_YEARLY }}
          >
            {yearlyPct >= 12 ? `${yearlyPct.toFixed(0)}%` : ""}
          </div>
        )}
        {monthlyPct > 0 && (
          <div
            className="flex items-center justify-center text-[11px] font-bold text-white"
            style={{ width: `${monthlyPct}%`, background: SERIES_MONTHLY, marginLeft: yearlyPct > 0 ? "2px" : 0 }}
          >
            {monthlyPct >= 12 ? `${monthlyPct.toFixed(0)}%` : ""}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-3 py-1.5 text-xs font-bold transition-colors"
      style={{
        background: active ? INK : "transparent",
        color: active ? BG : MUTED,
        border: `1px solid ${active ? INK : BORDER}`,
      }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* Range selector                                                          */
/* ---------------------------------------------------------------------- */

const RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
] as const;

type RangeValue = (typeof RANGE_OPTIONS)[number]["value"];

/* ---------------------------------------------------------------------- */
/* Rep breakdown                                                           */
/* ---------------------------------------------------------------------- */

type RepRow = { name: string } & Record<string, number>;

function RepTable({ reps }: { reps: RepRow[] }) {
  if (!reps.length) {
    return (
      <p className="text-sm" style={{ color: MUTED }}>
        No submissions in this range.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
            <th className="px-4 py-2 text-left font-bold" style={{ color: MUTED }}>
              #
            </th>
            <th className="px-4 py-2 text-left font-bold" style={{ color: MUTED }}>
              Rep
            </th>
            <th className="px-4 py-2 text-right font-bold" style={{ color: MUTED }}>
              Software Closed
            </th>
            <th className="px-4 py-2 text-right font-bold" style={{ color: MUTED }}>
              Outbound Dials
            </th>
            <th className="px-4 py-2 text-right font-bold" style={{ color: MUTED }}>
              Cash Collected
            </th>
          </tr>
        </thead>
        <tbody>
          {[...reps]
            .sort((a, b) => (b["software closed"] || 0) - (a["software closed"] || 0))
            .map((r, i) => {
              const cash = (r["Cash collected high ticket"] || 0) + (r["Cash collected low ticket"] || 0);
              return (
                <tr key={r.name} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td className="px-4 py-2 font-bold" style={{ color: MUTED }}>
                    {i + 1}
                  </td>
                  <td className="px-4 py-2 font-semibold" style={{ color: INK }}>
                    {r.name}
                  </td>
                  <td className="px-4 py-2 text-right" style={{ color: INK }}>
                    {(r["software closed"] || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right" style={{ color: INK }}>
                    {(r["Outbound dials"] || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right" style={{ color: INK }}>
                    ${cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                     */
/* ---------------------------------------------------------------------- */

type DashboardResponse = {
  range: string;
  recordCount: number;
  totals: Totals;
  reps: RepRow[];
  error?: string;
};

type PageTab = "overview" | "scorecard" | "salesTeam";

const PAGE_TABS: { label: string; value: PageTab }[] = [
  { label: "Overview", value: "overview" },
  { label: "Score Card", value: "scorecard" },
  { label: "Sales Team", value: "salesTeam" },
];

export default function DashboardPage() {
  const [page, setPage] = useState<PageTab>("overview");
  const [range, setRange] = useState<RangeValue>("week");
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/dashboard-data?range=${range}&t=${Date.now()}`)
      .then((r) => r.json())
      .then((d: DashboardResponse) => {
        if (cancelled) return;
        if (d.error) {
          setStatus("error");
          return;
        }
        setData(d);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const metrics = data ? buildMetrics(data.totals) : [];

  return (
    <div className="mx-auto max-w-6xl" style={{ background: BG }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold" style={{ color: INK }}>
          Andy - EcomSimulation Dashboard
        </h1>
        {page === "overview" && (
          <div className="flex flex-wrap gap-2">
            {RANGE_OPTIONS.map((opt) => (
              <Pill key={opt.value} active={range === opt.value} onClick={() => setRange(opt.value)}>
                {opt.label}
              </Pill>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 flex gap-2 border-b" style={{ borderColor: BORDER }}>
        {PAGE_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setPage(t.value)}
            className="px-3 py-2 text-sm font-bold transition-colors"
            style={{
              color: page === t.value ? INK : MUTED,
              borderBottom: page === t.value ? `2px solid ${INK}` : "2px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {page === "overview" && (
        <>
          {status === "loading" && (
            <p className="text-sm" style={{ color: MUTED }}>
              Loading…
            </p>
          )}

          {status === "error" && (
            <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
              Couldn&apos;t load dashboard data. Check AIRTABLE_TOKEN and the base/table configuration.
            </p>
          )}

          {status === "ready" && data && (
            <div className="flex flex-col gap-8">
              <section>
                <SectionLabel>Metrics</SectionLabel>
                <MetricGrid items={metrics} />
              </section>

              <section>
                <SectionLabel>Yearly / Monthly Plan Split</SectionLabel>
                <PlanSplitBar
                  monthly={data.totals["How many monthly plans"] || 0}
                  yearly={data.totals["How many yearly plans"] || 0}
                />
              </section>

              <section>
                <SectionLabel>Leaderboard</SectionLabel>
                <RepTable reps={data.reps} />
              </section>
            </div>
          )}
        </>
      )}

      {page === "scorecard" && <ScorecardTab />}

      {page === "salesTeam" && <SalesTeamTab />}
    </div>
  );
}
