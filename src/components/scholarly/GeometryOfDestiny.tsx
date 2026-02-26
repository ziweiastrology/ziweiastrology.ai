"use client";

import { useState } from "react";

interface Palace {
  name: string;
  western: string;
  meaning: string;
  x: number;
  y: number;
}

const PALACES: Palace[] = [
  { name: "命宮", western: "Self", meaning: "The Life CPU. Your core identity, innate disposition, and the lens through which all other palaces are interpreted.", x: 3, y: 1 },
  { name: "兄弟", western: "Siblings", meaning: "The First Alliance. Resource-sharing, competition, and the primal pattern of cooperation among equals.", x: 3, y: 0 },
  { name: "夫妻", western: "Spouse", meaning: "The Partnership Mirror. The alchemy of two destinies merging — your highest-quality contractual bond.", x: 2, y: 0 },
  { name: "子女", western: "Children", meaning: "The Creation Engine. Your output from every act of conception and nurturing — offspring, ideas, investments.", x: 1, y: 0 },
  { name: "財帛", western: "Wealth", meaning: "The Financial Frequency. Cash-flow logic, risk tolerance, and your relationship with material resources.", x: 0, y: 0 },
  { name: "疾厄", western: "Health", meaning: "The Stress Monitor. A real-time readout of your subconscious pressure and your body's most vulnerable logic gaps.", x: 0, y: 1 },
  { name: "遷移", western: "Travel", meaning: "The Horizon Shift. Your adaptability to change, travel, and survival odds in unfamiliar territory.", x: 0, y: 2 },
  { name: "交友", western: "Friends", meaning: "The Social Synapse. How your network drains or amplifies your energy across non-familial connections.", x: 0, y: 3 },
  { name: "官祿", western: "Career", meaning: "The Sovereign Impact. How you build order and achievement in the external world through action.", x: 1, y: 3 },
  { name: "田宅", western: "Property", meaning: "The Foundational Base. Real estate, family legacy, and your deepest sense of belonging.", x: 2, y: 3 },
  { name: "福德", western: "Fortune", meaning: "The Spiritual Vault. Karma, mindset, and the invisible 'luck score' accumulated in unseen realms.", x: 3, y: 3 },
  { name: "父母", western: "Parents", meaning: "The Ancestral Input. Superiors, elders, and the power structures that existed before you and shaped your formation.", x: 3, y: 2 },
];

