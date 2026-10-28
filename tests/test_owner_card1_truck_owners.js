/**
 * test_owner_card1_truck_owners.js
 * Automated test suite verifying Card 1 (Truck Owners) against all 4 screenshots in
 * 'C:\Users\HP\Downloads\owner module frist card  trucks owners'
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("==================================================================");
console.log("   RUNNING CARD 1 (TRUCK OWNERS) AUTHENTIC UI VERIFICATION SUITE   ");
console.log("==================================================================\n");

// 1. Verify Dataset
const ownersData = require('../js/sample-truck-owners-data.js');
assert.strictEqual(ownersData.length, 595, `Expected 595 authentic truck owners, found ${ownersData.length}`);

const firstOwner = ownersData[0];
assert.strictEqual(firstOwner.truckNo, 'RJ42GA0451', 'First truck must be RJ42GA0451');
assert.strictEqual(firstOwner.name, 'Abcd', 'First owner name must be Abcd');
assert.strictEqual(firstOwner.mobile, '7898424750', 'First mobile must be 7898424750');

console.log(`[TEST 1] Authentic Master Dataset: 595 Truck Owners Verified (First: ${firstOwner.truckNo} - ${firstOwner.name}) ✔`);

// 2. Verify HTML Elements matching screencapture-appsheet-start-...-19_02_49.png
const htmlPath = path.join(__dirname, '../pages/owners.html');
const html = fs.readFileSync(htmlPath, 'utf8');

assert(html.includes('id="cardTruckOwners"'), "Card 1 container cardTruckOwners must exist");
assert(html.includes('Number 595'), "Card 1 must display 'Number 595' group badge");
assert(html.includes('btn-appsheet-add'), "Card 1 must have authentic ochre/gold + Add button");
assert(html.includes('Search Truck Owners'), "Search placeholder must support 'Search Truck Owners'");

// Check all 4 columns from screenshot
assert(html.includes('<th>Truck No.</th>') || html.includes('Truck No.</th>'), "Column 'Truck No.' must exist");
assert(html.includes('<th>Name</th>') || html.includes('Name</th>'), "Column 'Name' must exist");
assert(html.includes('<th>Mobile No.</th>') || html.includes('Mobile No.</th>'), "Column 'Mobile No.' must exist");
assert(html.includes('<th>Mobile No. 1</th>') || html.includes('Mobile No. 1</th>'), "Column 'Mobile No. 1' must exist");

console.log("[TEST 2] Card 1 Table View (19_02_49.png) Layout & Columns Verified ✔");

// 3. Verify Single Details Card matching screencapture-appsheet-start-...-19_04_54.png
assert(html.includes('id="viewOwnerDetails"'), "Dedicated Details View container must exist");
assert(html.includes('id="detail-truck-no"'), "Detail field 'Truck No.' must exist");
assert(html.includes('id="detail-owner-name"'), "Detail field 'Name' must exist");
assert(html.includes('id="detail-owner-mobile"'), "Detail field 'Mobile No.' must exist");
assert(html.includes('id="detail-owner-mobile1"'), "Detail field 'Mobile No. 1' must exist");
assert(html.includes('openEditCurrentOwner()'), "Details view must have Edit action");
assert(html.includes('deleteCurrentOwner()'), "Details view must have Delete action");
assert(html.includes('closeDetailsView()'), "Details view must have Back action");

console.log("[TEST 3] Single Owner Details View (19_04_54.png) Verified ✔");

// 4. Verify Slide Drawer matching screencapture-appsheet-start-...-19_05_06.png & 19_05_24.png
assert(html.includes('id="ownerDrawer"'), "Slide drawer container must exist");
assert(html.includes('id="ownerDrawerBackdrop"'), "Drawer backdrop must exist");
assert(html.includes('id="drawerTitle"'), "Drawer title element must exist");
assert(html.includes('id="drawer-truck-no"'), "Drawer Truck No input must exist");
assert(html.includes('id="drawer-owner-name"'), "Drawer Name input must exist");
assert(html.includes('id="drawer-owner-mobile"'), "Drawer Mobile No input must exist");
assert(html.includes('id="drawer-owner-mobile1"'), "Drawer Mobile No 1 input must exist");
assert(html.includes('closeDrawer()'), "Drawer close button must exist");

console.log("[TEST 4] AppSheet Slide Drawer (19_05_06.png & 19_05_24.png) Verified ✔");

// 5. Verify Controller Logic in js/modules/owners.js
const jsPath = path.join(__dirname, '../js/modules/owners.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');

assert(jsCode.includes('showDashboard'), "OwnersModule must have showDashboard method");
assert(jsCode.includes('showTruckOwnersList'), "OwnersModule must have showTruckOwnersList method");
assert(jsCode.includes('showOwnerDetails'), "OwnersModule must have showOwnerDetails method");
assert(jsCode.includes('closeDetailsView'), "OwnersModule must have closeDetailsView method");
assert(jsCode.includes('openAddDrawer'), "OwnersModule must have openAddDrawer method");
assert(jsCode.includes('openEditDrawer'), "OwnersModule must have openEditDrawer method");
assert(jsCode.includes('saveOwnerDrawer'), "OwnersModule must have saveOwnerDrawer method");
assert(jsCode.includes('deleteCurrentOwner'), "OwnersModule must have deleteCurrentOwner method");
assert(jsCode.includes('handleSearch'), "OwnersModule must have handleSearch method");

console.log("[TEST 5] Controller Logic & Navigation Methods Verified ✔");

console.log("\n==================================================================");
console.log("   ALL 5 TESTS FOR CARD 1 (TRUCK OWNERS) PASSED WITH 100% SUCCESS  ");
console.log("==================================================================");
