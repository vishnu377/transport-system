const fs = require('fs');
const vm = require('vm');

console.log('--- Testing LedgerModule Company Expense Methods ---');

const domElements = {};
function getOrCreateEl(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      value: '',
      innerHTML: '',
      innerText: '',
      textContent: '',
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        toggle(c, force) {
          if (force !== undefined) {
            force ? this.classes.add(c) : this.classes.delete(c);
          } else {
            this.classes.has(c) ? this.classes.delete(c) : this.classes.add(c);
          }
        },
        contains(c) { return this.classes.has(c); }
      },
      style: {},
      querySelector: () => null,
      querySelectorAll: () => [],
      reset() { this.value = ''; }
    };
  }
  return domElements[id];
}

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => getOrCreateEl(id),
    querySelector: (sel) => getOrCreateEl(sel),
    querySelectorAll: (sel) => [],
    fullscreenElement: null,
    exitFullscreen: () => {}
  },
  bootstrap: {
    Modal: {
      getOrCreateInstance: () => ({
        show: () => {},
        hide: () => {}
      })
    }
  },
  AppUI: {
    renderSidebar: () => {},
    showToast: (msg, type) => console.log(`[Toast ${type}]: ${msg}`),
    formatCurrency: (val) => `₹ ${val}`
  },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
    removeItem(k) { delete this.data[k]; }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};
sandbox.window = sandbox;

// Create vm context
const context = vm.createContext(sandbox);

// Load sample dataset
const sampleCode = fs.readFileSync('js/sample-company-expenses-data.js', 'utf8');
vm.runInContext(sampleCode, context);

// Load dbService
const dbServiceCode = fs.readFileSync('js/db-service.js', 'utf8');
vm.runInContext(dbServiceCode, context);

// Load LedgerModule
const ledgerCode = fs.readFileSync('js/modules/ledger.js', 'utf8');
vm.runInContext(ledgerCode, context);

(async () => {
  try {
    const LedgerModule = vm.runInContext('LedgerModule', context);
    await LedgerModule.loadData();
    console.log(`Loaded ${LedgerModule.allCompanyExpenses.length} company expenses into LedgerModule.`);

    // 1. Test goToCompanyExpenseView
    LedgerModule.goToCompanyExpenseView('2026-2027', '7 Oct');
    console.log(`mainViewMode: ${LedgerModule.mainViewMode}`);
    console.log(`Filtered company list count: ${LedgerModule.filteredCompanyList.length}`);
    if (LedgerModule.filteredCompanyList.length === 0) {
      throw new Error('Filtered company list should not be empty for 2026-2027 Oct!');
    }

    // 2. Test openCompanyExpenseDetails
    LedgerModule.openCompanyExpenseDetails('COMP_EXP_0001');
    const panelContent = getOrCreateEl('company-expense-panel-content').innerHTML;
    if (!panelContent.includes('₹ 660.000') || !panelContent.includes('Bike Petrol')) {
      throw new Error('Panel content does not match COMP_EXP_0001!');
    }
    console.log('Verified openCompanyExpenseDetails: Contains ₹ 660.000 and Bike Petrol');

    // 3. Test prev/next navigation
    const currentId = LedgerModule.activeCompanyExpenseId;
    LedgerModule.nextCompanyExpenseRecord();
    console.log(`Next record navigated from ${currentId} to ${LedgerModule.activeCompanyExpenseId}`);
    LedgerModule.prevCompanyExpenseRecord();
    console.log(`Prev record navigated back to ${LedgerModule.activeCompanyExpenseId}`);

    // 4. Test Add Expense Modal & Saving
    LedgerModule.openAddCompanyExpenseModal();
    getOrCreateEl('comp-exp-date').value = '2026-10-09';
    getOrCreateEl('comp-exp-amount').value = '1500.000';
    getOrCreateEl('comp-exp-line-item').value = 'Office Maintenance & Cleaning';
    LedgerModule.setExpenseType('Company');
    LedgerModule.setExpenseFrom('Cash');

    const prevCount = LedgerModule.allCompanyExpenses.length;
    await LedgerModule.saveCompanyExpense();
    console.log(`Saved new company expense. Total count before: ${prevCount}, after: ${LedgerModule.allCompanyExpenses.length}`);
    if (LedgerModule.allCompanyExpenses.length !== prevCount + 1) {
      throw new Error('New company expense was not added to allCompanyExpenses!');
    }

    // Verify detail panel opened for newly created expense
    const newDetail = getOrCreateEl('company-expense-panel-content').innerHTML;
    if (!newDetail.includes('1,500.000') || !newDetail.includes('Office Maintenance & Cleaning')) {
      throw new Error('Detail panel for newly created expense was not opened correctly!');
    }
    console.log('Verified new expense detail panel rendered correctly!');

    // 5. Test search input
    LedgerModule.onSearchInput('Office Maintenance');
    console.log(`Search result for "Office Maintenance": ${LedgerModule.filteredCompanyList.length} items`);
    if (LedgerModule.filteredCompanyList.length === 0) {
      throw new Error('Search should find the newly created record!');
    }

    LedgerModule.clearSearch();
    console.log(`After clearSearch: ${LedgerModule.filteredCompanyList.length} items`);

    console.log('--- ALL MODULE TESTS PASSED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('Test Failed:', err);
    process.exit(1);
  }
})();
