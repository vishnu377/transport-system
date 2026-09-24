/**
 * Universal Database Service for MTC & TTC Logistics
 * Seamlessly connects to Firebase Cloud Firestore with automatic offline fallback
 */

class DBService {
  constructor() {
    this.isFirebaseReady = false;
    this.initDatabase();
  }

  initDatabase() {
    // Check if Firebase config is supplied and Firebase SDK is loaded
    if (
      typeof firebase !== 'undefined' &&
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
        
        // Async check to sync seed data to Firestore if empty
        this.syncSeedDataToFirestore();
      } catch (err) {
        console.warn("⚠ Firebase initialization failed, falling back to LocalStorage:", err);
        this.isFirebaseReady = false;
      }
    } else {
      console.log("ℹ Running in Standalone LocalStorage Mode.");
      this.isFirebaseReady = false;
    }

    // Always ensure local seed data is available
    this.seedLocalStorage();
  }

  // --- Universal CRUD Operations ---

  async getAll(collectionName) {
    let cloudItems = [];
    if (this.isFirebaseReady) {
      try {
        const snapshot = await this.db.collection(collectionName).get();
        if (!snapshot.empty) {
          cloudItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          if (collectionName !== 'trips' && collectionName !== 'debts') {
            return cloudItems;
          }
        }
      } catch (err) {
        console.warn(`Firestore read failed for ${collectionName}, reading from LocalStorage:`, err.message);
      }
    }

    if (collectionName === 'trips') {
      return this.getAllTrips(cloudItems);
    }

    if (collectionName === 'debts') {
      return this.getAllDebts(cloudItems);
    }

    // LocalStorage Fallback for other collections
    const localData = localStorage.getItem(`tms_${collectionName}`);
    return localData ? JSON.parse(localData) : [];
  }

  getAllTrips(cloudItems = []) {
    // Check if user chose to clear/reset the initial base dataset
    const isBaseCleared = localStorage.getItem('tms_base_trips_cleared') === 'true';
    const baseTrips = (!isBaseCleared && typeof window !== 'undefined' && Array.isArray(window.INITIAL_EXCEL_TRIPS))
      ? window.INITIAL_EXCEL_TRIPS
      : [];

    const editedMap = JSON.parse(localStorage.getItem('tms_edited_trips') || '{}');
    const deletedList = JSON.parse(localStorage.getItem('tms_deleted_trips') || '[]');
    const deletedSet = new Set(deletedList.map(String));
    const customTrips = JSON.parse(localStorage.getItem('tms_custom_trips') || '[]');

    const tripMap = new Map();

    // 1. Add base trips (if not cleared)
    for (const t of baseTrips) {
      const key = t.grNo || t.id;
      if (!deletedSet.has(String(t.id)) && !deletedSet.has(String(t.grNo))) {
        tripMap.set(key, editedMap[t.id] ? { ...t, ...editedMap[t.id] } : t);
      }
    }

    // 2. Add/override with local custom trips
    for (const t of customTrips) {
      const key = t.grNo || t.id;
      if (!deletedSet.has(String(t.id)) && !deletedSet.has(String(t.grNo))) {
        tripMap.set(key, editedMap[t.id] ? { ...t, ...editedMap[t.id] } : t);
      }
    }

    // 3. Add/override with cloud items from Firestore
    if (Array.isArray(cloudItems)) {
      for (const t of cloudItems) {
        const key = t.grNo || t.id;
        if (!deletedSet.has(String(t.id)) && !deletedSet.has(String(t.grNo))) {
          tripMap.set(key, { ...(tripMap.get(key) || {}), ...t });
        }
      }
    }

    const all = Array.from(tripMap.values());
    all.sort((a, b) => {
      const dateA = a.tripStartDate || '';
      const dateB = b.tripStartDate || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return String(b.grNo || '').localeCompare(String(a.grNo || ''));
    });

    return all;
  }

  // Clear all trips (removes old Excel trips and custom trips)
  clearAllTrips() {
    localStorage.setItem('tms_base_trips_cleared', 'true');
    localStorage.removeItem('tms_custom_trips');
    localStorage.removeItem('tms_edited_trips');
    localStorage.removeItem('tms_deleted_trips');
    localStorage.removeItem('tms_trips');
  }

  // Restore the original base dataset from sample-trips-data.js
  restoreBaseTrips() {
    localStorage.removeItem('tms_base_trips_cleared');
    localStorage.removeItem('tms_custom_trips');
    localStorage.removeItem('tms_edited_trips');
    localStorage.removeItem('tms_deleted_trips');
    if (typeof window !== 'undefined' && window.INITIAL_EXCEL_TRIPS) {
      localStorage.setItem('tms_trips', JSON.stringify(window.INITIAL_EXCEL_TRIPS));
    }
  }

  // --- Authentic AppSheet Ledger Debts Engine ---
  getAllDebts(cloudItems = []) {
    // Ensure dataset version consistency
    const CURRENT_DEBTS_VERSION = '2026_09_24_V3';
    if (localStorage.getItem('tms_debts_data_version') !== CURRENT_DEBTS_VERSION) {
      localStorage.removeItem('tms_base_debts_cleared');
      localStorage.removeItem('tms_custom_debts');
      localStorage.removeItem('tms_edited_debts');
      localStorage.removeItem('tms_deleted_debts');
      localStorage.setItem('tms_debts_data_version', CURRENT_DEBTS_VERSION);
    }

    const isBaseCleared = localStorage.getItem('tms_base_debts_cleared') === 'true';
    const baseDebts = (!isBaseCleared && typeof window !== 'undefined' && Array.isArray(window.SAMPLE_DEBTS_DATA))
      ? window.SAMPLE_DEBTS_DATA
      : [];

    const editedMap = JSON.parse(localStorage.getItem('tms_edited_debts') || '{}');
    const deletedList = JSON.parse(localStorage.getItem('tms_deleted_debts') || '[]');
    const deletedSet = new Set(deletedList.map(String));
    const customDebts = JSON.parse(localStorage.getItem('tms_custom_debts') || '[]');

    const debtMap = new Map();

    // 1. Add base debts
    for (const d of baseDebts) {
      if (!deletedSet.has(String(d.id))) {
        debtMap.set(String(d.id), editedMap[d.id] ? { ...d, ...editedMap[d.id] } : d);
      }
    }

    // 2. Add/override with custom debts
    for (const d of customDebts) {
      if (!deletedSet.has(String(d.id))) {
        debtMap.set(String(d.id), editedMap[d.id] ? { ...d, ...editedMap[d.id] } : d);
      }
    }

    // 3. Add/override with cloud items
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (!deletedSet.has(String(d.id))) {
          debtMap.set(String(d.id), { ...(debtMap.get(String(d.id)) || {}), ...d });
        }
      }
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
    localStorage.setItem('tms_base_debts_cleared', 'true');
    localStorage.removeItem('tms_custom_debts');
    localStorage.removeItem('tms_edited_debts');
    localStorage.removeItem('tms_deleted_debts');
    localStorage.removeItem('tms_debts');
  }

  restoreBaseDebts() {
    localStorage.removeItem('tms_base_debts_cleared');
    localStorage.removeItem('tms_custom_debts');
    localStorage.removeItem('tms_edited_debts');
    localStorage.removeItem('tms_deleted_debts');
    if (typeof window !== 'undefined' && window.SAMPLE_DEBTS_DATA) {
      localStorage.setItem('tms_debts', JSON.stringify(window.SAMPLE_DEBTS_DATA));
    }
  }

  async recordReturnedAmount(debtId, paymentData) {
    const debt = await this.getById('debts', debtId);
    if (!debt) throw new Error('Debt record not found');

    const returnEntry = {
      id: `RET_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      date: paymentData.date || new Date().toISOString().split('T')[0],
      displayDate: paymentData.displayDate || (typeof AppUI !== 'undefined' && AppUI.formatDate ? AppUI.formatDate(paymentData.date) : paymentData.date),
      amount: Number(paymentData.amount) || 0,
      mode: paymentData.mode || 'Cash',
      receivedBy: paymentData.receivedBy || '',
      remarks: paymentData.remarks || '',
      createdAt: new Date().toISOString()
    };

    const returnedAmounts = Array.isArray(debt.returnedAmounts) ? [...debt.returnedAmounts, returnEntry] : [returnEntry];
    const totalReturned = returnedAmounts.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
    const dueAmount = Math.max(0, Number(debt.debtAmount || 0) - totalReturned);

    return await this.update('debts', debtId, {
      returnedAmounts,
      totalReturned,
      dueAmount
    });
  }

  async getById(collectionName, id) {
    if (this.isFirebaseReady) {
      try {
        const doc = await this.db.collection(collectionName).doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn(`Firestore getById error for ${id} in ${collectionName}:`, err.message);
      }
    }
    const items = await this.getAll(collectionName);
    return items.find(item => String(item.id) === String(id) || String(item.grNo) === String(id)) || null;
  }

  async add(collectionName, itemData) {
    if (collectionName === 'trips') {
      const newItem = {
        ...itemData,
        id: itemData.id || `TRIP_NEW_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const customTrips = JSON.parse(localStorage.getItem('tms_custom_trips') || '[]');
      customTrips.unshift(newItem);
      localStorage.setItem('tms_custom_trips', JSON.stringify(customTrips));

      if (this.isFirebaseReady) {
        try {
          await this.db.collection('trips').doc(newItem.id).set(newItem);
          console.log(` Cloud Synced: trips/${newItem.id}`);
        } catch (err) {
          console.warn('Firestore sync error for trips:', err.message);
        }
      }
      return newItem;
    }

    if (collectionName === 'debts') {
      const newItem = {
        ...itemData,
        id: itemData.id || `DEBT_NEW_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const customDebts = JSON.parse(localStorage.getItem('tms_custom_debts') || '[]');
      customDebts.unshift(newItem);
      localStorage.setItem('tms_custom_debts', JSON.stringify(customDebts));

      if (this.isFirebaseReady) {
        try {
          await this.db.collection('debts').doc(newItem.id).set(newItem);
          console.log(` Cloud Synced: debts/${newItem.id}`);
        } catch (err) {
          console.warn('Firestore sync error for debts:', err.message);
        }
      }
      return newItem;
    }

    const newItem = {
      ...itemData,
      id: itemData.id || `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save locally first for instant UI response
    const items = await this.getAll(collectionName);
    const existingIndex = items.findIndex(i => String(i.id) === String(newItem.id));
    if (existingIndex >= 0) {
      items[existingIndex] = newItem;
    } else {
      items.unshift(newItem);
    }
    localStorage.setItem(`tms_${collectionName}`, JSON.stringify(items));

    // Sync to Firestore in Cloud
    if (this.isFirebaseReady) {
      try {
        await this.db.collection(collectionName).doc(newItem.id).set(newItem);
        console.log(` Cloud Synced: ${collectionName}/${newItem.id}`);
      } catch (err) {
        console.warn(`Firestore sync error for ${collectionName}:`, err.message);
      }
    }

    return newItem;
  }

  async update(collectionName, id, updatedFields) {
    const updatedAt = new Date().toISOString();

    if (collectionName === 'trips') {
      let customTrips = JSON.parse(localStorage.getItem('tms_custom_trips') || '[]');
      const customIdx = customTrips.findIndex(t => String(t.id) === String(id) || String(t.grNo) === String(id));
      let updatedItem = null;

      if (customIdx >= 0) {
        updatedItem = { ...customTrips[customIdx], ...updatedFields, updatedAt };
        customTrips[customIdx] = updatedItem;
        localStorage.setItem('tms_custom_trips', JSON.stringify(customTrips));
      } else {
        const editedMap = JSON.parse(localStorage.getItem('tms_edited_trips') || '{}');
        const existing = await this.getById('trips', id);
        updatedItem = { ...(existing || {}), id, ...updatedFields, updatedAt };
        editedMap[id] = updatedItem;
        localStorage.setItem('tms_edited_trips', JSON.stringify(editedMap));
      }

      if (this.isFirebaseReady) {
        try {
          await this.db.collection('trips').doc(String(id)).set(updatedItem, { merge: true });
          console.log(` Cloud Updated: trips/${id}`);
        } catch (err) {
          console.warn('Firestore update error for trips:', err.message);
        }
      }
      return updatedItem;
    }

    if (collectionName === 'debts') {
      let customDebts = JSON.parse(localStorage.getItem('tms_custom_debts') || '[]');
      const customIdx = customDebts.findIndex(d => String(d.id) === String(id));
      let updatedItem = null;

      if (customIdx >= 0) {
        updatedItem = { ...customDebts[customIdx], ...updatedFields, updatedAt };
        customDebts[customIdx] = updatedItem;
        localStorage.setItem('tms_custom_debts', JSON.stringify(customDebts));
      } else {
        const editedMap = JSON.parse(localStorage.getItem('tms_edited_debts') || '{}');
        const existing = await this.getById('debts', id);
        updatedItem = { ...(existing || {}), id, ...updatedFields, updatedAt };
        editedMap[id] = updatedItem;
        localStorage.setItem('tms_edited_debts', JSON.stringify(editedMap));
      }

      if (this.isFirebaseReady) {
        try {
          await this.db.collection('debts').doc(String(id)).set(updatedItem, { merge: true });
          console.log(` Cloud Updated: debts/${id}`);
        } catch (err) {
          console.warn('Firestore update error for debts:', err.message);
        }
      }
      return updatedItem;
    }

    // Update locally
    const items = await this.getAll(collectionName);
    const index = items.findIndex(item => String(item.id) === String(id));
    let updatedItem = { id, ...updatedFields, updatedAt };

    if (index !== -1) {
      updatedItem = { ...items[index], ...updatedFields, updatedAt };
      items[index] = updatedItem;
      localStorage.setItem(`tms_${collectionName}`, JSON.stringify(items));
    }

    // Update in Firestore
    if (this.isFirebaseReady) {
      try {
        await this.db.collection(collectionName).doc(id).set(updatedItem, { merge: true });
        console.log(` Cloud Updated: ${collectionName}/${id}`);
      } catch (err) {
        console.warn(`Firestore update error for ${id} in ${collectionName}:`, err.message);
      }
    }

    return updatedItem;
  }

  async delete(collectionName, id) {
    if (collectionName === 'trips') {
      let customTrips = JSON.parse(localStorage.getItem('tms_custom_trips') || '[]');
      customTrips = customTrips.filter(t => String(t.id) !== String(id) && String(t.grNo) !== String(id));
      localStorage.setItem('tms_custom_trips', JSON.stringify(customTrips));

      const deletedList = JSON.parse(localStorage.getItem('tms_deleted_trips') || '[]');
      if (!deletedList.includes(String(id))) {
        deletedList.push(String(id));
        localStorage.setItem('tms_deleted_trips', JSON.stringify(deletedList));
      }

      if (this.isFirebaseReady) {
        try {
          await this.db.collection('trips').doc(String(id)).delete();
          console.log(` Cloud Deleted: trips/${id}`);
        } catch (err) {
          console.warn('Firestore delete error for trips:', err.message);
        }
      }
      return true;
    }

    if (collectionName === 'debts') {
      let customDebts = JSON.parse(localStorage.getItem('tms_custom_debts') || '[]');
      customDebts = customDebts.filter(d => String(d.id) !== String(id));
      localStorage.setItem('tms_custom_debts', JSON.stringify(customDebts));

      const deletedList = JSON.parse(localStorage.getItem('tms_deleted_debts') || '[]');
      if (!deletedList.includes(String(id))) {
        deletedList.push(String(id));
        localStorage.setItem('tms_deleted_debts', JSON.stringify(deletedList));
      }

      if (this.isFirebaseReady) {
        try {
          await this.db.collection('debts').doc(String(id)).delete();
          console.log(` Cloud Deleted: debts/${id}`);
        } catch (err) {
          console.warn('Firestore delete error for debts:', err.message);
        }
      }
      return true;
    }

    // Delete locally
    let items = await this.getAll(collectionName);
    items = items.filter(item => String(item.id) !== String(id));
    localStorage.setItem(`tms_${collectionName}`, JSON.stringify(items));

    // Delete in Firestore
    if (this.isFirebaseReady) {
      try {
        await this.db.collection(collectionName).doc(id).delete();
        console.log(` Cloud Deleted: ${collectionName}/${id}`);
      } catch (err) {
        console.warn(`Firestore delete error for ${id} in ${collectionName}:`, err.message);
      }
    }

    return true;
  }

  // --- Seed Data Sync to Firestore ---
  async syncSeedDataToFirestore() {
    if (!this.isFirebaseReady) return;
    try {
      const partiesSnapshot = await this.db.collection('parties').limit(1).get();
      if (partiesSnapshot.empty) {
        console.log("⚡ Syncing initial master data to Firebase Cloud Firestore...");
        const seedCollections = [
          'parties', 'truckOwners', 'drivers', 'brokers', 'trips',
          'payments', 'cheques', 'cashBook', 'defUrea',
          'gstInvoices', 'podRecords', 'dieselSlips',
          'ewayBills', 'fleetCompliance', 'users'
        ];
        for (const col of seedCollections) {
          const localItems = JSON.parse(localStorage.getItem(`tms_${col}`) || '[]');
          for (const item of localItems) {
            await this.db.collection(col).doc(item.id).set(item);
          }
        }
        console.log(" Initial master data synced to Firestore successfully!");
      }
    } catch (err) {
      console.warn("Firestore seed check warning (check Firestore Rules):", err.message);
    }
  }

  // --- Seed LocalStorage ---
  seedLocalStorage() {
    if (!localStorage.getItem('tms_seeded_v1')) {
      const parties = [
        {
          id: "party_1",
          name: "Berger Paints India Ltd.",
          gstin: "09AABCB0976E2ZS",
          address: "Sandila Industrial Area, Hardoi, Uttar Pradesh",
          mobile: "9414659401",
          contactPerson: "Branch Logistics Head",
          dueAmount: 540000,
          paidAmount: 294671469
        },
        {
          id: "party_2",
          name: "Bholenath Minerals",
          gstin: "08MWJPK6870R1Z6",
          address: "Industrial Area, Rajsamand, Rajasthan",
          mobile: "9829241717",
          contactPerson: "Bholenath Ji",
          dueAmount: 180000,
          paidAmount: 15480000
        },
        {
          id: "party_3",
          name: "Kothari Microns",
          gstin: "08CTWPK5106N1ZY",
          address: "Araji No. 133, Village Piplantri Khurd, Rajsamand, Rajasthan",
          mobile: "8209727398",
          contactPerson: "Tanuj Kothari",
          dueAmount: 0,
          paidAmount: 34500000
        },
        {
          id: "party_4",
          name: "RSPL Limited (Ghadi Detergent)",
          gstin: "09AABCR1234F1Z0",
          address: "Alwar Industrial Area, Rajasthan",
          mobile: "9414312586",
          contactPerson: "Supply Chain Manager",
          dueAmount: 115500,
          paidAmount: 48900000
        },
        {
          id: "party_5",
          name: "Siemens International",
          gstin: "06AAACT0012P1ZV",
          address: "Ambala, Haryana",
          mobile: "9314242911",
          contactPerson: "Virsun Industries Contact",
          dueAmount: 147875,
          paidAmount: 12450000
        }
      ];

      const owners = [
        {
          id: "owner_1",
          name: "Laxmi Prakash Jat",
          mobile: "9571272336",
          mobile1: "9828230022",
          trucks: ["RJ52GA7310", "RJ52GA7335", "RJ52GA7728"],
          dueAmount: 466800,
          type: "Market"
        },
        {
          id: "owner_2",
          name: "Rameshwar Prasad",
          mobile: "9414659401",
          mobile1: "9314000521",
          trucks: ["RJ52GB2588", "RJ52GA8678"],
          dueAmount: 134544,
          type: "Market"
        },
        {
          id: "owner_3",
          name: "Pappu Badak",
          mobile: "9636017337",
          mobile1: "8209210353",
          trucks: ["RJ52GB3114"],
          dueAmount: 180000,
          type: "Market"
        },
        {
          id: "owner_4",
          name: "MTC Fleet (Self Owned)",
          mobile: "9414312586",
          mobile1: "9414011332",
          trucks: ["RJ52GA7729", "RJ52GA8678", "RJ52GB2589", "RJ52GA7335", "RJ52GB5061"],
          dueAmount: 0,
          type: "Self"
        }
      ];

      const drivers = [
        {
          id: "driver_1",
          name: "Kaluram Jat Shrinagar",
          mobile: "9784175913",
          ownerName: "Laxmi Prakash Jat",
          licenseNo: "RJ-01-2018-00912"
        },
        {
          id: "driver_2",
          name: "Rk Dewanda 3114",
          mobile: "6376140149",
          ownerName: "Pappu Badak",
          licenseNo: "RJ-52-2020-00451"
        },
        {
          id: "driver_3",
          name: "Bhagchand 0729",
          mobile: "8955266993",
          ownerName: "MTC Fleet",
          licenseNo: "RJ-52-2019-00874"
        },
        {
          id: "driver_4",
          name: "Mahendra Jat 2585",
          mobile: "9521891459",
          ownerName: "MTC Fleet",
          licenseNo: "RJ-52-2021-00129"
        }
      ];

      const brokers = [
        {
          id: "broker_1",
          name: "Kunal Micron Vijay Jain",
          mobile: "9829241717",
          mobile1: "",
          commissionRate: "₹2,000 / Trip",
          location: "Rajsamand"
        },
        {
          id: "broker_2",
          name: "Rajesh Rao Udaipur",
          mobile: "7023678976",
          mobile1: "",
          commissionRate: "₹1,500 / Trip",
          location: "Udaipur"
        },
        {
          id: "broker_3",
          name: "Pavan Bansal Dadri",
          mobile: "9311320045",
          mobile1: "",
          commissionRate: "₹2,000 / Trip",
          location: "Dadri, U.P."
        }
      ];

      const trips = [
        {
          id: "trip_1924_TTC",
          grNo: "2026-2027-1924_TTC",
          transport: "TTC",
          biltyType: "Regular",
          isGstApplicable: "Yes",
          tripStartDate: "2026-08-31",
          truckNo: "RJ52GB3114",
          truckOwner: "Pappu Badak",
          driver: "Rk Dewanda 3114",
          driverMobile: "6376140149",
          origin: "Rajsamand (Raj.)",
          destination: "Noida (U.P.)",
          material: "Marble Powder",
          reference: "Kunal Micron Vijay Jain",
          referenceMobile: "9829241717",
          consignor: "Bholenath Minerals",
          consignee: "Berger Paints India Ltd.",
          billingType: "Per Tonne",
          weight: 41.5,
          rate: 2200,
          freight: 91300,
          commission: 2000,
          status: "Due",
          ownerDue: 44300,
          partyDue: 91300,
          partyPaid: 0
        },
        {
          id: "trip_164_SMTC",
          grNo: "2026-2027-164_SMTC",
          transport: "SMTC",
          biltyType: "Regular",
          isGstApplicable: "Yes",
          tripStartDate: "2026-08-31",
          truckNo: "RJ52GA7310",
          truckOwner: "Laxmi Prakash Jat",
          driver: "Kalu Gurjar",
          driverMobile: "7297854407",
          origin: "Udaipur (Raj.)",
          destination: "Sikandrabad (U.P.)",
          material: "Putty Grade Dolomite X-812",
          reference: "Rajesh Rao Udaipur",
          referenceMobile: "7023678976",
          consignor: "RBL Natural Resources Ltd.",
          consignee: "Berger Paints India Ltd.",
          billingType: "Per Tonne",
          weight: 42.0,
          rate: 2150,
          freight: 106554,
          commission: 1500,
          status: "Transit",
          ownerDue: 55054,
          partyDue: 106554,
          partyPaid: 0
        },
        {
          id: "trip_1882_TTC",
          grNo: "2026-2027-1882_TTC",
          transport: "TTC",
          biltyType: "Regular",
          isGstApplicable: "Yes",
          tripStartDate: "2026-08-26",
          truckNo: "RJ01GC2159",
          truckOwner: "Mahendra Rawat Shrinagar",
          driver: "Kaluram Jat Shrinagar",
          driverMobile: "9784175913",
          origin: "Rajsamand (Raj.)",
          destination: "Dadri (U.P.)",
          material: "Marble Powder",
          reference: "Pavan Bansal Dadri",
          referenceMobile: "9311320045",
          consignor: "Bholenath Minerals",
          consignee: "Berger Paints India Ltd.",
          billingType: "Per Tonne",
          weight: 100.25,
          rate: 1600,
          freight: 160400,
          commission: 2000,
          status: "Settled",
          ownerDue: 0,
          partyDue: 0,
          partyPaid: 160400
        }
      ];

      localStorage.setItem('tms_parties', JSON.stringify(parties));
      localStorage.setItem('tms_truckOwners', JSON.stringify(owners));
      localStorage.setItem('tms_drivers', JSON.stringify(drivers));
      localStorage.setItem('tms_brokers', JSON.stringify(brokers));
      localStorage.setItem('tms_trips', JSON.stringify(trips));
      localStorage.setItem('tms_seeded_v1', 'true');
    }

    // Auto-seed Mosa Ji's 5,103 Real Excel Trips if available
    if (typeof window !== 'undefined' && window.INITIAL_EXCEL_TRIPS && window.INITIAL_EXCEL_TRIPS.length > 0) {
      try {
        const storedTrips = JSON.parse(localStorage.getItem('tms_trips') || '[]');
        if (storedTrips.length <= 5 || !localStorage.getItem('tms_excel_imported_v1')) {
          localStorage.setItem('tms_trips', JSON.stringify(window.INITIAL_EXCEL_TRIPS));
          localStorage.setItem('tms_excel_imported_v1', 'true');
          console.log(` Loaded ${window.INITIAL_EXCEL_TRIPS.length} real trips from Mosa ji's Excel file!`);
        }
      } catch (e) {
        console.warn("Storage quota warning on seed:", e);
      }
    }

    // Auto-seed Mosa Ji's 74 Real Trucks if available
    if (typeof window !== 'undefined' && window.INITIAL_EXCEL_TRUCKS && window.INITIAL_EXCEL_TRUCKS.length > 0) {
      try {
        const storedOwners = JSON.parse(localStorage.getItem('tms_truckOwners') || '[]');
        if (storedOwners.length <= 4) {
          localStorage.setItem('tms_truckOwners', JSON.stringify([...storedOwners, ...window.INITIAL_EXCEL_TRUCKS]));
        }
      } catch (e) {
        console.warn("Storage quota warning on trucks seed:", e);
      }
    }

    // Phase 2 Seed Data: Payments, Cheques, Cash Book, DEF Urea
    if (!localStorage.getItem('tms_seeded_phase2')) {
      const payments = [
        {
          id: "pay_1",
          type: "party", // party payment received
          date: "2026-08-28",
          firm: "TTC",
          partyName: "Berger Paints India Ltd.",
          grNo: "2026-2027-1882_TTC",
          amount: 160400,
          mode: "NEFT/RTGS",
          refNo: "IDBIN2624098711",
          bankAccount: "TTC Current A/c - IDBI Bank",
          remarks: "Full freight settlement for Dadri dispatch"
        },
        {
          id: "pay_2",
          type: "owner", // owner payment paid
          date: "2026-08-31",
          firm: "TTC",
          ownerName: "Pappu Badak",
          truckNo: "RJ52GB3114",
          grNo: "2026-2027-1924_TTC",
          stage: "Advance at Loading",
          amount: 45000,
          mode: "Cash",
          refNo: "VCH-2026-089",
          remarks: "Cash advance given to driver Rk Dewanda at Shahpura office"
        },
        {
          id: "pay_3",
          type: "owner",
          date: "2026-08-31",
          firm: "SMTC",
          ownerName: "Laxmi Prakash Jat",
          truckNo: "RJ52GA7310",
          grNo: "2026-2027-164_SMTC",
          stage: "Diesel Advance",
          amount: 50000,
          mode: "Diesel Slip",
          refNo: "DSL-SHP-4402",
          remarks: "Diesel slip issued for Shahpura IOCL pump"
        }
      ];

      const cheques = [
        {
          id: "chq_1",
          chequeNo: "389021",
          chequeDate: "2026-08-25",
          partyName: "Berger Paints India Ltd.",
          bankName: "HDFC Bank",
          amount: 180000,
          firm: "TTC",
          depositAccount: "TTC Current A/c - IDBI Bank",
          status: "Cleared",
          depositDate: "2026-08-26",
          clearanceDate: "2026-08-28",
          remarks: "August batch payment"
        },
        {
          id: "chq_2",
          chequeNo: "004512",
          chequeDate: "2026-08-30",
          partyName: "Bholenath Minerals",
          bankName: "ICICI Bank",
          amount: 91300,
          firm: "TTC",
          depositAccount: "TTC Current A/c - IDBI Bank",
          status: "Deposited",
          depositDate: "2026-09-01",
          clearanceDate: "",
          remarks: "Cheque deposited in IDBI Shahpura, awaiting clearing"
        },
        {
          id: "chq_3",
          chequeNo: "119045",
          chequeDate: "2026-09-02",
          partyName: "RSPL Limited (Ghadi Detergent)",
          bankName: "State Bank of India",
          amount: 115500,
          firm: "MTC",
          depositAccount: "MTC Current A/c - HDFC Bank",
          status: "Pending",
          depositDate: "",
          clearanceDate: "",
          remarks: "Received at Shahpura office, to be deposited tomorrow"
        }
      ];

      const cashBook = [
        {
          id: "cash_1",
          date: "2026-08-30",
          type: "IN",
          category: "Bank Withdrawal",
          amount: 200000,
          particulars: "Self Cash Withdrawal from IDBI Bank for Driver Advances",
          truckNo: "",
          voucherNo: "CHQ-SELF-890",
          firm: "TTC"
        },
        {
          id: "cash_2",
          date: "2026-08-31",
          type: "OUT",
          category: "Driver Advance",
          amount: 45000,
          particulars: "Driver Advance - RJ52GB3114 (Driver Rk Dewanda)",
          truckNo: "RJ52GB3114",
          voucherNo: "VCH-2026-089",
          firm: "TTC"
        },
        {
          id: "cash_3",
          date: "2026-08-31",
          type: "OUT",
          category: "Office Expense",
          amount: 1250,
          particulars: "Shahpura Office Chai, Tea & Water Cooler Can",
          truckNo: "",
          voucherNo: "PETTY-012",
          firm: "TTC"
        }
      ];

      const defUrea = [
        {
          id: "def_1",
          type: "PURCHASE",
          date: "2026-08-25",
          supplier: "HPCL Distributor Shahpura",
          qtyBuckets: 50,
          bucketSize: "20 Litres",
          rate: 720,
          totalAmount: 36000,
          remarks: "50 buckets 20L stock received at yard"
        },
        {
          id: "def_2",
          type: "ISSUE",
          date: "2026-08-31",
          truckNo: "RJ52GA7729",
          driver: "Bhagchand 0729",
          qtyBuckets: 2,
          emptyBucketReturned: "Yes",
          returnedDate: "2026-08-31",
          remarks: "Own truck trip to Hardoi"
        },
        {
          id: "def_3",
          type: "ISSUE",
          date: "2026-08-31",
          truckNo: "RJ52GB3114",
          driver: "Rk Dewanda 3114",
          qtyBuckets: 1,
          emptyBucketReturned: "No (Pending)",
          returnedDate: "",
          remarks: "Market truck advance loading"
        }
      ];

      localStorage.setItem('tms_payments', JSON.stringify(payments));
      localStorage.setItem('tms_cheques', JSON.stringify(cheques));
      localStorage.setItem('tms_cashBook', JSON.stringify(cashBook));
      localStorage.setItem('tms_defUrea', JSON.stringify(defUrea));
      localStorage.setItem('tms_seeded_phase2', 'true');
    }

    // Phase 3 Seed Data: GST Invoices, POD Records, Diesel Pump Slips
    if (!localStorage.getItem('tms_seeded_phase3')) {
      const gstInvoices = [
        {
          id: "inv_1",
          invoiceNo: "INV-2026-TTC-0042",
          firm: "TTC",
          invoiceDate: "2026-08-31",
          dueDate: "2026-09-15",
          partyName: "Berger Paints India Ltd.",
          partyGstin: "09AABCB0976E2ZS",
          partyAddress: "Sandila Industrial Area, Hardoi, Uttar Pradesh",
          sacCode: "996511",
          isRcm: "Yes", // Reverse Charge Mechanism
          trips: [
            {
              grNo: "2026-2027-1882_TTC",
              tripDate: "2026-08-26",
              truckNo: "RJ01GC2159",
              origin: "Rajsamand (Raj.)",
              destination: "Dadri (U.P.)",
              material: "Marble Powder",
              weight: 100.25,
              rate: 1600,
              freight: 160400
            }
          ],
          subTotal: 160400,
          cgstRate: 0,
          cgstAmount: 0,
          sgstRate: 0,
          sgstAmount: 0,
          igstRate: 5,
          igstAmount: 8020,
          grandTotal: 168420,
          status: "Generated",
          remarks: "Consolidated freight invoice for August Dadri dispatches"
        }
      ];

      const podRecords = [
        {
          id: "pod_1",
          grNo: "2026-2027-1882_TTC",
          tripId: "trip_1882_TTC",
          firm: "TTC",
          truckNo: "RJ01GC2159",
          driver: "Kaluram Jat Shrinagar",
          consignee: "Berger Paints India Ltd.",
          origin: "Rajsamand (Raj.)",
          destination: "Dadri (U.P.)",
          dispatchDate: "2026-08-26",
          deliveryDate: "2026-08-28",
          status: "Submitted to Client",
          receivedBy: "Berger Dadri Depot Warehouse Incharge",
          shortageKg: 0,
          shortageAmount: 0,
          remarks: "Verified clean POD with company stamp"
        },
        {
          id: "pod_2",
          grNo: "2026-2027-1924_TTC",
          tripId: "trip_1924_TTC",
          firm: "TTC",
          truckNo: "RJ52GB3114",
          driver: "Rk Dewanda 3114",
          consignee: "Berger Paints India Ltd.",
          origin: "Rajsamand (Raj.)",
          destination: "Noida (U.P.)",
          dispatchDate: "2026-08-31",
          deliveryDate: "2026-09-02",
          status: "Received at Branch",
          receivedBy: "Security Guard & Unloading Supervisor",
          shortageKg: 30,
          shortageAmount: 1200,
          remarks: "30 kg bag damaged in transit. Shortage deducted from owner balance"
        },
        {
          id: "pod_3",
          grNo: "2026-2027-164_SMTC",
          tripId: "trip_164_SMTC",
          firm: "SMTC",
          truckNo: "RJ52GA7310",
          driver: "Kalu Gurjar",
          consignee: "Berger Paints India Ltd.",
          origin: "Udaipur (Raj.)",
          destination: "Sikandrabad (U.P.)",
          dispatchDate: "2026-08-31",
          deliveryDate: "",
          status: "In Transit",
          receivedBy: "",
          shortageKg: 0,
          shortageAmount: 0,
          remarks: "Vehicle currently in transit, expected delivery tomorrow"
        }
      ];

      const dieselSlips = [
        {
          id: "dsl_1",
          slipNo: "DSL-SHP-4401",
          date: "2026-08-31",
          pumpName: "IOCL Shahpura (Kisan Seva Kendra)",
          firm: "TTC",
          truckNo: "RJ52GB3114",
          driver: "Rk Dewanda 3114",
          ownerName: "Pappu Badak",
          tripGrNo: "2026-2027-1924_TTC",
          liters: 250,
          rate: 90.50,
          amount: 22625,
          status: "Unsettled",
          remarks: "Fuel advance for Noida trip"
        },
        {
          id: "dsl_2",
          slipNo: "DSL-SHP-4402",
          date: "2026-08-31",
          pumpName: "IOCL Shahpura (Kisan Seva Kendra)",
          firm: "SMTC",
          truckNo: "RJ52GA7310",
          driver: "Kalu Gurjar",
          ownerName: "Laxmi Prakash Jat",
          tripGrNo: "2026-2027-164_SMTC",
          liters: 300,
          rate: 90.50,
          amount: 27150,
          status: "Unsettled",
          remarks: "Fuel advance for Sikandrabad trip"
        },
        {
          id: "dsl_3",
          slipNo: "DSL-RAJ-1089",
          date: "2026-08-26",
          pumpName: "HPCL Rajsamand (Mahaveer Auto)",
          firm: "TTC",
          truckNo: "RJ01GC2159",
          driver: "Kaluram Jat Shrinagar",
          ownerName: "Mahendra Rawat Shrinagar",
          tripGrNo: "2026-2027-1882_TTC",
          liters: 350,
          rate: 90.20,
          amount: 31570,
          status: "Settled",
          settledDate: "2026-08-31",
          remarks: "Settled in monthly August pump statement"
        }
      ];

      localStorage.setItem('tms_gstInvoices', JSON.stringify(gstInvoices));
      localStorage.setItem('tms_podRecords', JSON.stringify(podRecords));
      localStorage.setItem('tms_dieselSlips', JSON.stringify(dieselSlips));
      localStorage.setItem('tms_seeded_phase3', 'true');
    }

    // Phase 4 Seed Data: E-Way Bills & Fleet Compliance
    if (!localStorage.getItem('tms_seeded_phase4')) {
      const now = new Date();
      const in12Hours = new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16);
      const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString().slice(0, 16);
      const past2Days = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString().slice(0, 16);

      const ewayBills = [
        {
          id: "ewb_1",
          ewbNo: "321458902145",
          grNo: "2026-2027-1924_TTC",
          firm: "TTC",
          truckNo: "RJ52GB3114",
          driver: "Rk Dewanda 3114",
          driverMobile: "6376140149",
          origin: "Rajsamand (Raj.)",
          destination: "Noida (U.P.)",
          distanceKm: 650,
          generatedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
          validUntil: in48Hours,
          status: "Active",
          remarks: "Marble powder consignment"
        },
        {
          id: "ewb_2",
          ewbNo: "551240987112",
          grNo: "2026-2027-164_SMTC",
          firm: "SMTC",
          truckNo: "RJ52GA7310",
          driver: "Kalu Gurjar",
          driverMobile: "7297854407",
          origin: "Udaipur (Raj.)",
          destination: "Sikandrabad (U.P.)",
          distanceKm: 720,
          generatedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString().slice(0, 16),
          validUntil: in12Hours,
          status: "Expiring Soon",
          remarks: "Tyre puncture delay near Jaipur bypass - Needs extension if delayed"
        },
        {
          id: "ewb_3",
          ewbNo: "119800234510",
          grNo: "2026-2027-1882_TTC",
          firm: "TTC",
          truckNo: "RJ01GC2159",
          driver: "Kaluram Jat Shrinagar",
          driverMobile: "9784175913",
          origin: "Rajsamand (Raj.)",
          destination: "Dadri (U.P.)",
          distanceKm: 610,
          generatedAt: new Date(now.getTime() - 96 * 60 * 60 * 1000).toISOString().slice(0, 16),
          validUntil: past2Days,
          status: "Completed",
          remarks: "Delivered & unloaded safely"
        }
      ];

      const fleetCompliance = [
        {
          id: "flt_1",
          truckNo: "RJ52GA7729",
          model: "Tata Signa 4825.TK 16-Tyre",
          ownership: "Self (MTC Fleet)",
          driver: "Bhagchand 0729",
          driverMobile: "8955266993",
          insurancePolicy: "New India Assurance - POL-890214",
          insuranceExpiry: "2026-10-15",
          fitnessExpiry: "2026-11-20",
          npExpiry: "2027-02-28",
          pucExpiry: "2026-09-25",
          currentKm: 152000,
          lastServiceKm: 145000,
          remarks: "Next engine oil & filter service due at 155,000 Km"
        },
        {
          id: "flt_2",
          truckNo: "RJ52GA8678",
          model: "Ashok Leyland 4220 14-Tyre",
          ownership: "Self (MTC Fleet)",
          driver: "Mahendra Jat 2585",
          driverMobile: "9521891459",
          insurancePolicy: "United India Insurance - POL-554109",
          insuranceExpiry: "2026-09-18", // Expiring soon!
          fitnessExpiry: "2027-01-10",
          npExpiry: "2026-12-31",
          pucExpiry: "2026-10-10",
          currentKm: 188500,
          lastServiceKm: 180000,
          remarks: "Insurance renewal urgent"
        },
        {
          id: "flt_3",
          truckNo: "RJ52GB2589",
          model: "BharatBenz 3523R 12-Tyre",
          ownership: "Self (MTC Fleet)",
          driver: "Ramdev Gurjar",
          driverMobile: "9829100234",
          insurancePolicy: "ICICI Lombard - POL-112450",
          insuranceExpiry: "2027-03-05",
          fitnessExpiry: "2026-09-22", // Expiring soon!
          npExpiry: "2027-04-15",
          pucExpiry: "2026-11-05",
          currentKm: 104000,
          lastServiceKm: 98000,
          remarks: "RTO Passing / Fitness scheduled this week at Rajsamand DTO"
        },
        {
          id: "flt_4",
          truckNo: "RJ52GA7335",
          model: "Tata LPT 3118 10-Tyre",
          ownership: "Self (MTC Fleet)",
          driver: "Shravan Lal",
          driverMobile: "9414209811",
          insurancePolicy: "Oriental Insurance - POL-998120",
          insuranceExpiry: "2027-05-12",
          fitnessExpiry: "2027-06-15",
          npExpiry: "2027-08-30",
          pucExpiry: "2026-12-01",
          currentKm: 215000,
          lastServiceKm: 210000,
          remarks: "All papers valid"
        }
      ];

      localStorage.setItem('tms_ewayBills', JSON.stringify(ewayBills));
      localStorage.setItem('tms_fleetCompliance', JSON.stringify(fleetCompliance));
      localStorage.setItem('tms_seeded_phase4', 'true');
    }

    // Pre-seeded Staff User Accounts
    if (!localStorage.getItem('tms_seeded_users')) {
      const users = [
        {
          id: "usr_1",
          name: "Mosa Ji (Owner)",
          email: "admin@ttclogistics.com",
          mobile: "9414312586",
          password: "admin123",
          role: "SUPER_ADMIN",
          firm: "All Firms (TTC + MTC + SMTC)",
          branch: "Head Office (Shahpura)",
          status: "Active",
          createdAt: new Date().toISOString()
        },
        {
          id: "usr_2",
          name: "Kaluram Ji (Shahpura Munshi)",
          email: "shahpura@ttclogistics.com",
          mobile: "9784175913",
          password: "munshi123",
          role: "BRANCH_MUNSHI",
          firm: "TTC",
          branch: "Shahpura Yard",
          status: "Active",
          createdAt: new Date().toISOString()
        },
        {
          id: "usr_3",
          name: "Rameshwar Ji (Head Accountant)",
          email: "accounts@ttclogistics.com",
          mobile: "9829241717",
          password: "accounts123",
          role: "ACCOUNTANT",
          firm: "All Firms (TTC + MTC + SMTC)",
          branch: "Rajsamand Accounts Office",
          status: "Active",
          createdAt: new Date().toISOString()
        }
      ];

      localStorage.setItem('tms_users', JSON.stringify(users));
      localStorage.setItem('tms_seeded_users', 'true');
    }
  }
}

// Global Singleton Instance
const dbService = new DBService();



