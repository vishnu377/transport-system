const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING USER EXACT MTC ORDER: 1406_MTC (TOP) TO 698_MTC (BOTTOM) ===\n');

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

// Load dependencies via runInThisContext
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
  console.log(`✓ Loaded ${BiltyBookingModule.allTrips.length} total trips.`);

  // Render 3 Panels (which triggers natural date_desc sorting on MTC trips)
  BiltyBookingModule.renderAppSheet3Panels();

  const mtcTrips = BiltyBookingModule.currentMtcTrips;
  console.log(`✓ Total MTC Trips in feed: ${mtcTrips.length}`);

  console.log(`\n1. Checking TOP Trip (Upper-most in feed):`);
  const topTrip = mtcTrips[0];
  console.log(`   GR: ${topTrip.shortGrNo} | Date: ${topTrip.tripStartDate} | Truck: ${topTrip.truckNo} | Driver: ${topTrip.driver}`);
  if (topTrip.shortGrNo !== '1406_MTC' || topTrip.tripStartDate !== '2026-03-07') {
    console.error(`❌ FAILED: Expected TOP trip to be 1406_MTC on 2026-03-07, got ${topTrip.shortGrNo} on ${topTrip.tripStartDate}`);
    process.exit(1);
  }
  console.log(`✓ PASS: Top trip is 1406_MTC on 2026-03-07 (07/03/2026)`);

  console.log(`\n2. Checking TOP 5 Trips Sequence:`);
  const top5 = mtcTrips.slice(0, 5);
  top5.forEach((t, i) => console.log(`   ${i+1}. ${t.shortGrNo} | ${t.tripStartDate} | ${t.truckNo} | ${t.driver}`));
  if (top5[1].shortGrNo !== '1405_MTC' || top5[2].shortGrNo !== '1404_MTC') {
    console.error(`❌ FAILED: Top sequence incorrect: expected 1406, 1405, 1404`);
    process.exit(1);
  }
  console.log(`✓ PASS: Top sequence is 1406_MTC, 1405_MTC, 1404_MTC`);

  console.log(`\n3. Checking BOTTOM Trips Sequence (Lower-most in feed):`);
  const bottomTrips = mtcTrips.slice(-5);
  bottomTrips.forEach((t, i) => console.log(`   ${mtcTrips.length - 5 + i + 1}. ${t.shortGrNo} | ${t.tripStartDate} | ${t.truckNo} | ${t.driver}`));
  const lastTrip = mtcTrips[mtcTrips.length - 1];
  const secondLast = mtcTrips[mtcTrips.length - 2];
  if (lastTrip.shortGrNo !== '698_MTC' || lastTrip.tripStartDate !== '2024-10-01') {
    console.error(`❌ FAILED: Expected last trip to be 698_MTC on 2024-10-01, got ${lastTrip.shortGrNo}`);
    process.exit(1);
  }
  if (secondLast.shortGrNo !== '699_MTC' || secondLast.tripStartDate !== '2024-10-01') {
    console.error(`❌ FAILED: Expected 2nd last trip to be 699_MTC on 2024-10-01, got ${secondLast.shortGrNo}`);
    process.exit(1);
  }
  console.log(`✓ PASS: Bottom trips on 01/10/2024 are 699_MTC and 698_MTC at the very bottom!`);

  console.log(`\n4. Verifying Driver Names:`);
  const assignedCount = mtcTrips.filter(t => (t.driver || '').toLowerCase().includes('assigned driver')).length;
  console.log(`   Trips with 'Assigned Driver': ${assignedCount}`);
  if (assignedCount > 0) {
    console.error(`❌ FAILED: Found placeholder 'Assigned Driver'`);
    process.exit(1);
  }
  console.log(`✓ PASS: Zero placeholder drivers! All drivers are authentic.`);

  console.log(`\n5. Verifying Panel Rendered HTML:`);
  const hasTopRibbon = mtcHtml.includes('07/03/2026') && mtcHtml.includes('1406_MTC');
  const hasBottomRibbon = mtcHtml.includes('01/10/2024') && mtcHtml.includes('699_MTC') && mtcHtml.includes('698_MTC');

  if (!hasTopRibbon) {
    console.error(`❌ FAILED: Rendered HTML does not contain 07/03/2026 and 1406_MTC at top!`);
    process.exit(1);
  }
  if (!hasBottomRibbon) {
    console.error(`❌ FAILED: Rendered HTML does not contain 01/10/2024 and 699_MTC/698_MTC at bottom!`);
    process.exit(1);
  }

  console.log(`✓ PASS: Rendered HTML contains 07/03/2026 ribbon with 1406_MTC at top!`);
  console.log(`✓ PASS: Rendered HTML contains 01/10/2024 ribbon with 699_MTC and 698_MTC at bottom!`);

  console.log(`\n=======================================================`);
  console.log(`🎉 ALL REQUIREMENTS VERIFIED 100% SUCCEEDED!`);
  console.log(`=======================================================`);
}

runTest().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
