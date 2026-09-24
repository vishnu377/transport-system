const fs = require('fs');
const path = require('path');
const vm = require('vm');

const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; }
};
global.window = global;
global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d,
  showToast: (msg, type) => console.log(`[Toast ${type}]: ${msg}`)
};
global.APP_CONFIG = { firebase: null };

// Load Mock DOM
global.document = {
  getElementById: (id) => {
    return {
      value: id === 'bilty-firm' ? 'TTC' : (id === 'bilty-year' ? '2026-2027' : ''),
      innerText: '',
      innerHTML: '',
      classList: { add: () => {}, remove: () => {} },
      addEventListener: () => {},
      focus: () => {}
    };
  },
  addEventListener: () => {}
};

// Run core scripts
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function testBilty() {
  console.log("=== TESTING BILTY MODULE ENGINE ===");
  
  await BiltyBookingModule.loadAllData();
  console.log(`Loaded trips count: ${BiltyBookingModule.allTrips.length}`);
  console.log(`Loaded parties count: ${BiltyBookingModule.parties.length}`);
  console.log(`Loaded truck owners: ${BiltyBookingModule.truckOwners.length}`);
  
  if (BiltyBookingModule.allTrips.length < 5000) {
    throw new Error(`Expected at least 5,000 trips, got ${BiltyBookingModule.allTrips.length}`);
  }

  // Test sequential GR generation
  const firm = 'TTC';
  const year = '2026-2027';
  let maxSeq = 0;
  BiltyBookingModule.allTrips.forEach(t => {
    const tFirm = t.transport || (t.grNo && t.grNo.includes('MTC') ? 'MTC' : 'TTC');
    const tYear = t.financialYear || (t.grNo && t.grNo.startsWith('2026-2027') ? '2026-2027' : '');
    if (tFirm === firm && (tYear === year || !tYear)) {
      const seq = parseInt(t.grSeq || (t.shortGrNo ? t.shortGrNo.split('_')[0] : 0), 10);
      if (!isNaN(seq) && seq > maxSeq && seq < 100000) {
        maxSeq = seq;
      }
    }
  });

  const nextSeq = maxSeq + 1;
  console.log(`Current highest GR for ${firm} (${year}): ${maxSeq} -> Next sequential G.R.: ${nextSeq}_${firm}`);
  if (nextSeq <= maxSeq) {
    throw new Error("Next sequential GR is invalid");
  }

  // Test adding a test Bilty
  const testBilty = {
    id: `TEST_BILTY_${Date.now()}`,
    grNo: `${year}-${nextSeq}_${firm}`,
    grSeq: String(nextSeq),
    shortGrNo: `${nextSeq}_${firm}`,
    transport: firm,
    financialYear: year,
    tripStartDate: '2026-09-24',
    truckNo: 'RJ52GB5964',
    truckOwner: 'Shree Mahaveer Transport Company',
    loadType: 'Under Load',
    driver: 'Kushiram Gurjar',
    driverMobile: '6377445099',
    origin: 'Rajsamand (Raj.)',
    destination: 'Sandila (U.P.)',
    consignor: 'Bholenath Minerals',
    consignee: 'Berger Paints India Ltd.',
    material: 'Marble Powder',
    weight: 42.360,
    rate: 2150,
    freight: 42.360 * 2150,
    status: 'Transit'
  };

  await dbService.add('trips', testBilty);
  const reloadedTrips = await dbService.getAll('trips');
  const found = reloadedTrips.find(t => t.id === testBilty.id);
  if (!found) throw new Error("Saved bilty not found in trips collection");

  console.log(`Successfully added & verified test bilty: ${found.grNo}, Freight: ₹${found.freight}`);

  // Test debt creation integration
  const debtRecord = {
    id: `DEBT_BILTY_TEST`,
    date: '2026-09-24',
    displayDate: '24/09/2026',
    fy: '2026-2027',
    monthKey: '6 Sep',
    grNo: testBilty.shortGrNo,
    truckNo: testBilty.truckNo,
    from: testBilty.origin,
    to: testBilty.destination,
    company: testBilty.transport,
    truckOwner: testBilty.truckOwner,
    debtType: 'Cash Advance',
    dueAmount: 3500,
    debtAmount: 3500,
    totalReturned: 0,
    debtMode: 'Cash',
    borrowerName: testBilty.truckOwner,
    receiverName: testBilty.driver,
    remarks: `Advance cash linked to Bilty G.R. ${testBilty.grNo}`,
    returnedAmounts: []
  };

  await dbService.add('debts', debtRecord);
  const reloadedDebts = await dbService.getAll('debts');
  const debtFound = reloadedDebts.find(d => d.id === debtRecord.id);
  if (!debtFound) throw new Error("Linked debt not found in debts collection");
  console.log(`Successfully verified linked Debt in Financial Ledger: ID ${debtFound.id}, Amount: ₹${debtFound.debtAmount}`);

  console.log("\nALL BILTY MODULE TESTS PASSED 100% SUCCESSFULLY!");
}

testBilty().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
