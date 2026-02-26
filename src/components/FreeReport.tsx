"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import type { PalaceDetail } from "@/types";

/* ─── Helpers ─── */

function getTopPalaces(palaces: PalaceDetail[], n: number) {
  return [...palaces].sort((a, b) => b.energy - a.energy).slice(0, n);
}

function getStatesPalaces(palaces: PalaceDetail[]) {
  const map: Record<"lu" | "quan" | "ke" | "ji", PalaceDetail | null> = {
    lu: null,
    quan: null,
    ke: null,
    ji: null,
  };
  for (const p of palaces) {
    if (p.state !== "neutral" && map[p.state] === null) {
      map[p.state] = p;
    }
  }
  return map;
}

const STATE_META: Record<
  "lu" | "quan" | "ke" | "ji",
  { label: string; labelCn: string; color: string; icon: string }
> = {
  lu: { label: "Lu", labelCn: "禄", color: "text-quantum-green", icon: "▲" },
  quan: { label: "Quan", labelCn: "权", color: "text-quantum-orange", icon: "◆" },
  ke: { label: "Ke", labelCn: "科", color: "text-quantum-cyan", icon: "●" },
  ji: { label: "Ji", labelCn: "忌", color: "text-quantum-red", icon: "✦" },
};

function buildInsightNarrative(
  deductions: { id: string; title: string; description: string }[],
  responses: Record<string, string>
) {
  const confirmed = deductions.filter((d) => responses[d.id] === "yes");
  if (confirmed.length === 0) {
    return "Your calibration data reveals a distinctive life-path signature. The convergence of your palace energies and confirmed life events indicates a pattern of sovereign decision-making that few charts display with such clarity.";
  }
  if (confirmed.length === 1) {
    return `Your confirmed pattern \u2014 "${confirmed[0].title}" \u2014 anchors a distinctive life-path signature. ${confirmed[0].description.slice(0, 120)}... This resonance ripples through your entire 12-palace matrix, creating a unique sovereign frequency.`;
  }
  return `Two confirmed patterns converge in your chart: "${confirmed[0].title}" and "${confirmed[1].title}." ${confirmed[0].description.slice(0, 100)}... Combined with ${confirmed[1].description.slice(0, 100).toLowerCase()}... This dual resonance is rare \u2014 it suggests a life-path operating on multiple frequencies simultaneously.`;
}

/* ─── Energy Ring SVG ─── */

function EnergyRing({ energy, size = 72 }: { energy: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (energy / 100) * circumference;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(212,165,40,0.1)"
        strokeWidth="3"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(212,165,40,0.7)"
        strokeWidth="3"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text
        x={size / 2}
        y={size / 2 - 4}
        textAnchor="middle"
        fill="rgba(212,165,40,0.9)"
        fontSize="14"
        fontWeight="bold"
      >
        {energy}%
      </text>
      <text
        x={size / 2}
        y={size / 2 + 10}
        textAnchor="middle"
        fill="rgba(212,165,40,0.5)"
        fontSize="8"
      >
        ENERGY
      </text>
    </svg>
  );
}

/* ─── State Badge ─── */

