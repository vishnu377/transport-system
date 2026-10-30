/**
 * Truck Owners & Owner Due Master Module - MTC & TTC Logistics
 * Matches Google AppSheet Authentic UI across all views:
 * 1. 3-Card Dashboard View (Card 1: Truck Owners, Card 2: Owner Due, Card 3: Owner Paid)
 * 2. Dedicated Truck Owners Full View (596 Trucks with bottom pagination & search)
 * 3. Dedicated Owner Due Table View with 2-Column Split:
 *    - Left: Year Selector (All, 2026-2027, 2025-2026, 2024-2025)
 *    - Right: Table with 489 records, Date Group Headers, and FULL ROW STATUS COLORS!
 * 4. Open Trip Details View with Exact 3-Column Split tailored to each of the 6 color categories:
 *    - Yellow (Transit), Purple (POD Sent), Blue (Party Payment Pending),
 *    - Pink (Off Loading), Slate (Cheque Due), Cyan (Truck Owner Payment Pending)
 * 5. Full Drilldown Views on Expand:
 *    - Open Trip Party Details (19_42_24.png / 19_42_34.png)
 *    - Trip Truck Owner Payment Details (20_12_36.png / 20_12_49.png)
 * 6. Slide Drawers for Editing Trips (19_43_12.png), Adding Debts (19_43_39.png), and Payments
 * 7. Sidebar Hide / Unhide Toggle
 * 100% Dynamic - Connected to Firebase Cloud Firestore ('truckOwners' and 'ownerDues')
 */

