/**
 * Test Suite: AppSheet Dynamic Pagination for Cheques Module
 * Verifies pagination behavior across all 4 tables:
 *  - Not Used Cheques
 *  - Cleared Cheques
 *  - Bounced Cheques
 *  - Open Debts
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const domElements = {};
function createMockElement(id, tagName = 'div') {
  const el = {
    id,
    tagName,
    innerText: '',
    innerHTML: '',
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

// Load ChequesModule
const chequesJsCode = fs.readFileSync(path.join(__dirname, '../js/modules/cheques.js'), 'utf-8');
eval(chequesJsCode);

async function testPagination() {
  console.log('--- Testing Dynamic AppSheet Pagination for Cheques Module ---');

  await ChequesModule.init();

  // --- 1. Test Not Used Pagination ---
  console.log('\nTesting Not Used Cheques Pagination...');
  const notUsed = ChequesModule.allCheques.filter(c => c.status === 'Not Used');
  const notUsedTotal = notUsed.length;
  console.log(`Total Not Used Cheques: ${notUsedTotal}`);
  assert(notUsedTotal > 10, 'Expected more than 10 Not Used cheques for pagination testing');

  // Default is 10: Page 1 should show 1 to 10 with active Next button
  assert.strictEqual(ChequesModule.notUsedPageSize, 10, 'Default notUsedPageSize should be 10');
  ChequesModule.renderNotUsedTable();
  let notUsedInfo = document.getElementById('notused-pagination-info').innerText;
  console.log(`Page size 10 (Page 1): "${notUsedInfo}"`);
  assert.strictEqual(notUsedInfo, `Showing 1 to 10 of ${notUsedTotal} cheques (Page 1 of 2)`);

  let controlsHtml = document.getElementById('notused-pagination-controls').innerHTML;
  assert(controlsHtml.includes('Next &rsaquo;'), 'Next button must be present');
  assert(!controlsHtml.includes('disabled onclick="ChequesModule.changeNotUsedPage(2)"'), 'Next button must not be disabled on Page 1');

  const p1Rows = (document.getElementById('notused-table-tbody').innerHTML.match(/<tr class="notused-row/g) || []).length;
  console.log(`Page 1 rendered rows count: ${p1Rows}`);
  assert.strictEqual(p1Rows, 10, 'Page 1 should render exactly 10 rows');

  // Navigate to Page 2
  ChequesModule.changeNotUsedPage(2);
  notUsedInfo = document.getElementById('notused-pagination-info').innerText;
  console.log(`Page size 10 (Page 2): "${notUsedInfo}"`);
  assert.strictEqual(notUsedInfo, `Showing 11 to ${notUsedTotal} of ${notUsedTotal} cheques (Page 2 of 2)`);

  controlsHtml = document.getElementById('notused-pagination-controls').innerHTML;
  assert(controlsHtml.includes('disabled onclick="ChequesModule.changeNotUsedPage(3)"') || controlsHtml.includes('disabled title="Next Page"'), 'Next button must be disabled on Page 2');

  const p2Rows = (document.getElementById('notused-table-tbody').innerHTML.match(/<tr class="notused-row/g) || []).length;
  console.log(`Page 2 rendered rows count: ${p2Rows}`);
  assert.strictEqual(p2Rows, notUsedTotal - 10, 'Page 2 should render remaining rows');

  // Switch page size to 25
  ChequesModule.changeNotUsedPageSize(25);
  notUsedInfo = document.getElementById('notused-pagination-info').innerText;
  console.log(`Page size 25: "${notUsedInfo}"`);
  assert.strictEqual(notUsedInfo, `Showing 1 to ${notUsedTotal} of ${notUsedTotal} cheques (Page 1 of 1)`);
  controlsHtml = document.getElementById('notused-pagination-controls').innerHTML;
  assert(controlsHtml.includes('disabled title="Next Page"'), 'Buttons should still be visible with disabled Next');

  // Switch back to ALL
  ChequesModule.changeNotUsedPageSize('ALL');
  notUsedInfo = document.getElementById('notused-pagination-info').innerText;
  console.log(`Page size ALL: "${notUsedInfo}"`);
  assert.strictEqual(notUsedInfo, `Showing all ${notUsedTotal} cheques (Page 1 of 1)`);
  console.log('✔ Not Used Cheques Pagination Tested Successfully!');

  // --- 2. Test Cleared Cheques Pagination ---
  console.log('\nTesting Cleared Cheques Pagination...');
  const clearedTotal = ChequesModule.allCheques.filter(c => c.status === 'Cleared').length;
  console.log(`Total Cleared Cheques: ${clearedTotal}`);

  ChequesModule.clearedPageSize = 25;
  ChequesModule.renderClearedTable();
  let clearedInfo = document.getElementById('cleared-pagination-info').innerText;
  console.log(`Page size 25: "${clearedInfo}"`);

  ChequesModule.changeClearedPageSize(10);
  clearedInfo = document.getElementById('cleared-pagination-info').innerText;
  console.log(`Page size 10 (Page 1): "${clearedInfo}"`);
  assert(clearedInfo.includes('Showing 1 to 10'), 'Cleared Page 1 should show 1 to 10');
  console.log('✔ Cleared Cheques Pagination Tested Successfully!');

  // --- 3. Test Bounced Cheques Pagination ---
  console.log('\nTesting Bounced Cheques Pagination...');
  const bouncedTotal = ChequesModule.allCheques.filter(c => c.status === 'Bounced').length;
  console.log(`Total Bounced Cheques: ${bouncedTotal}`);

  ChequesModule.bouncedPageSize = 25;
  ChequesModule.renderBouncedTable();
  let bouncedInfo = document.getElementById('bounced-pagination-info').innerText;
  console.log(`Page size 25: "${bouncedInfo}"`);

  ChequesModule.changeBouncedPageSize(10);
  bouncedInfo = document.getElementById('bounced-pagination-info').innerText;
  console.log(`Page size 10 (Page 1): "${bouncedInfo}"`);
  assert(bouncedInfo.includes('Showing 1 to 10'), 'Bounced Page 1 should show 1 to 10');
  console.log('✔ Bounced Cheques Pagination Tested Successfully!');

  // --- 4. Test Open Debts Pagination ---
  console.log('\nTesting Open Debts Pagination...');
  const debtsTotal = ChequesModule.allDebts.length;
  console.log(`Total Debts: ${debtsTotal}`);

  ChequesModule.debtsPageSize = 25;
  ChequesModule.renderBouncedOpenDebts();
  let debtsInfo = document.getElementById('debts-pagination-info').innerText;
  console.log(`Page size 25: "${debtsInfo}"`);

  ChequesModule.changeDebtsPageSize(10);
  debtsInfo = document.getElementById('debts-pagination-info').innerText;
  console.log(`Page size 10 (Page 1): "${debtsInfo}"`);
  assert(debtsInfo.includes('Showing 1 to 10'), 'Debts Page 1 should show 1 to 10');
  console.log('✔ Open Debts Pagination Tested Successfully!');

  console.log('\n🎉 ALL PAGINATION TESTS PASSED 100%! ZERO REGRESSIONS! 🎉');
}

testPagination().catch(err => {
  console.error(err);
  process.exit(1);
});
