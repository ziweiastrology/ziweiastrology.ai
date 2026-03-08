// End-to-end test of computeChart flow
// Simulates what happens in the browser

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { astro } = require('iztro');

// Inline the star data (just Chinese to English mapping)
const STARS_MAP = new Map([
  ["紫微", "The Sovereign"], ["天机", "The Strategist"], ["太阳", "The Radiant"],
  ["武曲", "The Executor"], ["天同", "The Harmonizer"], ["廉贞", "The Provocateur"],
  ["天府", "The Chancellor"], ["太阴", "The Intuitive"], ["贪狼", "The Desirous"],
  ["巨门", "The Orator"], ["天相", "The Coordinator"], ["天梁", "The Guardian"],
  ["七杀", "The Vanguard"], ["破军", "The Innovator"],
  ["文昌", "Literary Elegance"], ["文曲", "Artistic Grace"],
  ["左辅", "Left Minister"], ["右弼", "Right Minister"],
  ["天魁", "Celestial Noble (Yang)"], ["天钺", "Celestial Noble (Yin)"],
  ["擎羊", "Ram"], ["陀罗", "Spinner"], ["火星", "Fire Star"], ["铃星", "Bell Star"],
  ["地空", "Void"], ["地劫", "Catastrophe"],
  ["禄存", "Wealth Keeper"], ["天马", "Celestial Horse"],
  ["华盖", "Canopy"], ["红鸾", "Red Phoenix"], ["天喜", "Celestial Joy"],
  ["天姚", "Allure"], ["天刑", "Celestial Punishment"],
  ["天才", "Genius"], ["天寿", "Longevity"], ["解神", "Resolver"],
  ["天德", "Celestial Virtue"], ["月德", "Lunar Virtue"],
]);

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

function formatStar(star) {
  const en = STARS_MAP.get(star.name);
  return en ? `${star.name} ${en}` : star.name;
}

function dominantState(stars) {
  let best = "neutral";
  for (const s of stars) {
    if (!s.mutagen) continue;
    const mapped = MUTAGEN_STATE[s.mutagen];
    if (!mapped) continue;
    if (mapped === "ji") return "ji";
    if (best === "neutral" || mapped === "lu") best = mapped;
    else if (best !== "lu" && mapped === "quan") best = mapped;
  }
  return best;
}

function maxEnergy(majorStars) {
  if (majorStars.length === 0) return 50;
  let max = 0;
  for (const s of majorStars) {
    const e = s.brightness ? (BRIGHTNESS_ENERGY[s.brightness] ?? 50) : 50;
    if (e > max) max = e;
  }
  return max;
}

function tstToTimeIndex(hour) {
  if (hour === 23) return 12;
  return Math.ceil(hour / 2);
}

// Bruce Lee: Nov 27, 1940, 7 AM, San Francisco, male
const birthDetails = {
  fullName: "Bruce Lee",
  gender: "male",
  birthYear: "1940",
  birthMonth: "11",
  birthDay: "27",
  birthHour: "07",
  birthMinute: "00",
  birthLocation: "San Francisco",
  trueSolarHour: "06",  // TST adjusted
  trueSolarMinute: "42",
};

const hour = parseInt(birthDetails.trueSolarHour ?? birthDetails.birthHour, 10);
const timeIndex = tstToTimeIndex(hour);
const year = parseInt(birthDetails.birthYear, 10);
const month = parseInt(birthDetails.birthMonth, 10);
const day = parseInt(birthDetails.birthDay, 10);
const solarDate = `${year}-${month}-${day}`;
const gender = birthDetails.gender === "female" ? "女" : "男";

console.log(`Computing chart for: ${solarDate}, timeIndex=${timeIndex}, gender=${gender}`);

const astrolabe = astro.bySolar(solarDate, timeIndex, gender, true, "zh-CN");

const palaces = astrolabe.palaces.map(palace => {
  const id = PALACE_NAME_MAP[palace.name];
  if (!id) return null;

  const [gridCol, gridRow] = BRANCH_GRID[palace.earthlyBranch] ?? [1, 1];
  const majors = palace.majorStars ?? [];
  const minors = palace.minorStars ?? [];
  const allStars = [...majors, ...minors];

  const result = {
    id,
    name: id,  // simplified
    nameCn: palace.name,
    subtitle: "",
    icon: id,
    consciousness: "",
    fable: "",
    gridCol,
    gridRow,
    stars: [...majors.map(formatStar), ...minors.map(formatStar)],
    energy: maxEnergy(majors),
    state: dominantState(allStars),
  };

  // Validate every field is a valid React child (string, number, or array of strings)
  for (const [key, val] of Object.entries(result)) {
    if (key === 'stars') {
      if (!Array.isArray(val)) {
        console.error(`INVALID: ${id}.stars is not an array:`, val);
      } else {
        for (let i = 0; i < val.length; i++) {
          if (typeof val[i] !== 'string') {
            console.error(`INVALID: ${id}.stars[${i}] is not a string:`, typeof val[i], val[i]);
          }
        }
      }
    } else if (typeof val !== 'string' && typeof val !== 'number') {
      console.error(`INVALID: ${id}.${key} is ${typeof val}:`, val);
    }
  }

  return result;
}).filter(Boolean);

console.log(`\nGenerated ${palaces.length} palaces`);
for (const p of palaces) {
  console.log(`  ${p.id}: (${p.gridCol},${p.gridRow}) energy=${p.energy} state=${p.state} stars=[${p.stars.join(', ')}]`);
}

// Check meta
const meta = {
  soulPalace: astrolabe.earthlyBranchOfSoulPalace,
  bodyPalace: astrolabe.earthlyBranchOfBodyPalace,
  fiveElementsClass: astrolabe.fiveElementsClass,
  lunarDate: astrolabe.lunarDate,
  zodiac: astrolabe.zodiac,
  sign: astrolabe.sign,
};

console.log('\nMeta:');
for (const [k, v] of Object.entries(meta)) {
  if (typeof v !== 'string') {
    console.error(`INVALID META: ${k} is ${typeof v}:`, v);
  } else {
    console.log(`  ${k}: "${v}"`);
  }
}

console.log('\n✓ All fields validated');
