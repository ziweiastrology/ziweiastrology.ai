"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMatrixStore } from "@/stores/useMatrixStore";
import { PALACE_ICON_MAP } from "./palaceIcons";

const STATE_LABELS: Record<string, { label: string; color: string }> = {
  lu: { label: "禄 Lu — Abundance", color: "text-quantum-green" },
  quan: { label: "权 Quan — Authority", color: "text-gold-400" },
  ke: { label: "科 Ke — Scholarship", color: "text-celestial-200" },
  ji: { label: "忌 Ji — Obstruction", color: "text-quantum-red" },
};

const panelTransition = {
  type: "spring" as const,
  damping: 25,
  stiffness: 300,
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

export default function PalaceSidebar() {
  const sidebarOpen = useMatrixStore((s) => s.sidebarOpen);
  const closeSidebar = useMatrixStore((s) => s.closeSidebar);
  const selectedPalaceId = useMatrixStore((s) => s.selectedPalaceId);
  const palaces = useMatrixStore((s) => s.palaces);

  const palace = palaces.find((p) => p.id === selectedPalaceId);
  const IconComponent = palace ? PALACE_ICON_MAP[palace.icon] : null;
  const stateInfo =
    palace && palace.state !== "neutral" ? STATE_LABELS[palace.state] : null;

  // Body scroll lock
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [sidebarOpen]);

  return (
    <AnimatePresence>
      {sidebarOpen && palace && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSidebar}
          />

          {/* Drawer — slides from LEFT */}
          <motion.div
            key="drawer"
            className="fixed top-0 left-0 z-50 h-full w-full max-w-md overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,6,30,0.98) 0%, rgba(8,4,20,0.99) 100%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={panelTransition}
          >
            {/* Energy edge glow on right side */}
            <div
              className="absolute top-0 right-0 w-px h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 5%, rgba(212,165,40,0.4) 30%, rgba(90,53,168,0.3) 50%, rgba(212,165,40,0.4) 70%, transparent 95%)",
                boxShadow:
                  "0 0 12px rgba(212,165,40,0.2), 0 0 30px rgba(212,165,40,0.08)",
              }}
            />

            {/* Scrollable content with stagger */}
            <motion.div
              className="h-full overflow-y-auto px-6 py-8 md:px-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close button */}
              <button
                onClick={closeSidebar}
                className="absolute top-4 right-4 text-parchment-500 hover:text-gold-400 transition-colors text-xl cursor-pointer z-10"
                aria-label="Close sidebar"
              >
                &times;
              </button>

              {/* Header */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                variants={childVariants}
                transition={{ duration: 0.35 }}
              >
                <div className="text-gold-400 w-10 h-10 flex items-center justify-center">
                  {IconComponent && <IconComponent />}
                </div>
                <div>
                  <h3
                    className="text-xl text-parchment-100 tracking-wider"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {palace.name} Palace
                  </h3>
                  <p
                    className="text-gold-400/80 text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {palace.nameCn}宫
                  </p>
                  {palace.subtitle && (
                    <p className="text-xs text-celestial-300/60 tracking-[0.15em] uppercase mt-1">
                      {palace.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* State badge */}
              {stateInfo && (
                <motion.div className="mb-6" variants={childVariants}>
                  <span
                    className={`inline-block px-3 py-1 text-xs tracking-widest uppercase border border-current/20 rounded-full ${stateInfo.color}`}
                  >
                    {stateInfo.label}
                  </span>
                </motion.div>
              )}

              {/* Divider */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-gold-700/40 to-transparent mb-6"
                variants={childVariants}
              />

              {/* Consciousness */}
              <motion.div className="mb-8" variants={childVariants}>
                <h4 className="text-xs text-gold-600 uppercase tracking-[0.2em] mb-3">
                  Consciousness
                </h4>
                <p
                  className="text-parchment-300 leading-relaxed text-sm"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {palace.consciousness}
                </p>
              </motion.div>

              {/* The Fable */}
              <motion.div className="mb-8" variants={childVariants}>
                <h4 className="text-xs text-gold-600 uppercase tracking-[0.2em] mb-3">
                  The Fable
                </h4>
                <p
                  className="text-parchment-400 italic leading-relaxed text-sm"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  &ldquo;{palace.fable}&rdquo;
                </p>
              </motion.div>

              {/* Stars */}
              {palace.stars.length > 0 && (
                <motion.div className="mb-8" variants={childVariants}>
                  <h4 className="text-xs text-gold-600 uppercase tracking-[0.2em] mb-3">
                    Stars
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {palace.stars.map((star) => (
                      <span
                        key={star}
                        className="px-3 py-1 text-xs text-parchment-300 border border-gold-700/30 rounded-full bg-celestial-800/50"
                      >
                        {star}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Energy bar */}
              <motion.div className="mb-8" variants={childVariants}>
                <h4 className="text-xs text-gold-600 uppercase tracking-[0.2em] mb-3">
                  Energy Level
                </h4>
                <div className="w-full h-1.5 rounded-full bg-celestial-700/50 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(212,165,40,0.6), rgba(212,165,40,0.9))",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${palace.energy}%` }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-parchment-500 mt-1">
                  {palace.energy}%
                </p>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-gold-700/40 to-transparent mb-6"
                variants={childVariants}
              />

              {/* CTA Button */}
              <motion.div variants={childVariants}>
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold
                             uppercase tracking-[0.2em] text-celestial-900 rounded-sm cursor-pointer
                             transition-all duration-300
                             hover:shadow-[0_0_30px_rgba(212,165,40,0.35),0_0_60px_rgba(212,165,40,0.15)]
                             active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, #8f6b17, #b8891e, #d4a528, #e6be4a, #d4a528, #b8891e, #8f6b17)",
                    backgroundSize: "200% 100%",
                  }}
                >
                  Unlock Full Reading
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <div className="flex gap-3 mt-4">
                  <a
                    href="https://wa.me/?text=Explore%20my%20Destiny%20Matrix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-parchment-300 border border-gold-700/30 rounded-sm hover:border-gold-500/50 hover:bg-gold-500/5 transition-all"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://t.me/share/url?url=ziweiastrology.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-parchment-300 border border-gold-700/30 rounded-sm hover:border-gold-500/50 hover:bg-gold-500/5 transition-all"
                  >
                    Telegram
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
