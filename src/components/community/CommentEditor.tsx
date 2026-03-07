"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCreateComment } from "@/hooks/useCommunity";

interface CommentEditorProps {
  postId: string;
  parentId?: string;
  replyToName?: string;
  onCancel?: () => void;
}

export default function CommentEditor({ postId, parentId, replyToName, onCancel }: CommentEditorProps) {
  const [content, setContent] = useState("");
  const createComment = useCreateComment();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    await createComment.mutateAsync({ postId, content, parentId });
    setContent("");
    onCancel?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {replyToName && (
        <div className="flex items-center gap-2 text-xs text-parchment-500">
          <span>Replying to @{replyToName}</span>
          {onCancel && (
            <button type="button" onClick={onCancel} className="text-parchment-600 hover:text-parchment-400">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
          rows={parentId ? 2 : 3}
          className="flex-1 resize-none rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-2 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500/50 focus:outline-none"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={createComment.isPending || !content.trim()}>
          <Send className="mr-1.5 h-3.5 w-3.5" />
          {createComment.isPending ? "Sending..." : parentId ? "Reply" : "Comment"}
        </Button>
      </div>
    </form>
  );
}
