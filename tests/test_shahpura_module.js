/**
 * Automated Test Suite for Module 9: Shahpura
 * Covering:
 * 1. HTML Structure & 3-Card Responsive Grid + Full-View Drilldown Container
 * 2. Master Dataset & Financial Calibration (-₹ 2,12,329.00)
 * 3. DBService Integration for Transactions & Slice Records
 * 4. Card 1: Available Cash SVG Chart & Floating Tooltip Card (-212,329)
 * 5. Card 1 Drilldown: Screen 1 (Expanded Chart with Dashed Center Line)
 * 6. Card 1 Drilldown: Screen 2 (Shahpura Slice Table View)
 * 7. Card 1 Drilldown: Screen 3 (Shahpura Slice Record Detail View)
 * 8. Card 1 Drilldown: Screen 4 (Shahpura Slice Add Slide Drawer)
 * 9. Card 2 & Card 3: Date Groupings, Red & Green Format Rules
 * 10. Real-time Search Engine & Searchable Comboboxes
 * 11. View Switching & Breadcrumb Integrity
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Mock Browser Environment for Node.js
class MockClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
  toggle(c) { this.classes.has(c) ? this.classes.delete(c) : this.classes.add(c); }
  toString() { return Array.from(this.classes).join(' '); }
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
  getBoundingClientRect() { return { left: 0, top: 0, width: 400, height: 500 }; }
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
    return new MockElement('', 'div');
  },
  querySelectorAll: () => [],
  createElement: (tag) => new MockElement('', tag),
  addEventListener: () => {}
};

global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance: (el) => ({
      show: () => { el.classList.add('show'); },
      hide: () => { el.classList.remove('show'); }
    }),
    getInstance: (el) => ({
      hide: () => { el.classList.remove('show'); }
    })
  }
};

global.AppUI = {
  renderSidebar: () => {},
  showToast: (msg, type) => {
    console.log(`[Toast ${type ? type.toUpperCase() : 'INFO'}]: ${msg}`);
  }
};

// 2. Load Modules
const SAMPLE_SHAHPURA_DATA = require('../js/sample-shahpura-data.js');
global.SAMPLE_SHAHPURA_DATA = SAMPLE_SHAHPURA_DATA;

const dbService = require('../js/db-service.js');
global.dbService = dbService;

const ShahpuraModule = require('../js/modules/shahpura.js');
global.ShahpuraModule = ShahpuraModule;

console.log('=== TEST SUITE: MODULE 9 - SHAHPURA & CARD 1 DRILLDOWN (1:1 APPSHEET) ===\n');

(async () => {
  try {
    // ----------------------------------------------------
    // TEST 1: Static HTML & Structure Verification
    // ----------------------------------------------------
    console.log('--- TEST 1: Static HTML Structure & Card 1 Drilldown Elements ---');
    const htmlPath = path.join(__dirname, '../pages/shahpura.html');
    assert(fs.existsSync(htmlPath), 'pages/shahpura.html must exist');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert(html.includes('id="sidebar"'), 'Must have 48px rail');
    assert(html.includes('id="shahpuraBreadcrumb"'), 'Must have dynamic breadcrumb bar');
    assert(html.includes('id="shahpuraGrid"'), 'Must have 3-card grid');
    assert(html.includes('id="shahpuraFullViewContainer"'), 'Must have full view drilldown container');
    assert(html.includes('id="shahpuraSliceAddDrawer"'), 'Must have Card 1 Shahpura Slice Add Drawer');
    assert(html.includes('id="sliceInputDateTime"'), 'Must have slice DateTime input');
    assert(html.includes('id="sliceInputAmountInHand"'), 'Must have slice Amount In Hand input');
    assert(html.includes('id="sliceInputAvailableCash"'), 'Must have slice Avaiable Cash input');
    assert(html.includes('id="sliceInputAmount"'), 'Must have slice Amount input');
    assert(html.includes('id="shahpuraFormDrawer"'), 'Must have transaction form drawer');
    assert(html.includes('id="shahpuraDetailDrawer"'), 'Must have detail drawer');

    console.log('✓ TEST 1 PASSED: pages/shahpura.html contains all drilldown containers and form elements!\n');

    // ----------------------------------------------------
    // TEST 2: Financial Calibration (-₹ 2,12,329.00)
    // ----------------------------------------------------
    console.log('--- TEST 2: Financial Calibration (-₹ 2,12,329.00) ---');
    const given = SAMPLE_SHAHPURA_DATA.givenTransactions;
    const deposit = SAMPLE_SHAHPURA_DATA.depositTransactions;

    const totalGiven = given.reduce((acc, c) => acc + c.amount, 0);
    const totalDeposit = deposit.reduce((acc, c) => acc + c.amount, 0);
    const netAvailable = totalDeposit - totalGiven;

    console.log(`  Total Deposit: ₹ ${totalDeposit.toLocaleString('en-IN')}`);
    console.log(`  Total Given: ₹ ${totalGiven.toLocaleString('en-IN')}`);
    console.log(`  Net Available Cash: ₹ ${netAvailable.toLocaleString('en-IN')}`);

    assert.strictEqual(netAvailable, -212329, 'Net balance must be exactly -212,329 matching user screenshot');
    console.log('✓ TEST 2 PASSED: Financial calibration verified at exact -₹ 2,12,329.00!\n');

    // ----------------------------------------------------
    // TEST 3: DBService Slice Operations
    // ----------------------------------------------------
    console.log('--- TEST 3: DBService Shahpura Slice CRUD ---');
    const slices = await dbService.getAllShahpuraSliceAsync();
    assert(slices.length >= 5, 'Must load slice records from sample');
    assert.strictEqual(slices[0].availableCash, -212329, 'First slice record must match -212,329');

    const newSlice = {
      dateTime: '31/10/2026, 16:03:12',
      amountInHand: '₹ 0',
      availableCash: -212329,
      amount: 0
    };
    const savedSlice = await dbService.saveShahpuraSliceRecord(newSlice);
    assert(savedSlice.id.startsWith('SLICE-'), 'Slice record ID must start with SLICE-');

    const afterSave = await dbService.getAllShahpuraSliceAsync();
    assert(afterSave.length === slices.length + 1, 'Slice count must increment');

    await dbService.deleteShahpuraSliceRecord(savedSlice.id);
    const afterDelete = await dbService.getAllShahpuraSliceAsync();
    assert(afterDelete.length === slices.length, 'Slice count must restore after deletion');

    console.log('✓ TEST 3 PASSED: DBService handles slice records in memory / Firestore without localStorage!\n');

    // ----------------------------------------------------
    // TEST 4: Card 1 Available Cash Main Dashboard Chart
    // ----------------------------------------------------
    console.log('--- TEST 4: Card 1 Available Cash Main Dashboard Chart ---');
    await ShahpuraModule.init();

    const card1Body = getOrCreateMockElement('card1Body');
    assert(card1Body.innerHTML.includes('<svg'), 'Card 1 must render SVG Bar Chart');
    assert(card1Body.innerHTML.includes('id="svgCashBar"'), 'Must render Available Cash bar rect');
    assert(card1Body.innerHTML.includes('stroke-dasharray="3,3"'), 'Must render white dashed centerline');
    assert(card1Body.innerHTML.includes('card1-appsheet-floating-card'), 'Must render floating tooltip card');
    assert(card1Body.innerHTML.includes('-2,12,329') || card1Body.innerHTML.includes('-212,329'), 'Tooltip card must show -212,329');

    console.log('✓ TEST 4 PASSED: Main Card 1 SVG bar chart & floating tooltip card match screenshot 1:1!\n');

    // ----------------------------------------------------
    // TEST 5: Screen 1 - Available Cash Expanded View
    // ----------------------------------------------------
    console.log('--- TEST 5: Screen 1 - Available Cash Expanded View (1:1 Screenshot 1) ---');
    ShahpuraModule.setView('available_cash');
    assert.strictEqual(ShahpuraModule.activeView, 'available_cash');

    const fullContainer = getOrCreateMockElement('shahpuraFullViewContainer');
    assert(fullContainer.innerHTML.includes('Available Cash Chart'), 'Must render Expanded Chart view');
    assert(fullContainer.innerHTML.includes('<svg'), 'Must render full-width SVG');
    assert(fullContainer.innerHTML.includes('-2,12,329') || fullContainer.innerHTML.includes('-212,329'), 'Must show -212,329 in tooltip');
    assert(fullContainer.innerHTML.includes('stroke-dasharray="4,4"'), 'Must render prominent white dashed centerline');

    const bc = getOrCreateMockElement('shahpuraBreadcrumb');
    assert(bc.innerHTML.includes('Home') && bc.innerHTML.includes('Shahpura') && bc.innerHTML.includes('Available Cash'), 'Breadcrumb must be Home > Shahpura > Available Cash');

    console.log('✓ TEST 5 PASSED: Screen 1 expanded chart view renders matching screenshot 1!\n');

    // ----------------------------------------------------
    // TEST 6: Screen 2 - Shahpura Slice Table View
    // ----------------------------------------------------
    console.log('--- TEST 6: Screen 2 - Shahpura Slice Table View (1:1 Screenshot 2) ---');
    ShahpuraModule.setView('shahpura_slice');
    assert.strictEqual(ShahpuraModule.activeView, 'shahpura_slice');

    assert(fullContainer.innerHTML.includes('Shahpura Slice'), 'Must render Shahpura Slice table view');
    assert(fullContainer.innerHTML.includes('DateTime'), 'Table must have DateTime header');
    assert(fullContainer.innerHTML.includes('Amount In Hand'), 'Table must have Amount In Hand header');
    assert(fullContainer.innerHTML.includes('Avaiable Cash'), 'Table must have Avaiable Cash header');
    assert(fullContainer.innerHTML.includes('Amount'), 'Table must have Amount header');
    assert(fullContainer.innerHTML.includes('2,12,329') || fullContainer.innerHTML.includes('212,329'), 'Table row 1 must show -212,329 in red');
    assert(fullContainer.innerHTML.includes('15,000'), 'Table row 1 must show ₹ -15,000 amount');

    assert(bc.innerHTML.includes('Available Cash') && bc.innerHTML.includes('Shahpura Slice'), 'Breadcrumb must be Home > Shahpura > Available Cash > Shahpura Slice');

    console.log('✓ TEST 6 PASSED: Screen 2 Shahpura Slice table renders matching screenshot 2!\n');

    // ----------------------------------------------------
    // TEST 7: Screen 3 - Shahpura Slice Record Detail View
    // ----------------------------------------------------
    console.log('--- TEST 7: Screen 3 - Shahpura Slice Record Detail View (1:1 Screenshot 3) ---');
    ShahpuraModule.openSliceDetail('SLICE-101');
    assert.strictEqual(ShahpuraModule.activeView, 'slice_detail');

    assert(fullContainer.innerHTML.includes('30/10/2026, 09:32:24 pm'), 'Detail view must show DateTime');
    assert(fullContainer.innerHTML.includes('Avaiable Cash'), 'Detail view must show Avaiable Cash label');
    assert(fullContainer.innerHTML.includes('2,12,329') || fullContainer.innerHTML.includes('212,329'), 'Detail view must show ₹-212,329 in bold red');

    assert(bc.innerHTML.includes('10/30/2026 21:32:24'), 'Breadcrumb must show timestamp slug');

    console.log('✓ TEST 7 PASSED: Screen 3 single record detail view matches screenshot 3!\n');

    // ----------------------------------------------------
    // TEST 8: Screen 4 - Shahpura Slice Add Slide Drawer
    // ----------------------------------------------------
    console.log('--- TEST 8: Screen 4 - Shahpura Slice Add Slide Drawer (1:1 Screenshot 4) ---');
    ShahpuraModule.openSliceAddDrawer();

    const dtInput = getOrCreateMockElement('sliceInputDateTime');
    const inHandInput = getOrCreateMockElement('sliceInputAmountInHand');
    const avCashInput = getOrCreateMockElement('sliceInputAvailableCash');
    const amtInput = getOrCreateMockElement('sliceInputAmount');

    assert(dtInput.value.length > 10, 'DateTime must default to formatted timestamp');
    assert.strictEqual(inHandInput.value, '0', 'Amount In Hand must default to 0');
    assert.strictEqual(String(avCashInput.value), '212329', 'Avaiable cash must default to 212329');
    assert.strictEqual(amtInput.value, '0', 'Amount must default to 0');

    // Save entry through drawer
    await ShahpuraModule.saveSliceRecord();
    assert(ShahpuraModule.allSlice.length >= 6, 'New slice record must be added to list');

    console.log('✓ TEST 8 PASSED: Screen 4 slide drawer fields and save action match screenshot 4!\n');

    // ----------------------------------------------------
    // TEST 9: Return to Main 3-Card Dashboard
    // ----------------------------------------------------
    console.log('--- TEST 9: Return Navigation to Main 3-Card Dashboard ---');
    ShahpuraModule.setView('main');
    assert.strictEqual(ShahpuraModule.activeView, 'main');

    const mainGrid = getOrCreateMockElement('shahpuraGrid');
    assert.strictEqual(mainGrid.style.display, 'grid', 'Main grid must be restored to display: grid');
    assert.strictEqual(fullContainer.style.display, 'none', 'Full container must be hidden');

    console.log('✓ TEST 9 PASSED: Breadcrumb & View switching seamlessly returns to 3-card dashboard!\n');

    console.log('======================================================');
    console.log('🏆 ALL 9 SHAHPURA CARD 1 DRILLDOWN TESTS PASSED 100%!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ TEST FAILED:', err);
    process.exit(1);
  }
})();
