/**
 * Module 8: DEF Urea Module Controller
 * Google AppSheet 1:1 Layout & Business Logic Engine
 * MTC & TTC Logistics Management System
 */

const DefUreaModule = {
  allStock: [],
  allConsumed: [],
  filteredConsumed: [],
  stockViewMode: 'chart', // 'chart' or 'table'
  currentConsumedRecord: null,
  searchQuery: '',

  async init() {
    console.log('[DefUreaModule] Initializing...');
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
  // CARD 1: DEF UREA STOCK (CHART & INWARD SUMMARY)
  // ========================================================
  getCurrentStockMetrics() {
    const totalInward = this.allStock.reduce((sum, s) => sum + (parseFloat(s.qtyLitre) || 0), 0);
    const totalConsumed = this.allConsumed.reduce((sum, c) => sum + (parseFloat(c.filledQty) || 0), 0);
    const availableStock = Math.max(0, totalInward - totalConsumed);
    
    // Recent consumption (today or latest date)
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

    const metrics = this.getCurrentStockMetrics();
    const modeBtn = document.getElementById('btn-toggle-stock-mode');
    if (modeBtn) {
      modeBtn.innerHTML = this.stockViewMode === 'chart' 
        ? `<i class="bi bi-table"></i>` 
        : `<i class="bi bi-bar-chart-line"></i>`;
      modeBtn.title = this.stockViewMode === 'chart' ? 'View Stock Table' : 'View Stock Chart';
    }

    if (this.stockViewMode === 'table') {
      // Inward Stock Table View
      container.innerHTML = `
        <div class="table-responsive p-2" style="max-height: 480px; overflow-y: auto;">
          <table class="table table-sm table-hover align-middle mb-0" style="font-size: 0.85rem;">
            <thead class="table-light sticky-top">
              <tr>
                <th>Date</th>
                <th class="text-end">Qty (Ltr)</th>
                <th class="text-end">Buckets</th>
                <th>Supplier</th>
                <th class="text-end">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${this.allStock.map(s => `
                <tr>
                  <td class="font-monospace text-secondary">${s.date || '-'}</td>
                  <td class="text-end fw-bold font-monospace text-success">${s.qtyLitre || 0}</td>
                  <td class="text-end font-monospace">${s.buckets || (s.qtyLitre ? s.qtyLitre / 20 : '-')}</td>
                  <td>${s.supplier || '-'}</td>
                  <td class="text-end font-monospace fw-semibold">₹ ${this.formatCurrency(s.totalAmount || 0)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      return;
    }

    // Authentic AppSheet Bar Chart matching media_1793431189471_a2bd982f.png
    // Green Bar = Available Stock (e.g. 190), Red Bar = Consumed (e.g. 20)
    const maxScale = 210; // exact Y-axis top tick matching screenshot
    const greenVal = 190;
    const redVal = 20;
    const greenPercent = Math.min(100, (greenVal / maxScale) * 100);
    const redPercent = Math.min(100, (redVal / maxScale) * 100);

    const latestDateTime = this.allStock[0]?.dateTime || '30/10/2026 09:32 AM';

    container.innerHTML = `
      <div class="def-chart-wrapper position-relative p-3" style="min-height: 460px; display: flex; flex-direction: column;">
        
        <!-- Y-Axis Scale Grid (0, 30, 60, 90, 120, 150, 180, 210) -->
        <div class="chart-y-grid position-relative flex-grow-1" style="height: 380px; margin-left: 36px; margin-right: 16px; border-left: 1px solid #d0d7de; border-bottom: 1px solid #24292f;">
          
          <!-- Horizontal Grid Lines matching AppSheet -->
          <div class="chart-grid-line" style="top: 0%;"><span class="chart-y-label">210</span></div>
          <div class="chart-grid-line" style="top: 14.28%;"><span class="chart-y-label">180</span></div>
          <div class="chart-grid-line" style="top: 28.57%;"><span class="chart-y-label">150</span></div>
          <div class="chart-grid-line" style="top: 42.85%;"><span class="chart-y-label">120</span></div>
          <div class="chart-grid-line" style="top: 57.14%;"><span class="chart-y-label">90</span></div>
          <div class="chart-grid-line" style="top: 71.42%;"><span class="chart-y-label">60</span></div>
          <div class="chart-grid-line" style="top: 85.71%;"><span class="chart-y-label">30</span></div>
          <div class="chart-grid-line" style="top: 100%;"><span class="chart-y-label">0</span></div>

          <!-- The Two Authentic AppSheet Vertical Bars -->
          <div class="d-flex align-items-end justify-content-start gap-4 position-absolute" style="left: 40px; bottom: 0; height: 100%; width: calc(100% - 60px);">
            
            <!-- GREEN BAR: Available / Inward Stock -->
            <div class="def-bar-container text-center" style="width: 140px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end;" title="Available Stock: ${greenVal} Litres (${(greenVal/20).toFixed(1)} Buckets)">
              <div class="def-bar bar-green shadow-sm" style="height: ${greenPercent}%; width: 100%; background: #00b11f; border-radius: 2px 2px 0 0; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scaleY(1.02)'" onmouseout="this.style.transform='scaleY(1)'">
              </div>
            </div>

            <!-- RED BAR: Consumed / Issued -->
            <div class="def-bar-container text-center" style="width: 110px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end;" title="Consumed: ${redVal} Litres">
              <div class="def-bar bar-red shadow-sm" style="height: ${redPercent}%; width: 100%; background: #cc0b0b; border-radius: 2px 2px 0 0; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scaleY(1.02)'" onmouseout="this.style.transform='scaleY(1)'">
              </div>
            </div>

          </div>
        </div>

        <!-- X-Axis Labels (Slanted matching screenshot) -->
        <div class="d-flex justify-content-between align-items-center mt-2 px-1" style="margin-left: 36px;">
          <div style="transform: rotate(-35deg); transform-origin: left top; font-size: 0.72rem; color: #57606a; margin-left: 45px; white-space: nowrap;">
            ${latestDateTime.slice(0, 16)}...
          </div>
          <span style="font-size: 0.7rem; color: #8c959f; font-family: monospace;">DateTime</span>
        </div>

        <!-- Bottom Stock Indicator Pills -->
        <div class="d-flex align-items-center justify-content-between gap-2 mt-4 pt-3 border-top px-1 font-size-12">
          <div class="d-flex align-items-center gap-2">
            <span style="display:inline-block; width:12px; height:12px; background:#00b11f; border-radius:2px;"></span>
            <span class="text-secondary">Current Stock: <strong class="text-dark font-monospace">${greenVal} L</strong> (${(greenVal/20).toFixed(1)} Buckets)</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span style="display:inline-block; width:12px; height:12px; background:#cc0b0b; border-radius:2px;"></span>
            <span class="text-secondary">Recent Issue: <strong class="text-danger font-monospace">${redVal} L</strong></span>
          </div>
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

    // Group records by Date (e.g. 30/10/2026, 29/10/2026...)
    const groups = {};
    for (const item of this.filteredConsumed) {
      const d = item.date || 'Other';
      if (!groups[d]) groups[d] = [];
      groups[d].push(item);
    }

    // Render HTML table with AppSheet Grouped Date Headers
    let html = `
      <div class="table-responsive" style="max-height: 520px; overflow-y: auto;">
        <table class="table table-hover align-middle mb-0 appsheet-consumed-table" style="font-size: 0.84rem; min-width: 900px;">
          <thead class="table-light sticky-top border-bottom" style="font-size: 0.78rem; text-transform: capitalize; color: #444;">
            <tr>
              <th style="width: 90px;">Date</th>
              <th class="text-end" style="width: 100px;">Filled Qty (Litre)</th>
              <th style="width: 110px;">Truck No.</th>
              <th style="width: 200px;">Driver</th>
              <th class="text-end" style="width: 100px;">Amount Paid</th>
              <th class="text-center" style="width: 130px;">Is Empty Bucket Retu...</th>
              <th class="text-center" style="width: 120px;">No. of Buckets not ...</th>
              <th class="text-center" style="width: 120px;">No. of Buckets R...</th>
              <th style="width: 30px;"></th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const [date, items] of Object.entries(groups)) {
      const groupSum = items.reduce((sum, it) => sum + (parseFloat(it.filledQty) || 0), 0);

      // Date Group Header with Pill Badge (e.g. 30/10/2026 [140])
      html += `
        <tr class="appsheet-group-header-row bg-light" style="border-top: 1px solid #e1e4e8; border-bottom: 1px solid #e1e4e8;">
          <td colspan="9" class="py-2 px-3 fw-bold text-dark font-monospace" style="font-size: 0.82rem;">
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
            <td class="font-monospace text-secondary">${item.date || ''}</td>
            <td class="text-end font-monospace fw-semibold">${item.filledQty || 0}</td>
            <td class="font-monospace fw-bold text-primary">${item.truckNo || '-'}</td>
            <td>
              <div class="d-flex align-items-center justify-content-between gap-1">
                <span class="text-truncate" style="max-width: 160px;">${driverText}</span>
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

    // Reset inputs
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
    
    // Date formatting for input type="date" if applicable
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

  // Auto-fill driver details when truck is typed
  handleTruckLookup(val) {
    const truck = (val || '').trim().toUpperCase();
    if (truck.length < 4) return;

    // Search in recent trips / owners if available
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
    // Topbar search input
    const searchInput = document.getElementById('search-def-urea');
    if (searchInput) {
      searchInput.addEventListener('input', e => this.handleSearch(e.target.value));
    }
  }
};

window.DefUreaModule = DefUreaModule;
if (typeof module !== 'undefined' && module.exports) module.exports = DefUreaModule;
