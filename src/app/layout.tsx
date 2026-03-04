import type { Metadata } from "next";
import { Inter, Cinzel_Decorative, Merriweather } from "next/font/google";
import Providers from "@/components/Providers";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "optional",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ziweiastrology.ai").trim();

export const metadata: Metadata = {
  title: {
    default: "ziweiastrology.ai — Decode Your Reality",
    template: "%s | ziweiastrology.ai",
  },
  description:
    "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality. Optimize your future.",
  keywords: [
    // Tier 1 — Brand Core
    "zi wei dou shu",
    "紫微斗数",
    "purple star astrology",
    "zwds",
    "ziwei dou shu",
    "ziwei astrology",
    // Tier 2 — High-Volume Category
    "chinese astrology",
    "chinese horoscope",
    "chinese zodiac",
    "astrology AI",
    "birth chart",
    "destiny chart",
    // Tier 3 — Feature / Transactional
    "zi wei dou shu calculator",
    "zi wei dou shu chart",
    "zi wei dou shu reading",
    "free astrology reading",
    "chinese astrology chart",
    "purple star astrology chart",
    "astrology birth chart calculator",
    // Tier 6 — Life Domain
    "feng shui",
    "quantum probability astrology",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    types: {
      "application/rss+xml": "/blog/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ziweiastrology.ai",
    title: "ziweiastrology.ai — Decode Your Reality",
    description:
      "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality. Optimize your future.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ziweiastrology.ai — Decode Your Reality",
    description:
      "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ziweiastrology.ai",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.jpg`,
        width: 512,
        height: 512,
        caption: "ziweiastrology.ai",
      },
      image: { "@id": `${SITE_URL}/#logo` },
      description:
        "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality. Optimize your future.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ziweiastrology.ai",
      description:
        "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "ziweiastrology.ai — Decode Your Reality",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      description:
        "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality. Optimize your future.",
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} ${merriweather.variable} font-sans antialiased`}
      >
        <Analytics />
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-celestial-900"
          >
            Skip to main content
          </a>
          <div id="main-content">{children}</div>
        </Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
