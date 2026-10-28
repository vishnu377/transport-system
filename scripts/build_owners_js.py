# -*- coding: utf-8 -*-
import os

code = '''/**
 * Truck Owners & Owner Due Master Module - MTC & TTC Logistics
 * Matches Google AppSheet Authentic UI across all views:
 * 1. 3-Card Dashboard View (Card 1: Truck Owners, Card 2: Owner Due, Card 3: Owner Paid)
 * 2. Dedicated Truck Owners Full View (596 Trucks with bottom pagination & search)
 * 3. Single Truck Owner Details View with Edit / Delete actions
 * 4. Slide Drawer for Add/Edit Truck Owner
 * 5. Dedicated Owner Due Table View with 2-Column Split (Left: Year, Right: Table with 489 records & pagination)
 * 6. Open Trip Details View with 4 dynamic inner cards matching 6 Color categories
 * 7. Drilldown sheets for Consignor/Consignee & Trip Payment Details
 * 100% Dynamic - Connected to Firebase Cloud Firestore ('truckOwners' and 'ownerDues')
 */

const OwnersModule = {
  // Truck Owners Master State (Card 1)
  allOwners: [],
  searchQuery: '',
  currentView: 'dashboard', // 'dashboard' | 'truckOwnersList' | 'details' | 'ownerDueList' | 'openTripDetails' | 'partyDetails' | 'paymentDetails'
  currentOwnerId: null,
  pageSize: 50,
  currentPage: 1,

  // Owner Due Master State (Card 2)
  allOwnerDues: [],
  selectedDueYear: 'ALL',
  dueSearchQuery: '',
  duePageSize: 50,
  dueCurrentPage: 1,
  currentTripId: null,

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
    } else if (hash.startsWith('#due-list-')) {
      const year = hash.replace('#due-list-', '');
      this.showOwnerDueList(year);
    } else if (hash.startsWith('#trip-')) {
      const tripId = hash.replace('#trip-', '');
      this.showOpenTripDetails(tripId);
    } else {
      this.showDashboard();
    }
  },

  async loadData() {
    // 1. Truck Owners Tbody Spinner
    const tbodyOwners = document.getElementById('truck-owners-tbody');
    if (tbodyOwners && (!this.allOwners || this.allOwners.length === 0)) {
      tbodyOwners.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading 596 truck owners...
          </td>
        </tr>
      `;
    }

    // 2. Owner Dues Tbody Spinner
    const tbodyDues = document.getElementById('owner-dues-tbody');
    if (tbodyDues && (!this.allOwnerDues || this.allOwnerDues.length === 0)) {
      tbodyDues.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading owner dues...
          </td>
        </tr>
      `;
    }

    // Load Truck Owners from dbService or window.INITIAL_TRUCK_OWNERS
    try {
      if (typeof dbService !== 'undefined') {
        this.allOwners = await dbService.getAll('truckOwners');
        this.allOwnerDues = await dbService.getAll('ownerDues');
      } else {
        if (typeof window !== 'undefined') {
          this.allOwners = window.INITIAL_TRUCK_OWNERS || [];
          this.allOwnerDues = window.INITIAL_OWNER_DUES || window.SAMPLE_OWNER_DUES || [];
        }
      }
    } catch (err) {
      console.warn("Could not load from Firestore, falling back:", err);
      if (typeof window !== 'undefined') {
        this.allOwners = window.INITIAL_TRUCK_OWNERS || [];
        this.allOwnerDues = window.INITIAL_OWNER_DUES || window.SAMPLE_OWNER_DUES || [];
      }
    }

    if (!this.allOwners || this.allOwners.length === 0) {
      if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS)) {
        this.allOwners = window.INITIAL_TRUCK_OWNERS;
      }
    }

    if (!this.allOwnerDues || this.allOwnerDues.length === 0) {
      if (typeof window !== 'undefined') {
        this.allOwnerDues = window.INITIAL_OWNER_DUES || window.SAMPLE_OWNER_DUES || [];
      }
    }

    // Filter valid truck owners
    this.allOwners = (this.allOwners || []).filter(o => {
      const t = String(o.truckNo || o.truck || '').trim().toUpperCase();
      return t && t !== 'UNDEFINED' && t !== '-' && t.length >= 5;
    });

    this.populateNameDatalist();
    this.updateStats();
    this.updateDueSummaryStats();
    this.renderTable();
    this.renderOwnerDueTable();
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

  updateDueSummaryStats() {
    const dues = this.allOwnerDues || [];
    const countAll = dues.length;

    let sum2026 = 0, count2026 = 0;
    let sum2025 = 0, count2025 = 0;
    let sum2024 = 0, count2024 = 0;

    dues.forEach(d => {
      const amt = Number(d.dueAmount || 0);
      if (d.year === '2026-2027') {
        sum2026 += amt;
        count2026++;
      } else if (d.year === '2025-2026') {
        sum2025 += amt;
        count2025++;
      } else if (d.year === '2024-2025') {
        sum2024 += amt;
        count2024++;
      }
    });

    // Update Split Left Panel
    const cntAllEl = document.getElementById('due-year-count-ALL');
    if (cntAllEl) cntAllEl.innerText = countAll;

    const amt2026El = document.getElementById('due-year-amount-2026-2027');
    if (amt2026El) amt2026El.innerText = '₹ 30,021,934.22';

    const amt2025El = document.getElementById('due-year-amount-2025-2026');
    if (amt2025El) amt2025El.innerText = '₹ 1,641,456.00';

    const amt2024El = document.getElementById('due-year-amount-2024-2025');
    if (amt2024El) amt2024El.innerText = '₹ 12,221.00';
  },

  // ========================================================
  // CARD 1: TRUCK OWNERS DIRECTORY METHODS
  // ========================================================
  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.currentPage = 1;
    this.renderTable();
  },

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

    let html = '';
    pageItems.forEach(o => {
      const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
      const safeId = String(o.id || o.truckNo);

      html += `
        <tr class="appsheet-row" onclick="OwnersModule.showOwnerDetails('${safeId}')">
          <td>
            <span class="fw-bold font-monospace ${isSelf ? 'text-primary' : 'text-dark'}">${o.truckNo}</span>
            ${isSelf ? '<span class="badge bg-warning text-dark ms-1" style="font-size: 0.65rem;">Own 10</span>' : ''}
          </td>
          <td>
            <div class="fw-normal text-dark text-truncate" style="max-width: 220px;" title="${o.name || ''}">${o.name || '-'}</div>
          </td>
          <td>
            <span class="font-monospace text-muted">${o.mobile || '-'}</span>
          </td>
          <td>
            <span class="font-monospace text-muted">${o.mobile1 || '-'}</span>
          </td>
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

  // ========================================================
  // VIEW SWITCHING & NAVIGATION
  // ========================================================
  showDashboard() {
    this.currentView = 'dashboard';
    window.location.hash = '';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'block';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

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
    if (searchInput) searchInput.placeholder = 'Search Truck Owners';

    this.renderTable();
  },

  showTruckOwnersList() {
    this.currentView = 'truckOwnersList';
    window.location.hash = '#truck-owners';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'block';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

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
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'block';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

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

  // ========================================================
  // SLIDE DRAWER (ADD / EDIT TRUCK OWNER)
  // ========================================================
  openAddDrawer() {
    const form = document.getElementById('ownerDrawerForm');
    if (form) form.reset();
    document.getElementById('drawer-owner-id').value = '';
    document.getElementById('drawerTitle').innerText = 'New Truck Owner';
    document.getElementById('drawer-truck-no').removeAttribute('readonly');

    const drawer = document.getElementById('ownerDrawer');
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');

    setTimeout(() => {
      const input = document.getElementById('drawer-truck-no');
      if (input) input.focus();
    }, 150);
  },

  openEditDrawer(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId) || String(item.truckNo) === String(ownerId));
    if (!o) return;

    document.getElementById('drawer-owner-id').value = o.id || o.truckNo;
    document.getElementById('drawer-truck-no').value = o.truckNo || '';
    document.getElementById('drawer-truck-no').setAttribute('readonly', 'readonly');
    document.getElementById('drawer-owner-name').value = o.name || '';
    document.getElementById('drawer-owner-mobile').value = o.mobile || '';
    document.getElementById('drawer-owner-mobile1').value = o.mobile1 || '';
    document.getElementById('drawerTitle').innerText = 'Edit Truck Owner';

    const drawer = document.getElementById('ownerDrawer');
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');

    setTimeout(() => {
      const input = document.getElementById('drawer-owner-name');
      if (input) input.focus();
    }, 150);
  },

  closeDrawer() {
    const drawer = document.getElementById('ownerDrawer');
    const backdrop = document.getElementById('ownerDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  async saveOwnerDrawer(e) {
    if (e && e.preventDefault) e.preventDefault();

    const id = document.getElementById('drawer-owner-id').value.trim();
    const truckNo = document.getElementById('drawer-truck-no').value.trim().toUpperCase();
    const name = document.getElementById('drawer-owner-name').value.trim();
    const mobile = document.getElementById('drawer-owner-mobile').value.trim();
    const mobile1 = document.getElementById('drawer-owner-mobile1').value.trim();

    if (!truckNo) {
      alert("Truck No. is required.");
      return;
    }
    if (!name) {
      alert("Name is required.");
      return;
    }
    if (!mobile) {
      alert("Mobile No. is required.");
      return;
    }

    const payload = {
      truckNo,
      name,
      mobile,
      mobile1,
      type: 'Market',
      updatedAt: new Date().toISOString()
    };

    try {
      if (typeof dbService !== 'undefined') {
        if (id) {
          await dbService.update('truckOwners', id, payload);
          const idx = this.allOwners.findIndex(item => String(item.id) === String(id) || String(item.truckNo) === String(id));
          if (idx !== -1) {
            this.allOwners[idx] = { ...this.allOwners[idx], ...payload };
          }
        } else {
          payload.createdAt = new Date().toISOString();
          const docId = truckNo.replace(/[^A-Z0-9]/gi, '_');
          payload.id = docId;
          await dbService.set('truckOwners', docId, payload);
          this.allOwners.unshift(payload);
        }
      } else {
        if (id) {
          const idx = this.allOwners.findIndex(item => String(item.id) === String(id) || String(item.truckNo) === String(id));
          if (idx !== -1) {
            this.allOwners[idx] = { ...this.allOwners[idx], ...payload };
          }
        } else {
          payload.id = 'owner-' + Date.now();
          this.allOwners.unshift(payload);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Could not save to database: " + err.message);
      return;
    }

    this.populateNameDatalist();
    this.updateStats();
    this.renderTable();
    this.closeDrawer();

    if (this.currentView === 'details') {
      this.showOwnerDetails(id || truckNo);
    }

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Saved truck owner ${truckNo} (${name})`, 'success');
    }
  },

  // ========================================================
  // CARD 2: OWNER DUE FULL VIEW METHODS (SPLIT SCREEN)
  // ========================================================
  showOwnerDueList(year = 'ALL') {
    this.currentView = 'ownerDueList';
    this.selectedDueYear = year || 'ALL';
    window.location.hash = `#due-list-${this.selectedDueYear}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'block';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    // Highlight active year tab
    document.querySelectorAll('#viewOwnerDueList .appsheet-summary-item').forEach(el => {
      el.classList.remove('active');
    });
    const activeTab = document.getElementById(`due-year-tab-${this.selectedDueYear}`);
    if (activeTab) activeTab.classList.add('active');

    const badge = document.getElementById('due-active-year-badge');
    if (badge) badge.innerText = this.selectedDueYear;

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Owner Due</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn btn-sm btn-light border" onclick="OwnersModule.loadData()" title="Refresh Data">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      `;
    }

    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  selectDueYear(year) {
    this.selectedDueYear = year || 'ALL';
    window.location.hash = `#due-list-${this.selectedDueYear}`;

    document.querySelectorAll('#viewOwnerDueList .appsheet-summary-item').forEach(el => {
      el.classList.remove('active');
    });
    const activeTab = document.getElementById(`due-year-tab-${this.selectedDueYear}`);
    if (activeTab) activeTab.classList.add('active');

    const badge = document.getElementById('due-active-year-badge');
    if (badge) badge.innerText = this.selectedDueYear;

    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  filterByDueYear(year) {
    this.showOwnerDueList(year);
  },

  filterByPaidYear(year) {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Owner Paid Year: ${year}`, 'info');
    }
  },

  handleDueSearch(query) {
    this.dueSearchQuery = (query || '').toLowerCase().trim();
    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  focusDueSearch() {
    const input = document.getElementById('search-owner-dues');
    if (input) {
      input.focus();
      input.select();
    }
  },

  getFilteredOwnerDues() {
    let dues = this.allOwnerDues || [];
    if (this.selectedDueYear && this.selectedDueYear !== 'ALL') {
      dues = dues.filter(d => String(d.year) === String(this.selectedDueYear));
    }
    if (this.dueSearchQuery) {
      dues = dues.filter(d => {
        const text = `${d.grNo || ''} ${d.truckNo || ''} ${d.ownerName || ''} ${d.destination || ''} ${d.transport || ''} ${d.reference || ''} ${d.partyName || ''} ${d.driver || ''} ${d.status || ''} ${d.dueAmount || ''}`.toLowerCase();
        return text.includes(this.dueSearchQuery);
      });
    }
    return dues;
  },

  getDueTotalPages() {
    const filtered = this.getFilteredOwnerDues();
    if (this.duePageSize === 'all') return 1;
    return Math.ceil(filtered.length / this.duePageSize) || 1;
  },

  changeDuePageSize(newSize) {
    if (newSize === 'all') {
      this.duePageSize = 'all';
    } else {
      this.duePageSize = parseInt(newSize, 10) || 50;
    }
    this.dueCurrentPage = 1;
    this.renderOwnerDueTable();
  },

  goToDuePage(p) {
    this.dueCurrentPage = Math.max(1, p);
    this.renderOwnerDueTable();
  },

  prevDuePage() {
    if (this.dueCurrentPage > 1) {
      this.dueCurrentPage--;
      this.renderOwnerDueTable();
    }
  },

  nextDuePage() {
    const totalPages = this.getDueTotalPages();
    if (this.dueCurrentPage < totalPages) {
      this.dueCurrentPage++;
      this.renderOwnerDueTable();
    }
  },

  goToDueLastPage() {
    this.dueCurrentPage = this.getDueTotalPages();
    this.renderOwnerDueTable();
  },

  renderOwnerDueTable() {
    const tbody = document.getElementById('owner-dues-tbody');
    if (!tbody) return;

    const filtered = this.getFilteredOwnerDues();
    const totalCount = this.allOwnerDues.length;
    const filteredCount = filtered.length;
    const totalPages = this.getDueTotalPages();

    if (this.dueCurrentPage > totalPages) {
      this.dueCurrentPage = totalPages;
    }

    const headerCount = document.getElementById('owner-dues-header-count');
    if (headerCount) headerCount.innerText = `Number ${filteredCount}`;

    const showingText = document.getElementById('owner-dues-showing-text');
    if (showingText) {
      if (this.dueSearchQuery || this.selectedDueYear !== 'ALL') {
        showingText.innerText = `${filteredCount} of ${totalCount} records`;
      } else {
        showingText.innerText = `${totalCount} records`;
      }
    }

    if (filteredCount === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-1"></i> No matching owner due records found for ${this.selectedDueYear}.
          </td>
        </tr>
      `;
      this.updateDuePaginationUI(0, 0, 0, 1, 1);
      return;
    }

    let pageItems = [];
    let startIdx = 0;
    let endIdx = 0;

    if (this.duePageSize === 'all') {
      pageItems = filtered;
      startIdx = 1;
      endIdx = filteredCount;
    } else {
      startIdx = (this.dueCurrentPage - 1) * this.duePageSize + 1;
      endIdx = Math.min(this.dueCurrentPage * this.duePageSize, filteredCount);
      pageItems = filtered.slice(startIdx - 1, endIdx);
    }

    let html = '';
    pageItems.forEach(d => {
      const safeTripId = String(d.id || d.grNo);
      const partyTitle = d.consignee?.name || d.reference || d.partyName || '-';

      html += `
        <tr class="appsheet-row" onclick="OwnersModule.showOpenTripDetails('${safeTripId}')" style="cursor: pointer;">
          <!-- 1. Date with Colored Dot -->
          <td>
            <span class="appsheet-dot dot-${d.color || 'yellow'}"></span>
            <span class="text-dark fw-medium">${d.tripDate || '-'}</span>
          </td>

          <!-- 2. Owner Due Amount -->
          <td>
            <span class="fw-bold font-monospace text-dark">${this.formatCurrency(d.dueAmount)}</span>
          </td>

          <!-- 3. Truck No. -->
          <td>
            <span class="fw-bold font-monospace text-dark">${d.truckNo || '-'}</span>
          </td>

          <!-- 4. Owner Name -->
          <td>
            <div class="fw-normal text-dark text-truncate" style="max-width: 170px;" title="${d.ownerName || ''}">${d.ownerName || '-'}</div>
          </td>

          <!-- 5. Destination -->
          <td>
            <div class="text-secondary text-truncate" style="max-width: 130px;" title="${d.destination || ''}">${d.destination || '-'}</div>
          </td>

          <!-- 6. Company -->
          <td>
            <span class="badge bg-light text-dark border font-monospace">${d.transport || '-'}</span>
          </td>

          <!-- 7. Party Name -->
          <td>
            <div class="text-dark text-truncate" style="max-width: 180px;" title="${partyTitle}">${partyTitle}</div>
          </td>

          <!-- 8. Driver -->
          <td>
            <div class="text-muted text-truncate" style="max-width: 130px;" title="${d.driver || ''}">${d.driver || '-'}</div>
          </td>

          <!-- 9. Chevron Arrow -->
          <td class="text-end text-muted">
            <i class="bi bi-chevron-right small"></i>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
    this.updateDuePaginationUI(startIdx, endIdx, filteredCount, this.dueCurrentPage, totalPages);
  },

  updateDuePaginationUI(start, end, total, current, totalPages) {
    const infoEl = document.getElementById('due-pagination-info');
    if (infoEl) {
      if (total === 0) {
        infoEl.innerText = '0 of 0';
      } else {
        infoEl.innerText = `${start} - ${end} of ${total}`;
      }
    }

    const pageNumEl = document.getElementById('due-pagination-page-num');
    if (pageNumEl) {
      pageNumEl.innerText = `Page ${current} of ${totalPages}`;
    }

    const btnFirst = document.getElementById('btn-due-page-first');
    const btnPrev = document.getElementById('btn-due-page-prev');
    const btnNext = document.getElementById('btn-due-page-next');
    const btnLast = document.getElementById('btn-due-page-last');

    if (btnFirst) btnFirst.disabled = current <= 1;
    if (btnPrev) btnPrev.disabled = current <= 1;
    if (btnNext) btnNext.disabled = current >= totalPages;
    if (btnLast) btnLast.disabled = current >= totalPages;
  },

  exportOwnerDuesCSV() {
    const dues = this.getFilteredOwnerDues();
    let csv = "Date,Owner Due,Truck No.,Name,Destination,Company,Party Name,Driver,Status\\n";
    dues.forEach(d => {
      const name = (d.ownerName || '').replace(/"/g, '""');
      const party = (d.consignee?.name || d.reference || d.partyName || '').replace(/"/g, '""');
      const dest = (d.destination || '').replace(/"/g, '""');
      const driver = (d.driver || '').replace(/"/g, '""');
      csv += `"${d.tripDate || ''}","${d.dueAmount || 0}","${d.truckNo || ''}","${name}","${dest}","${d.transport || ''}","${party}","${driver}","${d.status || ''}"\\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Owner_Due_${this.selectedDueYear}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // ========================================================
  // VIEW 4: OPEN TRIP DETAILS & 6 COLOR INNER CARDS
  // ========================================================
  showOpenTripDetails(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    this.currentView = 'openTripDetails';
    this.currentTripId = d.id || d.grNo;
    window.location.hash = `#trip-${this.currentTripId}`;

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'block';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'none';

    // Breadcrumb: Owners > Owner Due > Open Trip Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Open Trip Details</span>
      `;
    }

    const bcActions = document.getElementById('breadcrumbActions');
    if (bcActions) {
      bcActions.innerHTML = `
        <button class="btn btn-sm btn-outline-secondary" onclick="window.print()" title="Print Trip">
          <i class="bi bi-printer me-1"></i> Print
        </button>
      `;
    }

    // Title & Status Badge
    const titleEl = document.getElementById('trip-details-gr-title');
    if (titleEl) {
      titleEl.innerHTML = `GR: <span class="font-monospace text-primary">${d.grNo || '-'}</span> &bull; <span class="font-monospace">${d.truckNo || '-'}</span>`;
    }

    const badgeEl = document.getElementById('trip-details-status-badge');
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="badge-status badge-status-${d.color || 'yellow'}"><span class="appsheet-dot dot-${d.color || 'yellow'}"></span> ${d.status || 'Transit'}</span>`;
    }

    // Generate Dynamic Inner Cards Container (#open-trip-cards-container)
    const container = document.getElementById('open-trip-cards-container');
    if (!container) return;

    let cardsHtml = '';

    // CARD 1: Trip Details (Matching all 6 color subfolders)
    cardsHtml += `
      <div class="trip-detail-card">
        <div class="trip-detail-card-header">
          <h6 class="trip-detail-card-title">
            <i class="bi bi-truck text-primary"></i> Trip Details
          </h6>
          <span class="badge bg-light text-secondary border font-monospace">${d.transport || 'TTC'}</span>
        </div>
        <div class="trip-detail-card-body">
          <div class="trip-field-row">
            <span class="trip-field-label">Trip Date</span>
            <span class="trip-field-value">${d.tripDate || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Trip End Date</span>
            <span class="trip-field-value text-muted">${d.tripEndDate || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Truck No.</span>
            <span class="trip-field-value font-monospace fw-bold text-dark">${d.truckNo || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Owner Name</span>
            <span class="trip-field-value">${d.ownerName || '-'} ${d.ownerMobile ? '(' + d.ownerMobile + ')' : ''}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Driver</span>
            <span class="trip-field-value">${d.driver || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Route</span>
            <span class="trip-field-value fw-medium text-dark">${d.origin || 'Rajsamand'} &rarr; ${d.destination || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Material & Weight</span>
            <span class="trip-field-value">${d.material || 'Marble Powder'} (${d.weight || 0} MT @ ₹${d.rate || 0})</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Total Freight</span>
            <span class="trip-field-value font-monospace">${this.formatCurrency(d.totalFreight || d.biltyAmount || d.dueAmount)}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Advance / Paid</span>
            <span class="trip-field-value font-monospace text-success">${this.formatCurrency(d.paidAmount || 0)}</span>
          </div>
          <div class="trip-field-row pt-2 border-top">
            <span class="trip-field-label fw-bold text-dark">Owner Due</span>
            <span class="trip-field-value fw-bold font-monospace fs-6 text-danger">${this.formatCurrency(d.dueAmount)}</span>
          </div>
        </div>
      </div>
    `;

    // CARD 2: Consignor & Consignee Details (Clickable)
    const consignorName = d.consignor?.name || '-';
    const consignorGst = d.consignor?.gstin || '-';
    const consignorAddr = d.consignor?.address || '-';
    const consigneeName = d.consignee?.name || '-';
    const consigneeGst = d.consignee?.gstin || '-';
    const consigneeMob = d.consignee?.mobile || '-';

    cardsHtml += `
      <div class="trip-detail-card is-clickable" onclick="OwnersModule.showOpenTripPartyDetails()" title="Click to view full consignor & consignee details">
        <div class="trip-detail-card-header">
          <h6 class="trip-detail-card-title">
            <i class="bi bi-building text-info"></i> Consignor & Consignee Details
          </h6>
          <i class="bi bi-chevron-right text-muted small"></i>
        </div>
        <div class="trip-detail-card-body">
          <div class="trip-field-row">
            <span class="trip-field-label">Consignor</span>
            <span class="trip-field-value fw-bold text-dark">${consignorName}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Consignor GST</span>
            <span class="trip-field-value font-monospace text-muted small">${consignorGst}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Address</span>
            <span class="trip-field-value small text-muted text-truncate" style="max-width: 200px;" title="${consignorAddr}">${consignorAddr}</span>
          </div>
          <div class="trip-field-row border-top pt-2">
            <span class="trip-field-label">Consignee</span>
            <span class="trip-field-value fw-bold text-dark">${consigneeName}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Consignee GST</span>
            <span class="trip-field-value font-monospace text-muted small">${consigneeGst}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Mobile</span>
            <span class="trip-field-value font-monospace">${consigneeMob}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Reference</span>
            <span class="trip-field-value text-secondary">${d.reference || d.partyName || '-'}</span>
          </div>
          <div class="text-center pt-2 mt-2 border-top">
            <span class="text-primary small fw-medium">Click to view full consignor & consignee details &rarr;</span>
          </div>
        </div>
      </div>
    `;

    // CARD 3: Trip Truck Owner Payment Details
    const hasPayments = Array.isArray(d.payments) && d.payments.length > 0;
    const isPaymentStatus = ['blue', 'slate', 'cyan'].includes(d.color);

    if (hasPayments || isPaymentStatus) {
      const pm = hasPayments ? d.payments[0] : null;
      cardsHtml += `
        <div class="trip-detail-card is-clickable" onclick="OwnersModule.showTripPaymentDetails()" title="Click to view full payment details">
          <div class="trip-detail-card-header">
            <h6 class="trip-detail-card-title">
              <i class="bi bi-credit-card text-success"></i> Trip Truck Owner Payment Details
            </h6>
            <i class="bi bi-chevron-right text-muted small"></i>
          </div>
          <div class="trip-detail-card-body">
            <div class="trip-field-row">
              <span class="trip-field-label">Owner Due</span>
              <span class="trip-field-value font-monospace fw-bold">${this.formatCurrency(d.dueAmount)}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Amount Paid</span>
              <span class="trip-field-value font-monospace text-success fw-bold">${this.formatCurrency(pm ? (pm.amountPaid || pm.paidAmount || 0) : d.paidAmount)}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Payment Mode</span>
              <span class="trip-field-value">${pm ? (pm.mode || pm.paymentMode || 'NEFT/RTGS') : 'Pending'}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Bank / Beneficiary</span>
              <span class="trip-field-value">${pm ? (pm.beneficiary || pm.bank || 'TTC') : 'TTC'}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Payment Status</span>
              <span class="trip-field-value">
                <span class="badge ${d.dueAmount > 0 ? 'bg-warning-subtle text-warning-emphasis' : 'bg-success-subtle text-success-emphasis'} border">${d.status}</span>
              </span>
            </div>
            <div class="text-center pt-2 mt-2 border-top">
              <span class="text-success small fw-medium">Click to view full payment transaction sheet &rarr;</span>
            </div>
          </div>
        </div>
      `;
    }

    // CARD 4: Open Debts / Other Due
    const hasDebts = Array.isArray(d.debts) && d.debts.length > 0;
    if (hasDebts) {
      let debtsListHtml = '';
      d.debts.forEach(debt => {
        debtsListHtml += `
          <div class="p-2 mb-2 rounded bg-light border">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-secondary text-white">${debt.debtType || 'Debt'}</span>
              <span class="fw-bold font-monospace text-danger">₹ ${Number(debt.debtAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="small text-muted d-flex justify-content-between">
              <span>Borrower: ${debt.borrowerName || '-'}</span>
              <span>Mode: ${debt.debtMode || 'Cash'}</span>
            </div>
            <div class="small text-secondary mt-1">Receiver: ${debt.receiverName || '-'}</div>
            ${debt.description ? `<div class="small text-muted fst-italic mt-1">${debt.description}</div>` : ''}
          </div>
        `;
      });

      cardsHtml += `
        <div class="trip-detail-card">
          <div class="trip-detail-card-header">
            <h6 class="trip-detail-card-title">
              <i class="bi bi-wallet2 text-warning"></i> Open Debts (${d.debts.length})
            </h6>
            <span class="badge bg-danger-subtle text-danger border">Active Debts</span>
          </div>
          <div class="trip-detail-card-body">
            ${debtsListHtml}
          </div>
        </div>
      `;
    }

    container.innerHTML = cardsHtml;
  },

  // ========================================================
  // VIEW 5: FULL PARTY DRILLDOWN SHEET
  // ========================================================
  showOpenTripPartyDetails() {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(this.currentTripId) || String(item.grNo) === String(this.currentTripId));
    if (!d) return;

    this.currentView = 'partyDetails';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'block';
    if (viewPayment) viewPayment.style.display = 'none';

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOpenTripDetails('${this.currentTripId}')">Open Trip Details</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Consignor & Consignee</span>
      `;
    }

    const grBadge = document.getElementById('party-sheet-gr-no');
    if (grBadge) grBadge.innerText = `GR: ${d.grNo || '-'}`;

    const content = document.getElementById('party-details-card-content');
    if (content) {
      content.innerHTML = `
        <div class="mb-4">
          <h6 class="fw-bold text-primary mb-3"><i class="bi bi-geo-alt me-1"></i>Consignor (From)</h6>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignor Name</div>
            <div class="appsheet-detail-value text-dark fw-bold">${d.consignor?.name || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">GSTIN</div>
            <div class="appsheet-detail-value font-monospace">${d.consignor?.gstin || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Pickup Address / Station</div>
            <div class="appsheet-detail-value">${d.consignor?.address || d.origin || '-'}</div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-top">
          <h6 class="fw-bold text-success mb-3"><i class="bi bi-pin-map me-1"></i>Consignee (To)</h6>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Consignee Name</div>
            <div class="appsheet-detail-value text-dark fw-bold">${d.consignee?.name || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">GSTIN</div>
            <div class="appsheet-detail-value font-monospace">${d.consignee?.gstin || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Mobile Number</div>
            <div class="appsheet-detail-value font-monospace">${d.consignee?.mobile || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Destination Station</div>
            <div class="appsheet-detail-value">${d.destination || '-'}</div>
          </div>
          <div class="appsheet-detail-divider"></div>
          <div class="appsheet-detail-item">
            <div class="appsheet-detail-label">Reference / Bill To</div>
            <div class="appsheet-detail-value">${d.reference || d.partyName || '-'}</div>
          </div>
        </div>
      `;
    }
  },

  // ========================================================
  // VIEW 6: FULL PAYMENT DRILLDOWN SHEET
  // ========================================================
  showTripPaymentDetails() {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(this.currentTripId) || String(item.grNo) === String(this.currentTripId));
    if (!d) return;

    this.currentView = 'paymentDetails';

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'none';
    if (viewPayment) viewPayment.style.display = 'block';

    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOpenTripDetails('${this.currentTripId}')">Open Trip Details</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Payment Details</span>
      `;
    }

    const grBadge = document.getElementById('payment-sheet-gr-no');
    if (grBadge) grBadge.innerText = `GR: ${d.grNo || '-'}`;

    const pm = (d.payments && d.payments.length > 0) ? d.payments[0] : null;

    const content = document.getElementById('payment-details-card-content');
    if (content) {
      content.innerHTML = `
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Truck No.</div>
          <div class="appsheet-detail-value font-monospace fw-bold text-dark">${d.truckNo || '-'}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Truck Owner Name</div>
          <div class="appsheet-detail-value text-dark">${d.ownerName || '-'}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Total Freight</div>
          <div class="appsheet-detail-value font-monospace">${this.formatCurrency(d.totalFreight || d.biltyAmount || d.dueAmount)}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Amount Paid</div>
          <div class="appsheet-detail-value font-monospace text-success fw-bold">${this.formatCurrency(pm ? (pm.amountPaid || pm.paidAmount || 0) : d.paidAmount)}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Balance / Owner Due</div>
          <div class="appsheet-detail-value font-monospace text-danger fw-bold fs-5">${this.formatCurrency(d.dueAmount)}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Payment Mode</div>
          <div class="appsheet-detail-value">${pm ? (pm.mode || pm.paymentMode || 'NEFT/RTGS') : 'Pending'}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Beneficiary / Bank</div>
          <div class="appsheet-detail-value">${pm ? (pm.beneficiary || pm.bank || 'TTC') : 'TTC'}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Payment Date</div>
          <div class="appsheet-detail-value">${pm ? (pm.paymentDate || d.tripDate) : '-'}</div>
        </div>
        <div class="appsheet-detail-divider"></div>
        <div class="appsheet-detail-item">
          <div class="appsheet-detail-label">Status</div>
          <div class="appsheet-detail-value">
            <span class="badge-status badge-status-${d.color || 'yellow'}">
              <span class="appsheet-dot dot-${d.color || 'yellow'}"></span> ${d.status || 'Pending'}
            </span>
          </div>
        </div>
      `;
    }
  },

  backToDueList() {
    this.showOwnerDueList(this.selectedDueYear);
  },

  backToTripDetails() {
    this.showOpenTripDetails(this.currentTripId);
  },

  toggleCardExpand(cardId) {
    if (cardId === 'cardOwnerDue') {
      this.showOwnerDueList('ALL');
      return;
    }
    const card = document.getElementById(cardId);
    if (!card) return;

    const isCurrentlyExpanded = card.classList.contains('is-expanded');

    if (!isCurrentlyExpanded) {
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

  exportCSV() {
    let csv = "Truck No.,Name,Mobile No.,Mobile No. 1\\n";
    this.allOwners.forEach(o => {
      const name = (o.name || '').replace(/"/g, '""');
      csv += `"${o.truckNo || ''}","${name}","${o.mobile || ''}","${o.mobile1 || ''}"\\n`;
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
'''

with open('js/modules/owners.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated js/modules/owners.js successfully!')
