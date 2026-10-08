const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('js/sample-trips-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const trips = sandbox.window.INITIAL_EXCEL_TRIPS || [];
console.log('Total trips:', trips.length);

const transCounts = {};
for (const t of trips) {
  const tr = t.transport || '(empty)';
  transCounts[tr] = (transCounts[tr] || 0) + 1;
}
console.log('Transport counts:', transCounts);

const nonMtc = trips.filter(t => {
  const firm = String(t.transport || '').toUpperCase().trim();
  const gr = String(t.grNo || '').toUpperCase().trim();
  const shortGr = String(t.shortGrNo || '').toUpperCase().trim();
  const isMtc = (firm === 'MTC') || 
    ((shortGr.endsWith('_MTC') || gr.endsWith('_MTC') || gr.includes('-MTC') || gr.includes('/MTC') || (gr.includes('MTC') && !gr.includes('SMTC'))) && firm !== 'TTC' && firm !== 'SMTC');
  return !isMtc;
});

console.log('Non-MTC count:', nonMtc.length);
console.log('Sample non-MTC trips around index 30:');
for (let i = 25; i < Math.min(45, nonMtc.length); i++) {
  const t = nonMtc[i];
  console.log(i, 'ID:', t.id, 'GR:', t.grNo, 'short:', t.shortGrNo, 'trans:', t.transport, 'ref:', t.reference, 'consignor:', t.consignor, 'broker:', t.broker);
}
