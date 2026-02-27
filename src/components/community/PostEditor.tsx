"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const POST_TYPES = [
  { value: "DISCUSSION", label: "Discussion" },
  { value: "PILLAR_DATA", label: "Pillar Data" },
  { value: "EVENT_ANALYSIS", label: "Event Analysis" },
  { value: "CHART_ANALYSIS", label: "Chart Analysis" },
];

interface PostEditorProps {
  onSubmit?: (data: { title: string; content: string; type: string; category?: string }) => void;
}

export default function PostEditor({ onSubmit }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("DISCUSSION");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

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

    setLoading(true);
    try {
      onSubmit?.({ title, content, type });
      toast.success("Post published!");
      setTitle("");
      setContent("");
    } catch {
      toast.error("Failed to publish post");
    }
    setLoading(false);
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
          className={`w-full rounded-md border bg-celestial-900/40 px-4 py-2.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none ${errors.title ? "border-quantum-red/50 focus:border-quantum-red" : "border-gold-700/20 focus:border-gold-500"}`}
        />
        {errors.title && <p className="mt-1 text-xs text-quantum-red">{errors.title}</p>}
      </div>

      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: undefined })); }}
          placeholder="Share your analysis, insight, or question... (Markdown supported)"
          rows={4}
          className={`w-full resize-none rounded-md border bg-celestial-900/40 px-4 py-2.5 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none ${errors.content ? "border-quantum-red/50 focus:border-quantum-red" : "border-gold-700/20 focus:border-gold-500"}`}
        />
        {errors.content && <p className="mt-1 text-xs text-quantum-red">{errors.content}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={loading || !title.trim()}>
          <Send className="mr-1.5 h-3.5 w-3.5" />
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}
