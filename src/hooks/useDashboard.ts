"use client";

import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  user: {
    id: string;
    name: string | null;
    tier: string;
    credits: number;
    birthDate: string | null;
    birthHour: number | null;
    birthMinute: number | null;
    birthLocation: string | null;
    birthGender: string | null;
    createdAt: string;
  };
  recentPosts: Array<{
    id: string;
    title: string;
    type: string;
    createdAt: string;
    _count: { comments: number; votes: number };
  }>;
  recentComments: Array<{
    id: string;
    content: string;
    createdAt: string;
    post: { id: string; title: string };
  }>;
  enrollments: Array<{
    id: string;
    status: string;
    progress: number;
    course: {
      id: string;
      title: string;
      slug: string;
      level: string;
    };
  }>;
  bookmarkCount: number;
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      return res.json();
    },
    staleTime: 60 * 1000,
  });
}
