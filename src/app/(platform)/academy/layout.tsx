import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy — ziweiastrology.ai",
  description:
    "Learn Zi Wei Dou Shu from beginner to Sifu master level. Structured courses, certification path.",
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
