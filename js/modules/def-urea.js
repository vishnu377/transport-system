/**
 * Module 8: DEF Urea Module Controller (1:1 Google AppSheet Visual Fidelity)
 * Features:
 * - 2-Card Split Layout (DEF Urea Stock 38% & Consumed Details 62%)
 * - Fixed Expand [↗] & Collapse [↙] Engine (No blank/0px width glitch)
 * - Card 1:
 *     1. Vertical Bar Chart with scale 0-210, Green (Buckets: 194), Red (Litres: 11), Slanted Date
 *     2. Table View toggle [⊞] -> "Inventory Slice" (DateTime, Buckets, Litres, Available)
 *     3. Inventory Detail View (Side-by-side or full card on row click)
 *     4. Add Stock Slide Drawer ("✕ Add", DateTime, Qty in Bucket, Cancel, Save)
 * - Card 2:
 *     1. Date-Grouped Consumed Table with exact Pill Badges (140, 120, 100, 235, 40, 245, etc.)
 *     2. Call Icon button on each row linking to driver phone
 *     3. Consumed Record Detail View (Home > DEF Urea > Consumed Details > [Date], Prev/Next, Edit)
 *     4. Consumed Urea Details Slide Drawer (1:1 AppSheet 2-Column Desktop Form):
 *        - Date (DD-MM-YYYY)
 *        - Available Stock (Litres: 3,891 read-only)
 *        - Qty (Litre)
 *        - Truck No. (Dropdown with all fleet trucks)
 *        - Driver (Dropdown with all 106+ authentic drivers!)
 *        - Mobile No. (Auto-filled)
 *        - Is Empty Bucket Returned? ([Yes] / [No] Segmented toggle)
 *        - Amount Paid (₹ 0)
 *        - No. of Buckets Retuned (Integrated [−] and [+] Stepper)
 * - Zero Browser LocalStorage (Firebase Cloud Firestore / Memory only)
 */

