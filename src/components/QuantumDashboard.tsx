"use client";

import { useDashboardStore } from "@/stores/useDashboardStore";
import type { DashboardData, EnergyDataPoint } from "@/types";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface QuantumDashboardProps {
  data?: DashboardData;
}

export default function QuantumDashboard({ data: externalData }: QuantumDashboardProps) {
  const { data: storeData, isUnlocked } = useDashboardStore();
  const data = externalData ?? storeData;

  if (!isUnlocked) return null;

  return (
    <section className="relative py-24 px-6 celestial-bg overflow-hidden">
      {/* Background energy particles */}
      <EnergyParticles />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-700/50 bg-celestial-800/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-quantum-green animate-glow-pulse" />
            <span className="text-xs text-gold-400 tracking-widest uppercase">
              Quantum Field Active
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-parchment-100 mb-4 glow-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Probability Dashboard
          </h2>
          <p className="text-parchment-400 max-w-2xl mx-auto">
            Real-time energy flow analysis across your twelve palaces.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main energy flow chart */}
          <div className="lg:col-span-2 gold-frame rounded-sm bg-celestial-800/60 backdrop-blur-sm p-6">
            <h3 className="text-gold-400 text-sm tracking-widest uppercase mb-6">
              Energy Flow Analysis
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.energyFlow}>
                  <defs>
                    <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4a528" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="#ff8844" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ff4444" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="probGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4a5fc2" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4a5fc2" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#44ffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#44ffff" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,165,40,0.1)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#c4b69e", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(212,165,40,0.2)" }}
                    tickLine={false}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fill: "#c4b69e", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(212,165,40,0.2)" }}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    stroke="#d4a528"
                    strokeWidth={2}
                    fill="url(#energyGrad)"
                    name="Energy"
                  />
                  <Area
                    type="monotone"
                    dataKey="probability"
                    stroke="#4a5fc2"
                    strokeWidth={2}
                    fill="url(#probGrad)"
                    name="Probability"
                  />
                  <Area
                    type="monotone"
                    dataKey="resonance"
                    stroke="#44ffff"
                    strokeWidth={1.5}
                    fill="url(#resGrad)"
                    name="Resonance"
                    strokeDasharray="5 3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-6">
            {/* Radar chart */}
            <div className="gold-frame rounded-sm bg-celestial-800/60 backdrop-blur-sm p-6 flex-1">
              <h3 className="text-gold-400 text-sm tracking-widest uppercase mb-4">
                Field Resonance
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data.energyFlow}>
                    <PolarGrid stroke="rgba(212,165,40,0.15)" />
                    <PolarAngleAxis
                      dataKey="name"
                      tick={{ fill: "#c4b69e", fontSize: 9 }}
                    />
                    <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                    <Radar
                      name="Energy"
                      dataKey="energy"
                      stroke="#d4a528"
                      fill="#d4a528"
                      fillOpacity={0.15}
                      strokeWidth={1.5}
                    />
                    <Radar
                      name="Resonance"
                      dataKey="resonance"
                      stroke="#44ffff"
                      fill="#44ffff"
                      fillOpacity={0.08}
                      strokeWidth={1}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Overall score */}
            <div className="gold-frame rounded-sm bg-celestial-800/60 backdrop-blur-sm p-6">
              <h3 className="text-gold-400 text-sm tracking-widest uppercase mb-4">
                Quantum Score
              </h3>
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(212,165,40,0.15)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${data.overallScore * 2.64} 264`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="scoreGradient">
                        <stop offset="0%" stopColor="#d4a528" />
                        <stop offset="100%" stopColor="#44ffff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-2xl font-bold text-gold-400 glow-text"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {data.overallScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active insight banner */}
        <div className="mt-8 gold-frame rounded-sm bg-celestial-800/40 backdrop-blur-sm p-6 flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/20 border border-gold-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-gold-500 tracking-widest uppercase mb-1">
              Active Insight
            </div>
            <p className="text-parchment-200 text-sm leading-relaxed">
              {data.activeInsight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Custom Tooltip
   ============================================ */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;

  return (
    <div className="bg-celestial-800 border border-gold-700 rounded-sm p-3 shadow-lg shadow-black/50">
      <p className="text-gold-400 text-xs font-semibold mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.stroke }}
          />
          <span className="text-parchment-400">{entry.name}:</span>
          <span className="text-parchment-100 font-semibold">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
}

/* ============================================
   Background Energy Particles
   ============================================ */

// Deterministic particle positions
function _seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: Math.round(_seeded(i + 1) * 100 * 10) / 10,
  top: Math.round(_seeded(i + 21) * 100 * 10) / 10,
  dur: Math.round((4 + _seeded(i + 41) * 6) * 10) / 10,
  delay: Math.round(_seeded(i + 61) * 5 * 10) / 10,
}));

function EnergyParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold-500/30 animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
