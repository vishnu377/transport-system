const fs = require('fs');
const html = fs.readFileSync('pages/bilty-booking.html', 'utf8');
const lines = html.split('\n');

let stack = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const tagMatches = line.matchAll(/<(\/)?([a-zA-Z0-9-]+)(\s[^>]*)?>/g);
  for (const m of tagMatches) {
    const isClose = m[1] === '/';
    const tag = m[2].toLowerCase();
    const selfClosing = ['input', 'img', 'br', 'hr', 'meta', 'link', 'path', 'circle', 'ellipse', 'polygon', 'svg', 'option'].includes(tag) || (m[0].endsWith('/>'));
    if (selfClosing) continue;
    if (isClose) {
      if (stack.length === 0) {
        console.log(`Extra close tag at line ${i+1}: </${tag}>`);
      } else {
        const top = stack.pop();
        if (top.tag !== tag) {
          console.log(`Mismatched close at line ${i+1}: expected </${top.tag}> (opened line ${top.line} ${top.desc}) but got </${tag}>`);
        }
      }
    } else {
      let desc = '';
      if (m[3]) {
        const idM = m[3].match(/id=["']([^"']+)["']/);
        const classM = m[3].match(/class=["']([^"']+)["']/);
        desc = (idM ? '#' + idM[1] : '') + (classM ? '.' + classM[1].split(' ')[0] : '');
      }
      stack.push({ tag, line: i+1, desc });
    }
  }
}
console.log('Remaining open tags at line 900:', stack.length);
stack.forEach(s => console.log(`Line ${s.line}: <${s.tag} ${s.desc}>`));
