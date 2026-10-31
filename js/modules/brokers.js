/**
 * Master Controller for Module: Brokers (1:1 Google AppSheet Directory)
 * Supports Table View (1,047 Brokers), Record Detail View, Navigation (< Prev, Next >),
 * Add / Edit Slide Drawer with Combobox for Drivers/Owners & Broker Name,
 * Real-Time Typeahead Search, and Zero LocalStorage Policy.
 */

const BrokersModule = {
  activeView: 'table', // 'table' | 'detail'
  currentBrokerId: null,
  allBrokers: [],
  filteredBrokers: [],
  ownerDriverList: [],
  brokerNameList: [],
  searchQuery: '',

  async init() {
    console.log('[BrokersModule] Initializing 1:1 AppSheet Brokers module...');
    await this.loadBrokers();
    this.buildMasterLists();
    this.renderBreadcrumb();
    this.renderCurrentView();
    this.setupListeners();
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

  buildMasterLists() {
    // 1. Owners & Drivers Master List (Typeahead Combobox)
    const ownerDrivers = [];
    const seenOD = new Set();

    // From Truck Owners Directory
    const rawOwners = (typeof _INITIAL_TRUCK_OWNERS !== 'undefined') ? _INITIAL_TRUCK_OWNERS :
      (typeof SAMPLE_TRUCK_OWNERS_DATA !== 'undefined' ? SAMPLE_TRUCK_OWNERS_DATA : []);

    for (const o of rawOwners) {
      if (o.name && o.name.trim()) {
        const k = o.name.trim().toLowerCase();
        if (!seenOD.has(k)) {
          seenOD.add(k);
          ownerDrivers.push({
            name: o.name.trim(),
            mobile: o.mobile || '',
            mobile1: o.mobile1 || '',
            truckNo: o.truckNo || '',
            role: 'Owner'
          });
        }
      }
    }

    // From Drivers Directory
    const rawDrivers = (typeof INITIAL_DRIVERS !== 'undefined') ? INITIAL_DRIVERS :
      (typeof SAMPLE_DRIVERS_DATA !== 'undefined' ? SAMPLE_DRIVERS_DATA : []);

    for (const d of rawDrivers) {
      if (d.name && d.name.trim()) {
        const k = d.name.trim().toLowerCase();
        if (!seenOD.has(k)) {
          seenOD.add(k);
          ownerDrivers.push({
            name: d.name.trim(),
            mobile: d.mobile || '',
            mobile1: '',
            truckNo: d.truckNo || '',
            role: 'Driver'
          });
        }
      }
    }

    this.ownerDriverList = ownerDrivers.sort((a, b) => a.name.localeCompare(b.name));

    // 2. Broker Names Master List (Typeahead Combobox)
    const bNames = [];
    const seenB = new Set();
    for (const b of this.allBrokers) {
      if (b.name && b.name.trim()) {
        const k = b.name.trim().toLowerCase();
        if (!seenB.has(k)) {
          seenB.add(k);
          bNames.push({
            name: b.name.trim(),
            mobile: b.mobile || '',
            mobile1: b.mobile1 || ''
          });
        }
      }
    }
    this.brokerNameList = bNames.sort((a, b) => a.name.localeCompare(b.name));
  },

  setupListeners() {
    // Close comboboxes when clicking outside
    if (typeof document !== 'undefined') {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#brokerOwnerDriverRow')) {
          const dd1 = document.getElementById('brokerOwnerDriverDropdown');
          if (dd1) dd1.classList.remove('show');
        }
        if (!e.target.closest('#brokerNameRow')) {
          const dd2 = document.getElementById('brokerNameDropdown');
          if (dd2) dd2.classList.remove('show');
        }
      });
    }
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
  // MAIN TABLE VIEW (1:1 APPSHEET DIRECTORY - NO ICONS BEFORE NAME)
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
                  No brokers matching "<strong>${this.searchQuery}</strong>".
                </td>
              </tr>
            ` : list.map(b => `
              <tr onclick="BrokersModule.openDetail('${b.id}')">
                <td>
                  <span class="broker-name-cell">${b.name || '-'}</span>
                </td>
                <td class="broker-phone-cell">
                  ${b.mobile ? `
                    <a href="tel:${b.mobile}" class="broker-phone-link" onclick="event.stopPropagation()">${b.mobile}</a>
                  ` : `<span class="text-muted">-</span>`}
                </td>
                <td class="broker-phone-cell">
                  ${b.mobile1 ? `
                    <a href="tel:${b.mobile1}" class="broker-phone-link text-muted" onclick="event.stopPropagation()">${b.mobile1}</a>
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
  // RECORD DETAIL VIEW (1:1 APPSHEET DETAILS - CLEAN LAYOUT)
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
          <div>
            <h5 class="mb-1 fw-bold text-dark">${broker.name || 'Unnamed Broker'}</h5>
            <span class="badge bg-light text-secondary border font-monospace">${broker.id || ''}</span>
          </div>
          <button class="btn btn-sm text-white d-inline-flex align-items-center gap-1" style="background-color: #c3b15a; border-radius: 3px;" onclick="BrokersModule.openEditDrawer('${broker.id}')">
            <i class="bi bi-pencil"></i> Edit
          </button>
        </div>

        <div class="detail-body">
          <!-- Row 1: Name -->
          <div class="detail-row">
            <div class="detail-label">Name</div>
            <div class="detail-value fw-bold text-dark">${broker.name || '-'}</div>
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
                <a href="tel:${broker.mobile1}" class="btn btn-outline-secondary btn-sm py-0 px-2">
                  <i class="bi bi-telephone small"></i> Call
                </a>
              </div>
            </div>
          ` : ''}

          <!-- Row 4: Linked Driver / Owner Name (if present) -->
          ${broker.ownerDriverName ? `
            <div class="detail-row">
              <div class="detail-label">Drivers / Owners Name</div>
              <div class="detail-value text-secondary">${broker.ownerDriverName}</div>
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
          (b.location && b.location.toLowerCase().includes(q)) ||
          (b.ownerDriverName && b.ownerDriverName.toLowerCase().includes(q))
        );
      });
    }

    if (this.activeView === 'table') {
      const container = document.getElementById('brokerMainContent');
      if (container) this.renderTableView(container);
    }
  },

  // ========================================================
  // COMBOBOX: DRIVERS / OWNERS NAME (TYPE + SELECT)
  // ========================================================
  filterOwnerDriverCombobox(val) {
    const listEl = document.getElementById('brokerOwnerDriverDropdown');
    if (!listEl) return;

    const q = (val || '').toLowerCase().trim();
    const matched = this.ownerDriverList.filter(item => {
      return (
        item.name.toLowerCase().includes(q) ||
        (item.mobile && item.mobile.includes(q)) ||
        (item.truckNo && item.truckNo.toLowerCase().includes(q))
      );
    });

    if (matched.length === 0) {
      listEl.innerHTML = `<li class="text-muted small py-2 px-3">No owner/driver found matching "${val}"</li>`;
    } else {
      listEl.innerHTML = matched.slice(0, 35).map(item => `
        <li onclick="BrokersModule.selectOwnerDriverCombobox('${item.name.replace(/'/g, "\\'")}', '${item.mobile || ''}', '${item.mobile1 || ''}')">
          <div>
            <strong>${item.name}</strong>
            ${item.truckNo ? `<span class="badge bg-light text-dark border ms-1 font-monospace">${item.truckNo}</span>` : ''}
          </div>
          <small class="text-muted font-monospace">${item.mobile || ''} <span class="badge bg-secondary-subtle text-secondary ms-1">${item.role}</span></small>
        </li>
      `).join('');
    }

    listEl.classList.add('show');
  },

  toggleOwnerDriverCombobox() {
    const listEl = document.getElementById('brokerOwnerDriverDropdown');
    if (!listEl) return;
    if (listEl.classList.contains('show')) {
      listEl.classList.remove('show');
    } else {
      const curVal = document.getElementById('brokerOwnerDriverInput')?.value || '';
      this.filterOwnerDriverCombobox(curVal);
    }
  },

  selectOwnerDriverCombobox(name, mobile, mobile1) {
    const inOD = document.getElementById('brokerOwnerDriverInput');
    if (inOD) inOD.value = name;

    const inName = document.getElementById('brokerInputName');
    if (inName) inName.value = name;

    const inMobile = document.getElementById('brokerInputMobile');
    if (inMobile && mobile) inMobile.value = mobile;

    const inMobile1 = document.getElementById('brokerInputMobile1');
    if (inMobile1 && mobile1) inMobile1.value = mobile1;

    const listEl = document.getElementById('brokerOwnerDriverDropdown');
    if (listEl) listEl.classList.remove('show');
  },

  // ========================================================
  // COMBOBOX: NAME (TYPE + SELECT ALL BROKERS)
  // ========================================================
  filterNameCombobox(val) {
    const listEl = document.getElementById('brokerNameDropdown');
    if (!listEl) return;

    const q = (val || '').toLowerCase().trim();
    const matched = this.brokerNameList.filter(item => {
      return (
        item.name.toLowerCase().includes(q) ||
        (item.mobile && item.mobile.includes(q))
      );
    });

    if (matched.length === 0) {
      listEl.innerHTML = `<li class="text-muted small py-2 px-3">Type any new broker name</li>`;
    } else {
      listEl.innerHTML = matched.slice(0, 35).map(item => `
        <li onclick="BrokersModule.selectNameCombobox('${item.name.replace(/'/g, "\\'")}', '${item.mobile || ''}', '${item.mobile1 || ''}')">
          <div>
            <strong>${item.name}</strong>
          </div>
          <small class="text-muted font-monospace">${item.mobile || ''}</small>
        </li>
      `).join('');
    }

    listEl.classList.add('show');
  },

  toggleNameCombobox() {
    const listEl = document.getElementById('brokerNameDropdown');
    if (!listEl) return;
    if (listEl.classList.contains('show')) {
      listEl.classList.remove('show');
    } else {
      const curVal = document.getElementById('brokerInputName')?.value || '';
      this.filterNameCombobox(curVal);
    }
  },

  selectNameCombobox(name, mobile, mobile1) {
    const inName = document.getElementById('brokerInputName');
    if (inName) inName.value = name;

    const inMobile = document.getElementById('brokerInputMobile');
    if (inMobile && mobile) inMobile.value = mobile;

    const inMobile1 = document.getElementById('brokerInputMobile1');
    if (inMobile1 && mobile1) inMobile1.value = mobile1;

    const listEl = document.getElementById('brokerNameDropdown');
    if (listEl) listEl.classList.remove('show');
  },

  // ========================================================
  // + ADD / EDIT SLIDE DRAWER (1:1 APPSHEET)
  // ========================================================
  openAddDrawer() {
    document.getElementById('formBrokerId').value = '';
    document.getElementById('brokerDrawerTitle').innerText = 'Details';
    document.getElementById('brokerOwnerDriverInput').value = '';
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
    document.getElementById('brokerOwnerDriverInput').value = broker.ownerDriverName || '';
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
    const ownerDriverName = document.getElementById('brokerOwnerDriverInput')?.value?.trim() || '';
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
      ownerDriverName,
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

    this.buildMasterLists();
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
    this.buildMasterLists();
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
