"use client";

import { Sparkles } from "lucide-react";

interface WelcomeInsightCardProps {
  birthDate?: Date | string | null;
  birthHour?: number | null;
  birthGender?: string | null;
}

const DAILY_INSIGHTS = [
  "Today's energy favors your Career Palace (\u5B98\u7984\u5BAE). Focus on professional goals.",
  "Your Wealth Palace (\u8D22\u5E1B\u5BAE) is active today. Review your financial plans.",
  "The Friends Palace (\u4EA4\u53CB\u5BAE) glows bright \u2014 network and connect.",
  "Your Life Palace (\u547D\u5BAE) resonates strongly. Reflect on your core identity and purpose.",
  "The Travel Palace (\u8FC1\u79FB\u5BAE) stirs with movement. A change of scenery could inspire you.",
  "Your Health Palace (\u75BE\u5384\u5BAE) calls for attention. Prioritize rest and well-being today.",
  "The Spouse Palace (\u592B\u59BB\u5BAE) is illuminated. Nurture your closest relationship.",
  "Your Children Palace (\u5B50\u5973\u5BAE) radiates creative energy. Express yourself freely.",
  "The Property Palace (\u7530\u5B85\u5BAE) is grounded today. Tend to your home and inner sanctuary.",
  "Your Parents Palace (\u7236\u6BCD\u5BAE) asks for gratitude. Reach out to mentors or elders.",
  "The Siblings Palace (\u5144\u5F1F\u5BAE) hums with camaraderie. Lean on your support network.",
  "Your Servants Palace (\u5974\u4EC6\u5BAE) is energized. Delegate tasks and trust your team.",
  "The Career Palace (\u5B98\u7984\u5BAE) aligns with ambition. Bold moves are favored today.",
  "Your Wealth Palace (\u8D22\u5E1B\u5BAE) whispers opportunity. Stay alert for unexpected gains.",
  "The Life Palace (\u547D\u5BAE) pulses with clarity. Trust your instincts on important decisions.",
  "Your Travel Palace (\u8FC1\u79FB\u5BAE) suggests expansion. Explore new ideas or places.",
  "The Health Palace (\u75BE\u5384\u5BAE) reminds you to balance work and rest. Listen to your body.",
  "Your Spouse Palace (\u592B\u59BB\u5BAE) favors deep conversation. Share what matters most.",
  "The Friends Palace (\u4EA4\u53CB\u5BAE) brings social luck. An unexpected connection may arise.",
  "Your Property Palace (\u7530\u5B85\u5BAE) holds stability. Invest energy in long-term foundations.",
];

function getDailyIndex(date: string, total: number): number {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) | 0;
  }
  return ((hash % total) + total) % total;
}

export default function WelcomeInsightCard({
  birthDate,
  birthHour,
  birthGender,
}: WelcomeInsightCardProps) {
  const hasBirthData = birthDate != null && birthHour != null && birthGender != null;
  const today = new Date().toISOString().slice(0, 10);
  const insightIndex = getDailyIndex(today, DAILY_INSIGHTS.length);
  const insight = DAILY_INSIGHTS[insightIndex];

  return (
    <div className="rounded-xl border border-gold-500/30 bg-gradient-to-r from-gold-500/5 via-celestial-800/50 to-gold-500/5 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 text-gold-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-sm font-semibold tracking-wide text-gold-400">
            Today&apos;s Insight
          </h3>
          {hasBirthData ? (
            <p className="mt-1.5 text-sm leading-relaxed text-parchment-300">
              {insight}
            </p>
          ) : (
            <p className="mt-1.5 text-sm leading-relaxed text-parchment-300">
              Enter your birth details in{" "}
              <span className="text-gold-400">Settings</span> to unlock
              personalized daily insights from the twelve palaces.
            </p>
          )}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Could trigger copilot in the future
            }}
            className="mt-2 inline-flex items-center gap-1 text-xs text-gold-400 transition-colors hover:text-gold-300"
          >
            Ask ZiWei Sifu for details &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
