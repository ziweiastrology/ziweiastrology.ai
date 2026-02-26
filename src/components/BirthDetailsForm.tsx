"use client";

import { useState, useCallback } from "react";
import type { BirthDetails } from "@/types";

interface BirthDetailsFormProps {
  onCalibrate: (details: BirthDetails) => void;
}

const INITIAL: BirthDetails = {
  fullName: "",
  gender: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  birthHour: "",
  birthMinute: "",
  birthLocation: "",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 1rem",
  fontSize: "0.8125rem",
  color: "#0a0f2e",
  backgroundColor: "rgba(242, 236, 226, 0.5)",
  border: "1px solid rgba(216, 204, 180, 0.3)",
  borderRadius: "2px",
  outline: "none",
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%238c7e6b' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.75rem center",
  transition: "all 0.3s ease",
  fontFamily: "var(--font-merriweather)",
};

export default function BirthDetailsForm({ onCalibrate }: BirthDetailsFormProps) {
  const [form, setForm] = useState<BirthDetails>(INITIAL);
  const [scanning, setScanning] = useState(false);

  const update = useCallback(
    (field: keyof BirthDetails, value: string) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const isValid =
    form.gender !== "" &&
    form.birthYear !== "" &&
    form.birthMonth !== "" &&
    form.birthDay !== "" &&
    form.birthHour !== "" &&
    form.birthMinute !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setScanning(true);
    // Scanning animation plays for 2s, then transition
    setTimeout(() => {
      onCalibrate(form);
    }, 2200);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
      {/* Outer ornamental frame */}
      <div
        className={`relative etched-frame rounded-sm overflow-hidden transition-all duration-500
          ${scanning ? "" : ""}`}
        style={
          scanning
            ? { animation: "form-scan-glow 1s ease-in-out 2" }
            : undefined
        }
      >
        {/* Scanning beam overlay */}
        {scanning && (
          <div className="absolute inset-x-0 z-30 h-[3px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(212,165,40,0.6), rgba(212,165,40,0.15), transparent)",
              boxShadow: "0 0 20px rgba(212,165,40,0.3), 0 0 40px rgba(212,165,40,0.15)",
              animation: "form-scan 2s ease-in-out 1 forwards",
            }}
          />
        )}

        {/* Form content */}
        <div className={`relative p-8 md:p-10 transition-opacity duration-300 ${scanning ? "opacity-60" : ""}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-gold-600/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-[10px] text-gold-700 tracking-[0.3em] uppercase">
                Birth Parameters
              </span>
              <svg className="w-4 h-4 text-gold-600/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <p
              className="text-xs text-parchment-600 leading-relaxed"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Provide your celestial coordinates for precise engine calibration.
            </p>
          </div>

          {/* Name field — optional */}
          <div className="mb-5">
            <label className="block text-[10px] text-gold-700/70 tracking-[0.2em] uppercase mb-1.5">
              Full Name <span className="text-parchment-500 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="To personalize your reading"
              className="w-full px-4 py-2.5 text-sm text-celestial-800 bg-parchment-200/50 border border-parchment-400/30
                         rounded-sm outline-none placeholder:text-parchment-400
                         focus:border-gold-500/40 focus:shadow-[0_0_12px_rgba(212,165,40,0.08)]
                         transition-all duration-300"
              style={{ fontFamily: "var(--font-merriweather)" }}
            />
          </div>

          {/* Gender toggle */}
          <div className="mb-5">
            <label className="block text-[10px] text-gold-700/70 tracking-[0.2em] uppercase mb-1.5">
              Gender <span className="text-quantum-red text-[8px]">*</span>
            </label>
            <div className="flex gap-3">
              <GenderButton
                label="Male"
                symbol="♂"
                active={form.gender === "male"}
                onClick={() => update("gender", "male")}
              />
              <GenderButton
                label="Female"
                symbol="♀"
                active={form.gender === "female"}
                onClick={() => update("gender", "female")}
              />
            </div>
          </div>

          {/* Date of Birth — 3 columns */}
          <div className="mb-5">
            <label className="block text-[10px] text-gold-700/70 tracking-[0.2em] uppercase mb-1.5">
              Date of Birth <span className="text-quantum-red text-[8px]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* Year */}
              <select
                value={form.birthYear}
                onChange={(e) => update("birthYear", e.target.value)}
                className="select-field"
                style={selectStyle}
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => 2010 - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              {/* Month */}
              <select
                value={form.birthMonth}
                onChange={(e) => update("birthMonth", e.target.value)}
                className="select-field"
                style={selectStyle}
              >
                <option value="">Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                ))}
              </select>

              {/* Day */}
              <select
                value={form.birthDay}
                onChange={(e) => update("birthDay", e.target.value)}
                className="select-field"
                style={selectStyle}
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d).padStart(2, "0")}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time of Birth — 2 columns */}
          <div className="mb-5">
            <label className="block text-[10px] text-gold-700/70 tracking-[0.2em] uppercase mb-1.5">
              Exact Time of Birth <span className="text-quantum-red text-[8px]">*</span>
              <span className="text-parchment-500 normal-case tracking-normal ml-1">(critical)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.birthHour}
                onChange={(e) => update("birthHour", e.target.value)}
                className="select-field"
                style={selectStyle}
              >
                <option value="">Hour</option>
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={String(h).padStart(2, "0")}>
                    {String(h).padStart(2, "0")}:00 {h < 12 ? "AM" : "PM"}
                  </option>
                ))}
              </select>
              <select
                value={form.birthMinute}
                onChange={(e) => update("birthMinute", e.target.value)}
                className="select-field"
                style={selectStyle}
              >
                <option value="">Minute</option>
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <option key={m} value={String(m).padStart(2, "0")}>
                    :{String(m).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth Location */}
          <div className="mb-8">
            <label className="block text-[10px] text-gold-700/70 tracking-[0.2em] uppercase mb-1.5">
              Birth Location
              <span className="text-parchment-500 normal-case tracking-normal ml-1">(for timezone offset)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.birthLocation}
                onChange={(e) => update("birthLocation", e.target.value)}
                placeholder="City, Country"
                className="w-full px-4 py-2.5 pr-10 text-sm text-celestial-800 bg-parchment-200/50 border border-parchment-400/30
                           rounded-sm outline-none placeholder:text-parchment-400
                           focus:border-gold-500/40 focus:shadow-[0_0_12px_rgba(212,165,40,0.08)]
                           transition-all duration-300"
                style={{ fontFamily: "var(--font-merriweather)" }}
              />
              {/* Search icon */}
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-parchment-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
          </div>

          {/* Submit button */}
          <div className="relative">
            {/* Glow halo */}
            {isValid && !scanning && (
              <div className="absolute -inset-3 bg-[radial-gradient(ellipse,rgba(212,165,40,0.08)_0%,transparent_70%)] animate-glow-pulse pointer-events-none" />
            )}

            <button
              type="submit"
              disabled={!isValid || scanning}
              className="group relative w-full py-4 text-sm font-semibold rounded-sm overflow-hidden
                         transition-all duration-400 ease-out
                         disabled:opacity-40 disabled:cursor-not-allowed
                         enabled:hover:shadow-[0_0_30px_rgba(212,165,40,0.35),0_0_60px_rgba(212,165,40,0.15)]
                         active:scale-[0.98]"
              style={{
                background: isValid
                  ? "linear-gradient(135deg, #8f6b17, #b8891e, #d4a528, #e6be4a, #d4a528, #b8891e, #8f6b17)"
                  : "linear-gradient(135deg, #8c7e6b, #a89982, #8c7e6b)",
                backgroundSize: "200% 100%",
                color: isValid ? "#020510" : "#6b6050",
              }}
            >
              <span className="relative z-10 tracking-[0.25em] uppercase">
                {scanning ? "Calibrating..." : "Calibrate Timeline"}
              </span>
              {/* Scanning light on button */}
              {isValid && !scanning && (
                <span
                  className="absolute inset-y-0 w-[60px] pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "scan-sweep 5s ease-in-out infinite",
                  }}
                />
              )}
              {/* Border glow */}
              <span className="absolute inset-0 rounded-sm border border-gold-300/30" />
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-[9px] text-parchment-500 text-center mt-4 leading-relaxed">
            Your birth data is processed locally for chart computation.
            <br />No personal data is stored or transmitted.
          </p>
        </div>
      </div>

      {/* Corner ornaments on the outer frame */}
      <FrameCorner position="top-left" />
      <FrameCorner position="top-right" />
      <FrameCorner position="bottom-left" />
      <FrameCorner position="bottom-right" />
    </form>
  );
}

/* ============================================
   Gender Toggle Button
   ============================================ */

function GenderButton({
  label,
  symbol,
  active,
  onClick,
}: {
  label: string;
  symbol: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2.5 rounded-sm text-sm font-medium transition-all duration-300 border
        ${active
          ? "border-gold-500/50 text-gold-800 shadow-[0_0_15px_rgba(212,165,40,0.1),inset_0_0_15px_rgba(212,165,40,0.05)]"
          : "border-parchment-400/30 text-parchment-600 hover:border-parchment-400/50 hover:text-parchment-700"
        }`}
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(212,165,40,0.08), rgba(212,165,40,0.03))"
          : "rgba(242,236,226,0.3)",
      }}
    >
      <span className="mr-1.5 text-base">{symbol}</span>
      {label}
    </button>
  );
}

/* ============================================
   Frame Corner Ornament
   ============================================ */

function FrameCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const pos: Record<string, string> = {
    "top-left": "absolute -top-1 -left-1",
    "top-right": "absolute -top-1 -right-1 scale-x-[-1]",
    "bottom-left": "absolute -bottom-1 -left-1 scale-y-[-1]",
    "bottom-right": "absolute -bottom-1 -right-1 scale-x-[-1] scale-y-[-1]",
  };

  return (
    <svg className={`w-6 h-6 ${pos[position]}`} viewBox="0 0 24 24">
      <path d="M0 12V0h12" fill="none" stroke="rgba(212,165,40,0.3)" strokeWidth="0.8" />
      <path d="M0 7V0h7" fill="none" stroke="rgba(212,165,40,0.15)" strokeWidth="0.4" />
      <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(212,165,40,0.25)" />
    </svg>
  );
}
