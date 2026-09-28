const fs = require('fs');

const html = fs.readFileSync('pages/trips.html', 'utf8');
const js = fs.readFileSync('js/modules/trips.js', 'utf8');

// Find the debts-register-table
const tableStart = html.indexOf('id="debts-register-table"');
const theadEnd = html.indexOf('</thead>', tableStart);
const theadContent = html.substring(tableStart, theadEnd);

const thMatches = theadContent.match(/<th[^>]*>[\s\S]*?<\/th>/g) || [];
console.log('Debts table TH elements (count=' + thMatches.length + '):');
thMatches.forEach((th, idx) => console.log((idx + 1) + ': ' + th.replace(/<[^>]*>/g, '').trim()));

// Find the template in renderTable
const rowStart = js.indexOf('<!-- 1. Bill NO. -->');
const rowEnd = js.indexOf('</tr>', rowStart);
const rowContent = js.substring(rowStart, rowEnd);

const tdMatches = rowContent.match(/<td[^>]*>[\s\S]*?<\/td>/g) || [];
console.log('\nDebts row TD elements (count=' + tdMatches.length + '):');
tdMatches.forEach((td, idx) => console.log((idx + 1) + ': ' + td.slice(0, 40).replace(/[\r\n]/g, ' ')));

if (thMatches.length === tdMatches.length && thMatches.length === 15) {
  console.log('\nSUCCESS: Exactly 15 columns in <thead> and 15 columns in <tbody>! 100% matched!');
} else {
  console.error('\nMISMATCH! TH count:', thMatches.length, 'TD count:', tdMatches.length);
  process.exit(1);
}
