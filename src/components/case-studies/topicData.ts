export interface CaseExample {
  id: string;
  title: string;
  titleCn: string;
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
        title: "Lifelong Respiratory Weakness",
        titleCn: "终身呼吸系统弱势",
        chartConfig: "太阴 (陷) in 疾厄宫",
        stars: ["太阴 Tai Yin"],
        transformers: ["化忌 Ji on 太阴 (natal)"],
        analysis:
          "太阴 (Tai Yin / Moon) in its weakest brightness grade (陷 / fallen) in the Health Palace points to constitutional weakness in the lungs and immune system. The Moon governs yin energy, fluids, and the body's cooling/moistening functions. When fallen, it indicates chronic dryness in the respiratory tract and susceptibility to allergies, asthma, and recurring colds.\n\nWith the natal Ji (忌) transformer on Tai Yin itself, this isn't a temporary condition but a lifelong constitutional pattern. Every time the Decade or Annual Palace reinforces this combination, respiratory flare-ups occur — the native reported worsening symptoms during autumn and winter months consistently throughout their life.",
        outcome:
          "The native learned to manage proactively: humidifiers, lung-strengthening exercises (qi gong), and preventive TCM treatments before autumn. Symptoms reduced significantly but never fully disappeared — consistent with a natal (non-transiting) pattern.",
        principle:
          "Natal 化忌 on a fallen star in the Health Palace represents a lifelong constitutional pattern rather than a triggered event. Management, not cure, is the appropriate response.",
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
        title: "Academic Career with Late Recognition",
        titleCn: "学术事业大器晚成",
        chartConfig: "天梁 (旺) + 天同 (得) in 官禄宫",
        stars: ["天梁 Tian Liang", "天同 Tian Tong"],
        transformers: ["化科 Ke on 天梁"],
        analysis:
          "天梁 (Tian Liang) is the scholar-mentor star — when bright in the Career Palace, it strongly favors academic, advisory, and healing professions. 天同 (Tian Tong) adds a gentle, patient quality but can delay early career momentum because it resists aggressive ambition. Together, they create a career profile that builds slowly but deeply.\n\nThe 化科 (Ke / Fame) transformer on Tian Liang promised eventual scholarly recognition, but the native spent their 30s in relative obscurity, publishing research that was ahead of its time. The Decade Career Palace from 30-39 had mediocre star brightness, creating a \"desert period\" where effort didn't translate to visible success.",
        outcome:
          "At 41, the Decade Palace shifted to place 天梁化科 in a prominent position with 左辅右弼 (Left and Right Assistants) — peer recognition exploded. The native received a major award at 43 and became a department head at 45.",
        principle:
          "天梁+天同 in Career = the slow-burn scholar path. 化科 guarantees recognition, but ZWDS reveals *when* — patience during weak Decades is the key insight.",
      },
      {
        id: "career-3",
        title: "Serial Career Changes Before Finding Fit",
        titleCn: "多次转行终找到方向",
        chartConfig: "贪狼 (旺) in 官禄宫",
        stars: ["贪狼 Tan Lang"],
        transformers: ["化禄 Lu on 贪狼", "天马 Tian Ma co-located"],
        analysis:
          "贪狼 (Tan Lang / Greedy Wolf) is the most multi-talented star in ZWDS — it craves variety, new experiences, and creative expression. In the Career Palace with 化禄 (Lu / Prosperity), it promises financial success through career... but which career? Tan Lang doesn't want to choose. Add 天马 (Tian Ma / Heavenly Horse) for constant movement, and you get someone who changes industries like changing clothes.\n\nThe native worked in finance (25-28), then hospitality (28-31), then tech startups (31-35), then entertainment (35-38). Each felt exciting initially but suffocating within 2-3 years. The turning point came when the Decade shift at 38 brought 文昌+文曲 (Literary Stars) into the Career Palace, channeling Tan Lang's scattered brilliance into a creative leadership role.",
        outcome:
          "The native became a creative director at a major entertainment company at 39, finally combining their diverse experience into one role. Income doubled within 2 years — the 化禄 promise finally delivered.",
        principle:
          "贪狼化禄 in Career Palace guarantees prosperity through career, but the *type* of career isn't fixed until the Decade Palace provides focusing stars. Each \"failed\" career was actually skill-building for the final synthesis.",
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
        title: "Successful Long-Distance Relationship",
        titleCn: "异地恋修成正果",
        chartConfig: "太阳 (旺) in 夫妻宫",
        stars: ["太阳 Tai Yang"],
        transformers: ["天马 Tian Ma co-located", "化禄 Lu on 太阳"],
        analysis:
          "太阳 (Tai Yang / Sun) in bright grade (旺) in the Spouse Palace is one of the most generous configurations for relationships — the native attracts a warm, generous, outgoing partner. With 化禄 (Lu), the partner brings prosperity and genuine kindness. However, the presence of 天马 (Tian Ma / Heavenly Horse) adds constant movement to the Spouse Palace, indicating physical distance or frequent travel in the relationship.\n\nMany astrologers would flag this as a warning, but the key insight is that 太阳旺 has the radiant energy to sustain connection across distance. The Sun doesn't dim because of distance — it shines regardless. The native met their partner at an international conference at age 29. They maintained a cross-Pacific relationship for 3 years before the partner relocated.",
        outcome:
          "The couple married at 33 after the partner moved. Even after uniting geographically, the Tian Ma influence continued — both traveled frequently for work, maintaining the dynamic of independent-yet-connected that their relationship was built on.",
        principle:
          "天马 in Spouse Palace doesn't doom relationships — it defines their structure. With a bright, positive major star, distance becomes a feature, not a bug. Read the whole configuration, not isolated indicators.",
      },
      {
        id: "rel-3",
        title: "Divorce and Remarriage — A Better Second Chapter",
        titleCn: "离婚再嫁更幸福",
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
        title: "Fertility Struggle Resolved at 34",
        titleCn: "34岁求子成功",
        chartConfig: "天府 (旺) in 子女宫, blocked by 地空+地劫",
        stars: ["天府 Tian Fu", "地空 Di Kong", "地劫 Di Jie"],
        transformers: ["大限化禄 Decade Lu on 天府 (age 32+)"],
        analysis:
          "天府 (Tian Fu / Treasury) in bright grade in the Children Palace is fundamentally a positive indicator — it promises children who are stable, talented, and a source of pride. However, 地空 + 地劫 (the \"emptiness\" stars) create a barrier that delays manifestation. These auxiliary stars are like a cosmic filter that blocks the Treasury's abundance from flowing freely during certain periods.\n\nThe native and their partner tried to conceive from age 28 with no success. Medical tests showed no clear cause — a hallmark of 地空/地劫 influence, which operates on the energetic rather than physical level. The Decade Children Palace from 22-31 was particularly afflicted, with 化忌 adding frustration.",
        outcome:
          "At 32, the Decade shifted, and 化禄 (Lu / Prosperity) landed directly on 天府 in the Children Palace. The native conceived naturally at 33 and delivered a healthy child at 34. A second child followed at 37 — both within the favorable Decade window.",
        principle:
          "地空+地劫 delay but don't deny when the primary star is bright. ZWDS timing reveals *when* to try hardest — aligning effort with favorable Decades dramatically improves outcomes for fertility.",
      },
      {
        id: "child-2",
        title: "Gifted but Rebellious Child",
        titleCn: "天才叛逆儿",
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
        title: "Choosing to Be Childfree — Chart Confirmation",
        titleCn: "命盘确认丁克选择",
        chartConfig: "天机 (平) + 巨门 (陷) in 子女宫",
        stars: ["天机 Tian Ji", "巨门 Ju Men"],
        transformers: ["化忌 Ji on 巨门", "地空 Di Kong"],
        analysis:
          "天机 + 巨门陷 with 化忌 and 地空 in the Children Palace creates one of the more complex configurations for parenthood. 巨门 (Ju Men / Giant Gate) in fallen grade with Ji brings disputes, miscommunication, and emotional drain related to children matters. 地空 adds a sense of existential questioning about parenthood itself. 天机's analytical nature turns this energy inward — the native intellectualized the question of children extensively.\n\nThe native felt societal pressure to have children throughout their 30s but experienced deep ambivalence. Rather than this being a psychological issue to \"fix,\" their ZWDS chart revealed it as an authentic life-path configuration. The energy that would go into parenting was being redirected into creative and intellectual pursuits (天机+巨门 when not directed at children can fuel powerful research and communication skills).",
        outcome:
          "The native made a conscious decision at 38 to remain childfree. They reported feeling profound relief and went on to make significant contributions in their field — authoring influential works that they describe as their legacy. Their ZWDS reading gave them permission to honor their authentic path.",
        principle:
          "Not every Children Palace configuration favors parenthood. ZWDS provides validation for life choices that deviate from social norms — the chart reveals the authentic path, which may or may not include children.",
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
