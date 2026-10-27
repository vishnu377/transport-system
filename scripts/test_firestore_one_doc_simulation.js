/**
 * test_firestore_one_doc_simulation.js
 * Verifies that when Firestore contains only 1 doc (the exact condition the user hit),
 * all 386 master trips are merged and reliably displayed in Party Due!
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM
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
      toggle(c) { this.classes.has(c) ? this.classes.delete(c) : this.classes.add(c); }
    },
    innerText: '',
    innerHTML: '',
    textContent: '',
    value: '',
    placeholder: '',
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    addEventListener: () => {},
    closest: () => null,
    reset: () => {}
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  querySelector(selector) {
    if (!mockElements[selector]) mockElements[selector] = createMockEl(selector);
    return mockElements[selector];
  },
  getElementsByName(name) {
    return [
      { name, value: 'Party', checked: true },
      { name, value: 'Branch', checked: false }
    ];
  },
  querySelectorAll: (selector) => [],
  addEventListener: () => {}
};

global.AppUI = {
  showToast: (msg, type) => {
    console.log(`[Toast ${type}]: ${msg}`);
  }
};

// Mock Firebase with 1 document in party_due (the exact Firestore doc that caused the bug)
const dummySingleDoc = {
  id: "DUE_20250812_654",
  owner: "Shree Mahaveer Transport Company",
  tripEndDate: "21/08/2025",
  weight: 127,
  grNo: "2025-2026-654_TTC",
  tripStartDate: "12/08/2025",
  truckNo: "RJ52GB5966",
  material: "Marble Powder",
  destination: "Rewari (Haryana)",
  financialYear: "2025-2026",
  dueAmount: 234950,
  transport: "TTC",
  consignee: "AGGARWAL TRADING CO",
  status: "Transit",
  colorScheme: "golden"
};

global.firebase = {
  apps: [{}],
  firestore: () => ({
    collection: (name) => ({
      get: async () => {
        if (name === 'party_due') {
          return {
            empty: false,
            docs: [{ id: dummySingleDoc.id, data: () => dummySingleDoc }]
          };
        }
        return { empty: true, docs: [] };
      },
      limit: () => ({
        get: async () => ({ empty: true, docs: [] })
      }),
      doc: () => ({
        set: async () => {},
        update: async () => {}
      })
    })
  })
};

// Load data files onto window
const sampleParties = require('../js/sample-parties-data.js');
const partyDueData = require('../js/party-due-data.js');
global.window.INITIAL_EXCEL_PARTIES = sampleParties;
global.window.PARTY_DUE_DATA = partyDueData;

// Load PartiesModule
delete require.cache[require.resolve('../js/modules/parties.js')];
const PartiesModule = require('../js/modules/parties.js');
global.window.PartiesModule = PartiesModule;

async function runTest() {
  console.log('=== Running Firestore 1-Doc Simulation Test ===\n');

  console.log('[Test 1] Initializing module with 1 doc in Firestore party_due...');
  await PartiesModule.init();

  console.log(`Loaded trips count: ${PartiesModule.allPartyDueTrips.length}`);
  assert.strictEqual(PartiesModule.allPartyDueTrips.length, 386, 'Must merge Firestore with all 386 master trips!');
  console.log('✓ Test 1 Passed: allPartyDueTrips has all 386 trips despite Firestore having only 1 doc.\n');

  console.log('[Test 2] Opening Party Due for FY 2026-2027 (User flow)...');
  PartiesModule.showPartyDueList('2026-2027');

  const countText = document.getElementById('due-record-count-text');
  console.log(`Record count displayed: "${countText.textContent}"`);
  assert.ok(countText.textContent.includes('136 records'), 'Must show 136 records for FY 2026-2027');

  const tbody = document.getElementById('party-due-table-body');
  assert.ok(!tbody.innerHTML.includes('No Party Due records found'), 'Table must NOT show empty records message!');
  assert.ok(tbody.innerHTML.includes('CHEM TECH INDIA'), 'Table must show actual party consignee name!');
  assert.ok(tbody.innerHTML.includes('176,860.00'), 'Table must show party due amount!');
  console.log('✓ Test 2 Passed: FY 2026-2027 loads 136 parties and displays them with amounts & date groups.\n');

  console.log('[Test 3] Switching to FY 2025-2026...');
  PartiesModule.setPartyDueFY('2025-2026');
  console.log(`Record count for 2025-2026: "${countText.textContent}"`);
  assert.ok(countText.textContent.includes('248 records'), 'Must show 248 records for FY 2025-2026');
  console.log('✓ Test 3 Passed: FY 2025-2026 displays 180 records.\n');

  console.log('[Test 4] Switching to ALL Financial Years...');
  PartiesModule.setPartyDueFY('ALL');
  console.log(`Record count for ALL: "${countText.textContent}"`);
  assert.ok(countText.textContent.includes('386 records'), 'Must show 386 records for ALL');
  console.log('✓ Test 4 Passed: ALL FY displays all 386 records.\n');

  console.log('[Test 5] Checking Card 2 title on dashboard...');
  PartiesModule.renderPartyDueBadges();
  const cardTitle = document.getElementById('card-party-due-title');
  console.log(`Card 2 Title: "${cardTitle.textContent}"`);
  assert.ok(cardTitle.textContent.includes('Party Due [386]'), 'Card 2 title must show total count 386');
  console.log('✓ Test 5 Passed: Card 2 displays Party Due [386].\n');

  console.log('======================================================');
  console.log('>>> ALL 5 FIRESTORE 1-DOC SIMULATION TESTS PASSED! <<<');
  console.log('======================================================\n');
}

runTest().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
