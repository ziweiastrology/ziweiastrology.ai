"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useDailyInsight } from "@/hooks/useDailyInsight";

interface WelcomeInsightCardProps {
  birthDate?: Date | string | null;
  birthHour?: number | null;
  birthGender?: string | null;
}

export default function WelcomeInsightCard({
  birthDate,
  birthHour,
  birthGender,
}: WelcomeInsightCardProps) {
  const t = useTranslations("dashboard");
  const { setCopilotInitialPrompt } = useDashboardStore();
  const toggleCopilot = useDashboardStore((s) => s.toggleCopilot);
  const copilotOpen = useDashboardStore((s) => s.copilotOpen);

  const hasBirthData =
    birthDate != null && birthHour != null && birthGender != null;

  const { data, isLoading, error } = useDailyInsight(hasBirthData);

  const insight = data?.insight;

  return (
    <div className="rounded-xl border border-gold-500/30 bg-gradient-to-r from-gold-500/5 via-celestial-800/50 to-gold-500/5 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 text-gold-400">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-sm font-semibold tracking-wide text-gold-400">
            {t("todaysInsight")}
          </h3>
          {!hasBirthData ? (
            <p className="mt-1.5 text-sm leading-relaxed text-parchment-300">
              {t("enterBirthDetails", { settings: t("settingsLink") })}
            </p>
          ) : isLoading ? (
            <p className="mt-1.5 text-sm leading-relaxed text-parchment-500">
              {t("readingStars")}
            </p>
          ) : error || !insight ? (
            <p className="mt-1.5 text-sm leading-relaxed text-parchment-500">
              {t("insightError")}
            </p>
          ) : (
            <p className="mt-1.5 text-sm leading-relaxed text-parchment-300">
              {insight}
            </p>
          )}
          {hasBirthData && insight && (
            <button
              onClick={() => {
                setCopilotInitialPrompt(
                  `Tell me more about today's insight: "${insight}"`
                );
                if (!copilotOpen) toggleCopilot();
              }}
              className="mt-2 inline-flex items-center gap-1 text-xs text-gold-400 transition-colors hover:text-gold-300"
            >
              {t("askSifu")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
