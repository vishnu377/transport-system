/**
 * Master Sample Dataset for Module 9: Shahpura (Cash Book & Fuel / Advance Hub)
 * Matches authentic records from Google AppSheet screenshot:
 * - Card 1: Available Cash (-₹ 2,13,100.00)
 * - Card 2: Given Transactions (Red dots & text, Outflow/Advance)
 * - Card 3: Deposit Transactions (Green dots & text, Inflow/Collection)
 * STRICT POLICY: ZERO business data is stored in browser localStorage.
 */

const SAMPLE_SHAHPURA_DATA = {
  // Opening balance or timestamp for Cash Chart
  cashState: {
    asOf: "30/10/2026, 09:32:00",
    displayDate: "30/10/2026, 09:32...",
    openingBalance: 0,
    totalDeposit: 148900,
    totalGiven: 362000,
    availableCash: -213100
  },

  // Given Transactions (Kharcha / Advance given from Shahpura) - Red color
  givenTransactions: [
    {
      id: "GIV-101",
      date: "30/10/2026",
      amount: 15000,
      truckNo: "RJ52GB5642",
      name: "Suresh Raiya 9636017337",
      phone: "9636017337",
      origin: "Rajsamand (Raj.)",
      destination: "Neemrana (Raj.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-30T09:32:00Z"
    },
    {
      id: "GIV-102",
      date: "30/10/2026",
      amount: 10000,
      truckNo: "RJ52GA8733",
      name: "Dhana Ram Saini 9166171579",
      phone: "9166171579",
      origin: "Rajsamand (Raj.)",
      destination: "Sandila (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-30T09:15:00Z"
    },
    {
      id: "GIV-103",
      date: "30/10/2026",
      amount: 20000,
      truckNo: "RJ52GB5061",
      name: "Bhagchand 0729 8955266993",
      phone: "8955266993",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-30T08:45:00Z"
    },
    {
      id: "GIV-104",
      date: "30/10/2026",
      amount: 20000,
      truckNo: "RJ52GB5528",
      name: "Sintu Prajapat Lamba Hari Sin...",
      phone: "9829145620",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-30T08:10:00Z"
    },
    {
      id: "GIV-105",
      date: "29/10/2026",
      amount: 4000,
      truckNo: "RJ52GB5529",
      name: "Sitaram 9772746478",
      phone: "9772746478",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-29T16:20:00Z"
    },
    {
      id: "GIV-106",
      date: "29/10/2026",
      amount: 20000,
      truckNo: "RJ52GB5641",
      name: "Mahaveer Choudhary 9588014...",
      phone: "9588014231",
      origin: "Rajsamand (Raj.)",
      destination: "Sonipat (Haryana)",
      description: "",
      type: "Given",
      createdAt: "2026-10-29T14:15:00Z"
    },
    {
      id: "GIV-107",
      date: "29/10/2026",
      amount: 20000,
      truckNo: "RJ52GA6366",
      name: "Rajesh Gurjar 7568964058",
      phone: "7568964058",
      origin: "Rajsamand (Raj.)",
      destination: "Lucknow (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-29T11:30:00Z"
    },
    {
      id: "GIV-108",
      date: "28/10/2026",
      amount: 15000,
      truckNo: "RJ52GB0721",
      name: "Bhagchand Gurjar 0721 911...",
      phone: "9116345678",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "Advance Kharcha",
      type: "Given",
      createdAt: "2026-10-28T15:10:00Z"
    },
    {
      id: "GIV-109",
      date: "28/10/2026",
      amount: 10000,
      truckNo: "RJ52GB5964",
      name: "Kushiram Gurjar 63774450...",
      phone: "6377445012",
      origin: "Chittorgarh (Raj.)",
      destination: "Sahibabad (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-28T10:40:00Z"
    },
    {
      id: "GIV-110",
      date: "27/10/2026",
      amount: 20000,
      truckNo: "RJ52GB5061",
      name: "Bhagchand 0729 8955266993",
      phone: "8955266993",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-27T17:00:00Z"
    },
    {
      id: "GIV-111",
      date: "27/10/2026",
      amount: 28000,
      truckNo: "RJ52GB5529",
      name: "Sitaram 9772746478",
      phone: "9772746478",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-27T12:30:00Z"
    },
    {
      id: "GIV-112",
      date: "26/10/2026",
      amount: 25000,
      truckNo: "RJ52GA8733",
      name: "Dhana Ram Saini 9166171579",
      phone: "9166171579",
      origin: "Rajsamand (Raj.)",
      destination: "Sandila (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-26T18:20:00Z"
    },
    {
      id: "GIV-113",
      date: "26/10/2026",
      amount: 30000,
      truckNo: "RJ52GB5642",
      name: "Suresh Raiya 9636017337",
      phone: "9636017337",
      origin: "Rajsamand (Raj.)",
      destination: "Neemrana (Raj.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-26T14:00:00Z"
    },
    {
      id: "GIV-114",
      date: "25/10/2026",
      amount: 20000,
      truckNo: "RJ52GA6366",
      name: "Rajesh Gurjar 7568964058",
      phone: "7568964058",
      origin: "Rajsamand (Raj.)",
      destination: "Lucknow (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-25T16:45:00Z"
    },
    {
      id: "GIV-115",
      date: "25/10/2026",
      amount: 15000,
      truckNo: "RJ52GB5528",
      name: "Sintu Prajapat Lamba Hari Sin...",
      phone: "9829145620",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-25T11:20:00Z"
    },
    {
      id: "GIV-116",
      date: "24/10/2026",
      amount: 40000,
      truckNo: "RJ52GB5641",
      name: "Mahaveer Choudhary 9588014...",
      phone: "9588014231",
      origin: "Rajsamand (Raj.)",
      destination: "Sonipat (Haryana)",
      description: "",
      type: "Given",
      createdAt: "2026-10-24T15:10:00Z"
    },
    {
      id: "GIV-117",
      date: "23/10/2026",
      amount: 50000,
      truckNo: "RJ52GB0721",
      name: "Bhagchand Gurjar 0721 911...",
      phone: "9116345678",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Given",
      createdAt: "2026-10-23T14:30:00Z"
    }
  ],

  // Deposit Transactions (Cash received / collected at Shahpura) - Green color
  depositTransactions: [
    {
      id: "DEP-201",
      date: "30/10/2026",
      amount: 1500,
      truckNo: "",
      name: "9414624845",
      phone: "9414624845",
      grNo: "",
      origin: "",
      destination: "",
      description: "Def Bukets Sales 20 Nos",
      type: "Deposit",
      createdAt: "2026-10-30T09:30:00Z"
    },
    {
      id: "DEP-202",
      date: "27/10/2026",
      amount: 30000,
      truckNo: "RJ52GB5964",
      name: "Kushiram Gurjar 63774450...",
      phone: "6377445012",
      grNo: "",
      origin: "Chittorgarh (Raj.)",
      destination: "Sahibabad (U.P.)",
      description: "",
      type: "Deposit",
      createdAt: "2026-10-27T15:40:00Z"
    },
    {
      id: "DEP-203",
      date: "26/10/2026",
      amount: 50000,
      truckNo: "RJ52GB0721",
      name: "Bhagchand Gurjar 0721 911...",
      phone: "9116345678",
      grNo: "",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Deposit",
      createdAt: "2026-10-26T16:15:00Z"
    },
    {
      id: "DEP-204",
      date: "24/10/2026",
      amount: 50000,
      truckNo: "RJ52GA6366",
      name: "Rajesh Gurjar 7568964058",
      phone: "7568964058",
      grNo: "",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Deposit",
      createdAt: "2026-10-24T18:00:00Z"
    },
    {
      id: "DEP-205",
      date: "24/10/2026",
      amount: 1500,
      truckNo: "",
      name: "9414312586",
      phone: "9414312586",
      grNo: "",
      origin: "",
      destination: "",
      description: "DEF Bukets Sales",
      type: "Deposit",
      createdAt: "2026-10-24T11:00:00Z"
    },
    {
      id: "DEP-206",
      date: "23/10/2026",
      amount: 15900,
      truckNo: "RJ52GB5529",
      name: "Sitaram 9772746478",
      phone: "9772746478",
      grNo: "",
      origin: "Rajsamand (Raj.)",
      destination: "Kanpur (U.P.)",
      description: "",
      type: "Deposit",
      createdAt: "2026-10-23T16:30:00Z"
    }
  ]
};

if (typeof window !== 'undefined') {
  window.SAMPLE_SHAHPURA_DATA = SAMPLE_SHAHPURA_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SAMPLE_SHAHPURA_DATA;
}
