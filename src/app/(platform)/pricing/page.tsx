"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  Crown,
  Star,
  Check,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const TIERS = [
  {
    key: "FREE",
    name: "Free",
    icon: Sparkles,
    monthlyPrice: 0,
    annualPrice: 0,
    dailyCredits: 3,
    color: "parchment-400",
    borderColor: "border-gold-700/20",
    features: [
      "Full 12-palace natal chart",
      "3 AI messages per day",
      "Basic 流年 forecast preview",
    ],
  },
  {
    key: "BASIC",
    name: "Basic",
    icon: Zap,
    monthlyPrice: 8.88,
    annualPrice: 88.88,
    dailyCredits: 10,
    color: "quantum-cyan",
    borderColor: "border-quantum-cyan/30",
    features: [
      "Everything in Free",
      "10 AI messages per day",
      "Conversation history",
      "Community read access",
    ],
  },
  {
    key: "PREMIUM",
    name: "Premium",
    icon: Crown,
    monthlyPrice: 18.88,
    annualPrice: 188.88,
    dailyCredits: 30,
    popular: true,
    color: "quantum-orange",
    borderColor: "border-quantum-orange/40",
    features: [
      "Everything in Basic",
      "30 AI messages per day",
      "Advanced 流年 reports",
      "Post & comment in community",
      "Academy course access",
    ],
  },
  {
    key: "SIFU",
    name: "Sifu Master",
    icon: Star,
    monthlyPrice: 38.88,
    annualPrice: 388.88,
    dailyCredits: 100,
    color: "gold-400",
    borderColor: "border-gold-500/40",
    features: [
      "Everything in Premium",
      "100 AI messages per day",
      "Priority AI responses",
      "Certified master badge",
      "Instructor capabilities",
      "Priority support",
    ],
  },
];

const FAQ = [
  {
    q: "How do credits work?",
    a: "Each AI message with ZiWei Sifu costs 1 credit. Credits refresh daily at midnight based on your tier. Free users get 3 credits, while paid tiers get 10–100 daily credits.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Credits reset daily and do not roll over. This keeps the experience fresh and ensures you always have a reason to engage with your chart insights.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel anytime from your Settings page. You'll keep your current tier benefits until the end of your billing period, then revert to Free.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, and Apple Pay / Google Pay through Stripe's secure payment system.",
  },
  {
    q: "Is my birth data safe?",
    a: "Absolutely. Your birth data is encrypted and never shared. AI conversations are private to your account. We follow strict data protection practices.",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const userTier = (session?.user as { tier?: string } | undefined)?.tier || "FREE";

  async function handleSubscribe(tierKey: string) {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/pricing`);
      return;
    }

    if (tierKey === "FREE") return;

    setLoadingTier(tierKey);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tierKey,
          interval: annual ? "year" : "month",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Checkout failed
    } finally {
      setLoadingTier(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <PageHeader
        title="Choose Your Path"
        subtitle="Unlock deeper insights from ZiWei Sifu — your personal Zi Wei Dou Shu advisor"
      />

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span
          className={`text-sm transition-colors ${!annual ? "text-parchment-200 font-semibold" : "text-parchment-500"}`}
        >
          Monthly
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className="relative w-14 h-7 rounded-full border border-gold-700/40 bg-celestial-900/80 transition-colors"
        >
          <div
            className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 ${
              annual
                ? "left-[calc(100%-1.625rem)] bg-gold-500"
                : "left-0.5 bg-parchment-500"
            }`}
          />
        </button>
        <span
          className={`text-sm transition-colors ${annual ? "text-parchment-200 font-semibold" : "text-parchment-500"}`}
        >
          Annual
        </span>
        {annual && (
          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-quantum-green bg-quantum-green/10 border border-quantum-green/30 rounded-full">
            Save ~17%
          </span>
        )}
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {TIERS.map((tier) => {
          const isCurrentTier = userTier === tier.key;
          const price = annual ? tier.annualPrice : tier.monthlyPrice;
          const Icon = tier.icon;

          return (
            <div
              key={tier.key}
              className={`relative flex flex-col rounded-xl border ${tier.borderColor} bg-celestial-800/40 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-celestial-800/60 ${
                tier.popular
                  ? "ring-1 ring-quantum-orange/40 shadow-[0_0_30px_rgba(255,140,0,0.08)]"
                  : ""
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-celestial-900 bg-quantum-orange rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-9 h-9 rounded-lg bg-${tier.color}/10 border border-${tier.color}/30 flex items-center justify-center`}
                >
                  <Icon className={`h-4.5 w-4.5 text-${tier.color}`} />
                </div>
                <h3
                  className={`text-lg font-bold text-${tier.color}`}
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {tier.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-1">
                {price === 0 ? (
                  <p className="text-3xl font-bold text-parchment-200">Free</p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-parchment-200">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-sm text-parchment-500">
                      /{annual ? "year" : "month"}
                    </span>
                  </div>
                )}
              </div>

              {/* Daily credits */}
              <div className="flex items-center gap-1.5 mb-5 text-sm text-parchment-400">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>
                  {tier.dailyCredits} AI messages/day
                </span>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 text-${tier.color}/70`} />
                    <span className="text-sm text-parchment-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isCurrentTier ? (
                <div className="w-full py-2.5 rounded-lg border border-gold-700/30 bg-celestial-900/50 text-center text-sm font-semibold text-parchment-500">
                  Current Plan
                </div>
              ) : tier.key === "FREE" ? (
                <div className="w-full py-2.5 rounded-lg border border-gold-700/20 bg-celestial-900/30 text-center text-sm text-parchment-600">
                  Free Forever
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(tier.key)}
                  disabled={loadingTier === tier.key}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 ${
                    tier.popular
                      ? "text-celestial-900 hover:shadow-[0_0_20px_rgba(255,140,0,0.2)]"
                      : "text-celestial-900 hover:shadow-[0_0_20px_rgba(212,165,40,0.2)]"
                  }`}
                  style={{
                    background: tier.popular
                      ? "linear-gradient(135deg, #d97706, #f59e0b, #d97706)"
                      : "linear-gradient(135deg, #8f6b17, #d4a528, #8f6b17)",
                  }}
                >
                  {loadingTier === tier.key ? "Redirecting..." : "Subscribe"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-2xl font-bold text-center text-parchment-100 mb-8"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-gold-700/20 bg-celestial-800/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-parchment-200">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-parchment-500 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-parchment-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
