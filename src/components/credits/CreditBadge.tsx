"use client";

import { Coins } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";
import { useSession } from "next-auth/react";

export default function CreditBadge() {
  const { data: session } = useSession();
  const { data } = useCredits();

  if (!session) return null;

  return (
    <div
      className="flex items-center gap-1.5 rounded-md border border-gold-700/40 bg-celestial-800/60 px-2.5 py-1.5 text-sm"
      title={`${data?.credits ?? 0} credits remaining`}
    >
      <Coins className="h-4 w-4 text-gold-400" />
      <span className="font-semibold tabular-nums text-gold-300">
        {data?.credits ?? 0}
      </span>
    </div>
  );
}
