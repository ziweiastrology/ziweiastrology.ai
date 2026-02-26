"use client";

import { useState } from "react";

interface Transformer {
  id: string;
  chinese: string;
  pinyin: string;
  western: string;
  symbol: string;
  brief: string;
  traditionalRoot: string;
  mechanismNote: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

const TRANSFORMERS: Transformer[] = [
  {
    id: "lu",
    chinese: "祿",
    pinyin: "Lù",
    western: "Gain",
    symbol: "△",
    brief:
      "The principle of augmentation. When a star receives Lu, its positive attributes are amplified — resources flow, doors open, and latent potential converts into tangible opportunity.",
    traditionalRoot:
      "Derived from the concept of 俸祿 (official salary), Lu originally denoted the material rewards granted by heaven to those in alignment with cosmic timing. In classical texts, it is associated with the element of nourishment: the star 'eats well', meaning it receives the energy it needs to perform at full capacity.",
    mechanismNote:
      "In computational terms, Lu applies a positive coefficient to the base value of its host star, increasing output across all palace-level probability calculations.",
    accentColor: "#2d8a4e",
    glowColor: "rgba(45,138,78,0.12)",
    borderColor: "rgba(45,138,78,0.3)",
  },
  {
    id: "quan",
    chinese: "權",
    pinyin: "Quán",
    western: "Force",
    symbol: "◆",
    brief:
      "The principle of concentrated authority. Quan converts distributed potential into a singular vector of decisive power — leadership, control, and the capacity to alter outcomes.",
    traditionalRoot:
      "Quan (權) literally means 'authority' or 'power to weigh and judge'. In Zi Wei lineage, it was understood as the mandate to act — the heaven-granted right to exert influence over one's domain. A star with Quan does not merely grow; it commands.",
    mechanismNote:
      "Quan modifies the star's interaction weight within palace triads, making it the dominant force in any resonance calculation involving that house.",
    accentColor: "#b8891e",
    glowColor: "rgba(184,137,30,0.12)",
    borderColor: "rgba(184,137,30,0.3)",
  },
  {
    id: "ke",
    chinese: "科",
    pinyin: "Kē",
    western: "Resonance",
    symbol: "○",
    brief:
      "The principle of harmonic recognition. Ke aligns internal substance with external perception — reputation becomes deserved, effort becomes visible, and signal rises above noise.",
    traditionalRoot:
      "科 originally referred to the imperial examination system (科舉) — the formal mechanism by which hidden talent was recognized and elevated. A star receiving Ke gains 'examination luck': the world begins to see what was always there.",
    mechanismNote:
      "Ke adjusts the visibility parameter of its host star, increasing the probability that favorable internal states are reflected in measurable external outcomes.",
    accentColor: "#2a6fb5",
    glowColor: "rgba(42,111,181,0.12)",
    borderColor: "rgba(42,111,181,0.3)",
  },
  {
    id: "ji",
    chinese: "忌",
    pinyin: "Jì",
    western: "Entanglement",
    symbol: "✕",
    brief:
      "The principle of binding constraint. Ji creates non-local correlation between events — attachment, obsession, friction, and the karmic threads that ensure consequences propagate through time.",
    traditionalRoot:
      "忌 means 'taboo' or 'that which must be avoided'. In classical theory, Ji is not evil — it is attachment. It represents the force that binds consciousness to specific outcomes, creating the fixation from which both suffering and deep mastery arise.",
    mechanismNote:
      "Ji introduces a negative coupling term between its host star's palace and the confrontation palace, creating an entangled probability state that cannot be resolved independently.",
    accentColor: "#b5352a",
    glowColor: "rgba(181,53,42,0.12)",
    borderColor: "rgba(181,53,42,0.3)",
  },
];

export default function FourTransformers() {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {TRANSFORMERS.map((t, i) => (
        <TransformerCard key={t.id} transformer={t} index={i} />
      ))}
    </div>
  );
}

function TransformerCard({ transformer: t, index }: { transformer: Transformer; index: number }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div
      className="group relative etched-frame rounded-sm p-7 transition-all duration-500"
      style={{
        borderColor: tooltipOpen ? t.borderColor : undefined,
      }}
    >
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${t.glowColor}, 0 0 20px ${t.glowColor}` }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-4 mb-4">
        {/* Glowing symbol */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 text-lg font-bold"
          style={{
            color: t.accentColor,
            background: `radial-gradient(circle, ${t.glowColor} 0%, transparent 70%)`,
            textShadow: `0 0 12px ${t.glowColor}, 0 0 24px ${t.glowColor}`,
          }}
        >
          {t.symbol}
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl text-celestial-800 font-bold"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {t.chinese}
            </span>
            <span className="text-[10px] text-parchment-500 tracking-wide">{t.pinyin}</span>
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase font-semibold"
            style={{ color: t.accentColor }}
          >
            {t.western}
          </span>
        </div>
      </div>

      {/* Decorative separator */}
      <div className="relative h-px mb-4">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${t.borderColor}, transparent)`,
          }}
        />
      </div>

      {/* Description */}
      <p
        className="relative text-sm text-parchment-800 leading-[1.85] mb-5"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        {t.brief}
      </p>

      {/* Tooltip trigger */}
      <button
        onClick={() => setTooltipOpen(!tooltipOpen)}
        className="inline-flex items-center gap-2 text-xs hover:opacity-80 transition-all group/btn"
        style={{ color: t.accentColor }}
      >
        <svg className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <span className="tracking-wider uppercase font-medium">
          {tooltipOpen ? "Close" : "Traditional Roots"}
        </span>
        <svg
          className={`w-3 h-3 opacity-40 transition-transform duration-200 ${tooltipOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded tooltip */}
      {tooltipOpen && (
        <div
          className="mt-4 p-5 rounded-sm space-y-4 animate-fade-in"
          style={{
            background: `linear-gradient(135deg, ${t.glowColor}, rgba(248,244,237,0.3))`,
            border: `1px solid ${t.borderColor}`,
            boxShadow: `inset 0 0 20px ${t.glowColor}`,
          }}
        >
          <div>
            <h5 className="text-[10px] text-gold-700 tracking-[0.25em] uppercase mb-2 font-semibold">
              Classical Origin
            </h5>
            <p
              className="text-xs text-parchment-700 leading-[1.9]"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              {t.traditionalRoot}
            </p>
          </div>
          <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.borderColor}, transparent)` }} />
          <div>
            <h5 className="text-[10px] text-gold-700 tracking-[0.25em] uppercase mb-2 font-semibold">
              Computational Mechanism
            </h5>
            <p className="text-xs text-parchment-600 leading-[1.9] font-mono">
              {t.mechanismNote}
            </p>
          </div>
        </div>
      )}

      {/* Corner ornaments */}
      <svg className="absolute top-2 left-2 w-4 h-4 opacity-20" viewBox="0 0 16 16" style={{ color: t.accentColor }}>
        <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-4 h-4 opacity-20" viewBox="0 0 16 16" style={{ color: t.accentColor }}>
        <path d="M16 8v8H8" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  );
}
