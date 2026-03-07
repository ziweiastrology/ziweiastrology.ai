"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, MessageSquare, ChevronUp } from "lucide-react";

interface TrendingPost {
  id: string;
  title: string;
  voteScore: number;
  _count: { comments: number };
}

export default function TrendingPostsCard() {
  const [posts, setPosts] = useState<TrendingPost[]>([]);

  useEffect(() => {
    fetch("/api/community/posts?sort=hot&limit=5")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts?.slice(0, 5) || []))
      .catch(() => {});
  }, []);

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-800/30 p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-parchment-200">
        <TrendingUp className="h-4 w-4 text-gold-400" />
        Trending
      </h3>

      <div className="space-y-2">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/community/post/${post.id}`}
            className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-celestial-700/30 transition-colors"
          >
            <span className="mt-0.5 text-xs font-bold text-parchment-700">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-parchment-400 line-clamp-1">{post.title}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-parchment-700">
                <span className="flex items-center gap-0.5">
                  <ChevronUp className="h-3 w-3" />
                  {post.voteScore || 0}
                </span>
                <span className="flex items-center gap-0.5">
                  <MessageSquare className="h-3 w-3" />
                  {post._count?.comments || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-xs text-parchment-600">No trending posts yet</p>
        )}
      </div>

      <Link
        href="/community/feed"
        className="mt-3 flex items-center gap-1 text-xs text-gold-400 hover:underline"
      >
        View community <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
