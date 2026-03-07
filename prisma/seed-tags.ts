import { PrismaClient, TagCategory } from "@prisma/client";

const prisma = new PrismaClient();

const TAGS = [
  // INDUSTRY
  { name: "tech", nameCn: "科技", category: TagCategory.INDUSTRY },
  { name: "finance", nameCn: "金融", category: TagCategory.INDUSTRY },
  { name: "education", nameCn: "教育", category: TagCategory.INDUSTRY },
  { name: "healthcare", nameCn: "医疗", category: TagCategory.INDUSTRY },
  { name: "art-design", nameCn: "艺术设计", category: TagCategory.INDUSTRY },
  { name: "real-estate", nameCn: "房地产", category: TagCategory.INDUSTRY },
  { name: "freelance", nameCn: "自由职业", category: TagCategory.INDUSTRY },
  { name: "ecommerce", nameCn: "电商", category: TagCategory.INDUSTRY },
  { name: "food-bev", nameCn: "餐饮", category: TagCategory.INDUSTRY },
  { name: "legal", nameCn: "法律", category: TagCategory.INDUSTRY },
  { name: "media", nameCn: "媒体", category: TagCategory.INDUSTRY },
  { name: "consulting", nameCn: "咨询", category: TagCategory.INDUSTRY },

  // INTEREST
  { name: "ziwei-doushu", nameCn: "紫微斗数", category: TagCategory.INTEREST },
  { name: "feng-shui", nameCn: "风水", category: TagCategory.INTEREST },
  { name: "meditation", nameCn: "冥想", category: TagCategory.INTEREST },
  { name: "investing", nameCn: "投资理财", category: TagCategory.INTEREST },
  { name: "fitness", nameCn: "健身", category: TagCategory.INTEREST },
  { name: "travel", nameCn: "旅行", category: TagCategory.INTEREST },
  { name: "reading", nameCn: "读书", category: TagCategory.INTEREST },
  { name: "music", nameCn: "音乐", category: TagCategory.INTEREST },
  { name: "photography", nameCn: "摄影", category: TagCategory.INTEREST },
  { name: "astrology", nameCn: "占星", category: TagCategory.INTEREST },
  { name: "bazi", nameCn: "八字", category: TagCategory.INTEREST },
  { name: "tarot", nameCn: "塔罗", category: TagCategory.INTEREST },

  // GOAL
  { name: "find-cofounder", nameCn: "找创业伙伴", category: TagCategory.GOAL },
  { name: "find-guiren", nameCn: "找贵人", category: TagCategory.GOAL },
  { name: "learn-astrology", nameCn: "学命理", category: TagCategory.GOAL },
  { name: "make-friends", nameCn: "交朋友", category: TagCategory.GOAL },
  { name: "love-guidance", nameCn: "感情指导", category: TagCategory.GOAL },
  { name: "career-planning", nameCn: "职业规划", category: TagCategory.GOAL },
  { name: "spiritual-growth", nameCn: "灵性成长", category: TagCategory.GOAL },
  { name: "networking", nameCn: "拓展人脉", category: TagCategory.GOAL },
];

async function main() {
  console.log("Seeding tags...");
  for (const tag of TAGS) {
    await prisma.tag.upsert({
      where: { name_category: { name: tag.name, category: tag.category } },
      update: { nameCn: tag.nameCn },
      create: tag,
    });
  }
  console.log(`Seeded ${TAGS.length} tags`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
