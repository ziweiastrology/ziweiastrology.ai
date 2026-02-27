"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import TopicNav from "@/components/case-studies/TopicNav";
import TopicSection from "@/components/case-studies/TopicSection";
import PortraitSidebar from "@/components/case-studies/PortraitSidebar";
import CommunityPollSection from "@/components/case-studies/CommunityPollSection";
import CelebritySubmissionForm from "@/components/case-studies/CelebritySubmissionForm";
import { TOPICS } from "@/components/case-studies/topicData";

// First case from each topic for the hero mini-portraits
const HERO_PORTRAITS = TOPICS.map((t) => ({
  subject: t.cases[0].subject,
  caseId: t.cases[0].id,
  colorClass: t.colorClass,
}));

export default function CaseStudiesPage() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  // Clear highlight after 3 seconds
  useEffect(() => {
    if (!activeCaseId) return;
    const timer = setTimeout(() => setActiveCaseId(null), 3000);
    return () => clearTimeout(timer);
  }, [activeCaseId]);

  const handlePortraitClick = useCallback((caseId: string) => {
    setActiveCaseId(caseId);
    const el = document.getElementById(caseId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Enhanced Page Header */}
      <div className="py-12 text-center">
        <h1
          className="gold-gradient-text-shimmer text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Case Studies
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-parchment-500">
          The stars speak through emperors, poets, and visionaries.
          See Zi Wei Dou Shu decode their destinies.
        </p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        {/* Mini hero portraits — one per topic */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {HERO_PORTRAITS.map(({ subject, caseId, colorClass }) => (
            <button
              key={caseId}
              onClick={() => handlePortraitClick(caseId)}
              className="group flex flex-col items-center gap-1"
              aria-label={`Jump to ${subject.name}`}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold-700/40 transition-all duration-300 group-hover:ring-gold-500/70 group-hover:scale-110 sm:h-14 sm:w-14">
                <Image
                  src={subject.avatar}
                  alt={subject.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden text-[10px] text-parchment-600 group-hover:text-parchment-400 sm:block">
                {subject.nameCn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <TopicNav />

      {/* Mobile portrait strip */}
      <div className="mt-4 lg:hidden">
        <PortraitSidebar
          activeCaseId={activeCaseId}
          onPortraitClick={handlePortraitClick}
        />
      </div>

      {/* Main content: two-column on desktop */}
      <div className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[1fr_280px]">
        {/* Left: topic sections */}
        <div className="space-y-20">
          {TOPICS.map((topic, i) => (
            <TopicSection
              key={topic.id}
              topic={topic}
              index={i}
              activeCaseId={activeCaseId}
            />
          ))}
        </div>

        {/* Right: desktop portrait sidebar */}
        <div className="hidden lg:block">
          <PortraitSidebar
            activeCaseId={activeCaseId}
            onPortraitClick={handlePortraitClick}
          />
        </div>
      </div>

      {/* Ornamental divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <span className="text-xs text-gold-500/50" style={{ fontFamily: "var(--font-cinzel)" }}>
          Community
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      {/* Community Pulse — Polls */}
      <section id="community-pulse" className="py-8">
        <h2
          className="mb-2 text-2xl font-bold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Community Pulse
        </h2>
        <p className="mb-6 text-sm text-parchment-500">
          Vote on questions about Zi Wei Dou Shu and see what others think.
        </p>
        <CommunityPollSection />
      </section>

      {/* Ornamental divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <span className="text-xs text-gold-500/50" style={{ fontFamily: "var(--font-cinzel)" }}>
          Submit
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      {/* Suggest a Case Study */}
      <section id="suggest-case" className="py-8 pb-16">
        <h2
          className="mb-2 text-2xl font-bold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Suggest a Case Study
        </h2>
        <p className="mb-6 text-sm text-parchment-500">
          Know a historical or public figure whose destiny chart deserves analysis?
          Submit their details and our team will investigate.
        </p>
        <div className="mx-auto max-w-2xl">
          <CelebritySubmissionForm />
        </div>
      </section>
    </div>
  );
}
