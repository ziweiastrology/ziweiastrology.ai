/**
 * Backfill slugs for existing posts that don't have one.
 * Run: npx tsx scripts/backfill-slugs.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

async function main() {
  const posts = await prisma.post.findMany({
    where: { slug: null },
    select: { id: true, title: true },
  });

  console.log(`Found ${posts.length} posts without slugs`);

  const usedSlugs = new Set<string>();

  // Load existing slugs
  const existing = await prisma.post.findMany({
    where: { slug: { not: null } },
    select: { slug: true },
  });
  for (const p of existing) {
    if (p.slug) usedSlugs.add(p.slug);
  }

  let updated = 0;
  for (const post of posts) {
    let slug = slugify(post.title);
    if (!slug) slug = `post-${post.id.slice(0, 8)}`;

    // Deduplicate
    let candidate = slug;
    let i = 2;
    while (usedSlugs.has(candidate)) {
      candidate = `${slug}-${i}`;
      i++;
    }

    usedSlugs.add(candidate);

    await prisma.post.update({
      where: { id: post.id },
      data: { slug: candidate },
    });

    console.log(`  ${post.title} → ${candidate}`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated} posts.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
