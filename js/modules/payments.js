/**
 * Payments & Settlements Module
 * Handles Party Freight Receipts & Truck Owner Advances / Payouts
 */

const PaymentsModule = {
  allPayments: [],
  allParties: [],
  allOwners: [],
  allTrips: [],

  async init() {
    AppUI.renderSidebar('payments');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  async loadData() {
    this.allPayments = await dbService.getAll('payments');
    this.allParties = await dbService.getAll('parties');
    this.allOwners = await dbService.getAll('truckOwners');
    this.allTrips = await dbService.getAll('trips');
  },

  updateKPIs() {
    const partyReceived = this.allPayments
      .filter(p => p.type === 'party')
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const ownerPaid = this.allPayments
      .filter(p => p.type === 'owner')
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const partyPending = this.allTrips.reduce((sum, t) => sum + (Number(t.partyDue) || 0), 0);
    const ownerPending = this.allTrips.reduce((sum, t) => sum + (Number(t.ownerDue) || 0), 0);

    const elPartyRec = document.getElementById('kpi-party-received');
    const elOwnerPaid = document.getElementById('kpi-owner-paid');
    const elPartyPend = document.getElementById('kpi-party-pending');
    const elOwnerPend = document.getElementById('kpi-owner-pending');

    if (elPartyRec) elPartyRec.innerText = AppUI.formatCurrency(partyReceived);
    if (elOwnerPaid) elOwnerPaid.innerText = AppUI.formatCurrency(ownerPaid);
    if (elPartyPend) elPartyPend.innerText = AppUI.formatCurrency(partyPending);
    if (elOwnerPend) elOwnerPend.innerText = AppUI.formatCurrency(ownerPending);
  },

  renderTables() {
    this.renderPartyPayments();
    this.renderOwnerPayments();
  },

  renderPartyPayments() {
    const tbody = document.getElementById('party-payments-tbody');
    if (!tbody) return;

    const firmFilter = document.getElementById('firm-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('payment-search')?.value || '').toLowerCase().trim();

    const filtered = this.allPayments.filter(p => {
      if (p.type !== 'party') return false;
      if (firmFilter !== 'ALL' && p.firm !== firmFilter) return false;
      if (searchQuery) {
        const text = `${p.partyName} ${p.grNo} ${p.mode} ${p.refNo} ${p.bankAccount} ${p.remarks}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No party receipts found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td><span class="fw-semibold">${AppUI.formatDate(p.date)}</span></td>
        <td><span class="badge ${APP_CONFIG.firms[p.firm]?.badgeClass || 'bg-secondary'}">${p.firm}</span></td>
        <td class="fw-bold text-dark">${p.partyName}</td>
        <td>
          ${p.grNo ? `<span class="badge bg-light text-dark border font-monospace">${p.grNo}</span>` : '<span class="text-muted small">On-Account</span>'}
        </td>
        <td>
          <span class="badge bg-primary-subtle text-primary mb-1">${p.mode}</span>
          ${p.refNo ? `<div class="small text-muted font-monospace">${p.refNo}</div>` : ''}
        </td>
        <td class="small text-secondary">${p.bankAccount || '-'}</td>
        <td class="text-end fw-bold text-success fs-6">${AppUI.formatCurrency(p.amount)}</td>
        <td class="text-center">
          <button class="btn btn-outline-danger btn-sm py-0 px-2" title="Delete Payment" onclick="PaymentsModule.deletePayment('${p.id}', 'party')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderOwnerPayments() {
    const tbody = document.getElementById('owner-payments-tbody');
    if (!tbody) return;

    const firmFilter = document.getElementById('firm-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('payment-search')?.value || '').toLowerCase().trim();

    const filtered = this.allPayments.filter(p => {
      if (p.type !== 'owner') return false;
      if (firmFilter !== 'ALL' && p.firm !== firmFilter) return false;
      if (searchQuery) {
        const text = `${p.ownerName} ${p.truckNo} ${p.grNo} ${p.stage} ${p.mode} ${p.refNo} ${p.remarks}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No truck owner payments found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td><span class="fw-semibold">${AppUI.formatDate(p.date)}</span></td>
        <td><span class="badge ${APP_CONFIG.firms[p.firm]?.badgeClass || 'bg-secondary'}">${p.firm}</span></td>
        <td class="fw-bold text-dark">${p.ownerName}</td>
        <td><span class="badge bg-dark-subtle text-dark">${p.truckNo || '-'}</span></td>
        <td>
          ${p.grNo ? `<span class="badge bg-light text-dark border font-monospace">${p.grNo}</span>` : '<span class="text-muted small">On-Account</span>'}
        </td>
        <td><span class="badge bg-warning-subtle text-warning-emphasis">${p.stage || 'Advance'}</span></td>
        <td>
          <span class="badge bg-info-subtle text-info mb-1">${p.mode}</span>
          ${p.refNo ? `<div class="small text-muted font-monospace">${p.refNo}</div>` : ''}
        </td>
        <td class="text-end fw-bold text-danger fs-6">${AppUI.formatCurrency(p.amount)}</td>
        <td class="text-center">
          <button class="btn btn-outline-danger btn-sm py-0 px-2" title="Delete Payment" onclick="PaymentsModule.deletePayment('${p.id}', 'owner')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  applyFilters() {
    this.renderTables();
  },

  // Open Party Modal
  openPartyPaymentModal() {
    const form = document.getElementById('form-party-payment');
    if (form) form.reset();

    const dateInput = document.getElementById('pp-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    // Populate party dropdown
    const partySelect = document.getElementById('pp-party');
    if (partySelect) {
      partySelect.innerHTML = '<option value="">-- Select Party --</option>' + 
        this.allParties.map(p => `<option value="${p.name}">${p.name} (Due: ${AppUI.formatCurrency(p.dueAmount || 0)})</option>`).join('');
    }

    this.onPartyChange();

    const modal = new bootstrap.Modal(document.getElementById('modalPartyPayment'));
    modal.show();
  },

  onPartyChange() {
    const selectedParty = document.getElementById('pp-party')?.value;
    const tripSelect = document.getElementById('pp-trip');
    if (!tripSelect) return;

    if (!selectedParty) {
      tripSelect.innerHTML = '<option value="">Direct On-Account (No single GR)</option>';
      return;
    }

    const partyTrips = this.allTrips.filter(t => t.consignor === selectedParty || t.consignee === selectedParty);
    let options = '<option value="">Direct On-Account (No single GR)</option>';
    partyTrips.forEach(t => {
      options += `<option value="${t.grNo}">GR: ${t.grNo} (${t.truckNo} - Due: ${AppUI.formatCurrency(t.partyDue || 0)})</option>`;
    });
    tripSelect.innerHTML = options;
  },

  onTripChange() {
    const selectedGr = document.getElementById('pp-trip')?.value;
    const amountInput = document.getElementById('pp-amount');
    if (selectedGr && amountInput) {
      const trip = this.allTrips.find(t => t.grNo === selectedGr);
      if (trip && trip.partyDue > 0) {
        amountInput.value = trip.partyDue;
      }
    }
  },

  async savePartyPayment(e) {
    e.preventDefault();
    const amount = Number(document.getElementById('pp-amount').value) || 0;
    const partyName = document.getElementById('pp-party').value;
    const grNo = document.getElementById('pp-trip').value;
    const firm = document.getElementById('pp-firm').value;
    const date = document.getElementById('pp-date').value;
    const mode = document.getElementById('pp-mode').value;
    const refNo = document.getElementById('pp-ref-no').value.trim();
    const bankAccount = document.getElementById('pp-bank-acc').value;
    const remarks = document.getElementById('pp-remarks').value.trim();

    const paymentData = {
      type: "party",
      date,
      firm,
      partyName,
      grNo,
      amount,
      mode,
      refNo,
      bankAccount,
      remarks
    };

    // Save payment
    await dbService.add('payments', paymentData);

    // If linked to trip, update trip partyDue & partyPaid
    if (grNo) {
      const trip = this.allTrips.find(t => t.grNo === grNo);
      if (trip) {
        const newPartyPaid = (Number(trip.partyPaid) || 0) + amount;
        const newPartyDue = Math.max(0, (Number(trip.partyDue) || 0) - amount);
        const newStatus = (newPartyDue === 0 && trip.ownerDue === 0) ? 'Settled' : trip.status;
        await dbService.update('trips', trip.id, {
          partyPaid: newPartyPaid,
          partyDue: newPartyDue,
          status: newStatus
        });
      }
    }

    // Update Party Master
    const party = this.allParties.find(p => p.name === partyName);
    if (party) {
      const newDue = Math.max(0, (Number(party.dueAmount) || 0) - amount);
      const newPaid = (Number(party.paidAmount) || 0) + amount;
      await dbService.update('parties', party.id, {
        dueAmount: newDue,
        paidAmount: newPaid
      });
    }

    const modalEl = document.getElementById('modalPartyPayment');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Party receipt of ${AppUI.formatCurrency(amount)} saved successfully!`, 'success');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  // Open Owner Modal
  openOwnerPaymentModal() {
    const form = document.getElementById('form-owner-payment');
    if (form) form.reset();

    const dateInput = document.getElementById('op-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    // Populate owners dropdown
    const ownerSelect = document.getElementById('op-owner');
    if (ownerSelect) {
      ownerSelect.innerHTML = '<option value="">-- Select Truck Owner --</option>' + 
        this.allOwners.map(o => `<option value="${o.name}">${o.name} (${o.type})</option>`).join('');
    }

    this.onOwnerChange();

    const modal = new bootstrap.Modal(document.getElementById('modalOwnerPayment'));
    modal.show();
  },

  onOwnerChange() {
    const selectedOwner = document.getElementById('op-owner')?.value;
    const truckSelect = document.getElementById('op-truck');
    const tripSelect = document.getElementById('op-trip');
    if (!truckSelect || !tripSelect) return;

    if (!selectedOwner) {
      truckSelect.innerHTML = '<option value="">-- Select Truck --</option>';
      tripSelect.innerHTML = '<option value="">On-Account (No single GR)</option>';
      return;
    }

    const owner = this.allOwners.find(o => o.name === selectedOwner);
    if (owner && owner.trucks && owner.trucks.length > 0) {
      truckSelect.innerHTML = '<option value="">-- Select Truck --</option>' +
        owner.trucks.map(t => `<option value="${t}">${t}</option>`).join('');
    } else {
      truckSelect.innerHTML = '<option value="">-- No trucks registered --</option>';
    }

    // Populate trips for this owner
    const ownerTrips = this.allTrips.filter(t => t.truckOwner === selectedOwner);
    let options = '<option value="">On-Account (No single GR)</option>';
    ownerTrips.forEach(t => {
      options += `<option value="${t.grNo}">GR: ${t.grNo} (${t.truckNo} - Balance Due: ${AppUI.formatCurrency(t.ownerDue || 0)})</option>`;
    });
    tripSelect.innerHTML = options;
  },

  async saveOwnerPayment(e) {
    e.preventDefault();
    const amount = Number(document.getElementById('op-amount').value) || 0;
    const ownerName = document.getElementById('op-owner').value;
    const truckNo = document.getElementById('op-truck').value;
    const grNo = document.getElementById('op-trip').value;
    const stage = document.getElementById('op-stage').value;
    const firm = document.getElementById('op-firm').value;
    const date = document.getElementById('op-date').value;
    const mode = document.getElementById('op-mode').value;
    const refNo = document.getElementById('op-voucher').value.trim();
    const remarks = document.getElementById('op-remarks').value.trim();

    const paymentData = {
      type: "owner",
      date,
      firm,
      ownerName,
      truckNo,
      grNo,
      stage,
      amount,
      mode,
      refNo,
      remarks
    };

    // Save payment
    await dbService.add('payments', paymentData);

    // If linked to trip, update trip ownerDue
    if (grNo) {
      const trip = this.allTrips.find(t => t.grNo === grNo);
      if (trip) {
        const newOwnerDue = Math.max(0, (Number(trip.ownerDue) || 0) - amount);
        const newStatus = (newOwnerDue === 0 && trip.partyDue === 0) ? 'Settled' : trip.status;
        await dbService.update('trips', trip.id, {
          ownerDue: newOwnerDue,
          status: newStatus
        });
      }
    }

    // Update Owner Master Due
    const owner = this.allOwners.find(o => o.name === ownerName);
    if (owner) {
      const newDue = Math.max(0, (Number(owner.dueAmount) || 0) - amount);
      await dbService.update('truckOwners', owner.id, {
        dueAmount: newDue
      });
    }

    const modalEl = document.getElementById('modalOwnerPayment');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Owner payment of ${AppUI.formatCurrency(amount)} recorded successfully!`, 'success');
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  },

  async deletePayment(id, type) {
    if (!confirm("Are you sure you want to delete this payment record?")) return;
    await dbService.delete('payments', id);
    AppUI.showToast("Payment record deleted", "info");
    await this.loadData();
    this.renderTables();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => PaymentsModule.init());
