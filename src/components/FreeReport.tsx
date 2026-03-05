"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Coins, Unlock, Briefcase, Heart, Home, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useCredits, useSpendCredits } from "@/hooks/useCredits";
import { CREDIT_COSTS } from "@/lib/credits";
import InsufficientCreditsModal from "@/components/credits/InsufficientCreditsModal";
import type { PalaceDetail } from "@/types";

/* ─── Helpers ─── */

function getTopPalaces(palaces: PalaceDetail[], n: number) {
  return [...palaces].sort((a, b) => b.energy - a.energy).slice(0, n);
}

function getStatesPalaces(palaces: PalaceDetail[]) {
  const map: Record<"lu" | "quan" | "ke" | "ji", PalaceDetail | null> = {
    lu: null,
    quan: null,
    ke: null,
    ji: null,
  };
  for (const p of palaces) {
    if (p.state !== "neutral" && map[p.state] === null) {
      map[p.state] = p;
    }
  }
  return map;
}

const STATE_META: Record<
  "lu" | "quan" | "ke" | "ji",
  { label: string; labelCn: string; color: string; icon: string }
> = {
  lu: { label: "Lu", labelCn: "禄", color: "text-quantum-green", icon: "▲" },
  quan: { label: "Quan", labelCn: "权", color: "text-quantum-orange", icon: "◆" },
  ke: { label: "Ke", labelCn: "科", color: "text-quantum-cyan", icon: "●" },
  ji: { label: "Ji", labelCn: "忌", color: "text-quantum-red", icon: "✦" },
};

function buildInsightNarrative(
  deductions: { id: string; title: string; description: string }[],
  responses: Record<string, string>
) {
  const confirmed = deductions.filter((d) => responses[d.id] === "yes");
  if (confirmed.length === 0) {
    return "Your calibration data reveals a distinctive life-path signature. The convergence of your palace energies and confirmed life events indicates a pattern of sovereign decision-making that few charts display with such clarity.";
  }
  if (confirmed.length === 1) {
    return `Your confirmed pattern \u2014 "${confirmed[0].title}" \u2014 anchors a distinctive life-path signature. ${confirmed[0].description.slice(0, 120)}... This resonance ripples through your entire 12-palace matrix, creating a unique sovereign frequency.`;
  }
  return `Two confirmed patterns converge in your chart: "${confirmed[0].title}" and "${confirmed[1].title}." ${confirmed[0].description.slice(0, 100)}... Combined with ${confirmed[1].description.slice(0, 100).toLowerCase()}... This dual resonance is rare \u2014 it suggests a life-path operating on multiple frequencies simultaneously.`;
}

/* ─── Energy Ring SVG ─── */

function EnergyRing({ energy, size = 72 }: { energy: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (energy / 100) * circumference;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(212,165,40,0.1)"
        strokeWidth="3"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(212,165,40,0.7)"
        strokeWidth="3"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text
        x={size / 2}
        y={size / 2 - 4}
        textAnchor="middle"
        fill="rgba(212,165,40,0.9)"
        fontSize="14"
        fontWeight="bold"
      >
        {energy}%
      </text>
      <text
        x={size / 2}
        y={size / 2 + 10}
        textAnchor="middle"
        fill="rgba(212,165,40,0.5)"
        fontSize="8"
      >
        ENERGY
      </text>
    </svg>
  );
}

/* ─── State Badge ─── */

