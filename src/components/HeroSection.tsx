"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import BigDipperOverlay from "./BigDipperOverlay";

// Pre-computed star positions (12 nodes on outer ring, rounded to avoid hydration mismatch)
const RING_STARS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
  (angle, i) => {
    const r = 370;
    const x = Math.round((400 + r * Math.cos((angle * Math.PI) / 180)) * 100) / 100;
    const y = Math.round((400 + r * Math.sin((angle * Math.PI) / 180)) * 100) / 100;
    return { x, y, i };
  }
);

// Seeded pseudo-random for deterministic background stars
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const BG_STARS = Array.from({ length: 100 }, (_, i) => {
  const s = i + 1;
  return {
    x: Math.round(seededRandom(s) * 800 * 100) / 100,
    y: Math.round(seededRandom(s + 100) * 800 * 100) / 100,
    size: Math.round((seededRandom(s + 200) * 1.5 + 0.2) * 100) / 100,
    isGold: seededRandom(s + 300) > 0.5,
    opacity: Math.round((seededRandom(s + 400) * 0.4 + 0.05) * 100) / 100,
    dur: Math.round((3 + seededRandom(s + 500) * 5) * 10) / 10,
    delay: Math.round(seededRandom(s + 600) * 6 * 10) / 10,
  };
});

interface HeroSectionProps {
  onBeginCalibration: () => void;
}

