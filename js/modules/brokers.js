/**
 * Master Controller for Module: Brokers (1:1 Google AppSheet Directory)
 * Supports Table View (1,047 Brokers), Record Detail View, Navigation (< Prev, Next >),
 * Add / Edit Slide Drawer, Real-Time Typeahead Search, and Zero LocalStorage Policy.
 */

const BrokersModule = {
  activeView: 'table', // 'table' | 'detail'
  currentBrokerId: null,
  allBrokers: [],
  filteredBrokers: [],
  searchQuery: '',

  async init() {
    console.log('[BrokersModule] Initializing 1:1 AppSheet Brokers module...');
    await this.loadBrokers();
    this.renderBreadcrumb();
    this.renderCurrentView();
    console.log('[BrokersModule] Initialized successfully. Total brokers:', this.allBrokers.length);
  },

  async loadBrokers() {
    try {
      if (typeof dbService !== 'undefined' && dbService.getAll) {
        const stored = await dbService.getAll('brokers');
        if (stored && stored.length > 0) {
          this.allBrokers = [...stored];
        }
      }

      if ((!this.allBrokers || this.allBrokers.length === 0) && typeof SAMPLE_BROKERS_DATA !== 'undefined') {
        this.allBrokers = [...SAMPLE_BROKERS_DATA];
      }
    } catch (err) {
      console.warn('[BrokersModule] loadBrokers fallback:', err);
      if (typeof SAMPLE_BROKERS_DATA !== 'undefined') {
        this.allBrokers = [...SAMPLE_BROKERS_DATA];
      }
    }

    this.filteredBrokers = [...this.allBrokers];
  },

  // ========================================================
  // VIEW SWITCHER & BREADCRUMB
  // ========================================================
  setView(viewName, brokerId = null) {
    this.activeView = viewName;
    if (brokerId) {
      this.currentBrokerId = brokerId;
    }

    this.renderBreadcrumb();
    this.renderCurrentView();
  },

  renderBreadcrumb() {
    const subbar = document.getElementById('brokerSubbar');
    if (!subbar) return;

    if (this.activeView === 'table') {
      subbar.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1 text-muted">&gt;</span>
          <span class="text-dark fw-medium">Brokers</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-appsheet-add" onclick="BrokersModule.openAddDrawer()">
            <i class="bi bi-plus-lg"></i> Add
          </button>
          <div class="vr mx-1" style="height: 18px; color: #dadce0;"></div>
          <button class="btn-icon-subtle" title="Sort / Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>
      `;
    } else if (this.activeView === 'detail') {
      subbar.innerHTML = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="mx-1 text-muted">&gt;</span>
          <a href="javascript:void(0)" class="breadcrumb-item-home" onclick="BrokersModule.setView('table')">Brokers</a>
          <span class="mx-1 text-muted">&gt;</span>
          <span class="text-dark fw-medium">Details</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="appsheet-nav-btn" title="Previous Broker" onclick="BrokersModule.navigateDetail(-1)">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="appsheet-nav-btn" title="Next Broker" onclick="BrokersModule.navigateDetail(1)">
            <i class="bi bi-chevron-right"></i>
          </button>
          <div class="vr mx-1" style="height: 18px; color: #dadce0;"></div>
          <button class="btn-icon-subtle" title="Edit Broker" onclick="BrokersModule.openEditDrawer('${this.currentBrokerId}')">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-icon-subtle" title="Back to Table View" onclick="BrokersModule.setView('table')">
            <i class="bi bi-grid-fill"></i>
          </button>
        </div>
      `;
    }
  },

  renderCurrentView() {
    const container = document.getElementById('brokerMainContent');
    if (!container) return;

    if (this.activeView === 'table') {
      this.renderTableView(container);
    } else if (this.activeView === 'detail') {
      this.renderDetailView(container);
    }
  },

  // ========================================================
  // MAIN TABLE VIEW (1:1 APPSHEET DIRECTORY)
  // ========================================================
  renderTableView(container) {
    const list = this.filteredBrokers;

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title">
          <span>Brokers</span>
          <span class="appsheet-count-badge">Number <span id="brokerCount">${list.length}</span></span>
        </div>
      </div>

      <div class="appsheet-table-card">
        <table class="appsheet-table">
          <thead>
            <tr>
              <th style="width: 45%;">Name</th>
              <th style="width: 25%;">Mobile No.</th>
              <th style="width: 25%;">Mobile No. 1</th>
              <th style="width: 5%; text-align: right;"></th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `
              <tr>
                <td colspan="4" class="text-center py-5 text-muted">
                  <i class="bi bi-people fs-2 d-block mb-2 text-secondary"></i>
                  No brokers matching "<strong>${this.searchQuery}</strong>".
                </td>
              </tr>
            ` : list.map(b => `
              <tr onclick="BrokersModule.openDetail('${b.id}')">
                <td>
                  <div class="broker-name-cell">
                    <i class="bi bi-person-circle text-secondary fs-6"></i>
                    <span>${b.name || '-'}</span>
                  </div>
                </td>
                <td>
                  ${b.mobile ? `
                    <a href="tel:${b.mobile}" class="broker-phone-link" onclick="event.stopPropagation()">
                      <i class="bi bi-telephone text-success"></i> ${b.mobile}
                    </a>
                  ` : `<span class="text-muted">-</span>`}
                </td>
                <td>
                  ${b.mobile1 ? `
                    <a href="tel:${b.mobile1}" class="broker-phone-link" onclick="event.stopPropagation()">
                      <i class="bi bi-telephone text-primary"></i> ${b.mobile1}
                    </a>
                  ` : `<span class="text-muted">-</span>`}
                </td>
                <td style="text-align: right;">
                  <i class="bi bi-chevron-right broker-chevron"></i>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ========================================================
  // RECORD DETAIL VIEW (1:1 APPSHEET DETAILS)
  // ========================================================
  renderDetailView(container) {
    const broker = this.allBrokers.find(b => b.id === this.currentBrokerId) || this.allBrokers[0];
    if (!broker) {
      this.setView('table');
      return;
    }

    container.innerHTML = `
      <div class="detail-container">
        <div class="detail-header-card">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-primary-subtle text-primary p-3 fs-3 d-flex align-items-center justify-content-center" style="width: 54px; height: 54px;">
              <i class="bi bi-person-fill"></i>
            </div>
            <div>
              <h5 class="mb-0 fw-bold text-dark">${broker.name || 'Unnamed Broker'}</h5>
              <small class="text-muted font-monospace">${broker.id || ''}</small>
            </div>
          </div>
          <button class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1" onclick="BrokersModule.openEditDrawer('${broker.id}')">
            <i class="bi bi-pencil"></i> Edit
          </button>
        </div>

        <div class="detail-body">
          <!-- Row 1: Name -->
          <div class="detail-row">
            <div class="detail-label">Name</div>
            <div class="detail-value">${broker.name || '-'}</div>
          </div>

          <!-- Row 2: Mobile No. -->
          <div class="detail-row">
            <div class="detail-label">Mobile No.</div>
            <div class="detail-value d-flex align-items-center gap-3">
              <span class="font-monospace fw-bold fs-6 text-dark">${broker.mobile || '-'}</span>
              ${broker.mobile ? `
                <a href="tel:${broker.mobile}" class="btn btn-success btn-sm py-0 px-2" title="Call Broker">
                  <i class="bi bi-telephone-fill small"></i> Call
                </a>
                <a href="https://wa.me/91${broker.mobile}" target="_blank" class="btn btn-outline-success btn-sm py-0 px-2" title="WhatsApp Message">
                  <i class="bi bi-whatsapp small"></i> WhatsApp
                </a>
              ` : ''}
            </div>
          </div>

          <!-- Row 3: Mobile No. 1 -->
          ${broker.mobile1 ? `
            <div class="detail-row">
              <div class="detail-label">Mobile No. 1</div>
              <div class="detail-value d-flex align-items-center gap-3">
                <span class="font-monospace text-dark">${broker.mobile1}</span>
                <a href="tel:${broker.mobile1}" class="btn btn-outline-primary btn-sm py-0 px-2">
                  <i class="bi bi-telephone small"></i> Call
                </a>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Footer Action Strip -->
        <div class="bg-light p-3 border-top d-flex align-items-center justify-content-between">
          <button class="btn btn-outline-secondary btn-sm" onclick="BrokersModule.setView('table')">
            <i class="bi bi-arrow-left me-1"></i> Back to Brokers
          </button>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-danger btn-sm" onclick="BrokersModule.deleteBroker('${broker.id}')">
              <i class="bi bi-trash me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
  },

  openDetail(brokerId) {
    this.setView('detail', brokerId);
  },

  navigateDetail(delta) {
    if (!this.currentBrokerId || this.filteredBrokers.length === 0) return;
    const curIdx = this.filteredBrokers.findIndex(b => b.id === this.currentBrokerId);
    let nextIdx = curIdx + delta;

    if (nextIdx < 0) nextIdx = this.filteredBrokers.length - 1;
    if (nextIdx >= this.filteredBrokers.length) nextIdx = 0;

    const nextBroker = this.filteredBrokers[nextIdx];
    if (nextBroker) {
      this.setView('detail', nextBroker.id);
    }
  },

  // ========================================================
  // REAL-TIME SEARCH
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').trim().toLowerCase();

    if (!this.searchQuery) {
      this.filteredBrokers = [...this.allBrokers];
    } else {
      const q = this.searchQuery;
      this.filteredBrokers = this.allBrokers.filter(b => {
        return (
          (b.name && b.name.toLowerCase().includes(q)) ||
          (b.mobile && b.mobile.toLowerCase().includes(q)) ||
          (b.mobile1 && b.mobile1.toLowerCase().includes(q)) ||
          (b.location && b.location.toLowerCase().includes(q))
        );
      });
    }

    if (this.activeView === 'table') {
      const container = document.getElementById('brokerMainContent');
      if (container) this.renderTableView(container);
    }
  },

  // ========================================================
  // + ADD / EDIT SLIDE DRAWER (1:1 APPSHEET)
  // ========================================================
  openAddDrawer() {
    document.getElementById('formBrokerId').value = '';
    document.getElementById('brokerDrawerTitle').innerText = 'Details';
    document.getElementById('brokerInputName').value = '';
    document.getElementById('brokerInputMobile').value = '';
    document.getElementById('brokerInputMobile1').value = '';

    const drawer = document.getElementById('brokerDrawer');
    if (drawer && typeof bootstrap !== 'undefined') {
      bootstrap.Offcanvas.getOrCreateInstance(drawer).show();
    }
  },

  openEditDrawer(brokerId) {
    const broker = this.allBrokers.find(b => b.id === brokerId);
    if (!broker) return;

    document.getElementById('formBrokerId').value = broker.id;
    document.getElementById('brokerDrawerTitle').innerText = 'Details';
    document.getElementById('brokerInputName').value = broker.name || '';
    document.getElementById('brokerInputMobile').value = broker.mobile || '';
    document.getElementById('brokerInputMobile1').value = broker.mobile1 || '';

    const drawer = document.getElementById('brokerDrawer');
    if (drawer && typeof bootstrap !== 'undefined') {
      bootstrap.Offcanvas.getOrCreateInstance(drawer).show();
    }
  },

  async saveBroker() {
    const id = document.getElementById('formBrokerId').value.trim();
    const name = document.getElementById('brokerInputName').value.trim();
    const mobile = document.getElementById('brokerInputMobile').value.trim();
    const mobile1 = document.getElementById('brokerInputMobile1').value.trim();

    if (!name) {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast('Please enter Broker Name.', 'warning');
      } else {
        alert('Please enter Broker Name.');
      }
      return;
    }

    if (!mobile) {
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast('Please enter Mobile Number.', 'warning');
      } else {
        alert('Please enter Mobile Number.');
      }
      return;
    }

    const record = {
      id: id || `BRK-${String(this.allBrokers.length + 1).padStart(4, '0')}`,
      name,
      mobile,
      mobile1,
      updatedAt: new Date().toISOString()
    };

    if (typeof dbService !== 'undefined' && dbService.save) {
      await dbService.save('brokers', record);
    }

    if (id) {
      const idx = this.allBrokers.findIndex(b => b.id === id);
      if (idx !== -1) {
        this.allBrokers[idx] = { ...this.allBrokers[idx], ...record };
      }
    } else {
      this.allBrokers.unshift(record);
    }

    this.handleSearch(this.searchQuery);

    const drawer = document.getElementById('brokerDrawer');
    if (drawer && typeof bootstrap !== 'undefined') {
      bootstrap.Offcanvas.getInstance(drawer)?.hide();
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Broker details saved successfully!', 'success');
    }

    if (this.activeView === 'detail') {
      this.currentBrokerId = record.id;
      this.renderCurrentView();
    }
  },

  async deleteBroker(brokerId) {
    if (!confirm('Are you sure you want to delete this broker record?')) {
      return;
    }

    if (typeof dbService !== 'undefined' && dbService.delete) {
      await dbService.delete('brokers', brokerId);
    }

    this.allBrokers = this.allBrokers.filter(b => b.id !== brokerId);
    this.handleSearch(this.searchQuery);

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Broker record deleted.', 'info');
    }

    this.setView('table');
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrokersModule;
}
