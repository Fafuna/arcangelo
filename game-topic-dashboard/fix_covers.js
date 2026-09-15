const fs = require('fs');

const htmlPath = 'C:/Users/pc/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a61a8ec966b0095944d3f14/game-topic-dashboard/game-topic-dashboard.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix 61 Marvel's Wolverine: add coverUrl (PS5 exclusive)
html = html.replace(
  /(id: 61,[\s\S]*?officialUrl: "https:\/\/insomniac\.games\/")/,
  '$1,\n      coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8m5z.jpg"'
);

// Fix 89 Fire Emblem: add coverUrl (Switch 2 exclusive)
html = html.replace(
  /(id: 89,[\s\S]*?officialUrl: "https:\/\/www\.nintendo\.com\/")/,
  '$1,\n      coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9d7x.jpg"'
);

// Fix 135 Kingdom Hearts: update to Steam collection page
html = html.replace(
  /(id: 135,[\s\S]*?)officialUrl: "https:\/\/www\.square-enix\.com\/kingdomhearts\/collection\/en-us\/"/,
  '$1officialUrl: "https://store.steampowered.com/sub/1000794/"'
);

// Fix 179 Harvest Moon: update date already done, now add Steam search link if no app ID
// It currently has https://www.natsume.com/ - let's update to a better URL or add coverUrl
html = html.replace(
  /(id: 179,[\s\S]*?officialUrl: "https:\/\/www\.natsume\.com\/")/,
  '$1,\n      coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9g8h.jpg"'
);

// Fix 213 Gothic 3 Classic: add coverUrl (console re-release)
html = html.replace(
  /(id: 213,[\s\S]*?officialUrl: "https:\/\/gothic3classic\.thqnordic\.com\/")/,
  '$1,\n      coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5x7h.jpg"'
);

fs.writeFileSync(htmlPath, html);
console.log('Cover fixes applied');
