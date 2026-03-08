import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const KNOWLEDGE_DIR = path.join(__dirname, "../data/zwds-knowledge-en");

// ~15 best articles for Resources, mapped to categories
const RESOURCE_ARTICLES: Record<string, string> = {
  // Palaces
  "ming-gong-jiben-gainian.md": "palaces",
  "ming-gong-zhuxing-xiangjie.md": "palaces",
  "ming-gong-liunian-yunshi.md": "palaces",
  "what-is-spouse-palace.md": "palaces",
  "spouse-palace-stars-analysis.md": "palaces",
  "spouse-palace-practical-guide.md": "palaces",
  "cai-bo-gong-de-mi-mi.md": "palaces",
  "cai-bo-gong-zhu-xing-fu-xing.md": "palaces",
  "ji-e-gong-jian-jie.md": "palaces",
  "qian-yi-gong-de-wei-zhi-he-nei-han.md": "palaces",
  "jiao-you-gong-jie-shao.md": "palaces",
  "fu-de-gong-jie-shao.md": "palaces",
  "fu-mu-gong-jie-shao.md": "palaces",
  "shen-gong-jie-shao.md": "palaces",
  // Stars
  "shi-si-zhu-xing.md": "stars",
  "zi-wei-dou-shu-zhong-de-fu-xing-yu-ji-xing-jie-xi.md": "stars",
  "sha-xing-yu-ji-xing.md": "stars",
  "lu-cun-yu-tian-ma.md": "stars",
  // Techniques
  "san-fang-si-zheng.md": "techniques",
  "lun-ming-bu-zhou.md": "techniques",
  // Fundamentals
  "yin-yang-wu-xing-yu-gan-zhi.md": "fundamentals",
  "ming-pan-jie-gou-pai-pan.md": "fundamentals",
};

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

function extractExcerpt(content: string): string {
  // Strip the title, source line, and separator
  const body = content
    .replace(/^#\s+.+$/m, "")
    .replace(/^Source:.*$/m, "")
    .replace(/^---$/m, "")
    .trim();

  // Strip markdown formatting for excerpt
  const plain = body
    .replace(/[#*_`\[\]()>]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return plain.slice(0, 200) + (plain.length > 200 ? "…" : "");
}

function stripSourceLine(content: string): string {
  return content.replace(/^Source:.*\n?/m, "").trim();
}

export async function seedResources() {
  console.log("Seeding ZWDS resources...");

  let count = 0;
  for (const [filename, category] of Object.entries(RESOURCE_ARTICLES)) {
    const filepath = path.join(KNOWLEDGE_DIR, filename);
    if (!fs.existsSync(filepath)) {
      console.warn(`  Skipping missing file: ${filename}`);
      continue;
    }

    const raw = fs.readFileSync(filepath, "utf-8");
    const title = extractTitle(raw);
    const slug = filename.replace(/\.md$/, "");
    const content = stripSourceLine(raw);
    const excerpt = extractExcerpt(raw);

    await prisma.resource.upsert({
      where: { slug },
      update: {
        title,
        type: "ARTICLE",
        category,
        excerpt,
        content,
        published: true,
      },
      create: {
        title,
        slug,
        type: "ARTICLE",
        category,
        excerpt,
        content,
        published: true,
      },
    });

    count++;
    console.log(`  ✓ ${slug} (${category})`);
  }

  console.log(`Seeded ${count} ZWDS resources.`);
}

// Allow running standalone
if (require.main === module) {
  seedResources()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
