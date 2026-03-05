"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useMatrixStore } from "@/stores/useMatrixStore";
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
  const [pulseKey, setPulseKey] = useState(0);

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

  return (
    <motion.button
      onClick={handleClick}
      className="relative aspect-square flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
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

      {/* State badge */}
      {isActive && !locked && (
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full z-10"
          style={{
            backgroundColor: glowColor?.replace(/[\d.]+\)$/, "0.9)"),
            boxShadow: `0 0 6px ${glowColor}`,
          }}
        />
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
