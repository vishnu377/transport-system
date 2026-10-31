/**
 * Partnership Module - Module 13: Partnership (पार्टनरशिप)
 * 1:1 Authentic Google AppSheet Replication matching screenshots
 * - 167px Left Side View Navigation (2026-2027, 2025-2026, 2024-2025)
 * - 620px Compact AppSheet Table grouped by Indian Financial Months (12 Mar down to 1 Apr)
 * - Slide Drawer matching AppSheet Details Drawer (700px, 2-column inputs + lower display summary)
 * - Live Financial Math: Partnership Amount = Previous Month Amount + Income - Expense
 * - Zero LocalStorage Policy (In-memory + dbService/Firestore)
 */

const PartnershipModule = {
  currentView: 'table',
  selectedYear: 'All', // 'All' | '2026-2027' | '2025-2026' | '2024-2025'
  allRecords: [],
  filteredRecords: [],
  searchQuery: '',
  availableYears: ['2026-2027', '2025-2026', '2024-2025'],
  standardMonthOrder: [
    '12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', 
    '7 Oct', '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'
  ],

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
        console.warn('[PartnershipModule] Could not fetch from dbService, falling back to sample data:', err);
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

    // Filter by year if a specific financial year is selected
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
      <div class="d-flex align-items-center gap-2">
        <a href="../index.html" class="breadcrumb-item-home">
          <i class="bi bi-chevron-left" style="font-size: 11px;"></i>
          <span>Home</span>
        </a>
        <span class="text-muted" style="font-size: 11px;">&gt;</span>
        <span style="font-weight: 500; color: #202124;">Partnership</span>
        ${this.selectedYear !== 'All' ? `<span class="badge bg-light text-secondary border ms-1" style="font-size: 11px;">${this.selectedYear}</span>` : ''}
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn-appsheet-gold" onclick="PartnershipModule.openAddDrawer()">
          <i class="bi bi-plus-lg"></i> ADD
        </button>
        <div class="vr mx-1" style="height: 18px; color: #dadce0;"></div>
        <button class="btn-icon-subtle" onclick="PartnershipModule.toggleFilterMenu()" title="Filter Financial Year">
          <i class="bi bi-funnel"></i>
        </button>
      </div>
    `;
  },

  // ========================================================
  // 167px LEFT SIDE VIEW NAVIGATION (1:1 with Screenshot 1)
  // ========================================================
  renderYearNav() {
    const nav = document.getElementById('partnershipYearNav');
    if (!nav) return;

    let html = '';
    this.availableYears.forEach(yr => {
      const isActive = (this.selectedYear === yr);
      html += `
        <div 
          class="appsheet-view-item ${isActive ? 'active' : ''}" 
          onclick="PartnershipModule.selectYear('${yr}')"
          title="Filter to ${yr}">
          ${yr}
        </div>
      `;
    });

    nav.innerHTML = html;
  },

  selectYear(yr) {
    if (this.selectedYear === yr) {
      // Toggle back to All if already selected
      this.selectedYear = 'All';
    } else {
      this.selectedYear = yr;
    }
    this.filterRecords();
    this.renderSubbar();
    this.renderYearNav();
    this.renderTableView();
  },

  toggleFilterMenu() {
    const years = ['All', ...this.availableYears];
    const currentIndex = years.indexOf(this.selectedYear);
    const nextIndex = (currentIndex + 1) % years.length;
    this.selectYear(years[nextIndex]);
  },

  // ========================================================
  // 620px COMPACT APPSHEET TABLE VIEW (1:1 with Screenshot 1)
  // ========================================================
  renderTableView() {
    const container = document.getElementById('partnershipMainContent');
    if (!container) return;

    if (this.filteredRecords.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted" style="width: var(--appsheet-table-w);">
          <i class="bi bi-table fs-2 d-block mb-2 text-secondary"></i>
          <div style="font-size: 13px; font-weight: 500;">No partnership records found</div>
          <div class="small text-muted mt-1">Click <strong>+ ADD</strong> to create a monthly entry.</div>
        </div>
      `;
      return;
    }

    // Group records by Month Group (e.g. '12 Mar', '11 Feb'...)
    const grouped = new Map();
    this.filteredRecords.forEach(rec => {
      const g = rec.monthGroup || this.determineMonthGroup(rec.date);
      if (!grouped.has(g)) {
        grouped.set(g, []);
      }
      grouped.get(g).push(rec);
    });

    // Sort Month Groups according to standard Indian Financial Year descending order
    const sortedGroups = Array.from(grouped.keys()).sort((a, b) => {
      const idxA = this.standardMonthOrder.indexOf(a);
      const idxB = this.standardMonthOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    let tbodyHtml = '';

    sortedGroups.forEach(groupName => {
      const records = grouped.get(groupName);

      // Group Header Row in AppSheet Table: displays Month Group in first column
      tbodyHtml += `
        <tr class="appsheet-group-row appsheet-group-header-row">
          <td colspan="5">
            <span>${groupName}</span>
          </td>
        </tr>
      `;

      // Child data rows under this month
      records.forEach((r, idx) => {
        const incomeFormatted = (r.income && Number(r.income) > 0)
          ? `₹ ${this.formatNumber(r.income)}`
          : (r.income === 0 ? '₹ 0.00' : '');

        const expenseFormatted = (r.expense !== undefined && r.expense !== null)
          ? `₹ ${this.formatNumber(r.expense)}`
          : '';

        const amountFormatted = (r.partnershipAmount !== undefined && r.partnershipAmount !== null)
          ? `₹ ${this.formatNumber(r.partnershipAmount)}`
          : '';

        tbodyHtml += `
          <tr class="appsheet-data-row" onclick="PartnershipModule.openEditDrawer('${r.id}')" title="Click to view details / edit">
            <td class="cell-month"></td>
            <td class="cell-num">${incomeFormatted}</td>
            <td class="cell-num">${expenseFormatted}</td>
            <td class="cell-num">${amountFormatted}</td>
            <td class="cell-date">${r.date || '-'}</td>
          </tr>
        `;
      });
    });

    container.innerHTML = `
      <table class="partnership-table">
        <thead>
          <tr>
            <th class="col-month-hdr">Month / Group</th>
            <th class="col-income-hdr">Income</th>
            <th class="col-expense-hdr">Expense</th>
            <th class="col-amount-hdr">Partnership Amount</th>
            <th class="col-date-hdr">Date</th>
          </tr>
        </thead>
        <tbody>
          ${tbodyHtml}
        </tbody>
      </table>
    `;
  },

  // Helper to determine month group if missing
  determineMonthGroup(dateStr) {
    if (!dateStr) return 'Other';
    const parts = dateStr.split(/[-/]/);
    if (parts.length < 2) return 'Other';
    const month = parseInt(parts[1], 10);
    const mapping = {
      4: '1 Apr', 5: '2 May', 6: '3 Jun', 7: '4 Jul', 8: '5 Aug', 9: '6 Sep',
      10: '7 Oct', 11: '8 Nov', 12: '9 Dec', 1: '10 Jan', 2: '11 Feb', 3: '12 Mar'
    };
    return mapping[month] || 'Other';
  },

  // Helper to determine financial year
  determineYear(dateStr) {
    if (!dateStr) return '2026-2027';
    const parts = dateStr.split(/[-/]/);
    if (parts.length < 3) return '2026-2027';
    const month = parseInt(parts[1], 10);
    const yr = parseInt(parts[2], 10);
    if (month >= 4) {
      return `${yr}-${yr + 1}`;
    } else {
      return `${yr - 1}-${yr}`;
    }
  },

  // ========================================================
  // SEARCH ENGINE
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').trim();
    this.filterRecords();
    this.renderTableView();
  },

  // ========================================================
  // LIVE FORMULA CALCULATION (Partnership Amount = Prev + Income - Expense)
  // ========================================================
  recalcPartnershipAmount() {
    const prevInput = document.getElementById('partInputPrevAmount');
    const incInput = document.getElementById('partInputIncome');
    const expInput = document.getElementById('partInputExpense');
    const amtInput = document.getElementById('partInputAmount');

    const prev = parseFloat(prevInput ? prevInput.value : 0) || 0;
    const inc = parseFloat(incInput ? incInput.value : 0) || 0;
    const exp = parseFloat(expInput ? expInput.value : 0) || 0;

    const net = prev + inc - exp;

    if (amtInput) amtInput.value = net.toFixed(2);

    // Update Lower Summary Section (1:1 with Screenshot 2)
    const summaryInc = document.getElementById('summaryIncome');
    const summaryExp = document.getElementById('summaryExpense');
    const summaryAmt = document.getElementById('summaryAmount');

    if (summaryInc) summaryInc.textContent = this.formatNumber(inc);
    if (summaryExp) summaryExp.textContent = this.formatNumber(exp);
    if (summaryAmt) summaryAmt.textContent = this.formatNumber(net);

    return net;
  },

  // ========================================================
  // SLIDE DRAWER OPERATIONS (1:1 with Screenshot 2)
  // ========================================================
  openAddDrawer() {
    const drawer = document.getElementById('partnershipDrawer');
    const backdrop = document.getElementById('appsheetBackdrop');
    const form = document.getElementById('partDrawerForm');
    const title = document.getElementById('drawerTitle');
    const subTitle = document.getElementById('partnershipDrawerTitle');
    const delWrap = document.getElementById('drawerDeleteWrap');

    if (form) form.reset();
    const idEl1 = document.getElementById('partRecordId');
    const idEl2 = document.getElementById('formRecordId');
    if (idEl1) idEl1.value = '';
    if (idEl2) idEl2.value = '';

    if (title) title.textContent = 'Details';
    if (subTitle) {
      subTitle.innerText = 'Details';
      subTitle.textContent = 'Details';
    }
    if (delWrap) delWrap.style.display = 'none';

    // Auto-fill previous month amount from latest entry if available
    let latestPrevAmount = 0;
    if (this.allRecords.length > 0) {
      latestPrevAmount = this.allRecords[0].partnershipAmount || 0;
    }

    const prevInput = document.getElementById('partInputPrevAmount');
    if (prevInput) prevInput.value = latestPrevAmount ? latestPrevAmount.toFixed(2) : '0.00';

    // Default today's date in DD-MM-YYYY format matching Screenshot 2
    const now = new Date();
    const dStr = String(now.getDate()).padStart(2, '0');
    const mStr = String(now.getMonth() + 1).padStart(2, '0');
    const yStr = now.getFullYear();
    const dateInput = document.getElementById('partInputDate');
    if (dateInput) dateInput.value = `${dStr}-${mStr}-${yStr}`;

    this.recalcPartnershipAmount();

    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  },

  openEditDrawer(id) {
    const record = this.allRecords.find(r => r.id === id);
    if (!record) return;

    const drawer = document.getElementById('partnershipDrawer');
    const backdrop = document.getElementById('appsheetBackdrop');
    const title = document.getElementById('drawerTitle');
    const subTitle = document.getElementById('partnershipDrawerTitle');
    const delWrap = document.getElementById('drawerDeleteWrap');

    if (title) title.textContent = 'Details';
    if (subTitle) {
      subTitle.innerText = 'Details';
      subTitle.textContent = 'Details';
    }
    if (delWrap) delWrap.style.display = 'block';

    const idEl1 = document.getElementById('partRecordId');
    const idEl2 = document.getElementById('formRecordId');
    if (idEl1) idEl1.value = record.id || '';
    if (idEl2) idEl2.value = record.id || '';
    
    // Format date with hyphens matching Screenshot 2 (e.g. 31-10-2026)
    const formattedDate = (record.date || '').replace(/\//g, '-');
    const dateEl = document.getElementById('partInputDate');
    if (dateEl) dateEl.value = formattedDate;

    const prevEl = document.getElementById('partInputPrevAmount');
    if (prevEl) prevEl.value = (record.previousMonthAmount !== undefined) 
      ? Number(record.previousMonthAmount).toFixed(2) 
      : '0.00';

    const incEl = document.getElementById('partInputIncome');
    if (incEl) incEl.value = (record.income !== undefined) 
      ? Number(record.income).toFixed(2) 
      : '0.00';

    const expEl = document.getElementById('partInputExpense');
    if (expEl) expEl.value = (record.expense !== undefined) 
      ? Number(record.expense).toFixed(2) 
      : '0.00';

    const amtEl = document.getElementById('partInputAmount');
    if (amtEl) amtEl.value = (record.partnershipAmount !== undefined) 
      ? Number(record.partnershipAmount).toFixed(2) 
      : '0.00';

    const notesEl = document.getElementById('partInputNotes');
    if (notesEl) notesEl.value = record.notes || '';

    // Update Lower Summary
    const summaryInc = document.getElementById('summaryIncome');
    const summaryExp = document.getElementById('summaryExpense');
    const summaryAmt = document.getElementById('summaryAmount');

    if (summaryInc) summaryInc.textContent = this.formatNumber(record.income || 0);
    if (summaryExp) summaryExp.textContent = this.formatNumber(record.expense || 0);
    if (summaryAmt) summaryAmt.textContent = this.formatNumber(record.partnershipAmount || 0);

    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  },

  closeDrawer() {
    const drawer = document.getElementById('partnershipDrawer');
    const backdrop = document.getElementById('appsheetBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  async saveDrawer() {
    const idEl1 = document.getElementById('partRecordId');
    const idEl2 = document.getElementById('formRecordId');
    const id = (idEl1 && idEl1.value) || (idEl2 && idEl2.value) || '';

    const dateEl = document.getElementById('partInputDate');
    const rawDate = dateEl ? dateEl.value.trim() : '';

    const prevEl = document.getElementById('partInputPrevAmount');
    const prevAmount = parseFloat(prevEl ? prevEl.value : 0) || 0;

    const incEl = document.getElementById('partInputIncome');
    const income = parseFloat(incEl ? incEl.value : 0) || 0;

    const expEl = document.getElementById('partInputExpense');
    const expense = parseFloat(expEl ? expEl.value : 0) || 0;

    const notesEl = document.getElementById('partInputNotes');
    const notes = notesEl ? notesEl.value : '';

    if (!rawDate) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter a valid Date', 'warning');
      return;
    }

    const calculatedAmount = prevAmount + income - expense;
    const monthGroup = this.determineMonthGroup(rawDate);
    const year = this.determineYear(rawDate);

    const recordData = {
      id: id || `part_${Date.now()}`,
      date: rawDate,
      monthGroup: monthGroup,
      year: year,
      previousMonthAmount: prevAmount,
      income: income,
      expense: expense,
      partnershipAmount: Number(calculatedAmount.toFixed(2)),
      notes: notes,
      updatedAt: new Date().toISOString()
    };

    if (id) {
      // Update existing
      const idx = this.allRecords.findIndex(r => r.id === id);
      if (idx !== -1) {
        this.allRecords[idx] = { ...this.allRecords[idx], ...recordData };
      }
    } else {
      // Insert new at beginning
      this.allRecords.unshift(recordData);
    }

    // Persist to dbService / Firestore
    if (typeof dbService !== 'undefined' && dbService.save) {
      try {
        await dbService.save('partnership', recordData);
      } catch (err) {
        console.warn('[PartnershipModule] Could not persist to dbService:', err);
      }
    }

    this.filterRecords();
    this.renderSubbar();
    this.renderYearNav();
    this.renderTableView();
    this.closeDrawer();

    if (typeof AppUI !== 'undefined') {
      AppUI.showToast('Partnership record saved successfully', 'success');
    }
  },

  async saveRecord() {
    return this.saveDrawer();
  },

  async deleteRecord(id) {
    if (!id) return;
    this.allRecords = this.allRecords.filter(r => r.id !== id);

    if (typeof dbService !== 'undefined' && dbService.delete) {
      try {
        await dbService.delete('partnership', id);
      } catch (err) {
        console.warn('[PartnershipModule] Could not delete from dbService:', err);
      }
    }

    this.filterRecords();
    this.renderSubbar();
    this.renderYearNav();
    this.renderTableView();
    this.closeDrawer();
  },

  async deleteCurrentRecord() {
    const id = document.getElementById('partRecordId').value;
    if (!id) return;

    if (!confirm('Are you sure you want to delete this monthly partnership entry?')) {
      return;
    }

    this.allRecords = this.allRecords.filter(r => r.id !== id);

    if (typeof dbService !== 'undefined' && dbService.delete) {
      try {
        await dbService.delete('partnership', id);
      } catch (err) {
        console.warn('[PartnershipModule] Could not delete from dbService:', err);
      }
    }

    this.filterRecords();
    this.renderSubbar();
    this.renderYearNav();
    this.renderTableView();
    this.closeDrawer();

    if (typeof AppUI !== 'undefined') {
      AppUI.showToast('Partnership record deleted', 'info');
    }
  },

  async syncData() {
    await this.loadData();
    this.renderTableView();
    if (typeof AppUI !== 'undefined') {
      AppUI.showToast('Partnership data synchronized with server', 'success');
    }
  },

  // ========================================================
  // FORMATTING UTILITIES
  // ========================================================
  formatNumber(val) {
    if (val === undefined || val === null || isNaN(val)) return '0.00';
    const num = Number(val);
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  formatCurrency(val) {
    if (val === undefined || val === null || isNaN(val)) return '₹ 0.00';
    return `₹ ${this.formatNumber(val)}`;
  }
};

// Export for Node.js test environment or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PartnershipModule;
} else {
  window.PartnershipModule = PartnershipModule;
}
