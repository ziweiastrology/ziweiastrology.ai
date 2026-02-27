"use client";

import PageHeader from "@/components/layout/PageHeader";
import TopicNav from "@/components/case-studies/TopicNav";
import TopicSection from "@/components/case-studies/TopicSection";
import { TOPICS } from "@/components/case-studies/topicData";

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Case Studies"
        subtitle="Real Zi Wei Dou Shu analyses organized by life topic — see how ancient star readings decode modern lives."
      />

      <TopicNav />

      <div className="space-y-20 py-12">
        {TOPICS.map((topic, i) => (
          <TopicSection key={topic.id} topic={topic} index={i} />
        ))}
      </div>
    </div>
  );
}
