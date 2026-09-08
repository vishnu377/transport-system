/**
 * Financial Ledger & Statements Module
 * Generates Official Statements for Parties & Truck Owners with Print & WhatsApp features
 */

const LedgerModule = {
  allParties: [],
  allOwners: [],
  allTrips: [],
  allPayments: [],
  currentEntity: null,
  currentCategory: 'party',

  async init() {
    AppUI.renderSidebar('ledger');
    await this.loadData();
    this.onCategoryChange();
  },

  async loadData() {
    this.allParties = await dbService.getAll('parties');
    this.allOwners = await dbService.getAll('truckOwners');
    this.allTrips = await dbService.getAll('trips');
    this.allPayments = await dbService.getAll('payments');
  },

  onCategoryChange() {
    const category = document.getElementById('ledger-category')?.value || 'party';
    this.currentCategory = category;
    const label = document.getElementById('ledger-entity-label');
    const select = document.getElementById('ledger-entity');

    if (category === 'party') {
      if (label) label.innerText = "Select Customer / Party *";
      if (select) {
        select.innerHTML = '<option value="">-- Choose Party --</option>' +
          this.allParties.map(p => `<option value="${p.id}">${p.name} (Due: ${AppUI.formatCurrency(p.dueAmount || 0)})</option>`).join('');
      }
    } else {
      if (label) label.innerText = "Select Truck Owner *";
      if (select) {
        select.innerHTML = '<option value="">-- Choose Truck Owner --</option>' +
          this.allOwners.map(o => `<option value="${o.id}">${o.name} (${o.type} - Due: ${AppUI.formatCurrency(o.dueAmount || 0)})</option>`).join('');
      }
    }

    // Auto-select first item if available
    if (select && select.options.length > 1) {
      select.selectedIndex = 1;
      this.generateStatement();
    }
  },

  generateStatement() {
    const entityId = document.getElementById('ledger-entity')?.value;
    const firmFilter = document.getElementById('ledger-firm')?.value || 'ALL';
    const tbody = document.getElementById('stmt-table-body');
    const tfoot = document.getElementById('stmt-table-footer');
    if (!tbody) return;

    if (!entityId) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            Please select an account from the dropdown above.
          </td>
        </tr>
      `;
      return;
    }

    const todayStr = AppUI.formatDate(new Date().toISOString().split('T')[0]);
    document.getElementById('stmt-period').innerText = `Statement As on: ${todayStr}`;

    if (this.currentCategory === 'party') {
      this.renderPartyStatement(entityId, firmFilter);
    } else {
      this.renderOwnerStatement(entityId, firmFilter);
    }
  },

  renderPartyStatement(partyId, firmFilter) {
    const party = this.allParties.find(p => String(p.id) === String(partyId));
    if (!party) return;
    this.currentEntity = party;

    document.getElementById('stmt-name').innerText = party.name;
    document.getElementById('stmt-details').innerHTML = `
      <div><strong>GSTIN:</strong> <span class="font-monospace">${party.gstin || 'N/A'}</span></div>
      <div><strong>Address:</strong> ${party.address || 'Rajasthan'}</div>
      <div><strong>Mobile:</strong> ${party.mobile || 'N/A'} ${party.contactPerson ? `(${party.contactPerson})` : ''}</div>
    `;

    // Gather trips for this party
    let partyTrips = this.allTrips.filter(t => t.consignor === party.name || t.consignee === party.name);
    if (firmFilter !== 'ALL') {
      partyTrips = partyTrips.filter(t => t.transport === firmFilter);
    }

    // Gather payments from this party
    let partyPayments = this.allPayments.filter(p => p.type === 'party' && p.partyName === party.name);
    if (firmFilter !== 'ALL') {
      partyPayments = partyPayments.filter(p => p.firm === firmFilter);
    }

    // Combine into chronological events
    const events = [];
    partyTrips.forEach(t => {
      events.push({
        date: t.tripStartDate || '2026-01-01',
        firm: t.transport,
        ref: t.grNo,
        particulars: `Freight: ${t.truckNo} (${t.origin} to ${t.destination}) - ${t.material}`,
        debit: Number(t.freight) || 0, // Party is billed
        credit: 0
      });
    });

    partyPayments.forEach(p => {
      events.push({
        date: p.date,
        firm: p.firm,
        ref: p.refNo || (p.grNo ? `Against ${p.grNo}` : 'On-Account'),
        particulars: `Payment Received via ${p.mode} ${p.bankAccount ? `(${p.bankAccount})` : ''} ${p.remarks ? `- ${p.remarks}` : ''}`,
        debit: 0,
        credit: Number(p.amount) || 0 // Party paid
      });
    });

    // Sort by date ascending
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    let totalDebit = 0;
    let totalCredit = 0;

    const tbody = document.getElementById('stmt-table-body');
    const tfoot = document.getElementById('stmt-table-footer');

    if (events.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No transactions found for this party.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = events.map(e => {
      totalDebit += e.debit;
      totalCredit += e.credit;
      runningBalance = runningBalance + e.debit - e.credit;

      return `
        <tr>
          <td>${AppUI.formatDate(e.date)}</td>
          <td><span class="badge ${APP_CONFIG.firms[e.firm]?.badgeClass || 'bg-secondary'}">${e.firm}</span></td>
          <td class="font-monospace small fw-bold">${e.ref}</td>
          <td>${e.particulars}</td>
          <td class="text-end fw-semibold text-dark">${e.debit > 0 ? AppUI.formatCurrency(e.debit) : '-'}</td>
          <td class="text-end fw-semibold text-success">${e.credit > 0 ? AppUI.formatCurrency(e.credit) : '-'}</td>
          <td class="text-end fw-bold text-danger">${AppUI.formatCurrency(runningBalance)}</td>
        </tr>
      `;
    }).join('');

    tfoot.innerHTML = `
      <tr>
        <td colspan="4" class="text-end">Total Summary:</td>
        <td class="text-end text-dark">${AppUI.formatCurrency(totalDebit)}</td>
        <td class="text-end text-success">${AppUI.formatCurrency(totalCredit)}</td>
        <td class="text-end text-danger">${AppUI.formatCurrency(runningBalance)}</td>
      </tr>
    `;

    document.getElementById('stmt-total-debit').innerText = AppUI.formatCurrency(totalDebit);
    document.getElementById('stmt-total-credit').innerText = AppUI.formatCurrency(totalCredit);
    document.getElementById('stmt-closing-due').innerText = AppUI.formatCurrency(runningBalance);
  },

  renderOwnerStatement(ownerId, firmFilter) {
    const owner = this.allOwners.find(o => String(o.id) === String(ownerId));
    if (!owner) return;
    this.currentEntity = owner;

    document.getElementById('stmt-name').innerText = `${owner.name} (${owner.type})`;
    document.getElementById('stmt-details').innerHTML = `
      <div><strong>Registered Trucks:</strong> <span class="badge bg-dark-subtle text-dark">${(owner.trucks || []).join(', ') || 'None'}</span></div>
      <div><strong>Mobile:</strong> ${owner.mobile || 'N/A'} ${owner.mobile1 ? `/ ${owner.mobile1}` : ''}</div>
      <div><strong>Type:</strong> ${owner.type} Fleet</div>
    `;

    // Gather trips for this truck owner
    let ownerTrips = this.allTrips.filter(t => t.truckOwner === owner.name);
    if (firmFilter !== 'ALL') {
      ownerTrips = ownerTrips.filter(t => t.transport === firmFilter);
    }

    // Gather payments paid to this owner
    let ownerPayments = this.allPayments.filter(p => p.type === 'owner' && p.ownerName === owner.name);
    if (firmFilter !== 'ALL') {
      ownerPayments = ownerPayments.filter(p => p.firm === firmFilter);
    }

    // Combine into events
    const events = [];
    ownerTrips.forEach(t => {
      const netFreight = (Number(t.freight) || 0) - (Number(t.commission) || 0);
      events.push({
        date: t.tripStartDate || '2026-01-01',
        firm: t.transport,
        ref: t.grNo,
        particulars: `Trip: ${t.truckNo} (${t.origin} to ${t.destination}) - Gross: ${AppUI.formatCurrency(t.freight)} Less Comm: ${AppUI.formatCurrency(t.commission || 0)}`,
        debit: netFreight, // Owner earned
        credit: 0
      });
    });

    ownerPayments.forEach(p => {
      events.push({
        date: p.date,
        firm: p.firm,
        ref: p.refNo || (p.grNo ? `Trip ${p.grNo}` : 'On-Account'),
        particulars: `${p.stage || 'Advance'} Paid via ${p.mode} (${p.truckNo || ''}) ${p.remarks ? `- ${p.remarks}` : ''}`,
        debit: 0,
        credit: Number(p.amount) || 0 // Owner received advance/payout
      });
    });

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    let totalDebit = 0;
    let totalCredit = 0;

    const tbody = document.getElementById('stmt-table-body');
    const tfoot = document.getElementById('stmt-table-footer');

    if (events.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No transactions found for this truck owner.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = events.map(e => {
      totalDebit += e.debit;
      totalCredit += e.credit;
      runningBalance = runningBalance + e.debit - e.credit;

      return `
        <tr>
          <td>${AppUI.formatDate(e.date)}</td>
          <td><span class="badge ${APP_CONFIG.firms[e.firm]?.badgeClass || 'bg-secondary'}">${e.firm}</span></td>
          <td class="font-monospace small fw-bold">${e.ref}</td>
          <td>${e.particulars}</td>
          <td class="text-end fw-semibold text-dark">${e.debit > 0 ? AppUI.formatCurrency(e.debit) : '-'}</td>
          <td class="text-end fw-semibold text-success">${e.credit > 0 ? AppUI.formatCurrency(e.credit) : '-'}</td>
          <td class="text-end fw-bold text-danger">${AppUI.formatCurrency(runningBalance)}</td>
        </tr>
      `;
    }).join('');

    tfoot.innerHTML = `
      <tr>
        <td colspan="4" class="text-end">Total Summary:</td>
        <td class="text-end text-dark">${AppUI.formatCurrency(totalDebit)}</td>
        <td class="text-end text-success">${AppUI.formatCurrency(totalCredit)}</td>
        <td class="text-end text-danger">${AppUI.formatCurrency(runningBalance)}</td>
      </tr>
    `;

    document.getElementById('stmt-total-debit').innerText = AppUI.formatCurrency(totalDebit);
    document.getElementById('stmt-total-credit').innerText = AppUI.formatCurrency(totalCredit);
    document.getElementById('stmt-closing-due').innerText = AppUI.formatCurrency(runningBalance);
  },

  shareWhatsAppStatement() {
    if (!this.currentEntity) {
      AppUI.showToast("Please select an account first!", "danger");
      return;
    }

    const name = this.currentEntity.name;
    const phone = (this.currentEntity.mobile || '').replace(/[^0-9]/g, '');
    const debit = document.getElementById('stmt-total-debit')?.innerText || '₹0.00';
    const credit = document.getElementById('stmt-total-credit')?.innerText || '₹0.00';
    const closingDue = document.getElementById('stmt-closing-due')?.innerText || '₹0.00';
    const dateStr = AppUI.formatDate(new Date().toISOString().split('T')[0]);

    const msg = 
`*MTC & TTC LOGISTICS - ACCOUNT STATEMENT*
Date: ${dateStr}
-------------------------------------
*Account:* ${name}
*Total Billed / Freight:* ${debit}
*Total Paid / Received:* ${credit}
*Net Closing Balance Due:* ${closingDue}
-------------------------------------
_This is an authentic account statement from MTC & TTC Logistics ERP System._`;

    const url = phone ? `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
};

document.addEventListener('DOMContentLoaded', () => LedgerModule.init());
