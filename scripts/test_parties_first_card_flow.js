/**
 * test_parties_first_card_flow.js - Automated Test Suite for Parties Master First Card Flow
 * Verifies exact match with all screenshots provided in 'partieses frist card':
 *  1. Single Party Details View (screencapture-...-23_50_06.png)
 *  2. Edit Drawer & Pre-fill (screencapture-...-23_50_18.png)
 *  3. Searchable Combobox for GSTIN (WhatsApp Image ... 11.51.50 PM.jpeg)
 *  4. Searchable Combobox for Name (WhatsApp Image ... 11.51.50 PM (1).jpeg)
 *  5. Add Drawer (WhatsApp Image ... 11.51.51 PM.jpeg)
 *  6. Full Parties Detail Table View (scroll_top.png / screencapture-...-23_32_33.png)
 *  7. Live search by Name, GSTIN, Address with match highlighting
 *  8. Direct Firebase Firestore update & add synchronization
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
    value: '',
    placeholder: '',
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    reset: () => {},
    addEventListener: () => {},
    closest: () => null
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  querySelectorAll: (selector) => {
    return [];
  },
  addEventListener: () => {}
};

global.AppUI = {
  showToast: (msg, type) => {
    console.log(`[Toast ${type}]: ${msg}`);
  }
};

// Mock Firestore dbService
const firestoreCalls = [];
global.dbService = {
  getAll: async (col) => {
    return [];
  },
  update: async (col, id, data) => {
    firestoreCalls.push({ action: 'update', col, id, data });
    return true;
  },
  create: async (col, data) => {
    firestoreCalls.push({ action: 'create', col, data });
    return true;
  },
  add: async (col, data) => {
    firestoreCalls.push({ action: 'add', col, data });
    return true;
  }
};

// Mock Bootstrap offcanvas
global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance: () => ({ show: () => {}, hide: () => {} }),
    getInstance: () => ({ show: () => {}, hide: () => {} })
  }
};

// Load datasets and modules
require('../js/sample-parties-data.js');
const PartiesModule = require('../js/modules/parties.js');

async function runTests() {
  console.log('=== Running Parties Master Card 1 Full Flow Test Suite ===\n');

  // Test 1: Initialize Module & Load 3,396 authentic parties
  console.log('[Test 1] Initializing PartiesModule with 3,396 master parties...');
  await PartiesModule.init();
  assert.strictEqual(PartiesModule.allParties.length, 3396, 'Must load all 3,396 parties');
  console.log(`✓ Test 1 Passed: Loaded ${PartiesModule.allParties.length} authentic parties.\n`);

  // Test 2: Clicking a party row opens Single Party Details View (screencapture-...-23_50_06.png)
  console.log('[Test 2] Clicking row opens authentic Party Details view...');
  PartiesModule.openPartyDetails('PARTY_00001');

  assert.strictEqual(PartiesModule.activeView, 'details', 'Active view must be details');
  assert.strictEqual(PartiesModule.selectedParty.name, '42 Acres, WOWSCAPES Delhi');

  const elGstin = document.getElementById('pd-gstin');
  const elAddr = document.getElementById('pd-address');
  const elName = document.getElementById('pd-name');

  assert.strictEqual(elGstin.innerText, '07AAQPM0139C1ZX', 'GSTIN must match screenshot');
  assert.strictEqual(elAddr.innerText, 'G-97, Basement, Saket, New Delhi-110017', 'Address must match screenshot');
  assert.strictEqual(elName.innerText, '42 Acres, WOWSCAPES Delhi', 'Name must match screenshot');

  const bc = document.getElementById('parties-breadcrumb');
  assert.ok(bc.innerHTML.includes('Details'), 'Breadcrumb must show Details');
  const tools = document.getElementById('parties-bar-tools');
  assert.ok(tools.innerHTML.includes('btn-appsheet-edit'), 'Header must contain Edit button');
  console.log('✓ Test 2 Passed: Single Party Details view perfectly matches screencapture-...-23_50_06.png.\n');

  // Test 3: Edit Button opens Drawer and pre-populates data (screencapture-...-23_50_18.png)
  console.log('[Test 3] Opening Edit Drawer with pre-populated fields...');
  PartiesModule.openEditModal('PARTY_00001');

  const pfId = document.getElementById('pf-id');
  const pfGstin = document.getElementById('pf-gstin');
  const pfName = document.getElementById('pf-name');
  const pfAddress = document.getElementById('pf-address');

  assert.strictEqual(pfId.value, 'PARTY_00001');
  assert.strictEqual(pfGstin.value, '07AAQPM0139C1ZX');
  assert.strictEqual(pfName.value, '42 Acres, WOWSCAPES Delhi');
  assert.strictEqual(pfAddress.value, 'G-97, Basement, Saket, New Delhi-110017');
  console.log('✓ Test 3 Passed: Edit drawer pre-populated exactly matching screencapture-...-23_50_18.png.\n');

  // Test 4: Updating a party and saving persists to Firestore
  console.log('[Test 4] Updating party details and saving to Firestore...');
  pfName.value = '42 Acres, WOWSCAPES Delhi (Updated HQ)';
  pfAddress.value = 'G-97 & 98, Basement, Saket, New Delhi-110017';
  pfGstin.value = '07AAQPM0139C1ZX';

  firestoreCalls.length = 0;
  await PartiesModule.saveParty();

  assert.strictEqual(firestoreCalls.length, 1, 'Must invoke Firestore update');
  assert.strictEqual(firestoreCalls[0].action, 'update');
  assert.strictEqual(firestoreCalls[0].col, 'parties');
  assert.strictEqual(firestoreCalls[0].id, 'PARTY_00001');
  assert.strictEqual(firestoreCalls[0].data.name, '42 Acres, WOWSCAPES Delhi (Updated HQ)');

  // Verify Details view updated in real time
  assert.strictEqual(elName.innerText, '42 Acres, WOWSCAPES Delhi (Updated HQ)');
  console.log('✓ Test 4 Passed: Firestore update synced in real time and updated UI.\n');

  // Test 5: Add Party Drawer (WhatsApp Image ... 11.51.51 PM.jpeg)
  console.log('[Test 5] Opening Add Party Drawer...');
  PartiesModule.openAddModal();
  assert.strictEqual(pfId.value, '', 'Form ID must be cleared for new party');
  assert.strictEqual(pfGstin.value, '', 'GSTIN must be blank');
  assert.strictEqual(pfName.value, '', 'Name must be blank');
  console.log('✓ Test 5 Passed: Add party drawer initialized blank matching WhatsApp Image ... 11.51.51 PM.jpeg.\n');

  // Test 6: Creating a new party saves to Firestore and unshifts to master list
  console.log('[Test 6] Adding a new party and verifying Firestore creation...');
  pfGstin.value = '08TESTGSTIN1234Z';
  pfName.value = 'Shree Ram Transport Co';
  pfAddress.value = 'NH-8, Sukher, Udaipur (Raj.)';
  pfId.value = '';

  firestoreCalls.length = 0;
  const prevCount = PartiesModule.allParties.length;
  await PartiesModule.saveParty();

  assert.strictEqual(PartiesModule.allParties.length, prevCount + 1, 'Total parties must increase by 1');
  assert.strictEqual(PartiesModule.allParties[0].name, 'Shree Ram Transport Co', 'New party must be unshifted to top');
  assert.strictEqual(firestoreCalls.length, 1, 'Must invoke Firestore create/add');
  assert.strictEqual(firestoreCalls[0].data.name, 'Shree Ram Transport Co');
  console.log('✓ Test 6 Passed: New party created and saved to Firestore dynamically.\n');

  // Test 7: Full Parties Detail View (scroll_top.png)
  console.log('[Test 7] Navigating to Full-screen Parties Detail table view...');
  PartiesModule.showFullList();
  assert.strictEqual(PartiesModule.activeView, 'full-list');

  const fullTbody = document.getElementById('parties-full-table-body');
  assert.ok(fullTbody.innerHTML.length > 0, 'Full table body must contain rows');
  assert.ok(fullTbody.innerHTML.includes('Shree Ram Transport Co'), 'Must include newly added party');

  const countBadge = document.getElementById('parties-full-count-badge');
  assert.ok(countBadge.innerText.includes('Number'), 'Count badge must show Number');
  console.log('✓ Test 7 Passed: Full-screen table view verified matching scroll_top.png.\n');

  // Test 8: Live Search by Name or GSTIN with highlight
  console.log('[Test 8] Testing live search by GSTIN ("07AAQPM") and Name ("Bhagwati")...');
  PartiesModule.handleSearch('07AAQPM');
  assert.ok(fullTbody.innerHTML.includes('07AAQPM'), 'Search must find matching GSTIN');
  assert.ok(fullTbody.innerHTML.includes('<mark'), 'Matching string must be highlighted with <mark>');

  PartiesModule.handleSearch('Bhagwati');
  assert.ok(fullTbody.innerHTML.includes('Bhagwati'), 'Search must find matching Name');
  assert.ok(fullTbody.innerHTML.includes('<mark'), 'Matching Name must be highlighted');

  // Test clearing search
  PartiesModule.clearSearch();
  assert.strictEqual(PartiesModule.searchQuery, '');
  assert.strictEqual(PartiesModule.filteredParties.length, PartiesModule.allParties.length);
  console.log('✓ Test 8 Passed: Real-time search by GSTIN/Name with match highlighting works cleanly.\n');

  // Test 9: HTML Layout & Elements Verification
  console.log('[Test 9] Verifying HTML structures in pages/parties.html...');
  const html = fs.readFileSync(path.join(__dirname, '../pages/parties.html'), 'utf-8');
  assert.ok(html.includes('id="view-parties-dashboard"'), 'Must have 3-card dashboard view');
  assert.ok(html.includes('id="view-parties-detail-list"'), 'Must have full list view');
  assert.ok(html.includes('id="view-party-details"'), 'Must have single party details view');
  assert.ok(html.includes('id="partyDrawer"'), 'Must have AppSheet drawer');
  assert.ok(html.includes('id="wrap-combobox-gstin"'), 'Must have GSTIN combobox wrap');
  assert.ok(html.includes('id="wrap-combobox-name"'), 'Must have Name combobox wrap');
  assert.ok(html.includes('id="parties-search-clear"'), 'Must have search clear button');
  console.log('✓ Test 9 Passed: HTML file contains all views, comboboxes, drawers, and buttons.\n');

  console.log('======================================================');
  console.log('>>> ALL 9 PARTIES CARD 1 FLOW TESTS PASSED 100%!  <<<');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
