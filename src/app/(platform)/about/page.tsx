import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BrandNarrative from "@/components/about/BrandNarrative";
import TeamGrid from "@/components/about/TeamGrid";
import MethodologySection from "@/components/about/MethodologySection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

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
      <FaqJsonLd
        items={[
          {
            question: "What is Zi Wei Dou Shu?",
            answer:
              "Zi Wei Dou Shu (紫微斗数), also known as Purple Star Astrology, is an ancient Chinese astrological system dating back over 1,000 years. It uses the positions of stars and celestial bodies mapped to twelve palaces in a birth chart to analyze personality, relationships, career, and life events.",
          },
          {
            question: "How is Zi Wei Dou Shu different from Western astrology?",
            answer:
              "Unlike Western astrology which focuses on the Sun sign and planetary transits through the zodiac, Zi Wei Dou Shu uses a lunar calendar-based system with 14 major stars and over 100 minor stars mapped across 12 life palaces. It provides a more detailed and structured analysis of specific life domains like career, wealth, relationships, and health.",
          },
          {
            question: "Do I need to know my exact birth time for a Zi Wei Dou Shu reading?",
            answer:
              "Yes, an accurate birth time is essential for Zi Wei Dou Shu. The system divides each day into twelve two-hour periods (shichen), and even a small difference in birth time can shift stars between palaces, significantly changing the chart interpretation.",
          },
          {
            question: "How does ziweiastrology.ai combine ancient wisdom with modern technology?",
            answer:
              "ziweiastrology.ai applies quantum probability modeling to traditional Zi Wei Dou Shu calculations. Rather than treating chart readings as fixed predictions, our approach maps star configurations to probability distributions, giving you actionable insights about likely outcomes and optimal timing for decisions.",
          },
        ]}
      />
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
