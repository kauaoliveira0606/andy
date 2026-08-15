"use client";

import { useState } from "react";
import FinancialModelTab from "./FinancialModelTab";
import CapacityModelTab from "./CapacityModelTab";

const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";

type SubTab = "financial" | "capacity";

const SUB_TABS: { label: string; value: SubTab }[] = [
  { label: "Financial Model", value: "financial" },
  { label: "Capacity Model", value: "capacity" },
];

export default function ModelsTab() {
  const [sub, setSub] = useState<SubTab>("financial");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 border-b" style={{ borderColor: BORDER }}>
        {SUB_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setSub(t.value)}
            className="pb-2 text-sm font-bold transition-colors"
            style={{
              color: sub === t.value ? INK : MUTED,
              borderBottom: sub === t.value ? `2px solid ${INK}` : "2px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sub === "financial" && <FinancialModelTab />}
      {sub === "capacity" && <CapacityModelTab />}
    </div>
  );
}
