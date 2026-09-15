const fs = require('fs');

const htmlPath = 'C:/Users/pc/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a61a8ec966b0095944d3f14/game-topic-dashboard/game-topic-dashboard.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Extract existing games array text
const gamesStart = html.indexOf('var games = [');
const gamesEnd = html.indexOf('];', gamesStart) + 2;
const gamesText = html.substring(gamesStart, gamesEnd);

// Parse existing games blocks
const rawBlocks = [];
let depth = 0;
let current = '';
let inBlock = false;

for (let i = 0; i < gamesText.length; i++) {
  const ch = gamesText[i];
  if (ch === '{') {
    depth++;
    inBlock = true;
  }
  if (inBlock) {
    current += ch;
  }
  if (ch === '}') {
    depth--;
    if (depth === 0) {
      inBlock = false;
      rawBlocks.push(current.trim());
      current = '';
    }
  }
}

// Parse each block
const games = [];
for (const block of rawBlocks) {
  const idMatch = block.match(/id:\s*(\d+)/);
  const dateMatch = block.match(/date:\s*"([^"]+)"/);
  if (idMatch && dateMatch) {
    games.push({
      id: parseInt(idMatch[1]),
      date: dateMatch[1],
      raw: block
    });
  }
}

// Filter: keep date >= 2026-09-12
let keptGames = games.filter(g => g.date >= '2026-09-12');

// Remove isNewToday from kept games
keptGames = keptGames.map(g => {
  g.raw = g.raw.replace(/,\s*isNewToday:\s*true/, '');
  return g;
});

// Update specific games
for (const g of keptGames) {
  if (g.id === 179) {
    // Harvest Moon delayed to 2026-10-15
    g.raw = g.raw.replace(/date: "2026-09-24"/, 'date: "2026-10-15"');
    g.date = '2026-10-15';
  }
}

// New games to add
const newGames = [
`    {
      id: 262,
      name: "木木屋",
      nameEn: "Woodo",
      date: "2026-09-16",
      developer: "Tiny Monks Tales",
      publisher: "Daedalic Entertainment",
      genres: ["解谜","温馨","叙事","立体模型"],
      genreClass: "puzzle",
      platforms: ["Steam","PS5","Xbox","Switch"],
      price: "待确认",
      chinese: true,
      hot: false,
      desc: "叙事驱动的温馨立体模型建造解谜游戏。通过拼凑木质模型部件，重建童年记忆中的场景，解开一个关于家庭与成长的感人故事。支持8种语言配音包括中文，画风治愈清新。",
      priority: "medium",
      heatLevel: 3,
      officialUrl: "https://store.steampowered.com/app/2572040/Woodo/",
      topicAngles: ["温馨叙事解谜游戏的市场热度","立体模型建造玩法创新","多语言配音独立游戏的制作成本"],
      isNewToday: true
    }`,
`    {
      id: 263,
      name: "Good Heavens!",
      nameEn: "Good Heavens!",
      date: "2026-09-16",
      developer: "Nowhere Studios",
      publisher: "WarpSpeed Entertainment, 2P Games",
      genres: ["开放世界","生存建造","RPG","合作"],
      genreClass: "adventure",
      platforms: ["Steam"],
      price: "待确认",
      chinese: true,
      hot: false,
      desc: "开放世界生存建造RPG，支持1-8人在线合作。探索神秘生物群落，建造基地，掌握六大科技树，重建失落城市，帮助笨拙的神明恢复濒临崩溃的世界。",
      priority: "medium",
      heatLevel: 3,
      officialUrl: "https://store.steampowered.com/app/1617120/Good_Heavens/",
      topicAngles: ["8人合作生存建造的游戏体验","开放世界RPG中的神明叙事","生存建造品类的玩法进化"],
      isNewToday: true
    }`,
`    {
      id: 264,
      name: "Anymaker",
      nameEn: "Anymaker",
      date: "2026-09-18",
      developer: "Geometa",
      publisher: "Geometa",
      genres: ["模拟","建造","沙盒","开放世界","载具"],
      genreClass: "simulation",
      platforms: ["Steam"],
      price: "待确认",
      chinese: false,
      hot: false,
      desc: "由《Stormworks》开发商打造的深度技术向载具建造游戏。设计底盘、组装引擎、连接组件与线缆、编程控制器，在危险开放世界中测试你的机械 creations。支持网格化建造系统。",
      priority: "medium",
      heatLevel: 3,
      officialUrl: "https://store.steampowered.com/app/4435340/Anymaker/",
      topicAngles: ["Stormworks团队新作的载具建造深度","技术向沙盒游戏的玩家社群","程序化载具物理模拟"],
      isNewToday: true
    }`,
`    {
      id: 265,
      name: "Happy Wheels",
      nameEn: "Happy Wheels",
      date: "2026-09-21",
      developer: "Jim Bonacci",
      publisher: "Fancy Force",
      genres: ["动作","物理","平台","血腥","搞笑"],
      genreClass: "action",
      platforms: ["Steam"],
      price: "待确认",
      chinese: false,
      hot: true,
      desc: "经典Flash浏览器游戏终于登陆Steam。玩家操控轮椅、购物车、地铁车厢等载具穿越致命障碍赛道，超过500万个用户自制关卡可供游玩。Steam版无广告，支持手柄操作。",
      priority: "high",
      heatLevel: 4,
      officialUrl: "https://store.steampowered.com/app/4705510/Happy_Wheels/",
      topicAngles: ["Happy Wheels从浏览器到Steam的16年传奇","用户生成内容(UGC)驱动的游戏生态","经典Flash游戏移植Steam的市场表现"],
      isNewToday: true
    }`,
`    {
      id: 266,
      name: "Delverium",
      nameEn: "Delverium",
      date: "2026-09-22",
      developer: "Sagestone Games",
      publisher: "Sagestone Games",
      genres: ["开放世界","生存建造","沙盒","农场","地牢探险"],
      genreClass: "adventure",
      platforms: ["Steam"],
      price: "待确认",
      chinese: false,
      hot: false,
      desc: "澳大利亚独立工作室首作，被玩家称为\\u201cMinecraft meets Stardew Valley\\u201d。程序生成的开放世界中，玩家可以收集资源、建造庇护所、经营农场、探索不同生态、挑战危险地牢。支持1-8人合作，Steam Deck已验证。",
      priority: "medium",
      heatLevel: 3,
      officialUrl: "https://store.steampowered.com/app/2710040/Delverium/",
      topicAngles: ["Minecraft+Stardew Valley的融合创新","8万愿望单的独立游戏黑马","抢先体验阶段的玩家反馈管理"],
      isNewToday: true
    }`
];

// Build new array text
const allBlocks = keptGames.map(g => g.raw).concat(newGames);
const newArrayText = '    var games = [\n\n' + allBlocks.join(',\n\n') + '\n\n    ];';

// Replace in HTML
const newHtml = html.substring(0, gamesStart) + newArrayText + html.substring(gamesEnd);

// Update date
const today = '2026-09-15';
const dateRegex = /数据更新时间[^\d]*\d{4}-\d{2}-\d{2}/;
const finalHtml = newHtml.replace(dateRegex, `数据更新时间：${today}`);

fs.writeFileSync(htmlPath, finalHtml);
console.log('Updated! Kept:', keptGames.length, 'Added:', newGames.length, 'Total:', allBlocks.length);
