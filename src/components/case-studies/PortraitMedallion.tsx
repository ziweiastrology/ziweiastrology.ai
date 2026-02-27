"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CaseSubject } from "./topicData";

interface PortraitMedallionProps {
  subject: CaseSubject;
  caseId: string;
  colorClass: string;
  isActive?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
}

export default function PortraitMedallion({
  subject,
  caseId,
  colorClass,
  isActive = false,
  size = "md",
  onClick,
}: PortraitMedallionProps) {
  const sizeClasses = size === "md" ? "h-20 w-20" : "h-14 w-14";
  const textSize = size === "md" ? "text-xs" : "text-[10px]";
  const eraSize = size === "md" ? "text-[10px]" : "text-[9px]";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-1.5 transition-all duration-300",
        size === "md" ? "w-24" : "w-16"
      )}
      aria-label={`View ${subject.name}'s case study`}
    >
      {/* Portrait circle */}
      <div
        className={cn(
          "relative overflow-hidden rounded-full transition-all duration-300",
          sizeClasses,
          // Double border effect
          "ring-2 ring-gold-700/40 ring-offset-2 ring-offset-celestial-900",
          // Hover
          "group-hover:ring-gold-500/70 group-hover:scale-105",
          // Active state
          isActive && "ring-gold-400 shadow-[0_0_15px_rgba(212,165,40,0.3)] scale-105"
        )}
      >
        <Image
          src={subject.avatar}
          alt={subject.name}
          fill
          className="object-cover"
        />
        {/* Topic color indicator dot */}
        <div
          className={cn(
            "absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border border-celestial-900",
            colorClass.replace("text-", "bg-"),
            "opacity-80"
          )}
        />
      </div>

      {/* Name */}
      <span
        className={cn(
          "text-center font-medium leading-tight transition-colors",
          textSize,
          isActive ? "text-gold-400" : "text-parchment-400 group-hover:text-parchment-200"
        )}
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {subject.nameCn || subject.name}
      </span>

      {/* Era */}
      <span
        className={cn(
          "text-center leading-none text-parchment-600",
          eraSize
        )}
      >
        {subject.era}
      </span>
    </button>
  );
}
