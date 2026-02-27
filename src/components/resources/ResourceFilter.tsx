"use client";

import { cn } from "@/lib/utils";

const TYPES = [
  { value: "", label: "All" },
  { value: "ARTICLE", label: "Articles" },
  { value: "PDF", label: "PDFs" },
  { value: "CASE_STUDY", label: "Case Studies" },
  { value: "DATASET", label: "Datasets" },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "fundamentals", label: "Fundamentals" },
  { value: "stars", label: "Stars" },
  { value: "palaces", label: "Palaces" },
  { value: "transformers", label: "Four Transformers" },
  { value: "case-analysis", label: "Case Analysis" },
  { value: "history", label: "History" },
];

interface ResourceFilterProps {
  activeType: string;
  activeCategory: string;
  onTypeChange: (type: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function ResourceFilter({
  activeType,
  activeCategory,
  onTypeChange,
  onCategoryChange,
}: ResourceFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeType === value
                ? "bg-gold-500 text-celestial-900"
                : "border border-gold-700/30 text-parchment-400 hover:border-gold-500/50 hover:text-parchment-200"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onCategoryChange(value)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-all",
              activeCategory === value
                ? "bg-celestial-600 text-parchment-200"
                : "text-parchment-600 hover:bg-celestial-800 hover:text-parchment-400"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
