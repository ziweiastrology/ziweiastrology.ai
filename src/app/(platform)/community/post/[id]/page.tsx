"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Crown, Loader2 } from "lucide-react";
import { usePost } from "@/hooks/useCommunity";
import VoteButton from "@/components/community/VoteButton";
import CommentThread from "@/components/community/CommentThread";
import CommentEditor from "@/components/community/CommentEditor";
import BookmarkButton from "@/components/ui/BookmarkButton";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  DISCUSSION: { label: "Discussion", color: "text-celestial-300" },
  PILLAR_DATA: { label: "Pillar Data", color: "text-quantum-cyan" },
  EVENT_ANALYSIS: { label: "Event Analysis", color: "text-quantum-green" },
  CHART_ANALYSIS: { label: "Chart Analysis", color: "text-quantum-orange" },
};

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: postData, isLoading } = usePost(id);
  const post = postData?.pages?.[0];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
        </div>
      </div>
    );
  }

  if (!post || post.error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 text-center">
          <p className="text-parchment-500">Post not found.</p>
          <Link href="/community/feed" className="mt-2 inline-block text-sm text-gold-400 hover:underline">
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  const typeConfig = TYPE_LABELS[post.type] || TYPE_LABELS.DISCUSSION;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link href="/community/feed" className="mb-4 inline-flex items-center gap-1 text-sm text-parchment-500 hover:text-parchment-300">
        <ArrowLeft className="h-4 w-4" />
        Back to Feed
      </Link>

      {/* Post */}
      <div className="mb-6 rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <div className="flex gap-4">
          <VoteButton postId={id} score={post.score || 0} userVote={post.userVote} />

          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
              <span className="text-parchment-700">·</span>
              <Link href={`/profile/${post.author.id}`} className="flex items-center gap-1 text-parchment-500 hover:text-parchment-300">
                {post.author.tier === "SIFU" && <Crown className="h-3 w-3 text-gold-400" />}
                {post.author.name || "Anonymous"}
              </Link>
              <span className="text-parchment-700">·</span>
              <span className="text-parchment-700">
                {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1 text-parchment-700">
                <Eye className="h-3 w-3" />
                {post.viewCount || 0}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-xl font-bold text-parchment-200" style={{ fontFamily: "var(--font-cinzel)" }}>
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose-ancient text-sm text-parchment-400 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-gold-500/10 px-2 py-0.5 text-xs text-gold-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-4">
              <BookmarkButton targetType="post" targetId={id} />
            </div>
          </div>
        </div>
      </div>

      {/* Comment Editor */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-parchment-200">Add a Comment</h3>
        <CommentEditor postId={id} />
      </div>

      {/* Comments */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-parchment-200">
          {post._count?.comments || 0} Comments
        </h3>
        <CommentThread comments={post.comments || []} postId={id} />
      </div>
    </div>
  );
}
