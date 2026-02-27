"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PLACEHOLDER_COURSES: Record<string, {
  title: string;
  description: string;
  level: string;
  price: number;
  enrollmentCount: number;
  lessons: { id: string; title: string; order: number }[];
}> = {
  "foundations-of-zi-wei": {
    title: "Foundations of Zi Wei Dou Shu",
    description:
      "Master the fundamentals of Purple Star Astrology. This course covers the 12 palaces, 14 major stars, basic chart construction, and introductory reading techniques. By the end, you'll be able to construct and read a basic Zi Wei chart.",
    level: "BEGINNER",
    price: 0,
    enrollmentCount: 847,
    lessons: [
      { id: "1", title: "What is Zi Wei Dou Shu?", order: 1 },
      { id: "2", title: "Historical Origins: Chen Tuan & Mount Hua", order: 2 },
      { id: "3", title: "The 12 Palaces Explained", order: 3 },
      { id: "4", title: "Palace Interactions & Geometry", order: 4 },
      { id: "5", title: "The 14 Major Stars: North Star Group", order: 5 },
      { id: "6", title: "The 14 Major Stars: South Star Group", order: 6 },
      { id: "7", title: "Minor Stars & Auxiliary Bodies", order: 7 },
      { id: "8", title: "Chart Construction: Step by Step", order: 8 },
      { id: "9", title: "Birth Data & True Solar Time", order: 9 },
      { id: "10", title: "Reading Your First Chart", order: 10 },
      { id: "11", title: "Common Patterns & Quick Reference", order: 11 },
      { id: "12", title: "Foundation Assessment", order: 12 },
    ],
  },
};

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const course = PLACEHOLDER_COURSES[slug];

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1
          className="mb-4 text-2xl font-bold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Course Not Found
        </h1>
        <Link href="/academy/courses" className="text-gold-400 hover:text-gold-300">
          Browse all courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/academy/courses"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-parchment-500 transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        All Courses
      </Link>

      {/* Course header */}
      <div className="mb-8 rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-quantum-green/10 px-3 py-0.5 text-xs font-semibold text-quantum-green uppercase tracking-wider">
            {course.level}
          </span>
          <span className="text-lg font-bold text-gold-400">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </div>

        <h1
          className="mb-4 text-3xl font-bold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {course.title}
        </h1>

        <p className="mb-6 text-parchment-400 leading-relaxed">
          {course.description}
        </p>

        <div className="mb-6 flex items-center gap-6 text-sm text-parchment-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {course.lessons.length} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {course.enrollmentCount} enrolled
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            ~{course.lessons.length * 20} min
          </span>
        </div>

        <Button size="lg">Enroll Now</Button>
      </div>

      {/* Lesson list */}
      <div>
        <h2
          className="mb-4 text-xl font-bold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Course Content
        </h2>
        <div className="space-y-2">
          {course.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center gap-3 rounded-md border border-gold-700/10 bg-celestial-800/20 px-4 py-3"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gold-700/30 text-xs font-medium text-parchment-500">
                {lesson.order}
              </span>
              <span className="text-sm text-parchment-300">{lesson.title}</span>
              <CheckCircle className="ml-auto h-4 w-4 text-parchment-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
