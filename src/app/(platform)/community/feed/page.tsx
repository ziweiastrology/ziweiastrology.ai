"use client";

import PageHeader from "@/components/layout/PageHeader";
import PostCard from "@/components/community/PostCard";
import PostEditor from "@/components/community/PostEditor";
import MembershipWall from "@/components/community/MembershipWall";

const PLACEHOLDER_POSTS = [
  {
    id: "1",
    title: "Wu Qu in Career Palace — Anyone else seeing this pattern?",
    content:
      "I've been analyzing charts of people in finance and tech, and Wu Qu (武曲) in the Career Palace seems to show up disproportionately. Has anyone done systematic analysis on this? I have about 30 charts to compare.",
    type: "DISCUSSION",
    category: "patterns",
    author: { id: "1", name: "Chen Wei", tier: "PREMIUM" },
    voteScore: 12,
    commentCount: 8,
    pinned: false,
    createdAt: "2025-12-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Case Study: Tai Yang + Tian Liang in Health Palace",
    content:
      "Documenting a fascinating case where Tai Yang and Tian Liang both occupy the Health Palace with Ji transformation active. The subject experienced a health crisis at exactly the predicted decadal transition point.",
    type: "PILLAR_DATA",
    category: "health",
    author: { id: "2", name: "Master Lin", tier: "SIFU" },
    voteScore: 24,
    commentCount: 15,
    pinned: true,
    createdAt: "2025-12-10T08:00:00Z",
  },
  {
    id: "3",
    title: "2026 Annual Chart: Global Economic Predictions",
    content:
      "Using the Zi Wei framework applied to national founding dates, I've mapped out the key economic inflection points for 2026. The Ji activation in the Wealth Palace of several major economies suggests...",
    type: "EVENT_ANALYSIS",
    category: "economics",
    author: { id: "3", name: "Sarah Tan", tier: "PREMIUM" },
    voteScore: 18,
    commentCount: 22,
    pinned: false,
    createdAt: "2025-12-08T14:20:00Z",
  },
  {
    id: "4",
    title: "Chart Analysis Request: Born 1988, Hour of Tiger",
    content:
      "Looking for peer review on a chart I've been working on. The subject was born in the Year of Dragon, Month 3, Day 15, Tiger hour. Interesting Zi Wei + Tian Fu opposition across the Self-Travel axis.",
    type: "CHART_ANALYSIS",
    category: null,
    author: { id: "4", name: "James Koh", tier: "PREMIUM" },
    voteScore: 5,
    commentCount: 3,
    createdAt: "2025-12-05T16:45:00Z",
  },
];

export default function CommunityFeedPage() {
  return (
    <MembershipWall requiredTier="BASIC">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Community Feed"
          subtitle="Discussions, insights, and shared discoveries from practitioners worldwide."
        />

        {/* Post Editor */}
        <div className="mb-8">
          <PostEditor />
        </div>

        {/* Posts */}
        <div className="space-y-4 pb-16">
          {PLACEHOLDER_POSTS.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              href={`/community/feed#post-${post.id}`}
            />
          ))}
        </div>
      </div>
    </MembershipWall>
  );
}
