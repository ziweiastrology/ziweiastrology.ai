"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Scale, Crown } from "lucide-react";
import {
  SYSTEMS,
  DIMENSION_GROUPS,
  type DivinationSystem,
  type SystemRating,
} from "./comparisonData";
import { cn } from "@/lib/utils";

/* ── Rating bars visual ── */
function RatingBars({
  rating,
  highlighted,
  active,
}: {
  rating: SystemRating;
  highlighted: boolean;
  active: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < rating.score;
          return (
            <div
              key={i}
              className={cn(
                "h-2 w-5 rounded-full transition-all duration-300",
                filled
                  ? highlighted
                    ? cn("bg-gold-400", active && "scale-y-150 shadow-[0_0_8px_rgba(200,160,60,0.5)]")
                    : cn("bg-celestial-400", active && "scale-y-150 shadow-[0_0_8px_rgba(90,53,168,0.5)]")
                  : cn("bg-celestial-700/50", active && "bg-celestial-700/70")
              )}
            />
          );
        })}
      </div>
      <p
        className={cn(
          "text-xs transition-colors duration-200",
          active ? "text-parchment-300" : "text-parchment-500"
        )}
      >
        {rating.label}
      </p>
    </div>
  );
}

/* ── Get value from system by key ── */
function getCellValue(sys: DivinationSystem, key: string) {
  return sys[key as keyof DivinationSystem];
}

