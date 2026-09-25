/**
 * Trips Financial Settlement & Audit Hub Module
 * MTC & TTC Logistics Management System
 * Dedicated VIP Dashboard for Mosa Ji & Management
 * Features 7 Audit Cards (4+3 balanced layout), Open/Settled tabs, Zero-Scroll Smart Table, and Owner Payment Installments
 */

const SettlementModule = {
  currentStatusTab: 'OPEN',    // 'OPEN', 'SETTLED', 'ALL'
  currentFirmTab: 'TTC_SMTC',  // 'TTC_SMTC', 'MTC', 'ALL'
  currentYearFilter: 'All',     // 'All', '2026-2027', '2025-2026', '2024-2025'
  currentPage: 1,
  itemsPerPage: 50,
  allTrips: [],
  allPayments: [],
  filteredTrips: [],
  currentDetailIndex: -1,
  activeTripForPrint: null,

  async init() {
    AppUI.renderSidebar('settlement');
    await this.loadData();
    this.bindEvents();
  },

  async loadData() {
    this.allTrips = await dbService.getAll('trips');
    this.allPayments = await dbService.getAll('payments');
    this.updateSummary();
    this.applyFilters();
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

  clearSearch() {
    const searchInput = document.getElementById('search-trips');
    if (searchInput) {
      searchInput.value = '';
    }
    this.currentPage = 1;
    this.applyFilters();
  },

  setYearFilter(fy) {
    this.currentYearFilter = fy;

    // Update pill buttons
    document.querySelectorAll('.fy-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-fy') === fy);
    });

    // Update active scope badge
    const scopeBadge = document.getElementById('active-fy-badge');
    if (scopeBadge) {
      scopeBadge.innerHTML = `<i class="bi bi-shield-check text-success me-1"></i> Active Audit Scope: <strong>${fy === 'All' ? 'All Financial Years' : 'FY ' + fy}</strong>`;
    }

    this.currentPage = 1;
    this.updateSummary();
    this.applyFilters();
  },

  setStatusTab(status) {
    this.currentStatusTab = status;

    // Update workflow buttons
    document.getElementById('wtab-open')?.classList.toggle('active', status === 'OPEN');
    document.getElementById('wtab-settled')?.classList.toggle('active', status === 'SETTLED');
    document.getElementById('wtab-all')?.classList.toggle('active', status === 'ALL');

    this.currentPage = 1;
    this.applyFilters();
  },

  setFirmTab(firm) {
    this.currentFirmTab = firm;

    // Update firm tab buttons
    document.querySelectorAll('.appsheet-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (firm === 'TTC_SMTC') {
      document.getElementById('tab-ttc-smtc')?.classList.add('active');
    } else if (firm === 'MTC') {
      document.getElementById('tab-mtc')?.classList.add('active');
    } else {
      document.getElementById('tab-firm-all')?.classList.add('active');
    }

    this.currentPage = 1;
    this.applyFilters();
  },

  isTripSettled(t) {
    if (t.status === 'Settled' || t.status === 'Closed') return true;
    const pDue = Number(t.partyDue) || 0;
    const oDue = Number(t.ownerDue) || 0;
    return pDue <= 0 && oDue <= 0;
  },

  isTripOpen(t) {
    return !this.isTripSettled(t);
  },

  formatDateDMY(dateStr) {
    if (!dateStr) return '-';
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const slashParts = String(dateStr).split('/');
    if (slashParts.length === 3) {
      const d = slashParts[1].padStart(2, '0');
      const m = slashParts[0].padStart(2, '0');
      const y = slashParts[2];
      return `${d}/${m}/${y}`;
    }
    return dateStr;
  },

  updateSummary() {
    const scopeTrips = this.currentYearFilter === 'All' 
      ? this.allTrips 
      : this.allTrips.filter(t => t.financialYear === this.currentYearFilter);

    // 1. Open Trips Due
    const openTrips = scopeTrips.filter(t => this.isTripOpen(t));
    const openDueTotal = openTrips.reduce((sum, t) => sum + (Number(t.partyDue) || 0), 0);

    // 2. Settled Trips Freight
    const settledTrips = scopeTrips.filter(t => this.isTripSettled(t));
    const settledFreightTotal = settledTrips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);

    // 3. Trips Volume Count
    const totalTripsCount = scopeTrips.length;

    // 4. Total Freight
    const totalFreight = scopeTrips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);

    // 5. GST Amount
    const gstTotal = scopeTrips.reduce((sum, t) => sum + (Number(t.gstAmount) || 0), 0);

    // 6. GST Count
    const gstCount = scopeTrips.filter(t => Number(t.gstAmount) > 0 || t.isGstPaidByParty === 'Yes').length;

    // 7. Rate Difference
    const rateDiffCount = scopeTrips.filter(t => Number(t.rateDiff || 0) !== 0).length;

    // Update 7 Metric Cards in DOM
    const openEl = document.getElementById('stat-open-due');
    const openCountEl = document.getElementById('stat-open-count');
    const settledEl = document.getElementById('stat-settled-freight');
    const settledCountEl = document.getElementById('stat-settled-count');
    const tripsEl = document.getElementById('stat-total-trips');
    const freightEl = document.getElementById('stat-total-freight');
    const gstAmtEl = document.getElementById('stat-gst-amt');
    const gstCntEl = document.getElementById('stat-gst-cnt');
    const rateDiffEl = document.getElementById('stat-rate-diff');

    if (openEl) openEl.innerText = AppUI.formatCurrency(openDueTotal);
    if (openCountEl) openCountEl.innerText = `${openTrips.length.toLocaleString('en-IN')} Unsettled Trips`;
    if (settledEl) settledEl.innerText = AppUI.formatCurrency(settledFreightTotal);
    if (settledCountEl) settledCountEl.innerText = `${settledTrips.length.toLocaleString('en-IN')} Reconciled Trips`;
    if (tripsEl) tripsEl.innerText = totalTripsCount.toLocaleString('en-IN');
    if (freightEl) freightEl.innerText = AppUI.formatCurrency(totalFreight);
    if (gstAmtEl) gstAmtEl.innerText = AppUI.formatCurrency(gstTotal);
    if (gstCntEl) gstCntEl.innerText = gstCount.toLocaleString('en-IN');
    if (rateDiffEl) rateDiffEl.innerText = rateDiffCount.toLocaleString('en-IN');

    // Update Counter Badges in Workflow Tabs
    const badgeOpen = document.getElementById('badge-count-open');
    const badgeSettled = document.getElementById('badge-count-settled');
    const badgeAll = document.getElementById('badge-count-all');
    if (badgeOpen) badgeOpen.innerText = openTrips.length.toLocaleString('en-IN');
    if (badgeSettled) badgeSettled.innerText = settledTrips.length.toLocaleString('en-IN');
    if (badgeAll) badgeAll.innerText = totalTripsCount.toLocaleString('en-IN');
  },

  applyFilters() {
    const q = (document.getElementById('search-trips')?.value || '').toLowerCase().trim();

    this.filteredTrips = this.allTrips.filter(t => {
      // 1. Status Filter (Open vs Settled vs All)
      if (this.currentStatusTab === 'OPEN') {
        if (!this.isTripOpen(t)) return false;
      } else if (this.currentStatusTab === 'SETTLED') {
        if (!this.isTripSettled(t)) return false;
      }

      // 2. Financial Year Filter
      if (this.currentYearFilter !== 'All') {
        if (t.financialYear !== this.currentYearFilter) return false;
      }

      // 3. Firm Filter (TTC & SMTC vs MTC vs All)
      const firm = (t.transport || '').toUpperCase();
      if (this.currentFirmTab === 'TTC_SMTC') {
        if (firm !== 'TTC' && firm !== 'SMTC') return false;
      } else if (this.currentFirmTab === 'MTC') {
        if (firm !== 'MTC') return false;
      }

      // 4. Multi-Keyword Search Query
      if (q) {
        const matchGr = (t.grNo && t.grNo.toLowerCase().includes(q)) || 
                        (t.shortGrNo && t.shortGrNo.toLowerCase().includes(q)) || 
                        (t.grSeq && String(t.grSeq).toLowerCase().includes(q));
        const matchTruck = t.truckNo && t.truckNo.toLowerCase().includes(q);
        const matchDest = (t.destination && t.destination.toLowerCase().includes(q)) || 
                          (t.origin && t.origin.toLowerCase().includes(q));
        const matchParty = (t.reference && t.reference.toLowerCase().includes(q)) || 
                           (t.consignee && t.consignee.toLowerCase().includes(q)) || 
                           (t.consignor && t.consignor.toLowerCase().includes(q));
        const matchDriver = (t.driver && t.driver.toLowerCase().includes(q)) || 
                            (t.driverMobile && t.driverMobile.includes(q));
        const matchBill = t.billNo && t.billNo.toLowerCase().includes(q);
        const matchDate = t.tripStartDate && t.tripStartDate.includes(q);

        if (!matchGr && !matchTruck && !matchDest && !matchParty && !matchDriver && !matchBill && !matchDate) {
          return false;
        }
      }

      return true;
    });

    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('settlement-tbody');
    const paginationControls = document.getElementById('pagination-controls');
    const paginationInfo = document.getElementById('pagination-info');
    if (!tbody) return;

    const total = this.filteredTrips.length;
    if (total === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-5 text-muted">
            <i class="bi bi-patch-check fs-1 d-block mb-2 text-secondary"></i>
            No audit records found matching the current criteria.
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
      paginationInfo.innerText = `Showing ${startIndex + 1} to ${endIndex} of ${total.toLocaleString('en-IN')} consignments (Page ${this.currentPage} of ${totalPages})`;
    }

    // Group page items by tripStartDate
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
      const countForDate = group.items.length;
      html += `
        <tr class="table-group-header">
          <td colspan="8" class="py-2 px-3 bg-light border-0">
            <span class="date-group-badge">
              <span class="dot-green"></span> ${this.formatDateDMY(group.date)} (${countForDate} Consignments)
            </span>
          </td>
        </tr>
      `;

      group.items.forEach(t => {
        const shortGr = t.shortGrNo || t.grSeq || t.grNo;
        const refText = t.reference || t.consignee || 'Consignor / Consignee';
        const partyDue = Number(t.partyDue) || 0;
        const ownerDue = Number(t.ownerDue) || 0;
        const weightVal = Number(t.weight || 0);
        const rateVal = Number(t.rate || 0);

        // Party Due Badge (Red)
        const partyDueHtml = partyDue > 0 
          ? `<span class="badge-party-due" title="Party Receivable: ₹${partyDue.toLocaleString('en-IN')}">₹${partyDue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>`
          : `<span class="badge-settled-zero">₹0.00</span>`;

        // Owner Due Badge (Green)
        const ownerDueHtml = ownerDue > 0
          ? `<span class="badge-owner-due" title="Owner Payable: ₹${ownerDue.toLocaleString('en-IN')}">₹${ownerDue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>`
          : `<span class="badge-settled-zero">₹0.00</span>`;

        html += `
          <tr class="appsheet-row" onclick="SettlementModule.viewTripDetails('${t.id}')">
            <!-- 1. G.R. & Truck (Smart Compact Cell) -->
            <td>
              <div class="smart-gr-block">
                <span class="smart-gr-title"><span class="dot-green"></span> ${shortGr}</span>
                <span class="smart-truck-sub">${t.truckNo}</span>
              </div>
            </td>

            <!-- 2. Route -->
            <td>
              <div class="smart-route-block" title="${t.destination || '-'}">
                <span class="smart-dest">${t.destination || '-'}</span>
                <span class="smart-origin">From: ${t.origin || 'Rajsamand'}</span>
              </div>
            </td>

            <!-- 3. Party / Consignee & Bill -->
            <td>
              <div class="smart-party-block" title="${refText}">
                <div class="smart-party-name">${refText}</div>
                <div class="smart-bill-sub">Bill: ${t.billNo ? t.billNo : '-'}</div>
              </div>
            </td>

            <!-- 4. Freight & Rate -->
            <td class="text-end">
              <div class="smart-freight-block">
                <span class="smart-freight-val">₹${Number(t.freight || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                <span class="smart-rate-sub">${weightVal.toFixed(2)} MT @ ₹${rateVal.toLocaleString('en-IN')}</span>
              </div>
            </td>

            <!-- 5. Party Due (RED) -->
            <td class="text-end">
              ${partyDueHtml}
            </td>

            <!-- 6. Owner Due (GREEN) -->
            <td class="text-end">
              ${ownerDueHtml}
            </td>

            <!-- 7. Date -->
            <td class="text-nowrap small text-secondary">
              ${this.formatDateDMY(t.tripStartDate)}
            </td>

            <!-- 8. Actions (Record Payment / Audit) -->
            <td class="text-center" onclick="event.stopPropagation()">
              <div class="d-flex justify-content-center gap-1">
                <button class="btn btn-sm btn-outline-success py-0 px-2 fw-semibold" title="Record Owner Payment" onclick="SettlementModule.openRecordPaymentModal('${t.id}')">
                  <i class="bi bi-cash-coin me-1"></i> Pay
                </button>
                <button class="btn btn-sm btn-outline-primary py-0 px-2" title="Inspect Full Audit" onclick="SettlementModule.viewTripDetails('${t.id}')">
                  <i class="bi bi-eye"></i>
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

    html += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(1)" title="First Page">&laquo;&laquo; First</a>
      </li>
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(${this.currentPage - 1})" title="Previous Page">&laquo; Prev</a>
      </li>
    `;

    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(1)">1</a></li>`;
      if (startPage > 2) html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `
        <li class="page-item ${i === this.currentPage ? 'active' : ''}">
          <a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(${i})">${i}</a>
        </li>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(${totalPages})">${totalPages}</a></li>`;
    }

    html += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(${this.currentPage + 1})" title="Next Page">Next &raquo;</a>
      </li>
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="javascript:void(0)" onclick="SettlementModule.goToPage(${totalPages})" title="Last Page">Last &raquo;&raquo;</a>
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

  // Spacious Extra-Large (XL) Audit Details Viewer
  async viewTripDetails(id) {
    this.currentDetailIndex = this.filteredTrips.findIndex(t => String(t.id) === String(id));
    const trip = (this.currentDetailIndex >= 0 ? this.filteredTrips[this.currentDetailIndex] : null) || 
                 this.allTrips.find(t => String(t.id) === String(id)) || 
                 await dbService.getById('trips', id);
    if (!trip) return;

    this.renderDetailContent(trip);

    const modalEl = document.getElementById('settlementDetailModal');
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
    const recordPayBtn = document.getElementById('modal-btn-record-pay');
    const printBtn = document.getElementById('modal-btn-print');
    const waBtn = document.getElementById('modal-btn-wa');
    if (recordPayBtn) recordPayBtn.onclick = () => this.openRecordPaymentModal(trip.id);
    if (printBtn) printBtn.onclick = () => {
      bootstrap.Modal.getInstance(document.getElementById('settlementDetailModal'))?.hide();
      this.printBilty(trip.id);
    };
    if (waBtn) waBtn.onclick = () => this.shareOnWhatsApp(trip);

    const isSettled = this.isTripSettled(trip);
    const partyDue = Number(trip.partyDue) || 0;
    const ownerDue = Number(trip.ownerDue) || 0;
    const totalFreight = Number(trip.freight) || 0;
    const commissionVal = trip.commission !== undefined && trip.commission !== null ? Number(trip.commission) : 2000;
    const ownerAgreedFreight = Math.max(0, totalFreight - commissionVal);
    const ownerPaidSoFar = Math.max(0, ownerAgreedFreight - ownerDue);

    // Fetch payments matching this trip's grNo
    const tripPayments = this.allPayments.filter(p => p.grNo === trip.grNo || p.grNo === trip.shortGrNo);
    const ownerPayments = tripPayments.filter(p => p.type === 'owner');

    let installmentRowsHtml = '';
    if (ownerPayments.length === 0) {
      installmentRowsHtml = `
        <tr>
          <td colspan="5" class="text-center py-3 text-muted">
            <i class="bi bi-clock-history me-1"></i> No individual truck owner payments logged yet.
          </td>
        </tr>
      `;
    } else {
      ownerPayments.forEach((p, idx) => {
        installmentRowsHtml += `
          <tr>
            <td class="font-monospace">${this.formatDateDMY(p.date)}</td>
            <td class="font-monospace fw-bold text-success">₹${Number(p.amount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
            <td><span class="payment-mode-badge">${p.mode || 'NEFT/RTGS'}</span></td>
            <td class="text-secondary">${p.bankAccount || p.refNo || '-'}</td>
            <td class="text-muted">${p.remarks || '-'}</td>
          </tr>
        `;
      });
    }

    const content = `
      <!-- Settlement Status Banner -->
      <div class="d-flex align-items-center justify-content-between p-3 rounded-3 mb-3 ${isSettled ? 'bg-success-subtle border border-success' : 'bg-danger-subtle border border-danger'}">
        <div class="d-flex align-items-center gap-3">
          <div class="fs-1 ${isSettled ? 'text-success' : 'text-danger'}">
            <i class="bi ${isSettled ? 'bi-patch-check-fill' : 'bi-exclamation-triangle-fill'}"></i>
          </div>
          <div>
            <h5 class="mb-0 fw-bold ${isSettled ? 'text-success' : 'text-danger'}">
              ${isSettled ? 'TRIP COMPLETED & SETTLED (100% RECONCILED)' : 'TRIP OPEN / UNSETTLED (PAYMENT PENDING)'}
            </h5>
            <div class="text-secondary small mt-1">
              G.R. No: <strong class="font-monospace text-dark">${trip.grNo}</strong> | 
              Truck: <strong class="font-monospace text-uppercase text-dark">${trip.truckNo}</strong> | 
              Dispatched: <strong>${this.formatDateDMY(trip.tripStartDate)}</strong>
            </div>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-primary fw-bold" onclick="SettlementModule.openRecordPaymentModal('${trip.id}')">
            <i class="bi bi-cash-coin me-1"></i> Record Owner Payment
          </button>
        </div>
      </div>

      <!-- 3 Roomy Columns Grid -->
      <div class="row g-3 mb-3">
        <!-- Card 1: Consignment Specs -->
        <div class="col-12 col-md-4">
          <div class="bilty-detail-modal-card">
            <h6><i class="bi bi-box-seam me-1 text-primary"></i> Consignment Specs</h6>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">G.R. No</span>
              <span class="bilty-sheet-value font-monospace text-primary fw-bold">${trip.shortGrNo || trip.grNo}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Truck No</span>
              <span class="bilty-sheet-value font-monospace text-uppercase fw-bold">${trip.truckNo}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Origin</span>
              <span class="bilty-sheet-value">${trip.origin || 'Rajsamand'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Destination</span>
              <span class="bilty-sheet-value text-primary fw-bold">${trip.destination || '-'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Weight</span>
              <span class="bilty-sheet-value font-monospace fw-bold">${Number(trip.weight || 0).toFixed(3)} MT</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Rate</span>
              <span class="bilty-sheet-value">₹${Number(trip.rate || 0).toLocaleString('en-IN')}.00</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Material</span>
              <span class="bilty-sheet-value">${trip.material || 'Marble Powder'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Bill No</span>
              <span class="bilty-sheet-value font-monospace">${trip.billNo || '-'}</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Parties & Driver -->
        <div class="col-12 col-md-4">
          <div class="bilty-detail-modal-card">
            <h6><i class="bi bi-people me-1 text-success"></i> Parties & Driver</h6>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Consignor</span>
              <span class="bilty-sheet-value small text-truncate" style="max-width: 170px;" title="${trip.consignor}">${trip.consignor || 'MTC & TTC Consignor'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Consignee</span>
              <span class="bilty-sheet-value fw-semibold text-truncate" style="max-width: 170px;" title="${trip.consignee}">${trip.consignee || '-'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Truck Owner</span>
              <span class="bilty-sheet-value fw-semibold">${trip.truckOwner || trip.truckNo + ' Owner'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Driver</span>
              <span class="bilty-sheet-value">${trip.driver || 'Assigned Driver'}</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Driver Phone</span>
              <span class="bilty-sheet-value">
                ${trip.driverMobile ? `
                  <a href="tel:${trip.driverMobile}" class="btn btn-outline-success btn-xs py-0 px-2 fw-bold">
                    <i class="bi bi-telephone-fill me-1"></i> ${trip.driverMobile}
                  </a>
                ` : '<span class="text-muted">Not provided</span>'}
              </span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Site Address</span>
              <span class="bilty-sheet-value small text-muted text-truncate" style="max-width: 170px;" title="${trip.deliveryAddress || ''}">
                ${trip.deliveryAddress || '-'}
              </span>
            </div>
          </div>
        </div>

        <!-- Card 3: Financial Reconcilation & Dues -->
        <div class="col-12 col-md-4">
          <div class="bilty-detail-modal-card">
            <h6><i class="bi bi-cash-stack me-1 text-warning"></i> Financial Reconcilation</h6>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Bilty Freight</span>
              <span class="bilty-sheet-value font-monospace fw-bold text-dark fs-6">₹${totalFreight.toLocaleString('en-IN')}.00</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Party Due (Receivable)</span>
              <span class="bilty-sheet-value">
                ${partyDue > 0 
                  ? `<span class="badge bg-danger-subtle text-danger fw-bold font-monospace">₹${partyDue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>` 
                  : `<span class="badge bg-success-subtle text-success fw-bold font-monospace">₹0.00 (Cleared)</span>`}
              </span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Owner Agreed Freight</span>
              <span class="bilty-sheet-value font-monospace">₹${ownerAgreedFreight.toLocaleString('en-IN')}.00</span>
            </div>
            <div class="bilty-sheet-row py-1">
              <span class="bilty-sheet-label">Owner Paid So Far</span>
              <span class="bilty-sheet-value font-monospace text-success fw-bold">₹${ownerPaidSoFar.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
            <div class="bilty-sheet-row py-1 border-top pt-2">
              <span class="bilty-sheet-label text-danger fw-bold">Owner Due (Payable)</span>
              <span class="bilty-sheet-value">
                ${ownerDue > 0 
                  ? `<span class="badge bg-danger text-white fw-bold font-monospace fs-6">₹${ownerDue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>` 
                  : `<span class="badge bg-success text-white fw-bold font-monospace fs-6">₹0.00 (Settled)</span>`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Truck Owner Payment Installments Sub-Table -->
      <div class="owner-payment-box shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6 class="mb-0 fw-bold text-dark"><i class="bi bi-clock-history me-1 text-primary"></i> Truck Owner Payment Installments (${ownerPayments.length})</h6>
          <button type="button" class="btn btn-sm btn-primary py-1 px-3 fw-bold" onclick="SettlementModule.openRecordPaymentModal('${trip.id}')">
            <i class="bi bi-plus-lg me-1"></i> Record Owner Payment
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-sm installment-table">
            <thead>
              <tr>
                <th style="width: 120px;">Payment Date</th>
                <th style="width: 140px;">Amount Paid</th>
                <th style="width: 140px;">Payment Mode</th>
                <th>Bank / Account</th>
                <th>Remarks / Notes</th>
              </tr>
            </thead>
            <tbody>
              ${installmentRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('settlement-detail-content').innerHTML = content;
  },

  openRecordPaymentModal(tripId) {
    const trip = this.allTrips.find(t => String(t.id) === String(tripId));
    if (!trip) return;

    document.getElementById('rop-trip-id').value = trip.id;
    document.getElementById('rop-gr-no').value = trip.grNo;
    document.getElementById('rop-firm').value = trip.transport || 'TTC';

    document.getElementById('rop-disp-gr').innerText = `${trip.grNo} (${trip.shortGrNo || ''})`;
    document.getElementById('rop-disp-truck').innerText = trip.truckNo;
    document.getElementById('rop-disp-owner').innerText = trip.truckOwner || trip.truckNo + ' Owner';
    
    const ownerDue = Number(trip.ownerDue) || 0;
    document.getElementById('rop-disp-due').innerText = `₹${ownerDue.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('rop-date').value = today;
    document.getElementById('rop-amount').value = ownerDue > 0 ? ownerDue : '';
    document.getElementById('rop-ref').value = '';
    document.getElementById('rop-remarks').value = '';

    const modalEl = document.getElementById('recordPaymentModal');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
      modal = new bootstrap.Modal(modalEl);
    }
    modal.show();
  },

  async handleSaveOwnerPayment(event) {
    event.preventDefault();

    const tripId = document.getElementById('rop-trip-id').value;
    const grNo = document.getElementById('rop-gr-no').value;
    const firm = document.getElementById('rop-firm').value;
    const date = document.getElementById('rop-date').value;
    const amount = parseFloat(document.getElementById('rop-amount').value) || 0;
    const mode = document.getElementById('rop-mode').value;
    const bankAccount = document.getElementById('rop-bank').value;
    const refNo = document.getElementById('rop-ref').value;
    const remarks = document.getElementById('rop-remarks').value;

    if (amount <= 0) {
      alert("Please enter a valid payment amount greater than ₹0.");
      return;
    }

    const tripIndex = this.allTrips.findIndex(t => String(t.id) === String(tripId));
    if (tripIndex === -1) return;

    const trip = this.allTrips[tripIndex];

    const paymentData = {
      type: 'owner',
      date: date,
      firm: firm,
      ownerName: trip.truckOwner || trip.truckNo + ' Owner',
      truckNo: trip.truckNo,
      grNo: grNo,
      stage: 'Balance Settlement',
      amount: amount,
      mode: mode,
      refNo: refNo || `VCH-${Date.now().toString().slice(-4)}`,
      bankAccount: bankAccount,
      remarks: remarks || `Settlement payment for G.R. ${grNo}`
    };

    const newPayment = await dbService.add('payments', paymentData);
    this.allPayments.unshift(newPayment);

    // Reduce trip ownerDue
    const currentOwnerDue = Number(trip.ownerDue) || 0;
    const newOwnerDue = Math.max(0, currentOwnerDue - amount);
    trip.ownerDue = newOwnerDue;

    const partyDue = Number(trip.partyDue) || 0;
    if (newOwnerDue <= 0 && partyDue <= 0) {
      trip.status = 'Settled';
    }

    await dbService.update('trips', trip.id, trip);
    this.allTrips[tripIndex] = trip;

    bootstrap.Modal.getInstance(document.getElementById('recordPaymentModal'))?.hide();

    if (this.currentDetailIndex >= 0) {
      this.renderDetailContent(trip);
    }

    this.updateSummary();
    this.applyFilters();

    AppUI.showToast(`₹${amount.toLocaleString('en-IN')} payment recorded successfully for ${trip.truckNo}!`, "success");
  },

  async printBilty(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id)) || await dbService.getById('trips', id);
    if (!trip) return;

    this.activeTripForPrint = trip;

    let companyName = "TRIVENI TRANSPORT COMPANY";
    if (trip.transport === 'MTC') companyName = "MAHAVEER TRANSPORT COMPANY";
    else if (trip.transport === 'SMTC') companyName = "SHRI MAHAVEER TRANSPORT COMPANY";

    const grandTotal = (Number(trip.freight) || 0) + (Number(trip.loadingCharges) || 0) + (Number(trip.haltCharges) || 0) + (trip.isGstPaidByParty === 'Yes' ? (Number(trip.gstAmount) || 0) : 0);
    const formatInr = (num) => num ? `₹${Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00';

    const printPreviewEl = document.getElementById('settlement-print-preview');
    if (!printPreviewEl) return;

    printPreviewEl.innerHTML = `
      <div class="bilty-official-doc">
        <!-- Sacred Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #b91c1c; padding-bottom: 4px; margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 800; color: #b91c1c;">॥ श्री गणेशाय नमः ॥</span>
          <span style="font-size: 12px; font-weight: 900; color: #b91c1c;">ॐ श्री महावीराय नमः</span>
          <span style="font-size: 11px; font-weight: 800; color: #b91c1c;">॥ शुभ लाभ ॥</span>
        </div>

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
          <div class="brand-title-box w-100 text-center">
            <h2 style="font-weight: 900; letter-spacing: 1px; color: #1e3a8a;">${companyName}</h2>
            <div class="brand-subtitle" style="font-size: 11px; font-weight: 700; color: #475569;">FLEET OWNERS, TRANSPORT CONTRACTORS & DELIVERY AGENT</div>
            <div class="brand-address" style="font-size: 11px; color: #64748b;">N.H. 8, Bhagwanda, Dist. Rajsamand (Raj.)-313326</div>
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
              <span class="field-value font-monospace fs-6 text-primary">${trip.grSeq || trip.shortGrNo || trip.grNo}</span>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <span class="field-label">CONSIGNOR NAME & ADDRESS</span>
              <div class="field-value fw-bold">${trip.consignor || 'MTC & TTC Logistics Consignor'}</div>
              <div style="font-size: 10px; color: #333; margin-top: 2px;">Dispatch From: AMET, DIST.RAJSAMAND (RAJ.)-313330</div>
            </td>
            <td colspan="2">
              <span class="field-label">DATE:</span>
              <span class="field-value">${this.formatDateDMY(trip.tripStartDate)}</span>
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
              <div class="field-value fw-bold">${trip.consignee}</div>
              <div style="font-size: 10px; color: #333; margin-top: 2px;">${trip.deliveryAddress || trip.destination}</div>
            </td>
            <td colspan="2" style="vertical-align: middle;">
              <span class="field-label">TO:</span>
              <span class="field-value fs-6 text-primary fw-bold">${trip.destination}</span>
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
                ${trip.weight ? Number(trip.weight).toFixed(3) : '-'}
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
                  <td class="text-end fw-bold">${trip.invoiceValue ? formatInr(trip.invoiceValue) : formatInr(grandTotal)}</td>
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
                <td class="tax-label" style="font-size: 11px; font-weight: bold;">GRAND TOTAL</td>
                <td class="tax-val" style="font-size: 12px; font-weight: bold; color: #000;">${formatInr(grandTotal)}</td>
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

    const modal = new bootstrap.Modal(document.getElementById('settlementPrintModal'));
    modal.show();
  },

  shareOnWhatsApp() {
    if (!this.activeTripForPrint) return;
    const b = this.activeTripForPrint;
    const grandTotal = (Number(b.freight) || 0) + (Number(b.loadingCharges) || 0) + (Number(b.haltCharges) || 0) + (b.isGstPaidByParty === 'Yes' ? (Number(b.gstAmount) || 0) : 0);

    const msg = `*--- ${b.transport} TRANSPORT OFFICIAL BILTY ---*
*GR No:* ${b.grNo} (${b.shortGrNo || ''})
*Date:* ${this.formatDateDMY(b.tripStartDate)} | FY: ${b.financialYear || '2026-2027'}
${b.billNo ? `*Bill No:* ${b.billNo}\n` : ''}*Truck:* ${b.truckNo}
*Driver:* ${b.driver || '-'} (${b.driverMobile || '-'})
*Route:* ${b.origin} ➔ ${b.destination}
*Consignor:* ${b.consignor}
*Consignee:* ${b.consignee}
*Material:* ${b.material || 'Marble Powder'}
*Weight:* ${b.weight} MT @ ₹${b.rate}/MT
*Freight:* ${AppUI.formatCurrency(b.freight)}
*Grand Total:* ${AppUI.formatCurrency(grandTotal)}
*Party Due:* ${AppUI.formatCurrency(b.partyDue || 0)}
*Owner Due:* ${AppUI.formatCurrency(b.ownerDue || 0)}
*Status:* ${b.status}

_MTC & TTC Logistics Management System_`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
};

document.addEventListener('DOMContentLoaded', () => SettlementModule.init());
