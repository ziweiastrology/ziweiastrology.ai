import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const KNOWLEDGE_DIR = path.join(__dirname, "../data/zwds-knowledge-en");

const EDITORIAL_EMAIL = "editorial@ziweiastrology.ai";

// Posts selection: filename → { type, category, tags, pinned }
const POST_ARTICLES: Record<
  string,
  {
    type: "DISCUSSION" | "PILLAR_DATA";
    category: string;
    tags: string[];
    pinned?: boolean;
  }
> = {
  // Palace deep dives → PILLAR_DATA
  "ming-gong-jiben-gainian.md": {
    type: "PILLAR_DATA",
    category: "palaces",
    tags: ["命宮", "紫微斗數", "宮位"],
    pinned: true,
  },
  "what-is-spouse-palace.md": {
    type: "PILLAR_DATA",
    category: "palaces",
    tags: ["夫妻宮", "紫微斗數", "感情"],
  },
  "cai-bo-gong-de-mi-mi.md": {
    type: "PILLAR_DATA",
    category: "palaces",
    tags: ["財帛宮", "紫微斗數", "財運"],
  },
  "ji-e-gong-jian-jie.md": {
    type: "PILLAR_DATA",
    category: "palaces",
    tags: ["疾厄宮", "紫微斗數", "健康"],
  },
  "fu-de-gong-jie-shao.md": {
    type: "PILLAR_DATA",
    category: "palaces",
    tags: ["福德宮", "紫微斗數", "精神"],
  },
  "shen-gong-jie-shao.md": {
    type: "PILLAR_DATA",
    category: "palaces",
    tags: ["身宮", "紫微斗數", "氣質"],
  },

  // Star guides → PILLAR_DATA
  "shi-si-zhu-xing.md": {
    type: "PILLAR_DATA",
    category: "stars",
    tags: ["主星", "十四主星", "紫微斗數"],
    pinned: true,
  },
  "sha-xing-yu-ji-xing.md": {
    type: "PILLAR_DATA",
    category: "stars",
    tags: ["煞星", "忌星", "紫微斗數"],
  },
  "lu-cun-yu-tian-ma.md": {
    type: "PILLAR_DATA",
    category: "stars",
    tags: ["祿存", "天馬", "紫微斗數"],
  },

  // Techniques → DISCUSSION
  "san-fang-si-zheng.md": {
    type: "DISCUSSION",
    category: "techniques",
    tags: ["三方四正", "解盤", "紫微斗數"],
    pinned: true,
  },
  "lun-ming-bu-zhou.md": {
    type: "DISCUSSION",
    category: "techniques",
    tags: ["論命步驟", "解盤", "紫微斗數"],
  },
  "yin-yang-wu-xing-yu-gan-zhi.md": {
    type: "DISCUSSION",
    category: "fundamentals",
    tags: ["陰陽五行", "天干地支", "紫微斗數"],
  },
};

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

function stripSourceLine(content: string): string {
  return content.replace(/^Source:.*\n?/m, "").trim();
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

async function uniquePostSlug(title: string): Promise<string> {
  const base = slugify(title);
  if (!base) return `post-${Date.now()}`;

  const existing = await prisma.post.findUnique({ where: { slug: base } });
  if (!existing) return base;

  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    const found = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!found) return candidate;
  }

  return `${base}-${Date.now()}`;
}

export async function seedPosts() {
  console.log("Seeding ZWDS community posts...");

  // Look up editorial user
  const editorial = await prisma.user.findUnique({
    where: { email: EDITORIAL_EMAIL },
  });

  if (!editorial) {
    console.error(
      `Editorial user not found (${EDITORIAL_EMAIL}). ` +
        `Create this user first, then re-run.`
    );
    return;
  }

  let count = 0;
  for (const [filename, meta] of Object.entries(POST_ARTICLES)) {
    const filepath = path.join(KNOWLEDGE_DIR, filename);
    if (!fs.existsSync(filepath)) {
      console.warn(`  Skipping missing file: ${filename}`);
      continue;
    }

    const raw = fs.readFileSync(filepath, "utf-8");
    const title = extractTitle(raw);
    let content = stripSourceLine(raw);

    // Trim to ~3000 chars for feed readability
    if (content.length > 3000) {
      content = content.slice(0, 3000).trimEnd() + "\n\n---\n*閱讀完整文章，請查看「資源」頁面。*";
    }

    const slug = await uniquePostSlug(title);

    // Check if post with same title by editorial already exists
    const existing = await prisma.post.findFirst({
      where: { title, authorId: editorial.id },
    });

    if (existing) {
      console.log(`  ⏭ Already exists: ${title}`);
      count++;
      continue;
    }

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        type: meta.type,
        category: meta.category,
        tags: meta.tags,
        pinned: meta.pinned ?? false,
        authorId: editorial.id,
      },
    });

    count++;
    console.log(`  ✓ ${slug} (${meta.type})`);
  }

  console.log(`Seeded ${count} ZWDS community posts.`);
}

// Allow running standalone
if (require.main === module) {
  seedPosts()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
