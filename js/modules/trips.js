/**
 * Trips Management Module
 * MTC & TTC Logistics Management System
 * Enhanced with 5,103 Real Excel Records, Smooth Pagination, Edit Bilty, and Exact A4 Print Preview
 */

const TripsModule = {
  currentFirmFilter: 'All',
  currentYearFilter: 'All',
  currentPage: 1,
  itemsPerPage: 50,
  allTrips: [],
  filteredTrips: [],
  activeTripForPrint: null,

  async init() {
    AppUI.renderSidebar('trips');
    await this.loadTrips();
    this.bindEvents();
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('search-trips');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Financial Year Filter
    const yearSelect = document.getElementById('filter-year');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.currentYearFilter = e.target.value;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Firm Filter Pills
    document.querySelectorAll('.filter-firm-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-firm-btn').forEach(b => b.classList.remove('active', 'btn-primary', 'text-white'));
        btn.classList.add('active', 'btn-primary', 'text-white');
        this.currentFirmFilter = btn.getAttribute('data-firm');
        this.currentPage = 1;
        this.applyFilters();
      });
    });

    // Items per page selector
    const perPageSelect = document.getElementById('items-per-page');
    if (perPageSelect) {
      perPageSelect.addEventListener('change', (e) => {
        this.itemsPerPage = parseInt(e.target.value, 10) || 50;
        this.currentPage = 1;
        this.renderTable();
      });
    }

    // WhatsApp button in print modal
    const waBtn = document.getElementById('btn-share-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', () => this.shareOnWhatsApp());
    }
  },

  async loadTrips() {
    this.allTrips = await dbService.getAll('trips');
    this.applyFilters();
  },

  applyFilters() {
    const q = (document.getElementById('search-trips')?.value || '').toLowerCase().trim();
    
    this.filteredTrips = this.allTrips.filter(t => {
      // Firm Filter
      if (this.currentFirmFilter !== 'All') {
        const firm = (t.transport || '').toUpperCase();
        if (firm !== this.currentFirmFilter.toUpperCase()) return false;
      }

      // Year Filter
      if (this.currentYearFilter !== 'All') {
        const yr = t.financialYear || '';
        if (yr !== this.currentYearFilter) return false;
      }

      // Search Query
      if (q) {
        const matchGr = (t.grNo && t.grNo.toLowerCase().includes(q)) || (t.shortGrNo && t.shortGrNo.toLowerCase().includes(q));
        const matchTruck = t.truckNo && t.truckNo.toLowerCase().includes(q);
        const matchDest = (t.destination && t.destination.toLowerCase().includes(q)) || (t.origin && t.origin.toLowerCase().includes(q));
        const matchParty = (t.consignee && t.consignee.toLowerCase().includes(q)) || (t.consignor && t.consignor.toLowerCase().includes(q));
        const matchBill = t.billNo && t.billNo.toLowerCase().includes(q);
        const matchAddr = t.deliveryAddress && t.deliveryAddress.toLowerCase().includes(q);
        if (!matchGr && !matchTruck && !matchDest && !matchParty && !matchBill && !matchAddr) {
          return false;
        }
      }

      return true;
    });

    this.updateSummary(this.filteredTrips);
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('trips-tbody');
    const paginationControls = document.getElementById('pagination-controls');
    const paginationInfo = document.getElementById('pagination-info');
    if (!tbody) return;

    const total = this.filteredTrips.length;
    if (total === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-5 text-muted">
            <i class="bi bi-truck fs-1 d-block mb-2 text-secondary"></i>
            No consignments found matching the current filters.
          </td>
        </tr>
      `;
      if (paginationControls) paginationControls.innerHTML = '';
      if (paginationInfo) paginationInfo.innerText = 'Showing 0 to 0 of 0 trips';
      return;
    }

    const totalPages = Math.ceil(total / this.itemsPerPage);
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, total);
    const pageItems = this.filteredTrips.slice(startIndex, endIndex);

    if (paginationInfo) {
      paginationInfo.innerText = `Showing ${startIndex + 1} to ${endIndex} of ${total.toLocaleString('en-IN')} trips (Page ${this.currentPage} of ${totalPages})`;
    }

    tbody.innerHTML = pageItems.map(t => {
      const firmClass = t.transport === 'MTC' ? 'firm-mtc' : t.transport === 'SMTC' ? 'firm-smtc' : 'firm-ttc';
      const statusClass = t.status === 'Due' ? 'due' : t.status === 'Transit' ? 'transit' : 'settled';

      const shortGrBadge = t.shortGrNo ? `<span class="badge bg-light text-dark border ms-1 font-monospace">${t.shortGrNo}</span>` : '';
      const billBadge = t.billNo ? `<div class="font-monospace small text-primary"><i class="bi bi-receipt me-1"></i>${t.billNo}</div>` : '';
      const fyBadge = t.financialYear ? `<span class="badge bg-secondary-subtle text-secondary small">${t.financialYear}</span>` : '';

      return `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-1">
              <span class="firm-pill ${firmClass}">${t.transport || 'TTC'}</span>
              ${shortGrBadge}
            </div>
            <div class="fw-bold font-monospace mt-1 text-dark">${t.grNo}</div>
            <small class="text-muted"><i class="bi bi-calendar3 me-1"></i>${AppUI.formatDate(t.tripStartDate)}</small>
          </td>
          <td>
            <div class="fw-bold font-monospace text-uppercase">${t.truckNo}</div>
            <small class="text-muted">${t.truckOwner || 'Fleet'}</small>
          </td>
          <td>
            <div><strong>${t.origin || 'Rajsamand'}</strong> ➔ <strong class="text-primary">${t.destination || '-'}</strong></div>
            ${t.deliveryAddress ? `<small class="text-muted d-block text-truncate" style="max-width: 200px;" title="${t.deliveryAddress}"><i class="bi bi-geo-alt"></i> ${t.deliveryAddress}</small>` : ''}
          </td>
          <td>
            ${billBadge}
            <div class="mt-1">${fyBadge}</div>
          </td>
          <td class="text-end">
            <div><strong>${t.weight ? Number(t.weight).toFixed(2) + ' MT' : '-'}</strong></div>
            <small class="text-muted">@ ₹${Number(t.rate || 0).toLocaleString('en-IN')}</small>
          </td>
          <td class="text-end fw-bold text-dark">
            ${AppUI.formatCurrency(t.freight || 0)}
          </td>
          <td class="text-end">
            ${t.loadingCharges ? `<div><small class="text-muted">Hamali:</small> ₹${Number(t.loadingCharges).toLocaleString('en-IN')}</div>` : ''}
            ${t.gstAmount ? `<div><small class="text-muted">GST:</small> ₹${Number(t.gstAmount).toLocaleString('en-IN')}</div>` : `<span class="badge bg-light text-muted border">RCM/Exempt</span>`}
          </td>
          <td class="text-end">
            <div class="${t.partyDue > 0 ? 'text-danger fw-bold' : 'text-success'}">Due: ${AppUI.formatCurrency(t.partyDue || 0)}</div>
            ${t.partyPaid > 0 ? `<small class="text-success d-block">Paid: ${AppUI.formatCurrency(t.partyPaid)}</small>` : ''}
          </td>
          <td>
            <span class="badge-status ${statusClass}">
              <i class="bi bi-circle-fill" style="font-size: 6px;"></i> ${t.status || 'Settled'}
            </span>
          </td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn-action" title="View Full Details" onclick="TripsModule.viewTripDetails('${t.id}')">
                <i class="bi bi-eye text-primary"></i>
              </button>
              <button class="btn-action" title="Edit Bilty" onclick="TripsModule.editTrip('${t.id}')">
                <i class="bi bi-pencil-square text-warning"></i>
              </button>
              <button class="btn-action" title="Print Official Bilty" onclick="TripsModule.printBilty('${t.id}')">
                <i class="bi bi-printer text-success"></i>
              </button>
              <button class="btn-action" title="Delete Trip" onclick="TripsModule.deleteTrip('${t.id}')">
                <i class="bi bi-trash text-danger"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.renderPagination(totalPages);
    AppUI.applyRolePermissions();
  },

  renderPagination(totalPages) {
    const controls = document.getElementById('pagination-controls');
    if (!controls) return;

    if (totalPages <= 1) {
      controls.innerHTML = `
        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">&laquo; Prev</a></li>
        <li class="page-item active"><a class="page-link" href="javascript:void(0)">1</a></li>
        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">Next &raquo;</a></li>
      `;
      return;
    }

    let html = '';

    // First button
    html += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(1)" title="First Page">&laquo;&laquo; First</a>
      </li>
    `;

    // Previous button
    html += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(${this.currentPage - 1})" title="Previous Page">&laquo; Prev</a>
      </li>
    `;

    // Page numbers with ellipsis
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(1)">1</a></li>`;
      if (startPage > 2) html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `
        <li class="page-item ${i === this.currentPage ? 'active' : ''}">
          <a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(${i})">${i}</a>
        </li>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(${totalPages})">${totalPages}</a></li>`;
    }

    // Next button
    html += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(${this.currentPage + 1})" title="Next Page">Next &raquo;</a>
      </li>
    `;

    // Last button
    html += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="TripsModule.goToPage(${totalPages})" title="Last Page">Last &raquo;&raquo;</a>
      </li>
    `;

    controls.innerHTML = html;
  },

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredTrips.length / this.itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    this.currentPage = page;
    this.renderTable();
    window.scrollTo({ top: 220, behavior: 'smooth' });
  },

  updateSummary(trips) {
    const totalTrips = trips.length;
    const totalFreight = trips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);
    const activeTrips = trips.filter(t => t.status === 'Transit' || t.status === 'Due').length;

    const countEl = document.getElementById('stat-total-trips');
    const freightEl = document.getElementById('stat-total-freight');
    const activeEl = document.getElementById('stat-active-trips');

    if (countEl) countEl.innerText = totalTrips.toLocaleString('en-IN');
    if (freightEl) freightEl.innerText = AppUI.formatCurrency(totalFreight);
    if (activeEl) activeEl.innerText = activeTrips.toLocaleString('en-IN');
  },

  editTrip(id) {
    // Redirect to bilty-booking.html with id query param
    window.location.href = `./bilty-booking.html?id=${encodeURIComponent(id)}`;
  },

  async viewTripDetails(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id)) || await dbService.getById('trips', id);
    if (!trip) return;

    const grandTotal = (Number(trip.freight) || 0) + (Number(trip.loadingCharges) || 0) + (Number(trip.haltCharges) || 0) + (trip.isGstPaidByParty === 'Yes' ? (Number(trip.gstAmount) || 0) : 0);

    const content = `
      <div class="row g-3">
        <!-- Firm, FY & GR No -->
        <div class="col-md-6 border-end">
          <label class="text-muted small">Full G.R. / Bilty Number:</label>
          <div class="fw-bold font-monospace fs-5 text-primary">${trip.grNo}</div>
          <div class="mt-1">
            <span class="badge bg-light text-dark border font-monospace">Short: ${trip.shortGrNo || '-'}</span>
            <span class="badge bg-secondary-subtle text-secondary ms-1">FY: ${trip.financialYear || '2026-2027'}</span>
            <span class="firm-pill firm-${(trip.transport || 'ttc').toLowerCase()} ms-1">${trip.transport}</span>
          </div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small">Party Bill / Invoice Number:</label>
          <div class="fw-bold font-monospace fs-6">${trip.billNo || '<span class="text-muted">Not Invoiced Yet</span>'}</div>
          <div class="small text-muted mt-1">Dispatch Date: <strong>${AppUI.formatDate(trip.tripStartDate)}</strong></div>
        </div>

        <!-- Truck & Driver -->
        <div class="col-12 p-2 bg-light rounded border">
          <div class="row g-2">
            <div class="col-md-4">
              <label class="text-muted small">Truck Registration:</label>
              <div class="fw-bold font-monospace fs-6 text-uppercase">${trip.truckNo}</div>
            </div>
            <div class="col-md-4">
              <label class="text-muted small">Truck Owner:</label>
              <div>${trip.truckOwner || 'Fleet Owner'}</div>
            </div>
            <div class="col-md-4">
              <label class="text-muted small">Driver & Contact:</label>
              <div>${trip.driver || '-'} ${trip.driverMobile ? `(${trip.driverMobile})` : ''}</div>
            </div>
          </div>
        </div>

        <!-- Route & Delivery Address -->
        <div class="col-md-6">
          <label class="text-muted small">Route (कहाँ से कहाँ तक):</label>
          <div><strong>${trip.origin || 'Rajsamand (Raj.)'}</strong> ➔ <strong class="text-primary">${trip.destination}</strong></div>
        </div>

        <div class="col-md-6">
          <label class="text-muted small">Consignee Delivery Address (डिलीवरी पता):</label>
          <div class="small text-dark bg-light p-2 rounded border">${trip.deliveryAddress || trip.destination || '-'}</div>
        </div>

        <!-- Consignor & Consignee -->
        <div class="col-md-6">
          <label class="text-muted small">Consignor (माल भेजने वाला):</label>
          <div class="fw-bold">${trip.consignor || 'MTC / TTC Consignor'}</div>
          <small class="text-muted">GSTIN: ${trip.consignorGstin || '-'}</small>
        </div>

        <div class="col-md-6">
          <label class="text-muted small">Consignee (माल पाने वाला):</label>
          <div class="fw-bold text-primary">${trip.consignee || trip.destination}</div>
          <small class="text-muted">GSTIN: ${trip.consigneeGstin || '-'}</small>
        </div>

        <!-- Financial Particulars -->
        <div class="col-12">
          <table class="table table-sm table-bordered mt-2">
            <thead class="table-light">
              <tr>
                <th>Weight</th>
                <th>Rate / MT</th>
                <th class="text-end">Freight Amount</th>
                <th class="text-end">Loading Charges</th>
                <th class="text-end">GST Amount</th>
                <th class="text-end">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="fw-bold">${trip.weight ? Number(trip.weight).toFixed(2) + ' MT' : '-'}</td>
                <td>₹${Number(trip.rate || 0).toLocaleString('en-IN')}</td>
                <td class="text-end fw-bold">${AppUI.formatCurrency(trip.freight || 0)}</td>
                <td class="text-end">₹${Number(trip.loadingCharges || 0).toLocaleString('en-IN')}</td>
                <td class="text-end">₹${Number(trip.gstAmount || 0).toLocaleString('en-IN')} <small class="text-muted">(${trip.isGstPaidByParty || 'RCM'})</small></td>
                <td class="text-end fw-bold text-success fs-6">${AppUI.formatCurrency(grandTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Due & Paid Status -->
        <div class="col-md-6">
          <div class="p-2 border rounded bg-light">
            <div class="d-flex justify-content-between">
              <span class="text-muted small">Party Paid:</span>
              <strong class="text-success">${AppUI.formatCurrency(trip.partyPaid || 0)}</strong>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <span class="text-muted small">Party Due Balance:</span>
              <strong class="${trip.partyDue > 0 ? 'text-danger' : 'text-success'}">${AppUI.formatCurrency(trip.partyDue || 0)}</strong>
            </div>
            ${trip.gstDueAmount ? `
            <div class="d-flex justify-content-between mt-1">
              <span class="text-muted small">GST Due:</span>
              <strong class="text-warning">₹${Number(trip.gstDueAmount).toLocaleString('en-IN')}</strong>
            </div>` : ''}
          </div>
        </div>

        <div class="col-md-6">
          <div class="p-2 border rounded bg-light">
            <div class="d-flex justify-content-between">
              <span class="text-muted small">Consignment Status:</span>
              <span class="badge-status ${trip.status === 'Due' ? 'due' : trip.status === 'Transit' ? 'transit' : 'settled'}">
                ${trip.status || 'Settled'}
              </span>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <span class="text-muted small">Owner Advance/Due:</span>
              <strong>${AppUI.formatCurrency(trip.ownerDue || 0)}</strong>
            </div>
          </div>
        </div>

      </div>
    `;

    document.getElementById('trip-detail-content').innerHTML = content;

    // Attach click handler to modal edit and print buttons
    const editBtn = document.getElementById('modal-btn-edit');
    const printBtn = document.getElementById('modal-btn-print');
    if (editBtn) editBtn.onclick = () => this.editTrip(trip.id);
    if (printBtn) printBtn.onclick = () => {
      bootstrap.Modal.getInstance(document.getElementById('tripDetailModal')).hide();
      this.printBilty(trip.id);
    };

    const modal = new bootstrap.Modal(document.getElementById('tripDetailModal'));
    modal.show();
  },

  async printBilty(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id)) || await dbService.getById('trips', id);
    if (!trip) return;

    this.activeTripForPrint = trip;

    // Company name
    let companyName = "TRIVENI TRANSPORT COMPANY";
    if (trip.transport === 'MTC') companyName = "MAHAVEER TRANSPORT COMPANY";
    else if (trip.transport === 'SMTC') companyName = "SHRI MAHAVEER TRANSPORT COMPANY";

    const grandTotal = (Number(trip.freight) || 0) + (Number(trip.loadingCharges) || 0) + (Number(trip.haltCharges) || 0) + (trip.isGstPaidByParty === 'Yes' ? (Number(trip.gstAmount) || 0) : 0);

    const formatInr = (num) => num ? `₹${Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00';

    const printPreviewEl = document.getElementById('trip-print-preview');
    if (!printPreviewEl) return;

    printPreviewEl.innerHTML = `
      <div class="bilty-official-doc">
        <!-- Top Strip -->
        <div class="bilty-top-strip">
          <div class="bilty-top-left">
            <div>Rajasthan GST Code: 08</div>
            <div>GSTIN: 08AUJPP4423D1ZP</div>
          </div>
          <div class="bilty-top-center">
            All Subject to RAJSAMAND Jurisdiction
          </div>
          <div class="bilty-top-right">
            <div>M. 9414659401, 9828330686</div>
            <div>9414312586, 9982230036</div>
            <div style="font-weight: normal; font-size: 10px;">mahaveer0236@gmail.com</div>
          </div>
        </div>

        <!-- Brand Banner Box -->
        <div class="bilty-brand-box">
          <div class="bilty-truck-graphic">
            <svg viewBox="0 0 64 40" width="70" height="45" fill="#111">
              <rect x="2" y="10" width="38" height="20" rx="2" fill="#2563eb"/>
              <path d="M40 16 L52 16 L58 24 L58 30 L40 30 Z" fill="#1d4ed8"/>
              <circle cx="12" cy="31" r="5" fill="#111"/>
              <circle cx="12" cy="31" r="2" fill="#fff"/>
              <circle cx="30" cy="31" r="5" fill="#111"/>
              <circle cx="30" cy="31" r="2" fill="#fff"/>
              <circle cx="50" cy="31" r="5" fill="#111"/>
              <circle cx="50" cy="31" r="2" fill="#fff"/>
              <rect x="44" y="18" width="8" height="5" fill="#93c5fd"/>
            </svg>
          </div>

          <div class="brand-title-box">
            <h2>${companyName}</h2>
            <div class="brand-subtitle">FLEET OWNERS, TRANSPORT CONTRACTORS & DELIVERY AGENT</div>
            <div class="brand-address">N.H. 8, Bhagwanda, Dist. Rajsamand (Raj.)-313326</div>
          </div>

          <div class="bilty-truck-graphic">
            <svg viewBox="0 0 64 40" width="70" height="45" fill="#111">
              <rect x="2" y="10" width="38" height="20" rx="2" fill="#10b981"/>
              <path d="M40 16 L52 16 L58 24 L58 30 L40 30 Z" fill="#047857"/>
              <circle cx="12" cy="31" r="5" fill="#111"/>
              <circle cx="12" cy="31" r="2" fill="#fff"/>
              <circle cx="30" cy="31" r="5" fill="#111"/>
              <circle cx="30" cy="31" r="2" fill="#fff"/>
              <circle cx="50" cy="31" r="5" fill="#111"/>
              <circle cx="50" cy="31" r="2" fill="#fff"/>
              <rect x="44" y="18" width="8" height="5" fill="#a7f3d0"/>
            </svg>
          </div>
        </div>

        <!-- Table Grid Section -->
        <table class="bilty-table-grid">
          <tr>
            <td style="width: 50%;">
              <span class="field-label">CONSIGNOR GSTIN</span>
              <span class="field-value font-monospace">${trip.consignorGstin || '08AAJFR3111N1Z1'}</span>
            </td>
            <td style="width: 25%;">
              <span class="field-label">TRUCK NO.:</span>
              <span class="field-value font-monospace fs-6">${trip.truckNo}</span>
            </td>
            <td style="width: 25%;">
              <span class="field-label">G.R. NO.:</span>
              <span class="field-value font-monospace fs-6">${trip.grSeq || trip.shortGrNo || trip.grNo}</span>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <span class="field-label">CONSIGNOR NAME & ADDRESS</span>
              <div class="field-value">${trip.consignor || 'R.B. Dyes and Chemicals M.I.A. Alwar (Raj.)'}</div>
              <div style="font-size: 10px; color: #333; margin-top: 2px;">Dispatch From: AMET, DIST.RAJSAMAND (RAJ.)-313330</div>
            </td>
            <td colspan="2">
              <span class="field-label">DATE:</span>
              <span class="field-value">${AppUI.formatDate(trip.tripStartDate)}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span class="field-label">FROM:</span>
              <span class="field-value">${trip.origin || 'Rajsamand (Raj.)'}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="field-label">CONSIGNEE NAME & ADDRESS</span>
              <div class="field-value">${trip.consignee}</div>
              <div style="font-size: 10px; color: #333; margin-top: 2px;">${trip.deliveryAddress || trip.destination}</div>
            </td>
            <td colspan="2" style="vertical-align: middle;">
              <span class="field-label">TO:</span>
              <span class="field-value fs-6 text-primary">${trip.destination}</span>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="field-label">CONSIGNEE GST No.:</span>
              <span class="field-value font-monospace">${trip.consigneeGstin || '06AAACH2676Q1Z4'}</span>
            </td>
          </tr>
        </table>

        <!-- Particulars & Weight Table -->
        <table class="bilty-table-grid" style="border-top: none;">
          <thead>
            <tr>
              <th style="width: 28%;">PERSON LIABLE FOR PAYING GST</th>
              <th style="width: 32%;">Material</th>
              <th style="width: 12%;">Weight<br>(Tonne)</th>
              <th style="width: 14%;">RATE<br>Per Tonne</th>
              <th style="width: 14%;">FREIGHT<br>To Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold; padding: 12px 4px;">
                ${trip.personLiableGst || 'Consignor/Consignee/Transporter'}
              </td>
              <td style="padding: 12px 6px;">
                <strong>${trip.material || 'Marble Powder'}</strong>
              </td>
              <td style="text-align: center; font-weight: bold; padding: 12px 4px;">
                ${trip.weight ? Number(trip.weight).toFixed(2) : '-'}
              </td>
              <td style="text-align: center; font-weight: bold; padding: 12px 4px;">
                ${trip.rate ? `₹${Number(trip.rate).toLocaleString('en-IN')}` : 'To be Billed'}
              </td>
              <td style="text-align: right; font-weight: bold; padding: 12px 6px;">
                ${trip.freight ? formatInr(trip.freight) : 'To be Billed'}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Bottom Split: Bank & Tax Calculation -->
        <div class="bilty-bottom-section">
          <div class="bilty-bottom-left">
            <div style="font-weight: bold; text-decoration: underline; margin-bottom: 2px;">Bank Details</div>
            <div>IDBI Bank, Rajsamand (Raj.)</div>
            <div>A/C No. <strong>104102000015659</strong></div>
            <div>IFSC: <strong>IBKL0000104</strong> | PAN: <strong>AUJPP4423D</strong></div>

            <table class="table table-sm table-bordered mb-0 mt-2" style="font-size: 10px; border: 1px solid #000;">
              <thead style="background: #f0f0f0;">
                <tr>
                  <th>E-way Bill No.</th>
                  <th>Bill No.</th>
                  <th class="text-end">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-monospace">${trip.ewayBillNo || '7516 5237 4578'}</td>
                  <td class="font-monospace">${trip.billNo || '2026-27/491'}</td>
                  <td class="text-end fw-bold">${trip.invoiceValue ? formatInr(trip.invoiceValue) : '₹222,600.00'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bilty-bottom-right">
            <table class="bilty-tax-table">
              <tr>
                <td class="tax-label">SGST@ 0.00%</td>
                <td class="tax-val">₹0.00</td>
              </tr>
              <tr>
                <td class="tax-label">CGST@ 0.00%</td>
                <td class="tax-val">₹0.00</td>
              </tr>
              <tr>
                <td class="tax-label">IGST@ 0.00%</td>
                <td class="tax-val">₹0.00</td>
              </tr>
              <tr>
                <td class="tax-label">Loading Charges</td>
                <td class="tax-val">${formatInr(trip.loadingCharges || 0)}</td>
              </tr>
              <tr>
                <td class="tax-label">Halt Charges</td>
                <td class="tax-val">${formatInr(trip.haltCharges || 0)}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td class="tax-label" style="font-size: 11px;">GRAND TOTAL</td>
                <td class="tax-val" style="font-size: 12px; color: #000;">${formatInr(grandTotal)}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Notes & Signature Strip -->
        <div class="bilty-footer-strip">
          <div class="bilty-notes">
            <div><strong>Note:</strong> 1. Rebooking Through H.O.</div>
            <div>2. Co. is not responsible for leakage, Breakage, Damage & any Loss.</div>
            <div>3. Co. is not responsible for damage & breakage of marble.</div>
          </div>
          <div class="bilty-signature-box">
            <div style="height: 35px;"></div>
            <div style="border-top: 1px solid #000; padding-top: 2px;">Booking Clerk</div>
          </div>
        </div>

        <!-- Daily Service Banner -->
        <div class="bilty-daily-service">
          Daily Service: Delhi, Himachal, Haryana, Punjab, U.P., Gujrat, Rajasthan, etc.
        </div>
      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('tripPrintModal'));
    modal.show();
  },

  shareOnWhatsApp() {
    if (!this.activeTripForPrint) return;
    const b = this.activeTripForPrint;
    const grandTotal = (Number(b.freight) || 0) + (Number(b.loadingCharges) || 0) + (Number(b.haltCharges) || 0) + (b.isGstPaidByParty === 'Yes' ? (Number(b.gstAmount) || 0) : 0);

    const msg = `*--- ${b.transport} TRANSPORT OFFICIAL BILTY ---*
*GR No:* ${b.grNo} (${b.shortGrNo || ''})
*Date:* ${AppUI.formatDate(b.tripStartDate)} | FY: ${b.financialYear || '2026-2027'}
${b.billNo ? `*Bill No:* ${b.billNo}\n` : ''}${b.ewayBillNo ? `*E-way Bill:* ${b.ewayBillNo}\n` : ''}*Truck:* ${b.truckNo}
*Driver:* ${b.driver || '-'} (${b.driverMobile || '-'})
*Route:* ${b.origin} ➔ ${b.destination}
${b.deliveryAddress ? `*Delivery Site:* ${b.deliveryAddress}\n` : ''}*Consignor:* ${b.consignor}
*Consignee:* ${b.consignee}
*Material:* ${b.material || 'Marble Powder'}
*Weight:* ${b.weight} MT @ ₹${b.rate}/MT
*Freight:* ${AppUI.formatCurrency(b.freight)}
${b.loadingCharges ? `*Loading Charges:* ${AppUI.formatCurrency(b.loadingCharges)}\n` : ''}${b.haltCharges ? `*Halt Charges:* ${AppUI.formatCurrency(b.haltCharges)}\n` : ''}*Grand Total:* ${AppUI.formatCurrency(grandTotal)}
*Status:* ${b.status}

_MTC & TTC Logistics Management System_`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  async deleteTrip(id) {
    if (confirm("Are you sure you want to delete this trip record?")) {
      await dbService.delete('trips', id);
      this.allTrips = this.allTrips.filter(t => String(t.id) !== String(id));
      AppUI.showToast("Trip deleted successfully!", "success");
      this.applyFilters();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => TripsModule.init());
