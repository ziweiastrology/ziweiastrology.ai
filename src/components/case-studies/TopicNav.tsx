"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  HealthIcon,
  CareerIcon,
  SpouseIcon,
  ChildrenIcon,
  PropertyIcon,
} from "@/components/destiny-matrix/palaceIcons";
import { TOPICS } from "./topicData";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.FC<{ stroke?: string }>> = {
  health: HealthIcon,
  career: CareerIcon,
  relationships: SpouseIcon,
  children: ChildrenIcon,
  property: PropertyIcon,
};

export default function TopicNav() {
  const [active, setActive] = useState(TOPICS[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = TOPICS.map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={navRef}
      className="sticky top-16 z-30 -mx-4 overflow-x-auto border-b border-gold-700/20 bg-celestial-900/95 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="flex items-center gap-2 py-3">
        {TOPICS.map((topic) => {
          const Icon = ICON_MAP[topic.id];
          const isActive = active === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => scrollTo(topic.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                isActive
                  ? `${topic.colorClass} bg-celestial-700/60 ring-1 ring-current/20`
                  : "text-parchment-500 hover:text-parchment-300"
              )}
            >
              {Icon && <Icon stroke="currentColor" />}
              <span className="whitespace-nowrap">{topic.title}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="mx-1 h-5 w-px shrink-0 bg-gold-700/20" />

        {/* Suggest — glowing golden CTA */}
        <button
          onClick={() => scrollTo("suggest-case")}
          className="animate-glow-pulse flex shrink-0 items-center gap-1.5 rounded-full bg-gold-500/15 px-3.5 py-1.5 text-sm font-semibold text-gold-400 ring-1 ring-gold-500/40 transition-all hover:scale-105 hover:bg-gold-500/25 hover:text-gold-300 hover:ring-gold-400/60"
        >
          <Sparkles className="h-4 w-4" />
          <span className="whitespace-nowrap">Suggest</span>
        </button>
      </div>
    </div>
  );
}
