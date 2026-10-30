const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

console.log('=== TEST SUITE: SLATTEY (SLATE / CHEQUE DUE) CARDS & DRILLDOWN INTEGRITY ===');

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
          contains(c) { return this.classes.has(c); }
        }
      };
    }
    return elements[id];
  }
};

// 2. Load master dues and owners module
const duesCode = fs.readFileSync('js/sample-owner-dues-data.js', 'utf8');
const ctx = { window: global.window, document: global.document, console: console };
vm.createContext(ctx);
vm.runInContext(duesCode, ctx);

const ownersCode = fs.readFileSync('js/modules/owners.js', 'utf8');
vm.runInContext(ownersCode, ctx);

const OwnersModule = ctx.window.OwnersModule;
OwnersModule.allOwnerDues = ctx.window.SAMPLE_OWNER_DUES;

// Test 1: Trigger showOpenTripDetails('2645')
OwnersModule.showOpenTripDetails('2645');

const container = global.document.getElementById('open-trip-cards-container');
const leftCard = global.document.getElementById('drilldown-card-left');
const chequeCard = global.document.getElementById('drilldown-card-cheque');
const midCard = global.document.getElementById('drilldown-card-mid');
const rightCard = global.document.getElementById('drilldown-card-right');

// Verify container has theme-slate
assert(container.className.includes('theme-slate'), 'Container must have theme-slate class');
console.log('✔ Test 1: Drilldown theme-slate applied to open-trip-cards-container');

// Test 2: Card 1 (Left - Trip Info) contains 15 fields matching user screenshot media_1793355082953_07f2614f.png
const c1Html = leftCard.innerHTML;
assert(c1Html.includes('G.R.No.'), 'Card 1 must contain G.R.No.');
assert(c1Html.includes('2645'), 'Card 1 must show GR 2645');
assert(c1Html.includes('RJ52GB5640'), 'Card 1 must show Truck RJ52GB5640');
assert(c1Html.includes('25/10/2026'), 'Card 1 must show Start Date 25/10/2026');
assert(c1Html.includes('04/11/2026'), 'Card 1 must show Due Date 04/11/2026');
assert(c1Html.includes('Kishangarh (Raj.)'), 'Card 1 must show Origin Kishangarh');
assert(c1Html.includes('Delhi'), 'Card 1 must show Destination Delhi');
assert(c1Html.includes('Per Tonne'), 'Card 1 must show Billing Type Per Tonne');
assert(c1Html.includes('10,000.00'), 'Card 1 must show Bilty Amount ₹ 10,000.00');
assert(c1Html.includes('82.140'), 'Card 1 must show Weight 82.140');
assert(c1Html.includes('1,030.00'), 'Card 1 must show Rate ₹ 1,030.00');
assert(c1Html.includes('Marble Block Job Work'), 'Card 1 must show Material Marble Block Job Work');
assert(c1Html.includes('Anil Sharda'), 'Card 1 must show Reference Anil Sharda');
assert(c1Html.includes('9350734545'), 'Card 1 must show Reference Mobile 9350734545');
assert(c1Html.includes('Hardan'), 'Card 1 must show Driver Hardan');
assert(c1Html.includes('8890178907'), 'Card 1 must show Driver Mobile 8890178907');
console.log('✔ Test 2: Card 1 (Left - Trip Info) all 15 authentic fields verified matching media_1793355082953_07f2614f.png');

// Test 3: Card Cheque (Left Column directly beneath Card 1)
assert.strictEqual(chequeCard.style.display, 'block', 'Cheque card must be visible for Cheque Due trip');
const chequeHtml = chequeCard.innerHTML;
assert(chequeHtml.includes('Cheque'), 'Cheque card must have header title Cheque');
assert(chequeHtml.includes('Cheque Due Date'), 'Cheque table must contain Cheque Due Date column');
assert(chequeHtml.includes('Cheque No.'), 'Cheque table must contain Cheque No. column');
assert(chequeHtml.includes('Amount'), 'Cheque table must contain Amount column');
assert(chequeHtml.includes('Bank'), 'Cheque table must contain Bank column');
assert(chequeHtml.includes('Pay to'), 'Cheque table must contain Pay to column');
assert(chequeHtml.includes('Clear'), 'Cheque table must contain Clear column');
assert(chequeHtml.includes('27/10/2026'), 'Cheque row must show date 27/10/2026');
assert(chequeHtml.includes('000504'), 'Cheque row must show cheque no 000504');
assert(chequeHtml.includes('10,000.00'), 'Cheque row must show amount 10,000.00');
assert(chequeHtml.includes('HDFC'), 'Cheque row must show bank HDFC');
assert(chequeHtml.includes('TTC'), 'Cheque row must show pay to TTC');
assert(chequeHtml.includes('Expand'), 'Cheque card must have Expand action');
assert(chequeHtml.includes('Add'), 'Cheque card must have Add button');
console.log('✔ Test 3: Cheque Subtable Card (directly beneath Card 1) verified with all authentic columns and actions');

