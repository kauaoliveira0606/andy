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
  { key: "pickupRate", field: "derived", label: "Pickup Rate", format: "percent" },
  { key: "pickups", field: "Pick ups", label: "Pickups", format: "count" },
  { key: "softwarePitched", field: "Software pitched", label: "Software Pitched", format: "count" },
  { key: "pitchRate", field: "derived", label: "Pitch Rate (Software Pitched / Pickups)", format: "percent" },
  { key: "cashPerOptIn", field: "derived", label: "Cash Collected per Opt-in", format: "dollar" },
];

export type Totals = Record<string, number>;

/** Handles the "derived" metrics that aren't a direct Airtable field. */
function deriveValue(key: string, totals: Totals): number | null {
  switch (key) {
    case "cashTotal":
      return (totals["Cash collected high ticket"] || 0) + (totals["Cash collected low ticket"] || 0);
    case "pickupRate":
      return totals["Outbound dials"] ? (totals["Pick ups"] || 0) / totals["Outbound dials"] : null;
    case "pitchRate":
      return totals["Pick ups"] ? (totals["Software pitched"] || 0) / totals["Pick ups"] : null;
    case "cashPerOptIn":
      return totals["Opt ins (Paid)"] ? (totals["Cash collected low ticket"] || 0) / totals["Opt ins (Paid)"] : null;
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
