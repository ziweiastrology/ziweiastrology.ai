"use client";

import { use } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, FileText, BookOpen, Database, FlaskConical, Calendar } from "lucide-react";
import { useResource } from "@/hooks/useResources";

const TYPE_ICON = {
  PDF: FileText,
  ARTICLE: BookOpen,
  DATASET: Database,
  CASE_STUDY: FlaskConical,
} as const;

// Placeholder content for sample resources (when DB not connected)
const PLACEHOLDER_CONTENT: Record<string, { title: string; type: string; category: string; content: string; createdAt: string }> = {
  "introduction-to-zi-wei-dou-shu": {
    title: "Introduction to Zi Wei Dou Shu",
    type: "ARTICLE",
    category: "fundamentals",
    createdAt: "2025-01-15T00:00:00Z",
    content: `## What is Zi Wei Dou Shu?

Zi Wei Dou Shu (紫微斗数), literally "Purple Star Calculation Method," is one of the most sophisticated astrological systems ever developed. Created during the Song Dynasty (960-1279 CE) by the Taoist sage Chen Tuan, it maps celestial configurations at the moment of birth to predict life patterns with mathematical precision.

## The 12 Palaces (十二宫)

Every Zi Wei chart contains 12 palaces, each governing a specific life domain:

1. **命宫 (Self Palace)** — Core personality, life direction
2. **兄弟宫 (Siblings Palace)** — Sibling relationships, close peers
3. **夫妻宫 (Marriage Palace)** — Romantic partnerships, spouse
4. **子女宫 (Children Palace)** — Offspring, creativity
5. **财帛宫 (Wealth Palace)** — Financial patterns, earning capacity
6. **疾厄宫 (Health Palace)** — Physical constitution, illness patterns
7. **迁移宫 (Travel Palace)** — Movement, external environment
8. **交友宫 (Friends Palace)** — Social networks, colleagues
9. **官禄宫 (Career Palace)** — Professional destiny, ambition
10. **田宅宫 (Property Palace)** — Real estate, family assets
11. **福德宫 (Fortune Palace)** — Inner happiness, spiritual life
12. **父母宫 (Parents Palace)** — Parental influence, authority

## The 14 Major Stars (十四主星)

The core of every chart is the placement of 14 major stars across these palaces. Each star carries specific energetic signatures that interact with the palace it occupies.

The system creates over **500,000 unique chart configurations**, making it orders of magnitude more specific than Western zodiac systems.

## Why It Works

Unlike systems based on belief, Zi Wei Dou Shu operates as a **probability model**. The Four Transformers (四化) act as mathematical operators that modify base probabilities — creating a dynamic, time-sensitive prediction engine.`,
  },
  "14-major-stars-reference": {
    title: "The 14 Major Stars: Complete Reference Guide",
    type: "PDF",
    category: "stars",
    createdAt: "2025-02-01T00:00:00Z",
    content: `## The 14 Major Stars (十四主星)

The backbone of every Zi Wei Dou Shu chart rests on the placement of 14 primary stars. These stars are divided into two groups based on their anchoring logic.

## Northern Dipper Group (北斗星系)

The Northern Dipper stars are positioned based on the Zi Wei star's location:

| Star | Chinese | Nature | Keywords |
|------|---------|--------|----------|
| Zi Wei | 紫微 | Earth Yang | Emperor, authority, noble bearing |
| Tian Ji | 天机 | Wood Yin | Strategist, intelligence, flux |
| Tai Yang | 太阳 | Fire Yang | Sun, generosity, public service |
| Wu Qu | 武曲 | Metal Yin | Warrior, finance, decisiveness |
| Tian Tong | 天同 | Water Yang | Hedonist, ease, emotional depth |
| Lian Zhen | 廉贞 | Fire Yin | Dual nature, passion, complexity |

## Southern Dipper Group (南斗星系)

Anchored to the Tian Fu star's position:

| Star | Chinese | Nature | Keywords |
|------|---------|--------|----------|
| Tian Fu | 天府 | Earth Yang | Treasurer, stability, conservation |
| Tai Yin | 太阴 | Water Yin | Moon, intuition, hidden wealth |
| Tan Lang | 贪狼 | Water/Wood | Desire, charisma, transformation |
| Ju Men | 巨门 | Water/Earth | Orator, controversy, analysis |
| Tian Xiang | 天相 | Water Yang | Minister, diplomacy, service |
| Tian Liang | 天梁 | Earth Yang | Elder, protection, longevity |
| Qi Sha | 七杀 | Fire/Metal | General, aggression, breakthrough |
| Po Jun | 破军 | Water Yin | Destroyer, revolution, renewal |

## Brightness Levels (亮度)

Every star has a brightness grade depending on which palace it occupies. Brightness determines whether a star's energy is fully expressed or suppressed:

- **庙 (Miào)** — Temple: Full brilliance, maximum positive expression
- **旺 (Wàng)** — Prosperous: Strong influence, mostly positive
- **得 (Dé)** — Gain: Moderate strength, functional
- **利 (Lì)** — Benefit: Mild influence, context-dependent
- **平 (Píng)** — Neutral: Baseline, neither strong nor weak
- **不 (Bù)** — Deficient: Weakened, struggles to express
- **陷 (Xiàn)** — Trapped: Severely limited, negative expression likely

## Palace Interaction Matrix

When two major stars share a palace, their combined effect is not simply additive. Certain pairings amplify each other (e.g., Zi Wei + Tian Fu = "Emperor Meets Treasurer"), while others create tension (e.g., Lian Zhen + Qi Sha = "Fire and Blade").

The reference tables in this guide map all 91 possible two-star pairings with their combined interpretation and palace-specific modifiers.`,
  },
  "career-palace-tech-founders": {
    title: "Career Palace Analysis: Tech Founders",
    type: "CASE_STUDY",
    category: "case-analysis",
    createdAt: "2025-03-10T00:00:00Z",
    content: `## Study Overview

This case study examines the Career Palace (官禄宫) configurations of 50 successful technology entrepreneurs. Charts were calculated from verified birth data and analyzed for recurring star patterns.

## Methodology

- **Sample size:** 50 verified tech founders (IPO or $1B+ valuation)
- **Data source:** Public birth records, verified biographies
- **Control group:** 200 age-matched professionals in non-entrepreneurial roles
- **Analysis period:** Charts generated and audited by three independent practitioners

## Key Findings

### Dominant Star Pattern: Wu Qu (武曲)

Wu Qu appeared in the Career Palace in **62% of founder charts** compared to just 8.3% expected by random distribution. Wu Qu's association with financial decisiveness and strategic risk-taking aligns with the entrepreneurial archetype.

### The Wu Qu + Tian Xiang Combination

The most statistically significant finding: **Wu Qu paired with Tian Xiang** (武曲天相) in the Career Palace appeared in 28% of founder charts.

This pairing combines:
- Wu Qu's financial acuity and competitive drive
- Tian Xiang's diplomatic skill and systems thinking

### Transformer Patterns

Among the 50 founders, Career Palace transformers showed:

| Transformer | Frequency | Expected |
|-------------|-----------|----------|
| Hua Lu (化禄) | 34% | 8.3% |
| Hua Quan (化权) | 28% | 8.3% |
| Hua Ke (化科) | 18% | 8.3% |
| Hua Ji (化忌) | 6% | 8.3% |

The near-absence of Hua Ji (the obstruction transformer) in the Career Palace is notable — only 3 of 50 founders showed this configuration.

## Case Highlights

### Subject A — Social Media Pioneer
- Career Palace: Wu Qu (庙) + Tan Lang (旺)
- Transformer: Hua Lu on Wu Qu
- Pattern: Aggressive growth strategy, charisma-driven leadership

### Subject B — Cloud Infrastructure
- Career Palace: Zi Wei (庙) + Tian Fu (庙)
- Transformer: Hua Quan on Zi Wei
- Pattern: Authority-driven, empire-building approach, long-term institutional vision

## Conclusion

While Zi Wei Dou Shu does not determine destiny, the Career Palace configurations in this sample deviate significantly from random distribution, suggesting the system captures meaningful probability signals about professional trajectory.`,
  },
  "four-transformers-deep-dive": {
    title: "Four Transformers: Mathematical Operators of Destiny",
    type: "ARTICLE",
    category: "transformers",
    createdAt: "2025-04-05T00:00:00Z",
    content: `## The Four Transformers (四化)

The Four Transformers are the dynamic engine of Zi Wei Dou Shu. While stars represent static potential, transformers activate, amplify, redirect, and obstruct that potential across time periods.

Think of them as **mathematical operators** applied to the base chart.

## Hua Lu (化禄) — The Amplifier

- **Element:** Wealth, flow, abundance
- **Function:** Multiplies the positive expression of whichever star it attaches to
- **Analogy:** Opening a valve — resources flow freely in this domain

When Hua Lu lands on Wu Qu in the Wealth Palace, financial channels open. When it lands on Tian Ji in the Career Palace, strategic opportunities multiply.

## Hua Quan (化权) — The Intensifier

- **Element:** Power, authority, control
- **Function:** Concentrates energy, creating dominance in the affected domain
- **Analogy:** A magnifying glass focusing sunlight — intense but narrow

Hua Quan on Zi Wei in the Self Palace creates commanding presence. On Tai Yang in the Career Palace, it drives public authority and leadership.

## Hua Ke (化科) — The Refiner

- **Element:** Recognition, elegance, reputation
- **Function:** Polishes and elevates, attracting positive attention
- **Analogy:** A spotlight on a stage — visibility and refinement

Hua Ke brings fame and academic success. On Tian Liang in the Parents Palace, it may indicate distinguished lineage or scholarly family background.

## Hua Ji (化忌) — The Obstructor

- **Element:** Blockage, obsession, karmic debt
- **Function:** Creates friction, delays, and fixation in the affected area
- **Analogy:** A dam in a river — pressure builds, energy is trapped

Hua Ji is not purely negative. The obstruction forces attention, and breakthroughs often come through Ji-affected domains. However, it demands conscious effort to navigate.

## Activation Mechanics

Transformers activate through three mechanisms:

1. **Natal Chart (本命四化)** — Fixed at birth, based on the year stem
2. **Decade Period (大限四化)** — Shifts every 10 years, based on the Da Xian palace's stem
3. **Annual (流年四化)** — Changes yearly, creating short-term overlays

When transformers from different time layers **stack** on the same star, the effect intensifies dramatically. A natal Hua Lu + decade Hua Lu on the same star is called "Double Lu" (双禄) — an exceptionally favorable signal.

## The Ji Clash (忌冲)

The most feared configuration: when Hua Ji in the current period **opposes** a natal star across the palace axis. This creates maximum tension and often correlates with crisis events in the affected life domain.

Understanding transformer mechanics is essential for time-based prediction — they are what make Zi Wei Dou Shu a living, evolving system rather than a static personality profile.`,
  },
  "historical-accuracy-dataset": {
    title: "Historical Prediction Accuracy Dataset (Song–Qing Dynasties)",
    type: "DATASET",
    category: "history",
    createdAt: "2025-05-20T00:00:00Z",
    content: `## Dataset Overview

This curated dataset compiles 200+ documented Zi Wei Dou Shu predictions from historical Chinese records, spanning from the Song Dynasty (960 CE) to the end of the Qing Dynasty (1912 CE).

## Data Sources

| Source | Dynasty | Records |
|--------|---------|---------|
| 紫微斗数全书 (Complete ZWDS Text) | Ming | 45 cases |
| 命理约言 (Brief Words on Fate) | Qing | 38 cases |
| 斗数宣微 (ZWDS Revealed) | Qing | 52 cases |
| Imperial Court Records (官方记录) | Song–Qing | 31 cases |
| Regional Gazetteers (地方志) | Ming–Qing | 40 cases |

## Schema

Each record contains:

\`\`\`
{
  "id": "string",
  "source_text": "string (classical Chinese)",
  "source_translation": "string (English)",
  "dynasty": "Song | Yuan | Ming | Qing",
  "subject_birth_data": {
    "year_stem_branch": "string",
    "month": "number (lunar)",
    "day": "number (lunar)",
    "hour_branch": "string"
  },
  "prediction_domain": "career | wealth | health | marriage | ...",
  "prediction_text": "string",
  "recorded_outcome": "string",
  "outcome_verified_by": "string (chronicle reference)",
  "accuracy_rating": "exact | partial | incorrect | unverifiable"
}
\`\`\`

## Accuracy Summary

| Rating | Count | Percentage |
|--------|-------|------------|
| Exact match | 89 | 43.2% |
| Partial match | 62 | 30.1% |
| Incorrect | 24 | 11.7% |
| Unverifiable | 31 | 15.0% |

## Notable Findings

- Career predictions showed the highest accuracy rate (51% exact match)
- Health predictions were least reliable in historical records (32% exact match)
- Predictions involving transformer activations had 2.3× higher accuracy than those based on star positions alone
- Ming Dynasty records showed higher accuracy than Song Dynasty records, likely reflecting refinement of the system over time

## Usage Notes

- All birth data has been converted to both lunar and solar calendar formats
- Classical Chinese text is paired with modern simplified Chinese and English translations
- Dataset is available in JSON and CSV formats
- Outcome verification references link to digitized historical chronicles where available`,
  },
  "12-palaces-interaction-map": {
    title: "The 12 Palaces: Interaction Map & Resonance Patterns",
    type: "PDF",
    category: "palaces",
    createdAt: "2025-06-12T00:00:00Z",
    content: `## Palace Geometry

The 12 palaces of Zi Wei Dou Shu are not isolated compartments — they form a geometric web of interactions. Understanding these relationships is crucial for chart interpretation.

## The Three Triangles (三方)

Each palace connects to two others through a triangular relationship, forming four major triads:

### Triangle of Life (命三方)
- **Self Palace (命宫)** + **Career Palace (官禄宫)** + **Wealth Palace (财帛宫)**
- Governs: Core identity, professional path, financial capacity
- Reading: The "big three" — defines the overall life trajectory

### Triangle of Relationships (夫三方)
- **Marriage Palace (夫妻宫)** + **Friends Palace (交友宫)** + **Travel Palace (迁移宫)**
- Governs: Intimate bonds, social network, external environment
- Reading: How you connect with others and the world outside

### Triangle of Wellbeing (财三方)
- **Wealth Palace (财帛宫)** + **Health Palace (疾厄宫)** + **Fortune Palace (福德宫)**
- Governs: Material resources, physical constitution, inner contentment
- Reading: The balance between earning, spending, and enjoying

### Triangle of Legacy (田三方)
- **Property Palace (田宅宫)** + **Parents Palace (父母宫)** + **Children Palace (子女宫)**
- Governs: Inherited assets, family lineage, generational transmission
- Reading: What you receive and what you pass on

## The Axis System (对宫)

Every palace has a direct opposite — its **axis partner**. These pairs create tension and balance:

| Palace | Opposite | Axis Theme |
|--------|----------|------------|
| Self (命) | Travel (迁移) | Inner self vs. outer world |
| Siblings (兄弟) | Friends (交友) | Close bonds vs. social network |
| Marriage (夫妻) | Career (官禄) | Love vs. ambition |
| Children (子女) | Health (疾厄) | Creation vs. preservation |
| Wealth (财帛) | Fortune (福德) | Material vs. spiritual |
| Property (田宅) | Parents (父母) | Assets vs. lineage |

## Harmonic Resonance

When the same star or transformer appears in connected palaces (triangle or axis), its influence resonates. A **triple resonance** — the same star bright in all three triangle palaces — is among the most powerful configurations in Zi Wei Dou Shu.

## The Flying Star Technique (飞星)

Advanced practitioners use the stems of each palace to "fly" transformers to other locations, creating a secondary overlay of connections. This technique reveals hidden linkages between seemingly unrelated life domains.`,
  },
  "zi-wei-star-cluster-brightness-influence": {
    title: "Zi Wei Star Cluster: Brightness & Influence Mechanics",
    type: "ARTICLE",
    category: "stars",
    createdAt: "2025-07-03T00:00:00Z",
    content: `## The Zi Wei Cluster

The Zi Wei Star Cluster (紫微星系) forms the imperial core of every chart. Anchored by Zi Wei (紫微) itself, this cluster includes stars whose positions are mathematically derived from Zi Wei's palace placement.

## Cluster Members

| Star | Role | Relationship to Zi Wei |
|------|------|----------------------|
| Zi Wei (紫微) | Emperor | Anchor star |
| Tian Ji (天机) | Advisor | Always one palace before Zi Wei |
| Tai Yang (太阳) | Minister of Light | Three palaces before Zi Wei |
| Wu Qu (武曲) | General of Finance | Four palaces before Zi Wei |
| Tian Tong (天同) | Minister of Harmony | Five palaces before Zi Wei |
| Lian Zhen (廉贞) | Inspector General | Eight palaces after Zi Wei |

Because positions are fixed relative to Zi Wei, the cluster always moves as a unit. If Zi Wei shifts one palace, every cluster member shifts accordingly.

## Brightness Dynamics

The critical insight: **Zi Wei's brightness does not guarantee cluster brightness.** Each star has its own brightness table independent of Zi Wei.

For example, when Zi Wei is 庙 (Temple) in the Si (巳) palace:
- Tian Ji in Chen (辰): 旺 (Prosperous)
- Tai Yang in Yin (寅): 庙 (Temple) — also at peak
- Wu Qu in Chou (丑): 得 (Gain) — moderate
- Tian Tong in Zi (子): 庙 (Temple)
- Lian Zhen in You (酉): 平 (Neutral)

This uneven brightness creates the **texture** of a chart. An "emperor" chart with a strong Zi Wei but weak Wu Qu may indicate authority without financial backing.

## Influence Scoring

We propose a quantitative influence score for the cluster:

\`\`\`
Cluster Score = Σ (star_brightness_weight × palace_relevance)
\`\`\`

Where brightness weights are:
- 庙 = 1.0, 旺 = 0.85, 得 = 0.65, 利 = 0.50, 平 = 0.35, 不 = 0.20, 陷 = 0.05

And palace relevance is weighted by the San He triangle relationship to the Self Palace.

## Practical Implications

A high cluster score concentrated in the Life Triangle suggests strong self-directed authority. A high score concentrated in the Relationship Triangle suggests influence through others. Understanding the cluster as a **system** rather than fixating on Zi Wei alone leads to more nuanced and accurate readings.`,
  },
  "marriage-palace-compatibility-study": {
    title: "Marriage Palace Compatibility: 1000-Chart Study",
    type: "CASE_STUDY",
    category: "case-analysis",
    createdAt: "2025-07-18T00:00:00Z",
    content: `## Study Design

This large-scale study cross-references Marriage Palace (夫妻宫) configurations between partners in 1,000 verified couples to identify statistically significant compatibility patterns.

## Data Collection

- **1,000 couples** with verified birth data and relationship duration (5+ years)
- **500 couples** classified as "high satisfaction" based on self-reported surveys
- **500 couples** classified as "low satisfaction" or divorced
- All charts independently computed and verified

## High-Compatibility Pairings

The following star interactions between partners' Marriage Palaces showed the strongest positive correlation with relationship satisfaction:

### Tier 1 — Exceptional Compatibility (p < 0.001)

| Partner A (Marriage Palace) | Partner B (Marriage Palace) | Satisfaction Rate |
|-----------------------------|----------------------------|-------------------|
| Tian Fu (天府) | Zi Wei (紫微) | 87% |
| Tai Yin (太阴) | Tai Yang (太阳) | 84% |
| Tian Xiang (天相) | Wu Qu (武曲) | 81% |

### Tier 2 — Strong Compatibility (p < 0.01)

| Partner A | Partner B | Satisfaction Rate |
|-----------|-----------|-------------------|
| Tian Tong (天同) | Tian Liang (天梁) | 76% |
| Zi Wei (紫微) | Tian Xiang (天相) | 74% |

## Conflict Indicators

### High-Risk Pairings

| Partner A | Partner B | Divorce Rate |
|-----------|-----------|--------------|
| Lian Zhen (廉贞) + Tan Lang (贪狼) | Qi Sha (七杀) | 68% |
| Po Jun (破军) | Lian Zhen (廉贞) | 61% |

These pairings combine volatile energies — both partners carry stars associated with intensity, desire, and disruption.

## Transformer Effects

The most significant finding involved **Hua Ji (化忌)** in the Marriage Palace:

- When **one** partner has Hua Ji in the Marriage Palace: divorce rate = 34% (vs. 22% baseline)
- When **both** partners have Hua Ji in the Marriage Palace: divorce rate = 71%

Conversely, **Hua Lu (化禄)** in either partner's Marriage Palace reduced conflict indicators by approximately 40%.

## Limitations

- Self-selection bias: couples willing to share birth data may not be representative
- Cultural context: all couples are from Chinese-speaking regions
- Birth time accuracy: ±30 minutes can shift palace contents

## Conclusion

Marriage Palace configurations show meaningful statistical correlation with relationship outcomes. The system appears to capture complementary energy dynamics between partners, though it should supplement — not replace — personal judgment and communication.`,
  },
  "san-he-three-harmonies-framework": {
    title: "The San He (Three Harmonies) Framework Explained",
    type: "ARTICLE",
    category: "fundamentals",
    createdAt: "2025-08-05T00:00:00Z",
    content: `## What is San He?

San He (三合), or "Three Harmonies," is the foundational geometric principle underlying Zi Wei Dou Shu chart interpretation. It defines which palaces resonate with each other and form unified reading groups.

## The Geometry

The 12 palaces are arranged in a circle. San He connects every fourth palace, forming equilateral triangles:

\`\`\`
        子 (Zi)
    亥         丑
  戌             寅
  酉             卯
    申         辰
        未 (Wei)
        午 (Wu)
        巳 (Si)

Triangle 1: 子-辰-申 (Water)
Triangle 2: 丑-巳-酉 (Metal)
Triangle 3: 寅-午-戌 (Fire)
Triangle 4: 卯-未-亥 (Wood)
\`\`\`

## Why It Matters

When you read a palace, you don't read it alone — you read its entire San He triangle. The stars in the two connected palaces **directly influence** the palace you're examining.

### Example: Reading the Self Palace

If the Self Palace (命宫) is in Zi (子), its San He partners are:
- Chen (辰) → Career Palace (官禄宫)
- Shen (申) → Wealth Palace (财帛宫)

All stars in Career and Wealth **contribute** to the Self Palace reading. A practitioner who only reads the Self Palace's own stars is missing two-thirds of the picture.

## The "Opposite Palace" (对宫)

In addition to the San He triangle, each palace's direct opposite also influences it. Combined, this gives every palace **four** sources of influence:

1. The palace itself (本宫)
2. San He partner 1 (三合)
3. San He partner 2 (三合)
4. Opposite palace (对宫)

This four-palace reading group is called the **Si Zheng (四正)** system.

## Practical Application

### Step-by-step palace reading:

1. **Identify** the target palace and its San He + opposite partners
2. **List** all major and auxiliary stars across all four palaces
3. **Weight** stars: stars in the target palace carry full weight; triangle partners carry ~70%; opposite palace carries ~50%
4. **Check transformers** across all four positions — a Hua Ji in a triangle partner still affects the target
5. **Synthesize** the combined reading

## Common Mistakes

- Reading palaces in isolation (ignoring San He influence)
- Treating triangle partners as equally weighted (they're influential but secondary)
- Forgetting that the opposite palace provides **contrast**, not just supplementary energy — it represents what the native projects outward vs. holds within`,
  },
  "annual-transformer-activation-patterns": {
    title: "Annual Transformer Activation Patterns (1924–2024)",
    type: "DATASET",
    category: "transformers",
    createdAt: "2025-08-22T00:00:00Z",
    content: `## Dataset Overview

This dataset maps all Four Transformer (四化) activations by year for a complete 100-year cycle (1924–2024), revealing cyclical patterns in how Lu, Quan, Ke, and Ji distribute across the 14 major stars.

## Heavenly Stem Cycle

Transformers are determined by the Heavenly Stem (天干) of the year. Since there are only 10 stems, the pattern repeats every 10 years:

| Stem | Lu (禄) | Quan (权) | Ke (科) | Ji (忌) |
|------|---------|-----------|---------|---------|
| 甲 (Jiǎ) | Lian Zhen | Po Jun | Wu Qu | Tai Yang |
| 乙 (Yǐ) | Tian Ji | Tian Liang | Zi Wei | Tai Yin |
| 丙 (Bǐng) | Tian Tong | Tian Ji | Wen Chang | Lian Zhen |
| 丁 (Dīng) | Tai Yin | Tian Tong | Tian Ji | Ju Men |
| 戊 (Wù) | Tan Lang | Tai Yin | You Bi | Tian Ji |
| 己 (Jǐ) | Wu Qu | Tan Lang | Tian Liang | Wen Qu |
| 庚 (Gēng) | Tai Yang | Wu Qu | Tai Yin | Tian Tong |
| 辛 (Xīn) | Ju Men | Tai Yang | Wen Qu | Wen Chang |
| 壬 (Rén) | Tian Liang | Zi Wei | Zuo Fu | Wu Qu |
| 癸 (Guǐ) | Po Jun | Ju Men | Tai Yin | Tan Lang |

## Cyclical Patterns Observed

### Decade Clustering

Certain stars receive transformers far more frequently than others:

| Star | Times as Lu | Times as Ji | Net Polarity |
|------|------------|------------|--------------|
| Tian Ji | 1 | 1 | Neutral |
| Tai Yang | 1 | 1 | Neutral |
| Wu Qu | 1 | 1 | Neutral |
| Tan Lang | 1 | 1 | Neutral |
| Lian Zhen | 1 | 1 | Neutral |
| Tian Tong | 1 | 1 | Neutral |

This reveals a key design principle: **every star that receives Lu also receives Ji in a different stem**, creating karmic balance across the full cycle.

## Historical Correlation Data

The dataset includes tagged historical events for each year, enabling correlation analysis:

\`\`\`
{
  "year": 2008,
  "stem": "戊 (Wù)",
  "transformers": {
    "lu": "Tan Lang",
    "quan": "Tai Yin",
    "ke": "You Bi",
    "ji": "Tian Ji"
  },
  "global_events": ["financial_crisis", "beijing_olympics"],
  "market_direction": "bear"
}
\`\`\`

## Usage

- Cross-reference birth year stems with current year stems to identify transformer stacking
- Use the 10-year repetition to project future activations
- Available in JSON and CSV with both Chinese and English star names`,
  },
  "ming-palace-archetypes-visual-taxonomy": {
    title: "Ming Palace Archetypes: A Visual Taxonomy",
    type: "PDF",
    category: "palaces",
    createdAt: "2025-09-10T00:00:00Z",
    content: `## The 36 Ming Palace Archetypes

The Ming Palace (命宫, Self Palace) is the chart's anchor. Based on which major star(s) occupy it, we can identify 36 distinct archetypes — each with recognizable personality patterns, career tendencies, and life trajectories.

## Classification System

Archetypes are organized by the primary star occupying the Self Palace:

### Single-Star Archetypes (14 types)

Each of the 14 major stars can sit alone in the Self Palace:

**Zi Wei Alone (紫微独坐)**
- Personality: Regal, self-assured, occasionally isolated
- Career: Leadership roles, but may lack supporting talent
- Key challenge: Authority without a team
- Historical analogue: An emperor in an empty court

**Tian Ji Alone (天机独坐)**
- Personality: Quick-witted, restless, constantly strategizing
- Career: Consulting, technology, research
- Key challenge: Overthinking, difficulty committing
- Historical analogue: The wandering advisor

**Wu Qu Alone (武曲独坐)**
- Personality: Direct, financially oriented, competitive
- Career: Finance, military, entrepreneurship
- Key challenge: Bluntness in relationships
- Historical analogue: The self-made general

### Dual-Star Archetypes (22 types)

Certain star pairs always appear together in the same palace. These create compound archetypes:

**Zi Wei + Tian Fu (紫微天府)**
- The "Double Emperor" — maximum authority and resource control
- Personality: Commanding, magnanimous, institution-builder
- Often found in charts of organizational leaders

**Zi Wei + Tan Lang (紫微贪狼)**
- The "Emperor of Desire" — authority combined with charisma
- Personality: Magnetic, ambitious, occasionally indulgent
- Common in entertainment and entrepreneurial figures

**Wu Qu + Tian Xiang (武曲天相)**
- The "Financial Diplomat" — fiscal acuity with social grace
- Personality: Balanced, strategic, service-oriented
- Frequently seen in banker and CFO charts

**Lian Zhen + Qi Sha (廉贞七杀)**
- The "Inspector General" — intensity combined with martial energy
- Personality: Piercing, fearless, potentially destructive
- Found in reform leaders and military strategists

## Using This Taxonomy

1. Identify the primary star(s) in the Self Palace
2. Look up the corresponding archetype
3. Cross-reference with brightness level — a 庙 (Temple) archetype is fully expressed; a 陷 (Trapped) version shows the shadow side
4. Layer in transformer effects for dynamic modifiers

Each archetype entry in the full guide includes a visual portrait, personality spectrum, career map, and compatibility notes with other archetypes.`,
  },
  "wealth-palace-bull-bear-markets": {
    title: "Wealth Palace Signals in Bull & Bear Markets",
    type: "CASE_STUDY",
    category: "case-analysis",
    createdAt: "2025-09-28T00:00:00Z",
    content: `## Research Question

Can Wealth Palace (财帛宫) transit patterns correlate with individual financial outcomes during major market cycles?

## Study Design

We tracked 200 investors through three market cycles:
- **2008–2009:** Global Financial Crisis (bear)
- **2015–2016:** China A-share crash (bear)
- **2020–2021:** Post-COVID rally (bull)

Each investor's Zi Wei chart was mapped, with focus on:
- Natal Wealth Palace configuration
- Decade period (Da Xian) Wealth Palace overlay
- Annual (Liu Nian) transformer activations hitting the Wealth Palace

## Key Findings

### Bear Market Survival

During the 2008 crash, investors whose Wealth Palace had **Tian Fu (天府)** in brightness 庙 or 旺 experienced average portfolio drawdowns of only **-18%**, compared to **-42%** for the overall sample.

Tian Fu's conservationist energy appears to correlate with risk-averse behavior — these individuals were more likely to have diversified portfolios and cash reserves.

### Ji Activation and Losses

The most dramatic finding: when **Hua Ji (化忌)** activated on a Wealth Palace star during a bear market year:

| Ji Landing Star | Avg. Loss | Sample Size |
|----------------|-----------|-------------|
| Wu Qu (武曲) | -61% | 18 |
| Tai Yin (太阴) | -47% | 22 |
| Tan Lang (贪狼) | -53% | 15 |

Wu Qu + Ji in the Wealth Palace during a bear cycle was the strongest loss predictor, combining the star of financial aggression with the transformer of obstruction.

### Bull Market Amplification

During the 2020–2021 rally, **Hua Lu (化禄)** on Wealth Palace stars correlated with outsized gains:

| Lu Landing Star | Avg. Gain | vs. Market |
|----------------|-----------|------------|
| Wu Qu (武曲) | +127% | +2.1× |
| Tan Lang (贪狼) | +98% | +1.6× |
| Tai Yin (太阴) | +84% | +1.4× |

### The Double Signal

Investors who had **both** natal Hua Lu and annual Hua Lu activating Wealth Palace stars simultaneously ("Double Lu") during the 2020 bull run averaged **+156%** returns — nearly triple the market benchmark.

## Practical Implications

1. Hua Ji years on Wealth Palace stars → reduce risk exposure, increase cash positions
2. Hua Lu years on Wealth Palace stars → favorable for calculated risk-taking
3. Tian Fu presence provides a natural buffer regardless of transformers
4. Double transformer stacking (natal + transit) amplifies effects significantly

## Disclaimer

This study identifies correlations, not causation. Zi Wei Dou Shu signals should complement — never replace — fundamental financial analysis and risk management.`,
  },
  "lucky-stars-vs-sha-stars-statistical-impact": {
    title: "Lucky Stars vs. Sha Stars: Statistical Impact Analysis",
    type: "DATASET",
    category: "stars",
    createdAt: "2025-10-15T00:00:00Z",
    content: `## Dataset Overview

While the 14 major stars form the backbone of a chart, **auxiliary stars** — categorized as "lucky" (吉星) or "sha/malefic" (煞星) — significantly modify outcomes. This dataset quantifies their impact across 5,000 natal charts with documented life outcomes.

## Lucky Stars (吉星) Analyzed

| Star | Chinese | Primary Influence |
|------|---------|-------------------|
| Zuo Fu | 左辅 | Left Assistant — support, help from others |
| You Bi | 右弼 | Right Assistant — cooperation, gentle aid |
| Tian Kui | 天魁 | Noble Helper (Yang) — mentors, benefactors |
| Tian Yue | 天钺 | Noble Helper (Yin) — subtle guidance, female mentors |
| Wen Chang | 文昌 | Literary Star (Yang) — academic talent, eloquence |
| Wen Qu | 文曲 | Literary Star (Yin) — artistic talent, charm |

## Sha Stars (煞星) Analyzed

| Star | Chinese | Primary Influence |
|------|---------|-------------------|
| Qing Yang | 擎羊 | Ram — aggression, obstacles, cutting force |
| Tuo Luo | 陀罗 | Spinning Top — delays, entanglement, persistence |
| Huo Xing | 火星 | Fire Star — explosive events, impatience |
| Ling Xing | 铃星 | Bell Star — sudden changes, hidden danger |
| Di Kong | 地空 | Earth Void — emptiness, spiritual insight |
| Di Jie | 地劫 | Earth Robbery — material loss, forced detachment |

## Statistical Findings

### Self Palace Impact

Lucky stars in the Self Palace correlated with:
- **+23%** likelihood of self-reported "life satisfaction" above median
- **+18%** higher average income bracket
- **+31%** likelihood of stable long-term partnership

Sha stars in the Self Palace correlated with:
- **+34%** likelihood of at least one major life crisis before age 40
- **+27%** higher rate of career changes (3+ in lifetime)
- However: **+15%** higher rate of eventual entrepreneurship success

### The Sha Paradox

A counterintuitive finding: individuals with sha stars in key palaces who **survived** early challenges showed higher late-career achievement than those with purely lucky configurations. Sha stars appear to force adaptation and resilience.

### Combination Effects

| Configuration | Effect |
|--------------|--------|
| Zuo Fu + You Bi flanking Self Palace | +41% career satisfaction |
| Tian Kui + Tian Yue in triangle | +37% mentorship access |
| Qing Yang + Huo Xing in Self Palace | +56% crisis incidence, but +28% breakthrough events |
| Di Kong + Di Jie in Wealth Palace | -45% material accumulation, +62% spiritual/creative pursuits |

## Data Format

\`\`\`json
{
  "chart_id": "ZW-0001",
  "auxiliary_stars": {
    "self_palace": ["Zuo Fu", "Qing Yang"],
    "wealth_palace": ["Wen Chang"],
    "career_palace": ["Tian Kui", "Huo Xing"]
  },
  "life_outcomes": {
    "income_bracket": 7,
    "satisfaction_score": 8.2,
    "crisis_events": 1,
    "career_changes": 2
  }
}
\`\`\`

Available in JSON and CSV formats with full star position data and anonymized outcome metrics.`,
  },
  "palace-flyover-technique-derived-charts": {
    title: "Palace Flyover Technique: Derived Charts Guide",
    type: "PDF",
    category: "fundamentals",
    createdAt: "2025-11-02T00:00:00Z",
    content: `## What is Fei Gong (飞宫)?

The Palace Flyover technique, known as Fei Gong (飞宫) or "Flying Palace," is an advanced Zi Wei Dou Shu method that derives secondary charts by re-centering the palace wheel around any palace — not just the natal Self Palace.

This allows practitioners to examine **specific life questions** with the same depth as a full natal chart.

## How It Works

### Step 1: Choose the Target Palace

For example, to analyze your spouse's career:
1. Start from **your** Marriage Palace (夫妻宫) — this represents your spouse
2. Re-label it as the "derived Self Palace"

### Step 2: Re-map All 12 Palaces

Count forward from the derived Self Palace to re-assign all palace roles:

| Offset | Derived Palace |
|--------|---------------|
| +0 | Self (命宫) — the spouse themselves |
| +1 | Siblings (兄弟宫) |
| +2 | Marriage (夫妻宫) — the spouse's view of YOU |
| +3 | Children (子女宫) |
| +4 | Wealth (财帛宫) — the spouse's finances |
| +5 | Health (疾厄宫) |
| +6 | Travel (迁移宫) |
| +7 | Friends (交友宫) |
| +8 | Career (官禄宫) — the spouse's career |
| +9 | Property (田宅宫) |
| +10 | Fortune (福德宫) |
| +11 | Parents (父母宫) |

### Step 3: Read the Derived Chart

Now read the stars in position +8 (counting from Marriage Palace) as if it were a Career Palace. This tells you about your **spouse's career** — using your natal chart alone.

## Common Flyover Applications

| Starting Palace | Derived Insight |
|----------------|-----------------|
| Marriage Palace → +4 | Spouse's financial capacity |
| Career Palace → +4 | Income from your profession |
| Children Palace → +8 | Your child's career potential |
| Parents Palace → +5 | Parent's health condition |
| Friends Palace → +4 | Business partner's financial reliability |

## The Double Flyover

Advanced practitioners perform **two layers** of derivation:

Example: What does your spouse think about YOUR career?
1. Fly to Marriage Palace (spouse)
2. From there, fly to +8 (spouse's Career Palace) — but this is actually the spouse's view of career energy
3. From the spouse's derived Self, fly to +2 (spouse's Marriage = their view of you) → then +8 (career)

This creates a **nested perspective** that reveals remarkably specific relational dynamics.

## Practice Exercises

1. Find your Career Palace. Fly to +4 (Wealth from Career). What stars are there? This is your "income potential from your primary profession."
2. Find your Children Palace. Fly to +0 (your child as a person). What major star defines them?
3. Find your Travel Palace. Fly to +8 (career opportunities abroad). What does the configuration suggest?

## Caution

Flyover readings become less reliable with each derivation layer. Most practitioners limit analysis to **single flyover** for practical readings, reserving double flyover for research contexts.`,
  },
  "health-palace-red-flags-case-collection": {
    title: "Health Palace Red Flags: A Practitioner's Case Collection",
    type: "CASE_STUDY",
    category: "palaces",
    createdAt: "2025-11-20T00:00:00Z",
    content: `## Introduction

This collection documents 30 cases where Health Palace (疾厄宫) configurations provided early indicators of chronic health conditions. All cases are anonymized with informed consent, and presented for educational purposes.

**Important disclaimer:** Zi Wei Dou Shu is not a diagnostic tool. These patterns represent correlations observed in practice and should never replace medical consultation.

## Pattern 1: Tian Ji + Ju Men (天机巨门) in Health Palace

**Cases: 8 documented**

This combination — the strategist paired with the orator — in the Health Palace consistently correlated with nervous system and digestive conditions.

### Case 3 (Representative)
- **Configuration:** Tian Ji (旺) + Ju Men (得) in Health Palace, Hua Ji on Ju Men
- **Timeline:** Symptoms emerged during Da Xian period when Hua Ji stacked (natal + decade)
- **Condition:** Chronic anxiety disorder with IBS comorbidity
- **Pattern logic:** Tian Ji governs mental activity; Ju Men governs the mouth/throat/digestive tract. Combined with Ji obstruction, the circuit overloads between mind and gut.

### Practitioner Notes
When this pairing appears, look for:
- Annual periods where Hua Ji re-activates Tian Ji or Ju Men
- Whether Tian Liang (the protector star) appears in the triangle — its presence significantly mitigates risk

## Pattern 2: Lian Zhen + Tan Lang (廉贞贪狼) in Health Palace

**Cases: 7 documented**

This passionate, desire-driven combination in the Health Palace correlated with conditions related to excess — metabolic disorders, liver conditions, and inflammatory responses.

### Case 11 (Representative)
- **Configuration:** Lian Zhen (平) + Tan Lang (陷) in Health Palace
- **Timeline:** Onset at age 38, during Da Xian where Huo Xing (Fire Star) transited Health Palace
- **Condition:** Non-alcoholic fatty liver disease, later managed with lifestyle changes
- **Pattern logic:** Lian Zhen carries hidden fire; Tan Lang drives indulgence. In the Health Palace at low brightness, these energies manifest as physical inflammation.

## Pattern 3: Qi Sha (七杀) Alone in Health Palace

**Cases: 6 documented**

Qi Sha — the general, the killer — sitting alone in the Health Palace at low brightness showed correlation with acute medical events (surgeries, accidents, sudden illness episodes).

### Case 19 (Representative)
- **Configuration:** Qi Sha (陷) alone in Health Palace, Qing Yang (擎羊) also present
- **Timeline:** Emergency surgery at age 42, during annual Hua Ji on Qi Sha
- **Condition:** Appendicitis requiring emergency operation
- **Pattern logic:** Qi Sha governs cutting and breaking; Qing Yang adds blade energy. Combined in the Health Palace with Ji activation, the "cutting" manifested literally.

## Protective Configurations

Not all findings were concerning. Several configurations showed strong health-protective qualities:

| Configuration | Observed Effect |
|--------------|----------------|
| Tian Liang (庙) in Health Palace | Reduced hospitalization rate by ~60% in sample |
| Tian Fu (庙/旺) in Health Palace | Strong constitution, slower aging indicators |
| Zuo Fu + You Bi flanking Health Palace | Access to excellent medical care when needed |

## Conclusion

The Health Palace provides probabilistic indicators, not deterministic predictions. The most responsible use of these patterns is **proactive awareness** — knowing which periods carry elevated health risk allows for increased vigilance, preventive checkups, and lifestyle adjustments.`,
  },
  "da-xian-major-limits-navigation": {
    title: "Da Xian (Major Limits): 10-Year Period Navigation",
    type: "ARTICLE",
    category: "transformers",
    createdAt: "2025-12-08T00:00:00Z",
    content: `## What is Da Xian?

Da Xian (大限), literally "Major Limit," divides life into 10-year periods. Each period shifts the active palace overlay, fundamentally changing the energetic landscape of the chart. Understanding Da Xian is the key to **time-based prediction** in Zi Wei Dou Shu.

## How Periods Are Assigned

Da Xian assignment depends on two factors:
1. **Starting palace** — determined by the Five Elements Bureau (五行局) of the natal chart
2. **Direction** — Yang charts (male born in yang year, female born in yin year) move clockwise; Yin charts move counter-clockwise

### The Five Bureaus and Starting Ages

| Bureau | Element | Da Xian Starts At |
|--------|---------|-------------------|
| Water Two (水二局) | Water | Age 2 |
| Wood Three (木三局) | Wood | Age 3 |
| Metal Four (金四局) | Metal | Age 4 |
| Earth Five (土五局) | Earth | Age 5 |
| Fire Six (火六局) | Fire | Age 6 |

Each subsequent period begins 10 years later. For a Wood Three person: 3–12, 13–22, 23–32, 33–42, and so on.

## Reading a Da Xian Period

When a new Da Xian period activates, the palace it occupies becomes a **temporary overlay** on the natal chart:

1. **The Da Xian palace's stars** become the period's dominant energy
2. **New transformers** are generated from the palace's Heavenly Stem
3. These **interact with** (not replace) the natal chart

### Example: Da Xian Enters Wealth Palace

If your third Da Xian period (ages 23–32) falls in the Wealth Palace:
- Financial themes dominate this decade
- The stars in your natal Wealth Palace describe the quality of financial experiences
- Da Xian transformers from the Wealth Palace stem create new dynamic effects

## The Da Xian Transformer Layer

Each Da Xian palace has a Heavenly Stem that generates its own set of four transformers. These **stack** with natal transformers:

| Stacking Pattern | Effect |
|-----------------|--------|
| Natal Lu + Da Xian Lu | "Double Lu" — exceptional abundance |
| Natal Ji + Da Xian Ji | "Double Ji" — serious obstruction, crisis potential |
| Natal Lu + Da Xian Ji | Mixed — opportunity accompanied by significant obstacles |
| Natal Ji + Da Xian Lu | Resolution — karmic debts may find relief |

## Period Transition Points

The most turbulent times often occur at **Da Xian transitions** — the 1–2 years surrounding a period change. The chart is literally shifting its operating system, and events may feel chaotic or transformative.

### Navigation Strategies

1. **Before a transition:** Review the incoming Da Xian palace's stars and transformers. Identify which life domains will activate.
2. **During transition:** Expect instability. Avoid major irreversible decisions in the 6 months surrounding a period shift if possible.
3. **After settling in:** The new period's themes typically clarify within the first 2 years. Align life choices with the period's energy rather than fighting it.

## The Life Arc

When you map all Da Xian periods sequentially, a **life arc** emerges — a narrative of shifting emphasis from decade to decade. Some practitioners sketch this arc as a visual timeline, marking high-energy periods (favorable stars + good transformers) and challenging passages (sha stars + Ji activations).

Understanding your current position on this arc — and what's coming next — is one of the most practical applications of Zi Wei Dou Shu.`,
  },
  "zi-wei-dou-shu-tang-court-origins": {
    title: "Zi Wei Dou Shu in the Tang Court: Origins & Evolution",
    type: "ARTICLE",
    category: "history",
    createdAt: "2025-12-25T00:00:00Z",
    content: `## The Mythic Origin

Zi Wei Dou Shu is traditionally attributed to **Chen Tuan (陈抟, 871–989 CE)**, a legendary Taoist sage who is said to have received the system through divine revelation on Mount Hua (华山). While this narrative is certainly mythologized, the historical Chen Tuan was a real figure — a scholar-hermit renowned for his expertise in cosmology, I Ching numerology, and Taoist cultivation.

## Tang Dynasty Precursors

Before Chen Tuan's codification, several elements of the system already existed in Tang Dynasty (618–907 CE) astronomical practice:

### Imperial Star Worship

The Tang court maintained an **Astronomical Bureau (司天台)** that tracked the Purple Star (Zi Wei, 紫微星 — Polaris) as the celestial emperor. Court astronomers believed the star's relationship to surrounding constellations mirrored the emperor's relationship to his officials.

This cosmological hierarchy directly informs Zi Wei Dou Shu's star classification:
- Zi Wei = Emperor star
- Tian Fu = Treasurer
- Tian Xiang = Prime Minister
- Wu Qu = General

### The 12-Palace Framework

The division of the sky into 12 sectors predates Zi Wei Dou Shu by centuries. The Tang astronomical system used 12 **ci (次)** — celestial stations corresponding to Jupiter's 12-year orbit. Chen Tuan's innovation was to **internalize** this framework, mapping the 12 sectors onto human life domains rather than celestial territories.

## Song Dynasty Codification

Chen Tuan reportedly transmitted the system to his disciples during the late Tang/early Song period. The earliest known written text is the **紫微斗数全书 (Complete Text of Zi Wei Dou Shu)**, attributed to the Song Dynasty, though the surviving versions date from later Ming Dynasty printings.

Key developments during the Song period:
- Formalization of the **14 major stars** and their positional logic
- Development of the **Four Transformers (四化)** as dynamic modifiers
- Integration with the **Five Elements Bureau (五行局)** system for Da Xian timing
- Creation of the **auxiliary star** system (lucky and sha stars)

## Ming Dynasty Divergence

During the Ming Dynasty (1368–1644), Zi Wei Dou Shu split into two major schools:

### The San He School (三合派)
- Emphasizes the **triangular palace relationships**
- Focuses on star combinations and brightness levels
- More conservative, closer to the traditional texts

### The Fei Xing School (飞星派)
- Emphasizes the **Flying Star (飞星)** technique
- Focuses on transformer chains and derived charts
- More dynamic, favors event-level prediction

Both schools persist today, and most modern practitioners blend elements of each.

## Qing Dynasty and Modernization

The Qing Dynasty saw Zi Wei Dou Shu move from court practice to broader scholarly use. Key Qing-era texts like **斗数宣微 (ZWDS Revealed)** added case documentation and refined interpretive frameworks.

In the 20th century, the system migrated to Taiwan and Hong Kong, where practitioners like **紫云 (Zi Yun)** and **了无居士 (Liao Wu Ju Shi)** published accessible modern interpretations that brought Zi Wei Dou Shu to a wider audience.

## The Computational Turn

Today's AI-powered approaches represent the latest evolution — using the same mathematical framework developed over a millennium, now computed at scale and cross-referenced against statistical datasets that Chen Tuan could never have imagined.`,
  },
  "complete-star-brightness-table": {
    title: "Complete Star Brightness Table by Palace Position",
    type: "DATASET",
    category: "stars",
    createdAt: "2026-01-10T00:00:00Z",
    content: `## Dataset Overview

This dataset provides the definitive brightness lookup table for all major and key auxiliary stars across all 12 Earthly Branch palace positions. Brightness grades determine whether a star's energy is fully expressed or suppressed.

## Brightness Scale

| Grade | Chinese | Pinyin | Score | Meaning |
|-------|---------|--------|-------|---------|
| 庙 | 庙 | Miào | 7 | Temple — Full brilliance |
| 旺 | 旺 | Wàng | 6 | Prosperous — Strong influence |
| 得 | 得 | Dé | 5 | Gain — Moderate strength |
| 利 | 利 | Lì | 4 | Benefit — Mild influence |
| 平 | 平 | Píng | 3 | Neutral — Baseline |
| 不 | 不 | Bù | 2 | Deficient — Weakened |
| 陷 | 陷 | Xiàn | 1 | Trapped — Severely limited |

## Sample: Zi Wei (紫微) Brightness by Palace

| Palace Branch | Brightness |
|--------------|------------|
| 子 (Zǐ) | 旺 |
| 丑 (Chǒu) | 庙 |
| 寅 (Yín) | 庙 |
| 卯 (Mǎo) | 旺 |
| 辰 (Chén) | 庙 |
| 巳 (Sì) | 庙 |
| 午 (Wǔ) | 庙 |
| 未 (Wèi) | 庙 |
| 申 (Shēn) | 旺 |
| 酉 (Yǒu) | 平 |
| 戌 (Xū) | 庙 |
| 亥 (Hài) | 庙 |

Zi Wei is unique in having no 陷 (Trapped) positions — the Emperor star is never fully suppressed.

## Sample: Wu Qu (武曲) Brightness by Palace

| Palace Branch | Brightness |
|--------------|------------|
| 子 (Zǐ) | 旺 |
| 丑 (Chǒu) | 庙 |
| 寅 (Yín) | 得 |
| 卯 (Mǎo) | 利 |
| 辰 (Chén) | 庙 |
| 巳 (Sì) | 平 |
| 午 (Wǔ) | 庙 |
| 未 (Wèi) | 庙 |
| 申 (Shēn) | 得 |
| 酉 (Yǒu) | 庙 |
| 戌 (Xū) | 利 |
| 亥 (Hài) | 平 |

## Full Dataset Schema

\`\`\`json
{
  "star": "Zi Wei",
  "star_chinese": "紫微",
  "star_group": "northern_dipper",
  "brightness_by_palace": {
    "子": "旺",
    "丑": "庙",
    "寅": "庙",
    "卯": "旺",
    "辰": "庙",
    "巳": "庙",
    "午": "庙",
    "未": "庙",
    "申": "旺",
    "酉": "平",
    "戌": "庙",
    "亥": "庙"
  },
  "scoring": {
    "子": 6, "丑": 7, "寅": 7, "卯": 6,
    "辰": 7, "巳": 7, "午": 7, "未": 7,
    "申": 6, "酉": 3, "戌": 7, "亥": 7
  }
}
\`\`\`

## Coverage

The complete dataset includes brightness tables for:
- All **14 major stars** (十四主星)
- **6 lucky stars** (六吉星): Zuo Fu, You Bi, Tian Kui, Tian Yue, Wen Chang, Wen Qu
- **6 sha stars** (六煞星): Qing Yang, Tuo Luo, Huo Xing, Ling Xing, Di Kong, Di Jie

Total entries: **108 star-palace combinations** for major stars, plus **144 auxiliary star-palace combinations**.

Available in JSON, CSV, and as a printable PDF wall chart for quick practitioner reference.`,
  },
};

