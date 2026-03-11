"use client";

import { useState, useEffect } from "react";
import { DollarSign, MousePointer, Users, TrendingUp, Clock, Copy, Check, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface AffiliateStats {
  affiliate: {
    id: string;
    code: string;
    status: string;
  };
  stats: {
    totalClicks: number;
    totalSignups: number;
    totalEarnings: number;
    pendingEarnings: number;
  };
}

const DISMISS_KEY = "ziwei-affiliate-cta-dismissed";
const DISMISS_DAYS = 14;

function isDismissed(): boolean {
  if (typeof window === "undefined") return false;
  const ts = localStorage.getItem(DISMISS_KEY);
  if (!ts) return false;
  const elapsed = Date.now() - Number(ts);
  return elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export default function AffiliateCard() {
  const t = useTranslations("dashboard");
  const [data, setData] = useState<AffiliateStats | null>(null);
  const [isAffiliate, setIsAffiliate] = useState<boolean | null>(null);
  const [dismissed, setDismissed] = useState(true); // default hidden until checked
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDismissed(isDismissed());

    fetch("/api/affiliates/dashboard")
      .then((res) => {
        if (res.status === 404) {
          setIsAffiliate(false);
          return null;
        }
        return res.json();
      })
      .then((d) => {
        if (d) {
          setData(d);
          setIsAffiliate(true);
        }
      })
      .catch(() => setIsAffiliate(false));
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setDismissed(true);
  };

  const copyLink = () => {
    if (!data?.affiliate.code) return;
    navigator.clipboard.writeText(`${window.location.origin}/ref/${data.affiliate.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Still loading
  if (isAffiliate === null) return null;

  // Active affiliate — mini stats
  if (isAffiliate && data && data.affiliate.status === "ACTIVE") {
    const stats = [
      { icon: MousePointer, label: t("affiliateClicks"), value: data.stats.totalClicks },
      { icon: Users, label: t("affiliateSignups"), value: data.stats.totalSignups },
      { icon: DollarSign, label: t("affiliateEarnings"), value: `$${data.stats.totalEarnings.toFixed(2)}` },
      { icon: Clock, label: t("affiliatePending"), value: `$${data.stats.pendingEarnings.toFixed(2)}` },
    ];

    return (
      <div className="rounded-xl border border-gold-700/20 bg-celestial-900/40 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-parchment-200 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-quantum-green" />
            {t("affiliateAction")}
          </h3>
          <Link
            href="/settings/affiliates"
            className="text-[10px] text-gold-500 hover:text-gold-400 flex items-center gap-1"
          >
            {t("affiliateViewFull")} <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-gold-700/10 bg-celestial-800/30 p-2.5">
              <div className="flex items-center gap-1.5 text-parchment-500">
                <s.icon className="h-3 w-3" />
                <span className="text-[10px]">{s.label}</span>
              </div>
              <p className="mt-1 text-sm font-bold text-parchment-200">{s.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={copyLink}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gold-700/20 bg-celestial-800/30 px-3 py-2 text-xs text-gold-400 hover:border-gold-500/30 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : t("affiliateCopyLink")}
        </button>
      </div>
    );
  }

  // Non-affiliate CTA — dismissible
  if (dismissed) return null;

  return (
    <div className="relative rounded-xl border border-gold-700/20 bg-gradient-to-br from-celestial-900/60 to-celestial-800/40 p-5">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-parchment-600 hover:text-parchment-400 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-lg bg-gold-500/10 p-2">
          <DollarSign className="h-5 w-5 text-gold-400" />
        </div>
        <h3 className="text-sm font-semibold text-gold-400">
          {t("affiliateCTA")}
        </h3>
      </div>

      <p className="text-xs text-parchment-500 mb-4">
        {t("affiliateCTADesc")}
      </p>

      <Link
        href="/settings/affiliates"
        className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500/15 border border-gold-500/30 px-4 py-2 text-xs font-semibold text-gold-400 hover:bg-gold-500/25 transition-colors"
      >
        {t("affiliateCTAButton")} <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
