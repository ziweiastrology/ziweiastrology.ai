"use client";

import PageHeader from "@/components/layout/PageHeader";
import PillarArticles from "@/components/system-comparison/PillarArticles";
import ComparisonTable from "@/components/case-studies/ComparisonTable";

export default function SystemComparisonPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="System Comparison"
        subtitle="How Zi Wei Dou Shu compares to other divination systems across key dimensions — accuracy, depth, and practical application."
      />

      <PillarArticles />

      <div className="py-12">
        <ComparisonTable />
      </div>
    </div>
  );
}
