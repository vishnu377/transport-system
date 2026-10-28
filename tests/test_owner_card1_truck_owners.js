/**
 * test_owner_card1_truck_owners.js
 * Automated test suite verifying Card 1 (Truck Owners) against all 4 screenshots and user requirements:
 * 1. Exactly 596 Authentic Truck Owners (Badge: 'Number 596')
 * 2. Bottom Pagination Bar (Rows select, prev/next, page info)
 * 3. Authentic AppSheet + Add and Save Buttons
 * 4. Dedicated Details View & Slide Drawer
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("==================================================================");
console.log("   RUNNING CARD 1 (TRUCK OWNERS) 596 & PAGINATION TEST SUITE      ");
console.log("==================================================================\n");

// 1. Verify Dataset
const ownersData = require('../js/sample-truck-owners-data.js');
assert.strictEqual(ownersData.length, 596, `Expected exactly 596 authentic truck owners, found ${ownersData.length}`);

const firstOwner = ownersData[0];
assert.strictEqual(firstOwner.truckNo, 'RJ42GA0451', 'First truck must be RJ42GA0451');
assert.strictEqual(firstOwner.name, 'Abcd', 'First owner name must be Abcd');
assert.strictEqual(firstOwner.mobile, '7898424750', 'First mobile must be 7898424750');

const lastOwner = ownersData[ownersData.length - 1];
assert.strictEqual(lastOwner.truckNo, 'RJ52GA8577', '596th truck must be RJ52GA8577');
assert.strictEqual(lastOwner.name, 'Panchuram Gurjar', '596th owner must be Panchuram Gurjar');

console.log(`[TEST 1] Authentic Master Dataset: Exactly 596 Truck Owners Verified (596th: ${lastOwner.truckNo} - ${lastOwner.name}) ✔`);

// 2. Verify HTML Elements matching screencapture-appsheet-start-...-19_02_49.png
const htmlPath = path.join(__dirname, '../pages/owners.html');
const html = fs.readFileSync(htmlPath, 'utf8');

assert(html.includes('id="cardTruckOwners"'), "Card 1 container cardTruckOwners must exist");
assert(html.includes('Number 596'), "Card 1 must display 'Number 596' group badge");
assert(html.includes('btn-appsheet-add'), "Card 1 must have authentic ochre/gold + Add button");
assert(html.includes('Search Truck Owners'), "Search placeholder must support 'Search Truck Owners'");

// Check all 4 columns
assert(html.includes('<th>Truck No.</th>') || html.includes('Truck No.</th>'), "Column 'Truck No.' must exist");
assert(html.includes('<th>Name</th>') || html.includes('Name</th>'), "Column 'Name' must exist");
assert(html.includes('<th>Mobile No.</th>') || html.includes('Mobile No.</th>'), "Column 'Mobile No.' must exist");
assert(html.includes('<th>Mobile No. 1</th>') || html.includes('Mobile No. 1</th>'), "Column 'Mobile No. 1' must exist");

console.log("[TEST 2] Card 1 Table View (19_02_49.png) Layout & Columns Verified ✔");

// 3. Verify Bottom Pagination Controls
assert(html.includes('id="pagination-info"'), "Pagination info element must exist");
assert(html.includes('id="pagination-rows-select"'), "Rows per page select element must exist");
assert(html.includes('id="btn-page-prev"'), "Previous page button must exist");
assert(html.includes('id="btn-page-next"'), "Next page button must exist");
assert(html.includes('id="pagination-page-num"'), "Page number display must exist");

console.log("[TEST 3] Bottom Pagination Bar (Rows Selector, Page Info, Prev/Next) Verified ✔");

// 4. Verify Single Details Card matching screencapture-appsheet-start-...-19_04_54.png
assert(html.includes('id="viewOwnerDetails"'), "Dedicated Details View container must exist");
assert(html.includes('id="detail-truck-no"'), "Detail field 'Truck No.' must exist");
assert(html.includes('id="detail-owner-name"'), "Detail field 'Name' must exist");
assert(html.includes('id="detail-owner-mobile"'), "Detail field 'Mobile No.' must exist");
assert(html.includes('id="detail-mobile1-container"'), "Detail field 'Mobile No. 1' container must exist");
assert(html.includes('appsheet-details-card'), "AppSheet Details Card class must exist");

console.log("[TEST 4] Single Owner Details View (19_04_54.png) Verified ✔");

// 5. Verify Slide Drawer matching media_1793163696469_88990520.jpg
assert(html.includes('id="ownerDrawer"'), "Slide drawer container must exist");
assert(html.includes('id="ownerDrawerBackdrop"'), "Drawer backdrop must exist");
assert(html.includes('id="drawerTitle"'), "Drawer title element must exist");
assert(html.includes('id="drawer-truck-no"'), "Drawer Truck No input must exist");
assert(html.includes('id="drawer-owner-name"'), "Drawer Name input must exist");
assert(html.includes('id="drawer-owner-mobile"'), "Drawer Mobile No input must exist");
assert(html.includes('id="drawer-owner-mobile1"'), "Drawer Mobile No 1 input must exist");
assert(html.includes('btn-drawer-cancel'), "Drawer Cancel button must exist");
assert(html.includes('btn-drawer-save'), "Drawer Save button must exist");

console.log("[TEST 5] AppSheet Slide Drawer (media_1793163696469_88990520.jpg) Verified ✔");

// 6. Verify Controller Logic in js/modules/owners.js
const jsPath = path.join(__dirname, '../js/modules/owners.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');

assert(jsCode.includes('pageSize'), "OwnersModule must have pageSize property");
assert(jsCode.includes('currentPage'), "OwnersModule must have currentPage property");
assert(jsCode.includes('changePageSize'), "OwnersModule must have changePageSize method");
assert(jsCode.includes('prevPage'), "OwnersModule must have prevPage method");
assert(jsCode.includes('nextPage'), "OwnersModule must have nextPage method");
assert(jsCode.includes('showDashboard'), "OwnersModule must have showDashboard method");
assert(jsCode.includes('showTruckOwnersList'), "OwnersModule must have showTruckOwnersList method");
assert(jsCode.includes('showOwnerDetails'), "OwnersModule must have showOwnerDetails method");

console.log("[TEST 6] Controller Logic & Pagination Methods Verified ✔");

console.log("\n==================================================================");
console.log("   ALL 6 TESTS FOR CARD 1 (TRUCK OWNERS) PASSED WITH 100% SUCCESS  ");
console.log("==================================================================");
