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
    this.renderMonthBar();
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
      '2021-2022',
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

  toggleFYSidebar() {
    const sidebar = document.getElementById('ledger-fy-sidebar');
    const toggleBtnText = document.getElementById('toggle-fy-text');
    if (!sidebar) return;

    const isHidden = sidebar.classList.toggle('d-none');
    if (toggleBtnText) {
      toggleBtnText.innerText = isHidden ? "Show FY Sidebar" : "Hide FY Sidebar";
    }
  },

  filterByFY(fy) {
    this.selectedFY = fy;
    this.selectedMonth = 'ALL';
    this.currentPage = 1;

    // Update quick FY buttons
    const quickBtns = document.querySelectorAll('.fy-quick-btn');
    quickBtns.forEach(btn => {
      const bFy = btn.getAttribute('data-fy');
      if (bFy === fy) {
        btn.className = "btn btn-sm btn-primary py-0 px-2 fw-semibold fy-quick-btn";
      } else {
        btn.className = "btn btn-sm btn-outline-secondary py-0 px-2 fw-semibold fy-quick-btn";
      }
    });

    this.renderFYSidebar();
    this.renderMonthBar();
    this.applyFilters();
  },

  renderMonthBar() {
    const container = document.getElementById('month-bar-container');
    if (!container) return;

    // Financial year months descending (like AppSheet)
    const allMonths = [
      '12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct',
      '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'
    ];

    const monthTotals = {};
    const monthCounts = {};
    let totalFYDue = 0;
    let totalFYCount = 0;

    allMonths.forEach(m => {
      monthTotals[m] = 0;
      monthCounts[m] = 0;
    });

    this.allDebts.forEach(d => {
      const due = Number(d.dueAmount) || 0;
      if (this.selectedFY === 'ALL' || d.fy === this.selectedFY) {
        totalFYDue += due;
        totalFYCount++;
        if (monthTotals.hasOwnProperty(d.monthKey)) {
          monthTotals[d.monthKey] += due;
          monthCounts[d.monthKey] += 1;
        }
      }
    });

    let html = `
      <button class="month-pill ${this.selectedMonth === 'ALL' ? 'active' : ''}" onclick="LedgerModule.filterByMonth('ALL')">
        <span>All Months</span>
        <span class="badge bg-secondary ms-1">${totalFYCount}</span>
        ${totalFYDue !== 0 ? `<span class="badge ${totalFYDue > 0 ? 'bg-danger' : 'bg-success'} ms-1">${AppUI.formatCurrency(totalFYDue)}</span>` : ''}
      </button>
    `;

    allMonths.forEach(m => {
      const amt = monthTotals[m] || 0;
      const cnt = monthCounts[m] || 0;
      if (this.selectedFY !== 'ALL' && cnt === 0) {
        return; // hide empty month for this FY to keep UI clean
      }

      const isActive = this.selectedMonth === m;
      html += `
        <button class="month-pill ${isActive ? 'active' : ''}" onclick="LedgerModule.filterByMonth('${m}')">
          <span>${m}</span>
          <span class="badge bg-secondary ms-1">${cnt}</span>
          ${amt !== 0 ? `<span class="badge ${amt > 0 ? 'bg-danger' : 'bg-success'} ms-1">${AppUI.formatCurrency(amt)}</span>` : ''}
        </button>
      `;
    });

    container.innerHTML = html;
  },

  filterByMonth(monthKey) {
    this.selectedMonth = monthKey;
    this.currentPage = 1;
    this.renderMonthBar();
    this.applyFilters();
  },

  onSearchInput(val) {
    this.searchQuery = (val || '').toLowerCase().trim();
    this.currentPage = 1;
    this.applyFilters();
  },

  clearSearch() {
    const sInput = document.getElementById('ledger-search-input');
    if (sInput) sInput.value = '';
    this.onSearchInput('');
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

    this.renderFYSidebar();
    this.renderMonthBar();
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
  // ----------------------------------------------------
  // REGISTER TABLE WITH DATE GROUPING (Modern ERP Layout)
  // ----------------------------------------------------
  renderRegisterTable() {
    const tbody = document.getElementById('debts-table-body');
    if (!tbody) return;

    if (this.filteredList.length === 0) {
      if (this.selectedFY === '2021-2022') {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center py-5">
              <i class="bi bi-check-circle-fill fs-2 d-block mb-2 text-success"></i>
              <div class="fw-bold text-dark fs-6">No Outstanding Due for FY 2021-2022</div>
              <small class="text-muted">All debts for FY 2021-2022 were 100% settled and cleared (Due Balance: ₹0.00).</small>
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center py-5 text-muted">
              <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
              <div class="fw-semibold">No matching debt records found</div>
              <small class="text-muted">Try adjusting your search keywords, year, or filter criteria.</small>
            </td>
          </tr>
        `;
      }
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

      // Date Header Ribbon (Modern ERP sleek divider)
      html += `
        <tr class="table-group-header">
          <td colspan="6" class="p-0 border-0">
            <div class="ledger-date-ribbon">
              <div class="date-badge">
                <i class="bi bi-calendar-event text-primary"></i>
                <span>${dateKey}</span>
                <span class="text-muted fw-normal small">(${items.length} ${items.length === 1 ? 'record' : 'records'})</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="small text-muted">Day Due:</span>
                <span class="day-due">${AppUI.formatCurrency(groupDue)}</span>
              </div>
            </div>
          </td>
        </tr>
      `;

      // Item Rows (Sleek 6 hierarchically organized columns - Zero horizontal scroll)
      items.forEach(d => {
        const due = Number(d.dueAmount) || 0;
        const debt = Number(d.debtAmount) || 0;
        const returned = Number(d.totalReturned) || 0;
        const comp = d.company || 'TTC';
        const firmBadgeClass = comp === 'TTC' ? 'badge-firm-ttc' : comp === 'MTC' ? 'badge-firm-mtc' : 'badge-firm-smtc';

        html += `
          <tr class="ledger-row" onclick="LedgerModule.openDebtDetails('${d.id}')">
            <!-- 1. G.R. No & Vehicle -->
            <td>
              <div class="d-flex align-items-center gap-1">
                <span class="fw-bold font-monospace text-primary">${d.grNo || '-'}</span>
                <span class="${firmBadgeClass}">${comp}</span>
              </div>
              <div class="text-secondary small font-monospace mt-1">
                <i class="bi bi-truck text-muted me-1"></i>${d.truckNo || 'No Vehicle'}
              </div>
            </td>

            <!-- 2. Date & Route -->
            <td>
              <div class="fw-semibold text-dark">
                <i class="bi bi-calendar3 text-muted me-1 small"></i>${d.displayDate || d.date || '-'}
              </div>
              <div class="text-muted small text-truncate mt-1" style="max-width: 175px;" title="${d.from || 'Origin'} → ${d.to || 'Destination'}">
                <i class="bi bi-geo-alt text-danger me-1 small"></i>${d.to ? `${d.from || 'Origin'} → ${d.to}` : (d.from || '-')}
              </div>
            </td>

            <!-- 3. Borrower & Receiver -->
            <td>
              <div class="fw-bold text-dark text-truncate" style="max-width: 245px;" title="${d.borrowerName || '-'}">
                ${d.borrowerName || '-'}
              </div>
              <div class="text-muted small text-truncate mt-1" style="max-width: 245px;" title="${d.receiverName || '-'}">
                <i class="bi bi-person me-1"></i>Recv: ${d.receiverName || '-'}
              </div>
            </td>

            <!-- 4. Debt Type & Mode -->
            <td>
              <span class="badge-type-pill">${d.debtType || 'General'}</span>
              <div class="text-muted small mt-1">
                <i class="bi bi-wallet2 me-1"></i>${d.debtMode || 'Cash'}
              </div>
            </td>

            <!-- 5. Due / Total Amount -->
            <td class="text-end">
              <div class="currency-due fs-6">${AppUI.formatCurrency(due)}</div>
              <small class="text-muted font-monospace d-block mt-1">
                ${returned > 0 ? `<span class="currency-paid">₹${returned.toLocaleString('en-IN')} paid</span> / ` : ''}₹${debt.toLocaleString('en-IN')}
              </small>
            </td>

            <!-- 6. Action -->
            <td class="text-end" onclick="event.stopPropagation()">
              <div class="d-flex justify-content-end gap-1">
                <button class="btn btn-outline-primary btn-sm py-1 px-2 fw-semibold" onclick="LedgerModule.openDebtDetails('${d.id}')" title="View Details or Record Payment">
                  <i class="bi bi-eye me-1"></i> View
                </button>
                <button class="btn btn-outline-secondary btn-sm py-1 px-2" onclick="LedgerModule.openEditDebtModal('${d.id}')" title="Quick Edit this entry">
                  <i class="bi bi-pencil"></i>
                </button>
              </div>
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
  // 3-CARD OPEN DEBT DETAILS VIEW (Modern Layout)
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
    document.getElementById('page-title-text').innerText = "MTC & TTC - Ledger > Debt Details";
    document.getElementById('page-breadcrumb').innerText = `Home > Ledger > Debt Details > ${debt.grNo || debt.id}`;

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
    document.getElementById('detail-company-name').innerText = debt.company === 'TTC' ? 'TTC' : debt.company === 'MTC' ? 'MTC' : (debt.company || 'TTC');
    document.getElementById('detail-from').innerText = debt.from || '-';
    document.getElementById('detail-to').innerText = debt.to || '-';
    document.getElementById('detail-borrower').innerText = debt.borrowerName || '-';
    document.getElementById('detail-receiver').innerText = debt.receiverName || '-';
    document.getElementById('detail-desc').innerText = debt.description || 'No remarks';

    // CARD 2: RETURNED AMOUNT HISTORY
    const returns = Array.isArray(debt.returnedAmounts) ? debt.returnedAmounts : [];
    document.getElementById('detail-return-count-header').innerHTML = `
      <i class="bi bi-clock-history text-success me-2"></i> Returned Receipts (${returns.length})
    `;

    const returnsContainer = document.getElementById('detail-returns-container');
    if (returnsContainer) {
      if (returns.length === 0) {
        returnsContainer.innerHTML = `
          <div class="text-center py-5 text-muted">
            <i class="bi bi-receipt-cutoff fs-2 d-block mb-1 text-secondary"></i>
            <div class="fs-6 fw-normal mb-1">No payments recorded yet</div>
            <small class="text-muted">Use "+ Record Returned Amount" to log receipts.</small>
          </div>
        `;
      } else {
        let retHtml = `
          <table class="table table-sm table-bordered align-middle mb-0">
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
              <td class="text-end font-monospace fw-bold text-success">${AppUI.formatCurrency(r.amount)}</td>
              <td><span class="badge bg-light text-dark border">${r.mode || 'Cash'}</span></td>
              <td>${r.receivedBy || '-'}</td>
            </tr>
          `;
        });
        retHtml += `</tbody></table>`;
        returnsContainer.innerHTML = retHtml;
      }
    }

    // CARD 3: FINANCIALS & RECOVERY PROGRESS
    const debtAmt = Number(debt.debtAmount) || 0;
    const retAmt = Number(debt.totalReturned) || 0;
    const dueAmt = Number(debt.dueAmount) || 0;

    document.getElementById('detail-debt-mode').innerText = debt.debtMode || 'Cash';
    document.getElementById('detail-debt-amount').innerText = AppUI.formatCurrency(debtAmt);
    document.getElementById('detail-total-returned').innerText = AppUI.formatCurrency(retAmt);
    document.getElementById('detail-due-amount').innerText = AppUI.formatCurrency(dueAmt);

    // Calculate recovery percentage
    const pct = debtAmt > 0 ? Math.min(100, Math.round((retAmt / debtAmt) * 100)) : 0;
    const pctEl = document.getElementById('detail-recovery-pct');
    if (pctEl) pctEl.innerText = `${pct}% Paid`;
    const fillEl = document.getElementById('detail-recovery-fill');
    if (fillEl) fillEl.style.width = `${pct}%`;

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

    document.getElementById('page-title-text').innerText = "MTC & TTC - Debts & Financial Ledger";
    document.getElementById('page-breadcrumb').innerText = "Home > Ledger > Open Debts Register";
  },

  shareWhatsAppReminderCurrent() {
    if (!this.currentDebtId) return;
    const debt = this.allDebts.find(d => String(d.id) === String(this.currentDebtId));
    if (!debt) return;

    const due = Number(debt.dueAmount) || 0;
    const total = Number(debt.debtAmount) || 0;
    const ret = Number(debt.totalReturned) || 0;

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
    if (ret > 0) {
      msg += `*Amount Received*: Rs. ${ret.toLocaleString('en-IN')}\n`;
    }
    msg += `*Outstanding Due Balance*: *Rs. ${due.toLocaleString('en-IN')}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Kindly arrange the balance payment at the earliest. Thank you!\n`;
    msg += `*Mahaveer Transport Co. & TTC Logistics*`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  exportToCSV() {
    if (!this.filteredList || this.filteredList.length === 0) {
      AppUI.showToast("No records to export in current filter view", "warning");
      return;
    }

    const headers = [
      "G.R. No",
      "Company",
      "Vehicle No",
      "Date",
      "From",
      "To",
      "Truck Owner",
      "Borrower Name",
      "Receiver Name",
      "Debt Type",
      "Debt Mode",
      "Debt Amount (INR)",
      "Total Returned (INR)",
      "Due Balance (INR)",
      "Financial Year",
      "Description"
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let csvContent = '\uFEFF'; // UTF-8 BOM for Microsoft Excel
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
  // ADD / EDIT DEBT ENTRY
  // ----------------------------------------------------
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

  openEditDebtModal(debtId) {
    const debt = this.allDebts.find(d => String(d.id) === String(debtId));
    if (!debt) {
      AppUI.showToast("Record not found", "error");
      return;
    }

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

  openEditDebtModalCurrent() {
    if (this.currentDebtId) {
      this.openEditDebtModal(this.currentDebtId);
    }
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
      // EDIT EXISTING RECORD
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
        this.renderFYSidebar();
        this.applyFilters();

        const modalEl = document.getElementById('modal-add-debt');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        AppUI.showToast(`Debt record updated successfully!`, "success");
        if (this.currentDebtId === id) {
          this.openDebtDetails(id);
        }
      } catch (err) {
        console.error("Failed to update debt:", err);
        AppUI.showToast("Failed to update debt: " + err.message, "error");
      }
      return;
    }

    // ADD NEW RECORD
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

      AppUI.showToast("Debt entry deleted successfully.", "info");
      this.backToRegister();
    } catch (err) {
      AppUI.showToast("Delete failed: " + err.message, "error");
    }
  },

  // ----------------------------------------------------
  // BULK EXCEL / CSV IMPORTER & MANAGER
  // ----------------------------------------------------
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
      "Date (DD/MM/YYYY)",
      "G.R. No",
      "Company (TTC/MTC/SMTC)",
      "Truck No",
      "From City",
      "To City",
      "Truck Owner",
      "Borrower Name",
      "Receiver Name",
      "Debt Type",
      "Payment Mode",
      "Debt Amount (INR)",
      "Total Returned (INR)",
      "Due Balance (INR)",
      "Financial Year",
      "Description"
    ];

    const sampleRows = [
      ["23/09/2026", "2188_TTC", "TTC", "RJ52GB5640", "Kishangarh (Raj.)", "Delhi", "Shree Mahaveer Transport Company", "Shree Mahaveer Transport Company", "Hardan 8890178907", "Commission", "Cash", "1500", "0", "1500", "2026-2027", "Commission - Delhi"],
      ["21/11/2023", "-", "TTC", "RJ52GA9489", "Kishangarh (Raj.)", "Delhi", "Laxmi Prakash Jat", "Laxmi Prakash Jat", "Laxmi Prakash Jat", "Old", "Cash", "1500", "485", "1015", "2023-2024", "Commission-Kishangarh"],
      ["16/06/2022", "-", "TTC", "RJ52GA5419", "Kishangarh (Raj.)", "Delhi", "Laxmi Prakash Jat", "Laxmi Prakash Jat", "Laxmi Prakash Jat", "Old", "Cash", "10000", "0", "10000", "2022-2023", "Gajroula"]
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let csvContent = '\uFEFF'; // UTF-8 BOM
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

  parseAnyDate(val) {
    if (!val) return null;
    if (val instanceof Date && !isNaN(val.getTime())) {
      const y = val.getFullYear();
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    if (typeof val === 'number') {
      const dateObj = new Date(Math.round((val - 25569) * 86400 * 1000));
      if (!isNaN(dateObj.getTime())) {
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      }
    }
    const str = String(val).trim();
    // DD/MM/YYYY or DD-MM-YYYY
    let m = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const day = m[1].padStart(2, '0');
      const mon = m[2].padStart(2, '0');
      const yr = m[3];
      return `${yr}-${mon}-${day}`;
    }
    // YYYY-MM-DD or YYYY/MM/DD
    m = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (m) {
      const yr = m[1];
      const mon = m[2].padStart(2, '0');
      const day = m[3].padStart(2, '0');
      return `${yr}-${mon}-${day}`;
    }
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const mo = String(parsed.getMonth() + 1).padStart(2, '0');
      const da = String(parsed.getDate()).padStart(2, '0');
      return `${y}-${mo}-${da}`;
    }
    return null;
  },

  calculateFYAndMonth(dateStr) {
    if (!dateStr) return { fy: '2026-2027', monthKey: '6 Sep' };
    const parts = dateStr.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);

    const fy = m >= 4 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
    const monthNames = {
      4: "1 Apr", 5: "2 May", 6: "3 Jun", 7: "4 Jul", 8: "5 Aug", 9: "6 Sep",
      10: "7 Oct", 11: "8 Nov", 12: "9 Dec", 1: "10 Jan", 2: "11 Feb", 3: "12 Mar"
    };
    const monthKey = monthNames[m] || `${m} Month`;
    return { fy, monthKey };
  },

  onImportFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileNameEl = document.getElementById('import-file-name');
    if (fileNameEl) fileNameEl.innerText = file.name;

    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    if (isExcel && typeof XLSX !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { defval: '', raw: false });
          this.processRawImportRows(jsonRows);
        } catch (err) {
          console.error("Excel parse error:", err);
          AppUI.showToast("Could not parse Excel file: " + err.message, "danger");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // CSV parse
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseCSVText(e.target.result);
      };
      reader.readAsText(file);
    }
  },

  parseCSVText(csvText) {
    if (!csvText) return;
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      AppUI.showToast("CSV file is empty or missing data rows!", "warning");
      return;
    }

    const parseLine = (line) => {
      const row = [];
      let inQuotes = false;
      let token = '';
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            token += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          row.push(token);
          token = '';
        } else {
          token += char;
        }
      }
      row.push(token);
      return row;
    };

    const headers = parseLine(lines[0]).map(h => h.trim().replace(/^\uFEFF/, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = parseLine(lines[i]);
      if (vals.length === 0 || vals.every(v => v.trim() === '')) continue;
      const rowObj = {};
      headers.forEach((h, idx) => {
        rowObj[h] = vals[idx] !== undefined ? vals[idx].trim() : '';
      });
      rows.push(rowObj);
    }

    this.processRawImportRows(rows);
  },

  processRawImportRows(rawRows) {
    if (!rawRows || rawRows.length === 0) {
      AppUI.showToast("No data rows found in this file!", "warning");
      return;
    }

    const getField = (row, aliases) => {
      for (const alias of aliases) {
        for (const key of Object.keys(row)) {
          if (key.trim().toLowerCase() === alias.toLowerCase()) {
            return String(row[key] !== undefined ? row[key] : '').trim();
          }
        }
      }
      return '';
    };

    const parsedDebts = [];
    const fyCounts = {};
    let totalDue = 0;

    rawRows.forEach((row, idx) => {
      const rawDate = getField(row, ['Date', 'Date (DD/MM/YYYY)', 'tariq', 'दिनांक', 'displayDate', 'Date *']);
      const parsedDate = this.parseAnyDate(rawDate);
      if (!parsedDate) return;

      const grNo = getField(row, ['G.R. No', 'GR No', 'grNo', 'G.R.No.', 'GR', 'Bilty No', 'LR No']) || '-';
      const truckNo = (getField(row, ['Truck No', 'Truck', 'truckNo', 'Vehicle', 'Vehicle No', 'गाड़ी नं.']) || '-').toUpperCase();
      let company = (getField(row, ['Company', 'Company (TTC/MTC/SMTC)', 'Firm', 'company']) || 'TTC').toUpperCase();
      if (company !== 'MTC' && company !== 'SMTC') company = 'TTC';

      const from = getField(row, ['From City', 'From', 'from', 'Origin']) || 'Kishangarh (Raj.)';
      const to = getField(row, ['To City', 'To', 'to', 'Destination']) || '-';
      const borrowerName = getField(row, ['Borrower Name', 'Borrower', 'borrowerName', 'Party', 'Customer']) || '-';
      const receiverName = getField(row, ['Receiver Name', 'Receiver', 'receiverName', 'Recv']) || borrowerName;
      const truckOwner = getField(row, ['Truck Owner', 'Truck Owner Name', 'truckOwner', 'Owner']) || (borrowerName.includes('Mahaveer') ? 'Shree Mahaveer Transport Company' : borrowerName);
      const debtType = getField(row, ['Debt Type', 'Type', 'debtType']) || 'Old';
      const debtMode = getField(row, ['Payment Mode', 'Debt Mode', 'debtMode', 'Mode']) || 'Cash';
      const description = getField(row, ['Description', 'Remarks', 'Notes', 'desc']) || '';

      const debtAmtRaw = getField(row, ['Debt Amount (INR)', 'Debt Amount', 'debtAmount', 'Total Debt', 'Amount', 'Total Amount']);
      const retAmtRaw = getField(row, ['Total Returned (INR)', 'Total Returned', 'totalReturned', 'Returned Amount', 'Paid']);
      const dueAmtRaw = getField(row, ['Due Balance (INR)', 'Due Amount', 'dueAmount', 'Due Balance', 'Balance', 'बाकी']);

      const cleanNum = (val) => {
        if (!val) return 0;
        const cleaned = String(val).replace(/[^\d.-]/g, '');
        const n = parseFloat(cleaned);
        return isNaN(n) ? 0 : n;
      };

      const debtAmount = cleanNum(debtAmtRaw) || cleanNum(dueAmtRaw) || 0;
      const totalReturned = cleanNum(retAmtRaw);
      const dueAmount = dueAmtRaw ? cleanNum(dueAmtRaw) : Math.max(0, debtAmount - totalReturned);

      const { fy, monthKey } = this.calculateFYAndMonth(parsedDate);
      const displayDate = AppUI.formatDate(parsedDate);

      const debtItem = {
        id: `IMP_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
        date: parsedDate,
        displayDate,
        fy,
        monthKey,
        grNo,
        truckNo,
        from,
        to,
        company,
        truckOwner,
        debtType,
        debtAmount,
        totalReturned,
        dueAmount,
        debtMode,
        borrowerName,
        receiverName,
        description,
        dotColor: totalReturned > 0 ? 'blue' : 'yellow',
        returnedAmounts: totalReturned > 0 ? [{
          id: `RET_IMP_${Date.now()}_${idx}`,
          date: parsedDate,
          displayDate,
          amount: totalReturned,
          mode: debtMode,
          remarks: 'Imported return'
        }] : []
      };

      parsedDebts.push(debtItem);
      fyCounts[fy] = (fyCounts[fy] || 0) + 1;
      totalDue += dueAmount;
    });

    if (parsedDebts.length === 0) {
      AppUI.showToast("Could not extract any valid records! Check date column format.", "warning");
      return;
    }

    this.stagedImportDebts = parsedDebts;

    // Render Preview
    document.getElementById('import-summary-count').innerText = parsedDebts.length;
    document.getElementById('import-summary-amount').innerText = `Total Due: ${AppUI.formatCurrency(totalDue)}`;

    // FY breakdown pills
    let fyHtml = '';
    Object.keys(fyCounts).sort().reverse().forEach(fy => {
      fyHtml += `<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">${fy}: ${fyCounts[fy]} records</span>`;
    });
    document.getElementById('import-fy-breakdown').innerHTML = fyHtml;

    // First 5 rows in preview table
    let tableHtml = '';
    parsedDebts.slice(0, 5).forEach((d, i) => {
      tableHtml += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.displayDate}</td>
          <td><span class="badge bg-light text-dark border">${d.fy}</span></td>
          <td class="fw-bold">${d.grNo}</td>
          <td>${d.truckNo}</td>
          <td>${d.borrowerName}</td>
          <td class="text-end fw-bold text-danger">${AppUI.formatCurrency(d.dueAmount)}</td>
        </tr>
      `;
    });
    document.getElementById('import-preview-tbody').innerHTML = tableHtml;

    document.getElementById('import-preview-section')?.classList.remove('d-none');
    document.getElementById('import-action-buttons')?.classList.remove('d-none');

    AppUI.showToast(`Analyzed ${parsedDebts.length} valid rows from file! Ready to import.`, "success");
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
      this.renderFYSidebar();
      this.applyFilters();

      const modalEl = document.getElementById('modal-import-debts');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast(`Successfully imported ${this.stagedImportDebts.length} ledger records into system!`, "success");
    } catch (err) {
      console.error("Import failed:", err);
      AppUI.showToast("Import failed: " + err.message, "danger");
    }
  },

  async resetToFactoryData() {
    if (!confirm("Are you sure you want to restore the standard 668 AppSheet records? Any custom imports will be cleared.")) return;
    try {
      dbService.restoreBaseDebts();
      await this.loadData();
      this.renderFYSidebar();
      this.applyFilters();

      const modalEl = document.getElementById('modal-import-debts');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      AppUI.showToast("Restored all 668 standard AppSheet records successfully!", "success");
    } catch (err) {
      console.error("Reset failed:", err);
      AppUI.showToast("Reset failed: " + err.message, "danger");
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