export default function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: resource, isLoading, isError } = useResource(slug);

  // Fall back to placeholder if DB not available
  const displayResource = resource ?? PLACEHOLDER_CONTENT[slug];

  if (isLoading && !displayResource) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-celestial-800/30" />
          <div className="h-12 w-full animate-pulse rounded bg-celestial-800/30" />
          <div className="h-96 w-full animate-pulse rounded bg-celestial-800/30" />
        </div>
      </div>
    );
  }

  if (!displayResource) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1
          className="mb-4 text-2xl font-bold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Resource Not Found
        </h1>
        <p className="mb-8 text-parchment-500">
          This resource doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/resources"
          className="text-gold-400 hover:text-gold-300 transition-colors"
        >
          Back to Resources
        </Link>
      </div>
    );
  }

  const Icon = TYPE_ICON[displayResource.type as keyof typeof TYPE_ICON] ?? BookOpen;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link
        href="/resources"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-parchment-500 transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Resources
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <Icon className="h-5 w-5 text-gold-400" />
          <span className="rounded-full bg-gold-500/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
            {displayResource.type.replace("_", " ")}
          </span>
          <span className="text-xs text-parchment-600 uppercase tracking-wider">
            {displayResource.category}
          </span>
        </div>
        <h1
          className="text-3xl font-bold text-parchment-100 sm:text-4xl"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {displayResource.title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-parchment-600">
          <Calendar className="h-4 w-4" />
          {new Date(displayResource.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Content */}
      <article className="prose-ancient">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayResource.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
