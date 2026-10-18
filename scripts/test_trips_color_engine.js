const fs = require('fs');

global.window = {};
eval(fs.readFileSync('js/open-trips-seed.js', 'utf8'));

// Format date DMY
function formatDateDMY(dateStr) {
  if (!dateStr || dateStr === 'Undated' || dateStr === '-') return '';
  const s = String(dateStr).trim();
  const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmy) {
    let p1 = String(dmy[1]).padStart(2, '0');
    let p2 = String(dmy[2]).padStart(2, '0');
    let year = dmy[3];
    return p1 <= 12 && p2 > 12 ? `${p2}/${p1}/${year}` : `${p1}/${p2}/${year}`;
  }
  const ymd = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymd) {
    return `${String(ymd[3]).padStart(2, '0')}/${String(ymd[2]).padStart(2, '0')}/${ymd[1]}`;
  }
  return s;
}

function getRowColorTheme(trip) {
  if (!trip) return '#0077c2';

  // 1. Explicit colorTheme
  if (trip.colorTheme) {
    switch (String(trip.colorTheme).toLowerCase()) {
      case 'gold':
      case 'mustard':
      case 'salety': return '#967b2c';
      case 'purple':
      case 'begani': return '#7b1fa2';
      case 'magenta':
      case 'pink': return '#e91e63';
      case 'green':
      case 'emerald': return '#008a38';
      case 'cyan':
      case 'teal':
      case 'turquoise': return '#00acc1';
      case 'blue':
      case 'royal': return '#0077c2';
      case 'orange':
      case 'amber': return '#e65100';
      case 'grey':
      case 'slate': return '#5f6368';
      case 'red': return '#d90429';
    }
  }

  const shortGr = String(trip.shortGrNo || trip.grNo || '');
  // 2. Negative GRs or shortage/cancelled entries are RED
  if (shortGr.startsWith('-')) return '#d90429';

  // 3. Dynamic status mapping
  const status = String(trip.tripStatus || trip.status || '').trim().toLowerCase();
  if (status.includes('settled') || status === 'paid' || status === 'closed') return '#008a38';
  if (status.includes('cancel') || status.includes('dispute') || status.includes('shortage')) return '#d90429';
  if (status.includes('off loading') || status.includes('offloading') || status.includes('off-loading')) return '#e91e63';
  if (status.includes('pod') || status.includes('bill generat') || status.includes('bill sent')) return '#7b1fa2';
  if (status.includes('truck owner payment') || status.includes('owner payment pending') || status.includes('owner due')) return '#00acc1';
  if (status.includes('transit')) return '#967b2c';
  if (status.includes('cheque')) return '#0077c2';
  if (status.includes('loading') || status.includes('advance')) return '#e65100';
  if (status.includes('party payment')) return '#0077c2';

  // 4. SMTC transport
  const transport = String(trip.transport || '').toUpperCase();
  if (transport === 'SMTC' || shortGr.includes('SMTC')) return '#7b1fa2';

  // 5. Inferred payment state
  const pDue = Number(trip.partyDue ?? trip.dueAmount ?? trip.balance ?? 0);
  const oDue = Number(trip.ownerDue ?? 0);

  if (pDue <= 0 && oDue <= 0 && (trip.status === 'Settled' || trip.paid > 0)) return '#008a38';
  if (pDue <= 0 && oDue > 0) return '#00acc1';
  if (trip.billNo) return '#0077c2';

  // 6. Date-based defaults
  const dateDMY = formatDateDMY(trip.tripStartDate || trip.date || trip.biltyDate || '');
  if (dateDMY.startsWith('18/10') || dateDMY.startsWith('17/10') || dateDMY.startsWith('16/10') || dateDMY.startsWith('15/10') || dateDMY.startsWith('13/10') || dateDMY.startsWith('10/10') || dateDMY.startsWith('09/10') || dateDMY.startsWith('05/10')) return '#967b2c';
  if (dateDMY.startsWith('14/10')) return '#00897b';
  if (dateDMY.startsWith('08/10') || dateDMY.startsWith('04/10') || dateDMY.startsWith('11/10')) return '#e91e63';
  if (dateDMY.startsWith('12/10')) return '#0077c2';
  if (dateDMY.startsWith('01/10') || dateDMY.startsWith('30/09') || dateDMY.startsWith('29/09') || dateDMY.startsWith('28/09') || dateDMY.startsWith('24/09')) return '#7b1fa2';
  if (dateDMY.startsWith('25/09') || dateDMY.startsWith('21/09')) return '#008a38';
  if (dateDMY.startsWith('31/03/2026')) return '#00acc1';
  if (dateDMY.startsWith('30/03/2026')) return '#008a38';
  if (dateDMY.startsWith('02/10')) return '#5f6368';

  return '#967b2c';
}

const colorCounts = {};
window.OPEN_TRIPS_SEED.forEach(t => {
  const c = getRowColorTheme(t);
  colorCounts[c] = (colorCounts[c] || 0) + 1;
});
console.log('Seed color breakdown:', colorCounts);

// Test distinct color coverage
const expectedColors = [
  '#967b2c', // Mustard / Gold
  '#0077c2', // Royal Blue
  '#e91e63', // Magenta / Pink
  '#7b1fa2', // Purple / Begani
  '#00acc1', // Cyan / Teal
  '#008a38', // Emerald Green
  '#d90429', // Bold Red
  '#e65100'  // Orange / Amber
];

const testTrips = [
  { shortGrNo: '2496_TTC', status: 'Transit' },
  { shortGrNo: '2472_TTC', status: 'Cheque Due' },
  { shortGrNo: '2437_TTC', status: 'Off Loading' },
  { shortGrNo: '233_SMTC', status: 'POD Sent/Bill Generated' },
  { shortGrNo: '2497_TTC', status: 'Truck Owner Payment Pending' },
  { shortGrNo: '2807_TTC', status: 'Settled' },
  { shortGrNo: '-349_TTC', status: 'Cancelled' },
  { shortGrNo: '2511_TTC', status: 'Advance Due' }
];

testTrips.forEach(t => {
  const c = getRowColorTheme(t);
  console.log(`Trip ${t.shortGrNo} (${t.status}) => ${c}`);
});
