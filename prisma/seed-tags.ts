import { PrismaClient, TagCategory } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Migration map: old category → new category ───
// INDUSTRY → BUSINESS, INTEREST → split, ASTRO → METAPHYSICS, GOAL → GOAL

interface TagDef {
  name: string;
  nameCn: string;
  slug: string;
  category: TagCategory;
  children?: TagDef[];
}

const TAG_TREE: TagDef[] = [
  // ══════════════════════════════════════════════
  // 1. METAPHYSICS & SPIRITUALITY 玄学与灵性
  // ══════════════════════════════════════════════
  {
    name: "Metaphysics & Spirituality",
    nameCn: "玄学与灵性",
    slug: "metaphysics",
    category: TagCategory.METAPHYSICS,
    children: [
      {
        name: "Chinese Metaphysics",
        nameCn: "中华玄学",
        slug: "chinese-metaphysics",
        category: TagCategory.METAPHYSICS,
        children: [
          { name: "Zi Wei Dou Shu", nameCn: "紫微斗数", slug: "ziwei-doushu", category: TagCategory.METAPHYSICS },
          { name: "Ba Zi", nameCn: "八字", slug: "bazi", category: TagCategory.METAPHYSICS },
          { name: "Feng Shui", nameCn: "风水", slug: "feng-shui", category: TagCategory.METAPHYSICS },
          { name: "Qi Men Dun Jia", nameCn: "奇门遁甲", slug: "qi-men-dun-jia", category: TagCategory.METAPHYSICS },
          { name: "Liu Ren", nameCn: "六壬", slug: "liu-ren", category: TagCategory.METAPHYSICS },
          { name: "Tai Yi", nameCn: "太乙", slug: "tai-yi", category: TagCategory.METAPHYSICS },
          { name: "Mian Xiang", nameCn: "面相", slug: "mian-xiang", category: TagCategory.METAPHYSICS },
          { name: "Yi Jing", nameCn: "易经", slug: "yi-jing", category: TagCategory.METAPHYSICS },
          { name: "Xuan Kong", nameCn: "玄空", slug: "xuan-kong", category: TagCategory.METAPHYSICS },
        ],
      },
      {
        name: "Western Astrology",
        nameCn: "西方占星",
        slug: "western-astrology",
        category: TagCategory.METAPHYSICS,
        children: [
          { name: "Natal Charts", nameCn: "本命盘", slug: "natal-charts", category: TagCategory.METAPHYSICS },
          { name: "Transits & Progressions", nameCn: "行运与推运", slug: "transits-progressions", category: TagCategory.METAPHYSICS },
          { name: "Synastry", nameCn: "合盘", slug: "synastry", category: TagCategory.METAPHYSICS },
          { name: "Vedic / Jyotish", nameCn: "吠陀占星", slug: "vedic-jyotish", category: TagCategory.METAPHYSICS },
          { name: "Hellenistic Astrology", nameCn: "希腊占星", slug: "hellenistic", category: TagCategory.METAPHYSICS },
        ],
      },
      {
        name: "Divination",
        nameCn: "占卜",
        slug: "divination",
        category: TagCategory.METAPHYSICS,
        children: [
          { name: "Tarot", nameCn: "塔罗", slug: "tarot", category: TagCategory.METAPHYSICS },
          { name: "Numerology", nameCn: "数字学", slug: "numerology", category: TagCategory.METAPHYSICS },
          { name: "Palmistry", nameCn: "手相", slug: "palmistry", category: TagCategory.METAPHYSICS },
          { name: "Oracle Cards", nameCn: "神谕卡", slug: "oracle-cards", category: TagCategory.METAPHYSICS },
          { name: "Pendulum & Dowsing", nameCn: "灵摆占卜", slug: "pendulum-dowsing", category: TagCategory.METAPHYSICS },
        ],
      },
      {
        name: "Spiritual Practice",
        nameCn: "灵性修行",
        slug: "spiritual-practice",
        category: TagCategory.METAPHYSICS,
        children: [
          { name: "Meditation", nameCn: "冥想", slug: "meditation", category: TagCategory.METAPHYSICS },
          { name: "Energy Healing", nameCn: "能量疗愈", slug: "energy-healing", category: TagCategory.METAPHYSICS },
          { name: "Chakras & Aura", nameCn: "脉轮与灵光", slug: "chakras-aura", category: TagCategory.METAPHYSICS },
          { name: "Crystal Healing", nameCn: "水晶疗愈", slug: "crystal-healing", category: TagCategory.METAPHYSICS },
          { name: "Qi Gong", nameCn: "气功", slug: "qi-gong", category: TagCategory.METAPHYSICS },
          { name: "Buddhism & Taoism", nameCn: "佛道修行", slug: "buddhism-taoism", category: TagCategory.METAPHYSICS },
          { name: "Manifestation", nameCn: "显化法则", slug: "manifestation", category: TagCategory.METAPHYSICS },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 2. LIFESTYLE & WELLNESS 生活与健康
  // ══════════════════════════════════════════════
  {
    name: "Lifestyle & Wellness",
    nameCn: "生活与健康",
    slug: "lifestyle",
    category: TagCategory.LIFESTYLE,
    children: [
      {
        name: "Fitness & Movement",
        nameCn: "健身运动",
        slug: "fitness-movement",
        category: TagCategory.LIFESTYLE,
        children: [
          { name: "Gym & Lifting", nameCn: "健身撸铁", slug: "gym-lifting", category: TagCategory.LIFESTYLE },
          { name: "Yoga", nameCn: "瑜伽", slug: "yoga", category: TagCategory.LIFESTYLE },
          { name: "Running", nameCn: "跑步", slug: "running", category: TagCategory.LIFESTYLE },
          { name: "Martial Arts", nameCn: "武术", slug: "martial-arts", category: TagCategory.LIFESTYLE },
          { name: "Outdoor Sports", nameCn: "户外运动", slug: "outdoor-sports", category: TagCategory.LIFESTYLE },
        ],
      },
      {
        name: "Food & Drink",
        nameCn: "美食饮品",
        slug: "food-drink",
        category: TagCategory.LIFESTYLE,
        children: [
          { name: "Cooking", nameCn: "烹饪", slug: "cooking", category: TagCategory.LIFESTYLE },
          { name: "Tea Culture", nameCn: "茶道", slug: "tea-culture", category: TagCategory.LIFESTYLE },
          { name: "Wine & Spirits", nameCn: "葡萄酒与烈酒", slug: "wine-spirits", category: TagCategory.LIFESTYLE },
          { name: "Coffee", nameCn: "咖啡", slug: "coffee", category: TagCategory.LIFESTYLE },
          { name: "Plant-Based Diet", nameCn: "素食", slug: "plant-based", category: TagCategory.LIFESTYLE },
        ],
      },
      {
        name: "Travel",
        nameCn: "旅行",
        slug: "travel",
        category: TagCategory.LIFESTYLE,
        children: [
          { name: "Backpacking", nameCn: "背包旅行", slug: "backpacking", category: TagCategory.LIFESTYLE },
          { name: "Cultural Travel", nameCn: "文化旅行", slug: "cultural-travel", category: TagCategory.LIFESTYLE },
          { name: "Digital Nomad", nameCn: "数字游民", slug: "digital-nomad", category: TagCategory.LIFESTYLE },
          { name: "Luxury Travel", nameCn: "奢华旅行", slug: "luxury-travel", category: TagCategory.LIFESTYLE },
        ],
      },
      {
        name: "Wellness & Self-Care",
        nameCn: "养生保健",
        slug: "wellness",
        category: TagCategory.LIFESTYLE,
        children: [
          { name: "TCM / Herbal", nameCn: "中医养生", slug: "tcm-herbal", category: TagCategory.LIFESTYLE },
          { name: "Mental Health", nameCn: "心理健康", slug: "mental-health", category: TagCategory.LIFESTYLE },
          { name: "Sleep Optimization", nameCn: "睡眠优化", slug: "sleep-optimization", category: TagCategory.LIFESTYLE },
          { name: "Skincare & Beauty", nameCn: "护肤美容", slug: "skincare-beauty", category: TagCategory.LIFESTYLE },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 3. BUSINESS & CAREER 商业与职业
  // ══════════════════════════════════════════════
  {
    name: "Business & Career",
    nameCn: "商业与职业",
    slug: "business",
    category: TagCategory.BUSINESS,
    children: [
      {
        name: "Industry",
        nameCn: "行业",
        slug: "industry",
        category: TagCategory.BUSINESS,
        children: [
          { name: "Tech & Software", nameCn: "科技软件", slug: "tech", category: TagCategory.BUSINESS },
          { name: "Finance & Banking", nameCn: "金融银行", slug: "finance", category: TagCategory.BUSINESS },
          { name: "Education", nameCn: "教育", slug: "education", category: TagCategory.BUSINESS },
          { name: "Healthcare", nameCn: "医疗", slug: "healthcare", category: TagCategory.BUSINESS },
          { name: "Real Estate", nameCn: "房地产", slug: "real-estate", category: TagCategory.BUSINESS },
          { name: "E-Commerce", nameCn: "电商", slug: "ecommerce", category: TagCategory.BUSINESS },
          { name: "Food & Beverage", nameCn: "餐饮", slug: "food-bev", category: TagCategory.BUSINESS },
          { name: "Legal", nameCn: "法律", slug: "legal", category: TagCategory.BUSINESS },
          { name: "Media & Content", nameCn: "媒体内容", slug: "media", category: TagCategory.BUSINESS },
          { name: "Consulting", nameCn: "咨询", slug: "consulting", category: TagCategory.BUSINESS },
        ],
      },
      {
        name: "Entrepreneurship",
        nameCn: "创业",
        slug: "entrepreneurship",
        category: TagCategory.BUSINESS,
        children: [
          { name: "Startup Founder", nameCn: "初创创始人", slug: "startup-founder", category: TagCategory.BUSINESS },
          { name: "Freelance / Solopreneur", nameCn: "自由职业", slug: "freelance", category: TagCategory.BUSINESS },
          { name: "Side Hustle", nameCn: "副业", slug: "side-hustle", category: TagCategory.BUSINESS },
          { name: "Investing", nameCn: "投资理财", slug: "investing", category: TagCategory.BUSINESS },
          { name: "Crypto & Web3", nameCn: "加密与Web3", slug: "crypto-web3", category: TagCategory.BUSINESS },
        ],
      },
      {
        name: "Skills & Growth",
        nameCn: "技能成长",
        slug: "skills-growth",
        category: TagCategory.BUSINESS,
        children: [
          { name: "Leadership", nameCn: "领导力", slug: "leadership", category: TagCategory.BUSINESS },
          { name: "Public Speaking", nameCn: "演讲", slug: "public-speaking", category: TagCategory.BUSINESS },
          { name: "Marketing & Branding", nameCn: "营销品牌", slug: "marketing-branding", category: TagCategory.BUSINESS },
          { name: "AI & Data Science", nameCn: "AI与数据科学", slug: "ai-data-science", category: TagCategory.BUSINESS },
          { name: "Product Management", nameCn: "产品管理", slug: "product-management", category: TagCategory.BUSINESS },
          { name: "Writing & Copywriting", nameCn: "写作文案", slug: "writing-copy", category: TagCategory.BUSINESS },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 4. ARTS & CULTURE 艺术与文化
  // ══════════════════════════════════════════════
  {
    name: "Arts & Culture",
    nameCn: "艺术与文化",
    slug: "arts",
    category: TagCategory.ARTS,
    children: [
      {
        name: "Creative Arts",
        nameCn: "创意艺术",
        slug: "creative-arts",
        category: TagCategory.ARTS,
        children: [
          { name: "Visual Art & Design", nameCn: "视觉艺术设计", slug: "art-design", category: TagCategory.ARTS },
          { name: "Music", nameCn: "音乐", slug: "music", category: TagCategory.ARTS },
          { name: "Photography", nameCn: "摄影", slug: "photography", category: TagCategory.ARTS },
          { name: "Film & Video", nameCn: "影视", slug: "film-video", category: TagCategory.ARTS },
          { name: "Creative Writing", nameCn: "文学创作", slug: "creative-writing", category: TagCategory.ARTS },
        ],
      },
      {
        name: "Culture & Humanities",
        nameCn: "文化人文",
        slug: "culture-humanities",
        category: TagCategory.ARTS,
        children: [
          { name: "History", nameCn: "历史", slug: "history", category: TagCategory.ARTS },
          { name: "Philosophy", nameCn: "哲学", slug: "philosophy", category: TagCategory.ARTS },
          { name: "Languages", nameCn: "语言学习", slug: "languages", category: TagCategory.ARTS },
          { name: "Book Club / Reading", nameCn: "读书会", slug: "reading", category: TagCategory.ARTS },
          { name: "Calligraphy", nameCn: "书法", slug: "calligraphy", category: TagCategory.ARTS },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 5. SOCIAL & ENTERTAINMENT 社交与娱乐
  // ══════════════════════════════════════════════
  {
    name: "Social & Entertainment",
    nameCn: "社交与娱乐",
    slug: "social",
    category: TagCategory.SOCIAL,
    children: [
      {
        name: "Entertainment",
        nameCn: "娱乐",
        slug: "entertainment",
        category: TagCategory.SOCIAL,
        children: [
          { name: "Gaming", nameCn: "游戏", slug: "gaming", category: TagCategory.SOCIAL },
          { name: "Anime & Manga", nameCn: "动漫", slug: "anime-manga", category: TagCategory.SOCIAL },
          { name: "K-Drama & C-Drama", nameCn: "韩剧国剧", slug: "drama-series", category: TagCategory.SOCIAL },
          { name: "Podcasts", nameCn: "播客", slug: "podcasts", category: TagCategory.SOCIAL },
          { name: "Board Games & Strategy", nameCn: "桌游策略", slug: "board-games", category: TagCategory.SOCIAL },
        ],
      },
      {
        name: "Social & Community",
        nameCn: "社群互动",
        slug: "social-community",
        category: TagCategory.SOCIAL,
        children: [
          { name: "Meetups & Events", nameCn: "线下聚会", slug: "meetups-events", category: TagCategory.SOCIAL },
          { name: "Volunteering", nameCn: "志愿服务", slug: "volunteering", category: TagCategory.SOCIAL },
          { name: "Parenting", nameCn: "育儿", slug: "parenting", category: TagCategory.SOCIAL },
          { name: "Pet Lovers", nameCn: "宠物", slug: "pets", category: TagCategory.SOCIAL },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 6. GOALS 目标 (flat, no subcategories)
  // ══════════════════════════════════════════════
  {
    name: "Goals",
    nameCn: "目标",
    slug: "goals",
    category: TagCategory.GOAL,
    children: [
      { name: "Find Co-Founder", nameCn: "找创业伙伴", slug: "find-cofounder", category: TagCategory.GOAL },
      { name: "Find Gui Ren", nameCn: "找贵人", slug: "find-guiren", category: TagCategory.GOAL },
      { name: "Learn Astrology", nameCn: "学命理", slug: "learn-astrology", category: TagCategory.GOAL },
      { name: "Make Friends", nameCn: "交朋友", slug: "make-friends", category: TagCategory.GOAL },
      { name: "Love & Relationships", nameCn: "感情指导", slug: "love-guidance", category: TagCategory.GOAL },
      { name: "Career Planning", nameCn: "职业规划", slug: "career-planning", category: TagCategory.GOAL },
      { name: "Spiritual Growth", nameCn: "灵性成长", slug: "spiritual-growth", category: TagCategory.GOAL },
      { name: "Networking", nameCn: "拓展人脉", slug: "networking", category: TagCategory.GOAL },
      { name: "Health & Wellness", nameCn: "养生健康", slug: "health-wellness-goal", category: TagCategory.GOAL },
      { name: "Financial Freedom", nameCn: "财务自由", slug: "financial-freedom", category: TagCategory.GOAL },
    ],
  },
];

// ─── Map old tags (by name+category) to new slugs for upsert ───
const OLD_TAG_MIGRATION: Record<string, { newSlug: string; newCategory: TagCategory }> = {
  // INDUSTRY → BUSINESS
  "tech|INDUSTRY": { newSlug: "tech", newCategory: TagCategory.BUSINESS },
  "finance|INDUSTRY": { newSlug: "finance", newCategory: TagCategory.BUSINESS },
  "education|INDUSTRY": { newSlug: "education", newCategory: TagCategory.BUSINESS },
  "healthcare|INDUSTRY": { newSlug: "healthcare", newCategory: TagCategory.BUSINESS },
  "art-design|INDUSTRY": { newSlug: "art-design", newCategory: TagCategory.ARTS },
  "real-estate|INDUSTRY": { newSlug: "real-estate", newCategory: TagCategory.BUSINESS },
  "freelance|INDUSTRY": { newSlug: "freelance", newCategory: TagCategory.BUSINESS },
  "ecommerce|INDUSTRY": { newSlug: "ecommerce", newCategory: TagCategory.BUSINESS },
  "food-bev|INDUSTRY": { newSlug: "food-bev", newCategory: TagCategory.BUSINESS },
  "legal|INDUSTRY": { newSlug: "legal", newCategory: TagCategory.BUSINESS },
  "media|INDUSTRY": { newSlug: "media", newCategory: TagCategory.BUSINESS },
  "consulting|INDUSTRY": { newSlug: "consulting", newCategory: TagCategory.BUSINESS },
  // INTEREST → various
  "ziwei-doushu|INTEREST": { newSlug: "ziwei-doushu", newCategory: TagCategory.METAPHYSICS },
  "feng-shui|INTEREST": { newSlug: "feng-shui", newCategory: TagCategory.METAPHYSICS },
  "meditation|INTEREST": { newSlug: "meditation", newCategory: TagCategory.METAPHYSICS },
  "investing|INTEREST": { newSlug: "investing", newCategory: TagCategory.BUSINESS },
  "fitness|INTEREST": { newSlug: "gym-lifting", newCategory: TagCategory.LIFESTYLE },
  "travel|INTEREST": { newSlug: "backpacking", newCategory: TagCategory.LIFESTYLE },
  "reading|INTEREST": { newSlug: "reading", newCategory: TagCategory.ARTS },
  "music|INTEREST": { newSlug: "music", newCategory: TagCategory.ARTS },
  "photography|INTEREST": { newSlug: "photography", newCategory: TagCategory.ARTS },
  "astrology|INTEREST": { newSlug: "natal-charts", newCategory: TagCategory.METAPHYSICS },
  "bazi|INTEREST": { newSlug: "bazi", newCategory: TagCategory.METAPHYSICS },
  "tarot|INTEREST": { newSlug: "tarot", newCategory: TagCategory.METAPHYSICS },
  // GOAL → GOAL (same category, update name)
  "find-cofounder|GOAL": { newSlug: "find-cofounder", newCategory: TagCategory.GOAL },
  "find-guiren|GOAL": { newSlug: "find-guiren", newCategory: TagCategory.GOAL },
  "learn-astrology|GOAL": { newSlug: "learn-astrology", newCategory: TagCategory.GOAL },
  "make-friends|GOAL": { newSlug: "make-friends", newCategory: TagCategory.GOAL },
  "love-guidance|GOAL": { newSlug: "love-guidance", newCategory: TagCategory.GOAL },
  "career-planning|GOAL": { newSlug: "career-planning", newCategory: TagCategory.GOAL },
  "spiritual-growth|GOAL": { newSlug: "spiritual-growth", newCategory: TagCategory.GOAL },
  "networking|GOAL": { newSlug: "networking", newCategory: TagCategory.GOAL },
};

// Build a flat lookup: slug → TagDef (leaf/subcategory only, depth 1+2)
function flattenTree(tree: TagDef[]): Map<string, TagDef & { depth: number; parentSlug?: string }> {
  const map = new Map<string, TagDef & { depth: number; parentSlug?: string }>();
  for (const group of tree) {
    // depth 0 = top group
    map.set(group.slug, { ...group, depth: 0 });
    if (group.children) {
      for (const sub of group.children) {
        // For GOAL category, children are depth 1 leaves (no subcategory step)
        const subDepth = group.category === TagCategory.GOAL ? 1 : 1;
        map.set(sub.slug, { ...sub, depth: subDepth, parentSlug: group.slug });
        if (sub.children) {
          for (const leaf of sub.children) {
            map.set(leaf.slug, { ...leaf, depth: 2, parentSlug: sub.slug });
          }
        }
      }
    }
  }
  return map;
}

async function main() {
  console.log("Seeding hierarchical tags...");

  const flat = flattenTree(TAG_TREE);

  // Step 1: Migrate existing old tags by updating their category + adding slug
  const existingTags = await prisma.tag.findMany();
  for (const existing of existingTags) {
    const key = `${existing.name}|${existing.category}`;
    const migration = OLD_TAG_MIGRATION[key];
    if (migration) {
      const newDef = flat.get(migration.newSlug);
      if (newDef) {
        await prisma.tag.update({
          where: { id: existing.id },
          data: {
            name: newDef.name,
            nameCn: newDef.nameCn,
            category: migration.newCategory,
            slug: migration.newSlug,
            depth: newDef.depth,
          },
        });
        console.log(`  Migrated: ${existing.name} → ${newDef.name} (${migration.newCategory})`);
      }
    }
  }

  // Step 2: Create all tags in hierarchy order (parents first)
  // We need to create by depth: 0 → 1 → 2
  const slugToId = new Map<string, string>();

  // Load any already-migrated tags
  const afterMigration = await prisma.tag.findMany({ where: { slug: { not: null } } });
  for (const t of afterMigration) {
    if (t.slug) slugToId.set(t.slug, t.id);
  }

  let order = 0;
  for (const depth of [0, 1, 2]) {
    for (const [slug, def] of flat) {
      if (def.depth !== depth) continue;
      if (slugToId.has(slug)) {
        // Already exists (migrated), just update parentId + order
        const parentId = def.parentSlug ? slugToId.get(def.parentSlug) || null : null;
        await prisma.tag.update({
          where: { id: slugToId.get(slug)! },
          data: { parentId, order: order++, depth },
        });
        continue;
      }

      const parentId = def.parentSlug ? slugToId.get(def.parentSlug) || null : null;
      const tag = await prisma.tag.create({
        data: {
          name: def.name,
          nameCn: def.nameCn,
          category: def.category,
          slug,
          depth,
          order: order++,
          parentId,
        },
      });
      slugToId.set(slug, tag.id);
    }
  }

  const total = await prisma.tag.count();
  console.log(`Done! Total tags in DB: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
