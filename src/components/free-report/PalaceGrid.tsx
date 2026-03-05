"use client";

import type { PalaceDetail } from "@/types";
import { EnergyRing, StateBadge } from "./shared";

interface PalaceGridProps {
  palaces: PalaceDetail[];
}

export default function PalaceGrid({ palaces }: PalaceGridProps) {
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
        12 PALACES · 十二宫
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {palaces.map((palace) => (
          <div
            key={palace.id}
            className="relative p-4 rounded-lg border border-gold-700/20 bg-celestial-900/40 hover:border-gold-500/40 transition-colors duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4
                  className="text-xs font-semibold text-gold-300"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {palace.nameCn}
                </h4>
                <p className="text-[10px] text-gold-500/40 font-mono">
                  {palace.name}
                </p>
              </div>
              {palace.state !== "neutral" && (
                <StateBadge state={palace.state} />
              )}
            </div>

            <div className="w-14 h-14 mx-auto my-2">
              <EnergyRing energy={palace.energy} size={56} />
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {palace.stars.slice(0, 3).map((star) => (
                <span
                  key={star}
                  className="text-[8px] font-mono px-1 py-0.5 rounded bg-gold-700/10 text-gold-500/50 tracking-wider"
                >
                  {star}
                </span>
              ))}
              {palace.stars.length > 3 && (
                <span className="text-[8px] font-mono text-gold-500/30">
                  +{palace.stars.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
