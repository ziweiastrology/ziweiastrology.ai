"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PalaceDetail } from "@/types";

interface ConsciousnessPanelProps {
  palaces: PalaceDetail[];
}

export default function ConsciousnessPanel({ palaces }: ConsciousnessPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = palaces.slice(0, 3);
  const visible = expanded ? palaces : preview;

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-4 group cursor-pointer"
      >
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50">
          CONSCIOUSNESS READINGS · 宫位解读
        </p>
        <div className="flex items-center gap-1.5 text-gold-500/50 group-hover:text-gold-400 transition-colors">
          <span className="text-[10px] font-mono">
            {expanded ? "Collapse" : `Show all ${palaces.length}`}
          </span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </div>
      </button>
      <div className="space-y-3">
        {visible.map((palace) => (
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
      {!expanded && palaces.length > 3 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 w-full py-2 text-[10px] font-mono tracking-wider text-gold-500/50
                     hover:text-gold-400 transition-colors border border-gold-700/15 rounded-lg
                     bg-celestial-900/20 hover:bg-celestial-900/40"
        >
          + {palaces.length - 3} more palaces
        </button>
      )}
    </div>
  );
}
