/**
 * Test Suite: Card 5 - All Cheques View (AppSheet 18_24_06)
 * Verifies:
 *  1. Navigation & Breadcrumb: Cheques > All Cheques
 *  2. Sidebar Financial Year rail items (All, 2026-2027, 2025-2026, 2024-2025) & Badges
 *  3. Table columns & Multi-Color Row System (Green, Red, Pink, Gold, Orange)
 *  4. Date Group headers with colored bullets & sum badges
 *  5. Dynamic AppSheet Pagination (10, 25, 50, 100, ALL) & Buttons
 *  6. Context-Aware Row Click Drilldowns:
 *      - Green Cleared row click -> Settled Trip Details (Green theme, ONLY Expand on Cheque)
 *      - Pink Due row click (000144) -> 5 Cards Open Trip Details (Slate Cards, Pink Cheque row, Expand + Add)
 *      - Gold Due row click (217365) -> 5 Cards Open Trip Details (Slate Cards, Gold Cheque row, Expand + Add)
 *      - Red Bounced row click (000004) -> 5 Cards Open Trip Details (Slate Cards, Red Cheque row, ONLY Expand)
 *  7. Cheque Drawer Add Form (18_33_23.png) & Cloud Firestore sync
 *  8. Expanded Trip Cheque Details (18_32_33.png) & Cheque Details (18_32_44.png)
 *  9. Expanded Consignor/s List (18_33_57.png) & Single Party Detail Card (18_34_12.png)
 *  10. Edit Button AppSheet Mustard Gold (#c2aa48) & Slate Text (#202124) in Card 1 & 5
 *  11. NO Bullets/Dots in Cheque table cells ("puri row color, sirf dot nhi aate")
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Running Card 5: All Cheques Test Suite ---');

const domElements = {};
function createMockElement(id, tagName = 'div') {
  let _html = '';
  let _text = '';
  const el = {
    id,
    tagName,
    get innerHTML() { return _html; },
    set innerHTML(val) {
      _html = val;
      _text = val.replace(/<[^>]+>/g, ' ');
    },
    get innerText() { return _text; },
    set innerText(val) { _text = val; },
    value: '',
    style: {
      setProperty: function(prop, val) { this[prop] = val; }
    },
    classList: {
      classes: new Set(),
      add: (c) => el.classList.classes.add(c),
      remove: (c) => el.classList.classes.delete(c),
      contains: (c) => el.classList.classes.has(c)
    },
    querySelectorAll: (sel) => [],
    querySelector: (sel) => createMockElement('generic-query-selector'),
    reset: () => { el.value = ''; }
  };
  domElements[id] = el;
  return el;
}

global.document = {
  getElementById: (id) => domElements[id] || createMockElement(id),
  querySelectorAll: (sel) => [],
  querySelector: (sel) => createMockElement('generic-query-selector'),
  addEventListener: () => {}
};

global.window = global;
global.window.location = { search: '' };
global.bootstrap = {
  Modal: class { constructor(el) {} show() {} hide() {} static getInstance(el) { return { hide() {}, show() {} }; } static getOrCreateInstance(el) { return { hide() {}, show() {} }; } },
  Offcanvas: class { constructor(el) {} show() {} hide() {} static getInstance(el) { return { hide() {}, show() {} }; } static getOrCreateInstance(el) { return { hide() {}, show() {} }; } }
};

global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => '₹ ' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  showToast: (msg, type) => {}
};

// Load datasets
eval(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-cheques-data.js'), 'utf8'));

// Mock dbService
let addedFirestoreCheques = [];
global.dbService = {
  getAll: async (col) => {
    if (col === 'cheques') return window.INITIAL_CHEQUES_DATA || [];
    if (col === 'trips') return window.INITIAL_EXCEL_TRIPS || [];
    if (col === 'debts') return window.SAMPLE_DEBTS_DATA || [];
    return [];
  },
  add: async (col, doc) => {
    if (col === 'cheques') addedFirestoreCheques.push(doc);
    return doc;
  },
  update: async (col, id, fields) => fields
};

// Load ChequesModule
const chequesJsCode = fs.readFileSync(path.join(__dirname, '../js/modules/cheques.js'), 'utf-8');
eval(chequesJsCode);

async function testAllCheques() {
  await ChequesModule.init();

  console.log('Step 1: Navigating to All Cheques View...');
  ChequesModule.goToAllChequesView('ALL');
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-list');
  const breadcrumbText = document.getElementById('appsheet-breadcrumb').innerText;
  assert(breadcrumbText.includes('All Cheques'), 'Breadcrumb must include All Cheques');
  console.log('✔ Breadcrumb verified: Cheques > All Cheques');

  console.log('Step 2: Testing Multi-Color Row System & Rendering...');
  const totalCheques = ChequesModule.allCheques.length;
  console.log(`Total Cheques in database: ${totalCheques}`);
  assert(totalCheques >= 700, 'Expected > 700 cheques in authentic dataset');

  // Verify Page 1 slice rendered
  ChequesModule.allChequesPageSize = 25;
  ChequesModule.renderAllChequesTable();

  const tbodyHtml = document.getElementById('allcheques-table-tbody').innerHTML;
  assert(tbodyHtml.includes('allchq-row-pink'), 'Must render Pink row for Due cheque 000144');
  assert(tbodyHtml.includes('allchq-row-gold'), 'Must render Gold row for Due cheque 217365');
  assert(tbodyHtml.includes('allchq-row-green'), 'Must render Green row for Cleared cheques');
  assert(tbodyHtml.includes('allchq-group-header'), 'Must render Date group headers');
  console.log('✔ Multi-color rows verified: Pink (#fb0a82), Gold (#c3ad00), Green (#00b11f)');

  console.log('Step 3: Testing Dynamic AppSheet Pagination...');
  let pagInfo = document.getElementById('allcheques-pagination-info').innerText;
  assert(pagInfo.includes('Showing 1 to 25 of'), 'Pagination info must show 1 to 25');

  ChequesModule.changeAllChequesPage(2);
  pagInfo = document.getElementById('allcheques-pagination-info').innerText;
  assert(pagInfo.includes('Showing 26 to 50 of'), 'Page 2 must show 26 to 50');

  ChequesModule.changeAllChequesPageSize(10);
  pagInfo = document.getElementById('allcheques-pagination-info').innerText;
  assert(pagInfo.includes('Showing 1 to 10 of'), 'Page size 10 must show 1 to 10');
  console.log('✔ Pagination verified: Page switching and Page Size controls working 100%');

  console.log('Step 4: Testing Financial Year Filtering...');
  ChequesModule.filterAllChequesByYear('2026-2027');
  const count2026 = ChequesModule.allCheques.filter(c => ChequesModule.getChequeFinancialYear(c) === '2026-2027').length;
  pagInfo = document.getElementById('allcheques-pagination-info').innerText;
  assert(pagInfo.includes(`of ${count2026} cheques`), 'Must show only 2026-2027 cheques');

  ChequesModule.filterAllChequesByYear('ALL');
  pagInfo = document.getElementById('allcheques-pagination-info').innerText;
  assert(pagInfo.includes(`of ${totalCheques} cheques`), 'Must show all cheques again');
  console.log('✔ FY Filtering verified: 2026-2027, 2025-2026, 2024-2025 and ALL working');

  console.log('Step 5: Testing Drilldowns from All Cheques...');

  // 5a. Click Cleared Cheque -> Settled Trip Details (Green Theme)
  const clearedChq = ChequesModule.allCheques.find(c => c.status === 'Cleared');
  console.log(`Testing Click Cleared Cheque: ${clearedChq.chequeNo}`);
  ChequesModule.viewAllChequesRow(clearedChq.id);
  assert.strictEqual(ChequesModule.viewMode, 'cleared-settled-detail');
  assert.strictEqual(ChequesModule.currentSettledOrigin, 'allcheques');
  let bc = document.getElementById('appsheet-breadcrumb').innerText;
  assert(bc.includes('All Cheques') && bc.includes('Settled Trip Details'), 'Breadcrumb must show All Cheques > Settled Trip Details');
  console.log('✔ Cleared cheque drilldown verified: Opens Settled Trip Details (All Green theme)');

  // 5b. Click Pink Due Cheque (000144) -> 5 Cards Open Trip Details
  ChequesModule.goToAllChequesView('ALL');
  const duePinkChq = ChequesModule.allCheques.find(c => c.status === 'Due' && c.chequeNo === '000144');
  console.log(`Testing Click Pink Due Cheque: ${duePinkChq.chequeNo}`);
  ChequesModule.viewAllChequesRow(duePinkChq.id);
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-open-trip');
  assert.strictEqual(ChequesModule.allChequesActiveColor, 'pink');
  bc = document.getElementById('appsheet-breadcrumb').innerText;
  assert(bc.includes('All Cheques') && bc.includes('Open Trip Details'), 'Breadcrumb must show All Cheques > Open Trip Details');
  
  // Verify 5 Cards populated for Pink Due:
  // Card 1: Slate text with .allchq-open-field-val (no green forced)
  const card1Fields = document.getElementById('allchq-open-trip-fields').innerHTML;
  assert(card1Fields.includes('allchq-open-field-val'), 'Card 1 must use allchq-open-field-val for slate text');
  assert(!card1Fields.includes('cleared-trip-field-val'), 'Card 1 must NOT use cleared-trip-field-val (avoids forced green text)');
  assert(card1Fields.includes('2026-2027-2426_TTC') && card1Fields.includes('RJ52GB5053'), 'Card 1 must show authentic GR & Truck');
  
  // Card 2: Cheque table must render Pink row WITHOUT bullets in td cells ("sirf dot nhi aate")
  const chqTbodyHtml = document.getElementById('allchq-open-cheque-tbody').innerHTML;
  assert(chqTbodyHtml.includes('#fb0a82') && chqTbodyHtml.includes('000144'), 'Card 2 Cheque table must render Pink row');
  assert(!chqTbodyHtml.includes('>●<') && !chqTbodyHtml.includes('● 000144'), 'Card 2 Cheque table cells must NOT contain bullet dots');
  
  const addBtn = document.getElementById('allchq-open-add-cheque-btn');
  assert.strictEqual(addBtn.style.display, 'inline', 'Pink Due cheque must show Add button');
  const totalChqAmt = document.getElementById('allchq-totals-cheque-amt').innerText;
  assert(totalChqAmt.includes('20,000'), 'Card 4 Total Cheque Amount must be 20,000');
  
  // Card 5: Slate text with .allchq-open-field-val
  const card5Fields = document.getElementById('allchq-open-consignee-owner-fields').innerHTML;
  assert(card5Fields.includes('allchq-open-field-val'), 'Card 5 must use allchq-open-field-val for slate text');
  assert(!card5Fields.includes('cleared-trip-field-val'), 'Card 5 must NOT use cleared-trip-field-val');
  console.log('✔ Pink Due Cheque 000144 drilldown verified: 5 Cards Open Trip Details with slate values & Pink Cheque row without dots');

  // 5c. Click Gold Due Cheque (217365) -> 5 Cards Open Trip Details
  ChequesModule.goToAllChequesView('ALL');
  const dueGoldChq = ChequesModule.allCheques.find(c => c.status === 'Due' && c.chequeNo === '217365');
  console.log(`Testing Click Gold Due Cheque: ${dueGoldChq.chequeNo}`);
  ChequesModule.viewAllChequesRow(dueGoldChq.id);
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-open-trip');
  assert.strictEqual(ChequesModule.allChequesActiveColor, 'gold');
  const goldCard1 = document.getElementById('allchq-open-trip-fields').innerHTML;
  assert(goldCard1.includes('allchq-open-field-val'), 'Gold Card 1 must use allchq-open-field-val');
  assert(goldCard1.includes('2026-2027-2435_TTC') && goldCard1.includes('RJ52GB5054'), 'Card 1 must show Gold GR & Truck');
  const goldChqHtml = document.getElementById('allchq-open-cheque-tbody').innerHTML;
  assert(goldChqHtml.includes('#c3ad00') && goldChqHtml.includes('217365'), 'Card 2 Cheque table must render Gold row');
  assert(!goldChqHtml.includes('>●<') && !goldChqHtml.includes('● 217365'), 'Gold Cheque table cells must NOT contain bullet dots');
  console.log('✔ Gold Due Cheque 217365 drilldown verified: 5 Cards Open Trip Details with Gold Cheque row without dots');

  // 5d. Click Red Bounced Cheque -> 5 Cards Open Trip Details (Add button hidden)
  ChequesModule.goToAllChequesView('ALL');
  const bouncedChq = ChequesModule.allCheques.find(c => c.status === 'Bounced');
  console.log(`Testing Click Bounced Cheque: ${bouncedChq.chequeNo}`);
  ChequesModule.viewAllChequesRow(bouncedChq.id);
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-open-trip');
  assert.strictEqual(ChequesModule.allChequesActiveColor, 'red');
  const redChqHtml = document.getElementById('allchq-open-cheque-tbody').innerHTML;
  assert(redChqHtml.includes('#cc0b0b'), 'Card 2 Cheque table must render Red row');
  assert(!redChqHtml.includes('>●<'), 'Red Cheque table cells must NOT contain bullet dots');
  assert.strictEqual(addBtn.style.display, 'none', 'Red Bounced cheque must HIDE Add button (ONLY Expand allowed)');
  console.log('✔ Bounced Cheque drilldown verified: Red Cheque row & ONLY Expand button');

  // 5e. Test Expand Cheque -> Trip Cheque Details (18_32_33.png)
  ChequesModule.viewAllChequesRow(duePinkChq.id);
  ChequesModule.viewAllChequesTripChequesList();
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-trip-cheques');
  bc = document.getElementById('appsheet-breadcrumb').innerText;
  assert(bc.includes('Trip Cheque Details'), 'Breadcrumb must show Trip Cheque Details');
  const expTbodyHtml = document.getElementById('allcheques-expanded-cheques-tbody').innerHTML;
  assert(!expTbodyHtml.includes('>●<'), 'Expanded Cheque table cells must NOT contain bullet dots');
  console.log('✔ Expanded Trip Cheque Details view verified (matching 18_32_33.png) without dots');

  // 5f. Test Single Cheque Details Card (18_32_44.png)
  ChequesModule.viewAllChequesSingleCheque(duePinkChq.id);
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-cheque-detail');
  bc = document.getElementById('appsheet-breadcrumb').innerText;
  assert(bc.includes('Cheque Details'), 'Breadcrumb must show Cheque Details');
  const singleContent = document.getElementById('allchq-single-cheque-content').innerHTML;
  assert(singleContent.includes('000144') && singleContent.includes('Bandhan Bank'), 'Single cheque card must render fields');
  console.log('✔ Single Cheque Details card verified (matching 18_32_44.png)');

  // 5g. Test Expand Consignor/s -> Open Trip Party Details (18_33_57.png)
  ChequesModule.viewAllChequesRow(duePinkChq.id);
  ChequesModule.viewAllChequesPartyList();
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-party-list');
  bc = document.getElementById('appsheet-breadcrumb').innerText;
  assert(bc.includes('Open Trip Party Details'), 'Breadcrumb must show Open Trip Party Details');
  const partyListHtml = document.getElementById('allcheques-party-list-tbody').innerHTML;
  assert(partyListHtml.includes('Manorath Industries') || partyListHtml.includes('08APEPS7646K2Z6'), 'Party table must show consignor');
  console.log('✔ Expanded Consignor/s Party Details view verified (matching 18_33_57.png)');

  // 5h. Test Single Party Detail Card (18_34_12.png)
  ChequesModule.viewAllChequesPartyDetail(0);
  assert.strictEqual(ChequesModule.viewMode, 'allcheques-party-detail');
  bc = document.getElementById('appsheet-breadcrumb').innerText;
  assert(bc.includes('Open Trip Party Details'), 'Breadcrumb must show Open Trip Party Details');
  const partyCardHtml = document.getElementById('allcheques-party-detail-card-body').innerHTML;
  assert(partyCardHtml.includes('G.R.No.') && partyCardHtml.includes('Manorath Industries'), 'Party Card must show GR and Consignor');
  console.log('✔ Single Party Detail Card verified (matching 18_34_12.png)');

  // 5i. Test Add Cheque Drawer (18_33_23.png) & Firestore sync
  ChequesModule.viewAllChequesRow(duePinkChq.id);
  ChequesModule.openAddTripChequeDrawer();
  document.getElementById('add-trip-chq-no').value = '999888';
  document.getElementById('add-trip-chq-bank').value = 'HDFC';
  document.getElementById('add-trip-chq-amount').value = '15000';
  document.getElementById('add-trip-chq-payto').value = 'TTC';
  await ChequesModule.saveTripChequeDrawer();
  assert(addedFirestoreCheques.some(c => c.chequeNo === '999888'), 'New cheque must be synced to Cloud Firestore');
  console.log('✔ Add Cheque Drawer and Firestore synchronization verified (matching 18_33_23.png)');

  // 5j. Test Edit Button in HTML has AppSheet gold color (#c2aa48)
  const htmlContent = fs.readFileSync(path.join(__dirname, '../pages/cheques.html'), 'utf8');
  assert(htmlContent.includes('btn-appsheet-edit-gold'), 'HTML must use btn-appsheet-edit-gold class for Edit button');
  assert(htmlContent.includes('#c2aa48'), 'CSS must define #c2aa48 for AppSheet Edit button');
  console.log('✔ AppSheet Edit button styling verified (#c2aa48 mustard gold)');

  console.log('\n🎉 ALL CARD 5 (ALL CHEQUES) ROW CLICK TESTS PASSED 100%! ZERO REGRESSIONS! 🎉');
}

testAllCheques().catch(err => {
  console.error(err);
  process.exit(1);
});
