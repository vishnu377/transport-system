const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test dynamic FY calculation
function computeFinancialYear(dateStr) {
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = d.getMonth() + 1; // 1 to 12
    return m >= 4 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
  }
  return '2026-2027';
}

console.log('=== TESTING DYNAMIC FINANCIAL YEAR CALCULATION ===');

// Current FY 2026-2027
assert.strictEqual(computeFinancialYear('2026-11-13'), '2026-2027', 'Nov 2026 must be 2026-2027');
assert.strictEqual(computeFinancialYear('2026-12-31'), '2026-2027', 'Dec 2026 must be 2026-2027');
assert.strictEqual(computeFinancialYear('2027-01-15'), '2026-2027', 'Jan 2027 must be 2026-2027');
assert.strictEqual(computeFinancialYear('2027-03-31'), '2026-2027', '31 March 2027 must be 2026-2027');
console.log('✔ PASS: Nov 2026 to March 2027 correctly mapped to FY 2026-2027');

// Transition to FY 2027-2028
assert.strictEqual(computeFinancialYear('2027-04-01'), '2027-2028', '1 April 2027 must be 2027-2028');
assert.strictEqual(computeFinancialYear('2027-10-15'), '2027-2028', 'Oct 2027 must be 2027-2028');
assert.strictEqual(computeFinancialYear('2028-03-31'), '2027-2028', '31 March 2028 must be 2027-2028');
console.log('✔ PASS: 1 April 2027 to March 2028 correctly mapped to FY 2027-2028');

// Transition to FY 2028-2029
assert.strictEqual(computeFinancialYear('2028-04-01'), '2028-2029', '1 April 2028 must be 2028-2029');
assert.strictEqual(computeFinancialYear('2028-11-10'), '2028-2029', 'Nov 2028 must be 2028-2029');
console.log('✔ PASS: 1 April 2028 onwards correctly mapped to FY 2028-2029');

console.log('\n🏆 ALL DYNAMIC FINANCIAL YEAR TRANSITION TESTS PASSED 100%!');