export default function GeometryOfDestiny() {
  const [activePalace, setActivePalace] = useState<Palace | null>(null);

  const gridSize = 130;
  const padding = 55;
  const totalSize = gridSize * 4 + padding * 2;
  const centerX = totalSize / 2;
  const centerY = totalSize / 2;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* SVG diagram */}
        <div className="lg:col-span-3 flex justify-center">
          <svg
            viewBox={`0 0 ${totalSize} ${totalSize}`}
            className="w-full max-w-[500px] h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="sacredGrid" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
                <path d="M26 0H0v26" fill="none" stroke="rgba(143,107,23,0.06)" strokeWidth="0.3" />
              </pattern>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="g" />
                <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="activeNodeFill">
                <stop offset="0%" stopColor="rgba(212,165,40,0.12)" />
                <stop offset="100%" stopColor="rgba(212,165,40,0)" />
              </radialGradient>
            </defs>

            {/* Grid background */}
            <rect width={totalSize} height={totalSize} fill="url(#sacredGrid)" />

            {/* Connection lines — with subtle glow */}
            {PALACES.map((palace, i) => {
              const next = PALACES[(i + 1) % PALACES.length];
              const x1 = padding + palace.x * gridSize + gridSize / 2;
              const y1 = padding + palace.y * gridSize + gridSize / 2;
              const x2 = padding + next.x * gridSize + gridSize / 2;
              const y2 = padding + next.y * gridSize + gridSize / 2;
              return (
                <g key={`conn-${i}`}>
                  {/* Glow line */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(212,165,40,0.08)" strokeWidth="4" />
                  {/* Core line */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(143,107,23,0.25)" strokeWidth="0.7" />
                </g>
              );
            })}

            {/* Diagonal references */}
            {PALACES.filter((_, i) => i % 3 === 0).map((palace, i) => {
              const px = padding + palace.x * gridSize + gridSize / 2;
              const py = padding + palace.y * gridSize + gridSize / 2;
              return (
                <line key={`diag-${i}`} x1={px} y1={py} x2={centerX} y2={centerY}
                  stroke="rgba(74,95,194,0.1)" strokeWidth="0.4" strokeDasharray="3 5" />
              );
            })}

            {/* Center — Tai Ji with glow */}
            <circle cx={centerX} cy={centerY} r="25" fill="none" stroke="rgba(212,165,40,0.15)" strokeWidth="0.5" />
            <circle cx={centerX} cy={centerY} r="15" fill="none" stroke="rgba(74,95,194,0.1)" strokeWidth="0.3" strokeDasharray="2 3" />
            <circle cx={centerX} cy={centerY} r="4" fill="rgba(212,165,40,0.5)" filter="url(#nodeGlow)" />
            <text x={centerX} y={centerY + 38} textAnchor="middle"
              fill="rgba(143,107,23,0.4)" fontSize="7" fontFamily="serif" letterSpacing="3">
              太極
            </text>

            {/* Palace nodes */}
            {PALACES.map((palace, i) => {
              const x = padding + palace.x * gridSize + gridSize / 2;
              const y = padding + palace.y * gridSize + gridSize / 2;
              const isActive = activePalace?.name === palace.name;

              return (
                <g
                  key={`p-${i}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePalace(palace)}
                  onMouseLeave={() => setActivePalace(null)}
                >
                  {/* Ambient glow */}
                  {isActive && (
                    <circle cx={x} cy={y} r="30" fill="url(#activeNodeFill)" />
                  )}

                  {/* Outer ring */}
                  <circle cx={x} cy={y} r="24" fill="none"
                    stroke={isActive ? "rgba(212,165,40,0.5)" : "rgba(143,107,23,0.1)"}
                    strokeWidth={isActive ? "0.8" : "0.3"}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  {/* Node body */}
                  <circle cx={x} cy={y} r="18"
                    fill={isActive ? "rgba(212,165,40,0.06)" : "rgba(248,244,237,0.5)"}
                    stroke={isActive ? "rgba(212,165,40,0.6)" : "rgba(143,107,23,0.25)"}
                    strokeWidth={isActive ? "1.2" : "0.6"}
                    filter={isActive ? "url(#nodeGlow)" : undefined}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  {/* Chinese label */}
                  <text x={x} y={y - 1} textAnchor="middle" dominantBaseline="middle"
                    fill={isActive ? "#8f6b17" : "#6b5011"}
                    fontSize="9" fontFamily="serif" fontWeight="700"
                    style={{ transition: "fill 0.3s ease" }}>
                    {palace.name}
                  </text>

                  {/* Western label */}
                  <text x={x} y={y + 10} textAnchor="middle" dominantBaseline="middle"
                    fill={isActive ? "rgba(143,107,23,0.7)" : "rgba(140,126,107,0.5)"}
                    fontSize="5" fontFamily="sans-serif" letterSpacing="0.8"
                    style={{ transition: "fill 0.3s ease" }}>
                    {palace.western.toUpperCase()}
                  </text>

                  {/* Index */}
                  <text x={x + 22} y={y - 18} textAnchor="middle"
                    fill="rgba(140,126,107,0.25)" fontSize="5.5" fontFamily="sans-serif">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              );
            })}

            {/* Outer circle */}
            <circle cx={centerX} cy={centerY} r={totalSize / 2 - 10}
              fill="none" stroke="rgba(143,107,23,0.06)" strokeWidth="0.3" strokeDasharray="2 6" />
          </svg>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 lg:pt-8">
          <div className="min-h-[280px]">
            {activePalace ? (
              <div className="animate-fade-in etched-frame rounded-sm p-6" key={activePalace.name}>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl gold-gradient-text font-bold" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {activePalace.name}
                  </span>
                  <span className="text-sm text-gold-700 tracking-[0.2em] uppercase">
                    {activePalace.western}
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-5" />
                <p className="text-sm text-parchment-800 leading-[1.8]" style={{ fontFamily: "var(--font-merriweather)" }}>
                  {activePalace.meaning}
                </p>
                <p className="text-xs text-parchment-600 mt-4 leading-relaxed">
                  Position {PALACES.indexOf(activePalace) + 1} of 12 in the natal chart matrix.
                  This palace interacts with its opposite (the &ldquo;confrontation palace&rdquo;)
                  and its two flanking palaces to form a triadic resonance field.
                </p>
              </div>
            ) : (
              <div className="text-parchment-500">
                <p className="text-sm italic leading-relaxed" style={{ fontFamily: "var(--font-merriweather)" }}>
                  Hover over any palace node to examine its role within the twelve-house system.
                  Each palace governs a distinct domain of human experience, and their interactions
                  form the basis of all probabilistic calculations.
                </p>
                <div className="mt-8 space-y-2">
                  {PALACES.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs text-parchment-600 cursor-pointer hover:text-gold-700 transition-colors"
                      onMouseEnter={() => setActivePalace(p)}
                      onMouseLeave={() => setActivePalace(null)}
                    >
                      <span className="text-parchment-400 w-5 text-right font-mono text-[10px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-parchment-400">{p.western}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
