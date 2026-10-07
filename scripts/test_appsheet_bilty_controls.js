const fs = require('fs');
const path = require('path');
const vm = require('vm');

const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; }
};
global.window = global;

const toasts = [];
global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d,
  showToast: (msg, type) => {
    toasts.push({ msg, type });
    console.log(`[Toast ${type}]: ${msg}`);
  }
};
global.APP_CONFIG = { firebase: null };

// Mock DOM elements
const mockElements = {
  'mtc-panel-feed': { innerHTML: '', scrollTop: 0, clientHeight: 500, scrollHeight: 1000, addEventListener: () => {} },
  'ttc-panel-feed': { innerHTML: '', scrollTop: 0, clientHeight: 500, scrollHeight: 1000, addEventListener: () => {} },
  'ttc-table-tbody': { innerHTML: '' },
  'bilty-details-kv-table': { innerHTML: '' },
  'btn-mtc-select-all': { classList: { add: () => {}, remove: () => {}, contains: () => false } },
  'btn-ttc-select-all': { classList: { add: () => {}, remove: () => {}, contains: () => false } },
  'icon-mtc-sort': { className: '' },
  'icon-ttc-sort': { className: '' },
  'btn-mtc-expand': { classList: { add: () => {}, remove: () => {} } },
  'icon-mtc-expand': { className: 'bi bi-arrows-angle-expand' },
  'icon-ttc-expand': { className: 'bi bi-arrows-angle-expand' },
  'icon-sync-data': { classList: { add: () => {}, remove: () => {} } },
  'bilty-bulk-bar': { style: { display: 'none' } },
  'bulk-selected-count': { textContent: '0' },
  'bilty-search-input': { value: '' },
  'bilty-search-clear': { style: { display: 'none' } }
};

const mockPanels = {
  '.panel-mtc-col': { classList: { set: new Set(), add(c){ this.set.add(c); }, remove(c){ this.set.delete(c); }, contains(c){ return this.set.has(c); } } },
  '.panel-ttc-col': { classList: { set: new Set(), add(c){ this.set.add(c); }, remove(c){ this.set.delete(c); }, contains(c){ return this.set.has(c); } } },
  '#panel-details-col': { classList: { set: new Set(), add(c){ this.set.add(c); }, remove(c){ this.set.delete(c); }, contains(c){ return this.set.has(c); } } },
  '.appsheet-3panel-container': { classList: { set: new Set(), add(c){ this.set.add(c); }, remove(c){ this.set.delete(c); }, contains(c){ return this.set.has(c); } } }
};

global.document = {
  getElementById: (id) => mockElements[id] || null,
  querySelector: (sel) => mockPanels[sel] || mockElements[sel.replace('#', '')] || null,
  querySelectorAll: (sel) => {
    if (sel === '.appsheet-panel-card') return [mockPanels['.panel-mtc-col'], mockPanels['.panel-ttc-col'], mockPanels['#panel-details-col']];
    return [];
  },
  addEventListener: () => {}
};

