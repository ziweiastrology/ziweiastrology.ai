"use client";

import { useState } from "react";

/* ============================================
   Hexagram Data — 8 trigrams with binary values
   ============================================ */

interface Trigram {
  name: string;
  nameCn: string;
  symbol: string;
  binary: string;
  element: string;
  lines: (0 | 1)[];
}

const TRIGRAMS: Trigram[] = [
  { name: "Heaven", nameCn: "乾", symbol: "☰", binary: "111", element: "Force", lines: [1, 1, 1] },
  { name: "Earth", nameCn: "坤", symbol: "☷", binary: "000", element: "Field", lines: [0, 0, 0] },
  { name: "Water", nameCn: "坎", symbol: "☵", binary: "010", element: "Gorge", lines: [0, 1, 0] },
  { name: "Fire", nameCn: "離", symbol: "☲", binary: "101", element: "Radiance", lines: [1, 0, 1] },
  { name: "Thunder", nameCn: "震", symbol: "☳", binary: "001", element: "Shake", lines: [0, 0, 1] },
  { name: "Wind", nameCn: "巽", symbol: "☴", binary: "110", element: "Ground", lines: [1, 1, 0] },
  { name: "Mountain", nameCn: "艮", symbol: "☶", binary: "100", element: "Bound", lines: [1, 0, 0] },
  { name: "Lake", nameCn: "兌", symbol: "☱", binary: "011", element: "Open", lines: [0, 1, 1] },
];

/* ============================================
   Logic Gate Data — Zi Wei connection
   ============================================ */

interface LogicGate {
  gate: string;
  symbol: string;
  ziwei: string;
  ziweiCn: string;
  description: string;
}

const LOGIC_GATES: LogicGate[] = [
  {
    gate: "AND",
    symbol: "&",
    ziwei: "Both stars must be active for the palace to fire",
    ziweiCn: "双星同宫：两颗主星同时激活，宫位才「输出」",
    description: "Output is 1 only when both inputs are 1",
  },
  {
    gate: "OR",
    symbol: "≥1",
    ziwei: "Either star activates the palace influence",
    ziweiCn: "对宫借星：任一来源的星曜即可激活宫位",
    description: "Output is 1 when at least one input is 1",
  },
  {
    gate: "NOT",
    symbol: "¬",
    ziwei: "化忌 (Ji) inverts a star's positive output",
    ziweiCn: "化忌反转：将星曜的正向输出反转为阻力",
    description: "Output is the inverse of the input",
  },
  {
    gate: "XOR",
    symbol: "⊕",
    ziwei: "Conflicting stars create an either/or outcome",
    ziweiCn: "星曜冲突：对冲星曜产生「非此即彼」的结果",
    description: "Output is 1 only when inputs differ",
  },
];

/* ============================================
   Main Component
   ============================================ */

