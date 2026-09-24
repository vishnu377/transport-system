/**
 * MTC & TTC Logistics Management System
 * Bilty (Lorry Receipt / LR) Hub & Consignment Engine
 * 
 * Features:
 * - Dual View: "+ Create New Bilty" (5-Section Form + Live Preview Dock) & "Bilty Register" (AppSheet 6,643+ feed)
 * - Complete AppSheet parity: Load Type (Under/Over Load), Dual Freight (Actual vs Bilty), Commission/Expenses Paid/Due, Any Debt integration
 * - Sequential auto-incrementing G.R. numbering by firm & financial year
 * - Smart fleet autocomplete (74 trucks, owners, drivers, brokers)
 * - Date-grouped feed with day subtotals
 * - AppSheet 3-Card Details Modal
 * - Pixel-Perfect A4 Consignment Note Print (4 copy watermarks) & Instant WhatsApp Sharing
 */

const BiltyBookingModule = {
  // State
  allTrips: [],
  filteredTrips: [],
  parties: [],
  truckOwners: [],
  drivers: [],
  brokers: [],
  debts: [],

  currentView: 'create', // 'create' | 'register'
  selectedFirm: 'ALL',
  selectedFY: '2026-2027',
  selectedMonth: 'ALL',
  selectedLoadType: 'ALL',
  searchQuery: '',
  pageSize: 100,
  currentPage: 1,

  editTripId: null,
  isGRLocked: true,
  currentPrintCopy: 'CONSIGNOR COPY',
  currentActiveBilty: null,

  async init() {
    AppUI.renderSidebar('bilty');
    await this.loadAllData();
    this.populateDatalistsAndDropdowns();

    // Check URL parameters for edit mode or initial view
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('id');
    const viewParam = urlParams.get('view');

    if (editId) {
      this.editTripId = editId;
      await this.loadTripForEditing(editId);
    } else {
      this.initNewFormDefaults();
      await this.generateBiltyNumber();
    }

    if (viewParam === 'register') {
      this.switchView('register');
    }

    this.bindFormEvents();
    this.updateKPIs();
    this.renderMonthBar();
    this.applyRegisterFilters();
    this.updateLivePreview();
  },

  // ----------------------------------------------------
  // DATA LOADING
  // ----------------------------------------------------
  async loadAllData() {
    this.allTrips = await dbService.getAll('trips');
    this.parties = await dbService.getAll('parties');
    this.truckOwners = await dbService.getAll('truckOwners');
    this.drivers = await dbService.getAll('drivers');
    this.brokers = await dbService.getAll('brokers');
    this.debts = await dbService.getAll('debts');

    // Auto-enrich parties from real trips if parties table is small
    if (this.parties.length <= 5 && Array.isArray(this.allTrips)) {
      const partySet = new Map();
      this.allTrips.forEach(t => {
        if (t.consignor && !partySet.has(t.consignor)) {
          partySet.set(t.consignor, { name: t.consignor, gstin: t.consignorGstin || '', address: t.origin || '' });
        }
        if (t.consignee && !partySet.has(t.consignee)) {
          partySet.set(t.consignee, { name: t.consignee, gstin: t.consigneeGstin || '', address: t.deliveryAddress || '' });
        }
      });
      if (partySet.size > this.parties.length) {
        this.parties = Array.from(partySet.values());
      }
    }
  },

  populateDatalistsAndDropdowns() {
    // 1. Fleet Trucks Datalist
    const trucksDatalist = document.getElementById('fleetTrucksList');
    if (trucksDatalist) {
      const trucks = typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_TRUCKS)
        ? window.INITIAL_EXCEL_TRUCKS
        : [];
      
      const truckSet = new Set(trucks.map(t => t.truckNo));
      this.truckOwners.forEach(o => {
        if (o.truckNo) truckSet.add(o.truckNo);
      });
      this.allTrips.slice(0, 500).forEach(t => {
        if (t.truckNo) truckSet.add(t.truckNo);
      });

      trucksDatalist.innerHTML = Array.from(truckSet).sort().map(no => `<option value="${no}">`).join('');
    }

    // 2. Truck Owners Datalist
    const ownersDatalist = document.getElementById('truckOwnersList');
    if (ownersDatalist) {
      const ownerNames = new Set(this.truckOwners.map(o => o.name || o.ownerName).filter(Boolean));
      this.allTrips.slice(0, 500).forEach(t => {
        if (t.truckOwner) ownerNames.add(t.truckOwner);
      });
      ownersDatalist.innerHTML = Array.from(ownerNames).sort().map(name => `<option value="${name}">`).join('');
    }

    // 3. Drivers Datalist
    const driversDatalist = document.getElementById('driversList');
    if (driversDatalist) {
      const driverNames = new Set(this.drivers.map(d => d.name).filter(Boolean));
      this.allTrips.slice(0, 500).forEach(t => {
        if (t.driver) driverNames.add(t.driver);
      });
      driversDatalist.innerHTML = Array.from(driverNames).sort().map(name => `<option value="${name}">`).join('');
    }

    // 4. Brokers Datalist
    const brokersDatalist = document.getElementById('brokersList');
    if (brokersDatalist) {
      const brokerNames = new Set(this.brokers.map(b => b.name).filter(Boolean));
      // Add real AppSheet brokers
      ['Ramniwas Ji Nilkant Marble 7976808636', 'Dilip Singh Patodi 9604260008', 'Tanuj Kothari Udaipur 8209727398', 'Dinesh Sharma Kishangarh 7733069670', 'Rajesh Rao Udaipur 7023678976', 'Pavan Bansal Dadri 9311320045'].forEach(b => brokerNames.add(b));
      brokersDatalist.innerHTML = Array.from(brokerNames).sort().map(name => `<option value="${name}">`).join('');
    }

    // 5. Consignor & Consignee Selects
    const consignorSelect = document.getElementById('bilty-consignor');
    const consigneeSelect = document.getElementById('bilty-consignee');

    if (consignorSelect && consigneeSelect) {
      let optionsHTML = '<option value="">-- Select Party / Enter Name --</option>';
      this.parties.forEach(p => {
        optionsHTML += `<option value="${p.name}" data-gstin="${p.gstin || ''}" data-address="${p.address || ''}">${p.name}</option>`;
      });
      consignorSelect.innerHTML = optionsHTML;
      consigneeSelect.innerHTML = optionsHTML;
    }
  },

  initNewFormDefaults() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bilty-date');
    if (dateInput) dateInput.value = today;

    const previewDate = document.getElementById('preview-date');
    if (previewDate) {
      const [y, m, d] = today.split('-');
      previewDate.innerText = `${d}/${m}/${y}`;
    }

    this.setLoadType('Under Load');
  },

  // ----------------------------------------------------
  // SEQUENTIAL G.R. NUMBER GENERATOR
  // ----------------------------------------------------
  async generateBiltyNumber() {
    const firm = document.getElementById('bilty-firm').value || 'TTC';
    const year = document.getElementById('bilty-year').value || '2026-2027';

    let maxSeq = 0;
    this.allTrips.forEach(t => {
      const tFirm = t.transport || (t.grNo && t.grNo.includes('MTC') ? 'MTC' : 'TTC');
      const tYear = t.financialYear || (t.grNo && t.grNo.startsWith('2026-2027') ? '2026-2027' : '');
      
      if (tFirm === firm && (tYear === year || !tYear)) {
        const seq = parseInt(t.grSeq || (t.shortGrNo ? t.shortGrNo.split('_')[0] : 0), 10);
        if (!isNaN(seq) && seq > maxSeq && seq < 100000) {
          maxSeq = seq;
        }
      }
    });

    // Fallback baseline if starting fresh
    if (maxSeq === 0) {
      if (firm === 'TTC') maxSeq = 2207;
      else if (firm === 'SMTC') maxSeq = 193;
      else if (firm === 'MTC') maxSeq = 1317;
      else maxSeq = 100;
    }

    const nextSeq = maxSeq + 1;
    const shortGr = `${nextSeq}_${firm}`;
    const fullGr = `${year}-${shortGr}`;

    document.getElementById('bilty-gr-no').value = fullGr;
    document.getElementById('bilty-short-gr').value = shortGr;
    
    const previewBadge = document.getElementById('preview-gr-badge');
    if (previewBadge) previewBadge.innerText = `G.R. NO: ${shortGr}`;
  },

  regenerateGR() {
    this.generateBiltyNumber();
    AppUI.showToast("G.R. Number refreshed to next sequential counter.", "info");
  },

  toggleLockGR() {
    this.isGRLocked = !this.isGRLocked;
    const grInput = document.getElementById('bilty-gr-no');
    const lockIcon = document.getElementById('lock-icon');
    const lockText = document.getElementById('lock-text');

    if (this.isGRLocked) {
      grInput.readOnly = true;
      grInput.classList.add('bg-light');
      lockIcon.className = 'bi bi-lock-fill text-danger';
      lockText.innerText = 'Locked';
    } else {
      grInput.readOnly = false;
      grInput.classList.remove('bg-light');
      lockIcon.className = 'bi bi-unlock-fill text-success';
      lockText.innerText = 'Unlocked';
      grInput.focus();
    }
  },

  // ----------------------------------------------------
  // EVENT BINDINGS & REAL-TIME CALCULATIONS
  // ----------------------------------------------------
  bindFormEvents() {
    const firmEl = document.getElementById('bilty-firm');
    const yearEl = document.getElementById('bilty-year');
    const dateEl = document.getElementById('bilty-date');
    const truckEl = document.getElementById('bilty-truck-no');
    const consignorEl = document.getElementById('bilty-consignor');
    const consigneeEl = document.getElementById('bilty-consignee');

    if (firmEl) {
      firmEl.addEventListener('change', () => {
        if (!this.editTripId) this.generateBiltyNumber();
        this.updateFirmBranding();
        this.updateLivePreview();
      });
    }

    if (yearEl) {
      yearEl.addEventListener('change', () => {
        document.getElementById('header-fy-badge').innerText = `FY ${yearEl.value}`;
        if (!this.editTripId) this.generateBiltyNumber();
        this.updateLivePreview();
      });
    }

    if (dateEl) {
      dateEl.addEventListener('change', () => {
        this.updateLivePreview();
      });
    }

    // Truck Autocomplete & linking
    if (truckEl) {
      truckEl.addEventListener('input', (e) => {
        const val = e.target.value.trim().toUpperCase();
        this.autoFillTruckDetails(val);
        this.updateLivePreview();
      });
    }

    // Consignor auto-fill
    if (consignorEl) {
      consignorEl.addEventListener('change', (e) => {
        const opt = e.target.selectedOptions[0];
        if (opt) {
          const gstin = opt.getAttribute('data-gstin') || '';
          if (gstin) document.getElementById('bilty-consignor-gstin').value = gstin;
        }
        this.updateLivePreview();
      });
    }

    // Consignee auto-fill
    if (consigneeEl) {
      consigneeEl.addEventListener('change', (e) => {
        const opt = e.target.selectedOptions[0];
        if (opt) {
          const gstin = opt.getAttribute('data-gstin') || '';
          const addr = opt.getAttribute('data-address') || '';
          if (gstin) document.getElementById('bilty-consignee-gstin').value = gstin;
          if (addr) document.getElementById('bilty-delivery-address').value = addr;
        }
        this.updateLivePreview();
      });
    }

    // Calculation listeners
    const calcInputs = [
      'bilty-weight', 'bilty-rate', 'bilty-loading-charges', 'bilty-halt-charges',
      'bilty-gst-paid-party', 'bilty-gst-amount', 'bilty-destination', 'bilty-material',
      'bilty-eway-bill', 'bilty-print-weight', 'bilty-print-rate'
    ];

    calcInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.recalculateFreightAndTotals());
        el.addEventListener('change', () => this.recalculateFreightAndTotals());
      }
    });

    // Form submit
    const form = document.getElementById('bilty-booking-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveBilty('print');
      });
    }
  },

  autoFillTruckDetails(truckNo) {
    if (!truckNo || truckNo.length < 4) return;

    // Check registered trucks
    const registeredTrucks = typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_TRUCKS)
      ? window.INITIAL_EXCEL_TRUCKS
      : [];
    
    const matched = registeredTrucks.find(t => t.truckNo === truckNo);
    const badge = document.getElementById('truck-fleet-badge');

    if (matched) {
      if (badge) {
        badge.className = 'badge bg-success ms-1';
        badge.innerText = 'Own Fleet';
      }
      if (!document.getElementById('bilty-owner').value) {
        document.getElementById('bilty-owner').value = matched.name || 'MTC Fleet';
      }
      if (!document.getElementById('bilty-owner-mobile').value) {
        document.getElementById('bilty-owner-mobile').value = matched.mobile || '9414312586';
      }
    } else {
      if (badge) {
        badge.className = 'badge bg-secondary ms-1';
        badge.innerText = 'Market Truck';
      }
    }

    // Also look up recent trips for this truck to auto-fill driver
    const recentTrip = this.allTrips.find(t => t.truckNo === truckNo && t.driver);
    if (recentTrip) {
      if (!document.getElementById('bilty-driver').value) {
        document.getElementById('bilty-driver').value = recentTrip.driver;
      }
      if (!document.getElementById('bilty-driver-mobile').value && recentTrip.driverMobile) {
        document.getElementById('bilty-driver-mobile').value = recentTrip.driverMobile;
      }
    }
  },

  recalculateFreightAndTotals() {
    const weight = parseFloat(document.getElementById('bilty-weight').value) || 0;
    const rate = parseFloat(document.getElementById('bilty-rate').value) || 0;
    const freight = weight * rate;
    
    document.getElementById('bilty-freight').value = freight ? freight.toFixed(2) : '0.00';

    // Sync Bilty Print fields if empty or Per Tonne
    const printType = document.getElementById('bilty-print-billing-type').value;
    const printWeight = document.getElementById('bilty-print-weight');
    const printRate = document.getElementById('bilty-print-rate');
    const printAmount = document.getElementById('bilty-print-amount');

    if (printType === 'Per Tonne') {
      if (!printWeight.value || printWeight.value == 0) printWeight.value = weight || '';
      if (!printRate.value || printRate.value == 0) printRate.value = rate || '';
      printAmount.value = freight ? freight.toFixed(2) : '0.00';
    } else if (printType === 'To be Billed') {
      printRate.value = 'To be Billed';
      printAmount.value = 'To be Billed';
    }

    const loading = parseFloat(document.getElementById('bilty-loading-charges').value) || 0;
    const halt = parseFloat(document.getElementById('bilty-halt-charges').value) || 0;
    const gstPaid = document.getElementById('bilty-gst-paid-party').value;
    const gstAmountInput = document.getElementById('bilty-gst-amount');

    let gst = 0;
    if (gstPaid === 'Yes') {
      if (!parseFloat(gstAmountInput.value) && freight > 0) {
        gstAmountInput.value = (freight * 0.05).toFixed(2);
      }
      gst = parseFloat(gstAmountInput.value) || 0;
    } else {
      gstAmountInput.value = '0';
    }

    const grandTotal = freight + loading + halt + gst;
    document.getElementById('bilty-grand-total').value = grandTotal ? grandTotal.toFixed(2) : '0.00';

    this.updateLivePreview();
  },

  handleBiltyBillingTypeChange() {
    const val = document.getElementById('bilty-print-billing-type').value;
    const rateInput = document.getElementById('bilty-print-rate');
    const amtInput = document.getElementById('bilty-print-amount');

    if (val === 'To be Billed') {
      rateInput.value = 'To be Billed';
      amtInput.value = 'To be Billed';
    } else if (val === 'Per Tonne') {
      this.recalculateFreightAndTotals();
    }
  },

  // ----------------------------------------------------
  // QUICK SELECTION CHIPS & TOGGLES
  // ----------------------------------------------------
  setOrigin(val, el) {
    document.getElementById('bilty-origin').value = val;
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.quick-chip').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    }
    this.updateLivePreview();
  },

  setMaterial(val, el) {
    document.getElementById('bilty-material').value = val;
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.quick-chip').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    }
    this.updateLivePreview();
  },

  setLoadType(val) {
    document.getElementById('bilty-load-type').value = val;
    const btnUnder = document.getElementById('btn-load-under');
    const btnOver = document.getElementById('btn-load-over');

    if (val === 'Over Load') {
      btnOver.className = 'load-type-btn active overload';
      btnUnder.className = 'load-type-btn';
    } else {
      btnUnder.className = 'load-type-btn active underload';
      btnOver.className = 'load-type-btn';
    }
    this.updateLivePreview();
  },

  toggleDispatchFrom(show) {
    const box = document.getElementById('dispatch-from-box');
    if (box) box.className = show ? 'mt-2' : 'mt-2 d-none';
  },

  toggleShipTo(show) {
    const box = document.getElementById('ship-to-box');
    if (box) box.className = show ? 'mt-2' : 'mt-2 d-none';
  },

  toggleDebtSection(show) {
    const box = document.getElementById('bilty-debt-box');
    if (box) box.className = show ? 'mt-3 p-3 bg-light rounded border' : 'mt-3 p-3 bg-light rounded border d-none';
  },

  // ----------------------------------------------------
  // LIVE PREVIEW DOCK UPDATER
  // ----------------------------------------------------
  updateFirmBranding() {
    const firm = document.getElementById('bilty-firm').value || 'TTC';
    const titleEl = document.getElementById('preview-firm-title');
    if (!titleEl) return;

    if (firm === 'MTC') {
      titleEl.innerText = 'MAHAVEER TRANSPORT COMPANY';
    } else if (firm === 'SMTC') {
      titleEl.innerText = 'SHREE MAHAVEER TRANSPORT CORP.';
    } else {
      titleEl.innerText = 'THE TRANSPORT CORPORATION';
    }
  },

  updateLivePreview() {
    const gr = document.getElementById('bilty-short-gr').value || 'PENDING';
    const dateVal = document.getElementById('bilty-date').value;
    const truckVal = document.getElementById('bilty-truck-no').value || '---';
    const ownerVal = document.getElementById('bilty-owner').value || '---';
    const fromVal = document.getElementById('bilty-origin').value || '---';
    const toVal = document.getElementById('bilty-destination').value || '---';
    const consignorVal = document.getElementById('bilty-consignor').value || '---';
    const consigneeVal = document.getElementById('bilty-consignee').value || '---';
    const materialVal = document.getElementById('bilty-material').value || 'Marble Powder';
    const wtVal = document.getElementById('bilty-weight').value || '0';
    const rateVal = document.getElementById('bilty-rate').value || '0';
    const freightVal = document.getElementById('bilty-freight').value || '0.00';
    const ewayVal = document.getElementById('bilty-eway-bill').value || '---';
    const loadTypeVal = document.getElementById('bilty-load-type').value || 'Under Load';

    let displayDate = '--/--/----';
    if (dateVal) {
      const parts = dateVal.split('-');
      if (parts.length === 3) displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const grBadge = document.getElementById('preview-gr-badge');
    if (grBadge) grBadge.innerText = `G.R. NO: ${gr}`;

    const pDate = document.getElementById('preview-date');
    if (pDate) pDate.innerText = displayDate;

    const pTruck = document.getElementById('preview-truck');
    if (pTruck) pTruck.innerText = truckVal.toUpperCase();

    const pOwner = document.getElementById('preview-owner');
    if (pOwner) pOwner.innerText = ownerVal;

    const pRoute = document.getElementById('preview-route');
    if (pRoute) pRoute.innerHTML = `${fromVal} &rarr; ${toVal}`;

    const pConsignor = document.getElementById('preview-consignor');
    if (pConsignor) pConsignor.innerText = consignorVal;

    const pConsignee = document.getElementById('preview-consignee');
    if (pConsignee) pConsignee.innerText = consigneeVal;

    const pMat = document.getElementById('preview-material');
    if (pMat) pMat.innerText = materialVal;

    const pWtRate = document.getElementById('preview-wt-rate');
    if (pWtRate) pWtRate.innerText = `${wtVal} MT @ ₹${rateVal}`;

    const pFreight = document.getElementById('preview-freight');
    if (pFreight) pFreight.innerText = AppUI.formatCurrency(freightVal);

    const pEway = document.getElementById('preview-eway');
    if (pEway) pEway.innerText = ewayVal;

    const pLoad = document.getElementById('preview-load-type');
    if (pLoad) {
      pLoad.innerHTML = loadTypeVal === 'Over Load'
        ? '<span class="badge bg-warning text-dark">Over Load</span>'
        : '<span class="badge bg-info-subtle text-info">Under Load</span>';
    }
  },

  // ----------------------------------------------------
  // SAVING ENGINE & FINANCIAL INTEGRATION
  // ----------------------------------------------------
  async saveBilty(mode = 'print') {
    const truckNo = document.getElementById('bilty-truck-no').value.trim().toUpperCase();
    const consignor = document.getElementById('bilty-consignor').value.trim();
    const consignee = document.getElementById('bilty-consignee').value.trim();
    const origin = document.getElementById('bilty-origin').value.trim();
    const destination = document.getElementById('bilty-destination').value.trim();
    const weight = parseFloat(document.getElementById('bilty-weight').value) || 0;
    const rate = parseFloat(document.getElementById('bilty-rate').value) || 0;

    if (!truckNo) {
      AppUI.showToast("Please enter Truck Registration Number!", "danger");
      document.getElementById('bilty-truck-no').focus();
      return;
    }
    if (!consignor) {
      AppUI.showToast("Please select or enter Consignor party!", "danger");
      document.getElementById('bilty-consignor').focus();
      return;
    }
    if (!consignee) {
      AppUI.showToast("Please select or enter Consignee party!", "danger");
      document.getElementById('bilty-consignee').focus();
      return;
    }
    if (!destination) {
      AppUI.showToast("Please specify Destination!", "danger");
      document.getElementById('bilty-destination').focus();
      return;
    }

    const firm = document.getElementById('bilty-firm').value;
    const year = document.getElementById('bilty-year').value;
    const fullGr = document.getElementById('bilty-gr-no').value.trim();
    const shortGr = document.getElementById('bilty-short-gr').value.trim();
    const grSeq = shortGr.split('_')[0] || '';
    const date = document.getElementById('bilty-date').value || new Date().toISOString().split('T')[0];

    const freight = parseFloat(document.getElementById('bilty-freight').value) || (weight * rate);
    const loadingCharges = parseFloat(document.getElementById('bilty-loading-charges').value) || 0;
    const haltCharges = parseFloat(document.getElementById('bilty-halt-charges').value) || 0;
    const gstPaid = document.getElementById('bilty-gst-paid-party').value;
    const gstAmount = parseFloat(document.getElementById('bilty-gst-amount').value) || 0;
    const gstDueAmount = parseFloat(document.getElementById('bilty-gst-due').value) || 0;
    const grandTotal = freight + loadingCharges + haltCharges + (gstPaid === 'Yes' ? gstAmount : 0);

    const commission = parseFloat(document.getElementById('bilty-commission').value) || 0;
    const otherExpense = parseFloat(document.getElementById('bilty-other-expense').value) || 0;

    const biltyData = {
      id: this.editTripId || `TRIP_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      grNo: fullGr,
      grSeq: grSeq,
      shortGrNo: shortGr,
      transport: firm,
      financialYear: year,
      tripStartDate: date,
      biltyType: document.getElementById('bilty-type').value,
      isGstApplicable: document.getElementById('bilty-is-gst').value,
      truckNo: truckNo,
      truckOwner: document.getElementById('bilty-owner').value.trim() || `${truckNo} Owner`,
      ownerMobile: document.getElementById('bilty-owner-mobile').value.trim(),
      loadType: document.getElementById('bilty-load-type').value,
      driver: document.getElementById('bilty-driver').value.trim() || 'Assigned Driver',
      driverMobile: document.getElementById('bilty-driver-mobile').value.trim(),
      reference: document.getElementById('bilty-broker').value.trim(),

      origin: origin,
      destination: destination,
      consignor: consignor,
      consignorGstin: document.getElementById('bilty-consignor-gstin').value.trim(),
      dispatchFromAddress: document.getElementById('bilty-dispatch-from').value.trim(),
      consignee: consignee,
      consigneeGstin: document.getElementById('bilty-consignee-gstin').value.trim(),
      deliveryAddress: document.getElementById('bilty-delivery-address').value.trim(),
      shipToAddress: document.getElementById('bilty-ship-to').value.trim(),

      material: document.getElementById('bilty-material').value.trim(),
      billNo: document.getElementById('bilty-bill-no').value.trim(),
      invoiceValue: parseFloat(document.getElementById('bilty-invoice-value').value) || 0,
      ewayBillNo: document.getElementById('bilty-eway-bill').value.trim(),

      billingType: document.getElementById('bilty-billing-type').value,
      weight: weight,
      rate: rate,
      freight: freight,

      biltyBillingType: document.getElementById('bilty-print-billing-type').value,
      biltyWeight: parseFloat(document.getElementById('bilty-print-weight').value) || weight,
      biltyRate: document.getElementById('bilty-print-rate').value.trim() || rate,
      biltyAmount: document.getElementById('bilty-print-amount').value.trim() || freight,

      loadingCharges: loadingCharges,
      haltCharges: haltCharges,
      personLiableGst: document.getElementById('bilty-person-liable-gst').value,
      isGstPaidByParty: gstPaid,
      gstAmount: gstAmount,
      gstDueAmount: gstDueAmount,

      commission: commission,
      commissionStatus: document.getElementById('bilty-commission-status').value,
      commissionMode: document.getElementById('bilty-commission-mode').value,
      commissionDesc: document.getElementById('bilty-commission-desc').value.trim(),

      otherExpense: otherExpense,
      otherStatus: document.getElementById('bilty-other-status').value,
      otherMode: document.getElementById('bilty-other-mode').value,
      otherDesc: document.getElementById('bilty-other-desc').value.trim(),

      status: 'Transit',
      partyDue: grandTotal,
      partyPaid: 0,
      ownerDue: freight - commission
    };

    // Save Bilty / Trip to database
    if (this.editTripId) {
      await dbService.update('trips', this.editTripId, biltyData);
      AppUI.showToast(`Bilty ${biltyData.grNo} updated successfully!`, "success");
    } else {
      await dbService.add('trips', biltyData);
      AppUI.showToast(`Bilty ${biltyData.grNo} saved successfully!`, "success");
    }

    // Check if Any Debt? is checked -> Automatically link to Financial Ledger!
    const isDebtChecked = document.getElementById('toggle-any-debt').checked;
    const debtAmount = parseFloat(document.getElementById('bilty-debt-amount').value) || 0;
    if (isDebtChecked && debtAmount > 0) {
      const monthNames = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      const dateObj = new Date(date);
      const mIdx = (dateObj.getMonth() + 9) % 12 + 1; // FY Month sequence
      const monthKey = `${mIdx} ${monthNames[(dateObj.getMonth() + 9) % 12]}`;

      const [y, m, d] = date.split('-');
      const displayDate = `${d}/${m}/${y}`;

      const debtRecord = {
        id: `DEBT_BILTY_${Date.now()}`,
        date: date,
        displayDate: displayDate,
        fy: year,
        monthKey: monthKey,
        grNo: shortGr,
        truckNo: truckNo,
        from: origin,
        to: destination,
        company: firm,
        truckOwner: biltyData.truckOwner,
        debtType: 'Cash Advance',
        dueAmount: debtAmount,
        debtAmount: debtAmount,
        totalReturned: 0,
        debtMode: document.getElementById('bilty-debt-mode').value,
        borrowerName: document.getElementById('bilty-debt-borrower').value.trim() || biltyData.truckOwner,
        receiverName: biltyData.driver,
        remarks: document.getElementById('bilty-debt-remarks').value.trim() || `Advance en-route cash linked to Bilty G.R. ${fullGr}`,
        returnedAmounts: []
      };

      await dbService.add('debts', debtRecord);
      console.log(" Linked Debt created in Financial Ledger:", debtRecord);
      AppUI.showToast(`₹${debtAmount} open debt entry added to Financial Ledger!`, "info");
    }

    // Reload trips data
    this.allTrips = await dbService.getAll('trips');
    this.updateKPIs();
    this.applyRegisterFilters();

    this.currentActiveBilty = biltyData;

    if (mode === 'print') {
      this.openPrintModal(biltyData);
    } else if (mode === 'whatsapp') {
      this.shareOnWhatsApp(biltyData);
    } else {
      this.resetForm();
    }
  },

  saveAndWhatsApp() {
    this.saveBilty('whatsapp');
  },

  saveOnly() {
    this.saveBilty('only');
  },

  resetForm() {
    this.editTripId = null;
    document.getElementById('bilty-booking-form').reset();
    this.initNewFormDefaults();
    this.generateBiltyNumber();
    this.recalculateFreightAndTotals();

    // Reset button states
    const submitBtn = document.getElementById('bilty-submit-btn');
    if (submitBtn) {
      submitBtn.className = 'btn btn-primary btn-lg shadow fw-bold';
      submitBtn.innerHTML = '<i class="bi bi-printer-fill me-1"></i> Save & Print Official Bilty';
    }

    AppUI.showToast("Form reset. Ready for next consignment note.", "info");
  },

  // ----------------------------------------------------
  // VIEW SWITCHER (Create Form <-> Bilty Register)
  // ----------------------------------------------------
  switchView(viewName) {
    this.currentView = viewName;
    const createView = document.getElementById('bilty-create-view');
    const registerView = document.getElementById('bilty-register-view');
    const btnCreate = document.getElementById('btn-view-create');
    const btnRegister = document.getElementById('btn-view-register');

    if (viewName === 'register') {
      createView.classList.add('d-none');
      registerView.classList.remove('d-none');
      btnRegister.className = 'btn btn-primary active';
      btnCreate.className = 'btn btn-outline-primary';
      document.getElementById('bilty-breadcrumb').innerText = 'Home > Bilty Booking > Bilty Register';
      this.applyRegisterFilters();
    } else {
      registerView.classList.add('d-none');
      createView.classList.remove('d-none');
      btnCreate.className = 'btn btn-primary active';
      btnRegister.className = 'btn btn-outline-primary';
      document.getElementById('bilty-breadcrumb').innerText = 'Home > Bilty Booking > Create & Manage Consignments';
    }
  },

  // ----------------------------------------------------
  // TOP KPI SUMMARY UPDATER
  // ----------------------------------------------------
  updateKPIs() {
    const totalCount = this.allTrips.length;
    document.getElementById('header-total-count').innerText = totalCount.toLocaleString('en-IN');
    document.getElementById('kpi-total-bilties').innerText = totalCount.toLocaleString('en-IN');

    const todayStr = new Date().toISOString().split('T')[0];
    let todayCount = 0;
    let ttcCount = 0;
    let mtcCount = 0;
    let smtcCount = 0;
    let totalFreight = 0;

    this.allTrips.forEach(t => {
      if (t.tripStartDate === todayStr) todayCount++;
      const firm = t.transport || (t.grNo && t.grNo.includes('MTC') ? 'MTC' : 'TTC');
      if (firm === 'TTC') ttcCount++;
      else if (firm === 'MTC') mtcCount++;
      else if (firm === 'SMTC') smtcCount++;

      totalFreight += (Number(t.freight) || 0);
    });

    document.getElementById('kpi-today-bilties').innerText = todayCount;
    document.getElementById('kpi-ttc-bilties').innerText = ttcCount.toLocaleString('en-IN');
    document.getElementById('kpi-mtc-bilties').innerText = mtcCount.toLocaleString('en-IN');
    document.getElementById('kpi-smtc-bilties').innerText = smtcCount.toLocaleString('en-IN');
    document.getElementById('kpi-total-freight').innerText = AppUI.formatCurrency(totalFreight);
  },

  // ----------------------------------------------------
  // BILTY REGISTER (APPSHEET 6,643+ CONSIGNMENT FEED)
  // ----------------------------------------------------
  renderMonthBar() {
    const container = document.getElementById('reg-month-bar');
    if (!container) return;

    const allMonths = [
      '12 Mar', '11 Feb', '10 Jan', '9 Dec', '8 Nov', '7 Oct',
      '6 Sep', '5 Aug', '4 Jul', '3 Jun', '2 May', '1 Apr'
    ];

    const monthCounts = {};
    allMonths.forEach(m => monthCounts[m] = 0);

    this.allTrips.forEach(t => {
      if (this.selectedFY === 'ALL' || t.financialYear === this.selectedFY || (t.grNo && t.grNo.includes(this.selectedFY))) {
        if (t.tripStartDate) {
          const parts = t.tripStartDate.split('-');
          if (parts.length === 3) {
            const m = parseInt(parts[1], 10);
            const mKey = `${(m + 8) % 12 + 1} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1]}`;
            if (monthCounts.hasOwnProperty(mKey)) monthCounts[mKey]++;
          }
        }
      }
    });

    let html = `
      <button class="month-pill ${this.selectedMonth === 'ALL' ? 'active' : ''}" onclick="BiltyBookingModule.filterRegisterMonth('ALL')">
        <span>All Months</span>
      </button>
    `;

    allMonths.forEach(m => {
      const cnt = monthCounts[m] || 0;
      if (cnt > 0 || this.selectedFY === 'ALL') {
        html += `
          <button class="month-pill ${this.selectedMonth === m ? 'active' : ''}" onclick="BiltyBookingModule.filterRegisterMonth('${m}')">
            <span>${m}</span>
            <span class="badge bg-secondary ms-1">${cnt}</span>
          </button>
        `;
      }
    });

    container.innerHTML = html;
  },

  filterRegisterFirm(firm) {
    this.selectedFirm = firm;
    ['all', 'ttc', 'mtc', 'smtc'].forEach(f => {
      const btn = document.getElementById(`filter-firm-${f}`);
      if (btn) btn.className = (firm.toLowerCase() === f) ? 'btn btn-primary active' : 'btn btn-outline-primary';
    });
    this.currentPage = 1;
    this.applyRegisterFilters();
  },

  filterRegisterFY(fy) {
    this.selectedFY = fy;
    this.renderMonthBar();
    this.currentPage = 1;
    this.applyRegisterFilters();
  },

  filterRegisterMonth(monthKey) {
    this.selectedMonth = monthKey;
    this.renderMonthBar();
    this.currentPage = 1;
    this.applyRegisterFilters();
  },

  filterRegisterLoad(loadType) {
    this.selectedLoadType = loadType;
    this.currentPage = 1;
    this.applyRegisterFilters();
  },

  onSearchInput(val) {
    this.searchQuery = (val || '').toLowerCase().trim();
    this.currentPage = 1;
    this.applyRegisterFilters();
  },

  clearSearch() {
    const sInput = document.getElementById('reg-search-input');
    if (sInput) sInput.value = '';
    this.onSearchInput('');
  },

  changePageSize(val) {
    this.pageSize = val === 'ALL' ? 'ALL' : parseInt(val, 10);
    this.currentPage = 1;
    this.renderRegisterFeed();
  },

  applyRegisterFilters() {
    const query = this.searchQuery;

    this.filteredTrips = this.allTrips.filter(t => {
      // Firm filter
      const tFirm = t.transport || (t.grNo && t.grNo.includes('MTC') ? 'MTC' : 'TTC');
      if (this.selectedFirm !== 'ALL' && tFirm !== this.selectedFirm) return false;

      // FY filter
      if (this.selectedFY !== 'ALL') {
        const hasFY = (t.financialYear === this.selectedFY) || (t.grNo && t.grNo.includes(this.selectedFY));
        if (!hasFY) return false;
      }

      // Load Type filter
      if (this.selectedLoadType !== 'ALL') {
        if (t.loadType !== this.selectedLoadType) return false;
      }

      // Month filter
      if (this.selectedMonth !== 'ALL' && t.tripStartDate) {
        const parts = t.tripStartDate.split('-');
        if (parts.length === 3) {
          const m = parseInt(parts[1], 10);
          const mKey = `${(m + 8) % 12 + 1} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1]}`;
          if (mKey !== this.selectedMonth) return false;
        }
      }

      // Text query search
      if (query) {
        const target = [
          t.grNo || '',
          t.shortGrNo || '',
          t.truckNo || '',
          t.consignor || '',
          t.consignee || '',
          t.origin || '',
          t.destination || '',
          t.driver || '',
          t.material || '',
          t.billNo || '',
          t.ewayBillNo || '',
          t.reference || ''
        ].join(' ').toLowerCase();

        if (!target.includes(query)) return false;
      }

      return true;
    });

    // Chronological Sort: Date Descending, Seq Descending
    this.filteredTrips.sort((a, b) => {
      const dateA = a.tripStartDate || '';
      const dateB = b.tripStartDate || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.grNo || '').localeCompare(String(a.grNo || ''));
    });

    this.renderRegisterFeed();
    this.renderPagination();
  },

  renderRegisterFeed() {
    const container = document.getElementById('bilty-feed-container');
    if (!container) return;

    if (this.filteredTrips.length === 0) {
      container.innerHTML = `
        <div class="card p-5 text-center bg-white border rounded-3 text-muted">
          <i class="bi bi-inbox fs-1 d-block mb-2 text-secondary"></i>
          <h6 class="fw-bold">No Bilty Consignments Found</h6>
          <small>Try selecting a different year, clearing search keywords, or switching firm filters.</small>
        </div>
      `;
      return;
    }

    let displayItems = this.filteredTrips;
    if (this.pageSize !== 'ALL') {
      const start = (this.currentPage - 1) * this.pageSize;
      displayItems = this.filteredTrips.slice(start, start + this.pageSize);
    }

    // Group by Date (Descending, AppSheet format)
    const dateGroups = new Map();
    displayItems.forEach(t => {
      let dKey = t.tripStartDate || 'Undated';
      if (dKey.includes('-')) {
        const [y, m, d] = dKey.split('-');
        dKey = `${d}/${m}/${y}`;
      }
      if (!dateGroups.has(dKey)) dateGroups.set(dKey, []);
      dateGroups.get(dKey).push(t);
    });

    let html = '';

    dateGroups.forEach((trips, dateKey) => {
      const dayFreight = trips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);

      // Date Ribbon Header
      html += `
        <div class="bilty-date-ribbon">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-calendar3 text-primary"></i>
            <span>${dateKey}</span>
            <span class="badge bg-primary rounded-pill px-2">${trips.length} Bilties</span>
          </div>
          <div class="text-end">
            <small class="text-muted fw-normal me-1">Day Freight:</small>
            <span class="text-success fw-bold">${AppUI.formatCurrency(dayFreight)}</span>
          </div>
        </div>
      `;

      // Cards for each bilty on this date
      trips.forEach(t => {
        const firm = t.transport || (t.grNo && t.grNo.includes('MTC') ? 'MTC' : 'TTC');
        let firmBadgeClass = 'firm-badge-ttc';
        if (firm === 'MTC') firmBadgeClass = 'firm-badge-mtc';
        else if (firm === 'SMTC') firmBadgeClass = 'firm-badge-smtc';

        const shortGr = t.shortGrNo || (t.grNo ? t.grNo.split('-').pop() : 'N/A');
        const loadBadge = (t.loadType === 'Over Load')
          ? '<span class="badge bg-warning text-dark py-1">Over Load</span>'
          : '<span class="badge bg-info-subtle text-info py-1">Under Load</span>';

        html += `
          <div class="bilty-feed-card shadow-sm">
            <div class="row g-2 align-items-center">
              
              <!-- Col 1: G.R. No & Transport -->
              <div class="col-12 col-md-3 col-lg-2">
                <div class="d-flex align-items-center gap-2">
                  <span class="${firmBadgeClass}">${firm}</span>
                  <div>
                    <div class="fw-bold font-monospace text-primary fs-6">${shortGr}</div>
                    <small class="text-muted" style="font-size: 0.72rem;">${t.grNo || ''}</small>
                  </div>
                </div>
              </div>

              <!-- Col 2: Truck & Load Type -->
              <div class="col-6 col-md-3 col-lg-2">
                <div class="fw-bold font-monospace text-dark">${t.truckNo || '---'}</div>
                <div class="d-flex align-items-center gap-1 mt-1">
                  ${loadBadge}
                  <small class="text-muted text-truncate" style="max-width: 110px;" title="${t.truckOwner || ''}">${t.truckOwner || ''}</small>
                </div>
              </div>

              <!-- Col 3: Route -->
              <div class="col-6 col-md-3 col-lg-2">
                <div class="text-primary fw-semibold small text-truncate" title="${t.origin || ''} to ${t.destination || ''}">
                  ${t.origin || 'Rajsamand'} &rarr; ${t.destination || '---'}
                </div>
                <small class="text-muted text-truncate d-block" style="max-width: 140px;">Driver: ${t.driver || '---'}</small>
              </div>

              <!-- Col 4: Parties & Material -->
              <div class="col-12 col-md-3 col-lg-3">
                <div class="small fw-semibold text-truncate" title="Consignor: ${t.consignor || ''}">
                  <span class="text-muted">C/O:</span> ${t.consignor || '---'}
                </div>
                <div class="small text-muted text-truncate" title="Consignee: ${t.consignee || ''}">
                  <span class="text-primary">C/E:</span> ${t.consignee || '---'}
                </div>
                <small class="badge bg-light text-dark border mt-1">${t.material || 'Marble Powder'} (${t.weight || 0} MT)</small>
              </div>

              <!-- Col 5: Freight & Total -->
              <div class="col-6 col-md-3 col-lg-1 text-md-end">
                <div class="fw-bold text-success fs-6">${AppUI.formatCurrency(t.freight || 0)}</div>
                <small class="badge bg-success-subtle text-success">${t.status || 'Transit'}</small>
              </div>

              <!-- Col 6: Action Buttons -->
              <div class="col-6 col-md-9 col-lg-2 text-end">
                <div class="btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-primary" onclick="BiltyBookingModule.openBiltyDetails('${t.id || t.grNo}')" title="View Full 3-Card Details">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button type="button" class="btn btn-outline-success" onclick="BiltyBookingModule.shareDirectWhatsApp('${t.id || t.grNo}')" title="Share on WhatsApp">
                    <i class="bi bi-whatsapp"></i>
                  </button>
                  <button type="button" class="btn btn-outline-dark" onclick="BiltyBookingModule.printDirectBilty('${t.id || t.grNo}')" title="Print Official Consignment Note">
                    <i class="bi bi-printer"></i>
                  </button>
                  <button type="button" class="btn btn-outline-warning" onclick="BiltyBookingModule.editDirectBilty('${t.id || t.grNo}')" title="Edit Bilty">
                    <i class="bi bi-pencil"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        `;
      });
    });

    container.innerHTML = html;
  },

  renderPagination() {
    const info = document.getElementById('reg-pagination-info');
    const list = document.getElementById('reg-pagination-list');
    if (!info || !list) return;

    const total = this.filteredTrips.length;
    if (this.pageSize === 'ALL' || total <= this.pageSize) {
      info.innerText = `Showing all ${total.toLocaleString('en-IN')} bilties`;
      list.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(total / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, total);
    info.innerText = `Showing ${start}-${end} of ${total.toLocaleString('en-IN')} bilties`;

    let html = '';
    html += `<li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="javascript:void(0)" onclick="BiltyBookingModule.changePage(${this.currentPage - 1})">Prev</a></li>`;

    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    for (let p = startPage; p <= endPage; p++) {
      html += `<li class="page-item ${p === this.currentPage ? 'active' : ''}"><a class="page-link" href="javascript:void(0)" onclick="BiltyBookingModule.changePage(${p})">${p}</a></li>`;
    }

    html += `<li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="javascript:void(0)" onclick="BiltyBookingModule.changePage(${this.currentPage + 1})">Next</a></li>`;
    list.innerHTML = html;
  },

  changePage(p) {
    this.currentPage = p;
    this.renderRegisterFeed();
    this.renderPagination();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  },

  // ----------------------------------------------------
  // APPSHEET 3-CARD DETAILS MODAL
  // ----------------------------------------------------
  async openBiltyDetails(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id) || String(t.grNo) === String(id));
    if (!trip) {
      AppUI.showToast("Bilty record not found!", "danger");
      return;
    }

    this.currentActiveBilty = trip;

    const firm = trip.transport || (trip.grNo && trip.grNo.includes('MTC') ? 'MTC' : 'TTC');
    document.getElementById('modal-gr-firm-badge').innerText = firm;
    document.getElementById('modal-gr-title').innerText = `G.R. No: ${trip.grNo || trip.shortGrNo}`;

    const content = document.getElementById('bilty-modal-content');
    if (!content) return;

    let displayDate = trip.tripStartDate || '---';
    if (displayDate.includes('-')) {
      const [y, m, d] = displayDate.split('-');
      displayDate = `${d}/${m}/${y}`;
    }

    content.innerHTML = `
      <div class="row g-3">
        
        <!-- CARD 1: Transport & Fleet Profile -->
        <div class="col-12 col-lg-4">
          <div class="bilty-detail-modal-card bg-white shadow-sm">
            <h6><i class="bi bi-truck me-2 text-primary"></i> 1. Vehicle &amp; Fleet Profile</h6>
            
            <div class="debt-kv-row">
              <span class="debt-kv-label">Transport Firm:</span>
              <span class="debt-kv-val text-primary">${firm} Logistics</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Bilty Date:</span>
              <span class="debt-kv-val">${displayDate}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">G.R. Number:</span>
              <span class="debt-kv-val font-monospace text-dark">${trip.grNo || ''}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Bilty Type:</span>
              <span class="debt-kv-val">${trip.biltyType || 'Regular'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Truck No:</span>
              <span class="debt-kv-val font-monospace text-uppercase fw-bold">${trip.truckNo || '---'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Load Type:</span>
              <span class="debt-kv-val">${trip.loadType === 'Over Load' ? '<span class="badge bg-warning text-dark">Over Load</span>' : '<span class="badge bg-info-subtle text-info">Under Load</span>'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Truck Owner:</span>
              <span class="debt-kv-val">${trip.truckOwner || '---'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Driver Name:</span>
              <span class="debt-kv-val">${trip.driver || '---'} (${trip.driverMobile || 'N/A'})</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Reference / Broker:</span>
              <span class="debt-kv-val">${trip.reference || 'Direct (No Broker)'}</span>
            </div>
          </div>
        </div>

        <!-- CARD 2: Consignment & Route Profile -->
        <div class="col-12 col-lg-4">
          <div class="bilty-detail-modal-card bg-white shadow-sm">
            <h6><i class="bi bi-geo-alt me-2 text-danger"></i> 2. Route &amp; Consignment</h6>
            
            <div class="debt-kv-row">
              <span class="debt-kv-label">Origin (From):</span>
              <span class="debt-kv-val">${trip.origin || 'Rajsamand (Raj.)'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Destination (To):</span>
              <span class="debt-kv-val text-primary fw-bold">${trip.destination || '---'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Consignor (C/O):</span>
              <span class="debt-kv-val">${trip.consignor || '---'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Consignor GSTIN:</span>
              <span class="debt-kv-val font-monospace">${trip.consignorGstin || 'URP / Not Provided'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Consignee (C/E):</span>
              <span class="debt-kv-val">${trip.consignee || '---'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Consignee GSTIN:</span>
              <span class="debt-kv-val font-monospace">${trip.consigneeGstin || 'URP / Not Provided'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Delivery Address:</span>
              <span class="debt-kv-val small">${trip.deliveryAddress || '---'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Material Commodity:</span>
              <span class="debt-kv-val text-dark">${trip.material || 'Marble Powder'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Party Bill / Invoice:</span>
              <span class="debt-kv-val font-monospace">${trip.billNo || 'N/A'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">E-Way Bill No:</span>
              <span class="debt-kv-val font-monospace">${trip.ewayBillNo || 'N/A'}</span>
            </div>
          </div>
        </div>

        <!-- CARD 3: Freight, Charges & Accounts Profile -->
        <div class="col-12 col-lg-4">
          <div class="bilty-detail-modal-card bg-white shadow-sm">
            <h6><i class="bi bi-cash-stack me-2 text-success"></i> 3. Freight &amp; Accounts</h6>
            
            <div class="debt-kv-row">
              <span class="debt-kv-label">Actual Weight:</span>
              <span class="debt-kv-val">${trip.weight || 0} MT</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Actual Freight Rate:</span>
              <span class="debt-kv-val">₹${trip.rate || 0} / MT</span>
            </div>
            <div class="debt-kv-row bg-light px-2 py-1 rounded">
              <span class="debt-kv-label fw-bold text-dark">Total Freight:</span>
              <span class="debt-kv-val fw-bold text-success fs-6">${AppUI.formatCurrency(trip.freight || 0)}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Bilty Printed Freight:</span>
              <span class="debt-kv-val">${trip.biltyAmount ? (trip.biltyAmount === 'To be Billed' ? 'To be Billed' : AppUI.formatCurrency(trip.biltyAmount)) : 'As per Actual'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Loading / Hamali:</span>
              <span class="debt-kv-val">₹${trip.loadingCharges || 0}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Halt / Demurrage:</span>
              <span class="debt-kv-val">₹${trip.haltCharges || 0}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">GST Compliance:</span>
              <span class="debt-kv-val">${trip.isGstPaidByParty === 'Yes' ? '5% Forward Charge' : 'RCM (Consignor/Consignee)'}</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Brokerage Commission:</span>
              <span class="debt-kv-val">₹${trip.commission || 0} (${trip.commissionStatus || 'Paid'}-${trip.commissionMode || 'Cash'})</span>
            </div>
            <div class="debt-kv-row">
              <span class="debt-kv-label">Consignment Status:</span>
              <span class="debt-kv-val"><span class="badge bg-success-subtle text-success">${trip.status || 'Transit'}</span></span>
            </div>
          </div>
        </div>

      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('biltyDetailsModal'));
    modal.show();
  },

  editCurrentBilty() {
    if (!this.currentActiveBilty) return;
    const modalEl = document.getElementById('biltyDetailsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    this.loadTripForEditing(this.currentActiveBilty.id || this.currentActiveBilty.grNo);
    this.switchView('create');
  },

  editDirectBilty(id) {
    this.loadTripForEditing(id);
    this.switchView('create');
  },

  duplicateCurrentBilty() {
    if (!this.currentActiveBilty) return;
    const modalEl = document.getElementById('biltyDetailsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    this.duplicateBilty(this.currentActiveBilty);
  },

  duplicateBilty(trip) {
    this.switchView('create');
    this.editTripId = null;

    // Fill form from trip but generate new GR number
    document.getElementById('bilty-firm').value = trip.transport || 'TTC';
    document.getElementById('bilty-year').value = trip.financialYear || '2026-2027';
    document.getElementById('bilty-date').value = new Date().toISOString().split('T')[0];

    document.getElementById('bilty-truck-no').value = trip.truckNo || '';
    document.getElementById('bilty-owner').value = trip.truckOwner || '';
    document.getElementById('bilty-driver').value = trip.driver || '';
    document.getElementById('bilty-driver-mobile').value = trip.driverMobile || '';
    document.getElementById('bilty-broker').value = trip.reference || '';

    this.setLoadType(trip.loadType || 'Under Load');

    document.getElementById('bilty-origin').value = trip.origin || 'Rajsamand (Raj.)';
    document.getElementById('bilty-destination').value = trip.destination || '';
    document.getElementById('bilty-consignor').value = trip.consignor || '';
    document.getElementById('bilty-consignor-gstin').value = trip.consignorGstin || '';
    document.getElementById('bilty-consignee').value = trip.consignee || '';
    document.getElementById('bilty-consignee-gstin').value = trip.consigneeGstin || '';
    document.getElementById('bilty-delivery-address').value = trip.deliveryAddress || '';

    document.getElementById('bilty-material').value = trip.material || 'Marble Powder';
    document.getElementById('bilty-weight').value = trip.weight || '';
    document.getElementById('bilty-rate').value = trip.rate || '';

    this.generateBiltyNumber();
    this.recalculateFreightAndTotals();

    AppUI.showToast("Bilty duplicated as template with new sequential G.R. number!", "success");
  },

  async deleteCurrentBilty() {
    if (!this.currentActiveBilty) return;
    if (!confirm(`Are you sure you want to delete Bilty ${this.currentActiveBilty.grNo}?`)) return;

    await dbService.delete('trips', this.currentActiveBilty.id || this.currentActiveBilty.grNo);
    AppUI.showToast(`Bilty ${this.currentActiveBilty.grNo} deleted!`, "warning");

    const modalEl = document.getElementById('biltyDetailsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    this.allTrips = await dbService.getAll('trips');
    this.updateKPIs();
    this.applyRegisterFilters();
  },

  async loadTripForEditing(tripId) {
    const trip = this.allTrips.find(t => String(t.id) === String(tripId) || String(t.grNo) === String(tripId));
    if (!trip) {
      AppUI.showToast("Trip not found for editing", "danger");
      return;
    }

    this.editTripId = trip.id || trip.grNo;

    // Header badge
    const headerBadge = document.getElementById('header-fy-badge');
    if (headerBadge) headerBadge.innerText = `EDITING G.R. ${trip.shortGrNo || trip.grNo}`;

    // Submit button update
    const submitBtn = document.getElementById('bilty-submit-btn');
    if (submitBtn) {
      submitBtn.className = 'btn btn-warning btn-lg shadow fw-bold';
      submitBtn.innerHTML = '<i class="bi bi-pencil-square me-1"></i> Update Bilty Changes';
    }

    // Populate all fields
    document.getElementById('bilty-firm').value = trip.transport || 'TTC';
    document.getElementById('bilty-year').value = trip.financialYear || '2026-2027';
    document.getElementById('bilty-date').value = trip.tripStartDate || '';
    document.getElementById('bilty-gr-no').value = trip.grNo || '';
    document.getElementById('bilty-short-gr').value = trip.shortGrNo || '';
    document.getElementById('bilty-type').value = trip.biltyType || 'Regular';
    document.getElementById('bilty-is-gst').value = trip.isGstApplicable || 'Yes';

    document.getElementById('bilty-truck-no').value = trip.truckNo || '';
    document.getElementById('bilty-owner').value = trip.truckOwner || '';
    document.getElementById('bilty-owner-mobile').value = trip.ownerMobile || '';
    document.getElementById('bilty-driver').value = trip.driver || '';
    document.getElementById('bilty-driver-mobile').value = trip.driverMobile || '';
    document.getElementById('bilty-broker').value = trip.reference || '';

    this.setLoadType(trip.loadType || 'Under Load');

    document.getElementById('bilty-origin').value = trip.origin || 'Rajsamand (Raj.)';
    document.getElementById('bilty-destination').value = trip.destination || '';
    document.getElementById('bilty-consignor').value = trip.consignor || '';
    document.getElementById('bilty-consignor-gstin').value = trip.consignorGstin || '';
    document.getElementById('bilty-consignee').value = trip.consignee || '';
    document.getElementById('bilty-consignee-gstin').value = trip.consigneeGstin || '';
    document.getElementById('bilty-delivery-address').value = trip.deliveryAddress || '';

    document.getElementById('bilty-material').value = trip.material || 'Marble Powder';
    document.getElementById('bilty-bill-no').value = trip.billNo || '';
    document.getElementById('bilty-invoice-value').value = trip.invoiceValue || '';
    document.getElementById('bilty-eway-bill').value = trip.ewayBillNo || '';

    document.getElementById('bilty-billing-type').value = trip.billingType || 'Per Tonne';
    document.getElementById('bilty-weight').value = trip.weight || '';
    document.getElementById('bilty-rate').value = trip.rate || '';
    document.getElementById('bilty-freight').value = trip.freight || '';

    document.getElementById('bilty-print-billing-type').value = trip.biltyBillingType || 'Per Tonne';
    document.getElementById('bilty-print-weight').value = trip.biltyWeight || trip.weight || '';
    document.getElementById('bilty-print-rate').value = trip.biltyRate || trip.rate || '';
    document.getElementById('bilty-print-amount').value = trip.biltyAmount || trip.freight || '';

    document.getElementById('bilty-loading-charges').value = trip.loadingCharges || 0;
    document.getElementById('bilty-halt-charges').value = trip.haltCharges || 0;
    document.getElementById('bilty-person-liable-gst').value = trip.personLiableGst || 'Consignor/Consignee/Transporter';
    document.getElementById('bilty-gst-paid-party').value = trip.isGstPaidByParty || 'No';
    document.getElementById('bilty-gst-amount').value = trip.gstAmount || 0;
    document.getElementById('bilty-gst-due').value = trip.gstDueAmount || 0;

    document.getElementById('bilty-commission').value = trip.commission || 0;
    document.getElementById('bilty-commission-status').value = trip.commissionStatus || 'Paid';
    document.getElementById('bilty-commission-mode').value = trip.commissionMode || 'Cash';
    document.getElementById('bilty-commission-desc').value = trip.commissionDesc || '';

    document.getElementById('bilty-other-expense').value = trip.otherExpense || 0;
    document.getElementById('bilty-other-status').value = trip.otherStatus || 'Paid';
    document.getElementById('bilty-other-mode').value = trip.otherMode || 'Cash';
    document.getElementById('bilty-other-desc').value = trip.otherDesc || '';

    this.recalculateFreightAndTotals();
    this.updateLivePreview();
  },

  // ----------------------------------------------------
  // PIXEL-PERFECT OFFICIAL A4 BILTY PRINT GENERATOR
  // ----------------------------------------------------
  setPrintCopy(copyTitle) {
    this.currentPrintCopy = copyTitle;
    ['consignor', 'consignee', 'driver', 'office'].forEach(c => {
      const btn = document.getElementById(`btn-copy-${c}`);
      if (btn) {
        if (copyTitle.toLowerCase().includes(c)) btn.className = 'btn btn-outline-light active';
        else btn.className = 'btn btn-outline-light';
      }
    });

    if (this.currentActiveBilty) {
      this.renderPrintPreview(this.currentActiveBilty);
    }
  },

  printDirectBilty(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id) || String(t.grNo) === String(id));
    if (trip) this.openPrintModal(trip);
  },

  printCurrentBilty() {
    if (this.currentActiveBilty) this.openPrintModal(this.currentActiveBilty);
  },

  openPrintModal(trip) {
    this.currentActiveBilty = trip;
    this.renderPrintPreview(trip);
    const modal = new bootstrap.Modal(document.getElementById('biltyPrintModal'));
    modal.show();
  },

  renderPrintPreview(trip) {
    const container = document.getElementById('bilty-print-preview');
    if (!container) return;

    const firm = trip.transport || 'TTC';
    let firmTitle = 'THE TRANSPORT CORPORATION';
    let branch = 'Head Office: Opp. Marble Market, Sukher, Rajsamand (Raj.) | Mob: 94143-12586, 97841-75913';
    let gstNo = '08AAAT0000A1Z5';

    if (firm === 'MTC') {
      firmTitle = 'MAHAVEER TRANSPORT COMPANY';
      branch = 'Shahpura Office: Transport Nagar, Shahpura (Bhilwara) | Mob: 94143-12586';
      gstNo = '08AABFM1234N1ZT';
    } else if (firm === 'SMTC') {
      firmTitle = 'SHREE MAHAVEER TRANSPORT CORP.';
      branch = 'Kishangarh Office: Makrana Road, Kishangarh (Raj.) | Mob: 94143-12586';
      gstNo = '08AAACS5678Q1Z3';
    }

    let displayDate = trip.tripStartDate || '---';
    if (displayDate.includes('-')) {
      const [y, m, d] = displayDate.split('-');
      displayDate = `${d}/${m}/${y}`;
    }

    const html = `
      <div class="bilty-official-doc shadow-sm">
        
        <!-- Top Strip -->
        <div class="bilty-top-strip">
          <div class="bilty-top-left">
            <div>SUBJECT TO RAJSAMAND JURISDICTION</div>
            <div>GSTIN: ${gstNo}</div>
          </div>
          <div class="bilty-top-center">
            <span class="badge bg-dark text-white px-2 py-1">${this.currentPrintCopy}</span>
          </div>
          <div class="bilty-top-right">
            <div>AT OWNER'S RISK</div>
            <div>CAUTION: Consignment Note</div>
          </div>
        </div>

        <!-- Banner Header -->
        <div class="bilty-brand-box">
          <div class="brand-title-box">
            <h2>${firmTitle}</h2>
            <div class="brand-subtitle">FLEET OWNERS &amp; LEADING HEAVY BULK TRANSPORT CONTRACTORS</div>
            <div class="brand-address">${branch}</div>
          </div>
        </div>

        <!-- Consignment Details Grid Table -->
        <table class="bilty-table-grid">
          <tbody>
            <tr>
              <td style="width: 25%;">
                <strong>G.R. NO. (Consignment No):</strong><br>
                <span class="font-monospace fs-5 fw-bold text-danger">${trip.shortGrNo || trip.grNo}</span>
              </td>
              <td style="width: 25%;">
                <strong>Bilty Date:</strong><br>
                <span class="fw-bold">${displayDate}</span>
              </td>
              <td style="width: 25%;">
                <strong>Truck Registration No:</strong><br>
                <span class="font-monospace fs-6 fw-bold">${trip.truckNo}</span> (${trip.loadType || 'Under Load'})
              </td>
              <td style="width: 25%;">
                <strong>Truck Owner / Driver:</strong><br>
                <span>${trip.truckOwner || 'Fleet'}<br>${trip.driver || ''} (${trip.driverMobile || ''})</span>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <strong>FROM (Origin / Loading Point):</strong><br>
                <span class="fs-6 fw-bold">${trip.origin || 'Rajsamand (Raj.)'}</span>
              </td>
              <td colspan="2">
                <strong>TO (Destination / Unloading Point):</strong><br>
                <span class="fs-6 fw-bold text-primary">${trip.destination || '---'}</span>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <strong>CONSIGNOR (माल भेजने वाला):</strong><br>
                <span class="fw-bold fs-6">${trip.consignor || '---'}</span><br>
                <small>GSTIN: <span class="font-monospace">${trip.consignorGstin || 'URP / Unregistered'}</span></small>
              </td>
              <td colspan="2">
                <strong>CONSIGNEE (माल पाने वाला):</strong><br>
                <span class="fw-bold fs-6">${trip.consignee || '---'}</span><br>
                <small>GSTIN: <span class="font-monospace">${trip.consigneeGstin || 'URP / Unregistered'}</span></small><br>
                <small>Delivery Address: ${trip.deliveryAddress || trip.destination || 'Same as destination'}</small>
              </td>
            </tr>

            <tr>
              <td>
                <strong>Packages / Commodity:</strong><br>
                <span class="fw-bold">${trip.material || 'Marble Powder'}</span>
              </td>
              <td>
                <strong>Party Bill / Inv. No:</strong><br>
                <span class="font-monospace fw-bold">${trip.billNo || '---'}</span><br>
                <small>Value: ₹${(trip.invoiceValue || 0).toLocaleString('en-IN')}</small>
              </td>
              <td colspan="2">
                <strong>E-Way Bill Number:</strong><br>
                <span class="font-monospace fs-6 fw-bold">${trip.ewayBillNo || '---'}</span>
              </td>
            </tr>

            <!-- Freight Particulars -->
            <tr class="bg-light">
              <th colspan="2">PARTICULARS</th>
              <th style="width: 25%; text-align: right;">RATE DETAILS</th>
              <th style="width: 25%; text-align: right;">AMOUNT (₹)</th>
            </tr>

            <tr>
              <td colspan="2">
                <strong>Basic Freight Charges:</strong><br>
                <span>Weight: <strong>${trip.weight} MT</strong> @ Rate: <strong>₹${trip.rate} / MT</strong></span>
              </td>
              <td style="text-align: right;">
                ${trip.biltyAmount && trip.biltyAmount === 'To be Billed' ? 'To be Billed' : `₹${trip.rate}/MT`}
              </td>
              <td style="text-align: right;" class="fw-bold text-success fs-6">
                ${trip.biltyAmount && trip.biltyAmount === 'To be Billed' ? 'To be Billed' : AppUI.formatCurrency(trip.freight || 0)}
              </td>
            </tr>

            <tr>
              <td colspan="2">Loading / Hamali Charges</td>
              <td style="text-align: right;">Fixed</td>
              <td style="text-align: right;">₹${(Number(trip.loadingCharges) || 0).toFixed(2)}</td>
            </tr>

            <tr>
              <td colspan="2">Halt / Demurrage Charges</td>
              <td style="text-align: right;">Fixed</td>
              <td style="text-align: right;">₹${(Number(trip.haltCharges) || 0).toFixed(2)}</td>
            </tr>

            <tr>
              <td colspan="2">GST Compliance (RCM / Forward Charge)</td>
              <td style="text-align: right;">${trip.isGstPaidByParty === 'Yes' ? '5% Paid by Party' : 'RCM (Paid by Consignor)'}</td>
              <td style="text-align: right;">₹${(Number(trip.gstAmount) || 0).toFixed(2)}</td>
            </tr>

            <tr style="border-top: 2px solid #000; background: #fafafa;">
              <td colspan="2" class="fw-bold fs-6">GRAND TOTAL BILL VALUE</td>
              <td colspan="2" style="text-align: right;" class="fw-bold fs-5 text-primary">
                ${AppUI.formatCurrency(trip.partyDue || trip.freight || 0)}
              </td>
            </tr>

            <tr>
              <td colspan="4" class="small py-2">
                <strong>TERMS &amp; CONDITIONS:</strong><br>
                1. The transport company is not responsible for leakage, breakage, or damage during transit due to natural causes.<br>
                2. Unloading shall be accepted within 24 hours of arrival; demurrage applies thereafter.<br>
                3. GST liability on freight is to be discharged by the consignor/consignee under RCM (Notification No. 13/2017-CT Rate).
              </td>
            </tr>

            <!-- Signature Strip -->
            <tr>
              <td colspan="2" style="height: 60px; vertical-align: bottom;">
                <div class="border-top pt-1 text-center small fw-bold">Driver / Receiver Signature</div>
              </td>
              <td colspan="2" style="height: 60px; vertical-align: bottom; text-align: right;">
                <div class="border-top pt-1 text-center small fw-bold">For ${firmTitle}<br>(Authorised Signatory)</div>
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    `;

    container.innerHTML = html;
  },

  // ----------------------------------------------------
  // WHATSAPP INSTANT SHARING ENGINE
  // ----------------------------------------------------
  shareDirectWhatsApp(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id) || String(t.grNo) === String(id));
    if (trip) this.shareOnWhatsApp(trip);
  },

  shareCurrentOnWhatsApp() {
    if (this.currentActiveBilty) this.shareOnWhatsApp(this.currentActiveBilty);
  },

  shareOnWhatsApp(bilty) {
    const t = bilty || this.currentActiveBilty;
    if (!t) {
      AppUI.showToast("No active bilty to share!", "danger");
      return;
    }

    const firm = t.transport || 'TTC';
    const firmName = (firm === 'MTC') ? 'MAHAVEER TRANSPORT COMPANY' : 'THE TRANSPORT CORPORATION';
    
    let displayDate = t.tripStartDate || '';
    if (displayDate.includes('-')) {
      const [y, m, d] = displayDate.split('-');
      displayDate = `${d}/${m}/${y}`;
    }

    const msg = `🚚 *${firmName} - LORRY RECEIPT*
━━━━━━━━━━━━━━━━━━━━
📄 *G.R. No:* ${t.grNo || t.shortGrNo}
📅 *Date:* ${displayDate}
🚛 *Truck No:* ${t.truckNo} (${t.loadType || 'Under Load'})
📍 *Route:* ${t.origin || 'Rajsamand'} ➔ ${t.destination}
🏢 *Consignor:* ${t.consignor}
🏬 *Consignee:* ${t.consignee}
📦 *Material:* ${t.material || 'Marble Powder'} | ${t.weight || 0} MT
💰 *Freight:* ₹${Number(t.freight || 0).toLocaleString('en-IN')}
📄 *Bill No:* ${t.billNo || 'N/A'}
🔢 *E-Way Bill:* ${t.ewayBillNo || 'N/A'}
👤 *Driver:* ${t.driver || 'Driver'} ${t.driverMobile ? `(${t.driverMobile})` : ''}
━━━━━━━━━━━━━━━━━━━━
_Issued via MTC & TTC Enterprise Logistics ERP_`;

    const encoded = encodeURIComponent(msg);
    const targetMobile = (t.driverMobile || t.ownerMobile || '').replace(/[^0-9]/g, '');
    let url = `https://wa.me/?text=${encoded}`;
    if (targetMobile.length === 10) {
      url = `https://wa.me/91${targetMobile}?text=${encoded}`;
    }

    window.open(url, '_blank');
  },

  // ----------------------------------------------------
  // EXCEL EXPORT ENGINE
  // ----------------------------------------------------
  exportRegisterToExcel() {
    if (typeof XLSX === 'undefined') {
      AppUI.showToast("SheetJS library not loaded for Excel export", "danger");
      return;
    }

    const rows = this.filteredTrips.map((t, idx) => ({
      "S.No": idx + 1,
      "G.R. Number": t.grNo || t.shortGrNo,
      "Firm": t.transport || 'TTC',
      "Date": t.tripStartDate || '',
      "Financial Year": t.financialYear || '',
      "Truck Registration": t.truckNo || '',
      "Truck Owner": t.truckOwner || '',
      "Load Type": t.loadType || 'Under Load',
      "Origin": t.origin || '',
      "Destination": t.destination || '',
      "Consignor": t.consignor || '',
      "Consignor GSTIN": t.consignorGstin || '',
      "Consignee": t.consignee || '',
      "Consignee GSTIN": t.consigneeGstin || '',
      "Material": t.material || '',
      "Weight (MT)": Number(t.weight) || 0,
      "Rate (₹/MT)": Number(t.rate) || 0,
      "Freight (₹)": Number(t.freight) || 0,
      "Loading Charges": Number(t.loadingCharges) || 0,
      "Halt Charges": Number(t.haltCharges) || 0,
      "Party Due (₹)": Number(t.partyDue) || 0,
      "Broker": t.reference || '',
      "Commission": Number(t.commission) || 0,
      "Commission Status": t.commissionStatus || 'Paid',
      "Commission Mode": t.commissionMode || 'Cash',
      "Driver": t.driver || '',
      "Driver Mobile": t.driverMobile || '',
      "Bill No": t.billNo || '',
      "E-Way Bill": t.ewayBillNo || '',
      "Status": t.status || 'Transit'
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bilties Register");

    const fileName = `Bilties_Export_${this.selectedFirm}_${this.selectedFY}_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
    AppUI.showToast(`Exported ${rows.length} bilties to ${fileName}`, "success");
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof BiltyBookingModule !== 'undefined') {
    BiltyBookingModule.init();
  }
});
