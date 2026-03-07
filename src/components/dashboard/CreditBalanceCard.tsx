"use client";

import { Coins, TrendingUp } from "lucide-react";
import Link from "next/link";

interface CreditBalanceCardProps {
  credits: number;
  tier: string;
}

export default function CreditBalanceCard({
  credits,
  tier,
}: CreditBalanceCardProps) {
  return (
    <div className="gold-frame rounded-xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
          <Coins className="h-4 w-4" />
          Credits
        </h3>
        <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
          {tier}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-parchment-100">{credits}</p>
        <p className="text-xs text-parchment-600">available credits</p>
      </div>

      {tier === "FREE" && (
        <Link
          href="/pricing"
          className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
        >
          <TrendingUp className="h-3 w-3" />
          Upgrade for more credits
        </Link>
      )}
    </div>
  );
}
