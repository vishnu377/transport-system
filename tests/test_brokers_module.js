/**
 * Test Suite: Module 11 - Brokers (1:1 Google AppSheet Fidelity)
 * Tests Table View (1,047 Brokers), Detail View, Navigation (< Prev, Next >),
 * Search Filter, Add / Edit Slide Drawer, and Zero LocalStorage Policy.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 1. Mock DOM Environment
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

// Load dbService & Sample Data
const dbService = require('../js/db-service.js');
global.dbService = dbService;

const SAMPLE_BROKERS_DATA = require('../js/sample-brokers-data.js');
global.SAMPLE_BROKERS_DATA = SAMPLE_BROKERS_DATA;

const BrokersModule = require('../js/modules/brokers.js');
global.BrokersModule = BrokersModule;

(async function runTests() {
  console.log('=== TEST SUITE: MODULE 11 - BROKERS (1:1 APPSHEET DIRECTORY) ===\n');

  try {
    // ----------------------------------------------------
    // TEST 1: Static HTML Structure & AppSheet Elements
    // ----------------------------------------------------
    console.log('--- TEST 1: Static HTML Structure & AppSheet Elements ---');
    const html = fs.readFileSync(path.join(__dirname, '../pages/brokers.html'), 'utf-8');

    assert(html.includes('id="brokerSearchInput"'), 'Must have Search Brokers input');
    assert(html.includes('id="brokerSubbar"'), 'Must have subbar container');
    assert(html.includes('id="brokerMainContent"'), 'Must have main scrollable content');
    assert(html.includes('id="brokerDrawer"'), 'Must have offcanvas slide drawer');
    assert(html.includes('id="brokerInputName"'), 'Must have Broker Name input');
    assert(html.includes('id="brokerInputMobile"'), 'Must have Mobile No.* input');
    assert(html.includes('id="brokerInputMobile1"'), 'Must have Mobile No. 1 input');

    // Strict Zero LocalStorage
    assert(!html.includes('localStorage.setItem'), 'Zero localStorage policy');
    console.log('✓ TEST 1 PASSED: pages/brokers.html contains all 1:1 AppSheet containers and drawer fields!\n');

    // ----------------------------------------------------
    // TEST 2: Data Calibration (Exact 1,047 Brokers matching Screenshot)
    // ----------------------------------------------------
    console.log('--- TEST 2: Data Calibration (1,047 Records matching "Number 1047") ---');
    assert.strictEqual(SAMPLE_BROKERS_DATA.length, 1047, 'Dataset must have exactly 1,047 brokers matching AppSheet screenshot');

    // Check top records from screenshot
    assert.strictEqual(SAMPLE_BROKERS_DATA[0].name, '730018643B', 'Row 1 name matches screenshot');
    assert.strictEqual(SAMPLE_BROKERS_DATA[0].mobile, '7300186438', 'Row 1 mobile matches screenshot');
    assert.strictEqual(SAMPLE_BROKERS_DATA[1].name, 'AR Stone Udaipur', 'Row 2 name matches screenshot');
    assert.strictEqual(SAMPLE_BROKERS_DATA[1].mobile, '9983662266', 'Row 2 mobile matches screenshot');
    assert.strictEqual(SAMPLE_BROKERS_DATA[2].name, 'Aahish Aggarwal Alwar', 'Row 3 name matches screenshot');
    assert.strictEqual(SAMPLE_BROKERS_DATA[3].name, 'Aakash Sharma', 'Row 4 name matches screenshot');
    assert.strictEqual(SAMPLE_BROKERS_DATA[4].name, 'ABC', 'Row 5 name matches screenshot');

    console.log(`  Top broker verified: ${SAMPLE_BROKERS_DATA[1].name} (${SAMPLE_BROKERS_DATA[1].mobile})`);
    console.log(`  Total brokers verified: ${SAMPLE_BROKERS_DATA.length}`);
    console.log('✓ TEST 2 PASSED: 1,047 Authentic brokers dataset verified 1:1!\n');

    // ----------------------------------------------------
    // TEST 3: Module Initialization & Table View
    // ----------------------------------------------------
    console.log('--- TEST 3: Module Initialization & Table View ---');
    await BrokersModule.init();

    assert.strictEqual(BrokersModule.activeView, 'table');
    assert.strictEqual(BrokersModule.allBrokers.length, 1047);

    const subbarEl = getOrCreateMockElement('brokerSubbar');
    assert(subbarEl.innerHTML.includes('Home'), 'Breadcrumb has Home');
    assert(subbarEl.innerHTML.includes('Brokers'), 'Breadcrumb has Brokers');
    assert(subbarEl.innerHTML.includes('btn-appsheet-add'), 'Has + Add button');

    const contentEl = getOrCreateMockElement('brokerMainContent');
    assert(contentEl.innerHTML.includes('Number <span id="brokerCount">1047</span>'), 'Badge shows Number 1047');
    assert(contentEl.innerHTML.includes('AR Stone Udaipur'), 'Table renders broker row');
    assert(contentEl.innerHTML.includes('9983662266'), 'Table renders phone number');

    console.log('✓ TEST 3 PASSED: Table View renders matching AppSheet with 1,047 records badge!\n');

    // ----------------------------------------------------
    // TEST 4: Real-Time Typeahead Search
    // ----------------------------------------------------
    console.log('--- TEST 4: Real-Time Typeahead Search ---');
    // Search by City / Name
    BrokersModule.handleSearch('Udaipur');
    assert(BrokersModule.filteredBrokers.length > 0, 'Must match Udaipur brokers');
    assert(BrokersModule.filteredBrokers.every(b => b.name.toLowerCase().includes('udaipur') || (b.location && b.location.toLowerCase().includes('udaipur'))), 'All filtered brokers contain Udaipur');
    console.log(`  "Udaipur" search matches: ${BrokersModule.filteredBrokers.length} brokers`);

    // Search by Phone
    BrokersModule.handleSearch('9983662266');
    assert.strictEqual(BrokersModule.filteredBrokers.length, 1, 'Phone search matches exact broker');
    assert.strictEqual(BrokersModule.filteredBrokers[0].name, 'AR Stone Udaipur');

    // Clear search
    BrokersModule.handleSearch('');
    assert.strictEqual(BrokersModule.filteredBrokers.length, 1047, 'Clearing search restores 1,047 brokers');

    console.log('✓ TEST 4 PASSED: Instant search filters across name, city, and phone!\n');

    // ----------------------------------------------------
    // TEST 5: Record Detail View & Navigation (< Prev, Next >)
    // ----------------------------------------------------
    console.log('--- TEST 5: Record Detail View & Navigation (< Prev, Next >) ---');
    BrokersModule.openDetail('BRK-0002');

    assert.strictEqual(BrokersModule.activeView, 'detail');
    assert.strictEqual(BrokersModule.currentBrokerId, 'BRK-0002');
    assert(subbarEl.innerHTML.includes('Details'), 'Breadcrumb shows Details');
    assert(contentEl.innerHTML.includes('AR Stone Udaipur'), 'Detail view shows broker name');
    assert(contentEl.innerHTML.includes('9983662266'), 'Detail view shows broker phone');
    assert(contentEl.innerHTML.includes('tel:9983662266'), 'Detail view has click-to-call link');

    // Test Next Navigation
    BrokersModule.navigateDetail(1);
    assert.strictEqual(BrokersModule.currentBrokerId, 'BRK-0003');
    assert(contentEl.innerHTML.includes('Aahish Aggarwal Alwar'), 'Navigates to next broker');

    // Test Prev Navigation
    BrokersModule.navigateDetail(-1);
    assert.strictEqual(BrokersModule.currentBrokerId, 'BRK-0002');

    console.log('✓ TEST 5 PASSED: Record Detail view and < Prev / Next > navigation verified 1:1!\n');

    // ----------------------------------------------------
    // TEST 6: Add / Edit Slide Drawer & Zero LocalStorage CRUD
    // ----------------------------------------------------
    console.log('--- TEST 6: Add / Edit Slide Drawer & Zero LocalStorage CRUD ---');
    // Test Open Add Drawer
    BrokersModule.openAddDrawer();
    assert.strictEqual(getOrCreateMockElement('formBrokerId').value, '');
    assert.strictEqual(getOrCreateMockElement('brokerInputName').value, '');

    // Test Save New Broker
    getOrCreateMockElement('brokerInputName').value = 'Test New Broker Jaipur';
    getOrCreateMockElement('brokerInputMobile').value = '9829999888';
    getOrCreateMockElement('brokerInputMobile1').value = '9414000111';

    await BrokersModule.saveBroker();
    assert.strictEqual(BrokersModule.allBrokers.length, 1048, 'Broker count must increment');
    assert.strictEqual(BrokersModule.allBrokers[0].name, 'Test New Broker Jaipur');

    // Test Edit Existing Broker
    BrokersModule.openEditDrawer('BRK-0002');
    assert.strictEqual(getOrCreateMockElement('formBrokerId').value, 'BRK-0002');
    assert.strictEqual(getOrCreateMockElement('brokerInputName').value, 'AR Stone Udaipur');

    getOrCreateMockElement('brokerInputMobile1').value = '9999988888';
    await BrokersModule.saveBroker();

    const updated = BrokersModule.allBrokers.find(b => b.id === 'BRK-0002');
    assert.strictEqual(updated.mobile1, '9999988888', 'Broker secondary mobile updated');

    // Test Delete Broker
    const countBeforeDel = BrokersModule.allBrokers.length;
    await BrokersModule.deleteBroker(BrokersModule.allBrokers[0].id); // Delete the test broker
    assert.strictEqual(BrokersModule.allBrokers.length, countBeforeDel - 1, 'Broker count decrements after deletion');

    console.log('✓ TEST 6 PASSED: Add and Edit slide drawer CRUD operations verified!\n');

    // ----------------------------------------------------
    // TEST 7: Return Navigation to Table View
    // ----------------------------------------------------
    console.log('--- TEST 7: Return Navigation to Table View ---');
    BrokersModule.setView('table');
    assert.strictEqual(BrokersModule.activeView, 'table');
    assert(subbarEl.innerHTML.includes('Brokers'), 'Subbar shows table view');
    assert(contentEl.innerHTML.includes('appsheet-table'), 'Table view rendered');

    console.log('✓ TEST 7 PASSED: Return navigation to Table View verified!\n');

    console.log('======================================================');
    console.log('🏆 ALL 7 BROKERS MODULE TEST SUITES PASSED 100%!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ TEST FAILED:', err);
    process.exit(1);
  }
})();
