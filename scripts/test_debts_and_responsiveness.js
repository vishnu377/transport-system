/**
 * Comprehensive Verification for Debts & Table Responsiveness
 * Tests:
 * 1. dbService.getAllTrips merges OPEN_TRIPS_SEED with precedence
 * 2. TripsModule.loadTrips keeps 14/10/2026 at the top after cloud sync
 * 3. formatDateDMY formats MM/DD/YYYY as DD/MM/YYYY
 * 4. Open Debts renders exact 10 columns matching media_1792177995805_e71277a4.png
 * 5. Open Debts has exact date groups (10/10/2026 ₹1,500.00, 03/10/2026 ₹5,900.00, etc.)
 */
const fs = require('fs');
const assert = require('assert');

// Mock browser DOM and environment
const htmlContent = fs.readFileSync('pages/trips.html', 'utf8');

global.window = global;
global.window.location = { search: '', href: '' };
global.window.scrollTo = () => {};
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: (id) => {
    return {
      id,
      innerText: '',
      innerHTML: '',
      value: '',
      style: {},
      addEventListener: () => {},
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      setAttribute: () => {},
      getAttribute: () => null
    };
  },
  querySelector: () => ({
    innerHTML: '',
    classList: { toggle: () => {}, add: () => {}, remove: () => {}, contains: () => false }
  }),
  querySelectorAll: () => []
};

global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

global.AppUI = {
  formatCurrency(val) { return '₹ ' + (Number(val) || 0).toLocaleString('en-IN'); },
  showToast: () => {}
};

// Load assets
require('../js/open-trips-seed.js');
require('../js/sample-trips-data.js');
require('../js/sample-debts-data.js');
const dbService = require('../js/db-service.js');
global.dbService = dbService;

require('../js/modules/trips.js');

async function runTests() {
  console.log('==================================================================');
  console.log('  TEST: VERIFYING DEBTS & RESPONSIVENESS FIXES                     ');
  console.log('==================================================================');

  // Test 1: Date formatting for MM/DD/YYYY
  const formatted = TripsModule.formatDateDMY('08/31/2026');
  assert.strictEqual(formatted, '31/08/2026', '08/31/2026 must format to 31/08/2026');
  console.log('✓ Test 1: MM/DD/YYYY formatted cleanly as DD/MM/YYYY:', formatted);

  // Test 2: dbService.getAllTrips includes OPEN_TRIPS_SEED with priority
  const allFromDb = dbService.getAllTrips();
  const topTrip = allFromDb[0];
  assert.ok(topTrip.grNo.includes('2483_TTC'), 'Top trip in dbService must be 2483_TTC on 14/10/2026');
  console.log('✓ Test 2: dbService.getAllTrips maintains 2483_TTC on 14/10/2026 as top trip!');

  // Test 3: TripsModule.loadTrips with cloud sync
  await TripsModule.loadTrips();
  TripsModule.workflowTab = 'all';
  TripsModule.currentFY = '2026-2027';
  TripsModule.applyFilters();

  const topFiltered = TripsModule.filteredTrips[0];
  assert.ok(topFiltered.grNo.includes('2483_TTC'), 'Filtered top trip for 2026-2027 must be 2483_TTC');
  console.log('✓ Test 3: TripsModule.applyFilters has 2483_TTC at the top for FY 2026-2027!');

  // Test 4: Open Debts table rendering
  TripsModule.initOpenDebtsData();
  assert.ok(TripsModule.allOpenDebtsList.length >= 7, 'Open debts seed loaded');

  // Check mock DOM tbody capture
  let debtHtml = '';
  const mockDebtsTbody = {
    set innerHTML(val) { debtHtml = val; }
  };
  global.document.getElementById = (id) => {
    if (id === 'open-debts-tbody') return mockDebtsTbody;
    return {
      innerText: '', innerHTML: '', value: '', style: {},
      addEventListener: () => {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {} }
    };
  };

  TripsModule.debtsActiveFY = 'All';
  TripsModule.debtsSearchQuery = '';
  TripsModule.renderOpenDebtsTable();

  assert.ok(debtHtml.includes('10/10/2026'), 'Open Debts has 10/10/2026');
  assert.ok(debtHtml.includes('₹1,500.00'), 'Open Debts has ₹1,500.00 subtotal');
  assert.ok(debtHtml.includes('03/10/2026'), 'Open Debts has 03/10/2026');
  assert.ok(debtHtml.includes('₹5,900.00'), 'Open Debts has ₹5,900.00 subtotal');
  assert.ok(debtHtml.includes('30/09/2021'), 'Open Debts has 30/09/2021');
  assert.ok(debtHtml.includes('₹30,000.00'), 'Open Debts has ₹30,000.00');
  assert.ok(debtHtml.includes('09/10/2026'), 'Open Debts has 09/10/2026');
  assert.ok(debtHtml.includes('₹1,71,257.00'), 'Open Debts has ₹1,71,257.00 subtotal');
  assert.ok(debtHtml.includes('colspan="10"'), 'Open Debts divider has exactly colspan 10');
  console.log('✓ Test 4: Open Debts renders exact 10-column layout with authentic date groups matching Screenshot 1!');

  // Test 5: Check responsive table CSS in trips.html
  assert.ok(htmlContent.includes('min-width: 1180px;'), 'trips.html has optimized responsive min-width 1180px');
  console.log('✓ Test 5: Table container CSS verified with responsive min-width (1180px)!');

  console.log('==================================================================');
  console.log('  ALL DEBTS & RESPONSIVENESS VERIFICATIONS PASSED 100%!            ');
  console.log('==================================================================');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
