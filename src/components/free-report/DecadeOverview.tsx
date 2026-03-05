"use client";

import type { PalaceDetail, ChartMeta } from "@/types";

interface DecadeOverviewProps {
  palaces: PalaceDetail[];
  chartMeta: ChartMeta;
}

export default function DecadeOverview({ palaces, chartMeta }: DecadeOverviewProps) {
  const currentAge = new Date().getFullYear() - chartMeta.birthYear;
  const currentDecade = palaces.find(
    (p) => p.decadeRange && currentAge >= p.decadeRange[0] && currentAge <= p.decadeRange[1]
  );

  if (!currentDecade) return null;

  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
        CURRENT DECADE · 当前大限
      </p>
      <div className="p-5 rounded-lg border border-gold-700/20 bg-celestial-900/40">
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <div>
            <h4
              className="text-base font-semibold text-gold-300"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {currentDecade.nameCn} {currentDecade.name}
            </h4>
            <p className="text-[10px] text-gold-500/40 font-mono mt-0.5">
              {currentDecade.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-gold-500/60">
            <span>Age {currentDecade.decadeRange![0]}–{currentDecade.decadeRange![1]}</span>
            <span>·</span>
            <span>Current age: {currentAge}</span>
            {currentDecade.decadeHeavenlyStem && (
              <>
                <span>·</span>
                <span>{currentDecade.decadeHeavenlyStem}{currentDecade.earthlyBranch}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {currentDecade.stars.map((star) => (
            <span
              key={star}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gold-700/10 text-gold-500/50 tracking-wider"
            >
              {star}
            </span>
          ))}
        </div>
        <p className="text-xs text-parchment-400/70 leading-relaxed">
          Energy level: {currentDecade.energy}% — This decade shapes your{" "}
          {currentDecade.name.toLowerCase()} through the influence of{" "}
          {currentDecade.stars.slice(0, 2).join(" and ")}.
        </p>
      </div>
    </div>
  );
}
