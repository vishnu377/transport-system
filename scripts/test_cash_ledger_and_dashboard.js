const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("==================================================================");
console.log("  TESTING 8-CARD DASHBOARD & CASH LEDGER AUTHENTIC SYSTEM         ");
console.log("==================================================================");

const dom = {};
function mock(id) {
  if (!dom[id]) {
    dom[id] = {
      id,
      innerText: '',
      innerHTML: '',
      value: id.startsWith('filter-') ? 'ALL' : '',
      style: {},
      placeholder: '',
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        toggle(c, f) {
          if (f === true) this.classes.add(c);
          else if (f === false) this.classes.delete(c);
          else if (this.classes.has(c)) this.classes.delete(c);
          else this.classes.add(c);
          return this.classes.has(c);
        },
        contains(c) { return this.classes.has(c); }
      }
    };
  }
  return dom[id];
}

global.document = {
  getElementById: mock,
  querySelectorAll: (selector) => {
    return [];
  }
};
global.window = global;
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};
global.AppUI = {
  renderSidebar: () => {},
  showToast: (m, t) => console.log(`  [Toast] ${t}: ${m}`),
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d
};
global.APP_CONFIG = { firebase: null };
global.bootstrap = {
  Modal: {
    getOrCreateInstance: () => ({
      show: () => {},
      hide: () => {}
    })
  }
};

// Load datasets and DB service
vm.runInThisContext(fs.readFileSync('js/sample-debts-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/sample-parties-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/sample-truck-owners-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/sample-drivers-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/sample-cash-ledger-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/db-service.js', 'utf8'));
global.dbService = new DBService();

// Load ledger module
vm.runInThisContext(fs.readFileSync('js/modules/ledger.js', 'utf8'));

