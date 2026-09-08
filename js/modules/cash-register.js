/**
 * Shahpura Cash Book & DEF Urea Register Module
 */

const CashModule = {
  allCashEntries: [],
  allDefEntries: [],

  async init() {
    AppUI.renderSidebar('cash');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  async loadData() {
    this.allCashEntries = await dbService.getAll('cashBook');
    this.allDefEntries = await dbService.getAll('defUrea');
  },

  updateKPIs() {
    let totalIn = 0;
    let totalOut = 0;

    this.allCashEntries.forEach(e => {
      const amt = Number(e.amount) || 0;
      if (e.type === 'IN') totalIn += amt;
      else if (e.type === 'OUT') totalOut += amt;
    });

    const cashInHand = totalIn - totalOut;

    // Calculate DEF inventory
    let defPurchased = 0;
    let defIssued = 0;
    let defPendingReturn = 0;

    this.allDefEntries.forEach(d => {
      const qty = Number(d.qtyBuckets) || 0;
      if (d.type === 'PURCHASE') {
        defPurchased += qty;
      } else if (d.type === 'ISSUE') {
        defIssued += qty;
        if (d.emptyBucketReturned && d.emptyBucketReturned.includes('No')) {
          defPendingReturn += qty;
        }
      }
    });

    const defInStock = Math.max(0, defPurchased - defIssued);

    const elHand = document.getElementById('kpi-cash-in-hand');
    const elIn = document.getElementById('kpi-cash-in');
    const elOut = document.getElementById('kpi-cash-out');
    const elDefStock = document.getElementById('kpi-def-stock');
    const elDefPending = document.getElementById('kpi-def-pending-return');

    if (elHand) elHand.innerText = AppUI.formatCurrency(cashInHand);
    if (elIn) elIn.innerText = AppUI.formatCurrency(totalIn);
    if (elOut) elOut.innerText = AppUI.formatCurrency(totalOut);
    if (elDefStock) elDefStock.innerText = `${defInStock} Buckets`;
    if (elDefPending) elDefPending.innerText = `${defPendingReturn} empty buckets pending return`;
  },

  renderTables() {
    this.renderCashBook();
    this.renderDefUrea();
  },

  renderCashBook() {
    const tbody = document.getElementById('cash-book-tbody');
    if (!tbody) return;

    const searchQuery = (document.getElementById('cash-search')?.value || '').toLowerCase().trim();

    const filtered = this.allCashEntries.filter(e => {
      if (searchQuery) {
        const text = `${e.particulars} ${e.category} ${e.truckNo} ${e.voucherNo} ${e.firm}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No cash transactions found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(e => `
      <tr>
        <td><span class="fw-semibold">${AppUI.formatDate(e.date)}</span></td>
        <td><span class="badge ${APP_CONFIG.firms[e.firm]?.badgeClass || 'bg-secondary'}">${e.firm || 'TTC'}</span></td>
        <td>
          <span class="badge ${e.type === 'IN' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
            ${e.type === 'IN' ? 'Cash In (जमा)' : 'Cash Out (खर्च)'}
          </span>
        </td>
        <td><span class="small fw-semibold text-secondary">${e.category}</span></td>
        <td class="fw-medium text-dark">${e.particulars}</td>
        <td>
          ${e.truckNo ? `<span class="badge bg-dark-subtle text-dark font-monospace">${e.truckNo}</span>` : '-'}
        </td>
        <td class="small font-monospace text-muted">${e.voucherNo || '-'}</td>
        <td class="text-end fw-bold text-success fs-6">
          ${e.type === 'IN' ? AppUI.formatCurrency(e.amount) : '-'}
        </td>
        <td class="text-end fw-bold text-danger fs-6">
          ${e.type === 'OUT' ? AppUI.formatCurrency(e.amount) : '-'}
        </td>
        <td class="text-center">
          <button class="btn btn-outline-danger btn-sm py-0 px-2" title="Delete Entry" onclick="CashModule.deleteCashEntry('${e.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderDefUrea() {
    const tbody = document.getElementById('def-urea-tbody');
    if (!tbody) return;

    if (this.allDefEntries.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No DEF Urea transactions recorded yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.allDefEntries.map(d => {
      const isPurchase = d.type === 'PURCHASE';
      const isReturnPending = d.emptyBucketReturned && d.emptyBucketReturned.includes('No');

      return `
        <tr>
          <td><span class="fw-semibold">${AppUI.formatDate(d.date)}</span></td>
          <td>
            <span class="badge ${isPurchase ? 'bg-success-subtle text-success' : 'bg-info-subtle text-info'}">
              ${isPurchase ? 'Stock Purchase' : 'Issue to Truck'}
            </span>
          </td>
          <td class="fw-bold font-monospace text-dark">
            ${isPurchase ? (d.supplier || 'Supplier') : (d.truckNo || '-')}
          </td>
          <td>${isPurchase ? '<span class="text-muted small">Inward Yard</span>' : (d.driver || '-')}</td>
          <td class="text-center fw-bold fs-6">
            ${d.qtyBuckets} Buckets
            ${d.bucketSize ? `<small class="text-muted d-block" style="font-size: 0.75rem;">(${d.bucketSize})</small>` : ''}
          </td>
          <td>
            ${isPurchase ? '<span class="text-muted small">New Sealed Stock</span>' : (
              isReturnPending ? `
                <span class="badge bg-warning-subtle text-warning-emphasis mb-1">
                  <i class="bi bi-exclamation-circle me-1"></i> Pending Return
                </span>
                <button class="btn btn-outline-success btn-sm py-0 px-1 d-block" style="font-size: 0.75rem;" onclick="CashModule.markBucketReturned('${d.id}')">
                  <i class="bi bi-check2"></i> Mark Returned
                </button>
              ` : `
                <span class="badge bg-success-subtle text-success">
                  <i class="bi bi-check2-circle me-1"></i> Returned
                </span>
              `
            )}
          </td>
          <td class="small text-muted">${d.remarks || '-'}</td>
          <td class="text-center">
            <button class="btn btn-outline-danger btn-sm py-0 px-2" title="Delete" onclick="CashModule.deleteDefEntry('${d.id}')">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  applyFilters() {
    this.renderTables();
  },

  openAddCashModal() {
    const form = document.getElementById('form-add-cash');
    if (form) form.reset();

    const dateInput = document.getElementById('ce-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    this.onCashTypeChange();

    const modal = new bootstrap.Modal(document.getElementById('modalAddCash'));
    modal.show();
  },

  onCashTypeChange() {
    const type = document.getElementById('ce-type')?.value;
    const catSelect = document.getElementById('ce-category');
    if (!catSelect) return;

    if (type === 'IN') {
      catSelect.innerHTML = `
        <option value="Bank Withdrawal">Bank Withdrawal (Self Cheque)</option>
        <option value="Party Cash Payment">Party Cash Payment Received</option>
        <option value="DEF Empty Bucket Refund">DEF Empty Bucket Return / Scrap</option>
        <option value="Freight Advance Refund">Driver Advance Refund</option>
        <option value="Partner Capital">Partner Capital / Misc</option>
      `;
    } else {
      catSelect.innerHTML = `
        <option value="Driver Advance">Driver Advance (Toll / Diesel / Kharcha)</option>
        <option value="Driver Kharcha">Driver Kharcha / Food</option>
        <option value="Office Expense">Shahpura Office Chai & Petty Cash</option>
        <option value="Truck Maintenance">Truck Maintenance & Spares</option>
        <option value="DEF Urea Purchase">DEF Urea Stock Purchase</option>
        <option value="Staff Salary">Staff / Guard Salary</option>
      `;
    }
  },

  async saveCashEntry(e) {
    e.preventDefault();
    const date = document.getElementById('ce-date').value;
    const type = document.getElementById('ce-type').value;
    const firm = document.getElementById('ce-firm').value;
    const category = document.getElementById('ce-category').value;
    const amount = Number(document.getElementById('ce-amount').value) || 0;
    const truckNo = document.getElementById('ce-truck').value.trim().toUpperCase();
    const voucherNo = document.getElementById('ce-voucher').value.trim();
    const particulars = document.getElementById('ce-particulars').value.trim();

    const entry = {
      date,
      type,
      firm,
      category,
      amount,
      truckNo,
      voucherNo,
      particulars
    };

    await dbService.add('cashBook', entry);

    const modalEl = document.getElementById('modalAddCash');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Cash entry of ${AppUI.formatCurrency(amount)} saved!`, 'success');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  // DEF Purchase Modal
  openPurchaseDefModal() {
    const form = document.getElementById('form-purchase-def');
    if (form) form.reset();

    const dateInput = document.getElementById('def-pur-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    const modal = new bootstrap.Modal(document.getElementById('modalPurchaseDef'));
    modal.show();
  },

  calcDefTotal() {
    const qty = Number(document.getElementById('def-pur-qty')?.value) || 0;
    const rate = Number(document.getElementById('def-pur-rate')?.value) || 0;
    const totalInput = document.getElementById('def-pur-total');
    if (totalInput) {
      totalInput.value = AppUI.formatCurrency(qty * rate);
    }
  },

  async savePurchaseDef(e) {
    e.preventDefault();
    const date = document.getElementById('def-pur-date').value;
    const bucketSize = document.getElementById('def-pur-size').value;
    const supplier = document.getElementById('def-pur-supplier').value.trim();
    const qtyBuckets = Number(document.getElementById('def-pur-qty').value) || 0;
    const rate = Number(document.getElementById('def-pur-rate').value) || 0;
    const totalAmount = qtyBuckets * rate;
    const remarks = document.getElementById('def-pur-remarks').value.trim();

    const defEntry = {
      type: "PURCHASE",
      date,
      bucketSize,
      supplier,
      qtyBuckets,
      rate,
      totalAmount,
      remarks
    };

    await dbService.add('defUrea', defEntry);

    const modalEl = document.getElementById('modalPurchaseDef');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Purchased ${qtyBuckets} DEF buckets inwarded!`, 'success');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  // Issue DEF Modal
  openIssueDefModal() {
    const form = document.getElementById('form-issue-def');
    if (form) form.reset();

    const dateInput = document.getElementById('def-issue-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    const modal = new bootstrap.Modal(document.getElementById('modalIssueDef'));
    modal.show();
  },

  async saveIssueDef(e) {
    e.preventDefault();
    const date = document.getElementById('def-issue-date').value;
    const truckNo = document.getElementById('def-issue-truck').value.trim().toUpperCase();
    const driver = document.getElementById('def-issue-driver').value.trim();
    const qtyBuckets = Number(document.getElementById('def-issue-qty').value) || 1;
    const emptyBucketReturned = document.getElementById('def-issue-empty').value;
    const remarks = document.getElementById('def-issue-remarks').value.trim();

    const defEntry = {
      type: "ISSUE",
      date,
      truckNo,
      driver,
      qtyBuckets,
      emptyBucketReturned,
      returnedDate: emptyBucketReturned.includes('Yes') ? date : '',
      remarks
    };

    await dbService.add('defUrea', defEntry);

    const modalEl = document.getElementById('modalIssueDef');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`${qtyBuckets} DEF buckets issued to truck ${truckNo}!`, 'success');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  async markBucketReturned(id) {
    await dbService.update('defUrea', id, {
      emptyBucketReturned: "Yes",
      returnedDate: new Date().toISOString().split('T')[0]
    });
    AppUI.showToast("Empty bucket marked as returned!", "success");
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  async deleteCashEntry(id) {
    if (!confirm("Are you sure you want to delete this cash transaction?")) return;
    await dbService.delete('cashBook', id);
    AppUI.showToast("Cash entry deleted", "info");
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  async deleteDefEntry(id) {
    if (!confirm("Are you sure you want to delete this DEF record?")) return;
    await dbService.delete('defUrea', id);
    AppUI.showToast("DEF record deleted", "info");
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => CashModule.init());
