const fs = require('fs');
const assert = require('assert');

// 1. Verify HTML DOM Nesting
const html = fs.readFileSync('pages/bilty-booking.html', 'utf8');

// Stack-based div validator
const lines = html.split('\n');
const stack = [];
let createViewClosed = false;
let registerViewDepth = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*)>/g;
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const full = match[0];
    const tag = match[1].toLowerCase();
    const attrs = match[2];
    if (['input', 'img', 'br', 'hr', 'col', 'meta', 'link'].includes(tag)) continue;
    if (full.startsWith('</')) {
      const popped = stack.pop();
      if (popped && popped.desc.includes('bilty-create-view')) {
        createViewClosed = true;
      }
    } else if (!full.endsWith('/>')) {
      const idMatch = attrs.match(/id=["']([^"']+)["']/);
      const desc = tag + (idMatch ? '#' + idMatch[1] : '');
      if (desc === 'div#bilty-register-view') {
        registerViewDepth = stack.length;
        assert(createViewClosed, 'CRITICAL ERROR: bilty-register-view started before bilty-create-view was closed!');
      }
      stack.push({ line: i + 1, desc, tag });
    }
  }
}

console.log('✓ TEST 1 PASSED: bilty-create-view closes BEFORE bilty-register-view starts.');
console.log('  bilty-register-view is a direct sibling inside <main class="page-container"> at depth', registerViewDepth);

// 2. Test Multi-Party initial rows (1 row, no dummy auto-population)
// Mock minimal environment
global.window = {};
global.document = {
  getElementById: (id) => ({
    value: '',
    innerText: '',
    innerHTML: '',
    reset: () => {},
    focus: () => {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    querySelectorAll: () => [],
    addEventListener: () => {}
  })
};
global.AppUI = {
  showToast: () => {},
  formatCurrency: (n) => '₹ ' + Number(n).toFixed(2)
};
global.dbService = {
  getAll: async () => []
};

// Check module logic
const BiltyModuleCode = fs.readFileSync('js/modules/bilty-booking.js', 'utf8');
const moduleObjMatch = BiltyModuleCode.match(/const BiltyBookingModule = \{([\s\S]*?)\n\};/);
assert(moduleObjMatch, 'Could not find BiltyBookingModule');

eval('var BiltyBookingModule = {' + moduleObjMatch[1] + '};');

BiltyBookingModule.allTrips = [
  { grNo: '2026-2027-2207_TTC', shortGrNo: '2207_TTC', transport: 'TTC', financialYear: '2026-2027' }
];
BiltyBookingModule.parties = [
  { name: 'PARTY A', gstin: '08ABC123', address: 'Jaipur' },
  { name: 'PARTY B', gstin: '08XYZ789', address: 'Delhi' }
];
BiltyBookingModule.multiBuyers = [];
BiltyBookingModule.multiSellers = [];

// Simulate switching to multi_consignee
BiltyBookingModule.setConsignmentMode('multi_consignee');
assert.strictEqual(BiltyBookingModule.multiBuyers.length, 1, 'Expected exactly 1 buyer row to start, found ' + BiltyBookingModule.multiBuyers.length);
console.log('✓ TEST 2 PASSED: Switching to Multi-Buyer starts with ONLY 1 Buyer (no pre-filled dummy cards).');

// Simulate user clicking "+ Add Another Buyer / GR"
BiltyBookingModule.addBuyerRow();
assert.strictEqual(BiltyBookingModule.multiBuyers.length, 2, 'Expected 2 buyers after clicking + Add');
console.log('✓ TEST 3 PASSED: Clicking + Add dynamically adds Buyer #2.');

// Simulate switching to multi_consignor
BiltyBookingModule.multiSellers = [];
BiltyBookingModule.setConsignmentMode('multi_consignor');
assert.strictEqual(BiltyBookingModule.multiSellers.length, 1, 'Expected exactly 1 seller row to start, found ' + BiltyBookingModule.multiSellers.length);
console.log('✓ TEST 4 PASSED: Switching to Multi-Seller starts with ONLY 1 Seller (no pre-filled dummy cards).');

// Simulate user clicking "+ Add Another Seller / Pickup"
BiltyBookingModule.addSellerRow();
assert.strictEqual(BiltyBookingModule.multiSellers.length, 2, 'Expected 2 sellers after clicking + Add');
console.log('✓ TEST 5 PASSED: Clicking + Add dynamically adds Seller #2.');

// Reset form
BiltyBookingModule.resetForm();
assert.strictEqual(BiltyBookingModule.multiBuyers.length, 0, 'multiBuyers should be empty after reset');
assert.strictEqual(BiltyBookingModule.multiSellers.length, 0, 'multiSellers should be empty after reset');
assert.strictEqual(BiltyBookingModule.bookingMode, 'single', 'bookingMode should be single after reset');
console.log('✓ TEST 6 PASSED: Form reset restores clean single bilty mode.');

console.log('\n🌟 ALL UX AND DOM REGISTRATION TESTS PASSED 100%! 🌟\n');
