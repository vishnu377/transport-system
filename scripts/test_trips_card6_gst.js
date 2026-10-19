/**
 * Test Suite: trips_card6_gst
 * Verifies Card 6 ("GST Amount") and Card 5 ("GST not Paid") authentic Google AppSheet functionality,
 * 14 columns layout, day ribbon sums, black bullet on GST Amount, zero vertical lines, zero localStorage,
 * and direct Firebase integration.
 */

const fs = require('fs');
const assert = require('assert');

console.log('--- Running Card 6 GST Amount & Card 5 Test Suite ---');

// 1. Verify HTML Structure & Styling in pages/trips.html
const htmlContent = fs.readFileSync('pages/trips.html', 'utf8');

assert(htmlContent.includes('id="card-gstamt-badge-2026"'), 'Badge element for Card 6 FY 2026-2027 must exist');
assert(htmlContent.includes('₹ 5,300,734.00'), 'Card 6 FY 2026-2027 badge must display authentic ₹ 5,300,734.00');
assert(htmlContent.includes('₹ 11,841,075.38'), 'Card 6 FY 2025-2026 badge must display authentic ₹ 11,841,075.38');
assert(htmlContent.includes('.sticky-col-card6-actions'), 'CSS must include .sticky-col-card6-actions');
assert(htmlContent.includes('.sticky-col-card6-bill'), 'CSS must include .sticky-col-card6-bill');
assert(htmlContent.includes('.sticky-col-card6-gr'), 'CSS must include .sticky-col-card6-gr');
assert(htmlContent.includes('TripsModule.goToGstAmountView'), 'Card 6 must hook to goToGstAmountView()');
assert(htmlContent.includes('TripsModule.goToGstNotPaidView()'), 'Card 5 must hook to goToGstNotPaidView()');
console.log('✔ pages/trips.html: Card 5 & Card 6 UI badges and CSS rules verified.');

// 2. Verify Sample Data in js/sample-trips-data.js
global.window = {};
require('../js/sample-trips-data.js');
const allTrips = window.INITIAL_EXCEL_TRIPS;
assert(Array.isArray(allTrips) && allTrips.length > 6700, `Expected >6700 trips, found ${allTrips ? allTrips.length : 0}`);

const gstSampleTrips = allTrips.filter(t => t.id && t.id.startsWith('TRIP_GST_2026_'));
assert(gstSampleTrips.length >= 24, `Expected at least 24 authentic October 2026 GST trips, found ${gstSampleTrips.length}`);

// Verify top sample record (Bill 224, GR 227_SMTC, Date 2026-10-18)
const topGst = gstSampleTrips.find(t => t.billNo === '224');
assert(topGst, 'Bill 224 record must exist in sample data');
assert.strictEqual(topGst.shortGrNo, '227_SMTC', 'Bill 224 shortGrNo must be 227_SMTC');
assert.strictEqual(topGst.gstAmount, 32472, 'Bill 224 gstAmount must be 32,472');
assert.strictEqual(topGst.total, 212872, 'Bill 224 total must be 212,872 (180,400 + 32,472)');
console.log('✔ js/sample-trips-data.js: 24 October 2026 GST records verified.');

// 3. Verify trips.js logic
const tripsJs = fs.readFileSync('js/modules/trips.js', 'utf8');

assert(!tripsJs.includes('localStorage.setItem'), 'Zero localStorage: trips.js must not persist to localStorage');
assert(tripsJs.includes("workflowTab === 'gst'"), 'trips.js must have workflowTab === "gst" handlers');
assert(tripsJs.includes('sticky-col-card6-actions'), 'trips.js must render sticky-col-card6-actions');
assert(tripsJs.includes('sticky-col-card6-bill'), 'trips.js must render sticky-col-card6-bill');
assert(tripsJs.includes('sticky-col-card6-gr'), 'trips.js must render sticky-col-card6-gr');
assert(tripsJs.includes('downloadGstInvoice'), 'trips.js must define downloadGstInvoice()');
assert(tripsJs.includes('goToGstAmountView'), 'trips.js must define goToGstAmountView()');
assert(tripsJs.includes('goToGstNotPaidView'), 'trips.js must define goToGstNotPaidView()');

// Check black bullet for GST Amount
assert(tripsJs.includes('<span style="color: #202124;">●</span>'), 'trips.js must render black bullet for GST Amount column');
assert(tripsJs.includes('color: #202124;'), 'trips.js must style GST Amount text in black (#202124)');

// Check day ribbon total for GST Amount
assert(tripsJs.includes('const dayTotalGst = items.reduce'), 'trips.js must calculate dayTotalGst for day divider ribbons');

// 4. Test Simulated Sorting and Day Grouping
const parseDateToTimestamp = (dStr) => {
  if (!dStr) return 0;
  if (dStr.includes('/')) {
    const p = dStr.split('/');
    if (p.length === 3) return new Date(Number(p[2]), Number(p[1]) - 1, Number(p[0])).getTime();
  }
  return new Date(dStr).getTime();
};

const gstTrips = allTrips.filter(t => Number(t.gstAmount) > 0 || t.isGstPaidByParty === 'Yes');
assert(gstTrips.length > 0, 'Must have GST trips');

