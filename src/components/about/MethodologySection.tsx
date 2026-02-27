"use client";

import { motion } from "framer-motion";

const METHODOLOGY_PILLARS = [
  {
    step: "01",
    title: "Birth Data Input",
    description:
      "Exact birth year, month, day, and hour determine the celestial configuration. True solar time correction ensures sub-minute precision using longitude-based calculations.",
    detail: "144 variables → 500,000+ unique chart configurations",
    color: "text-gold-400",
    border: "border-gold-500/30",
  },
  {
    step: "02",
    title: "12-Palace Mapping",
    description:
      "14 major stars and 100+ minor stars are distributed across 12 life palaces (命宫). Each palace governs a domain: self, wealth, career, relationships, health, travel, and more.",
    detail: "12 palaces × 14 stars × 4 transformers = probability matrix",
    color: "text-celestial-300",
    border: "border-celestial-400/30",
  },
  {
    step: "03",
    title: "Four Transformers",
    description:
      "Lu (禄/catalyst), Quan (权/amplifier), Ke (科/refinement), Ji (忌/friction) — these four mathematical operators modify star energies across palaces, creating the dynamic prediction model.",
    detail: "Each transformer shifts probabilities by measurable deltas",
    color: "text-quantum-cyan",
    border: "border-quantum-cyan/30",
  },
  {
    step: "04",
    title: "Fractal Time Layers",
    description:
      "Charts operate across three temporal scales: Decadal (大限, 10-year periods), Annual (流年), and Monthly (流月). Each layer overlays the natal chart, creating time-specific probability windows.",
    detail: "Nested probability layers → precise timing predictions",
    color: "text-quantum-green",
    border: "border-quantum-green/30",
  },
  {
    step: "05",
    title: "AI Pattern Recognition",
    description:
      "Our models cross-reference chart patterns against historical outcomes from thousands of documented cases. Machine learning identifies correlations that traditional analysis might miss.",
    detail: "Statistical validation against documented historical outcomes",
    color: "text-quantum-orange",
    border: "border-quantum-orange/30",
  },
];

export default function MethodologySection() {
  return (
    <section className="py-16">
      <h2
        className="mb-4 text-center text-2xl font-bold text-gold-400 sm:text-3xl"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        The Methodology
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-parchment-500">
        Ancient mathematical probability, not superstition. Here&apos;s how the
        system works — from raw birth data to actionable prediction.
      </p>

      <div className="space-y-6">
        {METHODOLOGY_PILLARS.map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`rounded-lg border ${pillar.border} bg-celestial-800/30 p-6 sm:p-8`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              {/* Step number */}
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border ${pillar.border} bg-celestial-900/60 text-lg font-bold ${pillar.color}`}
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {pillar.step}
              </div>

              <div className="flex-1">
                <h3
                  className={`mb-2 text-lg font-bold ${pillar.color}`}
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {pillar.title}
                </h3>
                <p className="leading-relaxed text-parchment-400">
                  {pillar.description}
                </p>
                <p className="mt-3 text-sm font-mono text-parchment-600 opacity-70">
                  {pillar.detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
