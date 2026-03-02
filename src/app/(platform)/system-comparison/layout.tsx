import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "System Comparison — ziweiastrology.ai",
  description:
    "Benchmark Zi Wei Dou Shu against Western astrology, Ba Zi, I Ching, and Tarot across predictive timing, structural complexity, and analytical depth. Explore the ancient computational roots and performance comparison of global divination systems.",
  keywords: [
    "zi wei dou shu vs bazi",
    "chinese astrology vs western astrology",
    "bazi vs zi wei",
    "four pillars of destiny",
    "i ching vs astrology",
    "tarot vs astrology",
    "divination systems comparison",
    "best astrology system",
    "八字 vs 紫微斗数",
    "chinese fortune telling methods",
  ],
  openGraph: {
    title: "System Comparison — Zi Wei Dou Shu vs Global Divination Systems",
    description:
      "Benchmark Zi Wei Dou Shu against Western astrology, Ba Zi, I Ching, and Tarot across predictive timing, structural complexity, and analytical depth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Comparison — Zi Wei Dou Shu vs Global Divination Systems",
    description:
      "Benchmark Zi Wei Dou Shu against Western astrology, Ba Zi, I Ching, and Tarot across predictive timing and analytical depth.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "System Comparison — Zi Wei Dou Shu vs Global Divination Systems",
  description:
    "A rigorous performance benchmark comparing Zi Wei Dou Shu (Purple Star Astrology) against Western astrology, Ba Zi, I Ching, and Tarot across predictive timing, structural complexity, time layers, strength grading, and analytical depth.",
  mainEntity: {
    "@type": "ItemList",
    name: "Divination System Comparison",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Zi Wei Dou Shu (紫微斗数)",
        description:
          "108-star matrix across 12 palaces with 4-layer temporal analysis. Imperial-grade birth-chart system with built-in strength grading and predictive timing.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ba Zi (八字 — Eight Characters)",
        description:
          "Four Pillars system using 10 Heavenly Stems and 12 Earthly Branches. Elemental flow analysis for broad life themes and balance.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Western Astrology (西洋占星)",
        description:
          "12-house system tracking 10 planetary bodies plus asteroids. Transit-based timing with aspect analysis.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "I Ching (易经)",
        description:
          "64-hexagram binary system for situational divination. Moment-based consultation rather than birth-chart analysis.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Tarot (塔罗牌)",
        description:
          "78-card system (22 Major + 56 Minor Arcana) for intuitive situational guidance and self-reflection.",
      },
    ],
  },
};

export default function SystemComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "System Comparison", href: "/system-comparison" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
