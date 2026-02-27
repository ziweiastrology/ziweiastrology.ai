import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — ziweiastrology.ai",
  description:
    "Real Zi Wei Dou Shu case analyses organized by life topic — health, career, relationships, children, and property.",
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
