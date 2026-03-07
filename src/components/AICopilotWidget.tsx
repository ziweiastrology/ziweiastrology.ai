"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Coins, Briefcase, Heart, Home, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useCredits } from "@/hooks/useCredits";
import { CREDIT_COSTS } from "@/lib/credits";
import InsufficientCreditsModal from "@/components/credits/InsufficientCreditsModal";
import type { CopilotStatus } from "@/types";

const STATUS_CONFIG: Record<CopilotStatus, { label: string; color: string; pulse: boolean }> = {
  active: { label: "Active", color: "bg-quantum-green", pulse: true },
  monitoring: { label: "Monitoring", color: "bg-quantum-cyan", pulse: true },
  analyzing: { label: "Analyzing", color: "bg-quantum-orange", pulse: true },
  idle: { label: "Standby", color: "bg-parchment-500", pulse: false },
};

const TOPIC_CARDS = [
  {
    key: "career",
    label: "事业 Career",
    icon: Briefcase,
    prompt: "Analyze my 2026 career 流年 based on my 官禄宫 and 财帛宫. What opportunities and challenges do you see?",
  },
  {
    key: "love",
    label: "感情 Love",
    icon: Heart,
    prompt: "Analyze my 2026 love and relationships 流年 based on my 夫妻宫 and 福德宫. What does the year hold?",
  },
  {
    key: "family",
    label: "家庭 Family",
    icon: Home,
    prompt: "Analyze my 2026 family 流年 based on my 田宅宫 and 父母宫. What changes or focus areas do you see?",
  },
];

interface ChatMessage {
  role: "assistant" | "user" | "system";
  content: string;
}

