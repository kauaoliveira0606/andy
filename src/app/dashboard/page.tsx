"use client";

import { useEffect, useState } from "react";
import { buildMetrics, type Metric, type Totals } from "./metrics";
import ScorecardMetricsSection from "./ScorecardMetricsSection";
import RecentChangesSection from "./RecentChangesSection";
import SalesTeamTab from "./SalesTeamTab";
import ModelsTab from "./ModelsTab";
import AdsAnalysisTab from "./AdsAnalysisTab";

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
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
] as const;

type RangeValue = (typeof RANGE_OPTIONS)[number]["value"] | "custom";

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
/* Leaderboard (own date range, independent of the rest of Overview)      */
/* ---------------------------------------------------------------------- */

const LEADERBOARD_RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Past 7 Days", value: "7d" },
  { label: "Past 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
] as const;

type LeaderboardRangeValue = (typeof LEADERBOARD_RANGE_OPTIONS)[number]["value"];

function LeaderboardSection() {
  const [range, setRange] = useState<LeaderboardRangeValue>("today");
  const [reps, setReps] = useState<RepRow[]>([]);
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
        setReps(d.reps);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <SectionLabel>Leaderboard</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {LEADERBOARD_RANGE_OPTIONS.map((opt) => (
            <Pill key={opt.value} active={range === opt.value} onClick={() => setRange(opt.value)}>
              {opt.label}
            </Pill>
          ))}
        </div>
      </div>

      {status === "loading" && (
        <p className="text-sm" style={{ color: MUTED }}>
          Loading…
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
          Couldn&apos;t load leaderboard data.
        </p>
      )}
      {status === "ready" && <RepTable reps={reps} />}
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Lead Sources — Paid vs Organic, tracked from the Leads table            */
/* ---------------------------------------------------------------------- */

type LeadSourceResponse = {
  range: string;
  tracked: { paid: number; organic: number; unlabeled: number; total: number };
  cash: { paid: number; organic: number; total: number };
  adSpend: number;
  paidRoas: number | null;
  costPerPaidLead: number | null;
  manualEntry: { paid: number; organic: number };
  mismatch: { paid: number; organic: number };
  error?: string;
};

function LeadSourceCard({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold" style={{ color }}>
        {value}
      </p>
      {sub && (
        <p className="mt-1 text-[11px]" style={{ color: MUTED }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function LeadSourceSection() {
  const [range, setRange] = useState<LeaderboardRangeValue>("today");
  const [data, setData] = useState<LeadSourceResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/leads-source?range=${range}&t=${Date.now()}`)
      .then((r) => r.json())
      .then((d: LeadSourceResponse) => {
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

  const paidMismatch = data && data.mismatch.paid !== 0;
  const organicMismatch = data && data.mismatch.organic !== 0;

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <SectionLabel>Lead Sources</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {LEADERBOARD_RANGE_OPTIONS.map((opt) => (
            <Pill key={opt.value} active={range === opt.value} onClick={() => setRange(opt.value)}>
              {opt.label}
            </Pill>
          ))}
        </div>
      </div>

      {status === "loading" && (
        <p className="text-sm" style={{ color: MUTED }}>
          Loading…
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
          Couldn&apos;t load lead source data.
        </p>
      )}
      {status === "ready" && data && (
        <div className="flex flex-col gap-3">
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
            <LeadSourceCard label="Paid Leads (Tracked)" value={data.tracked.paid.toLocaleString()} color={SERIES_MONTHLY} />
            <LeadSourceCard label="Organic Leads (Tracked)" value={data.tracked.organic.toLocaleString()} color={SERIES_YEARLY} />
            {data.tracked.unlabeled > 0 && (
              <LeadSourceCard label="Unlabeled" value={data.tracked.unlabeled.toLocaleString()} color={MUTED} sub="Missing/invalid Source" />
            )}
            <LeadSourceCard
              label="Cash Collected — Paid"
              value={`$${data.cash.paid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              color={SERIES_MONTHLY}
              sub="From the Leads table's Cash Collected field"
            />
            <LeadSourceCard
              label="Cash Collected — Organic"
              value={`$${data.cash.organic.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              color={SERIES_YEARLY}
              sub="From the Leads table's Cash Collected field"
            />
            <LeadSourceCard
              label="Paid ROAS"
              value={data.paidRoas === null ? "—" : `${data.paidRoas.toFixed(2)}x`}
              color={INK}
              sub={`Cash (Paid) ÷ Ad Spend ($${data.adSpend.toFixed(0)})`}
            />
            <LeadSourceCard
              label="Cost Per Paid Lead"
              value={data.costPerPaidLead === null ? "—" : `$${data.costPerPaidLead.toFixed(2)}`}
              color={INK}
              sub="Ad Spend ÷ tracked Paid leads"
            />
          </div>

          {(paidMismatch || organicMismatch) && (
            <div className="rounded-lg p-3 text-[12px]" style={{ background: "#fef3c7", border: "1px solid #f59e0b", color: "#78350f" }}>
              <strong>Cross-check mismatch:</strong> the Marketing Daily Metrics form's manually-typed opt-ins don&apos;t
              match the tracked lead count for this range — Paid: {data.tracked.paid} tracked vs {data.manualEntry.paid}{" "}
              manual ({data.mismatch.paid > 0 ? "+" : ""}
              {data.mismatch.paid}); Organic: {data.tracked.organic} tracked vs {data.manualEntry.organic} manual (
              {data.mismatch.organic > 0 ? "+" : ""}
              {data.mismatch.organic}). Worth checking whether the zaps are firing correctly or the manual entry is stale.
            </div>
          )}
        </div>
      )}
    </section>
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

type PageTab = "overview" | "salesTeam" | "models" | "adsAnalysis";

const PAGE_TABS: { label: string; value: PageTab }[] = [
  { label: "Overview", value: "overview" },
  { label: "Sales Team", value: "salesTeam" },
  { label: "Models", value: "models" },
  { label: "Ads Analysis", value: "adsAnalysis" },
];

export default function DashboardPage() {
  const [page, setPage] = useState<PageTab>("overview");
  const [range, setRange] = useState<RangeValue>("yesterday");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (range === "custom" && (!customStart || !customEnd)) return;

    let cancelled = false;
    setStatus("loading");
    const params = new URLSearchParams({ range, t: String(Date.now()) });
    if (range === "custom") {
      params.set("start", customStart);
      params.set("end", customEnd);
    }
    fetch(`/api/dashboard-data?${params.toString()}`)
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
  }, [range, customStart, customEnd]);

  const metrics = data ? buildMetrics(data.totals) : [];
  const currentTabLabel = PAGE_TABS.find((t) => t.value === page)?.label ?? "";

  return (
    <div className="flex min-h-screen" style={{ background: BG }}>
      <aside
        className="flex w-44 shrink-0 flex-col gap-1 px-2.5 py-5"
        style={{ background: PANEL, borderRight: `1px solid ${BORDER}` }}
      >
        <div className="mb-5 flex items-center gap-2 px-1">
          <svg width="30" height="30" viewBox="0 0 64 64" className="shrink-0">
            <rect width="64" height="64" rx="14" fill="#0a0a0a" />
            <circle cx="32" cy="32" r="25" fill="none" stroke="#fad0dd" strokeWidth="6" />
            <text x="32" y="39" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="21" fontWeight="800" fill="#fad0dd">
              ES
            </text>
          </svg>
          <div>
            <p className="text-sm font-extrabold leading-tight" style={{ color: INK }}>
              Andy
            </p>
            <p className="text-[10px] leading-tight" style={{ color: MUTED }}>
              EcomSimulation
            </p>
          </div>
        </div>
        {PAGE_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setPage(t.value)}
            className="rounded-md px-2.5 py-1.5 text-left text-[13px] font-bold transition-colors"
            style={{
              background: page === t.value ? INK : "transparent",
              color: page === t.value ? BG : MUTED,
            }}
          >
            {t.label}
          </button>
        ))}
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-extrabold" style={{ color: INK }}>
              {currentTabLabel}
            </h1>
            {page === "overview" && (
              <div className="flex flex-wrap items-center gap-2">
                {RANGE_OPTIONS.map((opt) => (
                  <Pill key={opt.value} active={range === opt.value} onClick={() => setRange(opt.value)}>
                    {opt.label}
                  </Pill>
                ))}
                <div className="mx-1 h-4 w-px" style={{ background: BORDER }} />
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => {
                    setCustomStart(e.target.value);
                    setRange("custom");
                  }}
                  className="rounded-md px-2 py-1.5 text-xs font-bold"
                  style={{ border: `1px solid ${range === "custom" ? INK : BORDER}`, color: MUTED, background: PANEL }}
                />
                <span className="text-xs font-bold" style={{ color: MUTED }}>
                  to
                </span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => {
                    setCustomEnd(e.target.value);
                    setRange("custom");
                  }}
                  className="rounded-md px-2 py-1.5 text-xs font-bold"
                  style={{ border: `1px solid ${range === "custom" ? INK : BORDER}`, color: MUTED, background: PANEL }}
                />
              </div>
            )}
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

                  <LeadSourceSection />

                  <LeaderboardSection />

                  <RecentChangesSection />

                  <ScorecardMetricsSection />
                </div>
              )}
            </>
          )}

          {page === "salesTeam" && <SalesTeamTab />}

          {page === "models" && <ModelsTab />}

          {page === "adsAnalysis" && <AdsAnalysisTab />}
        </div>
      </main>
    </div>
  );
}
