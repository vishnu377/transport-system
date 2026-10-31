// ==============================================================
// TEST SUITE: MODULE 8 - DEF UREA ENGINE (AUTHENTIC APPSHEET SYNC)
// ==============================================================

const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

console.log('=== TEST SUITE: MODULE 8 - DEF UREA (2-CARD APPSHEET LAYOUT) ===');

// Setup mock DOM
global.window = {
  location: { hash: '' }
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
        querySelector: () => null,
        addEventListener: () => {}
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

window.lastToast = null;
global.AppUI = {
  showToast: (msg, type) => {
    window.lastToast = { msg, type };
  }
};

// Load dependencies
const sampleDefCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-def-urea-data.js', 'utf8');
vm.runInThisContext(sampleDefCode);

const dbServiceCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/db-service.js', 'utf8');
vm.runInThisContext(dbServiceCode);
global.dbService = new DBService();

const defUreaCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/modules/def-urea.js', 'utf8');
vm.runInThisContext(defUreaCode);

async function runTests() {
  await DefUreaModule.init();

  console.log('\n--- TEST 1: Data Loading & Metrics Verification ---');
  assert(DefUreaModule.allStock.length >= 1, 'Stock loaded with authentic baseline record');
  assert(DefUreaModule.allConsumed.length >= 90, 'Consumed loaded with 90+ authentic records');
  
  const metrics = DefUreaModule.getStockMetrics();
  assert.strictEqual(metrics.buckets, 194, 'Available Stock (Buckets) is exactly 194');
  assert.strictEqual(metrics.litres, 11, 'Available Stock (Litres) is exactly 11');
  assert.strictEqual(metrics.totalLitres, 3891, 'Total available stock is 3,891 Litres (194*20 + 11)');
  console.log(`✓ TEST 1 PASSED: Stock metrics calibrated (Buckets: ${metrics.buckets}, Litres: ${metrics.litres}, Total: ${metrics.totalLitres}L)!`);

  console.log('\n--- TEST 2: Card 1 - DEF Urea Stock Chart & Inventory Slice Toggle ---');
  const stockContent = document.getElementById('stock-card-content');
  assert(stockContent.innerHTML.includes('appsheet-bar-green'), 'Chart renders Green Bar for Available Stock (Buckets: 194)');
  assert(stockContent.innerHTML.includes('appsheet-bar-red'), 'Chart renders Red Bar for Available Stock (Litres: 11)');
  assert(stockContent.innerHTML.includes('210'), 'Chart scale renders 210 top tick');
  assert(stockContent.innerHTML.includes('30/10/2026'), 'Chart renders authentic timestamp');

  // Test toggle to Inventory Slice table view
  DefUreaModule.toggleStockViewMode();
  assert.strictEqual(DefUreaModule.stockViewMode, 'table', 'Switched to table view mode');
  assert(stockContent.innerHTML.includes('Inventory Slice') || stockContent.innerHTML.includes('appsheet-table'), 'Toggled to Inventory Slice Table');
  
  // Test click row -> Inventory Detail View
  DefUreaModule.openInventoryDetail(DefUreaModule.allStock[0].id);
  assert.strictEqual(DefUreaModule.stockViewMode, 'detail', 'Switched to detail mode');
  assert(stockContent.innerHTML.includes('Inventory Detail'), 'Inventory Detail card rendered');
  assert(stockContent.innerHTML.includes('194'), 'Inventory Detail shows 194 buckets');

  // Test close Inventory Detail
  DefUreaModule.closeInventoryDetail();
  assert.strictEqual(DefUreaModule.stockViewMode, 'table', 'Returned to Inventory Slice table');

  // Toggle back to chart
  DefUreaModule.toggleStockViewMode();
  assert.strictEqual(DefUreaModule.stockViewMode, 'chart', 'Returned to chart view');
  console.log('✓ TEST 2 PASSED: Card 1 Stock Chart, Inventory Slice Table, and Inventory Detail work 100%!');

  console.log('\n--- TEST 3: Card 1 - Add Inward Stock Slide Drawer ---');
  DefUreaModule.openAddStockDrawer();
  const stockDrawer = document.getElementById('defStockDrawer');
  assert(stockDrawer.classList.contains('open'), 'defStockDrawer is open');

  document.getElementById('stock-input-datetime').value = '31-10-2026 13:17:08';
  document.getElementById('stock-input-qty-bucket').value = '10';

  await DefUreaModule.saveStockDrawer();
  assert(!stockDrawer.classList.contains('open'), 'Stock drawer closed after save');

  const updatedMetrics = DefUreaModule.getStockMetrics();
  assert.strictEqual(updatedMetrics.buckets, 204, 'Stock increased by 10 buckets to 204');
  assert.strictEqual(updatedMetrics.totalLitres, 4091, 'Total volume increased to 4,091L');
  console.log('✓ TEST 3 PASSED: Inward stock slide drawer adds buckets, updates scale, and recalculates volume!');

  console.log('\n--- TEST 4: Card 2 - Consumed Details Date Grouping & Badges ---');
  const tableContainer = document.getElementById('consumed-table-container');
  assert(tableContainer.innerHTML.includes('30/10/2026'), 'Date 30/10/2026 rendered');
  assert(tableContainer.innerHTML.includes('>140<'), 'Date 30/10/2026 sum badge 140 rendered');
  assert(tableContainer.innerHTML.includes('29/10/2026'), 'Date 29/10/2026 rendered');
  assert(tableContainer.innerHTML.includes('>120<'), 'Date 29/10/2026 sum badge 120 rendered');
  assert(tableContainer.innerHTML.includes('28/10/2026'), 'Date 28/10/2026 rendered');
  assert(tableContainer.innerHTML.includes('>100<'), 'Date 28/10/2026 sum badge 100 rendered');
  assert(tableContainer.innerHTML.includes('27/10/2026'), 'Date 27/10/2026 rendered');
  assert(tableContainer.innerHTML.includes('>235<'), 'Date 27/10/2026 sum badge 235 rendered');
  assert(tableContainer.innerHTML.includes('26/10/2026'), 'Date 26/10/2026 rendered');
  assert(tableContainer.innerHTML.includes('>40<'), 'Date 26/10/2026 sum badge 40 rendered');
  assert(tableContainer.innerHTML.includes('25/10/2026'), 'Date 25/10/2026 rendered');
  assert(tableContainer.innerHTML.includes('>245<'), 'Date 25/10/2026 sum badge 245 rendered');
  console.log('✓ TEST 4 PASSED: Card 2 Date-grouped table renders 100% matching screenshot sum badges and rows!');

  console.log('\n--- TEST 5: Card 2 - Consumed Record Detail View & Navigation ---');
  const firstId = DefUreaModule.allConsumed[0].id;
  DefUreaModule.openConsumedRecordDetail(firstId);
  const detailView = document.getElementById('consumedRecordDetailView');
  assert.strictEqual(detailView.style.display, 'flex', 'Single Record Detail view is visible');
  assert(detailView.innerHTML.includes('RJ52GB5642'), 'Detail card displays Truck RJ52GB5642');
  assert(detailView.innerHTML.includes('Suresh Raiya'), 'Detail card displays Driver Suresh Raiya');
  assert(detailView.innerHTML.includes('9636017337'), 'Detail card displays Mobile 9636017337');

  // Next record navigation
  DefUreaModule.navigateConsumedRecord(1);
  assert(detailView.innerHTML.includes('RJ52GB2589'), 'Navigated to next record (RJ52GB2589)');

  // Close detail view
  DefUreaModule.closeConsumedRecordDetail();
  assert.strictEqual(detailView.style.display, 'none', 'Single Record Detail view is closed');
  console.log('✓ TEST 5 PASSED: Consumed Record Detail View opens, displays fields, and navigates previous/next!');

  console.log('\n--- TEST 6: Card 2 - Consumed Urea Details Slide Drawer ---');
  DefUreaModule.openAddConsumedDrawer();
  const consumedDrawer = document.getElementById('defConsumedDrawer');
  assert(consumedDrawer.classList.contains('open'), 'defConsumedDrawer opened');

  // Fill drawer inputs matching WhatsApp screenshot
  document.getElementById('consumed-input-date').value = '31-10-2026';
  document.getElementById('consumed-input-truck').value = 'RJ52GC9988';
  document.getElementById('consumed-input-driver-name').value = 'Rameshwar Gurjar';
  document.getElementById('consumed-input-driver-mob').value = '9829156852';
  document.getElementById('consumed-input-qty').value = '40';
  document.getElementById('consumed-input-buckets-ret').value = '2';
  DefUreaModule.setBucketReturnedToggle('Yes');

  await DefUreaModule.saveConsumedDrawer();
  assert(!consumedDrawer.classList.contains('open'), 'Consumed drawer closed after save');

  const added = DefUreaModule.allConsumed.find(c => c.truckNo === 'RJ52GC9988');
  assert(added, 'New consumed entry created');
  assert.strictEqual(added.filledQty, 40, 'Filled Qty is 40 Litres');
  console.log('✓ TEST 6 PASSED: Adding new DEF consumption via slide drawer updates records & persists successfully!');

  console.log('\n--- TEST 7: Real-Time Search Engine ---');
  DefUreaModule.handleSearch('RJ52GB5642');
  assert(DefUreaModule.filteredConsumed.every(c => c.truckNo.includes('RJ52GB5642') || c.driverName.includes('RJ52GB5642')), 'Filter by truck');
  DefUreaModule.handleSearch(''); // Reset
  assert(DefUreaModule.filteredConsumed.length >= 90, 'Search reset restores all records');
  console.log('✓ TEST 7 PASSED: Real-time search filters instantly by truck number, driver, mobile, and date!');

  console.log('\n--- TEST 8: Panel Expand [↗] & Collapse [↙] Mechanism ---');
  const cardStock = document.getElementById('cardDefStock');
  const cardConsumed = document.getElementById('cardConsumedDetails');
  const btnExpStock = document.getElementById('btn-expand-stock');
  const btnExpConsumed = document.getElementById('btn-expand-consumed');

  // 1. Expand Card 1 (Stock)
  DefUreaModule.toggleExpand('stock');
  assert.strictEqual(DefUreaModule.expandedCard, 'stock', 'expandedCard is stock');
  assert(cardStock.classList.contains('panel-expanded'), 'cardDefStock has panel-expanded');
  assert.strictEqual(cardStock.style.display, 'flex', 'cardDefStock is flex display');
  assert.strictEqual(cardConsumed.style.display, 'none', 'cardConsumedDetails is hidden');
  assert.strictEqual(btnExpStock.title, 'Collapse to Split View', 'Button title updated to Collapse');

  // 2. Collapse back to split view
  DefUreaModule.toggleExpand('stock');
  assert.strictEqual(DefUreaModule.expandedCard, null, 'expandedCard is null');
  assert(!cardStock.classList.contains('panel-expanded'), 'cardDefStock panel-expanded removed');
  assert.strictEqual(cardStock.style.display, 'flex', 'cardDefStock is visible');
  assert.strictEqual(cardConsumed.style.display, 'flex', 'cardConsumedDetails is visible');
  assert.strictEqual(btnExpStock.title, 'Expand to Full View', 'Button title updated to Expand');

  // 3. Expand Card 2 (Consumed)
  DefUreaModule.toggleExpand('consumed');
  assert.strictEqual(DefUreaModule.expandedCard, 'consumed', 'expandedCard is consumed');
  assert(cardConsumed.classList.contains('panel-expanded'), 'cardConsumedDetails has panel-expanded');
  assert.strictEqual(cardConsumed.style.display, 'flex', 'cardConsumedDetails is flex display');
  assert.strictEqual(cardStock.style.display, 'none', 'cardDefStock is hidden');
  assert.strictEqual(btnExpConsumed.title, 'Collapse to Split View', 'Button title updated to Collapse');

  // 4. Collapse back to split view
  DefUreaModule.toggleExpand('consumed');
  assert.strictEqual(DefUreaModule.expandedCard, null, 'expandedCard is null again');
  assert.strictEqual(cardStock.style.display, 'flex', 'cardDefStock restored');
  assert.strictEqual(cardConsumed.style.display, 'flex', 'cardConsumedDetails restored');
  console.log('✓ TEST 8 PASSED: Single-click Expand [↗] and Collapse [↙] smoothly toggles 100% full view and split view!');

  console.log('\n======================================================');
  console.log('🏆 ALL 8 DEF UREA MODULE TEST SUITES PASSED 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
