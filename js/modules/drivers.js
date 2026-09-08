/**
 * Drivers Master Module
 * MTC & TTC Logistics Management System
 */

const DriversModule = {
  currentEditId: null,

  async init() {
    AppUI.renderSidebar('drivers');
    await this.loadDrivers();
    await this.populateOwnerDropdown();
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('search-drivers');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterDrivers(e.target.value));
    }

    const driverForm = document.getElementById('driver-form');
    if (driverForm) {
      driverForm.addEventListener('submit', (e) => this.saveDriver(e));
    }
  },

  async populateOwnerDropdown() {
    const owners = await dbService.getAll('truckOwners');
    const select = document.getElementById('driver-owner');
    if (!select) return;

    select.innerHTML = '<option value="">-- Select Linked Owner --</option>' +
      owners.map(o => `<option value="${o.name}">${o.name} (${o.type})</option>`).join('');
  },

  async loadDrivers() {
    const drivers = await dbService.getAll('drivers');
    this.renderTable(drivers);
    this.updateSummary(drivers);
  },

  renderTable(drivers) {
    const tbody = document.getElementById('drivers-tbody');
    if (!tbody) return;

    if (!drivers || drivers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4 text-muted">
            <i class="bi bi-person-vcard fs-3 d-block mb-2"></i>
            No drivers found. Click <strong>+ Add New Driver</strong> to register one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = drivers.map(d => `
      <tr>
        <td>
          <div class="fw-bold text-dark">${d.name}</div>
        </td>
        <td>
          <div><i class="bi bi-telephone text-primary"></i> <a href="tel:${d.mobile}" class="text-decoration-none">${d.mobile || '-'}</a></div>
        </td>
        <td>
          <span class="badge bg-light text-dark border">${d.ownerName || 'Independent / Unassigned'}</span>
        </td>
        <td>
          <span class="font-monospace small text-muted">${d.licenseNo || 'Not Provided'}</span>
        </td>
        <td class="text-center">
          <div class="d-flex justify-content-center gap-1">
            <button class="btn-action" title="Edit Driver" onclick="DriversModule.editDriver('${d.id}')">
              <i class="bi bi-pencil text-primary"></i>
            </button>
            <button class="btn-action" title="Delete Driver" onclick="DriversModule.deleteDriver('${d.id}')">
              <i class="bi bi-trash text-danger"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  updateSummary(drivers) {
    const countEl = document.getElementById('stat-total-drivers');
    if (countEl) countEl.innerText = drivers.length;
  },

  async filterDrivers(query) {
    const q = (query || '').toLowerCase().trim();
    const all = await dbService.getAll('drivers');
    const filtered = all.filter(d =>
      (d.name && d.name.toLowerCase().includes(q)) ||
      (d.mobile && d.mobile.includes(q)) ||
      (d.ownerName && d.ownerName.toLowerCase().includes(q)) ||
      (d.licenseNo && d.licenseNo.toLowerCase().includes(q))
    );
    this.renderTable(filtered);
  },

  openAddModal() {
    this.currentEditId = null;
    document.getElementById('driver-modal-title').innerText = "Register New Driver";
    document.getElementById('driver-form').reset();
    document.getElementById('driver-id').value = "";
    const modal = new bootstrap.Modal(document.getElementById('driverModal'));
    modal.show();
  },

  async editDriver(id) {
    const driver = await dbService.getById('drivers', id);
    if (!driver) return;

    this.currentEditId = id;
    document.getElementById('driver-modal-title').innerText = "Edit Driver Details";
    document.getElementById('driver-id').value = driver.id;
    document.getElementById('driver-name').value = driver.name || "";
    document.getElementById('driver-mobile').value = driver.mobile || "";
    document.getElementById('driver-owner').value = driver.ownerName || "";
    document.getElementById('driver-license').value = driver.licenseNo || "";

    const modal = new bootstrap.Modal(document.getElementById('driverModal'));
    modal.show();
  },

  async saveDriver(e) {
    e.preventDefault();
    const driverData = {
      name: document.getElementById('driver-name').value.trim(),
      mobile: document.getElementById('driver-mobile').value.trim(),
      ownerName: document.getElementById('driver-owner').value.trim(),
      licenseNo: document.getElementById('driver-license').value.trim().toUpperCase()
    };

    if (!driverData.name) {
      AppUI.showToast("Driver Name is required!", "danger");
      return;
    }

    if (this.currentEditId) {
      await dbService.update('drivers', this.currentEditId, driverData);
      AppUI.showToast("Driver updated successfully!", "success");
    } else {
      await dbService.add('drivers', driverData);
      AppUI.showToast("New Driver added successfully!", "success");
    }

    const modalEl = document.getElementById('driverModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    await this.loadDrivers();
  },

  async deleteDriver(id) {
    if (confirm("Are you sure you want to delete this driver?")) {
      await dbService.delete('drivers', id);
      AppUI.showToast("Driver deleted successfully!", "success");
      await this.loadDrivers();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => DriversModule.init());
