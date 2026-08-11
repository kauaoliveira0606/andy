export type FormatType = "dollar" | "percent" | "count";

export type MetricDef = {
  key: string;
  /** Airtable field name this metric reads from totals, or "derived" if computed in deriveValue. */
  field: string;
  label: string;
  format: FormatType;
};

// Edit this list to control which cards show up on the dashboard and in what order.
export const METRIC_DEFS: MetricDef[] = [
  { key: "cashTotal", field: "derived", label: "Cash Collected (Total)", format: "dollar" },
  { key: "cashHigh", field: "Cash collected high ticket", label: "Cash Collected - High Ticket", format: "dollar" },
  { key: "cashLow", field: "Cash collected low ticket", label: "Cash Collected - Low Ticket", format: "dollar" },
  { key: "revenueHt", field: "revenue high ticket", label: "Revenue - High Ticket", format: "dollar" },

  { key: "dials", field: "Outbound dials", label: "Outbound Dials", format: "count" },
  { key: "pickups", field: "Pick ups", label: "Pick Ups", format: "count" },
  { key: "pickupRate", field: "derived", label: "Pickup Rate", format: "percent" },
  { key: "talkTime", field: "total talk time", label: "Total Talk Time (min)", format: "count" },

  { key: "callsCalendar", field: "calls on the calendar", label: "Calls on Calendar", format: "count" },
  { key: "callsShowed", field: "calls showed", label: "Calls Showed", format: "count" },
  { key: "showRate", field: "derived", label: "Show Rate", format: "percent" },
  { key: "cancelledCalls", field: "cancelled calls", label: "Cancelled Calls", format: "count" },
  { key: "newHtBooked", field: "new high ticket calls booked", label: "New High Ticket Calls Booked", format: "count" },
  { key: "htPitched", field: "high ticket call pitched", label: "High Ticket Calls Pitched", format: "count" },

  { key: "softwarePitched", field: "Software pitched", label: "Software Pitched", format: "count" },
  { key: "softwareClosed", field: "software closed", label: "Software Closed", format: "count" },
  { key: "closeRate", field: "derived", label: "Close Rate (Software)", format: "percent" },
  { key: "setClosed", field: "set closed", label: "Set Closed", format: "count" },
  { key: "monthlyPlans", field: "How many monthly plans", label: "Monthly Plans", format: "count" },
  { key: "yearlyPlans", field: "How many yearly plans", label: "Yearly Plans", format: "count" },
];

export type Totals = Record<string, number>;

/** Handles the "derived" metrics that aren't a direct Airtable field. */
function deriveValue(key: string, totals: Totals): number | null {
  switch (key) {
    case "cashTotal":
      return (totals["Cash collected high ticket"] || 0) + (totals["Cash collected low ticket"] || 0);
    case "pickupRate":
      return totals["Outbound dials"] ? (totals["Pick ups"] || 0) / totals["Outbound dials"] : null;
    case "showRate":
      return totals["calls on the calendar"] ? (totals["calls showed"] || 0) / totals["calls on the calendar"] : null;
    case "closeRate":
      return totals["Software pitched"] ? (totals["software closed"] || 0) / totals["Software pitched"] : null;
    default:
      return null;
  }
}

function formatValue(n: number | null, format: FormatType): string {
  if (n === null) return "—";
  switch (format) {
    case "dollar":
      return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case "percent":
      return `${(n * 100).toFixed(1)}%`;
    case "count":
    default:
      return n.toLocaleString();
  }
}

export type Metric = {
  key: string;
  label: string;
  value: string;
};

export function buildMetrics(totals: Totals): Metric[] {
  return METRIC_DEFS.map((def) => {
    const raw = def.field === "derived" ? deriveValue(def.key, totals) : totals[def.field] ?? null;
    return { key: def.key, label: def.label, value: formatValue(raw, def.format) };
  });
}
