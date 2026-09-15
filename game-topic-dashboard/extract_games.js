const fs = require('fs');
const content = fs.readFileSync('C:/Users/pc/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a61a8ec966b0095944d3f14/game-topic-dashboard/temp_games.js', 'utf8');

// Use a simpler approach: find each game block by id pattern
const lines = content.split('\n');
const games = [];
let current = null;
let inDesc = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/id:\s*(\d+)/.test(line)) {
    if (current) games.push(current);
    current = { id: parseInt(line.match(/id:\s*(\d+)/)[1]) };
  }
  if (current && /date:\s*"([^"]+)"/.test(line)) {
    current.date = line.match(/date:\s*"([^"]+)"/)[1];
  }
  if (current && /name:\s*"([^"]+)"/.test(line) && !current.name) {
    current.name = line.match(/name:\s*"([^"]+)"/)[1];
  }
  if (current && /nameEn:\s*"([^"]+)"/.test(line)) {
    current.nameEn = line.match(/nameEn:\s*"([^"]+)"/)[1];
  }
  if (current && /officialUrl:\s*"([^"]+)"/.test(line)) {
    current.url = line.match(/officialUrl:\s*"([^"]+)"/)[1];
  }
}
if (current) games.push(current);

games.sort((a, b) => a.id - b.id);
games.forEach(g => {
  console.log(g.id + '|' + g.date + '|' + g.name + '|' + g.nameEn + '|' + g.url);
});
