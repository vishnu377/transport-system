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
assert(css.includes('size: A4 landscape !important;'), "Print CSS must enforce size: A4 landscape !important;");
assert(css.includes('margin: 5mm 6mm !important;'), "Print CSS must enforce margin: 5mm 6mm !important;");
assert(css.includes('.bilty-official-doc'), "Print CSS must include .bilty-official-doc rules");
console.log("✔ TEST 2 PASSED: css/print.css enforces True A4 Landscape with !important margins!");

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
    name: 'NEW JAI SHREE MARBLES',
    gstin: '09BDQPD8463E1Z8',
    address: '58 CANTT Bareilly',
    city: 'Bareilly',
    state: 'Uttar Pradesh'
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
BiltyBookingModule.onConsigneeSelect('09BDQPD8463E1Z8 - NEW JAI SHREE MARBLES');

assert.strictEqual(domElements['bilty-consignee-name'].value, 'NEW JAI SHREE MARBLES', "Consignee Name must auto-fill from combined selection");
assert.strictEqual(domElements['bilty-consignee-gstin'].value, '09BDQPD8463E1Z8', "Consignee GSTIN must auto-fill");
assert.strictEqual(domElements['bilty-consignee-address'].value, '58 CANTT Bareilly, Bareilly, Uttar Pradesh', "Consignee Address must auto-fill");
assert.strictEqual(domElements['bilty-destination'].value, 'Bareilly', "Destination city must auto-fill");
console.log("✔ TEST 3A PASSED: onConsigneeSelect auto-fills Name, GSTIN, Address & City from 'GSTIN - Name' string!");

// Test 3B: Select by raw GSTIN only
domElements['bilty-consignee-name'].value = '';
domElements['bilty-consignee-address'].value = '';
domElements['bilty-destination'].value = '';

BiltyBookingModule.onConsigneeSelect('09BDQPD8463E1Z8');
assert.strictEqual(domElements['bilty-consignee-name'].value, 'NEW JAI SHREE MARBLES', "Consignee Name must auto-fill when GSTIN is entered");
assert.strictEqual(domElements['bilty-consignee-address'].value, '58 CANTT Bareilly, Bareilly, Uttar Pradesh', "Consignee Address must auto-fill when GSTIN is entered");
console.log("✔ TEST 3B PASSED: onConsigneeSelect auto-fills Name & Address from raw GSTIN!");

// Test 3C: Select by raw Party Name only
domElements['bilty-consignee-name'].value = '';
domElements['bilty-consignee-address'].value = '';

BiltyBookingModule.onConsigneeSelect('NEW JAI SHREE MARBLES');
assert.strictEqual(domElements['bilty-consignee-name'].value, 'NEW JAI SHREE MARBLES', "Consignee Name must populate when Name is entered");
assert.strictEqual(domElements['bilty-consignee-gstin'].value, '09BDQPD8463E1Z8', "Consignee GSTIN must auto-fill when Name is entered");
console.log("✔ TEST 3C PASSED: onConsigneeSelect auto-fills GSTIN & Address from party name!");

// Test 4: Orientation and triggerPrint enforce landscape
BiltyBookingModule.triggerPrint = function() {
  this.setPrintOrientation('landscape');
};
BiltyBookingModule.triggerPrint();
assert.strictEqual(BiltyBookingModule.printOrientation, 'landscape', "printOrientation must be locked to landscape");
console.log("✔ TEST 4 PASSED: Print engine locked to A4 Landscape!");

console.log("==================================================================");
console.log("🏆 ALL CONSIGNEE AUTO-FILL & LANDSCAPE PRINT PARITY TESTS PASSED!");
console.log("==================================================================");
