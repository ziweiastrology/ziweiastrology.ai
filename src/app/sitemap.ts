import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ziweiastrology.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/resources",
    "/case-studies",
    "/system-comparison",
    "/community",
    "/community/feed",
    "/community/pillar-data",
    "/community/analysis",
    "/community/groups",
    "/academy",
    "/academy/courses",
    "/academy/dashboard",
    "/privacy",
    "/terms",
    "/settings",
    "/auth/login",
    "/auth/register",
  ];

  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/about" ? 0.8 : 0.6,
  }));
}
