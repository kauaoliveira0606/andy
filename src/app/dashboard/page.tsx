"use client";

import { useEffect, useState } from "react";
import { buildMetrics, type Metric, type Totals } from "./metrics";

/* ---------------------------------------------------------------------- */
/* Theme                                                                   */
/* ---------------------------------------------------------------------- */

const BG = "#F3EFE1";
const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";

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
          {reps.map((r) => {
            const cash = (r["Cash collected high ticket"] || 0) + (r["Cash collected low ticket"] || 0);
            return (
              <tr key={r.name} style={{ borderBottom: `1px solid ${BORDER}` }}>
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

export default function DashboardPage() {
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold" style={{ color: INK }}>
          Andy - EcomSimulation Dashboard
        </h1>
        <div className="flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((opt) => (
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
            <SectionLabel>By Rep</SectionLabel>
            <RepTable reps={data.reps} />
          </section>
        </div>
      )}
    </div>
  );
}
