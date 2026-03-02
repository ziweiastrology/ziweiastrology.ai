import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Blog — Zi Wei Dou Shu Insights & Analysis",
  description:
    "In-depth articles on Zi Wei Dou Shu (紫微斗数) — history, star analysis, celebrity case studies, and the mathematics behind ancient Chinese astrology.",
  keywords: [
    "zi wei dou shu blog",
    "zi wei dou shu articles",
    "chinese astrology blog",
    "purple star astrology articles",
    "zwds analysis",
    "zi wei dou shu history",
    "zi wei dou shu stars",
    "紫微斗数博客",
    "zi wei dou shu case studies",
    "chinese astrology insights",
  ],
  openGraph: {
    title: "Blog — Zi Wei Dou Shu Insights & Analysis",
    description:
      "In-depth articles on Zi Wei Dou Shu (紫微斗数) — history, star analysis, celebrity case studies, and the mathematics behind ancient Chinese astrology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Zi Wei Dou Shu Insights & Analysis",
    description:
      "In-depth articles on Zi Wei Dou Shu — history, star analysis, celebrity case studies, and ancient Chinese astrology mathematics.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }]} />
      {children}
    </>
  );
}
