"use client";

import Link from "next/link";
import { BookOpen, Trophy, Clock } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ProgressBar from "@/components/academy/ProgressBar";
import MembershipWall from "@/components/community/MembershipWall";

const PLACEHOLDER_ENROLLMENTS = [
  {
    id: "1",
    course: {
      title: "Foundations of Zi Wei Dou Shu",
      slug: "foundations-of-zi-wei",
      level: "BEGINNER",
      lessonCount: 12,
    },
    progress: 75,
    status: "ACTIVE",
  },
  {
    id: "2",
    course: {
      title: "Four Transformers Mastery",
      slug: "four-transformers-mastery",
      level: "INTERMEDIATE",
      lessonCount: 20,
    },
    progress: 30,
    status: "ACTIVE",
  },
];

export default function AcademyDashboardPage() {
  return (
    <MembershipWall requiredTier="PREMIUM">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Student Dashboard"
          subtitle="Track your progress on the path from beginner to Sifu master."
        />

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-5 text-center">
            <BookOpen className="mx-auto mb-2 h-6 w-6 text-gold-400" />
            <p className="text-2xl font-bold text-parchment-100">
              {PLACEHOLDER_ENROLLMENTS.length}
            </p>
            <p className="text-xs text-parchment-500">Courses Enrolled</p>
          </div>
          <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-5 text-center">
            <Trophy className="mx-auto mb-2 h-6 w-6 text-gold-400" />
            <p className="text-2xl font-bold text-parchment-100">0</p>
            <p className="text-xs text-parchment-500">Completed</p>
          </div>
          <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-5 text-center">
            <Clock className="mx-auto mb-2 h-6 w-6 text-gold-400" />
            <p className="text-2xl font-bold text-parchment-100">12h</p>
            <p className="text-xs text-parchment-500">Study Time</p>
          </div>
        </div>

        {/* Enrolled courses */}
        <h2
          className="mb-4 text-xl font-bold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          My Courses
        </h2>
        <div className="space-y-4 pb-16">
          {PLACEHOLDER_ENROLLMENTS.map((enrollment) => (
            <Link
              key={enrollment.id}
              href={`/academy/courses/${enrollment.course.slug}`}
              className="group block rounded-lg border border-gold-700/20 bg-celestial-800/30 p-5 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-1 inline-block rounded-full bg-quantum-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-quantum-green">
                    {enrollment.course.level}
                  </span>
                  <h3
                    className="text-lg font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {enrollment.course.title}
                  </h3>
                  <p className="mt-1 text-xs text-parchment-600">
                    {enrollment.course.lessonCount} lessons
                  </p>
                </div>
              </div>
              <ProgressBar value={enrollment.progress} className="mt-4" />
            </Link>
          ))}

          {PLACEHOLDER_ENROLLMENTS.length === 0 && (
            <div className="py-12 text-center">
              <p className="mb-4 text-parchment-500">
                You haven&apos;t enrolled in any courses yet.
              </p>
              <Link
                href="/academy/courses"
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                Browse courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </MembershipWall>
  );
}
