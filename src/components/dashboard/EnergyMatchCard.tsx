"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useMyMatches } from "@/hooks/useMatches";

export default function EnergyMatchCard() {
  const { data: matches } = useMyMatches(3);

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-800/30 p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-parchment-200">
        <Sparkles className="h-4 w-4 text-gold-400" />
        Energy Matches
      </h3>

      {matches && Array.isArray(matches) && matches.length > 0 ? (
        <div className="space-y-3">
          {matches.map((m: {
            user: { id: string; name: string | null; headline: string | null; tags: { tag: { nameCn: string } }[] };
            overallScore: number;
            sharedTags: string[];
          }) => (
            <Link
              key={m.user.id}
              href={`/profile/${m.user.id}`}
              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-celestial-700/30 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-700/30 bg-celestial-700/50 text-sm font-bold text-gold-400">
                {(m.user.name || "?").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-parchment-300">{m.user.name || "Anonymous"}</p>
                {m.user.headline && (
                  <p className="text-xs text-parchment-600 truncate">{m.user.headline}</p>
                )}
                {m.sharedTags.length > 0 && (
                  <div className="mt-0.5 flex gap-1">
                    {m.sharedTags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-gold-500/10 px-1.5 py-0.5 text-[10px] text-gold-400">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-lg font-bold text-gold-400">{m.overallScore}%</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-parchment-600">No matches yet. Complete your profile to get matched!</p>
      )}

      <Link
        href="/community"
        className="mt-3 flex items-center gap-1 text-xs text-gold-400 hover:underline"
      >
        Explore community <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
