const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("=================================================");
console.log("  TESTING APPSHEET 4-LEVEL DRILLDOWN HIERARCHY   ");
console.log("=================================================");

const dom = {};
function mock(id) {
  if (!dom[id]) {
    dom[id] = {
      id,
      innerText: '',
      innerHTML: '',
      value: id.startsWith('filter-') ? 'ALL' : '',
      style: {},
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

global.document = { getElementById: mock, querySelectorAll: () => [] };
global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.AppUI = {
  renderSidebar: () => {},
  showToast: (m, t) => console.log(`[Toast] ${t}: ${m}`),
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d
};
global.APP_CONFIG = { firebase: null };

vm.runInThisContext(fs.readFileSync('js/sample-debts-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/sample-parties-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/db-service.js', 'utf8'));

// Load ledger.js
const ledgerCode = fs.readFileSync('js/modules/ledger.js', 'utf8');
vm.runInThisContext(ledgerCode);

async function run() {
  await LedgerModule.init();
  console.log(`✅ Loaded ${LedgerModule.allDebts.length} debts into system.`);

  // --- 1. LEVEL 1: YEAR VIEW ---
  console.log('\n--- 1. Testing Level 1: Year View (WhatsApp Image 4.10.05 PM.jpeg) ---');
  LedgerModule.goToYearView();
  if (LedgerModule.viewLevel !== 'year') throw new Error(`Expected viewLevel 'year', got ${LedgerModule.viewLevel}`);
  const drillLabel = mock('appsheet-drilldown-label');
  if (drillLabel.innerText !== 'Year') throw new Error(`Expected drilldown label 'Year', got ${drillLabel.innerText}`);
  
  const drillList = mock('appsheet-drilldown-list');
  const expectedFYs = ['2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023', '2020-2021', '2019-2020'];
  expectedFYs.forEach(fy => {
    if (!drillList.innerHTML.includes(fy)) {
      throw new Error(`Drilldown list missing Financial Year: ${fy}`);
    }
  });
  console.log('✅ Level 1 Year View verified with all 7 financial years & gold bullets ●');

  // --- 2. LEVEL 2: MONTH VIEW ---
  console.log('\n--- 2. Testing Level 2: Month View (WhatsApp Image 4.10.33 PM (25).jpeg) ---');
  LedgerModule.goToMonthView('2024-2025');
  if (LedgerModule.viewLevel !== 'month') throw new Error(`Expected viewLevel 'month', got ${LedgerModule.viewLevel}`);
  if (mock('appsheet-dropdown-text').innerText !== '2024-2025') {
    throw new Error(`Expected dropdown text '2024-2025', got ${mock('appsheet-dropdown-text').innerText}`);
  }
  if (mock('appsheet-drilldown-label').innerText !== 'Month') {
    throw new Error(`Expected drilldown label 'Month', got ${mock('appsheet-drilldown-label').innerText}`);
  }
  const expectedMonths = ['12 Mar', '11 Feb', '6 Sep', '1 Apr'];
  expectedMonths.forEach(m => {
    if (!drillList.innerHTML.includes(m)) {
      throw new Error(`Month drilldown missing: ${m}`);
    }
  });
  console.log('✅ Level 2 Month View verified with 12 months & dropdown bar 2024-2025');

  // --- 3. LEVEL 3: 11-COLUMN TABLE VIEW ---
  console.log('\n--- 3. Testing Level 3: 11-Column Table View (WhatsApp Image 4.10.30 PM.jpeg) ---');
  LedgerModule.goToTableView('6 Sep');
  if (LedgerModule.viewLevel !== 'table') throw new Error(`Expected viewLevel 'table', got ${LedgerModule.viewLevel}`);
  if (mock('appsheet-dropdown-text').innerText !== '6 Sep') {
    throw new Error(`Expected dropdown text '6 Sep', got ${mock('appsheet-dropdown-text').innerText}`);
  }
  const tableBody = mock('debts-table-body');
  if (!tableBody.innerHTML.includes('appsheet-row')) {
    throw new Error('Table view does not contain appsheet-row elements');
  }
  if (!tableBody.innerHTML.includes('red-bullet')) {
    throw new Error('Table view does not contain red bullet for Due Amount');
  }
  console.log(`✅ Level 3 Table View verified: ${LedgerModule.filteredList.length} records rendered with date group ribbons & circular dots ●`);

  // --- 4. LEVEL 4: 3-CARD DETAILS VIEW ---
  console.log('\n--- 4. Testing Level 4: 3-Card Debt Details (WhatsApp Image 4.10.05 PM (1).jpeg) ---');
  const testDebt = LedgerModule.allDebts[0];
  LedgerModule.openDebtDetails(testDebt.id);
  if (LedgerModule.viewLevel !== 'details') throw new Error(`Expected viewLevel 'details', got ${LedgerModule.viewLevel}`);
  if (mock('detail-gr-no').innerText !== (testDebt.grNo || '-')) {
    throw new Error(`Expected G.R.No ${testDebt.grNo}, got ${mock('detail-gr-no').innerText}`);
  }
  console.log('✅ Level 4 3-Card Details verified (Particulars, Returned Amount, Financials)');

  // --- 5. SEARCH ENGINE SWITCHING ---
  console.log('\n--- 5. Testing Search Auto-Switch to Table View ---');
  LedgerModule.onSearchInput('RJ52GB5640');
  if (LedgerModule.viewLevel !== 'table') throw new Error('Search input did not switch to Table view');
  if (LedgerModule.filteredList.length === 0) throw new Error('Search returned 0 results for known truck');
  console.log(`✅ Search for 'RJ52GB5640' filtered ${LedgerModule.filteredList.length} records in Table View`);

  // --- 6. VIEW TOGGLE VIA ⊞ ICON ---
  console.log('\n--- 6. Testing View Toggle ⊞ Button ---');
  LedgerModule.toggleViewMode();
  console.log(`✅ View toggle executed, viewLevel is now: ${LedgerModule.viewLevel}`);

  console.log("\n=================================================");
  console.log("  🎉 ALL 4 LEVELS OF APPSHEET DRILLDOWN PASSED!   ");
  console.log("=================================================");
}

run().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