function StateBadge({ state }: { state: "lu" | "quan" | "ke" | "ji" }) {
  const meta = STATE_META[state];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border ${meta.color}`}
      style={{
        borderColor: "currentColor",
        opacity: 0.8,
      }}
    >
      {meta.icon} {meta.labelCn} {meta.label}
    </span>
  );
}

/* ─── 流年 Topic Config ─── */

const LIU_NIAN_TOPICS = [
  {
    key: "career",
    labelCn: "事业",
    labelEn: "Career",
    icon: Briefcase,
    primaryPalace: "career",
    primaryPalaceCn: "官禄宫",
    supportPalace: "wealth",
    prompt: "Analyze my 2026 career 流年 based on my 官禄宫 and 财帛宫. What opportunities and challenges do you see?",
  },
  {
    key: "love",
    labelCn: "感情",
    labelEn: "Love",
    icon: Heart,
    primaryPalace: "spouse",
    primaryPalaceCn: "夫妻宫",
    supportPalace: "fortune",
    prompt: "Analyze my 2026 love and relationships 流年 based on my 夫妻宫 and 福德宫. What does the year hold?",
  },
  {
    key: "family",
    labelCn: "家庭",
    labelEn: "Family",
    icon: Home,
    primaryPalace: "property",
    primaryPalaceCn: "田宅宫",
    supportPalace: "parents",
    prompt: "Analyze my 2026 family 流年 based on my 田宅宫 and 父母宫. What changes or focus areas do you see?",
  },
];

function buildTeaser(palace: PalaceDetail | undefined, palaceCn: string): string {
  if (!palace) return `Your ${palaceCn} holds unique patterns worth exploring...`;
  const mainStar = palace.stars[0] || "key stars";
  const stateLabel =
    palace.state === "lu" ? "[禄]" : palace.state === "quan" ? "[权]" : palace.state === "ke" ? "[科]" : palace.state === "ji" ? "[忌]" : "";
  const narratives: Record<string, string> = {
    lu: `a year of abundance and new opportunities flowing in`,
    quan: `a year of authority and decisive power emerging`,
    ke: `a year of recognition and scholarly achievement`,
    ji: `a year requiring careful navigation and transformation`,
    neutral: `shifting energies that shape your path forward`,
  };
  return `Your ${palaceCn} holds ${mainStar}${stateLabel} — ${narratives[palace.state] || narratives.neutral}...`;
}

function LiuNianTeaser({ palaces }: { palaces: PalaceDetail[] }) {
  const { toggleCopilot, setCopilotInitialPrompt, openAuthModal } = useDashboardStore();
  const { data: session } = useSession();

  const handleCardClick = useCallback(
    (prompt: string) => {
      if (!session) {
        openAuthModal("copilot");
        return;
      }
      setCopilotInitialPrompt(prompt);
      toggleCopilot();
    },
    [session, setCopilotInitialPrompt, toggleCopilot, openAuthModal]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative p-8 sm:p-10 rounded-xl border border-gold-500/20 bg-gradient-to-b from-celestial-900/90 to-celestial-800/50"
    >
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-quantum-cyan/50 to-transparent" />

      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/80 border border-quantum-cyan/30 rounded-sm mb-3">
          <Sparkles className="h-3 w-3" />
          2026 流年 FORECAST
        </span>
        <h3
          className="text-xl sm:text-2xl font-bold gold-gradient-text"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Your Year Ahead
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {LIU_NIAN_TOPICS.map((topic) => {
          const palace = palaces.find((p) => p.id === topic.primaryPalace);
          const teaser = buildTeaser(palace, topic.primaryPalaceCn);

          return (
            <button
              key={topic.key}
              onClick={() => handleCardClick(topic.prompt)}
              className="relative group p-5 rounded-lg border border-gold-700/20 bg-celestial-900/60 text-left overflow-hidden
                         hover:border-gold-500/40 transition-all duration-300"
            >
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-700/30 flex items-center justify-center">
                    <topic.icon className="h-4 w-4 text-gold-500/70" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-parchment-200">
                      {topic.labelCn} {topic.labelEn}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-parchment-400/70 leading-relaxed line-clamp-2">
                  {teaser}
                </p>
              </div>

              {/* Blur overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-celestial-900/80 via-celestial-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* CTA overlay */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400 group-hover:text-gold-300 transition-colors">
                  Ask ZiWei Sifu →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <a
          href="/pricing"
          className="text-xs text-parchment-500 hover:text-gold-400 transition-colors"
        >
          Or subscribe for unlimited daily insights →
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */

export default function FreeReport() {
  const isUnlocked = useDashboardStore((s) => s.isUnlocked);
  const palaces = useMatrixStore((s) => s.palaces);
  const birthDetails = useVerificationStore((s) => s.birthDetails);
  const deductions = useVerificationStore((s) => s.deductions);
  const responses = useVerificationStore((s) => s.responses);

  const { data: session } = useSession();
  const { data: creditsData } = useCredits();
  const spendMutation = useSpendCredits();
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);

  const topPalaces = useMemo(() => getTopPalaces(palaces, 3), [palaces]);
  const statesPalaces = useMemo(() => getStatesPalaces(palaces), [palaces]);
  const narrative = useMemo(
    () => buildInsightNarrative(deductions, responses),
    [deductions, responses]
  );
  const remainingPalaces = useMemo(() => {
    const topIds = new Set(topPalaces.map((p) => p.id));
    return palaces.filter((p) => !topIds.has(p.id));
  }, [palaces, topPalaces]);

  const openAuthModal = useDashboardStore((s) => s.openAuthModal);
  const snapshotExpired = useDashboardStore((s) => s.snapshotExpired);

  const handleUnlockPalace = useCallback(
    async (palaceId: string) => {
      if (!session) {
        openAuthModal("palace");
        return;
      }
      const credits = creditsData?.credits ?? 0;
      if (credits < CREDIT_COSTS.PALACE_UNLOCK) {
        setShowModal(true);
        return;
      }
      const result = await spendMutation.mutateAsync({
        action: "PALACE_UNLOCK",
        palaceId,
      });
      if (result.success) {
        setUnlockedIds((prev) => new Set([...prev, palaceId]));
      } else {
        setShowModal(true);
      }
    },
    [session, creditsData, spendMutation, openAuthModal]
  );

  const handleUnlockAll = useCallback(async () => {
    if (!session) {
      openAuthModal("full_reading");
      return;
    }
    const credits = creditsData?.credits ?? 0;
    if (credits < CREDIT_COSTS.FULL_READING) {
      setShowModal(true);
      return;
    }
    const result = await spendMutation.mutateAsync({ action: "FULL_READING" });
    if (result.success) {
      setUnlockedIds(new Set(remainingPalaces.map((p) => p.id)));
    } else {
      setShowModal(true);
    }
  }, [session, creditsData, spendMutation, remainingPalaces, openAuthModal]);

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
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
        </motion.div>

        {/* ─── 1B: Top 3 Palace Cards ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
            TOP 3 PALACE ENERGIES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topPalaces.map((palace, i) => (
              <motion.div
                key={palace.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="relative p-5 rounded-lg border border-gold-700/30 bg-celestial-900/60 backdrop-blur-sm hover:border-gold-500/50 transition-colors duration-300"
              >
                {/* Palace name */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3
                      className="text-base font-semibold text-gold-300"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {palace.nameCn} {palace.name}
                    </h3>
                    <p className="text-[11px] text-gold-500/50 font-mono mt-0.5">
                      {palace.subtitle}
                    </p>
                  </div>
                  {palace.state !== "neutral" && (
                    <StateBadge state={palace.state} />
                  )}
                </div>

                {/* Energy ring */}
                <div className="w-20 h-20 mx-auto my-3">
                  <EnergyRing energy={palace.energy} />
                </div>

                {/* Consciousness excerpt */}
                <p className="text-xs text-parchment-400/70 leading-relaxed mt-3">
                  {palace.consciousness.slice(0, 100)}
                  {palace.consciousness.length > 100 ? "..." : ""}
                </p>

                {/* Stars */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {palace.stars.map((star) => (
                    <span
                      key={star}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gold-700/10 text-gold-500/50 tracking-wider"
                    >
                      {star}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── 1C: Four States Summary ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
            FOUR TRANSFORMERS · 四化
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["lu", "quan", "ke", "ji"] as const).map((key) => {
              const meta = STATE_META[key];
              const palace = statesPalaces[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gold-700/20 bg-celestial-900/40"
                >
                  <span className={`text-lg ${meta.color}`}>{meta.icon}</span>
                  <div>
                    <p className={`text-xs font-semibold ${meta.color}`}>
                      {meta.labelCn} {meta.label}
                    </p>
                    <p className="text-[10px] text-gold-500/50 font-mono">
                      {palace ? `${palace.nameCn}宫 ${palace.name}` : "—"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── 1D: Life Pattern Insight ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative p-6 rounded-lg border border-gold-700/20 bg-celestial-900/40"
        >
          <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/70 border border-quantum-cyan/20 rounded-sm mb-4">
            [PATTERN ANALYSIS]
          </span>
          <p className="text-sm text-parchment-300/80 leading-relaxed">
            {narrative}
          </p>
        </motion.div>

        {/* ─── 1E: Remaining Palaces (unlock with credits) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50">
              REMAINING PALACES
            </p>
            {session && remainingPalaces.some((p) => !unlockedIds.has(p.id)) && (
              <button
                onClick={handleUnlockAll}
                disabled={spendMutation.isPending}
                className="flex items-center gap-1.5 rounded-md border border-gold-700/30 bg-gold-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400 transition-all hover:border-gold-500/50 hover:bg-gold-500/20 disabled:opacity-50"
              >
                <Unlock className="h-3 w-3" />
                Unlock All
                <span className="flex items-center gap-0.5">
                  <Coins className="h-2.5 w-2.5" />
                  {CREDIT_COSTS.FULL_READING}
                </span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {remainingPalaces.map((palace) => {
              const isRevealed = !!session; // registered = all revealed
              return (
                <div
                  key={palace.id}
                  className="relative rounded-lg border border-gold-700/20 bg-celestial-900/40 overflow-hidden"
                >
                  {isRevealed ? (
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gold-400">
                        {palace.nameCn} {palace.name}
                      </p>
                      <p className="text-[10px] text-gold-500/40 mt-1">
                        Energy: {palace.energy}%
                      </p>
                      <p className="text-[10px] text-parchment-400/60 mt-2 leading-relaxed">
                        {palace.consciousness}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUnlockPalace(palace.id)}
                      disabled={spendMutation.isPending}
                      className="w-full p-4 text-left group transition-all hover:bg-celestial-800/40 disabled:opacity-50"
                    >
                      <div className="blur-[4px] select-none pointer-events-none">
                        <p className="text-xs font-semibold text-gold-400">
                          {palace.nameCn} {palace.name}
                        </p>
                        <p className="text-[10px] text-gold-500/40 mt-1">
                          Energy: {palace.energy}%
                        </p>
                        <p className="text-[10px] text-parchment-400/50 mt-1">
                          {palace.consciousness.slice(0, 60)}...
                        </p>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-celestial-900/50">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-gold-500/50 mb-1 group-hover:text-gold-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                          />
                        </svg>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-gold-500/60 group-hover:text-gold-400 transition-colors">
                          <Coins className="h-2.5 w-2.5" />
                          {CREDIT_COSTS.PALACE_UNLOCK} credit
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── 1F: CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative text-center p-8 sm:p-12 rounded-xl border border-gold-500/30 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40"
        >
          {/* Corner glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

          <h3
            className="text-2xl sm:text-3xl font-bold gold-gradient-text mb-3"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Unlock Your Full Sovereign Reading
          </h3>
          <p className="text-sm text-parchment-400/70 max-w-md mx-auto mb-8">
            Use credits to unlock palaces and chat with ZiWei Sifu AI.
            Credits refresh daily — or upgrade for more.
          </p>

          {session ? (
            <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gold-300">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{creditsData?.credits ?? 0}</span>
              <span className="text-parchment-500">credits remaining</span>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("full_reading")}
              className="mb-6 inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_30px_rgba(212,165,40,0.3)]"
              style={{
                background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
              }}
            >
              Create Free Account to Continue
            </button>
          )}
        </motion.div>

        {/* ─── 1G: 流年 Teaser (registered users only) ─── */}
        {session && palaces.length > 0 && (
          <LiuNianTeaser palaces={palaces} />
        )}

        {/* Insufficient Credits Modal */}
        <InsufficientCreditsModal
          open={showModal}
          onClose={() => setShowModal(false)}
          credits={creditsData?.credits ?? 0}
          needed={CREDIT_COSTS.PALACE_UNLOCK}
        />
      </div>
    </section>
  );
}
