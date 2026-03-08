import { prisma } from "./prisma";

/**
 * Convert a title string into a URL-friendly slug.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word chars (keeps Chinese removed too — fine for URL)
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, "") // trim leading/trailing hyphens
    .slice(0, 120); // cap length
}

/**
 * Generate a unique slug for a Post, appending -2, -3, etc. if needed.
 */
export async function uniquePostSlug(title: string): Promise<string> {
  const base = slugify(title);
  if (!base) return `post-${Date.now()}`;

  const existing = await prisma.post.findUnique({ where: { slug: base } });
  if (!existing) return base;

  // Find next available suffix
  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    const found = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!found) return candidate;
  }

  return `${base}-${Date.now()}`;
}
