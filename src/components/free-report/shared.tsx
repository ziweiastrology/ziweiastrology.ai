"use client";

import type { PalaceDetail } from "@/types";

/* ─── State Metadata ─── */

export const STATE_META: Record<
  "lu" | "quan" | "ke" | "ji",
  { label: string; labelCn: string; color: string; icon: string }
> = {
  lu: { label: "Lu", labelCn: "禄", color: "text-quantum-green", icon: "▲" },
  quan: { label: "Quan", labelCn: "权", color: "text-quantum-orange", icon: "◆" },
  ke: { label: "Ke", labelCn: "科", color: "text-quantum-cyan", icon: "●" },
  ji: { label: "Ji", labelCn: "忌", color: "text-quantum-red", icon: "✦" },
};

/* ─── Energy Ring SVG ─── */

export function EnergyRing({ energy, size = 72 }: { energy: number; size?: number }) {
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

export function StateBadge({ state }: { state: "lu" | "quan" | "ke" | "ji" }) {
  const meta = STATE_META[state];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border ${meta.color}`}
      style={{ borderColor: "currentColor", opacity: 0.8 }}
    >
      {meta.icon} {meta.labelCn} {meta.label}
    </span>
  );
}

/* ─── Helpers ─── */

export function getStatesPalaces(palaces: PalaceDetail[]) {
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

export function buildInsightNarrative(
  deductions: { id: string; title: string; description: string }[],
  responses: Record<string, string>
) {
  const confirmed = deductions.filter((d) => responses[d.id] === "yes");
  if (confirmed.length === 0) {
    return "Your calibration data reveals a distinctive life-path signature. The convergence of your palace energies and confirmed life events indicates a pattern of sovereign decision-making that few charts display with such clarity.";
  }
  if (confirmed.length === 1) {
    return `Your confirmed pattern — "${confirmed[0].title}" — anchors a distinctive life-path signature. ${confirmed[0].description.slice(0, 120)}... This resonance ripples through your entire 12-palace matrix, creating a unique sovereign frequency.`;
  }
  return `Two confirmed patterns converge in your chart: "${confirmed[0].title}" and "${confirmed[1].title}." ${confirmed[0].description.slice(0, 100)}... Combined with ${confirmed[1].description.slice(0, 100).toLowerCase()}... This dual resonance is rare — it suggests a life-path operating on multiple frequencies simultaneously.`;
}
