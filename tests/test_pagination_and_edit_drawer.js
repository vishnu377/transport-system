const fs = require('fs');
const assert = require('assert');

// 1. Verify CSS rules in pages/owners.html
const htmlContent = fs.readFileSync('pages/owners.html', 'utf-8');

assert(htmlContent.includes('#cardTruckOwners:not(.panel-expanded) .appsheet-panel-footer'), 'Missing hidden footer selector in normal view');
assert(htmlContent.includes('.owners-grid.card1-expanded #cardTruckOwners .appsheet-panel-footer'), 'Missing visible footer selector when expanded');
assert(htmlContent.includes('.owners-grid.card1-expanded #cardOwnerDue'), 'Missing rule to hide other cards on expand');
console.log('✔ CSS: Card 1 Pagination display rules verified');

// 2. Verify JS methods in js/modules/owners.js
const jsContent = fs.readFileSync('js/modules/owners.js', 'utf-8');

assert(jsContent.includes('openEditCurrentOwner('), 'Missing openEditCurrentOwner method in owners.js');
assert(jsContent.includes('openEditDrawer('), 'Missing openEditDrawer method in owners.js');
assert(jsContent.includes('saveOwnerDrawer('), 'Missing saveOwnerDrawer method in owners.js');
assert(jsContent.includes('expandTruckOwners()'), 'Missing expandTruckOwners method in owners.js');
assert(jsContent.includes('collapseTruckOwners()'), 'Missing collapseTruckOwners method in owners.js');
console.log('✔ JS: All controller methods exist in owners.js');

// 3. Mock DOM environment to test logic
global.window = { location: { hash: '' } };
global.document = {
  readyState: 'complete',
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
        id,
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          toggle(c) { if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c); },
          contains(c) { return this.classes.has(c); }
        },
        style: {},
        innerText: '',
        value: '',
        querySelector(selector) {
          return {
            classList: {
              add(c) {},
              remove(c) {},
              contains(c) { return false; }
            },
            setAttribute(k, v) {}
          };
        },
        querySelectorAll(selector) { return []; }
      };
    }
    return this.elements[id];
  },
  querySelectorAll(selector) { return []; }
};

// Evaluate sample dues
const sampleDuesCode = fs.readFileSync('js/sample-owner-dues-data.js', 'utf-8');
eval(sampleDuesCode);

// Mock FirebaseDB
global.FirebaseDB = {
  updateTruckOwner: async (id, data) => true,
  saveTruckOwner: async (data) => true
};

// Load owners.js
eval(jsContent);
const OwnersModule = window.OwnersModule;

// Test OwnersModule properties
assert(typeof OwnersModule.openEditCurrentOwner === 'function', 'openEditCurrentOwner is not a function');
assert(typeof OwnersModule.openEditDrawer === 'function', 'openEditDrawer is not a function');
assert(typeof OwnersModule.saveOwnerDrawer === 'function', 'saveOwnerDrawer is not a function');
assert(typeof OwnersModule.toggleCardExpand === 'function', 'toggleCardExpand is not a function');
assert(typeof OwnersModule.expandTruckOwners === 'function', 'expandTruckOwners is not a function');
assert(typeof OwnersModule.collapseTruckOwners === 'function', 'collapseTruckOwners is not a function');

// Initialize dummy owners
OwnersModule.allOwners = [
  { id: '1', truckNo: 'RJ14GH7536', name: 'Abcd', mobile: '6316137463', mobile1: '9876543210' }
];

// Test 1: Open Owner Details
OwnersModule.showOwnerDetails('RJ14GH7536');
assert.strictEqual(OwnersModule.currentView, 'details');
assert.strictEqual(OwnersModule.currentOwnerId, '1');
assert.strictEqual(document.getElementById('detail-truck-no').innerText, 'RJ14GH7536');
console.log('✔ Test 1: showOwnerDetails successfully selected owner RJ14GH7536');

// Test 2: Edit Button opens drawer
OwnersModule.openEditCurrentOwner();
const drawer = document.getElementById('ownerDrawer');
const backdrop = document.getElementById('ownerDrawerBackdrop');
assert(drawer.classList.contains('open'), 'Drawer should have class "open"');
assert(backdrop.classList.contains('show'), 'Backdrop should have class "show"');
assert.strictEqual(document.getElementById('drawer-truck-no').value, 'RJ14GH7536');
assert.strictEqual(document.getElementById('drawer-owner-name').value, 'Abcd');
assert.strictEqual(document.getElementById('drawer-owner-mobile').value, '6316137463');
console.log('✔ Test 2: openEditCurrentOwner populated drawer fields and opened drawer');

// Test 3: Save Owner Drawer updates state
document.getElementById('drawer-owner-name').value = 'Abcd Updated';
OwnersModule.saveOwnerDrawer({ preventDefault: () => {} }).then(() => {
  assert.strictEqual(OwnersModule.allOwners[0].name, 'Abcd Updated');
  assert(!drawer.classList.contains('open'), 'Drawer should be closed after save');
  console.log('✔ Test 3: saveOwnerDrawer successfully updated owner and closed drawer');

  // Test 4: Expand Truck Owners
  OwnersModule.toggleCardExpand('cardTruckOwners');
  const card = document.getElementById('cardTruckOwners');
  const grid = document.getElementById('ownersDashboardGrid');
  assert(card.classList.contains('panel-expanded'), 'cardTruckOwners should have panel-expanded');
  assert(grid.classList.contains('card1-expanded'), 'ownersDashboardGrid should have card1-expanded');
  console.log('✔ Test 4: toggleCardExpand expanded Card 1 full-width');

  // Test 5: Collapse Truck Owners
  OwnersModule.toggleCardExpand('cardTruckOwners');
  assert(!card.classList.contains('panel-expanded'), 'cardTruckOwners should not have panel-expanded');
  assert(!grid.classList.contains('card1-expanded'), 'ownersDashboardGrid should not have card1-expanded');
  console.log('✔ Test 5: toggleCardExpand collapsed Card 1 back to normal dashboard view');

  console.log('\n======================================================');
  console.log('  ALL PAGINATION & EDIT DRAWER TESTS PASSED (100%)    ');
  console.log('======================================================');
});
