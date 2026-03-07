"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { PALACE_ICON_MAP } from "./palaceIcons";
import type { PalaceDetail } from "@/types";

// 流年: next year whose earthly branch matches the palace position
const BRANCH_INDEX: Record<string, number> = {
  "子": 0, "丑": 1, "寅": 2, "卯": 3, "辰": 4, "巳": 5,
  "午": 6, "未": 7, "申": 8, "酉": 9, "戌": 10, "亥": 11,
};

function nextLiuNianYear(branch: string): number {
  const now = new Date().getFullYear();
  const target = BRANCH_INDEX[branch] ?? 0;
  const current = ((now - 4) % 12 + 12) % 12;
  const diff = ((target - current) % 12 + 12) % 12;
  return diff === 0 ? now : now + diff;
}

const STATE_COLORS: Record<string, string> = {
  lu: "rgba(68,255,136,0.4)",
  quan: "rgba(255,215,0,0.45)",
  ke: "rgba(68,200,255,0.4)",
  ji: "rgba(255,68,68,0.4)",
};

const HUA_INFO: Record<string, { label: string; en: string; labelShort: string; desc: string; descEn: string }> = {
  ji:   { label: "化忌", en: "Hua Ji",   labelShort: "忌 JI",   desc: "此宫面临挑战与阻碍，需要关注与转化", descEn: "Challenges & obstacles — an area requiring attention" },
  lu:   { label: "化禄", en: "Hua Lu",   labelShort: "禄 LU",   desc: "此宫财运亨通，能量顺遂丰盛", descEn: "Wealth & abundance — energy flows smoothly here" },
  quan: { label: "化权", en: "Hua Quan", labelShort: "权 QUAN", desc: "此宫权力强势，掌控力与领导力突出", descEn: "Authority & control — strong leadership energy" },
  ke:   { label: "化科", en: "Hua Ke",   labelShort: "科 KE",   desc: "此宫才华显现，学术与名望之星", descEn: "Fame & knowledge — intellectual brilliance shines" },
};

const STATE_BADGE_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  lu:   { bg: "rgba(68,255,136,0.15)", text: "#44ff88", glow: "0 0 8px rgba(68,255,136,0.4)" },
  quan: { bg: "rgba(255,215,0,0.15)",  text: "#ffd700", glow: "0 0 8px rgba(255,215,0,0.4)" },
  ke:   { bg: "rgba(68,200,255,0.15)", text: "#44c8ff", glow: "0 0 8px rgba(68,200,255,0.4)" },
  ji:   { bg: "rgba(255,68,68,0.15)",  text: "#ff4444", glow: "0 0 8px rgba(255,68,68,0.4)" },
};

const STATE_BORDER_GLOW: Record<string, string> = {
  lu: "0 0 12px rgba(68,255,136,0.3)",
  quan: "0 0 12px rgba(255,215,0,0.3)",
  ke: "0 0 12px rgba(68,200,255,0.3)",
  ji: "0 0 12px rgba(255,68,68,0.3)",
};

interface PalaceNodeProps {
  palace: PalaceDetail;
  index: number;
  locked?: boolean;
  onLockedClick?: (palaceId: string) => void;
}

