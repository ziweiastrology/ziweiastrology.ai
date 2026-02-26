export interface Deduction {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  yearRange: string;
  confidence: number;
  icon: "career" | "relationship" | "health" | "wealth" | "education" | "transition";
}

export type DeductionResponse = "yes" | "no" | "unsure";

interface AgeGroup {
  minAge: number;
  maxAge: number;
  deductions: [Deduction, Deduction, Deduction];
}

const AGE_GROUPS: AgeGroup[] = [
  {
    minAge: 15,
    maxAge: 19,
    deductions: [
      {
        id: "d-15-1",
        title: "Academic Turning Point Detected",
        titleCn: "\u5B66\u4E1A\u8F6C\u6298",
        description:
          "A decisive shift in educational trajectory \u2014 a fork between conformity and a self-sovereign path. The stars indicate you chose (or will choose) the less obvious route.",
        yearRange: "15\u201319",
        confidence: 87,
        icon: "education",
      },
      {
        id: "d-15-2",
        title: "Family Structure Resonance",
        titleCn: "\u5BB6\u5EAD\u7ED3\u6784\u5171\u632F",
        description:
          "An event within the family constellation that forced early independence or emotional self-reliance. This imprint shapes your authority patterns for decades.",
        yearRange: "15\u201319",
        confidence: 82,
        icon: "relationship",
      },
      {
        id: "d-15-3",
        title: "Geographic Displacement Signal",
        titleCn: "\u5730\u7406\u8FC1\u79FB",
        description:
          "A significant relocation or environmental shift that severed familiar anchors \u2014 whether physical, cultural, or psychological. This displacement catalyzed accelerated adaptation.",
        yearRange: "15\u201319",
        confidence: 79,
        icon: "transition",
      },
    ],
  },
  {
    minAge: 20,
    maxAge: 27,
    deductions: [
      {
        id: "d-20-1",
        title: "Identity Recalibration Signal",
        titleCn: "\u8EAB\u4EFD\u91CD\u6821",
        description:
          "A period where inherited identity was questioned \u2014 career, belief system, or social role underwent significant revision. The old blueprint was discarded.",
        yearRange: "20\u201327",
        confidence: 91,
        icon: "transition",
      },
      {
        id: "d-20-2",
        title: "First Wealth-Flow Activation",
        titleCn: "\u8D22\u5BCC\u6D41\u542F\u52A8",
        description:
          "Initial encounter with independent financial energy \u2014 either a breakthrough income event or a costly lesson that rewired your relationship with resources.",
        yearRange: "20\u201327",
        confidence: 85,
        icon: "wealth",
      },
      {
        id: "d-20-3",
        title: "Mentor Encounter Detected",
        titleCn: "\u8D35\u4EBA\u76F8\u9047",
        description:
          "A pivotal meeting with a guiding figure \u2014 teacher, employer, or elder \u2014 whose influence recalibrated your trajectory. This encounter was not accidental; it was orbital.",
        yearRange: "20\u201327",
        confidence: 83,
        icon: "relationship",
      },
    ],
  },
  {
    minAge: 28,
    maxAge: 35,
    deductions: [
      {
        id: "d-28-1",
        title: "Major Career Transition Detected",
        titleCn: "\u4E8B\u4E1A\u8F6C\u578B",
        description:
          "A fundamental pivot in professional direction \u2014 not a promotion within the same track, but a quantum leap to an entirely different field or role. The old career identity dissolved.",
        yearRange: "28\u201335",
        confidence: 93,
        icon: "career",
      },
      {
        id: "d-28-2",
        title: "Partnership Resonance Signal",
        titleCn: "\u5408\u4F19\u5171\u632F",
        description:
          "A significant partnership event \u2014 romantic, business, or both \u2014 that fundamentally altered your life trajectory. This bond carries karmic weight in your chart.",
        yearRange: "28\u201335",
        confidence: 88,
        icon: "relationship",
      },
      {
        id: "d-28-3",
        title: "Creative Emergence Signal",
        titleCn: "\u521B\u9020\u529B\u6D8C\u73B0",
        description:
          "A surge of creative or intellectual output that surprised even you \u2014 a project, vision, or body of work that emerged as if channeled from a deeper source.",
        yearRange: "28\u201335",
        confidence: 81,
        icon: "education",
      },
    ],
  },
  {
    minAge: 36,
    maxAge: 45,
    deductions: [
      {
        id: "d-36-1",
        title: "Authority Consolidation Phase",
        titleCn: "\u6743\u529B\u5DE9\u56FA",
        description:
          "A period where scattered efforts crystallized into genuine authority \u2014 professional mastery, leadership recognition, or the establishment of a personal domain.",
        yearRange: "36\u201345",
        confidence: 90,
        icon: "career",
      },
      {
        id: "d-36-2",
        title: "Health-Vitality Inflection",
        titleCn: "\u5065\u5EB7\u62D0\u70B9",
        description:
          "A body-awareness event \u2014 either a health challenge that demanded attention or a transformative wellness discovery that shifted your physical paradigm.",
        yearRange: "36\u201345",
        confidence: 84,
        icon: "health",
      },
      {
        id: "d-36-3",
        title: "Financial Paradigm Shift",
        titleCn: "\u8D22\u52A1\u8303\u5F0F\u8F6C\u53D8",
        description:
          "A fundamental restructuring of your relationship with money \u2014 from accumulation to strategic deployment, or from scarcity-consciousness to abundance architecture.",
        yearRange: "36\u201345",
        confidence: 86,
        icon: "wealth",
      },
    ],
  },
  {
    minAge: 46,
    maxAge: 55,
    deductions: [
      {
        id: "d-46-1",
        title: "Legacy Architecture Initiation",
        titleCn: "\u4F20\u627F\u67B6\u6784",
        description:
          "The transition from personal achievement to legacy building \u2014 mentoring, investing, or creating structures designed to outlast your direct involvement.",
        yearRange: "46\u201355",
        confidence: 86,
        icon: "wealth",
      },
      {
        id: "d-46-2",
        title: "Relationship Deepening Cycle",
        titleCn: "\u5173\u7CFB\u6DF1\u5316",
        description:
          "A period of profound relational transformation \u2014 either the deepening of core bonds or the release of connections that no longer resonate with your evolved frequency.",
        yearRange: "46\u201355",
        confidence: 83,
        icon: "relationship",
      },
      {
        id: "d-46-3",
        title: "Health Awakening Cycle",
        titleCn: "\u5065\u5EB7\u89C9\u9192",
        description:
          "A turning point in physical or mental well-being \u2014 the body demanded a new protocol, and you either answered with transformative discipline or learned through consequence.",
        yearRange: "46\u201355",
        confidence: 80,
        icon: "health",
      },
    ],
  },
  {
    minAge: 56,
    maxAge: 120,
    deductions: [
      {
        id: "d-56-1",
        title: "Wisdom Sovereignty Phase",
        titleCn: "\u667A\u6167\u4E3B\u6743",
        description:
          "The crystallization of life experience into sovereign wisdom \u2014 a period where your pattern recognition became your most valuable asset, transcending mere knowledge.",
        yearRange: "56+",
        confidence: 89,
        icon: "education",
      },
      {
        id: "d-56-2",
        title: "Material-Spiritual Rebalance",
        titleCn: "\u7269\u8D28\u7CBE\u795E\u518D\u5E73\u8861",
        description:
          "A fundamental shift in the balance between material pursuit and inner cultivation \u2014 resources become tools for meaning rather than ends in themselves.",
        yearRange: "56+",
        confidence: 85,
        icon: "transition",
      },
      {
        id: "d-56-3",
        title: "Generational Bridge Formation",
        titleCn: "\u4EE3\u9645\u6865\u6881",
        description:
          "The emergence of a role connecting generations \u2014 transmitting hard-won wisdom to younger souls while receiving renewed vitality from their fresh perspective.",
        yearRange: "56+",
        confidence: 82,
        icon: "relationship",
      },
    ],
  },
];

export function getDeductionsForAge(birthYear: string): Deduction[] {
  const year = parseInt(birthYear, 10);
  if (isNaN(year)) return AGE_GROUPS[2].deductions; // fallback to 28-35

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  const group = AGE_GROUPS.find((g) => age >= g.minAge && age <= g.maxAge);
  return group ? [...group.deductions] : [...AGE_GROUPS[2].deductions];
}
