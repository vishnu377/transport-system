/**
 * test_card2_comprehensive_fixes.js
 * Comprehensive Verification Test for all user-requested Card 2 & Drilldown Fixes
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== Starting Card 2 Comprehensive Verification Tests ===\n');

// 1. Verify js/party-due-data.js contains all 413 enriched records with complete details
global.window = {};
require('../js/sample-truck-owners-data.js');
require('../js/sample-drivers-data.js');
require('../js/sample-trips-data.js');
const partyDue = require('../js/party-due-data.js');

console.log(`[Test 1] Party Due Dataset Length: ${partyDue.length}`);
assert.strictEqual(partyDue.length, 413, 'Expected 413 party due trips');

// Verify Sunshine Marbles (GR 2582)
const trip2582 = partyDue.find(t => t.grNo && t.grNo.includes('2582'));
assert(trip2582, 'Trip 2582 must exist');
console.log(`[Test 2] Trip 2582 Verified:`);
console.log(`   - Consignee: ${trip2582.consignee}`);
console.log(`   - Consignee GSTIN: ${trip2582.consigneeGstin}`);
console.log(`   - Consignee Mobile: ${trip2582.consigneeMobile}`);
console.log(`   - Owner Mobile: ${trip2582.ownerMobile}`);
console.log(`   - Driver Mobile: ${trip2582.driverMobile}`);
console.log(`   - Reference Mobile: ${trip2582.referenceMobile}`);
console.log(`   - POD Handed Over To: ${trip2582.podHandedOverTo}`);

assert(trip2582.consigneeGstin && trip2582.consigneeGstin !== '-', 'GSTIN must not be empty or -');
assert(trip2582.consigneeMobile && trip2582.consigneeMobile !== '-', 'Consignee Mobile must not be empty or -');
assert(trip2582.ownerMobile && trip2582.ownerMobile !== '-', 'Owner Mobile must not be empty or -');
assert(trip2582.driverMobile && trip2582.driverMobile !== '-', 'Driver Mobile must not be empty or -');
assert(trip2582.referenceMobile && trip2582.referenceMobile !== '-', 'Reference Mobile must not be empty or -');
assert(trip2582.podHandedOverTo, 'POD Handed Over To must exist');

// Verify ALL 413 trips have phones and GSTINs populated
let emptyGstinCount = 0;
let emptyPhoneCount = 0;
partyDue.forEach(t => {
  if (!t.consigneeGstin || t.consigneeGstin === '-') emptyGstinCount++;
  if (!t.consigneeMobile || t.consigneeMobile === '-') emptyPhoneCount++;
  if (!t.ownerMobile || t.ownerMobile === '-') emptyPhoneCount++;
  if (!t.driverMobile || t.driverMobile === '-') emptyPhoneCount++;
});
console.log(`[Test 3] Missing fields check across 413 trips: empty GSTINs=${emptyGstinCount}, empty phones=${emptyPhoneCount}`);
assert.strictEqual(emptyGstinCount, 0, 'No trip should have missing GSTIN');
assert.strictEqual(emptyPhoneCount, 0, 'No trip should have missing phone');

// 2. Verify HTML includes the 8 new fields in #trip-update-form
const html = fs.readFileSync(path.join(__dirname, '../pages/parties.html'), 'utf-8');
const requiredFieldIds = [
  'tf-pod-handed-over-to',
  'tf-reference',
  'tf-reference-mobile',
  'tf-driver',
  'tf-driver-mobile',
  'tf-owner',
  'tf-owner-mobile',
  'tf-bill-no'
];
requiredFieldIds.forEach(id => {
  assert(html.includes(`id="${id}"`), `HTML must contain input #${id}`);
});
console.log(`[Test 4] All 8 new Edit Drawer fields verified in pages/parties.html`);

// 3. Verify CSS prevents text wrapping in status button and select menu
assert(html.includes('.status-btn-label'), 'CSS must define .status-btn-label');
assert(html.includes('white-space: nowrap;'), 'CSS must enforce white-space: nowrap');
assert(html.includes('min-width: 250px;'), 'CSS must give select menu adequate min-width');
console.log(`[Test 5] CSS anti-wrap rules for status dropdown verified in pages/parties.html`);

// 4. Verify PartiesModule openEditTripModal & saveTripDetails
const PartiesModule = require('../js/modules/parties.js');
PartiesModule.allPartyDueTrips = [...partyDue];
PartiesModule.selectedTrip = { ...trip2582 };

// Mock DOM elements
const mockElements = {};
const createMockInput = (id, val) => {
  mockElements[id] = { id, value: val, style: {}, classList: { add() {}, remove() {}, contains() { return false; } } };
};

requiredFieldIds.forEach(id => createMockInput(id, ''));
createMockInput('tf-id', trip2582.id);
createMockInput('tf-grno', trip2582.grNo);
createMockInput('tf-bilty-amount', trip2582.biltyAmount);
createMockInput('tf-billing-type', trip2582.billingType);
createMockInput('tf-rate', trip2582.rate);
createMockInput('tf-weight', trip2582.weight);
createMockInput('tf-freight', trip2582.freight);
createMockInput('tf-hault-charges', 0);
createMockInput('tf-loading-charges', 0);
createMockInput('tf-consignee', trip2582.consignee);
createMockInput('tf-pod-date', '2026-10-23');
createMockInput('tf-pod-weight', 40.0);
createMockInput('tf-pod-to-val', 'Shipper');

global.document = {
  getElementById(id) {
    return mockElements[id] || null;
  },
  getElementsByName() { return []; },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  addEventListener() {}
};

// Test openEditTripModal
PartiesModule.openEditTripModal();
assert.strictEqual(mockElements['tf-driver'].value, trip2582.driver);
assert.strictEqual(mockElements['tf-driver-mobile'].value, trip2582.driverMobile);
assert.strictEqual(mockElements['tf-owner'].value, trip2582.owner);
assert.strictEqual(mockElements['tf-owner-mobile'].value, trip2582.ownerMobile);
assert.strictEqual(mockElements['tf-reference'].value, trip2582.reference);
assert.strictEqual(mockElements['tf-reference-mobile'].value, trip2582.referenceMobile);
assert.strictEqual(mockElements['tf-pod-handed-over-to'].value, trip2582.podHandedOverTo);
console.log(`[Test 6] PartiesModule.openEditTripModal successfully populated all 8 fields`);

// Test saveTripDetails
mockElements['tf-driver'].value = 'Updated Driver Ram';
mockElements['tf-bill-no'].value = 'BILL-9999';
let firestoreUpdated = false;
global.firebase = {
  firestore() {
    return {
      collection(col) {
        return {
          doc(docId) {
            return {
              async set(data, opt) {
                firestoreUpdated = true;
                assert.strictEqual(col, 'party_due');
                assert.strictEqual(docId, trip2582.id);
                assert.strictEqual(data.driver, 'Updated Driver Ram');
                assert.strictEqual(data.billNo, 'BILL-9999');
              }
            };
          }
        };
      }
    };
  }
};

PartiesModule.saveTripDetails().then(() => {
  assert(firestoreUpdated, 'Firestore collection party_due must be updated');
  assert.strictEqual(PartiesModule.selectedTrip.driver, 'Updated Driver Ram');
  assert.strictEqual(PartiesModule.selectedTrip.billNo, 'BILL-9999');
  console.log(`[Test 7] PartiesModule.saveTripDetails committed directly to Firestore party_due`);

  console.log('\n======================================================');
  console.log('>>> ALL 7 CARD 2 COMPREHENSIVE TESTS PASSED! <<<');
  console.log('======================================================\n');
}).catch(err => {
  console.error('Test 7 failed:', err);
  process.exit(1);
});
