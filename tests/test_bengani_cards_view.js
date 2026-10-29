const fs = require('fs');
const assert = require('assert');

console.log('=== TEST SUITE: BENGANI (PURPLE) 3-CARD DRILLDOWN & APPSHEET INTEGRITY ===');

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
const vm = require('vm');
const ctx = { window: global.window, document: global.document, console: console };
vm.createContext(ctx);
vm.runInContext(duesCode, ctx);

const ownersCode = fs.readFileSync('js/modules/owners.js', 'utf8');
vm.runInContext(ownersCode, ctx);

const OwnersModule = ctx.window.OwnersModule;
OwnersModule.allOwnerDues = ctx.window.SAMPLE_OWNER_DUES;

// Test 1: Verify Trip 250 exists and is authentic Bengani (Purple)
const t250 = OwnersModule.allOwnerDues.find(d => String(d.grNo) === '250');
assert(t250, 'Trip 250 must exist in dataset');
assert.strictEqual(t250.color, 'purple', 'Trip 250 must have color purple');
assert.strictEqual(t250.status, 'POD Sent/ Bill Generated', 'Trip 250 status must be POD Sent/ Bill Generated');
assert.strictEqual(t250.truckNo, 'RJ52GB5642', 'Trip 250 truckNo must match RJ52GB5642');
assert.strictEqual(t250.biltyAmount, 146674, 'Trip 250 biltyAmount must be 146674');
assert.strictEqual(t250.weight, 110, 'Trip 250 weight must be 110.000');
assert.strictEqual(t250.rate, 1130, 'Trip 250 rate must be 1130');
console.log('✔ Test 1: Trip 250 Bengani dataset record verified matching 19_52_27.png');

// Test 2: Trigger showOpenTripDetails('250')
OwnersModule.showOpenTripDetails('250');

const leftCard = global.document.getElementById('drilldown-card-left');
const midCard = global.document.getElementById('drilldown-card-mid');
const rightCard = global.document.getElementById('drilldown-card-right');
const debtsSec = global.document.getElementById('drilldown-debts-container');
const container = global.document.getElementById('open-trip-cards-container');

// Verify container has theme-purple
assert(container.className.includes('theme-purple'), 'Container must have theme-purple class');
console.log('✔ Test 2: Drilldown theme-purple applied to open-trip-cards-container');

// Test 3: Card 1 (Left - Trip Info) fields
assert(leftCard.innerHTML.includes('2026-2027-250_SMTC'), 'Card 1 must include full G.R.No. 2026-2027-250_SMTC');
assert(leftCard.innerHTML.includes('RJ52GB5642'), 'Card 1 must include Truck No. RJ52GB5642');
assert(leftCard.innerHTML.includes('25/10/2026'), 'Card 1 must include Start Date 25/10/2026');
assert(leftCard.innerHTML.includes('04/11/2026'), 'Card 1 must include End Date 04/11/2026');
assert(leftCard.innerHTML.includes('Rajsamand (Raj.)'), 'Card 1 must include Origin');
assert(leftCard.innerHTML.includes('Neemrana (Raj.)'), 'Card 1 must include Destination');
assert(leftCard.innerHTML.includes('Per Tonne'), 'Card 1 must include Billing Type');
assert(leftCard.innerHTML.includes('146,674.00'), 'Card 1 must include Bilty Amount ₹ 146,674.00');
assert(leftCard.innerHTML.includes('110.000'), 'Card 1 must include Weight 110.000');
assert(leftCard.innerHTML.includes('1,130.00'), 'Card 1 must include Rate ₹ 1,130.00');
assert(leftCard.innerHTML.includes('Marble Powder (Dolomite)'), 'Card 1 must include Material');
assert(leftCard.innerHTML.includes('Sudhir Mishra Sarkani kareda'), 'Card 1 must include Reference');
assert(leftCard.innerHTML.includes('8824326001'), 'Card 1 must include Reference Mobile');
assert(leftCard.innerHTML.includes('Suresh Raiya'), 'Card 1 must include Driver');
assert(leftCard.innerHTML.includes('9636017337'), 'Card 1 must include Driver Mobile');
console.log('✔ Test 3: Card 1 (Left - Trip Info) all 15 fields verified matching 19_52_27.png');

