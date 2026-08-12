"use client";

import { useEffect, useState } from "react";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const BG = "#F3EFE1";

const RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
] as const;

type RangeValue = (typeof RANGE_OPTIONS)[number]["value"];

type RepStats = {
  name: string;
  outboundDials: number;
  pickups: number;
  longConversations: number;
};

type CloseSalesResponse = {
  range: string;
  speedToLead: {
    avgMinutes: number | null;
    medianMinutes: number | null;
    sampleSize: number;
    leadsWithNoCall: number;
    totalLeads: number;
  };
  totals: { outboundDials: number; pickups: number; longConversations: number };
  reps: RepStats[];
  error?: string;
};

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

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold" style={{ color: INK }}>
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

function formatMinutes(mins: number | null): string {
  if (mins === null) return "—";
  if (mins < 60) return `${mins.toFixed(1)}m`;
  const hours = Math.floor(mins / 60);
  const rem = Math.round(mins % 60);
  return `${hours}h ${rem}m`;
}

function RepTable({ reps }: { reps: RepStats[] }) {
  if (!reps.length) {
    return (
      <p className="text-sm" style={{ color: MUTED }}>
        No call activity in this range.
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
              Outbound Dials
            </th>
            <th className="px-4 py-2 text-right font-bold" style={{ color: MUTED }}>
              Pickups
            </th>
            <th className="px-4 py-2 text-right font-bold" style={{ color: MUTED }}>
              2-Min+ Conversations
            </th>
          </tr>
        </thead>
        <tbody>
          {reps.map((r) => (
            <tr key={r.name} style={{ borderBottom: `1px solid ${BORDER}` }}>
              <td className="px-4 py-2 font-semibold" style={{ color: INK }}>
                {r.name}
              </td>
              <td className="px-4 py-2 text-right" style={{ color: INK }}>
                {r.outboundDials.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right" style={{ color: INK }}>
                {r.pickups.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right" style={{ color: INK }}>
                {r.longConversations.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SalesTeamTab() {
  const [range, setRange] = useState<RangeValue>("week");
  const [data, setData] = useState<CloseSalesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 55000);
    fetch(`/api/close-sales?range=${range}&t=${Date.now()}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: CloseSalesResponse) => {
        if (cancelled) return;
        if (d.error) {
          setErrorMsg(d.error);
          setStatus("error");
          return;
        }
        setData(d);
        setStatus("ready");
      })
      .catch((e) => {
        if (cancelled) return;
        setErrorMsg(e?.name === "AbortError" ? "Request timed out" : String(e));
        setStatus("error");
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      ctrl.abort();
    };
  }, [range]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {RANGE_OPTIONS.map((opt) => (
          <Pill key={opt.value} active={range === opt.value} onClick={() => setRange(opt.value)}>
            {opt.label}
          </Pill>
        ))}
      </div>

      {status === "loading" && (
        <p className="text-sm" style={{ color: MUTED }}>
          Loading…
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
          Couldn&apos;t load Close CRM data ({errorMsg || "unknown error"}). Check CLOSE_API_KEY.
        </p>
      )}

      {status === "ready" && data && (
        <>
          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
              Speed to Lead
            </p>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
              <StatCard label="Avg. Speed to Lead" value={formatMinutes(data.speedToLead.avgMinutes)} />
              <StatCard label="Median Speed to Lead" value={formatMinutes(data.speedToLead.medianMinutes)} />
              <StatCard
                label="Leads Called"
                value={`${data.speedToLead.sampleSize}/${data.speedToLead.totalLeads}`}
                sub={`${data.speedToLead.leadsWithNoCall} not yet called`}
              />
            </div>
          </section>

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
              Team Totals
            </p>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
              <StatCard label="Outbound Dials" value={data.totals.outboundDials.toLocaleString()} />
              <StatCard label="Pickups" value={data.totals.pickups.toLocaleString()} />
              <StatCard label="2-Min+ Conversations" value={data.totals.longConversations.toLocaleString()} />
            </div>
          </section>

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
              By Rep
            </p>
            <RepTable reps={data.reps} />
          </section>
        </>
      )}
    </div>
  );
}
