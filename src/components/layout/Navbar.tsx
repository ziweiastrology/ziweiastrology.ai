"use client";

import { useState } from "react";
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
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserMenu from "@/components/auth/UserMenu";

const NAV_LINKS = [
  { href: "/about", label: "About", icon: Info },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/case-studies", label: "Case Studies", icon: FlaskConical },
  { href: "/system-comparison", label: "Compare", icon: Scale },
  { href: "/community", label: "Community", icon: Users },
  { href: "/academy", label: "Academy", icon: GraduationCap },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full object-cover mix-blend-screen"
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
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
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
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
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
