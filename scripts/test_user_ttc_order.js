const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING TTC & SMTC FEED ORDER & AUTHENTIC DRIVERS ===\n');

const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; }
};
global.window = global;

const defaultElement = () => ({
  value: '',
  innerText: '',
  innerHTML: '',
  style: {},
  classList: { add: () => {}, remove: () => {}, contains: () => false },
  addEventListener: () => {}
});

let ttcHtml = '';
const mockElements = {
  'mtc-panel-feed': defaultElement(),
  'ttc-panel-feed': defaultElement(),
  'ttc-table-tbody': {
    get innerHTML() { return ttcHtml; },
    set innerHTML(val) { ttcHtml = val; },
    addEventListener: () => {}
  },
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

// Load scripts
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-drivers-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../assets/bilty_template/bilty_assets.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function runTest() {
  await BiltyBookingModule.loadAllData();
  BiltyBookingModule.renderAppSheet3Panels();

  const ttcTrips = BiltyBookingModule.currentTtcTrips;
  console.log(`✓ Total TTC/SMTC trips in feed: ${ttcTrips.length}`);

  console.log(`\n1. Checking TOP Trips:`);
  console.log(`   Trip 1: ${ttcTrips[0].shortGrNo} | ${ttcTrips[0].tripStartDate} | ${ttcTrips[0].truckNo} | ${ttcTrips[0].driver}`);
  console.log(`   Trip 2: ${ttcTrips[1].shortGrNo} | ${ttcTrips[1].tripStartDate} | ${ttcTrips[1].truckNo} | ${ttcTrips[1].driver}`);
  console.log(`   Trip 3: ${ttcTrips[2].shortGrNo} | ${ttcTrips[2].tripStartDate} | ${ttcTrips[2].truckNo} | ${ttcTrips[2].driver}`);

  if (ttcTrips[0].tripStartDate !== '2026-10-07') {
    console.error(`❌ FAILED: Expected top trip to be dated 2026-10-07, got ${ttcTrips[0].tripStartDate}`);
    process.exit(1);
  }
  console.log(`✓ PASS: Top date ribbon is 07/10/2026!`);

  console.log(`\n2. Verifying Rendered HTML ribbons & Columns (Reference, Driver, Bilty Date):`);
  const hasOct7 = ttcHtml.includes('07/10/2026') && ttcHtml.includes('2377_TTC') && ttcHtml.includes('216_SMTC');
  const hasOct6 = ttcHtml.includes('06/10/2026') && ttcHtml.includes('2376_TTC') && ttcHtml.includes('215_SMTC');
  const hasOct5 = ttcHtml.includes('05/10/2026') && ttcHtml.includes('2362_TTC');

  const hasReference = ttcHtml.includes('Tanuj Kothari Udaipur') && ttcHtml.includes('Mahaveer Minerals 9414312586');
  const hasDriver = ttcHtml.includes('Hemraj Natwadiya') && ttcHtml.includes('Kushiram Gurjar Tonk');
  const hasBiltyDate = ttcHtml.includes('07/10/2026') && ttcHtml.includes('06/10/2026');

  if (!hasOct7 || !hasOct6 || !hasOct5) {
    console.error(`❌ FAILED: Rendered HTML missing expected ribbons/trips for Oct 2026`);
    process.exit(1);
  }
  if (!hasReference) {
    console.error(`❌ FAILED: Rendered HTML missing Reference column data!`);
    process.exit(1);
  }
  if (!hasDriver) {
    console.error(`❌ FAILED: Rendered HTML missing Driver column data!`);
    process.exit(1);
  }
  if (!hasBiltyDate) {
    console.error(`❌ FAILED: Rendered HTML missing Bilty Date column data!`);
    process.exit(1);
  }
  console.log(`✓ PASS: Verified Reference, Driver, and Bilty Date columns rendered with authentic data!`);

  console.log(`\n3. Verifying Driver Names:`);
  const assignedCount = ttcTrips.filter(t => (t.driver || '').toLowerCase().includes('assigned driver')).length;
  console.log(`   Trips with 'Assigned Driver': ${assignedCount}`);
  if (assignedCount > 0) {
    console.error(`❌ FAILED: Found placeholder 'Assigned Driver'`);
    process.exit(1);
  }
  console.log(`✓ PASS: Zero placeholder drivers in TTC & SMTC!`);

  console.log(`\n=======================================================`);
  console.log(`🎉 ALL TTC & SMTC REQUIREMENTS VERIFIED 100% SUCCEEDED!`);
  console.log(`=======================================================`);
}

runTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
