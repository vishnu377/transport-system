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
    if (this.isFirebaseReady) {
      try {
        const snapshot = await this.db.collection(collectionName).get();
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn(`Firestore read failed for ${collectionName}, reading from LocalStorage:`, err.message);
      }
    }
    // LocalStorage Fallback
    const localData = localStorage.getItem(`tms_${collectionName}`);
    return localData ? JSON.parse(localData) : [];
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
    return items.find(item => String(item.id) === String(id)) || null;
  }

  async add(collectionName, itemData) {
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
          'payments', 'cheques', 'cashBook', 'defUrea'
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
  }
}

// Global Singleton Instance
const dbService = new DBService();

