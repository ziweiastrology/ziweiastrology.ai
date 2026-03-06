"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { getDeductionsForAge } from "@/data/verificationTemplates";
import type { Deduction, DeductionResponse } from "@/data/verificationTemplates";
import BirthDetailsForm from "@/components/BirthDetailsForm";
import { playCardConfirm, playCardDeny, playCardUnsure, playUnlockSuccess } from "@/lib/sounds";
import type { BirthDetails } from "@/types";

async function fireZWDSComputation(details: BirthDetails) {
  const { computeChart, generateChartDeductions } = await import("@/lib/zwds");
  const { palaces, meta, astrolabe } = await computeChart(details);

  const store = useMatrixStore.getState();
  store.setPalaces(palaces);
  store.setChartMeta(meta);
  store.setComputed(true);

  return { astrolabe, birthYear: parseInt(details.birthYear, 10) };
}

type Phase = "form" | "transitioning" | "verification" | "recalibrating" | "unlocking" | "birth_time_warning" | "done";

interface VerificationTimelineProps {
  onAllVerified?: () => void;
}

export default function VerificationTimeline({
  onAllVerified,
}: VerificationTimelineProps) {
  const {
    deductions,
    responses,
    allResponded,
    currentBatch,
    setBirthDetails,
    setDeductions,
    respondToDeduction,
    setAstrolabeRef,
    getVerificationResult,
  } = useVerificationStore();

  const [phase, setPhase] = useState<Phase>("form");

  const handleCalibrate = useCallback(
    async (details: BirthDetails) => {
      setBirthDetails(details);
      setPhase("transitioning");

      try {
        const { astrolabe, birthYear } = await fireZWDSComputation(details);
        setAstrolabeRef(astrolabe, birthYear);

        // Generate dynamic deductions from chart
        const { generateChartDeductions } = await import("@/lib/zwds");
        const dynamicDeductions = generateChartDeductions(astrolabe, birthYear, { batch: 0 });

        if (dynamicDeductions.length > 0) {
          setDeductions(dynamicDeductions);
        } else {
          // Fallback to static deductions if no events found
          const matched = getDeductionsForAge(details.birthYear);
          setDeductions(matched);
        }
      } catch (err) {
        console.error("[ZWDS] computation failed, using static deductions:", err);
        const matched = getDeductionsForAge(details.birthYear);
        setDeductions(matched);
      }

      setTimeout(() => setPhase("verification"), 600);
    },
    [setBirthDetails, setDeductions, setAstrolabeRef]
  );

  const handleRespond = useCallback(
    (id: string, response: DeductionResponse) => {
      if (response === "yes") playCardConfirm();
      else if (response === "no") playCardDeny();
      else playCardUnsure();
      respondToDeduction(id, response);
    },
    [respondToDeduction]
  );

  const handleReturnToForm = useCallback(() => {
    useVerificationStore.getState().reset();
    setPhase("form");
  }, []);

  // Watch for all responded -> determine next action
  useEffect(() => {
    if (!allResponded || phase !== "verification") return;

    const result = getVerificationResult();

    if (result === "verified") {
      const t = setTimeout(() => setPhase("unlocking"), 600);
      return () => clearTimeout(t);
    }

    if (result === "needs_retry") {
      // Transition to recalibrating, then load batch 2
      const t = setTimeout(async () => {
        setPhase("recalibrating");

        const { astrolabeRef, birthYearNum } = useVerificationStore.getState();
        if (astrolabeRef && birthYearNum) {
          try {
            const { generateChartDeductions } = await import("@/lib/zwds");
            const batch2 = generateChartDeductions(astrolabeRef, birthYearNum, { batch: 1 });

            if (batch2.length > 0) {
              useVerificationStore.getState().requestNextBatch();
              setDeductions(batch2);
            } else {
              // No more events — show warning
              setPhase("birth_time_warning");
              return;
            }
          } catch {
            setPhase("birth_time_warning");
            return;
          }
        }

        setTimeout(() => setPhase("verification"), 1200);
      }, 600);
      return () => clearTimeout(t);
    }

    if (result === "birth_time_suspect") {
      const t = setTimeout(() => setPhase("birth_time_warning"), 600);
      return () => clearTimeout(t);
    }
  }, [allResponded, phase, getVerificationResult, setDeductions]);

  // Unlock phase -> callback after animation, then dismiss overlay
  useEffect(() => {
    if (phase === "unlocking" && onAllVerified) {
      playUnlockSuccess();
      const t = setTimeout(() => {
        onAllVerified();
        setPhase("done");
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [phase, onAllVerified]);

  return (
    <section
      id="calibration"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050a1a 0%, #0a0e1a 100%)",
      }}
    >
      {/* Section header */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-600/40" />
          <span className="text-[10px] text-gold-400 tracking-[0.4em] uppercase font-mono">
            {phase === "recalibrating" ? "Recalibrating" : "Phase One"}
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-600/40" />
        </div>
        <h2
          className="text-3xl md:text-5xl font-bold mb-5"
          style={{
            fontFamily: "var(--font-cinzel)",
            background:
              "linear-gradient(135deg, #f0d47a 0%, #d4a528 40%, #b8891e 70%, #f0d47a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 15px rgba(212,165,40,0.2))",
          }}
        >
          {phase === "form" || phase === "transitioning"
            ? "Calibration Input"
            : phase === "recalibrating"
              ? "Recalibrating Engine"
              : phase === "birth_time_warning"
                ? "Calibration Alert"
                : "Verification Phase"}
        </h2>
        <p
          className="text-base max-w-xl mx-auto leading-relaxed"
          style={{
            fontFamily: "var(--font-merriweather)",
            color: "rgba(200,210,230,0.5)",
          }}
        >
          {phase === "form" || phase === "transitioning"
            ? "Enter your celestial coordinates to initialize the quantum probability engine."
            : phase === "recalibrating"
              ? "Adjusting parameters and generating secondary verification set..."
              : phase === "birth_time_warning"
                ? "The engine could not verify your birth time with sufficient confidence."
                : currentBatch === 1
                  ? "Secondary verification set generated. Please respond to recalibrate."
                  : "The engine has generated deductions from your natal coordinates. Respond to calibrate."}
        </p>
      </div>

      {/* Phase: Birth Details Form */}
      <AnimatePresence mode="wait">
        {(phase === "form" || phase === "transitioning") && (
          <motion.div
            key="form"
            className="relative z-10"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <BirthDetailsForm onCalibrate={handleCalibrate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: Recalibrating spinner */}
      <AnimatePresence>
        {phase === "recalibrating" && (
          <motion.div
            key="recalibrating"
            className="relative z-10 max-w-2xl mx-auto text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-3">
              <motion.div
                className="w-5 h-5 rounded-full border-2 border-gold-500/60 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-sm font-mono text-gold-400/70 tracking-wider">
                RECALIBRATING QUANTUM FIELD...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: Verification -- Deduction Cards */}
      <AnimatePresence>
        {phase === "verification" && (
          <motion.div
            key={`verification-${currentBatch}`}
            className="relative z-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-8">
              {deductions.map((deduction, index) => (
                <DeductionCard
                  key={deduction.id}
                  deduction={deduction}
                  index={index}
                  response={responses[deduction.id] ?? null}
                  onRespond={handleRespond}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: Birth Time Warning */}
      <AnimatePresence>
        {phase === "birth_time_warning" && (
          <motion.div
            key="warning"
            className="relative z-10 max-w-xl mx-auto text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded-sm border border-quantum-red/30 p-8"
              style={{ background: "rgba(180,40,40,0.06)" }}
            >
              <div className="text-3xl mb-4">⚠</div>
              <h3
                className="text-lg font-bold text-parchment-100 mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Birth Time Verification Inconclusive
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  fontFamily: "var(--font-merriweather)",
                  color: "rgba(200,210,230,0.5)",
                }}
              >
                The engine could not verify your chart with sufficient confidence. Please check
                the following and try again:
              </p>
              <ul
                className="text-sm text-left list-disc list-inside mb-6 space-y-2"
                style={{
                  fontFamily: "var(--font-merriweather)",
                  color: "rgba(200,210,230,0.6)",
                }}
              >
                <li>Is your <strong className="text-parchment-200">birth hour (时辰)</strong> correct? Even one hour off shifts your entire chart.</li>
                <li>Is your <strong className="text-parchment-200">birth location</strong> correct? Longitude affects the true solar time calculation.</li>
              </ul>
              <button
                onClick={handleReturnToForm}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]
                           text-celestial-900 rounded-sm cursor-pointer
                           transition-all duration-300
                           hover:shadow-[0_0_25px_rgba(212,165,40,0.35)]
                           active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #b8891e, #d4a528, #e6be4a)",
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Calibration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: Unlocking -- Ripple Animation */}
      <AnimatePresence>
        {phase === "unlocking" && <UnlockOverlay />}
      </AnimatePresence>
    </section>
  );
}

/* ============================================
   Deduction Card
   ============================================ */

const ICON_MAP: Record<string, string> = {
  career: "\u2318",
  relationship: "\u2661",
  health: "\u2725",
  wealth: "\u25C8",
  education: "\u2606",
  transition: "\u21BB",
};

function DeductionCard({
  deduction,
  index,
  response,
  onRespond,
}: {
  deduction: Deduction;
  index: number;
  response: DeductionResponse | null;
  onRespond: (id: string, response: DeductionResponse) => void;
}) {
  const borderClass =
    response === "yes"
      ? "border border-gold-500/60 shadow-[0_0_30px_rgba(212,165,40,0.15)]"
      : response === "no"
        ? "border border-quantum-red/30"
        : response === "unsure"
          ? "border border-parchment-500/30 shadow-[0_0_15px_rgba(200,210,230,0.05)]"
          : "border border-gold-700/20";

  const bgStyle =
    response === "yes"
      ? "linear-gradient(135deg, rgba(212,165,40,0.06), rgba(10,15,46,0.9))"
      : response === "no"
        ? "linear-gradient(135deg, rgba(180,40,40,0.04), rgba(10,15,46,0.9))"
        : response === "unsure"
          ? "linear-gradient(135deg, rgba(100,140,200,0.04), rgba(10,15,46,0.9))"
          : "rgba(10,15,46,0.7)";

  return (
    <motion.div
      className={`relative rounded-sm overflow-hidden transition-all duration-500 ${borderClass}`}
      style={{ background: bgStyle }}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: index * 0.3 }}
    >
      <div className="p-6 md:p-8">
        {/* Top label */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-gold-400/70 tracking-[0.3em] uppercase">
            [ENGINE DEDUCTION #{index + 1}]
          </span>
          <span className="text-[10px] font-mono text-parchment-500/40 tracking-wider">
            AGE {deduction.yearRange}
          </span>
        </div>

        <div className="flex items-start gap-5">
          {/* Confidence ring */}
          <div className="flex-shrink-0 relative w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              {/* Background track */}
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke="rgba(212,165,40,0.1)"
                strokeWidth="2"
              />
              {/* Confidence arc */}
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={response ? "rgba(212,165,40,0.8)" : "rgba(212,165,40,0.4)"}
                strokeWidth="2"
                strokeDasharray={`${(deduction.confidence / 100) * 175.93} 175.93`}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
                style={{ transition: "all 0.5s ease" }}
              />
              {/* Center text */}
              <text
                x="32" y="30"
                textAnchor="middle"
                fill="rgba(212,165,40,0.7)"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {deduction.confidence}
              </text>
              <text
                x="32" y="40"
                textAnchor="middle"
                fill="rgba(212,165,40,0.4)"
                fontSize="7"
                fontFamily="monospace"
              >
                %
              </text>
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gold-500/50 text-lg">{ICON_MAP[deduction.icon] || "\u2726"}</span>
              <h3
                className="text-base md:text-lg font-bold text-parchment-100 tracking-wide"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {deduction.title}
              </h3>
            </div>
            <p className="text-xs text-gold-500/50 mb-3 font-mono">{deduction.titleCn}</p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-merriweather)",
                color: "rgba(200,210,230,0.5)",
              }}
            >
              {deduction.description}
            </p>
          </div>
        </div>

        {/* Response buttons / Response badge */}
        <div className="mt-6 flex justify-end">
          {response === null ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onRespond(deduction.id, "yes")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em]
                           text-celestial-900 rounded-sm cursor-pointer
                           transition-all duration-300
                           hover:shadow-[0_0_25px_rgba(212,165,40,0.35),0_0_50px_rgba(212,165,40,0.15)]
                           active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #b8891e, #d4a528, #e6be4a)",
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Yes
              </button>
              <button
                onClick={() => onRespond(deduction.id, "no")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em]
                           rounded-sm cursor-pointer
                           border border-parchment-500/20 text-parchment-400/70
                           transition-all duration-300
                           hover:border-quantum-red/40 hover:text-quantum-red/80
                           active:scale-95"
                style={{ background: "rgba(10,15,46,0.5)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                No
              </button>
              <button
                onClick={() => onRespond(deduction.id, "unsure")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em]
                           rounded-sm cursor-pointer
                           border border-parchment-500/20 text-parchment-400/70
                           transition-all duration-300
                           hover:border-parchment-400/40 hover:text-parchment-300/80
                           active:scale-95"
                style={{ background: "rgba(10,15,46,0.5)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
                </svg>
                Unsure
              </button>
            </div>
          ) : (
            <ResponseBadge response={response} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   Response Badge
   ============================================ */

function ResponseBadge({ response }: { response: DeductionResponse }) {
  if (response === "yes") {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-gold-400 font-semibold tracking-wider">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        CONFIRMED
      </span>
    );
  }

  if (response === "no") {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider" style={{ color: "rgba(220,80,80,0.7)" }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        DENIED
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider" style={{ color: "rgba(150,180,220,0.7)" }}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
      </svg>
      UNCERTAIN
    </span>
  );
}

/* ============================================
   Unlock Overlay -- concentric ripple + gold text
   ============================================ */

function UnlockOverlay() {
  return (
    <motion.div
      key="unlock"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(2,5,16,0.95)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Concentric ripple rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: 80,
            height: 80,
            borderColor: `rgba(212,165,40,${0.5 - i * 0.1})`,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{
            duration: 2.2,
            delay: i * 0.35,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Central golden text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <h2
          className="text-2xl md:text-4xl font-bold tracking-[0.3em] uppercase"
          style={{
            fontFamily: "var(--font-cinzel)",
            background: "linear-gradient(135deg, #f0d47a, #d4a528, #f0d47a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(212,165,40,0.4))",
          }}
        >
          Quantum Field Unlocked
        </h2>
        <motion.p
          className="mt-3 text-xs font-mono tracking-[0.2em]"
          style={{ color: "rgba(0,220,130,0.7)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          [SYS] DESTINY MATRIX CALIBRATED ✓
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
