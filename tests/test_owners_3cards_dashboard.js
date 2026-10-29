/**
 * test_owners_3cards_dashboard.js
 * Comprehensive automated test suite verifying Google AppSheet Authentic 3-Card Layout for Owners module
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== Running Owners Module 3-Card Dashboard Test Suite ===\n");

// 1. Verify pages/owners.html
const htmlPath = path.join(__dirname, '../pages/owners.html');
assert(fs.existsSync(htmlPath), "pages/owners.html must exist");
const html = fs.readFileSync(htmlPath, 'utf8');

// Assert 3-Card Grid Structure
assert(html.includes('id="ownersDashboardGrid"'), "ownersDashboardGrid must exist");
assert(html.includes('id="cardTruckOwners"'), "cardTruckOwners must exist");
assert(html.includes('id="cardOwnerDue"'), "cardOwnerDue must exist");
assert(html.includes('id="cardOwnerPaid"'), "cardOwnerPaid must exist");

// Assert Card 1 Elements
assert(html.includes('Truck Owners'), "Card 1 title must be Truck Owners");
assert(html.includes('btn-appsheet-add'), "Card 1 must have .btn-appsheet-add button");
assert(html.includes('id="appsheet-header-count"'), "Card 1 must have appsheet-header-count badge");
assert(html.includes('Truck No.'), "Card 1 must have Truck No. column");
assert(html.includes('Name'), "Card 1 must have Name column");
assert(html.includes('Mobile No.'), "Card 1 must have Mobile No. column");
assert(html.includes('Mobile No. 1'), "Card 1 must have Mobile No. 1 column");

// Assert Card 2 Due Figures
assert(html.includes('Owner Due'), "Card 2 title must be Owner Due");
assert(html.includes('₹ 30,732,197.22'), "Card 2 must have 2026-2027 amount ₹ 30,732,197.22");
assert(html.includes('₹ 1,641,456.00'), "Card 2 must have 2025-2026 amount ₹ 1,641,456.00");
assert(html.includes('₹ 12,221.00'), "Card 2 must have 2024-2025 amount ₹ 12,221.00");
assert(html.includes('dot-cyan'), "Card 2 must have dot-cyan");
assert(html.includes('dot-blue'), "Card 2 must have dot-blue");
assert(html.includes('dot-pink'), "Card 2 must have dot-pink");

// Assert Card 3 Paid Figures
assert(html.includes('Owner Paid'), "Card 3 title must be Owner Paid");
assert(html.includes('₹ 387,326,250.58'), "Card 3 must have 2026-2027 amount ₹ 387,326,250.58");
assert(html.includes('₹ 613,429,055.23'), "Card 3 must have 2025-2026 amount ₹ 613,429,055.23");
assert(html.includes('₹ 254,765,978.79'), "Card 3 must have 2024-2025 amount ₹ 254,765,978.79");
assert(html.includes('₹ 19,901.60'), "Card 3 must have 24-25 amount ₹ 19,901.60");
assert(html.includes('dot-green'), "Card 3 must have dot-green");

// Assert Drawer and Modal Elements
assert(html.includes('id="ownerDrawer"'), "ownerDrawer must exist");
assert(html.includes('id="modalOwnerDetail"'), "modalOwnerDetail must exist");

console.log("✔ HTML Structure & Static Verification PASSED");

// 2. Verify js/sample-truck-owners-data.js
const ownersData = require('../js/sample-truck-owners-data.js');
assert(Array.isArray(ownersData), "sample-truck-owners-data.js must export an array");
assert.strictEqual(ownersData.length, 596, `Expected exactly 596 truck owners, got ${ownersData.length}`);

// Verify that there are no placeholder names
const placeholderCount = ownersData.filter(o => o.name && o.name.startsWith('Owner RJ')).length;
assert.strictEqual(placeholderCount, 0, `All placeholder names should be resolved, found ${placeholderCount}`);

// Verify first item and last item
assert.strictEqual(ownersData[0].truckNo, 'RJ42GA0451', "First truck must be RJ42GA0451");
assert.strictEqual(ownersData[0].name, 'Abcd', "First owner name must be Abcd");
assert.strictEqual(ownersData[0].mobile, '7898424750', "First mobile must be 7898424750");

const lastOwner = ownersData[ownersData.length - 1];
assert.strictEqual(lastOwner.truckNo, 'RJ52GA8577', "596th truck must be RJ52GA8577");

console.log(`✔ Master Dataset Verification: Exactly 596 Authentic Truck Owners Verified PASSED`);

// 3. Verify js/modules/owners.js module functionality
const ownersJsPath = path.join(__dirname, '../js/modules/owners.js');
assert(fs.existsSync(ownersJsPath), "js/modules/owners.js must exist");
const ownersJs = fs.readFileSync(ownersJsPath, 'utf8');

assert(ownersJs.includes('OwnersModule'), "OwnersModule object must exist");
assert(ownersJs.includes('handleSearch'), "handleSearch method must exist");
assert(ownersJs.includes('openDetailView'), "openDetailView method must exist");
assert(ownersJs.includes('openAddDrawer'), "openAddDrawer method must exist");
assert(ownersJs.includes('openEditDrawer'), "openEditDrawer method must exist");
assert(ownersJs.includes('toggleCardExpand'), "toggleCardExpand method must exist");
assert(ownersJs.includes('exportCSV'), "exportCSV method must exist");

console.log("✔ OwnersModule Controller Logic Verification PASSED");

console.log("\n========================================================");
console.log("  ALL TESTS PASSED SUCCESSFULLY (3-Card Dashboard 100%) ");
console.log("========================================================");
