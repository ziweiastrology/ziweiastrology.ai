"use client";

import { useState } from "react";
import type { Star } from "@/data/starData";

interface StarCardProps {
  star: Star;
}

export default function StarCard({ star }: StarCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative etched-frame rounded-sm p-6 transition-all duration-500 cursor-pointer"
      style={{
        borderColor: expanded ? star.accentColor + "4D" : undefined,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 30px ${star.accentColor}1A, 0 0 15px ${star.accentColor}0D`,
        }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-3 mb-3">
        {/* Accent dot */}
        <div
          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
          style={{
            backgroundColor: star.accentColor,
            boxShadow: `0 0 8px ${star.accentColor}66`,
          }}
        />
        <div>
          <span
            className="text-2xl font-bold block"
            style={{
              color: star.accentColor,
              fontFamily: "var(--font-serif)",
            }}
          >
            {star.nameCn}
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-semibold text-parchment-600"
          >
            {star.nameEn}
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="relative h-px mb-3">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${star.accentColor}4D, transparent)`,
          }}
        />
      </div>

      {/* Brief (EN) */}
      <p
        className="relative text-xs text-parchment-700 leading-[1.8]"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        {star.brief}
      </p>

      {/* Expanded: CN description */}
      {expanded && (
        <div className="mt-3 animate-fade-in">
          <div className="relative h-px mb-3">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${star.accentColor}33, transparent)`,
              }}
            />
          </div>
          <p
            className="text-xs text-parchment-600 leading-[1.9]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {star.briefCn}
          </p>
        </div>
      )}

      {/* Expand indicator */}
      <div className="flex items-center gap-1.5 mt-3">
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          style={{ color: star.accentColor, opacity: 0.5 }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-[10px] tracking-wider uppercase" style={{ color: star.accentColor, opacity: 0.5 }}>
          {expanded ? "收起" : "中文"}
        </span>
      </div>

      {/* Corner ornaments */}
      <svg className="absolute top-2 left-2 w-3 h-3 opacity-15" viewBox="0 0 16 16" style={{ color: star.accentColor }}>
        <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-3 h-3 opacity-15" viewBox="0 0 16 16" style={{ color: star.accentColor }}>
        <path d="M16 8v8H8" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  );
}
