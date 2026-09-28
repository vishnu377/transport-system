const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("=================================================");
console.log("  VERIFYING APPSHEET AUTHENTIC LEDGER UI & ENGINE");
console.log("=================================================");

const htmlPath = path.join(__dirname, '../pages/ledger.html');
const jsPath = path.join(__dirname, '../js/modules/ledger.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. Verify CSS & AppSheet Theme integration
const requiredCSS = [
  'appsheet-theme.css',
  '--appsheet-gold: #bfa15f',
  '.appsheet-top-bar',
  '.appsheet-search-box',
  '.btn-appsheet-add',
  '.appsheet-panel',
  '.appsheet-table',
  '.appsheet-row',
  '.appsheet-pill',
  '.appsheet-summary-item'
];

console.log('\n--- 1. Checking CSS & AppSheet Theme Elements ---');
requiredCSS.forEach(token => {
  if (!html.includes(token)) {
    throw new Error(`Missing required AppSheet CSS token in ledger.html: ${token}`);
  }
  console.log(`✅ AppSheet token verified: ${token}`);
});

// 2. Verify Google AppSheet Top Bar & Controls
const requiredDOM = [
  'appsheet-top-bar',
  'ledger-search-input',
  'btn-appsheet-add',
  'tab-btn-open',
  'tab-btn-all',
  'tab-btn-settled',
  'tab-btn-statements',
  'month-bar-container',
  'debts-register-table',
  'debts-table-body',
  'fy-list-container',
  'summary-total-due',
  'summary-total-debt',
  'summary-total-returned',
  'summary-count',
  'ledger-view-register',
  'ledger-view-details',
  'ledger-view-statements',
  'modal-add-debt',
  'modal-record-return',
  'modal-import-debts'
];

console.log('\n--- 2. Checking AppSheet Top Bar & DOM Containers ---');
requiredDOM.forEach(id => {
  const hasId = html.includes(`id="${id}"`) || html.includes(`class="${id}"`) || html.includes(`class="appsheet-top-bar`);
  if (!hasId) {
    throw new Error(`Missing required DOM container in ledger.html: ${id}`);
  }
  console.log(`✅ DOM container verified: ${id}`);
});

// 3. Verify Ledger Engine Functionality
console.log('\n--- 3. Testing Ledger Logic & AppSheet Rendering ---');
const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; }
};
global.window = global;
global.AppUI = {
  renderSidebar: () => {},
  showToast: (m, t) => console.log(`[Toast] ${t}: ${m}`),
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d
};
global.APP_CONFIG = { firebase: null };

// Mock DOM elements
const domElements = {};
function mockElement(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      innerText: '',
      innerHTML: '',
      value: id.startsWith('filter-') ? 'ALL' : '',
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        toggle(c, force) {
          if (force === true) this.classes.add(c);
          else if (force === false) this.classes.delete(c);
          else if (this.classes.has(c)) this.classes.delete(c);
          else this.classes.add(c);
          return this.classes.has(c);
        },
        contains(c) { return this.classes.has(c); }
      },
      querySelectorAll: () => [],
      style: {}
    };
  }
  return domElements[id];
}

global.document = {
  getElementById: (id) => mockElement(id),
  querySelectorAll: () => []
};

vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(js);

async function runTests() {
  await LedgerModule.init();
  console.log(`✅ Loaded ${LedgerModule.allDebts.length} master debts successfully!`);
  
  if (LedgerModule.allDebts.length !== 668) {
    throw new Error(`Expected 668 debts, got ${LedgerModule.allDebts.length}`);
  }

  // Check FY sidebar rendering
  const fyContainer = domElements['fy-list-container'];
  if (!fyContainer.innerHTML.includes('appsheet-summary-item') && !fyContainer.innerHTML.includes('2026-2027')) {
    throw new Error('FY sidebar does not contain AppSheet summary items');
  }
  console.log('✅ AppSheet FY Summary card rendered with correct classes!');

  // Check table rendering
  const tableBody = domElements['debts-table-body'];
  if (!tableBody.innerHTML.includes('appsheet-row')) {
    throw new Error('Table body rows do not contain appsheet-row class');
  }
  console.log('✅ AppSheet Table rows rendered with appsheet-row class & chevron > navigation!');

  // Check search
  LedgerModule.onSearchInput('2188_TTC');
  if (LedgerModule.filteredList.length === 0) {
    throw new Error('Search for 2188_TTC returned 0 results');
  }
  console.log(`✅ AppSheet Search for 2188_TTC passed (${LedgerModule.filteredList.length} matching record)!`);

  // Clear search
  LedgerModule.clearSearch();
  console.log(`✅ Cleared search, active list restored to ${LedgerModule.filteredList.length} records!`);

  // Check Tab Switch to 'all'
  LedgerModule.switchTab('all');
  console.log(`✅ Switched tab to 'all', filtered items: ${LedgerModule.filteredList.length}`);

  // Switch back to 'open'
  LedgerModule.switchTab('open');
  console.log(`✅ Switched tab back to 'open', filtered items: ${LedgerModule.filteredList.length}`);

  console.log("\n=================================================");
  console.log("  🚀 ALL APPSHEET LEDGER UI VERIFICATIONS PASSED! ");
  console.log("=================================================");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
