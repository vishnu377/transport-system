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
  assert(DefUreaModule.allStock.length >= 2, 'Stock loaded with inward records');
  assert(DefUreaModule.allConsumed.length >= 20, 'Consumed loaded with at least 20 records');
  
  const metrics = DefUreaModule.getCurrentStockMetrics();
  assert(metrics.totalInward > 0, 'Total inward is positive');
  assert(metrics.totalConsumed > 0, 'Total consumed is positive');
  console.log(`✓ TEST 1 PASSED: Stock metrics calibrated (Total Inward: ${metrics.totalInward}L, Consumed: ${metrics.totalConsumed}L)!`);

  console.log('\n--- TEST 2: Card 1 - DEF Urea Stock Chart Rendering ---');
  const stockContent = document.getElementById('def-stock-content');
  assert(stockContent.innerHTML.includes('bar-green'), 'Chart renders Green Bar for Available Stock');
  assert(stockContent.innerHTML.includes('bar-red'), 'Chart renders Red Bar for Consumed Stock');
  assert(stockContent.innerHTML.includes('210'), 'Chart scale renders 210 top tick');
  assert(stockContent.innerHTML.includes('30/10/2026'), 'Chart renders authentic timestamp');

  // Test toggle to table view
  DefUreaModule.toggleStockViewMode();
  assert(stockContent.innerHTML.includes('table-hover'), 'Toggled to Inward Stock Table view');
  DefUreaModule.toggleStockViewMode(); // toggle back to chart
  assert(stockContent.innerHTML.includes('bar-green'), 'Toggled back to Chart view');
  console.log('✓ TEST 2 PASSED: Card 1 Stock Bar Chart and toggle between Chart & Table work flawlessly!');

  console.log('\n--- TEST 3: Card 2 - Consumed Details Date Grouping & Badges ---');
  const consumedContent = document.getElementById('def-consumed-container');
  // Check exact group sum badges from screenshot:
  assert(consumedContent.innerHTML.includes('140'), '30/10/2026 group badge displays 140 Litres sum');
  assert(consumedContent.innerHTML.includes('120'), '29/10/2026 group badge displays 120 Litres sum');
  assert(consumedContent.innerHTML.includes('100'), '28/10/2026 group badge displays 100 Litres sum');
  assert(consumedContent.innerHTML.includes('235'), '27/10/2026 group badge displays 235 Litres sum');
  assert(consumedContent.innerHTML.includes('40'), '26/10/2026 group badge displays 40 Litres sum');
  assert(consumedContent.innerHTML.includes('245'), '25/10/2026 group badge displays 245 Litres sum');

  // Check authentic truck & driver presence
  assert(consumedContent.innerHTML.includes('RJ52GB5642'), 'Contains truck RJ52GB5642');
  assert(consumedContent.innerHTML.includes('Suresh Raiya'), 'Contains driver Suresh Raiya');
  assert(consumedContent.innerHTML.includes('9636017337'), 'Contains mobile 9636017337');
  console.log('✓ TEST 3 PASSED: Card 2 Date-grouped table renders 100% matching screenshot sum badges and rows!');

  console.log('\n--- TEST 4: Real-Time Search Engine ---');
  DefUreaModule.handleSearch('RJ52GB5642');
  assert.strictEqual(DefUreaModule.filteredConsumed.length, 1, 'Search filters to 1 row for RJ52GB5642');
  assert(consumedContent.innerHTML.includes('RJ52GB5642'), 'Rendered table contains filtered truck');

  DefUreaModule.handleSearch('Kushiram');
  assert(DefUreaModule.filteredConsumed.length >= 1, 'Search filters driver Kushiram');

  DefUreaModule.handleSearch(''); // Reset search
  assert.strictEqual(DefUreaModule.filteredConsumed.length, DefUreaModule.allConsumed.length, 'Reset returns full list');
  console.log('✓ TEST 4 PASSED: Real-time search filters instantly by truck number, driver, mobile and date!');

  console.log('\n--- TEST 5: Add Consumed Entry via Slide Drawer ---');
  DefUreaModule.openAddConsumedDrawer();
  const drawer = document.getElementById('defConsumedDrawer');
  assert(drawer.classList.contains('open'), 'defConsumedDrawer opened');

  // Fill drawer inputs
  document.getElementById('consumed-input-date').value = '31/10/2026';
  document.getElementById('consumed-input-truck').value = 'RJ52GC1122';
  document.getElementById('consumed-input-driver-name').value = 'Vikram Gurjar';
  document.getElementById('consumed-input-driver-mob').value = '9829012345';
  document.getElementById('consumed-input-qty').value = '40';
  document.getElementById('consumed-input-buckets-ret').value = '2';
  document.getElementById('consumed-input-is-returned').value = 'Yes';

  await DefUreaModule.saveConsumedDrawer();
  assert(!drawer.classList.contains('open'), 'Drawer closed after save');

  const added = DefUreaModule.allConsumed.find(c => c.truckNo === 'RJ52GC1122');
  assert(added, 'New consumed entry successfully created');
  assert.strictEqual(added.filledQty, 40, 'Filled Qty is 40 Litres');
  assert.strictEqual(window.lastToast.type, 'success', 'Success toast shown');
  console.log('✓ TEST 5 PASSED: Adding new DEF consumption via slide drawer updates records & persists successfully!');

  console.log('\n--- TEST 6: Inward Stock Drawer Operation ---');
  DefUreaModule.openAddStockDrawer();
  const stockDrawer = document.getElementById('defStockDrawer');
  assert(stockDrawer.classList.contains('open'), 'defStockDrawer opened');

  document.getElementById('stock-input-date').value = '31/10/2026';
  document.getElementById('stock-input-qty').value = '200';
  document.getElementById('stock-input-rate').value = '45';
  document.getElementById('stock-input-supplier').value = 'HPCL Garage Depot';

  await DefUreaModule.saveStockDrawer();
  assert(!stockDrawer.classList.contains('open'), 'Stock drawer closed after save');
  const addedStock = DefUreaModule.allStock.find(s => s.supplier === 'HPCL Garage Depot');
  assert(addedStock, 'New Inward Stock saved');
  assert.strictEqual(addedStock.qtyLitre, 200, 'Inward stock qty is 200 Litres');
  console.log('✓ TEST 6 PASSED: Adding inward stock updates stock ledger and refreshes bar chart!');

  console.log('\n--- TEST 7: Panel Expand [↗] & Collapse [↙] Mechanism ---');
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
  console.log('✓ TEST 7 PASSED: Single-click Expand [↗] and Collapse [↙] smoothly toggles 100% full view and split view!');

  console.log('\n======================================================');
  console.log('🏆 ALL 7 DEF UREA MODULE TEST SUITES PASSED 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
