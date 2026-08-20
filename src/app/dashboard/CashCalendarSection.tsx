"use client";

import { useEffect, useState } from "react";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const BG = "#F3EFE1";

// Sequential green ramp (light -> dark) — cash is a positive metric, and
// this hue matches the app's existing "on track" green (#22c55e) used for
// hit-goal status elsewhere on the dashboard.
const RAMP = ["#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#15803d"];
const RAMP_DARK_TEXT_FROM = 5; // only the darkest step needs white text — keeps most cells high-contrast black-on-green

function rampStep(value: number, max: number): number | null {
  if (value <= 0 || max <= 0) return null;
  const ratio = value / max;
  return Math.min(RAMP.length - 1, Math.floor(ratio * RAMP.length));
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function fmtDollar(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

type CalendarResponse = {
  year: number;
  month: number;
  daysInMonth: number;
  byDay: Record<string, number>;
  monthTotal: number;
  error?: string;
};

function Pill({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md px-3 py-1.5 text-xs font-bold transition-colors disabled:opacity-40"
      style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}` }}
    >
      {children}
    </button>
  );
}

export default function CashCalendarSection() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [data, setData] = useState<CalendarResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/cash-calendar?year=${year}&month=${month}&t=${Date.now()}`)
      .then((r) => r.json())
      .then((d: CalendarResponse) => {
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
  }, [year, month]);

  function goPrevMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }
  function goNextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
  const maxDay = data ? Math.max(0, ...Object.values(data.byDay)) : 0;

  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = data?.daysInMonth ?? new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const todayIso = isoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
          Cash Calendar
        </p>
        <div className="flex items-center gap-2">
          <Pill onClick={goPrevMonth}>← Prev</Pill>
          <span className="min-w-[130px] text-center text-xs font-bold" style={{ color: MUTED }}>
            {MONTH_NAMES[month - 1]} {year}
          </span>
          <Pill onClick={goNextMonth} disabled={isCurrentMonth}>
            Next →
          </Pill>
        </div>
      </div>

      {status === "loading" && (
        <p className="text-sm" style={{ color: MUTED }}>
          Loading…
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
          Couldn&apos;t load the cash calendar.
        </p>
      )}

      {status === "ready" && data && (
        <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm" style={{ color: MUTED }}>
              Cash collected per day, from Marketing Daily Metrics submissions.
            </p>
            <p className="text-sm font-extrabold" style={{ color: INK }}>
              Month total: {fmtDollar(data.monthTotal)}
            </p>
          </div>

          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {WEEKDAY_LABELS.map((w) => (
              <div key={w} className="pb-1 text-center text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>
                {w}
              </div>
            ))}

            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const iso = isoDate(year, month, day);
              const cash = data.byDay[iso] || 0;
              const step = rampStep(cash, maxDay);
              const bg = step === null ? BG : RAMP[step];
              const textColor = step !== null && step >= RAMP_DARK_TEXT_FROM ? "#FFFFFF" : INK;
              const isToday = iso === todayIso;

              return (
                <div
                  key={i}
                  className="flex aspect-square flex-col justify-between rounded-md p-2"
                  style={{
                    background: bg,
                    border: isToday ? `2px solid ${INK}` : `1px solid ${BORDER}`,
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: step === null ? MUTED : textColor }}>
                    {day}
                  </span>
                  {cash > 0 && (
                    <span className="text-right text-sm font-extrabold leading-tight" style={{ color: textColor }}>
                      {fmtDollar(cash)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: MUTED }}>
              Less
            </span>
            <div className="h-3 w-5 rounded-sm" style={{ background: BG, border: `1px solid ${BORDER}` }} />
            {RAMP.map((c) => (
              <div key={c} className="h-3 w-5 rounded-sm" style={{ background: c, border: `1px solid ${BORDER}` }} />
            ))}
            <span className="text-xs font-semibold" style={{ color: MUTED }}>
              More
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
