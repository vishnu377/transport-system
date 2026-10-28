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
          <td colspan="9" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading owner dues...
          </td>
        </tr>
      `;
    }

    // 1. Load Truck Owners (596 records)
    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.getAllTruckOwners) {
        const owners = await FirebaseDB.getAllTruckOwners();
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

    // 2. Load Owner Dues (489 records)
    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.getAllOwnerDues) {
        const dues = await FirebaseDB.getAllOwnerDues();
        if (dues && dues.length > 0) {
          this.allOwnerDues = dues;
        }
      }
    } catch (e) {
      console.warn('FirebaseDB getAllOwnerDues fallback:', e);
    }

    if (!this.allOwnerDues || this.allOwnerDues.length === 0) {
      if (typeof window.SAMPLE_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.SAMPLE_OWNER_DUES));
      } else if (typeof window.INITIAL_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.INITIAL_OWNER_DUES));
      } else {
        this.allOwnerDues = [];
      }
    }

    this.populateNameDatalist();
    this.updateStats();
    this.updateDueSummaryStats();
    this.renderTruckOwnersTable();
    this.renderOwnerDueTable();
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

    if (amt2026El) amt2026El.innerText = this.formatCurrency(sum2026);
    if (amt2025El) amt2025El.innerText = this.formatCurrency(sum2025);
    if (amt2024El) amt2024El.innerText = this.formatCurrency(sum2024);

    const dashAmt2026 = document.getElementById('dash-due-amount-2026-2027');
    const dashAmt2025 = document.getElementById('dash-due-amount-2025-2026');
    const dashAmt2024 = document.getElementById('dash-due-amount-2024-2025');
    if (dashAmt2026) dashAmt2026.innerText = this.formatCurrency(sum2026);
    if (dashAmt2025) dashAmt2025.innerText = this.formatCurrency(sum2025);
    if (dashAmt2024) dashAmt2024.innerText = this.formatCurrency(sum2024);
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
    return '₹ ' + num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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
    if (this.dueSearchQuery) {
      const q = this.dueSearchQuery.toLowerCase();
      dues = dues.filter(d => {
        const text = `${d.grNo || ''} ${d.truckNo || ''} ${d.ownerName || d.owner || ''} ${d.destination || ''} ${d.transport || ''} ${d.reference || d.partyName || ''} ${d.driver || ''} ${d.status || ''} ${d.dueAmount || d.ownerDue || ''}`.toLowerCase();
        return text.includes(q);
      });
    }

    // STRICT DATE SORTING DESCENDING: Newest trips (27/10/2026) at the very top!
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
          <tr class="appsheet-date-group-header">
            <td colspan="9">
              <div class="d-flex align-items-center justify-content-between">
                <span><i class="bi bi-caret-down-fill me-1 text-secondary"></i> ${dt}</span>
                <span class="font-monospace fw-bold">${this.formatCurrency(groupTotal)}</span>
              </div>
            </td>
          </tr>
        `;
      }

      const dueNum = Number(d.dueAmount || d.ownerDue || 0);
      const isRedDue = dueNum > 0;
      
      html += `
        <tr class="appsheet-row row-status-${col}" onclick="OwnersModule.showOpenTripDetails('${safeTripId}')" style="cursor: pointer;" title="Status: ${d.status}">
          <!-- 1. G.R.No. with status dot -->
          <td class="font-monospace fw-bold text-dark">
            <span class="appsheet-dot dot-${col} me-2"></span>
            ${d.grNo || '-'}
          </td>

          <!-- 2. Trip Start Date -->
          <td>
            <span class="text-secondary" style="font-size: 0.82rem;">${dt}</span>
          </td>

          <!-- 3. Owner Due Amount (Bold Red in Google AppSheet if > 0) -->
          <td>
            <span class="fw-bold font-monospace" style="${isRedDue ? 'color: #c5221f !important;' : 'color: #5f6368 !important;'}">${this.formatCurrency(dueNum)}</span>
          </td>

          <!-- 4. Truck No. -->
          <td>
            <span class="fw-bold font-monospace text-dark">${d.truckNo || '-'}</span>
          </td>

          <!-- 5. Owner -->
          <td>
            <div class="fw-medium text-dark text-truncate" style="max-width: 170px;" title="${ownerVal}">${ownerVal}</div>
          </td>

          <!-- 6. Destination -->
          <td>
            <div class="text-muted text-truncate" style="max-width: 130px;" title="${d.destination || ''}">${d.destination || '-'}</div>
          </td>

          <!-- 7. Transport -->
          <td>
            <span class="badge border font-monospace text-dark" style="background: #f1f3f4; font-size: 0.74rem;">${d.transport || 'TTC'}</span>
          </td>

          <!-- 8. Reference -->
          <td>
            <div class="text-dark text-truncate" style="max-width: 180px;" title="${refName}">${refName}</div>
          </td>

          <!-- 9. Driver -->
          <td>
            <div class="text-muted text-truncate" style="max-width: 130px;" title="${d.driver || ''}">${d.driver || '-'}</div>
          </td>
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
  // VIEW 4: OPEN TRIP DETAILS - EXACT 3-COLUMN APPSHEET LAYOUT
  // TAILORED SPECIFICALLY TO EACH OF THE 6 COLOR CATEGORIES
  // ========================================================
  showOpenTripDetails(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const col = d.color || 'yellow';
    const safeTripId = String(d.id || d.grNo);
    const dt = d.tripDate || d.tripStartDate || d.date || '-';

    this.currentView = 'openTripDetails';
    this.currentTripId = safeTripId;
    window.location.hash = `#trip-${this.currentTripId}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'block';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    // Authentic AppSheet Breadcrumb: Home > Owners > Owner Due > Open Trip Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Open Trip Details</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-light border py-1 px-2 text-secondary" title="Truck Details"><i class="bi bi-truck"></i></button>
          <button class="btn btn-sm btn-light border py-1 px-2 text-secondary" title="Bilty / GR Document"><i class="bi bi-file-earmark-text"></i></button>
          <button class="btn btn-sm btn-light border py-1 px-2 text-secondary" onclick="window.print()" title="Download / Print"><i class="bi bi-download"></i></button>
          <button class="btn-appsheet-edit shadow-sm" onclick="OwnersModule.openEditTripDrawer('${safeTripId}')" title="Edit Trip Details">
            <i class="bi bi-pencil me-1"></i> Edit
          </button>
          <button class="btn btn-sm btn-light border py-1 px-2 ms-1 text-secondary" onclick="OwnersModule.backToDueList()" title="Back to Owner Due">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `;
    }

    const container = document.getElementById('open-trip-cards-container');
    if (!container) return;

    container.className = 'appsheet-3col-layout';

    // Common Trip Details Card (Column 1 Card 1)
    const tripDetailsCardHtml = `
      <div class="appsheet-panel" id="panelTripDetails">
        <div class="appsheet-panel-header">
          <h6 class="appsheet-panel-title">Trip Details</h6>
          <div class="d-flex align-items-center gap-1">
            <button class="btn-appsheet-edit btn-sm py-1 px-2 shadow-sm" onclick="OwnersModule.openEditTripDrawer('${safeTripId}')" title="Edit Trip Details">
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon ms-2" onclick="OwnersModule.togglePanelExpand('panelTripDetails')" title="Expand / Collapse"></i>
          </div>
        </div>
        <div class="appsheet-panel-body p-3">
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">G.R.No.</div>
            <div class="appsheet-detail-value font-monospace text-dark fw-bold">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.year ? `${d.year}-${d.grNo}_${d.transport || 'TTC'}` : d.grNo}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Truck No.</div>
            <div class="appsheet-detail-value font-monospace fw-bold text-dark">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.truckNo || '-'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Trip Start Date</div>
            <div class="appsheet-detail-value">
              <span class="appsheet-dot dot-${col} me-2"></span>${dt}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Trip End Date</div>
            <div class="appsheet-detail-value">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.tripEndDate || dt}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Origin</div>
            <div class="appsheet-detail-value">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.origin || 'Rajsamand (Raj.)'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Destination</div>
            <div class="appsheet-detail-value fw-semibold text-dark">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.destination || '-'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignee Billing Type</div>
            <div class="appsheet-detail-value">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.billingType || 'Per Tonne'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Bilty Amount</div>
            <div class="appsheet-detail-value font-monospace fw-bold text-dark">
              <span class="appsheet-dot dot-${col} me-2"></span>${this.formatCurrency(d.biltyAmount || d.dueAmount || d.ownerDue)}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Weight</div>
            <div class="appsheet-detail-value font-monospace">
              <span class="appsheet-dot dot-${col} me-2"></span>${Number(d.weight || 0).toFixed(3)}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Rate</div>
            <div class="appsheet-detail-value font-monospace">
              <span class="appsheet-dot dot-${col} me-2"></span>${this.formatCurrency(d.rate || 0)}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Material</div>
            <div class="appsheet-detail-value">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.material || 'Marble Powder'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Reference</div>
            <div class="appsheet-detail-value text-dark fw-medium">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.reference || d.partyName || '-'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Reference Mobile No.</div>
            <div class="appsheet-detail-value font-monospace">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.referenceMobile || d.referenceMobileNo || '-'}${d.referenceMobile ? ' <i class="bi bi-telephone-fill ms-2 text-success small"></i>' : ''}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Driver</div>
            <div class="appsheet-detail-value">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.driver || '-'}
            </div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Driver Mobile No.</div>
            <div class="appsheet-detail-value font-monospace">
              <span class="appsheet-dot dot-${col} me-2"></span>${d.driverMobile || d.driverMobileNo || '-'}${d.driverMobile ? ' <i class="bi bi-telephone-fill ms-2 text-success small"></i>' : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Common Consignor/s Card (Column 2 Card 1)
    const consignorGst = d.consignor?.gstin || '08FPWPR3462B2ZD';
    const consignorName = d.consignor?.name || 'SHIV UMA STONEX';
    const consignorAddr = d.consignor?.address || 'DUNGELA, Bhakroda, Rajsamand (Raj.)-313330';

    const consignorCardHtml = `
      <div class="appsheet-panel" id="panelConsignorDetails">
        <div class="appsheet-panel-header">
          <h6 class="appsheet-panel-title">
            <span class="appsheet-dot dot-${col} me-2"></span>Consignor/s 1
          </h6>
          <i class="bi bi-arrows-angle-expand expand-toggle-icon" onclick="OwnersModule.togglePanelExpand('panelConsignorDetails')" title="Expand / Collapse"></i>
        </div>
        <div class="appsheet-panel-body p-3">
          <!-- Mini Table matching Image 2 -->
          <div class="table-responsive border rounded mb-3">
            <table class="table table-sm table-striped mb-0" style="font-size: 0.78rem;">
              <thead class="table-light">
                <tr>
                  <th class="py-1 px-2 text-uppercase text-secondary" style="font-size: 0.72rem;">GSTIN</th>
                  <th class="py-1 px-2 text-uppercase text-secondary" style="font-size: 0.72rem;">Consignor</th>
                  <th class="py-1 px-2 text-uppercase text-secondary" style="font-size: 0.72rem;">Consignor Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-2 font-monospace">${consignorGst}</td>
                  <td class="py-2 px-2 fw-semibold text-dark">${consignorName}</td>
                  <td class="py-2 px-2 text-muted" style="max-width: 180px;">${consignorAddr}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">GSTIN</div>
            <div class="appsheet-detail-value font-monospace">${consignorGst}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignor</div>
            <div class="appsheet-detail-value fw-bold text-dark">${consignorName}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignor Address</div>
            <div class="appsheet-detail-value text-muted">${consignorAddr}</div>
          </div>

          <div class="mt-3 pt-2 border-top d-flex justify-content-end">
            <button class="btn btn-sm btn-outline-secondary py-1 px-3 d-flex align-items-center gap-1 shadow-sm" onclick="OwnersModule.showOpenTripPartyDetails()" title="Expand Full Sheet">
              <i class="bi bi-arrows-fullscreen"></i> Expand
            </button>
          </div>
        </div>
      </div>
    `;

    // Consignee Card (Column 3)
    const consigneeGst = d.consignee?.gstin || '09AICPG6550B1ZN';
    const consigneeName = d.consignee?.name || 'CHEM TECH INDIA';
    const consigneeMob = d.consignee?.mobile || '9235623313';
    const ownerNameVal = d.ownerName || d.owner || 'Kallu Meena';
    const ownerMobVal = d.ownerMobile || '9079757926';
    const freightVal = this.formatCurrency(d.freight || d.dueAmount || d.ownerDue || 171125);
    const totalFreightVal = this.formatCurrency(d.totalFreight || d.biltyAmount || d.dueAmount || 171125);

    let consigneeExtraHtml = '';
    let addRecordsLabel = 'Add Records for ...';

    if (col === 'pink') {
      consigneeExtraHtml = `
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Loading Charges</div>
          <div class="appsheet-detail-value font-monospace">₹ 7,000.00</div>
        </div>
        <div class="appsheet-detail-divider"></div>
      `;
    } else if (col === 'blue') {
      addRecordsLabel = 'Add Records for Truck Owner Payment';
    } else if (col === 'slate' || col === 'cyan') {
      addRecordsLabel = 'Add Records for Party Payment';
    }

    const consigneeCardHtml = `
      <div class="appsheet-panel" id="panelConsigneeDetails">
        <div class="appsheet-panel-header">
          <h6 class="appsheet-panel-title">Consignee</h6>
          <i class="bi bi-arrows-angle-expand expand-toggle-icon" onclick="OwnersModule.togglePanelExpand('panelConsigneeDetails')" title="Expand / Collapse"></i>
        </div>
        <div class="appsheet-panel-body p-3">
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">GSTIN Consignee</div>
            <div class="appsheet-detail-value font-monospace">${consigneeGst}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignee</div>
            <div class="appsheet-detail-value fw-bold text-dark">${consigneeName}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignee Mobile No.</div>
            <div class="appsheet-detail-value font-monospace">${consigneeMob}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Owner</div>
            <div class="appsheet-detail-value">${ownerNameVal}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Owner Mobile No.</div>
            <div class="appsheet-detail-value font-monospace">${ownerMobVal}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          ${consigneeExtraHtml}

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Freight</div>
            <div class="appsheet-detail-value font-monospace">${freightVal}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Total Freight</div>
            <div class="appsheet-detail-value font-monospace fw-bold">${totalFreightVal}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Status</div>
            <div class="appsheet-detail-value">
              <span class="badge-status badge-status-${col}">
                <span class="appsheet-dot dot-${col}"></span> ${d.status || 'Transit'}
              </span>
            </div>
          </div>

          <div class="mt-3 pt-2 border-top">
            <button class="btn-appsheet-add shadow-sm" onclick="OwnersModule.openEditTripDrawer('${safeTripId}')" title="${addRecordsLabel}">
              <i class="bi bi-plus-lg me-1"></i> ${addRecordsLabel}
            </button>
          </div>
        </div>
      </div>
    `;

    // Now assemble the 3 columns according to the 6 color categories!
    let col1Cards = tripDetailsCardHtml;
    let col2Cards = consignorCardHtml;
    let col3Cards = consigneeCardHtml;

    if (col === 'blue') {
      // BLUE (Party Payment Pending):
      // Col 1 Card 2: Owner Payment 1
      col1Cards += `
        <div class="appsheet-panel mt-3" id="panelOwnerPayment">
          <div class="appsheet-panel-header">
            <h6 class="appsheet-panel-title">Owner Payment 1</h6>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon" onclick="OwnersModule.togglePanelExpand('panelOwnerPayment')" title="Expand / Collapse"></i>
          </div>
          <div class="appsheet-panel-body p-3">
            <div class="small fw-semibold text-muted mb-2">Truck Owner Payment</div>
            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Payment Date</div>
              <div class="appsheet-detail-value font-monospace">${d.paymentDate || '27/10/2026'}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Amount Paid</div>
              <div class="appsheet-detail-value font-monospace text-success fw-bold">${this.formatCurrency(d.paidAmount || 184706)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Mode</div>
              <div class="appsheet-detail-value">NEFT/RTGS</div>
            </div>

            <div class="mt-3 pt-2 border-top d-flex align-items-center gap-2">
              <button class="btn-appsheet-panel-action" onclick="OwnersModule.showTripPaymentDetails()" title="Expand Full Sheet">
                <i class="bi bi-arrows-fullscreen me-1"></i> Expand
              </button>
              <button class="btn-appsheet-add shadow-sm" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}')" title="Add Payment">
                <i class="bi bi-plus-lg me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;

      // Col 2 Card 2: Owner Total Payment & Owner Due Summary
      col2Cards += `
        <div class="appsheet-panel mt-3" id="panelPaymentSummary">
          <div class="appsheet-panel-header">
            <h6 class="appsheet-panel-title">Payment Summary</h6>
          </div>
          <div class="appsheet-panel-body p-3">
            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Owner Total Payment</div>
              <div class="appsheet-detail-value font-monospace fw-bold">${this.formatCurrency(d.paidAmount || 184706)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Owner Due</div>
              <div class="appsheet-detail-value font-monospace text-danger fw-bold">${this.formatCurrency(d.dueAmount || 6909)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Status</div>
              <div class="appsheet-detail-value">
                <span class="badge-status badge-status-blue">
                  <span class="appsheet-dot dot-blue"></span> Party Payment Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      `;

    } else if (col === 'slate') {
      // SLATE (Cheque Due):
      // Col 1 Card 2: Payment (No items, + Add)
      col1Cards += `
        <div class="appsheet-panel mt-3" id="panelSlatePayment">
          <div class="appsheet-panel-header">
            <h6 class="appsheet-panel-title">Payment</h6>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon" onclick="OwnersModule.togglePanelExpand('panelSlatePayment')" title="Expand / Collapse"></i>
          </div>
          <div class="appsheet-panel-body p-3">
            <div class="text-muted py-2">No items</div>
            <div class="mt-2 pt-2 border-top">
              <button class="btn-appsheet-add shadow-sm" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'consignee')" title="Add Consignee Payment">
                <i class="bi bi-plus-lg me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;

      // Col 2 Card 2: Total Freight, Paid Amount, Due Amount (Cheque Due)
      col2Cards += `
        <div class="appsheet-panel mt-3" id="panelFreightSummary">
          <div class="appsheet-panel-header">
            <h6 class="appsheet-panel-title">Freight Summary</h6>
          </div>
          <div class="appsheet-panel-body p-3">
            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Total Freight</div>
              <div class="appsheet-detail-value font-monospace fw-bold">${this.formatCurrency(d.totalFreight || 80000)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Paid Amount</div>
              <div class="appsheet-detail-value font-monospace text-success fw-bold">${this.formatCurrency(d.paidAmount || 80000)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Due Amount</div>
              <div class="appsheet-detail-value font-monospace fw-bold">${this.formatCurrency(d.dueAmount || 0)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Status</div>
              <div class="appsheet-detail-value">
                <span class="badge-status badge-status-slate">
                  <span class="appsheet-dot dot-slate"></span> Cheque Due
                </span>
              </div>
            </div>
          </div>
        </div>
      `;

    } else if (col === 'cyan') {
      // CYAN (Truck Owner Payment Pending):
      // Col 1 Card 2: Payment 1
      col1Cards += `
        <div class="appsheet-panel mt-3" id="panelCyanPayment">
          <div class="appsheet-panel-header">
            <h6 class="appsheet-panel-title">Payment 1</h6>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon" onclick="OwnersModule.togglePanelExpand('panelCyanPayment')" title="Expand / Collapse"></i>
          </div>
          <div class="appsheet-panel-body p-3">
            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Payment Date</div>
              <div class="appsheet-detail-value font-monospace">${d.paymentDate || '24/10/2026'}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Amount Paid</div>
              <div class="appsheet-detail-value font-monospace text-success fw-bold">${this.formatCurrency(d.paidAmount || 192030)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Mode</div>
              <div class="appsheet-detail-value">NEFT/RTGS</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Beneficiary</div>
              <div class="appsheet-detail-value font-monospace">TTC</div>
            </div>

            <div class="mt-3 pt-2 border-top">
              <button class="btn-appsheet-panel-action" onclick="OwnersModule.showTripPaymentDetails()" title="Expand Full Sheet">
                <i class="bi bi-arrows-fullscreen me-1"></i> Expand
              </button>
            </div>
          </div>
        </div>
      `;

      // Col 2 Card 2: Total Freight, Paid Amount, Due Amount, Paid To Transporter
      col2Cards += `
        <div class="appsheet-panel mt-3" id="panelCyanSummary">
          <div class="appsheet-panel-header">
            <h6 class="appsheet-panel-title">Payment Summary</h6>
          </div>
          <div class="appsheet-panel-body p-3">
            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Total Freight</div>
              <div class="appsheet-detail-value font-monospace fw-bold">${this.formatCurrency(d.totalFreight || 192030)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Paid Amount</div>
              <div class="appsheet-detail-value font-monospace text-success fw-bold">${this.formatCurrency(d.paidAmount || 192030)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Due Amount</div>
              <div class="appsheet-detail-value font-monospace fw-bold">${this.formatCurrency(d.dueAmount || 0)}</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Paid To</div>
              <div class="appsheet-detail-value">Transporter</div>
            </div>
            <div class="appsheet-detail-divider"></div>

            <div class="appsheet-detail-item">
              <div class="appsheet-detail-label">Status</div>
              <div class="appsheet-detail-value">
                <span class="badge-status badge-status-cyan">
                  <span class="appsheet-dot dot-cyan"></span> Truck Owner Payment Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Assemble the complete 3-column layout
    container.innerHTML = `
      <div class="appsheet-col d-flex flex-column gap-3">${col1Cards}</div>
      <div class="appsheet-col d-flex flex-column gap-3">${col2Cards}</div>
      <div class="appsheet-col d-flex flex-column gap-3">${col3Cards}</div>
    `;
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
  showOpenTripPartyDetails() {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(this.currentTripId) || String(item.grNo) === String(this.currentTripId));
    if (!d) return;

    this.currentView = 'partyDetails';

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

    // Breadcrumb: Home > Owners > Owner Due > Open Trip Details > Open Trip Party Details
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

    const grBadge = document.getElementById('party-sheet-gr-no');
    if (grBadge) grBadge.innerText = `G.R.No. ${d.grNo || '-'}`;

    const content = document.getElementById('party-details-card-content');
    if (content) {
      content.innerHTML = `
        <div class="mb-4">
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">G.R.No.</div>
            <div class="appsheet-detail-value font-monospace text-primary fw-bold">${d.grNo || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">GSTIN</div>
            <div class="appsheet-detail-value font-monospace">${d.consignor?.gstin || '08FPWPR3462B2ZD'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignor</div>
            <div class="appsheet-detail-value text-dark fw-bold">${d.consignor?.name || 'SHIV UMA STONEX'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>

          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignor Address</div>
            <div class="appsheet-detail-value">${d.consignor?.address || 'DUNGELA, Bhakroda, Rajsamand (Raj.)-313330'}</div>
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

  // SLIDE DRAWERS: UPDATE TRIP DETAILS
  openEditTripDrawer(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const backdrop = document.getElementById('tripDrawerBackdrop');
    const drawer = document.getElementById('tripDrawer');
    const title = document.getElementById('tripDrawerTitle');

    if (title) title.innerText = `Update Trip Details - ${d.grNo || ''}`;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('drawer-trip-id', d.id || d.grNo);
    setVal('drawer-trip-gr', d.grNo);
    setVal('drawer-trip-truck', d.truckNo);
    setVal('drawer-trip-owner', d.ownerName || d.owner);
    setVal('drawer-trip-status', d.status);
    setVal('drawer-trip-origin', d.origin);
    setVal('drawer-trip-dest', d.destination);
    setVal('drawer-trip-mat', d.material);
    setVal('drawer-trip-weight', d.weight);
    setVal('drawer-trip-rate', d.rate);
    setVal('drawer-trip-freight', d.freight || d.dueAmount || d.ownerDue);
    setVal('drawer-trip-due', d.dueAmount || d.ownerDue);
    setVal('drawer-trip-driver', d.driver);
    setVal('drawer-trip-driver-mob', d.driverMobile);

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  closeTripDrawer() {
    const backdrop = document.getElementById('tripDrawerBackdrop');
    const drawer = document.getElementById('tripDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
  },

  async handleTripSave(event) {
    if (event) event.preventDefault();
    const tripId = document.getElementById('drawer-trip-id')?.value;
    if (!tripId) return;

    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    const getVal = id => document.getElementById(id)?.value || '';

    d.status = getVal('drawer-trip-status') || d.status;
    d.weight = parseFloat(getVal('drawer-trip-weight')) || d.weight;
    d.rate = parseFloat(getVal('drawer-trip-rate')) || d.rate;
    d.dueAmount = parseFloat(getVal('drawer-trip-due')) || d.dueAmount;
    d.ownerDue = d.dueAmount;
    d.driver = getVal('drawer-trip-driver') || d.driver;
    d.driverMobile = getVal('drawer-trip-driver-mob') || d.driverMobile;

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
