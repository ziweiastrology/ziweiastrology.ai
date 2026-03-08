/**
 * Crawl ziweidoushu.info articles for ZWDS knowledge base.
 * Uses Playwright to render JS-heavy pages.
 *
 * Run: npx tsx scripts/crawl-zwds-knowledge.ts
 */
import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "data", "zwds-knowledge");

// All article URLs from sitemap (deduplicated)
const ARTICLE_URLS = [
  "https://ziweidoushu.info/article/zi-wei-dou-shu-gong-wei",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-how-to-ask",
  "https://ziweidoushu.info/article/ming-gong-jiben-gainian",
  "https://ziweidoushu.info/article/ming-gong-zhuxing-xiangjie",
  "https://ziweidoushu.info/article/ming-gong-liunian-yunshi",
  "https://ziweidoushu.info/article/brother-palace-basics",
  "https://ziweidoushu.info/article/brother-palace-stars-analysis",
  "https://ziweidoushu.info/article/brother-palace-practical-guide",
  "https://ziweidoushu.info/article/what-is-spouse-palace",
  "https://ziweidoushu.info/article/spouse-palace-stars-analysis",
  "https://ziweidoushu.info/article/spouse-palace-practical-guide",
  "https://ziweidoushu.info/article/what-is-daxian-analysis",
  "https://ziweidoushu.info/article/how-to-calculate-daxian",
  "https://ziweidoushu.info/article/advanced-daxian-analysis",
  "https://ziweidoushu.info/article/shi-ye-gong-jie-shao",
  "https://ziweidoushu.info/article/tian-zhai-gong-jie-shao",
  "https://ziweidoushu.info/article/child-palace-practical-application",
  "https://ziweidoushu.info/article/lun-ming-bu-zhou",
  "https://ziweidoushu.info/article/san-fang-si-zheng",
  "https://ziweidoushu.info/article/cai-bo-gong-de-mi-mi",
  "https://ziweidoushu.info/article/cai-bo-gong-zhu-xing-fu-xing",
  "https://ziweidoushu.info/article/ji-e-gong-jian-jie",
  "https://ziweidoushu.info/article/qian-yi-gong-de-wei-zhi-he-nei-han",
  "https://ziweidoushu.info/article/jiao-you-gong-jie-shao",
  "https://ziweidoushu.info/article/fu-de-gong-jie-shao",
  "https://ziweidoushu.info/article/fu-mu-gong-jie-shao",
  "https://ziweidoushu.info/article/shen-gong-jie-shao",
  "https://ziweidoushu.info/article/ming-pan-jie-gou-pai-pan",
  "https://ziweidoushu.info/article/yin-yang-wu-xing-yu-gan-zhi",
  "https://ziweidoushu.info/article/shi-si-zhu-xing",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-zhong-de-fu-xing-yu-ji-xing-jie-xi",
  "https://ziweidoushu.info/article/sha-xing-yu-ji-xing",
  "https://ziweidoushu.info/article/lu-cun-yu-tian-ma",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-si-hua-jing-yao-：-lu-quan-ke-ji-de-ji-chu-jie-xi-yu-ying-yong",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-fei-xing-ji-fa-ru-men-：-ji-chu-gai-nian-yu-shi-zhan-ying-yong",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-ji-chu-：-zi-hua-yu-chong-zhao-zhi-yi-li-tan-xi",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-chang-jian-ge-ju-ru-men-：-cong-ji-chu-zhang-wo-ming-pan-ji-xiong",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-liu-nian-fen-xi-ru-men-：-cong-ming-pan-ji-chu-dao-ji-xiong-yu-ce",
  "https://ziweidoushu.info/article/zi-wei-dou-shu-liu-yue-liu-ri-：-zhang-wo-ming-pan-shi-yun-bian-hua-de-ji-chu-zhi-dao",
];