export default function PalaceNode({
  palace,
  index,
  locked = false,
  onLockedClick,
}: PalaceNodeProps) {
  const selectPalace = useMatrixStore((s) => s.selectPalace);
  const selectedPalaceId = useMatrixStore((s) => s.selectedPalaceId);
  const birthYear = useMatrixStore((s) => s.chartMeta?.birthYear);
  const { toggleCopilot, setCopilotInitialPrompt, openAuthModal } = useDashboardStore();
  const { data: session } = useSession();
  const [pulseKey, setPulseKey] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Current age for 小限 highlighting
  const currentAge = birthYear ? new Date().getFullYear() - birthYear : null;

  const IconComponent = PALACE_ICON_MAP[palace.icon];
  const isSelected = selectedPalaceId === palace.id;
  const isActive = palace.state !== "neutral";
  const glowColor = STATE_COLORS[palace.state];
  const borderGlow = STATE_BORDER_GLOW[palace.state];

  const handleClick = useCallback(() => {
    if (locked) {
      onLockedClick?.(palace.id);
      return;
    }
    setPulseKey((k) => k + 1);
    selectPalace(palace.id);
  }, [locked, onLockedClick, selectPalace, palace.id]);

  const handleBadgeEnter = useCallback(() => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltipOpen(true);
  }, []);

  const handleBadgeLeave = useCallback(() => {
    tooltipTimeout.current = setTimeout(() => setTooltipOpen(false), 150);
  }, []);

  const handleBadgeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setTooltipOpen((v) => !v);
  }, []);

  const handleAskSifu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      openAuthModal("copilot");
      return;
    }
    const huaInfo = HUA_INFO[palace.state];
    const starNames = palace.stars.map((s) => s.replace(/\[.+\]$/, "").split(/\s/)[0]).join("、");
    const prompt = `请分析我的${palace.nameCn}${huaInfo?.label ?? ""}（${huaInfo?.en ?? palace.state} in ${palace.name} palace）对我有什么影响？这个宫位有${starNames || "无主星"}。`;
    setCopilotInitialPrompt(prompt);
    toggleCopilot();
    setTooltipOpen(false);
  }, [session, palace, openAuthModal, setCopilotInitialPrompt, toggleCopilot]);

  // Close tooltip on outside click
  useEffect(() => {
    if (!tooltipOpen) return;
    const handler = (e: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [tooltipOpen]);

  const huaInfo = HUA_INFO[palace.state];
  const badgeColors = STATE_BADGE_COLORS[palace.state];

  return (
    <motion.button
      onClick={handleClick}
      className="relative aspect-square flex flex-col items-center justify-center gap-1.5 cursor-pointer group min-h-[44px]"
      style={{
        gridColumn: palace.gridCol,
        gridRow: palace.gridRow,
        background: locked
          ? "rgba(16, 8, 38, 0.95)"
          : "rgba(16, 8, 38, 0.88)",
        boxShadow: isActive && borderGlow && !locked
          ? `inset 0 0 20px rgba(140,100,255,0.06), inset 0 1px 0 rgba(212,165,40,0.08), ${borderGlow}`
          : "inset 0 0 20px rgba(140,100,255,0.06), inset 0 1px 0 rgba(212,165,40,0.08)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Golden pulse on click */}
      {!locked && (
        <motion.div
          key={pulseKey}
          className="absolute inset-0 pointer-events-none"
          initial={{
            opacity: 0.8,
            boxShadow: "inset 0 0 40px rgba(255,215,0,0.6)",
          }}
          animate={{
            opacity: 0,
            boxShadow: "inset 0 0 80px rgba(255,215,0,0)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Active state glow overlay */}
      {isActive && glowColor && !locked && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            animation: "glow-pulse 3s ease-in-out infinite",
          }}
        />
      )}

      {/* Selected ring */}
      {isSelected && !locked && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            boxShadow:
              "inset 0 0 25px rgba(255,215,0,0.35), 0 0 15px rgba(255,215,0,0.15)",
            border: "1px solid rgba(255,215,0,0.6)",
          }}
        />
      )}

      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-celestial-900/40 backdrop-blur-[2px]">
          <Lock className="h-4 w-4 text-gold-500/50 mb-1" />
          <span className="text-[8px] font-mono text-gold-500/40 tracking-wider">
            1 CREDIT
          </span>
        </div>
      )}

      {/* Icon — bright gold */}
      <div
        className={`relative z-10 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.5)] ${locked ? "opacity-30" : ""}`}
        style={{ color: "#FFD700" }}
      >
        {IconComponent && <IconComponent />}
      </div>

      {/* Chinese name — bright gold */}
      <span
        className={`relative z-10 text-sm md:text-base tracking-wider ${locked ? "opacity-30" : ""}`}
        style={{
          fontFamily: "var(--font-heading)",
          color: "#FFD700",
          textShadow: locked ? "none" : "0 0 8px rgba(255,215,0,0.3)",
        }}
      >
        {palace.nameCn}
      </span>

      {/* English name — glowing white/cyan */}
      <span
        className={`relative z-10 text-[10px] md:text-xs uppercase tracking-widest ${locked ? "opacity-30" : ""}`}
        style={{
          color: "rgba(200,180,255,0.8)",
          textShadow: locked ? "none" : "0 0 6px rgba(160,120,255,0.2)",
        }}
      >
        {palace.name}
      </span>

      {/* Stars list (18 飞星派 primary stars) */}
      {!locked && palace.stars.length > 0 && (
        <div className="relative z-10 flex flex-wrap justify-center gap-x-1.5 gap-y-0 mt-0.5 max-w-[95%] overflow-hidden">
          {palace.stars.map((star) => {
            // Parse mutagen marker: "紫微 Zi Wei[禄]" → { name: "紫微", mutagen: "禄" }
            const mutagenMatch = star.match(/\[(禄|权|科|忌)\]$/);
            const displayName = star.replace(/\[.+\]$/, "").split(/\s/)[0]; // Chinese name only
            const mutagen = mutagenMatch?.[1];
            const mutagenColor = mutagen === "禄" ? "#44ff88" : mutagen === "权" ? "#ffd700" : mutagen === "科" ? "#44c8ff" : mutagen === "忌" ? "#ff4444" : undefined;
            return (
              <span
                key={star}
                className="text-[7px] md:text-[9px] leading-tight text-parchment-300/80"
              >
                {displayName}
                {mutagen && (
                  <span style={{ color: mutagenColor, fontSize: "0.6em" }}>
                    {mutagen}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* 大限 (Major Decade) + 天干地支 + 流年 year — top-left */}
      {!locked && palace.decadeRange && (
        <div className="absolute top-1 left-1.5 z-10 flex flex-col items-start">
          <span
            className="text-[8px] md:text-[10px] font-mono tracking-wide"
            style={{ color: "rgba(200,180,255,0.7)" }}
          >
            {palace.decadeRange[0]}–{palace.decadeRange[1]}
          </span>
          <span
            className="text-[7px] md:text-[8px] font-mono"
            style={{ color: "rgba(200,180,255,0.45)" }}
          >
            {palace.decadeHeavenlyStem && palace.earthlyBranch
              ? `${palace.decadeHeavenlyStem}${palace.earthlyBranch}`
              : ""}
            {palace.earthlyBranch
              ? ` (${nextLiuNianYear(palace.earthlyBranch)})`
              : ""}
          </span>
        </div>
      )}

      {/* State badge — interactive pill with tooltip */}
      {isActive && !locked && huaInfo && badgeColors && (
        <div
          ref={badgeRef}
          className="absolute top-1 right-1 z-30"
          onMouseEnter={handleBadgeEnter}
          onMouseLeave={handleBadgeLeave}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={handleBadgeClick}
            className="px-1.5 py-0.5 rounded-full text-[7px] md:text-[8px] font-mono font-bold tracking-wide transition-all duration-200 hover:scale-110 cursor-help"
            style={{
              backgroundColor: badgeColors.bg,
              color: badgeColors.text,
              boxShadow: badgeColors.glow,
              border: `1px solid ${badgeColors.text}33`,
            }}
          >
            {huaInfo.labelShort}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 mt-1 w-48 rounded-lg p-2.5 pointer-events-auto"
                style={{
                  background: "rgba(16, 8, 38, 0.97)",
                  border: `1px solid ${badgeColors.text}44`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.5), ${badgeColors.glow}`,
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={handleBadgeEnter}
                onMouseLeave={handleBadgeLeave}
              >
                <div className="text-[11px] font-bold mb-1" style={{ color: badgeColors.text }}>
                  {huaInfo.label} {huaInfo.en}
                </div>
                <p className="text-[10px] leading-relaxed text-parchment-300/80 mb-1">
                  {huaInfo.desc}
                </p>
                <p className="text-[9px] leading-relaxed text-parchment-300/50 mb-2">
                  {huaInfo.descEn}
                </p>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleAskSifu}
                  className="w-full flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(212,165,40,0.15))",
                    color: "#FFD700",
                    border: "1px solid rgba(255,215,0,0.3)",
                    boxShadow: "0 0 10px rgba(255,215,0,0.1)",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Ask AI Sifu
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 小限 ages — bottom */}
      {!locked && palace.xiaoXianAges && palace.xiaoXianAges.length > 0 && (
        <div className="absolute bottom-1 left-0 right-0 z-10 flex flex-wrap justify-center gap-x-1 px-1">
          {palace.xiaoXianAges.filter((a) => a <= 100).map((age) => {
            const isClosest = currentAge !== null &&
              Math.abs(age - currentAge) <= 1;
            return (
              <span
                key={age}
                className="text-[6px] md:text-[7px] font-mono"
                style={{
                  color: isClosest
                    ? "#FFD700"
                    : "rgba(200,180,255,0.35)",
                  textShadow: isClosest
                    ? "0 0 6px rgba(255,215,0,0.5)"
                    : "none",
                  fontWeight: isClosest ? 700 : 400,
                }}
              >
                {age}
              </span>
            );
          })}
        </div>
      )}

      {/* Hover glow edge */}
      <div
        className="absolute inset-0 border border-transparent group-hover:border-[rgba(255,215,0,0.25)] transition-all duration-300 pointer-events-none"
        style={{
          boxShadow: "none",
        }}
      />
    </motion.button>
  );
}
