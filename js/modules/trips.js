/**
 * Trips & Bilty Management Module
 * MTC & TTC Logistics Management System
 * Designed to match AppSheet Bilty Register and Details View (Date-grouped, TTC/SMTC vs MTC tabs, 30-field sheet)
 */

const TripsModule = {
  currentFirmTab: 'TTC_SMTC', // 'TTC_SMTC', 'MTC', 'All'
  currentYearFilter: 'All',
  currentPage: 1,
  itemsPerPage: 50,
  allTrips: [],
  filteredTrips: [],
  currentDetailIndex: -1,
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

  setFirmTab(tab) {
    this.currentFirmTab = tab;

    // Update active tab buttons
    document.querySelectorAll('.appsheet-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (tab === 'TTC_SMTC') {
      document.getElementById('tab-ttc-smtc')?.classList.add('active');
    } else if (tab === 'MTC') {
      document.getElementById('tab-mtc')?.classList.add('active');
    } else {
      document.getElementById('tab-all')?.classList.add('active');
    }

    // Update search placeholder
    const searchInput = document.getElementById('search-trips');
    if (searchInput) {
      if (tab === 'TTC_SMTC') searchInput.placeholder = "Search TTC And SMTC...";
      else if (tab === 'MTC') searchInput.placeholder = "Search MTC...";
      else searchInput.placeholder = "Search All Bilties...";
    }

    this.currentPage = 1;
    this.applyFilters();
  },

  formatDateDMY(dateStr) {
    if (!dateStr) return '-';
    // If YYYY-MM-DD
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    // If M/D/YYYY
    const slashParts = String(dateStr).split('/');
    if (slashParts.length === 3) {
      const d = slashParts[1].padStart(2, '0');
      const m = slashParts[0].padStart(2, '0');
      const y = slashParts[2];
      return `${d}/${m}/${y}`;
    }
    return dateStr;
  },

  async loadTrips() {
    this.allTrips = await dbService.getAll('trips');
    const allCountEl = document.getElementById('tab-all-count');
    if (allCountEl) allCountEl.innerText = this.allTrips.length.toLocaleString('en-IN');
    this.applyFilters();
  },

  applyFilters() {
    const q = (document.getElementById('search-trips')?.value || '').toLowerCase().trim();
    
    this.filteredTrips = this.allTrips.filter(t => {
      // AppSheet Firm Tab Filter
      const firm = (t.transport || '').toUpperCase();
      if (this.currentFirmTab === 'TTC_SMTC') {
        if (firm !== 'TTC' && firm !== 'SMTC') return false;
      } else if (this.currentFirmTab === 'MTC') {
        if (firm !== 'MTC') return false;
      }

      // Year Filter
      if (this.currentYearFilter !== 'All') {
        const yr = t.financialYear || '';
        if (yr !== this.currentYearFilter) return false;
      }

      // Search Query
      if (q) {
        const matchGr = (t.grNo && t.grNo.toLowerCase().includes(q)) || (t.shortGrNo && t.shortGrNo.toLowerCase().includes(q)) || (t.grSeq && String(t.grSeq).toLowerCase().includes(q));
        const matchTruck = t.truckNo && t.truckNo.toLowerCase().includes(q);
        const matchDest = (t.destination && t.destination.toLowerCase().includes(q)) || (t.origin && t.origin.toLowerCase().includes(q));
        const matchParty = (t.reference && t.reference.toLowerCase().includes(q)) || (t.consignee && t.consignee.toLowerCase().includes(q)) || (t.consignor && t.consignor.toLowerCase().includes(q));
        const matchDriver = (t.driver && t.driver.toLowerCase().includes(q)) || (t.driverMobile && t.driverMobile.includes(q));
        const matchBill = t.billNo && t.billNo.toLowerCase().includes(q);
        const matchDate = t.tripStartDate && t.tripStartDate.includes(q);
        if (!matchGr && !matchTruck && !matchDest && !matchParty && !matchDriver && !matchBill && !matchDate) {
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
          <td colspan="7" class="text-center py-5 text-muted">
            <i class="bi bi-truck fs-1 d-block mb-2 text-secondary"></i>
            No bilties found matching the current search or filters.
          </td>
        </tr>
      `;
      if (paginationControls) paginationControls.innerHTML = '';
      if (paginationInfo) paginationInfo.innerText = 'Showing 0 to 0 of 0 bilties';
      return;
    }

    const totalPages = Math.ceil(total / this.itemsPerPage);
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, total);
    const pageItems = this.filteredTrips.slice(startIndex, endIndex);

    if (paginationInfo) {
      paginationInfo.innerText = `Showing ${startIndex + 1} to ${endIndex} of ${total.toLocaleString('en-IN')} bilties (Page ${this.currentPage} of ${totalPages})`;
    }

    // Group current page items by tripStartDate
    const dateGroups = [];
    let currentDateKey = null;
    let currentGroup = null;

    pageItems.forEach(t => {
      const d = t.tripStartDate || 'No Date';
      if (d !== currentDateKey) {
        currentDateKey = d;
        currentGroup = { date: d, items: [] };
        dateGroups.push(currentGroup);
      }
      currentGroup.items.push(t);
    });

    let html = '';

    dateGroups.forEach(group => {
      // Date Group Header Badge
      const countForDate = group.items.length;
      html += `
        <tr class="table-group-header">
          <td colspan="7" class="py-2 px-3 bg-light border-0">
            <span class="date-group-badge">
              <span class="dot-green"></span> ${this.formatDateDMY(group.date)} (${countForDate})
            </span>
          </td>
        </tr>
      `;

      // Rows for this date
      group.items.forEach(t => {
        const shortGr = t.shortGrNo || t.grSeq || t.grNo;
        const refText = t.reference || t.consignee || 'Consignor / Consignee';
        const driverText = t.driver || 'Assigned Driver';
        const driverMobile = t.driverMobile ? ` (${t.driverMobile})` : '';

        html += `
          <tr class="appsheet-row" onclick="TripsModule.viewTripDetails('${t.id}')">
            <td>
              <div class="d-flex align-items-center">
                <span class="dot-green"></span>
                <strong class="font-monospace text-dark">${shortGr}</strong>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <span class="dot-green"></span>
                <span class="font-monospace fw-semibold text-dark text-uppercase">${t.truckNo}</span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <span class="dot-green"></span>
                <span class="text-dark">${t.destination || '-'}</span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center text-truncate" style="max-width: 250px;" title="${refText}">
                <span class="dot-green"></span>
                <span class="text-secondary small text-truncate">${refText}</span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center text-truncate" style="max-width: 230px;" title="${driverText}${driverMobile}">
                <span class="dot-green"></span>
                <span class="text-secondary small text-truncate">${driverText}${driverMobile}</span>
              </div>
            </td>
            <td class="text-nowrap">
              <span class="text-dark small">${this.formatDateDMY(t.tripStartDate)}</span>
              <i class="bi bi-chevron-right text-muted ms-1" style="font-size: 0.75rem;"></i>
            </td>
            <td class="text-center" onclick="event.stopPropagation()">
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
                <button class="btn-action" title="Delete Bilty" onclick="TripsModule.deleteTrip('${t.id}')">
                  <i class="bi bi-trash text-danger"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
    this.renderPagination(totalPages);
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
    window.scrollTo({ top: 180, behavior: 'smooth' });
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
    window.location.href = `./bilty-booking.html?id=${encodeURIComponent(id)}`;
  },

  // AppSheet Exact Bilty Details Viewer
  async viewTripDetails(id) {
    this.currentDetailIndex = this.filteredTrips.findIndex(t => String(t.id) === String(id));
    const trip = (this.currentDetailIndex >= 0 ? this.filteredTrips[this.currentDetailIndex] : null) || 
                 this.allTrips.find(t => String(t.id) === String(id)) || 
                 await dbService.getById('trips', id);
    if (!trip) return;

    this.renderDetailContent(trip);

    const modalEl = document.getElementById('tripDetailModal');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
      modal = new bootstrap.Modal(modalEl);
    }
    modal.show();
  },

  navigateDetail(direction) {
    if (this.currentDetailIndex < 0) return;
    const newIdx = this.currentDetailIndex + direction;
    if (newIdx >= 0 && newIdx < this.filteredTrips.length) {
      this.currentDetailIndex = newIdx;
      this.renderDetailContent(this.filteredTrips[newIdx]);
    }
  },

  renderDetailContent(trip) {
    // Navigation button states
    const prevBtn = document.getElementById('nav-btn-prev');
    const nextBtn = document.getElementById('nav-btn-next');
    if (prevBtn) prevBtn.disabled = this.currentDetailIndex <= 0;
    if (nextBtn) nextBtn.disabled = this.currentDetailIndex >= this.filteredTrips.length - 1;

    // Attach footer buttons
    const editBtn = document.getElementById('modal-btn-edit');
    const printBtn = document.getElementById('modal-btn-print');
    const waBtn = document.getElementById('modal-btn-wa');
    if (editBtn) editBtn.onclick = () => this.editTrip(trip.id);
    if (printBtn) printBtn.onclick = () => {
      bootstrap.Modal.getInstance(document.getElementById('tripDetailModal'))?.hide();
      this.printBilty(trip.id);
    };
    if (waBtn) waBtn.onclick = () => this.shareOnWhatsApp(trip);

    // Build the exact 30-field AppSheet Bilty Details Card
    const loadType = trip.loadType || (Number(trip.weight || 0) > 40 ? 'Over Load' : 'Normal');
    const commissionVal = trip.commission !== undefined && trip.commission !== null ? Number(trip.commission) : 2000;
    const otherVal = Number(trip.loadingCharges || trip.otherCharges || 0);

    const content = `
      <div class="bilty-sheet-card">
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Lock for Edit</div>
          <div class="bilty-sheet-value"><span class="badge bg-success-subtle text-success">Unlocked</span></div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">G.R.No.</div>
          <div class="bilty-sheet-value font-monospace text-primary fw-bold">${trip.grNo}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Bilty Date</div>
          <div class="bilty-sheet-value">${this.formatDateDMY(trip.tripStartDate)}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Bilty Type</div>
          <div class="bilty-sheet-value">${trip.biltyType || 'Regular'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Truck No.</div>
          <div class="bilty-sheet-value font-monospace text-uppercase fw-bold">${trip.truckNo}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Truck Owner Name</div>
          <div class="bilty-sheet-value">${trip.truckOwner || 'Assigned Owner'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Load Type</div>
          <div class="bilty-sheet-value">${loadType}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Commission</div>
          <div class="bilty-sheet-value">
            ₹${commissionVal.toLocaleString('en-IN')}.00 
            <span class="text-muted mx-2">|</span> 
            <span class="badge bg-success-subtle text-success">Paid</span> 
            <span class="text-muted mx-2">|</span> 
            <span class="text-secondary small">Cash</span>
          </div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Other</div>
          <div class="bilty-sheet-value">
            ₹${otherVal.toLocaleString('en-IN')}.00 
            <span class="text-muted mx-2">|</span> 
            <span class="badge bg-success-subtle text-success">Paid</span> 
            <span class="text-muted mx-2">|</span> 
            <span class="text-secondary small">Cash</span>
          </div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Reference</div>
          <div class="bilty-sheet-value">${trip.reference || trip.consignee || '-'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Driver</div>
          <div class="bilty-sheet-value">${trip.driver || 'Assigned Driver'} ${trip.driverMobile ? `(${trip.driverMobile})` : ''}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">From</div>
          <div class="bilty-sheet-value">${trip.origin || 'Rajsamand (Raj.)'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">To</div>
          <div class="bilty-sheet-value text-primary fw-bold">${trip.destination || '-'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">GSTIN Consignor</div>
          <div class="bilty-sheet-value font-monospace">${trip.consignorGstin || '-'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Bill No.</div>
          <div class="bilty-sheet-value font-monospace">${trip.billNo || '-'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Bill Value</div>
          <div class="bilty-sheet-value">${trip.billValue ? AppUI.formatCurrency(trip.billValue) : '-'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Material</div>
          <div class="bilty-sheet-value">${trip.material || 'Marble Powder'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">GSTIN Consignee</div>
          <div class="bilty-sheet-value font-monospace">${trip.consigneeGstin || '-'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Actual Billing Type</div>
          <div class="bilty-sheet-value">${trip.billingType || 'Per Tonne'}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Actual Weight</div>
          <div class="bilty-sheet-value font-monospace fw-bold">${Number(trip.weight || 0).toFixed(3)}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Actual Rate</div>
          <div class="bilty-sheet-value">₹${Number(trip.rate || 0).toLocaleString('en-IN')}.00</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Freight</div>
          <div class="bilty-sheet-value fs-6 fw-bold text-success">₹${Number(trip.freight || 0).toLocaleString('en-IN')}.00</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Bilty Billing Type</div>
          <div class="bilty-sheet-value text-muted">To be Billed</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Bilty Weight</div>
          <div class="bilty-sheet-value font-monospace">${Number(trip.weight || 0).toFixed(3)}</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Rate Bilty</div>
          <div class="bilty-sheet-value text-muted">To be Billed</div>
        </div>
        <div class="bilty-sheet-row">
          <div class="bilty-sheet-label">Amount Bilty</div>
          <div class="bilty-sheet-value text-muted">To be Billed</div>
        </div>
      </div>
    `;

    document.getElementById('trip-detail-content').innerHTML = content;
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
