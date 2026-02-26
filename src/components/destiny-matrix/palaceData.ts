import type { PalaceDetail } from "@/types";

export const DEFAULT_PALACES: PalaceDetail[] = [
  {
    id: "wealth",
    name: "Wealth",
    nameCn: "财帛",
    subtitle: "The Financial Frequency",
    icon: "wealth",
    consciousness:
      "你的财务频率。现金流逻辑与风险承受力。",
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
    subtitle: "The Creation Engine",
    icon: "children",
    consciousness:
      "你的创造、传承与投资回报。每一个构想和培育行为的产出。",
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
    subtitle: "The Partnership Mirror",
    icon: "spouse",
    consciousness:
      "你最高质量的合伙关系镜像。两个命运交融的炼金术。",
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
    subtitle: "The First Alliance",
    icon: "siblings",
    consciousness:
      "你的第一个同盟。资源共享、竞争与合作的原始模式。",
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
    subtitle: "The Stress Monitor",
    icon: "health",
    consciousness:
      "你潜意识压力的实时监控器，显示你身体最脆弱的逻辑漏洞。",
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
    subtitle: "The Horizon Shift",
    icon: "travel",
    consciousness:
      "你的环境适应力。代表你在变动、旅行和陌生领域中的「生存胜率」。",
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
    subtitle: "The Social Synapse",
    icon: "friends",
    consciousness:
      "你的社会突触。你所处的网络如何消耗或增强你的能量。",
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
    subtitle: "The Sovereign Impact",
    icon: "career",
    consciousness:
      "你的社会主权。你如何通过行动在外部世界建立秩序与成就。",
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
    subtitle: "The Foundational Base",
    icon: "property",
    consciousness:
      "你的安全基座。代表不动产、家庭传承以及你内心最深处的归属感。",
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
    subtitle: "The Spiritual Vault",
    icon: "fortune",
    consciousness:
      "你的精神仓库。它关乎因果、心态和你在看不见的领域积攒的「幸运值」。",
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
    subtitle: "The Life CPU",
    icon: "self",
    consciousness:
      "命盘的CPU。你的核心身份、先天气质，以及解读其他所有宫位的镜头。",
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
    subtitle: "The Ancestral Input",
    icon: "parents",
    consciousness:
      "你的源头输入。它代表上司、长辈以及那些先于你存在、并深刻影响你的权力结构。",
    fable:
      "A daughter planted a tree where her mother's tears once fell. Centuries later, the forest was named after them both.",
    gridCol: 4,
    gridRow: 3,
    stars: ["Tian Kui"],
    energy: 65,
    state: "neutral",
  },
];
