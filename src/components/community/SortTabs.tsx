"use client";

import { Flame, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const SORTS = [
  { key: "hot", label: "热门 Hot", icon: Flame },
  { key: "new", label: "最新 New", icon: Clock },
  { key: "following", label: "关注 Following", icon: Users },
] as const;

interface SortTabsProps {
  active: string;
  onChange: (sort: "hot" | "new" | "following") => void;
}

export default function SortTabs({ active, onChange }: SortTabsProps) {
  return (
    <div className="flex gap-1">
      {SORTS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            active === key
              ? "bg-gold-500/20 text-gold-400"
              : "text-parchment-600 hover:text-parchment-400"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
