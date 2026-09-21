const fs = require('fs');

global.window = {};
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

const sampleCode = fs.readFileSync('js/sample-trips-data.js', 'utf-8');
const configCode = fs.readFileSync('js/config.js', 'utf-8');
const dbCode = fs.readFileSync('js/db-service.js', 'utf-8');

// Run in global scope
const vm = require('vm');
vm.runInThisContext(sampleCode);
vm.runInThisContext(configCode);
vm.runInThisContext(dbCode);

dbService.getAll('trips').then(trips => {
  console.log('window.INITIAL_EXCEL_TRIPS count:', window.INITIAL_EXCEL_TRIPS.length);
  console.log('dbService.getAll("trips") returned count:', trips.length);
  console.log('First trip:', trips[0].grNo, '| Truck:', trips[0].truckNo);
  console.log('Last trip:', trips[trips.length - 1].grNo, '| Truck:', trips[trips.length - 1].truckNo);
  console.log('TEST PASSED SUCCESSFULLY!');
  process.exit(0);
}).catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
