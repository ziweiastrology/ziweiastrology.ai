"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import MembershipWall from "@/components/community/MembershipWall";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "", label: "All", emoji: "📊" },
  { value: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { value: "career", label: "Career", emoji: "💼" },
  { value: "love", label: "Love", emoji: "❤️" },
  { value: "partnerships", label: "Partnerships", emoji: "🤝" },
  { value: "health", label: "Health", emoji: "🏥" },
];

const PLACEHOLDER_CASES = [
  {
    id: "1",
    title: "Career Pivot at Decadal Transition: Software Engineer → Founder",
    category: "career",
    excerpt: "Wu Qu + Qi Sha in Career Palace with Lu activation at age 32. Subject left stable employment and founded a successful startup.",
    accuracy: 87,
    createdAt: "2025-11-20T00:00:00Z",
  },
  {
    id: "2",
    title: "Marriage Timing: Tian Xi Meeting Predicted to the Month",
    category: "love",
    excerpt: "Tai Yin in Marriage Palace with Ke transformer. Annual chart overlay pinpointed the meeting of future spouse within a 2-month window.",
    accuracy: 94,
    createdAt: "2025-10-15T00:00:00Z",
  },
  {
    id: "3",
    title: "Family Inheritance Dispute: Property Palace Ji Activation",
    category: "family",
    excerpt: "Ji transformer in Property Palace during the 4th decadal period. Family experienced property dispute exactly as predicted.",
    accuracy: 82,
    createdAt: "2025-09-01T00:00:00Z",
  },
  {
    id: "4",
    title: "Health Crisis Timing: Tian Liang + Tai Yang in Health Palace",
    category: "health",
    excerpt: "Double star configuration in Health Palace with Ji activation during annual chart overlay. Medical event occurred within predicted quarter.",
    accuracy: 78,
    createdAt: "2025-08-10T00:00:00Z",
  },
  {
    id: "5",
    title: "Business Partnership Success: Tan Lang + Tian Xiang Resonance",
    category: "partnerships",
    excerpt: "Triangular resonance between Friends, Career, and Wealth palaces. Partnership formed during Lu-activated annual period yielded 3x returns.",
    accuracy: 91,
    createdAt: "2025-07-22T00:00:00Z",
  },
];

export default function PillarDataPage() {
  const [activeCategory, setActiveCategory] = useState("");

  const filtered = activeCategory
    ? PLACEHOLDER_CASES.filter((c) => c.category === activeCategory)
    : PLACEHOLDER_CASES;

  return (
    <MembershipWall requiredTier="BASIC">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Pillar Data"
          subtitle="Categorized case studies with verified outcomes. Real charts, real results."
        />

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === value
                  ? "bg-gold-500 text-celestial-900"
                  : "border border-gold-700/30 text-parchment-400 hover:border-gold-500/50"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((caseStudy) => (
            <Link
              key={caseStudy.id}
              href={`/community/pillar-data/${caseStudy.id}`}
              className="group flex flex-col rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                  {caseStudy.category}
                </span>
                <span className="text-sm font-bold text-quantum-green">
                  {caseStudy.accuracy}% accuracy
                </span>
              </div>

              <h3
                className="mb-2 text-lg font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {caseStudy.title}
              </h3>

              <p className="mb-4 flex-1 text-sm text-parchment-500 line-clamp-3">
                {caseStudy.excerpt}
              </p>

              <p className="text-xs text-parchment-700">
                {new Date(caseStudy.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </MembershipWall>
  );
}
