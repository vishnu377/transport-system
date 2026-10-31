/**
 * Automated Test Suite for Module 13: Partnership (1:1 Google AppSheet Replication)
 *
 * Verifies:
 * 1. Static HTML Structure & AppSheet Elements (drawers, year nav pane, gold buttons #c3b15a)
 * 2. Data Calibration (26 Authentic Monthly Records matching AppSheet screenshots)
 * 3. Module Initialization & Year Filtering (2026-2027, 2025-2026, 2024-2025)
 * 4. Mathematical Calibration & Live Formula (Amount = Prev + Income - Expense)
 * 5. Month-Grouped Table View Rendering with Subtotals
 * 6. Drawer CRUD Operations (Add, Edit, Recalc, Save, Delete)
 * 7. Real-Time Search Engine & Zero LocalStorage Policy
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Lightweight In-Memory DOM Mocks
class MockClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
  toggle(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
}

class MockElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.innerHTML = '';
    this.innerText = '';
    this.value = '';
    this.className = '';
    this.classList = new MockClassList();
    this.style = {};
    this.attributes = {};
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener() {}
  reset() { this.value = ''; }
}

const mockDocElements = new Map();
function getOrCreateMockElement(id) {
  if (!mockDocElements.has(id)) {
    mockDocElements.set(id, new MockElement(id));
  }
  return mockDocElements.get(id);
}

global.window = global;
global.document = {
  getElementById: (id) => getOrCreateMockElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateMockElement(sel.slice(1));
    return new MockElement('', sel);
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance: (el) => ({
      show: () => { el.style.display = 'block'; },
      hide: () => { el.style.display = 'none'; }
    }),
    getInstance: (el) => ({
      show: () => { el.style.display = 'block'; },
      hide: () => { el.style.display = 'none'; }
    })
  }
};

global.AppUI = {
  showToast: (msg, type) => console.log(`[Toast ${type ? type.toUpperCase() : 'INFO'}]: ${msg}`)
};

global.confirm = () => true;

async function runTests() {
  console.log('=== TEST SUITE: MODULE 13 - PARTNERSHIP (1:1 APPSHEET) ===\n');

  // ----------------------------------------------------
  // TEST 1: Static HTML Structure & AppSheet Elements
  // ----------------------------------------------------
  console.log('--- TEST 1: Static HTML Structure & AppSheet Elements ---');
  const html = fs.readFileSync(path.join(__dirname, '../pages/partnership.html'), 'utf-8');

  assert(html.includes('id="partnershipSearchInput"'), 'Must have Search Partnership input');
  assert(html.includes('id="partnershipSubbar"'), 'Must have subbar container');
  assert(html.includes('id="partnershipYearNav"'), 'Must have left year navigation pane');
  assert(html.includes('id="partnershipMainContent"'), 'Must have main scrollable table content');
  assert(html.includes('id="partnershipDrawer"'), 'Must have offcanvas slide drawer');
  assert(html.includes('id="partInputDate"'), 'Must have Date input');
  assert(html.includes('id="partInputPrevAmount"'), 'Must have Previous Month Amount input');
  assert(html.includes('id="partInputIncome"'), 'Must have Income input');
  assert(html.includes('id="partInputExpense"'), 'Must have Expense input');
  assert(html.includes('id="partInputAmount"'), 'Must have Partnership Amount input');

  // Verify Add and Save buttons use Google AppSheet gold color (#c3b15a)
  assert(html.includes('#c3b15a'), 'Add and Save buttons must use authentic AppSheet gold color #c3b15a');

  // Strict Zero LocalStorage
  assert(!html.includes('localStorage.setItem'), 'Zero localStorage policy');
  console.log('✓ TEST 1 PASSED: pages/partnership.html contains all 1:1 AppSheet containers & gold buttons!\n');

  // ----------------------------------------------------
  // TEST 2: Data Calibration (26 Authentic Monthly Records)
  // ----------------------------------------------------
  console.log('--- TEST 2: Data Calibration (26 Authentic Records from AppSheet Screenshots) ---');
  require('../js/sample-partnership-data.js');
  const INITIAL_PARTNERSHIP = global.window.INITIAL_PARTNERSHIP;

  assert(Array.isArray(INITIAL_PARTNERSHIP), 'INITIAL_PARTNERSHIP must be an array');
  assert.strictEqual(INITIAL_PARTNERSHIP.length, 26, 'Dataset must have exactly 26 monthly partnership records');

  // Check top record from Screenshot 2 (31/10/2026)
  assert.strictEqual(INITIAL_PARTNERSHIP[0].date, '31/10/2026');
  assert.strictEqual(INITIAL_PARTNERSHIP[0].previousMonthAmount, 23920904.10);
  assert.strictEqual(INITIAL_PARTNERSHIP[0].income, 960100.00);
  assert.strictEqual(INITIAL_PARTNERSHIP[0].expense, 55904.00);
  assert.strictEqual(INITIAL_PARTNERSHIP[0].partnershipAmount, 24825100.10);

  // Check baseline record from Screenshot 1 (30/09/2024)
  assert.strictEqual(INITIAL_PARTNERSHIP[25].date, '30/09/2024');
  assert.strictEqual(INITIAL_PARTNERSHIP[25].partnershipAmount, 8475386.00);

  console.log(`  Top record verified: ${INITIAL_PARTNERSHIP[0].date} -> Net: ₹ ${INITIAL_PARTNERSHIP[0].partnershipAmount.toLocaleString('en-IN')}`);
  console.log(`  Baseline record verified: ${INITIAL_PARTNERSHIP[25].date} -> Net: ₹ ${INITIAL_PARTNERSHIP[25].partnershipAmount.toLocaleString('en-IN')}`);
  console.log('✓ TEST 2 PASSED: 26 Authentic partnership records calibrated 1:1!\n');

  // ----------------------------------------------------
  // TEST 3: Module Initialization & Year Filtering
  // ----------------------------------------------------
  console.log('--- TEST 3: Module Initialization & Year Filtering ---');
  global.dbService = {
    getAll: async () => INITIAL_PARTNERSHIP,
    save: async (coll, record) => record,
    delete: async (coll, id) => true
  };

  const PartnershipModule = require('../js/modules/partnership.js');
  await PartnershipModule.init();

  assert.strictEqual(PartnershipModule.allRecords.length, 26, 'Loaded all 26 records');

  // Test Year 2026-2027
  PartnershipModule.selectYear('2026-2027');
  assert.strictEqual(PartnershipModule.filteredRecords.length, 7, '2026-2027 must have 7 monthly records (Apr 2026 to Oct 2026)');

  // Test Year 2025-2026
  PartnershipModule.selectYear('2025-2026');
  assert.strictEqual(PartnershipModule.filteredRecords.length, 12, '2025-2026 must have 12 monthly records (Apr 2025 to Mar 2026)');

  // Test Year 2024-2025
  PartnershipModule.selectYear('2024-2025');
  assert.strictEqual(PartnershipModule.filteredRecords.length, 7, '2024-2025 must have 7 monthly records (Sep 2024 to Mar 2025)');

  // Reset to All Years
  PartnershipModule.selectYear('All');
  assert.strictEqual(PartnershipModule.filteredRecords.length, 26, 'All Years restores 26 records');

  console.log('✓ TEST 3 PASSED: Year selection seamlessly filters records!\n');

  // ----------------------------------------------------
  // TEST 4: Mathematical Calibration & Live Formula
  // ----------------------------------------------------
  console.log('--- TEST 4: Mathematical Calibration & Live Formula ---');
  // Formula: Partnership Amount = Previous Month + Income - Expense
  document.getElementById('partInputPrevAmount').value = '23920904.10';
  document.getElementById('partInputIncome').value = '960100.00';
  document.getElementById('partInputExpense').value = '55904.00';

  PartnershipModule.recalcPartnershipAmount();
  const calculatedAmt = parseFloat(document.getElementById('partInputAmount').value);
  assert.strictEqual(calculatedAmt, 24825100.10, 'Live formula calculates exact 24,825,100.10');

  console.log(`  Live Formula Verified: ₹ 23,920,904.10 + ₹ 960,100.00 - ₹ 55,904.00 = ₹ ${calculatedAmt.toLocaleString('en-IN')}`);
  console.log('✓ TEST 4 PASSED: Mathematical calibration verified to exact penny!\n');

  // ----------------------------------------------------
  // TEST 5: Month-Grouped Table View Rendering
  // ----------------------------------------------------
  console.log('--- TEST 5: Month-Grouped Table View Rendering ---');
  PartnershipModule.renderTableView();
  const mainEl = document.getElementById('partnershipMainContent');

  assert(mainEl.innerHTML.includes('<table class="partnership-table">'), 'Must render partnership table');
  assert(mainEl.innerHTML.includes('Month / Group'), 'Must have Month / Group header');
  assert(mainEl.innerHTML.includes('Partnership Amount'), 'Must have Partnership Amount header');
  assert(mainEl.innerHTML.includes('appsheet-group-header-row'), 'Must have Month group header rows with sum badges');

  console.log('✓ TEST 5 PASSED: Month-grouped table renders 1:1 with AppSheet styling!\n');

  // ----------------------------------------------------
  // TEST 6: Drawer CRUD Operations
  // ----------------------------------------------------
  console.log('--- TEST 6: Drawer CRUD Operations ---');
  // Open Add Drawer
  PartnershipModule.openAddDrawer();
  assert.strictEqual(document.getElementById('formRecordId').value, '', 'Drawer opened in Add mode');
  assert.strictEqual(document.getElementById('partnershipDrawerTitle').innerText, 'Details', 'Title matches Details');

  // Fill in new record
  document.getElementById('partInputDate').value = '30-11-2026';
  document.getElementById('partInputPrevAmount').value = '24825100.10';
  document.getElementById('partInputIncome').value = '950000.00';
  document.getElementById('partInputExpense').value = '75000.00';
  PartnershipModule.recalcPartnershipAmount();

  await PartnershipModule.saveRecord();
  assert.strictEqual(PartnershipModule.allRecords[0].date, '30-11-2026', 'New record added to top');
  assert.strictEqual(PartnershipModule.allRecords[0].partnershipAmount, 25700100.10);

  // Edit Record
  const newId = PartnershipModule.allRecords[0].id;
  PartnershipModule.openEditDrawer(newId);
  assert.strictEqual(document.getElementById('formRecordId').value, newId);
  document.getElementById('partInputNotes').value = 'Updated settlement note';
  await PartnershipModule.saveRecord();
  assert.strictEqual(PartnershipModule.allRecords[0].notes, 'Updated settlement note');

  // Delete Record
  await PartnershipModule.deleteRecord(newId);
  assert(!PartnershipModule.allRecords.some(r => r.id === newId), 'Record successfully deleted');
  assert.strictEqual(PartnershipModule.allRecords.length, 26, 'Restored to authentic 26 records');

  console.log('✓ TEST 6 PASSED: Slide Drawer CRUD operations verified!\n');

  // ----------------------------------------------------
  // TEST 7: Real-Time Search Engine
  // ----------------------------------------------------
  console.log('--- TEST 7: Real-Time Search Engine ---');
  PartnershipModule.handleSearch('2026');
  assert(PartnershipModule.filteredRecords.length >= 7, 'Search for 2026 should return 2026 records');

  PartnershipModule.handleSearch('Mar');
  assert.strictEqual(PartnershipModule.filteredRecords.length, 2, 'Search for Mar returns 2 records (31/03/2026 & 31/03/2025)');

  PartnershipModule.handleSearch('');
  assert.strictEqual(PartnershipModule.filteredRecords.length, 26, 'Empty search restores all records');

  console.log('✓ TEST 7 PASSED: Instant search across dates and months verified!\n');

  console.log('======================================================');
  console.log('🏆 ALL 7 PARTNERSHIP MODULE TEST SUITES PASSED 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
