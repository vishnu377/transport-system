const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

console.log('=== TEST SUITE: OWNER PAID CARD & DYNAMIC THEMES ENGINE ===');

// 1. Mock DOM Environment
global.window = {
  location: { hash: '' },
  print: () => {}
};

const elements = {};
global.document = {
  readyState: 'complete',
  getElementById(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        innerHTML: '',
        innerText: '',
        value: '',
        style: {},
        className: '',
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); },
          toggle(c, force) {
            if (force !== undefined) {
              if (force) this.classes.add(c); else this.classes.delete(c);
            } else {
              if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c);
            }
          }
        },
        querySelectorAll: () => [],
        querySelector: () => null
      };
    }
    return elements[id];
  },
  querySelector(sel) {
    return this.getElementById('mock_' + sel.replace(/[^a-zA-Z0-9]/g, '_'));
  },
  querySelectorAll() {
    return [];
  },
  addEventListener: () => {}
};

// 2. Load dependencies
const sampleOwnersCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-truck-owners-data.js', 'utf8');
vm.runInThisContext(sampleOwnersCode);

const sampleDuesCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-owner-dues-data.js', 'utf8');
vm.runInThisContext(sampleDuesCode);

const samplePaidCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/sample-owner-paid-data.js', 'utf8');
vm.runInThisContext(samplePaidCode);

const dbServiceCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/db-service.js', 'utf8');
vm.runInThisContext(dbServiceCode);
global.dbService = new DBService();

const ownersCode = fs.readFileSync('C:/Users/HP/Desktop/transport-system/js/modules/owners.js', 'utf8');
vm.runInThisContext(ownersCode);

// TEST 1: Sample Owner Paid Data exists and has authentic FY totals
console.log('\n--- TEST 1: Owner Paid Data Integrity & FY Totals ---');
assert(Array.isArray(window.INITIAL_OWNER_PAID), 'INITIAL_OWNER_PAID must be an array');
assert(window.INITIAL_OWNER_PAID.length >= 300, `INITIAL_OWNER_PAID count must be >= 300 (got ${window.INITIAL_OWNER_PAID.length})`);

const s = window.OWNER_PAID_SUMMARY;
assert(s, 'OWNER_PAID_SUMMARY must exist');
assert.strictEqual(s['2026-2027'], 387326250.58, '2026-2027 total must match Rs. 387,326,250.58');
assert.strictEqual(s['2025-2026'], 613429055.23, '2025-2026 total must match Rs. 613,429,055.23');
assert.strictEqual(s['2024-2025'], 254765978.79, '2024-2025 total must match Rs. 254,765,978.79');
assert.strictEqual(s['24-25'], 19901.60, '24-25 total must match Rs. 19,901.60');
console.log('✓ TEST 1 PASSED: All 4 FY Totals match exact AppSheet numbers!');

// TEST 2: DBService integration for Owner Paid
console.log('\n--- TEST 2: DBService getAllOwnerPaid & Session Store ---');
const allPaid = dbService.getAllOwnerPaid();
assert(Array.isArray(allPaid), 'getAllOwnerPaid must return an array');
assert.strictEqual(allPaid.length, window.INITIAL_OWNER_PAID.length, 'getAllOwnerPaid count must match');
console.log(`✓ TEST 2 PASSED: DBService successfully loaded ${allPaid.length} Owner Paid records without localStorage!`);

// TEST 3: OwnersModule view switching to Owner Paid
console.log('\n--- TEST 3: OwnersModule.filterByPaidYear ---');
OwnersModule.filterByPaidYear('2024-2025');
assert.strictEqual(OwnersModule.currentView, 'ownerPaidList', 'currentView must be ownerPaidList');
assert.strictEqual(OwnersModule.selectedPaidYear, '2024-2025', 'selectedPaidYear must be 2024-2025');
assert.strictEqual(elements['viewOwnerPaidList'].style.display, 'block', 'viewOwnerPaidList must be visible');
assert.strictEqual(elements['viewDashboard'].style.display, 'none', 'viewDashboard must be hidden');
console.log('✓ TEST 3 PASSED: viewOwnerPaidList active with 2024-2025 filter!');

// TEST 4: Table rendering and pagination
console.log('\n--- TEST 4: Table rendering & pagination ---');
const filtered2024 = OwnersModule.getFilteredPaidRecords();
assert(filtered2024.length > 0, 'Must have records for 2024-2025');
assert(filtered2024.every(p => p.year === '2024-2025'), 'All records must have year 2024-2025');

const tbodyHtml = elements['tbody-owner-paid'].innerHTML;
assert(tbodyHtml.includes('1007_TTC') || tbodyHtml.includes('Ashok Kasana') || tbodyHtml.includes('RJ14GG0267'), 'Table must contain 2024 sorted entries');
console.log(`✓ TEST 4 PASSED: Rendered table with ${filtered2024.length} rows for 2024-2025!`);

