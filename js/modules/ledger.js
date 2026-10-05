/**
 * Financial Ledger & Statements Module (Google AppSheet Authentic Design)
 * 100% Authentic Replica of Google AppSheet Ledger UI & UX
 * Supports:
 * - Level 1: Year View (Open, Year group, All >, Financial Year rows with gold dots and pill badges)
 * - Level 2: Month View (Selected FY dropdown bar, Month group, All >, 12 Month rows)
 * - Level 3: Table View (Selected Month dropdown bar, 11 columns with date ribbons and circular dots)
 * - Level 4: 3-Card Debt Details (Particulars with gold dots, Returned Amount 0 with 'No items', Financials with red dot)
 * - Full TMS Navigation Drawer accessible via Hamburger ☰
 * - View toggle via ⊞ icon
 * - Excel Bulk Import / Export & WhatsApp Payment Reminders
 * - Customer & Truck Owner Statements
 */

const LedgerModule = {
  allDebts: [],
  allParties: [],
  allOwners: [],
  allTrips: [],
  allPayments: [],

  // View Hierarchy State: 'year' | 'month' | 'table' | 'details'
  viewLevel: 'year',
  selectedFY: 'ALL',
  selectedMonth: 'ALL',
  currentTab: 'open', // 'open' | 'all' | 'settled' | 'statements'

  // Search & Filter State
  searchQuery: '',
  filterCompany: 'ALL',
  filterDebtType: 'ALL',
  filterDebtMode: 'ALL',
  pageSize: 100,
  currentPage: 1,
  filteredList: [],

  // Active Detail State
  currentDebtId: null,

  // Statement State
  currentEntity: null,
  currentCategory: 'party',

  async init() {
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('ledger');
    }
    await this.loadData();
    this.applyFilters();
    this.renderRegisterTable();
    this.renderFYSidebar();
    this.renderMonthBar();
    this.renderCurrentView();
  },

  async loadData() {
    this.allDebts = await dbService.getAll('debts');
    this.allParties = await dbService.getAll('parties');
    this.allOwners = await dbService.getAll('truckOwners');
    this.allTrips = await dbService.getAll('trips');
    this.allPayments = await dbService.getAll('payments');
  },

  // ----------------------------------------------------
  // DRILLDOWN ROUTING & NAVIGATION
  // ----------------------------------------------------
  goToYearView() {
    this.viewLevel = 'year';
    this.selectedFY = 'ALL';
    this.selectedMonth = 'ALL';
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) sInput.value = '';
    this.applyFilters();
    this.renderCurrentView();
  },

  goToMonthView(fy) {
    this.viewLevel = 'month';
    this.selectedFY = fy;
    this.selectedMonth = 'ALL';
    this.applyFilters();
    this.renderCurrentView();
  },

  goToTableView(monthKey) {
    this.viewLevel = 'table';
    this.selectedMonth = monthKey;
    this.currentPage = 1;
    this.applyFilters();
    this.renderCurrentView();
  },

  onDropdownBarClick() {
    if (this.viewLevel === 'table') {
      if (this.selectedFY && this.selectedFY !== 'ALL') {
        this.goToMonthView(this.selectedFY);
      } else {
        this.goToYearView();
      }
    } else if (this.viewLevel === 'month') {
      this.goToYearView();
    }
  },

  toggleViewMode() {
    // ⊞ icon clicked: toggles between drilldown (Year/Month) and direct Table view
    if (this.viewLevel === 'table') {
      if (this.selectedMonth && this.selectedMonth !== 'ALL' && this.selectedFY && this.selectedFY !== 'ALL') {
        this.goToMonthView(this.selectedFY);
      } else {
        this.goToYearView();
      }
    } else {
      this.viewLevel = 'table';
      this.currentPage = 1;
      this.renderCurrentView();
    }
  },

  toggleNavDrawer() {
    if (typeof AppUI !== 'undefined' && AppUI.toggleNavDrawer) {
      AppUI.toggleNavDrawer();
    } else {
      const drawerEl = document.getElementById('appsheetNavDrawer') || document.getElementById('tmsNavDrawer');
      if (drawerEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
        bootstrap.Offcanvas.getOrCreateInstance(drawerEl).toggle();
      }
    }
  },

  toggleFilterDropdown() {
    const popover = document.getElementById('filter-popover-box');
    if (popover) {
      popover.classList.toggle('d-none');
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  },

  // ----------------------------------------------------
  // MAIN VIEW RENDERER (AppSheet Single Card & Details)
  // ----------------------------------------------------
  renderCurrentView() {
    const regView = document.getElementById('ledger-view-register');
    const detView = document.getElementById('ledger-view-details');
    const stmtView = document.getElementById('ledger-view-statements');
    const cardTitle = document.getElementById('card-title-text');
    const dropdownBar = document.getElementById('appsheet-dropdown-bar');
    const dropdownText = document.getElementById('appsheet-dropdown-text');
    const drillContainer = document.getElementById('appsheet-drill-container');
    const drillLabel = document.getElementById('appsheet-drilldown-label');
    const drillList = document.getElementById('appsheet-drilldown-list');
    const tableContainer = document.getElementById('appsheet-table-container');
    const crumbTail = document.getElementById('appsheet-crumb-tail');

    // 1. STATEMENTS TAB
    if (this.currentTab === 'statements') {
      regView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.remove('d-none');
      if (crumbTail) crumbTail.innerHTML = `<span class="sep">&gt;</span> <span class="active">Statements</span>`;
      this.onCategoryChange();
      return;
    }

    stmtView?.classList.add('d-none');

    // 2. 3-CARD DETAILS VIEW
    if (this.viewLevel === 'details') {
      regView?.classList.add('d-none');
      detView?.classList.remove('d-none');
      if (crumbTail) crumbTail.innerHTML = `<span class="sep">&gt;</span> <span class="active">Open Debt Details</span>`;
      if (this.currentDebtId) {
        this.populateDebtDetailsCard(this.currentDebtId);
      }
      return;
    }

    // 3. REGISTER VIEWS (Level 1 Year, Level 2 Month, Level 3 Table)
    detView?.classList.add('d-none');
    regView?.classList.remove('d-none');

    // Update Card Header Title
    if (cardTitle) {
      cardTitle.innerText = this.currentTab === 'open' ? 'Open' : this.currentTab === 'all' ? 'All' : 'Settled';
    }

    // --- LEVEL 1: YEAR VIEW (Matching WhatsApp Image 2026-09-23 at 4.10.05 PM.jpeg) ---
    if (this.viewLevel === 'year') {
      if (crumbTail) crumbTail.innerHTML = '';
      drillContainer?.classList.remove('d-none');
      tableContainer?.classList.add('d-none');
      dropdownBar?.classList.add('d-none');

      if (drillLabel) drillLabel.innerText = 'Year';

      const fyYears = [
        '2026-2027',
        '2025-2026',
        '2024-2025',
        '2023-2024',
        '2022-2023',
        '2020-2021',
        '2019-2020'
      ];

      // Calculate totals per FY based on current tab and filters
      const fyTotals = {};
      fyYears.forEach(fy => { fyTotals[fy] = 0; });

      this.allDebts.forEach(d => {
        const due = Number(d.dueAmount) || 0;
        if (this.currentTab === 'open' && due === 0) return;
        if (this.currentTab === 'settled' && due !== 0) return;
        if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return;
        if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return;
        if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return;

        if (fyTotals.hasOwnProperty(d.fy)) {
          fyTotals[d.fy] += due;
        }
      });

      let html = `
        <div class="appsheet-drill-row" onclick="LedgerModule.goToTableView('ALL')">
          <span class="appsheet-drill-label-all">All</span>
          <span class="appsheet-chevron">&gt;</span>
        </div>
      `;

      fyYears.forEach(fy => {
        const amt = fyTotals[fy] || 0;
        html += `
          <div class="appsheet-drill-row" onclick="LedgerModule.goToMonthView('${fy}')">
            <div class="appsheet-drill-left">
              <span class="appsheet-bullet gold-bullet">●</span>
              <span class="appsheet-drill-label-gold">${fy}</span>
              <span class="appsheet-drill-badge">₹ ${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <span class="appsheet-chevron">&gt;</span>
          </div>
        `;
      });

      if (drillList) drillList.innerHTML = html;
      return;
    }

    // --- LEVEL 2: MONTH VIEW (Matching WhatsApp Image 2026-09-23 at 4.10.33 PM (25).jpeg) ---
    if (this.viewLevel === 'month') {
      if (crumbTail) {
        crumbTail.innerHTML = `<span class="sep">&gt;</span> <span class="active">${this.selectedFY}</span>`;
      }
      drillContainer?.classList.remove('d-none');
      tableContainer?.classList.add('d-none');
      dropdownBar?.classList.remove('d-none');
      if (dropdownText) dropdownText.innerText = this.selectedFY;

      if (drillLabel) drillLabel.innerText = 'Month';

      const allMonths = [
        '12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct',
        '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'
      ];

      const monthTotals = {};
      allMonths.forEach(m => { monthTotals[m] = 0; });

      this.allDebts.forEach(d => {
        if (d.fy !== this.selectedFY) return;
        const due = Number(d.dueAmount) || 0;
        if (this.currentTab === 'open' && due === 0) return;
        if (this.currentTab === 'settled' && due !== 0) return;
        if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return;
        if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return;
        if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return;

        if (monthTotals.hasOwnProperty(d.monthKey)) {
          monthTotals[d.monthKey] += due;
        }
      });

      let html = `
        <div class="appsheet-drill-row" onclick="LedgerModule.goToTableView('ALL')">
          <span class="appsheet-drill-label-all">All</span>
          <span class="appsheet-chevron">&gt;</span>
        </div>
      `;

      allMonths.forEach(m => {
        const amt = monthTotals[m] || 0;
        html += `
          <div class="appsheet-drill-row" onclick="LedgerModule.goToTableView('${m}')">
            <div class="appsheet-drill-left">
              <span class="appsheet-bullet gold-bullet">●</span>
              <span class="appsheet-drill-label-gold">${m}</span>
              <span class="appsheet-drill-badge">₹ ${amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <span class="appsheet-chevron">&gt;</span>
          </div>
        `;
      });

      if (drillList) drillList.innerHTML = html;
      return;
    }

    // --- LEVEL 3: 11-COLUMN TABLE VIEW (Matching WhatsApp Image 2026-09-23 at 4.10.30 PM.jpeg) ---
    if (this.viewLevel === 'table') {
      drillContainer?.classList.add('d-none');
      tableContainer?.classList.remove('d-none');
      dropdownBar?.classList.remove('d-none');

      let barText = 'All Entries';
      if (this.selectedMonth && this.selectedMonth !== 'ALL') {
        barText = this.selectedMonth;
        if (crumbTail) {
          crumbTail.innerHTML = `<span class="sep">&gt;</span> <a href="javascript:void(0)" onclick="LedgerModule.goToMonthView('${this.selectedFY}')">${this.selectedFY}</a> <span class="sep">&gt;</span> <span class="active">${this.selectedMonth}</span>`;
        }
      } else if (this.selectedFY && this.selectedFY !== 'ALL') {
        barText = this.selectedFY;
        if (crumbTail) {
          crumbTail.innerHTML = `<span class="sep">&gt;</span> <span class="active">${this.selectedFY}</span>`;
        }
      } else {
        if (crumbTail) crumbTail.innerHTML = `<span class="sep">&gt;</span> <span class="active">All</span>`;
      }

      if (dropdownText) dropdownText.innerText = barText;

      this.renderRegisterTable();
      this.renderPagination();
    }
  },

  // ----------------------------------------------------
  // FILTER ENGINE & RECORD SLICING
  // ----------------------------------------------------
  applyFilters() {
    const compEl = document.getElementById('filter-company');
    const typeEl = document.getElementById('filter-debt-type');
    const modeEl = document.getElementById('filter-debt-mode');

    if (compEl) this.filterCompany = compEl.value;
    if (typeEl) this.filterDebtType = typeEl.value;
    if (modeEl) this.filterDebtMode = modeEl.value;

    const query = (this.searchQuery || '').toLowerCase().trim();

    this.filteredList = this.allDebts.filter(d => {
      const due = Number(d.dueAmount) || 0;

      // Tab filter
      if (this.currentTab === 'open' && due === 0) return false;
      if (this.currentTab === 'settled' && due !== 0) return false;

      // Financial Year (if in month or table view)
      if (this.viewLevel !== 'year' && this.selectedFY !== 'ALL' && d.fy !== this.selectedFY) return false;

      // Month Key (if in table view and specific month chosen)
      if (this.viewLevel === 'table' && this.selectedMonth !== 'ALL' && d.monthKey !== this.selectedMonth) return false;

      // Company
      if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return false;

      // Debt Type
      if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return false;

      // Debt Mode
      if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return false;

      // Search query across all fields
      if (query) {
        const searchTarget = [
          d.grNo || '',
          d.truckNo || '',
          d.to || '',
          d.from || '',
          d.truckOwner || '',
          d.borrowerName || '',
          d.receiverName || '',
          d.description || '',
          d.debtType || '',
          d.company || '',
          d.date || '',
          d.displayDate || '',
          d.fy || '',
          d.monthKey || ''
        ].join(' ').toLowerCase();

        if (!searchTarget.includes(query)) return false;
      }

      return true;
    });

    // Sort: Date descending, ID descending
    this.filteredList.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.id || '').localeCompare(String(a.id || ''));
    });

    // Update KPI summary cards & badges
    let totalDue = 0;
    let totalDebt = 0;
    let totalReturned = 0;

    this.filteredList.forEach(d => {
      totalDue += Number(d.dueAmount) || 0;
      totalDebt += Number(d.debtAmount) || 0;
      totalReturned += Number(d.totalReturned) || 0;
    });

    const sumDueEl = document.getElementById('summary-total-due');
    if (sumDueEl) sumDueEl.innerText = AppUI.formatCurrency(totalDue);

    const sumDebtEl = document.getElementById('summary-total-debt');
    if (sumDebtEl) sumDebtEl.innerText = AppUI.formatCurrency(totalDebt);

    const sumRetEl = document.getElementById('summary-total-returned');
    if (sumRetEl) sumRetEl.innerText = AppUI.formatCurrency(totalReturned);

    const countEl = document.getElementById('summary-count');
    if (countEl) countEl.innerText = this.filteredList.length;

    const badgeOpen = document.getElementById('badge-open-count');
    if (badgeOpen) {
      const openCount = this.allDebts.filter(d => (Number(d.dueAmount) || 0) !== 0).length;
      badgeOpen.innerText = openCount;
    }
  },

  onSearchInput(val) {
    this.searchQuery = (val || '').toLowerCase().trim();
    if (this.searchQuery) {
      this.viewLevel = 'table';
      this.selectedFY = 'ALL';
      this.selectedMonth = 'ALL';
      this.currentPage = 1;
    }
    this.applyFilters();
    this.renderCurrentView();
  },

  clearSearch() {
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) sInput.value = '';
    this.searchQuery = '';
    this.applyFilters();
    this.renderCurrentView();
  },

  resetFilters() {
    this.selectedFY = 'ALL';
    this.selectedMonth = 'ALL';
    this.searchQuery = '';
    this.filterCompany = 'ALL';
    this.filterDebtType = 'ALL';
    this.filterDebtMode = 'ALL';
    this.currentPage = 1;

    const sInput = document.getElementById('ledger-search-input');
    if (sInput) sInput.value = '';
    const fComp = document.getElementById('filter-company');
    if (fComp) fComp.value = 'ALL';
    const fType = document.getElementById('filter-debt-type');
    if (fType) fType.value = 'ALL';
    const fMode = document.getElementById('filter-debt-mode');
    if (fMode) fMode.value = 'ALL';

    this.applyFilters();
    this.renderCurrentView();
  },

  // ----------------------------------------------------
  // LEVEL 3: 11-COLUMN TABLE RENDERER
  // Matching WhatsApp Image 2026-09-23 at 4.10.30 PM.jpeg
  // ----------------------------------------------------
  renderRegisterTable() {
    const tbody = document.getElementById('debts-table-body');
    if (!tbody) return;

    if (this.filteredList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            <div class="fw-semibold">No matching debt records found</div>
            <small class="text-muted">Try adjusting your search keywords, year, or filter criteria.</small>
          </td>
        </tr>
      `;
      return;
    }

    // Pagination slice
    let displayItems = this.filteredList;
    if (this.pageSize !== 'ALL') {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      displayItems = this.filteredList.slice(start, end);
    }

    // Group items by displayDate or date
    const dateGroups = new Map();
    displayItems.forEach(item => {
      const key = item.displayDate || item.date || 'Undated';
      if (!dateGroups.has(key)) {
        dateGroups.set(key, []);
      }
      dateGroups.get(key).push(item);
    });

    let html = '';

    dateGroups.forEach((items, dateKey) => {
      const groupDue = items.reduce((sum, i) => sum + (Number(i.dueAmount) || 0), 0);

      // Date Group Divider Ribbon (● 23/09/2026  ₹ 2,000.00)
      html += `
        <tr class="appsheet-date-divider">
          <td colspan="12">
            <span class="appsheet-bullet gold-bullet">●</span>
            <span class="fw-bold ms-1">${dateKey}</span>
            <span class="appsheet-drill-badge ms-2">₹ ${groupDue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </td>
        </tr>
      `;

      // Data Rows
      items.forEach(d => {
        const due = Number(d.dueAmount) || 0;
        const debt = Number(d.debtAmount) || 0;
        const isBlue = d.dotColor === 'blue';
        const isGreen = d.dotColor === 'green';
        const bulletClass = isBlue ? 'blue-bullet' : isGreen ? 'text-success' : 'gold-bullet';
        const cellTextClass = isBlue ? 'cell-blue' : isGreen ? 'text-success' : 'cell-gold';

        html += `
          <tr class="appsheet-row" onclick="LedgerModule.openDebtDetails('${d.id}')">
            <!-- 1. G.R.No. -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.grNo || '-'}
            </td>

            <!-- 2. Truck No. -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.truckNo || '-'}
            </td>

            <!-- 3. To -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.to || '-'}
            </td>

            <!-- 4. Debt Type -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.debtType || '-'}
            </td>

            <!-- 5. Due Amount (Authentic Red Dot & Red Bold Text) -->
            <td class="cell-red">
              <span class="appsheet-bullet red-bullet">●</span> ₹ ${due.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>

            <!-- 6. Debt Amount -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ₹ ${debt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>

            <!-- 7. Debt Mode -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.debtMode || 'Cash'}
            </td>

            <!-- 8. Borrower Name -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.borrowerName || '-'}
            </td>

            <!-- 9. Receiver Name -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.receiverName || '-'}
            </td>

            <!-- 10. Description -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.description || ''}
            </td>

            <!-- 11. Date -->
            <td class="${cellTextClass}">
              <span class="appsheet-bullet ${bulletClass}">●</span> ${d.displayDate || d.date || '-'}
            </td>

            <!-- 12. Chevron > -->
            <td class="text-center text-muted" style="width: 25px;">
              <span class="appsheet-chevron">&gt;</span>
            </td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  renderPagination() {
    const info = document.getElementById('pagination-info');
    const btnContainer = document.getElementById('pagination-buttons');
    if (!info || !btnContainer) return;

    const total = this.filteredList.length;
    if (this.pageSize === 'ALL' || total === 0) {
      info.innerText = `Showing all ${total} entries`;
      btnContainer.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(total / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, total);

    info.innerText = `Showing ${start}-${end} of ${total} entries (Page ${this.currentPage} of ${totalPages})`;

    let html = `
      <button class="btn btn-outline-secondary" ${this.currentPage === 1 ? 'disabled' : ''} onclick="LedgerModule.changePage(${this.currentPage - 1})">
        &lt;
      </button>
    `;

    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let p = startPage; p <= endPage; p++) {
      html += `
        <button class="btn ${p === this.currentPage ? 'btn-primary' : 'btn-outline-secondary'}" onclick="LedgerModule.changePage(${p})">
          ${p}
        </button>
      `;
    }

    html += `
      <button class="btn btn-outline-secondary" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="LedgerModule.changePage(${this.currentPage + 1})">
        &gt;
      </button>
    `;

    btnContainer.innerHTML = html;
  },

  changePage(p) {
    this.currentPage = p;
    this.renderRegisterTable();
    this.renderPagination();
  },

  changePageSize(val) {
    this.pageSize = val === 'ALL' ? 'ALL' : parseInt(val, 10);
    this.currentPage = 1;
    this.renderRegisterTable();
    this.renderPagination();
  },

  // ----------------------------------------------------
  // LEVEL 4: 3-CARD OPEN DEBT DETAILS VIEW
  // Matching WhatsApp Image 2026-09-23 at 4.10.05 PM (1).jpeg
  // ----------------------------------------------------
  openDebtDetails(debtId) {
    const debt = this.allDebts.find(d => String(d.id) === String(debtId));
    if (!debt) {
      AppUI.showToast("Debt entry not found", "error");
      return;
    }

    this.currentDebtId = debtId;
    this.viewLevel = 'details';
    this.renderCurrentView();
  },

  populateDebtDetailsCard(debtId) {
    const debt = this.allDebts.find(d => String(d.id) === String(debtId));
    if (!debt) return;

    // Index Counter & Step Buttons
    const idx = this.filteredList.findIndex(d => String(d.id) === String(debtId));
    const navCounter = document.getElementById('detail-nav-counter');
    if (navCounter) {
      if (idx >= 0) {
        navCounter.innerText = `Record ${idx + 1} of ${this.filteredList.length}`;
      } else {
        navCounter.innerText = `Record 1 of 1`;
      }
    }

    const prevBtn = document.getElementById('btn-prev-debt');
    const nextBtn = document.getElementById('btn-next-debt');
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx < 0 || idx >= this.filteredList.length - 1;

    // CARD 1: PARTICULARS
    document.getElementById('detail-company-badge').innerText = debt.company || 'TTC';
    document.getElementById('detail-debt-type').innerText = debt.debtType || '-';
    document.getElementById('detail-date').innerText = debt.displayDate || debt.date || '-';
    document.getElementById('detail-truck-owner').innerText = debt.truckOwner || '-';
    document.getElementById('detail-gr-no').innerText = debt.grNo || '-';
    document.getElementById('detail-company-name').innerText = debt.company || 'TTC';
    document.getElementById('detail-from').innerText = debt.from || '-';
    document.getElementById('detail-to').innerText = debt.to || '-';
    document.getElementById('detail-borrower').innerText = debt.borrowerName || '-';
    document.getElementById('detail-receiver').innerText = debt.receiverName || '-';
    document.getElementById('detail-desc').innerText = debt.description || '-';

    // CARD 2: RETURNED AMOUNT 0
    const returns = Array.isArray(debt.returnedAmounts) ? debt.returnedAmounts : [];
    const badgeRet = document.getElementById('detail-return-badge');
    if (badgeRet) badgeRet.innerText = returns.length;

    const returnsContainer = document.getElementById('detail-returns-container');
    if (returnsContainer) {
      if (returns.length === 0) {
        returnsContainer.innerHTML = `<span class="text-muted" style="font-size: 13.5px;">No items</span>`;
      } else {
        let retHtml = `
          <div class="table-responsive w-100">
            <table class="table table-sm table-bordered align-middle mb-0" style="font-size: 12.5px;">
              <thead class="table-light">
                <tr>
                  <th>Date</th>
                  <th class="text-end">Amount</th>
                  <th>Mode</th>
                  <th>By</th>
                </tr>
              </thead>
              <tbody>
        `;
        returns.forEach(r => {
          retHtml += `
            <tr>
              <td>${r.displayDate || r.date}</td>
              <td class="text-end fw-bold text-success">${AppUI.formatCurrency(r.amount)}</td>
              <td>${r.mode || 'Cash'}</td>
              <td>${r.receivedBy || '-'}</td>
            </tr>
          `;
        });
        retHtml += `</tbody></table></div>`;
        returnsContainer.innerHTML = retHtml;
      }
    }

    // CARD 3: FINANCIALS
    const debtAmt = Number(debt.debtAmount) || 0;
    const dueAmt = Number(debt.dueAmount) || 0;

    document.getElementById('detail-debt-mode').innerText = debt.debtMode || 'Cash';
    document.getElementById('detail-debt-amount').innerText = `₹ ${debtAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('detail-due-amount').innerText = `₹ ${dueAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const statusPill = document.getElementById('detail-status-pill');
    if (statusPill) {
      if (dueAmt <= 0) {
        statusPill.innerText = "SETTLED";
        statusPill.className = "badge bg-success-subtle text-success";
      } else {
        statusPill.innerText = "OPEN";
        statusPill.className = "badge bg-danger-subtle text-danger";
      }
    }
  },

  stepDebt(delta) {
    if (!this.currentDebtId || this.filteredList.length === 0) return;
    const currentIdx = this.filteredList.findIndex(d => String(d.id) === String(this.currentDebtId));
    const nextIdx = currentIdx + delta;

    if (nextIdx >= 0 && nextIdx < this.filteredList.length) {
      this.openDebtDetails(this.filteredList[nextIdx].id);
    }
  },

  backToRegister() {
    this.viewLevel = 'table';
    this.renderCurrentView();
  },

  // ----------------------------------------------------
  // COMPATIBILITY RENDERERS (For Existing Tests)
  // ----------------------------------------------------
  renderFYSidebar() {
    const fyListContainer = document.getElementById('fy-list-container');
    if (!fyListContainer) return;

    const fyYears = ['2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023', '2020-2021', '2019-2020'];
    const fyTotals = {};
    let grandTotalDue = 0;

    fyYears.forEach(fy => { fyTotals[fy] = 0; });

    this.allDebts.forEach(d => {
      const due = Number(d.dueAmount) || 0;
      if (due !== 0) {
        grandTotalDue += due;
        if (fyTotals.hasOwnProperty(d.fy)) {
          fyTotals[d.fy] += due;
        }
      }
    });

    let html = `
      <div class="appsheet-summary-item ${this.selectedFY === 'ALL' ? 'active-fy' : ''}" onclick="LedgerModule.filterByFY('ALL')">
        <span>All Financial Years</span>
        <span class="text-danger">${AppUI.formatCurrency(grandTotalDue)}</span>
      </div>
    `;

    fyYears.forEach(fy => {
      const amt = fyTotals[fy] || 0;
      html += `
        <div class="appsheet-summary-item ${this.selectedFY === fy ? 'active-fy' : ''}" onclick="LedgerModule.filterByFY('${fy}')">
          <span>${fy}</span>
          <span class="text-danger">${AppUI.formatCurrency(amt)}</span>
        </div>
      `;
    });

    fyListContainer.innerHTML = html;
  },

  renderMonthBar() {
    const container = document.getElementById('month-bar-container');
    if (!container) return;
    container.innerHTML = '<span class="text-muted">Month bar initialized</span>';
  },

  filterByFY(fy) {
    this.selectedFY = fy;
    this.selectedMonth = 'ALL';
    this.currentPage = 1;
    if (fy === 'ALL') {
      this.goToYearView();
    } else {
      this.goToMonthView(fy);
    }
  },

  // ----------------------------------------------------
  // RETURN PAYMENTS & CRUD ACTIONS
  // ----------------------------------------------------
  openReturnPaymentModalCurrent() {
    if (!this.currentDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.currentDebtId));
    if (!debt) return;

    document.getElementById('return-debt-id').value = debt.id;
    document.getElementById('return-modal-ref').innerText = `${debt.grNo || debt.id} (${debt.truckNo || debt.borrowerName || 'Debt'})`;
    document.getElementById('return-modal-due').innerText = AppUI.formatCurrency(debt.dueAmount || 0);

    document.getElementById('return-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('return-amount').value = debt.dueAmount || '';
    document.getElementById('return-amount').max = debt.dueAmount || '';
    document.getElementById('return-mode').value = 'Cash';
    document.getElementById('return-received-by').value = '';
    document.getElementById('return-remarks').value = '';

    const modal = new bootstrap.Modal(document.getElementById('modal-record-return'));
    modal.show();
  },

  async submitReturnPayment(event) {
    event.preventDefault();
    const debtId = document.getElementById('return-debt-id').value;
    const date = document.getElementById('return-date').value;
    const amount = Number(document.getElementById('return-amount').value);
    const mode = document.getElementById('return-mode').value;
    const receivedBy = document.getElementById('return-received-by').value;
    const remarks = document.getElementById('return-remarks').value;

    if (!debtId || isNaN(amount) || amount <= 0) {
      AppUI.showToast("Please enter a valid returned amount greater than zero.", "warning");
      return;
    }

    try {
      await dbService.recordReturnedAmount(debtId, {
        date,
        amount,
        mode,
        receivedBy,
        remarks
      });

      await this.loadData();
      this.applyFilters();
      this.renderCurrentView();

      const modalEl = document.getElementById('modal-record-return');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast(`Returned payment of ${AppUI.formatCurrency(amount)} recorded successfully!`, "success");
      this.populateDebtDetailsCard(debtId);
    } catch (err) {
      console.error("Failed to record return amount:", err);
      AppUI.showToast("Failed to save return receipt: " + err.message, "error");
    }
  },

  openAddDebtModal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('form-add-debt').reset();
    document.getElementById('debt-form-id').value = '';
    const titleEl = document.getElementById('add-debt-modal-title');
    if (titleEl) titleEl.innerHTML = `<i class="bi bi-plus-circle me-2"></i> New Debt Entry`;
    document.getElementById('debt-form-date').value = today;
    this.autoSetFYAndMonth(today);

    const modal = new bootstrap.Modal(document.getElementById('modal-add-debt'));
    modal.show();
  },

  openEditDebtModalCurrent() {
    if (!this.currentDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.currentDebtId));
    if (!debt) return;

    document.getElementById('form-add-debt').reset();
    const titleEl = document.getElementById('add-debt-modal-title');
    if (titleEl) {
      titleEl.innerHTML = `<i class="bi bi-pencil-square me-2"></i> Edit Debt Entry (${debt.grNo || debt.id})`;
    }

    document.getElementById('debt-form-id').value = debt.id;
    document.getElementById('debt-form-date').value = debt.date || '';
    document.getElementById('debt-form-fy').value = debt.fy || '2026-2027';
    document.getElementById('debt-form-company').value = debt.company || 'TTC';
    document.getElementById('debt-form-gr').value = debt.grNo || '';
    document.getElementById('debt-form-truck').value = debt.truckNo || '';
    document.getElementById('debt-form-type').value = debt.debtType || 'Commission';
    document.getElementById('debt-form-from').value = debt.from || '';
    document.getElementById('debt-form-to').value = debt.to || '';
    document.getElementById('debt-form-owner').value = debt.truckOwner || '';
    document.getElementById('debt-form-amount').value = debt.debtAmount || debt.dueAmount || 0;
    document.getElementById('debt-form-mode').value = debt.debtMode || 'Cash';
    document.getElementById('debt-form-borrower').value = debt.borrowerName || '';
    document.getElementById('debt-form-receiver').value = debt.receiverName || '';
    document.getElementById('debt-form-desc').value = debt.description || '';

    const modal = new bootstrap.Modal(document.getElementById('modal-add-debt'));
    modal.show();
  },

  autoSetFYAndMonth(dateStr) {
    if (!dateStr) return;
    const { fy } = this.calculateFYAndMonth(dateStr);
    const fySelect = document.getElementById('debt-form-fy');
    if (fySelect) {
      for (let i = 0; i < fySelect.options.length; i++) {
        if (fySelect.options[i].value === fy) {
          fySelect.selectedIndex = i;
          break;
        }
      }
    }
  },

  calculateFYAndMonth(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { fy: '2026-2027', monthKey: '6 Sep' };
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    let startYear, endYear;
    if (month >= 4) {
      startYear = year;
      endYear = year + 1;
    } else {
      startYear = year - 1;
      endYear = year;
    }
    const fy = `${startYear}-${endYear}`;

    const monthMap = {
      1: '10 Jan', 2: '11 Feb', 3: '12 Mar',
      4: '1 Apr', 5: '2 May', 6: '3 Jun',
      7: '4 Jul', 8: '5 Aug', 9: '6 Sep',
      10: '7 Oct', 11: '8 Nov', 12: '9 Dec'
    };
    const monthKey = monthMap[month] || '6 Sep';
    return { fy, monthKey };
  },

  async submitAddDebt(event) {
    event.preventDefault();
    const id = document.getElementById('debt-form-id').value;
    const date = document.getElementById('debt-form-date').value;
    const fy = document.getElementById('debt-form-fy').value;
    const company = document.getElementById('debt-form-company').value;
    const grNo = document.getElementById('debt-form-gr').value.trim() || '-';
    const truckNo = document.getElementById('debt-form-truck').value.trim().toUpperCase() || '-';
    const debtType = document.getElementById('debt-form-type').value;
    const from = document.getElementById('debt-form-from').value.trim() || 'Kishangarh (Raj.)';
    const to = document.getElementById('debt-form-to').value.trim();
    const truckOwner = document.getElementById('debt-form-owner').value.trim();
    const amount = Number(document.getElementById('debt-form-amount').value);
    const debtMode = document.getElementById('debt-form-mode').value;
    const borrowerName = document.getElementById('debt-form-borrower').value.trim() || '-';
    const receiverName = document.getElementById('debt-form-receiver').value.trim() || borrowerName;
    const description = document.getElementById('debt-form-desc').value.trim();

    if (!date || isNaN(amount) || amount <= 0) {
      AppUI.showToast("Please provide a valid date and debt amount.", "warning");
      return;
    }

    const { monthKey } = this.calculateFYAndMonth(date);
    const displayDate = AppUI.formatDate(date);

    if (id) {
      const existing = this.allDebts.find(d => String(d.id) === String(id));
      const totalReturned = existing ? Number(existing.totalReturned || 0) : 0;
      const dueAmount = Math.max(0, amount - totalReturned);

      const updatedFields = {
        date,
        displayDate,
        fy,
        monthKey,
        grNo,
        truckNo,
        company,
        truckOwner: truckOwner || borrowerName,
        debtType,
        from,
        to,
        debtAmount: amount,
        dueAmount,
        debtMode,
        borrowerName,
        receiverName,
        description,
        dotColor: totalReturned > 0 ? 'blue' : 'yellow'
      };

      try {
        await dbService.update('debts', id, updatedFields);
        await this.loadData();
        this.applyFilters();
        this.renderCurrentView();

        const modalEl = document.getElementById('modal-add-debt');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        AppUI.showToast(`Debt record updated successfully!`, "success");
        if (this.currentDebtId === id) {
          this.populateDebtDetailsCard(id);
        }
      } catch (err) {
        console.error("Failed to update debt:", err);
        AppUI.showToast("Failed to update debt: " + err.message, "error");
      }
      return;
    }

    const newDebt = {
      date,
      displayDate,
      fy,
      monthKey,
      grNo,
      truckNo,
      company,
      truckOwner: truckOwner || borrowerName,
      debtType,
      from,
      to,
      debtAmount: amount,
      dueAmount: amount,
      totalReturned: 0,
      debtMode,
      borrowerName,
      receiverName,
      description,
      dotColor: 'yellow',
      returnedAmounts: []
    };

    try {
      const saved = await dbService.add('debts', newDebt);
      await this.loadData();
      this.applyFilters();

      const modalEl = document.getElementById('modal-add-debt');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast(`New debt entry saved successfully!`, "success");
      this.openDebtDetails(saved.id);
    } catch (err) {
      console.error("Failed to add debt:", err);
      AppUI.showToast("Failed to save debt entry: " + err.message, "error");
    }
  },

  async deleteCurrentDebt() {
    if (!this.currentDebtId) return;
    if (!confirm("Are you sure you want to delete this debt record?")) return;

    try {
      await dbService.delete('debts', this.currentDebtId);
      await this.loadData();
      this.applyFilters();

      AppUI.showToast("Debt entry deleted.", "info");
      this.backToRegister();
    } catch (err) {
      AppUI.showToast("Delete failed: " + err.message, "error");
    }
  },

  shareWhatsAppReminderCurrent() {
    if (!this.currentDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.currentDebtId));
    if (!debt) return;

    const due = Number(debt.dueAmount) || 0;
    const total = Number(debt.debtAmount) || 0;

    let msg = `*MTC & TTC LOGISTICS - PAYMENT REMINDER*\n`;
    msg += `----------------------------------------\n`;
    msg += `Namaste Ji,\n`;
    msg += `This is a payment reminder regarding the pending debt balance:\n\n`;
    msg += `*G.R. No.*: ${debt.grNo || 'N/A'}\n`;
    msg += `*Vehicle No.*: ${debt.truckNo || 'N/A'}\n`;
    msg += `*Borrower / Party*: ${debt.borrowerName || 'N/A'}\n`;
    msg += `*Route*: ${debt.from || 'Origin'} -> ${debt.to || 'Destination'}\n`;
    msg += `*Debt Type*: ${debt.debtType || 'General'}\n`;
    msg += `*Date*: ${debt.displayDate || debt.date}\n\n`;
    msg += `*Total Billed*: Rs. ${total.toLocaleString('en-IN')}\n`;
    msg += `*Outstanding Due Balance*: *Rs. ${due.toLocaleString('en-IN')}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Kindly arrange the balance payment at the earliest. Thank you!\n`;
    msg += `*Mahaveer Transport Co. & TTC Logistics*`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  // ----------------------------------------------------
  // EXCEL / CSV EXPORT & IMPORT
  // ----------------------------------------------------
  exportToCSV() {
    if (!this.filteredList || this.filteredList.length === 0) {
      AppUI.showToast("No records to export in current filter view", "warning");
      return;
    }

    const headers = [
      "G.R. No", "Company", "Vehicle No", "Date", "From", "To",
      "Truck Owner", "Borrower Name", "Receiver Name", "Debt Type",
      "Debt Mode", "Debt Amount (INR)", "Total Returned (INR)",
      "Due Balance (INR)", "Financial Year", "Description"
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let csvContent = '\uFEFF';
    csvContent += headers.join(',') + '\r\n';

    this.filteredList.forEach(d => {
      const row = [
        escapeCSV(d.grNo || ''),
        escapeCSV(d.company || 'TTC'),
        escapeCSV(d.truckNo || ''),
        escapeCSV(d.displayDate || d.date || ''),
        escapeCSV(d.from || ''),
        escapeCSV(d.to || ''),
        escapeCSV(d.truckOwner || ''),
        escapeCSV(d.borrowerName || ''),
        escapeCSV(d.receiverName || ''),
        escapeCSV(d.debtType || ''),
        escapeCSV(d.debtMode || ''),
        escapeCSV(Number(d.debtAmount) || 0),
        escapeCSV(Number(d.totalReturned) || 0),
        escapeCSV(Number(d.dueAmount) || 0),
        escapeCSV(d.fy || ''),
        escapeCSV(d.description || '')
      ];
      csvContent += row.join(',') + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fyLabel = this.selectedFY === 'ALL' ? 'All_Years' : this.selectedFY;
    const dateLabel = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `MTC_TTC_Debts_Export_${fyLabel}_${dateLabel}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    AppUI.showToast(`Exported ${this.filteredList.length} debt records to CSV successfully!`, "success");
  },

  openImportModal() {
    this.stagedImportDebts = [];
    const fileInput = document.getElementById('debt-import-file-input');
    if (fileInput) fileInput.value = '';

    document.getElementById('import-preview-section')?.classList.add('d-none');
    document.getElementById('import-action-buttons')?.classList.add('d-none');

    const modal = new bootstrap.Modal(document.getElementById('modal-import-debts'));
    modal.show();
  },

  downloadExcelTemplate() {
    const headers = [
      "Date (DD/MM/YYYY)", "G.R. No", "Company (TTC/MTC/SMTC)", "Truck No",
      "From City", "To City", "Truck Owner", "Borrower Name", "Receiver Name",
      "Debt Type", "Payment Mode", "Debt Amount (INR)", "Total Returned (INR)",
      "Due Balance (INR)", "Financial Year", "Description"
    ];

    const sampleRows = [
      ["23/09/2026", "2188_TTC", "TTC", "RJ52GB5640", "Kishangarh (Raj.)", "Delhi", "Shree Mahaveer Transport Company", "Shree Mahaveer Transport Company", "Hardan 8890178907", "Commission", "Cash", "1500", "0", "1500", "2026-2027", "Commission - Delhi"],
      ["21/11/2023", "-", "TTC", "RJ52GA9489", "Kishangarh (Raj.)", "Delhi", "Laxmi Prakash Jat", "Laxmi Prakash Jat", "Laxmi Prakash Jat", "Old", "Cash", "1500", "485", "1015", "2023-2024", "Commission-Kishangarh"]
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let csvContent = '\uFEFF';
    csvContent += headers.join(',') + '\r\n';
    sampleRows.forEach(row => {
      csvContent += row.map(escapeCSV).join(',') + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MTC_TTC_Debts_Import_Template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    AppUI.showToast("Sample Excel/CSV template downloaded!", "info");
  },

  async onImportFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });

      if (rows.length < 2) {
        AppUI.showToast("File contains no data rows.", "warning");
        return;
      }

      const headers = rows[0].map(h => String(h || '').trim().toLowerCase());
      const findColIdx = (keywords) => {
        return headers.findIndex(h => keywords.some(k => h.includes(k)));
      };

      const dateIdx = findColIdx(['date', 'दिनांक', 'tarikh']);
      const grIdx = findColIdx(['gr', 'g.r', 'bilty', 'lr']);
      const truckIdx = findColIdx(['truck', 'vehicle', 'गाड़ी', 'gaadi', 'lorry']);
      const companyIdx = findColIdx(['company', 'firm']);
      const fromIdx = findColIdx(['from', 'origin']);
      const toIdx = findColIdx(['to', 'dest']);
      const ownerIdx = findColIdx(['owner', 'मालक']);
      const borrowerIdx = findColIdx(['borrower', 'party', 'नाम', 'name', 'account']);
      const receiverIdx = findColIdx(['receiver', 'प्राप्तकर्ता', 'phone', 'mobile']);
      const typeIdx = findColIdx(['type', 'debt type', 'head']);
      const modeIdx = findColIdx(['mode', 'payment mode', 'via']);
      const amountIdx = findColIdx(['amount', 'debt amount', 'debit', 'रकम']);
      const returnedIdx = findColIdx(['return', 'received', 'credit']);
      const dueIdx = findColIdx(['due', 'balance', 'closing', 'बकाया']);
      const descIdx = findColIdx(['desc', 'remark', 'note', 'विवरण']);

      const parsedDebts = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0 || row.every(c => String(c).trim() === '')) continue;

        const rawDate = dateIdx >= 0 ? row[dateIdx] : '';
        const parsedDate = this.parseAnyDate(rawDate) || '2026-09-01';
        const displayDate = AppUI.formatDate(parsedDate);
        const { fy, monthKey } = this.calculateFYAndMonth(parsedDate);

        const debtAmt = amountIdx >= 0 ? Math.abs(parseFloat(String(row[amountIdx]).replace(/[^0-9.-]/g, '')) || 0) : 0;
        const retAmt = returnedIdx >= 0 ? Math.abs(parseFloat(String(row[returnedIdx]).replace(/[^0-9.-]/g, '')) || 0) : 0;
        let dueAmt = dueIdx >= 0 ? Math.abs(parseFloat(String(row[dueIdx]).replace(/[^0-9.-]/g, '')) || 0) : Math.max(0, debtAmt - retAmt);
        if (dueAmt === 0 && debtAmt > 0 && retAmt === 0) dueAmt = debtAmt;

        const borrowerName = borrowerIdx >= 0 && row[borrowerIdx] ? String(row[borrowerIdx]).trim() : 'General Party';

        parsedDebts.push({
          id: `imp_${Date.now()}_${i}`,
          date: parsedDate,
          displayDate,
          fy,
          monthKey,
          company: companyIdx >= 0 && row[companyIdx] ? String(row[companyIdx]).trim().toUpperCase() : 'TTC',
          grNo: grIdx >= 0 && row[grIdx] ? String(row[grIdx]).trim() : '-',
          truckNo: truckIdx >= 0 && row[truckIdx] ? String(row[truckIdx]).trim().toUpperCase() : '-',
          from: fromIdx >= 0 && row[fromIdx] ? String(row[fromIdx]).trim() : 'Kishangarh (Raj.)',
          to: toIdx >= 0 && row[toIdx] ? String(row[toIdx]).trim() : 'Delhi',
          truckOwner: ownerIdx >= 0 && row[ownerIdx] ? String(row[ownerIdx]).trim() : borrowerName,
          borrowerName,
          receiverName: receiverIdx >= 0 && row[receiverIdx] ? String(row[receiverIdx]).trim() : borrowerName,
          debtType: typeIdx >= 0 && row[typeIdx] ? String(row[typeIdx]).trim() : 'Commission',
          debtMode: modeIdx >= 0 && row[modeIdx] ? String(row[modeIdx]).trim() : 'Cash',
          debtAmount: debtAmt,
          totalReturned: retAmt,
          dueAmount: dueAmt,
          description: descIdx >= 0 && row[descIdx] ? String(row[descIdx]).trim() : '',
          dotColor: retAmt > 0 ? 'blue' : 'yellow',
          returnedAmounts: retAmt > 0 ? [{ date: parsedDate, amount: retAmt, mode: 'Import', receivedBy: 'Auto' }] : []
        });
      }

      this.stagedImportDebts = parsedDebts;

      document.getElementById('import-summary-count').innerText = parsedDebts.length;
      const totalDue = parsedDebts.reduce((sum, d) => sum + d.dueAmount, 0);
      document.getElementById('import-summary-amount').innerText = `Total: ₹${totalDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      document.getElementById('import-file-name').innerText = file.name;

      const previewTbody = document.getElementById('import-preview-tbody');
      if (previewTbody) {
        previewTbody.innerHTML = parsedDebts.slice(0, 5).map((d, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${d.displayDate}</td>
            <td><span class="badge bg-secondary">${d.fy}</span></td>
            <td>${d.grNo}</td>
            <td>${d.truckNo}</td>
            <td>${d.borrowerName}</td>
            <td class="text-end text-danger fw-bold">₹${d.dueAmount.toLocaleString('en-IN')}</td>
          </tr>
        `).join('');
      }

      document.getElementById('import-preview-section')?.classList.remove('d-none');
      document.getElementById('import-action-buttons')?.classList.remove('d-none');

      AppUI.showToast(`Analyzed ${parsedDebts.length} valid rows from file! Ready to import.`, "success");
    } catch (err) {
      console.error("Import parse failed:", err);
      AppUI.showToast("Failed to parse file: " + err.message, "error");
    }
  },

  async executeImport() {
    if (!this.stagedImportDebts || this.stagedImportDebts.length === 0) {
      AppUI.showToast("No valid records to import!", "warning");
      return;
    }

    const mode = document.querySelector('input[name="import-mode"]:checked')?.value || 'replace';

    try {
      if (mode === 'replace') {
        dbService.clearAllDebts();
        localStorage.setItem('tms_custom_debts', JSON.stringify(this.stagedImportDebts));
      } else {
        const existing = JSON.parse(localStorage.getItem('tms_custom_debts') || '[]');
        const combined = [...existing, ...this.stagedImportDebts];
        localStorage.setItem('tms_custom_debts', JSON.stringify(combined));
      }

      await this.loadData();
      this.applyFilters();
      this.renderCurrentView();

      const modalEl = document.getElementById('modal-import-debts');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast(`Successfully imported ${this.stagedImportDebts.length} ledger records!`, "success");
    } catch (err) {
      console.error("Import failed:", err);
      AppUI.showToast("Import failed: " + err.message, "danger");
    }
  },

  async resetToFactoryData() {
    if (!confirm("Are you sure you want to restore the standard 668 AppSheet records?")) return;
    try {
      dbService.restoreBaseDebts();
      await this.loadData();
      this.applyFilters();
      this.renderCurrentView();

      const modalEl = document.getElementById('modal-import-debts');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast("Restored all 668 standard AppSheet records successfully!", "success");
    } catch (err) {
      console.error("Reset failed:", err);
      AppUI.showToast("Reset failed: " + err.message, "danger");
    }
  },

  parseAnyDate(val) {
    if (!val) return null;
    if (val instanceof Date && !isNaN(val.getTime())) {
      const y = val.getFullYear();
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    const str = String(val).trim();
    const parts = str.split(/[/\-.]/);
    if (parts.length === 3) {
      let d = parseInt(parts[0], 10);
      let m = parseInt(parts[1], 10);
      let y = parseInt(parts[2], 10);
      if (y < 100) y += 2000;
      if (d > 12 && m <= 12) {
        return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }
      if (m > 12 && d <= 12) {
        return `${y}-${String(d).padStart(2, '0')}-${String(m).padStart(2, '0')}`;
      }
      return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
    return null;
  },

  // ----------------------------------------------------
  // TAB SWITCHING (OPEN / SETTLED / ALL / STATEMENTS)
  // ----------------------------------------------------
  switchTab(tabName) {
    this.currentTab = tabName;

    document.getElementById('tab-btn-open')?.classList.toggle('active', tabName === 'open');
    document.getElementById('tab-btn-all')?.classList.toggle('active', tabName === 'all');
    document.getElementById('tab-btn-settled')?.classList.toggle('active', tabName === 'settled');
    document.getElementById('tab-btn-statements')?.classList.toggle('active', tabName === 'statements');

    this.applyFilters();
    this.renderCurrentView();
  },

  // ----------------------------------------------------
  // STATEMENTS GENERATOR (Customer / Owner)
  // ----------------------------------------------------
  onCategoryChange() {
    const category = document.getElementById('ledger-category')?.value || 'party';
    this.currentCategory = category;
    const label = document.getElementById('ledger-entity-label');
    const select = document.getElementById('ledger-entity');

    if (category === 'party') {
      if (label) label.innerText = "Select Customer / Party *";
      if (select) {
        select.innerHTML = '<option value="">-- Choose Party --</option>' +
          this.allParties.map(p => `<option value="${p.id}">${p.name} (Due: ${AppUI.formatCurrency(p.dueAmount || 0)})</option>`).join('');
      }
    } else {
      if (label) label.innerText = "Select Truck Owner *";
      if (select) {
        select.innerHTML = '<option value="">-- Choose Truck Owner --</option>' +
          this.allOwners.map(o => `<option value="${o.id}">${o.name} (${o.type} - Due: ${AppUI.formatCurrency(o.dueAmount || 0)})</option>`).join('');
      }
    }

    if (select && select.options.length > 1) {
      select.selectedIndex = 1;
      this.generateStatement();
    }
  },

  generateStatement() {
    const entityId = document.getElementById('ledger-entity')?.value;
    const firmFilter = document.getElementById('ledger-firm')?.value || 'ALL';
    const tbody = document.getElementById('stmt-table-body');
    if (!tbody) return;

    if (!entityId) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            Please select an account from the dropdown above.
          </td>
        </tr>
      `;
      return;
    }

    const todayStr = AppUI.formatDate(new Date().toISOString().split('T')[0]);
    document.getElementById('stmt-period').innerText = `Statement As on: ${todayStr}`;

    if (this.currentCategory === 'party') {
      this.renderPartyStatement(entityId, firmFilter);
    } else {
      this.renderOwnerStatement(entityId, firmFilter);
    }
  },

  renderPartyStatement(partyId, firmFilter) {
    const party = this.allParties.find(p => String(p.id) === String(partyId));
    if (!party) return;
    this.currentEntity = party;

    document.getElementById('stmt-name').innerText = party.name;
    document.getElementById('stmt-details').innerHTML = `
      <div><strong>GSTIN:</strong> <span class="font-monospace">${party.gstin || 'N/A'}</span></div>
      <div><strong>Address:</strong> ${party.address || 'Rajasthan'}</div>
      <div><strong>Mobile:</strong> ${party.mobile || 'N/A'} ${party.contactPerson ? `(${party.contactPerson})` : ''}</div>
    `;

    let partyTrips = this.allTrips.filter(t => t.consignor === party.name || t.consignee === party.name);
    if (firmFilter !== 'ALL') {
      partyTrips = partyTrips.filter(t => t.transport === firmFilter);
    }

    let partyPayments = this.allPayments.filter(p => p.type === 'party' && p.partyName === party.name);
    if (firmFilter !== 'ALL') {
      partyPayments = partyPayments.filter(p => p.firm === firmFilter);
    }

    const events = [];
    partyTrips.forEach(t => {
      events.push({
        date: t.tripStartDate || '2026-01-01',
        firm: t.transport,
        ref: t.grNo,
        particulars: `Freight: ${t.truckNo} (${t.origin} to ${t.destination}) - ${t.material}`,
        debit: Number(t.freight) || 0,
        credit: 0
      });
    });

    partyPayments.forEach(p => {
      events.push({
        date: p.date,
        firm: p.firm,
        ref: p.refNo || (p.grNo ? `Against ${p.grNo}` : 'On-Account'),
        particulars: `Payment Received via ${p.mode} ${p.bankAccount ? `(${p.bankAccount})` : ''} ${p.remarks ? `- ${p.remarks}` : ''}`,
        debit: 0,
        credit: Number(p.amount) || 0
      });
    });

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    let totalDebit = 0;
    let totalCredit = 0;

    const tbody = document.getElementById('stmt-table-body');
    const tfoot = document.getElementById('stmt-table-footer');

    if (events.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No transactions found for this party.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = events.map(e => {
      totalDebit += e.debit;
      totalCredit += e.credit;
      runningBalance = runningBalance + e.debit - e.credit;

      return `
        <tr>
          <td>${AppUI.formatDate(e.date)}</td>
          <td><span class="badge ${APP_CONFIG.firms[e.firm]?.badgeClass || 'bg-secondary'}">${e.firm}</span></td>
          <td class="font-monospace small fw-bold">${e.ref}</td>
          <td>${e.particulars}</td>
          <td class="text-end font-monospace">${e.debit ? AppUI.formatCurrency(e.debit) : '-'}</td>
          <td class="text-end font-monospace text-success">${e.credit ? AppUI.formatCurrency(e.credit) : '-'}</td>
          <td class="text-end font-monospace fw-bold ${runningBalance > 0 ? 'text-danger' : 'text-success'}">
            ${AppUI.formatCurrency(Math.abs(runningBalance))} ${runningBalance >= 0 ? 'Dr' : 'Cr'}
          </td>
        </tr>
      `;
    }).join('');

    document.getElementById('stmt-total-debit').innerText = AppUI.formatCurrency(totalDebit);
    document.getElementById('stmt-total-credit').innerText = AppUI.formatCurrency(totalCredit);
    document.getElementById('stmt-closing-due').innerText = AppUI.formatCurrency(runningBalance);

    tfoot.innerHTML = `
      <tr>
        <td colspan="4" class="text-end text-uppercase">Totals</td>
        <td class="text-end text-dark">${AppUI.formatCurrency(totalDebit)}</td>
        <td class="text-end text-success">${AppUI.formatCurrency(totalCredit)}</td>
        <td class="text-end text-danger">${AppUI.formatCurrency(runningBalance)} Dr</td>
      </tr>
    `;
  },

  renderOwnerStatement(ownerId, firmFilter) {
    const owner = this.allOwners.find(o => String(o.id) === String(ownerId));
    if (!owner) return;
    this.currentEntity = owner;

    document.getElementById('stmt-name').innerText = owner.name;
    document.getElementById('stmt-details').innerHTML = `
      <div><strong>Type:</strong> ${owner.type} Truck Owner</div>
      <div><strong>Registered Trucks:</strong> ${(owner.trucks || []).join(', ') || 'N/A'}</div>
      <div><strong>Contact:</strong> ${owner.mobile} ${owner.mobile1 ? `, ${owner.mobile1}` : ''}</div>
    `;

    let ownerTrips = this.allTrips.filter(t => (owner.trucks || []).includes(t.truckNo));
    if (firmFilter !== 'ALL') {
      ownerTrips = ownerTrips.filter(t => t.transport === firmFilter);
    }

    let ownerPayments = this.allPayments.filter(p => p.type === 'owner' && p.ownerName === owner.name);
    if (firmFilter !== 'ALL') {
      ownerPayments = ownerPayments.filter(p => p.firm === firmFilter);
    }

    const events = [];
    ownerTrips.forEach(t => {
      events.push({
        date: t.tripStartDate || '2026-01-01',
        firm: t.transport,
        ref: t.grNo,
        particulars: `Freight Payable: Truck ${t.truckNo} (${t.origin} to ${t.destination}) - Net after diesel/adv`,
        credit: Number(t.ownerBalancePayable || t.freight) || 0,
        debit: 0
      });
    });

    ownerPayments.forEach(p => {
      events.push({
        date: p.date,
        firm: p.firm,
        ref: p.refNo || (p.grNo ? `Against ${p.grNo}` : 'On-Account'),
        particulars: `Payment Made via ${p.mode} ${p.bankAccount ? `(${p.bankAccount})` : ''} ${p.remarks ? `- ${p.remarks}` : ''}`,
        credit: 0,
        debit: Number(p.amount) || 0
      });
    });

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    let totalPayable = 0;
    let totalPaid = 0;

    const tbody = document.getElementById('stmt-table-body');
    const tfoot = document.getElementById('stmt-table-footer');

    if (events.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No transactions found for this truck owner.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = events.map(e => {
      totalPaid += e.debit;
      totalPayable += e.credit;
      runningBalance = runningBalance + e.credit - e.debit;

      return `
        <tr>
          <td>${AppUI.formatDate(e.date)}</td>
          <td><span class="badge ${APP_CONFIG.firms[e.firm]?.badgeClass || 'bg-secondary'}">${e.firm}</span></td>
          <td class="font-monospace small fw-bold">${e.ref}</td>
          <td>${e.particulars}</td>
          <td class="text-end font-monospace">${e.credit ? AppUI.formatCurrency(e.credit) : '-'}</td>
          <td class="text-end font-monospace text-primary">${e.debit ? AppUI.formatCurrency(e.debit) : '-'}</td>
          <td class="text-end font-monospace fw-bold text-danger">
            ${AppUI.formatCurrency(runningBalance)}
          </td>
        </tr>
      `;
    }).join('');

    document.getElementById('stmt-total-debit').innerText = AppUI.formatCurrency(totalPayable);
    document.getElementById('stmt-total-credit').innerText = AppUI.formatCurrency(totalPaid);
    document.getElementById('stmt-closing-due').innerText = AppUI.formatCurrency(runningBalance);

    tfoot.innerHTML = `
      <tr>
        <td colspan="4" class="text-end text-uppercase">Totals</td>
        <td class="text-end text-dark">${AppUI.formatCurrency(totalPayable)}</td>
        <td class="text-end text-primary">${AppUI.formatCurrency(totalPaid)}</td>
        <td class="text-end text-danger">${AppUI.formatCurrency(runningBalance)} Balance</td>
      </tr>
    `;
  },

  shareWhatsAppStatement() {
    if (!this.currentEntity) {
      AppUI.showToast("Please select an account statement first", "warning");
      return;
    }

    const dueAmount = document.getElementById('stmt-closing-due').innerText;
    const phone = this.currentEntity.mobile || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    const message = `*Statement of Account - MTC & TTC Logistics*%0A` +
      `Account: *${this.currentEntity.name}*%0A` +
      `Closing Outstanding Due: *${dueAmount}*%0A%0A` +
      `Please find your statement details. Kindly arrange payment at your earliest convenience.%0A%0A` +
      `_TTC Transport Corporation / Mahaveer Transport Co_`;

    const whatsappUrl = `https://wa.me/${cleanPhone ? '91' + cleanPhone : ''}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
};

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', () => {
    LedgerModule.init();
  });
}
