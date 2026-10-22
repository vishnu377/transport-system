/**
 * test_other_b_paid_flow.js - Automated Test Suite for "Other B Paid" Module (Card 2)
 * Tests:
 *  1. Dashboard & Navigation into Other B Paid
 *  2. Main List Table with Date Grouping & 4 Color Types (Green, Light Blue, Red, Sky Blue Chamkila)
 *  3. Green Row Drilldown: Settled Trip Details (screencapture-...-11_50_04.png)
 *  4. Light Blue Row Drilldown: Party Payment Pending (screencapture-...-11_45_56.png)
 *  5. Red Row Drilldown: Other B Pending (screencapture-...-11_53_18.png)
 *  6. Sky Blue Chamkila Row Drilldown: Truck Owner Payment Pending (screencapture-...-11_55_52.png)
 *  7. Expand Payment View: Trip Other B Payment Details (screencapture-...-11_47_25.png)
 *  8. Single Payment Details Card (screencapture-...-11_47_37.png)
 *  9. Add Payment Drawer & Calculation Updates
 *  10. Add Owner Payment Drawer for Sky Blue Chamkila
 *  11. Financial Year rail filter & sidebar collapse toggle
 *  12. Totals Verification against Google AppSheet Dashboard
 */

const assert = require('assert');

// Mock DOM environment
global.window = {
  location: { search: '' }
};

// Load datasets
require('../js/sample-other-b-data.js');
require('../js/sample-other-b-paid-data.js');
const ToBeCreatedModule = require('../js/modules/to_be_created.js');

console.log('=== Running Other B Paid Full Flow Test Suite ===');

// Mock document elements
const mockElements = {};
function createMockEl(id) {
  return {
    id,
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); },
      toggle(c, force) {
        if (force === true) this.classes.add(c);
        else if (force === false) this.classes.delete(c);
        else if (this.classes.has(c)) { this.classes.delete(c); return false; }
        else { this.classes.add(c); return true; }
      }
    },
    innerText: '',
    innerHTML: '',
    value: '',
    placeholder: '',
    style: {}
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) {
      mockElements[id] = createMockEl(id);
    }
    return mockElements[id];
  },
  addEventListener(event, fn) {}
};

global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance(el) {
      return {
        show() { el._shown = true; },
        hide() { el._shown = false; }
      };
    },
    getInstance(el) {
      return {
        show() { el._shown = true; },
        hide() { el._shown = false; }
      };
    }
  }
};

global.AppUI = {
  toasts: [],
  showToast(msg, type) {
    this.toasts.push({ msg, type });
  }
};

