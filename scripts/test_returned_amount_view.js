const fs = require('fs');
const path = require('path');

console.log('Testing Returned Amount Implementation...');

// 1. Check syntax of js/modules/ledger.js
try {
  const ledgerCode = fs.readFileSync(path.join(__dirname, '../js/modules/ledger.js'), 'utf8');
  // Simple syntax validation via new Function or regex
  new Function('window', 'document', 'dbService', ledgerCode + '; return window.LedgerModule;');
  console.log('PASS: js/modules/ledger.js syntax is valid.');
} catch (err) {
  console.error('FAIL: js/modules/ledger.js syntax error:', err.message);
  process.exit(1);
}

// 2. Check syntax and contents of js/sample-returned-amounts-data.js
try {
  const sampleDataCode = fs.readFileSync(path.join(__dirname, '../js/sample-returned-amounts-data.js'), 'utf8');
  const mockWindow = {};
  new Function('window', sampleDataCode)(mockWindow);
  const data = mockWindow.SAMPLE_RETURNED_AMOUNTS_DATA;
  console.log(`PASS: Sample data loaded successfully with ${data.length} records.`);

  // Calculate totals
  let grandTotal = 0;
  const fyTotals = {};
  data.forEach(r => {
    grandTotal += r.returnedAmount;
    fyTotals[r.fy] = (fyTotals[r.fy] || 0) + r.returnedAmount;
  });

  console.log(`Grand Total: Rs. ${grandTotal.toLocaleString('en-IN')}`);
  for (const [fy, tot] of Object.entries(fyTotals)) {
    console.log(`  FY ${fy}: Rs. ${tot.toLocaleString('en-IN')}`);
  }

  // Verify match with authentic AppSheet values
  if (fyTotals['2026-2027'] !== 12960180) {
    throw new Error(`FY 2026-2027 mismatch: expected 12960180, got ${fyTotals['2026-2027']}`);
  }
  if (fyTotals['2025-2026'] !== 29619314) {
    throw new Error(`FY 2025-2026 mismatch: expected 29619314, got ${fyTotals['2025-2026']}`);
  }
  if (fyTotals['2024-2025'] !== 16291034) {
    throw new Error(`FY 2024-2025 mismatch: expected 16291034, got ${fyTotals['2024-2025']}`);
  }
  if (grandTotal !== 58870528) {
    throw new Error(`Grand total mismatch: expected 58870528, got ${grandTotal}`);
  }
  console.log('PASS: All Financial Year totals match AppSheet screenshots to the exact rupee!');

  // Check specific test record RET_26_1008_03 (matches WhatsApp Photo)
  const testRec = data.find(r => r.id === 'RET_26_1008_03');
  if (!testRec) {
    throw new Error('RET_26_1008_03 not found in sample dataset');
  }
  if (testRec.truckNo !== 'RJ32GC0997' || testRec.debtType !== 'Commission' || testRec.returnedAmount !== 2000) {
    throw new Error('RET_26_1008_03 fields do not match WhatsApp photo');
  }
  console.log('PASS: WhatsApp photo record RET_26_1008_03 verified correctly!');

  // Check date grouping for 08/10/2026
  const oct8Records = data.filter(r => r.displayReturnDate === '08/10/2026');
  const oct8Sum = oct8Records.reduce((sum, r) => sum + r.returnedAmount, 0);
  console.log(`08/10/2026 Total: Rs. ${oct8Sum.toLocaleString('en-IN')}`);
  if (oct8Sum !== 66600) {
    throw new Error(`08/10/2026 sum mismatch: expected 66600, got ${oct8Sum}`);
  }
  console.log('PASS: Date grouping total for 08/10/2026 matches Rs. 66,600.00 exactly!');

} catch (err) {
  console.error('FAIL: Sample data verification failed:', err.message);
  process.exit(1);
}

// 3. Check dbService returnedAmounts integration
try {
  const dbCode = fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8');
  if (!dbCode.includes('getAllReturnedAmounts') || !dbCode.includes('returnedAmounts')) {
    throw new Error('dbService missing returnedAmounts handler');
  }
  console.log('PASS: dbService includes returnedAmounts collection handling.');
} catch (err) {
  console.error('FAIL: dbService check failed:', err.message);
  process.exit(1);
}

console.log('\nALL RETURNED AMOUNT TESTS PASSED SUCCESSFULLY!');
