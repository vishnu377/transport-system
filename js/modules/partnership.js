/**
 * Partnership Module - Module 13: Partnership (पार्टनरशिप एवं लाभ विभाजन)
 * 1:1 Authentic Google AppSheet Directory Replication
 * Supports Split-View Year Filter (2026-2027, 2025-2026, 2024-2025), Month-Grouped Table,
 * Add / Edit Slide Drawer with Live Financial Math (Partnership Amount = Prev + Income - Expense),
 * Real-Time Search, and Zero LocalStorage Policy.
 */

const PartnershipModule = {
  currentView: 'table',
  selectedYear: 'All', // 'All' | '2026-2027' | '2025-2026' | '2024-2025'
  allRecords: [],
  filteredRecords: [],
  searchQuery: '',
  availableYears: ['2026-2027', '2025-2026', '2024-2025'],

  // ========================================================
  // INITIALIZATION
  // ========================================================
  async init() {
    console.log('[PartnershipModule] Initializing 1:1 AppSheet Partnership module...');
    await this.loadData();
    this.renderSubbar();
    this.renderYearNav();
    this.renderTableView();
    console.log(`[PartnershipModule] Initialized successfully. Total records: ${this.allRecords.length}`);
  },

  async loadData() {
    if (typeof dbService !== 'undefined' && dbService.getAll) {
      try {
        const data = await dbService.getAll('partnership');
        if (data && data.length > 0) {
          this.allRecords = data;
          this.filterRecords();
          return;
        }
      } catch (err) {
        console.warn('[PartnershipModule] Could not fetch from dbService, using sample dataset:', err);
      }
    }

    if (typeof INITIAL_PARTNERSHIP !== 'undefined' && Array.isArray(INITIAL_PARTNERSHIP)) {
      this.allRecords = JSON.parse(JSON.stringify(INITIAL_PARTNERSHIP));
    } else {
      this.allRecords = [];
    }
    this.filterRecords();
  },

  filterRecords() {
    let list = [...this.allRecords];

    // Filter by year if specific year selected
    if (this.selectedYear && this.selectedYear !== 'All') {
      list = list.filter(r => r.year === this.selectedYear);
    }

    // Filter by search query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(r => 
        (r.date && r.date.toLowerCase().includes(q)) ||
        (r.monthGroup && r.monthGroup.toLowerCase().includes(q)) ||
        (r.year && r.year.toLowerCase().includes(q)) ||
        (r.income && r.income.toString().includes(q)) ||
        (r.expense && r.expense.toString().includes(q)) ||
        (r.partnershipAmount && r.partnershipAmount.toString().includes(q))
      );
    }

    this.filteredRecords = list;
  },

  // ========================================================
  // SUBBAR & BREADCRUMB
  // ========================================================
  renderSubbar() {
    const subbar = document.getElementById('partnershipSubbar');
    if (!subbar) return;

    subbar.innerHTML = `
      <div class="d-flex align-items-center gap-1">
        <a href="../index.html" class="breadcrumb-item-home"><i class="bi bi-house-door"></i> Home</a>
        <span class="text-muted mx-1">&gt;</span>
        <span class="text-dark fw-medium">Partnership</span>
        ${this.selectedYear !== 'All' ? `<span class="badge bg-light text-secondary border ms-2">${this.selectedYear}</span>` : ''}
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn-appsheet-add" onclick="PartnershipModule.openAddDrawer()">
          <i class="bi bi-plus-lg"></i> Add
        </button>
        <div class="vr mx-1" style="height: 18px; color: #dadce0;"></div>
        <button class="btn-icon-subtle" title="Sort / Filter">
          <i class="bi bi-funnel"></i>
        </button>
      </div>
    `;
  },

  // ========================================================
  // LEFT YEAR NAVIGATION PANE
  // ========================================================
  renderYearNav() {
    const nav = document.getElementById('partnershipYearNav');
    if (!nav) return;

    let html = `
      <div class="year-item ${this.selectedYear === 'All' ? 'active' : ''}" onclick="PartnershipModule.selectYear('All')">
        <span>All Years</span>
        <span class="year-badge">${this.allRecords.length}</span>
      </div>
    `;

    this.availableYears.forEach(yr => {
      const count = this.allRecords.filter(r => r.year === yr).length;
      html += `
        <div class="year-item ${this.selectedYear === yr ? 'active' : ''}" onclick="PartnershipModule.selectYear('${yr}')">
          <span>${yr}</span>
          <span class="year-badge">${count}</span>
        </div>
      `;
    });

    // Summary Card at bottom of Year Nav
    const currentTotalBalance = this.filteredRecords.length > 0 
      ? this.filteredRecords[0].partnershipAmount || 0 
      : 0;

    html += `
      <div class="mt-auto pt-3 border-top">
        <div class="p-2 bg-light rounded text-center">
          <div class="text-muted" style="font-size: 11px;">Current Balance</div>
          <div class="fw-bold text-primary font-monospace mt-1" style="font-size: 13px;">
            ${this.formatCurrency(currentTotalBalance)}
          </div>
        </div>
      </div>
    `;

    nav.innerHTML = html;
  },

  selectYear(yr) {
    this.selectedYear = yr;
    this.filterRecords();
    this.renderSubbar();
    this.renderYearNav();
    this.renderTableView();
  },

  // ========================================================
  // TABLE VIEW (MONTH-GROUPED WITH APPSHEET STYLING)
  // ========================================================
  renderTableView() {
    const container = document.getElementById('partnershipMainContent');
    if (!container) return;

    if (this.filteredRecords.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-calendar-x fs-1 d-block mb-3 text-secondary"></i>
          <h6>No partnership records found</h6>
          <p class="small">Click <strong>+ Add</strong> to create a monthly entry.</p>
        </div>
      `;
      return;
    }

    // Group records by Month Group (e.g. '12 Mar', '11 Feb'...)
    const grouped = new Map();
    this.filteredRecords.forEach(rec => {
      const g = rec.monthGroup || 'Other';
      if (!grouped.has(g)) {
        grouped.set(g, []);
      }
      grouped.get(g).push(rec);
    });

    let tbodyHtml = '';
    grouped.forEach((records, groupName) => {
      // Month group header with sum
      const groupIncome = records.reduce((s, r) => s + (Number(r.income) || 0), 0);
      const groupExpense = records.reduce((s, r) => s + (Number(r.expense) || 0), 0);

      tbodyHtml += `
        <tr class="appsheet-group-header-row">
          <td colspan="5">
            <div class="d-flex align-items-center justify-content-between">
              <span><i class="bi bi-chevron-down small me-1"></i> ${groupName}</span>
              <span class="badge bg-white text-secondary border font-monospace">
                Inc: ${this.formatCurrency(groupIncome)} | Exp: ${this.formatCurrency(groupExpense)}
              </span>
            </div>
          </td>
        </tr>
      `;

      records.forEach(r => {
        tbodyHtml += `
          <tr class="data-row" onclick="PartnershipModule.openEditDrawer('${r.id}')" title="Click to view details / edit">
            <td style="font-weight: 500;">${r.monthGroup || '-'}</td>
            <td class="amount-cell amount-cell-inc">${this.formatCurrency(r.income)}</td>
            <td class="amount-cell amount-cell-exp">${this.formatCurrency(r.expense)}</td>
            <td class="amount-cell amount-cell-part">${this.formatCurrency(r.partnershipAmount)}</td>
            <td class="date-cell">${r.date || '-'}</td>
          </tr>
        `;
      });
    });

    container.innerHTML = `
      <table class="partnership-table">
        <thead>
          <tr>
            <th style="width: 20%;">Month / Group</th>
            <th style="width: 20%; text-align: right;">Income</th>
            <th style="width: 20%; text-align: right;">Expense</th>
            <th style="width: 25%; text-align: right;">Partnership Amount</th>
            <th style="width: 15%;">Date</th>
          </tr>
        </thead>
        <tbody>
          ${tbodyHtml}
        </tbody>
      </table>
    `;
  },

  // ========================================================
  // REAL-TIME SEARCH ENGINE
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').trim();
    this.filterRecords();
    this.renderTableView();
  },

  // ========================================================
  // LIVE FORMULA CALCULATION
  // ========================================================
  recalcPartnershipAmount() {
    const prev = parseFloat(document.getElementById('partInputPrevAmount').value) || 0;
    const inc = parseFloat(document.getElementById('partInputIncome').value) || 0;
    const exp = parseFloat(document.getElementById('partInputExpense').value) || 0;

    const net = prev + inc - exp;

    const amtInput = document.getElementById('partInputAmount');
    if (amtInput) amtInput.value = net.toFixed(2);

    const preview = document.getElementById('previewCalculatedAmount');
    if (preview) preview.innerText = this.formatCurrency(net);
  },

  onDateChange(val) {
    // If date changes and prev amount is empty, try auto-filling from preceding record
    if (this.allRecords.length > 0) {
      const prevInput = document.getElementById('partInputPrevAmount');
      if (prevInput && !prevInput.value) {
        prevInput.value = (this.allRecords[0].partnershipAmount || 0).toFixed(2);
        this.recalcPartnershipAmount();
      }
    }
  },

  // ========================================================
  // + ADD / EDIT SLIDE DRAWER (1:1 APPSHEET)
  // ========================================================
  openAddDrawer() {
    document.getElementById('formRecordId').value = '';
    document.getElementById('partnershipDrawerTitle').innerText = 'Details';
    
    // Auto-prefill current date
    const now = new Date();
    const dStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    document.getElementById('partInputDate').value = dStr;

    // Prefill previous amount from most recent record
    const latestAmount = this.allRecords.length > 0 ? (this.allRecords[0].partnershipAmount || 0) : 0;
    document.getElementById('partInputPrevAmount').value = latestAmount.toFixed(2);
    document.getElementById('partInputIncome').value = '';
    document.getElementById('partInputExpense').value = '';
    document.getElementById('partInputAmount').value = latestAmount.toFixed(2);
    document.getElementById('partInputNotes').value = '';

    this.recalcPartnershipAmount();

    const drawerEl = document.getElementById('partnershipDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsDrawer.show();
    }
  },

  openEditDrawer(recordId) {
    const record = this.allRecords.find(r => r.id === recordId);
    if (!record) return;

    document.getElementById('formRecordId').value = record.id;
    document.getElementById('partnershipDrawerTitle').innerText = 'Details';
    document.getElementById('partInputDate').value = record.date || '';
    document.getElementById('partInputPrevAmount').value = (record.previousMonthAmount || 0).toFixed(2);
    document.getElementById('partInputIncome').value = (record.income || 0).toFixed(2);
    document.getElementById('partInputExpense').value = (record.expense || 0).toFixed(2);
    document.getElementById('partInputAmount').value = (record.partnershipAmount || 0).toFixed(2);
    document.getElementById('partInputNotes').value = record.notes || '';

    this.recalcPartnershipAmount();

    const drawerEl = document.getElementById('partnershipDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsDrawer.show();
    }
  },

  async saveRecord() {
    const id = document.getElementById('formRecordId').value.trim();
    const dateStr = document.getElementById('partInputDate').value.trim();
    const prevAmt = parseFloat(document.getElementById('partInputPrevAmount').value) || 0;
    const income = parseFloat(document.getElementById('partInputIncome').value) || 0;
    const expense = parseFloat(document.getElementById('partInputExpense').value) || 0;
    const partAmt = parseFloat(document.getElementById('partInputAmount').value) || (prevAmt + income - expense);
    const notes = document.getElementById('partInputNotes').value.trim();

    if (!dateStr) {
      alert('Please enter a valid Date.');
      return;
    }

    // Determine year & month group from date (e.g. 31/10/2026 or 31-10-2026)
    const parts = dateStr.split(/[-/]/);
    let yr = '2026-2027';
    let monthGroup = '10 Oct';

    if (parts.length >= 3) {
      const m = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      const monthNames = ['', '1 Jan', '2 Feb', '3 Mar', '4 Apr', '5 May', '6 Jun', '7 Jul', '8 Aug', '9 Sep', '10 Oct', '11 Nov', '12 Dec'];
      monthGroup = monthNames[m] || 'Month';

      if (y >= 2026 && m >= 4) yr = '2026-2027';
      else if ((y === 2026 && m <= 3) || (y === 2025 && m >= 4)) yr = '2025-2026';
      else yr = '2024-2025';
    }

    const record = {
      id: id || `part_${Date.now()}`,
      date: dateStr,
      monthGroup: monthGroup,
      year: yr,
      previousMonthAmount: prevAmt,
      income: income,
      expense: expense,
      partnershipAmount: partAmt,
      notes: notes,
      updatedAt: new Date().toISOString()
    };

    if (id) {
      const idx = this.allRecords.findIndex(r => r.id === id);
      if (idx !== -1) {
        this.allRecords[idx] = { ...this.allRecords[idx], ...record };
      }
    } else {
      this.allRecords.unshift(record);
    }

    if (typeof dbService !== 'undefined' && dbService.save) {
      await dbService.save('partnership', record);
    }

    this.filterRecords();
    this.renderYearNav();
    this.renderTableView();

    const drawerEl = document.getElementById('partnershipDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getInstance(drawerEl);
      if (bsDrawer) bsDrawer.hide();
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Partnership record saved successfully!', 'success');
    } else {
      console.log('[Toast SUCCESS]: Partnership record saved successfully!');
    }
  },

  async deleteRecord(recordId) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.allRecords = this.allRecords.filter(r => r.id !== recordId);
    if (typeof dbService !== 'undefined' && dbService.delete) {
      await dbService.delete('partnership', recordId);
    }

    this.filterRecords();
    this.renderYearNav();
    this.renderTableView();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Partnership record deleted.', 'info');
    } else {
      console.log('[Toast INFO]: Partnership record deleted.');
    }
  },

  // Helper: Format Currency (₹)
  formatCurrency(val) {
    const num = Number(val) || 0;
    return '₹ ' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.PartnershipModule = PartnershipModule;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PartnershipModule;
}
