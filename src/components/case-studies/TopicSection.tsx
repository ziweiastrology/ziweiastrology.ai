"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  HealthIcon,
  CareerIcon,
  SpouseIcon,
  ChildrenIcon,
  PropertyIcon,
} from "@/components/destiny-matrix/palaceIcons";
import type { TopicData } from "./topicData";
import CaseCard from "./CaseCard";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.FC<{ stroke?: string }>> = {
  health: HealthIcon,
  career: CareerIcon,
  relationships: SpouseIcon,
  children: ChildrenIcon,
  property: PropertyIcon,
};

interface TopicSectionProps {
  topic: TopicData;
  index: number;
  activeCaseId?: string | null;
}

export default function TopicSection({ topic, index, activeCaseId }: TopicSectionProps) {
  const Icon = ICON_MAP[topic.id];
  const [introOpen, setIntroOpen] = useState(false);

  return (
    <motion.section
      id={topic.id}
      className="scroll-mt-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-4">
        {Icon && (
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br to-transparent",
              topic.bgAccent
            )}
          >
            <div className={topic.colorClass}>
              <Icon stroke="currentColor" />
            </div>
          </div>
        )}
        <div>
          <h2
            className={cn("text-2xl font-bold", topic.colorClass)}
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {topic.title}
          </h2>
          <p className="text-sm text-parchment-500">{topic.titleCn}</p>
        </div>
        <span
          className={cn(
            "ml-auto hidden rounded-full border px-3 py-1 text-xs font-medium sm:block",
            topic.borderClass,
            topic.colorClass
          )}
        >
          {topic.primaryPalace}
        </span>
      </div>

      {/* Intro card — collapsed by default */}
      <div
        className={cn(
          "mt-6 rounded-lg border bg-celestial-800/30 p-5",
          topic.borderClass
        )}
      >
        {/* Collapsed: line-clamped intro + toggle */}
        {!introOpen && (
          <p
            className="line-clamp-2 text-sm leading-relaxed text-parchment-400"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            {topic.introduction}
          </p>
        )}

        <AnimatePresence>
          {introOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p
                className="text-sm leading-relaxed text-parchment-400"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                {topic.introduction}
              </p>

              {/* Related palaces */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-parchment-500">
                  Also examine:
                </span>
                {topic.relatedPalaces.map((palace) => (
                  <span
                    key={palace}
                    className="rounded bg-celestial-700/50 px-2 py-0.5 text-xs text-parchment-400"
                  >
                    {palace}
                  </span>
                ))}
              </div>

              {/* Reading tips */}
              <ul className="mt-4 space-y-2">
                {topic.readingTips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-parchment-500"
                  >
                    <span
                      className={cn(
                        "mt-1 shrink-0 text-xs",
                        topic.colorClass
                      )}
                    >
                      ◆
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIntroOpen(!introOpen)}
          className={cn(
            "mt-3 flex items-center gap-1.5 text-xs font-medium transition-colors",
            topic.colorClass,
            "opacity-80 hover:opacity-100"
          )}
        >
          {introOpen ? "Hide reading guide" : "Learn how to read this topic"}
          <ChevronRight
            className={cn(
              "h-3 w-3 transition-transform",
              introOpen && "rotate-90"
            )}
          />
        </button>
      </div>

      {/* Case cards with scroll-target IDs */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {topic.cases.map((c) => (
          <div key={c.id} id={c.id} className="scroll-mt-36">
            <CaseCard
              case_={c}
              colorClass={topic.colorClass}
              borderClass={topic.borderClass}
              autoExpand={activeCaseId === c.id}
              isHighlighted={activeCaseId === c.id}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
