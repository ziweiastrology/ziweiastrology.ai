import type { Metadata } from "next";

const RESOURCE_TITLES: Record<string, string> = {
  "introduction-to-zi-wei-dou-shu": "Introduction to Zi Wei Dou Shu",
  "14-major-stars-reference": "The 14 Major Stars: Complete Reference",
  "career-palace-tech-founders": "Career Palace Patterns in Tech Founders",
  "four-transformers-deep-dive": "The Four Transformers (Si Hua) Deep Dive",
  "historical-accuracy-dataset": "Historical Accuracy Dataset (206 Records)",
  "12-palaces-interaction-map": "The 12 Palaces: Interaction Map & Resonance Patterns",
  "zi-wei-star-cluster-brightness-influence": "Zi Wei Star Cluster: Brightness & Influence Mechanics",
  "marriage-palace-compatibility-study": "Marriage Palace Compatibility: 1000-Chart Study",
  "san-he-three-harmonies-framework": "The San He (Three Harmonies) Framework Explained",
  "annual-transformer-activation-patterns": "Annual Transformer Activation Patterns (1924-2024)",
  "ming-palace-archetypes-visual-taxonomy": "Ming Palace Archetypes: A Visual Taxonomy",
  "wealth-palace-bull-bear-markets": "Wealth Palace in Bull & Bear Markets",
  "lucky-stars-vs-sha-stars-statistical-impact": "Lucky Stars vs Sha Stars: Statistical Impact",
  "palace-flyover-technique-derived-charts": "Palace Flyover Technique & Derived Charts",
  "health-palace-red-flags-case-collection": "Health Palace Red Flags: Case Collection",
  "da-xian-major-limits-navigation": "Da Xian (Major Limits) Navigation",
  "zi-wei-dou-shu-tang-court-origins": "Zi Wei Dou Shu: Tang Court Origins",
  "complete-star-brightness-table": "Complete Star Brightness Table",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = RESOURCE_TITLES[slug] || "Resource";

  return {
    title,
    description: `${title} — Zi Wei Dou Shu resource on ziweiastrology.ai`,
    keywords: ["zi wei dou shu", "purple star astrology", title.toLowerCase(), "紫微斗数"],
    openGraph: {
      title,
      description: `${title} — Zi Wei Dou Shu resource on ziweiastrology.ai`,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: `${title} — Zi Wei Dou Shu resource on ziweiastrology.ai`,
    },
    alternates: {
      canonical: `https://ziweiastrology.ai/resources/${slug}`,
    },
  };
}

export default function ResourceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
