/**
 * Bilty (Lorry Receipt / LR) Booking & Editing Module
 * MTC & TTC Logistics Management System
 * Enhanced with Edit Bilty mode, sequential GR auto-increment, and exact A4 official format
 */

const BiltyBookingModule = {
  currentBilty: null,
  editTripId: null,

  async init() {
    AppUI.renderSidebar('bilty');
    await this.populateDropdowns();

    // Check if opened in Edit Mode (e.g. ?id=TRIP_00001)
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('id');

    if (editId) {
      this.editTripId = editId;
      await this.loadTripForEditing(editId);
    } else {
      await this.generateBiltyNumber();
    }

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
        owners.map(o => `<option value="${o.name}">${o.name} (${o.type || 'Fleet'})</option>`).join('');
    }

    // 3. Drivers
    const drivers = await dbService.getAll('drivers');
    const driverSelect = document.getElementById('bilty-driver');
    if (driverSelect) {
      driverSelect.innerHTML = '<option value="">-- Select Driver --</option>' +
        drivers.map(d => `<option value="${d.name}" data-mobile="${d.mobile || ''}">${d.name} (${d.mobile || ''})</option>`).join('');
    }

    // 4. Brokers
    const brokers = await dbService.getAll('brokers');
    const brokerSelect = document.getElementById('bilty-broker');
    if (brokerSelect) {
      brokerSelect.innerHTML = '<option value="">-- Direct (No Broker) --</option>' +
        brokers.map(b => `<option value="${b.name}" data-mobile="${b.mobile || ''}">${b.name} (${b.location || ''})</option>`).join('');
    }
  },

  async generateBiltyNumber() {
    const firm = document.getElementById('bilty-firm').value || 'TTC';
    const year = document.getElementById('bilty-year').value || '2026-2027';

    // Find highest GR sequence number in database
    const allTrips = await dbService.getAll('trips');
    let maxSeq = 2079; // Default based on Mosa ji's highest in 2026-2027
    allTrips.forEach(t => {
      const seq = parseInt(t.grSeq, 10);
      if (!isNaN(seq) && seq > maxSeq && seq < 100000) {
        maxSeq = seq;
      }
    });

    const nextSeq = maxSeq + 1;
    const shortGr = `${nextSeq}_${firm}`;
    const fullGr = `${year}-${shortGr}`;
    
    document.getElementById('bilty-gr-no').value = fullGr;
    document.getElementById('bilty-short-gr').value = shortGr;
  },

  async loadTripForEditing(tripId) {
    const trip = await dbService.getById('trips', tripId);
    if (!trip) {
      AppUI.showToast("Trip record not found for editing!", "danger");
      await this.generateBiltyNumber();
      return;
    }

    // Update UI title and button
    const cardHeader = document.querySelector('.data-card-header .fw-bold');
    if (cardHeader) {
      cardHeader.innerHTML = `<i class="bi bi-pencil-square me-2"></i> Edit Bilty Details (G.R. No: ${trip.grNo})`;
    }
    const submitBtn = document.getElementById('bilty-submit-btn');
    if (submitBtn) {
      submitBtn.className = 'btn btn-warning px-4 shadow-sm fw-bold';
      submitBtn.innerHTML = `<i class="bi bi-pencil-square me-1"></i> Update Bilty Changes`;
    }

    // Populate Fields
    document.getElementById('bilty-firm').value = trip.transport || 'TTC';
    document.getElementById('bilty-year').value = trip.financialYear || '2026-2027';
    document.getElementById('bilty-gr-no').value = trip.grNo || '';
    document.getElementById('bilty-short-gr').value = trip.shortGrNo || '';
    document.getElementById('bilty-type').value = trip.biltyType || 'Regular';

    document.getElementById('bilty-truck-no').value = trip.truckNo || '';
    document.getElementById('bilty-owner').value = trip.truckOwner || '';
    document.getElementById('bilty-date').value = trip.tripStartDate || '';
    document.getElementById('bilty-driver').value = trip.driver || '';
    document.getElementById('bilty-driver-mobile').value = trip.driverMobile || '';

    document.getElementById('bilty-consignor').value = trip.consignor || '';
    document.getElementById('bilty-consignor-gstin').value = trip.consignorGstin || '';
    document.getElementById('bilty-consignee').value = trip.consignee || '';
    document.getElementById('bilty-consignee-gstin').value = trip.consigneeGstin || '';
    document.getElementById('bilty-origin').value = trip.origin || 'Rajsamand (Raj.)';
    document.getElementById('bilty-destination').value = trip.destination || '';
    document.getElementById('bilty-delivery-address').value = trip.deliveryAddress || '';

    document.getElementById('bilty-material').value = trip.material || 'Marble Powder';
    document.getElementById('bilty-weight').value = trip.weight || '';
    document.getElementById('bilty-rate').value = trip.rate || '';
    document.getElementById('bilty-freight').value = trip.freight || '';
    document.getElementById('bilty-bill-no').value = trip.billNo || '';
    document.getElementById('bilty-eway-bill').value = trip.ewayBillNo || '';
    document.getElementById('bilty-invoice-value').value = trip.invoiceValue || '';
    document.getElementById('bilty-loading-charges').value = trip.loadingCharges || 0;
    document.getElementById('bilty-halt-charges').value = trip.haltCharges || 0;
    document.getElementById('bilty-broker').value = trip.reference || '';
    document.getElementById('bilty-commission').value = trip.commission || 0;
    document.getElementById('bilty-person-liable-gst').value = trip.personLiableGst || 'Consignor/Consignee/Transporter';

    document.getElementById('bilty-gst-paid-party').value = trip.isGstPaidByParty || 'No';
    document.getElementById('bilty-gst-amount').value = trip.gstAmount || 0;
    document.getElementById('bilty-gst-due').value = trip.gstDueAmount || 0;
    
    const freight = Number(trip.freight) || 0;
    const loading = Number(trip.loadingCharges) || 0;
    const gst = trip.isGstPaidByParty === 'Yes' ? (Number(trip.gstAmount) || 0) : 0;
    document.getElementById('bilty-grand-total').value = (freight + loading + gst).toFixed(2);
  },

  bindEvents() {
    // Regenerate GR number only if NOT in edit mode
    if (!this.editTripId) {
      document.getElementById('bilty-firm').addEventListener('change', () => this.generateBiltyNumber());
      document.getElementById('bilty-year').addEventListener('change', () => this.generateBiltyNumber());
    }

    // Auto-calculate Freight & Grand Total
    const weightInput = document.getElementById('bilty-weight');
    const rateInput = document.getElementById('bilty-rate');
    const freightInput = document.getElementById('bilty-freight');
    const loadingInput = document.getElementById('bilty-loading-charges');
    const haltInput = document.getElementById('bilty-halt-charges');
    const gstPaidSelect = document.getElementById('bilty-gst-paid-party');
    const gstAmountInput = document.getElementById('bilty-gst-amount');
    const grandTotalInput = document.getElementById('bilty-grand-total');

    const recalculateTotals = () => {
      const weight = parseFloat(weightInput.value) || 0;
      const rate = parseFloat(rateInput.value) || 0;
      const freight = weight * rate;
      freightInput.value = freight ? freight.toFixed(2) : '0';

      const loading = parseFloat(loadingInput.value) || 0;
      const halt = parseFloat(haltInput.value) || 0;

      let gst = 0;
      if (gstPaidSelect.value === 'Yes') {
        if (!parseFloat(gstAmountInput.value) && freight > 0) {
          gstAmountInput.value = (freight * 0.05).toFixed(2);
        }
        gst = parseFloat(gstAmountInput.value) || 0;
      } else {
        gstAmountInput.value = '0';
      }

      const grandTotal = freight + loading + halt + gst;
      grandTotalInput.value = grandTotal ? grandTotal.toFixed(2) : '0';
    };

    weightInput.addEventListener('input', recalculateTotals);
    rateInput.addEventListener('input', recalculateTotals);
    loadingInput.addEventListener('input', recalculateTotals);
    haltInput.addEventListener('input', recalculateTotals);
    gstPaidSelect.addEventListener('change', recalculateTotals);
    gstAmountInput.addEventListener('input', recalculateTotals);

    // Consignor auto-fill GSTIN
    document.getElementById('bilty-consignor').addEventListener('change', (e) => {
      const opt = e.target.selectedOptions[0];
      const gstin = opt.getAttribute('data-gstin') || '';
      if (gstin) document.getElementById('bilty-consignor-gstin').value = gstin;
    });

    // Consignee auto-fill GSTIN & address
    document.getElementById('bilty-consignee').addEventListener('change', (e) => {
      const opt = e.target.selectedOptions[0];
      const gstin = opt.getAttribute('data-gstin') || '';
      const address = opt.getAttribute('data-address') || '';
      if (gstin) document.getElementById('bilty-consignee-gstin').value = gstin;
      if (address) document.getElementById('bilty-delivery-address').value = address;
    });

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

    const weight = parseFloat(document.getElementById('bilty-weight').value) || 0;
    const rate = parseFloat(document.getElementById('bilty-rate').value) || 0;
    const freight = parseFloat(document.getElementById('bilty-freight').value) || (weight * rate);
    const loadingCharges = parseFloat(document.getElementById('bilty-loading-charges').value) || 0;
    const haltCharges = parseFloat(document.getElementById('bilty-halt-charges').value) || 0;
    const gstAmount = parseFloat(document.getElementById('bilty-gst-amount').value) || 0;
    const gstDueAmount = parseFloat(document.getElementById('bilty-gst-due').value) || 0;
    const commission = parseFloat(document.getElementById('bilty-commission').value) || 0;
    const fullGr = document.getElementById('bilty-gr-no').value.trim();
    const shortGr = document.getElementById('bilty-short-gr').value.trim();
    const grSeq = shortGr.split('_')[0] || '';

    const biltyData = {
      grNo: fullGr,
      grSeq: grSeq,
      shortGrNo: shortGr,
      transport: document.getElementById('bilty-firm').value,
      financialYear: document.getElementById('bilty-year').value,
      biltyType: document.getElementById('bilty-type').value,
      billNo: document.getElementById('bilty-bill-no').value.trim(),
      ewayBillNo: document.getElementById('bilty-eway-bill').value.trim(),
      invoiceValue: parseFloat(document.getElementById('bilty-invoice-value').value) || 0,
      tripStartDate: document.getElementById('bilty-date').value || new Date().toISOString().split('T')[0],
      truckNo: document.getElementById('bilty-truck-no').value.trim().toUpperCase(),
      truckOwner: document.getElementById('bilty-owner').value.trim(),
      driver: document.getElementById('bilty-driver').value.trim(),
      driverMobile: document.getElementById('bilty-driver-mobile').value.trim(),
      origin: document.getElementById('bilty-origin').value.trim(),
      destination: document.getElementById('bilty-destination').value.trim(),
      deliveryAddress: document.getElementById('bilty-delivery-address').value.trim(),
      material: document.getElementById('bilty-material').value.trim(),
      reference: document.getElementById('bilty-broker').value.trim(),
      consignor: document.getElementById('bilty-consignor').value.trim(),
      consignorGstin: document.getElementById('bilty-consignor-gstin').value.trim(),
      consignee: document.getElementById('bilty-consignee').value.trim(),
      consigneeGstin: document.getElementById('bilty-consignee-gstin').value.trim(),
      personLiableGst: document.getElementById('bilty-person-liable-gst').value,
      billingType: "Per Tonne",
      weight: weight,
      rate: rate,
      freight: freight,
      loadingCharges: loadingCharges,
      haltCharges: haltCharges,
      isGstPaidByParty: document.getElementById('bilty-gst-paid-party').value,
      gstAmount: gstAmount,
      gstDueAmount: gstDueAmount,
      commission: commission,
      status: "Transit",
      partyPaid: 0,
      partyDue: freight + loadingCharges + haltCharges + (document.getElementById('bilty-gst-paid-party').value === 'Yes' ? gstAmount : 0),
      ownerDue: freight - commission
    };

    if (!biltyData.truckNo) {
      AppUI.showToast("Truck Registration Number is required!", "danger");
      return;
    }

    if (this.editTripId) {
      await dbService.update('trips', this.editTripId, biltyData);
      AppUI.showToast(`Bilty ${biltyData.grNo} updated successfully!`, "success");
      biltyData.id = this.editTripId;
    } else {
      const created = await dbService.add('trips', biltyData);
      biltyData.id = created.id;
      AppUI.showToast(`Bilty ${biltyData.grNo} created successfully!`, "success");
    }

    this.currentBilty = biltyData;
    this.showPrintModal(biltyData);
  },

  showPrintModal(bilty) {
    const previewEl = document.getElementById('bilty-print-preview');
    if (!previewEl) return;

    // Determine company name based on firm
    let companyName = "TRIVENI TRANSPORT COMPANY";
    if (bilty.transport === 'MTC') companyName = "MAHAVEER TRANSPORT COMPANY";
    else if (bilty.transport === 'SMTC') companyName = "SHRI MAHAVEER TRANSPORT COMPANY";

    const grandTotal = (Number(bilty.freight) || 0) + (Number(bilty.loadingCharges) || 0) + (Number(bilty.haltCharges) || 0) + (bilty.isGstPaidByParty === 'Yes' ? (Number(bilty.gstAmount) || 0) : 0);

    const formatInr = (num) => num ? `₹${Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00';

    previewEl.innerHTML = `
      <div class="bilty-official-doc">
        <!-- Top Strip -->
        <div class="bilty-top-strip">
          <div class="bilty-top-left">
            <div>Rajasthan GST Code: 08</div>
            <div>GSTIN: 08AUJPP4423D1ZP</div>
          </div>
          <div class="bilty-top-center">
            All Subject to RAJSAMAND Jurisdiction
          </div>
          <div class="bilty-top-right">
            <div>M. 9414659401, 9828330686</div>
            <div>9414312586, 9982230036</div>
            <div style="font-weight: normal; font-size: 10px;">mahaveer0236@gmail.com</div>
          </div>
        </div>

        <!-- Brand Banner Box -->
        <div class="bilty-brand-box">
          <div class="bilty-truck-graphic">
            <svg viewBox="0 0 64 40" width="70" height="45" fill="#111">
              <rect x="2" y="10" width="38" height="20" rx="2" fill="#2563eb"/>
              <path d="M40 16 L52 16 L58 24 L58 30 L40 30 Z" fill="#1d4ed8"/>
              <circle cx="12" cy="31" r="5" fill="#111"/>
              <circle cx="12" cy="31" r="2" fill="#fff"/>
              <circle cx="30" cy="31" r="5" fill="#111"/>
              <circle cx="30" cy="31" r="2" fill="#fff"/>
              <circle cx="50" cy="31" r="5" fill="#111"/>
              <circle cx="50" cy="31" r="2" fill="#fff"/>
              <rect x="44" y="18" width="8" height="5" fill="#93c5fd"/>
            </svg>
          </div>

          <div class="brand-title-box">
            <h2>${companyName}</h2>
            <div class="brand-subtitle">FLEET OWNERS, TRANSPORT CONTRACTORS & DELIVERY AGENT</div>
            <div class="brand-address">N.H. 8, Bhagwanda, Dist. Rajsamand (Raj.)-313326</div>
          </div>

          <div class="bilty-truck-graphic">
            <svg viewBox="0 0 64 40" width="70" height="45" fill="#111">
              <rect x="2" y="10" width="38" height="20" rx="2" fill="#10b981"/>
              <path d="M40 16 L52 16 L58 24 L58 30 L40 30 Z" fill="#047857"/>
              <circle cx="12" cy="31" r="5" fill="#111"/>
              <circle cx="12" cy="31" r="2" fill="#fff"/>
              <circle cx="30" cy="31" r="5" fill="#111"/>
              <circle cx="30" cy="31" r="2" fill="#fff"/>
              <circle cx="50" cy="31" r="5" fill="#111"/>
              <circle cx="50" cy="31" r="2" fill="#fff"/>
              <rect x="44" y="18" width="8" height="5" fill="#a7f3d0"/>
            </svg>
          </div>
        </div>

        <!-- Table Grid Section -->
        <table class="bilty-table-grid">
          <tr>
            <td style="width: 50%;">
              <span class="field-label">CONSIGNOR GSTIN</span>
              <span class="field-value font-monospace">${bilty.consignorGstin || '08AAJFR3111N1Z1'}</span>
            </td>
            <td style="width: 25%;">
              <span class="field-label">TRUCK NO.:</span>
              <span class="field-value font-monospace fs-6">${bilty.truckNo}</span>
            </td>
            <td style="width: 25%;">
              <span class="field-label">G.R. NO.:</span>
              <span class="field-value font-monospace fs-6">${bilty.grSeq || bilty.shortGrNo || bilty.grNo}</span>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <span class="field-label">CONSIGNOR NAME & ADDRESS</span>
              <div class="field-value">${bilty.consignor || 'R.B. Dyes and Chemicals M.I.A. Alwar (Raj.)'}</div>
              <div style="font-size: 10px; color: #333; margin-top: 2px;">Dispatch From: AMET, DIST.RAJSAMAND (RAJ.)-313330</div>
            </td>
            <td colspan="2">
              <span class="field-label">DATE:</span>
              <span class="field-value">${AppUI.formatDate(bilty.tripStartDate)}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span class="field-label">FROM:</span>
              <span class="field-value">${bilty.origin || 'Rajsamand (Raj.)'}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="field-label">CONSIGNEE NAME & ADDRESS</span>
              <div class="field-value">${bilty.consignee}</div>
              <div style="font-size: 10px; color: #333; margin-top: 2px;">${bilty.deliveryAddress || bilty.destination}</div>
            </td>
            <td colspan="2" style="vertical-align: middle;">
              <span class="field-label">TO:</span>
              <span class="field-value fs-6 text-primary">${bilty.destination}</span>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="field-label">CONSIGNEE GST No.:</span>
              <span class="field-value font-monospace">${bilty.consigneeGstin || '06AAACH2676Q1Z4'}</span>
            </td>
          </tr>
        </table>

        <!-- Particulars & Weight Table -->
        <table class="bilty-table-grid" style="border-top: none;">
          <thead>
            <tr>
              <th style="width: 28%;">PERSON LIABLE FOR PAYING GST</th>
              <th style="width: 32%;">Material</th>
              <th style="width: 12%;">Weight<br>(Tonne)</th>
              <th style="width: 14%;">RATE<br>Per Tonne</th>
              <th style="width: 14%;">FREIGHT<br>To Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold; padding: 12px 4px;">
                ${bilty.personLiableGst || 'Consignor/Consignee/Transporter'}
              </td>
              <td style="padding: 12px 6px;">
                <strong>${bilty.material || 'Marble Powder'}</strong>
              </td>
              <td style="text-align: center; font-weight: bold; padding: 12px 4px;">
                ${bilty.weight ? Number(bilty.weight).toFixed(2) : '-'}
              </td>
              <td style="text-align: center; font-weight: bold; padding: 12px 4px;">
                ${bilty.rate ? `₹${Number(bilty.rate).toLocaleString('en-IN')}` : 'To be Billed'}
              </td>
              <td style="text-align: right; font-weight: bold; padding: 12px 6px;">
                ${bilty.freight ? formatInr(bilty.freight) : 'To be Billed'}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Bottom Split: Bank & Tax Calculation -->
        <div class="bilty-bottom-section">
          <div class="bilty-bottom-left">
            <div style="font-weight: bold; text-decoration: underline; margin-bottom: 2px;">Bank Details</div>
            <div>IDBI Bank, Rajsamand (Raj.)</div>
            <div>A/C No. <strong>104102000015659</strong></div>
            <div>IFSC: <strong>IBKL0000104</strong> | PAN: <strong>AUJPP4423D</strong></div>

            <table class="table table-sm table-bordered mb-0 mt-2" style="font-size: 10px; border: 1px solid #000;">
              <thead style="background: #f0f0f0;">
                <tr>
                  <th>E-way Bill No.</th>
                  <th>Bill No.</th>
                  <th class="text-end">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-monospace">${bilty.ewayBillNo || '7516 5237 4578'}</td>
                  <td class="font-monospace">${bilty.billNo || '2026-27/491'}</td>
                  <td class="text-end fw-bold">${bilty.invoiceValue ? formatInr(bilty.invoiceValue) : '₹222,600.00'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bilty-bottom-right">
            <table class="bilty-tax-table">
              <tr>
                <td class="tax-label">SGST@ 0.00%</td>
                <td class="tax-val">₹0.00</td>
              </tr>
              <tr>
                <td class="tax-label">CGST@ 0.00%</td>
                <td class="tax-val">₹0.00</td>
              </tr>
              <tr>
                <td class="tax-label">IGST@ 0.00%</td>
                <td class="tax-val">₹0.00</td>
              </tr>
              <tr>
                <td class="tax-label">Loading Charges</td>
                <td class="tax-val">${formatInr(bilty.loadingCharges || 0)}</td>
              </tr>
              <tr>
                <td class="tax-label">Halt Charges</td>
                <td class="tax-val">${formatInr(bilty.haltCharges || 0)}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td class="tax-label" style="font-size: 11px;">GRAND TOTAL</td>
                <td class="tax-val" style="font-size: 12px; color: #000;">${formatInr(grandTotal)}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Notes & Signature Strip -->
        <div class="bilty-footer-strip">
          <div class="bilty-notes">
            <div><strong>Note:</strong> 1. Rebooking Through H.O.</div>
            <div>2. Co. is not responsible for leakage, Breakage, Damage & any Loss.</div>
            <div>3. Co. is not responsible for damage & breakage of marble.</div>
          </div>
          <div class="bilty-signature-box">
            <div style="height: 35px;"></div>
            <div style="border-top: 1px solid #000; padding-top: 2px;">Booking Clerk</div>
          </div>
        </div>

        <!-- Daily Service Banner -->
        <div class="bilty-daily-service">
          Daily Service: Delhi, Himachal, Haryana, Punjab, U.P., Gujrat, Rajasthan, etc.
        </div>
      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('biltyPrintModal'));
    modal.show();
  },

  shareOnWhatsApp() {
    if (!this.currentBilty) return;
    const b = this.currentBilty;
    const grandTotal = (b.freight || 0) + (b.loadingCharges || 0) + (b.haltCharges || 0) + (b.isGstPaidByParty === 'Yes' ? (b.gstAmount || 0) : 0);

    const msg = `*--- ${b.transport} TRANSPORT BILTY ---*
*GR No:* ${b.grNo} (${b.shortGrNo || ''})
*Date:* ${AppUI.formatDate(b.tripStartDate)} | FY: ${b.financialYear || '2026-2027'}
${b.billNo ? `*Bill No:* ${b.billNo}\n` : ''}${b.ewayBillNo ? `*E-way Bill:* ${b.ewayBillNo}\n` : ''}*Truck:* ${b.truckNo}
*Driver:* ${b.driver || '-'} (${b.driverMobile || '-'})
*Route:* ${b.origin} ➔ ${b.destination}
${b.deliveryAddress ? `*Delivery Site:* ${b.deliveryAddress}\n` : ''}*Consignor:* ${b.consignor}
*Consignee:* ${b.consignee}
*Material:* ${b.material}
*Weight:* ${b.weight} MT @ ₹${b.rate}/MT
*Freight:* ${AppUI.formatCurrency(b.freight)}
${b.loadingCharges ? `*Loading Charges:* ${AppUI.formatCurrency(b.loadingCharges)}\n` : ''}${b.haltCharges ? `*Halt Charges:* ${AppUI.formatCurrency(b.haltCharges)}\n` : ''}${b.gstAmount ? `*GST:* ${AppUI.formatCurrency(b.gstAmount)} (${b.isGstPaidByParty})\n` : ''}*Grand Total:* ${AppUI.formatCurrency(grandTotal)}
*Status:* ${b.status}

_MTC & TTC Logistics Management System_`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
};

document.addEventListener('DOMContentLoaded', () => BiltyBookingModule.init());
