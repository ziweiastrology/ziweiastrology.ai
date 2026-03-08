/**
 * Seed ZWDS knowledge base content into Resources and Community Posts.
 *
 * Usage: npx tsx scripts/seed-zwds-content.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== ZWDS Content Seeder ===\n");

  // Step 1: Seed resources
  const { seedResources } = await import("./seed-zwds-resources");
  await seedResources();

  console.log("");

  // Step 2: Seed community posts
  const { seedPosts } = await import("./seed-zwds-posts");
  await seedPosts();

  console.log("\n=== Done ===");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
