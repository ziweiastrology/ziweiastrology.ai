const { astro } = require('iztro');

const a = astro.bySolar('1940-11-27', 4, '男', true, 'zh-CN');

console.log('Palace keys:', Object.keys(a.palaces[0]));

function formatStar(star) {
  return star.name;
}

// Output what our transformer would produce
const PALACE_NAME_MAP = {
  "命宫": "self", "兄弟": "siblings", "夫妻": "spouse", "子女": "children",
  "财帛": "wealth", "疾厄": "health", "迁移": "travel", "仆役": "friends",
  "官禄": "career", "田宅": "property", "福德": "fortune", "父母": "parents",
};

const BRANCH_GRID = {
  "寅": [4, 4], "卯": [4, 3], "辰": [4, 2], "巳": [4, 1],
  "午": [3, 1], "未": [2, 1], "申": [1, 1], "酉": [1, 2],
  "戌": [1, 3], "亥": [1, 4], "子": [2, 4], "丑": [3, 4],
};

const BRIGHTNESS_ENERGY = { "庙": 95, "旺": 85, "得": 75, "利": 65, "平": 50, "不": 35, "陷": 20 };
const MUTAGEN_STATE = { "禄": "lu", "权": "quan", "科": "ke", "忌": "ji" };

for (const p of a.palaces) {
  const id = PALACE_NAME_MAP[p.name];
  if (!id) { console.log('SKIP:', p.name); continue; }

  const [gridCol, gridRow] = BRANCH_GRID[p.earthlyBranch] || [1, 1];
  const majors = p.majorStars || [];
  const minors = p.minorStars || [];
  const allStars = [...majors, ...minors];

  const stars = [...majors.map(formatStar), ...minors.map(formatStar)];

  // Check all star entries are strings
  for (const s of stars) {
    if (typeof s !== 'string') {
      console.log('NON-STRING STAR:', id, s, typeof s);
    }
  }

  // Check energy
  let maxE = 0;
  for (const s of majors) {
    const e = s.brightness ? (BRIGHTNESS_ENERGY[s.brightness] || 50) : 50;
    if (e > maxE) maxE = e;
  }
  const energy = majors.length === 0 ? 50 : maxE;

  // Check state
  let state = "neutral";
  for (const s of allStars) {
    if (!s.mutagen) continue;
    const mapped = MUTAGEN_STATE[s.mutagen];
    if (!mapped) continue;
    if (mapped === "ji") { state = "ji"; break; }
    if (state === "neutral" || mapped === "lu") state = mapped;
    else if (state !== "lu" && mapped === "quan") state = mapped;
  }

  console.log(JSON.stringify({ id, gridCol, gridRow, energy, state, stars }));
}