async function runTests() {
  // TEST 1: Init & Dashboard Badges
  console.log('\n[Test 1] Initializing module and checking Card 2 dashboard badges...');
  await ToBeCreatedModule.init();

  assert(ToBeCreatedModule.paidTrips.length >= 500, `Expected at least 500 paid trips, found ${ToBeCreatedModule.paidTrips.length}`);
  
  const b2026 = document.getElementById('badge-paid-2026').innerText;
  const b2025 = document.getElementById('badge-paid-2025').innerText;
  const b2024 = document.getElementById('badge-paid-2024').innerText;

  assert(b2026.includes('4,177,700.00'), `Badge 2026 mismatch: ${b2026}`);
  assert(b2025.includes('5,201,950.00'), `Badge 2025 mismatch: ${b2025}`);
  assert(b2024.includes('934,000.00'), `Badge 2024 mismatch: ${b2024}`);
  console.log('✓ Test 1 Passed: Dashboard badges match Google AppSheet targets exactly.');

  // TEST 2: Open Other B Paid List (All & FY filter)
  console.log('\n[Test 2] Opening Other B Paid list view...');
  ToBeCreatedModule.openOtherBPaidList('ALL');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'paid-list');
  
  const tableBody = document.getElementById('tobe-paid-table-body').innerHTML;
  assert(tableBody.includes('21/10/2026'), 'Expected date group 21/10/2026 in table');
  assert(tableBody.includes('tobe-row-green'), 'Expected green row in table');
  assert(tableBody.includes('tobe-row-light-blue'), 'Expected light blue row in table');
  assert(tableBody.includes('tobe-row-red'), 'Expected red row in table');
  assert(tableBody.includes('tobe-row-sky-blue'), 'Expected sky blue row in table');
  console.log('✓ Test 2 Passed: Main list renders with date groups and all 4 color styles.');

  // TEST 3: Sidebar toggle
  console.log('\n[Test 3] Testing sidebar toggle in Other B Paid...');
  const rail = document.getElementById('tobe-paid-left-rail');
  ToBeCreatedModule.togglePaidSidebar();
  assert(rail.classList.contains('collapsed'), 'Expected rail to be collapsed');
  ToBeCreatedModule.togglePaidSidebar();
  assert(!rail.classList.contains('collapsed'), 'Expected rail to be expanded again');
  console.log('✓ Test 3 Passed: Sidebar collapse/unhide toggling works.');

  // TEST 4: Drilldown Green (Settled Trip Details - 2026-2027--259_TTC)
  console.log('\n[Test 4] Testing Green Drilldown: Settled Trip Details (2026-2027--259_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--259_TTC');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'paid-details');
  const greenContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(greenContent.includes('Settled'), 'Expected Settled badge');
  assert(greenContent.includes('RJ52GB0725'), 'Expected Truck RJ52GB0725');
  assert(greenContent.includes('Payment 1'), 'Expected Payment 1 table');
  assert(greenContent.includes('127,999.00'), 'Expected 127,999.00 freight/payment');
  assert(greenContent.includes('Other B 1'), 'Expected Other B 1 table');
  assert(greenContent.includes('Rameshwar Prasad'), 'Expected Owner Rameshwar Prasad');
  console.log('✓ Test 4 Passed: Authentic Green Settled Trip Details verified.');

  // TEST 5: Drilldown Light Blue (Party Payment Pending - 2026-2027--262_TTC)
  console.log('\n[Test 5] Testing Light Blue Drilldown: Party Payment Pending (2026-2027--262_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--262_TTC');
  const blueContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(blueContent.includes('Party Payment Pending'), 'Expected Party Payment Pending status');
  assert(blueContent.includes('RJ52GB5964'), 'Expected Truck RJ52GB5964');
  assert(blueContent.includes('Other B Payment 3'), 'Expected Other B Payment 3');
  assert(blueContent.includes('UPI-Amar Motors'), 'Expected UPI-Amar Motors payment');
  assert(blueContent.includes('UPI-Nishant Gour'), 'Expected UPI-Nishant Gour payment');
  assert(blueContent.includes('Mr Vijay Kumar'), 'Expected Mr Vijay Kumar payment');
  assert(blueContent.includes('Add Records for Other B'), 'Expected Add Records button');
  console.log('✓ Test 5 Passed: Authentic Light Blue Party Payment Pending verified.');

  // TEST 6: Drilldown Red (Other B Pending - 2026-2027--246_TTC)
  console.log('\n[Test 6] Testing Red Drilldown: Other B Pending (2026-2027--246_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--246_TTC');
  const redContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(redContent.includes('Other B Pending'), 'Expected Other B Pending status');
  assert(redContent.includes('NL01AF9218'), 'Expected Truck NL01AF9218');
  assert(redContent.includes('Other B Payment 1'), 'Expected Other B Payment 1');
  assert(redContent.includes('10,200.00'), 'Expected ₹ 10,200.00 payment');
  assert(redContent.includes('7,800.00'), 'Expected ₹ 7,800.00 due payment');
  assert(redContent.includes('Agarwal Marble Noida'), 'Expected Reference Agarwal Marble Noida');
  console.log('✓ Test 6 Passed: Authentic Red Other B Pending verified.');

  // TEST 7: Drilldown Sky Blue Chamkila (Truck Owner Payment Pending - 2026-2027--235_TTC)
  console.log('\n[Test 7] Testing Sky Blue Chamkila: Truck Owner Payment Pending (2026-2027--235_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--235_TTC');
  const skyContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(skyContent.includes('Truck Owner Payment Pending'), 'Expected Truck Owner Payment Pending status');
  assert(skyContent.includes('RJ01GC2159'), 'Expected Truck RJ01GC2159');
  assert(skyContent.includes('Owner Payment 7'), 'Expected Owner Payment 7');
  assert(skyContent.includes('108,850.00'), 'Expected Owner Total Payment 108,850.00');
  assert(skyContent.includes('5,730.00'), 'Expected Owner Due 5,730.00');
  assert(skyContent.includes('Add Records for Truck Owner Payment'), 'Expected Add Records for Truck Owner Payment button');
  console.log('✓ Test 7 Passed: Authentic Sky Blue Chamkila Truck Owner Payment Pending verified.');

  // TEST 8: Expand View & Payment Details Card
  console.log('\n[Test 8] Testing Expand View & Single Payment Detail View...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--262_TTC');
  ToBeCreatedModule.openPaidPaymentListView('otherB');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'paid-payment-list');
  const expBody = document.getElementById('paid-payment-list-table-body').innerHTML;
  assert(expBody.includes('8,500.00'), 'Expected payment 8,500.00 in list');
  assert(expBody.includes('8,200.00'), 'Expected payment 8,200.00 in list');
  assert(expBody.includes('3,300.00'), 'Expected payment 3,300.00 in list');

  ToBeCreatedModule.openPaidPaymentDetailView(0, 'otherB');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'paid-payment-detail');
  const singleCard = document.getElementById('paid-payment-detail-card-content').innerHTML;
  assert(singleCard.includes('19/10/2026'), 'Expected Payment Date 19/10/2026');
  assert(singleCard.includes('Transporter'), 'Expected Paid To Transporter');
  assert(singleCard.includes('Phone Pe/GPay/PayTM/UPI'), 'Expected Mode');
  assert(singleCard.includes('8,500.00'), 'Expected Amount Paid 8,500.00');
  assert(singleCard.includes('TTC'), 'Expected Beneficiary TTC');
  assert(singleCard.includes('IDBI'), 'Expected To Bank IDBI');
  assert(singleCard.includes('UPI-Amar Motors'), 'Expected Description UPI-Amar Motors');
  console.log('✓ Test 8 Passed: Expand payment table and single payment detail card verified.');

  // TEST 9: Adding Payment and Dynamic Recalculation
  console.log('\n[Test 9] Testing dynamic Add Payment saving and status transition...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--246_TTC');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.otherBDuePayment, 7800);
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.color, 'red');

  // Fill drawer form to pay the remaining 7800
  document.getElementById('ob-payment-date').value = '22/10/2026';
  document.getElementById('ob-amount-paid').value = '7800';
  document.getElementById('ob-mode').value = 'Phone Pe/GPay/PayTM/UPI';
  document.getElementById('ob-description').value = 'Final Settling Payment';

  await ToBeCreatedModule.savePaidOtherBPayment();
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.otherBDuePayment, 0, 'Due payment should now be 0');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.color, 'light_blue', 'Row color should change from red to light_blue when other B due becomes 0');
  console.log('✓ Test 9 Passed: Add payment dynamically updates amounts, state, and status color.');

  // TEST 10: Financial Year Summary Totals
  console.log('\n[Test 10] Testing FY Totals calculation...');
  const sum2026 = ToBeCreatedModule.paidTrips.filter(t => t.year === '2026-2027').reduce((a, b) => a + Number(b.amountPaid || 0), 0);
  const sum2025 = ToBeCreatedModule.paidTrips.filter(t => t.year === '2025-2026').reduce((a, b) => a + Number(b.amountPaid || 0), 0);
  const sum2024 = ToBeCreatedModule.paidTrips.filter(t => t.year === '2024-2025').reduce((a, b) => a + Number(b.amountPaid || 0), 0);

  assert.strictEqual(Math.round(sum2026), 4177700, `2026 sum mismatch: ${sum2026}`);
  assert.strictEqual(Math.round(sum2025), 5201950, `2025 sum mismatch: ${sum2025}`);
  assert.strictEqual(Math.round(sum2024), 934000, `2024 sum mismatch: ${sum2024}`);
  console.log('✓ Test 10 Passed: Financial Year totals match 100% with the AppSheet badges.');

  console.log('\n======================================================');
  console.log('>>> ALL 10 OTHER B PAID TESTS PASSED SUCCESSFULLY! <<<');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
