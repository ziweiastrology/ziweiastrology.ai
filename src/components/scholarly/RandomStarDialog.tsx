"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStarLibraryStore } from "@/stores/useStarLibraryStore";

export default function RandomStarDialog() {
  const { randomStar, isRandomDialogOpen, closeRandomDialog } = useStarLibraryStore();
  const backdropRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isRandomDialogOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isRandomDialogOpen]);

  if (!randomStar) return null;

  return (
    <AnimatePresence>
      {isRandomDialogOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRandomDialog}
          />

          {/* Dialog panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg pointer-events-auto rounded-sm overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,11,36,0.98) 0%, rgba(2,5,16,0.99) 100%)",
              }}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Blue sweep animation */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(100,180,255,0.15), transparent)",
                }}
              />

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-sm pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 40px ${randomStar.accentColor}1A, 0 0 60px ${randomStar.accentColor}0D`,
                  border: `1px solid ${randomStar.accentColor}33`,
                }}
              />

              {/* Close button */}
              <button
                onClick={closeRandomDialog}
                className="absolute top-4 right-4 text-parchment-500 hover:text-gold-400 transition-colors text-xl cursor-pointer z-10"
                aria-label="Close dialog"
              >
                &times;
              </button>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Star name reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-4"
                    style={{
                      backgroundColor: randomStar.accentColor,
                      boxShadow: `0 0 20px ${randomStar.accentColor}66, 0 0 40px ${randomStar.accentColor}33`,
                    }}
                  />
                  <h3
                    className="text-4xl font-bold mb-2"
                    style={{
                      color: randomStar.accentColor,
                      fontFamily: "var(--font-serif)",
                      textShadow: `0 0 30px ${randomStar.accentColor}33`,
                    }}
                  >
                    {randomStar.nameCn}
                  </h3>
                  <p
                    className="text-sm tracking-[0.25em] uppercase text-parchment-400"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {randomStar.nameEn}
                  </p>
                </motion.div>

                {/* Separator */}
                <motion.div
                  className="h-px mx-auto max-w-[200px] mb-6"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${randomStar.accentColor}66, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="space-y-4 mb-8"
                >
                  <p
                    className="text-sm text-parchment-300 leading-[1.8] text-center"
                    style={{ fontFamily: "var(--font-merriweather)" }}
                  >
                    {randomStar.brief}
                  </p>
                  <p
                    className="text-sm text-parchment-400 leading-[1.9] text-center"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {randomStar.briefCn}
                  </p>
                </motion.div>

                {/* WhatsApp CTA */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <p className="text-xs text-parchment-500 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    想知道这颗星如何影响你的 2026 年？问问你的军师。
                  </p>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`我想了解${randomStar.nameCn}（${randomStar.nameEn}）如何影响我的命盘`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm text-parchment-100 border border-gold-700/40 rounded-sm
                               hover:border-gold-500/60 hover:bg-gold-500/5 transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zm5 3a.5.5 0 001 0v-1a.5.5 0 00-1 0v1z" />
                    </svg>
                    <span className="tracking-wider uppercase text-xs font-medium">
                      Ask Your Strategist
                    </span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
