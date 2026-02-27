"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Mail, Crown, CreditCard, ExternalLink } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

const TIER_LABELS: Record<string, { name: string; color: string }> = {
  FREE: { name: "Free", color: "text-parchment-400" },
  BASIC: { name: "Basic", color: "text-quantum-cyan" },
  PREMIUM: { name: "Premium", color: "text-quantum-orange" },
  SIFU: { name: "Sifu Master", color: "text-gold-400" },
};

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/settings");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
        <PageHeader title="Settings" />
        <div className="animate-pulse space-y-4">
          <div className="h-32 rounded-lg bg-celestial-800/30" />
          <div className="h-24 rounded-lg bg-celestial-800/30" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  const tier = (session.user as { tier?: string })?.tier || "FREE";
  const tierInfo = TIER_LABELS[tier] || TIER_LABELS.FREE;

  async function handleManageBilling() {
    try {
      const res = await fetch("/api/payments/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Billing portal not available
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
      <PageHeader title="Settings" subtitle="Manage your account and membership" />

      {/* Profile */}
      <div className="mb-6 rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <h2
          className="mb-4 text-lg font-semibold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Profile
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-parchment-600" />
            <div>
              <p className="text-xs text-parchment-600">Name</p>
              <p className="text-sm text-parchment-200">
                {session.user?.name || "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-parchment-600" />
            <div>
              <p className="text-xs text-parchment-600">Email</p>
              <p className="text-sm text-parchment-200">
                {session.user?.email || "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-parchment-600" />
            <div>
              <p className="text-xs text-parchment-600">Membership</p>
              <p className={`text-sm font-semibold ${tierInfo.color}`}>
                {tierInfo.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Management */}
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <h2
          className="mb-4 text-lg font-semibold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Membership
        </h2>

        {tier === "FREE" ? (
          <div>
            <p className="mb-4 text-sm text-parchment-500">
              Upgrade your membership to unlock community features, courses, and
              more.
            </p>
            <Button onClick={() => router.push("/academy")}>
              View Plans
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-sm text-parchment-500">
              Manage your subscription, update payment method, or view billing
              history through the Stripe billing portal.
            </p>
            <Button onClick={handleManageBilling}>
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Billing
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
