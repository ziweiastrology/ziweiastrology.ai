"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import ChartMetaSummary from "./ChartMetaSummary";
import PalaceGrid from "./PalaceGrid";
import FourStatesSummary from "./FourStatesSummary";
import ConsciousnessPanel from "./ConsciousnessPanel";
import DecadeOverview from "./DecadeOverview";
import FableStories from "./FableStories";
import DecadeDeepAnalysis from "./DecadeDeepAnalysis";
import LiuNianTeaser from "./LiuNianTeaser";
import { getStatesPalaces, buildInsightNarrative } from "./shared";

/* ─── Main Component ─── */

export default function FreeReport() {
  const isUnlocked = useDashboardStore((s) => s.isUnlocked);
  const palaces = useMatrixStore((s) => s.palaces);
  const chartMeta = useMatrixStore((s) => s.chartMeta);
  const birthDetails = useVerificationStore((s) => s.birthDetails);
  const deductions = useVerificationStore((s) => s.deductions);
  const responses = useVerificationStore((s) => s.responses);
  const snapshotExpired = useDashboardStore((s) => s.snapshotExpired);
  const openAuthModal = useDashboardStore((s) => s.openAuthModal);

  const { data: session } = useSession();

  const userTier = (session?.user as { tier?: string } | undefined)?.tier;
  const isLoggedIn = !!session;

  const statesPalaces = useMemo(() => getStatesPalaces(palaces), [palaces]);
  const narrative = useMemo(
    () => buildInsightNarrative(deductions, responses),
    [deductions, responses]
  );

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
            [REPORT GENERATED]
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold gold-gradient-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Your Sovereign Life-Path Report
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

        {/* ─── 1E: Register CTA (anonymous only) ─── */}
        {!isLoggedIn && (
          <div className="relative text-center p-8 sm:p-12 rounded-xl border border-gold-500/30 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

            <h3
              className="text-2xl sm:text-3xl font-bold gold-gradient-text mb-3"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Unlock Your Full Reading
            </h3>
            <p className="text-sm text-parchment-400/70 max-w-md mx-auto mb-8">
              Create a free account to unlock consciousness readings, pattern analysis,
              decade overview, and preview premium content.
            </p>
            <button
              onClick={() => openAuthModal("full_reading")}
              className="inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_30px_rgba(212,165,40,0.3)]"
              style={{
                background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
              }}
            >
              Create Free Account to Continue
            </button>
          </div>
        )}

        {/* ─── 1F: Consciousness Panel (FREE+ only) ─── */}
        {isLoggedIn && palaces.length > 0 && (
          <ConsciousnessPanel palaces={palaces} />
        )}

        {/* ─── 1G: Pattern Analysis (FREE+ only) ─── */}
        {isLoggedIn && (
          <div className="relative p-6 rounded-lg border border-gold-700/20 bg-celestial-900/40">
            <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/70 border border-quantum-cyan/20 rounded-sm mb-4">
              [PATTERN ANALYSIS]
            </span>
            <p className="text-sm text-parchment-300/80 leading-relaxed">
              {narrative}
            </p>
          </div>
        )}

        {/* ─── 1H: Decade Overview (FREE+ only) ─── */}
        {isLoggedIn && chartMeta && (
          <DecadeOverview palaces={palaces} chartMeta={chartMeta} />
        )}

        {/* ─── 1J: Fable Stories (BASIC+ only, blurred for FREE) ─── */}
        {isLoggedIn && palaces.length > 0 && (
          <FableStories palaces={palaces} userTier={userTier} />
        )}

        {/* ─── 1K: Decade Deep Analysis (BASIC+ only, blurred for FREE) ─── */}
        {isLoggedIn && chartMeta && (
          <DecadeDeepAnalysis palaces={palaces} chartMeta={chartMeta} userTier={userTier} />
        )}

        {/* ─── 1L: Liu Nian Teaser (logged in only) ─── */}
        {isLoggedIn && palaces.length > 0 && (
          <LiuNianTeaser palaces={palaces} />
        )}

        {/* ─── 1M: Upgrade CTA (FREE only, not for BASIC+) ─── */}
        {isLoggedIn && userTier !== "BASIC" && userTier !== "PREMIUM" && userTier !== "SIFU" && (
          <div className="relative text-center p-8 sm:p-10 rounded-xl border border-gold-500/20 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            <h3
              className="text-xl sm:text-2xl font-bold gold-gradient-text mb-3"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Go Deeper
            </h3>
            <p className="text-sm text-parchment-400/70 max-w-md mx-auto mb-6">
              Unlock palace fables, decade deep analysis, and more with a BASIC subscription.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_30px_rgba(212,165,40,0.3)]"
              style={{
                background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
              }}
            >
              View Plans
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
