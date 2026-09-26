/**
 * Truck Owners Master Directory Module - MTC & TTC Logistics
 * Matches Google AppSheet UI (file0_top.png)
 * Total 586 Trucks & Owners (Header: 'Truck No. Number 586')
 */

const OwnersModule = {
  allOwners: [],
  allTrips: [],
  currentCategoryFilter: 'ALL',
  searchQuery: '',
  yearDueFilter: 'ALL',
  yearPaidFilter: 'ALL',

  async init() {
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('owners');
    }
    await this.loadData();
    this.updateStats();
    this.renderTable();
  },

  async loadData() {
    this.allOwners = await dbService.getAll('truckOwners');
    try {
      this.allTrips = await dbService.getAll('trips');
    } catch (e) {
      this.allTrips = [];
    }
  },

  updateStats() {
    const totalCount = this.allOwners.length;
    let ownFleetCount = 0;
    let duesCount = 0;
    let clearedCount = 0;
    let totalDue = 0;
    let totalPaid = 0;

    this.allOwners.forEach(o => {
      const due = Number(o.dueAmount) || 0;
      const paid = Number(o.paidAmount) || 0;
      totalDue += due;
      totalPaid += paid;

      if (o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'))) {
        ownFleetCount++;
      }
      if (due > 0) duesCount++;
      else clearedCount++;
    });

    const setElem = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text;
    };

    setElem('appsheet-header-count', String(totalCount));
    setElem('filter-all-count', String(totalCount));
    setElem('filter-dues-count', duesCount);
    setElem('filter-cleared-count', clearedCount);
  },

  setCategoryFilter(category, btnElement) {
    this.currentCategoryFilter = category;
    this.yearDueFilter = 'ALL';
    this.yearPaidFilter = 'ALL';

    if (btnElement) {
      document.querySelectorAll('.appsheet-pill').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  filterByDueYear(year) {
    this.yearDueFilter = year;
    this.currentCategoryFilter = 'DUES';
    this.renderTable();
  },

  filterByPaidYear(year) {
    this.yearPaidFilter = year;
    this.currentCategoryFilter = 'ALL';
    this.renderTable();
  },

  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('truck-owners-tbody');
    if (!tbody) return;

    let filtered = this.allOwners.filter(o => {
      const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
      const due = Number(o.dueAmount) || 0;

      if (this.currentCategoryFilter === 'SELF' && !isSelf) return false;
      if (this.currentCategoryFilter === 'DUES' && due <= 0) return false;
      if (this.currentCategoryFilter === 'CLEARED' && due > 0) return false;

      if (this.searchQuery) {
        const text = `${o.truckNo} ${o.name} ${o.mobile} ${o.mobile1}`.toLowerCase();
        if (!text.includes(this.searchQuery)) return false;
      }
      return true;
    });

    const showingText = document.getElementById('table-showing-text');
    if (showingText) {
      showingText.innerText = `Showing ${filtered.length} of ${this.allOwners.length} records`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No matching truck owners found.
          </td>
        </tr>
      `;
      return;
    }

    // Render up to 200 items smoothly
    const displayList = filtered.slice(0, 200);
    let html = '';

    displayList.forEach(o => {
      const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
      const due = Number(o.dueAmount) || 0;

      html += `
        <tr class="appsheet-row" onclick="OwnersModule.openDetailView('${o.id}')">
          <!-- 1. Truck No. -->
          <td>
            <div class="d-flex align-items-center gap-1">
              <span class="fw-bold font-monospace ${isSelf ? 'text-primary' : 'text-dark'}">${o.truckNo}</span>
              ${isSelf ? '<span class="badge bg-warning text-dark ms-1" style="font-size: 0.65rem;">Own 10</span>' : ''}
            </div>
            ${due > 0 ? `<small class="text-danger fw-semibold">भाड़ा बाकी: ${this.formatCurrency(due)}</small>` : ''}
          </td>

          <!-- 2. Name -->
          <td>
            <div class="fw-semibold text-dark text-truncate" style="max-width: 190px;" title="${o.name}">${o.name}</div>
          </td>

          <!-- 3. Mobile No. -->
          <td>
            <span class="font-monospace text-muted">${o.mobile || '-'}</span>
          </td>

          <!-- 4. Mobile No. 1 -->
          <td>
            <span class="font-monospace text-muted">${o.mobile1 || '-'}</span>
          </td>

          <!-- 5. Arrow -->
          <td class="text-end text-muted">
            <i class="bi bi-chevron-right small"></i>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  openDetailView(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId));
    if (!o) return;

    const modalBody = document.getElementById('owner-detail-body');
    const modalFooter = document.getElementById('owner-detail-footer');

    const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
    const due = Number(o.dueAmount) || 0;
    const paid = Number(o.paidAmount) || 0;

    const tripsList = Array.isArray(o.recentTrips) ? o.recentTrips : [];

    let tripsHtml = '';
    if (tripsList.length === 0) {
      tripsHtml = `
        <div class="text-center py-4 text-muted bg-light rounded border">
          <i class="bi bi-journal-text fs-4 d-block mb-1 text-secondary"></i>
          Trip records for this truck will display here as bills and bilties are dispatched.
        </div>
      `;
    } else {
      let rows = '';
      tripsList.forEach(tr => {
        rows += `
          <tr>
            <td><span class="badge bg-light text-dark border font-monospace">${tr.grNo || 'GR-Open'}</span></td>
            <td>${tr.tripStartDate || '-'}</td>
            <td>${tr.destination || 'Direct Delivery'}</td>
            <td>${tr.driver || 'Assigned Driver'}</td>
            <td class="text-end fw-bold ${tr.ownerDue > 0 ? 'text-danger' : 'text-success'}">${this.formatCurrency(tr.ownerDue || tr.freight || 0)}</td>
            <td class="text-center"><span class="badge bg-light text-dark border">${tr.status || 'Transit'}</span></td>
          </tr>
        `;
      });
      tripsHtml = `
        <div class="table-responsive border rounded" style="max-height: 250px;">
          <table class="table table-hover align-middle mb-0 small">
            <thead class="table-light sticky-top">
              <tr>
                <th>GR No.</th>
                <th>Date</th>
                <th>Destination</th>
                <th>Driver</th>
                <th class="text-end">Due / Freight</th>
                <th class="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <!-- AppSheet Detail Form -->
      <div class="row g-3">
        
        <div class="col-12 bg-light p-3 rounded border d-flex justify-content-between align-items-center">
          <div>
            <span class="text-muted small">Truck Registration Number</span>
            <div class="fw-bold font-monospace fs-4 text-dark">${o.truckNo}</div>
          </div>
          <div>
            ${isSelf ? '<span class="badge bg-warning text-dark px-3 py-2 fs-7"><i class="bi bi-star-fill me-1"></i> Own Fleet (VIP 10 Trucks)</span>' : '<span class="badge bg-secondary px-3 py-2 fs-7">Market Attached Truck</span>'}
          </div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Truck Owner Full Name</label>
          <div class="fw-bold fs-6 text-dark">${o.name}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Primary Contact Mobile</label>
          <div class="font-monospace fs-6">${o.mobile ? `<a href="tel:${o.mobile}" class="text-decoration-none text-dark"><i class="bi bi-telephone text-primary me-1"></i>${o.mobile}</a>` : 'Not Provided'}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Mobile No. 1 (WhatsApp / Secondary)</label>
          <div class="font-monospace fs-6">${o.mobile1 ? `<a href="https://wa.me/91${o.mobile1}" target="_blank" class="text-decoration-none text-success"><i class="bi bi-whatsapp me-1"></i>${o.mobile1}</a>` : 'None'}</div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small fw-semibold">Total Trips Recorded</label>
          <div class="fw-semibold text-dark">${o.totalTrips || 0} Trips</div>
        </div>

        <!-- Financial Summary Bar -->
        <div class="col-md-6">
          <div class="p-3 bg-light rounded border">
            <span class="text-muted small">Owner Paid (कुल भुगतान / जमा)</span>
            <div class="fw-bold text-success fs-5">${this.formatCurrency(paid)}</div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="p-3 ${due > 0 ? 'bg-danger-subtle border-danger' : 'bg-light'} rounded border">
            <span class="${due > 0 ? 'text-danger' : 'text-muted'} small">Owner Due (भाड़ा बाकी)</span>
            <div class="fw-bold ${due > 0 ? 'text-danger' : 'text-dark'} fs-5">${this.formatCurrency(due)}</div>
          </div>
        </div>

        <!-- Linked Trips Section -->
        <div class="col-12 mt-4">
          <h6 class="fw-bold text-dark mb-2"><i class="bi bi-clock-history me-1"></i> Linked Trips & Dues Ledger</h6>
          ${tripsHtml}
        </div>

      </div>
    `;

    modalFooter.innerHTML = `
      <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-sm btn-outline-dark" onclick="window.print()">
        <i class="bi bi-printer me-1"></i> Print
      </button>
      <button type="button" class="btn btn-sm btn-outline-primary" onclick="bootstrap.Modal.getInstance(document.getElementById('modalOwnerDetail')).hide(); OwnersModule.openEditModal('${o.id}')">
        <i class="bi bi-pencil me-1"></i> Edit
      </button>
      ${due > 0 ? `
        <button type="button" class="btn btn-sm btn-dark" onclick="bootstrap.Modal.getInstance(document.getElementById('modalOwnerDetail')).hide(); OwnersModule.openPayModal('${o.id}')">
          <i class="bi bi-cash me-1"></i> Pay Owner (₹${Number(due).toLocaleString('en-IN')})
        </button>
      ` : ''}
    `;

    new bootstrap.Modal(document.getElementById('modalOwnerDetail')).show();
  },

  openPayModal(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId));
    if (!o) return;

    document.getElementById('pay-owner-id').value = o.id;
    document.getElementById('pay-truck-no').innerText = o.truckNo;
    document.getElementById('pay-owner-name').innerText = `Owner: ${o.name}`;
    document.getElementById('pay-current-due').innerText = this.formatCurrency(o.dueAmount);
    document.getElementById('pay-amount').value = o.dueAmount || '';
    document.getElementById('pay-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('pay-ref').value = '';
    document.getElementById('pay-remarks').value = `Freight settlement for ${o.truckNo} (${o.name})`;

    new bootstrap.Modal(document.getElementById('modalPayOwner')).show();
  },

  async saveOwnerPayment(event) {
    event.preventDefault();
    const ownerId = document.getElementById('pay-owner-id').value;
    const amount = parseFloat(document.getElementById('pay-amount').value) || 0;
    const date = document.getElementById('pay-date').value;
    const mode = document.getElementById('pay-mode').value;
    const refNo = document.getElementById('pay-ref').value.trim();
    const remarks = document.getElementById('pay-remarks').value.trim();

    if (!ownerId || amount <= 0) {
      alert("Please specify a valid payment amount.");
      return;
    }

    await dbService.recordOwnerPayment(ownerId, {
      amount,
      date,
      mode,
      refNo,
      remarks
    });

    bootstrap.Modal.getInstance(document.getElementById('modalPayOwner')).hide();

    await this.loadData();
    this.updateStats();
    this.renderTable();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Recorded payment of ${this.formatCurrency(amount)} successfully!`, 'success');
    }
  },

  openAddModal() {
    const form = document.getElementById('owner-form');
    if (form) form.reset();
    document.getElementById('owner-id').value = '';
    document.getElementById('owner-modal-title').innerText = 'Add Truck Owner';
    new bootstrap.Modal(document.getElementById('ownerModal')).show();
  },

  openEditModal(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId));
    if (!o) return;

    document.getElementById('owner-id').value = o.id;
    document.getElementById('owner-truck-no').value = o.truckNo;
    document.getElementById('owner-name').value = o.name;
    document.getElementById('owner-type').value = o.type || 'Market';
    document.getElementById('owner-mobile').value = o.mobile || '';
    document.getElementById('owner-mobile1').value = o.mobile1 || '';
    document.getElementById('owner-due').value = o.dueAmount || 0;

    document.getElementById('owner-modal-title').innerText = `Edit: ${o.truckNo} - ${o.name}`;
    new bootstrap.Modal(document.getElementById('ownerModal')).show();
  },

  async saveOwner(event) {
    event.preventDefault();
    const id = document.getElementById('owner-id').value;
    const truckNo = document.getElementById('owner-truck-no').value.trim().toUpperCase();
    const name = document.getElementById('owner-name').value.trim();
    const type = document.getElementById('owner-type').value;
    const mobile = document.getElementById('owner-mobile').value.trim();
    const mobile1 = document.getElementById('owner-mobile1').value.trim();
    const dueAmount = parseFloat(document.getElementById('owner-due').value) || 0;

    if (!truckNo || !name || !mobile) {
      alert("Please fill all required fields.");
      return;
    }

    const ownerData = {
      truckNo,
      name,
      type,
      mobile,
      mobile1,
      dueAmount
    };

    if (id) {
      await dbService.update('truckOwners', id, ownerData);
    } else {
      ownerData.paidAmount = 0;
      ownerData.totalTrips = 0;
      ownerData.recentTrips = [];
      await dbService.add('truckOwners', ownerData);
    }

    bootstrap.Modal.getInstance(document.getElementById('ownerModal')).hide();

    await this.loadData();
    this.updateStats();
    this.renderTable();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Truck ${truckNo} (${name}) saved!`, 'success');
    }
  },

  exportCSV() {
    let csv = "Truck No.,Name,Mobile No.,Mobile No. 1,Owner Due (Rs),Owner Paid (Rs),Fleet Type\n";
    this.allOwners.forEach(o => {
      const name = (o.name || '').replace(/"/g, '""');
      csv += `"${o.truckNo}","${name}","${o.mobile || ''}","${o.mobile1 || ''}",${o.dueAmount || 0},${o.paidAmount || 0},"${o.type}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `AppSheet_Truck_Owners_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  formatCurrency(num) {
    return '₹ ' + Number(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  OwnersModule.init();
});
