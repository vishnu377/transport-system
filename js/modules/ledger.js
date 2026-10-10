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
  allDebts: (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_DEBTS_DATA)) ? window.SAMPLE_DEBTS_DATA : [],
  allParties: [],
  allOwners: [],
  allTrips: [],
  allPayments: [],
  allCashLedger: [],
  allReturnedAmounts: [],
  allCompanyExpenses: [],
  allReceivedPayments: [],

  // Main Mode State: 'dashboard' | 'cash-ledger' | 'returned-amount' | 'company-expense' | 'received' | 'debts' | 'details' | 'statements'
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

  // Company Expense State (Authentic AppSheet Gold Master-Detail)
  selectedCompanyFY: '2026-2027',
  selectedCompanyMonth: '7 Oct',
  expandedCompanyFYs: { '2026-2027': true, '2025-2026': false, '2024-2025': false },
  isCompanySidebarHidden: false,
  companyPageSize: 100,
  companyCurrentPage: 1,
  filteredCompanyList: [],
  activeCompanyExpenseId: null,
  isCompanyPanelFullscreen: false,
  modalExpenseType: 'Company',
  modalExpenseFrom: 'Cash',

  // Owner Expense State (Authentic AppSheet Pink Master-Detail)
  allOwnerExpenses: [],
  selectedOwnerFY: '2026-2027',
  selectedOwnerMonth: '7 Oct',
  selectedOwnerName: null,
  expandedOwnerFYs: { '2026-2027': true, '2025-2026': false, '2024-2025': false },
  isOwnerSidebarHidden: false,
  ownerPageSize: 100,
  ownerCurrentPage: 1,
  filteredOwnerList: [],
  activeOwnerExpenseId: null,
  isOwnerPanelFullscreen: false,
  isOwnerViewFullscreen: false,

  // Received Payments State (Authentic AppSheet Green Master-Detail)
  selectedReceivedFY: '2026-2027',
  selectedReceivedType: 'ALL',
  expandedReceivedFYs: { '2026-2027': true, '2025-2026': false, '2024-2025': false },
  isReceivedSidebarHidden: false,
  receivedPageSize: 100,
  receivedCurrentPage: 1,
  filteredReceivedList: [],
  activeReceivedPaymentId: null,
  isReceivedPanelFullscreen: false,
  modalIncomeStatus: 'Paid',
  modalIncomeMode: 'Cash',

  // Open Debts State (Authentic AppSheet Dual Pane Master-Detail)
  selectedOpenDebtsFY: '2026-2027',
  selectedOpenDebtsDate: null,
  expandedOpenDebtsFYs: {
    '2026-2027': true,
    '2025-2026': false,
    '2024-2025': false,
    '2023-2024': false,
    '2022-2023': false,
    '2021-2022': false,
    '2020-2021': false,
    '2019-2020': false
  },
  isOpenDebtsSidebarHidden: false,
  openDebtsPageSize: 100,
  openDebtsCurrentPage: 1,
  filteredOpenDebtsList: [],
  activeOpenDebtId: null,
  isOpenDebtsPanelFullscreen: false,
  modalReturnMode: 'Cash',

  // All Debts State (Authentic AppSheet Master-Detail Dual Pane)
  selectedAllDebtsFY: 'ALL',
  selectedAllDebtsDate: null,
  expandedAllDebtsFYs: {
    '2026-2027': true,
    '2025-2026': false,
    '2024-2025': false,
    '2023-2024': false,
    '2022-2023': false,
    '2021-2022': false,
    '2020-2021': false,
    '2019-2020': false
  },
  isAllDebtsSidebarHidden: false,
  allDebtsPageSize: 100,
  allDebtsCurrentPage: 1,
  filteredAllDebtsList: [],
  activeAllDebtId: null,
  isAllDebtsPanelFullscreen: false,

  // Settled Debts (Card 8) State
  selectedSettledFY: 'ALL',
  selectedSettledDate: null,
  selectedSettledMonth: 'ALL',
  expandedSettledFYs: {
    '2026-2027': true,
    '2025-2026': false,
    '2024-2025': false,
    '2023-2024': false,
    '2022-2023': false,
    '2021-2022': false,
    '2020-2021': false,
    '2019-2020': false
  },
  isSettledSidebarHidden: false,
  settledPageSize: 100,
  settledCurrentPage: 1,
  filteredSettledList: [],
  activeSettledDebtId: null,
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

    // Pre-check URL parameters immediately so the DOM reflects the requested view without delay
    const urlParams = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
    const viewParam = urlParams ? urlParams.get('view') : null;
    const fyParam = urlParams ? urlParams.get('fy') : null;
    const idParam = urlParams ? urlParams.get('id') : null;

    if (idParam && idParam.startsWith('OWN_EXP')) {
      this.goToOwnerExpenseView(fyParam || '2026-2027');
      this.openOwnerExpenseDetails(idParam);
    } else if (idParam && idParam.startsWith('DEBT_SETTLED_')) {
      this.goToSettledView(fyParam || 'ALL');
      this.openSettledDebtDetails(idParam);
    } else if (viewParam === 'settled' || viewParam === 'settled-debts') {
      this.goToSettledView(fyParam || 'ALL');
      if (idParam) this.openSettledDebtDetails(idParam);
    } else if (viewParam === 'all-debts') {
      this.goToAllDebtsView(fyParam || 'ALL');
      if (idParam) this.openAllDebtDetails(idParam);
    } else if (viewParam === 'open-debts') {
      this.goToOpenDebtsView(fyParam || '2026-2027');
      if (idParam) this.openOpenDebtDetails(idParam);
    } else if (viewParam === 'cash-ledger') {
      this.goToCashLedgerView(fyParam || '2026-2027');
    } else if (viewParam === 'returned') {
      this.goToReturnedAmountView(fyParam || '2026-2027');
      if (idParam && this.openReturnedAmountDetails) this.openReturnedAmountDetails(idParam);
    } else if (viewParam === 'company') {
      this.goToCompanyExpenseView(fyParam || '2026-2027');
      if (idParam) this.openCompanyExpenseDetails(idParam);
    } else if (viewParam === 'owner' || viewParam === 'owner-expense') {
      this.goToOwnerExpenseView(fyParam || '2026-2027');
      if (idParam) this.openOwnerExpenseDetails(idParam);
    } else if (viewParam === 'received') {
      this.goToReceivedView(fyParam || '2026-2027');
      if (idParam) this.openReceivedPaymentDetails(idParam);
    }

    await this.loadData();

    if (idParam && idParam.startsWith('OWN_EXP')) {
      this.goToOwnerExpenseView(fyParam || '2026-2027');
      this.openOwnerExpenseDetails(idParam);
      return;
    }
    if (idParam && idParam.startsWith('DEBT_SETTLED_')) {
      this.goToSettledView(fyParam || 'ALL');
      this.openSettledDebtDetails(idParam);
      const retParam = urlParams.get('openReturn');
      if (retParam) this.openSettledReturnDetails(retParam, idParam);
      return;
    }
    if (viewParam === 'settled' || viewParam === 'settled-debts') {
      this.goToSettledView(fyParam || 'ALL');
      if (idParam) this.openSettledDebtDetails(idParam);
      const retParam = urlParams.get('openReturn');
      if (retParam) this.openSettledReturnDetails(retParam, idParam);
      return;
    }
    if (viewParam === 'all-debts') {
      this.goToAllDebtsView(fyParam || 'ALL');
      if (idParam) this.openAllDebtDetails(idParam);
      return;
    } else if (viewParam === 'open-debts') {
      this.goToOpenDebtsView(fyParam || '2026-2027');
      if (idParam) this.openOpenDebtDetails(idParam);
      return;
    } else if (viewParam === 'cash-ledger') {
      return this.goToCashLedgerView(fyParam || '2026-2027');
    } else if (viewParam === 'returned') {
      this.goToReturnedAmountView(fyParam || '2026-2027');
      if (idParam) this.openReturnedAmountDetails ? this.openReturnedAmountDetails(idParam) : null;
      return;
    } else if (viewParam === 'company') {
      this.goToCompanyExpenseView(fyParam || '2026-2027');
      if (idParam) this.openCompanyExpenseDetails(idParam);
      return;
    } else if (viewParam === 'owner' || viewParam === 'owner-expense') {
      this.goToOwnerExpenseView(fyParam || '2026-2027');
      if (idParam) this.openOwnerExpenseDetails(idParam);
      return;
    } else if (viewParam === 'received') {
      this.goToReceivedView(fyParam || '2026-2027');
      if (idParam) this.openReceivedPaymentDetails(idParam);
      return;
    }

    this.applyFilters();
    this.applyCashFilters();
    this.applyReturnedFilters();
    this.applyCompanyFilters();
    this.applyOwnerFilters();
    this.applyReceivedFilters();
    this.applyOpenDebtsFilters();
    this.applyAllDebtsFilters();
    this.applySettledFilters();
    this.renderRegisterTable();
    this.renderFYSidebar();
    this.renderMonthBar();
    this.renderCurrentView();
  },

  async loadData() {
    const [
      allDebts, allParties, allOwners, allTrips,
      allPayments, allCashLedger, allReturnedAmounts,
      allCompanyExpenses, allReceivedPayments, allOwnerExpenses
    ] = await Promise.all([
      dbService.getAll('debts'),
      dbService.getAll('parties'),
      dbService.getAll('truckOwners'),
      dbService.getAll('trips'),
      dbService.getAll('payments'),
      dbService.getAll('cashLedger'),
      dbService.getAll('returnedAmounts'),
      dbService.getAll('companyExpenses'),
      dbService.getAll('receivedPayments'),
      dbService.getAll('ownerExpenses')
    ]);
    this.allDebts = allDebts || [];
    this.allParties = allParties || [];
    this.allOwners = allOwners || [];
    this.allTrips = allTrips || [];
    this.allPayments = allPayments || [];
    this.allCashLedger = allCashLedger || [];
    this.allReturnedAmounts = allReturnedAmounts || [];
    this.allCompanyExpenses = allCompanyExpenses || [];
    this.allReceivedPayments = allReceivedPayments || [];
    this.allOwnerExpenses = allOwnerExpenses || [];
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

  goToOpenDebtsView(fy = '2026-2027') {
    this.mainViewMode = 'open-debts';
    this.currentTab = 'open';
    this.selectedOpenDebtsFY = fy || '2026-2027';
    this.selectedOpenDebtsDate = null;
    if (fy && fy !== 'ALL') {
      this.expandedOpenDebtsFYs[fy] = true;
    }
    this.openDebtsCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Open Debts';
    }
    document.getElementById('tab-btn-open')?.classList.add('active');
    document.getElementById('tab-btn-all')?.classList.remove('active');
    document.getElementById('tab-btn-settled')?.classList.remove('active');
    document.getElementById('tab-btn-statements')?.classList.remove('active');
    this.applyOpenDebtsFilters();
    this.renderCurrentView();
  },

  goToAllDebtsView(fy = 'ALL') {
    this.mainViewMode = 'all-debts';
    this.currentTab = 'all';
    this.selectedAllDebtsFY = fy || 'ALL';
    this.selectedAllDebtsDate = null;
    if (fy && fy !== 'ALL') {
      this.expandedAllDebtsFYs[fy] = true;
    }
    this.allDebtsCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search All Debts';
    }
    document.getElementById('tab-btn-open')?.classList.remove('active');
    document.getElementById('tab-btn-all')?.classList.add('active');
    document.getElementById('tab-btn-settled')?.classList.remove('active');
    document.getElementById('tab-btn-statements')?.classList.remove('active');
    this.applyAllDebtsFilters();
    this.renderCurrentView();
  },

  goToDebtsView(tab = 'open', fy = 'ALL') {
    if (tab === 'open') {
      return this.goToOpenDebtsView(fy === 'ALL' ? 'ALL' : fy);
    }
    if (tab === 'all') {
      return this.goToAllDebtsView(fy === 'ALL' ? 'ALL' : fy);
    }
    if (tab === 'settled') {
      return this.goToSettledView(fy === 'ALL' ? 'ALL' : fy);
    }
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

  goToCompanyExpenseView(fy = '2026-2027', month = null) {
    this.mainViewMode = 'company-expense';
    if (fy === 'ALL') {
      this.selectedCompanyFY = 'ALL';
      this.selectedCompanyMonth = 'ALL';
    } else {
      this.selectedCompanyFY = fy;
      this.selectedCompanyMonth = month !== null ? month : (fy === '2026-2027' ? '7 Oct' : 'ALL');
      this.expandedCompanyFYs[fy] = true;
    }
    this.companyCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Company Expense';
    }
    this.applyCompanyFilters();
    this.renderCurrentView();
  },

  goToReceivedView(fy = '2026-2027', type = null) {
    this.mainViewMode = 'received';
    if (fy === 'ALL') {
      this.selectedReceivedFY = 'ALL';
      this.selectedReceivedType = 'ALL';
    } else {
      this.selectedReceivedFY = fy;
      this.selectedReceivedType = type !== null ? type : 'ALL';
      this.expandedReceivedFYs[fy] = true;
    }
    this.receivedCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Received Payments';
    }
    this.applyReceivedFilters();
    this.renderCurrentView();
  },

  goToOwnerExpenseView(fy = '2026-2027', month = null, owner = null) {
    this.mainViewMode = 'owner-expense';
    if (fy === 'ALL') {
      this.selectedOwnerFY = 'ALL';
      this.selectedOwnerMonth = 'ALL';
      this.selectedOwnerName = null;
    } else {
      this.selectedOwnerFY = fy;
      this.selectedOwnerMonth = month !== null ? month : (fy === '2026-2027' ? '7 Oct' : 'ALL');
      this.selectedOwnerName = owner || null;
      this.expandedOwnerFYs[fy] = true;
    }
    this.ownerCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Owner';
    }
    this.applyOwnerFilters();
    this.renderCurrentView();
  },

  handleTopAddAction() {
    if (this.mainViewMode === 'cash-ledger') {
      this.openCashDetailsModal();
    } else if (this.mainViewMode === 'company-expense') {
      this.openAddCompanyExpenseModal();
    } else if (this.mainViewMode === 'owner-expense') {
      this.openAddOwnerExpenseModal();
    } else if (this.mainViewMode === 'received') {
      this.openAddIncomeRecordModal();
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

  formatINR3(val) {
    if (val === null || val === undefined || isNaN(val)) return '0.000';
    return Number(val).toLocaleString('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
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
      const isExpanded = !!this.expandedReturnedFYs[fy];
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
    this.expandedReturnedFYs[fy] = !this.expandedReturnedFYs[fy];
    this.renderReturnedTreeSidebar();
  },

  selectReturnedFY(fy) {
    this.selectedReturnedFY = fy;
    this.selectedReturnedMonth = 'ALL';
    if (fy !== 'ALL') {
      this.expandedReturnedFYs[fy] = true;
    }
    this.applyReturnedFilters();
  },

  selectReturnedMonth(fy, month) {
    this.selectedReturnedFY = fy;
    this.selectedReturnedMonth = month;
    if (fy !== 'ALL') {
      this.expandedReturnedFYs[fy] = true;
    }
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
            <span class="fw-bold me-2 group-header-date" style="color: #0b8043; font-size: 13px;">${dateKey}</span>
            <span class="appsheet-drill-badge" style="background: #e8eaed; color: #3c4043; border-radius: 12px; padding: 2px 10px; font-size: 11.5px; font-weight: 500;">₹ ${this.formatINR(groupSum)}</span>
          </td>
        </tr>
      `;

      // Data Rows - Authentic AppSheet all-green cells with bullet on every column
      items.forEach(r => {
        const isSelected = this.activeReturnedRecordId === r.id;
        html += `
          <tr class="returned-data-row ${isSelected ? 'active' : ''}" id="ret-row-${r.id}" onclick="LedgerModule.openSettledDebtDetails('${r.id}')">
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.returnMode || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span class="fw-semibold">${r.truckNo || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.displayReturnDate || r.returnDate || ''}</span>
            </td>
            <td class="text-end">
              <span class="appsheet-bullet green-bullet">●</span>
              <span class="fw-bold">₹ ${this.formatINR(r.returnedAmount)}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.displayDebtDate || r.debtDate || ''}</span>
            </td>
            <td class="text-end">
              <span class="appsheet-bullet green-bullet">●</span>
              <span class="fw-semibold">₹ ${this.formatINR(r.debtAmount)}</span>
            </td>
            
            <!-- Full table columns (hidden in split view) -->
            <td class="col-ext">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.debtType || ''}</span>
            </td>
            <td class="col-ext">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.grNo ? this.formatINR(Number(r.grNo)) : ''}</span>
            </td>
            <td class="col-ext">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.company || ''}</span>
            </td>
            <td class="col-ext text-truncate" style="max-width: 175px;" title="${r.depositorName || ''}">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.depositorName || ''}</span>
            </td>
            <td class="col-ext text-truncate" style="max-width: 195px;" title="${r.description || ''}">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.description || ''}</span>
            </td>
            <td class="text-center" style="font-size: 11px; color: #5f6368;"><i class="bi bi-chevron-right"></i></td>
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
    const splitWrapper = document.getElementById('returned-split-wrapper') || (document.querySelector && document.querySelector('.returned-split-wrapper'));
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
    const splitWrapper = document.getElementById('returned-split-wrapper') || (document.querySelector && document.querySelector('.returned-split-wrapper'));
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
  // COMPANY EXPENSE (Authentic AppSheet Gold Master-Detail)
  // ----------------------------------------------------
  applyCompanyFilters() {
    if (!this.allCompanyExpenses || !Array.isArray(this.allCompanyExpenses)) {
      this.filteredCompanyList = [];
      this.renderCompanyExpenseTable();
      return;
    }

    const query = (this.searchQuery || '').trim().toLowerCase();

    this.filteredCompanyList = this.allCompanyExpenses.filter(item => {
      // Financial Year Filter
      if (this.selectedCompanyFY !== 'ALL') {
        if (item.fy !== this.selectedCompanyFY) return false;
      }

      // Month Filter
      if (this.selectedCompanyMonth !== 'ALL') {
        if (item.monthKey !== this.selectedCompanyMonth) return false;
      }

      // Search Query Filter
      if (query) {
        const match =
          (item.displayDate && item.displayDate.toLowerCase().includes(query)) ||
          (item.date && item.date.toLowerCase().includes(query)) ||
          (item.expenseLineItem && item.expenseLineItem.toLowerCase().includes(query)) ||
          (item.expenseFrom && item.expenseFrom.toLowerCase().includes(query)) ||
          (item.expenseType && item.expenseType.toLowerCase().includes(query)) ||
          (item.ownerName && item.ownerName.toLowerCase().includes(query)) ||
          (item.amount && item.amount.toString().includes(query));
        if (!match) return false;
      }

      return true;
    });

    // Update breadcrumb badge
    const badge = document.getElementById('company-current-filter-badge');
    if (badge) {
      if (this.selectedCompanyFY === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>All Financial Years (${this.filteredCompanyList.length} records)`;
      } else if (this.selectedCompanyMonth === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedCompanyFY} &gt; <strong>All Months</strong> (${this.filteredCompanyList.length} records)`;
      } else {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedCompanyFY} &gt; <strong>${this.selectedCompanyMonth}</strong> (${this.filteredCompanyList.length} records)`;
      }
    }

    this.companyCurrentPage = 1;
    this.renderCompanyTreeSidebar();
    this.renderCompanyExpenseTable();
  },

  renderCompanyTreeSidebar() {
    if (!this.allCompanyExpenses) return;

    // Calculate totals across dataset
    let grandTotal = 0;
    const fyTotals = {};
    const monthTotals = {}; // key: `${fy}_${monthKey}`

    this.allCompanyExpenses.forEach(r => {
      const amt = Number(r.amount) || 0;
      grandTotal += amt;

      const fy = r.fy || 'empty';
      fyTotals[fy] = (fyTotals[fy] || 0) + amt;

      if (r.monthKey) {
        const mKey = `${fy}_${r.monthKey}`;
        monthTotals[mKey] = (monthTotals[mKey] || 0) + amt;
      }
    });

    // Update badges
    const badgeAll = document.getElementById('company-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR3(grandTotal)}`;

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const b = document.getElementById(`company-badge-${fy}`);
      if (b) b.textContent = `₹ ${this.formatINR3(fyTotals[fy] || 0)}`;
    });

    // Also update Card 3 badges on the main dashboard if they exist
    const cardBadge26 = document.querySelector('#card-dash-company .appsheet-drill-row:nth-child(3) .appsheet-drill-badge');
    if (cardBadge26 && fyTotals['2026-2027']) cardBadge26.textContent = `₹ ${this.formatINR3(fyTotals['2026-2027'])}`;
    const cardBadge25 = document.querySelector('#card-dash-company .appsheet-drill-row:nth-child(4) .appsheet-drill-badge');
    if (cardBadge25 && fyTotals['2025-2026']) cardBadge25.textContent = `₹ ${this.formatINR3(fyTotals['2025-2026'])}`;
    const cardBadge24 = document.querySelector('#card-dash-company .appsheet-drill-row:nth-child(5) .appsheet-drill-badge');
    if (cardBadge24 && fyTotals['2024-2025']) cardBadge24.textContent = `₹ ${this.formatINR3(fyTotals['2024-2025'])}`;

    // Active state highlighting on All & FY items
    const treeAll = document.getElementById('company-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedCompanyFY === 'ALL');
    }

    // Authentic AppSheet month lists
    const monthsByFY = {
      '2026-2027': ['7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'],
      '2025-2026': ['12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'],
      '2024-2025': ['12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr']
    };

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const isExpanded = !!this.expandedCompanyFYs[fy];
      const sublistEl = document.getElementById(`company-sublist-${fy}`);
      const fyItemEl = document.getElementById(`company-tree-${fy}`);

      if (fyItemEl) {
        fyItemEl.classList.toggle('active', this.selectedCompanyFY === fy && this.selectedCompanyMonth === 'ALL');
        const caret = fyItemEl.querySelector('.company-tree-caret');
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
            const isMonthActive = this.selectedCompanyFY === fy && this.selectedCompanyMonth === mKey;
            return `
              <div class="company-tree-item company-tree-subitem ${isMonthActive ? 'active' : ''}" onclick="LedgerModule.selectCompanyMonth('${fy}', '${mKey}')">
                <div class="d-flex align-items-center gap-1">
                  <span class="appsheet-bullet text-muted" style="font-size: 11px;">●</span>
                  <span>${mKey}</span>
                </div>
                <span class="company-tree-badge">₹ ${this.formatINR3(mTotal)}</span>
              </div>
            `;
          }).join('');
        }
      }
    });
  },

  toggleCompanyFYTree(fy) {
    this.expandedCompanyFYs[fy] = !this.expandedCompanyFYs[fy];
    this.renderCompanyTreeSidebar();
  },

  selectCompanyFY(fy) {
    this.selectedCompanyFY = fy;
    this.selectedCompanyMonth = 'ALL';
    if (fy !== 'ALL') {
      this.expandedCompanyFYs[fy] = true;
    }
    this.applyCompanyFilters();
  },

  selectCompanyMonth(fy, month) {
    this.selectedCompanyFY = fy;
    this.selectedCompanyMonth = month;
    if (fy !== 'ALL') {
      this.expandedCompanyFYs[fy] = true;
    }
    this.applyCompanyFilters();
  },

  selectCompanyAll() {
    this.selectedCompanyFY = 'ALL';
    this.selectedCompanyMonth = 'ALL';
    this.applyCompanyFilters();
  },

  toggleCompanyDateSidebar() {
    this.isCompanySidebarHidden = !this.isCompanySidebarHidden;
    const sidebar = document.getElementById('company-tree-sidebar');
    const btnText = document.getElementById('btn-toggle-company-text');
    const btnIcon = document.getElementById('btn-toggle-company-icon');

    if (sidebar) {
      if (this.isCompanySidebarHidden) {
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

  renderCompanyExpenseTable() {
    const tbody = document.getElementById('company-expense-tbody');
    if (!tbody) return;

    if (!this.filteredCompanyList || this.filteredCompanyList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No company expense records match the selected filter or search criteria.
            <div class="mt-2">
              <button type="button" class="btn btn-sm btn-outline-warning" style="color: #8d6e32; border-color: #8d6e32;" onclick="LedgerModule.selectCompanyAll(); LedgerModule.clearSearch();">
                Reset Filters & Search
              </button>
            </div>
          </td>
        </tr>
      `;
      const pInfo = document.getElementById('company-pagination-info');
      if (pInfo) pInfo.textContent = 'Showing 0 records';
      const pBtns = document.getElementById('company-pagination-buttons');
      if (pBtns) pBtns.innerHTML = '';
      return;
    }

    // Pagination Calculation
    const totalCount = this.filteredCompanyList.length;
    let recordsToDisplay = this.filteredCompanyList;
    let totalPages = 1;

    if (this.companyPageSize !== 'ALL') {
      const pSize = parseInt(this.companyPageSize, 10);
      totalPages = Math.max(1, Math.ceil(totalCount / pSize));
      if (this.companyCurrentPage > totalPages) this.companyCurrentPage = totalPages;
      if (this.companyCurrentPage < 1) this.companyCurrentPage = 1;

      const startIndex = (this.companyCurrentPage - 1) * pSize;
      const endIndex = Math.min(startIndex + pSize, totalCount);
      recordsToDisplay = this.filteredCompanyList.slice(startIndex, endIndex);

      const pInfo = document.getElementById('company-pagination-info');
      if (pInfo) pInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalCount} entries`;
    } else {
      const pInfo = document.getElementById('company-pagination-info');
      if (pInfo) pInfo.textContent = `Showing all ${totalCount} entries`;
    }

    // Pagination Buttons
    const pBtns = document.getElementById('company-pagination-buttons');
    if (pBtns) {
      if (this.companyPageSize === 'ALL' || totalPages <= 1) {
        pBtns.innerHTML = '';
      } else {
        let btnsHtml = `
          <button type="button" class="btn btn-outline-secondary ${this.companyCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeCompanyPage(${this.companyCurrentPage - 1})">Prev</button>
        `;
        const startP = Math.max(1, this.companyCurrentPage - 2);
        const endP = Math.min(totalPages, this.companyCurrentPage + 2);
        for (let p = startP; p <= endP; p++) {
          btnsHtml += `
            <button type="button" class="btn ${p === this.companyCurrentPage ? 'text-white' : 'btn-outline-secondary'}" style="${p === this.companyCurrentPage ? 'background-color: #8d6e32; border-color: #8d6e32;' : ''}" onclick="LedgerModule.changeCompanyPage(${p})">${p}</button>
          `;
        }
        btnsHtml += `
          <button type="button" class="btn btn-outline-secondary ${this.companyCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeCompanyPage(${this.companyCurrentPage + 1})">Next</button>
        `;
        pBtns.innerHTML = btnsHtml;
      }
    }

    // Grouping by Date (displayDate)
    const grouped = new Map();
    recordsToDisplay.forEach(item => {
      const dKey = item.displayDate || item.date || 'Other';
      if (!grouped.has(dKey)) {
        grouped.set(dKey, []);
      }
      grouped.get(dKey).push(item);
    });

    let html = '';
    grouped.forEach((items, dateKey) => {
      const groupSum = items.reduce((acc, x) => acc + (Number(x.amount) || 0), 0);

      // Authentic AppSheet Group Header (● DD/MM/YYYY ₹ Total)
      html += `
        <tr class="company-date-group-row">
          <td colspan="6">
            <span class="appsheet-bullet gold-bullet">●</span>
            <span class="fw-bold me-2 group-header-date" style="color: #8d6e32; font-size: 13px;">${dateKey}</span>
            <span class="appsheet-drill-badge" style="background: #fbf7ee; color: #8d6e32; border: 1px solid #ebd9b4; border-radius: 12px; padding: 2px 10px; font-size: 11.5px; font-weight: 600;">₹ ${this.formatINR3(groupSum)}</span>
          </td>
        </tr>
      `;

      // Data Rows - Authentic AppSheet gold cells with bullet on every column
      items.forEach(r => {
        const isSelected = this.activeCompanyExpenseId === r.id;
        html += `
          <tr class="company-data-row ${isSelected ? 'active' : ''}" id="comp-row-${r.id}" onclick="LedgerModule.openCompanyExpenseDetails('${r.id}')">
            <td>
              <span class="appsheet-bullet gold-bullet">●</span>
              <span>${r.displayDate || r.date || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet gold-bullet">●</span>
              <span class="fw-bold">₹ ${this.formatINR3(r.amount)}</span>
            </td>
            <td class="text-truncate" style="max-width: 320px;" title="${r.expenseLineItem || ''}">
              <span class="appsheet-bullet gold-bullet">●</span>
              <span>${r.expenseLineItem || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet gold-bullet">●</span>
              <span>${r.expenseFrom || 'Cash'}</span>
            </td>
            <td>
              <span class="appsheet-bullet gold-bullet">●</span>
              <span>${r.expenseType === 'Owner' && r.ownerName ? `Owner (${r.ownerName})` : (r.expenseType || 'Company')}</span>
            </td>
            <td class="text-center" style="font-size: 11px; color: #8d6e32;"><i class="bi bi-chevron-right"></i></td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  openCompanyExpenseDetails(recordId) {
    this.activeCompanyExpenseId = recordId;
    const r = (this.allCompanyExpenses || []).find(x => x.id === recordId);
    if (!r) return;

    // Highlight row in table
    const allRows = document.querySelectorAll('.company-data-row');
    allRows.forEach(row => row.classList.remove('active'));
    const targetRow = document.getElementById(`comp-row-${recordId}`);
    if (targetRow) targetRow.classList.add('active');

    // Show side panel and activate split-open mode
    const panel = document.getElementById('panel-company-expense-details');
    const splitWrapper = document.getElementById('company-split-wrapper');
    if (panel) panel.classList.remove('d-none');
    if (splitWrapper) splitWrapper.classList.add('split-open');

    const content = document.getElementById('company-expense-panel-content');
    if (!content) return;

    content.innerHTML = `
      <div class="company-detail-card shadow-sm">
        <div class="company-field-row">
          <span class="company-field-label">Date</span>
          <span class="company-field-value text-dark" style="font-weight: 500;">${r.displayDate || r.date || '-'}</span>
        </div>
        <div class="company-field-row">
          <span class="company-field-label">Amount</span>
          <span class="company-field-value fs-6 fw-bold" style="color: #8d6e32;">₹ ${this.formatINR3(r.amount)}</span>
        </div>
        <div class="company-field-row">
          <span class="company-field-label">Expense Type</span>
          <span class="company-field-value">
            <span class="appsheet-bullet gold-bullet">●</span>
            <span>${r.expenseType === 'Owner' && r.ownerName ? `Owner (${r.ownerName})` : (r.expenseType || 'Company')}</span>
          </span>
        </div>
        <div class="company-field-row">
          <span class="company-field-label">Expense Line Item</span>
          <span class="company-field-value" style="color: #202124; font-weight: 500;">${r.expenseLineItem || '-'}</span>
        </div>
        <div class="company-field-row mb-0">
          <span class="company-field-label">Expense From</span>
          <span class="company-field-value">
            <span class="appsheet-bullet gold-bullet">●</span>
            <span>${r.expenseFrom || 'Cash'}</span>
          </span>
        </div>
      </div>
    `;
  },

  closeCompanyExpenseDetails() {
    this.activeCompanyExpenseId = null;
    const panel = document.getElementById('panel-company-expense-details');
    const splitWrapper = document.getElementById('company-split-wrapper');
    if (panel) {
      panel.classList.add('d-none');
      panel.classList.remove('fullscreen');
    }
    if (splitWrapper) splitWrapper.classList.remove('split-open');

    this.isCompanyPanelFullscreen = false;
    const btnExpand = document.getElementById('btn-expand-company-panel');
    if (btnExpand) btnExpand.textContent = '↗';

    const allRows = document.querySelectorAll('.company-data-row');
    allRows.forEach(row => row.classList.remove('active'));
  },

  toggleCompanyDetailFullscreen() {
    this.isCompanyPanelFullscreen = !this.isCompanyPanelFullscreen;
    const panel = document.getElementById('panel-company-expense-details');
    const btnExpand = document.getElementById('btn-expand-company-panel');
    if (panel) {
      panel.classList.toggle('fullscreen', this.isCompanyPanelFullscreen);
    }
    if (btnExpand) {
      btnExpand.textContent = this.isCompanyPanelFullscreen ? '↙' : '↗';
    }
  },

  prevCompanyExpenseRecord() {
    if (!this.activeCompanyExpenseId || !this.filteredCompanyList.length) return;
    const currentIndex = this.filteredCompanyList.findIndex(x => x.id === this.activeCompanyExpenseId);
    if (currentIndex > 0) {
      this.openCompanyExpenseDetails(this.filteredCompanyList[currentIndex - 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('First record reached', 'info');
    }
  },

  nextCompanyExpenseRecord() {
    if (!this.activeCompanyExpenseId || !this.filteredCompanyList.length) return;
    const currentIndex = this.filteredCompanyList.findIndex(x => x.id === this.activeCompanyExpenseId);
    if (currentIndex >= 0 && currentIndex < this.filteredCompanyList.length - 1) {
      this.openCompanyExpenseDetails(this.filteredCompanyList[currentIndex + 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Last record reached', 'info');
    }
  },

  toggleCompanyFullscreen() {
    const el = document.getElementById('ledger-view-company-expense');
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

  changeCompanyPageSize(size) {
    this.companyPageSize = size;
    this.companyCurrentPage = 1;
    this.renderCompanyExpenseTable();
  },

  changeCompanyPage(page) {
    this.companyCurrentPage = page;
    this.renderCompanyExpenseTable();
    const tableWrap = document.getElementById('company-table-wrapper');
    if (tableWrap) tableWrap.scrollTop = 0;
  },

  openAddCompanyExpenseModal() {
    this.modalExpenseType = 'Company';
    this.modalExpenseFrom = 'Cash';

    const form = document.getElementById('form-add-company-expense');
    if (form) form.reset();

    const dateInput = document.getElementById('comp-exp-date');
    if (dateInput) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    const amtInput = document.getElementById('comp-exp-amount');
    if (amtInput) amtInput.value = '';

    const lineItemInput = document.getElementById('comp-exp-line-item');
    if (lineItemInput) lineItemInput.value = '';

    // Populate owners in dropdown
    const ownerSelect = document.getElementById('comp-exp-owner');
    if (ownerSelect) {
      const ownerNames = new Set(['Ramkaran Jat', 'Damji Vyas (Mining)', 'Govind Choudhary', 'Kalu Khan', 'Kalu Bhai', 'Suresh Kumar Choudhary', 'Balveer Yadav', 'Narendra Choudhary']);
      (this.allOwnerExpenses || []).forEach(o => { if (o.ownerName) ownerNames.add(o.ownerName); });
      (this.allOwners || []).forEach(o => { if (o.name) ownerNames.add(o.name); });
      ownerSelect.innerHTML = Array.from(ownerNames).map(name => `<option value="${name}" ${name === 'Ramkaran Jat' ? 'selected' : ''}>● ${name}</option>`).join('');
    }

    this.setExpenseType('Company');
    this.setExpenseFrom('Cash');

    const modalEl = document.getElementById('modal-add-company-expense');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  setExpenseType(type) {
    this.modalExpenseType = type;
    const btnComp = document.getElementById('btn-comp-type-company');
    const btnOwner = document.getElementById('btn-comp-type-owner');
    const ownerWrap = document.getElementById('comp-owner-select-wrap');

    if (type === 'Company') {
      btnComp?.classList.add('active');
      btnOwner?.classList.remove('active');
      ownerWrap?.classList.add('d-none');
    } else {
      btnComp?.classList.remove('active');
      btnOwner?.classList.add('active');
      ownerWrap?.classList.remove('d-none');
    }
  },

  setExpenseFrom(from) {
    this.modalExpenseFrom = from;
    const btnCash = document.getElementById('btn-comp-from-cash');
    const btnOnline = document.getElementById('btn-comp-from-online');

    if (from === 'Cash') {
      btnCash?.classList.add('active');
      btnOnline?.classList.remove('active');
    } else {
      btnCash?.classList.remove('active');
      btnOnline?.classList.add('active');
    }
  },

  async saveCompanyExpense() {
    const dateVal = document.getElementById('comp-exp-date')?.value?.trim();
    const amountVal = parseFloat(document.getElementById('comp-exp-amount')?.value);
    const lineItemVal = document.getElementById('comp-exp-line-item')?.value?.trim();

    if (!dateVal) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please select a valid date', 'warning');
      return;
    }
    if (isNaN(amountVal) || amountVal <= 0) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter a valid amount', 'warning');
      return;
    }
    if (!lineItemVal) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter expense line item', 'warning');
      return;
    }

    const [y, m, d] = dateVal.split('-');
    const displayDate = `${d}/${m}/${y}`;
    const monthNum = parseInt(m, 10);
    const yearNum = parseInt(y, 10);

    const fy = monthNum >= 4 ? `${yearNum}-${yearNum + 1}` : `${yearNum - 1}-${yearNum}`;
    const monthMap = {
      4: '1 Apr', 5: '2 May', 6: '3 Jun', 7: '4 Jul', 8: '5 Aug', 9: '6 Sep',
      10: '7 Oct', 11: '8 Nov', 12: '9 Dec', 1: '10 Jan', 2: '11 Feb', 3: '12 Mar'
    };
    const monthKey = monthMap[monthNum] || '7 Oct';

    let ownerName = '';
    const isOwner = this.modalExpenseType === 'Owner';
    if (isOwner) {
      ownerName = document.getElementById('comp-exp-owner')?.value || 'Ramkaran Jat';
    }

    const collection = isOwner ? 'ownerExpenses' : 'companyExpenses';
    const idPrefix = isOwner ? 'OWN_EXP_' : 'COMP_EXP_';

    const newRecord = {
      id: `${idPrefix}${Date.now()}`,
      date: dateVal,
      displayDate,
      amount: amountVal,
      expenseLineItem: lineItemVal,
      expenseFrom: this.modalExpenseFrom || 'Cash',
      expenseType: this.modalExpenseType || 'Company',
      ownerName,
      fy,
      monthKey
    };

    if (typeof dbService !== 'undefined') {
      try {
        await dbService.create(collection, newRecord);
      } catch (err) {
        console.error('Failed to save to dbService:', err);
      }
    }

    // Close modal
    const modalEl = document.getElementById('modal-add-company-expense');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }

    if (isOwner) {
      if (!Array.isArray(this.allOwnerExpenses)) this.allOwnerExpenses = [];
      this.allOwnerExpenses.unshift(newRecord);
      this.mainViewMode = 'owner-expense';
      this.selectedOwnerFY = fy;
      this.selectedOwnerMonth = monthKey;
      this.expandedOwnerFYs[fy] = true;
      this.applyOwnerFilters();
      this.renderCurrentView();
      this.openOwnerExpenseDetails(newRecord.id);
      if (typeof AppUI !== 'undefined') {
        AppUI.showToast(`Owner Expense of ₹ ${this.formatINR3(amountVal)} saved successfully!`, 'success');
      }
    } else {
      if (!Array.isArray(this.allCompanyExpenses)) this.allCompanyExpenses = [];
      this.allCompanyExpenses.unshift(newRecord);
      this.mainViewMode = 'company-expense';
      this.selectedCompanyFY = fy;
      this.selectedCompanyMonth = monthKey;
      this.expandedCompanyFYs[fy] = true;
      this.applyCompanyFilters();
      this.renderCurrentView();
      this.openCompanyExpenseDetails(newRecord.id);
      if (typeof AppUI !== 'undefined') {
        AppUI.showToast(`Expense of ₹ ${this.formatINR3(amountVal)} saved successfully!`, 'success');
      }
    }
  },

  // ----------------------------------------------------
  // OWNER EXPENSE FILTERING, RENDERING & ACTIONS (Authentic AppSheet Pink Master-Detail)
  // ----------------------------------------------------
  openAddOwnerExpenseModal() {
    this.openAddCompanyExpenseModal();
    this.setExpenseType('Owner');
  },

  applyOwnerFilters() {
    if (!this.allOwnerExpenses || !Array.isArray(this.allOwnerExpenses)) {
      this.filteredOwnerList = [];
      this.renderOwnerExpenseTable();
      return;
    }

    const query = (this.searchQuery || '').trim().toLowerCase();

    this.filteredOwnerList = this.allOwnerExpenses.filter(item => {
      // Financial Year Filter
      if (this.selectedOwnerFY !== 'ALL') {
        if (item.fy !== this.selectedOwnerFY) return false;
      }

      // Month Filter
      if (this.selectedOwnerMonth && this.selectedOwnerMonth !== 'ALL') {
        if (item.monthKey !== this.selectedOwnerMonth) return false;
      }

      // Owner Name Filter
      if (this.selectedOwnerName && this.selectedOwnerName !== 'ALL') {
        if (item.ownerName !== this.selectedOwnerName) return false;
      }

      // Search Query Filter
      if (query) {
        const match =
          (item.displayDate && item.displayDate.toLowerCase().includes(query)) ||
          (item.date && item.date.toLowerCase().includes(query)) ||
          (item.expenseLineItem && item.expenseLineItem.toLowerCase().includes(query)) ||
          (item.expenseFrom && item.expenseFrom.toLowerCase().includes(query)) ||
          (item.expenseType && item.expenseType.toLowerCase().includes(query)) ||
          (item.ownerName && item.ownerName.toLowerCase().includes(query)) ||
          (item.amount && item.amount.toString().includes(query));
        if (!match) return false;
      }

      return true;
    });

    // Update breadcrumb badge
    const badge = document.getElementById('owner-current-filter-badge');
    if (badge) {
      if (this.selectedOwnerFY === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>All Financial Years (${this.filteredOwnerList.length} records)`;
      } else if (this.selectedOwnerMonth === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedOwnerFY} &gt; <strong>All Months</strong> (${this.filteredOwnerList.length} records)`;
      } else {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedOwnerFY} &gt; <strong>${this.selectedOwnerMonth}</strong> (${this.filteredOwnerList.length} records)`;
      }
    }

    this.ownerCurrentPage = 1;
    this.renderOwnerTreeSidebar();
    this.renderOwnerExpenseTable();
  },

  renderOwnerTreeSidebar() {
    if (!this.allOwnerExpenses) return;

    // Calculate totals across dataset
    let grandTotal = 0;
    const fyTotals = {};
    const monthTotals = {}; // key: `${fy}_${monthKey}`

    this.allOwnerExpenses.forEach(r => {
      const amt = Number(r.amount) || 0;
      grandTotal += amt;

      const fy = r.fy || 'empty';
      fyTotals[fy] = (fyTotals[fy] || 0) + amt;

      if (r.monthKey) {
        const mKey = `${fy}_${r.monthKey}`;
        monthTotals[mKey] = (monthTotals[mKey] || 0) + amt;
      }
    });

    // Update badges
    const badgeAll = document.getElementById('owner-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR3(grandTotal)}`;

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const b = document.getElementById(`owner-badge-${fy}`);
      if (b) b.textContent = `₹ ${this.formatINR3(fyTotals[fy] || 0)}`;
    });

    // Also update Card 7 badges on the main dashboard
    const cardBadge26 = document.getElementById('card-owner-badge-2026-2027');
    if (cardBadge26 && fyTotals['2026-2027']) cardBadge26.textContent = `₹ ${this.formatINR3(fyTotals['2026-2027'])}`;
    const cardBadge25 = document.getElementById('card-owner-badge-2025-2026');
    if (cardBadge25 && fyTotals['2025-2026']) cardBadge25.textContent = `₹ ${this.formatINR3(fyTotals['2025-2026'])}`;
    const cardBadge24 = document.getElementById('card-owner-badge-2024-2025');
    if (cardBadge24 && fyTotals['2024-2025']) cardBadge24.textContent = `₹ ${this.formatINR3(fyTotals['2024-2025'])}`;

    // Active state highlighting on All & FY items
    const treeAll = document.getElementById('owner-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedOwnerFY === 'ALL');
    }

    const monthsByFY = {
      '2026-2027': ['7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'],
      '2025-2026': ['12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'],
      '2024-2025': ['12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr']
    };

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const isExpanded = !!this.expandedOwnerFYs[fy];
      const sublistEl = document.getElementById(`owner-sublist-${fy}`);
      const fyItemEl = document.getElementById(`owner-tree-${fy}`);

      if (fyItemEl) {
        fyItemEl.classList.toggle('active', this.selectedOwnerFY === fy && this.selectedOwnerMonth === 'ALL');
        const caret = fyItemEl.querySelector('.owner-tree-caret');
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
            const isMonthActive = this.selectedOwnerFY === fy && this.selectedOwnerMonth === mKey;
            return `
              <div class="owner-tree-item owner-tree-subitem ${isMonthActive ? 'active' : ''}" onclick="LedgerModule.selectOwnerMonth('${fy}', '${mKey}')">
                <div class="d-flex align-items-center gap-1">
                  <span class="appsheet-bullet pink-bullet" style="font-size: 11px;">●</span>
                  <span>${mKey}</span>
                </div>
                <span class="owner-tree-badge">₹ ${this.formatINR3(mTotal)}</span>
              </div>
            `;
          }).join('');
        }
      }
    });
  },

  toggleOwnerFYTree(fy) {
    this.expandedOwnerFYs[fy] = !this.expandedOwnerFYs[fy];
    this.renderOwnerTreeSidebar();
  },

  selectOwnerFY(fy) {
    this.selectedOwnerFY = fy;
    this.selectedOwnerMonth = 'ALL';
    if (fy !== 'ALL') {
      this.expandedOwnerFYs[fy] = true;
    }
    this.applyOwnerFilters();
  },

  selectOwnerMonth(fy, month) {
    this.selectedOwnerFY = fy;
    this.selectedOwnerMonth = month;
    if (fy !== 'ALL') {
      this.expandedOwnerFYs[fy] = true;
    }
    this.applyOwnerFilters();
  },

  selectOwnerAll() {
    this.selectedOwnerFY = 'ALL';
    this.selectedOwnerMonth = 'ALL';
    this.applyOwnerFilters();
  },

  toggleOwnerDateSidebar() {
    this.isOwnerSidebarHidden = !this.isOwnerSidebarHidden;
    const sidebar = document.getElementById('owner-tree-sidebar');
    const btnText = document.getElementById('btn-toggle-owner-text');
    const btnIcon = document.getElementById('btn-toggle-owner-icon');

    if (sidebar) {
      if (this.isOwnerSidebarHidden) {
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

  renderOwnerExpenseTable() {
    const tbody = document.getElementById('owner-expense-tbody');
    if (!tbody) return;

    if (!this.filteredOwnerList || this.filteredOwnerList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No owner expense records match the selected filter or search criteria.
            <div class="mt-2">
              <button type="button" class="btn btn-sm btn-outline-danger" style="color: #e91e63; border-color: #e91e63;" onclick="LedgerModule.selectOwnerAll(); LedgerModule.clearSearch();">
                Reset Filters & Search
              </button>
            </div>
          </td>
        </tr>
      `;
      const pInfo = document.getElementById('owner-pagination-info');
      if (pInfo) pInfo.textContent = 'Showing 0 records';
      const pBtns = document.getElementById('owner-pagination-buttons');
      if (pBtns) pBtns.innerHTML = '';
      return;
    }

    const totalCount = this.filteredOwnerList.length;
    let recordsToDisplay = this.filteredOwnerList;
    let totalPages = 1;

    if (this.ownerPageSize !== 'ALL') {
      const pSize = parseInt(this.ownerPageSize, 10);
      totalPages = Math.max(1, Math.ceil(totalCount / pSize));
      if (this.ownerCurrentPage > totalPages) this.ownerCurrentPage = totalPages;
      if (this.ownerCurrentPage < 1) this.ownerCurrentPage = 1;

      const startIndex = (this.ownerCurrentPage - 1) * pSize;
      const endIndex = Math.min(startIndex + pSize, totalCount);
      recordsToDisplay = this.filteredOwnerList.slice(startIndex, endIndex);

      const pInfo = document.getElementById('owner-pagination-info');
      if (pInfo) {
        pInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalCount} entries`;
      }
    } else {
      const pInfo = document.getElementById('owner-pagination-info');
      if (pInfo) pInfo.textContent = `Showing all ${totalCount} entries`;
    }

    // Render pagination buttons
    this.renderOwnerPaginationButtons(totalPages);

    // Group records by Date (displayDate or date)
    const groups = [];
    let currentGroup = null;

    recordsToDisplay.forEach(item => {
      const dateKey = item.displayDate || item.date || 'Undated';
      if (!currentGroup || currentGroup.date !== dateKey) {
        currentGroup = {
          date: dateKey,
          total: 0,
          items: []
        };
        groups.push(currentGroup);
      }
      currentGroup.items.push(item);
      currentGroup.total += (Number(item.amount) || 0);
    });

    let html = '';
    groups.forEach(group => {
      // Date Group Header Row
      html += `
        <tr class="owner-date-group-row">
          <td colspan="6">
            <span class="appsheet-bullet pink-bullet">●</span>
            <strong>${group.date}</strong>
            <span class="owner-date-group-badge">₹ ${this.formatINR3(group.total)}</span>
          </td>
        </tr>
      `;

      // Data rows under this group
      group.items.forEach(r => {
        const isActive = this.activeOwnerExpenseId === r.id;
        const ownerDisplay = r.expenseType === 'Owner' && r.ownerName ? r.ownerName : (r.expenseType || 'Owner');
        html += `
          <tr class="owner-data-row ${isActive ? 'active' : ''}" id="owner-row-${r.id}" onclick="LedgerModule.openOwnerExpenseDetails('${r.id}')">
            <td>${r.displayDate || r.date || '-'}</td>
            <td>
              <span class="appsheet-bullet pink-bullet">●</span>
              <span>₹ ${this.formatINR3(r.amount)}</span>
            </td>
            <td>
              <span class="appsheet-bullet pink-bullet">●</span>
              <span>${r.expenseLineItem || '-'}</span>
            </td>
            <td>
              <span class="appsheet-bullet pink-bullet">●</span>
              <span>${r.expenseFrom || 'Cash'}</span>
            </td>
            <td>
              <span class="appsheet-bullet pink-bullet">●</span>
              <span>${ownerDisplay}</span>
            </td>
            <td class="text-end text-muted" style="width: 25px; padding-right: 12px;">&gt;</td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  renderOwnerPaginationButtons(totalPages) {
    const pBtns = document.getElementById('owner-pagination-buttons');
    if (!pBtns) return;
    if (this.ownerPageSize === 'ALL' || totalPages <= 1) {
      pBtns.innerHTML = '';
      return;
    }

    let btnHtml = '';
    const cur = this.ownerCurrentPage;

    btnHtml += `
      <button type="button" class="btn btn-outline-secondary ${cur === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeOwnerPage(1)" title="First Page">&laquo;</button>
      <button type="button" class="btn btn-outline-secondary ${cur === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeOwnerPage(${cur - 1})" title="Previous Page">&lsaquo;</button>
    `;

    let startP = Math.max(1, cur - 2);
    let endP = Math.min(totalPages, cur + 2);
    if (endP - startP < 4) {
      if (startP === 1) endP = Math.min(totalPages, startP + 4);
      else if (endP === totalPages) startP = Math.max(1, endP - 4);
    }

    for (let p = startP; p <= endP; p++) {
      btnHtml += `
        <button type="button" class="btn ${p === cur ? 'btn-primary active text-white' : 'btn-outline-secondary'}" style="${p === cur ? 'background-color: #e91e63; border-color: #e91e63;' : ''}" onclick="LedgerModule.changeOwnerPage(${p})">${p}</button>
      `;
    }

    btnHtml += `
      <button type="button" class="btn btn-outline-secondary ${cur === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeOwnerPage(${cur + 1})" title="Next Page">&rsaquo;</button>
      <button type="button" class="btn btn-outline-secondary ${cur === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeOwnerPage(${totalPages})" title="Last Page">&raquo;</button>
    `;

    pBtns.innerHTML = btnHtml;
  },

  openOwnerExpenseDetails(recordId) {
    this.activeOwnerExpenseId = recordId;
    const r = (this.allOwnerExpenses || []).find(x => x.id === recordId);
    if (!r) return;

    // Highlight row in table
    const allRows = document.querySelectorAll('.owner-data-row');
    allRows.forEach(row => row.classList.remove('active'));
    const targetRow = document.getElementById(`owner-row-${recordId}`);
    if (targetRow) targetRow.classList.add('active');

    // Show side panel and activate split-open mode
    const panel = document.getElementById('panel-owner-expense-details');
    const splitWrapper = document.getElementById('owner-split-wrapper');
    if (panel) panel.classList.remove('d-none');
    if (splitWrapper) splitWrapper.classList.add('split-open');

    const content = document.getElementById('owner-expense-panel-content');
    if (!content) return;

    const ownerDisplay = r.expenseType === 'Owner' && r.ownerName ? r.ownerName : (r.expenseType || 'Owner');

    content.innerHTML = `
      <div class="owner-detail-card shadow-sm">
        <div class="owner-field-row">
          <span class="owner-field-label">Date</span>
          <span class="owner-field-value">
            <span class="appsheet-bullet pink-bullet">●</span>
            <span class="text-dark" style="font-weight: 600;">${r.displayDate || r.date || '-'}</span>
          </span>
        </div>
        <div class="owner-field-row">
          <span class="owner-field-label">Amount</span>
          <span class="owner-field-value fs-6 fw-bold" style="color: #e91e63;">
            <span class="appsheet-bullet pink-bullet">●</span>
            <span>₹${this.formatINR3(r.amount)}</span>
          </span>
        </div>
        <div class="owner-field-row">
          <span class="owner-field-label">Expense Type</span>
          <span class="owner-field-value">
            <span class="appsheet-bullet pink-bullet">●</span>
            <span>${ownerDisplay}</span>
          </span>
        </div>
        <div class="owner-field-row">
          <span class="owner-field-label">Expense Line Item</span>
          <span class="owner-field-value">
            <span class="appsheet-bullet pink-bullet">●</span>
            <span>${r.expenseLineItem || '-'}</span>
          </span>
        </div>
        <div class="owner-field-row mb-0">
          <span class="owner-field-label">Expense From</span>
          <span class="owner-field-value">
            <span class="appsheet-bullet pink-bullet">●</span>
            <span>${r.expenseFrom || 'Cash'}</span>
          </span>
        </div>
      </div>
    `;
  },

  closeOwnerExpenseDetails() {
    this.activeOwnerExpenseId = null;
    const panel = document.getElementById('panel-owner-expense-details');
    const splitWrapper = document.getElementById('owner-split-wrapper');
    if (panel) {
      panel.classList.add('d-none');
      panel.classList.remove('fullscreen');
    }
    if (splitWrapper) splitWrapper.classList.remove('split-open');

    this.isOwnerPanelFullscreen = false;
    const btnExpand = document.getElementById('btn-expand-owner-panel');
    if (btnExpand) btnExpand.textContent = '↗';

    const allRows = document.querySelectorAll('.owner-data-row');
    allRows.forEach(row => row.classList.remove('active'));
  },

  toggleOwnerDetailFullscreen() {
    this.isOwnerPanelFullscreen = !this.isOwnerPanelFullscreen;
    const panel = document.getElementById('panel-owner-expense-details');
    const btnExpand = document.getElementById('btn-expand-owner-panel');
    if (panel) {
      panel.classList.toggle('fullscreen', this.isOwnerPanelFullscreen);
    }
    if (btnExpand) {
      btnExpand.textContent = this.isOwnerPanelFullscreen ? '↙' : '↗';
    }
  },

  prevOwnerExpenseRecord() {
    if (!this.activeOwnerExpenseId || !this.filteredOwnerList.length) return;
    const currentIndex = this.filteredOwnerList.findIndex(x => x.id === this.activeOwnerExpenseId);
    if (currentIndex > 0) {
      this.openOwnerExpenseDetails(this.filteredOwnerList[currentIndex - 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('First record reached', 'info');
    }
  },

  nextOwnerExpenseRecord() {
    if (!this.activeOwnerExpenseId || !this.filteredOwnerList.length) return;
    const currentIndex = this.filteredOwnerList.findIndex(x => x.id === this.activeOwnerExpenseId);
    if (currentIndex >= 0 && currentIndex < this.filteredOwnerList.length - 1) {
      this.openOwnerExpenseDetails(this.filteredOwnerList[currentIndex + 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Last record reached', 'info');
    }
  },

  toggleOwnerFullscreen() {
    const el = document.getElementById('ledger-view-owner-expense');
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

  changeOwnerPageSize(size) {
    this.ownerPageSize = size;
    this.ownerCurrentPage = 1;
    this.renderOwnerExpenseTable();
  },

  changeOwnerPage(page) {
    this.ownerCurrentPage = page;
    this.renderOwnerExpenseTable();
    const tableWrap = document.getElementById('owner-table-wrapper');
    if (tableWrap) tableWrap.scrollTop = 0;
  },

  // ----------------------------------------------------
  // RECEIVED PAYMENTS (INCOME SLICE) FILTERING, RENDERING & ACTIONS
  // ----------------------------------------------------
  applyReceivedFilters() {
    if (!this.allReceivedPayments || !Array.isArray(this.allReceivedPayments)) {
      this.filteredReceivedList = [];
      this.renderReceivedTable();
      return;
    }

    const query = (this.searchQuery || '').trim().toLowerCase();

    this.filteredReceivedList = this.allReceivedPayments.filter(item => {
      // Financial Year Filter
      if (this.selectedReceivedFY !== 'ALL') {
        if (item.fy !== this.selectedReceivedFY) return false;
      }

      // Type Filter
      if (this.selectedReceivedType !== 'ALL') {
        if (item.type !== this.selectedReceivedType) return false;
      }

      // Search Query Filter
      if (query) {
        const match =
          (item.receivedDate && item.receivedDate.toLowerCase().includes(query)) ||
          (item.displayDate && item.displayDate.toLowerCase().includes(query)) ||
          (item.date && item.date.toLowerCase().includes(query)) ||
          (item.depositor && item.depositor.toLowerCase().includes(query)) ||
          (item.depositorType && item.depositorType.toLowerCase().includes(query)) ||
          (item.truckNo && item.truckNo.toLowerCase().includes(query)) ||
          (item.owner && item.owner.toLowerCase().includes(query)) ||
          (item.referenceName && item.referenceName.toLowerCase().includes(query)) ||
          (item.refName && item.refName.toLowerCase().includes(query)) ||
          (item.from && item.from.toLowerCase().includes(query)) ||
          (item.to && item.to.toLowerCase().includes(query)) ||
          (item.type && item.type.toLowerCase().includes(query)) ||
          (item.mode && item.mode.toLowerCase().includes(query)) ||
          (item.status && item.status.toLowerCase().includes(query)) ||
          (item.grNo && item.grNo.toString().toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.amount && item.amount.toString().includes(query));
        if (!match) return false;
      }

      return true;
    });

    // Update filter badge
    const badge = document.getElementById('received-current-filter-badge');
    if (badge) {
      if (this.selectedReceivedFY === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>All Financial Years (${this.filteredReceivedList.length} records)`;
      } else if (this.selectedReceivedType === 'ALL') {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedReceivedFY} &gt; <strong>All Types</strong> (${this.filteredReceivedList.length} records)`;
      } else {
        badge.innerHTML = `<i class="bi bi-funnel me-1 text-muted"></i>${this.selectedReceivedFY} &gt; <strong>${this.selectedReceivedType}</strong> (${this.filteredReceivedList.length} records)`;
      }
    }

    this.receivedCurrentPage = 1;
    this.renderReceivedTreeSidebar();
    this.renderReceivedTable();
  },

  renderReceivedTreeSidebar() {
    if (!this.allReceivedPayments) return;

    let grandTotal = 0;
    const fyTotals = {};
    const typeTotals = {}; // key: `${fy}_${type}`

    this.allReceivedPayments.forEach(r => {
      const amt = Number(r.amount) || 0;
      grandTotal += amt;

      const fy = r.fy || 'empty';
      fyTotals[fy] = (fyTotals[fy] || 0) + amt;

      if (r.type) {
        const tKey = `${fy}_${r.type}`;
        typeTotals[tKey] = (typeTotals[tKey] || 0) + amt;
      }
    });

    // Update Left Sidebar Badges
    const badgeAll = document.getElementById('received-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR(grandTotal)}`;

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const b = document.getElementById(`received-badge-${fy}`);
      if (b) b.textContent = `₹ ${this.formatINR(fyTotals[fy] || 0)}`;
    });

    // Also update Card 4 Badges on the main dashboard dynamically!
    const cardBadge26 = document.getElementById('card-received-badge-2026-2027');
    if (cardBadge26 && fyTotals['2026-2027']) cardBadge26.textContent = `₹ ${this.formatINR(fyTotals['2026-2027'])}`;
    const cardBadge25 = document.getElementById('card-received-badge-2025-2026');
    if (cardBadge25 && fyTotals['2025-2026']) cardBadge25.textContent = `₹ ${this.formatINR(fyTotals['2025-2026'])}`;
    const cardBadge24 = document.getElementById('card-received-badge-2024-2025');
    if (cardBadge24 && fyTotals['2024-2025']) cardBadge24.textContent = `₹ ${this.formatINR(fyTotals['2024-2025'])}`;

    // Active state highlighting on All & FY items
    const treeAll = document.getElementById('received-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedReceivedFY === 'ALL');
    }

    // Default authentic AppSheet type order
    const orderedTypes = [
      'Returned Other',
      'Returned Old',
      'Returned Loading',
      'Returned In Hand',
      'Returned Commission',
      'Returned Advance',
      'Other',
      'Old',
      'Commission',
      'Cash from MTC/TTC',
      'Advance'
    ];

    ['2026-2027', '2025-2026', '2024-2025'].forEach(fy => {
      const isExpanded = !!this.expandedReceivedFYs[fy];
      const sublistEl = document.getElementById(`received-sublist-${fy}`);
      const fyItemEl = document.getElementById(`received-tree-${fy}`);

      if (fyItemEl) {
        fyItemEl.classList.toggle('active', this.selectedReceivedFY === fy && this.selectedReceivedType === 'ALL');
        const caret = fyItemEl.querySelector('.received-tree-caret');
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
          
          // Get unique types for this FY
          const availableTypes = Array.from(new Set(
            this.allReceivedPayments.filter(r => r.fy === fy && r.type).map(r => r.type)
          ));

          // Sort according to preferred order, then remaining
          availableTypes.sort((a, b) => {
            const idxA = orderedTypes.indexOf(a);
            const idxB = orderedTypes.indexOf(b);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return a.localeCompare(b);
          });

          sublistEl.innerHTML = availableTypes.map(tKey => {
            const tTotal = typeTotals[`${fy}_${tKey}`] || 0;
            const isTypeActive = this.selectedReceivedFY === fy && this.selectedReceivedType === tKey;
            return `
              <div class="received-tree-item received-tree-subitem ${isTypeActive ? 'active' : ''}" onclick="LedgerModule.selectReceivedType('${fy}', '${tKey}')">
                <div class="d-flex align-items-center gap-1">
                  <span class="appsheet-bullet green-bullet" style="font-size: 11px;">●</span>
                  <span>${tKey}</span>
                </div>
                <span class="received-tree-badge">₹ ${this.formatINR(tTotal)}</span>
              </div>
            `;
          }).join('');
        }
      }
    });
  },

  toggleReceivedFYTree(fy) {
    this.expandedReceivedFYs[fy] = !this.expandedReceivedFYs[fy];
    this.renderReceivedTreeSidebar();
  },

  selectReceivedFY(fy) {
    this.selectedReceivedFY = fy;
    this.selectedReceivedType = 'ALL';
    if (fy !== 'ALL') {
      this.expandedReceivedFYs[fy] = true;
    }
    this.applyReceivedFilters();
  },

  selectReceivedType(fy, type) {
    this.selectedReceivedFY = fy;
    this.selectedReceivedType = type;
    if (fy !== 'ALL') {
      this.expandedReceivedFYs[fy] = true;
    }
    this.applyReceivedFilters();
  },

  selectReceivedAll() {
    this.selectedReceivedFY = 'ALL';
    this.selectedReceivedType = 'ALL';
    this.applyReceivedFilters();
  },

  toggleReceivedDateSidebar() {
    this.isReceivedSidebarHidden = !this.isReceivedSidebarHidden;
    const sidebar = document.getElementById('received-tree-sidebar');
    const btnText = document.getElementById('btn-toggle-received-text');
    const btnIcon = document.getElementById('btn-toggle-received-icon');

    if (sidebar) {
      if (this.isReceivedSidebarHidden) {
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

  renderReceivedTable() {
    const tbody = document.getElementById('received-tbody');
    if (!tbody) return;

    if (!this.filteredReceivedList || this.filteredReceivedList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No received payment records match the selected filter or search criteria.
            <div class="mt-2">
              <button type="button" class="btn btn-sm btn-outline-success" style="color: #0b8043; border-color: #0b8043;" onclick="LedgerModule.selectReceivedAll(); LedgerModule.clearSearch();">
                Reset Filters & Search
              </button>
            </div>
          </td>
        </tr>
      `;
      const pInfo = document.getElementById('received-pagination-info');
      if (pInfo) pInfo.textContent = 'Showing 0 records';
      const pBtns = document.getElementById('received-pagination-buttons');
      if (pBtns) pBtns.innerHTML = '';
      return;
    }

    // Pagination Calculation
    const totalCount = this.filteredReceivedList.length;
    let recordsToDisplay = this.filteredReceivedList;
    let totalPages = 1;

    if (this.receivedPageSize !== 'ALL') {
      const pSize = parseInt(this.receivedPageSize, 10);
      totalPages = Math.max(1, Math.ceil(totalCount / pSize));
      if (this.receivedCurrentPage > totalPages) this.receivedCurrentPage = totalPages;
      if (this.receivedCurrentPage < 1) this.receivedCurrentPage = 1;

      const startIndex = (this.receivedCurrentPage - 1) * pSize;
      const endIndex = Math.min(startIndex + pSize, totalCount);
      recordsToDisplay = this.filteredReceivedList.slice(startIndex, endIndex);

      const pInfo = document.getElementById('received-pagination-info');
      if (pInfo) pInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalCount} entries`;
    } else {
      const pInfo = document.getElementById('received-pagination-info');
      if (pInfo) pInfo.textContent = `Showing all ${totalCount} entries`;
    }

    // Pagination Buttons
    const pBtns = document.getElementById('received-pagination-buttons');
    if (pBtns) {
      if (this.receivedPageSize === 'ALL' || totalPages <= 1) {
        pBtns.innerHTML = '';
      } else {
        let btnsHtml = `
          <button type="button" class="btn btn-outline-secondary ${this.receivedCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeReceivedPage(${this.receivedCurrentPage - 1})">Prev</button>
        `;
        const startP = Math.max(1, this.receivedCurrentPage - 2);
        const endP = Math.min(totalPages, this.receivedCurrentPage + 2);
        for (let p = startP; p <= endP; p++) {
          btnsHtml += `
            <button type="button" class="btn ${p === this.receivedCurrentPage ? 'text-white' : 'btn-outline-secondary'}" style="${p === this.receivedCurrentPage ? 'background-color: #0b8043; border-color: #0b8043;' : ''}" onclick="LedgerModule.changeReceivedPage(${p})">${p}</button>
          `;
        }
        btnsHtml += `
          <button type="button" class="btn btn-outline-secondary ${this.receivedCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeReceivedPage(${this.receivedCurrentPage + 1})">Next</button>
        `;
        pBtns.innerHTML = btnsHtml;
      }
    }

    // Grouping by Type (AppSheet screenshot structure)
    const grouped = new Map();
    recordsToDisplay.forEach(item => {
      const tKey = item.type || 'Other';
      if (!grouped.has(tKey)) {
        grouped.set(tKey, []);
      }
      grouped.get(tKey).push(item);
    });

    let html = '';
    grouped.forEach((items, typeKey) => {
      const groupSum = items.reduce((acc, x) => acc + (Number(x.amount) || 0), 0);

      // Authentic AppSheet Group Header (● Type ₹Total with light gray pill badge)
      html += `
        <tr class="received-type-group-row">
          <td colspan="11" style="background: #ffffff; padding: 10px 14px; border-bottom: 1px solid #e0e0e0;">
            <span class="appsheet-bullet green-bullet" style="color: #00b11f; font-size: 13px;">●</span>
            <span class="fw-bold me-2 group-header-type" style="color: #0b8043; font-size: 13px;">${typeKey}</span>
            <span class="received-tree-badge" style="background: #f1f3f4; color: #5f6368; border: 1px solid #dadce0; border-radius: 12px; padding: 2px 10px; font-size: 11.5px; font-weight: 500;">₹${this.formatINR(groupSum)}</span>
          </td>
        </tr>
      `;

      // Data Rows - Authentic AppSheet Columns matching original crop:
      // G.R.No. | Truck No. | To | Amount | Mode | Type | Owner | Depositor | Description | Received Date | >
      items.forEach(r => {
        const isSelected = this.activeReceivedPaymentId === r.id;
        const recDate = r.receivedDate || r.displayDate || r.date || '';
        html += `
          <tr class="received-data-row ${isSelected ? 'active' : ''}" id="rec-row-${r.id}" onclick="LedgerModule.openReceivedPaymentDetails('${r.id}')">
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.grNo || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.truckNo || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.to || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span class="fw-bold">₹ ${this.formatINR(r.amount)}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.mode || ''}</span>
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.type || ''}</span>
            </td>
            <td class="text-truncate" style="max-width: 150px;" title="${r.owner || ''}">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.owner || ''}</span>
            </td>
            <td class="text-truncate" style="max-width: 170px;" title="${r.depositor || ''}">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.depositor || ''}</span>
            </td>
            <td class="text-truncate" style="max-width: 170px;" title="${r.description || ''}">
              ${r.description ? `<span class="appsheet-bullet green-bullet">●</span><span>${r.description}</span>` : ''}
            </td>
            <td>
              <span class="appsheet-bullet green-bullet">●</span>
              <span class="fw-medium">${recDate}</span>
            </td>
            <td class="text-center" style="font-size: 11px; color: #5f6368;"><i class="bi bi-chevron-right"></i></td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  openReceivedPaymentDetails(recordId) {
    this.activeReceivedPaymentId = recordId;
    const r = (this.allReceivedPayments || []).find(x => x.id === recordId);
    if (!r) return;

    // Highlight row in table
    const allRows = document.querySelectorAll('.received-data-row');
    allRows.forEach(row => row.classList.remove('active'));
    const targetRow = document.getElementById(`rec-row-${recordId}`);
    if (targetRow) targetRow.classList.add('active');

    // Show side panel and activate split-open mode
    const panel = document.getElementById('panel-received-details');
    const splitWrapper = document.getElementById('received-split-wrapper');
    if (panel) panel.classList.remove('d-none');
    if (splitWrapper) splitWrapper.classList.add('split-open');

    const content = document.getElementById('received-panel-content');
    if (!content) return;

    const recDate = r.receivedDate || r.displayDate || r.date || '-';
    const ownerName = r.owner || '-';
    const refName = r.referenceName || r.refName || (ownerName !== '-' ? ownerName : '-');
    const depositorName = r.depositor || '-';
    const grNo = r.grNo || '-';
    const transport = r.transport || 'TTC';
    const fromCity = r.from || '-';
    const toCity = r.to || '-';
    const recType = r.type || '-';
    const status = r.status || 'Paid';
    const amountStr = `₹${this.formatINR(r.amount)}`;
    const mode = r.mode || '-';
    const desc = r.description || '-';

    content.innerHTML = `
      <div class="p-3">
        <div class="received-detail-card shadow-sm" style="border: 1px solid #dadce0; border-radius: 4px; padding: 22px 20px; background: #ffffff;">
          <div class="received-field-row">
            <span class="received-field-label">Received Date</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${recDate}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Truck No.</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${r.truckNo || '-'}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Owner</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${ownerName}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Reference Name</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${refName}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Depositor</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${depositorName}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">G.R.No.</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${grNo}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Transport</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${transport}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">From</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${fromCity}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">To</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${toCity}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Type</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${recType}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Status</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${status}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Amount</span>
            <span class="received-field-value fs-6 fw-bold">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${amountStr}</span>
            </span>
          </div>
          <div class="received-field-row">
            <span class="received-field-label">Mode</span>
            <span class="received-field-value">
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${mode}</span>
            </span>
          </div>
          <div class="received-field-row mb-0">
            <span class="received-field-label">Description</span>
            <span class="received-field-value">
              ${desc !== '-' ? `<span class="appsheet-bullet green-bullet">●</span><span>${desc}</span>` : '-'}
            </span>
          </div>
        </div>
      </div>
    `;
  },

  closeReceivedPaymentDetails() {
    this.activeReceivedPaymentId = null;
    const panel = document.getElementById('panel-received-details');
    const splitWrapper = document.getElementById('received-split-wrapper');
    if (panel) {
      panel.classList.add('d-none');
      panel.classList.remove('fullscreen');
    }
    if (splitWrapper) splitWrapper.classList.remove('split-open');

    this.isReceivedPanelFullscreen = false;
    const btnExpand = document.getElementById('btn-expand-received-panel');
    if (btnExpand) btnExpand.textContent = '↗';

    const allRows = document.querySelectorAll('.received-data-row');
    allRows.forEach(row => row.classList.remove('active'));
  },

  toggleReceivedDetailFullscreen() {
    this.isReceivedPanelFullscreen = !this.isReceivedPanelFullscreen;
    const panel = document.getElementById('panel-received-details');
    const btnExpand = document.getElementById('btn-expand-received-panel');
    if (panel) {
      panel.classList.toggle('fullscreen', this.isReceivedPanelFullscreen);
    }
    if (btnExpand) {
      btnExpand.textContent = this.isReceivedPanelFullscreen ? '↙' : '↗';
    }
  },

  prevReceivedPaymentRecord() {
    if (!this.activeReceivedPaymentId || !this.filteredReceivedList.length) return;
    const currentIndex = this.filteredReceivedList.findIndex(x => x.id === this.activeReceivedPaymentId);
    if (currentIndex > 0) {
      this.openReceivedPaymentDetails(this.filteredReceivedList[currentIndex - 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('First record reached', 'info');
    }
  },

  nextReceivedPaymentRecord() {
    if (!this.activeReceivedPaymentId || !this.filteredReceivedList.length) return;
    const currentIndex = this.filteredReceivedList.findIndex(x => x.id === this.activeReceivedPaymentId);
    if (currentIndex >= 0 && currentIndex < this.filteredReceivedList.length - 1) {
      this.openReceivedPaymentDetails(this.filteredReceivedList[currentIndex + 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Last record reached', 'info');
    }
  },

  toggleReceivedFullscreen() {
    const el = document.getElementById('ledger-view-received');
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

  changeReceivedPageSize(size) {
    this.receivedPageSize = size;
    this.receivedCurrentPage = 1;
    this.renderReceivedTable();
  },

  changeReceivedPage(page) {
    this.receivedCurrentPage = page;
    this.renderReceivedTable();
    const tableWrap = document.getElementById('received-table-wrapper');
    if (tableWrap) tableWrap.scrollTop = 0;
  },

  openAddIncomeRecordModal() {
    this.modalIncomeStatus = 'Paid';
    this.modalIncomeMode = 'Cash';

    const form = document.getElementById('form-add-income-record');
    if (form) form.reset();

    const dateInput = document.getElementById('inc-date');
    if (dateInput) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    const amtInput = document.getElementById('inc-amount');
    if (amtInput) amtInput.value = '';

    const descInput = document.getElementById('inc-description');
    if (descInput) descInput.value = '';

    this.setIncomeStatus('Paid');
    this.setIncomeMode('Cash');

    const modalEl = document.getElementById('modal-add-income-record');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  setIncomeStatus(status) {
    this.modalIncomeStatus = status;
    const btnPaid = document.getElementById('btn-inc-status-paid');
    const btnDue = document.getElementById('btn-inc-status-due');

    if (status === 'Paid') {
      btnPaid?.classList.add('active');
      btnDue?.classList.remove('active');
    } else {
      btnPaid?.classList.remove('active');
      btnDue?.classList.add('active');
    }
  },

  setIncomeMode(mode, btnEl = null) {
    this.modalIncomeMode = mode;
    const container = document.getElementById('inc-mode-pill-container');
    if (container) {
      const pills = container.querySelectorAll('.btn-mode-pill');
      pills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-mode') === mode);
      });
    }
  },

  async saveIncomeRecord() {
    const dateVal = document.getElementById('inc-date')?.value?.trim();
    const amountVal = parseFloat(document.getElementById('inc-amount')?.value);
    const typeVal = document.getElementById('inc-type')?.value?.trim() || 'Returned Loading';
    const truckNoVal = document.getElementById('inc-truck-no')?.value?.trim() || '';
    const fromVal = document.getElementById('inc-from')?.value?.trim() || '';
    const toVal = document.getElementById('inc-to')?.value?.trim() || '';
    const depositorTypeVal = document.getElementById('inc-depositor-type')?.value?.trim() || 'Driver';
    const depositorVal = document.getElementById('inc-depositor')?.value?.trim() || '';
    const descVal = document.getElementById('inc-description')?.value?.trim() || '';

    if (!dateVal) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please select a valid date', 'warning');
      return;
    }
    if (isNaN(amountVal) || amountVal <= 0) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter a valid amount', 'warning');
      return;
    }

    const [y, m, d] = dateVal.split('-');
    const displayDate = `${d}/${m}/${y}`;
    const monthNum = parseInt(m, 10);
    const yearNum = parseInt(y, 10);

    const fy = monthNum >= 4 ? `${yearNum}-${yearNum + 1}` : `${yearNum - 1}-${yearNum}`;
    const monthMap = {
      4: '1 Apr', 5: '2 May', 6: '3 Jun', 7: '4 Jul', 8: '5 Aug', 9: '6 Sep',
      10: '7 Oct', 11: '8 Nov', 12: '9 Dec', 1: '10 Jan', 2: '11 Feb', 3: '12 Mar'
    };
    const monthKey = monthMap[monthNum] || '7 Oct';

    const newRecord = {
      id: `REC_MANUAL_${Date.now()}`,
      date: dateVal,
      displayDate,
      receivedDate: displayDate,
      amount: amountVal,
      type: typeVal,
      depositor: depositorVal,
      depositorType: depositorTypeVal,
      truckNo: truckNoVal,
      owner: depositorTypeVal === 'Truck Owner' ? depositorVal : (depositorVal || '-'),
      referenceName: depositorTypeVal === 'Reference' ? depositorVal : '',
      refName: depositorTypeVal === 'Reference' ? depositorVal : '',
      grNo: '',
      transport: 'TTC',
      from: fromVal,
      to: toVal,
      mode: this.modalIncomeMode || 'Cash',
      status: this.modalIncomeStatus || 'Paid',
      description: descVal,
      fy,
      monthKey
    };

    if (typeof dbService !== 'undefined') {
      try {
        await dbService.add('receivedPayments', newRecord);
      } catch (err) {
        console.error('Failed to save to dbService:', err);
      }
    }

    if (!Array.isArray(this.allReceivedPayments)) {
      this.allReceivedPayments = [];
    }
    this.allReceivedPayments.unshift(newRecord);

    // Close modal
    const modalEl = document.getElementById('modal-add-income-record');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }

    // Switch view to received view, select this FY and type
    this.mainViewMode = 'received';
    this.selectedReceivedFY = fy;
    this.selectedReceivedType = typeVal;
    this.expandedReceivedFYs[fy] = true;

    this.applyReceivedFilters();
    this.renderCurrentView();

    // Open detail panel for the new record
    this.openReceivedPaymentDetails(newRecord.id);

    if (typeof AppUI !== 'undefined') {
      AppUI.showToast(`Income Record of ₹ ${this.formatINR(amountVal)} saved successfully!`, 'success');
    }
  },

  // ----------------------------------------------------
  // OPEN DEBTS (AppSheet Master-Detail Dual Pane) METHODS
  // ----------------------------------------------------
  toggleOpenDebtsSidebar() {
    const sb = document.getElementById('open-debts-tree-sidebar');
    if (!sb) return;
    this.isOpenDebtsSidebarHidden = !this.isOpenDebtsSidebarHidden;
    sb.classList.toggle('collapsed', this.isOpenDebtsSidebarHidden);
    const btnText = document.getElementById('btn-toggle-open-text');
    const btnIcon = document.getElementById('btn-toggle-open-icon');
    if (btnText) btnText.innerText = this.isOpenDebtsSidebarHidden ? 'Show Date Filter' : 'Hide Date Filter';
    if (btnIcon) btnIcon.className = this.isOpenDebtsSidebarHidden ? 'bi bi-layout-sidebar' : 'bi bi-layout-sidebar-inset';
  },

  toggleOpenDebtsFYTree(fy) {
    this.expandedOpenDebtsFYs[fy] = !this.expandedOpenDebtsFYs[fy];
    this.renderOpenDebtsTreeSidebar();
  },

  selectOpenDebtsFY(fy) {
    this.selectedOpenDebtsFY = fy;
    this.selectedOpenDebtsDate = null;
    this.openDebtsCurrentPage = 1;
    if (fy !== 'ALL') {
      this.expandedOpenDebtsFYs[fy] = true;
    }
    this.applyOpenDebtsFilters();
    this.renderOpenDebtsTreeSidebar();
    this.renderOpenDebtsTable();
  },

  selectOpenDebtsDate(fy, date) {
    this.selectedOpenDebtsFY = fy;
    this.selectedOpenDebtsDate = date;
    this.openDebtsCurrentPage = 1;
    this.applyOpenDebtsFilters();
    this.renderOpenDebtsTreeSidebar();
    this.renderOpenDebtsTable();
  },

  renderOpenDebtsTreeSidebar() {
    if (!this.allDebts) return;
    const fyList = [
      '2026-2027', '2025-2026', '2024-2025', '2023-2024',
      '2022-2023', '2021-2022', '2020-2021', '2019-2020'
    ];
    let grandTotal = 0;
    const fyTotals = {};
    const dateTotals = {};
    const dateCounts = {};

    fyList.forEach(fy => { fyTotals[fy] = 0; });

    this.allDebts.forEach(d => {
      const due = Number(d.dueAmount) || 0;
      if (due <= 0) return; // Only open/pending due
      grandTotal += due;
      if (fyTotals.hasOwnProperty(d.fy)) {
        fyTotals[d.fy] += due;
      }
      const dKey = d.displayDate || d.date || 'Undated';
      const key = `${d.fy}_${dKey}`;
      dateTotals[key] = (dateTotals[key] || 0) + due;
      dateCounts[key] = (dateCounts[key] || 0) + 1;
    });

    const badgeAll = document.getElementById('open-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR(grandTotal)}`;

    const treeAll = document.getElementById('open-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedOpenDebtsFY === 'ALL');
    }

    fyList.forEach(fy => {
      const b = document.getElementById(`open-badge-${fy}`);
      if (b) b.textContent = `₹ ${this.formatINR(fyTotals[fy] || 0)}`;

      const item = document.getElementById(`open-tree-${fy}`);
      if (item) {
        item.classList.toggle('active', this.selectedOpenDebtsFY === fy && !this.selectedOpenDebtsDate);
      }

      const caret = document.getElementById(`open-caret-${fy}`);
      const isExp = !!this.expandedOpenDebtsFYs[fy];
      if (caret) caret.className = isExp ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill';

      const sub = document.getElementById(`open-sublist-${fy}`);
      if (sub) {
        if (isExp) {
          sub.classList.remove('d-none');
          const datesInFY = [];
          Object.keys(dateTotals).forEach(k => {
            if (k.startsWith(`${fy}_`)) {
              const dStr = k.replace(`${fy}_`, '');
              datesInFY.push({ date: dStr, total: dateTotals[k], count: dateCounts[k] });
            }
          });

          // Sort dates descending
          datesInFY.sort((a, b) => {
            const p = s => {
              const pts = s.split('/');
              if (pts.length === 3) return new Date(`${pts[2]}-${pts[1]}-${pts[0]}`);
              return new Date(s);
            };
            return p(b.date) - p(a.date);
          });

          let subHtml = '';
          datesInFY.forEach(item => {
            const isActive = this.selectedOpenDebtsFY === fy && this.selectedOpenDebtsDate === item.date;
            subHtml += `
              <div class="open-debts-tree-subitem ${isActive ? 'active' : ''}" onclick="LedgerModule.selectOpenDebtsDate('${fy}', '${item.date}')">
                <span>${item.date} (${item.count})</span>
                <span class="open-debts-tree-badge">₹ ${this.formatINR(item.total)}</span>
              </div>
            `;
          });
          sub.innerHTML = subHtml;
        } else {
          sub.classList.add('d-none');
          sub.innerHTML = '';
        }
      }

      const cardBadge = document.getElementById(`card-open-badge-${fy}`);
      if (cardBadge) cardBadge.textContent = `₹ ${this.formatINR(fyTotals[fy] || 0)}`;
    });
  },

  applyOpenDebtsFilters() {
    if (!this.allDebts) {
      this.filteredOpenDebtsList = [];
      return;
    }
    const q = (this.searchQuery || '').trim().toLowerCase();

    this.filteredOpenDebtsList = this.allDebts.filter(d => {
      // Must be open / due > 0
      const due = Number(d.dueAmount) || 0;
      if (due <= 0) return false;

      // FY filter
      if (this.selectedOpenDebtsFY !== 'ALL') {
        if (d.fy !== this.selectedOpenDebtsFY) return false;
      }

      // Date filter
      if (this.selectedOpenDebtsDate) {
        const itemDate = d.displayDate || d.date || '';
        if (itemDate !== this.selectedOpenDebtsDate) return false;
      }

      // Dropdown filters
      if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return false;
      if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return false;
      if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return false;

      // Search query
      if (q) {
        const matchGR = String(d.grNo || '').toLowerCase().includes(q);
        const matchTruck = String(d.truckNo || '').toLowerCase().includes(q);
        const matchBorrower = String(d.borrowerName || '').toLowerCase().includes(q);
        const matchReceiver = String(d.receiverName || '').toLowerCase().includes(q);
        const matchOwner = String(d.truckOwner || '').toLowerCase().includes(q);
        const matchCompany = String(d.company || '').toLowerCase().includes(q);
        const matchType = String(d.debtType || '').toLowerCase().includes(q);
        const matchFrom = String(d.from || '').toLowerCase().includes(q);
        const matchTo = String(d.to || '').toLowerCase().includes(q);
        const matchDesc = String(d.description || '').toLowerCase().includes(q);
        const matchAmt = String(d.dueAmount || '').includes(q) || String(d.debtAmount || '').includes(q);
        if (!matchGR && !matchTruck && !matchBorrower && !matchReceiver && !matchOwner && !matchCompany && !matchType && !matchFrom && !matchTo && !matchDesc && !matchAmt) {
          return false;
        }
      }

      return true;
    });

    // Sort descending by date, then id
    this.filteredOpenDebtsList.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.id || '').localeCompare(String(a.id || ''));
    });
  },

  renderOpenDebtsTable() {
    const tbody = document.getElementById('open-debts-table-body');
    if (!tbody) return;

    // Update filter pill in toolbar
    const pillText = document.getElementById('open-debts-filter-pill-text');
    if (pillText) {
      if (this.selectedOpenDebtsFY === 'ALL') {
        pillText.innerText = 'All Years';
      } else if (this.selectedOpenDebtsDate) {
        pillText.innerText = `${this.selectedOpenDebtsFY} > ${this.selectedOpenDebtsDate}`;
      } else {
        pillText.innerText = this.selectedOpenDebtsFY;
      }
    }

    if (!this.filteredOpenDebtsList || this.filteredOpenDebtsList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No open debt records match the selected filter or search criteria.
          </td>
        </tr>
      `;
      this.renderOpenDebtsPagination(0);
      return;
    }

    // Pagination slice
    const total = this.filteredOpenDebtsList.length;
    let pageItems = this.filteredOpenDebtsList;
    if (this.openDebtsPageSize !== 'ALL') {
      const sz = Number(this.openDebtsPageSize) || 100;
      const start = (this.openDebtsCurrentPage - 1) * sz;
      pageItems = this.filteredOpenDebtsList.slice(start, start + sz);
    }

    // Group pageItems by date
    const dateGroups = new Map();
    pageItems.forEach(item => {
      const dKey = item.displayDate || item.date || 'Undated';
      if (!dateGroups.has(dKey)) {
        dateGroups.set(dKey, []);
      }
      dateGroups.get(dKey).push(item);
    });

    let html = '';
    dateGroups.forEach((groupItems, dateKey) => {
      const groupDue = groupItems.reduce((sum, i) => sum + (Number(i.dueAmount) || 0), 0);

      // Date Group Header
      html += `
        <tr class="open-debts-group-row">
          <td colspan="12">
            <span class="gold-bullet">●</span>
            <span class="fw-bold">${dateKey} (${groupItems.length})</span>
            <span class="appsheet-drill-badge ms-2">₹ ${this.formatINR(groupDue)}</span>
          </td>
        </tr>
      `;

      // Data Rows
      groupItems.forEach(d => {
        const debtAmt = Number(d.debtAmount) || 0;
        const dueAmt = Number(d.dueAmount) || 0;
        const totalRet = Number(d.totalReturned) || 0;

        // Dynamic Color Logic:
        // - Gold (#8d6e32) when due == debt (unpaid)
        // - Blue (#1a73e8) when 0 < due < debt (partially returned, as seen in 29/09/2025 803_MTC)
        // - Green (#0b8043) when due == 0 (settled)
        let rowClass = 'open-debts-row-gold';
        let bulletColor = '#8d6e32';
        if (dueAmt === 0) {
          rowClass = 'open-debts-row-green';
          bulletColor = '#0b8043';
        } else if (totalRet > 0 && dueAmt < debtAmt) {
          rowClass = 'open-debts-row-blue';
          bulletColor = '#1a73e8';
        }

        const isActive = this.activeOpenDebtId === d.id ? 'active' : '';

        html += `
          <tr class="open-debts-data-row ${rowClass} ${isActive}" onclick="LedgerModule.openOpenDebtDetails('${d.id}')" data-debt-id="${d.id}">
            <!-- 1. G.R.No. -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.grNo || '-'}</td>
            <!-- 2. Truck No. -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.truckNo || '-'}</td>
            <!-- 3. To -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.to || '-'}</td>
            <!-- 4. Debt Type -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.debtType || '-'}</td>
            <!-- 5. Due Amount (Always Red bullet and red bold text) -->
            <td class="td-due-amount"><span class="appsheet-bullet" style="color: #d93025;">●</span> ₹ ${this.formatINR(dueAmt)}</td>
            <!-- 6. Debt Amount -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ₹ ${this.formatINR(debtAmt)}</td>
            <!-- 7. Debt Mode -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.debtMode || '-'}</td>
            <!-- 8. Borrower Name -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.borrowerName || '-'}</td>
            <!-- 9. Receiver Name -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.receiverName || '-'}</td>
            <!-- 10. Description -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.description || ''}</td>
            <!-- 11. Date -->
            <td><span class="appsheet-bullet" style="color: ${bulletColor};">●</span> ${d.displayDate || d.date || '-'}</td>
            <!-- 12. Chevron -->
            <td class="text-center text-muted"><span class="appsheet-chevron">&gt;</span></td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
    this.renderOpenDebtsPagination(total);
  },

  renderOpenDebtsPagination(total) {
    const info = document.getElementById('open-debts-pagination-info');
    const container = document.getElementById('open-debts-pagination-buttons');
    if (!info || !container) return;

    if (this.openDebtsPageSize === 'ALL' || total === 0) {
      info.innerText = `Showing all ${total} entries`;
      container.innerHTML = '';
      return;
    }

    const sz = Number(this.openDebtsPageSize) || 100;
    const totalPages = Math.ceil(total / sz);
    const start = (this.openDebtsCurrentPage - 1) * sz + 1;
    const end = Math.min(start + sz - 1, total);

    info.innerText = `Showing ${start}-${end} of ${total} entries (Page ${this.openDebtsCurrentPage} of ${totalPages})`;

    let html = `
      <button class="btn btn-outline-secondary" ${this.openDebtsCurrentPage === 1 ? 'disabled' : ''} onclick="LedgerModule.changeOpenDebtsPage(${this.openDebtsCurrentPage - 1})">
        &lt;
      </button>
    `;

    const startP = Math.max(1, this.openDebtsCurrentPage - 2);
    const endP = Math.min(totalPages, startP + 4);

    for (let p = startP; p <= endP; p++) {
      html += `
        <button class="btn ${p === this.openDebtsCurrentPage ? 'btn-primary' : 'btn-outline-secondary'}" onclick="LedgerModule.changeOpenDebtsPage(${p})">
          ${p}
        </button>
      `;
    }

    html += `
      <button class="btn btn-outline-secondary" ${this.openDebtsCurrentPage === totalPages ? 'disabled' : ''} onclick="LedgerModule.changeOpenDebtsPage(${this.openDebtsCurrentPage + 1})">
        &gt;
      </button>
    `;

    container.innerHTML = html;
  },

  changeOpenDebtsPage(p) {
    this.openDebtsCurrentPage = p;
    this.renderOpenDebtsTable();
    const w = document.getElementById('open-debts-table-wrapper');
    if (w) w.scrollTop = 0;
  },

  changeOpenDebtsPageSize(val) {
    this.openDebtsPageSize = val;
    this.openDebtsCurrentPage = 1;
    this.renderOpenDebtsTable();
  },

  openOpenDebtDetails(debtId) {
    this.activeOpenDebtId = debtId;
    const debt = this.allDebts.find(d => String(d.id) === String(debtId));
    if (!debt) return;

    // Show side panel and add split-open class
    const panel = document.getElementById('open-debts-panel');
    const wrapper = document.getElementById('open-debts-split-wrapper');
    if (panel) panel.classList.remove('d-none');
    if (wrapper) wrapper.classList.add('split-open');

    // Highlight row
    document.querySelectorAll('.open-debts-data-row').forEach(tr => {
      tr.classList.toggle('active', tr.getAttribute('data-debt-id') === String(debtId));
    });

    // Populate Card 1: 12 fields
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val || '-';
    };

    setVal('det-debt-type', debt.debtType || '-');
    setVal('det-debt-date', debt.displayDate || debt.date || '-');
    setVal('det-debt-owner', debt.truckOwner || debt.borrowerName || '-');
    setVal('det-debt-gr', debt.grNo || '-');
    setVal('det-debt-company', debt.company || '-');
    setVal('det-debt-from', debt.from || '-');
    setVal('det-debt-to', debt.to || '-');
    setVal('det-debt-borrower', debt.borrowerName || '-');
    setVal('det-debt-receiver', debt.receiverName || '-');
    setVal('det-debt-mode', debt.debtMode || '-');
    setVal('det-debt-amount', `₹ ${this.formatINR(debt.debtAmount || 0)}`);
    setVal('det-due-amount', `₹ ${this.formatINR(debt.dueAmount || 0)}`);

    // Populate Card 2: Returned Amount [count]
    const returns = Array.isArray(debt.returnedAmounts) ? debt.returnedAmounts : [];
    const headerEl = document.getElementById('det-returned-header');
    if (headerEl) headerEl.innerText = `Returned Amount [${returns.length}]`;

    const listEl = document.getElementById('det-returned-list');
    if (listEl) {
      if (returns.length === 0) {
        listEl.innerHTML = `
          <div class="text-muted small p-3 text-center border rounded bg-light">
            No return payments recorded yet. Click '+ Add' to record a return amount.
          </div>
        `;
      } else {
        let retHtml = '';
        returns.forEach((r, idx) => {
          retHtml += `
            <div class="returned-history-item">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="fw-bold text-dark">#${idx + 1} - ${r.displayDate || r.date || '-'}</span>
                <span class="fw-bold text-success">₹ ${this.formatINR(r.amount || 0)}</span>
              </div>
              <div class="text-secondary small">
                <span>Mode: <strong>${r.mode || r.returnMode || 'Cash'}</strong></span>
                ${r.depositorName ? ` &bull; By: <strong>${r.depositorName}</strong>` : ''}
              </div>
              ${r.description || r.remarks ? `<div class="text-muted small fst-italic mt-1">${r.description || r.remarks}</div>` : ''}
            </div>
          `;
        });
        listEl.innerHTML = retHtml;
      }
    }
  },

  closeOpenDebtDetails() {
    this.activeOpenDebtId = null;
    const panel = document.getElementById('open-debts-panel');
    const wrapper = document.getElementById('open-debts-split-wrapper');
    if (panel) panel.classList.add('d-none');
    if (wrapper) wrapper.classList.remove('split-open');
    document.querySelectorAll('.open-debts-data-row').forEach(tr => tr.classList.remove('active'));
  },

  toggleOpenPanelFullscreen() {
    const panel = document.getElementById('open-debts-panel');
    if (panel) panel.classList.toggle('fullscreen');
  },

  toggleOpenDebtsFullscreen() {
    const main = document.getElementById('open-debts-main-container');
    if (main) main.classList.toggle('fullscreen');
  },

  editCurrentOpenDebt() {
    if (!this.activeOpenDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.activeOpenDebtId));
    if (!debt) return;

    document.getElementById('debt-form-id').value = debt.id;
    document.getElementById('debt-form-date').value = debt.date || '';
    document.getElementById('debt-form-type').value = debt.debtType || 'Diesel';
    document.getElementById('debt-form-company').value = debt.company || 'MTC';
    document.getElementById('debt-form-gr').value = debt.grNo || '';
    document.getElementById('debt-form-truck').value = debt.truckNo || '';
    document.getElementById('debt-form-fy').value = debt.fy || '2026-2027';
    document.getElementById('debt-form-from').value = debt.from || '';
    document.getElementById('debt-form-to').value = debt.to || '';
    document.getElementById('debt-form-owner').value = debt.truckOwner || '';
    document.getElementById('debt-form-amount').value = debt.debtAmount || '';
    document.getElementById('debt-form-mode').value = debt.debtMode || 'Cash';
    document.getElementById('debt-form-borrower').value = debt.borrowerName || '';
    document.getElementById('debt-form-receiver').value = debt.receiverName || '';
    document.getElementById('debt-form-desc').value = debt.description || '';

    const titleEl = document.getElementById('add-debt-modal-title');
    if (titleEl) titleEl.innerText = 'Edit Debt Record';

    const modalEl = document.getElementById('modal-add-debt');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  async deleteCurrentOpenDebt() {
    if (!this.activeOpenDebtId) return;
    if (!confirm('Are you sure you want to delete this debt record?')) return;
    try {
      await dbService.delete('debts', this.activeOpenDebtId);
      this.allDebts = await dbService.getAll('debts');
      this.closeOpenDebtDetails();
      this.applyOpenDebtsFilters();
      this.renderOpenDebtsTreeSidebar();
      this.renderOpenDebtsTable();
      if (typeof AppUI !== 'undefined') {
        AppUI.showToast('Debt record deleted successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      if (typeof AppUI !== 'undefined') AppUI.showToast('Failed to delete debt: ' + err.message, 'error');
    }
  },

  openRecordReturnModalForCurrentDebt() {
    if (!this.activeOpenDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.activeOpenDebtId));
    if (!debt) return;

    document.getElementById('return-debt-id').value = debt.id;
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('return-date').value = today;
    document.getElementById('return-depositor-name').value = debt.borrowerName || '';
    document.getElementById('return-modal-debt-amount').value = `₹ ${this.formatINR(debt.debtAmount || 0)}`;
    document.getElementById('return-modal-due').value = `₹ ${this.formatINR(debt.dueAmount || 0)}`;
    document.getElementById('return-amount').value = debt.dueAmount || '';
    document.getElementById('return-remarks').value = '';

    // Reset return mode pill to Cash
    this.modalReturnMode = 'Cash';
    document.getElementById('return-mode').value = 'Cash';
    document.querySelectorAll('#return-mode-pill-container .btn-mode-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === 'Cash');
    });

    const modalEl = document.getElementById('modal-record-return');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  setReturnMode(mode, btn) {
    this.modalReturnMode = mode;
    document.getElementById('return-mode').value = mode;
    document.querySelectorAll('#return-mode-pill-container .btn-mode-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  },

  async submitReturnPayment() {
    const debtId = document.getElementById('return-debt-id').value;
    const dateVal = document.getElementById('return-date').value;
    const amtVal = parseFloat(document.getElementById('return-amount').value);
    const modeVal = document.getElementById('return-mode').value || 'Cash';
    const depType = document.getElementById('return-depositor-type').value || 'Driver';
    const depName = document.getElementById('return-depositor-name').value || '';
    const descVal = document.getElementById('return-remarks').value || '';

    if (!amtVal || isNaN(amtVal) || amtVal <= 0) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter a valid return amount', 'warning');
      return;
    }

    try {
      await dbService.recordReturnedAmount(debtId, {
        date: dateVal,
        amount: amtVal,
        returnMode: modeVal,
        depositorType: depType,
        depositorName: depName,
        description: descVal
      });

      // Reload dataset
      this.allDebts = await dbService.getAll('debts');

      const modalEl = document.getElementById('modal-record-return');
      if (modalEl && typeof bootstrap !== 'undefined') {
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }

      if (this.mainViewMode === 'all-debts') {
        this.applyAllDebtsFilters();
        this.renderAllDebtsTreeSidebar();
        this.renderAllDebtsTable();
        this.openAllDebtDetails(debtId);
      } else {
        this.applyOpenDebtsFilters();
        this.renderOpenDebtsTreeSidebar();
        this.renderOpenDebtsTable();
        this.openOpenDebtDetails(debtId);
      }

      if (typeof AppUI !== 'undefined') {
        AppUI.showToast(`Returned payment of ₹ ${this.formatINR(amtVal)} recorded successfully!`, 'success');
      }
    } catch (err) {
      console.error(err);
      if (typeof AppUI !== 'undefined') AppUI.showToast('Failed to record return: ' + err.message, 'error');
    }
  },

  // ----------------------------------------------------
  // ALL DEBTS (Google AppSheet Master-Detail Dual Pane) METHODS
  // ----------------------------------------------------
  toggleAllDebtsSidebar() {
    const sb = document.getElementById('all-debts-tree-sidebar');
    if (!sb) return;
    this.isAllDebtsSidebarHidden = !this.isAllDebtsSidebarHidden;
    sb.classList.toggle('collapsed', this.isAllDebtsSidebarHidden);
    const btnText = document.getElementById('btn-toggle-all-text');
    const btnIcon = document.getElementById('btn-toggle-all-icon');
    if (btnText) btnText.innerText = this.isAllDebtsSidebarHidden ? 'Show Date Filter' : 'Hide Date Filter';
    if (btnIcon) btnIcon.className = this.isAllDebtsSidebarHidden ? 'bi bi-layout-sidebar' : 'bi bi-layout-sidebar-inset';
  },

  toggleAllDebtsFYTree(fy) {
    this.expandedAllDebtsFYs[fy] = !this.expandedAllDebtsFYs[fy];
    this.renderAllDebtsTreeSidebar();
  },

  selectAllDebtsFY(fy) {
    this.selectedAllDebtsFY = fy;
    this.selectedAllDebtsDate = null;
    this.allDebtsCurrentPage = 1;
    if (fy !== 'ALL') {
      this.expandedAllDebtsFYs[fy] = true;
    }
    this.applyAllDebtsFilters();
    this.renderAllDebtsTreeSidebar();
    this.renderAllDebtsTable();
  },

  selectAllDebtsDate(fy, date) {
    this.selectedAllDebtsFY = fy;
    this.selectedAllDebtsDate = date;
    this.allDebtsCurrentPage = 1;
    this.applyAllDebtsFilters();
    this.renderAllDebtsTreeSidebar();
    this.renderAllDebtsTable();
  },

  renderAllDebtsTreeSidebar() {
    if (!this.allDebts) return;
    const fyList = [
      '2026-2027', '2025-2026', '2024-2025', '2023-2024',
      '2022-2023', '2021-2022', '2020-2021', '2019-2020'
    ];
    let grandTotal = 0;
    const fyTotals = {};
    const dateTotals = {};
    const dateCounts = {};
    const dateHasOpen = {};

    fyList.forEach(fy => { fyTotals[fy] = 0; });

    this.allDebts.forEach(d => {
      const debt = Number(d.debtAmount) || 0;
      const due = Number(d.dueAmount) || 0;
      grandTotal += debt;
      if (fyTotals.hasOwnProperty(d.fy)) {
        fyTotals[d.fy] += debt;
      }
      const dKey = d.displayDate || d.date || 'Undated';
      const key = `${d.fy}_${dKey}`;
      dateTotals[key] = (dateTotals[key] || 0) + debt;
      dateCounts[key] = (dateCounts[key] || 0) + 1;
      if (due > 0) {
        dateHasOpen[key] = true;
      }
    });

    const badgeAll = document.getElementById('all-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR(grandTotal)}`;

    const treeAll = document.getElementById('all-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedAllDebtsFY === 'ALL');
    }

    fyList.forEach(fy => {
      const b = document.getElementById(`all-badge-${fy}`);
      if (b) b.textContent = `₹ ${this.formatINR(fyTotals[fy] || 0)}`;

      const item = document.getElementById(`all-tree-${fy}`);
      if (item) {
        item.classList.toggle('active', this.selectedAllDebtsFY === fy && !this.selectedAllDebtsDate);
      }

      const caret = document.getElementById(`all-caret-${fy}`);
      const isExp = !!this.expandedAllDebtsFYs[fy];
      if (caret) caret.className = isExp ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill';

      const sub = document.getElementById(`all-sublist-${fy}`);
      if (sub) {
        if (isExp) {
          sub.classList.remove('d-none');
          const datesInFY = [];
          Object.keys(dateTotals).forEach(k => {
            if (k.startsWith(`${fy}_`)) {
              const dStr = k.replace(`${fy}_`, '');
              datesInFY.push({
                date: dStr,
                total: dateTotals[k],
                count: dateCounts[k],
                hasOpen: !!dateHasOpen[k]
              });
            }
          });

          // Sort dates descending
          datesInFY.sort((a, b) => {
            const p = s => {
              const pts = s.split('/');
              if (pts.length === 3) return new Date(`${pts[2]}-${pts[1]}-${pts[0]}`);
              return new Date(s);
            };
            return p(b.date) - p(a.date);
          });

          let subHtml = '';
          datesInFY.forEach(item => {
            const isActive = this.selectedAllDebtsFY === fy && this.selectedAllDebtsDate === item.date;
            const bulletClass = item.hasOpen ? 'gold-bullet' : 'green-bullet';
            subHtml += `
              <div class="all-debts-tree-subitem ${isActive ? 'active' : ''}" onclick="LedgerModule.selectAllDebtsDate('${fy}', '${item.date}')">
                <span class="d-flex align-items-center gap-1">
                  <span class="appsheet-bullet ${bulletClass}">●</span>
                  <span>${item.date} (${item.count})</span>
                </span>
                <span class="all-debts-tree-badge">₹ ${this.formatINR(item.total)}</span>
              </div>
            `;
          });
          sub.innerHTML = subHtml;
        } else {
          sub.classList.add('d-none');
          sub.innerHTML = '';
        }
      }

      const cardBadge = document.getElementById(`card-all-badge-${fy}`);
      if (cardBadge) cardBadge.textContent = `₹ ${this.formatINR(fyTotals[fy] || 0)}`;
    });
  },

  applyAllDebtsFilters() {
    if (!this.allDebts) {
      this.filteredAllDebtsList = [];
      return;
    }
    const q = (this.searchQuery || '').trim().toLowerCase();

    this.filteredAllDebtsList = this.allDebts.filter(d => {
      // FY filter
      if (this.selectedAllDebtsFY !== 'ALL') {
        if (d.fy !== this.selectedAllDebtsFY) return false;
      }

      // Date filter
      if (this.selectedAllDebtsDate) {
        const itemDate = d.displayDate || d.date || '';
        if (itemDate !== this.selectedAllDebtsDate) return false;
      }

      // Dropdown filters
      if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return false;
      if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return false;
      if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return false;

      // Search query
      if (q) {
        const matchGR = String(d.grNo || '').toLowerCase().includes(q);
        const matchTruck = String(d.truckNo || '').toLowerCase().includes(q);
        const matchBorrower = String(d.borrowerName || '').toLowerCase().includes(q);
        const matchReceiver = String(d.receiverName || '').toLowerCase().includes(q);
        const matchOwner = String(d.truckOwner || '').toLowerCase().includes(q);
        const matchCompany = String(d.company || '').toLowerCase().includes(q);
        const matchType = String(d.debtType || '').toLowerCase().includes(q);
        const matchFrom = String(d.from || '').toLowerCase().includes(q);
        const matchTo = String(d.to || '').toLowerCase().includes(q);
        const matchDesc = String(d.description || '').toLowerCase().includes(q);
        const matchAmt = String(d.dueAmount || '').includes(q) || String(d.debtAmount || '').includes(q);
        if (!matchGR && !matchTruck && !matchBorrower && !matchReceiver && !matchOwner && !matchCompany && !matchType && !matchFrom && !matchTo && !matchDesc && !matchAmt) {
          return false;
        }
      }

      return true;
    });

    // Sort descending by date, then id
    this.filteredAllDebtsList.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.id || '').localeCompare(String(a.id || ''));
    });
  },

  renderAllDebtsTable() {
    const tbody = document.getElementById('all-debts-table-body');
    if (!tbody) return;

    // Update filter pill in toolbar
    const pillText = document.getElementById('all-debts-filter-pill-text');
    if (pillText) {
      if (this.selectedAllDebtsFY === 'ALL') {
        pillText.innerText = 'All Years';
      } else if (this.selectedAllDebtsDate) {
        pillText.innerText = `${this.selectedAllDebtsFY} > ${this.selectedAllDebtsDate}`;
      } else {
        pillText.innerText = this.selectedAllDebtsFY;
      }
    }

    if (!this.filteredAllDebtsList || this.filteredAllDebtsList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="13" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No debt records match the selected filter or search criteria.
          </td>
        </tr>
      `;
      this.renderAllDebtsPagination(0);
      return;
    }

    const totalItems = this.filteredAllDebtsList.length;
    const pageSize = this.allDebtsPageSize === 'ALL' ? totalItems : parseInt(this.allDebtsPageSize);
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    if (this.allDebtsCurrentPage > totalPages) this.allDebtsCurrentPage = totalPages;
    if (this.allDebtsCurrentPage < 1) this.allDebtsCurrentPage = 1;

    const startIdx = (this.allDebtsCurrentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, totalItems);
    const pageRecords = this.filteredAllDebtsList.slice(startIdx, endIdx);

    // Group page records by date
    const dateGroups = {};
    pageRecords.forEach(d => {
      const dKey = d.displayDate || d.date || 'Undated';
      if (!dateGroups[dKey]) dateGroups[dKey] = [];
      dateGroups[dKey].push(d);
    });

    let html = '';
    Object.keys(dateGroups).forEach(dKey => {
      const records = dateGroups[dKey];
      const dayTotal = records.reduce((sum, r) => sum + (Number(r.debtAmount) || 0), 0);
      const allSettled = records.every(r => (Number(r.dueAmount) || 0) <= 0);
      const groupBullet = allSettled ? 'green-bullet' : 'gold-bullet';
      const headerClass = allSettled ? 'all-debts-date-header date-header-green' : 'all-debts-date-header';

      // Date Header Row
      html += `
        <tr class="${headerClass}">
          <td colspan="13">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-bullet ${groupBullet}">●</span>
              <span class="fw-bold">${dKey}</span>
              <span class="badge bg-light text-dark border px-2 py-1 font-monospace" style="font-size: 11px;">₹ ${this.formatINR(dayTotal)}</span>
            </div>
          </td>
        </tr>
      `;

      // Data Rows
      records.forEach(d => {
        const debt = Number(d.debtAmount) || 0;
        const due = Number(d.dueAmount) || 0;
        const ret = Number(d.totalReturned) || 0;

        let rowClass = 'all-debts-row-gold';
        let primaryColor = '#8d6e32'; // Gold for open debts
        if (due <= 0) {
          rowClass = 'all-debts-row-green';
          primaryColor = '#0b8043'; // Green for settled debts
        } else if (ret > 0 && due < debt) {
          rowClass = 'all-debts-row-blue';
          primaryColor = '#1a73e8'; // Blue for partially returned debts
        }

        const isRowActive = this.activeAllDebtId && String(this.activeAllDebtId) === String(d.id);
        const activeClass = isRowActive ? 'active' : '';

        // Returned Amount cell formatting
        let returnedCellContent = `<span style="color: #0b8043;">●</span>`;
        if (due <= 0) {
          returnedCellContent = `<span class="td-returned-green">● ₹ ${this.formatINR(ret || debt)}</span>`;
        } else if (ret > 0) {
          returnedCellContent = `<span class="td-returned-green">● ₹ ${this.formatINR(ret)}</span>`;
        } else {
          returnedCellContent = `<span style="color: #0b8043;">●</span> <span class="td-returned-green">₹ 0.00</span>`;
        }

        // Due Amount cell formatting (empty if settled)
        let dueCellContent = `<span></span>`;
        if (due > 0) {
          dueCellContent = `<span class="td-due-amount">● ₹ ${this.formatINR(due)}</span>`;
        }

        html += `
          <tr class="all-debts-data-row ${rowClass} ${activeClass}" id="all-row-${d.id}" onclick="LedgerModule.openAllDebtDetails('${d.id}')">
            <td><span style="color: ${primaryColor};">●</span> <span style="font-weight: 600;">${d.grNo || ''}</span></td>
            <td>${d.truckNo ? `<span style="color: ${primaryColor};">●</span> <span style="font-weight: 600;">${d.truckNo}</span>` : `<span style="color: ${primaryColor};">●</span>`}</td>
            <td>${d.to ? `<span style="color: ${primaryColor};">●</span> <span>${d.to}</span>` : `<span style="color: ${primaryColor};">●</span>`}</td>
            <td>${returnedCellContent}</td>
            <td class="td-due-amount">${dueCellContent}</td>
            <td><span style="color: ${primaryColor}; font-weight: 600;">● ₹ ${this.formatINR(debt)}</span></td>
            <td><span style="color: ${primaryColor};">●</span> <span>${d.debtType || ''}</span></td>
            <td><span style="color: ${primaryColor};">●</span> <span>${d.debtMode || 'Cash'}</span></td>
            <td><span style="color: ${primaryColor};">●</span> <span>${d.borrowerName || ''}</span></td>
            <td><span style="color: ${primaryColor};">●</span> <span>${d.receiverName || ''}</span></td>
            <td><span style="color: ${primaryColor};">●</span> <span>${d.description || ''}</span></td>
            <td><span style="color: ${primaryColor};">${d.displayDate || d.date || ''}</span></td>
            <td class="text-end" style="color: ${primaryColor}; font-weight: bold; width: 25px;">&gt;</td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
    this.renderAllDebtsPagination(totalItems);
  },

  renderAllDebtsPagination(totalItems) {
    const info = document.getElementById('all-debts-pagination-info');
    const container = document.getElementById('all-debts-pagination-buttons');
    if (!info || !container) return;

    if (totalItems === 0) {
      info.innerText = 'Showing 0-0 of 0 entries';
      container.innerHTML = '';
      return;
    }

    const pageSize = this.allDebtsPageSize === 'ALL' ? totalItems : parseInt(this.allDebtsPageSize);
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIdx = (this.allDebtsCurrentPage - 1) * pageSize + 1;
    const endIdx = Math.min(startIdx + pageSize - 1, totalItems);

    info.innerText = `Showing ${startIdx}-${endIdx} of ${totalItems} entries`;

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let btns = '';
    btns += `<button type="button" class="btn btn-outline-secondary ${this.allDebtsCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.goToAllDebtsPage(1)" title="First"><i class="bi bi-chevron-double-left"></i></button>`;
    btns += `<button type="button" class="btn btn-outline-secondary ${this.allDebtsCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.goToAllDebtsPage(${this.allDebtsCurrentPage - 1})" title="Previous"><i class="bi bi-chevron-left"></i></button>`;

    const startP = Math.max(1, this.allDebtsCurrentPage - 2);
    const endP = Math.min(totalPages, this.allDebtsCurrentPage + 2);

    for (let p = startP; p <= endP; p++) {
      btns += `<button type="button" class="btn ${p === this.allDebtsCurrentPage ? 'btn-primary' : 'btn-outline-secondary'}" onclick="LedgerModule.goToAllDebtsPage(${p})">${p}</button>`;
    }

    btns += `<button type="button" class="btn btn-outline-secondary ${this.allDebtsCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.goToAllDebtsPage(${this.allDebtsCurrentPage + 1})" title="Next"><i class="bi bi-chevron-right"></i></button>`;
    btns += `<button type="button" class="btn btn-outline-secondary ${this.allDebtsCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.goToAllDebtsPage(${totalPages})" title="Last"><i class="bi bi-chevron-double-right"></i></button>`;

    container.innerHTML = btns;
  },

  changeAllDebtsPageSize(sz) {
    this.allDebtsPageSize = sz;
    this.allDebtsCurrentPage = 1;
    this.renderAllDebtsTable();
  },

  goToAllDebtsPage(pg) {
    this.allDebtsCurrentPage = pg;
    this.renderAllDebtsTable();
  },

  openAllDebtDetails(debtId) {
    this.activeAllDebtId = debtId;
    const debt = (this.allDebts || []).find(d => String(d.id) === String(debtId));
    if (!debt) return;

    // Highlight row
    document.querySelectorAll('.all-debts-data-row').forEach(r => r.classList.remove('active'));
    const rEl = document.getElementById(`all-row-${debtId}`);
    if (rEl) rEl.classList.add('active');

    // Expand split wrapper
    const splitWrapper = document.getElementById('all-debts-split-wrapper');
    if (splitWrapper) splitWrapper.classList.add('split-open');

    // Show side panel
    const panel = document.getElementById('all-debts-panel');
    if (panel) panel.classList.remove('d-none');

    const due = Number(debt.dueAmount) || 0;
    const totalDebt = Number(debt.debtAmount) || 0;
    const totalRet = Number(debt.totalReturned) || 0;

    let primaryColor = '#8d6e32'; // Gold
    if (due <= 0) {
      primaryColor = '#0b8043'; // Green
    } else if (totalRet > 0 && due < totalDebt) {
      primaryColor = '#1a73e8'; // Blue
    }

    const bulletHtml = `<span style="color: ${primaryColor};">●</span> `;

    // Card 1: Debt Details
    const setVal = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `${bulletHtml}<span style="color: ${primaryColor}; font-weight: 600;">${text || '-'}</span>`;
    };

    setVal('all-det-debt-type', debt.debtType);
    setVal('all-det-debt-date', debt.displayDate || debt.date);
    setVal('all-det-debt-owner', debt.truckOwner);
    setVal('all-det-debt-gr', debt.grNo);
    setVal('all-det-debt-company', debt.company);
    setVal('all-det-debt-from', debt.from);
    setVal('all-det-debt-to', debt.to);
    setVal('all-det-debt-borrower', debt.borrowerName);
    setVal('all-det-debt-receiver', debt.receiverName);
    setVal('all-det-debt-desc', debt.description);

    // Card 2: Returned Amount [count]
    const returns = Array.isArray(debt.returnedAmounts) ? debt.returnedAmounts : [];
    const retHeader = document.getElementById('all-det-returned-header');
    if (retHeader) retHeader.innerText = `Returned Amount ${returns.length}`;

    const retList = document.getElementById('all-det-returned-list');
    if (retList) {
      if (returns.length === 0) {
        retList.innerHTML = `<div class="text-center py-4 text-muted" style="font-size: 13px;">No items</div>`;
      } else {
        let rHtml = '';
        returns.forEach(r => {
          const rDate = r.displayDate || r.date || '';
          const rAmt = Number(r.amount) || 0;
          rHtml += `
            <div class="returned-history-item mb-2 p-2 border rounded bg-white">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="fw-semibold text-dark" style="font-size: 12.5px;"><span class="appsheet-bullet green-bullet">●</span> ${rDate}</span>
                <span class="fw-bold text-success" style="font-size: 13px;">₹ ${this.formatINR(rAmt)}</span>
              </div>
              <div class="d-flex align-items-center justify-content-between text-muted" style="font-size: 11.5px;">
                <span>${r.depositorType || 'Driver'}: ${r.depositorName || r.receivedBy || '-'}</span>
                <span class="badge bg-light text-dark border">${r.mode || r.returnMode || 'Cash'}</span>
              </div>
              ${r.description ? `<div class="text-muted mt-1 small" style="font-size: 11px;"><em>${r.description}</em></div>` : ''}
            </div>
          `;
        });
        retList.innerHTML = rHtml;
      }
    }

    // Card 3: Summary matching WhatsApp screenshot
    const elMode = document.getElementById('all-det-debt-mode');
    if (elMode) elMode.innerHTML = `${bulletHtml}<span style="color: ${primaryColor}; font-weight: 600;">${debt.debtMode || 'Cash'}</span>`;

    const elAmt = document.getElementById('all-det-debt-amount');
    if (elAmt) elAmt.innerHTML = `${bulletHtml}<span style="color: ${primaryColor}; font-weight: 700;">₹ ${this.formatINR(totalDebt)}</span>`;

    const elRet = document.getElementById('all-det-total-returned');
    if (elRet) elRet.innerHTML = `<span class="appsheet-bullet green-bullet">●</span> <span style="color: #0b8043; font-weight: 700;">₹ ${this.formatINR(totalRet)}</span>`;

    const elDue = document.getElementById('all-det-due-amount');
    if (elDue) {
      if (due > 0) {
        elDue.innerHTML = `<span class="appsheet-bullet red-bullet">●</span> <span style="color: #d93025; font-weight: 700;">₹ ${this.formatINR(due)}</span>`;
      } else {
        elDue.innerHTML = `<span class="appsheet-bullet green-bullet">●</span> <span style="color: #0b8043; font-weight: 700;">₹ 0.00</span>`;
      }
    }
  },

  closeAllDebtDetails() {
    this.activeAllDebtId = null;
    document.querySelectorAll('.all-debts-data-row').forEach(r => r.classList.remove('active'));
    const panel = document.getElementById('all-debts-panel');
    if (panel) panel.classList.add('d-none');
    const splitWrapper = document.getElementById('all-debts-split-wrapper');
    if (splitWrapper) splitWrapper.classList.remove('split-open');
  },

  toggleAllDebtsFullscreen() {
    const main = document.getElementById('all-debts-main-container');
    if (!main) return;
    if (!document.fullscreenElement) {
      main.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  },

  toggleAllPanelFullscreen() {
    const panel = document.getElementById('all-debts-panel');
    if (panel) panel.classList.toggle('fullscreen');
  },

  editCurrentAllDebt() {
    if (!this.activeAllDebtId) return;
    this.editDebt(this.activeAllDebtId);
  },

  async deleteCurrentAllDebt() {
    if (!this.activeAllDebtId) return;
    if (!confirm('Are you sure you want to delete this debt record?')) return;
    try {
      await dbService.delete('debts', this.activeAllDebtId);
      this.allDebts = await dbService.getAll('debts');
      this.closeAllDebtDetails();
      this.applyAllDebtsFilters();
      this.renderAllDebtsTreeSidebar();
      this.renderAllDebtsTable();
      if (typeof AppUI !== 'undefined') AppUI.showToast('Debt deleted successfully', 'success');
    } catch (err) {
      console.error(err);
      if (typeof AppUI !== 'undefined') AppUI.showToast('Failed to delete debt: ' + err.message, 'error');
    }
  },

  openRecordReturnModalForAllDebt() {
    if (!this.activeAllDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.activeAllDebtId));
    if (!debt) return;

    document.getElementById('return-debt-id').value = debt.id;
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('return-date').value = today;
    document.getElementById('return-depositor-name').value = debt.borrowerName || '';
    document.getElementById('return-modal-debt-amount').value = `₹ ${this.formatINR(debt.debtAmount || 0)}`;
    document.getElementById('return-modal-due').value = `₹ ${this.formatINR(debt.dueAmount || 0)}`;
    document.getElementById('return-amount').value = debt.dueAmount || '';
    document.getElementById('return-remarks').value = '';

    // Reset return mode pill to Cash
    this.modalReturnMode = 'Cash';
    document.getElementById('return-mode').value = 'Cash';
    document.querySelectorAll('#return-mode-pill-container .btn-mode-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === 'Cash');
    });

    const modalEl = document.getElementById('modal-record-return');
    if (modalEl && typeof bootstrap !== 'undefined') {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  async submitAddDebt() {
    const formId = document.getElementById('debt-form-id').value;
    const dateVal = document.getElementById('debt-form-date').value;
    const typeVal = document.getElementById('debt-form-type').value;
    const compVal = document.getElementById('debt-form-company').value;
    const grVal = document.getElementById('debt-form-gr').value.trim();
    const truckVal = document.getElementById('debt-form-truck').value.trim();
    const fyVal = document.getElementById('debt-form-fy').value;
    const fromVal = document.getElementById('debt-form-from').value.trim();
    const toVal = document.getElementById('debt-form-to').value.trim();
    const ownerVal = document.getElementById('debt-form-owner').value.trim();
    const amtVal = parseFloat(document.getElementById('debt-form-amount').value);
    const modeVal = document.getElementById('debt-form-mode').value;
    const borrowerVal = document.getElementById('debt-form-borrower').value.trim();
    const receiverVal = document.getElementById('debt-form-receiver').value.trim();
    const descVal = document.getElementById('debt-form-desc').value.trim();

    if (!dateVal || !amtVal || isNaN(amtVal) || amtVal <= 0) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter required fields (Date & Amount)', 'warning');
      return;
    }

    // Format display date
    const pts = dateVal.split('-');
    const displayDate = pts.length === 3 ? `${pts[2]}/${pts[1]}/${pts[0]}` : dateVal;

    try {
      if (formId) {
        // Edit existing
        const old = this.allDebts.find(d => String(d.id) === String(formId)) || {};
        const totalRet = Number(old.totalReturned) || 0;
        const dueAmount = Math.max(0, amtVal - totalRet);

        await dbService.update('debts', formId, {
          date: dateVal,
          displayDate,
          debtType: typeVal,
          company: compVal,
          grNo: grVal,
          truckNo: truckVal,
          fy: fyVal,
          from: fromVal,
          to: toVal,
          truckOwner: ownerVal,
          debtAmount: amtVal,
          dueAmount,
          debtMode: modeVal,
          borrowerName: borrowerVal,
          receiverName: receiverVal,
          description: descVal
        });

        if (typeof AppUI !== 'undefined') AppUI.showToast('Debt record updated successfully!', 'success');
      } else {
        // Create new
        const newDebt = {
          date: dateVal,
          displayDate,
          debtType: typeVal,
          company: compVal,
          grNo: grVal,
          truckNo: truckVal,
          fy: fyVal,
          from: fromVal,
          to: toVal,
          truckOwner: ownerVal,
          debtAmount: amtVal,
          dueAmount: amtVal,
          totalReturned: 0,
          returnedAmounts: [],
          debtMode: modeVal,
          borrowerName: borrowerVal,
          receiverName: receiverVal,
          description: descVal
        };

        const created = await dbService.create('debts', newDebt);
        if (typeof AppUI !== 'undefined') AppUI.showToast(`New debt record added for ${compVal}!`, 'success');
      }

      this.allDebts = await dbService.getAll('debts');

      const modalEl = document.getElementById('modal-add-debt');
      if (modalEl && typeof bootstrap !== 'undefined') {
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }

      if (this.mainViewMode === 'settled') {
        this.applySettledFilters();
        this.renderSettledTreeSidebar();
        this.renderSettledTable();
        if (formId) {
          this.openSettledDebtDetails(formId);
        }
      } else if (this.mainViewMode === 'all-debts') {
        this.applyAllDebtsFilters();
        this.renderAllDebtsTreeSidebar();
        this.renderAllDebtsTable();
        if (formId) {
          this.openAllDebtDetails(formId);
        }
      } else {
        this.applyOpenDebtsFilters();
        this.renderOpenDebtsTreeSidebar();
        this.renderOpenDebtsTable();
        if (formId) {
          this.openOpenDebtDetails(formId);
        }
      }
    } catch (err) {
      console.error(err);
      if (typeof AppUI !== 'undefined') AppUI.showToast('Failed to save debt: ' + err.message, 'error');
    }
  },

  // ----------------------------------------------------
  // SETTLED DEBTS CONTROLLER (Card 8 - Authentic Google AppSheet Green Master-Detail)
  // ----------------------------------------------------
  goToSettledView(fy = 'ALL', date = null) {
    this.mainViewMode = 'settled';
    this.currentTab = 'settled';
    this.selectedSettledFY = fy || 'ALL';
    this.selectedSettledDate = date;
    if (fy && fy !== 'ALL') {
      this.expandedSettledFYs[fy] = true;
    }
    this.settledCurrentPage = 1;
    this.searchQuery = '';
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) {
      sInput.value = '';
      sInput.placeholder = 'Search Settled Debts';
    }
    document.getElementById('tab-btn-open')?.classList.remove('active');
    document.getElementById('tab-btn-all')?.classList.remove('active');
    document.getElementById('tab-btn-settled')?.classList.add('active');
    document.getElementById('tab-btn-statements')?.classList.remove('active');
    this.applySettledFilters();
    this.renderCurrentView();
  },

  toggleSettledFYTree(fy) {
    this.expandedSettledFYs[fy] = !this.expandedSettledFYs[fy];
    this.renderSettledTreeSidebar();
  },

  selectSettledAll() {
    this.selectedSettledFY = 'ALL';
    this.selectedSettledDate = null;
    this.settledCurrentPage = 1;
    this.applySettledFilters();
    this.renderSettledTreeSidebar();
    this.renderSettledTable();
  },

  selectSettledFY(fy) {
    this.selectedSettledFY = fy;
    this.selectedSettledDate = null;
    this.settledCurrentPage = 1;
    if (fy !== 'ALL') {
      this.expandedSettledFYs[fy] = true;
    }
    this.applySettledFilters();
    this.renderSettledTreeSidebar();
    this.renderSettledTable();
  },

  selectSettledDate(fy, date) {
    this.selectedSettledFY = fy;
    this.selectedSettledDate = date;
    this.settledCurrentPage = 1;
    this.applySettledFilters();
    this.renderSettledTreeSidebar();
    this.renderSettledTable();
  },

  toggleSettledDateSidebar() {
    this.isSettledSidebarHidden = !this.isSettledSidebarHidden;
    const sidebar = document.getElementById('settled-tree-sidebar');
    const btnText = document.getElementById('btn-toggle-settled-text');
    const btnIcon = document.getElementById('btn-toggle-settled-icon');
    if (sidebar) {
      sidebar.classList.toggle('d-none', this.isSettledSidebarHidden);
    }
    if (btnText) {
      btnText.innerText = this.isSettledSidebarHidden ? 'Show Date Filter' : 'Hide Date Filter';
    }
    if (btnIcon) {
      btnIcon.className = this.isSettledSidebarHidden ? 'bi bi-layout-sidebar' : 'bi bi-layout-sidebar-inset';
    }
  },

  renderSettledTreeSidebar() {
    if (!this.allDebts) return;
    const fyList = [
      '2026-2027', '2025-2026', '2024-2025', '2023-2024',
      '2022-2023', '2021-2022', '2020-2021', '2019-2020'
    ];
    let grandTotal = 0;
    const fyTotals = {};
    const dateTotals = {};
    const dateCounts = {};

    fyList.forEach(fy => { fyTotals[fy] = 0; });

    // Settled debts: dueAmount == 0
    this.allDebts.forEach(d => {
      const due = Number(d.dueAmount) || 0;
      if (due !== 0) return;
      const debt = Number(d.debtAmount) || 0;
      const returned = Number(d.totalReturned) || debt;
      grandTotal += returned;
      if (fyTotals.hasOwnProperty(d.fy)) {
        fyTotals[d.fy] += returned;
      }
      const dKey = d.displayDate || d.date || 'Undated';
      const key = `${d.fy}_${dKey}`;
      dateTotals[key] = (dateTotals[key] || 0) + returned;
      dateCounts[key] = (dateCounts[key] || 0) + 1;
    });

    const badgeAll = document.getElementById('settled-tree-badge-all');
    if (badgeAll) badgeAll.textContent = `₹ ${this.formatINR(grandTotal)}`;

    const treeAll = document.getElementById('settled-tree-all');
    if (treeAll) {
      treeAll.classList.toggle('active', this.selectedSettledFY === 'ALL');
    }

    const container = document.getElementById('settled-tree-fys-container');
    if (container) {
      let fysHtml = '';
      fyList.forEach(fy => {
        const isSelectedFY = this.selectedSettledFY === fy && !this.selectedSettledDate;
        const isExp = !!this.expandedSettledFYs[fy];
        const caretIcon = isExp ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill';
        const fyTotal = fyTotals[fy] || 0;

        let subHtml = '';
        if (isExp) {
          const datesInFY = [];
          Object.keys(dateTotals).forEach(k => {
            if (k.startsWith(`${fy}_`)) {
              const dStr = k.replace(`${fy}_`, '');
              datesInFY.push({
                date: dStr,
                total: dateTotals[k],
                count: dateCounts[k]
              });
            }
          });

          // Sort dates descending
          datesInFY.sort((a, b) => {
            const p = s => {
              const pts = s.split('/');
              if (pts.length === 3) return new Date(`${pts[2]}-${pts[1]}-${pts[0]}`);
              return new Date(s);
            };
            return p(b.date) - p(a.date);
          });

          datesInFY.forEach(item => {
            const isDateActive = this.selectedSettledFY === fy && this.selectedSettledDate === item.date;
            subHtml += `
              <div class="settled-tree-subitem ${isDateActive ? 'active' : ''}" onclick="LedgerModule.selectSettledDate('${fy}', '${item.date}')">
                <span class="d-flex align-items-center gap-1">
                  <span class="appsheet-bullet green-bullet">●</span>
                  <span>${item.date} (${item.count})</span>
                </span>
                <span class="settled-tree-badge">₹ ${this.formatINR(item.total)}</span>
              </div>
            `;
          });
        }

        fysHtml += `
          <div class="settled-tree-item ${isSelectedFY ? 'active' : ''}" id="settled-tree-${fy}">
            <div class="d-flex align-items-center gap-1" onclick="LedgerModule.selectSettledFY('${fy}')">
              <i class="${caretIcon} text-muted me-1" style="font-size: 11px; cursor: pointer;" onclick="event.stopPropagation(); LedgerModule.toggleSettledFYTree('${fy}')"></i>
              <span class="appsheet-bullet green-bullet">●</span>
              <span>${fy}</span>
            </div>
            <span class="settled-tree-badge" id="settled-tree-badge-${fy}">₹ ${this.formatINR(fyTotal)}</span>
          </div>
          <div class="settled-tree-sublist ${isExp ? '' : 'd-none'}" id="settled-sublist-${fy}">
            ${subHtml}
          </div>
        `;

        // Update Card 8 badge on dashboard
        const cardBadge = document.getElementById(`card-settled-badge-${fy}`);
        if (cardBadge) cardBadge.textContent = `₹ ${this.formatINR(fyTotal)}`;
      });
      container.innerHTML = fysHtml;
    }

    const cardTotalBadge = document.getElementById('card-settled-total');
    if (cardTotalBadge) cardTotalBadge.textContent = `₹ ${this.formatINR(grandTotal)}`;
  },

  applySettledFilters() {
    if (!this.allDebts) {
      this.filteredSettledList = [];
      return;
    }
    const q = (this.searchQuery || '').trim().toLowerCase();

    this.filteredSettledList = this.allDebts.filter(d => {
      // Must be settled
      const due = Number(d.dueAmount) || 0;
      if (due !== 0) return false;

      // FY filter
      if (this.selectedSettledFY !== 'ALL') {
        if (d.fy !== this.selectedSettledFY) return false;
      }

      // Date filter
      if (this.selectedSettledDate) {
        const itemDate = d.displayDate || d.date || '';
        if (itemDate !== this.selectedSettledDate) return false;
      }

      // Dropdown filters
      if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return false;
      if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return false;
      if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return false;

      // Search query
      if (q) {
        const matchGR = String(d.grNo || '').toLowerCase().includes(q);
        const matchTruck = String(d.truckNo || '').toLowerCase().includes(q);
        const matchBorrower = String(d.borrowerName || '').toLowerCase().includes(q);
        const matchReceiver = String(d.receiverName || '').toLowerCase().includes(q);
        const matchOwner = String(d.truckOwner || '').toLowerCase().includes(q);
        const matchCompany = String(d.company || '').toLowerCase().includes(q);
        const matchType = String(d.debtType || '').toLowerCase().includes(q);
        const matchFrom = String(d.from || '').toLowerCase().includes(q);
        const matchTo = String(d.to || '').toLowerCase().includes(q);
        const matchDesc = String(d.description || '').toLowerCase().includes(q);
        const matchAmt = String(d.totalReturned || '').includes(q) || String(d.debtAmount || '').includes(q);
        if (!matchGR && !matchTruck && !matchBorrower && !matchReceiver && !matchOwner && !matchCompany && !matchType && !matchFrom && !matchTo && !matchDesc && !matchAmt) {
          return false;
        }
      }

      return true;
    });

    // Sort descending by date, then id
    this.filteredSettledList.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.id || '').localeCompare(String(a.id || ''));
    });
  },

  renderSettledTable() {
    const tbody = document.getElementById('settled-table-tbody');
    if (!tbody) return;

    // Update filter chip in toolbar
    const chipText = document.getElementById('settled-chip-text');
    if (chipText) {
      if (this.selectedSettledFY === 'ALL') {
        chipText.innerText = 'All Years';
      } else if (this.selectedSettledDate) {
        chipText.innerText = `${this.selectedSettledFY} > ${this.selectedSettledDate}`;
      } else {
        chipText.innerText = this.selectedSettledFY;
      }
    }

    if (!this.filteredSettledList || this.filteredSettledList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No settled records match the selected filter or search criteria.
          </td>
        </tr>
      `;
      this.renderSettledPagination(0);
      return;
    }

    const totalItems = this.filteredSettledList.length;
    const pageSize = this.settledPageSize === 'ALL' ? totalItems : parseInt(this.settledPageSize);
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    if (this.settledCurrentPage > totalPages) this.settledCurrentPage = totalPages;
    if (this.settledCurrentPage < 1) this.settledCurrentPage = 1;

    const startIdx = (this.settledCurrentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, totalItems);
    const pageRecords = this.filteredSettledList.slice(startIdx, endIdx);

    // Group page records by date
    const dateGroups = {};
    pageRecords.forEach(d => {
      const dKey = d.displayDate || d.date || 'Undated';
      if (!dateGroups[dKey]) dateGroups[dKey] = [];
      dateGroups[dKey].push(d);
    });

    let html = '';
    const greenBullet = `<span class="appsheet-bullet green-bullet">●</span> `;

    Object.keys(dateGroups).forEach(dKey => {
      const records = dateGroups[dKey];
      const dayTotal = records.reduce((sum, r) => sum + (Number(r.totalReturned || r.debtAmount) || 0), 0);

      // Date Header Row matching Google AppSheet Settled screenshots
      html += `
        <tr class="settled-date-header">
          <td colspan="11">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-bullet green-bullet">●</span>
              <span class="fw-bold">${dKey}</span>
              <span class="badge bg-light text-dark border px-2 py-1 font-monospace" style="font-size: 11px;">₹ ${this.formatINR(dayTotal)}</span>
            </div>
          </td>
        </tr>
      `;

      // Data Rows
      records.forEach(d => {
        const isActive = this.activeSettledDebtId && String(this.activeSettledDebtId) === String(d.id);
        const retAmount = Number(d.totalReturned || d.debtAmount) || 0;

        html += `
          <tr class="settled-data-row ${isActive ? 'active' : ''}" id="settled-row-${d.id}" onclick="LedgerModule.openSettledDebtDetails('${d.id}')">
            <td>${greenBullet}<span style="font-weight: 600;">${d.grNo || ''}</span></td>
            <td>${d.truckNo ? `${greenBullet}<span style="font-weight: 600;">${d.truckNo}</span>` : greenBullet}</td>
            <td>${d.to ? `${greenBullet}<span>${d.to}</span>` : greenBullet}</td>
            <td>${greenBullet}<span style="font-weight: 600;">₹ ${this.formatINR(retAmount)}</span></td>
            <td>${greenBullet}<span>${d.debtType || ''}</span></td>
            <td>${greenBullet}<span>${d.debtMode || 'Cash'}</span></td>
            <td>${greenBullet}<span>${d.borrowerName || ''}</span></td>
            <td>${greenBullet}<span>${d.receiverName || ''}</span></td>
            <td>${greenBullet}<span>${d.description || ''}</span></td>
            <td>${greenBullet}<span>${d.displayDate || d.date || ''}</span></td>
            <td class="text-end" style="color: #137333; font-weight: bold; width: 25px;">&gt;</td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
    this.renderSettledPagination(totalItems);
  },

  renderSettledPagination(totalItems) {
    const info = document.getElementById('settled-pagination-info');
    const container = document.getElementById('settled-pagination-buttons');
    if (!info || !container) return;

    if (totalItems === 0) {
      info.innerText = 'Showing 0-0 of 0 entries';
      container.innerHTML = '';
      return;
    }

    const pageSize = this.settledPageSize === 'ALL' ? totalItems : parseInt(this.settledPageSize);
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIdx = (this.settledCurrentPage - 1) * pageSize + 1;
    const endIdx = Math.min(startIdx + pageSize - 1, totalItems);

    info.innerText = `Showing ${startIdx}-${endIdx} of ${totalItems} entries`;

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let btns = '';
    btns += `<button type="button" class="btn btn-outline-secondary ${this.settledCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeSettledPage(1)" title="First"><i class="bi bi-chevron-double-left"></i></button>`;
    btns += `<button type="button" class="btn btn-outline-secondary ${this.settledCurrentPage === 1 ? 'disabled' : ''}" onclick="LedgerModule.changeSettledPage(${this.settledCurrentPage - 1})" title="Previous"><i class="bi bi-chevron-left"></i></button>`;

    const startP = Math.max(1, this.settledCurrentPage - 2);
    const endP = Math.min(totalPages, this.settledCurrentPage + 2);

    for (let p = startP; p <= endP; p++) {
      btns += `<button type="button" class="btn ${p === this.settledCurrentPage ? 'btn-success' : 'btn-outline-secondary'}" onclick="LedgerModule.changeSettledPage(${p})">${p}</button>`;
    }

    btns += `<button type="button" class="btn btn-outline-secondary ${this.settledCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeSettledPage(${this.settledCurrentPage + 1})" title="Next"><i class="bi bi-chevron-right"></i></button>`;
    btns += `<button type="button" class="btn btn-outline-secondary ${this.settledCurrentPage === totalPages ? 'disabled' : ''}" onclick="LedgerModule.changeSettledPage(${totalPages})" title="Last"><i class="bi bi-chevron-double-right"></i></button>`;

    container.innerHTML = btns;
  },

  changeSettledPage(pg) {
    this.settledCurrentPage = pg;
    this.renderSettledTable();
  },

  changeSettledPageSize(sz) {
    this.settledPageSize = sz;
    this.settledCurrentPage = 1;
    this.renderSettledTable();
  },

  openSettledDebtDetails(debtId) {
    this.activeSettledDebtId = debtId;
    const debt = (this.allDebts || []).find(d => String(d.id) === String(debtId));
    if (!debt) return;

    // Highlight row
    document.querySelectorAll('.settled-data-row').forEach(r => r.classList.remove('active'));
    const rEl = document.getElementById(`settled-row-${debtId}`);
    if (rEl) rEl.classList.add('active');

    // Expand split wrapper
    const splitWrapper = document.getElementById('settled-split-wrapper');
    if (splitWrapper) splitWrapper.classList.add('split-open');

    // Show side panel
    const panel = document.getElementById('panel-settled-details');
    if (panel) panel.classList.remove('d-none');

    const content = document.getElementById('settled-panel-content');
    if (!content) return;

    const greenBullet = `<span class="appsheet-bullet green-bullet">●</span> `;
    const debtAmt = Number(debt.debtAmount) || 0;
    const retAmt = Number(debt.totalReturned || debt.debtAmount) || 0;

    // Get returned list: either from debt.returnedAmounts or matching allReturnedAmounts or synthetic
    let retList = Array.isArray(debt.returnedAmounts) && debt.returnedAmounts.length > 0
      ? debt.returnedAmounts
      : (this.allReturnedAmounts || []).filter(r => String(r.debtId) === String(debt.id) || (debt.grNo && String(r.grNo) === String(debt.grNo)));

    if (!retList || retList.length === 0) {
      retList = [
        {
          id: debt.id ? String(debt.id).replace(/\D/g, '').slice(-3) || '539' : '539',
          date: debt.date || '2026-07-01',
          returnDate: debt.displayDate || debt.date || '01/07/2026',
          depositorName: debt.borrowerName || debt.truckOwner || 'Laxmi Prakash Jat',
          returnMode: debt.debtMode || 'Adjustment',
          mode: debt.debtMode || 'Adjustment',
          amount: retAmt,
          returnedAmount: retAmt,
          receiverName: debt.receiverName || 'TTC',
          description: debt.description || 'Settled'
        }
      ];
    }

    let miniRowsHtml = '';
    retList.forEach(r => {
      const rId = r.id || '539';
      const rDate = r.returnDate || r.displayDate || r.date || '-';
      const rName = r.depositorName || r.partyName || '-';
      const rMode = r.returnMode || r.mode || 'Cash';
      miniRowsHtml += `
        <tr style="cursor: pointer;" onclick="LedgerModule.openSettledReturnDetails('${rId}', '${debt.id}')">
          <td>${greenBullet}<span style="color: #137333; font-weight: 600;">${rDate}</span></td>
          <td>${greenBullet}<span style="color: #137333; font-weight: 600;">${rName}</span></td>
          <td>${greenBullet}<span style="color: #137333; font-weight: 600;">${rMode}</span></td>
          <td class="text-end" style="color: #137333; font-weight: bold; width: 20px;">&gt;</td>
        </tr>
      `;
    });

    content.innerHTML = `
      <div class="settled-cards-grid">
        <!-- Left Column: Particulars & Financials stacked (matching AppSheet WhatsApp screenshot) -->
        <div class="settled-cards-col-left d-flex flex-column gap-3">
          <!-- Top Left Card: Particulars -->
          <div class="settled-detail-card">
            <div class="settled-field-row">
              <span class="settled-field-label">Debt Type</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.debtType || '-'}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Date</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.displayDate || debt.date || '-'}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Truck Owner Name</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.truckOwner || '-'}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Borrower Name</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.borrowerName || '-'}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Receiver Name</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.receiverName || '-'}</span></span>
            </div>
          </div>

          <!-- Bottom Left Card: Financials -->
          <div class="settled-detail-card">
            <div class="settled-field-row">
              <span class="settled-field-label">Debt Mode</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.debtMode || 'Cash'}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Debt Amount</span>
              <span class="settled-field-value">${greenBullet}<span>₹ ${this.formatINR(debtAmt)}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Total Returned Amount</span>
              <span class="settled-field-value">${greenBullet}<span>₹ ${this.formatINR(retAmt)}</span></span>
            </div>
            <div class="settled-field-row">
              <span class="settled-field-label">Description</span>
              <span class="settled-field-value">${greenBullet}<span>${debt.description || '-'}</span></span>
            </div>
          </div>
        </div>

        <!-- Right Column: Returned Amount Mini Table -->
        <div class="settled-cards-col-right">
          <div class="settled-detail-card">
            <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div class="d-flex align-items-center gap-2">
                <span class="fw-semibold text-dark" style="font-size: 13.5px;">Returned Amount</span>
                <span class="badge border border-primary text-primary bg-white rounded-1 px-1 py-0" style="font-size: 11px;">${retList.length}</span>
              </div>
              <a href="javascript:void(0)" class="text-muted text-decoration-none" style="font-size: 11.5px;" onclick="LedgerModule.openSettledReturnDetails('${retList[0].id}', '${debt.id}')">Expand &gt;</a>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-borderless mb-0" style="font-size: 12px;">
                <thead class="text-muted" style="border-bottom: 1px solid #e0e0e0; font-size: 11px;">
                  <tr>
                    <th>Return Date</th>
                    <th>Depositor Name</th>
                    <th>Return Mode</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${miniRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  closeSettledDebtDetails() {
    this.activeSettledDebtId = null;
    document.querySelectorAll('.settled-data-row').forEach(r => r.classList.remove('active'));
    const splitWrapper = document.getElementById('settled-split-wrapper');
    if (splitWrapper) splitWrapper.classList.remove('split-open');
    const panel = document.getElementById('panel-settled-details');
    if (panel) panel.classList.add('d-none');
  },

  prevSettledRecord() {
    if (!this.activeSettledDebtId || !this.filteredSettledList.length) return;
    const currentIndex = this.filteredSettledList.findIndex(d => String(d.id) === String(this.activeSettledDebtId));
    if (currentIndex > 0) {
      this.openSettledDebtDetails(this.filteredSettledList[currentIndex - 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('First record reached', 'info');
    }
  },

  nextSettledRecord() {
    if (!this.activeSettledDebtId || !this.filteredSettledList.length) return;
    const currentIndex = this.filteredSettledList.findIndex(d => String(d.id) === String(this.activeSettledDebtId));
    if (currentIndex >= 0 && currentIndex < this.filteredSettledList.length - 1) {
      this.openSettledDebtDetails(this.filteredSettledList[currentIndex + 1].id);
    } else {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Last record reached', 'info');
    }
  },

  toggleSettledDetailFullscreen() {
    this.isSettledPanelFullscreen = !this.isSettledPanelFullscreen;
    const panel = document.getElementById('panel-settled-details');
    const btn = document.getElementById('btn-expand-settled-panel');
    if (panel) {
      panel.classList.toggle('fullscreen', this.isSettledPanelFullscreen);
      panel.classList.toggle('settled-panel-fullscreen', this.isSettledPanelFullscreen);
    }
    if (btn) {
      btn.innerText = this.isSettledPanelFullscreen ? '↙' : '↗';
    }
  },

  toggleSettledFullscreen() {
    const el = document.getElementById('settled-main-container');
    if (!document.fullscreenElement) {
      (el || document.documentElement).requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  },

  openSettledReturnDetails(returnId, debtId) {
    const debt = (this.allDebts || []).find(d => String(d.id) === String(debtId || this.activeSettledDebtId));
    let retItem = null;
    if (debt && Array.isArray(debt.returnedAmounts)) {
      retItem = debt.returnedAmounts.find(r => String(r.id) === String(returnId)) || debt.returnedAmounts[0];
    }
    if (!retItem && debt) {
      retItem = {
        id: returnId || (debt.id ? String(debt.id).replace(/\D/g, '').slice(-3) || '539' : '539'),
        returnDate: debt.displayDate || debt.date || '01/07/2026',
        depositorName: debt.borrowerName || debt.truckOwner || 'Laxmi Prakash Jat',
        returnMode: debt.debtMode || 'Adjustment',
        amount: Number(debt.totalReturned || debt.debtAmount) || 1500,
        description: debt.description || 'Puran Ji New Bablu Transport Company ke Mukesh Ji ko diye Shahpura mein purana hisaab (Rs.80000)'
      };
    }

    const body = document.getElementById('settled-return-modal-body');
    if (!body || !retItem) return;

    const greenBullet = `<span class="appsheet-bullet green-bullet">●</span> `;
    body.innerHTML = `
      <div class="row g-3">
        <div class="col-12">
          <div class="settled-field-row py-2 border-bottom">
            <span class="settled-field-label fw-bold text-muted" style="width: 140px;">ID</span>
            <span class="settled-field-value fw-bold text-success">${greenBullet}<span>${retItem.id || '539'}</span></span>
          </div>
          <div class="settled-field-row py-2 border-bottom">
            <span class="settled-field-label fw-bold text-muted" style="width: 140px;">Return Date</span>
            <span class="settled-field-value fw-bold text-success">${greenBullet}<span>${retItem.returnDate || retItem.displayDate || retItem.date || '-'}</span></span>
          </div>
          <div class="settled-field-row py-2 border-bottom">
            <span class="settled-field-label fw-bold text-muted" style="width: 140px;">Depositor Name</span>
            <span class="settled-field-value fw-bold text-success">${greenBullet}<span>${retItem.depositorName || retItem.partyName || '-'}</span></span>
          </div>
          <div class="settled-field-row py-2 border-bottom">
            <span class="settled-field-label fw-bold text-muted" style="width: 140px;">Return Mode</span>
            <span class="settled-field-value fw-bold text-success">${greenBullet}<span>${retItem.returnMode || retItem.mode || 'Adjustment'}</span></span>
          </div>
          <div class="settled-field-row py-2 border-bottom">
            <span class="settled-field-label fw-bold text-muted" style="width: 140px;">Returned Amount</span>
            <span class="settled-field-value fw-bold text-success">${greenBullet}<span>₹ ${this.formatINR(Number(retItem.amount || retItem.returnedAmount) || 0)}</span></span>
          </div>
          <div class="settled-field-row py-2">
            <span class="settled-field-label fw-bold text-muted" style="width: 140px;">Description</span>
            <span class="settled-field-value fw-bold text-success">${greenBullet}<span>${retItem.description || '-'}</span></span>
          </div>
        </div>
      </div>
    `;

    const modalEl = document.getElementById('modal-settled-return-details');
    if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  async syncSettledToFirestoreCloud() {
    const statusEl = document.getElementById('settled-cloud-status');
    if (statusEl) {
      statusEl.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status"></span> Syncing to Firebase...`;
      statusEl.className = 'badge rounded-pill text-bg-warning border text-dark ms-2 px-2 py-1';
    }

    try {
      if (!dbService.isFirebaseReady) {
        dbService.initDatabase();
      }

      if (dbService.isFirebaseReady && dbService.db) {
        const settledDebts = (this.allDebts || []).filter(d => (Number(d.dueAmount) || 0) === 0);
        const batchSize = 100;
        let count = 0;

        for (let i = 0; i < Math.min(settledDebts.length, 500); i += batchSize) {
          const chunk = settledDebts.slice(i, i + batchSize);
          const batch = dbService.db.batch();
          chunk.forEach(record => {
            const docRef = dbService.db.collection('debts').doc(String(record.id));
            batch.set(docRef, record, { merge: true });
            count++;
          });
          await batch.commit();
        }

        if (statusEl) {
          statusEl.innerHTML = `<i class="bi bi-cloud-check-fill me-1"></i> Cloud Synced (${count})`;
          statusEl.className = 'badge rounded-pill text-bg-light border text-success ms-2 px-2 py-1';
        }
        if (typeof AppUI !== 'undefined') {
          AppUI.showToast(`Successfully synced ${count} Settled records directly to Firebase Cloud Firestore!`, 'success');
        }
      } else {
        if (statusEl) {
          statusEl.innerHTML = `<i class="bi bi-cloud-slash me-1"></i> Offline Mode`;
          statusEl.className = 'badge rounded-pill text-bg-light border text-secondary ms-2 px-2 py-1';
        }
        if (typeof AppUI !== 'undefined') {
          AppUI.showToast('Firebase connection is offline; records are preserved safely.', 'warning');
        }
      }
    } catch (err) {
      console.error('Firebase Cloud sync error:', err);
      if (statusEl) {
        statusEl.innerHTML = `<i class="bi bi-exclamation-triangle me-1"></i> Sync Error`;
        statusEl.className = 'badge rounded-pill text-bg-danger text-white ms-2 px-2 py-1';
      }
      if (typeof AppUI !== 'undefined') {
        AppUI.showToast('Cloud sync failed: ' + err.message, 'error');
      }
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
    const compExpView = document.getElementById('ledger-view-company-expense');
    const ownerExpView = document.getElementById('ledger-view-owner-expense');
    const recView = document.getElementById('ledger-view-received');
    const openDebtsView = document.getElementById('ledger-view-open-debts');
    const allDebtsView = document.getElementById('ledger-view-all-debts');
    const settledView = document.getElementById('ledger-view-settled');
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
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
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
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
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
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
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
      if (this.mainViewMode === 'cash-ledger') {
        addBtnText.innerText = '+ Add';
      } else if (this.mainViewMode === 'company-expense') {
        addBtnText.innerText = '+ Add Expense';
      } else if (this.mainViewMode === 'owner-expense') {
        addBtnText.innerText = '+ Add Expen...';
      } else if (this.mainViewMode === 'received') {
        addBtnText.innerText = '+ New Recei...';
      } else if (this.mainViewMode === 'open-debts' || this.mainViewMode === 'settled') {
        addBtnText.innerText = '+ Add Debt';
      } else {
        addBtnText.innerText = '+ Add Debt';
      }
    }

    // 4. LEVEL 1: CASH LEDGER REGISTER VIEW
    if (this.mainViewMode === 'cash-ledger') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.remove('d-none');
      retView?.classList.add('d-none');
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
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
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
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

    // 4C. LEVEL 1: COMPANY EXPENSE VIEW (Authentic AppSheet Gold Master-Detail)
    if (this.mainViewMode === 'company-expense') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      regView?.classList.add('d-none');
      retView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.add('d-none');
      compExpView?.classList.remove('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Company Expense</span>
        `;
      }
      this.renderCompanyTreeSidebar();
      this.renderCompanyExpenseTable();
      if (this.activeCompanyExpenseId) {
        this.openCompanyExpenseDetails(this.activeCompanyExpenseId);
      } else {
        this.closeCompanyExpenseDetails();
      }
      return;
    }

    // 4D. LEVEL 1: RECEIVED (INCOME SLICE) VIEW (Authentic AppSheet Green Master-Detail)
    if (this.mainViewMode === 'received') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      regView?.classList.add('d-none');
      retView?.classList.add('d-none');
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.add('d-none');
      recView?.classList.remove('d-none');
      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Received</span>
        `;
      }
      this.renderReceivedTreeSidebar();
      this.renderReceivedTable();
      if (this.activeReceivedPaymentId) {
        this.openReceivedPaymentDetails(this.activeReceivedPaymentId);
      } else {
        this.closeReceivedPaymentDetails();
      }
      return;
    }

    // 4E. LEVEL 1: OPEN DEBTS VIEW (Authentic AppSheet Master-Detail)
    if (this.mainViewMode === 'open-debts' || (this.mainViewMode === 'debts' && this.currentTab === 'open')) {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      retView?.classList.add('d-none');
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.add('d-none');
      regView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
      openDebtsView?.classList.remove('d-none');

      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Open</span>
        `;
      }
      this.renderOpenDebtsTreeSidebar();
      this.renderOpenDebtsTable();
      if (this.activeOpenDebtId) {
        this.openOpenDebtDetails(this.activeOpenDebtId);
      } else {
        this.closeOpenDebtDetails();
      }
      return;
    }

    // 4F. LEVEL 1: ALL DEBTS VIEW (Authentic Google AppSheet Master-Detail)
    if (this.mainViewMode === 'all-debts' || (this.mainViewMode === 'debts' && this.currentTab === 'all')) {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      retView?.classList.add('d-none');
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.add('d-none');
      regView?.classList.add('d-none');
      allDebtsView?.classList.remove('d-none');

      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">All Debts</span>
        `;
      }
      this.renderAllDebtsTreeSidebar();
      this.renderAllDebtsTable();
      if (this.activeAllDebtId) {
        this.openAllDebtDetails(this.activeAllDebtId);
      } else {
        this.closeAllDebtDetails();
      }
      return;
    }

    // 4G. LEVEL 1: OWNER EXPENSE VIEW (Authentic AppSheet Hot-Pink Master-Detail)
    if (this.mainViewMode === 'owner-expense') {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      regView?.classList.add('d-none');
      retView?.classList.add('d-none');
      compExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      settledView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.add('d-none');
      ownerExpView?.classList.remove('d-none');

      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Owner</span>
        `;
      }
      this.renderOwnerTreeSidebar();
      this.renderOwnerExpenseTable();
      if (this.activeOwnerExpenseId) {
        this.openOwnerExpenseDetails(this.activeOwnerExpenseId);
      } else {
        this.closeOwnerExpenseDetails();
      }
      return;
    }

    // 4H. LEVEL 1: SETTLED DEBTS VIEW (Authentic Google AppSheet Green Master-Detail)
    if (this.mainViewMode === 'settled' || (this.mainViewMode === 'debts' && this.currentTab === 'settled')) {
      dashView?.classList.add('d-none');
      cashRegView?.classList.add('d-none');
      regView?.classList.add('d-none');
      retView?.classList.add('d-none');
      compExpView?.classList.add('d-none');
      ownerExpView?.classList.add('d-none');
      recView?.classList.add('d-none');
      openDebtsView?.classList.add('d-none');
      allDebtsView?.classList.add('d-none');
      detView?.classList.add('d-none');
      stmtView?.classList.add('d-none');
      settledView?.classList.remove('d-none');

      if (breadcrumbRoot) {
        breadcrumbRoot.innerHTML = `
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Home</a>
          <span class="sep">&gt;</span>
          <a href="javascript:void(0)" onclick="LedgerModule.goToDashboardView()">Ledger</a>
          <span class="sep">&gt;</span>
          <span class="active">Settled</span>
        `;
      }
      this.renderSettledTreeSidebar();
      this.renderSettledTable();
      if (this.activeSettledDebtId) {
        this.openSettledDebtDetails(this.activeSettledDebtId);
      } else {
        this.closeSettledDebtDetails();
      }
      return;
    }

    // 5. LEVEL 1-3: DEBTS REGISTER VIEWS
    dashView?.classList.add('d-none');
    cashRegView?.classList.add('d-none');
    retView?.classList.add('d-none');
    compExpView?.classList.add('d-none');
    ownerExpView?.classList.add('d-none');
    recView?.classList.add('d-none');
    openDebtsView?.classList.add('d-none');
    allDebtsView?.classList.add('d-none');
    settledView?.classList.add('d-none');
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

    if (compEl) this.filterCompany = compEl.value || 'ALL';
    if (typeEl) this.filterDebtType = typeEl.value || 'ALL';
    if (modeEl) this.filterDebtMode = modeEl.value || 'ALL';

    if (this.mainViewMode === 'all-debts') {
      this.applyAllDebtsFilters();
      this.renderAllDebtsTable();
      return;
    }

    if (this.mainViewMode === 'open-debts') {
      this.applyOpenDebtsFilters();
      this.renderOpenDebtsTable();
      return;
    }

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
    if (sumDueEl) sumDueEl.innerText = (typeof AppUI !== 'undefined' && AppUI.formatCurrency) ? AppUI.formatCurrency(totalDue) : `₹ ${this.formatINR(totalDue)}`;

    const sumDebtEl = document.getElementById('summary-total-debt');
    if (sumDebtEl) sumDebtEl.innerText = (typeof AppUI !== 'undefined' && AppUI.formatCurrency) ? AppUI.formatCurrency(totalDebt) : `₹ ${this.formatINR(totalDebt)}`;

    const sumRetEl = document.getElementById('summary-total-returned');
    if (sumRetEl) sumRetEl.innerText = (typeof AppUI !== 'undefined' && AppUI.formatCurrency) ? AppUI.formatCurrency(totalReturned) : `₹ ${this.formatINR(totalReturned)}`;

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
    if (this.mainViewMode === 'settled') {
      this.settledCurrentPage = 1;
      this.applySettledFilters();
      this.renderSettledTable();
      return;
    }
    if (this.mainViewMode === 'owner-expense') {
      this.ownerCurrentPage = 1;
      this.applyOwnerFilters();
      this.renderOwnerExpenseTable();
      return;
    }
    if (this.mainViewMode === 'all-debts') {
      this.allDebtsCurrentPage = 1;
      this.applyAllDebtsFilters();
      this.renderAllDebtsTable();
      return;
    }
    if (this.mainViewMode === 'open-debts') {
      this.openDebtsCurrentPage = 1;
      this.applyOpenDebtsFilters();
      this.renderOpenDebtsTable();
      return;
    }
    if (this.mainViewMode === 'received') {
      this.receivedCurrentPage = 1;
      this.applyReceivedFilters();
      this.renderReceivedTable();
      return;
    }
    if (this.mainViewMode === 'company-expense') {
      this.companyCurrentPage = 1;
      this.applyCompanyFilters();
      this.renderCompanyExpenseTable();
      return;
    }
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
    if (this.mainViewMode === 'settled') {
      this.settledCurrentPage = 1;
      this.applySettledFilters();
      this.renderSettledTable();
      return;
    }
    if (this.mainViewMode === 'owner-expense') {
      this.ownerCurrentPage = 1;
      this.applyOwnerFilters();
      this.renderOwnerExpenseTable();
      return;
    }
    if (this.mainViewMode === 'all-debts') {
      this.allDebtsCurrentPage = 1;
      this.applyAllDebtsFilters();
      this.renderAllDebtsTable();
      return;
    }
    if (this.mainViewMode === 'open-debts') {
      this.openDebtsCurrentPage = 1;
      this.applyOpenDebtsFilters();
      this.renderOpenDebtsTable();
      return;
    }
    if (this.mainViewMode === 'received') {
      this.receivedCurrentPage = 1;
      this.applyReceivedFilters();
      this.renderReceivedTable();
      return;
    }
    if (this.mainViewMode === 'company-expense') {
      this.companyCurrentPage = 1;
      this.applyCompanyFilters();
      this.renderCompanyExpenseTable();
      return;
    }
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

    if (this.mainViewMode === 'settled') {
      this.selectedSettledFY = 'ALL';
      this.selectedSettledDate = null;
      this.settledCurrentPage = 1;
      this.applySettledFilters();
      this.renderSettledTreeSidebar();
      this.renderSettledTable();
      return;
    }

    if (this.mainViewMode === 'owner-expense') {
      this.selectedOwnerFY = 'ALL';
      this.selectedOwnerMonth = 'ALL';
      this.selectedOwnerDate = null;
      this.ownerCurrentPage = 1;
      this.applyOwnerFilters();
      this.renderOwnerTreeSidebar();
      this.renderOwnerExpenseTable();
      return;
    }

    if (this.mainViewMode === 'open-debts') {
      this.selectedOpenDebtsDate = null;
      this.openDebtsCurrentPage = 1;
      this.applyOpenDebtsFilters();
      this.renderOpenDebtsTreeSidebar();
      this.renderOpenDebtsTable();
      return;
    }

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
    if (tabName === 'open') {
      return this.goToOpenDebtsView(this.selectedOpenDebtsFY || '2026-2027');
    }
    if (tabName === 'all') {
      return this.goToAllDebtsView(this.selectedAllDebtsFY || 'ALL');
    }
    if (tabName === 'settled') {
      return this.goToSettledView(this.selectedSettledFY || 'ALL');
    }
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

window.LedgerModule = LedgerModule;

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    LedgerModule.init();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      LedgerModule.init();
    });
  }
}
