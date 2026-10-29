/**
 * Universal Database Service for MTC & TTC Logistics
 * Seamlessly connects directly to Firebase Cloud Firestore
 * STRICT POLICY: ZERO business data is persisted to browser localStorage.
 */

// Universal LocalStorage Purge & Interceptor Guard
(function() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    // Proactively purge all legacy tms business data keys from browser localStorage
    const keysToRemove = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('tms_') && key !== 'tms_current_user' && key !== 'tms_active_role') {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => {
      try { window.localStorage.removeItem(k); } catch (e) {}
    });
    console.log('[DBService] LocalStorage data cache purged. Direct Firebase Firestore active.');
  } catch (e) {}

  // Intercept any setItem calls for tms data so nothing is ever persisted to browser localStorage
  try {
    const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
    window.localStorage.setItem = function(key, value) {
      if (typeof key === 'string' && key.startsWith('tms_') && key !== 'tms_current_user' && key !== 'tms_active_role') {
        // Intentionally blocked: No business data saved to browser localStorage
        return;
      }
      try {
        return originalSetItem(key, value);
      } catch (err) {
        console.warn(`[LocalStorage] Skipped persist for "${key}":`, err.message);
      }
    };
  } catch (e) {}
})();

class DBService {
  constructor() {
    this.isFirebaseReady = false;
    this.db = null;

    // In-memory session store (RAM only - never saved to browser localStorage)
    this.sessionStore = {
      trips: new Map(),
      debts: new Map(),
      parties: new Map(),
      truckOwners: new Map(),
      ownerDues: new Map(),
      cheques: new Map(),
      drivers: new Map(),
      brokers: new Map(),
      cashLedger: new Map(),
      returnedAmounts: new Map(),
      companyExpenses: new Map(),
      ownerExpenses: new Map(),
      receivedPayments: new Map(),
      payments: new Map(),
      gstInvoices: new Map(),
      podRecords: new Map(),
      dieselSlips: new Map(),
      ewayBills: new Map(),
      fleetCompliance: new Map(),
      users: new Map()
    };

    // In-memory deletion tracker (RAM only)
    this.deletedIds = {
      trips: new Set(),
      debts: new Set(),
      parties: new Set(),
      truckOwners: new Set(),
      ownerDues: new Set(),
      cheques: new Set(),
      drivers: new Set(),
      brokers: new Set(),
      cashLedger: new Set(),
      returnedAmounts: new Set(),
      companyExpenses: new Set(),
      ownerExpenses: new Set(),
      receivedPayments: new Set(),
      payments: new Set(),
      gstInvoices: new Set(),
      podRecords: new Set(),
      dieselSlips: new Set(),
      ewayBills: new Set(),
      fleetCompliance: new Set(),
      users: new Set()
    };

    this.initDatabase();
  }

  initDatabase() {
    // Check if Firebase config is supplied and Firebase SDK is loaded
    if (
      typeof firebase !== 'undefined' &&
      typeof APP_CONFIG !== 'undefined' &&
      APP_CONFIG.firebase &&
      APP_CONFIG.firebase.apiKey &&
      APP_CONFIG.firebase.apiKey.trim() !== ""
    ) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(APP_CONFIG.firebase);
        }
        this.db = firebase.firestore();
        this.isFirebaseReady = true;
        console.log(" Connected to Firebase Cloud Firestore successfully (mtc-ttc-logistics)!");
        
