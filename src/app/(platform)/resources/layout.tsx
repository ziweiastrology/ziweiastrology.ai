import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Resources — ziweiastrology.ai",
  description:
    "Articles, research papers, datasets, and case studies on Zi Wei Dou Shu.",
  keywords: [
    "zi wei dou shu meaning",
    "zi wei dou shu palaces",
    "twelve palaces astrology",
    "zi wei dou shu stars explained",
    "purple star astrology guide",
    "chinese astrology research",
    "zi wei dou shu articles",
    "紫微斗数教程",
    "astrology research papers",
    "zi wei dou shu interpretation",
  ],
  openGraph: {
    title: "Resources — Zi Wei Dou Shu Articles & Research",
    description:
      "Articles, research papers, datasets, and case studies on Zi Wei Dou Shu.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — Zi Wei Dou Shu Articles & Research",
    description:
      "Articles, research papers, datasets, and case studies on Zi Wei Dou Shu.",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Resources", href: "/resources" }]} />
      {children}
    </>
  );
}
