export interface SystemRating {
  score: number; // 1-5
  label: string;
}

export interface DivinationSystem {
  id: string;
  name: string;
  nameCn: string;
  tagline: string;
  origin: string;
  inputRequired: string;
  structures: string;
  symbols: string;
  // Rated dimensions (visual bars)
  timePrecision: SystemRating;
  complexity: SystemRating;
  timeLayers: SystemRating;
  strengthGrading: SystemRating;
  predictiveTiming: SystemRating;
  isHighlighted: boolean;
}

export interface DimensionGroup {
  label: string;
  rows: {
    key: string;
    label: string;
    type: "text" | "rating";
  }[];
}

export const DIMENSION_GROUPS: DimensionGroup[] = [
  {
    label: "Identity",
    rows: [
      { key: "origin", label: "Origin", type: "text" },
      { key: "inputRequired", label: "Input Required", type: "text" },
      { key: "structures", label: "Framework", type: "text" },
      { key: "symbols", label: "Symbol Set", type: "text" },
    ],
  },
  {
    label: "Analytical Power",
    rows: [
      { key: "timePrecision", label: "Time Precision", type: "rating" },
      { key: "complexity", label: "Complexity / Depth", type: "rating" },
      { key: "timeLayers", label: "Time Layers", type: "rating" },
      { key: "strengthGrading", label: "Strength Grading", type: "rating" },
      { key: "predictiveTiming", label: "Predictive Timing", type: "rating" },
    ],
  },
];

export const SYSTEMS: DivinationSystem[] = [
  {
    id: "zwds",
    name: "Zi Wei Dou Shu",
    nameCn: "紫微斗数",
    tagline: "12 Palaces · 108+ Stars · 4-Layer Timing",
    origin: "Song Dynasty (~1000 CE)",
    inputRequired: "Birth year, month, day, hour",
    structures: "12 Palaces (life domains)",
    symbols: "14 major + 100+ auxiliary stars",
    timePrecision: { score: 4, label: "2-hour window" },
    complexity: { score: 5, label: "108+ stars × grades × transformers" },
    timeLayers: { score: 5, label: "Decade / Annual / Monthly / Daily" },
    strengthGrading: { score: 5, label: "5 grades per star per palace" },
    predictiveTiming: { score: 5, label: "Specific years and months" },
    isHighlighted: true,
  },
  {
    id: "bazi",
    name: "Ba Zi",
    nameCn: "八字",
    tagline: "4 Pillars · 5 Elements · Luck Cycles",
    origin: "Tang Dynasty (~800 CE)",
    inputRequired: "Birth year, month, day, hour",
    structures: "4 Pillars (Year/Month/Day/Hour)",
    symbols: "10 Stems + 12 Branches",
    timePrecision: { score: 4, label: "2-hour window" },
    complexity: { score: 3, label: "8 chars × elements × 10 gods" },
    timeLayers: { score: 3, label: "10-yr Pillars / Annual" },
    strengthGrading: { score: 3, label: "Relative by season" },
    predictiveTiming: { score: 4, label: "Year-level, sometimes month" },
    isHighlighted: false,
  },
  {
    id: "western",
    name: "Western Astrology",
    nameCn: "西洋占星",
    tagline: "12 Houses · Planets · Transits",
    origin: "Hellenistic (~500 BCE)",
    inputRequired: "Birth date, time, location",
    structures: "12 Houses (life domains)",
    symbols: "10 planets + asteroids",
    timePrecision: { score: 5, label: "Minute-level precision" },
    complexity: { score: 4, label: "Planets × signs × houses × aspects" },
    timeLayers: { score: 3, label: "Transits / Progressions" },
    strengthGrading: { score: 2, label: "Dignity system, less systematic" },
    predictiveTiming: { score: 3, label: "Transit windows of weeks" },
    isHighlighted: false,
  },
  {
    id: "iching",
    name: "I Ching",
    nameCn: "易经",
    tagline: "64 Hexagrams · Situational Wisdom",
    origin: "Zhou Dynasty (~1000 BCE)",
    inputRequired: "A question + divination moment",
    structures: "Hexagram (6 yin/yang lines)",
    symbols: "64 hexagrams + commentary",
    timePrecision: { score: 1, label: "Moment-based, not birth" },
    complexity: { score: 2, label: "64 hexagrams × 6 lines" },
    timeLayers: { score: 1, label: "Situational only" },
    strengthGrading: { score: 1, label: "Yin/yang, changing/stable" },
    predictiveTiming: { score: 1, label: "Dynamics, not timing" },
    isHighlighted: false,
  },
  {
    id: "tarot",
    name: "Tarot",
    nameCn: "塔罗牌",
    tagline: "78 Cards · Intuitive Spreads",
    origin: "Renaissance Europe (~1400 CE)",
    inputRequired: "A question + card draw",
    structures: "Spread layout (e.g., Celtic Cross)",
    symbols: "22 Major + 56 Minor Arcana",
    timePrecision: { score: 1, label: "Moment-based, not birth" },
    complexity: { score: 2, label: "78 cards × positions × reversals" },
    timeLayers: { score: 1, label: "Situational only" },
    strengthGrading: { score: 1, label: "Upright vs reversed only" },
    predictiveTiming: { score: 1, label: "Thematic, not precise" },
    isHighlighted: false,
  },
];