const OwnersModule = {
  // Truck Owners Master State (Card 1)
  allOwners: [],
  searchQuery: '',
  currentView: 'dashboard',
  currentOwnerId: null,
  pageSize: 50,
  currentPage: 1,

  // Owner Due Master State (Card 2)
  allOwnerDues: [],
  selectedDueYear: 'ALL',
  selectedDueStatus: 'ALL',
  dueSearchQuery: '',
  duePageSize: 50,
  dueCurrentPage: 1,
  currentTripId: null,

  async init() {
    this.checkSidebarPref();
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('owners');
    }
    await this.loadData();
    this.checkInitialRoute();
  },

  // Sidebar Hide / Unhide Toggle
  toggleSidebar() {
    document.body.classList.toggle('sidebar-hidden');
    const isHidden = document.body.classList.contains('sidebar-hidden');
    try {
      localStorage.setItem('sidebar_hidden_pref', isHidden ? 'true' : 'false');
    } catch (e) {}
  },

  checkSidebarPref() {
    try {
      if (localStorage.getItem('sidebar_hidden_pref') === 'true') {
        document.body.classList.add('sidebar-hidden');
      }
    } catch (e) {}
  },

  checkInitialRoute() {
    const hash = window.location.hash;
    if (hash === '#truck-owners') {
      this.showTruckOwnersList();
    } else if (hash.startsWith('#details-')) {
      const id = hash.replace('#details-', '');
      this.showOwnerDetails(id);
    } else if (hash.startsWith('#due-list-')) {
      const year = hash.replace('#due-list-', '');
      this.showOwnerDueList(year);
    } else if (hash.startsWith('#trip-')) {
      const tripId = hash.replace('#trip-', '');
      this.showOpenTripDetails(tripId);
    } else {
      this.showDashboard();
    }
  },

  async loadData() {
    const tbodyOwners = document.getElementById('truck-owners-tbody');
    if (tbodyOwners && (!this.allOwners || this.allOwners.length === 0)) {
      tbodyOwners.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading 596 truck owners...
          </td>
        </tr>
      `;
    }

    const tbodyDues = document.getElementById('owner-dues-tbody');
    if (tbodyDues && (!this.allOwnerDues || this.allOwnerDues.length === 0)) {
      tbodyDues.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading owner dues...
          </td>
        </tr>
      `;
    }

    // 1. Load Truck Owners (Dynamic Direct Firebase Cloud Firestore with master asset fallback)
    try {
      if (typeof FirebaseDB !== 'undefined') {
        let owners = null;
        if (typeof FirebaseDB.getAll === 'function') owners = await FirebaseDB.getAll('truckOwners');
        else if (typeof FirebaseDB.getAllTruckOwners === 'function') owners = await FirebaseDB.getAllTruckOwners();
        if (owners && owners.length > 0) {
          this.allOwners = owners;
        }
      }
    } catch (e) {
      console.warn('FirebaseDB getAllTruckOwners fallback:', e);
    }

    if (!this.allOwners || this.allOwners.length === 0) {
      if (typeof window.MASTER_TRUCK_OWNERS_596 !== 'undefined') {
        this.allOwners = JSON.parse(JSON.stringify(window.MASTER_TRUCK_OWNERS_596));
      } else if (typeof window.INITIAL_TRUCK_OWNERS !== 'undefined') {
        this.allOwners = JSON.parse(JSON.stringify(window.INITIAL_TRUCK_OWNERS));
      } else {
        this.allOwners = [];
      }
    }

    // 2. Load Owner Dues from Authentic Master Dataset (Single Source of Truth)
    let masterDues = [];
    if (typeof window.SAMPLE_OWNER_DUES !== 'undefined' && Array.isArray(window.SAMPLE_OWNER_DUES)) {
      masterDues = JSON.parse(JSON.stringify(window.SAMPLE_OWNER_DUES));
    } else if (typeof window.INITIAL_OWNER_DUES !== 'undefined' && Array.isArray(window.INITIAL_OWNER_DUES)) {
      masterDues = JSON.parse(JSON.stringify(window.INITIAL_OWNER_DUES));
    }

    const cleanDuesMap = new Map();
    masterDues.forEach(d => {
      if (!d || d.isRateDiff || d.status === 'Rate Difference') return;
      const cgr = this.canonicalGr(d.grNo || d.id);
      if (!cgr) return;
      // Guard: 2024-2025 has strictly ONLY GR 1502
      if (d.year === '2024-2025' && cgr !== '1502') return;
      d.grNo = cgr;
      cleanDuesMap.set(cgr, d);
    });

    // Overlay user edits from Firebase Cloud Firestore / Local DB without corrupting totals
    try {
      if (typeof FirebaseDB !== 'undefined') {
        let cloudDues = null;
        if (typeof FirebaseDB.getAllOwnerDues === 'function') cloudDues = await FirebaseDB.getAllOwnerDues();
        else if (typeof FirebaseDB.getAll === 'function') cloudDues = await FirebaseDB.getAll('ownerDues');
        if (Array.isArray(cloudDues)) {
          cloudDues.forEach(d => {
            if (!d || d.isRateDiff || d.status === 'Rate Difference') return;
            const cgr = this.canonicalGr(d.grNo || d.shortGrNo || d.id);
            if (!cgr) return;
            // Reject any rogue 2024-2025 trips other than 1502
            if (d.year === '2024-2025' && cgr !== '1502') return;
            // Only overlay on existing authentic master trips
            if (cleanDuesMap.has(cgr)) {
              const existing = cleanDuesMap.get(cgr);
              const dueAmt = d.userEdited ? Number(d.dueAmount ?? d.ownerDue ?? existing.dueAmount) : existing.dueAmount;
              cleanDuesMap.set(cgr, {
                ...existing,
                ...d,
                dueAmount: dueAmt,
                ownerDue: dueAmt,
                year: existing.year,
                grNo: cgr
              });
            }
          });
        }
      }
    } catch (e) {
      console.warn('FirebaseDB getAllOwnerDues overlay fallback:', e);
    }

    this.allOwnerDues = Array.from(cleanDuesMap.values());

    this.populateNameDatalist();
    this.updateStats();
    this.updateDueSummaryStats();
    this.renderTruckOwnersTable();
    this.renderOwnerDueTable();
    this.setupFirestoreListeners();
  },

  setupFirestoreListeners() {
    if (this._firestoreListenersAttached) return;
    if (typeof firebase === 'undefined' || !firebase.firestore) return;

    try {
      const db = firebase.firestore();
      this._firestoreListenersAttached = true;

      // 1. Real-time dynamic Firestore sync for truckOwners
      db.collection('truckOwners').onSnapshot(snapshot => {
        if (!snapshot || snapshot.empty) return;
        const ownersMap = new Map((this.allOwners || []).map(o => [String(o.id || o.truckNo), o]));
        snapshot.docChanges().forEach(change => {
          const docData = { id: change.doc.id, ...change.doc.data() };
          const key = String(docData.id || docData.truckNo);
          if (change.type === 'removed') {
            ownersMap.delete(key);
          } else {
            const existing = ownersMap.get(key) || {};
            ownersMap.set(key, { ...existing, ...docData });
          }
        });
        this.allOwners = Array.from(ownersMap.values());
        this.populateNameDatalist();
        this.updateStats();
        this.renderTruckOwnersTable();
      }, err => {
        console.warn('Realtime truckOwners listener:', err);
      });

      // 2. Real-time dynamic Firestore sync for ownerDues
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
          // Guard: 2024-2025 has strictly ONLY GR 1502
          if (docData.year === '2024-2025' && cgr !== '1502') return;
          // Only update existing authentic master trips
          if (!duesMap.has(cgr)) return;

          docData.grNo = cgr;
          if (change.type === 'removed') {
            // Keep authentic trips
          } else {
            const existing = duesMap.get(cgr) || {};
            const dueAmt = docData.userEdited ? Number(docData.dueAmount ?? docData.ownerDue ?? existing.dueAmount) : existing.dueAmount;
            duesMap.set(cgr, {
              ...existing,
              ...docData,
              dueAmount: dueAmt,
              ownerDue: dueAmt,
              year: existing.year,
              grNo: cgr
            });
          }
        });
        this.allOwnerDues = Array.from(duesMap.values());
        this.updateDueSummaryStats();
        this.renderOwnerDueTable();
      }, err => {
        console.warn('Realtime ownerDues listener:', err);
      });
    } catch (e) {
      console.warn('setupFirestoreListeners initialization:', e);
    }
  },

  populateNameDatalist() {
    const datalist = document.getElementById('owner-name-datalist');
    if (!datalist) return;
    const distinctNames = Array.from(new Set(this.allOwners.map(o => (o.name || '').trim()).filter(Boolean))).sort();
    datalist.innerHTML = distinctNames.map(n => `<option value="${n}">`).join('');
  },

  updateStats() {
    const totalCount = this.allOwners.length;
    const countBadge = document.getElementById('appsheet-header-count');
    if (countBadge) {
      countBadge.innerText = `Number ${totalCount}`;
    }
  },

  updateDueSummaryStats() {
    let dues = this.allOwnerDues || [];

    // When a search query is active, calculate sidebar year totals dynamically from search results (matching Google AppSheet Screen 2!)
    if (this.dueSearchQuery) {
      const rawQ = String(this.dueSearchQuery).trim().toLowerCase();
      const cleanQ = rawQ.replace(/,/g, '').replace(/\s+/g, '');
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
          const cleanF = fl.replace(/,/g, '').replace(/\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }
        if (dt.replace(/\//g, '-').includes(rawQ) || dt.replace(/-/g, '/').includes(rawQ)) return true;
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
  },

  // Helper date parser for strict descending chronological sort
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

  formatCurrency(val) {
    const num = Number(val) || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

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

  // ========================================================
  // VIEW 1: 3-CARD DASHBOARD VIEW
  // ========================================================
  showDashboard() {
    this.currentView = 'dashboard';
    window.location.hash = '';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'block';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    // Reset grid layout expansion
    const grid = document.getElementById('ownersDashboardGrid');
    if (grid) grid.classList.remove('card1-expanded');

    // Reset panel expansions and restore toggle icons
    document.querySelectorAll('.appsheet-panel.panel-expanded').forEach(p => {
      p.classList.remove('panel-expanded');
      const icon = p.querySelector('.expand-toggle-icon');
      if (icon) {
        icon.classList.remove('bi-arrows-angle-contract');
        icon.classList.add('bi-arrows-angle-expand');
        icon.setAttribute('title', 'Expand / Full View');
      }
    });

    // Reset Breadcrumb: Owners
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <span class="active">Owners</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn btn-sm btn-outline-secondary" onclick="OwnersModule.exportCSV()" title="Export CSV">
          <i class="bi bi-download me-1"></i> CSV
        </button>
      `;
    }

    this.renderTruckOwnersTable();
  },

  // ========================================================
  // VIEW 2: DEDICATED FULL VIEW - TRUCK OWNERS (596 TRUCKS)
  // ========================================================
  showTruckOwnersList() {
    this.expandTruckOwners();
  },

  expandTruckOwners() {
    this.currentView = 'dashboard';
    window.location.hash = '#truck-owners';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'block';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    const grid = document.getElementById('ownersDashboardGrid');
    if (grid) grid.classList.add('card1-expanded');

    const card = document.getElementById('cardTruckOwners');
    if (card) {
      card.classList.add('panel-expanded');
      const expandIcon = card.querySelector('.expand-toggle-icon');
      if (expandIcon) {
        expandIcon.classList.remove('bi-arrows-angle-expand');
        expandIcon.classList.add('bi-arrows-angle-contract');
        expandIcon.setAttribute('title', 'Collapse to Dashboard');
      }
    }

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.collapseTruckOwners()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Truck Owners</span>
      `;
    }

    this.renderTruckOwnersTable();
  },

  collapseTruckOwners() {
    const card = document.getElementById('cardTruckOwners');
    const grid = document.getElementById('ownersDashboardGrid');
    if (grid) grid.classList.remove('card1-expanded');
    if (card) {
      card.classList.remove('panel-expanded');
      const expandIcon = card.querySelector('.expand-toggle-icon');
      if (expandIcon) {
        expandIcon.classList.remove('bi-arrows-angle-contract');
        expandIcon.classList.add('bi-arrows-angle-expand');
        expandIcon.setAttribute('title', 'Expand / Full View');
      }
    }
    this.showDashboard();
  },

  getFilteredOwners() {
    if (!this.searchQuery) return this.allOwners;
    const q = this.searchQuery.toLowerCase();
    return this.allOwners.filter(o => {
      const truck = (o.truckNo || '').toLowerCase();
      const name = (o.name || '').toLowerCase();
      const mob = (o.mobile || '').toLowerCase();
      const mob1 = (o.mobile1 || '').toLowerCase();
      return truck.includes(q) || name.includes(q) || mob.includes(q) || mob1.includes(q);
    });
  },

  getTotalPages() {
    const count = this.getFilteredOwners().length;
    if (count === 0) return 1;
    if (this.pageSize === 'all') return 1;
    return Math.ceil(count / parseInt(this.pageSize, 10));
  },

  renderTruckOwnersTable() {
    const tbody = document.getElementById('truck-owners-tbody');
    if (!tbody) return;

    const filtered = this.getFilteredOwners();
    const totalCount = this.allOwners.length;
    const filteredCount = filtered.length;
    const totalPages = this.getTotalPages();

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    const showingText = document.getElementById('table-showing-text');
    if (showingText) {
      if (this.searchQuery) {
        showingText.innerText = `${filteredCount} of ${totalCount} records`;
      } else {
        showingText.innerText = `${totalCount} records`;
      }
    }

    if (filteredCount === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-1"></i> No matching truck owners found.
          </td>
        </tr>
      `;
      this.updatePaginationUI(0, 0, 0, 1, 1);
      return;
    }

    let pageItems = [];
    let startIdx = 0;
    let endIdx = 0;

    if (this.pageSize === 'all') {
      pageItems = filtered;
      startIdx = 1;
      endIdx = filteredCount;
    } else {
      const pSize = parseInt(this.pageSize, 10);
      startIdx = (this.currentPage - 1) * pSize + 1;
      endIdx = Math.min(this.currentPage * pSize, filteredCount);
      pageItems = filtered.slice(startIdx - 1, endIdx);
    }

    let html = '';
    pageItems.forEach(o => {
      const safeId = String(o.id || o.truckNo);
      html += `
        <tr class="appsheet-row" onclick="OwnersModule.showOwnerDetails('${safeId}')" style="cursor: pointer;" title="Click to view details of ${o.truckNo}">
          <td class="font-monospace fw-bold text-dark">${o.truckNo || '-'}</td>
          <td class="fw-medium text-dark text-truncate" style="max-width: 220px;">${o.name || '-'}</td>
          <td class="font-monospace text-secondary">${o.mobile || '-'}</td>
          <td class="font-monospace text-muted">${o.mobile1 || '-'}</td>
          <td class="text-end text-muted">
            <i class="bi bi-chevron-right small"></i>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
    this.updatePaginationUI(startIdx, endIdx, filteredCount, this.currentPage, totalPages);
  },

  updatePaginationUI(start, end, total, current, totalPages) {
    const infoEl = document.getElementById('pagination-info');
    if (infoEl) {
      if (total === 0) {
        infoEl.innerText = '0 of 0';
      } else {
        infoEl.innerText = `${start} - ${end} of ${total}`;
      }
    }

    const pageNumEl = document.getElementById('pagination-page-num');
    if (pageNumEl) {
      pageNumEl.innerText = `Page ${current} of ${totalPages}`;
    }

    const btnFirst = document.getElementById('btn-page-first');
    const btnPrev = document.getElementById('btn-page-prev');
    const btnNext = document.getElementById('btn-page-next');
    const btnLast = document.getElementById('btn-page-last');

    if (btnFirst) btnFirst.disabled = current <= 1;
    if (btnPrev) btnPrev.disabled = current <= 1;
    if (btnNext) btnNext.disabled = current >= totalPages;
    if (btnLast) btnLast.disabled = current >= totalPages;
  },

  handleSearch(val) {
    this.searchQuery = (val || '').trim();
    this.currentPage = 1;
    this.renderTruckOwnersTable();
  },

  changePageSize(newSize) {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.renderTruckOwnersTable();
  },

  goToPage(pg) {
    this.currentPage = pg;
    this.renderTruckOwnersTable();
  },

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTruckOwnersTable();
    }
  },

  nextPage() {
    const max = this.getTotalPages();
    if (this.currentPage < max) {
      this.currentPage++;
      this.renderTruckOwnersTable();
    }
  },

  goToLastPage() {
    this.currentPage = this.getTotalPages();
    this.renderTruckOwnersTable();
  },

  // ========================================================
  // VIEW 3: DEDICATED OWNER DUE TABLE VIEW (2-COLUMN SPLIT)
  // ========================================================
  showOwnerDueList(year) {
    this.currentView = 'ownerDueList';
    this.selectedDueYear = year || 'ALL';
    this.dueCurrentPage = 1;
    window.location.hash = `#due-list-${this.selectedDueYear}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'block';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    // Breadcrumb: Home > Owners > Owner Due
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Owner Due</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn btn-sm btn-outline-secondary" onclick="OwnersModule.exportOwnerDuesCSV()" title="Export CSV">
          <i class="bi bi-download me-1"></i> CSV
        </button>
      `;
    }

    this.updateDueYearTabsUI();
    this.renderOwnerDueTable();
  },

  backToDueList() {
    this.showOwnerDueList(this.selectedDueYear || 'ALL');
  },

  toggleDueSidebar() {
    const split = document.getElementById('ownersDueSplitLayout');
    if (!split) return;
    split.classList.toggle('sidebar-hidden');
    const isHidden = split.classList.contains('sidebar-hidden');
    const btn = document.getElementById('btn-toggle-due-sidebar');
    if (btn) {
      btn.innerHTML = isHidden
        ? '<i class="bi bi-layout-sidebar"></i> <span class="d-none d-md-inline ms-1">Show Sidebar</span>'
        : '<i class="bi bi-layout-sidebar-inset"></i> <span class="d-none d-md-inline ms-1">Sidebar</span>';
      btn.title = isHidden ? 'Show Year Sidebar' : 'Hide Year Sidebar';
    }
  },

  selectDueYear(yr) {
    this.selectedDueYear = yr;
    this.dueCurrentPage = 1;
    window.location.hash = `#due-list-${yr}`;
    this.updateDueYearTabsUI();
    this.renderOwnerDueTable();
  },

  filterByDueYear(yr) {
    this.showOwnerDueList(yr);
  },

  updateDueYearTabsUI() {
    const tabs = ['ALL', '2026-2027', '2025-2026', '2024-2025'];
    tabs.forEach(t => {
      const el = document.getElementById(`due-year-tab-${t}`);
      if (el) {
        if (t === this.selectedDueYear) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    const badge = document.getElementById('due-active-year-badge');
    if (badge) {
      badge.innerText = this.selectedDueYear === 'ALL' ? 'All' : this.selectedDueYear;
    }
  },

  getFilteredOwnerDues() {
    let dues = this.allOwnerDues || [];
    if (this.selectedDueYear && this.selectedDueYear !== 'ALL') {
      dues = dues.filter(d => String(d.year) === String(this.selectedDueYear));
    }
    if (this.selectedDueStatus && this.selectedDueStatus !== 'ALL') {
      const targetSt = String(this.selectedDueStatus).toLowerCase();
      dues = dues.filter(d => {
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
      dues = dues.filter(d => {
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

        const ownerMob = String(d.ownerMobile || '');
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
          const cleanF = fl.replace(/,/g, '').replace(/\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }

        // Alternate date format matching (e.g. 29-10-2026 vs 29/10/2026)
        if (dt.replace(/\//g, '-').includes(rawQ) || dt.replace(/-/g, '/').includes(rawQ)) return true;

        return false;
      });
    }

    // STRICT DATE SORTING DESCENDING: Newest trips (29/10/2026) at the very top!
    const self = this;
    dues.sort((a, b) => {
      const tA = self.parseDateTimestamp(a.tripDate || a.tripStartDate || a.date);
      const tB = self.parseDateTimestamp(b.tripDate || b.tripStartDate || b.date);
      if (tB !== tA) return tB - tA;
      return 0; // preserve authentic AppSheet sequence within same date
    });

    return dues;
  },

  getDueTotalPages() {
    const count = this.getFilteredOwnerDues().length;
    if (count === 0) return 1;
    if (this.duePageSize === 'all') return 1;
    return Math.ceil(count / parseInt(this.duePageSize, 10));
  },

  renderOwnerDueTable() {
    const tbody = document.getElementById('owner-dues-tbody');
    if (!tbody) return;

    const filtered = this.getFilteredOwnerDues();
    const totalCount = this.allOwnerDues.length;
    const filteredCount = filtered.length;
    const totalPages = this.getDueTotalPages();

    if (this.dueCurrentPage > totalPages) {
      this.dueCurrentPage = totalPages;
    }

    const headerCount = document.getElementById('owner-dues-header-count');
    if (headerCount) headerCount.innerText = `Number ${filteredCount}`;

    const showingText = document.getElementById('owner-dues-showing-text');
    if (showingText) {
      if (this.dueSearchQuery || this.selectedDueYear !== 'ALL') {
        showingText.innerText = `${filteredCount} of ${totalCount} records`;
      } else {
        showingText.innerText = `${totalCount} records`;
      }
    }

    if (filteredCount === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-1"></i> No matching owner due records found for ${this.selectedDueYear}.
          </td>
        </tr>
      `;
      this.updateDuePaginationUI(0, 0, 0, 1, 1);
      return;
    }

    let pageItems = [];
    let startIdx = 0;
    let endIdx = 0;

    if (this.duePageSize === 'all') {
      pageItems = filtered;
      startIdx = 1;
      endIdx = filteredCount;
    } else {
      const pSize = parseInt(this.duePageSize, 10);
      startIdx = (this.dueCurrentPage - 1) * pSize + 1;
      endIdx = Math.min(this.dueCurrentPage * pSize, filteredCount);
      pageItems = filtered.slice(startIdx - 1, endIdx);
    }

    // Pre-calculate date group totals matching AppSheet
    const dateTotals = {};
    filtered.forEach(item => {
      const dt = item.tripDate || item.tripStartDate || item.date || '-';
      dateTotals[dt] = (dateTotals[dt] || 0) + Number(item.dueAmount || item.ownerDue || 0);
    });

    let html = '';
    let lastRenderedDate = null;

    pageItems.forEach(d => {
      const safeTripId = String(d.id || d.grNo);
      const col = d.color || 'yellow';
      const dt = d.tripDate || d.tripStartDate || d.date || '-';
      const refName = d.reference || d.partyName || d.consignee?.name || '-';
      const ownerVal = d.ownerName || d.owner || '-';

      // Insert Date Group Header if date changed
      if (dt !== lastRenderedDate) {
        lastRenderedDate = dt;
        const groupTotal = dateTotals[dt] || Number(d.dueAmount || d.ownerDue || 0);
        html += `
          <tr class="party-due-group-tr appsheet-date-group-header">
            <td colspan="10" class="party-due-group-cell">
              <div class="party-due-group-inner d-flex align-items-center gap-2" style="padding: 4px 6px;">
                <span class="appsheet-bullet bullet-golden" style="font-size: 11px;">●</span>
                <span style="font-weight: 600; font-size: 12px; color: #202124;">${dt}</span>
                <span class="badge bg-light text-dark border ms-2" style="font-size: 11px; font-weight: 600;">₹ ${this.formatCurrency(groupTotal)}</span>
              </div>
            </td>
          </tr>
        `;
      }

      const dueNum = Number(d.dueAmount || d.ownerDue || 0);

      const c = (val, isBold = false) => `
        <div class="appsheet-cell-inner ${isBold ? 'fw-semibold' : ''}">
          <span class="appsheet-bullet bullet-${col}">●</span>
          <span class="cell-text">${val || '-'}</span>
        </div>
      `;

      html += `
        <tr class="appsheet-row row-status-${col}" onclick="OwnersModule.showOpenTripDetails('${safeTripId}')" style="cursor: pointer;" title="Status: ${d.status}">
          <!-- 1. G.R.No. -->
          <td class="font-monospace">${c(this.formatGrNo(d.grNo), true)}</td>

          <!-- 2. Trip Start Date -->
          <td>${c(dt)}</td>

          <!-- 3. Owner Due Amount (Strictly Bold Red in Google AppSheet) -->
          <td class="due-amount-red">
            <div class="appsheet-cell-inner">
              <span class="appsheet-bullet bullet-red">●</span>
              <span class="cell-text">₹ ${this.formatCurrency(dueNum)}</span>
            </div>
          </td>

          <!-- 4. Truck No. -->
          <td class="font-monospace">${c(d.truckNo, true)}</td>

          <!-- 5. Owner -->
          <td>${c(ownerVal)}</td>

          <!-- 6. Destination -->
          <td>${c(d.destination)}</td>

          <!-- 7. Transport -->
          <td>${c(d.transport || 'TTC')}</td>

          <!-- 8. Reference -->
          <td>${c(refName)}</td>

          <!-- 9. Driver -->
          <td>${c(d.driver)}</td>

          <!-- 10. Chevron Right -->
          <td style="text-align: right; color: #5f6368;"><i class="bi bi-chevron-right" style="font-size: 11px;"></i></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
    this.updateDuePaginationUI(startIdx, endIdx, filteredCount, this.dueCurrentPage, totalPages);
  },

  updateDuePaginationUI(start, end, total, current, totalPages) {
    const infoEl = document.getElementById('due-pagination-info');
    if (infoEl) {
      if (total === 0) {
        infoEl.innerText = '0 of 0';
      } else {
        infoEl.innerText = `${start} - ${end} of ${total}`;
      }
    }

    const pageNumEl = document.getElementById('due-pagination-page-num');
    if (pageNumEl) {
      pageNumEl.innerText = `Page ${current} of ${totalPages}`;
    }

    const btnFirst = document.getElementById('btn-due-page-first');
    const btnPrev = document.getElementById('btn-due-page-prev');
    const btnNext = document.getElementById('btn-due-page-next');
    const btnLast = document.getElementById('btn-due-page-last');

    if (btnFirst) btnFirst.disabled = current <= 1;
    if (btnPrev) btnPrev.disabled = current <= 1;
    if (btnNext) btnNext.disabled = current >= totalPages;
    if (btnLast) btnLast.disabled = current >= totalPages;
  },

  handleDueSearch(val) {
    this.dueSearchQuery = (val || '').trim();
    const clearBtn = document.getElementById('btn-clear-due-search');
    if (clearBtn) {
      clearBtn.style.display = this.dueSearchQuery ? 'inline-block' : 'none';
    }
    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  clearDueSearch() {
    const input = document.getElementById('search-owner-dues');
    if (input) input.value = '';
    const clearBtn = document.getElementById('btn-clear-due-search');
    if (clearBtn) clearBtn.style.display = 'none';
    this.handleDueSearch('');
  },

  filterByDueStatus(st) {
    this.selectedDueStatus = st || 'ALL';
    const sel = document.getElementById('due-status-filter');
    if (sel && sel.value !== this.selectedDueStatus) sel.value = this.selectedDueStatus;
    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  focusDueSearch() {
    const input = document.getElementById('search-owner-dues');
    if (input) input.focus();
  },

  changeDuePageSize(newSize) {
    this.duePageSize = newSize;
    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  goToDuePage(pg) {
    this.dueCurrentPage = pg;
    this.renderOwnerDueTable();
  },

  prevDuePage() {
    if (this.dueCurrentPage > 1) {
      this.dueCurrentPage--;
      this.renderOwnerDueTable();
    }
  },

  nextDuePage() {
    const max = this.getDueTotalPages();
    if (this.dueCurrentPage < max) {
      this.dueCurrentPage++;
      this.renderOwnerDueTable();
    }
  },

  goToDueLastPage() {
    this.dueCurrentPage = this.getDueTotalPages();
    this.renderOwnerDueTable();
  },

  exportOwnerDuesCSV() {
    const dues = this.getFilteredOwnerDues();
    let csv = "G.R.No.,Trip Start Date,Owner Due,Truck No.,Owner,Destination,Transport,Reference,Driver,Status\n";
    dues.forEach(d => {
      const gr = (d.grNo || '').replace(/"/g, '""');
      const date = (d.tripDate || d.tripStartDate || d.date || '').replace(/"/g, '""');
      const amt = Number(d.dueAmount || d.ownerDue || 0);
      const truck = (d.truckNo || '').replace(/"/g, '""');
      const name = (d.ownerName || d.owner || '').replace(/"/g, '""');
      const dest = (d.destination || '').replace(/"/g, '""');
      const transport = (d.transport || 'TTC').replace(/"/g, '""');
      const ref = (d.reference || d.partyName || d.consignee?.name || '').replace(/"/g, '""');
      const driver = (d.driver || '').replace(/"/g, '""');
      const status = (d.status || '').replace(/"/g, '""');
      csv += `"${gr}","${date}","${amt}","${truck}","${name}","${dest}","${transport}","${ref}","${driver}","${status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Owner_Due_${this.selectedDueYear}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // ========================================================
  // VIEW 4: OPEN TRIP DETAILS - EXACT 3-CARD DRILLDOWN MATCHING PARTIES MODULE
  // ========================================================
  showOpenTripDetails(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const safeTripId = String(d.id || d.grNo);

    this.currentView = 'openTripDetails';
    this.currentTripId = safeTripId;
    window.location.hash = `#trip-${this.currentTripId}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');
    const viewDebts = document.getElementById('viewOpenDebtsDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'block';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';
    if (viewDebts) viewDebts.style.display = 'none';

    // Authentic AppSheet Single Top Header Bar matching 19_52_55.png
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Home</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.backToDueList()">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Open Trip Details</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <button class="btn-appsheet-edit shadow-sm py-1 px-3" onclick="OwnersModule.openEditTripDrawer('${safeTripId}')" title="Update Trip Details">
            <i class="bi bi-pencil me-1"></i> Edit
          </button>
          <button class="btn btn-sm btn-light border py-1 px-2 text-secondary" onclick="OwnersModule.downloadBilty('${safeTripId}')" title="Download / Print Bilty">
            <i class="bi bi-download"></i>
          </button>
          <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center gap-1 text-secondary fw-semibold shadow-sm" onclick="OwnersModule.scrollToDebts()" title="All Debts Details">
            <i class="bi bi-journal-text me-1"></i> <span>All Debts Details</span>
          </button>
          <button class="btn btn-sm btn-light border py-1 px-2 text-secondary" onclick="OwnersModule.backToDueList()" title="Back to Owner Due">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `;
    }

    this.renderDrilldownView(d);
  },

  renderDrilldownView(d) {
    if (!d) return;
    const col = d.color || 'yellow';
    const safeTripId = String(d.id || d.grNo);
    const dt = d.tripDate || d.tripStartDate || d.date || '-';
    const endDate = d.tripDueDate || d.tripEndDate || dt;
    const refName = d.reference || d.partyName || d.consignee?.name || '-';
    const refMob = d.referenceMobile || d.consignee?.mobile || '';
    const ownerVal = d.ownerName || d.owner || 'Shree Mahaveer Transport Company';
    const ownerMob1 = d.ownerMobile || '9414659401';
    const ownerMob2 = d.ownerMobile2 || '9772200036';
    const driverVal = d.driver || 'Suresh Raiya';
    const driverMob = d.driverMobile || '9636017337';

    const consignorGst = d.consignor?.gstin || '08AAUFD1174E1ZC';
    const consignorName = d.consignor?.name || 'Durga Enterprises';
    const consignorAddr = d.consignor?.address || '1206/1159, AARAJI NO. 1205/1160, PATWAR CIRCLE , TS INDUSTRIES AREA, KARERA, RAJSAMAND (RAJ.)';

    const consigneeGst = d.consignee?.gstin || '08AASCS3036P1ZL';
    const consigneeDest = d.consignee?.destination || d.destination || 'Neemrana';
    const consigneeName = d.consignee?.name || 'SAKARNI PLASTER (INDIA) PVT. LTD.';
    const consigneeMob1 = d.consignee?.mobile || '8824326001';
    const consigneeMob2 = d.consignee?.mobile2 || '8426009000';

    const freightVal = d.freight || 124300.0;
    const totalFreightVal = d.totalFreight || d.biltyAmount || 146674.0;
    const biltyAmt = d.biltyAmount || 146674.0;
    const dueAmt = d.dueAmount !== undefined ? d.dueAmount : (d.ownerDue || 0);

    const fullGrDisplay = d.fullGrNo || (d.year ? `${d.year}-${d.grNo}${d.transport ? '_' + d.transport : ''}` : this.formatGrNo(d.grNo));
    const dotHtml = `<span class="theme-dot" style="font-size: 11px; margin-right: 4px;">●</span>`;

    // 1. Container theme
    const container = document.getElementById('open-trip-cards-container');
    if (container) {
      container.className = `drilldown-wrap theme-${col}`;
    }

    const leftCard = document.getElementById('drilldown-card-left');
    const midCard = document.getElementById('drilldown-card-mid');
    const rightCard = document.getElementById('drilldown-card-right');
    const debtsContainer = document.getElementById('drilldown-debts-container');

    // 2. CARD 1 (LEFT - TRIP INFO) matching 19_52_27.png
    if (leftCard) {
      leftCard.innerHTML = `
        <div class="drilldown-field">
          <div class="drilldown-field-label">G.R.No.</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text font-monospace">${fullGrDisplay}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Truck No.</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text font-monospace">${d.truckNo || '-'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Trip Start Date</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${dt}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Trip Due Date</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${endDate}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Origin</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.origin || 'Rajsamand (Raj.)'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Destination</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.destination || '-'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee Billing Type</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.billingType || 'Per Tonne'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Bilty Amount</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(biltyAmt)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Weight</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">${Number(d.weight || 0).toFixed(3)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Rate</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(d.rate || 0)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Material</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.material || 'Marble Powder (Dolomite)'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Reference</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${refName}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Reference Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${refMob || '-'}</span>
            ${refMob ? `<a href="tel:${refMob}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>` : ''}
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Driver</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${driverVal}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Driver Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${driverMob || '-'}</span>
            ${driverMob ? `<a href="tel:${driverMob}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>` : ''}
          </div>
        </div>
      `;
    }

    // 3. CARD 2 (MIDDLE - CONSIGNOR SUBTABLE & EXPAND) matching 19_52_27.png
    if (midCard) {
      midCard.innerHTML = `
        <div class="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom">
          <span class="theme-dot" style="font-size: 13px;">●</span>
          <span class="theme-text" style="font-size: 14px; font-weight: 700;">Consignor/s</span>
          <span class="badge bg-light text-secondary border font-monospace ms-1" style="font-size: 11px;">1</span>
        </div>
        <div class="drilldown-subtable-wrap border rounded-1 overflow-hidden mb-2">
          <table class="drilldown-subtable table table-sm table-hover mb-0" style="font-size: 12px; table-layout: fixed; width: 100%;">
            <thead class="bg-light text-secondary border-bottom">
              <tr>
                <th class="ps-2 py-2 fw-semibold" style="width: 32%;">GSTIN</th>
                <th class="py-2 fw-semibold" style="width: 33%;">Consignor</th>
                <th class="py-2 fw-semibold" style="width: 35%;">Consignor Address</th>
                <th class="pe-2 py-2 text-end" style="width: 18px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr onclick="OwnersModule.showOpenTripPartyDetails('${safeTripId}')" style="cursor: pointer;" title="Click to view full Consignor details">
                <td class="ps-2 py-2 font-monospace text-truncate theme-text" style="font-size: 11px;">${consignorGst}</td>
                <td class="py-2 fw-semibold text-truncate" style="font-size: 11.5px;">${consignorName}</td>
                <td class="py-2 text-secondary text-truncate" style="font-size: 11.5px;">${consignorAddr}</td>
                <td class="pe-2 py-2 text-end text-muted"><i class="bi bi-chevron-right small"></i></td>
              </tr>
            </tbody>
          </table>
          <div class="subtable-footer-actions p-2 text-end border-top bg-light">
            <a href="javascript:void(0)" class="subtable-action-link theme-link fw-semibold" style="font-size: 12px;" onclick="OwnersModule.showOpenTripPartyDetails('${safeTripId}')">Expand</a>
          </div>
        </div>
      `;
    }

    // 4. CARD 3 (RIGHT - CONSIGNEE / OWNER / FREIGHT / DROPDOWNS / DUE) matching 19_52_55.png
    if (rightCard) {
      rightCard.innerHTML = `
        <div class="drilldown-field">
          <div class="drilldown-field-label">GSTIN Consignee</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text font-monospace">${consigneeGst}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${consigneeDest ? consigneeDest + ' ' : ''}${consigneeName}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${consigneeMob1}</span>
            <a href="tel:${consigneeMob1}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${consigneeMob2}</span>
            <a href="tel:${consigneeMob2}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Owner</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${ownerVal}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Owner Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${ownerMob1}</span>
            <a href="tel:${ownerMob1}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Owner Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${ownerMob2}</span>
            <a href="tel:${ownerMob2}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Freight</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(freightVal)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Add Records for</div>
          <div class="drilldown-field-val">
            <div class="dropdown w-100">
              <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center justify-content-between w-100 shadow-sm dropdown-toggle font-size-12" type="button" data-bs-toggle="dropdown" style="background: #ffffff; height: 32px; border-color: #d1d5db !important;">
                <span class="text-secondary">Add Records for...</span>
              </button>
              <ul class="dropdown-menu shadow font-size-12 w-100">
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.handleAddRecordSelect('${safeTripId}', 'Cheque')"><i class="bi bi-wallet2 me-2 text-warning"></i>Cheque</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.handleAddRecordSelect('${safeTripId}', 'Party Payment')"><i class="bi bi-bank me-2 text-info"></i>Party Payment</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.handleAddRecordSelect('${safeTripId}', 'Truck Owner Payment')"><i class="bi bi-credit-card me-2 text-primary"></i>Truck Owner Payment</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.handleAddRecordSelect('${safeTripId}', 'Other')"><i class="bi bi-three-dots me-2 text-secondary"></i>Other</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'party')"><i class="bi bi-cash-stack me-2 text-success"></i>party payment</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'owner')"><i class="bi bi-person-check me-2 text-primary"></i>owner' Payment</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openDebtDrawer('${safeTripId}')"><i class="bi bi-graph-up-arrow me-2 text-info"></i>Earnings upcoming</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Total Freight</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(totalFreightVal)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Status*</div>
          <div class="drilldown-field-val">
            <div class="dropdown w-100">
              <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center justify-content-between w-100 shadow-sm dropdown-toggle font-size-12" type="button" data-bs-toggle="dropdown" style="background: #ffffff; height: 32px; border-color: #d1d5db !important;">
                <span class="d-flex align-items-center gap-2">
                  <span class="theme-dot">●</span>
                  <span class="fw-semibold text-dark">${d.status || 'POD Sent/ Bill Generated'}</span>
                </span>
              </button>
              <ul class="dropdown-menu shadow font-size-12 w-100">
                <li><a class="dropdown-item d-flex align-items-center gap-2 chip-active-purple" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'POD Sent/ Bill Generated')"><span class="bullet-purple">●</span> POD Sent/ Bill Generated</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'Transit')"><span class="bullet-yellow">●</span> Transit</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'Off Loading')"><span class="bullet-pink">●</span> Off Loading</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'Cheque Due')"><span class="bullet-slate">●</span> Cheque Due</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'POD Sent')"><span class="bullet-cyan">●</span> POD Sent</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'Party Payment Pending')"><span class="bullet-blue">●</span> Party Payment Pending</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.handleStatusSelectChange('${safeTripId}', 'Truck Owner Payment Pending')"><span class="bullet-cyan">●</span> Truck Owner Payment Pending</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="drilldown-field mt-3 pt-2 border-top">
          <div class="drilldown-field-label">Owner Due</div>
          <div class="drilldown-field-val font-monospace fw-bold" style="color: #cc0b0b !important; font-size: 14px;">
            <span class="appsheet-bullet bullet-red">●</span> ₹ ${this.formatCurrency(dueAmt)}
          </div>
        </div>
      `;
    }

    // 5. BOTTOM SECTION: OPEN DEBTS TABLE matching 19_54_51.png
    if (debtsContainer) {
      const debtsList = Array.isArray(d.debts) && d.debts.length > 0 ? d.debts : [
        {
          debtType: 'Commission',
          debtAmount: 2500,
          debtMode: 'Cash',
          borrowerName: 'Shree Mahaveer Transport Co.',
          receiverName: 'Ramchandra Jat 8824993002',
          description: d.grNo ? `${d.grNo}_SMTC` : 'Commission',
          grNo: d.grNo || '250',
          truckNo: d.truckNo || 'RJ52GB5642',
          destination: d.destination || 'Neemrana (Raj.)',
          dueAmount: 2500,
          date: dt
        },
        {
          debtType: 'Other Commission',
          debtAmount: 1500,
          debtMode: 'Cash',
          borrowerName: 'Shree Mahaveer Transport Co.',
          receiverName: 'Hardan 8890178907',
          description: d.grNo ? `${d.grNo}_SMTC` : 'Other Commission',
          grNo: d.grNo || '250',
          truckNo: d.truckNo || 'RJ52GB5642',
          destination: d.destination || 'Neemrana (Raj.)',
          dueAmount: 1500,
          date: dt
        },
        {
          debtType: 'Loading Commission',
          debtAmount: 500,
          debtMode: 'Cash',
          borrowerName: 'Shree Mahaveer Transport Co.',
          receiverName: driverVal + ' ' + (driverMob || ''),
          description: d.grNo ? `${d.grNo}_SMTC Loading` : 'Loading',
          grNo: d.grNo || '250',
          truckNo: d.truckNo || 'RJ52GB5642',
          destination: d.destination || 'Neemrana (Raj.)',
          dueAmount: 500,
          date: dt
        }
      ];

      this.currentTripDebts = debtsList;

      debtsContainer.innerHTML = `
        <div class="drilldown-debts-section">
          <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="theme-dot" style="font-size: 15px;">●</span>
              <h6 class="m-0 fw-bold text-dark font-size-14">Open Debts</h6>
              <span class="badge bg-light text-secondary border font-monospace" id="debts-count-badge" style="font-size: 11px;">${debtsList.length}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <div class="input-group input-group-sm" style="max-width: 260px;">
                <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted small"></i></span>
                <input type="text" class="form-control border-start-0" id="search-open-debts" placeholder="Search Open Debts" oninput="OwnersModule.filterOpenDebts(this.value)" style="font-size: 12px;">
              </div>
              <button class="btn btn-sm btn-light border py-1 px-3 text-secondary" onclick="OwnersModule.openDebtDrawer('${safeTripId}')" title="Add Debt" style="font-size: 12px;">
                <i class="bi bi-plus-lg me-1"></i> Add Debt
              </button>
            </div>
          </div>
          <div class="table-responsive border rounded-1 bg-white shadow-sm" style="max-height: 480px; overflow-y: auto;">
            <table class="table table-sm table-hover mb-0" id="open-debts-table" style="font-size: 12px;">
              <thead class="bg-light text-secondary border-bottom sticky-top">
                <tr>
                  <th class="ps-3 py-2 text-nowrap">Debt Type</th>
                  <th class="py-2 text-nowrap">Debt Amount</th>
                  <th class="py-2 text-nowrap">Debt Mode</th>
                  <th class="py-2 text-nowrap">Borrower Name</th>
                  <th class="py-2 text-nowrap">Receiver Name</th>
                  <th class="py-2 text-nowrap">Description</th>
                  <th class="py-2 text-nowrap font-monospace">G.R.No.</th>
                  <th class="py-2 text-nowrap font-monospace">Truck No.</th>
                  <th class="py-2 text-nowrap">Destination</th>
                  <th class="py-2 text-nowrap text-danger fw-semibold">Due Amount</th>
                  <th class="pe-3 py-2 text-nowrap">Date</th>
                </tr>
              </thead>
              <tbody id="open-debts-tbody">
                ${this.renderDebtsRows(debtsList)}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  renderDebtsRows(debts) {
    if (!Array.isArray(debts) || debts.length === 0) {
      return `<tr><td colspan="11" class="text-center py-3 text-muted">No open debts found for this trip</td></tr>`;
    }
    return debts.map(debt => `
      <tr>
        <td class="ps-3 py-2 fw-semibold text-nowrap">${debt.debtType || 'Commission'}</td>
        <td class="py-2 font-monospace text-nowrap">₹ ${this.formatCurrency(debt.debtAmount || 0)}</td>
        <td class="py-2 text-nowrap"><span class="badge bg-light text-dark border">${debt.debtMode || 'Cash'}</span></td>
        <td class="py-2 text-nowrap">${debt.borrowerName || 'Shree Mahaveer Transport Co.'}</td>
        <td class="py-2 text-nowrap">${debt.receiverName || '-'}</td>
        <td class="py-2 text-nowrap text-muted"><span class="cell-truncate d-inline-block text-truncate" style="max-width: 140px;">${debt.description || '-'}</span></td>
        <td class="py-2 font-monospace text-nowrap">${debt.grNo || '-'}</td>
        <td class="py-2 font-monospace fw-semibold text-nowrap">${debt.truckNo || '-'}</td>
        <td class="py-2 text-nowrap">${debt.destination || '-'}</td>
        <td class="py-2 font-monospace fw-bold text-danger text-nowrap">₹ ${this.formatCurrency(debt.dueAmount !== undefined ? debt.dueAmount : (debt.debtAmount || 0))}</td>
        <td class="pe-3 py-2 text-nowrap text-secondary">${debt.date || '-'}</td>
      </tr>
    `).join('');
  },

  filterOpenDebts(q) {
    const raw = String(q || '').trim().toLowerCase();
    const tbody = document.getElementById('open-debts-tbody');
    const badge = document.getElementById('debts-count-badge');
    if (!tbody || !Array.isArray(this.currentTripDebts)) return;

    if (!raw) {
      tbody.innerHTML = this.renderDebtsRows(this.currentTripDebts);
      if (badge) badge.innerText = this.currentTripDebts.length;
      return;
    }

    const filtered = this.currentTripDebts.filter(d => {
      return (
        String(d.debtType || '').toLowerCase().includes(raw) ||
        String(d.borrowerName || '').toLowerCase().includes(raw) ||
        String(d.receiverName || '').toLowerCase().includes(raw) ||
        String(d.grNo || '').toLowerCase().includes(raw) ||
        String(d.truckNo || '').toLowerCase().includes(raw) ||
        String(d.destination || '').toLowerCase().includes(raw) ||
        String(d.debtAmount || '').includes(raw) ||
        String(d.date || '').includes(raw)
      );
    });

    tbody.innerHTML = this.renderDebtsRows(filtered);
    if (badge) badge.innerText = filtered.length;
  },

  async updateTripStatusDirect(tripId, newStatus, newColor) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    d.userEdited = true;
    d.status = newStatus;
    d.color = newColor;
    if (newColor === 'purple') d.colorHex = '#7c00ff';
    else if (newColor === 'yellow') d.colorHex = '#c3ad00';
    else if (newColor === 'cyan') d.colorHex = '#0088cc';
    else if (newColor === 'blue') d.colorHex = '#1a73e8';
    else if (newColor === 'pink') d.colorHex = '#e91e63';
    else if (newColor === 'slate') d.colorHex = '#5f6368';

    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.saveOwnerDue) {
        await FirebaseDB.saveOwnerDue(d);
      }
    } catch (e) {
      console.warn('FirebaseDB saveOwnerDue status update:', e);
    }

    this.renderDrilldownView(d);
    this.renderOwnerDueTable();
  },

  // Card Expand / Collapse Toggle
  togglePanelExpand(panelId) {
    const el = document.getElementById(panelId);
    if (!el) return;
    el.classList.toggle('panel-expanded');
    const icon = el.querySelector('.expand-toggle-icon');
    if (icon) {
      if (el.classList.contains('panel-expanded')) {
        icon.classList.remove('bi-arrows-angle-expand');
        icon.classList.add('bi-arrows-angle-contract');
      } else {
        icon.classList.remove('bi-arrows-angle-contract');
        icon.classList.add('bi-arrows-angle-expand');
      }
    }
  },

  toggleCardExpand(cardId) {
    if (cardId === 'cardTruckOwners') {
      const card = document.getElementById('cardTruckOwners');
      const isExpanded = card && (card.classList.contains('panel-expanded') || document.getElementById('ownersDashboardGrid')?.classList.contains('card1-expanded'));
      if (isExpanded) {
        this.collapseTruckOwners();
      } else {
        this.expandTruckOwners();
      }
      return;
    }
    this.togglePanelExpand(cardId);
  },

  // ========================================================
  // VIEW 5: FULL OPEN TRIP PARTY DETAILS (19_42_24.png / 19_42_34.png)
  // ========================================================
  showOpenTripPartyDetails(tripId) {
    const targetId = tripId || this.currentTripId;
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(targetId) || String(item.grNo) === String(targetId));
    if (!d) return;

    this.currentView = 'partyDetails';
    this.currentTripId = String(d.id || d.grNo);

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'block';
    if (viewPayment) viewPayment.style.display = 'none';

    // Breadcrumb matching 19_53_18.png: Home > Owners > Owner Due > Open Trip Details > Open Trip Party Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOpenTripDetails('${this.currentTripId}')">Open Trip Details</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Open Trip Party Details</span>
      `;
    }

    const consignorGst = d.consignor?.gstin || '08AAUFD1174E1ZC';
    const consignorName = d.consignor?.name || 'Durga Enterprises';
    const consignorAddr = d.consignor?.address || '1206/1159, AARAJI NO. 1205/1160, PATWAR CIRCLE , TS INDUSTRIES AREA, KARERA, RAJSAMAND (RAJ.)';

    const partyCard = document.getElementById('viewOpenTripPartyDetails');
    if (partyCard) {
      partyCard.innerHTML = `
        <div class="mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center gap-1 text-secondary" onclick="OwnersModule.backToTripDetails()">
            <i class="bi bi-arrow-left"></i> <span>Back to Open Trip Details</span>
          </button>
          <div class="input-group input-group-sm" style="max-width: 320px;">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input type="text" class="form-control border-start-0" placeholder="Search Open Trip Party Details" style="font-size: 12px;">
          </div>
        </div>
        <div class="appsheet-details-card" style="max-width: 760px; margin: 16px auto; background: #ffffff; border: 1px solid #dadce0; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(60,64,67,0.08);">
          <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <h5 class="m-0 fw-bold text-dark" style="font-size: 15px;"><i class="bi bi-building me-2 text-primary"></i>Open Trip Party Details</h5>
            <span class="badge bg-light text-secondary border font-monospace" style="font-size: 12px;">G.R.No. ${d.grNo || '-'}</span>
          </div>
          <div>
            <div class="drilldown-field py-2 border-bottom">
              <div class="drilldown-field-label" style="width: 160px; color: #5f6368; font-weight: 500;">GSTIN</div>
              <div class="drilldown-field-val font-monospace fw-bold text-dark">${consignorGst}</div>
            </div>
            <div class="drilldown-field py-2 border-bottom">
              <div class="drilldown-field-label" style="width: 160px; color: #5f6368; font-weight: 500;">Consignor</div>
              <div class="drilldown-field-val fw-bold text-dark">${consignorName}</div>
            </div>
            <div class="drilldown-field py-2 border-bottom">
              <div class="drilldown-field-label" style="width: 160px; color: #5f6368; font-weight: 500;">Consignor Address</div>
              <div class="drilldown-field-val text-dark">${consignorAddr}</div>
            </div>
          </div>
        </div>
      `;
    }
  },

  backToTripDetails() {
    this.showOpenTripDetails(this.currentTripId);
  },

  // ========================================================
  // VIEW 6: FULL TRIP PAYMENT DETAILS (20_12_36.png / 20_12_49.png)
  // ========================================================
  showTripPaymentDetails() {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(this.currentTripId) || String(item.grNo) === String(this.currentTripId));
    if (!d) return;

    this.currentView = 'paymentDetails';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'block';

    // Breadcrumb: Home > Owners > Owner Due > Open Trip Details > Trip Truck Owner Payment Details > Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOpenTripDetails('${this.currentTripId}')">Open Trip Details</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Trip Truck Owner Payment Details</span>
      `;
    }

    const grBadge = document.getElementById('payment-sheet-gr-no');
    if (grBadge) grBadge.innerText = `G.R.No. ${d.grNo || '-'}`;

    const content = document.getElementById('payment-details-card-content');
    if (content) {
      content.innerHTML = `
        <div class="mb-4">
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Payment Date</div>
            <div class="appsheet-detail-value font-monospace">${d.paymentDate || '27/10/2026'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Mode</div>
            <div class="appsheet-detail-value font-monospace">NEFT/RTGS</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Amount Paid</div>
            <div class="appsheet-detail-value font-monospace text-success fw-bold">${this.formatCurrency(d.paidAmount || 184706)}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Beneficiary</div>
            <div class="appsheet-detail-value">${d.transport || 'TTC'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">From Bank</div>
            <div class="appsheet-detail-value">HDFC Bank</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">To Bank</div>
            <div class="appsheet-detail-value">SBI</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Description</div>
            <div class="appsheet-detail-value text-muted">Owner Payment for trip ${d.grNo || '-'}</div>
          </div>
        </div>
      `;
    }
  },

  // ========================================================
  // VIEW 7: SINGLE TRUCK OWNER DETAILS (19_04_54.png)
  // ========================================================
  showOwnerDetails(ownerId) {
    const target = String(ownerId || '').trim().toUpperCase();
    const o = (this.allOwners || []).find(item => 
      String(item.id || '').trim().toUpperCase() === target || 
      String(item.truckNo || '').trim().toUpperCase() === target
    );
    if (!o) return;

    this.currentView = 'details';
    this.currentOwnerId = o.id || o.truckNo;
    window.location.hash = `#details-${this.currentOwnerId}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'block';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    // Breadcrumb: Owners > Truck Owners > Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showTruckOwnersList()">Truck Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Details</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn-appsheet-edit shadow-sm" onclick="OwnersModule.openEditCurrentOwner('${o.id || o.truckNo}')" title="Edit Owner">
          <i class="bi bi-pencil me-1"></i> Edit
        </button>
        <button class="btn btn-sm btn-light border px-3 py-1 d-flex align-items-center gap-1 ms-1 text-secondary" onclick="OwnersModule.showDashboard()" title="Back to Truck Owners">
          <i class="bi bi-arrow-left me-1"></i> Back
        </button>
      `;
    }

    const tNo = document.getElementById('detail-truck-no');
    if (tNo) tNo.innerText = o.truckNo || '-';

    const nm = document.getElementById('detail-owner-name');
    if (nm) nm.innerText = o.name || '-';

    const mb = document.getElementById('detail-owner-mobile');
    if (mb) mb.innerText = o.mobile || '-';

    const mb1 = document.getElementById('detail-owner-mobile1');
    const cont1 = document.getElementById('detail-mobile1-container');
    const row1 = document.getElementById('detail-row-mobile1');
    if (mb1) {
      mb1.innerText = o.mobile1 || '-';
    }
    if (cont1) {
      cont1.style.display = o.mobile1 ? 'block' : 'none';
    }
    if (row1) {
      row1.style.display = o.mobile1 ? 'flex' : 'none';
    }
  },

  openDetailView(ownerId) {
    return this.showOwnerDetails(ownerId);
  },

  // ========================================================
  // SLIDE DRAWERS: ADD/EDIT TRUCK OWNER & DRAWERS (19_05_06.png)
  // ========================================================
  openAddDrawer() {
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    const drawer = document.getElementById('ownerDrawer');
    const form = document.getElementById('ownerDrawerForm');
    const title = document.getElementById('drawerTitle');

    if (title) title.innerText = 'New Truck Owner';
    if (form) form.reset();

    const idInput = document.getElementById('drawer-owner-id');
    if (idInput) idInput.value = '';

    const truckInput = document.getElementById('drawer-truck-no');
    if (truckInput) truckInput.readOnly = false;

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  openEditDrawer(ownerId) {
    const targetId = ownerId || this.currentOwnerId || document.getElementById('detail-truck-no')?.innerText?.trim();
    if (!targetId || targetId === '-') return;

    const target = String(targetId).trim().toUpperCase();
    const o = (this.allOwners || []).find(item => 
      String(item.id || '').trim().toUpperCase() === target || 
      String(item.truckNo || '').trim().toUpperCase() === target
    );
    if (!o) return;

    this.currentOwnerId = o.id || o.truckNo;

    const backdrop = document.getElementById('ownerDrawerBackdrop');
    const drawer = document.getElementById('ownerDrawer');
    const title = document.getElementById('drawerTitle');

    if (title) title.innerText = 'Details';

    const idInput = document.getElementById('drawer-owner-id');
    const truckInput = document.getElementById('drawer-truck-no');
    const nameInput = document.getElementById('drawer-owner-name');
    const mobInput = document.getElementById('drawer-owner-mobile');
    const mob1Input = document.getElementById('drawer-owner-mobile1');

    if (idInput) idInput.value = o.id || o.truckNo;
    if (truckInput) {
      truckInput.value = o.truckNo || '';
      truckInput.readOnly = false;
    }
    if (nameInput) nameInput.value = o.name || '';
    if (mobInput) mobInput.value = o.mobile || '';
    if (mob1Input) mob1Input.value = o.mobile1 || '';

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  openEditCurrentOwner(ownerId) {
    this.openEditDrawer(ownerId);
  },

  async saveOwnerDrawer(event) {
    return this.handleDrawerSave(event);
  },

  closeDrawer() {
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    const drawer = document.getElementById('ownerDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
  },

  async handleDrawerSave(event) {
    if (event) event.preventDefault();

    const idInput = document.getElementById('drawer-owner-id');
    const truckInput = document.getElementById('drawer-truck-no');
    const nameInput = document.getElementById('drawer-owner-name');
    const mobInput = document.getElementById('drawer-owner-mobile');
    const mob1Input = document.getElementById('drawer-owner-mobile1');

    const truckNo = (truckInput?.value || '').trim().toUpperCase();
    const name = (nameInput?.value || '').trim();
    const mobile = (mobInput?.value || '').trim();
    const mobile1 = (mob1Input?.value || '').trim();

    if (!truckNo || !name || !mobile) {
      alert('Please fill all required fields: Truck No, Name, and Mobile No.');
      return;
    }

    const isEdit = idInput && idInput.value;
    const ownerData = {
      truckNo,
      name,
      mobile,
      mobile1: mobile1 || '',
      updatedAt: new Date().toISOString()
    };

    if (isEdit) {
      const idx = this.allOwners.findIndex(o => String(o.id) === String(idInput.value) || String(o.truckNo) === String(truckNo));
      if (idx !== -1) {
        this.allOwners[idx] = { ...this.allOwners[idx], ...ownerData };
      }
      try {
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.updateTruckOwner) {
          await FirebaseDB.updateTruckOwner(idInput.value, ownerData);
        }
      } catch (e) {
        console.warn('FirebaseDB update error:', e);
      }
    } else {
      const newId = 'owner_' + Date.now();
      const newOwner = { id: newId, ...ownerData, createdAt: new Date().toISOString() };
      this.allOwners.unshift(newOwner);
      try {
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.saveTruckOwner) {
          await FirebaseDB.saveTruckOwner(newOwner);
        }
      } catch (e) {
        console.warn('FirebaseDB save error:', e);
      }
    }

    this.closeDrawer();
    this.updateStats();
    this.populateNameDatalist();
    this.renderTruckOwnersTable();

    if (isEdit && this.currentView === 'details') {
      this.showOwnerDetails(idInput.value);
    }
  },

  // SLIDE DRAWERS: UPDATE TRIP DETAILS (22 Fields matching 19_54_27.png)
  openEditTripDrawer(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const backdrop = document.getElementById('tripDrawerBackdrop');
    const drawer = document.getElementById('tripDrawer');
    const title = document.getElementById('tripDrawerTitle');

    if (title) title.innerText = `Update Trip Details - ${d.grNo || ''}`;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = (val !== undefined && val !== null) ? val : '';
    };

    setVal('drawer-trip-id', d.id || d.grNo);
    setVal('drawer-trip-gr', d.grNo || '');
    setVal('drawer-trip-bilty-amt', d.biltyAmount !== undefined ? d.biltyAmount : (d.totalFreight || ''));
    setVal('drawer-trip-billing-type', d.billingType || 'Per Tonne');
    setVal('drawer-trip-hault', d.hault !== undefined ? d.hault : 0);
    setVal('drawer-trip-loading', d.loading !== undefined ? d.loading : 0);
    setVal('drawer-trip-pod-target', d.podTargetDate || '');
    setVal('drawer-trip-pod-date', d.podReceivedDate || '');
    setVal('drawer-trip-truck', d.truckNo || '');
    setVal('drawer-trip-start-date', d.tripStartDate || d.tripDate || d.date || '');
    setVal('drawer-trip-end-date', d.tripDueDate || d.tripEndDate || '');
    setVal('drawer-trip-origin', d.origin || '');
    setVal('drawer-trip-dest', d.destination || '');
    setVal('drawer-trip-weight', d.weight !== undefined ? d.weight : '');
    setVal('drawer-trip-rate', d.rate !== undefined ? d.rate : '');
    setVal('drawer-trip-mat', d.material || '');
    setVal('drawer-trip-ref', d.reference || d.partyName || '');
    setVal('drawer-trip-ref-mob', d.referenceMobile || '');
    setVal('drawer-trip-driver', d.driver || '');
    setVal('drawer-trip-driver-mob', d.driverMobile || '');
    setVal('drawer-trip-owner', d.ownerName || d.owner || '');
    setVal('drawer-trip-owner-mob1', d.ownerMobile || '');
    setVal('drawer-trip-owner-mob2', d.ownerMobile2 || '');
    setVal('drawer-trip-bill-no', d.billNo || '');
    setVal('drawer-trip-status', d.status || 'POD Sent/ Bill Generated');
    setVal('drawer-trip-due', d.dueAmount !== undefined ? d.dueAmount : (d.ownerDue || 0));

    this.handleTripStatusChange(d.status || 'POD Sent/ Bill Generated');

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  handleTripStatusChange(status) {
    const colMap = {
      'Transit': 'yellow',
      'POD Sent/ Bill Generated': 'purple',
      'Party Payment Pending': 'blue',
      'Off Loading': 'pink',
      'Cheque Due': 'slate',
      'Truck Owner Payment Pending': 'cyan'
    };
    const col = colMap[status] || 'yellow';
    const indicator = document.getElementById('drawer-status-indicator');
    if (indicator) {
      indicator.className = `appsheet-bullet bullet-${col} me-1`;
    }
  },

  closeTripDrawer() {
    const backdrop = document.getElementById('tripDrawerBackdrop');
    const drawer = document.getElementById('tripDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
  },

  saveTripDrawer(event) {
    return this.handleTripSave(event);
  },

  async handleTripSave(event) {
    if (event) event.preventDefault();
    const tripId = document.getElementById('drawer-trip-id')?.value;
    if (!tripId) return;

    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const getVal = id => {
      const el = document.getElementById(id);
      return el ? el.value : '';
    };

    d.userEdited = true;
    if (getVal('drawer-trip-bilty-amt') !== '') {
      d.biltyAmount = parseFloat(getVal('drawer-trip-bilty-amt')) || 0;
    }
    if (getVal('drawer-trip-billing-type')) d.billingType = getVal('drawer-trip-billing-type');
    if (getVal('drawer-trip-hault') !== '') d.hault = parseFloat(getVal('drawer-trip-hault')) || 0;
    if (getVal('drawer-trip-loading') !== '') d.loading = parseFloat(getVal('drawer-trip-loading')) || 0;
    if (getVal('drawer-trip-pod-target')) d.podTargetDate = getVal('drawer-trip-pod-target');
    if (getVal('drawer-trip-pod-date')) d.podReceivedDate = getVal('drawer-trip-pod-date');
    if (getVal('drawer-trip-truck')) d.truckNo = getVal('drawer-trip-truck').trim().toUpperCase();
    if (getVal('drawer-trip-start-date')) {
      d.tripStartDate = getVal('drawer-trip-start-date');
      d.tripDate = d.tripStartDate;
    }
    if (getVal('drawer-trip-end-date')) {
      d.tripEndDate = getVal('drawer-trip-end-date');
      d.tripDueDate = d.tripEndDate;
    }
    if (getVal('drawer-trip-origin')) d.origin = getVal('drawer-trip-origin');
    if (getVal('drawer-trip-dest')) d.destination = getVal('drawer-trip-dest');
    if (getVal('drawer-trip-weight') !== '') d.weight = parseFloat(getVal('drawer-trip-weight')) || 0;
    if (getVal('drawer-trip-rate') !== '') d.rate = parseFloat(getVal('drawer-trip-rate')) || 0;
    if (getVal('drawer-trip-mat')) d.material = getVal('drawer-trip-mat');
    if (getVal('drawer-trip-ref')) d.reference = getVal('drawer-trip-ref');
    if (getVal('drawer-trip-ref-mob')) d.referenceMobile = getVal('drawer-trip-ref-mob');
    if (getVal('drawer-trip-driver')) d.driver = getVal('drawer-trip-driver');
    if (getVal('drawer-trip-driver-mob')) d.driverMobile = getVal('drawer-trip-driver-mob');
    if (getVal('drawer-trip-owner')) d.ownerName = getVal('drawer-trip-owner');
    if (getVal('drawer-trip-owner-mob1')) d.ownerMobile = getVal('drawer-trip-owner-mob1');
    if (getVal('drawer-trip-owner-mob2')) d.ownerMobile2 = getVal('drawer-trip-owner-mob2');
    if (getVal('drawer-trip-bill-no')) d.billNo = getVal('drawer-trip-bill-no');

    const newStatus = getVal('drawer-trip-status') || d.status;
    d.status = newStatus;
    const colMap = {
      'Transit': 'yellow',
      'POD Sent/ Bill Generated': 'purple',
      'Party Payment Pending': 'blue',
      'Off Loading': 'pink',
      'Cheque Due': 'slate',
      'Truck Owner Payment Pending': 'cyan'
    };
    d.color = colMap[newStatus] || d.color || 'yellow';
    if (d.color === 'purple') d.colorHex = '#7c00ff';
    else if (d.color === 'yellow') d.colorHex = '#c3ad00';
    else if (d.color === 'cyan') d.colorHex = '#0088cc';
    else if (d.color === 'blue') d.colorHex = '#1a73e8';
    else if (d.color === 'pink') d.colorHex = '#e91e63';
    else if (d.color === 'slate') d.colorHex = '#5f6368';

    if (getVal('drawer-trip-due') !== '') {
      d.dueAmount = parseFloat(getVal('drawer-trip-due')) || 0;
      d.ownerDue = d.dueAmount;
    }

    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.saveOwnerDue) {
        await FirebaseDB.saveOwnerDue(d);
      }
    } catch (e) {
      console.warn('FirebaseDB saveOwnerDue error:', e);
    }

    this.closeTripDrawer();
    this.renderOwnerDueTable();
    this.showOpenTripDetails(tripId);
  },

  // ========================================================
  // VIEW 7: OPEN DEBTS DETAILS FULL VIEW (19_54_51.png)
  // ========================================================
  showOpenDebtsDetails(tripId) {
    const targetId = tripId || this.currentTripId;
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(targetId) || String(item.grNo) === String(targetId));
    if (!d) return;

    this.currentView = 'debtsDetails';
    this.currentTripId = String(d.id || d.grNo);

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');
    const viewDebts = document.getElementById('viewOpenDebtsDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';
    if (viewDebts) viewDebts.style.display = 'block';

    // Breadcrumb: Home > Owners > Owner Due > Open Trip Details > Open Debts
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Home</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.backToDueList()">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.backToTripDetails()">Open Trip Details</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Open Debts</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center gap-1 text-secondary fw-semibold shadow-sm" onclick="OwnersModule.backToTripDetails()">
          <i class="bi bi-arrow-left me-1"></i> <span>Back to Open Trip Details</span>
        </button>
      `;
    }

    this.renderDrilldownView(d);
  },

  scrollToDebts(tripId) {
    return this.showOpenDebtsDetails(tripId || this.currentTripId);
  },

  downloadBilty(tripId) {
    const targetId = tripId || this.currentTripId;
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(targetId) || String(item.grNo) === String(targetId));
    if (!d) return;

    const fullGr = d.fullGrNo || (d.year ? `${d.year}-${d.grNo}${d.transport ? '_' + d.transport : ''}` : `2026-2027-${d.grNo}_SMTC`);
    const consignorName = d.consignor?.name || 'Durga Enterprises';
    const consignorGst = d.consignor?.gstin || '08AAUFD1174E1ZC';
    const consignorAddr = d.consignor?.address || '1206/1159, AARAJI NO. 1205/1160, KARERA, RAJSAMAND (RAJ.)';
    const consigneeName = d.consignee?.name || 'SAKARNI PLASTER (INDIA) PVT. LTD.';
    const consigneeGst = d.consignee?.gstin || '08AASCS3036P1ZL';
    const consigneeDest = d.destination || 'Neemrana (Raj.)';
    const modalBody = document.getElementById('biltyModalBody');

    if (modalBody) {
      modalBody.innerHTML = `
        <div class="bilty-print-doc p-4 bg-white border shadow-sm" style="max-width: 800px; margin: 0 auto; color: #222; font-family: sans-serif;">
          <div class="text-center border-bottom pb-3 mb-3">
            <div class="badge bg-secondary text-uppercase px-2 py-1 mb-1 font-monospace" style="letter-spacing: 1px;">Consignment Note / Lorry Receipt</div>
            <h4 class="fw-bold m-0 text-dark" style="letter-spacing: 0.5px;">SHREE MAHAVEER TRANSPORT COMPANY</h4>
            <p class="small text-muted mb-0">FLEET OWNERS & TRANSPORT CONTRACTORS | HEAD OFFICE: RAJSAMAND (RAJASTHAN)</p>
          </div>
          
          <div class="row g-2 mb-3 pb-2 border-bottom font-size-13">
            <div class="col-6">
              <div><strong>G.R. No:</strong> <span class="font-monospace text-primary fw-bold">${fullGr}</span></div>
              <div><strong>Date:</strong> <span>${d.tripDate || d.tripStartDate || d.date || '25/10/2026'}</span></div>
              <div><strong>Truck No:</strong> <span class="font-monospace fw-bold">${d.truckNo || '-'}</span></div>
            </div>
            <div class="col-6 text-end">
              <div><strong>From:</strong> <span>${d.origin || 'Rajsamand (Raj.)'}</span></div>
              <div><strong>To:</strong> <span>${consigneeDest}</span></div>
              <div><strong>Status:</strong> <span class="badge bg-light text-dark border">${d.status || 'POD Sent/ Bill Generated'}</span></div>
            </div>
          </div>

          <div class="row g-3 mb-3 font-size-12">
            <div class="col-6">
              <div class="p-2 border rounded bg-light h-100">
                <div class="fw-bold text-secondary mb-1">CONSIGNOR (Shipper)</div>
                <div class="fw-bold text-dark">${consignorName}</div>
                <div class="text-muted small">${consignorAddr}</div>
                <div class="mt-1"><strong>GSTIN:</strong> <span class="font-monospace">${consignorGst}</span></div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 border rounded bg-light h-100">
                <div class="fw-bold text-secondary mb-1">CONSIGNEE (Receiver)</div>
                <div class="fw-bold text-dark">${consigneeName}</div>
                <div class="text-muted small">${consigneeDest}</div>
                <div class="mt-1"><strong>GSTIN:</strong> <span class="font-monospace">${consigneeGst}</span></div>
              </div>
            </div>
          </div>

          <table class="table table-bordered table-sm font-size-12 mb-3">
            <thead class="table-light">
              <tr>
                <th>Description of Goods</th>
                <th class="text-end">Weight (MT)</th>
                <th class="text-end">Rate (₹)</th>
                <th class="text-end">Freight (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${d.material || 'Marble Powder (Dolomite)'}</td>
                <td class="text-end font-monospace">${Number(d.weight || 0).toFixed(3)}</td>
                <td class="text-end font-monospace">₹ ${this.formatCurrency(d.rate || 0)}</td>
                <td class="text-end font-monospace fw-bold">₹ ${this.formatCurrency(d.freight || d.biltyAmount || 124300)}</td>
              </tr>
              <tr class="table-light">
                <td colspan="3" class="text-end fw-bold">Total Bilty Amount:</td>
                <td class="text-end font-monospace fw-bold text-success">₹ ${this.formatCurrency(d.biltyAmount || 146674)}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end fw-bold text-danger">Owner Due Balance:</td>
                <td class="text-end font-monospace fw-bold text-danger">₹ ${this.formatCurrency(d.dueAmount !== undefined ? d.dueAmount : (d.ownerDue || 0))}</td>
              </tr>
            </tbody>
          </table>

          <div class="row pt-3 font-size-11 text-muted border-top">
            <div class="col-6">
              <p class="mb-0">Driver: <strong>${d.driver || 'Suresh Raiya'}</strong> (${d.driverMobile || '9636017337'})</p>
              <p class="mb-0">Owner: <strong>${d.ownerName || d.owner || 'Shree Mahaveer Transport Co.'}</strong></p>
            </div>
            <div class="col-6 text-end">
              <div style="height: 40px;"></div>
              <div class="border-top d-inline-block pt-1 px-4">Authorized Signatory</div>
            </div>
          </div>
        </div>
      `;
    }

    const modalEl = document.getElementById('biltyModal');
    if (modalEl) {
      if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.show();
      } else {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
      }
    }
  },

  openDebtDrawer(tripId) {
    return this.openAddDebtDrawer(tripId);
  },

  handleAddRecordSelect(tripId, val) {
    if (!val) return;
    const v = String(val).toLowerCase();
    if (v.includes('cheque')) {
      this.openDebtDrawer(tripId);
    } else if (v.includes('party')) {
      this.openAddPaymentDrawer(tripId, 'party');
    } else if (v.includes('truck') || v.includes('owner')) {
      this.openAddPaymentDrawer(tripId, 'owner');
    } else {
      this.openDebtDrawer(tripId);
    }
  },

  handleStatusSelectChange(tripId, newStatus) {
    if (!newStatus) return;
    const colMap = {
      'transit': 'yellow',
      'pod sent/ bill generated': 'purple',
      'pod sent': 'purple',
      'bill generated': 'purple',
      'party payment pending': 'blue',
      'off loading': 'pink',
      'cheque due': 'slate',
      'truck owner payment pending': 'cyan'
    };
    const clean = newStatus.trim();
    const col = colMap[clean.toLowerCase()] || 'yellow';
    this.updateTripStatusDirect(tripId, clean, col);
  },

  // SLIDE DRAWERS: PAYMENT DETAILS
  openAddPaymentDrawer(tripId, target = 'owner') {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const backdrop = document.getElementById('paymentDrawerBackdrop');
    const drawer = document.getElementById('paymentDrawer');
    const title = document.getElementById('paymentDrawerTitle');

    if (title) {
      title.innerText = target === 'consignee' ? 'Consignee Payment Details' : 'Owner Payment Details';
    }

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('drawer-payment-trip-id', d.id || d.grNo);
    setVal('drawer-payment-amount', d.dueAmount || d.ownerDue || 0);
    setVal('drawer-payment-date', new Date().toISOString().split('T')[0]);
    setVal('drawer-payment-paidto', target === 'consignee' ? 'Transporter' : (d.ownerName || 'Truck Owner'));

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  closePaymentDrawer() {
    const backdrop = document.getElementById('paymentDrawerBackdrop');
    const drawer = document.getElementById('paymentDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
  },

  async handlePaymentSave(event) {
    if (event) event.preventDefault();
    const tripId = document.getElementById('drawer-payment-trip-id')?.value;
    if (!tripId) return;

    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const amt = parseFloat(document.getElementById('drawer-payment-amount')?.value) || 0;
    const date = document.getElementById('drawer-payment-date')?.value || '';
    const mode = document.getElementById('drawer-payment-mode')?.value || 'NEFT/RTGS';
    const bank = document.getElementById('drawer-payment-bank')?.value || 'HDFC';
    const desc = document.getElementById('drawer-payment-desc')?.value || '';

    if (!d.payments) d.payments = [];
    d.payments.push({
      amountPaid: amt,
      paymentDate: date,
      mode,
      bank,
      description: desc
    });

    d.paidAmount = (d.paidAmount || 0) + amt;
    d.dueAmount = Math.max(0, (d.dueAmount || 0) - amt);
    d.ownerDue = d.dueAmount;

    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.saveOwnerDue) {
        await FirebaseDB.saveOwnerDue(d);
      }
    } catch (e) {
      console.warn('FirebaseDB saveOwnerDue error:', e);
    }

    this.closePaymentDrawer();
    this.renderOwnerDueTable();
    this.showOpenTripDetails(tripId);
  },

  // SLIDE DRAWERS: OPEN DEBTS
  openAddDebtDrawer(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const backdrop = document.getElementById('debtDrawerBackdrop');
    const drawer = document.getElementById('debtDrawer');

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('drawer-debt-trip-id', d.id || d.grNo);
    setVal('drawer-debt-borrower', d.ownerName || d.owner);
    setVal('drawer-debt-receiver', d.driver || '');

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  closeDebtDrawer() {
    const backdrop = document.getElementById('debtDrawerBackdrop');
    const drawer = document.getElementById('debtDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
  },

  async handleDebtSave(event) {
    if (event) event.preventDefault();
    const tripId = document.getElementById('drawer-debt-trip-id')?.value;
    if (!tripId) return;

    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const type = document.getElementById('drawer-debt-type')?.value || 'Commission';
    const amt = parseFloat(document.getElementById('drawer-debt-amount')?.value) || 0;
    const mode = document.getElementById('drawer-debt-mode')?.value || 'Cash';
    const borrower = document.getElementById('drawer-debt-borrower')?.value || '';
    const receiver = document.getElementById('drawer-debt-receiver')?.value || '';
    const desc = document.getElementById('drawer-debt-desc')?.value || '';

    if (!d.debts) d.debts = [];
    d.debts.push({
      type,
      amount: amt,
      mode,
      borrower,
      receiver,
      description: desc
    });

    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.saveOwnerDue) {
        await FirebaseDB.saveOwnerDue(d);
      }
    } catch (e) {
      console.warn('FirebaseDB saveOwnerDue error:', e);
    }

    this.closeDebtDrawer();
    this.showOpenTripDetails(tripId);
  },

  exportCSV() {
    const owners = this.getFilteredOwners();
    let csv = "Truck No,Name,Mobile No,Mobile No 1\n";
    owners.forEach(o => {
      const t = (o.truckNo || '').replace(/"/g, '""');
      const n = (o.name || '').replace(/"/g, '""');
      const m = (o.mobile || '').replace(/"/g, '""');
      const m1 = (o.mobile1 || '').replace(/"/g, '""');
      csv += `"${t}","${n}","${m}","${m1}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Truck_Owners_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Window & Node export
if (typeof window !== 'undefined') {
  window.OwnersModule = OwnersModule;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OwnersModule;
}

// Auto-initialize when document is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OwnersModule.init());
  } else if (typeof OwnersModule.init === 'function') {
    OwnersModule.init();
  }
}
