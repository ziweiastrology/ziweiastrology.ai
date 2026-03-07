import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnreadCounts() {
  return useQuery({
    queryKey: ["unread-counts"],
    queryFn: () => fetch("/api/notifications/unread").then((r) => r.json()),
    refetchInterval: 60_000,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetch("/api/notifications").then((r) => r.json()),
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids?: string[]) =>
      fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unread-counts"] });
    },
  });
}
