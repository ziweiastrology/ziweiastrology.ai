"use client";

import type { PalaceDetail } from "@/types";
import LockedSection from "./LockedSection";

interface FableStoriesProps {
  palaces: PalaceDetail[];
  userTier: string | undefined;
}

export default function FableStories({ palaces, userTier }: FableStoriesProps) {
  const palacesWithFables = palaces.filter((p) => p.fable && p.fable.length > 0);
  if (palacesWithFables.length === 0) return null;

  return (
    <LockedSection
      requiredTier="BASIC"
      userTier={userTier}
      title="Palace Fables — Unlock with BASIC+"
      preview={
        <div>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
            PALACE FABLES · 宫位寓言
          </p>
          <div className="space-y-3">
            {palacesWithFables.slice(0, 3).map((palace) => (
              <div
                key={palace.id}
                className="p-4 rounded-lg border border-gold-700/15 bg-celestial-900/30"
              >
                <h4 className="text-xs font-semibold text-gold-400 mb-2">
                  {palace.nameCn} {palace.name}
                </h4>
                <p className="text-xs text-parchment-400/70 leading-relaxed">
                  {palace.fable.slice(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="p-6 rounded-xl border border-gold-700/20 bg-celestial-900/40">
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
          PALACE FABLES · 宫位寓言
        </p>
        <div className="space-y-4">
          {palacesWithFables.map((palace) => (
            <div
              key={palace.id}
              className="p-4 rounded-lg border border-gold-700/15 bg-celestial-900/30"
            >
              <h4 className="text-xs font-semibold text-gold-400 mb-2">
                {palace.nameCn} {palace.name}
              </h4>
              <p className="text-xs text-parchment-400/70 leading-relaxed whitespace-pre-line">
                {palace.fable}
              </p>
            </div>
          ))}
        </div>
      </div>
    </LockedSection>
  );
}
