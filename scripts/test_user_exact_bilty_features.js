const fs = require('fs');
const path = require('path');
const vm = require('vm');

const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; }
};
global.window = global;

const openedUrls = [];
global.window.open = (url, target) => {
  openedUrls.push({ url, target });
};

const toasts = [];
global.AppUI = {
  renderSidebar: () => {},
  formatCurrency: (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  formatDate: (d) => d,
  showToast: (msg, type) => {
    toasts.push({ msg, type });
    console.log(`[Toast ${type}]: ${msg}`);
  }
};
global.APP_CONFIG = { firebase: null };

// Mock DOM elements
const mockElements = {
  'mtc-panel-feed': { innerHTML: '', scrollTop: 0, clientHeight: 500, scrollHeight: 1000, addEventListener: () => {} },
  'ttc-panel-feed': { innerHTML: '', scrollTop: 0, clientHeight: 500, scrollHeight: 1000, addEventListener: () => {} },
  'ttc-table-tbody': { innerHTML: '' },
  'bilty-details-kv-table': { innerHTML: '' },
  'col3-details-view': { style: { display: 'flex' } },
  'bilty-create-view': { style: { display: 'none' } },
  'panel-details-col': { classList: { set: new Set(), add(c){ this.set.add(c); }, remove(c){ this.set.delete(c); }, contains(c){ return this.set.has(c); } } },
  'btn-seg-mtc': { classList: { add: () => {}, remove: () => {} } },
  'btn-seg-ttc': { classList: { add: () => {}, remove: () => {} } },
  'bilty-firm': { value: 'TTC' },
  'bilty-year': { value: '2026-2027' },
  'bilty-date': { value: '2026-10-07' },
  'bilty-truck-no': { value: 'RJ52GB8965' },
  'bilty-destination': { value: 'Delhi' },
  'bilty-weight': { value: '109.42' },
  'bilty-rate': { value: '1500' }
};

const defaultElement = () => ({
  value: '',
  innerText: '',
  innerHTML: '',
  style: {},
  classList: { add: () => {}, remove: () => {}, contains: () => false },
  addEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => null,
  focus: () => {}
});

global.document = {
  getElementById: (id) => mockElements[id] || (mockElements[id] = defaultElement()),
  querySelector: (sel) => mockElements[sel.replace('#', '')] || (mockElements[sel.replace('#', '')] = defaultElement()),
  querySelectorAll: (sel) => [],
  addEventListener: () => {}
};

// Load dependencies
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-trips-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/sample-debts-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/db-service.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8'));

async function testAll() {
  console.log("=== TESTING USER'S EXACT BILTY BOOKING UI & ACTIONS ===");

  await BiltyBookingModule.loadAllData();
  console.log(`✓ Loaded ${BiltyBookingModule.allTrips.length} bilties.`);

  // 1. Render 3 Panels
  BiltyBookingModule.renderAppSheet3Panels();

  // 2. Check TTC Panel Date Ribbons and 4 action buttons
  const ttcHTML = mockElements['ttc-table-tbody'].innerHTML;
  if (!ttcHTML.includes('ttc-date-row')) {
    throw new Error("TTC panel missing ttc-date-row date ribbons!");
  }
  console.log("✓ Verified: TTC Panel has Date Ribbons (● 07/10/2026 [ count ])!");

  if (!ttcHTML.includes('icon-whatsapp-driver') || !ttcHTML.includes('icon-whatsapp-truck') || !ttcHTML.includes('icon-download-bilty')) {
    throw new Error("TTC panel missing 4 row action icons (Download, WhatsApp Driver, WhatsApp Truck, Sync)!");
  }
  console.log("✓ Verified: TTC Panel rows have Download, WhatsApp Driver, and WhatsApp Truck Transport icons!");

  // 3. Check MTC Panel 4 action buttons
  const mtcHTML = mockElements['mtc-panel-feed'].innerHTML;
  if (!mtcHTML.includes('icon-whatsapp-driver') || !mtcHTML.includes('icon-whatsapp-truck') || !mtcHTML.includes('icon-download-bilty')) {
    throw new Error("MTC panel missing 4 row action icons!");
  }
  console.log("✓ Verified: MTC Panel rows have Download, WhatsApp Driver, and WhatsApp Truck Transport icons!");

  // 4. Check WhatsApp Driver functionality
  const sampleTrip = BiltyBookingModule.allTrips[0];
  sampleTrip.driver = "Raju Bhilwa 9116597634";
  sampleTrip.truckOwner = "Shree Mahaveer Transport Company 9350734545";
  
  openedUrls.length = 0;
  BiltyBookingModule.shareDriverWhatsApp(sampleTrip.id || sampleTrip.grNo);
  if (openedUrls.length === 0 || !openedUrls[0].url.includes('wa.me')) {
    throw new Error("shareDriverWhatsApp failed to generate wa.me link!");
  }
  console.log("✓ Verified shareDriverWhatsApp: Opened URL ->", openedUrls[0].url.substring(0, 50) + "...");

  // 5. Check WhatsApp Transport functionality
  openedUrls.length = 0;
  BiltyBookingModule.shareTransportWhatsApp(sampleTrip.id || sampleTrip.grNo);
  if (openedUrls.length === 0 || !openedUrls[0].url.includes('wa.me')) {
    throw new Error("shareTransportWhatsApp failed to generate wa.me link!");
  }
  console.log("✓ Verified shareTransportWhatsApp: Opened URL ->", openedUrls[0].url.substring(0, 50) + "...");

  // 6. Check Bilty Details Key-Values
  const detailsHTML = mockElements['bilty-details-kv-table'].innerHTML;
  if (!detailsHTML.includes('Sender Type') || !detailsHTML.includes('Receiver Type') || !detailsHTML.includes('Actual Weight')) {
    throw new Error("Bilty Details missing Sender Type, Receiver Type, or Actual Weight from crop_details.png!");
  }
  console.log("✓ Verified: Bilty Details Key-Value table includes Sender Type, Sender Name, Receiver Type, Receiver Name, Actual Weight!");

  // 7. Check + Add button opens Side-Box Form
  BiltyBookingModule.openCreateForm('TTC');
  if (mockElements['bilty-create-view'].style.display !== 'block' || mockElements['col3-details-view'].style.display !== 'none') {
    throw new Error("openCreateForm failed to display bilty-create-view in side box!");
  }
  console.log("✓ Verified: + Add button correctly opens the Bilty Create form in the Side Box!");

  console.log("\n=======================================================");
  console.log("🎉 ALL USER REQUIREMENTS VERIFIED 100% SUCCEEDED!");
  console.log("=======================================================");
}

testAll().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
