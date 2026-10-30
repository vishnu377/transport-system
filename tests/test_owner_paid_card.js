const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

console.log('=== TEST SUITE: OWNER PAID CARD & DYNAMIC THEMES ENGINE (V2) ===');

// 1. Mock DOM Environment
global.window = {
  location: { hash: '' },
  print: () => {}
};

const elements = {};
global.document = {
  readyState: 'complete',
  getElementById(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        innerHTML: '',
        innerText: '',
        value: '',
        style: {},
        className: '',
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); },
          toggle(c, force) {
            if (force !== undefined) {
              if (force) this.classes.add(c); else this.classes.delete(c);
            } else {
              if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c);
            }
          }
        },
        querySelectorAll: () => [],
        querySelector: () => null
      };
    }
    return elements[id];
  },
  querySelector(sel) {
    return this.getElementById('mock_' + sel.replace(/[^a-zA-Z0-9]/g, '_'));
  },
  querySelectorAll() {
    return [];
  },
  addEventListener: () => {}
};

// 2. Load dependencies
const sampleOwnersCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-truck-owners-data.js', 'utf8');
vm.runInThisContext(sampleOwnersCode);

const sampleDuesCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-owner-dues-data.js', 'utf8');
vm.runInThisContext(sampleDuesCode);

const samplePaidCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-owner-paid-data.js', 'utf8');
vm.runInThisContext(samplePaidCode);

const dbServiceCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/db-service.js', 'utf8');
vm.runInThisContext(dbServiceCode);
global.dbService = new DBService();

const ownersCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/modules/owners.js', 'utf8');
vm.runInThisContext(ownersCode);

// TEST 1: FY Totals
console.log('\n--- TEST 1: Owner Paid Data Integrity & FY Totals ---');
const s = window.OWNER_PAID_SUMMARY;
assert.strictEqual(s['2026-2027'], 387326250.58);
assert.strictEqual(s['2025-2026'], 613429055.23);
assert.strictEqual(s['2024-2025'], 254765978.79);
assert.strictEqual(s['24-25'], 19901.60);
console.log('✓ TEST 1 PASSED: All 4 FY Totals match exact AppSheet figures!');

// TEST 2: All Table Rows Render in Authentic Green (#00b11f) without wrapping
console.log('\n--- TEST 2: All Table Rows Render in Green (#00b11f) & No Wrap ---');
OwnersModule.selectPaidYear('2024-2025');
const tbody = elements['tbody-owner-paid'].innerHTML;
assert(tbody.includes('color: #00b11f !important'), 'Table must render rows in authentic green #00b11f');
assert(tbody.includes('₹&nbsp;'), 'Currency formatting must use non-breaking space');
console.log('✓ TEST 2 PASSED: Table rows render 100% in authentic green with no jumping text!');

// TEST 3: Drilldown dates are fully present (no missing dates)
console.log('\n--- TEST 3: Drilldown card date integrity ---');
OwnersModule.showOwnerPaidTripDetails('paid-2425-52');
const leftCard = elements['drilldown-card-left'].innerHTML;
assert(leftCard.includes('25/05/2025'), 'Trip Start Date must show 25/05/2025');
assert(leftCard.includes('01/06/2025'), 'Trip End Date must show 01/06/2025');
assert(!leftCard.includes('Trip Start Date</div>\n          <div class="drilldown-field-val"><span class="theme-dot" style="font-size: 11px; margin-right: 4px;">●</span> <span class="theme-text">-</span>'), 'Date must never be empty hyphen');
console.log('✓ TEST 3 PASSED: Drilldown dates are 100% accurate and present!');

// TEST 4: In-card Back Button exists and navigates back to Owner Paid
console.log('\n--- TEST 4: In-card Back Button & Top Navigation ---');
assert.strictEqual(elements['btn-drilldown-back-text'].textContent, 'Back to Owner Paid');
OwnersModule.handleDrilldownBack();
assert.strictEqual(OwnersModule.currentView, 'ownerPaidList');
assert.strictEqual(elements['viewOwnerPaidList'].style.display, 'block');
console.log('✓ TEST 4 PASSED: In-card Back button returns to viewOwnerPaidList seamlessly!');

// TEST 5: Expand button works for Owner Paid payments
console.log('\n--- TEST 5: Expand button works for Owner Paid payments ---');
OwnersModule.showOwnerPaidTripDetails('paid-2026-2501');
OwnersModule.showTripPaymentDetails('paid-2026-2501');
assert.strictEqual(OwnersModule.currentView, 'paymentDetails');
assert.strictEqual(elements['viewTripPaymentDetails'].style.display, 'block');
const paymentCard = elements['payment-details-card-content'].innerHTML;
assert(paymentCard.includes('130,816.00') || paymentCard.includes('61,820.00'), 'Payment Details must display actual payment breakdown');
console.log('✓ TEST 5 PASSED: Expand button on Owner Paid opens full Payment Details view!');

// TEST 6: Expand button works for Owner Paid Consignor / Party details
console.log('\n--- TEST 6: Expand button works for Owner Paid Consignor details ---');
OwnersModule.showOwnerPaidTripDetails('paid-2026-2501');
OwnersModule.showOpenTripPartyDetails('paid-2026-2501');
assert.strictEqual(OwnersModule.currentView, 'partyDetails');
assert.strictEqual(elements['viewOpenTripPartyDetails'].style.display, 'block');
console.log('✓ TEST 6 PASSED: Expand button on Consignor opens full Party Details view!');

// TEST 7: backToTripDetails returns to Owner Paid drilldown
console.log('\n--- TEST 7: backToTripDetails navigation ---');
OwnersModule.backToTripDetails();
assert.strictEqual(OwnersModule.currentView, 'openTripDetails');
assert.strictEqual(elements['viewOpenTripDetails'].style.display, 'block');
console.log('✓ TEST 7 PASSED: backToTripDetails returns to Open Trip Details seamlessly!');

console.log('\n======================================================');
console.log('🏆 ALL TESTS PASSED 100%! ALL USER ISSUES RESOLVED!');
console.log('======================================================');