export default function ComparisonTable() {
  const zwds = SYSTEMS[0];
  const others = SYSTEMS.slice(1);
  const allSystems = [zwds, ...others];

  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <motion.section
      id="comparison"
      className="scroll-mt-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Ornamental divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        <span className="text-xs tracking-widest text-gold-500/60">
          ✦ ✦ ✦
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      </div>

      {/* Section header */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400/10 to-transparent">
          <Scale className="h-6 w-6 text-gold-400" />
        </div>
        <div>
          <h2
            className="text-2xl font-bold text-gold-400"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            System Comparison
          </h2>
          <p className="text-sm text-parchment-500">
            How Zi Wei Dou Shu compares to other divination systems
          </p>
        </div>
      </div>

      {/* ═══ Desktop table ═══ */}
      <div
        className="mt-8 hidden overflow-x-auto rounded-xl border border-gold-700/20 lg:block"
        onMouseLeave={() => {
          setHoveredCol(null);
          setHoveredRow(null);
        }}
      >
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="bg-celestial-800/60">
              <th className="w-36 px-4 py-4" />
              {allSystems.map((sys) => {
                const isZwds = sys.isHighlighted;
                const isColHovered = hoveredCol === sys.id;
                return (
                  <th
                    key={sys.id}
                    className={cn(
                      "px-4 py-4 text-left transition-all duration-300",
                      isZwds && "relative px-5",
                      isColHovered && !isZwds && "bg-celestial-700/30",
                      isColHovered && isZwds && "bg-gold-500/10"
                    )}
                    onMouseEnter={() => setHoveredCol(sys.id)}
                  >
                    {isZwds && (
                      <div
                        className={cn(
                          "absolute inset-x-0 top-0 h-[3px] rounded-t transition-all duration-300",
                          "bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60",
                          isColHovered && "h-[4px] from-gold-400 via-gold-300 to-gold-400 shadow-[0_0_12px_rgba(200,160,60,0.4)]"
                        )}
                      />
                    )}
                    <div className={cn("flex items-center gap-2", !isZwds && "flex-col items-start gap-0")}>
                      {isZwds && (
                        <Crown
                          className={cn(
                            "h-4 w-4 text-gold-400 transition-all duration-300",
                            isColHovered && "scale-110 text-gold-300 drop-shadow-[0_0_6px_rgba(200,160,60,0.6)]"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "font-semibold uppercase tracking-wider transition-all duration-300",
                          isZwds
                            ? cn("text-sm font-bold text-gold-400", isColHovered && "text-gold-300")
                            : cn("text-xs text-parchment-400", isColHovered && "text-parchment-200")
                        )}
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {sys.name}
                      </span>
                      <p
                        className={cn(
                          "text-xs font-normal transition-colors duration-200",
                          isZwds
                            ? cn("mt-0.5 text-gold-500/70", isColHovered && "text-gold-400/80")
                            : cn("mt-0.5 text-parchment-600", isColHovered && "text-parchment-500")
                        )}
                      >
                        {isZwds ? `${sys.nameCn} · ${sys.tagline}` : sys.nameCn}
                      </p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {DIMENSION_GROUPS.map((group) => (
              <Fragment key={group.label}>
                {/* Group header row */}
                <tr>
                  <td
                    colSpan={SYSTEMS.length + 1}
                    className="border-t border-gold-700/20 bg-celestial-900/50 px-4 py-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/60">
                      {group.label}
                    </span>
                  </td>
                </tr>

                {/* Dimension rows */}
                {group.rows.map((row, ri) => {
                  const isRowHovered = hoveredRow === row.key;
                  return (
                    <tr
                      key={row.key}
                      className={cn(
                        "border-t border-gold-700/10 transition-all duration-200",
                        ri % 2 === 1 && "bg-celestial-900/20",
                        isRowHovered && "bg-celestial-800/30"
                      )}
                      onMouseEnter={() => setHoveredRow(row.key)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* Label */}
                      <td
                        className={cn(
                          "px-4 py-3 text-xs font-medium uppercase tracking-wider transition-colors duration-200",
                          isRowHovered ? "text-gold-400" : "text-parchment-500"
                        )}
                      >
                        {row.label}
                      </td>

                      {/* System cells */}
                      {allSystems.map((sys) => {
                        const isZwds = sys.isHighlighted;
                        const isColHovered = hoveredCol === sys.id;
                        const isCellActive = isRowHovered || isColHovered;

                        return (
                          <td
                            key={sys.id}
                            className={cn(
                              "px-4 py-3 transition-all duration-200",
                              isZwds && "px-5",
                              // Column highlight
                              isColHovered && isZwds && "bg-gold-500/[0.06]",
                              isColHovered && !isZwds && "bg-celestial-700/20",
                              // Default ZWDS tint
                              !isColHovered && isZwds && "bg-gold-500/[0.03]",
                              // Cross-hair highlight (row + col)
                              isRowHovered && isColHovered && isZwds && "bg-gold-500/10",
                              isRowHovered && isColHovered && !isZwds && "bg-celestial-700/40"
                            )}
                            onMouseEnter={() => setHoveredCol(sys.id)}
                          >
                            {row.type === "rating" ? (
                              <RatingBars
                                rating={getCellValue(sys, row.key) as SystemRating}
                                highlighted={isZwds}
                                active={isCellActive}
                              />
                            ) : (
                              <span
                                className={cn(
                                  "text-sm transition-colors duration-200",
                                  isZwds
                                    ? isCellActive ? "text-parchment-100" : "text-parchment-200"
                                    : isCellActive ? "text-parchment-200" : "text-parchment-400"
                                )}
                              >
                                {getCellValue(sys, row.key) as string}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ Mobile cards ═══ */}
      <div className="mt-6 space-y-4 lg:hidden">
        {SYSTEMS.map((sys) => (
          <div
            key={sys.id}
            className={cn(
              "rounded-xl border p-5 transition-all duration-300 active:scale-[0.99]",
              sys.isHighlighted
                ? "border-gold-400/30 bg-gradient-to-br from-gold-500/5 to-transparent"
                : "border-gold-700/20 bg-celestial-800/30"
            )}
          >
            {/* Card header */}
            <div className="flex items-start gap-3">
              {sys.isHighlighted && (
                <Crown className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              )}
              <div>
                <h3
                  className={cn(
                    "text-lg font-bold",
                    sys.isHighlighted ? "text-gold-400" : "text-parchment-200"
                  )}
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {sys.name}
                  <span className="ml-2 text-sm font-normal text-parchment-500">
                    {sys.nameCn}
                  </span>
                </h3>
                <p className="mt-0.5 text-xs text-parchment-500">
                  {sys.tagline}
                </p>
              </div>
            </div>

            {/* Rating bars */}
            <div className="mt-4 space-y-3">
              {DIMENSION_GROUPS[1].rows.map((row) => {
                const rating = getCellValue(sys, row.key) as SystemRating;
                return (
                  <div key={row.key}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-parchment-500">
                        {row.label}
                      </span>
                      <span className="text-[10px] text-parchment-600">
                        {rating.score}/5
                      </span>
                    </div>
                    <div className="mt-1 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1.5 flex-1 rounded-full",
                            i < rating.score
                              ? sys.isHighlighted
                                ? "bg-gold-400"
                                : "bg-celestial-400"
                              : "bg-celestial-700/40"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info section */}
            <div className="mt-4 space-y-2 border-t border-gold-700/15 pt-3">
              {DIMENSION_GROUPS[0].rows.map((row) => (
                <div key={row.key} className="flex gap-2 text-xs">
                  <span className="shrink-0 font-medium text-parchment-500">
                    {row.label}:
                  </span>
                  <span className="text-parchment-400">
                    {getCellValue(sys, row.key) as string}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
