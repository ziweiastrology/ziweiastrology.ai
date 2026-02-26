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
                "linear-gradient(180deg, rgba(7,11,36,0.98) 0%, rgba(2,5,16,0.99) 100%)",
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
                  "linear-gradient(180deg, transparent 5%, rgba(212,165,40,0.4) 30%, rgba(42,63,158,0.3) 50%, rgba(212,165,40,0.4) 70%, transparent 95%)",
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

              {/* Connect buttons */}
              <motion.div variants={childVariants}>
                <h4 className="text-xs text-gold-600 uppercase tracking-[0.2em] mb-3">
                  Connect
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/?text=Explore%20my%20Destiny%20Matrix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-parchment-200 border border-gold-700/30 rounded-lg hover:border-gold-500/50 hover:bg-gold-500/5 transition-all"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zm5 3a.5.5 0 001 0v-1a.5.5 0 00-1 0v1z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href="https://t.me/share/url?url=ziweiastrology.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-parchment-200 border border-gold-700/30 rounded-lg hover:border-gold-500/50 hover:bg-gold-500/5 transition-all"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 5L2 12.5l7 1.5M21 5l-4.5 15-6.5-7.5M21 5L9 14" />
                    </svg>
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
