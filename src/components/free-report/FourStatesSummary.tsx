"use client";

import type { PalaceDetail } from "@/types";
import { STATE_META } from "./shared";

interface FourStatesSummaryProps {
  statesPalaces: Record<"lu" | "quan" | "ke" | "ji", PalaceDetail | null>;
}

export default function FourStatesSummary({ statesPalaces }: FourStatesSummaryProps) {
  return (
    <div>
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
    </div>
  );
}
