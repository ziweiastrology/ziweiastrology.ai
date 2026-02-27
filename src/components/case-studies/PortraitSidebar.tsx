"use client";

import { useEffect, useRef } from "react";
import {
  HealthIcon,
  CareerIcon,
  SpouseIcon,
  ChildrenIcon,
  PropertyIcon,
} from "@/components/destiny-matrix/palaceIcons";
import { TOPICS } from "./topicData";
import PortraitMedallion from "./PortraitMedallion";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.FC<{ stroke?: string }>> = {
  health: HealthIcon,
  career: CareerIcon,
  relationships: SpouseIcon,
  children: ChildrenIcon,
  property: PropertyIcon,
};

interface PortraitSidebarProps {
  activeCaseId: string | null;
  onPortraitClick: (caseId: string) => void;
}

export default function PortraitSidebar({
  activeCaseId,
  onPortraitClick,
}: PortraitSidebarProps) {
  const activeRef = useRef<HTMLDivElement>(null);

  // Scroll active portrait into view in the sidebar
  useEffect(() => {
    if (activeCaseId && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeCaseId]);

  return (
    <>
      {/* Desktop: vertical sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2 scrollbar-thin">
          <div className="space-y-6">
            {TOPICS.map((topic) => {
              const Icon = ICON_MAP[topic.id];
              return (
                <div key={topic.id}>
                  {/* Topic label */}
                  <div className="mb-3 flex items-center gap-2">
                    {Icon && (
                      <div className={cn("h-4 w-4", topic.colorClass)}>
                        <Icon stroke="currentColor" />
                      </div>
                    )}
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-wider",
                        topic.colorClass
                      )}
                    >
                      {topic.title}
                    </span>
                    <div
                      className={cn(
                        "h-px flex-1",
                        topic.colorClass.replace("text-", "bg-"),
                        "opacity-20"
                      )}
                    />
                  </div>

                  {/* Portraits */}
                  <div className="flex flex-col items-center gap-4">
                    {topic.cases.map((c) => (
                      <div
                        key={c.id}
                        ref={activeCaseId === c.id ? activeRef : undefined}
                      >
                        <PortraitMedallion
                          subject={c.subject}
                          caseId={c.id}
                          colorClass={topic.colorClass}
                          isActive={activeCaseId === c.id}
                          onClick={() => onPortraitClick(c.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile: horizontal scroll strip */}
      <div className="relative -mx-4 px-4 lg:hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-celestial-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-celestial-900 to-transparent" />

        <div className="overflow-x-auto pb-3 pt-1 scrollbar-none">
          <div className="flex items-start gap-3">
            {TOPICS.map((topic, ti) => (
              <div key={topic.id} className="flex items-start gap-3">
                {/* Topic color separator dot (between groups) */}
                {ti > 0 && (
                  <div className="flex h-14 items-center px-1">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        topic.colorClass.replace("text-", "bg-"),
                        "opacity-50"
                      )}
                    />
                  </div>
                )}
                {topic.cases.map((c) => (
                  <PortraitMedallion
                    key={c.id}
                    subject={c.subject}
                    caseId={c.id}
                    colorClass={topic.colorClass}
                    isActive={activeCaseId === c.id}
                    size="sm"
                    onClick={() => onPortraitClick(c.id)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
