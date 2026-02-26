"use client";

import { motion } from "framer-motion";
import { useMatrixStore } from "@/stores/useMatrixStore";

// Big Dipper (北斗七星) star positions — mapped to percentage coordinates
// Arranged to be visible in the upper-right area of the dark sections
const DIPPER_STARS = [
  { id: "dubhe", x: 72, y: 18, label: "天枢" },     // α — Dubhe
  { id: "merak", x: 68, y: 22, label: "天璇" },      // β — Merak
  { id: "phecda", x: 63, y: 26, label: "天玑" },     // γ — Phecda
  { id: "megrez", x: 59, y: 23, label: "天权" },     // δ — Megrez
  { id: "alioth", x: 53, y: 20, label: "玉衡" },     // ε — Alioth
  { id: "mizar", x: 47, y: 16, label: "开阳" },      // ζ — Mizar
  { id: "alkaid", x: 40, y: 12, label: "摇光" },     // η — Alkaid
];

// North Star (紫微星 / 北极星) — the anchor
const NORTH_STAR = { id: "polaris", x: 78, y: 8, label: "紫微" };

// Connection lines: index pairs for the dipper shape + line to Polaris
const DIPPER_LINES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], // main ladle
  [0, 3], // cross-brace of the bowl
];
const POLARIS_LINE = [0, -1]; // Dubhe -> Polaris (use -1 as Polaris marker)

export default function BigDipperOverlay() {
  const selectedPalaceId = useMatrixStore((s) => s.selectedPalaceId);
  const isActivated = selectedPalaceId === "self";

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Glow filter */}
          <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Energy flow gradient */}
          <linearGradient id="energy-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isActivated ? "#00D1FF" : "#d4a528"} stopOpacity="0" />
            <stop offset="50%" stopColor={isActivated ? "#00D1FF" : "#d4a528"} stopOpacity={isActivated ? "0.8" : "0.15"} />
            <stop offset="100%" stopColor={isActivated ? "#00D1FF" : "#d4a528"} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dipper constellation lines */}
        {DIPPER_LINES.map(([a, b], i) => {
          const starA = DIPPER_STARS[a];
          const starB = DIPPER_STARS[b];
          return (
            <motion.line
              key={`line-${i}`}
              x1={starA.x}
              y1={starA.y}
              x2={starB.x}
              y2={starB.y}
              stroke={isActivated ? "#00D1FF" : "#d4a528"}
              strokeWidth={isActivated ? 0.15 : 0.06}
              filter={isActivated ? "url(#intense-glow)" : undefined}
              animate={{
                opacity: isActivated ? [0.6, 1, 0.6] : [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: isActivated ? 2 : 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          );
        })}

        {/* Dubhe -> Polaris guide line */}
        <motion.line
          x1={DIPPER_STARS[0].x}
          y1={DIPPER_STARS[0].y}
          x2={NORTH_STAR.x}
          y2={NORTH_STAR.y}
          stroke={isActivated ? "#00D1FF" : "#d4a528"}
          strokeWidth={isActivated ? 0.12 : 0.04}
          strokeDasharray="0.5 0.8"
          filter={isActivated ? "url(#intense-glow)" : undefined}
          animate={{
            opacity: isActivated ? [0.5, 0.9, 0.5] : [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: isActivated ? 2.5 : 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Merak -> Polaris guide line (pointer stars) */}
        <motion.line
          x1={DIPPER_STARS[1].x}
          y1={DIPPER_STARS[1].y}
          x2={NORTH_STAR.x}
          y2={NORTH_STAR.y}
          stroke={isActivated ? "#00D1FF" : "#d4a528"}
          strokeWidth={isActivated ? 0.1 : 0.03}
          strokeDasharray="0.4 1"
          filter={isActivated ? "url(#intense-glow)" : undefined}
          animate={{
            opacity: isActivated ? [0.4, 0.7, 0.4] : [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: isActivated ? 3 : 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dipper star nodes */}
        {DIPPER_STARS.map((star, i) => (
          <motion.circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={isActivated ? 0.35 : 0.2}
            fill={isActivated ? "#00D1FF" : "#FFD700"}
            filter={isActivated ? "url(#intense-glow)" : "url(#star-glow)"}
            animate={{
              opacity: isActivated ? [0.7, 1, 0.7] : [0.2, 0.4, 0.2],
              r: isActivated ? [0.3, 0.45, 0.3] : [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: isActivated ? 2 : 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* North Star (紫微) — the brightest */}
        <motion.circle
          cx={NORTH_STAR.x}
          cy={NORTH_STAR.y}
          fill={isActivated ? "#00D1FF" : "#FFD700"}
          filter="url(#intense-glow)"
          animate={{
            r: isActivated ? [0.4, 0.7, 0.4] : [0.25, 0.4, 0.25],
            opacity: isActivated ? [0.8, 1, 0.8] : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: isActivated ? 1.5 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
