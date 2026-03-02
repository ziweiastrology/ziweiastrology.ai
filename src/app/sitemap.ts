import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ziweiastrology.ai").trim();

export default function sitemap(): MetadataRoute.Sitemap {
  /* ── Static routes ───────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/system-comparison`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/academy`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/academy/courses`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/community`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/community/feed`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/community/pillar-data`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/community/analysis`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/community/groups`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  /* ── Dynamic: Resource articles ──────────────────────── */
  const resourceSlugs = [
    "introduction-to-zi-wei-dou-shu",
    "14-major-stars-reference",
    "career-palace-tech-founders",
    "four-transformers-deep-dive",
    "historical-accuracy-dataset",
    "12-palaces-interaction-map",
    "zi-wei-star-cluster-brightness-influence",
    "marriage-palace-compatibility-study",
    "san-he-three-harmonies-framework",
    "annual-transformer-activation-patterns",
    "ming-palace-archetypes-visual-taxonomy",
    "wealth-palace-bull-bear-markets",
    "lucky-stars-vs-sha-stars-statistical-impact",
    "palace-flyover-technique-derived-charts",
    "health-palace-red-flags-case-collection",
    "da-xian-major-limits-navigation",
    "zi-wei-dou-shu-tang-court-origins",
    "complete-star-brightness-table",
  ];

  const resourceRoutes: MetadataRoute.Sitemap = resourceSlugs.map((slug) => ({
    url: `${SITE_URL}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ── Dynamic: Academy courses ────────────────────────── */
  const courseSlugs = [
    "foundations-of-zi-wei",
    "star-interactions",
    "four-transformers-mastery",
    "fractal-time-analysis",
    "sifu-certification",
  ];

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${SITE_URL}/academy/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ── Dynamic: Blog posts ────────────────────────────── */
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ── Merge all ───────────────────────────────────────── */
  return [
    ...staticRoutes.map((route) => ({ ...route, lastModified: new Date() })),
    ...resourceRoutes,
    ...courseRoutes,
    ...blogRoutes,
  ];
}
