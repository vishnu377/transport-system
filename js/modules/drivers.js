/**
 * Drivers Module - Module 12: Drivers (ड्राइवर्स डायरेक्टरी)
 * 1:1 Authentic Google AppSheet Directory Replication
 * Supports Table View (903 Drivers), Record Detail View, Navigation (< Prev, Next >),
 * Add / Edit Slide Drawer with Combobox for Driver Owner Name & Driver Name,
 * Real-Time Typeahead Search, and Zero LocalStorage Policy.
 */

const DriversModule = {
  currentView: 'table', // 'table' | 'detail'
  currentDriverId: null,
  allDrivers: [],
  filteredDrivers: [],
  searchQuery: '',
  ownerDriverList: [],
  driverNameList: [],

  // ========================================================
  // INITIALIZATION
  // ========================================================
  async init() {
    console.log('[DriversModule] Initializing 1:1 AppSheet Drivers module...');
    await this.loadData();
    this.buildMasterLists();
    this.setupDropdownCloseListeners();
    this.renderCurrentView();
    console.log(`[DriversModule] Initialized successfully. Total drivers: ${this.allDrivers.length}`);
  },

  async loadData() {
    if (typeof dbService !== 'undefined' && dbService.getAll) {
      try {
        const data = await dbService.getAll('drivers');
        if (data && data.length > 0) {
          this.allDrivers = data;
          this.filteredDrivers = [...this.allDrivers];
          return;
        }
      } catch (err) {
        console.warn('[DriversModule] Could not fetch from dbService, using sample dataset:', err);
      }
    }

    if (typeof INITIAL_DRIVERS !== 'undefined' && Array.isArray(INITIAL_DRIVERS)) {
      this.allDrivers = JSON.parse(JSON.stringify(INITIAL_DRIVERS));
    } else {
      this.allDrivers = [];
    }
    this.filteredDrivers = [...this.allDrivers];
  },

  buildMasterLists() {
    const ownerDrivers = [];
    const seenOD = new Set();

    // 1. Authentic Truck Owners (596 records)
    const ownersData = (typeof _INITIAL_TRUCK_OWNERS !== 'undefined' && Array.isArray(_INITIAL_TRUCK_OWNERS))
      ? _INITIAL_TRUCK_OWNERS
      : (typeof INITIAL_TRUCK_OWNERS !== 'undefined' && Array.isArray(INITIAL_TRUCK_OWNERS))
        ? INITIAL_TRUCK_OWNERS
        : (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS))
          ? window.INITIAL_TRUCK_OWNERS
          : [];

    ownersData.forEach(o => {
      const k = (o.name || '').trim();
      if (k && !seenOD.has(k.toLowerCase())) {
        seenOD.add(k.toLowerCase());
        ownerDrivers.push({
          name: k,
          mobile: (o.mobile || o.phone || '').trim(),
          mobile1: (o.mobile1 || '').trim(),
          type: 'Owner'
        });
      }
    });

    // 2. Existing Drivers
    this.allDrivers.forEach(d => {
      const k = (d.ownerDriverName || '').trim();
      if (k && !seenOD.has(k.toLowerCase())) {
        seenOD.add(k.toLowerCase());
        ownerDrivers.push({
          name: k,
          mobile: (d.mobile || '').trim(),
          mobile1: (d.mobile1 || '').trim(),
          type: 'Owner/Driver'
        });
      }
    });

    this.ownerDriverList = ownerDrivers.sort((a, b) => a.name.localeCompare(b.name));

    // Master Driver Names
    const dNames = [];
    const seenD = new Set();
    this.allDrivers.forEach(d => {
      const k = (d.name || '').trim();
      if (k && !seenD.has(k.toLowerCase())) {
        seenD.add(k.toLowerCase());
        dNames.push({
          name: k,
          mobile: (d.mobile || '').trim(),
          mobile1: (d.mobile1 || '').trim()
        });
      }
    });
    this.driverNameList = dNames.sort((a, b) => a.name.localeCompare(b.name));
  },

  setupDropdownCloseListeners() {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#driverOwnerDriverRow')) {
          const list = document.getElementById('driverOwnerDriverDropdown');
          if (list) list.classList.remove('show');
        }
        if (!e.target.closest('#driverNameRow')) {
          const list = document.getElementById('driverNameDropdown');
          if (list) list.classList.remove('show');
        }
      });
    }
  },

  // ========================================================
  // VIEW SWITCHING & BREADCRUMB
  // ========================================================
  setView(viewName, driverId = null) {
    this.currentView = viewName;
    if (driverId) {
      this.currentDriverId = driverId;
    }
    this.renderCurrentView();
  },

  renderCurrentView() {
    this.renderBreadcrumb();
    if (this.currentView === 'detail') {
      this.renderDetailView(this.currentDriverId);
    } else {
      this.renderTableView();
    }
  },

  renderBreadcrumb() {
    const subbar = document.getElementById('driverSubbar');
    if (!subbar) return;

    let html = '';
    if (this.currentView === 'table') {
      html = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home"><i class="bi bi-house-door"></i> Home</a>
          <span class="text-muted mx-1">&gt;</span>
          <span class="text-dark fw-medium">Drivers</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-appsheet-add" onclick="DriversModule.openAddDrawer()">
            <i class="bi bi-plus-lg"></i> Add
          </button>
          <div class="vr mx-1" style="height: 18px; color: #dadce0;"></div>
          <button class="btn-icon-subtle" title="Sort / Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>
      `;
    } else if (this.currentView === 'detail') {
      html = `
        <div class="d-flex align-items-center gap-1">
          <a href="../index.html" class="breadcrumb-item-home">Home</a>
          <span class="text-muted mx-1">&gt;</span>
          <a href="javascript:void(0)" onclick="DriversModule.setView('table')" class="breadcrumb-item-home">Drivers</a>
          <span class="text-muted mx-1">&gt;</span>
          <span class="text-dark fw-medium">Details</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="appsheet-nav-btn" title="Previous Driver" onclick="DriversModule.navigateDetail(-1)">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="appsheet-nav-btn" title="Next Driver" onclick="DriversModule.navigateDetail(1)">
            <i class="bi bi-chevron-right"></i>
          </button>
          <button class="btn btn-sm text-white d-inline-flex align-items-center gap-1" style="background-color: #c3b15a; border-radius: 3px;" title="Edit Driver" onclick="DriversModule.openEditDrawer('${this.currentDriverId}')">
            <i class="bi bi-pencil"></i> Edit
          </button>
          <button class="btn-icon-subtle" title="Back to Table View" onclick="DriversModule.setView('table')">
            <i class="bi bi-grid-fill"></i>
          </button>
        </div>
      `;
    }
    subbar.innerHTML = html;
  },

  // ========================================================
  // TABLE VIEW (1:1 GOOGLE APPSHEET DESKTOP DIRECTORY)
  // ========================================================
  renderTableView() {
    const container = document.getElementById('driverMainContent');
    if (!container) return;

    if (this.filteredDrivers.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-person-x fs-1 d-block mb-3 text-secondary"></i>
          <h6>No drivers found</h6>
          <p class="small">Try adjusting your search criteria or click <strong>+ Add</strong> to create a new driver.</p>
        </div>
      `;
      return;
    }

    let rowsHtml = '';
    this.filteredDrivers.forEach(driver => {
      rowsHtml += `
        <tr onclick="DriversModule.setView('detail', '${driver.id}')" title="Click to view driver details">
          <td class="driver-owner-cell">${driver.ownerDriverName || '-'}</td>
          <td class="driver-name-cell">${driver.name || '-'}</td>
          <td class="driver-phone-cell">${driver.mobile || '-'}</td>
          <td class="driver-phone-cell">${driver.mobile1 || '-'}</td>
        </tr>
      `;
    });

    container.innerHTML = `
      <div class="appsheet-table-wrap">
        <table class="appsheet-table">
          <thead>
            <tr>
              <th style="width: 28%;">Driver Owner Name</th>
              <th style="width: 32%;">Name</th>
              <th style="width: 20%;">Mobile No.</th>
              <th style="width: 20%;">Mobile No. 1</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  },

  // ========================================================
  // RECORD DETAIL VIEW (1:1 APPSHEET RECORD CARD)
  // ========================================================
  renderDetailView(driverId) {
    const container = document.getElementById('driverMainContent');
    if (!container) return;

    const driver = this.allDrivers.find(d => d.id === driverId);
    if (!driver) {
      container.innerHTML = `
        <div class="p-4 text-center text-muted">
          <p>Driver record not found.</p>
          <button class="btn btn-sm btn-outline-secondary" onclick="DriversModule.setView('table')">
            <i class="bi bi-arrow-left"></i> Back to Drivers
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="detail-container">
        <div class="detail-header-card">
          <div>
            <h5 class="mb-1 fw-bold text-dark">${driver.name || 'Unnamed Driver'}</h5>
            <span class="badge bg-light text-secondary border font-monospace">${driver.id || ''}</span>
          </div>
          <button class="btn btn-sm text-white d-inline-flex align-items-center gap-1" style="background-color: #c3b15a; border-radius: 3px;" onclick="DriversModule.openEditDrawer('${driver.id}')">
            <i class="bi bi-pencil"></i> Edit
          </button>
        </div>

        <div class="detail-body">
          <!-- Row 1: Driver Owner Name -->
          <div class="detail-row">
            <div class="detail-label">Driver Owner Name</div>
            <div class="detail-value fw-medium text-dark">${driver.ownerDriverName || '-'}</div>
          </div>

          <!-- Row 2: Name -->
          <div class="detail-row">
            <div class="detail-label">Name</div>
            <div class="detail-value fw-bold text-dark">${driver.name || '-'}</div>
          </div>

          <!-- Row 3: Mobile No. -->
          <div class="detail-row">
            <div class="detail-label">Mobile No.</div>
            <div class="detail-value d-flex align-items-center gap-3">
              <span class="font-monospace fw-bold fs-6 text-dark">${driver.mobile || '-'}</span>
              ${driver.mobile ? `
                <a href="tel:${driver.mobile}" class="btn btn-success btn-sm py-0 px-2" title="Call Driver">
                  <i class="bi bi-telephone-fill small"></i> Call
                </a>
                <a href="https://wa.me/91${driver.mobile}" target="_blank" class="btn btn-outline-success btn-sm py-0 px-2" title="WhatsApp Message">
                  <i class="bi bi-whatsapp small"></i> WhatsApp
                </a>
              ` : ''}
            </div>
          </div>

          <!-- Row 4: Mobile No. 1 -->
          ${driver.mobile1 ? `
            <div class="detail-row">
              <div class="detail-label">Mobile No. 1</div>
              <div class="detail-value d-flex align-items-center gap-3">
                <span class="font-monospace text-dark">${driver.mobile1}</span>
                <a href="tel:${driver.mobile1}" class="btn btn-outline-secondary btn-sm py-0 px-2">
                  <i class="bi bi-telephone small"></i> Call
                </a>
              </div>
            </div>
          ` : ''}

          <!-- Actions Footer -->
          <div class="d-flex align-items-center justify-content-between pt-4 mt-3 border-top">
            <button class="btn btn-outline-secondary btn-sm" onclick="DriversModule.setView('table')">
              <i class="bi bi-arrow-left me-1"></i> Back to Drivers
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="DriversModule.deleteDriver('${driver.id}')">
              <i class="bi bi-trash me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
  },

  navigateDetail(delta) {
    if (!this.currentDriverId || this.filteredDrivers.length === 0) return;
    const currentIndex = this.filteredDrivers.findIndex(d => d.id === this.currentDriverId);
    let newIndex = currentIndex + delta;
    if (newIndex < 0) newIndex = this.filteredDrivers.length - 1;
    if (newIndex >= this.filteredDrivers.length) newIndex = 0;
    this.currentDriverId = this.filteredDrivers[newIndex].id;
    this.renderCurrentView();
  },

  // ========================================================
  // REAL-TIME SEARCH ENGINE
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').trim().toLowerCase();
    if (!this.searchQuery) {
      this.filteredDrivers = [...this.allDrivers];
    } else {
      this.filteredDrivers = this.allDrivers.filter(d => {
        const nameMatch = (d.name || '').toLowerCase().includes(this.searchQuery);
        const ownerMatch = (d.ownerDriverName || '').toLowerCase().includes(this.searchQuery);
        const mobileMatch = (d.mobile || '').includes(this.searchQuery);
        const mobile1Match = (d.mobile1 || '').includes(this.searchQuery);
        return nameMatch || ownerMatch || mobileMatch || mobile1Match;
      });
    }

    if (this.currentView === 'table') {
      this.renderTableView();
    }
  },

  // ========================================================
  // DRIVER OWNER NAME COMBOBOX
  // ========================================================
  filterOwnerDriverCombobox(val) {
    const listEl = document.getElementById('driverOwnerDriverDropdown');
    if (!listEl) return;
    const query = (val || '').trim().toLowerCase();

    const matches = this.ownerDriverList.filter(o => 
      o.name.toLowerCase().includes(query) || (o.mobile && o.mobile.includes(query))
    ).slice(0, 50);

    if (matches.length === 0) {
      listEl.innerHTML = `<li class="text-muted" style="cursor: default;">No matches found</li>`;
    } else {
      listEl.innerHTML = matches.map(o => `
        <li onclick="DriversModule.selectOwnerDriverCombobox('${o.name.replace(/'/g, "\\'")}', '${o.mobile || ''}', '${o.mobile1 || ''}')">
          <span class="fw-medium">${o.name}</span>
          ${o.mobile ? `<span class="badge bg-light text-secondary border font-monospace">${o.mobile}</span>` : ''}
        </li>
      `).join('');
    }
    listEl.classList.add('show');
  },

  toggleOwnerDriverCombobox() {
    const listEl = document.getElementById('driverOwnerDriverDropdown');
    if (!listEl) return;
    if (listEl.classList.contains('show')) {
      listEl.classList.remove('show');
    } else {
      const input = document.getElementById('driverOwnerDriverInput');
      this.filterOwnerDriverCombobox(input ? input.value : '');
    }
  },

  selectOwnerDriverCombobox(name, mob, mob1) {
    const input = document.getElementById('driverOwnerDriverInput');
    if (input) input.value = name;

    const listEl = document.getElementById('driverOwnerDriverDropdown');
    if (listEl) listEl.classList.remove('show');

    // Auto-fill mobile if currently empty
    const mobInput = document.getElementById('driverInputMobile');
    if (mobInput && !mobInput.value && mob) {
      mobInput.value = mob;
    }
    const mob1Input = document.getElementById('driverInputMobile1');
    if (mob1Input && !mob1Input.value && mob1) {
      mob1Input.value = mob1;
    }
  },

  // ========================================================
  // DRIVER NAME COMBOBOX
  // ========================================================
  filterNameCombobox(val) {
    const listEl = document.getElementById('driverNameDropdown');
    if (!listEl) return;
    const query = (val || '').trim().toLowerCase();

    const matches = this.driverNameList.filter(d => 
      d.name.toLowerCase().includes(query) || (d.mobile && d.mobile.includes(query))
    ).slice(0, 50);

    if (matches.length === 0) {
      listEl.innerHTML = `<li class="text-muted" style="cursor: default;">Type custom name...</li>`;
    } else {
      listEl.innerHTML = matches.map(d => `
        <li onclick="DriversModule.selectNameCombobox('${d.name.replace(/'/g, "\\'")}', '${d.mobile || ''}', '${d.mobile1 || ''}')">
          <span class="fw-medium">${d.name}</span>
          ${d.mobile ? `<span class="badge bg-light text-secondary border font-monospace">${d.mobile}</span>` : ''}
        </li>
      `).join('');
    }
    listEl.classList.add('show');
  },

  toggleNameCombobox() {
    const listEl = document.getElementById('driverNameDropdown');
    if (!listEl) return;
    if (listEl.classList.contains('show')) {
      listEl.classList.remove('show');
    } else {
      const input = document.getElementById('driverInputName');
      this.filterNameCombobox(input ? input.value : '');
    }
  },

  selectNameCombobox(name, mob, mob1) {
    const input = document.getElementById('driverInputName');
    if (input) input.value = name;

    const listEl = document.getElementById('driverNameDropdown');
    if (listEl) listEl.classList.remove('show');

    // Auto-fill phone numbers if empty
    const mobInput = document.getElementById('driverInputMobile');
    if (mobInput && !mobInput.value && mob) {
      mobInput.value = mob;
    }
    const mob1Input = document.getElementById('driverInputMobile1');
    if (mob1Input && !mob1Input.value && mob1) {
      mob1Input.value = mob1;
    }
  },

  // ========================================================
  // + ADD / EDIT SLIDE DRAWER (1:1 APPSHEET)
  // ========================================================
  openAddDrawer() {
    document.getElementById('formDriverId').value = '';
    document.getElementById('driverDrawerTitle').innerText = 'Details';
    document.getElementById('driverOwnerDriverInput').value = '';
    document.getElementById('driverInputName').value = '';
    document.getElementById('driverInputMobile').value = '';
    document.getElementById('driverInputMobile1').value = '';

    const drawerEl = document.getElementById('driverDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsDrawer.show();
    }
  },

  openEditDrawer(driverId) {
    const driver = this.allDrivers.find(d => d.id === driverId);
    if (!driver) return;

    document.getElementById('formDriverId').value = driver.id;
    document.getElementById('driverDrawerTitle').innerText = 'Details';
    document.getElementById('driverOwnerDriverInput').value = driver.ownerDriverName || '';
    document.getElementById('driverInputName').value = driver.name || '';
    document.getElementById('driverInputMobile').value = driver.mobile || '';
    document.getElementById('driverInputMobile1').value = driver.mobile1 || '';

    const drawerEl = document.getElementById('driverDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsDrawer.show();
    }
  },

  async saveDriver() {
    const id = document.getElementById('formDriverId').value.trim();
    const ownerDriverName = document.getElementById('driverOwnerDriverInput').value.trim();
    const name = document.getElementById('driverInputName').value.trim();
    const mobile = document.getElementById('driverInputMobile').value.trim();
    const mobile1 = document.getElementById('driverInputMobile1').value.trim();

    if (!name) {
      alert('Please enter a Driver Name.');
      return;
    }

    if (!mobile) {
      alert('Please enter a Mobile Number.');
      return;
    }

    const record = {
      id: id || `driver_${Date.now()}`,
      ownerDriverName: ownerDriverName,
      name: name,
      mobile: mobile,
      mobile1: mobile1,
      updatedAt: new Date().toISOString()
    };

    if (id) {
      const idx = this.allDrivers.findIndex(d => d.id === id);
      if (idx !== -1) {
        this.allDrivers[idx] = { ...this.allDrivers[idx], ...record };
      }
    } else {
      this.allDrivers.unshift(record);
    }

    if (typeof dbService !== 'undefined' && dbService.save) {
      await dbService.save('drivers', record);
    }

    this.buildMasterLists();
    this.handleSearch(this.searchQuery);

    const drawerEl = document.getElementById('driverDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getInstance(drawerEl);
      if (bsDrawer) bsDrawer.hide();
    }

    if (this.currentView === 'detail' && id) {
      this.currentDriverId = id;
      this.renderDetailView(id);
    } else {
      this.setView('table');
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Driver details saved successfully!', 'success');
    } else {
      console.log('[Toast SUCCESS]: Driver details saved successfully!');
    }
  },

  async deleteDriver(driverId) {
    if (!confirm('Are you sure you want to delete this driver?')) return;

    this.allDrivers = this.allDrivers.filter(d => d.id !== driverId);
    if (typeof dbService !== 'undefined' && dbService.delete) {
      await dbService.delete('drivers', driverId);
    }

    this.buildMasterLists();
    this.handleSearch(this.searchQuery);
    this.setView('table');

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast('Driver record deleted.', 'info');
    } else {
      console.log('[Toast INFO]: Driver record deleted.');
    }
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.DriversModule = DriversModule;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DriversModule;
}
