"use client";

import { useState, useEffect } from "react";
import CommunityPoll, { type PollData } from "./CommunityPoll";

export default function CommunityPollSection() {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPolls() {
      try {
        const res = await fetch("/api/case-studies/polls");
        if (res.ok) {
          const data = await res.json();
          setPolls(data.polls);
        }
      } catch {
        // Silently fail — polls are non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-lg bg-celestial-800/40"
          />
        ))}
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="rounded-lg border border-gold-700/10 bg-celestial-800/30 p-8 text-center">
        <p className="text-sm text-parchment-600">
          No active polls at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {polls.map((poll) => (
        <CommunityPoll key={poll.id} poll={poll} />
      ))}
    </div>
  );
}
