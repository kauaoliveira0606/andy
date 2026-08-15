"use client";

import { useMemo, useState } from "react";

const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const GREEN = "#22c55e";
const BLUE = "#3b82f6";
const PURPLE = "#8b5cf6";
const AMBER = "#f59e0b";
const RED = "#ef4444";

type CsvRow = {
  campaign: string;
  adSet: string;
  ad: string;
  spend: number;
  leads: number;
  sales: number;
  revenue: number;
};

function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = (names: string[]) => header.findIndex((h) => names.some((n) => h.includes(n)));
  const campaignIdx = idx(["campaign"]);
  const adSetIdx = idx(["ad set", "adset"]);
  const adIdx = header.findIndex((h, i) => i !== adSetIdx && (h === "ad" || h === "ad name" || h.includes("ad name")));
  const spendIdx = idx(["amount spent", "spend"]);
  const leadsIdx = idx(["leads", "results"]);
  const salesIdx = idx(["purchases", "sales"]);
  const revenueIdx = idx(["revenue", "purchase value"]);

  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const num = (i: number) => (i >= 0 ? parseFloat((cols[i] || "0").replace(/[^0-9.-]/g, "")) || 0 : 0);
    return {
      campaign: campaignIdx >= 0 ? cols[campaignIdx]?.trim() || "—" : "—",
      adSet: adSetIdx >= 0 ? cols[adSetIdx]?.trim() || "—" : "—",
      ad: adIdx >= 0 ? cols[adIdx]?.trim() || "—" : "—",
      spend: num(spendIdx),
      leads: num(leadsIdx),
      sales: num(salesIdx),
      revenue: num(revenueIdx),
    };
  });
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-lg p-4" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold" style={{ color }}>
        {value}
      </p>
      <p className="mt-1 text-[11px]" style={{ color: MUTED }}>
        {sub}
      </p>
    </div>
  );
}

export default function AdsAnalysisTab() {
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns");
  const [dragOver, setDragOver] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const campaigns = useMemo(() => ["All Campaigns", ...Array.from(new Set(rows.map((r) => r.campaign)))], [rows]);
  const filtered = useMemo(
    () => (campaignFilter === "All Campaigns" ? rows : rows.filter((r) => r.campaign === campaignFilter)),
    [rows, campaignFilter]
  );

  const totals = useMemo(() => {
    const spend = filtered.reduce((s, r) => s + r.spend, 0);
    const leads = filtered.reduce((s, r) => s + r.leads, 0);
    const sales = filtered.reduce((s, r) => s + r.sales, 0);
    const revenue = filtered.reduce((s, r) => s + r.revenue, 0);
    return {
      spend,
      leads,
      sales,
      revenue,
      cpl: leads > 0 ? spend / leads : 0,
      cps: sales > 0 ? spend / sales : 0,
      roas: spend > 0 ? revenue / spend : 0,
    };
  }, [filtered]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setRows(parseCsv(String(reader.result || "")));
      setInsight(null);
    };
    reader.readAsText(file);
  };

  const runAnalysis = () => {
    if (filtered.length === 0) {
      setInsight("Upload a CSV first so there's data to analyze.");
      return;
    }
    const best = [...filtered].filter((r) => r.leads > 0).sort((a, b) => a.spend / a.leads - b.spend / b.leads)[0];
    const worst = [...filtered].filter((r) => r.leads > 0).sort((a, b) => b.spend / b.leads - a.spend / a.leads)[0];
    if (best && worst && best.ad !== worst.ad) {
      setInsight(
        `Your most efficient ad is "${best.ad}" at $${(best.spend / best.leads).toFixed(2)} per lead. Your least efficient is "${worst.ad}" at $${(worst.spend / worst.leads).toFixed(2)} per lead — consider pausing or reworking it.`
      );
    } else if (best) {
      setInsight(`"${best.ad}" is running at $${(best.spend / best.leads).toFixed(2)} per lead.`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold" style={{ color: INK }}>
          Ad Performance Tracker
        </h2>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
        <MetricCard label="Total Spend" value={`$${totals.spend.toFixed(2)}`} sub="across all ads" color={GREEN} />
        <MetricCard label="Total Leads" value={String(totals.leads)} sub="from ads" color={BLUE} />
        <MetricCard label="Total Sales" value={String(totals.sales)} sub="conversions" color={PURPLE} />
        <MetricCard label="Total Revenue" value={`$${totals.revenue.toFixed(2)}`} sub="from ads" color={GREEN} />
        <MetricCard label="Avg Cost Per Lead" value={`$${totals.cpl.toFixed(2)}`} sub="CPL" color={AMBER} />
        <MetricCard label="Avg Cost Per Sale" value={`$${totals.cps.toFixed(2)}`} sub="CPS" color={RED} />
        <MetricCard label="Average ROAS" value={`${totals.roas.toFixed(2)}x`} sub="return on ad spend" color={GREEN} />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold" style={{ color: MUTED }}>
          Campaign:
        </label>
        <select
          value={campaignFilter}
          onChange={(e) => setCampaignFilter(e.target.value)}
          className="rounded-md px-3 py-1.5 text-xs font-semibold"
          style={{ background: PANEL, border: `1px solid ${BORDER}`, color: INK }}
        >
          {campaigns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-3 text-sm font-extrabold" style={{ color: INK }}>
          Detailed Ad Performance
        </p>
        <div className="overflow-x-auto rounded-lg" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                {["Campaign", "Ad Set", "Ad", "Spend", "Leads", "Sales", "Revenue", "CPL", "ROAS"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide" style={{ color: MUTED }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-[13px]" style={{ color: MUTED }}>
                    No data yet — upload a CSV below.
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      {r.campaign}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: MUTED }}>
                      {r.adSet}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: MUTED }}>
                      {r.ad}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      ${r.spend.toFixed(2)}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      {r.leads}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      {r.sales}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      ${r.revenue.toFixed(2)}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      {r.leads > 0 ? `$${(r.spend / r.leads).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-[13px]" style={{ color: INK }}>
                      {r.spend > 0 ? `${(r.revenue / r.spend).toFixed(2)}x` : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-14 text-center"
        style={{ border: `2px dashed ${dragOver ? GREEN : BORDER}`, background: dragOver ? "#22c55e0d" : "transparent" }}
      >
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <span className="text-2xl">📁</span>
        <p className="text-sm font-bold" style={{ color: INK }}>
          Drop your Meta Ads CSV here or click to upload
        </p>
        <p className="text-xs" style={{ color: MUTED }}>
          Export from Ads Manager → Customize columns → Export as CSV
        </p>
      </label>

      <button onClick={runAnalysis} className="rounded-lg py-3 text-sm font-bold" style={{ background: INK, color: "#fff" }}>
        Run Analysis
      </button>
      {insight && (
        <div className="rounded-lg p-4 text-[13px] leading-relaxed" style={{ background: PANEL, border: `1px solid ${BORDER}`, color: INK }}>
          {insight}
        </div>
      )}
    </div>
  );
}
