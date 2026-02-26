"use client";

import { useCallback, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import VerificationTimeline from "@/components/VerificationTimeline";
import QuantumDashboard from "@/components/QuantumDashboard";
import AICopilotWidget from "@/components/AICopilotWidget";
import DestinyMatrix from "@/components/destiny-matrix/DestinyMatrix";
import ScholarlyFoundation from "@/components/scholarly/ScholarlyFoundation";
import { useDashboardStore } from "@/stores/useDashboardStore";

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const setUnlocked = useDashboardStore((s) => s.setUnlocked);

  const handleBeginCalibration = useCallback(() => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAllVerified = useCallback(() => {
    setUnlocked(true);
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [setUnlocked]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <HeroSection onBeginCalibration={handleBeginCalibration} />

      {/* Verification Timeline */}
      <div ref={timelineRef}>
        <VerificationTimeline onAllVerified={handleAllVerified} />
      </div>

      {/* Quantum Dashboard (unlocks after verification) */}
      <div ref={dashboardRef}>
        <QuantumDashboard />
      </div>

      {/* Destiny Matrix (unlocks after verification) */}
      <DestinyMatrix />

      {/* Scholarly Foundation */}
      <ScholarlyFoundation />

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

      {/* Floating AI Co-pilot */}
      <AICopilotWidget />
    </main>
  );
}
