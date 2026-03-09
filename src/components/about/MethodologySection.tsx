"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function MethodologySection() {
  const t = useTranslations("about");

  const METHODOLOGY_PILLARS = [
    {
      step: "01",
      title: t("methStep1Title"),
      description: t("methStep1Desc"),
      detail: t("methStep1Detail"),
      color: "text-gold-400",
      border: "border-gold-500/30",
    },
    {
      step: "02",
      title: t("methStep2Title"),
      description: t("methStep2Desc"),
      detail: t("methStep2Detail"),
      color: "text-celestial-300",
      border: "border-celestial-400/30",
    },
    {
      step: "03",
      title: t("methStep3Title"),
      description: t("methStep3Desc"),
      detail: t("methStep3Detail"),
      color: "text-quantum-cyan",
      border: "border-quantum-cyan/30",
    },
    {
      step: "04",
      title: t("methStep4Title"),
      description: t("methStep4Desc"),
      detail: t("methStep4Detail"),
      color: "text-quantum-green",
      border: "border-quantum-green/30",
    },
    {
      step: "05",
      title: t("methStep5Title"),
      description: t("methStep5Desc"),
      detail: t("methStep5Detail"),
      color: "text-quantum-orange",
      border: "border-quantum-orange/30",
    },
  ];

  return (
    <section className="py-16">
      <h2
        className="mb-4 text-center text-2xl font-bold text-gold-400 sm:text-3xl"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {t("methodology")}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-parchment-500">
        {t("methodologySubtitle")}
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
