"use client";

import { useDashboardStore } from "@/stores/useDashboardStore";
import type { CopilotStatus } from "@/types";

const STATUS_CONFIG: Record<CopilotStatus, { label: string; color: string; pulse: boolean }> = {
  active: { label: "Active", color: "bg-quantum-green", pulse: true },
  monitoring: { label: "Monitoring", color: "bg-quantum-cyan", pulse: true },
  analyzing: { label: "Analyzing", color: "bg-quantum-orange", pulse: true },
  idle: { label: "Standby", color: "bg-parchment-500", pulse: false },
};

export default function AICopilotWidget() {
  const { copilotStatus, copilotOpen, toggleCopilot, isUnlocked } = useDashboardStore();

  if (!isUnlocked) return null;

  const config = STATUS_CONFIG[copilotStatus];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded panel */}
      {copilotOpen && (
        <div
          className="absolute bottom-20 right-0 w-80 gold-frame rounded-sm bg-celestial-800/95 backdrop-blur-md
                     shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_15px_rgba(212,165,40,0.1)]
                     animate-fade-in overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gold-700/30 bg-celestial-900/50">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? "animate-glow-pulse" : ""}`} />
              <span className="text-xs text-gold-400 tracking-widest uppercase">
                AI Co-pilot: {config.label}
              </span>
            </div>
            <button
              onClick={toggleCopilot}
              className="text-parchment-500 hover:text-parchment-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat area */}
          <div className="p-4 h-64 flex flex-col justify-end">
            <div className="space-y-3">
              {/* System message */}
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 border border-gold-700 flex items-center justify-center">
                  <svg className="w-3 h-3 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-celestial-700/50 rounded-sm p-3 max-w-[85%]">
                  <p className="text-xs text-parchment-300 leading-relaxed">
                    Quantum probability field calibrated. I&apos;m monitoring your energy flows
                    in real-time. Ask me anything about your chart.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input area (preview — non-functional) */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 bg-celestial-900/50 border border-gold-700/30 rounded-sm px-3 py-2">
              <input
                type="text"
                placeholder="Ask the Co-pilot..."
                className="flex-1 bg-transparent text-xs text-parchment-200 placeholder:text-parchment-600 outline-none"
                disabled
              />
              <span className="text-[10px] text-gold-700 tracking-wider uppercase">
                Premium
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={toggleCopilot}
        className="group relative w-14 h-14 rounded-full
                   bg-celestial-800 border border-gold-700
                   shadow-[0_0_20px_rgba(0,0,0,0.4),0_0_10px_rgba(212,165,40,0.1)]
                   transition-all duration-300
                   hover:shadow-[0_0_30px_rgba(0,0,0,0.4),0_0_20px_rgba(212,165,40,0.2)]
                   hover:border-gold-500
                   active:scale-95
                   flex items-center justify-center"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full border border-gold-500/30 animate-glow-pulse" />

        {/* Icon */}
        <svg className="w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>

        {/* Status dot */}
        <div className="absolute -top-0.5 -right-0.5">
          <div className={`w-3 h-3 rounded-full ${config.color} border-2 border-celestial-800`} />
          {config.pulse && (
            <div className={`absolute inset-0 w-3 h-3 rounded-full ${config.color} animate-ping opacity-75`} />
          )}
        </div>
      </button>
    </div>
  );
}
