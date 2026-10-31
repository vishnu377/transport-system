/**
 * Module 9: Shahpura Module Controller (1:1 Google AppSheet Visual Fidelity)
 * Features:
 * - 3-Card Responsive Dashboard Layout (Home > Shahpura)
 * - Card 1 (Available Cash) Full Drilldown Architecture:
 *     1. Expanded Chart View (Home > Shahpura > Available Cash)
 *        - Full-width SVG bar chart (0 to -250,000), exact balance -₹ 2,12,329
 *        - White dashed centerline down the bar
 *        - High-fidelity Tooltip Card: "30/10/2026, 09:32:24 pm" | "● Avaiable Cash -212,329"
 *        - Slanted date "30/10/2026, 09:32..." & "DateTime" vertical axis
 *     2. Shahpura Slice Table View (Home > Shahpura > Shahpura Slice)
 *        - EXACTLY 1 Active Cash Snapshot Row matching original Google AppSheet!
 *        - Subheader Actions: [+ Add] (#c3b15a) | [Funnel]
 *        - Columns: DateTime | Amount In Hand | Avaiable Cash (● ₹ -212,329) | Amount (₹ -15,000) | ›
 *     3. Shahpura Slice Record Detail View (Home > Shahpura > Shahpura Slice > 10/30/2026 21:32:24)
 *        - Clean centered card with DateTime and Avaiable Cash
 *     4. Shahpura Slice Slide Drawer (+ Add)
 *        - Header: ✕ | Shahpura Slice | Cancel | Save (#c3b15a)
 *        - Fields: DateTime (calendar icon), Amount In Hand (₹), Avaiable Cash (₹), Amount (₹)
 * - Card 2 (Given Transactions) Full Drilldown Architecture:
 *     1. Table View (Home > Shahpura > Given Transactions)
 *        - Date-grouped, red dots ●, red bold text, sum badges, + Add (#c3b15a), Funnel
 *     2. Record Detail View (Home > Shahpura > Given Transactions > Shahpura Cash records Given)
 *        - Clean centered card with red dots ●, Date, Amount, Truck No, Name, Mobile (with phone icon), Origin, Destination, Related To, Year, Month, Month
 *        - Top-right navigation (< > ⤢)
 *     3. Slide Drawer for Transaction (+ Add / Edit)
 *        - Header: ✕ | Transaction | Cancel | Save (#c3b15a)
 *        - Toggle chips: [ ● Trip ] [ ● Other ]
 *        - Fields: Date (calendar icon), Avaiable Cash is (read-only ₹ -212,329), Amount, Truck No, Driver Name, Origin, Destination, Description
 * - Card 3 (Deposit Transactions) Full Drilldown Architecture:
 *     1. Table View (Home > Shahpura > Deposit Transactions)
 *        - Date-grouped, green dots ●, green bold text, sum badges, G.R. No. column, + Add (#c3b15a), Funnel
 *     2. Record Detail View (Home > Shahpura > Deposit Transactions > Shahpura Cash records Deposit)
 *        - Clean centered card with green dots ●, Date, Related To, Name, Mobile (with phone icon), Amount, Description, Year, Month, Month
 *        - Top-right navigation (< > ⤢)
 * - Searchable & Typable Comboboxes for Trucks, Drivers, Origins, Destinations
 * - Zero Browser LocalStorage: Cloud Firestore & In-Memory RAM only.
 */