export default function BinaryAncestry() {
  const [activeTrigram, setActiveTrigram] = useState<Trigram | null>(null);
  const [activeGate, setActiveGate] = useState<LogicGate | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-24">
      {/* === Section 1: The Hook — Yin/Yang = 0/1 === */}
      <div>
        <div className="text-center mb-12">
          <p
            className="text-lg md:text-xl text-parchment-800 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            &ldquo;The digital world is built on 1s and 0s.
            <br />
            <span className="text-gold-700">
              Ancient sages called them Yang and Yin.&rdquo;
            </span>
          </p>
        </div>

        {/* Binary duality cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Yang = 1 */}
          <div className="etched-frame rounded-sm p-8 text-center group transition-all duration-500 hover:border-gold-600/30">
            <div
              className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px rgba(212,165,40,0.08)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-center gap-6 mb-4">
                {/* Yang line — solid */}
                <div className="w-16 h-1.5 bg-gold-600 rounded-full" />
                <span className="text-4xl font-bold text-gold-700 font-mono">1</span>
              </div>
              <h4
                className="text-2xl gold-gradient-text font-bold mb-1"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                阳 Yang
              </h4>
              <p className="text-xs text-parchment-600 tracking-[0.15em] uppercase mb-4">
                Existence · Energy · Expansion · Active State
              </p>
              <p
                className="text-sm text-parchment-700 leading-[1.8]"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                The unbroken line. In binary, the bit is ON.
                In the cosmos, energy is present, the circuit is closed,
                the signal fires.
              </p>
            </div>
          </div>

          {/* Yin = 0 */}
          <div className="etched-frame rounded-sm p-8 text-center group transition-all duration-500 hover:border-celestial-400/30">
            <div
              className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px rgba(74,95,194,0.08)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-center gap-6 mb-4">
                {/* Yin line — broken */}
                <div className="flex gap-2">
                  <div className="w-7 h-1.5 bg-celestial-400 rounded-full" />
                  <div className="w-7 h-1.5 bg-celestial-400 rounded-full" />
                </div>
                <span className="text-4xl font-bold text-celestial-400 font-mono">0</span>
              </div>
              <h4
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cinzel)", color: "#4a5fc2" }}
              >
                阴 Yin
              </h4>
              <p className="text-xs text-parchment-600 tracking-[0.15em] uppercase mb-4">
                Void · Potential · Contraction · Receptive State
              </p>
              <p
                className="text-sm text-parchment-700 leading-[1.8]"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                The broken line. In binary, the bit is OFF.
                In the cosmos, space awaits filling, the circuit is open,
                the signal rests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === Section 2: The Leibniz Narrative === */}
      <div>
        <div className="etched-frame rounded-sm p-8 md:p-10 max-w-3xl mx-auto relative">
          {/* Corner ornaments */}
          <svg className="absolute top-3 left-3 w-4 h-4 opacity-20 text-gold-600" viewBox="0 0 16 16">
            <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          <svg className="absolute bottom-3 right-3 w-4 h-4 opacity-20 text-gold-600" viewBox="0 0 16 16">
            <path d="M16 8v8H8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </svg>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-xs text-gold-600/50 font-mono">§</span>
            <h4
              className="text-lg gold-gradient-text font-bold"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              The Leibniz Discovery
            </h4>
          </div>
          <div className="h-px bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent mb-6" />

          <div className="space-y-4">
            <p
              className="text-sm text-parchment-800 leading-[1.9]"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              In 1703, Gottfried Wilhelm Leibniz — the father of modern binary arithmetic —
              published <em>Explication de l&apos;Arithm&eacute;tique Binaire</em>.
              What few people know is that his eureka moment was triggered by the
              I Ching hexagrams sent to him by the Jesuit missionary Joachim Bouvet from Beijing.
            </p>
            <p
              className="text-sm text-parchment-700 leading-[1.9]"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Leibniz had already intuited binary logic, but it was the 64 hexagrams —
              each a six-bit sequence of broken (阴) and unbroken (阳) lines — that
              confirmed his theory mapped onto a system{" "}
              <span className="text-gold-700 font-semibold">
                three thousand years older than silicon.
              </span>
            </p>
            <p
              className="text-sm text-parchment-600 leading-[1.9] italic"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              The civilization that invented the transistor owes its deepest logic
              to the same civilization that mapped the North Star.
            </p>
          </div>

          {/* Citation */}
          <div className="mt-6 pt-4 border-t border-gold-700/10">
            <p className="text-[10px] text-parchment-500 tracking-wide">
              Leibniz, G.W. (1703). &ldquo;Explication de l&apos;Arithm&eacute;tique Binaire.&rdquo;{" "}
              <em>M&eacute;moires de l&apos;Acad&eacute;mie Royale des Sciences</em>, Paris.
              — See also: Bouvet&apos;s correspondence, 1701.
            </p>
          </div>
        </div>
      </div>

      {/* === Section 3: Interactive Trigram → Binary === */}
      <div>
        <div className="text-center mb-10">
          <h4
            className="text-lg gold-gradient-text font-bold mb-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Eight Trigrams as 3-Bit Registers
          </h4>
          <p
            className="text-sm text-parchment-600 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Each trigram is a 3-line binary word. Two trigrams stack to form a 6-bit hexagram —
            exactly 2⁶ = 64 possible states.
          </p>
        </div>

        {/* Trigram grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {TRIGRAMS.map((t) => {
            const isActive = activeTrigram?.nameCn === t.nameCn;
            return (
              <button
                key={t.nameCn}
                onClick={() => setActiveTrigram(isActive ? null : t)}
                className={`etched-frame rounded-sm p-5 text-center transition-all duration-300 cursor-pointer
                  ${isActive ? "border-gold-600/40" : "hover:border-gold-600/20"}`}
              >
                {/* Trigram lines */}
                <div className="flex flex-col items-center gap-1.5 mb-3">
                  {[...t.lines].reverse().map((line, i) => (
                    <div key={i} className="flex gap-1">
                      {line === 1 ? (
                        <div className="w-10 h-[3px] bg-gold-600 rounded-full" />
                      ) : (
                        <>
                          <div className="w-4 h-[3px] bg-celestial-400 rounded-full" />
                          <div className="w-4 h-[3px] bg-celestial-400 rounded-full" />
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Name */}
                <span className="text-xl font-bold text-parchment-800 block" style={{ fontFamily: "var(--font-serif)" }}>
                  {t.nameCn}
                </span>
                <span className="text-[10px] text-parchment-500 tracking-wider uppercase">
                  {t.name}
                </span>

                {/* Binary value */}
                <div className="mt-2 flex items-center justify-center gap-1">
                  {t.binary.split("").map((bit, i) => (
                    <span
                      key={i}
                      className={`text-sm font-mono font-bold ${
                        bit === "1" ? "text-gold-600" : "text-celestial-400"
                      }`}
                    >
                      {bit}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active trigram detail */}
        {activeTrigram && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="etched-frame rounded-sm p-6 flex items-center gap-6">
              <div className="text-4xl flex-shrink-0" style={{ color: "#8f6b17" }}>
                {activeTrigram.symbol}
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-parchment-800" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {activeTrigram.nameCn} · {activeTrigram.name}
                  </span>
                  <span className="text-xs text-parchment-500">({activeTrigram.element})</span>
                </div>
                <p className="text-sm text-parchment-700" style={{ fontFamily: "var(--font-merriweather)" }}>
                  Binary register:{" "}
                  <span className="font-mono font-bold text-gold-700">{activeTrigram.binary}</span>
                  {" "}= decimal{" "}
                  <span className="font-mono font-bold text-gold-700">{parseInt(activeTrigram.binary, 2)}</span>.
                  {" "}Each line is a bit — unbroken (阳) = 1, broken (阴) = 0.
                  Reading bottom to top mirrors least-significant to most-significant bit.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === Section 4: Logic Gates → Zi Wei Dou Shu === */}
      <div>
        <div className="text-center mb-10">
          <h4
            className="text-lg gold-gradient-text font-bold mb-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Pre-Silicon Logic Gates
          </h4>
          <p
            className="text-sm text-parchment-600 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Every palace calculation in Zi Wei Dou Shu is, at its core, a logic-gate operation.
            Stars are inputs. The palace is the gate. Your destiny is the output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {LOGIC_GATES.map((g) => {
            const isActive = activeGate?.gate === g.gate;
            return (
              <button
                key={g.gate}
                onClick={() => setActiveGate(isActive ? null : g)}
                className={`etched-frame rounded-sm p-6 text-left transition-all duration-300 cursor-pointer group
                  ${isActive ? "border-gold-600/40" : "hover:border-gold-600/20"}`}
              >
                <div
                  className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px rgba(212,165,40,0.06)" }}
                />
                <div className="relative">
                  {/* Gate header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold text-gold-700"
                      style={{
                        background: "radial-gradient(circle, rgba(212,165,40,0.1) 0%, transparent 70%)",
                      }}
                    >
                      {g.symbol}
                    </span>
                    <div>
                      <span
                        className="text-base font-bold text-parchment-800 block"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {g.gate} Gate
                      </span>
                      <span className="text-[10px] text-parchment-500 tracking-wider">
                        {g.description}
                      </span>
                    </div>
                  </div>

                  {/* Zi Wei mapping */}
                  <div className="h-px bg-gradient-to-r from-gold-500/20 to-transparent mb-3" />
                  <p
                    className="text-xs text-gold-700 leading-[1.8] mb-1"
                    style={{ fontFamily: "var(--font-merriweather)" }}
                  >
                    {g.ziwei}
                  </p>

                  {isActive && (
                    <p className="text-xs text-parchment-600 leading-[1.8] mt-2 animate-fade-in" style={{ fontFamily: "var(--font-serif)" }}>
                      {g.ziweiCn}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="text-center mt-14 max-w-2xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mb-8" />
          <p
            className="text-sm text-parchment-700 leading-[1.9] italic"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            You are not &ldquo;having your fortune told.&rdquo;
            {" "}You are running humanity&apos;s oldest open-source code —
            a multi-dimensional binary game-theory engine that predates
            every chip in Silicon Valley by three millennia.
          </p>
          <p className="text-xs text-parchment-500 mt-4 tracking-[0.15em] uppercase">
            从阴阳到比特 · From Yin-Yang to Bits
          </p>
        </div>
      </div>
    </div>
  );
}
