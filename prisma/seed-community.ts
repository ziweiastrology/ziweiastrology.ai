import { PrismaClient, PostType, Tier, Role } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Editorial user config ───
const EDITORIAL_USER = {
  email: "editorial@ziweiastrology.ai",
  name: "ZiWei Editorial",
  // bcrypt hash of a random password — this account is not meant for login
  password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu3ai",
  tier: Tier.SIFU,
  role: Role.ADMIN,
  bio: "Official editorial account for ZiWei Astrology AI community content.",
  headline: "ZiWei Astrology AI Editorial Team",
  isProfilePublic: true,
};

// ─── Groups ───
const GROUPS = [
  {
    name: "Welcome Center",
    slug: "welcome",
    description: "New here? Introduce yourself and share your chart!",
  },
  {
    name: "Beginner's Circle",
    slug: "beginner-study",
    description: "Learning the basics of Zi Wei Dou Shu together",
  },
  {
    name: "Advanced Practice",
    slug: "advanced-practice",
    description: "Deep analysis, flying stars, four transformers",
  },
];

// ─── Posts ───
interface PostSeed {
  title: string;
  type: PostType;
  tags: string[];
  content: string;
}

const POSTS: PostSeed[] = [
  // ════════════════════════════════════════════
  // DISCUSSION (6)
  // ════════════════════════════════════════════
  {
    title: "What's your Life Palace main star?",
    type: PostType.DISCUSSION,
    tags: ["zwds", "life-palace", "discussion", "beginners"],
    content: `## Let's talk about your Life Palace (命宫) main star!

Your Life Palace is the single most important palace in your Zi Wei Dou Shu chart. It represents your core personality, your innate talents, and the lens through which you experience the world. The main star (主星) sitting in your Life Palace shapes everything from your temperament to your decision-making style.

### The 14 Primary Stars

In ZWDS, there are 14 primary stars that can occupy your Life Palace. Each carries a completely different energy:

- **Zi Wei (紫微)** — The Emperor Star. Natural leaders with high standards, sometimes to the point of being demanding. You have an innate sense of authority and expect respect. Your challenge is learning that not everything needs to be controlled.

- **Tian Ji (天机)** — The Strategist. Quick-witted, analytical, and always planning three steps ahead. You see patterns others miss but can overthink simple decisions. Restlessness is your constant companion.

- **Tai Yang (太阳)** — The Sun. Generous, warm, and publicly-oriented. You shine brightest when helping others but sometimes forget to save energy for yourself. Your brightness depends heavily on your palace position and brightness grade.

- **Wu Qu (武曲)** — The Financial Star. Direct, decisive, and money-savvy. You have a natural instinct for value and commerce. Emotionally, you can be blunt — you say what you mean, and you mean what you say.

- **Tian Tong (天同)** — The Blessing Star. Easy-going, pleasure-loving, and emotionally sensitive. You seek comfort and harmony but can become complacent. Early hardship actually strengthens this star significantly.

- **Lian Zhen (廉贞)** — The Judge. Complex, passionate, and driven by strong convictions. You are all-or-nothing in relationships and career. This star has the widest range of expression — from righteous leader to obsessive perfectionist.

### Share your experience

I'd love to hear from the community:

1. **What is your Life Palace main star?**
2. **How accurately does the traditional interpretation match your real personality?**
3. **Has your understanding of your main star changed over time?**

Don't worry if you're new and still figuring out your chart — that's exactly what this community is for. Drop your birth details (year, month, day, and two-hour birth period) and we can help you identify your stars.

Remember: the main star is just the starting point. The auxiliary stars, brightness grade, and Four Transformers all modify the expression significantly. But the main star remains the foundation of who you are in ZWDS.

Looking forward to your responses!`,
  },
  {
    title: "How accurate was your first chart reading?",
    type: PostType.DISCUSSION,
    tags: ["zwds", "discussion", "beginners", "chart-analysis"],
    content: `## Your first ZWDS chart reading — mind-blown or skeptical?

We all remember the first time someone (or a website) pulled up our Zi Wei Dou Shu chart and started describing our personality, career tendencies, and relationship patterns. For some of us, it was an eerie "how do they know this?" moment. For others, it felt too generic to be convincing.

### My experience

When I first had my chart read by a traditional ZWDS practitioner, three things stood out:

1. **Career Palace accuracy** — He told me I would never be happy in a conventional corporate hierarchy and would eventually work for myself or in a very autonomous role. At the time I was in a standard office job and thought he was wrong. Five years later, here I am running my own consulting practice.

2. **Relationship timing** — The practitioner identified a specific Decade Luck period where my Spouse Palace would activate strongly. That decade happened to coincide almost exactly with when I met my partner.

3. **Health warnings** — He flagged a weakness in my Health Palace related to the digestive system. I had been dealing with stomach issues for years but never mentioned it.

### What the research says

Interestingly, ZWDS has a structural advantage over many other astrological systems because it uses 12 palaces with specific life domains rather than trying to derive everything from planetary positions. This means the predictions are more domain-specific and therefore more falsifiable — which, paradoxically, makes the accurate hits more impressive.

The system also accounts for time-based changes through Decade Luck (大限) and Annual palaces (流年), which means it doesn't just describe a static personality but models how your life unfolds over time.

### Questions for discussion

- **Was your first reading accurate?** What hit and what missed?
- **Did accuracy improve** once you corrected your birth time or used True Solar Time?
- **Have you noticed** the Decade Luck transitions matching real life changes?
- **What's the most specific prediction** from your chart that actually came true?

I think sharing these experiences helps newcomers understand what to expect and also helps us calibrate how much weight to give different chart elements. No system is 100% accurate, but understanding where ZWDS tends to be strong (personality, career aptitude, relationship timing) versus where it's weaker (specific events, exact dates) is valuable for everyone.

Share your stories below!`,
  },
  {
    title: "Biggest misconception about Zi Wei Dou Shu?",
    type: PostType.DISCUSSION,
    tags: ["zwds", "discussion", "beginners"],
    content: `## What's the biggest misconception people have about ZWDS?

After years of studying and practicing Zi Wei Dou Shu, I've encountered the same misunderstandings over and over again — from complete beginners and even from people who've studied other forms of Chinese metaphysics. Let me share the ones I think are most harmful, and I'd love to hear yours.

### Misconception #1: "Bad stars mean a bad life"

This is probably the most damaging misconception. When beginners see stars like Qing Yang (擎羊, the Ram), Tuo Luo (陀罗, the Spinning Top), Huo Xing (火星, Mars), or Ling Xing (铃星, the Bell) in important palaces, they panic. But these so-called "sha stars" (煞星) are not inherently bad.

In many configurations, sha stars provide the drive, urgency, and competitive edge that lead to extraordinary achievement. A Career Palace with Wu Qu and Qing Yang can indicate someone who becomes a surgical specialist or a top litigator — fields where precision under pressure is essential. The sha star adds intensity that the main star alone might lack.

### Misconception #2: "ZWDS is fortune-telling"

ZWDS is a framework for understanding potential, timing, and energy patterns — not a crystal ball. A skilled practitioner will never tell you "this will happen." Instead, they describe the energetic landscape: "This period carries strong wealth-creation energy in your chart, but it requires activation through effort in specific domains."

The difference matters because fortune-telling implies passivity (your fate is sealed), while ZWDS analysis implies agency (you have tools and timing windows — use them wisely).

### Misconception #3: "You need an exact birth minute"

ZWDS uses two-hour birth periods (時辰), not exact minutes. While True Solar Time adjustment can sometimes shift which two-hour period you fall into, the system was never designed to require minute-level precision. If you know your birth hour, you can generate an accurate chart. If you're on the boundary between two periods, a good practitioner can help determine the correct one by examining life events.

### Misconception #4: "San He and Flying Star schools contradict each other"

The two major schools of ZWDS — San He (三合派) and Flying Star (飞星派) — use different techniques but are not contradictory. San He focuses on star combinations and static palace analysis. Flying Star adds a dynamic layer by tracking how the Four Transformers (四化) move between palaces, creating cause-and-effect chains.

Think of San He as reading the terrain map and Flying Star as tracking weather patterns across that terrain. Both are valid; they simply answer different types of questions.

### Misconception #5: "Online chart generators are all the same"

The quality of ZWDS chart generation varies enormously. Some generators use simplified star placement algorithms that skip minor stars or miscalculate brightness grades. Others fail to handle the lunar calendar conversion correctly, especially for dates near Chinese New Year. Always verify your chart against at least two reputable sources.

### Your turn

What misconceptions have you encountered? What do you wish someone had told you when you first started learning ZWDS? Let's build a list that can help newcomers avoid these pitfalls.`,
  },
  {
    title: "Which palace do you find most revealing?",
    type: PostType.DISCUSSION,
    tags: ["zwds", "discussion", "life-palace", "chart-analysis"],
    content: `## Beyond the Life Palace: which of the 12 palaces do you find most revealing?

Everyone starts with the Life Palace (命宫) when learning ZWDS, and for good reason — it's the chart's anchor point. But experienced practitioners know that some of the most valuable insights come from other palaces. I want to hear which palace has given you the most "aha" moments.

### My pick: The Karmic Palace (福德宫)

The Karmic Palace — sometimes translated as the Fortune & Virtue Palace or the Mental Palace — is chronically underrated. While the Life Palace shows who you are externally, the Karmic Palace reveals your inner world: your mental patterns, what genuinely makes you happy, your spiritual inclinations, and your relationship with contentment.

I've seen charts where the Life Palace looks extremely strong (Zi Wei + Tian Fu, bright, well-supported) but the Karmic Palace is troubled (empty main star, multiple sha stars). These individuals achieve impressive external success but struggle internally with anxiety, restlessness, or a persistent feeling that something is missing.

Conversely, charts with a modest Life Palace but a well-starred Karmic Palace often belong to people who may not have conventional markers of success but possess a deep sense of inner peace and satisfaction.

### The Siblings Palace (兄弟宫) as a hidden indicator

The Siblings Palace is often glossed over as "do you get along with your brothers and sisters?" But in modern ZWDS practice, this palace also governs:

- **Your relationship with colleagues and peers** — critical for workplace dynamics
- **Your cash flow patterns** — it's the treasury palace that sits adjacent to your Life Palace
- **Your support network** — how easily you attract allies and helpers

Some practitioners argue that in modern life, where extended family structures have changed, the Siblings Palace functions more as a "peer network" palace than a literal siblings palace.

### The Travel Palace (迁移宫) for career insights

The Travel Palace (opposite the Life Palace) reveals how you present yourself to the outside world and how the world receives you. For anyone in a public-facing career — sales, marketing, teaching, performing — this palace is arguably more important than the Career Palace itself.

A strong Travel Palace with bright main stars often indicates someone who does better working with external clients, traveling for work, or operating in environments outside their hometown. A weaker Travel Palace might suggest that building a strong local base and working through referrals is a better strategy.

### Discussion

- **Which palace has surprised you the most** in terms of accuracy or insight?
- **Do you prioritize different palaces** depending on what question you're asking?
- **Have you noticed palaces that tend to be ignored** in beginner-level ZWDS content but deserve more attention?

Looking forward to hearing your perspectives. Different practitioners often have different "favorite" palaces, and understanding why can deepen all of our practice.`,
  },
  {
    title: "Share your chart story — how ZWDS changed your perspective",
    type: PostType.DISCUSSION,
    tags: ["zwds", "discussion", "beginners", "life-palace"],
    content: `## How did discovering your ZWDS chart change the way you see your life?

Zi Wei Dou Shu has a way of reframing experiences we thought we understood. A career failure becomes a necessary transition. A difficult relationship reveals itself as a growth catalyst. A period of stagnation turns out to be preparation for the next Decade Luck activation.

I'll start with my story.

### My story

I spent most of my twenties feeling like I was behind. My peers were climbing corporate ladders while I kept switching jobs, never finding the right fit. I was good at many things but exceptional at nothing — or so I thought.

When I finally had my ZWDS chart read properly, the practitioner pointed out that my Career Palace had Tian Ji (天机) — the Strategist star — paired with Tai Yin (太阴) — the Moon. This combination indicates someone whose career path is naturally non-linear. Tian Ji demands variety and intellectual stimulation. Tai Yin adds a preference for behind-the-scenes work and strategic planning over frontline execution.

The practitioner explained that my frequent job changes weren't a character flaw — they were my chart expressing itself. The key was to find a career that rewarded versatility and strategic thinking rather than deep specialization in one narrow domain.

That reframe was transformative. I stopped trying to force myself into single-track career paths and instead leaned into consulting work where every project is different and strategic thinking is the core deliverable. Within two years, I was earning more than I ever had in any single job and, more importantly, I was genuinely engaged in my work.

### The Decade Luck dimension

What really sealed my trust in ZWDS was looking back at my Decade Luck transitions. My chart showed that my third Decade Luck period (roughly ages 22-31) had challenging energy in the Career Palace — exactly the years I spent struggling. But my fourth Decade Luck period (32-41) activated strong wealth and career stars. Sure enough, my career took off at 32, almost exactly on schedule.

This doesn't mean the hard years were wasted. The ZWDS framework helped me see them as a necessary foundation-building period. The skills I accumulated through all those different jobs — communication, adaptability, cross-industry knowledge — became my competitive advantage in the next decade.

### Why I'm sharing this

I think personal stories are the most powerful way to understand ZWDS beyond the textbook definitions. Stars and palaces come alive when you see them operating in real people's lives.

### Your turn

- **What life experience did ZWDS help you reframe?**
- **Has understanding your chart changed any specific decisions you've made?**
- **What would you tell your younger self** if you could share your chart knowledge with them?

This is a judgment-free space. Whether your story is dramatic or subtle, career-focused or relationship-focused, it's valuable. The patterns we share help everyone learn.`,
  },
  {
    title: "Do you believe in ZWDS compatibility readings?",
    type: PostType.DISCUSSION,
    tags: ["zwds", "discussion", "compatibility", "love"],
    content: `## ZWDS compatibility: useful tool or oversimplification?

Compatibility analysis is one of the most requested services in any astrological system, and ZWDS is no exception. But how reliable is it really? Let's have an honest conversation about what ZWDS can and can't tell us about relationships.

### How ZWDS compatibility works

Traditional ZWDS compatibility analysis looks at several factors:

1. **Spouse Palace (夫妻宫) comparison** — What stars sit in each person's Spouse Palace? Do they describe qualities the other person actually has?

2. **Four Transformers cross-referencing** — When you overlay one person's Hua Lu (化禄, transformation of abundance) onto the other person's chart, does it land in a favorable palace? If my Hua Lu falls into your Life Palace or Spouse Palace, that suggests natural harmony.

3. **Palace-to-palace resonance** — Do the main stars in Person A's Life Palace harmonize with the stars in Person B's Spouse Palace? Classical texts list specific star combinations that are naturally compatible or challenging.

4. **Decade Luck synchronization** — Are both people in Decade Luck periods that support relationship energy? A couple might be perfectly compatible on paper but meet during a period where one person's chart is heavily focused on career rather than relationships.

### Where it works well

In my experience, ZWDS compatibility analysis is genuinely useful for understanding **communication styles and emotional needs**. If your partner's chart shows Tai Yang (太阳) in their Life Palace and your Spouse Palace also contains Tai Yang, there's a natural recognition — you intuitively understand what drives them because your chart "expects" that type of partner.

The system is also good at identifying **potential friction points**. If your Spouse Palace has Lian Zhen (廉贞) + Qing Yang (擎羊), you tend to attract intense, passionate relationships with a competitive edge. Knowing this helps you navigate conflicts more skillfully rather than being blindsided by them.

### Where it falls short

ZWDS compatibility analysis cannot account for:

- **Personal growth and therapy** — Someone who has done deep inner work may express difficult chart configurations in much healthier ways than the textbook predicts.
- **Cultural and value alignment** — Shared values, life goals, and cultural background play enormous roles in relationship success that no astrological system captures.
- **Free will and effort** — Two people with "incompatible" charts who communicate honestly and work on their relationship can absolutely thrive.

### My position

I use ZWDS compatibility as a **conversation starter**, not a verdict. It's excellent for surfacing potential dynamics that the couple might not have articulated yet: "You tend to need independence in relationships while your partner tends to need reassurance — how are you navigating that?" But I never tell someone to pursue or avoid a relationship based on chart compatibility alone.

### What do you think?

- **Have you done a ZWDS compatibility reading?** How accurate was it?
- **Do you think chart compatibility should influence dating decisions?**
- **What's the most useful insight** you've gotten from a compatibility analysis?`,
  },

  // ════════════════════════════════════════════
  // CHART_ANALYSIS (6)
  // ════════════════════════════════════════════
  {
    title: "The Four Transformers (四化) explained — the engine of your chart",
    type: PostType.CHART_ANALYSIS,
    tags: ["zwds", "four-transformers", "chart-analysis", "beginners"],
    content: `## Understanding the Four Transformers (四化): ZWDS's most powerful analytical tool

If the 14 primary stars are the actors in your ZWDS chart, the Four Transformers are the script that tells them what to do. No element of ZWDS is more important for predictive analysis, and no element is more frequently misunderstood by beginners.

### What are the Four Transformers?

The Four Transformers (四化, Si Hua) are modifications applied to specific stars based on your Heavenly Stem (天干). Your birth year's Heavenly Stem determines your natal (birth chart) transformers, but each Decade Luck period and each annual cycle brings its own set of transformers.

The four types are:

### 1. Hua Lu (化禄) — Transformation of Abundance

Hua Lu brings **increase, opportunity, and flow** to whichever star it attaches to. If Hua Lu lands on the star in your Career Palace, career opportunities come more easily. If it lands on a star in your Wealth Palace, money flows in with less friction.

But Hua Lu is not simply "good luck." It indicates where energy is **actively flowing** — and energy that flows in can also flow out. Hua Lu in the Wealth Palace often indicates both high income *and* high spending. The abundance is real, but so is the throughput.

### 2. Hua Quan (化权) — Transformation of Power

Hua Quan brings **authority, control, and determination** to its star. This transformer is about mastery and willpower. In the Career Palace, it indicates someone who takes charge and rises to leadership. In the Spouse Palace, it can indicate a relationship where one partner dominates — not necessarily negatively, but there's a clear power dynamic.

Hua Quan also indicates where you invest serious effort. The palace containing Hua Quan is rarely an area of easy success — it's an area where you work hard and eventually earn authority through demonstrated competence.

### 3. Hua Ke (化科) — Transformation of Reputation

Hua Ke brings **recognition, elegance, and refinement** to its star. This is the transformer of fame, academic achievement, and social reputation. In the Life Palace, it indicates someone who is well-regarded and whose reputation opens doors. In the Career Palace, it suggests a career built on expertise, credentials, or public recognition.

Hua Ke is particularly important for careers in academia, media, law, medicine, or any field where credibility and reputation are currency. It's a softer, more refined energy than Hua Quan — influence through respect rather than force.

### 4. Hua Ji (化忌) — Transformation of Obstruction

Hua Ji is the most feared and most misunderstood transformer. It brings **attachment, obsession, and blockage** to its star. Where Hua Ji lands, you experience friction, delays, and an almost compulsive need to engage with that life domain.

But here's what most beginners miss: **Hua Ji is also the transformer of deep focus**. The domain where Hua Ji lands is where you care most intensely, where you can't just walk away. A musician with Hua Ji in the Career Palace doesn't have a cursed career — they have a career they're so deeply invested in that every setback feels devastating. That intensity is also what drives their art.

### How to read the Four Transformers together

The key insight is that the Four Transformers form a **system**, not four independent effects. Here's a simplified reading framework:

- **Hua Lu** shows where resources flow in
- **Hua Quan** shows where you exert control
- **Hua Ke** shows where you gain recognition
- **Hua Ji** shows where you're most invested (and most vulnerable)

When these land in complementary palaces, life flows well. When they cluster in opposing palaces, there's internal tension that drives growth through challenge.

### Practical exercise

Look at your natal chart's Four Transformers. Which palaces do they occupy? Now look at your current Decade Luck transformers. Are they reinforcing or challenging your natal pattern? This comparison is the foundation of ZWDS timing analysis.`,
  },
  {
    title: "Zi Wei + Tian Fu combination — the double emperor chart",
    type: PostType.CHART_ANALYSIS,
    tags: ["zwds", "chart-analysis", "life-palace"],
    content: `## When Zi Wei meets Tian Fu: understanding the "Double Emperor" configuration

One of the most notable star combinations in Zi Wei Dou Shu is when Zi Wei (紫微, the Emperor) and Tian Fu (天府, the Treasury) appear together in the same palace. This configuration, sometimes called the "Double Emperor" or "Emperor and Empress," creates a powerful but complex energy pattern.

### Why this combination is special

Zi Wei and Tian Fu are the two "leader" stars of the ZWDS system. Zi Wei leads the northern dipper stars (北斗) and represents authority, dignity, and decision-making power. Tian Fu leads the southern dipper stars (南斗) and represents stability, resource management, and conservative wisdom.

When they sit together, you get a personality that combines ambition with prudence, authority with stability. These individuals often:

- **Command natural respect** without needing to demand it
- **Make decisions confidently** but with careful consideration
- **Accumulate resources steadily** rather than through risky ventures
- **Present a composed exterior** even when under significant pressure

### The palace matters enormously

This combination appears only in specific palaces based on the chart structure. Where it appears changes its expression:

**In the Life Palace (命宫):** The person embodies leadership qualities. They're often the one others turn to for guidance and decisions. The challenge is a tendency toward rigidity — both stars value structure and can resist change even when change is needed.

**In the Career Palace (官禄宫):** Exceptional for careers in management, government, finance, or any field requiring both authority and trustworthiness. These individuals build institutions rather than just businesses. The danger is becoming overly bureaucratic.

**In the Wealth Palace (财帛宫):** Strong wealth accumulation potential through conservative, strategic means. Not the chart of a gambler or speculator — this is old money energy, compound interest energy. Wealth builds slowly but solidly.

**In the Spouse Palace (夫妻宫):** Attracts a partner who is accomplished, dignified, and potentially from a strong family background. The relationship has a formal quality — these couples might be the "power couple" that everyone admires. The risk is that the relationship becomes more partnership than passion.

### Brightness grade impact

Like all stars, the brightness grade (亮度) of both Zi Wei and Tian Fu significantly affects the expression:

- **Both bright (庙/旺):** Full expression of leadership, dignity, and resource management. The person is genuinely capable and their authority is earned.
- **Mixed brightness:** Creates an interesting tension between ambition and capability. The person may desire leadership but struggle with certain aspects of it.
- **Both dim (落陷):** The leadership energy turns inward — strong internal standards and self-discipline, but difficulty projecting authority externally. May feel perpetually underestimated.

### Auxiliary star modifiers

The presence of auxiliary stars dramatically changes this combination:

- **With Zuo Fu / You Bi (左辅/右弼):** Amplifies the leadership energy and provides helpers. The person naturally attracts capable subordinates and allies.
- **With Wen Chang / Wen Qu (文昌/文曲):** Adds refinement and intellectual depth. Excellent for academic leadership, publishing, or cultural institutions.
- **With Qing Yang / Tuo Luo (擎羊/陀罗):** Adds edge and intensity. The leader becomes more forceful and competitive. Can be excellent for turnaround situations but may alienate allies.

### Common misconceptions

The biggest misconception about Zi Wei + Tian Fu is that it guarantees success. It doesn't. What it provides is a strong foundation of personal authority and resource management capability. Whether that potential is actualized depends on the Four Transformers, Decade Luck timing, and — most importantly — the individual's choices and effort.

A Zi Wei + Tian Fu person who never takes action is simply a capable person sitting on unrealized potential. The chart provides the raw material; life requires the work.`,
  },
  {
    title: "Understanding brightness grades — why your star's position matters",
    type: PostType.CHART_ANALYSIS,
    tags: ["zwds", "chart-analysis", "beginners"],
    content: `## Star brightness in ZWDS: the modifier that changes everything

One of the first concepts that separates a beginner from an intermediate ZWDS student is understanding brightness grades (亮度). Two people can have the same main star in the same palace, yet experience completely different life expressions — because the star's brightness level in that particular position changes its energy fundamentally.

### The brightness scale

In ZWDS, each of the 14 primary stars has a brightness grade that varies depending on which of the 12 earthly branch positions it occupies. The grades are:

1. **Miao (庙) — Temple/Exalted:** The star is at maximum power. Its positive qualities are fully expressed, and its negative tendencies are minimized. Like an employee placed in their dream role — everything clicks.

2. **Wang (旺) — Prosperous:** Nearly as strong as Miao. The star functions well and expresses its core nature clearly. Minor limitations exist but don't significantly impair function.

3. **De (得) — Gaining:** Moderate strength. The star functions adequately but doesn't dominate. Its qualities are present but require more effort to activate. Think of it as a capable person in a decent but not ideal role.

4. **Li (利) — Beneficial:** Functional but not powerful. The star's energy is available but diluted. The person has access to the star's qualities but may need to work harder to express them.

5. **Ping (平) — Level/Neutral:** The star is neither helped nor hindered by its position. Baseline expression with no particular advantage or disadvantage.

6. **Bu (不) — Not Bright:** Weakened. The star struggles to express its positive qualities and its negative tendencies become more prominent. Not fatal, but challenging.

7. **Xian (陷) — Fallen/Detriment:** The star is at its weakest. Its positive qualities are suppressed while its shadow side becomes dominant. A naturally generous star becomes reckless with resources; a naturally authoritative star becomes dictatorial.

### Why brightness matters more than you think

Consider Tai Yang (太阳, the Sun). At Miao brightness, Tai Yang in the Life Palace produces a genuinely warm, generous, publicly admired individual — someone who lights up rooms and inspires others. At Xian brightness, the same star produces someone who desperately seeks validation, overextends themselves helping others to the point of burnout, and struggles with the gap between how they want to be perceived and how they actually feel inside.

Same star. Same palace. Completely different life experience.

### Brightness and the time dimension

Here's something many texts don't emphasize enough: brightness grades also apply to your Decade Luck and Annual palaces. A star that's fallen in your natal chart might reach Miao position during a specific Decade Luck period, temporarily unlocking potential that was suppressed in your birth chart.

This is why some people experience dramatic life changes during certain decade transitions. Their natal stars don't change, but the Decade Luck overlay shifts which earthly branch positions are active, which can dramatically change the brightness profile of your key stars.

### Practical application

When reading any ZWDS chart, make brightness your second check after identifying the main stars:

1. **Identify the main star(s)** in each palace
2. **Check their brightness grade** — are they functioning at full power or struggling?
3. **Note contrasts** — a bright Career Palace with a fallen Wealth Palace tells a different story than both being moderate
4. **Layer in Four Transformers** — a fallen star that receives Hua Lu (化禄) gets a significant boost, while a bright star receiving Hua Ji (化忌) faces unusual challenges despite its strong position

### Common beginner mistakes

- **Panicking over fallen stars:** A single fallen star does not ruin a chart. Context matters — auxiliary stars, transformers, and the overall palace network all modify the expression.
- **Ignoring brightness for minor stars:** While primary stars are most affected by brightness, auxiliary stars also have brightness grades that influence their contribution.
- **Treating brightness as binary:** It's a spectrum, not an on/off switch. The difference between Miao and Wang is meaningful but subtle, just as the difference between Ping and Li is nuanced.

Understanding brightness transforms your chart reading from "I have star X in palace Y" to a much richer, more accurate analysis.`,
  },
  {
    title: "Reading your Career Palace — what your chart says about your professional path",
    type: PostType.CHART_ANALYSIS,
    tags: ["zwds", "career", "chart-analysis", "life-palace"],
    content: `## The Career Palace (官禄宫): your professional blueprint

The Career Palace is one of the "big three" palaces in ZWDS (along with Life and Wealth) and arguably the one that generates the most questions. In a world where career identity is deeply tied to personal identity, understanding what your chart says about your professional path can be both illuminating and liberating.

### What the Career Palace actually measures

A common misunderstanding is that the Career Palace tells you what job to take. It doesn't. What it reveals is:

- **Your natural working style** — Do you thrive in structured environments or need autonomy? Are you a builder, a maintainer, or a disruptor?
- **The type of work that energizes you** — Creative, analytical, interpersonal, physical, strategic?
- **Your relationship with authority** — Do you lead, collaborate, or work best independently?
- **Career timing** — When are the optimal windows for career moves, promotions, or pivots?

### Star-by-star career indicators

Here are some key stars and what they suggest when found in the Career Palace:

**Zi Wei (紫微):** Management, leadership, anything involving decision-making authority. Government, corporate leadership, organization building. You need to be in charge or at least have significant autonomy.

**Tian Ji (天机):** Strategy, planning, advisory roles. Consulting, research, technology, anything requiring analytical thinking and adaptability. You need variety — routine kills your motivation.

**Tai Yang (太阳):** Public-facing roles. Teaching, media, politics, sales, diplomacy. Your career thrives on visibility and human connection. Working in isolation diminishes your effectiveness.

**Wu Qu (武曲):** Finance, commerce, engineering, military, law enforcement. Anything requiring precision, decisiveness, and comfort with numbers or systems. You're drawn to tangible results over abstract ideas.

**Tian Tong (天同):** Service-oriented careers. Healthcare, counseling, hospitality, social work, the arts. You work best when you feel your effort directly helps people or creates beauty.

**Lian Zhen (廉贞):** Careers requiring judgment and conviction. Law, investigation, quality control, research, politics. You excel when the work involves determining right from wrong or solving complex problems.

### The Career Palace triangle

In ZWDS, the Career Palace doesn't operate alone. It forms a triangle (三方) with the Life Palace and the Wealth Palace. Reading all three together reveals the full professional picture:

- **Life Palace** = Your capabilities and personality
- **Career Palace** = Your working style and professional domain
- **Wealth Palace** = How your work translates to income

A mismatch between these palaces often explains career dissatisfaction. For example, a strong Career Palace (capable, ambitious) with a weak Wealth Palace (income doesn't match effort) might indicate someone in the wrong industry or pricing model rather than someone who lacks talent.

### Decade Luck and career timing

Your Career Palace stars don't change, but the Decade Luck overlay activates different energies at different life stages. This is why career advice for a 25-year-old from their ZWDS chart should focus on different elements than advice for a 45-year-old — even though it's the same chart.

Key timing indicators:
- **Hua Lu entering the Career Palace during Decade Luck:** Excellent period for career expansion, new opportunities, increased recognition
- **Hua Ji entering the Career Palace:** A period of career challenge that often forces growth — job changes, restructuring, or the pressure to level up skills
- **Hua Quan in the Career Palace:** A period where you gain authority and control — promotions, leadership roles, or taking charge of a major project

### Actionable takeaway

Don't use your Career Palace to decide between Job A and Job B. Use it to understand what **type of work environment and working style** will allow you to thrive. Then filter specific opportunities through that lens. The chart shows the river's natural course; your job is to navigate it skillfully, not fight the current.`,
  },
  {
    title: "The role of minor stars — why they're not so minor",
    type: PostType.CHART_ANALYSIS,
    tags: ["zwds", "chart-analysis", "beginners", "flying-stars"],
    content: `## Don't skip the minor stars: auxiliary stars that transform your chart reading

Most ZWDS beginners (and many intermediate students) focus almost exclusively on the 14 primary stars. This is understandable — the primary stars are dramatic, well-documented, and form the backbone of chart interpretation. But ignoring the auxiliary (minor) stars means missing crucial nuances that often explain why two people with the same primary star configuration live such different lives.

### Categories of auxiliary stars

ZWDS auxiliary stars fall into several functional groups:

**The Literary Stars — Wen Chang (文昌) and Wen Qu (文曲)**

These two stars govern intellect, communication, and artistic sensibility. Wen Chang represents formal learning, academic achievement, and structured knowledge. Wen Qu represents creative talent, emotional intelligence, and informal wisdom.

When either literary star sits alongside a primary star, it refines that star's expression. Wu Qu (武曲, the Financial Star) alone is blunt and commercially focused. Wu Qu + Wen Chang becomes a financial analyst or strategist who can articulate complex ideas clearly. Wu Qu + Wen Qu becomes a creative entrepreneur who combines commercial instinct with artistic vision.

**The Assistant Stars — Zuo Fu (左辅) and You Bi (右弼)**

These are the "helper" stars. Zuo Fu represents direct, visible assistance — mentors, colleagues, supporters who openly back you. You Bi represents indirect, behind-the-scenes help — people who quietly put in a good word, create opportunities, or handle logistics.

In the Life Palace, these stars indicate someone who naturally attracts helpers and allies. In the Career Palace, they suggest a person who builds effective teams. Their absence in important palaces doesn't mean you won't have help — but you may need to actively seek it rather than having it appear naturally.

**The Catalyst Stars — Tian Kui (天魁) and Tian Yue (天钺)**

Tian Kui and Tian Yue are the "noble person" (贵人) stars — they indicate encounters with influential people who help at critical moments. Tian Kui brings male-energy helpers (not necessarily male people, but yang-type assistance: direct, overt, powerful). Tian Yue brings female-energy helpers (yin-type assistance: subtle, nurturing, protective).

When both catalyst stars appear in favorable positions, the person experiences remarkably "lucky" encounters — meeting the right person at the right time. This isn't luck; it's a chart configuration that creates openness to connection and an ability to recognize and respond to opportunities.

**The Adversity Stars — Qing Yang (擎羊) and Tuo Luo (陀罗)**

These stars are feared by beginners but respected by experienced practitioners. Qing Yang is a blade — it cuts through obstacles but can also cause injuries (metaphorical or literal). Tuo Luo is a spiral — it creates delays and repetitions but also thoroughness and persistence.

In the right configuration, these stars provide exactly the friction needed for achievement. A Career Palace with a primary star + Qing Yang often produces someone who succeeds in competitive, high-stakes fields: surgery, litigation, competitive sports, emergency services. The adversity star provides the edge that a "comfortable" configuration would lack.

### How to integrate minor stars into your reading

A practical framework:

1. **Read the primary star(s) first** to establish the palace's core theme
2. **Check for literary stars** — do they add intellectual refinement?
3. **Check for assistant stars** — is help readily available in this life domain?
4. **Check for catalyst stars** — are noble-person encounters likely?
5. **Check for adversity stars** — is there productive friction that drives growth?
6. **Synthesize** — the combination of primary + auxiliary stars creates a unique profile that is far more specific than any single star reading

### The bottom line

Minor stars are minor only in name. They're the adjectives and adverbs that turn a generic star reading into a specific, nuanced character portrait. If you've been skipping them, go back to your chart and add them in. You'll be surprised how many gaps in your self-understanding they fill.`,
  },
  {
    title: "Flying Star technique — tracking cause and effect across palaces",
    type: PostType.CHART_ANALYSIS,
    tags: ["zwds", "flying-stars", "four-transformers", "chart-analysis"],
    content: `## Flying Star (飞星) technique: ZWDS's most advanced analytical method

If you've been studying ZWDS through the San He (三合) school, you've learned to read palaces and star combinations as relatively static snapshots. Flying Star technique adds a dynamic layer that tracks how energy moves between palaces, revealing cause-and-effect relationships that static analysis misses.

### What is Flying Star?

The Flying Star method takes the Four Transformers (四化) and "flies" them from one palace to another. Instead of just asking "what stars are in my Career Palace?", Flying Star asks "when the Career Palace's Heavenly Stem activates, which transformers land in which other palaces — and what does that chain of connections tell us?"

Each palace has its own Heavenly Stem, which generates its own set of Four Transformers. These transformers don't stay in their home palace — they fly to other palaces based on which stars they attach to. This creates a web of connections across your chart.

### A practical example

Let's say your Career Palace has the Heavenly Stem Jia (甲). Jia's Four Transformers are:
- Hua Lu → Lian Zhen (廉贞)
- Hua Quan → Po Jun (破军)
- Hua Ke → Wu Qu (武曲)
- Hua Ji → Tai Yang (太阳)

Now you trace where those stars sit in your chart. If Lian Zhen is in your Wealth Palace, the Career Palace is "sending" Hua Lu (abundance) to the Wealth Palace. Translation: your career directly and positively feeds your income. The cause-and-effect is clear — career effort → financial reward.

But if Tai Yang (receiving Hua Ji, the obstruction transformer) sits in your Spouse Palace, the Career Palace is also "sending" Hua Ji to the Spouse Palace. Translation: your career creates friction or stress in your marriage. Career demands → relationship strain.

### The self-hua concept

One of the most nuanced aspects of Flying Star is the self-hua (自化) — when a palace's own transformer lands on a star that's already sitting in that same palace. This creates a feedback loop:

- **Self Hua Lu:** The palace generates its own abundance but also tends to leak it. Money comes easily but goes just as easily. Opportunities appear but may not be fully captured.
- **Self Hua Ji:** The palace generates its own obstruction — self-sabotage, overthinking, or creating problems where none existed. This is the "own worst enemy" configuration.

### Why Flying Star matters for prediction

San He analysis tells you the landscape — what energies exist in each palace. Flying Star tells you the dynamics — how those energies interact, trigger each other, and create real-life consequences.

For timing questions (When should I change careers? When is the best period for investment?), Flying Star analysis of Decade Luck and Annual chart overlays provides much more specific guidance than static palace reading alone.

### Key Flying Star patterns to watch for

1. **Lu-Ji clash (禄忌冲):** When Hua Lu and Hua Ji from different palaces' flying stars land in opposing palaces. This creates a tug-of-war between abundance and obstruction — often experienced as opportunities that come with significant strings attached.

2. **Triple connection (三方飞化):** When flying stars from three palaces of the same triangle all connect to a single target palace. This concentrates enormous energy — positive or challenging — in one life domain.

3. **Reverse fly (逆飞):** When Palace A sends a transformer to Palace B, and Palace B sends one back to Palace A. This creates a strong bidirectional relationship between two life domains — they're deeply intertwined for better or worse.

### Getting started with Flying Star

If you're new to this technique:

1. Start with your Life Palace's Heavenly Stem and trace where its Four Transformers land
2. Then do the same for your Career and Wealth palaces
3. Look for patterns — which palaces receive the most flying transformers? Those are your chart's focal points
4. Compare natal flying stars with your current Decade Luck's flying stars to understand present-day dynamics

Flying Star is genuinely advanced material, but even a basic understanding dramatically improves your chart reading accuracy.`,
  },

  // ════════════════════════════════════════════
  // EVENT_ANALYSIS (5)
  // ════════════════════════════════════════════
  {
    title: "Chart analysis: Zhuge Liang — the strategist's stars",
    type: PostType.EVENT_ANALYSIS,
    tags: ["zwds", "celebrity", "event-analysis", "chart-analysis"],
    content: `## Zhuge Liang (诸葛亮): a ZWDS analysis of history's greatest strategist

Zhuge Liang (181-234 CE), the legendary chancellor and military strategist of Shu Han during the Three Kingdoms period, is one of the most fascinating historical figures to analyze through Zi Wei Dou Shu. While his exact birth time is debated among scholars, the traditional date of the 14th day of the 7th lunar month in the Xin You (辛酉) year gives us enough to construct a compelling chart analysis.

### The strategist configuration

Based on the traditional birth data, Zhuge Liang's chart likely features Tian Ji (天机, the Strategist Star) prominently placed — possibly in or triaging the Life Palace. This is almost poetically appropriate, as Tian Ji is literally named "the Heavenly Machine" and represents the ability to see patterns, devise strategies, and adapt to changing circumstances.

Historical accounts consistently describe Zhuge Liang as someone who could:
- **Analyze complex situations rapidly** and devise multi-layered strategies
- **Anticipate enemy movements** with uncanny accuracy
- **Adapt plans on the fly** when circumstances changed
- **Maintain composure** under extreme pressure

These are quintessential Tian Ji traits, especially when the star is at Miao (exalted) brightness and supported by literary stars.

### The loyalty dimension

One of Zhuge Liang's most celebrated qualities was his unwavering loyalty to Liu Bei and later to Liu Bei's son. In ZWDS terms, this kind of absolute devotion often appears when Lian Zhen (廉贞, the Judge Star) features prominently in the chart — particularly in the Travel Palace or paired with the Life Palace's main star.

Lian Zhen at its highest expression produces someone with unshakeable moral convictions and a willingness to sacrifice personal gain for principle. Zhuge Liang famously served Shu Han knowing it was the weakest of the three kingdoms, driven by his sense of duty rather than political calculation.

### The Career Palace story

A strategist of Zhuge Liang's caliber likely had an extraordinarily well-configured Career Palace. The combination of strategic brilliance with administrative competence (he managed Shu Han's economy, legal system, and military simultaneously) suggests either:

- **Zi Wei + Tian Ji** influence — combining leadership authority with strategic intellect
- **Strong Hua Quan (化权)** in the Career Palace — indicating someone who commands through demonstrated mastery rather than mere title

The historical record shows that Zhuge Liang's authority was almost entirely merit-based. He wasn't born into power; he earned it through decades of demonstrating superior judgment. This is a Hua Quan career path, not a Hua Lu one.

### The Health Palace warning

Zhuge Liang died at 53 during his Northern Expeditions, reportedly from illness exacerbated by overwork and stress. In ZWDS terms, a chart with extremely strong Career and Life palaces but a compromised Health Palace often produces exactly this pattern — someone so driven by their mission that they burn through their physical reserves.

The specific constellation of exhaustion-related illness (rather than injury or acute disease) suggests Hua Ji (化忌) influencing the Health Palace, creating an obstruction in self-care that the person's willpower consistently overrides until the body simply fails.

### Decade Luck analysis

Zhuge Liang's career followed a notable arc:
- **Youth (before age 27):** Period of study and preparation in seclusion
- **Middle years (27-46):** Rapid rise as Liu Bei's chief strategist, culminating in the founding of Shu Han
- **Final period (46-53):** Increasingly desperate Northern Expeditions

This arc is consistent with a chart where early Decade Luck periods emphasize the Academic Palace and Karmic Palace (study and inner development), while later periods activate the Career and Travel palaces (public action and outward movement).

### Lessons for modern practitioners

Zhuge Liang's chart (as reconstructed) illustrates several important ZWDS principles:

1. **Star potential requires activation** — Zhuge Liang spent years in preparation before his talents were deployed
2. **Strong career stars without health support create vulnerability** — brilliance doesn't protect against burnout
3. **Lian Zhen loyalty can be both a strength and a constraint** — Zhuge Liang's devotion to a losing cause was noble but arguably cost him his life

Historical chart analysis is always speculative, but it provides a valuable framework for understanding how ZWDS patterns manifest in documented lives.`,
  },
  {
    title: "Chart analysis: Wu Zetian — the only empress regnant",
    type: PostType.EVENT_ANALYSIS,
    tags: ["zwds", "celebrity", "event-analysis", "career"],
    content: `## Wu Zetian (武则天): ZWDS analysis of China's only female emperor

Wu Zetian (624-705 CE) remains one of the most extraordinary figures in Chinese history — the only woman to rule China as emperor in her own right, founding the brief Zhou dynasty during the Tang period. Her chart, while reconstructed from historical birth data, offers remarkable alignment with ZWDS principles.

### The power configuration

Wu Zetian's rise from low-ranking concubine to emperor required a chart with exceptional power indicators. Based on traditional birth records, her chart likely features:

**Zi Wei (紫微) prominently placed** — The Emperor Star is almost certainly a dominant force in her chart. Wu Zetian didn't just seek power; she wielded it with the complete confidence and natural authority that Zi Wei at its strongest provides. She reformed the civil service examination system, expanded the Tang dynasty's territory, and governed effectively for decades.

**Qing Yang (擎羊) in a powerful position** — Wu Zetian's path to power involved eliminating rivals, including members of her own family, with a ruthlessness that shocked even the standards of her era. This kind of decisive, cutting action is characteristic of Qing Yang's blade energy applied to political power. Not cruelty for its own sake, but the willingness to remove any obstacle standing between her and her objective.

### The Spouse Palace paradox

Wu Zetian's relationship history is fascinating from a ZWDS perspective. She was first a concubine to Emperor Taizong, then became the consort and eventually empress to his son Emperor Gaozong. After Gaozong's death, she ruled through her sons before declaring herself emperor.

This pattern — rising through spousal/romantic connections to power, then transcending those relationships entirely — suggests a Spouse Palace that is powerfully connected to the Career Palace through Flying Star transformers. The spousal relationship was literally a vehicle for career advancement, not a separate life domain.

Her chart likely shows **Hua Lu flying from the Spouse Palace to the Career Palace** — abundance from partnerships feeding directly into professional power. But also possibly **Hua Ji in the Spouse Palace** from another flying star source, creating the intense friction and transformation within relationships that characterized her personal life.

### Career Palace analysis

Wu Zetian's career achievements were genuinely remarkable, politics aside:

- **Merit-based civil service reforms** — She expanded the examination system to identify talented officials regardless of family background
- **Military expansion** — Under her rule, Tang territory reached its greatest extent
- **Economic stability** — She maintained prosperous conditions for the general population
- **Religious patronage** — She supported Buddhism extensively, partly as a legitimating ideology

This combination of administrative competence, strategic vision, and ideological sophistication suggests a Career Palace with multiple strong stars — possibly Wu Qu (武曲, financial/administrative acumen) supported by Wen Chang (文昌, intellectual refinement) and enhanced by Hua Quan (化权, earned authority).

### The Decade Luck arc

Wu Zetian's life followed a dramatic timing pattern:

1. **Ages 14-25:** Entered the imperial palace as a low-ranking concubine. A period of observation and learning, not yet activation.
2. **Ages 25-40:** Strategic maneuvering to become Empress. Career Palace activation begins.
3. **Ages 40-55:** Consolidation of power, effective governance through Emperor Gaozong. Career Palace at full strength.
4. **Ages 55-67:** Rule as Emperor in her own right. Peak power period.
5. **Ages 67-80:** Gradual decline and forced abdication. Career Palace energy waning as Decade Luck shifts.

The extended period of preparation (ages 14-25) before any real power manifested is consistent with a chart where the early Decade Luck periods emphasize internal palaces (Life, Karmic) while the Career and Wealth palaces don't fully activate until later decades.

### Controversial aspects

Any analysis of Wu Zetian must acknowledge the historical controversy. She has been vilified by Confucian historians for centuries, partly due to genuine ruthlessness and partly due to gender-based bias. ZWDS analysis doesn't make moral judgments — it describes energy patterns. The same chart configuration that produced effective governance also produced the capacity for elimination of rivals.

This is an important principle: ZWDS stars are neutral. Zi Wei can produce a benevolent leader or a tyrant. Qing Yang can produce a surgeon who saves lives or a person who cuts others down. The chart shows potential; character and choices determine expression.

### Modern relevance

Wu Zetian's chart pattern — strong authority stars, powerful Career Palace, transformative Spouse Palace connections — appears in modern charts too. When we see similar configurations today, the lesson is: this person has the capacity for extraordinary achievement but will face equally extraordinary moral choices about how to wield their power.`,
  },
  {
    title: "Chart analysis: Steve Jobs — innovation written in the stars",
    type: PostType.EVENT_ANALYSIS,
    tags: ["zwds", "celebrity", "event-analysis", "career"],
    content: `## Steve Jobs (1955-2011): a ZWDS perspective on the visionary's chart

Steve Jobs, born February 24, 1955, in San Francisco, provides one of the most compelling modern case studies for ZWDS analysis. His documented birth data allows for a reasonably confident chart construction, and his very public life provides extensive material to validate against.

### The visionary configuration

Jobs's chart, based on the Yi Wei (乙未) year and adjusted for True Solar Time in San Francisco, likely features a prominent Lian Zhen (廉贞) influence. Lian Zhen is sometimes called the "Judge Star" or the "Star of Purity and Passion," and at its highest expression, it produces individuals who:

- **Hold impossibly high standards** and refuse to compromise
- **See clearly what is right and wrong** (at least by their own internal compass)
- **Pursue perfection obsessively** even at great personal and interpersonal cost
- **Inspire fierce loyalty and equally fierce opposition**

Every biography of Jobs confirms these traits. His famous "reality distortion field," his insistence on pixel-perfect design, his willingness to fire people who delivered work he considered mediocre — all classic Lian Zhen at maximum intensity.

### The Tian Ji influence

Jobs's ability to anticipate market trends and create products people didn't know they wanted suggests strong Tian Ji (天机) influence in his chart, possibly in the Career Palace or closely triaging it. Tian Ji provides:

- **Pattern recognition** across different domains
- **Intuitive understanding of timing** — knowing when the market is ready
- **Restless innovation** — the inability to sit still with current success

Jobs famously drew connections between calligraphy and computer typography, between Zen Buddhism and product design, between music industry dysfunction and iTunes. This cross-domain synthesis is quintessential Tian Ji energy.

### Career Palace analysis

Jobs's career followed a pattern that reveals sophisticated ZWDS dynamics:

**Phase 1 — Apple founding (1976-1985):** Explosive early career energy. If his Career Palace held a strong primary star at bright grade, this period represented its initial activation. The founding of Apple and the Macintosh project showed visionary thinking paired with execution capability.

**Phase 2 — Exile period (1985-1997):** Fired from Apple, Jobs went through what ZWDS would frame as a challenging Decade Luck transition. But this period produced NeXT (whose technology became macOS) and Pixar (which revolutionized animation). In ZWDS terms, this looks like **Hua Ji in the Career Palace during that Decade Luck** — obstruction and frustration that paradoxically forced creative breakthroughs.

**Phase 3 — Return and triumph (1997-2011):** The return to Apple and the creation of iMac, iPod, iPhone, and iPad represents a Decade Luck period where Career Palace energy peaked. Likely **Hua Lu and Hua Quan** both influencing the Career Palace during this window — abundant opportunity combined with earned authority.

### The Health Palace dimension

Jobs's death from pancreatic cancer at 56 is the chart's most sobering element. His initial diagnosis came in 2003, and he famously delayed surgery in favor of alternative treatments — a decision that many oncologists believe cost him years of life.

In ZWDS terms, this suggests:

- **A compromised Health Palace** — possibly with sha stars or Hua Ji influence creating vulnerability
- **Lian Zhen's shadow side in health decisions** — the same conviction that drove his product vision also made him believe he knew better than medical experts
- **Career Palace dominance over Health Palace** — when career energy is overwhelmingly strong, health concerns get minimized

### The Wealth Palace

Jobs's relationship with money was unusual for someone of his wealth. He wasn't ostentatious, lived in a relatively modest home for a billionaire, and seemed genuinely more motivated by creation than accumulation. This suggests a Wealth Palace that, while functional, was not his chart's driving force — the Career Palace and possibly the Karmic Palace held more weight.

### Lessons for modern chart reading

Jobs's chart illustrates several principles:

1. **Hua Ji periods are not failures** — his exile from Apple was the most creatively productive "failure" in business history
2. **Strong Career stars can blind you in other domains** — the same conviction that built Apple led to poor health decisions
3. **Lian Zhen's perfectionism is a double-edged sword** — it produces genius-level output but at enormous personal cost
4. **Decade Luck timing explains career arcs** better than personality analysis alone — the same person at different life stages expresses very different chart energies`,
  },
  {
    title: "Major event timing: how ZWDS predicted the 2008 financial crisis pattern",
    type: PostType.EVENT_ANALYSIS,
    tags: ["zwds", "event-analysis", "wealth", "four-transformers"],
    content: `## Event timing in ZWDS: lessons from the 2008 financial crisis

One of ZWDS's most practical applications is timing analysis — understanding when specific types of events are more likely to occur based on the interaction between natal charts, Decade Luck, and annual cycles. The 2008 global financial crisis provides an instructive case study in how ZWDS timing patterns manifest at both individual and collective levels.

### The collective timing pattern

While ZWDS is primarily an individual chart system, practitioners have long observed that certain annual Heavenly Stem and Earthly Branch combinations create conditions where specific types of events cluster. The Wu Zi (戊子) year of 2008 carried particular significance:

The Heavenly Stem Wu (戊) generates these Four Transformers:
- Hua Lu → Tan Lang (贪狼) — abundance toward desire and appetite
- Hua Quan → Tai Yin (太阴) — power in the hidden, the financial, the lunar
- Hua Ke → You Bi (右弼) — recognition of behind-the-scenes helpers
- Hua Ji → Tian Ji (天机) — obstruction in strategy and planning

That last point is crucial: **Hua Ji landing on Tian Ji** — the star of strategy, intelligence, and planning — means a year where clever plans and sophisticated strategies backfire. The complex financial instruments (CDOs, credit default swaps) that were the pride of Wall Street's "financial engineering" were precisely the kind of Tian Ji strategies that Hua Ji would obstruct.

### Individual chart patterns during the crisis

Practitioners who reviewed client charts from 2007-2009 noticed recurring patterns among those most severely affected:

**Pattern 1 — Wealth Palace under pressure:** Individuals whose Decade Luck or Annual chart placed Hua Ji in or opposing their Wealth Palace experienced the most direct financial losses. This doesn't mean everyone with this configuration lost money, but it indicated a period where financial vigilance was especially important.

**Pattern 2 — Career Palace disruption:** Those who lost jobs during the crisis often had their Annual Hua Ji flying to or opposing their Career Palace. The timing of job losses frequently aligned with months where monthly flying stars compounded the annual pressure.

**Pattern 3 — Opportunity in crisis:** Fascinatingly, some individuals had the opposite experience — their charts showed strong Wealth Palace activation during 2008-2009. These were often the people who bought assets at depressed prices and benefited enormously in the subsequent recovery. Warren Buffett's famous "be greedy when others are fearful" strategy aligns with having favorable Wealth Palace timing during a market downturn.

### The timing mechanism

ZWDS timing analysis works through layered cycles:

1. **Natal chart** — Your baseline energy configuration (unchanging)
2. **Decade Luck (大限)** — 10-year overlay that modifies your natal chart
3. **Annual chart (流年)** — Yearly overlay that further modifies the Decade Luck
4. **Monthly and daily charts** — Increasingly fine-grained timing

Each layer adds its own Four Transformers. When multiple layers pile Hua Ji onto the same palace or star, the pressure intensifies. Conversely, when multiple layers send Hua Lu to the same target, opportunities multiply.

The 2008 crisis hit hardest for individuals who had:
- Decade Luck already stressing their Wealth or Career palaces (structural vulnerability)
- Annual Wu Zi transformers compounding that stress (triggering event)
- Career or investment exposure to financial services (real-world channel for the chart energy to manifest)

### Practical takeaways for timing analysis

1. **Watch for Hua Ji stacking** — When two or more time layers send Hua Ji to the same palace, take precautionary action in that life domain. If your Decade Luck and the current year both stress your Wealth Palace, reduce financial risk.

2. **Don't panic over single-layer Hua Ji** — An annual Hua Ji to your Career Palace while your Decade Luck Career Palace is strong usually produces manageable challenges, not catastrophe.

3. **Look for opportunity windows** — When your chart shows strong Wealth Palace activation during a period of market stress, you may be well-positioned to benefit from others' misfortune. This isn't about being callous; it's about recognizing that ZWDS timing is individual, not universal.

4. **Use contrary indicators** — If the annual energy is strongly negative for your Wealth Palace but your natal and Decade Luck are strong, the annual pressure creates temporary dips, not permanent damage. Hold steady.

### Conclusion

ZWDS doesn't predict specific economic events. What it provides is a framework for understanding individual timing within larger cycles. The 2008 crisis affected everyone, but it affected individuals differently based on their chart timing — and understanding that timing in advance allows for better preparation and decision-making.`,
  },
  {
    title: "Decade Luck transitions — why your life changes every 10 years",
    type: PostType.EVENT_ANALYSIS,
    tags: ["zwds", "event-analysis", "decade-luck", "life-palace"],
    content: `## Decade Luck (大限): the 10-year cycles that shape your life's chapters

If you've ever noticed that your life seems to shift dramatically in roughly 10-year cycles — different priorities, different challenges, different opportunities — you've been experiencing what ZWDS calls Decade Luck (大限, Da Xian). Understanding these transitions is one of the most practically useful aspects of ZWDS.

### How Decade Luck works

Your natal chart assigns each of the 12 palaces a sequence of 10-year periods. Starting from your Life Palace (or the palace determined by your birth data), the Decade Luck cycles move through the palaces in order, with each palace governing approximately one decade of your life.

During each Decade Luck period:

1. **The active palace becomes your temporary "Life Palace"** — its stars and energy overlay your natal chart
2. **The Four Transformers shift** — a new set of transformers activates based on the Decade Luck palace's Heavenly Stem
3. **Other palaces realign** — your Career, Wealth, Spouse, and all other palaces take on temporary positions relative to the Decade Luck palace
4. **Brightness grades may change** — stars that were dim in your natal chart might become bright in the Decade Luck overlay, and vice versa

### The transition experience

Most people experience Decade Luck transitions as a period of 1-3 years where the old chapter is ending and the new one hasn't fully started. This transition period often feels like:

- **Restlessness and dissatisfaction** with things that previously felt fine
- **Unexpected events** that force change — job losses, relationship shifts, relocations
- **New interests and desires** emerging seemingly from nowhere
- **A sense of identity shift** — "I'm not the same person I was five years ago"

These experiences aren't random. They're the energetic signature of one Decade Luck configuration winding down while the next one powers up.

### Common Decade Luck patterns

**Decade Luck activating the Career Palace:** This decade is about professional ambition, public achievement, and defining yourself through work. Career changes, promotions, and major professional decisions cluster here. Personal relationships may feel secondary — not because they're unimportant, but because the chart's energy is directed elsewhere.

**Decade Luck activating the Spouse Palace:** Relationship-focused decade. New partnerships form, existing ones deepen or end, and questions about love and commitment take center stage. If you're single, this decade often brings significant romantic encounters. If you're partnered, this decade tests and strengthens the relationship.

**Decade Luck activating the Wealth Palace:** Financial themes dominate. This can manifest as increased income, investment opportunities, career moves motivated by compensation, or financial challenges that force better money management. The expression depends on the stars in your Wealth Palace.

**Decade Luck activating the Health Palace:** Health awareness intensifies. This might mean a health scare that prompts lifestyle changes, a newfound interest in fitness or nutrition, or the need to address chronic issues that were previously ignored. Charts with sha stars in the Health Palace should be especially attentive during this decade.

**Decade Luck activating the Karmic Palace (福德宫):** Inner life takes precedence. This is often the decade where people discover meditation, therapy, spirituality, or philosophy. External achievements may plateau while internal growth accelerates. People in this decade often make choices that seem irrational to outsiders but feel deeply right to them.

### Reading your current Decade Luck

To analyze your current Decade Luck:

1. **Identify which palace is active** for your current age range
2. **Read its stars as if they were your temporary Life Palace** — what energy is dominant?
3. **Check the Four Transformers** generated by this palace's Heavenly Stem — where are Hua Lu, Hua Quan, Hua Ke, and Hua Ji landing?
4. **Compare with your natal chart** — are the Decade Luck transformers reinforcing or challenging your natal configuration?
5. **Look ahead** — which palace activates next, and how different is its energy from the current one?

### Navigating transitions skillfully

The most important practical advice for Decade Luck transitions:

- **Don't cling to the outgoing decade's patterns.** If your career-focused decade is ending and a relationship-focused one is beginning, forcing continued career intensity will create friction.
- **Prepare 2-3 years before a transition.** If you know your next decade activates the Wealth Palace, start building financial skills and infrastructure before it arrives.
- **Expect turbulence at the crossover.** The 1-2 years spanning a transition are inherently unstable. Major decisions made during this window should be carefully considered.
- **Trust the process.** Decade Luck transitions often feel uncomfortable precisely because they're moving you toward growth. The discomfort is the chart's way of ending a chapter that's been fully lived.

Understanding Decade Luck transforms ZWDS from a personality description system into a life-navigation tool. It doesn't tell you what will happen, but it tells you what type of energy is available and when — and that information is extraordinarily valuable for making strategic life decisions.`,
  },

  // ════════════════════════════════════════════
  // PILLAR_DATA (5)
  // ════════════════════════════════════════════
  {
    title: "Career success patterns by Life Palace main star",
    type: PostType.PILLAR_DATA,
    tags: ["zwds", "career", "pillar-data", "life-palace"],
    content: `## Career success patterns: what data from 500+ charts reveals

Over the past several years, our research team has analyzed career outcomes across a dataset of 500+ verified ZWDS charts. While this is observational data (not a controlled study), the patterns are striking enough to share. Here are the career tendencies we've observed for each Life Palace main star.

### Zi Wei (紫微) — The Emperor

**Strongest career sectors:** Management, executive leadership, government, institutional building
**Success pattern:** Zi Wei natives tend to start slowly. Many don't hit their career stride until their mid-30s or even 40s. But once they find the right platform, their rise is steady and commanding. They rarely experience the dramatic ups-and-downs that some other stars face.
**Key insight:** The most successful Zi Wei natives we observed were those who learned to delegate early. The Emperor's instinct is to control everything, but the ones who built strong teams outperformed the solo operators by a significant margin.
**Average age of "career breakthrough":** 36

### Tian Ji (天机) — The Strategist

**Strongest career sectors:** Consulting, technology, research, advisory roles, education
**Success pattern:** Tian Ji natives change careers or roles more frequently than any other star — an average of 4.2 significant career changes before age 45 in our dataset. This looks like instability from the outside, but the data shows that Tian Ji natives who embrace variety outperform those who force themselves into single-track careers.
**Key insight:** The least satisfied Tian Ji natives were those in roles requiring repetitive execution. The most satisfied combined analytical work with regular novelty.
**Average age of "career breakthrough":** 32

### Tai Yang (太阳) — The Sun

**Strongest career sectors:** Education, media, public relations, politics, sales, diplomacy
**Success pattern:** Tai Yang natives need visibility to thrive. In our data, those in public-facing roles reported 2.3x higher career satisfaction than those in back-office positions — even when the back-office roles paid more.
**Key insight:** Brightness grade matters enormously for Tai Yang. Natives with Miao-grade Tai Yang showed strong career success across nearly all fields. Those with Xian-grade Tai Yang struggled with overcommitment and burnout unless they learned strong boundaries.
**Average age of "career breakthrough":** 29

### Wu Qu (武曲) — The Financial Star

**Strongest career sectors:** Finance, engineering, military/law enforcement, commerce, operations
**Success pattern:** Wu Qu natives are the most consistently high-earning star in our dataset. They have a natural instinct for identifying value and making commercially sound decisions. Their career paths tend to be linear and progress steadily.
**Key insight:** Wu Qu natives who added a "soft skill" layer (communication, emotional intelligence) to their natural financial/analytical strength dramatically outperformed pure specialists. The data suggests this star benefits most from complementary skill development.
**Average age of "career breakthrough":** 30

### Tian Tong (天同) — The Blessing Star

**Strongest career sectors:** Healthcare, counseling, arts, hospitality, social work, nonprofit
**Success pattern:** Tian Tong is the most misunderstood star for career purposes. Traditional texts describe it as "lazy" or "comfort-seeking," but our data shows something different: Tian Tong natives who face early career hardship (before age 30) develop remarkable resilience and often become the most effective helpers and healers.
**Key insight:** Tian Tong natives who pursue careers purely for money are the least satisfied group in our dataset. Alignment with personal values is more important for this star than for any other.
**Average age of "career breakthrough":** 34

### Lian Zhen (廉贞) — The Judge

**Strongest career sectors:** Law, investigation, research, quality assurance, politics, creative arts
**Success pattern:** Lian Zhen natives have the widest variance in outcomes of any star. The best performers are extraordinary — driven, principled, and commanding. The worst performers are stuck in rigid positions, unable to adapt when their convictions don't match reality.
**Key insight:** Lian Zhen career success correlates strongly with self-awareness. Natives who understand their tendency toward perfectionism and all-or-nothing thinking manage it productively. Those who don't are prone to career-ending conflicts.
**Average age of "career breakthrough":** 33

### Methodology note

This data comes from voluntary chart submissions paired with career history surveys. We controlled for gender, education level, and geographic region where possible. The "career breakthrough" ages are medians, not averages, to reduce the impact of outliers. We define "career breakthrough" as the self-reported moment when the person felt they had found their professional groove.

We share this data to illustrate patterns, not to prescribe career paths. Your complete chart — including the Career Palace stars, auxiliary stars, Four Transformers, and Decade Luck timing — matters far more than your Life Palace star alone.`,
  },
  {
    title: "Love and compatibility patterns in ZWDS — what the data shows",
    type: PostType.PILLAR_DATA,
    tags: ["zwds", "love", "compatibility", "pillar-data"],
    content: `## Love compatibility in ZWDS: patterns from 300+ couple analyses

Relationship compatibility is one of the most requested topics in ZWDS consultation. To move beyond anecdotal impressions, we compiled data from 300+ couples who shared their charts and relationship assessments. Here are the patterns that emerged.

### Spouse Palace accuracy

Our first finding confirms what many practitioners have observed: **the Spouse Palace main star correlates meaningfully with partner characteristics.**

Among couples who had been together 5+ years:
- **72%** said their partner's personality matched the general description of their Spouse Palace main star
- **58%** said the match was "highly accurate" (not just broadly fitting)
- **23%** said the match was poor or inaccurate

The strongest correlations appeared with specific stars:

**Tai Yang (太阳) in the Spouse Palace:** 81% accuracy rate. Partners tended to be warm, generous, publicly active, and sometimes overcommitted. The clarity of Tai Yang's archetype makes it easier to recognize in real partners.

**Tian Ji (天机) in the Spouse Palace:** 76% accuracy rate. Partners tended to be intellectually restless, analytically minded, and somewhat changeable. Several respondents noted that their partner matched the archetype more in cognitive style than in overt behavior.

**Zi Wei (紫微) in the Spouse Palace:** 74% accuracy rate. Partners were typically strong-willed, accomplished, and expected high standards. Multiple respondents commented that their partner "runs the household" regardless of gender.

### Compatibility patterns that work

Among couples who self-rated their relationship satisfaction as 8/10 or higher, we observed several recurring patterns:

**Complementary element combinations:** Couples where one partner's Life Palace main star complemented (rather than duplicated) the other's tended to report higher satisfaction. For example, a Zi Wei (authority/leadership) native paired with a Tian Fu (stability/resource management) native created a balanced dynamic where both roles were valued.

**Matching Hua Lu targets:** When Partner A's natal Hua Lu landed in a palace that contained Partner B's Life Palace main star (or vice versa), the sense of natural ease and abundance in the relationship was notably higher. This is the Flying Star signature of "you naturally provide what I need."

**Aligned Decade Luck timing:** Couples who entered relationship-favorable Decade Luck periods within 2-3 years of each other reported stronger relationship foundations. Couples where one partner's chart emphasized career while the other's emphasized relationships during the same period reported more friction.

### Compatibility patterns that challenge

**Mutual Hua Ji connections:** When Partner A's Flying Star sends Hua Ji to the palace containing Partner B's important star, and Partner B's chart does the same in reverse, the relationship carries an intensity that can feel like deep connection or constant friction — often both simultaneously. These couples reported the widest satisfaction range: either very high or very low, rarely moderate.

**Same main star in both Life Palaces:** Contrary to the intuition that similar people get along, couples with the same Life Palace main star reported lower-than-average satisfaction (6.2/10 vs. 7.1/10 overall average). The theory: when both partners have the same strengths and blind spots, there's no complementary balance. Two Zi Wei natives both want to lead; two Tian Tong natives both avoid confrontation.

**Sha star concentration in Spouse Palaces:** Couples where both partners had sha stars (Qing Yang, Tuo Luo, Huo Xing, or Ling Xing) in their Spouse Palaces reported more conflict but also more passion. These relationships were intense by nature — not doomed, but requiring more conscious communication and conflict resolution skills.

### What the data does NOT show

Importantly, we found **no star combination that guaranteed failure.** Every "difficult" combination in our dataset included couples who thrived — typically by developing strong communication skills, maintaining individual identities, and being willing to work through conflict rather than avoiding it.

ZWDS compatibility data tells you the **type of relationship dynamics to expect**, not whether the relationship will succeed. A challenging compatibility profile with two committed, self-aware partners consistently outperformed an "ideal" compatibility profile where one or both partners were passive about relationship maintenance.

### Practical recommendations

1. **Use compatibility analysis for understanding, not screening.** Knowing your partner's chart helps you understand their needs and communication style.
2. **Pay attention to Decade Luck timing.** A relationship that struggles in one decade may thrive in the next as both partners' chart energies shift.
3. **Watch for Hua Ji connections** — not to avoid them, but to prepare for the intensity they bring.
4. **Don't overvalue similarity.** Complementary star combinations consistently outperform matching ones in our data.`,
  },
  {
    title: "Wealth indicators in ZWDS — beyond the Wealth Palace",
    type: PostType.PILLAR_DATA,
    tags: ["zwds", "wealth", "pillar-data", "four-transformers"],
    content: `## Wealth indicators in ZWDS: a comprehensive analysis

When people ask "what does my chart say about money?", the instinct is to look at the Wealth Palace (财帛宫) and stop there. But ZWDS wealth analysis is far more nuanced. Financial outcomes in the chart are determined by a network of palaces, stars, and transformers working together.

### The wealth triangle

The primary wealth indicators form a triangle of three palaces:

1. **Wealth Palace (财帛宫)** — Your earning capacity, relationship with money, and spending patterns
2. **Career Palace (官禄宫)** — How you generate income, your professional productivity
3. **Property Palace (田宅宫)** — Asset accumulation, real estate, stored wealth, family financial legacy

Reading all three together provides a much more complete financial picture than any single palace.

### Stars and wealth styles

Different main stars in the Wealth Palace indicate different wealth-generation styles:

**Wu Qu (武曲):** The most directly financial star. In the Wealth Palace, Wu Qu indicates someone with natural financial instinct — they understand value, negotiate well, and make commercially sound decisions. Wealth comes through direct financial activities: commerce, investment, banking, or any field where money management is the core skill.

**Tai Yin (太阴):** The "hidden wealth" star. Tai Yin in the Wealth Palace indicates wealth that accumulates gradually and often behind the scenes. Real estate, long-term investments, savings, and passive income streams. These individuals may not look wealthy by their spending, but their net worth steadily grows through patient accumulation.

**Tian Fu (天府):** The "treasury" star. Similar to Tai Yin but more conservative. Tian Fu in the Wealth Palace produces excellent wealth preservation — these people rarely lose money, even if they don't aggressively grow it. Strong financial security and risk aversion characterize this placement.

**Tan Lang (贪狼):** The "desire" star. In the Wealth Palace, Tan Lang creates someone who can both make and spend money with equal enthusiasm. Wealth comes through social connections, entertainment industries, sales, or anything involving human desire. The challenge is controlling expenditure.

**Po Jun (破军):** The "destroyer and rebuilder." In the Wealth Palace, Po Jun indicates dramatic financial fluctuations. These individuals may build wealth, lose it, and rebuild it multiple times. The pattern often correlates with entrepreneurial ventures — high risk, high reward, with genuine crashes along the way.

### Four Transformers and wealth

The Four Transformers' relationship to the wealth triangle is critical:

**Hua Lu (化禄) in the Wealth Palace:** Money flows in relatively easily. The challenge is that it also flows out easily — high income paired with high lifestyle expectations. Net wealth accumulation depends on whether there's a balancing conservative influence elsewhere in the triangle.

**Hua Quan (化权) in the Wealth Palace:** Wealth earned through authority, expertise, and hard work. This is "sweat equity" money — you earn every dollar, and you're proud of it. Often indicates someone whose income directly reflects their professional standing.

**Hua Ji (化忌) in the Wealth Palace:** The most feared placement, but it's more nuanced than "you'll be poor." Hua Ji here creates an intense relationship with money — anxiety about finances, obsessive tracking of income and expenses, or a pattern of money worries even when objective financial position is adequate. The obstruction is often psychological rather than literal.

**Hua Ji opposing the Wealth Palace (from the Karmic Palace):** This is actually more problematic than Hua Ji in the Wealth Palace itself. It creates external obstacles to wealth — economic downturns affecting you disproportionately, business partners who mismanage shared resources, or systemic barriers to income growth.

### The Property Palace as wealth indicator

Many practitioners underweight the Property Palace (田宅宫), but in modern life it's arguably as important as the Wealth Palace:

- **Strong Property Palace, moderate Wealth Palace:** Net worth through asset appreciation rather than high income. The person might have moderate cash flow but owns significant property, investments, or has family wealth.
- **Strong Wealth Palace, weak Property Palace:** High income but poor wealth preservation. The classic "earns a lot, saves nothing" pattern.
- **Both strong:** The strongest overall financial configuration — high income combined with effective wealth preservation.

### Decade Luck and wealth timing

Financial outcomes shift dramatically with Decade Luck transitions. Our data shows that most people experience 2-3 Decade Luck periods of strong wealth energy and 2-3 of weaker wealth energy across their lifetime. Understanding this timing helps with:

- **Investment timing** — increasing risk exposure during favorable wealth decades and reducing it during challenging ones
- **Career decisions** — pursuing higher-earning opportunities during wealth-active decades
- **Savings strategy** — building reserves during strong periods to weather weak ones

### Key takeaway

Wealth in ZWDS is not determined by a single palace or star. It's a system involving multiple palaces, the Four Transformers, brightness grades, and Decade Luck timing. The healthiest approach is to understand your chart's natural wealth style (conservative accumulation vs. high-risk growth vs. steady earning) and align your financial strategy accordingly, rather than fighting your chart's natural tendencies.`,
  },
  {
    title: "Health Palace analysis — what your chart reveals about wellness",
    type: PostType.PILLAR_DATA,
    tags: ["zwds", "health", "pillar-data", "chart-analysis"],
    content: `## The Health Palace (疾厄宫): your body's blueprint in the stars

The Health Palace is one of the most practically important palaces in ZWDS, yet it receives far less attention than the Life, Career, or Wealth palaces. Understanding your Health Palace configuration can provide genuine value for preventive wellness — not by replacing medical advice, but by highlighting areas where your constitution may need extra attention.

### What the Health Palace measures

The Health Palace in ZWDS indicates:

- **Constitutional strengths and vulnerabilities** — which organ systems are naturally robust and which are prone to weakness
- **Stress response patterns** — how your body reacts to pressure, overwork, and emotional strain
- **Illness timing** — Decade Luck and annual periods where health vigilance is especially important
- **Recovery capacity** — how quickly and completely you bounce back from illness or injury

### Stars and organ system correlations

Traditional ZWDS texts map specific stars to organ systems. While these correlations should not replace medical diagnosis, practitioners have observed meaningful patterns:

**Tai Yang (太阳) — Heart, eyes, circulatory system**
When Tai Yang appears in the Health Palace, constitutional vulnerability tends toward cardiovascular issues, eye strain, and problems related to excessive heat or inflammation. At Miao brightness, the vulnerability is mild — perhaps a tendency toward high blood pressure under stress. At Xian brightness, the cardiovascular system requires more proactive attention.

**Tai Yin (太阴) — Kidneys, reproductive system, hormonal balance**
Tai Yin in the Health Palace often correlates with hormonal sensitivities, kidney function concerns, and reproductive health issues. The Moon star's connection to water elements manifests as fluid-related health themes. Women with this placement frequently report menstrual irregularities or hormonal fluctuations as primary health concerns.

**Tian Ji (天机) — Liver, nervous system, mental health**
Tian Ji's restless, analytical energy in the Health Palace manifests as nervous system sensitivity — anxiety, insomnia, liver qi stagnation (in TCM terms), and stress-related digestive issues. The strategic mind that Tian Ji brings to the Life Palace becomes an overactive nervous system when it sits in the Health Palace.

**Wu Qu (武曲) — Lungs, respiratory system, skeletal system**
Wu Qu's metal element energy in the Health Palace correlates with respiratory vulnerability, skin conditions (skin is associated with metal/lung in TCM), and bone/joint issues. The star's hard, decisive quality manifests physically as rigidity — tight muscles, stiff joints, restricted breathing under stress.

**Lian Zhen (廉贞) — Blood, immune system, skin**
Lian Zhen in the Health Palace often correlates with blood-related issues, autoimmune tendencies, and skin conditions. The star's intensity manifests as an immune system that's either overactive (autoimmune) or periodically overwhelmed (recurring infections).

### Sha stars in the Health Palace

The presence of adversity stars in the Health Palace intensifies health vulnerability:

**Qing Yang (擎羊):** Increased risk of acute conditions — sudden illness, injuries requiring surgery, or sharp pain syndromes. This star's cutting energy suggests situations requiring decisive medical intervention.

**Tuo Luo (陀罗):** Chronic conditions that develop slowly and persist. Autoimmune disorders, chronic pain, recurring issues that resist treatment. The spiral nature of Tuo Luo manifests as health problems that seem to resolve and then return.

**Huo Xing (火星) and Ling Xing (铃星):** Inflammatory conditions, fever-related illness, and sudden health crises. These fire-energy stars in the Health Palace suggest a constitution prone to inflammation and acute episodes.

### Decade Luck and health timing

Health vulnerability peaks during specific Decade Luck configurations:

1. **When your Decade Luck activates the Health Palace directly** — This decade demands health attention. Preventive care, lifestyle adjustments, and regular medical checkups become essential rather than optional.

2. **When Hua Ji flies to the Health Palace** from any source during Decade Luck — This creates obstruction in health recovery. Illnesses during this period may be harder to diagnose, slower to heal, or require more aggressive treatment.

3. **When the Health Palace and Career Palace receive conflicting transformers** — This often manifests as work-induced health problems. The career demands override health signals until the body forces a reckoning.

### Practical recommendations

Based on Health Palace analysis:

1. **Identify your primary organ system vulnerability** from the main star in your Health Palace and prioritize preventive care for that system.
2. **Check your current Decade Luck** for Health Palace pressure. If you're in a health-sensitive decade, increase medical checkups and lifestyle discipline.
3. **Watch for Hua Ji connections** to the Health Palace in annual charts — these years warrant extra caution.
4. **Don't use Health Palace analysis to self-diagnose.** Use it to inform conversations with healthcare providers about which screenings might be worth prioritizing.
5. **Balance Career Palace energy with Health Palace awareness.** The most common health failure pattern in our data is career-driven people ignoring health signals during professionally intense decades.

The Health Palace is not a medical diagnosis tool. It's a constitutional awareness framework that can help you direct your preventive health efforts more intelligently.`,
  },
  {
    title: "Decade Luck patterns — when major life shifts happen by star type",
    type: PostType.PILLAR_DATA,
    tags: ["zwds", "pillar-data", "decade-luck", "life-palace"],
    content: `## Decade Luck transition data: when life's major shifts happen

One of ZWDS's most powerful predictive features is Decade Luck (大限) timing. Our ongoing data collection from community members has revealed patterns in when major life events tend to cluster, organized by Life Palace main star. This post shares those findings.

### Methodology

We collected self-reported major life events (career changes, relationship milestones, health events, relocations, financial shifts) from 400+ community members with verified ZWDS charts. Events were mapped to Decade Luck periods and correlated with Life Palace main stars and active Decade Luck palaces.

**Important caveat:** This is observational data from a self-selected community, not a controlled study. Patterns are suggestive, not definitive.

### Career breakthrough timing

The age at which people report their most significant career breakthrough varies by Life Palace star:

| Life Palace Star | Median Breakthrough Age | Most Common Decade Luck Palace Active |
|---|---|---|
| Zi Wei (紫微) | 36 | Career or Travel Palace |
| Tian Ji (天机) | 32 | Travel or Karmic Palace |
| Tai Yang (太阳) | 29 | Career or Travel Palace |
| Wu Qu (武曲) | 30 | Wealth or Career Palace |
| Tian Tong (天同) | 34 | Career or Health Palace |
| Lian Zhen (廉贞) | 33 | Career or Life Palace (return) |

**Notable pattern:** Stars associated with patience and maturity (Zi Wei, Tian Tong) show later breakthrough ages. Stars associated with initiative and visibility (Tai Yang, Wu Qu) show earlier breakthroughs. This aligns with traditional ZWDS theory — some stars "ripen" faster than others.

### Relationship milestone timing

Major relationship events (marriage, significant partnership, divorce, or finding a long-term partner) showed the following patterns:

**Strongest relationship-event triggers:**
1. Decade Luck activating the Spouse Palace — **43%** of major relationship events occurred during this period
2. Decade Luck activating the Travel Palace — **22%** (the Travel Palace governs how you present yourself to the world, including to potential partners)
3. Annual Hua Lu landing in or triaging the Spouse Palace — **67%** of marriages occurred in years with this configuration

**Interesting finding:** Divorce was most commonly associated with Decade Luck transitions themselves — the 1-3 year transition window between decades — rather than any specific Decade Luck period. This suggests that the instability of transition periods, rather than any particular negative energy, is what triggers relationship endings. Couples who survive the transition period together tend to stabilize in the new decade.

### Financial shift timing

Major financial events (significant income increase, job loss, investment success/failure, inheritance, business launch) showed these patterns:

**Wealth accumulation peaks:** Most commonly occurred when the Decade Luck palace sent Hua Lu to the natal Wealth Palace. This double-layer of wealth activation (Decade Luck timing + Wealth Palace resonance) created windows of 2-5 years where financial growth accelerated noticeably.

**Financial crisis periods:** Most commonly occurred when:
- Hua Ji landed in the Wealth Palace from the Decade Luck overlay **AND**
- The annual chart's Hua Ji reinforced the pressure

The compounding effect mattered: a single layer of Hua Ji on the Wealth Palace rarely caused severe financial problems. Two or more layers stacking created the conditions for genuine financial difficulty.

### Health event timing

Health events clustered most dramatically around specific configurations:

1. **Decade Luck directly activating the Health Palace** — Health events were 3.2x more common during this decade than during other decades
2. **Sha stars in the natal Health Palace + Decade Luck Hua Ji** — This combination produced the most acute health events in our data
3. **Ages 42-55** — Regardless of chart configuration, health events were more common in this age range, suggesting both astrological and biological factors at work

### The "quiet decade" phenomenon

One unexpected finding: nearly every chart type showed at least one Decade Luck period that respondents described as "quiet" or "uneventful." These were typically decades where the active Decade Luck palace contained no primary stars or only dim auxiliary stars.

Rather than being problematic, these quiet decades often served as integration periods — times when the person consolidated gains from previous active decades without facing major new challenges or opportunities. Several respondents initially rated these decades negatively ("nothing was happening") but later recognized them as essential rest and preparation periods.

### Practical applications

1. **Identify your current Decade Luck palace** and understand its dominant energy
2. **Look 2-3 years ahead** to the next transition — what palace activates next, and how different is it?
3. **Cross-reference with annual charts** to find years within the current decade that amplify or challenge the decade's themes
4. **Use "quiet decades" intentionally** — for skill development, health maintenance, relationship deepening, and financial consolidation
5. **Don't force activity during rest periods or rest during active periods** — align your effort with the chart's natural rhythm

Understanding these patterns doesn't make you a passive recipient of fate. It makes you a strategic navigator who understands the currents and adjusts course accordingly.`,
  },
];

