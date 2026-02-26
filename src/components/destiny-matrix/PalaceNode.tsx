"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { PALACE_ICON_MAP } from "./palaceIcons";
import type { PalaceDetail } from "@/types";

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
}

export default function PalaceNode({ palace, index }: PalaceNodeProps) {
  const selectPalace = useMatrixStore((s) => s.selectPalace);
  const selectedPalaceId = useMatrixStore((s) => s.selectedPalaceId);
  const [pulseKey, setPulseKey] = useState(0);

  const IconComponent = PALACE_ICON_MAP[palace.icon];
  const isSelected = selectedPalaceId === palace.id;
  const isActive = palace.state !== "neutral";
  const glowColor = STATE_COLORS[palace.state];
  const borderGlow = STATE_BORDER_GLOW[palace.state];

  const handleClick = useCallback(() => {
    setPulseKey((k) => k + 1);
    selectPalace(palace.id);
  }, [selectPalace, palace.id]);

  return (
    <motion.button
      onClick={handleClick}
      className="relative aspect-square flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
      style={{
        gridColumn: palace.gridCol,
        gridRow: palace.gridRow,
        background: "rgba(20, 30, 50, 0.6)",
        boxShadow: isActive && borderGlow
          ? `inset 0 0 20px rgba(100,150,255,0.05), ${borderGlow}`
          : "inset 0 0 20px rgba(100,150,255,0.05)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Golden pulse on click */}
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

      {/* Active state glow overlay */}
      {isActive && glowColor && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            animation: "glow-pulse 3s ease-in-out infinite",
          }}
        />
      )}

      {/* Selected ring */}
      {isSelected && (
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

      {/* Icon — bright gold */}
      <div
        className="relative z-10 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
        style={{ color: "#FFD700" }}
      >
        {IconComponent && <IconComponent />}
      </div>

      {/* Chinese name — bright gold */}
      <span
        className="relative z-10 text-sm md:text-base tracking-wider"
        style={{
          fontFamily: "var(--font-heading)",
          color: "#FFD700",
          textShadow: "0 0 8px rgba(255,215,0,0.3)",
        }}
      >
        {palace.nameCn}
      </span>

      {/* English name — glowing white/cyan */}
      <span
        className="relative z-10 text-[10px] md:text-xs uppercase tracking-widest"
        style={{
          color: "rgba(180,220,255,0.8)",
          textShadow: "0 0 6px rgba(100,180,255,0.2)",
        }}
      >
        {palace.name}
      </span>

      {/* State badge */}
      {isActive && (
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full z-10"
          style={{
            backgroundColor: glowColor?.replace(/[\d.]+\)$/, "0.9)"),
            boxShadow: `0 0 6px ${glowColor}`,
          }}
        />
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
