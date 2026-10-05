/**
 * Test Suite for Inline Google AppSheet Multi-Party Consignment
 * Verifies that adding extra buyers/sellers appends pure .appsheet-form-row elements,
 * calculates totals in real-time, allocates sequential GRs, and saves all GRs cleanly.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

// Stateful mock DOM
const elementStore = {};
global.document = {
  getElementById: (id) => {
    if (!elementStore[id]) {
      elementStore[id] = {
        id: id,
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
        querySelectorAll: () => []
      };
    }
    return elementStore[id];
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

// Load datasets and services
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function runTests() {
  console.log("=== STARTING INLINE APPSHEET EXTRA PARTIES VERIFICATION SUITE ===");

  await BiltyBookingModule.loadAllData();
  console.log(`Loaded ${BiltyBookingModule.allTrips.length} base trips.`);

  // -------------------------------------------------------------------------
  // TEST 1: Seamless Extra Buyer (Buyer 1 from main form + Buyer 2 from +Add)
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 1: Inline Extra Buyer (1 Main Seller + 2 Buyers) ---");
  BiltyBookingModule.resetForm();

  // 1. Fill main form for Buyer 1 and common vehicle/seller
  document.getElementById('bilty-truck-no').value = 'RJ52GB7788';
  document.getElementById('bilty-owner').value = 'MTC Fleet Owner';
  document.getElementById('bilty-owner-mobile').value = '9414312586';
  document.getElementById('bilty-driver').value = 'Ramesh Kumar';
  document.getElementById('bilty-driver-mobile').value = '9876543210';
  document.getElementById('bilty-broker').value = 'Direct Client';
  document.getElementById('bilty-commission').value = '1200';
  document.getElementById('bilty-other-expense').value = '150';
  document.getElementById('bilty-date').value = '2026-10-06';
  document.getElementById('bilty-firm').value = 'TTC';
  document.getElementById('bilty-year').value = '2026-2027';

  // Common Consignor (Seller)
  document.getElementById('bilty-origin').value = 'Rajsamand (Raj.)';
  document.getElementById('bilty-consignor').value = 'Shree Nath Minerals';
  document.getElementById('bilty-consignor-gstin').value = '08AAACS9999Z1Z1';

  // Buyer 1 (Main Form fields)
  document.getElementById('bilty-consignee').value = 'Buyer 1 - Jaipur Tiles';
  document.getElementById('bilty-consignee-gstin').value = '08AAACJ1111J1Z1';
  document.getElementById('bilty-destination').value = 'Jaipur (Raj.)';
  document.getElementById('bilty-material').value = 'Marble Cut Size';
  document.getElementById('bilty-weight').value = '18.5';
  document.getElementById('bilty-rate').value = '1200';
  document.getElementById('bilty-freight').value = (18.5 * 1200).toString();
  document.getElementById('bilty-bill-no').value = 'INV-JPR-01';
  document.getElementById('bilty-invoice-value').value = '145000';
  document.getElementById('bilty-eway-bill').value = '751699990001';

  // 2. Click + Add Another Buyer / Consignee
  BiltyBookingModule.addExtraBuyer({
    consignee: 'Buyer 2 - Alwar Marbles',
    consigneeGstin: '08AAACA2222A1Z2',
    destination: 'Bhiwadi (Raj.)',
    material: 'Marble Cut Size',
    billingType: 'Per Tonne',
    weight: 21.5,
    rate: 1250,
    billNo: 'INV-ALW-02',
    invoiceValue: 190000,
    ewayBillNo: '751699990002'
  });

  // Verify DOM render in #extra-buyers-list
  const extraBuyersList = document.getElementById('extra-buyers-list');
  if (!extraBuyersList.innerHTML.includes('Buyer / Consignee #2') || !extraBuyersList.innerHTML.includes('appsheet-form-row')) {
    throw new Error("Extra buyer was not rendered in .appsheet-form-row format!");
  }
  console.log("✓ PASS: Extra buyer rendered inside #extra-buyers-list in pure .appsheet-form-row style.");

  // Verify Summary Strip
  const strip = document.getElementById('trip-multi-summary-strip');
  if (strip.classList.contains('d-none')) {
    throw new Error("Summary strip should be visible when extra buyer is present!");
  }
  const multiGrsText = document.getElementById('multi-sum-grs').innerText;
  const multiWtText = document.getElementById('multi-sum-weight').innerText;
  console.log(`Summary strip: ${multiGrsText}, Total Weight: ${multiWtText}`);
  if (multiGrsText !== '2 GRs' || !multiWtText.includes('40.000')) {
    throw new Error(`Summary values incorrect! Expected 2 GRs and 40.000 MT, got ${multiGrsText}, ${multiWtText}`);
  }
  console.log("✓ PASS: Real-time totals correctly combined main Buyer 1 + extra Buyer 2.");

  // Save via saveAppSheetBilty()
  await BiltyBookingModule.saveAppSheetBilty();

  // Verify trips in dbService
  const allTrips = await dbService.getAll('trips');
  const savedBatch = allTrips
    .filter(t => t.truckNo === 'RJ52GB7788' && t.tripStartDate === '2026-10-06')
    .sort((a, b) => parseInt(a.grSeq) - parseInt(b.grSeq));
  console.log(`Saved batch trips: ${savedBatch.length}`);
  if (savedBatch.length !== 2) throw new Error("Expected 2 trips saved, got " + savedBatch.length);

  const [gr1, gr2] = savedBatch;
  console.log(`GR 1: ${gr1.shortGrNo} - ${gr1.consignee} (${gr1.weight} MT, Freight: ₹${gr1.freight}, Comm: ₹${gr1.commission})`);
  console.log(`GR 2: ${gr2.shortGrNo} - ${gr2.consignee} (${gr2.weight} MT, Freight: ₹${gr2.freight}, Comm: ₹${gr2.commission})`);

  if (gr1.commission !== 1200 || gr2.commission !== 0) {
    throw new Error("Commission must be charged exactly once on GR 1!");
  }
  if (gr1.weight !== 18.5 || gr2.weight !== 21.5) {
    throw new Error("Trip weights do not match individual consignments!");
  }
  if (!gr1.tripGroupId || gr1.tripGroupId !== gr2.tripGroupId) {
    throw new Error("Both GRs must share the same tripGroupId!");
  }
  console.log("✓ PASS: Multi-Buyer consignment saved seamlessly from single AppSheet form!");

  // -------------------------------------------------------------------------
  // TEST 2: Reset Form and verify clean state
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 2: Form Reset ---");
  BiltyBookingModule.resetForm();
  if (BiltyBookingModule.extraBuyers.length !== 0 || BiltyBookingModule.extraSellers.length !== 0) {
    throw new Error("extraBuyers / extraSellers should be empty after resetForm()!");
  }
  if (!document.getElementById('trip-multi-summary-strip').classList.contains('d-none')) {
    throw new Error("Summary strip should be hidden after reset!");
  }
  console.log("✓ PASS: Form reset cleans up all dynamic extra buyers and summary strip.");

  // -------------------------------------------------------------------------
  // TEST 3: Seamless Extra Seller (Seller 1 from main form + Seller 2 from +Add)
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 3: Inline Extra Seller (2 Sellers + 1 Main Buyer) ---");
  BiltyBookingModule.resetForm();

  // 1. Vehicle and driver details
  document.getElementById('bilty-truck-no').value = 'RJ52GB9900';
  document.getElementById('bilty-owner').value = 'Shree Mahaveer Transport';
  document.getElementById('bilty-owner-mobile').value = '9414659401';
  document.getElementById('bilty-driver').value = 'Suresh Gurjar';
  document.getElementById('bilty-driver-mobile').value = '6377445099';
  document.getElementById('bilty-broker').value = 'Ramniwas Ji';
  document.getElementById('bilty-commission').value = '1000';
  document.getElementById('bilty-other-expense').value = '100';
  document.getElementById('bilty-date').value = '2026-10-06';
  document.getElementById('bilty-firm').value = 'TTC';
  document.getElementById('bilty-year').value = '2026-2027';

  // Common Consignee (Buyer)
  document.getElementById('bilty-consignee').value = 'Jindal Steel & Granite, Delhi';
  document.getElementById('bilty-consignee-gstin').value = '07AAACJ8888D1Z8';
  document.getElementById('bilty-destination').value = 'Delhi';
  document.getElementById('bilty-delivery-address').value = 'Mayapuri Phase 1, New Delhi';

  // Seller 1 (Main Form fields)
  document.getElementById('bilty-origin').value = 'Rajsamand (Raj.)';
  document.getElementById('bilty-consignor').value = 'Seller 1 - Marble Processing Co';
  document.getElementById('bilty-consignor-gstin').value = '08AAACM1111S1Z1';
  document.getElementById('bilty-dispatch-from').value = 'Factory Unit-A, Sukher';
  document.getElementById('bilty-material').value = 'Marble Cut Size';
  document.getElementById('bilty-weight').value = '16.0';
  document.getElementById('bilty-rate').value = '1800';
  document.getElementById('bilty-freight').value = (16.0 * 1800).toString();
  document.getElementById('bilty-bill-no').value = 'INV-SEL1-01';
  document.getElementById('bilty-invoice-value').value = '200000';
  document.getElementById('bilty-eway-bill').value = '751688880001';

  // 2. Click + Add Another Seller / Consignor
  BiltyBookingModule.addExtraSeller({
    consignor: 'Seller 2 - Royal Stone Suppliers',
    consignorGstin: '08AAACR2222S1Z2',
    dispatchFromAddress: 'Mine Quarry B, Amet',
    material: 'Marble Cut Size',
    billingType: 'Per Tonne',
    weight: 24.0,
    rate: 1800,
    billNo: 'INV-SEL2-02',
    invoiceValue: 280000,
    ewayBillNo: '751688880002'
  });

  // Verify DOM render in #extra-sellers-list
  const extraSellersList = document.getElementById('extra-sellers-list');
  if (!extraSellersList.innerHTML.includes('Seller #2') || !extraSellersList.innerHTML.includes('appsheet-form-row')) {
    throw new Error("Extra seller was not rendered in .appsheet-form-row format!");
  }
  console.log("✓ PASS: Extra seller rendered inside #extra-sellers-list in pure .appsheet-form-row style.");

  // Verify Summary Strip shows 1 Single GR (2 Sellers)
  const stripSeller = document.getElementById('trip-multi-summary-strip');
  if (stripSeller.classList.contains('d-none')) {
    throw new Error("Summary strip should be visible when extra seller is present!");
  }
  const sellerGrText = document.getElementById('multi-sum-grs').innerText;
  console.log(`Summary strip multi-seller GRs text: ${sellerGrText}`);
  if (!sellerGrText.includes('1 Single GR') || !sellerGrText.includes('2 Sellers')) {
    throw new Error(`Summary strip should show '1 Single GR (2 Sellers)', got: ${sellerGrText}`);
  }
  console.log("✓ PASS: Summary strip indicates 1 Single Consolidated GR for multiple sellers.");

  // Save via saveAppSheetBilty()
  await BiltyBookingModule.saveAppSheetBilty();

  // Verify trips in dbService: Must be exactly ONE consolidated trip!
  const allTripsAfterSeller = await dbService.getAll('trips');
  const savedSellerTrips = allTripsAfterSeller
    .filter(t => t.truckNo === 'RJ52GB9900' && t.tripStartDate === '2026-10-06');
  console.log(`Saved seller trips count: ${savedSellerTrips.length}`);
  if (savedSellerTrips.length !== 1) {
    throw new Error("Expected exactly 1 consolidated trip saved, got " + savedSellerTrips.length);
  }

  const consolidatedTrip = savedSellerTrips[0];
  console.log(`Consolidated GR: ${consolidatedTrip.shortGrNo} - Sellers: ${consolidatedTrip.sellerList ? consolidatedTrip.sellerList.length : 1} (Total Weight: ${consolidatedTrip.weight} MT, Freight: ₹${consolidatedTrip.freight}, Comm: ₹${consolidatedTrip.commission})`);

  if (!consolidatedTrip.isConsolidated) {
    throw new Error("Trip should have isConsolidated: true!");
  }
  if (!consolidatedTrip.sellerList || consolidatedTrip.sellerList.length !== 2) {
    throw new Error("sellerList should contain both sellers (length 2)!");
  }
  if (consolidatedTrip.weight !== 40.0) {
    throw new Error(`Consolidated weight should be 40.0 MT (16 + 24), got ${consolidatedTrip.weight}`);
  }
  if (consolidatedTrip.freight !== 72000) {
    throw new Error(`Consolidated freight should be ₹72000 (28800 + 43200), got ${consolidatedTrip.freight}`);
  }
  if (consolidatedTrip.commission !== 1000) {
    throw new Error(`Commission should be 1000, got ${consolidatedTrip.commission}`);
  }
  console.log("✓ PASS: Database trip saved as 1 Single Consolidated record with full sellerList.");

  // Verify Official Bilty Document HTML
  const biltyDocHTML = BiltyBookingModule.getBiltyDocHTML(consolidatedTrip);

  if (!biltyDocHTML.includes('CONSIGNOR(S) NAME &amp; ADDRESS (2 SELLERS CONSOLIDATED)')) {
    throw new Error("Bilty document header does not indicate 2 sellers consolidated!");
  }
  if (!biltyDocHTML.includes('Seller 1 - Marble Processing Co') || !biltyDocHTML.includes('Seller 2 - Royal Stone Suppliers')) {
    throw new Error("Both seller names must appear in the bilty document Consignor box!");
  }
  if (!biltyDocHTML.includes('08AAACM1111S1Z1') || !biltyDocHTML.includes('08AAACR2222S1Z2')) {
    throw new Error("Both seller GSTINs must appear in the bilty document!");
  }
  if (!biltyDocHTML.includes('16.000') || !biltyDocHTML.includes('24.000')) {
    throw new Error("Both individual seller weights (16.000 MT and 24.000 MT) must appear in goods table!");
  }
  if (!biltyDocHTML.includes('40.000 MT')) {
    throw new Error("Total consolidated weight (40.000 MT) must appear in goods table summary row!");
  }
  if (!biltyDocHTML.includes('72,000.00')) {
    throw new Error("Total consolidated freight (₹ 72,000.00) must appear in goods table summary row!");
  }
  if (!biltyDocHTML.includes('INV-SEL1-01') || !biltyDocHTML.includes('INV-SEL2-02')) {
    throw new Error("Both bill numbers must appear in invoice table!");
  }
  if (!biltyDocHTML.includes('751688880001') || !biltyDocHTML.includes('751688880002')) {
    throw new Error("Both e-way bill numbers must appear in invoice table!");
  }
  console.log("✓ PASS: Official Bilty Document HTML contains all sellers itemized with totals on 1 single bilty!");

  console.log("\n🎉 ALL INLINE APPSHEET EXTRA PARTIES TESTS PASSED 100%! 🎉");
}

runTests().catch(err => {
  console.error("❌ TEST FAILED:", err);
  process.exit(1);
});