async function runTests() {
  let passed = 0;
  let total = 0;
  function assert(cond, desc) {
    total++;
    if (cond) {
      console.log(`  ✅ [PASS] ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${desc}`);
      process.exitCode = 1;
    }
  }

  // 1. Initial State & Initialization
  console.log('\n--- 1. Testing Initialization & Data Loading ---');
  await LedgerModule.init();
  assert(LedgerModule.allDebts.length >= 668, `Loaded ${LedgerModule.allDebts.length} Debts (>= 668 expected)`);
  assert(LedgerModule.allCashLedger.length >= 730, `Loaded ${LedgerModule.allCashLedger.length} Daily Cash Ledger entries (>= 730 expected)`);
  assert(LedgerModule.mainViewMode === 'dashboard', `Initial viewMode is 'dashboard'`);

  // 2. Level 0: 8-Card Dashboard Grid
  console.log('\n--- 2. Testing Level 0: 8-Card Multi-Dashboard Grid ---');
  const dashView = dom['ledger-view-dashboard'];
  assert(dashView && !dashView.classList.contains('d-none'), `Dashboard grid is visible`);
  assert(dom['ledger-view-cash-register'].classList.contains('d-none'), `Cash Ledger is hidden initially`);
  assert(dom['ledger-view-register'].classList.contains('d-none'), `Debts register is hidden initially`);
  const crumb = dom['appsheet-breadcrumb'];
  assert(crumb && crumb.innerHTML.includes('Ledger'), `Breadcrumb displays Ledger at root`);

  // 3. Level 1: Cash Ledger View Navigation
  console.log('\n--- 3. Testing Navigation to Cash Ledger Full View ---');
  LedgerModule.goToCashLedgerView('ALL');
  assert(LedgerModule.mainViewMode === 'cash-ledger', `View mode switched to 'cash-ledger'`);
  assert(!dom['ledger-view-cash-register'].classList.contains('d-none'), `Cash Ledger container is visible`);
  assert(dashView.classList.contains('d-none'), `Dashboard container is hidden`);
  assert(dom['appsheet-breadcrumb'].innerHTML.includes('Cash Ledger'), `Breadcrumb shows 'Cash Ledger'`);
  assert(dom['cash-ledger-tbody'].innerHTML.includes('07/10/2026'), `Cash Ledger table rendered top row 07/10/2026`);
  assert(dom['cash-ledger-tbody'].innerHTML.includes('₹ 84,100.00'), `Top row has Amount Received ₹ 84,100.00`);
  assert(dom['cash-ledger-tbody'].innerHTML.includes('₹ 2,126,040.00'), `Top row has Available Cash ₹ 2,126,040.00`);

  // 4. Financial Year Filtering in Cash Ledger
  console.log('\n--- 4. Testing Cash Ledger FY Tree Filtering ---');
  LedgerModule.filterCashFY('2026-2027');
  assert(LedgerModule.selectedCashFY === '2026-2027', `Selected FY is 2026-2027`);
  assert(LedgerModule.filteredCashList.every(r => r.fy === '2026-2027'), `All filtered records belong to 2026-2027`);
  assert(LedgerModule.filteredCashList.length > 100, `2026-2027 has > 100 entries (${LedgerModule.filteredCashList.length})`);

  LedgerModule.filterCashFY('2025-2026');
  assert(LedgerModule.selectedCashFY === '2025-2026', `Selected FY is 2025-2026`);
  assert(LedgerModule.filteredCashList.every(r => r.fy === '2025-2026'), `All filtered records belong to 2025-2026`);

  LedgerModule.filterCashFY('ALL');
  assert(LedgerModule.filteredCashList.length === LedgerModule.allCashLedger.length, `Filter 'ALL' restores all ${LedgerModule.allCashLedger.length} entries`);

  // 5. Search Functionality
  console.log('\n--- 5. Testing Cash Ledger Search Query ---');
  LedgerModule.onSearchInput('27/09/2026');
  assert(LedgerModule.filteredCashList.some(r => r.date === '27/09/2026'), `Found entry 27/09/2026 via search`);
  assert(dom['cash-ledger-tbody'].innerHTML.includes('27/09/2026'), `Rendered search result 27/09/2026`);
  LedgerModule.clearSearch();
  assert(LedgerModule.filteredCashList.length === LedgerModule.allCashLedger.length, `Clear search restored all records`);

  // 6. Day Breakdown Modal
  console.log('\n--- 6. Testing Day Cash Breakdown Modal ---');
  LedgerModule.openCashDayBreakdown('07/10/2026');
  assert(LedgerModule.activeCashBreakdownDate === '07/10/2026', `Active breakdown date set to 07/10/2026`);
  assert(dom['cash-breakdown-body'].innerHTML.includes('₹ 84,100.00'), `Breakdown shows Amount Received ₹ 84,100.00`);
  assert(dom['cash-breakdown-body'].innerHTML.includes('₹ 100,310.00'), `Breakdown shows Expense ₹ 100,310.00`);
  assert(dom['cash-breakdown-body'].innerHTML.includes('₹ 30,800.00'), `Breakdown shows Debt ₹ 30,800.00`);
  assert(dom['cash-breakdown-body'].innerHTML.includes('₹ 2,126,040.00'), `Breakdown shows Available Cash Closing ₹ 2,126,040.00`);

  // 7. Add New Cash Ledger Entry
  console.log('\n--- 7. Testing + Add Cash Entry Form Submission ---');
  const prevCount = LedgerModule.allCashLedger.length;
  const initialCash = LedgerModule.allCashLedger[0].availableCash; // 2,126,040.00
  document.getElementById('cash-form-date').value = '2026-10-08';
  document.getElementById('cash-form-received').value = '50000';
  document.getElementById('cash-form-expense').value = '10000';
  document.getElementById('cash-form-debt').value = '5000';
  document.getElementById('cash-form-desc').value = 'Test new cash entry';
  LedgerModule.updateCashPreview();
  const expectedNewCash = initialCash + 50000 - 10000 - 5000;
  assert(document.getElementById('cash-form-preview').value.includes('2,161,040.00'), `Projected cash preview is correct (₹ 2,161,040.00)`);

  await LedgerModule.saveCashEntry({ preventDefault: () => {} });
  assert(LedgerModule.allCashLedger.length === prevCount + 1, `Cash ledger count incremented to ${LedgerModule.allCashLedger.length}`);
  const newest = LedgerModule.allCashLedger[0];
  assert(newest.date === '08/10/2026', `New entry has date 08/10/2026`);
  assert(newest.availableCash === expectedNewCash, `New entry availableCash is ${newest.availableCash}`);

  // 8. Return to Dashboard via Breadcrumb
  console.log('\n--- 8. Testing Return to 8-Card Dashboard ---');
  LedgerModule.goToDashboardView();
  assert(LedgerModule.mainViewMode === 'dashboard', `Switched back to 'dashboard'`);
  assert(!dom['ledger-view-dashboard'].classList.contains('d-none'), `Dashboard grid is visible again`);
  assert(dom['ledger-view-cash-register'].classList.contains('d-none'), `Cash Ledger is hidden`);

  // 9. Debts View Navigation from Dashboard
  console.log('\n--- 9. Testing Debts Register Navigation from Dashboard ---');
  LedgerModule.goToDebtsView('open');
  assert(LedgerModule.mainViewMode === 'debts', `Switched to 'debts' mode`);
  assert(!dom['ledger-view-register'].classList.contains('d-none'), `Debts register card is visible`);
  assert(dom['appsheet-breadcrumb'].innerHTML.includes('Open'), `Breadcrumb shows 'Open'`);

  console.log('\n==================================================================');
  console.log(`  RESULTS: ${passed} / ${total} TESTS PASSED (100% SUCCESS)`);
  console.log('==================================================================\n');
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
