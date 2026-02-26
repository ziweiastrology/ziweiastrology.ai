"use client";

import { useState } from "react";
import { useTimelineStore } from "@/stores/useTimelineStore";
import BirthDetailsForm from "@/components/BirthDetailsForm";
import type { TimelineEvent, BirthDetails } from "@/types";

type Phase = "form" | "transitioning" | "timeline";

interface VerificationTimelineProps {
  events?: TimelineEvent[];
  onAllVerified?: () => void;
}

export default function VerificationTimeline({
  events: externalEvents,
  onAllVerified,
}: VerificationTimelineProps) {
  const { events: storeEvents, verifyEvent, allVerified } = useTimelineStore();
  const events = externalEvents ?? storeEvents;
  const [phase, setPhase] = useState<Phase>("form");

  const handleCalibrate = (_details: BirthDetails) => {
    // BirthDetailsForm already played a 2.2s scanning animation before calling this
    setPhase("transitioning");
    // Brief pause for fade-out, then reveal timeline
    setTimeout(() => {
      setPhase("timeline");
    }, 600);
  };

  const handleVerify = (id: string) => {
    verifyEvent(id);
    const updatedEvents = events.map((e) =>
      e.id === id ? { ...e, verified: true } : e
    );
    if (updatedEvents.every((e) => e.verified) && onAllVerified) {
      setTimeout(onAllVerified, 800);
    }
  };

  return (
    <section className="relative py-28 px-6 parchment-bg overflow-hidden">
      {/* Section header with golden gradient */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-600/40" />
          <span className="text-[10px] text-gold-700 tracking-[0.4em] uppercase">Phase One</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-600/40" />
        </div>
        <h2
          className="text-3xl md:text-5xl font-bold gold-gradient-text mb-5"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {phase === "form" ? "Calibration Input" : "Verification Phase"}
        </h2>
        <p
          className="text-base text-parchment-700 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          {phase === "form"
            ? "Enter your celestial coordinates to initialize the quantum probability engine."
            : "Confirm these historical data points to calibrate your quantum probability field."}
        </p>
      </div>

      {/* Phase: Birth Details Form */}
      {(phase === "form" || phase === "transitioning") && (
        <div
          className={`relative z-10 transition-all duration-500 ${
            phase === "transitioning" ? "opacity-0 -translate-y-8" : "opacity-100"
          }`}
        >
          <BirthDetailsForm onCalibrate={handleCalibrate} />
        </div>
      )}

      {/* Phase: Timeline */}
      {phase === "timeline" && (
        <div className="animate-fade-in">
          {/* Timeline container */}
          <div className="relative max-w-6xl mx-auto z-10">
            {/* Golden beam of light — desktop */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden md:block">
              {/* Core beam */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-70" />
              {/* Outer glow */}
              <div className="absolute inset-x-0 -top-[3px] h-[8px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent blur-[2px]" />
              {/* Wide ambient */}
              <div className="absolute inset-x-0 -top-[8px] h-[18px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent blur-[6px]" />
            </div>

            {/* Mobile: vertical beam */}
            <div className="absolute top-0 bottom-0 left-8 md:hidden">
              <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-70" />
              <div className="absolute inset-y-0 -left-[3px] w-[8px] bg-gradient-to-b from-transparent via-gold-400/30 to-transparent blur-[2px]" />
            </div>

            {/* Timeline nodes */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-4">
              {events.map((event, index) => (
                <RuneNode
                  key={event.id}
                  event={event}
                  index={index}
                  onVerify={handleVerify}
                />
              ))}
            </div>
          </div>

          {/* Completion message */}
          {allVerified && (
            <div className="text-center mt-20 relative z-10 animate-fade-in">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-celestial-800/95 text-gold-400 rounded-sm
                              border border-gold-500/40
                              shadow-[0_0_30px_rgba(212,165,40,0.15),0_0_60px_rgba(212,165,40,0.08)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg tracking-wide glow-text" style={{ fontFamily: "var(--font-cinzel)" }}>
                  Calibration Complete — Quantum Field Unlocked
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ============================================
   Rune Node — Glowing ancient star point
   ============================================ */

interface RuneNodeProps {
  event: TimelineEvent;
  index: number;
  onVerify: (id: string) => void;
}

function RuneNode({ event, index, onVerify }: RuneNodeProps) {
  const verified = event.verified;

  return (
    <div
      className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:flex-1 animate-slide-up"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Rune star node */}
      <div className="relative flex-shrink-0 md:mb-5">
        {/* Ambient glow behind node */}
        <div className={`absolute inset-0 -m-3 rounded-full transition-all duration-700
          ${verified
            ? "bg-[radial-gradient(circle,rgba(212,165,40,0.25)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle,rgba(212,165,40,0.08)_0%,transparent_70%)]"
          }`}
        />

        {/* SVG Rune shape */}
        <svg viewBox="0 0 60 60" className="w-16 h-16 relative">
          <defs>
            <filter id={`glow-${event.id}`}>
              <feGaussianBlur stdDeviation="2" result="g" />
              <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Outer hexagon ring */}
          <polygon
            points="30,2 55,16 55,44 30,58 5,44 5,16"
            fill="none"
            stroke={verified ? "rgba(212,165,40,0.7)" : "rgba(143,107,23,0.35)"}
            strokeWidth={verified ? "1.2" : "0.8"}
            filter={verified ? `url(#glow-${event.id})` : undefined}
            style={{ transition: "all 0.5s ease" }}
          />

          {/* Inner hexagon */}
          <polygon
            points="30,10 48,20 48,40 30,50 12,40 12,20"
            fill={verified ? "rgba(212,165,40,0.08)" : "rgba(143,107,23,0.03)"}
            stroke={verified ? "rgba(212,165,40,0.4)" : "rgba(143,107,23,0.15)"}
            strokeWidth="0.5"
            style={{ transition: "all 0.5s ease" }}
          />

          {/* Cross lines through center */}
          <line x1="30" y1="2" x2="30" y2="58" stroke="rgba(143,107,23,0.08)" strokeWidth="0.3" />
          <line x1="5" y1="30" x2="55" y2="30" stroke="rgba(143,107,23,0.08)" strokeWidth="0.3" />

          {/* Center content */}
          {verified ? (
            <g filter={`url(#glow-${event.id})`}>
              <path d="M22 30l5 5 11-11" fill="none" stroke="#d4a528" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : (
            <text x="30" y="33" textAnchor="middle" fill="#8f6b17" fontSize="10" fontFamily="serif" fontWeight="bold">
              {event.year}
            </text>
          )}

          {/* Pulsing outer ring when verified */}
          {verified && (
            <polygon
              points="30,2 55,16 55,44 30,58 5,44 5,16"
              fill="none"
              stroke="rgba(212,165,40,0.3)"
              strokeWidth="0.5"
              className="animate-glow-pulse"
            />
          )}
        </svg>
      </div>

      {/* Content card with etched frame */}
      <div
        className={`md:text-center p-5 rounded-sm transition-all duration-500 max-w-[210px]
          ${verified
            ? "etched-frame border-gold-500/30 shadow-[0_0_20px_rgba(212,165,40,0.08)]"
            : "etched-frame"
          }`}
      >
        <div className="text-[10px] font-bold text-gold-700 tracking-[0.2em] uppercase mb-1.5">
          {event.year}
        </div>
        <h3
          className="text-sm font-bold text-celestial-800 mb-1.5"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          {event.title}
        </h3>
        <p className="text-xs text-parchment-700 mb-4 leading-relaxed">
          {event.description}
        </p>

        {!verified ? (
          <button
            onClick={() => onVerify(event.id)}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-wider
                       text-celestial-900 rounded-sm
                       transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(212,165,40,0.3),0_0_40px_rgba(212,165,40,0.15)]
                       active:scale-95"
            style={{
              background: "linear-gradient(135deg, #b8891e, #d4a528, #e6be4a)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Confirm
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-gold-600 font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Verified
          </span>
        )}
      </div>
    </div>
  );
}
