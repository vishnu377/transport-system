const fs = require('fs');

console.log('=== TEST SUITE: OWNERS SECOND CARD (OWNER DUE) & VIEWS ===');

// 1. Check syntax of js/modules/owners.js
try {
  const ownersCode = fs.readFileSync('js/modules/owners.js', 'utf-8');
  new Function(ownersCode);
  console.log('✔ js/modules/owners.js parsed without syntax errors');
} catch (err) {
  console.error('✘ Syntax error in js/modules/owners.js:', err);
  process.exit(1);
}

// 2. Check HTML elements in pages/owners.html
const html = fs.readFileSync('pages/owners.html', 'utf-8');
const expectedIds = [
  'cardTruckOwners', 'cardOwnerDue', 'cardOwnerPaid',
  'viewDashboard', 'viewOwnerDetails', 'viewOwnerDueList',
  'viewOpenTripDetails', 'viewOpenTripPartyDetails', 'viewTripPaymentDetails',
  'owner-dues-tbody', 'search-owner-dues', 'due-page-size-select',
  'open-trip-cards-container', 'trip-details-gr-title', 'trip-details-status-badge',
  'due-year-tab-ALL', 'due-year-tab-2026-2027', 'due-year-tab-2025-2026', 'due-year-tab-2024-2025'
];

let allFound = true;
expectedIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    console.error(`✘ Missing HTML element with ID: ${id}`);
    allFound = false;
  }
});

if (allFound) {
  console.log('✔ All 17 required HTML views and element IDs are verified in pages/owners.html');
} else {
  process.exit(1);
}

// 3. Check sample-owner-dues-data.js
const dues = require('../js/sample-owner-dues-data.js');
console.log('✔ Total owner dues dataset records:', dues.length);
if (dues.length < 489) {
  console.error(`✘ Expected at least 489 records, found ${dues.length}`);
  process.exit(1);
}

// 4. Check Year Distribution
const counts = {};
const sums = {};
const colors = {};
dues.forEach(d => {
  counts[d.year] = (counts[d.year] || 0) + 1;
  sums[d.year] = (sums[d.year] || 0) + (d.dueAmount || 0);
  colors[d.color] = (colors[d.color] || 0) + 1;
});

console.log('✔ Year Counts:', counts);
console.log('✔ Year Sums (formatted):', {
  '2026-2027': sums['2026-2027'].toFixed(2),
  '2025-2026': sums['2025-2026'].toFixed(2),
  '2024-2025': sums['2024-2025'].toFixed(2)
});
console.log('✔ Colors / Statuses breakdown:', colors);

// Verify all 6 color subfolder categories exist in data
const requiredColors = ['yellow', 'purple', 'blue', 'pink', 'slate', 'cyan'];
requiredColors.forEach(c => {
  if (!colors[c] || colors[c] <= 0) {
    console.error(`✘ Missing trips for color category: ${c}`);
    process.exit(1);
  }
});
console.log('✔ All 6 Color categories (Transit, POD Sent, Party Payment Pending, Off Loading, Cheque Due, Truck Owner Payment Pending) are actively present!');

console.log('\n=== ALL OWNER DUE INTEGRITY AND UI CHECKS PASSED SUCCESSFULLY! ===\n');
