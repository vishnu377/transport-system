const fs = require('fs');
const path = require('path');

const tripsHtmlPath = path.join(__dirname, '../pages/trips.html');
const tripsJsPath = path.join(__dirname, '../js/modules/trips.js');

const html = fs.readFileSync(tripsHtmlPath, 'utf8');
const js = fs.readFileSync(tripsJsPath, 'utf8');

const settledHtmlIds = [
  // 4 Main Views
  'trip-settled-detail-view',
  'trip-settled-party-view',
  'trip-settled-payment-view',
  'trip-settled-owner-payment-view',

  // Left Pane Card 1: Particulars
  'sp-gr-no',
  'sp-truck-no',
  'sp-start-date',
  'sp-end-date',
  'sp-origin',
  'sp-destination',
  'sp-billing-type',
  'sp-bilty-amount',
  'sp-weight',
  'sp-rate',
  'sp-material',
  'sp-reference',
  'sp-ref-mobile',
  'sp-ref-tel',
  'sp-driver',
  'sp-driver-mobile',
  'sp-driver-tel',

  // Left Pane Card 2: Consignee, Owner & Freight
  'sp-consignee-gstin',
  'sp-consignee',
  'sp-consignee-mobile',
  'sp-consignee-tel',
  'sp-freight',
  'sp-total-freight',
  'sp-paid-amount',
  'sp-owner',
  'sp-owner-mobile',
  'sp-owner-tel',

  // Left Pane Card 3: Owner Total Payment & POD Date
  'sp-owner-total-payment',
  'sp-pod-date',

  // Right Pane: 3 Cards (Consignor/s, Payment, Owner Payment)
  'sp-consignor-count',
  'sp-consignor-tbody',
  'sp-payment-count',
  'sp-payments-tbody',
  'sp-owner-payment-count',
  'sp-owner-payments-tbody',

  // Subview 1: Settled Party Details
  'sp-party-view-tbody',
  'sp-pv-gr',
  'sp-pv-consignor',
  'sp-pv-address',
  'sp-pv-gstin',

  // Subview 2: Trip Payment Details
  'sp-tpd-search-input',
  'sp-tpd-tbody',
  'sp-tpd-d-date',
  'sp-tpd-d-paidto',
  'sp-tpd-d-mode',
  'sp-tpd-d-amount',
  'sp-tpd-d-beneficiary',
  'sp-tpd-d-frombank',
  'sp-tpd-d-tobank',

  // Subview 3: Trip Truck Owner Payment Details
  'sp-topd-search-input',
  'sp-topd-tbody',
  'sp-topd-d-date',
  'sp-topd-d-mode',
  'sp-topd-d-amount',
  'sp-topd-d-beneficiary',
  'sp-topd-d-frombank',
  'sp-topd-d-tobank'
];

let missingHtmlIds = [];
settledHtmlIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    missingHtmlIds.push(id);
  }
});

if (missingHtmlIds.length > 0) {
  console.error('FAIL: Missing Settled HTML IDs:', missingHtmlIds);
  process.exit(1);
}

const requiredJsMethods = [
  'openSettledTripDetails',
  'getTripPayments',
  'getTripOwnerPayments',
  'renderSettledPaymentsCard',
  'renderSettledOwnerPaymentsCard',
  'openSettledPartyView',
  'returnToSettledTripDetails',
  'openSettledPaymentView',
  'renderSettledPaymentDetailsList',
  'selectSettledPaymentDetail',
  'filterSettledPaymentDetails',
  'openSettledOwnerPaymentView',
  'renderSettledOwnerPaymentDetailsList',
  'selectSettledOwnerPaymentDetail',
  'filterSettledOwnerPaymentDetails',
  'toggleSettledDetailFullscreen',
  'syncTripFromCloud'
];

let missingJsMethods = [];
requiredJsMethods.forEach(method => {
  if (!js.includes(method)) {
    missingJsMethods.push(method);
  }
});

if (missingJsMethods.length > 0) {
  console.error('FAIL: Missing Settled JS methods:', missingJsMethods);
  process.exit(1);
}

console.log(`PASS: All ${settledHtmlIds.length} Settled DOM IDs and all ${requiredJsMethods.length} Settled JS Methods are present and verified!`);
