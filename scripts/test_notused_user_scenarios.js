const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Testing User Uploaded Screenshots & Color Scenarios for Not Used Cheques ---');

const domElements = {};
function createMockElement(id, tagName = 'div') {
  const el = {
    id,
    tagName,
    innerText: '',
    innerHTML: '',
    value: '',
    style: {
      setProperty: function(prop, val) { this[prop] = val; }
    },
    classList: {
      classes: new Set(),
      add: (c) => el.classList.classes.add(c),
      remove: (c) => el.classList.classes.delete(c),
      contains: (c) => el.classList.classes.has(c)
    },
    querySelectorAll: (sel) => [],
    querySelector: (sel) => null,
    reset: () => { el.value = ''; }
  };
  domElements[id] = el;
  return el;
}

global.document = {
  getElementById: (id) => domElements[id] || createMockElement(id),
  querySelectorAll: (sel) => [],
  querySelector: (sel) => createMockElement('generic-query-selector'),
  addEventListener: () => {}
};

global.window = global;
global.window.location = { search: '' };
global.bootstrap = {
  Modal: class { constructor(el) {} show() {} hide() {} static getInstance(el) { return { hide() {}, show() {} }; } static getOrCreateInstance(el) { return { hide() {}, show() {} }; } },
  Offcanvas: class { constructor(el) {} show() {} hide() {} static getInstance(el) { return { hide() {}, show() {} }; } static getOrCreateInstance(el) { return { hide() {}, show() {} }; } }
};

global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => '₹ ' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  showToast: (msg, type) => console.log(` [Toast] ${type}: ${msg}`)
};

// Load datasets
eval(fs.readFileSync(path.join(__dirname, '../js/sample-parties-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-truck-owners-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-cheques-data.js'), 'utf8'));

// Mock dbService
global.dbService = {
  getAll: async (col) => {
    if (col === 'cheques') return window.INITIAL_CHEQUES_DATA || [];
    if (col === 'trips') return window.INITIAL_EXCEL_TRIPS || [];
    if (col === 'debts') return window.SAMPLE_DEBTS_DATA || [];
    return [];
  },
  add: async (col, doc) => doc,
  update: async (col, id, fields) => fields
};

// Load cheques.js
eval(fs.readFileSync(path.join(__dirname, '../js/modules/cheques.js'), 'utf8'));

