"use client";

import { useCallback, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import VerificationTimeline from "@/components/VerificationTimeline";
import AICopilotWidget from "@/components/AICopilotWidget";
import DestinyMatrix from "@/components/destiny-matrix/DestinyMatrix";
import FreeReport from "@/components/FreeReport";
import { useDashboardStore } from "@/stores/useDashboardStore";

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const setUnlocked = useDashboardStore((s) => s.setUnlocked);

  const handleBeginCalibration = useCallback(() => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAllVerified = useCallback(() => {
    setUnlocked(true);
    setTimeout(() => {
      matrixRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [setUnlocked]);

  return (
    <main className="min-h-screen">
      {/* Hero (dark) */}
      <HeroSection onBeginCalibration={handleBeginCalibration} />

      {/* Calibration Input + Verification Overlay (dark) */}
      <div ref={timelineRef}>
        <VerificationTimeline onAllVerified={handleAllVerified} />
      </div>

      {/* Destiny Matrix (dark, gated by isUnlocked) */}
      <div ref={matrixRef}>
        <DestinyMatrix />
      </div>

      {/* Free Report (dark, gated by isUnlocked inside component) */}
      <FreeReport />

      {/* Footer — cosmic nebula 星辰大海 */}
      <footer className="relative overflow-hidden">
        {/* Nebula clouds */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 15% 90%, rgba(140, 50, 180, 0.55) 0%, transparent 55%),
              radial-gradient(ellipse 100% 70% at 80% 10%, rgba(210, 100, 40, 0.35) 0%, transparent 50%),
              radial-gradient(ellipse 80% 90% at 50% 50%, rgba(180, 40, 100, 0.28) 0%, transparent 45%),
              radial-gradient(ellipse 130% 60% at 5% 20%, rgba(60, 20, 140, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 90% 70% at 90% 75%, rgba(90, 50, 200, 0.4) 0%, transparent 45%),
              radial-gradient(ellipse 60% 50% at 40% 10%, rgba(220, 140, 50, 0.2) 0%, transparent 40%),
              radial-gradient(ellipse 70% 60% at 65% 80%, rgba(160, 60, 120, 0.3) 0%, transparent 45%),
              linear-gradient(180deg, #0c0418 0%, #10062a 35%, #160930 70%, #0e0620 100%)
            `,
          }}
        />
        {/* Secondary wisps */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 30% 70%, rgba(200, 80, 160, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse 40% 35% at 70% 35%, rgba(240, 160, 60, 0.3) 0%, transparent 45%),
              radial-gradient(ellipse 60% 45% at 20% 40%, rgba(100, 60, 200, 0.4) 0%, transparent 50%)
            `,
          }}
        />
        {/* Star field */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1.5px 1.5px at 10% 15%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 22% 42%, rgba(255,255,255,0.8) 0%, transparent 100%),
              radial-gradient(2px 2px at 38% 8%, rgba(255,220,150,1) 0%, transparent 100%),
              radial-gradient(1px 1px at 52% 28%, #fff 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 65% 52%, rgba(255,255,255,0.9) 0%, transparent 100%),
              radial-gradient(1px 1px at 78% 15%, rgba(255,220,150,0.8) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 88% 38%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 95% 62%, rgba(255,255,255,0.7) 0%, transparent 100%),
              radial-gradient(1px 1px at 5% 68%, rgba(255,255,255,0.8) 0%, transparent 100%),
              radial-gradient(2px 2px at 18% 82%, rgba(255,220,150,0.9) 0%, transparent 100%),
              radial-gradient(1px 1px at 32% 65%, #fff 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 45% 88%, rgba(255,255,255,0.8) 0%, transparent 100%),
              radial-gradient(1px 1px at 72% 92%, #fff 0%, transparent 100%),
              radial-gradient(2px 2px at 85% 78%, rgba(255,220,150,1) 0%, transparent 100%)
            `,
          }}
        />
        {/* Twinkling stars */}
        <div
          className="absolute inset-0 animate-[star-twinkle_4s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(3px 3px at 25% 20%, rgba(255,220,150,1) 0%, transparent 100%),
              radial-gradient(2.5px 2.5px at 68% 55%, #fff 0%, transparent 100%),
              radial-gradient(3px 3px at 45% 85%, rgba(255,220,150,1) 0%, transparent 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 animate-[star-twinkle_5s_ease-in-out_1.5s_infinite]"
          style={{
            background: `
              radial-gradient(3px 3px at 12% 70%, #fff 0%, transparent 100%),
              radial-gradient(2.5px 2.5px at 88% 35%, rgba(255,220,150,1) 0%, transparent 100%),
              radial-gradient(2px 2px at 55% 12%, #fff 0%, transparent 100%)
            `,
          }}
        />
        {/* Top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,160,60,0.6) 15%, rgba(140,60,180,0.8) 50%, rgba(200,160,60,0.6) 85%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(140,60,180,0.15) 0%, transparent 100%)",
          }}
        />
        {/* Content */}
        <div className="relative z-10 py-12 px-6 text-center">
          <p
            className="text-sm text-gold-700/60 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            ziweiastrology.ai
          </p>
          <p className="text-xs text-parchment-600 mt-2">
            Ancient wisdom. Quantum precision.
          </p>
        </div>
      </footer>

      {/* Floating AI Co-pilot (gated) */}
      <AICopilotWidget />
    </main>
  );
}
