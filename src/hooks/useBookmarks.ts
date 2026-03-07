"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Bookmark {
  id: string;
  userId: string;
  targetType: string;
  targetId: string;
  createdAt: string;
}

interface BookmarksResponse {
  bookmarks: Bookmark[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export function useBookmarks(targetType?: string) {
  return useQuery<BookmarksResponse>({
    queryKey: ["bookmarks", targetType],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (targetType) params.set("targetType", targetType);
      const res = await fetch(`/api/bookmarks?${params}`);
      if (!res.ok) throw new Error("Failed to fetch bookmarks");
      return res.json();
    },
    staleTime: 30 * 1000,
  });
}

export function useAddBookmark() {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    { targetType: string; targetId: string }
  >({
    mutationFn: async ({ targetType, targetId }) => {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add bookmark");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useRemoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (bookmarkId) => {
      const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove bookmark");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useIsBookmarked(targetType: string, targetId: string) {
  const { data } = useBookmarks(targetType);
  return data?.bookmarks?.some((b) => b.targetId === targetId) ?? false;
}
