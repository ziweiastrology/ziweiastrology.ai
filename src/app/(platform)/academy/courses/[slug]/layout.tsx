import type { Metadata } from "next";

const COURSE_TITLES: Record<string, string> = {
  "foundations-of-zi-wei": "Foundations of Zi Wei Dou Shu",
  "star-interactions": "Star Interactions & Combinations",
  "four-transformers-mastery": "Four Transformers (Si Hua) Mastery",
  "fractal-time-analysis": "Fractal Time Analysis: Decade to Daily",
  "sifu-certification": "Sifu Certification Program",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = COURSE_TITLES[slug] || "Course";

  return {
    title,
    description: `${title} — Learn Zi Wei Dou Shu on ziweiastrology.ai Academy`,
    keywords: ["zi wei dou shu course", "learn zi wei dou shu", title.toLowerCase(), "紫微斗数课程"],
    openGraph: {
      title,
      description: `${title} — Learn Zi Wei Dou Shu on ziweiastrology.ai Academy`,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: `${title} — Learn Zi Wei Dou Shu on ziweiastrology.ai Academy`,
    },
    alternates: {
      canonical: `https://www.ziweiastrology.ai/academy/courses/${slug}`,
    },
  };
}

export default function CourseSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
