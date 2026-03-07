"use client";

import { useState } from "react";
import { Send, X, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCreatePost } from "@/hooks/useCommunity";

const POST_TYPES = [
  { value: "DISCUSSION", label: "Discussion" },
  { value: "PILLAR_DATA", label: "Pillar Data" },
  { value: "EVENT_ANALYSIS", label: "Event Analysis" },
  { value: "CHART_ANALYSIS", label: "Chart Analysis" },
];

export default function PostEditor() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("DISCUSSION");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const createPost = useCreatePost();

  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  if (!session) {
    return (
      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-5 text-center">
        <p className="text-sm text-parchment-400 mb-3">
          Sign in to share your analysis, insight, or question with the community.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 rounded-md border border-gold-700/40 px-4 py-2 text-sm font-medium text-gold-400 transition-all hover:border-gold-500 hover:bg-gold-500/10"
        >
          <LogIn className="h-4 w-4" />
          Sign in to post
        </Link>
      </div>
    );
  }

  function addTag() {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    await createPost.mutateAsync({ title, content, type, tags });
    setTitle("");
    setContent("");
    setTags([]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-5"
    >
      <div className="mb-3 flex gap-2">
        {POST_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              type === t.value
                ? "bg-gold-500/20 text-gold-400"
                : "text-parchment-600 hover:text-parchment-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: undefined })); }}
          placeholder="Post title..."
          className={`w-full rounded-md border bg-celestial-900/40 px-4 py-2.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none ${errors.title ? "border-quantum-red/50" : "border-gold-700/20 focus:border-gold-500"}`}
        />
        {errors.title && <p className="mt-1 text-xs text-quantum-red">{errors.title}</p>}
      </div>

      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: undefined })); }}
          placeholder="Share your analysis, insight, or question... (Markdown supported)"
          rows={4}
          className={`w-full resize-none rounded-md border bg-celestial-900/40 px-4 py-2.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none ${errors.content ? "border-quantum-red/50" : "border-gold-700/20 focus:border-gold-500"}`}
        />
        {errors.content && <p className="mt-1 text-xs text-quantum-red">{errors.content}</p>}
      </div>

      {/* Tags */}
      <div className="mb-3">
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder="Add tags (press Enter)"
            className="flex-1 rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-1.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none"
          />
        </div>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-gold-500/10 px-2 py-0.5 text-xs text-gold-400"
              >
                {tag}
                <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={createPost.isPending || !title.trim()}>
          <Send className="mr-1.5 h-3.5 w-3.5" />
          {createPost.isPending ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}
