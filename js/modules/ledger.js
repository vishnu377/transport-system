/**
 * Financial Ledger & Statements Module (AppSheet Design)
 * Comprehensive Open Debts Register, Financial Years, Month Ledgers, 3-Card Details & Customer Statements
 */

const LedgerModule = {
  allDebts: [],
  allParties: [],
  allOwners: [],
  allTrips: [],
  allPayments: [],

  // Filtering & Pagination State
  currentTab: 'open', // 'open' | 'settled' | 'statements'
  selectedFY: 'ALL',
  selectedMonth: 'ALL',
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
    AppUI.renderSidebar('ledger');
    await this.loadData();
    this.renderFYSidebar();
    this.applyFilters();
  },

  async loadData() {
    this.allDebts = await dbService.getAll('debts');
    this.allParties = await dbService.getAll('parties');
    this.allOwners = await dbService.getAll('truckOwners');
    this.allTrips = await dbService.getAll('trips');
    this.allPayments = await dbService.getAll('payments');
  },

  // ----------------------------------------------------
  // FINANCIAL YEAR SIDEBAR & DUE BALANCES
  // ----------------------------------------------------
  renderFYSidebar() {
    const fyListContainer = document.getElementById('fy-list-container');
    if (!fyListContainer) return;

    const fyYears = [
      '2026-2027',
      '2025-2026',
      '2024-2025',
      '2023-2024',
      '2022-2023',
      '2020-2021',
      '2019-2020'
    ];

    // Compute live due totals per FY
    const fyTotals = {};
    let grandTotalDue = 0;

    fyYears.forEach(fy => {
      fyTotals[fy] = 0;
    });

    this.allDebts.forEach(d => {
      const due = Number(d.dueAmount) || 0;
      if (due !== 0) {
        grandTotalDue += due;
        if (fyTotals.hasOwnProperty(d.fy)) {
          fyTotals[d.fy] += due;
        } else {
          fyTotals[d.fy] = (fyTotals[d.fy] || 0) + due;
        }
      }
    });

    // Build sidebar HTML
    let html = `
      <a href="javascript:void(0)" class="fy-item ${this.selectedFY === 'ALL' ? 'active' : ''}" onclick="LedgerModule.filterByFY('ALL')">
        <span><i class="bi bi-layers me-2"></i> All Years</span>
        <span class="fy-badge">${AppUI.formatCurrency(grandTotalDue)}</span>
      </a>
    `;

    fyYears.forEach(fy => {
      const amt = fyTotals[fy] || 0;
      const isActive = this.selectedFY === fy;
      html += `
        <a href="javascript:void(0)" class="fy-item ${isActive ? 'active' : ''}" onclick="LedgerModule.filterByFY('${fy}')">
          <span>${fy}</span>
          <span class="fy-badge">${AppUI.formatCurrency(amt)}</span>
        </a>
      `;
    });

    fyListContainer.innerHTML = html;
    const label = document.getElementById('fy-active-label');
    if (label) label.innerText = this.selectedFY === 'ALL' ? 'All Years' : this.selectedFY;
  },

  filterByFY(fy) {
    this.selectedFY = fy;
    this.currentPage = 1;
    this.renderFYSidebar();
    this.applyFilters();
  },

  filterByMonth(monthKey) {
    this.selectedMonth = monthKey;
    this.currentPage = 1;

    // Update month pill styles
    const pills = document.querySelectorAll('.month-pill');
    pills.forEach(pill => {
      if (pill.innerText.trim() === (monthKey === 'ALL' ? 'All Months' : monthKey)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    this.applyFilters();
  },

  onSearchInput(val) {
    this.searchQuery = (val || '').toLowerCase().trim();
    this.currentPage = 1;
    this.applyFilters();
  },

  changePageSize(val) {
    this.pageSize = val === 'ALL' ? 'ALL' : parseInt(val, 10);
    this.currentPage = 1;
    this.renderRegisterTable();
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

    const pills = document.querySelectorAll('.month-pill');
    pills.forEach((p, idx) => {
      if (idx === 0) p.classList.add('active');
      else p.classList.remove('active');
    });

    this.renderFYSidebar();
    this.applyFilters();
  },

  // ----------------------------------------------------
  // FILTER ENGINE & AGGREGATION
  // ----------------------------------------------------
  applyFilters() {
    const compEl = document.getElementById('filter-company');
    const typeEl = document.getElementById('filter-debt-type');
    const modeEl = document.getElementById('filter-debt-mode');

    if (compEl) this.filterCompany = compEl.value;
    if (typeEl) this.filterDebtType = typeEl.value;
    if (modeEl) this.filterDebtMode = modeEl.value;

    const query = this.searchQuery;

    this.filteredList = this.allDebts.filter(d => {
      const due = Number(d.dueAmount) || 0;

      // Tab filter
      if (this.currentTab === 'open' && due === 0) return false;
      if (this.currentTab === 'settled' && due !== 0) return false;

      // Financial Year
      if (this.selectedFY !== 'ALL' && d.fy !== this.selectedFY) return false;

      // Month Key
      if (this.selectedMonth !== 'ALL' && d.monthKey !== this.selectedMonth) return false;

      // Company
      if (this.filterCompany !== 'ALL' && d.company !== this.filterCompany) return false;

      // Debt Type
      if (this.filterDebtType !== 'ALL' && d.debtType !== this.filterDebtType) return false;

      // Debt Mode
      if (this.filterDebtMode !== 'ALL' && d.debtMode !== this.filterDebtMode) return false;

      // Text search
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
          d.displayDate || ''
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

    // Update KPI summary cards
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

    this.renderRegisterTable();
    this.renderPagination();
  },

  // ----------------------------------------------------
  // REGISTER TABLE WITH DATE GROUPING (AppSheet Layout)
  // ----------------------------------------------------
  renderRegisterTable() {
    const tbody = document.getElementById('debts-table-body');
    if (!tbody) return;

    if (this.filteredList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            No matching debt records found. Adjust your filters or select a different Financial Year.
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

    // Group display items by Date
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
      const dotColor = items[0]?.dotColor === 'blue' ? 'bg-primary' : 'bg-warning';

      // Date Header Row
      html += `
        <tr class="table-light border-top border-bottom">
          <td colspan="11" class="py-2 px-3 fw-bold" style="background-color: #f1f5f9;">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge rounded-pill ${dotColor} me-2" style="font-size: 0.65rem;">●</span>
                <span class="text-dark">${dateKey}</span>
                <small class="text-muted ms-2 fw-normal">(${items.length} ${items.length === 1 ? 'entry' : 'entries'})</small>
              </div>
              <div class="text-end">
                <small class="text-muted me-2">Date Due:</small>
                <span class="fw-bold font-monospace text-danger">${AppUI.formatCurrency(groupDue)}</span>
              </div>
            </div>
          </td>
        </tr>
      `;

      // Item Rows
      items.forEach(d => {
        const due = Number(d.dueAmount) || 0;
        const debt = Number(d.debtAmount) || 0;
        const companyBadge = d.company === 'TTC' ? 'bg-primary' : d.company === 'MTC' ? 'bg-success' : 'bg-warning text-dark';

        html += `
          <tr class="appsheet-row" style="cursor: pointer;" onclick="LedgerModule.openDebtDetails('${d.id}')">
            <td>
              <span class="badge ${companyBadge} me-1 font-monospace" style="font-size: 0.72rem;">${d.company || 'TTC'}</span>
              <span class="fw-bold font-monospace">${d.grNo || '-'}</span>
            </td>
            <td><span class="font-monospace fw-semibold">${d.truckNo || '-'}</span></td>
            <td><span class="text-dark">${d.to || '-'}</span></td>
            <td><span class="badge bg-light text-dark border">${d.debtType || '-'}</span></td>
            <td class="text-end">
              <span class="ledger-due-text fs-6">${AppUI.formatCurrency(due)}</span>
            </td>
            <td class="text-end font-monospace">${AppUI.formatCurrency(debt)}</td>
            <td><span class="small text-muted">${d.debtMode || 'Cash'}</span></td>
            <td>
              <div class="text-truncate" style="max-width: 170px;" title="${d.borrowerName || ''}">
                ${d.borrowerName || '-'}
              </div>
            </td>
            <td>
              <div class="text-truncate" style="max-width: 140px;" title="${d.receiverName || ''}">
                ${d.receiverName || '-'}
              </div>
            </td>
            <td>
              <div class="text-truncate text-muted small" style="max-width: 160px;" title="${d.description || ''}">
                ${d.description || '-'}
              </div>
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-light border px-2 py-1 text-primary" title="Open 3-Card Details" onclick="event.stopPropagation(); LedgerModule.openDebtDetails('${d.id}')">
                <i class="bi bi-chevron-right"></i>
              </button>
            </td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  // ----------------------------------------------------
  // PAGINATION CONTROLS
  // ----------------------------------------------------
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

    info.innerText = `Showing ${start} - ${end} of ${total} entries (Page ${this.currentPage} of ${totalPages})`;

    let html = `
      <button class="btn btn-outline-secondary" ${this.currentPage === 1 ? 'disabled' : ''} onclick="LedgerModule.changePage(${this.currentPage - 1})">
        <i class="bi bi-chevron-left"></i>
      </button>
    `;

    // Render compact page numbers
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
        <i class="bi bi-chevron-right"></i>
      </button>
    `;

    btnContainer.innerHTML = html;
  },

  changePage(p) {
    this.currentPage = p;
    this.renderRegisterTable();
    this.renderPagination();
    window.scrollTo({ top: 150, behavior: 'smooth' });
  },

  // ----------------------------------------------------
  // 3-CARD OPEN DEBT DETAILS VIEW (AppSheet Layout)
  // ----------------------------------------------------
  openDebtDetails(debtId) {
    const debt = this.allDebts.find(d => String(d.id) === String(debtId));
    if (!debt) {
      AppUI.showToast("Debt entry not found", "error");
      return;
    }

    this.currentDebtId = debtId;

    // Toggle views
    document.getElementById('ledger-view-register')?.classList.add('d-none');
    document.getElementById('ledger-view-statements')?.classList.add('d-none');
    document.getElementById('ledger-view-details')?.classList.remove('d-none');

    // Breadcrumb & title
    document.getElementById('page-title-text').innerText = "MTC And TTC - Ledger > Open Debt Details";
    document.getElementById('page-breadcrumb').innerText = `Home > Ledger > Open Debt Details > ${debt.grNo || debt.id}`;

    // Index position in filtered list
    const idx = this.filteredList.findIndex(d => String(d.id) === String(debtId));
    const navCounter = document.getElementById('detail-nav-counter');
    if (navCounter) {
      if (idx >= 0) {
        navCounter.innerText = `Record ${idx + 1} of ${this.filteredList.length}`;
      } else {
        navCounter.innerText = `Record 1 of 1`;
      }
    }

    // Prev / Next button states
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
    document.getElementById('detail-company-name').innerText = debt.company === 'TTC' ? 'TTC Transport Corp' : debt.company === 'MTC' ? 'Mahaveer Transport Co' : (debt.company || 'TTC');
    document.getElementById('detail-from').innerText = debt.from || '-';
    document.getElementById('detail-to').innerText = debt.to || '-';
    document.getElementById('detail-borrower').innerText = debt.borrowerName || '-';
    document.getElementById('detail-receiver').innerText = debt.receiverName || '-';
    document.getElementById('detail-desc').innerText = debt.description || 'No remarks';

    // CARD 2: RETURNED AMOUNT HISTORY
    const returns = Array.isArray(debt.returnedAmounts) ? debt.returnedAmounts : [];
    document.getElementById('detail-return-count-header').innerHTML = `
      <i class="bi bi-clock-history text-success me-2"></i> Returned Amount [${returns.length}]
    `;

    const returnsContainer = document.getElementById('detail-returns-container');
    if (returnsContainer) {
      if (returns.length === 0) {
        returnsContainer.innerHTML = `
          <div class="text-center py-4 text-muted">
            <i class="bi bi-info-circle fs-3 text-secondary d-block mb-1"></i>
            <div>No items</div>
            <small class="text-muted">No returned amount recorded yet for this entry.</small>
          </div>
        `;
      } else {
        let retHtml = `
          <table class="table table-sm table-bordered align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Date</th>
                <th class="text-end">Amount Returned</th>
                <th>Mode</th>
                <th>Received By</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
        `;
        returns.forEach(r => {
          retHtml += `
            <tr>
              <td>${r.displayDate || r.date}</td>
              <td class="text-end font-monospace fw-bold text-success">${AppUI.formatCurrency(r.amount)}</td>
              <td><span class="badge bg-light text-dark border">${r.mode || 'Cash'}</span></td>
              <td>${r.receivedBy || '-'}</td>
              <td class="small text-muted">${r.remarks || '-'}</td>
            </tr>
          `;
        });
        retHtml += `</tbody></table>`;
        returnsContainer.innerHTML = retHtml;
      }
    }

    // CARD 3: FINANCIALS
    const debtAmt = Number(debt.debtAmount) || 0;
    const retAmt = Number(debt.totalReturned) || 0;
    const dueAmt = Number(debt.dueAmount) || 0;

    document.getElementById('detail-debt-mode').innerText = debt.debtMode || 'Cash';
    document.getElementById('detail-debt-amount').innerText = AppUI.formatCurrency(debtAmt);
    document.getElementById('detail-total-returned').innerText = AppUI.formatCurrency(retAmt);
    document.getElementById('detail-due-amount').innerText = AppUI.formatCurrency(dueAmt);

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

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    document.getElementById('ledger-view-details')?.classList.add('d-none');
    document.getElementById('ledger-view-statements')?.classList.add('d-none');
    document.getElementById('ledger-view-register')?.classList.remove('d-none');

    document.getElementById('page-title-text').innerText = "MTC And TTC - Ledger";
    document.getElementById('page-breadcrumb').innerText = "Home > Ledger > Open Debts Register";
  },

  // ----------------------------------------------------
  // RETURN PAYMENT HANDLING
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

      // Reload state
      await this.loadData();
      this.renderFYSidebar();
      this.applyFilters();

      // Close modal
      const modalEl = document.getElementById('modal-record-return');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast(`Returned amount of ${AppUI.formatCurrency(amount)} recorded successfully!`, "success");

      // Re-render open detail view
      this.openDebtDetails(debtId);
    } catch (err) {
      console.error("Failed to record return amount:", err);
      AppUI.showToast("Failed to save return receipt: " + err.message, "error");
    }
  },

  // ----------------------------------------------------
  // ADD / EDIT NEW DEBT ENTRY
  // ----------------------------------------------------
  openAddDebtModal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('form-add-debt').reset();
    document.getElementById('debt-form-id').value = '';
    document.getElementById('debt-form-date').value = today;
    this.autoSetFYAndMonth(today);

    const modal = new bootstrap.Modal(document.getElementById('modal-add-debt'));
    modal.show();
  },

  autoSetFYAndMonth(dateStr) {
    if (!dateStr) return;
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // 1-12

    let fy = `${year}-${year + 1}`;
    if (month < 4) {
      fy = `${year - 1}-${year}`;
    }

    const fySelect = document.getElementById('debt-form-fy');
    if (fySelect) {
      // If FY exists in dropdown, select it
      for (let i = 0; i < fySelect.options.length; i++) {
        if (fySelect.options[i].value === fy) {
          fySelect.selectedIndex = i;
          break;
        }
      }
    }
  },

  async submitAddDebt(event) {
    event.preventDefault();
    const date = document.getElementById('debt-form-date').value;
    const fy = document.getElementById('debt-form-fy').value;
    const company = document.getElementById('debt-form-company').value;
    const grNo = document.getElementById('debt-form-gr').value.trim();
    const truckNo = document.getElementById('debt-form-truck').value.trim().toUpperCase();
    const debtType = document.getElementById('debt-form-type').value;
    const from = document.getElementById('debt-form-from').value.trim();
    const to = document.getElementById('debt-form-to').value.trim();
    const truckOwner = document.getElementById('debt-form-owner').value.trim();
    const amount = Number(document.getElementById('debt-form-amount').value);
    const debtMode = document.getElementById('debt-form-mode').value;
    const borrowerName = document.getElementById('debt-form-borrower').value.trim();
    const receiverName = document.getElementById('debt-form-receiver').value.trim();
    const description = document.getElementById('debt-form-desc').value.trim();

    if (!date || isNaN(amount) || amount <= 0) {
      AppUI.showToast("Please provide a valid date and debt amount.", "warning");
      return;
    }

    // Compute monthKey e.g. "6 Sep"
    const dObj = new Date(date);
    const mNum = dObj.getMonth() + 1;
    const mNames = ['', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const monthKey = `${mNum} ${dObj.toLocaleString('en-US', { month: 'short' })}`;

    const newDebt = {
      date,
      displayDate: AppUI.formatDate(date),
      fy,
      monthKey,
      grNo,
      truckNo,
      company,
      truckOwner,
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
      this.renderFYSidebar();
      this.applyFilters();

      const modalEl = document.getElementById('modal-add-debt');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast(`New debt entry for ${AppUI.formatCurrency(amount)} saved successfully!`, "success");
      this.openDebtDetails(saved.id);
    } catch (err) {
      console.error("Failed to add debt:", err);
      AppUI.showToast("Failed to save debt entry: " + err.message, "error");
    }
  },

  async deleteCurrentDebt() {
    if (!this.currentDebtId) return;
    if (!confirm("Are you sure you want to delete this debt record? This action cannot be undone.")) return;

    try {
      await dbService.delete('debts', this.currentDebtId);
      await this.loadData();
      this.renderFYSidebar();
      this.applyFilters();

      AppUI.showToast("Debt entry deleted.", "info");
      this.backToRegister();
    } catch (err) {
      AppUI.showToast("Delete failed: " + err.message, "error");
    }
  },

  // ----------------------------------------------------
  // TAB SWITCHING (OPEN / SETTLED / STATEMENTS)
  // ----------------------------------------------------
  switchTab(tabName) {
    this.currentTab = tabName;

    // Update active tab buttons
    document.getElementById('tab-btn-open')?.classList.toggle('active', tabName === 'open');
    document.getElementById('tab-btn-settled')?.classList.toggle('active', tabName === 'settled');
    document.getElementById('tab-btn-statements')?.classList.toggle('active', tabName === 'statements');

    const regView = document.getElementById('ledger-view-register');
    const detView = document.getElementById('ledger-view-details');
    const stmtView = document.getElementById('ledger-view-statements');
    const stmtActions = document.getElementById('stmt-action-buttons');

    detView?.classList.add('d-none');

    if (tabName === 'statements') {
      regView?.classList.add('d-none');
      stmtView?.classList.remove('d-none');
      stmtActions?.classList.remove('d-none');
      stmtActions?.classList.add('d-flex');

      document.getElementById('page-title-text').innerText = "Financial Ledger & Statements";
      document.getElementById('page-breadcrumb').innerText = "Home > Ledger > Party & Owner Statements";

      this.onCategoryChange();
    } else {
      stmtView?.classList.add('d-none');
      regView?.classList.remove('d-none');
      stmtActions?.classList.add('d-none');
      stmtActions?.classList.remove('d-flex');

      document.getElementById('page-title-text').innerText = "MTC And TTC - Ledger";
      document.getElementById('page-breadcrumb').innerText = tabName === 'settled' 
        ? "Home > Ledger > Settled Debts Register" 
        : "Home > Ledger > Open Debts Register";

      this.currentPage = 1;
      this.applyFilters();
    }
  },

  // ----------------------------------------------------
  // PRESERVED PARTY & OWNER STATEMENTS ENGINE
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
