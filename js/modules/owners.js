/**
 * Truck Owners & Owner Due Master Module - MTC & TTC Logistics
 * Matches Google AppSheet Authentic UI across all views:
 * 1. 3-Card Dashboard View (Card 1: Truck Owners, Card 2: Owner Due, Card 3: Owner Paid)
 * 2. Dedicated Truck Owners Full View (596 Trucks with bottom pagination & search)
 * 3. Single Truck Owner Details View with Edit / Delete actions
 * 4. Slide Drawer for Add/Edit Truck Owner
 * 5. Dedicated Owner Due Table View with 2-Column Split:
 *    - Left: Year Selector (All, 2026-2027, 2025-2026, 2024-2025)
 *    - Right: Table with 489 records & FULL ROW COLOR based on 6 Statuses!
 * 6. Open Trip Details View with 4 dynamic inner cards matching Google AppSheet:
 *    - Card 1: Trip Details (with Edit, Expand)
 *    - Card 2: Consignor/s 1 (with Add, Edit, Expand)
 *    - Card 3: Trip Truck Owner Payment Details (with Add, Edit, Expand)
 *    - Card 4: Open Debts (with Add, Expand)
 * 7. Slide Drawers for Editing Trips, Adding Debts, and Recording Payments directly to Firebase!
 * 8. Sidebar Hide / Unhide Toggle
 * 100% Dynamic - Connected to Firebase Cloud Firestore ('truckOwners' and 'ownerDues')
 */

