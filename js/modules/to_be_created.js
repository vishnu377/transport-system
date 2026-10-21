/**
 * to_be_created.js - "To be Created" Module Implementation
 * Completely matching Google AppSheet authentic screens:
 *  - 3-Cards Dashboard (media_1792575375498_f5f668db.png)
 *  - Other B Due Main List View (screencapture-...-15_19_00.png)
 *  - Red Row: Open Trip Details (screencapture-...-15_19_53.png)
 *  - Gold Row: Open Trip Details (screencapture-...-15_37_07.png)
 *  - Blue Row: Open Trip Details (screencapture-...-15_46_09.png)
 *  - Pink Row: Open Trip Details (screencapture-...-15_43_51.png)
 *  - Trip Payment Details List & Card (15_20_42.png & 15_20_55.png)
 *  - Trip Other B Payment Details List & Card (15_37_27.png & 15_37_37.png)
 *  - Open Debts View (15_40_50.png / gold_full_top.png)
 *  - All Drawers: Consignee Payment, Other B Payment, Update Trip Details
 */

const ToBeCreatedModule = {
  viewMode: 'dashboard', // 'dashboard', 'due-list', 'trip-details', 'payment-list', 'payment-detail', 'other-b-payment-list', 'other-b-payment-detail', 'open-debts'
  activeYearFilter: 'ALL',
  activeDebtYearFilter: 'ALL',
  searchQuery: '',
  activeTrip: null,
  activePaymentIndex: 0,
  dueTrips: [],
  debtsData: [],

  summaryData: {
    due: {
      '2026-2027': 1032300.0,
      '2025-2026': 232770.0,
      'total': 1265070.0
    },
    paid: {
      '2026-2027': 4177700.0,
      '2025-2026': 5201950.0,
      '2024-2025': 934000.0,
      'total': 10313650.0
    },
    all: {
      '2026-2027': 264,
      '2025-2026': 341,
      '2024-2025': 280,
      'total': 885
    }
  },

  async init() {
    console.log('[ToBeCreatedModule] Initializing To be Created Module...');

    // Load data from window or Firestore
    if (typeof window !== 'undefined' && window.OTHER_B_DUE_DATA) {
      this.dueTrips = window.OTHER_B_DUE_DATA;
    }
    if (typeof window !== 'undefined' && window.OPEN_DEBTS_DATA) {
      this.debtsData = window.OPEN_DEBTS_DATA;
    }

    // Try sync with Firestore if available
    try {
      if (typeof dbService !== 'undefined' && dbService.getAll) {
        const firestoreOtherB = await dbService.getAll('other_b_due');
        if (firestoreOtherB && firestoreOtherB.length > 0) {
          this.dueTrips = firestoreOtherB;
        }
      }
    } catch (e) {
      console.warn('[ToBeCreatedModule] Using master dataset (Firestore offline/unavailable):', e);
    }

    this.renderDashboardBadges();

    // Check URL query parameters
    const urlParams = typeof window !== 'undefined' && window.location ? new URLSearchParams(window.location.search) : null;
    if (urlParams && urlParams.get('view') === 'due-list') {
      const year = urlParams.get('year') || 'ALL';
      this.openOtherBDueList(year);
    } else if (urlParams && urlParams.get('grNo')) {
      this.openTripDetails(urlParams.get('grNo'));
    } else {
      this.goToDashboardView();
    }
  },

  renderDashboardBadges() {
    // Card 1: Other B Due
    const elDue2026 = document.getElementById('badge-due-2026');
    if (elDue2026) elDue2026.innerText = `₹ ${Number(this.summaryData.due['2026-2027']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elDue2025 = document.getElementById('badge-due-2025');
    if (elDue2025) elDue2025.innerText = `₹ ${Number(this.summaryData.due['2025-2026']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Card 2: Other B Paid
    const elPaid2026 = document.getElementById('badge-paid-2026');
    if (elPaid2026) elPaid2026.innerText = `₹ ${Number(this.summaryData.paid['2026-2027']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elPaid2025 = document.getElementById('badge-paid-2025');
    if (elPaid2025) elPaid2025.innerText = `₹ ${Number(this.summaryData.paid['2025-2026']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elPaid2024 = document.getElementById('badge-paid-2024');
    if (elPaid2024) elPaid2024.innerText = `₹ ${Number(this.summaryData.paid['2024-2025']).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Card 3: All Other B (Counts)
    const elAll2026 = document.getElementById('badge-all-2026');
    if (elAll2026) elAll2026.innerText = String(this.summaryData.all['2026-2027']);

    const elAll2025 = document.getElementById('badge-all-2025');
    if (elAll2025) elAll2025.innerText = String(this.summaryData.all['2025-2026']);

    const elAll2024 = document.getElementById('badge-all-2024');
    if (elAll2024) elAll2024.innerText = String(this.summaryData.all['2024-2025']);
  },

  // ==========================================================
  // NAVIGATION & VIEW SWITCHING
  // ==========================================================
  goToDashboardView() {
    this.viewMode = 'dashboard';
    this.showView('tobe-dashboard-view');
    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', active: true }
    ]);
    this.setSearchPlaceholder('Search To be Created');
    this.setHeaderTools(`
      <i class="bi bi-grid" title="Switch View"></i>
    `);
  },

  openCardView(cardType, year = 'ALL') {
    if (cardType === 'due') {
      this.openOtherBDueList(year);
    } else if (cardType === 'paid') {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Selected Other B Paid (${year})`, 'info');
      }
    } else if (cardType === 'all') {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Selected All Other B (${year})`, 'info');
      }
    }
  },

  openOtherBDueList(year = 'ALL') {
    this.viewMode = 'due-list';
    this.activeYearFilter = year;
    this.showView('tobe-view-other-b-due-list');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', active: true }
    ]);

    this.setSearchPlaceholder('Search Other B Due');
    this.setHeaderTools(`
      <i class="bi bi-funnel" title="Filter" onclick="ToBeCreatedModule.toggleFilter()"></i>
      <i class="bi bi-check2-square" title="Select"></i>
    `);

    this.updateYearRailActive(year);
    this.renderDueTable();
  },

  updateYearRailActive(year) {
    const railAll = document.getElementById('rail-year-all');
    const rail2026 = document.getElementById('rail-year-2026');
    const rail2025 = document.getElementById('rail-year-2025');

    if (railAll && railAll.classList) {
      if (typeof railAll.classList.toggle === 'function') railAll.classList.toggle('active', year === 'ALL');
      else if (year === 'ALL') railAll.classList.add('active'); else railAll.classList.remove('active');
    }
    if (rail2026 && rail2026.classList) {
      if (typeof rail2026.classList.toggle === 'function') rail2026.classList.toggle('active', year === '2026-2027');
      else if (year === '2026-2027') rail2026.classList.add('active'); else rail2026.classList.remove('active');
    }
    if (rail2025 && rail2025.classList) {
      if (typeof rail2025.classList.toggle === 'function') rail2025.classList.toggle('active', year === '2025-2026');
      else if (year === '2025-2026') rail2025.classList.add('active'); else rail2025.classList.remove('active');
    }
  },

  filterByYear(year) {
    this.activeYearFilter = year;
    this.updateYearRailActive(year);
    this.renderDueTable();
  },

  // ==========================================================
  // RENDER OTHER B DUE TABLE WITH MULTI-COLOR ROWS & DATE GROUPS
  // Matching screencapture-...-15_19_00.png
  // ==========================================================
  renderDueTable() {
    const tbody = document.getElementById('tobe-due-table-body');
    if (!tbody) return;

    let trips = this.dueTrips || [];

    // Filter by year
    if (this.activeYearFilter !== 'ALL') {
      trips = trips.filter(t => t.year === this.activeYearFilter);
    }

    // Filter by search query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      trips = trips.filter(t => 
        (t.grNo && t.grNo.toLowerCase().includes(q)) ||
        (t.shortGr && t.shortGr.toLowerCase().includes(q)) ||
        (t.truckNo && t.truckNo.toLowerCase().includes(q)) ||
        (t.destination && t.destination.toLowerCase().includes(q)) ||
        (t.consignor && t.consignor.toLowerCase().includes(q)) ||
        (t.consignee && t.consignee.toLowerCase().includes(q)) ||
        (t.reference && t.reference.toLowerCase().includes(q)) ||
        (t.driver && t.driver.toLowerCase().includes(q)) ||
        (t.owner && t.owner.toLowerCase().includes(q))
      );
    }

    if (trips.length === 0) {
      tbody.innerHTML = `<tr><td colspan="12" class="text-center py-4 text-muted">No records found matching filter</td></tr>`;
      return;
    }

    // Group trips by dateGroup
    const dateGroups = {};
    trips.forEach(t => {
      const date = t.dateGroup || t.tripStartDate || 'Other';
      if (!dateGroups[date]) {
        dateGroups[date] = {
          date: date,
          totalDue: 0,
          trips: []
        };
      }
      dateGroups[date].trips.push(t);
      dateGroups[date].totalDue += Number(t.otherBDuePayment || 0);
    });

    let html = '';
    Object.keys(dateGroups).forEach(date => {
      const group = dateGroups[date];
      const formattedTotal = `₹ ${Number(group.totalDue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Date group header row
      html += `
        <tr class="tobe-date-group-header">
          <td colspan="12" class="py-1 px-3">
            <div class="d-flex align-items-center justify-content-between">
              <span class="d-flex align-items-center gap-2">
                <span style="color: var(--appsheet-red); font-size: 9px;">●</span>
                <span class="fw-bold">${group.date}</span>
              </span>
              <span class="tobe-badge-pill" style="font-size: 10px;">${formattedTotal}</span>
            </div>
          </td>
        </tr>
      `;

      // Data rows
      group.trips.forEach(t => {
        const colorClass = `row-color-${t.color || 'red'}`;
        const bulletColor = t.color === 'gold' ? 'var(--appsheet-gold-text)' :
                            t.color === 'pink' ? 'var(--appsheet-pink)' :
                            t.color === 'blue' ? 'var(--appsheet-blue)' : 'var(--appsheet-red)';

        const fmtDue = `₹ ${Number(t.otherBDuePayment || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const fmtOtherB = `₹ ${Number(t.otherB || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        html += `
          <tr class="tobe-data-row ${colorClass}" onclick="ToBeCreatedModule.openTripDetails('${t.grNo}')" title="Open ${t.grNo}">
            <td class="fw-bold"><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.shortGr || t.grNo}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.tripStartDate || ''}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.truckNo || ''}</td>
            <td class="fw-bold">${fmtDue}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${fmtOtherB}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.destination || ''}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.consignor || ''}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.consignee || ''}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.reference || ''}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.driver || ''}</td>
            <td><span class="bullet" style="color: ${bulletColor}; font-size: 9px; margin-right: 4px;">●</span>${t.owner || ''}</td>
            <td class="text-end text-muted"><i class="bi bi-chevron-right tobe-chevron"></i></td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  // ==========================================================
  // OPEN TRIP DETAILS VIEW (Cards based on color)
  // ==========================================================
  openTripDetails(grNo) {
    const trip = this.dueTrips.find(t => t.grNo === grNo || t.shortGr === grNo) || this.dueTrips[0];
    this.activeTrip = trip;
    this.viewMode = 'trip-details';
    this.showView('tobe-view-trip-details');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', onclick: `ToBeCreatedModule.openOtherBDueList('${this.activeYearFilter}')` },
      { label: 'Open Trip Details', active: true }
    ]);

    this.setSearchPlaceholder('Search Open Trip Details');
    this.setHeaderTools(`
      <i class="bi bi-truck text-dark" title="Trips"></i>
      <i class="bi bi-cash-coin text-dark" title="Open Debts" onclick="ToBeCreatedModule.openDebtsView()"></i>
      <button class="btn btn-sm btn-appsheet-gold" onclick="ToBeCreatedModule.openUpdateTripDrawer()">
        <i class="bi bi-pencil-square me-1"></i> Edit
      </button>
      <i class="bi bi-arrows-angle-expand" title="Fullscreen"></i>
    `);

    this.renderTripDetailsView(trip);
  },

  renderTripDetailsView(t) {
    const container = document.getElementById('tobe-trip-details-content');
    if (!container) return;

    if (t.color === 'pink') {
      container.innerHTML = this.renderPinkTripDetails(t);
    } else if (t.color === 'gold') {
      container.innerHTML = this.renderGoldTripDetails(t);
    } else if (t.color === 'blue') {
      container.innerHTML = this.renderBlueTripDetails(t);
    } else {
      container.innerHTML = this.renderRedTripDetails(t);
    }
  },

  // VARIATION A: RED ROW (Matching screencapture-...-15_19_53.png)
  renderRedTripDetails(t) {
    const payments = t.payments || [];
    const paymentRowsHtml = payments.map((p, idx) => `
      <tr onclick="ToBeCreatedModule.openPaymentDetail(${idx})" style="cursor: pointer;">
        <td><i class="bi bi-trash text-muted me-2" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${t.grNo}')"></i><i class="bi bi-pencil text-muted" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${t.grNo}')"></i></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.paymentDate}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">₹ ${Number(p.amountPaid).toFixed(2)}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.mode}</span></td>
        <td>${p.beneficiary || ''}</td>
      </tr>
    `).join('');

    return `
      <div class="tobe-details-grid-3">
        <!-- Card 1: Trip Info (Red) -->
        <div class="tobe-details-card">
          ${this.renderFieldRow('G.R.No.', t.grNo, 'red')}
          ${this.renderFieldRow('Truck No.', t.truckNo, 'red')}
          ${this.renderFieldRow('Trip Start Date', t.tripStartDate, 'red')}
          ${this.renderFieldRow('Trip End Date', t.tripEndDate, 'red')}
          ${this.renderFieldRow('Origin', t.origin, 'red')}
          ${this.renderFieldRow('Destination', t.destination, 'red')}
          ${this.renderFieldRow('Weight', Number(t.weight || 0).toFixed(3), 'red')}
          ${this.renderFieldRow('Rate', `₹${Number(t.rate || 0).toFixed(2)}`, 'red')}
          ${this.renderFieldRow('Material', t.material, 'red')}
          ${this.renderFieldRow('Reference', t.reference, 'red')}
          ${this.renderFieldRow('Reference Mobile No.', t.referenceMobile, 'red', true)}
          ${this.renderFieldRow('Driver', t.driver, 'red')}
          ${this.renderFieldRow('Driver Mobile No.', t.driverMobile, 'red', true)}
          ${this.renderFieldRow('Consignor', t.consignor, 'red')}
          ${this.renderFieldRow('Consignor Mobile No.', t.consignorMobile, 'red', true)}
          ${this.renderFieldRow('Owner', t.owner, 'red')}
          ${this.renderFieldRow('Owner Mobile No.', t.ownerMobile, 'red', true)}
          ${this.renderFieldRow('Freight', `₹${Number(t.freight || 0).toFixed(2)}`, 'red')}
          
          <div class="mt-3 pt-2 border-top">
            <div class="tobe-field-row align-items-center">
              <span class="tobe-field-label">Add Records for</span>
              <div class="tobe-field-value">
                <select class="form-select form-select-sm" style="max-width: 170px;">
                  <option selected>Party Payment</option>
                  <option>Other B</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Payment Table (Red Header, Green Values) -->
        <div class="tobe-details-card">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="tobe-bullet-red">●</span>
            <span class="fw-bold" style="color: var(--appsheet-red); font-size: 13.5px;">Payment</span>
            <span class="badge bg-secondary" style="font-size: 10px;">${payments.length}</span>
          </div>
          <div class="table-responsive">
            <table class="details-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Payment Date ↑</th>
                  <th>Amount Paid</th>
                  <th>Mode</th>
                  <th>Beneficiary</th>
                </tr>
              </thead>
              <tbody>
                ${paymentRowsHtml || '<tr><td colspan="5" class="text-muted text-center py-3">No payments recorded</td></tr>'}
              </tbody>
            </table>
          </div>
          <div class="card-footer-actions">
            <a onclick="ToBeCreatedModule.openPaymentListView()">Expand</a>
            <a onclick="ToBeCreatedModule.openConsigneePaymentDrawer()">Add</a>
          </div>
        </div>

        <!-- Card 3: Financials & Status (Red) -->
        <div class="tobe-details-card">
          ${this.renderFieldRow('Total Freight', `₹${Number(t.totalFreight || t.freight || 0).toFixed(2)}`, 'red')}
          ${this.renderFieldRow('Paid Amount', `₹${Number(t.paidAmount || 0).toFixed(2)}`, 'red')}
          ${this.renderFieldRow('Due Amount', `₹${Number(t.dueAmount || 0).toFixed(2)}`, 'green')}
          
          <div class="my-3 border-top pt-2">
            <div class="text-muted small fw-bold mb-1">Other B</div>
            <div class="text-muted small fw-bold mb-2">Status</div>
            <div class="mb-2">
              <label class="form-label small text-muted mb-1">Status *</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-white border-end-0">
                  <span class="tobe-bullet-red">●</span>
                </span>
                <select class="form-select form-select-sm border-start-0" style="color: var(--appsheet-red); font-weight: 600;">
                  <option selected>Other B Pending</option>
                  <option>Transit</option>
                  <option>Off Loading</option>
                  <option>Party Payment Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // VARIATION B: GOLD / SUN ROW (Matching screencapture-...-15_37_07.png)
  renderGoldTripDetails(t) {
    const otherBPayments = t.otherBPayments || [];
    const rowsHtml = otherBPayments.map((p, idx) => `
      <tr onclick="ToBeCreatedModule.openOtherBPaymentDetail(${idx})" style="cursor: pointer;">
        <td><i class="bi bi-pencil text-muted" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${t.grNo}')"></i></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.paymentDate}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">₹ ${Number(p.amountPaid).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.mode}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.description}</span></td>
      </tr>
    `).join('');

    return `
      <div class="tobe-details-grid-3">
        <!-- Card 1: Trip Info (Gold) -->
        <div class="tobe-details-card">
          ${this.renderFieldRow('G.R.No.', t.grNo, 'gold')}
          ${this.renderFieldRow('Truck No.', t.truckNo, 'gold')}
          ${this.renderFieldRow('Trip Start Date', t.tripStartDate, 'gold')}
          ${this.renderFieldRow('Trip End Date', t.tripEndDate, 'gold')}
          ${this.renderFieldRow('Origin', t.origin, 'gold')}
          ${this.renderFieldRow('Destination', t.destination, 'gold')}
          ${this.renderFieldRow('Weight', Number(t.weight || 0).toFixed(3), 'gold')}
          ${this.renderFieldRow('Rate', `₹${Number(t.rate || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
          ${this.renderFieldRow('Material', t.material, 'gold')}
          ${this.renderFieldRow('Reference', t.reference, 'gold')}
          ${this.renderFieldRow('Reference Mobile No.', t.referenceMobile, 'gold', true)}
          ${this.renderFieldRow('Driver', t.driver, 'gold')}
          ${this.renderFieldRow('Driver Mobile No.', t.driverMobile, 'gold', true)}
          ${t.driverMobile2 ? this.renderFieldRow('Driver Mobile No.', t.driverMobile2, 'gold', true) : ''}
          ${this.renderFieldRow('Consignor', t.consignor, 'gold')}
          ${this.renderFieldRow('Consignor Mobile No.', t.consignorMobile, 'gold', true)}
          ${this.renderFieldRow('Owner', t.owner, 'gold')}
          ${this.renderFieldRow('Owner Mobile No.', t.ownerMobile, 'gold', true)}
          ${t.ownerMobile2 ? this.renderFieldRow('Owner Mobile No.', t.ownerMobile2, 'gold', true) : ''}
          ${this.renderFieldRow('Freight', `₹${Number(t.freight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
          
          <div class="mt-3 pt-2 border-top">
            <div class="tobe-field-row align-items-center mb-2">
              <span class="tobe-field-label">Add Records for</span>
              <div class="tobe-field-value">
                <span class="badge bg-light text-dark border px-3 py-1">Other B</span>
              </div>
            </div>
            ${this.renderFieldRow('Total Freight', `₹${Number(t.totalFreight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
            <div class="fw-bold text-muted small my-1">Other B</div>
            ${this.renderFieldRow('Other B', `₹${Number(t.otherB || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
          </div>
        </div>

        <!-- Card 2: Other B Payment Table (Gold Header, Green Values) -->
        <div class="tobe-details-card">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="tobe-bullet-gold">●</span>
            <span class="fw-bold" style="color: var(--appsheet-gold-text); font-size: 13.5px;">Other B Payment</span>
            <span class="badge bg-secondary" style="font-size: 10px;">${otherBPayments.length}</span>
          </div>
          <div class="table-responsive">
            <table class="details-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Payment Date ↑</th>
                  <th>Amount Paid</th>
                  <th>Mode</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml || '<tr><td colspan="5" class="text-muted text-center py-3">No payments recorded</td></tr>'}
              </tbody>
            </table>
          </div>
          <div class="card-footer-actions">
            <a onclick="ToBeCreatedModule.openOtherBPaymentListView()">Expand</a>
            <a onclick="ToBeCreatedModule.openAddOtherBPaymentDrawer()">Add</a>
          </div>
        </div>

        <!-- Card 3: Totals & Status (Gold) -->
        <div class="tobe-details-card">
          ${this.renderFieldRow('Other B Total Payment', `₹${Number(t.otherBTotalPayment || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
          ${this.renderFieldRow('Other B Due Payment', `₹${Number(t.otherBDuePayment || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'red')}
          
          <div class="my-3 border-top pt-2">
            <div class="text-muted small fw-bold mb-2">Status</div>
            <div class="mb-2">
              <label class="form-label small text-muted mb-1">Status *</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-white border-end-0">
                  <span class="tobe-bullet-gold">●</span>
                </span>
                <select class="form-select form-select-sm border-start-0" style="color: var(--appsheet-gold-text); font-weight: 600;">
                  <option selected>Transit</option>
                  <option>Other B Pending</option>
                  <option>Off Loading</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // VARIATION C: LIGHT BLUE ROW (Matching screencapture-...-15_46_09.png)
  renderBlueTripDetails(t) {
    const payments = t.payments || [];
    const paymentRowsHtml = payments.map((p, idx) => `
      <tr onclick="ToBeCreatedModule.openPaymentDetail(${idx})" style="cursor: pointer;">
        <td><i class="bi bi-pencil text-muted" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${t.grNo}')"></i></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.paymentDate}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">₹ ${Number(p.amountPaid).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.mode}</span></td>
        <td>${p.beneficiary || ''}</td>
      </tr>
    `).join('');

    return `
      <div class="tobe-details-grid-3">
        <!-- Card 1: Trip Info (Blue) -->
        <div class="tobe-details-card">
          ${this.renderFieldRow('G.R.No.', t.grNo, 'blue')}
          ${this.renderFieldRow('Truck No.', t.truckNo, 'blue')}
          ${this.renderFieldRow('Trip Start Date', t.tripStartDate, 'blue')}
          ${this.renderFieldRow('Trip End Date', t.tripEndDate, 'blue')}
          ${this.renderFieldRow('Origin', t.origin, 'blue')}
          ${this.renderFieldRow('Destination', t.destination, 'blue')}
          ${this.renderFieldRow('Weight', Number(t.weight || 0).toFixed(3), 'blue')}
          ${this.renderFieldRow('Rate', `₹${Number(t.rate || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'blue')}
          ${this.renderFieldRow('Material', t.material, 'blue')}
          ${this.renderFieldRow('Reference', t.reference, 'blue')}
          ${this.renderFieldRow('Reference Mobile No.', t.referenceMobile, 'blue', true)}
          ${this.renderFieldRow('Driver', t.driver, 'blue')}
          ${this.renderFieldRow('Driver Mobile No.', t.driverMobile, 'blue', true)}
          ${this.renderFieldRow('Consignor', t.consignor, 'blue')}
          ${this.renderFieldRow('Consignor Mobile No.', t.consignorMobile, 'blue', true)}
          ${this.renderFieldRow('Owner', t.owner, 'blue')}
          ${this.renderFieldRow('Owner Mobile No.', t.ownerMobile, 'blue', true)}
          ${this.renderFieldRow('Freight', `₹${Number(t.freight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'blue')}
          
          <div class="mt-3 pt-2 border-top">
            <div class="tobe-field-row align-items-center">
              <span class="tobe-field-label">Add Records for</span>
              <div class="tobe-field-value">
                <span class="badge bg-light text-dark border px-3 py-1">Party Payment</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Payment Table (Blue Header, Green Values) -->
        <div class="tobe-details-card">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="tobe-bullet-blue">●</span>
            <span class="fw-bold" style="color: var(--appsheet-blue); font-size: 13.5px;">Payment</span>
            <span class="badge bg-secondary" style="font-size: 10px;">${payments.length}</span>
          </div>
          <div class="table-responsive">
            <table class="details-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Payment Date ↑</th>
                  <th>Amount Paid</th>
                  <th>Mode</th>
                  <th>Beneficiary</th>
                </tr>
              </thead>
              <tbody>
                ${paymentRowsHtml || '<tr><td colspan="5" class="text-muted text-center py-3">No payments recorded</td></tr>'}
              </tbody>
            </table>
          </div>
          <div class="card-footer-actions">
            <a onclick="ToBeCreatedModule.openPaymentListView()">Expand</a>
            <a onclick="ToBeCreatedModule.openConsigneePaymentDrawer()">Add</a>
          </div>
        </div>

        <!-- Card 3: Financials & Status (Blue & Red Due) -->
        <div class="tobe-details-card">
          ${this.renderFieldRow('Total Freight', `₹${Number(t.totalFreight || t.freight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'blue')}
          ${this.renderFieldRow('Paid Amount', `₹${Number(t.paidAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'blue')}
          ${this.renderFieldRow('Due Amount', `₹${Number(t.dueAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'red')}
          
          <div class="my-3 border-top pt-2">
            <div class="text-muted small fw-bold mb-1">Other B</div>
            <div class="text-muted small fw-bold mb-2">Status</div>
            <div class="mb-2">
              <label class="form-label small text-muted mb-1">Status *</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-white border-end-0">
                  <span class="tobe-bullet-blue">●</span>
                </span>
                <select class="form-select form-select-sm border-start-0" style="color: var(--appsheet-blue); font-weight: 600;">
                  <option selected>Party Payment Pending</option>
                  <option>Other B Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // VARIATION D: PINK ROW (Matching screencapture-...-15_43_51.png) - Single Center Card
  renderPinkTripDetails(t) {
    return `
      <div class="tobe-single-center-card">
        ${this.renderFieldRow('G.R.No.', t.grNo, 'pink')}
        ${this.renderFieldRow('Truck No.', t.truckNo, 'pink')}
        ${this.renderFieldRow('Trip Start Date', t.tripStartDate, 'pink')}
        ${this.renderFieldRow('Trip End Date', t.tripEndDate, 'pink')}
        ${this.renderFieldRow('Origin', t.origin, 'pink')}
        ${this.renderFieldRow('Destination', t.destination, 'pink')}
        ${this.renderFieldRow('Weight', Number(t.weight || 0).toFixed(3), 'pink')}
        ${this.renderFieldRow('Rate', `₹${Number(t.rate || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'pink')}
        ${this.renderFieldRow('Material', t.material, 'pink')}
        ${this.renderFieldRow('Reference', t.reference, 'pink')}
        ${this.renderFieldRow('Reference Mobile No.', t.referenceMobile, 'pink', true)}
        ${this.renderFieldRow('Driver', t.driver, 'pink')}
        ${this.renderFieldRow('Driver Mobile No.', t.driverMobile, 'pink', true)}
        ${this.renderFieldRow('Consignor', t.consignor, 'pink')}
        ${this.renderFieldRow('Consignor Mobile No.', t.consignorMobile, 'pink', true)}
        ${this.renderFieldRow('Owner', t.owner, 'pink')}
        ${this.renderFieldRow('Owner Mobile No.', t.ownerMobile, 'pink', true)}
        ${this.renderFieldRow('Freight', `₹${Number(t.freight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'pink')}
        
        <div class="my-3 border-top pt-2">
          <div class="tobe-field-row align-items-center mb-2">
            <span class="tobe-field-label">Add Records for</span>
            <div class="tobe-field-value">
              <select class="form-select form-select-sm" style="max-width: 220px;">
                <option selected></option>
                <option>Party Payment</option>
                <option>Other B</option>
              </select>
            </div>
          </div>
          ${this.renderFieldRow('Total Freight', `₹${Number(t.totalFreight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'pink')}
          
          <div class="fw-bold text-muted small my-2">Other B</div>
          <div class="fw-bold text-muted small mb-2">Status</div>
          
          <div class="mb-2">
            <label class="form-label small text-muted mb-1">Status *</label>
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-white border-end-0">
                <span class="tobe-bullet-pink">●</span>
              </span>
              <select class="form-select form-select-sm border-start-0" style="color: var(--appsheet-pink); font-weight: 600;">
                <option selected>Off Loading</option>
                <option>Transit</option>
                <option>Other B Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderFieldRow(label, value, color, hasPhone = false) {
    const bulletColor = color === 'gold' ? 'var(--appsheet-gold-text)' :
                        color === 'pink' ? 'var(--appsheet-pink)' :
                        color === 'blue' ? 'var(--appsheet-blue)' :
                        color === 'green' ? 'var(--appsheet-green)' : 'var(--appsheet-red)';
    const textColor = bulletColor;

    const phoneHtml = hasPhone && value ? `
      <a href="tel:${value}" class="phone-icon-btn ${color}" title="Call ${value}">
        <i class="bi bi-telephone-fill"></i>
      </a>
    ` : '';

    return `
      <div class="tobe-field-row">
        <span class="tobe-field-label">${label}</span>
        <div class="tobe-field-value" style="color: ${textColor};">
          <span style="color: ${bulletColor}; font-size: 9px;">●</span>
          <span>${value || '-'}</span>
          ${phoneHtml}
        </div>
      </div>
    `;
  },

  // ==========================================================
  // DRILLDOWN VIEW: TRIP PAYMENT DETAILS TABLE
  // Matching screencapture-...-15_20_42.png & 15_47_04.png
  // ==========================================================
  openPaymentListView() {
    this.viewMode = 'payment-list';
    this.showView('tobe-view-payment-list');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', onclick: `ToBeCreatedModule.openOtherBDueList('${this.activeYearFilter}')` },
      { label: 'Open Trip Details', onclick: `ToBeCreatedModule.openTripDetails('${this.activeTrip.grNo}')` },
      { label: 'Trip Payment Details', active: true }
    ]);

    this.setSearchPlaceholder('Search Trip Payment Details');
    this.setHeaderTools(`
      <i class="bi bi-funnel" title="Filter"></i>
      <i class="bi bi-check2-square" title="Select"></i>
    `);

    const tbody = document.getElementById('payment-list-table-body');
    if (!tbody || !this.activeTrip) return;

    const payments = this.activeTrip.payments || [];
    tbody.innerHTML = payments.map((p, idx) => `
      <tr onclick="ToBeCreatedModule.openPaymentDetail(${idx})" style="cursor: pointer;">
        <td>
          <i class="bi bi-trash text-muted me-2" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${this.activeTrip.grNo}')"></i>
          <i class="bi bi-pencil text-muted" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${this.activeTrip.grNo}')"></i>
        </td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.paymentDate}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">₹ ${Number(p.amountPaid).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.mode}</span></td>
        <td>${p.beneficiary || ''}</td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.description || ''}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.paidTo || 'Truck Owner'}</span></td>
        <td class="text-end"><i class="bi bi-chevron-right tobe-chevron"></i></td>
      </tr>
    `).join('') || `<tr><td colspan="8" class="text-center py-3 text-muted">No records</td></tr>`;
  },

  // Single Payment Detail Card (Matching 15_20_55.png & 15_47_16.png)
  openPaymentDetail(idx) {
    this.activePaymentIndex = idx;
    this.viewMode = 'payment-detail';
    this.showView('tobe-view-payment-detail');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', onclick: `ToBeCreatedModule.openOtherBDueList('${this.activeYearFilter}')` },
      { label: 'Open Trip Details', onclick: `ToBeCreatedModule.openTripDetails('${this.activeTrip.grNo}')` },
      { label: 'Trip Payment Details', onclick: "ToBeCreatedModule.openPaymentListView()" },
      { label: 'Details', active: true }
    ]);

    const card = document.getElementById('payment-detail-card-content');
    if (!card || !this.activeTrip) return;

    const p = (this.activeTrip.payments || [])[idx] || {};
    card.innerHTML = `
      ${this.renderFieldRow('Payment Date', p.paymentDate, 'green')}
      ${this.renderFieldRow('Paid To', p.paidTo || 'Truck Owner', 'green')}
      ${this.renderFieldRow('Mode', p.mode, 'green')}
      ${this.renderFieldRow('Amount Paid', `₹${Number(p.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'green')}
      ${this.renderFieldRow('Description', p.description, 'green')}
    `;
  },

  // ==========================================================
  // DRILLDOWN VIEW: TRIP OTHER B PAYMENT DETAILS TABLE
  // Matching screencapture-...-15_37_27.png
  // ==========================================================
  openOtherBPaymentListView() {
    this.viewMode = 'other-b-payment-list';
    this.showView('tobe-view-other-b-payment-list');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', onclick: `ToBeCreatedModule.openOtherBDueList('${this.activeYearFilter}')` },
      { label: 'Open Trip Details', onclick: `ToBeCreatedModule.openTripDetails('${this.activeTrip.grNo}')` },
      { label: 'Trip Other B Payment Details', active: true }
    ]);

    this.setSearchPlaceholder('Search Trip Other B Payment Details');
    this.setHeaderTools(`
      <i class="bi bi-funnel" title="Filter"></i>
      <i class="bi bi-check2-square" title="Select"></i>
    `);

    const tbody = document.getElementById('other-b-payment-list-table-body');
    if (!tbody || !this.activeTrip) return;

    const payments = this.activeTrip.otherBPayments || [];
    tbody.innerHTML = payments.map((p, idx) => `
      <tr onclick="ToBeCreatedModule.openOtherBPaymentDetail(${idx})" style="cursor: pointer;">
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.paymentDate}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">₹ ${Number(p.amountPaid).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.mode}</span></td>
        <td><span class="tobe-bullet-green">●</span> <span style="color: var(--appsheet-green); font-weight:600;">${p.description}</span></td>
        <td class="text-end"><i class="bi bi-chevron-right tobe-chevron"></i></td>
      </tr>
    `).join('') || `<tr><td colspan="5" class="text-center py-3 text-muted">No records</td></tr>`;
  },

  // Single Other B Payment Detail Card (Matching 15_37_37.png)
  openOtherBPaymentDetail(idx) {
    this.viewMode = 'other-b-payment-detail';
    this.showView('tobe-view-other-b-payment-detail');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', onclick: `ToBeCreatedModule.openOtherBDueList('${this.activeYearFilter}')` },
      { label: 'Open Trip Details', onclick: `ToBeCreatedModule.openTripDetails('${this.activeTrip.grNo}')` },
      { label: 'Trip Other B Payment Details', onclick: "ToBeCreatedModule.openOtherBPaymentListView()" },
      { label: 'Details', active: true }
    ]);

    const card = document.getElementById('other-b-payment-detail-card-content');
    if (!card || !this.activeTrip) return;

    const p = (this.activeTrip.otherBPayments || [])[idx] || {};
    card.innerHTML = `
      ${this.renderFieldRow('Payment Date', p.paymentDate, 'green')}
      ${this.renderFieldRow('Paid To', p.paidTo || 'Transporter', 'green')}
      ${this.renderFieldRow('Mode', p.mode, 'green')}
      ${this.renderFieldRow('Amount Paid', `₹${Number(p.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'green')}
      ${this.renderFieldRow('Beneficiary', p.beneficiary || 'TTC', 'green')}
      ${this.renderFieldRow('From Bank', p.fromBank || 'Other', 'green')}
      ${this.renderFieldRow('To Bank', p.toBank || 'IDBI', 'green')}
      ${this.renderFieldRow('Description', p.description, 'green')}
    `;
  },

  // ==========================================================
  // VIEW 8: OPEN DEBTS TABLE VIEW
  // Matching screencapture-...-15_40_50.png / gold_full_top.png
  // ==========================================================
  openDebtsView(year = 'ALL') {
    this.viewMode = 'open-debts';
    this.activeDebtYearFilter = year;
    this.showView('tobe-view-open-debts');

    this.setBreadcrumbs([
      { label: 'Home', url: '../index.html' },
      { label: 'To be Created', onclick: "ToBeCreatedModule.goToDashboardView()" },
      { label: 'Other B Due', onclick: `ToBeCreatedModule.openOtherBDueList('${this.activeYearFilter}')` },
      { label: 'Open Trip Details', onclick: `ToBeCreatedModule.openTripDetails('${this.activeTrip ? this.activeTrip.grNo : ""}')` },
      { label: 'Open Debts', active: true }
    ]);

    this.setSearchPlaceholder('Search Open Debts');
    this.setHeaderTools(`
      <i class="bi bi-funnel" title="Filter"></i>
    `);

    this.updateDebtYearRailActive(year);
    this.renderDebtsTable();
  },

  updateDebtYearRailActive(year) {
    const railAll = document.getElementById('debt-rail-all');
    const rail2026 = document.getElementById('debt-rail-2026');
    const rail2025 = document.getElementById('debt-rail-2025');

    if (railAll && railAll.classList) {
      if (typeof railAll.classList.toggle === 'function') railAll.classList.toggle('active', year === 'ALL');
      else if (year === 'ALL') railAll.classList.add('active'); else railAll.classList.remove('active');
    }
    if (rail2026 && rail2026.classList) {
      if (typeof rail2026.classList.toggle === 'function') rail2026.classList.toggle('active', year === '2026-2027');
      else if (year === '2026-2027') rail2026.classList.add('active'); else rail2026.classList.remove('active');
    }
    if (rail2025 && rail2025.classList) {
      if (typeof rail2025.classList.toggle === 'function') rail2025.classList.toggle('active', year === '2025-2026');
      else if (year === '2025-2026') rail2025.classList.add('active'); else rail2025.classList.remove('active');
    }
  },

  filterDebtsByYear(year) {
    this.activeDebtYearFilter = year;
    this.updateDebtYearRailActive(year);
    this.renderDebtsTable();
  },

  renderDebtsTable() {
    const tbody = document.getElementById('tobe-debts-table-body');
    if (!tbody) return;

    let debts = this.debtsData || [];
    if (this.activeDebtYearFilter !== 'ALL') {
      debts = debts.filter(d => d.year === this.activeDebtYearFilter);
    }

    if (debts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="12" class="text-center py-4 text-muted">No open debts found</td></tr>`;
      return;
    }

    // Group debts by dateGroup
    const dateGroups = {};
    debts.forEach(d => {
      const date = d.dateGroup || d.date || 'Other';
      if (!dateGroups[date]) {
        dateGroups[date] = { date: date, totalDue: 0, debts: [] };
      }
      dateGroups[date].debts.push(d);
      dateGroups[date].totalDue += Number(d.dueAmount || 0);
    });

    let html = '';
    Object.keys(dateGroups).forEach(date => {
      const group = dateGroups[date];
      const fmtTotal = `₹${Number(group.totalDue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      html += `
        <tr class="tobe-date-group-header">
          <td colspan="12" class="py-1 px-3">
            <div class="d-flex align-items-center gap-2">
              <span class="tobe-bullet-gold">●</span>
              <span class="fw-bold">${group.date}</span>
              <span class="tobe-badge-pill" style="font-size: 10px;">${fmtTotal}</span>
            </div>
          </td>
        </tr>
      `;

      group.debts.forEach(d => {
        html += `
          <tr class="tobe-data-row row-color-gold">
            <td><span class="tobe-bullet-gold">●</span>${d.grNo}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.truckNo}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.to}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.debtType}</td>
            <td style="color: var(--appsheet-red); font-weight: 600;"><span class="tobe-bullet-red">●</span>₹${Number(d.dueAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td><span class="tobe-bullet-gold">●</span>₹${Number(d.debtAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.debtMode}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.borrowerName}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.receiverName}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.description || ''}</td>
            <td><span class="tobe-bullet-gold">●</span>${d.date}</td>
            <td class="text-end text-muted"><i class="bi bi-chevron-right tobe-chevron"></i></td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = html;
  },

  // ==========================================================
  // DRAWERS & MODALS
  // ==========================================================
  openConsigneePaymentDrawer() {
    const trip = this.activeTrip;
    if (trip) {
      const dueInput = document.getElementById('cp-due');
      if (dueInput) dueInput.value = `₹ ${Number(trip.dueAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    const bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('consigneePaymentDrawer'));
    bsOffcanvas.show();
  },

  togglePaidTo(target) {
    const btnTrans = document.getElementById('cp-paidto-transporter');
    const btnOwner = document.getElementById('cp-paidto-owner');
    if (btnTrans && btnOwner) {
      btnTrans.classList.toggle('active', target === 'Transporter');
      btnOwner.classList.toggle('active', target === 'Truck Owner');
    }
  },

  async saveConsigneePayment() {
    const date = document.getElementById('cp-payment-date').value;
    const amount = parseFloat(document.getElementById('cp-amount-paid').value) || 0;
    const mode = document.getElementById('cp-mode').value;
    const desc = document.getElementById('cp-description').value;
    const isTrans = document.getElementById('cp-paidto-transporter').classList.contains('active');
    const paidTo = isTrans ? 'Transporter' : 'Truck Owner';

    if (!this.activeTrip.payments) this.activeTrip.payments = [];
    this.activeTrip.payments.push({
      paymentDate: date,
      amountPaid: amount,
      mode: mode,
      description: desc,
      paidTo: paidTo,
      beneficiary: ''
    });

    // Update financial calculations
    this.activeTrip.paidAmount = (Number(this.activeTrip.paidAmount) || 0) + amount;
    this.activeTrip.dueAmount = Math.max(0, (Number(this.activeTrip.totalFreight || this.activeTrip.freight) || 0) - this.activeTrip.paidAmount);

    // Sync with Firestore if dbService exists
    try {
      if (typeof dbService !== 'undefined' && dbService.update) {
        await dbService.update('other_b_due', this.activeTrip.grNo, this.activeTrip);
      }
    } catch (e) {
      console.warn('[ToBeCreatedModule] Firestore sync failed:', e);
    }

    const drawerEl = document.getElementById('consigneePaymentDrawer');
    const instance = bootstrap.Offcanvas.getInstance(drawerEl);
    if (instance) instance.hide();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Payment saved successfully!', 'success');
    }

    // Refresh view
    if (this.viewMode === 'payment-list') this.openPaymentListView();
    else this.renderTripDetailsView(this.activeTrip);
  },

  openAddOtherBPaymentDrawer() {
    const trip = this.activeTrip;
    if (trip) {
      const dueInput = document.getElementById('ob-due');
      if (dueInput) dueInput.value = `₹ ${Number(trip.otherBDuePayment || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    const bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('addOtherBPaymentDrawer'));
    bsOffcanvas.show();
  },

  async saveOtherBPayment() {
    const date = document.getElementById('ob-payment-date').value;
    const amount = parseFloat(document.getElementById('ob-amount-paid').value) || 0;
    const mode = document.getElementById('ob-mode').value;
    const desc = document.getElementById('ob-description').value;

    if (!this.activeTrip.otherBPayments) this.activeTrip.otherBPayments = [];
    this.activeTrip.otherBPayments.push({
      paymentDate: date,
      amountPaid: amount,
      mode: mode,
      description: desc,
      beneficiary: 'TTC',
      fromBank: 'Other',
      toBank: 'IDBI',
      paidTo: 'Transporter'
    });

    this.activeTrip.otherBTotalPayment = (Number(this.activeTrip.otherBTotalPayment) || 0) + amount;
    this.activeTrip.otherBDuePayment = Math.max(0, (Number(this.activeTrip.otherB) || 0) - this.activeTrip.otherBTotalPayment);

    // Sync with Firestore
    try {
      if (typeof dbService !== 'undefined' && dbService.update) {
        await dbService.update('other_b_due', this.activeTrip.grNo, this.activeTrip);
      }
    } catch (e) {
      console.warn('[ToBeCreatedModule] Firestore sync failed:', e);
    }

    const drawerEl = document.getElementById('addOtherBPaymentDrawer');
    const instance = bootstrap.Offcanvas.getInstance(drawerEl);
    if (instance) instance.hide();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Other B Payment recorded successfully!', 'success');
    }

    if (this.viewMode === 'other-b-payment-list') this.openOtherBPaymentListView();
    else this.renderTripDetailsView(this.activeTrip);
  },

  openUpdateTripDrawer() {
    const t = this.activeTrip;
    if (!t) return;

    document.getElementById('ut-grno').value = t.grNo || '';
    document.getElementById('ut-rate').value = t.rate || '';
    document.getElementById('ut-weight').value = t.weight || '';
    document.getElementById('ut-freight').value = `₹ ${Number(t.freight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('ut-hault').value = t.haultCharges || 0;
    document.getElementById('ut-loading').value = t.loadingCharges || 0;
    document.getElementById('ut-otherb').value = t.otherB || 0;
    document.getElementById('ut-reference').value = t.reference || '';
    document.getElementById('ut-ref-mobile').value = t.referenceMobile || '';
    document.getElementById('ut-driver').value = t.driver || '';
    document.getElementById('ut-driver-mobile').value = t.driverMobile || '';
    document.getElementById('ut-consignor').value = t.consignor || '';
    document.getElementById('ut-consignor-mobile').value = t.consignorMobile || '';
    document.getElementById('ut-consignee').value = t.consignee || '';
    document.getElementById('ut-consignee-mobile').value = t.consigneeMobile || '';
    document.getElementById('ut-owner').value = t.owner || '';
    document.getElementById('ut-owner-mobile').value = t.ownerMobile || '';
    document.getElementById('ut-billno').value = t.billNo || '0';

    const bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('updateTripDrawer'));
    bsOffcanvas.show();
  },

  async saveTripUpdate() {
    const t = this.activeTrip;
    if (!t) return;

    t.rate = parseFloat(document.getElementById('ut-rate').value) || t.rate;
    t.weight = parseFloat(document.getElementById('ut-weight').value) || t.weight;
    t.freight = t.rate * t.weight;
    t.haultCharges = parseFloat(document.getElementById('ut-hault').value) || 0;
    t.loadingCharges = parseFloat(document.getElementById('ut-loading').value) || 0;
    t.otherB = parseFloat(document.getElementById('ut-otherb').value) || t.otherB;
    t.reference = document.getElementById('ut-reference').value;
    t.referenceMobile = document.getElementById('ut-ref-mobile').value;
    t.driver = document.getElementById('ut-driver').value;
    t.driverMobile = document.getElementById('ut-driver-mobile').value;
    t.consignor = document.getElementById('ut-consignor').value;
    t.consignorMobile = document.getElementById('ut-consignor-mobile').value;
    t.consignee = document.getElementById('ut-consignee').value;
    t.consigneeMobile = document.getElementById('ut-consignee-mobile').value;
    t.owner = document.getElementById('ut-owner').value;
    t.ownerMobile = document.getElementById('ut-owner-mobile').value;
    t.billNo = document.getElementById('ut-billno').value;

    // Recalculate totals
    t.totalFreight = t.freight + t.haultCharges + t.loadingCharges;

    // Sync with Firestore
    try {
      if (typeof dbService !== 'undefined' && dbService.update) {
        await dbService.update('other_b_due', t.grNo, t);
      }
    } catch (e) {
      console.warn('[ToBeCreatedModule] Firestore sync error:', e);
    }

    const drawerEl = document.getElementById('updateTripDrawer');
    const instance = bootstrap.Offcanvas.getInstance(drawerEl);
    if (instance) instance.hide();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Trip details updated and synced!', 'success');
    }

    this.renderTripDetailsView(t);
  },

  openAuthDrawer(grNo) {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Authentication requested for ${grNo}`, 'info');
    }
  },

  // ==========================================================
  // HELPERS
  // ==========================================================
  showView(viewId) {
    const views = [
      'tobe-dashboard-view',
      'tobe-view-other-b-due-list',
      'tobe-view-trip-details',
      'tobe-view-payment-list',
      'tobe-view-payment-detail',
      'tobe-view-other-b-payment-list',
      'tobe-view-other-b-payment-detail',
      'tobe-view-open-debts'
    ];
    views.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === viewId) el.classList.remove('d-none');
        else el.classList.add('d-none');
      }
    });
  },

  setBreadcrumbs(items) {
    const container = document.getElementById('tobe-breadcrumb');
    if (!container) return;

    let html = '';
    items.forEach((item, index) => {
      if (index > 0) {
        html += `<li class="breadcrumb-separator"><i class="bi bi-chevron-right"></i></li>`;
      }
      if (item.active) {
        html += `<li class="active">${item.label}</li>`;
      } else if (item.onclick) {
        html += `<li><a href="javascript:void(0)" onclick="${item.onclick}">${item.label}</a></li>`;
      } else if (item.url) {
        html += `<li><a href="${item.url}">${item.label}</a></li>`;
      }
    });

    container.innerHTML = html;
  },

  setSearchPlaceholder(placeholder) {
    const input = document.getElementById('tobe-search-input');
    if (input) input.placeholder = placeholder;
  },

  setHeaderTools(toolsHtml) {
    const container = document.getElementById('tobe-header-tools');
    if (container) container.innerHTML = toolsHtml;
  },

  handleSearch(query) {
    this.searchQuery = query;
    if (this.viewMode === 'due-list') {
      this.renderDueTable();
    } else if (this.viewMode === 'open-debts') {
      this.renderDebtsTable();
    }
  },

  toggleFilter() {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Filtering Other B Due...', 'info');
    }
  }
};

// Export for browser & NodeJS testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToBeCreatedModule;
}
