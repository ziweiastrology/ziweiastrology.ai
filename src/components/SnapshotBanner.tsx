"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { Button } from "@/components/ui/Button";

const SNAPSHOT_DURATION = 900; // 15 minutes in seconds

export default function SnapshotBanner() {
  const { data: session } = useSession();
  const isUnlocked = useDashboardStore((s) => s.isUnlocked);
  const snapshotExpired = useDashboardStore((s) => s.snapshotExpired);
  const setSnapshotExpired = useDashboardStore((s) => s.setSnapshotExpired);
  const openAuthModal = useDashboardStore((s) => s.openAuthModal);

  const [secondsLeft, setSecondsLeft] = useState(SNAPSHOT_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  // Start countdown when unlocked and no session
  useEffect(() => {
    if (!isUnlocked || session || startedRef.current) return;
    startedRef.current = true;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setSnapshotExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isUnlocked, session, setSnapshotExpired]);

  // Clear timer if user logs in
  useEffect(() => {
    if (session && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [session]);

  // Don't render if logged in or chart not unlocked
  if (session || !isUnlocked) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = secondsLeft <= 120; // last 2 minutes

  if (snapshotExpired) {
    return (
      <div className="relative mx-auto max-w-4xl px-4 py-6">
        <div className="rounded-lg border border-quantum-red/30 bg-celestial-900/80 backdrop-blur-sm p-5 text-center space-y-3">
          <p className="text-sm text-quantum-red font-semibold">
            Snapshot Expired
          </p>
          <p className="text-xs text-parchment-400">
            Register to restore your reading and save your chart permanently.
          </p>
          <Button onClick={() => openAuthModal("full_reading")}>
            Create Free Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-6">
      <div
        className="rounded-lg border bg-celestial-900/80 backdrop-blur-sm p-4 sm:p-5"
        style={{
          borderColor: isUrgent
            ? "rgba(255,80,80,0.4)"
            : "rgba(212,165,40,0.35)",
          boxShadow: isUrgent
            ? "0 0 20px rgba(255,80,80,0.1)"
            : "0 0 20px rgba(212,165,40,0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Countdown */}
          <div className="flex items-center gap-2">
            <Clock
              className={`h-4 w-4 ${isUrgent ? "text-quantum-red animate-pulse" : "text-gold-400"}`}
            />
            <span
              className={`text-lg font-mono font-bold tracking-wider ${isUrgent ? "text-quantum-red" : "text-gold-300"}`}
            >
              {timeStr}
            </span>
          </div>

          {/* Message */}
          <p className="flex-1 text-xs sm:text-sm text-parchment-400 text-center sm:text-left">
            Your free reading snapshot is{" "}
            <span className="text-gold-300 font-medium">temporary</span>.
            Register to save it permanently.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => openAuthModal("full_reading")}
              className="gap-1.5"
            >
              <Save className="h-3.5 w-3.5" />
              Save My Reading
            </Button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="rounded-md border border-gold-700/30 bg-celestial-800/60 px-3 py-1.5 text-xs text-parchment-300 hover:border-gold-500/50 hover:bg-celestial-700/40 transition-colors"
            >
              Google Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
