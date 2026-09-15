/**
 * POD (Proof of Delivery / पावती) & Shortage Register Module
 */

const PodModule = {
  allPods: [],
  allTrips: [],
  allOwners: [],
  currentStatusFilter: 'ALL',

  async init() {
    AppUI.renderSidebar('pod');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allPods = await dbService.getAll('podRecords');
    this.allTrips = await dbService.getAll('trips');
    this.allOwners = await dbService.getAll('truckOwners');

    // Auto-sync trips to pods if any trip does not have a pod entry
    for (const trip of this.allTrips) {
      const exists = this.allPods.find(p => p.grNo === trip.grNo || p.tripId === trip.id);
      if (!exists) {
        const newPod = {
          tripId: trip.id,
          grNo: trip.grNo,
          firm: trip.transport || 'TTC',
          truckNo: trip.truckNo,
          driver: trip.driver || '',
          consignee: trip.consignee || '',
          origin: trip.origin || '',
          destination: trip.destination || '',
          dispatchDate: trip.tripStartDate || '',
          deliveryDate: '',
          status: trip.status === 'Settled' ? 'Submitted to Client' : (trip.status === 'Transit' ? 'In Transit' : 'POD Awaited'),
          receivedBy: '',
          shortageKg: 0,
          shortageAmount: 0,
          remarks: ''
        };
        await dbService.add('podRecords', newPod);
        this.allPods.push(newPod);
      }
    }
  },

  updateKPIs() {
    let transitCount = 0;
    let awaitedCount = 0;
    let receivedCount = 0;
    let totalShortage = 0;

    this.allPods.forEach(p => {
      if (p.status === 'In Transit') transitCount++;
      else if (p.status === 'POD Awaited') awaitedCount++;
      else if (p.status === 'Received at Branch') receivedCount++;

      totalShortage += (Number(p.shortageAmount) || 0);
    });

    const elTransit = document.getElementById('kpi-pod-transit');
    const elAwaited = document.getElementById('kpi-pod-awaited');
    const elReceived = document.getElementById('kpi-pod-received');
    const elShortage = document.getElementById('kpi-pod-shortage');

    if (elTransit) elTransit.innerText = transitCount;
    if (elAwaited) elAwaited.innerText = awaitedCount;
    if (elReceived) elReceived.innerText = receivedCount;
    if (elShortage) elShortage.innerText = AppUI.formatCurrency(totalShortage);
  },

  setStatusFilter(status, btnElement) {
    this.currentStatusFilter = status;
    if (btnElement) {
      document.querySelectorAll('#podTabs .nav-link').forEach(el => el.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('pod-tbody');
    if (!tbody) return;

    const firmFilter = document.getElementById('firm-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('pod-search')?.value || '').toLowerCase().trim();

    const filtered = this.allPods.filter(p => {
      if (this.currentStatusFilter !== 'ALL' && p.status !== this.currentStatusFilter) return false;
      if (firmFilter !== 'ALL' && p.firm !== firmFilter) return false;
      if (searchQuery) {
        const text = `${p.grNo} ${p.truckNo} ${p.consignee} ${p.driver} ${p.receivedBy} ${p.remarks}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No dispatches found for selected filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      let badgeClass = 'bg-secondary';
      if (p.status === 'In Transit') badgeClass = 'bg-info-subtle text-info';
      else if (p.status === 'POD Awaited') badgeClass = 'bg-warning-subtle text-warning-emphasis';
      else if (p.status === 'Received at Branch') badgeClass = 'bg-primary-subtle text-primary';
      else if (p.status === 'Submitted to Client') badgeClass = 'bg-success-subtle text-success';

      const shortageAmt = Number(p.shortageAmount) || 0;

      return `
        <tr>
          <td class="font-monospace fw-bold text-primary">${p.grNo}</td>
          <td><span class="badge ${APP_CONFIG.firms[p.firm]?.badgeClass || 'bg-secondary'}">${p.firm}</span></td>
          <td>
            <div class="fw-bold font-monospace">${p.truckNo}</div>
            <small class="text-muted">${p.driver || '-'}</small>
          </td>
          <td>
            <div class="fw-semibold text-dark">${p.consignee}</div>
            <small class="text-muted">${p.destination || ''}</small>
          </td>
          <td class="small">${AppUI.formatDate(p.dispatchDate)}</td>
          <td class="small fw-semibold">${AppUI.formatDate(p.deliveryDate)}</td>
          <td><span class="badge ${badgeClass}">${p.status}</span></td>
          <td class="text-end">
            ${shortageAmt > 0 ? `
              <div class="fw-bold text-danger">${AppUI.formatCurrency(shortageAmt)}</div>
              <small class="text-muted">(${p.shortageKg || 0} Kg)</small>
            ` : '<span class="text-muted small">Nil</span>'}
          </td>
          <td class="small text-secondary">${p.receivedBy || '-'}</td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary py-0 px-2" title="Update POD" onclick="PodModule.openAddPodModal('${p.tripId}')">
                <i class="bi bi-pencil-square"></i> Update
              </button>
              ${p.status === 'In Transit' ? `
                <button class="btn btn-outline-warning py-0 px-2" title="Mark Delivered" onclick="PodModule.quickStatus('${p.id}', 'POD Awaited')">
                  <i class="bi bi-check2"></i>
                </button>
              ` : ''}
              ${p.status === 'POD Awaited' ? `
                <button class="btn btn-outline-success py-0 px-2" title="Mark Received at Branch" onclick="PodModule.quickStatus('${p.id}', 'Received at Branch')">
                  <i class="bi bi-patch-check"></i>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openAddPodModal(tripId = '') {
    const form = document.getElementById('form-update-pod');
    if (form) form.reset();

    // Populate Trip dropdown
    const select = document.getElementById('pod-trip-select');
    if (select) {
      select.innerHTML = '<option value="">-- Choose Bilty --</option>' +
        this.allTrips.map(t => `<option value="${t.id}">${t.grNo} (${t.truckNo} - ${t.consignee})</option>`).join('');
      if (tripId) {
        select.value = tripId;
      }
    }

    this.onTripSelectChange();

    const modal = new bootstrap.Modal(document.getElementById('modalUpdatePod'));
    modal.show();
  },

  onTripSelectChange() {
    const tripId = document.getElementById('pod-trip-select')?.value;
    if (!tripId) return;

    const pod = this.allPods.find(p => p.tripId === tripId);
    if (pod) {
      document.getElementById('pod-status').value = pod.status || 'In Transit';
      document.getElementById('pod-delivery-date').value = pod.deliveryDate || '';
      document.getElementById('pod-received-by').value = pod.receivedBy || '';
      document.getElementById('pod-shortage-kg').value = pod.shortageKg || 0;
      document.getElementById('pod-shortage-amount').value = pod.shortageAmount || 0;
      document.getElementById('pod-doc-url').value = pod.docUrl || '';
      document.getElementById('pod-remarks').value = pod.remarks || '';
    }
  },

  calcShortage() {
    const kg = Number(document.getElementById('pod-shortage-kg')?.value) || 0;
    const rate = Number(document.getElementById('pod-shortage-rate')?.value) || 0;
    const totalEl = document.getElementById('pod-shortage-amount');
    if (totalEl && rate > 0) {
      totalEl.value = (kg * rate).toFixed(2);
    }
  },

  async quickStatus(id, newStatus) {
    const pod = this.allPods.find(p => String(p.id) === String(id));
    if (!pod) return;

    const updates = { status: newStatus };
    if (newStatus === 'POD Awaited' && !pod.deliveryDate) {
      updates.deliveryDate = new Date().toISOString().split('T')[0];
    }

    await dbService.update('podRecords', pod.id, updates);
    AppUI.showToast(`Trip ${pod.grNo} status updated to ${newStatus}!`, "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async savePod(e) {
    e.preventDefault();
    const tripId = document.getElementById('pod-trip-select').value;
    const trip = this.allTrips.find(t => String(t.id) === String(tripId));
    if (!trip) {
      AppUI.showToast("Please select a trip first!", "danger");
      return;
    }

    const status = document.getElementById('pod-status').value;
    const deliveryDate = document.getElementById('pod-delivery-date').value;
    const receivedBy = document.getElementById('pod-received-by').value.trim();
    const shortageKg = Number(document.getElementById('pod-shortage-kg').value) || 0;
    const shortageAmount = Number(document.getElementById('pod-shortage-amount').value) || 0;
    const deductOwner = document.getElementById('pod-deduct-owner').checked;
    const docUrl = document.getElementById('pod-doc-url').value.trim();
    const remarks = document.getElementById('pod-remarks').value.trim();

    let existingPod = this.allPods.find(p => p.tripId === tripId);

    const podData = {
      tripId,
      grNo: trip.grNo,
      firm: trip.transport,
      truckNo: trip.truckNo,
      driver: trip.driver,
      consignee: trip.consignee,
      origin: trip.origin,
      destination: trip.destination,
      dispatchDate: trip.tripStartDate,
      deliveryDate,
      status,
      receivedBy,
      shortageKg,
      shortageAmount,
      docUrl,
      remarks
    };

    if (existingPod && existingPod.id) {
      await dbService.update('podRecords', existingPod.id, podData);
    } else {
      await dbService.add('podRecords', podData);
    }

    // Deduct shortage from Truck Owner balance if requested
    if (deductOwner && shortageAmount > 0) {
      const newOwnerDue = Math.max(0, (Number(trip.ownerDue) || 0) - shortageAmount);
      await dbService.update('trips', trip.id, { ownerDue: newOwnerDue });

      const owner = this.allOwners.find(o => o.name === trip.truckOwner);
      if (owner) {
        const newDue = Math.max(0, (Number(owner.dueAmount) || 0) - shortageAmount);
        await dbService.update('truckOwners', owner.id, { dueAmount: newDue });
      }
    }

    // Synchronize trip status
    let newTripStatus = trip.status;
    if (status === 'In Transit') newTripStatus = 'Transit';
    else if (status === 'POD Awaited' || status === 'Received at Branch') newTripStatus = 'POD Pending';
    else if (status === 'Submitted to Client' && trip.partyDue === 0 && trip.ownerDue === 0) newTripStatus = 'Settled';

    await dbService.update('trips', trip.id, { status: newTripStatus });

    const modalEl = document.getElementById('modalUpdatePod');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast(`POD for ${trip.grNo} saved successfully!`, "success");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => PodModule.init());
