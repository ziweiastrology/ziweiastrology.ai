"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SpendAction, EarnAction } from "@/lib/credits";

interface CreditsData {
  credits: number;
  dailyGranted: boolean;
  dailyAmount: number;
  tier: string;
}

interface SpendResult {
  success: boolean;
  credits: number;
  error?: string;
  needed?: number;
}

interface EarnResult {
  credits: number;
  earned: number;
  error?: string;
}

export function useCredits() {
  return useQuery<CreditsData>({
    queryKey: ["credits"],
    queryFn: async () => {
      const res = await fetch("/api/credits");
      if (!res.ok) throw new Error("Failed to fetch credits");
      return res.json();
    },
    staleTime: 30 * 1000, // 30s — daily grant only changes once/day
  });
}

export function useSpendCredits() {
  const queryClient = useQueryClient();

  return useMutation<
    SpendResult,
    Error,
    { action: SpendAction; palaceId?: string }
  >({
    mutationFn: async ({ action, palaceId }) => {
      const res = await fetch("/api/credits/spend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, palaceId }),
      });
      const data = await res.json();
      if (!res.ok && res.status !== 402) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      // Update cached credits balance
      queryClient.setQueryData<CreditsData>(["credits"], (old) =>
        old ? { ...old, credits: data.credits } : old
      );
    },
  });
}

export function useEarnCredits() {
  const queryClient = useQueryClient();

  return useMutation<
    EarnResult,
    Error,
    { action: EarnAction; metadata?: Record<string, unknown> }
  >({
    mutationFn: async ({ action, metadata }) => {
      const res = await fetch("/api/credits/earn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, metadata }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<CreditsData>(["credits"], (old) =>
        old ? { ...old, credits: data.credits } : old
      );
    },
  });
}
