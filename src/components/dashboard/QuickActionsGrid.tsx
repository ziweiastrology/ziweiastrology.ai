"use client";

import Link from "next/link";
import {
  Star,
  MessageSquare,
  BookOpen,
  FileText,
  Users,
  Bookmark,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    label: "Chart Reading",
    href: "/",
    icon: Star,
    color: "text-gold-400",
  },
  {
    label: "Community",
    href: "/community",
    icon: MessageSquare,
    color: "text-quantum-cyan",
  },
  {
    label: "Academy",
    href: "/academy",
    icon: BookOpen,
    color: "text-quantum-green",
  },
  {
    label: "Resources",
    href: "/resources",
    icon: FileText,
    color: "text-quantum-orange",
  },
  {
    label: "Groups",
    href: "/community/groups",
    icon: Users,
    color: "text-celestial-300",
  },
  {
    label: "Bookmarks",
    href: "/dashboard#bookmarks",
    icon: Bookmark,
    color: "text-parchment-300",
  },
];

export default function QuickActionsGrid() {
  return (
    <div className="gold-frame rounded-xl p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
        Quick Actions
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-1.5 rounded-lg p-3 text-center transition-colors hover:bg-celestial-700/30"
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-xs text-parchment-400">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
