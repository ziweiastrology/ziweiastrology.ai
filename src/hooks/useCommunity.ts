import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FeedParams {
  sort?: "hot" | "new" | "following";
  type?: string;
  search?: string;
  tags?: string[];
}

export function useFeed(params: FeedParams = {}) {
  const searchParams = new URLSearchParams();
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.type) searchParams.set("type", params.type);
  if (params.search) searchParams.set("search", params.search);
  if (params.tags?.length) searchParams.set("tags", params.tags.join(","));

  return useInfiniteQuery({
    queryKey: ["community-feed", params],
    queryFn: ({ pageParam }) => {
      if (pageParam) searchParams.set("cursor", pageParam);
      return fetch(`/api/community/posts?${searchParams}`).then((r) => r.json());
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

export function usePost(postId: string) {
  return useInfiniteQuery({
    queryKey: ["post", postId],
    queryFn: () => fetch(`/api/community/posts/${postId}`).then((r) => r.json()),
    getNextPageParam: () => undefined,
    initialPageParam: undefined,
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; content: string; type: string; tags?: string[]; groupId?: string }) =>
      fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community-feed"] }),
  });
}

export function useVote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId, value }: { postId?: string; commentId?: string; value: 1 | -1 }) => {
      const url = postId
        ? `/api/community/posts/${postId}/vote`
        : `/api/community/posts/_/comments/${commentId}/vote`;
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      }).then((r) => r.json());
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-feed"] });
      qc.invalidateQueries({ queryKey: ["post"] });
    },
  });
}

export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content, parentId }: { postId: string; content: string; parentId?: string }) =>
      fetch(`/api/community/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parentId }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["post"] }),
  });
}
