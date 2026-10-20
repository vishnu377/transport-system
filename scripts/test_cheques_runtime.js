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

  // Verify FY filter
  mod.filterDebtsByYear('2026-2027');
  assert.strictEqual(mod.debtsYearFilter, '2026-2027');

  // Verify Sidebar Toggle
  mod.toggleDebtsSidebar();
  assert.strictEqual(mod.debtsSidebarVisible, false);
  mod.toggleDebtsSidebar();
  assert.strictEqual(mod.debtsSidebarVisible, true);

  console.log('\n🎉 ALL RUNTIME SIMULATION TESTS PASSED 100%! ZERO ERRORS! 🎉\n');
}

run().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
