import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BrandNarrative from "@/components/about/BrandNarrative";
import TeamGrid from "@/components/about/TeamGrid";
import MethodologySection from "@/components/about/MethodologySection";

export const metadata: Metadata = {
  title: "About — ziweiastrology.ai",
  description:
    "Our story, team, and methodology. Ancient mathematical probability, not superstition.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Our Story"
        subtitle="Ancient mathematical probability meets modern quantum modeling. This is not superstition — it's precision."
      />

      <BrandNarrative />
      <MethodologySection />
      <TeamGrid />
    </div>
  );
}
