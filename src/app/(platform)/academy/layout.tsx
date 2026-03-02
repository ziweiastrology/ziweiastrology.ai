import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Academy — ziweiastrology.ai",
  description:
    "Learn Zi Wei Dou Shu from beginner to Sifu master level. Structured courses, certification path.",
  keywords: [
    "learn zi wei dou shu",
    "zi wei dou shu course",
    "zi wei dou shu tutorial",
    "chinese astrology course",
    "astrology certification",
    "purple star astrology course",
    "learn chinese astrology online",
    "zi wei dou shu for beginners",
    "紫微斗数课程",
    "astrology masterclass",
  ],
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Academy", href: "/academy" }]} />
      {children}
    </>
  );
}