// Test 4: Card 2 (Middle - Consignor Info & Expand)
assert(midCard.innerHTML.includes('Consignor/s'), 'Card 2 must have Consignor/s header');
assert(midCard.innerHTML.includes('08AAUFD1174E1ZC'), 'Card 2 must have GSTIN 08AAUFD1174E1ZC');
assert(midCard.innerHTML.includes('Durga Enterprises'), 'Card 2 must have Consignor Durga Enterprises');
assert(midCard.innerHTML.includes('1206/1159'), 'Card 2 must have Consignor Address');
assert(midCard.innerHTML.includes('Expand'), 'Card 2 must have Expand link');
console.log('✔ Test 4: Card 2 (Middle - Consignor/s Subtable & Expand) verified matching 19_52_27.png');

// Test 5: Card 3 (Right - Consignee / Owner / Freight / Status / Chips)
assert(rightCard.innerHTML.includes('08AASCS3036P1ZL'), 'Card 3 must include GSTIN Consignee');
assert(rightCard.innerHTML.includes('SAKARNI PLASTER (INDIA) PVT. LTD.'), 'Card 3 must include Consignee Name');
assert(rightCard.innerHTML.includes('8824326001'), 'Card 3 must include Consignee Mobile 1');
assert(rightCard.innerHTML.includes('8426009000'), 'Card 3 must include Consignee Mobile 2');
assert(rightCard.innerHTML.includes('Shree Mahaveer Transport Company'), 'Card 3 must include Owner Name');
assert(rightCard.innerHTML.includes('9414659401'), 'Card 3 must include Owner Mobile 1');
assert(rightCard.innerHTML.includes('9772200036'), 'Card 3 must include Owner Mobile 2');
assert(rightCard.innerHTML.includes('124,300.00'), 'Card 3 must include Freight ₹ 124,300.00');
assert(rightCard.innerHTML.includes('POD Sent/ Bill Generated'), 'Card 3 must include Status POD Sent/ Bill Generated');
assert(rightCard.innerHTML.includes('chip-active-purple'), 'Card 3 must have active purple chip');
assert(rightCard.innerHTML.includes('Off Loading'), 'Card 3 must include Off Loading chip');
assert(rightCard.innerHTML.includes('Cheque Due'), 'Card 3 must include Cheque Due chip');
console.log('✔ Test 5: Card 3 (Right - Consignee / Owner / Freight / Status / Chips) verified matching 19_52_27.png & WhatsApp');

// Test 6: Bottom Section - Open Debts Table matching 19_54_51.png
assert(debtsSec.innerHTML.includes('Open Debts'), 'Must have Open Debts header');
assert(debtsSec.innerHTML.includes('open-debts-table'), 'Must have open-debts-table');
assert(debtsSec.innerHTML.includes('Commission'), 'Must have Commission debts');
assert(debtsSec.innerHTML.includes('Ramchandra Jat 8824993002'), 'Must have receiver name');
assert(debtsSec.innerHTML.includes('Search Open Debts'), 'Must have search open debts input');
console.log('✔ Test 6: Bottom Open Debts Table verified matching 19_54_51.png');

// Test 7: Party Details Drilldown View matching 19_53_18.png
OwnersModule.showOpenTripPartyDetails('250');
const partyView = global.document.getElementById('viewOpenTripPartyDetails');
assert(partyView.innerHTML.includes('Open Trip Party Details'), 'Must have Open Trip Party Details title');
assert(partyView.innerHTML.includes('08AAUFD1174E1ZC'), 'Party view must have GSTIN');
assert(partyView.innerHTML.includes('Durga Enterprises'), 'Party view must have Consignor Name');
assert(partyView.innerHTML.includes('Search Open Trip Party Details'), 'Party view must have search input');
console.log('✔ Test 7: Open Trip Party Details View verified matching 19_53_18.png');

console.log('\n================================================================');
console.log('  ALL BENGANI (PURPLE) CARDS & DRILLDOWN TESTS PASSED (100%)    ');
console.log('================================================================');