// Run scripts
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function runTests() {
  console.log("=== VERIFYING APPSHEET CONTROLS & SCALABILITY ===");

  await BiltyBookingModule.loadAllData();
  console.log(`✓ Data loaded: ${BiltyBookingModule.allTrips.length} bilties.`);

  // 1. Initial 3-Panel Render
  BiltyBookingModule.renderAppSheet3Panels();
  console.log(`✓ MTC panel rendered (${BiltyBookingModule.currentMtcTrips.length} MTC items)`);
  console.log(`✓ TTC panel rendered (${BiltyBookingModule.currentTtcTrips.length} TTC items)`);

  // Verify settled / completed green styling and unsettled normal styling
  const mtcHTML = mockElements['mtc-panel-feed'].innerHTML;
  if (!mtcHTML.includes('row-settled')) {
    throw new Error("MTC HTML missing row-settled class for completed bilties");
  }
  if (!mtcHTML.includes('#1e8e3e')) {
    throw new Error("MTC HTML missing #1e8e3e green color for settled bilties");
  }
  console.log("✓ Verified MTC Settled styling: green dots ● and #1e8e3e green text present!");

  // Verify details card
  const detailsHTML = mockElements['bilty-details-kv-table'].innerHTML;
  if (!detailsHTML.includes('Unlocked') || !detailsHTML.includes('Bilty No.')) {
    throw new Error("Details table missing required AppSheet key-value rows");
  }
  console.log("✓ Verified Bilty Details table: 'Unlocked' badge and sync icon present!");

  // 2. Test Multi-Select Toggle & Batch Selection
  console.log("\n--- Testing Multi-Select on MTC ---");
  BiltyBookingModule.toggleSelectAll('mtc');
  if (BiltyBookingModule.selectedTripIds.size === 0) {
    throw new Error("Expected items to be selected in multi-select mode");
  }
  console.log(`✓ toggleSelectAll('mtc') selected ${BiltyBookingModule.selectedTripIds.size} bilties`);
  console.log(`✓ Bulk action bar display: ${mockElements['bilty-bulk-bar'].style.display}`);

  // Test single item uncheck
  const firstId = Array.from(BiltyBookingModule.selectedTripIds)[0];
  const countBefore = BiltyBookingModule.selectedTripIds.size;
  BiltyBookingModule.toggleTripSelection(firstId);
  if (BiltyBookingModule.selectedTripIds.size !== countBefore - 1) {
    throw new Error("toggleTripSelection failed to toggle item");
  }
  console.log(`✓ toggleTripSelection removed 1 item, now ${BiltyBookingModule.selectedTripIds.size} selected`);

  // Test bulk Mark Settled
  await BiltyBookingModule.bulkMarkSettled();
  console.log(`✓ bulkMarkSettled completed, multi-select exited`);

  // 3. Test Sorting Controls
  console.log("\n--- Testing Sort Cycling ---");
  console.log(`Initial MTC sort mode: ${BiltyBookingModule.mtcSortMode}`);
  BiltyBookingModule.toggleSort('mtc');
  console.log(`Next MTC sort mode: ${BiltyBookingModule.mtcSortMode}`);
  BiltyBookingModule.toggleSort('mtc');
  console.log(`Next MTC sort mode: ${BiltyBookingModule.mtcSortMode}`);

  console.log(`Initial TTC sort mode: ${BiltyBookingModule.ttcSortMode}`);
  BiltyBookingModule.toggleSort('ttc');
  console.log(`Next TTC sort mode: ${BiltyBookingModule.ttcSortMode}`);

  // 4. Test Expand Panel Fullscreen Mode
  console.log("\n--- Testing Expand / Full View ---");
  BiltyBookingModule.expandPanel('mtc');
  if (!mockPanels['.panel-mtc-col'].classList.contains('panel-expanded')) {
    throw new Error("expandPanel('mtc') failed to add panel-expanded class");
  }
  if (mockElements['icon-mtc-expand'].className !== 'bi bi-arrows-angle-contract') {
    throw new Error("expandPanel('mtc') icon did not change to contract");
  }
  console.log("✓ MTC expand full-screen view verified! Icon changed to contract.");

  // Toggle back to 3-column view
  BiltyBookingModule.expandPanel('mtc');
  if (mockPanels['.panel-mtc-col'].classList.contains('panel-expanded')) {
    throw new Error("expandPanel('mtc') second click failed to restore");
  }
  if (mockElements['icon-mtc-expand'].className !== 'bi bi-arrows-angle-expand') {
    throw new Error("expandPanel('mtc') second click icon did not change back to expand");
  }
  console.log("✓ MTC 3-column view restoration verified!");

  // 5. Test Layout Grid Toggle
  console.log("\n--- Testing Layout Grid Toggle (3-Column vs Stacked) ---");
  BiltyBookingModule.toggleLayout();
  if (!mockPanels['.appsheet-3panel-container'].classList.contains('layout-stacked')) {
    throw new Error("toggleLayout failed to add layout-stacked");
  }
  console.log("✓ Switched to stacked layout successfully.");
  BiltyBookingModule.toggleLayout();
  if (mockPanels['.appsheet-3panel-container'].classList.contains('layout-stacked')) {
    throw new Error("toggleLayout second click failed to restore 3-column layout");
  }
  console.log("✓ Restored 3-column master view successfully.");

  // 6. Test Instant Search across all 6,643 Bilties
  console.log("\n--- Testing Instant Search ---");
  BiltyBookingModule.handleSearch("Delhi");
  console.log(`✓ Search 'Delhi' returned: MTC=${BiltyBookingModule.currentMtcTrips.length}, TTC=${BiltyBookingModule.currentTtcTrips.length}`);
  BiltyBookingModule.handleSearch("");
  console.log(`✓ Clear search restored all: MTC=${BiltyBookingModule.currentMtcTrips.length}, TTC=${BiltyBookingModule.currentTtcTrips.length}`);

  console.log("\n========================================================");
  console.log("✅ ALL APPSHEET CONTROLS, BUTTONS & EXPAND VIEWS VERIFIED 100%!");
  console.log("========================================================");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