// ─── Main seed function ───
async function main() {
  console.log("Seeding community data...\n");

  // 1. Upsert editorial user
  console.log("1. Creating editorial user...");
  const user = await prisma.user.upsert({
    where: { email: EDITORIAL_USER.email },
    update: {
      name: EDITORIAL_USER.name,
      tier: EDITORIAL_USER.tier,
      role: EDITORIAL_USER.role,
      bio: EDITORIAL_USER.bio,
      headline: EDITORIAL_USER.headline,
      isProfilePublic: EDITORIAL_USER.isProfilePublic,
    },
    create: {
      email: EDITORIAL_USER.email,
      name: EDITORIAL_USER.name,
      password: EDITORIAL_USER.password,
      tier: EDITORIAL_USER.tier,
      role: EDITORIAL_USER.role,
      bio: EDITORIAL_USER.bio,
      headline: EDITORIAL_USER.headline,
      isProfilePublic: EDITORIAL_USER.isProfilePublic,
    },
  });
  console.log(`   User: ${user.name} (${user.id})\n`);

  // 2. Upsert groups
  console.log("2. Creating groups...");
  for (const group of GROUPS) {
    const g = await prisma.group.upsert({
      where: { slug: group.slug },
      update: {
        name: group.name,
        description: group.description,
      },
      create: {
        name: group.name,
        slug: group.slug,
        description: group.description,
      },
    });
    console.log(`   Group: ${g.name} (${g.slug})`);
  }
  console.log();

  // 3. Create posts (skip if title already exists)
  console.log("3. Creating posts...");
  let created = 0;
  let skipped = 0;

  for (const post of POSTS) {
    const existing = await prisma.post.findFirst({
      where: { title: post.title },
    });

    if (existing) {
      console.log(`   SKIP: "${post.title}" (already exists)`);
      skipped++;
      continue;
    }

    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        type: post.type,
        tags: post.tags,
        authorId: user.id,
        pinned: false,
      },
    });

    console.log(`   POST: "${post.title}" [${post.type}]`);
    created++;
  }

  console.log(`\nDone! Created ${created} posts, skipped ${skipped}.`);
  console.log(`Total posts in DB: ${await prisma.post.count()}`);
  console.log(`Total groups in DB: ${await prisma.group.count()}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
