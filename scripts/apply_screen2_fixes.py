with open('js/modules/owners.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add canonicalGr helper right above formatGrNo
gr_no_target = """  formatGrNo(val) {"""
gr_no_replacement = """  canonicalGr(gr) {
    if (!gr && gr !== 0) return '';
    return String(gr).replace(/^\\d{4}-\\d{4}-/, '').replace(/_(TTC|SMTC|MTC)$/i, '').replace(/,/g, '').trim();
  },

  formatGrNo(val) {"""

if gr_no_target in code:
    code = code.replace(gr_no_target, gr_no_replacement, 1)
    print("Added canonicalGr helper")
else:
    print("Failed to find formatGrNo")

# 2. Update init() owner dues deduplication
init_target = """    if (!this.allOwnerDues || this.allOwnerDues.length === 0) {
      if (typeof window.SAMPLE_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.SAMPLE_OWNER_DUES));
      } else if (typeof window.INITIAL_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.INITIAL_OWNER_DUES));
      } else {
        this.allOwnerDues = [];
      }
    }"""

init_replacement = """    if (!this.allOwnerDues || this.allOwnerDues.length === 0) {
      if (typeof window.SAMPLE_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.SAMPLE_OWNER_DUES));
      } else if (typeof window.INITIAL_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.INITIAL_OWNER_DUES));
      } else {
        this.allOwnerDues = [];
      }
    }

    // Strict deduplication by clean canonical GR number (never duplicate or show _TTC)
    const cleanDuesMap = new Map();
    (this.allOwnerDues || []).forEach(d => {
      if (!d || d.isRateDiff || d.status === 'Rate Difference') return;
      const cgr = this.canonicalGr(d.grNo || d.id);
      if (!cgr) return;
      d.grNo = cgr;
      if (!cleanDuesMap.has(cgr)) {
        cleanDuesMap.set(cgr, d);
      }
    });
    this.allOwnerDues = Array.from(cleanDuesMap.values());"""

if init_target in code:
    code = code.replace(init_target, init_replacement, 1)
    print("Updated init() deduplication")
else:
    init_target_crlf = init_target.replace('\n', '\r\n')
    if init_target_crlf in code:
        code = code.replace(init_target_crlf, init_replacement.replace('\n', '\r\n'), 1)
        print("Updated init() deduplication (CRLF)")
    else:
        print("Failed to find init_target")

# 3. Update setupFirestoreListeners() ownerDues block
fs_target = """      // 2. Real-time dynamic Firestore sync for ownerDues
      db.collection('ownerDues').onSnapshot(snapshot => {
        if (!snapshot || snapshot.empty) return;
        const duesMap = new Map((this.allOwnerDues || []).map(d => [String(d.id || d.grNo), d]));
        snapshot.docChanges().forEach(change => {
          const docData = { id: change.doc.id, ...change.doc.data() };
          const key = String(docData.id || docData.grNo);
          if (change.type === 'removed') {
            duesMap.delete(key);
          } else {
            const existing = duesMap.get(key) || {};
            duesMap.set(key, { ...existing, ...docData });
          }
        });
        this.allOwnerDues = Array.from(duesMap.values());
        this.updateDueSummaryStats();
        this.renderOwnerDueTable();
      }, err => {
        console.warn('Realtime ownerDues listener:', err);
      });"""

fs_replacement = """      // 2. Real-time dynamic Firestore sync for ownerDues
      db.collection('ownerDues').onSnapshot(snapshot => {
        if (!snapshot || snapshot.empty) return;
        const duesMap = new Map();
        (this.allOwnerDues || []).forEach(d => {
          const cgr = this.canonicalGr(d.grNo || d.id);
          if (cgr) duesMap.set(cgr, d);
        });
        snapshot.docChanges().forEach(change => {
          const docData = { id: change.doc.id, ...change.doc.data() };
          if (docData.isRateDiff || docData.status === 'Rate Difference') return; // Ignore rate differences
          const cgr = this.canonicalGr(docData.grNo || docData.shortGrNo || docData.id);
          if (!cgr) return;
          docData.grNo = cgr;
          if (change.type === 'removed') {
            duesMap.delete(cgr);
          } else {
            const existing = duesMap.get(cgr) || {};
            duesMap.set(cgr, { ...existing, ...docData, grNo: cgr });
          }
        });
        this.allOwnerDues = Array.from(duesMap.values());
        this.updateDueSummaryStats();
        this.renderOwnerDueTable();
      }, err => {
        console.warn('Realtime ownerDues listener:', err);
      });"""

if fs_target in code:
    code = code.replace(fs_target, fs_replacement, 1)
    print("Updated setupFirestoreListeners()")
else:
    fs_target_crlf = fs_target.replace('\n', '\r\n')
    if fs_target_crlf in code:
        code = code.replace(fs_target_crlf, fs_replacement.replace('\n', '\r\n'), 1)
        print("Updated setupFirestoreListeners() (CRLF)")
    else:
        print("Failed to find fs_target")

# 4. Update updateDueSummaryStats() to dynamically calculate sums from search results when query is active
stats_target = """  updateDueSummaryStats() {
    const dues = this.allOwnerDues || [];
    const countAll = dues.length;

    const cntAllEl = document.getElementById('due-year-count-ALL');
    if (cntAllEl) cntAllEl.innerText = countAll;

    const amt2026El = document.getElementById('due-year-amount-2026-2027');
    const amt2025El = document.getElementById('due-year-amount-2025-2026');
    const amt2024El = document.getElementById('due-year-amount-2024-2025');

    let sum2026 = 0;
    let sum2025 = 0;
    let sum2024 = 0;

    dues.forEach(d => {
      const yr = String(d.year || '');
      const amt = Number(d.dueAmount || d.ownerDue || 0);
      if (yr === '2026-2027') sum2026 += amt;
      else if (yr === '2025-2026') sum2025 += amt;
      else if (yr === '2024-2025') sum2024 += amt;
    });

    if (amt2026El) amt2026El.innerText = '₹ ' + this.formatCurrency(sum2026);
    if (amt2025El) amt2025El.innerText = '₹ ' + this.formatCurrency(sum2025);
    if (amt2024El) amt2024El.innerText = '₹ ' + this.formatCurrency(sum2024);

    const dashAmt2026 = document.getElementById('dash-due-amount-2026-2027');
    const dashAmt2025 = document.getElementById('dash-due-amount-2025-2026');
    const dashAmt2024 = document.getElementById('dash-due-amount-2024-2025');
    if (dashAmt2026) dashAmt2026.innerText = '₹ ' + this.formatCurrency(sum2026);
    if (dashAmt2025) dashAmt2025.innerText = '₹ ' + this.formatCurrency(sum2025);
    if (dashAmt2024) dashAmt2024.innerText = '₹ ' + this.formatCurrency(sum2024);
  },"""

stats_replacement = """  updateDueSummaryStats() {
    let dues = this.allOwnerDues || [];

    // When a search query is active, calculate sidebar year totals dynamically from search results (matching Google AppSheet Screen 2!)
    if (this.dueSearchQuery) {
      const rawQ = String(this.dueSearchQuery).trim().toLowerCase();
      const cleanQ = rawQ.replace(/,/g, '').replace(/\\s+/g, '');
      const self = this;
      dues = dues.filter(d => {
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
          const cleanF = fl.replace(/,/g, '').replace(/\\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }
        if (dt.replace(/\\//g, '-').includes(rawQ) || dt.replace(/-/g, '/').includes(rawQ)) return true;
        return false;
      });
    }

    const countAll = dues.length;
    const cntAllEl = document.getElementById('due-year-count-ALL');
    if (cntAllEl) cntAllEl.innerText = countAll;

    const amt2026El = document.getElementById('due-year-amount-2026-2027');
    const amt2025El = document.getElementById('due-year-amount-2025-2026');
    const amt2024El = document.getElementById('due-year-amount-2024-2025');

    let sum2026 = 0;
    let sum2025 = 0;
    let sum2024 = 0;

    dues.forEach(d => {
      const yr = String(d.year || '');
      const amt = Number(d.dueAmount || d.ownerDue || 0);
      if (yr === '2026-2027') sum2026 += amt;
      else if (yr === '2025-2026') sum2025 += amt;
      else if (yr === '2024-2025') sum2024 += amt;
    });

    if (amt2026El) amt2026El.innerText = '₹ ' + this.formatCurrency(sum2026);
    if (amt2025El) amt2025El.innerText = '₹ ' + this.formatCurrency(sum2025);
    if (amt2024El) amt2024El.innerText = '₹ ' + this.formatCurrency(sum2024);

    // Dashboard 3-card card 2 amounts (always reflect unfiltered full sums unless explicitly searched on dashboard)
    const dashAmt2026 = document.getElementById('dash-due-amount-2026-2027');
    const dashAmt2025 = document.getElementById('dash-due-amount-2025-2026');
    const dashAmt2024 = document.getElementById('dash-due-amount-2024-2025');
    if (dashAmt2026 && !this.dueSearchQuery) dashAmt2026.innerText = '₹ ' + this.formatCurrency(sum2026);
    if (dashAmt2025 && !this.dueSearchQuery) dashAmt2025.innerText = '₹ ' + this.formatCurrency(sum2025);
    if (dashAmt2024 && !this.dueSearchQuery) dashAmt2024.innerText = '₹ ' + this.formatCurrency(sum2024);
  },"""

if stats_target in code:
    code = code.replace(stats_target, stats_replacement, 1)
    print("Updated updateDueSummaryStats()")
else:
    stats_target_crlf = stats_target.replace('\n', '\r\n')
    if stats_target_crlf in code:
        code = code.replace(stats_target_crlf, stats_replacement.replace('\n', '\r\n'), 1)
        print("Updated updateDueSummaryStats() (CRLF)")
    else:
        print("Failed to find stats_target")

# 5. Update getFilteredOwnerDues() search fields to include ownerMobile, driverMobile, referenceMobile
search_target = """        const fields = [grRaw, grFormatted, dt, truck, owner, dest, trans, ref, driver, st, due, dueFormatted];
        for (const f of fields) {
          const fl = f.toLowerCase();
          if (fl.includes(rawQ)) return true;
          const cleanF = fl.replace(/,/g, '').replace(/\\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }"""

search_replacement = """        const ownerMob = String(d.ownerMobile || '');
        const refMob = String(d.referenceMobile || (d.consignee && d.consignee.mobile) || '');
        const driverMob = String(d.driverMobile || '');

        const fields = [
          grRaw, grFormatted, dt, truck, owner, ownerMob,
          dest, trans, ref, refMob, driver, driverMob,
          st, due, dueFormatted
        ];
        for (const f of fields) {
          if (!f) continue;
          const fl = f.toLowerCase();
          if (fl.includes(rawQ)) return true;
          const cleanF = fl.replace(/,/g, '').replace(/\\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }"""

if search_target in code:
    code = code.replace(search_target, search_replacement, 1)
    print("Updated getFilteredOwnerDues() search fields")
else:
    search_target_crlf = search_target.replace('\n', '\r\n')
    if search_target_crlf in code:
        code = code.replace(search_target_crlf, search_replacement.replace('\n', '\r\n'), 1)
        print("Updated getFilteredOwnerDues() search fields (CRLF)")
    else:
        print("Failed to find search_target")

with open('js/modules/owners.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved updated js/modules/owners.js successfully!")
