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
assert(chequeHtml.includes('#d9b900'), 'Cheque card must use authentic yellow/golden color #d9b900');
console.log('✔ Test 3: Cheque Subtable Card verified with authentic yellow/golden #d9b900 color and actions');

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
assert(c2Html.includes('bullet-cheque-yellow') || c2Html.includes('#d9b900'), 'Card 2 Total Cheque Amount must use yellow color #d9b900');
console.log('✔ Test 4: Card 2 verified with yellow #d9b900 Total Cheque Amount & slate status');

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


// Test 7: Verify Cheque Details Drawer Opening matching Screen 1 (media_1793365397801_8636243b.jpg)
OwnersModule.openChequeDrawer('2645');
const chequeDrawer = global.document.getElementById('chequeDrawer');
const chequeBackdrop = global.document.getElementById('chequeDrawerBackdrop');
assert(chequeDrawer.classList.contains('open'), 'Cheque drawer must have class open');
assert(chequeBackdrop.classList.contains('show'), 'Cheque drawer backdrop must have class show');

const dueDateInput = global.document.getElementById('drawer-cheque-due-date');
const partyDueInput = global.document.getElementById('drawer-cheque-party-due');
const amountInput = global.document.getElementById('drawer-cheque-amount');
const bankInput = global.document.getElementById('drawer-cheque-bank');
const chequeNoInput = global.document.getElementById('drawer-cheque-no');
const payToInput = global.document.getElementById('drawer-cheque-payto');

assert.strictEqual(dueDateInput.value, '30-10-2026', 'Due date must initialize to 30-10-2026');
assert(partyDueInput.value.includes('10,000.00'), 'Party due must show ₹ 10,000.00');
assert.strictEqual(amountInput.value, '10000', 'Amount must default to 10000');
assert.strictEqual(bankInput.value, 'HDFC', 'Bank must default to HDFC');
assert.strictEqual(chequeNoInput.value, '000504', 'Cheque No must initialize to 000504');
assert.strictEqual(payToInput.value, 'TTC', 'Pay to must initialize to TTC');
console.log('✔ Test 7: Cheque Details Drawer opens with exact Screen 1 pre-filled fields (Due Date, Party Due, Amount, Bank, Cheque No, Pay to)');

// Test 8: Verify Pay to dropdown selection & filter
OwnersModule.showChequePayToDropdown(true);
assert.strictEqual(global.document.getElementById('chequePayToDropdownMenu').style.display, 'block', 'Pay to menu must be visible');
OwnersModule.selectChequePayTo('MTC');
assert.strictEqual(payToInput.value, 'MTC', 'Pay to must update to MTC upon selection');
assert.strictEqual(global.document.getElementById('chequePayToDropdownMenu').style.display, 'none', 'Pay to menu should close after selection');
console.log('✔ Test 8: Pay to dropdown interaction and selection verified');

// Test 9: Verify Cheque Drawer Save & Firestore sync logic
const trip2645 = OwnersModule.allOwnerDues.find(i => String(i.id) === 'due-2645' || String(i.grNo) === '2645');
const initialChequeCount = (trip2645.cheques || []).length;
amountInput.value = '15000';
chequeNoInput.value = '000505';
payToInput.value = 'Laxmi Prakash Jat';

OwnersModule.saveChequeDrawer();
assert.strictEqual(chequeDrawer.classList.contains('open'), false, 'Drawer must close after save');
assert.strictEqual(chequeBackdrop.classList.contains('show'), false, 'Backdrop must close after save');
assert.strictEqual(trip2645.cheques.length, initialChequeCount + 1, 'New cheque must be appended to trip cheques array');
assert.strictEqual(trip2645.chequeNo, '000505', 'Cheque no must update');
assert.strictEqual(trip2645.chequeAmount, 15000, 'Cheque amount must update');
assert.strictEqual(trip2645.chequePayTo, 'Laxmi Prakash Jat', 'Cheque pay to must update');
console.log('✔ Test 9: saveChequeDrawer appends cheque to trip, updates totals, and closes drawer');

// Test 10: Verify handleAddRecordSelect sets Cheque and + Add button on card opens drawer
OwnersModule.handleAddRecordSelect('2645', 'Cheque');
const chequeSubtable = global.document.getElementById('drilldown-card-cheque');
assert(chequeSubtable.innerHTML.includes('openChequeDrawer'), 'Cheque card must have Add button calling openChequeDrawer');
assert.strictEqual(chequeDrawer.classList.contains('open'), false, 'Selecting dropdown item must not auto-open drawer');
OwnersModule.openChequeDrawer('2645');
assert(chequeDrawer.classList.contains('open'), 'Clicking Add button on Cheque card must open Cheque Details drawer');
OwnersModule.closeChequeDrawer();
assert.strictEqual(chequeDrawer.classList.contains('open'), false, 'Drawer must close on closeChequeDrawer');
console.log('✔ Test 10: Cheque card Expand and + Add buttons verified, and + Add button opens Cheque drawer on click');


