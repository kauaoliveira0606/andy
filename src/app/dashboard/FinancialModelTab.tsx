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
const BLUE = "#2a78d6";

// "1 out of 7 low-ticket closes should land on the high-ticket calendar."
const TARGET_HT_BOOKING_RATE = 100 / 7;

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

function Row({
  label,
  unit,
  input,
  base: baseVal,
  d15: d15Val,
  d30: d30Val,
  weekly,
  monthly,
  highlight,
}: {
  label: string;
  unit: string;
  input?: React.ReactNode;
  base: string;
  d15: string;
  d30: string;
  weekly?: string;
  monthly?: string;
  highlight?: boolean;
}) {
  const rowStyle: React.CSSProperties = highlight
    ? { background: "#eaf1fb", borderTop: `2px solid ${BLUE}`, borderBottom: `2px solid ${BLUE}` }
    : { borderBottom: `1px solid ${BORDER}` };
  const size = highlight ? "text-[14px]" : "text-[13px]";
  const weight = highlight ? "font-extrabold" : "font-semibold";

  return (
    <tr style={rowStyle}>
      <td className={`px-4 py-2.5 ${size} ${weight}`} style={{ color: highlight ? BLUE : INK }}>
        {label}
      </td>
      <td className="px-3 py-2.5 text-[12px]" style={{ color: MUTED }}>
        {unit}
      </td>
      <td className="px-3 py-2.5">{input}</td>
      <td className={`px-3 py-2.5 text-right ${size} ${weight}`} style={{ color: highlight ? BLUE : GREEN }}>
        {baseVal}
      </td>
      <td className={`px-3 py-2.5 text-right ${size} ${weight}`} style={{ color: highlight ? BLUE : AMBER }}>
        {d15Val}
      </td>
      <td className={`px-3 py-2.5 text-right ${size} ${weight}`} style={{ color: highlight ? BLUE : RED }}>
        {d30Val}
      </td>
      <td className={`px-3 py-2.5 text-right ${size} ${weight}`} style={{ color: highlight ? BLUE : INK }}>
        {weekly ?? "—"}
      </td>
      <td className={`px-3 py-2.5 text-right ${size} ${weight}`} style={{ color: highlight ? BLUE : INK }}>
        {monthly ?? "—"}
      </td>
    </tr>
  );
}

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const count = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 1 });
const pct = (n: number) => `${n.toFixed(1)}%`;

type Variant = "lowTicket" | "lowToHighTicket";

type ComputeResult = {
  costPerLead: number;
  optIns: number;
  connectionRate: number;
  pickups: number;
  closeRate: number;
  sales: number;
  attributionRate: number;
  attributedSales: number;
  lowTicketCash: number;
  htBookingRate: number;
  htBookings: number;
  htCash: number;
  leadToHt: number;
  totalCash: number;
  roas: number;
  netProfit: number;
};