// Additional URLs with encoded Chinese characters
const EXTRA_URLS = [
  "https://ziweidoushu.info/article/《-zi-wei-dou-shu-jie-mi-：-za-yao-xing-yao-de-ji-chu-zhi-shi-yu-ming-pan-ying-yong-》",
  "https://ziweidoushu.info/article/《-xing-yao-ming-an-ding-ji-xiong-：-zi-wei-dou-shu-liang-du-pan-duan-wan-quan-zhi-nan-》",
  "https://ziweidoushu.info/article/《-sheng-nian-si-hua-：-zi-wei-dou-shu-ming-pan-jie-xi-de-he-xin-yao-shi-》",
  "https://ziweidoushu.info/article/《-zi-wei-ming-pan-zhong-de-die-gong-yu-jie-pan-：-cong-ru-men-dao-jing-tong-》",
];

const ALL_URLS = [...ARTICLE_URLS, ...EXTRA_URLS];

function slugFromUrl(url: string): string {
  const parts = url.split("/article/");
  return (parts[1] || "unknown")
    .replace(/[《》：]/g, "")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function crawlArticle(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof chromium.launch>>["newPage"]>>,
  url: string,
): Promise<{ slug: string; title: string; content: string } | null> {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    // Wait for article content to render
    await page.waitForSelector("article, main, .article, .content, h1", {
      timeout: 10000,
    }).catch(() => {});

    // Extract title
    const title = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      if (h1) return h1.textContent?.trim() || "";
      const title = document.querySelector("title");
      return title?.textContent?.trim() || "";
    });

    // Extract main content as text
    const content = await page.evaluate(() => {
      // Try common article selectors
      const selectors = [
        "article",
        "main article",
        ".article-content",
        ".post-content",
        ".content",
        "main",
      ];

      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.textContent && el.textContent.trim().length > 200) {
          // Get text content, preserving structure
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          const parts: string[] = [];
          let node: Node | null;
          while ((node = walker.nextNode())) {
            const text = node.textContent?.trim();
            if (text) parts.push(text);
          }
          return parts.join("\n");
        }
      }

      // Fallback: get all text from body, skip nav/footer/header
      const body = document.body.cloneNode(true) as HTMLElement;
      body.querySelectorAll("nav, footer, header, script, style, noscript").forEach((el) => el.remove());
      return body.textContent?.trim() || "";
    });

    if (!content || content.length < 100) {
      console.log(`  ⚠ Skipped (too short): ${url}`);
      return null;
    }

    return { slug: slugFromUrl(url), title, content };
  } catch (e) {
    console.error(`  ✗ Error crawling ${url}:`, (e as Error).message);
    return null;
  }
}

async function main() {
  // Create output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Crawling ${ALL_URLS.length} articles from ziweidoushu.info...`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  const results: Array<{ slug: string; title: string; file: string }> = [];
  let success = 0;
  let failed = 0;

  for (let i = 0; i < ALL_URLS.length; i++) {
    const url = ALL_URLS[i];
    const slug = slugFromUrl(url);
    console.log(`[${i + 1}/${ALL_URLS.length}] ${slug}`);

    const article = await crawlArticle(page, url);

    if (article) {
      const filename = `${article.slug}.md`;
      const filePath = path.join(OUTPUT_DIR, filename);

      const markdown = `# ${article.title}\n\nSource: ${url}\n\n---\n\n${article.content}`;
      fs.writeFileSync(filePath, markdown, "utf-8");

      results.push({ slug: article.slug, title: article.title, file: filename });
      success++;
      console.log(`  ✓ ${article.title} (${article.content.length} chars)`);
    } else {
      failed++;
    }

    // Polite delay between requests
    await new Promise((r) => setTimeout(r, 1500));
  }

  await browser.close();

  // Write index file
  const indexContent = `# ZWDS Knowledge Base\n\nCrawled from ziweidoushu.info on ${new Date().toISOString().slice(0, 10)}\n\n## Articles (${success} total)\n\n${results.map((r) => `- [${r.title}](./${r.file})`).join("\n")}\n`;
  fs.writeFileSync(path.join(OUTPUT_DIR, "INDEX.md"), indexContent, "utf-8");

  console.log(`\n=============================`);
  console.log(`Done! ${success} articles saved, ${failed} failed.`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
