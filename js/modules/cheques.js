/**
 * Customer Cheques Register Module - MTC & TTC Logistics
 * Matches Google AppSheet UI (sample_51.png)
 * Total 724 Cheques across Cleared, Bounced, Pending, and Deposited
 */

const ChequesModule = {
  allCheques: [],
  allParties: [],
  currentStatusFilter: 'ALL',
  currentYearFilter: 'ALL',
  searchQuery: '',

  async init() {
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('cheques');
    }
    await this.loadData();
    this.populatePartyDatalist();
    this.updateStats();
    this.renderTable();
  },

  async loadData() {
    this.allCheques = await dbService.getAll('cheques');
    try {
      this.allParties = await dbService.getAll('parties');
    } catch (e) {
      this.allParties = [];
    }
  },

  populatePartyDatalist() {
    const dl = document.getElementById('party-datalist');
    if (!dl) return;
    let html = '';
    const sample = this.allParties.slice(0, 100);
    sample.forEach(p => {
      if (p.name) html += `<option value="${p.name}"></option>`;
    });
    dl.innerHTML = html;
  },

  updateStats() {
    const totalCount = this.allCheques.length;
    let pendingCount = 0;
    let depositedCount = 0;
    let clearedCount = 0;
    let bouncedCount = 0;

    this.allCheques.forEach(c => {
      if (c.status === 'Pending') pendingCount++;
      else if (c.status === 'Deposited') depositedCount++;
      else if (c.status === 'Cleared') clearedCount++;
      else if (c.status === 'Bounced') bouncedCount++;
    });

    const setElem = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text;
    };

    setElem('tab-count-all', totalCount);
    setElem('tab-count-cleared', clearedCount);
    setElem('tab-count-bounced', bouncedCount);
    setElem('tab-count-pending', pendingCount);
    setElem('tab-count-deposited', depositedCount);
    setElem('cheque-header-count', totalCount);
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    const viewTitle = document.getElementById('breadcrumb-current-view');
    const tableHeading = document.getElementById('cheque-table-heading');
    
    if (status === 'ALL') {
      if (viewTitle) viewTitle.innerText = 'All Cheques';
      if (tableHeading) tableHeading.innerText = 'Customer Cheques Ledger';
    } else {
      if (viewTitle) viewTitle.innerText = status;
      if (tableHeading) tableHeading.innerText = `${status} Cheques`;
    }

    if (btnElement) {
      document.querySelectorAll('.appsheet-pill').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  filterByYear(year) {
    this.currentYearFilter = year;
    this.renderTable();
  },

  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('cheques-tbody');
    if (!tbody) return;

    let filtered = this.allCheques.filter(c => {
      if (this.currentStatusFilter !== 'ALL' && c.status !== this.currentStatusFilter) return false;

      if (this.currentYearFilter !== 'ALL') {
        const d = c.chequeDate || '';
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
      let dotClass = 'dot-cleared';
      if (c.status === 'Bounced') dotClass = 'dot-bounced';
      else if (c.status === 'Pending') dotClass = 'dot-pending';
      else if (c.status === 'Deposited') dotClass = 'dot-deposited';

      // Clean GR number (e.g. 2026-2027-1656_TTC -> 1656)
      let displayGr = c.grNo || '';
      if (displayGr.includes('-')) {
        const parts = displayGr.split('-');
        displayGr = parts[parts.length - 1].replace('_TTC', '').replace('_MTC', '').replace('_SMTC', '');
      }

      html += `
        <tr class="appsheet-row" onclick="ChequesModule.viewChequeDetails('${c.id}')">
          <!-- 1. Cheque No. with dot -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="fw-bold font-monospace text-dark">${c.chequeNo || 'N/A'}</span>
          </td>

          <!-- 2. Bank -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="fw-semibold text-dark">${c.bankName || 'HDFC'}</span>
          </td>

          <!-- 3. Amount -->
          <td class="text-end">
            <span class="${dotClass} me-2">●</span>
            <span class="fw-bold text-dark font-monospace">${this.formatCurrency(c.amount)}</span>
          </td>

          <!-- 4. Party -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="text-dark fw-semibold text-truncate" style="max-width: 220px;" title="${c.partyName}">${c.partyName}</span>
          </td>

          <!-- 5. G.R.No. -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="font-monospace text-muted">${displayGr || '-'}</span>
          </td>

          <!-- 6. Truck No. -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="font-monospace text-dark">${c.truckNo || '-'}</span>
          </td>

          <!-- 7. To (Destination) -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="text-muted text-truncate" style="max-width: 150px;" title="${c.destination}">${c.destination || '-'}</span>
          </td>

          <!-- 8. Pay to -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="badge bg-light text-dark border">${c.firm || 'TTC'}</span>
          </td>

          <!-- 9. Cheque Due Date -->
          <td>
            <span class="${dotClass} me-2">●</span>
            <span class="font-monospace text-muted">${c.chequeDate || '-'}</span>
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

    let dotClass = 'dot-cleared';
    let statusText = 'Cleared';
    if (c.status === 'Bounced') { dotClass = 'dot-bounced'; statusText = 'Bounced / Returned'; }
    else if (c.status === 'Pending') { dotClass = 'dot-pending'; statusText = 'Pending in Hand'; }
    else if (c.status === 'Deposited') { dotClass = 'dot-deposited'; statusText = 'Deposited in Bank'; }

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
          <div class="font-monospace">${c.grNo || 'Not linked to GR'}</div>
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
          <div class="font-monospace">${c.chequeDate}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Status</label>
          <div><span class="${dotClass} me-1">●</span> <span class="fw-semibold">${statusText}</span></div>
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
      ${c.status === 'Pending' ? `
        <button type="button" class="btn btn-sm btn-primary" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Deposited')">
          <i class="bi bi-bank me-1"></i> Mark Deposited
        </button>
      ` : ''}
      ${c.status === 'Deposited' ? `
        <button type="button" class="btn btn-sm btn-success" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Cleared')">
          <i class="bi bi-check-lg me-1"></i> Mark Cleared
        </button>
        <button type="button" class="btn btn-sm btn-danger" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Bounced')">
          <i class="bi bi-x-lg me-1"></i> Mark Bounced
        </button>
      ` : ''}
      ${c.status === 'Bounced' ? `
        <button type="button" class="btn btn-sm btn-warning" onclick="ChequesModule.updateChequeStatus('${c.id}', 'Deposited')">
          <i class="bi bi-arrow-repeat me-1"></i> Re-present Cheque
        </button>
      ` : ''}
    `;

    new bootstrap.Modal(document.getElementById('modalChequeDetails')).show();
  },

  async updateChequeStatus(id, newStatus) {
    await dbService.update('cheques', id, { status: newStatus });
    bootstrap.Modal.getInstance(document.getElementById('modalChequeDetails')).hide();
    await this.loadData();
    this.updateStats();
    this.renderTable();
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
      chequeNo,
      chequeDate,
      firm,
      partyName,
      bankName,
      amount,
      destination,
      grNo,
      truckNo,
      status
    };

    await dbService.add('cheques', newCheque);
    bootstrap.Modal.getInstance(document.getElementById('modalAddCheque')).hide();

    await this.loadData();
    this.updateStats();
    this.renderTable();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Cheque #${chequeNo} saved!`, 'success');
    }
  },

  exportCSV() {
    let csv = "Cheque No.,Bank,Amount (Rs),Party,G.R.No.,Truck No.,To,Pay to,Cheque Due Date,Status\n";
    this.allCheques.forEach(c => {
      const p = (c.partyName || '').replace(/"/g, '""');
      csv += `"${c.chequeNo}","${c.bankName}",${c.amount},"${p}","${c.grNo || ''}","${c.truckNo || ''}","${c.destination || ''}","${c.firm}","${c.chequeDate}","${c.status}"\n`;
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
