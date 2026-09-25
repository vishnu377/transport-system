const fs = require('fs');
const content = fs.readFileSync('C:/Users/HP/.gemini/antigravity/scratch/transport-system/js/sample-trips-data.js', 'utf8');
const window = {};
eval(content);
const trips = window.INITIAL_EXCEL_TRIPS;
console.log('Total trips loaded:', trips.length);

['All', '2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
  const fyTrips = fy === 'All' ? trips : trips.filter(t => t.financialYear === fy);
  const totalFreight = fyTrips.reduce((s, t) => s + (Number(t.freight) || 0), 0);
  const gstAmt = fyTrips.reduce((s, t) => s + (Number(t.gstAmount) || 0), 0);
  const gstCnt = fyTrips.filter(t => Number(t.gstAmount) > 0 || t.isGstPaidByParty === 'Yes').length;
  const openTrips = fyTrips.filter(t => (Number(t.partyDue) > 0 || Number(t.ownerDue) > 0) && t.status !== 'Settled');
  const openDue = openTrips.reduce((s, t) => s + (Number(t.partyDue) || 0), 0);
  const settledTrips = fyTrips.filter(t => t.status === 'Settled' || (Number(t.partyDue) <= 0 && Number(t.ownerDue) <= 0));
  const settledFreight = settledTrips.reduce((s, t) => s + (Number(t.freight) || 0), 0);

  console.log('\n================ FY: ' + fy + ' ================');
  console.log('Trips count:', fyTrips.length);
  console.log('Total Freight: ₹' + totalFreight.toLocaleString('en-IN'));
  console.log('Open count:', openTrips.length, '| Open Due: ₹' + openDue.toLocaleString('en-IN'));
  console.log('Settled count:', settledTrips.length, '| Settled Freight: ₹' + settledFreight.toLocaleString('en-IN'));
  console.log('GST Amt: ₹' + gstAmt.toLocaleString('en-IN'), '| GST Count:', gstCnt);
});
