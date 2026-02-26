"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import GeometryOfDestiny from "./GeometryOfDestiny";
import FourTransformers from "./FourTransformers";
import FractalTimeLogic from "./FractalTimeLogic";
import LogicCheckBlock from "./LogicCheckBlock";
import StarLibrary from "./StarLibrary";
import BinaryAncestry from "./BinaryAncestry";
import OrnamentalDivider from "../OrnamentalDivider";

interface SectionDef {
  id: string;
  number: string;
  label: string;
  sublabel: string;
}

const SECTIONS: SectionDef[] = [
  { id: "geometry", number: "I", label: "Geometry of Destiny", sublabel: "The Twelve Palaces" },
  { id: "transformers", number: "II", label: "The Four Transformers", sublabel: "化祿 · 化權 · 化科 · 化忌" },
  { id: "fractal", number: "III", label: "Fractal Time Logic", sublabel: "Self-Similar Temporal Structure" },
  { id: "logic-check", number: "IV", label: "Logic Certification", sublabel: "Verification of Fidelity" },
  { id: "star-library", number: "V", label: "Star Library", sublabel: "108 Stellar Parameters" },
  { id: "binary-ancestry", number: "VI", label: "Binary Ancestry", sublabel: "From Yin-Yang to Bits" },
];

export default function ScholarlyFoundation() {
  const [activeSection, setActiveSection] = useState("geometry");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const setRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    for (const id of SECTIONS.map((s) => s.id)) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={containerRef} className="relative parchment-bg">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent mt-px" />

      {/* Section masthead */}
      <div className="max-w-5xl mx-auto text-center pt-28 pb-8 px-6">
        <div className="inline-flex items-center gap-3 mb-6">
          <svg viewBox="0 0 20 2" className="w-10 h-0.5"><line x1="0" y1="1" x2="20" y2="1" stroke="rgba(143,107,23,0.3)" strokeWidth="0.5" /></svg>
          <span className="text-[10px] text-gold-700 tracking-[0.5em] uppercase">
            Scholarly Foundation
          </span>
          <svg viewBox="0 0 20 2" className="w-10 h-0.5"><line x1="0" y1="1" x2="20" y2="1" stroke="rgba(143,107,23,0.3)" strokeWidth="0.5" /></svg>
        </div>
        <h2
          className="text-3xl md:text-5xl font-bold gold-gradient-text mb-5"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Academic Foundations
        </h2>
        <p
          className="text-sm text-parchment-600 max-w-lg mx-auto leading-[1.8]"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          A millennium of astronomical observation, distilled into computational
          precision. Four perspectives on the system&apos;s underlying logic.
        </p>
      </div>

      {/* Sticky navigation bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md border-y border-gold-700/10"
        style={{
          background: "linear-gradient(180deg, rgba(240,232,216,0.92) 0%, rgba(240,232,216,0.88) 100%)",
        }}
      >
        <nav className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`relative flex-shrink-0 px-5 py-3.5 text-xs tracking-[0.12em] uppercase transition-all duration-300
                  ${activeSection === s.id
                    ? "text-gold-800 font-semibold"
                    : "text-parchment-500 hover:text-parchment-700"
                  }`}
              >
                <span className="opacity-40 mr-1.5">{s.number}</span>
                {s.label}
                {activeSection === s.id && (
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, #8f6b17, transparent)" }} />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Content sections */}
      <div className="max-w-5xl mx-auto px-6">
        {/* I. Geometry of Destiny */}
        <div ref={setRef("geometry")} id="geometry" className="pt-24 pb-28 scroll-mt-14">
          <SectionHeader
            number="I"
            title="The Geometry of Destiny"
            subtitle="Twelve domains of human experience, arranged in the classical palace matrix."
          />
          <GeometryOfDestiny />
        </div>

        <OrnamentalDivider variant="parchment" />

        {/* II. The Four Transformers */}
        <div ref={setRef("transformers")} id="transformers" className="pt-24 pb-28 scroll-mt-14">
          <SectionHeader
            number="II"
            title="The Four Transformers"
            subtitle="The operators that modify stellar influence — the grammar of change in the Zi Wei system."
          />
          <FourTransformers />
        </div>

        <OrnamentalDivider variant="parchment" />

        {/* III. Fractal Time Logic */}
        <div ref={setRef("fractal")} id="fractal" className="pt-24 pb-28 scroll-mt-14">
          <SectionHeader
            number="III"
            title="Fractal Time Logic"
            subtitle="The same structural logic operates at every temporal scale — from decades to days."
          />
          <FractalTimeLogic />
        </div>

        <OrnamentalDivider variant="parchment" />

        {/* IV. Logic Certification */}
        <div ref={setRef("logic-check")} id="logic-check" className="pt-24 pb-28 scroll-mt-14">
          <SectionHeader
            number="IV"
            title="Logic Certification"
            subtitle="An account of algorithmic verification against canonical sources."
          />
          <LogicCheckBlock />
        </div>

        <OrnamentalDivider variant="parchment" />

        {/* V. Star Library */}
        <div ref={setRef("star-library")} id="star-library" className="pt-24 pb-28 scroll-mt-14">
          <SectionHeader
            number="V"
            title="The 108 Star Library"
            subtitle="The stellar parameters that populate the twelve palaces — the vocabulary of destiny."
          />
          <StarLibrary />
        </div>

        <OrnamentalDivider variant="parchment" />

        {/* VI. Binary Ancestry */}
        <div ref={setRef("binary-ancestry")} id="binary-ancestry" className="pt-24 pb-32 scroll-mt-14">
          <SectionHeader
            number="VI"
            title="The Binary Ancestry"
            subtitle="3,000 years before silicon — the I Ching's Yin-Yang logic as the world's first binary system."
          />
          <BinaryAncestry />
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent mt-px" />
    </section>
  );
}

/* ============================================
   Section Header — with golden gradient title
   ============================================ */

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-16">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-xs text-gold-600/50 font-mono">{number}.</span>
        <h3
          className="text-xl md:text-2xl gold-gradient-text font-bold"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {title}
        </h3>
      </div>
      <p
        className="text-sm text-parchment-600 leading-relaxed max-w-xl"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        {subtitle}
      </p>
      {/* Ornamental thin rule with center dot */}
      <div className="flex items-center gap-3 mt-6">
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-gold-600/20 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-gold-600/30" />
      </div>
    </div>
  );
}
