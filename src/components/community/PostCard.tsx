import Link from "next/link";
import { MessageSquare, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import VoteButton from "./VoteButton";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  DISCUSSION: { label: "Discussion", color: "text-celestial-300" },
  PILLAR_DATA: { label: "Pillar Data", color: "text-quantum-cyan" },
  EVENT_ANALYSIS: { label: "Event Analysis", color: "text-quantum-green" },
  CHART_ANALYSIS: { label: "Chart Analysis", color: "text-quantum-orange" },
};

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  type: string;
  category?: string | null;
  author: {
    id: string;
    name: string | null;
    tier: string;
  };
  voteScore: number;
  commentCount: number;
  pinned?: boolean;
  createdAt: string;
  href: string;
}

export default function PostCard({
  id,
  title,
  content,
  type,
  category,
  author,
  voteScore,
  commentCount,
  pinned,
  createdAt,
  href,
}: PostCardProps) {
  const typeConfig = TYPE_LABELS[type] || TYPE_LABELS.DISCUSSION;

  return (
    <div
      className={cn(
        "rounded-lg border bg-celestial-800/30 p-5 transition-all hover:bg-celestial-800/50",
        pinned
          ? "border-gold-500/40 bg-celestial-800/40"
          : "border-gold-700/20"
      )}
    >
      <div className="flex gap-4">
        {/* Vote column */}
        <VoteButton postId={id} score={voteScore} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            {pinned && (
              <span className="rounded bg-gold-500/20 px-1.5 py-0.5 text-gold-400 font-semibold">
                Pinned
              </span>
            )}
            <span className={cn("font-medium", typeConfig.color)}>
              {typeConfig.label}
            </span>
            {category && (
              <span className="text-parchment-600">{category}</span>
            )}
            <span className="text-parchment-700">·</span>
            <span className="flex items-center gap-1 text-parchment-500">
              {author.tier === "SIFU" && (
                <Crown className="h-3 w-3 text-gold-400" />
              )}
              {author.name || "Anonymous"}
            </span>
            <span className="text-parchment-700">·</span>
            <span className="text-parchment-700">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <Link href={href}>
            <h3 className="mb-1 text-lg font-semibold text-parchment-200 hover:text-gold-400 transition-colors">
              {title}
            </h3>
          </Link>

          {/* Preview */}
          <p className="mb-3 text-sm text-parchment-500 line-clamp-2">
            {content.replace(/[#*`]/g, "").slice(0, 200)}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 text-xs text-parchment-600">
            <Link
              href={href}
              className="flex items-center gap-1 hover:text-parchment-400 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
