/**
 * Test Suite for Bilty Booking:
 * 1. Expand MTC & TTC columns
 * 2. Row clicks in expanded view open Right-Side Slide Drawer
 * 3. Expand / Fullscreen toggle on Right-Side Bilty Details
 * 4. Close button closes Right-Side Drawer
 * 5. + Add button on MTC and TTC opens New Bilty Form from Right Side with pre-selected firm
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM elements
class MockClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
  toggle(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
}

class MockElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.innerHTML = '';
    this._innerText = '';
    this.value = '';
    this.className = '';
    this.classList = new MockClassList();
    this.style = {};
    this.attributes = {};
  }
  set innerText(val) { this._innerText = String(val != null ? val : ''); }
  get innerText() { return this._innerText; }
  querySelectorAll(sel) { return []; }
  querySelector(sel) { return null; }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener() {}
  scrollIntoView() {}
  focus() {}
  reset() { this.value = ''; }
}

const mockDocElements = new Map();
function getOrCreateMockElement(id) {
  if (!mockDocElements.has(id)) {
    mockDocElements.set(id, new MockElement(id));
  }
  return mockDocElements.get(id);
}

global.window = global;
global.document = {
  getElementById: (id) => getOrCreateMockElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateMockElement(sel.slice(1));
    if (sel.startsWith('.')) {
      const className = sel.slice(1);
      const el = getOrCreateMockElement(`class_${className}`);
      el.classList.add(className);
      return el;
    }
    return new MockElement('', sel);
  },
  querySelectorAll: (sel) => [],
  addEventListener: () => {}
};

global.AppUI = {
  showToast: (msg, type) => console.log(`[Toast ${type || 'INFO'}]: ${msg}`),
  formatCurrency: (val) => `₹ ${Number(val || 0).toLocaleString('en-IN')}`
};

global.dbService = {
  tripsStore: [],
  debtsStore: [],
  add: async (col, doc) => {
    if (col === 'trips') global.dbService.tripsStore.push(doc);
    if (col === 'debts') global.dbService.debtsStore.push(doc);
    return doc;
  },
  update: async (col, id, doc) => doc,
  getAll: async (col) => {
    if (col === 'trips') return global.dbService.tripsStore;
    if (col === 'debts') return global.dbService.debtsStore;
    return [];
  }
};

async function runTests() {
  console.log('=== TEST SUITE: BILTY BOOKING - EXPAND & SLIDE-IN DRAWER FLOW ===\n');

  // Load BiltyBookingModule
  const BiltyBookingModule = require('../js/modules/bilty-booking.js');

  // Setup minimal state
  BiltyBookingModule.allTrips = [
    {
      id: 'trip_1',
      grNo: '1321_MTC',
      shortGrNo: '1321_MTC',
      transport: 'MTC',
      truckNo: 'RJ52GB4573',
      consignor: 'Test Consignor',
      destination: 'Delhi',
      driver: 'Driver A',
      biltyDate: '2026-10-05',
      freight: 12000
    },
    {
      id: 'trip_2',
      grNo: '2127_TTC',
      shortGrNo: '2127_TTC',
      transport: 'TTC',
      truckNo: 'RJ52GB2589',
      consignor: 'Test Consignor 2',
      destination: 'Kanpur',
      driver: 'Driver B',
      biltyDate: '2026-09-17',
      freight: 18000
    }
  ];

  const mtcCol = document.querySelector('.panel-mtc-col');
  const ttcCol = document.querySelector('.panel-ttc-col');
  const detailsCol = document.getElementById('panel-details-col');

  // -------------------------------------------------------------------------
  // TEST 1: Expand MTC Column
  // -------------------------------------------------------------------------
  console.log('--- TEST 1: Expand MTC Column ---');
  BiltyBookingModule.expandPanel('mtc');
  assert(mtcCol.classList.contains('panel-expanded'), 'MTC column must have panel-expanded class');
  console.log('✓ TEST 1 PASSED: MTC column expands successfully!\n');

  // -------------------------------------------------------------------------
  // TEST 2: Row Click in Expanded MTC opens Right-Side Slide Drawer
  // -------------------------------------------------------------------------
  console.log('--- TEST 2: Row Click in Expanded MTC opens Slide Drawer ---');
  BiltyBookingModule.selectBilty('trip_1');
  assert(detailsCol.classList.contains('side-drawer-active'), 'Details panel must have side-drawer-active class');
  assert.strictEqual(BiltyBookingModule.currentActiveBilty.id, 'trip_1', 'Active bilty is trip_1');
  console.log('✓ TEST 2 PASSED: Row click in expanded MTC slides in Details from right side!\n');

  // -------------------------------------------------------------------------
  // TEST 3: Expand Button on Details Panel toggles Full Screen
  // -------------------------------------------------------------------------
  console.log('--- TEST 3: Expand Button on Details Panel ---');
  BiltyBookingModule.toggleDetailsExpand();
  assert(detailsCol.classList.contains('panel-expanded'), 'Details panel must be in panel-expanded (fullscreen)');
  
  // Click again to contract back to side drawer
  BiltyBookingModule.toggleDetailsExpand();
  assert(!detailsCol.classList.contains('panel-expanded'), 'Details panel must exit panel-expanded');
  assert(detailsCol.classList.contains('side-drawer-active'), 'Details panel must return to side-drawer-active over MTC');
  console.log('✓ TEST 3 PASSED: Fullscreen toggle expands and restores Details panel!\n');

  // -------------------------------------------------------------------------
  // TEST 4: Close Button on Side Drawer closes Details
  // -------------------------------------------------------------------------
  console.log('--- TEST 4: Close Button on Side Drawer ---');
  BiltyBookingModule.closeSideDrawer();
  assert(!detailsCol.classList.contains('side-drawer-active'), 'side-drawer-active must be removed on close');
  assert(!detailsCol.classList.contains('panel-expanded'), 'panel-expanded must be removed on close');
  console.log('✓ TEST 4 PASSED: Close button cleanly closes Side Drawer!\n');

  // Contract MTC
  BiltyBookingModule.expandPanel('mtc');
  assert(!mtcCol.classList.contains('panel-expanded'), 'MTC restored to 3-column view');

  // -------------------------------------------------------------------------
  // TEST 5: Expand TTC Column & Row Click Flow
  // -------------------------------------------------------------------------
  console.log('--- TEST 5: Expand TTC Column & Row Click ---');
  BiltyBookingModule.expandPanel('ttc');
  assert(ttcCol.classList.contains('panel-expanded'), 'TTC column must have panel-expanded class');

  // Click row in TTC
  BiltyBookingModule.selectBilty('trip_2');
  assert(detailsCol.classList.contains('side-drawer-active'), 'TTC row click opens Details from right side');
  assert.strictEqual(BiltyBookingModule.currentActiveBilty.id, 'trip_2');
  console.log('✓ TEST 5 PASSED: TTC column expand and slide-in row click verified!\n');

  // -------------------------------------------------------------------------
  // TEST 6: + Add Button on MTC and TTC opens New Bilty Form from Right Side
  // -------------------------------------------------------------------------
  console.log('--- TEST 6: + Add Button on MTC and TTC opens Form from Right Side ---');
  BiltyBookingModule.openCreateForm('MTC');
  assert(detailsCol.classList.contains('side-drawer-active'), 'Create form opens as right side drawer');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'MTC', 'Firm pre-selected as MTC');

  BiltyBookingModule.openCreateForm('TTC');
  assert(detailsCol.classList.contains('side-drawer-active'), 'Create form opens as right side drawer');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'TTC', 'Firm pre-selected as TTC');

  BiltyBookingModule.closeSideDrawer();
  assert(!detailsCol.classList.contains('side-drawer-active'), 'Drawer closed after cancel');
  console.log('✓ TEST 6 PASSED: + Add buttons open New Bilty form from Right Side with correct firm!\n');

  // -------------------------------------------------------------------------
  // TEST 7: 1:1 AppSheet Green Bullets & Action Icons (Image 5 Replica)
  // -------------------------------------------------------------------------
  console.log('--- TEST 7: 1:1 AppSheet Green Bullets & Action Icons (Image 5 Replica) ---');
  BiltyBookingModule.renderBiltyDetails(BiltyBookingModule.allTrips[0]);
  const kvTable = document.getElementById('bilty-details-kv-table');
  assert(kvTable.innerHTML.includes('appsheet-green-bullet'), 'KV Table must contain authentic green bullets ●');
  assert(kvTable.innerHTML.includes('appsheet-green-text'), 'KV Table must contain authentic green text');
  assert(kvTable.innerHTML.includes('action-icon-btn'), 'First row G.R.No. must contain action buttons (sync, download, ledger)');
  assert(kvTable.innerHTML.includes('1321_MTC'), 'KV table displays G.R.No. 1321_MTC');
  console.log('✓ TEST 7 PASSED: 1:1 AppSheet Image 5 details rendered with green bullets and action buttons!\n');

  // -------------------------------------------------------------------------
  // TEST 8: 2-Step Bilty Creation Flow & Exact Conditional Field Logic (Screens 1 to 9)
  // -------------------------------------------------------------------------
  console.log('--- TEST 8: 2-Step Bilty Creation Flow & Conditional Fields (Screens 1 to 9) ---');
  const step1 = document.getElementById('bilty-form-step1');
  const step2 = document.getElementById('bilty-form-step2');
  const rowGst = document.getElementById('row-step1-gst');
  const rowMode = document.getElementById('row-bilty-mode');
  const rowDebtType = document.getElementById('row-debt-type');
  const rowDebtDesc = document.getElementById('row-debt-desc');
  const rowDisp = document.getElementById('row-dispatch-from-address');
  const rowShip = document.getElementById('row-ship-to-address');

  // 8A. Click Add -> Opens Step 1 (Screens 1, 2, 3, 4)
  await BiltyBookingModule.openCreateForm('TTC');
  assert.strictEqual(step1.style.display, 'block', 'Step 1 must be displayed (block)');
  assert.strictEqual(step2.style.display, 'none', 'Step 2 must be hidden (none)');
  assert.strictEqual(document.getElementById('bilty-type').value, 'Regular', 'Default bilty type is Regular');
  assert.strictEqual(rowGst.style.display, '', 'GST row visible when Regular');

  // 8B. Screen 1 & 2: Selecting URP hides GST and Transport rows & gives negative -284 sequence
  BiltyBookingModule.setStep1BiltyType('URP');
  assert.strictEqual(document.getElementById('bilty-type').value, 'URP');
  assert.strictEqual(rowGst.style.display, 'none', 'GST row must be hidden when URP is selected');
  assert.strictEqual(document.getElementById('row-step1-transport').style.display, 'none', 'Transport row must be hidden when URP is selected');
  assert.strictEqual(document.getElementById('step1-display-gr').innerText, '-284', 'URP generates authentic negative counter -284');
  assert.strictEqual(document.getElementById('step1-gr-label').innerText, 'URP *', 'URP label shows URP *');
  assert.strictEqual(document.getElementById('bilty-is-gst').value, 'No', 'GST auto-set to No when URP');

  // Switch back to Regular -> GST & Transport rows are visible
  BiltyBookingModule.setStep1BiltyType('Regular');
  assert.strictEqual(rowGst.style.display, '', 'GST row visible when Regular');
  assert.strictEqual(document.getElementById('row-step1-transport').style.display, '', 'Transport row visible when Regular');

  // 8C. Screen 3 & 4: Transport switch updates firm & live G.R.No (MTC: 2, TTC: 2761, SMTC: 260)
  await BiltyBookingModule.setStep1Transport('MTC');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'MTC');
  assert(document.getElementById('step1-display-gr').innerText.length > 0, 'MTC generates sequential G.R.No');
  assert.strictEqual(document.getElementById('step1-gr-label').innerText, 'MTC *');

  await BiltyBookingModule.setStep1Transport('SMTC');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'SMTC');
  assert.strictEqual(document.getElementById('step1-display-gr').innerText, '260', 'SMTC sequential G.R.No is 260');
  assert.strictEqual(document.getElementById('step1-gr-label').innerText, 'SMTC *');

  await BiltyBookingModule.setStep1Transport('TTC');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'TTC');
  assert(document.getElementById('step1-display-gr').innerText.length > 0, 'TTC sequential G.R.No generated');
  assert.strictEqual(document.getElementById('step1-gr-label').innerText, 'TTC *');

  // Screen 10: Is GST Applicable = Yes automatically selects SMTC firm (260)
  BiltyBookingModule.setStep1Gst('Yes');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'SMTC', 'GST Yes auto-routes to SMTC firm');
  assert.strictEqual(document.getElementById('step1-display-gr').innerText, '260', 'SMTC GR is 260');
  BiltyBookingModule.setStep1Gst('No');
  assert.strictEqual(document.getElementById('bilty-firm').value, 'TTC', 'GST No routes back to TTC');

  // 8D. Screen 5: Save on Step 1 advances to Step 2
  BiltyBookingModule.proceedToStep2();
  assert.strictEqual(step1.style.display, 'none', 'Step 1 must be hidden after proceeding');
  assert.strictEqual(step2.style.display, 'block', 'Step 2 must be displayed');
  assert.strictEqual(document.getElementById('appsheet-display-gr').innerText, document.getElementById('step1-display-gr').innerText, 'G.R.No carried from Step 1 to Step 2');

  // 8E. Screen 7: When Status is 'Due', Mode is hidden; when 'Paid', Mode is visible
  BiltyBookingModule.setAppSheetStatus('Due');
  assert.strictEqual(rowMode.style.display, 'none', 'Mode row MUST be hidden when Status is Due');
  BiltyBookingModule.setAppSheetStatus('Paid');
  assert.strictEqual(rowMode.style.display, '', 'Mode row MUST be visible when Status is Paid');

  // 8F. Screen 8: When Any Debt is 'Yes', Debt Type & Description appear; when 'No', hidden
  BiltyBookingModule.setAppSheetDebtToggle(true);
  assert.strictEqual(document.getElementById('bilty-has-debt').value, 'Yes');
  assert.strictEqual(rowDebtType.style.display, '', 'Debt Type row visible when Any Debt is Yes');
  assert.strictEqual(rowDebtDesc.style.display, '', 'Debt Description row visible when Any Debt is Yes');

  BiltyBookingModule.setAppSheetDebtToggle(false);
  assert.strictEqual(document.getElementById('bilty-has-debt').value, 'No');
  assert.strictEqual(rowDebtType.style.display, 'none', 'Debt Type row hidden when Any Debt is No');
  assert.strictEqual(rowDebtDesc.style.display, 'none', 'Debt Description row hidden when Any Debt is No');

  // 8G. Screen 9: When Dispatch From address required is 'Yes', input appears; when 'No', hidden
  BiltyBookingModule.setAppSheetDispatchFromToggle(true);
  assert.strictEqual(document.getElementById('bilty-dispatch-from-req').value, 'Yes');
  assert.strictEqual(rowDisp.style.display, '', 'Dispatch From Address row visible when required');

  BiltyBookingModule.setAppSheetDispatchFromToggle(false);
  assert.strictEqual(document.getElementById('bilty-dispatch-from-req').value, 'No');
  assert.strictEqual(rowDisp.style.display, 'none', 'Dispatch From Address row hidden when not required');

  // 8H. Screen 9: When Ship To address required is 'Yes', input appears; when 'No', hidden
  BiltyBookingModule.setAppSheetShipToToggle(true);
  assert.strictEqual(document.getElementById('bilty-ship-to-req').value, 'Yes');
  assert.strictEqual(rowShip.style.display, '', 'Ship To Address row visible when required');

  BiltyBookingModule.setAppSheetShipToToggle(false);
  assert.strictEqual(document.getElementById('bilty-ship-to-req').value, 'No');
  assert.strictEqual(rowShip.style.display, 'none', 'Ship To Address row hidden when not required');

  // 8I. Editing existing bilty opens Step 2 directly with all conditional rows applied
  BiltyBookingModule.currentActiveBilty = {
    id: 'trip_due_with_debt',
    grNo: '2755_TTC',
    shortGrNo: '2755_TTC',
    transport: 'TTC',
    commissionStatus: 'Due',
    hasDebt: 'Yes',
    debtType: 'Trip Advance',
    debtDescription: 'Road advance for driver',
    dispatchFromAddress: 'Kishangarh Yard #4',
    shipToAddress: 'Ahmedabad Warehouse #2'
  };
  BiltyBookingModule.allTrips.push(BiltyBookingModule.currentActiveBilty);
  BiltyBookingModule.editActiveBilty();

  assert.strictEqual(step1.style.display, 'none', 'Step 1 must be hidden when editing');
  assert.strictEqual(step2.style.display, 'block', 'Step 2 must be open directly when editing');
  assert.strictEqual(rowMode.style.display, 'none', 'Mode is hidden because Status is Due');
  assert.strictEqual(rowDebtType.style.display, '', 'Debt Type is shown because hasDebt is Yes');
  assert.strictEqual(rowDisp.style.display, '', 'Dispatch From address is shown');
  assert.strictEqual(rowShip.style.display, '', 'Ship To address is shown');

  console.log('✓ TEST 8 PASSED: 2-Phase Bilty Flow (Screens 1-4 Setup -> Screen 5 Form) & Screens 6-9 Conditionals verified 100%!\n');

  // -------------------------------------------------------------------------
  // TEST 9: Bilty Save & Print Consignment Note Execution
  // -------------------------------------------------------------------------
  console.log('--- TEST 9: Bilty Save & Print Consignment Note Execution ---');
  let printModalOpenedWith = null;
  BiltyBookingModule.openPrintModal = function(trip) {
    printModalOpenedWith = trip;
    console.log(`[PrintModal]: Opened Consignment Note for G.R. ${trip.shortGrNo || trip.grNo}`);
  };

  // Reset edit state for a fresh new bilty creation
  BiltyBookingModule.editTripId = null;

  // Populate form fields for saving
  document.getElementById('bilty-truck-no').value = 'RJ52GB5964';
  document.getElementById('bilty-consignor').value = 'A-One Marbles Pvt Ltd';
  document.getElementById('bilty-consignee').value = 'Krishna Granites';
  document.getElementById('bilty-destination').value = 'Jaipur';
  document.getElementById('bilty-origin').value = 'Rajsamand (Raj.)';
  document.getElementById('bilty-firm').value = 'TTC';
  document.getElementById('bilty-gr-no').value = '2026-2027-2755_TTC';
  document.getElementById('bilty-short-gr').value = '2755_TTC';
  document.getElementById('bilty-weight').value = '25.500';
  document.getElementById('bilty-rate').value = '800';
  document.getElementById('bilty-freight').value = '20400';
  document.getElementById('bilty-commission').value = '500';
  document.getElementById('bilty-commission-status').value = 'Paid';
  document.getElementById('bilty-commission-mode').value = 'Cash';
  document.getElementById('bilty-has-debt').value = 'Yes';
  document.getElementById('bilty-debt-type').value = 'Trip Advance';
  document.getElementById('bilty-debt-desc').value = 'Diesel cash advance';
  document.getElementById('bilty-dispatch-from-req').value = 'No';
  document.getElementById('bilty-ship-to-req').value = 'No';

  // Execute Save
  await BiltyBookingModule.saveAppSheetBilty();

  // Verify trip was persisted
  assert(global.dbService.tripsStore.length > 0, 'Bilty trip must be saved into trips store');
  const savedTrip = global.dbService.tripsStore[global.dbService.tripsStore.length - 1];
  assert.strictEqual(savedTrip.truckNo, 'RJ52GB5964', 'Truck number matches');
  assert.strictEqual(savedTrip.shortGrNo, '2755_TTC', 'Short GR matches');
  assert.strictEqual(savedTrip.freight, 20400, 'Freight matches');
  assert.strictEqual(savedTrip.hasDebt, 'Yes', 'Debt toggle matches');

  // Verify linked debt was created
  assert(global.dbService.debtsStore.length > 0, 'Linked debt must be saved into debts store');
  const savedDebt = global.dbService.debtsStore[global.dbService.debtsStore.length - 1];
  assert.strictEqual(savedDebt.truckNo, 'RJ52GB5964');
  assert.strictEqual(savedDebt.grNo, '2755_TTC');

  // Verify print modal was opened automatically
  assert(printModalOpenedWith !== null, 'Print modal must be triggered automatically after save');
  assert.strictEqual(printModalOpenedWith.shortGrNo, '2755_TTC');

  console.log('✓ TEST 9 PASSED: Bilty saves seamlessly without crashes and opens print consignment note modal!\n');

  console.log('======================================================');
  console.log('🏆 ALL BILTY DRAWER & EXPAND FLOW TESTS PASSED 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
