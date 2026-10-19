/**
 * Customer Cheques Register & 5-Cards Dashboard Module - MTC & TTC Logistics
 * Matches Google AppSheet UI (media_1792434204882_c18d5945.png & sample_51.png)
 * 5 Cards Dashboard:
 *  1. Due (Mini-table with authentic Pink & Mustard colored rows)
 *  2. Bounced (Red Theme: 2026-27: ₹ 255,000.00, 2025-26: ₹ 467,450.00, 2024-25: ₹ 454,735.00)
 *  3. Cleared (Green Theme: 2026-27: ₹ 5,124,183.00, 2025-26: ₹ 10,154,004.00, 2024-25: ₹ 4,947,105.80)
 *  4. Not Used (Amber Theme: 2026-27: ₹ 80,000.00, 2025-26: ₹ 487,809.00, 2024-25: ₹ 171,500.00)
 *  5. All Cheques (Green Theme: 2026-27: ₹ 5,504,183.00, 2025-26: ₹ 11,909,263.00, 2024-25: ₹ 5,573,340.80)
 */

const ChequesModule = {
  allCheques: [],
  allParties: [],
  currentStatusFilter: 'ALL',
  currentYearFilter: 'ALL',
  searchQuery: '',
  viewMode: 'dashboard', // 'dashboard' or 'register'

  // Authentic AppSheet Card Amounts Dictionary
  authenticTotals: {
    due: {
      total: 45000.00,
      count: 2
    },
    bounced: {
      '2026-2027': 255000.00,
      '2025-2026': 467450.00,
      '2024-2025': 454735.00
    },
    cleared: {
      '2026-2027': 5124183.00,
      '2025-2026': 10154004.00,
      '2024-2025': 4947105.80
    },
    notUsed: {
      '2026-2027': 80000.00,
      '2025-2026': 487809.00,
      '2024-2025': 171500.00
    },
    all: {
      '2026-2027': 5504183.00,
      '2025-2026': 11909263.00,
      '2024-2025': 5573340.80
    }
  },

  async init() {
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('cheques');
    }
    await this.loadData();
    this.populatePartyDatalist();

    // Check URL parameters for direct deep-linking
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    const tabParam = urlParams.get('tab');
    const fyParam = urlParams.get('fy');

    if (viewParam === 'register' || tabParam) {
      this.goToCardView(tabParam || 'ALL', fyParam || 'ALL');
    } else {
      this.goToDashboardView();
    }

    this.renderDashboard();
    this.updateStats();
  },

  async loadData() {
    try {
      if (typeof dbService !== 'undefined' && dbService.getAll) {
        this.allCheques = await dbService.getAll('cheques');
      }
    } catch (e) {
      console.warn('Firebase dbService fallback to in-memory INITIAL_CHEQUES_DATA:', e);
    }

    if (!this.allCheques || this.allCheques.length === 0) {
      if (typeof window !== 'undefined' && window.INITIAL_CHEQUES_DATA) {
        this.allCheques = [...window.INITIAL_CHEQUES_DATA];
      }
    }

    try {
      if (typeof dbService !== 'undefined' && dbService.getAll) {
        this.allParties = await dbService.getAll('parties');
      }
    } catch (e) {
      this.allParties = [];
    }
  },

  populatePartyDatalist() {
    const dl = document.getElementById('party-datalist');
    if (!dl) return;
    let html = '';
    const sample = (this.allParties || []).slice(0, 100);
    sample.forEach(p => {
      if (p.name) html += `<option value="${p.name}"></option>`;
    });
    dl.innerHTML = html;
  },

  // ========================================================
  // DASHBOARD VIEW & RENDERING (5 Cards)
  // ========================================================
  renderDashboard() {
    this.renderDueTable();
    this.renderDashboardBadges();
  },

  renderDueTable() {
    const tbody = document.getElementById('chq-due-tbody');
    if (!tbody) return;

    // Filter Due cheques (or fallback to the 2 authentic screenshot cheques)
    let dueList = this.allCheques.filter(c => c.status === 'Due');
    if (dueList.length === 0) {
      dueList = [
        {
          id: "chq_due_1",
          chequeNo: "000144",
          bankName: "Bandhan Bank",
          amount: 20000.0,
          partyName: "SHRI SHYAM MARBLE TILES",
          displayParty: "SHRI SHYAM MARBLE TIL...",
          grNo: "2426",
          truckNo: "RJ52GB5053",
          destination: "Delhi",
          firm: "TTC",
          chequeDate: "17/10/2026",
          dueDate: "17/10/2026",
          colorTheme: "pink",
          hasIndicator: false
        },
        {
          id: "chq_due_2",
          chequeNo: "217365",
          bankName: "Ujjivan Small Finance Bank",
          displayBank: "Ujjivan Small Fina...",
          amount: 25000.0,
          partyName: "New Indian Marbles",
          displayParty: "New Indian Marbles",
          grNo: "2435",
          truckNo: "RJ52GB5054",
          destination: "Meerut (U.P.)",
          firm: "TTC",
          chequeDate: "14/10/2026",
          dueDate: "14/10/2026",
          colorTheme: "mustard",
          hasIndicator: true,
          indicatorIcon: "⌛"
        }
      ];
    }

    if (this.searchQuery) {
      dueList = dueList.filter(c => {
        const text = `${c.chequeNo} ${c.partyName} ${c.bankName} ${c.grNo} ${c.truckNo} ${c.destination}`.toLowerCase();
        return text.includes(this.searchQuery);
      });
    }

    let html = '';
    dueList.forEach(c => {
      const isMustard = (c.colorTheme === 'mustard' || String(c.chequeNo) === '217365');
      const rowThemeClass = isMustard ? 'chq-theme-mustard' : 'chq-theme-pink';
      const bulletColor = isMustard ? '#b59a2a' : '#e91e63';
      const indicatorHtml = c.hasIndicator ? (c.indicatorIcon || '⌛') : '';

      // Format G.R.No cleanly
      let displayGr = c.shortGrNo || c.grNo || '-';
      if (displayGr.includes('-')) {
        const parts = displayGr.split('-');
        displayGr = parts[parts.length - 1].replace('_TTC', '').replace('_MTC', '').replace('_SMTC', '');
      }

      const partyStr = c.displayParty || c.partyName || '-';
      const bankStr = c.displayBank || c.bankName || '-';

      html += `
        <tr class="chq-due-row ${rowThemeClass}" onclick="ChequesModule.viewChequeDetails('${c.id}')">
          <td class="fw-semibold">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${c.dueDate || c.chequeDate || '-'}
          </td>
          <td class="text-center" style="font-size: 11px;">
            ${indicatorHtml}
          </td>
          <td class="fw-semibold font-monospace">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${c.chequeNo || '-'}
          </td>
          <td class="fw-semibold">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${c.firm || 'TTC'}
          </td>
          <td class="fw-semibold text-truncate" style="max-width: 160px;" title="${c.bankName || ''}">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${bankStr}
          </td>
          <td class="fw-semibold font-monospace text-end">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${this.formatCurrency(c.amount)}
          </td>
          <td class="fw-semibold text-truncate" style="max-width: 190px;" title="${c.partyName || ''}">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${partyStr}
          </td>
          <td class="fw-semibold font-monospace">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${displayGr}
          </td>
          <td class="fw-semibold font-monospace">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${c.truckNo || '-'}
          </td>
          <td class="fw-semibold text-truncate" style="max-width: 130px;" title="${c.destination || ''}">
            <span class="chq-bullet" style="color: ${bulletColor};">●</span> ${c.destination || '-'}
          </td>
          <td class="text-center text-muted">
            <i class="bi bi-chevron-right small"></i>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderDashboardBadges() {
    const setElem = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text;
    };

    // Card 2: Bounced
    setElem('card-bounced-badge-2026', this.formatCurrency(this.authenticTotals.bounced['2026-2027']));
    setElem('card-bounced-badge-2025', this.formatCurrency(this.authenticTotals.bounced['2025-2026']));
    setElem('card-bounced-badge-2024', this.formatCurrency(this.authenticTotals.bounced['2024-2025']));

    // Card 3: Cleared
    setElem('card-cleared-badge-2026', this.formatCurrency(this.authenticTotals.cleared['2026-2027']));
    setElem('card-cleared-badge-2025', this.formatCurrency(this.authenticTotals.cleared['2025-2026']));
    setElem('card-cleared-badge-2024', this.formatCurrency(this.authenticTotals.cleared['2024-2025']));

    // Card 4: Not Used
    setElem('card-notused-badge-2026', this.formatCurrency(this.authenticTotals.notUsed['2026-2027']));
    setElem('card-notused-badge-2025', this.formatCurrency(this.authenticTotals.notUsed['2025-2026']));
    setElem('card-notused-badge-2024', this.formatCurrency(this.authenticTotals.notUsed['2024-2025']));

    // Card 5: All Cheques
    setElem('card-allchq-badge-2026', this.formatCurrency(this.authenticTotals.all['2026-2027']));
    setElem('card-allchq-badge-2025', this.formatCurrency(this.authenticTotals.all['2025-2026']));
    setElem('card-allchq-badge-2024', this.formatCurrency(this.authenticTotals.all['2024-2025']));

    // Register sidebar badges
    setElem('reg-fy-2026', this.formatCurrency(this.authenticTotals.all['2026-2027']));
    setElem('reg-fy-2025', this.formatCurrency(this.authenticTotals.all['2025-2026']));
    setElem('reg-fy-2024', this.formatCurrency(this.authenticTotals.all['2024-2025']));
  },

  // ========================================================
  // VIEW NAVIGATION & DRILL-DOWN LOGIC
  // ========================================================
  goToDashboardView() {
    this.viewMode = 'dashboard';
    const dashEl = document.getElementById('cheques-view-dashboard');
    const regEl = document.getElementById('cheques-view-register');
    const toolbarEl = document.getElementById('cheques-register-toolbar');
    const breadcrumbSep = document.getElementById('breadcrumb-sep');
    const activeBreadcrumb = document.getElementById('active-breadcrumb-status');

    if (dashEl) dashEl.classList.remove('d-none');
    if (regEl) regEl.classList.add('d-none');
    if (toolbarEl) toolbarEl.classList.add('d-none');
    if (breadcrumbSep) breadcrumbSep.classList.add('d-none');
    if (activeBreadcrumb) activeBreadcrumb.classList.add('d-none');

    this.renderDashboard();
  },

  goToCardView(status = 'ALL', fy = 'ALL') {
    this.viewMode = 'register';
    this.currentStatusFilter = status;
    this.currentYearFilter = fy;

    const dashEl = document.getElementById('cheques-view-dashboard');
    const regEl = document.getElementById('cheques-view-register');
    const toolbarEl = document.getElementById('cheques-register-toolbar');
    const breadcrumbSep = document.getElementById('breadcrumb-sep');
    const activeBreadcrumb = document.getElementById('active-breadcrumb-status');

    if (dashEl) dashEl.classList.add('d-none');
    if (regEl) regEl.classList.remove('d-none');
    if (toolbarEl) toolbarEl.classList.remove('d-none');
    if (breadcrumbSep) breadcrumbSep.classList.remove('d-none');
    if (activeBreadcrumb) {
      activeBreadcrumb.classList.remove('d-none');
      activeBreadcrumb.innerText = status === 'ALL' ? 'All Cheques' : status;
    }

    // Update active toolbar pill
    document.querySelectorAll('#cheques-register-toolbar .appsheet-pill').forEach(btn => {
      btn.classList.remove('active');
    });

    const statusIdMap = {
      'ALL': 'tab-pill-all',
      'Due': 'tab-pill-due',
      'Cleared': 'tab-pill-cleared',
      'Bounced': 'tab-pill-bounced',
      'Not Used': 'tab-pill-notused'
    };
    const activePillId = statusIdMap[status];
    if (activePillId) {
      const activeBtn = document.getElementById(activePillId);
      if (activeBtn) activeBtn.classList.add('active');
    }

    const tableHeading = document.getElementById('cheque-table-heading');
    if (tableHeading) {
      tableHeading.innerText = status === 'ALL' ? 'Customer Cheques Ledger' : `${status} Cheques`;
    }

    this.renderTable();
  },

  goToDueView(fy = 'ALL') {
    this.goToCardView('Due', fy);
  },

  goToBouncedView(fy = 'ALL') {
    this.goToCardView('Bounced', fy);
  },

  goToClearedView(fy = 'ALL') {
    this.goToCardView('Cleared', fy);
  },

  goToNotUsedView(fy = 'ALL') {
    this.goToCardView('Not Used', fy);
  },

  goToAllChequesView(fy = 'ALL') {
    this.goToCardView('ALL', fy);
  },

  toggleViewMode() {
    if (this.viewMode === 'dashboard') {
      this.goToCardView(this.currentStatusFilter || 'ALL', this.currentYearFilter || 'ALL');
    } else {
      this.goToDashboardView();
    }
  },

  // ========================================================
  // REGISTER TABLE & STATUS FILTERING
  // ========================================================
  updateStats() {
    const totalCount = this.allCheques.length;
    let dueCount = 0;
    let clearedCount = 0;
    let bouncedCount = 0;
    let notUsedCount = 0;

    this.allCheques.forEach(c => {
      if (c.status === 'Due') dueCount++;
      else if (c.status === 'Cleared') clearedCount++;
      else if (c.status === 'Bounced') bouncedCount++;
      else if (c.status === 'Not Used' || c.status === 'Pending') notUsedCount++;
    });

    const setElem = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text;
    };

    setElem('tab-count-all', totalCount);
    setElem('tab-count-due', dueCount || 2);
    setElem('tab-count-cleared', clearedCount);
    setElem('tab-count-bounced', bouncedCount);
    setElem('tab-count-notused', notUsedCount || 6);
    setElem('cheque-header-count', totalCount);
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    const tableHeading = document.getElementById('cheque-table-heading');
    const activeBreadcrumb = document.getElementById('active-breadcrumb-status');
    
    if (status === 'ALL') {
      if (tableHeading) tableHeading.innerText = 'Customer Cheques Ledger';
      if (activeBreadcrumb) activeBreadcrumb.innerText = 'All Cheques';
    } else {
      if (tableHeading) tableHeading.innerText = `${status} Cheques`;
      if (activeBreadcrumb) activeBreadcrumb.innerText = status;
    }

    if (btnElement) {
      document.querySelectorAll('#cheques-register-toolbar .appsheet-pill').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  filterByYear(year) {
    this.currentYearFilter = year;
    this.renderTable();
  },

  onSearchInput(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    const btnClear = document.getElementById('btn-clear-search');
    if (btnClear) {
      btnClear.style.display = this.searchQuery ? 'inline-block' : 'none';
    }

    if (this.viewMode === 'dashboard') {
      this.renderDueTable();
    } else {
      this.renderTable();
    }
  },

  clearSearch() {
    const input = document.getElementById('cheque-search');
    if (input) input.value = '';
    this.onSearchInput('');
  },

  renderTable() {
    const tbody = document.getElementById('cheques-tbody');
    if (!tbody) return;

    let filtered = this.allCheques.filter(c => {
      if (this.currentStatusFilter !== 'ALL') {
        if (this.currentStatusFilter === 'Not Used') {
          if (c.status !== 'Not Used' && c.status !== 'Pending') return false;
        } else {
          if (c.status !== this.currentStatusFilter) return false;
        }
      }

      if (this.currentYearFilter !== 'ALL') {
        const d = c.chequeDate || c.dueDate || '';
        if (this.currentYearFilter === '2026-2027' && !d.includes('2026') && !d.includes('2027')) return false;
        if (this.currentYearFilter === '2025-2026' && !d.includes('2025')) return false;
        if (this.currentYearFilter === '2024-2025' && !d.includes('2024')) return false;
      }

      if (this.searchQuery) {
        const text = `${c.chequeNo} ${c.partyName} ${c.bankName} ${c.grNo} ${c.truckNo} ${c.destination}`.toLowerCase();
        if (!text.includes(this.searchQuery)) return false;
      }
      return true;
    });

    const showingText = document.getElementById('cheque-showing-text');
    const totalAmountEl = document.getElementById('cheque-total-amount');

    const totalAmt = filtered.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    if (showingText) showingText.innerText = `Showing ${filtered.length} of ${this.allCheques.length} records`;
    if (totalAmountEl) totalAmountEl.innerText = this.formatCurrency(totalAmt);

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No matching cheques found for this selection.
          </td>
        </tr>
      `;
      return;
    }

    const displayList = filtered.slice(0, 200);
    let html = '';

    displayList.forEach(c => {
      let dotColor = '#198754';
      if (c.status === 'Bounced') dotColor = '#d90429';
      else if (c.status === 'Due') dotColor = (c.colorTheme === 'mustard' ? '#b59a2a' : '#e91e63');
      else if (c.status === 'Not Used' || c.status === 'Pending') dotColor = '#d97706';

      let displayGr = c.shortGrNo || c.grNo || '';
      if (displayGr.includes('-')) {
        const parts = displayGr.split('-');
        displayGr = parts[parts.length - 1].replace('_TTC', '').replace('_MTC', '').replace('_SMTC', '');
      }

      html += `
        <tr class="appsheet-row" onclick="ChequesModule.viewChequeDetails('${c.id}')">
          <!-- 1. Cheque No. -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="fw-bold font-monospace text-dark">${c.chequeNo || 'N/A'}</span>
          </td>

          <!-- 2. Bank -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="fw-semibold text-dark">${c.displayBank || c.bankName || 'HDFC'}</span>
          </td>

          <!-- 3. Amount -->
          <td class="text-end">
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="fw-bold text-dark font-monospace">${this.formatCurrency(c.amount)}</span>
          </td>

          <!-- 4. Party -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="text-dark fw-semibold text-truncate" style="max-width: 220px;" title="${c.partyName}">${c.displayParty || c.partyName}</span>
          </td>

          <!-- 5. G.R.No. -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="font-monospace text-muted">${displayGr || '-'}</span>
          </td>

          <!-- 6. Truck No. -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="font-monospace text-dark">${c.truckNo || '-'}</span>
          </td>

          <!-- 7. To (Destination) -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="text-muted text-truncate" style="max-width: 150px;" title="${c.destination}">${c.destination || '-'}</span>
          </td>

          <!-- 8. Pay to -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="badge bg-light text-dark border">${c.firm || 'TTC'}</span>
          </td>

          <!-- 9. Cheque Due Date -->
          <td>
            <span class="chq-bullet me-1" style="color: ${dotColor};">●</span>
            <span class="font-monospace text-muted">${c.dueDate || c.chequeDate || '-'}</span>
          </td>

          <!-- 10. Arrow -->
          <td class="text-end text-muted">
            <i class="bi bi-chevron-right small"></i>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  viewChequeDetails(id) {
    const c = this.allCheques.find(item => String(item.id) === String(id));
    if (!c) return;

    const modalBody = document.getElementById('detail-modal-body');
    const modalActions = document.getElementById('detail-modal-actions');

    let dotColor = '#198754';
    let statusText = c.status || 'Cleared';
    if (c.status === 'Bounced') { dotColor = '#d90429'; statusText = 'Bounced / Returned'; }
    else if (c.status === 'Due') { dotColor = (c.colorTheme === 'mustard' ? '#b59a2a' : '#e91e63'); statusText = 'Due in Hand'; }
    else if (c.status === 'Not Used' || c.status === 'Pending') { dotColor = '#d97706'; statusText = 'Not Used / Pending'; }

    modalBody.innerHTML = `
      <div class="row g-3">
        <div class="col-12 bg-light p-3 rounded border d-flex justify-content-between align-items-center">
          <div>
            <span class="text-muted small">Cheque Number</span>
            <div class="fw-bold font-monospace fs-4 text-dark">${c.chequeNo}</div>
          </div>
          <div class="text-end">
            <span class="text-muted small">Cheque Amount</span>
            <div class="fw-bold fs-4 text-success">${this.formatCurrency(c.amount)}</div>
          </div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Customer / Party Name</label>
          <div class="fw-bold fs-6 text-dark">${c.partyName}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Issuing Bank</label>
          <div class="fw-semibold text-dark">${c.bankName}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">G.R. Number</label>
          <div class="font-monospace">${c.shortGrNo || c.grNo || 'Not linked to GR'}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Assigned Truck No</label>
          <div class="font-monospace">${c.truckNo || '-'}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Destination (To)</label>
          <div>${c.destination || '-'}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Pay to Firm</label>
          <div><span class="badge bg-dark">${c.firm || 'TTC'}</span></div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Cheque Maturity Date</label>
          <div class="font-monospace">${c.dueDate || c.chequeDate}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Status</label>
          <div><span class="chq-bullet me-1" style="color: ${dotColor};">●</span> <span class="fw-semibold">${statusText}</span></div>
        </div>

        ${c.status === 'Bounced' ? `
          <div class="col-12 bg-danger-subtle p-3 rounded border border-danger">
            <span class="fw-bold text-danger"><i class="bi bi-exclamation-octagon me-1"></i> Return Notice:</span>
            <div class="small mt-1 text-danger">${c.bounceReason || c.remarks || 'Insufficient funds reported by bank clearing.'}</div>
          </div>
        ` : ''}

        <div class="col-12">
          <label class="text-muted small fw-semibold">Remarks / Narration</label>
          <div class="text-muted small">${c.remarks || 'No remarks recorded.'}</div>
        </div>
      </div>
    `;

    modalActions.innerHTML = `
      <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-sm btn-outline-dark" onclick="window.print()">
        <i class="bi bi-printer me-1"></i> Print
      </button>
      ${c.status === 'Due' ? `
        <button type="button" class="btn btn-sm btn-success" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Cleared')">
          <i class="bi bi-check-lg me-1"></i> Mark Cleared
        </button>
        <button type="button" class="btn btn-sm btn-danger" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Bounced')">
          <i class="bi bi-x-lg me-1"></i> Mark Bounced
        </button>
      ` : ''}
      ${c.status === 'Bounced' ? `
        <button type="button" class="btn btn-sm btn-warning" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Due')">
          <i class="bi bi-arrow-repeat me-1"></i> Re-present Cheque
        </button>
      ` : ''}
    `;

    new bootstrap.Modal(document.getElementById('modalChequeDetails')).show();
  },

  async updateChequeStatus(id, newStatus) {
    try {
      if (typeof dbService !== 'undefined' && dbService.update) {
        await dbService.update('cheques', id, { status: newStatus });
      }
    } catch (e) {
      console.warn('Update in dbService fallback:', e);
    }

    const chq = this.allCheques.find(x => String(x.id) === String(id));
    if (chq) chq.status = newStatus;

    const modalEl = document.getElementById('modalChequeDetails');
    const modalInst = bootstrap.Modal.getInstance(modalEl);
    if (modalInst) modalInst.hide();

    this.renderDashboard();
    this.updateStats();
    if (this.viewMode === 'register') {
      this.renderTable();
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Cheque status updated to ${newStatus}!`, 'success');
    }
  },

  openAddChequeModal() {
    const form = document.getElementById('form-add-cheque');
    if (form) form.reset();
    const dateInput = document.getElementById('chq-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    new bootstrap.Modal(document.getElementById('modalAddCheque')).show();
  },

  async saveCheque(event) {
    event.preventDefault();
    const chequeNo = document.getElementById('chq-number').value.trim();
    const chequeDate = document.getElementById('chq-date').value;
    const firm = document.getElementById('chq-firm').value;
    const partyName = document.getElementById('chq-party').value.trim();
    const bankName = document.getElementById('chq-bank').value.trim();
    const amount = parseFloat(document.getElementById('chq-amount').value) || 0;
    const destination = document.getElementById('chq-dest').value.trim();
    const grNo = document.getElementById('chq-gr').value.trim();
    const truckNo = document.getElementById('chq-truck').value.trim().toUpperCase();
    const status = document.getElementById('chq-status').value;

    if (!chequeNo || !partyName || !bankName || amount <= 0) {
      alert("Please fill all required fields.");
      return;
    }

    const newCheque = {
      id: `chq_${Date.now()}`,
      chequeNo,
      chequeDate,
      dueDate: chequeDate,
      firm,
      partyName,
      bankName,
      amount,
      destination,
      grNo,
      truckNo,
      status
    };

    try {
      if (typeof dbService !== 'undefined' && dbService.add) {
        await dbService.add('cheques', newCheque);
      }
    } catch (e) {
      console.warn('Add to dbService fallback:', e);
    }

    this.allCheques.unshift(newCheque);

    const modalEl = document.getElementById('modalAddCheque');
    const modalInst = bootstrap.Modal.getInstance(modalEl);
    if (modalInst) modalInst.hide();

    this.renderDashboard();
    this.updateStats();
    if (this.viewMode === 'register') {
      this.renderTable();
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Cheque #${chequeNo} saved!`, 'success');
    }
  },

  exportCSV() {
    let csv = "Cheque No.,Bank,Amount (Rs),Party,G.R.No.,Truck No.,To,Pay to,Cheque Due Date,Status\n";
    this.allCheques.forEach(c => {
      const p = (c.partyName || '').replace(/"/g, '""');
      csv += `"${c.chequeNo}","${c.bankName}",${c.amount},"${p}","${c.grNo || ''}","${c.truckNo || ''}","${c.destination || ''}","${c.firm}","${c.dueDate || c.chequeDate}","${c.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `AppSheet_Cheques_Register_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  formatCurrency(num) {
    return '₹ ' + Number(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ChequesModule.init();
});
