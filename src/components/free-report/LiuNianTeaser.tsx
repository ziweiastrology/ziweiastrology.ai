"use client";

import { useCallback } from "react";
import { Briefcase, Heart, Home, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDashboardStore } from "@/stores/useDashboardStore";
import type { PalaceDetail } from "@/types";

const LIU_NIAN_TOPICS = [
  {
    key: "career",
    labelCn: "事业",
    labelEn: "Career",
    icon: Briefcase,
    primaryPalace: "career",
    primaryPalaceCn: "官禄宫",
    prompt: "Analyze my 2026 career 流年 based on my 官禄宫 and 财帛宫. What opportunities and challenges do you see?",
  },
  {
    key: "love",
    labelCn: "感情",
    labelEn: "Love",
    icon: Heart,
    primaryPalace: "spouse",
    primaryPalaceCn: "夫妻宫",
    prompt: "Analyze my 2026 love and relationships 流年 based on my 夫妻宫 and 福德宫. What does the year hold?",
  },
  {
    key: "family",
    labelCn: "家庭",
    labelEn: "Family",
    icon: Home,
    primaryPalace: "property",
    primaryPalaceCn: "田宅宫",
    prompt: "Analyze my 2026 family 流年 based on my 田宅宫 and 父母宫. What changes or focus areas do you see?",
  },
];

function buildTeaser(palace: PalaceDetail | undefined, palaceCn: string): string {
  if (!palace) return `Your ${palaceCn} holds unique patterns worth exploring...`;
  const mainStar = palace.stars[0] || "key stars";
  const stateLabel =
    palace.state === "lu" ? "[禄]" : palace.state === "quan" ? "[权]" : palace.state === "ke" ? "[科]" : palace.state === "ji" ? "[忌]" : "";
  const narratives: Record<string, string> = {
    lu: "a year of abundance and new opportunities flowing in",
    quan: "a year of authority and decisive power emerging",
    ke: "a year of recognition and scholarly achievement",
    ji: "a year requiring careful navigation and transformation",
    neutral: "shifting energies that shape your path forward",
  };
  return `Your ${palaceCn} holds ${mainStar}${stateLabel} — ${narratives[palace.state] || narratives.neutral}...`;
}

interface LiuNianTeaserProps {
  palaces: PalaceDetail[];
}

export default function LiuNianTeaser({ palaces }: LiuNianTeaserProps) {
  const { toggleCopilot, setCopilotInitialPrompt, openAuthModal } = useDashboardStore();
  const { data: session } = useSession();

  const handleCardClick = useCallback(
    (prompt: string) => {
      if (!session) {
        openAuthModal("copilot");
        return;
      }
      setCopilotInitialPrompt(prompt);
      toggleCopilot();
    },
    [session, setCopilotInitialPrompt, toggleCopilot, openAuthModal]
  );

  return (
    <div className="relative p-8 sm:p-10 rounded-xl border border-gold-500/20 bg-gradient-to-b from-celestial-900/90 to-celestial-800/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-quantum-cyan/50 to-transparent" />

      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/80 border border-quantum-cyan/30 rounded-sm mb-3">
          <Sparkles className="h-3 w-3" />
          2026 流年 FORECAST
        </span>
        <h3
          className="text-xl sm:text-2xl font-bold gold-gradient-text"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Your Year Ahead
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {LIU_NIAN_TOPICS.map((topic) => {
          const palace = palaces.find((p) => p.id === topic.primaryPalace);
          const teaser = buildTeaser(palace, topic.primaryPalaceCn);

          return (
            <button
              key={topic.key}
              onClick={() => handleCardClick(topic.prompt)}
              className="relative group p-5 rounded-lg border border-gold-700/20 bg-celestial-900/60 text-left overflow-hidden
                         hover:border-gold-500/40 transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-700/30 flex items-center justify-center">
                    <topic.icon className="h-4 w-4 text-gold-500/70" />
                  </div>
                  <p className="text-sm font-semibold text-parchment-200">
                    {topic.labelCn} {topic.labelEn}
                  </p>
                </div>
                <p className="text-xs text-parchment-400/70 leading-relaxed line-clamp-2">
                  {teaser}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-celestial-900/80 via-celestial-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400 group-hover:text-gold-300 transition-colors">
                  Ask ZiWei Sifu →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <a
          href="/pricing"
          className="text-xs text-parchment-500 hover:text-gold-400 transition-colors"
        >
          Or subscribe for unlimited daily insights →
        </a>
      </div>
    </div>
  );
}