async function testScenarios() {
  const mod = ChequesModule;
  await mod.init();

  console.log('\nScenario 1: Testing Pink/Magenta Cheque 117295 (Matching media_1792504207519_7e763f52.png)...');
  mod.viewNotUsedTripDetails('CHQ_NOTUSED_117295_01');
  assert.strictEqual(mod.viewMode, 'notused-settled-detail');

  // Verify Card 1 Trip Info
  const card1 = document.getElementById('settled-card1-trip-fields');
  assert(card1.innerHTML.includes('2026-2027-1386_TTC'), 'Must show GR 2026-2027-1386_TTC');
  assert(card1.innerHTML.includes('RJ52GB2509'), 'Must show Truck RJ52GB2509');
  assert(card1.innerHTML.includes('Kanpur (U.P.)'), 'Must show Destination Kanpur (U.P.)');
  assert(card1.innerHTML.includes('Mahaveer Tholiya'), 'Must show Reference Mahaveer Tholiya');
  assert(card1.innerHTML.includes('9672553254'), 'Must show Reference Mobile 9672553254');
  assert(card1.innerHTML.includes('Aasharam Gurjar'), 'Must show Driver Aasharam Gurjar');
  assert(card1.innerHTML.includes('9950561094'), 'Must show Driver Mobile 9950561094');
  assert(card1.innerHTML.includes('cleared-green-bullet'), 'Card 1 must use green bullets');

  // Verify Card 2 Cheque 1 Table
  const chqHeader = document.getElementById('settled-trip-cheques-count-header');
  assert(chqHeader.innerText.includes('Cheque 1'), 'Header must be Cheque 1');
  assert.strictEqual(chqHeader.style.color, '#00b11f', 'Header must be colored green #00b11f');

  const chqTbody = document.getElementById('settled-trip-cheques-tbody');
  assert(chqTbody.innerHTML.includes('settled-cheque-magenta'), 'Row must have class settled-cheque-magenta');
  assert(chqTbody.innerHTML.includes('#fb0a82'), 'Row bullet/text must be pink/magenta #fb0a82');
  assert(chqTbody.innerHTML.includes('117295'), 'Row must contain cheque 117295');
  assert(chqTbody.innerHTML.includes('25,000.00'), 'Row must contain amount 25,000.00');
  assert(chqTbody.innerHTML.includes('Axis'), 'Row must contain Bank Axis');
  assert(chqTbody.innerHTML.includes('TTC'), 'Row must contain Pay to TTC');

  // Verify Card 4 Financials (Green Bullets & Text)
  const elChqAmt = document.getElementById('settled-summary-chq-amount');
  const elFreight = document.getElementById('settled-summary-freight');
  const elAmtPaid = document.getElementById('settled-summary-amt-paid');
  const elPaidAmt = document.getElementById('settled-summary-paid-amt');
  assert(elChqAmt.innerHTML.includes('25,000.00'), 'Total cheque amt must be 25,000.00');
  assert(elFreight.innerHTML.includes('1,62,450.00'), 'Freight must be 1,62,450.00');
  assert(elAmtPaid.innerHTML.includes('96,875.00'), 'Amount paid must be 96,875.00');
  assert(elPaidAmt.innerHTML.includes('25,000.00'), 'Paid amount must be 25,000.00');
  assert(elChqAmt.innerHTML.includes('cleared-green-bullet'), 'Financials must use green bullet');

  // Verify Card 6 Consignee
  const elConsignee = document.getElementById('settled-consignee-name');
  assert(elConsignee.innerText.includes('SHRI BABA RAMDEV MARBLES'), 'Consignee must be SHRI BABA RAMDEV MARBLES');

  // Test Drill-down: Cheque Details Card for Magenta Cheque 117295
  console.log('\nTesting Drilldown: Cheque Details Card for Magenta Cheque 117295...');
  mod.viewNotUsedChequeDetails('CHQ_NOTUSED_117295_01');
  assert.strictEqual(mod.viewMode, 'notused-cheque-detail');

  const cardBody = document.getElementById('cleared-cheque-detail-card-body');
  assert(cardBody.innerHTML.includes('#fb0a82'), 'Cheque details card must have pink/magenta #fb0a82 text & bullets');
  assert(cardBody.innerHTML.includes('2026-2027-1386_TTC'), 'Must show Company_G.R.No.');
  assert(cardBody.innerHTML.includes('117295'), 'Must show Cheque No 117295');
  assert(cardBody.innerHTML.includes('25,000.00'), 'Must show Amount 25,000.00');
  assert(cardBody.innerHTML.includes('Axis'), 'Must show Bank Axis');
  assert(cardBody.innerHTML.includes('TTC'), 'Must show Pay to TTC');

  console.log('\nScenario 2: Testing Orange Cheque 615580 (Matching media_1792504207427_93d0c6de.png)...');
  mod.viewNotUsedTripDetails('CHQ_NOTUSED_615580_01');
  assert.strictEqual(mod.viewMode, 'notused-settled-detail');

  // Verify Card 1 Trip Info for 615580
  const card1Orange = document.getElementById('settled-card1-trip-fields');
  assert(card1Orange.innerHTML.includes('2025-2026-1093_TTC'), 'Must show GR 2025-2026-1093_TTC');
  assert(card1Orange.innerHTML.includes('RJ52GB4538'), 'Must show Truck RJ52GB4538');
  assert(card1Orange.innerHTML.includes('Azamgarh (U.P.)'), 'Must show Destination Azamgarh (U.P.)');
  assert(card1Orange.innerHTML.includes('Mukesh Kumar'), 'Must show Driver Mukesh Kumar');
  assert(card1Orange.innerHTML.includes('9783125142'), 'Must show Driver Mobile 9783125142');

  // Verify Card 2 Cheque Table for 615580
  const chqTbodyOrange = document.getElementById('settled-trip-cheques-tbody');
  assert(chqTbodyOrange.innerHTML.includes('settled-cheque-orange'), 'Row must have class settled-cheque-orange');
  assert(chqTbodyOrange.innerHTML.includes('#da7a00'), 'Row bullet/text must be orange #da7a00');
  assert(chqTbodyOrange.innerHTML.includes('615580'), 'Row must contain cheque 615580');
  assert(chqTbodyOrange.innerHTML.includes('1,00,000.00'), 'Row must contain amount 1,00,000.00');
  assert(chqTbodyOrange.innerHTML.includes('Indian Bank'), 'Row must contain Bank Indian Bank');

  // Verify Card 4 Financials for 615580
  const elChqAmtOrange = document.getElementById('settled-summary-chq-amount');
  assert(elChqAmtOrange.innerHTML.includes('1,00,000.00'), 'Total cheque amt must be 1,00,000.00');

  // Verify Card 6 Consignee for 615580
  const elConsigneeOrange = document.getElementById('settled-consignee-name');
  assert(elConsigneeOrange.innerText.includes('Azamgarh'), 'Consignee must be Azamgarh');

  // Test Drill-down: Cheque Details Card for Orange Cheque 615580
  console.log('\nTesting Drilldown: Cheque Details Card for Orange Cheque 615580...');
  mod.viewNotUsedChequeDetails('CHQ_NOTUSED_615580_01');
  assert.strictEqual(mod.viewMode, 'notused-cheque-detail');

  const cardBodyOrange = document.getElementById('cleared-cheque-detail-card-body');
  assert(cardBodyOrange.innerHTML.includes('#da7a00'), 'Cheque details card must have orange #da7a00 text & bullets');
  assert(cardBodyOrange.innerHTML.includes('2025-2026-1093_TTC'), 'Must show Company_G.R.No.');
  assert(cardBodyOrange.innerHTML.includes('615580'), 'Must show Cheque No 615580');
  assert(cardBodyOrange.innerHTML.includes('1,00,000.00'), 'Must show Amount 1,00,000.00');
  assert(cardBodyOrange.innerHTML.includes('Indian Bank'), 'Must show Bank Indian Bank');

  console.log('\n✔ All User Uploaded Screen Scenarios Verified 100% Successfully!');
}

testScenarios().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
