"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { CaseExample } from "./topicData";
import { cn } from "@/lib/utils";
import CaseReactionBar from "./CaseReactionBar";
import CaseCommentSection from "./CaseCommentSection";

interface CaseCardProps {
  case_: CaseExample;
  colorClass: string;
  borderClass: string;
  autoExpand?: boolean;
  isHighlighted?: boolean;
}

export default function CaseCard({
  case_,
  colorClass,
  borderClass,
  autoExpand = false,
  isHighlighted = false,
}: CaseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [analysisExpanded, setAnalysisExpanded] = useState(false);

  // Auto-expand when triggered by sidebar click
  useEffect(() => {
    if (autoExpand) setExpanded(true);
  }, [autoExpand]);

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 bg-celestial-800/50 p-5 transition-all duration-300",
        borderClass,
        !expanded && "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:bg-celestial-800/70",
        // Highlighted state from sidebar navigation
        isHighlighted && "ring-1 ring-gold-500/50 shadow-[0_0_20px_rgba(212,165,40,0.15)]"
      )}
      onClick={() => { if (!expanded) setExpanded(true); }}
    >
      {/* Subject info row */}
      <div className="mb-3 flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-700/40">
          <Image
            src={case_.subject.avatar}
            alt={case_.subject.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span
            className="text-sm font-medium text-gold-400"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {case_.subject.name}
          </span>
          <span className="mx-1.5 text-parchment-600">&middot;</span>
          <span className="text-xs text-parchment-500">{case_.subject.era}</span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-parchment-100">
        {case_.title}
      </h4>
      <p className="mt-0.5 text-sm text-parchment-500">{case_.titleCn}</p>

      {/* Star + Transformer pills — always visible as visual hook */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {case_.stars.map((star) => (
          <span
            key={star}
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              colorClass,
              "bg-current/10"
            )}
          >
            <span className="text-current">{star}</span>
          </span>
        ))}
        {case_.transformers.map((t) => (
          <span
            key={t}
            className="rounded-full bg-gold-500/10 px-2 py-0.5 text-xs font-medium text-gold-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Collapsed: Explore button */}
      {!expanded && (
        <button
          className={cn(
            "mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors",
            colorClass,
            "opacity-80 hover:opacity-100"
          )}
        >
          Explore this case
          <ChevronRight className="h-3 w-3" />
        </button>
      )}

      {/* Expanded: full content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Chart config */}
            <div className="mt-4 rounded bg-celestial-900/60 px-3 py-2">
              <code className="text-xs text-parchment-400">
                {case_.chartConfig}
              </code>
            </div>

            {/* Analysis */}
            <div className="mt-4">
              <div
                className={cn(
                  "text-sm leading-relaxed text-parchment-400",
                  !analysisExpanded && "line-clamp-4"
                )}
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                {case_.analysis.split("\n\n").map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : ""}>
                    {p}
                  </p>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAnalysisExpanded(!analysisExpanded);
                }}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-gold-500 transition-colors hover:text-gold-400"
              >
                {analysisExpanded ? "Show less" : "Read more"}
                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform",
                    analysisExpanded && "rotate-90"
                  )}
                />
              </button>
            </div>

            {/* Outcome */}
            <div className="mt-4 rounded bg-celestial-800/50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-parchment-500">
                Outcome
              </p>
              <p
                className="mt-1 text-sm leading-relaxed text-parchment-300"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                {case_.outcome}
              </p>
            </div>

            {/* Principle */}
            <blockquote
              className={cn(
                "mt-4 border-l-2 border-gold-500/40 pl-3",
                isHighlighted && "border-gold-400/60"
              )}
            >
              <p
                className={cn(
                  "text-sm italic leading-relaxed",
                  isHighlighted
                    ? "gold-gradient-text"
                    : "text-gold-300/80"
                )}
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                {case_.principle}
              </p>
            </blockquote>

            {/* Reactions */}
            <div className="mt-4">
              <CaseReactionBar caseId={case_.id} />
            </div>

            {/* Comments */}
            <CaseCommentSection caseId={case_.id} />

            {/* Collapse button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
                setAnalysisExpanded(false);
              }}
              className="mt-4 flex items-center gap-1 text-xs font-medium text-parchment-500 transition-colors hover:text-parchment-300"
            >
              Collapse
              <ChevronRight className="h-3 w-3 -rotate-90" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
