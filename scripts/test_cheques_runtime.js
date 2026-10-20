const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Testing ChequesModule Pure Mock Runtime Execution ---');

const domElements = {};
function createMockElement(id, tagName = 'div') {
  const el = {
    id,
    tagName,
    innerText: '',
    innerHTML: '',
    value: '',
    style: {},
    classList: {
      classes: new Set(),
      add: (c) => el.classList.classes.add(c),
      remove: (c) => el.classList.classes.delete(c),
      contains: (c) => el.classList.classes.has(c)
    },
    querySelectorAll: (sel) => [],
    querySelector: (sel) => null,
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
  Modal: class {
    constructor(el) {}
    show() {}
    hide() {}
    static getInstance(el) { return { hide() {}, show() {} }; }
    static getOrCreateInstance(el) { return { hide() {}, show() {} }; }
  },
  Offcanvas: class {
    constructor(el) {}
    show() {}
    hide() {}
    static getInstance(el) { return { hide() {}, show() {} }; }
    static getOrCreateInstance(el) { return { hide() {}, show() {} }; }
  }
};

global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => '₹ ' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  showToast: (msg, type) => console.log(` [Toast] ${type}: ${msg}`)
};

// Load sample datasets
eval(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-cheques-data.js'), 'utf8'));

// Mock dbService
global.dbService = {
  getAll: async (col) => {
    if (col === 'cheques') return window.INITIAL_CHEQUES_DATA || [];
    if (col === 'trips') return window.INITIAL_EXCEL_TRIPS || [];
    if (col === 'debts') return window.SAMPLE_DEBTS_DATA || [];
    return [];
  },
  add: async (col, doc) => doc,
  update: async (col, id, fields) => fields
};

// Load cheques.js
eval(fs.readFileSync(path.join(__dirname, '../js/modules/cheques.js'), 'utf8'));

async function run() {
  const mod = ChequesModule;
  assert(mod, 'ChequesModule must be defined');

  console.log('Step 1: Initializing ChequesModule...');
  await mod.init();

  console.log('Step 2: Testing Dashboard View...');
  mod.goToDashboardView();
  assert.strictEqual(mod.viewMode, 'dashboard');

  console.log('Step 3: Testing Due View...');
  mod.goToDueView();
  assert.strictEqual(mod.viewMode, 'due-list');

  console.log('Step 4: Testing Bounced View...');
  mod.goToBouncedView('2026-2027');
  assert.strictEqual(mod.viewMode, 'bounced-list');
  assert.strictEqual(mod.bouncedYearFilter, '2026-2027');

  console.log('Step 5: Testing Open Trip Details View...');
  const bouncedChq = mod.allCheques.find(c => c.status === 'Bounced');
  assert(bouncedChq, 'Bounced cheque must exist');
  mod.viewBouncedTripDetails(bouncedChq.id);
  assert.strictEqual(mod.viewMode, 'bounced-trip-detail');
  assert(mod.activeTrip, 'Active trip must be loaded');

  console.log('Step 6: Testing Cheque Details Drawer...');
  mod.openAddTripChequeDrawer();
  assert.strictEqual(document.getElementById('add-trip-chq-amount').value, '₹ 0.00');

  console.log('Step 7: Testing Bank Combobox...');
  mod.toggleBankDropdown();
  mod.filterBankDropdown('HDFC');
  mod.selectBank('HDFC');
  assert.strictEqual(document.getElementById('add-trip-chq-bank').value, 'HDFC');

  console.log('Step 8: Testing Pay To Combobox...');
  mod.togglePayToDropdown();
  mod.filterPayToDropdown('MTC');
  mod.selectPayTo('MTC');
  assert.strictEqual(document.getElementById('add-trip-chq-payto').value, 'MTC');

  console.log('Step 9: Testing Save Cheque...');
  document.getElementById('add-trip-chq-no').value = '000999';
  document.getElementById('add-trip-chq-amount').value = '₹ 25,000.00';
  await mod.saveTripChequeDrawer();

  const saved = mod.allCheques.find(c => c.chequeNo === '000999');
  assert(saved, 'Cheque 000999 must be saved');
  assert.strictEqual(saved.amount, 25000, 'Cheque amount must be 25000');

  console.log('Step 10: Testing Status Combobox & Dynamic Colors...');
  mod.toggleStatusDropdown();
  mod.filterStatusDropdown('Transit');
  await mod.selectTripStatus('Transit');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').value, 'Transit');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').style.color, '#bfa136', 'Transit input text must be gold #bfa136');
  assert.strictEqual(document.getElementById('bounced-trip-status-dot').style.color, '#bfa136', 'Transit dot must be gold #bfa136');

  await mod.selectTripStatus('Off Loading');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').value, 'Off Loading');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').style.color, '#e91e63', 'Off Loading input text must be pink #e91e63');
  assert.strictEqual(document.getElementById('bounced-trip-status-dot').style.color, '#e91e63', 'Off Loading dot must be pink #e91e63');

  await mod.selectTripStatus('Cheque Due');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').value, 'Cheque Due');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').style.color, '#1976d2', 'Cheque Due input text must be blue #1976d2');
  assert.strictEqual(document.getElementById('bounced-trip-status-dot').style.color, '#1976d2', 'Cheque Due dot must be blue #1976d2');

  await mod.selectTripStatus('POD Sent/Bill Generated');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').value, 'POD Sent/Bill Generated');
  assert.strictEqual(document.getElementById('bounced-trip-status-input').style.color, '#6200ea', 'POD Sent input text must be purple #6200ea');
  assert.strictEqual(document.getElementById('bounced-trip-status-dot').style.color, '#6200ea', 'POD Sent dot must be purple #6200ea');

  console.log('Step 11: Testing Other B Update...');
  await mod.updateTripOtherB(12000);
  assert.strictEqual(mod.activeTrip.otherB, 12000);

  console.log('Step 12: Testing Add Records for...');
  mod.toggleAddRecordsDropdown();
  mod.filterAddRecordsDropdown('Party Payment');
  mod.selectAddRecordType('Party Payment');
  assert.strictEqual(document.getElementById('bounced-add-records-input').value, 'Party Payment');

  console.log('Step 13: Testing Open Debts View & Date Groups...');
  mod.viewBouncedOpenDebts();
  assert.strictEqual(mod.viewMode, 'bounced-debts');
  assert(!document.getElementById('cheques-view-bounced-open-debts').classList.contains('d-none'), 'Open Debts view must be visible');
  
  const debtsTbody = document.getElementById('bounced-open-debts-tbody');
  assert(debtsTbody.innerHTML.includes('debts-date-group-row'), 'Must render date group header row');
  assert(debtsTbody.innerHTML.includes('18/10/2026'), 'Must include 18/10/2026 date group');
  assert(debtsTbody.innerHTML.includes('2546-TTC'), 'Must include 2546-TTC row');
  assert(debtsTbody.innerHTML.includes('debt-loading-row'), 'Must style loading debts in blue');

  // Verify Open Debts FY Badges matching user request
  assert.strictEqual(document.getElementById('debts-rail-badge-2026').innerText, '₹ 304,100.00');
  assert.strictEqual(document.getElementById('debts-rail-badge-2025').innerText, '₹ 364,500.00');
  assert.strictEqual(document.getElementById('debts-rail-badge-ALL').innerText, '₹ 668,600.00');

  // Verify FY filter
  mod.filterDebtsByYear('2026-2027');
  assert.strictEqual(mod.debtsYearFilter, '2026-2027');

  // Verify Sidebar Toggle
  mod.toggleDebtsSidebar();
  assert.strictEqual(mod.debtsSidebarVisible, false);
  mod.toggleDebtsSidebar();
  assert.strictEqual(mod.debtsSidebarVisible, true);

  console.log('Step 14: Testing Cleared Cheques List View & Date Groups...');
  mod.goToClearedView('ALL');
  assert.strictEqual(mod.viewMode, 'cleared-list');
  assert(!document.getElementById('cheques-view-cleared-list').classList.contains('d-none'), 'Cleared view must be visible');

  const clearedTbody = document.getElementById('cleared-table-tbody');
  assert(clearedTbody.innerHTML.includes('cleared-group-header-row'), 'Must render cleared date group header row');
  assert(clearedTbody.innerHTML.includes('16/10/2026'), 'Must include 16/10/2026 date group');
  assert(clearedTbody.innerHTML.includes('000004'), 'Must include cheque 000004');
  assert(clearedTbody.innerHTML.includes('GOYAL INDUSTRIES'), 'Must include party GOYAL INDUSTRIES');
  assert(clearedTbody.innerHTML.includes('cleared-green-bullet'), 'Must include green bullets for cleared');

  // Verify FY filter & Sidebar toggle
  mod.filterClearedByYear('2026-2027');
  assert.strictEqual(mod.clearedYearFilter, '2026-2027');
  mod.toggleClearedSidebar();
  assert.strictEqual(mod.clearedSidebarVisible, false);
  mod.toggleClearedSidebar();
  assert.strictEqual(mod.clearedSidebarVisible, true);

  console.log('Step 15: Testing Cleared Open Trip Details (3 Columns)...');
  mod.viewClearedTripDetails('000004');
  assert.strictEqual(mod.viewMode, 'cleared-trip-detail');
  assert(!document.getElementById('cheques-view-cleared-trip-detail').classList.contains('d-none'), 'Cleared Trip Details must be visible');

  // Col 1: Trip Info
  const col1 = document.getElementById('cleared-trip-details-content');
  assert(col1.innerHTML.includes('2026-2027--2418_TTC'), 'Col 1 must include GR 2026-2027--2418_TTC');
  assert(col1.innerHTML.includes('RJ01GC4865'), 'Col 1 must include truck RJ01GC4865');
  assert(col1.innerHTML.includes('Mohali (Punjab)'), 'Col 1 must include destination Mohali (Punjab)');
  assert(col1.innerHTML.includes('tel:9829043728'), 'Col 1 must include tel call link');
  assert(col1.innerHTML.includes('GOYAL INDUSTRIES'), 'Col 1 must include consignee GOYAL INDUSTRIES');

  // Col 2: Linked Cheques
  const chqCountHeader = document.getElementById('cleared-trip-cheques-count-header');
  assert(chqCountHeader.innerText.includes('Cheque 1'), 'Card 2 header must be Cheque 1');
  const col2Tbody = document.getElementById('cleared-trip-cheques-tbody');
  assert(col2Tbody.innerHTML.includes('000004'), 'Col 2 table must include cheque 000004');
  assert(col2Tbody.innerHTML.includes('HDFC'), 'Col 2 table must include bank HDFC');
  assert(col2Tbody.innerHTML.includes('cleared-green-bullet'), 'Col 2 table must include green bullet');

  // Col 3: Financial Summary & Status
  const chqSummary = document.getElementById('cleared-summary-chq-amount');
  assert(chqSummary.innerHTML.includes('76,000.00'), 'Col 3 Cheque amount must be 76,000.00');
  const freightSummary = document.getElementById('cleared-summary-freight');
  assert(freightSummary.innerHTML.includes('1,52,000.00') || freightSummary.innerHTML.includes('152,000.00'), 'Col 3 Freight amount must be 152,000.00');
  const statusInput = document.getElementById('cleared-trip-status-input');
  assert.strictEqual(statusInput.value, 'Truck Owner Payment Pending');

  console.log('Step 16: Testing Cleared Cheque Details Card...');
  mod.viewClearedChequeDetails('000004');
  assert.strictEqual(mod.viewMode, 'cleared-cheque-detail');
  assert(!document.getElementById('cheques-view-cleared-cheque-detail').classList.contains('d-none'), 'Cheque details card must be visible');

  const cardBody = document.getElementById('cleared-cheque-detail-card-body');
  assert(cardBody.innerHTML.includes('000004'), 'Card must show Cheque No 000004');
  assert(cardBody.innerHTML.includes('HDFC'), 'Card must show Bank HDFC');
  assert(cardBody.innerHTML.includes('76,000.00'), 'Card must show Amount 76,000.00');
  assert(cardBody.innerHTML.includes('TTC'), 'Card must show Pay to TTC');
  assert(cardBody.innerHTML.includes('16/10/2026'), 'Card must show Clearing Date 16/10/2026');
  assert(cardBody.innerHTML.includes('cleared-green-bullet'), 'Card must use green bullets');

  console.log('\n🎉 ALL RUNTIME SIMULATION TESTS PASSED 100%! ZERO ERRORS! 🎉\n');
}

run().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
