import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Case Studies — Real Zi Wei Dou Shu Celebrity Analyses",
  description:
    "See Zi Wei Dou Shu decode real destinies. Celebrity case analyses across health, career, relationships, children, and property — Purple Star Astrology proven through historical figures.",
  keywords: [
    "zi wei dou shu case study",
    "career astrology prediction",
    "relationship compatibility astrology",
    "health astrology prediction",
    "wealth astrology analysis",
    "property feng shui astrology",
    "chinese astrology real examples",
    "purple star astrology reading examples",
    "zi wei dou shu life analysis",
    "紫微斗数案例",
    "celebrity astrology chart",
    "famous people birth chart analysis",
  ],
  openGraph: {
    title: "Case Studies — Real Zi Wei Dou Shu Celebrity Analyses",
    description:
      "The stars speak through emperors, poets, and visionaries. See Zi Wei Dou Shu decode their destinies.",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Case Studies", href: "/case-studies" }]} />
      {children}
    </>
  );
}
