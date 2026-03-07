"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Menu,
  X,
  BookOpen,
  Users,
  GraduationCap,
  Info,
  LogIn,
  FlaskConical,
  ChevronDown,
  Bell,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserMenu from "@/components/auth/UserMenu";
import CreditBadge from "@/components/credits/CreditBadge";
import { useUnreadCounts } from "@/hooks/useNotifications";

function NavBadges() {
  const { data: unread } = useUnreadCounts();

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/messages"
        className="relative rounded-md p-2 text-parchment-400 hover:bg-celestial-800 hover:text-parchment-200 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {(unread?.notifications ?? 0) > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-quantum-red text-[10px] font-bold text-white">
            {unread.notifications > 9 ? "9+" : unread.notifications}
          </span>
        )}
      </Link>
      <Link
        href="/messages?tab=dm"
        className="relative rounded-md p-2 text-parchment-400 hover:bg-celestial-800 hover:text-parchment-200 transition-colors"
        aria-label="Messages"
      >
        <MessageCircle className="h-5 w-5" />
        {(unread?.messages ?? 0) > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-quantum-red text-[10px] font-bold text-white">
            {unread.messages > 9 ? "9+" : unread.messages}
          </span>
        )}
      </Link>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/about", label: "About", icon: Info },
  { href: "/case-studies", label: "Case Studies", icon: FlaskConical },
  { href: "/community", label: "Community", icon: Users },
  { href: "/academy", label: "Academy", icon: GraduationCap },
];

const LEARN_DROPDOWN = [
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/system-comparison", label: "Compare Systems" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);
  const learnTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isLearnActive = LEARN_DROPDOWN.some((item) => pathname.startsWith(item.href));

  // Close learn dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold-700/20 bg-celestial-900/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.jpg"
              alt="Ziwei Astrology"
              width={120}
              height={120}
              className="rounded-full mix-blend-screen"
            />
            <span
              className="hidden text-sm font-bold tracking-wider text-gold-400 sm:inline"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Ziwei Astrology
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {/* About link */}
            <Link
              href="/about"
              aria-current={pathname.startsWith("/about") ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all",
                pathname.startsWith("/about")
                  ? "bg-celestial-700/60 text-gold-400"
                  : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
              )}
            >
              <Info className="h-4 w-4" />
              About
            </Link>

            {/* Learn dropdown */}
            <div
              ref={learnRef}
              className="relative"
              onMouseEnter={() => {
                if (learnTimeout.current) clearTimeout(learnTimeout.current);
                setLearnOpen(true);
              }}
              onMouseLeave={() => {
                learnTimeout.current = setTimeout(() => setLearnOpen(false), 150);
              }}
            >
              <button
                onClick={() => setLearnOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  isLearnActive
                    ? "bg-celestial-700/60 text-gold-400"
                    : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
                )}
              >
                <BookOpen className="h-4 w-4" />
                Learn
                <ChevronDown className={cn("h-3 w-3 transition-transform", learnOpen && "rotate-180")} />
              </button>
              {learnOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-md border border-gold-700/30 bg-celestial-900/98 backdrop-blur-md shadow-lg overflow-hidden z-50">
                  {LEARN_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setLearnOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors",
                        pathname.startsWith(item.href)
                          ? "bg-celestial-700/60 text-gold-400"
                          : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining nav links */}
            {NAV_LINKS.slice(1).map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-celestial-700/60 text-gold-400"
                      : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {session && <CreditBadge />}
            {session && <NavBadges />}
            {session ? (
              <UserMenu />
            ) : (
              <Link
                href="/auth/login"
                className="hidden items-center gap-1.5 rounded-md border border-gold-700/40 px-4 py-2 text-sm font-medium text-gold-400 transition-all hover:border-gold-500 hover:bg-gold-500/10 md:flex"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-parchment-400 hover:bg-celestial-800 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gold-700/20 bg-celestial-900/98 md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {/* About */}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              aria-current={pathname.startsWith("/about") ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                pathname.startsWith("/about")
                  ? "bg-celestial-700/60 text-gold-400"
                  : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
              )}
            >
              <Info className="h-4 w-4" />
              About
            </Link>

            {/* Learn — expandable */}
            <button
              onClick={() => setMobileLearnOpen((v) => !v)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                isLearnActive
                  ? "bg-celestial-700/60 text-gold-400"
                  : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Learn
              <ChevronDown className={cn("ml-auto h-3 w-3 transition-transform", mobileLearnOpen && "rotate-180")} />
            </button>
            {mobileLearnOpen && (
              <div className="ml-6 space-y-1">
                {LEARN_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      pathname.startsWith(item.href)
                        ? "text-gold-400"
                        : "text-parchment-500 hover:text-parchment-300"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Remaining links */}
            {NAV_LINKS.slice(1).map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-celestial-700/60 text-gold-400"
                      : "text-parchment-400 hover:bg-celestial-800/60 hover:text-parchment-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
            {!session && (
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md border border-gold-700/40 px-3 py-2.5 text-sm font-medium text-gold-400 hover:bg-gold-500/10"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
