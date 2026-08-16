"use client";

import { useEffect, useState } from "react";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const NOTE_BG = "#eaf1fb";
const NOTE_BORDER = "#2a78d6";

type FieldFormat = "dollar" | "percent" | "count";

const METRIC_LABELS: { key: string; label: string; format: FieldFormat }[] = [
  { key: "Ad Spend Meta", label: "Ad Spend", format: "dollar" },
  { key: "Cost per Lead (Meta)", label: "Cost / Lead", format: "dollar" },
  { key: "Opt ins (Paid)", label: "Opt-ins (Paid)", format: "count" },
  { key: "Opt ins (Organic)", label: "Opt-ins (Organic)", format: "count" },
  { key: "Landing Page Connect Rate", label: "LP Connect Rate", format: "percent" },
  { key: "VSL Views", label: "VSL Views", format: "count" },
  { key: "VSL Play Rate", label: "VSL Play Rate", format: "percent" },
  { key: "VSL Engagement Rate", label: "VSL Engagement", format: "percent" },
  { key: "Confirmation Email open rate", label: "Email Open Rate", format: "percent" },
  { key: "Dials", label: "Dials", format: "count" },
  { key: "Connection rate (Pick ups vs opt ins)", label: "Connection Rate", format: "percent" },
  { key: "Sales - Low Ticket", label: "Sales", format: "count" },
  { key: "Cash Collected - Low ticket", label: "Cash Collected", format: "dollar" },
  { key: "Close rate - Low ticket", label: "Close Rate", format: "percent" },
  { key: "Funnel Conversion rate (Lt Sales/opt ins)", label: "Funnel Conv. Rate", format: "percent" },
];

function formatMetric(n: number | null, format: FieldFormat): string {
  if (n === null) return "—";
  if (format === "dollar") return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (format === "percent") return `${(n * 100).toFixed(1)}%`;
  return n.toLocaleString();
}

function deltaLabel(curr: number | null, prev: number | null, format: FieldFormat): { text: string; dir: "up" | "down" | "flat" } | null {
  if (curr === null || prev === null) return null;
  const diff = curr - prev;
  if (diff === 0) return { text: "no change", dir: "flat" };
  const dir = diff > 0 ? "up" : "down";
  const arrow = diff > 0 ? "▲" : "▼";
  const abs = Math.abs(diff);
  const text = format === "dollar" ? `${arrow} $${abs.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : format === "percent" ? `${arrow} ${(abs * 100).toFixed(1)}pt` : `${arrow} ${abs.toLocaleString()}`;
  return { text, dir };
}

type DayData = {
  date: string;
  hasSubmission: boolean;
  notes: string;
  metrics: Record<string, number | null>;
};

type RecentChangesResponse = { days: DayData[]; error?: string };

function fmtDate(dateStr: string, index: number): string {
  const label = index === 0 ? "Today" : index === 1 ? "Yesterday" : null;
  const d = new Date(`${dateStr}T12:00:00`);
  const nice = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return label ? `${label} — ${nice}` : nice;
}

function DayCard({ day, prevDay, index }: { day: DayData; prevDay: DayData | undefined; index: number }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>
        {fmtDate(day.date, index)}
      </p>

      {day.notes ? (
        <div className="rounded-md p-3 text-[12.5px] leading-relaxed" style={{ background: NOTE_BG, border: `1px solid ${NOTE_BORDER}`, color: INK }}>
          <span className="font-bold" style={{ color: NOTE_BORDER }}>
            📝 What changed:{" "}
          </span>
          {day.notes}
        </div>
      ) : (
        <p className="text-[12.5px] italic" style={{ color: MUTED }}>
          {day.hasSubmission ? "No changes logged for this day." : "No submission for this day yet."}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        {METRIC_LABELS.map((m) => {
          const curr = day.metrics[m.key];
          const prev = prevDay?.metrics[m.key] ?? null;
          const delta = deltaLabel(curr, prev, m.format);
          return (
            <div key={m.key} className="flex items-center justify-between text-[12.5px]">
              <span style={{ color: MUTED }}>{m.label}</span>
              <span className="flex items-center gap-2">
                <span className="font-bold" style={{ color: INK }}>
                  {formatMetric(curr, m.format)}
                </span>
                {delta && (
                  <span className="text-[11px]" style={{ color: MUTED }}>
                    {delta.text}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RecentChangesSection() {
  const [data, setData] = useState<RecentChangesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/recent-changes?t=${Date.now()}`)
      .then((r) => r.json())
      .then((d: RecentChangesResponse) => {
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
  }, []);

  return (
    <section>
      <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
        Recent Changes — Last 3 Days
      </p>
      <p className="mb-3 text-[12.5px]" style={{ color: MUTED }}>
        Whatever you log in the Marketing Daily Metrics form&apos;s &quot;Changes Made Today&quot; field shows up
        here next to that day&apos;s actual numbers, so you can see what moved after a change — deltas are vs. the
        day before.
      </p>

      {status === "loading" && (
        <p className="text-sm" style={{ color: MUTED }}>
          Loading…
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
          Couldn&apos;t load recent changes.
        </p>
      )}
      {status === "ready" && data && (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {data.days.map((day, i) => (
            <DayCard key={day.date} day={day} prevDay={data.days[i + 1]} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
