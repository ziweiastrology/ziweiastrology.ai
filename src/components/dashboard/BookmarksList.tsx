"use client";

import { useState } from "react";
import { Bookmark, Trash2, FileText, MessageSquare, BookOpen, Users } from "lucide-react";
import { useBookmarks, useRemoveBookmark } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FILTER_TABS = [
  { value: undefined, label: "All" },
  { value: "post", label: "Posts" },
  { value: "resource", label: "Resources" },
  { value: "course", label: "Courses" },
  { value: "case_study", label: "Case Studies" },
] as const;

const TYPE_ICONS: Record<string, typeof FileText> = {
  post: MessageSquare,
  resource: FileText,
  course: BookOpen,
  case_study: Users,
};

const TYPE_HREFS: Record<string, (id: string) => string> = {
  post: (id) => `/community/feed?post=${id}`,
  resource: (id) => `/resources/${id}`,
  course: (id) => `/academy/courses/${id}`,
  case_study: (id) => `/case-studies/${id}`,
};

export default function BookmarksList({ tier }: { tier: string }) {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { data, isLoading } = useBookmarks(filter);
  const removeMutation = useRemoveBookmark();

  if (tier === "FREE") {
    return (
      <div id="bookmarks" className="gold-frame rounded-xl p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
          <Bookmark className="h-4 w-4" />
          Bookmarks
        </h3>
        <p className="text-sm text-parchment-500">
          Bookmarks are available for BASIC members and above.{" "}
          <Link href="/pricing" className="text-gold-400 hover:text-gold-300">
            Upgrade now →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div id="bookmarks" className="gold-frame rounded-xl p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
        <Bookmark className="h-4 w-4" />
        Bookmarks
      </h3>

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilter(tab.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs transition-colors",
              filter === tab.value
                ? "bg-gold-500/20 text-gold-400"
                : "text-parchment-500 hover:text-parchment-300 hover:bg-celestial-700/30"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-celestial-700/30"
            />
          ))}
        </div>
      ) : !data?.bookmarks?.length ? (
        <p className="text-sm text-parchment-500">No bookmarks yet.</p>
      ) : (
        <div className="space-y-2">
          {data.bookmarks.map((bookmark) => {
            const Icon = TYPE_ICONS[bookmark.targetType] || FileText;
            const href = TYPE_HREFS[bookmark.targetType]?.(bookmark.targetId) || "#";

            return (
              <div
                key={bookmark.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-celestial-700/30"
              >
                <Icon className="h-4 w-4 shrink-0 text-parchment-500" />
                <Link href={href} className="min-w-0 flex-1">
                  <span className="text-sm text-parchment-300 hover:text-gold-400 transition-colors">
                    {bookmark.targetType}: {bookmark.targetId.slice(0, 8)}...
                  </span>
                </Link>
                <button
                  onClick={() => removeMutation.mutate(bookmark.id)}
                  disabled={removeMutation.isPending}
                  className="shrink-0 rounded p-1 text-parchment-600 transition-colors hover:bg-quantum-red/10 hover:text-quantum-red"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
