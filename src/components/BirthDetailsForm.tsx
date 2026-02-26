"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { BirthDetails } from "@/types";
import { findCity, getTopSuggestions, type CityEntry } from "@/data/cityLongitudes";
import { computeTrueSolarTime, formatOffsetForLog, type TSTResult } from "@/utils/solarTime";

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

const darkSelectStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 1rem",
  fontSize: "0.8125rem",
  color: "rgba(220,215,200,0.9)",
  backgroundColor: "rgba(10,15,46,0.6)",
  border: "1px solid rgba(212,165,40,0.2)",
  borderRadius: "2px",
  outline: "none",
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23d4a528' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.75rem center",
  transition: "all 0.3s ease",
  fontFamily: "var(--font-merriweather)",
};

type StatusPhase = "idle" | "scanning" | "logging" | "complete";

const STATUS_LINES_TEMPLATE = [
  "[SYS] FETCHING NATAL COORDINATES...",
  "[SYS] SYNCHRONIZING COSMIC CLOCK...",
  "[SYS] CONVERTING TO LUNAR CALENDAR: \u519C\u5386",
  // line 3 will be dynamic — solar offset
  "[SYS] 108 STELLAR PARAMETERS LOADED",
  "[SYS] NATAL CHART COORDINATES LOCKED \u2713",
];

