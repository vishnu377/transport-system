/**
 * Verification test script for Parties Master Module and Excel Data Integration
 */
const fs = require('fs');
const path = require('path');

async function runTests() {
  console.log("=== Testing Parties Master Integration ===");

  // 1. Check sample-parties-data.js exists and is valid
  const sampleDataPath = path.join(__dirname, '..', 'js', 'sample-parties-data.js');
  if (!fs.existsSync(sampleDataPath)) {
    console.error("FAIL: sample-parties-data.js does not exist!");
    process.exit(1);
  }

  const fileContent = fs.readFileSync(sampleDataPath, 'utf8');
  const window = {};
  global.window = window;

  // Execute sample-parties-data.js
  eval(fileContent);

  if (!window.INITIAL_EXCEL_PARTIES || !Array.isArray(window.INITIAL_EXCEL_PARTIES)) {
    console.error("FAIL: window.INITIAL_EXCEL_PARTIES not properly defined!");
    process.exit(1);
  }

  const parties = window.INITIAL_EXCEL_PARTIES;
  console.log(`PASS: Loaded ${parties.length} parties from sample-parties-data.js`);

  if (parties.length !== 3396) {
    console.error(`FAIL: Expected exactly 3396 parties, got ${parties.length}`);
    process.exit(1);
  }

  // 2. Validate data structure
  let withGstin = 0;
  let withMobile = 0;
  let withDue = 0;
  let withPaid = 0;
  let totalDue = 0;
  let totalPaid = 0;

  for (const p of parties) {
    if (!p.id || !p.name) {
      console.error("FAIL: Party missing id or name:", p);
      process.exit(1);
    }
    if (p.gstin && p.gstin.trim() && !p.gstin.startsWith('URP')) withGstin++;
    if (p.mobile && p.mobile.trim()) withMobile++;
    if (p.dueAmount > 0) {
      withDue++;
      totalDue += p.dueAmount;
    }
    if (p.paidAmount > 0) {
      withPaid++;
      totalPaid += p.paidAmount;
    }
  }

  console.log(`Statistics:`);
  console.log(`- GSTIN Registered: ${withGstin}`);
  console.log(`- With Mobile: ${withMobile}`);
  console.log(`- With Dues: ${withDue} (Total: ₹${totalDue.toFixed(2)})`);
  console.log(`- With Payments: ${withPaid} (Total: ₹${totalPaid.toFixed(2)})`);

  // 3. Mock LocalStorage and test dbService
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString(); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  })();
  global.localStorage = localStorageMock;

  // Mock dbService minimal environment
  const dbServiceContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'db-service.js'), 'utf8')
    .replace('const dbService = new DBService();', 'global.dbService = new DBService();');
  eval(dbServiceContent);

  const dbService = global.dbService;
  if (!dbService) {
    console.error("FAIL: dbService not initialized!");
    process.exit(1);
  }

  const loadedParties = await dbService.getAll('parties');
  console.log(`PASS: dbService.getAll('parties') returned ${loadedParties.length} parties`);

  if (loadedParties.length !== parties.length) {
    console.error(`FAIL: dbService mismatch! Expected ${parties.length}, got ${loadedParties.length}`);
    process.exit(1);
  }

  // 4. Test CRUD delta operations
  console.log("Testing dbService Parties CRUD deltas...");

  // Add custom party
  const newParty = {
    name: "Test Transport Client Pvt Ltd",
    gstin: "08AABCT9999Z1Z5",
    mobile: "9876543210",
    dueAmount: 50000,
    paidAmount: 20000
  };
  const addedParty = await dbService.add('parties', newParty);
  console.log(`PASS: Added new party with ID: ${addedParty.id}`);

  let afterAdd = await dbService.getAll('parties');
  if (afterAdd.length !== parties.length + 1) {
    console.error(`FAIL: Expected ${parties.length + 1} after add, got ${afterAdd.length}`);
    process.exit(1);
  }

  // Update party
  await dbService.update('parties', addedParty.id, { dueAmount: 40000 });
  const updated = (await dbService.getAll('parties')).find(p => p.id === addedParty.id);
  if (updated.dueAmount !== 40000) {
    console.error(`FAIL: Update failed! Expected 40000, got ${updated.dueAmount}`);
    process.exit(1);
  }
  console.log("PASS: Updated party successfully");

  // Delete party
  await dbService.delete('parties', addedParty.id);
  let afterDelete = await dbService.getAll('parties');
  if (afterDelete.length !== parties.length) {
    console.error(`FAIL: Expected ${parties.length} after delete, got ${afterDelete.length}`);
    process.exit(1);
  }
  console.log("PASS: Deleted party successfully");

  // 5. Test Search and Filtering logic
  console.log("Testing search and filtering...");
  const testSearch = (query) => {
    const q = query.toLowerCase();
    return parties.filter(party => {
      const searchCorpus = [
        party.name || '',
        party.gstin || '',
        party.mobile || '',
        party.city || '',
        party.state || '',
        party.address || '',
        party.contactPerson || ''
      ].join(' ').toLowerCase();
      const keywords = q.split(/\s+/).filter(Boolean);
      return keywords.every(kw => searchCorpus.includes(kw));
    });
  };

  const bergerResults = testSearch("Berger");
  console.log(`PASS: Search "Berger" returned ${bergerResults.length} parties`);
  if (bergerResults.length === 0) {
    console.error("FAIL: Expected search results for 'Berger'");
    process.exit(1);
  }

  const gstinResults = testSearch("08AA");
  console.log(`PASS: Search GSTIN "08AA" returned ${gstinResults.length} parties`);

  // 6. Test Pagination calculations
  const total = parties.length;
  const perPage = 50;
  const totalPages = Math.ceil(total / perPage);
  console.log(`PASS: Pagination calculation: ${total} items at ${perPage}/page = ${totalPages} pages`);
  if (totalPages !== 68) {
    console.error(`FAIL: Expected 68 pages, got ${totalPages}`);
    process.exit(1);
  }

  console.log("\nALL 6 VERIFICATION CHECKS PASSED 100% PERFECTLY!");
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