// Test 4: Card 2 (Middle - Consignor Subtable, Total Cheque Amount, Total Freight, Status dropdown)
const c2Html = midCard.innerHTML;
assert(c2Html.includes('Consignor/s'), 'Card 2 must contain Consignor/s title');
assert(c2Html.includes('Expand'), 'Card 2 must contain Consignor Expand link');
assert(c2Html.includes('Total Cheque Amount'), 'Card 2 must contain Total Cheque Amount field directly under subtable');
assert(c2Html.includes('10,000.00'), 'Card 2 must show Total Cheque Amount ₹ 10,000.00');
assert(c2Html.includes('Total Freight'), 'Card 2 must contain Total Freight field');
assert(c2Html.includes('84,604.00'), 'Card 2 must show Total Freight ₹ 84,604.00');
assert(c2Html.includes('Status*'), 'Card 2 must contain Status* dropdown');
assert(c2Html.includes('Cheque Due'), 'Card 2 must display Cheque Due status');
console.log('✔ Test 4: Card 2 (Middle - Consignor/s subtable, Total Cheque Amount, Total Freight & Status) verified');

// Test 5: Card 3 (Right - Consignee, Owner, Freight, Add Records dropdown, omitting red Owner Due)
const c3Html = rightCard.innerHTML;
assert(c3Html.includes('GSTIN Consignee'), 'Card 3 must contain GSTIN Consignee');
assert(c3Html.includes('07BOCPS3766N1Z9'), 'Card 3 must show authentic GSTIN 07BOCPS3766N1Z9');
assert(c3Html.includes('Shreekant Marbles'), 'Card 3 must show Consignee Shreekant Marbles');
assert(c3Html.includes('9350734545'), 'Card 3 must show Consignee Mobile 9350734545');
assert(c3Html.includes('Shree Mahaveer Transport Company'), 'Card 3 must show Owner Shree Mahaveer Transport Company');
assert(c3Html.includes('9414659401'), 'Card 3 must show Owner Mobile 9414659401');
assert(c3Html.includes('Freight'), 'Card 3 must contain Freight field');
assert(c3Html.includes('84,604.00'), 'Card 3 must show Freight ₹ 84,604.00');
assert(c3Html.includes('Add Records for'), 'Card 3 must contain Add Records for dropdown');
assert(c3Html.includes('Cheque'), 'Card 3 Add Records for dropdown must display Cheque');
assert(!c3Html.includes('Owner Due'), 'Card 3 must NOT contain red Owner Due field for Cheque Due trip');
console.log('✔ Test 5: Card 3 (Right - Consignee, Owner, Freight & Add Records dropdown) verified without Owner Due');

// Test 6: Verify non-slate trip (e.g. 250 Bengani) keeps its authentic layout and hides Cheque Card
OwnersModule.showOpenTripDetails('250');
assert.strictEqual(chequeCard.style.display, 'none', 'Cheque card must be hidden for non-slate trip 250');
assert(midCard.innerHTML.includes('Consignor/s'), 'Card 2 must still display Consignor/s');
assert(rightCard.innerHTML.includes('Owner Due'), 'Card 3 must retain Owner Due for Bengani trip 250');
console.log('✔ Test 6: Non-slate trip (250 Bengani) isolation verified (Cheque card hidden, Owner Due preserved)');

console.log('\n================================================================');
console.log('  ALL SLATTEY (SLATE / CHEQUE DUE) CARDS & DRILLDOWN TESTS PASSED (100%)');
console.log('================================================================');
