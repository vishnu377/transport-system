/**
 * Truck Owners Master Module (Own Trucks & Market / Broker Trucks)
 * MTC & TTC Logistics Management System
 */

const OwnersModule = {
  currentEditId: null,

  async init() {
    AppUI.renderSidebar('owners');
    await this.loadOwners();
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('search-owners');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterOwners(e.target.value));
    }

    const ownerForm = document.getElementById('owner-form');
    if (ownerForm) {
      ownerForm.addEventListener('submit', (e) => this.saveOwner(e));
    }
  },

  async loadOwners() {
    const owners = await dbService.getAll('truckOwners');
    this.renderTable(owners);
    this.updateSummary(owners);
  },

  renderTable(owners) {
    const tbody = document.getElementById('owners-tbody');
    if (!tbody) return;

    if (!owners || owners.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            <i class="bi bi-truck fs-3 d-block mb-2"></i>
            No truck owners found. Click <strong>+ Add New Owner</strong> to create one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = owners.map(owner => {
      const trucksList = Array.isArray(owner.trucks) ? owner.trucks : (owner.trucks || '').split(',').map(t => t.trim()).filter(Boolean);
      const truckBadges = trucksList.map(t => `<span class="badge bg-secondary font-monospace me-1">${t}</span>`).join('');
      const typeBadge = owner.type === 'Self' 
        ? `<span class="badge bg-primary">Own Fleet (10 Trucks)</span>` 
        : `<span class="badge bg-light text-dark border">Market Truck</span>`;

      return `
        <tr>
          <td>
            <div class="fw-bold text-dark">${owner.name}</div>
            <div class="mt-1">${typeBadge}</div>
          </td>
          <td>
            <div class="d-flex flex-wrap gap-1">
              ${truckBadges || '<span class="text-muted small">No trucks assigned</span>'}
            </div>
          </td>
          <td>
            <div><i class="bi bi-telephone text-primary"></i> <a href="tel:${owner.mobile}" class="text-decoration-none">${owner.mobile || '-'}</a></div>
            ${owner.mobile1 ? `<small class="text-muted"><i class="bi bi-telephone"></i> ${owner.mobile1}</small>` : ''}
          </td>
          <td class="text-end">
            <span class="text-danger fw-bold fs-6">${AppUI.formatCurrency(owner.dueAmount || 0)}</span>
          </td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn-action" title="Edit Owner" onclick="OwnersModule.editOwner('${owner.id}')">
                <i class="bi bi-pencil text-primary"></i>
              </button>
              <button class="btn-action" title="Delete Owner" onclick="OwnersModule.deleteOwner('${owner.id}')">
                <i class="bi bi-trash text-danger"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  updateSummary(owners) {
    const totalOwners = owners.length;
    const totalTrucks = owners.reduce((acc, o) => {
      const trucks = Array.isArray(o.trucks) ? o.trucks : (o.trucks || '').split(',').filter(Boolean);
      return acc + trucks.length;
    }, 0);
    const totalDue = owners.reduce((sum, o) => sum + (Number(o.dueAmount) || 0), 0);

    const countEl = document.getElementById('stat-total-owners');
    const trucksEl = document.getElementById('stat-total-trucks');
    const dueEl = document.getElementById('stat-owner-due');

    if (countEl) countEl.innerText = totalOwners;
    if (trucksEl) trucksEl.innerText = totalTrucks;
    if (dueEl) dueEl.innerText = AppUI.formatCurrency(totalDue);
  },

  async filterOwners(query) {
    const q = (query || '').toLowerCase().trim();
    const all = await dbService.getAll('truckOwners');
    const filtered = all.filter(o => {
      const trucks = Array.isArray(o.trucks) ? o.trucks.join(' ') : (o.trucks || '');
      return (
        (o.name && o.name.toLowerCase().includes(q)) ||
        trucks.toLowerCase().includes(q) ||
        (o.mobile && o.mobile.includes(q)) ||
        (o.mobile1 && o.mobile1.includes(q))
      );
    });
    this.renderTable(filtered);
  },

  openAddModal() {
    this.currentEditId = null;
    document.getElementById('owner-modal-title').innerText = "Add Truck Owner";
    document.getElementById('owner-form').reset();
    document.getElementById('owner-id').value = "";
    const modal = new bootstrap.Modal(document.getElementById('ownerModal'));
    modal.show();
  },

  async editOwner(id) {
    const owner = await dbService.getById('truckOwners', id);
    if (!owner) return;

    this.currentEditId = id;
    document.getElementById('owner-modal-title').innerText = "Edit Truck Owner";
    document.getElementById('owner-id').value = owner.id;
    document.getElementById('owner-name').value = owner.name || "";
    document.getElementById('owner-type').value = owner.type || "Market";
    document.getElementById('owner-mobile').value = owner.mobile || "";
    document.getElementById('owner-mobile1').value = owner.mobile1 || "";
    document.getElementById('owner-trucks').value = Array.isArray(owner.trucks) ? owner.trucks.join(', ') : (owner.trucks || "");
    document.getElementById('owner-due').value = owner.dueAmount || 0;

    const modal = new bootstrap.Modal(document.getElementById('ownerModal'));
    modal.show();
  },

  async saveOwner(e) {
    e.preventDefault();
    const rawTrucks = document.getElementById('owner-trucks').value.trim();
    const trucksArray = rawTrucks.split(',').map(t => t.trim().toUpperCase()).filter(Boolean);

    const ownerData = {
      name: document.getElementById('owner-name').value.trim(),
      type: document.getElementById('owner-type').value,
      mobile: document.getElementById('owner-mobile').value.trim(),
      mobile1: document.getElementById('owner-mobile1').value.trim(),
      trucks: trucksArray,
      dueAmount: Number(document.getElementById('owner-due').value) || 0
    };

    if (!ownerData.name) {
      AppUI.showToast("Owner Name is required!", "danger");
      return;
    }

    if (this.currentEditId) {
      await dbService.update('truckOwners', this.currentEditId, ownerData);
      AppUI.showToast("Owner updated successfully!", "success");
    } else {
      await dbService.add('truckOwners', ownerData);
      AppUI.showToast("New Truck Owner added successfully!", "success");
    }

    const modalEl = document.getElementById('ownerModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    await this.loadOwners();
  },

  async deleteOwner(id) {
    if (confirm("Are you sure you want to delete this truck owner?")) {
      await dbService.delete('truckOwners', id);
      AppUI.showToast("Truck Owner deleted successfully!", "success");
      await this.loadOwners();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => OwnersModule.init());
