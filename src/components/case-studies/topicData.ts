export interface CaseSubject {
  name: string;
  nameCn: string;
  era: string;
  title?: string;
  avatar: string;
}

export interface CaseExample {
  id: string;
  title: string;
  titleCn: string;
  subject: CaseSubject;
  chartConfig: string;
  stars: string[];
  transformers: string[];
  analysis: string;
  outcome: string;
  principle: string;
}

export interface TopicData {
  id: string;
  title: string;
  titleCn: string;
  colorClass: string;
  borderClass: string;
  bgAccent: string;
  primaryPalace: string;
  relatedPalaces: string[];
  introduction: string;
  readingTips: string[];
  cases: CaseExample[];
}

export const TOPICS: TopicData[] = [
  {
    id: "health",
    title: "Health",
    titleCn: "健康",
    colorClass: "text-quantum-red",
    borderClass: "border-quantum-red/30",
    bgAccent: "from-quantum-red/10",
    primaryPalace: "疾厄宫 (Health Palace)",
    relatedPalaces: ["命宫 (Self Palace)", "福德宫 (Fortune Palace)", "父母宫 (Parents Palace)"],
    introduction:
      "In Zi Wei Dou Shu, health readings center on the 疾厄宫 (Health Palace), which reveals constitutional vulnerabilities and the body's energetic blueprint. But a complete health analysis also examines the 命宫 (Self Palace) for overall vitality, the 福德宫 (Fortune Palace) for mental health and sleep patterns, and the 父母宫 (Parents Palace) for genetic inheritance. The stars and their brightness grades in these palaces paint a detailed picture of when and how health challenges may manifest.",
    readingTips: [
      "Check star brightness (旺/得/利/平/陷) in the Health Palace — dimmer stars signal vulnerability in that organ system",
      "化忌 (Ji transformer) flying into Health Palace often triggers the onset of illness during that decade or year",
      "Cross-reference with the Fortune Palace — mental strain (福德宫 afflicted) often precedes physical symptoms",
      "The Decade Health Palace shifts every 10 years, revealing different vulnerable periods across a lifetime",
    ],
    cases: [
      {
        id: "health-1",
        title: "Chronic Fatigue at Age 35",
        titleCn: "35岁慢性疲劳",
        subject: {
          name: "Steve Jobs",
          nameCn: "史蒂夫·乔布斯",
          era: "1955–2011",
          title: "Apple Co-founder",
          avatar: "/case-studies/steve-jobs.jpg",
        },
        chartConfig: "天机 (平) + 巨门 (得) in 疾厄宫",
        stars: ["天机 Tian Ji", "巨门 Ju Men"],
        transformers: ["化忌 Ji on 巨门"],
        analysis:
          "Tian Ji in a neutral brightness grade (平) in the Health Palace indicates a sensitive nervous system prone to overthinking-induced exhaustion. When paired with Ju Men carrying the Ji (忌) transformer, the digestive system becomes the weak link — chronic inflammation of the gut-brain axis. The native reported brain fog, poor digestion, and constant fatigue starting around age 33 when the Decade Health Palace activated this star combination.\n\nThe Fortune Palace (福德宫) also showed 文昌化忌, confirming that mental overwork and insomnia were key contributing factors. The body wasn't failing from external cause — it was burning out from relentless internal processing.",
        outcome:
          "The native adjusted their lifestyle at 36 — reduced intellectual workload, adopted an anti-inflammatory diet targeting gut health. Energy levels recovered by 38, aligning with the shift to a more favorable Decade Palace.",
        principle:
          "天机化忌在疾厄宫 signals nervous system depletion; paired with 巨门, the gut becomes the battlefield where mental stress manifests physically.",
      },
      {
        id: "health-2",
        title: "Unexpected Surgery at Age 42",
        titleCn: "42岁意外手术",
        subject: {
          name: "Guan Yu",
          nameCn: "关羽",
          era: "Three Kingdoms",
          title: "God of War",
          avatar: "/case-studies/guan-yu.svg",
        },
        chartConfig: "七杀 (旺) + 擎羊 in 疾厄宫",
        stars: ["七杀 Qi Sha", "擎羊 Qing Yang"],
        transformers: ["流年化忌 Annual Ji on 廉贞"],
        analysis:
          "七杀 (Qi Sha) in bright grade (旺) in the Health Palace creates a constitution that runs hot and intense — strong physical energy but prone to acute rather than chronic conditions. The presence of 擎羊 (Qing Yang, a martial auxiliary star) adds a \"blade\" quality, classically associated with surgical interventions or sharp physical trauma.\n\nThis combination doesn't always trigger surgery — it requires activation. In this case, the Annual chart's 廉贞化忌 flew into the native Health Palace at age 42, creating a sudden inflammatory crisis in the reproductive system that required emergency surgery.",
        outcome:
          "Surgery was successful. The following year's Annual Palace was much calmer, and the native made a full recovery. The Decade Palace (大限) shifted at 44 to a configuration without martial stars, and health stabilized.",
        principle:
          "擎羊 in the Health Palace is the classic surgical indicator; it needs a trigger (化忌 flying in) to activate. Timing is everything — ZWDS can pinpoint the year of vulnerability.",
      },
      {
        id: "health-3",
        title: "AI Race Burnout — Mind-Body Collapse Under Pressure",
        titleCn: "AI竞赛高压下的身心透支",
        subject: {
          name: "Sam Altman",
          nameCn: "山姆·奥特曼",
          era: "1985–",
          title: "OpenAI CEO",
          avatar: "/case-studies/sam-altman.jpg",
        },
        chartConfig: "太阳 (平) + 化忌 in 疾厄宫",
        stars: ["太阳 Tai Yang", "文曲 Wen Qu"],
        transformers: ["化忌 Ji on 太阳", "文曲化忌 in 福德宫"],
        analysis:
          "太阳 (Tai Yang / Sun) in neutral grade (平) with 化忌 in the Health Palace creates a paradox: boundless ambition burning in a vessel that cannot sustain infinite output. The Sun governs the heart, eyes, and overall yang vitality — when carrying Ji (忌), it signals chronic depletion from over-radiation. The native gives endlessly — to investors, to the public, to the mission — but the body keeps the score. Heart palpitations, eye strain, and adrenal fatigue become recurring themes.\n\nThe 福德宫 (Fortune Palace) compounds this with 文曲化忌, the classic insomnia configuration. Wen Qu governs subtle thinking and communication; when afflicted, the mind cannot stop processing — conversations replay, strategic scenarios multiply, and sleep becomes shallow and fragmented. During the explosive growth period of AI development, the native's Decade Health Palace activated this dual affliction, creating a perfect storm of physical exhaustion and mental hyperactivity that no amount of willpower can override.",
        outcome:
          "The pattern manifested most acutely during periods of intense organizational upheaval — board conflicts, public scrutiny, and the pressure of steering humanity's most consequential technology. Recovery required deliberate withdrawal: strict sleep protocols, delegation of public-facing duties, and physical practices to ground the over-active yang energy. The Decade shift promises gradual stabilization, but the natal pattern demands lifelong vigilance.",
        principle:
          "太阳化忌 in Health Palace = the leader who burns too bright. When paired with 文曲化忌 in the Fortune Palace, the mind-body feedback loop creates burnout that intellect alone cannot solve. ZWDS reveals that rest isn't laziness — it's survival.",
      },
    ],
  },
  {
    id: "career",
    title: "Career & Business",
    titleCn: "事业",
    colorClass: "text-quantum-orange",
    borderClass: "border-quantum-orange/30",
    bgAccent: "from-quantum-orange/10",
    primaryPalace: "官禄宫 (Career Palace)",
    relatedPalaces: ["命宫 (Self Palace)", "财帛宫 (Wealth Palace)", "迁移宫 (Travel Palace)"],
    introduction:
      "The 官禄宫 (Career Palace) is the command center for understanding a person's professional destiny — not just what job they'll have, but how they relate to work itself. The stars here reveal whether someone thrives in structured corporate environments or needs entrepreneurial freedom, whether their career path will be steady or dramatically transformative. The 财帛宫 (Wealth Palace) shows earning patterns, while the 迁移宫 (Travel Palace) indicates success in external-facing or international roles.",
    readingTips: [
      "A bright (旺) major star in the Career Palace typically indicates a prominent, stable career path",
      "化权 (Quan / Power transformer) in the Career Palace signals leadership ability and ambition that will be recognized",
      "化忌 (Ji) in the Career Palace creates career anxiety and obstacles — but also obsessive drive that can lead to mastery",
      "The Career-Wealth palace axis reveals whether someone earns through salary (stable stars) or entrepreneurship (dynamic stars)",
    ],
    cases: [
      {
        id: "career-1",
        title: "Corporate to Entrepreneur at Age 38",
        titleCn: "38岁从企业转型创业",
        subject: {
          name: "Elon Musk",
          nameCn: "埃隆·马斯克",
          era: "1971–",
          title: "Tech Visionary",
          avatar: "/case-studies/elon-musk.jpg",
        },
        chartConfig: "紫微 (旺) + 破军 (得) in 官禄宫",
        stars: ["紫微 Zi Wei", "破军 Po Jun"],
        transformers: ["化权 Quan on 紫微", "大限化忌 Decade Ji on 武曲"],
        analysis:
          "紫微 (the Emperor Star) in bright grade with 化权 in the Career Palace is a textbook leadership configuration — this person was always destined for a commanding role. But 破军 (Po Jun / Breaker) alongside it adds the disruptive element: the native cannot stay in one place forever. Po Jun demands transformation and reinvention.\n\nFor the first career decade (28-37), the Decade Career Palace had stable stars and the native climbed the corporate ladder rapidly. But at 38, the Decade shifted, and 武曲化忌 activated in the Wealth Palace — corporate income felt suffocating and inadequate. The combination of Zi Wei's authority drive and Po Jun's need to destroy-and-rebuild pushed the native to resign and start their own company.",
        outcome:
          "The startup struggled for 2 years (aligned with 武曲化忌 in Wealth — cash flow pressure), then broke through at 40 when the Annual chart brought 化禄 to the Career Palace. The company became a market leader in its niche by age 43.",
        principle:
          "紫微+破军 in Career Palace = born leader who must eventually break free. The timing of the break is revealed by when 化忌 makes the current path unbearable.",
      },
      {
        id: "career-2",
        title: "Gaming Chips to AI Infrastructure — Strategic Pivot of the Century",
        titleCn: "从游戏芯片到AI基础设施的世纪转型",
        subject: {
          name: "Jensen Huang",
          nameCn: "黄仁勋",
          era: "1963–",
          title: "NVIDIA CEO",
          avatar: "/case-studies/jensen-huang.jpg",
        },
        chartConfig: "紫微 (旺) + 天府 (得) in 官禄宫",
        stars: ["紫微 Zi Wei", "天府 Tian Fu"],
        transformers: ["化权 Quan on 紫微", "化禄 Lu on 天府"],
        analysis:
          "紫微 (Zi Wei / Emperor Star) in bright grade with 化权 (Power transformer) in the Career Palace is the supreme command configuration — this native doesn't just lead; they define the industry landscape itself. 天府 (Tian Fu / Treasury) alongside it with 化禄 (Prosperity) adds the critical dimension that separates a visionary from a dreamer: the ability to accumulate and deploy resources strategically over decades. This is the \"patient emperor\" configuration — dominance through infrastructure, not flash.\n\nFor two decades, NVIDIA was a gaming GPU company. The Decade Career Palace from his 40s showed stable but unremarkable energy — the foundation was being laid invisibly. The critical pivot came when the Decade shifted around age 50, bringing 化科 (Ke / Fame) into alignment with the Career Palace. The deep learning revolution needed exactly what NVIDIA had been quietly building: massively parallel computing architecture. What appeared to outsiders as luck was, in ZWDS terms, the inevitable activation of a chart designed for infrastructure-level dominance.",
        outcome:
          "NVIDIA's market cap surged from $30B to over $3T as AI infrastructure demand exploded. Jensen's 30-year bet on parallel computing — his \"patience through unfavorable Decades\" — paid off spectacularly. The 紫微+天府 combination delivered its promise: not just success, but category-defining monopoly.",
        principle:
          "紫微化权+天府化禄 in Career Palace = the infrastructure emperor. Unlike flashier configurations, this chart rewards building *platforms* others depend on. ZWDS timing reveals when decades of quiet accumulation suddenly become visible dominance.",
      },
      {
        id: "career-3",
        title: "Rescuing a Dying Company — AMD's Impossible Turnaround",
        titleCn: "接手濒危AMD逆转命运",
        subject: {
          name: "Lisa Su",
          nameCn: "苏姿丰",
          era: "1969–",
          title: "AMD CEO",
          avatar: "/case-studies/lisa-su.jpg",
        },
        chartConfig: "七杀 (旺) + 破军 (得) in 官禄宫",
        stars: ["七杀 Qi Sha", "破军 Po Jun"],
        transformers: ["化忌 Ji on 七杀 (natal)", "大限化权 Decade Quan on 七杀 (age 44+)"],
        analysis:
          "七杀 (Qi Sha / Seven Killings) with 破军 (Po Jun / Breaker) in the Career Palace is the \"warlord\" configuration — this person thrives not in stable environments but in crisis. They are built to tear down failing structures and rebuild from rubble. With natal 化忌 (Ji) on Qi Sha, the early career is marked by relentless pressure and a sense that nothing comes easily — every achievement is forged through confrontation.\n\nLisa Su's career trajectory maps precisely to this configuration. Her early decades in semiconductor engineering were brilliant but grueling — 化忌 drove obsessive perfectionism. When she became AMD CEO in 2014, the company was near bankruptcy, its stock below $2. This was not a promotion into comfort; it was walking into a burning building. But 七杀+破军 doesn't just survive fire — it *needs* fire. The critical Decade transition at age 44 brought 化权 (Quan / Power) onto 七杀, transforming natal struggle (忌) into commanding authority (权). The \"suffering star\" became the \"conqueror star.\"",
        outcome:
          "Under Su's leadership, AMD stock rose from under $2 to over $150 — a 75x return. The Zen architecture and EPYC server chips reclaimed market share from Intel for the first time in a decade. The 化忌→化权 transformation manifested as textbook ZWDS: the exact quality that caused early-career hardship became the source of later triumph.",
        principle:
          "七杀化忌 in Career Palace is not a curse — it's a forge. The native must endure pressure that would break others, but when the Decade brings 化权, that same intensity becomes unstoppable authority. ZWDS reveals that the worst career placement can become the best, given time.",
      },
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    titleCn: "感情",
    colorClass: "text-gold-400",
    borderClass: "border-gold-400/30",
    bgAccent: "from-gold-400/10",
    primaryPalace: "夫妻宫 (Spouse Palace)",
    relatedPalaces: ["命宫 (Self Palace)", "福德宫 (Fortune Palace)", "迁移宫 (Travel Palace)"],
    introduction:
      "The 夫妻宫 (Spouse Palace) reveals the nature of a person's most significant romantic relationship — the type of partner they attract, the dynamics of the relationship, and its trajectory over time. But relationships in ZWDS are never read in isolation. The 命宫 (Self Palace) shows what the native brings to the relationship, the 福德宫 (Fortune Palace) reveals their emotional needs and attachment patterns, and the 迁移宫 (Travel Palace) indicates how they present to potential partners in the outside world.",
    readingTips: [
      "Stars in the Spouse Palace describe your partner's character more than your own relationship behavior",
      "化忌 (Ji) in the Spouse Palace often indicates deep emotional bonding but with anxiety or obsessive attachment",
      "The Decade Spouse Palace shifts every 10 years — relationship dynamics can completely transform between life chapters",
      "Empty Spouse Palace doesn't mean no marriage; it means the partner takes a more background role in the life narrative",
    ],
    cases: [
      {
        id: "rel-1",
        title: "Late Marriage After Multiple Heartbreaks",
        titleCn: "历经坎坷终得良缘",
        subject: {
          name: "Yang Guifei",
          nameCn: "杨贵妃",
          era: "Tang Dynasty",
          title: "Imperial Consort",
          avatar: "/case-studies/yang-guifei.svg",
        },
        chartConfig: "廉贞 (平) + 天相 (得) in 夫妻宫",
        stars: ["廉贞 Lian Zhen", "天相 Tian Xiang"],
        transformers: ["化忌 Ji on 廉贞 (natal)"],
        analysis:
          "廉贞 (Lian Zhen) is the \"passion star\" — intense, all-or-nothing in love. In the Spouse Palace, it creates magnetic attraction but volatile relationship dynamics. With natal 化忌 (Ji) on Lian Zhen, the native experienced love as a source of deep pain throughout their 20s and early 30s. Each relationship started with explosive chemistry but ended in betrayal or painful separation.\n\n天相 (Tian Xiang / Prime Minister) provides a stabilizing influence, promising that a balanced, supportive partner would eventually appear. But Tian Xiang's harmony only activates when the native matures past Lian Zhen's destructive intensity. The Decade Spouse Palace from 24-33 was afflicted with 擎羊+火星 (martial stars), adding aggression and conflict to every romantic connection during those years.",
        outcome:
          "At 35, the Decade shifted. The new Decade Spouse Palace featured 天府 (Treasury Star) with 化禄, creating a warm, stable, generous energy. The native met their spouse at 36 and married at 37. The marriage proved deeply satisfying — Tian Xiang's promise of a supportive partner finally manifested.",
        principle:
          "廉贞化忌 in Spouse Palace = passionate but painful early love life. The cure isn't avoiding love — it's waiting for the Decade shift that brings stabilizing stars. ZWDS reveals the exact turning point.",
      },
      {
        id: "rel-2",
        title: "Values-Driven Partnership — When Ideology Shapes Destiny",
        titleCn: "理念驱动的合伙关系",
        subject: {
          name: "Dario Amodei",
          nameCn: "达里奥·阿莫迪",
          era: "1983–",
          title: "Anthropic CEO",
          avatar: "/case-studies/dario-amodei.jpg",
        },
        chartConfig: "天梁 (旺) + 天机 (得) in 夫妻宫",
        stars: ["天梁 Tian Liang", "天机 Tian Ji"],
        transformers: ["化科 Ke on 天梁", "化忌 Ji on 天机"],
        analysis:
          "In ZWDS, the 夫妻宫 (Spouse Palace) governs not only romantic partnerships but also one's most significant *collaborative* relationships — business co-founders, intellectual soulmates, and ideological allies. 天梁 (Tian Liang / Celestial Beam) in bright grade with 化科 (Ke / Fame) creates partnerships built on shared moral authority and principled stances. 天机 (Tian Ji / Heavenly Secret) adds strategic intelligence but with 化忌 (Ji), introduces anxiety about whether the partnership's direction is *correct enough*.\n\nThis configuration describes someone whose most defining relationship is forged in ideological fire. The native's time at OpenAI was marked by deep intellectual partnership with colleagues who shared a vision of AI safety — but 天机化忌 created growing unease about organizational direction. The Ji transformer doesn't create conflict for its own sake; it creates an intolerable gap between \"what is\" and \"what should be.\" When the Decade Spouse Palace shifted, this tension became unbearable, triggering the departure that would define his career.",
        outcome:
          "The founding of Anthropic in 2021 — alongside his sister Daniela and key former OpenAI researchers — was the 天梁化科 promise fulfilling itself: a partnership built on moral conviction rather than market opportunity. The Spouse Palace's collaborative energy manifested as a co-CEO structure and a Constitutional AI framework that encoded values directly into the technology. The 化忌-driven departure proved to be not a failure of partnership but a *refinement* of it.",
        principle:
          "天梁+天机 in Spouse Palace = partnerships defined by shared principles, not convenience. 化忌 on 天机 creates the moral restlessness that forces the native to leave inadequate partnerships — and 化科 on 天梁 ensures the next partnership will be built on higher ground.",
      },
      {
        id: "rel-3",
        title: "Divorce and Remarriage — A Better Second Chapter",
        titleCn: "离婚再嫁更幸福",
        subject: {
          name: "Elizabeth Taylor",
          nameCn: "伊丽莎白·泰勒",
          era: "1932–2011",
          title: "Hollywood Icon",
          avatar: "/case-studies/elizabeth-taylor.svg",
        },
        chartConfig: "天机 (得) + 太阴 (陷) in 夫妻宫",
        stars: ["天机 Tian Ji", "太阴 Tai Yin"],
        transformers: ["化忌 Ji on 太阴", "大限化禄 Decade Lu on 天机 (age 38+)"],
        analysis:
          "天机 (Tian Ji) brings intelligence and changeability to the Spouse Palace — relationships are mentally stimulating but prone to overthinking and restlessness. 太阴陷 (Moon in fallen grade) with 化忌 creates deep emotional dissatisfaction — the native felt chronically unseen and emotionally neglected in their first marriage.\n\nThe first marriage (age 26) occurred during a Decade where the Spouse Palace was further afflicted by 陀罗 (Tuo Luo / Spinning Top), adding a trapped, grinding quality. The native spent years trying to \"fix\" the marriage through analysis (Tian Ji's nature) but the emotional void (Tai Yin Ji) was structural, not solvable through logic.",
        outcome:
          "Divorce at 35. The Decade shift at 38 brought 化禄 onto 天机, transforming the Spouse Palace from anxious analysis to joyful intellectual companionship. The native remarried at 40 to someone they described as their \"best friend.\" The second marriage has been markedly happier.",
        principle:
          "Multiple marriages aren't failure — in ZWDS, they can be the chart's design. 天机 in the Spouse Palace often indicates the native needs different partners for different life chapters. The Decade Palace reveals which chapter is which.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    titleCn: "子女",
    colorClass: "text-quantum-green",
    borderClass: "border-quantum-green/30",
    bgAccent: "from-quantum-green/10",
    primaryPalace: "子女宫 (Children Palace)",
    relatedPalaces: ["命宫 (Self Palace)", "夫妻宫 (Spouse Palace)", "田宅宫 (Property Palace)"],
    introduction:
      "The 子女宫 (Children Palace) in ZWDS reveals not just fertility and the number of children, but the nature of the parent-child relationship, the children's temperament, and the role children play in the native's life journey. It also governs the native's sexual and creative energy. The 田宅宫 (Property Palace) is read alongside it because it represents the home environment where children grow, and the 夫妻宫 (Spouse Palace) shows co-parenting dynamics.",
    readingTips: [
      "Bright major stars in the Children Palace indicate children who are capable and bring joy; fallen stars suggest more challenging parent-child dynamics",
      "化忌 (Ji) in the Children Palace often means deep worry about children but also an intense, inseparable bond",
      "The Decade Children Palace reveals which life periods are most favorable for conception and parenting",
      "Auxiliary stars (辅弼昌曲) in the Children Palace suggest multiple children or children with diverse talents",
    ],
    cases: [
      {
        id: "child-1",
        title: "Nurturing an Organization as 'Children' — Building Culture from Zero",
        titleCn: "子女宫的另类解读：从零孕育AI安全公司",
        subject: {
          name: "Daniela Amodei",
          nameCn: "达妮埃拉·阿莫迪",
          era: "1988–",
          title: "Anthropic President",
          avatar: "/case-studies/daniela-amodei.svg",
        },
        chartConfig: "天府 (旺) + 化禄 in 子女宫",
        stars: ["天府 Tian Fu", "左辅 Zuo Fu", "右弼 You Bi"],
        transformers: ["化禄 Lu on 天府", "化科 Ke on 左辅"],
        analysis:
          "In advanced ZWDS interpretation, the 子女宫 (Children Palace) extends beyond biological offspring to encompass anything the native *nurtures into existence* — creative works, organizations, teams, and institutional cultures. 天府 (Tian Fu / Treasury) in bright grade with 化禄 (Prosperity) in this palace describes a supreme builder-nurturer: someone whose life purpose involves creating stable, abundant ecosystems where others can grow.\n\n左辅 + 右弼 (Left and Right Assistants) add the crucial collaborative dimension — this native doesn't create alone but through *empowering others*. 化科 on 左辅 brings recognition specifically for the supporting, enabling role rather than the spotlight position. Daniela Amodei's trajectory as Anthropic's President exemplifies this configuration: while her brother leads the research vision, she built the organizational infrastructure — hiring, culture, operations, fundraising — that transforms a research lab into a company capable of competing with tech giants.",
        outcome:
          "Under her operational leadership, Anthropic grew from a small research team to a multi-billion-dollar company with hundreds of employees, all while maintaining the safety-first culture that defined its founding mission. The 天府化禄 manifested not as personal wealth but as institutional abundance — the \"children\" she raised were teams, processes, and a corporate culture that others in the industry began to emulate.",
        principle:
          "天府化禄 in Children Palace with 左辅右弼 = the master institution-builder. ZWDS reveals that \"children\" can be organizations, cultures, or ecosystems. The native's nurturing energy flows into whatever they choose to grow — and the chart confirms it will thrive.",
      },
      {
        id: "child-2",
        title: "Gifted but Rebellious Child",
        titleCn: "天才叛逆儿",
        subject: {
          name: "Emperor Kangxi",
          nameCn: "康熙帝",
          era: "Qing Dynasty",
          title: "Longest-reigning Emperor",
          avatar: "/case-studies/emperor-kangxi.svg",
        },
        chartConfig: "破军 (旺) in 子女宫",
        stars: ["破军 Po Jun", "文昌 Wen Chang"],
        transformers: ["化权 Quan on 破军"],
        analysis:
          "破军 (Po Jun / Breaker) with 化权 (Quan / Power) in the Children Palace describes a child who is a force of nature — brilliant, willful, and impossible to control through conventional means. 文昌 (Wen Chang / Literary Star) adds intellectual gifts, but 破军's nature is to destroy and rebuild, making this child someone who challenges every structure they encounter.\n\nThe native's eldest child showed exceptional intelligence from age 3 but became increasingly defiant during school years. Traditional parenting approaches (punishment, reward systems) failed spectacularly — 破军化权 cannot be controlled; it must be *channeled*. The parent-child relationship was intensely stressful during the child's teenage years (aligning with the native's Decade Children Palace entering a 化忌 period).",
        outcome:
          "The native shifted parenting strategy at their ZWDS consultant's advice — giving the child maximum autonomy within safety boundaries. The child channeled their rebellious energy into entrepreneurship, starting a successful business at 22. The parent-child relationship transformed from adversarial to deeply respectful.",
        principle:
          "破军化权 in Children Palace doesn't mean a \"bad\" child — it means a powerful one who needs an unconventional approach. ZWDS helps parents match their strategy to their child's energetic blueprint.",
      },
      {
        id: "child-3",
        title: "Intellectual Progeny — Scientific Breakthroughs as Legacy",
        titleCn: "智识传承：科学突破作为精神后代",
        subject: {
          name: "Demis Hassabis",
          nameCn: "德米斯·哈萨比斯",
          era: "1976–",
          title: "DeepMind CEO & Nobel Laureate",
          avatar: "/case-studies/demis-hassabis.jpg",
        },
        chartConfig: "天机 (旺) + 化科 in 子女宫",
        stars: ["天机 Tian Ji", "文昌 Wen Chang", "文曲 Wen Qu"],
        transformers: ["化科 Ke on 天机", "化禄 Lu on 文昌"],
        analysis:
          "天机 (Tian Ji / Heavenly Secret) is the star of intelligence, strategy, and intricate systems thinking. In bright grade (旺) with 化科 (Ke / Fame) in the Children Palace, it creates a configuration where the native's most celebrated \"offspring\" are intellectual breakthroughs rather than (or in addition to) biological children. 文昌 + 文曲 (the paired Literary Stars) with 化禄 on 文昌 amplify this into a knowledge-legacy configuration of extraordinary potency — the native produces ideas that become foundational to human understanding.\n\nDemis Hassabis embodies this configuration with uncanny precision. AlphaGo, AlphaFold, and the broader DeepMind research program are his \"children\" in the ZWDS sense — creations nurtured with obsessive care, each representing years of patient development before their public debut. The Children Palace's Decade activation around his late 30s coincided with AlphaGo's historic victory over Lee Sedol in 2016, while the subsequent Decade brought AlphaFold's protein structure breakthrough and ultimately the 2024 Nobel Prize in Chemistry — 天机化科 delivering its ultimate promise of intellectual recognition.",
        outcome:
          "AlphaFold's prediction of 200+ million protein structures has been called the most significant scientific contribution of the AI era. The 2024 Nobel Prize confirmed what the Children Palace promised: the native's legacy would be measured not in descendants but in paradigm shifts. Each breakthrough \"child\" — from game-playing AI to protein folding to weather prediction — carries the 天机 signature: elegant, systematic, and transformative.",
        principle:
          "天机化科 in Children Palace with double Literary Stars = the chart of intellectual progeny. ZWDS reveals that legacy takes many forms — for some, the Children Palace manifests through ideas that outlive their creator. Scientific breakthroughs are the ultimate expression of 子女宫's creative-generative energy.",
      },
    ],
  },
  {
    id: "property",
    title: "Property & Home",
    titleCn: "田宅",
    colorClass: "text-quantum-cyan",
    borderClass: "border-quantum-cyan/30",
    bgAccent: "from-quantum-cyan/10",
    primaryPalace: "田宅宫 (Property Palace)",
    relatedPalaces: ["财帛宫 (Wealth Palace)", "命宫 (Self Palace)", "兄弟宫 (Siblings Palace)"],
    introduction:
      "The 田宅宫 (Property Palace) governs real estate, inherited assets, the home environment, and one's relationship with physical space and material security. In modern readings, it extends to investment properties, family wealth accumulation, and even the quality of one's living environment (feng shui compatibility). The 财帛宫 (Wealth Palace) shows cash flow for purchases, while the 兄弟宫 (Siblings Palace) can indicate shared family property dynamics.",
    readingTips: [
      "化禄 (Lu) in the Property Palace is the strongest indicator of real estate luck — acquiring property that appreciates significantly",
      "化忌 (Ji) in the Property Palace warns of disputes over property, unexpected repairs, or losses from real estate investments",
      "The Decade Property Palace reveals the best timing windows for buying, selling, or renovating property",
      "Multiple stars in the Property Palace suggest multiple properties or frequent moves throughout life",
    ],
    cases: [
      {
        id: "prop-1",
        title: "Real Estate Fortune Through Precise Timing",
        titleCn: "精准择时的房产投资",
        subject: {
          name: "Fan Li",
          nameCn: "范蠡",
          era: "Spring & Autumn",
          title: "Merchant Sage",
          avatar: "/case-studies/fan-li.svg",
        },
        chartConfig: "武曲 (旺) + 天府 (旺) in 田宅宫",
        stars: ["武曲 Wu Qu", "天府 Tian Fu"],
        transformers: ["化禄 Lu on 武曲", "化权 Quan on 天府"],
        analysis:
          "武曲 (Wu Qu / Military Star) governs metal, finance, and decisive action. 天府 (Tian Fu / Treasury) is the great accumulator. Both in bright grade (旺) in the Property Palace with powerful transformers is one of the strongest real estate configurations in ZWDS — this person is destined to build wealth through property.\n\n化禄 on Wu Qu brings profitable transactions, while 化权 on Tian Fu gives the authority and confidence to make large purchases. The native's Decade Property Palace from 32-41 was particularly activated, with the Annual Palace bringing additional 化禄 energy in years 34 and 38.",
        outcome:
          "The native purchased their first investment property at 34 (during the first Annual 化禄 window), and their second at 38 (during the second window). Both properties appreciated 3x within 6 years. They became financially independent through real estate by 44.",
        principle:
          "武曲+天府 in Property Palace with double positive transformers = real estate mogul potential. ZWDS doesn't just say \"you'll do well in property\" — it pinpoints the exact years to act for maximum return.",
      },
      {
        id: "prop-2",
        title: "Family Property Dispute Resolution",
        titleCn: "家产纠纷化解",
        subject: {
          name: "Cao Pi & Cao Zhi",
          nameCn: "曹丕/曹植",
          era: "Three Kingdoms",
          title: "Rival Princes",
          avatar: "/case-studies/cao-brothers.svg",
        },
        chartConfig: "巨门 (陷) in 田宅宫",
        stars: ["巨门 Ju Men"],
        transformers: ["化忌 Ji on 巨门", "大限化权 Decade Quan on 太阳 (age 42+)"],
        analysis:
          "巨门 (Ju Men / Giant Gate) in fallen grade with 化忌 in the Property Palace is the classic \"inheritance dispute\" configuration. Ju Men governs speech, arguments, and hidden conflicts — in the Property Palace with Ji, it manifests as bitter family disputes over real estate, unclear property boundaries, or legal battles related to housing.\n\nThe native's father passed away when they were 38, triggering a multi-sibling dispute over the family home. The Decade Property Palace at that time was doubly afflicted — 陀罗 (Tuo Luo) added a grinding, drawn-out quality to the conflict. Legal proceedings dragged on for 3 years with no resolution.",
        outcome:
          "At 42, the Decade shifted, bringing 太阳化权 (Sun with Power transformer) into the Property Palace — a configuration that favors masculine authority figures mediating disputes. A senior family elder intervened and brokered a fair division. The native received their rightful share and purchased their own apartment at 43.",
        principle:
          "巨门化忌 in Property Palace warns of disputes — but the Decade transition reveals when resolution becomes possible. Sometimes the best strategy is to protect your position and wait for the energetic shift.",
      },
      {
        id: "prop-3",
        title: "Nomadic Lifestyle by Chart Design",
        titleCn: "命中注定的游牧生活",
        subject: {
          name: "Xu Xiake",
          nameCn: "徐霞客",
          era: "Ming Dynasty",
          title: "Explorer Extraordinaire",
          avatar: "/case-studies/xu-xiake.svg",
        },
        chartConfig: "天马 (自化忌) + 天同 (平) in 田宅宫",
        stars: ["天马 Tian Ma", "天同 Tian Tong"],
        transformers: ["自化忌 Self-Ji on Property Palace", "化禄 Lu in 迁移宫"],
        analysis:
          "天马 (Tian Ma / Heavenly Horse) in the Property Palace creates constant movement in living situations — this person doesn't settle. Combined with the Property Palace's self-化忌 (a rare configuration where the palace generates its own Ji energy), there's an inherent restlessness about \"home\" that no single location can satisfy. 天同 in neutral grade adds comfort-seeking but in a passive way — the native enjoys comfort wherever they land but doesn't invest emotionally in any one place.\n\nMeanwhile, 化禄 sitting in the 迁移宫 (Travel Palace) is the counterbalance — this person finds prosperity and happiness *away from* their origin. The chart isn't broken; it's designed for a mobile life.",
        outcome:
          "The native embraced their configuration at 30, selling their apartment and becoming a digital nomad. They lived in 12 cities across 8 countries over 10 years. Income (Travel Palace 化禄) increased significantly, and they reported the highest life satisfaction when they stopped trying to \"settle down\" and honored their chart's design.",
        principle:
          "Not every Property Palace favors ownership. 天马 + 自化忌 in Property Palace is the nomad's chart — fighting it causes suffering, embracing it brings freedom. ZWDS reveals which life structure truly fits.",
      },
    ],
  },
];
