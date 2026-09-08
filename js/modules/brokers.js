/**
 * Brokers / Dallal Master Module
 * MTC & TTC Logistics Management System
 */

const BrokersModule = {
  currentEditId: null,

  async init() {
    AppUI.renderSidebar('brokers');
    await this.loadBrokers();
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('search-brokers');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterBrokers(e.target.value));
    }

    const brokerForm = document.getElementById('broker-form');
    if (brokerForm) {
      brokerForm.addEventListener('submit', (e) => this.saveBroker(e));
    }
  },

  async loadBrokers() {
    const brokers = await dbService.getAll('brokers');
    this.renderTable(brokers);
    this.updateSummary(brokers);
  },

  renderTable(brokers) {
    const tbody = document.getElementById('brokers-tbody');
    if (!tbody) return;

    if (!brokers || brokers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4 text-muted">
            <i class="bi bi-people fs-3 d-block mb-2"></i>
            No brokers found. Click <strong>+ Add New Broker</strong> to add one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = brokers.map(b => `
      <tr>
        <td>
          <div class="fw-bold text-dark">${b.name}</div>
          <small class="text-muted"><i class="bi bi-geo-alt"></i> ${b.location || 'Location Not Set'}</small>
        </td>
        <td>
          <div><i class="bi bi-telephone text-primary"></i> <a href="tel:${b.mobile}" class="text-decoration-none">${b.mobile || '-'}</a></div>
          ${b.mobile1 ? `<small class="text-muted"><i class="bi bi-telephone"></i> ${b.mobile1}</small>` : ''}
        </td>
        <td>
          <span class="badge bg-light text-primary border">${b.commissionRate || '₹2,000 / Trip'}</span>
        </td>
        <td class="text-center">
          <div class="d-flex justify-content-center gap-1">
            <button class="btn-action" title="Edit Broker" onclick="BrokersModule.editBroker('${b.id}')">
              <i class="bi bi-pencil text-primary"></i>
            </button>
            <button class="btn-action" title="Delete Broker" onclick="BrokersModule.deleteBroker('${b.id}')">
              <i class="bi bi-trash text-danger"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  updateSummary(brokers) {
    const countEl = document.getElementById('stat-total-brokers');
    if (countEl) countEl.innerText = brokers.length;
  },

  async filterBrokers(query) {
    const q = (query || '').toLowerCase().trim();
    const all = await dbService.getAll('brokers');
    const filtered = all.filter(b =>
      (b.name && b.name.toLowerCase().includes(q)) ||
      (b.mobile && b.mobile.includes(q)) ||
      (b.location && b.location.toLowerCase().includes(q))
    );
    this.renderTable(filtered);
  },

  openAddModal() {
    this.currentEditId = null;
    document.getElementById('broker-modal-title').innerText = "Add Broker / Dallal";
    document.getElementById('broker-form').reset();
    document.getElementById('broker-id').value = "";
    const modal = new bootstrap.Modal(document.getElementById('brokerModal'));
    modal.show();
  },

  async editBroker(id) {
    const broker = await dbService.getById('brokers', id);
    if (!broker) return;

    this.currentEditId = id;
    document.getElementById('broker-modal-title').innerText = "Edit Broker Details";
    document.getElementById('broker-id').value = broker.id;
    document.getElementById('broker-name').value = broker.name || "";
    document.getElementById('broker-location').value = broker.location || "";
    document.getElementById('broker-mobile').value = broker.mobile || "";
    document.getElementById('broker-mobile1').value = broker.mobile1 || "";
    document.getElementById('broker-commission').value = broker.commissionRate || "";

    const modal = new bootstrap.Modal(document.getElementById('brokerModal'));
    modal.show();
  },

  async saveBroker(e) {
    e.preventDefault();
    const brokerData = {
      name: document.getElementById('broker-name').value.trim(),
      location: document.getElementById('broker-location').value.trim(),
      mobile: document.getElementById('broker-mobile').value.trim(),
      mobile1: document.getElementById('broker-mobile1').value.trim(),
      commissionRate: document.getElementById('broker-commission').value.trim()
    };

    if (!brokerData.name) {
      AppUI.showToast("Broker Name is required!", "danger");
      return;
    }

    if (this.currentEditId) {
      await dbService.update('brokers', this.currentEditId, brokerData);
      AppUI.showToast("Broker updated successfully!", "success");
    } else {
      await dbService.add('brokers', brokerData);
      AppUI.showToast("New Broker added successfully!", "success");
    }

    const modalEl = document.getElementById('brokerModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    await this.loadBrokers();
  },

  async deleteBroker(id) {
    if (confirm("Are you sure you want to delete this broker?")) {
      await dbService.delete('brokers', id);
      AppUI.showToast("Broker deleted successfully!", "success");
      await this.loadBrokers();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => BrokersModule.init());
