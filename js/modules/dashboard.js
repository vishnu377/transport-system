/**
 * Executive Dashboard Module
 * MTC & TTC Logistics Management System
 */

const DashboardModule = {
  async init() {
    AppUI.renderSidebar('dashboard');
    await this.loadDashboardMetrics();
    await this.loadRecentTrips();
  },

  async loadDashboardMetrics() {
    const trips = await dbService.getAll('trips');
    const parties = await dbService.getAll('parties');
    const owners = await dbService.getAll('truckOwners');

    // 1. Trips KPI
    const totalTrips = trips.length;
    const activeTrips = trips.filter(t => t.status !== 'Settled').length;
    const totalFreight = trips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);

    // 2. Party Due (Receivable)
    const partyDue = parties.reduce((sum, p) => sum + (Number(p.dueAmount) || 0), 0);

    // 3. Owner Due (Payable)
    const ownerDue = owners.reduce((sum, o) => sum + (Number(o.dueAmount) || 0), 0);

    // Update DOM
    const kpiActiveTrips = document.getElementById('kpi-active-trips');
    const kpiTotalFreight = document.getElementById('kpi-total-freight');
    const kpiPartyDue = document.getElementById('kpi-party-due');
    const kpiOwnerDue = document.getElementById('kpi-owner-due');

    if (kpiActiveTrips) kpiActiveTrips.innerText = `${activeTrips} Active / ${totalTrips} Total`;
    if (kpiTotalFreight) kpiTotalFreight.innerText = AppUI.formatCurrency(totalFreight);
    if (kpiPartyDue) kpiPartyDue.innerText = AppUI.formatCurrency(partyDue);
    if (kpiOwnerDue) kpiOwnerDue.innerText = AppUI.formatCurrency(ownerDue);
  },

  async loadRecentTrips() {
    const trips = await dbService.getAll('trips');
    const tbody = document.getElementById('dashboard-trips-tbody');
    if (!tbody) return;

    if (!trips || trips.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No trips recorded yet.</td></tr>`;
      return;
    }

    // Display the most recent 10 trips
    const recentTrips = trips.slice(0, 10);

    tbody.innerHTML = recentTrips.map(t => {
      const firmClass = t.transport === 'MTC' ? 'firm-mtc' : t.transport === 'SMTC' ? 'firm-smtc' : 'firm-ttc';
      const statusClass = t.status === 'Due' ? 'due' : t.status === 'Transit' ? 'transit' : 'settled';

      return `
        <tr>
          <td>
            <span class="firm-pill ${firmClass}">${t.transport || 'TTC'}</span>
            <div class="fw-bold font-monospace mt-1">${t.grNo}</div>
          </td>
          <td>
            <div class="fw-bold">${t.truckNo}</div>
            <small class="text-muted">${t.driver || '-'}</small>
          </td>
          <td>
            <div><strong>${t.origin}</strong> <i class="bi bi-arrow-right text-muted small"></i></div>
            <div class="text-primary">${t.destination}</div>
          </td>
          <td>
            <div>${t.consignee || '-'}</div>
            <small class="text-muted">${t.material || '-'}</small>
          </td>
          <td class="text-end fw-bold">
            ${AppUI.formatCurrency(t.freight || 0)}
          </td>
          <td>
            <span class="badge-status ${statusClass}">
              <i class="bi bi-circle-fill" style="font-size: 6px;"></i> ${t.status || 'Open'}
            </span>
          </td>
          <td class="text-center">
            <a href="./pages/trips.html?id=${t.id}" class="btn-action" title="View Details">
              <i class="bi bi-eye text-primary"></i>
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => DashboardModule.init());
