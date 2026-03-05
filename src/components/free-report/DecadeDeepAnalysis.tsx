"use client";

import type { PalaceDetail, ChartMeta } from "@/types";
import LockedSection from "./LockedSection";

interface DecadeDeepAnalysisProps {
  palaces: PalaceDetail[];
  chartMeta: ChartMeta;
  userTier: string | undefined;
}

export default function DecadeDeepAnalysis({
  palaces,
  chartMeta,
  userTier,
}: DecadeDeepAnalysisProps) {
  const currentAge = new Date().getFullYear() - chartMeta.birthYear;
  const currentDecade = palaces.find(
    (p) => p.decadeRange && currentAge >= p.decadeRange[0] && currentAge <= p.decadeRange[1]
  );

  if (!currentDecade || !currentDecade.decadeHeavenlyStem) return null;

  // Build preview content showing the structure but blurred
  const previewContent = (
    <div>
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
        DECADE DEEP ANALYSIS · 大限深度分析
      </p>
      <div className="p-4 rounded-lg border border-gold-700/15 bg-celestial-900/30">
        <h4 className="text-xs font-semibold text-gold-400 mb-2">
          {currentDecade.nameCn} 大限 ({currentDecade.decadeRange![0]}–{currentDecade.decadeRange![1]})
        </h4>
        <p className="text-xs text-parchment-400/70 leading-relaxed">
          天干: {currentDecade.decadeHeavenlyStem} · 飞星四化 analysis reveals key transformations
          affecting your career, relationships, and wealth during this decade. The interplay of
          禄权科忌 across your natal and decade palaces creates a unique energetic signature...
        </p>
        <div className="mt-3 space-y-2">
          <div className="h-3 rounded bg-gold-700/10 w-full" />
          <div className="h-3 rounded bg-gold-700/10 w-4/5" />
          <div className="h-3 rounded bg-gold-700/10 w-3/5" />
        </div>
      </div>
    </div>
  );

  return (
    <LockedSection
      requiredTier="BASIC"
      userTier={userTier}
      title="Decade Deep Analysis — Unlock with BASIC+"
      preview={previewContent}
    >
      <div className="p-6 rounded-xl border border-gold-700/20 bg-celestial-900/40">
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
          DECADE DEEP ANALYSIS · 大限深度分析
        </p>
        <div className="p-4 rounded-lg border border-gold-700/15 bg-celestial-900/30">
          <h4
            className="text-base font-semibold text-gold-300 mb-3"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {currentDecade.nameCn} 大限 ({currentDecade.decadeRange![0]}–{currentDecade.decadeRange![1]})
          </h4>
          <div className="space-y-3 text-xs text-parchment-400/70 leading-relaxed">
            <div className="flex items-center gap-3 text-[11px] font-mono text-gold-500/60 mb-3">
              <span>天干: {currentDecade.decadeHeavenlyStem}</span>
              {currentDecade.earthlyBranch && (
                <span>地支: {currentDecade.earthlyBranch}</span>
              )}
            </div>
            <p>
              During this decade ({currentDecade.decadeRange![0]}–{currentDecade.decadeRange![1]}),
              the {currentDecade.decadeHeavenlyStem} heavenly stem activates specific 飞星四化
              (Flying Star Four Transformations) across your natal chart.
            </p>
            <p>
              The stars in your {currentDecade.nameCn} — {currentDecade.stars.join(", ")} —
              interact with the decade&apos;s four transformations to create a distinctive
              energetic pattern with {currentDecade.energy}% activation energy.
            </p>
            <p>
              This period emphasizes themes of {currentDecade.name.toLowerCase()},
              shaped by the convergence of natal and decade-level influences.
            </p>
          </div>
        </div>
      </div>
    </LockedSection>
  );
}
