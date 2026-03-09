"use client";

import { Briefcase, HeartPulse, Heart } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  extractCareerData,
  extractHealthData,
  extractSpouseData,
} from "@/lib/reports/extractMatchingData";

interface Section {
  type: string;
  key: string;
  title: string;
  content: string;
}

interface Props {
  sections: Section[];
}

function attentionColor(value: number) {
  if (value >= 60) return "bg-quantum-red/80";
  if (value >= 40) return "bg-quantum-orange/80";
  return "bg-quantum-green/80";
}

export default function MatchingCards({ sections }: Props) {
  const career = extractCareerData(sections);
  const health = extractHealthData(sections);
  const spouse = extractSpouseData(sections);

  const careerRadar = career.industries.map((i) => ({
    subject: i.name,
    value: i.score,
    fullMark: 100,
  }));

  const spouseRadar = spouse.traits.map((t) => ({
    subject: t.trait,
    value: t.alignment,
    fullMark: 100,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Career Suitability */}
      <div className="gold-frame rounded-xl bg-celestial-800/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="h-5 w-5 text-gold-400" />
          <h4
            className="text-sm font-bold gold-gradient-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Career Suitability
          </h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={careerRadar} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(212,165,40,0.15)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#b8a07a", fontSize: 9 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                dataKey="value"
                stroke="#D4A528"
                fill="#D4A528"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-parchment-400 mt-2 leading-relaxed">
          {career.summary}
        </p>
      </div>

      {/* Health Focus */}
      <div className="gold-frame rounded-xl bg-celestial-800/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse className="h-5 w-5 text-quantum-green" />
          <h4
            className="text-sm font-bold gold-gradient-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Health Focus Areas
          </h4>
        </div>
        <div className="space-y-3 mt-4">
          {health.focusAreas.map((area) => (
            <div key={area.area}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-parchment-400">{area.area}</span>
                <span className="text-parchment-500 font-mono">
                  {area.attention}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-celestial-900/60 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${attentionColor(area.attention)}`}
                  style={{ width: `${area.attention}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-parchment-400 mt-3 leading-relaxed">
          {health.summary}
        </p>
      </div>

      {/* Spouse Compatibility */}
      <div className="gold-frame rounded-xl bg-celestial-800/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-quantum-red" />
          <h4
            className="text-sm font-bold gold-gradient-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Spouse Compatibility
          </h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={spouseRadar} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(212,165,40,0.15)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#b8a07a", fontSize: 9 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                dataKey="value"
                stroke="#F43F5E"
                fill="#F43F5E"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-parchment-400 mt-2 leading-relaxed">
          {spouse.summary}
        </p>
      </div>
    </div>
  );
}
