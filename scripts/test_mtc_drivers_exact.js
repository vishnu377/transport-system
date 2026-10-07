const fs = require('fs');
const vm = require('vm');

global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.APP_CONFIG = { firebase: null };
global.AppUI = { renderSidebar: () => {}, formatCurrency: n => n, formatDate: d => d };

const mockElements = {
  'mtc-panel-feed': { innerHTML: '', addEventListener: () => {} },
  'ttc-panel-feed': { innerHTML: '', addEventListener: () => {} },
  'ttc-table-tbody': { innerHTML: '' },
  'bilty-details-kv-table': { innerHTML: '' }
};
global.document = {
  getElementById: id => mockElements[id] || { innerHTML: '', value: '', addEventListener: () => {} },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

vm.runInThisContext(fs.readFileSync('./js/sample-drivers-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/sample-trips-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/sample-debts-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/db-service.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/modules/bilty-booking.js', 'utf8'));

async function verifyMtc() {
  await BiltyBookingModule.loadAllData();
  BiltyBookingModule.renderAppSheet3Panels();

  const expected = [
    { gr: '716_MTC', truck: 'RJ01GC0951', dest: 'Deoband (U.P.)', party: 'Chel singh Charan', driver: 'Debu Rawat', date: '05/10/2024' },
    { gr: '715_MTC', truck: 'RJ52GA3498', dest: 'Kanpur (U.P.)', party: 'Tulsaram Rad/Vinod Dadhich', driver: 'Bajrang Meena', date: '04/10/2024' },
    { gr: '714_MTC', truck: 'RJ32GB5897', dest: 'Morbi (Gujrat)', party: 'Ashok Madhusudan Morbi', driver: 'Prakash Saini', date: '04/10/2024' },
    { gr: '713_MTC', truck: 'RJ47GA2817', dest: 'Lucknow (U.P.)', party: 'Radheyshyam Sharma', driver: 'Radhey Shyam Gurjar', date: '04/10/2024' },
    { gr: '712_MTC', truck: 'RJ47GA2817', dest: 'Lucknow (U.P.)', party: 'Radheyshyam Sharma', driver: 'Radhey Shyam Gurjar', date: '04/10/2024' },
    { gr: '711_MTC', truck: 'RJ52GB0964', dest: 'Kanpur (U.P.)', party: 'Mahaveer Tholiya', driver: 'Shishram Meena', date: '04/10/2024' },
    { gr: '710_MTC', truck: 'RJ01GD6056', dest: 'Bijnor (U.P.)', party: 'Manoj Vikara Marmo', driver: 'Sahkin Prajapat', date: '04/10/2024' },
    { gr: '709_MTC', truck: 'RJ01GD0709', dest: 'Paonta Sahib (Himachal Pradesh)', party: 'Karan Sharin Paonta', driver: 'Gopal Rawat', date: '04/10/2024' },
    { gr: '708_MTC', truck: 'RJ01GD0621', dest: 'Noida (U.P.)', party: 'Rahul Sisodiya Chittorgarh', driver: 'Ramdev Singh Shrinagar', date: '04/10/2024' },
    { gr: '707_MTC', truck: 'RJ01GD2469', dest: 'Moradabad (U.P.)', party: 'Aakash Sharma', driver: 'Mahendra Rawat Shrinagar', date: '04/10/2024' },
    { gr: '706_MTC', truck: 'RJ01GC4211', dest: 'Baghpat (U.P.)', party: 'Chel singh Charan', driver: 'Man Singh Vijaynagar', date: '04/10/2024' },
    { gr: '705_MTC', truck: 'RJ52GB4737', dest: 'Delhi', party: 'Vipin Kishangarh', driver: 'Hansraj Gurjar', date: '04/10/2024' },
    { gr: '-1_MTC', truck: 'RJ32GD3696', dest: 'Lucknow (U.P.)', party: 'Balaji Transport', driver: 'Nand Singh', date: '04/10/2024' },
    { gr: '704_MTC', truck: 'RJ52GA8617', dest: 'Delhi', party: 'Anil Sharda', driver: 'Sheru Meena', date: '03/10/2024' },
    { gr: '703_MTC', truck: 'RJ52GB0988', dest: 'Muzaffarnagar (U.P.)', party: 'Laxmi Narayan Kumawat Bhana', driver: 'Satish Gurjar', date: '03/10/2024' },
    { gr: '702_MTC', truck: 'RJ52GA3237', dest: 'Mohali (Punjab)', party: 'Raju Shekhawati', driver: 'Prakash Gurjar Tolda', date: '03/10/2024' },
    { gr: '701_MTC', truck: 'RJ26GA4713', dest: 'Agra (U.P.)', party: 'Rajendra Laddha', driver: 'Radheyshyam Meena', date: '03/10/2024' },
    { gr: '700_MTC', truck: 'RJ35GD1097', dest: 'Delhi', party: 'Vipin Kishangarh', driver: 'Mahendra Gurjar', date: '03/10/2024' },
    { gr: '699_MTC', truck: 'RJ52GB2688', dest: 'Khatauli (U.P.)', party: 'Irfan Bhai Khatauli', driver: 'Kalu Birjaniya', date: '01/10/2024' },
    { gr: '698_MTC', truck: 'RJ52GA3737', dest: 'Delhi', party: 'Kedarmal Nyati', driver: 'Naval Singh', date: '01/10/2024' }
  ];

  const mtc = BiltyBookingModule.currentMtcTrips;
  console.log(`Checking ${expected.length} authentic MTC trips from media_1791399362149.png...`);

  for (let i = 0; i < expected.length; i++) {
    const exp = expected[i];
    const actual = mtc.find(t => (t.shortGrNo === exp.gr) || (t.grNo && t.grNo.endsWith(exp.gr)));
    if (!actual) throw new Error(`Missing MTC trip for ${exp.gr}`);

    const actualGr = actual.shortGrNo || actual.grNo;
    const actualDate = BiltyBookingModule.formatAppSheetDate(actual.tripStartDate);

    if (actualGr !== exp.gr) {
      throw new Error(`Row ${i+1}: expected GR ${exp.gr}, got ${actualGr}`);
    }
    if (actual.truckNo !== exp.truck) {
      throw new Error(`Row ${i+1}: expected truck ${exp.truck}, got ${actual.truckNo}`);
    }
    if (actual.destination !== exp.dest) {
      throw new Error(`Row ${i+1}: expected dest ${exp.dest}, got ${actual.destination}`);
    }
    if (actual.consignor !== exp.party) {
      throw new Error(`Row ${i+1}: expected party ${exp.party}, got ${actual.consignor}`);
    }
    if (actual.driver !== exp.driver) {
      throw new Error(`Row ${i+1}: expected driver ${exp.driver}, got ${actual.driver}`);
    }
    if (actualDate !== exp.date) {
      throw new Error(`Row ${i+1}: expected date ${exp.date}, got ${actualDate}`);
    }
    console.log(`✓ Row ${i+1} [${exp.gr}]: Truck=${exp.truck} | Dest=${exp.dest} | Party=${exp.party} | Driver=${exp.driver} | Date=${exp.date}`);
  }

  // Verify MTC feed HTML has date ribbons:
  const feedHtml = mockElements['mtc-panel-feed'].innerHTML;
  if (!feedHtml.includes('04/10/2024') || !feedHtml.includes('03/10/2024') || !feedHtml.includes('01/10/2024')) {
    throw new Error('MTC Feed HTML missing date ribbons!');
  }
  console.log('✓ Verified: MTC Feed HTML has date ribbons for 04/10/2024, 03/10/2024, 01/10/2024!');

  // Verify none has 'Assigned Driver'
  const assigned = mtc.some(t => t.driver === 'Assigned Driver');
  if (assigned) throw new Error('Found Assigned Driver in MTC!');
  console.log('✓ Verified: Zero instances of "Assigned Driver" across all MTC trips!');

  console.log('\n🎉 ALL 20 MTC SCREENSHOT ROWS VERIFIED 100% ACCURATE!');
}

verifyMtc().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
