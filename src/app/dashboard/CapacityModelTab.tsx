"use client";

import { useState } from "react";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const BG = "#F3EFE1";
const GREEN = "#22c55e";
const AMBER = "#f59e0b";
const RED = "#ef4444";

type SliderInputProps = {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

function SliderInput({ value, onChange, min, max, step, prefix, suffix }: SliderInputProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32"
        style={{ accentColor: INK }}
      />
      <div className="flex items-center gap-1 rounded-md px-2 py-1" style={{ background: BG, border: `1px solid ${BORDER}` }}>
        {prefix && (
          <span className="text-[12px] font-semibold" style={{ color: MUTED }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 bg-transparent text-[13px] font-semibold outline-none"
          style={{ color: INK }}
        />
        {suffix && (
          <span className="text-[12px] font-semibold" style={{ color: MUTED }}>
            {suffix}
          </span>
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

type Period = "weekly" | "monthly";

type CapacityResult = {
  salesNeeded: number;
  pickupsNeeded: number;
  dialsNeeded: number;
  dialsPerDay: number;
  repsExact: number;
  repsNeeded: number;
};

function Row({
  label,
  unit,
  input,
  base,
  d15,
  d30,
}: {
  label: string;
  unit: string;
  input?: React.ReactNode;
  base: string;
  d15: string;
  d30: string;
}) {
  return (
    <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
      <td className="px-4 py-2.5 text-[13px] font-semibold" style={{ color: INK }}>
        {label}
      </td>
      <td className="px-3 py-2.5 text-[12px]" style={{ color: MUTED }}>
        {unit}
      </td>
      <td className="px-3 py-2.5">{input}</td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: GREEN }}>
        {base}
      </td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: AMBER }}>
        {d15}
      </td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: RED }}>
        {d30}
      </td>
    </tr>
  );
}

export default function CapacityModelTab() {
  const [period, setPeriod] = useState<Period>("monthly");
  const [revenueGoal, setRevenueGoal] = useState(50000);
  const [aov, setAov] = useState(300);
  const [closeRate, setCloseRate] = useState(20);
  const [connectionRate, setConnectionRate] = useState(40);
  const [leadsPerDialerPerDay, setLeadsPerDialerPerDay] = useState(30);
  const [workingDays, setWorkingDays] = useState(22);

  const setPeriodAndDays = (p: Period) => {
    setPeriod(p);
    setWorkingDays(p === "weekly" ? 5 : 22);
  };

  const compute = (downside: number): CapacityResult => {
    const adjClose = closeRate * (1 - downside);
    const adjConnection = connectionRate * (1 - downside);
    const salesNeeded = aov > 0 ? revenueGoal / aov : 0;
    const pickupsNeeded = adjClose > 0 ? salesNeeded / (adjClose / 100) : 0;
    const dialsNeeded = adjConnection > 0 ? pickupsNeeded / (adjConnection / 100) : 0;
    const dialsPerDay = workingDays > 0 ? dialsNeeded / workingDays : 0;
    const repsExact = leadsPerDialerPerDay > 0 ? dialsPerDay / leadsPerDialerPerDay : 0;
    return { salesNeeded, pickupsNeeded, dialsNeeded, dialsPerDay, repsExact, repsNeeded: Math.ceil(repsExact) };
  };

  const base = compute(0);
  const d15 = compute(0.15);
  const d30 = compute(0.3);

  const count = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const count1 = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold" style={{ color: INK }}>
          Capacity Model
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: MUTED }}>
          Set a revenue goal and your current funnel rates — this works backward to how many outbound
          dials that requires and how many reps it takes to hit them, given how many leads one dialer
          can realistically work in a day. -15% / -30% show what happens to headcount if Close Rate and
          Connection Rate both slip.
        </p>
      </div>

      <div className="flex gap-2">
        <Pill active={period === "weekly"} onClick={() => setPeriodAndDays("weekly")}>
          Weekly Goal
        </Pill>
        <Pill active={period === "monthly"} onClick={() => setPeriodAndDays("monthly")}>
          Monthly Goal
        </Pill>
      </div>

      <div className="overflow-x-auto rounded-lg" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {["Metric", "Unit", "Your Numbers", "Base Case", "-15% Downside", "-30% Downside"].map((h, i) => (
                <th
                  key={h}
                  className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: i === 3 ? GREEN : i === 4 ? AMBER : i === 5 ? RED : MUTED }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row
              label={`Revenue Goal (${period === "weekly" ? "Weekly" : "Monthly"})`}
              unit="$"
              input={<SliderInput value={revenueGoal} onChange={setRevenueGoal} min={0} max={500000} step={1000} prefix="$" />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row
              label="AOV"
              unit="$"
              input={<SliderInput value={aov} onChange={setAov} min={0} max={3000} step={10} prefix="$" />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row label="Sales Needed" unit="#" base={count(base.salesNeeded)} d15={count(d15.salesNeeded)} d30={count(d30.salesNeeded)} />
            <Row
              label="Close Rate"
              unit="%"
              input={<SliderInput value={closeRate} onChange={setCloseRate} min={0} max={100} step={0.5} suffix="%" />}
              base={`${closeRate.toFixed(1)}%`}
              d15={`${(closeRate * 0.85).toFixed(1)}%`}
              d30={`${(closeRate * 0.7).toFixed(1)}%`}
            />
            <Row label="Pickups Needed" unit="#" base={count(base.pickupsNeeded)} d15={count(d15.pickupsNeeded)} d30={count(d30.pickupsNeeded)} />
            <Row
              label="Connection Rate"
              unit="%"
              input={<SliderInput value={connectionRate} onChange={setConnectionRate} min={0} max={100} step={0.5} suffix="%" />}
              base={`${connectionRate.toFixed(1)}%`}
              d15={`${(connectionRate * 0.85).toFixed(1)}%`}
              d30={`${(connectionRate * 0.7).toFixed(1)}%`}
            />
            <Row
              label={`Outbound Dials Needed (${period === "weekly" ? "Weekly" : "Monthly"})`}
              unit="#"
              base={count(base.dialsNeeded)}
              d15={count(d15.dialsNeeded)}
              d30={count(d30.dialsNeeded)}
            />
            <Row label="Outbound Dials Needed / Day" unit="#" base={count(base.dialsPerDay)} d15={count(d15.dialsPerDay)} d30={count(d30.dialsPerDay)} />
            <Row
              label="Working Days in Period"
              unit="#"
              input={<SliderInput value={workingDays} onChange={setWorkingDays} min={1} max={31} step={1} />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row
              label="Leads (Dials) per Dialer / Day"
              unit="#"
              input={<SliderInput value={leadsPerDialerPerDay} onChange={setLeadsPerDialerPerDay} min={1} max={150} step={1} />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row label="Reps Needed (exact)" unit="#" base={count1(base.repsExact)} d15={count1(d15.repsExact)} d30={count1(d30.repsExact)} />
            <Row
              label="Reps Needed (round up)"
              unit="#"
              base={String(base.repsNeeded)}
              d15={String(d15.repsNeeded)}
              d30={String(d30.repsNeeded)}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
