"use client";

import FlyingStarPalace from "./FlyingStarPalace";
import FourStatesCards from "./FourStatesCards";
import LineageStatement from "./LineageStatement";

export default function AcademicFoundations() {
  return (
    <section className="relative parchment-bg">
      {/* Fine top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center pt-24 pb-16 px-6">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-500/40" />
            <span className="text-xs text-gold-700 tracking-[0.4em] uppercase">
              Scholarly Archive
            </span>
            <div className="h-px w-12 bg-gold-500/40" />
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-celestial-800 mb-6"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Academic Foundations
          </h2>
          <p
            className="text-lg text-parchment-700 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            A millennium of astronomical observation, distilled into
            computational precision.
          </p>
        </div>

        {/* Flying Star Palace Schematic */}
        <div className="px-6 pb-20">
          <div className="text-center mb-10">
            <h3
              className="text-xl text-celestial-700 mb-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Flying Star Palace Transition
            </h3>
            <p className="text-sm text-parchment-600">
              The twelve palaces mapped as a computational circuit — ancient
              structure, modern precision.
            </p>
          </div>
          <FlyingStarPalace />
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center gap-4 px-6 pb-20">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-gold-500/20" />
          <svg className="w-4 h-4 text-gold-500/30" viewBox="0 0 16 16">
            <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="currentColor" />
          </svg>
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-gold-500/20" />
        </div>

        {/* Four States Module */}
        <div className="px-6 pb-20">
          <div className="text-center mb-12">
            <h3
              className="text-xl text-celestial-700 mb-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              The Four Transformative Forces
            </h3>
            <p className="text-sm text-parchment-600">
              祿 · 權 · 科 · 忌 — The four quantum states that govern
              probability transitions.
            </p>
          </div>
          <FourStatesCards />
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center gap-4 px-6 pb-20">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-gold-500/20" />
          <svg className="w-4 h-4 text-gold-500/30" viewBox="0 0 16 16">
            <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="currentColor" />
          </svg>
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-gold-500/20" />
        </div>

        {/* Lineage Statement */}
        <div className="px-6 pb-24">
          <LineageStatement />
        </div>
      </div>

      {/* Fine bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </section>
  );
}
