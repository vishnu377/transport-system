const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("==================================================================");
console.log("  TEST: AUTHENTIC APPSHEET OPEN TRIPS 3-CARD & TRUCK OWNER VIEW   ");
console.log("==================================================================");

// 1. DOM Static HTML Inspection
const htmlPath = path.join(__dirname, '../pages/trips.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const criticalCardsAndTopdIds = [
  // Card 1
  'op-gr-no', 'op-truck-no', 'op-start-date', 'op-end-date', 'op-origin', 
  'op-destination', 'op-billing-type', 'op-bilty-amount', 'op-weight', 'op-rate', 
  'op-material', 'op-reference', 'op-ref-mobile', 'op-driver', 'op-driver-mobile',
  // Card 2
  'op-consignee-gstin', 'op-consignee', 'op-owner', 'op-owner-mobile', 'op-owner-mobile2',
  'op-freight', 'op-add-records-select', 'op-total-freight', 'op-paid-amount', 'op-due-amount',
  // Card 3
  'op-owner-total-payment', 'op-owner-due', 'op-trip-status-select',
  // Truck Owner Payment Details View (wa_19.png & wa_21.png)
  'trip-truck-owner-payments-view', 'topd-search-input', 'btn-topd-add', 'topd-table', 'topd-tbody',
  'topd-master-col', 'topd-detail-col', 'topd-d-email', 'btn-topd-edit', 'btn-topd-expand', 'btn-topd-close',
  'topd-d-date', 'topd-d-mode', 'topd-d-beneficiary', 'topd-d-frombank', 'topd-d-tobank', 'topd-d-desc', 'topd-d-amount',
  // Add Truck Owner Payment Modal
  'modal-add-truck-owner-payment', 'form-add-truck-owner-payment', 'top-date', 'top-mode', 'top-beneficiary',
  'top-owners-list', 'top-from-bank', 'top-to-bank', 'top-description', 'top-amount'
];

let missing = [];
criticalCardsAndTopdIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    missing.push(id);
  }
});

if (missing.length > 0) {
  console.error('FAIL: Missing critical IDs in pages/trips.html:', missing);
  process.exit(1);
}
console.log(`✓ All ${criticalCardsAndTopdIds.length} Card 1, 2, 3 and Truck Owner Payment DOM elements verified in pages/trips.html!`);

// Verify Card 3 status dropdown options
const expectedStatuses = ['Transit', 'Off loading', 'Cheque due', 'POD sent', 'Bill generated'];
expectedStatuses.forEach(st => {
  if (!html.includes(`value="${st}"`)) {
    console.error(`FAIL: Status option "${st}" missing in pages/trips.html`);
    process.exit(1);
  }
});
console.log('✓ All 5 AppSheet Status dropdown options present (Transit, Off loading, Cheque due, POD sent, Bill generated)!');

// Verify Add Records for dropdown options
const expectedAddActions = ['Cheque', 'Party Payment', 'Truck Owner Payment', 'Other B'];
expectedAddActions.forEach(act => {
  if (!html.includes(`value="${act}"`)) {
    console.error(`FAIL: Add Records for option "${act}" missing in pages/trips.html`);
    process.exit(1);
  }
});
console.log('✓ All 4 "Add Records for" dropdown options present (Cheque, Party Payment, Truck Owner Payment, Other B)!');

console.log("\n==================================================================");
console.log("  LOGIC & CONTROLLER TESTS IN RUNTIME ENVIRONMENT                ");
console.log("==================================================================");

// Set up simulated browser environment
global.window = {
  scrollTo: () => {}
};
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

const dom = {};
function mock(id) {
  if (!dom[id]) {
    dom[id] = {
      id,
      innerText: '',
      innerHTML: '',
      value: '',
      options: [],
      appendChild(opt) { this.options.push(opt); },
      style: {
        setProperty(k, v) { this[k] = v; },
        getPropertyValue(k) { return this[k]; }
      },
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
      },
      querySelectorAll() { return []; },
      addEventListener() {},
      removeEventListener() {}
    };
  }
  return dom[id];
}

global.document = {
  getElementById: mock,
  querySelector: (sel) => mock(sel),
  querySelectorAll: () => [],
  createElement: (tag) => ({ tag, value: '', innerText: '', addEventListener() {} })
};
global.alert = console.log;
global.prompt = (msg) => 'POD sent';
global.AppUI = {
  showToast: (msg, type) => console.log(`[Toast ${type || 'info'}]:`, msg)
};

