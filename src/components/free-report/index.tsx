"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { hasMinTier } from "@/lib/credits";
import ChartMetaSummary from "./ChartMetaSummary";
import PalaceGrid from "./PalaceGrid";
import FourStatesSummary from "./FourStatesSummary";
import ConsciousnessPanel from "./ConsciousnessPanel";
import DecadeOverview from "./DecadeOverview";
import FableStories from "./FableStories";
import DecadeDeepAnalysis from "./DecadeDeepAnalysis";
import LiuNianTeaser from "./LiuNianTeaser";
import ReportSampleStrip from "./ReportSampleStrip";
import SifuCTABanner from "./SifuCTABanner";
import { getStatesPalaces } from "./shared";
import FullReportPreview from "./FullReportPreview";
import { useCredits } from "@/hooks/useCredits";

/* ─── Main Component ─── */

export default function FreeReport() {
  const t = useTranslations("freeReport");
  const isUnlocked = useDashboardStore((s) => s.isUnlocked);
  const palaces = useMatrixStore((s) => s.palaces);
  const chartMeta = useMatrixStore((s) => s.chartMeta);
  const birthDetails = useVerificationStore((s) => s.birthDetails);
  const snapshotExpired = useDashboardStore((s) => s.snapshotExpired);
  const openAuthModal = useDashboardStore((s) => s.openAuthModal);

  const { data: session } = useSession();

  const userTier = (session?.user as { tier?: string } | undefined)?.tier;
  const isLoggedIn = !!session;
  const isBasicPlus = hasMinTier(userTier, "BASIC");

  const { data: creditsData } = useCredits();
  const [reportGenerating, setReportGenerating] = useState(false);

  const handleGenerateReport = useCallback(async () => {
    if (!session || !palaces.length || !chartMeta) return;
    setReportGenerating(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          palaces: palaces.map((p) => ({
            name: p.name,
            nameCn: p.nameCn,
            stars: p.stars,
            energy: p.energy,
            state: p.state,
            consciousness: p.consciousness,
            decadeRange: p.decadeRange,
            decadeHeavenlyStem: p.decadeHeavenlyStem,
            earthlyBranch: p.earthlyBranch,
          })),
          meta: chartMeta,
          birthDate: birthDetails?.birthYear && birthDetails?.birthMonth && birthDetails?.birthDay
            ? `${birthDetails.birthYear}-${birthDetails.birthMonth.padStart(2, "0")}-${birthDetails.birthDay.padStart(2, "0")}`
            : new Date().toISOString(),
          birthHour: birthDetails?.birthHour ? parseInt(birthDetails.birthHour) : 0,
          birthGender: birthDetails?.gender || "male",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = `/reports/${data.reportId}`;
      }
    } catch (err) {
      console.error("Report generation error:", err);
    } finally {
      setReportGenerating(false);
    }
  }, [session, palaces, chartMeta, birthDetails]);

  const statesPalaces = useMemo(() => getStatesPalaces(palaces), [palaces]);

  // Build user display info
  const displayName = birthDetails?.fullName || "Calibrant";
  const displayMonth = birthDetails?.birthMonth
    ? new Date(2000, parseInt(birthDetails.birthMonth) - 1).toLocaleString("en", { month: "long" })
    : "";
  const displayYear = birthDetails?.birthYear || "";
  const displayGender = birthDetails?.gender
    ? birthDetails.gender.charAt(0).toUpperCase() + birthDetails.gender.slice(1)
    : "";
  const userSummary = [displayName, displayMonth && displayYear ? `${displayMonth} ${displayYear}` : "", displayGender]
    .filter(Boolean)
    .join(" · ");

  if (!isUnlocked) return null;

  return (
    <section
      className="relative py-20 px-4 sm:px-6 celestial-bg overflow-hidden"
      style={{
        filter: snapshotExpired && !session ? "blur(8px) saturate(0.3)" : "none",
        pointerEvents: snapshotExpired && !session ? "none" : "auto",
        transition: "filter 0.5s ease",
      }}
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ─── 1A: Report Header ─── */}
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-green/80 border border-quantum-green/30 rounded-sm">
            {t("reportGenerated")}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold gold-gradient-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {t("sovereignReport")}
          </h2>
          <p className="text-gold-300/60 text-sm tracking-widest font-mono">
            {userSummary}
          </p>
        </div>

        {/* ─── 1B: Chart Meta Summary ─── */}
        {chartMeta && <ChartMetaSummary chartMeta={chartMeta} />}

        {/* ─── 1C: 12 Palace Grid ─── */}
        {palaces.length > 0 && <PalaceGrid palaces={palaces} />}

        {/* ─── 1D: Four States Summary ─── */}
        <FourStatesSummary statesPalaces={statesPalaces} />

        {/* ── Zone divider ── */}
        <div className="relative flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-quantum-cyan/30 to-transparent" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/60">
            {t("unlockSection")}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-quantum-cyan/30 to-transparent" />
        </div>

        {/* ── Zone B: Full Report Preview ── */}
        <div className="relative rounded-xl border border-quantum-cyan/10 bg-gradient-to-b from-quantum-cyan/[0.03] to-transparent p-6 sm:p-8 space-y-12">
          {/* subtle left accent */}
          <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-quantum-cyan/20 to-transparent" />

          {/* ─── 1E: Report Sample Strip (all users) ─── */}
          {palaces.length > 0 && <ReportSampleStrip palaces={palaces} />}

          {/* ─── 1F: Register CTA (anonymous only) ─── */}
          {!isLoggedIn && (
            <div className="relative text-center p-8 sm:p-12 rounded-xl border border-gold-500/30 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

              <h3
                className="text-2xl sm:text-3xl font-bold gold-gradient-text mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {t("unlockFullReading")}
              </h3>
              <p className="text-sm text-parchment-400/70 max-w-md mx-auto mb-8">
                {t("unlockFullReadingDesc")}
              </p>
              <button
                onClick={() => openAuthModal("full_reading")}
                className="inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_30px_rgba(212,165,40,0.3)]"
                style={{
                  background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
                }}
              >
                {t("createFreeAccountCta")}
              </button>
            </div>
          )}

          {/* ─── 1G: Sifu CTA Banner (logged-in only) ─── */}
          {isLoggedIn && <SifuCTABanner />}

          {/* ─── 1H: Full Report Preview (logged-in only) ─── */}
          {isLoggedIn && palaces.length > 0 && chartMeta && (
            <FullReportPreview
              palaces={palaces}
              chartMeta={chartMeta}
              credits={creditsData?.credits ?? 0}
              onGenerate={handleGenerateReport}
              generating={reportGenerating}
            />
          )}

          {/* ─── 1I: Liu Nian Teaser (logged-in only) ─── */}
          {isLoggedIn && palaces.length > 0 && (
            <LiuNianTeaser palaces={palaces} />
          )}

          {/* ─── 1J: Upgrade CTA (FREE only) ─── */}
          {isLoggedIn && !isBasicPlus && (
            <div className="relative text-center p-8 sm:p-10 rounded-xl border border-gold-500/20 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
              <h3
                className="text-xl sm:text-2xl font-bold gold-gradient-text mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {t("goDeeper")}
              </h3>
              <p className="text-sm text-parchment-400/70 max-w-md mx-auto mb-6">
                {t("goDeeperDesc")}
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_30px_rgba(212,165,40,0.3)]"
                style={{
                  background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
                }}
              >
                {t("viewPlans")}
              </a>
            </div>
          )}
        </div>

        {/* ─── BASIC+ Bonus Content ─── */}
        {isLoggedIn && isBasicPlus && (
          <>
            {/* ─── 1K: Consciousness Panel (BASIC+ only) ─── */}
            {palaces.length > 0 && <ConsciousnessPanel palaces={palaces} />}

            {/* ─── 1L: Decade Overview (BASIC+ only) ─── */}
            {chartMeta && <DecadeOverview palaces={palaces} chartMeta={chartMeta} />}

            {/* ─── 1M: Decade Deep Analysis (BASIC+ unlocked) ─── */}
            {chartMeta && <DecadeDeepAnalysis palaces={palaces} chartMeta={chartMeta} userTier={userTier} />}

            {/* ─── 1N: Fable Stories (BASIC+ unlocked) ─── */}
            {palaces.length > 0 && <FableStories palaces={palaces} userTier={userTier} />}
          </>
        )}
      </div>
    </section>
  );
}
