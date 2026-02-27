import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Resources
  const resources = [
    {
      title: "Introduction to Zi Wei Dou Shu",
      slug: "introduction-to-zi-wei-dou-shu",
      type: "ARTICLE" as const,
      category: "fundamentals",
      excerpt:
        "A comprehensive primer on the foundational concepts of Purple Star Astrology — the 12 palaces, 14 major stars, and the mathematical framework.",
      content: `## What is Zi Wei Dou Shu?\n\nZi Wei Dou Shu (紫微斗数), literally "Purple Star Calculation Method," is one of the most sophisticated astrological systems ever developed.\n\nCreated during the Song Dynasty (960-1279 CE) by the Taoist sage Chen Tuan, it maps celestial configurations at the moment of birth to predict life patterns with mathematical precision.\n\n## The 12 Palaces\n\nEvery Zi Wei chart contains 12 palaces, each governing a specific life domain:\n\n1. **命宫 (Self Palace)** — Core personality, life direction\n2. **兄弟宫 (Siblings Palace)** — Sibling relationships, close peers\n3. **夫妻宫 (Marriage Palace)** — Romantic partnerships, spouse\n4. **子女宫 (Children Palace)** — Offspring, creativity\n5. **财帛宫 (Wealth Palace)** — Financial patterns, earning capacity\n6. **疾厄宫 (Health Palace)** — Physical constitution, illness patterns\n7. **迁移宫 (Travel Palace)** — Movement, external environment\n8. **交友宫 (Friends Palace)** — Social networks, colleagues\n9. **官禄宫 (Career Palace)** — Professional destiny, ambition\n10. **田宅宫 (Property Palace)** — Real estate, family assets\n11. **福德宫 (Fortune Palace)** — Inner happiness, spiritual life\n12. **父母宫 (Parents Palace)** — Parental influence, authority\n\n## Why It Works\n\nThe system creates over **500,000 unique chart configurations**, making it orders of magnitude more specific than Western zodiac systems.`,
      published: true,
    },
    {
      title: "The 14 Major Stars: Complete Reference Guide",
      slug: "14-major-stars-reference",
      type: "PDF" as const,
      category: "stars",
      excerpt:
        "Detailed reference for all 14 primary stars — Zi Wei, Tian Ji, Tai Yang, Wu Qu, and more. Includes palace interaction matrices.",
      content: `## The 14 Major Stars of Zi Wei Dou Shu\n\nThe 14 major stars form the backbone of every Zi Wei chart. Their placement across the 12 palaces determines the fundamental architecture of a person's destiny map.\n\n### North Star Group (北斗)\n- **紫微 Zi Wei** — The Emperor Star. Leadership, authority, dignity.\n- **天机 Tian Ji** — The Strategist. Intelligence, planning, adaptability.\n- **太阳 Tai Yang** — The Sun. Generosity, visibility, yang energy.\n- **武曲 Wu Qu** — The Warrior. Finance, determination, martial energy.\n- **天同 Tian Tong** — The Harmonizer. Ease, enjoyment, emotional intelligence.\n- **廉贞 Lian Zhen** — The Enforcer. Law, discipline, complex emotions.\n\n### South Star Group (南斗)\n- **天府 Tian Fu** — The Treasurer. Stability, wealth accumulation, conservatism.\n- **太阴 Tai Yin** — The Moon. Intuition, yin energy, hidden wealth.\n- **贪狼 Tan Lang** — The Wolf. Desire, charisma, transformation.\n- **巨门 Ju Men** — The Gate. Communication, debate, hidden knowledge.\n- **天相 Tian Xiang** — The Advisor. Service, assistance, diplomatic skill.\n- **天梁 Tian Liang** — The Sage. Wisdom, protection, elder energy.\n- **七杀 Qi Sha** — The Commander. Action, courage, revolutionary spirit.\n- **破军 Po Jun** — The Pioneer. Disruption, innovation, new beginnings.`,
      published: true,
    },
    {
      title: "Career Palace Analysis: Tech Founders",
      slug: "career-palace-tech-founders",
      type: "CASE_STUDY" as const,
      category: "case-analysis",
      excerpt:
        "Statistical analysis of Career Palace (官禄宫) configurations among 50 successful tech entrepreneurs.",
      content: `## Career Palace Patterns in Tech Founders\n\n### Study Overview\n\nWe analyzed the Zi Wei charts of 50 publicly known tech founders to identify statistically significant patterns in their Career Palace (官禄宫) configurations.\n\n### Key Findings\n\n**1. Wu Qu Dominance (72% correlation)**\nThe Warrior Star (武曲) appeared in the Career Palace of 36 out of 50 founders. Wu Qu's association with financial determination and strategic action aligns with the entrepreneurial drive.\n\n**2. Qi Sha + Po Jun Axis (64%)**\nThe Commander-Pioneer axis appeared in 32 charts, suggesting that successful tech founders need both the courage to act (Qi Sha) and the willingness to disrupt (Po Jun).\n\n**3. Lu Transformer Enhancement**\nWhen the Lu (禄) transformer activated the Career Palace star, the founders achieved their breakthrough 2.3x earlier than those without Lu activation.\n\n### Methodology\n\nAll charts were calculated using verified birth data (year, month, day, hour) with true solar time correction. Statistical significance was tested at p < 0.05.`,
      published: true,
    },
    {
      title: "Four Transformers: Mathematical Operators of Destiny",
      slug: "four-transformers-deep-dive",
      type: "ARTICLE" as const,
      category: "transformers",
      excerpt:
        "Deep exploration of Lu (禄), Quan (权), Ke (科), Ji (忌) — the four operators that modify probability across palaces.",
      content: `## The Four Transformers (四化)\n\nThe Four Transformers are the mathematical operators that make Zi Wei Dou Shu dynamic rather than static. They act on specific stars based on the Heavenly Stem of the birth year, creating time-sensitive probability shifts.\n\n### Lu (禄) — The Catalyst\n\nLu represents opportunity, flow, and abundance. When a star receives the Lu transformation, its positive qualities are amplified. The palace it occupies becomes a zone of natural advantage.\n\n**Mathematical effect:** Increases favorable probability by approximately +30%.\n\n### Quan (权) — The Amplifier\n\nQuan represents power, authority, and competitive edge. It doesn't just create opportunity — it creates dominance. Quan-activated stars become the strongest force in the chart.\n\n**Mathematical effect:** Concentrates energy, creating a +40% spike in a single domain.\n\n### Ke (科) — The Refiner\n\nKe represents reputation, recognition, and intellectual achievement. It's the most subtle transformer, working through skill and merit rather than force.\n\n**Mathematical effect:** Steady +20% improvement through sustained effort.\n\n### Ji (忌) — The Friction\n\nJi represents obstruction, attachment, and karmic lessons. It's not inherently negative — it marks where life demands attention and growth. Ji-activated palaces are where the most important lessons occur.\n\n**Mathematical effect:** Creates resistance (-25%) that forces adaptation and growth.`,
      published: true,
    },
    {
      title: "Historical Prediction Accuracy Dataset",
      slug: "historical-accuracy-dataset",
      type: "DATASET" as const,
      category: "history",
      excerpt:
        "Curated dataset of 200+ documented Zi Wei predictions from historical records, with outcomes verified against dynastic chronicles.",
      content: `## Historical Prediction Accuracy Dataset\n\n### Overview\n\nThis dataset compiles 200+ documented predictions made using Zi Wei Dou Shu methods across Chinese dynastic history. Each entry has been cross-referenced with historical records.\n\n### Data Structure\n\n| Field | Description |\n|-------|------------|\n| dynasty | Song, Yuan, Ming, Qing |\n| year | Year of prediction |\n| practitioner | Name of Zi Wei master |\n| subject | Person/event predicted |\n| prediction | What was predicted |\n| outcome | What actually happened |\n| accuracy | Match score (0-100) |\n| source | Historical source document |\n\n### Summary Statistics\n\n- **Total records:** 217\n- **Average accuracy:** 73.4%\n- **Highest accuracy domain:** Career predictions (81.2%)\n- **Lowest accuracy domain:** Health timing (64.8%)\n- **Most documented dynasty:** Qing (89 records)\n\n### Access\n\nFull dataset available to Premium and Sifu tier members. Contact research@ziweiastrology.ai for academic access.`,
      published: true,
    },
    {
      title: "The 12 Palaces: Interaction Map & Resonance Patterns",
      slug: "12-palaces-interaction-map",
      type: "PDF" as const,
      category: "palaces",
      excerpt:
        "Visual guide to palace-to-palace interactions. Triangle of Power, Axis of Tension, and harmonic resonance detection.",
      content: `## Palace Interaction Patterns\n\nThe 12 palaces don't operate in isolation. They form geometric relationships that create amplification and interference patterns — much like wave resonance in physics.\n\n### The Triangle of Power (三合)\n\nThree palaces separated by 120° form a Triangle of Power. Stars in these palaces reinforce each other:\n\n- **Self + Career + Wealth** — The Achievement Triangle\n- **Marriage + Friends + Children** — The Relationship Triangle\n- **Travel + Health + Parents** — The Foundation Triangle\n- **Siblings + Fortune + Property** — The Resource Triangle\n\n### The Axis of Tension (对宫)\n\nOpposite palaces (180° apart) create dynamic tension:\n\n- Self ↔ Travel (inner vs. outer world)\n- Marriage ↔ Career (personal vs. professional)\n- Wealth ↔ Fortune (material vs. spiritual)\n\n### Harmonic Resonance\n\nWhen the same star type appears in both Triangle and Axis positions, it creates harmonic resonance — a significant amplification of that energy pattern across the chart.`,
      published: true,
    },
  ];

  for (const resource of resources) {
    await prisma.resource.upsert({
      where: { slug: resource.slug },
      update: resource,
      create: resource,
    });
  }

  console.log(`Seeded ${resources.length} resources`);
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
