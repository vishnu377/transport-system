/**
 * GST Freight Invoices Module
 * Generates official GTA Freight Invoices (SAC: 996511) with trip annexures
 */

const GstInvoicesModule = {
  allInvoices: [],
  allTrips: [],
  allParties: [],
  selectedTrips: [],

  async init() {
    AppUI.renderSidebar('gst');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allInvoices = await dbService.getAll('gstInvoices');
    this.allTrips = await dbService.getAll('trips');
    this.allParties = await dbService.getAll('parties');
  },

  updateKPIs() {
    const totalCount = this.allInvoices.length;
    const freightTotal = this.allInvoices.reduce((sum, inv) => sum + (Number(inv.subTotal) || 0), 0);
    const rcmCount = this.allInvoices.filter(inv => inv.isRcm === 'Yes').length;
    const fwdCount = this.allInvoices.filter(inv => inv.isRcm !== 'Yes').length;

    const elCount = document.getElementById('kpi-gst-inv-count');
    const elFreight = document.getElementById('kpi-gst-freight-total');
    const elRcm = document.getElementById('kpi-gst-rcm-count');
    const elFwd = document.getElementById('kpi-gst-fwd-count');

    if (elCount) elCount.innerText = totalCount;
    if (elFreight) elFreight.innerText = AppUI.formatCurrency(freightTotal);
    if (elRcm) elRcm.innerText = `${rcmCount} Invoices`;
    if (elFwd) elFwd.innerText = `${fwdCount} Invoices`;
  },

  renderTable() {
    const tbody = document.getElementById('invoices-tbody');
    if (!tbody) return;

    const firmFilter = document.getElementById('firm-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('invoice-search')?.value || '').toLowerCase().trim();

    const filtered = this.allInvoices.filter(inv => {
      if (firmFilter !== 'ALL' && inv.firm !== firmFilter) return false;
      if (searchQuery) {
        const text = `${inv.invoiceNo} ${inv.partyName} ${inv.partyGstin} ${inv.firm}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No GST Invoices generated yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(inv => {
      const tripCount = inv.trips ? inv.trips.length : 0;
      const isRcm = inv.isRcm === 'Yes';

      return `
        <tr>
          <td class="font-monospace fw-bold text-primary">${inv.invoiceNo}</td>
          <td><span class="fw-semibold">${AppUI.formatDate(inv.invoiceDate)}</span></td>
          <td><span class="badge ${APP_CONFIG.firms[inv.firm]?.badgeClass || 'bg-secondary'}">${inv.firm}</span></td>
          <td class="fw-bold text-dark">${inv.partyName}</td>
          <td class="font-monospace small text-secondary">${inv.partyGstin || 'URP'}</td>
          <td class="text-center"><span class="badge bg-light text-dark border">${tripCount} LRs</span></td>
          <td>
            <span class="badge ${isRcm ? 'bg-info-subtle text-info' : 'bg-warning-subtle text-warning-emphasis'}">
              ${isRcm ? 'RCM (5% Recipient)' : 'Forward (12%)'}
            </span>
          </td>
          <td class="text-end fw-semibold text-dark">${AppUI.formatCurrency(inv.subTotal)}</td>
          <td class="text-end fw-bold text-success fs-6">${AppUI.formatCurrency(inv.grandTotal)}</td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary py-0 px-2" title="Print Invoice" onclick="GstInvoicesModule.previewInvoice('${inv.id}')">
                <i class="bi bi-printer"></i>
              </button>
              <button class="btn btn-outline-danger py-0 px-2" title="Delete Invoice" onclick="GstInvoicesModule.deleteInvoice('${inv.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openGenerateInvoiceModal() {
    const form = document.getElementById('form-generate-invoice');
    if (form) form.reset();

    const dateInput = document.getElementById('inv-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    const partySelect = document.getElementById('inv-party');
    if (partySelect) {
      partySelect.innerHTML = '<option value="">-- Choose Party --</option>' +
        this.allParties.map(p => `<option value="${p.id}">${p.name} (${p.gstin || 'URP'})</option>`).join('');
    }

    this.generateInvoiceNo();
    this.selectedTrips = [];
    document.getElementById('inv-available-trips-tbody').innerHTML = `
      <tr><td colspan="9" class="text-center py-3 text-muted">Select a party above to load billable dispatches.</td></tr>
    `;
    this.calculateTotals();

    const modal = new bootstrap.Modal(document.getElementById('modalGenerateInvoice'));
    modal.show();
  },

  generateInvoiceNo() {
    const firm = document.getElementById('inv-firm')?.value || 'TTC';
    const year = new Date().getFullYear();
    const count = (this.allInvoices.filter(i => i.firm === firm).length + 1).toString().padStart(4, '0');
    const invInput = document.getElementById('inv-number');
    if (invInput) {
      invInput.value = `INV-${year}-${firm}-${count}`;
    }
  },

  onPartySelected() {
    const partyId = document.getElementById('inv-party')?.value;
    const gstinInput = document.getElementById('inv-gstin');
    const tbody = document.getElementById('inv-available-trips-tbody');

    if (!partyId) {
      if (gstinInput) gstinInput.value = '';
      if (tbody) tbody.innerHTML = `<tr><td colspan="9" class="text-center py-3 text-muted">Select a party above to load billable dispatches.</td></tr>`;
      this.selectedTrips = [];
      this.calculateTotals();
      return;
    }

    const party = this.allParties.find(p => String(p.id) === String(partyId));
    if (party && gstinInput) {
      gstinInput.value = party.gstin || 'Unregistered Person (URP)';
    }

    const firm = document.getElementById('inv-firm')?.value || 'TTC';

    // Find available trips for this party under the selected firm
    const availableTrips = this.allTrips.filter(t => 
      (t.consignor === party.name || t.consignee === party.name) &&
      t.transport === firm
    );

    if (availableTrips.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-3 text-warning">No unbilled dispatches found for ${party.name} under ${firm}.</td></tr>`;
      this.selectedTrips = [];
      this.calculateTotals();
      return;
    }

    this.selectedTrips = [...availableTrips];

    tbody.innerHTML = availableTrips.map(t => `
      <tr>
        <td class="text-center">
          <input type="checkbox" class="form-check-input trip-checkbox" value="${t.id}" checked onchange="GstInvoicesModule.onTripCheckboxChange()">
        </td>
        <td class="font-monospace fw-bold text-primary small">${t.grNo}</td>
        <td>${AppUI.formatDate(t.tripStartDate)}</td>
        <td class="font-monospace small">${t.truckNo}</td>
        <td class="small">${t.origin} ➔ ${t.destination}</td>
        <td class="small text-truncate" style="max-width: 140px;">${t.material || 'Consignment'}</td>
        <td class="text-end small">${t.weight || '-'}</td>
        <td class="text-end small">${AppUI.formatCurrency(t.rate || 0)}</td>
        <td class="text-end fw-bold text-dark">${AppUI.formatCurrency(t.freight)}</td>
      </tr>
    `).join('');

    this.calculateTotals();
  },

  toggleSelectAllTrips(select) {
    const checkboxes = document.querySelectorAll('.trip-checkbox');
    checkboxes.forEach(cb => { cb.checked = select; });
    this.onTripCheckboxChange();
  },

  onTripCheckboxChange() {
    const checkedIds = Array.from(document.querySelectorAll('.trip-checkbox:checked')).map(cb => cb.value);
    this.selectedTrips = this.allTrips.filter(t => checkedIds.includes(t.id));
    this.calculateTotals();
  },

  calculateTotals() {
    const subTotal = this.selectedTrips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);
    const isRcm = document.getElementById('inv-rcm')?.value === 'Yes';
    
    let taxRate = 0;
    let taxAmount = 0;
    let grandTotal = subTotal;

    if (!isRcm) {
      taxRate = 12;
      taxAmount = (subTotal * 12) / 100;
      grandTotal = subTotal + taxAmount;
    }

    const elCount = document.getElementById('inv-summary-count');
    const elSub = document.getElementById('inv-summary-subtotal');
    const elTax = document.getElementById('inv-summary-tax');
    const elGrand = document.getElementById('inv-summary-grandtotal');

    if (elCount) elCount.innerText = `${this.selectedTrips.length} Bilties`;
    if (elSub) elSub.innerText = AppUI.formatCurrency(subTotal);
    if (elTax) {
      elTax.innerText = isRcm 
        ? `RCM @ 5% (${AppUI.formatCurrency((subTotal * 5) / 100)}) - Payable by Recipient` 
        : `Forward GST @ 12% (${AppUI.formatCurrency(taxAmount)})`;
    }
    if (elGrand) elGrand.innerText = AppUI.formatCurrency(grandTotal);
  },

  async saveInvoice(e) {
    e.preventDefault();
    if (this.selectedTrips.length === 0) {
      AppUI.showToast("Please select at least one Bilty/Trip for this invoice!", "danger");
      return;
    }

    const partyId = document.getElementById('inv-party').value;
    const party = this.allParties.find(p => String(p.id) === String(partyId));
    const invoiceNo = document.getElementById('inv-number').value;
    const firm = document.getElementById('inv-firm').value;
    const invoiceDate = document.getElementById('inv-date').value;
    const dueDate = document.getElementById('inv-due-date').value;
    const isRcm = document.getElementById('inv-rcm').value;

    const subTotal = this.selectedTrips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);
    const taxRate = isRcm === 'Yes' ? 0 : 12;
    const taxAmount = isRcm === 'Yes' ? 0 : (subTotal * 12) / 100;
    const grandTotal = subTotal + taxAmount;

    const invoiceData = {
      invoiceNo,
      firm,
      invoiceDate,
      dueDate,
      partyName: party.name,
      partyGstin: party.gstin || '',
      partyAddress: party.address || '',
      sacCode: "996511",
      isRcm,
      trips: this.selectedTrips.map(t => ({
        grNo: t.grNo,
        tripDate: t.tripStartDate,
        truckNo: t.truckNo,
        origin: t.origin,
        destination: t.destination,
        material: t.material,
        weight: t.weight,
        rate: t.rate,
        freight: t.freight
      })),
      subTotal,
      taxRate,
      taxAmount,
      grandTotal,
      status: "Generated"
    };

    await dbService.add('gstInvoices', invoiceData);

    const modalEl = document.getElementById('modalGenerateInvoice');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`GST Tax Invoice ${invoiceNo} generated successfully!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  previewInvoice(id) {
    const inv = this.allInvoices.find(i => String(i.id) === String(id));
    if (!inv) return;

    const container = document.getElementById('print-invoice-container');
    if (!container) return;

    const firmObj = APP_CONFIG.firms[inv.firm] || { name: "TTC Transport Corporation" };

    container.innerHTML = `
      <div class="p-4 bg-white border" style="max-width: 850px; margin: 0 auto; font-size: 0.9rem; color: #111;">
        
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <div>
            <h3 class="fw-bold text-primary mb-0">${firmObj.name.toUpperCase()}</h3>
            <div class="fw-semibold">GOODS TRANSPORT AGENCY (GTA)</div>
            <div class="text-muted small">Head Office: Shahpura & Rajsamand, Rajasthan | GSTIN: 08AAACT5512L1Z9</div>
            <div class="text-muted small">Mobile: 9414312586 / 9829241717 | Email: logistics@ttctransport.com</div>
          </div>
          <div class="text-end">
            <span class="badge bg-dark fs-6 px-3 py-2">TAX INVOICE</span>
            <div class="fw-bold font-monospace mt-1">${inv.invoiceNo}</div>
            <div class="small text-muted">Date: ${AppUI.formatDate(inv.invoiceDate)}</div>
          </div>
        </div>

        <!-- Bill To & Tax Info -->
        <div class="row g-3 mb-3 p-3 bg-light border rounded">
          <div class="col-7">
            <span class="text-uppercase small fw-bold text-muted d-block">Billed To (Client / Consignee):</span>
            <h6 class="fw-bold mb-1">${inv.partyName}</h6>
            <div class="small">${inv.partyAddress || 'Industrial Area'}</div>
            <div class="small"><strong>GSTIN:</strong> <span class="font-monospace">${inv.partyGstin || 'Unregistered'}</span></div>
          </div>
          <div class="col-5">
            <div class="small"><strong>Service Accounting Code (SAC):</strong> <span class="font-monospace">${inv.sacCode || '996511'}</span></div>
            <div class="small"><strong>Description:</strong> Goods Transport Agency (GTA) Services</div>
            <div class="small"><strong>Tax Payable Under RCM:</strong> <span class="badge ${inv.isRcm === 'Yes' ? 'bg-success' : 'bg-secondary'}">${inv.isRcm === 'Yes' ? 'YES (Recipient to Pay 5%)' : 'NO (Forward 12%)'}</span></div>
            ${inv.dueDate ? `<div class="small text-danger"><strong>Payment Due Date:</strong> ${AppUI.formatDate(inv.dueDate)}</div>` : ''}
          </div>
        </div>

        <!-- Tabular Consignment Annexure -->
        <div class="mb-3">
          <div class="fw-bold mb-2">Annexure of Consignment Bilties (LRs):</div>
          <table class="table table-bordered table-sm align-middle" style="font-size: 0.85rem;">
            <thead class="table-light text-center">
              <tr>
                <th>#</th>
                <th>G.R. No.</th>
                <th>Trip Date</th>
                <th>Truck No.</th>
                <th>Route</th>
                <th>Material</th>
                <th>Weight (MT)</th>
                <th>Rate (₹)</th>
                <th class="text-end">Freight (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${(inv.trips || []).map((t, idx) => `
                <tr>
                  <td class="text-center">${idx + 1}</td>
                  <td class="font-monospace fw-bold">${t.grNo}</td>
                  <td>${AppUI.formatDate(t.tripDate)}</td>
                  <td class="font-monospace">${t.truckNo}</td>
                  <td>${t.origin} to ${t.destination}</td>
                  <td>${t.material || 'Goods'}</td>
                  <td class="text-end">${t.weight || '-'}</td>
                  <td class="text-end">${AppUI.formatCurrency(t.rate || 0)}</td>
                  <td class="text-end fw-bold">${AppUI.formatCurrency(t.freight)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot class="table-light fw-bold">
              <tr>
                <td colspan="8" class="text-end">Total Taxable Freight Value:</td>
                <td class="text-end text-dark">${AppUI.formatCurrency(inv.subTotal)}</td>
              </tr>
              ${inv.isRcm === 'Yes' ? `
                <tr>
                  <td colspan="8" class="text-end text-muted small">GST @ 5% under Reverse Charge Mechanism (Paid by Recipient):</td>
                  <td class="text-end text-muted small">(${AppUI.formatCurrency((inv.subTotal * 5) / 100)})</td>
                </tr>
              ` : `
                <tr>
                  <td colspan="8" class="text-end">Forward GST @ 12%:</td>
                  <td class="text-end">${AppUI.formatCurrency(inv.taxAmount)}</td>
                </tr>
              `}
              <tr class="fs-6">
                <td colspan="8" class="text-end text-primary">Invoice Grand Total (Payable to Transporter):</td>
                <td class="text-end text-primary">${AppUI.formatCurrency(inv.grandTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Banking & Terms -->
        <div class="row g-3 pt-3 border-top">
          <div class="col-7">
            <div class="p-2 border rounded bg-light" style="font-size: 0.8rem;">
              <strong>Bank Details for NEFT / RTGS Transfer:</strong><br>
              Account Name: ${firmObj.name}<br>
              Bank: IDBI Bank, Shahpura Branch<br>
              Current A/c No: 0231102000008921 | IFSC: IBKL0000231
            </div>
          </div>
          <div class="col-5 text-center mt-4">
            <div class="border-top border-dark mx-auto" style="width: 140px; margin-bottom: 4px;"></div>
            <small class="fw-bold">For ${firmObj.name}</small><br>
            <small class="text-muted">Authorized Signatory</small>
          </div>
        </div>

      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('modalPrintInvoice'));
    modal.show();
  },

  async deleteInvoice(id) {
    if (!confirm("Are you sure you want to delete this GST Tax Invoice?")) return;
    await dbService.delete('gstInvoices', id);
    AppUI.showToast("GST Invoice deleted", "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => GstInvoicesModule.init());
