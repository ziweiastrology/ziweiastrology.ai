"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Users, Sparkles } from "lucide-react";
import { useMyMatches } from "@/hooks/useMatches";

interface SidebarData {
  trendingTags: { name: string; count: number }[];
  groups: { id: string; name: string; slug: string; memberCount: number }[];
}

export default function FeedSidebar() {
  const { data: matches } = useMyMatches(3);
  const [sidebar, setSidebar] = useState<SidebarData | null>(null);

  useEffect(() => {
    fetch("/api/community/sidebar")
      .then((r) => r.json())
      .then(setSidebar)
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      {/* Trending Tags */}
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-4">
        <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-parchment-200">
          <TrendingUp className="h-4 w-4 text-gold-400" />
          Trending Tags
        </h3>
        {sidebar?.trendingTags && sidebar.trendingTags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {sidebar.trendingTags.map((tag) => (
              <span
                key={tag.name}
                className="cursor-pointer rounded-full border border-gold-700/20 px-2 py-0.5 text-xs text-parchment-500 transition-colors hover:border-gold-700/40 hover:text-parchment-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-parchment-700">No trending tags yet</p>
        )}
      </div>

      {/* Groups */}
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-4">
        <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-parchment-200">
          <Users className="h-4 w-4 text-gold-400" />
          Groups
        </h3>
        {sidebar?.groups && sidebar.groups.length > 0 ? (
          <div className="space-y-2">
            {sidebar.groups.map((g) => (
              <Link
                key={g.id}
                href={`/community/groups/${g.slug}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-parchment-400 transition-colors hover:bg-celestial-700/30"
              >
                <span>{g.name}</span>
                <span className="text-xs text-parchment-700">{g.memberCount}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-parchment-700">No groups yet</p>
        )}
      </div>

      {/* Energy Matches */}
      {matches && Array.isArray(matches) && matches.length > 0 && (
        <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-4">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-parchment-200">
            <Sparkles className="h-4 w-4 text-gold-400" />
            Energy Matches
          </h3>
          <div className="space-y-2">
            {matches.map((m: { user: { id: string; name: string | null; headline: string | null }; overallScore: number }) => (
              <Link
                key={m.user.id}
                href={`/profile/${m.user.id}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-celestial-700/30"
              >
                <div>
                  <p className="text-parchment-300">{m.user.name || "Anonymous"}</p>
                  {m.user.headline && (
                    <p className="max-w-[140px] truncate text-xs text-parchment-600">{m.user.headline}</p>
                  )}
                </div>
                <span className="text-xs font-semibold text-gold-400">{m.overallScore}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
