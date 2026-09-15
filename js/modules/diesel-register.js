/**
 * Diesel Pump Register Module
 * Manages fuel slips, pump settlements & owner diesel advances
 */

const DieselModule = {
  allSlips: [],
  allTrips: [],
  allOwners: [],
  currentStatusFilter: 'ALL',

  async init() {
    AppUI.renderSidebar('diesel');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allSlips = await dbService.getAll('dieselSlips');
    this.allTrips = await dbService.getAll('trips');
    this.allOwners = await dbService.getAll('truckOwners');
  },

  updateKPIs() {
    let totalLiters = 0;
    let totalAmount = 0;
    let unsettledAmount = 0;
    let settledAmount = 0;

    this.allSlips.forEach(s => {
      const liters = Number(s.liters) || 0;
      const amount = Number(s.amount) || 0;

      totalLiters += liters;
      totalAmount += amount;

      if (s.status === 'Settled') {
        settledAmount += amount;
      } else {
        unsettledAmount += amount;
      }
    });

    const elLiters = document.getElementById('kpi-diesel-liters');
    const elAmount = document.getElementById('kpi-diesel-amount');
    const elUnsettled = document.getElementById('kpi-diesel-unsettled');
    const elSettled = document.getElementById('kpi-diesel-settled');

    if (elLiters) elLiters.innerText = `${totalLiters.toFixed(1)} Ltr`;
    if (elAmount) elAmount.innerText = AppUI.formatCurrency(totalAmount);
    if (elUnsettled) elUnsettled.innerText = AppUI.formatCurrency(unsettledAmount);
    if (elSettled) elSettled.innerText = AppUI.formatCurrency(settledAmount);
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    if (btnElement) {
      document.querySelectorAll('#dieselTabs .nav-link').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('diesel-tbody');
    if (!tbody) return;

    const pumpFilter = document.getElementById('pump-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('diesel-search')?.value || '').toLowerCase().trim();

    const filtered = this.allSlips.filter(s => {
      if (this.currentStatusFilter !== 'ALL' && s.status !== this.currentStatusFilter) return false;
      if (pumpFilter !== 'ALL' && !s.pumpName.includes(pumpFilter)) return false;
      if (searchQuery) {
        const text = `${s.slipNo} ${s.truckNo} ${s.driver} ${s.pumpName} ${s.tripGrNo} ${s.remarks}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No diesel slips found for the selected filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(s => {
      const isSettled = s.status === 'Settled';

      return `
        <tr>
          <td class="font-monospace fw-bold text-primary">${s.slipNo}</td>
          <td><span class="fw-semibold">${AppUI.formatDate(s.date)}</span></td>
          <td class="small fw-semibold text-secondary">${s.pumpName}</td>
          <td><span class="badge ${APP_CONFIG.firms[s.firm]?.badgeClass || 'bg-secondary'}">${s.firm}</span></td>
          <td>
            <div class="fw-bold font-monospace">${s.truckNo}</div>
            <small class="text-muted">${s.ownerName || '-'}</small>
          </td>
          <td>${s.driver || '-'}</td>
          <td>
            ${s.tripGrNo ? `<span class="badge bg-light text-dark border font-monospace">${s.tripGrNo}</span>` : '<span class="text-muted small">General</span>'}
          </td>
          <td class="text-center">
            <div class="fw-bold">${s.liters} Ltr</div>
            <small class="text-muted">@ ₹${s.rate}/L</small>
          </td>
          <td class="text-end fw-bold text-danger fs-6">${AppUI.formatCurrency(s.amount)}</td>
          <td>
            <span class="badge ${isSettled ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
              ${isSettled ? 'Settled with Pump' : 'Unsettled (Due)'}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              ${!isSettled ? `
                <button class="btn btn-outline-success py-0 px-2" title="Mark Settled (Paid to Pump)" onclick="DieselModule.quickSettle('${s.id}')">
                  <i class="bi bi-check-lg"></i> Clear
                </button>
              ` : ''}
              <button class="btn btn-outline-danger py-0 px-2" title="Delete Slip" onclick="DieselModule.deleteSlip('${s.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openIssueSlipModal() {
    const form = document.getElementById('form-issue-slip');
    if (form) form.reset();

    const dateInput = document.getElementById('dsl-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    const count = (this.allSlips.length + 1).toString().padStart(4, '0');
    const slipInput = document.getElementById('dsl-number');
    if (slipInput) slipInput.value = `DSL-SHP-${count}`;

    document.getElementById('dsl-rate').value = "90.50";
    document.getElementById('dsl-total').value = "₹0.00";

    const modal = new bootstrap.Modal(document.getElementById('modalIssueSlip'));
    modal.show();
  },

  calcTotal() {
    const liters = Number(document.getElementById('dsl-liters')?.value) || 0;
    const rate = Number(document.getElementById('dsl-rate')?.value) || 0;
    const totalEl = document.getElementById('dsl-total');
    if (totalEl) {
      totalEl.value = AppUI.formatCurrency(liters * rate);
    }
  },

  autoFillTrip() {
    const truckNo = (document.getElementById('dsl-truck')?.value || '').trim().toUpperCase();
    if (!truckNo) return;

    // Find active trip for this truck
    const activeTrip = this.allTrips.find(t => t.truckNo.toUpperCase() === truckNo && t.status !== 'Settled');
    const tripSelect = document.getElementById('dsl-trip');
    const driverInput = document.getElementById('dsl-driver');

    if (activeTrip) {
      if (tripSelect) {
        tripSelect.innerHTML = `<option value="${activeTrip.grNo}">GR: ${activeTrip.grNo} (${activeTrip.origin} ➔ ${activeTrip.destination})</option><option value="">-- No specific GR --</option>`;
      }
      if (driverInput && !driverInput.value) {
        driverInput.value = activeTrip.driver || '';
      }
    } else {
      if (tripSelect) {
        tripSelect.innerHTML = '<option value="">-- No specific GR (General Fleet Advance) --</option>';
      }
    }
  },

  async quickSettle(id) {
    const slip = this.allSlips.find(s => String(s.id) === String(id));
    if (!slip) return;

    await dbService.update('dieselSlips', slip.id, {
      status: 'Settled',
      settledDate: new Date().toISOString().split('T')[0]
    });

    AppUI.showToast(`Fuel Slip ${slip.slipNo} marked as settled with petrol pump!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async saveSlip(e) {
    e.preventDefault();
    const date = document.getElementById('dsl-date').value;
    const slipNo = document.getElementById('dsl-number').value.trim();
    const firm = document.getElementById('dsl-firm').value;
    const pumpName = document.getElementById('dsl-pump').value;
    const truckNo = document.getElementById('dsl-truck').value.trim().toUpperCase();
    const driver = document.getElementById('dsl-driver').value.trim();
    const tripGrNo = document.getElementById('dsl-trip').value;
    const liters = Number(document.getElementById('dsl-liters').value) || 0;
    const rate = Number(document.getElementById('dsl-rate').value) || 0;
    const amount = liters * rate;
    const autoAdvance = document.getElementById('dsl-auto-advance').checked;
    const remarks = document.getElementById('dsl-remarks').value.trim();

    // Identify Owner
    let ownerName = '';
    const matchedOwner = this.allOwners.find(o => (o.trucks || []).some(t => t.toUpperCase() === truckNo));
    if (matchedOwner) {
      ownerName = matchedOwner.name;
    } else {
      const matchedTrip = this.allTrips.find(t => t.truckNo.toUpperCase() === truckNo);
      if (matchedTrip) ownerName = matchedTrip.truckOwner;
    }

    const slipData = {
      slipNo,
      date,
      pumpName,
      firm,
      truckNo,
      driver,
      ownerName,
      tripGrNo,
      liters,
      rate,
      amount,
      status: "Unsettled",
      remarks
    };

    await dbService.add('dieselSlips', slipData);

    // If auto-advance, record in payments and deduct from owner
    if (autoAdvance && amount > 0) {
      const paymentData = {
        type: "owner",
        date,
        firm,
        ownerName: ownerName || truckNo,
        truckNo,
        grNo: tripGrNo,
        stage: "Diesel Advance",
        amount,
        mode: "Diesel Slip",
        refNo: slipNo,
        remarks: `${liters} Liters Diesel issued at ${pumpName}`
      };
      await dbService.add('payments', paymentData);

      // Deduct from trip if linked
      if (tripGrNo) {
        const trip = this.allTrips.find(t => t.grNo === tripGrNo);
        if (trip) {
          const newOwnerDue = Math.max(0, (Number(trip.ownerDue) || 0) - amount);
          await dbService.update('trips', trip.id, { ownerDue: newOwnerDue });
        }
      }

      // Deduct from Owner Master
      if (matchedOwner) {
        const newDue = Math.max(0, (Number(matchedOwner.dueAmount) || 0) - amount);
        await dbService.update('truckOwners', matchedOwner.id, { dueAmount: newDue });
      }
    }

    const modalEl = document.getElementById('modalIssueSlip');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Fuel Slip ${slipNo} for ${AppUI.formatCurrency(amount)} issued!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async deleteSlip(id) {
    if (!confirm("Are you sure you want to delete this diesel fuel slip?")) return;
    await dbService.delete('dieselSlips', id);
    AppUI.showToast("Fuel slip deleted", "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => DieselModule.init());
