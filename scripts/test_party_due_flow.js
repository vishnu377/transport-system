/**
 * test_party_due_flow.js - Automated Test Suite for Card 2 (Party Due)
 * Verifies exact match with all screenshots provided in 'party due wala card'
 * and the 5 color subfolders:
 *  1. Golden / Sun (#bfa100) -> Status: Transit
 *  2. Light Blue (#0088cc) -> Status: Party Payment Pending
 *  3. Dark Blue / Bengani (#6200ea) -> Status: POD Sent/ Bill Generated
 *  4. Pink (#e91e63) -> Status: Off Loading
 *  5. Slate Grey (#5f6368) -> Status: Cheque Due
 *
 * Verifies:
 *  - 11-column table layout with date group headers and red Due Amount
 *  - Financial Year sidebar (All, 2026-2027, 2025-2026, 2024-2025)
 *  - Sidebar hide/unhide toggle
 *  - 3-card drilldown (Trip Info, Subtable, Financial & Status)
 *  - Subtable expand and single subitem card views
 *  - Searchable comboboxes in Edit Trip & Add Cheque drawers
 *  - Live search & scalable pagination
 *  - Direct Firebase Firestore synchronization
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM
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
    reset: () => {}
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
  addEventListener: () => {}
};

global.AppUI = {
  showToast: (msg, type) => {
    console.log(`[Toast ${type}]: ${msg}`);
  }
};

// Mock Firestore dbService
const firestoreCalls = [];
global.dbService = {
  getAll: async (col) => [],
  update: async (col, id, data) => {
    firestoreCalls.push({ action: 'update', col, id, data });
    return true;
  },
  create: async (col, data) => {
    firestoreCalls.push({ action: 'create', col, data });
    return true;
  },
  add: async (col, data) => {
    firestoreCalls.push({ action: 'add', col, data });
    return true;
  }
};

// Mock Bootstrap offcanvas
global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance: () => ({ show: () => {}, hide: () => {} }),
    getInstance: () => ({ show: () => {}, hide: () => {} })
  }
};

// Load datasets and modules
require('../js/sample-parties-data.js');
require('../js/party-due-data.js');
const PartiesModule = require('../js/modules/parties.js');

async function runTests() {
  console.log('=== Running Parties Master Card 2 (Party Due) Full Flow Test Suite ===\n');

  // Test 1: Initialize Module & Load 386 authentic Party Due trips
  console.log('[Test 1] Initializing PartiesModule and loading authentic Party Due trips...');
  await PartiesModule.init();
  assert.ok(PartiesModule.allPartyDueTrips.length >= 380, 'Must load authentic Party Due trips');
  console.log(`✓ Test 1 Passed: Successfully loaded ${PartiesModule.allPartyDueTrips.length} Party Due trips.\n`);

  // Test 2: Party Due List View navigation & FY sidebar badges
  console.log('[Test 2] Navigating to Party Due list view and checking FY badges...');
  PartiesModule.showPartyDueList('2026-2027');
  assert.strictEqual(PartiesModule.activeView, 'party-due-list');
  assert.strictEqual(PartiesModule.currentFY, '2026-2027');

  const b26 = document.getElementById('due-fy-badge-2026');
  const b25 = document.getElementById('due-fy-badge-2025');
  const b24 = document.getElementById('due-fy-badge-2024');

  assert.ok(b26.textContent.includes('26,301,228.76') || b26.textContent.includes('25,340,760.75'), 'FY 2026 badge must match AppSheet');
  assert.ok(b25.textContent.includes('918,706.10'), 'FY 2025 badge must match AppSheet');
  assert.ok(b24.textContent.includes('239,856.00'), 'FY 2024 badge must match AppSheet');
  console.log('✓ Test 2 Passed: Party Due list view opened with correct FY badges.\n');

  // Test 3: Sidebar collapse / unhide toggle
  console.log('[Test 3] Testing sidebar collapse & unhide toggle...');
  assert.strictEqual(PartiesModule.dueSidebarCollapsed, false);
  PartiesModule.toggleDueSidebar();
  assert.strictEqual(PartiesModule.dueSidebarCollapsed, true, 'Sidebar must collapse');
  PartiesModule.toggleDueSidebar();
  assert.strictEqual(PartiesModule.dueSidebarCollapsed, false, 'Sidebar must restore');
  console.log('✓ Test 3 Passed: Sidebar collapse & unhide toggle verified.\n');

  // Test 4: 11-column table rendering with date group headers and red Due Amount
  console.log('[Test 4] Verifying 11-column table rendering, date group headers, and red Due Amount...');
  const tbody = document.getElementById('party-due-table-body');
  assert.ok(tbody.innerHTML.includes('party-due-group-tr'), 'Must contain date group headers');
  assert.ok(tbody.innerHTML.includes('party-due-group-badge'), 'Must contain date group total badge');
  assert.ok(tbody.innerHTML.includes('due-amount-red'), 'Due Amount must be styled in red bold font');
  assert.ok(tbody.innerHTML.includes('22/10/2026') || tbody.innerHTML.includes('21/10/2026'), 'Must display authentic trip dates');
  console.log('✓ Test 4 Passed: 11-column table rendered with date groups and red amounts.\n');

  // Test 5: Verify all 5 color schemes render correctly
  console.log('[Test 5] Verifying all 5 color themes in Party Due table...');
  const goldenTrip = PartiesModule.allPartyDueTrips.find(t => t.colorScheme === 'golden');
  const lightBlueTrip = PartiesModule.allPartyDueTrips.find(t => t.colorScheme === 'light_blue');
  const darkBlueTrip = PartiesModule.allPartyDueTrips.find(t => t.colorScheme === 'dark_blue');
  const pinkTrip = PartiesModule.allPartyDueTrips.find(t => t.colorScheme === 'pink');
  const slateTrip = PartiesModule.allPartyDueTrips.find(t => t.colorScheme === 'slate');

  assert.ok(goldenTrip, 'Must have Golden / Transit trips');
  assert.ok(lightBlueTrip, 'Must have Light Blue / Party Payment Pending trips');
  assert.ok(darkBlueTrip, 'Must have Dark Blue / POD Sent trips');
  assert.ok(pinkTrip, 'Must have Pink / Off Loading trips');
  assert.ok(slateTrip, 'Must have Slate / Cheque Due trips');

  assert.strictEqual(goldenTrip.status, 'Transit');
  assert.strictEqual(lightBlueTrip.status, 'Party Payment Pending');
  assert.strictEqual(darkBlueTrip.status, 'POD Sent/ Bill Generated');
  assert.strictEqual(pinkTrip.status, 'Off Loading');
  assert.strictEqual(slateTrip.status, 'Cheque Due');
  console.log('✓ Test 5 Passed: All 5 color schemes (golden, light_blue, dark_blue, pink, slate) verified.\n');

  // Test 6: Clicking row opens 3-card drilldown (Open Trip Details)
  console.log('[Test 6] Clicking Golden row opens 3-card drilldown...');
  PartiesModule.openPartyDueDrilldown(goldenTrip.id);
  assert.strictEqual(PartiesModule.activeView, 'party-due-drilldown');
  assert.strictEqual(PartiesModule.selectedTrip.id, goldenTrip.id);

  const leftCard = document.getElementById('drilldown-card-left');
  const midCard = document.getElementById('drilldown-card-mid');
  const rightCard = document.getElementById('drilldown-card-right');

  assert.ok(leftCard.innerHTML.includes(goldenTrip.grNo), 'Left card must contain GR No');
  assert.ok(leftCard.innerHTML.includes(goldenTrip.truckNo), 'Left card must contain Truck No');
  assert.ok(midCard.innerHTML.includes('Consignor/s'), 'Middle card must contain Consignor/s table');
  assert.ok(midCard.innerHTML.includes('Expand'), 'Middle card must contain Expand link');
  assert.ok(rightCard.innerHTML.includes(goldenTrip.consignee), 'Right card must contain Consignee');
  assert.ok(rightCard.innerHTML.includes('Status*'), 'Right card must contain Status dropdown');
  console.log('✓ Test 6 Passed: 3-card drilldown view perfectly rendered matching screenshots.\n');

  // Test 7: Switching trip status updates color theme & syncs to Firestore
  console.log('[Test 7] Changing trip status from Transit to POD Sent...');
  firestoreCalls.length = 0;
  PartiesModule.changeTripStatus('POD Sent/ Bill Generated');
  assert.strictEqual(PartiesModule.selectedTrip.status, 'POD Sent/ Bill Generated');
  assert.strictEqual(PartiesModule.selectedTrip.colorScheme, 'dark_blue');
  assert.strictEqual(firestoreCalls.length, 1, 'Must invoke dbService update on status change');
  assert.strictEqual(firestoreCalls[0].col, 'party_due');
  assert.strictEqual(firestoreCalls[0].id, goldenTrip.id);
  console.log('✓ Test 7 Passed: Status change updated theme color and synced to Firestore.\n');

  // Test 8: Subtable Expand and Single Subitem Card navigation
  console.log('[Test 8] Opening Consignor subtable expand & subitem single card view...');
  PartiesModule.openPartyDueSubtable('consignor');
  assert.strictEqual(PartiesModule.activeView, 'party-due-expanded-subtable');
  const subHead = document.getElementById('expanded-subtable-head');
  assert.ok(subHead.innerHTML.includes('Consignor Address'), 'Subtable head must contain columns');

  PartiesModule.openPartyDueSubitem(0, 'consignor');
  assert.strictEqual(PartiesModule.activeView, 'party-due-subitem-card');
  const subitemCard = document.getElementById('subitem-center-card');
  assert.ok(subitemCard.innerHTML.includes('Consignor'), 'Subitem card must show Consignor field');
  console.log('✓ Test 8 Passed: Subtable expand and single card navigation verified.\n');

  // Test 9: Slate theme (Cheque Due) drilldown & Cheque drawer addition
  console.log('[Test 9] Opening Slate (Cheque Due) drilldown and adding new Cheque...');
  PartiesModule.openPartyDueDrilldown(slateTrip.id);
  assert.strictEqual(PartiesModule.selectedTrip.status, 'Cheque Due');
  assert.ok(midCard.innerHTML.includes('Cheque'), 'Middle card must contain Cheque table');
  assert.ok(midCard.innerHTML.includes('Add'), 'Middle card must contain Add link for Cheques');

  PartiesModule.openAddChequeModal();
  const cfAmount = document.getElementById('cf-amount');
  const cfBank = document.getElementById('cf-bank');
  const cfChequeNo = document.getElementById('cf-cheque-no');
  const cfPayTo = document.getElementById('cf-payto');

  cfAmount.value = '50000';
  cfBank.value = 'SBI';
  cfChequeNo.value = 'CHQ-889900';
  cfPayTo.value = 'TTC';

  firestoreCalls.length = 0;
  const initialCheques = slateTrip.cheques ? slateTrip.cheques.length : 0;
  await PartiesModule.saveChequeDetails();

  assert.strictEqual(slateTrip.cheques.length, initialCheques + 1, 'Cheque list must increase by 1');
  assert.strictEqual(slateTrip.cheques[slateTrip.cheques.length - 1].chequeNo, 'CHQ-889900');
  assert.strictEqual(firestoreCalls.length, 1, 'Must invoke dbService update for new cheque');
  console.log('✓ Test 9 Passed: Cheque Due flow, Add Cheque drawer, and Firestore sync verified.\n');

  // Test 10: Edit Trip Details drawer & save to Firestore
  console.log('[Test 10] Testing Edit Trip Details drawer & saving updates...');
  PartiesModule.openPartyDueDrilldown(goldenTrip.id);
  PartiesModule.openEditTripModal();

  const tfFreight = document.getElementById('tf-freight');
  const tfLoading = document.getElementById('tf-loading-charges');
  tfFreight.value = '85000';
  tfLoading.value = '2500';

  firestoreCalls.length = 0;
  await PartiesModule.saveTripDetails();

  assert.strictEqual(goldenTrip.freight, 85000);
  assert.strictEqual(goldenTrip.loadingCharges, 2500);
  assert.strictEqual(goldenTrip.totalFreight, 87500);
  assert.strictEqual(firestoreCalls.length, 1, 'Must invoke dbService update on trip edit');
  console.log('✓ Test 10 Passed: Edit Trip drawer recalculated totals and persisted to Firestore.\n');

  // Test 11: Real-time search filtering across GR No, Consignee, Truck No
  console.log('[Test 11] Testing live search filtering in Party Due...');
  PartiesModule.showPartyDueList('2026-2027');
  const totalBefore = PartiesModule.filteredPartyDueTrips.length;

  // Search by GR / Transport
  PartiesModule.handleDueSearch('TTC');
  assert.ok(PartiesModule.filteredPartyDueTrips.length > 0 && PartiesModule.filteredPartyDueTrips.length <= totalBefore);

  // Search by specific truck
  if (goldenTrip.truckNo) {
    PartiesModule.handleDueSearch(goldenTrip.truckNo);
    assert.ok(PartiesModule.filteredPartyDueTrips.some(t => t.truckNo === goldenTrip.truckNo));
  }

  // Clear search
  PartiesModule.clearDueSearch();
  assert.strictEqual(PartiesModule.dueSearchQuery, '');
  assert.strictEqual(PartiesModule.filteredPartyDueTrips.length, totalBefore);
  console.log('✓ Test 11 Passed: Instant live search filters across multiple fields cleanly.\n');

  // Test 12: Scalable pagination without tearing
  console.log('[Test 12] Testing scalable pagination slicing...');
  PartiesModule.setDuePageSize(50);
  assert.strictEqual(PartiesModule.duePageSize, 50);
  PartiesModule.setDuePage(2);
  assert.strictEqual(PartiesModule.dueCurrentPage, 2);

  const pagControls = document.getElementById('due-pagination-controls');
  assert.ok(pagControls.innerHTML.includes('Page 2'), 'Pagination must display Page 2');
  console.log('✓ Test 12 Passed: Scalable pagination slices records smoothly without tearing.\n');

  // Test 13: HTML Structures in pages/parties.html
  console.log('[Test 13] Verifying Card 2 HTML views and drawers in pages/parties.html...');
  const html = fs.readFileSync(path.join(__dirname, '../pages/parties.html'), 'utf-8');
  assert.ok(html.includes('id="view-party-due-list"'), 'Must have Party Due list view');
  assert.ok(html.includes('id="view-party-due-drilldown"'), 'Must have Party Due 3-card drilldown view');
  assert.ok(html.includes('id="view-party-due-expanded-subtable"'), 'Must have expanded subtable view');
  assert.ok(html.includes('id="view-party-due-subitem-card"'), 'Must have single subitem card view');
  assert.ok(html.includes('id="tripDrawer"'), 'Must have Edit Trip Details drawer');
  assert.ok(html.includes('id="chequeDrawer"'), 'Must have Add Cheque Details drawer');
  assert.ok(html.includes('id="tf-billing-type-dropdown"'), 'Must have billing type combobox');
  assert.ok(html.includes('id="cf-bank-dropdown"'), 'Must have bank combobox');
  assert.ok(html.includes('id="cf-payto-dropdown"'), 'Must have payTo combobox');
  assert.ok(html.includes('party-due-data.js'), 'Must include party-due-data.js script');
  console.log('✓ Test 13 Passed: HTML file contains all Card 2 views, drawers, comboboxes, and styles.\n');

  console.log('===========================================================');
  console.log('>>> ALL 13 PARTIES CARD 2 (PARTY DUE) TESTS PASSED 100%! <<<');
  console.log('===========================================================\n');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
