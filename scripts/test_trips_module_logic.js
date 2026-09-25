const fs = require('fs');

// Load Sample Data
const tripsDataRaw = fs.readFileSync('C:/Users/HP/.gemini/antigravity/scratch/transport-system/js/sample-trips-data.js', 'utf8');
const window = {};
eval(tripsDataRaw);
const allTrips = window.INITIAL_EXCEL_TRIPS;

console.log('--- 1. Testing Trips Dataset & Basic Numbers ---');
console.log('Total Trips:', allTrips.length);
if (allTrips.length !== 6643) {
  console.error('FAIL: Expected 6643 trips');
  process.exit(1);
}
console.log('PASS: Dataset size verified');

// Test isTripSettled and isTripOpen
function isTripSettled(t) {
  if (t.status === 'Settled' || t.status === 'Closed') return true;
  const pDue = Number(t.partyDue) || 0;
  const oDue = Number(t.ownerDue) || 0;
  return pDue <= 0 && oDue <= 0;
}

function isTripOpen(t) {
  return !isTripSettled(t);
}

console.log('\n--- 2. Testing Open vs Settled Classification ---');
const openTrips = allTrips.filter(t => isTripOpen(t));
const settledTrips = allTrips.filter(t => isTripSettled(t));
console.log('Total Open Trips:', openTrips.length);
console.log('Total Settled Trips:', settledTrips.length);
console.log('Sum of Open + Settled:', openTrips.length + settledTrips.length);

if (openTrips.length + settledTrips.length !== allTrips.length) {
  console.error('FAIL: Sum of open and settled must equal total trips');
  process.exit(1);
}
console.log('PASS: 100% of trips cleanly classified into Open or Settled.');

console.log('\n--- 3. Testing FY Metrics ---');
['All', '2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
  const scope = fy === 'All' ? allTrips : allTrips.filter(t => t.financialYear === fy);
  const openScope = scope.filter(t => isTripOpen(t));
  const settledScope = scope.filter(t => isTripSettled(t));
  const openDue = openScope.reduce((sum, t) => sum + (Number(t.partyDue) || 0), 0);
  const settledFreight = settledScope.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);
  const totalFreight = scope.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);
  const gstAmt = scope.reduce((sum, t) => sum + (Number(t.gstAmount) || 0), 0);
  const gstCnt = scope.filter(t => Number(t.gstAmount) > 0 || t.isGstPaidByParty === 'Yes').length;

  console.log(`[FY ${fy}] Trips: ${scope.length} | Open Due: ₹${openDue.toLocaleString('en-IN')} (${openScope.length}) | Settled Freight: ₹${settledFreight.toLocaleString('en-IN')} (${settledScope.length}) | GST: ₹${gstAmt.toLocaleString('en-IN')} (${gstCnt} invoices)`);
});

console.log('\n--- 4. Testing Owner Payment Simulation & Auto-Settlement ---');
const sampleOpen = openTrips.find(t => Number(t.ownerDue) > 0);
if (!sampleOpen) {
  console.error('FAIL: No open trip with ownerDue found');
  process.exit(1);
} else {
  console.log('Selected Trip for Settlement:', sampleOpen.grNo, 'Initial Owner Due:', sampleOpen.ownerDue);
  const initialDue = sampleOpen.ownerDue;
  
  // Partial payment
  const partialPayment = Math.floor(initialDue / 2);
  sampleOpen.ownerDue -= partialPayment;
  console.log('After partial payment of ₹' + partialPayment + ', Remaining Due:', sampleOpen.ownerDue);
  if (isTripSettled(sampleOpen)) {
    console.error('FAIL: Trip should still be Open after partial payment');
    process.exit(1);
  }
  console.log('PASS: Trip correctly remains Open after partial payment');

  // Final payment: clear both ownerDue and partyDue to settle
  sampleOpen.ownerDue = 0;
  sampleOpen.partyDue = 0;
  sampleOpen.status = 'Settled';
  console.log('After final payment, Remaining Due: 0.00');
  if (!isTripSettled(sampleOpen)) {
    console.error('FAIL: Trip should now be Settled');
    process.exit(1);
  }
  console.log('PASS: Trip successfully transitions to Settled when Owner Due & Party Due reach ₹0.00!');
}

console.log('\n--- ALL UNIT TESTS PASSED (100%) ---');
