"use client";

import { Lock } from "lucide-react";
import { hasMinTier } from "@/lib/credits";

interface LockedSectionProps {
  requiredTier: string;
  userTier: string | undefined;
  title: string;
  children: React.ReactNode;
  preview?: React.ReactNode;
}

export default function LockedSection({
  requiredTier,
  userTier,
  title,
  children,
  preview,
}: LockedSectionProps) {
  if (hasMinTier(userTier, requiredTier)) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-xl border border-gold-700/20 bg-celestial-900/40 overflow-hidden">
      {/* Blurred preview */}
      <div className="blur-[6px] select-none pointer-events-none p-6">
        {preview || children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-celestial-900/60 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-gold-500/30 bg-celestial-900/80 flex items-center justify-center">
            <Lock className="h-5 w-5 text-gold-500/60" />
          </div>
          <p className="text-sm font-semibold text-gold-300/80">{title}</p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-celestial-900 rounded-sm transition-all hover:shadow-[0_0_20px_rgba(212,165,40,0.3)]"
            style={{
              background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
            }}
          >
            Subscribe to Unlock
          </a>
          <p className="text-[10px] text-parchment-500/60 font-mono">
            Requires {requiredTier}+ membership
          </p>
        </div>
      </div>
    </div>
  );
}
