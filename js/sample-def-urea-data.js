/**
 * Authentic Sample Data for DEF Urea Module (Module 8)
 * Extracted 1:1 from Google AppSheet Screen Capture
 * MTC & TTC Logistics Management System
 */

window.INITIAL_DEF_STOCK_INWARD = [
  {
    id: "def-in-1",
    date: "30/10/2026",
    dateTime: "30/10/2026 09:32 AM",
    qtyLitre: 190,
    buckets: 9.5,
    supplier: "Indian Oil Corporation Ltd (IOCL)",
    ratePerLitre: 45,
    totalAmount: 8550,
    billNo: "IOCL-DEF-9821",
    remarks: "Bulk Stock Inward at Head Office Garage"
  },
  {
    id: "def-in-2",
    date: "25/10/2026",
    dateTime: "25/10/2026 10:15 AM",
    qtyLitre: 500,
    buckets: 25,
    supplier: "Bharat Petroleum (BPCL)",
    ratePerLitre: 44,
    totalAmount: 22000,
    billNo: "BPCL-DEF-4412",
    remarks: "AdBlue 20L Buckets Inward"
  }
];

window.INITIAL_DEF_CONSUMED = [
  // 30/10/2026 (Total 140 Litre)
  {
    id: "def-c-1",
    date: "30/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB5642",
    driverName: "Suresh Raiya",
    driverMobile: "9636017337",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Trip Shahpura to Neemrana"
  },
  {
    id: "def-c-2",
    date: "30/10/2026",
    filledQty: 20,
    truckNo: "RJ52GB2589",
    driverName: "Piru Gurjar",
    driverMobile: "9680287137",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 1,
    rate: 45,
    remarks: "Trip Rajsamand to Sandila"
  },
  {
    id: "def-c-3",
    date: "30/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB5528",
    driverName: "Sintu Prajapat Lamba Hari Singh",
    driverMobile: "9001760978",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Full Fill Up"
  },
  {
    id: "def-c-4",
    date: "30/10/2026",
    filledQty: 40,
    truckNo: "RJ52GA9489",
    driverName: "Bhagwan Singh Banna",
    driverMobile: "9950175377",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Issue 2 Buckets"
  },

  // 29/10/2026 (Total 120 Litre)
  {
    id: "def-c-5",
    date: "29/10/2026",
    filledQty: 40,
    truckNo: "RJ32GD3696",
    driverName: "Nand Singh",
    driverMobile: "9680492489",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Regular Issue"
  },
  {
    id: "def-c-6",
    date: "29/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB5641",
    driverName: "Mahaveer Choudhary",
    driverMobile: "9588014070",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Filled at Station"
  },
  {
    id: "def-c-7",
    date: "29/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB5529",
    driverName: "Sitaram",
    driverMobile: "9772746478",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Trip Dispatch"
  },

  // 28/10/2026 (Total 100 Litre)
  {
    id: "def-c-8",
    date: "28/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB5964",
    driverName: "Kushiram Gurjar",
    driverMobile: "6377445099",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Dispatch Neemrana"
  },
  {
    id: "def-c-9",
    date: "28/10/2026",
    filledQty: 20,
    truckNo: "RJ52GB5963",
    driverName: "Trilok Saini",
    driverMobile: "9529943224",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 1,
    rate: 45,
    remarks: "1 Bucket issued"
  },
  {
    id: "def-c-10",
    date: "28/10/2026",
    filledQty: 40,
    truckNo: "RJ52GA7391",
    driverName: "Mukesh Gurjar Badgaon",
    driverMobile: "6376102337",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Direct Fill"
  },

  // 27/10/2026 (Total 235 Litre)
  {
    id: "def-c-11",
    date: "27/10/2026",
    filledQty: 60,
    truckNo: "RJ52GB2590",
    driverName: "Kalu Gurjar Hindoli",
    driverMobile: "6378733369",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 3,
    rate: 45,
    remarks: "Long Route Trip"
  },
  {
    id: "def-c-12",
    date: "27/10/2026",
    filledQty: 45,
    truckNo: "RJ52GB2585",
    driverName: "Sheitan Gurjar",
    driverMobile: "9024403802",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "45 Litres"
  },
  {
    id: "def-c-13",
    date: "27/10/2026",
    filledQty: 50,
    truckNo: "RJ52GA7335",
    driverName: "Krishan singh",
    driverMobile: "9783314762",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Dispatch"
  },
  {
    id: "def-c-14",
    date: "27/10/2026",
    filledQty: 20,
    truckNo: "RJ52GB5058",
    driverName: "Rajesh Gurjar Kotputli",
    driverMobile: "9001411715",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 1,
    rate: 45,
    remarks: "1 Bucket"
  },
  {
    id: "def-c-15",
    date: "27/10/2026",
    filledQty: 60,
    truckNo: "RJ52GA9428",
    driverName: "Dinesh Khatik",
    driverMobile: "7427830289",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 3,
    rate: 45,
    remarks: "3 Buckets"
  },

  // 26/10/2026 (Total 40 Litre)
  {
    id: "def-c-16",
    date: "26/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB2509",
    driverName: "Aasharam Gurjar",
    driverMobile: "9950561094",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "2 Buckets"
  },

  // 25/10/2026 (Total 245 Litre)
  {
    id: "def-c-17",
    date: "25/10/2026",
    filledQty: 40,
    truckNo: "RJ52GB5964",
    driverName: "Kushiram Gurjar",
    driverMobile: "6377445099",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Regular"
  },
  {
    id: "def-c-18",
    date: "25/10/2026",
    filledQty: 45,
    truckNo: "RJ52GB2585",
    driverName: "Sheitan Gurjar",
    driverMobile: "9024403802",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Trip"
  },
  {
    id: "def-c-19",
    date: "25/10/2026",
    filledQty: 60,
    truckNo: "RJ52GA9489",
    driverName: "Bhagwan Singh Banna",
    driverMobile: "9950175377",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 3,
    rate: 45,
    remarks: "Long Distance"
  },
  {
    id: "def-c-20",
    date: "25/10/2026",
    filledQty: 50,
    truckNo: "RJ52GA7335",
    driverName: "Krishan singh",
    driverMobile: "9783314762",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Regular"
  },
  {
    id: "def-c-21",
    date: "25/10/2026",
    filledQty: 50,
    truckNo: "RJ52GB2590",
    driverName: "Kalu Gurjar Hindoli",
    driverMobile: "6378733369",
    amountPaid: 0,
    isEmptyBucketReturned: "Yes",
    bucketsNotReturned: 0,
    bucketsReturned: 2,
    rate: 45,
    remarks: "Regular"
  }
];
