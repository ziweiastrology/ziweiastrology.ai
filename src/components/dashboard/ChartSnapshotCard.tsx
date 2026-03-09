"use client";

import { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useDashboardStore } from "@/stores/useDashboardStore";

interface ChartSnapshotCardProps {
  birthDate: string | null;
  birthHour: number | null;
  birthGender: string | null;
}

interface MiniChartData {
  mingGong: string;
  mingGongCn: string;
  mainStar: string;
  starCount: number;
}

export default function ChartSnapshotCard({
  birthDate,
  birthHour,
  birthGender,
}: ChartSnapshotCardProps) {
  const t = useTranslations("dashboard");
  const [chartData, setChartData] = useState<MiniChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    if (!birthDate || birthHour == null) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const { computeChart } = await import("@/lib/zwds");
        const d = new Date(birthDate);
        const result = await computeChart({
          fullName: "",
          birthYear: String(d.getFullYear()),
          birthMonth: String(d.getMonth() + 1),
          birthDay: String(d.getDate()),
          birthHour: String(birthHour),
          birthMinute: "0",
          birthLocation: "",
          gender: birthGender === "female" ? "female" : "male",
        });

        if (cancelled) return;

        // Populate global stores so DestinyMatrix renders the chart on homepage
        const matrixStore = useMatrixStore.getState();
        matrixStore.setPalaces(result.palaces);
        matrixStore.setChartMeta(result.meta);
        matrixStore.setComputed(true);
        useDashboardStore.getState().setUnlocked(true);
        setChartReady(true);

        // Find 命宫 (Self palace) — id is "self", nameCn is "命宫"
        const ming = result.palaces.find((p) => p.id === "self");
        const mainStar = ming?.stars?.[0] || "Unknown";

        setChartData({
          mingGong: ming?.name || "Self",
          mingGongCn: ming?.nameCn || "命宫",
          mainStar,
          starCount: result.palaces.reduce((sum, p) => sum + p.stars.length, 0),
        });
      } catch {
        // Chart computation not available
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [birthDate, birthHour, birthGender]);

  if (!birthDate || birthHour == null) {
    return (
      <div className="gold-frame rounded-xl p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
          <Star className="h-4 w-4" />
          {t("destinyChart")}
        </h3>
        <p className="mb-3 text-sm text-parchment-500">
          {t("addBirthDetails")}
        </p>
        <Link
          href="/settings"
          className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
        >
          {t("setBirthInfo")}
        </Link>
      </div>
    );
  }

  return (
    <div className="gold-frame rounded-xl p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
        <Star className="h-4 w-4" />
        Destiny Chart
      </h3>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-parchment-500">
          <Sparkles className="h-4 w-4 animate-pulse" />
          {t("computingChart")}
        </div>
      ) : chartData ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-parchment-600">{t("mainStar")}</span>
            <span className="text-sm font-medium text-gold-300">
              {chartData.mainStar}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-parchment-600">{chartData.mingGongCn} ({chartData.mingGong})</span>
            <span className="text-xs text-parchment-500">
              {t("starsMapped", { count: chartData.starCount })}
            </span>
          </div>
          <div className="mt-3 border-t border-gold-700/20 pt-3">
            <Link
              href="/#destiny-matrix"
              className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              {t("viewFullChart")}
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-sm text-parchment-500">
          {t("unableToCompute")}
        </p>
      )}
    </div>
  );
}
