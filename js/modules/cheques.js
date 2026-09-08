/**
 * Cheques Register Module
 * Tracks customer cheques, banking deposits, clearings & bounces
 */

const ChequesModule = {
  allCheques: [],
  allParties: [],
  currentStatusFilter: 'ALL',

  async init() {
    AppUI.renderSidebar('cheques');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allCheques = await dbService.getAll('cheques');
    this.allParties = await dbService.getAll('parties');
  },

  updateKPIs() {
    let pendingAmt = 0, pendingCount = 0;
    let depositedAmt = 0, depositedCount = 0;
    let clearedAmt = 0, clearedCount = 0;
    let bouncedAmt = 0, bouncedCount = 0;

    this.allCheques.forEach(c => {
      const amt = Number(c.amount) || 0;
      if (c.status === 'Pending') {
        pendingAmt += amt;
        pendingCount++;
      } else if (c.status === 'Deposited') {
        depositedAmt += amt;
        depositedCount++;
      } else if (c.status === 'Cleared') {
        clearedAmt += amt;
        clearedCount++;
      } else if (c.status === 'Bounced') {
        bouncedAmt += amt;
        bouncedCount++;
      }
    });

    const elPending = document.getElementById('kpi-chq-pending');
    const elPendingCount = document.getElementById('kpi-chq-pending-count');
    const elDeposited = document.getElementById('kpi-chq-deposited');
    const elDepositedCount = document.getElementById('kpi-chq-deposited-count');
    const elCleared = document.getElementById('kpi-chq-cleared');
    const elClearedCount = document.getElementById('kpi-chq-cleared-count');
    const elBounced = document.getElementById('kpi-chq-bounced');
    const elBouncedCount = document.getElementById('kpi-chq-bounced-count');

    if (elPending) elPending.innerText = AppUI.formatCurrency(pendingAmt);
    if (elPendingCount) elPendingCount.innerText = `${pendingCount} Cheques`;
    if (elDeposited) elDeposited.innerText = AppUI.formatCurrency(depositedAmt);
    if (elDepositedCount) elDepositedCount.innerText = `${depositedCount} Cheques`;
    if (elCleared) elCleared.innerText = AppUI.formatCurrency(clearedAmt);
    if (elClearedCount) elClearedCount.innerText = `${clearedCount} Cheques`;
    if (elBounced) elBounced.innerText = AppUI.formatCurrency(bouncedAmt);
    if (elBouncedCount) elBouncedCount.innerText = `${bouncedCount} Cheques`;
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    if (btnElement) {
      document.querySelectorAll('#chequeTabs .nav-link').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('cheques-tbody');
    if (!tbody) return;

    const firmFilter = document.getElementById('firm-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('cheque-search')?.value || '').toLowerCase().trim();

    const filtered = this.allCheques.filter(c => {
      if (this.currentStatusFilter !== 'ALL' && c.status !== this.currentStatusFilter) return false;
      if (firmFilter !== 'ALL' && c.firm !== firmFilter) return false;
      if (searchQuery) {
        const text = `${c.chequeNo} ${c.partyName} ${c.bankName} ${c.depositAccount} ${c.remarks}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No cheques found for the selected filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      let statusBadge = '';
      if (c.status === 'Pending') {
        statusBadge = '<span class="badge bg-warning-subtle text-warning-emphasis"><i class="bi bi-clock me-1"></i>Pending</span>';
      } else if (c.status === 'Deposited') {
        statusBadge = '<span class="badge bg-info-subtle text-info"><i class="bi bi-bank me-1"></i>Deposited</span>';
      } else if (c.status === 'Cleared') {
        statusBadge = '<span class="badge bg-success-subtle text-success"><i class="bi bi-check-circle me-1"></i>Cleared</span>';
      } else if (c.status === 'Bounced') {
        statusBadge = '<span class="badge bg-danger-subtle text-danger"><i class="bi bi-exclamation-triangle me-1"></i>Bounced</span>';
      }

      return `
        <tr>
          <td class="font-monospace fw-bold text-primary">${c.chequeNo}</td>
          <td><span class="fw-semibold">${AppUI.formatDate(c.chequeDate)}</span></td>
          <td class="fw-bold text-dark">${c.partyName}</td>
          <td>
            <div class="fw-semibold text-secondary small">${c.bankName}</div>
            <span class="badge ${APP_CONFIG.firms[c.firm]?.badgeClass || 'bg-secondary'}">${c.firm}</span>
          </td>
          <td class="small text-muted">${c.depositAccount || '-'}</td>
          <td class="text-end fw-bold text-dark fs-6">${AppUI.formatCurrency(c.amount)}</td>
          <td>${statusBadge}</td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              ${c.status === 'Pending' ? `
                <button class="btn btn-outline-primary py-0 px-2" title="Mark Deposited in Bank" onclick="ChequesModule.quickStatusUpdate('${c.id}', 'Deposited')">
                  <i class="bi bi-bank me-1"></i> Deposit
                </button>
              ` : ''}
              ${c.status === 'Deposited' ? `
                <button class="btn btn-outline-success py-0 px-2" title="Mark Cleared" onclick="ChequesModule.quickStatusUpdate('${c.id}', 'Cleared')">
                  <i class="bi bi-check-lg"></i> Clear
                </button>
                <button class="btn btn-outline-warning py-0 px-2" title="Mark Bounced" onclick="ChequesModule.quickStatusUpdate('${c.id}', 'Bounced')">
                  <i class="bi bi-x-lg"></i> Bounce
                </button>
              ` : ''}
              <button class="btn btn-outline-danger py-0 px-2" title="Delete Cheque" onclick="ChequesModule.deleteCheque('${c.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openAddChequeModal() {
    const form = document.getElementById('form-add-cheque');
    if (form) form.reset();

    const dateInput = document.getElementById('chq-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    const partySelect = document.getElementById('chq-party');
    if (partySelect) {
      partySelect.innerHTML = '<option value="">-- Select Party --</option>' + 
        this.allParties.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
    }

    const modal = new bootstrap.Modal(document.getElementById('modalAddCheque'));
    modal.show();
  },

  async saveCheque(e) {
    e.preventDefault();
    const chequeNo = document.getElementById('chq-number').value.trim();
    const chequeDate = document.getElementById('chq-date').value;
    const firm = document.getElementById('chq-firm').value;
    const partyName = document.getElementById('chq-party').value;
    const bankName = document.getElementById('chq-bank').value.trim();
    const amount = Number(document.getElementById('chq-amount').value) || 0;
    const depositAccount = document.getElementById('chq-deposit-acc').value;
    const status = document.getElementById('chq-status').value;
    const remarks = document.getElementById('chq-remarks').value.trim();

    const chequeData = {
      chequeNo,
      chequeDate,
      firm,
      partyName,
      bankName,
      amount,
      depositAccount,
      status,
      depositDate: status === 'Deposited' ? new Date().toISOString().split('T')[0] : '',
      clearanceDate: status === 'Cleared' ? new Date().toISOString().split('T')[0] : '',
      remarks
    };

    await dbService.add('cheques', chequeData);

    const modalEl = document.getElementById('modalAddCheque');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Cheque ${chequeNo} for ${AppUI.formatCurrency(amount)} recorded!`, 'success');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async quickStatusUpdate(id, newStatus) {
    const cheque = this.allCheques.find(c => c.id === id);
    if (!cheque) return;

    const updates = { status: newStatus };
    const today = new Date().toISOString().split('T')[0];

    if (newStatus === 'Deposited') {
      updates.depositDate = today;
    } else if (newStatus === 'Cleared') {
      updates.clearanceDate = today;
    }

    await dbService.update('cheques', id, updates);
    AppUI.showToast(`Cheque ${cheque.chequeNo} marked as ${newStatus}!`, 'info');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async deleteCheque(id) {
    if (!confirm("Are you sure you want to delete this cheque record?")) return;
    await dbService.delete('cheques', id);
    AppUI.showToast("Cheque record deleted", "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => ChequesModule.init());
