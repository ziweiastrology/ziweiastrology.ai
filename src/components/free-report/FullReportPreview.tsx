"use client";

import { useTranslations } from "next-intl";
import { Lock, FileText, Calendar, Star, TrendingUp, Coins, Loader2 } from "lucide-react";
import type { PalaceDetail, ChartMeta } from "@/types";

interface Props {
  palaces: PalaceDetail[];
  chartMeta: ChartMeta;
  credits: number;
  onGenerate: () => void;
  generating: boolean;
}

const SAMPLE_ANALYSIS = "Your Soul Palace reveals a rare convergence of celestial energies. The presence of the primary star creates a powerful resonance with your life path, suggesting periods of transformation and growth that align with ancient cyclical patterns...";

const SECTIONS = [
  {
    icon: Star,
    titleKey: "section12Palace" as const,
    descKey: "section12PalaceDesc" as const,
    color: "text-quantum-cyan",
    borderColor: "border-quantum-cyan/20",
  },
  {
    icon: Calendar,
    titleKey: "sectionDecade" as const,
    descKey: "sectionDecadeDesc" as const,
    color: "text-quantum-orange",
    borderColor: "border-quantum-orange/20",
  },
  {
    icon: TrendingUp,
    titleKey: "sectionLifePath" as const,
    descKey: "sectionLifePathDesc" as const,
    color: "text-quantum-green",
    borderColor: "border-quantum-green/20",
  },
  {
    icon: FileText,
    titleKey: "sectionCareer" as const,
    descKey: "sectionCareerDesc" as const,
    color: "text-gold-400",
    borderColor: "border-gold-500/20",
  },
];

export default function FullReportPreview({ palaces, chartMeta, credits, onGenerate, generating }: Props) {
  const t = useTranslations("freeReport");
  const hasEnoughCredits = credits >= 8;

  return (
    <div className="relative p-6 sm:p-8 rounded-xl border border-gold-500/30 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/80 border border-quantum-cyan/30 rounded-sm mb-4">
          {t("fullReportPreview")}
        </span>
        <h3
          className="text-2xl sm:text-3xl font-bold gold-gradient-text"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {t("completeAnalysis")}
        </h3>
        <p className="text-sm text-parchment-400/70 mt-2 max-w-lg mx-auto">
          {t("completeAnalysisDesc")}
        </p>
      </div>

      {/* Section cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {SECTIONS.map((section) => (
          <div
            key={section.titleKey}
            className={`relative p-4 rounded-lg border ${section.borderColor} bg-celestial-900/60 overflow-hidden`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 mt-0.5 ${section.color}`}>
                <section.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-parchment-200 mb-1">
                  {t(section.titleKey)}
                </h4>
                <p className="text-xs text-parchment-500 leading-relaxed">
                  {t(section.descKey)}
                </p>
              </div>
            </div>
            {/* Lock overlay */}
            <div className="absolute top-3 right-3">
              <Lock className="h-3.5 w-3.5 text-gold-600/50" />
            </div>
          </div>
        ))}
      </div>

      {/* Palace list preview */}
      <div className="mb-6 p-4 rounded-lg border border-gold-700/15 bg-celestial-900/30">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold-600 mb-3">
          {t("palacesIncluded")}
        </p>
        <div className="flex flex-wrap gap-2">
          {palaces.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-sm border border-gold-700/20 bg-celestial-800/50 text-parchment-400"
            >
              <span className="text-gold-500">{p.nameCn}</span>
              <span className="text-parchment-600">{p.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Blurred sample */}
      <div className="mb-8 p-4 rounded-lg border border-gold-700/10 bg-celestial-900/20 relative overflow-hidden">
        <p className="text-xs text-parchment-400/80 leading-relaxed blur-[6px] select-none pointer-events-none">
          {SAMPLE_ANALYSIS}
        </p>
        <div className="absolute inset-0 flex items-center justify-center bg-celestial-900/20">
          <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-celestial-800/90 border border-gold-700/30">
            <Lock className="h-4 w-4 text-gold-500" />
            <span className="text-xs text-gold-400 font-medium">{t("generateToUnlock")}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-parchment-400">
            <Coins className="h-4 w-4 text-gold-500" />
            {t("cost")} <span className="font-semibold text-gold-400">{t("creditsCost")}</span>
          </span>
          <span className="text-parchment-600">|</span>
          <span className="text-parchment-400">
            {t("balance")} <span className={`font-semibold ${hasEnoughCredits ? "text-quantum-green" : "text-quantum-red"}`}>{credits}</span>
          </span>
        </div>

        <button
          onClick={onGenerate}
          disabled={generating || !hasEnoughCredits}
          className="inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_30px_rgba(212,165,40,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          style={{
            background: hasEnoughCredits
              ? "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)"
              : "linear-gradient(135deg, #555, #777, #555)",
          }}
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("generatingReport")}
            </>
          ) : !hasEnoughCredits ? (
            t("notEnoughCredits")
          ) : (
            t("generateFullReport")
          )}
        </button>

        {!hasEnoughCredits && (
          <p className="text-xs text-parchment-500">
            <a href="/pricing" className="text-gold-400 hover:text-gold-300 underline">
              {t("upgradePlan")}
            </a>
            {" "}{t("upgradeForCredits")}
          </p>
        )}
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
    </div>
  );
}
