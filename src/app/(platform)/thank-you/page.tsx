"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CheckCircle,
  Sparkles,
  LayoutDashboard,
  FileText,
  Users,
  BookOpen,
  Loader2,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");
  const { data: session, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);

  const tier = searchParams.get("tier") || "PREMIUM";

  // Refresh session to pick up new tier, then show content
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    async function pollSession() {
      attempts++;
      await update();
      const userTier = (session?.user as { tier?: string } | undefined)?.tier;
      if (userTier && userTier !== "FREE") {
        setReady(true);
        return;
      }
      if (attempts >= maxAttempts) {
        // Webhook may be delayed — show page anyway
        setReady(true);
        return;
      }
      setTimeout(pollSession, 2000);
    }

    // Give webhook 2s to process, then start polling
    const timer = setTimeout(pollSession, 2000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fire confetti when ready
  useEffect(() => {
    if (!ready) return;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4a528", "#8f6b17", "#f5e6c8", "#00bcd4", "#4caf50"],
    });
  }, [ready]);

  const NEXT_STEPS = [
    {
      icon: LayoutDashboard,
      title: t("exploreDashboard"),
      description: t("exploreDashboardDesc"),
      href: "/dashboard",
      color: "text-gold-400",
    },
    {
      icon: FileText,
      title: t("generateReport"),
      description: t("generateReportDesc"),
      href: "/reports",
      color: "text-quantum-cyan",
    },
    {
      icon: Users,
      title: t("joinCommunity"),
      description: t("joinCommunityDesc"),
      href: "/community",
      color: "text-quantum-green",
    },
    {
      icon: BookOpen,
      title: t("startLearning"),
      description: t("startLearningDesc"),
      href: "/academy",
      color: "text-quantum-orange",
    },
  ];

  if (!ready) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-gold-400" />
        <h1
          className="mt-6 text-2xl font-bold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {t("processing")}
        </h1>
        <p className="mt-2 text-sm text-parchment-500">
          {t("processingDesc")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-quantum-green/10 ring-2 ring-quantum-green/30">
          <CheckCircle className="h-10 w-10 text-quantum-green" />
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold gold-gradient-text"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-parchment-400">
          {t("subtitle")}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 border border-gold-500/30">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <span className="text-sm font-semibold text-gold-300">
            {t("tierUpgraded", { tier })}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto mb-10 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* What's Next */}
      <h2
        className="text-center text-xl font-bold text-parchment-100 mb-8"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {t("whatsNext")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {NEXT_STEPS.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="group flex items-start gap-4 rounded-xl border border-gold-700/20 bg-celestial-800/40 p-5 transition-all hover:border-gold-500/30 hover:bg-celestial-800/60"
          >
            <div className={`mt-0.5 ${step.color}`}>
              <step.icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors">
                {step.title}
              </h3>
              <p className="mt-1 text-xs text-parchment-500 leading-relaxed">
                {step.description}
              </p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 text-parchment-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold text-celestial-900 transition-all hover:shadow-[0_0_20px_rgba(212,165,40,0.2)]"
          style={{
            background: "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
          }}
        >
          <LayoutDashboard className="h-4 w-4" />
          {t("goToDashboard")}
        </Link>
      </div>
    </div>
  );
}
