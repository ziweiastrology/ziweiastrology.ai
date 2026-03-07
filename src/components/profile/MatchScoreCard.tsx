"use client";

import { Sparkles, Lock } from "lucide-react";
import Link from "next/link";

interface MatchScoreCardProps {
  matchScore: {
    overallScore: number;
    bizScore: number;
    friendScore: number;
    guirenScore: number;
    sharedTags: string[];
  } | null;
  canView: boolean;
}

const SCORE_LABELS = [
  { key: "bizScore", label: "事业互补", labelEn: "Business Synergy" },
  { key: "friendScore", label: "友谊指数", labelEn: "Friendship" },
  { key: "guirenScore", label: "贵人指数", labelEn: "Guiren Potential" },
];

export default function MatchScoreCard({ matchScore, canView }: MatchScoreCardProps) {
  if (!canView) {
    return (
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <h3 className="mb-2 text-sm font-semibold text-parchment-200" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Sparkles className="mr-1.5 inline h-4 w-4 text-gold-400" />
          缘分指数 Energy Match
        </h3>
        <div className="relative overflow-hidden rounded-lg">
          <div className="blur-sm">
            <div className="text-center text-4xl font-bold text-gold-400">??%</div>
            <div className="mt-2 space-y-2">
              {SCORE_LABELS.map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <span className="w-20 text-xs text-parchment-500">{s.label}</span>
                  <div className="h-2 flex-1 rounded-full bg-celestial-700" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Lock className="mb-2 h-6 w-6 text-gold-400" />
            <p className="text-xs text-parchment-400">Premium feature</p>
            <Link href="/pricing" className="mt-1 text-xs text-gold-400 hover:underline">
              Upgrade to unlock
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!matchScore) {
    return (
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <h3 className="mb-2 text-sm font-semibold text-parchment-200" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Sparkles className="mr-1.5 inline h-4 w-4 text-gold-400" />
          缘分指数 Energy Match
        </h3>
        <p className="text-xs text-parchment-600">No match data available yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
      <h3 className="mb-3 text-sm font-semibold text-parchment-200" style={{ fontFamily: "var(--font-cinzel)" }}>
        <Sparkles className="mr-1.5 inline h-4 w-4 text-gold-400" />
        缘分指数 Energy Match
      </h3>
      <div className="mb-4 text-center">
        <span className="text-4xl font-bold text-gold-400">{matchScore.overallScore}%</span>
      </div>
      <div className="space-y-3">
        {SCORE_LABELS.map((s) => {
          const val = matchScore[s.key as keyof typeof matchScore] as number;
          return (
            <div key={s.key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-parchment-500">{s.label} <span className="text-parchment-700">{s.labelEn}</span></span>
                <span className="text-parchment-400">{val}%</span>
              </div>
              <div className="h-2 rounded-full bg-celestial-700">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {matchScore.sharedTags.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs text-parchment-600">Shared interests:</p>
          <div className="flex flex-wrap gap-1">
            {matchScore.sharedTags.map((tag) => (
              <span key={tag} className="rounded-full bg-gold-500/10 px-2 py-0.5 text-xs text-gold-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
