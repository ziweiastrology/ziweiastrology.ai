"use client";

import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  status: string;
  totalSections: number;
  completedSections: number;
}

export default function ReportStatusBar({ status, totalSections, completedSections }: Props) {
  if (status === "COMPLETE") return null;

  const progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

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
              Generation failed — please contact support
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
      {status === "GENERATING" && (
        <div className="h-1.5 rounded-full bg-celestial-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-gold-500 transition-all duration-700"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>
      )}
    </div>
  );
}
