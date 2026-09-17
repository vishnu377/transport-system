/**
 * Fleet Documents & Compliance Register Module
 * Tracks Insurance, Fitness, National Permit & PUC validity for MTC Fleet
 */

const FleetModule = {
  allTrucks: [],
  currentStatusFilter: 'ALL',

  async init() {
    AppUI.renderSidebar('fleet');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allTrucks = await dbService.getAll('fleetCompliance');
    const owners = await dbService.getAll('truckOwners');

    // Auto-link own trucks from truckOwners if not present
    const selfOwner = owners.find(o => o.type === 'Self' || o.name.includes('MTC Fleet'));
    if (selfOwner && selfOwner.trucks) {
      for (const truckNo of selfOwner.trucks) {
        const exists = this.allTrucks.find(t => t.truckNo.toUpperCase() === truckNo.toUpperCase());
        if (!exists) {
          const newTruck = {
            truckNo,
            model: "Commercial Multi-Axle",
            ownership: "Self (MTC Fleet)",
            driver: "Assigned Fleet Driver",
            driverMobile: selfOwner.mobile || '',
            insurancePolicy: "National Insurance",
            insuranceExpiry: "2027-01-15",
            fitnessExpiry: "2026-12-31",
            npExpiry: "2027-03-31",
            pucExpiry: "2026-11-30",
            currentKm: 120000,
            lastServiceKm: 115000,
            remarks: "Own fleet vehicle"
          };
          await dbService.add('fleetCompliance', newTruck);
          this.allTrucks.push(newTruck);
        }
      }
    }
  },

  checkDateStatus(dateStr) {
    if (!dateStr) return { status: 'Missing', days: 0, text: 'Not Recorded', badgeClass: 'bg-secondary' };

    const targetDate = new Date(dateStr);
    const now = new Date();
    // Normalize to midnight
    targetDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffDays = Math.round((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'Expired', days: diffDays, text: `Expired (${Math.abs(diffDays)}d ago)`, badgeClass: 'bg-danger text-white' };
    } else if (diffDays <= 30) {
      return { status: 'Expiring Soon', days: diffDays, text: `Expires in ${diffDays}d`, badgeClass: 'bg-warning text-dark' };
    } else {
      return { status: 'Valid', days: diffDays, text: `Valid (${diffDays}d left)`, badgeClass: 'bg-success-subtle text-success' };
    }
  },

  getTruckCompliance(truck) {
    const dates = [truck.insuranceExpiry, truck.fitnessExpiry, truck.npExpiry, truck.pucExpiry].filter(Boolean);
    let hasExpired = false;
    let hasExpiringSoon = false;

    dates.forEach(d => {
      const res = this.checkDateStatus(d);
      if (res.status === 'Expired') hasExpired = true;
      else if (res.status === 'Expiring Soon') hasExpiringSoon = true;
    });

    if (hasExpired) return 'Expired';
    if (hasExpiringSoon) return 'Expiring Soon';
    return 'All Valid';
  },

  updateKPIs() {
    let expiringCount = 0;
    let expiredCount = 0;
    let validCount = 0;

    this.allTrucks.forEach(t => {
      const comp = this.getTruckCompliance(t);
      if (comp === 'Expired') expiredCount++;
      else if (comp === 'Expiring Soon') expiringCount++;
      else validCount++;
    });

    const elTotal = document.getElementById('kpi-fleet-total');
    const elExpiring = document.getElementById('kpi-fleet-expiring');
    const elExpired = document.getElementById('kpi-fleet-expired');
    const elValid = document.getElementById('kpi-fleet-valid');

    if (elTotal) elTotal.innerText = this.allTrucks.length;
    if (elExpiring) elExpiring.innerText = `${expiringCount} Trucks`;
    if (elExpired) elExpired.innerText = `${expiredCount} Trucks`;
    if (elValid) elValid.innerText = `${validCount} Trucks`;
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    if (btnElement) {
      document.querySelectorAll('#fleetTabs .nav-link').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('fleet-tbody');
    if (!tbody) return;

    const ownershipFilter = document.getElementById('ownership-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('fleet-search')?.value || '').toLowerCase().trim();

    const filtered = this.allTrucks.filter(t => {
      const comp = this.getTruckCompliance(t);
      if (this.currentStatusFilter !== 'ALL' && comp !== this.currentStatusFilter) return false;
      if (ownershipFilter !== 'ALL') {
        if (ownershipFilter === 'Self' && !t.ownership.includes('Self')) return false;
        if (ownershipFilter === 'Market' && !t.ownership.includes('Market')) return false;
      }
      if (searchQuery) {
        const text = `${t.truckNo} ${t.model} ${t.driver} ${t.driverMobile} ${t.insurancePolicy} ${t.remarks}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No fleet vehicles found for selected filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(t => {
      const ins = this.checkDateStatus(t.insuranceExpiry);
      const fit = this.checkDateStatus(t.fitnessExpiry);
      const np = this.checkDateStatus(t.npExpiry);
      const puc = this.checkDateStatus(t.pucExpiry);
      const comp = this.getTruckCompliance(t);

      let compBadge = '';
      if (comp === 'Expired') {
        compBadge = '<span class="badge bg-danger text-white"><i class="bi bi-x-circle me-1"></i>Expired Docs</span>';
      } else if (comp === 'Expiring Soon') {
        compBadge = '<span class="badge bg-warning text-dark"><i class="bi bi-alarm-fill me-1"></i>Expiring Soon</span>';
      } else {
        compBadge = '<span class="badge bg-success-subtle text-success"><i class="bi bi-shield-check me-1"></i>All Valid</span>';
      }

      // Check Service km
      const kmDiff = (Number(t.currentKm) || 0) - (Number(t.lastServiceKm) || 0);
      const isServiceDue = kmDiff >= 10000;

      return `
        <tr>
          <td>
            <div class="fw-bold font-monospace text-primary fs-6">${t.truckNo}</div>
            <small class="text-muted">${t.model || 'Heavy Vehicle'}</small>
          </td>
          <td>
            <span class="badge ${t.ownership.includes('Self') ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'}">
              ${t.ownership || 'Self'}
            </span>
          </td>
          <td>
            <div class="fw-semibold text-dark">${t.driver || '-'}</div>
            <small class="text-muted font-monospace">${t.driverMobile || 'No Phone'}</small>
          </td>
          <td>
            <div class="small fw-bold">${AppUI.formatDate(t.insuranceExpiry)}</div>
            <span class="badge ${ins.badgeClass}" style="font-size: 0.72rem;">${ins.text}</span>
          </td>
          <td>
            <div class="small fw-bold">${AppUI.formatDate(t.fitnessExpiry)}</div>
            <span class="badge ${fit.badgeClass}" style="font-size: 0.72rem;">${fit.text}</span>
          </td>
          <td>
            <div class="small fw-bold">${AppUI.formatDate(t.npExpiry)}</div>
            <span class="badge ${np.badgeClass}" style="font-size: 0.72rem;">${np.text}</span>
          </td>
          <td>
            <div class="small fw-bold">${AppUI.formatDate(t.pucExpiry)}</div>
            <span class="badge ${puc.badgeClass}" style="font-size: 0.72rem;">${puc.text}</span>
          </td>
          <td>
            <div class="small">${t.currentKm ? `${t.currentKm.toLocaleString()} Km` : '-'}</div>
            ${isServiceDue ? `
              <span class="badge bg-danger-subtle text-danger" style="font-size: 0.7rem;">
                <i class="bi bi-tools me-1"></i>Service Due (+${kmDiff}km)
              </span>
            ` : '<small class="text-muted">OK</small>'}
          </td>
          <td>${compBadge}</td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success py-0 px-2" title="WhatsApp Alert" onclick="FleetModule.sendRenewalAlert('${t.id}')">
                <i class="bi bi-whatsapp"></i>
              </button>
              <button class="btn btn-outline-primary py-0 px-2" title="Edit Documents" onclick="FleetModule.openAddTruckModal('${t.id}')">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-outline-danger py-0 px-2" title="Delete Truck" onclick="FleetModule.deleteTruck('${t.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openAddTruckModal(truckId = '') {
    const form = document.getElementById('form-truck-doc');
    if (form) form.reset();

    if (truckId) {
      const t = this.allTrucks.find(trk => String(trk.id) === String(truckId));
      if (t) {
        document.getElementById('flt-truck-no').value = t.truckNo || '';
        document.getElementById('flt-model').value = t.model || '';
        document.getElementById('flt-ownership').value = t.ownership || 'Self (MTC Fleet)';
        document.getElementById('flt-driver').value = t.driver || '';
        document.getElementById('flt-mobile').value = t.driverMobile || '';
        document.getElementById('flt-insurance-policy').value = t.insurancePolicy || '';
        document.getElementById('flt-insurance-expiry').value = t.insuranceExpiry || '';
        document.getElementById('flt-fitness-expiry').value = t.fitnessExpiry || '';
        document.getElementById('flt-np-expiry').value = t.npExpiry || '';
        document.getElementById('flt-puc-expiry').value = t.pucExpiry || '';
        document.getElementById('flt-current-km').value = t.currentKm || '';
        document.getElementById('flt-last-service-km').value = t.lastServiceKm || '';
        document.getElementById('flt-remarks').value = t.remarks || '';
      }
    }

    const modal = new bootstrap.Modal(document.getElementById('modalAddTruckDoc'));
    modal.show();
  },

  sendRenewalAlert(id) {
    const t = this.allTrucks.find(trk => String(trk.id) === String(id));
    if (!t) return;

    const phone = (t.driverMobile || '').replace(/[^0-9]/g, '');
    const ins = this.checkDateStatus(t.insuranceExpiry);
    const fit = this.checkDateStatus(t.fitnessExpiry);

    const msg =
`*VEHICLE DOCUMENTS RENEWAL NOTICE - MTC & TTC LOGISTICS*
---------------------------------------------
*Vehicle Registration:* ${t.truckNo}
*Assigned Driver:* ${t.driver || 'Driver'}
*Ownership:* ${t.ownership}
*Insurance Expiry:* ${AppUI.formatDate(t.insuranceExpiry)} (${ins.text})
*Fitness Expiry:* ${AppUI.formatDate(t.fitnessExpiry)} (${fit.text})
---------------------------------------------
*NOTICE:* Please arrange for vehicle inspection / document renewal before expiry to prevent RTO seizure and highway penalties.
_Head Office Shahpura: 9414312586 / 9829241717_`;

    const url = phone ? `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  async saveTruck(e) {
    e.preventDefault();
    const truckNo = document.getElementById('flt-truck-no').value.trim().toUpperCase();
    const model = document.getElementById('flt-model').value.trim();
    const ownership = document.getElementById('flt-ownership').value;
    const driver = document.getElementById('flt-driver').value.trim();
    const driverMobile = document.getElementById('flt-mobile').value.trim();
    const insurancePolicy = document.getElementById('flt-insurance-policy').value.trim();
    const insuranceExpiry = document.getElementById('flt-insurance-expiry').value;
    const fitnessExpiry = document.getElementById('flt-fitness-expiry').value;
    const npExpiry = document.getElementById('flt-np-expiry').value;
    const pucExpiry = document.getElementById('flt-puc-expiry').value;
    const currentKm = Number(document.getElementById('flt-current-km').value) || 0;
    const lastServiceKm = Number(document.getElementById('flt-last-service-km').value) || 0;
    const remarks = document.getElementById('flt-remarks').value.trim();

    const truckData = {
      truckNo,
      model,
      ownership,
      driver,
      driverMobile,
      insurancePolicy,
      insuranceExpiry,
      fitnessExpiry,
      npExpiry,
      pucExpiry,
      currentKm,
      lastServiceKm,
      remarks
    };

    const existing = this.allTrucks.find(t => t.truckNo.toUpperCase() === truckNo.toUpperCase());
    if (existing && existing.id) {
      await dbService.update('fleetCompliance', existing.id, truckData);
    } else {
      await dbService.add('fleetCompliance', truckData);
    }

    const modalEl = document.getElementById('modalAddTruckDoc');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`Vehicle compliance for ${truckNo} saved successfully!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async deleteTruck(id) {
    if (!confirm("Are you sure you want to delete this truck compliance record?")) return;
    await dbService.delete('fleetCompliance', id);
    AppUI.showToast("Vehicle record deleted", "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => FleetModule.init());
