import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — ziweiastrology.ai",
  description:
    "Join the Zi Wei Dou Shu community. Discuss, analyze, and learn with fellow practitioners.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
