"use client";

import { motion } from "framer-motion";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useMatrixStore } from "@/stores/useMatrixStore";
import PalaceNode from "./PalaceNode";
import CoreVoid from "./CoreVoid";
import PalaceSidebar from "./PalaceSidebar";
import ParticleField from "@/components/ParticleField";
import BigDipperOverlay from "@/components/BigDipperOverlay";

const gridSpring = {
  type: "spring" as const,
  damping: 28,
  stiffness: 200,
};

export default function DestinyMatrix() {
  const isUnlocked = useDashboardStore((s) => s.isUnlocked);
  const palaces = useMatrixStore((s) => s.palaces);
  const sidebarOpen = useMatrixStore((s) => s.sidebarOpen);

  // Matrix always visible — no gate
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "#05070a",
      }}
    >
      {/* Constellation particle network */}
      <ParticleField id="matrix-particles" />
      <BigDipperOverlay />

      {/* Ambient star dust */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(255,215,0,0.08) 0%, transparent 2%),
            radial-gradient(circle at 75% 10%, rgba(100,180,255,0.06) 0%, transparent 1.5%),
            radial-gradient(circle at 40% 80%, rgba(255,215,0,0.05) 0%, transparent 1%),
            radial-gradient(circle at 85% 70%, rgba(100,180,255,0.07) 0%, transparent 1.2%),
            radial-gradient(circle at 25% 55%, rgba(255,215,0,0.04) 0%, transparent 0.8%),
            radial-gradient(circle at 60% 40%, rgba(100,180,255,0.05) 0%, transparent 1%)
          `,
        }}
      />

      {/* Section header */}
      <div className="relative z-10 text-center mb-12 md:mb-16 px-6">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl tracking-wider"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#FFD700",
            textShadow:
              "0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15)",
          }}
        >
          Your Destiny Matrix
        </h2>
        <p
          className="mt-3 text-sm md:text-base tracking-wide max-w-lg mx-auto"
          style={{ color: "rgba(200,210,230,0.7)" }}
        >
          Twelve palaces, one destiny. Select a palace to unveil its
          consciousness.
        </p>
        {/* Terminal-style subtitle */}
        <p
          className="mt-2 text-[10px] font-mono tracking-[0.2em] uppercase"
          style={{ color: "rgba(0,220,130,0.5)" }}
        >
          [12 PALACES LOADED // AWAITING SELECTION]
        </p>
      </div>

      {/* Grid + Sidebar layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Grid container — shifts RIGHT when left sidebar opens */}
        <motion.div
          className="mx-auto"
          style={{ maxWidth: 640 }}
          animate={{
            scale: sidebarOpen ? 0.95 : 1,
            x: sidebarOpen ? 40 : 0,
          }}
          transition={gridSpring}
        >
          {/* Glowing golden filament grid */}
          <div
            className="grid grid-cols-4 grid-rows-4 rounded-lg overflow-hidden"
            style={{
              gap: 1,
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.1))",
              boxShadow:
                "0 0 40px rgba(255,215,0,0.06), 0 0 80px rgba(10,14,26,0.5), inset 0 0 60px rgba(255,215,0,0.03)",
            }}
          >
            {palaces.map((palace, i) => (
              <PalaceNode key={palace.id} palace={palace} index={i} />
            ))}
            <CoreVoid />
          </div>
        </motion.div>

        {/* Unlock Full Reading CTA */}
        <div className="mt-12 text-center">
          <button
            className="inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em]
                       text-celestial-900 rounded-sm cursor-pointer
                       transition-all duration-400 ease-out
                       hover:shadow-[0_0_40px_rgba(212,165,40,0.4),0_0_80px_rgba(212,165,40,0.2)]
                       active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #8f6b17, #b8891e, #d4a528, #e6be4a, #d4a528, #b8891e, #8f6b17)",
              backgroundSize: "200% 100%",
            }}
          >
            Unlock Full Reading
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <PalaceSidebar />
    </section>
  );
}
