"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Atom, Crown, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pillarArticles, type PillarArticle } from "./pillarArticleData";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Atom,
  Crown,
  Gauge,
};

function OrnamentalDivider() {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <span className="text-xs tracking-widest text-gold-500/60">
        ✦ ✦ ✦
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </div>
  );
}

function ArticleCard({ article, index }: { article: PillarArticle; index: number }) {
  const Icon = iconMap[article.icon];

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-8"
    >
      {/* Hero Image */}
      <div
        className={`relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br sm:h-80 ${article.gradientFrom} ${article.gradientTo}`}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt || article.headline}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : (
          <>
            {/* Background pattern fallback */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px), radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            {Icon && (
              <Icon className={`h-16 w-16 ${article.color} opacity-20`} />
            )}
          </>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-celestial-950/80 to-transparent" />
      </div>

      {/* Headline */}
      <div className="space-y-3">
        <h2
          className={`text-2xl font-bold sm:text-3xl ${article.color}`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {article.headline}
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-current to-transparent opacity-40" />
      </div>

      {/* Intro paragraph */}
      <p
        className="text-base leading-relaxed text-parchment-400 sm:text-lg"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {article.intro}
      </p>

      {/* Sub-sections */}
      <div className="space-y-8">
        {article.sections.map((section, i) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="space-y-3"
          >
            <h3
              className="text-lg font-bold text-parchment-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {section.heading}
            </h3>
            {section.headingCn && (
              <p className="text-sm text-parchment-500">
                {section.headingCn}
              </p>
            )}
            <p
              className="leading-relaxed text-parchment-400"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {section.body}
            </p>
            {section.formula && (
              <div className="rounded-lg border border-quantum-cyan/20 bg-celestial-900/60 p-4 text-center font-mono text-lg text-quantum-cyan">
                {section.formula}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      {article.cta && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`border-l-3 ${article.accentBorder}/40 pl-4 italic text-parchment-400`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {article.cta}
        </motion.p>
      )}
    </motion.section>
  );
}

export default function PillarArticles() {
  return (
    <div className="space-y-16 py-16">
      {/* Section intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p
          className="text-sm uppercase tracking-[0.2em] text-gold-500/70"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Foundational Research
        </p>
      </motion.div>

      {pillarArticles.map((article, index) => (
        <div key={article.id}>
          <ArticleCard article={article} index={index} />
          {index < pillarArticles.length - 1 && (
            <div className="pt-16">
              <OrnamentalDivider />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
