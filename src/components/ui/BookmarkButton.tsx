"use client";

import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useBookmarks, useAddBookmark, useRemoveBookmark } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  targetType: string;
  targetId: string;
  className?: string;
}

export default function BookmarkButton({
  targetType,
  targetId,
  className,
}: BookmarkButtonProps) {
  const { data: session } = useSession();
  const { data } = useBookmarks(targetType);
  const addMutation = useAddBookmark();
  const removeMutation = useRemoveBookmark();

  // Don't render for unauthenticated or FREE users
  const tier = session?.user?.tier;
  if (!session || !tier || tier === "FREE") return null;

  const existing = data?.bookmarks?.find((b) => b.targetId === targetId);
  const isBookmarked = !!existing;
  const isPending = addMutation.isPending || removeMutation.isPending;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;

    if (isBookmarked && existing) {
      removeMutation.mutate(existing.id);
    } else {
      addMutation.mutate({ targetType, targetId });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      title={isBookmarked ? "Remove bookmark" : "Bookmark"}
      className={cn(
        "rounded p-1 transition-colors",
        isBookmarked
          ? "text-gold-400 hover:text-gold-300"
          : "text-parchment-600 hover:text-parchment-400",
        isPending && "opacity-50",
        className
      )}
    >
      <Bookmark
        className="h-4 w-4"
        fill={isBookmarked ? "currentColor" : "none"}
      />
    </button>
  );
}
