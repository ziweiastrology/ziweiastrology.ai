import type { Metadata } from "next";
import { Inter, Cinzel_Decorative, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ziweiastrology.ai — Decode Your Reality",
  description:
    "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality. Optimize your future.",
  keywords: [
    "zi wei dou shu",
    "astrology",
    "quantum probability",
    "purple star astrology",
    "紫微斗数",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${cinzel.variable} ${merriweather.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
