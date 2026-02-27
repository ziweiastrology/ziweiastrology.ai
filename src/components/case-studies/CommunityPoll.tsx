"use client";

import { useState } from "react";
import { BarChart3, Clock, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  label: string;
  voteCount: number;
}

export interface PollData {
  id: string;
  question: string;
  caseId: string | null;
  closesAt: string | null;
  totalVotes: number;
  userVotedOptionId: string | null;
  options: PollOption[];
}

interface CommunityPollProps {
  poll: PollData;
}

function TimeRemaining({ closesAt }: { closesAt: string }) {
  const diff = new Date(closesAt).getTime() - Date.now();
  if (diff <= 0) return <span>Closed</span>;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return <span>{days}d {hours % 24}h remaining</span>;
  const mins = Math.floor(diff / (1000 * 60)) % 60;
  return <span>{hours}h {mins}m remaining</span>;
}

export default function CommunityPoll({ poll: initialPoll }: CommunityPollProps) {
  const { data: session } = useSession();
  const [poll, setPoll] = useState(initialPoll);
  const [voting, setVoting] = useState(false);
  const hasVoted = !!poll.userVotedOptionId;

  const handleVote = async (optionId: string) => {
    if (!session?.user) {
      toast.info("Sign in to vote");
      return;
    }
    if (hasVoted || voting) return;

    // Optimistic update
    const prevPoll = { ...poll };
    setPoll((p) => ({
      ...p,
      totalVotes: p.totalVotes + 1,
      userVotedOptionId: optionId,
      options: p.options.map((o) =>
        o.id === optionId ? { ...o, voteCount: o.voteCount + 1 } : o
      ),
    }));

    setVoting(true);
    try {
      const res = await fetch(`/api/case-studies/polls/${poll.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });
      if (!res.ok) {
        setPoll(prevPoll);
        const err = await res.json();
        toast.error(err.error || "Failed to vote");
      }
    } catch {
      setPoll(prevPoll);
      toast.error("Failed to vote");
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="gold-frame rounded-lg bg-celestial-800/60 p-5">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-gold-400" />
          <h3
            className="text-base font-semibold text-parchment-100"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {poll.question}
          </h3>
        </div>
        {poll.closesAt && (
          <div className="flex shrink-0 items-center gap-1 text-xs text-parchment-600">
            <Clock className="h-3 w-3" />
            <TimeRemaining closesAt={poll.closesAt} />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {poll.options.map((option) => {
          const percentage =
            poll.totalVotes > 0
              ? Math.round((option.voteCount / poll.totalVotes) * 100)
              : 0;
          const isSelected = poll.userVotedOptionId === option.id;

          return hasVoted ? (
            // Results view
            <div key={option.id} className="relative overflow-hidden rounded-md">
              {/* Progress bar background */}
              <div
                className={cn(
                  "absolute inset-0 rounded-md transition-all duration-500",
                  isSelected
                    ? "bg-gradient-to-r from-gold-500/30 to-gold-400/10"
                    : "bg-celestial-700/40"
                )}
                style={{ width: `${percentage}%` }}
              />
              <div className="relative flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-gold-400" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      isSelected
                        ? "font-medium text-gold-300"
                        : "text-parchment-400"
                    )}
                  >
                    {option.label}
                  </span>
                </div>
                <span className="text-xs tabular-nums text-parchment-500">
                  {percentage}%
                </span>
              </div>
            </div>
          ) : (
            // Voting view
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={voting}
              className="w-full rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-2.5 text-left text-sm text-parchment-300 transition-all hover:border-gold-500/40 hover:bg-celestial-800/60 hover:text-parchment-100 disabled:opacity-50"
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Total votes */}
      <p className="mt-3 text-xs text-parchment-600">
        {poll.totalVotes} vote{poll.totalVotes !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
