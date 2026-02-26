"use client";

import { useMemo } from "react";
import { STARS, STAR_CATEGORIES } from "@/data/starData";
import { useStarLibraryStore } from "@/stores/useStarLibraryStore";
import StarCard from "./StarCard";
import RandomStarDialog from "./RandomStarDialog";

export default function StarLibrary() {
  const { activeCategory, setCategory, triggerRandomStar } = useStarLibraryStore();

  const filteredStars = useMemo(
    () => STARS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const handleRandomStar = () => {
    const randomIndex = Math.floor(Math.random() * STARS.length);
    triggerRandomStar(STARS[randomIndex]);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header row: category filters + random CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {STAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 text-xs tracking-[0.12em] uppercase rounded-sm transition-all duration-300 cursor-pointer
                etched-frame
                ${activeCategory === cat.id
                  ? "text-gold-800 font-semibold border-gold-600/40"
                  : "text-parchment-500 hover:text-parchment-700"
                }`}
            >
              <span className="opacity-50 mr-1">{cat.labelCn}</span>
              {cat.label}
              <span className="ml-1.5 text-[10px] opacity-40">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Random star CTA */}
        <button
          onClick={handleRandomStar}
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold
                     tracking-[0.15em] uppercase rounded-sm overflow-hidden cursor-pointer
                     text-gold-800 transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(212,165,40,0.15)]"
          style={{
            background: "linear-gradient(135deg, rgba(212,165,40,0.08), rgba(212,165,40,0.15))",
            border: "1px solid rgba(212,165,40,0.25)",
          }}
        >
          {/* Shimmer sweep */}
          <span
            className="absolute inset-y-0 w-[40px] pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,165,40,0.2), transparent)",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
          <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
          Random Star Consciousness
        </button>
      </div>

      {/* Total parameter note */}
      <p className="text-xs text-parchment-500 mb-8 tracking-wide">
        Showing {filteredStars.length} key stars.{" "}
        <span className="text-gold-700/60">
          The full system operates on 108 stellar parameters.
        </span>
      </p>

      {/* Star grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStars.map((star) => (
          <StarCard key={star.id} star={star} />
        ))}
      </div>

      {/* Random star dialog */}
      <RandomStarDialog />
    </div>
  );
}
