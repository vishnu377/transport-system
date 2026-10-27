/**
 * Truck Owners Master Directory Module - MTC & TTC Logistics
 * Matches Google AppSheet Authentic 3-Card Layout (screencapture-appsheet-start-...-18_55_06.png)
 * Total 595 Trucks & Owners (Header: 'Truck No. Number 595')
 */

const OwnersModule = {
  allOwners: [],
  searchQuery: '',
  expandedCardId: null,

  async init() {
    if (typeof AppUI !== 'undefined' && AppUI.renderSidebar) {
      AppUI.renderSidebar('owners');
    }
    await this.loadData();
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

    // Default fallback if database empty
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

    // Smooth rendering for all rows (progressive chunk or full list)
    let html = '';
    const displayList = filtered.slice(0, 300); // render first 300 for snappy performance

    displayList.forEach(o => {
      const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
      const safeId = String(o.id || o.truckNo);

      html += `
        <tr class="appsheet-row" onclick="OwnersModule.openDetailView('${safeId}')">
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

    // Render remaining rows in background if dataset > 300
    if (filtered.length > 300) {
      setTimeout(() => {
        let remainingHtml = '';
        for (let i = 300; i < filtered.length; i++) {
          const o = filtered[i];
          const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));
          const safeId = String(o.id || o.truckNo);
          remainingHtml += `
            <tr class="appsheet-row" onclick="OwnersModule.openDetailView('${safeId}')">
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

  openDetailView(ownerId) {
    const o = this.allOwners.find(item => String(item.id) === String(ownerId) || String(item.truckNo) === String(ownerId));
    if (!o) return;

    const modalBody = document.getElementById('owner-detail-body');
    const modalFooter = document.getElementById('owner-detail-footer');

    const isSelf = o.type === 'Self' || (o.name && o.name.includes('MTC Fleet'));

    modalBody.innerHTML = `
      <!-- AppSheet Authentic Vertical Layout (Matching 19_04_54_crop.png) -->
      <div class="d-flex flex-column gap-3">
        <div class="border-bottom pb-2">
          <div class="text-muted small fw-semibold">Truck No.</div>
          <div class="fs-4 fw-bold font-monospace text-dark mt-1">${o.truckNo}</div>
        </div>

        <div class="border-bottom pb-2">
          <div class="text-muted small fw-semibold">Name</div>
          <div class="fs-5 fw-semibold text-dark mt-1">${o.name || '-'}</div>
        </div>

        <div class="border-bottom pb-2">
          <div class="text-muted small fw-semibold">Mobile No.</div>
          <div class="font-monospace fs-6 mt-1">
            ${o.mobile ? `<a href="tel:${o.mobile}" class="text-dark text-decoration-none"><i class="bi bi-telephone text-primary me-2"></i>${o.mobile}</a>` : '<span class="text-muted">-</span>'}
          </div>
        </div>

        ${o.mobile1 ? `
        <div class="border-bottom pb-2">
          <div class="text-muted small fw-semibold">Mobile No. 1</div>
          <div class="font-monospace fs-6 mt-1">
            <a href="https://wa.me/91${o.mobile1}" target="_blank" class="text-dark text-decoration-none"><i class="bi bi-whatsapp text-success me-2"></i>${o.mobile1}</a>
          </div>
        </div>
        ` : ''}

        <div class="pt-1">
          <div class="text-muted small fw-semibold">Fleet Type</div>
          <div class="mt-1">
            ${isSelf ? '<span class="badge bg-warning text-dark"><i class="bi bi-star-fill me-1"></i> Own Fleet (10 Trucks)</span>' : '<span class="badge bg-light text-dark border">Market Attached Truck</span>'}
          </div>
        </div>
      </div>
    `;

    modalFooter.innerHTML = `
      <div>
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="OwnersModule.deleteOwner('${o.id}')" title="Delete Truck Owner">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-sm btn-dark" onclick="bootstrap.Modal.getInstance(document.getElementById('modalOwnerDetail')).hide(); OwnersModule.openEditDrawer('${o.id}')">
          <i class="bi bi-pencil me-1"></i> Edit
        </button>
      </div>
    `;

    const modalEl = document.getElementById('modalOwnerDetail');
    if (modalEl && typeof bootstrap !== 'undefined') {
      new bootstrap.Modal(modalEl).show();
    }
  },

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
      alert("Please fill all required fields: Truck No., Name, and Mobile No.");
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
        // Local in-memory update
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

    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Saved truck owner ${truckNo} (${name})`, 'success');
    }
  },

  async deleteOwner(ownerId) {
    if (!confirm("Are you sure you want to delete this truck owner?")) return;

    try {
      if (typeof dbService !== 'undefined') {
        await dbService.delete('truckOwners', ownerId);
      } else {
        this.allOwners = this.allOwners.filter(o => String(o.id) !== String(ownerId));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }

    const modalEl = document.getElementById('modalOwnerDetail');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    }

    await this.loadData();
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast("Truck owner deleted successfully.", 'info');
    }
  },

  toggleCardExpand(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const icon = card.querySelector('.expand-toggle-icon');
    const isCurrentlyExpanded = card.classList.contains('is-expanded');

    // Collapse all first
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
      this.expandedCardId = cardId;
    } else {
      this.expandedCardId = null;
    }
  },

  filterByDueYear(year) {
    console.log("Selected Owner Due Year:", year);
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast(`Owner Due Year: ${year}`, 'info');
    }
  },

  filterByPaidYear(year) {
    console.log("Selected Owner Paid Year:", year);
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
