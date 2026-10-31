/**
 * Module 9: Shahpura Module Controller (1:1 Google AppSheet Fidelity)
 * Features:
 * - 3-Card Responsive Dashboard Layout:
 *     Card 1: Available Cash (Full-height left card ~38%, Negative Bar Chart 0 to -250,000, 4-square grid toggle)
 *     Card 2: Given Transactions (Top-right card ~62%, Date-grouped, red dots & bold red text, sum pills)
 *     Card 3: Deposit Transactions (Bottom-right card ~62%, Date-grouped, green dots & bold green text, sum pills, G.R. No column)
 * - Single-click Expand [↗] and Collapse [↙] for every card (with 1fr full-width safety)
 * - 1:1 AppSheet 2-Column Desktop Drawers:
 *     - + Add Given Transaction (Advance / Kharcha)
 *     - + Add Deposit Transaction (Cash Inflow / DEF Sales / Freight)
 *     - Record Detail Drawer with < Previous, Next >, Edit, and Close
 * - Searchable & Typable Comboboxes with Master Trucks & Drivers and two-way auto-fill
 * - Zero Browser LocalStorage: Cloud Firestore & In-Memory RAM only.
 */

const ShahpuraModule = {
  allGiven: [],
  allDeposit: [],
  filteredGiven: [],
  filteredDeposit: [],
  card1ViewMode: 'chart', // 'chart' | 'slice'
  expandedCard: null, // null | 'card1' | 'card2' | 'card3'
  searchQuery: '',
  currentDetailRecord: null,
  currentDetailType: null, // 'Given' | 'Deposit'
  currentDetailIndex: -1,

  // Master lists for Comboboxes
  truckMasterList: [],
  driverMasterList: [],

  async init() {
    console.log('[ShahpuraModule] Initializing 1:1 AppSheet 3-card layout...');
    await this.loadData();
    this.buildMasterLists();
    this.renderCard1AvailableCash();
    this.renderCard2GivenTransactions();
    this.renderCard3DepositTransactions();
    this.setupListeners();
    console.log('[ShahpuraModule] Initialized successfully.');
  },

  async loadData() {
    try {
      if (typeof dbService !== 'undefined' && dbService.getAllShahpuraTransactionsAsync) {
        const all = await dbService.getAllShahpuraTransactionsAsync();
        this.allGiven = all.filter(t => t.type === 'Given');
        this.allDeposit = all.filter(t => t.type === 'Deposit');
      } else if (typeof SAMPLE_SHAHPURA_DATA !== 'undefined') {
        this.allGiven = [...SAMPLE_SHAHPURA_DATA.givenTransactions];
        this.allDeposit = [...SAMPLE_SHAHPURA_DATA.depositTransactions];
      }
    } catch (err) {
      console.warn('[ShahpuraModule] loadData fallback:', err);
      if (typeof SAMPLE_SHAHPURA_DATA !== 'undefined') {
        this.allGiven = [...SAMPLE_SHAHPURA_DATA.givenTransactions];
        this.allDeposit = [...SAMPLE_SHAHPURA_DATA.depositTransactions];
      }
    }
    this.filteredGiven = [...this.allGiven];
    this.filteredDeposit = [...this.allDeposit];
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

    // Default fleet trucks & drivers
    const defaultTrucks = [
      'RJ52GB5642', 'RJ52GA8733', 'RJ52GB5061', 'RJ52GB5528',
      'RJ52GB5529', 'RJ52GB5641', 'RJ52GA6366', 'RJ52GB0721',
      'RJ52GB5964', 'RJ14GH9821', 'RJ14GG5412', 'RJ52GB1122'
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
      asOf: '30/10/2026, 09:32...',
      displayBalance: '₹ ' + Math.abs(availableCash).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  },

  // ========================================================
  // CARD 1: AVAILABLE CASH (SVG Bar Chart & Slice View)
  // ========================================================
  renderCard1AvailableCash() {
    const container = document.getElementById('card1Body');
    if (!container) return;

    const state = this.calculateCashState();

    if (this.card1ViewMode === 'slice') {
      container.innerHTML = this.renderCard1SliceHTML(state);
      return;
    }

    // Render 1:1 SVG Chart matching Screenshot (4).png
    // Scale: 0 to -250,000. 0 is at top (y=40), -250,000 is at y=540.
    const chartHeight = 540;
    const chartWidth = 440;
    const topY = 40;
    const bottomY = 500;
    const totalSpanY = bottomY - topY; // 460px
    const maxVal = 250000;

    // calculate bar height: availableCash is negative, e.g. -213100
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
      <div class="card1-chart-container position-relative h-100 d-flex flex-column" style="overflow: hidden;">
        <svg viewBox="0 0 ${chartWidth} 590" class="w-100 flex-grow-1" preserveAspectRatio="none" style="min-height: 440px;">
          <!-- Grid & Ticks -->
          ${gridLinesHTML}

          <!-- Red Available Cash Bar -->
          <rect id="svgCashBar"
            x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}"
            fill="${barColor}"
            style="cursor: pointer; transition: opacity 0.2s;"
            onmouseover="ShahpuraModule.showChartTooltip(event, ${state.availableCash}, ${state.totalDeposit}, ${state.totalGiven})"
            onmousemove="ShahpuraModule.moveChartTooltip(event)"
            onmouseout="ShahpuraModule.hideChartTooltip()"
          />

          <!-- X-Axis Timestamp Label slanted at 45 deg -->
          <g transform="translate(${barX + barWidth / 2 - 15}, ${bottomY + 45}) rotate(-45)">
            <text x="0" y="0" font-family="Roboto, sans-serif" font-size="10" fill="#5f6368" text-anchor="end">
              ${state.asOf}
            </text>
          </g>

          <!-- Right Y-Axis Label: DateTime rotated -->
          <g transform="translate(${chartWidth - 8}, 60) rotate(90)">
            <text x="0" y="0" font-family="Roboto, sans-serif" font-size="10" fill="#70757a" text-anchor="start">
              DateTime
            </text>
          </g>
        </svg>

        <!-- Floating Tooltip Box -->
        <div id="chartTooltip" class="appsheet-chart-tooltip" style="display: none;"></div>
      </div>
    `;
  },

  renderCard1SliceHTML(state) {
    return `
      <div class="p-3" style="overflow-y: auto; height: 100%;">
        <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <span class="fw-bold text-dark fs-6">Cash Summary Slice</span>
          <span class="badge bg-secondary">${state.asOf}</span>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-12">
            <div class="p-3 rounded border text-center" style="background: #fdf2f2; border-color: #f5c2c7 !important;">
              <div class="text-muted small fw-bold text-uppercase">Net Available Cash</div>
              <div class="fs-4 fw-bold ${state.availableCash < 0 ? 'text-danger' : 'text-success'}">
                ${state.availableCash < 0 ? '-' : ''}${state.displayBalance}
              </div>
              <div class="text-muted small">Status: ${state.availableCash < 0 ? 'Cash Deficit (Kharcha > Deposit)' : 'Cash Surplus'}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 rounded border" style="background: #f2fbf4; border-color: #c3e6cb !important;">
              <div class="small fw-bold text-success">Total Deposit (Inflow)</div>
              <div class="fs-6 fw-bold text-success">₹ ${state.totalDeposit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              <div class="text-muted" style="font-size: 11px;">${this.allDeposit.length} Deposits</div>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 rounded border" style="background: #fdf2f2; border-color: #f5c2c7 !important;">
              <div class="small fw-bold text-danger">Total Given (Outflow)</div>
              <div class="fs-6 fw-bold text-danger">₹ ${state.totalGiven.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              <div class="text-muted" style="font-size: 11px;">${this.allGiven.length} Transactions</div>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-sm table-bordered text-center align-middle" style="font-size: 12px;">
            <thead class="table-light">
              <tr>
                <th>Date</th>
                <th>Deposit (+)</th>
                <th>Given (-)</th>
                <th>Net Impact</th>
              </tr>
            </thead>
            <tbody>
              ${this.generateSliceRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  generateSliceRows() {
    const datesMap = new Map();
    for (const g of this.allGiven) {
      if (!datesMap.has(g.date)) datesMap.set(g.date, { deposit: 0, given: 0 });
      datesMap.get(g.date).given += (Number(g.amount) || 0);
    }
    for (const d of this.allDeposit) {
      if (!datesMap.has(d.date)) datesMap.set(d.date, { deposit: 0, given: 0 });
      datesMap.get(d.date).deposit += (Number(d.amount) || 0);
    }

    const sortedDates = Array.from(datesMap.keys()).sort((a, b) => {
      const pa = a.split('/').reverse().join('-');
      const pb = b.split('/').reverse().join('-');
      return pb.localeCompare(pa);
    });

    return sortedDates.map(date => {
      const item = datesMap.get(date);
      const diff = item.deposit - item.given;
      return `
        <tr>
          <td class="fw-bold">${date}</td>
          <td class="text-success fw-bold">₹ ${item.deposit.toLocaleString('en-IN')}</td>
          <td class="text-danger fw-bold">₹ ${item.given.toLocaleString('en-IN')}</td>
          <td class="fw-bold ${diff < 0 ? 'text-danger' : 'text-success'}">
            ${diff < 0 ? '-' : '+'}₹ ${Math.abs(diff).toLocaleString('en-IN')}
          </td>
        </tr>
      `;
    }).join('');
  },

  toggleCard1View() {
    this.card1ViewMode = this.card1ViewMode === 'chart' ? 'slice' : 'chart';
    this.renderCard1AvailableCash();
  },

  showChartTooltip(event, balance, deposit, given) {
    const tt = document.getElementById('chartTooltip');
    if (!tt) return;
    const formattedBal = (balance < 0 ? '-₹ ' : '₹ ') + Math.abs(balance).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    tt.innerHTML = `
      <div style="font-size: 11px; color: #5f6368; border-bottom: 1px solid #e0e0e0; padding-bottom: 3px; margin-bottom: 4px;">
        <strong>Date:</strong> 30/10/2026, 09:32:00
      </div>
      <div style="font-size: 12px; font-weight: bold; color: ${balance < 0 ? '#cc0b0b' : '#00b11f'};">
        Available Cash: ${formattedBal}
      </div>
      <div style="font-size: 11px; color: #00b11f; margin-top: 2px;">
        Total Deposits: ₹ ${deposit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </div>
      <div style="font-size: 11px; color: #cc0b0b;">
        Total Given: ₹ ${given.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </div>
    `;
    tt.style.display = 'block';
    this.moveChartTooltip(event);
  },

  moveChartTooltip(event) {
    const tt = document.getElementById('chartTooltip');
    if (!tt) return;
    const container = document.getElementById('card1Body');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left + 15;
    const y = event.clientY - rect.top + 15;
    tt.style.left = `${Math.min(x, rect.width - 200)}px`;
    tt.style.top = `${Math.min(y, rect.height - 100)}px`;
  },

  hideChartTooltip() {
    const tt = document.getElementById('chartTooltip');
    if (tt) tt.style.display = 'none';
  },

  // ========================================================
  // CARD 2: GIVEN TRANSACTIONS (Red circles & bold red text)
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

    // Group by Date in descending order
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

      // Group Header Row matching Screenshot (4).png
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

      // Sub-rows
      for (const row of items) {
        const formattedAmt = '₹ ' + (Number(row.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        html += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openDetailDrawer('${row.id}', 'Given')">
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
  // CARD 3: DEPOSIT TRANSACTIONS (Green circles, bold green, G.R. No)
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

    // Group by Date in descending order
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

      // Group Header Row matching Screenshot (4).png
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

      // Sub-rows
      for (const row of items) {
        const formattedAmt = '₹ ' + (Number(row.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        html += `
          <tr class="appsheet-data-row" onclick="ShahpuraModule.openDetailDrawer('${row.id}', 'Deposit')">
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
  // EXPAND [↗] & COLLAPSE [↙] ENGINE
  // ========================================================
  toggleExpand(cardKey) {
    const grid = document.getElementById('shahpuraGrid');
    if (!grid) return;

    const card1El = document.getElementById('shahpuraCard1');
    const rightStackEl = document.getElementById('shahpuraRightStack');
    const card2El = document.getElementById('shahpuraCard2');
    const card3El = document.getElementById('shahpuraCard3');

    const btn1 = document.getElementById('expandBtnCard1');
    const btn2 = document.getElementById('expandBtnCard2');
    const btn3 = document.getElementById('expandBtnCard3');

    if (this.expandedCard === cardKey) {
      // Collapse back to normal 3-card split layout
      this.expandedCard = null;
      grid.className = 'shahpura-grid';
      if (card1El) card1El.style.display = 'flex';
      if (rightStackEl) rightStackEl.style.display = 'grid';
      if (card2El) card2El.style.display = 'flex';
      if (card3El) card3El.style.display = 'flex';

      if (btn1) btn1.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
      if (btn2) btn2.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
      if (btn3) btn3.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
    } else {
      // Expand target card to 100% full view
      this.expandedCard = cardKey;

      if (cardKey === 'card1') {
        grid.className = 'shahpura-grid grid-expanded-card1';
        if (card1El) card1El.style.display = 'flex';
        if (rightStackEl) rightStackEl.style.display = 'none';
        if (btn1) btn1.innerHTML = '<i class="bi bi-arrows-angle-contract text-primary"></i>';
        if (btn2) btn2.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        if (btn3) btn3.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
      } else if (cardKey === 'card2') {
        grid.className = 'shahpura-grid grid-expanded-card2';
        if (card1El) card1El.style.display = 'none';
        if (rightStackEl) {
          rightStackEl.style.display = 'flex';
          rightStackEl.style.height = '100%';
        }
        if (card2El) {
          card2El.style.display = 'flex';
          card2El.style.flex = '1 1 100%';
        }
        if (card3El) card3El.style.display = 'none';
        if (btn1) btn1.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        if (btn2) btn2.innerHTML = '<i class="bi bi-arrows-angle-contract text-primary"></i>';
        if (btn3) btn3.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
      } else if (cardKey === 'card3') {
        grid.className = 'shahpura-grid grid-expanded-card3';
        if (card1El) card1El.style.display = 'none';
        if (rightStackEl) {
          rightStackEl.style.display = 'flex';
          rightStackEl.style.height = '100%';
        }
        if (card2El) card2El.style.display = 'none';
        if (card3El) {
          card3El.style.display = 'flex';
          card3El.style.flex = '1 1 100%';
        }
        if (btn1) btn1.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        if (btn2) btn2.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        if (btn3) btn3.innerHTML = '<i class="bi bi-arrows-angle-contract text-primary"></i>';
      }
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
    } else {
      const q = this.searchQuery;
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

    this.renderCard2GivenTransactions();
    this.renderCard3DepositTransactions();
  },

  // ========================================================
  // RECORD DETAIL DRAWER (< Previous, Next >, Edit, Close)
  // ========================================================
  openDetailDrawer(id, type) {
    const list = type === 'Given' ? this.filteredGiven : this.filteredDeposit;
    const idx = list.findIndex(item => String(item.id) === String(id));
    if (idx === -1) return;

    this.currentDetailRecord = list[idx];
    this.currentDetailType = type;
    this.currentDetailIndex = idx;

    this.renderDetailDrawer();

    const drawer = document.getElementById('shahpuraDetailDrawer');
    if (drawer) {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawer);
      bsDrawer.show();
    }
  },

  navigateDetail(delta) {
    const list = this.currentDetailType === 'Given' ? this.filteredGiven : this.filteredDeposit;
    const newIdx = this.currentDetailIndex + delta;
    if (newIdx < 0 || newIdx >= list.length) return;

    this.currentDetailIndex = newIdx;
    this.currentDetailRecord = list[newIdx];
    this.renderDetailDrawer();
  },

  renderDetailDrawer() {
    const r = this.currentDetailRecord;
    const type = this.currentDetailType;
    if (!r) return;

    const list = type === 'Given' ? this.filteredGiven : this.filteredDeposit;
    const hasPrev = this.currentDetailIndex > 0;
    const hasNext = this.currentDetailIndex < list.length - 1;

    const isGiven = type === 'Given';
    const colorClass = isGiven ? 'text-danger' : 'text-success';
    const dotColor = isGiven ? 'red-dot' : 'green-dot';

    const formattedAmt = '₹ ' + (Number(r.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const contentEl = document.getElementById('shahpuraDetailDrawerBody');
    if (!contentEl) return;

    contentEl.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="ShahpuraModule.navigateDetail(-1)" ${hasPrev ? '' : 'disabled'}>
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="btn btn-outline-secondary btn-sm" onclick="ShahpuraModule.navigateDetail(1)" ${hasNext ? '' : 'disabled'}>
            <i class="bi bi-chevron-right"></i>
          </button>
          <span class="text-muted small">${this.currentDetailIndex + 1} of ${list.length}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-primary btn-sm" onclick="ShahpuraModule.openEditDrawer('${r.id}', '${type}')">
            <i class="bi bi-pencil me-1"></i> Edit
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="ShahpuraModule.deleteTransactionPrompt('${r.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <div class="card mb-3 border-0 bg-light">
        <div class="card-body p-3">
          <div class="text-muted small text-uppercase fw-bold">${type} Transaction</div>
          <div class="d-flex align-items-center gap-2 mt-1">
            <span class="appsheet-circle-dot ${dotColor}">●</span>
            <span class="fs-4 fw-bold ${colorClass}">${formattedAmt}</span>
          </div>
          <div class="text-muted small mt-1">ID: ${r.id} | Date: ${r.date}</div>
        </div>
      </div>

      <div class="appsheet-detail-grid">
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value fw-bold">${r.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount</span>
          <span class="detail-value fw-bold ${colorClass}">${formattedAmt}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Truck No.</span>
          <span class="detail-value fw-bold">${r.truckNo || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${isGiven ? 'Driver / Recipient' : 'Payer / Contact'}</span>
          <span class="detail-value fw-bold">${r.name || '-'}</span>
        </div>
        ${r.phone ? `
          <div class="detail-row">
            <span class="detail-label">Mobile</span>
            <span class="detail-value">
              <a href="tel:${r.phone}" class="text-primary text-decoration-none">
                <i class="bi bi-telephone-fill me-1"></i> ${r.phone}
              </a>
            </span>
          </div>
        ` : ''}
        ${!isGiven ? `
          <div class="detail-row">
            <span class="detail-label">G.R. No.</span>
            <span class="detail-value fw-bold">${r.grNo || '-'}</span>
          </div>
        ` : ''}
        <div class="detail-row">
          <span class="detail-label">Origin</span>
          <span class="detail-value">${r.origin || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Destination</span>
          <span class="detail-value">${r.destination || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Description / Remarks</span>
          <span class="detail-value">${r.description || '-'}</span>
        </div>
      </div>
    `;
  },

  // ========================================================
  // + ADD / EDIT TRANSACTION SLIDE DRAWERS
  // ========================================================
  openAddDrawer(type = 'Given') {
    const titleEl = document.getElementById('transactionFormTitle');
    const formTypeEl = document.getElementById('txFormType');
    const editIdEl = document.getElementById('txFormEditId');

    if (titleEl) titleEl.innerText = `New ${type} Transaction`;
    if (formTypeEl) formTypeEl.value = type;
    if (editIdEl) editIdEl.value = '';

    // Reset fields
    const today = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
    document.getElementById('txDate').value = today;
    document.getElementById('txAmount').value = '';
    document.getElementById('txTruckInput').value = '';
    document.getElementById('txDriverInput').value = '';
    document.getElementById('txPhone').value = '';
    document.getElementById('txGrNo').value = '';
    document.getElementById('txOrigin').value = 'Rajsamand (Raj.)';
    document.getElementById('txDestination').value = '';
    document.getElementById('txDescription').value = '';

    // Show/hide GR No field based on type
    const grContainer = document.getElementById('txGrContainer');
    if (grContainer) {
      grContainer.style.display = type === 'Deposit' ? 'block' : 'none';
    }

    const drawer = document.getElementById('shahpuraFormDrawer');
    if (drawer) {
      const bs = bootstrap.Offcanvas.getOrCreateInstance(drawer);
      bs.show();
    }
  },

  openEditDrawer(id, type) {
    const list = type === 'Given' ? this.allGiven : this.allDeposit;
    const r = list.find(item => String(item.id) === String(id));
    if (!r) return;

    // Close detail drawer first if open
    const detailDrawer = document.getElementById('shahpuraDetailDrawer');
    if (detailDrawer) {
      bootstrap.Offcanvas.getInstance(detailDrawer)?.hide();
    }

    const titleEl = document.getElementById('transactionFormTitle');
    const formTypeEl = document.getElementById('txFormType');
    const editIdEl = document.getElementById('txFormEditId');

    if (titleEl) titleEl.innerText = `Edit ${type} Transaction (${r.id})`;
    if (formTypeEl) formTypeEl.value = type;
    if (editIdEl) editIdEl.value = r.id;

    document.getElementById('txDate').value = r.date || '';
    document.getElementById('txAmount').value = r.amount || '';
    document.getElementById('txTruckInput').value = r.truckNo || '';
    document.getElementById('txDriverInput').value = r.name || '';
    document.getElementById('txPhone').value = r.phone || '';
    document.getElementById('txGrNo').value = r.grNo || '';
    document.getElementById('txOrigin').value = r.origin || '';
    document.getElementById('txDestination').value = r.destination || '';
    document.getElementById('txDescription').value = r.description || '';

    const grContainer = document.getElementById('txGrContainer');
    if (grContainer) {
      grContainer.style.display = type === 'Deposit' ? 'block' : 'none';
    }

    const drawer = document.getElementById('shahpuraFormDrawer');
    if (drawer) {
      const bs = bootstrap.Offcanvas.getOrCreateInstance(drawer);
      bs.show();
    }
  },

  async saveTransaction() {
    const editId = document.getElementById('txFormEditId').value.trim();
    const type = document.getElementById('txFormType').value || 'Given';
    const date = document.getElementById('txDate').value.trim();
    const amount = Number(document.getElementById('txAmount').value) || 0;
    const truckNo = document.getElementById('txTruckInput').value.trim().toUpperCase();
    const name = document.getElementById('txDriverInput').value.trim();
    const phone = document.getElementById('txPhone').value.trim();
    const grNo = document.getElementById('txGrNo').value.trim();
    const origin = document.getElementById('txOrigin').value.trim();
    const destination = document.getElementById('txDestination').value.trim();
    const description = document.getElementById('txDescription').value.trim();

    if (!amount || amount <= 0) {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast('Please enter a valid amount.', 'warning');
      } else {
        alert('Please enter a valid amount.');
      }
      return;
    }

    const record = {
      id: editId || `${type === 'Deposit' ? 'DEP-' : 'GIV-'}${Date.now().toString().slice(-6)}`,
      date: date || new Date().toLocaleDateString('en-GB'),
      amount,
      truckNo,
      name,
      phone,
      grNo,
      origin,
      destination,
      description,
      type,
      updatedAt: new Date().toISOString()
    };

    if (typeof dbService !== 'undefined' && dbService.saveShahpuraTransaction) {
      await dbService.saveShahpuraTransaction(record);
    }

    await this.loadData();
    this.buildMasterLists();
    this.renderCard1AvailableCash();
    this.renderCard2GivenTransactions();
    this.renderCard3DepositTransactions();

    const drawer = document.getElementById('shahpuraFormDrawer');
    if (drawer) {
      bootstrap.Offcanvas.getInstance(drawer)?.hide();
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`${type} Transaction saved successfully!`, 'success');
    }
  },

  async deleteTransactionPrompt(id) {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    if (typeof dbService !== 'undefined' && dbService.deleteShahpuraTransaction) {
      await dbService.deleteShahpuraTransaction(id);
    }

    const detailDrawer = document.getElementById('shahpuraDetailDrawer');
    if (detailDrawer) {
      bootstrap.Offcanvas.getInstance(detailDrawer)?.hide();
    }

    await this.loadData();
    this.renderCard1AvailableCash();
    this.renderCard2GivenTransactions();
    this.renderCard3DepositTransactions();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Transaction deleted successfully.', 'info');
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

    // Auto-fill Driver if matched
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
    if (phone) document.getElementById('txPhone').value = phone;
    if (truckNo) {
      const truckIn = document.getElementById('txTruckInput');
      if (truckIn && !truckIn.value) truckIn.value = truckNo;
    }
    document.getElementById('txDriverDropdownList').classList.remove('show');
  },

  setupListeners() {
    // Hide combobox dropdowns on outside click
    document.addEventListener('click', (e) => {
      const truckDrop = document.getElementById('txTruckDropdownList');
      if (truckDrop && !e.target.closest('#txTruckComboboxWrapper')) {
        truckDrop.classList.remove('show');
      }
      const driverDrop = document.getElementById('txDriverDropdownList');
      if (driverDrop && !e.target.closest('#txDriverComboboxWrapper')) {
        driverDrop.classList.remove('show');
      }
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShahpuraModule;
}
