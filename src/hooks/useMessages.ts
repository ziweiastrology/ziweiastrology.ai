import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useConversations() {
  return useQuery({
    queryKey: ["dm-conversations"],
    queryFn: () => fetch("/api/messages").then((r) => r.json()),
  });
}

export function useConversation(conversationId: string) {
  return useQuery({
    queryKey: ["dm-conversation", conversationId],
    queryFn: () => fetch(`/api/messages/${conversationId}`).then((r) => r.json()),
    enabled: !!conversationId,
    refetchInterval: 15_000,
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { recipientId?: string; conversationId?: string; content: string }) =>
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["dm-conversations"] });
      if (data.conversationId) {
        qc.invalidateQueries({ queryKey: ["dm-conversation", data.conversationId] });
      }
    },
  });
}
