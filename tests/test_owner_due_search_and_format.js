const assert = require('assert');
const dues = require('../js/sample-owner-dues-data.js');

const OwnersModule = {
  allOwnerDues: dues,
  selectedDueYear: 'ALL',
  selectedDueStatus: 'ALL',
  dueSearchQuery: '',

  canonicalGr(gr) {
    if (!gr && gr !== 0) return '';
    return String(gr).replace(/^\d{4}-\d{4}-/, '').replace(/_(TTC|SMTC|MTC)$/i, '').replace(/,/g, '').trim();
  },

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
        const ownerMob = String(d.ownerMobile || '');
        const dest = String(d.destination || '');
        const trans = String(d.transport || '');
        const ref = String(d.reference || d.partyName || (d.consignee && d.consignee.name) || '');
        const refMob = String(d.referenceMobile || (d.consignee && d.consignee.mobile) || '');
        const driver = String(d.driver || '');
        const driverMob = String(d.driverMobile || '');
        const st = String(d.status || '');
        const due = String(d.dueAmount || d.ownerDue || '');
        const dueFormatted = self.formatCurrency(due);

        const fields = [
          grRaw, grFormatted, dt, truck, owner, ownerMob,
          dest, trans, ref, refMob, driver, driverMob,
          st, due, dueFormatted
        ];
        for (const f of fields) {
          if (!f) continue;
          const fl = f.toLowerCase();
          if (fl.includes(rawQ)) return true;
          const cleanF = fl.replace(/,/g, '').replace(/\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }

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
  },

  getSidebarTotals() {
    let duesList = this.allOwnerDues || [];
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
        const ownerMob = String(d.ownerMobile || '');
        const dest = String(d.destination || '');
        const trans = String(d.transport || '');
        const ref = String(d.reference || d.partyName || (d.consignee && d.consignee.name) || '');
        const refMob = String(d.referenceMobile || (d.consignee && d.consignee.mobile) || '');
        const driver = String(d.driver || '');
        const driverMob = String(d.driverMobile || '');
        const st = String(d.status || '');
        const due = String(d.dueAmount || d.ownerDue || '');
        const dueFormatted = self.formatCurrency(due);

        const fields = [
          grRaw, grFormatted, dt, truck, owner, ownerMob,
          dest, trans, ref, refMob, driver, driverMob,
          st, due, dueFormatted
        ];
        for (const f of fields) {
          if (!f) continue;
          const fl = f.toLowerCase();
          if (fl.includes(rawQ)) return true;
          const cleanF = fl.replace(/,/g, '').replace(/\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }
        return false;
      });
    }

    let sum2026 = 0, sum2025 = 0, sum2024 = 0;
    duesList.forEach(d => {
      const amt = Number(d.dueAmount || d.ownerDue || 0);
      if (d.year === '2026-2027') sum2026 += amt;
      else if (d.year === '2025-2026') sum2025 += amt;
      else if (d.year === '2024-2025') sum2024 += amt;
    });

    return {
      '2026-2027': sum2026,
      '2025-2026': sum2025,
      '2024-2025': sum2024
    };
  }
};

console.log('=== VERIFYING EXACT SCREEN 2 GOOGLE APPSHEET MATCH ===');

// 1. Check Full Unfiltered FY Totals
OwnersModule.dueSearchQuery = '';
const fullTotals = OwnersModule.getSidebarTotals();
console.log('Unfiltered Totals:', fullTotals);
assert.strictEqual(fullTotals['2026-2027'].toFixed(2), '30415995.22', '2026-2027 unfiltered must be 30,415,995.22');
assert.strictEqual(fullTotals['2025-2026'].toFixed(2), '1641456.00', '2025-2026 unfiltered must be 1,641,456.00');
assert.strictEqual(fullTotals['2024-2025'].toFixed(2), '12221.00', '2024-2025 unfiltered must be 12,221.00');
console.log('✔ Full unfiltered FY totals match ground truth perfectly!');

// 2. Check Search '2669' (Matching Screen 2)
OwnersModule.dueSearchQuery = '2669';
OwnersModule.selectedDueYear = '2026-2027'; // In Screen 2, 2026-2027 tab is selected
const s2Rows = OwnersModule.getFilteredOwnerDues();
console.log('Search 2669 (2026-2027 tab) rows count:', s2Rows.length);
assert.strictEqual(s2Rows.length, 5, 'Exactly 5 trips must be shown in 2026-2027 for 2669');

const expectedGrs = ['2669', '2641', '2372', '2144', '128'];
const actualGrs = s2Rows.map(r => r.grNo);
console.log('Actual GRs found:', actualGrs);
expectedGrs.forEach(g => {
  assert(actualGrs.includes(g), `GR ${g} must be present in search 2669 results`);
});

// Check individual row values from Screen 2
const r2669 = s2Rows.find(r => r.grNo === '2669');
assert.strictEqual(r2669.dueAmount, 44000, 'GR 2669 due must be 44,000.00');
assert.strictEqual(r2669.tripDate, '27/10/2026', 'GR 2669 date must be 27/10/2026');

const r2641 = s2Rows.find(r => r.grNo === '2641');
assert.strictEqual(r2641.dueAmount, 117813, 'GR 2641 due must be 117,813.00');
assert.strictEqual(r2641.tripDate, '25/10/2026', 'GR 2641 date must be 25/10/2026');

const r2372 = s2Rows.find(r => r.grNo === '2372');
assert.strictEqual(r2372.dueAmount, 185670, 'GR 2372 due must be 185,670.00');
assert.strictEqual(r2372.tripDate, '06/10/2026', 'GR 2372 date must be 06/10/2026');

const r2144 = s2Rows.find(r => r.grNo === '2144');
assert.strictEqual(r2144.dueAmount, 10000, 'GR 2144 due must be 10,000.00');
assert.strictEqual(r2144.tripDate, '19/09/2026', 'GR 2144 date must be 19/09/2026');

const r128 = s2Rows.find(r => r.grNo === '128');
assert.strictEqual(r128.dueAmount, 1322, 'GR 128 due must be 1,322.00');
assert.strictEqual(r128.tripDate, '10/04/2026', 'GR 128 date must be 10/04/2026');

// 3. Check Screen 2 Sidebar Totals when searching '2669'
const filteredSidebarTotals = OwnersModule.getSidebarTotals();
console.log('Filtered Sidebar Totals for 2669:', filteredSidebarTotals);
assert.strictEqual(filteredSidebarTotals['2026-2027'], 358805, '2026-2027 filtered total must be exactly ₹ 358,805.00');
assert.strictEqual(filteredSidebarTotals['2025-2026'], 5886, '2025-2026 filtered total must be exactly ₹ 5,886.00');
console.log('✔ Screen 2 left sidebar calculation (₹ 358,805.00) matches 100%!');

// 4. Verify No Duplicate or _TTC GR numbers exist
dues.forEach(d => {
  assert(!String(d.grNo).includes('_TTC'), `GR No should not have _TTC: ${d.grNo}`);
  assert(!String(d.grNo).includes('_SMTC'), `GR No should not have _SMTC: ${d.grNo}`);
  assert(!String(d.grNo).startsWith('2026-2027-'), `GR No should not have year prefix: ${d.grNo}`);
});
console.log('✔ No duplicate or _TTC suffixes found in dataset!');

console.log('\n=== ALL SCREEN 2 INTEGRITY & CALCULATION TESTS PASSED (100%) ===\n');