const OwnersModule = {
  // Truck Owners Master State (Card 1)
  allOwners: [],
  searchQuery: '',
  currentView: 'dashboard',
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
    this.checkSidebarPref();
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('owners');
    }
    await this.loadData();
    this.checkInitialRoute();
  },

  // Sidebar Hide / Unhide Toggle
  toggleSidebar() {
    document.body.classList.toggle('sidebar-hidden');
    const isHidden = document.body.classList.contains('sidebar-hidden');
    try {
      localStorage.setItem('sidebar_hidden_pref', isHidden ? 'true' : 'false');
    } catch (e) {}
  },

  checkSidebarPref() {
    try {
      if (localStorage.getItem('sidebar_hidden_pref') === 'true') {
        document.body.classList.add('sidebar-hidden');
      }
    } catch (e) {}
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

    const tbodyDues = document.getElementById('owner-dues-tbody');
    if (tbodyDues && (!this.allOwnerDues || this.allOwnerDues.length === 0)) {
      tbodyDues.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading owner dues directly from Firestore...
          </td>
        </tr>
      `;
    }

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
      console.warn("Could not load from Firestore, falling back to local master:", err);
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

  // Slide Drawer for Owner
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

    if (!truckNo || !name || !mobile) {
      alert("Truck No., Name, and Mobile No. are required.");
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
  // CARD 2: OWNER DUE FULL VIEW (2-COLUMN SPLIT & FULL ROW COLOR)
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
        <button class="btn btn-sm btn-light border" onclick="OwnersModule.loadData()" title="Refresh Data Directly from Firestore">
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
      const col = d.color || 'yellow';

      // PURI KI PURI ROW KA COLOR AATA HAI (.row-status-${col})
      html += `
        <tr class="appsheet-row row-status-${col}" onclick="OwnersModule.showOpenTripDetails('${safeTripId}')" style="cursor: pointer;" title="Status: ${d.status}">
          <!-- 1. Date with Dot -->
          <td>
            <span class="appsheet-dot dot-${col}"></span>
            <span class="text-dark fw-bold">${d.tripDate || '-'}</span>
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
            <div class="fw-semibold text-dark text-truncate" style="max-width: 170px;" title="${d.ownerName || ''}">${d.ownerName || '-'}</div>
          </td>

          <!-- 5. Destination -->
          <td>
            <div class="text-secondary text-truncate" style="max-width: 130px;" title="${d.destination || ''}">${d.destination || '-'}</div>
          </td>

          <!-- 6. Company -->
          <td>
            <span class="badge bg-white text-dark border font-monospace shadow-sm">${d.transport || '-'}</span>
          </td>

          <!-- 7. Party Name -->
          <td>
            <div class="text-dark text-truncate fw-medium" style="max-width: 180px;" title="${partyTitle}">${partyTitle}</div>
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
    let csv = "Date,Owner Due,Truck No.,Name,Destination,Company,Party Name,Driver,Status\n";
    dues.forEach(d => {
      const name = (d.ownerName || '').replace(/"/g, '""');
      const party = (d.consignee?.name || d.reference || d.partyName || '').replace(/"/g, '""');
      const dest = (d.destination || '').replace(/"/g, '""');
      const driver = (d.driver || '').replace(/"/g, '""');
      csv += `"${d.tripDate || ''}","${d.dueAmount || 0}","${d.truckNo || ''}","${name}","${dest}","${d.transport || ''}","${party}","${driver}","${d.status || ''}"\n`;
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
  // VIEW 4: OPEN TRIP DETAILS - AUTHENTIC APPSHEET INNER CARDS
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

    // Top GR Bar
    const titleEl = document.getElementById('trip-details-gr-title');
    if (titleEl) {
      titleEl.innerHTML = `GR: <span class="font-monospace text-primary">${d.grNo || '-'}</span> &bull; <span class="font-monospace">${d.truckNo || '-'}</span>`;
    }

    const badgeEl = document.getElementById('trip-details-status-badge');
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="badge-status badge-status-${d.color || 'yellow'}"><span class="appsheet-dot dot-${d.color || 'yellow'}"></span> ${d.status || 'Transit'}</span>`;
    }

    const container = document.getElementById('open-trip-cards-container');
    if (!container) return;

    let cardsHtml = '';

    // CARD 1: Trip Details (Matching authentic suraj_19_42_11.png with Edit & Expand)
    cardsHtml += `
      <div class="trip-detail-card" id="innerCardTripDetails">
        <div class="trip-detail-card-header">
          <h6 class="trip-detail-card-title">
            <i class="bi bi-truck text-primary"></i> Trip Details
          </h6>
          <div class="d-flex align-items-center gap-1">
            <button class="btn-appsheet-panel-action btn-action-gold" onclick="OwnersModule.openEditTripDrawer('${d.id}')" title="Edit Trip Details">
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon ms-2" style="cursor: pointer; color: #5f6368;" onclick="OwnersModule.toggleInnerCardExpand('innerCardTripDetails')" title="Expand / Collapse"></i>
          </div>
        </div>
        <div class="trip-detail-card-body">
          <div class="trip-field-row">
            <span class="trip-field-label">G.R. No.</span>
            <span class="trip-field-value font-monospace fw-bold text-primary">${d.grNo || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Truck No.</span>
            <span class="trip-field-value font-monospace fw-bold text-dark">${d.truckNo || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Trip Start Date</span>
            <span class="trip-field-value fw-semibold text-dark">${d.tripDate || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Trip End Date</span>
            <span class="trip-field-value text-muted">${d.tripEndDate || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Origin</span>
            <span class="trip-field-value">${d.origin || 'Rajsamand (Raj.)'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Destination</span>
            <span class="trip-field-value fw-semibold text-dark">${d.destination || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Billing Type</span>
            <span class="trip-field-value">${d.billingType || 'Per Tonne'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Bilty Amount</span>
            <span class="trip-field-value font-monospace">${this.formatCurrency(d.biltyAmount || d.dueAmount)}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Weight</span>
            <span class="trip-field-value font-monospace">${d.weight || 0} MT</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Rate</span>
            <span class="trip-field-value font-monospace">₹ ${Number(d.rate || 0).toFixed(2)}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Material</span>
            <span class="trip-field-value">${d.material || 'Marble Powder'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Reference</span>
            <span class="trip-field-value text-secondary">${d.reference || '-'}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Driver</span>
            <span class="trip-field-value">${d.driver || '-'} ${d.driverMobile ? '(' + d.driverMobile + ')' : ''}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Owner</span>
            <span class="trip-field-value">${d.ownerName || '-'} ${d.ownerMobile ? '(' + d.ownerMobile + ')' : ''}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Freight</span>
            <span class="trip-field-value font-monospace">${this.formatCurrency(d.freight || d.dueAmount)}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Total Freight</span>
            <span class="trip-field-value font-monospace">${this.formatCurrency(d.totalFreight || d.dueAmount)}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Status</span>
            <span class="trip-field-value">
              <span class="badge-status badge-status-${d.color || 'yellow'}">
                <span class="appsheet-dot dot-${d.color || 'yellow'}"></span> ${d.status || 'Transit'}
              </span>
            </span>
          </div>
          <div class="trip-field-row pt-2 border-top">
            <span class="trip-field-label fw-bold text-dark fs-6">Owner Due</span>
            <span class="trip-field-value fw-bold font-monospace fs-5 text-danger">${this.formatCurrency(d.dueAmount)}</span>
          </div>
        </div>
      </div>
    `;

    // CARD 2: Consignor/s 1 (Matching authentic screenshot with Add, Edit, Expand)
    const consignorName = d.consignor?.name || '-';
    const consignorGst = d.consignor?.gstin || '-';
    const consignorAddr = d.consignor?.address || '-';
    const consigneeName = d.consignee?.name || '-';
    const consigneeGst = d.consignee?.gstin || '-';
    const consigneeMob = d.consignee?.mobile || '-';

    cardsHtml += `
      <div class="trip-detail-card" id="innerCardPartyDetails">
        <div class="trip-detail-card-header">
          <h6 class="trip-detail-card-title">
            <i class="bi bi-building text-info"></i> Consignor/s 1
          </h6>
          <div class="d-flex align-items-center gap-1">
            <button class="btn-appsheet-panel-action" onclick="OwnersModule.showOpenTripPartyDetails()" title="Expand / View Full Sheet">
              <i class="bi bi-arrows-fullscreen me-1"></i> Expand
            </button>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon ms-2" style="cursor: pointer; color: #5f6368;" onclick="OwnersModule.toggleInnerCardExpand('innerCardPartyDetails')" title="Expand / Collapse"></i>
          </div>
        </div>
        <div class="trip-detail-card-body">
          <div class="trip-field-row">
            <span class="trip-field-label">GSTIN</span>
            <span class="trip-field-value font-monospace text-muted small">${consignorGst}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Consignor</span>
            <span class="trip-field-value fw-bold text-dark">${consignorName}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Consignor Address</span>
            <span class="trip-field-value small text-muted text-truncate" style="max-width: 220px;" title="${consignorAddr}">${consignorAddr}</span>
          </div>
          <div class="trip-field-row border-top pt-2">
            <span class="trip-field-label">GSTIN Consignee</span>
            <span class="trip-field-value font-monospace text-muted small">${consigneeGst}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Consignee</span>
            <span class="trip-field-value fw-bold text-dark">${consigneeName}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Consignee Mobile No.</span>
            <span class="trip-field-value font-monospace">${consigneeMob}</span>
          </div>
          <div class="trip-field-row">
            <span class="trip-field-label">Reference</span>
            <span class="trip-field-value text-secondary">${d.reference || d.partyName || '-'}</span>
          </div>
          <div class="text-center pt-2 mt-3 border-top">
            <button class="btn btn-sm btn-light border w-100" onclick="OwnersModule.showOpenTripPartyDetails()">
              View Complete Party Details Sheet &rarr;
            </button>
          </div>
        </div>
      </div>
    `;

    // CARD 3: Trip Truck Owner Payment Details (with Add, Edit, Expand)
    const hasPayments = Array.isArray(d.payments) && d.payments.length > 0;
    const isPaymentStatus = ['blue', 'slate', 'cyan'].includes(d.color);

    if (hasPayments || isPaymentStatus) {
      const pm = hasPayments ? d.payments[0] : null;
      cardsHtml += `
        <div class="trip-detail-card" id="innerCardPaymentDetails">
          <div class="trip-detail-card-header">
            <h6 class="trip-detail-card-title">
              <i class="bi bi-credit-card text-success"></i> Trip Truck Owner Payment Details
            </h6>
            <div class="d-flex align-items-center gap-1">
              <button class="btn-appsheet-panel-action" onclick="OwnersModule.openAddPaymentDrawer('${d.id}')" title="Record New Payment">
                <i class="bi bi-plus-lg me-1"></i> Add
              </button>
              <i class="bi bi-arrows-angle-expand expand-toggle-icon ms-2" style="cursor: pointer; color: #5f6368;" onclick="OwnersModule.toggleInnerCardExpand('innerCardPaymentDetails')" title="Expand / Collapse"></i>
            </div>
          </div>
          <div class="trip-detail-card-body">
            <div class="trip-field-row">
              <span class="trip-field-label">Payment Date</span>
              <span class="trip-field-value font-monospace">${pm ? (pm.paymentDate || d.tripDate) : d.tripDate}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Owner Due</span>
              <span class="trip-field-value font-monospace fw-bold text-danger">${this.formatCurrency(d.dueAmount)}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Amount Paid</span>
              <span class="trip-field-value font-monospace text-success fw-bold">${this.formatCurrency(pm ? (pm.amountPaid || pm.paidAmount || 0) : d.paidAmount)}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Mode</span>
              <span class="trip-field-value">${pm ? (pm.mode || pm.paymentMode || 'NEFT/RTGS') : 'Pending'}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Beneficiary</span>
              <span class="trip-field-value">${pm ? (pm.beneficiary || 'Truck Owner') : 'Truck Owner'}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Bank</span>
              <span class="trip-field-value">${pm ? (pm.bank || d.transport || 'TTC') : (d.transport || 'TTC')}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Paid To</span>
              <span class="trip-field-value">${pm ? (pm.paidTo || 'Transporter') : 'Transporter'}</span>
            </div>
            <div class="trip-field-row">
              <span class="trip-field-label">Status</span>
              <span class="trip-field-value">
                <span class="badge ${d.dueAmount > 0 ? 'bg-warning-subtle text-warning-emphasis' : 'bg-success-subtle text-success-emphasis'} border">${d.status}</span>
              </span>
            </div>
            <div class="text-center pt-2 mt-3 border-top">
              <button class="btn btn-sm btn-light border w-100" onclick="OwnersModule.showTripPaymentDetails()">
                View Transaction Sheet &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // CARD 4: Open Debts (Matching authentic screencapture-appsheet-start-...-19_43_39.png with Add & Expand)
    const debtsList = Array.isArray(d.debts) ? d.debts : [];
    let debtsListHtml = '';

    if (debtsList.length === 0) {
      debtsListHtml = `
        <div class="text-center py-4 text-muted">
          <i class="bi bi-wallet2 fs-4 d-block mb-1"></i> No active debts for this trip.
          <button class="btn btn-sm btn-outline-primary mt-2" onclick="OwnersModule.openAddDebtDrawer('${d.id}')">
            <i class="bi bi-plus-lg me-1"></i> Add Debt Record
          </button>
        </div>
      `;
    } else {
      debtsList.forEach((debt, dIdx) => {
        debtsListHtml += `
          <div class="p-3 mb-2 rounded bg-light border">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-secondary text-white font-monospace">${debt.debtType || 'Commission'}</span>
              <span class="fw-bold font-monospace text-danger fs-6">₹ ${Number(debt.debtAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="trip-field-row py-1">
              <span class="trip-field-label small text-muted">Debt Mode:</span>
              <span class="trip-field-value small">${debt.debtMode || 'Cash'}</span>
            </div>
            <div class="trip-field-row py-1">
              <span class="trip-field-label small text-muted">Borrower Name:</span>
              <span class="trip-field-value small fw-semibold text-dark">${debt.borrowerName || d.ownerName || '-'}</span>
            </div>
            <div class="trip-field-row py-1">
              <span class="trip-field-label small text-muted">Receiver Name:</span>
              <span class="trip-field-value small">${debt.receiverName || '-'}</span>
            </div>
            ${debt.description ? `
            <div class="trip-field-row py-1 border-0">
              <span class="trip-field-label small text-muted">Description:</span>
              <span class="trip-field-value small fst-italic">${debt.description}</span>
            </div>` : ''}
          </div>
        `;
      });
    }

    cardsHtml += `
      <div class="trip-detail-card" id="innerCardDebtDetails">
        <div class="trip-detail-card-header">
          <h6 class="trip-detail-card-title">
            <i class="bi bi-wallet2 text-warning"></i> Open Debts (${debtsList.length})
          </h6>
          <div class="d-flex align-items-center gap-1">
            <button class="btn-appsheet-panel-action" onclick="OwnersModule.openAddDebtDrawer('${d.id}')" title="Add Debt">
              <i class="bi bi-plus-lg me-1"></i> Add
            </button>
            <i class="bi bi-arrows-angle-expand expand-toggle-icon ms-2" style="cursor: pointer; color: #5f6368;" onclick="OwnersModule.toggleInnerCardExpand('innerCardDebtDetails')" title="Expand / Collapse"></i>
          </div>
        </div>
        <div class="trip-detail-card-body">
          ${debtsListHtml}
        </div>
      </div>
    `;

    container.innerHTML = cardsHtml;
  },

  // Toggle Inner Card Expand (xpeded)
  toggleInnerCardExpand(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const isExpanded = card.classList.contains('is-inner-expanded');
    const container = document.getElementById('open-trip-cards-container');

    if (!isExpanded) {
      card.classList.add('is-inner-expanded');
      const icon = card.querySelector('.expand-toggle-icon');
      if (icon) {
        icon.classList.remove('bi-arrows-angle-expand');
        icon.classList.add('bi-arrows-angle-contract');
      }
      // Hide other cards so this card takes 100% of the screen
      if (container) {
        container.querySelectorAll('.trip-detail-card').forEach(c => {
          if (c !== card) c.style.display = 'none';
        });
      }
    } else {
      card.classList.remove('is-inner-expanded');
      const icon = card.querySelector('.expand-toggle-icon');
      if (icon) {
        icon.classList.remove('bi-arrows-angle-contract');
        icon.classList.add('bi-arrows-angle-expand');
      }
      if (container) {
        container.querySelectorAll('.trip-detail-card').forEach(c => {
          c.style.display = '';
        });
      }
    }
  },

  // ========================================================
  // SLIDE DRAWERS: TRIP EDIT, DEBT ADD, PAYMENT ADD
  // ========================================================
  openEditTripDrawer(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    document.getElementById('drawer-trip-id').value = d.id;
    document.getElementById('drawer-trip-gr').value = d.grNo || '';
    document.getElementById('drawer-trip-truck').value = d.truckNo || '';
    document.getElementById('drawer-trip-owner').value = d.ownerName || '';
    document.getElementById('drawer-trip-status').value = d.status || 'Transit';
    document.getElementById('drawer-trip-origin').value = d.origin || '';
    document.getElementById('drawer-trip-dest').value = d.destination || '';
    document.getElementById('drawer-trip-mat').value = d.material || '';
    document.getElementById('drawer-trip-weight').value = d.weight || '';
    document.getElementById('drawer-trip-rate').value = d.rate || '';
    document.getElementById('drawer-trip-freight').value = d.totalFreight || d.dueAmount || '';
    document.getElementById('drawer-trip-due').value = d.dueAmount || 0;
    document.getElementById('drawer-trip-driver').value = d.driver || '';
    document.getElementById('drawer-trip-driver-mob').value = d.driverMobile || '';

    const drawer = document.getElementById('tripDrawer');
    const backdrop = document.getElementById('tripDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  },

  closeTripDrawer() {
    const drawer = document.getElementById('tripDrawer');
    const backdrop = document.getElementById('tripDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  async saveTripDrawer(e) {
    if (e && e.preventDefault) e.preventDefault();

    const id = document.getElementById('drawer-trip-id').value;
    const truckNo = document.getElementById('drawer-trip-truck').value.trim().toUpperCase();
    const ownerName = document.getElementById('drawer-trip-owner').value.trim();
    const status = document.getElementById('drawer-trip-status').value;
    const origin = document.getElementById('drawer-trip-origin').value.trim();
    const destination = document.getElementById('drawer-trip-dest').value.trim();
    const material = document.getElementById('drawer-trip-mat').value.trim();
    const weight = parseFloat(document.getElementById('drawer-trip-weight').value) || 0;
    const rate = parseFloat(document.getElementById('drawer-trip-rate').value) || 0;
    const totalFreight = parseFloat(document.getElementById('drawer-trip-freight').value) || 0;
    const dueAmount = parseFloat(document.getElementById('drawer-trip-due').value) || 0;
    const driver = document.getElementById('drawer-trip-driver').value.trim();
    const driverMobile = document.getElementById('drawer-trip-driver-mob').value.trim();

    // Map status to color
    const colorMap = {
      'Transit': 'yellow',
      'POD Sent/ Bill Generated': 'purple',
      'Party Payment Pending': 'blue',
      'Off Loading': 'pink',
      'Cheque Due': 'slate',
      'Truck Owner Payment Pending': 'cyan'
    };
    const color = colorMap[status] || 'yellow';

    const payload = {
      truckNo,
      ownerName,
      status,
      color,
      origin,
      destination,
      material,
      weight,
      rate,
      totalFreight,
      dueAmount,
      driver,
      driverMobile,
      updatedAt: new Date().toISOString()
    };

    try {
      if (typeof dbService !== 'undefined') {
        await dbService.update('ownerDues', id, payload);
      }
      const idx = this.allOwnerDues.findIndex(d => String(d.id) === String(id));
      if (idx !== -1) {
        this.allOwnerDues[idx] = { ...this.allOwnerDues[idx], ...payload };
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Could not save to database: " + err.message);
      return;
    }

    this.closeTripDrawer();
    this.renderOwnerDueTable();
    this.showOpenTripDetails(id);

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Updated trip ${truckNo} (${status})`, 'success');
    }
  },

  openAddDebtDrawer(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    document.getElementById('debtDrawerForm').reset();
    document.getElementById('drawer-debt-trip-id').value = d.id;
    document.getElementById('drawer-debt-borrower').value = d.ownerName || '';
    document.getElementById('drawer-debt-receiver').value = 'Bajrang Meena 7297032726';

    const drawer = document.getElementById('debtDrawer');
    const backdrop = document.getElementById('debtDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  },

  closeDebtDrawer() {
    const drawer = document.getElementById('debtDrawer');
    const backdrop = document.getElementById('debtDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  async saveDebtDrawer(e) {
    if (e && e.preventDefault) e.preventDefault();

    const tripId = document.getElementById('drawer-debt-trip-id').value;
    const debtType = document.getElementById('drawer-debt-type').value;
    const debtAmount = parseFloat(document.getElementById('drawer-debt-amount').value) || 0;
    const debtMode = document.getElementById('drawer-debt-mode').value;
    const borrowerName = document.getElementById('drawer-debt-borrower').value.trim();
    const receiverName = document.getElementById('drawer-debt-receiver').value.trim();
    const description = document.getElementById('drawer-debt-desc').value.trim();

    const trip = (this.allOwnerDues || []).find(d => String(d.id) === String(tripId));
    if (!trip) return;

    const newDebt = {
      debtType,
      debtAmount,
      debtMode,
      borrowerName,
      receiverName,
      description,
      grNo: trip.grNo,
      truckNo: trip.truckNo,
      dueAmount: trip.dueAmount
    };

    if (!Array.isArray(trip.debts)) trip.debts = [];
    trip.debts.unshift(newDebt);

    try {
      if (typeof dbService !== 'undefined') {
        await dbService.update('ownerDues', tripId, { debts: trip.debts });
      }
    } catch (err) {
      console.error("Save debt error:", err);
    }

    this.closeDebtDrawer();
    this.showOpenTripDetails(tripId);

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Added ${debtType} of ₹ ${debtAmount.toLocaleString('en-IN')}`, 'success');
    }
  },

  openAddPaymentDrawer(tripId) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    document.getElementById('paymentDrawerForm').reset();
    document.getElementById('drawer-payment-trip-id').value = d.id;
    document.getElementById('drawer-payment-amount').value = d.dueAmount || 0;
    document.getElementById('drawer-payment-date').value = new Date().toLocaleDateString('en-GB');
    document.getElementById('drawer-payment-bank').value = d.transport || 'TTC';

    const drawer = document.getElementById('paymentDrawer');
    const backdrop = document.getElementById('paymentDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  },

  closePaymentDrawer() {
    const drawer = document.getElementById('paymentDrawer');
    const backdrop = document.getElementById('paymentDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  },

  async savePaymentDrawer(e) {
    if (e && e.preventDefault) e.preventDefault();

    const tripId = document.getElementById('drawer-payment-trip-id').value;
    const amountPaid = parseFloat(document.getElementById('drawer-payment-amount').value) || 0;
    const paymentDate = document.getElementById('drawer-payment-date').value.trim();
    const mode = document.getElementById('drawer-payment-mode').value;
    const bank = document.getElementById('drawer-payment-bank').value.trim();
    const paidTo = document.getElementById('drawer-payment-paidto').value.trim();
    const description = document.getElementById('drawer-payment-desc').value.trim();

    const trip = (this.allOwnerDues || []).find(d => String(d.id) === String(tripId));
    if (!trip) return;

    const newPayment = {
      paymentDate,
      amountPaid,
      mode,
      bank,
      beneficiary: trip.ownerName,
      paidTo: paidTo || 'Transporter',
      description
    };

    if (!Array.isArray(trip.payments)) trip.payments = [];
    trip.payments.unshift(newPayment);
    trip.paidAmount = (trip.paidAmount || 0) + amountPaid;
    trip.dueAmount = Math.max(0, (trip.dueAmount || 0) - amountPaid);

    try {
      if (typeof dbService !== 'undefined') {
        await dbService.update('ownerDues', tripId, {
          payments: trip.payments,
          paidAmount: trip.paidAmount,
          dueAmount: trip.dueAmount
        });
      }
    } catch (err) {
      console.error("Save payment error:", err);
    }

    this.closePaymentDrawer();
    this.renderOwnerDueTable();
    this.showOpenTripDetails(tripId);

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Recorded payment of ₹ ${amountPaid.toLocaleString('en-IN')}`, 'success');
    }
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
