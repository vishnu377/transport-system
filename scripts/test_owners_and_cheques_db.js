// Test DB Service with Truck Owners and Cheques datasets in Node environment
const fs = require('fs');
const path = require('path');

// Mock localStorage and window
const localStorageData = {};
global.localStorage = {
  getItem: (key) => localStorageData[key] || null,
  setItem: (key, val) => { localStorageData[key] = String(val); },
  removeItem: (key) => { delete localStorageData[key]; },
  clear: () => { Object.keys(localStorageData).forEach(k => delete localStorageData[k]); }
};

global.window = global;

// Load sample datasets
eval(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-cheques-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf8'));
const dbCode = fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8');
eval(dbCode + '\nglobal.dbService = dbService;');

async function runTests() {
  console.log("=== Testing Truck Owners & Cheques DB Service ===");

  // 1. Test Truck Owners
  const owners = await dbService.getAll('truckOwners');
  console.log(` Loaded Truck Owners: ${owners.length}`);
  if (owners.length === 0) throw new Error("No truck owners loaded!");
  
  const sampleOwner = owners[0];
  console.log(" Top Owner Sample:", {
    id: sampleOwner.id,
    name: sampleOwner.name,
    trucks: sampleOwner.trucks,
    dueAmount: sampleOwner.dueAmount,
    paidAmount: sampleOwner.paidAmount,
    totalTrips: sampleOwner.totalTrips
  });

  // 2. Test Cheques
  const cheques = await dbService.getAll('cheques');
  console.log(` Loaded Cheques: ${cheques.length}`);
  if (cheques.length === 0) throw new Error("No cheques loaded!");

  const pending = cheques.filter(c => c.status === 'Pending');
  const deposited = cheques.filter(c => c.status === 'Deposited');
  const cleared = cheques.filter(c => c.status === 'Cleared');
  const bounced = cheques.filter(c => c.status === 'Bounced');

  console.log(` Cheque Breakdown: Pending=${pending.length}, Deposited=${deposited.length}, Cleared=${cleared.length}, Bounced=${bounced.length}`);
  console.log(" Top Cleared Sample:", {
    chequeNo: cleared[0].chequeNo,
    bank: cleared[0].bankName,
    party: cleared[0].partyName,
    amount: cleared[0].amount,
    date: cleared[0].chequeDate
  });
  console.log(" Top Bounced Sample:", {
    chequeNo: bounced[0].chequeNo,
    bank: bounced[0].bankName,
    party: bounced[0].partyName,
    amount: bounced[0].amount,
    date: bounced[0].chequeDate
  });

  // 3. Test Owner Payment Recording
  const initialDue = sampleOwner.dueAmount;
  const initialPaid = sampleOwner.paidAmount;
  await dbService.recordOwnerPayment(sampleOwner.id, {
    amount: 5000,
    date: '2026-09-26',
    mode: 'RTGS',
    refNo: 'RTGS998877',
    remarks: 'Test owner settlement payment'
  });
  const updatedOwner = await dbService.getById('truckOwners', sampleOwner.id);
  console.log(` Owner Payment Test: Due ${initialDue} -> ${updatedOwner.dueAmount}, Paid ${initialPaid} -> ${updatedOwner.paidAmount}`);
  if (updatedOwner.dueAmount !== Math.max(0, initialDue - 5000)) throw new Error("Payment deduction mismatch!");

  // 4. Test Cheque Status Change (e.g. Deposit Pending Cheque)
  const pChq = pending[0];
  await dbService.update('cheques', pChq.id, { status: 'Deposited', depositDate: '2026-09-26' });
  const updatedChq = await dbService.getById('cheques', pChq.id);
  console.log(` Cheque Update Test: ${pChq.chequeNo} status is now ${updatedChq.status}`);
  if (updatedChq.status !== 'Deposited') throw new Error("Cheque update mismatch!");

  console.log(" ALL DB SERVICE TESTS PASSED 100%!");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
