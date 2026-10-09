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
  allCashLedger: [],
  allReturnedAmounts: [],

  // Main Mode State: 'dashboard' | 'cash-ledger' | 'returned-amount' | 'debts' | 'details' | 'statements'
  mainViewMode: 'dashboard',

  // Cash Ledger State
  selectedCashFY: '2026-2027',
  selectedCashMonth: '7 Oct',
  expandedCashFYs: { '2026-2027': true, '2025-2026': false, '2024-2025': false, 'empty': false },
  isDateSidebarHidden: false,
  cashPageSize: 100,
  cashCurrentPage: 1,
  filteredCashList: [],
  activeCashBreakdownDate: null,
  activeCashDetailsRecord: null,

  // Returned Amount State (Authentic AppSheet Green Master-Detail)
  selectedReturnedFY: '2026-2027',
  selectedReturnedMonth: '7 Oct',
  expandedReturnedFYs: { '2026-2027': true, '2025-2026': false, '2024-2025': false },
  isReturnedSidebarHidden: false,
  returnedPageSize: 100,
  returnedCurrentPage: 1,
  filteredReturnedList: [],
  activeReturnedRecordId: null,
  isSettledPanelFullscreen: false,

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
    this.applyCashFilters();
    this.applyReturnedFilters();
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
    this.allCashLedger = await dbService.getAll('cashLedger');
    this.allReturnedAmounts = await dbService.getAll('returnedAmounts');
  },

  // ----------------------------------------------------
  // DASHBOARD & MULTI-VIEW NAVIGATION
  // ----------------------------------------------------
  goToDashboardView() {
    this.mainViewMode = 'dashboard';
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Ledger';
    }
    this.renderCurrentView();
  },

  goToCashLedgerView(fy = '2026-2027', month = null) {
    this.mainViewMode = 'cash-ledger';
    if (fy === 'ALL') {
      this.selectedCashFY = 'ALL';
      this.selectedCashMonth = 'ALL';
    } else {
      this.selectedCashFY = fy;
      this.selectedCashMonth = month !== null ? month : (fy === '2026-2027' ? '7 Oct' : 'ALL');
      if (fy !== 'empty') {
        this.expandedCashFYs[fy] = true;
      }
    }
    this.cashCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Cash Ledger';
    }
    this.applyCashFilters();
    this.renderCurrentView();
  },

  goToReturnedAmountView(fy = '2026-2027', month = null) {
    this.mainViewMode = 'returned-amount';
    if (fy === 'ALL') {
      this.selectedReturnedFY = 'ALL';
      this.selectedReturnedMonth = 'ALL';
    } else {
      this.selectedReturnedFY = fy;
      this.selectedReturnedMonth = month !== null ? month : (fy === '2026-2027' ? '7 Oct' : 'ALL');
      this.expandedReturnedFYs[fy] = true;
    }
    this.returnedCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Returned Amount';
    }
    this.applyReturnedFilters();
    this.renderCurrentView();
  },

  goToDebtsView(tab = 'open', fy = 'ALL') {
    this.mainViewMode = 'debts';
    this.currentTab = tab;
    this.selectedFY = fy;
    this.viewLevel = fy === 'ALL' ? 'year' : 'month';
    this.currentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Ledger';
    }
    this.applyFilters();
    this.renderCurrentView();
  },

  goToCompanyExpenseView(fy = 'ALL') {
    if (typeof AppUI !== 'undefined') AppUI.showToast(`Company Expenses for ${fy} opening...`, 'info');
    this.goToDebtsView('all', fy);
  },

  goToReceivedView(fy = 'ALL') {
    if (typeof AppUI !== 'undefined') AppUI.showToast(`Received payments for ${fy} opening...`, 'info');
    this.goToDebtsView('settled', fy);
  },

  goToOwnerExpenseView(fy = 'ALL') {
    if (typeof AppUI !== 'undefined') AppUI.showToast(`Owner Expenses for ${fy} opening...`, 'info');
    this.goToDebtsView('all', fy);
  },

  handleTopAddAction() {
    if (this.mainViewMode === 'cash-ledger') {
      this.openCashDetailsModal();
    } else {
      this.openAddDebtModal();
    }
  },

  // ----------------------------------------------------
  // CASH LEDGER FILTERING, RENDERING & ACTIONS
  // ----------------------------------------------------
  applyCashFilters() {
    let list = Array.isArray(this.allCashLedger) ? [...this.allCashLedger] : [];
    
    // 1. FY Filter
    if (this.selectedCashFY && this.selectedCashFY !== 'ALL') {
      if (this.selectedCashFY === 'empty') {
        list = list.filter(r => !r.fy);
      } else {
        list = list.filter(r => r.fy === this.selectedCashFY);
      }
    }

    // 2. Month Filter
    if (this.selectedCashMonth && this.selectedCashMonth !== 'ALL') {
      const monthNumMap = {
        '1 Apr': '04', '2 May': '05', '3 Jun': '06',
        '4 Jul': '07', '5 Aug': '08', '6 Sep': '09',
        '7 Oct': '10', '8 Nov': '11', '9 Dec': '12',
        '10 Jan': '01', '11 Feb': '02', '12 Mar': '03'
      };
      const expectedMonth = monthNumMap[this.selectedCashMonth];
      if (expectedMonth) {
        list = list.filter(r => {
          if (!r.date) return false;
          const parts = r.date.split('/');
          return parts.length >= 2 && parts[1] === expectedMonth;
        });
      }
    }

    // 3. Search Query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(r => 
        (r.date && r.date.toLowerCase().includes(q)) ||
        (r.displayDate && r.displayDate.toLowerCase().includes(q)) ||
        (r.fy && r.fy.toLowerCase().includes(q)) ||
        String(r.amountReceived || '').includes(q) ||
        String(r.expense || '').includes(q) ||
        String(r.debt || '').includes(q) ||
        String(r.availableCash || '').includes(q)
      );
    }

    this.filteredCashList = list;
  },

  toggleDateSidebar() {
    this.isDateSidebarHidden = !this.isDateSidebarHidden;
    const sidebar = document.getElementById('cash-ledger-tree-sidebar');
    const toggleBtnText = document.getElementById('btn-toggle-date-text');
    const toggleBtnIcon = document.getElementById('btn-toggle-date-icon');

    if (sidebar) {
      if (this.isDateSidebarHidden) {
        sidebar.classList.add('collapsed');
      } else {
        sidebar.classList.remove('collapsed');
      }
    }

    if (toggleBtnText) {
      toggleBtnText.innerText = this.isDateSidebarHidden ? 'Show Date Filter' : 'Hide Date Filter';
    }
    if (toggleBtnIcon) {
      toggleBtnIcon.className = this.isDateSidebarHidden ? 'bi bi-layout-sidebar' : 'bi bi-layout-sidebar-inset';
    }
  },

  getDynamicFYMonths() {
    const fyMap = {};
    const monthNumToLabel = {
      '04': '1 Apr', '05': '2 May', '06': '3 Jun',
      '07': '4 Jul', '08': '5 Aug', '09': '6 Sep',
      '10': '7 Oct', '11': '8 Nov', '12': '9 Dec',
      '01': '10 Jan', '02': '11 Feb', '03': '12 Mar'
    };
    const monthOrder = [
      '12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct',
      '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'
    ];

    (this.allCashLedger || []).forEach(r => {
      if (!r.date) return;
      const parts = r.date.split('/');
      if (parts.length < 3) return;
      const [d, m, y] = parts;
      const fy = r.fy || ((Number(m) >= 4) ? `${y}-${Number(y) + 1}` : `${Number(y) - 1}-${y}`);
      const mLabel = monthNumToLabel[m.padStart(2, '0')];
      if (!fyMap[fy]) fyMap[fy] = new Set();
      if (mLabel) fyMap[fy].add(mLabel);
    });

    const sortedFYs = Object.keys(fyMap).sort().reverse();
    const result = {};
    sortedFYs.forEach(fy => {
      const set = fyMap[fy];
      result[fy] = monthOrder.filter(m => set.has(m));
    });

    return { sortedFYs, fyMonths: result };
  },

  updateCashFilterBadge() {
    const badge = document.getElementById('cash-current-filter-badge');
    if (!badge) return;
    if (this.selectedCashFY === 'ALL' && this.selectedCashMonth === 'ALL') {
      badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>All Dates`;
    } else if (this.selectedCashMonth !== 'ALL') {
      badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedCashFY} &gt; <strong>${this.selectedCashMonth}</strong>`;
    } else {
      badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i><strong>${this.selectedCashFY}</strong> (All Months)`;
    }
  },

  toggleCashFYTree(fy) {
    this.expandedCashFYs[fy] = !this.expandedCashFYs[fy];
    this.renderCashTreeSidebar();
  },

  selectCashFY(fy) {
    this.selectedCashFY = fy;
    this.selectedCashMonth = 'ALL';
    if (fy !== 'ALL' && fy !== 'empty') {
      this.expandedCashFYs[fy] = true;
    }
    this.cashCurrentPage = 1;
    this.applyCashFilters();
    this.renderCashTreeSidebar();
    this.renderCashLedgerTable();
    this.updateCashFilterBadge();
  },

  selectCashMonth(fy, month) {
    this.selectedCashFY = fy;
    this.selectedCashMonth = month;
    if (fy !== 'ALL' && fy !== 'empty') {
      this.expandedCashFYs[fy] = true;
    }
    this.cashCurrentPage = 1;
    this.applyCashFilters();
    this.renderCashTreeSidebar();
    this.renderCashLedgerTable();
    this.updateCashFilterBadge();
  },

  selectCashAll() {
    this.selectedCashFY = 'ALL';
    this.selectedCashMonth = 'ALL';
    this.cashCurrentPage = 1;
    this.applyCashFilters();
    this.renderCashTreeSidebar();
    this.renderCashLedgerTable();
    this.updateCashFilterBadge();
  },

  filterCashFY(fy) {
    // Backward-compatible alias
    this.selectCashFY(fy);
  },

  renderCashTreeSidebar() {
    const sidebar = document.getElementById('cash-ledger-tree-sidebar');
    if (!sidebar) return;

    const { sortedFYs, fyMonths } = this.getDynamicFYMonths();

    let html = `
      <div class="cash-tree-header d-flex align-items-center justify-content-between">
        <span>Date</span>
        <button type="button" class="btn btn-sm btn-link text-muted p-0 border-0" onclick="LedgerModule.toggleDateSidebar()" title="Hide Date Sidebar">
          <i class="bi bi-chevron-bar-left fs-6"></i>
        </button>
      </div>
      <div class="cash-tree-item ${this.selectedCashFY === 'ALL' && this.selectedCashMonth === 'ALL' ? 'active' : ''}" id="cash-tree-all" onclick="LedgerModule.selectCashAll()">
        <span>All</span>
      </div>
    `;

    sortedFYs.forEach(fy => {
      const isExpanded = !!this.expandedCashFYs[fy];
      const isFYActive = this.selectedCashFY === fy && this.selectedCashMonth === 'ALL';
      const months = fyMonths[fy] || [];

      html += `
        <div class="cash-tree-item ${isFYActive ? 'active' : ''}" id="cash-tree-${fy.replace(/[^a-z0-9]/gi, '-')}">
          <span class="cash-tree-caret" onclick="event.stopPropagation(); LedgerModule.toggleCashFYTree('${fy}')">
            <i class="bi ${isExpanded ? 'bi-caret-down-fill' : 'bi-caret-right-fill'}"></i>
          </span>
          <span class="appsheet-bullet gold-bullet">●</span>
          <span class="fw-semibold" onclick="LedgerModule.selectCashFY('${fy}')">${fy}</span>
        </div>
      `;

      if (isExpanded) {
        html += `
          <div class="cash-tree-sublist" id="cash-sublist-${fy.replace(/[^a-z0-9]/gi, '-')}">
            ${months.map(m => {
              const isMonthActive = this.selectedCashFY === fy && this.selectedCashMonth === m;
              const safeM = m.replace(/\s+/g, '-').toLowerCase();
              return `
                <div class="cash-tree-item cash-tree-subitem ${isMonthActive ? 'active' : ''}" id="cash-tree-month-${fy.replace(/[^a-z0-9]/gi, '-')}-${safeM}" onclick="LedgerModule.selectCashMonth('${fy}', '${m}')">
                  <span class="appsheet-bullet text-muted" style="font-size: 11px;">●</span>
                  <span>${m}</span>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }
    });

    // (empty) item for any uncategorized records
    const hasEmpty = (this.allCashLedger || []).some(r => !r.fy);
    if (hasEmpty) {
      const isEmptyActive = this.selectedCashFY === 'empty';
      html += `
        <div class="cash-tree-item ${isEmptyActive ? 'active' : ''}" id="cash-tree-empty" onclick="LedgerModule.selectCashFY('empty')">
          <span class="cash-tree-caret"><i class="bi bi-caret-right-fill"></i></span>
          <span class="text-muted small">(empty)</span>
        </div>
      `;
    }

    sidebar.innerHTML = html;
    this.updateCashFilterBadge();
  },

  formatINR(val) {
    if (val === null || val === undefined || isNaN(val)) return '0.00';
    return Number(val).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  formatDateToDash(dateStr) {
    if (!dateStr) return '';
    if (dateStr.includes('/')) {
      const [d, m, y] = dateStr.split('/');
      return `${d}-${m}-${y}`;
    }
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts[0].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr;
    }
    return dateStr;
  },

  parseDateToSlash(dateStr) {
    if (!dateStr) return '';
    if (dateStr.includes('/')) return dateStr;
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts[0].length === 4) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      } else {
        return `${parts[0]}/${parts[1]}/${parts[2]}`;
      }
    }
    return dateStr;
  },

  parseDateToISO(dateStr) {
    if (!dateStr) return '';
    if (dateStr.includes('/')) {
      const [d, m, y] = dateStr.split('/');
      return `${y}-${m}-${d}`;
    }
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts[0].length === 4) return dateStr;
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  },

  parseCashNumber(val) {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'number') return val;
    const cleaned = String(val).replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  },

  lookupPreviousDayCash(dateStr) {
    const slash = this.parseDateToSlash(dateStr);
    const parts = slash.split('/').map(Number);
    if (parts.length < 3 || isNaN(parts[0])) {
      return this.getLatestAvailableCash();
    }
    const [d, m, y] = parts;
    const targetDate = new Date(y, m - 1, d);

    let priorCash = null;
    let minDiff = Infinity;

    for (const r of this.allCashLedger) {
      if (!r.date || r.date === slash) continue;
      const rParts = r.date.split('/').map(Number);
      if (rParts.length < 3) continue;
      const [rd, rm, ry] = rParts;
      const rDate = new Date(ry, rm - 1, rd);
      const diff = targetDate - rDate;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        priorCash = Number(r.availableCash) || 0;
      }
    }

    if (priorCash !== null) return priorCash;
    return this.getLatestAvailableCash();
  },

  getLatestAvailableCash() {
    return this.allCashLedger.length > 0 ? (Number(this.allCashLedger[0].availableCash) || 0) : 0;
  },

  renderCashLedgerTable() {
    const tbody = document.getElementById('cash-ledger-tbody');
    const pInfo = document.getElementById('cash-pagination-info');
    const pBtns = document.getElementById('cash-pagination-buttons');
    if (!tbody) return;

    const total = this.filteredCashList.length;
    let paged = this.filteredCashList;
    let startIdx = 0;
    let endIdx = total;

    if (this.cashPageSize !== 'ALL') {
      const size = Number(this.cashPageSize);
      const totalPages = Math.ceil(total / size) || 1;
      if (this.cashCurrentPage > totalPages) this.cashCurrentPage = totalPages;
      if (this.cashCurrentPage < 1) this.cashCurrentPage = 1;
      startIdx = (this.cashCurrentPage - 1) * size;
      endIdx = Math.min(startIdx + size, total);
      paged = this.filteredCashList.slice(startIdx, endIdx);
    }

    if (pInfo) {
      pInfo.innerText = total === 0 ? 'No cash ledger entries found' : `Showing ${startIdx + 1}-${endIdx} of ${total} entries`;
    }

    // Pagination buttons
    if (pBtns) {
      if (this.cashPageSize === 'ALL' || total <= Number(this.cashPageSize)) {
        pBtns.innerHTML = '';
      } else {
        const size = Number(this.cashPageSize);
        const totalPages = Math.ceil(total / size);
        pBtns.innerHTML = `
          <button class="btn btn-outline-secondary btn-sm ${this.cashCurrentPage <= 1 ? 'disabled' : ''}" onclick="LedgerModule.changeCashPage(${this.cashCurrentPage - 1})"><i class="bi bi-chevron-left"></i></button>
          <button class="btn btn-outline-secondary btn-sm active">${this.cashCurrentPage} / ${totalPages}</button>
          <button class="btn btn-outline-secondary btn-sm ${this.cashCurrentPage >= totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeCashPage(${this.cashCurrentPage + 1})"><i class="bi bi-chevron-right"></i></button>
        `;
      }
    }

    if (paged.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No records match your filter</td></tr>`;
      return;
    }

    // Date-wise Grouping (media_1791479872194.png)
    const groups = {};
    for (const r of paged) {
      const d = r.date || 'Unknown';
      if (!groups[d]) groups[d] = [];
      groups[d].push(r);
    }

    let html = '';
    for (const [dateStr, entries] of Object.entries(groups)) {
      html += `
        <tr class="cash-group-header-row">
          <td colspan="6"><span class="appsheet-bullet gray-bullet me-2">●</span><strong>${dateStr}</strong></td>
        </tr>
      `;
      for (const r of entries) {
        const recAmt = Number(r.amountReceived) || 0;
        const expAmt = Number(r.expense) || 0;
        const dbtAmt = Number(r.debt) || 0;
        const cashAmt = Number(r.availableCash) || 0;

        html += `
          <tr class="appsheet-row" onclick="LedgerModule.openCashDetailsModal('${r.date}')" style="cursor: pointer;">
            <td><span class="appsheet-bullet gray-bullet me-1">●</span> ₹ ${this.formatINR(recAmt)}</td>
            <td><span class="appsheet-bullet gray-bullet me-1">●</span> ₹ ${this.formatINR(expAmt)}</td>
            <td><span class="appsheet-bullet gray-bullet me-1">●</span> ₹ ${this.formatINR(dbtAmt)}</td>
            <td class="fw-bold"><span class="appsheet-bullet gray-bullet me-1">●</span> ₹ ${this.formatINR(cashAmt)}</td>
            <td><span class="appsheet-bullet gray-bullet me-1">●</span> ${r.date}</td>
            <td class="text-end text-muted"><i class="bi bi-chevron-right" style="font-size: 11px;"></i></td>
          </tr>
        `;
      }
    }
    tbody.innerHTML = html;
  },

  changeCashPageSize(sz) {
    this.cashPageSize = sz;
    this.cashCurrentPage = 1;
    this.renderCashLedgerTable();
  },

  changeCashPage(pg) {
    this.cashCurrentPage = pg;
    this.renderCashLedgerTable();
  },

  // ----------------------------------------------------
  // AUTHENTIC CASH LEDGER DETAILS MODAL (media_1791479872225.jpg)
  // ----------------------------------------------------
  openCashDetailsModal(dateStr) {
    const origDateInput = document.getElementById('cash-details-orig-date');
    const dateInput = document.getElementById('cash-details-date');
    const prevCashInput = document.getElementById('cash-details-prev-cash');
    const recInput = document.getElementById('cash-details-received');
    const debtInput = document.getElementById('cash-details-debt');
    const expInput = document.getElementById('cash-details-expense');
    const availCashInput = document.getElementById('cash-details-avail-cash');

    let record = null;
    if (dateStr) {
      const slash = this.parseDateToSlash(dateStr);
      record = this.allCashLedger.find(r => r.date === dateStr || r.date === slash);
    }

    if (record) {
      this.activeCashDetailsRecord = record;
      if (origDateInput) origDateInput.value = record.date;
      if (dateInput) dateInput.value = this.formatDateToDash(record.date);

      const prevCash = record.previousDayAvailableCash !== undefined
        ? Number(record.previousDayAvailableCash)
        : this.lookupPreviousDayCash(record.date);

      const rec = Number(record.amountReceived) || 0;
      const debt = Number(record.debt) || 0;
      const exp = Number(record.expense) || 0;
      const avail = Number(record.availableCash) || (prevCash + rec - debt - exp);

      if (prevCashInput) prevCashInput.value = `₹ ${this.formatINR(prevCash)}`;
      if (recInput) recInput.value = `₹ ${this.formatINR(rec)}`;
      if (debtInput) debtInput.value = `₹ ${this.formatINR(debt)}`;
      if (expInput) expInput.value = `₹ ${this.formatINR(exp)}`;
      if (availCashInput) availCashInput.value = `₹ ${this.formatINR(avail)}`;
    } else {
      this.activeCashDetailsRecord = null;
      const defaultDate = dateStr ? this.formatDateToDash(dateStr) : '08-10-2026';
      if (origDateInput) origDateInput.value = '';
      if (dateInput) dateInput.value = defaultDate;

      const prevCash = this.lookupPreviousDayCash(defaultDate);

      if (prevCashInput) prevCashInput.value = `₹ ${this.formatINR(prevCash)}`;
      if (recInput) recInput.value = `₹ 0.00`;
      if (debtInput) debtInput.value = `₹ 0.00`;
      if (expInput) expInput.value = `₹ 0.00`;
      if (availCashInput) availCashInput.value = `₹ ${this.formatINR(prevCash)}`;
    }

    // Sync hidden date picker
    const pickerInput = document.getElementById('cash-details-date-picker');
    if (pickerInput && dateInput && dateInput.value) {
      pickerInput.value = this.parseDateToISO(dateInput.value);
    }

    const modalEl = document.getElementById('modal-cash-ledger-details');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  closeCashDetailsModal() {
    const modalEl = document.getElementById('modal-cash-ledger-details');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }
  },

  onCashDateChange(val) {
    if (!val) return;
    const prevCash = this.lookupPreviousDayCash(val);
    const prevCashInput = document.getElementById('cash-details-prev-cash');
    if (prevCashInput) prevCashInput.value = `₹ ${this.formatINR(prevCash)}`;
    this.recalculateCashDetailsLive();

    const pickerInput = document.getElementById('cash-details-date-picker');
    if (pickerInput) pickerInput.value = this.parseDateToISO(val);
  },

  onCashDatePickerChange(pickerVal) {
    if (!pickerVal) return;
    const dash = this.formatDateToDash(pickerVal);
    const dateInput = document.getElementById('cash-details-date');
    if (dateInput) dateInput.value = dash;
    this.onCashDateChange(dash);
  },

  onCashFieldInput() {
    this.recalculateCashDetailsLive();
  },

  cleanCashFieldOnFocus(el) {
    if (!el) return;
    const num = this.parseCashNumber(el.value);
    el.value = num === 0 ? '' : String(num);
  },

  formatCashFieldOnBlur(el) {
    if (!el) return;
    const num = this.parseCashNumber(el.value);
    el.value = `₹ ${this.formatINR(num)}`;
    this.recalculateCashDetailsLive();
  },

  recalculateCashDetailsLive() {
    const prevVal = this.parseCashNumber(document.getElementById('cash-details-prev-cash')?.value);
    const recVal = this.parseCashNumber(document.getElementById('cash-details-received')?.value);
    const debtVal = this.parseCashNumber(document.getElementById('cash-details-debt')?.value);
    const expVal = this.parseCashNumber(document.getElementById('cash-details-expense')?.value);

    const calculatedAvail = prevVal + recVal - debtVal - expVal;
    const availInput = document.getElementById('cash-details-avail-cash');
    if (availInput) {
      availInput.value = `₹ ${this.formatINR(calculatedAvail)}`;
    }
    return calculatedAvail;
  },

  async saveCashDetailsForm() {
    const dateVal = document.getElementById('cash-details-date')?.value?.trim();
    if (!dateVal) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter a valid date', 'warning');
      return;
    }

    const slashDate = this.parseDateToSlash(dateVal);
    const origDate = document.getElementById('cash-details-orig-date')?.value?.trim();

    const prevCash = this.parseCashNumber(document.getElementById('cash-details-prev-cash')?.value);
    const rec = this.parseCashNumber(document.getElementById('cash-details-received')?.value);
    const debt = this.parseCashNumber(document.getElementById('cash-details-debt')?.value);
    const exp = this.parseCashNumber(document.getElementById('cash-details-expense')?.value);
    const avail = prevCash + rec - debt - exp;

    const [d, m, y] = slashDate.split('/');
    const fy = (Number(m) >= 4) ? `${y}-${Number(y) + 1}` : `${Number(y) - 1}-${y}`;
    const months_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const displayDate = `${d} ${months_abbr[Number(m) - 1]} ${y}`;

    let record = origDate ? this.allCashLedger.find(r => r.date === origDate) : null;
    if (!record) {
      record = this.allCashLedger.find(r => r.date === slashDate);
    }

    if (record) {
      record.date = slashDate;
      record.previousDayAvailableCash = prevCash;
      record.amountReceived = rec;
      record.debt = debt;
      record.expense = exp;
      record.availableCash = avail;
      record.fy = fy;
      record.monthKey = `${y}-${m}`;
      record.displayDate = displayDate;

      if (typeof dbService !== 'undefined') {
        try {
          await dbService.update('cashLedger', record.id || record.date, record);
        } catch (_) {}
      }
    } else {
      const newEntry = {
        date: slashDate,
        amountReceived: rec,
        expense: exp,
        debt: debt,
        availableCash: avail,
        previousDayAvailableCash: prevCash,
        fy,
        monthKey: `${y}-${m}`,
        displayDate
      };

      if (typeof dbService !== 'undefined') {
        try {
          await dbService.add('cashLedger', newEntry);
        } catch (_) {}
      }
      this.allCashLedger.unshift(newEntry);
    }

    this.applyCashFilters();
    this.renderCashLedgerTable();
    this.closeCashDetailsModal();

    if (typeof AppUI !== 'undefined') {
      AppUI.showToast(`Cash ledger details saved for ${slashDate}!`, 'success');
    }
  },

  // Backward-compatible Add Cash Modal & Day Breakdown
  openAddCashModal() {
    this.openCashDetailsModal();
  },

  updateCashPreview() {
    const rec = Number(document.getElementById('cash-form-received')?.value) || 0;
    const exp = Number(document.getElementById('cash-form-expense')?.value) || 0;
    const dbt = Number(document.getElementById('cash-form-debt')?.value) || 0;
    const prevInput = document.getElementById('cash-form-preview');

    const latestCash = (this.allCashLedger && this.allCashLedger.length > 0)
      ? Number(this.allCashLedger[0].availableCash) || 0
      : 0;
    const projected = latestCash + rec - exp - dbt;
    if (prevInput) {
      prevInput.value = `₹ ${this.formatINR(projected)}`;
    }
  },

  async saveCashEntry(e) {
    if (e && e.preventDefault) e.preventDefault();
    const dateVal = document.getElementById('cash-form-date')?.value;
    if (!dateVal) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please select a date', 'danger');
      return;
    }
    const [y, m, d] = dateVal.split('-');
    const formattedDate = `${d}/${m}/${y}`;
    const rec = Number(document.getElementById('cash-form-received')?.value) || 0;
    const exp = Number(document.getElementById('cash-form-expense')?.value) || 0;
    const dbt = Number(document.getElementById('cash-form-debt')?.value) || 0;
    const desc = document.getElementById('cash-form-desc')?.value || '';

    const latestCash = (this.allCashLedger && this.allCashLedger.length > 0)
      ? Number(this.allCashLedger[0].availableCash) || 0
      : 0;
    const newCash = latestCash + rec - exp - dbt;
    const fy = (Number(m) >= 4) ? `${y}-${Number(y)+1}` : `${Number(y)-1}-${y}`;
    const months_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const displayDate = `${d} ${months_abbr[Number(m)-1]} ${y}`;

    const newEntry = {
      date: formattedDate,
      amountReceived: rec,
      expense: exp,
      debt: dbt,
      availableCash: newCash,
      previousDayAvailableCash: latestCash,
      fy,
      monthKey: `${y}-${m}`,
      displayDate,
      description: desc
    };

    await dbService.add('cashLedger', newEntry);
    this.allCashLedger.unshift(newEntry);
    this.applyCashFilters();
    this.renderCashLedgerTable();

    const modalEl = document.getElementById('modal-add-cash');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }
    if (typeof AppUI !== 'undefined') AppUI.showToast(`Cash entry saved for ${formattedDate}`, 'success');
  },

  openCashDayBreakdown(date) {
    this.activeCashBreakdownDate = date;
    const record = this.allCashLedger.find(r => r.date === date);
    if (!record) return;

    const titleEl = document.getElementById('cash-breakdown-title');
    const bodyEl = document.getElementById('cash-breakdown-body');

    if (titleEl) {
      titleEl.innerHTML = `<i class="bi bi-calendar3 me-2"></i> Cash Summary: ${record.date}`;
    }

    const rec = Number(record.amountReceived) || 0;
    const exp = Number(record.expense) || 0;
    const dbt = Number(record.debt) || 0;
    const cash = Number(record.availableCash) || 0;
    const net = rec - exp - dbt;

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="p-3 bg-light rounded border mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted small fw-semibold">Financial Year:</span>
            <span class="badge bg-secondary">${record.fy || 'N/A'}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-muted small">Date:</span>
            <span class="fw-bold text-dark">${record.date} (${record.displayDate || ''})</span>
          </div>
        </div>

        <div class="list-group list-group-flush mb-3">
          <div class="list-group-item d-flex justify-content-between align-items-center px-2 py-2">
            <span><span class="appsheet-bullet green-bullet me-2">●</span>(+) Amount Received</span>
            <span class="font-monospace fw-bold text-success">₹ ${this.formatINR(rec)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center px-2 py-2">
            <span><span class="appsheet-bullet gold-bullet me-2">●</span>(-) Expense</span>
            <span class="font-monospace fw-bold text-danger">₹ ${this.formatINR(exp)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center px-2 py-2">
            <span><span class="appsheet-bullet gold-bullet me-2">●</span>(-) Debt (Advances/Payouts)</span>
            <span class="font-monospace fw-bold text-dark">₹ ${this.formatINR(dbt)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center px-2 py-2 bg-light">
            <span class="fw-semibold">Net Day Flow</span>
            <span class="font-monospace fw-bold ${net >= 0 ? 'text-success' : 'text-danger'}">${net >= 0 ? '+' : ''}₹ ${this.formatINR(net)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center px-2 py-2 mt-2 border rounded" style="background: #fbf2dc;">
            <span class="fw-bold" style="color: #7a5f1e;">Available Cash Closing Balance</span>
            <span class="font-monospace fw-bold fs-6" style="color: #7a5f1e;">₹ ${this.formatINR(cash)}</span>
          </div>
        </div>
      `;
    }

    const modalEl = document.getElementById('modal-cash-day-breakdown');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  shareCashDayWhatsApp() {
    if (!this.activeCashBreakdownDate) return;
    const r = this.allCashLedger.find(item => item.date === this.activeCashBreakdownDate);
    if (!r) return;

    const msg = `*MTC & TTC Cash Register Summary*\n` +
      `Date: ${r.date}\n` +
      `FY: ${r.fy}\n` +
      `Received: ₹ ${this.formatINR(r.amountReceived)}\n` +
      `Expense: ₹ ${this.formatINR(r.expense)}\n` +
      `Debt: ₹ ${this.formatINR(r.debt)}\n` +
      `Available Cash: ₹ ${this.formatINR(r.availableCash)}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  // ----------------------------------------------------
  // RETURNED AMOUNT (Authentic AppSheet Green Master-Detail)
  // ----------------------------------------------------
  applyReturnedFilters() {
    if (!this.allReturnedAmounts || !Array.isArray(this.allReturnedAmounts)) {
      this.filteredReturnedList = [];
      this.renderReturnedAmountTable();
      return;
    }

    const query = (this.searchQuery || '').trim().toLowerCase();

    this.filteredReturnedList = this.allReturnedAmounts.filter(item => {
      // Financial Year Filter
      if (this.selectedReturnedFY !== 'ALL') {
        if (item.fy !== this.selectedReturnedFY) return false;
      }

      // Month Filter
      if (this.selectedReturnedMonth !== 'ALL') {
        if (item.monthKey !== this.selectedReturnedMonth) return false;
      }

      // Search Query Filter
      if (query) {
        const match =
          (item.truckNo && item.truckNo.toLowerCase().includes(query)) ||
          (item.returnMode && item.returnMode.toLowerCase().includes(query)) ||
          (item.debtType && item.debtType.toLowerCase().includes(query)) ||
          (item.grNo && item.grNo.toLowerCase().includes(query)) ||
          (item.company && item.company.toLowerCase().includes(query)) ||
          (item.depositorName && item.depositorName.toLowerCase().includes(query)) ||
          (item.truckOwnerName && item.truckOwnerName.toLowerCase().includes(query)) ||
          (item.borrowerName && item.borrowerName.toLowerCase().includes(query)) ||
          (item.receiverName && item.receiverName.toLowerCase().includes(query)) ||
          (item.from && item.from.toLowerCase().includes(query)) ||
          (item.to && item.to.toLowerCase().includes(query)) ||
          (item.debtMode && item.debtMode.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.displayReturnDate && item.displayReturnDate.toLowerCase().includes(query)) ||
          (item.displayDebtDate && item.displayDebtDate.toLowerCase().includes(query)) ||
          (item.returnedAmount && item.returnedAmount.toString().includes(query)) ||
          (item.debtAmount && item.debtAmount.toString().includes(query));
        if (!match) return false;
      }

      return true;
    });

    // Update breadcrumb badge
    const badge = document.getElementById('returned-current-filter-badge');
    if (badge) {
      if (this.selectedReturnedFY === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>All Financial Years (${this.filteredReturnedList.length} records)`;
      } else if (this.selectedReturnedMonth === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedReturnedFY} &gt; <strong>All Months</strong>`;
      } else {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedReturnedFY} &gt; <strong>${this.selectedReturnedMonth}</strong>`;
      }
    }

    this.returnedCurrentPage = 1;
    this.renderReturnedTreeSidebar();
    this.renderReturnedAmountTable();
  },

  renderReturnedTreeSidebar() {
    if (!this.allReturnedAmounts) return;

    // Calculate totals across dataset
    let grandTotal = 0;
    const fyTotals = {};
    const monthTotals = {}; // key: `${fy}_${monthKey}`

    this.allReturnedAmounts.forEach(r => {
      const amt = Number(r.returnedAmount) || 0;
      grandTotal += amt;

      const fy = r.fy || 'empty';
      fyTotals[fy] = (fyTotals[fy] || 0) + amt;

      if (r.monthKey) {
        const mKey = `${fy}_${r.monthKey}`;
        monthTotals[mKey] = (monthTotals[mKey] || 0) + amt;
      }
    });

    // Update badges
    const badgeAll = document.getElementById('returned-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR(grandTotal)}`;

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const b = document.getElementById(`returned-badge-${fy}`);
      if (b) b.textContent = `₹ ${this.formatINR(fyTotals[fy] || 0)}`;
    });

    // Active state highlighting on All & FY items
    const treeAll = document.getElementById('returned-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedReturnedFY === 'ALL');
    }

    // Authentic AppSheet month lists
    const monthsByFY = {
      '2026-2027': ['7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'],
      '2025-2026': ['12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'],
      '2024-2025': ['12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr']
    };

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const isExpanded = this.expandedReturnedFYs.has(fy);
      const sublistEl = document.getElementById(`returned-sublist-${fy}`);
      const fyItemEl = document.getElementById(`returned-tree-${fy}`);

      if (fyItemEl) {
        fyItemEl.classList.toggle('active', this.selectedReturnedFY === fy && this.selectedReturnedMonth === 'ALL');
        const caret = fyItemEl.querySelector('.returned-tree-caret');
        if (caret) {
          caret.innerHTML = isExpanded ? '<i class="bi bi-caret-down-fill"></i>' : '<i class="bi bi-caret-right-fill"></i>';
        }
      }

      if (sublistEl) {
        if (!isExpanded) {
          sublistEl.classList.add('d-none');
          sublistEl.innerHTML = '';
        } else {
          sublistEl.classList.remove('d-none');
          const months = monthsByFY[fy] || [];
          sublistEl.innerHTML = months.map(mKey => {
            const mTotal = monthTotals[`${fy}_${mKey}`] || 0;
            const isMonthActive = this.selectedReturnedFY === fy && this.selectedReturnedMonth === mKey;
            return `
              <div class="returned-tree-item returned-tree-subitem ${isMonthActive ? 'active' : ''}" onclick="LedgerModule.selectReturnedMonth('${fy}', '${mKey}')">
                <div class="d-flex align-items-center gap-1">
                  <span class="appsheet-bullet text-muted" style="font-size: 11px;">●</span>
                  <span>${mKey}</span>
                </div>
                <span class="returned-tree-badge">₹ ${this.formatINR(mTotal)}</span>
              </div>
            `;
          }).join('');
        }
      }
    });
  },

  toggleReturnedFYTree(fy) {
    if (this.expandedReturnedFYs.has(fy)) {
      this.expandedReturnedFYs.delete(fy);
    } else {
      this.expandedReturnedFYs.add(fy);
    }
    this.renderReturnedTreeSidebar();
  },

  selectReturnedFY(fy) {
    this.selectedReturnedFY = fy;
    this.selectedReturnedMonth = 'ALL';
    this.expandedReturnedFYs.add(fy);
    this.applyReturnedFilters();
  },

  selectReturnedMonth(fy, month) {
    this.selectedReturnedFY = fy;
    this.selectedReturnedMonth = month;
    this.expandedReturnedFYs.add(fy);
    this.applyReturnedFilters();
  },

  selectReturnedAll() {
    this.selectedReturnedFY = 'ALL';
    this.selectedReturnedMonth = 'ALL';
    this.applyReturnedFilters();
  },

  toggleReturnedDateSidebar() {
    this.isReturnedSidebarHidden = !this.isReturnedSidebarHidden;
    const sidebar = document.getElementById('returned-tree-sidebar');
    const btnText = document.getElementById('btn-toggle-returned-text');
    const btnIcon = document.getElementById('btn-toggle-returned-icon');

    if (sidebar) {
      if (this.isReturnedSidebarHidden) {
        sidebar.classList.add('collapsed');
        if (btnText) btnText.textContent = 'Show Date Filter';
        if (btnIcon) btnIcon.className = 'bi bi-layout-sidebar';
      } else {
        sidebar.classList.remove('collapsed');
        if (btnText) btnText.textContent = 'Hide Date Filter';
        if (btnIcon) btnIcon.className = 'bi bi-layout-sidebar-inset';
      }
    }
  },

  renderReturnedAmountTable() {
    const tbody = document.getElementById('returned-amount-tbody');
    if (!tbody) return;

    if (!this.filteredReturnedList || this.filteredReturnedList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No returned amount records match the selected filter or search criteria.
            <div class="mt-2">
              <button type="button" class="btn btn-sm btn-outline-success" onclick="LedgerModule.selectReturnedAll(); LedgerModule.clearSearch();">
                Reset Filters & Search
              </button>
            </div>
          </td>
        </tr>
      `;
      const pInfo = document.getElementById('returned-pagination-info');
      if (pInfo) pInfo.textContent = 'Showing 0 records';
      const pBtns = document.getElementById('returned-pagination-buttons');
      if (pBtns) pBtns.innerHTML = '';
      return;
    }

    // Pagination Calculation
    const totalCount = this.filteredReturnedList.length;
    let recordsToDisplay = this.filteredReturnedList;
    let totalPages = 1;

    if (this.returnedPageSize !== 'ALL') {
      const pSize = parseInt(this.returnedPageSize, 10);
      totalPages = Math.max(1, Math.ceil(totalCount / pSize));
      if (this.returnedCurrentPage > totalPages) this.returnedCurrentPage = totalPages;
      if (this.returnedCurrentPage < 1) this.returnedCurrentPage = 1;

      const startIndex = (this.returnedCurrentPage - 1) * pSize;
      const endIndex = Math.min(startIndex + pSize, totalCount);
      recordsToDisplay = this.filteredReturnedList.slice(startIndex, endIndex);

      const pInfo = document.getElementById('returned-pagination-info');
      if (pInfo) pInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalCount} entries`;
    } else {
      const pInfo = document.getElementById('returned-pagination-info');
      if (pInfo) pInfo.textContent = `Showing all ${totalCount} entries`;
    }

    // Pagination Buttons
    const pBtns = document.getElementById('returned-pagination-buttons');
    if (pBtns) {
      if (this.returnedPageSize === 'ALL' || totalPages <= 1) {
        pBtns.innerHTML = '';
      } else {
        let btnsHtml = `
          <button type="button" class="btn btn-outline-secondary ${this.returnedCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeReturnedPage(${this.returnedCurrentPage - 1})">Prev</button>
        `;
        const startP = Math.max(1, this.returnedCurrentPage - 2);
        const endP = Math.min(totalPages, this.returnedCurrentPage + 2);
        for (let p = startP; p <= endP; p++) {
          btnsHtml += `
            <button type="button" class="btn ${p === this.returnedCurrentPage ? 'btn-success text-white' : 'btn-outline-secondary'}" onclick="LedgerModule.changeReturnedPage(${p})">${p}</button>
          `;
        }
        btnsHtml += `
          <button type="button" class="btn btn-outline-secondary ${this.returnedCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeReturnedPage(${this.returnedCurrentPage + 1})">Next</button>
        `;
        pBtns.innerHTML = btnsHtml;
      }
    }

    // Grouping by Return Date (displayReturnDate)
    const grouped = new Map();
    recordsToDisplay.forEach(item => {
      const dKey = item.displayReturnDate || item.returnDate || 'Other';
      if (!grouped.has(dKey)) {
        grouped.set(dKey, []);
      }
      grouped.get(dKey).push(item);
    });

    let html = '';
    grouped.forEach((items, dateKey) => {
      const groupSum = items.reduce((acc, x) => acc + (Number(x.returnedAmount) || 0), 0);

      // Authentic AppSheet Group Header (● DD/MM/YYYY ₹ Total)
      html += `
        <tr class="returned-date-group-row">
          <td colspan="12">
            <span class="appsheet-bullet green-bullet">●</span>
            <span class="fw-bold me-3" style="color: #202124;">${dateKey}</span>
            <span class="fw-bold text-success" style="font-size: 13px;">₹ ${this.formatINR(groupSum)}</span>
          </td>
        </tr>
      `;

      // Data Rows
      items.forEach(r => {
        const isSelected = this.activeReturnedRecordId === r.id;
        html += `
          <tr class="returned-data-row ${isSelected ? 'active' : ''}" id="ret-row-${r.id}" onclick="LedgerModule.openSettledDebtDetails('${r.id}')">
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.returnMode || '-'}</span>
            </td>
            <td class="fw-semibold">${r.truckNo || '-'}</td>
            <td>${r.displayReturnDate || r.returnDate || '-'}</td>
            <td class="text-end fw-bold text-success">₹ ${this.formatINR(r.returnedAmount)}</td>
            <td>${r.displayDebtDate || r.debtDate || '-'}</td>
            <td class="text-end fw-semibold">₹ ${this.formatINR(r.debtAmount)}</td>
            
            <!-- Full table columns (hidden in split view) -->
            <td class="col-ext">${r.debtType || '-'}</td>
            <td class="col-ext">${r.grNo || '-'}</td>
            <td class="col-ext">${r.company || '-'}</td>
            <td class="col-ext text-truncate" style="max-width: 170px;" title="${r.depositorName || ''}">${r.depositorName || '-'}</td>
            <td class="col-ext text-truncate" style="max-width: 190px;" title="${r.description || ''}">${r.description || '-'}</td>
            <td class="text-center text-muted" style="font-size: 11px;"><i class="bi bi-chevron-right"></i></td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  openSettledDebtDetails(recordId) {
    this.activeReturnedRecordId = recordId;
    const r = (this.allReturnedAmounts || []).find(x => x.id === recordId);
    if (!r) return;

    // Highlight row in table
    const allRows = document.querySelectorAll('.returned-data-row');
    allRows.forEach(row => row.classList.remove('active'));
    const targetRow = document.getElementById(`ret-row-${recordId}`);
    if (targetRow) targetRow.classList.add('active');

    // Show side panel and activate split-open mode
    const panel = document.getElementById('panel-settled-debt-details');
    const splitWrapper = document.querySelector('.returned-split-wrapper');
    if (panel) panel.classList.remove('d-none');
    if (splitWrapper) splitWrapper.classList.add('split-open');

    const content = document.getElementById('settled-debt-panel-content');
    if (!content) return;

    const receipts = (r.receipts && Array.isArray(r.receipts)) ? r.receipts : [
      {
        returnDate: r.displayReturnDate || r.returnDate,
        depositorName: r.depositorName || '-',
        returnMode: r.returnMode || '-',
        amount: r.returnedAmount || 0
      }
    ];

    content.innerHTML = `
      <!-- CARD 1: Debt Information (Matching WhatsApp Photo exactly) -->
      <div class="settled-card">
        <div class="settled-field-row">
          <span class="settled-field-label">Debt Type</span>
          <span class="settled-field-value">
            <span class="appsheet-bullet green-bullet">●</span>
            ${r.debtType || '-'}
          </span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Date</span>
          <span class="settled-field-value">${r.displayDebtDate || r.debtDate || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Truck Owner Name</span>
          <span class="settled-field-value">${r.truckOwnerName || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">G.R.No.</span>
          <span class="settled-field-value">${r.grNo || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Company Name</span>
          <span class="settled-field-value">${r.company || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">From</span>
          <span class="settled-field-value">${r.from || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">To</span>
          <span class="settled-field-value">${r.to || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Borrower Name</span>
          <span class="settled-field-value">${r.borrowerName || '-'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Receiver Name</span>
          <span class="settled-field-value">${r.receiverName || '-'}</span>
        </div>

        <div class="settled-card-divider"></div>

        <div class="settled-field-row">
          <span class="settled-field-label">Debt Mode</span>
          <span class="settled-field-value">${r.debtMode || 'Cash'}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Debt Amount</span>
          <span class="settled-field-value">₹ ${this.formatINR(r.debtAmount)}</span>
        </div>
        <div class="settled-field-row">
          <span class="settled-field-label">Total Returned Amount</span>
          <span class="settled-field-value" style="color: #137333; font-weight: 700;">₹ ${this.formatINR(r.returnedAmount)}</span>
        </div>
      </div>

      <!-- CARD 2: Returned Amount [count] (Matching WhatsApp Photo exactly) -->
      <div class="settled-card">
        <div class="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
          <span class="fw-bold text-dark" style="font-size: 13.5px;">Returned Amount ${receipts.length}</span>
          <span class="badge bg-success bg-opacity-10 text-success fw-normal" style="font-size: 11px;">Settled</span>
        </div>
        <div class="table-responsive">
          <table class="returned-mini-table">
            <thead>
              <tr>
                <th>Return Date</th>
                <th>Depositor Name</th>
                <th>Return Mode</th>
                <th class="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${receipts.map(rec => `
                <tr>
                  <td>${rec.returnDate || '-'}</td>
                  <td class="text-truncate" style="max-width: 130px;" title="${rec.depositorName || ''}">${rec.depositorName || '-'}</td>
                  <td>${rec.returnMode || '-'}</td>
                  <td class="text-end fw-bold">₹ ${this.formatINR(rec.amount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="mt-3 pt-2 border-top d-flex align-items-center justify-content-between">
          <small class="text-muted" style="font-size: 11px;">Truck: <strong class="text-dark">${r.truckNo || '-'}</strong></small>
          <button type="button" class="btn btn-sm btn-outline-success py-1 px-3 d-inline-flex align-items-center gap-1" style="font-size: 12px; border-radius: 4px;" onclick="LedgerModule.expandReturnedReceipt('${r.id}')">
            <span>Expand</span>
            <i class="bi bi-box-arrow-up-right" style="font-size: 11px;"></i>
          </button>
        </div>
      </div>
    `;
  },

  closeSettledDebtDetails() {
    this.activeReturnedRecordId = null;
    const panel = document.getElementById('panel-settled-debt-details');
    const splitWrapper = document.querySelector('.returned-split-wrapper');
    if (panel) {
      panel.classList.add('d-none');
      panel.classList.remove('fullscreen');
    }
    if (splitWrapper) splitWrapper.classList.remove('split-open');

    this.isSettledPanelFullscreen = false;
    const btnExpand = document.getElementById('btn-expand-settled-panel');
    if (btnExpand) btnExpand.textContent = '↗';

    const allRows = document.querySelectorAll('.returned-data-row');
    allRows.forEach(row => row.classList.remove('active'));
  },

  toggleSettledDebtFullscreen() {
    this.isSettledPanelFullscreen = !this.isSettledPanelFullscreen;
    const panel = document.getElementById('panel-settled-debt-details');
    const btnExpand = document.getElementById('btn-expand-settled-panel');
    if (panel) {
      panel.classList.toggle('fullscreen', this.isSettledPanelFullscreen);
    }
    if (btnExpand) {
      btnExpand.textContent = this.isSettledPanelFullscreen ? '↙' : '↗';
    }
  },

  toggleReturnedFullscreen() {
    const el = document.getElementById('ledger-view-returned-amount');
    if (!el) return;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  changeReturnedPageSize(size) {
    this.returnedPageSize = size;
    this.returnedCurrentPage = 1;
    this.renderReturnedAmountTable();
  },

  changeReturnedPage(page) {
    this.returnedCurrentPage = page;
    this.renderReturnedAmountTable();
    const tableWrap = document.getElementById('returned-table-wrapper');
    if (tableWrap) tableWrap.scrollTop = 0;
  },

  expandReturnedReceipt(recordId) {
    const r = (this.allReturnedAmounts || []).find(x => x.id === recordId);
    if (!r) return;

    const receipts = (r.receipts && Array.isArray(r.receipts)) ? r.receipts : [
      {
        returnDate: r.displayReturnDate || r.returnDate,
        depositorName: r.depositorName || '-',
        returnMode: r.returnMode || '-',
        amount: r.returnedAmount || 0
      }
    ];

    const receiptRows = receipts.map((rec, i) =>
      `• Receipt #${i + 1}: ₹ ${this.formatINR(rec.amount)} via ${rec.returnMode} on ${rec.returnDate} (${rec.depositorName})`
    ).join('\n');

    const msg = `*MTC & TTC Transport - Settled Debt Receipt*\n` +
      `----------------------------------------\n` +
      `G.R. No.: ${r.grNo || '-'}\n` +
      `Truck No.: ${r.truckNo || '-'}\n` +
      `Owner: ${r.truckOwnerName || '-'}\n` +
      `Company: ${r.company || '-'}\n` +
      `From: ${r.from || '-'} To: ${r.to || '-'}\n` +
      `Debt Date: ${r.displayDebtDate || r.debtDate || '-'}\n` +
      `Debt Amount: ₹ ${this.formatINR(r.debtAmount)}\n` +
      `Total Returned: ₹ ${this.formatINR(r.returnedAmount)} (SETTLED)\n` +
      `----------------------------------------\n` +
      `Receipt Details:\n${receiptRows}\n`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg).then(() => {
        alert('Receipt details copied to clipboard!\nYou can paste and share via WhatsApp or SMS.');
      }).catch(() => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
      });
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  },

  // ----------------------------------------------------
  // DRILLDOWN ROUTING & NAVIGATION (Debts Register)
  // ----------------------------------------------------
  goToYearView() {
    this.mainViewMode = 'debts';
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
    this.mainViewMode = 'debts';
    this.viewLevel = 'month';
    this.selectedFY = fy;
    this.selectedMonth = 'ALL';
    this.applyFilters();
    this.renderCurrentView();
  },

  goToTableView(monthKey) {
    this.mainViewMode = 'debts';
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
    // ⊞ icon clicked: toggles between 8-Card Dashboard and Table/Register view
    if (this.mainViewMode === 'dashboard') {
      this.goToCashLedgerView();
    } else {
      this.goToDashboardView();
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
  // MAIN VIEW RENDERER (AppSheet Dashboard, Cash Ledger, Debts & Details)
  // ----------------------------------------------------
  renderCurrentView() {
    const dashView = document.getElementById('ledger-view-dashboard');
    const cashRegView = document.getElementById('ledger-view-cash-register');
    const retView = document.getElementById('ledger-view-returned-amount');
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
    const breadcrumbRoot = document.getElementById('appsheet-breadcrumb');

    // 1. STATEMENTS TAB
    if (this.currentTab === 'statements') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      retView?.classList.add('d-none');
      regView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.remove('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Statements</span>
        `;
      }
      this.onCategoryChange();
      return;
    }

    stmtView?.classList.add('d-none');

    // 2. 3-CARD DETAILS VIEW
    if (this.viewLevel === 'details') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      retView?.classList.add('d-none');
      regView?.classList.add('d-none');
      detView?.classList.remove('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Open Debt Details</span>
        `;
      }
      if (this.currentDebtId) {
        this.populateDebtDetailsCard(this.currentDebtId);
      }
      return;
    }

    detView?.classList.add('d-none');

    // 3. LEVEL 0: 8-CARD MULTI-DASHBOARD GRID
    if (this.mainViewMode === 'dashboard') {
      dashView?.classList.remove('d-none');
      cashRegView?.classList.add('d-none');
      retView?.classList.add('d-none');
      regView?.classList.add('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <span class="active">Ledger</span>
        `;
      }
      return;
    }

    // Update top subheader Add button text
    const addBtnText = document.getElementById('btn-top-add-text');
    if (addBtnText) {
      addBtnText.innerText = (this.mainViewMode === 'cash-ledger') ? '+ Add' : '+ Add Debt';
    }

    // 4. LEVEL 1: CASH LEDGER REGISTER VIEW
    if (this.mainViewMode === 'cash-ledger') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.remove('d-none');
      retView?.classList.add('d-none');
      regView?.classList.add('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Cash Ledger</span>
        `;
      }
      this.renderCashTreeSidebar();
      this.renderCashLedgerTable();
      return;
    }

    // 4B. LEVEL 1: RETURNED AMOUNT VIEW (Authentic AppSheet Green Master-Detail)
    if (this.mainViewMode === 'returned-amount') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      regView?.classList.add('d-none');
      retView?.classList.remove('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Returned Amount</span>
        `;
      }
      this.renderReturnedTreeSidebar();
      this.renderReturnedAmountTable();
      if (this.activeReturnedRecordId) {
        this.openSettledDebtDetails(this.activeReturnedRecordId);
      } else {
        this.closeSettledDebtDetails();
      }
      return;
    }

    // 5. LEVEL 1-3: DEBTS REGISTER VIEWS
    dashView?.classList.add('d-none');
    cashRegView?.classList.add('d-none');
    retView?.classList.add('d-none');
    regView?.classList.remove('d-none');

    const tabName = this.currentTab === 'open' ? 'Open' : this.currentTab === 'all' ? 'All' : 'Settled';
    if (breadcrumbRoot) {
      breadcrumbRoot.innerHTML = `
        <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
        <span class="sep">&gt;</span>
        <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
        <span class="sep">&gt;</span>
        <span class="active">${tabName}</span>
      `;
    }

    // Update Card Header Title
    if (cardTitle) {
      cardTitle.innerText = tabName;
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
    if (this.mainViewMode === 'returned-amount') {
      this.returnedCurrentPage = 1;
      this.applyReturnedFilters();
      this.renderReturnedAmountTable();
      return;
    }
    if (this.mainViewMode === 'cash-ledger') {
      this.cashCurrentPage = 1;
      this.applyCashFilters();
      this.renderCashLedgerTable();
      return;
    }
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
    if (this.mainViewMode === 'returned-amount') {
      this.returnedCurrentPage = 1;
      this.applyReturnedFilters();
      this.renderReturnedAmountTable();
      return;
    }
    if (this.mainViewMode === 'cash-ledger') {
      this.cashCurrentPage = 1;
      this.applyCashFilters();
      this.renderCashLedgerTable();
      return;
    }
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
    if (tabName === 'statements') {
      this.mainViewMode = 'statements';
    } else {
      this.mainViewMode = 'debts';
      this.viewLevel = 'year';
      this.selectedFY = 'ALL';
    }

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
