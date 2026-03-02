import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BrandNarrative from "@/components/about/BrandNarrative";
import TeamGrid from "@/components/about/TeamGrid";
import MethodologySection from "@/components/about/MethodologySection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "About — ziweiastrology.ai",
  description:
    "Our story, team, and methodology. Ancient mathematical probability, not superstition.",
  keywords: [
    "about ziweiastrology.ai",
    "zi wei dou shu methodology",
    "purple star astrology team",
    "quantum astrology approach",
    "紫微斗数关于我们",
  ],
  openGraph: {
    title: "About — ziweiastrology.ai",
    description:
      "Our story, team, and methodology. Ancient mathematical probability, not superstition.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — ziweiastrology.ai",
    description:
      "Our story, team, and methodology. Ancient mathematical probability, not superstition.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd items={[{ name: "About", href: "/about" }]} />
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
