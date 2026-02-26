"use client";

import type { FourState } from "@/types";

const FOUR_STATES: FourState[] = [
  {
    id: "lu",
    chineseName: "祿",
    westernName: "Expansion",
    symbol: "☉",
    description:
      "The generative force. Lu represents abundance, resource flow, and the natural expansion of potential into manifestation. When Lu activates a palace, opportunities multiply and pathways open.",
    color: "text-quantum-green",
    glowColor: "rgba(68,255,136,0.15)",
  },
  {
    id: "quan",
    chineseName: "權",
    westernName: "Impact",
    symbol: "⚡",
    description:
      "The force of authority. Quan channels concentrated power into decisive action. It transforms potential energy into kinetic force — career breakthroughs, leadership emergence, and pivotal decisions.",
    color: "text-quantum-orange",
    glowColor: "rgba(255,136,68,0.15)",
  },
  {
    id: "ke",
    chineseName: "科",
    westernName: "Resonance",
    symbol: "◈",
    description:
      "The principle of recognition. Ke aligns reputation with reality, creating harmonics between inner capability and external perception. It governs wisdom, scholarship, and intellectual authority.",
    color: "text-quantum-cyan",
    glowColor: "rgba(68,255,255,0.15)",
  },
  {
    id: "ji",
    chineseName: "忌",
    westernName: "Entanglement",
    symbol: "∞",
    description:
      "The binding force. Ji creates quantum entanglement between events, people, and outcomes. It generates obsession, friction, and the karmic threads that connect past actions to future consequences.",
    color: "text-quantum-red",
    glowColor: "rgba(255,68,68,0.15)",
  },
];

export default function FourStatesCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {FOUR_STATES.map((state, index) => (
        <StateCard key={state.id} state={state} index={index} />
      ))}
    </div>
  );
}

function StateCard({ state, index }: { state: FourState; index: number }) {
  return (
    <div
      className="group relative p-8 rounded-sm border border-parchment-400/50 bg-parchment-100/80
                 transition-all duration-500 hover:border-gold-500/50
                 animate-slide-up"
      style={{
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 30px ${state.glowColor}` }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-4 mb-4">
        {/* Symbol */}
        <div
          className={`text-3xl ${state.color} flex-shrink-0`}
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {state.symbol}
        </div>

        <div>
          {/* Chinese name */}
          <div
            className="text-3xl font-bold text-celestial-800 leading-none mb-1"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {state.chineseName}
          </div>

          {/* Western name */}
          <div className="text-sm tracking-[0.3em] uppercase text-gold-700">
            {state.westernName}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="relative h-px mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      </div>

      {/* Description */}
      <p
        className="relative text-sm text-parchment-800 leading-relaxed"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        {state.description}
      </p>

      {/* Fine corner decorations */}
      <svg className="absolute top-2 left-2 w-4 h-4 text-gold-500/30" viewBox="0 0 16 16">
        <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-4 h-4 text-gold-500/30" viewBox="0 0 16 16">
        <path d="M16 8v8H8" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
