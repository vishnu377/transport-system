/**
 * Global Configuration for MTC & TTC Logistics Management System
 */

const APP_CONFIG = {
  // App Details
  appName: "MTC & TTC Logistics System",
  appVersion: "1.0.0",
  headOffice: "Shahpura / Rajsamand, Rajasthan",
  
  // Operating Firms Configuration
  firms: {
    TTC: {
      code: "TTC",
      name: "TTC Transport Corporation",
      prefix: "TTC",
      badgeClass: "firm-ttc",
      active: true
    },
    MTC: {
      code: "MTC",
      name: "Mahaveer Transport Company",
      prefix: "MTC",
      badgeClass: "firm-mtc",
      active: true
    },
    SMTC: {
      code: "SMTC",
      name: "Shree Mahaveer Transport Co.",
      prefix: "SMTC",
      badgeClass: "firm-smtc",
      active: true
    }
  },

  // Live Firebase Cloud Configuration
  firebase: {
    apiKey: "AIzaSyBsCMRij9cg3Qm_VD7UXONQ9z80AuHLImE",
    authDomain: "mtc-ttc-logistics.firebaseapp.com",
    projectId: "mtc-ttc-logistics",
    storageBucket: "mtc-ttc-logistics.firebasestorage.app",
    messagingSenderId: "417540137716",
    appId: "1:417540137716:web:58046614cb7d29be5474a1",
    measurementId: "G-E0H4Q0TNVM"
  },

  // Payment Modes
  paymentModes: [
    "NEFT/RTGS",
    "Cash",
    "Cheque",
    "PhonePe/GPay/UPI",
    "Adjustment",
    "Less Freight"
  ],

  // User Roles for Staff Security
  userRoles: {
    SUPER_ADMIN: {
      id: "SUPER_ADMIN",
      name: "Mosa Ji (Super Admin)",
      canDelete: true,
      canViewPnl: true,
      canManageUsers: true
    },
    BRANCH_MUNSHI: {
      id: "BRANCH_MUNSHI",
      name: "Shahpura Munshi / Yard Operator",
      canDelete: false,
      canViewPnl: false,
      canManageUsers: false
    },
    ACCOUNTANT: {
      id: "ACCOUNTANT",
      name: "Accountant / Munim Ji",
      canDelete: false,
      canViewPnl: true,
      canManageUsers: false
    }
  }
};

// Freeze to prevent accidental modification
Object.freeze(APP_CONFIG.firms);
Object.freeze(APP_CONFIG.userRoles);

