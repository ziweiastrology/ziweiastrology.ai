"use client";

import { useState, useCallback } from "react";
import { MessageSquare, Crown, Reply, ChevronDown, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CommentAuthor {
  id: string;
  name: string | null;
  image: string | null;
  tier: string;
}

interface CommentData {
  id: string;
  content: string;
  author: CommentAuthor;
  replies?: CommentData[];
  createdAt: string;
}

interface CaseCommentSectionProps {
  caseId: string;
}

function TierBadge({ tier }: { tier: string }) {
  if (tier === "FREE") return null;
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        tier === "SIFU"
          ? "bg-gold-500/20 text-gold-400"
          : tier === "PREMIUM"
            ? "bg-purple-500/20 text-purple-300"
            : "bg-celestial-600/30 text-parchment-400"
      )}
    >
      {tier}
    </span>
  );
}

function CommentItem({
  comment,
  caseId,
  depth = 0,
  onReplyAdded,
}: {
  comment: CommentData;
  caseId: string;
  depth?: number;
  onReplyAdded: () => void;
}) {
  const { data: session } = useSession();
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReply = async () => {
    if (!replyText.trim() || !session?.user) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/case-studies/${caseId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText.trim(), parentId: comment.id }),
      });
      if (res.ok) {
        setReplyText("");
        setShowReply(false);
        onReplyAdded();
        toast.success("Reply posted");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to reply");
      }
    } catch {
      toast.error("Failed to reply");
    } finally {
      setSubmitting(false);
    }
  };

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
          <TierBadge tier={comment.author.tier} />
          <span className="text-parchment-700">&middot;</span>
          <span className="text-parchment-700">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed text-parchment-400">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="mt-2 flex items-center gap-3 text-xs">
          {session?.user && depth < 2 && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-parchment-600 transition-colors hover:text-parchment-300"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
          )}
        </div>

        {/* Reply input */}
        {showReply && (
          <div className="mt-3 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleReply()}
              className="flex-1 rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-1.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500 focus:outline-none"
            />
            <button
              onClick={handleReply}
              disabled={submitting || !replyText.trim()}
              className="rounded-md bg-gold-500/20 px-3 py-1.5 text-xs font-medium text-gold-400 transition-colors hover:bg-gold-500/30 disabled:opacity-50"
            >
              Reply
            </button>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          caseId={caseId}
          depth={depth + 1}
          onReplyAdded={onReplyAdded}
        />
      ))}
    </div>
  );
}

export default function CaseCommentSection({ caseId }: CaseCommentSectionProps) {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/case-studies/${caseId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setTotal(data.pagination.total);
        setLoaded(true);
      }
    } catch {
      toast.error("Failed to load comments");
    }
  }, [caseId]);

  const handleExpand = () => {
    if (!expanded && !loaded) {
      fetchComments();
    }
    setExpanded(!expanded);
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    if (!session?.user) {
      toast.info("Sign in to comment");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/case-studies/${caseId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      if (res.ok) {
        setNewComment("");
        fetchComments();
        toast.success("Comment posted");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to post comment");
      }
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
      {/* Toggle header */}
      <button
        onClick={handleExpand}
        className="flex items-center gap-2 text-xs font-medium text-parchment-500 transition-colors hover:text-parchment-300"
      >
        <MessageSquare className="h-3.5 w-3.5" />
        <span>
          {loaded ? total : "..."} Comment{total !== 1 ? "s" : ""}
          {!expanded && " — View discussion"}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-3 space-y-4">
          {/* New comment input */}
          {session?.user ? (
            <div className="flex gap-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={2}
                className="flex-1 resize-none rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-2 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500 focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                disabled={submitting || !newComment.trim()}
                className="self-end rounded-md bg-gold-500/20 p-2 text-gold-400 transition-colors hover:bg-gold-500/30 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-parchment-600">
              Sign in to join the discussion.
            </p>
          )}

          {/* Comment list */}
          <div className="space-y-1">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                caseId={caseId}
                onReplyAdded={fetchComments}
              />
            ))}
            {loaded && comments.length === 0 && (
              <p className="py-4 text-center text-sm text-parchment-600">
                No comments yet. Be the first to share your thoughts.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
