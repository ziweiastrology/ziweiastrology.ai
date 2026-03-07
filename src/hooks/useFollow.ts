import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleFollow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (targetUserId: string) =>
      fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId }),
      }).then((r) => r.json()),
    onSuccess: (_, targetUserId) => {
      qc.invalidateQueries({ queryKey: ["user-profile", targetUserId] });
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}
