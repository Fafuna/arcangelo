const fs = require('fs');

const htmlPath = 'C:/Users/pc/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a61a8ec966b0095944d3f14/game-topic-dashboard/game-topic-dashboard.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Extract existing games array text
const gamesStart = html.indexOf('var games = [');
const gamesEnd = html.indexOf('];', gamesStart) + 2;
const gamesText = html.substring(gamesStart, gamesEnd);

// Parse existing games
const games = [];
const gameBlocks = gamesText.split(/(?=\{\s*id:)/).slice(1);
for (const block of gameBlocks) {
  try {
    const idMatch = block.match(/id:\s*(\d+)/);
    const dateMatch = block.match(/date:\s*"([^"]+)"/);
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    if (idMatch && dateMatch && nameMatch) {
      const game = { raw: block };
      game.id = parseInt(idMatch[1]);
      game.date = dateMatch[1];
      game.name = nameMatch[1];
      games.push(game);
    }
  } catch(e) {}
}

console.log('Total games parsed:', games.length);
console.log('\nGames to REMOVE (date <= 2026-09-11):');
games.filter(g => g.date <= '2026-09-11').forEach(g => console.log(g.id, g.date, g.name));
console.log('\nGames to KEEP (date >= 2026-09-12):');
games.filter(g => g.date >= '2026-09-12').forEach(g => console.log(g.id, g.date, g.name));
