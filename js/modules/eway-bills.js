/**
 * E-Way Bills & Validity Countdown Tracker Module
 */

const EwayModule = {
  allEwbs: [],
  allTrips: [],
  currentStatusFilter: 'ALL',

  async init() {
    AppUI.renderSidebar('eway');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allEwbs = await dbService.getAll('ewayBills');
    this.allTrips = await dbService.getAll('trips');
  },

  calculateRemainingTime(validUntilStr) {
    if (!validUntilStr) return { hours: 0, minutes: 0, isExpired: true, text: 'No Expiry Set' };

    const validTime = new Date(validUntilStr).getTime();
    const now = new Date().getTime();
    const diffMs = validTime - now;

    if (diffMs <= 0) {
      const overdueHours = Math.abs(Math.floor(diffMs / (1000 * 60 * 60)));
      return { hours: overdueHours, minutes: 0, isExpired: true, text: `EXPIRED (-${overdueHours}h)` };
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return {
      hours,
      minutes: mins,
      isExpired: false,
      text: `${hours}h ${mins}m left`
    };
  },

  updateKPIs() {
    let activeCount = 0;
    let expiringCount = 0;
    let expiredCount = 0;
    let completedCount = 0;

    this.allEwbs.forEach(e => {
      if (e.status === 'Completed') {
        completedCount++;
        return;
      }

      const rem = this.calculateRemainingTime(e.validUntil);
      if (rem.isExpired) {
        expiredCount++;
      } else if (rem.hours <= 24) {
        expiringCount++;
      } else {
        activeCount++;
      }
    });

    const elActive = document.getElementById('kpi-ewb-active');
    const elExpiring = document.getElementById('kpi-ewb-expiring');
    const elExpired = document.getElementById('kpi-ewb-expired');
    const elCompleted = document.getElementById('kpi-ewb-completed');

    if (elActive) elActive.innerText = activeCount;
    if (elExpiring) elExpiring.innerText = expiringCount;
    if (elExpired) elExpired.innerText = expiredCount;
    if (elCompleted) elCompleted.innerText = completedCount;
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    if (btnElement) {
      document.querySelectorAll('#ewbTabs .nav-link').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('ewb-tbody');
    if (!tbody) return;

    const firmFilter = document.getElementById('firm-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('ewb-search')?.value || '').toLowerCase().trim();

    const filtered = this.allEwbs.filter(e => {
      const rem = this.calculateRemainingTime(e.validUntil);
      let calculatedStatus = e.status;
      if (e.status !== 'Completed') {
        if (rem.isExpired) calculatedStatus = 'Expired';
        else if (rem.hours <= 24) calculatedStatus = 'Expiring Soon';
        else calculatedStatus = 'Active';
      }

      if (this.currentStatusFilter !== 'ALL' && calculatedStatus !== this.currentStatusFilter) return false;
      if (firmFilter !== 'ALL' && e.firm !== firmFilter) return false;
      if (searchQuery) {
        const text = `${e.ewbNo} ${e.truckNo} ${e.grNo} ${e.driver} ${e.driverMobile} ${e.origin} ${e.destination}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No E-Way bills found for the selected filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(e => {
      const rem = this.calculateRemainingTime(e.validUntil);
      let badgeHtml = '';
      let rowClass = '';

      if (e.status === 'Completed') {
        badgeHtml = '<span class="badge bg-success-subtle text-success"><i class="bi bi-check2-circle me-1"></i>Completed</span>';
      } else if (rem.isExpired) {
        badgeHtml = '<span class="badge bg-danger text-white"><i class="bi bi-exclamation-octagon-fill me-1"></i>EXPIRED</span>';
        rowClass = 'table-danger';
      } else if (rem.hours <= 24) {
        badgeHtml = '<span class="badge bg-warning text-dark"><i class="bi bi-alarm-fill me-1"></i>Expiring Soon</span>';
        rowClass = 'table-warning';
      } else {
        badgeHtml = '<span class="badge bg-success-subtle text-success"><i class="bi bi-shield-check me-1"></i>Active</span>';
      }

      const formattedValidUntil = e.validUntil ? new Date(e.validUntil).toLocaleString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }) : '-';

      return `
        <tr class="${rowClass}">
          <td class="font-monospace fw-bold text-primary fs-6">${e.ewbNo}</td>
          <td><span class="badge ${APP_CONFIG.firms[e.firm]?.badgeClass || 'bg-secondary'}">${e.firm || 'TTC'}</span></td>
          <td><span class="badge bg-light text-dark border font-monospace">${e.grNo || 'No GR'}</span></td>
          <td>
            <div class="fw-bold font-monospace">${e.truckNo}</div>
            <small class="text-muted">${e.driver || '-'} (${e.driverMobile || 'No Phone'})</small>
          </td>
          <td>
            <div class="small fw-semibold text-dark">${e.origin} ➔ ${e.destination}</div>
            <small class="text-muted">${e.distanceKm ? `${e.distanceKm} Km` : ''}</small>
          </td>
          <td class="small fw-bold">${formattedValidUntil}</td>
          <td class="text-center font-monospace fw-bold">
            ${e.status === 'Completed' ? '<span class="text-muted">-</span>' : (
              rem.isExpired ? `<span class="text-danger">${rem.text}</span>` : `<span class="text-primary">${rem.text}</span>`
            )}
          </td>
          <td>${badgeHtml}</td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success py-0 px-2" title="WhatsApp Alert to Driver" onclick="EwayModule.sendDriverAlert('${e.id}')">
                <i class="bi bi-whatsapp"></i> Alert
              </button>
              ${e.status !== 'Completed' ? `
                <button class="btn btn-outline-primary py-0 px-2" title="Extend Validity (+24h)" onclick="EwayModule.extendValidity('${e.id}')">
                  <i class="bi bi-arrow-clockwise"></i> Extend
                </button>
                <button class="btn btn-outline-secondary py-0 px-2" title="Mark Completed" onclick="EwayModule.markCompleted('${e.id}')">
                  <i class="bi bi-check2"></i>
                </button>
              ` : ''}
              <button class="btn btn-outline-danger py-0 px-2" title="Delete EWB" onclick="EwayModule.deleteEwb('${e.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openAddEwayModal() {
    const form = document.getElementById('form-add-ewb');
    if (form) form.reset();

    const now = new Date();
    const in72Hours = new Date(now.getTime() + 72 * 60 * 60 * 1000);

    const formatForInput = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${mins}`;
    };

    document.getElementById('ewb-gen-time').value = formatForInput(now);
    document.getElementById('ewb-valid-time').value = formatForInput(in72Hours);

    // Populate Trip dropdown
    const select = document.getElementById('ewb-trip');
    if (select) {
      select.innerHTML = '<option value="">-- Select Consignment Trip --</option>' +
        this.allTrips.map(t => `<option value="${t.id}">${t.grNo} (${t.truckNo} - ${t.origin} to ${t.destination})</option>`).join('');
    }

    const modal = new bootstrap.Modal(document.getElementById('modalAddEwb'));
    modal.show();
  },

  onTripChange() {
    const tripId = document.getElementById('ewb-trip')?.value;
    if (!tripId) return;

    const trip = this.allTrips.find(t => String(t.id) === String(tripId));
    if (!trip) return;

    document.getElementById('ewb-truck').value = trip.truckNo || '';
    document.getElementById('ewb-driver').value = trip.driver || '';
    document.getElementById('ewb-driver-mobile').value = trip.driverMobile || '';
    document.getElementById('ewb-origin').value = trip.origin || 'Rajsamand (Raj.)';
    document.getElementById('ewb-destination').value = trip.destination || 'Hardoi (U.P.)';
    document.getElementById('ewb-distance').value = "650";
    document.getElementById('ewb-remarks').value = `${trip.material || 'Consignment'} - Consignee: ${trip.consignee}`;
  },

  sendDriverAlert(id) {
    const ewb = this.allEwbs.find(e => String(e.id) === String(id));
    if (!ewb) return;

    const phone = (ewb.driverMobile || '').replace(/[^0-9]/g, '');
    const rem = this.calculateRemainingTime(ewb.validUntil);

    const msg =
`*URGENT: E-WAY BILL VALIDITY ALERT*
*MTC & TTC LOGISTICS ERP*
---------------------------------------
*Vehicle No:* ${ewb.truckNo}
*Driver:* ${ewb.driver || 'Driver'}
*E-Way Bill No:* ${ewb.ewbNo}
*G.R. No:* ${ewb.grNo}
*Route:* ${ewb.origin} ➔ ${ewb.destination}
*Validity Remaining:* ${rem.text}
---------------------------------------
*NOTICE:* If vehicle is delayed due to breakdown, traffic or tyre puncture, please inform Shahpura Head Office immediately to extend E-Way Bill validity before RTO checking!
_Head Office: 9414312586 / 9829241717_`;

    const url = phone ? `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  async extendValidity(id) {
    const ewb = this.allEwbs.find(e => String(e.id) === String(id));
    if (!ewb) return;

    const currentValid = new Date(ewb.validUntil || new Date());
    const newValid = new Date(currentValid.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

    await dbService.update('ewayBills', ewb.id, {
      validUntil: newValid,
      status: 'Active',
      remarks: `${ewb.remarks ? ewb.remarks + ' | ' : ''}Extended by 24 hours on ${AppUI.formatDate(new Date().toISOString().split('T')[0])}`
    });

    AppUI.showToast(`E-Way Bill ${ewb.ewbNo} validity extended by 24 hours!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async markCompleted(id) {
    const ewb = this.allEwbs.find(e => String(e.id) === String(id));
    if (!ewb) return;

    await dbService.update('ewayBills', ewb.id, { status: 'Completed' });
    AppUI.showToast(`E-Way Bill ${ewb.ewbNo} marked as Completed!`, "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async saveEwb(e) {
    e.preventDefault();
    const ewbNo = document.getElementById('ewb-number').value.trim();
    const tripId = document.getElementById('ewb-trip').value;
    const trip = this.allTrips.find(t => String(t.id) === String(tripId));

    const truckNo = document.getElementById('ewb-truck').value.trim().toUpperCase();
    const driver = document.getElementById('ewb-driver').value.trim();
    const driverMobile = document.getElementById('ewb-driver-mobile').value.trim();
    const origin = document.getElementById('ewb-origin').value.trim();
    const destination = document.getElementById('ewb-destination').value.trim();
    const distanceKm = Number(document.getElementById('ewb-distance').value) || 0;
    const generatedAt = document.getElementById('ewb-gen-time').value;
    const validUntil = document.getElementById('ewb-valid-time').value;
    const remarks = document.getElementById('ewb-remarks').value.trim();

    const rem = this.calculateRemainingTime(validUntil);
    let status = 'Active';
    if (rem.isExpired) status = 'Expired';
    else if (rem.hours <= 24) status = 'Expiring Soon';

    const ewbData = {
      ewbNo,
      grNo: trip ? trip.grNo : '',
      firm: trip ? trip.transport : 'TTC',
      truckNo,
      driver,
      driverMobile,
      origin,
      destination,
      distanceKm,
      generatedAt,
      validUntil,
      status,
      remarks
    };

    await dbService.add('ewayBills', ewbData);

    const modalEl = document.getElementById('modalAddEwb');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`E-Way Bill ${ewbNo} linked and active!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async deleteEwb(id) {
    if (!confirm("Are you sure you want to delete this E-Way Bill?")) return;
    await dbService.delete('ewayBills', id);
    AppUI.showToast("E-Way Bill deleted", "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => EwayModule.init());
