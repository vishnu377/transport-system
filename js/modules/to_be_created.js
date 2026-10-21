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

    // Setup global listener to close AppSheet custom dropdowns on outside click
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('click', (e) => {
        if (!e.target || !e.target.closest || !e.target.closest('.appsheet-select-wrapper')) {
          ToBeCreatedModule.closeAllAppSheetDropdowns();
        }
      });
    }

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
    const railEl = typeof document !== 'undefined' ? (document.getElementById('tobe-left-rail') || (typeof document.querySelector === 'function' ? document.querySelector('.tobe-list-left-rail') : null)) : null;
    const isSidebarCollapsed = railEl && railEl.classList && typeof railEl.classList.contains === 'function' ? railEl.classList.contains('d-none') : false;
    this.setHeaderTools(`
      <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2 fw-semibold d-inline-flex align-items-center gap-1" id="btn-toggle-tobe-sidebar" onclick="ToBeCreatedModule.toggleSidebar()" title="Hide / Show Sidebar Filter" style="font-size: 11px; height: 26px;">
        <i class="bi bi-layout-sidebar-inset"></i> <span id="btn-toggle-tobe-sidebar-text">${isSidebarCollapsed ? 'Show Sidebar' : 'Sidebar'}</span>
      </button>
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
        <td>
          <i class="bi bi-trash text-muted me-2" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${t.grNo}')"></i>
          <i class="bi bi-pencil text-muted" onclick="event.stopPropagation(); ToBeCreatedModule.openAuthDrawer('${t.grNo}')"></i>
        </td>
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
                ${this.renderAppSheetAddRecordsDropdown(t.addRecordsFor || 'Party Payment')}
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Payment Table (Red Header, Green Values) -->
        <div class="tobe-details-card">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="tobe-bullet-red">●</span>
            <span class="fw-bold" style="color: var(--appsheet-red); font-size: 13.5px;">Payment</span>
            <span class="tobe-count-badge">${payments.length}</span>
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
          
          <div class="my-2 border-top pt-2">
            <div class="tobe-section-subhead">Other B</div>
            <div class="tobe-section-subhead">Status</div>
            <div class="mb-2">
              <label class="form-label small text-muted mb-1">Status <span class="text-danger">*</span></label>
              ${this.renderAppSheetStatusDropdown(t.status || 'Other B Pending')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // VARIATION B: GOLD / SUN ROW (Matching screencapture-...-15_37_07.png & media_1792580649383_ba9b2dc8.png)
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
                ${this.renderAppSheetAddRecordsDropdown(t.addRecordsFor || 'Other B')}
              </div>
            </div>
            ${this.renderFieldRow('Total Freight', `₹${Number(t.totalFreight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
            <div class="tobe-section-subhead">Other B</div>
            ${this.renderFieldRow('Other B', `₹${Number(t.otherB || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'gold')}
          </div>
        </div>

        <!-- Card 2: Other B Payment Table (Gold Header, Green Values) -->
        <div class="tobe-details-card">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="tobe-bullet-gold">●</span>
            <span class="fw-bold" style="color: var(--appsheet-gold-text); font-size: 13.5px;">Other B Payment</span>
            <span class="tobe-count-badge">${otherBPayments.length}</span>
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
          
          <div class="my-2 border-top pt-2">
            <div class="tobe-section-subhead">Status</div>
            <div class="mb-2">
              <label class="form-label small text-muted mb-1">Status <span class="text-danger">*</span></label>
              ${this.renderAppSheetStatusDropdown(t.status || 'Transit')}
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
                ${this.renderAppSheetAddRecordsDropdown(t.addRecordsFor || 'Party Payment')}
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Payment Table (Blue Header, Green Values) -->
        <div class="tobe-details-card">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="tobe-bullet-blue">●</span>
            <span class="fw-bold" style="color: var(--appsheet-blue); font-size: 13.5px;">Payment</span>
            <span class="tobe-count-badge">${payments.length}</span>
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
          
          <div class="my-2 border-top pt-2">
            <div class="tobe-section-subhead">Other B</div>
            <div class="tobe-section-subhead">Status</div>
            <div class="mb-2">
              <label class="form-label small text-muted mb-1">Status <span class="text-danger">*</span></label>
              ${this.renderAppSheetStatusDropdown(t.status || 'Party Payment Pending')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // VARIATION D: PINK ROW (Matching screencapture-...-15_43_51.png & media_1792580649408_a9b30ceb.png)
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
              ${this.renderAppSheetAddRecordsDropdown(t.addRecordsFor || '')}
            </div>
          </div>
          ${this.renderFieldRow('Total Freight', `₹${Number(t.totalFreight || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'pink')}
          
          <div class="tobe-section-subhead">Other B</div>
          <div class="tobe-section-subhead">Status</div>
          
          <div class="mb-2">
            <label class="form-label small text-muted mb-1">Status <span class="text-danger">*</span></label>
            ${this.renderAppSheetStatusDropdown(t.status || 'Off Loading')}
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
  // APPSHEET CUSTOM DROPDOWNS (Matching media_1792580649374 & media_1792580649401)
  // ==========================================================
  getStatusColor(status) {
    switch (status) {
      case 'Transit':
        return { bullet: '#bfa100', text: '#bfa100', name: 'gold' };
      case 'Off Loading':
        return { bullet: '#fb0a82', text: '#fb0a82', name: 'pink' };
      case 'Cheque Due':
      case 'Party Payment Pending':
        return { bullet: '#0080ff', text: '#0080ff', name: 'blue' };
      case 'POD Sent/Bill Generated':
        return { bullet: '#795298', text: '#795298', name: 'purple' };
      case 'Other B Pending':
      default:
        return { bullet: '#cc0b0b', text: '#cc0b0b', name: 'red' };
    }
  },

  renderAppSheetStatusDropdown(currentStatus = 'Transit') {
    const statusList = [
      { label: 'Transit', color: '#bfa100' },
      { label: 'Off Loading', color: '#fb0a82' },
      { label: 'Cheque Due', color: '#0080ff' },
      { label: 'POD Sent/Bill Generated', color: '#795298' },
      { label: 'Other B Pending', color: '#cc0b0b' }
    ];

    if (currentStatus === 'Party Payment Pending' && !statusList.some(s => s.label === currentStatus)) {
      statusList.splice(3, 0, { label: 'Party Payment Pending', color: '#0080ff' });
    }

    const current = statusList.find(s => s.label === currentStatus) || 
      (currentStatus ? { label: currentStatus, color: this.getStatusColor(currentStatus).text } : { label: '', color: '#5f6368' });

    const menuItems = statusList.map(s => `
      <div class="appsheet-select-item" onclick="event.stopPropagation(); ToBeCreatedModule.selectStatus('${s.label}')">
        <span style="color: ${s.color}; font-size: 13px; line-height: 1;">●</span>
        <span style="color: ${s.color}; font-weight: 600;">${s.label}</span>
      </div>
    `).join('');

    return `
      <div class="appsheet-select-wrapper" id="tobe-status-dropdown-wrapper">
        <div class="appsheet-select-control" id="tobe-status-control" onclick="ToBeCreatedModule.toggleStatusDropdown(event)">
          <div class="appsheet-select-display" id="tobe-status-display">
            ${current.label ? `
              <span style="color: ${current.color}; font-size: 13px; line-height: 1;">●</span>
              <span style="color: ${current.color}; font-weight: 600;">${current.label}</span>
            ` : '<span class="text-muted" style="font-weight: 400;">Select Status</span>'}
          </div>
          <div class="appsheet-select-actions">
            ${current.label ? `<span class="appsheet-clear-icon" title="Close" onclick="event.stopPropagation(); ToBeCreatedModule.clearStatus()">✕</span>` : ''}
            <span class="appsheet-chevron-icon"><i class="bi bi-chevron-down"></i></span>
          </div>
        </div>
        <div class="appsheet-select-menu d-none" id="tobe-status-menu">
          ${menuItems}
        </div>
      </div>
    `;
  },

  renderAppSheetAddRecordsDropdown(currentVal = '') {
    const options = ['Cheque', 'Party Payment', 'Truck Owner Payment', 'Other B'];

    const menuItems = options.map(opt => `
      <div class="appsheet-select-item" onclick="event.stopPropagation(); ToBeCreatedModule.selectAddRecord('${opt}')">
        <span style="color: #202124; font-weight: 500;">${opt}</span>
      </div>
    `).join('');

    return `
      <div class="appsheet-select-wrapper" id="tobe-addrecords-dropdown-wrapper" style="max-width: 170px;">
        <div class="appsheet-select-control" id="tobe-addrecords-control" onclick="ToBeCreatedModule.toggleAddRecordsDropdown(event)">
          <div class="appsheet-select-display" id="tobe-addrecords-display">
            ${currentVal ? `<span style="color: #202124; font-weight: 600;">${currentVal}</span>` : '<span class="text-muted" style="font-weight: 400;">Select</span>'}
          </div>
          <div class="appsheet-select-actions">
            ${currentVal ? `<span class="appsheet-clear-icon" title="Close" onclick="event.stopPropagation(); ToBeCreatedModule.clearAddRecords()">✕</span>` : ''}
            <span class="appsheet-chevron-icon"><i class="bi bi-chevron-down"></i></span>
          </div>
        </div>
        <div class="appsheet-select-menu d-none" id="tobe-addrecords-menu">
          ${menuItems}
        </div>
      </div>
    `;
  },

  toggleStatusDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('tobe-status-menu');
    const control = document.getElementById('tobe-status-control');
    const otherMenu = document.getElementById('tobe-addrecords-menu');
    const otherControl = document.getElementById('tobe-addrecords-control');

    if (otherMenu) otherMenu.classList.add('d-none');
    if (otherControl) otherControl.classList.remove('open');

    if (menu) {
      const isClosed = menu.classList.contains('d-none');
      if (isClosed) {
        menu.classList.remove('d-none');
        if (control) control.classList.add('open');
      } else {
        menu.classList.add('d-none');
        if (control) control.classList.remove('open');
      }
    }
  },

  toggleAddRecordsDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('tobe-addrecords-menu');
    const control = document.getElementById('tobe-addrecords-control');
    const otherMenu = document.getElementById('tobe-status-menu');
    const otherControl = document.getElementById('tobe-status-control');

    if (otherMenu) otherMenu.classList.add('d-none');
    if (otherControl) otherControl.classList.remove('open');

    if (menu) {
      const isClosed = menu.classList.contains('d-none');
      if (isClosed) {
        menu.classList.remove('d-none');
        if (control) control.classList.add('open');
      } else {
        menu.classList.add('d-none');
        if (control) control.classList.remove('open');
      }
    }
  },

  closeAllAppSheetDropdowns() {
    const statusMenu = document.getElementById('tobe-status-menu');
    const statusControl = document.getElementById('tobe-status-control');
    const addMenu = document.getElementById('tobe-addrecords-menu');
    const addControl = document.getElementById('tobe-addrecords-control');

    if (statusMenu) statusMenu.classList.add('d-none');
    if (statusControl) statusControl.classList.remove('open');
    if (addMenu) addMenu.classList.add('d-none');
    if (addControl) addControl.classList.remove('open');
  },

  selectStatus(newStatus) {
    this.closeAllAppSheetDropdowns();
    if (this.activeTrip) {
      this.activeTrip.status = newStatus;
      if (newStatus === 'Transit') this.activeTrip.color = 'gold';
      else if (newStatus === 'Off Loading') this.activeTrip.color = 'pink';
      else if (newStatus === 'Cheque Due' || newStatus === 'Party Payment Pending') this.activeTrip.color = 'blue';
      else if (newStatus === 'Other B Pending') this.activeTrip.color = 'red';
      
      const tripInList = this.dueTrips.find(t => t.grNo === this.activeTrip.grNo);
      if (tripInList) {
        tripInList.status = newStatus;
        tripInList.color = this.activeTrip.color;
      }

      this.renderTripDetailsView();

      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Trip Status changed to ${newStatus}`, 'success');
      }
    }
  },

  clearStatus() {
    this.closeAllAppSheetDropdowns();
    if (this.activeTrip) {
      this.activeTrip.status = '';
      this.renderTripDetailsView();
    }
  },

  selectAddRecord(recordType) {
    this.closeAllAppSheetDropdowns();
    if (this.activeTrip) {
      this.activeTrip.addRecordsFor = recordType;
      const tripInList = this.dueTrips.find(t => t.grNo === this.activeTrip.grNo);
      if (tripInList) {
        tripInList.addRecordsFor = recordType;
      }
    }

    if (recordType === 'Party Payment') {
      this.openConsigneePaymentDrawer();
    } else if (recordType === 'Other B') {
      this.openAddOtherBPaymentDrawer();
    } else if (recordType === 'Cheque') {
      this.openAuthDrawer(this.activeTrip ? this.activeTrip.grNo : '');
    } else if (recordType === 'Truck Owner Payment') {
      this.openAuthDrawer(this.activeTrip ? this.activeTrip.grNo : '');
    }

    if (this.viewMode === 'trip-details') {
      this.renderTripDetailsView();
    }
  },

  clearAddRecords() {
    this.closeAllAppSheetDropdowns();
    if (this.activeTrip) {
      this.activeTrip.addRecordsFor = '';
      if (this.viewMode === 'trip-details') {
        this.renderTripDetailsView();
      }
    }
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

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal('ut-grno', t.grNo || '');
    setVal('ut-rate', t.rate || '');
    setVal('ut-weight', t.weight || '');
    setVal('ut-freight', `₹ ${Number(t.freight || (t.rate * t.weight) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    setVal('ut-hault', t.haultCharges || 0);
    setVal('ut-loading', t.loadingCharges || 0);
    setVal('ut-otherb', t.otherB || 0);
    setVal('ut-reference', t.reference || '');
    setVal('ut-ref-mobile', t.referenceMobile || '');
    setVal('ut-driver', t.driver || '');
    setVal('ut-driver-mobile', t.driverMobile || '');
    setVal('ut-driver-mobile2', t.driverMobile2 || '');
    setVal('ut-consignor', t.consignor || '');
    setVal('ut-consignor-mobile', t.consignorMobile || '');
    setVal('ut-consignee', t.consignee || t.consignor || '');
    setVal('ut-consignee-mobile', t.consigneeMobile || t.consignorMobile || '');
    setVal('ut-owner', t.owner || '');
    setVal('ut-owner-mobile', t.ownerMobile || '');
    setVal('ut-owner-mobile2', t.ownerMobile2 || '');
    setVal('ut-billno', t.billNo || '0');

    // Show/hide 2nd mobile rows if element exists
    const rowDriver2 = document.getElementById('row-ut-driver-mobile2');
    if (rowDriver2 && rowDriver2.style) rowDriver2.style.display = t.driverMobile2 ? 'flex' : 'none';
    const rowOwner2 = document.getElementById('row-ut-owner-mobile2');
    if (rowOwner2 && rowOwner2.style) rowOwner2.style.display = t.ownerMobile2 ? 'flex' : 'none';

    const drawerEl = document.getElementById('updateTripDrawer');
    if (drawerEl) {
      if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
        bsOffcanvas.show();
      } else if (drawerEl.classList) {
        drawerEl.classList.add('show');
        drawerEl.style.visibility = 'visible';
      }
    }
  },

  closeUpdateTripDrawer() {
    const drawerEl = document.getElementById('updateTripDrawer');
    if (drawerEl) {
      if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
        const instance = bootstrap.Offcanvas.getInstance(drawerEl);
        if (instance) instance.hide();
      }
      if (drawerEl.classList) {
        drawerEl.classList.remove('show');
        drawerEl.style.visibility = 'hidden';
      }
    }
  },

  calculateFormFreight() {
    const rateEl = document.getElementById('ut-rate');
    const weightEl = document.getElementById('ut-weight');
    const freightEl = document.getElementById('ut-freight');
    if (rateEl && weightEl && freightEl) {
      const r = parseFloat(rateEl.value) || 0;
      const w = parseFloat(weightEl.value) || 0;
      const f = r * w;
      freightEl.value = `₹ ${Number(f).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  },

  async saveTripUpdate() {
    const t = this.activeTrip;
    if (!t) return;

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : '';
    };

    t.rate = parseFloat(getVal('ut-rate')) || t.rate;
    t.weight = parseFloat(getVal('ut-weight')) || t.weight;
    t.freight = t.rate * t.weight;
    t.haultCharges = parseFloat(getVal('ut-hault')) || 0;
    t.loadingCharges = parseFloat(getVal('ut-loading')) || 0;
    t.otherB = parseFloat(getVal('ut-otherb')) || t.otherB;
    t.reference = getVal('ut-reference') || t.reference;
    t.referenceMobile = getVal('ut-ref-mobile') || t.referenceMobile;
    t.driver = getVal('ut-driver') || t.driver;
    t.driverMobile = getVal('ut-driver-mobile') || t.driverMobile;
    if (getVal('ut-driver-mobile2')) t.driverMobile2 = getVal('ut-driver-mobile2');
    t.consignor = getVal('ut-consignor') || t.consignor;
    t.consignorMobile = getVal('ut-consignor-mobile') || t.consignorMobile;
    t.consignee = getVal('ut-consignee') || t.consignee;
    t.consigneeMobile = getVal('ut-consignee-mobile') || t.consigneeMobile;
    t.owner = getVal('ut-owner') || t.owner;
    t.ownerMobile = getVal('ut-owner-mobile') || t.ownerMobile;
    if (getVal('ut-owner-mobile2')) t.ownerMobile2 = getVal('ut-owner-mobile2');
    t.billNo = getVal('ut-billno') || '0';

    // Recalculate totals
    t.totalFreight = t.freight + t.haultCharges + t.loadingCharges;

    // Update in dueTrips array
    const tripInList = this.dueTrips.find(x => x.grNo === t.grNo);
    if (tripInList) {
      Object.assign(tripInList, t);
    }

    // Sync with Firestore
    try {
      if (typeof dbService !== 'undefined' && dbService.update) {
        await dbService.update('other_b_due', t.grNo, t);
      }
    } catch (e) {
      console.warn('[ToBeCreatedModule] Firestore sync error:', e);
    }

    this.closeUpdateTripDrawer();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Trip details updated and synced!', 'success');
    }

    this.renderTripDetailsView(t);
  },

  // ==========================================================
  // SIDEBAR HIDE / UNHIDE & DRAWER NAVIGATION
  // ==========================================================
  toggleSidebar() {
    const rail = typeof document !== 'undefined' ? (document.getElementById('tobe-left-rail') || (typeof document.querySelector === 'function' ? document.querySelector('.tobe-list-left-rail') : null)) : null;
    const btn = typeof document !== 'undefined' ? document.getElementById('btn-toggle-tobe-sidebar') : null;
    const btnText = typeof document !== 'undefined' ? document.getElementById('btn-toggle-tobe-sidebar-text') : null;
    const unhideWrap = typeof document !== 'undefined' ? document.getElementById('tobe-unhide-sidebar-wrap') : null;
    const container = typeof document !== 'undefined' ? document.getElementById('tobe-view-other-b-due-list') : null;

    if (rail && rail.classList) {
      rail.classList.toggle('d-none');
      const isCollapsed = rail.classList.contains('d-none');
      if (container && container.classList) {
        container.classList.toggle('sidebar-collapsed', isCollapsed);
      }
      if (btn && btn.classList) {
        btn.classList.toggle('active', isCollapsed);
        btn.classList.toggle('btn-primary', isCollapsed);
        btn.classList.toggle('text-white', isCollapsed);
        btn.classList.toggle('btn-outline-secondary', !isCollapsed);
      }
      if (btnText) {
        btnText.innerText = isCollapsed ? 'Show Sidebar' : 'Sidebar';
      }
      if (unhideWrap && unhideWrap.classList) {
        unhideWrap.classList.toggle('d-none', !isCollapsed);
      }
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(isCollapsed ? 'Sidebar filter hidden. Showing full table width.' : 'Sidebar filter restored.', 'info');
      }
    }
  },

  toggleNavDrawer() {
    const drawerEl = typeof document !== 'undefined' ? document.getElementById('appsheetDrawer') : null;
    if (drawerEl) {
      if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
        const inst = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
        inst.toggle();
      } else if (drawerEl.classList) {
        drawerEl.classList.toggle('show');
        drawerEl.style.visibility = drawerEl.classList.contains('show') ? 'visible' : 'hidden';
      }
    }
  },

  toggleRail() {
    const rail = typeof document !== 'undefined' ? (document.getElementById('sidebar') || (typeof document.querySelector === 'function' ? document.querySelector('.appsheet-rail') : null)) : null;
    const workspace = typeof document !== 'undefined' ? (typeof document.querySelector === 'function' ? document.querySelector('.appsheet-workspace') : null) : null;
    if (rail && rail.classList) {
      rail.classList.toggle('d-none');
      const isHidden = rail.classList.contains('d-none');
      if (workspace && workspace.style) {
        workspace.style.marginLeft = isHidden ? '0' : '48px';
      }
    }
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
