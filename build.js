// Builds dist/pot-of-gold.html by inlining src/teams.js and src/model.js into src/app.html.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, 'src');
let html = fs.readFileSync(path.join(src, 'app.html'), 'utf8');
for (const f of ['teams.js', 'model.js']) {
  const code = fs.readFileSync(path.join(src, f), 'utf8');
  html = html.replace(`<!--INLINE:${f}-->`, `<script>\n${code}\n</script>`);
}
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'pot-of-gold.html'), html);
// Syntax-check every inline script.
const vm = require('vm');
let m, re = /<script>([\s\S]*?)<\/script>/g, n = 0;
while ((m = re.exec(html))) { new vm.Script(m[1]); n++; }
console.log(`built dist/pot-of-gold.html (${(html.length / 1024).toFixed(0)} KB, ${n} scripts parsed OK)`);
