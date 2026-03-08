"use client";

import { useQuery } from "@tanstack/react-query";

interface DailyInsightData {
  insight: string;
  palaceKey: string | null;
  cached: boolean;
}

export function useDailyInsight(hasBirthData: boolean) {
  return useQuery<DailyInsightData>({
    queryKey: ["daily-insight"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/daily-insight");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    enabled: hasBirthData,
    staleTime: 5 * 60 * 1000, // 5 min — API caches per day anyway
    retry: 2,
  });
}
