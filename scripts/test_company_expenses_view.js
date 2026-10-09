/**
 * Test script for Company Expense view implementation
 */
const fs = require('fs');
const vm = require('vm');

console.log('--- Testing Company Expense Module ---');

// Mock browser environment
const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({
      value: '',
      innerHTML: '',
      innerText: '',
      textContent: '',
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {}
      },
      style: {}
    }),
    querySelector: () => null,
    querySelectorAll: () => []
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};
sandbox.window = sandbox;

// Load sample dataset
const sampleCode = fs.readFileSync('js/sample-company-expenses-data.js', 'utf8');
vm.runInNewContext(sampleCode, sandbox);

const dataset = sandbox.SAMPLE_COMPANY_EXPENSES_DATA;
console.log(`Loaded dataset records: ${dataset.length}`);

// Test totals
let grandTotal = 0;
const fyTotals = {};
dataset.forEach(r => {
  grandTotal += r.amount;
  fyTotals[r.fy] = (fyTotals[r.fy] || 0) + r.amount;
});

console.log('Grand Total:', grandTotal.toFixed(3));
console.log('FY 2026-2027 Total:', (fyTotals['2026-2027'] || 0).toFixed(3));
console.log('FY 2025-2026 Total:', (fyTotals['2025-2026'] || 0).toFixed(3));
console.log('FY 2024-2025 Total:', (fyTotals['2024-2025'] || 0).toFixed(3));

// Verify expectations
if (Math.abs(grandTotal - 3259878.9) > 0.01) {
  console.error('ERROR: Grand Total mismatch!');
  process.exit(1);
}
if (Math.abs(fyTotals['2026-2027'] - 692551.37) > 0.01) {
  console.error('ERROR: FY 2026-2027 Total mismatch!');
  process.exit(1);
}
if (Math.abs(fyTotals['2025-2026'] - 1964934.53) > 0.01) {
  console.error('ERROR: FY 2025-2026 Total mismatch!');
  process.exit(1);
}
if (Math.abs(fyTotals['2024-2025'] - 602393.0) > 0.01) {
  console.error('ERROR: FY 2024-2025 Total mismatch!');
  process.exit(1);
}

// Verify record COMP_EXP_0001 (matching WhatsApp Photo #2)
const rec1 = dataset.find(r => r.id === 'COMP_EXP_0001');
if (!rec1) {
  console.error('ERROR: COMP_EXP_0001 not found!');
  process.exit(1);
}
console.log('Verified COMP_EXP_0001:', rec1);
if (rec1.amount !== 660 || rec1.displayDate !== '08/10/2026' || rec1.expenseFrom !== 'Cash' || rec1.expenseType !== 'Company') {
  console.error('ERROR: COMP_EXP_0001 fields mismatch!');
  process.exit(1);
}

// Verify date grouping on 08/10/2026
const oct8Records = dataset.filter(r => r.displayDate === '08/10/2026');
const oct8Sum = oct8Records.reduce((acc, r) => acc + r.amount, 0);
console.log(`08/10/2026 records: ${oct8Records.length}, sum: ₹ ${oct8Sum.toFixed(3)}`);
if (Math.abs(oct8Sum - 9365.0) > 0.01) {
  console.error(`ERROR: 08/10/2026 sum should be 9365.000, got ${oct8Sum}!`);
  process.exit(1);
}

console.log('--- ALL COMPANY EXPENSE TESTS PASSED! ---');
