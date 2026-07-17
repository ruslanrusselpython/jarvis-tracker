// embed.js — встраивает data.json в index.html (UTF-8 safe)
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const json = fs.readFileSync(path.join(dir, 'data.json'), 'utf8');
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const escaped = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
html = html.replace(
  /(<script id="embedded-data" type="application\/json">)[\s\S]*?(<\/script>)/,
  '$1' + escaped + '$2'
);

fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
console.log('Embedded OK. HTML size: ' + html.length);
