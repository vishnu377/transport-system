/**
 * test_sidebar_and_edit_box.js - Test Suite for Sidebar Hide/Unhide and AppSheet Edit Drawer Box
 * Tests:
 *  1. Sidebar Hide/Unhide Toggle in Other B Due List View
 *  2. Unhide Pill rendering and state synchronization
 *  3. Navigation Drawer Toggle (Hamburger)
 *  4. Edit Box / Update Trip Details Drawer (Matching screencapture-...-15_38_20.png)
 *  5. Dynamic Freight recalculation on Rate/Weight input
 *  6. Trip Update Save & Sync
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM
global.window = {
  location: { search: '' }
};

// Mock master dataset
require('../js/sample-other-b-data.js');
const ToBeCreatedModule = require('../js/modules/to_be_created.js');

console.log('--- Running Sidebar & Edit Box Test Suite ---');

const mockElements = {};
function createMockEl(id) {
  return {
    id,
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); },
      toggle(c, force) {
        if (force === true) this.classes.add(c);
        else if (force === false) this.classes.delete(c);
        else if (this.classes.has(c)) { this.classes.delete(c); return false; }
        else { this.classes.add(c); return true; }
      }
    },
    style: {},
    innerText: '',
    innerHTML: '',
    value: '',
    placeholder: ''
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  querySelector(sel) {
    if (sel === '.tobe-list-left-rail') return this.getElementById('tobe-left-rail');
    if (sel === '.appsheet-rail') return this.getElementById('sidebar');
    if (sel === '.appsheet-workspace') return this.getElementById('workspace');
    return null;
  }
};

(async () => {
  // Step 1: Initialize
  console.log('Step 1: Initializing ToBeCreatedModule...');
  await ToBeCreatedModule.init();

  // Step 2: Test Sidebar Hide/Unhide Toggle in List View
  console.log('Step 2: Testing Sidebar Hide / Unhide Toggle...');
  ToBeCreatedModule.openOtherBDueList('ALL');
  const rail = document.getElementById('tobe-left-rail');
  const btnText = document.getElementById('btn-toggle-tobe-sidebar-text');
  const unhideWrap = document.getElementById('tobe-unhide-sidebar-wrap');

  assert.strictEqual(rail.classList.contains('d-none'), false, 'Rail should initially be visible');

  // Toggle hide
  ToBeCreatedModule.toggleSidebar();
  assert.strictEqual(rail.classList.contains('d-none'), true, 'Rail should be hidden after toggle');
  assert.strictEqual(btnText.innerText, 'Show Sidebar', 'Button text should update to Show Sidebar');
  assert.strictEqual(unhideWrap.classList.contains('d-none'), false, 'Unhide pill should be visible');

  // Toggle unhide / restore
  ToBeCreatedModule.toggleSidebar();
  assert.strictEqual(rail.classList.contains('d-none'), false, 'Rail should be visible again');
  assert.strictEqual(btnText.innerText, 'Sidebar', 'Button text should update to Sidebar');
  assert.strictEqual(unhideWrap.classList.contains('d-none'), true, 'Unhide pill should be hidden');
  console.log('✔ Sidebar Hide/Unhide toggle and state synchronization verified');

  // Step 3: Test Navigation Drawer Toggle (Hamburger)
  console.log('Step 3: Testing Navigation Drawer Toggle...');
  const navDrawer = document.getElementById('appsheetDrawer');
  ToBeCreatedModule.toggleNavDrawer();
  assert.strictEqual(navDrawer.classList.contains('show'), true, 'Nav drawer should have .show');
  ToBeCreatedModule.toggleNavDrawer();
  assert.strictEqual(navDrawer.classList.contains('show'), false, 'Nav drawer should close');
  console.log('✔ Hamburger Navigation Drawer toggle verified');

  // Step 4: Test Edit Box (Update Trip Details Drawer) matching screenshot 15_38_20.png
  console.log('Step 4: Testing Update Trip Details Edit Box (matching 15_38_20.png)...');
  ToBeCreatedModule.openTripDetails('2026-2027--262_TTC');
  ToBeCreatedModule.openUpdateTripDrawer();

  const editDrawer = document.getElementById('updateTripDrawer');
  assert.strictEqual(editDrawer.classList.contains('show'), true, 'Update drawer should be open');
  assert.strictEqual(document.getElementById('ut-grno').value, '2026-2027--262_TTC', 'G.R.No. should be populated');
  assert.strictEqual(document.getElementById('ut-rate').value, 1550, 'Rate should be 1550');
  assert.strictEqual(document.getElementById('ut-weight').value, 95.68, 'Weight should be 95.68');
  assert(document.getElementById('ut-freight').value.includes('148,304.00'), 'Freight should be ₹ 148,304.00');

  // Step 5: Test Dynamic Form Freight Recalculation
  console.log('Step 5: Testing Dynamic Freight Recalculation on Rate/Weight changes...');
  document.getElementById('ut-rate').value = 1600;
  document.getElementById('ut-weight').value = 100;
  ToBeCreatedModule.calculateFormFreight();
  assert(document.getElementById('ut-freight').value.includes('160,000.00'), 'Recalculated freight should be ₹ 160,000.00');
  console.log('✔ Dynamic Freight calculation verified');

  // Step 6: Test Saving Updates
  console.log('Step 6: Testing Saving Trip Updates...');
  await ToBeCreatedModule.saveTripUpdate();
  assert.strictEqual(editDrawer.classList.contains('show'), false, 'Drawer should close after save');
  assert.strictEqual(ToBeCreatedModule.activeTrip.rate, 1600, 'Saved rate should be 1600');
  assert.strictEqual(ToBeCreatedModule.activeTrip.weight, 100, 'Saved weight should be 100');
  assert.strictEqual(ToBeCreatedModule.activeTrip.freight, 160000, 'Saved freight should be 160000');
  console.log('✔ Trip Update Save & Sync verified');

  console.log('\n🎉 ALL SIDEBAR & EDIT BOX TESTS PASSED 100%! ZERO REGRESSIONS! 🎉');
})();
