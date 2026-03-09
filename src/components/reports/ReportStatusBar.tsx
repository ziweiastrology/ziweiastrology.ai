"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, CheckCircle, AlertCircle, Clock, Lightbulb } from "lucide-react";

const TIPS: { text: string; href?: string }[] = [
  { text: "Complete your profile in Settings for personalized energy matching", href: "/settings" },
  { text: "Visit the Community Welcome group to introduce yourself", href: "/community" },
  { text: "Your report covers 12 palaces, decade timeline, life narrative & overall assessment" },
  { text: "Tip: Save this page — you can revisit your report anytime from your dashboard" },
  { text: "Each palace represents a life domain — Career, Wealth, Relationships, Health and more" },
  { text: "紫微斗數 (Zi Wei Dou Shu) dates back over 1,000 years to the Song Dynasty" },
  { text: "Your decade timeline reveals how star energies shift across each 10-year period" },
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
  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (status !== "GENERATING") return;

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
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
  const tip = TIPS[tipIndex];

  return (
    <div className="rounded-lg border border-gold-700/30 bg-celestial-900/60 p-4">
      <div className="flex items-center gap-3 mb-3">
        {status === "GENERATING" ? (
          <>
            <Loader2 className="h-5 w-5 text-quantum-cyan animate-spin" />
            <span className="text-sm font-medium text-parchment-200">
              Generating your report...
            </span>
            <span className="text-xs text-parchment-500 ml-auto">
              {completedSections}/{totalSections} sections
            </span>
          </>
        ) : status === "FAILED" ? (
          <>
            <AlertCircle className="h-5 w-5 text-quantum-red" />
            <span className="text-sm font-medium text-quantum-red">
              Generation failed
            </span>
            {onCancel && (
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="ml-auto text-xs px-3 py-1 rounded border border-quantum-red/30 text-quantum-red hover:bg-quantum-red/10 transition-colors disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Delete & Refund Credits"}
              </button>
            )}
          </>
        ) : status === "COMPLETE" ? (
          <>
            <CheckCircle className="h-5 w-5 text-quantum-green" />
            <span className="text-sm font-medium text-quantum-green">
              Report complete — {totalSections}/{totalSections} sections
            </span>
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 text-quantum-green" />
            <span className="text-sm font-medium text-parchment-200">
              Preview
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
            <span>This usually takes 1–2 minutes.</span>
            {onCancel && (
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="ml-auto text-xs text-parchment-600 hover:text-quantum-red transition-colors disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Cancel & Refund"}
              </button>
            )}
          </div>

          <div
            className="mt-3 rounded-md border border-gold-700/20 bg-celestial-800/40 px-3 py-2.5 transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <div className="flex items-start gap-2 text-sm text-parchment-300">
              <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-gold-500" />
              {tip.href ? (
                <Link
                  href={tip.href}
                  className="hover:text-gold-400 transition-colors underline decoration-gold-700/40 underline-offset-2"
                >
                  {tip.text} →
                </Link>
              ) : (
                <span>{tip.text}</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
