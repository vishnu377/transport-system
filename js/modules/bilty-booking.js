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

  currentView: 'dashboard', // 'dashboard' | 'create' | 'register'
  selectedFirm: 'ALL',
  selectedFY: '2026-2027',
  selectedMonth: 'ALL',
  selectedLoadType: 'ALL',
  searchQuery: '',
  pageSize: 100,
  currentPage: 1,

  currentStep: 1,
  formMode: 'stepper', // 'stepper' | 'express' | 'full'

  editTripId: null,
  isGRLocked: true,
  currentPrintCopy: 'CONSIGNOR COPY',
  currentActiveBilty: null,

  // Multi-Party & Multi-GR Consignment State
  bookingMode: 'single', // 'single' | 'multi_consignee' | 'multi_consignor'
  multiBuyers: [],
  multiSellers: [],
  extraBuyers: [],
  extraSellers: [],
  currentBatchTrips: [],
  activeBatchIndex: 'all',

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
      this.switchView('create');
    } else if (viewParam === 'create') {
      this.initNewFormDefaults();
      await this.generateBiltyNumber();
      this.switchView('create');
    } else {
      this.initNewFormDefaults();
      await this.generateBiltyNumber();
      this.switchView('dashboard');
    }

    this.bindFormEvents();
    this.setupKeyboardShortcuts();
    this.setFormMode('stepper');
    this.updateKPIs();
    this.renderMonthBar();
    this.renderAppSheet3Panels();
    this.updateLivePreview();
  },

  // ----------------------------------------------------
  // DATA LOADING
  // ----------------------------------------------------
  async loadAllData() {
    try {
      this.allTrips = await dbService.getAll('trips');
    } catch (e) {
      console.warn("Trips load fallback:", e);
      this.allTrips = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_TRIPS)) ? window.INITIAL_EXCEL_TRIPS : [];
    }

    try {
      this.parties = await dbService.getAll('parties');
    } catch (e) {
      console.warn("Parties load fallback:", e);
      this.parties = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_PARTIES)) ? window.INITIAL_EXCEL_PARTIES : [];
    }
    // Hard fallback: if parties is empty or small, immediately load all 3,396 parties from window.INITIAL_EXCEL_PARTIES
    if ((!this.parties || this.parties.length <= 5) && typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_PARTIES)) {
      this.parties = window.INITIAL_EXCEL_PARTIES;
    }

    try {
      this.truckOwners = await dbService.getAll('truckOwners');
    } catch (e) {
      this.truckOwners = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS)) ? window.INITIAL_TRUCK_OWNERS : [];
    }
    if ((!this.truckOwners || this.truckOwners.length <= 5) && typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS)) {
      this.truckOwners = window.INITIAL_TRUCK_OWNERS;
    }

    try {
      this.drivers = await dbService.getAll('drivers');
    } catch (e) {
      this.drivers = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS)) ? window.INITIAL_DRIVERS : [];
    }
    if ((!this.drivers || this.drivers.length === 0) && typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS)) {
      this.drivers = window.INITIAL_DRIVERS;
    }

    try {
      this.brokers = await dbService.getAll('brokers');
    } catch (e) {
      this.brokers = [];
    }

    try {
      this.debts = await dbService.getAll('debts');
    } catch (e) {
      this.debts = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_DEBTS_DATA)) ? window.SAMPLE_DEBTS_DATA : [];
    }

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

    // 5. Consignor & Consignee Selects (Main & Express Modes)
    const consignorSelect = document.getElementById('bilty-consignor');
    const consigneeSelect = document.getElementById('bilty-consignee');
    const expressConsignor = document.getElementById('express-consignor');
    const expressConsignee = document.getElementById('express-consignee');

    if (consignorSelect || consigneeSelect) {
      let optionsHTML = '<option value="">-- Select Party / Enter Name --</option>';
      (this.parties || []).forEach(p => {
        if (!p || !p.name) return;
        optionsHTML += `<option value="${p.name}" data-gstin="${p.gstin || ''}" data-address="${p.address || ''}">${p.name}</option>`;
      });
      if (consignorSelect) consignorSelect.innerHTML = optionsHTML;
      if (consigneeSelect) consigneeSelect.innerHTML = optionsHTML;
      if (expressConsignor) expressConsignor.innerHTML = optionsHTML;
      if (expressConsignee) expressConsignee.innerHTML = optionsHTML;

      const mbConsignor = document.getElementById('mb-consignor');
      if (mbConsignor) mbConsignor.innerHTML = optionsHTML;
      const msConsignee = document.getElementById('ms-consignee');
      if (msConsignee) msConsignee.innerHTML = optionsHTML;
    }

    // 6. Destinations Datalist (Matching authentic AppSheet video options)
    const destDatalist = document.getElementById('destinationsList');
    if (destDatalist) {
      const destinations = new Set([
        'Haridwar (U.K.)', 'Sandila (U.P.)', 'Pataudi (Haryana)', 'Kanpur (U.P.)', 
        'Delhi', 'Shamli (U.P.)', 'Lucknow (U.P.)', 'Dadri (U.P.)', 'Loni (U.P.)', 
        'Muzaffarnagar (U.P.)', 'Greater Noida (U.P.)', 'Karnal (Haryana)', 
        'Meerut (U.P.)', 'Hardoi (U.P.)', 'Faridabad (Haryana)', 'Jaipur (Raj.)', 'Bhiwadi (Raj.)'
      ]);      
      this.allTrips.slice(0, 500).forEach(t => {
        if (t.destination) destinations.add(t.destination);
      });
      destDatalist.innerHTML = Array.from(destinations).sort().map(d => `<option value="${d}">`).join('');
    }

    // 7. Materials Datalist (Matching authentic AppSheet video options)
    const matDatalist = document.getElementById('materialsList');
    if (matDatalist) {
      const materials = new Set([
        'Marble Cut Size', 'Marble Powder', 'Putty Grade Dolomite', 'Marble Blocks', 
        'Lime Stone', 'Tiles / Ceramic', 'White Cement', 'Granite Tiles', 'Quartz Grain'
      ]);
      this.allTrips.slice(0, 500).forEach(t => {
        if (t.material) materials.add(t.material);
      });
      matDatalist.innerHTML = Array.from(materials).sort().map(m => `<option value="${m}">`).join('');
    }
  },

  initNewFormDefaults() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bilty-date');
    if (dateInput) dateInput.value = today;

    const expressDate = document.getElementById('express-date');
    if (expressDate) expressDate.value = today;

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
  getNextGrSequences(firm = 'TTC', year = '2026-2027', count = 1) {
    let maxSeq = 0;
    (this.allTrips || []).forEach(t => {
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

    const results = [];
    for (let i = 1; i <= count; i++) {
      const seq = maxSeq + i;
      const shortGr = `${seq}_${firm}`;
      const fullGr = `${year}-${shortGr}`;
      results.push({ seq, shortGr, fullGr });
    }
    return results;
  },

  async generateBiltyNumber() {
    const firm = document.getElementById('bilty-firm')?.value || 'TTC';
    const year = document.getElementById('bilty-year')?.value || '2026-2027';

    let count = 1;
    if (this.extraBuyers && this.extraBuyers.length > 0) {
      count = 1 + this.extraBuyers.length;
    } else if (this.bookingMode === 'multi_consignee') {
      count = Math.max(1, this.multiBuyers.length);
    }
    // Note: Multiple sellers on a single vehicle always share ONE consolidated G.R. number!

    const seqs = this.getNextGrSequences(firm, year, count);
    const first = seqs[0];

    const grNoEl = document.getElementById('bilty-gr-no');
    if (grNoEl) grNoEl.value = first.fullGr;
    const shortGrEl = document.getElementById('bilty-short-gr');
    if (shortGrEl) shortGrEl.value = first.shortGr;

    const appsheetDisplay = document.getElementById('appsheet-display-gr');
    if (appsheetDisplay) {
      if (this.extraSellers && this.extraSellers.length > 0) {
        const totalSellers = 1 + this.extraSellers.length;
        appsheetDisplay.innerHTML = `<span class="badge bg-success-subtle text-success border border-success px-2 py-1">${first.seq} (1 Single GR — ${totalSellers} Sellers)</span>`;
      } else if (count > 1) {
        const last = seqs[seqs.length - 1];
        appsheetDisplay.innerHTML = `<span class="badge bg-warning-subtle text-dark border border-warning px-2 py-1">${first.seq} – ${last.seq} (${count} GRs Allocated)</span>`;
      } else {
        appsheetDisplay.innerText = first.seq;
      }
    }

    const previewBadge = document.getElementById('preview-gr-badge');
    if (previewBadge) {
      if (this.extraSellers && this.extraSellers.length > 0) {
        previewBadge.innerText = `G.R. NO: ${first.shortGr} (1 Bilty - ${1 + this.extraSellers.length} Sellers)`;
      } else if (count > 1) {
        previewBadge.innerText = `G.R. NO: ${first.shortGr} – ${seqs[seqs.length - 1].shortGr} (${count} GRs)`;
      } else {
        previewBadge.innerText = `G.R. NO: ${first.shortGr}`;
      }
    }

    return seqs;
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

    this.recalculateAllTotals();
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
  // STEPPER, CREATION MODES & QUICK ROUTE TEMPLATES
  // ----------------------------------------------------
  setFormMode(mode) {
    this.formMode = mode;
    const btnStepper = document.getElementById('btn-mode-stepper');
    const btnExpress = document.getElementById('btn-mode-express');
    const btnFull = document.getElementById('btn-mode-full');
    const stepperBar = document.getElementById('bilty-stepper-bar');
    const expressView = document.getElementById('express-entry-view');
    const formEl = document.getElementById('bilty-booking-form');

    [btnStepper, btnExpress, btnFull].forEach(b => { if (b) b.classList.remove('active'); });

    if (mode === 'express') {
      if (btnExpress) btnExpress.classList.add('active');
      if (stepperBar) stepperBar.classList.add('d-none');
      if (formEl) formEl.classList.remove('full-form-mode');
      for (let i = 1; i <= 3; i++) {
        const c = document.getElementById(`step-container-${i}`);
        if (c) c.classList.add('d-none');
      }
      if (expressView) expressView.classList.remove('d-none');
      this.populateExpressFromMain();
      const truckInput = document.getElementById('express-truck-no');
      if (truckInput) truckInput.focus();
    } else if (mode === 'full') {
      if (btnFull) btnFull.classList.add('active');
      if (stepperBar) stepperBar.classList.add('d-none');
      if (expressView) expressView.classList.add('d-none');
      if (formEl) {
        formEl.classList.add('full-form-mode');
        formEl.classList.remove('d-none');
      }
      for (let i = 1; i <= 3; i++) {
        const c = document.getElementById(`step-container-${i}`);
        if (c) c.classList.remove('d-none');
      }
    } else {
      // Stepper Wizard mode (default)
      this.formMode = 'stepper';
      if (btnStepper) btnStepper.classList.add('active');
      if (stepperBar) stepperBar.classList.remove('d-none');
      if (expressView) expressView.classList.add('d-none');
      if (formEl) {
        formEl.classList.remove('full-form-mode');
        formEl.classList.remove('d-none');
      }
      this.goToStep(this.currentStep || 1);
    }
  },

  goToStep(stepNum, validate = false) {
    if (this.formMode !== 'stepper') return;
    stepNum = Math.max(1, Math.min(3, parseInt(stepNum, 10)));

    if (validate) {
      // Validation before advancing from Step 1
      if (stepNum > 1 && !this.editTripId) {
        const truckNo = (document.getElementById('bilty-truck-no')?.value || '').trim();
        if (!truckNo) {
          AppUI.showToast("Please enter Truck Registration Number before proceeding!", "warning");
          document.getElementById('bilty-truck-no')?.focus();
          return;
        }
      }

      // Validation before advancing from Step 2
      if (stepNum > 2 && !this.editTripId) {
        const consignor = (document.getElementById('bilty-consignor')?.value || '').trim();
        const consignee = (document.getElementById('bilty-consignee')?.value || '').trim();
        const destination = (document.getElementById('bilty-destination')?.value || '').trim();
        if (!consignor || !consignee || !destination) {
          AppUI.showToast("Please specify Consignor, Consignee & Destination in Step 2!", "warning");
          if (!consignor) document.getElementById('bilty-consignor')?.focus();
          else if (!consignee) document.getElementById('bilty-consignee')?.focus();
          else document.getElementById('bilty-destination')?.focus();
          return;
        }
      }
    }

    this.currentStep = stepNum;

    // Toggle step panes
    for (let i = 1; i <= 3; i++) {
      const pane = document.getElementById(`step-container-${i}`);
      const stepBtn = document.getElementById(`stepper-step-${i}`);
      const stepCircle = document.getElementById(`step-circle-${i}`);

      if (pane) {
        if (i === stepNum) pane.classList.remove('d-none');
        else pane.classList.add('d-none');
      }

      if (stepBtn && stepCircle) {
        stepBtn.classList.remove('active', 'completed');
        if (i < stepNum) {
          stepBtn.classList.add('completed');
          stepCircle.innerHTML = '<i class="bi bi-check-lg"></i>';
        } else if (i === stepNum) {
          stepBtn.classList.add('active');
          stepCircle.innerText = i;
        } else {
          stepCircle.innerText = i;
        }
      }
    }

    // Focus primary input for this step
    if (stepNum === 1) {
      document.getElementById('bilty-truck-no')?.focus();
    } else if (stepNum === 2) {
      document.getElementById('bilty-destination')?.focus();
    } else if (stepNum === 3) {
      document.getElementById('bilty-weight')?.focus();
    }
  },

  nextStep() {
    if (this.currentStep < 3) {
      this.goToStep(this.currentStep + 1, true);
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1, false);
    }
  },

  loadTemplate(name) {
    const templates = {
      berger: {
        firm: 'TTC',
        origin: 'Rajsamand (Raj.)',
        destination: 'Sandila (U.P.)',
        consignor: 'SHREE CHARBHUJA MINCHEM',
        consignorGstin: '08AAJFR3111N1Z1',
        consignee: 'BERGER PAINTS INDIA LTD - SANDILA',
        consigneeGstin: '09AAACB3132G1ZP',
        deliveryAddress: 'Plot No. B4 & B5, Sandila Industrial Area Phase-1, Hardoi, U.P.',
        material: 'Marble Powder',
        rate: 2150,
        biltyRate: 2150,
        label: 'Berger Paints (Sandila)'
      },
      asian: {
        firm: 'MTC',
        origin: 'Rajsamand (Raj.)',
        destination: 'Pataudi (Haryana)',
        consignor: 'SHREE CHARBHUJA MINCHEM',
        consignorGstin: '08AAJFR3111N1Z1',
        consignee: 'ASIAN PAINTS LTD - PATAUDI',
        consigneeGstin: '06AAACH2676Q1Z4',
        deliveryAddress: 'Plot No. 1, Sector 2, IMT Manesar / Pataudi, Haryana',
        material: 'Putty Grade Dolomite',
        rate: 1850,
        biltyRate: 1850,
        label: 'Asian Paints (Pataudi)'
      },
      hardoi: {
        firm: 'SMTC',
        origin: 'Rajsamand (Raj.)',
        destination: 'Hardoi (U.P.)',
        consignor: 'SHREE CHARBHUJA MINCHEM',
        consignorGstin: '08AAJFR3111N1Z1',
        consignee: 'BHOLENATH PAINTS & CHEMICALS',
        consigneeGstin: '09ABCDE1234F1Z5',
        deliveryAddress: 'Industrial Area, Hardoi, U.P.',
        material: 'Marble Powder',
        rate: 2200,
        biltyRate: 2200,
        label: 'Bholenath (Hardoi)'
      },
      jk: {
        firm: 'TTC',
        origin: 'Gotan (Raj.)',
        destination: 'Lucknow (U.P.)',
        consignor: 'JK WHITE CEMENT WORKS',
        consignorGstin: '08AAACJ0123C1Z8',
        consignee: 'SHREE BALAJI TRADERS',
        consigneeGstin: '09AAAFB5678K1Z2',
        deliveryAddress: 'Transport Nagar, Lucknow, U.P.',
        material: 'White Cement / Wall Putty',
        rate: 2400,
        biltyRate: 2400,
        label: 'JK White (Gotan)'
      }
    };

    const tpl = templates[name];
    if (!tpl) return;

    // Set firm & regenerate sequential GR
    const firmEl = document.getElementById('bilty-firm');
    if (firmEl && firmEl.value !== tpl.firm) {
      firmEl.value = tpl.firm;
      if (!this.editTripId) this.generateBiltyNumber();
      this.updateFirmBranding();
    }

    document.getElementById('bilty-origin').value = tpl.origin;
    document.getElementById('bilty-destination').value = tpl.destination;

    // Match or select Consignor
    const consignorEl = document.getElementById('bilty-consignor');
    if (consignorEl) {
      let optFound = false;
      for (let opt of consignorEl.options) {
        if (opt.value && (opt.value.includes('CHARBHUJA') || opt.value.toLowerCase().includes(tpl.consignor.toLowerCase()))) {
          consignorEl.value = opt.value;
          optFound = true;
          break;
        }
      }
      if (!optFound) {
        const newOpt = new Option(tpl.consignor, tpl.consignor, true, true);
        consignorEl.add(newOpt);
      }
    }
    document.getElementById('bilty-consignor-gstin').value = tpl.consignorGstin;

    // Match or select Consignee
    const consigneeEl = document.getElementById('bilty-consignee');
    if (consigneeEl) {
      let optFound = false;
      for (let opt of consigneeEl.options) {
        if (opt.value && opt.value.toLowerCase().includes(tpl.consignee.split(' ')[0].toLowerCase())) {
          consigneeEl.value = opt.value;
          optFound = true;
          break;
        }
      }
      if (!optFound) {
        const newOpt = new Option(tpl.consignee, tpl.consignee, true, true);
        consigneeEl.add(newOpt);
      }
    }
    document.getElementById('bilty-consignee-gstin').value = tpl.consigneeGstin;
    document.getElementById('bilty-delivery-address').value = tpl.deliveryAddress;
    document.getElementById('bilty-material').value = tpl.material;
    document.getElementById('bilty-rate').value = tpl.rate;
    document.getElementById('bilty-print-rate').value = tpl.biltyRate;

    this.recalculateFreightAndTotals();
    this.populateExpressFromMain();

    AppUI.showToast(`Template Loaded: ${tpl.label}! 80% form autofilled.`, "success");
  },

  populateExpressFromMain() {
    const syncPairs = [
      ['express-firm', 'bilty-firm'],
      ['express-date', 'bilty-date'],
      ['express-truck-no', 'bilty-truck-no'],
      ['express-destination', 'bilty-destination'],
      ['express-material', 'bilty-material'],
      ['express-weight', 'bilty-weight'],
      ['express-rate', 'bilty-rate'],
      ['express-eway', 'bilty-eway-bill']
    ];
    syncPairs.forEach(([expId, mainId]) => {
      const exp = document.getElementById(expId);
      const main = document.getElementById(mainId);
      if (exp && main && main.value) exp.value = main.value;
    });

    const expConsignor = document.getElementById('express-consignor');
    const mainConsignor = document.getElementById('bilty-consignor');
    if (expConsignor && mainConsignor && mainConsignor.innerHTML) {
      expConsignor.innerHTML = mainConsignor.innerHTML;
      expConsignor.value = mainConsignor.value;
    }

    const expConsignee = document.getElementById('express-consignee');
    const mainConsignee = document.getElementById('bilty-consignee');
    if (expConsignee && mainConsignee && mainConsignee.innerHTML) {
      expConsignee.innerHTML = mainConsignee.innerHTML;
      expConsignee.value = mainConsignee.value;
    }

    const wt = parseFloat(document.getElementById('express-weight')?.value) || 0;
    const rt = parseFloat(document.getElementById('express-rate')?.value) || 0;
    const freightEl = document.getElementById('express-freight');
    if (freightEl) freightEl.value = (wt * rt) ? AppUI.formatCurrency(wt * rt) : '₹ 0.00';
  },

  syncExpressToMain(targetId, val) {
    const main = document.getElementById(targetId);
    if (main) {
      main.value = val;
      main.dispatchEvent(new Event('input'));
      main.dispatchEvent(new Event('change'));
    }
    if (targetId === 'bilty-weight' || targetId === 'bilty-rate') {
      const wt = parseFloat(document.getElementById('express-weight')?.value) || 0;
      const rt = parseFloat(document.getElementById('express-rate')?.value) || 0;
      const freightEl = document.getElementById('express-freight');
      if (freightEl) freightEl.value = (wt * rt) ? AppUI.formatCurrency(wt * rt) : '₹ 0.00';
    }
  },

  async saveExpressBilty(action = 'print') {
    const truck = (document.getElementById('express-truck-no')?.value || '').trim();
    const consignor = (document.getElementById('express-consignor')?.value || '').trim();
    const consignee = (document.getElementById('express-consignee')?.value || '').trim();
    const dest = (document.getElementById('express-destination')?.value || '').trim();
    const wt = parseFloat(document.getElementById('express-weight')?.value) || 0;
    const rt = parseFloat(document.getElementById('express-rate')?.value) || 0;

    if (!truck) {
      AppUI.showToast("Express Mode: Please enter Truck Registration Number!", "warning");
      document.getElementById('express-truck-no')?.focus();
      return;
    }
    if (!consignor) {
      AppUI.showToast("Express Mode: Please select Consignor party!", "warning");
      document.getElementById('express-consignor')?.focus();
      return;
    }
    if (!consignee) {
      AppUI.showToast("Express Mode: Please select Consignee party!", "warning");
      document.getElementById('express-consignee')?.focus();
      return;
    }
    if (!dest) {
      AppUI.showToast("Express Mode: Please enter Destination!", "warning");
      document.getElementById('express-destination')?.focus();
      return;
    }
    if (!wt || !rt) {
      AppUI.showToast("Express Mode: Please enter Weight (MT) and Rate (₹)!", "warning");
      if (!wt) document.getElementById('express-weight')?.focus();
      else document.getElementById('express-rate')?.focus();
      return;
    }

    // Sync to main form fields
    document.getElementById('bilty-firm').value = document.getElementById('express-firm').value;
    document.getElementById('bilty-date').value = document.getElementById('express-date').value;
    document.getElementById('bilty-truck-no').value = truck;
    this.autoFillTruckDetails(truck);
    document.getElementById('bilty-consignor').value = consignor;
    document.getElementById('bilty-consignee').value = consignee;
    document.getElementById('bilty-destination').value = dest;
    document.getElementById('bilty-material').value = document.getElementById('express-material').value;
    document.getElementById('bilty-weight').value = wt;
    document.getElementById('bilty-rate').value = rt;
    document.getElementById('bilty-eway-bill').value = document.getElementById('express-eway').value;

    this.recalculateFreightAndTotals();

    if (action === 'whatsapp') {
      await this.saveAndWhatsApp();
    } else if (action === 'saveOnly') {
      await this.saveOnly();
    } else {
      await this.saveBilty('print');
    }
  },

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const createView = document.getElementById('bilty-create-view');
        if (!createView || createView.classList.contains('d-none')) return;

        e.preventDefault();
        if (this.formMode === 'express') {
          this.saveExpressBilty('print');
        } else if (this.formMode === 'stepper') {
          if (this.currentStep === 1) this.nextStep();
          else if (this.currentStep === 2) this.nextStep();
          else if (this.currentStep === 3) this.saveBilty('print');
        } else {
          this.saveBilty('print');
        }
      }
    });
  },

  // ----------------------------------------------------
  // AUTHENTIC GOOGLE APPSHEET REACTIVE FORM METHODS
  // ----------------------------------------------------
  setAppSheetSegment(fieldId, val, btnEl) {
    const input = document.getElementById(fieldId);
    if (input) {
      input.value = val;
      input.dispatchEvent(new Event('change'));
    }
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (fieldId === 'bilty-load-type') {
      this.setLoadType(val);
    }
    this.updateLivePreview();
  },

  setAppSheetTransport(firm, btnEl) {
    const firmInput = document.getElementById('bilty-firm');
    if (firmInput) firmInput.value = firm;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const grLabel = document.getElementById('appsheet-gr-label');
    if (grLabel) grLabel.innerText = `${firm} G.R.No. *`;
    this.generateBiltyNumber();
    this.updateLivePreview();
  },

  setAppSheetDebt(isDebt, btnEl) {
    const toggle = document.getElementById('toggle-any-debt');
    if (toggle) toggle.checked = isDebt;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const box = document.getElementById('bilty-debt-box');
    if (box) {
      if (isDebt) box.classList.remove('d-none');
      else box.classList.add('d-none');
    }
  },

  setAppSheetDispatchFrom(isReq, btnEl) {
    const toggle = document.getElementById('toggle-dispatch-from');
    if (toggle) toggle.checked = isReq;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const box = document.getElementById('dispatch-from-box');
    if (box) {
      if (isReq) box.classList.remove('d-none');
      else box.classList.add('d-none');
    }
  },

  setAppSheetShipTo(isReq, btnEl) {
    const toggle = document.getElementById('toggle-ship-to');
    if (toggle) toggle.checked = isReq;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const box = document.getElementById('ship-to-box');
    if (box) {
      if (isReq) box.classList.remove('d-none');
      else box.classList.add('d-none');
    }
  },

  onTruckSelect(truckNo) {
    if (!truckNo || truckNo.length < 3) return;
    truckNo = truckNo.trim().toUpperCase();
    const truckInput = document.getElementById('bilty-truck-no');
    if (truckInput && truckInput.value !== truckNo) truckInput.value = truckNo;

    let ownerName = '';
    let ownerMobile = '';
    let driverName = '';
    let driverMobile = '';

    const registeredTrucks = typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_TRUCKS)
      ? window.INITIAL_EXCEL_TRUCKS : [];
    const matched = registeredTrucks.find(t => t.truckNo === truckNo);
    if (matched) {
      ownerName = matched.name || 'MTC Fleet';
      ownerMobile = matched.mobile || '9414312586';
    }

    if (!ownerName) {
      const matchedOwner = this.truckOwners.find(o => o.truckNo === truckNo);
      if (matchedOwner) {
        ownerName = matchedOwner.name || matchedOwner.ownerName;
        ownerMobile = matchedOwner.mobile || matchedOwner.phone || '';
      }
    }

    if (!ownerName) {
      const recentTrip = this.allTrips.find(t => t.truckNo === truckNo && t.truckOwner);
      if (recentTrip) {
        ownerName = recentTrip.truckOwner;
        ownerMobile = recentTrip.ownerMobile || '';
      }
    }

    if (!ownerName) ownerName = 'Market Truck Owner';
    if (!ownerMobile) ownerMobile = '9414659401';

    const recentTrip = this.allTrips.find(t => t.truckNo === truckNo && t.driver);
    if (recentTrip) {
      driverName = recentTrip.driver;
      driverMobile = recentTrip.driverMobile || '';
    }

    // Update DOM inputs and AppSheet chip & texts
    const ownerInput = document.getElementById('bilty-owner');
    if (ownerInput) ownerInput.value = ownerName;
    const ownerChip = document.getElementById('appsheet-truck-owner-chip');
    const ownerText = document.getElementById('appsheet-owner-text');
    if (ownerText) ownerText.innerText = ownerName;
    if (ownerChip) ownerChip.classList.remove('d-none');

    const mobileInput = document.getElementById('bilty-owner-mobile');
    if (mobileInput) mobileInput.value = ownerMobile;
    const mobileText = document.getElementById('appsheet-owner-mobile-text');
    if (mobileText) mobileText.innerText = ownerMobile;

    if (driverName) {
      const driverInput = document.getElementById('bilty-driver');
      if (driverInput && !driverInput.value) driverInput.value = driverName;
      const driverMobileInput = document.getElementById('bilty-driver-mobile');
      if (driverMobileInput && !driverMobileInput.value) driverMobileInput.value = driverMobile || '6377445099';
      const driverMobileText = document.getElementById('appsheet-driver-mobile-text');
      if (driverMobileText) driverMobileText.innerText = driverMobile || '6377445099';
    }

    this.updateLivePreview();
  },

  onReferenceSelect(val) {
    if (!val) return;
    const brokerInput = document.getElementById('bilty-broker');
    if (brokerInput && brokerInput.value !== val) brokerInput.value = val;
    const phoneMatch = val.match(/\b\d{10}\b/);
    const phone = phoneMatch ? phoneMatch[0] : (this.brokers.find(b => b.name === val)?.phone || '7976808636');
    const phoneText = document.getElementById('appsheet-broker-mobile-text');
    if (phoneText) phoneText.innerText = phone;
  },

  onDriverSelect(val) {
    if (!val) return;
    const driverInput = document.getElementById('bilty-driver');
    if (driverInput && driverInput.value !== val) driverInput.value = val;
    const phoneMatch = val.match(/\b\d{10}\b/);
    const phone = phoneMatch ? phoneMatch[0] : (this.drivers.find(d => d.name === val)?.mobile || '6377445099');
    const phoneText = document.getElementById('appsheet-driver-mobile-text');
    if (phoneText) phoneText.innerText = phone;
    const mobileInput = document.getElementById('bilty-driver-mobile');
    if (mobileInput) mobileInput.value = phone;
  },

  onConsignorSelect(val) {
    if (!val) return;
    const consignorInput = document.getElementById('bilty-consignor');
    if (consignorInput && consignorInput.value !== val) consignorInput.value = val;
    const party = this.parties.find(p => p.name === val);
    if (party && party.gstin) {
      const gstinInput = document.getElementById('bilty-consignor-gstin');
      if (gstinInput) gstinInput.value = party.gstin;
    }
    this.updateLivePreview();
  },

  onConsigneeSelect(val) {
    if (!val) return;
    const consigneeInput = document.getElementById('bilty-consignee');
    if (consigneeInput && consigneeInput.value !== val) consigneeInput.value = val;
    const party = this.parties.find(p => p.name === val);
    if (party) {
      if (party.gstin) {
        const gstinInput = document.getElementById('bilty-consignee-gstin');
        if (gstinInput) gstinInput.value = party.gstin;
      }
      if (party.address) {
        const addrInput = document.getElementById('bilty-delivery-address');
        if (addrInput) addrInput.value = party.address;
      }
    }
    this.updateLivePreview();
  },

  // ----------------------------------------------------
  // MULTI-PARTY & MULTI-GR CONSIGNMENT WORKFLOW
  // ----------------------------------------------------
  getPartiesOptionsHtml(selectedVal = '') {
    let html = '<option value="">-- Select Party / Enter Name --</option>';
    (this.parties || []).forEach(p => {
      if (p && p.name) {
        const isSel = (p.name === selectedVal) ? 'selected' : '';
        html += `<option value="${p.name}" ${isSel}>${p.name}</option>`;
      }
    });
    return html;
  },

  addExtraBuyer(initialData = {}) {
    if (this.extraSellers && this.extraSellers.length > 0) {
      AppUI.showToast("Consignment already configured for multiple sellers. Cannot mix multiple buyers.", "warning");
      return;
    }
    if (!this.extraBuyers) this.extraBuyers = [];

    const defDest = (document.getElementById('bilty-destination')?.value || '').trim();
    const defMaterial = (document.getElementById('bilty-material')?.value || '').trim() || 'Marble Cut Size';
    const defBillingType = document.getElementById('bilty-billing-type')?.value || 'Per Tonne';
    const defRate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;

    const row = {
      consignee: initialData.consignee || '',
      consigneeGstin: initialData.consigneeGstin || '',
      destination: (initialData.destination !== undefined) ? initialData.destination : defDest,
      deliveryAddress: initialData.deliveryAddress || '',
      material: (initialData.material !== undefined) ? initialData.material : defMaterial,
      billingType: (initialData.billingType !== undefined) ? initialData.billingType : defBillingType,
      weight: (initialData.weight !== undefined) ? initialData.weight : 0,
      rate: (initialData.rate !== undefined) ? initialData.rate : defRate,
      freight: 0,
      billNo: initialData.billNo || '',
      invoiceValue: initialData.invoiceValue || 0,
      ewayBillNo: initialData.ewayBillNo || '',
      loadingCharges: initialData.loadingCharges || 0,
      haltCharges: initialData.haltCharges || 0
    };
    row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
    this.extraBuyers.push(row);
    this.renderExtraBuyers();
    this.recalculateAllTotals();
    this.generateBiltyNumber();
  },

  removeExtraBuyer(index) {
    if (this.extraBuyers && this.extraBuyers[index] !== undefined) {
      this.extraBuyers.splice(index, 1);
      this.renderExtraBuyers();
      this.recalculateAllTotals();
      this.generateBiltyNumber();
    }
  },

  onExtraBuyerChange(index, field, value) {
    const b = this.extraBuyers ? this.extraBuyers[index] : null;
    if (!b) return;

    if (field === 'consignee') {
      b.consignee = value;
      const p = (this.parties || []).find(x => x.name === value);
      if (p) {
        b.consigneeGstin = p.gstin || '';
        if (p.address && !b.deliveryAddress) b.deliveryAddress = p.address;
        const gstinEl = document.getElementById(`extra-buyer-gstin-${index}`);
        if (gstinEl) gstinEl.value = b.consigneeGstin;
        const addrEl = document.getElementById(`extra-buyer-addr-${index}`);
        if (addrEl && !addrEl.value) addrEl.value = b.deliveryAddress;
      }
    } else if (field === 'weight') {
      b.weight = parseFloat(value) || 0;
      b.freight = (b.billingType === 'Fixed') ? b.rate : (b.weight * b.rate);
      const frEl = document.getElementById(`extra-buyer-freight-${index}`);
      if (frEl) frEl.value = '₹ ' + b.freight.toFixed(2);
    } else if (field === 'rate') {
      b.rate = parseFloat(value) || 0;
      b.freight = (b.billingType === 'Fixed') ? b.rate : (b.weight * b.rate);
      const frEl = document.getElementById(`extra-buyer-freight-${index}`);
      if (frEl) frEl.value = '₹ ' + b.freight.toFixed(2);
    } else if (field === 'billingType') {
      b.billingType = value;
      b.freight = (value === 'Fixed') ? b.rate : (b.weight * b.rate);
      const frEl = document.getElementById(`extra-buyer-freight-${index}`);
      if (frEl) frEl.value = '₹ ' + b.freight.toFixed(2);
    } else {
      b[field] = value;
    }

    this.recalculateAllTotals();
  },

  renderExtraBuyers() {
    const container = document.getElementById('extra-buyers-list');
    if (!container) return;

    const firm = document.getElementById('bilty-firm')?.value || 'TTC';
    const year = document.getElementById('bilty-year')?.value || '2026-2027';
    const totalGrs = 1 + (this.extraBuyers ? this.extraBuyers.length : 0);
    const seqs = this.getNextGrSequences(firm, year, totalGrs);

    let html = '';
    (this.extraBuyers || []).forEach((b, i) => {
      const buyerIndex = i + 2;
      const grInfo = seqs[i + 1] ? seqs[i + 1].shortGr : `${buyerIndex}`;
      const partyOptions = this.getPartiesOptionsHtml(b.consignee);

      html += `
        <div class="extra-party-block mt-3 pt-2 pb-1 border-top" style="border-top: 2px dashed #d1d5db !important;">
          <div class="appsheet-form-row bg-light py-2 px-2 rounded mb-2 d-flex justify-content-between align-items-center">
            <div class="fw-bold text-dark d-flex align-items-center gap-2">
              <span class="badge bg-primary px-2 py-1"><i class="bi bi-file-earmark-text"></i> G.R. ${grInfo}</span>
              <span>Buyer / Consignee #${buyerIndex} (अतिरिक्त खरीदार #${buyerIndex})</span>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2" onclick="BiltyBookingModule.removeExtraBuyer(${i})" title="Remove Buyer #${buyerIndex}">
              <i class="bi bi-trash3"></i> Remove
            </button>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Buyer #${buyerIndex} Consignee *</label>
            <div class="appsheet-form-control-wrap">
              <div class="w-100" style="max-width: 440px;">
                <select class="appsheet-input-box" onchange="BiltyBookingModule.onExtraBuyerChange(${i}, 'consignee', this.value)">
                  ${partyOptions}
                </select>
                <input type="hidden" id="extra-buyer-gstin-${i}" value="${b.consigneeGstin || ''}">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Buyer #${buyerIndex} Destination *</label>
            <div class="appsheet-form-control-wrap">
              <div class="w-100" style="max-width: 380px;">
                <input type="text" list="destinationsList" class="appsheet-input-box fw-semibold" value="${b.destination || ''}" placeholder="Select destination city..." oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'destination', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Delivery / Unload Address</label>
            <div class="appsheet-form-control-wrap">
              <input type="text" id="extra-buyer-addr-${i}" class="appsheet-input-box" style="max-width: 480px;" value="${b.deliveryAddress || ''}" placeholder="Enter alternate Ship To / Unloading Site Address" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'deliveryAddress', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Material *</label>
            <div class="appsheet-form-control-wrap">
              <div class="w-100" style="max-width: 380px;">
                <input type="text" list="materialsList" class="appsheet-input-box" value="${b.material || 'Marble Cut Size'}" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'material', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Bill No.</label>
            <div class="appsheet-form-control-wrap">
              <input type="text" class="appsheet-input-box font-monospace" style="max-width: 240px;" placeholder="e.g. 1024" value="${b.billNo || ''}" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'billNo', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Bill Value</label>
            <div class="appsheet-form-control-wrap">
              <div class="input-group" style="max-width: 240px;">
                <span class="input-group-text bg-light text-muted" style="border: 1px solid #d1d5db; border-right: none; font-size: 13px;">₹</span>
                <input type="number" class="appsheet-input-box" placeholder="0.00" value="${b.invoiceValue > 0 ? b.invoiceValue : ''}" step="any" style="border-top-left-radius: 0; border-bottom-left-radius: 0;" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'invoiceValue', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">E-way Bill No.</label>
            <div class="appsheet-form-control-wrap">
              <input type="text" class="appsheet-input-box font-monospace" style="max-width: 340px;" placeholder="12-digit E-Way" value="${b.ewayBillNo || ''}" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'ewayBillNo', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Actual Billing Type *</label>
            <div class="appsheet-form-control-wrap">
              <select class="appsheet-input-box" style="max-width: 260px;" onchange="BiltyBookingModule.onExtraBuyerChange(${i}, 'billingType', this.value)">
                <option value="Per Tonne" ${b.billingType === 'Per Tonne' ? 'selected' : ''}>Per Tonne</option>
                <option value="Fixed" ${b.billingType === 'Fixed' ? 'selected' : ''}>Fixed</option>
                <option value="To be Billed" ${b.billingType === 'To be Billed' ? 'selected' : ''}>To be Billed</option>
              </select>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Actual Weight *</label>
            <div class="appsheet-form-control-wrap">
              <input type="number" class="appsheet-input-box fw-bold" style="max-width: 240px;" placeholder="e.g. 15.50" value="${b.weight > 0 ? b.weight : ''}" step="any" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'weight', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Actual Rate *</label>
            <div class="appsheet-form-control-wrap">
              <div class="input-group" style="max-width: 240px;">
                <span class="input-group-text bg-light text-muted" style="border: 1px solid #d1d5db; border-right: none; font-size: 13px;">₹</span>
                <input type="number" class="appsheet-input-box fw-bold" style="max-width: 240px; border-top-left-radius: 0; border-bottom-left-radius: 0;" placeholder="e.g. 1850" value="${b.rate > 0 ? b.rate : ''}" step="any" oninput="BiltyBookingModule.onExtraBuyerChange(${i}, 'rate', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Freight *</label>
            <div class="appsheet-form-control-wrap">
              <div class="input-group" style="max-width: 240px;">
                <span class="input-group-text bg-light text-muted" style="border: 1px solid #d1d5db; border-right: none; font-size: 13px;">₹</span>
                <input type="text" id="extra-buyer-freight-${i}" class="appsheet-input-box fw-bold text-success bg-light" readonly style="border-top-left-radius: 0; border-bottom-left-radius: 0;" value="₹ ${(b.freight || 0).toFixed(2)}">
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  addExtraSeller(initialData = {}) {
    if (this.extraBuyers && this.extraBuyers.length > 0) {
      AppUI.showToast("Consignment already configured for multiple buyers. Cannot mix multiple sellers.", "warning");
      return;
    }
    if (!this.extraSellers) this.extraSellers = [];
    if (this.extraSellers.length >= 5) {
      AppUI.showToast("Maximum 6 Sellers allowed per consolidated load!", "warning");
      return;
    }

    const defMaterial = (document.getElementById('bilty-material')?.value || '').trim() || 'Marble Cut Size';
    const defBillingType = document.getElementById('bilty-billing-type')?.value || 'Per Tonne';
    const defRate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;

    const row = {
      consignor: initialData.consignor || '',
      consignorGstin: initialData.consignorGstin || '',
      dispatchFromAddress: initialData.dispatchFromAddress || '',
      material: (initialData.material !== undefined) ? initialData.material : defMaterial,
      billingType: (initialData.billingType !== undefined) ? initialData.billingType : defBillingType,
      weight: (initialData.weight !== undefined) ? initialData.weight : 0,
      rate: (initialData.rate !== undefined) ? initialData.rate : defRate,
      freight: 0,
      billNo: initialData.billNo || '',
      invoiceValue: initialData.invoiceValue || 0,
      ewayBillNo: initialData.ewayBillNo || '',
      loadingCharges: initialData.loadingCharges || 0,
      haltCharges: initialData.haltCharges || 0
    };
    row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
    this.extraSellers.push(row);
    this.renderExtraSellers();
    this.recalculateAllTotals();
    this.generateBiltyNumber();
  },

  removeExtraSeller(index) {
    if (this.extraSellers && this.extraSellers[index] !== undefined) {
      this.extraSellers.splice(index, 1);
      this.renderExtraSellers();
      this.recalculateAllTotals();
      this.generateBiltyNumber();
    }
  },

  onExtraSellerChange(index, field, value) {
    const s = this.extraSellers ? this.extraSellers[index] : null;
    if (!s) return;

    if (field === 'consignor') {
      s.consignor = value;
      const p = (this.parties || []).find(x => x.name === value);
      if (p) {
        s.consignorGstin = p.gstin || '';
        if (p.address && !s.dispatchFromAddress) s.dispatchFromAddress = p.address;
        const gstinEl = document.getElementById(`extra-seller-gstin-${index}`);
        if (gstinEl) gstinEl.value = s.consignorGstin;
        const dispEl = document.getElementById(`extra-seller-disp-${index}`);
        if (dispEl && !dispEl.value) dispEl.value = s.dispatchFromAddress;
      }
    } else if (field === 'weight') {
      s.weight = parseFloat(value) || 0;
      s.freight = (s.billingType === 'Fixed') ? s.rate : (s.weight * s.rate);
      const frEl = document.getElementById(`extra-seller-freight-${index}`);
      if (frEl) frEl.value = '₹ ' + s.freight.toFixed(2);
    } else if (field === 'rate') {
      s.rate = parseFloat(value) || 0;
      s.freight = (s.billingType === 'Fixed') ? s.rate : (s.weight * s.rate);
      const frEl = document.getElementById(`extra-seller-freight-${index}`);
      if (frEl) frEl.value = '₹ ' + s.freight.toFixed(2);
    } else if (field === 'billingType') {
      s.billingType = value;
      s.freight = (value === 'Fixed') ? s.rate : (s.weight * s.rate);
      const frEl = document.getElementById(`extra-seller-freight-${index}`);
      if (frEl) frEl.value = '₹ ' + s.freight.toFixed(2);
    } else {
      s[field] = value;
    }

    this.recalculateAllTotals();
  },

  renderExtraSellers() {
    const container = document.getElementById('extra-sellers-list');
    if (!container) return;

    let html = '';
    (this.extraSellers || []).forEach((s, i) => {
      const sellerIndex = i + 2;
      const partyOptions = this.getPartiesOptionsHtml(s.consignor);

      html += `
        <div class="extra-party-block mt-3 pt-2 pb-1 border-top" style="border-top: 2px dashed #d1d5db !important;">
          <div class="appsheet-form-row bg-light py-2 px-2 rounded mb-2 d-flex justify-content-between align-items-center">
            <div class="fw-bold text-dark d-flex align-items-center gap-2">
              <span class="badge bg-secondary px-2 py-1"><i class="bi bi-shop"></i> Seller #${sellerIndex}</span>
              <span>Seller / Consignor #${sellerIndex} (अतिरिक्त सेलर #${sellerIndex} - Same Bilty)</span>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2" onclick="BiltyBookingModule.removeExtraSeller(${i})" title="Remove Seller #${sellerIndex}">
              <i class="bi bi-trash3"></i> Remove
            </button>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Seller #${sellerIndex} Consignor *</label>
            <div class="appsheet-form-control-wrap">
              <div class="w-100" style="max-width: 440px;">
                <select class="appsheet-input-box" onchange="BiltyBookingModule.onExtraSellerChange(${i}, 'consignor', this.value)">
                  ${partyOptions}
                </select>
                <input type="hidden" id="extra-seller-gstin-${i}" value="${s.consignorGstin || ''}">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Dispatch / Loading Address</label>
            <div class="appsheet-form-control-wrap">
              <input type="text" id="extra-seller-disp-${i}" class="appsheet-input-box" style="max-width: 480px;" value="${s.dispatchFromAddress || ''}" placeholder="Factory or Mine Location" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'dispatchFromAddress', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Material *</label>
            <div class="appsheet-form-control-wrap">
              <div class="w-100" style="max-width: 380px;">
                <input type="text" list="materialsList" class="appsheet-input-box" value="${s.material || 'Marble Cut Size'}" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'material', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Bill No.</label>
            <div class="appsheet-form-control-wrap">
              <input type="text" class="appsheet-input-box font-monospace" style="max-width: 240px;" placeholder="e.g. 1024" value="${s.billNo || ''}" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'billNo', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Bill Value</label>
            <div class="appsheet-form-control-wrap">
              <div class="input-group" style="max-width: 240px;">
                <span class="input-group-text bg-light text-muted" style="border: 1px solid #d1d5db; border-right: none; font-size: 13px;">₹</span>
                <input type="number" class="appsheet-input-box" placeholder="0.00" value="${s.invoiceValue > 0 ? s.invoiceValue : ''}" step="any" style="border-top-left-radius: 0; border-bottom-left-radius: 0;" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'invoiceValue', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">E-way Bill No.</label>
            <div class="appsheet-form-control-wrap">
              <input type="text" class="appsheet-input-box font-monospace" style="max-width: 340px;" placeholder="12-digit E-Way" value="${s.ewayBillNo || ''}" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'ewayBillNo', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Actual Billing Type *</label>
            <div class="appsheet-form-control-wrap">
              <select class="appsheet-input-box" style="max-width: 260px;" onchange="BiltyBookingModule.onExtraSellerChange(${i}, 'billingType', this.value)">
                <option value="Per Tonne" ${s.billingType === 'Per Tonne' ? 'selected' : ''}>Per Tonne</option>
                <option value="Fixed" ${s.billingType === 'Fixed' ? 'selected' : ''}>Fixed</option>
                <option value="To be Billed" ${s.billingType === 'To be Billed' ? 'selected' : ''}>To be Billed</option>
              </select>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Actual Weight *</label>
            <div class="appsheet-form-control-wrap">
              <input type="number" class="appsheet-input-box fw-bold" style="max-width: 240px;" placeholder="e.g. 15.50" value="${s.weight > 0 ? s.weight : ''}" step="any" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'weight', this.value)">
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Actual Rate *</label>
            <div class="appsheet-form-control-wrap">
              <div class="input-group" style="max-width: 240px;">
                <span class="input-group-text bg-light text-muted" style="border: 1px solid #d1d5db; border-right: none; font-size: 13px;">₹</span>
                <input type="number" class="appsheet-input-box fw-bold" style="max-width: 240px; border-top-left-radius: 0; border-bottom-left-radius: 0;" placeholder="e.g. 1850" value="${s.rate > 0 ? s.rate : ''}" step="any" oninput="BiltyBookingModule.onExtraSellerChange(${i}, 'rate', this.value)">
              </div>
            </div>
          </div>

          <div class="appsheet-form-row">
            <label class="appsheet-form-label">Freight *</label>
            <div class="appsheet-form-control-wrap">
              <div class="input-group" style="max-width: 240px;">
                <span class="input-group-text bg-light text-muted" style="border: 1px solid #d1d5db; border-right: none; font-size: 13px;">₹</span>
                <input type="text" id="extra-seller-freight-${i}" class="appsheet-input-box fw-bold text-success bg-light" readonly style="border-top-left-radius: 0; border-bottom-left-radius: 0;" value="₹ ${(s.freight || 0).toFixed(2)}">
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  recalculateAllTotals() {
    const mainWeight = parseFloat(document.getElementById('bilty-weight')?.value) || 0;
    const mainRate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;
    const mainBillingType = document.getElementById('bilty-billing-type')?.value || 'Per Tonne';
    const mainFreight = (mainBillingType === 'Fixed') ? mainRate : (mainWeight * mainRate);
    const commVal = parseFloat(document.getElementById('bilty-commission')?.value) || 0;

    let totalWeight = mainWeight;
    let totalFreight = mainFreight;
    let totalGrs = 1;

    if (this.extraBuyers && this.extraBuyers.length > 0) {
      totalGrs += this.extraBuyers.length;
      this.extraBuyers.forEach(b => {
        const wt = parseFloat(b.weight) || 0;
        const rt = parseFloat(b.rate) || 0;
        const fr = (b.billingType === 'Fixed') ? rt : (wt * rt);
        b.freight = fr;
        totalWeight += wt;
        totalFreight += fr;
      });
    } else if (this.extraSellers && this.extraSellers.length > 0) {
      this.extraSellers.forEach(s => {
        const wt = parseFloat(s.weight) || 0;
        const rt = parseFloat(s.rate) || 0;
        const fr = (s.billingType === 'Fixed') ? rt : (wt * rt);
        s.freight = fr;
        totalWeight += wt;
        totalFreight += fr;
      });
    }

    const summaryStrip = document.getElementById('trip-multi-summary-strip');
    if (summaryStrip) {
      const hasExtraSellers = this.extraSellers && this.extraSellers.length > 0;
      const hasExtraBuyers = this.extraBuyers && this.extraBuyers.length > 0;
      if (hasExtraSellers || hasExtraBuyers || totalGrs > 1) {
        summaryStrip.classList.remove('d-none');
        const grsEl = document.getElementById('multi-sum-grs');
        if (grsEl) {
          if (hasExtraSellers) {
            grsEl.innerText = `1 Single GR (${1 + this.extraSellers.length} Sellers)`;
          } else {
            grsEl.innerText = `${totalGrs} GRs`;
          }
        }
        const wtEl = document.getElementById('multi-sum-weight');
        if (wtEl) wtEl.innerText = `${totalWeight.toFixed(3)} MT`;
        const frEl = document.getElementById('multi-sum-freight');
        if (frEl) frEl.innerText = '₹ ' + totalFreight.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const commEl = document.getElementById('multi-sum-commission');
        if (commEl) commEl.innerText = '₹ ' + commVal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
      } else {
        summaryStrip.classList.add('d-none');
      }
    }
  },

  switchToMultiBuyer() {
    this.setConsignmentMode('multi_consignee', document.getElementById('btn-mode-multi-buyer'));
    if (this.multiBuyers.length === 1 && this.multiBuyers[0].consignee) {
      this.addBuyerRow();
    }
  },

  switchToMultiSeller() {
    this.setConsignmentMode('multi_consignor', document.getElementById('btn-mode-multi-seller'));
    if (this.multiSellers.length === 1 && this.multiSellers[0].consignor) {
      this.addSellerRow();
    }
  },

  setConsignmentMode(mode, el) {
    this.bookingMode = mode;
    const hiddenInput = document.getElementById('bilty-consignment-mode');
    if (hiddenInput) hiddenInput.value = mode;

    // Update active segmented button
    const seg = document.getElementById('seg-consignment-mode');
    if (seg && typeof seg.querySelectorAll === 'function') {
      seg.querySelectorAll('.seg-btn').forEach(btn => btn.classList.remove('active'));
    }
    if (el && el.classList) el.classList.add('active');

    // Toggle container views
    const secSingle = document.getElementById('section-single-consignment');
    const secMultiBuyer = document.getElementById('section-multi-buyer');
    const secMultiSeller = document.getElementById('section-multi-seller');

    if (secSingle) secSingle.className = (mode === 'single') ? '' : 'd-none';
    if (secMultiBuyer) secMultiBuyer.className = (mode === 'multi_consignee') ? '' : 'd-none';
    if (secMultiSeller) secMultiSeller.className = (mode === 'multi_consignor') ? '' : 'd-none';

    // Populate common fields if transitioning
    if (mode === 'multi_consignee') {
      const mbConsignor = document.getElementById('mb-consignor');
      const singleConsignor = document.getElementById('bilty-consignor')?.value;
      if (mbConsignor && singleConsignor && !mbConsignor.value) {
        mbConsignor.value = singleConsignor;
        this.onMultiBuyerConsignorChange(singleConsignor);
      }
      if (this.multiBuyers.length === 0) {
        const defConsignee = document.getElementById('bilty-consignee')?.value || '';
        const defDest = document.getElementById('bilty-destination')?.value || '';
        const defWeight = parseFloat(document.getElementById('bilty-weight')?.value) || 0;
        const defRate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;
        const defMaterial = document.getElementById('bilty-material')?.value || 'Marble Cut Size';
        const defBillNo = document.getElementById('bilty-bill-no')?.value || '';
        const defEway = document.getElementById('bilty-eway-bill')?.value || '';
        const defInvVal = parseFloat(document.getElementById('bilty-invoice-value')?.value) || 0;
        const defAddr = document.getElementById('bilty-delivery-address')?.value || '';
        const defGstin = document.getElementById('bilty-consignee-gstin')?.value || '';

        // Start with ONLY 1 clean buyer card - additional cards added on + Add click
        this.addBuyerRow({
          consignee: defConsignee,
          consigneeGstin: defGstin,
          destination: defDest,
          deliveryAddress: defAddr,
          material: defMaterial,
          weight: defWeight,
          rate: defRate,
          billNo: defBillNo,
          invoiceValue: defInvVal,
          ewayBillNo: defEway
        });
      } else {
        this.renderBuyerRows();
      }
    } else if (mode === 'multi_consignor') {
      const msConsignee = document.getElementById('ms-consignee');
      const singleConsignee = document.getElementById('bilty-consignee')?.value;
      if (msConsignee && singleConsignee && !msConsignee.value) {
        msConsignee.value = singleConsignee;
        this.onMultiSellerConsigneeChange(singleConsignee);
      }
      const msDest = document.getElementById('ms-destination');
      const singleDest = document.getElementById('bilty-destination')?.value;
      if (msDest && singleDest && !msDest.value) {
        msDest.value = singleDest;
      }
      if (this.multiSellers.length === 0) {
        const defConsignor = document.getElementById('bilty-consignor')?.value || '';
        const defWeight = parseFloat(document.getElementById('bilty-weight')?.value) || 0;
        const defRate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;
        const defMaterial = document.getElementById('bilty-material')?.value || 'Marble Cut Size';
        const defBillNo = document.getElementById('bilty-bill-no')?.value || '';
        const defEway = document.getElementById('bilty-eway-bill')?.value || '';
        const defInvVal = parseFloat(document.getElementById('bilty-invoice-value')?.value) || 0;
        const defGstin = document.getElementById('bilty-consignor-gstin')?.value || '';
        const defDisp = document.getElementById('bilty-dispatch-from')?.value || '';

        // Start with ONLY 1 clean seller card - additional cards added on + Add click
        this.addSellerRow({
          consignor: defConsignor,
          consignorGstin: defGstin,
          dispatchFromAddress: defDisp,
          material: defMaterial,
          weight: defWeight,
          rate: defRate,
          billNo: defBillNo,
          invoiceValue: defInvVal,
          ewayBillNo: defEway
        });
      } else {
        this.renderSellerRows();
      }
    }

    this.generateBiltyNumber();
  },

  onMultiBuyerConsignorChange(val) {
    const p = (this.parties || []).find(x => x.name === val);
    const gstinInput = document.getElementById('mb-consignor-gstin');
    if (gstinInput) gstinInput.value = (p && p.gstin) ? p.gstin : '';
  },

  addBuyerRow(initialData = {}) {
    const firstBuyer = this.multiBuyers[0];
    const defDest = (document.getElementById('bilty-destination')?.value || '').trim() || (firstBuyer?.destination || '');
    const defMaterial = (document.getElementById('bilty-material')?.value || '').trim() || (firstBuyer?.material || 'Marble Cut Size');
    const defBillingType = document.getElementById('bilty-print-billing-type')?.value || (firstBuyer?.billingType || 'Per Tonne');
    const defRate = (firstBuyer && firstBuyer.rate) ? firstBuyer.rate : (parseFloat(document.getElementById('bilty-rate')?.value) || 0);

    const row = {
      id: 'buyer_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      consignee: initialData.consignee || '',
      consigneeGstin: initialData.consigneeGstin || '',
      destination: (initialData.destination !== undefined) ? initialData.destination : defDest,
      deliveryAddress: initialData.deliveryAddress || '',
      material: (initialData.material !== undefined) ? initialData.material : defMaterial,
      billingType: (initialData.billingType !== undefined) ? initialData.billingType : defBillingType,
      weight: (initialData.weight !== undefined) ? initialData.weight : (this.multiBuyers.length === 0 ? (parseFloat(document.getElementById('bilty-weight')?.value) || 0) : 0),
      rate: (initialData.rate !== undefined) ? initialData.rate : defRate,
      freight: 0,
      loadingCharges: initialData.loadingCharges || 0,
      haltCharges: initialData.haltCharges || 0,
      billNo: initialData.billNo || '',
      invoiceValue: initialData.invoiceValue || 0,
      ewayBillNo: initialData.ewayBillNo || ''
    };
    row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
    this.multiBuyers.push(row);
    this.renderBuyerRows();
    this.generateBiltyNumber();
  },

  removeBuyerRow(index) {
    if (this.multiBuyers.length <= 1) {
      AppUI.showToast("At least 1 Buyer / GR is required!", "warning");
      return;
    }
    this.multiBuyers.splice(index, 1);
    this.renderBuyerRows();
    this.generateBiltyNumber();
  },

  onMultiBuyerChange(index, field, value) {
    const row = this.multiBuyers[index];
    if (!row) return;

    if (field === 'consignee') {
      row.consignee = value;
      const p = (this.parties || []).find(x => x.name === value);
      if (p) {
        row.consigneeGstin = p.gstin || '';
        if (p.address && !row.deliveryAddress) row.deliveryAddress = p.address;
        const gstinEl = document.getElementById(`mb-gstin-${index}`);
        if (gstinEl) gstinEl.value = row.consigneeGstin;
        const addrEl = document.getElementById(`mb-addr-${index}`);
        if (addrEl && !addrEl.value) addrEl.value = row.deliveryAddress;
      }
    } else if (field === 'weight') {
      row.weight = parseFloat(value) || 0;
      row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
      const freightEl = document.getElementById(`mb-freight-${index}`);
      if (freightEl) freightEl.value = '₹ ' + row.freight.toFixed(2);
    } else if (field === 'rate') {
      row.rate = parseFloat(value) || 0;
      row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
      const freightEl = document.getElementById(`mb-freight-${index}`);
      if (freightEl) freightEl.value = '₹ ' + row.freight.toFixed(2);
    } else if (field === 'billingType') {
      row.billingType = value;
      row.freight = (value === 'Fixed') ? row.rate : (row.weight * row.rate);
      const freightEl = document.getElementById(`mb-freight-${index}`);
      if (freightEl) freightEl.value = '₹ ' + row.freight.toFixed(2);
    } else {
      row[field] = value;
    }

    this.recalculateMultiBuyerTotals();
  },

  renderBuyerRows() {
    const container = document.getElementById('multi-buyer-cards-container');
    if (!container) return;

    const firm = document.getElementById('bilty-firm')?.value || 'TTC';
    const year = document.getElementById('bilty-year')?.value || '2026-2027';
    const seqs = this.getNextGrSequences(firm, year, this.multiBuyers.length);

    let partyOptions = '<option value="">-- Select Consignee / Party --</option>';
    (this.parties || []).forEach(p => {
      if (p && p.name) {
        partyOptions += `<option value="${p.name}">${p.name}</option>`;
      }
    });

    let html = '';
    this.multiBuyers.forEach((b, i) => {
      const gr = seqs[i] ? seqs[i].shortGr : `${i + 1}`;
      b.calculatedGr = seqs[i] ? seqs[i].fullGr : '';
      b.calculatedShortGr = gr;

      html += `
        <div class="appsheet-multi-card">
          <div class="appsheet-multi-header">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-gr-badge"><i class="bi bi-file-earmark-text"></i> G.R. No: ${gr}</span>
              <span class="fw-bold text-dark">Buyer / Consignee #${i + 1}</span>
            </div>
            ${this.multiBuyers.length > 1 ? `
              <button type="button" class="btn btn-sm btn-outline-danger py-0 px-2" onclick="BiltyBookingModule.removeBuyerRow(${i})" title="Remove this Buyer">
                <i class="bi bi-trash3"></i> Remove
              </button>
            ` : ''}
          </div>

          <div class="row g-2">
            <div class="col-md-5">
              <label class="small fw-semibold text-muted mb-1">Consignee Party *</label>
              <select class="appsheet-input-box" onchange="BiltyBookingModule.onMultiBuyerChange(${i}, 'consignee', this.value)">
                ${partyOptions.replace(`value="${b.consignee}"`, `value="${b.consignee}" selected`)}
              </select>
              <input type="hidden" id="mb-gstin-${i}" value="${b.consigneeGstin || ''}">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Destination City *</label>
              <input type="text" list="destinationsList" class="appsheet-input-box fw-semibold" value="${b.destination || ''}" placeholder="Destination..." oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'destination', this.value)">
            </div>

            <div class="col-md-4">
              <label class="small fw-semibold text-muted mb-1">Delivery / Unloading Address</label>
              <input type="text" id="mb-addr-${i}" class="appsheet-input-box" value="${b.deliveryAddress || ''}" placeholder="Street, Warehouse or Site" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'deliveryAddress', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Material *</label>
              <input type="text" list="materialsList" class="appsheet-input-box" value="${b.material || 'Marble Cut Size'}" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'material', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Bill No.</label>
              <input type="text" class="appsheet-input-box font-monospace" value="${b.billNo || ''}" placeholder="e.g. 1024" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'billNo', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Bill Value (₹)</label>
              <input type="number" class="appsheet-input-box" value="${b.invoiceValue > 0 ? b.invoiceValue : ''}" placeholder="0.00" step="any" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'invoiceValue', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">E-Way Bill No.</label>
              <input type="text" class="appsheet-input-box font-monospace" value="${b.ewayBillNo || ''}" placeholder="12-digit E-Way" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'ewayBillNo', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Billing Type</label>
              <select class="appsheet-input-box" onchange="BiltyBookingModule.onMultiBuyerChange(${i}, 'billingType', this.value)">
                <option value="Per Tonne" ${b.billingType === 'Per Tonne' ? 'selected' : ''}>Per Tonne</option>
                <option value="Fixed" ${b.billingType === 'Fixed' ? 'selected' : ''}>Fixed</option>
                <option value="To be Billed" ${b.billingType === 'To be Billed' ? 'selected' : ''}>To be Billed</option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Weight (MT) *</label>
              <input type="number" class="appsheet-input-box fw-bold" value="${b.weight > 0 ? b.weight : ''}" placeholder="e.g. 15.50" step="any" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'weight', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Rate (₹) *</label>
              <input type="number" class="appsheet-input-box fw-bold" value="${b.rate > 0 ? b.rate : ''}" placeholder="e.g. 1850" step="any" oninput="BiltyBookingModule.onMultiBuyerChange(${i}, 'rate', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Calculated Freight (₹)</label>
              <input type="text" id="mb-freight-${i}" class="appsheet-input-box fw-bold text-success bg-light" readonly value="₹ ${(b.freight || (b.weight * b.rate)).toFixed(2)}">
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    this.recalculateMultiBuyerTotals();
  },

  recalculateMultiBuyerTotals() {
    let totWeight = 0;
    let totFreight = 0;
    this.multiBuyers.forEach(b => {
      const wt = parseFloat(b.weight) || 0;
      const rt = parseFloat(b.rate) || 0;
      const fr = (b.billingType === 'Fixed') ? rt : (wt * rt);
      b.freight = fr;
      totWeight += wt;
      totFreight += fr;
    });

    const commVal = parseFloat(document.getElementById('bilty-commission')?.value) || 0;

    const grsEl = document.getElementById('mb-sum-grs');
    if (grsEl) grsEl.innerText = `${this.multiBuyers.length} GRs`;
    const wtEl = document.getElementById('mb-sum-weight');
    if (wtEl) wtEl.innerText = `${totWeight.toFixed(3)} MT`;
    const frEl = document.getElementById('mb-sum-freight');
    if (frEl) frEl.innerText = '₹ ' + totFreight.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const commEl = document.getElementById('mb-sum-commission');
    if (commEl) commEl.innerText = '₹ ' + commVal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  },

  // MULTI-SELLER WORKFLOW (N Sellers ➔ 1 Buyer)
  onMultiSellerConsigneeChange(val) {
    const p = (this.parties || []).find(x => x.name === val);
    const gstinInput = document.getElementById('ms-consignee-gstin');
    if (gstinInput) gstinInput.value = (p && p.gstin) ? p.gstin : '';
    const addrInput = document.getElementById('ms-delivery-address');
    if (addrInput && p && p.address && !addrInput.value) {
      addrInput.value = p.address;
    }
  },

  addSellerRow(initialData = {}) {
    if (this.multiSellers.length >= 6) {
      AppUI.showToast("Maximum 6 Sellers allowed per consolidated load!", "warning");
      return;
    }
    const firstSeller = this.multiSellers[0];
    const defMaterial = (document.getElementById('bilty-material')?.value || '').trim() || (firstSeller?.material || 'Marble Cut Size');
    const defBillingType = document.getElementById('bilty-print-billing-type')?.value || (firstSeller?.billingType || 'Per Tonne');
    const defRate = (firstSeller && firstSeller.rate) ? firstSeller.rate : (parseFloat(document.getElementById('bilty-rate')?.value) || 0);

    const row = {
      id: 'seller_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      consignor: initialData.consignor || '',
      consignorGstin: initialData.consignorGstin || '',
      dispatchFromAddress: initialData.dispatchFromAddress || '',
      material: (initialData.material !== undefined) ? initialData.material : defMaterial,
      billingType: (initialData.billingType !== undefined) ? initialData.billingType : defBillingType,
      weight: (initialData.weight !== undefined) ? initialData.weight : (this.multiSellers.length === 0 ? (parseFloat(document.getElementById('bilty-weight')?.value) || 0) : 0),
      rate: (initialData.rate !== undefined) ? initialData.rate : defRate,
      freight: 0,
      loadingCharges: initialData.loadingCharges || 0,
      haltCharges: initialData.haltCharges || 0,
      billNo: initialData.billNo || '',
      invoiceValue: initialData.invoiceValue || 0,
      ewayBillNo: initialData.ewayBillNo || ''
    };
    row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
    this.multiSellers.push(row);
    this.renderSellerRows();
    this.generateBiltyNumber();
  },

  removeSellerRow(index) {
    if (this.multiSellers.length <= 1) {
      AppUI.showToast("At least 1 Seller / Pickup is required!", "warning");
      return;
    }
    this.multiSellers.splice(index, 1);
    this.renderSellerRows();
    this.generateBiltyNumber();
  },

  onMultiSellerChange(index, field, value) {
    const row = this.multiSellers[index];
    if (!row) return;

    if (field === 'consignor') {
      row.consignor = value;
      const p = (this.parties || []).find(x => x.name === value);
      if (p) {
        row.consignorGstin = p.gstin || '';
        if (p.address && !row.dispatchFromAddress) row.dispatchFromAddress = p.address;
        const gstinEl = document.getElementById(`ms-gstin-${index}`);
        if (gstinEl) gstinEl.value = row.consignorGstin;
        const addrEl = document.getElementById(`ms-disp-${index}`);
        if (addrEl && !addrEl.value) addrEl.value = row.dispatchFromAddress;
      }
    } else if (field === 'weight') {
      row.weight = parseFloat(value) || 0;
      row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
      const freightEl = document.getElementById(`ms-freight-${index}`);
      if (freightEl) freightEl.value = '₹ ' + row.freight.toFixed(2);
    } else if (field === 'rate') {
      row.rate = parseFloat(value) || 0;
      row.freight = (row.billingType === 'Fixed') ? row.rate : (row.weight * row.rate);
      const freightEl = document.getElementById(`ms-freight-${index}`);
      if (freightEl) freightEl.value = '₹ ' + row.freight.toFixed(2);
    } else if (field === 'billingType') {
      row.billingType = value;
      row.freight = (value === 'Fixed') ? row.rate : (row.weight * row.rate);
      const freightEl = document.getElementById(`ms-freight-${index}`);
      if (freightEl) freightEl.value = '₹ ' + row.freight.toFixed(2);
    } else {
      row[field] = value;
    }

    this.recalculateMultiSellerTotals();
  },

  renderSellerRows() {
    const container = document.getElementById('multi-seller-cards-container');
    if (!container) return;

    const firm = document.getElementById('bilty-firm')?.value || 'TTC';
    const year = document.getElementById('bilty-year')?.value || '2026-2027';
    const seqs = this.getNextGrSequences(firm, year, this.multiSellers.length);

    let partyOptions = '<option value="">-- Select Consignor / Party --</option>';
    (this.parties || []).forEach(p => {
      if (p && p.name) {
        partyOptions += `<option value="${p.name}">${p.name}</option>`;
      }
    });

    let html = '';
    this.multiSellers.forEach((s, i) => {
      const gr = seqs[i] ? seqs[i].shortGr : `${i + 1}`;
      s.calculatedGr = seqs[i] ? seqs[i].fullGr : '';
      s.calculatedShortGr = gr;

      html += `
        <div class="appsheet-multi-card">
          <div class="appsheet-multi-header">
            <div class="d-flex align-items-center gap-2">
              <span class="appsheet-gr-badge"><i class="bi bi-file-earmark-text"></i> G.R. No: ${gr}</span>
              <span class="fw-bold text-dark">Seller / Consignor #${i + 1}</span>
            </div>
            ${this.multiSellers.length > 1 ? `
              <button type="button" class="btn btn-sm btn-outline-danger py-0 px-2" onclick="BiltyBookingModule.removeSellerRow(${i})" title="Remove this Seller">
                <i class="bi bi-trash3"></i> Remove
              </button>
            ` : ''}
          </div>

          <div class="row g-2">
            <div class="col-md-5">
              <label class="small fw-semibold text-muted mb-1">Consignor Party *</label>
              <select class="appsheet-input-box" onchange="BiltyBookingModule.onMultiSellerChange(${i}, 'consignor', this.value)">
                ${partyOptions.replace(`value="${s.consignor}"`, `value="${s.consignor}" selected`)}
              </select>
              <input type="hidden" id="ms-gstin-${i}" value="${s.consignorGstin || ''}">
            </div>

            <div class="col-md-7">
              <label class="small fw-semibold text-muted mb-1">Loading / Factory / Site Address</label>
              <input type="text" id="ms-disp-${i}" class="appsheet-input-box" value="${s.dispatchFromAddress || ''}" placeholder="Factory or Mine Location" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'dispatchFromAddress', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Material *</label>
              <input type="text" list="materialsList" class="appsheet-input-box" value="${s.material || 'Marble Cut Size'}" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'material', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Bill No.</label>
              <input type="text" class="appsheet-input-box font-monospace" value="${s.billNo || ''}" placeholder="e.g. 1024" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'billNo', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Bill Value (₹)</label>
              <input type="number" class="appsheet-input-box" value="${s.invoiceValue > 0 ? s.invoiceValue : ''}" placeholder="0.00" step="any" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'invoiceValue', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">E-Way Bill No.</label>
              <input type="text" class="appsheet-input-box font-monospace" value="${s.ewayBillNo || ''}" placeholder="12-digit E-Way" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'ewayBillNo', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Billing Type</label>
              <select class="appsheet-input-box" onchange="BiltyBookingModule.onMultiSellerChange(${i}, 'billingType', this.value)">
                <option value="Per Tonne" ${s.billingType === 'Per Tonne' ? 'selected' : ''}>Per Tonne</option>
                <option value="Fixed" ${s.billingType === 'Fixed' ? 'selected' : ''}>Fixed</option>
                <option value="To be Billed" ${s.billingType === 'To be Billed' ? 'selected' : ''}>To be Billed</option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Weight (MT) *</label>
              <input type="number" class="appsheet-input-box fw-bold" value="${s.weight > 0 ? s.weight : ''}" placeholder="e.g. 15.50" step="any" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'weight', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Rate (₹) *</label>
              <input type="number" class="appsheet-input-box fw-bold" value="${s.rate > 0 ? s.rate : ''}" placeholder="e.g. 1850" step="any" oninput="BiltyBookingModule.onMultiSellerChange(${i}, 'rate', this.value)">
            </div>

            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Calculated Freight (₹)</label>
              <input type="text" id="ms-freight-${i}" class="appsheet-input-box fw-bold text-success bg-light" readonly value="₹ ${(s.freight || (s.weight * s.rate)).toFixed(2)}">
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    this.recalculateMultiSellerTotals();
  },

  recalculateMultiSellerTotals() {
    let totWeight = 0;
    let totFreight = 0;
    this.multiSellers.forEach(s => {
      const wt = parseFloat(s.weight) || 0;
      const rt = parseFloat(s.rate) || 0;
      const fr = (s.billingType === 'Fixed') ? rt : (wt * rt);
      s.freight = fr;
      totWeight += wt;
      totFreight += fr;
    });

    const commVal = parseFloat(document.getElementById('bilty-commission')?.value) || 0;

    const grsEl = document.getElementById('ms-sum-grs');
    if (grsEl) grsEl.innerText = `${this.multiSellers.length} GRs`;
    const wtEl = document.getElementById('ms-sum-weight');
    if (wtEl) wtEl.innerText = `${totWeight.toFixed(3)} MT`;
    const frEl = document.getElementById('ms-sum-freight');
    if (frEl) frEl.innerText = '₹ ' + totFreight.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const commEl = document.getElementById('ms-sum-commission');
    if (commEl) commEl.innerText = '₹ ' + commVal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  },

  // ----------------------------------------------------
  // UNIFIED SAVING ENGINE FOR SINGLE & MULTI-GR BILTY
  // ----------------------------------------------------
  async saveAppSheetBilty() {
    const truckNo = (document.getElementById('bilty-truck-no')?.value || '').trim().toUpperCase();
    if (!truckNo) {
      AppUI.showToast("Please enter or select Truck No. (गाड़ी नंबर)", "danger");
      document.getElementById('bilty-truck-no')?.focus();
      return;
    }

    const firm = document.getElementById('bilty-firm')?.value || 'TTC';
    const year = document.getElementById('bilty-year')?.value || '2026-2027';
    const date = document.getElementById('bilty-date')?.value || new Date().toISOString().split('T')[0];
    const truckOwner = (document.getElementById('bilty-owner')?.value || '').trim() || `${truckNo} Owner`;
    const ownerMobile = (document.getElementById('bilty-owner-mobile')?.value || '').trim();
    const driver = (document.getElementById('bilty-driver')?.value || '').trim() || 'Assigned Driver';
    const driverMobile = (document.getElementById('bilty-driver-mobile')?.value || '').trim();
    const reference = (document.getElementById('bilty-broker')?.value || '').trim();
    const loadType = document.getElementById('bilty-load-type')?.value || 'Under Load';
    const biltyType = document.getElementById('bilty-type')?.value || 'Regular';
    const isGstApplicable = document.getElementById('bilty-is-gst')?.value || 'No';

    const tripCommission = parseFloat(document.getElementById('bilty-commission')?.value) || 0;
    const tripCommissionStatus = document.getElementById('bilty-commission-status')?.value || 'Paid';
    const tripCommissionMode = document.getElementById('bilty-commission-mode')?.value || 'Cash';
    const tripCommissionDesc = (document.getElementById('bilty-commission-desc')?.value || '').trim();

    const tripOtherExpense = parseFloat(document.getElementById('bilty-other-expense')?.value) || 0;
    const tripOtherStatus = document.getElementById('bilty-other-status')?.value || 'Paid';
    const tripOtherMode = document.getElementById('bilty-other-mode')?.value || 'Cash';
    const tripOtherDesc = (document.getElementById('bilty-other-desc')?.value || '').trim();

    // ------------------------------------------------------------------------
    // CASE A: INLINE APPSHEET EXTRA BUYERS (1 Seller -> Multiple Buyers)
    // ------------------------------------------------------------------------
    if (this.extraBuyers && this.extraBuyers.length > 0) {
      const consignor = (document.getElementById('bilty-consignor')?.value || '').trim();
      if (!consignor) {
        AppUI.showToast("Please select Consignor party (माल भेजने वाला)!", "danger");
        document.getElementById('bilty-consignor')?.focus();
        return;
      }
      const origin = (document.getElementById('bilty-origin')?.value || '').trim() || 'Rajsamand (Raj.)';
      const consignorGstin = (document.getElementById('bilty-consignor-gstin')?.value || '').trim();
      const dispatchFrom = (document.getElementById('bilty-dispatch-from')?.value || '').trim();

      // Buyer 1 (Main form)
      const b1Consignee = (document.getElementById('bilty-consignee')?.value || '').trim();
      if (!b1Consignee) {
        AppUI.showToast("Please select Consignee party for Buyer #1!", "danger");
        document.getElementById('bilty-consignee')?.focus();
        return;
      }
      const b1Destination = (document.getElementById('bilty-destination')?.value || '').trim();
      if (!b1Destination) {
        AppUI.showToast("Please specify Destination for Buyer #1!", "danger");
        document.getElementById('bilty-destination')?.focus();
        return;
      }
      const b1Weight = parseFloat(document.getElementById('bilty-weight')?.value) || 0;
      if (b1Weight <= 0) {
        AppUI.showToast("Please enter valid Weight for Buyer #1!", "danger");
        document.getElementById('bilty-weight')?.focus();
        return;
      }
      const b1Rate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;
      const b1BillingType = document.getElementById('bilty-billing-type')?.value || 'Per Tonne';
      const b1Freight = parseFloat(document.getElementById('bilty-freight')?.value) || (b1BillingType === 'Fixed' ? b1Rate : b1Weight * b1Rate);

      const allBuyers = [
        {
          consignee: b1Consignee,
          consigneeGstin: (document.getElementById('bilty-consignee-gstin')?.value || '').trim(),
          destination: b1Destination,
          deliveryAddress: (document.getElementById('bilty-delivery-address')?.value || document.getElementById('bilty-ship-to')?.value || '').trim(),
          material: (document.getElementById('bilty-material')?.value || 'Marble Cut Size').trim(),
          billNo: (document.getElementById('bilty-bill-no')?.value || '').trim(),
          invoiceValue: parseFloat(document.getElementById('bilty-invoice-value')?.value) || 0,
          ewayBillNo: (document.getElementById('bilty-eway-bill')?.value || '').trim(),
          billingType: b1BillingType,
          weight: b1Weight,
          rate: b1Rate,
          freight: b1Freight,
          loadingCharges: parseFloat(document.getElementById('bilty-loading-charges')?.value) || 0,
          haltCharges: parseFloat(document.getElementById('bilty-halt-charges')?.value) || 0
        },
        ...this.extraBuyers
      ];

      for (let i = 1; i < allBuyers.length; i++) {
        const eb = allBuyers[i];
        if (!eb.consignee) {
          AppUI.showToast(`Please select Consignee party for Buyer #${i + 1}!`, "danger");
          return;
        }
        if (!eb.destination) {
          AppUI.showToast(`Please enter Destination for Buyer #${i + 1}!`, "danger");
          return;
        }
        if ((parseFloat(eb.weight) || 0) <= 0) {
          AppUI.showToast(`Please enter valid Weight for Buyer #${i + 1}!`, "danger");
          return;
        }
      }

      const seqs = this.getNextGrSequences(firm, year, allBuyers.length);
      const tripGroupId = `TRIP_GRP_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      const tripsToSave = [];

      for (let i = 0; i < allBuyers.length; i++) {
        const b = allBuyers[i];
        const grInfo = seqs[i];
        const wt = parseFloat(b.weight) || 0;
        const rt = parseFloat(b.rate) || 0;
        const fr = (b.billingType === 'Fixed') ? rt : (wt * rt);

        const comm = (i === 0) ? tripCommission : 0;
        const oth = (i === 0) ? tripOtherExpense : 0;

        tripsToSave.push({
          id: `TRIP_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 4)}`,
          grNo: grInfo.fullGr,
          grSeq: String(grInfo.seq),
          shortGrNo: grInfo.shortGr,
          transport: firm,
          financialYear: year,
          tripStartDate: date,
          biltyType: biltyType,
          isGstApplicable: isGstApplicable,
          truckNo: truckNo,
          truckOwner: truckOwner,
          ownerMobile: ownerMobile,
          loadType: loadType,
          driver: driver,
          driverMobile: driverMobile,
          reference: reference,

          origin: origin,
          destination: b.destination,
          consignor: consignor,
          consignorGstin: consignorGstin,
          dispatchFromAddress: dispatchFrom,
          consignee: b.consignee,
          consigneeGstin: b.consigneeGstin || '',
          deliveryAddress: b.deliveryAddress || '',
          shipToAddress: b.deliveryAddress || '',

          material: b.material || 'Marble Cut Size',
          billNo: b.billNo || '',
          invoiceValue: parseFloat(b.invoiceValue) || 0,
          ewayBillNo: b.ewayBillNo || '',

          billingType: b.billingType || 'Per Tonne',
          weight: wt,
          rate: rt,
          freight: fr,
          loadingCharges: parseFloat(b.loadingCharges) || 0,
          haltCharges: parseFloat(b.haltCharges) || 0,

          biltyBillingType: b.billingType || 'Per Tonne',
          biltyWeight: wt,
          biltyRate: rt,
          biltyAmount: fr,

          commission: comm,
          commissionStatus: tripCommissionStatus,
          commissionMode: tripCommissionMode,
          commissionDesc: tripCommissionDesc,

          otherExpense: oth,
          otherStatus: tripOtherStatus,
          otherMode: tripOtherMode,
          otherDesc: tripOtherDesc,

          status: 'Transit',
          partyDue: fr,
          partyPaid: 0,
          ownerDue: fr - comm,

          tripGroupId: tripGroupId,
          isMultiGr: true,
          multiGrRole: 'multi_consignee',
          multiGrTotalCount: allBuyers.length,
          multiGrIndex: i + 1
        });
      }

      try {
        for (const t of tripsToSave) {
          await dbService.add('trips', t);
        }
      } catch (err) {
        console.error("Error saving multi-buyer bilties:", err);
        AppUI.showToast(`Error saving bilties: ${err.message || 'Storage error'}`, "danger");
        return;
      }

      const isDebtChecked = document.getElementById('toggle-any-debt')?.checked;
      const debtAmount = parseFloat(document.getElementById('bilty-debt-amount')?.value) || 0;
      if (isDebtChecked && debtAmount > 0) {
        const primaryGr = seqs[0].shortGr;
        const debtRecord = {
          id: `DEBT_BILTY_${Date.now()}`,
          date: date,
          description: `Advance / Debt on Trip ${primaryGr} (${truckNo}) - Multi-Buyer Batch (${tripsToSave.length} GRs)`,
          borrower: document.getElementById('bilty-debt-borrower')?.value.trim() || driver,
          amount: debtAmount,
          mode: document.getElementById('bilty-debt-mode')?.value || 'Cash',
          status: 'Pending',
          remarks: document.getElementById('bilty-debt-remarks')?.value.trim() || 'Booked with Multi-GR bilty',
          truckNo: truckNo,
          grNo: primaryGr,
          tripGroupId: tripGroupId
        };
        try {
          await dbService.add('debts', debtRecord);
        } catch (dErr) {
          console.warn("Could not save linked debt:", dErr);
        }
      }

      AppUI.showToast(`All ${tripsToSave.length} Bilties saved successfully (${seqs.map(s => s.shortGr).join(', ')})!`, "success");
      await this.loadAllData();
      this.openMultiPrintModal(tripsToSave);
      return;
    }

    // ------------------------------------------------------------------------
    // CASE B: INLINE APPSHEET EXTRA SELLERS (Multiple Sellers ➔ 1 Consolidated GR & Bilty)
    // ------------------------------------------------------------------------
    if (this.extraSellers && this.extraSellers.length > 0) {
      const consignee = (document.getElementById('bilty-consignee')?.value || '').trim();
      if (!consignee) {
        AppUI.showToast("Please select Consignee party (माल मंगाने वाला)!", "danger");
        document.getElementById('bilty-consignee')?.focus();
        return;
      }
      const destination = (document.getElementById('bilty-destination')?.value || '').trim();
      if (!destination) {
        AppUI.showToast("Please specify Destination (कहाँ तक)!", "danger");
        document.getElementById('bilty-destination')?.focus();
        return;
      }
      const consigneeGstin = (document.getElementById('bilty-consignee-gstin')?.value || '').trim();
      const deliveryAddress = (document.getElementById('bilty-delivery-address')?.value || document.getElementById('bilty-ship-to')?.value || '').trim();

      // Seller 1 (Main form)
      const s1Consignor = (document.getElementById('bilty-consignor')?.value || '').trim();
      if (!s1Consignor) {
        AppUI.showToast("Please select Consignor party for Seller #1!", "danger");
        document.getElementById('bilty-consignor')?.focus();
        return;
      }
      const s1Weight = parseFloat(document.getElementById('bilty-weight')?.value) || 0;
      if (s1Weight <= 0) {
        AppUI.showToast("Please enter valid Weight for Seller #1!", "danger");
        document.getElementById('bilty-weight')?.focus();
        return;
      }
      const s1Rate = parseFloat(document.getElementById('bilty-rate')?.value) || 0;
      const s1BillingType = document.getElementById('bilty-billing-type')?.value || 'Per Tonne';
      const s1Freight = parseFloat(document.getElementById('bilty-freight')?.value) || (s1BillingType === 'Fixed' ? s1Rate : s1Weight * s1Rate);

      const allSellers = [
        {
          consignor: s1Consignor,
          consignorGstin: (document.getElementById('bilty-consignor-gstin')?.value || '').trim(),
          dispatchFromAddress: (document.getElementById('bilty-dispatch-from')?.value || '').trim(),
          material: (document.getElementById('bilty-material')?.value || 'Marble Cut Size').trim(),
          billNo: (document.getElementById('bilty-bill-no')?.value || '').trim(),
          invoiceValue: parseFloat(document.getElementById('bilty-invoice-value')?.value) || 0,
          ewayBillNo: (document.getElementById('bilty-eway-bill')?.value || '').trim(),
          billingType: s1BillingType,
          weight: s1Weight,
          rate: s1Rate,
          freight: s1Freight,
          loadingCharges: parseFloat(document.getElementById('bilty-loading-charges')?.value) || 0,
          haltCharges: parseFloat(document.getElementById('bilty-halt-charges')?.value) || 0
        },
        ...this.extraSellers
      ];

      for (let i = 1; i < allSellers.length; i++) {
        const es = allSellers[i];
        if (!es.consignor) {
          AppUI.showToast(`Please select Consignor party for Seller #${i + 1}!`, "danger");
          return;
        }
        if ((parseFloat(es.weight) || 0) <= 0) {
          AppUI.showToast(`Please enter valid Weight for Seller #${i + 1}!`, "danger");
          return;
        }
      }

      // Generate ONLY 1 Single G.R. Number for the consolidated truck load
      let grInfo;
      if (this.editTripId) {
        grInfo = {
          seq: document.getElementById('bilty-short-gr')?.value || '',
          shortGr: document.getElementById('bilty-short-gr')?.value || '',
          fullGr: document.getElementById('bilty-gr-no')?.value || ''
        };
      } else {
        const seqs = this.getNextGrSequences(firm, year, 1);
        grInfo = seqs[0];
      }

      let totalWeight = 0;
      let totalFreight = 0;
      let totalInvoiceValue = 0;
      let totalLoading = 0;
      let totalHalt = 0;
      const billNumbers = [];
      const ewayBills = [];
      const consignorNames = [];
      const consignorGstins = [];
      const dispatchLocations = [];

      allSellers.forEach((s) => {
        const wt = parseFloat(s.weight) || 0;
        const rt = parseFloat(s.rate) || 0;
        const fr = (s.billingType === 'Fixed') ? rt : (wt * rt);
        s.freight = fr;
        totalWeight += wt;
        totalFreight += fr;
        totalInvoiceValue += (parseFloat(s.invoiceValue) || 0);
        totalLoading += (parseFloat(s.loadingCharges) || 0);
        totalHalt += (parseFloat(s.haltCharges) || 0);
        if (s.billNo && !billNumbers.includes(s.billNo)) billNumbers.push(s.billNo);
        if (s.ewayBillNo && !ewayBills.includes(s.ewayBillNo)) ewayBills.push(s.ewayBillNo);
        if (s.consignor && !consignorNames.includes(s.consignor)) consignorNames.push(s.consignor);
        if (s.consignorGstin && !consignorGstins.includes(s.consignorGstin)) consignorGstins.push(s.consignorGstin);
        if (s.dispatchFromAddress && !dispatchLocations.includes(s.dispatchFromAddress)) dispatchLocations.push(s.dispatchFromAddress);
      });

      const grandDue = totalFreight + totalLoading + totalHalt;

      const singleTripData = {
        id: this.editTripId || `TRIP_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        grNo: grInfo.fullGr,
        grSeq: String(grInfo.seq),
        shortGrNo: grInfo.shortGr,
        transport: firm,
        financialYear: year,
        tripStartDate: date,
        biltyType: biltyType,
        isGstApplicable: isGstApplicable,
        truckNo: truckNo,
        truckOwner: truckOwner,
        ownerMobile: ownerMobile,
        loadType: loadType,
        driver: driver,
        driverMobile: driverMobile,
        reference: reference,

        origin: 'Rajsamand (Raj.)',
        destination: destination,
        consignor: s1Consignor,
        consignorGstin: consignorGstins.join(', ') || allSellers[0].consignorGstin || '',
        dispatchFromAddress: dispatchLocations.join(' | ') || allSellers[0].dispatchFromAddress || 'Rajsamand (Raj.)',
        consignee: consignee,
        consigneeGstin: consigneeGstin,
        deliveryAddress: deliveryAddress,
        shipToAddress: deliveryAddress,

        material: allSellers.map(s => s.material).filter(Boolean).join(', ') || 'Marble Cut Size',
        billNo: billNumbers.join(', '),
        invoiceValue: totalInvoiceValue,
        ewayBillNo: ewayBills.join(', '),

        billingType: s1BillingType,
        weight: totalWeight,
        rate: s1Rate,
        freight: totalFreight,
        loadingCharges: totalLoading,
        haltCharges: totalHalt,

        biltyBillingType: s1BillingType,
        biltyWeight: totalWeight,
        biltyRate: s1Rate,
        biltyAmount: totalFreight,

        commission: tripCommission,
        commissionStatus: tripCommissionStatus,
        commissionMode: tripCommissionMode,
        commissionDesc: tripCommissionDesc,

        otherExpense: tripOtherExpense,
        otherStatus: tripOtherStatus,
        otherMode: tripOtherMode,
        otherDesc: tripOtherDesc,

        status: 'Transit',
        partyDue: grandDue,
        partyPaid: 0,
        ownerDue: totalFreight - tripCommission,

        // Consolidated multi-seller metadata
        isConsolidated: true,
        consolidatedType: 'multi_seller',
        sellerList: allSellers,
        extraSellers: allSellers.slice(1),
        multiSellerCount: allSellers.length
      };

      try {
        if (this.editTripId) {
          await dbService.update('trips', this.editTripId, singleTripData);
        } else {
          await dbService.add('trips', singleTripData);
        }
      } catch (err) {
        console.error("Error saving consolidated multi-seller bilty:", err);
        AppUI.showToast(`Error saving bilty: ${err.message || 'Storage error'}`, "danger");
        return;
      }

      const isDebtChecked = document.getElementById('toggle-any-debt')?.checked;
      const debtAmount = parseFloat(document.getElementById('bilty-debt-amount')?.value) || 0;
      if (isDebtChecked && debtAmount > 0) {
        const debtRecord = {
          id: `DEBT_BILTY_${Date.now()}`,
          date: date,
          description: `Advance / Debt on Trip ${grInfo.shortGr} (${truckNo}) - Consolidated Bilty (${allSellers.length} Sellers)`,
          borrower: document.getElementById('bilty-debt-borrower')?.value.trim() || driver,
          amount: debtAmount,
          mode: document.getElementById('bilty-debt-mode')?.value || 'Cash',
          status: 'Pending',
          remarks: document.getElementById('bilty-debt-remarks')?.value.trim() || 'Booked with Consolidated Bilty',
          truckNo: truckNo,
          grNo: grInfo.shortGr
        };
        try {
          await dbService.add('debts', debtRecord);
        } catch (dErr) {
          console.warn("Could not save linked debt:", dErr);
        }
      }

      AppUI.showToast(`Single Consolidated Bilty saved successfully (${grInfo.shortGr}) with ${allSellers.length} Sellers!`, "success");
      await this.loadAllData();
      this.currentActiveBilty = singleTripData;
      this.openPrintModal(singleTripData);
      return;
    }

    // ------------------------------------------------------------------------
    // CASE 1: SINGLE CONSIGNMENT (1 SELLER ➔ 1 BUYER)
    // ------------------------------------------------------------------------
    if (this.bookingMode === 'single') {
      const destination = (document.getElementById('bilty-destination')?.value || '').trim();
      if (!destination) {
        AppUI.showToast("Please specify Destination (कहाँ तक)!", "warning");
        document.getElementById('bilty-destination')?.focus();
        return;
      }
      await this.saveBilty('print');
      this.switchView('dashboard');
      return;
    }

    // ------------------------------------------------------------------------
    // CASE 2: 1 SELLER ➔ MULTIPLE BUYERS (MULTI-CONSIGNEE / MULTI-DROP)
    // ------------------------------------------------------------------------
    if (this.bookingMode === 'multi_consignee') {
      const consignor = (document.getElementById('mb-consignor')?.value || '').trim();
      if (!consignor) {
        AppUI.showToast("Please select Consignor / Seller (माल भेजने वाला)!", "danger");
        document.getElementById('mb-consignor')?.focus();
        return;
      }
      const consignorGstin = (document.getElementById('mb-consignor-gstin')?.value || '').trim();
      const origin = (document.getElementById('mb-origin')?.value || '').trim() || 'Rajsamand (Raj.)';
      const dispatchFrom = (document.getElementById('mb-dispatch-from')?.value || '').trim();

      if (this.multiBuyers.length === 0) {
        AppUI.showToast("Please add at least 1 Buyer / Consignee!", "warning");
        return;
      }

      for (let i = 0; i < this.multiBuyers.length; i++) {
        const b = this.multiBuyers[i];
        if (!b.consignee) {
          AppUI.showToast(`Please select Consignee party for Buyer #${i + 1}!`, "danger");
          return;
        }
        if (!b.destination) {
          AppUI.showToast(`Please enter Destination city for Buyer #${i + 1}!`, "danger");
          return;
        }
        if ((parseFloat(b.weight) || 0) <= 0) {
          AppUI.showToast(`Please enter valid Weight for Buyer #${i + 1}!`, "danger");
          return;
        }
      }

      // Generate sequential GR numbers for all buyers
      const seqs = this.getNextGrSequences(firm, year, this.multiBuyers.length);
      const tripGroupId = `TRIP_GRP_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

      const tripsToSave = [];
      for (let i = 0; i < this.multiBuyers.length; i++) {
        const b = this.multiBuyers[i];
        const grInfo = seqs[i];
        const wt = parseFloat(b.weight) || 0;
        const rt = parseFloat(b.rate) || 0;
        const fr = (b.billingType === 'Fixed') ? rt : (wt * rt);

        // Commission & Other expenses applied ONCE on primary GR (GR #1)
        const comm = (i === 0) ? tripCommission : 0;
        const oth = (i === 0) ? tripOtherExpense : 0;

        const tripData = {
          id: `TRIP_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 4)}`,
          grNo: grInfo.fullGr,
          grSeq: String(grInfo.seq),
          shortGrNo: grInfo.shortGr,
          transport: firm,
          financialYear: year,
          tripStartDate: date,
          biltyType: biltyType,
          isGstApplicable: isGstApplicable,
          truckNo: truckNo,
          truckOwner: truckOwner,
          ownerMobile: ownerMobile,
          loadType: loadType,
          driver: driver,
          driverMobile: driverMobile,
          reference: reference,

          origin: origin,
          destination: b.destination,
          consignor: consignor,
          consignorGstin: consignorGstin,
          dispatchFromAddress: dispatchFrom,
          consignee: b.consignee,
          consigneeGstin: b.consigneeGstin || '',
          deliveryAddress: b.deliveryAddress || '',
          shipToAddress: b.deliveryAddress || '',

          material: b.material || 'Marble Cut Size',
          billNo: b.billNo || '',
          invoiceValue: parseFloat(b.invoiceValue) || 0,
          ewayBillNo: b.ewayBillNo || '',

          billingType: b.billingType || 'Per Tonne',
          weight: wt,
          rate: rt,
          freight: fr,
          loadingCharges: parseFloat(b.loadingCharges) || 0,
          haltCharges: parseFloat(b.haltCharges) || 0,

          biltyBillingType: b.billingType || 'Per Tonne',
          biltyWeight: wt,
          biltyRate: rt,
          biltyAmount: fr,

          commission: comm,
          commissionStatus: tripCommissionStatus,
          commissionMode: tripCommissionMode,
          commissionDesc: tripCommissionDesc,

          otherExpense: oth,
          otherStatus: tripOtherStatus,
          otherMode: tripOtherMode,
          otherDesc: tripOtherDesc,

          status: 'Transit',
          partyDue: fr,
          partyPaid: 0,
          ownerDue: fr - comm,

          tripGroupId: tripGroupId,
          isMultiGr: true,
          multiGrRole: 'multi_consignee',
          multiGrTotalCount: this.multiBuyers.length,
          multiGrIndex: i + 1
        };

        tripsToSave.push(tripData);
      }

      // Persist all trips
      try {
        for (const t of tripsToSave) {
          await dbService.add('trips', t);
        }
      } catch (err) {
        console.error("Error saving multi-buyer bilties:", err);
        AppUI.showToast(`Error saving bilties: ${err.message || 'Storage error'}`, "danger");
        return;
      }

      // Check Any Debt? -> create single linked ledger debt for the vehicle trip
      const isDebtChecked = document.getElementById('toggle-any-debt')?.checked;
      const debtAmount = parseFloat(document.getElementById('bilty-debt-amount')?.value) || 0;
      if (isDebtChecked && debtAmount > 0) {
        const primaryGr = seqs[0].shortGr;
        const debtRecord = {
          id: `DEBT_BILTY_${Date.now()}`,
          date: date,
          description: `Advance / Debt on Trip ${primaryGr} (${truckNo}) - Multi-Buyer Batch (${tripsToSave.length} GRs)`,
          borrower: document.getElementById('bilty-debt-borrower')?.value.trim() || driver,
          amount: debtAmount,
          mode: document.getElementById('bilty-debt-mode')?.value || 'Cash',
          status: 'Pending',
          remarks: document.getElementById('bilty-debt-remarks')?.value.trim() || 'Booked with Multi-GR bilty',
          truckNo: truckNo,
          grNo: primaryGr,
          tripGroupId: tripGroupId
        };
        try {
          await dbService.add('debts', debtRecord);
        } catch (dErr) {
          console.warn("Could not save linked debt:", dErr);
        }
      }

      AppUI.showToast(`All ${tripsToSave.length} Bilties saved successfully (${seqs.map(s => s.shortGr).join(', ')})!`, "success");

      // Reload dataset and open multi-print modal
      await this.loadAllData();
      this.openMultiPrintModal(tripsToSave);
      return;
    }

    // ------------------------------------------------------------------------
    // CASE 3: MULTIPLE SELLERS ➔ 1 BUYER (MULTI-CONSIGNOR / MULTI-PICKUP)
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // CASE 3: MULTIPLE SELLERS ➔ 1 BUYER (MULTI-CONSIGNOR CONSOLIDATED 1 GR)
    // ------------------------------------------------------------------------
    if (this.bookingMode === 'multi_consignor') {
      const consignee = (document.getElementById('ms-consignee')?.value || '').trim();
      if (!consignee) {
        AppUI.showToast("Please select Consignee / Buyer (माल मंगाने वाला)!", "danger");
        document.getElementById('ms-consignee')?.focus();
        return;
      }
      const consigneeGstin = (document.getElementById('ms-consignee-gstin')?.value || '').trim();
      const destination = (document.getElementById('ms-destination')?.value || '').trim();
      if (!destination) {
        AppUI.showToast("Please specify Destination City (कहाँ तक)!", "warning");
        document.getElementById('ms-destination')?.focus();
        return;
      }
      const deliveryAddress = (document.getElementById('ms-delivery-address')?.value || '').trim();

      if (this.multiSellers.length === 0) {
        AppUI.showToast("Please add at least 1 Seller / Consignor!", "warning");
        return;
      }

      for (let i = 0; i < this.multiSellers.length; i++) {
        const s = this.multiSellers[i];
        if (!s.consignor) {
          AppUI.showToast(`Please select Consignor party for Seller #${i + 1}!`, "danger");
          return;
        }
        if ((parseFloat(s.weight) || 0) <= 0) {
          AppUI.showToast(`Please enter valid Weight for Seller #${i + 1}!`, "danger");
          return;
        }
      }

      // Generate 1 single GR sequence for all sellers consolidated
      let grInfo;
      if (this.editTripId) {
        grInfo = {
          seq: document.getElementById('bilty-short-gr')?.value || '',
          shortGr: document.getElementById('bilty-short-gr')?.value || '',
          fullGr: document.getElementById('bilty-gr-no')?.value || ''
        };
      } else {
        const seqs = this.getNextGrSequences(firm, year, 1);
        grInfo = seqs[0];
      }

      let totalWeight = 0;
      let totalFreight = 0;
      let totalInvoiceValue = 0;
      let totalLoading = 0;
      let totalHalt = 0;
      const billNumbers = [];
      const ewayBills = [];
      const consignorNames = [];
      const consignorGstins = [];
      const dispatchLocations = [];

      this.multiSellers.forEach((s) => {
        const wt = parseFloat(s.weight) || 0;
        const rt = parseFloat(s.rate) || 0;
        const fr = (s.billingType === 'Fixed') ? rt : (wt * rt);
        s.freight = fr;
        totalWeight += wt;
        totalFreight += fr;
        totalInvoiceValue += (parseFloat(s.invoiceValue) || 0);
        totalLoading += (parseFloat(s.loadingCharges) || 0);
        totalHalt += (parseFloat(s.haltCharges) || 0);
        if (s.billNo && !billNumbers.includes(s.billNo)) billNumbers.push(s.billNo);
        if (s.ewayBillNo && !ewayBills.includes(s.ewayBillNo)) ewayBills.push(s.ewayBillNo);
        if (s.consignor && !consignorNames.includes(s.consignor)) consignorNames.push(s.consignor);
        if (s.consignorGstin && !consignorGstins.includes(s.consignorGstin)) consignorGstins.push(s.consignorGstin);
        if (s.dispatchFromAddress && !dispatchLocations.includes(s.dispatchFromAddress)) dispatchLocations.push(s.dispatchFromAddress);
      });

      const grandDue = totalFreight + totalLoading + totalHalt;

      const singleTripData = {
        id: this.editTripId || `TRIP_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        grNo: grInfo.fullGr,
        grSeq: String(grInfo.seq),
        shortGrNo: grInfo.shortGr,
        transport: firm,
        financialYear: year,
        tripStartDate: date,
        biltyType: biltyType,
        isGstApplicable: isGstApplicable,
        truckNo: truckNo,
        truckOwner: truckOwner,
        ownerMobile: ownerMobile,
        loadType: loadType,
        driver: driver,
        driverMobile: driverMobile,
        reference: reference,

        origin: 'Rajsamand (Raj.)',
        destination: destination,
        consignor: this.multiSellers[0].consignor,
        consignorGstin: consignorGstins.join(', ') || this.multiSellers[0].consignorGstin || '',
        dispatchFromAddress: dispatchLocations.join(' | ') || this.multiSellers[0].dispatchFromAddress || 'Rajsamand (Raj.)',
        consignee: consignee,
        consigneeGstin: consigneeGstin,
        deliveryAddress: deliveryAddress,
        shipToAddress: deliveryAddress,

        material: this.multiSellers.map(s => s.material).filter(Boolean).join(', ') || 'Marble Cut Size',
        billNo: billNumbers.join(', '),
        invoiceValue: totalInvoiceValue,
        ewayBillNo: ewayBills.join(', '),

        billingType: this.multiSellers[0].billingType || 'Per Tonne',
        weight: totalWeight,
        rate: this.multiSellers[0].rate || 0,
        freight: totalFreight,
        loadingCharges: totalLoading,
        haltCharges: totalHalt,

        biltyBillingType: this.multiSellers[0].billingType || 'Per Tonne',
        biltyWeight: totalWeight,
        biltyRate: this.multiSellers[0].rate || 0,
        biltyAmount: totalFreight,

        commission: tripCommission,
        commissionStatus: tripCommissionStatus,
        commissionMode: tripCommissionMode,
        commissionDesc: tripCommissionDesc,

        otherExpense: tripOtherExpense,
        otherStatus: tripOtherStatus,
        otherMode: tripOtherMode,
        otherDesc: tripOtherDesc,

        status: 'Transit',
        partyDue: grandDue,
        partyPaid: 0,
        ownerDue: totalFreight - tripCommission,

        // Consolidated multi-seller metadata
        isConsolidated: true,
        consolidatedType: 'multi_seller',
        sellerList: this.multiSellers,
        extraSellers: this.multiSellers.slice(1),
        multiSellerCount: this.multiSellers.length
      };

      try {
        if (this.editTripId) {
          await dbService.update('trips', this.editTripId, singleTripData);
        } else {
          await dbService.add('trips', singleTripData);
        }
      } catch (err) {
        console.error("Error saving multi-seller consolidated bilty:", err);
        AppUI.showToast(`Error saving bilty: ${err.message || 'Storage error'}`, "danger");
        return;
      }

      // Check Any Debt?
      const isDebtChecked = document.getElementById('toggle-any-debt')?.checked;
      const debtAmount = parseFloat(document.getElementById('bilty-debt-amount')?.value) || 0;
      if (isDebtChecked && debtAmount > 0) {
        const primaryGr = grInfo.shortGr;
        const debtRecord = {
          id: `DEBT_BILTY_${Date.now()}`,
          date: date,
          description: `Advance / Debt on Trip ${primaryGr} (${truckNo}) - Multi-Seller Consolidated (${this.multiSellers.length} Sellers)`,
          borrower: document.getElementById('bilty-debt-borrower')?.value.trim() || driver,
          amount: debtAmount,
          mode: document.getElementById('bilty-debt-mode')?.value || 'Cash',
          status: 'Pending',
          remarks: document.getElementById('bilty-debt-remarks')?.value.trim() || 'Booked with Consolidated Bilty',
          truckNo: truckNo,
          grNo: primaryGr
        };
        try {
          await dbService.add('debts', debtRecord);
        } catch (dErr) {
          console.warn("Could not save linked debt:", dErr);
        }
      }

      AppUI.showToast(`Consolidated Multi-Seller Bilty saved successfully (${grInfo.shortGr})!`, "success");
      await this.loadAllData();
      this.currentActiveBilty = singleTripData;
      this.openPrintModal(singleTripData);
      return;
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
    const input = document.getElementById('bilty-load-type');
    if (input) input.value = val;
    const btnUnder = document.getElementById('btn-load-under');
    const btnOver = document.getElementById('btn-load-over');

    if (val === 'Over Load') {
      if (btnOver) btnOver.className = 'load-type-btn active overload';
      if (btnUnder) btnUnder.className = 'load-type-btn';
    } else {
      if (btnUnder) btnUnder.className = 'load-type-btn active underload';
      if (btnOver) btnOver.className = 'load-type-btn';
    }

    // Also sync AppSheet segmented control if present
    const seg = document.getElementById('seg-load-type');
    if (seg) {
      const btns = seg.querySelectorAll('.seg-btn');
      btns.forEach(b => {
        if (b.innerText.trim().toLowerCase() === String(val).trim().toLowerCase()) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
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
    try {
      if (this.editTripId) {
        await dbService.update('trips', this.editTripId, biltyData);
        AppUI.showToast(`Bilty ${biltyData.grNo} updated successfully!`, "success");
      } else {
        await dbService.add('trips', biltyData);
        AppUI.showToast(`Bilty ${biltyData.grNo} saved successfully!`, "success");
      }
    } catch (saveErr) {
      console.error("Error saving bilty:", saveErr);
      AppUI.showToast(`Error saving bilty: ${saveErr.message || 'Storage error'}`, "danger");
      return;
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
    this.renderAppSheet3Panels();

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
    this.multiBuyers = [];
    this.multiSellers = [];
    this.extraBuyers = [];
    this.extraSellers = [];
    const extraBuyersList = document.getElementById('extra-buyers-list');
    if (extraBuyersList) extraBuyersList.innerHTML = '';
    const extraSellersList = document.getElementById('extra-sellers-list');
    if (extraSellersList) extraSellersList.innerHTML = '';
    const summaryStrip = document.getElementById('trip-multi-summary-strip');
    if (summaryStrip) summaryStrip.classList.add('d-none');
    this.setConsignmentMode('single', document.getElementById('btn-mode-single'));
    const formEl = document.getElementById('bilty-booking-form');
    if (formEl) formEl.reset();
    this.initNewFormDefaults();
    this.generateBiltyNumber();
    this.recalculateFreightAndTotals();

    // Reset button states
    const submitBtn = document.getElementById('bilty-submit-btn');
    if (submitBtn) {
      submitBtn.className = 'btn btn-primary btn-lg shadow fw-bold';
      submitBtn.innerHTML = '<i class="bi bi-printer-fill me-1"></i> Save & Print Official Bilty';
    }

    // Reset stepper to Step 1
    if (this.formMode === 'stepper') {
      this.goToStep(1);
    }

    // Reset express inputs
    ['express-truck-no', 'express-destination', 'express-weight', 'express-rate', 'express-freight', 'express-eway'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    AppUI.showToast("Form reset. Ready for next consignment note.", "info");
  },

  // ----------------------------------------------------
  // VIEW SWITCHER (Dashboard 3-Panel <-> Bilty Create/Edit Form)
  // ----------------------------------------------------
  switchView(viewName) {
    this.currentView = viewName;
    const btnCreate = document.getElementById('btn-view-create');
    const btnRegister = document.getElementById('btn-view-register');
    const breadcrumb = document.getElementById('bilty-breadcrumb');
    const breadcrumbActive = document.getElementById('bilty-breadcrumb-active');

    if (viewName === 'create' || viewName === 'edit') {
      this.showSideBoxForm(true);
      if (btnCreate) btnCreate.classList.add('active');
      if (btnRegister) btnRegister.classList.remove('active');
      if (breadcrumb) breadcrumb.innerText = 'Home > Bilty Booking > Bilty Form';
      if (breadcrumbActive) breadcrumbActive.innerText = 'Bilty Form';
      if (!this.editTripId && this.bookingMode !== 'single') {
        this.setConsignmentMode('single', document.getElementById('btn-mode-single'));
      }
    } else {
      // 'dashboard' or 'register'
      this.showSideBoxForm(false);
      if (btnRegister) btnRegister.classList.add('active');
      if (btnCreate) btnCreate.classList.remove('active');
      if (breadcrumb) breadcrumb.innerText = 'Home > Bilty Booking > Bilty Register';
      if (breadcrumbActive) breadcrumbActive.innerText = 'Bilty Register';
      this.renderAppSheet3Panels();
    }
  },

  handleSearch(val) {
    this.searchQuery = (val || '').trim();
    const clearBtn = document.getElementById('bilty-search-clear');
    if (clearBtn) {
      clearBtn.style.display = (this.searchQuery.length > 0) ? 'block' : 'none';
    }
    const regInput = document.getElementById('reg-search-input');
    if (regInput && regInput.value !== val) regInput.value = val;
    const biltyInput = document.getElementById('bilty-search-input');
    if (biltyInput && biltyInput.value !== val) biltyInput.value = val;

    if (this.currentView !== 'dashboard') {
      this.switchView('dashboard');
    } else {
      this.renderAppSheet3Panels();
    }
  },

  // ==========================================================================
  // GOOGLE APPSHEET 3-PANEL MASTER-DETAIL DASHBOARD ENGINE
  // Exact Replica of media_1791365302532.png
  // ==========================================================================
  formatAppSheetDate(dateStr) {
    if (!dateStr) return '';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const parts = dateStr.split('T')[0].split('-');
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  },

  renderAppSheet3Panels() {
    const q = (this.searchQuery || '').trim().toLowerCase();

    // Filter trips if search is entered
    let trips = this.allTrips || [];
    if (q) {
      trips = trips.filter(t => {
        const text = [
          t.grNo, t.shortGrNo, t.truckNo, t.truckOwner, t.consignor,
          t.consignee, t.origin, t.destination, t.driver, t.billNo,
          t.reference, t.material, t.status
        ].filter(Boolean).join(' ').toLowerCase();
        return text.includes(q);
      });
    }

    // Split into MTC and TTC/SMTC
    const mtcTrips = [];
    const ttcTrips = [];

    trips.forEach(t => {
      const firm = String(t.transport || '').toUpperCase();
      const gr = String(t.grNo || '').toUpperCase();
      if (firm === 'MTC' || gr.includes('MTC')) {
        mtcTrips.push(t);
      } else {
        ttcTrips.push(t);
      }
    });

    // Sort by date descending, then grSeq descending
    const sortFn = (a, b) => {
      const dateA = a.tripStartDate || a.biltyDate || '';
      const dateB = b.tripStartDate || b.biltyDate || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return (Number(b.grSeq) || 0) - (Number(a.grSeq) || 0);
    };

    mtcTrips.sort(sortFn);
    ttcTrips.sort(sortFn);

    this.renderMtcPanel(mtcTrips);
    this.renderTtcPanel(ttcTrips);

    // If no active bilty or active bilty is not in the filtered trips, default to the latest bilty
    if (!this.currentActiveBilty || !trips.some(t => String(t.id || t.grNo) === String(this.currentActiveBilty.id || this.currentActiveBilty.grNo))) {
      const defaultBilty = mtcTrips[0] || ttcTrips[0] || null;
      if (defaultBilty) {
        this.selectBilty(defaultBilty.id || defaultBilty.grNo, false);
      } else {
        this.currentActiveBilty = null;
        const kvTable = document.getElementById('bilty-details-kv-table');
        if (kvTable) {
          kvTable.innerHTML = `<tr><td class="text-center text-muted py-4">No bilty consignments found</td></tr>`;
        }
      }
    } else {
      this.selectBilty(this.currentActiveBilty.id || this.currentActiveBilty.grNo, false);
    }
  },

  renderMtcPanel(mtcTrips) {
    const feed = document.getElementById('mtc-panel-feed');
    if (!feed) return;

    if (mtcTrips.length === 0) {
      feed.innerHTML = `
        <div class="p-4 text-center text-muted">
          <i class="bi bi-inbox fs-3 d-block mb-1 text-secondary"></i>
          <span style="font-size: 12px;">No MTC bilties found</span>
        </div>
      `;
      return;
    }

    // Group by Date
    const dateMap = new Map();
    mtcTrips.slice(0, 300).forEach(t => {
      const d = this.formatAppSheetDate(t.tripStartDate || t.biltyDate) || 'Undated';
      if (!dateMap.has(d)) dateMap.set(d, []);
      dateMap.get(d).push(t);
    });

    let html = '';
    let grpIndex = 0;
    dateMap.forEach((group, dStr) => {
      grpIndex++;
      const grpId = `mtc-grp-${grpIndex}`;

      html += `
        <div class="mtc-date-ribbon" onclick="BiltyBookingModule.toggleDateGroup('${grpId}')" title="Click to expand/collapse date group">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-chevron-down mtc-arrow-icon" id="arrow-${grpId}" style="font-size: 10px; color: #5f6368; transition: transform 0.2s;"></i>
            <span style="color: #34a853; font-size: 11px;">●</span>
            <span class="fw-bold">${dStr}</span>
          </div>
          <span class="mtc-badge-count">${group.length}</span>
        </div>
        <div class="mtc-group-content" id="content-${grpId}">
      `;

      group.forEach(t => {
        const id = t.id || t.grNo;
        const shortGr = t.shortGrNo || (t.grNo ? t.grNo.split('-').pop() : 'MTC');
        const isActive = this.currentActiveBilty && String(this.currentActiveBilty.id || this.currentActiveBilty.grNo) === String(id);
        const isSettled = String(t.status || '').toLowerCase() === 'settled' || String(t.status || '').toLowerCase() === 'completed';
        const biltyColor = isSettled ? '#2e7d32' : '#1a73e8';
        const dotColor = isSettled ? '#2e7d32' : '#34a853';

        html += `
          <div class="mtc-item-row ${isActive ? 'active-row' : ''} ${isSettled ? 'row-settled' : ''}" data-trip-id="${id}" onclick="BiltyBookingModule.selectBilty('${id}')">
            <div class="mtc-action-icons">
              <i class="bi bi-arrow-repeat" title="Sync / Re-calculate" onclick="event.stopPropagation(); BiltyBookingModule.syncBiltyDirect('${id}')"></i>
              <i class="bi bi-box-arrow-down" title="Download Print A4" onclick="event.stopPropagation(); BiltyBookingModule.printBiltyDirect('${id}')"></i>
              <i class="bi bi-clipboard" title="Duplicate Consignment" onclick="event.stopPropagation(); BiltyBookingModule.duplicateBiltyById('${id}')"></i>
              <i class="bi bi-truck" title="Truck Trips" onclick="event.stopPropagation(); window.location.href='trips.html?truck=${encodeURIComponent(t.truckNo || '')}'"></i>
            </div>
            <div class="d-flex align-items-center gap-1">
              <span style="color: ${dotColor}; font-size: 10px;">●</span>
              <span class="fw-bold" style="font-size: 12.5px; color: ${biltyColor};">${shortGr}</span>
            </div>
          </div>
        `;
      });

      html += `</div>`;
    });

    feed.innerHTML = html;
  },

  toggleDateGroup(grpId) {
    const content = document.getElementById(`content-${grpId}`);
    const arrow = document.getElementById(`arrow-${grpId}`);
    if (!content) return;
    if (content.style.display === 'none') {
      content.style.display = 'block';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    } else {
      content.style.display = 'none';
      if (arrow) arrow.style.transform = 'rotate(-90deg)';
    }
  },

  renderTtcPanel(ttcTrips) {
    const tbody = document.getElementById('ttc-table-tbody');
    if (!tbody) return;

    if (ttcTrips.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted py-4" style="font-size: 12px;">
            No TTC or SMTC bilties found
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    ttcTrips.slice(0, 300).forEach(t => {
      const id = t.id || t.grNo;
      const isActive = this.currentActiveBilty && String(this.currentActiveBilty.id || this.currentActiveBilty.grNo) === String(id);
      const isSettled = String(t.status || '').toLowerCase() === 'settled' || String(t.status || '').toLowerCase() === 'completed';
      const biltyColor = isSettled ? '#2e7d32' : '#202124';
      const dotColor = isSettled ? '#2e7d32' : '#34a853';

      const displayBiltyNo = t.shortGrNo || (t.truckNo ? t.truckNo.replace(/^RJ52/, '') : (t.grNo ? t.grNo.split('-').pop() : 'TTC'));
      const toDest = (t.destination || '-').toUpperCase();
      const ref = t.reference || t.billNo || '-';
      const driver = (t.driver || '-').toUpperCase();
      const dateStr = this.formatAppSheetDate(t.tripStartDate || t.biltyDate);

      html += `
        <tr class="ttc-row-item ${isActive ? 'active-row' : ''} ${isSettled ? 'row-settled' : ''}" data-trip-id="${id}" onclick="BiltyBookingModule.selectBilty('${id}')">
          <td>
            <span style="color: ${dotColor}; font-size: 10px; margin-right: 3px;">●</span>
            <span class="fw-bold" style="color: ${biltyColor};">${displayBiltyNo}</span>
          </td>
          <td>${toDest}</td>
          <td>${ref}</td>
          <td>${driver}</td>
          <td>
            <span style="color: ${dotColor}; font-size: 10px; margin-right: 3px;">●</span>
            <span style="${isSettled ? 'color: #2e7d32; font-weight: 600;' : ''}">${dateStr}</span>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  selectBilty(tripId, scroll = true) {
    const trip = this.allTrips.find(t => String(t.id) === String(tripId) || String(t.grNo) === String(tripId));
    if (!trip) return;

    this.currentActiveBilty = trip;

    // Highlight row in MTC feed
    document.querySelectorAll('.mtc-item-row').forEach(row => {
      if (row.getAttribute('data-trip-id') === String(tripId)) {
        row.classList.add('active-row');
        if (scroll) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        row.classList.remove('active-row');
      }
    });

    // Highlight row in TTC feed
    document.querySelectorAll('.ttc-row-item').forEach(row => {
      if (row.getAttribute('data-trip-id') === String(tripId)) {
        row.classList.add('active-row');
        if (scroll) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        row.classList.remove('active-row');
      }
    });

    this.renderBiltyDetails(trip);
  },

  renderBiltyDetails(t) {
    const table = document.getElementById('bilty-details-kv-table');
    if (!table) return;

    const shortGr = t.shortGrNo || (t.grNo ? t.grNo.split('-').pop() : '-');
    const dateStr = this.formatAppSheetDate(t.tripStartDate || t.biltyDate);
    const freightVal = Number(t.freight) || 0;
    const advVal = Number(t.advancePaid || t.partyPaid) || 0;
    const balVal = Number(t.balanceDue || t.partyDue) || (freightVal - advVal);
    const ownerDueVal = Number(t.ownerDue) || 0;
    const commVal = Number(t.commission) || 0;
    const otherVal = Number(t.otherExpenses) || 0;
    const isSettled = String(t.status || '').toLowerCase() === 'settled' || String(t.status || '').toLowerCase() === 'completed';

    table.innerHTML = `
      <tbody>
        <tr>
          <td class="prop-label">Lock for Edit</td>
          <td class="prop-value">
            <span class="badge bg-light text-dark border">N</span>
          </td>
        </tr>
        <tr>
          <td class="prop-label">Bilty No.</td>
          <td class="prop-value ${isSettled ? 'text-success fw-bold' : 'text-primary'}">${shortGr}</td>
        </tr>
        <tr>
          <td class="prop-label">Bilty Date</td>
          <td class="prop-value">${dateStr}</td>
        </tr>
        <tr>
          <td class="prop-label">Bilty Type</td>
          <td class="prop-value">${t.biltyType || 'Regular'}</td>
        </tr>
        <tr>
          <td class="prop-label">Truck No.</td>
          <td class="prop-value text-dark fw-bold">${t.truckNo || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Truck Owner Name</td>
          <td class="prop-value">${t.truckOwner || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Load Type</td>
          <td class="prop-value">${t.loadType || 'Under Load'}</td>
        </tr>
        <tr>
          <td class="prop-label">Commission</td>
          <td class="prop-value">${commVal > 0 ? ('₹ ' + commVal.toLocaleString('en-IN')) : '₹ 0'}</td>
        </tr>
        <tr>
          <td class="prop-label">Status</td>
          <td class="prop-value">
            ${isSettled 
              ? `<span class="badge" style="background: #e6f4ea; color: #137333; border: 1px solid #ceead6; font-weight: 600; padding: 4px 8px;">● ${t.status || 'Completed'}</span>`
              : `<span class="badge" style="background: #e8f0fe; color: #1a73e8; border: 1px solid #d2e3fc; font-weight: 600; padding: 4px 8px;">● ${t.status || 'In Transit'}</span>`
            }
          </td>
        </tr>
        <tr>
          <td class="prop-label">Mode</td>
          <td class="prop-value">${t.billingType || t.bookingMode || 'Single'}</td>
        </tr>
        <tr>
          <td class="prop-label">Other</td>
          <td class="prop-value">${otherVal > 0 ? ('₹ ' + otherVal.toLocaleString('en-IN')) : '0'}</td>
        </tr>
        <tr>
          <td class="prop-label">Reference</td>
          <td class="prop-value">${t.reference || t.billNo || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Driver</td>
          <td class="prop-value">${t.driver || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">From</td>
          <td class="prop-value">${t.origin || 'Rajsamand (Raj.)'}</td>
        </tr>
        <tr>
          <td class="prop-label">To</td>
          <td class="prop-value fw-bold text-dark">${t.destination || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Consignor</td>
          <td class="prop-value">${t.consignor || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Consignee</td>
          <td class="prop-value">${t.consignee || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Material</td>
          <td class="prop-value">${t.material || 'Marble Powder / Goods'}</td>
        </tr>
        <tr>
          <td class="prop-label">Billing Type</td>
          <td class="prop-value">${t.billingType || 'Per Tonne'}</td>
        </tr>
        <tr>
          <td class="prop-label">Weight</td>
          <td class="prop-value">${t.weight ? (t.weight + ' MT') : '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Rate</td>
          <td class="prop-value">${t.rate ? ('₹ ' + Number(t.rate).toLocaleString('en-IN')) : '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Freight</td>
          <td class="prop-value text-success fw-bold">${AppUI.formatCurrency(freightVal)}</td>
        </tr>
        <tr>
          <td class="prop-label">Advance Paid</td>
          <td class="prop-value">${AppUI.formatCurrency(advVal)}</td>
        </tr>
        <tr>
          <td class="prop-label">Balance Due</td>
          <td class="prop-value text-danger fw-bold">${AppUI.formatCurrency(balVal)}</td>
        </tr>
        <tr>
          <td class="prop-label">Owner Due</td>
          <td class="prop-value text-secondary">${AppUI.formatCurrency(ownerDueVal)}</td>
        </tr>
        <tr>
          <td class="prop-label">GST By Party</td>
          <td class="prop-value">${t.isGstPaidByParty || 'No'}</td>
        </tr>
        <tr>
          <td class="prop-label">GST Amount</td>
          <td class="prop-value">${AppUI.formatCurrency(Number(t.gstAmount) || 0)}</td>
        </tr>
        <tr>
          <td class="prop-label">Delivery Address</td>
          <td class="prop-value" style="word-break: break-word;">${t.deliveryAddress || '-'}</td>
        </tr>
        <tr>
          <td class="prop-label">Full G.R. Number</td>
          <td class="prop-value font-monospace">${t.grNo || '-'}</td>
        </tr>
      </tbody>
    `;
  },

  expandPanel(panelType) {
    const mtcCol = document.querySelector('.panel-mtc-col');
    const ttcCol = document.querySelector('.panel-ttc-col');
    const detailsCol = document.getElementById('panel-details-col');

    if (panelType === 'mtc' && mtcCol) {
      if (mtcCol.classList.contains('panel-expanded')) {
        mtcCol.classList.remove('panel-expanded');
        AppUI.showToast("MTC column restored", "info");
      } else {
        document.querySelectorAll('.appsheet-panel-card').forEach(c => c.classList.remove('panel-expanded'));
        mtcCol.classList.add('panel-expanded');
        AppUI.showToast("MTC column expanded full-screen", "info");
      }
    } else if (panelType === 'ttc' && ttcCol) {
      if (ttcCol.classList.contains('panel-expanded')) {
        ttcCol.classList.remove('panel-expanded');
        AppUI.showToast("TTC column restored", "info");
      } else {
        document.querySelectorAll('.appsheet-panel-card').forEach(c => c.classList.remove('panel-expanded'));
        ttcCol.classList.add('panel-expanded');
        AppUI.showToast("TTC column expanded full-screen", "info");
      }
    } else if (panelType === 'details' && detailsCol) {
      if (detailsCol.classList.contains('panel-expanded')) {
        detailsCol.classList.remove('panel-expanded');
        AppUI.showToast("Bilty details restored", "info");
      } else {
        document.querySelectorAll('.appsheet-panel-card').forEach(c => c.classList.remove('panel-expanded'));
        detailsCol.classList.add('panel-expanded');
        AppUI.showToast("Bilty details expanded full-screen", "info");
      }
    }
  },

  showSideBoxForm(showForm) {
    const detailsView = document.getElementById('col3-details-view');
    const createView = document.getElementById('bilty-create-view');
    const detailsCol = document.getElementById('panel-details-col');

    if (showForm) {
      if (detailsView) detailsView.style.display = 'none';
      if (createView) createView.style.display = 'block';
      if (detailsCol) detailsCol.classList.add('in-form-mode');
    } else {
      if (createView) createView.style.display = 'none';
      if (detailsView) detailsView.style.display = 'flex';
      if (detailsCol) detailsCol.classList.remove('in-form-mode');
    }
  },

  navigateBilty(delta) {
    if (!this.allTrips || this.allTrips.length === 0) return;
    
    // Determine active list (MTC or TTC)
    let list = this.allTrips;
    if (this.currentActiveBilty) {
      const firm = String(this.currentActiveBilty.transport || '').toUpperCase();
      const isMtc = firm === 'MTC' || String(this.currentActiveBilty.grNo || '').includes('MTC');
      list = this.allTrips.filter(t => {
        const tFirm = String(t.transport || '').toUpperCase();
        const tMtc = tFirm === 'MTC' || String(t.grNo || '').includes('MTC');
        return isMtc ? tMtc : !tMtc;
      });
    }

    if (list.length === 0) list = this.allTrips;

    const currId = this.currentActiveBilty ? String(this.currentActiveBilty.id || this.currentActiveBilty.grNo) : null;
    let idx = list.findIndex(t => String(t.id || t.grNo) === currId);
    if (idx === -1) idx = 0;

    let nextIdx = idx + delta;
    if (nextIdx < 0) nextIdx = list.length - 1;
    if (nextIdx >= list.length) nextIdx = 0;

    const target = list[nextIdx];
    if (target) {
      this.selectBilty(target.id || target.grNo, true);
    }
  },

  openCreateForm(firm = 'TTC') {
    this.editTripId = null;
    this.initNewFormDefaults();
    
    // Set firm
    const firmEl = document.getElementById('bilty-firm');
    if (firmEl) firmEl.value = firm;
    
    // Set segmented button
    const mtcBtn = document.getElementById('btn-seg-mtc');
    const ttcBtn = document.getElementById('btn-seg-ttc');
    if (firm === 'MTC') {
      if (mtcBtn) mtcBtn.classList.add('active');
      if (ttcBtn) ttcBtn.classList.remove('active');
    } else {
      if (ttcBtn) ttcBtn.classList.add('active');
      if (mtcBtn) mtcBtn.classList.remove('active');
    }

    const grLabel = document.getElementById('appsheet-gr-label');
    if (grLabel) grLabel.innerText = `${firm} G.R.No. *`;

    this.generateBiltyNumber();
    this.showSideBoxForm(true);
  },

  editActiveBilty() {
    if (!this.currentActiveBilty) {
      AppUI.showToast("Please select a bilty first to edit.", "warning");
      return;
    }
    this.loadTripForEditing(this.currentActiveBilty.id || this.currentActiveBilty.grNo);
    this.showSideBoxForm(true);
  },

  printActiveBilty() {
    if (!this.currentActiveBilty) {
      AppUI.showToast("Please select a bilty to print.", "warning");
      return;
    }
    this.openPrintModal(this.currentActiveBilty);
  },

  openLedgerForActiveBilty() {
    if (!this.currentActiveBilty) {
      window.location.href = 'ledger.html';
      return;
    }
    const t = this.currentActiveBilty;
    const biltyParam = encodeURIComponent(t.shortGrNo || t.grNo || '');
    const partyParam = encodeURIComponent(t.consignor || t.consignee || '');
    window.location.href = `ledger.html?bilty=${biltyParam}&party=${partyParam}`;
  },

  syncBiltyDirect(id) {
    this.selectBilty(id, false);
    AppUI.showToast("Bilty records synchronized and up-to-date.", "info");
  },

  printBiltyDirect(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id) || String(t.grNo) === String(id));
    if (trip) {
      this.openPrintModal(trip);
    }
  },

  duplicateBiltyById(id) {
    const trip = this.allTrips.find(t => String(t.id) === String(id) || String(t.grNo) === String(id));
    if (trip) {
      this.duplicateBilty(trip);
    }
  },

  toggleLayout() {
    const container = document.querySelector('.appsheet-3panel-container');
    if (!container) return;
    if (container.classList.contains('layout-stacked')) {
      container.classList.remove('layout-stacked');
      AppUI.showToast("Switched to 3-Column Master View", "info");
    } else {
      container.classList.add('layout-stacked');
      AppUI.showToast("Switched to Stacked View", "info");
    }
  },

  // ----------------------------------------------------
  // TOP KPI SUMMARY & APPSHEET SIDE PANELS UPDATER
  // ----------------------------------------------------
  updateKPIs() {
    const totalCount = this.allTrips.length;
    const setEl = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    setEl('header-total-count', totalCount.toLocaleString('en-IN'));
    setEl('kpi-total-bilties', totalCount.toLocaleString('en-IN'));
    setEl('appsheet-header-count', totalCount.toLocaleString('en-IN'));

    const todayStr = new Date().toISOString().split('T')[0];
    let todayCount = 0;
    let ttcCount = 0;
    let mtcCount = 0;
    let smtcCount = 0;
    let totalFreight = 0;

    let fy26_27 = 0;
    let fy25_26 = 0;
    let fy24_25 = 0;

    this.allTrips.forEach(t => {
      if (t.tripStartDate === todayStr) todayCount++;
      const firm = t.transport || (t.grNo && t.grNo.includes('MTC') ? 'MTC' : 'TTC');
      if (firm === 'TTC') ttcCount++;
      else if (firm === 'MTC') mtcCount++;
      else if (firm === 'SMTC') smtcCount++;

      const freight = (Number(t.freight) || 0);
      totalFreight += freight;

      const fy = t.financialYear || (t.grNo && t.grNo.startsWith('2026-2027') ? '2026-2027' : (t.grNo && t.grNo.startsWith('2025-2026') ? '2025-2026' : (t.grNo && t.grNo.startsWith('2024-2025') ? '2024-2025' : 'Other')));
      if (fy === '2026-2027') fy26_27 += freight;
      else if (fy === '2025-2026') fy25_26 += freight;
      else if (fy === '2024-2025') fy24_25 += freight;
    });

    setEl('kpi-today-bilties', todayCount);
    setEl('kpi-ttc-bilties', ttcCount.toLocaleString('en-IN'));
    setEl('kpi-mtc-bilties', mtcCount.toLocaleString('en-IN'));
    setEl('kpi-smtc-bilties', smtcCount.toLocaleString('en-IN'));
    setEl('kpi-total-freight', AppUI.formatCurrency(totalFreight));

    setEl('fy-val-2627', AppUI.formatCurrency(fy26_27));
    setEl('fy-val-2526', AppUI.formatCurrency(fy25_26));
    setEl('fy-val-2425', AppUI.formatCurrency(fy24_25));
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

    let html = `
      <div class="table-responsive">
        <table class="appsheet-table">
          <thead>
            <tr>
              <th style="width: 32px; text-align: center;">●</th>
              <th style="width: 145px;">G.R.NO.</th>
              <th style="width: 90px;">Date</th>
              <th style="width: 115px;">Truck No.</th>
              <th style="width: 220px;">Parties (C/O &rarr; C/E)</th>
              <th style="width: 140px;">From &rarr; To</th>
              <th style="width: 75px;">Weight</th>
              <th style="width: 105px; text-align: right;">Freight</th>
              <th style="width: 90px; text-align: right;">Advance</th>
              <th style="width: 90px; text-align: right;">Balance</th>
              <th style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
    `;

    dateGroups.forEach((trips, dateKey) => {
      const dayFreight = trips.reduce((sum, t) => sum + (Number(t.freight) || 0), 0);

      // Date Header Row
      html += `
        <tr style="background: #f1f3f4;">
          <td colspan="7" class="fw-bold" style="padding: 6px 10px; font-size: 0.85rem; color: #202124;">
            <i class="bi bi-calendar3 text-primary me-1"></i> ${dateKey}
            <span class="appsheet-badge-number ms-2">${trips.length} Bilties</span>
          </td>
          <td class="text-end fw-bold text-success" style="padding: 6px 10px; font-size: 0.85rem;">
            ${AppUI.formatCurrency(dayFreight)}
          </td>
          <td colspan="3"></td>
        </tr>
      `;

      trips.forEach(t => {
        const shortGr = t.shortGrNo || (t.grNo ? t.grNo.split('-').pop() : 'N/A');
        const freight = Number(t.freight) || 0;
        const advance = Number(t.advancePaid) || 0;
        const balance = Number(t.balanceDue) || (freight - advance);

        // Status Dot
        let statusDotClass = 'dot-blue';
        let statusText = t.status || 'In-Transit';
        if (t.status === 'Delivered' || t.status === 'Completed') {
          statusDotClass = 'dot-green';
        } else if (t.status === 'Loading' || t.status === 'Booked') {
          statusDotClass = 'dot-yellow';
        } else if (t.status === 'Cancelled') {
          statusDotClass = 'dot-red';
        }

        html += `
          <tr class="appsheet-row" onclick="BiltyBookingModule.openBiltyDetails('${t.id || t.grNo}')" title="Click to view AppSheet Drilldown Details">
            <td style="text-align: center;">
              <span class="appsheet-status-dot ${statusDotClass}" title="${statusText}">●</span>
            </td>
            <td>
              <span class="fw-bold font-monospace text-primary">${shortGr}</span>
              ${t.isMultiGr ? `<span class="badge bg-warning-subtle text-dark border ms-1" style="font-size: 0.65rem;" title="Part Load (${t.multiGrIndex}/${t.multiGrTotalCount})"><i class="bi bi-layers"></i> ${t.multiGrIndex}/${t.multiGrTotalCount}</span>` : ''}
              <small class="text-muted d-block" style="font-size: 0.7rem;">${t.grNo || ''}</small>
            </td>
            <td style="font-size: 0.85rem;">${t.tripStartDate || '---'}</td>
            <td class="font-monospace fw-bold text-dark">
              ${t.truckNo || '---'}
              <small class="d-block text-muted text-truncate" style="font-size: 0.7rem; max-width: 110px;">${t.truckOwner || ''}</small>
            </td>
            <td>
              <div class="text-truncate fw-semibold" style="max-width: 210px;" title="${t.consignor || ''}">
                <span class="text-muted">C/O:</span> ${t.consignor || '---'}
              </div>
              <div class="text-truncate text-muted" style="max-width: 210px;" title="${t.consignee || ''}">
                <span class="text-primary">C/E:</span> ${t.consignee || '---'}
              </div>
            </td>
            <td>
              <div class="text-truncate" style="max-width: 135px;" title="${t.origin} to ${t.destination}">
                ${t.origin || 'Rajsamand'} &rarr; ${t.destination || '---'}
              </div>
              <small class="text-muted text-truncate d-block" style="font-size: 0.7rem; max-width: 135px;">${t.material || 'Marble Powder'}</small>
            </td>
            <td>${t.weight || 0} MT</td>
            <td class="text-end fw-bold text-success">${AppUI.formatCurrency(freight)}</td>
            <td class="text-end text-muted">${AppUI.formatCurrency(advance)}</td>
            <td class="text-end fw-bold ${balance > 0 ? 'text-danger' : 'text-success'}">${AppUI.formatCurrency(balance)}</td>
            <td style="text-align: center;" class="appsheet-chevron">&gt;</td>
          </tr>
        `;
      });
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

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

        ${trip.sellerList && trip.sellerList.length > 1 ? `
          <div class="col-12">
            <div class="bilty-detail-modal-card bg-white shadow-sm">
              <h6 class="text-primary fw-bold"><i class="bi bi-shop me-2"></i> 4. Consolidated Sellers Breakdown (${trip.sellerList.length} Sellers on Single G.R.)</h6>
              <div class="table-responsive">
                <table class="table table-sm table-bordered align-middle mb-0" style="font-size: 0.85rem;">
                  <thead class="table-light">
                    <tr>
                      <th style="width: 40px;">#</th>
                      <th>Consignor Party</th>
                      <th>GSTIN</th>
                      <th>Dispatch / Quarry</th>
                      <th>Material</th>
                      <th class="text-center">Weight</th>
                      <th class="text-center">Rate</th>
                      <th class="text-end">Freight</th>
                      <th>Bill / E-Way</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${trip.sellerList.map((s, idx) => `
                      <tr>
                        <td class="fw-bold text-center">S${idx + 1}</td>
                        <td class="fw-bold text-dark">${s.consignor}</td>
                        <td class="font-monospace small text-muted">${s.consignorGstin || '-'}</td>
                        <td>${s.dispatchFromAddress || '-'}</td>
                        <td>${s.material || '-'}</td>
                        <td class="text-center fw-bold">${s.weight} MT</td>
                        <td class="text-center">${s.billingType === 'Fixed' ? 'Fixed' : '₹' + s.rate}</td>
                        <td class="text-end text-success fw-bold">₹${Number(s.freight || 0).toLocaleString('en-IN')}</td>
                        <td class="small font-monospace">${s.billNo || '-'}${s.ewayBillNo ? ' / ' + s.ewayBillNo : ''}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ` : ''}

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

    // Restore multi-seller dynamic rows if consolidated
    if (trip.extraSellers && trip.extraSellers.length > 0) {
      this.extraSellers = JSON.parse(JSON.stringify(trip.extraSellers));
      this.renderExtraSellers();
    } else {
      this.extraSellers = [];
      const el = document.getElementById('extra-sellers-list');
      if (el) el.innerHTML = '';
    }

    // Restore multi-buyer dynamic rows if multi-drop
    if (trip.extraBuyers && trip.extraBuyers.length > 0) {
      this.extraBuyers = JSON.parse(JSON.stringify(trip.extraBuyers));
      this.renderExtraBuyers();
    } else {
      this.extraBuyers = [];
      const el = document.getElementById('extra-buyers-list');
      if (el) el.innerHTML = '';
    }

    this.recalculateAllTotals();
    this.recalculateFreightAndTotals();
    this.updateLivePreview();
    this.setFormMode('full'); // Show all sections expanded when editing
  },

  // ----------------------------------------------------
  // PIXEL-PERFECT OFFICIAL A4 BILTY PRINT GENERATOR
  // ----------------------------------------------------
  printOrientation: 'portrait',

  setPrintOrientation(orientation = 'portrait') {
    this.printOrientation = orientation;
    const btnPortrait = document.getElementById('btn-orient-portrait');
    const btnLandscape = document.getElementById('btn-orient-landscape');
    const previewContainer = document.getElementById('bilty-print-preview');

    let styleEl = document.getElementById('bilty-print-page-style');
    if (!styleEl && typeof document !== 'undefined' && document.head) {
      styleEl = document.createElement('style');
      styleEl.id = 'bilty-print-page-style';
      document.head.appendChild(styleEl);
    }

    if (orientation === 'landscape') {
      if (btnLandscape) {
        btnLandscape.className = 'btn btn-warning active fw-bold px-3';
      }
      if (btnPortrait) {
        btnPortrait.className = 'btn btn-outline-light px-3';
      }
      if (styleEl) {
        styleEl.innerHTML = `@media print { @page { size: A4 landscape !important; margin: 6mm 8mm !important; } }`;
      }
      if (typeof document !== 'undefined' && document.body && document.body.classList) {
        document.body.classList.remove('print-portrait');
        document.body.classList.add('print-landscape');
      }
      if (previewContainer && previewContainer.classList) {
        previewContainer.classList.remove('preview-portrait');
        previewContainer.classList.add('preview-landscape');
      }
    } else {
      // Default: सीधी (Portrait)
      if (btnPortrait) {
        btnPortrait.className = 'btn btn-warning active fw-bold px-3';
      }
      if (btnLandscape) {
        btnLandscape.className = 'btn btn-outline-light px-3';
      }
      if (styleEl) {
        styleEl.innerHTML = `@media print { @page { size: A4 portrait !important; margin: 8mm 6mm !important; } }`;
      }
      if (typeof document !== 'undefined' && document.body && document.body.classList) {
        document.body.classList.remove('print-landscape');
        document.body.classList.add('print-portrait');
      }
      if (previewContainer && previewContainer.classList) {
        previewContainer.classList.remove('preview-landscape');
        previewContainer.classList.add('preview-portrait');
      }
    }
  },

  triggerPrint() {
    this.setPrintOrientation(this.printOrientation || 'portrait');
    setTimeout(() => {
      window.print();
    }, 100);
  },

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
    this.setPrintOrientation('portrait');

    // Check if this trip belongs to a multi-GR batch
    if (trip && trip.tripGroupId) {
      const groupTrips = (this.allTrips || []).filter(t => t.tripGroupId === trip.tripGroupId);
      if (groupTrips.length > 1) {
        this.openMultiPrintModal(groupTrips);
        return;
      }
    }

    const tabsBar = document.getElementById('multi-bilty-tabs-bar');
    if (tabsBar) tabsBar.classList.add('d-none');
    const btnPrintAll = document.getElementById('btn-print-all-grs');
    if (btnPrintAll) btnPrintAll.classList.add('d-none');
    const btnPrintSingle = document.getElementById('btn-print-single-gr');
    if (btnPrintSingle) btnPrintSingle.innerHTML = '<i class="bi bi-printer me-1"></i> Print Consignment Note';

    this.renderPrintPreview(trip);
    const modalEl = document.getElementById('biltyPrintModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  },

  openMultiPrintModal(trips) {
    this.currentBatchTrips = trips;
    this.activeBatchIndex = 'all';
    this.setPrintOrientation('portrait');

    const tabsBar = document.getElementById('multi-bilty-tabs-bar');
    if (tabsBar) tabsBar.classList.remove('d-none');

    const batchInfo = document.getElementById('multi-batch-info');
    if (batchInfo) {
      batchInfo.innerText = `${trips.length} Bilties Generated (${trips.map(t => t.shortGrNo || t.grSeq).join(', ')})`;
    }

    const pillsContainer = document.getElementById('multi-gr-pills-container');
    if (pillsContainer) {
      let pillsHTML = `
        <button type="button" class="btn btn-outline-primary active" id="pill-batch-all" onclick="BiltyBookingModule.selectMultiPrintTab('all')">
          <i class="bi bi-collection-fill me-1"></i> All ${trips.length} GRs (Together)
        </button>
      `;
      trips.forEach((t, i) => {
        const partyLabel = t.consignee || t.consignor || `GR ${i+1}`;
        const shortName = partyLabel.length > 14 ? partyLabel.substring(0, 14) + '...' : partyLabel;
        pillsHTML += `
          <button type="button" class="btn btn-outline-secondary" id="pill-batch-${i}" onclick="BiltyBookingModule.selectMultiPrintTab(${i})">
            ${t.shortGrNo || t.grSeq} (${shortName})
          </button>
        `;
      });
      pillsContainer.innerHTML = pillsHTML;
    }

    const btnPrintAll = document.getElementById('btn-print-all-grs');
    if (btnPrintAll) btnPrintAll.classList.remove('d-none');

    const btnPrintSingle = document.getElementById('btn-print-single-gr');
    if (btnPrintSingle) btnPrintSingle.innerHTML = '<i class="bi bi-printer me-1"></i> Print All Consignments';

    this.renderMultiPrintPreview(trips, 'all');

    const modalEl = document.getElementById('biltyPrintModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  },

  selectMultiPrintTab(target) {
    this.activeBatchIndex = target;
    const container = document.getElementById('multi-gr-pills-container');
    if (container) {
      container.querySelectorAll('.btn').forEach(b => {
        b.classList.remove('active', 'btn-outline-primary');
        b.classList.add('btn-outline-secondary');
      });
      const activeBtn = (target === 'all')
        ? document.getElementById('pill-batch-all')
        : document.getElementById(`pill-batch-${target}`);
      if (activeBtn) {
        activeBtn.classList.remove('btn-outline-secondary');
        activeBtn.classList.add('active', 'btn-outline-primary');
      }
    }

    const btnPrintAll = document.getElementById('btn-print-all-grs');
    const btnPrintSingle = document.getElementById('btn-print-single-gr');

    if (target === 'all') {
      if (btnPrintAll) btnPrintAll.classList.remove('d-none');
      if (btnPrintSingle) btnPrintSingle.innerHTML = '<i class="bi bi-printer me-1"></i> Print All Consignments';
      this.renderMultiPrintPreview(this.currentBatchTrips, 'all');
    } else {
      if (btnPrintAll) btnPrintAll.classList.remove('d-none');
      const trip = this.currentBatchTrips[target];
      this.currentActiveBilty = trip;
      if (btnPrintSingle) btnPrintSingle.innerHTML = `<i class="bi bi-printer me-1"></i> Print GR ${trip.shortGrNo || trip.grSeq} Only`;
      this.renderPrintPreview(trip);
    }
  },

  renderMultiPrintPreview(trips, mode = 'all') {
    const previewContainer = document.getElementById('bilty-print-preview');
    if (!previewContainer) return;

    if (mode === 'all') {
      let combinedHTML = '';
      trips.forEach((trip, idx) => {
        const docHTML = this.getBiltyDocHTML(trip);
        combinedHTML += docHTML;
        if (idx < trips.length - 1) {
          combinedHTML += '<div class="bilty-print-page-break"></div>';
        }
      });
      previewContainer.innerHTML = combinedHTML;
    }
  },

  printAllMultiBilties() {
    this.selectMultiPrintTab('all');
    this.setPrintOrientation(this.printOrientation || 'portrait');
    setTimeout(() => {
      window.print();
    }, 150);
  },

  renderPrintPreview(trip) {
    const container = document.getElementById('bilty-print-preview');
    if (!container) return;
    container.innerHTML = this.getBiltyDocHTML(trip);
  },

  getBiltyDocHTML(trip) {
    if (!trip) return '';
    const firm = trip.transport || 'TTC';
    let firmTitle = 'TRIVENI TRANSPORT COMPANY';
    let subtitle = 'FLEET OWNERS, TRANSPORT CONTRACTORS & DELIVERY AGENT';
    let address = 'N.H. 8, Bhagwanda, Dist. Rajsamand (Raj.)-313326';
    let gstCode = '08';
    let gstNo = '08AUJPP4423D1ZP';
    let panNo = 'AUJPP4423D';
    let mob1 = 'M. 9414659401, 9828330686';
    let mob2 = '9414312586, 9982230036';
    let email = 'mahaveer0236@gmail.com';
    let bankName = 'IDBI Bank, Rajsamand (Raj.)';
    let bankAccNo = '104102000015659';
    let bankIfsc = 'IBKL0000104';

    if (firm === 'MTC') {
      firmTitle = 'MAHAVEER TRANSPORT COMPANY';
      gstNo = '08AABFM1234N1ZT';
      mob1 = 'M. 9414312586, 9982230036';
      mob2 = '9414659401, 9828330686';
    } else if (firm === 'SMTC') {
      firmTitle = 'SHREE MAHAVEER TRANSPORT COMPANY';
      gstNo = '08AAACS5678Q1Z3';
    }

    let displayDate = trip.tripStartDate || trip.biltyDate || '18/07/2026';
    if (displayDate.includes('-')) {
      const parts = displayDate.split('-');
      if (parts.length === 3) displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const ganeshaSrc = (typeof BILTY_IMAGES !== 'undefined' && BILTY_IMAGES.ganesha) 
      ? BILTY_IMAGES.ganesha 
      : '../assets/bilty_template/img_0_X10.png';
    const truckSrc = (typeof BILTY_IMAGES !== 'undefined' && BILTY_IMAGES.truck) 
      ? BILTY_IMAGES.truck 
      : '../assets/bilty_template/img_1_X11.png';
    const eagleSrc = (typeof BILTY_IMAGES !== 'undefined' && BILTY_IMAGES.eagle) 
      ? BILTY_IMAGES.eagle 
      : '../assets/bilty_template/img_2_X8.png';

    const isMultiSeller = (trip.sellerList && trip.sellerList.length > 1) || 
                          (trip.extraSellers && trip.extraSellers.length > 0) ||
                          trip.consolidatedType === 'multi_seller';

    let sellersList = [];
    if (trip.sellerList && trip.sellerList.length > 0) {
      sellersList = trip.sellerList;
    } else if (trip.extraSellers && trip.extraSellers.length > 0) {
      sellersList = [
        {
          consignor: trip.consignor,
          consignorGstin: trip.consignorGstin,
          dispatchFromAddress: trip.dispatchFromAddress || trip.dispatchFrom || trip.origin,
          material: trip.material,
          weight: trip.weight,
          rate: trip.rate,
          freight: trip.freight,
          billNo: trip.billNo,
          invoiceValue: trip.invoiceValue,
          ewayBillNo: trip.ewayBillNo,
          billingType: trip.billingType || trip.biltyBillingType
        },
        ...trip.extraSellers
      ];
    }

    const displayWeight = trip.weight || '80';
    const isToBeBilled = trip.biltyBillingType === 'To be Billed' || trip.rate === 'To be Billed';
    const displayRate = isToBeBilled ? 'To be Billed' : (trip.biltyBillingType === 'Fixed' ? 'Fixed' : (trip.rate ? '₹ ' + Number(trip.rate).toFixed(2) : 'To be Billed'));
    const displayFreight = isToBeBilled ? 'To be Billed' : (trip.freight ? '₹ ' + Number(trip.freight).toFixed(2) : 'To be Billed');

    const invValFormatted = trip.invoiceValue ? Number(trip.invoiceValue).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '222,600.00';
    const grandTotalVal = (isToBeBilled && (!trip.partyDue || trip.partyDue === 0)) ? '0.00' : Number(trip.partyDue || trip.freight || 0).toFixed(2);

    let consignorGstinContent = trip.consignorGstin || '08AAJFR3111N1Z1';
    if (isMultiSeller && sellersList.length > 0) {
      consignorGstinContent = sellersList.map((s, idx) => {
        return `<span style="white-space:nowrap;"><span style="font-weight:normal; font-size:9px;">S${idx+1}:</span> ${s.consignorGstin || '-'}</span>`;
      }).join(' &nbsp;|&nbsp; ');
    }

    const html = `
      <div class="bilty-official-doc shadow-sm">
        
        <!-- Sacred Tokens for Blessings & Compatibility -->
        <div class="bilty-sacred-header" style="display:none;">
          <div class="bilty-sacred-side">॥ शुभ लाभ ॥</div>
          <div class="bilty-sacred-center">
            <div class="bilty-ganesha-emblem"></div>
            <span class="bilty-ganesha-mantra">॥ श्री गणेशाय नमः ॥</span>
          </div>
          <div class="bilty-sacred-side">॥ श्री सांवरिया सेठाय नमः ॥</div>
        </div>

        <!-- TOP HEADER SECTION (Exact Replica of 2026-2027-1389_TTC.pdf) -->
        <div class="bilty-ttc-header">
          <!-- Left: GST Info & Ganesha -->
          <div class="ttc-header-left">
            <div class="ttc-gst-code">Rajasthan GST Code: ${gstCode}</div>
            <div class="ttc-gstin">GSTIN: ${gstNo}</div>
            <div class="ttc-ganesha-box">
              <img src="${ganeshaSrc}" alt="Lord Ganesha" class="ttc-img-ganesha">
            </div>
          </div>

          <!-- Center: Jurisdiction, Flying Eagle & Boxed Brand Banner -->
          <div class="ttc-header-center">
            <div class="ttc-jurisdiction">All Subject to RAJSAMAND Jurisdiction</div>
            <div class="ttc-eagle-box">
              <img src="${eagleSrc}" alt="Eagle Emblem" class="ttc-img-eagle">
            </div>
            <div class="ttc-brand-box">
              <h1 class="ttc-firm-name">${firmTitle}</h1>
              <div class="ttc-firm-subtitle">${subtitle}</div>
              <div class="ttc-firm-address">${address}</div>
            </div>
          </div>

          <!-- Right: Contacts & Heavy Truck -->
          <div class="ttc-header-right">
            <div class="ttc-mobiles">${mob1}</div>
            <div class="ttc-mobiles-2">${mob2}</div>
            <div class="ttc-email">${email}</div>
            <div class="ttc-truck-box">
              <img src="${truckSrc}" alt="Heavy Commercial Truck" class="ttc-img-truck">
            </div>
          </div>
        </div>

        <!-- MAIN CONSIGNMENT TABLE GRID -->
        <table class="ttc-grid-table">
          <tbody>
            <!-- Row 1: Consignor GSTIN (54%), Truck No (23%), GR No (23%) -->
            <tr>
              <td class="ttc-cell-gstin" style="width: 54%;">
                <div class="ttc-field-title">${isMultiSeller ? 'CONSIGNOR GSTIN(S)' : 'CONSIGNOR GSTIN'}</div>
                <div class="ttc-field-val-bold" style="${isMultiSeller ? 'font-size: 10px; line-height: 1.3;' : ''}">${consignorGstinContent}</div>
              </td>
              <td class="ttc-cell-truck" style="width: 23%;">
                <div class="ttc-inline-item">
                  <span class="ttc-label-inline">TRUCK NO.:</span>
                  <span class="ttc-val-inline">${trip.truckNo || 'RJ52GB0725'}</span>
                </div>
              </td>
              <td class="ttc-cell-gr" style="width: 23%;">
                <div class="ttc-inline-item">
                  <span class="ttc-label-inline">G.R. NO.:</span>
                  <span class="ttc-val-inline">${trip.shortGrNo || trip.grNo || '1389'}</span>
                </div>
              </td>
            </tr>

            <!-- Row 2: Consignor Name & Address + Dispatch From (colspan 2 = 77%), Date (23%) -->
            <tr>
              <td colspan="2" class="ttc-cell-consignor" style="${isMultiSeller ? 'padding: 4px 6px;' : ''}">
                ${isMultiSeller ? `
                  <div class="ttc-field-title" style="margin-bottom: 2px;">CONSIGNOR(S) NAME &amp; ADDRESS (${sellersList.length} SELLERS CONSOLIDATED)</div>
                  <div class="consolidated-sellers-list" style="display: flex; flex-direction: column; gap: 3px;">
                    ${sellersList.map((s, idx) => `
                      <div style="font-size: 10.5px; line-height: 1.3; ${idx > 0 ? 'border-top: 1px dashed #cbd5e1; padding-top: 2px;' : ''}">
                        <span class="badge bg-secondary text-white me-1" style="font-size: 8.5px; padding: 1px 4px; vertical-align: middle;">Seller ${idx + 1}</span>
                        <strong style="color: #000;">${s.consignor || '---'}</strong>
                        ${s.consignorGstin ? `<span class="text-muted ms-1" style="font-size: 9.5px;">(GST: ${s.consignorGstin})</span>` : ''}
                        <div style="color: #334155; font-size: 10px; padding-left: 2px;">
                          Dispatch: ${s.dispatchFromAddress || s.dispatchFrom || trip.origin || 'Rajsamand (Raj.)'}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <div class="ttc-field-title">CONSIGNOR NAME &amp; ADDRESS</div>
                  <div class="ttc-field-val-main">${trip.consignor || '---'}</div>
                  <div class="ttc-field-dispatch">Dispatch From: ${trip.dispatchFrom || trip.dispatchFromAddress || trip.origin || 'AMET, DIST.RAJSAMAND (RAJ.)-313330'}</div>
                `}
              </td>
              <td class="ttc-cell-date">
                <div class="ttc-inline-item">
                  <span class="ttc-label-inline">DATE:</span>
                  <span class="ttc-val-inline">${displayDate}</span>
                </div>
              </td>
            </tr>

            <!-- Row 3: Consignee Name & Address (colspan 2), FROM Station -->
            <tr>
              <td colspan="2" class="ttc-cell-consignee">
                <div class="ttc-field-title">CONSIGNEE NAME &amp; ADDRESS</div>
                <div class="ttc-field-val-main">${trip.consignee || '---'}</div>
              </td>
              <td class="ttc-cell-from">
                <div class="ttc-inline-item">
                  <span class="ttc-label-inline">FROM:</span>
                  <span class="ttc-val-inline">${trip.origin || 'Rajsamand (Raj.)'}</span>
                </div>
              </td>
            </tr>

            <!-- Row 4: Consignee GSTIN (colspan 2), TO Station -->
            <tr>
              <td colspan="2" class="ttc-cell-consignee-gstin">
                <div class="ttc-inline-item">
                  <span class="ttc-label-inline">CONSIGNEE GST No.:</span>
                  <span class="ttc-val-inline">${trip.consigneeGstin || '06AAACH2676Q1Z4'}</span>
                </div>
              </td>
              <td class="ttc-cell-to">
                <div class="ttc-inline-item">
                  <span class="ttc-label-inline">TO:</span>
                  <span class="ttc-val-inline">${trip.destination || '---'}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- GOODS PARTICULAR TABLE HEADER & ROW -->
        <table class="ttc-goods-table">
          <thead>
            <tr>
              <th style="width: 20%;">PERSON LIABLE FOR PAYING GST</th>
              <th style="width: 32%;">${isMultiSeller ? 'Material &amp; Seller Particulars' : 'Material'}</th>
              <th style="width: 14%;">Weight<br>(Tonne)</th>
              <th style="width: 16%;">RATE<br>Per Tonne</th>
              <th style="width: 18%;">FREIGHT<br>To Pay</th>
            </tr>
          </thead>
          <tbody>
            ${isMultiSeller ? `
              ${sellersList.map((s, idx) => {
                const sWt = parseFloat(s.weight) || 0;
                const sRt = parseFloat(s.rate) || 0;
                const sIsFixed = (s.billingType === 'Fixed');
                const sFr = (s.freight !== undefined) ? parseFloat(s.freight) : (sIsFixed ? sRt : sWt * sRt);
                return `
                  <tr>
                    <td class="text-center" style="padding: 3px 2px; font-size: 10px; vertical-align: middle;">
                      ${idx === 0 ? (trip.personLiableGst || 'Consignor/Consignee/Transporter') : '<span class="text-muted">"</span>'}
                    </td>
                    <td style="padding: 3px 5px; font-size: 10.5px; vertical-align: middle;">
                      <div class="fw-bold"><span class="badge bg-light text-dark border me-1" style="font-size: 8.5px; padding: 1px 3px;">S${idx + 1}</span> ${s.material || 'Marble Cut Size'}</div>
                      <div class="text-muted" style="font-size: 9.5px;">${s.consignor}</div>
                    </td>
                    <td class="text-center fw-bold" style="padding: 3px 2px; font-size: 10.5px; vertical-align: middle;">
                      ${sWt.toFixed(3)}
                    </td>
                    <td class="text-center fw-bold" style="padding: 3px 2px; font-size: 10.5px; vertical-align: middle;">
                      ${sIsFixed ? 'Fixed' : (sRt > 0 ? '₹ ' + sRt.toFixed(2) : 'To be Billed')}
                    </td>
                    <td class="text-end fw-bold" style="padding: 3px 5px; font-size: 11px; vertical-align: middle;">
                      ₹ ${sFr.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </td>
                  </tr>
                `;
              }).join('')}
              <!-- Consolidated Summary Row -->
              <tr style="background: #f8fafc; border-top: 1.5px solid #000; font-weight: bold;">
                <td colspan="2" class="text-end pe-2" style="padding: 4px 6px; font-size: 10.5px;">
                  TOTAL CONSOLIDATED GOODS (${sellersList.length} SELLERS):
                </td>
                <td class="text-center fw-bold" style="padding: 4px 2px; font-size: 11.5px; color: #0d6efd;">
                  ${(parseFloat(trip.weight) || 0).toFixed(3)} MT
                </td>
                <td class="text-center" style="padding: 4px 2px; font-size: 9.5px; color: #64748b;">(Consolidated)</td>
                <td class="text-end fw-bold" style="padding: 4px 5px; font-size: 11.5px; color: #0d6efd;">
                  ₹ ${(parseFloat(trip.freight) || 0).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </td>
              </tr>
            ` : `
              <tr>
                <td class="text-center fw-bold" style="padding: 6px 4px;">${trip.personLiableGst || 'Consignor/Consignee/Transporter'}</td>
                <td class="text-center fw-bold" style="padding: 6px 4px;">${trip.material || 'Marble Powder'}</td>
                <td class="text-center fw-bold" style="padding: 6px 4px;">${displayWeight}</td>
                <td class="text-center fw-bold" style="padding: 6px 4px;">${displayRate}</td>
                <td class="text-center fw-bold" style="padding: 6px 4px;">${displayFreight}</td>
              </tr>
            `}
          </tbody>
        </table>

        <!-- LOWER SECTION: SPLIT LEFT (Bank, Invoices, Notes) & RIGHT (Taxes, Totals, Sign) -->
        <div class="ttc-lower-container">
          
          <!-- LEFT 50%: Bank Details + Invoices Table + Notes -->
          <div class="ttc-lower-left">
            
            <!-- Bank Details -->
            <div class="ttc-bank-box">
              <div class="ttc-bank-title">Bank Details</div>
              <div class="ttc-bank-row">${bankName}</div>
              <div class="ttc-bank-row">A/C No. ${bankAccNo}</div>
              <div class="ttc-bank-row">IFSC: ${bankIfsc}</div>
              <div class="ttc-bank-row">PAN: ${panNo}</div>
            </div>

            <!-- Invoices & E-Way subtable -->
            <table class="ttc-invoice-table">
              <thead>
                <tr>
                  <th style="width: 42%;">E-way Bill No.</th>
                  <th style="width: 30%;">Bill No.</th>
                  <th style="width: 28%;">Value</th>
                </tr>
              </thead>
              <tbody>
                ${isMultiSeller ? `
                  ${sellersList.map((s, idx) => `
                    <tr>
                      <td style="padding: 2px 4px; font-size: 9.5px;">
                        <span class="badge bg-light text-dark border me-1" style="font-size: 8px; padding: 0 2px;">S${idx + 1}</span>
                        ${s.ewayBillNo || '-'}
                      </td>
                      <td style="padding: 2px 4px; font-size: 9.5px;">${s.billNo || '-'}</td>
                      <td class="text-end" style="padding: 2px 4px; font-size: 9.5px;">
                        ${(parseFloat(s.invoiceValue) || 0) > 0 ? '₹ ' + (parseFloat(s.invoiceValue) || 0).toLocaleString('en-IN', {minimumFractionDigits: 2}) : '-'}
                      </td>
                    </tr>
                  `).join('')}
                  ${sellersList.length > 1 ? `
                    <tr style="background: #f1f5f9; font-weight: bold;">
                      <td colspan="2" class="text-end pe-2" style="font-size: 9.5px; padding: 2px 4px;">Total Inv. Value:</td>
                      <td class="text-end" style="font-size: 10px; padding: 2px 4px;">₹ ${invValFormatted}</td>
                    </tr>
                  ` : ''}
                ` : `
                  <tr>
                    <td>${trip.ewayBillNo || '7516 5237 4578'}</td>
                    <td>${trip.billNo || '2026-27/491'}</td>
                    <td>₹ ${invValFormatted}</td>
                  </tr>
                `}
              </tbody>
            </table>

            <!-- Notes Block -->
            <div class="ttc-notes-block">
              <div class="ttc-note-line">Note: 1. Rebooking Through H.O.</div>
              <div class="ttc-note-sub">2. Co. is not responsible for leakage, Breakage, Damage &amp; any Loss.</div>
              <div class="ttc-note-sub">3. Co. is not responsible for damage &amp; breakage of marble.</div>
            </div>

          </div>

          <!-- RIGHT 50%: Tax Summary Table + Booking Clerk Signature -->
          <div class="ttc-lower-right">
            <table class="ttc-tax-table">
              <tbody>
                <tr>
                  <td class="ttc-tax-label">SGST@</td>
                  <td class="ttc-tax-rate">${trip.sgstRate || '0.00%'}</td>
                  <td class="ttc-tax-amount">₹ ${(Number(trip.sgstAmount) || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td class="ttc-tax-label">CGST@</td>
                  <td class="ttc-tax-rate">${trip.cgstRate || '0.00%'}</td>
                  <td class="ttc-tax-amount">₹ ${(Number(trip.cgstAmount) || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td class="ttc-tax-label">IGST@</td>
                  <td class="ttc-tax-rate">${trip.igstRate || '0.00%'}</td>
                  <td class="ttc-tax-amount">₹ ${(Number(trip.igstAmount) || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td class="ttc-tax-label" colspan="2">Loading Charges</td>
                  <td class="ttc-tax-amount">₹ ${(Number(trip.loadingCharges) || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td class="ttc-tax-label" colspan="2">Halt Charges</td>
                  <td class="ttc-tax-amount">₹ ${(Number(trip.haltCharges) || 0).toFixed(2)}</td>
                </tr>
                <tr class="ttc-row-grand-total">
                  <td class="ttc-tax-label fw-bold" colspan="2">GRAND TOTAL</td>
                  <td class="ttc-tax-amount fw-bold">₹ ${grandTotalVal}</td>
                </tr>
              </tbody>
            </table>

            <!-- Signature Area -->
            <div class="ttc-signature-area">
              <div class="ttc-sign-title">Booking Clerk</div>
            </div>
          </div>

        </div>

        <!-- BOTTOM FULL-WIDTH STRIP -->
        <div class="ttc-daily-service-bar">
          Daily Service: Delhi, Himachal, Haryana, Punjab, U.P., Gujrat, Rajasthan, etc.
        </div>

      </div>
    `;

    return html;
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

    let consignorMsg = `🏢 *Consignor:* ${t.consignor}`;
    if (t.sellerList && t.sellerList.length > 1) {
      consignorMsg = `🏢 *Consignors (${t.sellerList.length} Consolidated):*\n` + 
        t.sellerList.map((s, idx) => `   ▫️ *S${idx + 1}:* ${s.consignor} (${s.weight} MT | ₹${Number(s.freight || 0).toLocaleString('en-IN')})`).join('\n');
    }

    const msg = `🚚 *${firmName} - LORRY RECEIPT*
━━━━━━━━━━━━━━━━━━━━
📄 *G.R. No:* ${t.grNo || t.shortGrNo}
📅 *Date:* ${displayDate}
🚛 *Truck No:* ${t.truckNo} (${t.loadType || 'Under Load'})
📍 *Route:* ${t.origin || 'Rajsamand'} ➔ ${t.destination}
${consignorMsg}
🏬 *Consignee:* ${t.consignee}
📦 *Material:* ${t.material || 'Marble Powder'} | Total: ${t.weight || 0} MT
💰 *Total Freight:* ₹${Number(t.freight || 0).toLocaleString('en-IN')}
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
