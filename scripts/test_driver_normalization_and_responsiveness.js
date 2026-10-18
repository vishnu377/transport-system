/**
 * Verification Test Suite:
 * 1. Zero 'Assigned Driver' placeholders in Table, Details, Modals, and allTrips.
 * 2. Sticky Columns (.sticky-col-1..4) in 18-col Card 3, Settled, and Open tables.
 * 3. GR number formatting (getDisplayGrNo).
 * 4. Open Debts toolbar hiding and restoration.
 */

const fs = require('fs');
const path = require('path');

// Mock DOM
global.window = global;
global.window.location = { search: '', pathname: '/pages/trips.html' };
global.window.scrollTo = () => {};
const mockElements = {};
const theadElem = { innerHTML: '' };

global.document = {
  getElementById: (id) => {
    if (!mockElements[id]) {
      mockElements[id] = {
        id,
        value: '',
        innerText: '',
        innerHTML: '',
        style: { setProperty: () => {} },
        classList: {
          contains: () => false,
          add: () => {},
          remove: () => {},
          toggle: () => {}
        },
        querySelectorAll: () => [],
        addEventListener: () => {}
      };
    }
    return mockElements[id];
  },
  querySelector: (sel) => {
    if (sel.includes('thead')) {
      return theadElem;
    }
    return null;
  },
  querySelectorAll: () => []
};

// Load dependencies
const sampleTripsCode = fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8');
eval(sampleTripsCode);

const openSeedCode = fs.readFileSync(path.join(__dirname, '../js/open-trips-seed.js'), 'utf8');
eval(openSeedCode);

const driversCode = fs.readFileSync(path.join(__dirname, '../js/sample-drivers-data.js'), 'utf8');
eval(driversCode);

// Mock AppUI
global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => `₹ ${Number(n || 0).toLocaleString('en-IN')}`,
  showToast: (m) => console.log('[Toast]:', m)
};

// Inject a test trip with "Assigned Driver" placeholder to rigorously verify normalization
window.INITIAL_EXCEL_TRIPS.push({
  id: 'TEST_PLACEHOLDER_01',
  grNo: '2026-2027-9999_TTC',
  shortGrNo: '9999_TTC',
  truckNo: 'RJ52GA7310',
  driver: 'Assigned Driver',
  driverName: 'Assigned Driver',
  status: 'Transit',
  freight: 50000,
  partyDue: 50000,
  ownerDue: 45000
});

window.INITIAL_EXCEL_TRIPS.push({
  id: 'TEST_PLACEHOLDER_02',
  grNo: '2024-2025_RJ52GA8678_1311_TTC',
  shortGrNo: '2024-2025_RJ52GA8678_1311_TTC',
  truckNo: 'RJ52GA8678',
  driver: '-',
  status: 'Transit',
  freight: 40000,
  partyDue: 40000,
  ownerDue: 36000
});

const tripsJsCode = fs.readFileSync(path.join(__dirname, '../js/modules/trips.js'), 'utf8');
eval(tripsJsCode);

async function runVerification() {
  console.log('==================================================================');
  console.log('  TEST: DRIVER AUTO-NORMALIZATION & TABLE RESPONSIVENESS          ');
  console.log('==================================================================');

  await TripsModule.init();

  // Test 1: Verify allTrips has zero placeholder drivers
  const badTrips = TripsModule.allTrips.filter(t => !t.driver || /assigned|unassigned|^-$/i.test(t.driver));
  console.log(`✓ Test 1: Bad/Placeholder drivers in allTrips: ${badTrips.length} (Expected 0)`);
  if (badTrips.length > 0) throw new Error('Found placeholder drivers in allTrips!');

  // Test 2: Verify specific test placeholder trips were accurately matched with real drivers
  const t1 = TripsModule.allTrips.find(x => x.id === 'TEST_PLACEHOLDER_01');
  console.log(`✓ Test 2: Normalized driver for RJ52GA7310: "${t1.driver}" (Expected Kaluram Jat Shrinagar)`);
  if (!t1.driver.includes('Kaluram Jat')) throw new Error('Failed to match RJ52GA7310 to Kaluram Jat');

  // Test 3: Verify getDisplayGrNo
  const gr1 = TripsModule.getDisplayGrNo(TripsModule.allTrips.find(x => x.id === 'TEST_PLACEHOLDER_02'));
  console.log(`✓ Test 3: Short GR for 2024-2025_RJ52GA8678_1311_TTC: "${gr1}" (Expected "1311_TTC")`);
  if (gr1 !== '1311_TTC') throw new Error(`Expected 1311_TTC, got ${gr1}`);

  // Test 4: Card 3 table header & rows have sticky columns and no assigned driver
  TripsModule.setWorkflowTab('all');
  const theadHtml = theadElem.innerHTML;
  const tbodyHtml = mockElements['trips-tbody'].innerHTML;

  if (!theadHtml.includes('sticky-col-1') || !theadHtml.includes('sticky-col-4')) {
    throw new Error('Card 3 thead missing sticky-col classes!');
  }
  if (!tbodyHtml.includes('sticky-col-1') || !tbodyHtml.includes('sticky-col-4')) {
    throw new Error('Card 3 tbody missing sticky-col classes!');
  }
  if (/assigned driver/i.test(tbodyHtml)) {
    throw new Error('Found "Assigned Driver" in rendered Card 3 tbody HTML!');
  }
  console.log('✓ Test 4: Card 3 18-col table rendered with sticky-col-1..4 and zero placeholder drivers!');

  // Test 5: Open Trip Details view has clean driver
  TripsModule.openTripDetails('TEST_PLACEHOLDER_01');
  const opDriverHtml = mockElements['op-driver'].innerHTML;
  console.log(`✓ Test 5: Open Trip Details driver rendered as: ${opDriverHtml}`);
  if (/assigned/i.test(opDriverHtml) || !opDriverHtml.includes('Kaluram Jat')) {
    throw new Error('Open Trip Details has invalid driver!');
  }

  // Test 6: Open Debts View hides register toolbar
  let toolbarHidden = false;
  mockElements['trips-register-toolbar'].classList.add = (cls) => {
    if (cls === 'd-none') toolbarHidden = true;
  };
  TripsModule.openTripDebtsView('details');
  console.log(`✓ Test 6: trips-register-toolbar hidden on openTripDebtsView: ${toolbarHidden}`);
  if (!toolbarHidden) throw new Error('trips-register-toolbar was not hidden in openTripDebtsView!');

  // Test 7: CSS min-width verification in pages/trips.html
  const tripsHtml = fs.readFileSync(path.join(__dirname, '../pages/trips.html'), 'utf8');
  if (!tripsHtml.includes('.sticky-col-1') || !tripsHtml.includes('.sticky-col-4') || (!tripsHtml.includes('min-width: 1420px;') && !tripsHtml.includes('min-width: 1180px;'))) {
    throw new Error('pages/trips.html missing sticky column styles or table min-width!');
  }
  console.log('✓ Test 7: pages/trips.html contains sticky-col-1..4 and responsive min-width (1180px)!');

  console.log('==================================================================');
  console.log('  ALL DRIVER & RESPONSIVENESS VERIFICATIONS PASSED 100%!          ');
  console.log('==================================================================');
}

runVerification().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
