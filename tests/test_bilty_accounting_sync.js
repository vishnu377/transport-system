/**
 * Integration Test Suite: 5-Point Financial & Accounting Sync
 * Verifies Single, Multi-Buyer, Multi-Seller, Trips, Settlement & Ledger parity.
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

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
    this._innerText = '';
    this.value = '';
    this.checked = false;
    this.className = '';
    this.classList = new MockClassList();
    this.style = { setProperty: () => {} };
    this.attributes = {};
    this.options = [];
  }
  set innerText(val) { this._innerText = String(val != null ? val : ''); }
  get innerText() { return this._innerText; }
  querySelectorAll() { return []; }
  querySelector() { return null; }
  closest() { return null; }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener() {}
  appendChild(ch) { this.options.push(ch); }
  focus() {}
  reset() { this.value = ''; }
}

const mockDocElements = new Map();
function getOrCreateEl(id) {
  if (!mockDocElements.has(id)) mockDocElements.set(id, new MockElement(id));
  return mockDocElements.get(id);
}

global.window = global;
global.scrollTo = () => {};
global.document = {
  readyState: 'loading',
  getElementById: (id) => getOrCreateEl(id),
  querySelector: () => new MockElement(),
  querySelectorAll: () => [],
  createElement: (tag) => new MockElement('', tag),
  addEventListener: () => {}
};

global.APP_CONFIG = {
  firms: {
    TTC: { badgeClass: 'bg-warning text-dark' },
    MTC: { badgeClass: 'bg-primary text-white' },
    SMTC: { badgeClass: 'bg-success text-white' }
  }
};

global.AppUI = {
  showToast: () => {},
  formatCurrency: (val) => `₹ ${Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d || '-',
  renderSidebar: () => {}
};

// In-memory Firestore mock
const stores = {
  trips: [],
  debts: [],
  payments: [],
  receivedPayments: [],
  parties: [
    { id: 'P1', name: 'SHREE RAM MARBLE', gstin: '08CGDPS3140J1ZA', address: 'Rajsamand' },
    { id: 'P2', name: 'NEW JAI SHREE MARBLES', gstin: '09AAJFR3111N1Z1', address: 'Bareilly' }
  ],
  truckOwners: [
    { id: 'O1', name: 'Sitaram Meena', type: 'Attached', trucks: ['RJ52GB5964'], mobile: '9413571154' }
  ],
  cashLedger: [],
  returnedAmounts: [],
  companyExpenses: [],
  ownerExpenses: []
};

global.dbService = {
  add: async (col, doc) => {
    if (!stores[col]) stores[col] = [];
    stores[col].push(JSON.parse(JSON.stringify(doc)));
    return doc;
  },
  update: async (col, id, patch) => {
    const arr = stores[col] || [];
    const idx = arr.findIndex(x => x.id === id || x.grNo === id);
    if (idx !== -1) Object.assign(arr[idx], patch);
    return arr[idx];
  },
  getAll: async (col) => stores[col] || []
};

// Load all 4 modules
const BiltyBookingModule = require('../js/modules/bilty-booking.js');
eval(fs.readFileSync(path.join(__dirname, '../js/modules/trips.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/modules/settlement.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/modules/ledger.js'), 'utf8'));

const TripsModule = window.TripsModule;
const SettlementModule = window.SettlementModule;
const LedgerModule = window.LedgerModule;

async function runTests() {
  console.log('=== TEST SUITE: 5-POINT FINANCIAL & ACCOUNTING SYNC ===\n');

  BiltyBookingModule.allTrips = [];
  BiltyBookingModule.parties = stores.parties;
  BiltyBookingModule.openMultiPrintModal = () => {};
  BiltyBookingModule.openPrintModal = () => {};

  // ------------------------------------------------------------------
  // TEST 1: Multi-Buyer (Extra Buyers) saves GST, Loading, Halt & Debt Schema
  // ------------------------------------------------------------------
  getOrCreateEl('bilty-truck-no').value = 'RJ52GB5964';
  getOrCreateEl('bilty-firm').value = 'TTC';
  getOrCreateEl('bilty-year').value = '2026-2027';
  getOrCreateEl('bilty-date').value = '2026-11-12';
  getOrCreateEl('bilty-owner').value = 'Sitaram Meena';
  getOrCreateEl('bilty-driver').value = 'Ramesh';
  getOrCreateEl('bilty-is-gst').value = 'Yes';
  getOrCreateEl('bilty-gst-paid-party').value = 'Yes';
  getOrCreateEl('bilty-commission').value = '1500';

  // Buyer 1 (Main Form): Freight 20,000 + Loading 500 + Halt 200 + 5% GST (1,000) = 21,700
  getOrCreateEl('bilty-consignor').value = 'SHREE RAM MARBLE';
  getOrCreateEl('bilty-consignee').value = 'NEW JAI SHREE MARBLES';
  getOrCreateEl('bilty-destination').value = 'Bareilly (U.P.)';
  getOrCreateEl('bilty-delivery-address').value = 'Pilibhit Bypass Road, Bareilly';
  getOrCreateEl('bilty-billing-type').value = 'Per Tonne';
  getOrCreateEl('bilty-weight').value = '20';
  getOrCreateEl('bilty-rate').value = '1000';
  getOrCreateEl('bilty-freight').value = '20000';
  getOrCreateEl('bilty-gst-amount').value = '1000';
  getOrCreateEl('bilty-loading-charges').value = '500';
  getOrCreateEl('bilty-halt-charges').value = '200';

  // Buyer 2 (Extra Buyer): Freight 15,000 + Loading 300 + 5% GST (750) = 16,050
  BiltyBookingModule.extraSellers = [];
  BiltyBookingModule.extraBuyers = [{
    consignee: 'BENGANI GRANITE',
    consigneeGstin: '09XYZ',
    destination: 'Lucknow (U.P.)',
    deliveryAddress: 'Transport Nagar, Lucknow',
    material: 'Marble Cut Size',
    billingType: 'Per Tonne',
    weight: 15,
    rate: 1000,
    loadingCharges: 300,
    haltCharges: 0
  }];

  // Linked Debt checked
  getOrCreateEl('toggle-any-debt').checked = true;
  getOrCreateEl('bilty-debt-type').value = 'Trip Advance';
  getOrCreateEl('bilty-debt-amount').value = '2500';
  getOrCreateEl('bilty-debt-mode').value = 'Cash';

  await BiltyBookingModule.saveAppSheetBilty();

  assert.strictEqual(stores.trips.length, 2, 'Multi-Buyer must create 2 separate trips');
  const tB1 = stores.trips[0];
  const tB2 = stores.trips[1];

  assert.strictEqual(tB1.partyDue, 21700, 'Buyer 1 partyDue must equal Freight(20k) + Loading(500) + Halt(200) + GST(1000)');
  assert.strictEqual(tB1.total, 21700, 'Buyer 1 total must be stored explicitly');
  assert.strictEqual(tB1.ownerDue, 18500, 'Buyer 1 ownerDue must deduct commission 1500');
  assert.strictEqual(tB2.partyDue, 16050, 'Buyer 2 partyDue must equal Freight(15k) + Loading(300) + GST(750)');
  assert.strictEqual(tB2.commission, 0, 'Buyer 2 commission must be 0 to avoid double deduction');
  assert.strictEqual(tB2.ownerDue, 15000, 'Buyer 2 ownerDue must be full freight 15000');

  assert.strictEqual(stores.debts.length, 1, 'Multi-Buyer must create 1 linked debt');
  const d1 = stores.debts[0];
  assert.strictEqual(d1.fy, '2026-2027', 'Linked debt must have AppSheet fy');
  assert.strictEqual(d1.dueAmount, 2500, 'Linked debt must have AppSheet dueAmount');
  assert.strictEqual(d1.debtAmount, 2500, 'Linked debt must have AppSheet debtAmount');
  assert(d1.monthKey && d1.displayDate, 'Linked debt must have monthKey and displayDate');
  console.log('✔ TEST 1 PASSED: Multi-Buyer saves GST + Loading + Halt into partyDue/total & full AppSheet debt schema!');

  // ------------------------------------------------------------------
  // TEST 2: Multi-Seller (Extra Sellers) saves 1 GR with scaled GST & Seller List
  // ------------------------------------------------------------------
  BiltyBookingModule.extraBuyers = [];
  BiltyBookingModule.extraSellers = [{
    consignor: 'RADHA KRISHNA STONES',
    consignorGstin: '08AABCR1234F1Z9',
    dispatchFromAddress: 'Industrial Area Unit 2',
    material: 'Granite',
    billingType: 'Per Tonne',
    weight: 15,
    rate: 1000,
    loadingCharges: 0,
    haltCharges: 600
  }];
  // Reset form for Seller 1 (10 * 1000 = 10,000 + 400 loading) -> Total Freight 25,000 + 1,000 extras + 1,250 GST = 27,250
  getOrCreateEl('bilty-weight').value = '10';
  getOrCreateEl('bilty-rate').value = '1000';
  getOrCreateEl('bilty-freight').value = '10000';
  getOrCreateEl('bilty-gst-amount').value = '500'; // 5% of Seller 1 freight (10k)
  getOrCreateEl('bilty-loading-charges').value = '400';
  getOrCreateEl('bilty-halt-charges').value = '0';
  getOrCreateEl('bilty-commission').value = '1000';
  getOrCreateEl('toggle-any-debt').checked = false;

  await BiltyBookingModule.saveAppSheetBilty();
  assert.strictEqual(stores.trips.length, 3, 'Multi-Seller must add exactly 1 consolidated trip');
  const tMS = stores.trips[2];
  assert.strictEqual(tMS.freight, 25000, 'Multi-Seller freight must sum both sellers (10k + 15k)');
  assert.strictEqual(tMS.gstAmount, 1250, 'Multi-Seller GST must scale across total freight (5% of 25k = 1250)');
  assert.strictEqual(tMS.partyDue, 27250, 'Multi-Seller partyDue must equal Freight(25k) + Loading(400) + Halt(600) + GST(1250)');
  assert.strictEqual(tMS.ownerDue, 24000, 'Multi-Seller ownerDue must equal 25000 - 1000 commission');
  console.log('✔ TEST 2 PASSED: Multi-Seller creates 1 GR with full GST + Loading + Halt + Seller List!');

  // ------------------------------------------------------------------
  // TEST 3: TripsModule & SettlementModule display all Multi-Sellers & preserve Total on Payment
  // ------------------------------------------------------------------
  TripsModule.allTrips = stores.trips;
  TripsModule.filteredTrips = stores.trips;
  TripsModule.workflowTab = 'open';
  TripsModule.openTripDetails(tMS.id);
  const opConsHtml = getOrCreateEl('op-consignor-tbody').innerHTML;
  assert(opConsHtml.includes('SHREE RAM MARBLE') && opConsHtml.includes('RADHA KRISHNA STONES'), 'Trips Open View must display both sellers');
  assert.strictEqual(getOrCreateEl('op-consignor-count').innerText, '2', 'Trips Open View consignor count must be 2');

  TripsModule.openSettledTripDetails(tMS.id);
  const spConsHtml = getOrCreateEl('sp-consignor-tbody').innerHTML;
  assert(spConsHtml.includes('SHREE RAM MARBLE') && spConsHtml.includes('RADHA KRISHNA STONES'), 'Trips Settled View must display both sellers');
  assert.strictEqual(getOrCreateEl('sp-consignor-count').innerText, '2', 'Trips Settled View consignor count must be 2');

  SettlementModule.allTrips = stores.trips;
  SettlementModule.filteredTrips = stores.trips;
  SettlementModule.viewTripDetails(tMS.id);
  const setConsHtml = getOrCreateEl('detail-consignor-table').innerHTML;
  assert(setConsHtml.includes('SHREE RAM MARBLE') && setConsHtml.includes('RADHA KRISHNA STONES'), 'Settlement detail card must display both sellers');

  // Receive partial payment of ₹10,000 on Buyer 1 trip (due was ₹21,700)
  getOrCreateEl('cp-trip-id').value = tB1.id;
  getOrCreateEl('cp-date').value = '2026-11-12';
  getOrCreateEl('cp-amount').value = '10000';
  getOrCreateEl('cp-mode').value = 'NEFT/RTGS';
  getOrCreateEl('cp-from-bank').value = 'SBI';
  getOrCreateEl('cp-to-bank').value = 'IDBI';
  getOrCreateEl('cp-desc').value = 'Part freight payment';
  await TripsModule.saveConsigneePayment();

  assert.strictEqual(tB1.partyPaid, 10000, 'partyPaid must be 10,000');
  assert.strictEqual(tB1.partyDue, 11700, 'partyDue must remain 11,700 (preserving Loading+Halt+GST, not reverting to Freight-only!)');
  assert.strictEqual(stores.payments.length, 1, 'Trips consignee payment must also sync to payments ledger collection');
  console.log('✔ TEST 3 PASSED: Multi-Sellers render in Trips & Settlement + Customer Payment preserves GST/Charges & syncs Ledger!');

  // ------------------------------------------------------------------
  // TEST 4: Settlement Owner Payment updates t.ownerPayments & Ledger payments
  // ------------------------------------------------------------------
  getOrCreateEl('rop-trip-id').value = tB1.id;
  getOrCreateEl('rop-amount').value = '8500';
  getOrCreateEl('rop-date').value = '2026-11-12';
  getOrCreateEl('rop-mode').value = 'NEFT/RTGS';
  await SettlementModule.handleSaveOwnerPayment();

  assert.strictEqual(tB1.ownerDue, 10000, 'Owner due must become 18,500 - 8,500 = 10,000');
  assert.strictEqual(tB1.ownerPayments.length, 1, 't.ownerPayments must record owner payout');
  assert.strictEqual(stores.payments.filter(p => p.type === 'owner').length, 1, 'Owner payout must sync to payments ledger');
  console.log('✔ TEST 4 PASSED: Settlement Owner Payment updates ownerDue, ownerPayments, and payments ledger!');

  // ------------------------------------------------------------------
  // TEST 5: Ledger Party & Owner Statements reflect accurate totals
  // ------------------------------------------------------------------
  LedgerModule.allTrips = [tB1];
  LedgerModule.allParties = stores.parties;
  LedgerModule.allOwners = stores.truckOwners;
  LedgerModule.allPayments = stores.payments;
  LedgerModule.allReceivedPayments = stores.receivedPayments;

  LedgerModule.renderPartyStatement('P2', 'ALL');
  assert.strictEqual(getOrCreateEl('stmt-total-debit').innerText, '₹ 21,700.00', 'Party Statement debit must be 21,700 (incl. GST/Loading/Halt)');
  assert.strictEqual(getOrCreateEl('stmt-total-credit').innerText, '₹ 10,000.00', 'Party Statement credit must include payment recorded from Trips');
  assert.strictEqual(getOrCreateEl('stmt-closing-due').innerText, '₹ 11,700.00', 'Party Statement closing balance must match 11,700');

  LedgerModule.renderOwnerStatement('O1', 'ALL');
  assert.strictEqual(getOrCreateEl('stmt-total-debit').innerText, '₹ 18,500.00', 'Owner Statement payable must be Freight(20k) - Commission(1500) = 18,500');
  assert.strictEqual(getOrCreateEl('stmt-total-credit').innerText, '₹ 8,500.00', 'Owner Statement paid must show 8,500 payout');
  assert.strictEqual(getOrCreateEl('stmt-closing-due').innerText, '₹ 10,000.00', 'Owner Statement closing balance must match 10,000');
  console.log('✔ TEST 5 PASSED: Ledger Party & Owner Statements reconcile 100% to the exact rupee!');

  console.log('\n======================================================');
  console.log('🏆 ALL 5 ACCOUNTING SYNC INTEGRATION TESTS PASSED 100%!');
  console.log('======================================================');
}

runTests().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
