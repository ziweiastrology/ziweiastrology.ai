"use client";

import Link from "next/link";
import { Bell, UserPlus, MessageSquare, ThumbsUp, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications, useMarkRead } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/Button";

const TYPE_ICONS: Record<string, typeof Bell> = {
  SYSTEM: Bell,
  FOLLOW: UserPlus,
  COMMENT: MessageSquare,
  VOTE: ThumbsUp,
  MATCH: Sparkles,
};

export default function NotificationList() {
  const { data, isLoading } = useNotifications();
  const markRead = useMarkRead();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-gold-400" />
      </div>
    );
  }

  const notifications = data?.notifications || [];

  return (
    <div>
      {notifications.length > 0 && (
        <div className="mb-3 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => markRead.mutate(undefined)}
            disabled={markRead.isPending}
          >
            Mark all as read
          </Button>
        </div>
      )}

      <div className="space-y-1">
        {notifications.map((notif: {
          id: string;
          type: string;
          title: string;
          content: string;
          link: string | null;
          read: boolean;
          createdAt: string;
        }) => {
          const Icon = TYPE_ICONS[notif.type] || Bell;
          return (
            <Link
              key={notif.id}
              href={notif.link || "#"}
              onClick={() => !notif.read && markRead.mutate([notif.id])}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-celestial-800/50",
                !notif.read && "bg-celestial-800/30"
              )}
            >
              <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", !notif.read ? "text-gold-400" : "text-parchment-600")} />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm", !notif.read ? "font-semibold text-parchment-200" : "text-parchment-400")}>
                  {notif.title}
                </p>
                <p className="text-xs text-parchment-600 truncate">{notif.content}</p>
                <p className="mt-0.5 text-xs text-parchment-700">
                  {new Date(notif.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              {!notif.read && <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-400" />}
            </Link>
          );
        })}
        {notifications.length === 0 && (
          <p className="py-8 text-center text-sm text-parchment-600">No notifications yet.</p>
        )}
      </div>
    </div>
  );
}
