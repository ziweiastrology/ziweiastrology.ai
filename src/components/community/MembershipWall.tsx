"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Lock, Crown, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MEMBERSHIP_TIERS } from "@/lib/stripe";

interface MembershipWallProps {
  requiredTier?: "BASIC" | "PREMIUM" | "SIFU";
  children: React.ReactNode;
}

export default function MembershipWall({
  requiredTier = "BASIC",
  children,
}: MembershipWallProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <div className="relative">
        {/* Blurred preview */}
        <div className="pointer-events-none select-none blur-sm opacity-40">
          {children}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-celestial-900/60 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-lg border border-gold-700/30 bg-celestial-800/95 p-8 text-center shadow-2xl">
            <Lock className="mx-auto mb-4 h-10 w-10 text-gold-500" />
            <h3
              className="mb-2 text-xl font-bold text-parchment-100"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Members Only
            </h3>
            <p className="mb-6 text-sm text-parchment-500">
              Sign in or create an account to access this content.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/auth/login">
                <Button variant="primary">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check tier
  const tierOrder = ["FREE", "BASIC", "PREMIUM", "SIFU"];
  const userTierIndex = tierOrder.indexOf(session.user?.tier || "FREE");
  const requiredTierIndex = tierOrder.indexOf(requiredTier);

  if (userTierIndex >= requiredTierIndex) {
    return <>{children}</>;
  }

  // User is logged in but tier too low
  const tierInfo = MEMBERSHIP_TIERS[requiredTier];
  const TierIcon =
    requiredTier === "SIFU" ? Crown : requiredTier === "PREMIUM" ? Sparkles : Star;

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>

      {/* Upgrade overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-celestial-900/60 backdrop-blur-sm">
        <div className="mx-4 max-w-md rounded-lg border border-gold-500/30 bg-celestial-800/95 p-8 text-center shadow-2xl">
          <TierIcon className="mx-auto mb-4 h-10 w-10 text-gold-500" />
          <h3
            className="mb-2 text-xl font-bold text-gold-400"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Upgrade to {tierInfo.name}
          </h3>
          <p className="mb-4 text-sm text-parchment-500">
            {tierInfo.description}
          </p>
          <ul className="mb-6 space-y-1.5 text-left">
            {tierInfo.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-parchment-400"
              >
                <span className="text-gold-500">+</span>
                {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full">Upgrade Now</Button>
        </div>
      </div>
    </div>
  );
}