// TEST 5: Authentic 24-25 record matching screenshot 00_04_15.png
console.log('\n--- TEST 5: Authentic 24-25 row (52_SMTC) ---');
OwnersModule.selectPaidYear('24-25');
const filtered2425 = OwnersModule.getFilteredPaidRecords();
assert.strictEqual(filtered2425.length, 1, '24-25 must have exactly 1 record matching screenshot');
const r52 = filtered2425[0];
assert.strictEqual(r52.grNo, '52_SMTC', 'G.R. No must be 52_SMTC');
assert.strictEqual(r52.truckNo, 'RJ52GA9489', 'Truck No must be RJ52GA9489');
assert.strictEqual(r52.ownerName, 'Laxmi Prakash Oat', 'Owner must be Laxmi Prakash Oat');
assert.strictEqual(r52.amountPaid, 19901.60, 'Amount Paid must be 19901.60');
assert.strictEqual(r52.mode, 'GST', 'Mode must be GST');
console.log('✓ TEST 5 PASSED: 24-25 row 52_SMTC matches 00_04_15.png 100%!');

// TEST 6: Settled Trip Drilldown has Green Theme (#00b11f) & Download button
console.log('\n--- TEST 6: Settled Trip Drilldown (Green Theme #00b11f) ---');
OwnersModule.showOwnerPaidTripDetails('paid-2026-2669');
assert.strictEqual(OwnersModule.currentView, 'openTripDetails');
const cont = elements['open-trip-cards-container'];
assert(cont.className.includes('theme-green'), `Container must have theme-green (got: ${cont.className})`);

const breadcrumbText = elements['drilldown-breadcrumb'] ? elements['drilldown-breadcrumb'].innerHTML : '';
const leftCardHtml = elements['drilldown-card-left'].innerHTML;
assert(leftCardHtml.includes('RJ14GH0366'), 'Left card must show truck RJ14GH0366');
assert(leftCardHtml.includes('2669_TTC'), 'Left card must show GR 2669_TTC');

const bottomHtml = elements['drilldown-bottom-container'].innerHTML;
assert(bottomHtml.includes('Download'), 'Settled trip must show Download button matching screenshot 23_44_21.png');
console.log('✓ TEST 6 PASSED: Settled Trip 2669_TTC has Green Theme and Download button!');

// TEST 7: Truck Owner Payment Pending has Sky Blue Theme (#01cebc)
console.log('\n--- TEST 7: Truck Owner Payment Pending (Sky Blue #01cebc) ---');
OwnersModule.showOwnerPaidTripDetails('paid-2026-2501');
assert(cont.className.includes('theme-cyan') || cont.className.includes('theme-light-blue'), `Pending trip must have sky blue theme (got: ${cont.className})`);
const left2501 = elements['drilldown-card-left'].innerHTML;
assert(left2501.includes('RJ26GA9409'), 'Must show truck RJ26GA9409');
assert(left2501.includes('Kalyan Meena') || elements['drilldown-card-right'].innerHTML.includes('Kalyan Meena'), 'Must show owner Kalyan Meena');
console.log('✓ TEST 7 PASSED: Truck Owner Payment Pending 2501_TTC has Sky Blue Theme!');

// TEST 8: Party Payment Pending has Blue Theme (#037be4)
console.log('\n--- TEST 8: Party Payment Pending (Blue #037be4) ---');
OwnersModule.showOwnerPaidTripDetails('paid-2026-2534');
assert(cont.className.includes('theme-blue'), `Party Payment Pending trip must have theme-blue (got: ${cont.className})`);
const left2534 = elements['drilldown-card-left'].innerHTML;
assert(left2534.includes('RJ52GA9433'), 'Must show truck RJ52GA9433');
assert(elements['drilldown-card-right'].innerHTML.includes('Deepak Dhabas'), 'Must show owner Deepak Dhabas');
console.log('✓ TEST 8 PASSED: Party Payment Pending 2534_TTC has Blue Theme!');

// TEST 9: Search functionality in Owner Paid
console.log('\n--- TEST 9: Search functionality ---');
OwnersModule.selectPaidYear('ALL');
OwnersModule.handlePaidSearch('Sandila');
const searchResults = OwnersModule.getFilteredPaidRecords();
assert(searchResults.length > 0, 'Search for Sandila must return results');
assert(searchResults.every(r => JSON.stringify(r).toLowerCase().includes('sandila')), 'All results must match search query');
console.log(`✓ TEST 9 PASSED: Search for 'Sandila' returned ${searchResults.length} matching records!`);

// TEST 10: Back to Paid List navigation
console.log('\n--- TEST 10: Back to Paid List navigation ---');
OwnersModule.backToPaidList();
assert.strictEqual(OwnersModule.currentView, 'ownerPaidList');
assert.strictEqual(elements['viewOwnerPaidList'].style.display, 'block');
assert.strictEqual(elements['viewOpenTripDetails'].style.display, 'none');
console.log('✓ TEST 10 PASSED: Back navigation returned to viewOwnerPaidList seamlessly!');

console.log('\n======================================================');
console.log('🏆 ALL 10 TESTS PASSED 100%! OWNER PAID CARD IS COMPLETE & VERIFIED!');
console.log('======================================================');
