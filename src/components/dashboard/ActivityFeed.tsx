"use client";

import Link from "next/link";
import { MessageSquare, FileText, Clock } from "lucide-react";

interface ActivityFeedProps {
  recentPosts: Array<{
    id: string;
    title: string;
    type: string;
    createdAt: string;
    _count: { comments: number; votes: number };
  }>;
  recentComments: Array<{
    id: string;
    content: string;
    createdAt: string;
    post: { id: string; title: string };
  }>;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function ActivityFeed({
  recentPosts,
  recentComments,
}: ActivityFeedProps) {
  const activities = [
    ...recentPosts.map((p) => ({
      type: "post" as const,
      id: p.id,
      title: p.title,
      createdAt: p.createdAt,
      meta: `${p._count.comments} comments`,
      href: `/community/feed?post=${p.id}`,
    })),
    ...recentComments.map((c) => ({
      type: "comment" as const,
      id: c.id,
      title: `Replied on "${c.post.title}"`,
      createdAt: c.createdAt,
      meta: c.content.slice(0, 60) + (c.content.length > 60 ? "..." : ""),
      href: `/community/feed?post=${c.post.id}`,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);

  return (
    <div className="gold-frame rounded-xl p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
        <Clock className="h-4 w-4" />
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <p className="text-sm text-parchment-500">
          No activity yet. Start by{" "}
          <Link
            href="/community"
            className="text-gold-400 hover:text-gold-300"
          >
            joining the community
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-3">
          {activities.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.href}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-celestial-700/30"
            >
              {item.type === "post" ? (
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-quantum-cyan" />
              ) : (
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-quantum-green" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-parchment-200">
                  {item.title}
                </p>
                <p className="text-xs text-parchment-600">
                  {item.meta} · {timeAgo(item.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
