import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Zi Wei Dou Shu AI — Decode Your Reality | Free Chart Reading",
  description:
    "Free Zi Wei Dou Shu chart calculator powered by AI. Generate your Purple Star Astrology birth chart, verify past events, and decode your destiny matrix. Ancient 紫微斗数 wisdom meets quantum probability modeling.",
  keywords: [
    "zi wei dou shu calculator",
    "free zi wei dou shu chart",
    "purple star astrology chart",
    "zi wei dou shu reading free",
    "chinese astrology birth chart",
    "紫微斗数排盘",
    "astrology AI calculator",
    "destiny chart free",
    "zi wei dou shu online",
    "chinese horoscope calculator",
  ],
  openGraph: {
    title: "Zi Wei Dou Shu AI — Decode Your Reality",
    description:
      "Free Purple Star Astrology chart calculator. Ancient 紫微斗数 wisdom meets quantum probability modeling.",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
