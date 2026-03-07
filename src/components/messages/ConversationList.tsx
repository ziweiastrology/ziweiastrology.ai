"use client";

import { cn } from "@/lib/utils";
import { useConversations } from "@/hooks/useMessages";
import { useSession } from "next-auth/react";
import { Loader2, MessageCircle } from "lucide-react";

interface ConversationListProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ activeId, onSelect }: ConversationListProps) {
  const { data: conversations, isLoading } = useConversations();
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!conversations?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <MessageCircle className="mb-2 h-8 w-8 text-parchment-700" />
        <p className="text-sm text-parchment-600">No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.map((conv: {
        id: string;
        participants: { id: string; name: string | null; avatarUrl: string | null; image: string | null }[];
        messages: { content: string; senderId: string; createdAt: string; readAt: string | null }[];
      }) => {
        const other = conv.participants.find((p) => p.id !== session?.user?.id);
        const lastMsg = conv.messages[0];
        const isUnread = lastMsg && lastMsg.senderId !== session?.user?.id && !lastMsg.readAt;

        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
              activeId === conv.id
                ? "bg-celestial-700/50"
                : "hover:bg-celestial-800/50"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-700/30 bg-celestial-700/50 text-sm font-bold text-gold-400">
              {(other?.name || "?").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={cn("text-sm truncate", isUnread ? "font-semibold text-parchment-200" : "text-parchment-400")}>
                  {other?.name || "Unknown"}
                </p>
                {lastMsg && (
                  <span className="text-xs text-parchment-700">
                    {new Date(lastMsg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
              </div>
              {lastMsg && (
                <p className="text-xs text-parchment-600 truncate">{lastMsg.content}</p>
              )}
            </div>
            {isUnread && <div className="h-2 w-2 shrink-0 rounded-full bg-gold-400" />}
          </button>
        );
      })}
    </div>
  );
}