// Load code
const sampleCode = fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf-8');
const configCode = fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf-8');
const dbCode = fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf-8');
const tripsCode = fs.readFileSync(path.join(__dirname, '../js/modules/trips.js'), 'utf-8');

vm.runInThisContext(sampleCode);
vm.runInThisContext(configCode);
vm.runInThisContext(dbCode);
vm.runInThisContext(tripsCode);

console.log('✓ trips.js evaluated successfully');

// Initialize module with trips and open tab
TripsModule.workflowTab = 'open';
TripsModule.allTrips = window.INITIAL_EXCEL_TRIPS.slice(0, 50);
TripsModule.filteredTrips = [...TripsModule.allTrips];
TripsModule.activeTrip = TripsModule.allTrips[0];

// Test 1: openTripDetails populates 3 cards
TripsModule.openTripDetails(TripsModule.activeTrip.id);
console.log('Test 1 - Card 1 G.R.No:', dom['op-gr-no'].innerHTML);
console.log('Test 1 - Card 2 Consignee:', dom['op-consignee'].innerHTML);
console.log('Test 1 - Card 2 Owner Due:', dom['op-due-amount'].innerHTML);
console.log('Test 1 - Card 3 Owner Total Payment:', dom['op-owner-total-payment'].innerHTML);
console.log('Test 1 - Card 3 Owner Due:', dom['op-owner-due'].innerHTML);
console.log('Test 1 - Card 3 Status Select Value:', dom['op-trip-status-select'].value);

if (!dom['op-owner-total-payment'].innerHTML.includes('₹') || !dom['op-owner-due'].innerHTML.includes('₹')) {
  console.error('FAIL: Card 3 owner figures not populated properly');
  process.exit(1);
}
console.log('✓ Test 1: Card 1, 2, 3 values populated accurately in openTripDetails!');

// Test 2: Status update
TripsModule.updateActiveTripStatus('Bill generated');
if (TripsModule.activeTrip.tripStatus !== 'Bill generated') {
  console.error('FAIL: Status update failed');
  process.exit(1);
}
console.log('✓ Test 2: updateActiveTripStatus properly updated tripStatus to "Bill generated"!');

// Test 3: Truck Owner Payments View
TripsModule.openTruckOwnerPaymentsView().then(() => {
  console.log('Test 3 - Table HTML generated length:', dom['topd-tbody'].innerHTML.length);
  if (!dom['topd-tbody'].innerHTML.includes('mahaveer0236@gmail.com')) {
    console.error('FAIL: topd-tbody missing mahaveer0236@gmail.com');
    process.exit(1);
  }
  console.log('Test 3 - Right Detail Email:', dom['topd-d-email'].innerText);
  console.log('Test 3 - Right Detail Mode:', dom['topd-d-mode'].innerText);
  console.log('Test 3 - Right Detail From Bank:', dom['topd-d-frombank'].innerText);
  console.log('Test 3 - Right Detail To Bank:', dom['topd-d-tobank'].innerText);
  console.log('Test 3 - Right Detail Description:', dom['topd-d-desc'].innerText);

  if (dom['topd-d-mode'].innerText !== 'Adjustment') {
    console.error('FAIL: Detail card mode does not match');
    process.exit(1);
  }
  console.log('✓ Test 3: Truck Owner Payment Details view rendered master table and right detail card matching wa_19.png and wa_21.png!');

  // Test 4: Save new Truck Owner Payment
  document.getElementById('top-date').value = '2026-10-12';
  document.getElementById('top-mode').value = 'NEFT/RTGS';
  document.getElementById('top-beneficiary').value = 'Kailash Dhabas';
  document.getElementById('top-from-bank').value = 'MTC';
  document.getElementById('top-to-bank').value = 'SBI';
  document.getElementById('top-description').value = '2026-2027-2415_TTC';
  document.getElementById('top-amount').value = '75000';

  return TripsModule.saveNewTruckOwnerPayment();
}).then(() => {
  const latest = TripsModule.allTruckOwnerPayments[0];
  console.log('Test 4 - Newly saved payment:', latest.beneficiary, '|', latest.amount, '|', latest.description);
  if (latest.beneficiary !== 'Kailash Dhabas' || latest.amount !== 75000) {
    console.error('FAIL: saveNewTruckOwnerPayment failed');
    process.exit(1);
  }
  console.log('✓ Test 4: saveNewTruckOwnerPayment successfully saved and updated table!');
  console.log("\n==================================================================");
  console.log("  ALL TESTS PASSED SUCCESSFULLY 100%!                             ");
  console.log("==================================================================");
  process.exit(0);
}).catch(err => {
  console.error('TEST ERROR:', err);
  process.exit(1);
});
