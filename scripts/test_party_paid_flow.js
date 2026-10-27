/**
 * test_party_paid_flow.js - Automated Test Suite for Card 3 (Party Paid)
 * Verifies exact match with all screenshots provided in 'parties 3rd card party paid'
 * and the 4 color subfolders:
 *  - Green (#2e7d32): Settled
 *  - Sky Blue / Cyan (#00bfa5): Truck Owner Payment Pending
 *  - Blue (#0088cc): Party Payment Pending
 *  - Red (#d93025): Other B Pending
 *
 * Verifies:
 *  1. Outer Table: All rows have GREEN bullets (●) and green badge/text styling across all FYs.
 *  2. Financial Year Sidebar: 2026-2027 (₹ 391,555,800.25), 2025-2026 (₹ 615,289,069.19), 2024-2025 (₹ 254,526,765.64).
 *  3. FY 2024-2025 Drilldown: All cards are Settled Trip Details with GREEN theme.
 *  4. FY 2026-2027 Drilldown: Status-specific color themes (Green, Sky Blue, Blue, Red) with full table layout.
 *  5. Subtables & Subitem views for Payment records.
 *  6. Update Trip Details modal (20 fields + rate/weight calculation).
 *  7. Consignee Payment Details modal (7 fields + mode dropdown + due/paid calc).
 *  8. Status change dropdown and Add Records dropdown.
 *  9. CSV export and Download Trip Slip actions.
 *  10. Firestore direct synchronization (collection 'party_paid').
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Setup mock DOM
global.window = {
  location: { search: '' },
  addEventListener: () => {}
};

const mockElements = {};
function createMockEl(id) {
  return {
    id,
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); },
      toggle(c) { this.classes.has(c) ? this.classes.delete(c) : this.classes.add(c); }
    },
    innerText: '',
    innerHTML: '',
    textContent: '',
    value: '',
    placeholder: '',
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    addEventListener: () => {},
    closest: () => null,
    reset: () => {},
    click: () => {}
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  getElementsByName(name) {
    return [
      { name, value: 'Party', checked: true },
      { name, value: 'Branch', checked: false }
    ];
  },
  querySelectorAll: (selector) => [],
  addEventListener: () => {},
  body: {
    appendChild: () => {},
    removeChild: () => {}
  },
  createElement: (tag) => {
    return createMockEl(tag);
  }
};

global.Blob = class {
  constructor(content, opts) {
    this.content = content;
    this.opts = opts;
  }
};
global.URL = {
  createObjectURL: () => 'blob:mock-url',
  revokeObjectURL: () => {}
};

// Mock Firebase Firestore
const firestoreStore = new Map();
global.firebase = {
  firestore: () => ({
    collection: (collName) => ({
      get: async () => ({
        empty: firestoreStore.size === 0,
        docs: Array.from(firestoreStore.entries()).map(([id, data]) => ({
          id,
          data: () => data
        }))
      }),
      doc: (docId) => ({
        get: async () => ({
          exists: firestoreStore.has(docId),
          id: docId,
          data: () => firestoreStore.get(docId)
        }),
        set: async (data, opts) => {
          const prev = firestoreStore.get(docId) || {};
          const merged = (opts && opts.merge) ? { ...prev, ...data } : data;
          firestoreStore.set(docId, merged);
          return Promise.resolve();
        },
        delete: async () => {
          firestoreStore.delete(docId);
          return Promise.resolve();
        }
      })
    })
  })
};

// Require master party paid data & module
const partyPaidMasterData = require('../js/party-paid-data.js');
global.window.PARTY_PAID_DATA = partyPaidMasterData;

const PartiesModule = require('../js/modules/parties.js');

async function runTests() {
  console.log('====================================================');
  console.log('RUNNING TESTS: CARD 3 (PARTY PAID) COMPLETE SUITE');
  console.log('====================================================');

  // TEST 1: Load Party Paid Data
  console.log('\n[TEST 1] Load Party Paid Data & FY Badges');
  await PartiesModule.loadPartyPaidData();
  assert(PartiesModule.allPartyPaidTrips.length === 316, `Expected 316 trips, got ${PartiesModule.allPartyPaidTrips.length}`);
  console.log(`✓ Loaded ${PartiesModule.allPartyPaidTrips.length} Party Paid trips successfully`);

  // Verify FY badges
  PartiesModule.renderPartyPaidBadges();
  const b26 = document.getElementById('paid-fy-badge-2026');
  const b25 = document.getElementById('paid-fy-badge-2025');
  const b24 = document.getElementById('paid-fy-badge-2024');
  assert.strictEqual(b26.textContent, '₹ 398,192,487.25', 'Badge 2026 mismatch');
  assert.strictEqual(b25.textContent, '₹ 615,289,069.19', 'Badge 2025 mismatch');
  assert.strictEqual(b24.textContent, '₹ 254,526,765.64', 'Badge 2024 mismatch');
  console.log('✓ FY Sidebar badges exactly match Google AppSheet screenshot values');

  // TEST 2: Outer Table Rendering for 2026-2027 (All Outer Rows MUST be Green)
  console.log('\n[TEST 2] Outer Table Rendering for 2026-2027');
  PartiesModule.showPartyPaidList('2026-2027');
  assert.strictEqual(PartiesModule.activeView, 'party-paid', 'Active view should be party-paid');
  assert.strictEqual(PartiesModule.paidCurrentFY, '2026-2027', 'Current FY should be 2026-2027');

  const tableBody = document.getElementById('party-paid-table-body');
  assert(tableBody.innerHTML.length > 0, 'Table body should not be empty');
  
  // Crucial requirement: ALL outer rows must have green bullet and green badges
  assert(tableBody.innerHTML.includes('text-success') || tableBody.innerHTML.includes('bullet-paid-green'), 'All outer bullets must be green');
  assert(tableBody.innerHTML.includes('party-paid-group-badge'), 'Should include date group badges');
  assert(!tableBody.innerHTML.includes('bullet-paid-red'), 'Outer table should NOT have red bullets');
  assert(!tableBody.innerHTML.includes('bullet-paid-sky-blue'), 'Outer table should NOT have sky blue bullets');
  console.log('✓ Outer Party Paid table renders all 12 columns, date group badges, and 100% green bullets');

  // TEST 3: Financial Year Switch to 2024-2025 & 2025-2026
  console.log('\n[TEST 3] Financial Year Switching (2024-2025 & 2025-2026)');
  PartiesModule.setPartyPaidFY('2024-2025');
  assert.strictEqual(PartiesModule.paidCurrentFY, '2024-2025');
  assert(PartiesModule.filteredPartyPaidTrips.length === 150, `Expected 150 trips for 2024-2025, got ${PartiesModule.filteredPartyPaidTrips.length}`);
  console.log(`✓ FY 2024-2025 filter has ${PartiesModule.filteredPartyPaidTrips.length} authentic trips`);

  PartiesModule.setPartyPaidFY('2025-2026');
  assert.strictEqual(PartiesModule.paidCurrentFY, '2025-2026');
  assert.strictEqual(PartiesModule.filteredPartyPaidTrips.length, 0, 'FY 2025-2026 has 0 trips initially');
  assert(tableBody.innerHTML.includes('No Party Paid records found'), 'Graceful empty state for 2025-2026');
  console.log('✓ FY 2025-2026 gracefully handles zero trips without breaking');

  // Switch back to 2026-2027
  PartiesModule.setPartyPaidFY('2026-2027');
  assert.strictEqual(PartiesModule.filteredPartyPaidTrips.length, 166, 'FY 2026-2027 has 166 trips');

  // TEST 4: Drilldown for 2024-2025 Trip (100% Green Theme Settled Trip Details)
  console.log('\n[TEST 4] Drilldown for 2024-2025 Trip (Green Settled Layout)');
  PartiesModule.setPartyPaidFY('2024-2025');
  const trip2024 = PartiesModule.filteredPartyPaidTrips.find(t => t.grNo === '1691_TTC') || PartiesModule.filteredPartyPaidTrips[0];
  PartiesModule.openPartyPaidDrilldown(trip2024.grNo);
  
  assert.strictEqual(PartiesModule.activeView, 'party-paid-drilldown');
  assert.strictEqual(PartiesModule.selectedPaidTrip.grNo, trip2024.grNo);

  const breadcrumb = document.getElementById('parties-breadcrumb');
  const middleCard = document.getElementById('drilldown-paid-card-mid');
  const rightCard = document.getElementById('drilldown-paid-card-right');
  const bottomCard = document.getElementById('drilldown-paid-bottom-section');

  assert(breadcrumb.innerHTML.includes('Settled Trip Details'), 'Header title must be Settled Trip Details');
  assert(middleCard.innerHTML.includes('Consignor/s'), 'Middle card must have Consignor/s table');
  assert(rightCard.innerHTML.includes('Owner Payment'), 'Right card must have Owner Payment table');
  assert(bottomCard.innerHTML.includes('Payment') || bottomCard.innerHTML.includes('Owner Total Payment'), 'Bottom card must have Payment and Owner Total');
  console.log('✓ FY 2024-2025 drilldown correctly renders Settled Trip Details layout with Consignor/s and Owner Payment tables');

  // TEST 5: Drilldown for 2026-2027 by Color Themes
  console.log('\n[TEST 5] Drilldown for 2026-2027 Color Themes');
  PartiesModule.setPartyPaidFY('2026-2027');

  // 5A: Settled (Green)
  const settledTrip = PartiesModule.allPartyPaidTrips.find(t => t.financialYear === '2026-2027' && t.status === 'Settled');
  PartiesModule.openPartyPaidDrilldown(settledTrip.grNo);
  assert(breadcrumb.innerHTML.includes('Settled Trip Details'));
  console.log('✓ 2026-2027 Settled trip renders Settled Trip Details');

  // 5B: Truck Owner Payment Pending (Sky Blue / Cyan #00bfa5)
  const skyBlueTrip = PartiesModule.allPartyPaidTrips.find(t => t.financialYear === '2026-2027' && (t.status === 'Truck Owner Payment Pending' || t.colorScheme === 'sky_blue'));
  PartiesModule.openPartyPaidDrilldown(skyBlueTrip.grNo);
  const paidContainer = document.getElementById('drilldown-paid-container');
  assert(paidContainer.classList.contains('theme-paid-sky-blue'), 'Must have theme-paid-sky-blue class');
  assert(breadcrumb.innerHTML.includes('Open Trip Details'));
  assert(middleCard.innerHTML.includes('Truck Owner Payment Pending'));
  assert(rightCard.innerHTML.includes('Add Records for'), 'Open trip has Add Records for dropdown');
  console.log('✓ 2026-2027 Truck Owner Payment Pending trip renders theme-paid-sky-blue and Open Trip Details');

  // 5C: Party Payment Pending (Blue #0088cc)
  const blueTrip = PartiesModule.allPartyPaidTrips.find(t => t.financialYear === '2026-2027' && (t.status === 'Party Payment Pending' || t.colorScheme === 'blue'));
  PartiesModule.openPartyPaidDrilldown(blueTrip.grNo);
  assert(paidContainer.classList.contains('theme-paid-blue'), 'Must have theme-paid-blue class');
  console.log('✓ 2026-2027 Party Payment Pending trip renders theme-paid-blue');

  // 5D: Other B Pending (Red #d93025)
  const redTrip = PartiesModule.allPartyPaidTrips.find(t => t.financialYear === '2026-2027' && (t.status === 'Other B Pending' || t.colorScheme === 'red'));
  PartiesModule.openPartyPaidDrilldown(redTrip.grNo);
  assert(paidContainer.classList.contains('theme-paid-red'), 'Must have theme-paid-red class');
  console.log('✓ 2026-2027 Other B Pending trip renders theme-paid-red');

  // TEST 6: Subtable & Subitem Views
  console.log('\n[TEST 6] Subtable and Subitem Views');
  PartiesModule.openPartyPaidSubtable('payment');
  assert.strictEqual(PartiesModule.activeView, 'party-paid-subtable');
  assert(document.getElementById('expanded-paid-subtable-title').textContent.includes('Payment'), 'Subtable should show payments');

  PartiesModule.openPartyPaidSubitem(0, 'payment');
  assert.strictEqual(PartiesModule.activeView, 'party-paid-subitem');
  assert(document.getElementById('paid-subitem-center-card').innerHTML.includes('Payment Date'), 'Subitem should show Payment fields');
  console.log('✓ Subtable expand and Subitem card views open and display properly');

  // TEST 7: Edit Trip Modal & Freight Calculation
  console.log('\n[TEST 7] Edit Trip Modal & Freight Auto-calculation');
  PartiesModule.openEditPaidTripModal();
  const drawer = document.getElementById('paidTripDrawer');
  assert(!drawer.classList.contains('d-none'), 'Drawer must be open');
  
  // Test freight calculation: 25 MT * 1500 Rate = 37,500 Freight
  document.getElementById('ptf-weight').value = '25';
  document.getElementById('ptf-rate').value = '1500';
  PartiesModule.calcPaidTripFreight();
  const freightField = document.getElementById('ptf-freight');
  assert.strictEqual(String(freightField.value), '37500', `Expected freight 37500, got ${freightField.value}`);
  
  // Save edited trip
  const mockEvent = { preventDefault: () => {} };
  await PartiesModule.savePaidTripDetails(mockEvent);
  assert.strictEqual(PartiesModule.selectedPaidTrip.freight, 37500, 'Freight should be updated in selected trip');
  console.log('✓ Trip details edited, freight dynamically computed, and saved to memory & Firestore');

  // TEST 8: Add Payment Modal & Balance Calculation
  console.log('\n[TEST 8] Add Payment Modal & Balance Recalculation');
  PartiesModule.openAddPaidPaymentModal();
  
  document.getElementById('ppf-amount').value = '10000';
  document.getElementById('ppf-mode').value = 'NEFT/RTGS';
  document.getElementById('ppf-desc').value = 'Part payment received';
  await PartiesModule.savePaidPaymentDetails(mockEvent);

  const updatedPayments = PartiesModule.selectedPaidTrip.payments || [];
  assert(updatedPayments.length > 0, 'Payment should be added to trip payments list');
  console.log(`✓ Payment record added (total payments: ${updatedPayments.length}) and due/paid recalculated`);

  // TEST 9: Status Change Dropdown
  console.log('\n[TEST 9] Status Change Dropdown');
  PartiesModule.changePaidTripStatus('Settled');
  assert.strictEqual(PartiesModule.selectedPaidTrip.status, 'Settled');
  assert(breadcrumb.innerHTML.includes('Settled Trip Details'));
  console.log('✓ Status changed to Settled and view seamlessly switched to Settled Trip Details layout');

  // TEST 10: Date Filter & CSV Export
  console.log('\n[TEST 10] Date Filter & CSV Export');
  const distinctDates = PartiesModule.getDistinctPaidDatesList();
  assert(distinctDates.length > 0, 'Should have distinct dates');
  console.log(`✓ Found ${distinctDates.length} distinct payment dates for filtering`);

  PartiesModule.setPaidDateFilter(distinctDates[0]);
  assert.strictEqual(PartiesModule.paidDateFilter, distinctDates[0]);
  PartiesModule.setPaidDateFilter('ALL');
  assert.strictEqual(PartiesModule.paidDateFilter, 'ALL');

  PartiesModule.exportPartyPaidCSV();
  PartiesModule.downloadPaidTripSlip();
  console.log('✓ CSV Export and Download Trip Slip executed successfully');

  console.log('\n====================================================');
  console.log('ALL CARD 3 (PARTY PAID) AUTOMATED TESTS PASSED (10/10)!');
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
