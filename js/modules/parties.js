/**
 * parties.js - Parties Master Module Implementation
 * Completely matching Google AppSheet Views & Interactions:
 *  1. 3-Card Dashboard View: Parties Detail, Party Due, Party Paid (media_1792691679696_57a495f0.png)
 *  2. Full-Screen Parties Detail View (scroll_top.png / screencapture-...-23_32_33.png)
 *  3. Single Party Details View (screencapture-...-23_50_06.png)
 *  4. AppSheet Right Drawer for Add & Edit with Searchable Comboboxes (screencapture-...-23_50_18.png & WhatsApp photos)
 *  5. Direct Firebase Firestore Integration (collection: 'parties') + In-memory Master Dataset
 *  6. Real-time Search by Name, GSTIN, Address, or Mobile with Highlighted Matches
 */

// AppSheet Combobox Helper (Type to Search or Select from List with zero lag)
const PartiesCombobox = {
  activeDropdown: null,

  init(type, inputId, dropdownId, chevronId) {
    if (typeof document === 'undefined') return;
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const chevron = document.getElementById(chevronId);
    if (!input || !dropdown) return;

    const toggle = (show) => {
      if (show) {
        PartiesCombobox.closeAll();
        PartiesCombobox.render(type, input.value || '');
        dropdown.classList.add('show');
        if (chevron) {
          chevron.classList.remove('bi-caret-down-fill');
          chevron.classList.add('bi-caret-up-fill');
          chevron.title = 'Close';
        }
        PartiesCombobox.activeDropdown = dropdownId;
      } else {
        dropdown.classList.remove('show');
        if (chevron) {
          chevron.classList.remove('bi-caret-up-fill');
          chevron.classList.add('bi-caret-down-fill');
          chevron.title = 'Open';
        }
        if (PartiesCombobox.activeDropdown === dropdownId) {
          PartiesCombobox.activeDropdown = null;
        }
      }
    };

    input.addEventListener('focus', () => toggle(true));
    input.addEventListener('input', (e) => {
      toggle(true);
      PartiesCombobox.render(type, e.target.value || '');
    });

    if (chevron) {
      chevron.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle(!dropdown.classList.contains('show'));
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      const wrap = input.closest('.appsheet-combobox-wrap');
      if (wrap && !wrap.contains(e.target)) {
        toggle(false);
      }
    });
  },

  render(type, query) {
    const dropdownId = type === 'gstin' ? 'dropdown-combobox-gstin' : 'dropdown-combobox-name';
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    const q = (query || '').trim().toLowerCase();
    const all = PartiesModule.allParties || [];

    // Filter matching parties - limit to top 40 for optimal performance
    const matches = [];
    for (let i = 0; i < all.length && matches.length < 40; i++) {
      const p = all[i];
      if (type === 'gstin') {
        if (!q || (p.gstin && p.gstin.toLowerCase().includes(q))) {
          matches.push(p);
        }
      } else {
        if (!q || (p.name && p.name.toLowerCase().includes(q))) {
          matches.push(p);
        }
      }
    }

    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="p-2 text-muted small text-center">No matching ${type === 'gstin' ? 'GSTIN' : 'parties'} found</div>`;
      return;
    }

    dropdown.innerHTML = matches.map(p => {
      const mainVal = type === 'gstin' ? (p.gstin || '-') : (p.name || '-');
      const subVal = type === 'gstin' ? (p.name || '') : (p.gstin || '');
      const id = p.id || p.sno;
      return `
        <div class="appsheet-combobox-item" onclick="PartiesCombobox.selectItem('${type}', '${id}')">
          <div class="fw-semibold">${mainVal}</div>
          ${subVal ? `<div class="appsheet-combobox-item-meta">${subVal}</div>` : ''}
        </div>
      `;
    }).join('');
  },

  selectItem(type, partyId) {
    const party = PartiesModule.allParties.find(p => p.id === partyId || String(p.sno) === String(partyId));
    if (!party) return;

    const gstinEl = document.getElementById('pf-gstin');
    const nameEl = document.getElementById('pf-name');
    const addrEl = document.getElementById('pf-address');
    const mobEl = document.getElementById('pf-mobile');
    const mob1El = document.getElementById('pf-mobile1');

    if (gstinEl) gstinEl.value = party.gstin || '';
    if (nameEl) nameEl.value = party.name || '';
    if (addrEl && party.address) addrEl.value = party.address;
    if (mobEl && party.mobile) mobEl.value = party.mobile;
    if (mob1El && party.mobile1) mob1El.value = party.mobile1;

    PartiesCombobox.closeAll();
  },

  closeAll() {
    if (typeof document === 'undefined') return;
    const dropdowns = document.querySelectorAll('.appsheet-combobox-dropdown');
    dropdowns.forEach(d => d.classList.remove('show'));
    const chevrons = document.querySelectorAll('.appsheet-combobox-chevron');
    chevrons.forEach(c => {
      c.classList.remove('bi-caret-up-fill');
      c.classList.add('bi-caret-down-fill');
      c.title = 'Open';
    });
  }
};

const PartiesModule = {
  allParties: [],
  filteredParties: [],
  searchQuery: '',
  selectedParty: null,
  activeView: 'dashboard', // 'dashboard', 'full-list', 'details'

  summaryData: {
    due: {
      '2026-2027': 26301228.76,
      '2025-2026': 918706.10,
      '2024-2025': 239856.00,
      'total': 27459790.86
    },
    paid: {
      '2026-2027': 388648303.25,
      '2025-2026': 615289069.19,
      '2024-2025': 254526755.64,
      'total': 1258464128.08
    }
  },

  async init() {
    console.log('[PartiesModule] Initializing Parties Master Module with AppSheet Flow...');

    // 1. Load data from master window or Firestore
    if (typeof window !== 'undefined' && window.INITIAL_EXCEL_PARTIES) {
      this.allParties = [...window.INITIAL_EXCEL_PARTIES];
    }

    try {
      if (typeof dbService !== 'undefined' && dbService.getAll) {
        const firestoreParties = await dbService.getAll('parties');
        if (firestoreParties && firestoreParties.length > 0) {
          // Merge or prioritize Firestore records
          const existingIds = new Set(firestoreParties.map(p => p.id || p.sno));
          const localOnly = this.allParties.filter(p => !existingIds.has(p.id || p.sno));
          this.allParties = [...firestoreParties, ...localOnly];
          console.log(`[PartiesModule] Loaded ${firestoreParties.length} parties from Firebase Cloud Firestore.`);
        }
      }
    } catch (e) {
      console.warn('[PartiesModule] Firebase offline or unavailable, continuing with master register:', e);
    }

    this.filteredParties = [...this.allParties];

    // 2. Initialize AppSheet Searchable Comboboxes
    PartiesCombobox.init('gstin', 'pf-gstin', 'dropdown-combobox-gstin', 'chevron-combobox-gstin');
    PartiesCombobox.init('name', 'pf-name', 'dropdown-combobox-name', 'chevron-combobox-name');

    // 3. Render Badges & Tables
    this.renderBadges();
    this.renderPartiesTable();
    this.renderFullTable();
    this.updateCountBadge();
  },

  renderBadges() {
    const fmt = n => `₹ ${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Card 2: Party Due
    const elDue2026 = document.getElementById('badge-due-2026');
    if (elDue2026) elDue2026.innerText = fmt(this.summaryData.due['2026-2027']);

    const elDue2025 = document.getElementById('badge-due-2025');
    if (elDue2025) elDue2025.innerText = fmt(this.summaryData.due['2025-2026']);

    const elDue2024 = document.getElementById('badge-due-2024');
    if (elDue2024) elDue2024.innerText = fmt(this.summaryData.due['2024-2025']);

    // Card 3: Party Paid
    const elPaid2026 = document.getElementById('badge-paid-2026');
    if (elPaid2026) elPaid2026.innerText = fmt(this.summaryData.paid['2026-2027']);

    const elPaid2025 = document.getElementById('badge-paid-2025');
    if (elPaid2025) elPaid2025.innerText = fmt(this.summaryData.paid['2025-2026']);

    const elPaid2024 = document.getElementById('badge-paid-2024');
    if (elPaid2024) elPaid2024.innerText = fmt(this.summaryData.paid['2024-2025']);
  },

  updateCountBadge() {
    const badge = document.getElementById('parties-full-count-badge');
    if (badge) {
      badge.innerText = `Number ${this.filteredParties.length}`;
    }
  },

  highlightMatch(text, query) {
    if (!text || !query) return text || '-';
    const str = String(text);
    const idx = str.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return str;
    const before = str.substring(0, idx);
    const match = str.substring(idx, idx + query.length);
    const after = str.substring(idx + query.length);
    return `${before}<mark class="p-0 bg-warning text-dark">${match}</mark>${after}`;
  },

  // Renders Card 1 Table in 3-Card Dashboard
  renderPartiesTable() {
    const tbody = document.getElementById('parties-table-body');
    if (!tbody) return;

    let parties = this.filteredParties;
    if (!parties || parties.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No parties found matching search</td></tr>`;
      return;
    }

    const q = this.searchQuery;
    const displayList = parties.slice(0, 300);

    tbody.innerHTML = displayList.map(p => {
      const gstin = p.gstin || '-';
      const address = p.address || '-';
      const name = p.name || '-';
      const mobile = p.mobile || '-';
      const id = p.id || p.sno;

      const gstinHtml = q ? this.highlightMatch(gstin, q) : gstin;
      const addrHtml = q ? this.highlightMatch(address, q) : address;
      const nameHtml = q ? this.highlightMatch(name, q) : name;
      const mobHtml = q ? this.highlightMatch(mobile, q) : mobile;

      return `
        <tr class="parties-row" onclick="PartiesModule.openPartyDetails('${id}')" title="${name}">
          <td class="font-monospace text-uppercase text-dark" style="font-size: 10.5px; width: 110px;">${gstinHtml}</td>
          <td class="text-truncate text-secondary" style="max-width: 115px; font-size: 11px;" title="${address}">${addrHtml}</td>
          <td class="text-truncate fw-semibold text-dark" style="max-width: 115px; font-size: 11px;" title="${name}">${nameHtml}</td>
          <td class="text-muted" style="font-size: 10.5px; width: 85px;">${mobHtml}</td>
          <td class="text-end pe-1" style="width: 16px;"><i class="bi bi-chevron-right text-muted" style="font-size: 9.5px;"></i></td>
        </tr>
      `;
    }).join('');
  },

  // Renders Full Table in Full Parties Detail View
  renderFullTable() {
    const tbody = document.getElementById('parties-full-table-body');
    if (!tbody) return;

    let parties = this.filteredParties;
    if (!parties || parties.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No parties found matching search</td></tr>`;
      return;
    }

    const q = this.searchQuery;
    const displayList = parties.slice(0, 400);

    tbody.innerHTML = displayList.map(p => {
      const gstin = p.gstin || '-';
      const address = p.address || '-';
      const name = p.name || '-';
      const mobile = p.mobile || '-';
      const mobile1 = p.mobile1 || '-';
      const id = p.id || p.sno;

      const gstinHtml = q ? this.highlightMatch(gstin, q) : gstin;
      const addrHtml = q ? this.highlightMatch(address, q) : address;
      const nameHtml = q ? this.highlightMatch(name, q) : name;
      const mobHtml = q ? this.highlightMatch(mobile, q) : mobile;
      const mob1Html = q ? this.highlightMatch(mobile1, q) : mobile1;

      return `
        <tr class="parties-row" onclick="PartiesModule.openPartyDetails('${id}')" title="${name}">
          <td class="font-monospace text-uppercase text-dark" style="font-size: 11.5px;">${gstinHtml}</td>
          <td class="text-secondary" style="max-width: 320px; word-break: break-word;">${addrHtml}</td>
          <td class="fw-semibold text-dark" style="max-width: 250px;">${nameHtml}</td>
          <td class="text-dark" style="font-size: 11.5px;">${mobHtml}</td>
          <td class="text-muted" style="font-size: 11.5px;">${mob1Html}</td>
          <td class="text-end pe-2"><i class="bi bi-chevron-right text-muted" style="font-size: 11px;"></i></td>
        </tr>
      `;
    }).join('');
  },

  // View Navigation: 3-Card Dashboard View
  showDashboard() {
    this.activeView = 'dashboard';
    const viewDash = document.getElementById('view-parties-dashboard');
    const viewFull = document.getElementById('view-parties-detail-list');
    const viewDetails = document.getElementById('view-party-details');

    if (viewDash) viewDash.classList.remove('d-none');
    if (viewFull) viewFull.classList.add('d-none');
    if (viewDetails) viewDetails.classList.add('d-none');

    // Update Breadcrumb
    const bc = document.getElementById('parties-breadcrumb');
    if (bc) {
      bc.innerHTML = `
        <li><a href="../index.html">Home</a></li>
        <li><i class="bi bi-chevron-right" style="font-size: 10px;"></i></li>
        <li class="current">Parties</li>
      `;
    }

    // Update Header Tools
    const tools = document.getElementById('parties-bar-tools');
    if (tools) {
      tools.innerHTML = `
        <i class="bi bi-funnel" title="Filter"></i>
        <i class="bi bi-grid" title="Switch View"></i>
      `;
    }

    const searchInput = document.getElementById('parties-search-input');
    if (searchInput) searchInput.placeholder = 'Search Parties';
  },

  // View Navigation: Full-Screen Parties Detail View (scroll_top.png)
  showFullList() {
    this.activeView = 'full-list';
    const viewDash = document.getElementById('view-parties-dashboard');
    const viewFull = document.getElementById('view-parties-detail-list');
    const viewDetails = document.getElementById('view-party-details');

    if (viewDash) viewDash.classList.add('d-none');
    if (viewFull) viewFull.classList.remove('d-none');
    if (viewDetails) viewDetails.classList.add('d-none');

    // Update Breadcrumb
    const bc = document.getElementById('parties-breadcrumb');
    if (bc) {
      bc.innerHTML = `
        <li><a href="javascript:PartiesModule.showDashboard()">Parties</a></li>
        <li><i class="bi bi-chevron-right" style="font-size: 10px;"></i></li>
        <li class="current">Parties Detail</li>
      `;
    }

    // Update Header Tools
    const tools = document.getElementById('parties-bar-tools');
    if (tools) {
      tools.innerHTML = `
        <button class="btn-appsheet-add" onclick="PartiesModule.openAddModal()" title="Add">
          <span class="btn-add-plus">+</span> Add
        </button>
        <div class="parties-header-divider"></div>
        <i class="bi bi-funnel" title="Filter" style="cursor: pointer;"></i>
      `;
    }

    const searchInput = document.getElementById('parties-search-input');
    if (searchInput) searchInput.placeholder = 'Search Parties Detail';

    this.renderFullTable();
    this.updateCountBadge();
  },

  // View Navigation: Single Party Details View (screencapture-...-23_50_06.png)
  openPartyDetails(partyId) {
    const party = this.allParties.find(p => p.id === partyId || String(p.sno) === String(partyId));
    if (!party) return;

    this.selectedParty = party;
    this.activeView = 'details';

    const viewDash = document.getElementById('view-parties-dashboard');
    const viewFull = document.getElementById('view-parties-detail-list');
    const viewDetails = document.getElementById('view-party-details');

    if (viewDash) viewDash.classList.add('d-none');
    if (viewFull) viewFull.classList.add('d-none');
    if (viewDetails) viewDetails.classList.remove('d-none');

    // Update Breadcrumb
    const bc = document.getElementById('parties-breadcrumb');
    if (bc) {
      bc.innerHTML = `
        <li><a href="javascript:PartiesModule.showDashboard()">Home</a></li>
        <li><i class="bi bi-chevron-right" style="font-size: 10px;"></i></li>
        <li><a href="javascript:PartiesModule.showDashboard()">Parties</a></li>
        <li><i class="bi bi-chevron-right" style="font-size: 10px;"></i></li>
        <li><a href="javascript:PartiesModule.showFullList()">Parties Detail</a></li>
        <li><i class="bi bi-chevron-right" style="font-size: 10px;"></i></li>
        <li class="current">Details</li>
      `;
    }

    // Update Header Tools with Edit Button
    const tools = document.getElementById('parties-bar-tools');
    if (tools) {
      tools.innerHTML = `
        <button class="btn-appsheet-edit" onclick="PartiesModule.openEditModal('${party.id}')" title="Edit Party">
          <i class="bi bi-pencil-fill" style="font-size: 11px;"></i> Edit
        </button>
        <i class="bi bi-arrows-angle-expand ms-2" style="cursor: pointer;" title="Fullscreen"></i>
      `;
    }

    // Populate Fields
    const elGstin = document.getElementById('pd-gstin');
    const elAddr = document.getElementById('pd-address');
    const elName = document.getElementById('pd-name');
    const elMob = document.getElementById('pd-mobile');
    const elMob1 = document.getElementById('pd-mobile1');
    const rowMob = document.getElementById('pd-field-mobile');
    const rowMob1 = document.getElementById('pd-field-mobile1');

    if (elGstin) elGstin.innerText = party.gstin || '-';
    if (elAddr) elAddr.innerText = party.address || '-';
    if (elName) elName.innerText = party.name || '-';

    if (elMob && rowMob) {
      if (party.mobile) {
        elMob.innerText = party.mobile;
        rowMob.style.display = 'flex';
      } else {
        rowMob.style.display = 'none';
      }
    }

    if (elMob1 && rowMob1) {
      if (party.mobile1) {
        elMob1.innerText = party.mobile1;
        rowMob1.style.display = 'flex';
      } else {
        rowMob1.style.display = 'none';
      }
    }
  },

  // Open Drawer in Add Mode (WhatsApp Image ... 11.51.51 PM.jpeg)
  openAddModal() {
    const idEl = document.getElementById('pf-id');
    const gstinEl = document.getElementById('pf-gstin');
    const nameEl = document.getElementById('pf-name');
    const addrEl = document.getElementById('pf-address');
    const mobEl = document.getElementById('pf-mobile');
    const mob1El = document.getElementById('pf-mobile1');
    const titleEl = document.getElementById('partyDrawerLabel');

    if (idEl) idEl.value = '';
    if (gstinEl) gstinEl.value = '';
    if (nameEl) nameEl.value = '';
    if (addrEl) addrEl.value = '';
    if (mobEl) mobEl.value = '';
    if (mob1El) mob1El.value = '';
    if (titleEl) titleEl.innerText = 'Details';

    const drawer = document.getElementById('partyDrawer');
    if (drawer && typeof bootstrap !== 'undefined') {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawer);
      bsOffcanvas.show();
    }
  },

  // Open Drawer in Edit Mode (screencapture-...-23_50_18.png)
  openEditModal(partyId) {
    const party = this.allParties.find(p => p.id === partyId || String(p.sno) === String(partyId)) || this.selectedParty;
    if (!party) return;

    const idEl = document.getElementById('pf-id');
    const gstinEl = document.getElementById('pf-gstin');
    const nameEl = document.getElementById('pf-name');
    const addrEl = document.getElementById('pf-address');
    const mobEl = document.getElementById('pf-mobile');
    const mob1El = document.getElementById('pf-mobile1');
    const titleEl = document.getElementById('partyDrawerLabel');

    if (idEl) idEl.value = party.id || party.sno;
    if (gstinEl) gstinEl.value = party.gstin || '';
    if (nameEl) nameEl.value = party.name || '';
    if (addrEl) addrEl.value = party.address || '';
    if (mobEl) mobEl.value = party.mobile || '';
    if (mob1El) mob1El.value = party.mobile1 || '';
    if (titleEl) titleEl.innerText = 'Details';

    const drawer = document.getElementById('partyDrawer');
    if (drawer && typeof bootstrap !== 'undefined') {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawer);
      bsOffcanvas.show();
    }
  },

  // Save Party (Add or Edit) with Firebase Firestore Persist
  async saveParty() {
    const idEl = document.getElementById('pf-id');
    const gstinEl = document.getElementById('pf-gstin');
    const nameEl = document.getElementById('pf-name');
    const addrEl = document.getElementById('pf-address');
    const mobEl = document.getElementById('pf-mobile');
    const mob1El = document.getElementById('pf-mobile1');

    const id = idEl ? idEl.value.trim() : '';
    const gstin = gstinEl ? gstinEl.value.trim().toUpperCase() : '';
    const name = nameEl ? nameEl.value.trim() : '';
    const address = addrEl ? addrEl.value.trim() : '';
    const mobile = mobEl ? mobEl.value.trim() : '';
    const mobile1 = mob1El ? mob1El.value.trim() : '';

    if (!name) {
      alert('Please enter party name');
      return;
    }
    if (!gstin) {
      alert('Please enter GSTIN');
      return;
    }

    if (id) {
      // 1. UPDATE EXISTING PARTY
      const party = this.allParties.find(p => p.id === id || String(p.sno) === String(id));
      if (party) {
        party.name = name;
        party.gstin = gstin;
        party.address = address;
        party.mobile = mobile;
        party.mobile1 = mobile1;
        party.updatedAt = new Date().toISOString();

        try {
          if (typeof dbService !== 'undefined') {
            if (dbService.update) {
              await dbService.update('parties', party.id, party);
            } else if (dbService.set) {
              await dbService.set('parties', party.id, party);
            }
          }
        } catch (e) {
          console.warn('[PartiesModule] Firestore update offline fallback:', e);
        }

        // If currently on Details view, refresh displayed values
        if (this.activeView === 'details' && this.selectedParty) {
          this.openPartyDetails(party.id);
        }

        if (typeof AppUI !== 'undefined' && AppUI.showToast) {
          AppUI.showToast(`Updated party "${name}" successfully`, 'success');
        }
      }
    } else {
      // 2. CREATE NEW PARTY
      const newParty = {
        id: `PARTY_${String(this.allParties.length + 1).padStart(5, '0')}`,
        sno: this.allParties.length + 1,
        name,
        gstin,
        address,
        mobile,
        mobile1,
        city: '',
        state: '',
        dueAmount: 0.0,
        paidAmount: 0.0,
        createdAt: new Date().toISOString()
      };

      try {
        if (typeof dbService !== 'undefined' && dbService.create) {
          await dbService.create('parties', newParty);
        } else if (typeof dbService !== 'undefined' && dbService.add) {
          await dbService.add('parties', newParty);
        }
      } catch (e) {
        console.warn('[PartiesModule] Firestore add offline fallback:', e);
      }

      this.allParties.unshift(newParty);
      this.selectedParty = newParty;

      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast(`Added new party "${name}" successfully`, 'success');
      }
    }

    // Refresh Filtered List & Tables
    this.filteredParties = [...this.allParties];
    this.renderPartiesTable();
    this.renderFullTable();
    this.updateCountBadge();

    // Close Drawer
    const drawer = document.getElementById('partyDrawer');
    if (drawer && typeof bootstrap !== 'undefined') {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(drawer);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  },

  // Instant Live Search across 3,396 records
  handleSearch(query) {
    this.searchQuery = (query || '').trim();
    const clearBtn = document.getElementById('parties-search-clear');
    if (clearBtn && clearBtn.style) {
      clearBtn.style.display = this.searchQuery ? 'block' : 'none';
    }

    if (!this.searchQuery) {
      this.filteredParties = [...this.allParties];
    } else {
      const q = this.searchQuery.toLowerCase();
      this.filteredParties = this.allParties.filter(p => {
        return (
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.gstin && p.gstin.toLowerCase().includes(q)) ||
          (p.address && p.address.toLowerCase().includes(q)) ||
          (p.city && p.city.toLowerCase().includes(q)) ||
          (p.state && p.state.toLowerCase().includes(q)) ||
          (p.mobile && p.mobile.includes(q)) ||
          (p.mobile1 && p.mobile1.includes(q))
        );
      });
    }

    this.renderPartiesTable();
    this.renderFullTable();
    this.updateCountBadge();
  },

  clearSearch() {
    const input = document.getElementById('parties-search-input');
    if (input) input.value = '';
    this.handleSearch('');
  },

  expandCard(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const isExpanded = card.classList.toggle('is-expanded');
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(isExpanded ? 'Card expanded full width' : 'Card restored to 3-card grid', 'info');
    }
  },

  openCardView(cardType, year = 'ALL') {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Selected ${cardType === 'due' ? 'Party Due' : 'Party Paid'} (${year})`, 'info');
    }
  }
};

// Export for browser & NodeJS testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PartiesModule;
}
