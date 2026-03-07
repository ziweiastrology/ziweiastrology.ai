"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Crown, CreditCard, ExternalLink, Star, Save, Loader2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import ProfileForm from "@/components/settings/ProfileForm";
import TagSelector from "@/components/settings/TagSelector";

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

  // Birth info state
  const [birthDate, setBirthDate] = useState("");
  const [birthHour, setBirthHour] = useState("");
  const [birthMinute, setBirthMinute] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [birthGender, setBirthGender] = useState("");
  const [birthLoading, setBirthLoading] = useState(false);
  const [birthSaved, setBirthSaved] = useState(false);
  const [birthLoaded, setBirthLoaded] = useState(false);

  // Load existing birth info
  useEffect(() => {
    if (birthLoaded) return;
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          if (data.user.birthDate) setBirthDate(data.user.birthDate.slice(0, 10));
          if (data.user.birthHour != null) setBirthHour(String(data.user.birthHour));
          if (data.user.birthMinute != null) setBirthMinute(String(data.user.birthMinute));
          if (data.user.birthLocation) setBirthLocation(data.user.birthLocation);
          if (data.user.birthGender) setBirthGender(data.user.birthGender);
        }
        setBirthLoaded(true);
      })
      .catch(() => setBirthLoaded(true));
  }, [birthLoaded]);

  async function handleSaveBirthInfo() {
    setBirthLoading(true);
    setBirthSaved(false);
    try {
      const res = await fetch("/api/user/birth-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthDate: birthDate || null,
          birthHour: birthHour !== "" ? parseInt(birthHour) : null,
          birthMinute: birthMinute !== "" ? parseInt(birthMinute) : null,
          birthLocation: birthLocation || null,
          birthGender: birthGender || null,
        }),
      });
      if (res.ok) setBirthSaved(true);
    } catch {
      // handle error silently
    } finally {
      setBirthLoading(false);
    }
  }

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

      {/* Birth Info */}
      <div className="mb-6 rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <h2
          className="mb-4 flex items-center gap-2 text-lg font-semibold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          <Star className="h-5 w-5 text-gold-400" />
          Birth Information
        </h2>
        <p className="mb-4 text-xs text-parchment-600">
          Used for your ZiWei Destiny Chart calculation. All fields are optional.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-parchment-500">Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-parchment-500">Gender</label>
              <select
                value={birthGender}
                onChange={(e) => setBirthGender(e.target.value)}
                className="select-field w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="male">Male 男</option>
                <option value="female">Female 女</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-parchment-500">Birth Hour (0-23)</label>
              <input
                type="number"
                min={0}
                max={23}
                value={birthHour}
                onChange={(e) => setBirthHour(e.target.value)}
                placeholder="e.g. 14"
                className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-parchment-500">Birth Minute (0-59)</label>
              <input
                type="number"
                min={0}
                max={59}
                value={birthMinute}
                onChange={(e) => setBirthMinute(e.target.value)}
                placeholder="e.g. 30"
                className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-parchment-500">Birth Location</label>
            <input
              type="text"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              placeholder="e.g. Taipei, Taiwan"
              className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveBirthInfo}
              disabled={birthLoading}
              size="sm"
            >
              {birthLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Birth Info
            </Button>
            {birthSaved && (
              <span className="text-xs text-quantum-green">Saved successfully!</span>
            )}
          </div>
        </div>
      </div>

      {/* Profile Editor */}
      <div className="mb-6">
        <ProfileForm />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <TagSelector />
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
            <Button onClick={() => router.push("/pricing")}>
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
