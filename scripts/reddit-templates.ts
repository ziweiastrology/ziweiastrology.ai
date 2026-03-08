import type { PostTemplate } from "../src/types/reddit";

const SITE = "https://ziweiastrology.ai";

export const templates: PostTemplate[] = [
  // ── Blog Link Posts ────────────────────────────────────────────────
  {
    id: "blog-intro",
    name: "Blog: What Is Zi Wei Dou Shu?",
    description:
      "Introduction blog post — great for broad astrology communities",
    kind: "link",
    title:
      "What Is Zi Wei Dou Shu? A Complete Introduction to Purple Star Astrology",
    url: `${SITE}/blog/what-is-zi-wei-dou-shu`,
    recommended_subreddits: [
      "astrology",
      "chineseastrology",
      "ZiWeiDouShu",
      "spirituality",
    ],
    tags: ["beginner", "educational", "blog"],
  },
  {
    id: "blog-first-chart",
    name: "Blog: Reading Your First Chart",
    description: "Practical beginner guide — best for Q&A and learning subs",
    kind: "link",
    title:
      "Reading Your First Zi Wei Chart: A Practical Beginner's Guide",
    url: `${SITE}/blog/reading-your-first-zi-wei-chart`,
    recommended_subreddits: [
      "AskAstrologers",
      "ZiWeiDouShu",
      "chineseastrology",
    ],
    tags: ["beginner", "practical", "blog"],
  },
  {
    id: "blog-ziwei-star",
    name: "Blog: Zi Wei Star — The Emperor",
    description: "Deep analysis of the Emperor Star — for advanced communities",
    kind: "link",
    title:
      "Zi Wei Star (紫微星): The Emperor of the Chart — What It Reveals About You",
    url: `${SITE}/blog/zi-wei-star-emperor-of-the-chart`,
    recommended_subreddits: [
      "Advancedastrology",
      "ZiWeiDouShu",
      "chineseastrology",
    ],
    tags: ["intermediate", "analysis", "blog"],
  },

  // ── System Comparison (Text Post) ─────────────────────────────────
  {
    id: "system-comparison",
    name: "System Comparison: ZWDS vs Western vs Ba Zi",
    description:
      "Value-first text post comparing astrology systems with data",
    kind: "self",
    title:
      "I compared Zi Wei Dou Shu to Western Astrology and Ba Zi — here's what I found",
    text: `I've been studying Zi Wei Dou Shu (紫微斗数), often called "Purple Star Astrology," and decided to do a structured comparison against Western Astrology, Ba Zi (Four Pillars), I Ching, and Tarot.

Here's how they stack up across 5 analytical dimensions:

**Time Precision**
- Western: Birth date + approximate time → ~30 min windows
- Ba Zi: Year/Month/Day/Hour pillars → 2-hour windows
- Zi Wei Dou Shu: Exact birth time → 2-hour windows BUT with 12 palace positions that create unique combinations

**Structural Complexity**
- Western: ~10 planets + 12 houses + aspects = ~50-70 variables
- Ba Zi: 8 characters + 10 gods + luck pillars = ~30-40 variables
- Zi Wei Dou Shu: 108+ stars across 12 palaces × 9 evolution levels = 108+ core variables

**Time Layers**
- Western: Transits + progressions (2 layers)
- Ba Zi: 10-year luck pillars + annual (2 layers)
- Zi Wei Dou Shu: Decade + Annual + Monthly + Daily (4 layers)

**Strength Grading**
- Western: Dignities (domicile/exaltation/detriment/fall) — 4 levels
- Ba Zi: Strength by season — binary (strong/weak)
- Zi Wei Dou Shu: 6-grade brightness system (庙/旺/得/利/平/陷) — 6 levels

**Predictive Timing**
- Western: General trends via transits
- Ba Zi: 10-year periods with annual detail
- Zi Wei Dou Shu: Pinpoints specific decades, years, months, and days

I wrote a detailed breakdown with side-by-side data at: ${SITE}/system-comparison

What's your experience? Has anyone else compared these systems?`,
    recommended_subreddits: [
      "astrology",
      "BaZi",
      "ZiWeiDouShu",
      "chineseastrology",
    ],
    tags: ["comparison", "educational", "data"],
  },

  // ── Case Study (Text Post) ────────────────────────────────────────
  {
    id: "case-study-career",
    name: "Case Study: Celebrity Career Charts",
    description: "Career analysis using real celebrity examples from the site",
    kind: "self",
    title:
      "I analyzed celebrity career charts using Zi Wei Dou Shu — the pattern accuracy is fascinating",
    text: `I've been using Zi Wei Dou Shu (紫微斗数) to analyze celebrity career paths, and the patterns are remarkably specific.

**Example: Elon Musk**
His Career Palace (官禄宫) shows 紫微旺 (Emperor Star at peak brightness) combined with 破军得 (Army Breaker star). This combination literally translates to "sovereign authority that destroys and rebuilds" — which maps eerily well to his pattern of entering established industries (PayPal → automotive → aerospace → social media) and disrupting them from within.

The key timing indicator: 化权 (Power Transformer) activating during his 30s decade, combined with 大限化忌 (Decade Obstruction), suggests someone who gains power precisely THROUGH crisis and opposition.

**Example: Su Dongpo (Historical)**
贪狼旺 (Greedy Wolf star at peak brightness) with 化禄 + 天马 shows serial career changes driven by talent abundance rather than dissatisfaction — confirmed by his historical record as poet, politician, engineer, and chef.

The system uses 108+ stars across 12 life palaces with a 6-grade brightness system, which creates enough resolution to distinguish between "career change due to restlessness" vs "career change due to opportunity" vs "career change due to external force."

Full case studies with chart breakdowns: ${SITE}/case-studies

Has anyone else used ZWDS for career analysis? Curious about your findings.`,
    recommended_subreddits: [
      "astrology",
      "ZiWeiDouShu",
      "Advancedastrology",
    ],
    tags: ["case-study", "career", "analysis"],
  },

  // ── Pillar: Binary Logic (Text Post) ──────────────────────────────
  {
    id: "pillar-binary",
    name: "Pillar: Binary Logic — 3,000 Years Before Silicon Valley",
    description:
      "Historical/tech angle about I Ching's binary system — for TIL and history subs",
    kind: "self",
    title:
      "TIL the I Ching encoded binary logic 3,000 years before Leibniz — and Zi Wei Dou Shu extended it to 108+ variables",
    text: `The I Ching (易经) uses a yin-yang binary system that Leibniz explicitly cited when he published his binary arithmetic in 1703. But the encoding goes deeper than a simple 0/1 toggle.

**The 6-Bit Code**
Each I Ching hexagram is a stack of 6 lines, each either broken (yin/0) or solid (yang/1). That's 2^6 = 64 possible states — essentially a 6-bit encoding system developed ~3,000 years ago.

**The Extension to 108+ Variables**
Zi Wei Dou Shu (紫微斗数), developed during the Song Dynasty (~1,000 years ago), took this binary cosmological framework and extended it into a computational system:
- 12 Palaces (life domains) × 9 Evolution Levels = 108 core variables
- Each star has a 6-grade brightness scale (庙/旺/得/利/平/陷)
- 4 Transformers (化禄/化权/化科/化忌) modify star behavior
- Time layers at decade, annual, monthly, and daily resolution

The result is essentially a combinatorial analysis system for life-path modeling, built on the same binary logic foundations that would later power computing.

Deep dive: ${SITE}/system-comparison

What's fascinating is that this wasn't abstract mathematics — it was applied as a predictive framework by imperial courts for centuries.`,
    recommended_subreddits: [
      "todayilearned",
      "ChineseHistory",
      "history",
      "taoism",
    ],
    tags: ["history", "tech", "binary", "pillar"],
  },

  // ── Pillar: Forbidden Algorithm (Text Post) ───────────────────────
  {
    id: "pillar-forbidden",
    name: "Pillar: The Forbidden Algorithm",
    description:
      "Imperial history angle — how ZWDS was classified by Chinese emperors",
    kind: "self",
    title:
      "The 'Forbidden Algorithm': How Chinese emperors classified an astrology system as a state secret",
    text: `During the Song Dynasty, an astrology system called Zi Wei Dou Shu (紫微斗数 — "Purple Star Calculation") was developed and almost immediately restricted by the imperial court.

**Why was it classified?**
Unlike Western horoscopes that offer general personality descriptions, ZWDS was designed as a predictive analytics system. Using 108+ variables across 12 life domains, it could model:
- Career trajectories and optimal timing for advancement
- Health vulnerabilities by decade
- Relationship compatibility with structural (not just personality) analysis
- Wealth accumulation patterns

The imperial court recognized this as a strategic tool. If rival factions or foreign powers could predict the emperor's vulnerable periods or optimal timing for coups, the system became a national security risk.

**The Monopoly of Truth**
For centuries, only court-appointed astrologers had access to the complete computational tables. The "Purple Star" (紫微) in the name literally refers to the North Star — the celestial emperor — reinforcing its association with sovereign power.

**Democratization**
The system gradually leaked to civilian practitioners after the fall of the Song Dynasty, but even today, complete mastery is rare. Most practitioners in the Chinese-speaking world specialize in just 2-3 of the 12 palaces.

More on the history and how it compares to other systems: ${SITE}/system-comparison

The irony is that a system designed to consolidate imperial power is now freely available to anyone with a birth time.`,
    recommended_subreddits: [
      "ChineseHistory",
      "history",
      "taoism",
      "astrology",
    ],
    tags: ["history", "imperial", "pillar"],
  },
];

export function getTemplate(id: string): PostTemplate | undefined {
  return templates.find((t) => t.id === id);
}

export function listTemplates(): void {
  console.log("\nAvailable Reddit Post Templates:\n");
  for (const t of templates) {
    console.log(`  ${t.id}`);
    console.log(`    ${t.name}`);
    console.log(`    Type: ${t.kind} post`);
    console.log(`    Subreddits: ${t.recommended_subreddits.join(", ")}`);
    console.log(`    Tags: ${t.tags.join(", ")}`);
    console.log();
  }
}
