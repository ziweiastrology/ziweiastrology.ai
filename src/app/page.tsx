"use client";

import { useCallback, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import VerificationTimeline from "@/components/VerificationTimeline";
// import QuantumDashboard from "@/components/QuantumDashboard"; // Phase 2 — Free Report
import AICopilotWidget from "@/components/AICopilotWidget";
import DestinyMatrix from "@/components/destiny-matrix/DestinyMatrix";
import FreeReport from "@/components/FreeReport";
// import ScholarlyFoundation from "@/components/scholarly/ScholarlyFoundation";
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

      {/* Scholarly Foundation (light parchment — hidden for V2 funnel) */}
      {/* <ScholarlyFoundation /> */}

      {/* Footer */}
      <footer className="py-12 px-6 text-center celestial-bg border-t border-gold-700/20">
        <p
          className="text-sm text-gold-700/60 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          ziweiastrology.ai
        </p>
        <p className="text-xs text-parchment-600 mt-2">
          Ancient wisdom. Quantum precision.
        </p>
      </footer>

      {/* Floating AI Co-pilot (gated) */}
      <AICopilotWidget />
    </main>
  );
}