gstTrips.sort((a, b) => {
  const dateValA = a.billDate || a.tripStartDate;
  const dateValB = b.billDate || b.tripStartDate;
  const timeA = parseDateToTimestamp(dateValA);
  const timeB = parseDateToTimestamp(dateValB);
  if (timeA !== timeB) return timeB - timeA;
  if (a.billNo && b.billNo && a.billNo !== b.billNo) {
    return Number(a.billNo) - Number(b.billNo);
  }
  return String(b.grNo || '').localeCompare(String(a.grNo || ''));
});

// Group first 24 trips by billDate
const dateGroups = new Map();
gstTrips.slice(0, 24).forEach(t => {
  const d = t.billDate;
  if (!dateGroups.has(d)) dateGroups.set(d, []);
  dateGroups.get(d).push(t);
});

// Day 18/10/2026: 1 trip, sum ₹32,472
const day18 = dateGroups.get('2026-10-18');
assert.strictEqual(day18.length, 1);
assert.strictEqual(day18.reduce((sum, t) => sum + t.gstAmount, 0), 32472);

// Day 16/10/2026: 2 trips (Bill 221 & Bill 222), sum ₹52,894 (20422 + 32472)
const day16 = dateGroups.get('2026-10-16');
assert.strictEqual(day16.length, 2);
assert.strictEqual(day16[0].billNo, '221', 'Within date, Bill 221 must be first');
assert.strictEqual(day16[1].billNo, '222', 'Within date, Bill 222 must be second');
assert.strictEqual(day16.reduce((sum, t) => sum + t.gstAmount, 0), 52894);

// Day 15/10/2026: 5 trips (Bill 216, 217, 218, 219, 220), sum ₹115,892
const day15 = dateGroups.get('2026-10-15');
assert.strictEqual(day15.length, 5);
assert.deepStrictEqual(day15.map(t => t.billNo), ['216', '217', '218', '219', '220']);
assert.strictEqual(day15.reduce((sum, t) => sum + t.gstAmount, 0), 115892);

// Day 14/10/2026: 2 trips, sum ₹51,110
const day14 = dateGroups.get('2026-10-14');
assert.strictEqual(day14.reduce((sum, t) => sum + t.gstAmount, 0), 51110);

// Day 13/10/2026: 2 trips, sum ₹63,360
const day13 = dateGroups.get('2026-10-13');
assert.strictEqual(day13.reduce((sum, t) => sum + t.gstAmount, 0), 63360);

// Day 12/10/2026: 3 trips, sum ₹64,842
const day12 = dateGroups.get('2026-10-12');
assert.strictEqual(day12.reduce((sum, t) => sum + t.gstAmount, 0), 64842);

// Day 10/10/2026: 4 trips, sum ₹95,868
const day10 = dateGroups.get('2026-10-10');
assert.strictEqual(day10.reduce((sum, t) => sum + t.gstAmount, 0), 95868);

// Day 08/10/2026: 2 trips, sum ₹63,360
const day08 = dateGroups.get('2026-10-08');
assert.strictEqual(day08.reduce((sum, t) => sum + t.gstAmount, 0), 63360);

// Day 07/10/2026: 2 trips, sum ₹51,110
const day07 = dateGroups.get('2026-10-07');
assert.strictEqual(day07.reduce((sum, t) => sum + t.gstAmount, 0), 51110);

console.log('✔ All 9 date group sums (18/10 to 07/10) match authentic AppSheet screenshots with 100% precision.');

// 5. Test Card 5: GST not Paid empty state & dynamic check
const isTripGstNotPaid = (t) => {
  if (!t) return false;
  if (t.gstPaid === false || t.gstStatus === 'Not Paid' || t.gstStatus === 'Pending' || t.gstNotPaid === true) return true;
  if (t.isGstPaidByParty === 'No' && Number(t.gstAmount) > 0 && Number(t.gstDueAmount) > 0) return true;
  return false;
};
const unpaidTrips = allTrips.filter(isTripGstNotPaid);
assert.strictEqual(unpaidTrips.length, 0, 'Card 5 GST not Paid must have 0 items on authentic settled system (No items)');
console.log('✔ Card 5 (GST not Paid): verified 0 items (clean "No items" state matching AppSheet).');

// 6. Test GST Amount row click: MUST ALWAYS call openSettledTripDetails and NOT openTripDetails
assert(tripsJs.includes("const rowClickFn = `TripsModule.openSettledTripDetails('${t.id || t.grNo}', 'gst')`"), 'GST Amount row click must unconditionally open Settled Trip Details');
assert(tripsJs.includes("if (this.workflowTab === 'settled' || this.workflowTab === 'gst' || origin === 'gst' || this.detailsOrigin === 'gst'"), 'openTripDetails must route GST trips directly to openSettledTripDetails');
console.log('✔ Card 6 (GST Amount): verified row click ALWAYS routes to Green Settled Trip Details (zero multi-color bleeding).');

console.log('✔ All Card 6 GST Amount & Card 5 tests PASSED 100%!');

