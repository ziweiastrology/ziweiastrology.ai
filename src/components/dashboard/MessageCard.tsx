"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useUnreadCounts } from "@/hooks/useNotifications";
import { useConversations } from "@/hooks/useMessages";
import { useSession } from "next-auth/react";

export default function MessageCard() {
  const { data: unread } = useUnreadCounts();
  const { data: conversations } = useConversations();
  const { data: session } = useSession();
  const recent = (conversations || []).slice(0, 2);

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-800/30 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-parchment-200">
          <MessageCircle className="h-4 w-4 text-gold-400" />
          Messages
        </h3>
        {(unread?.messages ?? 0) > 0 && (
          <span className="rounded-full bg-quantum-red/80 px-2 py-0.5 text-xs font-semibold text-white">
            {unread.messages}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {recent.map((conv: {
          id: string;
          participants: { id: string; name: string | null }[];
          messages: { content: string }[];
        }) => {
          const other = conv.participants.find((p) => p.id !== session?.user?.id);
          return (
            <div key={conv.id} className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-celestial-700/50 text-xs font-bold text-gold-400">
                {(other?.name || "?").slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-parchment-300 truncate">{other?.name || "Unknown"}</p>
                <p className="text-xs text-parchment-600 truncate">{conv.messages[0]?.content || ""}</p>
              </div>
            </div>
          );
        })}
        {recent.length === 0 && (
          <p className="text-xs text-parchment-600">No messages</p>
        )}
      </div>

      <Link
        href="/messages"
        className="mt-3 flex items-center gap-1 text-xs text-gold-400 hover:underline"
      >
        View all <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
