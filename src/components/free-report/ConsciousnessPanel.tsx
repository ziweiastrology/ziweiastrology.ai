"use client";

import type { PalaceDetail } from "@/types";

interface ConsciousnessPanelProps {
  palaces: PalaceDetail[];
}

export default function ConsciousnessPanel({ palaces }: ConsciousnessPanelProps) {
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
        CONSCIOUSNESS READINGS · 宫位解读
      </p>
      <div className="space-y-3">
        {palaces.map((palace) => (
          <div
            key={palace.id}
            className="p-4 rounded-lg border border-gold-700/15 bg-celestial-900/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xs font-semibold text-gold-400">
                {palace.nameCn} {palace.name}
              </h4>
              <span className="text-[10px] text-gold-500/40 font-mono">
                Energy: {palace.energy}%
              </span>
            </div>
            <p className="text-xs text-parchment-400/70 leading-relaxed">
              {palace.consciousness}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