        // Sync seed data to Firestore if empty
        this.syncSeedDataToFirestore();
      } catch (err) {
        console.warn("⚠ Firebase initialization failed:", err);
        this.isFirebaseReady = false;
      }
    } else {
      console.log("ℹ Running in In-Memory Mode (Direct Firebase SDK waiting).");
      this.isFirebaseReady = false;
    }
  }

  // Safe wrapper that enforces NO localStorage persistence for business data
  safeSetItem(key, value) {
    // Intentionally disabled: Direct Firebase Cloud Firestore active. Zero localStorage persistence.
    return true;
  }

  // --- Universal CRUD Operations ---

  async getAll(collectionName) {
    let cloudItems = [];
    if (this.isFirebaseReady && this.db) {
      try {
        const fetchPromise = this.db.collection(collectionName).get();
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 15000));
        const snapshot = await Promise.race([fetchPromise, timeoutPromise]);
        if (snapshot && !snapshot.empty) {
          cloudItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn(`Firestore read notice for ${collectionName}:`, err.message);
      }
    }

    if (collectionName === 'trips') {
      return this.getAllTrips(cloudItems);
    }
    if (collectionName === 'debts') {
      return this.getAllDebts(cloudItems);
    }
    if (collectionName === 'parties') {
      return this.getAllParties(cloudItems);
    }
    if (collectionName === 'truckOwners') {
      return this.getAllTruckOwners(cloudItems);
    }
    if (collectionName === 'ownerDues') {
      return this.getAllOwnerDues(cloudItems);
    }
    if (collectionName === 'cheques') {
      return this.getAllCheques(cloudItems);
    }
    if (collectionName === 'drivers') {
      return this.getAllDrivers(cloudItems);
    }
    if (collectionName === 'cashLedger') {
      return this.getAllCashLedger(cloudItems);
    }
    if (collectionName === 'returnedAmounts') {
      return this.getAllReturnedAmounts(cloudItems);
    }
    if (collectionName === 'companyExpenses') {
      return this.getAllCompanyExpenses(cloudItems);
    }
    if (collectionName === 'ownerExpenses') {
      return this.getAllOwnerExpenses(cloudItems);
    }
    if (collectionName === 'receivedPayments') {
      return this.getAllReceivedPayments(cloudItems);
    }

    // Default handler for other collections (overlay cloud items with in-memory session changes)
    const map = new Map();
    const deletedSet = this.deletedIds[collectionName] || new Set();

    if (Array.isArray(cloudItems)) {
      cloudItems.forEach(item => {
        if (item && item.id && !deletedSet.has(String(item.id))) {
          map.set(String(item.id), item);
        }
      });
    }

    const store = this.sessionStore[collectionName];
    if (store) {
      store.forEach((val, k) => {
        if (!deletedSet.has(String(k))) {
          map.set(String(k), val);
        }
      });
    }

    return Array.from(map.values());
  }

  // --- Authentic Trips Engine (Direct Cloud Firestore + Master In-Memory Seed) ---
  getAllTrips(cloudItems = []) {
    const baseTrips = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_TRIPS))
      ? window.INITIAL_EXCEL_TRIPS
      : [];

    const tripMap = new Map();
    const deletedSet = this.deletedIds.trips || new Set();

    // 1. Add base trips (historical Excel dataset)
    for (const t of baseTrips) {
      const key = String(t.grNo || t.id);
      if (!deletedSet.has(String(t.id)) && !deletedSet.has(String(t.grNo))) {
        tripMap.set(key, t);
      }
    }

    // 2. Add/override with authentic seed trips (window.OPEN_TRIPS_SEED)
    if (typeof window !== 'undefined' && Array.isArray(window.OPEN_TRIPS_SEED)) {
      for (const s of window.OPEN_TRIPS_SEED) {
        const key = String(s.grNo || s.shortGrNo || s.id);
        if (!deletedSet.has(String(s.id)) && !deletedSet.has(String(s.grNo))) {
          tripMap.set(key, s);
        }
      }
    }

    // 3. Add/override directly from Firebase Cloud Firestore!
    if (Array.isArray(cloudItems)) {
      for (const t of cloudItems) {
        if (!t) continue;
        // Filter out placeholder consignors or invalid future dates
        if (t.consignor === 'MTC & TTC Logistics Consignor') continue;
        const dStr = String(t.tripStartDate || t.date || '');
        if (dStr.includes('2028')) continue;

        const key = String(t.grNo || t.id);
        if (!deletedSet.has(String(t.id)) && !deletedSet.has(String(t.grNo))) {
          const existing = tripMap.get(key) || {};
          tripMap.set(key, { ...existing, ...t });
        }
      }
    }

    // 4. Add/override with in-memory session changes (newly added/updated trips during active session)
    if (this.sessionStore.trips) {
      this.sessionStore.trips.forEach((t, id) => {
        if (!deletedSet.has(String(id)) && (!t.grNo || !deletedSet.has(String(t.grNo)))) {
          const key = String(t.grNo || t.id);
          const existing = tripMap.get(key) || {};
          tripMap.set(key, { ...existing, ...t });
        }
      });
    }

    const parseTs = (str) => {
      if (!str || str === 'Undated' || str === '-') return 0;
      const s = String(str).trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) return new Date(s.slice(0, 10)).getTime() || 0;
      const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dmy) {
        let p1 = parseInt(dmy[1], 10);
        let p2 = parseInt(dmy[2], 10);
        let year = parseInt(dmy[3], 10);
        // Detect MM/DD/YYYY
        let day = p1, month = p2 - 1;
        if (p1 <= 12 && p2 > 12) {
          day = p2;
          month = p1 - 1;
        }
        return new Date(year, month, day).getTime() || 0;
      }
      const t = new Date(s).getTime();
      return isNaN(t) ? 0 : t;
    };

    const all = Array.from(tripMap.values());
    all.sort((a, b) => {
      const timeA = parseTs(a.tripStartDate || a.date || a.biltyDate);
      const timeB = parseTs(b.tripStartDate || b.date || b.biltyDate);
      if (timeA !== timeB) return timeB - timeA;
      return String(b.grNo || '').localeCompare(String(a.grNo || ''));
    });

    return all;
  }

  // Clear all trips from current in-memory session
  clearAllTrips() {
    if (this.sessionStore.trips) this.sessionStore.trips.clear();
  }

  // Restore the original base dataset
  restoreBaseTrips() {
    if (this.sessionStore.trips) this.sessionStore.trips.clear();
    if (this.deletedIds.trips) this.deletedIds.trips.clear();
  }

  // --- Authentic AppSheet Ledger Debts Engine (Direct Cloud Firestore) ---
  getAllDebts(cloudItems = []) {
    const baseDebts = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_DEBTS_DATA))
      ? window.SAMPLE_DEBTS_DATA
      : [];

    const debtMap = new Map();
    const deletedSet = this.deletedIds.debts || new Set();

    // 1. Add base debts
    for (const d of baseDebts) {
      if (!deletedSet.has(String(d.id))) {
        debtMap.set(String(d.id), d);
      }
    }

    // 2. Add/override directly from Firebase Cloud Firestore!
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (d && d.id && !deletedSet.has(String(d.id))) {
          const existing = debtMap.get(String(d.id)) || {};
          debtMap.set(String(d.id), { ...existing, ...d });
        }
      }
    }

    // 3. Add/override with in-memory session changes
    if (this.sessionStore.debts) {
      this.sessionStore.debts.forEach((d, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = debtMap.get(String(id)) || {};
          debtMap.set(String(id), { ...existing, ...d });
        }
      });
    }

    const all = Array.from(debtMap.values());
    all.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.id || '').localeCompare(String(a.id || ''));
    });

    return all;
  }

  clearAllDebts() {
    if (this.sessionStore.debts) this.sessionStore.debts.clear();
  }

  restoreBaseDebts() {
    if (this.sessionStore.debts) this.sessionStore.debts.clear();
    if (this.deletedIds.debts) this.deletedIds.debts.clear();
  }

  async recordReturnedAmount(debtId, paymentData) {
    const debt = await this.getById('debts', debtId);
    if (!debt) throw new Error('Debt record not found');

    const returnEntry = {
      id: `RET_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      date: paymentData.date || new Date().toISOString().split('T')[0],
      displayDate: paymentData.displayDate || (typeof AppUI !== 'undefined' && AppUI.formatDate ? AppUI.formatDate(paymentData.date) : paymentData.date),
      amount: Number(paymentData.amount) || 0,
      mode: paymentData.mode || paymentData.returnMode || 'Cash',
      depositorType: paymentData.depositorType || '',
      depositorName: paymentData.depositorName || paymentData.receivedBy || '',
      description: paymentData.description || paymentData.remarks || '',
      receivedBy: paymentData.receivedBy || paymentData.depositorName || '',
      remarks: paymentData.remarks || paymentData.description || '',
      createdAt: new Date().toISOString()
    };

    const returnedAmounts = Array.isArray(debt.returnedAmounts) ? [...debt.returnedAmounts, returnEntry] : [returnEntry];
    const totalReturned = returnedAmounts.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
    const dueAmount = Math.max(0, Number(debt.debtAmount || 0) - totalReturned);

    // Save into returnedAmounts collection as well for dual-sync in Firestore
    try {
      await this.add('returnedAmounts', {
        ...returnEntry,
        debtId: debt.id,
        debtNo: debt.grNo || debt.id,
        truckNo: debt.truckNo || '',
        borrowerName: debt.borrowerName || '',
        debtType: debt.debtType || ''
      });
    } catch (retErr) {
      console.warn('returnedAmounts collection sync notice:', retErr.message);
    }

    return await this.update('debts', debtId, {
      returnedAmounts,
      totalReturned,
      dueAmount
    });
  }

  // --- Authentic Cash Ledger Engine ---
  getAllCashLedger(cloudItems = []) {
    const baseCash = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_CASH_LEDGER_DATA))
      ? window.SAMPLE_CASH_LEDGER_DATA
      : (typeof SAMPLE_CASH_LEDGER_DATA !== 'undefined' ? SAMPLE_CASH_LEDGER_DATA : []);

    const entryMap = new Map();
    const deletedSet = this.deletedIds.cashLedger || new Set();

    for (const item of baseCash) {
      const id = String(item.id || item.date);
      if (!deletedSet.has(id)) {
        entryMap.set(id, item);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const item of cloudItems) {
        if (item) {
          const id = String(item.id || item.date);
          if (!deletedSet.has(id)) {
            const existing = entryMap.get(id) || {};
            entryMap.set(id, { ...existing, ...item });
          }
        }
      }
    }

    if (this.sessionStore.cashLedger) {
      this.sessionStore.cashLedger.forEach((item, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = entryMap.get(String(id)) || {};
          entryMap.set(String(id), { ...existing, ...item });
        }
      });
    }

    const all = Array.from(entryMap.values());
    all.sort((a, b) => {
      const pA = (a.date || '').split('/');
      const pB = (b.date || '').split('/');
      const keyA = pA.length === 3 ? `${pA[2]}-${pA[1]}-${pA[0]}` : (a.date || '');
      const keyB = pB.length === 3 ? `${pB[2]}-${pB[1]}-${pB[0]}` : (b.date || '');
      return keyB.localeCompare(keyA);
    });
    return all;
  }

  // --- Authentic Returned Amounts Engine ---
  getAllReturnedAmounts(cloudItems = []) {
    const baseReturned = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_RETURNED_AMOUNTS_DATA))
      ? window.SAMPLE_RETURNED_AMOUNTS_DATA
      : (typeof SAMPLE_RETURNED_AMOUNTS_DATA !== 'undefined' ? SAMPLE_RETURNED_AMOUNTS_DATA : []);

    const entryMap = new Map();
    const deletedSet = this.deletedIds.returnedAmounts || new Set();

    for (const item of baseReturned) {
      const id = String(item.id);
      if (!deletedSet.has(id)) {
        entryMap.set(id, item);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const item of cloudItems) {
        if (item && item.id) {
          const id = String(item.id);
          if (!deletedSet.has(id)) {
            const existing = entryMap.get(id) || {};
            entryMap.set(id, { ...existing, ...item });
          }
        }
      }
    }

    if (this.sessionStore.returnedAmounts) {
      this.sessionStore.returnedAmounts.forEach((item, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = entryMap.get(String(id)) || {};
          entryMap.set(String(id), { ...existing, ...item });
        }
      });
    }

    const all = Array.from(entryMap.values());
    all.sort((a, b) => {
      const dateA = a.returnDate || '';
      const dateB = b.returnDate || '';
      return dateB.localeCompare(dateA);
    });
    return all;
  }

  // --- Authentic Company Expenses Engine ---
  getAllCompanyExpenses(cloudItems = []) {
    const baseExpenses = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_COMPANY_EXPENSES_DATA))
      ? window.SAMPLE_COMPANY_EXPENSES_DATA
      : (typeof SAMPLE_COMPANY_EXPENSES_DATA !== 'undefined' ? SAMPLE_COMPANY_EXPENSES_DATA : []);

    const entryMap = new Map();
    const deletedSet = this.deletedIds.companyExpenses || new Set();

    for (const item of baseExpenses) {
      const id = String(item.id);
      if (!deletedSet.has(id)) {
        entryMap.set(id, item);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const item of cloudItems) {
        if (item && item.id) {
          const id = String(item.id);
          if (!deletedSet.has(id)) {
            const existing = entryMap.get(id) || {};
            entryMap.set(id, { ...existing, ...item });
          }
        }
      }
    }

    if (this.sessionStore.companyExpenses) {
      this.sessionStore.companyExpenses.forEach((item, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = entryMap.get(String(id)) || {};
          entryMap.set(String(id), { ...existing, ...item });
        }
      });
    }

    const all = Array.from(entryMap.values());
    all.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      return dateB.localeCompare(dateA);
    });
    return all;
  }

  // --- Authentic Owner Expenses Engine ---
  getAllOwnerExpenses(cloudItems = []) {
    const baseExpenses = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_OWNER_EXPENSES_DATA))
      ? window.SAMPLE_OWNER_EXPENSES_DATA
      : (typeof SAMPLE_OWNER_EXPENSES_DATA !== 'undefined' ? SAMPLE_OWNER_EXPENSES_DATA : []);

    const entryMap = new Map();
    const deletedSet = this.deletedIds.ownerExpenses || new Set();

    for (const item of baseExpenses) {
      const id = String(item.id);
      if (!deletedSet.has(id)) {
        entryMap.set(id, item);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const item of cloudItems) {
        if (item && item.id) {
          const id = String(item.id);
          if (!deletedSet.has(id)) {
            const existing = entryMap.get(id) || {};
            entryMap.set(id, { ...existing, ...item });
          }
        }
      }
    }

    if (this.sessionStore.ownerExpenses) {
      this.sessionStore.ownerExpenses.forEach((item, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = entryMap.get(String(id)) || {};
          entryMap.set(String(id), { ...existing, ...item });
        }
      });
    }

    const all = Array.from(entryMap.values());
    all.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      return dateB.localeCompare(dateA);
    });
    return all;
  }

  // --- Authentic Received Payments Engine ---
  getAllReceivedPayments(cloudItems = []) {
    const basePayments = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_RECEIVED_PAYMENTS_DATA))
      ? window.SAMPLE_RECEIVED_PAYMENTS_DATA
      : (typeof SAMPLE_RECEIVED_PAYMENTS_DATA !== 'undefined' ? SAMPLE_RECEIVED_PAYMENTS_DATA : []);

    const entryMap = new Map();
    const deletedSet = this.deletedIds.receivedPayments || new Set();

    for (const item of basePayments) {
      const id = String(item.id);
      if (!deletedSet.has(id)) {
        entryMap.set(id, item);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const item of cloudItems) {
        if (item && item.id) {
          const id = String(item.id);
          if (!deletedSet.has(id)) {
            const existing = entryMap.get(id) || {};
            entryMap.set(id, { ...existing, ...item });
          }
        }
      }
    }

    if (this.sessionStore.receivedPayments) {
      this.sessionStore.receivedPayments.forEach((item, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = entryMap.get(String(id)) || {};
          entryMap.set(String(id), { ...existing, ...item });
        }
      });
    }

    const all = Array.from(entryMap.values());
    all.sort((a, b) => {
      const dateA = a.receivedDate ? (a.receivedDate.split('/').reverse().join('-')) : '';
      const dateB = b.receivedDate ? (b.receivedDate.split('/').reverse().join('-')) : '';
      return dateB.localeCompare(dateA);
    });
    return all;
  }

  // --- Authentic Parties Engine ---
  getAllParties(cloudItems = []) {
    const baseParties = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_PARTIES))
      ? window.INITIAL_EXCEL_PARTIES
      : [];

    const partyMap = new Map();
    const deletedSet = this.deletedIds.parties || new Set();

    // 1. Base parties (3,396 records)
    baseParties.forEach(p => {
      if (!deletedSet.has(String(p.id)) && p.name && p.name !== 'Unnamed Party') {
        partyMap.set(String(p.id), p);
      }
    });

    // 2. Cloud items from Firebase Cloud Firestore
    if (Array.isArray(cloudItems)) {
      cloudItems.forEach(p => {
        if (p && p.id && !deletedSet.has(String(p.id)) && p.name && p.name !== 'Unnamed Party') {
          const existing = partyMap.get(String(p.id)) || {};
          partyMap.set(String(p.id), { ...existing, ...p });
        }
      });
    }

    // 3. In-memory session parties
    if (this.sessionStore.parties) {
      this.sessionStore.parties.forEach((p, id) => {
        if (!deletedSet.has(String(id)) && p.name && p.name !== 'Unnamed Party') {
          const existing = partyMap.get(String(id)) || {};
          partyMap.set(String(id), { ...existing, ...p });
        }
      });
    }

    return Array.from(partyMap.values());
  }

  // --- Authentic Truck Owners Engine ---
  async getAllTruckOwners(cloudItems) {
    if (cloudItems === undefined) {
      return await this.getAll('truckOwners');
    }
    const baseOwners = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_TRUCK_OWNERS))
      ? window.INITIAL_TRUCK_OWNERS
      : [];

    const ownerMap = new Map();
    const truckIndex = new Map(); // normalized truckNo -> id
    const deletedSet = this.deletedIds.truckOwners || new Set();

    const cleanTruckKey = (t) => String(t || '').trim().toUpperCase().replace(/\s+/g, '');

    // 1. Base owners
    for (const o of baseOwners) {
      const truckKey = cleanTruckKey(o.truckNo || o.truck);
      if (truckKey && truckKey !== 'UNDEFINED' && !deletedSet.has(String(o.id))) {
        ownerMap.set(String(o.id), { ...o, truckNo: o.truckNo || truckKey });
        truckIndex.set(truckKey, String(o.id));
      }
    }

    // 2. Cloud items from Firebase Cloud Firestore
    if (Array.isArray(cloudItems)) {
      for (const o of cloudItems) {
        if (!o) continue;
        const truckKey = cleanTruckKey(o.truckNo || o.truck);
        // Discard orphan or invalid documents with no valid truck number or 'undefined'
        if (!truckKey || truckKey === 'UNDEFINED' || truckKey.length < 5) {
          continue;
        }

        if (deletedSet.has(String(o.id))) continue;

        // If this truck exists in truckIndex, merge into existing owner by truckKey
        const existingId = truckIndex.get(truckKey);
        if (existingId && ownerMap.has(existingId)) {
          const existing = ownerMap.get(existingId) || {};
          ownerMap.set(existingId, { ...existing, ...o, truckNo: existing.truckNo || truckKey });
        } else if (o.id && !deletedSet.has(String(o.id))) {
          // New valid truck from cloud
          ownerMap.set(String(o.id), { ...o, truckNo: o.truckNo || truckKey });
          truckIndex.set(truckKey, String(o.id));
        }
      }
    }

    // 3. In-memory session owners
    if (this.sessionStore.truckOwners) {
      this.sessionStore.truckOwners.forEach((o, id) => {
        if (!o || deletedSet.has(String(id))) return;
        const truckKey = cleanTruckKey(o.truckNo || o.truck);
        if (!truckKey || truckKey === 'UNDEFINED' || truckKey.length < 5) return;

        const existingId = truckIndex.get(truckKey) || String(id);
        const existing = ownerMap.get(existingId) || {};
        ownerMap.set(existingId, { ...existing, ...o, truckNo: existing.truckNo || truckKey });
        truckIndex.set(truckKey, existingId);
      });
    }

    // Ensure every single owner has a valid truckNo
    const all = Array.from(ownerMap.values()).filter(o => {
      const t = cleanTruckKey(o.truckNo);
      return t && t !== 'UNDEFINED' && t.length >= 5;
    });

    all.sort((a, b) => (Number(b.dueAmount) || 0) - (Number(a.dueAmount) || 0));
    return all;
  }

  // --- Authentic Owner Due Engine ---
  async getAllOwnerDues(cloudItems) {
    if (cloudItems === undefined) {
      return await this.getAll('ownerDues');
    }
    const baseDues = (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_OWNER_DUES))
      ? window.SAMPLE_OWNER_DUES
      : ((typeof window !== 'undefined' && Array.isArray(window.INITIAL_OWNER_DUES))
        ? window.INITIAL_OWNER_DUES
        : []);

    const dueMap = new Map();
    const deletedSet = this.deletedIds.ownerDues || new Set();

    // 1. Base Dues
    for (const d of baseDues) {
      if (d && d.id && !deletedSet.has(String(d.id))) {
        dueMap.set(String(d.id), d);
      }
    }

    // 2. Cloud items from Firebase Cloud Firestore
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (!d || !d.id || deletedSet.has(String(d.id))) continue;
        const existing = dueMap.get(String(d.id)) || {};
        dueMap.set(String(d.id), { ...existing, ...d });
      }
    }

    // 3. In-memory session dues
    if (this.sessionStore.ownerDues) {
      this.sessionStore.ownerDues.forEach((d, id) => {
        if (!d || deletedSet.has(String(id))) return;
        const existing = dueMap.get(String(id)) || {};
        dueMap.set(String(id), { ...existing, ...d });
      });
    }

    const all = Array.from(dueMap.values());
    all.sort((a, b) => (Number(b.dueAmount) || 0) - (Number(a.dueAmount) || 0));
    return all;
  }

  // --- Authentic Cheques Engine ---
  getAllCheques(cloudItems = []) {
    const baseCheques = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_CHEQUES_DATA))
      ? window.INITIAL_CHEQUES_DATA
      : [];

    const chequeMap = new Map();
    const deletedSet = this.deletedIds.cheques || new Set();

    for (const c of baseCheques) {
      if (!deletedSet.has(String(c.id))) {
        chequeMap.set(String(c.id), c);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const c of cloudItems) {
        if (c && c.id && !deletedSet.has(String(c.id))) {
          const existing = chequeMap.get(String(c.id)) || {};
          chequeMap.set(String(c.id), { ...existing, ...c });
        }
      }
    }

    if (this.sessionStore.cheques) {
      this.sessionStore.cheques.forEach((c, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = chequeMap.get(String(id)) || {};
          chequeMap.set(String(id), { ...existing, ...c });
        }
      });
    }

    const all = Array.from(chequeMap.values());
    const statusPriority = { 'Pending': 1, 'Deposited': 2, 'Bounced': 3, 'Cleared': 4 };
    all.sort((a, b) => {
      const pA = statusPriority[a.status] || 5;
      const pB = statusPriority[b.status] || 5;
      if (pA !== pB) return pA - pB;
      return String(b.chequeDate || '').localeCompare(String(a.chequeDate || ''));
    });
    return all;
  }

  // --- Authentic Drivers Engine ---
  getAllDrivers(cloudItems = []) {
    const baseDrivers = (typeof window !== 'undefined' && Array.isArray(window.INITIAL_DRIVERS))
      ? window.INITIAL_DRIVERS
      : [];

    const driverMap = new Map();
    const deletedSet = this.deletedIds.drivers || new Set();

    for (const d of baseDrivers) {
      if (!deletedSet.has(String(d.id))) {
        driverMap.set(String(d.id), d);
      }
    }

    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (d && d.id && !deletedSet.has(String(d.id))) {
          const existing = driverMap.get(String(d.id)) || {};
          driverMap.set(String(d.id), { ...existing, ...d });
        }
      }
    }

    if (this.sessionStore.drivers) {
      this.sessionStore.drivers.forEach((d, id) => {
        if (!deletedSet.has(String(id))) {
          const existing = driverMap.get(String(id)) || {};
          driverMap.set(String(id), { ...existing, ...d });
        }
      });
    }

    const all = Array.from(driverMap.values());
    all.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    return all;
  }

  // --- Direct Cloud Firestore Mutations for Truck Owners & Dues ---
  async saveTruckOwner(ownerData) {
    if (!ownerData) return null;
    const id = String(ownerData.id || ownerData.truckNo || `owner_${Date.now()}`);
    return await this.put('truckOwners', id, ownerData);
  }

  async updateTruckOwner(id, ownerData) {
    if (!id || !ownerData) return null;
    return await this.update('truckOwners', String(id), ownerData);
  }

  async saveOwnerDue(dueData) {
    if (!dueData) return null;
    const id = String(dueData.id || dueData.grNo || `due_${Date.now()}`);
    return await this.put('ownerDues', id, dueData);
  }

  async recordOwnerPayment(ownerId, paymentData) {
    const owner = await this.getById('truckOwners', ownerId);
    if (!owner) throw new Error('Owner not found');

    const paymentAmount = Number(paymentData.amount) || 0;
    const currentDue = Number(owner.dueAmount) || 0;
    const currentPaid = Number(owner.paidAmount) || 0;

    const newDue = Math.max(0, currentDue - paymentAmount);
    const newPaid = currentPaid + paymentAmount;

    const paymentRecord = {
      id: `PAY_OWNER_${Date.now()}`,
      date: paymentData.date || new Date().toISOString().split('T')[0],
      amount: paymentAmount,
      mode: paymentData.mode || 'Bank Transfer',
      refNo: paymentData.refNo || '',
      remarks: paymentData.remarks || 'Owner settlement payment',
      status: 'Paid'
    };

    const recentTrips = Array.isArray(owner.recentTrips) ? [paymentRecord, ...owner.recentTrips] : [paymentRecord];

    return await this.update('truckOwners', ownerId, {
      dueAmount: newDue,
      paidAmount: newPaid,
      recentTrips
    });
  }

  // --- CRUD: Get Single Document ---
  async getById(collectionName, id) {
    if (this.isFirebaseReady && this.db) {
      try {
        const doc = await this.db.collection(collectionName).doc(String(id)).get();
        if (doc && doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn(`Firestore getById notice for ${id} in ${collectionName}:`, err.message);
      }
    }

    // Fallback: check sessionStore map
    const store = this.sessionStore[collectionName];
    if (store && store.has(String(id))) {
      return store.get(String(id));
    }

    const items = await this.getAll(collectionName);
    return items.find(item => String(item.id) === String(id) || String(item.grNo) === String(id)) || null;
  }

  // Alias
  async get(collectionName, id) {
    return this.getById(collectionName, id);
  }

  // --- CRUD: Direct Cloud Add (Zero LocalStorage) ---
  async add(collectionName, itemData) {
    const newItem = {
      ...itemData,
      id: itemData.id || `${collectionName.slice(0, 4).toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store in RAM session store
    if (!this.sessionStore[collectionName]) {
      this.sessionStore[collectionName] = new Map();
    }
    this.sessionStore[collectionName].set(String(newItem.id), newItem);
    if (this.deletedIds[collectionName]) {
      this.deletedIds[collectionName].delete(String(newItem.id));
      if (newItem.grNo) this.deletedIds[collectionName].delete(String(newItem.grNo));
    }

    // Direct write to Firebase Cloud Firestore!
    if (this.isFirebaseReady && this.db) {
      try {
        await this.db.collection(collectionName).doc(String(newItem.id)).set(newItem);
        console.log(`[Firebase Cloud] Added to ${collectionName}/${newItem.id}`);
      } catch (err) {
        console.warn(`[Firebase Cloud] Sync notice for ${collectionName}:`, err.message);
      }
    }

    return newItem;
  }

  // Alias
  async create(collectionName, itemData) {
    return this.add(collectionName, itemData);
  }

  // --- CRUD: Direct Cloud Update (Zero LocalStorage) ---
  async update(collectionName, id, updatedFields) {
    const updatedAt = new Date().toISOString();
    const existing = await this.getById(collectionName, id);
    const updatedItem = { ...(existing || {}), id: String(id), ...updatedFields, updatedAt };

    // Update in RAM session store
    if (!this.sessionStore[collectionName]) {
      this.sessionStore[collectionName] = new Map();
    }
    this.sessionStore[collectionName].set(String(id), updatedItem);

    // Direct update in Firebase Cloud Firestore!
    if (this.isFirebaseReady && this.db) {
      try {
        await this.db.collection(collectionName).doc(String(id)).set(updatedItem, { merge: true });
        console.log(`[Firebase Cloud] Updated ${collectionName}/${id}`);
      } catch (err) {
        console.warn(`[Firebase Cloud] Update notice for ${collectionName}/${id}:`, err.message);
      }
    }

    return updatedItem;
  }

  // Alias
  async put(collectionName, id, updatedFields) {
    return this.update(collectionName, id, updatedFields);
  }

  // --- CRUD: Direct Cloud Delete (Zero LocalStorage) ---
  async delete(collectionName, id) {
    const strId = String(id);

    // Track deletion in RAM session store
    if (this.sessionStore[collectionName]) {
      this.sessionStore[collectionName].delete(strId);
    }
    if (!this.deletedIds[collectionName]) {
      this.deletedIds[collectionName] = new Set();
    }
    this.deletedIds[collectionName].add(strId);

    // Direct delete from Firebase Cloud Firestore!
    if (this.isFirebaseReady && this.db) {
      try {
        await this.db.collection(collectionName).doc(strId).delete();
        console.log(`[Firebase Cloud] Deleted ${collectionName}/${strId}`);
      } catch (err) {
        console.warn(`[Firebase Cloud] Delete notice for ${collectionName}/${strId}:`, err.message);
      }
    }

    return true;
  }

  // --- Seed Data Sync to Firestore (Master Assets -> Cloud Firestore) ---
  async syncSeedDataToFirestore() {
    if (!this.isFirebaseReady || !this.db) return;
    try {
      const partiesSnapshot = await this.db.collection('parties').limit(1).get();
      if (partiesSnapshot.empty) {
        console.log("⚡ Populating initial master records to Firebase Cloud...");
        if (typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_PARTIES)) {
          const batch = this.db.batch();
          window.INITIAL_EXCEL_PARTIES.slice(0, 50).forEach(p => {
            const ref = this.db.collection('parties').doc(String(p.id));
            batch.set(ref, p);
          });
          await batch.commit();
        }
      }
    } catch (err) {
      console.warn("Firestore seed check notice:", err.message);
    }
  }

  // Intentionally disabled: No data is saved to browser localStorage
  seedLocalStorage() {
    // Disabled: Direct Firebase Cloud Firestore active. Zero localStorage persistence.
  }
}

// Global Singleton Instance
const dbService = new DBService();
if (typeof window !== 'undefined') {
  window.dbService = dbService;
  window.FirebaseDB = dbService;
}
if (typeof module !== 'undefined' && module.exports) module.exports = dbService;
