/**
 * Parties Master Module (Consignors & Consignees)
 * MTC & TTC Logistics Management System
 */

const PartiesModule = {
  currentEditId: null,

  async init() {
    AppUI.renderSidebar('parties');
    await this.loadParties();
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('search-parties');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterParties(e.target.value));
    }

    const partyForm = document.getElementById('party-form');
    if (partyForm) {
      partyForm.addEventListener('submit', (e) => this.saveParty(e));
    }
  },

  async loadParties() {
    const parties = await dbService.getAll('parties');
    this.renderTable(parties);
    this.updateSummary(parties);
  },

  renderTable(parties) {
    const tbody = document.getElementById('parties-tbody');
    if (!tbody) return;

    if (!parties || parties.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-2"></i>
            No parties found. Click <strong>+ Add New Party</strong> to create one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = parties.map(party => `
      <tr>
        <td>
          <div class="fw-bold text-primary">${party.name}</div>
          <small class="text-muted"><i class="bi bi-geo-alt"></i> ${party.address || 'Address Not Set'}</small>
        </td>
        <td>
          <span class="badge bg-light text-dark font-monospace border">${party.gstin || 'N/A'}</span>
        </td>
        <td>
          <div>${party.contactPerson || '-'}</div>
          <small class="text-muted"><i class="bi bi-telephone"></i> <a href="tel:${party.mobile}" class="text-decoration-none">${party.mobile || '-'}</a></small>
        </td>
        <td class="text-end">
          <span class="text-danger fw-bold">${AppUI.formatCurrency(party.dueAmount || 0)}</span>
        </td>
        <td class="text-end">
          <span class="text-success fw-bold">${AppUI.formatCurrency(party.paidAmount || 0)}</span>
        </td>
        <td class="text-center">
          <div class="d-flex justify-content-center gap-1">
            <button class="btn-action" title="Edit Party" onclick="PartiesModule.editParty('${party.id}')">
              <i class="bi bi-pencil text-primary"></i>
            </button>
            <button class="btn-action" title="Delete Party" onclick="PartiesModule.deleteParty('${party.id}')">
              <i class="bi bi-trash text-danger"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  updateSummary(parties) {
    const totalParties = parties.length;
    const totalDue = parties.reduce((sum, p) => sum + (Number(p.dueAmount) || 0), 0);
    const totalPaid = parties.reduce((sum, p) => sum + (Number(p.paidAmount) || 0), 0);

    const countEl = document.getElementById('stat-total-parties');
    const dueEl = document.getElementById('stat-total-due');
    const paidEl = document.getElementById('stat-total-paid');

    if (countEl) countEl.innerText = totalParties;
    if (dueEl) dueEl.innerText = AppUI.formatCurrency(totalDue);
    if (paidEl) paidEl.innerText = AppUI.formatCurrency(totalPaid);
  },

  async filterParties(query) {
    const q = (query || '').toLowerCase().trim();
    const all = await dbService.getAll('parties');
    const filtered = all.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.gstin && p.gstin.toLowerCase().includes(q)) ||
      (p.mobile && p.mobile.includes(q)) ||
      (p.address && p.address.toLowerCase().includes(q))
    );
    this.renderTable(filtered);
  },

  openAddModal() {
    this.currentEditId = null;
    document.getElementById('party-modal-title').innerText = "Add New Party (Customer)";
    document.getElementById('party-form').reset();
    document.getElementById('party-id').value = "";
    const modal = new bootstrap.Modal(document.getElementById('partyModal'));
    modal.show();
  },

  async editParty(id) {
    const party = await dbService.getById('parties', id);
    if (!party) return;

    this.currentEditId = id;
    document.getElementById('party-modal-title').innerText = "Edit Party Details";
    document.getElementById('party-id').value = party.id;
    document.getElementById('party-name').value = party.name || "";
    document.getElementById('party-gstin').value = party.gstin || "";
    document.getElementById('party-contact').value = party.contactPerson || "";
    document.getElementById('party-mobile').value = party.mobile || "";
    document.getElementById('party-address').value = party.address || "";
    document.getElementById('party-due').value = party.dueAmount || 0;
    document.getElementById('party-paid').value = party.paidAmount || 0;

    const modal = new bootstrap.Modal(document.getElementById('partyModal'));
    modal.show();
  },

  async saveParty(e) {
    e.preventDefault();
    const partyData = {
      name: document.getElementById('party-name').value.trim(),
      gstin: document.getElementById('party-gstin').value.trim().toUpperCase(),
      contactPerson: document.getElementById('party-contact').value.trim(),
      mobile: document.getElementById('party-mobile').value.trim(),
      address: document.getElementById('party-address').value.trim(),
      dueAmount: Number(document.getElementById('party-due').value) || 0,
      paidAmount: Number(document.getElementById('party-paid').value) || 0
    };

    if (!partyData.name) {
      AppUI.showToast("Party Name is required!", "danger");
      return;
    }

    if (this.currentEditId) {
      await dbService.update('parties', this.currentEditId, partyData);
      AppUI.showToast("Party updated successfully!", "success");
    } else {
      await dbService.add('parties', partyData);
      AppUI.showToast("New party added successfully!", "success");
    }

    // Hide modal and refresh
    const modalEl = document.getElementById('partyModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    await this.loadParties();
  },

  async deleteParty(id) {
    if (confirm("Are you sure you want to delete this party?")) {
      await dbService.delete('parties', id);
      AppUI.showToast("Party deleted successfully!", "success");
      await this.loadParties();
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => PartiesModule.init());
