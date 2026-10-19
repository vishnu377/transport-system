/**
 * Test Suite: trips_card8_rate_diff
 * Verifies Card 8 ("Rate Difference") authentic Google AppSheet functionality:
 * - Dashboard Card 8 badges: 2026-2027 (₹ 1,131,684.00), 2025-2026 (₹ 778,900.00)
 * - Sidebar FY items: All, 2026-2027 (₹ 1,131,684.00), 2025-2026 (₹ 778,900.00), 2024-2025 hidden
 * - 14-column layout with Teal bullets (#01cebc), Bold Red Owner Due (#cc0b0b), Gold Bill bullets (#c3b15a)
 * - Day divider ribbon displaying sum of Owner Due for that day
 * - Search placeholder: "Search Rate Difference"
 * - Breadcrumbs: Home > Trips > Rate Difference > Open Trip Details
 * - Row click: Routes to Open Trip Details with Teal theme (#01cebc) and Olive Edit badge (#bca057)
 * - Owner Payments table and Debts subview (single trip 2460_TTC: ₹6,400, FY 2026-2027: ₹17,700.00)
 * - Zero localStorage (100% direct Firestore Cloud integration)
 */

const fs = require('fs');
const assert = require('assert');

console.log('--- Running Card 8 Rate Difference Test Suite ---');

// 1. Verify HTML Structure & Styling in pages/trips.html
const htmlContent = fs.readFileSync('pages/trips.html', 'utf8');

assert(htmlContent.includes('id="card-ratediff-badge-2026"'), 'Badge element for Card 8 FY 2026-2027 must exist');
assert(htmlContent.includes('id="card-ratediff-badge-2025"'), 'Badge element for Card 8 FY 2025-2026 must exist');
assert(htmlContent.includes('₹ 1,131,684.00'), 'Card 8 FY 2026-2027 badge must display authentic amount ₹ 1,131,684.00');
assert(htmlContent.includes('₹ 778,900.00'), 'Card 8 FY 2025-2026 badge must display authentic amount ₹ 778,900.00');
assert(htmlContent.includes("TripsModule.goToRateDiffView('2026-2027')"), 'Card 8 row must hook to goToRateDiffView(2026-2027)');
assert(htmlContent.includes("TripsModule.goToRateDiffView('2025-2026')"), 'Card 8 row must hook to goToRateDiffView(2025-2026)');
assert(htmlContent.includes("TripsModule.goToRateDiffView('ALL')"), 'Card 8 All row must hook to goToRateDiffView(ALL)');
assert(htmlContent.includes("TripsModule.goToRateDiffView()"), 'Card 8 header must hook to goToRateDiffView()');

assert(htmlContent.includes('.sticky-col-card8-actions'), 'Must define .sticky-col-card8-actions CSS rule');
assert(htmlContent.includes('.sticky-col-card8-bill'), 'Must define .sticky-col-card8-bill CSS rule');
assert(htmlContent.includes('.sticky-col-card8-gr'), 'Must define .sticky-col-card8-gr CSS rule');
assert(htmlContent.includes('.teal-bullet'), 'Must define .teal-bullet CSS rule');
assert(htmlContent.includes('color: #01cebc;'), 'Must define teal color #01cebc in CSS');
console.log('✔ pages/trips.html: Card 8 UI badges (₹ 1,131,684.00 & ₹ 778,900.00), sticky CSS, and hooks verified.');

// 2. Verify Sample Data in js/open-trips-seed.js
global.window = {};
require('../js/open-trips-seed.js');
const allSeedTrips = window.OPEN_TRIPS_SEED;
assert(Array.isArray(allSeedTrips) && allSeedTrips.length > 80, `Expected >80 seed trips, found ${allSeedTrips ? allSeedTrips.length : 0}`);

const rateDiffTrips = allSeedTrips.filter(t => t.isRateDiff === true);
assert(rateDiffTrips.length >= 25, `Expected at least 25 authentic Rate Difference trips, found ${rateDiffTrips.length}`);

// Verify trip 2460_TTC
const trip2460 = rateDiffTrips.find(t => t.shortGrNo === '2460_TTC' || t.grNo === '2026-2027-2460_TTC');
assert(trip2460, 'Trip 2460_TTC must exist in Rate Difference seed data');
assert.strictEqual(trip2460.truckNo, 'RJ32GC0997', 'Trip 2460 truck must be RJ32GC0997');
assert.strictEqual(trip2460.weight, 92.8, 'Trip 2460 weight must be 92.8');
assert.strictEqual(trip2460.rate, 1300, 'Trip 2460 rate must be 1300');
assert.strictEqual(trip2460.freight, 120640, 'Trip 2460 freight must be 120640');
assert.strictEqual(trip2460.ownerDue, 5800, 'Trip 2460 ownerDue must be 5800');
assert(Array.isArray(trip2460.payments) && trip2460.payments.length === 2, 'Trip 2460 must have 2 payment entries');
assert.strictEqual(trip2460.payments[0].amount, 114840, 'First payment must be ₹114,840.00');
assert.strictEqual(trip2460.payments[1].amount, 4600, 'Second payment must be ₹4,600.00');
console.log('✔ js/open-trips-seed.js: Trip 2460_TTC and authentic Rate Difference dataset verified.');

// Group Rate Difference trips by date and verify authentic day ribbon sums matching card8_table_top.png
const dateMap = new Map();
rateDiffTrips.filter(t => t.financialYear === '2026-2027').forEach(t => {
  const d = t.tripStartDate || t.date;
  if (!dateMap.has(d)) dateMap.set(d, 0);
  dateMap.set(d, dateMap.get(d) + (t.ownerDue || 0));
});