export default function HeroSection({ onBeginCalibration }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: Deep navy-to-black radial + ancient paper texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #0a0f2e 0%, #050a1a 35%, #020510 70%, #010208 100%)",
        }}
      />
      {/* Constellation particle network */}
      <ParticleField id="hero-particles" />
      <BigDipperOverlay />

      {/* Ancient paper texture filter */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Animated armillary sphere */}
      <ArmillarySphere />

      {/* Deep vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,5,16,0.45)_45%,rgba(2,5,16,0.92)_100%)]" />

      {/* Warm golden ambient at center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,165,40,0.07)_0%,transparent_35%)]" />

      {/* === System Status Widget — top-left === */}
      <div className="absolute top-6 left-6 z-20 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="px-4 py-3 rounded-sm bg-celestial-800/40 backdrop-blur-sm border border-gold-700/20
                        shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(212,165,40,0.03)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-quantum-green animate-glow-pulse" />
            <span className="text-[10px] text-gold-400 tracking-[0.2em] uppercase font-semibold">
              System: Active
            </span>
          </div>
          <div className="space-y-1">
            <StatusLine label="Engine" value="V3.1" />
            <StatusLine label="Mode" value="Observing Galactic Transits" />
            <StatusLine label="Uptime" value="∞" />
          </div>
        </div>
      </div>

      {/* === Main Content === */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Golden halo behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px]
                        bg-[radial-gradient(ellipse,rgba(212,165,40,0.1)_0%,transparent_65%)] pointer-events-none" />

        {/* H1 — Primary SEO heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4"
          style={{
            fontFamily: "var(--font-cinzel)",
            background: "linear-gradient(135deg, #f0d47a 0%, #d4a528 40%, #b8891e 70%, #f0d47a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(212,165,40,0.25))",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          紫微斗数
        </motion.h1>

        {/* Subtitle — tagline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p
            className="text-sm md:text-base tracking-[0.25em] uppercase mb-2"
            style={{
              fontFamily: "var(--font-cinzel)",
              color: "rgba(255,215,0,0.7)",
              textShadow: "0 0 12px rgba(255,215,0,0.2)",
            }}
          >
            From the Forbidden City to Your Sovereign Hands
          </p>
          <p
            className="text-xs tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-serif)",
              color: "rgba(100,180,255,0.45)",
              textShadow: "0 0 10px rgba(0,209,255,0.1)",
            }}
          >
            从禁城到你的主权
          </p>
        </motion.div>

        {/* Narrative description */}
        <motion.p
          className="text-xs md:text-sm max-w-lg mx-auto leading-[1.9] mb-14"
          style={{ fontFamily: "var(--font-serif)", color: "rgba(200,210,230,0.45)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          紫微 (Zi Wei) — the North Star — was the axis of the ancient sky.
          For a thousand years, this algorithm was the emperor&apos;s exclusive science (帝王学),
          locked inside the Forbidden City&apos;s 钦天监.{" "}
          <span style={{ color: "rgba(212,165,40,0.45)" }}>
            108 stars. 12 palaces. The first high-precision life operating system,
            now decoded for your sovereign hands.
          </span>
        </motion.p>

        {/* CTA Button with scanning light */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          {/* Outer glow halo */}
          <div className="absolute -inset-5 bg-[radial-gradient(ellipse,rgba(212,165,40,0.12)_0%,transparent_70%)] animate-glow-pulse pointer-events-none" />

          <button
            onClick={onBeginCalibration}
            className="group relative inline-flex items-center gap-3 px-14 py-5 text-base font-semibold
                       text-celestial-900 rounded-sm overflow-hidden cursor-pointer
                       transition-all duration-400 ease-out
                       hover:shadow-[0_0_40px_rgba(212,165,40,0.45),0_0_80px_rgba(212,165,40,0.2),0_0_120px_rgba(212,165,40,0.1)]
                       active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #8f6b17, #b8891e, #d4a528, #e6be4a, #d4a528, #b8891e, #8f6b17)",
              backgroundSize: "200% 100%",
            }}
          >
            <span className="relative z-10 tracking-[0.25em] uppercase">
              Initiate Sovereign Calibration
            </span>
            <span className="absolute inset-0 rounded-sm border border-gold-300/50 animate-glow-pulse" />
            <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <span
              className="absolute inset-y-0 w-[60px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                animation: "scan-sweep 5s ease-in-out infinite",
              }}
            />
            <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Dynamic status ticker below CTA */}
          <motion.div
            className="mt-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <div className="w-1 h-1 rounded-full bg-quantum-green animate-glow-pulse" />
            <p
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(100,180,255,0.4)",
              }}
            >
              Imperial Lineage: 1000+ Years &nbsp;/&nbsp; 108 Stars &nbsp;/&nbsp; 12 Palaces
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* === Probability Ticker — bottom === */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden
                      border-t border-gold-700/10 bg-celestial-900/60 backdrop-blur-sm">
        <div
          className="flex items-center gap-12 py-2.5 whitespace-nowrap"
          style={{ animation: "ticker-scroll 30s linear infinite" }}
        >
          {/* Duplicate the items for seamless loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <TickerItem key={i} label={item.label} value={item.value} status={item.status} />
          ))}
        </div>
      </div>

      {/* Scroll indicator — above ticker */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-5 h-8 rounded-full border border-gold-600/30 flex justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-gold-500/40 rounded-full animate-glow-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Status Line — for System Widget
   ============================================ */

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-parchment-500/50 tracking-wider uppercase w-12">{label}</span>
      <span className="text-[9px] text-gold-500/70 font-mono">{value}</span>
    </div>
  );
}

/* ============================================
   Ticker Data & Component
   ============================================ */

const TICKER_ITEMS = [
  { label: "Global Frequency", value: "7.83 Hz", status: "stable" },
  { label: "Lu/Ji Balance", value: "3:1 Favorable", status: "high" },
  { label: "Transit Window", value: "Active — 72h", status: "active" },
  { label: "Zi Wei Position", value: "寅宮 · Yin Palace", status: "stable" },
  { label: "Resonance Index", value: "0.847", status: "high" },
  { label: "Active Observers", value: "12,847", status: "stable" },
  { label: "Fei Xing Cycle", value: "甲級 · Grade A", status: "high" },
  { label: "Quantum Coherence", value: "94.2%", status: "active" },
];

