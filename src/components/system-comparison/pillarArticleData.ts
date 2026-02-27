import type { ReactNode } from "react";

export interface ArticleSection {
  heading: string;
  headingCn?: string;
  body: ReactNode;
  formula?: string;
}

export interface PillarArticle {
  id: string;
  headline: string;
  intro: ReactNode;
  sections: ArticleSection[];
  cta: ReactNode;
  icon: string;
  color: string;
  accentBorder: string;
  gradientFrom: string;
  gradientTo: string;
  image?: string;
  imageAlt?: string;
}

export const pillarArticles: PillarArticle[] = [
  {
    id: "binary-logic",
    headline: "Binary Logic: 3,000 Years Before Silicon Valley",
    icon: "Code2",
    color: "text-quantum-cyan",
    accentBorder: "border-quantum-cyan",
    gradientFrom: "from-quantum-cyan/20",
    gradientTo: "to-celestial-900",
    image: "/pillar-articles/binary-genesis.webp",
    imageAlt: "The Binary Genesis — Ba Gua octagram with yin-yang center rendered as a quantum circuit board with binary code",
    intro: "When Gottfried Wilhelm Leibniz published his binary arithmetic system in 1703, he credited an unlikely source: the I Ching (易經), the ancient Chinese Book of Changes. What Silicon Valley celebrates as the foundation of computing — the 0 and 1, the on and off — was encoded in Chinese cosmology over three millennia ago. This is not a metaphor. It is a verifiable mathematical fact.",
    sections: [
      {
        heading: "The Yin-Yang Bit",
        headingCn: "阴阳 — The Original Binary",
        body: "In Chinese cosmology, all phenomena emerge from the interplay of two fundamental forces: Yang (阳) — the active, luminous, expansive principle — and Yin (阴) — the receptive, dark, contractive principle. Represented as a solid line (⚊) and a broken line (⚋), these are not merely philosophical concepts. They are the world's first binary digits. Yang = 1. Yin = 0. Every computation your device performs right now — every pixel on this screen, every encrypted packet crossing the internet — operates on the same duality that Chinese sages formalized before the Bronze Age collapsed in the Mediterranean.",
      },
      {
        heading: "The 6-Bit Code of the I Ching",
        headingCn: "六十四卦 — 64 Hexagrams",
        body: "The I Ching organizes its Yin-Yang lines into hexagrams — stacks of six lines, each either broken or solid. Six binary positions yield exactly 2⁶ = 64 possible combinations. This is a 6-bit encoding system, identical in mathematical structure to the character sets that would later power early computing. Each hexagram is not a random symbol but a specific binary address in a 64-state phase space — a complete enumeration of all possible combinations of six binary variables. Leibniz recognized this immediately. In his 1703 paper \"Explication de l'Arithmétique Binaire,\" he explicitly cited the I Ching's hexagram sequence as prior art for binary mathematics. The father of computer logic looked East and found his theorem already proven.",
      },
      {
        heading: "From Ancient Code to Modern AI",
        headingCn: "从古法到人工智能",
        body: "Zi Wei Dou Shu (紫微斗数) inherits and extends this binary foundation. Where the I Ching maps 64 states across a temporal axis, ZWDS maps 108+ star variables across a 12-palace spatial matrix — a dramatically higher-dimensional computation. If the I Ching is a 6-bit processor, ZWDS is a multi-register parallel architecture. The question is not whether ancient Chinese systems anticipated computational logic — they demonstrably did. The question is why it took the West three thousand years to rediscover what was hiding in plain sight.",
      },
    ],
    cta: "Explore how Zi Wei Dou Shu builds on this binary foundation to create the most computationally complete life-analysis framework ever devised.",
  },
  {
    id: "geometry-of-destiny",
    headline: "The Geometry of Destiny: Why 108 Variables Ensure Computational Completeness",
    icon: "Atom",
    color: "text-gold-400",
    accentBorder: "border-gold-500",
    gradientFrom: "from-gold-500/20",
    gradientTo: "to-celestial-900",
    image: "/pillar-articles/108-variable-protocol.webp",
    imageAlt: "The 108 Variable Protocol — interconnected star nodes forming a cosmic computation network",
    intro: "In software engineering, a system is \"computationally complete\" when it can represent any possible state within its domain. An incomplete system has blind spots — scenarios it cannot model, edge cases it cannot handle. Zi Wei Dou Shu (紫微斗数) achieves computational completeness for life-path analysis through an elegant mathematical structure: 12 Palaces × 9 Evolution Levels = 108 core variables, before factoring in star interactions.",
    sections: [
      {
        heading: "The Completeness Formula",
        headingCn: "十二宫 × 九层 = 一百零八",
        body: "The 12 Palaces (十二宫) of ZWDS map every domain of human experience: Self, Siblings, Spouse, Children, Wealth, Health, Travel, Friends, Career, Property, Mental, and Parents. There are no gaps — every life concern maps to a palace. Each palace operates across 9 Evolution Levels: natal potential, decade-period activation, annual cycle, monthly rhythm, daily fluctuation, and deeper harmonic layers. This creates a minimum of 108 independent analytical dimensions.",
        formula: "12 Palaces × 9 Evolution Levels = 108 Variables",
      },
      {
        heading: "Life-Path Debugging",
        headingCn: "命盘调试 — The Debugger Metaphor",
        body: "Think of your ZWDS chart as a running program. The 108 variables are its state registers. When something in your life \"crashes\" — a career setback, a relationship failure, a health crisis — a skilled ZWDS analyst can inspect the relevant palace, identify which star configurations triggered the fault, trace the root cause across evolution levels, and predict when the system state will shift. This is not fortune-telling. It is life-path debugging — the same diagnostic methodology a senior engineer uses to trace a production failure through distributed system logs. The only difference is the domain.",
      },
      {
        heading: "Quantum Interference Patterns",
        headingCn: "量子干涉 — Star Interactions",
        body: "The true power of ZWDS emerges from star interactions. Stars do not operate in isolation — they form constructive and destructive interference patterns, amplifying or canceling each other's effects depending on palace position, evolution level, and co-located stars. A single star like Zi Wei (紫微) — the Emperor Star — behaves differently in each of the 12 palaces, at each evolution level, and in combination with each possible companion star. This combinatorial explosion of states is what gives ZWDS its extraordinary resolution. Where Western astrology tracks roughly 10 planetary positions across 12 houses (120 base variables), ZWDS computes across 108+ variables with full interaction terms — an exponentially richer state space.",
      },
    ],
    cta: "Your life is not random noise. It is a signal with structure. ZWDS provides the analytical framework to decode it — with the mathematical rigor that Western systems cannot match.",
  },
  {
    id: "forbidden-algorithm",
    headline: "The Forbidden Algorithm: How Imperial Astrology Governed Empires",
    icon: "Crown",
    color: "text-quantum-red",
    accentBorder: "border-quantum-red",
    gradientFrom: "from-quantum-red/20",
    gradientTo: "to-celestial-900",
    image: "/pillar-articles/sovereign-legacy.webp",
    imageAlt: "The Sovereign Legacy — imperial golden seal imprinting circuit patterns onto crimson silk before the Forbidden City",
    intro: "For nearly a thousand years, Zi Wei Dou Shu was classified as an imperial secret. Developed during the Song Dynasty (960–1279 CE), the system was maintained by court astronomers whose calculations directly informed governance decisions — appointments of officials, timing of military campaigns, management of dynastic succession. Access was restricted by imperial decree. Unauthorized practice was punishable by death.",
    sections: [
      {
        heading: "The Monopoly of Truth",
        headingCn: "禁术 — The Forbidden Art",
        body: "Why would an empire classify an astrological system as a state secret? Because ZWDS worked. Imperial records document its use in selecting provincial governors, timing agricultural policies, and evaluating the loyalty risk of military commanders. A system that can accurately model human behavior and predict decision patterns is, by definition, a strategic weapon. The Chinese imperial court understood something that modern institutions are only beginning to grasp: predictive analytics applied to human behavior is the ultimate instrument of power. They built it a millennium before McKinsey.",
      },
      {
        heading: "Trust Through Verification",
        headingCn: "以验证建立信任 — Evidence-Based Trust",
        body: "Unlike systems that rely on vague, unfalsifiable predictions, ZWDS builds trust through a rigorous verification protocol: past-event verification (验证). Before any forward-looking analysis, a skilled practitioner reconstructs the client's known history — career transitions, relationship milestones, health events, financial shifts — using only the birth chart. This is the system proving itself before asking for trust. If the historical reconstruction is accurate (and in skilled hands, it is remarkably so), the client has empirical grounds to credit the forward analysis. This is the same epistemological framework used in evidence-based medicine: validate the model against known data before applying it to unknowns.",
      },
      {
        heading: "Access Your Sovereign Logic",
        headingCn: "解锁你的命盘主权",
        body: "For a thousand years, this analytical power was locked behind palace walls. For centuries after that, it was guarded by lineage traditions and language barriers. Today, for the first time, the combination of digital access, bilingual scholarship, and AI-assisted computation makes it possible to democratize ZWDS at scale — without diluting its analytical rigor. This platform exists to complete that democratization. Not as entertainment. Not as superstition. As the most sophisticated life-analysis framework humanity has ever produced — now accessible to anyone willing to engage with it seriously.",
      },
    ],
    cta: "The algorithm that governed empires is no longer forbidden. Your chart is waiting.",
  },
  {
    id: "architecture-of-fate",
    headline:
      "The Architecture of Fate: A Comparative Protocol of Global Divination Systems",
    icon: "Gauge",
    color: "text-quantum-orange",
    accentBorder: "border-quantum-orange",
    gradientFrom: "from-quantum-orange/20",
    gradientTo: "to-celestial-900",
    image: "/pillar-articles/precision-gap.webp",
    imageAlt: "The Precision Gap — Western zodiac wheel contrasted against the Zi Wei Dou Shu quantum matrix",
    intro: "Every divination system is a lens — but not all lenses have the same resolution. A magnifying glass and an electron microscope both reveal hidden structure, yet the difference in analytical power is categorical. When you choose a system to map your life trajectory, you are choosing the resolution of that map. What follows is a rigorous, system-level benchmarking of the Imperial Zi Wei Dou Shu engine against every major divination framework on the planet.",
    sections: [
      {
        heading: "The Analytical Power Grid",
        headingCn: "分析力矩阵",
        body: "We evaluate each system across five critical dimensions: Time Precision — how granularly the system can pinpoint events; Structural Complexity — the number of independent variables and their interactions; Time Layers — the depth of temporal analysis from decades to days; Strength Grading — the ability to quantify planetary or stellar influence; and Predictive Timing — accuracy in forecasting when events will manifest. Zi Wei Dou Shu scores at or near the ceiling across all five dimensions. No other system achieves this comprehensive coverage. The 108-star matrix operating across 12 palaces and 4 temporal layers produces an analytical resolution that is not incrementally better — it is categorically superior.",
      },
      {
        heading: "Head-to-Head Protocol",
        headingCn: "逐一对比",
        body: "Zi Wei Dou Shu vs. Western Astrology: Western astrology maps roughly 10 planetary bodies across 12 houses — approximately 120 base variables. ZWDS maps 108+ stars across 12 palaces with full interaction terms, producing an exponentially richer state space. Both systems are birth-time dependent, but ZWDS provides a built-in strength-grading mechanism (庙旺利陷) that Western astrology lacks, enabling quantitative rather than purely qualitative analysis. Zi Wei Dou Shu vs. Ba Zi (八字): Ba Zi provides an elegant elemental-flow model through Four Pillars of year, month, day, and hour. It excels at identifying broad life themes and elemental balance. However, ZWDS adds structural precision — the 12-palace architecture isolates specific life domains (career, relationships, health) with a granularity that Ba Zi's pillar system cannot match. For tactical decisions requiring domain-specific timing, ZWDS delivers higher resolution. Zi Wei Dou Shu vs. I Ching & Tarot: The I Ching and Tarot are moment-based divination tools — they capture the energetic snapshot of a question at the instant it is asked. They are powerful for situational clarity but are not designed for longitudinal life-path analysis. ZWDS, by contrast, is a birth-chart engine that maps your entire trajectory from birth, providing a persistent structural map that can be consulted across decades. Comparing them is like comparing a photograph to a time-lapse film.",
      },
      {
        heading: "The Verdict",
        headingCn: "结论",
        body: "Zi Wei Dou Shu is not merely another divination system — it is an imperial-grade decision support system with mathematically superior predictive resolution. Its 108-variable architecture, multi-layer temporal analysis, and built-in strength quantification make it the highest-resolution life-analysis framework available. Every other system has strengths worth respecting, but none matches ZWDS in combined analytical depth, structural precision, and predictive timing capability.",
      },
    ],
    cta: "Explore the full benchmarking data in the interactive comparison table below — where every system is scored across each analytical dimension.",
  },
];