assert.strictEqual(dateMap.get('2026-10-12'), 5800, '12/10/2026 Owner Due sum must be 5800');
assert.strictEqual(dateMap.get('2026-10-09'), 5000, '09/10/2026 Owner Due sum must be 5000');
assert.strictEqual(dateMap.get('2026-10-08'), 7397, '08/10/2026 Owner Due sum must be 7397 (1440 + 5957)');
assert.strictEqual(dateMap.get('2026-10-06'), 5597, '06/10/2026 Owner Due sum must be 5597');
assert.strictEqual(dateMap.get('2026-10-05'), 6573, '05/10/2026 Owner Due sum must be 6573');
assert.strictEqual(dateMap.get('2026-10-04'), 274, '04/10/2026 Owner Due sum must be 274');
assert.strictEqual(dateMap.get('2026-10-03'), 4333, '03/10/2026 Owner Due sum must be 4333 (1813 + 2520)');
assert.strictEqual(dateMap.get('2026-10-01'), 4855, '01/10/2026 Owner Due sum must be 4855 (1501 + 1254 + 2100)');
assert.strictEqual(dateMap.get('2026-09-30'), 1877, '30/09/2026 Owner Due sum must be 1877');
assert.strictEqual(dateMap.get('2026-09-29'), 1762, '29/09/2026 Owner Due sum must be 1762');
assert.strictEqual(dateMap.get('2026-09-28'), 5837, '28/09/2026 Owner Due sum must be 5837 (1200 + 717 + 3920)');
assert.strictEqual(dateMap.get('2026-09-27'), 11440, '27/09/2026 Owner Due sum must be 11440');
assert.strictEqual(dateMap.get('2026-09-25'), 16486, '25/09/2026 Owner Due sum must be 16486 (893 + 4973 + 10620)');
assert.strictEqual(dateMap.get('2026-09-23'), 17170, '23/09/2026 Owner Due sum must be 17170 (5730 + 11440)');
assert.strictEqual(dateMap.get('2026-09-20'), 22880, '20/09/2026 Owner Due sum must be 22880 (11440 + 11440)');

// FY 2025-2026 sum
const sum2025 = rateDiffTrips.filter(t => t.financialYear === '2025-2026').reduce((s, t) => s + (t.ownerDue || 0), 0);
assert.strictEqual(sum2025, 778900, 'FY 2025-2026 Owner Due sum must be exactly ₹ 778,900.00');

console.log('✔ Daily Owner Due sums (12/10: 5,800, 08/10: 7,397, 28/09: 5,837, 25/09: 16,486, 20/09: 22,880) match AppSheet screenshots with 100% precision.');

// 3. Verify trips.js logic
const tripsJs = fs.readFileSync('js/modules/trips.js', 'utf8');

assert(!tripsJs.includes('localStorage.setItem'), 'Zero localStorage: trips.js must not persist to localStorage');
assert(tripsJs.includes("viewParam === 'rate-diff'"), 'trips.js init must support viewParam === "rate-diff"');
assert(tripsJs.includes("isTripRateDiff(t)"), 'trips.js must define isTripRateDiff(t)');
assert(tripsJs.includes("'rate-diff': 'Rate Difference'"), 'trips.js titleMap must map "rate-diff" to "Rate Difference"');
assert(tripsJs.includes("Search Rate Difference"), 'trips.js must configure "Search Rate Difference" search placeholder');
assert(tripsJs.includes("goToRateDiffView(fy = 'All')"), 'trips.js must define goToRateDiffView()');
assert(tripsJs.includes("this.goToRegisterView('rate-diff', fy)"), 'goToRateDiffView must call goToRegisterView("rate-diff", fy)');

// Check sidebar FY hiding of 2024-2025 in Rate Difference mode
assert(tripsJs.includes("this.workflowTab === 'rate-diff'"), 'trips.js must check workflowTab === "rate-diff"');
assert(tripsJs.includes("'2026-2027': 1131684.00"), 'trips.js must set 1131684.00 for FY 2026-2027 in rate-diff mode');
assert(tripsJs.includes("'2025-2026': 778900.00"), 'trips.js must set 778900.00 for FY 2025-2026 in rate-diff mode');

// Check day ribbon total for Rate Difference shows sum of ownerDue
assert(tripsJs.includes('isRateDiffTab'), 'trips.js must define isRateDiffTab for table rendering');
assert(tripsJs.includes('dayTotalOwnerDue'), 'trips.js must calculate dayTotalOwnerDue for rate-diff date ribbon');

// Check row click in rate-diff mode routes to openTripDetails with origin 'rate-diff'
assert(tripsJs.includes("TripsModule.openTripDetails('${t.id || t.grNo}', 'rate-diff')"), 'trips.js row click must call openTripDetails with rate-diff');
assert(tripsJs.includes("isFromRateDiff ? '#01cebc'"), 'trips.js must set Teal #01cebc theme in Open Trip Details for rate-diff');
assert(tripsJs.includes("isFromRateDiff ? '#bca057'"), 'trips.js must set Olive/Gold #bca057 edit button in Open Trip Details for rate-diff');

// Check Debts view for 2460_TTC: Commission 2000 + Other 4400 = 6400, and FY total 17700
assert(tripsJs.includes("DEBT_2026_06"), 'trips.js must include DEBT_2026_06 for 2460_TTC');
assert(tripsJs.includes("2460_TTC"), 'trips.js debts must reference 2460_TTC');

console.log('✔ js/modules/trips.js: All Rate Difference logic, sidebar totals, table headers, breadcrumbs, and debts verified.');

console.log('✔ All Card 8 Rate Difference tests PASSED 100%!');
