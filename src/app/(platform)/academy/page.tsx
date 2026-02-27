import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Academy — ziweiastrology.ai",
  description:
    "Learn Zi Wei Dou Shu from beginner to Sifu master level. Structured courses, certification path.",
};

export default function AcademyPage() {
  const levels = [
    {
      level: "Beginner",
      title: "Foundation",
      description:
        "Understand the 12 palaces, 14 major stars, and basic chart reading.",
      duration: "4 weeks",
    },
    {
      level: "Intermediate",
      title: "Four Transformers",
      description:
        "Master Lu, Quan, Ke, Ji — the four transformative energies that shape destiny.",
      duration: "6 weeks",
    },
    {
      level: "Advanced",
      title: "Fractal Time",
      description:
        "Decadal, annual, and monthly chart overlays. Predict timing with precision.",
      duration: "8 weeks",
    },
    {
      level: "Master",
      title: "Sifu Certification",
      description:
        "Advanced case analysis, teaching methodology, and practitioner certification.",
      duration: "12 weeks",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Academy"
        subtitle="A structured path from curious beginner to certified Sifu master. Learn the ancient system with modern rigor."
      />

      {/* Certification Path */}
      <section className="pb-16">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-transparent sm:block" />

          <div className="space-y-8">
            {levels.map((item, i) => (
              <div key={i} className="flex gap-6">
                {/* Dot */}
                <div className="relative hidden sm:flex flex-shrink-0 items-start pt-8">
                  <div className="h-3 w-3 rounded-full border-2 border-gold-500 bg-celestial-900" />
                </div>

                <div className="flex-1 rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 transition-all hover:border-gold-700/40">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-gold-500/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
                      {item.level}
                    </span>
                    <span className="text-xs text-parchment-600">
                      {item.duration}
                    </span>
                  </div>
                  <h3
                    className="mb-2 text-xl font-bold text-parchment-100"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-parchment-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/academy/courses"
            className="inline-block rounded-md bg-gold-500 px-6 py-2.5 text-sm font-semibold text-celestial-900 transition-colors hover:bg-gold-400"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    </div>
  );
}
