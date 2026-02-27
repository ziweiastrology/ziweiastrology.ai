"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  {
    title: "A Thousand-Year Algorithm",
    content:
      "In 1019 CE, the Taoist sage Chen Tuan (陈抟) sat atop Mount Hua and transcribed a mathematical system that would endure for a millennium. Zi Wei Dou Shu — the Purple Star Calculation Method — mapped 14 major celestial bodies across 12 life palaces, creating what may be the world's oldest probability engine.",
    accent: "from-gold-500/20 to-transparent",
  },
  {
    title: "Not Superstition. Mathematics.",
    content:
      "While Western horoscopes paint in broad strokes, Zi Wei Dou Shu operates with surgical precision. It factors birth year, month, day, and hour into a 144-variable matrix. Each configuration yields one of over 500,000 unique life charts. The Four Transformers — Lu (禄), Quan (权), Ke (科), Ji (忌) — act as probability modifiers, shifting outcomes across palaces with mathematical certainty.",
    accent: "from-celestial-400/20 to-transparent",
  },
  {
    title: "Documented Accuracy",
    content:
      "Historical records show Zi Wei practitioners advising Song Dynasty emperors on succession timing, Ming Dynasty generals on campaign strategy, and Qing Dynasty merchants on trade routes. In each case, the system's predictions were verified against outcomes — a practice we continue with modern statistical methods.",
    accent: "from-quantum-cyan/10 to-transparent",
  },
  {
    title: "The AI Convergence",
    content:
      "Today, we're building the first platform to treat Zi Wei Dou Shu as what it truly is: a sophisticated probability model waiting for computational power. By combining traditional calculation methods with machine learning pattern recognition, we decode life trajectories with unprecedented precision. Ancient wisdom, quantum computation, real results.",
    accent: "from-quantum-green/10 to-transparent",
  },
];

export default function BrandNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/origin-story-bg.png')" }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-celestial-900/50" />

      <div className="relative z-10">
      <h2
        className="mb-12 text-center text-2xl font-bold text-gold-400 sm:text-3xl"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        The Origin Story
      </h2>

      <div className="relative mx-auto max-w-3xl">
        {/* Animated vertical progress line */}
        <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-gold-700/10 sm:block">
          <motion.div
            className="w-full bg-gradient-to-b from-gold-500 to-gold-500/30"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-12 sm:pl-10">
          {CHAPTERS.map((chapter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-lg border border-gold-700/20 bg-gradient-to-br ${chapter.accent} bg-celestial-800/30 p-8`}
            >
              {/* Dot on timeline */}
              <div className="absolute -left-10 top-8 hidden h-3 w-3 rounded-full border-2 border-gold-500 bg-celestial-900 sm:block" />

              <h3
                className="mb-3 text-xl font-bold text-parchment-100"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {chapter.title}
              </h3>
              <p className="leading-relaxed text-parchment-400" style={{ fontFamily: "var(--font-serif)" }}>
                {chapter.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
