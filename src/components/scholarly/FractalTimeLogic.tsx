"use client";

import { useState, useMemo } from "react";

interface TimeScale {
  label: string;
  sublabel: string;
  periods: Period[];
}

interface Period {
  name: string;
  energy: number;
  state: "expansion" | "contraction" | "neutral" | "peak";
}

const YEARLY_DATA: Period[] = [
  { name: "2020", energy: 35, state: "contraction" },
  { name: "2021", energy: 52, state: "neutral" },
  { name: "2022", energy: 78, state: "expansion" },
  { name: "2023", energy: 88, state: "peak" },
  { name: "2024", energy: 65, state: "expansion" },
  { name: "2025", energy: 42, state: "neutral" },
  { name: "2026", energy: 71, state: "expansion" },
  { name: "2027", energy: 55, state: "neutral" },
  { name: "2028", energy: 82, state: "peak" },
  { name: "2029", energy: 38, state: "contraction" },
];

const MONTHLY_DATA: Period[] = [
  { name: "Jan", energy: 58, state: "neutral" },
  { name: "Feb", energy: 64, state: "expansion" },
  { name: "Mar", energy: 82, state: "peak" },
  { name: "Apr", energy: 75, state: "expansion" },
  { name: "May", energy: 48, state: "contraction" },
  { name: "Jun", energy: 55, state: "neutral" },
  { name: "Jul", energy: 70, state: "expansion" },
  { name: "Aug", energy: 88, state: "peak" },
  { name: "Sep", energy: 62, state: "neutral" },
  { name: "Oct", energy: 40, state: "contraction" },
  { name: "Nov", energy: 53, state: "neutral" },
  { name: "Dec", energy: 72, state: "expansion" },
];

const DAILY_DATA: Period[] = [
  { name: "Wk 1", energy: 66, state: "expansion" },
  { name: "Wk 2", energy: 81, state: "peak" },
  { name: "Wk 3", energy: 45, state: "contraction" },
  { name: "Wk 4", energy: 58, state: "neutral" },
];

const SCALES: TimeScale[] = [
  { label: "Decadal", sublabel: "大限 — Ten-Year Macro Cycle", periods: YEARLY_DATA },
  { label: "Annual", sublabel: "流年 — Yearly Transit", periods: MONTHLY_DATA },
  { label: "Monthly", sublabel: "流月 — Monthly Micro Cycle", periods: DAILY_DATA },
];

const STATE_STYLES: Record<string, { color: string; glow: string }> = {
  peak: { color: "#8f6b17", glow: "rgba(212,165,40,0.25)" },
  expansion: { color: "rgba(143,107,23,0.7)", glow: "rgba(212,165,40,0.12)" },
  neutral: { color: "rgba(140,126,107,0.5)", glow: "rgba(140,126,107,0.06)" },
  contraction: { color: "rgba(140,126,107,0.25)", glow: "rgba(140,126,107,0.03)" },
};

export default function FractalTimeLogic() {
  const [scaleIndex, setScaleIndex] = useState(0);
  const scale = SCALES[scaleIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Intro text */}
      <p
        className="text-sm text-parchment-700 leading-[1.9] max-w-2xl mx-auto text-center mb-12"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        Zi Wei Dou Shu operates on a principle of <em>self-similar temporal structure</em>.
        The same twelve-palace logic that governs a ten-year macro cycle applies identically
        to a single month. Move the scale selector to observe how patterns at one resolution
        reproduce at another — a fractal geometry of time.
      </p>

      {/* Scale selector with etched frame */}
      <div className="flex items-center justify-center gap-0 mb-10 mx-auto w-fit etched-frame rounded-sm overflow-hidden">
        {SCALES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setScaleIndex(i)}
            className={`relative px-6 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300
              ${scaleIndex === i
                ? "text-gold-800 font-semibold bg-gold-500/10"
                : "text-parchment-500 hover:text-parchment-700 hover:bg-gold-500/5"
              }`}
          >
            {s.label}
            {scaleIndex === i && (
              <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #8f6b17, transparent)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Scale label */}
      <div className="text-center mb-8">
        <span className="text-xs text-parchment-500 tracking-wide" style={{ fontFamily: "var(--font-merriweather)" }}>
          {scale.sublabel}
        </span>
      </div>

      {/* Chart container with etched frame */}
      <div className="etched-frame rounded-sm p-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent mb-4" />

        {/* Bars */}
        <div className="flex items-end justify-between gap-1.5 h-[220px] relative">
          {/* Reference lines */}
          {[25, 50, 75].map((pct) => (
            <div key={pct}
              className="absolute left-0 right-0 border-t border-dashed"
              style={{ bottom: `${pct}%`, borderColor: "rgba(143,107,23,0.08)" }}
            />
          ))}

          {scale.periods.map((period, i) => {
            const height = (period.energy / 100) * 100;
            const style = STATE_STYLES[period.state];
            return (
              <div key={`${scale.label}-${i}`} className="flex-1 flex flex-col items-center justify-end relative group">
                {/* Value on hover */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                px-2 py-0.5 rounded-sm text-[10px] font-mono"
                  style={{ color: style.color, background: style.glow }}>
                  {period.energy}
                </div>

                {/* Bar with glow */}
                <div className="relative w-full max-w-[40px]">
                  {/* Glow behind bar */}
                  <div
                    className="absolute inset-0 rounded-t-sm blur-[3px] transition-all duration-500"
                    style={{
                      height: `${height}%`,
                      backgroundColor: style.glow,
                      bottom: 0,
                      top: "auto",
                      transitionDelay: `${i * 40}ms`,
                    }}
                  />
                  {/* Actual bar */}
                  <div
                    className="relative w-full rounded-t-sm transition-all duration-500 ease-out"
                    style={{
                      height: `${height}%`,
                      background: `linear-gradient(180deg, ${style.color}, ${style.color}88)`,
                      transitionDelay: `${i * 40}ms`,
                      boxShadow: `0 0 8px ${style.glow}`,
                    }}
                  />
                </div>

                {/* Label */}
                <span className="text-[9px] text-parchment-500 mt-3 font-mono">{period.name}</span>
              </div>
            );
          })}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent mt-4" />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-8">
        {(["peak", "expansion", "neutral", "contraction"] as const).map((state) => (
          <div key={state} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-[1px]" style={{
              backgroundColor: STATE_STYLES[state].color,
              boxShadow: `0 0 6px ${STATE_STYLES[state].glow}`,
            }} />
            <span className="text-[10px] text-parchment-500 tracking-wider uppercase">{state}</span>
          </div>
        ))}
      </div>

      {/* Fractal note */}
      <div className="mt-12 max-w-xl mx-auto text-center">
        <p className="text-xs text-parchment-500 leading-relaxed italic"
          style={{ fontFamily: "var(--font-merriweather)" }}>
          Note the structural similarity across scales. The ratio of peak-to-contraction phases
          remains consistent whether measured in decades or weeks — confirming the fractal
          self-similarity of the underlying temporal model.
        </p>
      </div>
    </div>
  );
}
