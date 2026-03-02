import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Community — ziweiastrology.ai",
  description:
    "Join the Zi Wei Dou Shu community. Discuss, analyze, and learn with fellow practitioners.",
  keywords: [
    "zi wei dou shu community",
    "zi wei dou shu forum",
    "chinese astrology community",
    "astrology discussion group",
    "purple star astrology practitioners",
    "zi wei dou shu analysis group",
    "紫微斗数论坛",
    "astrology social network",
    "learn astrology with others",
    "zi wei dou shu practitioners",
  ],
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Community", href: "/community" }]} />
      {children}
    </>
  );
}
