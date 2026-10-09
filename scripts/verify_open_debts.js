/**
 * Automated Verification Script for Open Debts & Ledger Register
 */
const fs = require('fs');
const path = require('path');

console.log('=== Step 1: Checking js/sample-debts-data.js ===');
const debtsContent = fs.readFileSync('js/sample-debts-data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(debtsContent, sandbox);

const sampleDebts = sandbox.window.SAMPLE_DEBTS_DATA;
console.log(`Loaded ${sampleDebts.length} sample debts records.`);

const targets = {
  '2026-2027': 2356561.0,
  '2025-2026': 1191950.0,
  '2024-2025': 899600.0,
  '2023-2024': 277215.0,
  '2022-2023': 57500.0,
  '2021-2022': 111050.0,
  '2020-2021': 68100.0,
  '2019-2020': 229300.0
};

let allMatch = true;
for (const [fy, target] of Object.entries(targets)) {
  const sum = sampleDebts
    .filter(d => d.fy === fy)
    .reduce((s, d) => s + (Number(d.dueAmount) || 0), 0);
  const diff = Math.abs(sum - target);
  const ok = diff < 0.01;
  console.log(`FY ${fy}: Actual=${sum.toLocaleString('en-IN', {minimumFractionDigits: 2})}, Target=${target.toLocaleString('en-IN', {minimumFractionDigits: 2})}, Match=${ok ? 'OK' : 'FAIL'}`);
  if (!ok) allMatch = false;
}

const grand = sampleDebts.reduce((s, d) => s + (Number(d.dueAmount) || 0), 0);
console.log(`Grand Total Due: ${grand.toLocaleString('en-IN', {minimumFractionDigits: 2})} (Target: 5,191,276.00)`);

if (!allMatch) {
  console.error('ERROR: Targets did not match!');
  process.exit(1);
}

console.log('\n=== Step 2: Syntax checking js/db-service.js & js/modules/ledger.js ===');
try {
  const dbCode = fs.readFileSync('js/db-service.js', 'utf8');
  new Function(dbCode);
  console.log('js/db-service.js parsed with 0 syntax errors.');
} catch (e) {
  console.error('Syntax error in js/db-service.js:', e);
  process.exit(1);
}

try {
  const ledgerCode = fs.readFileSync('js/modules/ledger.js', 'utf8');
  new Function(ledgerCode);
  console.log('js/modules/ledger.js parsed with 0 syntax errors.');
} catch (e) {
  console.error('Syntax error in js/modules/ledger.js:', e);
  process.exit(1);
}

console.log('\n=== Step 3: Checking HTML elements in pages/ledger.html ===');
const htmlContent = fs.readFileSync('pages/ledger.html', 'utf8');

const requiredIds = [
  'ledger-view-open-debts',
  'open-debts-main-container',
  'open-debts-tree-sidebar',
  'open-badge-all',
  'open-badge-2026-2027',
  'open-badge-2025-2026',
  'open-badge-2024-2025',
  'open-debts-main-area',
  'open-debts-split-wrapper',
  'open-debts-table-wrapper',
  'open-debts-table-body',
  'open-debts-panel',
  'det-debt-type',
  'det-debt-date',
  'det-debt-owner',
  'det-debt-gr',
  'det-debt-company',
  'det-debt-from',
  'det-debt-to',
  'det-debt-borrower',
  'det-debt-receiver',
  'det-debt-mode',
  'det-debt-amount',
  'det-due-amount',
  'det-returned-header',
  'det-returned-list',
  'modal-add-debt',
  'modal-record-return',
  'return-mode-pill-container'
];

let missingIds = [];
for (const id of requiredIds) {
  if (!htmlContent.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
}

if (missingIds.length > 0) {
  console.error('Missing IDs in pages/ledger.html:', missingIds);
  process.exit(1);
} else {
  console.log(`All ${requiredIds.length} required HTML IDs verified successfully!`);
}

console.log('\n ALL TESTS PASSED SUCCESSFULLY! ');