export default function AICopilotWidget() {
  const {
    copilotStatus,
    copilotOpen,
    toggleCopilot,
    isUnlocked,
    openAuthModal,
    copilotInitialPrompt,
    setCopilotInitialPrompt,
  } = useDashboardStore();
  const { data: session } = useSession();
  const { data: creditsData } = useCredits();
  const palaces = useMatrixStore((s) => s.palaces);
  const chartMeta = useMatrixStore((s) => s.chartMeta);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const config = STATUS_CONFIG[copilotStatus];
  const credits = creditsData?.credits ?? 0;
  const hasMessages = messages.length > 0;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  // Handle initial prompt from FreeReport teaser
  useEffect(() => {
    if (copilotOpen && copilotInitialPrompt) {
      setInput(copilotInitialPrompt);
      setCopilotInitialPrompt(null);
    }
  }, [copilotOpen, copilotInitialPrompt, setCopilotInitialPrompt]);

  const handleFabClick = useCallback(() => {
    if (!session) {
      openAuthModal("copilot");
      return;
    }
    toggleCopilot();
  }, [session, openAuthModal, toggleCopilot]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || sending) return;

      if (!session) {
        openAuthModal("copilot");
        return;
      }

      // Check credits client-side
      if (credits < CREDIT_COSTS.CHATBOT_MESSAGE) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: "I have deeper insights about your chart to share... Upgrade your plan to continue this reading.",
          },
        ]);
        setShowModal(true);
        return;
      }

      // Add user message immediately
      setMessages((prev) => [...prev, { role: "user", content: text.trim() }]);
      setInput("");
      setSending(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            chartData: {
              palaces: palaces.map((p) => ({
                name: p.name,
                nameCn: p.nameCn,
                stars: p.stars,
                energy: p.energy,
                state: p.state,
                consciousness: p.consciousness,
                decadeRange: p.decadeRange,
                earthlyBranch: p.earthlyBranch,
              })),
              meta: chartMeta,
            },
            conversationId,
          }),
        });

        if (res.status === 402) {
          setShowModal(true);
          setSending(false);
          return;
        }

        if (!res.ok) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "I apologize, something went wrong. Please try again." },
          ]);
          setSending(false);
          return;
        }

        // Stream the response
        const reader = res.body?.getReader();
        if (!reader) {
          setSending(false);
          return;
        }

        const decoder = new TextDecoder();
        let assistantContent = "";

        // Add empty assistant message to stream into
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));

              if (data.text) {
                assistantContent += data.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }

              if (data.done && data.conversationId) {
                setConversationId(data.conversationId);
              }

              if (data.error) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: "I apologize, an error occurred. Please try again.",
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed SSE lines
            }
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Connection lost. Please try again." },
        ]);
      } finally {
        setSending(false);
      }
    },
    [sending, session, credits, palaces, chartMeta, conversationId, openAuthModal]
  );

  const handleSend = useCallback(() => {
    sendMessage(input);
  }, [input, sendMessage]);

  const handleTopicClick = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage]
  );

  if (!isUnlocked) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded panel */}
      {copilotOpen && (
        <div
          className="absolute bottom-20 right-0 w-[22rem] gold-frame rounded-sm bg-celestial-800/95 backdrop-blur-md
                     shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_15px_rgba(212,165,40,0.1)]
                     animate-fade-in overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gold-700/30 bg-celestial-900/50">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? "animate-glow-pulse" : ""}`} />
              <span className="text-xs text-gold-400 tracking-widest uppercase">
                ZiWei Sifu
              </span>
            </div>
            <div className="flex items-center gap-3">
              {session && (
                <span className="flex items-center gap-1 text-[10px] text-gold-600">
                  <Coins className="h-3 w-3" />
                  {credits}
                </span>
              )}
              <button
                onClick={toggleCopilot}
                className="text-parchment-500 hover:text-parchment-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat area */}
          <div className="p-4 h-80 flex flex-col justify-end overflow-y-auto">
            <div className="space-y-3">
              {/* Topic cards — show when no messages */}
              {!hasMessages && !sending && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                    <p className="text-xs text-gold-400 font-medium">
                      2026 流年 · What would you like to explore?
                    </p>
                  </div>
                  {TOPIC_CARDS.map((topic) => (
                    <button
                      key={topic.key}
                      onClick={() => handleTopicClick(topic.prompt)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gold-700/20 bg-celestial-900/40
                                 hover:border-gold-500/40 hover:bg-celestial-800/60 transition-all text-left group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/10 border border-gold-700/30 flex items-center justify-center group-hover:border-gold-500/50 transition-colors">
                        <topic.icon className="h-4 w-4 text-gold-500/70 group-hover:text-gold-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-parchment-200">{topic.label}</p>
                        <p className="text-[10px] text-parchment-500 mt-0.5">
                          Analyze your 2026 {topic.key} fortune
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {(msg.role === "assistant" || msg.role === "system") && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 border border-gold-700 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  {msg.role === "system" ? (
                    <div className="rounded-sm p-3 max-w-[85%] border border-gold-500/40 bg-gold-500/5">
                      <p className="text-xs text-gold-300 leading-relaxed mb-2">
                        {msg.content}
                      </p>
                      <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-celestial-900 bg-gold-500 hover:bg-gold-400 px-3 py-1.5 rounded-sm transition-colors"
                      >
                        <Coins className="h-3 w-3" />
                        Upgrade Plan
                      </Link>
                    </div>
                  ) : (
                    <div
                      className={`rounded-sm p-3 max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-gold-500/10 border border-gold-700/20"
                          : "bg-celestial-700/50"
                      }`}
                    >
                      <p className="text-xs text-parchment-300 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Streaming indicator */}
              {sending && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 border border-gold-700 flex items-center justify-center">
                    <svg className="w-3 h-3 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="bg-celestial-700/50 rounded-sm p-3">
                    <p className="text-xs text-parchment-500 animate-pulse">Consulting the stars...</p>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Low credits warning */}
          {session && credits > 0 && credits <= 3 && (
            <div className="px-4 pb-2">
              <Link
                href="/pricing"
                className="block text-center text-[10px] text-quantum-orange/80 hover:text-quantum-orange transition-colors"
              >
                {credits} credit{credits !== 1 ? "s" : ""} left today · Subscribe for more →
              </Link>
            </div>
          )}

          {/* Input area */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 bg-celestial-900/50 border border-gold-700/30 rounded-sm px-3 py-2">
              <input
                type="text"
                placeholder={session ? "Ask ZiWei Sifu..." : "Sign in to chat"}
                className="flex-1 bg-transparent text-xs text-parchment-200 placeholder:text-parchment-600 outline-none"
                disabled={!session || sending}
                value={input}
                onChange={(e) => {
                  if (!session) { openAuthModal("copilot"); return; }
                  setInput(e.target.value);
                }}
                onFocus={() => { if (!session) openAuthModal("copilot"); }}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <span className="flex items-center gap-1 text-[10px] text-gold-700 tracking-wider">
                <Coins className="h-3 w-3" />
                {CREDIT_COSTS.CHATBOT_MESSAGE}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={handleFabClick}
        className="group relative w-14 h-14 rounded-full
                   bg-celestial-800 border border-gold-700
                   shadow-[0_0_20px_rgba(0,0,0,0.4),0_0_10px_rgba(212,165,40,0.1)]
                   transition-all duration-300
                   hover:shadow-[0_0_30px_rgba(0,0,0,0.4),0_0_20px_rgba(212,165,40,0.2)]
                   hover:border-gold-500
                   active:scale-95
                   flex items-center justify-center"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full border border-gold-500/30 animate-glow-pulse" />

        {/* Icon */}
        <svg className="w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>

        {/* Status dot */}
        <div className="absolute -top-0.5 -right-0.5">
          <div className={`w-3 h-3 rounded-full ${config.color} border-2 border-celestial-800`} />
          {config.pulse && (
            <div className={`absolute inset-0 w-3 h-3 rounded-full ${config.color} animate-ping opacity-75`} />
          )}
        </div>
      </button>

      {/* Insufficient Credits Modal */}
      <InsufficientCreditsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        credits={credits}
        needed={CREDIT_COSTS.CHATBOT_MESSAGE}
      />
    </div>
  );
}
