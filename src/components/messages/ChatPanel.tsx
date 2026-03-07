"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { useConversation, useSendMessage } from "@/hooks/useMessages";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  conversationId: string;
}

export default function ChatPanel({ conversationId }: ChatPanelProps) {
  const { data, isLoading } = useConversation(conversationId);
  const sendMessage = useSendMessage();
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    await sendMessage.mutateAsync({ conversationId, content });
    setContent("");
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!data) return null;

  const other = data.conversation.participants.find(
    (p: { id: string }) => p.id !== session?.user?.id
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gold-700/20 px-4 py-3">
        <p className="text-sm font-semibold text-parchment-200">{other?.name || "Unknown"}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {data.messages.map((msg: {
          id: string;
          senderId: string;
          content: string;
          createdAt: string;
          sender: { name: string | null };
        }) => {
          const isMine = msg.senderId === session?.user?.id;
          return (
            <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[70%] rounded-lg px-3 py-2",
                isMine
                  ? "bg-gold-500/20 text-parchment-200"
                  : "bg-celestial-700/50 text-parchment-300"
              )}>
                <p className="text-sm">{msg.content}</p>
                <p className="mt-0.5 text-xs text-parchment-700">
                  {new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-gold-700/20 p-3">
        <div className="flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-2 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sendMessage.isPending || !content.trim()}
            className="rounded-md bg-gold-500/20 px-3 py-2 text-gold-400 hover:bg-gold-500/30 disabled:opacity-50 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