const ShahpuraModule = {
  // Navigation & View State
  activeView: 'main', // 'main' | 'available_cash' | 'shahpura_slice' | 'slice_detail' | 'given_transactions' | 'given_detail' | 'deposit_transactions' | 'deposit_detail'
  expandedCard: null, // null | 'card1' | 'card2' | 'card3'
  searchQuery: '',

  // Datasets
  allGiven: [],
  allDeposit: [],
  allSlice: [],
  filteredGiven: [],
  filteredDeposit: [],
  filteredSlice: [],

  // Detail record states
  currentSliceRecord: null,
  currentDetailRecord: null,
  currentDetailType: null, // 'Given' | 'Deposit'
  currentDetailIndex: -1,

  // Slide Drawer State
  currentFormRelatedTo: 'Trip',
  currentFormType: 'Given',

  // Master lists for Comboboxes
  truckMasterList: [],
  driverMasterList: [],
  originMasterList: [
    'Rajsamand (Raj.)',
    'Udaipur (Raj.)',
    'Jalore (Raj.)',
    'Chittorgarh (Raj.)'
  ],
  destMasterList: [
    'Kanpur (U.P.)',
    'Lucknow (U.P.)',
    'Morbi (Gujrat)',
    'Rewari (Haryana)',
    'Jhajjar (Haryana)',
    'Sikandrabad (U.P.)',
    'Firozabad (U.P.)',
    'Delhi',
    'Sandila (U.P.)',
    'Neemrana (Raj.)',
    'Sonipat (Haryana)',
    'Sahibabad (U.P.)',
    'Gorakhpur (U.P.)',
    'Roorkee (U.K.)',
    'Bahadurgarh (Haryana)'
  ],

  async init() {
    console.log('[ShahpuraModule] Initializing 1:1 AppSheet Shahpura module...');
    await this.loadData();
    this.buildMasterLists();
    this.renderBreadcrumb();
    this.renderCurrentView();
    this.setupListeners();
    console.log('[ShahpuraModule] Initialized successfully.');
  },

  async loadData() {
    try {
      if (typeof dbService !== 'undefined') {
        if (dbService.getAllShahpuraTransactionsAsync) {
          const all = await dbService.getAllShahpuraTransactionsAsync();
          this.allGiven = all.filter(t => t.type === 'Given');
          this.allDeposit = all.filter(t => t.type === 'Deposit');
        }
        if (dbService.getAllShahpuraSliceAsync) {
          this.allSlice = await dbService.getAllShahpuraSliceAsync();
        }
      }
      
      if ((!this.allGiven || this.allGiven.length === 0) && typeof SAMPLE_SHAHPURA_DATA !== 'undefined') {
        this.allGiven = [...SAMPLE_SHAHPURA_DATA.givenTransactions];
        this.allDeposit = [...SAMPLE_SHAHPURA_DATA.depositTransactions];
        this.allSlice = [...(SAMPLE_SHAHPURA_DATA.sliceRecords || [])];
      }
    } catch (err) {
      console.warn('[ShahpuraModule] loadData fallback:', err);
      if (typeof SAMPLE_SHAHPURA_DATA !== 'undefined') {
        this.allGiven = [...SAMPLE_SHAHPURA_DATA.givenTransactions];
        this.allDeposit = [...SAMPLE_SHAHPURA_DATA.depositTransactions];
        this.allSlice = [...(SAMPLE_SHAHPURA_DATA.sliceRecords || [])];
      }
    }

    this.filteredGiven = [...this.allGiven];
    this.filteredDeposit = [...this.allDeposit];
    this.filteredSlice = [...this.allSlice];
  },

  buildMasterLists() {
    const trucks = new Set();
    const drivers = new Map();

    const combine = [...this.allGiven, ...this.allDeposit];
    for (const item of combine) {
      if (item.truckNo && item.truckNo.trim()) {
        trucks.add(item.truckNo.trim().toUpperCase());
      }
      if (item.name && item.name.trim()) {
        const cleanName = item.name.trim();
        if (!drivers.has(cleanName)) {
          drivers.set(cleanName, {
            name: cleanName,
            phone: item.phone || '',
            truckNo: item.truckNo || ''
          });
        }
      }
    }

    const defaultTrucks = [
      'RJ52GB5642', 'RJ52GA8733', 'RJ52GB5061', 'RJ52GB5528',
      'RJ52GB5529', 'RJ52GB5641', 'RJ52GA6366', 'RJ52GB0721',
      'RJ52GB5964', 'RJ14GH9821', 'RJ14GG5412', 'RJ52GB1122',
      'RJ52GA8732', 'RJ52GA7391', 'RJ14GH0366', 'RJ52GB2590',
      'RJ52GB2585', 'RJ52GA7335', 'RJ52GA7338', 'RJ52GA7309',
      'RJ52GA9546', 'RJ52GB4538', 'RJ52GA7310', 'RJ52GB5963',
      'RJ52GB5967', 'RJ52GB2507', 'RJ52GB4573', 'RJ52GA7333',
      'RJ52GB2589', 'RJ52GB4586', 'RJ52GB2509', 'RJ52GA8734'
    ];
    defaultTrucks.forEach(t => trucks.add(t));

    this.truckMasterList = Array.from(trucks).sort();
    this.driverMasterList = Array.from(drivers.values()).sort((a, b) => a.name.localeCompare(b.name));
  },

  calculateCashState() {
    let totalGiven = 0;
    let totalDeposit = 0;

    for (const g of this.allGiven) {
      totalGiven += (Number(g.amount) || 0);
    }
    for (const d of this.allDeposit) {
      totalDeposit += (Number(d.amount) || 0);
    }
    const availableCash = totalDeposit - totalGiven;

    return {
      totalGiven,
      totalDeposit,
      availableCash,
      asOf: '30/10/2026, 09:32:24 pm',
      displayDate: '30/10/2026, 09:32...',
      displayBalance: '₹ ' + Math.abs(availableCash).toLocaleString('en-IN')
    };
  },

  // ========================================================
  // VIEW SWITCHER & BREADCRUMB CONTROLLER
  // ========================================================
  setView(viewName, record = null) {
    this.activeView = viewName;
    if (record) {
      if (viewName === 'slice_detail') {
        this.currentSliceRecord = record;
      } else {
        this.currentDetailRecord = record;
      }
    }

    if (viewName === 'main') {
      this.expandedCard = null;
    }

    this.renderBreadcrumb();
    this.renderCurrentView();
  },

  renderBreadcrumb() {
    const bcContainer = document.getElementById('shahpuraBreadcrumb');
    if (!bcContainer) return;

    const searchInput = document.getElementById('shahpuraSearchInput');

    if (this.activeView === 'main') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Shahpura</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-grid-3x3-gap text-secondary" style="font-size: 16px; cursor: pointer;" title="Dashboard View Layout"></i>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Shahpura';
    } else if (this.activeView === 'available_cash') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Available Cash</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-icon-bordered" title="Shahpura Slice Table View" onclick="ShahpuraModule.setView('shahpura_slice')">
            <i class="bi bi-grid-fill"></i>
          </button>
          <button class="btn-appsheet-add" onclick="ShahpuraModule.openSliceAddDrawer()">
            <i class="bi bi-plus-lg"></i> Add
          </button>
          <div class="v-divider"></div>
          <button class="btn-icon-subtle" title="Sort / Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Available Cash';
    } else if (this.activeView === 'shahpura_slice') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Shahpura Slice</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-appsheet-add" onclick="ShahpuraModule.openSliceAddDrawer()">
            <i class="bi bi-plus-lg"></i> Add
          </button>
          <div class="v-divider"></div>
          <button class="btn-icon-subtle" title="Sort / Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Shahpura Slice';
    } else if (this.activeView === 'slice_detail') {
      const slug = this.currentSliceRecord ? (this.currentSliceRecord.dateTimeSlug || '10/30/2026 21:32:24') : '10/30/2026 21:32:24';
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('shahpura_slice')">Shahpura Slice</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">${slug}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-icon-subtle" title="Expand View" onclick="ShahpuraModule.setView('shahpura_slice')">
            <i class="bi bi-arrows-angle-expand"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Record';
    } else if (this.activeView === 'given_transactions') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Given Transactions</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-appsheet-add" onclick="ShahpuraModule.openAddDrawer('Given')">
            <i class="bi bi-plus-lg"></i> Add
          </button>
          <div class="v-divider"></div>
          <button class="btn-icon-subtle" title="Sort / Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Given Transactions';
    } else if (this.activeView === 'given_detail') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('given_transactions')">Given Transactions</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Shahpura Cash records Given</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="appsheet-nav-btn" title="Previous Record" onclick="ShahpuraModule.navigateGivenDetail(-1)">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="appsheet-nav-btn" title="Next Record" onclick="ShahpuraModule.navigateGivenDetail(1)">
            <i class="bi bi-chevron-right"></i>
          </button>
          <button class="appsheet-nav-btn" title="View Full Table" onclick="ShahpuraModule.setView('given_transactions')">
            <i class="bi bi-arrows-angle-expand"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Given Transactions';
    } else if (this.activeView === 'deposit_transactions') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Deposit Transactions</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-appsheet-add" onclick="ShahpuraModule.openAddDrawer('Deposit')">
            <i class="bi bi-plus-lg"></i> Add
          </button>
          <div class="v-divider"></div>
          <button class="btn-icon-subtle" title="Sort / Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Deposit Transactions';
    } else if (this.activeView === 'deposit_detail') {
      bcContainer.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('main')">Shahpura</a>
          <span class="mx-1">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="ShahpuraModule.setView('deposit_transactions')">Deposit Transactions</a>
          <span class="mx-1">&gt;</span>
          <span class="text-dark fw-medium">Shahpura Cash records Deposit</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="appsheet-nav-btn" title="Previous Record" onclick="ShahpuraModule.navigateDepositDetail(-1)">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="appsheet-nav-btn" title="Next Record" onclick="ShahpuraModule.navigateDepositDetail(1)">
            <i class="bi bi-chevron-right"></i>
          </button>
          <button class="appsheet-nav-btn" title="View Full Table" onclick="ShahpuraModule.setView('deposit_transactions')">
            <i class="bi bi-arrows-angle-expand"></i>
          </button>
        </div>
      `;
      if (searchInput) searchInput.placeholder = 'Search Deposit Transactions';
    }
  },

  renderCurrentView() {
    const mainGrid = document.getElementById('shahpuraGrid');
    const fullContainer = document.getElementById('shahpuraFullViewContainer');

    if (!mainGrid || !fullContainer) return;

    if (this.activeView === 'main') {
      mainGrid.style.display = 'grid';
      fullContainer.style.display = 'none';
      this.renderCard1AvailableCash();
      this.renderCard2GivenTransactions();
      this.renderCard3DepositTransactions();
    } else if (this.activeView === 'available_cash') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderExpandedAvailableCashView(fullContainer);
    } else if (this.activeView === 'shahpura_slice') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderShahpuraSliceTableView(fullContainer);
    } else if (this.activeView === 'slice_detail') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderShahpuraSliceDetailView(fullContainer);
    } else if (this.activeView === 'given_transactions') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderGivenTransactionsTableView(fullContainer);
    } else if (this.activeView === 'given_detail') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderGivenRecordDetailView(fullContainer);
    } else if (this.activeView === 'deposit_transactions') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderDepositTransactionsTableView(fullContainer);
    } else if (this.activeView === 'deposit_detail') {
      mainGrid.style.display = 'none';
      fullContainer.style.display = 'block';
      this.renderDepositRecordDetailView(fullContainer);
    }
  },

  // ========================================================
  // CARD 1: AVAILABLE CASH (MAIN DASHBOARD LEFT CARD)
  // ========================================================
  renderCard1AvailableCash() {
    const container = document.getElementById('card1Body');
    if (!container) return;

    const state = this.calculateCashState();

    const chartHeight = 540;
    const chartWidth = 440;
    const topY = 40;
    const bottomY = 500;
    const totalSpanY = bottomY - topY; // 460px
    const maxVal = 250000;

    const ratio = Math.min(1, Math.max(0, Math.abs(state.availableCash) / maxVal));
    const barHeight = totalSpanY * ratio;
    const barY = topY;
    const barWidth = 240;
    const barX = 110;

    const ticks = [
      { val: 0, label: '0', y: topY },
      { val: -50000, label: '-50,000', y: topY + totalSpanY * 0.2 },
      { val: -100000, label: '-100,000', y: topY + totalSpanY * 0.4 },
      { val: -150000, label: '-150,000', y: topY + totalSpanY * 0.6 },
      { val: -200000, label: '-200,000', y: topY + totalSpanY * 0.8 },
      { val: -250000, label: '-250,000', y: bottomY }
    ];

    let gridLinesHTML = '';
    for (const t of ticks) {
      const isZero = t.val === 0;
      const strokeColor = isZero ? '#70757a' : '#e0e4e8';
      const strokeWidth = isZero ? '1.5' : '1';
      gridLinesHTML += `
        <line x1="55" y1="${t.y}" x2="${chartWidth - 25}" y2="${t.y}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
        <text x="48" y="${t.y + 4}" font-family="Roboto, sans-serif" font-size="10" fill="#5f6368" text-anchor="end">${t.label}</text>
      `;
    }

    const barColor = state.availableCash < 0 ? '#cc0b0b' : '#00b11f';

    container.innerHTML = `
      <div class="card1-chart-container position-relative h-100 d-flex flex-column" style="overflow: hidden; cursor: pointer;" onclick="ShahpuraModule.setView('available_cash')">
        <svg viewBox="0 0 ${chartWidth} 590" class="w-100 flex-grow-1" preserveAspectRatio="none" style="min-height: 440px;">
          <!-- Grid & Ticks -->
          ${gridLinesHTML}

          <!-- Red Available Cash Bar -->
          <rect id="svgCashBar"
            x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}"
            fill="${barColor}"
            style="transition: opacity 0.2s;"
          />

          <!-- Vertical White Dashed Center Line -->
          <line x1="${barX + barWidth / 2}" y1="${barY}" x2="${barX + barWidth / 2}" y2="${bottomY + 10}" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.8" />

          <!-- X-Axis Timestamp Label slanted at 45 deg -->
          <g transform="translate(${barX + barWidth / 2 - 15}, ${bottomY + 45}) rotate(-45)">
            <text x="0" y="0" font-family="Roboto, sans-serif" font-size="10" fill="#5f6368" text-anchor="end">
              ${state.displayDate}
            </text>
          </g>

          <!-- Right Y-Axis Label: DateTime rotated -->
          <g transform="translate(${chartWidth - 8}, 60) rotate(90)">
            <text x="0" y="0" font-family="Roboto, sans-serif" font-size="10" fill="#70757a" text-anchor="start">
              DateTime
            </text>
          </g>
        </svg>

        <!-- Floating Tooltip Card matching AppSheet -->
        <div class="card1-appsheet-floating-card shadow-sm" style="position: absolute; right: 18px; top: 38px; background: #ffffff; border: 1px solid #dadce0; border-radius: 4px; padding: 6px 12px; pointer-events: none; z-index: 5;">
          <div style="font-size: 11px; color: #5f6368;">${state.asOf}</div>
          <div class="d-flex align-items-center justify-content-between gap-3 mt-1">
            <div class="d-flex align-items-center gap-1">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span style="font-size: 12px; color: #3c4043; font-weight: 500;">Avaiable Cash</span>
            </div>
            <span class="fw-bold text-dark" style="font-size: 13px;">${state.availableCash.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // SCREEN 1: AVAILABLE CASH EXPANDED VIEW (1:1 Screenshot 1)
  // ========================================================
  renderExpandedAvailableCashView(container) {
    const state = this.calculateCashState();

    const chartWidth = 1400;
    const topY = 40;
    const bottomY = 560;
    const totalSpanY = bottomY - topY;
    const maxVal = 250000;

    const ratio = Math.min(1, Math.max(0, Math.abs(state.availableCash) / maxVal));
    const barHeight = totalSpanY * ratio;
    const barY = topY;
    const barWidth = 840;
    const barX = 260;

    const ticks = [
      { val: 0, label: '0', y: topY },
      { val: -50000, label: '-50,000', y: topY + totalSpanY * 0.2 },
      { val: -100000, label: '-100,000', y: topY + totalSpanY * 0.4 },
      { val: -150000, label: '-150,000', y: topY + totalSpanY * 0.6 },
      { val: -200000, label: '-200,000', y: topY + totalSpanY * 0.8 },
      { val: -250000, label: '-250,000', y: bottomY }
    ];

    let gridLinesHTML = '';
    for (const t of ticks) {
      const isZero = t.val === 0;
      const strokeColor = isZero ? '#70757a' : '#e0e4e8';
      const strokeWidth = isZero ? '1.5' : '1';
      gridLinesHTML += `
        <line x1="60" y1="${t.y}" x2="${chartWidth - 40}" y2="${t.y}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
        <text x="50" y="${t.y + 4}" font-family="Roboto, sans-serif" font-size="11" fill="#5f6368" text-anchor="end">${t.label}</text>
      `;
    }

    container.innerHTML = `
      <div class="h-100 d-flex flex-column bg-white position-relative" style="overflow: hidden;">
        <svg viewBox="0 0 ${chartWidth} 680" class="w-100 h-100" preserveAspectRatio="none">
          <!-- Grid Lines -->
          ${gridLinesHTML}

          <!-- Massive Red Bar -->
          <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="#cc0b0b" />

          <!-- White Vertical Dashed Center Line -->
          <line x1="${barX + barWidth / 2}" y1="${barY}" x2="${barX + barWidth / 2}" y2="${bottomY + 15}" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.85" />

          <!-- X-Axis Timestamp Label slanted at 45 deg -->
          <g transform="translate(${barX + barWidth / 2 - 20}, ${bottomY + 60}) rotate(-45)">
            <text x="0" y="0" font-family="Roboto, sans-serif" font-size="11" fill="#5f6368" text-anchor="end">
              ${state.displayDate}
            </text>
          </g>

          <!-- Right Axis: DateTime rotated -->
          <g transform="translate(${chartWidth - 15}, 65) rotate(90)">
            <text x="0" y="0" font-family="Roboto, sans-serif" font-size="11" fill="#70757a" text-anchor="start">
              DateTime
            </text>
          </g>
        </svg>

        <!-- Authentic Floating Tooltip Card matching Screenshot 1 -->
        <div class="card1-appsheet-floating-card shadow" style="position: absolute; right: 180px; top: 45px; background: #ffffff; border: 1px solid #dadce0; border-radius: 6px; padding: 10px 16px; min-width: 180px; z-index: 10;">
          <div style="font-size: 11px; color: #5f6368;">${state.asOf}</div>
          <div class="d-flex align-items-center justify-content-between gap-4 mt-1">
            <div class="d-flex align-items-center gap-1">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span style="font-size: 13px; color: #3c4043; font-weight: 500;">Avaiable Cash</span>
            </div>
            <span class="fw-bold text-dark fs-6">${state.availableCash.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // SCREEN 2: SHAHPURA SLICE TABLE VIEW (1:1 Screenshot 2)
  // EXACTLY 1 Active Row matching original Google AppSheet!
  // ========================================================
  renderShahpuraSliceTableView(container) {
    let rowsHTML = '';
    const list = this.filteredSlice;

    if (list.length === 0) {
      rowsHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 text-secondary"></i>
            <p class="mt-2 mb-0 small">No Shahpura Slice records found.</p>
          </td>
        </tr>
      `;
    } else {
      for (const item of list) {
        const formattedBal = (item.availableCash < 0 ? '₹ -' : '₹ ') + Math.abs(item.availableCash).toLocaleString('en-IN');
        const formattedAmt = item.amount ? ((item.amount < 0 ? '₹ -' : '₹ ') + Math.abs(item.amount).toLocaleString('en-IN')) : '';
        const balColor = item.availableCash < 0 ? 'color: #cc0b0b; font-weight: 700;' : 'color: #00b11f; font-weight: 700;';

        rowsHTML += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openSliceDetail('${item.id}')" style="cursor: pointer; border-bottom: 1px solid #f1f3f4;">
            <td style="padding: 10px 16px; width: 220px; font-size: 13px; color: #202124;">
              ${item.dateTime}
            </td>
            <td style="padding: 10px 16px; width: 180px; font-size: 13px; color: #202124;">
              ${item.amountInHand || ''}
            </td>
            <td style="padding: 10px 16px; width: 180px; font-size: 13px;">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span style="${balColor}">${formattedBal}</span>
            </td>
            <td style="padding: 10px 16px; width: 180px; font-size: 13px; color: #202124;">
              ${formattedAmt}
            </td>
            <td style="padding: 10px 16px; text-align: right; width: 40px;">
              <i class="bi bi-chevron-right text-secondary fs-6"></i>
            </td>
          </tr>
        `;
      }
    }

    container.innerHTML = `
      <div class="h-100 bg-white" style="overflow-y: auto;">
        <table class="w-100" style="border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #dadce0; background: #ffffff;">
              <th style="padding: 9px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #202124; width: 220px;">DateTime</th>
              <th style="padding: 9px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #202124; width: 180px; border-left: 1px solid #e8eaed;">Amount In Hand</th>
              <th style="padding: 9px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #202124; width: 180px; border-left: 1px solid #e8eaed;">Avaiable Cash</th>
              <th style="padding: 9px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #202124; width: 180px; border-left: 1px solid #e8eaed;">Amount</th>
              <th style="padding: 9px 16px; width: 40px;"></th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    `;
  },

  openSliceDetail(id) {
    const r = this.allSlice.find(item => String(item.id) === String(id));
    if (r) {
      this.setView('slice_detail', r);
    }
  },

  // ========================================================
  // SCREEN 3: SHAHPURA SLICE RECORD DETAIL VIEW (1:1 Screenshot 3)
  // ========================================================
  renderShahpuraSliceDetailView(container) {
    const r = this.currentSliceRecord || (this.allSlice.length > 0 ? this.allSlice[0] : null);
    if (!r) return;

    const formattedBal = (r.availableCash < 0 ? '₹-' : '₹') + Math.abs(r.availableCash).toLocaleString('en-IN');

    container.innerHTML = `
      <div class="h-100 d-flex flex-column bg-white">
        <div class="flex-grow-1 d-flex justify-content-start align-items-start p-4" style="background: #ffffff;">
          <div style="width: 100%; max-width: 600px; border: 1px solid #dadce0; border-radius: 4px; padding: 18px 24px; background: #ffffff;">
            <div class="d-flex align-items-center py-2">
              <span style="width: 160px; font-size: 13px; color: #3c4043; font-weight: 500;">DateTime</span>
              <span style="font-size: 14px; color: #202124; font-weight: 500;">${r.dateTime}</span>
            </div>
            <div class="d-flex align-items-center py-2">
              <span style="width: 160px; font-size: 13px; color: #3c4043; font-weight: 500;">Avaiable Cash</span>
              <div class="d-flex align-items-center gap-2">
                <span class="appsheet-circle-dot red-dot">●</span>
                <span class="fw-bold" style="color: #cc0b0b; font-size: 14px;">${formattedBal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // SCREEN 4: SHAHPURA SLICE ADD DRAWER (1:1 Screenshot 4)
  // ========================================================
  openSliceAddDrawer() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const defaultDateTime = `${day}-${month}-${year} ${hours}:${mins}:${secs}`;

    const state = this.calculateCashState();

    document.getElementById('sliceInputDateTime').value = defaultDateTime;
    document.getElementById('sliceInputAmountInHand').value = '0';
    document.getElementById('sliceInputAvailableCash').value = Math.abs(state.availableCash);
    document.getElementById('sliceInputAmount').value = '0';

    const drawerEl = document.getElementById('shahpuraSliceAddDrawer');
    if (drawerEl) {
      const bs = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bs.show();
    }
  },

  async saveSliceRecord() {
    const dt = document.getElementById('sliceInputDateTime').value.trim();
    const inHand = document.getElementById('sliceInputAmountInHand').value.trim();
    const avCash = Number(document.getElementById('sliceInputAvailableCash').value) || 0;
    const amt = Number(document.getElementById('sliceInputAmount').value) || 0;

    const newRecord = {
      id: 'SLICE-' + Date.now().toString().slice(-6),
      dateTime: dt || new Date().toLocaleString('en-GB'),
      dateTimeSlug: dt.replace(/[-]/g, '/'),
      amountInHand: inHand ? `₹ ${inHand}` : '',
      availableCash: -Math.abs(avCash),
      amount: amt ? -Math.abs(amt) : 0,
      description: 'Manual adjustment in Shahpura Slice'
    };

    if (typeof dbService !== 'undefined' && dbService.saveShahpuraSliceRecord) {
      await dbService.saveShahpuraSliceRecord(newRecord);
    }

    this.allSlice.unshift(newRecord);
    this.filteredSlice = [...this.allSlice];

    const drawerEl = document.getElementById('shahpuraSliceAddDrawer');
    if (drawerEl) {
      bootstrap.Offcanvas.getInstance(drawerEl)?.hide();
    }

    this.renderCurrentView();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Shahpura Slice entry saved successfully!', 'success');
    }
  },

  // ========================================================
  // CARD 2: GIVEN TRANSACTIONS (DASHBOARD WIDGET)
  // ========================================================
  renderCard2GivenTransactions() {
    const container = document.getElementById('card2TableBody');
    if (!container) return;

    if (this.filteredGiven.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-inbox fs-2 text-secondary"></i>
          <p class="mt-2 mb-0 small">No given transactions found matching your criteria.</p>
        </div>
      `;
      return;
    }

    const grouped = new Map();
    for (const item of this.filteredGiven) {
      if (!grouped.has(item.date)) {
        grouped.set(item.date, []);
      }
      grouped.get(item.date).push(item);
    }

    const sortedDates = Array.from(grouped.keys()).sort((a, b) => {
      const pa = a.split('/').reverse().join('-');
      const pb = b.split('/').reverse().join('-');
      return pb.localeCompare(pa);
    });

    let html = '';
    for (const date of sortedDates) {
      const items = grouped.get(date);
      const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      const formattedTotal = '₹ ' + totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      html += `
        <tr class="appsheet-group-header-row bg-white">
          <td colspan="8" class="p-2 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="fw-bold red-text">${date}</span>
              <span class="appsheet-sum-badge">${formattedTotal}</span>
            </div>
          </td>
        </tr>
      `;

      for (const row of items) {
        const formattedAmt = '₹ ' + (Number(row.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        html += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openGivenDetail('${row.id}')">
            <td class="col-date">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.date}</span>
            </td>
            <td class="col-amount">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${formattedAmt}</span>
            </td>
            <td class="col-truck">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.truckNo || ''}</span>
            </td>
            <td class="col-name text-truncate" title="${row.name}">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.name || ''}</span>
            </td>
            <td class="col-origin text-truncate" title="${row.origin}">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.origin || ''}</span>
            </td>
            <td class="col-dest text-truncate" title="${row.destination}">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.destination || ''}</span>
            </td>
            <td class="col-desc text-truncate" title="${row.description}">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.description || ''}</span>
            </td>
            <td class="col-action text-end pe-3">
              <i class="bi bi-chevron-right text-secondary fs-6"></i>
            </td>
          </tr>
        `;
      }
    }

    container.innerHTML = html;
  },

  // ========================================================
  // CARD 2 FULL VIEW: GIVEN TRANSACTIONS TABLE VIEW (1:1 Screencapture)
  // ========================================================
  renderGivenTransactionsTableView(container) {
    if (this.filteredGiven.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-inbox fs-2 text-secondary"></i>
          <p class="mt-2 mb-0 small">No given transactions found matching your criteria.</p>
        </div>
      `;
      return;
    }

    const grouped = new Map();
    for (const item of this.filteredGiven) {
      if (!grouped.has(item.date)) {
        grouped.set(item.date, []);
      }
      grouped.get(item.date).push(item);
    }

    const sortedDates = Array.from(grouped.keys()).sort((a, b) => {
      const pa = a.split('/').reverse().join('-');
      const pb = b.split('/').reverse().join('-');
      return pb.localeCompare(pa);
    });

    let rowsHTML = '';
    for (const date of sortedDates) {
      const items = grouped.get(date);
      const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      const formattedTotal = '₹' + totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      rowsHTML += `
        <tr class="appsheet-group-header-row bg-white">
          <td colspan="8" class="p-2 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="fw-bold red-text">${date}</span>
              <span class="appsheet-sum-badge">${formattedTotal}</span>
            </div>
          </td>
        </tr>
      `;

      for (const row of items) {
        const formattedAmt = '₹ ' + (Number(row.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        rowsHTML += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openGivenDetail('${row.id}')" style="cursor: pointer; border-bottom: 1px solid #f1f3f4;">
            <td style="padding: 8px 12px; width: 120px;">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.date}</span>
            </td>
            <td style="padding: 8px 12px; width: 120px;">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${formattedAmt}</span>
            </td>
            <td style="padding: 8px 12px; width: 130px;">
              ${row.truckNo ? `<span class="appsheet-circle-dot red-dot">●</span><span class="red-text fw-bold">${row.truckNo}</span>` : ''}
            </td>
            <td style="padding: 8px 12px; width: 220px;" class="text-truncate" title="${row.name}">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.name || ''}</span>
            </td>
            <td style="padding: 8px 12px; width: 150px;" class="text-truncate" title="${row.origin}">
              ${row.origin ? `<span class="appsheet-circle-dot red-dot">●</span><span class="red-text fw-bold">${row.origin}</span>` : ''}
            </td>
            <td style="padding: 8px 12px; width: 150px;" class="text-truncate" title="${row.destination}">
              ${row.destination ? `<span class="appsheet-circle-dot red-dot">●</span><span class="red-text fw-bold">${row.destination}</span>` : ''}
            </td>
            <td style="padding: 8px 12px; width: 160px;" class="text-truncate" title="${row.description}">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span class="red-text fw-bold">${row.description || ''}</span>
            </td>
            <td style="padding: 8px 12px; text-align: right; width: 40px;">
              <i class="bi bi-chevron-right text-secondary fs-6"></i>
            </td>
          </tr>
        `;
      }
    }

    container.innerHTML = `
      <div class="h-100 bg-white" style="overflow-y: auto;">
        <table class="appsheet-table w-100">
          <thead>
            <tr>
              <th style="width: 120px;">Date</th>
              <th style="width: 120px;">Amount</th>
              <th style="width: 130px;">Truck No.</th>
              <th style="width: 220px;">Name</th>
              <th style="width: 150px;">Origin</th>
              <th style="width: 150px;">Destination</th>
              <th style="width: 160px;">Description</th>
              <th style="width: 40px;"></th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    `;
  },

  // ========================================================
  // CARD 2 RECORD DETAIL VIEW: SHAHPURA CASH RECORDS GIVEN (1:1 Screenshot)
  // ========================================================
  openGivenDetail(id) {
    const list = this.filteredGiven;
    const idx = list.findIndex(item => String(item.id) === String(id));
    if (idx !== -1) {
      this.currentDetailIndex = idx;
      this.currentDetailRecord = list[idx];
      this.setView('given_detail', list[idx]);
    }
  },

  navigateGivenDetail(delta) {
    const list = this.filteredGiven;
    if (!list.length) return;
    let newIdx = this.currentDetailIndex + delta;
    if (newIdx < 0) newIdx = 0;
    if (newIdx >= list.length) newIdx = list.length - 1;
    this.currentDetailIndex = newIdx;
    this.currentDetailRecord = list[newIdx];
    this.renderCurrentView();
  },

  renderGivenRecordDetailView(container) {
    const r = this.currentDetailRecord || (this.filteredGiven.length > 0 ? this.filteredGiven[0] : null);
    if (!r) return;

    const formattedAmt = '₹' + (Number(r.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    container.innerHTML = `
      <div class="h-100 d-flex flex-column bg-white p-4" style="overflow-y: auto;">
        <div class="record-detail-card mx-auto">
          <!-- Date -->
          <div class="record-detail-row">
            <div class="record-detail-label">Date</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.date}</span>
            </div>
          </div>

          <!-- Amount -->
          <div class="record-detail-row">
            <div class="record-detail-label">Amount</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${formattedAmt}</span>
            </div>
          </div>

          <!-- Truck No. -->
          <div class="record-detail-row">
            <div class="record-detail-label">Truck No.</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.truckNo || ''}</span>
            </div>
          </div>

          <!-- Name -->
          <div class="record-detail-row">
            <div class="record-detail-label">Name</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.name || ''}</span>
            </div>
          </div>

          <!-- Mobile No. -->
          <div class="record-detail-row">
            <div class="record-detail-label">Mobile No.</div>
            <div class="record-detail-val red-text d-flex justify-content-between align-items-center w-100">
              <div>
                <span class="appsheet-circle-dot red-dot">●</span>
                <span>${r.phone || ''}</span>
              </div>
              ${r.phone ? `
                <a href="tel:${r.phone}" class="text-danger" title="Call ${r.phone}">
                  <i class="bi bi-telephone text-danger fs-6"></i>
                </a>
              ` : ''}
            </div>
          </div>

          <!-- Origin -->
          <div class="record-detail-row">
            <div class="record-detail-label">Origin</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.origin || ''}</span>
            </div>
          </div>

          <!-- Destination -->
          <div class="record-detail-row">
            <div class="record-detail-label">Destination</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.destination || ''}</span>
            </div>
          </div>

          <!-- Related To -->
          <div class="record-detail-row">
            <div class="record-detail-label">Related To</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.relatedTo || 'Trip'}</span>
            </div>
          </div>

          <!-- Year -->
          <div class="record-detail-row">
            <div class="record-detail-label">Year</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.year || '2026-2027'}</span>
            </div>
          </div>

          <!-- Month -->
          <div class="record-detail-row">
            <div class="record-detail-label">Month</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.month || 'Oct'}</span>
            </div>
          </div>

          <!-- Month (Day Month) -->
          <div class="record-detail-row">
            <div class="record-detail-label">Month</div>
            <div class="record-detail-val red-text">
              <span class="appsheet-circle-dot red-dot">●</span>
              <span>${r.monthDay || '7 Oct'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // CARD 3: DEPOSIT TRANSACTIONS (DASHBOARD WIDGET)
  // ========================================================
  renderCard3DepositTransactions() {
    const container = document.getElementById('card3TableBody');
    if (!container) return;

    if (this.filteredDeposit.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-inbox fs-2 text-secondary"></i>
          <p class="mt-2 mb-0 small">No deposit transactions found matching your criteria.</p>
        </div>
      `;
      return;
    }

    const grouped = new Map();
    for (const item of this.filteredDeposit) {
      if (!grouped.has(item.date)) {
        grouped.set(item.date, []);
      }
      grouped.get(item.date).push(item);
    }

    const sortedDates = Array.from(grouped.keys()).sort((a, b) => {
      const pa = a.split('/').reverse().join('-');
      const pb = b.split('/').reverse().join('-');
      return pb.localeCompare(pa);
    });

    let html = '';
    for (const date of sortedDates) {
      const items = grouped.get(date);
      const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      const formattedTotal = '₹ ' + totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      html += `
        <tr class="appsheet-group-header-row bg-white">
          <td colspan="9" class="p-2 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="fw-bold green-text">${date}</span>
              <span class="appsheet-sum-badge">${formattedTotal}</span>
            </div>
          </td>
        </tr>
      `;

      for (const row of items) {
        const formattedAmt = '₹ ' + (Number(row.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        html += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openDepositDetail('${row.id}')">
            <td class="col-date">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="green-text fw-bold">${row.date}</span>
            </td>
            <td class="col-amount">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="green-text fw-bold">${formattedAmt}</span>
            </td>
            <td class="col-truck">
              ${row.truckNo ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.truckNo}</span>` : ''}
            </td>
            <td class="col-name text-truncate" title="${row.name}">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="green-text fw-bold">${row.name || ''}</span>
            </td>
            <td class="col-gr">
              ${row.grNo ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.grNo}</span>` : (row.origin || row.destination ? `<span class="appsheet-circle-dot green-dot">●</span>` : '')}
            </td>
            <td class="col-origin text-truncate" title="${row.origin}">
              ${row.origin ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.origin}</span>` : ''}
            </td>
            <td class="col-dest text-truncate" title="${row.destination}">
              ${row.destination ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.destination}</span>` : ''}
            </td>
            <td class="col-desc text-truncate" title="${row.description}">
              ${row.description ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.description}</span>` : `<span class="appsheet-circle-dot green-dot">●</span>`}
            </td>
            <td class="col-action text-end pe-3">
              <i class="bi bi-chevron-right text-secondary fs-6"></i>
            </td>
          </tr>
        `;
      }
    }

    container.innerHTML = html;
  },

  // ========================================================
  // CARD 3 FULL VIEW: DEPOSIT TRANSACTIONS TABLE VIEW (1:1 Screencapture)
  // ========================================================
  renderDepositTransactionsTableView(container) {
    if (this.filteredDeposit.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-inbox fs-2 text-secondary"></i>
          <p class="mt-2 mb-0 small">No deposit transactions found matching your criteria.</p>
        </div>
      `;
      return;
    }

    const grouped = new Map();
    for (const item of this.filteredDeposit) {
      if (!grouped.has(item.date)) {
        grouped.set(item.date, []);
      }
      grouped.get(item.date).push(item);
    }

    const sortedDates = Array.from(grouped.keys()).sort((a, b) => {
      const pa = a.split('/').reverse().join('-');
      const pb = b.split('/').reverse().join('-');
      return pb.localeCompare(pa);
    });

    let rowsHTML = '';
    for (const date of sortedDates) {
      const items = grouped.get(date);
      const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      const formattedTotal = '₹' + totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      rowsHTML += `
        <tr class="appsheet-group-header-row bg-white">
          <td colspan="9" class="p-2 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="fw-bold green-text">${date}</span>
              <span class="appsheet-sum-badge">${formattedTotal}</span>
            </div>
          </td>
        </tr>
      `;

      for (const row of items) {
        const formattedAmt = '₹ ' + (Number(row.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        rowsHTML += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openDepositDetail('${row.id}')" style="cursor: pointer; border-bottom: 1px solid #f1f3f4;">
            <td style="padding: 8px 12px; width: 120px;">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="green-text fw-bold">${row.date}</span>
            </td>
            <td style="padding: 8px 12px; width: 120px;">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="green-text fw-bold">${formattedAmt}</span>
            </td>
            <td style="padding: 8px 12px; width: 130px;">
              ${row.truckNo ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.truckNo}</span>` : ''}
            </td>
            <td style="padding: 8px 12px; width: 200px;" class="text-truncate" title="${row.name}">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span class="green-text fw-bold">${row.name || ''}</span>
            </td>
            <td style="padding: 8px 12px; width: 90px;">
              ${row.grNo ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.grNo}</span>` : (row.origin || row.destination ? `<span class="appsheet-circle-dot green-dot">●</span>` : '')}
            </td>
            <td style="padding: 8px 12px; width: 140px;" class="text-truncate" title="${row.origin}">
              ${row.origin ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.origin}</span>` : ''}
            </td>
            <td style="padding: 8px 12px; width: 140px;" class="text-truncate" title="${row.destination}">
              ${row.destination ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.destination}</span>` : ''}
            </td>
            <td style="padding: 8px 12px; width: 150px;" class="text-truncate" title="${row.description}">
              ${row.description ? `<span class="appsheet-circle-dot green-dot">●</span><span class="green-text fw-bold">${row.description}</span>` : `<span class="appsheet-circle-dot green-dot">●</span>`}
            </td>
            <td style="padding: 8px 12px; text-align: right; width: 40px;">
              <i class="bi bi-chevron-right text-secondary fs-6"></i>
            </td>
          </tr>
        `;
      }
    }

    container.innerHTML = `
      <div class="h-100 bg-white" style="overflow-y: auto;">
        <table class="appsheet-table w-100">
          <thead>
            <tr>
              <th style="width: 120px;">Date</th>
              <th style="width: 120px;">Amount</th>
              <th style="width: 130px;">Truck No.</th>
              <th style="width: 200px;">Name</th>
              <th style="width: 90px;">G.R. No.</th>
              <th style="width: 140px;">Origin</th>
              <th style="width: 140px;">Destination</th>
              <th style="width: 150px;">Description</th>
              <th style="width: 40px;"></th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    `;
  },

  // ========================================================
  // CARD 3 RECORD DETAIL VIEW: SHAHPURA CASH RECORDS DEPOSIT (1:1 Screenshot)
  // ========================================================
  openDepositDetail(id) {
    const list = this.filteredDeposit;
    const idx = list.findIndex(item => String(item.id) === String(id));
    if (idx !== -1) {
      this.currentDetailIndex = idx;
      this.currentDetailRecord = list[idx];
      this.setView('deposit_detail', list[idx]);
    }
  },

  navigateDepositDetail(delta) {
    const list = this.filteredDeposit;
    if (!list.length) return;
    let newIdx = this.currentDetailIndex + delta;
    if (newIdx < 0) newIdx = 0;
    if (newIdx >= list.length) newIdx = list.length - 1;
    this.currentDetailIndex = newIdx;
    this.currentDetailRecord = list[newIdx];
    this.renderCurrentView();
  },

  renderDepositRecordDetailView(container) {
    const r = this.currentDetailRecord || (this.filteredDeposit.length > 0 ? this.filteredDeposit[0] : null);
    if (!r) return;

    const formattedAmt = '₹' + (Number(r.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    container.innerHTML = `
      <div class="h-100 d-flex flex-column bg-white p-4" style="overflow-y: auto;">
        <div class="record-detail-card mx-auto">
          <!-- Date -->
          <div class="record-detail-row">
            <div class="record-detail-label">Date</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.date}</span>
            </div>
          </div>

          <!-- Related To -->
          <div class="record-detail-row">
            <div class="record-detail-label">Related To</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.relatedTo || 'Other'}</span>
            </div>
          </div>

          <!-- Name -->
          <div class="record-detail-row">
            <div class="record-detail-label">Name</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.name || ''}</span>
            </div>
          </div>

          <!-- Mobile No. -->
          <div class="record-detail-row">
            <div class="record-detail-label">Mobile No.</div>
            <div class="record-detail-val green-text d-flex justify-content-between align-items-center w-100">
              <div>
                <span class="appsheet-circle-dot green-dot">●</span>
                <span>${r.phone || ''}</span>
              </div>
              ${r.phone ? `
                <a href="tel:${r.phone}" class="text-success" title="Call ${r.phone}">
                  <i class="bi bi-telephone text-success fs-6"></i>
                </a>
              ` : ''}
            </div>
          </div>

          <!-- Amount -->
          <div class="record-detail-row">
            <div class="record-detail-label">Amount</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${formattedAmt}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="record-detail-row">
            <div class="record-detail-label">Description</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.description || ''}</span>
            </div>
          </div>

          <!-- Year -->
          <div class="record-detail-row">
            <div class="record-detail-label">Year</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.year || '2026-2027'}</span>
            </div>
          </div>

          <!-- Month -->
          <div class="record-detail-row">
            <div class="record-detail-label">Month</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.month || 'Oct'}</span>
            </div>
          </div>

          <!-- Month (Day Month) -->
          <div class="record-detail-row">
            <div class="record-detail-label">Month</div>
            <div class="record-detail-val green-text">
              <span class="appsheet-circle-dot green-dot">●</span>
              <span>${r.monthDay || '7 Oct'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // EXPAND [↗] & COLLAPSE [↙] ENGINE
  // ========================================================
  toggleExpand(cardKey) {
    if (cardKey === 'card1') {
      this.setView('available_cash');
      return;
    }
    if (cardKey === 'card2') {
      this.setView('given_transactions');
      return;
    }
    if (cardKey === 'card3') {
      this.setView('deposit_transactions');
      return;
    }
  },

  // ========================================================
  // REAL-TIME SEARCH FILTER
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').trim().toLowerCase();

    if (!this.searchQuery) {
      this.filteredGiven = [...this.allGiven];
      this.filteredDeposit = [...this.allDeposit];
      this.filteredSlice = [...this.allSlice];
    } else {
      const q = this.searchQuery;

      this.filteredSlice = this.allSlice.filter(s => {
        return (
          (s.dateTime && s.dateTime.toLowerCase().includes(q)) ||
          (String(s.availableCash).includes(q)) ||
          (String(s.amount).includes(q)) ||
          (s.description && s.description.toLowerCase().includes(q))
        );
      });

      this.filteredGiven = this.allGiven.filter(g => {
        return (
          (g.truckNo && g.truckNo.toLowerCase().includes(q)) ||
          (g.name && g.name.toLowerCase().includes(q)) ||
          (g.phone && g.phone.toLowerCase().includes(q)) ||
          (g.origin && g.origin.toLowerCase().includes(q)) ||
          (g.destination && g.destination.toLowerCase().includes(q)) ||
          (g.date && g.date.toLowerCase().includes(q)) ||
          (g.description && g.description.toLowerCase().includes(q)) ||
          (String(g.amount).includes(q))
        );
      });

      this.filteredDeposit = this.allDeposit.filter(d => {
        return (
          (d.truckNo && d.truckNo.toLowerCase().includes(q)) ||
          (d.name && d.name.toLowerCase().includes(q)) ||
          (d.phone && d.phone.toLowerCase().includes(q)) ||
          (d.origin && d.origin.toLowerCase().includes(q)) ||
          (d.destination && d.destination.toLowerCase().includes(q)) ||
          (d.grNo && d.grNo.toLowerCase().includes(q)) ||
          (d.date && d.date.toLowerCase().includes(q)) ||
          (d.description && d.description.toLowerCase().includes(q)) ||
          (String(d.amount).includes(q))
        );
      });
    }

    if (this.activeView === 'main') {
      this.renderCard2GivenTransactions();
      this.renderCard3DepositTransactions();
    } else if (this.activeView === 'shahpura_slice') {
      const container = document.getElementById('shahpuraFullViewContainer');
      if (container) this.renderShahpuraSliceTableView(container);
    } else if (this.activeView === 'given_transactions') {
      const container = document.getElementById('shahpuraFullViewContainer');
      if (container) this.renderGivenTransactionsTableView(container);
    } else if (this.activeView === 'deposit_transactions') {
      const container = document.getElementById('shahpuraFullViewContainer');
      if (container) this.renderDepositTransactionsTableView(container);
    }
  },

  // ========================================================
  // + ADD / EDIT TRANSACTION SLIDE DRAWERS
  // ========================================================
  openAddDrawer(type = 'Given') {
    this.currentFormType = type;
    const formTypeEl = document.getElementById('txFormType');
    const editIdEl = document.getElementById('txFormEditId');

    if (formTypeEl) formTypeEl.value = type;
    if (editIdEl) editIdEl.value = '';

    const dotRelTrip = document.getElementById('dotRelTrip');
    const dotRelOther = document.getElementById('dotRelOther');
    if (dotRelTrip && dotRelOther) {
      if (type === 'Given') {
        dotRelTrip.className = 'appsheet-circle-dot red-dot';
        dotRelOther.className = 'appsheet-circle-dot red-dot';
      } else {
        dotRelTrip.className = 'appsheet-circle-dot green-dot';
        dotRelOther.className = 'appsheet-circle-dot green-dot';
      }
    }

    // Default to Trip (or Other for deposit if user wants)
    this.setFormRelatedTo('Trip');

    const state = this.calculateCashState();
    const avCashEl = document.getElementById('txAvailableCash');
    if (avCashEl) {
      avCashEl.value = '₹ ' + state.availableCash.toLocaleString('en-IN');
    }

    const today = new Date();
    const dStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    const dateEl = document.getElementById('txDate');
    if (dateEl) dateEl.value = dStr;
    const amtEl = document.getElementById('txAmount');
    if (amtEl) amtEl.value = '0.00';
    const truckEl = document.getElementById('txTruckInput');
    if (truckEl) truckEl.value = '';
    const driverEl = document.getElementById('txDriverInput');
    if (driverEl) driverEl.value = '';
    const phoneEl = document.getElementById('txPhone');
    if (phoneEl) phoneEl.value = '';
    const grEl = document.getElementById('txGrNo');
    if (grEl) grEl.value = '';
    const originEl = document.getElementById('txOrigin');
    if (originEl) originEl.value = 'Rajsamand (Raj.)';
    const destEl = document.getElementById('txDestination');
    if (destEl) destEl.value = '';
    const descEl = document.getElementById('txDescription');
    if (descEl) descEl.value = '';

    const grContainer = document.getElementById('txGrContainer');
    if (grContainer) {
      grContainer.style.display = type === 'Deposit' ? 'flex' : 'none';
    }

    const drawer = document.getElementById('shahpuraFormDrawer');
    if (drawer) {
      const bs = bootstrap.Offcanvas.getOrCreateInstance(drawer);
      bs.show();
    }
  },

  setFormRelatedTo(rel) {
    this.currentFormRelatedTo = rel;

    const btnTrip = document.getElementById('btnRelTrip');
    const btnOther = document.getElementById('btnRelOther');
    const truckRow = document.getElementById('txTruckRow');
    const originRow = document.getElementById('txOriginRow');
    const destRow = document.getElementById('txDestinationRow');
    const nameLabel = document.getElementById('txNameLabel');

    if (rel === 'Trip') {
      if (btnTrip) btnTrip.classList.add('active');
      if (btnOther) btnOther.classList.remove('active');
      if (truckRow) truckRow.style.display = 'flex';
      if (originRow) originRow.style.display = 'flex';
      if (destRow) destRow.style.display = 'flex';
      if (nameLabel) nameLabel.innerText = 'Name*';
    } else {
      if (btnTrip) btnTrip.classList.remove('active');
      if (btnOther) btnOther.classList.add('active');
      if (truckRow) truckRow.style.display = 'none';
      if (originRow) originRow.style.display = 'none';
      if (destRow) destRow.style.display = 'none';
      if (nameLabel) nameLabel.innerText = 'Name';
    }
  },

  async saveTransaction() {
    const editId = document.getElementById('txFormEditId')?.value?.trim() || '';
    const type = document.getElementById('txFormType')?.value || 'Given';
    const dateInput = document.getElementById('txDate')?.value?.trim() || '';
    const amount = Number(document.getElementById('txAmount')?.value) || 0;
    const truckNo = document.getElementById('txTruckInput')?.value?.trim()?.toUpperCase() || '';
    const name = document.getElementById('txDriverInput')?.value?.trim() || '';
    const phone = document.getElementById('txPhone')?.value?.trim() || '';
    const grNo = document.getElementById('txGrNo')?.value?.trim() || '';
    const origin = document.getElementById('txOrigin')?.value?.trim() || '';
    const destination = document.getElementById('txDestination')?.value?.trim() || '';
    const description = document.getElementById('txDescription')?.value?.trim() || '';
    const relatedTo = this.currentFormRelatedTo || 'Trip';

    if (!amount || amount <= 0) {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast('Please enter a valid amount.', 'warning');
      } else {
        alert('Please enter a valid amount.');
      }
      return;
    }

    // Convert date format if needed
    const parts = dateInput.split(/[-/]/);
    const formattedDate = parts.length === 3 ? `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}` : new Date().toLocaleDateString('en-GB');

    const record = {
      id: editId || `${type === 'Deposit' ? 'DEP-' : 'GIV-'}${Date.now().toString().slice(-6)}`,
      date: formattedDate,
      amount,
      truckNo: relatedTo === 'Trip' ? truckNo : '',
      name,
      phone,
      grNo,
      origin: relatedTo === 'Trip' ? origin : '',
      destination: relatedTo === 'Trip' ? destination : '',
      description,
      relatedTo,
      year: '2026-2027',
      month: 'Oct',
      monthDay: '7 Oct',
      type,
      updatedAt: new Date().toISOString()
    };

    if (typeof dbService !== 'undefined' && dbService.saveShahpuraTransaction) {
      await dbService.saveShahpuraTransaction(record);
    }

    if (type === 'Given') {
      const idx = this.allGiven.findIndex(item => item.id === record.id);
      if (idx !== -1) {
        this.allGiven[idx] = record;
      } else {
        this.allGiven.unshift(record);
      }
      this.filteredGiven = [...this.allGiven];
    } else {
      const idx = this.allDeposit.findIndex(item => item.id === record.id);
      if (idx !== -1) {
        this.allDeposit[idx] = record;
      } else {
        this.allDeposit.unshift(record);
      }
      this.filteredDeposit = [...this.allDeposit];
    }

    this.buildMasterLists();
    this.renderCurrentView();

    const drawer = document.getElementById('shahpuraFormDrawer');
    if (drawer) {
      bootstrap.Offcanvas.getInstance(drawer)?.hide();
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`${type} Transaction saved successfully!`, 'success');
    }
  },

  // ========================================================
  // COMBOBOX SEARCH & AUTO-FILL
  // ========================================================
  filterTruckCombobox(val) {
    const listEl = document.getElementById('txTruckDropdownList');
    if (!listEl) return;
    const q = (val || '').toUpperCase().trim();
    const matched = this.truckMasterList.filter(t => t.includes(q));

    if (matched.length === 0) {
      listEl.innerHTML = `<li class="dropdown-item text-muted small">No truck matching "${val}"</li>`;
    } else {
      listEl.innerHTML = matched.slice(0, 30).map(t => `
        <li><a class="dropdown-item py-1" href="javascript:void(0)" onclick="ShahpuraModule.selectTruckCombobox('${t}')">${t}</a></li>
      `).join('');
    }
    listEl.classList.add('show');
  },

  selectTruckCombobox(truckNo) {
    document.getElementById('txTruckInput').value = truckNo;
    document.getElementById('txTruckDropdownList').classList.remove('show');

    const foundDriver = this.driverMasterList.find(d => d.truckNo === truckNo);
    if (foundDriver) {
      const driverIn = document.getElementById('txDriverInput');
      if (driverIn && !driverIn.value) driverIn.value = foundDriver.name;
      const phoneIn = document.getElementById('txPhone');
      if (phoneIn && !phoneIn.value) phoneIn.value = foundDriver.phone;
    }
  },

  filterDriverCombobox(val) {
    const listEl = document.getElementById('txDriverDropdownList');
    if (!listEl) return;
    const q = (val || '').toLowerCase().trim();
    const matched = this.driverMasterList.filter(d => d.name.toLowerCase().includes(q) || (d.phone && d.phone.includes(q)));

    if (matched.length === 0) {
      listEl.innerHTML = `<li class="dropdown-item text-muted small">No driver matching "${val}"</li>`;
    } else {
      listEl.innerHTML = matched.slice(0, 30).map(d => `
        <li><a class="dropdown-item py-1" href="javascript:void(0)" onclick="ShahpuraModule.selectDriverCombobox('${d.name}', '${d.phone}', '${d.truckNo}')">${d.name}</a></li>
      `).join('');
    }
    listEl.classList.add('show');
  },

  selectDriverCombobox(name, phone, truckNo) {
    document.getElementById('txDriverInput').value = name;
    const phoneEl = document.getElementById('txPhone');
    if (phone && phoneEl) phoneEl.value = phone;
    if (truckNo) {
      const truckIn = document.getElementById('txTruckInput');
      if (truckIn && !truckIn.value) truckIn.value = truckNo;
    }
    document.getElementById('txDriverDropdownList').classList.remove('show');
  },

  showOriginDropdown() {
    const listEl = document.getElementById('txOriginDropdownList');
    if (!listEl) return;
    this.filterOriginDropdown(document.getElementById('txOrigin').value);
  },

  filterOriginDropdown(val) {
    const listEl = document.getElementById('txOriginDropdownList');
    if (!listEl) return;
    const q = (val || '').toLowerCase().trim();
    const matched = this.originMasterList.filter(o => o.toLowerCase().includes(q));

    listEl.innerHTML = matched.map(o => `
      <li>
        <a class="dropdown-item py-1 d-flex align-items-center gap-2" href="javascript:void(0)" onclick="ShahpuraModule.selectOrigin('${o}')">
          <span class="appsheet-circle-dot red-dot">●</span> ${o}
        </a>
      </li>
    `).join('');
    listEl.classList.add('show');
  },

  selectOrigin(origin) {
    document.getElementById('txOrigin').value = origin;
    document.getElementById('txOriginDropdownList').classList.remove('show');
  },

  showDestDropdown() {
    const listEl = document.getElementById('txDestDropdownList');
    if (!listEl) return;
    this.filterDestDropdown(document.getElementById('txDestination').value);
  },

  filterDestDropdown(val) {
    const listEl = document.getElementById('txDestDropdownList');
    if (!listEl) return;
    const q = (val || '').toLowerCase().trim();
    const matched = this.destMasterList.filter(d => d.toLowerCase().includes(q));

    listEl.innerHTML = matched.map(d => `
      <li>
        <a class="dropdown-item py-1 d-flex align-items-center gap-2" href="javascript:void(0)" onclick="ShahpuraModule.selectDest('${d}')">
          <span class="appsheet-circle-dot red-dot">●</span> ${d}
        </a>
      </li>
    `).join('');
    listEl.classList.add('show');
  },

  selectDest(dest) {
    document.getElementById('txDestination').value = dest;
    document.getElementById('txDestDropdownList').classList.remove('show');
  },

  setupListeners() {
    document.addEventListener('click', (e) => {
      const truckDrop = document.getElementById('txTruckDropdownList');
      if (truckDrop && !e.target.closest('#txTruckComboboxWrapper')) {
        truckDrop.classList.remove('show');
      }
      const driverDrop = document.getElementById('txDriverDropdownList');
      if (driverDrop && !e.target.closest('#txDriverComboboxWrapper')) {
        driverDrop.classList.remove('show');
      }
      const originDrop = document.getElementById('txOriginDropdownList');
      if (originDrop && !e.target.closest('#txOriginWrapper')) {
        originDrop.classList.remove('show');
      }
      const destDrop = document.getElementById('txDestDropdownList');
      if (destDrop && !e.target.closest('#txDestWrapper')) {
        destDrop.classList.remove('show');
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.ShahpuraModule = ShahpuraModule;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShahpuraModule;
}
