"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import CourseCard from "@/components/academy/CourseCard";
import { cn } from "@/lib/utils";

const LEVELS = [
  { value: "", label: "All Levels" },
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "MASTER", label: "Master" },
];

const PLACEHOLDER_COURSES = [
  {
    slug: "foundations-of-zi-wei",
    title: "Foundations of Zi Wei Dou Shu",
    description:
      "Master the fundamentals: 12 palaces, 14 major stars, and basic chart reading. Build a solid foundation for advanced study.",
    level: "BEGINNER" as const,
    price: 0,
    lessonCount: 12,
    enrollmentCount: 847,
  },
  {
    slug: "star-interactions",
    title: "Star Interactions & Palace Dynamics",
    description:
      "Deep dive into how stars interact within and across palaces. Learn the Triangle of Power, Axis of Tension, and resonance patterns.",
    level: "BEGINNER" as const,
    price: 49,
    lessonCount: 16,
    enrollmentCount: 523,
  },
  {
    slug: "four-transformers-mastery",
    title: "Four Transformers Mastery",
    description:
      "Complete mastery of Lu, Quan, Ke, Ji. Mathematical operators, activation patterns, and their effects on life predictions.",
    level: "INTERMEDIATE" as const,
    price: 99,
    lessonCount: 20,
    enrollmentCount: 312,
  },
  {
    slug: "fractal-time-analysis",
    title: "Fractal Time Analysis",
    description:
      "Decadal, annual, and monthly chart overlays. Learn to predict timing with precision using nested temporal probability layers.",
    level: "ADVANCED" as const,
    price: 149,
    lessonCount: 24,
    enrollmentCount: 156,
  },
  {
    slug: "sifu-certification",
    title: "Sifu Master Certification",
    description:
      "Advanced case analysis, teaching methodology, and practitioner certification. Become a certified Zi Wei Dou Shu master.",
    level: "MASTER" as const,
    price: 299,
    lessonCount: 32,
    enrollmentCount: 43,
  },
];

export default function CourseCatalogPage() {
  const [activeLevel, setActiveLevel] = useState("");

  const filtered = activeLevel
    ? PLACEHOLDER_COURSES.filter((c) => c.level === activeLevel)
    : PLACEHOLDER_COURSES;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Course Catalog"
        subtitle="Structured learning from beginner to Sifu master. Each course builds on the last."
      />

      {/* Level filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {LEVELS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveLevel(value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeLevel === value
                ? "bg-gold-500 text-celestial-900"
                : "border border-gold-700/30 text-parchment-400 hover:border-gold-500/50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}
      </div>
    </div>
  );
}
