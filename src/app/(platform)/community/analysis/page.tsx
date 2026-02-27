"use client";

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import MembershipWall from "@/components/community/MembershipWall";

const PLACEHOLDER_ANALYSES = [
  {
    slug: "2026-economic-outlook",
    title: "2026 Economic Outlook: Ji in Global Wealth Palace",
    excerpt:
      "Applying Zi Wei framework to the founding dates of major economies. The Ji activation pattern suggests caution in Q2-Q3.",
    author: "Master Lin",
    createdAt: "2025-12-20T00:00:00Z",
  },
  {
    slug: "tech-leader-career-palace",
    title: "Tech Industry Leaders: Career Palace Pattern Analysis",
    excerpt:
      "Systematic analysis of Career Palace configurations among Fortune 500 tech CEOs. Wu Qu dominance confirmed at 74%.",
    author: "Dr. Wei Chen",
    createdAt: "2025-11-15T00:00:00Z",
  },
  {
    slug: "historical-event-prediction",
    title: "Historical Event Mapping: Song Dynasty Predictions Validated",
    excerpt:
      "Cross-referencing Chen Tuan's documented predictions with newly discovered historical records. Accuracy rate: 81%.",
    author: "Prof. Zhang",
    createdAt: "2025-10-01T00:00:00Z",
  },
];

export default function AnalysisPage() {
  return (
    <MembershipWall requiredTier="BASIC">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Analysis"
          subtitle="In-depth Zi Wei Dou Shu breakdowns of events, public figures, and historical patterns."
        />

        <div className="space-y-6 pb-16">
          {PLACEHOLDER_ANALYSES.map((analysis) => (
            <Link
              key={analysis.slug}
              href={`/community/analysis/${analysis.slug}`}
              className="group block rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
            >
              <h3
                className="mb-2 text-xl font-bold text-parchment-200 group-hover:text-gold-400 transition-colors"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {analysis.title}
              </h3>
              <p className="mb-3 text-sm text-parchment-500">
                {analysis.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-parchment-600">
                <span>By {analysis.author}</span>
                <span>·</span>
                <span>
                  {new Date(analysis.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MembershipWall>
  );
}
