/**
 * Truck Owners Master Directory Module - MTC & TTC Logistics
 * Matches Google AppSheet Authentic UI across all views:
 * 1. 3-Card Dashboard View (screencapture-appsheet-start-...-18_55_06.png)
 * 2. Dedicated Truck Owners Full View (screencapture-appsheet-start-...-19_02_49.png)
 * 3. Single Truck Owner Details View (screencapture-appsheet-start-...-19_04_54.png)
 * 4. Slide Drawer for Add/Edit Truck Owner (media_1793163696469_88990520.jpg)
 * Total 596 Trucks & Owners (Header: 'Truck No. Number 596') with Bottom Pagination
 */

const OwnersModule = {
  allOwners: [],
  searchQuery: '',
  currentView: 'dashboard', // 'dashboard' | 'truckOwnersList' | 'details'
  currentOwnerId: null,

  // Pagination state
  pageSize: 50,
  currentPage: 1,

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
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading 596 truck owners...
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

    // Filter out any invalid orphan documents without valid truck number
    this.allOwners = (this.allOwners || []).filter(o => {
      const t = String(o.truckNo || o.truck || '').trim().toUpperCase();
      return t && t !== 'UNDEFINED' && t !== '-' && t.length >= 5;
    });

    this.populateNameDatalist();
    this.updateStats();
    this.renderTable();
  },

  populateNameDatalist() {
    const datalist = document.getElementById('owner-name-datalist');
    if (!datalist) return;
    const distinctNames = Array.from(new Set(this.allOwners.map(o => (o.name || '').trim()).filter(Boolean))).sort();
    datalist.innerHTML = distinctNames.map(n => `<option value="${n}">`).join('');
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
    this.currentPage = 1; // Reset to first page on search
    this.renderTable();
  },

  // Pagination Controls
  changePageSize(newSize) {
    if (newSize === 'all') {
      this.pageSize = 'all';
    } else {
      this.pageSize = parseInt(newSize, 10) || 50;
    }
    this.currentPage = 1;
    this.renderTable();
  },

  goToPage(p) {
    this.currentPage = Math.max(1, p);
    this.renderTable();
  },

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
    }
  },

  nextPage() {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.renderTable();
    }
  },

  goToLastPage() {
    this.currentPage = this.getTotalPages();
    this.renderTable();
  },

  getFilteredOwners() {
    if (!this.searchQuery) return this.allOwners;
    return this.allOwners.filter(o => {
      const text = `${o.truckNo || ''} ${o.name || ''} ${o.mobile || ''} ${o.mobile1 || ''}`.toLowerCase();
      return text.includes(this.searchQuery);
    });
  },

  getTotalPages() {
    const filtered = this.getFilteredOwners();
    if (this.pageSize === 'all') return 1;
    return Math.ceil(filtered.length / this.pageSize) || 1;
  },

  renderTable() {
    const tbody = document.getElementById('truck-owners-tbody');
    if (!tbody) return;

    const filtered = this.getFilteredOwners();
    const totalCount = this.allOwners.length;
    const filteredCount = filtered.length;
    const totalPages = this.getTotalPages();

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    const showingText = document.getElementById('table-showing-text');
    if (showingText) {
      if (this.searchQuery) {
        showingText.innerText = `${filteredCount} of ${totalCount} records`;
      } else {
        showingText.innerText = `${totalCount} records`;
      }
    }

    // Pagination calculations
    let pageItems = [];
    let startIdx = 0;
    let endIdx = 0;

    const isExpanded = document.getElementById('cardTruckOwners')?.classList.contains('is-expanded') || this.currentView === 'truckOwnersList';

    if (filteredCount === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-1"></i> No matching truck owners found.
          </td>
        </tr>
      `;
      this.updatePaginationUI(0, 0, 0, 1, 1);
      return;
    }

    if (!isExpanded && this.currentView === 'dashboard') {
      // In compact 3-card overview, show all items so user can scroll smoothly through records without needing pagination bar
      pageItems = filtered;
      startIdx = 1;
      endIdx = filteredCount;
    } else if (this.pageSize === 'all') {
      pageItems = filtered;
      startIdx = 1;
      endIdx = filteredCount;
    } else {
      startIdx = (this.currentPage - 1) * this.pageSize + 1;
      endIdx = Math.min(this.currentPage * this.pageSize, filteredCount);
      pageItems = filtered.slice(startIdx - 1, endIdx);
    }

    // Render page items
    let html = '';
    pageItems.forEach(o => {
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
    this.updatePaginationUI(startIdx, endIdx, filteredCount, this.currentPage, totalPages);
  },

  updatePaginationUI(start, end, total, current, totalPages) {
    const infoEl = document.getElementById('pagination-info');
    if (infoEl) {
      if (total === 0) {
        infoEl.innerText = '0 of 0';
      } else {
        infoEl.innerText = `${start} - ${end} of ${total}`;
      }
    }

    const pageNumEl = document.getElementById('pagination-page-num');
    if (pageNumEl) {
      pageNumEl.innerText = `Page ${current} of ${totalPages}`;
    }

    const btnFirst = document.getElementById('btn-page-first');
    const btnPrev = document.getElementById('btn-page-prev');
    const btnNext = document.getElementById('btn-page-next');
    const btnLast = document.getElementById('btn-page-last');

    if (btnFirst) btnFirst.disabled = current <= 1;
    if (btnPrev) btnPrev.disabled = current <= 1;
    if (btnNext) btnNext.disabled = current >= totalPages;
    if (btnLast) btnLast.disabled = current >= totalPages;
  },

  // View Navigation
  showDashboard() {
    this.currentView = 'dashboard';
    window.location.hash = '';

    const viewDash = document.getElementById('viewDashboard');
    const viewDetails = document.getElementById('viewOwnerDetails');
    if (viewDash) viewDash.style.display = 'block';
    if (viewDetails) viewDetails.style.display = 'none';

    // Un-expand all panels and restore display
    document.querySelectorAll('.appsheet-panel').forEach(c => {
      c.classList.remove('is-expanded');
      c.style.display = '';
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

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) bcActions.innerHTML = '';

    const searchInput = document.getElementById('search-owners');
    if (searchInput) searchInput.placeholder = 'Search Owners';

    this.renderTable();
  },

  showTruckOwnersList() {
    this.currentView = 'truckOwnersList';
    window.location.hash = '#truck-owners';

    const viewDash = document.getElementById('viewDashboard');
    const viewDetails = document.getElementById('viewOwnerDetails');
    if (viewDash) viewDash.style.display = 'block';
    if (viewDetails) viewDetails.style.display = 'none';

    // Expand Card 1 to full width and hide other panels
    const card1 = document.getElementById('cardTruckOwners');
    if (card1) {
      document.querySelectorAll('.appsheet-panel').forEach(c => {
        if (c.id === 'cardTruckOwners') {
          c.classList.add('is-expanded');
          c.style.display = 'flex';
          const icon = c.querySelector('.expand-toggle-icon');
          if (icon) {
            icon.classList.remove('bi-arrows-angle-expand');
            icon.classList.add('bi-arrows-angle-contract');
          }
        } else {
          c.classList.remove('is-expanded');
          c.style.display = 'none';
        }
      });
    }

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Truck Owners</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) bcActions.innerHTML = '';

    const searchInput = document.getElementById('search-owners');
    if (searchInput) searchInput.placeholder = 'Search Truck Owners';

    this.renderTable();
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

    // Populate Details Card (Exact match to screencapture-appsheet-start-...-19_04_54.png)
    const truckNoEl = document.getElementById('detail-truck-no');
    const nameEl = document.getElementById('detail-owner-name');
    const mobileEl = document.getElementById('detail-owner-mobile');
    const mobile1El = document.getElementById('detail-owner-mobile1');
    const mobile1Box = document.getElementById('detail-mobile1-container');

    if (truckNoEl) truckNoEl.innerText = o.truckNo || '-';
    if (nameEl) nameEl.innerText = o.name || '-';
    if (mobileEl) mobileEl.innerText = o.mobile || '-';

    if (mobile1Box && mobile1El) {
      if (o.mobile1) {
        mobile1Box.style.display = 'block';
        mobile1El.innerText = o.mobile1;
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

    // Top Right Action: Gold Edit Button (matching AppSheet) & Delete (trash)
    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn-appsheet-edit" onclick="OwnersModule.openEditCurrentOwner()">
          <i class="bi bi-pencil me-1"></i> Edit
        </button>
        <i class="bi bi-trash ms-2" onclick="OwnersModule.deleteCurrentOwner()" title="Delete" style="cursor: pointer; font-size: 1.1rem; color: #5f6368; padding: 4px;"></i>
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

  // Slide Drawer for Add / Edit Owner (Exact Match to media_1793163696469_88990520.jpg)
  openAddDrawer() {
    const form = document.getElementById('ownerDrawerForm');
    if (form) form.reset();
    document.getElementById('drawer-owner-id').value = '';
    document.getElementById('drawerTitle').innerText = 'Details';
    this.showDrawer();
    setTimeout(() => {
      const input = document.getElementById('drawer-truck-no');
      if (input) input.focus();
    }, 150);
  },

  openEditDrawer(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId) || String(item.truckNo) === String(ownerId));
    if (!o) return;

    document.getElementById('drawer-owner-id').value = o.id || '';
    document.getElementById('drawer-truck-no').value = o.truckNo || '';
    document.getElementById('drawer-owner-name').value = o.name || '';
    document.getElementById('drawer-owner-mobile').value = o.mobile || '';
    document.getElementById('drawer-owner-mobile1').value = o.mobile1 || '';

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

    if (!truckNo || !name || !mobile) {
      alert("Please fill all required fields: Truck No.*, Name*, and Mobile No.*");
      return;
    }

    const ownerData = {
      truckNo,
      name,
      mobile,
      mobile1
    };

    try {
      if (id && typeof dbService !== 'undefined') {
        await dbService.update('truckOwners', id, ownerData);
      } else if (typeof dbService !== 'undefined') {
        ownerData.type = 'Market';
        ownerData.dueAmount = 0;
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
          ownerData.type = 'Market';
          ownerData.dueAmount = 0;
          ownerData.paidAmount = 0;
          ownerData.totalTrips = 0;
          ownerData.recentTrips = [];
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

    const isCurrentlyExpanded = card.classList.contains('is-expanded');

    if (!isCurrentlyExpanded) {
      // Expand selected card and hide other cards so it takes 100% width
      document.querySelectorAll('.appsheet-panel').forEach(c => {
        if (c.id === cardId) {
          c.classList.add('is-expanded');
          c.style.display = 'flex';
          const icon = c.querySelector('.expand-toggle-icon');
          if (icon) {
            icon.classList.remove('bi-arrows-angle-expand');
            icon.classList.add('bi-arrows-angle-contract');
          }
        } else {
          c.classList.remove('is-expanded');
          c.style.display = 'none';
        }
      });

      if (cardId === 'cardTruckOwners') {
        const bc = document.getElementById('appsheetBreadcrumb');
        if (bc) {
          bc.innerHTML = `
            <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
            <i class="bi bi-chevron-right text-muted small"></i>
            <span class="active">Truck Owners</span>
          `;
        }
        this.renderTable();
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
    let csv = "Truck No.,Name,Mobile No.,Mobile No. 1\n";
    this.allOwners.forEach(o => {
      const name = (o.name || '').replace(/"/g, '""');
      csv += `"${o.truckNo || ''}","${name}","${o.mobile || ''}","${o.mobile1 || ''}"\n`;
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
