"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-full border border-gold-700/30 bg-celestial-800/60 px-3 py-1.5 text-sm text-parchment-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">
          {session.user?.name?.split(" ")[0] || "Account"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gold-700/30 bg-celestial-800 py-2 shadow-xl shadow-black/40">
          <div className="border-b border-gold-700/20 px-4 pb-2 mb-2">
            <p className="text-sm font-medium text-parchment-200">
              {session.user?.name}
            </p>
            <p className="text-xs text-parchment-600">{session.user?.email}</p>
            <span className="mt-1 inline-block rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
              {session.user?.tier || "FREE"}
            </span>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm text-parchment-400 transition-colors hover:bg-celestial-700/50 hover:text-parchment-200"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-parchment-400 transition-colors hover:bg-celestial-700/50 hover:text-parchment-200"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>

          <div className="my-1 border-t border-gold-700/20" />

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-quantum-red/80 transition-colors hover:bg-celestial-700/50 hover:text-quantum-red"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
