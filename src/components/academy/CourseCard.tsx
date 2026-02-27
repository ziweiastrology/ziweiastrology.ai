import Link from "next/link";
import { BookOpen, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVEL_CONFIG = {
  BEGINNER: { label: "Beginner", color: "text-quantum-green", bg: "bg-quantum-green/10" },
  INTERMEDIATE: { label: "Intermediate", color: "text-quantum-cyan", bg: "bg-quantum-cyan/10" },
  ADVANCED: { label: "Advanced", color: "text-quantum-orange", bg: "bg-quantum-orange/10" },
  MASTER: { label: "Master", color: "text-gold-400", bg: "bg-gold-500/10" },
} as const;

interface CourseCardProps {
  slug: string;
  title: string;
  description?: string | null;
  level: keyof typeof LEVEL_CONFIG;
  price: number;
  lessonCount: number;
  enrollmentCount: number;
}

export default function CourseCard({
  slug,
  title,
  description,
  level,
  price,
  lessonCount,
  enrollmentCount,
}: CourseCardProps) {
  const config = LEVEL_CONFIG[level];

  return (
    <Link
      href={`/academy/courses/${slug}`}
      className="group flex flex-col rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            config.color,
            config.bg
          )}
        >
          {config.label}
        </span>
        <span className="text-sm font-bold text-gold-400">
          {price === 0 ? "Free" : `$${price}`}
        </span>
      </div>

      <h3
        className="mb-2 text-lg font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {title}
      </h3>

      {description && (
        <p className="mb-4 flex-1 text-sm text-parchment-500 line-clamp-2">
          {description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-4 text-xs text-parchment-600">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          {lessonCount} lessons
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {enrollmentCount} enrolled
        </span>
      </div>
    </Link>
  );
}
