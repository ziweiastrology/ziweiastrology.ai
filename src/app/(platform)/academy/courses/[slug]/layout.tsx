import type { Metadata } from "next";

const COURSE_TITLES: Record<string, string> = {
  "foundations-of-zi-wei": "Foundations of Zi Wei Dou Shu",
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
    openGraph: {
      title,
      description: `${title} — Learn Zi Wei Dou Shu on ziweiastrology.ai Academy`,
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
