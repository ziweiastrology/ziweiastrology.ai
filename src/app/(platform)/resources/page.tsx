"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ResourceCard from "@/components/resources/ResourceCard";
import ResourceFilter from "@/components/resources/ResourceFilter";
import { useResources } from "@/hooks/useResources";

// Placeholder data for when DB is not connected
const PLACEHOLDER_RESOURCES = [
  {
    id: "1",
    slug: "introduction-to-zi-wei-dou-shu",
    title: "Introduction to Zi Wei Dou Shu",
    type: "ARTICLE" as const,
    category: "fundamentals",
    excerpt:
      "A comprehensive primer on the foundational concepts of Purple Star Astrology — the 12 palaces, 14 major stars, and the mathematical framework that powers predictions.",
    fileUrl: null,
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "2",
    slug: "14-major-stars-reference",
    title: "The 14 Major Stars: Complete Reference Guide",
    type: "PDF" as const,
    category: "stars",
    excerpt:
      "Detailed reference for all 14 primary stars — Zi Wei, Tian Ji, Tai Yang, Wu Qu, and more. Includes palace interaction matrices and transformation effects.",
    fileUrl: null,
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "3",
    slug: "career-palace-tech-founders",
    title: "Career Palace Analysis: Tech Founders",
    type: "CASE_STUDY" as const,
    category: "case-analysis",
    excerpt:
      "Statistical analysis of Career Palace (官禄宫) configurations among 50 successful tech entrepreneurs. Patterns of Wu Qu + Tian Xiang dominance.",
    fileUrl: null,
    createdAt: "2025-03-10T00:00:00Z",
  },
  {
    id: "4",
    slug: "four-transformers-deep-dive",
    title: "Four Transformers: Mathematical Operators of Destiny",
    type: "ARTICLE" as const,
    category: "transformers",
    excerpt:
      "Deep exploration of Lu (禄), Quan (权), Ke (科), Ji (忌) — how these four operators modify probability across the 12 palaces and create predictable patterns.",
    fileUrl: null,
    createdAt: "2025-04-05T00:00:00Z",
  },
  {
    id: "5",
    slug: "historical-accuracy-dataset",
    title: "Historical Prediction Accuracy Dataset (Song–Qing Dynasties)",
    type: "DATASET" as const,
    category: "history",
    excerpt:
      "Curated dataset of 200+ documented Zi Wei predictions from historical records, with outcomes verified against dynastic chronicles.",
    fileUrl: null,
    createdAt: "2025-05-20T00:00:00Z",
  },
  {
    id: "6",
    slug: "12-palaces-interaction-map",
    title: "The 12 Palaces: Interaction Map & Resonance Patterns",
    type: "PDF" as const,
    category: "palaces",
    excerpt:
      "Visual guide to palace-to-palace interactions. Includes the Triangle of Power, the Axis of Tension, and harmonic resonance detection.",
    fileUrl: null,
    createdAt: "2025-06-12T00:00:00Z",
  },
  {
    id: "7",
    slug: "zi-wei-star-cluster-brightness-influence",
    title: "Zi Wei Star Cluster: Brightness & Influence Mechanics",
    type: "ARTICLE" as const,
    category: "stars",
    excerpt:
      "How the Zi Wei (紫微) cluster — Zi Wei, Tian Fu, Tian Xiang — shifts influence based on brightness levels across the 12 palaces. Includes miao/xian/ping/xian scoring tables.",
    fileUrl: null,
    createdAt: "2025-07-03T00:00:00Z",
  },
  {
    id: "8",
    slug: "marriage-palace-compatibility-study",
    title: "Marriage Palace Compatibility: 1000-Chart Study",
    type: "CASE_STUDY" as const,
    category: "case-analysis",
    excerpt:
      "Cross-referencing Marriage Palace (夫妻宫) configurations across 1,000 couples. Identifies high-compatibility star pairings and statistically significant conflict indicators.",
    fileUrl: null,
    createdAt: "2025-07-18T00:00:00Z",
  },
  {
    id: "9",
    slug: "san-he-three-harmonies-framework",
    title: "The San He (Three Harmonies) Framework Explained",
    type: "ARTICLE" as const,
    category: "fundamentals",
    excerpt:
      "Foundational guide to the San He (三合) triangular palace groupings — how Life, Wealth, and Career palaces form a resonant triad that shapes destiny trajectories.",
    fileUrl: null,
    createdAt: "2025-08-05T00:00:00Z",
  },
  {
    id: "10",
    slug: "annual-transformer-activation-patterns",
    title: "Annual Transformer Activation Patterns (1924–2024)",
    type: "DATASET" as const,
    category: "transformers",
    excerpt:
      "Century-spanning dataset mapping Lu, Quan, Ke, Ji activations by year stem. Reveals cyclical clustering and decadal drift patterns in transformer distributions.",
    fileUrl: null,
    createdAt: "2025-08-22T00:00:00Z",
  },
  {
    id: "11",
    slug: "ming-palace-archetypes-visual-taxonomy",
    title: "Ming Palace Archetypes: A Visual Taxonomy",
    type: "PDF" as const,
    category: "palaces",
    excerpt:
      "Illustrated classification of 36 Ming Palace (命宫) archetypes based on primary star occupants. Each archetype includes personality sketch, career leanings, and health tendencies.",
    fileUrl: null,
    createdAt: "2025-09-10T00:00:00Z",
  },
  {
    id: "12",
    slug: "wealth-palace-bull-bear-markets",
    title: "Wealth Palace Signals in Bull & Bear Markets",
    type: "CASE_STUDY" as const,
    category: "case-analysis",
    excerpt:
      "Analysis of Wealth Palace (财帛宫) transits during major market cycles. Correlates Ji-transformed stars with downturns and Lu activations with accumulation phases.",
    fileUrl: null,
    createdAt: "2025-09-28T00:00:00Z",
  },
  {
    id: "13",
    slug: "lucky-stars-vs-sha-stars-statistical-impact",
    title: "Lucky Stars vs. Sha Stars: Statistical Impact Analysis",
    type: "DATASET" as const,
    category: "stars",
    excerpt:
      "Quantitative comparison of auspicious auxiliary stars (Zuo Fu, You Bi, Tian Kui) versus sha stars (Qing Yang, Tuo Luo, Huo Xing) across 5,000 natal charts.",
    fileUrl: null,
    createdAt: "2025-10-15T00:00:00Z",
  },
  {
    id: "14",
    slug: "palace-flyover-technique-derived-charts",
    title: "Palace Flyover Technique: Derived Charts Guide",
    type: "PDF" as const,
    category: "fundamentals",
    excerpt:
      "Step-by-step manual for the Fei Gong (飞宫) technique — deriving secondary charts by re-centering the palace wheel. Essential for advanced event-level prediction.",
    fileUrl: null,
    createdAt: "2025-11-02T00:00:00Z",
  },
  {
    id: "15",
    slug: "health-palace-red-flags-case-collection",
    title: "Health Palace Red Flags: A Practitioner's Case Collection",
    type: "CASE_STUDY" as const,
    category: "palaces",
    excerpt:
      "Thirty documented cases where Health Palace (疾厄宫) configurations accurately flagged chronic conditions. Includes Tian Ji + Ju Men and Lian Zhen + Tan Lang patterns.",
    fileUrl: null,
    createdAt: "2025-11-20T00:00:00Z",
  },
  {
    id: "16",
    slug: "da-xian-major-limits-navigation",
    title: "Da Xian (Major Limits): 10-Year Period Navigation",
    type: "ARTICLE" as const,
    category: "transformers",
    excerpt:
      "Practical guide to interpreting Da Xian (大限) decade cycles — how transformer activations shift every 10 years and reshape palace priorities across the life arc.",
    fileUrl: null,
    createdAt: "2025-12-08T00:00:00Z",
  },
  {
    id: "17",
    slug: "zi-wei-dou-shu-tang-court-origins",
    title: "Zi Wei Dou Shu in the Tang Court: Origins & Evolution",
    type: "ARTICLE" as const,
    category: "history",
    excerpt:
      "Tracing the system from Chen Tuan's (陈抟) Song-dynasty codification back to Tang-era star worship. Examines how imperial astronomers shaped the 12-palace framework.",
    fileUrl: null,
    createdAt: "2025-12-25T00:00:00Z",
  },
  {
    id: "18",
    slug: "complete-star-brightness-table",
    title: "Complete Star Brightness Table by Palace Position",
    type: "DATASET" as const,
    category: "stars",
    excerpt:
      "Exhaustive lookup table for all 108 star-palace combinations with brightness grades (庙/旺/得/利/平/不/陷). Machine-readable format for integration with analysis tools.",
    fileUrl: null,
    createdAt: "2026-01-10T00:00:00Z",
  },
];

export default function ResourcesPage() {
  const [activeType, setActiveType] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const { data, isLoading, isError } = useResources({
    type: activeType,
    category: activeCategory,
  });

  // Use API data if available, otherwise use placeholders
  const resources = data?.resources ?? PLACEHOLDER_RESOURCES;
  const displayResources = resources.filter((r) => {
    if (activeType && r.type !== activeType) return false;
    if (activeCategory && r.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Resources"
        subtitle="Articles, research papers, datasets, and case studies exploring the mathematical foundations of Zi Wei Dou Shu."
      />

      <ResourceFilter
        activeType={activeType}
        activeCategory={activeCategory}
        onTypeChange={setActiveType}
        onCategoryChange={setActiveCategory}
      />

      <section className="pb-16">
        {isLoading && !data ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-lg border border-gold-700/10 bg-celestial-800/20"
              />
            ))}
          </div>
        ) : displayResources.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-parchment-500">
              No resources found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                slug={resource.slug}
                title={resource.title}
                type={resource.type}
                category={resource.category}
                excerpt={resource.excerpt}
                createdAt={resource.createdAt}
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="mt-4 text-center text-sm text-parchment-600">
            Showing sample resources. Connect a database for live data.
          </p>
        )}
      </section>
    </div>
  );
}
