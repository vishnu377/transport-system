/**
 * Bilty (Lorry Receipt / LR) Booking Module
 * MTC & TTC Logistics Management System
 */

const BiltyBookingModule = {
  currentBilty: null,

  async init() {
    AppUI.renderSidebar('bilty');
    await this.populateDropdowns();
    this.generateBiltyNumber();
    this.bindEvents();
  },

  async populateDropdowns() {
    // 1. Parties for Consignor & Consignee
    const parties = await dbService.getAll('parties');
    const consignorSelect = document.getElementById('bilty-consignor');
    const consigneeSelect = document.getElementById('bilty-consignee');

    if (consignorSelect && consigneeSelect) {
      const optionsHTML = '<option value="">-- Select Party --</option>' +
        parties.map(p => `<option value="${p.name}" data-gstin="${p.gstin || ''}" data-address="${p.address || ''}">${p.name}</option>`).join('');
      consignorSelect.innerHTML = optionsHTML;
      consigneeSelect.innerHTML = optionsHTML;
    }

    // 2. Truck Owners
    const owners = await dbService.getAll('truckOwners');
    const ownerSelect = document.getElementById('bilty-owner');
    if (ownerSelect) {
      ownerSelect.innerHTML = '<option value="">-- Select Truck Owner --</option>' +
        owners.map(o => `<option value="${o.name}">${o.name} (${o.type})</option>`).join('');
    }

    // 3. Drivers
    const drivers = await dbService.getAll('drivers');
    const driverSelect = document.getElementById('bilty-driver');
    if (driverSelect) {
      driverSelect.innerHTML = '<option value="">-- Select Driver --</option>' +
        drivers.map(d => `<option value="${d.name}" data-mobile="${d.mobile || ''}">${d.name} (${d.mobile})</option>`).join('');
    }

    // 4. Brokers
    const brokers = await dbService.getAll('brokers');
    const brokerSelect = document.getElementById('bilty-broker');
    if (brokerSelect) {
      brokerSelect.innerHTML = '<option value="">-- Direct (No Broker) --</option>' +
        brokers.map(b => `<option value="${b.name}" data-mobile="${b.mobile || ''}">${b.name} (${b.location})</option>`).join('');
    }
  },

  generateBiltyNumber() {
    const firm = document.getElementById('bilty-firm').value || 'TTC';
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const grNo = `2026-2027-${randomSeq}_${firm}`;
    document.getElementById('bilty-gr-no').value = grNo;
  },

  bindEvents() {
    // Firm switch regenerates GR No
    document.getElementById('bilty-firm').addEventListener('change', () => this.generateBiltyNumber());

    // Auto-calculate Freight on Weight or Rate change
    const weightInput = document.getElementById('bilty-weight');
    const rateInput = document.getElementById('bilty-rate');
    const freightInput = document.getElementById('bilty-freight');

    const calculateFreight = () => {
      const weight = parseFloat(weightInput.value) || 0;
      const rate = parseFloat(rateInput.value) || 0;
      const freight = weight * rate;
      freightInput.value = freight ? freight.toFixed(2) : 0;
    };

    weightInput.addEventListener('input', calculateFreight);
    rateInput.addEventListener('input', calculateFreight);

    // Driver selection auto-fills mobile
    document.getElementById('bilty-driver').addEventListener('change', (e) => {
      const selectedOption = e.target.selectedOptions[0];
      const mobile = selectedOption.getAttribute('data-mobile') || '';
      document.getElementById('bilty-driver-mobile').value = mobile;
    });

    // Form Submit
    document.getElementById('bilty-booking-form').addEventListener('submit', (e) => this.saveBilty(e));
  },

  async saveBilty(e) {
    e.preventDefault();

    const biltyData = {
      grNo: document.getElementById('bilty-gr-no').value.trim(),
      transport: document.getElementById('bilty-firm').value,
      biltyType: document.getElementById('bilty-type').value,
      isGstApplicable: document.getElementById('bilty-gst').value,
      tripStartDate: document.getElementById('bilty-date').value || new Date().toISOString().split('T')[0],
      truckNo: document.getElementById('bilty-truck-no').value.trim().toUpperCase(),
      truckOwner: document.getElementById('bilty-owner').value.trim(),
      driver: document.getElementById('bilty-driver').value.trim(),
      driverMobile: document.getElementById('bilty-driver-mobile').value.trim(),
      origin: document.getElementById('bilty-origin').value.trim(),
      destination: document.getElementById('bilty-destination').value.trim(),
      material: document.getElementById('bilty-material').value.trim(),
      reference: document.getElementById('bilty-broker').value.trim(),
      consignor: document.getElementById('bilty-consignor').value.trim(),
      consignee: document.getElementById('bilty-consignee').value.trim(),
      billingType: "Per Tonne",
      weight: parseFloat(document.getElementById('bilty-weight').value) || 0,
      rate: parseFloat(document.getElementById('bilty-rate').value) || 0,
      freight: parseFloat(document.getElementById('bilty-freight').value) || 0,
      commission: parseFloat(document.getElementById('bilty-commission').value) || 0,
      status: "Transit",
      partyDue: parseFloat(document.getElementById('bilty-freight').value) || 0,
      ownerDue: (parseFloat(document.getElementById('bilty-freight').value) || 0) - (parseFloat(document.getElementById('bilty-commission').value) || 0),
      partyPaid: 0
    };

    if (!biltyData.truckNo) {
      AppUI.showToast("Truck Registration Number is required!", "danger");
      return;
    }

    await dbService.add('trips', biltyData);
    AppUI.showToast(`Bilty ${biltyData.grNo} created successfully!`, "success");

    this.currentBilty = biltyData;
    this.showPrintModal(biltyData);
  },

  showPrintModal(bilty) {
    const previewEl = document.getElementById('bilty-print-preview');
    if (!previewEl) return;

    previewEl.innerHTML = `
      <div class="p-4 border rounded bg-white shadow-sm bilty-print-document">
        <div class="text-center border-bottom pb-3 mb-3">
          <h3 class="fw-bold mb-0 text-primary">${bilty.transport} TRANSPORT CORP.</h3>
          <small class="text-muted d-block">Fleet Owners & Bulk Material Logistics Carriers</small>
          <small class="text-muted">Head Office: Shahpura & Rajsamand, Rajasthan | Phone: 9414312586</small>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span class="text-muted small">G.R. / Bilty No:</span>
            <div class="fw-bold font-monospace fs-5 text-dark">${bilty.grNo}</div>
          </div>
          <div class="text-end">
            <span class="text-muted small">Dispatch Date:</span>
            <div class="fw-bold fs-6">${AppUI.formatDate(bilty.tripStartDate)}</div>
          </div>
        </div>

        <div class="row g-2 mb-3 p-2 bg-light rounded">
          <div class="col-6">
            <small class="text-muted d-block">Truck Number:</small>
            <strong class="font-monospace fs-6">${bilty.truckNo}</strong>
          </div>
          <div class="col-6 text-end">
            <small class="text-muted d-block">Driver & Contact:</small>
            <strong>${bilty.driver || '-'} (${bilty.driverMobile || '-'})</strong>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-6 border-end">
            <small class="text-muted fw-bold">CONSIGNOR (माल भेजने वाला):</small>
            <div class="fw-bold">${bilty.consignor || '-'}</div>
            <small class="text-muted">Origin: ${bilty.origin}</small>
          </div>
          <div class="col-6">
            <small class="text-muted fw-bold">CONSIGNEE (माल पाने वाला):</small>
            <div class="fw-bold text-primary">${bilty.consignee || '-'}</div>
            <small class="text-muted">Destination: ${bilty.destination}</small>
          </div>
        </div>

        <table class="table table-bordered table-sm mb-3">
          <thead class="table-light">
            <tr>
              <th>Material / Packages</th>
              <th class="text-end">Weight (Tonnes)</th>
              <th class="text-end">Rate / Tonne</th>
              <th class="text-end">Total Freight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${bilty.material || 'General Freight'}</strong></td>
              <td class="text-end">${bilty.weight} MT</td>
              <td class="text-end">₹${bilty.rate}</td>
              <td class="text-end fw-bold">${AppUI.formatCurrency(bilty.freight)}</td>
            </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-4">
          <div class="text-muted small">
            <div>• Subject to Rajsamand Jurisdiction.</div>
            <div>• Carrier is not responsible for leakage or in-transit natural loss.</div>
          </div>
          <div class="text-center">
            <div class="mb-4 text-muted small">For ${bilty.transport} Transport Corp.</div>
            <div class="fw-bold border-top pt-1 small">Authorized Signatory</div>
          </div>
        </div>
      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('biltyPrintModal'));
    modal.show();
  },

  shareOnWhatsApp() {
    if (!this.currentBilty) return;
    const b = this.currentBilty;
    const msg = `*--- ${b.transport} TRANSPORT BILTY ---*
*GR No:* ${b.grNo}
*Date:* ${AppUI.formatDate(b.tripStartDate)}
*Truck:* ${b.truckNo}
*Driver:* ${b.driver} (${b.driverMobile})
*Route:* ${b.origin} ➔ ${b.destination}
*Consignor:* ${b.consignor}
*Consignee:* ${b.consignee}
*Material:* ${b.material}
*Weight:* ${b.weight} Tonnes
*Freight:* ${AppUI.formatCurrency(b.freight)}
*Status:* ${b.status}

_MTC & TTC Logistics Management System_`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
};

document.addEventListener('DOMContentLoaded', () => BiltyBookingModule.init());
