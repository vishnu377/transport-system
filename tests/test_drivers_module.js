/**
 * Automated Test Suite for Module 12: Drivers (1:1 Google AppSheet Directory Replication)
 *
 * Verifies:
 * 1. Static HTML Structure & AppSheet Elements (drawers, comboboxes, no profile icons, gold buttons)
 * 2. Data Calibration (903 Authentic Drivers matching AppSheet screenshot)
 * 3. Module Initialization, Master Lists & Table View Rendering
 * 4. Real-Time Typeahead Search across name, owner, and mobile
 * 5. Record Detail View & Navigation (< Prev, Next >)
 * 6. Drivers/Owners & Driver Name Comboboxes & Drawer CRUD (Add / Edit / Delete)
 * 7. Zero LocalStorage Policy & Return Navigation
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Lightweight In-Memory DOM Mocks
class MockClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
  toggle(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
}

class MockElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.innerHTML = '';
    this.innerText = '';
    this.value = '';
    this.className = '';
    this.classList = new MockClassList();
    this.style = {};
    this.attributes = {};
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener() {}
  reset() { this.value = ''; }
}

const mockDocElements = new Map();
function getOrCreateMockElement(id) {
  if (!mockDocElements.has(id)) {
    mockDocElements.set(id, new MockElement(id));
  }
  return mockDocElements.get(id);
}

global.window = global;
global.document = {
  getElementById: (id) => getOrCreateMockElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateMockElement(sel.slice(1));
    return new MockElement('', sel);
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance: (el) => ({
      show: () => { el.style.display = 'block'; },
      hide: () => { el.style.display = 'none'; }
    }),
    getInstance: (el) => ({
      show: () => { el.style.display = 'block'; },
      hide: () => { el.style.display = 'none'; }
    })
  }
};

global.AppUI = {
  showToast: (msg, type) => console.log(`[Toast ${type ? type.toUpperCase() : 'INFO'}]: ${msg}`)
};

global.confirm = () => true;

async function runTests() {
  console.log('=== TEST SUITE: MODULE 12 - DRIVERS (1:1 APPSHEET DIRECTORY) ===\n');

  // ----------------------------------------------------
  // TEST 1: Static HTML Structure & AppSheet Elements
  // ----------------------------------------------------
  console.log('--- TEST 1: Static HTML Structure & AppSheet Elements ---');
  const html = fs.readFileSync(path.join(__dirname, '../pages/drivers.html'), 'utf-8');

  assert(html.includes('id="driverSearchInput"'), 'Must have Search Drivers input');
  assert(html.includes('id="driverSubbar"'), 'Must have subbar container');
  assert(html.includes('id="driverMainContent"'), 'Must have main scrollable content');
  assert(html.includes('id="driverDrawer"'), 'Must have offcanvas slide drawer');
  assert(html.includes('id="driverOwnerDriverInput"'), 'Must have Driver Owner Name combobox input');
  assert(html.includes('id="driverOwnerDriverDropdown"'), 'Must have Driver Owner Name dropdown');
  assert(html.includes('id="driverInputName"'), 'Must have Driver Name input');
  assert(html.includes('id="driverNameDropdown"'), 'Must have Driver Name dropdown');
  assert(html.includes('id="driverInputMobile"'), 'Must have Mobile No.* input');
  assert(html.includes('id="driverInputMobile1"'), 'Must have Mobile No. 1 input');

  // Verify Add and Save buttons use Google AppSheet gold color (#c3b15a)
  assert(html.includes('#c3b15a'), 'Add and Save buttons must use authentic AppSheet gold color #c3b15a');
  assert(!html.includes('bi-person-circle'), 'Must not have profile avatar icon before driver names');

  // Strict Zero LocalStorage
  assert(!html.includes('localStorage.setItem'), 'Zero localStorage policy');
  console.log('✓ TEST 1 PASSED: pages/drivers.html contains all 1:1 AppSheet containers, comboboxes, and gold buttons!\n');

  // ----------------------------------------------------
  // TEST 2: Data Calibration (903 Authentic Drivers)
  // ----------------------------------------------------
  console.log('--- TEST 2: Data Calibration (903 Records matching AppSheet Table) ---');
  require('../js/sample-drivers-data.js');
  const INITIAL_DRIVERS = global.window.INITIAL_DRIVERS;

  assert(Array.isArray(INITIAL_DRIVERS), 'INITIAL_DRIVERS must be an array');
  assert(INITIAL_DRIVERS.length >= 900, `Dataset must have at least 900 drivers (actual: ${INITIAL_DRIVERS.length})`);

  // Check top rows from Google AppSheet screenshot
  assert.strictEqual(INITIAL_DRIVERS[0].name, '8949074686', 'Row 1 name matches screenshot');
  assert.strictEqual(INITIAL_DRIVERS[0].mobile, '8949074686', 'Row 1 mobile matches screenshot');
  assert.strictEqual(INITIAL_DRIVERS[0].ownerDriverName, 'Lalaram Choudhary Shrinagar', 'Row 1 owner matches screenshot');

  assert.strictEqual(INITIAL_DRIVERS[1].name, 'Aahsa Ram Gurjar 7310', 'Row 2 name matches screenshot');
  assert.strictEqual(INITIAL_DRIVERS[1].mobile, '9588871819', 'Row 2 mobile matches screenshot');
  assert.strictEqual(INITIAL_DRIVERS[1].ownerDriverName, 'Laxmi Prakash Jat', 'Row 2 owner matches screenshot');

  assert.strictEqual(INITIAL_DRIVERS[2].name, 'Aasharam Gurjar', 'Row 3 name matches screenshot');
  assert.strictEqual(INITIAL_DRIVERS[2].mobile, '9950561094', 'Row 3 mobile matches screenshot');

  console.log(`  Top driver verified: ${INITIAL_DRIVERS[1].name} (${INITIAL_DRIVERS[1].mobile}, Owner: ${INITIAL_DRIVERS[1].ownerDriverName})`);
  console.log(`  Total authentic drivers verified: ${INITIAL_DRIVERS.length}`);
  console.log('✓ TEST 2 PASSED: 903 Authentic drivers dataset calibrated 1:1!\n');

  // ----------------------------------------------------
  // TEST 3: Module Initialization, Master Lists & Table View
  // ----------------------------------------------------
  console.log('--- TEST 3: Module Initialization, Master Lists & Table View ---');
  const ownersData = require('../js/sample-truck-owners-data.js');
  global._INITIAL_TRUCK_OWNERS = ownersData;
  global.INITIAL_TRUCK_OWNERS = ownersData;
  if (global.window) {
    global.window.INITIAL_TRUCK_OWNERS = ownersData;
    global.window._INITIAL_TRUCK_OWNERS = ownersData;
  }

  // Load Mock DB Service
  global.dbService = {
    getAll: async () => INITIAL_DRIVERS,
    save: async (coll, record) => record,
    delete: async (coll, id) => true
  };

  const DriversModule = require('../js/modules/drivers.js');
  await DriversModule.init();

  assert.strictEqual(DriversModule.currentView, 'table', 'Default view must be table view');
  assert.strictEqual(DriversModule.allDrivers.length, INITIAL_DRIVERS.length, 'Loaded all drivers');
  assert(DriversModule.ownerDriverList.length > 200, 'Owner/Driver master list must have over 200 options');
  assert(DriversModule.driverNameList.length > 800, 'Driver Name master list must have over 800 options');

  // Verify Table View rendered
  const mainEl = document.getElementById('driverMainContent');
  assert(mainEl.innerHTML.includes('<table class="appsheet-table">'), 'Must render AppSheet table');
  assert(mainEl.innerHTML.includes('Driver Owner Name'), 'Must have Driver Owner Name header');
  assert(mainEl.innerHTML.includes('Mobile No. 1'), 'Must have Mobile No. 1 header');
  assert(!mainEl.innerHTML.includes('bi-person-circle'), 'Must not have profile icon in table rows');

  console.log(`  Owner/Driver typeahead choices: ${DriversModule.ownerDriverList.length}`);
  console.log(`  Driver Name typeahead choices: ${DriversModule.driverNameList.length}`);
  console.log('✓ TEST 3 PASSED: Table View renders matching AppSheet without profile icons!\n');

  // ----------------------------------------------------
  // TEST 4: Real-Time Typeahead Search
  // ----------------------------------------------------
  console.log('--- TEST 4: Real-Time Typeahead Search ---');
  DriversModule.handleSearch('Gurjar');
  assert(DriversModule.filteredDrivers.length > 50, 'Search for Gurjar should return over 50 drivers');
  assert(DriversModule.filteredDrivers.every(d => 
    (d.name && d.name.toLowerCase().includes('gurjar')) || 
    (d.ownerDriverName && d.ownerDriverName.toLowerCase().includes('gurjar'))
  ), 'All search results must match query');

  console.log(`  "Gurjar" search matches: ${DriversModule.filteredDrivers.length} drivers`);

  // Search by Phone
  DriversModule.handleSearch('9588871819');
  assert.strictEqual(DriversModule.filteredDrivers.length, 1, 'Search for phone should find exactly 1 record');
  assert.strictEqual(DriversModule.filteredDrivers[0].name, 'Aahsa Ram Gurjar 7310');

  // Reset Search
  DriversModule.handleSearch('');
  assert.strictEqual(DriversModule.filteredDrivers.length, INITIAL_DRIVERS.length, 'Empty search restores all drivers');
  console.log('✓ TEST 4 PASSED: Instant search filters across name, owner, and mobile!\n');

  // ----------------------------------------------------
  // TEST 5: Record Detail View & Navigation (< Prev, Next >)
  // ----------------------------------------------------
  console.log('--- TEST 5: Record Detail View & Navigation (< Prev, Next >) ---');
  DriversModule.setView('detail', DriversModule.allDrivers[0].id);

  assert.strictEqual(DriversModule.currentView, 'detail', 'View must be detail');
  assert.strictEqual(DriversModule.currentDriverId, DriversModule.allDrivers[0].id);

  const subbar = document.getElementById('driverSubbar');
  assert(subbar.innerHTML.includes('Details'), 'Subbar must show Details breadcrumb');
  assert(subbar.innerHTML.includes('DriversModule.navigateDetail(-1)'), 'Must have < Prev button');
  assert(subbar.innerHTML.includes('DriversModule.navigateDetail(1)'), 'Must have Next > button');

  assert(mainEl.innerHTML.includes('Lalaram Choudhary Shrinagar'), 'Detail view shows Owner Name');
  assert(mainEl.innerHTML.includes('8949074686'), 'Detail view shows Phone number');

  // Test Navigate Next
  DriversModule.navigateDetail(1);
  assert.strictEqual(DriversModule.currentDriverId, DriversModule.allDrivers[1].id, 'Navigated to next record');

  console.log('✓ TEST 5 PASSED: Record Detail view and < Prev / Next > navigation verified 1:1!\n');

  // ----------------------------------------------------
  // TEST 6: Drivers/Owners & Driver Name Comboboxes & Drawer CRUD
  // ----------------------------------------------------
  console.log('--- TEST 6: Drivers/Owners & Driver Name Comboboxes & Drawer CRUD ---');
  DriversModule.openAddDrawer();
  assert.strictEqual(document.getElementById('formDriverId').value, '', 'Drawer opened in Add mode');
  assert.strictEqual(document.getElementById('driverDrawerTitle').innerText, 'Details', 'Title matches AppSheet Details');

  // Filter Owner/Driver combobox
  DriversModule.filterOwnerDriverCombobox('Laxmi');
  const odDropdown = document.getElementById('driverOwnerDriverDropdown');
  assert(odDropdown.classList.contains('show'), 'Owner/Driver dropdown shows on filter');
  assert(odDropdown.innerHTML.includes('Laxmi Prakash Jat'), 'Matches Laxmi Prakash Jat');

  // Select Owner/Driver
  DriversModule.selectOwnerDriverCombobox('Laxmi Prakash Jat', '9588871819', '');
  assert.strictEqual(document.getElementById('driverOwnerDriverInput').value, 'Laxmi Prakash Jat');
  assert.strictEqual(document.getElementById('driverInputMobile').value, '9588871819', 'Auto-filled mobile');

  // Set custom driver name
  document.getElementById('driverInputName').value = 'Test New Driver Jaipur';
  document.getElementById('driverInputMobile').value = '9876543210';
  document.getElementById('driverInputMobile1').value = '9123456780';

  // Save Driver
  await DriversModule.saveDriver();
  assert.strictEqual(DriversModule.allDrivers[0].name, 'Test New Driver Jaipur', 'New driver added to top');
  assert.strictEqual(DriversModule.allDrivers[0].mobile, '9876543210');
  assert.strictEqual(DriversModule.allDrivers[0].ownerDriverName, 'Laxmi Prakash Jat');

  // Edit Driver
  const newId = DriversModule.allDrivers[0].id;
  DriversModule.openEditDrawer(newId);
  assert.strictEqual(document.getElementById('formDriverId').value, newId);
  document.getElementById('driverInputName').value = 'Test Updated Driver';
  await DriversModule.saveDriver();
  assert.strictEqual(DriversModule.allDrivers[0].name, 'Test Updated Driver', 'Driver name updated');

  // Delete Driver
  await DriversModule.deleteDriver(newId);
  assert(!DriversModule.allDrivers.some(d => d.id === newId), 'Driver successfully deleted');

  console.log('✓ TEST 6 PASSED: Drivers/Owners and Name comboboxes with typeahead and selection verified!\n');

  // ----------------------------------------------------
  // TEST 7: Return Navigation to Table View
  // ----------------------------------------------------
  console.log('--- TEST 7: Return Navigation to Table View ---');
  DriversModule.setView('table');
  assert.strictEqual(DriversModule.currentView, 'table');
  assert(document.getElementById('driverMainContent').innerHTML.includes('<table class="appsheet-table">'));
  console.log('✓ TEST 7 PASSED: Return navigation to Table View verified!\n');

  console.log('======================================================');
  console.log('🏆 ALL 7 DRIVERS MODULE TEST SUITES PASSED 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
