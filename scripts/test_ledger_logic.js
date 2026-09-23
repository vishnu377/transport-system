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
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d
};
global.APP_CONFIG = { firebase: null };

vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));

async function test() {
  console.log("=== TESTING LEDGER ENGINE ===");
  const allDebts = await dbService.getAll('debts');
  console.log(`Loaded debts count: ${allDebts.length}`);

  if (allDebts.length !== 650) {
    throw new Error(`Expected 650 debts, got ${allDebts.length}`);
  }

  // FY Due calculations (including credit adjustment entries)
  const fyTotals = {};
  let grandTotal = 0;
  allDebts.forEach(d => {
    fyTotals[d.fy] = (fyTotals[d.fy] || 0) + Number(d.dueAmount || 0);
    grandTotal += Number(d.dueAmount || 0);
  });

  console.log("FY Due Totals:", fyTotals);
  console.log("Grand Total Due:", grandTotal);

  if (grandTotal !== 2230315) {
    throw new Error(`Expected grand total Rs. 2,230,315.00, got ${grandTotal}`);
  }

  // Test Return payment
  const firstDebt = allDebts[0];
  console.log(`\nTesting return payment on: ${firstDebt.id}, initial debt: ${firstDebt.debtAmount}, due: ${firstDebt.dueAmount}`);
  
  const payment = {
    date: '2026-09-24',
    amount: 200,
    mode: 'Cash',
    receivedBy: 'Hardan Ji',
    remarks: 'Partial recovery'
  };

  const updated = await dbService.recordReturnedAmount(firstDebt.id, payment);
  console.log(`After payment of 200: dueAmount is now ${updated.dueAmount}, totalReturned: ${updated.totalReturned}`);
  
  if (updated.dueAmount !== firstDebt.debtAmount - 200) {
    throw new Error(`Expected dueAmount ${firstDebt.debtAmount - 200}, got ${updated.dueAmount}`);
  }

  if (updated.returnedAmounts.length !== 1) {
    throw new Error(`Expected 1 return record, got ${updated.returnedAmounts.length}`);
  }

  // Test GetAll after payment
  const reloaded = await dbService.getAll('debts');
  const reloadedFirst = reloaded.find(d => d.id === firstDebt.id);
  if (reloadedFirst.dueAmount !== firstDebt.debtAmount - 200) {
    throw new Error(`Persistence check failed: expected ${firstDebt.debtAmount - 200}, got ${reloadedFirst.dueAmount}`);
  }

  console.log("\nAll Ledger Engine tests PASSED successfully!");
}

test().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
