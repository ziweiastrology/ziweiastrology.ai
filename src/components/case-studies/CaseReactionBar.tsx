"use client";

import { useState, useEffect, useCallback } from "react";
import { Lightbulb, Sparkles, Heart, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { type: "INSIGHTFUL", icon: Lightbulb, label: "Insightful" },
  { type: "MIND_BLOWN", icon: Sparkles, label: "Mind Blown" },
  { type: "RELATABLE", icon: Heart, label: "Relatable" },
  { type: "WANT_MORE", icon: PlusCircle, label: "Want More" },
] as const;

type ReactionCounts = Record<string, number>;

interface CaseReactionBarProps {
  caseId: string;
}

export default function CaseReactionBar({ caseId }: CaseReactionBarProps) {
  const { data: session } = useSession();
  const [counts, setCounts] = useState<ReactionCounts>({
    INSIGHTFUL: 0,
    MIND_BLOWN: 0,
    RELATABLE: 0,
    WANT_MORE: 0,
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReactions = useCallback(async () => {
    try {
      const res = await fetch(`/api/case-studies/${caseId}/reactions`);
      if (res.ok) {
        const data = await res.json();
        setCounts(data.counts);
        setUserReaction(data.userReaction);
      }
    } catch {
      // Silently fail — reactions are non-critical
    }
  }, [caseId]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const handleReaction = async (type: string) => {
    if (!session?.user) {
      toast.info("Sign in to react");
      return;
    }
    if (loading) return;

    // Optimistic update
    const prevCounts = { ...counts };
    const prevReaction = userReaction;

    if (userReaction === type) {
      // Removing
      setCounts((c) => ({ ...c, [type]: Math.max(0, c[type] - 1) }));
      setUserReaction(null);
    } else {
      // Switching or adding
      if (userReaction) {
        setCounts((c) => ({
          ...c,
          [userReaction]: Math.max(0, c[userReaction] - 1),
          [type]: c[type] + 1,
        }));
      } else {
        setCounts((c) => ({ ...c, [type]: c[type] + 1 }));
      }
      setUserReaction(type);
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/case-studies/${caseId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) {
        // Revert on failure
        setCounts(prevCounts);
        setUserReaction(prevReaction);
        const err = await res.json();
        toast.error(err.error || "Failed to react");
      }
    } catch {
      setCounts(prevCounts);
      setUserReaction(prevReaction);
      toast.error("Failed to react");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {REACTIONS.map(({ type, icon: Icon, label }) => {
        const isActive = userReaction === type;
        const count = counts[type] || 0;

        return (
          <button
            key={type}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction(type);
            }}
            title={label}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
              isActive
                ? "bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/30"
                : "bg-celestial-800/60 text-parchment-500 hover:bg-celestial-700/60 hover:text-parchment-300"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
            {count > 0 && (
              <span className="tabular-nums">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
