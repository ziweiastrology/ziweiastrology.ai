"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Save,
  Loader2,
  Tag,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  Briefcase,
  Palette,
  Users,
  Target,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAvailableTags, useUpdateTags, useMyProfile } from "@/hooks/useProfile";

// ─── Types ───

interface TagNode {
  id: string;
  name: string;
  nameCn: string;
  slug: string | null;
  category: string;
  depth: number;
  children?: TagNode[];
}

// ─── Category icons + colors ───

const CATEGORY_META: Record<
  string,
  { icon: typeof Sparkles; color: string; bgColor: string; borderColor: string }
> = {
  METAPHYSICS: {
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  LIFESTYLE: {
    icon: Heart,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
  },
  BUSINESS: {
    icon: Briefcase,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  ARTS: {
    icon: Palette,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  SOCIAL: {
    icon: Users,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  GOAL: {
    icon: Target,
    color: "text-gold-400",
    bgColor: "bg-gold-500/10",
    borderColor: "border-gold-500/30",
  },
};

// ─── Helpers ───

function collectLeafIds(node: TagNode): string[] {
  if (!node.children?.length) return [node.id];
  return node.children.flatMap(collectLeafIds);
}

function countSelectedInGroup(node: TagNode, selected: Set<string>): number {
  const leafIds = collectLeafIds(node);
  return leafIds.filter((id) => selected.has(id)).length;
}

// ─── Main Component ───

export default function TagSelector() {
  const { data: tree, isLoading: tagsLoading } = useAvailableTags();
  const { data: profile } = useMyProfile();
  const updateTags = useUpdateTags();

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  // Wizard navigation: step 0 = overview, step 1 = subcategory, step 2 = leaf picker
  const [step, setStep] = useState(0);
  const [activeGroup, setActiveGroup] = useState<TagNode | null>(null);
  const [activeSub, setActiveSub] = useState<TagNode | null>(null);

  const tier = profile?.tier || "FREE";
  const maxTags =
    tier === "FREE" ? 5 : tier === "BASIC" ? 15 : tier === "PREMIUM" ? 30 : Infinity;

  useEffect(() => {
    if (profile?.tags) {
      setSelected(new Set(profile.tags.map((t: { tagId: string }) => t.tagId)));
    }
  }, [profile]);

  const toggleTag = useCallback(
    (tagId: string) => {
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
    },
    [maxTags]
  );

  async function handleSave() {
    setSaved(false);
    await updateTags.mutateAsync([...selected]);
    setSaved(true);
  }

  function goToGroup(group: TagNode) {
    setActiveGroup(group);
    // GOAL has flat children (depth 1 leaves) — skip subcategory step
    if (group.category === "GOAL") {
      setActiveSub(group);
      setStep(2);
    } else {
      setStep(1);
    }
  }

  function goToSub(sub: TagNode) {
    setActiveSub(sub);
    setStep(2);
  }

  function goBack() {
    if (step === 2 && activeGroup?.category !== "GOAL") {
      setActiveSub(null);
      setStep(1);
    } else {
      setActiveGroup(null);
      setActiveSub(null);
      setStep(0);
    }
  }

  if (tagsLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-celestial-800/30" />;
  }

  // Filter to only new categories (exclude deprecated INDUSTRY, INTEREST, ASTRO)
  const groups: TagNode[] = (tree || []).filter(
    (g: TagNode) => !["INDUSTRY", "INTEREST", "ASTRO"].includes(g.category)
  );

  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
      {/* Header */}
      <h2
        className="mb-1 text-lg font-semibold text-parchment-200"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        <Tag className="mr-2 inline h-5 w-5 text-gold-400" />
        Interest Tags
      </h2>
      <p className="mb-4 text-xs text-parchment-600">
        Select up to {maxTags === Infinity ? "unlimited" : maxTags} tags to match with
        like-minded members
      </p>

      {/* Wizard Steps */}
      <div className="min-h-[280px]">
        {step === 0 && (
          <CategoryOverview
            groups={groups}
            selected={selected}
            onSelect={goToGroup}
          />
        )}
        {step === 1 && activeGroup && (
          <SubcategoryList
            group={activeGroup}
            selected={selected}
            onDrillIn={goToSub}
            onToggle={toggleTag}
            onBack={goBack}
            maxReached={selected.size >= maxTags}
          />
        )}
        {step === 2 && activeSub && (
          <LeafPicker
            sub={activeSub}
            selected={selected}
            onToggle={toggleTag}
            onBack={goBack}
            maxReached={selected.size >= maxTags}
            isGoal={activeGroup?.category === "GOAL"}
          />
        )}
      </div>

      {/* Bottom Bar */}
      <SelectionSummary
        selected={selected}
        maxTags={maxTags}
        allGroups={groups}
        onRemove={toggleTag}
        onSave={handleSave}
        isSaving={updateTags.isPending}
        saved={saved}
      />
    </div>
  );
}

// ─── Step 0: Category Overview ───

function CategoryOverview({
  groups,
  selected,
  onSelect,
}: {
  groups: TagNode[];
  selected: Set<string>;
  onSelect: (g: TagNode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {groups.map((group) => {
        const meta = CATEGORY_META[group.category] || CATEGORY_META.GOAL;
        const Icon = meta.icon;
        const count = countSelectedInGroup(group, selected);

        return (
          <button
            key={group.id}
            onClick={() => onSelect(group)}
            className={`group relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:scale-[1.02] ${meta.borderColor} ${meta.bgColor} hover:border-opacity-60`}
          >
            <Icon className={`h-7 w-7 ${meta.color}`} />
            <div className="text-center">
              <div className="text-sm font-medium text-parchment-200">{group.name}</div>
              <div className="text-xs text-parchment-600">{group.nameCn}</div>
            </div>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-celestial-900">
                {count}
              </span>
            )}
            <ChevronRight className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-700 transition-transform group-hover:translate-x-0.5" />
          </button>
        );
      })}
    </div>
  );
}

// ─── Step 1: Subcategory List ───

function SubcategoryList({
  group,
  selected,
  onDrillIn,
  onToggle,
  onBack,
  maxReached,
}: {
  group: TagNode;
  selected: Set<string>;
  onDrillIn: (sub: TagNode) => void;
  onToggle: (id: string) => void;
  onBack: () => void;
  maxReached: boolean;
}) {
  const meta = CATEGORY_META[group.category] || CATEGORY_META.GOAL;

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-3 flex items-center gap-1 text-xs text-parchment-500 hover:text-parchment-300"
      >
        <ChevronLeft className="h-3 w-3" /> All Categories
      </button>
      <h3 className={`mb-3 text-sm font-semibold ${meta.color}`}>
        {group.name}{" "}
        <span className="text-parchment-600">{group.nameCn}</span>
      </h3>
      <div className="space-y-2">
        {(group.children || []).map((sub) => {
          const count = countSelectedInGroup(sub, selected);
          const hasLeaves = sub.children && sub.children.length > 0;
          const isSelected = selected.has(sub.id);

          return (
            <div
              key={sub.id}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all ${
                isSelected
                  ? `${meta.borderColor} ${meta.bgColor}`
                  : "border-gold-700/15 hover:border-gold-700/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Toggle subcategory directly as a tag */}
                <button
                  onClick={() => onToggle(sub.id)}
                  disabled={!isSelected && maxReached}
                  className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                    isSelected
                      ? "border-gold-500 bg-gold-500/30 text-gold-400"
                      : "border-parchment-700 text-transparent hover:border-parchment-500 disabled:opacity-30"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </button>
                <div>
                  <span className="text-sm text-parchment-300">{sub.name}</span>
                  <span className="ml-1.5 text-xs text-parchment-600">{sub.nameCn}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {count > 0 && (
                  <span className="rounded-full bg-gold-500/20 px-1.5 py-0.5 text-[10px] font-medium text-gold-400">
                    {count}
                  </span>
                )}
                {hasLeaves && (
                  <button
                    onClick={() => onDrillIn(sub)}
                    className="rounded p-1 text-parchment-600 hover:bg-celestial-700/50 hover:text-parchment-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Leaf Tag Picker ───

function LeafPicker({
  sub,
  selected,
  onToggle,
  onBack,
  maxReached,
  isGoal,
}: {
  sub: TagNode;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onBack: () => void;
  maxReached: boolean;
  isGoal: boolean;
}) {
  const leaves = sub.children || [];

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-3 flex items-center gap-1 text-xs text-parchment-500 hover:text-parchment-300"
      >
        <ChevronLeft className="h-3 w-3" /> {isGoal ? "All Categories" : "Back"}
      </button>
      <h3 className="mb-3 text-sm font-semibold text-parchment-300">
        {sub.name}{" "}
        <span className="text-parchment-600">{sub.nameCn}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {leaves.map((tag) => {
          const isSelected = selected.has(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => onToggle(tag.id)}
              disabled={!isSelected && maxReached}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                isSelected
                  ? "border border-gold-500 bg-gold-500/20 text-gold-400"
                  : "border border-gold-700/20 text-parchment-500 hover:border-gold-700/40 hover:text-parchment-300 disabled:opacity-40"
              }`}
            >
              {tag.nameCn} {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Bottom Bar: Selection Summary ───

function SelectionSummary({
  selected,
  maxTags,
  allGroups,
  onRemove,
  onSave,
  isSaving,
  saved,
}: {
  selected: Set<string>;
  maxTags: number;
  allGroups: TagNode[];
  onRemove: (id: string) => void;
  onSave: () => void;
  isSaving: boolean;
  saved: boolean;
}) {
  // Build id→tag lookup from tree
  const tagMap = new Map<string, TagNode>();
  function walk(nodes: TagNode[]) {
    for (const n of nodes) {
      tagMap.set(n.id, n);
      if (n.children) walk(n.children);
    }
  }
  walk(allGroups);

  const selectedTags = [...selected]
    .map((id) => tagMap.get(id))
    .filter(Boolean) as TagNode[];

  return (
    <div className="mt-4 border-t border-gold-700/15 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-parchment-500">
          {selected.size} / {maxTags === Infinity ? "∞" : maxTags} selected
        </span>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-quantum-green">Saved!</span>}
          <Button onClick={onSave} disabled={isSaving} size="sm">
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Tags
          </Button>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 rounded-full border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 text-[11px] text-gold-400"
            >
              {tag.nameCn}
              <button
                onClick={() => onRemove(tag.id)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-gold-500/20"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