function StateBadge({ state }: { state: "lu" | "quan" | "ke" | "ji" }) {
  const meta = STATE_META[state];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border ${meta.color}`}
      style={{
        borderColor: "currentColor",
        opacity: 0.8,
      }}
    >
      {meta.icon} {meta.labelCn} {meta.label}
    </span>
  );
}

/* ─── Main Component ─── */

export default function FreeReport() {
  const isUnlocked = useDashboardStore((s) => s.isUnlocked);
  const palaces = useMatrixStore((s) => s.palaces);
  const birthDetails = useVerificationStore((s) => s.birthDetails);
  const deductions = useVerificationStore((s) => s.deductions);
  const responses = useVerificationStore((s) => s.responses);

  const topPalaces = useMemo(() => getTopPalaces(palaces, 3), [palaces]);
  const statesPalaces = useMemo(() => getStatesPalaces(palaces), [palaces]);
  const narrative = useMemo(
    () => buildInsightNarrative(deductions, responses),
    [deductions, responses]
  );
  const remainingPalaces = useMemo(() => {
    const topIds = new Set(topPalaces.map((p) => p.id));
    return palaces.filter((p) => !topIds.has(p.id));
  }, [palaces, topPalaces]);

  // Build user display info
  const displayName = birthDetails?.fullName || "Calibrant";
  const displayMonth = birthDetails?.birthMonth
    ? new Date(2000, parseInt(birthDetails.birthMonth) - 1).toLocaleString("en", { month: "long" })
    : "";
  const displayYear = birthDetails?.birthYear || "";
  const displayGender = birthDetails?.gender
    ? birthDetails.gender.charAt(0).toUpperCase() + birthDetails.gender.slice(1)
    : "";
  const userSummary = [displayName, displayMonth && displayYear ? `${displayMonth} ${displayYear}` : "", displayGender]
    .filter(Boolean)
    .join(" · ");

  // WhatsApp / Telegram pre-filled text
  const contactText = encodeURIComponent(
    `Hi, I'm ${displayName}. Born ${displayMonth} ${displayYear}. I'd like my full 12-palace Sovereign Reading.`
  );

  if (!isUnlocked) return null;

  return (
    <section className="relative py-20 px-4 sm:px-6 celestial-bg overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ─── 1A: Report Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-green/80 border border-quantum-green/30 rounded-sm">
            [REPORT GENERATED]
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold gold-gradient-text"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Your Sovereign Life-Path Report
          </h2>
          <p className="text-gold-300/60 text-sm tracking-widest font-mono">
            {userSummary}
          </p>
        </motion.div>

        {/* ─── 1B: Top 3 Palace Cards ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
            TOP 3 PALACE ENERGIES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topPalaces.map((palace, i) => (
              <motion.div
                key={palace.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="relative p-5 rounded-lg border border-gold-700/30 bg-celestial-900/60 backdrop-blur-sm hover:border-gold-500/50 transition-colors duration-300"
              >
                {/* Palace name */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3
                      className="text-base font-semibold text-gold-300"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {palace.nameCn} {palace.name}
                    </h3>
                    <p className="text-[11px] text-gold-500/50 font-mono mt-0.5">
                      {palace.subtitle}
                    </p>
                  </div>
                  {palace.state !== "neutral" && (
                    <StateBadge state={palace.state} />
                  )}
                </div>

                {/* Energy ring */}
                <div className="w-20 h-20 mx-auto my-3">
                  <EnergyRing energy={palace.energy} />
                </div>

                {/* Consciousness excerpt */}
                <p className="text-xs text-parchment-400/70 leading-relaxed mt-3">
                  {palace.consciousness.slice(0, 100)}
                  {palace.consciousness.length > 100 ? "..." : ""}
                </p>

                {/* Stars */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {palace.stars.map((star) => (
                    <span
                      key={star}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gold-700/10 text-gold-500/50 tracking-wider"
                    >
                      {star}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── 1C: Four States Summary ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
            FOUR TRANSFORMERS · 四化
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["lu", "quan", "ke", "ji"] as const).map((key) => {
              const meta = STATE_META[key];
              const palace = statesPalaces[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gold-700/20 bg-celestial-900/40"
                >
                  <span className={`text-lg ${meta.color}`}>{meta.icon}</span>
                  <div>
                    <p className={`text-xs font-semibold ${meta.color}`}>
                      {meta.labelCn} {meta.label}
                    </p>
                    <p className="text-[10px] text-gold-500/50 font-mono">
                      {palace ? `${palace.nameCn}宫 ${palace.name}` : "—"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── 1D: Life Pattern Insight ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative p-6 rounded-lg border border-gold-700/20 bg-celestial-900/40"
        >
          <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-cyan/70 border border-quantum-cyan/20 rounded-sm mb-4">
            [PATTERN ANALYSIS]
          </span>
          <p className="text-sm text-parchment-300/80 leading-relaxed">
            {narrative}
          </p>
        </motion.div>

        {/* ─── 1E: Blurred Teaser ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500/50 mb-4">
            REMAINING PALACES
          </p>
          <div className="relative rounded-lg border border-gold-700/20 overflow-hidden">
            {/* Blurred grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 p-5 blur-[6px] select-none pointer-events-none">
              {remainingPalaces.map((palace) => (
                <div
                  key={palace.id}
                  className="p-3 rounded border border-gold-700/20 bg-celestial-900/40"
                >
                  <p className="text-xs font-semibold text-gold-400">
                    {palace.nameCn} {palace.name}
                  </p>
                  <p className="text-[10px] text-gold-500/40 mt-1">
                    Energy: {palace.energy}%
                  </p>
                  <p className="text-[10px] text-parchment-400/50 mt-1">
                    {palace.consciousness.slice(0, 60)}...
                  </p>
                </div>
              ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-celestial-900/60 backdrop-blur-[2px]">
              <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center mb-3">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-gold-500/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <p
                className="text-sm font-semibold text-gold-300/80"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {remainingPalaces.length} additional palaces analyzed
              </p>
              <p className="text-xs text-gold-500/50 mt-1 font-mono">
                Full reading available below
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── 1F: Contact Collection CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative text-center p-8 sm:p-12 rounded-xl border border-gold-500/30 bg-gradient-to-b from-celestial-900/80 to-celestial-800/40"
        >
          {/* Corner glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

          <h3
            className="text-2xl sm:text-3xl font-bold gold-gradient-text mb-3"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Unlock Your Full Sovereign Reading
          </h3>
          <p className="text-sm text-parchment-400/70 max-w-md mx-auto mb-8">
            Connect with your personal Life Strategist for a complete 12-palace analysis,
            decade-by-decade forecast, and personalized action plan.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/YOUR_NUMBER?text=${contactText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "#fff",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
              <span className="text-white/60 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/YOUR_HANDLE`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                background: "linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)",
                color: "#fff",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>Telegram</span>
              <span className="text-white/60 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>

          <p className="text-[10px] text-gold-700/40 font-mono tracking-wider">
            Your calibration data will be securely transmitted
          </p>
        </motion.div>
      </div>
    </section>
  );
}
