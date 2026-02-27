import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — ziweiastrology.ai",
  description:
    "Articles, research papers, datasets, and case studies on Zi Wei Dou Shu.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
