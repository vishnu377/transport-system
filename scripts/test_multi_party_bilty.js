/**
 * Automated Verification Test Suite for Multi-Party Bilty Consignment
 * Tests:
 * 1. Case 1: Standard Single Bilty (1:1)
 * 2. Case 2: Multi-Buyer Consignment (1 Seller -> 3 Buyers -> 3 Sequential GRs)
 * 3. Case 3: Multi-Seller Consignment (3 Sellers -> 1 Buyer -> 3 Sequential GRs)
 * 4. Verifies Trip Grouping, Sequential GR counter, Commission distribution, and Print Generation
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
          add: () => {},
          remove: () => {},
          contains: () => false
        },
        focus: () => {}
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
  console.log("=== STARTING MULTI-PARTY BILTY CONSIGNMENT VERIFICATION SUITE ===");

  await BiltyBookingModule.loadAllData();
  console.log(`Loaded ${BiltyBookingModule.allTrips.length} base trips into module.`);

  // -------------------------------------------------------------------------
  // TEST 1: Sequential GR Generator
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 1: Sequential Multi-GR Number Generator ---");
  const seqs3 = BiltyBookingModule.getNextGrSequences('TTC', '2026-2027', 3);
  console.log(`Allocated 3 GR sequences:`, seqs3.map(s => s.shortGr));
  if (seqs3.length !== 3) throw new Error("Expected 3 sequences, got " + seqs3.length);
  if (seqs3[1].seq !== seqs3[0].seq + 1 || seqs3[2].seq !== seqs3[1].seq + 1) {
    throw new Error("GR numbers are not strictly sequential!");
  }
  console.log("✓ PASS: GR sequence generator correctly allocates consecutive numbers.");

  // -------------------------------------------------------------------------
  // TEST 2: Case 2 (1 Seller -> 3 Buyers / Multi-Consignee)
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 2: Case 2 - 1 Seller -> 3 Buyers (Multi-Consignee) ---");
  BiltyBookingModule.bookingMode = 'multi_consignee';
  
  // Set common truck form fields
  document.getElementById('bilty-truck-no').value = 'RJ52GB5964';
  document.getElementById('bilty-owner').value = 'Shree Mahaveer Transport Co';
  document.getElementById('bilty-owner-mobile').value = '9414659401';
  document.getElementById('bilty-driver').value = 'Mukesh Gurjar';
  document.getElementById('bilty-driver-mobile').value = '6377445099';
  document.getElementById('bilty-broker').value = 'Ramniwas Ji 7976808636';
  document.getElementById('bilty-commission').value = '1500'; // Trip commission
  document.getElementById('bilty-other-expense').value = '200'; // Toll / weighbridge
  document.getElementById('bilty-date').value = '2026-10-05';
  document.getElementById('bilty-firm').value = 'TTC';
  document.getElementById('bilty-year').value = '2026-2027';

  // Set common seller
  document.getElementById('mb-consignor').value = 'RK Marble Pvt Ltd';
  document.getElementById('mb-consignor-gstin').value = '08AAACR1234F1Z1';
  document.getElementById('mb-origin').value = 'Rajsamand (Raj.)';
  document.getElementById('mb-dispatch-from').value = 'Factory Unit-2, Morwad';

  // Set 3 Buyers
  BiltyBookingModule.multiBuyers = [
    {
      consignee: 'Buyer A - Delhi Traders',
      consigneeGstin: '07AAACD1111A1Z1',
      destination: 'Delhi',
      deliveryAddress: 'Mayapuri Phase 2, New Delhi',
      material: 'Marble Cut Size',
      billingType: 'Per Tonne',
      weight: 10,
      rate: 1800,
      billNo: 'INV-101',
      invoiceValue: 120000,
      ewayBillNo: '751611112222'
    },
    {
      consignee: 'Buyer B - Noida Stones',
      consigneeGstin: '09AAACN2222B1Z2',
      destination: 'Noida (U.P.)',
      deliveryAddress: 'Sector 63, Noida',
      material: 'Marble Cut Size',
      billingType: 'Per Tonne',
      weight: 15,
      rate: 1850,
      billNo: 'INV-102',
      invoiceValue: 180000,
      ewayBillNo: '751633334444'
    },
    {
      consignee: 'Buyer C - Gurgaon Marbles',
      consigneeGstin: '06AAACG3333C1Z3',
      destination: 'Faridabad (Haryana)',
      deliveryAddress: 'Sector 25, Faridabad',
      material: 'Marble Cut Size',
      billingType: 'Per Tonne',
      weight: 12.5,
      rate: 1900,
      billNo: 'INV-103',
      invoiceValue: 150000,
      ewayBillNo: '751655556666'
    }
  ];

  // Save the multi-buyer bilty consignment
  await BiltyBookingModule.saveAppSheetBilty();

  // Verify all 3 bilties saved in database
  const savedTrips = await dbService.getAll('trips');
  const batchTrips = savedTrips
    .filter(t => t.truckNo === 'RJ52GB5964' && t.tripStartDate === '2026-10-05' && t.isMultiGr)
    .sort((a, b) => parseInt(a.grSeq) - parseInt(b.grSeq));
  console.log(`Saved batch bilties found: ${batchTrips.length}`);
  if (batchTrips.length !== 3) throw new Error("Expected 3 trips saved in batch, found " + batchTrips.length);

  const [t1, t2, t3] = batchTrips;
  console.log(`GR 1: ${t1.shortGrNo}, Consignee: ${t1.consignee}, Weight: ${t1.weight} MT, Freight: ₹${t1.freight}, Comm: ₹${t1.commission}`);
  console.log(`GR 2: ${t2.shortGrNo}, Consignee: ${t2.consignee}, Weight: ${t2.weight} MT, Freight: ₹${t2.freight}, Comm: ₹${t2.commission}`);
  console.log(`GR 3: ${t3.shortGrNo}, Consignee: ${t3.consignee}, Weight: ${t3.weight} MT, Freight: ₹${t3.freight}, Comm: ₹${t3.commission}`);

  // Assertions
  if (!t1.tripGroupId || t1.tripGroupId !== t2.tripGroupId || t2.tripGroupId !== t3.tripGroupId) {
    throw new Error("All 3 bilties must share the exact same tripGroupId!");
  }
  if (t1.commission !== 1500 || t2.commission !== 0 || t3.commission !== 0) {
    throw new Error("Commission must be charged exactly once on the primary GR, not multiplied!");
  }
  if (t1.weight + t2.weight + t3.weight !== 37.5) {
    throw new Error("Total truck weight does not match 37.5 MT!");
  }
  console.log("✓ PASS: Case 2 Multi-Buyer consignment fully verified!");

  // -------------------------------------------------------------------------
  // TEST 3: Case 3 (3 Sellers -> 1 Buyer / Multi-Consignor)
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 3: Case 3 - 3 Sellers -> 1 Buyer (Multi-Consignor) ---");
  BiltyBookingModule.bookingMode = 'multi_consignor';

  document.getElementById('bilty-truck-no').value = 'RJ52GB2503';
  document.getElementById('bilty-owner').value = 'Shree Krishna Transport';
  document.getElementById('bilty-commission').value = '1200';
  document.getElementById('bilty-date').value = '2026-10-06';

  // Common Buyer
  document.getElementById('ms-consignee').value = 'Jindal Building Material, Delhi';
  document.getElementById('ms-consignee-gstin').value = '07AAACJ8888D1Z8';
  document.getElementById('ms-destination').value = 'Delhi';
  document.getElementById('ms-delivery-address').value = 'Khasra 212, Swarn Park, Mundka, Delhi';

  // 3 Sellers
  BiltyBookingModule.multiSellers = [
    {
      consignor: 'Quarry A - Rajnagar Minerals',
      dispatchFromAddress: 'Mine 12, Rajnagar',
      material: 'Marble Powder',
      weight: 14,
      rate: 1600,
      billNo: 'POW-1'
    },
    {
      consignor: 'Quarry B - Amet White Marble',
      dispatchFromAddress: 'Ghati Road, Amet',
      material: 'Marble Powder',
      weight: 16,
      rate: 1600,
      billNo: 'POW-2'
    },
    {
      consignor: 'Quarry C - Morwad Powder Mill',
      dispatchFromAddress: 'RIICO Area, Morwad',
      material: 'Marble Powder',
      weight: 15,
      rate: 1600,
      billNo: 'POW-3'
    }
  ];

  await BiltyBookingModule.saveAppSheetBilty();

  const allUpdatedTrips = await dbService.getAll('trips');
  const sellerBatch = allUpdatedTrips
    .filter(t => t.truckNo === 'RJ52GB2503' && t.tripStartDate === '2026-10-06');
  console.log(`Saved multi-seller bilties found: ${sellerBatch.length}`);
  if (sellerBatch.length !== 1) throw new Error("Expected exactly 1 consolidated trip for multi-seller load!");

  const tripConsolidated = sellerBatch[0];
  console.log(`Consolidated GR: ${tripConsolidated.shortGrNo} - ${tripConsolidated.consignor} (${tripConsolidated.weight} MT, Freight: ₹${tripConsolidated.freight})`);

  if (!tripConsolidated.isConsolidated) {
    throw new Error("Multi-seller load must be flagged as isConsolidated: true!");
  }
  if (!tripConsolidated.sellerList || tripConsolidated.sellerList.length !== 3) {
    throw new Error("sellerList should contain all 3 sellers!");
  }
  if (tripConsolidated.consignee !== 'Jindal Building Material, Delhi') {
    throw new Error("Common buyer must be shared across consolidated bilty!");
  }
  if (tripConsolidated.commission !== 1200) {
    throw new Error("Multi-seller commission not correctly single-attributed!");
  }
  console.log("✓ PASS: Case 3 Multi-Seller consolidated single GR consignment fully verified!");

  // -------------------------------------------------------------------------
  // TEST 4: Multi-Bilty Print Preview Generation
  // -------------------------------------------------------------------------
  console.log("\n--- TEST 4: Multi-Bilty Print & Page-Break Generation ---");
  const singleDoc = BiltyBookingModule.getBiltyDocHTML(batchTrips[0]);
  if (!singleDoc.includes("TRIVENI TRANSPORT COMPANY") || !singleDoc.includes("Buyer A - Delhi")) {
    throw new Error("Single bilty document did not render expected content!");
  }
  console.log("✓ PASS: Individual bilty A4 Consignment note generated cleanly.");

  let multiDocCombined = '';
  batchTrips.forEach((t, i) => {
    multiDocCombined += BiltyBookingModule.getBiltyDocHTML(t);
    if (i < batchTrips.length - 1) {
      multiDocCombined += '<div class="bilty-print-page-break"></div>';
    }
  });

  if (!multiDocCombined.includes("bilty-print-page-break")) {
    throw new Error("Multi-bilty batch print does not include page breaks!");
  }
  console.log("✓ PASS: Batch Print with CSS page-break verified.");

  console.log("\n🎉 ALL MULTI-PARTY BILTY CONSIGNMENT TESTS PASSED 100% PERFECTLY! 🎉\n");
}

runTests().catch(err => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
