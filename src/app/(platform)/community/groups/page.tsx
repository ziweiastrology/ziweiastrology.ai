"use client";

import Link from "next/link";
import { Users, MessageSquare } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import MembershipWall from "@/components/community/MembershipWall";

const PLACEHOLDER_GROUPS = [
  {
    id: "1",
    name: "Beginner Study Circle",
    slug: "beginner-study",
    description:
      "A welcoming space for those new to Zi Wei Dou Shu. Ask questions, share learning resources, and practice chart reading together.",
    memberCount: 156,
    postCount: 342,
  },
  {
    id: "2",
    name: "Four Transformers Research",
    slug: "four-transformers",
    description:
      "Advanced discussion on Lu, Quan, Ke, Ji interactions. Statistical analysis, pattern identification, and case documentation.",
    memberCount: 67,
    postCount: 189,
  },
  {
    id: "3",
    name: "Career & Wealth Analysis",
    slug: "career-wealth",
    description:
      "Focused on Career Palace and Wealth Palace patterns. Business timing, career pivots, investment decisions through the Zi Wei lens.",
    memberCount: 94,
    postCount: 276,
  },
  {
    id: "4",
    name: "Historical Cases Archive",
    slug: "historical-cases",
    description:
      "Documenting and analyzing historical Zi Wei predictions. Cross-referencing with dynastic records and modern statistical methods.",
    memberCount: 43,
    postCount: 98,
  },
];

export default function GroupsPage() {
  return (
    <MembershipWall requiredTier="BASIC">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Groups"
          subtitle="Join focused study groups organized by topic and experience level."
        />

        <div className="grid gap-6 pb-16 sm:grid-cols-2">
          {PLACEHOLDER_GROUPS.map((group) => (
            <Link
              key={group.id}
              href={`/community/groups/${group.id}`}
              className="group rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
            >
              <h3
                className="mb-2 text-lg font-bold text-parchment-200 group-hover:text-gold-400 transition-colors"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {group.name}
              </h3>
              <p className="mb-4 text-sm text-parchment-500">
                {group.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-parchment-600">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {group.memberCount} members
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {group.postCount} posts
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MembershipWall>
  );
}
