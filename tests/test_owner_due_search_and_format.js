const assert = require('assert');
const dues = require('../js/sample-owner-dues-data.js');

// Mock OwnersModule logic
const OwnersModule = {
  allOwnerDues: dues,
  selectedDueYear: 'ALL',
  selectedDueStatus: 'ALL',
  dueSearchQuery: '',

  formatGrNo(val) {
    if (!val && val !== 0) return '-';
    const s = String(val).trim();
    if (/^\d+$/.test(s)) {
      return Number(s).toLocaleString('en-US');
    }
    const m = s.match(/^(\d+)(.*)$/);
    if (m && Number(m[1]) >= 1000) {
      return Number(m[1]).toLocaleString('en-US') + m[2];
    }
    return s;
  },

  formatCurrency(val) {
    const num = Number(val) || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  parseDateTimestamp(dStr) {
    if (!dStr) return 0;
    const parts = String(dStr).trim().split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day).getTime();
    }
    return new Date(dStr).getTime() || 0;
  },

  getFilteredOwnerDues() {
    let duesList = this.allOwnerDues || [];
    if (this.selectedDueYear && this.selectedDueYear !== 'ALL') {
      duesList = duesList.filter(d => String(d.year) === String(this.selectedDueYear));
    }
    if (this.selectedDueStatus && this.selectedDueStatus !== 'ALL') {
      const targetSt = String(this.selectedDueStatus).toLowerCase();
      duesList = duesList.filter(d => {
        const st = String(d.status || '').toLowerCase();
        const col = String(d.color || '').toLowerCase();
        if (targetSt === 'transit') return st.includes('transit') || col === 'yellow';
        if (targetSt === 'pod sent') return st.includes('pod') || col === 'purple';
        if (targetSt === 'party payment pending') return st.includes('party') || col === 'blue';
        if (targetSt === 'off loading') return st.includes('off') || col === 'pink';
        if (targetSt === 'truck owner payment pending') return st.includes('owner') || col === 'cyan';
        if (targetSt === 'cheque due') return st.includes('cheque') || col === 'slate';
        return st.includes(targetSt) || col.includes(targetSt);
      });
    }
    if (this.dueSearchQuery) {
      const rawQ = String(this.dueSearchQuery).trim().toLowerCase();
      const cleanQ = rawQ.replace(/,/g, '').replace(/\s+/g, '');
      const self = this;
      duesList = duesList.filter(d => {
        const dt = d.tripDate || d.tripStartDate || d.date || '';
        const grRaw = String(d.grNo || '');
        const grFormatted = self.formatGrNo(grRaw);
        const truck = String(d.truckNo || '');
        const owner = String(d.ownerName || d.owner || '');
        const dest = String(d.destination || '');
        const trans = String(d.transport || '');
        const ref = String(d.reference || d.partyName || (d.consignee && d.consignee.name) || '');
        const driver = String(d.driver || '');
        const st = String(d.status || '');
        const due = String(d.dueAmount || d.ownerDue || '');
        const dueFormatted = self.formatCurrency(due);

        const fields = [grRaw, grFormatted, dt, truck, owner, dest, trans, ref, driver, st, due, dueFormatted];
        for (const f of fields) {
          const fl = f.toLowerCase();
          if (fl.includes(rawQ)) return true;
          const cleanF = fl.replace(/,/g, '').replace(/\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }

        // Alternate date format matching (e.g. 29-10-2026 vs 29/10/2026)
        if (dt.replace(/\//g, '-').includes(rawQ) || dt.replace(/-/g, '/').includes(rawQ)) return true;

        return false;
      });
    }

    const self = this;
    duesList.sort((a, b) => {
      const tA = self.parseDateTimestamp(a.tripDate || a.tripStartDate || a.date);
      const tB = self.parseDateTimestamp(b.tripDate || b.tripStartDate || b.date);
      if (tB !== tA) return tB - tA;
      return 0;
    });

    return duesList;
  }
};

console.log('=== VERIFYING FORMATTING AND SEARCH ===');

// 1. Test GR Formatting
assert.strictEqual(OwnersModule.formatGrNo('2685'), '2,685', '2685 must format to 2,685');
assert.strictEqual(OwnersModule.formatGrNo('1502'), '1,502', '1502 must format to 1,502');
assert.strictEqual(OwnersModule.formatGrNo('2791'), '2,791', '2791 must format to 2,791');
assert.strictEqual(OwnersModule.formatGrNo('55'), '55', '55 must format to 55');
console.log('✔ formatGrNo works perfectly!');

// 2. Test Currency Formatting
assert.strictEqual(OwnersModule.formatCurrency(1641456), '1,641,456.00', '1641456 must be 1,641,456.00');
assert.strictEqual(OwnersModule.formatCurrency(30415995.22), '30,415,995.22', '30415995.22 must be 30,415,995.22');
assert.strictEqual(OwnersModule.formatCurrency(12221), '12,221.00', '12221 must be 12,221.00');
console.log('✔ formatCurrency en-US works perfectly!');

// 3. Test Search without comma: '2685'
OwnersModule.dueSearchQuery = '2685';
let res = OwnersModule.getFilteredOwnerDues();
assert(res.length >= 1, 'Should find 2685');
assert.strictEqual(res[0].grNo, '2685', 'First match is GR 2685');
console.log('✔ Search without comma (2685) found:', res[0].grNo, res[0].tripDate);

// 4. Test Search with comma: '2,685'
OwnersModule.dueSearchQuery = '2,685';
res = OwnersModule.getFilteredOwnerDues();
assert(res.length >= 1, 'Should find 2,685');
assert.strictEqual(res[0].grNo, '2685', 'Match with comma is GR 2685');
console.log('✔ Search with comma (2,685) found:', res[0].grNo, res[0].tripDate);

// 5. Test Search date: '29/10/2026'
OwnersModule.dueSearchQuery = '29/10/2026';
res = OwnersModule.getFilteredOwnerDues();
assert.strictEqual(res.length, 7, 'Should find exactly 7 trips on 29/10/2026');
console.log('✔ Search date 29/10/2026 found 7 trips!');

// 6. Test Search date with dash: '29-10-2026'
OwnersModule.dueSearchQuery = '29-10-2026';
res = OwnersModule.getFilteredOwnerDues();
assert.strictEqual(res.length, 7, 'Should find 7 trips with dash');
console.log('✔ Search date 29-10-2026 with dash found 7 trips!');

// 7. Test Search Truck: 'RJ01GC0961' vs 'RJ 01 GC 0961'
OwnersModule.dueSearchQuery = 'RJ01GC0961';
res = OwnersModule.getFilteredOwnerDues();
assert(res.length >= 1, 'Should find RJ01GC0961');
console.log('✔ Search truck without spaces found GR:', res[0].grNo);

// 8. Test Search Pink Year 2024-2025: '1,502'
OwnersModule.dueSearchQuery = '1,502';
res = OwnersModule.getFilteredOwnerDues();
assert.strictEqual(res.length, 1, 'Should find GR 1502');
assert.strictEqual(res[0].year, '2024-2025');
assert.strictEqual(res[0].color, 'pink');
console.log('✔ Search GR 1,502 found 2024-2025 Pink row!');

// 9. Test Search Amount: '12,221.00'
OwnersModule.dueSearchQuery = '12,221.00';
res = OwnersModule.getFilteredOwnerDues();
assert(res.length >= 1, 'Should find 12,221.00');
console.log('✔ Search amount 12,221.00 found GR:', res[0].grNo);

// 10. Check descending date sorting of all rows:
OwnersModule.dueSearchQuery = '';
res = OwnersModule.getFilteredOwnerDues();
assert.strictEqual(res[0].tripDate, '29/10/2026', 'Top row must be 29/10/2026');
assert.strictEqual(res[6].tripDate, '29/10/2026', '7th row must be 29/10/2026');
assert.strictEqual(res[7].tripDate, '28/10/2026', '8th row must be 28/10/2026');
console.log('✔ Strictly descending date order verified!');

console.log('\n=== ALL SEARCH & FORMATTING INTEGRITY TESTS PASSED 100%! ===\n');
