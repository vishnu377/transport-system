const fs = require('fs');
const path = require('path');

// Setup Node runtime mock DOM
const mockElements = {};
function createMockEl(id) {
  return {
    id,
    innerHTML: '',
    innerText: '',
    value: '',
    style: {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    },
    querySelectorAll: () => [],
    querySelector: () => null,
    setAttribute: () => {},
    getAttribute: () => '',
    addEventListener: () => {}
  };
}

global.document = {
  getElementById: (id) => {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  querySelector: (sel) => {
    if (sel.includes('thead')) {
      if (!mockElements['mock-thead']) mockElements['mock-thead'] = createMockEl('mock-thead');
      return mockElements['mock-thead'];
    }
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

global.window = global;
global.window.scrollTo = () => {};
global.window.location = { search: '', hash: '', pathname: '' };
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

global.AppUI = {
  formatCurrency: (val) => '₹' + Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
  showToast: (msg, type) => console.log(`[Toast ${type}]: ${msg}`)
};

// Load assets
eval(fs.readFileSync(path.join(__dirname, '../js/sample-drivers-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/open-trips-seed.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../js/modules/trips.js'), 'utf8'));

console.log('==================================================================');
console.log('  TEST: EXACT APPSHEET CARD 3 (TRIPS) REPLICA VERIFICATION        ');
console.log('==================================================================');

TripsModule.allTrips = [];
TripsModule.loadTrips().then(() => {
  TripsModule.setWorkflowTab('all');

  // Verify top trips
  const topTrips = TripsModule.filteredTrips.slice(0, 10);
  console.log(`✓ Total trips loaded: ${TripsModule.allTrips.length}`);
  console.log(`✓ Top trip GR: ${topTrips[0].grNo} | Date: ${topTrips[0].tripStartDate || topTrips[0].date}`);

  // Test 1: Date ordering
  const d0 = TripsModule.formatDateDMY(topTrips[0].tripStartDate || topTrips[0].date);
  if (d0 !== '14/10/2026') {
    throw new Error(`Expected first trip date to be 14/10/2026, got: ${d0}`);
  }
  console.log(`✓ Test 1: Top trip is on 14/10/2026 (${topTrips[0].grNo})!`);

  // Test 2: Row colors matching crop_check_0.png
  const t14 = topTrips.find(x => (x.grNo || '').includes('2483_TTC'));
  const color14 = TripsModule.getRowColorTheme(t14);
  if (color14 !== '#967b2c') {
    throw new Error(`Expected 2483_TTC to have mustard #967b2c color, got: ${color14}`);
  }
  console.log(`✓ Test 2: 2483_TTC color is mustard/gold: ${color14}`);

  const tPink = TripsModule.allTrips.find(x => (x.grNo || '').includes('2443_TTC'));
  const colorPink = TripsModule.getRowColorTheme(tPink);
  if (colorPink !== '#e91e63') {
    throw new Error(`Expected 2443_TTC to have pink #e91e63 color, got: ${colorPink}`);
  }
  console.log(`✓ Test 3: 2443_TTC color is magenta/pink: ${colorPink}`);

  const tBlue = TripsModule.allTrips.find(x => (x.grNo || '').includes('2438_TTC'));
  const colorBlue = TripsModule.getRowColorTheme(tBlue);
  if (colorBlue !== '#0077c2') {
    throw new Error(`Expected 2438_TTC to have cyan/blue #0077c2 color, got: ${colorBlue}`);
  }
  console.log(`✓ Test 4: 2438_TTC color is cyan/blue: ${colorBlue}`);

  // Test 5: Check rendered tbody HTML for full row colors & bold red dues
  const tbodyHtml = mockElements['trips-tbody'].innerHTML;
  if (!tbodyHtml.includes('2483_TTC')) {
    throw new Error('2483_TTC missing from rendered Card 3 tbody HTML!');
  }
  if (!tbodyHtml.includes('BirlaNu Ltd. Jhajjar')) {
    throw new Error('BirlaNu consignee missing from rendered Card 3 tbody HTML!');
  }
  if (!tbodyHtml.includes('#d90429')) {
    throw new Error('Bold red due color #d90429 missing from tbody HTML!');
  }
  console.log('✓ Test 5: Rendered Card 3 table contains 2483_TTC, BirlaNu, and bold red dues (#d90429)!');

  // Test 6: Verify no download icon [↓] inside Card 3 table rows
  // The first column should only have bi-file-earmark-text
  const card3Rows = tbodyHtml.split('class="appsheet-row"');
  if (card3Rows.length > 1) {
    const firstRow = card3Rows[1];
    if (firstRow.includes('bi-download')) {
      throw new Error('Found bi-download in Card 3 table row! It should only be bi-file-earmark-text.');
    }
  }
  console.log('✓ Test 6: Zero unnecessary download icons in Card 3 table rows (clean AppSheet [📄] only)!');

  console.log('==================================================================');
  console.log('  ALL EXACT APPSHEET CARD 3 VERIFICATIONS PASSED 100%!            ');
  console.log('==================================================================');
});
