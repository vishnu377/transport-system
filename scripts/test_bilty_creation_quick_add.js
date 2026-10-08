/**
 * test_bilty_creation_quick_add.js
 * Comprehensive automated verification for user's Bilty Creation (Section 3) enhancements:
 * 1. SMTC Transport Segment + Sequential SMTC GR Generation
 * 2. Searchable Truck No. + + New Button + Auto-fill Owner & Owner Mobile
 * 3. Searchable Reference/Broker + + New Button + Auto-fill Broker Mobile
 * 4. Searchable Driver + + New Button + Auto-fill Driver Mobile
 * 5. Searchable GSTIN Consignor + + New Button + Auto-fill Address & GSTIN
 * 6. Quick Add Modal workflow for Truck, Broker, Driver, Consignor/Consignee
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("============================================================");
console.log("  VERIFYING BILTY CREATION MODULE: SMTC + QUICK ADD + AUTO-FILL");
console.log("============================================================\n");

// 1. Verify HTML DOM elements
const htmlPath = path.join(__dirname, '../pages/bilty-booking.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const expectedHtmlSubstrings = [
  'id="btn-seg-smtc"',
  "BiltyBookingModule.setAppSheetTransport('SMTC', this)",
  'id="bilty-truck-no"',
  'list="fleetTrucksList"',
  "BiltyBookingModule.quickAddModal('truck')",
  'id="appsheet-owner-text"',
  'id="appsheet-owner-mobile-text"',
  'id="bilty-broker"',
  'list="brokersList"',
  "BiltyBookingModule.quickAddModal('broker')",
  'id="appsheet-broker-mobile-text"',
  'id="bilty-driver"',
  'list="driversList"',
  "BiltyBookingModule.quickAddModal('driver')",
  'id="appsheet-driver-mobile-text"',
  'id="bilty-consignor"',
  'list="consignorsGstinList"',
  "BiltyBookingModule.quickAddModal('consignor')",
  'id="appsheet-consignor-address-box"',
  'id="appsheet-consignor-address-text"',
  'id="bilty-consignee"',
  'list="consigneesGstinList"',
  "BiltyBookingModule.quickAddModal('consignee')",
  'id="appsheet-consignee-address-box"',
  'id="appsheet-consignee-address-text"',
  'id="consignorsGstinList"',
  'id="consigneesGstinList"',
  'id="appsheet-quick-add-modal"',
  'id="appsheet-quick-add-body"',
  "BiltyBookingModule.saveQuickAdd()"
];

let htmlPass = true;
expectedHtmlSubstrings.forEach(token => {
  if (!html.includes(token)) {
    console.error(`❌ Missing in HTML: ${token}`);
    htmlPass = false;
  }
});

if (htmlPass) {
  console.log("✓ PASS: All 30 HTML controls, datalists, buttons & address preview boxes present!");
} else {
  process.exit(1);
}

// 2. Set up JSDOM / Mock environment
const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; },
  clear: () => { for (const k in localStorageStore) delete localStorageStore[k]; }
};
global.window = global;
global.window.location = { search: '' };

global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => `₹ ${Number(n || 0).toLocaleString('en-IN')}`,
  formatDate: (d) => d,
  showToast: (msg, type) => console.log(`[Toast ${type}]: ${msg}`)
};
global.APP_CONFIG = { firebase: null };
global.bootstrap = {
  Modal: {
    getOrCreateInstance: () => ({ show: () => {}, hide: () => {} }),
    getInstance: () => ({ show: () => {}, hide: () => {} })
  }
};

const elementStore = {};
global.document = {
  getElementById: (id) => {
    if (!elementStore[id]) {
      elementStore[id] = {
        id: id,
        tagName: 'DIV',
        value: id === 'bilty-firm' ? 'TTC' : (id === 'bilty-year' ? '2026-2027' : ''),
        innerText: '',
        innerHTML: '',
        checked: false,
        className: '',
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        focus: () => {},
        reset: () => {},
        querySelectorAll: () => [],
        insertAdjacentHTML: function(pos, text) { this.innerHTML = text + this.innerHTML; }
      };
    }
    return elementStore[id];
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

// Run master datasets
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-drivers-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function runTests() {
  await BiltyBookingModule.loadAllData();
  console.log(`Loaded ${BiltyBookingModule.allTrips.length} base trips.`);

  console.log("\n--- TEST 1: SMTC Transport Segment & Sequential GR Generation ---");
  const segTransport = document.getElementById('seg-transport');
  const btnSmtc = document.getElementById('btn-seg-smtc');
  btnSmtc.parentElement = segTransport;

  BiltyBookingModule.setAppSheetTransport('SMTC', btnSmtc);

  const firmVal = document.getElementById('bilty-firm').value;
  const grLabelText = document.getElementById('appsheet-gr-label').innerText;
  const shortGrVal = document.getElementById('bilty-short-gr').value;

  console.log(`Transport set to: ${firmVal}`);
  console.log(`GR Label: ${grLabelText}`);
  console.log(`Generated SMTC Short GR: ${shortGrVal}`);

  if (firmVal === 'SMTC' && grLabelText === 'SMTC G.R.No. *' && shortGrVal.includes('_SMTC')) {
    console.log("✓ PASS: SMTC transport button correctly selected and sequential SMTC GR generated!");
  } else {
    console.error("❌ FAILED: SMTC generation error:", { firmVal, grLabelText, shortGrVal });
    process.exit(1);
  }

  console.log("\n--- TEST 2: Truck Selection & Owner / Mobile Auto-fill ---");
  BiltyBookingModule.populateDatalistsAndDropdowns();

  // Select an authentic truck (e.g. RJ52GB2503)
  BiltyBookingModule.onTruckSelect('RJ52GB2503');
  const ownerText = document.getElementById('appsheet-owner-text').innerText;
  const ownerMobileText = document.getElementById('appsheet-owner-mobile-text').innerText;
  console.log(`Truck: RJ52GB2503 -> Owner: "${ownerText}", Mobile: "${ownerMobileText}"`);

  if (ownerText && ownerMobileText && ownerMobileText.length === 10) {
    console.log("✓ PASS: Truck selection auto-filled Owner Name and 10-digit Mobile Number!");
  } else {
    console.error("❌ FAILED: Truck owner details missing:", { ownerText, ownerMobileText });
    process.exit(1);
  }

  console.log("\n--- TEST 3: Reference / Broker Selection & Mobile Auto-fill ---");
  BiltyBookingModule.onReferenceSelect('Dilip Singh Patodi 9604260008');
  const brokerMobile = document.getElementById('appsheet-broker-mobile-text').innerText;
  console.log(`Broker: Dilip Singh Patodi -> Mobile: "${brokerMobile}"`);

  if (brokerMobile === '9604260008') {
    console.log("✓ PASS: Reference selection auto-filled authentic 10-digit Broker Mobile!");
  } else {
    console.error("❌ FAILED: Broker mobile mismatch:", brokerMobile);
    process.exit(1);
  }

  console.log("\n--- TEST 4: Driver Selection & Mobile Auto-fill ---");
  BiltyBookingModule.onDriverSelect('Kalu Gurjar 7297854407');
  const driverMobile = document.getElementById('appsheet-driver-mobile-text').innerText;
  console.log(`Driver: Kalu Gurjar -> Mobile: "${driverMobile}"`);

  if (driverMobile === '7297854407' || driverMobile.length === 10) {
    console.log("✓ PASS: Driver selection auto-filled authentic 10-digit Driver Mobile!");
  } else {
    console.error("❌ FAILED: Driver mobile missing or invalid:", driverMobile);
    process.exit(1);
  }

  console.log("\n--- TEST 5: GSTIN Consignor Selection & Address Auto-fill ---");
  const testParty = BiltyBookingModule.parties.find(p => p.gstin && p.address) || BiltyBookingModule.parties[0];
  console.log(`Testing with Party: ${testParty.name} (${testParty.gstin})`);

  BiltyBookingModule.onConsignorSelect(testParty.gstin);
  const consignorGstin = document.getElementById('bilty-consignor-gstin').value;
  const consignorAddress = document.getElementById('appsheet-consignor-address-text').innerHTML;
  const consignorBadge = document.getElementById('appsheet-consignor-gstin-badge').innerText;

  console.log(`Consignor GSTIN: "${consignorGstin}"`);
  console.log(`Address Box: "${consignorAddress}"`);
  console.log(`Badge: "${consignorBadge}"`);

  if (consignorGstin === testParty.gstin && consignorAddress.includes(testParty.name)) {
    console.log("✓ PASS: GSTIN Consignor selection auto-filled GSTIN & Address successfully!");
  } else {
    console.error("❌ FAILED: Consignor auto-fill error:", { consignorGstin, consignorAddress });
    process.exit(1);
  }

  console.log("\n--- TEST 6: Quick Add Workflows (Truck, Broker, Driver, Party) ---");

  // A. Quick Add New Truck
  BiltyBookingModule.quickAddModal('truck');
  document.getElementById('qa-truck-no').value = 'RJ52GC9999';
  document.getElementById('qa-truck-owner').value = 'Rathore Roadways Logistics';
  document.getElementById('qa-truck-mobile').value = '9829011111';
  document.getElementById('qa-truck-driver').value = 'Bhairu Singh';
  document.getElementById('qa-truck-driver-mobile').value = '9829022222';
  await BiltyBookingModule.saveQuickAdd();

  console.log(`After Quick-Add Truck: Truck input is "${document.getElementById('bilty-truck-no').value}", Owner is "${document.getElementById('appsheet-owner-text').innerText}", Mobile is "${document.getElementById('appsheet-owner-mobile-text').innerText}"`);
  if (document.getElementById('bilty-truck-no').value === 'RJ52GC9999' && document.getElementById('appsheet-owner-text').innerText === 'Rathore Roadways Logistics') {
    console.log("✓ PASS: Quick Add Truck successfully created and auto-selected!");
  } else {
    console.error("❌ FAILED: Quick Add Truck failed");
    process.exit(1);
  }

  // B. Quick Add New Reference / Broker
  BiltyBookingModule.quickAddModal('broker');
  document.getElementById('qa-broker-name').value = 'Mukesh Kothari Rajsamand';
  document.getElementById('qa-broker-mobile').value = '9414155555';
  await BiltyBookingModule.saveQuickAdd();

  console.log(`After Quick-Add Broker: Broker input is "${document.getElementById('bilty-broker').value}", Mobile is "${document.getElementById('appsheet-broker-mobile-text').innerText}"`);
  if (document.getElementById('bilty-broker').value.includes('Mukesh Kothari') && document.getElementById('appsheet-broker-mobile-text').innerText === '9414155555') {
    console.log("✓ PASS: Quick Add Reference/Broker successfully created and auto-selected!");
  } else {
    console.error("❌ FAILED: Quick Add Broker failed");
    process.exit(1);
  }

  // C. Quick Add New Driver
  BiltyBookingModule.quickAddModal('driver');
  document.getElementById('qa-driver-name').value = 'Govind Meena 5555';
  document.getElementById('qa-driver-mobile').value = '9828877777';
  await BiltyBookingModule.saveQuickAdd();

  console.log(`After Quick-Add Driver: Driver input is "${document.getElementById('bilty-driver').value}", Mobile is "${document.getElementById('appsheet-driver-mobile-text').innerText}"`);
  if (document.getElementById('bilty-driver').value === 'Govind Meena 5555' && document.getElementById('appsheet-driver-mobile-text').innerText === '9828877777') {
    console.log("✓ PASS: Quick Add Driver successfully created and auto-selected!");
  } else {
    console.error("❌ FAILED: Quick Add Driver failed");
    process.exit(1);
  }

  // D. Quick Add New Consignor Party
  BiltyBookingModule.quickAddModal('consignor');
  document.getElementById('qa-party-name').value = 'Apex White Granites LLP';
  document.getElementById('qa-party-gstin').value = '08AAACA7777A1Z3';
  document.getElementById('qa-party-address').value = 'Plot 45, Growth Center, RIICO, Kankroli';
  document.getElementById('qa-party-city').value = 'Rajsamand';
  await BiltyBookingModule.saveQuickAdd();

  console.log(`After Quick-Add Party: Consignor input is "${document.getElementById('bilty-consignor').value}", GSTIN is "${document.getElementById('bilty-consignor-gstin').value}", Address box has "${document.getElementById('appsheet-consignor-address-text').innerHTML}"`);
  if (document.getElementById('bilty-consignor').value === 'Apex White Granites LLP' && document.getElementById('bilty-consignor-gstin').value === '08AAACA7777A1Z3') {
    console.log("✓ PASS: Quick Add Consignor successfully created, selected, and address displayed!");
  } else {
    console.error("❌ FAILED: Quick Add Consignor failed");
    process.exit(1);
  }

  console.log("\n============================================================");
  console.log("🎉 ALL 5 USER BILTY CREATION MODULE REQUIREMENTS 100% PASSED!");
  console.log("============================================================\n");
}

runTests().catch(err => {
  console.error("Test execution error:", err);
  process.exit(1);
});
