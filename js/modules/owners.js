/**
 * Truck Owners Master Directory Module - MTC & TTC Logistics
 * Matches Google AppSheet Authentic UI across all views:
 * 1. 3-Card Dashboard View (screencapture-appsheet-start-...-18_55_06.png)
 * 2. Dedicated Truck Owners Full View (screencapture-appsheet-start-...-19_02_49.png)
 * 3. Single Truck Owner Details View (screencapture-appsheet-start-...-19_04_54.png)
 * 4. Slide Drawer for Add/Edit Truck Owner (screencapture-appsheet-start-...-19_05_06.png & 19_05_24.png)
 * Total 595 Trucks & Owners (Header: 'Truck No. Number 595')
 */

const OwnersModule = {
  allOwners: [],
  searchQuery: '',
  currentView: 'dashboard', // 'dashboard' | 'truckOwnersList' | 'details'
  currentOwnerId: null,

  async init() {
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('owners');
    }
    await this.loadData();
    this.checkInitialRoute();
  },

  checkInitialRoute() {
    const hash = window.location.hash;
    if (hash === '#truck-owners') {
      this.showTruckOwnersList();
    } else if (hash.startsWith('#details-')) {
      const id = hash.replace('#details-', '');
      this.showOwnerDetails(id);
    } else {
      this.showDashboard();
    }
  },

  async loadData() {
    const tbody = document.getElementById('truck-owners-tbody');
    if (tbody && (!this.allOwners || this.allOwners.length === 0)) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading 595 truck owners...
          </td>
        </tr>
      `;
    }

    try {
      if (typeof dbService !== 'undefined') {
        this.allOwners = await dbService.getAll('truckOwners');
      } else if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS)) {
        this.allOwners = window.INITIAL_TRUCK_OWNERS;
      } else {
        this.allOwners = [];
      }
    } catch (err) {
      console.warn("Could not load from Firestore, falling back to INITIAL_TRUCK_OWNERS:", err);
      if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS)) {
        this.allOwners = window.INITIAL_TRUCK_OWNERS;
      }
    }

    if (!this.allOwners || this.allOwners.length === 0) {
      if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS)) {
        this.allOwners = window.INITIAL_TRUCK_OWNERS;
      }
    }

    this.updateStats();
    this.renderTable();
  },

  updateStats() {
    const totalCount = this.allOwners.length;
    const countBadge = document.getElementById('appsheet-header-count');
    if (countBadge) {
      countBadge.innerText = `Number ${totalCount}`;
    }
  },

  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('truck-owners-tbody');
    if (!tbody) return;

    let filtered = this.allOwners;
    if (this.searchQuery) {
      filtered = this.allOwners.filter(o => {
        const text = `${o.truckNo || ''} ${o.name || ''} ${o.mobile || ''} ${o.mobile1 || ''}`.toLowerCase();
        return text.includes(this.searchQuery);
      });
    }

    const showingText = document.getElementById('table-showing-text');
    if (showingText) {
      if (this.searchQuery) {
        showingText.innerText = `${filtered.length} of ${this.allOwners.length} records`;
      } else {
        showingText.innerText = `${this.allOwners.length} records`;
      }
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-1"></i> No matching truck owners found.
          </td>
        </tr>
      `;
      return;
    }

    // Render up to 300 rows immediately, then remaining progressively
    let html = '';
    const initialChunk = filtered.slice(0, 300);

    initialChunk.forEach(o => {
      const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
      const safeId = String(o.id || o.truckNo);

      html += `
        <tr class="appsheet-row" onclick="OwnersModule.showOwnerDetails('${safeId}')">
          <!-- 1. Truck No. -->
          <td>
            <span class="fw-bold font-monospace ${isSelf ? 'text-primary' : 'text-dark'}">${o.truckNo}</span>
            ${isSelf ? '<span class="badge bg-warning text-dark ms-1" style="font-size: 0.65rem;">Own 10</span>' : ''}
          </td>

          <!-- 2. Name -->
          <td>
            <div class="fw-normal text-dark text-truncate" style="max-width: 220px;" title="${o.name || ''}">${o.name || '-'}</div>
          </td>

          <!-- 3. Mobile No. -->
          <td>
            <span class="font-monospace text-muted">${o.mobile || '-'}</span>
          </td>

          <!-- 4. Mobile No. 1 -->
          <td>
            <span class="font-monospace text-muted">${o.mobile1 || '-'}</span>
          </td>

          <!-- 5. Chevron Arrow -->
          <td class="text-end text-muted">
            <i class="bi bi-chevron-right small"></i>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    if (filtered.length > 300) {
      setTimeout(() => {
        let remainingHtml = '';
        for (let i = 300; i < filtered.length; i++) {
          const o = filtered[i];
          const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
          const safeId = String(o.id || o.truckNo);
          remainingHtml += `
            <tr class="appsheet-row" onclick="OwnersModule.showOwnerDetails('${safeId}')">
              <td>
                <span class="fw-bold font-monospace ${isSelf ? 'text-primary' : 'text-dark'}">${o.truckNo}</span>
                ${isSelf ? '<span class="badge bg-warning text-dark ms-1" style="font-size: 0.65rem;">Own 10</span>' : ''}
              </td>
              <td>
                <div class="fw-normal text-dark text-truncate" style="max-width: 220px;" title="${o.name || ''}">${o.name || '-'}</div>
              </td>
              <td><span class="font-monospace text-muted">${o.mobile || '-'}</span></td>
              <td><span class="font-monospace text-muted">${o.mobile1 || '-'}</span></td>
              <td class="text-end text-muted"><i class="bi bi-chevron-right small"></i></td>
            </tr>
          `;
        }
        tbody.insertAdjacentHTML('beforeend', remainingHtml);
      }, 50);
    }
  },

  // View Navigation
  showDashboard() {
    this.currentView = 'dashboard';
    window.location.hash = '';

    const viewDash = document.getElementById('viewDashboard');
    const viewDetails = document.getElementById('viewOwnerDetails');
    if (viewDash) viewDash.style.display = 'block';
    if (viewDetails) viewDetails.style.display = 'none';

    // Un-expand all panels
    document.querySelectorAll('.appsheet-panel').forEach(c => {
      c.classList.remove('is-expanded');
      const icon = c.querySelector('.expand-toggle-icon');
      if (icon) {
        icon.classList.remove('bi-arrows-angle-contract');
        icon.classList.add('bi-arrows-angle-expand');
      }
    });

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `<span>Home</span> <i class="bi bi-chevron-right text-muted small"></i> <span class="active">Owners</span>`;
    }

    const searchInput = document.getElementById('search-owners');
    if (searchInput) searchInput.placeholder = 'Search Owners';
  },

  showTruckOwnersList() {
    this.currentView = 'truckOwnersList';
    window.location.hash = '#truck-owners';

    const viewDash = document.getElementById('viewDashboard');
    const viewDetails = document.getElementById('viewOwnerDetails');
    if (viewDash) viewDash.style.display = 'block';
    if (viewDetails) viewDetails.style.display = 'none';

    // Expand Card 1 to full width
    const card1 = document.getElementById('cardTruckOwners');
    if (card1) {
      document.querySelectorAll('.appsheet-panel').forEach(c => c.classList.remove('is-expanded'));
      card1.classList.add('is-expanded');
      const icon = card1.querySelector('.expand-toggle-icon');
      if (icon) {
        icon.classList.remove('bi-arrows-angle-expand');
        icon.classList.add('bi-arrows-angle-contract');
      }
    }

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Truck Owners</span>
      `;
    }

    const searchInput = document.getElementById('search-owners');
    if (searchInput) searchInput.placeholder = 'Search Truck Owners';
  },

  openDetailView(ownerId) {
    return this.showOwnerDetails(ownerId);
  },

  showOwnerDetails(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId) || String(item.truckNo) === String(ownerId));
    if (!o) return;

    this.currentView = 'details';
    this.currentOwnerId = o.id || o.truckNo;
    window.location.hash = `#details-${this.currentOwnerId}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewDetails = document.getElementById('viewOwnerDetails');
    if (viewDash) viewDash.style.display = 'none';
    if (viewDetails) viewDetails.style.display = 'block';

    // Populate Details Card (Matching 19_04_54_crop.png)
    const truckNoEl = document.getElementById('detail-truck-no');
    const nameEl = document.getElementById('detail-owner-name');
    const mobileEl = document.getElementById('detail-owner-mobile');
    const mobile1El = document.getElementById('detail-owner-mobile1');
    const mobile1Box = document.getElementById('detail-mobile1-container');

    if (truckNoEl) truckNoEl.innerText = o.truckNo || '-';
    if (nameEl) nameEl.innerText = o.name || '-';

    if (mobileEl) {
      if (o.mobile) {
        mobileEl.innerHTML = `
          <div class="d-flex align-items-center gap-3">
            <span>${o.mobile}</span>
            <a href="tel:${o.mobile}" class="btn btn-sm btn-outline-primary py-0 px-2" title="Call">
              <i class="bi bi-telephone"></i>
            </a>
            <a href="https://wa.me/91${o.mobile}" target="_blank" class="btn btn-sm btn-outline-success py-0 px-2" title="WhatsApp">
              <i class="bi bi-whatsapp"></i>
            </a>
          </div>
        `;
      } else {
        mobileEl.innerText = '-';
      }
    }

    if (mobile1Box && mobile1El) {
      if (o.mobile1) {
        mobile1Box.style.display = 'block';
        mobile1El.innerHTML = `
          <div class="d-flex align-items-center gap-3">
            <span>${o.mobile1}</span>
            <a href="tel:${o.mobile1}" class="btn btn-sm btn-outline-primary py-0 px-2" title="Call">
              <i class="bi bi-telephone"></i>
            </a>
            <a href="https://wa.me/91${o.mobile1}" target="_blank" class="btn btn-sm btn-outline-success py-0 px-2" title="WhatsApp">
              <i class="bi bi-whatsapp"></i>
            </a>
          </div>
        `;
      } else {
        mobile1Box.style.display = 'none';
      }
    }

    // Update Breadcrumb: Owners > Truck Owners > Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showTruckOwnersList()">Truck Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Details</span>
      `;
    }
  },

  closeDetailsView() {
    this.showTruckOwnersList();
  },

  openEditCurrentOwner() {
    if (this.currentOwnerId) {
      this.openEditDrawer(this.currentOwnerId);
    }
  },

  async deleteCurrentOwner() {
    if (!this.currentOwnerId) return;
    const o = this.allOwners.find(item => String(item.id) === String(this.currentOwnerId) || String(item.truckNo) === String(this.currentOwnerId));
    const title = o ? `${o.truckNo} (${o.name})` : this.currentOwnerId;

    if (!confirm(`Are you sure you want to delete truck owner ${title}?`)) return;

    try {
      if (typeof dbService !== 'undefined') {
        await dbService.delete('truckOwners', this.currentOwnerId);
      }
      this.allOwners = this.allOwners.filter(item => String(item.id) !== String(this.currentOwnerId) && String(item.truckNo) !== String(this.currentOwnerId));
    } catch (err) {
      console.error("Delete error:", err);
    }

    this.updateStats();
    this.renderTable();
    this.closeDetailsView();

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Deleted truck owner ${title} successfully.`, 'info');
    }
  },

  // Slide Drawer for Add / Edit Owner (Matching 19_05_06_crop.png and 19_05_24.png)
  openAddDrawer() {
    const form = document.getElementById('ownerDrawerForm');
    if (form) form.reset();
    document.getElementById('drawer-owner-id').value = '';
    document.getElementById('drawerTitle').innerText = 'Details';
    document.getElementById('drawer-owner-due').value = '0';
    this.showDrawer();
  },

  openEditDrawer(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId) || String(item.truckNo) === String(ownerId));
    if (!o) return;

    document.getElementById('drawer-owner-id').value = o.id || '';
    document.getElementById('drawer-truck-no').value = o.truckNo || '';
    document.getElementById('drawer-owner-name').value = o.name || '';
    document.getElementById('drawer-owner-mobile').value = o.mobile || '';
    document.getElementById('drawer-owner-mobile1').value = o.mobile1 || '';
    document.getElementById('drawer-owner-type').value = o.type || 'Market';
    document.getElementById('drawer-owner-due').value = o.dueAmount || 0;

    document.getElementById('drawerTitle').innerText = 'Details';
    this.showDrawer();
  },

  showDrawer() {
    const drawer = document.getElementById('ownerDrawer');
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  },

  closeDrawer() {
    const drawer = document.getElementById('ownerDrawer');
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  async saveOwnerDrawer(event) {
    event.preventDefault();
    const id = document.getElementById('drawer-owner-id').value;
    const truckNo = document.getElementById('drawer-truck-no').value.trim().toUpperCase();
    const name = document.getElementById('drawer-owner-name').value.trim();
    const mobile = document.getElementById('drawer-owner-mobile').value.trim();
    const mobile1 = document.getElementById('drawer-owner-mobile1').value.trim();
    const type = document.getElementById('drawer-owner-type').value;
    const dueAmount = parseFloat(document.getElementById('drawer-owner-due').value) || 0;

    if (!truckNo || !name || !mobile) {
      alert("Please fill all required fields: Truck No.*, Name*, and Mobile No.*");
      return;
    }

    const ownerData = {
      truckNo,
      name,
      mobile,
      mobile1,
      type,
      dueAmount
    };

    try {
      if (id && typeof dbService !== 'undefined') {
        await dbService.update('truckOwners', id, ownerData);
      } else if (typeof dbService !== 'undefined') {
        ownerData.paidAmount = 0;
        ownerData.totalTrips = 0;
        ownerData.recentTrips = [];
        await dbService.add('truckOwners', ownerData);
      } else {
        if (id) {
          const idx = this.allOwners.findIndex(o => String(o.id) === String(id));
          if (idx !== -1) this.allOwners[idx] = { ...this.allOwners[idx], ...ownerData };
        } else {
          ownerData.id = `truck_owner_${this.allOwners.length + 1}`;
          this.allOwners.unshift(ownerData);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
    }

    this.closeDrawer();
    await this.loadData();

    // If currently viewing this owner's details, refresh the view
    if (this.currentView === 'details' && this.currentOwnerId) {
      this.showOwnerDetails(id || truckNo);
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Saved truck owner ${truckNo} (${name})`, 'success');
    }
  },

  toggleCardExpand(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const icon = card.querySelector('.expand-toggle-icon');
    const isCurrentlyExpanded = card.classList.contains('is-expanded');

    // Collapse all
    document.querySelectorAll('.appsheet-panel').forEach(c => {
      c.classList.remove('is-expanded');
      const i = c.querySelector('.expand-toggle-icon');
      if (i) {
        i.classList.remove('bi-arrows-angle-contract');
        i.classList.add('bi-arrows-angle-expand');
      }
    });

    if (!isCurrentlyExpanded) {
      card.classList.add('is-expanded');
      if (icon) {
        icon.classList.remove('bi-arrows-angle-expand');
        icon.classList.add('bi-arrows-angle-contract');
      }
      if (cardId === 'cardTruckOwners') {
        const bc = document.getElementById('appsheetBreadcrumb');
        if (bc) {
          bc.innerHTML = `
            <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
            <i class="bi bi-chevron-right text-muted small"></i>
            <span class="active">Truck Owners</span>
          `;
        }
      }
    } else {
      this.showDashboard();
    }
  },

  toggleCardFilter(cardId) {
    const searchInput = document.getElementById('search-owners');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  },

  filterByDueYear(year) {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Owner Due Year: ${year}`, 'info');
    }
  },

  filterByPaidYear(year) {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Owner Paid Year: ${year}`, 'info');
    }
  },

  exportCSV() {
    let csv = "Truck No.,Name,Mobile No.,Mobile No. 1,Fleet Type\n";
    this.allOwners.forEach(o => {
      const name = (o.name || '').replace(/"/g, '""');
      csv += `"${o.truckNo || ''}","${name}","${o.mobile || ''}","${o.mobile1 || ''}","${o.type || 'Market'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Truck_Owners_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  formatCurrency(num) {
    return '₹ ' + Number(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  OwnersModule.init();
});