const DefUreaModule = {
  allStock: [],
  allConsumed: [],
  filteredConsumed: [],
  stockViewMode: 'chart', // 'chart' | 'table' | 'detail'
  expandedCard: null, // null | 'stock' | 'consumed'
  currentConsumedIndex: -1,
  currentConsumedRecord: null,
  currentStockRecord: null,
  searchQuery: '',

  async init() {
    console.log('[DefUreaModule] Initializing with 1:1 AppSheet fidelity...');
    await this.loadData();
    this.renderStockCard();
    this.renderConsumedTable();
    this.populateFleetDropdowns();
    this.setupListeners();
    console.log('[DefUreaModule] Initialized successfully.');
  },

  async loadData() {
    try {
      if (typeof dbService !== 'undefined') {
        this.allStock = await dbService.getAllDefStockAsync();
        this.allConsumed = await dbService.getAllDefConsumedAsync();
      } else if (typeof window !== 'undefined') {
        this.allStock = window.INITIAL_DEF_STOCK_INWARD || [];
        this.allConsumed = window.INITIAL_DEF_CONSUMED || [];
      }
    } catch (err) {
      console.warn('[DefUreaModule] LoadData error, using window defaults:', err);
      this.allStock = (typeof window !== 'undefined' && window.INITIAL_DEF_STOCK_INWARD) || [];
      this.allConsumed = (typeof window !== 'undefined' && window.INITIAL_DEF_CONSUMED) || [];
    }

    if (!Array.isArray(this.allStock)) this.allStock = [];
    if (!Array.isArray(this.allConsumed)) this.allConsumed = [];

    // Baseline stock record if empty
    if (this.allStock.length === 0) {
      this.allStock = [{
        id: 'def-stock-1',
        dateTime: '30/10/2026, 09:32:52 pm',
        date: '30/10/2026',
        qtyInBucket: 0,
        qtyInLitre: 0,
        availableBuckets: 194,
        availableLitres: 11,
        totalAvailableLitres: 3891
      }];
    }

    this.filteredConsumed = [...this.allConsumed];
  },

  formatNumber(val) {
    const num = parseFloat(val) || 0;
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  },

  getStockMetrics() {
    const latestStock = this.allStock[0] || { availableBuckets: 194, availableLitres: 11 };
    const buckets = parseInt(latestStock.availableBuckets) || 194;
    const litres = parseInt(latestStock.availableLitres) || 11;
    const totalLitres = (buckets * 20) + litres;
    const timestamp = latestStock.dateTime || '30/10/2026, 09:32:52 pm';

    return {
      buckets,
      litres,
      totalLitres,
      timestamp
    };
  },

  // ========================================================
  // EXPAND / CONTRACT ENGINE matching AppSheet [↗] / [↙]
  // (Fix: Always use 1fr so the single visible card gets 100% width)
  // ========================================================
  toggleExpand(cardName) {
    const grid = document.getElementById('defUreaGrid');
    const cardStock = document.getElementById('cardDefStock');
    const cardConsumed = document.getElementById('cardConsumedDetails');
    const btnExpandStock = document.getElementById('btn-expand-stock');
    const btnExpandConsumed = document.getElementById('btn-expand-consumed');

    if (this.expandedCard === cardName) {
      // Contract back to 2-Card Split Layout (38% / 62%)
      this.expandedCard = null;
      if (grid) {
        grid.classList.remove('grid-expanded-stock', 'grid-expanded-consumed');
        grid.style.gridTemplateColumns = '38% 62%';
      }
      if (cardStock) {
        cardStock.style.display = 'flex';
        cardStock.style.width = '100%';
        cardStock.classList.remove('panel-expanded');
      }
      if (cardConsumed) {
        cardConsumed.style.display = 'flex';
        cardConsumed.style.width = '100%';
        cardConsumed.classList.remove('panel-expanded');
      }
      if (btnExpandStock) {
        btnExpandStock.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        btnExpandStock.title = 'Expand to Full View';
      }
      if (btnExpandConsumed) {
        btnExpandConsumed.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        btnExpandConsumed.title = 'Expand to Full View';
      }
    } else {
      // Expand the selected card to 100% full width
      this.expandedCard = cardName;
      if (cardName === 'stock') {
        if (grid) {
          grid.classList.add('grid-expanded-stock');
          grid.classList.remove('grid-expanded-consumed');
          grid.style.gridTemplateColumns = '1fr';
        }
        if (cardStock) {
          cardStock.style.display = 'flex';
          cardStock.style.width = '100%';
          cardStock.classList.add('panel-expanded');
        }
        if (cardConsumed) {
          cardConsumed.style.display = 'none';
          cardConsumed.classList.remove('panel-expanded');
        }
        if (btnExpandStock) {
          btnExpandStock.innerHTML = '<i class="bi bi-arrows-angle-contract"></i>';
          btnExpandStock.title = 'Collapse to Split View';
        }
      } else {
        // Expand Card 2 (Consumed Details)
        if (grid) {
          grid.classList.add('grid-expanded-consumed');
          grid.classList.remove('grid-expanded-stock');
          grid.style.gridTemplateColumns = '1fr';
        }
        if (cardConsumed) {
          cardConsumed.style.display = 'flex';
          cardConsumed.style.width = '100%';
          cardConsumed.classList.add('panel-expanded');
        }
        if (cardStock) {
          cardStock.style.display = 'none';
          cardStock.classList.remove('panel-expanded');
        }
        if (btnExpandConsumed) {
          btnExpandConsumed.innerHTML = '<i class="bi bi-arrows-angle-contract"></i>';
          btnExpandConsumed.title = 'Collapse to Split View';
        }
      }
    }

    // Refresh views to adjust responsive widths
    this.renderStockCard();
  },

  // ========================================================
  // CARD 1: DEF UREA STOCK (CHART / TABLE / DETAIL)
  // ========================================================
  renderStockCard() {
    const cardBody = document.getElementById('stock-card-content');
    const headerTitle = document.getElementById('stock-card-title');
    const btnToggle = document.getElementById('btn-stock-toggle-view');
    const metrics = this.getStockMetrics();

    if (!cardBody) return;

    if (this.stockViewMode === 'chart') {
      if (headerTitle) headerTitle.innerText = 'DEF Urea Stock';
      if (btnToggle) {
        btnToggle.innerHTML = '<i class="bi bi-table"></i>';
        btnToggle.title = 'View Inventory Slice Table';
      }
      this.renderStockChart(cardBody, metrics);
    } else if (this.stockViewMode === 'table') {
      if (headerTitle) headerTitle.innerHTML = 'DEF Urea Stock <span class="text-muted fw-normal fs-6 ms-1">> Inventory Slice</span>';
      if (btnToggle) {
        btnToggle.innerHTML = '<i class="bi bi-bar-chart-fill"></i>';
        btnToggle.title = 'View Stock Bar Chart';
      }
      this.renderStockTable(cardBody, metrics);
    } else if (this.stockViewMode === 'detail') {
      if (headerTitle) headerTitle.innerHTML = 'DEF Urea Stock <span class="text-muted fw-normal fs-6 ms-1">> Inventory Detail</span>';
      this.renderInventoryDetail(cardBody, this.currentStockRecord || metrics);
    }
  },

  toggleStockViewMode() {
    if (this.stockViewMode === 'chart') {
      this.stockViewMode = 'table';
    } else {
      this.stockViewMode = 'chart';
    }
    this.renderStockCard();
  },

  // 1A. Authentic Bar Chart View (0-210 Scale)
  renderStockChart(container, metrics) {
    const maxScale = 210;
    const greenHeightPct = Math.min(100, Math.max(0, (metrics.buckets / maxScale) * 100));
    const redHeightPct = Math.min(100, Math.max(0, (metrics.litres / maxScale) * 100));

    let html = `
      <div class="def-chart-wrapper position-relative w-100 h-100 d-flex flex-column" style="min-height: 480px; padding: 20px 24px 30px 48px; background: #ffffff;">
        
        <!-- Top Right Tooltip Card matching AppSheet screenshot -->
        <div class="appsheet-tooltip-card position-absolute shadow-sm" style="top: 16px; right: 24px; background: #ffffff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 10px 14px; font-size: 0.82rem; z-index: 10; min-width: 220px;">
          <div class="text-secondary mb-2" style="font-size: 0.78rem;">${metrics.timestamp}</div>
          <div class="d-flex align-items-center justify-content-between gap-3 mb-1">
            <div class="d-flex align-items-center gap-2">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #00b11f;"></span>
              <span class="text-dark">Available Stock (Buckets)</span>
            </div>
            <span class="fw-bold text-dark font-monospace">${metrics.buckets}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-2">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #d32f2f;"></span>
              <span class="text-dark">Available Stock (Litres)</span>
            </div>
            <span class="fw-bold text-dark font-monospace">${metrics.litres}</span>
          </div>
        </div>

        <!-- Vertical Chart Area -->
        <div class="def-chart-body position-relative flex-grow-1 d-flex" style="border-left: 1px solid #d0d7de; border-bottom: 1px solid #5f6368; margin-top: 20px; margin-bottom: 40px;">
          
          <!-- Y-Axis Gridlines & Ticks (0, 30, 60, 90, 120, 150, 180, 210) -->
          <div class="chart-y-axis position-absolute" style="left: -42px; top: 0; bottom: 0; width: 36px; display: flex; flex-direction: column; justify-content: space-between; text-align: right; font-size: 0.75rem; color: #5f6368; font-family: monospace;">
            <span>210</span>
            <span>180</span>
            <span>150</span>
            <span>120</span>
            <span>90</span>
            <span>60</span>
            <span>30</span>
            <span>0</span>
          </div>

          <!-- Horizontal Gridlines across chart -->
          <div class="position-absolute w-100 h-100" style="pointer-events: none;">
            <div style="position: absolute; top: 0%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
            <div style="position: absolute; top: 14.28%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
            <div style="position: absolute; top: 28.57%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
            <div style="position: absolute; top: 42.85%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
            <div style="position: absolute; top: 57.14%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
            <div style="position: absolute; top: 71.42%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
            <div style="position: absolute; top: 85.71%; left: 0; right: 0; border-top: 1px solid #f0f2f5;"></div>
          </div>

          <!-- Vertical Dashed Divider between Green Bar and Red Bar -->
          <div class="position-absolute h-100" style="left: 50%; top: 0; border-left: 1px dashed #d0d7de; z-index: 1;"></div>

          <!-- Bars Container -->
          <div class="w-100 h-100 d-flex align-items-end position-relative" style="z-index: 2;">
            
            <!-- Green Bar: Available Stock (Buckets) -->
            <div class="d-flex flex-column align-items-center justify-content-end" style="width: 50%; height: 100%;">
              <div class="appsheet-bar-green transition-all" 
                   style="width: 78%; max-width: 260px; height: ${greenHeightPct}%; background: #00b11f; border-radius: 1px 1px 0 0;"
                   title="Available Stock (Buckets): ${metrics.buckets}">
              </div>
            </div>

            <!-- Red Bar: Available Stock (Litres) -->
            <div class="d-flex flex-column align-items-center justify-content-end" style="width: 50%; height: 100%;">
              <div class="appsheet-bar-red transition-all" 
                   style="width: 78%; max-width: 260px; height: ${redHeightPct}%; background: #d32f2f; border-radius: 1px 1px 0 0;"
                   title="Available Stock (Litres): ${metrics.litres}">
              </div>
            </div>

          </div>

          <!-- Slanted X-Axis Date Timestamp -->
          <div class="position-absolute" style="left: 50%; bottom: -32px; transform: translateX(-50%) rotate(-45deg); transform-origin: top left; font-size: 0.72rem; color: #5f6368; font-family: monospace; white-space: nowrap;">
            ${metrics.timestamp.substring(0, 18)}...
          </div>

          <!-- Bottom Right Vertical Label 'DateTime' -->
          <div class="position-absolute" style="right: -24px; bottom: 8px; transform: rotate(-90deg); transform-origin: right bottom; font-size: 0.75rem; color: #5f6368;">
            DateTime
          </div>

        </div>

        <!-- Quick Summary Bar at Bottom -->
        <div class="d-flex align-items-center justify-content-between pt-2 border-top text-muted" style="font-size: 0.8rem;">
          <div><i class="bi bi-box-seam me-1"></i> Total Volume: <strong class="text-dark font-monospace">${this.formatNumber(metrics.totalLitres)} Litres</strong></div>
          <div><i class="bi bi-clock-history me-1"></i> Last calibrated: <span class="font-monospace">${metrics.timestamp}</span></div>
        </div>

      </div>
    `;

    container.innerHTML = html;
  },

  // 1B. Authentic Table View ("Inventory Slice")
  renderStockTable(container, metrics) {
    let rowsHtml = '';
    this.allStock.forEach((st, idx) => {
      const isSelected = this.currentStockRecord && this.currentStockRecord.id === st.id;
      rowsHtml += `
        <tr class="appsheet-data-row ${isSelected ? 'row-selected' : ''}" 
            style="cursor: pointer; ${isSelected ? 'background: #f8f6ea !important;' : ''}" 
            onclick="DefUreaModule.openInventoryDetail('${st.id || idx}')" 
            title="Click to view Inventory Detail">
          <td class="ps-3 font-monospace text-secondary">${st.dateTime || metrics.timestamp}</td>
          <td class="text-center font-monospace">${st.qtyInBucket || ''}</td>
          <td class="text-center font-monospace">${st.qtyInLitre || ''}</td>
          <td class="text-end pe-3 font-monospace fw-semibold">${st.availableBuckets || metrics.buckets}</td>
          <td class="text-end pe-3 font-monospace fw-semibold">${st.availableLitres || metrics.litres}</td>
          <td class="text-center text-muted pe-2" style="width: 32px;"><i class="bi bi-chevron-right small"></i></td>
        </tr>
      `;
    });

    let html = `
      <div class="d-flex flex-column w-100 h-100">
        <div class="table-responsive flex-grow-1" style="overflow-y: auto;">
          <table class="table table-hover align-middle mb-0 appsheet-table" style="font-size: 0.82rem;">
            <thead class="sticky-top bg-white border-bottom">
              <tr>
                <th class="ps-3 py-2 text-secondary" style="min-width: 170px;">DateTime</th>
                <th class="text-center py-2 text-secondary" style="width: 110px;">Qty in Bucket</th>
                <th class="text-center py-2 text-secondary" style="width: 100px;">Qty in Litre</th>
                <th class="text-end pe-3 py-2 text-secondary" style="width: 160px;">Available Stock (Buck...</th>
                <th class="text-end pe-3 py-2 text-secondary" style="width: 150px;">Available Stock (Litr...</th>
                <th style="width: 32px;"></th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // 1C. Inventory Detail View matching screenshot screencapture-appsheet-start-...-13_16_42.png
  openInventoryDetail(id) {
    const item = this.allStock.find(s => s.id === id) || this.allStock[0];
    this.currentStockRecord = item;
    this.stockViewMode = 'detail';
    this.renderStockCard();
  },

  closeInventoryDetail() {
    this.stockViewMode = 'table';
    this.currentStockRecord = null;
    this.renderStockCard();
  },

  renderInventoryDetail(container, item) {
    const metrics = this.getStockMetrics();
    const dTime = item.dateTime || metrics.timestamp;
    const bCount = item.availableBuckets || metrics.buckets;
    const lCount = item.availableLitres || metrics.litres;

    let html = `
      <div class="p-4 w-100 h-100 d-flex flex-column" style="background: #ffffff;">
        <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
          <h6 class="fw-semibold text-dark m-0">Inventory Detail</h6>
          <div class="d-flex align-items-center gap-1">
            <button class="btn btn-sm btn-light border py-1 px-2" title="Back to table" onclick="DefUreaModule.closeInventoryDetail()">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        <div class="card border rounded-2 p-3 shadow-sm mx-auto" style="max-width: 520px; width: 100%;">
          <div class="row py-2 border-bottom">
            <div class="col-6 text-secondary" style="font-size: 0.85rem;">DateTime</div>
            <div class="col-6 text-dark font-monospace fw-semibold" style="font-size: 0.85rem;">${dTime}</div>
          </div>
          <div class="row py-2 border-bottom">
            <div class="col-6 text-secondary" style="font-size: 0.85rem;">Available Stock (Buckets)</div>
            <div class="col-6 text-dark font-monospace fw-bold fs-6" style="color: #00b11f !important;">${bCount}</div>
          </div>
          <div class="row py-2">
            <div class="col-6 text-secondary" style="font-size: 0.85rem;">Available Stock (Litres)</div>
            <div class="col-6 text-dark font-monospace fw-bold fs-6" style="color: #d32f2f !important;">${lCount}</div>
          </div>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-sm btn-outline-secondary px-3" onclick="DefUreaModule.closeInventoryDetail()">
            <i class="bi bi-arrow-left me-1"></i> Back to Inventory Slice
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // 1D. Slide Drawer: Add Inward Stock
  openAddStockDrawer() {
    const drawer = document.getElementById('defStockDrawer');
    const backdrop = document.getElementById('defDrawerBackdrop');
    if (!drawer) return;

    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const formattedDateTime = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const dateInput = document.getElementById('stock-input-datetime');
    if (dateInput) dateInput.value = formattedDateTime;
    const qtyInput = document.getElementById('stock-input-qty-bucket');
    if (qtyInput) qtyInput.value = '0';

    if (backdrop) backdrop.classList.add('show');
    drawer.classList.add('open');
  },

  closeStockDrawer() {
    const drawer = document.getElementById('defStockDrawer');
    const backdrop = document.getElementById('defDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  async saveStockDrawer() {
    const dateInput = document.getElementById('stock-input-datetime');
    const qtyInput = document.getElementById('stock-input-qty-bucket');

    const dt = dateInput ? dateInput.value.trim() : '';
    const bucketsIn = parseInt(qtyInput ? qtyInput.value : 0) || 0;

    if (bucketsIn <= 0) {
      this.showToast('Please enter a valid quantity of buckets (greater than 0)', 'warning');
      return;
    }

    const currentMetrics = this.getStockMetrics();
    const newBuckets = currentMetrics.buckets + bucketsIn;
    const newLitres = currentMetrics.litres;
    const newTotal = (newBuckets * 20) + newLitres;

    const newStockRecord = {
      id: 'def-in-' + Date.now(),
      dateTime: dt || new Date().toLocaleString('en-IN'),
      qtyInBucket: bucketsIn,
      qtyInLitre: bucketsIn * 20,
      availableBuckets: newBuckets,
      availableLitres: newLitres,
      totalAvailableLitres: newTotal,
      supplier: 'Garage Stock Inward',
      remarks: 'Added via Add Stock Drawer'
    };

    if (typeof dbService !== 'undefined') {
      await dbService.saveDefStock(newStockRecord);
    }
    this.allStock.unshift(newStockRecord);

    this.closeStockDrawer();
    this.renderStockCard();
    this.showToast(`Successfully added ${bucketsIn} buckets (${bucketsIn * 20}L) to stock!`, 'success');
  },

  // ========================================================
  // CARD 2: CONSUMED DETAILS (TABLE / DETAIL / DRAWER)
  // ========================================================
  renderConsumedTable() {
    const container = document.getElementById('consumed-table-container');
    if (!container) return;

    // Group records by Date
    const grouped = {};
    this.filteredConsumed.forEach(item => {
      const d = item.date || 'Other';
      if (!grouped[d]) grouped[d] = [];
      grouped[d].push(item);
    });

    let html = `
      <div class="table-responsive h-100 w-100" id="consumed-scroll-wrap" style="overflow-y: auto;">
        <table class="table table-hover align-middle mb-0 appsheet-table w-100" style="font-size: 0.82rem;">
          <thead class="sticky-top bg-white border-bottom shadow-xs">
            <tr class="text-secondary" style="font-size: 0.78rem;">
              <th class="ps-3 py-2" style="width: 105px;">Date</th>
              <th class="text-end py-2" style="width: 115px;">Filled Qty (Litre)</th>
              <th class="py-2" style="width: 110px;">Truck No.</th>
              <th class="py-2" style="min-width: 190px;">Driver</th>
              <th class="text-center py-2" style="width: 36px;"></th>
              <th class="text-end py-2" style="width: 95px;">Amount Paid</th>
              <th class="text-center py-2" style="width: 130px;">Is Empty Bucket Retu...</th>
              <th class="text-center py-2" style="width: 120px;">No. of Buckets not ...</th>
              <th class="text-center py-2" style="width: 110px;">No. of Buckets R...</th>
              <th class="py-2" style="width: 32px;"></th>
            </tr>
          </thead>
          <tbody>
    `;

    Object.keys(grouped).forEach(date => {
      const items = grouped[date];
      const groupSum = items.reduce((sum, it) => sum + (parseFloat(it.filledQty) || 0), 0);

      // Date Group Header with Rounded Pill Badge (e.g. 30/10/2026 [140])
      html += `
        <tr class="appsheet-group-header-row" style="background: #f6f8fa; border-top: 1px solid #e1e4e8; border-bottom: 1px solid #e1e4e8;">
          <td colspan="10" class="py-2 ps-3 fw-bold text-dark font-monospace" style="font-size: 0.82rem;">
            <span>${date}</span>
            <span class="badge rounded-pill px-2 py-1 ms-2 font-monospace fw-normal" style="background: #6c757d; color: #ffffff; font-size: 0.74rem;">${groupSum}</span>
          </td>
        </tr>
      `;

      items.forEach(item => {
        const safeId = item.id || '';
        const driverText = item.driverName ? `${item.driverName} ${item.driverMobile || ''}`.trim() : (item.driver || '-');
        const amtText = item.amountPaid ? `₹ ${this.formatNumber(item.amountPaid)}` : '₹ 0';

        html += `
          <tr class="appsheet-data-row" style="cursor: pointer;" onclick="DefUreaModule.openConsumedRecordDetail('${safeId}')" title="Click to view details">
            <td class="ps-3 font-monospace text-secondary">${item.date || ''}</td>
            <td class="text-end font-monospace fw-semibold">${item.filledQty || 0}</td>
            <td class="font-monospace fw-bold text-primary">${item.truckNo || '-'}</td>
            <td>
              <span class="text-truncate d-inline-block" style="max-width: 220px;">${driverText}</span>
            </td>
            <td class="text-center">
              ${item.driverMobile ? `
                <a href="tel:${item.driverMobile}" onclick="event.stopPropagation()" class="text-secondary phone-link" title="Call ${item.driverMobile}">
                  <i class="bi bi-telephone-fill small"></i>
                </a>
              ` : ''}
            </td>
            <td class="text-end font-monospace">${amtText}</td>
            <td class="text-center">
              <span class="${item.isEmptyBucketReturned === 'No' ? 'text-danger fw-semibold' : 'text-dark'}">${item.isEmptyBucketReturned || 'Yes'}</span>
            </td>
            <td class="text-center font-monospace">${item.bucketsNotReturned || ''}</td>
            <td class="text-center font-monospace">${item.bucketsReturned || ''}</td>
            <td class="text-center text-muted pe-2">
              <i class="bi bi-chevron-right small"></i>
            </td>
          </tr>
        `;
      });
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  },

  // 2B. Consumed Record Detail View matching screencapture-appsheet-start-...-13_22_44.png
  openConsumedRecordDetail(id) {
    const idx = this.filteredConsumed.findIndex(c => String(c.id) === String(id));
    if (idx === -1 && this.filteredConsumed.length > 0) {
      this.currentConsumedIndex = 0;
      this.currentConsumedRecord = this.filteredConsumed[0];
    } else {
      this.currentConsumedIndex = idx;
      this.currentConsumedRecord = this.filteredConsumed[idx];
    }

    const detailView = document.getElementById('consumedRecordDetailView');
    const tableView = document.getElementById('consumedTableView');
    const headerBar = document.getElementById('card2HeaderBar');

    if (tableView) tableView.style.display = 'none';
    if (detailView) detailView.style.display = 'flex';
    if (headerBar) headerBar.style.display = 'none';

    this.renderConsumedRecordDetail();
  },

  closeConsumedRecordDetail() {
    const detailView = document.getElementById('consumedRecordDetailView');
    const tableView = document.getElementById('consumedTableView');
    const headerBar = document.getElementById('card2HeaderBar');

    if (detailView) detailView.style.display = 'none';
    if (tableView) tableView.style.display = 'block';
    if (headerBar) headerBar.style.display = 'flex';

    this.currentConsumedRecord = null;
    this.currentConsumedIndex = -1;
  },

  navigateConsumedRecord(direction) {
    const newIdx = this.currentConsumedIndex + direction;
    if (newIdx >= 0 && newIdx < this.filteredConsumed.length) {
      this.currentConsumedIndex = newIdx;
      this.currentConsumedRecord = this.filteredConsumed[newIdx];
      this.renderConsumedRecordDetail();
    }
  },

  renderConsumedRecordDetail() {
    const container = document.getElementById('consumedRecordDetailView');
    if (!container || !this.currentConsumedRecord) return;

    const item = this.currentConsumedRecord;
    const totalCount = this.filteredConsumed.length;
    const currentNum = this.currentConsumedIndex + 1;
    const hasPrev = this.currentConsumedIndex > 0;
    const hasNext = this.currentConsumedIndex < totalCount - 1;

    const driverNameOnly = item.driverName || item.driver || '';
    const driverMob = item.driverMobile || '';
    const driverFullDisplay = driverMob ? `${driverNameOnly} ${driverMob}`.trim() : driverNameOnly;
    const availStockDisplay = item.availableStock ? this.formatNumber(item.availableStock) : '3,931';

    let html = `
      <div class="d-flex flex-column w-100 h-100" style="background: #ffffff;">
        
        <!-- Top Action Bar for Detail View -->
        <div class="d-flex align-items-center justify-content-between px-3 py-2 border-bottom" style="background: #ffffff; min-height: 44px;">
          <div class="d-flex align-items-center gap-2" style="font-size: 0.84rem;">
            <span class="text-secondary">Home</span>
            <span class="text-muted">></span>
            <span class="text-secondary" style="cursor: pointer;" onclick="DefUreaModule.closeConsumedRecordDetail()">DEF Urea</span>
            <span class="text-muted">></span>
            <span class="text-secondary" style="cursor: pointer;" onclick="DefUreaModule.closeConsumedRecordDetail()">Consumed Details</span>
            <span class="text-muted">></span>
            <span class="fw-semibold text-dark">${item.date || ''}</span>
          </div>

          <div class="d-flex align-items-center gap-1">
            <button class="btn btn-sm btn-light border py-1 px-2" title="Previous record" ${hasPrev ? '' : 'disabled'} onclick="DefUreaModule.navigateConsumedRecord(-1)">
              <i class="bi bi-chevron-left small"></i>
            </button>
            <button class="btn btn-sm btn-light border py-1 px-2" title="Next record" ${hasNext ? '' : 'disabled'} onclick="DefUreaModule.navigateConsumedRecord(1)">
              <i class="bi bi-chevron-right small"></i>
            </button>
            <button class="btn btn-sm btn-light border py-1 px-2" title="Edit this record" onclick="DefUreaModule.openEditConsumedDrawer('${item.id}')">
              <i class="bi bi-pencil small"></i>
            </button>
            <button class="btn btn-sm btn-light border py-1 px-2" title="Close" onclick="DefUreaModule.closeConsumedRecordDetail()">
              <i class="bi bi-x-lg small"></i>
            </button>
          </div>
        </div>

        <!-- Centered Card Detail matching screencapture-appsheet-start-...-13_22_44.png -->
        <div class="flex-grow-1 p-4 d-flex justify-content-center align-items-start" style="background: #ffffff; overflow-y: auto;">
          <div class="card border rounded-2 p-4 shadow-xs" style="max-width: 600px; width: 100%;">
            
            <div class="row py-2 border-bottom">
              <div class="col-5 text-secondary" style="font-size: 0.85rem;">Date</div>
              <div class="col-7 font-monospace text-dark fw-semibold" style="font-size: 0.85rem;">${item.date || ''}</div>
            </div>

            <div class="row py-2 border-bottom">
              <div class="col-5 text-secondary" style="font-size: 0.85rem;">Truck No.</div>
              <div class="col-7 font-monospace text-primary fw-bold" style="font-size: 0.85rem;">${item.truckNo || '-'}</div>
            </div>

            <div class="row py-2 border-bottom">
              <div class="col-5 text-secondary" style="font-size: 0.85rem;">Driver</div>
              <div class="col-7 text-dark" style="font-size: 0.85rem;">${driverFullDisplay}</div>
            </div>

            <div class="row py-2 border-bottom">
              <div class="col-5 text-secondary" style="font-size: 0.85rem;">Mobile No.</div>
              <div class="col-7 font-monospace text-dark d-flex align-items-center gap-2" style="font-size: 0.85rem;">
                <span>${driverMob || '-'}</span>
                ${driverMob ? `
                  <a href="tel:${driverMob}" class="text-secondary phone-link" title="Call Driver">
                    <i class="bi bi-telephone-fill text-muted small"></i>
                  </a>
                ` : ''}
              </div>
            </div>

            <div class="row py-2 border-bottom">
              <div class="col-5 text-secondary" style="font-size: 0.85rem;">Available Stock (Litres)</div>
              <div class="col-7 font-monospace text-dark fw-bold" style="font-size: 0.85rem;">${availStockDisplay}</div>
            </div>

            <div class="row py-2">
              <div class="col-5 text-secondary" style="font-size: 0.85rem;">Qty (Litre)</div>
              <div class="col-7 font-monospace text-dark fw-bold fs-6" style="font-size: 0.95rem;">${item.filledQty || 0}</div>
            </div>

          </div>
        </div>

      </div>
    `;

    container.innerHTML = html;
  },

  // ========================================================
  // POPULATE FLEET TRUCKS & DRIVERS DROPDOWNS
  // ========================================================
  populateFleetDropdowns() {
    // 1. Truck Select
    const truckSelect = document.getElementById('consumed-input-truck');
    if (truckSelect) {
      const truckSet = new Set();
      this.allConsumed.forEach(c => { if (c.truckNo) truckSet.add(c.truckNo.trim().toUpperCase()); });

      if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS)) {
        window.INITIAL_DRIVERS.forEach(d => { if (d.truckNo) truckSet.add(d.truckNo.trim().toUpperCase()); });
      }
      if (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_OWNER_DUES)) {
        window.SAMPLE_OWNER_DUES.forEach(d => { if (d.truckNo) truckSet.add(d.truckNo.trim().toUpperCase()); });
      }

      let truckHtml = '<option value="">-- Select Truck No. --</option>';
      Array.from(truckSet).sort().forEach(t => {
        truckHtml += `<option value="${t}">${t}</option>`;
      });
      truckSelect.innerHTML = truckHtml;
    }

    // 2. Driver Select (Populate with all 106+ authentic drivers!)
    const driverSelect = document.getElementById('consumed-input-driver-name');
    if (driverSelect) {
      const driverMap = new Map(); // name -> mobile

      // From INITIAL_DRIVERS
      if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS)) {
        window.INITIAL_DRIVERS.forEach(d => {
          if (d.name) {
            driverMap.set(d.name.trim(), d.mobile || '');
          }
        });
      }

      // From allConsumed
      this.allConsumed.forEach(c => {
        const name = (c.driverName || c.driver || '').trim();
        if (name && !driverMap.has(name)) {
          driverMap.set(name, c.driverMobile || '');
        }
      });

      let driverHtml = '<option value="">-- Select Driver --</option>';
      Array.from(driverMap.keys()).sort().forEach(name => {
        const mob = driverMap.get(name);
        const label = mob ? `${name} (${mob})` : name;
        driverHtml += `<option value="${name}">${label}</option>`;
      });
      driverSelect.innerHTML = driverHtml;
    }
  },

  handleDriverSelect(driverName) {
    const dName = (driverName || '').trim();
    if (!dName) return;

    let foundMob = '';
    let foundTruck = '';

    if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS)) {
      const match = window.INITIAL_DRIVERS.find(d => (d.name || '').trim().toLowerCase() === dName.toLowerCase());
      if (match) {
        foundMob = match.mobile || '';
        foundTruck = match.truckNo || '';
      }
    }

    if (!foundMob) {
      const matchC = this.allConsumed.find(c => (c.driverName || c.driver || '').trim().toLowerCase() === dName.toLowerCase());
      if (matchC) {
        foundMob = matchC.driverMobile || '';
        foundTruck = matchC.truckNo || '';
      }
    }

    const mobInput = document.getElementById('consumed-input-driver-mob');
    if (mobInput && foundMob) mobInput.value = foundMob;

    const truckSelect = document.getElementById('consumed-input-truck');
    if (truckSelect && foundTruck && !truckSelect.value) {
      truckSelect.value = foundTruck;
    }
  },

  handleTruckSelect(truckVal) {
    const truck = (truckVal || '').trim().toUpperCase();
    if (!truck) return;

    let foundDriver = '';
    let foundMob = '';

    const matchC = this.allConsumed.find(c => (c.truckNo || '').toUpperCase() === truck);
    if (matchC) {
      foundDriver = matchC.driverName || matchC.driver || '';
      foundMob = matchC.driverMobile || '';
    }

    if (!foundDriver && typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS)) {
      const matchD = window.INITIAL_DRIVERS.find(d => (d.truckNo || '').toUpperCase() === truck);
      if (matchD) {
        foundDriver = matchD.name || '';
        foundMob = matchD.mobile || '';
      }
    }

    const driverSelect = document.getElementById('consumed-input-driver-name');
    if (driverSelect && foundDriver) {
      driverSelect.value = foundDriver;
    }

    const mobInput = document.getElementById('consumed-input-driver-mob');
    if (mobInput && foundMob) mobInput.value = foundMob;
  },

  // 2C. Slide Drawer: Consumed Urea Details matching WhatsApp Image 2026-10-31 at 1.26.32 PM.jpeg
  openAddConsumedDrawer() {
    this.currentConsumedRecord = null;
    const drawer = document.getElementById('defConsumedDrawer');
    const backdrop = document.getElementById('defDrawerBackdrop');
    const title = document.getElementById('consumedDrawerTitle');
    const delBtn = document.getElementById('btn-delete-consumed');

    if (title) title.innerText = 'Consumed Urea Details';
    if (delBtn) delBtn.style.display = 'none';

    this.populateFleetDropdowns();

    // Default Date: DD-MM-YYYY
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const formattedDate = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;

    const metrics = this.getStockMetrics();
    document.getElementById('consumed-input-id').value = '';
    document.getElementById('consumed-input-date').value = formattedDate;
    document.getElementById('consumed-input-avail-stock').value = this.formatNumber(metrics.totalLitres);
    document.getElementById('consumed-input-qty').value = '0';
    document.getElementById('consumed-input-truck').value = '';
    document.getElementById('consumed-input-driver-name').value = '';
    document.getElementById('consumed-input-driver-mob').value = '';
    document.getElementById('consumed-input-amount').value = '0';
    
    // Reset Stepper
    this.setBucketStepper(0);
    this.setBucketReturnedToggle('Yes');

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  openEditConsumedDrawer(id) {
    const item = this.allConsumed.find(c => String(c.id) === String(id));
    if (!item) return;

    this.currentConsumedRecord = item;
    const drawer = document.getElementById('defConsumedDrawer');
    const backdrop = document.getElementById('defDrawerBackdrop');
    const title = document.getElementById('consumedDrawerTitle');
    const delBtn = document.getElementById('btn-delete-consumed');

    if (title) title.innerText = `Consumed Urea Details - ${item.truckNo || ''}`;
    if (delBtn) delBtn.style.display = 'inline-block';

    this.populateFleetDropdowns();

    document.getElementById('consumed-input-id').value = item.id;
    document.getElementById('consumed-input-date').value = item.date || '';
    document.getElementById('consumed-input-avail-stock').value = item.availableStock ? this.formatNumber(item.availableStock) : '3,891';
    document.getElementById('consumed-input-qty').value = item.filledQty || 0;
    document.getElementById('consumed-input-truck').value = item.truckNo || '';
    document.getElementById('consumed-input-driver-name').value = item.driverName || item.driver || '';
    document.getElementById('consumed-input-driver-mob').value = item.driverMobile || '';
    document.getElementById('consumed-input-amount').value = item.amountPaid || 0;
    
    this.setBucketStepper(item.bucketsReturned || 0);
    this.setBucketReturnedToggle(item.isEmptyBucketReturned || 'Yes');

    if (backdrop) backdrop.classList.add('show');
    if (drawer) drawer.classList.add('open');
  },

  closeConsumedDrawer() {
    const drawer = document.getElementById('defConsumedDrawer');
    const backdrop = document.getElementById('defDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  setBucketReturnedToggle(val) {
    const btnYes = document.getElementById('btn-toggle-bucket-yes');
    const btnNo = document.getElementById('btn-toggle-bucket-no');
    const hiddenInput = document.getElementById('consumed-input-is-returned');
    const notRetWrap = document.getElementById('wrap-buckets-not-returned');

    if (hiddenInput) hiddenInput.value = val;

    if (val === 'Yes') {
      if (btnYes) btnYes.className = 'segmented-btn active';
      if (btnNo) btnNo.className = 'segmented-btn';
      if (notRetWrap) notRetWrap.style.display = 'none';
    } else {
      if (btnYes) btnYes.className = 'segmented-btn';
      if (btnNo) btnNo.className = 'segmented-btn active text-danger';
      if (notRetWrap) notRetWrap.style.display = 'flex';
    }
  },

  setBucketStepper(val) {
    const hiddenInput = document.getElementById('consumed-input-buckets-ret');
    const displayEl = document.getElementById('display-buckets-ret');
    if (hiddenInput) hiddenInput.value = val;
    if (displayEl) displayEl.innerText = val;
  },

  adjustBucketCount(delta) {
    const hiddenInput = document.getElementById('consumed-input-buckets-ret');
    const displayEl = document.getElementById('display-buckets-ret');
    let val = parseInt(hiddenInput ? hiddenInput.value : 0) || 0;
    val += delta;
    if (val < 0) val = 0;
    if (hiddenInput) hiddenInput.value = val;
    if (displayEl) displayEl.innerText = val;
  },

  async saveConsumedDrawer() {
    const idInput = document.getElementById('consumed-input-id');
    const dateInput = document.getElementById('consumed-input-date');
    const qtyInput = document.getElementById('consumed-input-qty');
    const truckInput = document.getElementById('consumed-input-truck');
    const driverInput = document.getElementById('consumed-input-driver-name');
    const mobInput = document.getElementById('consumed-input-driver-mob');
    const returnedInput = document.getElementById('consumed-input-is-returned');
    const amtInput = document.getElementById('consumed-input-amount');
    const bucketsRetInput = document.getElementById('consumed-input-buckets-ret');
    const bucketsNotRetInput = document.getElementById('consumed-input-buckets-not-ret');

    const truckNo = (truckInput?.value || '').trim().toUpperCase();
    const qty = parseFloat(qtyInput?.value) || 0;

    if (!truckNo) {
      this.showToast('Please select or enter a Truck Number', 'warning');
      return;
    }
    if (qty <= 0) {
      this.showToast('Please enter Qty (Litre) greater than 0', 'warning');
      return;
    }

    const isEdit = !!(idInput && idInput.value);
    const metrics = this.getStockMetrics();

    const record = {
      id: isEdit ? idInput.value : ('def-c-' + Date.now()),
      date: dateInput?.value || '31/10/2026',
      filledQty: qty,
      truckNo,
      driverName: driverInput?.value || '',
      driverMobile: mobInput?.value || '',
      isEmptyBucketReturned: returnedInput?.value || 'Yes',
      amountPaid: parseFloat(amtInput?.value) || 0,
      bucketsReturned: parseInt(bucketsRetInput?.value) || 0,
      bucketsNotReturned: bucketsNotRetInput ? (parseInt(bucketsNotRetInput.value) || '') : '',
      availableStock: metrics.totalLitres
    };

    if (typeof dbService !== 'undefined') {
      await dbService.saveDefConsumed(record);
    }

    if (isEdit) {
      const idx = this.allConsumed.findIndex(c => c.id === record.id);
      if (idx !== -1) this.allConsumed[idx] = record;
    } else {
      this.allConsumed.unshift(record);
    }

    this.handleSearch(this.searchQuery);
    this.closeConsumedDrawer();

    if (this.currentConsumedRecord && this.currentConsumedRecord.id === record.id) {
      this.currentConsumedRecord = record;
      this.renderConsumedRecordDetail();
    }

    this.showToast(isEdit ? 'Record updated successfully!' : 'New consumed entry added successfully!', 'success');
  },

  async deleteCurrentConsumed() {
    if (!this.currentConsumedRecord) return;
    const recId = this.currentConsumedRecord.id;
    if (!confirm(`Are you sure you want to delete this entry for ${this.currentConsumedRecord.truckNo}?`)) return;

    if (typeof dbService !== 'undefined') {
      await dbService.deleteDefConsumed(recId);
    }

    this.allConsumed = this.allConsumed.filter(c => c.id !== recId);
    this.handleSearch(this.searchQuery);
    this.closeConsumedDrawer();
    this.closeConsumedRecordDetail();
    this.showToast('Record deleted successfully', 'info');
  },

  // ========================================================
  // REAL-TIME SEARCH & FILTERS
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    if (!this.searchQuery) {
      this.filteredConsumed = [...this.allConsumed];
    } else {
      this.filteredConsumed = this.allConsumed.filter(item => {
        const q = this.searchQuery;
        const dateMatch = (item.date || '').toLowerCase().includes(q);
        const truckMatch = (item.truckNo || '').toLowerCase().includes(q);
        const driverMatch = (item.driverName || item.driver || '').toLowerCase().includes(q);
        const mobMatch = (item.driverMobile || '').toLowerCase().includes(q);
        return dateMatch || truckMatch || driverMatch || mobMatch;
      });
    }

    this.renderConsumedTable();
  },

  closeDrawers() {
    this.closeStockDrawer();
    this.closeConsumedDrawer();
  },

  showToast(message, type = 'info') {
    if (typeof window !== 'undefined' && window.AppUI && window.AppUI.showToast) {
      window.AppUI.showToast(message, type);
    } else {
      console.log(`[Toast ${type.toUpperCase()}]: ${message}`);
      if (typeof window !== 'undefined') {
        window.lastToast = { message, type };
      }
    }
  },

  setupListeners() {
    const searchInput = document.getElementById('search-def-urea');
    if (searchInput) {
      searchInput.addEventListener('input', e => this.handleSearch(e.target.value));
    }

    // Keyboard navigation: Escape closes drawers/detail
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeDrawers();
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.DefUreaModule = DefUreaModule;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DefUreaModule;
}
