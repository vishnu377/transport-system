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
    this.innerText = '';
    this.value = '';
    this.className = '';
    this.classList = new MockClassList();
    this.style = {};
    this.attributes = {};
  }
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

  console.log('======================================================');
  console.log('🏆 ALL BILTY DRAWER & EXPAND FLOW TESTS PASSED 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
