import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Community — ziweiastrology.ai",
  description:
    "Join the Zi Wei Dou Shu community. Discuss, analyze, and learn with fellow practitioners.",
};

export default function CommunityPage() {
  const sections = [
    {
      title: "Community Feed",
      description: "Discussions, insights, and shared discoveries from practitioners worldwide.",
      href: "/community/feed",
      count: "Coming soon",
    },
    {
      title: "Pillar Data",
      description: "Categorized case studies: family, career, love, partnerships, health.",
      href: "/community/pillar-data",
      count: "Coming soon",
    },
    {
      title: "Analysis",
      description: "In-depth Zi Wei Dou Shu breakdowns of events and public figures.",
      href: "/community/analysis",
      count: "Coming soon",
    },
    {
      title: "Groups",
      description: "Join focused study groups organized by topic and experience level.",
      href: "/community/groups",
      count: "Coming soon",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Community"
        subtitle="A space for serious practitioners to discuss, analyze, and advance the art of Zi Wei Dou Shu."
      />

      <section className="pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
            >
              <h3
                className="mb-2 text-xl font-bold text-parchment-100 group-hover:text-gold-400 transition-colors"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {section.title}
              </h3>
              <p className="text-sm text-parchment-500">
                {section.description}
              </p>
              <span className="mt-4 inline-block text-xs text-gold-500/60 uppercase tracking-wider">
                {section.count}
              </span>
            </Link>
          ))}
        </div>

        {/* Membership CTA */}
        <div className="mt-12 rounded-lg border border-gold-500/30 bg-gradient-to-br from-celestial-800/80 to-celestial-700/40 p-8 text-center">
          <h3
            className="mb-2 text-xl font-bold text-gold-400"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Unlock Full Community Access
          </h3>
          <p className="mb-6 text-parchment-500">
            Join as a member to participate in discussions, access pillar data,
            and connect with master practitioners.
          </p>
          <Link
            href="/auth/register"
            className="inline-block rounded-md bg-gold-500 px-6 py-2.5 text-sm font-semibold text-celestial-900 transition-colors hover:bg-gold-400"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
