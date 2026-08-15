"use client";

import { useState } from "react";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const GREEN = "#22c55e";
const AMBER = "#f59e0b";
const RED = "#ef4444";
const BG_NESTED = "#F3EFE1";

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
        className="w-32 accent-current"
        style={{ accentColor: INK }}
      />
      <div className="flex items-center gap-1 rounded-md px-2 py-1" style={{ background: BG_NESTED, border: `1px solid ${BORDER}` }}>
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

type ComputeResult = {
  optIns: number;
  connectionRate: number;
  pickups: number;
  closeRate: number;
  sales: number;
  cash: number;
  roas: number;
  netProfit: number;
};

function Row({
  label,
  unit,
  input,
  base: baseVal,
  d15: d15Val,
  d30: d30Val,
  weekly,
  monthly,
}: {
  label: string;
  unit: string;
  input?: React.ReactNode;
  base: string;
  d15: string;
  d30: string;
  weekly?: string;
  monthly?: string;
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
        {baseVal}
      </td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: AMBER }}>
        {d15Val}
      </td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: RED }}>
        {d30Val}
      </td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: INK }}>
        {weekly ?? "—"}
      </td>
      <td className="px-3 py-2.5 text-right text-[13px] font-semibold" style={{ color: INK }}>
        {monthly ?? "—"}
      </td>
    </tr>
  );
}

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const count = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 1 });

export default function FinancialModelTab() {
  const [adSpend, setAdSpend] = useState(5000);
  const [costPerLead, setCostPerLead] = useState(50);
  const [connectionRate, setConnectionRate] = useState(40);
  const [closeRate, setCloseRate] = useState(20);
  const [avgCashPerSale, setAvgCashPerSale] = useState(300);

  const compute = (downside: number): ComputeResult => {
    const adjConnection = connectionRate * (1 - downside);
    const adjClose = closeRate * (1 - downside);
    const optIns = costPerLead > 0 ? adSpend / costPerLead : 0;
    const pickups = optIns * (adjConnection / 100);
    const sales = pickups * (adjClose / 100);
    const cash = sales * avgCashPerSale;
    const roas = adSpend > 0 ? cash / adSpend : 0;
    const netProfit = cash - adSpend;
    return { optIns, connectionRate: adjConnection, pickups, closeRate: adjClose, sales, cash, roas, netProfit };
  };

  const base = compute(0);
  const d15 = compute(0.15);
  const d30 = compute(0.3);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold" style={{ color: INK }}>
          Financial Model
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: MUTED }}>
          Drag a slider or type a number directly. Downstream numbers calculate automatically. The
          -15% / -30% columns show what happens if Connection Rate and Close Rate both drop that much.
          Weekly and Monthly are projections at today&apos;s current numbers — not goals or targets, just
          this run-rate carried forward.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
        <table className="w-full min-w-[980px] border-collapse">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {["Metric", "Unit", "Your Numbers (Daily)", "Base Case", "-15% Downside", "-30% Downside", "Weekly Projection", "Monthly Projection"].map(
                (h, i) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide"
                    style={{ color: i === 3 ? GREEN : i === 4 ? AMBER : i === 5 ? RED : MUTED }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <Row
              label="Ad Spend"
              unit="$"
              input={<SliderInput value={adSpend} onChange={setAdSpend} min={0} max={50000} step={100} prefix="$" />}
              base="—"
              d15="—"
              d30="—"
              weekly={money(adSpend * 7)}
              monthly={money(adSpend * 30)}
            />
            <Row
              label="Cost Per Lead"
              unit="$"
              input={<SliderInput value={costPerLead} onChange={setCostPerLead} min={1} max={200} step={1} prefix="$" />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row
              label="Opt-Ins"
              unit="#"
              base={base.optIns.toFixed(0)}
              d15={d15.optIns.toFixed(0)}
              d30={d30.optIns.toFixed(0)}
              weekly={count(base.optIns * 7)}
              monthly={count(base.optIns * 30)}
            />
            <Row
              label="Connection Rate"
              unit="%"
              input={<SliderInput value={connectionRate} onChange={setConnectionRate} min={0} max={100} step={0.5} suffix="%" />}
              base={`${base.connectionRate.toFixed(1)}%`}
              d15={`${d15.connectionRate.toFixed(1)}%`}
              d30={`${d30.connectionRate.toFixed(1)}%`}
            />
            <Row
              label="Pickups"
              unit="#"
              base={base.pickups.toFixed(1)}
              d15={d15.pickups.toFixed(1)}
              d30={d30.pickups.toFixed(1)}
              weekly={count(base.pickups * 7)}
              monthly={count(base.pickups * 30)}
            />
            <Row
              label="Close Rate"
              unit="%"
              input={<SliderInput value={closeRate} onChange={setCloseRate} min={0} max={100} step={0.5} suffix="%" />}
              base={`${base.closeRate.toFixed(1)}%`}
              d15={`${d15.closeRate.toFixed(1)}%`}
              d30={`${d30.closeRate.toFixed(1)}%`}
            />
            <Row
              label="Sales"
              unit="#"
              base={base.sales.toFixed(1)}
              d15={d15.sales.toFixed(1)}
              d30={d30.sales.toFixed(1)}
              weekly={count(base.sales * 7)}
              monthly={count(base.sales * 30)}
            />
            <Row
              label="Avg Cash Per Sale"
              unit="$"
              input={<SliderInput value={avgCashPerSale} onChange={setAvgCashPerSale} min={0} max={3000} step={10} prefix="$" />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row
              label="Total Cash Collected"
              unit="$"
              base={`$${base.cash.toFixed(0)}`}
              d15={`$${d15.cash.toFixed(0)}`}
              d30={`$${d30.cash.toFixed(0)}`}
              weekly={money(base.cash * 7)}
              monthly={money(base.cash * 30)}
            />
            <Row label="ROAS" unit="x" base={`${base.roas.toFixed(2)}x`} d15={`${d15.roas.toFixed(2)}x`} d30={`${d30.roas.toFixed(2)}x`} />
            <Row
              label="Net Profit"
              unit="$"
              base={`$${base.netProfit.toFixed(0)}`}
              d15={`$${d15.netProfit.toFixed(0)}`}
              d30={`$${d30.netProfit.toFixed(0)}`}
              weekly={money(base.netProfit * 7)}
              monthly={money(base.netProfit * 30)}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