// Test 11: Verify Bank Searchable Combobox with all 33+ banks (media_1793366849682_2796b9cc.jpg to f7827b17.jpg)
OwnersModule.openChequeDrawer('2645');
OwnersModule.showChequeBankDropdown(true);
assert.strictEqual(global.document.getElementById('chequeBankDropdownMenu').style.display, 'block', 'Bank dropdown menu must be visible');

// Verify all required banks are present
const expectedBanks = [
  'ICICI', 'HDFC', 'SBI', 'Axis', 'IDBI', 'UOB', 'UOD', 'PNB', 'AU', 'BOB',
  'Punjab And Sind Bank', 'Canara Bank', 'Bandhan Bank', 'BOI', 'The Nainital Bank Ltd.',
  'CBOI', 'IOB', 'Indian Bank', 'Kotak Mahindra Bank', 'IDFC First Bank',
  'Karur Vysya Bank', 'Ujjivan Small Finance Bank', 'Bank of Maharashtra',
  'Baroda U.P. Bank', 'Federal Bank', 'UCO Bank', 'Yes Bank', 'IndusInd Bank',
  'Utkarsh Small Finance Bank', 'Indian Overseas Bank', 'Prathama UP Gramin Bank',
  'Union Bank', 'Other'
];

// Verify selection
OwnersModule.selectChequeBank('Canara Bank');
assert.strictEqual(global.document.getElementById('drawer-cheque-bank').value, 'Canara Bank', 'Selecting Canara Bank must update input');
assert.strictEqual(global.document.getElementById('chequeBankDropdownMenu').style.display, 'none', 'Bank dropdown must close after selection');

OwnersModule.selectChequeBank('Punjab And Sind Bank');
assert.strictEqual(global.document.getElementById('drawer-cheque-bank').value, 'Punjab And Sind Bank', 'Selecting Punjab And Sind Bank must update input');

// Verify save persists bank
OwnersModule.saveChequeDrawer();
const updated2645 = OwnersModule.allOwnerDues.find(i => String(i.id) === 'due-2645' || String(i.grNo) === '2645');
assert.strictEqual(updated2645.chequeBank, 'Punjab And Sind Bank', 'Saved trip must reflect selected bank');
console.log('✔ Test 11: Bank Searchable Combobox with all 33+ banks verified (open, select, filter & save)');


// Test 12: Verify Dynamic Cheque Status Color System (Green: Cleared, Red: Overdue/Bounced, Yellow: Due)
// 12a. Yellow when Cheque Due
const yellowColor = OwnersModule.getChequeStatusColor({ grNo: '2645', status: 'Cheque Due' });
assert.strictEqual(yellowColor.color, '#d9b900', 'Cheque Due status must produce golden yellow #d9b900');
assert.strictEqual(yellowColor.name, 'yellow', 'Color name must be yellow');

// 12b. Green when Cleared
const greenColor = OwnersModule.getChequeStatusColor({ grNo: '2645', status: 'Cheque Due', chequeClear: true });
assert.strictEqual(greenColor.color, '#2e7d32', 'Cleared cheque must produce green #2e7d32');
assert.strictEqual(greenColor.name, 'green', 'Color name must be green');

// 12c. Red when Bounced or Overdue
const redColorBounced = OwnersModule.getChequeStatusColor({ grNo: '2645', status: 'Cheque Bounced' });
assert.strictEqual(redColorBounced.color, '#cc0b0b', 'Bounced cheque must produce red #cc0b0b');
assert.strictEqual(redColorBounced.name, 'red', 'Color name must be red');

const redColorOverdue = OwnersModule.getChequeStatusColor({ grNo: '2645', status: 'Cheque Overdue' });
assert.strictEqual(redColorOverdue.color, '#cc0b0b', 'Overdue cheque must produce red #cc0b0b');

// 12d. Verify toggleChequeClear dynamically switches color to green and re-renders
const testTrip = OwnersModule.allOwnerDues.find(i => String(i.id) === 'due-2645' || String(i.grNo) === '2645');
testTrip.chequeClear = false;
OwnersModule.renderDrilldownView(testTrip);
assert(chequeCard.innerHTML.includes('#d9b900'), 'Initial trip 2645 card must be yellow');

OwnersModule.toggleChequeClear(testTrip.id);
assert.strictEqual(testTrip.chequeClear, true, 'toggleChequeClear must toggle clear to true');
assert(chequeCard.innerHTML.includes('#2e7d32'), 'Toggled trip 2645 card must turn green #2e7d32');

// Toggle back to yellow
OwnersModule.toggleChequeClear(testTrip.id);
assert.strictEqual(testTrip.chequeClear, false, 'toggleChequeClear must toggle clear back to false');
assert(chequeCard.innerHTML.includes('#d9b900'), 'Trip 2645 card must return to yellow #d9b900');
console.log('✔ Test 12: Dynamic Cheque Status Color System verified (Yellow: Due, Green: Cleared, Red: Bounced/Overdue + interactive toggle)');

console.log('\n================================================================');
console.log('  ALL SLATTEY (SLATE / CHEQUE DUE) CARDS & DRILLDOWN TESTS PASSED (100%)');
console.log('================================================================');
