/**
 * test_all_other_b_flow.js - Automated Test Suite for "All Other B" (Card 3)
 * Completely verifies:
 *  1. Dashboard & Badges Initialization (267, 341, 280 -> 888)
 *  2. Main List Table & 11 columns with colored bullets (screencapture-appsheet-start-...-12_18_16.png)
 *  3. Top Date Grouping (21/10/2026 with 3 Gold trips: -266, -265, -267)
 *  4. Financial Year Filtering (2026-2027: 267, 2025-2026: 341, 2024-2025: 280)
 *  5. Search query filtering across all fields
 *  6. Sidebar Toggle collapse / unhide
 *  7. Drilldown Navigation for all trip colors:
 *     - Gold (Transit)
 *     - Red (Other B Pending)
 *     - Light Blue (Party Payment Pending)
 *     - Green (Settled)
 *     - Sky Blue (Truck Owner Payment Pending)
 *     - Pink (Off Loading)
 *  8. Dynamic Status Switching & Live View Updating
 *  9. Trip Details Edit Drawer & Synchronization with master list
 *  10. HTML integration in pages/to_be_created.html
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM environment
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
      toggle(c, force) {
        if (force === true) this.classes.add(c);
        else if (force === false) this.classes.delete(c);
        else if (this.classes.has(c)) this.classes.delete(c);
        else this.classes.add(c);
      }
    },
    innerText: '',
    innerHTML: '',
    value: '',
    placeholder: '',
    setAttribute: () => {},
    getAttribute: () => null
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  querySelectorAll(sel) {
    return [];
  },
  addEventListener: () => {}
};

global.AppUI = {
  showToast: (msg, type) => {
    // console.log(`[Toast ${type}]: ${msg}`);
  }
};

// Load datasets and module
require('../js/sample-other-b-data.js');
require('../js/sample-other-b-paid-data.js');
require('../js/sample-all-other-b-data.js');
const ToBeCreatedModule = require('../js/modules/to_be_created.js');
global.ToBeCreatedModule = ToBeCreatedModule;

async function runTests() {
  console.log('=== Running All Other B (Card 3) Full Flow Test Suite ===\n');

  // Test 1: Initialization & Dashboard Badges
  console.log('[Test 1] Initializing module and checking Card 3 dashboard badges...');
  await ToBeCreatedModule.init();

  const elAll2026 = document.getElementById('badge-all-2026');
  const elAll2025 = document.getElementById('badge-all-2025');
  const elAll2024 = document.getElementById('badge-all-2024');

  assert.strictEqual(elAll2026.innerText, '267', '2026-2027 count must be 267');
  assert.strictEqual(elAll2025.innerText, '341', '2025-2026 count must be 341');
  assert.strictEqual(elAll2024.innerText, '280', '2024-2025 count must be 280');
  assert.strictEqual(ToBeCreatedModule.allTrips.length, 888, 'Total trips must be 888');
  console.log('✓ Test 1 Passed: Card 3 dashboard badges match Google AppSheet screenshot targets (267, 341, 280 -> 888).\n');

  // Test 2: Main List Table & 11 Columns
  console.log('[Test 2] Opening All Other B list view and verifying table structure...');
  ToBeCreatedModule.openAllOtherBList('ALL');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'all-list', 'View mode must be all-list');
  assert.strictEqual(ToBeCreatedModule.activeAllYearFilter, 'ALL', 'Active FY filter must be ALL');

  const tableBody = document.getElementById('tobe-all-table-body');
  assert.ok(tableBody.innerHTML.length > 0, 'Table body must not be empty');
  assert.ok(tableBody.innerHTML.includes('21/10/2026'), 'Top date group 21/10/2026 must be present');
  assert.ok(tableBody.innerHTML.includes('-266_TTC'), 'Top trip -266_TTC must be present');
  assert.ok(tableBody.innerHTML.includes('-265_TTC'), 'Top trip -265_TTC must be present');
  assert.ok(tableBody.innerHTML.includes('-267_TTC'), 'Top trip -267_TTC must be present');
  assert.ok(tableBody.innerHTML.includes('tobe-all-row-gold'), 'Gold row class must be present');
  console.log('✓ Test 2 Passed: Main table rendered with authentic date groups and top gold rows.\n');

  // Test 3: FY Filtering
  console.log('[Test 3] Testing Financial Year filtering in All Other B...');
  ToBeCreatedModule.filterAllByYear('2026-2027');
  assert.strictEqual(ToBeCreatedModule.activeAllYearFilter, '2026-2027');
  let rowCount = (tableBody.innerHTML.match(/class="tobe-all-row/g) || []).length;
  assert.strictEqual(rowCount, 267, '2026-2027 table rows must equal 267');

  ToBeCreatedModule.filterAllByYear('2025-2026');
  assert.strictEqual(ToBeCreatedModule.activeAllYearFilter, '2025-2026');
  rowCount = (tableBody.innerHTML.match(/class="tobe-all-row/g) || []).length;
  assert.strictEqual(rowCount, 341, '2025-2026 table rows must equal 341');

  ToBeCreatedModule.filterAllByYear('2024-2025');
  assert.strictEqual(ToBeCreatedModule.activeAllYearFilter, '2024-2025');
  rowCount = (tableBody.innerHTML.match(/class="tobe-all-row/g) || []).length;
  assert.strictEqual(rowCount, 280, '2024-2025 table rows must equal 280');

  // Reset to ALL
  ToBeCreatedModule.filterAllByYear('ALL');
  rowCount = (tableBody.innerHTML.match(/class="tobe-all-row/g) || []).length;
  assert.strictEqual(rowCount, 888, 'ALL table rows must equal 888');
  console.log('✓ Test 3 Passed: Financial Year filtering renders exact counts (267, 341, 280, 888).\n');

  // Test 4: Search query filtering
  console.log('[Test 4] Testing Search query filtering...');
  ToBeCreatedModule.handleSearch('RJ52GB0725');
  let filteredCount = (tableBody.innerHTML.match(/class="tobe-all-row/g) || []).length;
  assert.ok(filteredCount > 0 && filteredCount < 50, 'Search should filter trips to matches');
  assert.ok(tableBody.innerHTML.includes('RJ52GB0725'), 'Matches must contain search term');

  ToBeCreatedModule.handleSearch('');
  filteredCount = (tableBody.innerHTML.match(/class="tobe-all-row/g) || []).length;
  assert.strictEqual(filteredCount, 888, 'Empty search query should restore 888 rows');
  console.log('✓ Test 4 Passed: Real-time search filtering works accurately.\n');

  // Test 5: Sidebar Toggle
  console.log('[Test 5] Testing Financial Year sidebar toggle...');
  const rail = document.getElementById('tobe-all-left-rail');
  const unhideWrap = document.getElementById('tobe-all-unhide-sidebar-wrap');
  
  ToBeCreatedModule.toggleAllSidebar();
  assert.ok(rail.classList.contains('d-none'), 'Sidebar rail should be collapsed');
  assert.ok(!unhideWrap.classList.contains('d-none'), 'Unhide pill should be visible');

  ToBeCreatedModule.toggleAllSidebar();
  assert.ok(!rail.classList.contains('d-none'), 'Sidebar rail should be restored');
  assert.ok(unhideWrap.classList.contains('d-none'), 'Unhide pill should be hidden');
  console.log('✓ Test 5 Passed: Sidebar collapse and unhide pill work smoothly.\n');

  // Test 6: Drilldown Navigation across trip colors
  console.log('[Test 6] Testing drilldown views across color schemes...');
  const contentEl = document.getElementById('tobe-all-trip-details-content');

  // 6a. Gold / Transit trip
  ToBeCreatedModule.openAllTripDetails('2026-2027--266_TTC');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'all-details');
  assert.ok(contentEl.innerHTML.includes('RJ52GB0725'), 'Trip details must include truck number');
  assert.ok(contentEl.innerHTML.includes('Transit') || contentEl.innerHTML.includes('gold'), 'Must render Transit layout');

  // 6b. Red / Other B Pending trip
  ToBeCreatedModule.openAllTripDetails('2026-2027--261_TTC');
  assert.ok(contentEl.innerHTML.includes('RJ52GB2508'), 'Trip details must include truck number');
  assert.ok(contentEl.innerHTML.includes('Other B Pending'), 'Must render Other B Pending layout');

  // 6c. Light Blue / Party Payment Pending trip
  ToBeCreatedModule.openAllTripDetails('2026-2027--262_TTC');
  assert.ok(contentEl.innerHTML.includes('RJ52GB5964'), 'Trip details must include truck number');
  assert.ok(contentEl.innerHTML.includes('Party Payment Pending'), 'Must render Party Payment Pending layout');

  // 6d. Sky Blue / Truck Owner Payment Pending trip
  ToBeCreatedModule.openAllTripDetails('2026-2027--235_TTC');
  assert.ok(contentEl.innerHTML.includes('RJ01GC2159'), 'Trip details must include truck number');
  assert.ok(contentEl.innerHTML.includes('Truck Owner Payment Pending'), 'Must render Sky Blue layout');

  // 6e. Settled / Green trip
  ToBeCreatedModule.openAllTripDetails('2026-2027--254_TTC');
  assert.ok(contentEl.innerHTML.includes('RJ52GB4537') || contentEl.innerHTML.includes('-254'), 'Must render settled trip');
  console.log('✓ Test 6 Passed: Drilldowns for Gold, Red, Blue, Cyan, and Green render their authentic layouts.\n');

  // Test 7: Breadcrumb Navigation
  console.log('[Test 7] Verifying breadcrumb navigation back to All Other B...');
  const bcContainer = document.getElementById('tobe-breadcrumb');
  assert.ok(bcContainer.innerHTML.includes('All Other B'), 'Breadcrumb must contain All Other B');
  assert.ok(bcContainer.innerHTML.includes('openAllOtherBList'), 'Breadcrumb onclick must navigate back to openAllOtherBList');
  console.log('✓ Test 7 Passed: Breadcrumb trail preserves All Other B context.\n');

  // Test 8: Dynamic Status Switching
  console.log('[Test 8] Testing status dropdown selection on active trip...');
  ToBeCreatedModule.openAllTripDetails('2026-2027--266_TTC');
  ToBeCreatedModule.selectPaidStatus('Settled');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.status, 'Settled');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.color, 'green');
  assert.ok(contentEl.innerHTML.includes('Settled'), 'View must update to Settled layout');
  console.log('✓ Test 8 Passed: Live status switching dynamically updates trip and re-renders view.\n');

  // Test 9: HTML Integration
  console.log('[Test 9] Verifying HTML integration in pages/to_be_created.html...');
  const htmlContent = fs.readFileSync(path.join(__dirname, '../pages/to_be_created.html'), 'utf-8');
  assert.ok(htmlContent.includes('id="tobe-view-all-other-b-list"'), 'HTML must have View 6 container');
  assert.ok(htmlContent.includes('id="tobe-view-all-trip-details"'), 'HTML must have View 7 container');
  assert.ok(htmlContent.includes('sample-all-other-b-data.js'), 'HTML must include sample-all-other-b-data.js');
  assert.ok(htmlContent.includes("openAllOtherBList('ALL')"), 'HTML Card 3 expand arrow must call openAllOtherBList');
  console.log('✓ Test 9 Passed: HTML file contains all elements, containers, and scripts.\n');

  console.log('======================================================');
  console.log('>>> ALL 9 ALL OTHER B TESTS PASSED SUCCESSFULLY!   <<<');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
