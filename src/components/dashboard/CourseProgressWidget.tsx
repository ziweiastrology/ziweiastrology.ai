"use client";

import Link from "next/link";
import { GraduationCap, BookOpen } from "lucide-react";

interface CourseProgressWidgetProps {
  enrollments: Array<{
    id: string;
    status: string;
    progress: number;
    course: {
      id: string;
      title: string;
      slug: string;
      level: string;
    };
  }>;
}

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "text-quantum-green",
  INTERMEDIATE: "text-quantum-cyan",
  ADVANCED: "text-quantum-orange",
  MASTER: "text-quantum-red",
};

export default function CourseProgressWidget({
  enrollments,
}: CourseProgressWidgetProps) {
  return (
    <div className="gold-frame rounded-xl p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
        <GraduationCap className="h-4 w-4" />
        Course Progress
      </h3>

      {enrollments.length === 0 ? (
        <div>
          <p className="mb-2 text-sm text-parchment-500">
            No courses enrolled yet.
          </p>
          <Link
            href="/academy"
            className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
          >
            <BookOpen className="h-3 w-3" />
            Browse courses →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {enrollments.slice(0, 4).map((enrollment) => (
            <Link
              key={enrollment.id}
              href={`/academy/courses/${enrollment.course.slug}`}
              className="block rounded-lg p-2 transition-colors hover:bg-celestial-700/30"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="truncate text-sm text-parchment-200">
                  {enrollment.course.title}
                </span>
                <span
                  className={`text-[10px] uppercase ${LEVEL_COLORS[enrollment.course.level] || "text-parchment-500"}`}
                >
                  {enrollment.course.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-celestial-700">
                  <div
                    className="h-full rounded-full bg-gold-500 transition-all"
                    style={{ width: `${Math.round(enrollment.progress * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-parchment-500">
                  {Math.round(enrollment.progress * 100)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
