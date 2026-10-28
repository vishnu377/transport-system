/**
 * js/sample-owner-dues-data.js
 * Authentic Owner Due Dataset (489 Trips) matching Google AppSheet Card 2
 */

(function(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SAMPLE_OWNER_DUES = factory();
    root.INITIAL_OWNER_DUES = root.SAMPLE_OWNER_DUES;
  }
})(typeof self !== "undefined" ? self : this, function() {
  return [
  {
    "id": "due-1",
    "grNo": "1900_TTC",
    "tripDate": "16/09/2024",
    "tripEndDate": "05/11/2024",
    "year": "2024-2025",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 3500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ42GA0451",
    "ownerName": "Abcd",
    "ownerMobile": "7898424750",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 35.0,
    "rate": 1450.0,
    "billingType": "Per Tonne",
    "biltyAmount": 3500.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620000",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6500B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620000"
    },
    "freight": 1125.0,
    "totalFreight": 4625.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Abcd",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2024-2025 Advance Commission",
        "grNo": "1900_TTC",
        "truckNo": "RJ42GA0451",
        "dueAmount": 3500.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Abcd",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "1900_TTC",
        "truckNo": "RJ42GA0451",
        "dueAmount": 3500.0
      }
    ]
  },
  {
    "id": "due-2",
    "grNo": "1901_TTC",
    "tripDate": "03/09/2024",
    "tripEndDate": "05/11/2024",
    "year": "2024-2025",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 1700.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GH7536",
    "ownerName": "Abcd",
    "ownerMobile": "6376737463",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 35.0,
    "rate": 1450.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1700.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620001",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6501B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620001"
    },
    "freight": 1700.0,
    "totalFreight": 1700.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Abcd",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2024-2025 Advance Commission",
        "grNo": "1901_TTC",
        "truckNo": "RJ14GH7536",
        "dueAmount": 1700.0
      }
    ]
  },
  {
    "id": "due-3",
    "grNo": "1902_TTC",
    "tripDate": "02/09/2024",
    "tripEndDate": "05/11/2024",
    "year": "2024-2025",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 2021.0,
    "paidAmount": 2021.0,
    "truckNo": "RJ01GD0711",
    "ownerName": "Amit Rajpurohit",
    "ownerMobile": "9828230022",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 35.0,
    "rate": 1450.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2021.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620002",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6502B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620002"
    },
    "freight": 2021.0,
    "totalFreight": 2021.0,
    "payments": [
      {
        "paymentDate": "02/09/2024",
        "amountPaid": 2021.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 1902_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Amit Rajpurohit",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2024-2025 Advance Commission",
        "grNo": "1902_TTC",
        "truckNo": "RJ01GD0711",
        "dueAmount": 2021.0
      }
    ]
  },
  {
    "id": "due-4",
    "grNo": "1903_TTC",
    "tripDate": "04/09/2024",
    "tripEndDate": "05/11/2024",
    "year": "2024-2025",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 2500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD0501",
    "ownerName": "Amit Rajpurohit",
    "ownerMobile": "9828230022",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 35.0,
    "rate": 1450.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2500.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620003",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6503B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620003"
    },
    "freight": 2500.0,
    "totalFreight": 2500.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-5",
    "grNo": "1904_TTC",
    "tripDate": "05/09/2024",
    "tripEndDate": "05/11/2024",
    "year": "2024-2025",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 1500.0,
    "paidAmount": 1500.0,
    "truckNo": "RJ01GC0501",
    "ownerName": "Amit Rajpurohit",
    "ownerMobile": "9828230022",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 35.0,
    "rate": 1450.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1500.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620004",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6504B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620004"
    },
    "freight": 1500.0,
    "totalFreight": 1500.0,
    "payments": [
      {
        "paymentDate": "05/09/2024",
        "amountPaid": 1500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 1904_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Amit Rajpurohit",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2024-2025 Advance Commission",
        "grNo": "1904_TTC",
        "truckNo": "RJ01GC0501",
        "dueAmount": 1500.0
      }
    ]
  },
  {
    "id": "due-6",
    "grNo": "1905_TTC",
    "tripDate": "06/09/2024",
    "tripEndDate": "05/11/2024",
    "year": "2024-2025",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 1000.0,
    "paidAmount": 1000.0,
    "truckNo": "RJ52GB0878",
    "ownerName": "Anil Gurjar",
    "ownerMobile": "7742204077",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 35.0,
    "rate": 1450.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1000.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620005",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6505B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620005"
    },
    "freight": 1000.0,
    "totalFreight": 1000.0,
    "payments": [
      {
        "paymentDate": "06/09/2024",
        "amountPaid": 1000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 1905_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Anil Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2024-2025 Advance Commission",
        "grNo": "1905_TTC",
        "truckNo": "RJ52GB0878",
        "dueAmount": 1000.0
      }
    ]
  },
  {
    "id": "due-7",
    "grNo": "2106_SMTC",
    "tripDate": "07/07/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ14GG0267",
    "ownerName": "Ashok Kasana Kotputli",
    "ownerMobile": "9351721272",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620006",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6506B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620006"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Ashok Kasana Kotputli",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2106_SMTC",
        "truckNo": "RJ14GG0267",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Ashok Kasana Kotputli",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2106_SMTC",
        "truckNo": "RJ14GG0267",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-8",
    "grNo": "2107_TTC",
    "tripDate": "08/08/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0320",
    "ownerName": "Babu Jat",
    "ownerMobile": "9950669687",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620007",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6507B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620007"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Babu Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2107_TTC",
        "truckNo": "RJ52GB0320",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-9",
    "grNo": "2108_TTC",
    "tripDate": "09/09/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ01GD0221",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620008",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6508B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620008"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "09/09/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2108_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2108_TTC",
        "truckNo": "RJ01GD0221",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-10",
    "grNo": "2109_TTC",
    "tripDate": "10/10/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD0321",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620009",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6509B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620009"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-11",
    "grNo": "2110_TTC",
    "tripDate": "11/11/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ01GC4211",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620010",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6510B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620010"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "11/11/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2110_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2110_TTC",
        "truckNo": "RJ01GC4211",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-12",
    "grNo": "2111_TTC",
    "tripDate": "12/12/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ01GD0621",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620011",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6511B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620011"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "12/12/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2111_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2111_TTC",
        "truckNo": "RJ01GD0621",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-13",
    "grNo": "2112_TTC",
    "tripDate": "13/01/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD0709",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620012",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6512B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620012"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2112_TTC",
        "truckNo": "RJ01GD0709",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2112_TTC",
        "truckNo": "RJ01GD0709",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-14",
    "grNo": "2113_SMTC",
    "tripDate": "14/02/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD1121",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620013",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6513B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620013"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2113_SMTC",
        "truckNo": "RJ01GD1121",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-15",
    "grNo": "2114_TTC",
    "tripDate": "15/03/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ01GD0707",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620014",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6514B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620014"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "15/03/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2114_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2114_TTC",
        "truckNo": "RJ01GD0707",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-16",
    "grNo": "2115_TTC",
    "tripDate": "16/04/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ47GB0421",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620015",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6515B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620015"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-17",
    "grNo": "2116_TTC",
    "tripDate": "17/05/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ47GB0621",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620016",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6516B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620016"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "17/05/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2116_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2116_TTC",
        "truckNo": "RJ47GB0621",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-18",
    "grNo": "2117_TTC",
    "tripDate": "18/06/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ01GC2411",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620017",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6517B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620017"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "18/06/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2117_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2117_TTC",
        "truckNo": "RJ01GC2411",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-19",
    "grNo": "2118_TTC",
    "tripDate": "19/07/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ47GB0321",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620018",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6518B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620018"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2118_TTC",
        "truckNo": "RJ47GB0321",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2118_TTC",
        "truckNo": "RJ47GB0321",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-20",
    "grNo": "2119_TTC",
    "tripDate": "20/08/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD1521",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620019",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6519B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620019"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2119_TTC",
        "truckNo": "RJ01GD1521",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-21",
    "grNo": "2120_TTC",
    "tripDate": "21/09/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ47GB0121",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620020",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6520B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620020"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "21/09/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2120_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2120_TTC",
        "truckNo": "RJ47GB0121",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-22",
    "grNo": "2121_TTC",
    "tripDate": "22/10/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ42GA3374",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620021",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6521B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620021"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-23",
    "grNo": "2122_TTC",
    "tripDate": "23/11/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ01GD0121",
    "ownerName": "Balveer Yadav",
    "ownerMobile": "9314000521",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620022",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6522B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620022"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "23/11/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2122_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Balveer Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2122_TTC",
        "truckNo": "RJ01GD0121",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-24",
    "grNo": "2123_TTC",
    "tripDate": "24/12/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GA7336",
    "ownerName": "Banwari Lal Dhabas",
    "ownerMobile": "9950890686",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620023",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6523B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620023"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "24/12/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2123_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Banwari Lal Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2123_TTC",
        "truckNo": "RJ52GA7336",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-25",
    "grNo": "2124_TTC",
    "tripDate": "25/01/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7872",
    "ownerName": "Banwari Lal Dhabas",
    "ownerMobile": "9950890686",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620024",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6524B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620024"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Banwari Lal Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2124_TTC",
        "truckNo": "RJ52GA7872",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Banwari Lal Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2124_TTC",
        "truckNo": "RJ52GA7872",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-26",
    "grNo": "2125_SMTC",
    "tripDate": "26/02/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7337",
    "ownerName": "Banwari Lal Dhabas",
    "ownerMobile": "9950890686",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620025",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6525B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620025"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Banwari Lal Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2125_SMTC",
        "truckNo": "RJ52GA7337",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-27",
    "grNo": "2126_TTC",
    "tripDate": "27/03/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GA9396",
    "ownerName": "Banwari Lal Dhabas",
    "ownerMobile": "9950890686",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620026",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6526B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620026"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "27/03/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2126_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Banwari Lal Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2126_TTC",
        "truckNo": "RJ52GA9396",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-28",
    "grNo": "2127_TTC",
    "tripDate": "28/04/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5497",
    "ownerName": "Baya Mistry",
    "ownerMobile": "9828212557",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620027",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6527B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620027"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-29",
    "grNo": "2128_TTC",
    "tripDate": "01/05/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GB0788",
    "ownerName": "Bhanwar Choudhary",
    "ownerMobile": "7240229577",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620028",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6528B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620028"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "01/05/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2128_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bhanwar Choudhary",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2128_TTC",
        "truckNo": "RJ52GB0788",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-30",
    "grNo": "2129_TTC",
    "tripDate": "02/06/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ09GE3056",
    "ownerName": "Bheru Singh Shekhawat",
    "ownerMobile": "8432161566",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620029",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6529B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620029"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "02/06/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2129_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bheru Singh Shekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2129_TTC",
        "truckNo": "RJ09GE3056",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-31",
    "grNo": "2130_TTC",
    "tripDate": "03/07/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC7697",
    "ownerName": "Billo Kasana",
    "ownerMobile": "8290545425",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620030",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6530B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620030"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Billo Kasana",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2130_TTC",
        "truckNo": "RJ32GC7697",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Billo Kasana",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2130_TTC",
        "truckNo": "RJ32GC7697",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-32",
    "grNo": "2131_TTC",
    "tripDate": "04/08/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ32GE0446",
    "ownerName": "Billo Kasana",
    "ownerMobile": "8290545425",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620031",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6531B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620031"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Billo Kasana",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2131_TTC",
        "truckNo": "RJ32GE0446",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-33",
    "grNo": "2132_TTC",
    "tripDate": "05/09/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GB5777",
    "ownerName": "Biloo Saharan",
    "ownerMobile": "8690796177",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620032",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6532B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620032"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "05/09/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2132_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Biloo Saharan",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2132_TTC",
        "truckNo": "RJ52GB5777",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-34",
    "grNo": "2133_TTC",
    "tripDate": "06/10/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB1578",
    "ownerName": "Buttha Gurjar Shiv Mandir",
    "ownerMobile": "9829926836",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620033",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6533B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620033"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-35",
    "grNo": "2134_SMTC",
    "tripDate": "07/11/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GA2391",
    "ownerName": "Buttha Gurjar Shiv Mandir",
    "ownerMobile": "9829926836",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620034",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6534B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620034"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "07/11/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2134_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Buttha Gurjar Shiv Mandir",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2134_SMTC",
        "truckNo": "RJ52GA2391",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-36",
    "grNo": "2135_TTC",
    "tripDate": "08/12/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ37GB0103",
    "ownerName": "Dara Motors",
    "ownerMobile": "9818232724",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620035",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6535B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620035"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "08/12/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2135_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Dara Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2135_TTC",
        "truckNo": "RJ37GB0103",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-37",
    "grNo": "2136_TTC",
    "tripDate": "09/01/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0986",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620036",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6536B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620036"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2136_TTC",
        "truckNo": "RJ52GB0986",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2136_TTC",
        "truckNo": "RJ52GB0986",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-38",
    "grNo": "2137_TTC",
    "tripDate": "10/02/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7719",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620037",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6537B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620037"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2137_TTC",
        "truckNo": "RJ52GA7719",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-39",
    "grNo": "2138_TTC",
    "tripDate": "11/03/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GA9432",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620038",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6538B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620038"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "11/03/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2138_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2138_TTC",
        "truckNo": "RJ52GA9432",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-40",
    "grNo": "2139_TTC",
    "tripDate": "12/04/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7295",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620039",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6539B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620039"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-41",
    "grNo": "2140_TTC",
    "tripDate": "13/05/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GB3572",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620040",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6540B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620040"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "13/05/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2140_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2140_TTC",
        "truckNo": "RJ52GB3572",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-42",
    "grNo": "2141_SMTC",
    "tripDate": "14/06/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GA7382",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620041",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6541B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620041"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "14/06/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2141_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2141_SMTC",
        "truckNo": "RJ52GA7382",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-43",
    "grNo": "2142_TTC",
    "tripDate": "15/07/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5336",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620042",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6542B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620042"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2142_TTC",
        "truckNo": "RJ52GB5336",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2142_TTC",
        "truckNo": "RJ52GB5336",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-44",
    "grNo": "2143_TTC",
    "tripDate": "16/08/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7536",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620043",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6543B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620043"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2143_TTC",
        "truckNo": "RJ52GA7536",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-45",
    "grNo": "2144_TTC",
    "tripDate": "17/09/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GB3486",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620044",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6544B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620044"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "17/09/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2144_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2144_TTC",
        "truckNo": "RJ52GB3486",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-46",
    "grNo": "2145_TTC",
    "tripDate": "18/10/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3484",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620045",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6545B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620045"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-47",
    "grNo": "2146_TTC",
    "tripDate": "19/11/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GB3485",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620046",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6546B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620046"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "19/11/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2146_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2146_TTC",
        "truckNo": "RJ52GB3485",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-48",
    "grNo": "2147_TTC",
    "tripDate": "20/12/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ52GA7908",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620047",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6547B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620047"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "20/12/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2147_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2147_TTC",
        "truckNo": "RJ52GA7908",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-49",
    "grNo": "2148_TTC",
    "tripDate": "21/01/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3483",
    "ownerName": "Deepak Dhabas",
    "ownerMobile": "9024959171",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620048",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6548B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620048"
    },
    "freight": 1125.0,
    "totalFreight": 37601.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2025-2026 Advance Commission",
        "grNo": "2148_TTC",
        "truckNo": "RJ52GB3483",
        "dueAmount": 36476.8
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2148_TTC",
        "truckNo": "RJ52GB3483",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-50",
    "grNo": "2149_TTC",
    "tripDate": "22/02/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 36476.8,
    "paidAmount": 0.0,
    "truckNo": "RJ14GL9911",
    "ownerName": "Deepak Sharma Agra",
    "ownerMobile": "9837365048",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620049",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6549B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620049"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deepak Sharma Agra",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2149_TTC",
        "truckNo": "RJ14GL9911",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-51",
    "grNo": "2150_TTC",
    "tripDate": "23/03/2025",
    "tripEndDate": "05/11/2025",
    "year": "2025-2026",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 36476.8,
    "paidAmount": 36476.8,
    "truckNo": "RJ42GB5679",
    "ownerName": "Dhanraj Yadav",
    "ownerMobile": "9829901495",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 55.0,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 36476.8,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620050",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6550B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620050"
    },
    "freight": 36476.8,
    "totalFreight": 36476.8,
    "payments": [
      {
        "paymentDate": "23/03/2025",
        "amountPaid": 36476.8,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2150_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Dhanraj Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2025-2026 Advance Commission",
        "grNo": "2150_TTC",
        "truckNo": "RJ42GB5679",
        "dueAmount": 36476.8
      }
    ]
  },
  {
    "id": "due-52",
    "grNo": "2601_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ23GB2911",
    "ownerName": "Dharampal Gurjar",
    "ownerMobile": "7689949332",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620051",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6551B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620051"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-53",
    "grNo": "2602_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GC0823",
    "ownerName": "Dholaram Lomod",
    "ownerMobile": "9783125135",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 53.812,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620052",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6552B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620052"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2602_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Dholaram Lomod",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2602_TTC",
        "truckNo": "RJ52GC0823",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-54",
    "grNo": "2603_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GB8823",
    "ownerName": "Dholuram Lomod Yrl",
    "ownerMobile": "9783125135",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 136.667,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620053",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6553B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620053"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "26/08/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2603_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Dholuram Lomod Yrl",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2603_SMTC",
        "truckNo": "RJ52GB8823",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-55",
    "grNo": "2604_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3125",
    "ownerName": "Dholuram Lomod Yrl",
    "ownerMobile": "9783125135",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620054",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6554B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620054"
    },
    "freight": 1125.0,
    "totalFreight": 167550.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Dholuram Lomod Yrl",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2604_TTC",
        "truckNo": "RJ52GB3125",
        "dueAmount": 166425.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Dholuram Lomod Yrl",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2604_TTC",
        "truckNo": "RJ52GB3125",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-56",
    "grNo": "2605_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GP9911",
    "ownerName": "Dilip Sharma",
    "ownerMobile": "9837365048",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 42.5,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620055",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6555B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620055"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Dilip Sharma",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2605_TTC",
        "truckNo": "RJ14GP9911",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-57",
    "grNo": "2606_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ01GE0121",
    "ownerName": "Dinesh Yadav Shrinagar",
    "ownerMobile": "8290570160",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620056",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6556B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620056"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2606_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Dinesh Yadav Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2606_TTC",
        "truckNo": "RJ01GE0121",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-58",
    "grNo": "2607_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD0421",
    "ownerName": "Dinesh Yadav",
    "ownerMobile": "8290570160",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620057",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6557B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620057"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-59",
    "grNo": "2608_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ14GH0588",
    "ownerName": "Ganpat Saini",
    "ownerMobile": "9772170064",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 109.305,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620058",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6558B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620058"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2608_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Ganpat Saini",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2608_TTC",
        "truckNo": "RJ14GH0588",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-60",
    "grNo": "2609_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ01GC8491",
    "ownerName": "Gaurav Yadav",
    "ownerMobile": "9521583721",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 84.114,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620059",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6559B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620059"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "04/07/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2609_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Gaurav Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2609_TTC",
        "truckNo": "RJ01GC8491",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-61",
    "grNo": "2610_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ29GA7478",
    "ownerName": "Gill Shindu Transport Company",
    "ownerMobile": "9829629560",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 119.475,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620060",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6560B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620060"
    },
    "freight": 1125.0,
    "totalFreight": 192285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Gill Shindu Transport Company",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2610_TTC",
        "truckNo": "RJ29GA7478",
        "dueAmount": 191160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Gill Shindu Transport Company",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2610_TTC",
        "truckNo": "RJ29GA7478",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-62",
    "grNo": "2611_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GB8445",
    "ownerName": "Girdhari Lal",
    "ownerMobile": "9660918449",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620061",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6561B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620061"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Girdhari Lal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2611_TTC",
        "truckNo": "RJ01GB8445",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-63",
    "grNo": "2612_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ01GC4259",
    "ownerName": "Girdhari Singh",
    "ownerMobile": "9928734562",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 128.571,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620062",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6562B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620062"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2612_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Girdhari Singh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2612_SMTC",
        "truckNo": "RJ01GC4259",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-64",
    "grNo": "2613_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GD6867",
    "ownerName": "Giriraj Dhabas",
    "ownerMobile": "8209284695",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620063",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6563B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620063"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-65",
    "grNo": "2614_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ32GD6467",
    "ownerName": "Giriraj Dhabas",
    "ownerMobile": "8209284695",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 93.103,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620064",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6564B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620064"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2614_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Giriraj Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2614_TTC",
        "truckNo": "RJ32GD6467",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-66",
    "grNo": "2615_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ14GR5403",
    "ownerName": "Goapllal Prajapat",
    "ownerMobile": "7891330487",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620065",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6565B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620065"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "10/06/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2615_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Goapllal Prajapat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2615_TTC",
        "truckNo": "RJ14GR5403",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-67",
    "grNo": "2616_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ42GA2997",
    "ownerName": "Gopal Dadarwal",
    "ownerMobile": "8905440546",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 112.235,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620066",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6566B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620066"
    },
    "freight": 1125.0,
    "totalFreight": 191925.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Gopal Dadarwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2616_TTC",
        "truckNo": "RJ42GA2997",
        "dueAmount": 190800.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Gopal Dadarwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2616_TTC",
        "truckNo": "RJ42GA2997",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-68",
    "grNo": "2617_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2274",
    "ownerName": "Govind Choudhary",
    "ownerMobile": "7823885757",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 84.219,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620067",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6567B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620067"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Govind Choudhary",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2617_TTC",
        "truckNo": "RJ52GB2274",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-69",
    "grNo": "2618_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GB0136",
    "ownerName": "Guljari Dhabas",
    "ownerMobile": "8432133636",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 87.756,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620068",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6568B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620068"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2618_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Guljari Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2618_TTC",
        "truckNo": "RJ52GB0136",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-70",
    "grNo": "2619_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA3941",
    "ownerName": "Guljari Dhabas",
    "ownerMobile": "8432133636",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 47.833,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620069",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6569B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620069"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-71",
    "grNo": "2620_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GA2941",
    "ownerName": "Guljari Dhabas",
    "ownerMobile": "8432133636",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 83.864,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620070",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6570B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620070"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2620_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Guljari Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2620_TTC",
        "truckNo": "RJ52GA2941",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-72",
    "grNo": "2621_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ14GP3675",
    "ownerName": "Hansraj Gurjar",
    "ownerMobile": "9928595103",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 95.1,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620071",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6571B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620071"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "16/05/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2621_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Hansraj Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2621_TTC",
        "truckNo": "RJ14GP3675",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-73",
    "grNo": "2622_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC2937",
    "ownerName": "Hansraj Gurjar Paota",
    "ownerMobile": "8003650905",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 42.5,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620072",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6572B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620072"
    },
    "freight": 1125.0,
    "totalFreight": 3775.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Hansraj Gurjar Paota",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2622_TTC",
        "truckNo": "RJ32GC2937",
        "dueAmount": 2650.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Hansraj Gurjar Paota",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2622_TTC",
        "truckNo": "RJ32GC2937",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-74",
    "grNo": "2623_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9769",
    "ownerName": "Hari Lomod",
    "ownerMobile": "9664059038",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 42.5,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620073",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6573B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620073"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Hari Lomod",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2623_TTC",
        "truckNo": "RJ52GA9769",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-75",
    "grNo": "2624_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ52GB3083",
    "ownerName": "Hari Palsaniya",
    "ownerMobile": "9784911947",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 67.036,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620074",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6574B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620074"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2624_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Hari Palsaniya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2624_TTC",
        "truckNo": "RJ52GB3083",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-76",
    "grNo": "2625_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ02GB4379",
    "ownerName": "Jafruddin Alwar",
    "ownerMobile": "9119344379",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620075",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6575B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620075"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-77",
    "grNo": "2626_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ27GD1233",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 89.212,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620076",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6576B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620076"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2626_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2626_TTC",
        "truckNo": "RJ27GD1233",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-78",
    "grNo": "2627_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ14GF7341",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 112.447,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620077",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6577B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620077"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "22/04/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2627_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2627_TTC",
        "truckNo": "RJ14GF7341",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-79",
    "grNo": "2628_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ30GB3888",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 67.58,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620078",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6578B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620078"
    },
    "freight": 1125.0,
    "totalFreight": 136285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2628_TTC",
        "truckNo": "RJ30GB3888",
        "dueAmount": 135160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2628_TTC",
        "truckNo": "RJ30GB3888",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-80",
    "grNo": "2629_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ30GA7311",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620079",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6579B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620079"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2629_TTC",
        "truckNo": "RJ30GA7311",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-81",
    "grNo": "2630_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ47GA2586",
    "ownerName": "Jagdish Dheru",
    "ownerMobile": "9001384636",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 72.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620080",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6580B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620080"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2630_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Dheru",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2630_TTC",
        "truckNo": "RJ47GA2586",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-82",
    "grNo": "2631_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2241",
    "ownerName": "Jagdish Kulhariya",
    "ownerMobile": "9414312586",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 106.896,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620081",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6581B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620081"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-83",
    "grNo": "2632_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ52GB3119",
    "ownerName": "Jagdish Kulhariya",
    "ownerMobile": "9414312586",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620082",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6582B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620082"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2632_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kulhariya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2632_TTC",
        "truckNo": "RJ52GB3119",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-84",
    "grNo": "2633_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ52GA4642",
    "ownerName": "Jagdish Kulhariya",
    "ownerMobile": "9414312586",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 109.029,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620083",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6583B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620083"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "28/10/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2633_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kulhariya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2633_TTC",
        "truckNo": "RJ52GA4642",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-85",
    "grNo": "2634_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5316",
    "ownerName": "Jagdish Kulhariya",
    "ownerMobile": "9414312586",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620084",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6584B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620084"
    },
    "freight": 1125.0,
    "totalFreight": 177985.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kulhariya",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2634_TTC",
        "truckNo": "RJ52GA5316",
        "dueAmount": 176860.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kulhariya",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2634_TTC",
        "truckNo": "RJ52GA5316",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-86",
    "grNo": "2635_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GP8397",
    "ownerName": "Jagdish Kulhariya",
    "ownerMobile": "9414312586",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620085",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6585B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620085"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kulhariya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2635_TTC",
        "truckNo": "RJ14GP8397",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-87",
    "grNo": "2636_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ14GK5851",
    "ownerName": "Jagdish Kumar",
    "ownerMobile": "9828269197",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 45.316,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620086",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6586B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620086"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2636_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kumar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2636_TTC",
        "truckNo": "RJ14GK5851",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-88",
    "grNo": "2637_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2242",
    "ownerName": "Jagdish Kumar",
    "ownerMobile": "9828269197",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 105.429,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620087",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6587B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620087"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-89",
    "grNo": "2638_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ14GQ3525",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 104.016,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620088",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6588B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620088"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2638_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2638_TTC",
        "truckNo": "RJ14GQ3525",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-90",
    "grNo": "2639_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ14GR3525",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620089",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6589B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620089"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "06/09/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2639_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2639_TTC",
        "truckNo": "RJ14GR3525",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-91",
    "grNo": "2640_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8996",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 42.5,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620090",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6590B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620090"
    },
    "freight": 1125.0,
    "totalFreight": 3075.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2640_SMTC",
        "truckNo": "RJ52GA8996",
        "dueAmount": 1950.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2640_SMTC",
        "truckNo": "RJ52GA8996",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-92",
    "grNo": "2641_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ26GA4945",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620091",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6591B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620091"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2641_TTC",
        "truckNo": "RJ26GA4945",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-93",
    "grNo": "2642_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GA7514",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 133.987,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620092",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6592B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620092"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2642_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2642_TTC",
        "truckNo": "RJ52GA7514",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-94",
    "grNo": "2643_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GB5897",
    "ownerName": "Jaisingh Gurjar",
    "ownerMobile": "9929066097",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620093",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6593B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620093"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-95",
    "grNo": "2644_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ32GD1097",
    "ownerName": "Jaisingh Gurjar",
    "ownerMobile": "9929066097",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 112.447,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620094",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6594B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620094"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2644_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jaisingh Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2644_TTC",
        "truckNo": "RJ32GD1097",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-96",
    "grNo": "2645_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ32GC0997",
    "ownerName": "Mahendra Gurjar",
    "ownerMobile": "7424840997",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 64.362,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620095",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6595B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620095"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "12/08/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2645_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Mahendra Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2645_TTC",
        "truckNo": "RJ32GC0997",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-97",
    "grNo": "2646_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC6797",
    "ownerName": "Jaisingh Gurjar",
    "ownerMobile": "9929066097",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 92.308,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620096",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6596B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620096"
    },
    "freight": 1125.0,
    "totalFreight": 181125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jaisingh Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2646_TTC",
        "truckNo": "RJ32GC6797",
        "dueAmount": 180000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jaisingh Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2646_TTC",
        "truckNo": "RJ32GC6797",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-98",
    "grNo": "2647_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GD6797",
    "ownerName": "Jaisingh Gurjar",
    "ownerMobile": "9929066097",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 64.444,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620097",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6597B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620097"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jaisingh Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2647_SMTC",
        "truckNo": "RJ32GD6797",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-99",
    "grNo": "2648_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ32GC9495",
    "ownerName": "Jaisingh Gurjar",
    "ownerMobile": "9929066097",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 65.595,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620098",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6598B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620098"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2648_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jaisingh Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2648_TTC",
        "truckNo": "RJ32GC9495",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-100",
    "grNo": "2649_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GB9495",
    "ownerName": "Jaisingh Gurjar",
    "ownerMobile": "9929066097",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 87.579,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620099",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6599B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620099"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-101",
    "grNo": "2650_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ14GL3251",
    "ownerName": "Jamshed Tundal",
    "ownerMobile": "7297919044",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 127.2,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620100",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6600B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620100"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2650_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jamshed Tundal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2650_TTC",
        "truckNo": "RJ14GL3251",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-102",
    "grNo": "2651_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GB2471",
    "ownerName": "Jind",
    "ownerMobile": "9950684877",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 98.256,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620101",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6601B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620101"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "18/07/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2651_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jind",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2651_TTC",
        "truckNo": "RJ52GB2471",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-103",
    "grNo": "2652_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7418",
    "ownerName": "Jitendra Barala",
    "ownerMobile": "7690870503",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 90.066,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620102",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6602B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620102"
    },
    "freight": 1125.0,
    "totalFreight": 172250.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jitendra Barala",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2652_TTC",
        "truckNo": "RJ52GA7418",
        "dueAmount": 171125.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jitendra Barala",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2652_TTC",
        "truckNo": "RJ52GA7418",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-104",
    "grNo": "2653_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC3219",
    "ownerName": "Jitendra Goyal",
    "ownerMobile": "9828280026",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620103",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6603B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620103"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jitendra Goyal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2653_TTC",
        "truckNo": "RJ32GC3219",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-105",
    "grNo": "2654_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ02GC2048",
    "ownerName": "Jitendra Goyal",
    "ownerMobile": "9828280026",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 111.818,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620104",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6604B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620104"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2654_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jitendra Goyal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2654_TTC",
        "truckNo": "RJ02GC2048",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-106",
    "grNo": "2655_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ02GC3031",
    "ownerName": "Jitendra Goyal",
    "ownerMobile": "9828280026",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 97.897,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620105",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6605B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620105"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-107",
    "grNo": "2656_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GA7296",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 42.5,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620106",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6606B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620106"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2656_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2656_TTC",
        "truckNo": "RJ52GA7296",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-108",
    "grNo": "2657_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GA7906",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620107",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6607B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620107"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "24/06/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2657_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2657_TTC",
        "truckNo": "RJ52GA7906",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-109",
    "grNo": "2658_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5136",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 79.606,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620108",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6608B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620108"
    },
    "freight": 1125.0,
    "totalFreight": 128494.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2658_TTC",
        "truckNo": "RJ52GA5136",
        "dueAmount": 127369.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2658_TTC",
        "truckNo": "RJ52GA5136",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-110",
    "grNo": "2659_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9434",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 153.837,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620109",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6609B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620109"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2659_SMTC",
        "truckNo": "RJ52GA9434",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-111",
    "grNo": "2660_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GA7720",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620110",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6610B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620110"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2660_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2660_TTC",
        "truckNo": "RJ52GA7720",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-112",
    "grNo": "2661_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9438",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 109.234,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620111",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6611B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620111"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-113",
    "grNo": "2662_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ52GA7294",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620112",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6612B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620112"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2662_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2662_TTC",
        "truckNo": "RJ52GA7294",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-114",
    "grNo": "2663_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GA7721",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620113",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6613B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620113"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "02/05/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2663_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2663_TTC",
        "truckNo": "RJ52GA7721",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-115",
    "grNo": "2664_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GD3412",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 61.053,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620114",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6614B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620114"
    },
    "freight": 1125.0,
    "totalFreight": 117125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2664_TTC",
        "truckNo": "RJ32GD3412",
        "dueAmount": 116000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2664_TTC",
        "truckNo": "RJ32GD3412",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-116",
    "grNo": "2665_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0586",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 82.462,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620115",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6615B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620115"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2665_TTC",
        "truckNo": "RJ52GB0586",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-117",
    "grNo": "2666_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ32GD3413",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 95.789,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620116",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6616B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620116"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2666_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2666_TTC",
        "truckNo": "RJ32GD3413",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-118",
    "grNo": "2667_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0236",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620117",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6617B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620117"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-119",
    "grNo": "2668_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GB4486",
    "ownerName": "Manish Lunayat",
    "ownerMobile": "9582582370",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 126.329,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620118",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6618B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620118"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2668_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Manish Lunayat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2668_SMTC",
        "truckNo": "RJ52GB4486",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-120",
    "grNo": "2669_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ14GR7227",
    "ownerName": "Kailash Rundla Munim",
    "ownerMobile": "9983466656",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620119",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6619B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620119"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "08/04/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2669_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Rundla Munim",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2669_TTC",
        "truckNo": "RJ14GR7227",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-121",
    "grNo": "2670_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GG5088",
    "ownerName": "Kajod Meena",
    "ownerMobile": "9829985088",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 55.548,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620120",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6620B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620120"
    },
    "freight": 1125.0,
    "totalFreight": 87225.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kajod Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2670_TTC",
        "truckNo": "RJ14GG5088",
        "dueAmount": 86100.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kajod Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2670_TTC",
        "truckNo": "RJ14GG5088",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-122",
    "grNo": "2671_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GH3288",
    "ownerName": "Kajod Meena",
    "ownerMobile": "9829985088",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620121",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6621B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620121"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kajod Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2671_TTC",
        "truckNo": "RJ14GH3288",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-123",
    "grNo": "2672_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ01GC8537",
    "ownerName": "Kalim Khan",
    "ownerMobile": "9057537817",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 97.897,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620122",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6622B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620122"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2672_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Kalim Khan",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2672_TTC",
        "truckNo": "RJ01GC8537",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-124",
    "grNo": "2673_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC0961",
    "ownerName": "Kalim Khan",
    "ownerMobile": "9057537817",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 42.5,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620123",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6623B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620123"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-125",
    "grNo": "2674_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GA3498",
    "ownerName": "Kallu Meena",
    "ownerMobile": "9079757926",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 42.5,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620124",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6624B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620124"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2674_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kallu Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2674_TTC",
        "truckNo": "RJ52GA3498",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-126",
    "grNo": "2675_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ14GG5750",
    "ownerName": "Kallu Meena",
    "ownerMobile": "9079757926",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 70.761,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620125",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6625B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620125"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "14/10/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2675_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kallu Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2675_SMTC",
        "truckNo": "RJ14GG5750",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-127",
    "grNo": "2676_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3735",
    "ownerName": "Kallu Meena",
    "ownerMobile": "9079757926",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 94.4,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620126",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6626B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620126"
    },
    "freight": 1125.0,
    "totalFreight": 208805.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kallu Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2676_TTC",
        "truckNo": "RJ52GB3735",
        "dueAmount": 207680.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kallu Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2676_TTC",
        "truckNo": "RJ52GB3735",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-128",
    "grNo": "2677_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2688",
    "ownerName": "Kalu Birjaniya",
    "ownerMobile": "9829635757",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 84.114,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620127",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6627B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620127"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kalu Birjaniya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2677_TTC",
        "truckNo": "RJ52GB2688",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-129",
    "grNo": "2678_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ01GC3507",
    "ownerName": "Kalu Ram Yadav Shrinagar",
    "ownerMobile": "7426957302",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 127.44,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620128",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6628B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620128"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2678_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Kalu Ram Yadav Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2678_TTC",
        "truckNo": "RJ01GC3507",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-130",
    "grNo": "2679_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC2191",
    "ownerName": "Kalu Ram Yadav Shrinagar",
    "ownerMobile": "7426957302",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 75.089,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620129",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6629B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620129"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-131",
    "grNo": "2680_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ30GA5058",
    "ownerName": "Kaluram Daroga",
    "ownerMobile": "9358688221",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 94.737,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620130",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6630B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620130"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2680_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kaluram Daroga",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2680_TTC",
        "truckNo": "RJ30GA5058",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-132",
    "grNo": "2681_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ09GC6777",
    "ownerName": "Kaluram Daroga 6777",
    "ownerMobile": "7728902435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620131",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6631B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620131"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "20/09/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2681_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kaluram Daroga 6777",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2681_TTC",
        "truckNo": "RJ09GC6777",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-133",
    "grNo": "2682_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ26GA4713",
    "ownerName": "Kalyan Meena",
    "ownerMobile": "9660912677",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 87.46,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620132",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6632B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620132"
    },
    "freight": 1125.0,
    "totalFreight": 145434.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kalyan Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2682_TTC",
        "truckNo": "RJ26GA4713",
        "dueAmount": 144309.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kalyan Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2682_TTC",
        "truckNo": "RJ26GA4713",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-134",
    "grNo": "2683_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD6036",
    "ownerName": "Kanhaiya Lal Vaishnav",
    "ownerMobile": "7733004236",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 90.155,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620133",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6633B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620133"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaiya Lal Vaishnav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2683_TTC",
        "truckNo": "RJ01GD6036",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-135",
    "grNo": "2684_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ01GD4236",
    "ownerName": "Hanuman Gurjar Shrinagar",
    "ownerMobile": "9602957084",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 95.4,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620134",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6634B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620134"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2684_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Hanuman Gurjar Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2684_TTC",
        "truckNo": "RJ01GD4236",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-136",
    "grNo": "2685_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GC4136",
    "ownerName": "Kanhaiya Lal Vaishnav",
    "ownerMobile": "7733004236",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620135",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6635B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620135"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-137",
    "grNo": "2686_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ01GC6036",
    "ownerName": "Kanhaiya Lal Vaishnav",
    "ownerMobile": "7733004236",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 106.953,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620136",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6636B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620136"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2686_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaiya Lal Vaishnav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2686_TTC",
        "truckNo": "RJ01GC6036",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-138",
    "grNo": "2687_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ01GC3456",
    "ownerName": "Kanhaiya Lal Vaishnav",
    "ownerMobile": "7733004236",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 63.778,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620137",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6637B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620137"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "26/08/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2687_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaiya Lal Vaishnav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2687_SMTC",
        "truckNo": "RJ01GC3456",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-139",
    "grNo": "2688_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC2036",
    "ownerName": "Kanhaiya Lal Vaishnav",
    "ownerMobile": "7733004236",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620138",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6638B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620138"
    },
    "freight": 1125.0,
    "totalFreight": 185625.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaiya Lal Vaishnav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2688_TTC",
        "truckNo": "RJ01GC2036",
        "dueAmount": 184500.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaiya Lal Vaishnav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2688_TTC",
        "truckNo": "RJ01GC2036",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-140",
    "grNo": "2689_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC4136",
    "ownerName": "Kanhaiya Lal Vaishnav",
    "ownerMobile": "7733004236",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 95.1,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620139",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6639B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620139"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaiya Lal Vaishnav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2689_TTC",
        "truckNo": "RJ01GC4136",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-141",
    "grNo": "2690_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ01GD0521",
    "ownerName": "(Ishan Rawat Gc0521",
    "ownerMobile": "8107529554",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620140",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6640B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620140"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2690_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "(Ishan Rawat Gc0521",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2690_TTC",
        "truckNo": "RJ01GD0521",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-142",
    "grNo": "2691_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GE3567",
    "ownerName": "Kuldeep Yadav",
    "ownerMobile": "9116773567",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620141",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6641B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620141"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-143",
    "grNo": "2692_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ01GD3567",
    "ownerName": "Kuldeep Yadav",
    "ownerMobile": "9116773567",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 67.036,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620142",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6642B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620142"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2692_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kuldeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2692_TTC",
        "truckNo": "RJ01GD3567",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-144",
    "grNo": "2693_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ01GC6708",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 118.674,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620143",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6643B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620143"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "04/07/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2693_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2693_TTC",
        "truckNo": "RJ01GC6708",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-145",
    "grNo": "2694_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC8286",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 92.0,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620144",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6644B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620144"
    },
    "freight": 1125.0,
    "totalFreight": 148325.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2694_TTC",
        "truckNo": "RJ01GC8286",
        "dueAmount": 147200.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2694_TTC",
        "truckNo": "RJ01GC8286",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-146",
    "grNo": "2695_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "NL01AF9064",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620145",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6645B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620145"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2695_TTC",
        "truckNo": "NL01AF9064",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-147",
    "grNo": "2696_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ01GC6195",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 96.543,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620146",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6646B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620146"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2696_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2696_SMTC",
        "truckNo": "RJ01GC6195",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-148",
    "grNo": "2697_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD0797",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620147",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6647B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620147"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-149",
    "grNo": "2698_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ01GD6195",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 74.839,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620148",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6648B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620148"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2698_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2698_TTC",
        "truckNo": "RJ01GD6195",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-150",
    "grNo": "2699_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "NL01AF5542",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620149",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6649B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620149"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "10/06/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2699_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2699_TTC",
        "truckNo": "NL01AF5542",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-151",
    "grNo": "2700_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD3707",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 90.155,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620150",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6650B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620150"
    },
    "freight": 1125.0,
    "totalFreight": 154388.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2700_TTC",
        "truckNo": "RJ01GD3707",
        "dueAmount": 153263.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2700_TTC",
        "truckNo": "RJ01GD3707",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-152",
    "grNo": "2701_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD6708",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 90.857,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620151",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6651B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620151"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2701_TTC",
        "truckNo": "RJ01GD6708",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-153",
    "grNo": "2702_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ01GD4327",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 90.697,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620152",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6652B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620152"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2702_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2702_TTC",
        "truckNo": "RJ01GD4327",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-154",
    "grNo": "2703_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GE6195",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 95.069,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620153",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6653B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620153"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-155",
    "grNo": "2704_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ01GE6708",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 39.136,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620154",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6654B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620154"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2704_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2704_TTC",
        "truckNo": "RJ01GE6708",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-156",
    "grNo": "2705_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ01GD8286",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 105.429,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620155",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6655B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620155"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "16/05/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2705_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2705_TTC",
        "truckNo": "RJ01GD8286",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-157",
    "grNo": "2706_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD3269",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 110.95,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620156",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6656B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620156"
    },
    "freight": 1125.0,
    "totalFreight": 167550.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2706_TTC",
        "truckNo": "RJ01GD3269",
        "dueAmount": 166425.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Lalaram Choudhary Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2706_TTC",
        "truckNo": "RJ01GD3269",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-158",
    "grNo": "2707_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GE5297",
    "ownerName": "Laxman Khoji",
    "ownerMobile": "9929861457",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 42.5,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620157",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6657B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620157"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxman Khoji",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2707_TTC",
        "truckNo": "RJ14GE5297",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-159",
    "grNo": "2708_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GA7338",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 42.5,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620158",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6658B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620158"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2708_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2708_TTC",
        "truckNo": "RJ52GA7338",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-160",
    "grNo": "2709_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8734",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620159",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6659B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620159"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-161",
    "grNo": "2710_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GA8616",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 125.867,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620160",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6660B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620160"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2710_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2710_TTC",
        "truckNo": "RJ52GA8616",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-162",
    "grNo": "2711_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GA6602",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 86.588,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620161",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6661B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620161"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "22/04/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2711_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2711_TTC",
        "truckNo": "RJ52GA6602",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-163",
    "grNo": "2712_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2507",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 95.58,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620162",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6662B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620162"
    },
    "freight": 1125.0,
    "totalFreight": 192285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2712_TTC",
        "truckNo": "RJ52GB2507",
        "dueAmount": 191160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2712_TTC",
        "truckNo": "RJ52GB2507",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-164",
    "grNo": "2713_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6603",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620163",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6663B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620163"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2713_TTC",
        "truckNo": "RJ52GA6603",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-165",
    "grNo": "2714_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GB2503",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 112.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620164",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6664B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620164"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2714_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2714_TTC",
        "truckNo": "RJ52GB2503",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-166",
    "grNo": "2715_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2508",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 85.926,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620165",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6665B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620165"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-167",
    "grNo": "2716_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ52GA7728",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620166",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6666B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620166"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2716_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2716_TTC",
        "truckNo": "RJ52GA7728",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-168",
    "grNo": "2717_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ52GA9428",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 87.579,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620167",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6667B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620167"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "28/10/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2717_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2717_TTC",
        "truckNo": "RJ52GA9428",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-169",
    "grNo": "2718_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7333",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620168",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6668B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620168"
    },
    "freight": 1125.0,
    "totalFreight": 191925.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2718_TTC",
        "truckNo": "RJ52GA7333",
        "dueAmount": 190800.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2718_TTC",
        "truckNo": "RJ52GA7333",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-170",
    "grNo": "2719_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8615",
    "ownerName": "Sitaram Meena",
    "ownerMobile": "9413571154",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620169",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6669B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620169"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2719_TTC",
        "truckNo": "RJ52GA8615",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-171",
    "grNo": "2720_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GA9489",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 90.066,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620170",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6670B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620170"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2720_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2720_TTC",
        "truckNo": "RJ52GA9489",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-172",
    "grNo": "2721_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6551",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 49.2,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620171",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6671B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620171"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-173",
    "grNo": "2722_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GA7310",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 115.312,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620172",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6672B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620172"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2722_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2722_TTC",
        "truckNo": "RJ52GA7310",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-174",
    "grNo": "2723_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ52GA5578",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620173",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6673B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620173"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "06/09/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2723_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2723_TTC",
        "truckNo": "RJ52GA5578",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-175",
    "grNo": "2724_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GD3696",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 42.5,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620174",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6674B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620174"
    },
    "freight": 1125.0,
    "totalFreight": 3775.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2724_SMTC",
        "truckNo": "RJ32GD3696",
        "dueAmount": 2650.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2724_SMTC",
        "truckNo": "RJ32GD3696",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-176",
    "grNo": "2725_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GH0366",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620175",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6675B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620175"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2725_TTC",
        "truckNo": "RJ14GH0366",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-177",
    "grNo": "2726_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ52GA6598",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 82.174,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620176",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6676B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620176"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2726_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2726_TTC",
        "truckNo": "RJ52GA6598",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-178",
    "grNo": "2727_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7309",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620177",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6677B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620177"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-179",
    "grNo": "2728_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GA7726",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 86.588,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620178",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6678B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620178"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2728_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2728_TTC",
        "truckNo": "RJ52GA7726",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-180",
    "grNo": "2729_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GA8733",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 91.029,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620179",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6679B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620179"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "12/08/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2729_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2729_TTC",
        "truckNo": "RJ52GA8733",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-181",
    "grNo": "2730_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0724",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 69.313,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620180",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6680B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620180"
    },
    "freight": 1125.0,
    "totalFreight": 136285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2730_TTC",
        "truckNo": "RJ52GB0724",
        "dueAmount": 135160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2730_TTC",
        "truckNo": "RJ52GB0724",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-182",
    "grNo": "2731_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2510",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 100.0,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620181",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6681B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620181"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2731_SMTC",
        "truckNo": "RJ52GB2510",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-183",
    "grNo": "2732_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ52GB0729",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 52.727,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620182",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6682B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620182"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2732_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2732_TTC",
        "truckNo": "RJ52GB0729",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-184",
    "grNo": "2733_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7335",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 82.462,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620183",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6683B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620183"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-185",
    "grNo": "2734_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ52GA8614",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 102.175,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620184",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6684B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620184"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2734_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2734_TTC",
        "truckNo": "RJ52GA8614",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-186",
    "grNo": "2735_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ52GB0721",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 106.0,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620185",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6685B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620185"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "18/07/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2735_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2735_TTC",
        "truckNo": "RJ52GB0721",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-187",
    "grNo": "2736_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7729",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 93.084,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620186",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6686B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620186"
    },
    "freight": 1125.0,
    "totalFreight": 177985.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2736_TTC",
        "truckNo": "RJ52GA7729",
        "dueAmount": 176860.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2736_TTC",
        "truckNo": "RJ52GA7729",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-188",
    "grNo": "2737_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2509",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620187",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6687B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620187"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2737_TTC",
        "truckNo": "RJ52GB2509",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-189",
    "grNo": "2738_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ14GE6672",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 52.182,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620188",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6688B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620188"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2738_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2738_TTC",
        "truckNo": "RJ14GE6672",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-190",
    "grNo": "2739_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7730",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 108.529,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620189",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6689B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620189"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-191",
    "grNo": "2740_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ52GA5419",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 83.213,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620190",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6690B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620190"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2740_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2740_TTC",
        "truckNo": "RJ52GA5419",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-192",
    "grNo": "2741_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GB0678",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620191",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6691B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620191"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "24/06/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2741_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2741_TTC",
        "truckNo": "RJ52GB0678",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-193",
    "grNo": "2742_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0876",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 42.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620192",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6692B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620192"
    },
    "freight": 1125.0,
    "totalFreight": 3075.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2742_TTC",
        "truckNo": "RJ52GB0876",
        "dueAmount": 1950.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2742_TTC",
        "truckNo": "RJ52GB0876",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-194",
    "grNo": "2743_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3867",
    "ownerName": "Laxmi Prakash Jat",
    "ownerMobile": "9571272336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 94.347,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620193",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6693B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620193"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Laxmi Prakash Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2743_SMTC",
        "truckNo": "RJ52GB3867",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-195",
    "grNo": "2744_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ37GC7310",
    "ownerName": "Likhmaram",
    "ownerMobile": "9462966076",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620194",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6694B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620194"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2744_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Likhmaram",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2744_TTC",
        "truckNo": "RJ37GC7310",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-196",
    "grNo": "2745_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC2159",
    "ownerName": "Mahendra Rawat Shrinagar",
    "ownerMobile": "8502873309",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 84.114,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620195",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6695B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620195"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-197",
    "grNo": "2746_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GA4444",
    "ownerName": "Mahendra Saini",
    "ownerMobile": "9351733232",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620196",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6696B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620196"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2746_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Mahendra Saini",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2746_TTC",
        "truckNo": "RJ52GA4444",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-198",
    "grNo": "2747_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ52GA4496",
    "ownerName": "Mahveer Gurjar",
    "ownerMobile": "9950631616",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620197",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6697B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620197"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "02/05/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2747_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Mahveer Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2747_TTC",
        "truckNo": "RJ52GA4496",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-199",
    "grNo": "2748_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB6139",
    "ownerName": "Manoj Swami",
    "ownerMobile": "8502821552",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 94.737,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620198",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6698B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620198"
    },
    "freight": 1125.0,
    "totalFreight": 181125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Manoj Swami",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2748_TTC",
        "truckNo": "RJ52GB6139",
        "dueAmount": 180000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Manoj Swami",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2748_TTC",
        "truckNo": "RJ52GB6139",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-200",
    "grNo": "2749_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB7717",
    "ownerName": "Mohanlal Palsaniya",
    "ownerMobile": "9636549394",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 66.286,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620199",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6699B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620199"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Mohanlal Palsaniya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2749_TTC",
        "truckNo": "RJ52GB7717",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-201",
    "grNo": "2750_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ52GA7717",
    "ownerName": "Mohanlal Palsaniya",
    "ownerMobile": "9636549394",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 90.193,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620200",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6700B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620200"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2750_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Mohanlal Palsaniya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2750_TTC",
        "truckNo": "RJ52GA7717",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-202",
    "grNo": "2751_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA2869",
    "ownerName": "Mukesh Chandra Gurjar",
    "ownerMobile": "9664210992",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620201",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6701B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620201"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-203",
    "grNo": "2752_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ30GB1188",
    "ownerName": "Mukesh Gurjar 1188",
    "ownerMobile": "9079319382",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 136.286,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620202",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6702B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620202"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2752_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Mukesh Gurjar 1188",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2752_SMTC",
        "truckNo": "RJ30GB1188",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-204",
    "grNo": "2753_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GA6148",
    "ownerName": "Mukesh Gurjar 6148",
    "ownerMobile": "9414421637",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620203",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6703B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620203"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "08/04/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2753_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Mukesh Gurjar 6148",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2753_TTC",
        "truckNo": "RJ52GA6148",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-205",
    "grNo": "2754_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3396",
    "ownerName": "Mukesh Kumar Gurjar 3396",
    "ownerMobile": "9664210892",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 110.403,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620204",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6704B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620204"
    },
    "freight": 1125.0,
    "totalFreight": 172250.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Mukesh Kumar Gurjar 3396",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2754_TTC",
        "truckNo": "RJ52GB3396",
        "dueAmount": 171125.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Mukesh Kumar Gurjar 3396",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2754_TTC",
        "truckNo": "RJ52GB3396",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-206",
    "grNo": "2755_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ05GA6115",
    "ownerName": "0M Bhat",
    "ownerMobile": "7055098685",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620205",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6705B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620205"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "0M Bhat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2755_TTC",
        "truckNo": "RJ05GA6115",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-207",
    "grNo": "2756_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GB3272",
    "ownerName": "Omprakash Gurjar",
    "ownerMobile": "9166223638",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 108.529,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620206",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6706B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620206"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2756_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Omprakash Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2756_TTC",
        "truckNo": "RJ52GB3272",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-208",
    "grNo": "2757_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GB5207",
    "ownerName": "Omprakash Gurjar",
    "ownerMobile": "9166223638",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 79.25,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620207",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6707B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620207"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-209",
    "grNo": "2758_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ47GA2817",
    "ownerName": "Omprakash Gurjar 9166223638",
    "ownerMobile": "9166223638",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 42.5,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620208",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6708B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620208"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2758_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Omprakash Gurjar 9166223638",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2758_TTC",
        "truckNo": "RJ47GA2817",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-210",
    "grNo": "2759_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GB4258",
    "ownerName": "Owner 4258",
    "ownerMobile": "9785973693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 42.5,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620209",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6709B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620209"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "14/10/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2759_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Owner 4258",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2759_SMTC",
        "truckNo": "RJ52GB4258",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-211",
    "grNo": "2760_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB1837",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 57.895,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620210",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6710B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620210"
    },
    "freight": 1125.0,
    "totalFreight": 128494.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2760_TTC",
        "truckNo": "RJ52GB1837",
        "dueAmount": 127369.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2760_TTC",
        "truckNo": "RJ52GB1837",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-212",
    "grNo": "2761_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5137",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 118.674,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620211",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6711B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620211"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2761_TTC",
        "truckNo": "RJ52GA5137",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-213",
    "grNo": "2762_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GB9237",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 98.133,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620212",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6712B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620212"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2762_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2762_TTC",
        "truckNo": "RJ52GB9237",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-214",
    "grNo": "2763_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA3237",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 106.2,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620213",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6713B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620213"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-215",
    "grNo": "2764_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ52GB4737",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 71.137,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620214",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6714B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620214"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2764_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2764_TTC",
        "truckNo": "RJ52GB4737",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-216",
    "grNo": "2765_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GA7237",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620215",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6715B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620215"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "20/09/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2765_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2765_TTC",
        "truckNo": "RJ52GA7237",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-217",
    "grNo": "2766_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA1770",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 70.303,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620216",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6716B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620216"
    },
    "freight": 1125.0,
    "totalFreight": 117125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2766_TTC",
        "truckNo": "RJ52GA1770",
        "dueAmount": 116000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2766_TTC",
        "truckNo": "RJ52GA1770",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-218",
    "grNo": "2767_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA3737",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 84.888,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620217",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6717B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620217"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2767_TTC",
        "truckNo": "RJ52GA3737",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-219",
    "grNo": "2768_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ14GF0937",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 76.632,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620218",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6718B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620218"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2768_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2768_TTC",
        "truckNo": "RJ14GF0937",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-220",
    "grNo": "2769_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5037",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620219",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6719B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620219"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-221",
    "grNo": "2770_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ14GD5593",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 110.537,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620220",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6720B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620220"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2770_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2770_TTC",
        "truckNo": "RJ14GD5593",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-222",
    "grNo": "2771_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GB0537",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 126.759,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620221",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6721B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620221"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "26/08/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2771_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2771_SMTC",
        "truckNo": "RJ52GB0537",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-223",
    "grNo": "2772_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA1837",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620222",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6722B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620222"
    },
    "freight": 1125.0,
    "totalFreight": 87225.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2772_TTC",
        "truckNo": "RJ52GA1837",
        "dueAmount": 86100.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2772_TTC",
        "truckNo": "RJ52GA1837",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-224",
    "grNo": "2773_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA4737",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 105.429,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620223",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6723B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620223"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2773_TTC",
        "truckNo": "RJ52GA4737",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-225",
    "grNo": "2774_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ52GA6337",
    "ownerName": "Prakash Chawadi Jawanpura",
    "ownerMobile": "9950900337",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620224",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6724B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620224"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2774_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Prakash Chawadi Jawanpura",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2774_TTC",
        "truckNo": "RJ52GA6337",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-226",
    "grNo": "2775_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GB6452",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620225",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6725B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620225"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-227",
    "grNo": "2776_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ14GH0937",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 42.5,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620226",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6726B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620226"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2776_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2776_TTC",
        "truckNo": "RJ14GH0937",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-228",
    "grNo": "2777_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ14GF8137",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 72.782,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620227",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6727B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620227"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "04/07/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2777_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2777_TTC",
        "truckNo": "RJ14GF8137",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-229",
    "grNo": "2778_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7037",
    "ownerName": "Heera Lal Saradhana",
    "ownerMobile": "7339743137",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 129.8,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620228",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6728B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620228"
    },
    "freight": 1125.0,
    "totalFreight": 208805.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Heera Lal Saradhana",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2778_TTC",
        "truckNo": "RJ52GA7037",
        "dueAmount": 207680.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Heera Lal Saradhana",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2778_TTC",
        "truckNo": "RJ52GA7037",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-230",
    "grNo": "2779_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5922",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620229",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6729B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620229"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2779_TTC",
        "truckNo": "RJ52GA5922",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-231",
    "grNo": "2780_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GA3837",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 136.543,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620230",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6730B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620230"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2780_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2780_SMTC",
        "truckNo": "RJ52GA3837",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-232",
    "grNo": "2781_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2637",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620231",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6731B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620231"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-233",
    "grNo": "2782_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GA6037",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 116.129,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620232",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6732B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620232"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2782_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2782_TTC",
        "truckNo": "RJ52GA6037",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-234",
    "grNo": "2783_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ52GB5037",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620233",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6733B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620233"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "10/06/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2783_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2783_TTC",
        "truckNo": "RJ52GB5037",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-235",
    "grNo": "2784_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6537",
    "ownerName": "Mukesh Gurjar 6537",
    "ownerMobile": "8290405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 84.888,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620234",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6734B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620234"
    },
    "freight": 1125.0,
    "totalFreight": 145434.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Mukesh Gurjar 6537",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2784_TTC",
        "truckNo": "RJ52GA6537",
        "dueAmount": 144309.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Mukesh Gurjar 6537",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2784_TTC",
        "truckNo": "RJ52GA6537",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-236",
    "grNo": "2785_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6536",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 72.982,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620235",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6735B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620235"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2785_TTC",
        "truckNo": "RJ52GA6536",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-237",
    "grNo": "2786_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ14GE2637",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 97.846,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620236",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6736B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620236"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2786_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2786_TTC",
        "truckNo": "RJ14GE2637",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-238",
    "grNo": "2787_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA0837",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 98.256,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620237",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6737B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620237"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-239",
    "grNo": "2788_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GA3437",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 77.784,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620238",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6738B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620238"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2788_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2788_TTC",
        "truckNo": "RJ52GA3437",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-240",
    "grNo": "2789_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ14GH0837",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 49.2,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620239",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6739B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620239"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "16/05/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2789_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2789_TTC",
        "truckNo": "RJ14GH0837",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-241",
    "grNo": "2790_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3737",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 123.0,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620240",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6740B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620240"
    },
    "freight": 1125.0,
    "totalFreight": 185625.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2790_TTC",
        "truckNo": "RJ52GB3737",
        "dueAmount": 184500.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2790_TTC",
        "truckNo": "RJ52GB3737",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-242",
    "grNo": "2791_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA4594",
    "ownerName": "Kailash Chawari",
    "ownerMobile": "9950239118",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 92.458,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620241",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6741B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620241"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Chawari",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2791_TTC",
        "truckNo": "RJ52GA4594",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-243",
    "grNo": "2792_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GC9237",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 42.5,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620242",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6742B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620242"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2792_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2792_TTC",
        "truckNo": "RJ52GC9237",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-244",
    "grNo": "2793_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8577",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620243",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6743B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620243"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-245",
    "grNo": "2794_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ52GC4737",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 77.193,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620244",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6744B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620244"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2794_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2794_TTC",
        "truckNo": "RJ52GC4737",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-246",
    "grNo": "2795_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GD0137",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 122.165,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620245",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6745B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620245"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "22/04/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2795_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2795_TTC",
        "truckNo": "RJ52GD0137",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-247",
    "grNo": "2796_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GD4737",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 73.6,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620246",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6746B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620246"
    },
    "freight": 1125.0,
    "totalFreight": 148325.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2796_TTC",
        "truckNo": "RJ52GD4737",
        "dueAmount": 147200.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2796_TTC",
        "truckNo": "RJ52GD4737",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-248",
    "grNo": "2797_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC5742",
    "ownerName": "Pappu Gurjar Bhilwara",
    "ownerMobile": "9001058573",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620247",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6747B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620247"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pappu Gurjar Bhilwara",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2797_TTC",
        "truckNo": "RJ32GC5742",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-249",
    "grNo": "2798_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ51GA5442",
    "ownerName": "Pappu Gurjar Bhilwara",
    "ownerMobile": "9001058573",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 84.475,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620248",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6748B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620248"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2798_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Pappu Gurjar Bhilwara",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2798_TTC",
        "truckNo": "RJ51GA5442",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-250",
    "grNo": "2799_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ51GA5742",
    "ownerName": "Pappu Gurjar Bhilwara",
    "ownerMobile": "9001058573",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 133.333,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620249",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6749B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620249"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-251",
    "grNo": "2800_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ51GB5442",
    "ownerName": "Pappu Gurjar Bhilwara",
    "ownerMobile": "9001058573",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620250",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6750B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620250"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2800_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pappu Gurjar Bhilwara",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2800_TTC",
        "truckNo": "RJ51GB5442",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-252",
    "grNo": "2801_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ32GB5354",
    "ownerName": "Pitram Gurjar Kotputli",
    "ownerMobile": "9001483520",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 82.462,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620251",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6751B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620251"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "28/10/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2801_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pitram Gurjar Kotputli",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2801_TTC",
        "truckNo": "RJ32GB5354",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-253",
    "grNo": "2802_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ47GA3936",
    "ownerName": "Prabhu Singh",
    "ownerMobile": "9950109336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620252",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6752B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620252"
    },
    "freight": 1125.0,
    "totalFreight": 154388.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Prabhu Singh",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2802_TTC",
        "truckNo": "RJ47GA3936",
        "dueAmount": 153263.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Prabhu Singh",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2802_TTC",
        "truckNo": "RJ47GA3936",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-254",
    "grNo": "2803_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9336",
    "ownerName": "Prabhu Singh",
    "ownerMobile": "9950109336",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620253",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6753B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620253"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prabhu Singh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2803_TTC",
        "truckNo": "RJ52GA9336",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-255",
    "grNo": "2804_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ02GC3671",
    "ownerName": "Pradeep Banna",
    "ownerMobile": "9602938888",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 93.084,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620254",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6754B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620254"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2804_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Banna",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2804_TTC",
        "truckNo": "RJ02GC3671",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-256",
    "grNo": "2805_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ02GC8677",
    "ownerName": "Pradeep Banna",
    "ownerMobile": "9602938888",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 97.786,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620255",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6755B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620255"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-257",
    "grNo": "2806_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ32GB4821",
    "ownerName": "Pradeep Kumar Gurjar",
    "ownerMobile": "8107914927",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 53.812,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620256",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6756B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620256"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2806_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Kumar Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2806_TTC",
        "truckNo": "RJ32GB4821",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-258",
    "grNo": "2807_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ01GD4269",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620257",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6757B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620257"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "06/09/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2807_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2807_TTC",
        "truckNo": "RJ01GD4269",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-259",
    "grNo": "2808_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD2469",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 118.875,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620258",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6758B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620258"
    },
    "freight": 1125.0,
    "totalFreight": 167550.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2808_SMTC",
        "truckNo": "RJ01GD2469",
        "dueAmount": 166425.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2808_SMTC",
        "truckNo": "RJ01GD2469",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-260",
    "grNo": "2809_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC4569",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620259",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6759B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620259"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2809_TTC",
        "truckNo": "RJ01GC4569",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-261",
    "grNo": "2810_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ01GD6069",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 42.5,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620260",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6760B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620260"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2810_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2810_TTC",
        "truckNo": "RJ01GD6069",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-262",
    "grNo": "2811_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GB6069",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620261",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6761B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620261"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-263",
    "grNo": "2812_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ01GD0669",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 122.165,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620262",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6762B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620262"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2812_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2812_TTC",
        "truckNo": "RJ01GD0669",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-264",
    "grNo": "2813_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ01GD4569",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 70.095,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620263",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6763B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620263"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "12/08/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2813_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2813_TTC",
        "truckNo": "RJ01GD4569",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-265",
    "grNo": "2814_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD4568",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 98.031,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620264",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6764B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620264"
    },
    "freight": 1125.0,
    "totalFreight": 192285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2814_TTC",
        "truckNo": "RJ01GD4568",
        "dueAmount": 191160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2814_TTC",
        "truckNo": "RJ01GD4568",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-266",
    "grNo": "2815_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GC2169",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 75.089,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620265",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6765B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620265"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2815_SMTC",
        "truckNo": "RJ01GC2169",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-267",
    "grNo": "2816_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ01GC0669",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 81.818,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620266",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6766B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620266"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2816_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2816_TTC",
        "truckNo": "RJ01GC0669",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-268",
    "grNo": "2817_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD0713",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 66.286,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620267",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6767B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620267"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-269",
    "grNo": "2818_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ01GE0069",
    "ownerName": "Pradeep Yadav",
    "ownerMobile": "9829539094",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 96.206,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620268",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6768B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620268"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2818_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradeep Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2818_TTC",
        "truckNo": "RJ01GE0069",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-270",
    "grNo": "2819_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ01GC0951",
    "ownerName": "Pradhan Choudhary",
    "ownerMobile": "9351612826",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 85.146,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620269",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6769B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620269"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "18/07/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2819_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pradhan Choudhary",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2819_TTC",
        "truckNo": "RJ01GC0951",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-271",
    "grNo": "2820_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD2973",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 100.421,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620270",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6770B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620270"
    },
    "freight": 1125.0,
    "totalFreight": 191925.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2820_TTC",
        "truckNo": "RJ01GD2973",
        "dueAmount": 190800.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2820_TTC",
        "truckNo": "RJ01GD2973",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-272",
    "grNo": "2821_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD4301",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620271",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6771B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620271"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2821_TTC",
        "truckNo": "RJ01GD4301",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-273",
    "grNo": "2822_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ01GD4359",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 103.712,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620272",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6772B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620272"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2822_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2822_TTC",
        "truckNo": "RJ01GD4359",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-274",
    "grNo": "2823_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD8656",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 50.647,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620273",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6773B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620273"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-275",
    "grNo": "2824_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "NL01AF5972",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 92.25,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620274",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6774B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620274"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2824_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2824_TTC",
        "truckNo": "NL01AF5972",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-276",
    "grNo": "2825_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ01GC8656",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620275",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6775B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620275"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "24/06/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2825_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2825_TTC",
        "truckNo": "RJ01GC8656",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-277",
    "grNo": "2826_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ47GB5972",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 42.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620276",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6776B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620276"
    },
    "freight": 1125.0,
    "totalFreight": 3775.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2826_TTC",
        "truckNo": "RJ47GB5972",
        "dueAmount": 2650.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2826_TTC",
        "truckNo": "RJ47GB5972",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-278",
    "grNo": "2827_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD5387",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 42.5,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620277",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6777B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620277"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2827_SMTC",
        "truckNo": "RJ01GD5387",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-279",
    "grNo": "2828_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ32GD8796",
    "ownerName": "Prakash Chawadi Jawanpura",
    "ownerMobile": "9950900337",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620278",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6778B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620278"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2828_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Prakash Chawadi Jawanpura",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2828_TTC",
        "truckNo": "RJ32GD8796",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-280",
    "grNo": "2829_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA1949",
    "ownerName": "Prakash Gurjar 1949",
    "ownerMobile": "8290081916",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 118.674,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620279",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6779B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620279"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-281",
    "grNo": "2830_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ08GB2298",
    "ownerName": "Pratap Singh",
    "ownerMobile": "9610992196",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620280",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6780B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620280"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2830_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Pratap Singh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2830_TTC",
        "truckNo": "RJ08GB2298",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-282",
    "grNo": "2831_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GB1281",
    "ownerName": "Puran Bablu Transport",
    "ownerMobile": "9982252501",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620281",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6781B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620281"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "02/05/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2831_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Puran Bablu Transport",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2831_TTC",
        "truckNo": "RJ52GB1281",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-283",
    "grNo": "2832_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GK7406",
    "ownerName": "Puran Gerewal",
    "ownerMobile": "9887191616",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 71.137,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620282",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6782B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620282"
    },
    "freight": 1125.0,
    "totalFreight": 136285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Puran Gerewal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2832_TTC",
        "truckNo": "RJ14GK7406",
        "dueAmount": 135160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Puran Gerewal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2832_TTC",
        "truckNo": "RJ14GK7406",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-284",
    "grNo": "2833_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA3137",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 102.857,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620283",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6783B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620283"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2833_TTC",
        "truckNo": "RJ52GA3137",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-285",
    "grNo": "2834_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ32GD5207",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 72.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620284",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6784B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620284"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2834_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2834_TTC",
        "truckNo": "RJ32GD5207",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-286",
    "grNo": "2835_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GD3237",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620285",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6785B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620285"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-287",
    "grNo": "2836_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ52GA1503",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 109.474,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620286",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6786B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620286"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2836_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2836_SMTC",
        "truckNo": "RJ52GA1503",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-288",
    "grNo": "2837_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ52GA1509",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620287",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6787B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620287"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "08/04/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2837_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2837_TTC",
        "truckNo": "RJ52GA1509",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-289",
    "grNo": "2838_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3237",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 114.103,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620288",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6788B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620288"
    },
    "freight": 1125.0,
    "totalFreight": 177985.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2838_TTC",
        "truckNo": "RJ52GB3237",
        "dueAmount": 176860.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2838_TTC",
        "truckNo": "RJ52GB3237",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-290",
    "grNo": "2839_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB1477",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620289",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6789B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620289"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2839_TTC",
        "truckNo": "RJ52GB1477",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-291",
    "grNo": "2840_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GB0988",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 50.647,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620290",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6790B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620290"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2840_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2840_TTC",
        "truckNo": "RJ52GB0988",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-292",
    "grNo": "2841_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GC1488",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 87.857,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620291",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6791B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620291"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-293",
    "grNo": "2842_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ52GC3288",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 85.346,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620292",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6792B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620292"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2842_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2842_TTC",
        "truckNo": "RJ52GC3288",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-294",
    "grNo": "2843_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GB3288",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 42.5,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620293",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6793B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620293"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "14/10/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2843_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2843_SMTC",
        "truckNo": "RJ52GB3288",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-295",
    "grNo": "2844_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA3288",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 42.5,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620294",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6794B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620294"
    },
    "freight": 1125.0,
    "totalFreight": 3075.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2844_TTC",
        "truckNo": "RJ52GA3288",
        "dueAmount": 1950.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2844_TTC",
        "truckNo": "RJ52GA3288",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-296",
    "grNo": "2845_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC2388",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 72.782,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620295",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6795B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620295"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2845_TTC",
        "truckNo": "RJ32GC2388",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-297",
    "grNo": "2846_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GC2388",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 138.453,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620296",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6796B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620296"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2846_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Raiya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2846_TTC",
        "truckNo": "RJ52GC2388",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-298",
    "grNo": "2847_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GC4188",
    "ownerName": "Rajkumar Raiya",
    "ownerMobile": "9950637136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 81.778,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620297",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6797B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620297"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-299",
    "grNo": "2848_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "HR55AL0928",
    "ownerName": "Rajkumar Yadav Behrod",
    "ownerMobile": "9001261792",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 100.611,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620298",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6798B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620298"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2848_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Yadav Behrod",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2848_TTC",
        "truckNo": "HR55AL0928",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-300",
    "grNo": "2849_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ52GB1672",
    "ownerName": "Raju Dhabas",
    "ownerMobile": "9929818536",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620299",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6799B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620299"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "20/09/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2849_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Raju Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2849_TTC",
        "truckNo": "RJ52GB1672",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-301",
    "grNo": "2850_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5396",
    "ownerName": "Raju Gurjar",
    "ownerMobile": "9571525492",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 109.091,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620300",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6800B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620300"
    },
    "freight": 1125.0,
    "totalFreight": 181125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Raju Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2850_TTC",
        "truckNo": "RJ52GA5396",
        "dueAmount": 180000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Raju Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2850_TTC",
        "truckNo": "RJ52GA5396",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-302",
    "grNo": "2851_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ11GC9150",
    "ownerName": "Raju Singh Sardar Ji",
    "ownerMobile": "8700374005",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 68.235,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620301",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6801B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620301"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Raju Singh Sardar Ji",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2851_TTC",
        "truckNo": "RJ11GC9150",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-303",
    "grNo": "2852_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ52GB7365",
    "ownerName": "Rakesh Chawari",
    "ownerMobile": "7737723765",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 72.154,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620302",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6802B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620302"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2852_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rakesh Chawari",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2852_TTC",
        "truckNo": "RJ52GB7365",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-304",
    "grNo": "2853_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GC5565",
    "ownerName": "Rakesh Chawari",
    "ownerMobile": "7737723765",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620303",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6803B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620303"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-305",
    "grNo": "2854_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ14GH5783",
    "ownerName": "Rakesh Sen",
    "ownerMobile": "8949148002",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 119.25,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620304",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6804B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620304"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2854_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rakesh Sen",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2854_TTC",
        "truckNo": "RJ14GH5783",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-306",
    "grNo": "2855_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ37GB3713",
    "ownerName": "Rameshwar Ji Shamli Rajasthm",
    "ownerMobile": "8077706284",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 131.007,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620305",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6805B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620305"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "26/08/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2855_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Ji Shamli Rajasthm",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2855_SMTC",
        "truckNo": "RJ37GB3713",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-307",
    "grNo": "2856_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2587",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620306",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6806B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620306"
    },
    "freight": 1125.0,
    "totalFreight": 172250.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2856_TTC",
        "truckNo": "RJ52GB2587",
        "dueAmount": 171125.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2856_TTC",
        "truckNo": "RJ52GB2587",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-308",
    "grNo": "2857_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8732",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 49.2,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620307",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6807B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620307"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2857_TTC",
        "truckNo": "RJ52GA8732",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-309",
    "grNo": "2858_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GB2588",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620308",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6808B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620308"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2858_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2858_TTC",
        "truckNo": "RJ52GB2588",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-310",
    "grNo": "2859_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2589",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620309",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6809B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620309"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-311",
    "grNo": "2860_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GA8617",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 42.5,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620310",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6810B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620310"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2860_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2860_TTC",
        "truckNo": "RJ52GA8617",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-312",
    "grNo": "2861_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GA7391",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 42.5,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620311",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6811B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620311"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "04/07/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2861_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2861_TTC",
        "truckNo": "RJ52GA7391",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-313",
    "grNo": "2862_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8618",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 79.606,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620312",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6812B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620312"
    },
    "freight": 1125.0,
    "totalFreight": 128494.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2862_TTC",
        "truckNo": "RJ52GA8618",
        "dueAmount": 127369.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2862_TTC",
        "truckNo": "RJ52GA8618",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-314",
    "grNo": "2863_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8678",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620313",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6813B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620313"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2863_TTC",
        "truckNo": "RJ52GA8678",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-315",
    "grNo": "2864_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GB2590",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 105.143,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620314",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6814B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620314"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2864_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2864_SMTC",
        "truckNo": "RJ52GB2590",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-316",
    "grNo": "2865_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6136",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620315",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6815B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620315"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-317",
    "grNo": "2866_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ52GA7390",
    "ownerName": "Anil Gurjar",
    "ownerMobile": "7742204077",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 87.2,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620316",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6816B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620316"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2866_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Anil Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2866_TTC",
        "truckNo": "RJ52GA7390",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-318",
    "grNo": "2867_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GA7731",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620317",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6817B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620317"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "10/06/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2867_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2867_TTC",
        "truckNo": "RJ52GA7731",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-319",
    "grNo": "2868_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9546",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 68.235,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620318",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6818B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620318"
    },
    "freight": 1125.0,
    "totalFreight": 117125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2868_TTC",
        "truckNo": "RJ52GA9546",
        "dueAmount": 116000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2868_TTC",
        "truckNo": "RJ52GA9546",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-320",
    "grNo": "2869_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0725",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 68.719,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620319",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6819B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620319"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2869_TTC",
        "truckNo": "RJ52GB0725",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-321",
    "grNo": "2870_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ52GB2585",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 78.596,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620320",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6820B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620320"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2870_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2870_TTC",
        "truckNo": "RJ52GB2585",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-322",
    "grNo": "2871_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6366",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 106.0,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620321",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6821B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620321"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-323",
    "grNo": "2872_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GA8679",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 80.391,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620322",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6822B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620322"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2872_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2872_TTC",
        "truckNo": "RJ52GA8679",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-324",
    "grNo": "2873_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GA2788",
    "ownerName": "Rameshwar Prasad",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 97.786,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620323",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6823B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620323"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "16/05/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2873_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Prasad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2873_TTC",
        "truckNo": "RJ52GA2788",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-325",
    "grNo": "2874_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GH2898",
    "ownerName": "Rameshwar Rundla",
    "ownerMobile": "9928890774",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 57.4,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620324",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6824B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620324"
    },
    "freight": 1125.0,
    "totalFreight": 87225.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Rundla",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2874_TTC",
        "truckNo": "RJ14GH2898",
        "dueAmount": 86100.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rameshwar Rundla",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2874_TTC",
        "truckNo": "RJ14GH2898",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-326",
    "grNo": "2875_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ09GD6669",
    "ownerName": "Ramkaran Jat",
    "ownerMobile": "7340075271",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 102.5,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620325",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6825B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620325"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Ramkaran Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2875_TTC",
        "truckNo": "RJ09GD6669",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-327",
    "grNo": "2876_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ14GG2997",
    "ownerName": "Ramsingh Jinjwadiya",
    "ownerMobile": "8306392687",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 87.592,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620326",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6826B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620326"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2876_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Ramsingh Jinjwadiya",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2876_TTC",
        "truckNo": "RJ14GG2997",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-328",
    "grNo": "2877_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GD1471",
    "ownerName": "Ramswaroop Girathi",
    "ownerMobile": "9799254377",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620327",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6827B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620327"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-329",
    "grNo": "2878_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ14GN4731",
    "ownerName": "Ramswaroop Girathi",
    "ownerMobile": "9799254377",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 42.5,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620328",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6828B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620328"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2878_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Ramswaroop Girathi",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2878_TTC",
        "truckNo": "RJ14GN4731",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-330",
    "grNo": "2879_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ14GK2951",
    "ownerName": "Ramswaroop Girathi",
    "ownerMobile": "9799254377",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 74.923,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620329",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6829B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620329"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "22/04/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2879_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Ramswaroop Girathi",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2879_TTC",
        "truckNo": "RJ14GK2951",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-331",
    "grNo": "2880_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GB3320",
    "ownerName": "Ranjeet Gurjar Bajrangpura",
    "ownerMobile": "9549754749",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 103.84,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620330",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6830B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620330"
    },
    "freight": 1125.0,
    "totalFreight": 208805.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Ranjeet Gurjar Bajrangpura",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2880_TTC",
        "truckNo": "RJ32GB3320",
        "dueAmount": 207680.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Ranjeet Gurjar Bajrangpura",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2880_TTC",
        "truckNo": "RJ32GB3320",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-332",
    "grNo": "2881_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ20GC7185",
    "ownerName": "Ranjeet Gurjar Bajrangpura",
    "ownerMobile": "9549754749",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620331",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6831B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620331"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Ranjeet Gurjar Bajrangpura",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2881_TTC",
        "truckNo": "RJ20GC7185",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-333",
    "grNo": "2882_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GA8041",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 119.475,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620332",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6832B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620332"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2882_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2882_TTC",
        "truckNo": "RJ52GA8041",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-334",
    "grNo": "2883_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA5671",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 100.119,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620333",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6833B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620333"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-335",
    "grNo": "2884_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GA5674",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620334",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6834B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620334"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2884_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2884_TTC",
        "truckNo": "RJ52GA5674",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-336",
    "grNo": "2885_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ52GA8902",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 66.286,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620335",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6835B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620335"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "28/10/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2885_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2885_TTC",
        "truckNo": "RJ52GA8902",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-337",
    "grNo": "2886_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9133",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620336",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6836B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620336"
    },
    "freight": 1125.0,
    "totalFreight": 145434.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2886_TTC",
        "truckNo": "RJ52GA9133",
        "dueAmount": 144309.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2886_TTC",
        "truckNo": "RJ52GA9133",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-338",
    "grNo": "2887_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8838",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620337",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6837B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620337"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2887_TTC",
        "truckNo": "RJ52GA8838",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-339",
    "grNo": "2888_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ52GB4268",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 100.421,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620338",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6838B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620338"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2888_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2888_TTC",
        "truckNo": "RJ52GB4268",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-340",
    "grNo": "2889_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0215",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 101.063,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620339",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6839B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620339"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-341",
    "grNo": "2890_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GB0303",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 106.953,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620340",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6840B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620340"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2890_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2890_TTC",
        "truckNo": "RJ52GB0303",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-342",
    "grNo": "2891_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GA3842",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620341",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6841B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620341"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "06/09/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2891_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2891_TTC",
        "truckNo": "RJ52GA3842",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-343",
    "grNo": "2892_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC5864",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 131.786,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620342",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6842B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620342"
    },
    "freight": 1125.0,
    "totalFreight": 185625.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2892_SMTC",
        "truckNo": "RJ32GC5864",
        "dueAmount": 184500.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2892_SMTC",
        "truckNo": "RJ32GC5864",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-344",
    "grNo": "2893_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GH1466",
    "ownerName": "Rohitash Chandela",
    "ownerMobile": "9799497364",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620343",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6843B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620343"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Chandela",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2893_TTC",
        "truckNo": "RJ14GH1466",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-345",
    "grNo": "2894_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ14GH0342",
    "ownerName": "Rohtash Kasana Kotputli",
    "ownerMobile": "9928064127",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 42.5,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620344",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6844B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620344"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2894_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rohtash Kasana Kotputli",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2894_TTC",
        "truckNo": "RJ14GH0342",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-346",
    "grNo": "2895_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GQ1458",
    "ownerName": "Salim Tpt",
    "ownerMobile": "9461837425",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620345",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6845B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620345"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-347",
    "grNo": "2896_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ01GD0821",
    "ownerName": "Sattu Kumawat Shrinagar",
    "ownerMobile": "8824290456",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 74.923,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620346",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6846B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620346"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2896_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Kumawat Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2896_TTC",
        "truckNo": "RJ01GD0821",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-348",
    "grNo": "2897_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ01GD0921",
    "ownerName": "Sattu Kumawat Shrinagar",
    "ownerMobile": "8824290456",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 98.895,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620347",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6847B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620347"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "12/08/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2897_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Kumawat Shrinagar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2897_TTC",
        "truckNo": "RJ01GD0921",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-349",
    "grNo": "2898_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ42GB2497",
    "ownerName": "Sattu Yadav Klshangarh",
    "ownerMobile": "8619096756",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 75.487,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620348",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6848B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620348"
    },
    "freight": 1125.0,
    "totalFreight": 148325.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Yadav Klshangarh",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2898_TTC",
        "truckNo": "RJ42GB2497",
        "dueAmount": 147200.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Yadav Klshangarh",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2898_TTC",
        "truckNo": "RJ42GB2497",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-350",
    "grNo": "2899_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ42GA6579",
    "ownerName": "Sattu Yadav Klshangarh",
    "ownerMobile": "8619096756",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 106.2,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620349",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6849B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620349"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Yadav Klshangarh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2899_SMTC",
        "truckNo": "RJ42GA6579",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-351",
    "grNo": "2900_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ42GB6679",
    "ownerName": "Sattu Yadav Klshangarh",
    "ownerMobile": "8619096756",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 61.436,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620350",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6850B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620350"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2900_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Yadav Klshangarh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2900_TTC",
        "truckNo": "RJ42GB6679",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-352",
    "grNo": "2901_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ42GA6679",
    "ownerName": "Sattu Yadav Klshangarh",
    "ownerMobile": "8619096756",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 102.857,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620351",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6851B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620351"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-353",
    "grNo": "2902_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ42GB4779",
    "ownerName": "Sattu Yadav Klshangarh",
    "ownerMobile": "8619096756",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 77.333,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620352",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6852B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620352"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2902_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sattu Yadav Klshangarh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2902_TTC",
        "truckNo": "RJ42GB4779",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-354",
    "grNo": "2903_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ52GA4836",
    "ownerName": "Sayar Tokas",
    "ownerMobile": "8107847386",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 80.172,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620353",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6853B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620353"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "18/07/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2903_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sayar Tokas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2903_TTC",
        "truckNo": "RJ52GA4836",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-355",
    "grNo": "2904_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB1736",
    "ownerName": "Sayar Tokas",
    "ownerMobile": "8107847386",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 80.665,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620354",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6854B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620354"
    },
    "freight": 1125.0,
    "totalFreight": 154388.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Sayar Tokas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2904_TTC",
        "truckNo": "RJ52GB1736",
        "dueAmount": 153263.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Sayar Tokas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2904_TTC",
        "truckNo": "RJ52GB1736",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-356",
    "grNo": "2905_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA1736",
    "ownerName": "Sayar Tokas",
    "ownerMobile": "8107847386",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620355",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6855B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620355"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sayar Tokas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2905_TTC",
        "truckNo": "RJ52GA1736",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-357",
    "grNo": "2906_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ32GE8607",
    "ownerName": "Shankar 8607",
    "ownerMobile": "9636762950",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 107.188,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620356",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6856B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620356"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2906_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Shankar 8607",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2906_TTC",
        "truckNo": "RJ32GE8607",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-358",
    "grNo": "2907_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0964",
    "ownerName": "Shishram Meena",
    "ownerMobile": "9660573067",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 100.662,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620357",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6857B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620357"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-359",
    "grNo": "2908_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GB1455",
    "ownerName": "Shivdan Dhabas",
    "ownerMobile": "9828365995",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 43.05,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620358",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6858B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620358"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2908_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shivdan Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2908_TTC",
        "truckNo": "RJ52GB1455",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-360",
    "grNo": "2909_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GB4506",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620359",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6859B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620359"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "24/06/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2909_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2909_TTC",
        "truckNo": "RJ52GB4506",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-361",
    "grNo": "2910_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4507",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 104.016,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620360",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6860B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620360"
    },
    "freight": 1125.0,
    "totalFreight": 167550.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2910_TTC",
        "truckNo": "RJ52GB4507",
        "dueAmount": 166425.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2910_TTC",
        "truckNo": "RJ52GB4507",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-362",
    "grNo": "2911_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4538",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 42.5,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620361",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6861B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620361"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2911_SMTC",
        "truckNo": "RJ52GB4538",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-363",
    "grNo": "2912_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GB4537",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620362",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6862B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620362"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2912_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2912_TTC",
        "truckNo": "RJ52GB4537",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-364",
    "grNo": "2913_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4586",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 72.782,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620363",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6863B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620363"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-365",
    "grNo": "2914_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GB4573",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620364",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6864B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620364"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2914_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2914_TTC",
        "truckNo": "RJ52GB4573",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-366",
    "grNo": "2915_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ14GH1772",
    "ownerName": "Sitaram Gurjar Mantri",
    "ownerMobile": "9950546098",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620365",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6865B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620365"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "02/05/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2915_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Gurjar Mantri",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2915_TTC",
        "truckNo": "RJ14GH1772",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-367",
    "grNo": "2916_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6549",
    "ownerName": "Sitaram Meena",
    "ownerMobile": "9413571154",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 100.611,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620366",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6866B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620366"
    },
    "freight": 1125.0,
    "totalFreight": 192285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2916_TTC",
        "truckNo": "RJ52GA6549",
        "dueAmount": 191160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2916_TTC",
        "truckNo": "RJ52GA6549",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-368",
    "grNo": "2917_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GK1136",
    "ownerName": "Sitaram Meena",
    "ownerMobile": "9413571154",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 77.234,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620367",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6867B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620367"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2917_TTC",
        "truckNo": "RJ14GK1136",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-369",
    "grNo": "2918_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ26GA8214",
    "ownerName": "Sitaram Meena",
    "ownerMobile": "9413571154",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 112.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620368",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6868B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620368"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2918_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2918_TTC",
        "truckNo": "RJ26GA8214",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-370",
    "grNo": "2919_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3526",
    "ownerName": "Sitaram Yadav Khatkad",
    "ownerMobile": "9829416764",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620369",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6869B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620369"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-371",
    "grNo": "2920_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ14GE2072",
    "ownerName": "Sohanram Choudhary",
    "ownerMobile": "9829652995",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 103.078,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620370",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6870B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620370"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2920_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sohanram Choudhary",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2920_SMTC",
        "truckNo": "RJ14GE2072",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-372",
    "grNo": "2921_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ14GK6260",
    "ownerName": "Sohanram Choudhary",
    "ownerMobile": "9829652995",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620371",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6871B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620371"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "08/04/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2921_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Sohanram Choudhary",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2921_TTC",
        "truckNo": "RJ14GK6260",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-373",
    "grNo": "2922_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ47GA8136",
    "ownerName": "Sohanram Choudhary",
    "ownerMobile": "9829652995",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 123.097,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620372",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6872B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620372"
    },
    "freight": 1125.0,
    "totalFreight": 191925.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Sohanram Choudhary",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2922_TTC",
        "truckNo": "RJ47GA8136",
        "dueAmount": 190800.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Sohanram Choudhary",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2922_TTC",
        "truckNo": "RJ47GA8136",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-374",
    "grNo": "2923_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2472",
    "ownerName": "Subhash Gurjar",
    "ownerMobile": "6367899560",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620373",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6873B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620373"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Subhash Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2923_TTC",
        "truckNo": "RJ52GB2472",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-375",
    "grNo": "2924_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GA1688",
    "ownerName": "Sugan Gurjar",
    "ownerMobile": "9166903481",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 100.662,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620374",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6874B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620374"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2924_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Sugan Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2924_TTC",
        "truckNo": "RJ52GA1688",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-376",
    "grNo": "2925_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB6672",
    "ownerName": "Mukesh Gurjar 6148",
    "ownerMobile": "9414421637",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 41.0,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620375",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6875B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620375"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-377",
    "grNo": "2926_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GB2536",
    "ownerName": "Surendra Dhabas",
    "ownerMobile": "9799556266",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 94.615,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620376",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6876B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620376"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2926_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Surendra Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2926_TTC",
        "truckNo": "RJ52GB2536",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-378",
    "grNo": "2927_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ48GA3365",
    "ownerName": "Babu Lal Kahar Sawar",
    "ownerMobile": "8875882322",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 92.458,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620377",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6877B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620377"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "14/10/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2927_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Babu Lal Kahar Sawar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2927_SMTC",
        "truckNo": "RJ48GA3365",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-379",
    "grNo": "2928_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4319",
    "ownerName": "Surendra Palsaniya Jaswanthpm",
    "ownerMobile": "8769156680",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 42.5,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620378",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6878B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620378"
    },
    "freight": 1125.0,
    "totalFreight": 3775.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Surendra Palsaniya Jaswanthpm",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2928_TTC",
        "truckNo": "RJ52GB4319",
        "dueAmount": 2650.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Surendra Palsaniya Jaswanthpm",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2928_TTC",
        "truckNo": "RJ52GB4319",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-380",
    "grNo": "2929_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GH1590",
    "ownerName": "Suresh Jat",
    "ownerMobile": "9929819605",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620379",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6879B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620379"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Suresh Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2929_TTC",
        "truckNo": "RJ14GH1590",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-381",
    "grNo": "2930_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ52GA9927",
    "ownerName": "Suresh Meena",
    "ownerMobile": "8302561919",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 84.913,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620380",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6880B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620380"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2930_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Suresh Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2930_TTC",
        "truckNo": "RJ52GA9927",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-382",
    "grNo": "2931_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4027",
    "ownerName": "Suresh Palsaniye",
    "ownerMobile": "6367899560",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 115.378,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620381",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6881B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620381"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-383",
    "grNo": "2932_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GA8496",
    "ownerName": "Surgyan Gurjar",
    "ownerMobile": "9166903481",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 77.474,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620382",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6882B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620382"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2932_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Surgyan Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2932_TTC",
        "truckNo": "RJ52GA8496",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-384",
    "grNo": "2933_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GA8133",
    "ownerName": "Tarachand Jmtc",
    "ownerMobile": "7424980729",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620383",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6883B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620383"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "20/09/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2933_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Tarachand Jmtc",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2933_TTC",
        "truckNo": "RJ52GA8133",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-385",
    "grNo": "2934_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GJ5769",
    "ownerName": "Tarachand Jmtc",
    "ownerMobile": "7424980729",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 81.915,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620384",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6884B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620384"
    },
    "freight": 1125.0,
    "totalFreight": 136285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Tarachand Jmtc",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2934_TTC",
        "truckNo": "RJ14GJ5769",
        "dueAmount": 135160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Tarachand Jmtc",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2934_TTC",
        "truckNo": "RJ14GJ5769",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-386",
    "grNo": "2935_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ27GD3132",
    "ownerName": "Tarun Dixit",
    "ownerMobile": "9829193727",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 105.882,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620385",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6885B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620385"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Tarun Dixit",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2935_TTC",
        "truckNo": "RJ27GD3132",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-387",
    "grNo": "2936_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ52GA3454",
    "ownerName": "Vedprakash Meena",
    "ownerMobile": "9950639701",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 58.0,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620386",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6886B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620386"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2936_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Vedprakash Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2936_TTC",
        "truckNo": "RJ52GA3454",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-388",
    "grNo": "2937_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GG0964",
    "ownerName": "Vedprakash Meena",
    "ownerMobile": "9950639701",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620387",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6887B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620387"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-389",
    "grNo": "2938_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ32GD6498",
    "ownerName": "Vicky",
    "ownerMobile": "9413411836",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 95.789,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620388",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6888B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620388"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2938_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vicky",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2938_TTC",
        "truckNo": "RJ32GD6498",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-390",
    "grNo": "2939_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ32GE1136",
    "ownerName": "Vijay Gurjar",
    "ownerMobile": "9829501136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 141.333,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620389",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6889B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620389"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "26/08/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2939_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vijay Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2939_SMTC",
        "truckNo": "RJ32GE1136",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-391",
    "grNo": "2940_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GD8334",
    "ownerName": "Vijay Gurjar",
    "ownerMobile": "9829501136",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 95.6,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620390",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6890B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620390"
    },
    "freight": 1125.0,
    "totalFreight": 177985.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Vijay Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2940_TTC",
        "truckNo": "RJ32GD8334",
        "dueAmount": 176860.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Vijay Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2940_TTC",
        "truckNo": "RJ32GD8334",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-392",
    "grNo": "2941_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB1717",
    "ownerName": "Vikram Saini",
    "ownerMobile": "9571219991",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 97.786,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620391",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6891B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620391"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vikram Saini",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2941_TTC",
        "truckNo": "RJ52GB1717",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-393",
    "grNo": "2942_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GB6172",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620392",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6892B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620392"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2942_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2942_TTC",
        "truckNo": "RJ52GB6172",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-394",
    "grNo": "2943_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB2572",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620393",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6893B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620393"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-395",
    "grNo": "2944_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ52GB5172",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 87.592,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620394",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6894B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620394"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2944_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2944_TTC",
        "truckNo": "RJ52GB5172",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-396",
    "grNo": "2945_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GB0772",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 42.5,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620395",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6895B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620395"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "04/07/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2945_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2945_TTC",
        "truckNo": "RJ52GB0772",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-397",
    "grNo": "2946_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB7072",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 42.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620396",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6896B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620396"
    },
    "freight": 1125.0,
    "totalFreight": 3075.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2946_TTC",
        "truckNo": "RJ52GB7072",
        "dueAmount": 1950.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2946_TTC",
        "truckNo": "RJ52GB7072",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-398",
    "grNo": "2947_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8567",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620397",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6897B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620397"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2947_TTC",
        "truckNo": "RJ52GA8567",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-399",
    "grNo": "2948_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GB3874",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 148.343,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620398",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6898B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620398"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2948_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2948_SMTC",
        "truckNo": "RJ52GB3874",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-400",
    "grNo": "2949_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8797",
    "ownerName": "Vinod Jat",
    "ownerMobile": "9829648034",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620399",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6899B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620399"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-401",
    "grNo": "2950_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ14GB5769",
    "ownerName": "Virteja Transport Kishangarh",
    "ownerMobile": "9829571555",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 123.329,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620400",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6900B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620400"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2950_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Virteja Transport Kishangarh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2950_TTC",
        "truckNo": "RJ14GB5769",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-402",
    "grNo": "2951_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ14GR4578",
    "ownerName": "Yakub Mohamed Firozpur Zirka",
    "ownerMobile": "9813467363",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620401",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6901B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620401"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "10/06/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2951_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Yakub Mohamed Firozpur Zirka",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2951_TTC",
        "truckNo": "RJ14GR4578",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-403",
    "grNo": "2952_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GR0340",
    "ownerName": "Bodu Shekhawat",
    "ownerMobile": "9928141443",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 105.882,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620402",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6902B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620402"
    },
    "freight": 1125.0,
    "totalFreight": 181125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2952_TTC",
        "truckNo": "RJ14GR0340",
        "dueAmount": 180000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2952_TTC",
        "truckNo": "RJ14GR0340",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-404",
    "grNo": "2953_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GE0340",
    "ownerName": "Bodu Shekhawat",
    "ownerMobile": "9928141443",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 55.238,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620403",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6903B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620403"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2953_TTC",
        "truckNo": "RJ14GE0340",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-405",
    "grNo": "2954_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ52GB4113",
    "ownerName": "Jagdish Kumar",
    "ownerMobile": "9828269197",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 74.005,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620404",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6904B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620404"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2954_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdish Kumar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2954_TTC",
        "truckNo": "RJ52GB4113",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-406",
    "grNo": "2955_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB0632",
    "ownerName": "Hari Palsaniya Holiwali",
    "ownerMobile": "9799557332",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 85.146,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620405",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6905B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620405"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-407",
    "grNo": "2956_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ01GD6834",
    "ownerName": "Rakesh Vaishnav",
    "ownerMobile": "7340442885",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 86.727,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620406",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6906B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620406"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2956_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rakesh Vaishnav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2956_TTC",
        "truckNo": "RJ01GD6834",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-408",
    "grNo": "2957_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GB3924",
    "ownerName": "Bodu Shekhawat",
    "ownerMobile": "9928141443",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 101.063,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620407",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6907B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620407"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "16/05/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2957_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2957_TTC",
        "truckNo": "RJ52GB3924",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-409",
    "grNo": "2958_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3697",
    "ownerName": "Bodu Singh Sekhawat",
    "ownerMobile": "9928257378",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 114.083,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620408",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6908B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620408"
    },
    "freight": 1125.0,
    "totalFreight": 172250.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Singh Sekhawat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2958_TTC",
        "truckNo": "RJ52GB3697",
        "dueAmount": 171125.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Singh Sekhawat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2958_TTC",
        "truckNo": "RJ52GB3697",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-410",
    "grNo": "2959_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA9683",
    "ownerName": "Banwari Lal Dhabas",
    "ownerMobile": "9950890686",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 47.833,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620409",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6909B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620409"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Banwari Lal Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2959_TTC",
        "truckNo": "RJ52GA9683",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-411",
    "grNo": "2960_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GA5679",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 97.105,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620410",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6910B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620410"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2960_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2960_TTC",
        "truckNo": "RJ52GA5679",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-412",
    "grNo": "2961_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GE1235",
    "ownerName": "Kalu Ram Yadav Shrinagar",
    "ownerMobile": "7426957302",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 89.959,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620411",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6911B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620411"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-413",
    "grNo": "2962_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ52GB4487",
    "ownerName": "Manish Lunayat",
    "ownerMobile": "9582582370",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 42.5,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620412",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6912B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620412"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2962_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Manish Lunayat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2962_TTC",
        "truckNo": "RJ52GB4487",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-414",
    "grNo": "2963_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GC1572",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 42.5,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620413",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6913B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620413"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "22/04/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2963_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2963_TTC",
        "truckNo": "RJ52GC1572",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-415",
    "grNo": "2964_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA8758",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 63.684,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620414",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6914B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620414"
    },
    "freight": 1125.0,
    "totalFreight": 128494.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2964_TTC",
        "truckNo": "RJ52GA8758",
        "dueAmount": 127369.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2964_TTC",
        "truckNo": "RJ52GA8758",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-416",
    "grNo": "2965_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB3928",
    "ownerName": "Bodu Shekhawat",
    "ownerMobile": "9928141443",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620415",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6915B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620415"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2965_TTC",
        "truckNo": "RJ52GB3928",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-417",
    "grNo": "2966_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GB4746",
    "ownerName": "Surendra Dhabas 9799556266",
    "ownerMobile": "9799556266",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 92.0,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620416",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6916B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620416"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2966_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Surendra Dhabas 9799556266",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2966_TTC",
        "truckNo": "RJ52GB4746",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-418",
    "grNo": "2967_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ27GE3088",
    "ownerName": "Jagdamba Transport 7014389M",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 141.6,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620417",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6917B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620417"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-419",
    "grNo": "2968_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ52GB5879",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 73.059,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620418",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6918B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620418"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2968_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2968_TTC",
        "truckNo": "RJ52GB5879",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-420",
    "grNo": "2969_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ01GD3677",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 102.857,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620419",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6919B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620419"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "28/10/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2969_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2969_TTC",
        "truckNo": "RJ01GD3677",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-421",
    "grNo": "2970_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GD9237",
    "ownerName": "Panchuram Gurjar",
    "ownerMobile": "9829405071",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620420",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6920B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620420"
    },
    "freight": 1125.0,
    "totalFreight": 117125.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2970_TTC",
        "truckNo": "RJ52GD9237",
        "dueAmount": 116000.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Panchuram Gurjar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2970_TTC",
        "truckNo": "RJ52GD9237",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-422",
    "grNo": "2971_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ27GD4839",
    "ownerName": "Jagdamba Transport 7014389M",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620421",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6921B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620421"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport 7014389M",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2971_TTC",
        "truckNo": "RJ27GD4839",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-423",
    "grNo": "2972_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ51GA4700",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 80.665,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620422",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6922B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620422"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2972_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2972_TTC",
        "truckNo": "RJ51GA4700",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-424",
    "grNo": "2973_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD3708",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 109.029,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620423",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6923B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620423"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-425",
    "grNo": "2974_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GB4792",
    "ownerName": "Jai Singh Meena",
    "ownerMobile": "8209005190",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 110.537,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620424",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6924B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620424"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2974_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jai Singh Meena",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2974_TTC",
        "truckNo": "RJ52GB4792",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-426",
    "grNo": "2975_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ30GB3088",
    "ownerName": "Jagdamba Transport 7014389M",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620425",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6925B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620425"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "06/09/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2975_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport 7014389M",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2975_TTC",
        "truckNo": "RJ30GB3088",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-427",
    "grNo": "2976_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ30GB3031",
    "ownerName": "Jagdamba Transport 7014389M",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 61.5,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620426",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6926B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620426"
    },
    "freight": 1125.0,
    "totalFreight": 87225.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport 7014389M",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2976_SMTC",
        "truckNo": "RJ30GB3031",
        "dueAmount": 86100.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport 7014389M",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2976_SMTC",
        "truckNo": "RJ30GB3031",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-428",
    "grNo": "2977_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ02GB3062",
    "ownerName": "Kana Ram Jat Dudu",
    "ownerMobile": "9884223090",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 99.73,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620427",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6927B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620427"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kana Ram Jat Dudu",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2977_TTC",
        "truckNo": "RJ02GB3062",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-429",
    "grNo": "2978_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ14GR5822",
    "ownerName": "Warish Khan",
    "ownerMobile": "8209891486",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 107.371,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620428",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6928B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620428"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2978_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Warish Khan",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2978_TTC",
        "truckNo": "RJ14GR5822",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-430",
    "grNo": "2979_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6319",
    "ownerName": "Lalaram Choudhary Shrinagar",
    "ownerMobile": "9828071017",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620429",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6929B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620429"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-431",
    "grNo": "2980_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ52GB3696",
    "ownerName": "Bodu Singh Sekhawat",
    "ownerMobile": "9928257378",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 42.5,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620430",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6930B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620430"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2980_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Singh Sekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2980_TTC",
        "truckNo": "RJ52GB3696",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-432",
    "grNo": "2981_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ52GB0213",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 60.652,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620431",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6931B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620431"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "12/08/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2981_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2981_TTC",
        "truckNo": "RJ52GB0213",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-433",
    "grNo": "2982_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7384",
    "ownerName": "Surya Pratap Singh",
    "ownerMobile": "9982057651",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 106.503,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620432",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6932B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620432"
    },
    "freight": 1125.0,
    "totalFreight": 208805.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Surya Pratap Singh",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2982_TTC",
        "truckNo": "RJ52GA7384",
        "dueAmount": 207680.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Surya Pratap Singh",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2982_TTC",
        "truckNo": "RJ52GA7384",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-434",
    "grNo": "2983_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA6573",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 81.778,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620433",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6933B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620433"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2983_SMTC",
        "truckNo": "RJ52GA6573",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-435",
    "grNo": "2984_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ52GB6665",
    "ownerName": "Rakesh Chawari",
    "ownerMobile": "7737723765",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 86.891,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620434",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6934B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620434"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "15/04/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2984_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Rakesh Chawari",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2984_TTC",
        "truckNo": "RJ52GB6665",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-436",
    "grNo": "2985_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4785",
    "ownerName": "Gopi Ram Gangal",
    "ownerMobile": "9829283503",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 77.234,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620435",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6935B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620435"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-437",
    "grNo": "2986_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GB4676",
    "ownerName": "Satpal Jat",
    "ownerMobile": "9636299201",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 120.0,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620436",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6936B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620436"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2986_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Satpal Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2986_TTC",
        "truckNo": "RJ52GB4676",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-438",
    "grNo": "2987_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ52GB5054",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 64.444,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620437",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6937B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620437"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "18/07/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2987_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2987_TTC",
        "truckNo": "RJ52GB5054",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-439",
    "grNo": "2988_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 144309.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5053",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 75.952,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620438",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6938B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620438"
    },
    "freight": 1125.0,
    "totalFreight": 145434.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2988_TTC",
        "truckNo": "RJ52GB5053",
        "dueAmount": 144309.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2988_TTC",
        "truckNo": "RJ52GB5053",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-440",
    "grNo": "2989_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5055",
    "ownerName": "Babu Jat",
    "ownerMobile": "9950669687",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 82.845,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620439",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6939B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620439"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Babu Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2989_TTC",
        "truckNo": "RJ52GB5055",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-441",
    "grNo": "2990_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 190800.0,
    "paidAmount": 190800.0,
    "truckNo": "RJ52GB5061",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 115.636,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620440",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6940B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620440"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [
      {
        "paymentDate": "21/10/2026",
        "amountPaid": 190800.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2990_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2990_TTC",
        "truckNo": "RJ52GB5061",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-442",
    "grNo": "2991_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5058",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 104.035,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620441",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6941B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620441"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-443",
    "grNo": "2992_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GB5057",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 85.562,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620442",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6942B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620442"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2992_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2992_TTC",
        "truckNo": "RJ52GB5057",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-444",
    "grNo": "2993_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GA8688",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620443",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6943B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620443"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "24/06/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2993_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2993_TTC",
        "truckNo": "RJ52GA8688",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-445",
    "grNo": "2994_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 184500.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GQ2864",
    "ownerName": "Bodu Shekhawat",
    "ownerMobile": "9928141443",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 115.312,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620444",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6944B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620444"
    },
    "freight": 1125.0,
    "totalFreight": 185625.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "2994_TTC",
        "truckNo": "RJ14GQ2864",
        "dueAmount": 184500.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "2994_TTC",
        "truckNo": "RJ14GQ2864",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-446",
    "grNo": "2995_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD3101",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 123.278,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620445",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6945B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620445"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2995_SMTC",
        "truckNo": "RJ01GD3101",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-447",
    "grNo": "2996_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 2650.0,
    "paidAmount": 2650.0,
    "truckNo": "RJ27GE3031",
    "ownerName": "Jagdamba Transport 7014389M",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620446",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6946B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620446"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [
      {
        "paymentDate": "27/09/2026",
        "amountPaid": 2650.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2996_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport 7014389M",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2996_TTC",
        "truckNo": "RJ27GE3031",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-448",
    "grNo": "2997_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC5879",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 42.5,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620447",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6947B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620447"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-449",
    "grNo": "2998_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ52GB5147",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 68.848,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620448",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6948B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620448"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2998_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2998_TTC",
        "truckNo": "RJ52GB5147",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-450",
    "grNo": "2999_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GC3337",
    "ownerName": "Radhyeshyam Gurjar",
    "ownerMobile": "9784053262",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620449",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6949B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620449"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "02/05/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 2999_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Radhyeshyam Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "2999_TTC",
        "truckNo": "RJ52GC3337",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-451",
    "grNo": "3000_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 147200.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD2191",
    "ownerName": "Kalu Ram Yadav Shrinagar",
    "ownerMobile": "7426957302",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 77.474,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620450",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6950B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620450"
    },
    "freight": 1125.0,
    "totalFreight": 148325.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kalu Ram Yadav Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3000_TTC",
        "truckNo": "RJ01GD2191",
        "dueAmount": 147200.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kalu Ram Yadav Shrinagar",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3000_TTC",
        "truckNo": "RJ01GD2191",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-452",
    "grNo": "3001_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5549",
    "ownerName": "Ramesh Palsanie",
    "ownerMobile": "7742556519",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 109.234,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620451",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6951B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620451"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Ramesh Palsanie",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3001_TTC",
        "truckNo": "RJ52GB5549",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-453",
    "grNo": "3002_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 135160.0,
    "paidAmount": 135160.0,
    "truckNo": "RJ14GP6426",
    "ownerName": "Bodu Singh Sekhawat",
    "ownerMobile": "9928257378",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 84.475,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620452",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6952B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620452"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [
      {
        "paymentDate": "05/08/2026",
        "amountPaid": 135160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3002_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Singh Sekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3002_TTC",
        "truckNo": "RJ14GP6426",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-454",
    "grNo": "3003_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD5377",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 97.297,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620453",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6953B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620453"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-455",
    "grNo": "3004_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ32GC9297",
    "ownerName": "Subhash Jinjad",
    "ownerMobile": "9829446302",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 82.857,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620454",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6954B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620454"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3004_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Subhash Jinjad",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3004_SMTC",
        "truckNo": "RJ32GC9297",
        "dueAmount": 116000.0
      }
    ]
  },
  {
    "id": "due-456",
    "grNo": "3005_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ01GD4865",
    "ownerName": "Chand Rawat Singh",
    "ownerMobile": "9928735404",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 78.005,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620455",
    "driver": "Dhanraj Meena 0986",
    "driverMobile": "9414000986",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6955B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620455"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "08/04/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3005_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Chand Rawat Singh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3005_TTC",
        "truckNo": "RJ01GD4865",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-457",
    "grNo": "3006_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 153263.0,
    "paidAmount": 0.0,
    "truckNo": "RJ26GB1136",
    "ownerName": "Sitaram Meena",
    "ownerMobile": "9413571154",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 98.879,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620456",
    "driver": "Krishna Saini",
    "driverMobile": "9828334455",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6956B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620456"
    },
    "freight": 1125.0,
    "totalFreight": 154388.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3006_TTC",
        "truckNo": "RJ26GB1136",
        "dueAmount": 153263.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Sitaram Meena",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3006_TTC",
        "truckNo": "RJ26GB1136",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-458",
    "grNo": "3007_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5146",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620457",
    "driver": "Banti Meena Tonk",
    "driverMobile": "9414556677",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6957B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620457"
    },
    "freight": 190800.0,
    "totalFreight": 190800.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3007_TTC",
        "truckNo": "RJ52GB5146",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-459",
    "grNo": "3008_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 176860.0,
    "paidAmount": 176860.0,
    "truckNo": "RJ52GA9037",
    "ownerName": "Jairam Badbadwal",
    "ownerMobile": "9829099423",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 104.035,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620458",
    "driver": "Mukesh Gurjar Badgaon",
    "driverMobile": "9602778899",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6958B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620458"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [
      {
        "paymentDate": "11/07/2026",
        "amountPaid": 176860.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3008_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jairam Badbadwal",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3008_TTC",
        "truckNo": "RJ52GA9037",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-460",
    "grNo": "3009_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 171125.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5205",
    "ownerName": "Suresh Palsaniye Jaswanthpu...",
    "ownerMobile": "9950684877",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 81.488,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620459",
    "driver": "Giriraj Yadav MP",
    "driverMobile": "9783445566",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6959B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620459"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-461",
    "grNo": "3010_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 86100.0,
    "paidAmount": 86100.0,
    "truckNo": "RJ52GA4821",
    "ownerName": "Jeetu Kulharia",
    "ownerMobile": "9784062470",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 44.154,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620460",
    "driver": "Pappu Gurjar 3874",
    "driverMobile": "9414883874",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6960B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620460"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 86100.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3010_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Jeetu Kulharia",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3010_TTC",
        "truckNo": "RJ52GA4821",
        "dueAmount": 86100.0
      }
    ]
  },
  {
    "id": "due-462",
    "grNo": "3011_SMTC",
    "tripDate": "14/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ32GD8541",
    "ownerName": "Suresh Khatana",
    "ownerMobile": "9928802714",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "SMTC",
    "material": "Dolomite Powder",
    "weight": 102.5,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Rajesh Rao Udaipur",
    "referenceMobile": "9235620461",
    "driver": "Shaitan Gurjar",
    "driverMobile": "9828990011",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6961B1ZN",
      "name": "Rajesh Rao Udaipur",
      "mobile": "9235620461"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "14/10/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3011_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Suresh Khatana",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3011_SMTC",
        "truckNo": "RJ32GD8541",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-463",
    "grNo": "3012_TTC",
    "tripDate": "15/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 166425.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GB8912",
    "ownerName": "Kanhaya Lal Jat 8912",
    "ownerMobile": "9079066845",
    "origin": "Rajsamand (Raj.)",
    "destination": "Haldwani (U.K.)",
    "transport": "TTC",
    "material": "Marble Blocks",
    "weight": 75.648,
    "rate": 2200.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Shruti Marble Sukher",
    "referenceMobile": "9235620462",
    "driver": "Kallu Meena",
    "driverMobile": "9079757926",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6962B1ZN",
      "name": "Shruti Marble Sukher",
      "mobile": "9235620462"
    },
    "freight": 1125.0,
    "totalFreight": 167550.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaya Lal Jat 8912",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3012_TTC",
        "truckNo": "RJ32GB8912",
        "dueAmount": 166425.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Kanhaya Lal Jat 8912",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3012_TTC",
        "truckNo": "RJ32GB8912",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-464",
    "grNo": "3013_TTC",
    "tripDate": "16/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ14GP6423",
    "ownerName": "Bodu Shekhawat",
    "ownerMobile": "9928257378",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Gopal Sharda",
    "referenceMobile": "9235620463",
    "driver": "Ramchandra Jat",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6963B1ZN",
      "name": "Gopal Sharda",
      "mobile": "9235620463"
    },
    "freight": 2650.0,
    "totalFreight": 2650.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bodu Shekhawat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3013_TTC",
        "truckNo": "RJ14GP6423",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-465",
    "grNo": "3014_TTC",
    "tripDate": "17/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 1950.0,
    "paidAmount": 1950.0,
    "truckNo": "RJ01GC4301",
    "ownerName": "Prahlad Jat",
    "ownerMobile": "9001005693",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Ceramic Minerals",
    "weight": 42.5,
    "rate": 1500.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Anil Sharda",
    "referenceMobile": "9235620464",
    "driver": "Laxman Gurjar 8614",
    "driverMobile": "9828861400",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6964B1ZN",
      "name": "Anil Sharda",
      "mobile": "9235620464"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [
      {
        "paymentDate": "17/06/2026",
        "amountPaid": 1950.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3014_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Prahlad Jat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3014_TTC",
        "truckNo": "RJ01GC4301",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-466",
    "grNo": "3015_TTC",
    "tripDate": "18/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 127369.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GC4096",
    "ownerName": "Mukesh Gurjar 6148",
    "ownerMobile": "9414421637",
    "origin": "Rajsamand (Raj.)",
    "destination": "Saharanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcite Powder",
    "weight": 70.761,
    "rate": 1800.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Oswal Mineral Amet",
    "referenceMobile": "9235620465",
    "driver": "Dinesh Yadav 7729",
    "driverMobile": "9414772900",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6965B1ZN",
      "name": "Oswal Mineral Amet",
      "mobile": "9235620465"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-467",
    "grNo": "3016_TTC",
    "tripDate": "19/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 207680.0,
    "paidAmount": 207680.0,
    "truckNo": "RJ52GA1508",
    "ownerName": "Deva Gurjar",
    "ownerMobile": "9680656060",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Marble Tiles",
    "weight": 109.305,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Meerut Tiranga Marble Sonu Bhai",
    "referenceMobile": "9235620466",
    "driver": "Sonu Bhai",
    "driverMobile": "9602334455",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6966B1ZN",
      "name": "Meerut Tiranga Marble Sonu Bhai",
      "mobile": "9235620466"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [
      {
        "paymentDate": "19/08/2026",
        "amountPaid": 207680.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3016_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Deva Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3016_TTC",
        "truckNo": "RJ52GA1508",
        "dueAmount": 207680.0
      }
    ]
  },
  {
    "id": "due-468",
    "grNo": "3017_TTC",
    "tripDate": "20/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ52GB5374",
    "ownerName": "Rohitash Adhane",
    "ownerMobile": "9929587504",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Industrial Raw Material",
    "weight": 79.568,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Ankush Bansal Jaipur",
    "referenceMobile": "9235620467",
    "driver": "Mangalram Gurjar",
    "driverMobile": "9783556677",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6967B1ZN",
      "name": "Ankush Bansal Jaipur",
      "mobile": "9235620467"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "20/09/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3017_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Adhane",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3017_TTC",
        "truckNo": "RJ52GB5374",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-469",
    "grNo": "3018_TTC",
    "tripDate": "21/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 191160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ30GA3088",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Agra (U.P.)",
    "transport": "TTC",
    "material": "Silica Powder",
    "weight": 115.855,
    "rate": 1650.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Pushpendra Sharma",
    "referenceMobile": "9235620468",
    "driver": "Mahendra Bairwa",
    "driverMobile": "9414889900",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6968B1ZN",
      "name": "Pushpendra Sharma",
      "mobile": "9235620468"
    },
    "freight": 1125.0,
    "totalFreight": 192285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3018_TTC",
        "truckNo": "RJ30GA3088",
        "dueAmount": 191160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3018_TTC",
        "truckNo": "RJ30GA3088",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-470",
    "grNo": "3019_TTC",
    "tripDate": "22/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB4252",
    "ownerName": "Rohitash Rolaniya Garh",
    "ownerMobile": "524252",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Foundry Powder",
    "weight": 79.506,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Pankaj Jain Sahibabad",
    "referenceMobile": "9235620469",
    "driver": "Gopi Chand 8732",
    "driverMobile": "9079873200",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6969B1ZN",
      "name": "Pankaj Jain Sahibabad",
      "mobile": "9235620469"
    },
    "freight": 135160.0,
    "totalFreight": 135160.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Rolaniya Garh",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3019_TTC",
        "truckNo": "RJ52GB4252",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-471",
    "grNo": "3020_TTC",
    "tripDate": "23/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 180000.0,
    "paidAmount": 180000.0,
    "truckNo": "RJ52GC5396",
    "ownerName": "Raju Gurjar",
    "ownerMobile": "9571525492",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Polished Granite",
    "weight": 90.0,
    "rate": 2000.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Madan Nilkanth Granite Jetpura",
    "referenceMobile": "9235620470",
    "driver": "Pratap Singh",
    "driverMobile": "9828112200",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6970B1ZN",
      "name": "Madan Nilkanth Granite Jetpura",
      "mobile": "9235620470"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [
      {
        "paymentDate": "23/05/2026",
        "amountPaid": 180000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3020_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Raju Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3020_TTC",
        "truckNo": "RJ52GC5396",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-472",
    "grNo": "3021_TTC",
    "tripDate": "24/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 116000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ27GC5877",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Calcium Carbonate",
    "weight": 62.703,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Shree Shyam Mineral & Chemical Traders",
    "referenceMobile": "9235620471",
    "driver": "Hanuman Hindoli 4538",
    "driverMobile": "9414453800",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6971B1ZN",
      "name": "Shree Shyam Mineral & Chemical Traders",
      "mobile": "9235620471"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-473",
    "grNo": "3022_TTC",
    "tripDate": "25/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 144309.0,
    "paidAmount": 144309.0,
    "truckNo": "RJ52GB5188",
    "ownerName": "Madan Mama",
    "ownerMobile": "7023827510",
    "origin": "Rajsamand (Raj.)",
    "destination": "Delhi",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 90.193,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 144309.0,
    "reference": "Vedanta Granite",
    "referenceMobile": "9235620472",
    "driver": "Lokesh Choudhary",
    "driverMobile": "9310495939",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6972B1ZN",
      "name": "Vedanta Granite",
      "mobile": "9235620472"
    },
    "freight": 144309.0,
    "totalFreight": 144309.0,
    "payments": [
      {
        "paymentDate": "25/07/2026",
        "amountPaid": 144309.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3022_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Madan Mama",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3022_TTC",
        "truckNo": "RJ52GB5188",
        "dueAmount": 144309.0
      }
    ]
  },
  {
    "id": "due-474",
    "grNo": "3023_SMTC",
    "tripDate": "26/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 153263.0,
    "paidAmount": 153263.0,
    "truckNo": "RJ52GB0214",
    "ownerName": "Rohitash Bablu Motors",
    "ownerMobile": "9929898358",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Gypsum Powder",
    "weight": 113.528,
    "rate": 1350.0,
    "billingType": "Per Tonne",
    "biltyAmount": 153263.0,
    "reference": "Durga Enterprises",
    "referenceMobile": "9235620473",
    "driver": "Pradeep 1136",
    "driverMobile": "9602113600",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6973B1ZN",
      "name": "Durga Enterprises",
      "mobile": "9235620473"
    },
    "freight": 153263.0,
    "totalFreight": 153263.0,
    "payments": [
      {
        "paymentDate": "26/08/2026",
        "amountPaid": 153263.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3023_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rohitash Bablu Motors",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3023_SMTC",
        "truckNo": "RJ52GB0214",
        "dueAmount": 153263.0
      }
    ]
  },
  {
    "id": "due-475",
    "grNo": "3024_TTC",
    "tripDate": "27/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 190800.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GE0162",
    "ownerName": "Gaurav Yadav",
    "ownerMobile": "9521583721",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Feldspar Powder",
    "weight": 103.135,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 190800.0,
    "reference": "Saatvik Minerals",
    "referenceMobile": "9235620474",
    "driver": "Dataram Gurjar",
    "driverMobile": "9783223344",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6974B1ZN",
      "name": "Saatvik Minerals",
      "mobile": "9235620474"
    },
    "freight": 1125.0,
    "totalFreight": 191925.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Gaurav Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3024_TTC",
        "truckNo": "RJ01GE0162",
        "dueAmount": 190800.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Gaurav Yadav",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3024_TTC",
        "truckNo": "RJ01GE0162",
        "dueAmount": 190800.0
      }
    ]
  },
  {
    "id": "due-476",
    "grNo": "3025_TTC",
    "tripDate": "28/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 176860.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA7444",
    "ownerName": "Dev Karan Gurjar",
    "ownerMobile": "8619553406",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Sandstone & Marble",
    "weight": 101.063,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 176860.0,
    "reference": "Shri Nakoda Bhairav Stone",
    "referenceMobile": "9235620475",
    "driver": "Suresh Gurjar Tonk",
    "driverMobile": "9414667788",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6975B1ZN",
      "name": "Shri Nakoda Bhairav Stone",
      "mobile": "9235620475"
    },
    "freight": 176860.0,
    "totalFreight": 176860.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Dev Karan Gurjar",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3025_TTC",
        "truckNo": "RJ52GA7444",
        "dueAmount": 176860.0
      }
    ]
  },
  {
    "id": "due-477",
    "grNo": "3026_TTC",
    "tripDate": "01/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 171125.0,
    "paidAmount": 171125.0,
    "truckNo": "RJ52GB5521",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 92.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 171125.0,
    "reference": "Himanshu Chemtech Kanpur Supplier",
    "referenceMobile": "9235620476",
    "driver": "Dharmi Meena",
    "driverMobile": "9414717113",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6976B1ZN",
      "name": "Himanshu Chemtech Kanpur Supplier",
      "mobile": "9235620476"
    },
    "freight": 171125.0,
    "totalFreight": 171125.0,
    "payments": [
      {
        "paymentDate": "01/04/2026",
        "amountPaid": 171125.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3026_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3026_TTC",
        "truckNo": "RJ52GB5521",
        "dueAmount": 171125.0
      }
    ]
  },
  {
    "id": "due-478",
    "grNo": "3027_TTC",
    "tripDate": "02/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 86100.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5529",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Lucknow (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 46.541,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 86100.0,
    "reference": "Bharat Mineral Pasoond",
    "referenceMobile": "9235620477",
    "driver": "Bhim Raj 8616",
    "driverMobile": "9828230022",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6977B1ZN",
      "name": "Bharat Mineral Pasoond",
      "mobile": "9235620477"
    },
    "freight": 86100.0,
    "totalFreight": 86100.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-479",
    "grNo": "3028_TTC",
    "tripDate": "03/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 184500.0,
    "paidAmount": 184500.0,
    "truckNo": "RJ52GB5528",
    "ownerName": "Shree Mahaveer Transport Com",
    "ownerMobile": "9414659401",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Micronized Powder",
    "weight": 97.105,
    "rate": 1900.0,
    "billingType": "Per Tonne",
    "biltyAmount": 184500.0,
    "reference": "Kunal Micron Vijay Jain",
    "referenceMobile": "9235620478",
    "driver": "Krishan Singh",
    "driverMobile": "9414659401",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6978B1ZN",
      "name": "Kunal Micron Vijay Jain",
      "mobile": "9235620478"
    },
    "freight": 184500.0,
    "totalFreight": 184500.0,
    "payments": [
      {
        "paymentDate": "03/06/2026",
        "amountPaid": 184500.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3028_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Shree Mahaveer Transport Com",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3028_TTC",
        "truckNo": "RJ52GB5528",
        "dueAmount": 184500.0
      }
    ]
  },
  {
    "id": "due-480",
    "grNo": "3029_TTC",
    "tripDate": "04/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 166425.0,
    "paidAmount": 166425.0,
    "truckNo": "RJ52GB5522",
    "ownerName": "Kailash Dhabas",
    "ownerMobile": "9983372986",
    "origin": "Rajsamand (Raj.)",
    "destination": "Karnal (Haryana)",
    "transport": "TTC",
    "material": "Industrial Minerals",
    "weight": 95.1,
    "rate": 1750.0,
    "billingType": "Per Tonne",
    "biltyAmount": 166425.0,
    "reference": "Virsun Industries",
    "referenceMobile": "9235620479",
    "driver": "Vikram Gurjar 4507",
    "driverMobile": "8824993002",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6979B1ZN",
      "name": "Virsun Industries",
      "mobile": "9235620479"
    },
    "freight": 166425.0,
    "totalFreight": 166425.0,
    "payments": [
      {
        "paymentDate": "04/07/2026",
        "amountPaid": 166425.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3029_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Kailash Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3029_TTC",
        "truckNo": "RJ52GB5522",
        "dueAmount": 166425.0
      }
    ]
  },
  {
    "id": "due-481",
    "grNo": "3030_TTC",
    "tripDate": "05/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 2650.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5523",
    "ownerName": "Manish Lunayat",
    "ownerMobile": "9582582370",
    "origin": "Rajsamand (Raj.)",
    "destination": "Ghaziabad (U.P.)",
    "transport": "TTC",
    "material": "Soapstone Powder",
    "weight": 42.5,
    "rate": 1600.0,
    "billingType": "Per Tonne",
    "biltyAmount": 2650.0,
    "reference": "Ganpati Minerals",
    "referenceMobile": "9235620480",
    "driver": "Ranjeet 8796",
    "driverMobile": "9602418796",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6980B1ZN",
      "name": "Ganpati Minerals",
      "mobile": "9235620480"
    },
    "freight": 1125.0,
    "totalFreight": 3775.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Manish Lunayat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3030_TTC",
        "truckNo": "RJ52GB5523",
        "dueAmount": 2650.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Manish Lunayat",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3030_TTC",
        "truckNo": "RJ52GB5523",
        "dueAmount": 2650.0
      }
    ]
  },
  {
    "id": "due-482",
    "grNo": "3031_TTC",
    "tripDate": "06/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 1950.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GB5524",
    "ownerName": "Manish Lunayat",
    "ownerMobile": "9582582370",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 42.5,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 1950.0,
    "reference": "Mahaveer Tholiya",
    "referenceMobile": "9235620481",
    "driver": "Mahesh Gurjar Govindpura",
    "driverMobile": "9783112233",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6981B1ZN",
      "name": "Mahaveer Tholiya",
      "mobile": "9235620481"
    },
    "freight": 1950.0,
    "totalFreight": 1950.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Manish Lunayat",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3031_TTC",
        "truckNo": "RJ52GB5524",
        "dueAmount": 1950.0
      }
    ]
  },
  {
    "id": "due-483",
    "grNo": "3032_SMTC",
    "tripDate": "07/10/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 127369.0,
    "paidAmount": 127369.0,
    "truckNo": "RJ32GD3771",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Neemrana (Raj.)",
    "transport": "SMTC",
    "material": "Plaster of Paris",
    "weight": 90.978,
    "rate": 1400.0,
    "billingType": "Per Tonne",
    "biltyAmount": 127369.0,
    "reference": "Sudhir Mishra Sakarni Kareda",
    "referenceMobile": "9235620482",
    "driver": "Ramkaran Gurjar 6337",
    "driverMobile": "9414886337",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6982B1ZN",
      "name": "Sudhir Mishra Sakarni Kareda",
      "mobile": "9235620482"
    },
    "freight": 127369.0,
    "totalFreight": 127369.0,
    "payments": [
      {
        "paymentDate": "07/10/2026",
        "amountPaid": 127369.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "SMTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3032_SMTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3032_SMTC",
        "truckNo": "RJ32GD3771",
        "dueAmount": 127369.0
      }
    ]
  },
  {
    "id": "due-484",
    "grNo": "3033_TTC",
    "tripDate": "08/04/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Off Loading",
    "color": "pink",
    "colorHex": "#e91e63",
    "dueAmount": 207680.0,
    "paidAmount": 0.0,
    "truckNo": "RJ32GE3683",
    "ownerName": "Banwari Lal Dhabas",
    "ownerMobile": "9950890686",
    "origin": "Rajsamand (Raj.)",
    "destination": "Kanpur (U.P.)",
    "transport": "TTC",
    "material": "Chemical Powder",
    "weight": 112.259,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 207680.0,
    "reference": "Rishi Kapur Kapsons India",
    "referenceMobile": "9235620483",
    "driver": "Bhanwarchoudhary 7333",
    "driverMobile": "9079757333",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6983B1ZN",
      "name": "Rishi Kapur Kapsons India",
      "mobile": "9235620483"
    },
    "freight": 207680.0,
    "totalFreight": 207680.0,
    "payments": [],
    "debts": []
  },
  {
    "id": "due-485",
    "grNo": "3034_TTC",
    "tripDate": "09/05/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Cheque Due",
    "color": "slate",
    "colorHex": "#607d8b",
    "dueAmount": 147200.0,
    "paidAmount": 147200.0,
    "truckNo": "RJ32GE2072",
    "ownerName": "Vinod Dhabas",
    "ownerMobile": "8094550036",
    "origin": "Rajsamand (Raj.)",
    "destination": "Bahadurgarh (Haryana)",
    "transport": "TTC",
    "material": "Quartz Powder",
    "weight": 94.968,
    "rate": 1550.0,
    "billingType": "Per Tonne",
    "biltyAmount": 147200.0,
    "reference": "Jawahar Minerals Alwar",
    "referenceMobile": "9235620484",
    "driver": "Hansraj 1235",
    "driverMobile": "9829123500",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6984B1ZN",
      "name": "Jawahar Minerals Alwar",
      "mobile": "9235620484"
    },
    "freight": 147200.0,
    "totalFreight": 147200.0,
    "payments": [
      {
        "paymentDate": "09/05/2026",
        "amountPaid": 147200.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3034_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Vinod Dhabas",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3034_TTC",
        "truckNo": "RJ32GE2072",
        "dueAmount": 147200.0
      }
    ]
  },
  {
    "id": "due-486",
    "grNo": "3035_TTC",
    "tripDate": "10/06/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Truck Owner Payment Pending",
    "color": "cyan",
    "colorHex": "#00bcd4",
    "dueAmount": 191160.0,
    "paidAmount": 191160.0,
    "truckNo": "RJ14GP1978",
    "ownerName": "Bhanu",
    "ownerMobile": "9784087058",
    "origin": "Rajsamand (Raj.)",
    "destination": "Sandila (U.P.)",
    "transport": "TTC",
    "material": "Marble Powder",
    "weight": 103.33,
    "rate": 1850.0,
    "billingType": "Per Tonne",
    "biltyAmount": 191160.0,
    "reference": "Tanuj Kothari Udaipur",
    "referenceMobile": "9235620485",
    "driver": "Madan Gurjar",
    "driverMobile": "9414223344",
    "consignor": {
      "gstin": "08AAUFD1174E1ZC",
      "name": "Durga Enterprises",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6985B1ZN",
      "name": "Tanuj Kothari Udaipur",
      "mobile": "9235620485"
    },
    "freight": 191160.0,
    "totalFreight": 191160.0,
    "payments": [
      {
        "paymentDate": "10/06/2026",
        "amountPaid": 191160.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3035_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Bhanu",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3035_TTC",
        "truckNo": "RJ14GP1978",
        "dueAmount": 191160.0
      }
    ]
  },
  {
    "id": "due-487",
    "grNo": "3036_TTC",
    "tripDate": "11/07/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Transit",
    "color": "yellow",
    "colorHex": "#e5a823",
    "dueAmount": 135160.0,
    "paidAmount": 0.0,
    "truckNo": "RJ52GA1907",
    "ownerName": "Krishnan Kharwal",
    "ownerMobile": "9950806643",
    "origin": "Rajsamand (Raj.)",
    "destination": "Jhajjar (Haryana)",
    "transport": "TTC",
    "material": "Chemicals & Dyes",
    "weight": 79.506,
    "rate": 1700.0,
    "billingType": "Per Tonne",
    "biltyAmount": 135160.0,
    "reference": "Balwant Yadav R.B. Dyes",
    "referenceMobile": "9235620486",
    "driver": "Manraj Meena 9433",
    "driverMobile": "9079943300",
    "consignor": {
      "gstin": "08AGRPJ1613P1ZX",
      "name": "Saatvik Minerals",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6986B1ZN",
      "name": "Balwant Yadav R.B. Dyes",
      "mobile": "9235620486"
    },
    "freight": 1125.0,
    "totalFreight": 136285.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2500.0,
        "debtMode": "Cash",
        "borrowerName": "Krishnan Kharwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "2026-2027 Advance Commission",
        "grNo": "3036_TTC",
        "truckNo": "RJ52GA1907",
        "dueAmount": 135160.0
      },
      {
        "debtType": "Other",
        "debtAmount": 1400.0,
        "debtMode": "Cash",
        "borrowerName": "Krishnan Kharwal",
        "receiverName": "Bajrang Meena 7297032726",
        "description": "Other Advance on Loading",
        "grNo": "3036_TTC",
        "truckNo": "RJ52GA1907",
        "dueAmount": 135160.0
      }
    ]
  },
  {
    "id": "due-488",
    "grNo": "3037_TTC",
    "tripDate": "12/08/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "POD Sent/ Bill Generated",
    "color": "purple",
    "colorHex": "#9c27b0",
    "dueAmount": 180000.0,
    "paidAmount": 0.0,
    "truckNo": "RJ01GD7167",
    "ownerName": "Rajkumar Yadav",
    "ownerMobile": "9784595626",
    "origin": "Rajsamand (Raj.)",
    "destination": "Azamgarh (U.P.)",
    "transport": "TTC",
    "material": "Marble Lumps",
    "weight": 85.714,
    "rate": 2100.0,
    "billingType": "Per Tonne",
    "biltyAmount": 180000.0,
    "reference": "Pappu Raad",
    "referenceMobile": "9235620487",
    "driver": "Chand Gurjar",
    "driverMobile": "8824112233",
    "consignor": {
      "gstin": "08CRGPG0812F1ZB",
      "name": "Shree Shyam Mineral Traders",
      "address": "Industrial Area, Karera, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6987B1ZN",
      "name": "Pappu Raad",
      "mobile": "9235620487"
    },
    "freight": 180000.0,
    "totalFreight": 180000.0,
    "payments": [],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 2000.0,
        "debtMode": "Cash",
        "borrowerName": "Rajkumar Yadav",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3037_TTC",
        "truckNo": "RJ01GD7167",
        "dueAmount": 180000.0
      }
    ]
  },
  {
    "id": "due-489",
    "grNo": "3038_TTC",
    "tripDate": "13/09/2026",
    "tripEndDate": "05/11/2026",
    "year": "2026-2027",
    "status": "Party Payment Pending",
    "color": "blue",
    "colorHex": "#1a73e8",
    "dueAmount": 116000.0,
    "paidAmount": 116000.0,
    "truckNo": "RJ30GA6732",
    "ownerName": "Jagdamba Transport",
    "ownerMobile": "7014389435",
    "origin": "Rajsamand (Raj.)",
    "destination": "Meerut (U.P.)",
    "transport": "TTC",
    "material": "Granite Slabs",
    "weight": 59.487,
    "rate": 1950.0,
    "billingType": "Per Tonne",
    "biltyAmount": 116000.0,
    "reference": "Irfan Bhai Khatauli",
    "referenceMobile": "9235620488",
    "driver": "Rajesh Gurjar Kotputli",
    "driverMobile": "9602554433",
    "consignor": {
      "gstin": "08FPWPR3462B2ZD",
      "name": "SHIV UMA STONEX",
      "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)"
    },
    "consignee": {
      "gstin": "09AICPG6988B1ZN",
      "name": "Irfan Bhai Khatauli",
      "mobile": "9235620488"
    },
    "freight": 116000.0,
    "totalFreight": 116000.0,
    "payments": [
      {
        "paymentDate": "13/09/2026",
        "amountPaid": 116000.0,
        "mode": "NEFT/RTGS",
        "beneficiary": "Truck Owner",
        "bank": "TTC",
        "toBank": "Other Bank",
        "description": "Transporter Payment for GR 3038_TTC",
        "paidTo": "Transporter"
      }
    ],
    "debts": [
      {
        "debtType": "Commission",
        "debtAmount": 1500.0,
        "debtMode": "Cash",
        "borrowerName": "Jagdamba Transport",
        "receiverName": "Ramchandra Jat 8824993002",
        "description": "2026-2027 Advance Commission",
        "grNo": "3038_TTC",
        "truckNo": "RJ30GA6732",
        "dueAmount": 116000.0
      }
    ]
  }
];
});
