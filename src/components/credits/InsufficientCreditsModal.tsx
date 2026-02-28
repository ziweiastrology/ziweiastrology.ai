"use client";

import { X, Coins, ArrowUpCircle, Share2, BookOpen, MessageSquare } from "lucide-react";
import Link from "next/link";

interface InsufficientCreditsModalProps {
  open: boolean;
  onClose: () => void;
  credits: number;
  needed: number;
}

const EARN_OPTIONS = [
  { icon: Share2, label: "Share your reading", reward: "+2", limit: "1x/day" },
  { icon: BookOpen, label: "Read a resource article", reward: "+1", limit: "3x/day" },
  { icon: MessageSquare, label: "Post in community", reward: "+2", limit: "2x/day" },
];

export default function InsufficientCreditsModal({
  open,
  onClose,
  credits,
  needed,
}: InsufficientCreditsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border border-gold-700/30 bg-celestial-900 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-parchment-500 hover:text-parchment-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-700/30 bg-gold-500/10">
              <Coins className="h-6 w-6 text-gold-400" />
            </div>
            <h3
              className="text-lg font-bold text-gold-300"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Need More Credits
            </h3>
            <p className="text-sm text-parchment-400">
              You have{" "}
              <span className="font-semibold text-gold-400">{credits}</span>{" "}
              credit{credits !== 1 ? "s" : ""} but need{" "}
              <span className="font-semibold text-gold-400">{needed}</span>.
            </p>
          </div>

          {/* Earn options */}
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-wider uppercase text-gold-500/60">
              Earn Credits
            </p>
            {EARN_OPTIONS.map((opt) => (
              <div
                key={opt.label}
                className="flex items-center gap-3 rounded-lg border border-gold-700/20 bg-celestial-800/50 px-4 py-3"
              >
                <opt.icon className="h-4 w-4 text-gold-500/70" />
                <span className="flex-1 text-sm text-parchment-300">
                  {opt.label}
                </span>
                <span className="text-xs font-semibold text-quantum-green">
                  {opt.reward}
                </span>
                <span className="text-[10px] text-parchment-600">
                  {opt.limit}
                </span>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-wider uppercase text-gold-500/60">
              Or Upgrade
            </p>
            <Link
              href="/payments"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-celestial-900 transition-all hover:shadow-[0_0_20px_rgba(212,165,40,0.3)]"
              style={{
                background:
                  "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
              }}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Upgrade for More Daily Credits
            </Link>
          </div>

          {/* Comeback message */}
          <p className="text-center text-xs text-parchment-500">
            Your credits refresh daily at midnight.
          </p>
        </div>
      </div>
    </div>
  );
}
