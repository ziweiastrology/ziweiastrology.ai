"use client";

import { useState } from "react";
import { Crown, Reply, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVote } from "@/hooks/useCommunity";
import CommentEditor from "./CommentEditor";

interface CommentAuthor {
  id: string;
  name: string | null;
  tier: string;
  avatarUrl?: string | null;
}

interface CommentData {
  id: string;
  content: string;
  author: CommentAuthor;
  votes: { value: number; userId: string }[];
  replies?: CommentData[];
  createdAt: string;
}

function Comment({
  comment,
  postId,
  depth = 0,
}: {
  comment: CommentData;
  postId: string;
  depth?: number;
}) {
  const [showReply, setShowReply] = useState(false);
  const voteScore = comment.votes?.reduce((sum, v) => sum + v.value, 0) ?? 0;
  const vote = useVote();

  return (
    <div className={cn("border-l border-gold-700/10 pl-4", depth > 0 && "ml-4")}>
      <div className="py-3">
        <div className="mb-1.5 flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-medium text-parchment-300">
            {comment.author.tier === "SIFU" && <Crown className="h-3 w-3 text-gold-400" />}
            {comment.author.name || "Anonymous"}
          </span>
          <span className="text-parchment-700">·</span>
          <span className="text-parchment-700">
            {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>

        <p className="text-sm text-parchment-400 leading-relaxed">{comment.content}</p>

        <div className="mt-2 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => vote.mutate({ commentId: comment.id, value: 1 })}
              className="text-parchment-600 hover:text-parchment-300"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <span className={cn("tabular-nums", voteScore > 0 ? "text-gold-400" : voteScore < 0 ? "text-quantum-red/70" : "text-parchment-600")}>
              {voteScore}
            </span>
            <button
              onClick={() => vote.mutate({ commentId: comment.id, value: -1 })}
              className="text-parchment-600 hover:text-parchment-300"
            >
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

        {showReply && (
          <div className="mt-3">
            <CommentEditor
              postId={postId}
              parentId={comment.id}
              replyToName={comment.author.name || "Anonymous"}
              onCancel={() => setShowReply(false)}
            />
          </div>
        )}
      </div>

      {comment.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} postId={postId} depth={depth + 1} />
      ))}
    </div>
  );
}

interface CommentThreadProps {
  comments: CommentData[];
  postId: string;
}

export default function CommentThread({ comments, postId }: CommentThreadProps) {
  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
      {comments.length === 0 && (
        <p className="py-8 text-center text-sm text-parchment-600">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}
    </div>
  );
}
