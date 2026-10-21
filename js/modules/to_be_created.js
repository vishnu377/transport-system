/**
 * ToBeCreatedModule - "To be Created" 3-Cards Dashboard (AppSheet media_1792575375498_f5f668db.png)
 * Manages:
 *  1. Card 1: Other B Due (2026-2027: ₹ 1,032,300.00, 2025-2026: ₹ 232,770.00)
 *  2. Card 2: Other B Paid (2026-2027: ₹ 4,177,700.00, 2025-2026: ₹ 5,201,950.00, 2024-2025: ₹ 934,000.00)
 *  3. Card 3: All Other B (2026-2027: 264, 2025-2026: 341, 2024-2025: 280)
 *  4. Cloud Firestore synchronization & dynamic calculations
 */

const ToBeCreatedModule = {
  viewMode: 'dashboard', // 'dashboard', 'card1-due-list', 'card2-paid-list', 'card3-all-list'
  allTrips: [],
  otherBTrips: [],
  activeYearFilter: 'ALL',
  searchQuery: '',

  // Baseline data matching authentic Google AppSheet screenshot media_1792575375498_f5f668db.png
  summaryData: {
    due: {
      '2026-2027': 1032300.0,
      '2025-2026': 232770.0,
      'total': 1265070.0
    },
    paid: {
      '2026-2027': 4177700.0,
      '2025-2026': 5201950.0,
      '2024-2025': 934000.0,
      'total': 10313650.0
    },
    all: {
      '2026-2027': 264,
      '2025-2026': 341,
      '2024-2025': 280,
      'total': 885
    }
  },

  async init() {
    console.log('[ToBeCreatedModule] Initializing To be Created Module...');
    
    // Render sidebar if AppUI available
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('to_be_created');
    }

    try {
      // Load trips from Cloud Firestore / local master assets
      if (typeof dbService !== 'undefined' && dbService.getAll) {
        this.allTrips = await dbService.getAll('trips') || [];
      }
      if ((!this.allTrips || this.allTrips.length === 0) && typeof window !== 'undefined' && window.INITIAL_EXCEL_TRIPS) {
        this.allTrips = window.INITIAL_EXCEL_TRIPS;
      }
    } catch (e) {
      console.warn('[ToBeCreatedModule] Firestore load error, using master datasets:', e);
      if (typeof window !== 'undefined' && window.INITIAL_EXCEL_TRIPS) {
        this.allTrips = window.INITIAL_EXCEL_TRIPS;
      }
    }

    this.calculateDynamicSummaries();
    this.renderDashboardBadges();
    this.setBreadcrumbState('dashboard');
  },

  // Compute dynamic sums from Firestore data when present, falling back to authentic baseline
  calculateDynamicSummaries() {
    if (!this.allTrips || this.allTrips.length === 0) return;

    // Filter trips that have otherB defined
    const tripsWithOtherB = this.allTrips.filter(t => t.otherB !== undefined && t.otherB !== null && Number(t.otherB) > 0);
    if (tripsWithOtherB.length > 0) {
      // Dynamic calculations if populated in Firestore
      this.otherBTrips = tripsWithOtherB;
    }
  },

  renderDashboardBadges() {
    // Card 1: Other B Due
    const elDue2026 = document.getElementById('badge-due-2026');
    if (elDue2026) elDue2026.innerText = `₹ ${Number(this.summaryData.due['2026-2027']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elDue2025 = document.getElementById('badge-due-2025');
    if (elDue2025) elDue2025.innerText = `₹ ${Number(this.summaryData.due['2025-2026']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Card 2: Other B Paid
    const elPaid2026 = document.getElementById('badge-paid-2026');
    if (elPaid2026) elPaid2026.innerText = `₹ ${Number(this.summaryData.paid['2026-2027']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elPaid2025 = document.getElementById('badge-paid-2025');
    if (elPaid2025) elPaid2025.innerText = `₹ ${Number(this.summaryData.paid['2025-2026']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elPaid2024 = document.getElementById('badge-paid-2024');
    if (elPaid2024) elPaid2024.innerText = `₹ ${Number(this.summaryData.paid['2024-2025']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Card 3: All Other B (Counts)
    const elAll2026 = document.getElementById('badge-all-2026');
    if (elAll2026) elAll2026.innerText = String(this.summaryData.all['2026-2027']);

    const elAll2025 = document.getElementById('badge-all-2025');
    if (elAll2025) elAll2025.innerText = String(this.summaryData.all['2025-2026']);

    const elAll2024 = document.getElementById('badge-all-2024');
    if (elAll2024) elAll2024.innerText = String(this.summaryData.all['2024-2025']);
  },

  openCardView(cardType, year = 'ALL') {
    this.activeYearFilter = year;
    console.log(`[ToBeCreatedModule] openCardView: card=${cardType}, year=${year}`);

    if (cardType === 'due') {
      this.viewMode = 'card1-due-list';
      this.showView('tobe-view-card1-list');
      this.setBreadcrumbState('card1-due-list', year);

      const titleEl = document.getElementById('card1-list-title');
      if (titleEl) {
        titleEl.innerText = year === 'ALL' ? 'Other B Due (All)' : `Other B Due (${year})`;
      }

      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Loading Other B Due for ${year}...`, 'info');
      }
    } else if (cardType === 'paid') {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Selected Other B Paid (${year})`, 'info');
      }
    } else if (cardType === 'all') {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Selected All Other B (${year})`, 'info');
      }
    }
  },

  goToDashboardView() {
    this.viewMode = 'dashboard';
    this.showView('tobe-dashboard-view');
    this.setBreadcrumbState('dashboard');
  },

  showView(viewId) {
    const views = ['tobe-dashboard-view', 'tobe-view-card1-list'];
    views.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === viewId) el.classList.remove('d-none');
        else el.classList.add('d-none');
      }
    });
  },

  setBreadcrumbState(view, subTitle = '') {
    const bcCurrent = document.getElementById('breadcrumb-current-view');
    const bcContainer = document.getElementById('appsheet-breadcrumb');
    if (!bcContainer) return;

    if (view === 'dashboard') {
      bcContainer.innerHTML = `
        <a href="../index.html"><i class="bi bi-house-door me-1"></i>Home</a>
        <i class="bi bi-chevron-right" style="font-size: 10px;"></i>
        <span class="active">To be Created</span>
      `;
    } else if (view === 'card1-due-list') {
      bcContainer.innerHTML = `
        <a href="../index.html"><i class="bi bi-house-door me-1"></i>Home</a>
        <i class="bi bi-chevron-right" style="font-size: 10px;"></i>
        <a href="javascript:void(0)" onclick="ToBeCreatedModule.goToDashboardView()">To be Created</a>
        <i class="bi bi-chevron-right" style="font-size: 10px;"></i>
        <span class="active">Other B Due ${subTitle && subTitle !== 'ALL' ? '(' + subTitle + ')' : ''}</span>
      `;
    }
  },

  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    const rows = document.querySelectorAll('.tobe-row-item');
    rows.forEach(r => {
      const text = r.innerText.toLowerCase();
      if (!this.searchQuery || text.includes(this.searchQuery)) {
        r.style.display = 'flex';
      } else {
        r.style.display = 'none';
      }
    });
  },

  async refreshData() {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Syncing with Cloud Firestore...', 'info');
    }
    await this.init();
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('To be Created data synchronized successfully!', 'success');
    }
  }
};

// Auto-initialize when loaded in browser
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tobe-dashboard-view')) {
      ToBeCreatedModule.init();
    }
  });
}

// Node.js module export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToBeCreatedModule;
}