export default function BirthDetailsForm({ onCalibrate }: BirthDetailsFormProps) {
  const [form, setForm] = useState<BirthDetails>(INITIAL);
  const [statusPhase, setStatusPhase] = useState<StatusPhase>("idle");
  const [visibleLogLines, setVisibleLogLines] = useState<string[]>([]);

  // City autocomplete state
  const [resolvedCity, setResolvedCity] = useState<CityEntry | null>(null);
  const [suggestions, setSuggestions] = useState<CityEntry[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locationWrapperRef = useRef<HTMLDivElement>(null);

  // TST result stored as ref to avoid re-triggering the phase effect
  const tstResultRef = useRef<TSTResult | null>(null);

  const update = useCallback(
    (field: keyof BirthDetails, value: string) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  // Debounced city search
  const handleLocationChange = useCallback((value: string) => {
    update("birthLocation", value);
    setResolvedCity(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const results = getTopSuggestions(value, 3);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 150);
  }, [update]);

  const selectCity = useCallback((city: CityEntry) => {
    setResolvedCity(city);
    setForm((prev) => ({ ...prev, birthLocation: city.name }));
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isValid =
    form.gender !== "" &&
    form.birthYear !== "" &&
    form.birthMonth !== "" &&
    form.birthDay !== "" &&
    form.birthHour !== "" &&
    form.birthMinute !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || statusPhase !== "idle") return;
    setStatusPhase("scanning");
  };

  // Phase machine: scanning (2.2s) → logging (~4.5s) → complete → callback
  useEffect(() => {
    if (statusPhase === "scanning") {
      const t = setTimeout(() => setStatusPhase("logging"), 2200);
      return () => clearTimeout(t);
    }
    if (statusPhase === "logging") {
      // Try to resolve city if not already resolved
      const city = resolvedCity || findCity(form.birthLocation);

      // Compute true solar time
      const h = parseInt(form.birthHour || "0", 10);
      const m = parseInt(form.birthMinute || "0", 10);
      const year = parseInt(form.birthYear || "2000", 10);
      const month = parseInt(form.birthMonth || "1", 10);
      const day = parseInt(form.birthDay || "1", 10);

      const tst = computeTrueSolarTime(h, m, year, month, day, city);
      tstResultRef.current = tst;

      const offsetStr = formatOffsetForLog(tst);
      const meridianNote = city ? ` (${city.name.toUpperCase()} MERIDIAN)` : "";

      const solarLine = `[SYS] CALIBRATING SOLAR TIME OFFSET ${offsetStr}${meridianNote}`;

      // TST comparison lines
      const clockTimeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const solarTimeStr = `${String(tst.trueSolarHour).padStart(2, "0")}:${String(tst.trueSolarMinute).padStart(2, "0")}`;

      const allLines = [
        STATUS_LINES_TEMPLATE[0],
        STATUS_LINES_TEMPLATE[1],
        STATUS_LINES_TEMPLATE[2],
        solarLine,
        STATUS_LINES_TEMPLATE[3],
        STATUS_LINES_TEMPLATE[4],
        "", // blank separator
        `CLOCK TIME       \u2192  ${clockTimeStr}`,
        `TRUE SOLAR TIME  \u2192  ${solarTimeStr}  (${offsetStr})`,
      ];

      let i = 0;
      setVisibleLogLines([]);
      const interval = setInterval(() => {
        i++;
        setVisibleLogLines(allLines.slice(0, i));
        if (i >= allLines.length) {
          clearInterval(interval);
          setTimeout(() => setStatusPhase("complete"), 800);
        }
      }, 650);
      return () => clearInterval(interval);
    }
    if (statusPhase === "complete") {
      const t = setTimeout(() => {
        // Enrich form with TST data before callback
        const enriched: BirthDetails = { ...form };
        const tst = tstResultRef.current;
        if (tst) {
          enriched.trueSolarHour = String(tst.trueSolarHour).padStart(2, "0");
          enriched.trueSolarMinute = String(tst.trueSolarMinute).padStart(2, "0");
          enriched.solarOffsetMinutes = tst.totalOffsetMinutes;
        }
        onCalibrate(enriched);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [statusPhase, form, onCalibrate, resolvedCity]);

  const isScanning = statusPhase === "scanning";
  const showLog = statusPhase === "logging" || statusPhase === "complete";

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
      {/* Outer ornamental frame — dark theme */}
      <div
        className="relative rounded-sm overflow-hidden transition-all duration-500
          bg-celestial-800/90 border border-gold-700/30
          shadow-[0_0_40px_rgba(0,0,0,0.4),inset_0_0_30px_rgba(212,165,40,0.03)]"
        style={
          isScanning
            ? { animation: "form-scan-glow 1s ease-in-out 2" }
            : undefined
        }
      >
        {/* Scanning beam overlay */}
        {isScanning && (
          <div className="absolute inset-x-0 z-30 h-[3px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(212,165,40,0.6), rgba(212,165,40,0.15), transparent)",
              boxShadow: "0 0 20px rgba(212,165,40,0.3), 0 0 40px rgba(212,165,40,0.15)",
              animation: "form-scan 2s ease-in-out 1 forwards",
            }}
          />
        )}

        {/* Form content — fades when logging */}
        <div className={`relative p-8 md:p-10 transition-opacity duration-500 ${
          showLog ? "opacity-[0.15] pointer-events-none" : isScanning ? "opacity-60" : ""
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-gold-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-[10px] text-gold-400 tracking-[0.3em] uppercase font-mono">
                NATAL COORDINATE INPUT
              </span>
              <svg className="w-4 h-4 text-gold-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <p
              className="text-xs text-parchment-400/60 leading-relaxed"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Provide your celestial coordinates for precise engine calibration.
            </p>
          </div>

          {/* Name field — optional */}
          <div className="mb-5">
            <label className="block text-[10px] text-gold-500/70 tracking-[0.2em] uppercase mb-1.5 font-mono">
              Full Name <span className="text-parchment-500/50 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="To personalize your reading"
              className="w-full px-4 py-2.5 text-sm text-parchment-200 bg-celestial-900/60 border border-gold-700/20
                         rounded-sm outline-none placeholder:text-parchment-600/40
                         focus:border-gold-500/40 focus:shadow-[0_0_12px_rgba(212,165,40,0.08)]
                         transition-all duration-300"
              style={{ fontFamily: "var(--font-merriweather)" }}
            />
          </div>

          {/* Gender toggle */}
          <div className="mb-5">
            <label className="block text-[10px] text-gold-500/70 tracking-[0.2em] uppercase mb-1.5 font-mono">
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
            <label className="block text-[10px] text-gold-500/70 tracking-[0.2em] uppercase mb-1.5 font-mono">
              Date of Birth <span className="text-quantum-red text-[8px]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={form.birthYear}
                onChange={(e) => update("birthYear", e.target.value)}
                style={darkSelectStyle}
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => 2010 - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                value={form.birthMonth}
                onChange={(e) => update("birthMonth", e.target.value)}
                style={darkSelectStyle}
              >
                <option value="">Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                ))}
              </select>

              <select
                value={form.birthDay}
                onChange={(e) => update("birthDay", e.target.value)}
                style={darkSelectStyle}
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
            <label className="block text-[10px] text-gold-500/70 tracking-[0.2em] uppercase mb-1.5 font-mono">
              Exact Time of Birth <span className="text-quantum-red text-[8px]">*</span>
              <span className="text-parchment-500/50 normal-case tracking-normal ml-1">(critical)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.birthHour}
                onChange={(e) => {
                  update("birthHour", e.target.value);
                  if (e.target.value && form.birthMinute === "") update("birthMinute", "00");
                }}
                style={darkSelectStyle}
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
                style={darkSelectStyle}
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

          {/* Birth Location — with city autocomplete */}
          <div className="mb-8">
            <label className="block text-[10px] text-gold-500/70 tracking-[0.2em] uppercase mb-1.5 font-mono">
              Birth Location
              <span className="text-parchment-500/50 normal-case tracking-normal ml-1">(for true solar time)</span>
            </label>
            <div className="relative" ref={locationWrapperRef}>
              <input
                type="text"
                value={form.birthLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0 && !resolvedCity) setShowSuggestions(true);
                }}
                placeholder="City name (e.g. Beijing, 北京)"
                className="w-full px-4 py-2.5 pr-10 text-sm text-parchment-200 bg-celestial-900/60 border border-gold-700/20
                           rounded-sm outline-none placeholder:text-parchment-600/40
                           focus:border-gold-500/40 focus:shadow-[0_0_12px_rgba(212,165,40,0.08)]
                           transition-all duration-300"
                style={{ fontFamily: "var(--font-merriweather)" }}
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-700/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

              {/* City suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-40 left-0 right-0 mt-1 border border-gold-700/30 rounded-sm overflow-hidden
                                bg-celestial-900/95 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                  {suggestions.map((city) => (
                    <button
                      key={`${city.name}-${city.longitude}`}
                      type="button"
                      onClick={() => selectCity(city)}
                      className="w-full px-4 py-2.5 text-left text-sm transition-colors duration-150
                                 hover:bg-gold-500/10 border-b border-gold-700/10 last:border-b-0 cursor-pointer"
                    >
                      <span className="text-parchment-200">{city.name}</span>
                      <span className="text-parchment-400/60 mx-1.5">({city.nameCn})</span>
                      <span className="text-gold-500/50 text-xs font-mono">
                        {city.longitude > 0 ? `${city.longitude.toFixed(1)}°E` : `${Math.abs(city.longitude).toFixed(1)}°W`}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resolved city confirmation */}
            {resolvedCity && (
              <div className="mt-2 flex items-center gap-1.5 animate-fade-in" style={{ animationDuration: "0.3s" }}>
                <span className="text-quantum-green text-xs">&#10003;</span>
                <span className="text-xs font-mono text-parchment-300/70">
                  {resolvedCity.name} ({resolvedCity.nameCn})
                  <span className="text-gold-500/50 ml-1.5">
                    {resolvedCity.longitude > 0
                      ? `${resolvedCity.longitude.toFixed(1)}°E`
                      : `${Math.abs(resolvedCity.longitude).toFixed(1)}°W`}
                  </span>
                  <span className="text-parchment-500/40 ml-1">
                    · Meridian {resolvedCity.standardMeridian > 0
                      ? `${resolvedCity.standardMeridian}°E`
                      : resolvedCity.standardMeridian === 0
                        ? "0° (GMT)"
                        : `${Math.abs(resolvedCity.standardMeridian)}°W`}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
          </div>

          {/* Submit button */}
          <div className="relative">
            {isValid && statusPhase === "idle" && (
              <div className="absolute -inset-3 bg-[radial-gradient(ellipse,rgba(212,165,40,0.08)_0%,transparent_70%)] animate-glow-pulse pointer-events-none" />
            )}

            <button
              type="submit"
              disabled={!isValid || statusPhase !== "idle"}
              className="group relative w-full py-4 text-sm font-semibold rounded-sm overflow-hidden
                         transition-all duration-400 ease-out
                         disabled:opacity-30 disabled:cursor-not-allowed
                         enabled:hover:shadow-[0_0_30px_rgba(212,165,40,0.35),0_0_60px_rgba(212,165,40,0.15)]
                         active:scale-[0.98] cursor-pointer"
              style={{
                background: isValid && statusPhase === "idle"
                  ? "linear-gradient(135deg, #8f6b17, #b8891e, #d4a528, #e6be4a, #d4a528, #b8891e, #8f6b17) 0 0 / 200% 100%"
                  : "linear-gradient(135deg, #1a1815, #252220, #1a1815) 0 0 / 200% 100%",
                color: isValid && statusPhase === "idle" ? "#020510" : "#4a4540",
              }}
            >
              <span className="relative z-10 tracking-[0.25em] uppercase">
                {isScanning ? "Calibrating..." : "Calibrate Timeline"}
              </span>
              {isValid && statusPhase === "idle" && (
                <span
                  className="absolute inset-y-0 w-[60px] pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "scan-sweep 5s ease-in-out infinite",
                  }}
                />
              )}
              <span className="absolute inset-0 rounded-sm border border-gold-300/30" />
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-[9px] text-parchment-500/40 text-center mt-4 leading-relaxed">
            Your birth data is processed locally for chart computation.
            <br />No personal data is stored or transmitted.
          </p>
        </div>

        {/* === Status Log Overlay === */}
        {showLog && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-2.5">
              {visibleLogLines.map((line, i) => (
                <div
                  key={i}
                  className="animate-fade-in"
                  style={{ animationDuration: "0.3s" }}
                >
                  {line === "" ? (
                    <div className="h-3" />
                  ) : line.startsWith("CLOCK TIME") || line.startsWith("TRUE SOLAR TIME") ? (
                    <span
                      className="text-xs font-mono tracking-wider"
                      style={{ color: "rgba(0,230,140,0.95)" }}
                    >
                      {line}
                    </span>
                  ) : (
                    <span
                      className="text-xs font-mono tracking-wider"
                      style={{ color: "rgba(0,220,130,0.85)" }}
                    >
                      {line}
                    </span>
                  )}
                </div>
              ))}
              {statusPhase === "logging" && (
                <span className="inline-block w-2 h-4 bg-quantum-green/70 animate-glow-pulse" />
              )}
            </div>
          </div>
        )}
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
   Gender Toggle Button — dark theme
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
          ? "border-gold-500/50 text-gold-300 shadow-[0_0_15px_rgba(212,165,40,0.1),inset_0_0_15px_rgba(212,165,40,0.05)]"
          : "border-gold-700/20 text-parchment-400/60 hover:border-gold-700/40 hover:text-parchment-300/70"
        }`}
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(212,165,40,0.12), rgba(212,165,40,0.04))"
          : "rgba(10,15,46,0.4)",
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
