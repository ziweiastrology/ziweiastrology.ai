"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAvailableTags, useUpdateTags, useMyProfile } from "@/hooks/useProfile";

const CATEGORY_LABELS: Record<string, { label: string; labelCn: string }> = {
  INDUSTRY: { label: "Industry", labelCn: "行业" },
  INTEREST: { label: "Interest", labelCn: "兴趣" },
  GOAL: { label: "Goal", labelCn: "目标" },
  ASTRO: { label: "Astrology", labelCn: "命理" },
};

export default function TagSelector() {
  const { data: tags, isLoading: tagsLoading } = useAvailableTags();
  const { data: profile } = useMyProfile();
  const updateTags = useUpdateTags();

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  // Determine max tags from profile tier
  const tier = profile?.tier || "FREE";
  const maxTags = tier === "FREE" ? 3 : tier === "BASIC" ? 10 : tier === "PREMIUM" ? 20 : Infinity;

  useEffect(() => {
    if (profile?.tags) {
      setSelected(new Set(profile.tags.map((t: { tagId: string }) => t.tagId)));
    }
  }, [profile]);

  function toggleTag(tagId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else if (next.size < maxTags) {
        next.add(tagId);
      }
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaved(false);
    await updateTags.mutateAsync([...selected]);
    setSaved(true);
  }

  if (tagsLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-celestial-800/30" />;
  }

  // Group tags by category
  const grouped = (tags || []).reduce(
    (acc: Record<string, typeof tags>, tag: { category: string }) => {
      if (!acc[tag.category]) acc[tag.category] = [];
      acc[tag.category].push(tag);
      return acc;
    },
    {} as Record<string, typeof tags>
  );

  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
      <h2
        className="mb-1 text-lg font-semibold text-parchment-200"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        <Tag className="mr-2 inline h-5 w-5 text-gold-400" />
        Interest Tags
      </h2>
      <p className="mb-4 text-xs text-parchment-600">
        Select up to {maxTags === Infinity ? "unlimited" : maxTags} tags ({selected.size} selected)
      </p>

      <div className="space-y-4">
        {Object.entries(grouped).map(([category, categoryTags]) => (
          <div key={category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-parchment-500">
              {CATEGORY_LABELS[category]?.label || category}{" "}
              <span className="text-parchment-700">{CATEGORY_LABELS[category]?.labelCn}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(categoryTags as { id: string; name: string; nameCn: string }[]).map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  disabled={!selected.has(tag.id) && selected.size >= maxTags}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selected.has(tag.id)
                      ? "border border-gold-500 bg-gold-500/20 text-gold-400"
                      : "border border-gold-700/20 text-parchment-500 hover:border-gold-700/40 hover:text-parchment-300 disabled:opacity-40"
                  }`}
                >
                  {tag.nameCn} {tag.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={handleSave} disabled={updateTags.isPending} size="sm">
          {updateTags.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Tags
        </Button>
        {saved && <span className="text-xs text-quantum-green">Saved!</span>}
      </div>
    </div>
  );
}
