"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle, AlertCircle, Clock, Lightbulb } from "lucide-react";

const TIP_KEYS: { key: string; href?: string }[] = [
  { key: "tip1", href: "/settings" },
  { key: "tip2", href: "/community" },
  { key: "tip3" },
  { key: "tip4" },
  { key: "tip5" },
  { key: "tip6" },
  { key: "tip7" },
];

const TIP_INTERVAL = 6000;

interface Props {
  status: string;
  totalSections: number;
  completedSections: number;
  onCancel?: () => void;
  cancelling?: boolean;
}

export default function ReportStatusBar({ status, totalSections, completedSections, onCancel, cancelling }: Props) {
  const t = useTranslations("reports");
  const tc = useTranslations("common");
  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (status !== "GENERATING") return;

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIP_KEYS.length);
        setVisible(true);
      }, 400);
    }, TIP_INTERVAL);

    return () => clearInterval(timer);
  }, [status]);

  // Auto-dismiss 3s after completion
  useEffect(() => {
    if (status !== "COMPLETE") return;
    const timer = setTimeout(() => setDismissed(true), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  if (dismissed) return null;

  const progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
  const tipDef = TIP_KEYS[tipIndex];

  return (
    <div className="rounded-lg border border-gold-700/30 bg-celestial-900/60 p-4">
      <div className="flex items-center gap-3 mb-3">
        {status === "GENERATING" ? (
          <>
            <Loader2 className="h-5 w-5 text-quantum-cyan animate-spin" />
            <span className="text-sm font-medium text-parchment-200">
              {t("generating")}
            </span>
            <span className="text-xs text-parchment-500 ml-auto">
              {t("sections", { completed: completedSections, total: totalSections })}
            </span>
          </>
        ) : status === "FAILED" ? (
          <>
            <AlertCircle className="h-5 w-5 text-quantum-red" />
            <span className="text-sm font-medium text-quantum-red">
              {t("failed")}
            </span>
            {onCancel && (
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="ml-auto text-xs px-3 py-1 rounded border border-quantum-red/30 text-quantum-red hover:bg-quantum-red/10 transition-colors disabled:opacity-50"
              >
                {cancelling ? t("cancelling") : t("deleteRefund")}
              </button>
            )}
          </>
        ) : status === "COMPLETE" ? (
          <>
            <CheckCircle className="h-5 w-5 text-quantum-green" />
            <span className="text-sm font-medium text-quantum-green">
              {t("complete")} — {t("sections", { completed: totalSections, total: totalSections })}
            </span>
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 text-quantum-green" />
            <span className="text-sm font-medium text-parchment-200">
              {tc("preview")}
            </span>
          </>
        )}
      </div>

      {status === "COMPLETE" && (
        <div className="h-1.5 rounded-full bg-celestial-800 overflow-hidden">
          <div className="h-full rounded-full bg-quantum-green transition-all duration-700" style={{ width: "100%" }} />
        </div>
      )}

      {status === "GENERATING" && (
        <>
          <div className="h-1.5 rounded-full bg-celestial-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-gold-500 transition-all duration-700"
              style={{ width: `${Math.max(progress, 5)}%` }}
            />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-parchment-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{t("usuallyTakes")}</span>
            {onCancel && (
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="ml-auto text-xs text-parchment-600 hover:text-quantum-red transition-colors disabled:opacity-50"
              >
                {cancelling ? t("cancelling") : t("cancelRefund")}
              </button>
            )}
          </div>

          <div
            className="mt-3 rounded-md border border-gold-700/20 bg-celestial-800/40 px-3 py-2.5 transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <div className="flex items-start gap-2 text-sm text-parchment-300">
              <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-gold-500" />
              {tipDef.href ? (
                <Link
                  href={tipDef.href}
                  className="hover:text-gold-400 transition-colors underline decoration-gold-700/40 underline-offset-2"
                >
                  {t(tipDef.key)} →
                </Link>
              ) : (
                <span>{t(tipDef.key)}</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
