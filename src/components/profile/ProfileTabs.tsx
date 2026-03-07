"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import PostCard from "@/components/community/PostCard";

interface ProfileTabsProps {
  userId: string;
  posts: {
    id: string;
    title: string;
    content: string;
    type: string;
    category?: string | null;
    voteScore: number;
    commentCount: number;
    createdAt: string;
    pinned?: boolean;
    author: { id: string; name: string | null; tier: string };
  }[];
}

const TABS = [
  { key: "posts", label: "帖子 Posts" },
];

export default function ProfileTabs({ posts }: ProfileTabsProps) {
  const [active, setActive] = useState("posts");

  return (
    <div>
      <div className="mb-4 flex border-b border-gold-700/20">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              active === tab.key
                ? "border-b-2 border-gold-400 text-gold-400"
                : "text-parchment-600 hover:text-parchment-400"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "posts" && (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="py-8 text-center text-sm text-parchment-600">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} {...post} href={`/community/post/${post.id}`} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
