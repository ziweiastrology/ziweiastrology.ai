import type { PalaceDetail } from "@/types";

export const DEFAULT_PALACES: PalaceDetail[] = [
  {
    id: "wealth",
    name: "Wealth",
    nameCn: "财帛",
    icon: "wealth",
    consciousness:
      "The river of abundance flows not from grasping, but from understanding the tides of fortune. This palace mirrors your relationship with material reality — the gravitational pull between desire and detachment.",
    fable:
      "A merchant once counted coins under moonlight, only to find they had turned to seeds. By morning, his garden fed the entire village.",
    gridCol: 1,
    gridRow: 1,
    stars: ["Wu Qu", "Tian Fu"],
    energy: 85,
    state: "lu",
  },
  {
    id: "children",
    name: "Children",
    nameCn: "子女",
    icon: "children",
    consciousness:
      "Creation extends beyond biology — every idea, every act of nurturing, every spark passed forward is a child of consciousness. This palace governs your legacy through what you bring to life.",
    fable:
      "The old painter had no heirs, yet a thousand villages bore murals from her brush. She lived in every wall that told a story.",
    gridCol: 2,
    gridRow: 1,
    stars: ["Tian Tong"],
    energy: 60,
    state: "neutral",
  },
  {
    id: "spouse",
    name: "Spouse",
    nameCn: "夫妻",
    icon: "spouse",
    consciousness:
      "The mirror of the soul appears first in the beloved. This palace reveals how you merge with another — the alchemy of two destinies intertwined, and the courage to be truly seen.",
    fable:
      "Two rivers refused to join for centuries, each proud of its own course. When they finally merged, they became the sea.",
    gridCol: 3,
    gridRow: 1,
    stars: ["Tai Yang", "Tai Yin"],
    energy: 72,
    state: "quan",
  },
  {
    id: "siblings",
    name: "Siblings",
    nameCn: "兄弟",
    icon: "siblings",
    consciousness:
      "The first bonds we form outside ourselves shape the geometry of all relationships to come. This palace speaks to kinship, alliance, and the invisible threads between those who share an origin.",
    fable:
      "Three brothers divided the inheritance equally, but only the one who gave his share away found what their father truly left behind.",
    gridCol: 4,
    gridRow: 1,
    stars: ["Tian Ji"],
    energy: 45,
    state: "neutral",
  },
  {
    id: "health",
    name: "Health",
    nameCn: "疾厄",
    icon: "health",
    consciousness:
      "The body is the first instrument of destiny. This palace maps the terrain of vitality and vulnerability — not as punishment, but as the language through which the cosmos communicates its deepest lessons.",
    fable:
      "A healer who cured thousands could not cure herself. In her stillness, she discovered the illness was the teaching.",
    gridCol: 1,
    gridRow: 2,
    stars: ["Lian Zhen"],
    energy: 55,
    state: "ji",
  },
  {
    id: "travel",
    name: "Travel",
    nameCn: "迁移",
    icon: "travel",
    consciousness:
      "Movement is the breath of destiny. This palace governs the spaces between — journeys taken and untaken, the transformation that occurs only when you leave the familiar behind.",
    fable:
      "A monk walked a thousand miles seeking enlightenment. He found it in the dust on his sandals — it had been with him all along.",
    gridCol: 1,
    gridRow: 3,
    stars: ["Tian Liang"],
    energy: 88,
    state: "neutral",
  },
  {
    id: "friends",
    name: "Friends",
    nameCn: "交友",
    icon: "friends",
    consciousness:
      "The constellation of souls who orbit your life defines the shape of your sky. This palace reveals the quality of bonds freely chosen — the resonance between kindred spirits across the void.",
    fable:
      "A lone star was dim until it joined a constellation. Together, sailors navigated by their light for a thousand years.",
    gridCol: 1,
    gridRow: 4,
    stars: ["Ju Men"],
    energy: 68,
    state: "neutral",
  },
  {
    id: "career",
    name: "Career",
    nameCn: "官禄",
    icon: "career",
    consciousness:
      "Purpose is not discovered — it is remembered. This palace illuminates the path of worldly contribution, where inner calling meets outer action and labor becomes devotion.",
    fable:
      "The emperor asked the carpenter why he sang while working. 'Because,' he replied, 'each joint I cut is a prayer the building will remember.'",
    gridCol: 2,
    gridRow: 4,
    stars: ["Zi Wei", "Tian Fu"],
    energy: 92,
    state: "ke",
  },
  {
    id: "property",
    name: "Property",
    nameCn: "田宅",
    icon: "property",
    consciousness:
      "Home is the anchor of the wandering soul. This palace speaks to rootedness — the places, spaces, and sanctuaries that hold your essence when the world demands you be elsewhere.",
    fable:
      "A woman built her house from stones others had discarded. It stood for three hundred years, the strongest in the valley.",
    gridCol: 3,
    gridRow: 4,
    stars: ["Po Jun"],
    energy: 70,
    state: "neutral",
  },
  {
    id: "fortune",
    name: "Fortune",
    nameCn: "福德",
    icon: "fortune",
    consciousness:
      "Inner peace is the ultimate wealth. This palace measures not what you have, but how deeply you can receive — the capacity for joy, contentment, and the silent gratitude that needs no reason.",
    fable:
      "An old woman owned nothing but smiled so brightly that strangers left coins at her door. She gave them all away by nightfall.",
    gridCol: 4,
    gridRow: 4,
    stars: ["Tian Xiang"],
    energy: 78,
    state: "neutral",
  },
  {
    id: "self",
    name: "Self",
    nameCn: "命宫",
    icon: "self",
    consciousness:
      "The first palace is the last mystery. Here resides the essence that precedes all roles, all masks, all stories. This is the palace of pure being — the observer behind every observation.",
    fable:
      "A scholar searched every library in the empire for the Book of Self. On his deathbed, he opened his hand and found it written on his palm.",
    gridCol: 4,
    gridRow: 2,
    stars: ["Zi Wei", "Tan Lang"],
    energy: 95,
    state: "lu",
  },
  {
    id: "parents",
    name: "Parents",
    nameCn: "父母",
    icon: "parents",
    consciousness:
      "Before you chose your path, a path was chosen for you. This palace holds the karmic inheritance — the gifts and wounds passed down through bloodlines, shaping destiny before consciousness awakens.",
    fable:
      "A daughter planted a tree where her mother's tears once fell. Centuries later, the forest was named after them both.",
    gridCol: 4,
    gridRow: 3,
    stars: ["Tian Kui"],
    energy: 65,
    state: "neutral",
  },
];
