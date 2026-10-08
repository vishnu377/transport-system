const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING MTC REFERENCE COLUMN & HEADERS ===\n');

// 1. Check HTML header specifically in mtc-expanded-header-row
const html = fs.readFileSync(path.join(__dirname, '../pages/bilty-booking.html'), 'utf8');
const headerMatch = html.match(/id="mtc-expanded-header-row"[\s\S]*?<\/div>\s*<\/div>/);
if (!headerMatch || headerMatch[0].includes('Consignor / Party')) {
  console.error('❌ FAILED: mtc-expanded-header-row still contains "Consignor / Party" header!');
  process.exit(1);
}
if (!headerMatch[0].includes('>Reference<')) {
  console.error('❌ FAILED: mtc-expanded-header-row does not contain ">Reference<"!');
  process.exit(1);
}
console.log('✓ PASS: MTC expanded header row contains "Reference" instead of "Consignor / Party"');

// 2. Setup mock environment for bilty-booking.js
const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; }
};
global.window = global;

const defaultElement = () => ({
  value: '', innerText: '', innerHTML: '', style: {},
  classList: { add: () => {}, remove: () => {}, contains: () => false },
  addEventListener: () => {}
});

let mtcHtml = '';
const mockElements = {
  'mtc-panel-feed': {
    get innerHTML() { return mtcHtml; },
    set innerHTML(val) { mtcHtml = val; },
    addEventListener: () => {}
  },
  'ttc-panel-feed': defaultElement(),
  'ttc-table-tbody': defaultElement(),
  'bilty-search-input': defaultElement(),
  'bilty-details-kv-table': defaultElement()
};

global.document = {
  getElementById: (id) => mockElements[id] || (mockElements[id] = defaultElement()),
  querySelector: (sel) => mockElements[sel.replace('#', '')] || (mockElements[sel.replace('#', '')] = defaultElement()),
  querySelectorAll: () => [],
  addEventListener: () => {}
};

global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => `₹${n}`,
  formatDate: (d) => d,
  showToast: (msg, type) => {}
};
global.APP_CONFIG = { firebase: null };

vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-drivers-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../assets/bilty_template/bilty_assets.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function test() {
  await BiltyBookingModule.loadAllData();
  BiltyBookingModule.renderAppSheet3Panels();

  const mtcTrips = BiltyBookingModule.currentMtcTrips;
  console.log(`✓ Total MTC trips loaded: ${mtcTrips.length}`);

  // Check that mtcHtml contains authentic Reference values
  const hasAliAkhtar = mtcHtml.includes('Ali Akhtar Jani');
  const hasMadanSinghal = mtcHtml.includes('Madan Sindhal Kelwa') || mtcHtml.includes('Madan Singhal');
  const hasPavanBansal = mtcHtml.includes('Pavan Bansal Dadri');

  if (!hasAliAkhtar || !hasPavanBansal) {
    console.error('❌ FAILED: Rendered MTC HTML missing expected Reference data!');
    process.exit(1);
  }
  console.log('✓ PASS: Rendered MTC HTML contains authentic references (Ali Akhtar Jani, Pavan Bansal Dadri)!');

  console.log('\n🎉 ALL MTC REFERENCE CHECKS PASSED 100%!');
}

test();