function TickerItem({ label, value, status }: { label: string; value: string; status: string }) {
  const dotColor =
    status === "high" ? "bg-quantum-green" :
    status === "active" ? "bg-gold-500" :
    "bg-parchment-500";

  return (
    <div className="flex items-center gap-2.5 flex-shrink-0">
      <div className={`w-1 h-1 rounded-full ${dotColor} opacity-60`} />
      <span className="text-[10px] text-parchment-500/50 tracking-wider uppercase">{label}</span>
      <span className="text-[10px] text-gold-400/70 font-mono">{value}</span>
    </div>
  );
}

/* ============================================
   Etched Text — letter-by-letter reveal
   ============================================ */

function EtchedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 12, scale: 0.8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* Space after each word segment */}
      <span>&nbsp;</span>
    </span>
  );
}

/* ============================================
   Armillary Sphere — with heartbeat center
   ============================================ */

function ArmillarySphere() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <svg
        viewBox="0 0 800 800"
        className="w-[130vmin] h-[130vmin] max-w-[1000px] max-h-[1000px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a528" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f0d47a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4a528" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a5fc2" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#2a3f9e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4a5fc2" stopOpacity="0.7" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="heavyGlow">
            <feGaussianBlur stdDeviation="6" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="heartbeatGrad">
            <stop offset="0%" stopColor="#f0d47a" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#d4a528" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4a528" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Rotating rings — slow, majestic */}
        <circle cx="400" cy="400" r="370" fill="none" stroke="url(#goldGrad)" strokeWidth="1.2"
          style={{ transformOrigin: "400px 400px", animation: "orbit 90s linear infinite" }} />

        <ellipse cx="400" cy="400" rx="320" ry="135" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8"
          style={{ transformOrigin: "400px 400px", animation: "orbit 60s linear infinite reverse" }} />

        <ellipse cx="400" cy="400" rx="270" ry="200" fill="none" stroke="url(#goldGrad)" strokeWidth="0.7"
          transform="rotate(50 400 400)"
          style={{ transformOrigin: "400px 400px", animation: "orbit 45s linear infinite" }} />

        <ellipse cx="400" cy="400" rx="220" ry="300" fill="none" stroke="url(#blueGrad)" strokeWidth="0.6"
          transform="rotate(-20 400 400)"
          style={{ transformOrigin: "400px 400px", animation: "orbit 75s linear infinite reverse" }} />

        <circle cx="400" cy="400" r="170" fill="none" stroke="url(#goldGrad)" strokeWidth="0.3" strokeDasharray="5 4" />
        <circle cx="400" cy="400" r="100" fill="none" stroke="url(#blueGrad)" strokeWidth="0.2" strokeDasharray="3 5" />

        {/* === Center heartbeat glow === */}
        {/* Ambient pulse ring */}
        <circle cx="400" cy="400" r="25" fill="url(#heartbeatGrad)" opacity="0.4">
          <animate attributeName="r" values="20;35;22;30;20" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.25;0.45;0.2" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* Core point */}
        <circle cx="400" cy="400" fill="#f0d47a" filter="url(#heavyGlow)">
          <animate attributeName="r" values="5;9;6;8;5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.65;0.9;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Star nodes on outer ring (pre-computed) */}
        {RING_STARS.map(({ x, y, i }) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#d4a528" filter="url(#softGlow)" opacity="0.7"
            style={{ animation: `star-twinkle ${2.5 + (i % 4)}s ease-in-out ${i * 0.25}s infinite` }} />
        ))}

        {/* Scattered background stars (deterministic) */}
        {BG_STARS.map((star, i) => (
          <circle key={`s-${i}`} cx={star.x} cy={star.y} r={star.size}
            fill={star.isGold ? "#d4a528" : "#b3bfee"}
            opacity={star.opacity}
            style={{ animation: `star-twinkle ${star.dur}s ease-in-out ${star.delay}s infinite` }} />
        ))}
      </svg>
    </div>
  );
}
