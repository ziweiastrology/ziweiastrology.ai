"use client";

import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import { useUnreadCounts, useNotifications } from "@/hooks/useNotifications";

export default function NotificationCard() {
  const { data: unread } = useUnreadCounts();
  const { data: notifData } = useNotifications();
  const notifications = notifData?.notifications?.slice(0, 3) || [];

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-800/30 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-parchment-200">
          <Bell className="h-4 w-4 text-gold-400" />
          Notifications
        </h3>
        {(unread?.notifications ?? 0) > 0 && (
          <span className="rounded-full bg-quantum-red/80 px-2 py-0.5 text-xs font-semibold text-white">
            {unread.notifications}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n: { id: string; title: string; content: string; read: boolean; createdAt: string }) => (
          <div key={n.id} className="flex items-start gap-2">
            <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? "bg-parchment-700" : "bg-gold-400"}`} />
            <div className="min-w-0">
              <p className="text-xs text-parchment-400 truncate">{n.content}</p>
              <p className="text-xs text-parchment-700">
                {new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-xs text-parchment-600">No notifications</p>
        )}
      </div>

      <Link
        href="/messages"
        className="mt-3 flex items-center gap-1 text-xs text-gold-400 hover:underline"
      >
        View all <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
