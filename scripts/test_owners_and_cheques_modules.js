// End-to-end integration test for Google AppSheet matching Cheques and Truck Owners modules
const fs = require('fs');
const path = require('path');

// 1. Mock Browser Environment
const localStorageData = {};
global.localStorage = {
  getItem: (key) => localStorageData[key] || null,
  setItem: (key, val) => { localStorageData[key] = String(val); },
  removeItem: (key) => { delete localStorageData[key]; },
  clear: () => { Object.keys(localStorageData).forEach(k => delete localStorageData[k]); }
};

const domElements = {};
function createMockElement(id, tagName = 'div') {
  const el = {
    id,
    tagName,
    innerText: '',
    innerHTML: '',
    value: '',
    classList: {
      classes: new Set(),
      add: (c) => el.classList.classes.add(c),
      remove: (c) => el.classList.classes.delete(c),
      contains: (c) => el.classList.classes.has(c)
    },
    querySelectorAll: (sel) => [],
    reset: () => { el.value = ''; }
  };
  domElements[id] = el;
  return el;
}

global.document = {
  getElementById: (id) => domElements[id] || createMockElement(id),
  querySelectorAll: (sel) => [],
  addEventListener: () => {}
};

global.window = global;
global.bootstrap = {
  Modal: class {
    constructor(el) {}
    show() {}
    hide() {}
    static getInstance(el) { return { hide() {}, show() {} }; }
  }
};

global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => '₹ ' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  showToast: (msg, type) => console.log(` [Toast] ${type}: ${msg}`)
};

// 2. Load Core Dependencies
eval(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-cheques-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf8'));
const dbCode = fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8');
eval(dbCode + '\nglobal.dbService = dbService;');

// 3. Load Modules
const chqCode = fs.readFileSync(path.join(__dirname, '../js/modules/cheques.js'), 'utf8');
eval(chqCode + '\nglobal.ChequesModule = ChequesModule;');

const ownCode = fs.readFileSync(path.join(__dirname, '../js/modules/owners.js'), 'utf8');
eval(ownCode + '\nglobal.OwnersModule = OwnersModule;');

async function runEndToEndTests() {
  console.log("=================================================");
  console.log("  TESTING APPSHEET CHEQUES & TRUCK OWNERS (586)  ");
  console.log("=================================================");

  // --- PART A: CHEQUES REGISTER TESTS (sample_51.png) ---
  console.log("\n--- Testing ChequesModule ---");
  await ChequesModule.init();

  console.log(` Cheques loaded: ${ChequesModule.allCheques.length}`);
  if (ChequesModule.allCheques.length < 700) throw new Error("Expected at least 700 cheques!");

  console.log(` Total Cheques: ${domElements['tab-count-all']?.innerText}`);
  console.log(` Cleared: ${domElements['tab-count-cleared']?.innerText}`);
  console.log(` Bounced: ${domElements['tab-count-bounced']?.innerText}`);
  console.log(` Pending: ${domElements['tab-count-pending']?.innerText}`);
  console.log(` Deposited: ${domElements['tab-count-deposited']?.innerText}`);

  // Test Bounced Filter
  ChequesModule.setStatusFilter('Bounced');
  if (!domElements['cheques-tbody']?.innerHTML.includes('dot-bounced')) {
    throw new Error("Bounced filter did not render dot-bounced rows!");
  }
  console.log(" Bounced cheques filter rendered with AppSheet red dots (●).");

  // Test Status Update (e.g. Deposit Pending Cheque)
  const pCheque = ChequesModule.allCheques.find(c => c.status === 'Pending');
  if (pCheque) {
    await ChequesModule.updateChequeStatus(pCheque.id, 'Deposited');
    const updated = await dbService.getById('cheques', pCheque.id);
    if (updated.status !== 'Deposited') throw new Error("Cheque status update failed!");
    console.log(` Cheque status update passed: #${pCheque.chequeNo} is now Deposited.`);
  }

  // --- PART B: TRUCK OWNERS MASTER TESTS (file0_top.png) ---
  console.log("\n--- Testing OwnersModule ---");
  await OwnersModule.init();

  console.log(` Total Truck Owners loaded: ${OwnersModule.allOwners.length}`);
  if (OwnersModule.allOwners.length !== 586) {
    throw new Error(`Expected exactly 586 truck owners! Got ${OwnersModule.allOwners.length}`);
  }

  console.log(` AppSheet Header Badge: Number ${domElements['appsheet-header-count']?.innerText}`);
  if (String(domElements['appsheet-header-count']?.innerText) !== '586') {
    throw new Error("AppSheet Number 586 badge mismatch!");
  }

  // Test Own Fleet filter (Own 10 Trucks)
  OwnersModule.setCategoryFilter('SELF');
  const selfHtml = domElements['truck-owners-tbody']?.innerHTML;
  if (!selfHtml.includes('Own 10')) {
    throw new Error("Own Fleet filter did not render Own 10 trucks!");
  }
  console.log(" Own Fleet filter rendered correctly with VIP 10 badge.");

  // Test Search by Truck No. (e.g. RJ42GA0451)
  OwnersModule.setCategoryFilter('ALL');
  OwnersModule.handleSearch('RJ42GA0451');
  const searchHtml = domElements['truck-owners-tbody']?.innerHTML;
  if (!searchHtml.includes('RJ42GA0451') || !searchHtml.toLowerCase().includes('abcd')) {
    throw new Error("Search by Truck No. RJ42GA0451 failed!");
  }
  console.log(" Instant search by Truck No. RJ42GA0451 matched ABCD successfully.");

  // Test Payment Recording
  OwnersModule.handleSearch('');
  OwnersModule.setCategoryFilter('ALL');
  const ownerWithDue = OwnersModule.allOwners.find(o => o.dueAmount > 5000);
  if (ownerWithDue) {
    console.log(` Testing payment on truck ${ownerWithDue.truckNo} (${ownerWithDue.name}) with Due: ${ownerWithDue.dueAmount}`);
    createMockElement('pay-owner-id').value = ownerWithDue.id;
    createMockElement('pay-amount').value = '5000';
    createMockElement('pay-date').value = '2026-09-26';
    createMockElement('pay-mode').value = 'Bank Transfer (NEFT/RTGS)';
    createMockElement('pay-ref').value = 'UTR99881122';
    createMockElement('pay-remarks').value = 'Freight settlement';

    const prevDue = ownerWithDue.dueAmount;
    await OwnersModule.saveOwnerPayment({ preventDefault: () => {} });

    const refreshed = await dbService.getById('truckOwners', ownerWithDue.id);
    if (refreshed.dueAmount !== prevDue - 5000) {
      throw new Error(`Owner payment mismatch! Expected ${prevDue - 5000}, got ${refreshed.dueAmount}`);
    }
    console.log(` Payment recorded: Due reduced from ${prevDue} to ${refreshed.dueAmount}!`);
  }

  console.log("\n=================================================");
  console.log("   ALL 586 TRUCK OWNERS & CHEQUES TESTS PASSED!  ");
  console.log("=================================================");
}

runEndToEndTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
