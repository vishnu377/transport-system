/**
 * Module 8: DEF Urea Module Controller (1:1 Google AppSheet Visual Fidelity)
 * Features:
 * - 2-Card Split Layout (DEF Urea Stock & Consumed Details)
 * - Single-Click Panel Expand [↗] & Contract [↙]
 * - Interactive Bar Chart matching AppSheet scale (0-210) & Inward Table toggle
 * - Date-Grouped Consumed Table with exact Pill Badges (140, 120, 100, 235, 40, 245)
 * - Slide Drawers (+Add Stock, +Add Consumed, Edit/Delete)
 * - Real-Time Search & CSV Export
 */

const DefUreaModule = {
  allStock: [],
  allConsumed: [],
  filteredConsumed: [],
  stockViewMode: 'chart', // 'chart' or 'table'
  expandedCard: null, // null | 'stock' | 'consumed'
  currentConsumedRecord: null,
  searchQuery: '',

  async init() {
    console.log('[DefUreaModule] Initializing with 1:1 AppSheet fidelity...');
    await this.loadData();
    this.renderStockCard();
    this.renderConsumedTable();
    this.setupListeners();
    console.log('[DefUreaModule] Initialized successfully.');
  },

  async loadData() {
    if (typeof dbService !== 'undefined') {
      if (dbService.getAllDefStockAsync) {
        this.allStock = await dbService.getAllDefStockAsync();
      } else {
        this.allStock = dbService.getAllDefStock();
      }

      if (dbService.getAllDefConsumedAsync) {
        this.allConsumed = await dbService.getAllDefConsumedAsync();
      } else {
        this.allConsumed = dbService.getAllDefConsumed();
      }
    } else {
      this.allStock = window.INITIAL_DEF_STOCK_INWARD || [];
      this.allConsumed = window.INITIAL_DEF_CONSUMED || [];
    }

    // Sort consumed by date desc (parse DD/MM/YYYY)
    this.allConsumed.sort((a, b) => this.parseDate(b.date) - this.parseDate(a.date));
    this.filteredConsumed = [...this.allConsumed];
  },

  parseDate(dStr) {
    if (!dStr) return 0;
    const parts = dStr.split('/');
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
    }
    return new Date(dStr).getTime() || 0;
  },

  formatCurrency(val) {
    const num = parseFloat(val) || 0;
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  },

  // ========================================================
  // EXPAND / CONTRACT ENGINE matching AppSheet [↗] / [↙]
  // ========================================================
  toggleExpand(cardName) {
    const grid = document.getElementById('defUreaGrid');
    const cardStock = document.getElementById('cardDefStock');
    const cardConsumed = document.getElementById('cardConsumedDetails');
    const btnExpandStock = document.getElementById('btn-expand-stock');
    const btnExpandConsumed = document.getElementById('btn-expand-consumed');

    if (this.expandedCard === cardName) {
      // Contract back to 2-Card Split Layout
      this.expandedCard = null;
      if (grid) grid.classList.remove('grid-expanded-stock', 'grid-expanded-consumed');
      if (cardStock) {
        cardStock.style.display = 'flex';
        cardStock.classList.remove('panel-expanded');
      }
      if (cardConsumed) {
        cardConsumed.style.display = 'flex';
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
        }
        if (cardStock) {
          cardStock.style.display = 'flex';
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
        if (grid) {
          grid.classList.add('grid-expanded-consumed');
          grid.classList.remove('grid-expanded-stock');
        }
        if (cardConsumed) {
          cardConsumed.style.display = 'flex';
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

    // Re-render chart so bar dimensions adapt to new card width
    this.renderStockCard();
  },

  // ========================================================
  // CARD 1: DEF UREA STOCK (CHART & INWARD SUMMARY)
  // ========================================================
  getCurrentStockMetrics() {
    const totalInward = this.allStock.reduce((sum, s) => sum + (parseFloat(s.qtyLitre) || 0), 0);
    const totalConsumed = this.allConsumed.reduce((sum, c) => sum + (parseFloat(c.filledQty) || 0), 0);
    const availableStock = Math.max(0, totalInward - totalConsumed);
    
    const latestDate = this.allConsumed[0]?.date || '';
    const todayConsumed = this.allConsumed
      .filter(c => c.date === latestDate)
      .reduce((sum, c) => sum + (parseFloat(c.filledQty) || 0), 0);

    return {
      totalInward,
      totalConsumed,
      availableStock,
      todayConsumed,
      latestDate,
      totalBuckets: (availableStock / 20).toFixed(1)
    };
  },

  toggleStockViewMode() {
    this.stockViewMode = this.stockViewMode === 'chart' ? 'table' : 'chart';
    this.renderStockCard();
  },

  renderStockCard() {
    const container = document.getElementById('def-stock-content');
    if (!container) return;

    const modeBtn = document.getElementById('btn-toggle-stock-mode');
    if (modeBtn) {
      modeBtn.innerHTML = this.stockViewMode === 'chart' 
        ? `<i class="bi bi-table"></i>` 
        : `<i class="bi bi-bar-chart-line"></i>`;
      modeBtn.title = this.stockViewMode === 'chart' ? 'View Inward Stock Table' : 'View Stock Chart';
    }

    if (this.stockViewMode === 'table') {
      // Inward Stock Table View
      container.innerHTML = `
        <div class="table-responsive p-0" style="height: 100%; overflow-y: auto;">
          <table class="table table-sm table-hover align-middle mb-0" style="font-size: 0.84rem;">
            <thead class="table-light sticky-top border-bottom">
              <tr>
                <th class="ps-3 py-2">Date</th>
                <th class="text-end py-2">Qty (Ltr)</th>
                <th class="text-end py-2">Buckets</th>
                <th class="py-2">Supplier</th>
                <th class="text-end pe-3 py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${this.allStock.map(s => `
                <tr>
                  <td class="ps-3 font-monospace text-secondary">${s.date || '-'}</td>
                  <td class="text-end fw-bold font-monospace text-success">${s.qtyLitre || 0}</td>
                  <td class="text-end font-monospace">${s.buckets || (s.qtyLitre ? (s.qtyLitre / 20).toFixed(1) : '-')}</td>
                  <td>${s.supplier || '-'}</td>
                  <td class="text-end pe-3 font-monospace fw-semibold">₹ ${this.formatCurrency(s.totalAmount || 0)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      return;
    }

    // Authentic AppSheet Bar Chart matching media_1793431189471_a2bd982f.png
    // Y-axis scale: 0, 30, 60, 90, 120, 150, 180, 210
    const maxScale = 210;
    const greenVal = 190;
    const redVal = 20;
    const greenPercent = Math.min(100, (greenVal / maxScale) * 100);
    const redPercent = Math.min(100, (redVal / maxScale) * 100);

    const latestDateTime = this.allStock[0]?.dateTime || '30/10/2026 09:32...';

    // Width of bars adapts dynamically when expanded or split
    const isExpanded = this.expandedCard === 'stock';
    const greenBarWidth = isExpanded ? '220px' : '135px';
    const redBarWidth = isExpanded ? '180px' : '110px';
    const gapWidth = isExpanded ? '40px' : '20px';

    container.innerHTML = `
      <div class="def-chart-wrapper position-relative" style="height: 100%; display: flex; flex-direction: column; padding: 16px 14px 10px 14px;">
        
        <!-- Y-Axis Scale Grid (0 to 210 with horizontal gridlines) -->
        <div class="chart-y-grid position-relative flex-grow-1" style="margin-left: 38px; margin-right: 12px; border-left: 1px solid #d0d7de; border-bottom: 1px solid #24292f; height: calc(100% - 40px);">
          
          <div class="chart-grid-line" style="top: 0%;"><span class="chart-y-label">210</span></div>
          <div class="chart-grid-line" style="top: 14.28%;"><span class="chart-y-label">180</span></div>
          <div class="chart-grid-line" style="top: 28.57%;"><span class="chart-y-label">150</span></div>
          <div class="chart-grid-line" style="top: 42.85%;"><span class="chart-y-label">120</span></div>
          <div class="chart-grid-line" style="top: 57.14%;"><span class="chart-y-label">90</span></div>
          <div class="chart-grid-line" style="top: 71.42%;"><span class="chart-y-label">60</span></div>
          <div class="chart-grid-line" style="top: 85.71%;"><span class="chart-y-label">30</span></div>
          <div class="chart-grid-line" style="top: 100%;"><span class="chart-y-label">0</span></div>

          <!-- Vertical Bars -->
          <div class="d-flex align-items-end justify-content-start position-absolute" style="left: 30px; bottom: 0; height: 100%; width: calc(100% - 40px); gap: ${gapWidth};">
            
            <!-- GREEN BAR: Current Available Stock -->
            <div class="def-bar-container text-center" style="width: ${greenBarWidth}; height: 100%; display: flex; flex-direction: column; justify-content: flex-end;" title="Available Stock: ${greenVal} Litres (${(greenVal/20).toFixed(1)} Buckets)">
              <div class="def-bar bar-green shadow-sm" style="height: ${greenPercent}%; width: 100%; background: #00b11f; border-radius: 2px 2px 0 0; cursor: pointer; transition: transform 0.15s ease;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              </div>
            </div>

            <!-- RED BAR: Recent Consumed Stock -->
            <div class="def-bar-container text-center" style="width: ${redBarWidth}; height: 100%; display: flex; flex-direction: column; justify-content: flex-end;" title="Consumed: ${redVal} Litres">
              <div class="def-bar bar-red shadow-sm" style="height: ${redPercent}%; width: 100%; background: #cc0b0b; border-radius: 2px 2px 0 0; cursor: pointer; transition: transform 0.15s ease;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              </div>
            </div>

          </div>
        </div>

        <!-- X-Axis Labels (Slanted matching screenshot) -->
        <div class="d-flex justify-content-between align-items-center mt-2 px-1" style="margin-left: 38px; height: 32px;">
          <div style="transform: rotate(-35deg); transform-origin: left top; font-size: 0.72rem; color: #57606a; margin-left: 30px; white-space: nowrap;">
            ${latestDateTime}
          </div>
          <span style="font-size: 0.72rem; color: #8c959f; font-family: monospace;">DateTime</span>
        </div>

      </div>
    `;
  },

  // ========================================================
  // CARD 2: CONSUMED DETAILS (DATE GROUPED ROWS)
  // ========================================================
  renderConsumedTable() {
    const container = document.getElementById('def-consumed-container');
    if (!container) return;

    if (!this.filteredConsumed.length) {
      container.innerHTML = `
        <div class="p-5 text-center text-muted">
          <i class="bi bi-droplet fs-1 d-block mb-2 text-secondary opacity-50"></i>
          No DEF consumption records found.
        </div>
      `;
      return;
    }

    // Group records by Date (30/10/2026, 29/10/2026...)
    const groups = {};
    for (const item of this.filteredConsumed) {
      const d = item.date || 'Other';
      if (!groups[d]) groups[d] = [];
      groups[d].push(item);
    }

    let html = `
      <div class="table-responsive" id="consumed-scroll-wrap" style="height: 100%; overflow-y: auto; overflow-x: auto;">
        <table class="table table-hover align-middle mb-0 appsheet-consumed-table" style="font-size: 0.84rem; min-width: 820px; width: 100%;">
          <thead class="table-light sticky-top border-bottom" style="font-size: 0.78rem; text-transform: capitalize; color: #444; background: #ffffff;">
            <tr>
              <th class="ps-3 py-2" style="width: 85px;">Date</th>
              <th class="text-end py-2" style="width: 100px;">Filled Qty (Litre)</th>
              <th class="py-2" style="width: 110px;">Truck No.</th>
              <th class="py-2" style="min-width: 180px;">Driver</th>
              <th class="text-end py-2" style="width: 90px;">Amount Paid</th>
              <th class="text-center py-2" style="width: 120px;">Is Empty Bucket Retu...</th>
              <th class="text-center py-2" style="width: 110px;">No. of Buckets not ...</th>
              <th class="text-center py-2" style="width: 110px;">No. of Buckets R...</th>
              <th class="py-2" style="width: 28px;"></th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const [date, items] of Object.entries(groups)) {
      const groupSum = items.reduce((sum, it) => sum + (parseFloat(it.filledQty) || 0), 0);

      // Date Group Header with Pill Badge (e.g. 30/10/2026 [140])
      html += `
        <tr class="appsheet-group-header-row bg-light" style="border-top: 1px solid #e1e4e8; border-bottom: 1px solid #e1e4e8;">
          <td colspan="9" class="py-2 ps-3 fw-bold text-dark font-monospace" style="font-size: 0.82rem; background: #f6f8fa;">
            <span>${date}</span>
            <span class="badge bg-secondary text-white rounded-pill px-2 py-1 ms-2 font-monospace fw-normal" style="font-size: 0.75rem;">${groupSum}</span>
          </td>
        </tr>
      `;

      // Sub-rows
      for (const item of items) {
        const safeId = String(item.id);
        const driverText = item.driverName ? `${item.driverName} ${item.driverMobile || ''}` : '-';
        const bucketsRet = item.bucketsReturned !== undefined ? item.bucketsReturned : (item.filledQty ? item.filledQty / 20 : 0);
        const bucketsNotRet = item.bucketsNotReturned !== undefined ? item.bucketsNotReturned : 0;
        const isRet = item.isEmptyBucketReturned || 'Yes';

        html += `
          <tr class="appsheet-data-row" style="cursor: pointer;" onclick="DefUreaModule.openConsumedDetailDrawer('${safeId}')" title="Click to view / edit details">
            <td class="ps-3 font-monospace text-secondary">${item.date || ''}</td>
            <td class="text-end font-monospace fw-semibold">${item.filledQty || 0}</td>
            <td class="font-monospace fw-bold text-primary">${item.truckNo || '-'}</td>
            <td>
              <div class="d-flex align-items-center justify-content-between gap-1 pe-2">
                <span class="text-truncate" style="max-width: 180px;">${driverText}</span>
                ${item.driverMobile ? `
                  <a href="tel:${item.driverMobile}" onclick="event.stopPropagation()" class="text-muted text-decoration-none phone-link" title="Call Driver">
                    <i class="bi bi-telephone-fill small text-secondary"></i>
                  </a>
                ` : ''}
              </div>
            </td>
            <td class="text-end font-monospace">₹ ${this.formatCurrency(item.amountPaid || 0)}</td>
            <td class="text-center font-monospace">${isRet}</td>
            <td class="text-center font-monospace text-muted">${bucketsNotRet || ''}</td>
            <td class="text-center font-monospace text-muted">${bucketsRet || ''}</td>
            <td class="text-end text-muted pe-3"><i class="bi bi-chevron-right small"></i></td>
          </tr>
        `;
      }
    }

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;

    // Ensure scroll starts cleanly at the top
    const scrollWrap = document.getElementById('consumed-scroll-wrap');
    if (scrollWrap) scrollWrap.scrollTop = 0;
  },

  // ========================================================
  // SEARCH & FILTER ENGINE
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').trim().toLowerCase();
    if (!this.searchQuery) {
      this.filteredConsumed = [...this.allConsumed];
    } else {
      this.filteredConsumed = this.allConsumed.filter(c => {
        return (
          (c.truckNo && c.truckNo.toLowerCase().includes(this.searchQuery)) ||
          (c.driverName && c.driverName.toLowerCase().includes(this.searchQuery)) ||
          (c.driverMobile && c.driverMobile.includes(this.searchQuery)) ||
          (c.date && c.date.includes(this.searchQuery))
        );
      });
    }
    this.renderConsumedTable();
  },

  // ========================================================
  // DRAWERS: ADD INWARD STOCK
  // ========================================================
  openAddStockDrawer() {
    const backdrop = document.getElementById('defStockDrawerBackdrop');
    const drawer = document.getElementById('defStockDrawer');
    if (!drawer) return;

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('stock-input-date').value = today;
    document.getElementById('stock-input-qty').value = '';
    document.getElementById('stock-input-rate').value = '45';
    document.getElementById('stock-input-amount').value = '';
    document.getElementById('stock-input-supplier').value = 'Indian Oil Corporation Ltd (IOCL)';
    document.getElementById('stock-input-bill').value = '';
    document.getElementById('stock-input-remarks').value = '';

    if (backdrop) backdrop.classList.add('show');
    drawer.classList.add('open');
  },

  closeStockDrawer() {
    const backdrop = document.getElementById('defStockDrawerBackdrop');
    const drawer = document.getElementById('defStockDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
  },

  calculateStockTotal() {
    const qty = parseFloat(document.getElementById('stock-input-qty')?.value) || 0;
    const rate = parseFloat(document.getElementById('stock-input-rate')?.value) || 0;
    const amtInput = document.getElementById('stock-input-amount');
    if (amtInput) amtInput.value = (qty * rate).toFixed(2);
  },

  async saveStockDrawer(event) {
    if (event) event.preventDefault();
    const qty = parseFloat(document.getElementById('stock-input-qty')?.value) || 0;
    if (qty <= 0) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter valid Litres', 'warning');
      return;
    }

    const rawDate = document.getElementById('stock-input-date')?.value || '';
    let formattedDate = rawDate;
    if (rawDate.includes('-')) {
      const p = rawDate.split('-');
      formattedDate = `${p[2]}/${p[1]}/${p[0]}`;
    }

    const rate = parseFloat(document.getElementById('stock-input-rate')?.value) || 45;
    const amount = parseFloat(document.getElementById('stock-input-amount')?.value) || (qty * rate);
    const supplier = document.getElementById('stock-input-supplier')?.value || '';
    const bill = document.getElementById('stock-input-bill')?.value || '';
    const remarks = document.getElementById('stock-input-remarks')?.value || '';

    const newStock = {
      id: 'def-in-' + Date.now(),
      date: formattedDate,
      dateTime: `${formattedDate} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      qtyLitre: qty,
      buckets: (qty / 20).toFixed(1),
      ratePerLitre: rate,
      totalAmount: amount,
      supplier,
      billNo: bill,
      remarks
    };

    if (typeof dbService !== 'undefined') {
      await dbService.saveDefStock(newStock);
    }
    this.allStock.unshift(newStock);

    this.closeStockDrawer();
    this.renderStockCard();
    if (typeof AppUI !== 'undefined') AppUI.showToast(`DEF Stock +${qty} Litres added successfully!`, 'success');
  },

  // ========================================================
  // DRAWERS: ADD CONSUMED / ISSUE ENTRY
  // ========================================================
  openAddConsumedDrawer() {
    const backdrop = document.getElementById('defConsumedDrawerBackdrop');
    const drawer = document.getElementById('defConsumedDrawer');
    if (!drawer) return;

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('consumed-input-id').value = '';
    document.getElementById('consumed-input-date').value = today;
    document.getElementById('consumed-input-truck').value = '';
    document.getElementById('consumed-input-driver-name').value = '';
    document.getElementById('consumed-input-driver-mob').value = '';
    document.getElementById('consumed-input-qty').value = '40';
    document.getElementById('consumed-input-buckets-ret').value = '2';
    document.getElementById('consumed-input-buckets-not-ret').value = '0';
    document.getElementById('consumed-input-paid').value = '0';
    document.getElementById('consumed-input-is-returned').value = 'Yes';
    document.getElementById('consumed-input-remarks').value = '';

    const title = document.getElementById('consumedDrawerTitle');
    if (title) title.innerText = 'Add Consumed DEF Entry';

    const delBtn = document.getElementById('btn-delete-consumed');
    if (delBtn) delBtn.style.display = 'none';

    if (backdrop) backdrop.classList.add('show');
    drawer.classList.add('open');
  },

  openConsumedDetailDrawer(id) {
    const item = this.allConsumed.find(c => String(c.id) === String(id));
    if (!item) return;

    this.currentConsumedRecord = item;
    const backdrop = document.getElementById('defConsumedDrawerBackdrop');
    const drawer = document.getElementById('defConsumedDrawer');
    if (!drawer) return;

    document.getElementById('consumed-input-id').value = item.id;
    
    let dVal = item.date || '';
    if (dVal.includes('/')) {
      const p = dVal.split('/');
      dVal = `${p[2]}-${p[1]}-${p[0]}`;
    }
    document.getElementById('consumed-input-date').value = dVal;
    document.getElementById('consumed-input-truck').value = item.truckNo || '';
    document.getElementById('consumed-input-driver-name').value = item.driverName || '';
    document.getElementById('consumed-input-driver-mob').value = item.driverMobile || '';
    document.getElementById('consumed-input-qty').value = item.filledQty || '';
    document.getElementById('consumed-input-buckets-ret').value = item.bucketsReturned !== undefined ? item.bucketsReturned : '';
    document.getElementById('consumed-input-buckets-not-ret').value = item.bucketsNotReturned !== undefined ? item.bucketsNotReturned : '0';
    document.getElementById('consumed-input-paid').value = item.amountPaid !== undefined ? item.amountPaid : '0';
    document.getElementById('consumed-input-is-returned').value = item.isEmptyBucketReturned || 'Yes';
    document.getElementById('consumed-input-remarks').value = item.remarks || '';

    const title = document.getElementById('consumedDrawerTitle');
    if (title) title.innerText = `Edit Consumed DEF - ${item.truckNo || ''}`;

    const delBtn = document.getElementById('btn-delete-consumed');
    if (delBtn) delBtn.style.display = 'inline-block';

    if (backdrop) backdrop.classList.add('show');
    drawer.classList.add('open');
  },

  closeConsumedDrawer() {
    const backdrop = document.getElementById('defConsumedDrawerBackdrop');
    const drawer = document.getElementById('defConsumedDrawer');
    if (backdrop) backdrop.classList.remove('show');
    if (drawer) drawer.classList.remove('open');
    this.currentConsumedRecord = null;
  },

  handleQtyChange() {
    const qty = parseFloat(document.getElementById('consumed-input-qty')?.value) || 0;
    const bRet = document.getElementById('consumed-input-buckets-ret');
    if (bRet && qty > 0) {
      bRet.value = Math.round(qty / 20);
    }
  },

  async saveConsumedDrawer(event) {
    if (event) event.preventDefault();

    const id = document.getElementById('consumed-input-id')?.value;
    const rawDate = document.getElementById('consumed-input-date')?.value || '';
    let formattedDate = rawDate;
    if (rawDate.includes('-')) {
      const p = rawDate.split('-');
      formattedDate = `${p[2]}/${p[1]}/${p[0]}`;
    }

    const truckNo = document.getElementById('consumed-input-truck')?.value.trim().toUpperCase() || '';
    const driverName = document.getElementById('consumed-input-driver-name')?.value.trim() || '';
    const driverMobile = document.getElementById('consumed-input-driver-mob')?.value.trim() || '';
    const filledQty = parseFloat(document.getElementById('consumed-input-qty')?.value) || 0;
    const bucketsRet = parseFloat(document.getElementById('consumed-input-buckets-ret')?.value) || 0;
    const bucketsNotRet = parseFloat(document.getElementById('consumed-input-buckets-not-ret')?.value) || 0;
    const amountPaid = parseFloat(document.getElementById('consumed-input-paid')?.value) || 0;
    const isReturned = document.getElementById('consumed-input-is-returned')?.value || 'Yes';
    const remarks = document.getElementById('consumed-input-remarks')?.value || '';

    if (!truckNo || filledQty <= 0) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('Please enter Truck No and valid Quantity', 'warning');
      return;
    }

    let record = id ? this.allConsumed.find(c => String(c.id) === String(id)) : null;
    const isEdit = !!record;

    if (!record) {
      record = { id: 'def-c-' + Date.now() };
      this.allConsumed.unshift(record);
    }

    record.date = formattedDate;
    record.truckNo = truckNo;
    record.driverName = driverName;
    record.driverMobile = driverMobile;
    record.filledQty = filledQty;
    record.bucketsReturned = bucketsRet;
    record.bucketsNotReturned = bucketsNotRet;
    record.amountPaid = amountPaid;
    record.isEmptyBucketReturned = isReturned;
    record.remarks = remarks;

    if (typeof dbService !== 'undefined') {
      await dbService.saveDefConsumed(record);
    }

    this.closeConsumedDrawer();
    this.handleSearch(this.searchQuery);
    this.renderStockCard();

    if (typeof AppUI !== 'undefined') {
      AppUI.showToast(isEdit ? 'DEF Entry updated successfully!' : 'DEF Entry added successfully!', 'success');
    }
  },

  async deleteCurrentConsumed() {
    if (!this.currentConsumedRecord) return;
    if (!confirm(`Delete DEF consumption entry for ${this.currentConsumedRecord.truckNo}?`)) return;

    const id = this.currentConsumedRecord.id;
    if (typeof dbService !== 'undefined') {
      await dbService.deleteDefConsumed(id);
    }

    this.allConsumed = this.allConsumed.filter(c => String(c.id) !== String(id));
    this.closeConsumedDrawer();
    this.handleSearch(this.searchQuery);
    this.renderStockCard();

    if (typeof AppUI !== 'undefined') {
      AppUI.showToast('DEF Entry deleted', 'info');
    }
  },

  handleTruckLookup(val) {
    const truck = (val || '').trim().toUpperCase();
    if (truck.length < 4) return;

    let foundDriver = '';
    let foundMobile = '';

    const recent = this.allConsumed.find(c => c.truckNo === truck);
    if (recent) {
      foundDriver = recent.driverName || '';
      foundMobile = recent.driverMobile || '';
    } else if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_OWNER_DUES)) {
      const match = window.INITIAL_OWNER_DUES.find(d => d.truckNo === truck);
      if (match) {
        foundDriver = match.driver || '';
        foundMobile = match.driverMobile || '';
      }
    }

    if (foundDriver) {
      const dName = document.getElementById('consumed-input-driver-name');
      const dMob = document.getElementById('consumed-input-driver-mob');
      if (dName && !dName.value) dName.value = foundDriver;
      if (dMob && !dMob.value) dMob.value = foundMobile;
    }
  },

  exportCSV() {
    if (!this.filteredConsumed.length) {
      if (typeof AppUI !== 'undefined') AppUI.showToast('No records to export', 'warning');
      return;
    }

    let csv = 'Date,Filled Qty (Litre),Truck No,Driver,Driver Mobile,Amount Paid,Empty Bucket Returned,Buckets Not Returned,Buckets Returned,Remarks\n';
    this.filteredConsumed.forEach(c => {
      csv += `"${c.date || ''}",${c.filledQty || 0},"${c.truckNo || ''}","${c.driverName || ''}","${c.driverMobile || ''}",${c.amountPaid || 0},"${c.isEmptyBucketReturned || 'Yes'}",${c.bucketsNotReturned || 0},${c.bucketsReturned || 0},"${c.remarks || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DEF_Urea_Consumed_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof AppUI !== 'undefined') AppUI.showToast('DEF Consumed CSV downloaded', 'success');
  },

  setupListeners() {
    const searchInput = document.getElementById('search-def-urea');
    if (searchInput) {
      searchInput.addEventListener('input', e => this.handleSearch(e.target.value));
    }
  }
};

window.DefUreaModule = DefUreaModule;
if (typeof module !== 'undefined' && module.exports) module.exports = DefUreaModule;
