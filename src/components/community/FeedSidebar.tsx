"use client";

import Link from "next/link";
import { TrendingUp, Users, Sparkles } from "lucide-react";
import { useMyMatches } from "@/hooks/useMatches";

export default function FeedSidebar() {
  const { data: matches } = useMyMatches(3);

  return (
    <div className="space-y-4">
      {/* Trending Tags */}
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-4">
        <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-parchment-200">
          <TrendingUp className="h-4 w-4 text-gold-400" />
          热门标签
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {["紫微斗数", "风水", "投资理财", "职业规划", "八字"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gold-700/20 px-2 py-0.5 text-xs text-parchment-500 hover:border-gold-700/40 hover:text-parchment-300 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-4">
        <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-parchment-200">
          <Users className="h-4 w-4 text-gold-400" />
          推荐群组
        </h3>
        <div className="space-y-2">
          {[
            { name: "四化研究", slug: "four-transformers", members: 67 },
            { name: "初学者圈", slug: "beginner-study", members: 156 },
            { name: "事业财富", slug: "career-wealth", members: 94 },
          ].map((g) => (
            <Link
              key={g.slug}
              href={`/community/groups/${g.slug}`}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-parchment-400 hover:bg-celestial-700/30 transition-colors"
            >
              <span>{g.name}</span>
              <span className="text-xs text-parchment-700">{g.members}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Energy Matches */}
      {matches && Array.isArray(matches) && matches.length > 0 && (
        <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-4">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-parchment-200">
            <Sparkles className="h-4 w-4 text-gold-400" />
            能量匹配
          </h3>
          <div className="space-y-2">
            {matches.map((m: { user: { id: string; name: string | null; headline: string | null }; overallScore: number }) => (
              <Link
                key={m.user.id}
                href={`/profile/${m.user.id}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-celestial-700/30 transition-colors"
              >
                <div>
                  <p className="text-parchment-300">{m.user.name || "Anonymous"}</p>
                  {m.user.headline && (
                    <p className="text-xs text-parchment-600 truncate max-w-[140px]">{m.user.headline}</p>
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
