"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMatrixStore } from "@/stores/useMatrixStore";

export default function CoreVoid() {
  const selectedPalaceId = useMatrixStore((s) => s.selectedPalaceId);
  const palaces = useMatrixStore((s) => s.palaces);

  const selected = palaces.find((p) => p.id === selectedPalaceId);

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        gridColumn: "2 / 4",
        gridRow: "2 / 4",
        background:
          "radial-gradient(ellipse at center, rgba(5,8,20,0.95) 0%, rgba(10,14,26,1) 100%)",
      }}
    >
      {/* Deep space ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.03) 0%, transparent 60%)",
        }}
      />

      <AnimatePresence mode="wait">
        {selected ? (
          /* === SELECTED STATE: Palace name with breathing glow === */
          <motion.div
            key={selected.id}
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="text-3xl md:text-4xl tracking-wider"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#FFD700",
              }}
              animate={{
                textShadow: [
                  "0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,215,0,0.2)",
                  "0 0 25px rgba(255,215,0,0.6), 0 0 50px rgba(255,215,0,0.3)",
                  "0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,215,0,0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {selected.nameCn}
            </motion.p>
            <p
              className="text-sm md:text-base mt-1 tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-heading)",
                color: "rgba(180,220,255,0.8)",
                textShadow: "0 0 10px rgba(100,180,255,0.2)",
              }}
            >
              {selected.name} Palace
            </p>
          </motion.div>
        ) : (
          /* === STANDBY STATE: Holographic Armillary Sphere === */
          <motion.div
            key="standby"
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Armillary Sphere SVG */}
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              {/* Outer ring — slow Y-axis rotation */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotateY: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full"
                  fill="none"
                >
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="54"
                    ry="54"
                    stroke="rgba(255,215,0,0.35)"
                    strokeWidth="0.6"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="54"
                    ry="20"
                    stroke="rgba(255,215,0,0.25)"
                    strokeWidth="0.5"
                  />
                </svg>
              </motion.div>

              {/* Middle ring — slow X-axis rotation */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotateX: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full"
                  fill="none"
                >
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="44"
                    ry="44"
                    stroke="rgba(255,215,0,0.3)"
                    strokeWidth="0.5"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="44"
                    ry="16"
                    stroke="rgba(255,215,0,0.2)"
                    strokeWidth="0.4"
                    transform="rotate(90 60 60)"
                  />
                </svg>
              </motion.div>

              {/* Inner ring — slow Z-axis rotation */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotateZ: -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full"
                  fill="none"
                >
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="32"
                    ry="32"
                    stroke="rgba(255,215,0,0.35)"
                    strokeWidth="0.5"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="32"
                    ry="12"
                    stroke="rgba(255,215,0,0.2)"
                    strokeWidth="0.4"
                    transform="rotate(60 60 60)"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="32"
                    ry="12"
                    stroke="rgba(255,215,0,0.2)"
                    strokeWidth="0.4"
                    transform="rotate(-60 60 60)"
                  />
                </svg>
              </motion.div>

              {/* Center core dot — breathing glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 60%, transparent 100%)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(255,215,0,0.3), 0 0 20px rgba(255,215,0,0.1)",
                    "0 0 15px rgba(255,215,0,0.5), 0 0 35px rgba(255,215,0,0.2)",
                    "0 0 8px rgba(255,215,0,0.3), 0 0 20px rgba(255,215,0,0.1)",
                  ],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Axis line */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full"
                fill="none"
              >
                <line
                  x1="60"
                  y1="4"
                  x2="60"
                  y2="116"
                  stroke="rgba(255,215,0,0.15)"
                  strokeWidth="0.4"
                />
              </svg>
            </div>

            {/* Standby text */}
            <motion.p
              className="mt-4 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(180,220,255,0.4)" }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              System Standby / Awaiting Input
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
