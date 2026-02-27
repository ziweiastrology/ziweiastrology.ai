"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonProps {
  postId: string;
  score: number;
  userVote?: number;
}

export default function VoteButton({ score, userVote }: VoteButtonProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        className={cn(
          "rounded p-0.5 transition-colors hover:bg-celestial-700/50",
          userVote === 1
            ? "text-gold-400"
            : "text-parchment-600 hover:text-parchment-300"
        )}
        aria-label="Upvote"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      <span
        className={cn(
          "text-sm font-semibold tabular-nums",
          score > 0
            ? "text-gold-400"
            : score < 0
              ? "text-quantum-red/70"
              : "text-parchment-600"
        )}
      >
        {score}
      </span>
      <button
        className={cn(
          "rounded p-0.5 transition-colors hover:bg-celestial-700/50",
          userVote === -1
            ? "text-quantum-red"
            : "text-parchment-600 hover:text-parchment-300"
        )}
        aria-label="Downvote"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}
