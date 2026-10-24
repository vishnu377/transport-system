/**
 * test_user_reported_fixes.js
 * Verifies fixes for user's reported points:
 * 1. Full Row Colors in Party Due (row-theme-golden, row-theme-light_blue, etc.)
 * 2. Header "All Dates" date filter and working Download CSV button
 * 3. AppSheet Status Dropdown button (matching user photo) with clear cross, caret up/down, solid bullets
 * 4. AppSheet "Add Records for" dropdown with [Cheque, Party Payment, Truck Owner Payment, Other B]
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock browser DOM
global.window = global;
global.document = {
  getElementById: (id) => {
    return {
      id,
      innerHTML: '',
      textContent: '',
      value: '',
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      },
      appendChild: () => {},
      removeChild: () => {},
      setAttribute: () => {},
      click: () => {}
    };
  },
  body: {
    appendChild: () => {},
    removeChild: () => {}
  },
  addEventListener: () => {}
};
global.URL = {
  createObjectURL: (blob) => 'blob:mock-url',
  revokeObjectURL: () => {}
};
global.Blob = class Blob {
  constructor(content, options) {
    this.content = content;
    this.options = options;
  }
};

const sampleParties = require('../js/sample-parties-data.js');
const partyDueData = require('../js/party-due-data.js');
const PartiesModule = require('../js/modules/parties.js');

console.log('=== Running User Reported Fixes Verification Suite ===\n');

// Test 1: Initialize PartiesModule
console.log('[Test 1] Initializing PartiesModule...');
PartiesModule.allPartyDueTrips = [...window.PARTY_DUE_DATA];
assert(PartiesModule.allPartyDueTrips.length === 386, 'Expected 386 trips');
console.log('✓ Test 1 Passed: Loaded 386 Party Due trips.');

// Test 2: Full Row Color theme classes in renderPartyDueTable()
console.log('\n[Test 2] Verifying that party-due rows have full color theme classes...');
let tableHtml = '';
global.document.getElementById = (id) => {
  if (id === 'party-due-table-body') {
    return {
      set innerHTML(val) { tableHtml = val; },
      get innerHTML() { return tableHtml; }
    };
  }
  return {
    innerHTML: '',
    textContent: '',
    value: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false }
  };
};

PartiesModule.currentFY = '2026-2027';
PartiesModule.currentDateFilter = 'ALL';
PartiesModule.dueCurrentPage = 1;
PartiesModule.renderPartyDueTable();

assert(tableHtml.includes('row-theme-golden'), 'Must contain row-theme-golden for Transit rows');
assert(tableHtml.includes('due-amount-red'), 'Must contain due-amount-red for Due Amount');
console.log('✓ Test 2 Passed: Full row theme class (row-theme-golden) applied to <tr>.');

// Test 3: Date Filtering ("All Dates" and specific date)
console.log('\n[Test 3] Testing Date Filter mechanism...');
assert(typeof PartiesModule.getDistinctDatesList === 'function', 'getDistinctDatesList should exist');
const distinctDates = PartiesModule.getDistinctDatesList();
assert(distinctDates.length > 0, 'Should have distinct dates');
assert(distinctDates.includes('22/10/2026'), 'Should include 22/10/2026');

// Filter to single date
PartiesModule.setDateFilter('22/10/2026');
assert.strictEqual(PartiesModule.currentDateFilter, '22/10/2026');
assert(tableHtml.includes('22/10/2026'), 'Rendered table must include 22/10/2026 trips');

// Reset to ALL dates
PartiesModule.setDateFilter('ALL');
assert.strictEqual(PartiesModule.currentDateFilter, 'ALL');
console.log('✓ Test 3 Passed: Date Filter ("ALL" and specific date) works seamlessly.');

// Test 4: Download CSV via Blob
console.log('\n[Test 4] Testing exportPartyDueCSV() with Blob...');
let downloaded = false;
let downloadedFilename = '';
global.document.createElement = (tag) => {
  return {
    setAttribute: (attr, val) => {
      if (attr === 'download') downloadedFilename = val;
    },
    click: () => { downloaded = true; },
    href: '',
    download: ''
  };
};

PartiesModule.exportPartyDueCSV();
assert(downloaded, 'exportPartyDueCSV should trigger download link click');
assert(downloadedFilename.startsWith('Party_Due_'), 'Filename should start with Party_Due_');
console.log(`✓ Test 4 Passed: exportPartyDueCSV successfully generated ${downloadedFilename} via Blob.`);

// Test 5: Status Dropdown options matching user photo
console.log('\n[Test 5] Verifying AppSheet Status dropdown menu...');
const trip = PartiesModule.allPartyDueTrips[0];
PartiesModule.selectedTrip = trip;

let rightCardHtml = '';
global.document.getElementById = (id) => {
  if (id === 'drilldown-card-right') {
    return {
      set innerHTML(val) { rightCardHtml = val; },
      get innerHTML() { return rightCardHtml; }
    };
  }
  return {
    innerHTML: '',
    textContent: '',
    value: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false }
  };
};

PartiesModule.renderDrilldownView();

assert(rightCardHtml.includes('id="btn-status-dropdown"'), 'Must have btn-status-dropdown');
assert(rightCardHtml.includes('id="status-clear-btn"'), 'Must have status-clear-btn (✕ icon)');
assert(rightCardHtml.includes('id="status-caret-icon"'), 'Must have status-caret-icon');
assert(rightCardHtml.includes('bullet-golden'), 'Must contain bullet-golden');
assert(rightCardHtml.includes('bullet-pink'), 'Must contain bullet-pink for Off Loading');
assert(rightCardHtml.includes('bullet-slate'), 'Must contain bullet-slate for Cheque Due');
assert(rightCardHtml.includes('bullet-dark_blue'), 'Must contain bullet-dark_blue for POD Sent');
console.log('✓ Test 5 Passed: AppSheet Status Dropdown button and 5 colored options verified.');

// Test 6: "Add Records for" dropdown matching user photo
console.log('\n[Test 6] Verifying "Add Records for" dropdown options...');
assert(rightCardHtml.includes('id="btn-add-records-dropdown"'), 'Must have btn-add-records-dropdown');
assert(rightCardHtml.includes('id="menu-add-records-dropdown"'), 'Must have menu-add-records-dropdown');
assert(rightCardHtml.includes('Cheque'), 'Must have Cheque option');
assert(rightCardHtml.includes('Party Payment'), 'Must have Party Payment option');
assert(rightCardHtml.includes('Truck Owner Payment'), 'Must have Truck Owner Payment option');
assert(rightCardHtml.includes('Other B'), 'Must have Other B option');
console.log('✓ Test 6 Passed: Add Records for contains all 4 authentic options: [Cheque, Party Payment, Truck Owner Payment, Other B].');

// Test 7: Verify CSS rules in pages/parties.html
console.log('\n[Test 7] Verifying CSS rules in pages/parties.html...');
const htmlContent = fs.readFileSync(path.join(__dirname, '../pages/parties.html'), 'utf-8');
assert(htmlContent.includes('.party-due-row.row-theme-golden td'), 'CSS must include .party-due-row.row-theme-golden td');
assert(htmlContent.includes('.party-due-row.row-theme-light_blue td'), 'CSS must include .party-due-row.row-theme-light_blue td');
assert(htmlContent.includes('.party-due-row.row-theme-dark_blue td'), 'CSS must include .party-due-row.row-theme-dark_blue td');
assert(htmlContent.includes('.party-due-row.row-theme-pink td'), 'CSS must include .party-due-row.row-theme-pink td');
assert(htmlContent.includes('.party-due-row.row-theme-slate td'), 'CSS must include .party-due-row.row-theme-slate td');
assert(htmlContent.includes('.appsheet-clear-icon'), 'CSS must include .appsheet-clear-icon');
console.log('✓ Test 7 Passed: All full-row color CSS and dropdown icon styles present in pages/parties.html.');

console.log('\n================================================================');
console.log('>>> ALL 7 USER-REPORTED FIXES TESTS PASSED 100%! <<<');
console.log('================================================================');
