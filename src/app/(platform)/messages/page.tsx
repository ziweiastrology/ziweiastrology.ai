"use client";

import { useState } from "react";
import { Bell, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUnreadCounts } from "@/hooks/useNotifications";
import ConversationList from "@/components/messages/ConversationList";
import ChatPanel from "@/components/messages/ChatPanel";
import NotificationList from "@/components/messages/NotificationList";

type Tab = "notifications" | "messages";

export default function MessagesPage() {
  const [tab, setTab] = useState<Tab>("notifications");
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const { data: unread } = useUnreadCounts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-gold-400" style={{ fontFamily: "var(--font-cinzel)" }}>
        Inbox
      </h1>

      <div className="flex gap-6 pb-16" style={{ minHeight: "60vh" }}>
        {/* Left panel */}
        <div className="w-80 shrink-0 rounded-lg border border-gold-700/20 bg-celestial-800/30">
          {/* Tabs */}
          <div className="flex border-b border-gold-700/20">
            <button
              onClick={() => { setTab("notifications"); setActiveConversation(null); }}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors",
                tab === "notifications" ? "border-b-2 border-gold-400 text-gold-400" : "text-parchment-600"
              )}
            >
              <Bell className="h-4 w-4" />
              通知
              {(unread?.notifications ?? 0) > 0 && (
                <span className="rounded-full bg-quantum-red/80 px-1.5 py-0.5 text-xs text-white">{unread.notifications}</span>
              )}
            </button>
            <button
              onClick={() => setTab("messages")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors",
                tab === "messages" ? "border-b-2 border-gold-400 text-gold-400" : "text-parchment-600"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              私信
              {(unread?.messages ?? 0) > 0 && (
                <span className="rounded-full bg-quantum-red/80 px-1.5 py-0.5 text-xs text-white">{unread.messages}</span>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-2">
            {tab === "notifications" ? (
              <NotificationList />
            ) : (
              <ConversationList activeId={activeConversation} onSelect={setActiveConversation} />
            )}
          </div>
        </div>

        {/* Right panel — chat */}
        <div className="flex-1 rounded-lg border border-gold-700/20 bg-celestial-800/30">
          {activeConversation ? (
            <ChatPanel conversationId={activeConversation} />
          ) : (
            <div className="flex h-full items-center justify-center text-parchment-600">
              <p className="text-sm">
                {tab === "messages" ? "Select a conversation to start chatting" : "Select a notification to view details"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
