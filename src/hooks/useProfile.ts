import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetch("/api/user/profile").then((r) => r.json()),
    staleTime: 60_000,
  });
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetch(`/api/user/${userId}`).then((r) => r.json()),
    enabled: !!userId,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
}

export function useAvailableTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetch("/api/user/tags").then((r) => r.json()),
    staleTime: 300_000,
  });
}

export function useUpdateTags() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tagIds: string[]) =>
      fetch("/api/user/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagIds }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
}
