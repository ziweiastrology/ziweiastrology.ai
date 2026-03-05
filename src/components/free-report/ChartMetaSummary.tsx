"use client";

import type { ChartMeta } from "@/types";

interface ChartMetaSummaryProps {
  chartMeta: ChartMeta;
}

export default function ChartMetaSummary({ chartMeta }: ChartMetaSummaryProps) {
  const items = [
    { label: "命宫 Soul", value: chartMeta.soulPalace },
    { label: "身宫 Body", value: chartMeta.bodyPalace },
    { label: "五行局", value: chartMeta.fiveElementsClass },
    { label: "生肖", value: chartMeta.zodiac },
    { label: "星座", value: chartMeta.sign },
    { label: "阴历", value: chartMeta.lunarDate },
  ].filter((item) => item.value);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-700/20 bg-celestial-900/40"
        >
          <span className="text-[10px] font-mono text-gold-500/50 uppercase tracking-wider">
            {item.label}
          </span>
          <span className="text-xs font-semibold text-gold-300">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
