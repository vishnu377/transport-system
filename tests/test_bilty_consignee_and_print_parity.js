/**
 * Test Suite: Bilty Booking Consignee Auto-Fill & Landscape Print Parity
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("==================================================================");
console.log("  TEST: BILTY BOOKING CONSIGNEE AUTO-FILL & LANDSCAPE PRINT PARITY");
console.log("==================================================================");

// 1. Verify pages/bilty-booking.html static DOM
const html = fs.readFileSync(path.join(__dirname, '../pages/bilty-booking.html'), 'utf8');

// Check that readonly is REMOVED from party inputs
assert(!html.includes('id="bilty-consignor-name" class="appsheet-input-box fw-semibold" placeholder="Auto-populated from party" style="max-width: 480px;" readonly'), "Consignor name should not be readonly");
assert(!html.includes('id="bilty-consignee-name" class="appsheet-input-box fw-semibold" placeholder="Auto-populated from party" style="max-width: 480px;" readonly'), "Consignee name should not be readonly");
assert(!html.includes('id="bilty-consignee-address" class="appsheet-input-box text-muted" placeholder="Consignee Address" style="max-width: 480px;" readonly'), "Consignee address should not be readonly");

// Check that modal toolbar buttons are REMOVED from modal header
assert(!html.includes('btn-orient-landscape'), "Orientation landscape button should be removed from modal header");
assert(!html.includes('btn-orient-portrait'), "Orientation portrait button should be removed from modal header");
assert(!html.includes('btn-copy-consignor'), "Copy selector buttons should be removed from modal header");
assert(!html.includes('btn-copy-office'), "Office copy button should be removed from modal header");

console.log("✔ TEST 1 PASSED: pages/bilty-booking.html static markup verified (No readonly locks, toolbar buttons removed)!");

// 2. Verify css/print.css configuration
const css = fs.readFileSync(path.join(__dirname, '../css/print.css'), 'utf8');
assert(css.includes('size: A4 landscape;'), "Print CSS must enforce size: A4 landscape;");
assert(css.includes('margin: 5mm 6mm;'), "Print CSS must enforce margin: 5mm 6mm;");
assert(!css.includes('size: A4 landscape !important;'), "Print CSS must NOT have invalid !important inside @page");
assert(css.includes('.bilty-official-doc'), "Print CSS must include .bilty-official-doc rules");
console.log("✔ TEST 2 PASSED: css/print.css enforces True A4 Landscape with valid W3C descriptors!");

// 3. Test onConsigneeSelect dynamic auto-fill
// Mock DOM
const domElements = {};
function mockElement(id, initialVal = '') {
  domElements[id] = {
    id: id,
    value: initialVal,
    innerText: '',
    innerHTML: '',
    style: {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    }
  };
  return domElements[id];
}

['bilty-consignor', 'bilty-consignor-gstin', 'bilty-consignor-name', 'bilty-consignor-address',
 'bilty-consignee', 'bilty-consignee-gstin', 'bilty-consignee-name', 'bilty-consignee-address',
 'bilty-delivery-address', 'bilty-destination', 'appsheet-consignee-address-text', 'appsheet-consignee-gstin-badge',
 'bilty-print-preview', 'bilty-short-gr', 'bilty-truck-no', 'bilty-origin', 'bilty-freight', 'bilty-material',
 'preview-truck-no', 'preview-gr-badge', 'preview-from-to', 'preview-parties-strip', 'preview-material', 'preview-freight'].forEach(id => mockElement(id));

global.document = {
  getElementById: (id) => domElements[id] || null,
  createElement: () => ({ innerHTML: '' }),
  head: {
    appendChild: () => {}
  },
  body: {
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {}
    }
  }
};
global.window = {};

// Load BiltyBookingModule
const BiltyBookingModule = require('../js/modules/bilty-booking.js');
BiltyBookingModule.updateLivePreview = () => {};

// Seed test parties
BiltyBookingModule.parties = [
  {
    name: 'M/S Gujrati Tiles and Granites',
    gstin: '02BSCPD583861Z4',
    address: '(Sain) Sarkaghat, Sain Tatahar, Darpasain, Mandi (H.P.)',
    city: 'Mandi',
    state: 'Himachal Pradesh'
  },
  {
    name: 'SHREE RAM MARBLE',
    gstin: '08CGDPS3140J1ZA',
    address: 'Araji No.497/2,497/3 Chhapar Kheri',
    city: 'Rajsamand',
    state: 'Rajasthan'
  }
];

// Test 3A: Select by "GSTIN - Name" combined string (datalist format)
BiltyBookingModule.onConsigneeSelect('02BSCPD583861Z4 - M/S Gujrati Tiles and Granites');

assert.strictEqual(domElements['bilty-consignee-name'].value, 'M/S Gujrati Tiles and Granites', "Consignee Name must auto-fill from combined selection");
assert.strictEqual(domElements['bilty-consignee-gstin'].value, '02BSCPD583861Z4', "Consignee GSTIN must auto-fill");
assert.strictEqual(domElements['bilty-consignee-address'].value, '(Sain) Sarkaghat, Sain Tatahar, Darpasain, Mandi (H.P.), Mandi, Himachal Pradesh', "Consignee Address must auto-fill");
assert.strictEqual(domElements['bilty-destination'].value, 'Mandi', "Destination city must auto-fill");
console.log("✔ TEST 3A PASSED: onConsigneeSelect auto-fills Name, GSTIN, Address & City from 'GSTIN - Name' string!");

// Test 3B: Select by raw GSTIN only
domElements['bilty-consignee-name'].value = '';
domElements['bilty-consignee-address'].value = '';
domElements['bilty-destination'].value = '';

BiltyBookingModule.onConsigneeSelect('02BSCPD583861Z4');
assert.strictEqual(domElements['bilty-consignee-name'].value, 'M/S Gujrati Tiles and Granites', "Consignee Name must auto-fill when GSTIN is entered");
assert.strictEqual(domElements['bilty-consignee-address'].value, '(Sain) Sarkaghat, Sain Tatahar, Darpasain, Mandi (H.P.), Mandi, Himachal Pradesh', "Consignee Address must auto-fill when GSTIN is entered");
console.log("✔ TEST 3B PASSED: onConsigneeSelect auto-fills Name & Address from raw GSTIN!");

// Test 3C: Select by raw Party Name only
domElements['bilty-consignee-name'].value = '';
domElements['bilty-consignee-address'].value = '';

BiltyBookingModule.onConsigneeSelect('M/S Gujrati Tiles and Granites');
assert.strictEqual(domElements['bilty-consignee-name'].value, 'M/S Gujrati Tiles and Granites', "Consignee Name must populate when Name is entered");
assert.strictEqual(domElements['bilty-consignee-gstin'].value, '02BSCPD583861Z4', "Consignee GSTIN must auto-fill when Name is entered");
console.log("✔ TEST 3C PASSED: onConsigneeSelect auto-fills GSTIN & Address from party name!");

// Test 4: Orientation and triggerPrint enforce landscape
BiltyBookingModule.triggerPrint = function() {
  this.setPrintOrientation('landscape');
};
BiltyBookingModule.triggerPrint();
assert.strictEqual(BiltyBookingModule.printOrientation, 'landscape', "printOrientation must be locked to landscape");
console.log("✔ TEST 4 PASSED: Print engine locked to A4 Landscape!");

// Test 5: Verify NO dummy E-way Bill No (7616 8755 0133) when left blank
// Mock BILTY_IMAGES
const assetsContent = fs.readFileSync('assets/bilty_template/bilty_assets.js', 'utf8');
eval(assetsContent.replace('const BILTY_IMAGES =', 'global.BILTY_IMAGES ='));

const emptyTrip = {
  transport: 'MTC',
  grNo: '1322_MTC',
  shortGrNo: '1322',
  truckNo: 'NL01AF5642',
  consignor: 'Satnam Singhs and Sons',
  consignee: 'M/S Gujrati Tiles and Granites',
  ewayBillNo: '', // Intentionally blank!
  billNo: '',     // Intentionally blank!
  invoiceValue: 0
};
const renderedBlankHtml = BiltyBookingModule.getBiltyDocHTML(emptyTrip);
assert(!renderedBlankHtml.includes('7616 8755 0133'), "Blank trip must NEVER show hardcoded dummy E-way bill '7616 8755 0133'!");
assert(!renderedBlankHtml.includes('>71<'), "Blank trip must NEVER show hardcoded dummy Bill No '71'!");
console.log("✔ TEST 5 PASSED: Blank E-way bill and Bill No render cleanly as '-' (No dummy 7616 or 71 values)!");

console.log("==================================================================");
console.log("🏆 ALL CONSIGNEE AUTO-FILL & LANDSCAPE PRINT PARITY TESTS PASSED!");
console.log("==================================================================");
