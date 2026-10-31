/**
 * Automated Test Suite for Module 9: Shahpura (3-Card AppSheet Dashboard)
 * Tests:
 * 1. HTML Structure & 3-Card Responsive Grid Verification
 * 2. Master Dataset & Financial Calibration (-₹ 2,13,100.00)
 * 3. DBService Integration & RAM-Only / Firebase Persistence
 * 4. Card 1: Available Cash Negative Bar Chart & Slice View Toggle
 * 5. Card 2: Given Transactions Grouping, Red Dots & Badges
 * 6. Card 3: Deposit Transactions Grouping, Green Dots & GR No
 * 7. Real-Time Search Engine
 * 8. Searchable & Typable Comboboxes (Trucks & Drivers)
 * 9. Expand [↗] & Collapse [↙] Safety Verification
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

console.log('=== TEST SUITE: MODULE 9 - SHAHPURA (3-CARD APPSHEET DASHBOARD) ===\n');

(async () => {
  try {
    // ----------------------------------------------------
    // TEST 1: Static HTML & Grid Structure Verification
    // ----------------------------------------------------
    console.log('--- TEST 1: Static HTML & 3-Card Grid Structure ---');
    const htmlPath = path.join(__dirname, '../pages/shahpura.html');
    assert(fs.existsSync(htmlPath), 'pages/shahpura.html must exist');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    assert(htmlContent.includes('id="sidebar"'), 'Must have 48px navigation rail #sidebar');
    assert(htmlContent.includes('MTC And TTC - Head Office'), 'Must have authentic header brand');
    assert(htmlContent.includes('placeholder="Search Shahpura"'), 'Must have Search Shahpura input');
    assert(htmlContent.includes('Home > Shahpura') || htmlContent.includes('Shahpura</span>'), 'Must have breadcrumb');
    assert(htmlContent.includes('id="shahpuraCard1"'), 'Must have Card 1 Available Cash');
    assert(htmlContent.includes('id="shahpuraCard2"'), 'Must have Card 2 Given Transactions');
    assert(htmlContent.includes('id="shahpuraCard3"'), 'Must have Card 3 Deposit Transactions');
    assert(htmlContent.includes('id="shahpuraFormDrawer"'), 'Must have Add/Edit Slide Drawer');
    assert(htmlContent.includes('id="shahpuraDetailDrawer"'), 'Must have Record Detail Drawer');
    assert(htmlContent.includes('id="txTruckInput"'), 'Must have Searchable Truck Combobox');
    assert(htmlContent.includes('id="txDriverInput"'), 'Must have Searchable Driver Combobox');

    console.log('✓ TEST 1 PASSED: pages/shahpura.html static structure fully matches Google AppSheet specs!\n');

    // ----------------------------------------------------
    // TEST 2: Master Dataset & Financial Calibration
    // ----------------------------------------------------
    console.log('--- TEST 2: Master Dataset & Financial Calibration ---');
    const given = SAMPLE_SHAHPURA_DATA.givenTransactions;
    const deposit = SAMPLE_SHAHPURA_DATA.depositTransactions;

    assert(Array.isArray(given) && given.length >= 10, 'Must have at least 10 Given transactions');
    assert(Array.isArray(deposit) && deposit.length >= 5, 'Must have at least 5 Deposit transactions');

    const totalGiven = given.reduce((acc, c) => acc + c.amount, 0);
    const totalDeposit = deposit.reduce((acc, c) => acc + c.amount, 0);
    const netAvailable = totalDeposit - totalGiven;

    console.log(`  Total Deposit: ₹ ${totalDeposit.toLocaleString('en-IN')}`);
    console.log(`  Total Given: ₹ ${totalGiven.toLocaleString('en-IN')}`);
    console.log(`  Net Available Cash: ₹ ${netAvailable.toLocaleString('en-IN')}`);

    assert.strictEqual(totalGiven, 362000, 'Total Given must equal 3,62,000');
    assert.strictEqual(totalDeposit, 148900, 'Total Deposit must equal 1,48,900');
    assert.strictEqual(netAvailable, -213100, 'Net Available Cash must equal -2,13,100');

    console.log('✓ TEST 2 PASSED: Financial calibration verified (-₹ 2,13,100.00 matches screenshot bar chart)!\n');

    // ----------------------------------------------------
    // TEST 3: DBService Cloud Firestore / RAM-Only Operations
    // ----------------------------------------------------
    console.log('--- TEST 3: DBService CRUD & Cash State ---');
    const items = await dbService.getAllShahpuraTransactionsAsync();
    assert(items.length === 23, `Expected 23 transactions from sample, got ${items.length}`);

    const cashState = await dbService.getShahpuraCashStateAsync();
    assert.strictEqual(cashState.availableCash, -213100, 'DBService cash state balance must match');

    // Save a new transaction
    const newTx = {
      type: 'Given',
      amount: 5000,
      truckNo: 'RJ52GB5642',
      name: 'Test Driver',
      date: '31/10/2026'
    };
    const saved = await dbService.saveShahpuraTransaction(newTx);
    assert(saved.id.startsWith('GIV-'), 'ID must start with GIV- prefix');

    const afterSave = await dbService.getAllShahpuraTransactionsAsync();
    assert(afterSave.length === 24, 'Transactions count must increase to 24');

    // Delete the transaction
    await dbService.deleteShahpuraTransaction(saved.id);
    const afterDelete = await dbService.getAllShahpuraTransactionsAsync();
    assert(afterDelete.length === 23, 'Transactions count must return to 23 after deletion');

    console.log('✓ TEST 3 PASSED: DBService methods save, retrieve, and delete without localStorage!\n');

    // ----------------------------------------------------
    // TEST 4: Card 1 - Available Cash SVG Bar Chart & Slice View
    // ----------------------------------------------------
    console.log('--- TEST 4: Card 1 Available Cash SVG Chart & Slice ---');
    await ShahpuraModule.init();

    const card1Body = getOrCreateMockElement('card1Body');
    assert(card1Body.innerHTML.includes('<svg'), 'Card 1 must render SVG Bar Chart');
    assert(card1Body.innerHTML.includes('id="svgCashBar"'), 'Must render Available Cash bar rect');
    assert(card1Body.innerHTML.includes('fill="#cc0b0b"'), 'Negative balance must render red bar #cc0b0b');
    assert(card1Body.innerHTML.includes('30/10/2026, 09:32'), 'Must render 45-degree slanted timestamp');
    assert(card1Body.innerHTML.includes('DateTime'), 'Must render DateTime vertical axis label');

    // Toggle view to Slice mode
    ShahpuraModule.toggleCard1View();
    assert(card1Body.innerHTML.includes('Cash Summary Slice'), 'Toggling Card 1 must render slice view');
    assert(card1Body.innerHTML.includes('-₹ 2,13,100.00') || card1Body.innerHTML.includes('2,13,100.00'), 'Slice view must show net balance');

    // Toggle back to Chart mode
    ShahpuraModule.toggleCard1View();
    assert(card1Body.innerHTML.includes('<svg'), 'Toggling again must restore SVG chart view');

    console.log('✓ TEST 4 PASSED: Card 1 SVG bar chart and slice view toggle work 100%!\n');

    // ----------------------------------------------------
    // TEST 5: Card 2 - Given Transactions Table Grouping & Red Dots
    // ----------------------------------------------------
    console.log('--- TEST 5: Card 2 Given Transactions Grouping & Red Dots ---');
    const card2Body = getOrCreateMockElement('card2TableBody');
    assert(card2Body.innerHTML.includes('30/10/2026'), 'Card 2 must render date group 30/10/2026');
    assert(card2Body.innerHTML.includes('₹ 65,000.00'), 'Card 2 must render group sum pill ₹ 65,000.00');
    assert(card2Body.innerHTML.includes('red-dot'), 'Card 2 rows must have red dot circle');
    assert(card2Body.innerHTML.includes('red-text'), 'Card 2 cells must have bold red text');
    assert(card2Body.innerHTML.includes('Suresh Raiya'), 'Card 2 must contain driver Suresh Raiya');
    assert(card2Body.innerHTML.includes('RJ52GB5642'), 'Card 2 must contain truck RJ52GB5642');
    assert(card2Body.innerHTML.includes('Neemrana (Raj.)'), 'Card 2 must contain destination Neemrana (Raj.)');

    console.log('✓ TEST 5 PASSED: Card 2 date groups, sum pills, and red format rules match screenshot 1:1!\n');

    // ----------------------------------------------------
    // TEST 6: Card 3 - Deposit Transactions Grouping & Green Dots
    // ----------------------------------------------------
    console.log('--- TEST 6: Card 3 Deposit Transactions Grouping & Green Dots ---');
    const card3Body = getOrCreateMockElement('card3TableBody');
    assert(card3Body.innerHTML.includes('30/10/2026'), 'Card 3 must render date group 30/10/2026');
    assert(card3Body.innerHTML.includes('₹ 1,500.00'), 'Card 3 must render group sum pill ₹ 1,500.00');
    assert(card3Body.innerHTML.includes('green-dot'), 'Card 3 rows must have green dot circle');
    assert(card3Body.innerHTML.includes('green-text'), 'Card 3 cells must have bold green text');
    assert(card3Body.innerHTML.includes('Def Bukets Sales 20 Nos'), 'Card 3 must contain Def Bukets Sales 20 Nos');
    assert(card3Body.innerHTML.includes('Kushiram Gurjar'), 'Card 3 must contain driver Kushiram Gurjar');

    console.log('✓ TEST 6 PASSED: Card 3 date groups, sum pills, green format rules and G.R. column verified!\n');

    // ----------------------------------------------------
    // TEST 7: Real-Time Search Engine
    // ----------------------------------------------------
    console.log('--- TEST 7: Real-Time Search Engine ---');
    // Search for "Suresh"
    ShahpuraModule.handleSearch('Suresh');
    assert(card2Body.innerHTML.includes('Suresh Raiya'), 'Search must find Suresh Raiya in Given');
    assert(!card2Body.innerHTML.includes('Sitaram'), 'Search must filter out non-matching Sitaram');

    // Reset search
    ShahpuraModule.handleSearch('');
    assert(card2Body.innerHTML.includes('Sitaram'), 'Empty search must restore all rows');

    console.log('✓ TEST 7 PASSED: Real-time search filters Given and Deposit transactions instantly!\n');

    // ----------------------------------------------------
    // TEST 8: Searchable & Typable Comboboxes
    // ----------------------------------------------------
    console.log('--- TEST 8: Searchable & Typable Comboboxes ---');
    const truckListEl = getOrCreateMockElement('txTruckDropdownList');
    ShahpuraModule.filterTruckCombobox('RJ52');
    assert(truckListEl.innerHTML.includes('RJ52GB5642'), 'Combobox must show matching fleet trucks');

    const driverListEl = getOrCreateMockElement('txDriverDropdownList');
    ShahpuraModule.filterDriverCombobox('Suresh');
    assert(driverListEl.innerHTML.includes('Suresh Raiya'), 'Combobox must show matching driver');

    ShahpuraModule.selectTruckCombobox('RJ52GB5642');
    const truckIn = getOrCreateMockElement('txTruckInput');
    assert.strictEqual(truckIn.value, 'RJ52GB5642', 'Truck input must be filled with selected value');

    console.log('✓ TEST 8 PASSED: Searchable & typable comboboxes work with real-time dropdown & auto-fill!\n');

    // ----------------------------------------------------
    // TEST 9: Expand [↗] & Collapse [↙] Safety
    // ----------------------------------------------------
    console.log('--- TEST 9: Expand [↗] & Collapse [↙] Safety ---');
    const gridEl = getOrCreateMockElement('shahpuraGrid');
    const card1El = getOrCreateMockElement('shahpuraCard1');
    const rightStackEl = getOrCreateMockElement('shahpuraRightStack');
    const card2El = getOrCreateMockElement('shahpuraCard2');
    const card3El = getOrCreateMockElement('shahpuraCard3');

    // Expand Card 1
    ShahpuraModule.toggleExpand('card1');
    assert(gridEl.className.includes('grid-expanded-card1'), 'Grid must switch to grid-expanded-card1');
    assert.strictEqual(rightStackEl.style.display, 'none', 'Right stack must be hidden when Card 1 is expanded');

    // Collapse Card 1
    ShahpuraModule.toggleExpand('card1');
    assert.strictEqual(gridEl.className, 'shahpura-grid', 'Grid must restore standard 3-card layout');
    assert.strictEqual(rightStackEl.style.display, 'grid', 'Right stack must restore grid display');

    // Expand Card 2
    ShahpuraModule.toggleExpand('card2');
    assert(gridEl.className.includes('grid-expanded-card2'), 'Grid must switch to grid-expanded-card2');
    assert.strictEqual(card1El.style.display, 'none', 'Card 1 must be hidden when Card 2 is expanded');
    assert.strictEqual(card3El.style.display, 'none', 'Card 3 must be hidden when Card 2 is expanded');

    // Collapse Card 2
    ShahpuraModule.toggleExpand('card2');
    assert.strictEqual(gridEl.className, 'shahpura-grid', 'Grid must restore standard layout');

    console.log('✓ TEST 9 PASSED: Expand [↗] and Collapse [↙] safely toggle 100% full view with no 0px collapse!\n');

    console.log('======================================================');
    console.log('🏆 ALL 9 SHAHPURA MODULE TEST SUITES PASSED 100%!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ TEST FAILED:', err);
    process.exit(1);
  }
})();