export default function FinancialModelTab() {
  const [variant, setVariant] = useState<Variant>("lowTicket");

  const [adSpend, setAdSpend] = useState(5000);
  const [costPerLead, setCostPerLead] = useState(50);
  const [connectionRate, setConnectionRate] = useState(40);
  const [closeRate, setCloseRate] = useState(20);
  const [attributionRate, setAttributionRate] = useState(85);
  const [avgCashPerSale, setAvgCashPerSale] = useState(300);

  const [htBookingRate, setHtBookingRate] = useState(Number(TARGET_HT_BOOKING_RATE.toFixed(1)));
  const [htAov, setHtAov] = useState(5000);

  const compute = (downside: number): ComputeResult => {
    const adjConnection = connectionRate * (1 - downside);
    const adjClose = closeRate * (1 - downside);
    const adjAttribution = attributionRate * (1 - downside);
    const adjHtBooking = htBookingRate * (1 - downside);
    // Downside makes cost per lead worse (higher), not better — same ad
    // spend buys fewer opt-ins when the market gets more expensive.
    const adjCostPerLead = costPerLead * (1 + downside);

    const optIns = adjCostPerLead > 0 ? adSpend / adjCostPerLead : 0;
    const pickups = optIns * (adjConnection / 100);
    const sales = pickups * (adjClose / 100);
    const attributedSales = sales * (adjAttribution / 100);
    const lowTicketCash = attributedSales * avgCashPerSale;

    const htBookings = variant === "lowToHighTicket" ? attributedSales * (adjHtBooking / 100) : 0;
    const htCash = htBookings * htAov;
    const leadToHt = optIns > 0 ? (htBookings / optIns) * 100 : 0;

    const totalCash = lowTicketCash + htCash;
    const roas = adSpend > 0 ? totalCash / adSpend : 0;
    const netProfit = totalCash - adSpend;

    return {
      costPerLead: adjCostPerLead,
      optIns,
      connectionRate: adjConnection,
      pickups,
      closeRate: adjClose,
      sales,
      attributionRate: adjAttribution,
      attributedSales,
      lowTicketCash,
      htBookingRate: adjHtBooking,
      htBookings,
      htCash,
      leadToHt,
      totalCash,
      roas,
      netProfit,
    };
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
          -15% / -30% columns show what happens if every conversion rate below drops that much. Weekly
          and Monthly are projections at today&apos;s current numbers — not goals or targets, just this
          run-rate carried forward.
        </p>
      </div>

      <div className="flex gap-2">
        <Pill active={variant === "lowTicket"} onClick={() => setVariant("lowTicket")}>
          Low Ticket
        </Pill>
        <Pill active={variant === "lowToHighTicket"} onClick={() => setVariant("lowToHighTicket")}>
          Low Ticket → High Ticket
        </Pill>
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
              base={money(base.costPerLead)}
              d15={money(d15.costPerLead)}
              d30={money(d30.costPerLead)}
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
              base={pct(base.connectionRate)}
              d15={pct(d15.connectionRate)}
              d30={pct(d30.connectionRate)}
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
              base={pct(base.closeRate)}
              d15={pct(d15.closeRate)}
              d30={pct(d30.closeRate)}
            />
            <Row
              label="Sales (Closed)"
              unit="#"
              base={base.sales.toFixed(1)}
              d15={d15.sales.toFixed(1)}
              d30={d30.sales.toFixed(1)}
              weekly={count(base.sales * 7)}
              monthly={count(base.sales * 30)}
            />
            <Row
              label="Attribution Rate"
              unit="%"
              input={<SliderInput value={attributionRate} onChange={setAttributionRate} min={0} max={100} step={0.5} suffix="%" />}
              base={pct(base.attributionRate)}
              d15={pct(d15.attributionRate)}
              d30={pct(d30.attributionRate)}
            />
            <Row
              label="Attributed Sales (Paid Out)"
              unit="#"
              base={base.attributedSales.toFixed(1)}
              d15={d15.attributedSales.toFixed(1)}
              d30={d30.attributedSales.toFixed(1)}
              weekly={count(base.attributedSales * 7)}
              monthly={count(base.attributedSales * 30)}
            />
            <Row
              label="Avg Cash Per Sale (Low Ticket AOV)"
              unit="$"
              input={<SliderInput value={avgCashPerSale} onChange={setAvgCashPerSale} min={0} max={3000} step={10} prefix="$" />}
              base="—"
              d15="—"
              d30="—"
            />
            <Row
              label="Low Ticket Cash Collected"
              unit="$"
              base={money(base.lowTicketCash)}
              d15={money(d15.lowTicketCash)}
              d30={money(d30.lowTicketCash)}
              weekly={money(base.lowTicketCash * 7)}
              monthly={money(base.lowTicketCash * 30)}
            />

            {variant === "lowToHighTicket" && (
              <>
                <Row
                  label={`Low Ticket → High Ticket Rate (Target: 1 in 7, ${TARGET_HT_BOOKING_RATE.toFixed(1)}%)`}
                  unit="%"
                  input={<SliderInput value={htBookingRate} onChange={setHtBookingRate} min={0} max={100} step={0.5} suffix="%" />}
                  base={pct(base.htBookingRate)}
                  d15={pct(d15.htBookingRate)}
                  d30={pct(d30.htBookingRate)}
                />
                <Row
                  label="High Ticket Bookings"
                  unit="#"
                  base={base.htBookings.toFixed(1)}
                  d15={d15.htBookings.toFixed(1)}
                  d30={d30.htBookings.toFixed(1)}
                  weekly={count(base.htBookings * 7)}
                  monthly={count(base.htBookings * 30)}
                />
                <Row
                  label="Lead → High Ticket (whole funnel, 1 number)"
                  unit="%"
                  base={pct(base.leadToHt)}
                  d15={pct(d15.leadToHt)}
                  d30={pct(d30.leadToHt)}
                />
                <Row
                  label="High Ticket AOV"
                  unit="$"
                  input={<SliderInput value={htAov} onChange={setHtAov} min={0} max={30000} step={100} prefix="$" />}
                  base="—"
                  d15="—"
                  d30="—"
                />
                <Row
                  label="High Ticket Cash Collected"
                  unit="$"
                  base={money(base.htCash)}
                  d15={money(d15.htCash)}
                  d30={money(d30.htCash)}
                  weekly={money(base.htCash * 7)}
                  monthly={money(base.htCash * 30)}
                />
              </>
            )}

            <Row
              label="Total Cash Collected"
              unit="$"
              base={money(base.totalCash)}
              d15={money(d15.totalCash)}
              d30={money(d30.totalCash)}
              weekly={money(base.totalCash * 7)}
              monthly={money(base.totalCash * 30)}
              highlight
            />
            <Row label="ROAS" unit="x" base={`${base.roas.toFixed(2)}x`} d15={`${d15.roas.toFixed(2)}x`} d30={`${d30.roas.toFixed(2)}x`} />
            <Row
              label="Net Profit"
              unit="$"
              base={money(base.netProfit)}
              d15={money(d15.netProfit)}
              d30={money(d30.netProfit)}
              weekly={money(base.netProfit * 7)}
              monthly={money(base.netProfit * 30)}
              highlight
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
