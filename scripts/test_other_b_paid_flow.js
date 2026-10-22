/**
 * test_other_b_paid_flow.js - Automated Test Suite for "Other B Paid" (Card 2)
 * Tests:
 *  1. Dashboard & Badges Initialization
 *  2. Main List Table & Green Rows verification
 *  3. Sidebar Toggle collapse/unhide
 *  4. Single Debts Icon in Header
 *  5. Drilldown Green Settled (2026-2027--259_TTC)
 *  6. Drilldown Light Blue (2026-2027--262_TTC) with AppSheet Dropdowns & Blue fields
 *  7. Drilldown Red (2026-2027--246_TTC) with AppSheet Dropdowns & Red fields
 *  8. Drilldown Sky Blue / Cyan (2026-2027--235_TTC) with AppSheet Dropdowns & Cyan fields
 *  9. Expand Button in Middle Card & Single Payment Detail Card
 *  10. Drawer AppSheet Dropdown helpers
 *  11. Dynamic Status Switching via selectPaidStatus()
 *  12. Add Payment Save & State Recalculation
 *  13. Financial Year Totals (10,313,650.00)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM environment
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
      toggle(c, force) {
        if (force === true) this.classes.add(c);
        else if (force === false) this.classes.delete(c);
        else if (this.classes.has(c)) this.classes.delete(c);
        else this.classes.add(c);
      }
    },
    innerText: '',
    innerHTML: '',
    value: '',
    placeholder: '',
    setAttribute: () => {},
    getAttribute: () => null
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  querySelectorAll(sel) {
    return [];
  },
  addEventListener: () => {}
};

global.bootstrap = {
  Offcanvas: {
    getOrCreateInstance: (el) => ({
      show: () => el && el.classList.add('show'),
      hide: () => el && el.classList.remove('show')
    }),
    getInstance: (el) => ({
      show: () => el && el.classList.add('show'),
      hide: () => el && el.classList.remove('show')
    })
  }
};

global.AppUI = {
  showToast: (msg, type) => console.log(`[Toast ${type}]: ${msg}`)
};

// Load datasets and module
require('../js/sample-other-b-data.js');
require('../js/sample-other-b-paid-data.js');
const ToBeCreatedModule = require('../js/modules/to_be_created.js');

(async () => {
  console.log('=== Running Other B Paid Full Flow Test Suite ===\n');

  // Step 1: Initialize Module & Check Badges
  console.log('[Test 1] Initializing module and checking Card 2 dashboard badges...');
  await ToBeCreatedModule.init();

  const b2026 = document.getElementById('badge-paid-2026').innerText;
  const b2025 = document.getElementById('badge-paid-2025').innerText;
  const b2024 = document.getElementById('badge-paid-2024').innerText;

  assert(b2026.includes('4,177,700.00'), `Expected 4,177,700.00 for 2026, got ${b2026}`);
  assert(b2025.includes('5,201,950.00'), `Expected 5,201,950.00 for 2025, got ${b2025}`);
  assert(b2024.includes('934,000.00'), `Expected 934,000.00 for 2024, got ${b2024}`);
  console.log('✓ Test 1 Passed: Dashboard badges match Google AppSheet targets exactly.');

  // Step 2: Open Other B Paid List & Verify Rows
  console.log('\n[Test 2] Opening Other B Paid list view & verifying ALL rows are GREEN...');
  ToBeCreatedModule.openOtherBPaidList('ALL');
  assert.strictEqual(ToBeCreatedModule.viewMode, 'paid-list');
  const tbodyHtml = document.getElementById('tobe-paid-table-body').innerHTML;
  assert(tbodyHtml.includes('tobe-row-green'), 'Rows should have class tobe-row-green');
  assert(tbodyHtml.includes('tobe-bullet-green'), 'Rows should have green bullets');
  assert(tbodyHtml.includes('RJ52GB5964'), 'Expected trip RJ52GB5964 in list');
  console.log('✓ Test 2 Passed: In Card 2 list, ALL rows are green with green bullets.');

  // Step 3: Sidebar Toggle
  console.log('\n[Test 3] Testing sidebar toggle in Other B Paid...');
  const sidebar = document.getElementById('tobe-paid-left-rail');
  const unhideWrap = document.getElementById('tobe-paid-unhide-sidebar-wrap');

  ToBeCreatedModule.togglePaidSidebar();
  assert(sidebar.classList.contains('d-none'), 'Sidebar should now be hidden');
  assert(!unhideWrap.classList.contains('d-none'), 'Unhide button should now be visible');

  ToBeCreatedModule.togglePaidSidebar();
  assert(!sidebar.classList.contains('d-none'), 'Sidebar should now be unhidden');
  assert(unhideWrap.classList.contains('d-none'), 'Unhide button should now be hidden again');
  console.log('✓ Test 3 Passed: Sidebar collapse/unhide toggle works smoothly.');

  // Step 4: Drilldown Green (Settled Trip Details - 2026-2027--259_TTC)
  console.log('\n[Test 4] Testing Green Drilldown: Settled Trip Details (2026-2027--259_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--259_TTC');
  const greenContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(greenContent.includes('Payment'), 'Expected Payment section');
  assert(greenContent.includes('RJ52GB0725'), 'Expected Truck RJ52GB0725');
  assert(greenContent.includes('127,999.00'), 'Expected 127,999.00 freight/payment');
  assert(greenContent.includes('Other B'), 'Expected Other B section');
  assert(greenContent.includes('Rameshwar Prasad'), 'Expected Owner Rameshwar Prasad');
  assert(greenContent.includes('tobe-bullet-green'), 'Expected green bullets throughout');
  console.log('✓ Test 4 Passed: Authentic Green Settled Trip Details verified.');

  // Step 5: Drilldown Light Blue (Party Payment Pending - 2026-2027--262_TTC)
  console.log('\n[Test 5] Testing Light Blue Drilldown: Party Payment Pending (2026-2027--262_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--262_TTC');
  const blueContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(blueContent.includes('Party Payment Pending'), 'Expected Party Payment Pending status');
  assert(blueContent.includes('RJ52GB5964'), 'Expected Truck RJ52GB5964');
  assert(blueContent.includes('Other B Payment'), 'Expected Other B Payment');
  assert(blueContent.includes('UPI-Amar Motors'), 'Expected UPI-Amar Motors payment');
  assert(blueContent.includes('UPI-Nishant Gour'), 'Expected UPI-Nishant Gour payment');
  assert(blueContent.includes('Mr Vijay Kumar'), 'Expected Mr Vijay Kumar payment');
  assert(blueContent.includes('tobe-paid-status-dropdown-wrapper'), 'Expected AppSheet status dropdown');
  assert(blueContent.includes('tobe-paid-addrecords-dropdown-wrapper'), 'Expected AppSheet add records dropdown');
  assert(blueContent.includes('phone-icon-btn blue'), 'Expected blue phone icon for mobile numbers');
  console.log('✓ Test 5 Passed: Authentic Light Blue Party Payment Pending verified.');

  // Step 6: Drilldown Red (Other B Pending - 2026-2027--246_TTC)
  console.log('\n[Test 6] Testing Red Drilldown: Other B Pending (2026-2027--246_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--246_TTC');
  const redContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(redContent.includes('Other B Pending'), 'Expected Other B Pending status');
  assert(redContent.includes('NL01AF9218'), 'Expected Truck NL01AF9218');
  assert(redContent.includes('10,200.00'), 'Expected ₹ 10,200.00 payment');
  assert(redContent.includes('7,800.00'), 'Expected ₹ 7,800.00 due payment');
  assert(redContent.includes('Agarwal Marble Noida'), 'Expected Reference Agarwal Marble Noida');
  assert(redContent.includes('phone-icon-btn red'), 'Expected red phone icon for mobile numbers');
  console.log('✓ Test 6 Passed: Authentic Red Other B Pending verified.');

  // Step 7: Drilldown Sky Blue Chamkila (Truck Owner Payment Pending - 2026-2027--235_TTC)
  console.log('\n[Test 7] Testing Sky Blue Chamkila: Truck Owner Payment Pending (2026-2027--235_TTC)...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--235_TTC');
  const skyContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(skyContent.includes('Truck Owner Payment Pending'), 'Expected Truck Owner Payment Pending status');
  assert(skyContent.includes('RJ01GC2159'), 'Expected Truck RJ01GC2159');
  assert(skyContent.includes('108,850.00'), 'Expected Owner Total Payment 108,850.00');
  assert(skyContent.includes('5,730.00'), 'Expected Owner Due 5,730.00');
  assert(skyContent.includes('phone-icon-btn cyan'), 'Expected cyan phone icon for mobile numbers');
  console.log('✓ Test 7 Passed: Authentic Sky Blue Chamkila Truck Owner Payment Pending verified.');

  // Step 8: Expand View & Payment Details Card
  console.log('\n[Test 8] Testing Middle Card Expand View & Single Payment Detail View...');
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
  console.log('✓ Test 8 Passed: Expand payment table and single payment detail card verified.');

  // Step 9: Drawer AppSheet Dropdown helpers
  console.log('\n[Test 9] Testing Drawer AppSheet Dropdown helpers...');
  ToBeCreatedModule.selectDropdownOption('ob-mode', 'Cash', 'Cash', '#137333');
  assert.strictEqual(document.getElementById('ob-mode').value, 'Cash');
  assert(document.getElementById('ob-mode-display').innerHTML.includes('Cash'));

  ToBeCreatedModule.selectDropdownOption('owner-payment-mode', 'Dalia', 'Dalia', '#137333');
  assert.strictEqual(document.getElementById('owner-payment-mode').value, 'Dalia');
  assert(document.getElementById('owner-payment-mode-display').innerHTML.includes('Dalia'));
  console.log('✓ Test 9 Passed: Drawer AppSheet dropdown helpers update value and display.');

  // Step 10: Dynamic Status Switching via selectPaidStatus()
  console.log('\n[Test 10] Testing dynamic status switching via selectPaidStatus()...');
  ToBeCreatedModule.openPaidTripDetails('2026-2027--262_TTC');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.status, 'Party Payment Pending');

  ToBeCreatedModule.selectPaidStatus('Other B Pending');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.status, 'Other B Pending');
  assert.strictEqual(ToBeCreatedModule.activePaidTrip.color, 'red');
  const updatedContent = document.getElementById('tobe-paid-trip-details-content').innerHTML;
  assert(updatedContent.includes('d93025') || updatedContent.includes('tobe-bullet-red'), 'View should render in red scheme');
  console.log('✓ Test 10 Passed: Changing status updates active trip and immediately re-renders view in matching color scheme.');

  // Step 11: Add Payment saving & recalculation
  console.log('\n[Test 11] Testing dynamic Add Payment saving and status transition...');
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
  console.log('✓ Test 11 Passed: Add payment dynamically updates amounts, state, and status color.');

  // Step 12: Financial Year Summary Totals
  console.log('\n[Test 12] Testing FY Totals calculation...');
  const sum2026 = ToBeCreatedModule.paidTrips.filter(t => t.year === '2026-2027').reduce((a, b) => a + Number(b.amountPaid || 0), 0);
  const sum2025 = ToBeCreatedModule.paidTrips.filter(t => t.year === '2025-2026').reduce((a, b) => a + Number(b.amountPaid || 0), 0);
  const sum2024 = ToBeCreatedModule.paidTrips.filter(t => t.year === '2024-2025').reduce((a, b) => a + Number(b.amountPaid || 0), 0);

  assert.strictEqual(Math.round(sum2026), 4177700, `2026 sum mismatch: ${sum2026}`);
  assert.strictEqual(Math.round(sum2025), 5201950, `2025 sum mismatch: ${sum2025}`);
  assert.strictEqual(Math.round(sum2024), 934000, `2024 sum mismatch: ${sum2024}`);
  console.log('✓ Test 12 Passed: Financial Year totals match 100% with the AppSheet badges.');

  // Step 13: HTML Expand arrow verification
  console.log('\n[Test 13] Verifying HTML for Dashboard Card 2 Expand Arrow...');
  const rawHtml = fs.readFileSync(path.resolve(__dirname, '../pages/to_be_created.html'), 'utf8');
  assert(rawHtml.includes('title="Expand Other B Paid" onclick="ToBeCreatedModule.openOtherBPaidList(\'ALL\')"'), 'Card 2 expand arrow must have openOtherBPaidList');
  assert(rawHtml.includes('id="ob-mode-wrapper"'), 'ob-mode AppSheet select wrapper must exist');
  assert(rawHtml.includes('id="owner-payment-mode-wrapper"'), 'owner-payment-mode AppSheet select wrapper must exist');
  assert(rawHtml.includes('id="cp-mode-wrapper"'), 'cp-mode AppSheet select wrapper must exist');
  console.log('✓ Test 13 Passed: HTML contains all wired expand arrows and AppSheet dropdown wrappers.');

  console.log('\n======================================================');
  console.log('>>> ALL 13 OTHER B PAID TESTS PASSED SUCCESSFULLY! <<<');
  console.log('======================================================\n');
})();
