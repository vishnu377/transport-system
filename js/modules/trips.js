/**
 * Trips Management Module
 * MTC & TTC Logistics Management System
 */

const TripsModule = {
  currentFilter: 'All',

  async init() {
    AppUI.renderSidebar('trips');
    await this.loadTrips();
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('search-trips');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterTrips(e.target.value));
    }

    // Firm Filter Pills
    document.querySelectorAll('.filter-firm-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-firm-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
        btn.classList.add('active', 'btn-primary');
        this.currentFilter = btn.getAttribute('data-firm');
        this.filterTrips(document.getElementById('search-trips').value);
      });
    });
  },

  async loadTrips() {
    const trips = await dbService.getAll('trips');
    this.renderTable(trips);
    this.updateSummary(trips);
  },

  renderTable(trips) {
    const tbody = document.getElementById('trips-tbody');
    if (!tbody) return;

    if (!trips || trips.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-4 text-muted">
            <i class="bi bi-truck fs-3 d-block mb-2"></i>
            No trips found. Click <strong>+ Book New Bilty</strong> to dispatch a truck.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = trips.map(t => {
      const firmClass = t.transport === 'MTC' ? 'firm-mtc' : t.transport === 'SMTC' ? 'firm-smtc' : 'firm-ttc';
      const statusClass = t.status === 'Due' ? 'due' : t.status === 'Transit' ? 'transit' : 'settled';

      return `
        <tr>
          <td>
            <span class="firm-pill ${firmClass}">${t.transport || 'TTC'}</span>
            <div class="fw-bold font-monospace mt-1">${t.grNo}</div>
            <small class="text-muted">${AppUI.formatDate(t.tripStartDate)}</small>
          </td>
          <td>
            <div class="fw-bold text-dark">${t.truckNo}</div>
            <small class="text-muted"><i class="bi bi-person"></i> ${t.truckOwner || '-'}</small>
          </td>
          <td>
            <div>${t.driver || '-'}</div>
            ${t.driverMobile ? `<small class="text-muted"><a href="tel:${t.driverMobile}" class="text-decoration-none"><i class="bi bi-telephone"></i> ${t.driverMobile}</a></small>` : ''}
          </td>
          <td>
            <div><strong>${t.origin}</strong></div>
            <div class="text-primary"><i class="bi bi-arrow-down-short"></i> ${t.destination}</div>
          </td>
          <td>
            <div class="fw-semibold">${t.consignee || '-'}</div>
            <small class="text-muted">${t.material || '-'}</small>
          </td>
          <td class="text-end">
            <div>${t.weight ? Number(t.weight).toFixed(3) + ' T' : '-'}</div>
            <small class="text-muted">@ ₹${t.rate || 0}/T</small>
          </td>
          <td class="text-end fw-bold text-dark">
            ${AppUI.formatCurrency(t.freight || 0)}
          </td>
          <td>
            <span class="badge-status ${statusClass}">
              <i class="bi bi-circle-fill" style="font-size: 6px;"></i> ${t.status || 'Open'}
            </span>
          </td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn-action" title="View Details" onclick="TripsModule.viewTripDetails('${t.id}')">
                <i class="bi bi-eye text-primary"></i>
              </button>
              <button class="btn-action" title="Delete Trip" onclick="TripsModule.deleteTrip('${t.id}')">
                <i class="bi bi-trash text-danger"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  updateSummary(trips) {
    const totalTrips = trips.length;
    const totalFreight = trips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);
    const activeTrips = trips.filter(t => t.status !== 'Settled').length;

    const countEl = document.getElementById('stat-total-trips');
    const freightEl = document.getElementById('stat-total-freight');
    const activeEl = document.getElementById('stat-active-trips');

    if (countEl) countEl.innerText = totalTrips;
    if (freightEl) freightEl.innerText = AppUI.formatCurrency(totalFreight);
    if (activeEl) activeEl.innerText = activeTrips;
  },

  async filterTrips(query) {
    const q = (query || '').toLowerCase().trim();
    let all = await dbService.getAll('trips');

    if (this.currentFilter && this.currentFilter !== 'All') {
      all = all.filter(t => t.transport === this.currentFilter);
    }

    const filtered = all.filter(t =>
      (t.grNo && t.grNo.toLowerCase().includes(q)) ||
      (t.truckNo && t.truckNo.toLowerCase().includes(q)) ||
      (t.driver && t.driver.toLowerCase().includes(q)) ||
      (t.origin && t.origin.toLowerCase().includes(q)) ||
      (t.destination && t.destination.toLowerCase().includes(q)) ||
      (t.consignee && t.consignee.toLowerCase().includes(q)) ||
      (t.material && t.material.toLowerCase().includes(q))
    );
    this.renderTable(filtered);
  },

  async viewTripDetails(id) {
    const trip = await dbService.getById('trips', id);
    if (!trip) return;

    const content = `
      <div class="row g-3">
        <div class="col-md-6">
          <label class="text-muted small">Bilty / G.R. Number:</label>
          <div class="fw-bold font-monospace fs-6">${trip.grNo}</div>
        </div>
        <div class="col-md-6">
          <label class="text-muted small">Operating Firm:</label>
          <div><span class="firm-pill firm-${(trip.transport || 'ttc').toLowerCase()}">${trip.transport}</span> (${trip.biltyType || 'Regular'})</div>
        </div>
        <div class="col-md-6">
          <label class="text-muted small">Truck & Driver:</label>
          <div class="fw-bold">${trip.truckNo} (${trip.driver || '-'})</div>
          <small class="text-muted">Owner: ${trip.truckOwner || '-'}</small>
        </div>
        <div class="col-md-6">
          <label class="text-muted small">Broker / Reference:</label>
          <div>${trip.reference || '-'} (${trip.referenceMobile || '-'})</div>
          <small class="text-muted">Commission: ${AppUI.formatCurrency(trip.commission || 0)}</small>
        </div>
        <div class="col-md-6">
          <label class="text-muted small">Origin & Destination:</label>
          <div><strong>${trip.origin}</strong> ➔ <strong class="text-primary">${trip.destination}</strong></div>
        </div>
        <div class="col-md-6">
          <label class="text-muted small">Consignee & Commodity:</label>
          <div><strong>${trip.consignee}</strong></div>
          <small class="text-muted">${trip.material || '-'}</small>
        </div>
        <div class="col-md-4">
          <label class="text-muted small">Weight:</label>
          <div class="fw-bold">${trip.weight} Tonnes</div>
        </div>
        <div class="col-md-4">
          <label class="text-muted small">Rate:</label>
          <div class="fw-bold">₹${trip.rate} / Tonne</div>
        </div>
        <div class="col-md-4">
          <label class="text-muted small">Total Freight:</label>
          <div class="fw-bold text-success fs-5">${AppUI.formatCurrency(trip.freight || 0)}</div>
        </div>
      </div>
    `;

    document.getElementById('trip-detail-content').innerHTML = content;
    const modal = new bootstrap.Modal(document.getElementById('tripDetailModal'));
    modal.show();
  },

  async deleteTrip(id) {
    if (confirm("Are you sure you want to delete this trip record?")) {
      await dbService.delete('trips', id);
      AppUI.showToast("Trip deleted successfully!", "success");
      await this.loadTrips();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => TripsModule.init());
