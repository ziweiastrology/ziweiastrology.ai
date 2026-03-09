"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BrandNarrative() {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const CHAPTERS = [
    {
      title: t("chapter1Title"),
      content: t("chapter1Content"),
      accent: "from-gold-500/20 to-transparent",
    },
    {
      title: t("chapter2Title"),
      content: t("chapter2Content"),
      accent: "from-celestial-400/20 to-transparent",
    },
    {
      title: t("chapter3Title"),
      content: t("chapter3Content"),
      accent: "from-quantum-cyan/10 to-transparent",
    },
    {
      title: t("chapter4Title"),
      content: t("chapter4Content"),
      accent: "from-quantum-green/10 to-transparent",
    },
  ];

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
        {t("originStory")}
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
