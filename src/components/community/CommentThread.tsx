"use client";

import { useState } from "react";
import { Crown, Reply, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentAuthor {
  id: string;
  name: string | null;
  tier: string;
}

interface CommentData {
  id: string;
  content: string;
  author: CommentAuthor;
  votes: { value: number }[];
  replies?: CommentData[];
  createdAt: string;
}

function Comment({
  comment,
  depth = 0,
}: {
  comment: CommentData;
  depth?: number;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const voteScore = comment.votes?.reduce((sum, v) => sum + v.value, 0) ?? 0;

  return (
    <div className={cn("border-l border-gold-700/10 pl-4", depth > 0 && "ml-4")}>
      <div className="py-3">
        {/* Author */}
        <div className="mb-1.5 flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-medium text-parchment-300">
            {comment.author.tier === "SIFU" && (
              <Crown className="h-3 w-3 text-gold-400" />
            )}
            {comment.author.name || "Anonymous"}
          </span>
          <span className="text-parchment-700">·</span>
          <span className="text-parchment-700">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-parchment-400 leading-relaxed">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="mt-2 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <button className="text-parchment-600 hover:text-parchment-300">
              <ChevronUp className="h-4 w-4" />
            </button>
            <span
              className={cn(
                "tabular-nums",
                voteScore > 0
                  ? "text-gold-400"
                  : voteScore < 0
                    ? "text-quantum-red/70"
                    : "text-parchment-600"
              )}
            >
              {voteScore}
            </span>
            <button className="text-parchment-600 hover:text-parchment-300">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1 text-parchment-600 hover:text-parchment-300 transition-colors"
          >
            <Reply className="h-3.5 w-3.5" />
            Reply
          </button>
        </div>

        {/* Reply input */}
        {showReply && (
          <div className="mt-3 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-1.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500 focus:outline-none"
            />
            <button className="rounded-md bg-gold-500/20 px-3 py-1.5 text-xs font-medium text-gold-400 hover:bg-gold-500/30 transition-colors">
              Reply
            </button>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

interface CommentThreadProps {
  comments: CommentData[];
}

export default function CommentThread({ comments }: CommentThreadProps) {
  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {comments.length === 0 && (
        <p className="py-8 text-center text-sm text-parchment-600">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}
    </div>
  );
}
