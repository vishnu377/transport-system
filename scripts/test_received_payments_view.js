/**
 * Automated Verification Script for Received Payments (Income Slice)
 */
const fs = require('fs');
const path = require('path');

// Mock browser globals
global.window = global;
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null
};

// 1. Load Data
require('../js/sample-received-payments-data.js');
console.log('✔ Sample Received Payments Data loaded:', window.SAMPLE_RECEIVED_PAYMENTS_DATA.length, 'records');

const data = window.SAMPLE_RECEIVED_PAYMENTS_DATA;

// 2. Validate Financial Year Totals
const fy26 = data.filter(r => r.fy === '2026-2027').reduce((sum, r) => sum + r.amount, 0);
const fy25 = data.filter(r => r.fy === '2025-2026').reduce((sum, r) => sum + r.amount, 0);
const fy24 = data.filter(r => r.fy === '2024-2025').reduce((sum, r) => sum + r.amount, 0);
const grandTotal = data.reduce((sum, r) => sum + r.amount, 0);

console.log(`✔ FY 2026-2027 Total: ₹ ${fy26.toLocaleString('en-US', { minimumFractionDigits: 2 })} (Expected: ₹ 43,045,465.00)`);
console.log(`✔ FY 2025-2026 Total: ₹ ${fy25.toLocaleString('en-US', { minimumFractionDigits: 2 })} (Expected: ₹ 59,470,903.00)`);
console.log(`✔ FY 2024-2025 Total: ₹ ${fy24.toLocaleString('en-US', { minimumFractionDigits: 2 })} (Expected: ₹ 27,980,085.00)`);
console.log(`✔ Grand Total: ₹ ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} (Expected: ₹ 130,496,453.00)`);

if (fy26 !== 43045465) throw new Error('FY 2026-2027 total mismatch!');
if (fy25 !== 59470903) throw new Error('FY 2025-2026 total mismatch!');
if (fy24 !== 27980085) throw new Error('FY 2024-2025 total mismatch!');
if (grandTotal !== 130496453) throw new Error('Grand Total mismatch!');

// 3. Validate WhatsApp Photo Record
const photoRecord = data.find(r => r.id === 'REC_2026_PHOTO_01');
if (!photoRecord) throw new Error('Photo record REC_2026_PHOTO_01 missing!');
console.log('✔ WhatsApp Photo record found:', photoRecord);
if (photoRecord.depositor !== 'Kalyan Meena' || photoRecord.truckNo !== 'RJ26GA4713' || photoRecord.amount !== 3900) {
  throw new Error('Photo record fields mismatch!');
}

// 4. Test db-service integration
require('../js/db-service.js');
console.log('✔ dbService initialized in LocalStorage mode');

(async () => {
  const records = await dbService.getAll('receivedPayments');
  console.log('✔ dbService.getAll("receivedPayments") returned:', records.length, 'records');
  if (records.length !== 8055) throw new Error('dbService count mismatch!');

  // Test adding new income record (dynamic capability for 2025-26 or any year)
  const testRecord = {
    id: 'REC_TEST_NEW',
    date: '2025-08-15',
    displayDate: '15/08/2025',
    amount: 15000,
    type: 'Returned Old',
    depositor: 'Test Depositor',
    depositorType: 'Driver',
    truckNo: 'RJ14GB9999',
    mode: 'Cash',
    status: 'Paid',
    fy: '2025-2026',
    monthKey: '5 Aug'
  };
  await dbService.add('receivedPayments', testRecord);
  const afterAdd = await dbService.getAll('receivedPayments');
  console.log('✔ dbService after add:', afterAdd.length, 'records (successfully added dynamic record)');
  const found = afterAdd.find(r => r.id === 'REC_TEST_NEW');
  if (!found || found.amount !== 15000) throw new Error('Dynamic record add failed!');

  // Clean up test record
  await dbService.delete('receivedPayments', 'REC_TEST_NEW');
  const afterDelete = await dbService.getAll('receivedPayments');
  console.log('✔ dbService after cleanup:', afterDelete.length, 'records');

  // 5. Verify HTML structure
  const html = fs.readFileSync(path.join(__dirname, '../pages/ledger.html'), 'utf8');
  const requiredElements = [
    'id="ledger-view-received"',
    'id="received-tree-sidebar"',
    'id="received-badge-all"',
    'id="received-badge-2026-2027"',
    'id="received-badge-2025-2026"',
    'id="received-badge-2024-2025"',
    'id="card-received-badge-2026-2027"',
    'id="card-received-badge-2025-2026"',
    'id="card-received-badge-2024-2025"',
    'id="received-table"',
    'id="received-tbody"',
    'id="panel-received-details"',
    'id="received-panel-content"',
    'id="modal-add-income-record"',
    'id="inc-date"',
    'id="inc-type"',
    'id="inc-truck-no"',
    'id="inc-amount"',
    'id="inc-mode-pill-container"'
  ];

  requiredElements.forEach(selector => {
    if (!html.includes(selector)) {
      throw new Error(`Missing expected element in ledger.html: ${selector}`);
    }
  });
  console.log(`✔ All ${requiredElements.length} required HTML elements verified in pages/ledger.html`);

  // 6. Verify LedgerModule methods in ledger.js
  const ledgerCode = fs.readFileSync(path.join(__dirname, '../js/modules/ledger.js'), 'utf8');
  const requiredMethods = [
    'goToReceivedView',
    'applyReceivedFilters',
    'renderReceivedTreeSidebar',
    'toggleReceivedFYTree',
    'selectReceivedFY',
    'selectReceivedType',
    'selectReceivedAll',
    'toggleReceivedDateSidebar',
    'renderReceivedTable',
    'openReceivedPaymentDetails',
    'closeReceivedPaymentDetails',
    'prevReceivedPaymentRecord',
    'nextReceivedPaymentRecord',
    'toggleReceivedDetailFullscreen',
    'toggleReceivedFullscreen',
    'changeReceivedPageSize',
    'changeReceivedPage',
    'openAddIncomeRecordModal',
    'setIncomeStatus',
    'setIncomeMode',
    'saveIncomeRecord'
  ];

  requiredMethods.forEach(fn => {
    if (!ledgerCode.includes(fn)) {
      throw new Error(`Missing required method in ledger.js: ${fn}`);
    }
  });
  console.log(`✔ All ${requiredMethods.length} required LedgerModule methods verified in js/modules/ledger.js`);

  console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! 100% AUTHENTIC & DYNAMIC!');
})();
