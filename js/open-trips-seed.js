// Seed dataset for authentic AppSheet Open Trips Register (Matching screencapture-appsheet-start-... and WhatsApp models)
window.OPEN_TRIPS_SEED = [
  // ========================================================
  // AUTHENTIC APPSHEET CARD 4 (TRIPS TOTAL FREIGHT) DATASET
  // Matching screencapture-appsheet-start-...-16_35_41.png & detail_view_*.png
  // Featuring all 7-8 authentic AppSheet row colors:
  // 1. Mustard (#967b2c): Transit
  // 2. Cyan (#00acc1): Truck Owner Payment Pending
  // 3. Purple (#7b1fa2): POD Sent / Bill Generated / SMTC
  // 4. Blue (#0077c2): Cheque Due
  // 5. Pink/Magenta (#e91e63): Off Loading
  // 6. Green (#008a38): Settled
  // 7. Red (#d90429): Negative GR / Shortage
  // 8. Orange (#e65100): Advance Due
  // ========================================================
  // --- 18/10/2026 (Mustard / Transit) ---
  {
    id: 'TRIP_20261018_236', grNo: '2026-2027-236_SMTC', shortGrNo: '236_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-18', date: '2026-10-18', tripEndDate: '2026-10-28',
    truckNo: 'RJ52GA7338', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9571272336',
    driver: 'Bhiam Raj 8616', driverMobile: '8824714693',
    origin: 'Udaipur (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur',
    consignor: 'RBL Natural Resources Ltd.', reference: 'Rajesh Rao Udaipur', referenceMobile: '7023678976',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 82.000, rate: 2200.00, freight: 212872.00, biltyAmount: 180400.00,
    billNo: '', partyPaid: 0.0, partyDue: 212872.00, ownerDue: 212872.00,
    tripStatus: 'Transit', status: 'Transit', colorTheme: 'mustard'
  },
  // --- 17/10/2026 ---
  {
    id: 'TRIP_20261017_2510', grNo: '2026-2027-2510_TTC', shortGrNo: '2510_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-17', date: '2026-10-17',
    truckNo: 'RJ14GH0366', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar 0366', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Gurugram (Haryana)',
    consignor: 'Poonam Marble Siyana', reference: 'Poonam Marble Siyana',
    consignee: 'BBS Construction', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 44.420, rate: 2000.00, freight: 88840.00, biltyAmount: 20000.00,
    billNo: '', partyPaid: 0.0, partyDue: 88840.00, ownerDue: 88840.00,
    tripStatus: 'Transit', status: 'Transit', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261017_2518', grNo: '2026-2027-2518_TTC', shortGrNo: '2518_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-17', date: '2026-10-17',
    truckNo: 'RJ01GC2159', truckOwner: 'Mahendra Rawat Shrinagar', ownerName: 'Mahendra Rawat Shrinagar',
    driver: 'Kaluram Jat Shrinagar', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Ghaziabad (U.P.)',
    consignor: 'Om Saini', reference: 'Om Saini',
    consignee: 'Sharda Paint Industries', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 100.480, rate: 1580.00, freight: 158758.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 158758.00, ownerDue: 158758.00,
    tripStatus: 'Transit', status: 'Transit', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261017_234', grNo: '2026-2027-234_SMTC', shortGrNo: '234_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-17', date: '2026-10-17',
    truckNo: 'RJ52GB5642', truckOwner: 'Shree Mahaveer Transport Company', ownerName: 'Shree Mahaveer Transport Company',
    driver: 'Suresh Raiya', driverMobile: '9636017337',
    origin: 'Rajsamand (Raj.)', destination: 'Neemrana (Raj.)',
    consignor: 'Sudhir Mishra Sarkani kareda', reference: 'Sudhir Mishra Sarkani kareda',
    consignee: 'SAKARNI PLASTER (INDIA) PVT. LTD.', material: 'Gypsum Powder',
    billingType: 'Per Tonne', weight: 104.600, rate: 1130.00, freight: 142140.00, biltyAmount: 142140.00,
    billNo: '', partyPaid: 0.0, partyDue: 142140.00, ownerDue: 142140.00,
    tripStatus: 'Transit', status: 'Transit', colorTheme: 'mustard'
  },
  // --- 15/10/2026 (Cyan, Purple, Mustard) ---
  {
    id: 'TRIP_20261015_2497', grNo: '2026-2027-2497_TTC', shortGrNo: '2497_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-15', date: '2026-10-15', tripEndDate: '2026-10-25',
    truckNo: 'RJ52GB2588', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad', ownerMobile: '9414659401',
    driver: 'Ratan Gurjar 5578', driverMobile: '9521232267',
    origin: 'Rajsamand (Raj.)', destination: 'Jhajjar (Haryana)',
    consignor: 'Balwant Yadav R.B. Dyes and Chemicals', reference: 'Balwant Yadav R.B. Dyes and Chemicals', referenceMobile: '9352200236',
    consignee: 'BirlaNu Ltd. Jhajjar Putty Plant - SBU3', consigneeGstin: '06AAACH2676Q1Z4', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 80.390, rate: 1450.00, freight: 116566.00, biltyAmount: 116566.00,
    billNo: '331', partyPaid: 116566.0, partyDue: 0.0, ownerDue: 115400.00, ownerTotalPayment: 1166.00,
    tripStatus: 'Truck Owner Payment Pending', status: 'Truck Owner Payment Pending', colorTheme: 'cyan'
  },
  {
    id: 'TRIP_20261015_233', grNo: '2026-2027-233_SMTC', shortGrNo: '233_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-15', date: '2026-10-15',
    truckNo: 'RJ52EB5053', truckOwner: 'Shree Mahaveer Transport Company', ownerName: 'Shree Mahaveer Transport Company',
    driver: 'Kanharam Shahpura', driverMobile: '9672109876',
    origin: 'Rajsamand (Raj.)', destination: 'Neemrana (Raj.)',
    consignor: 'Sudhir Mishra Sarkani kareda', reference: 'Sudhir Mishra Sarkani kareda',
    consignee: 'SAKARNI PLASTER (INDIA) PVT. LTD.', consigneeGstin: '08AASCS3036P1ZL Neemrana', consigneeMobile: '8824326001',
    material: 'Gypsum Powder', billingType: 'Per Tonne', weight: 100.400, rate: 1130.00, freight: 133873.00, biltyAmount: 133873.00,
    billNo: '221', partyPaid: 0.0, partyDue: 133873.00, ownerDue: 133873.00,
    tripStatus: 'POD Sent/Bill Generated', status: 'POD Sent/Bill Generated', colorTheme: 'purple'
  },
  {
    id: 'TRIP_20261015_2496', grNo: '2026-2027-2496_TTC', shortGrNo: '2496_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-15', date: '2026-10-15',
    truckNo: 'RJ52GB5336', truckOwner: 'Deepak Dhabas', ownerName: 'Deepak Dhabas',
    driver: 'Bajrang Swami', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)',
    consignor: 'Kunal Micron Vijay Jain', reference: 'Kunal Micron Vijay Jain',
    consignee: 'Berger Paints India Ltd.', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 82.000, rate: 2250.00, freight: 184500.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 184500.00, ownerDue: 184500.00,
    tripStatus: 'Transit', status: 'Transit', colorTheme: 'mustard'
  },
  // --- 14/10/2026 (Royal Blue, Cyan) ---
  {
    id: 'TRIP_20261014_2472', grNo: '2026-2027-2472_TTC', shortGrNo: '2472_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-14', date: '2026-10-14',
    truckNo: 'RJ52GA4594', truckOwner: 'Kailash Chawari', ownerName: 'Kailash Chawari',
    driver: 'Brijesh Gurjar', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Dehradun (U.K.)',
    consignor: 'Mahesh Jinjwadiya', reference: 'Mahesh Jinjwadiya',
    consignee: 'COBBLE STONE PVT. LTD.', material: 'Cobble Stones',
    billingType: 'Per Tonne', weight: 32.490, rate: 3170.00, freight: 102993.00, biltyAmount: 50000.00,
    billNo: '', partyPaid: 0.0, partyDue: 102993.00, ownerDue: 52993.00,
    tripStatus: 'Cheque Due', status: 'Cheque Due', colorTheme: 'blue'
  },
  // --- 13/10/2026 (Off Loading / Magenta) ---
  {
    id: 'TRIP_20261013_2437', grNo: '2026-2027-2437_TTC', shortGrNo: '2437_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB2588', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad',
    driver: 'Ratan Gurjar 5578', driverMobile: '9521232267',
    origin: 'Rajsamand (Raj.)', destination: 'Alwar (Raj.)',
    consignor: 'Virsun Industries', reference: 'Virsun Industries',
    consignee: 'Alwar Dyes', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 75.000, rate: 1200.00, freight: 90000.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 90000.00, ownerDue: 90000.00,
    tripStatus: 'Off Loading', status: 'Off Loading', colorTheme: 'magenta'
  },
  // --- 20/08/2026 (Settled Green, Red Negative GR, Blue) ---
  {
    id: 'TRIP_20260820_1798', grNo: '2026-2027-1798_TTC', shortGrNo: '1798_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-08-20', date: '2026-08-20',
    truckNo: 'RJ52GB3237', truckOwner: 'Radheyshyam Gurjar', ownerName: 'Radheyshyam Gurjar',
    driver: 'Ashok Gurjar', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Chandigarh',
    consignor: 'Kishan Gayri Udaipur', reference: 'Kishan Gayri Udaipur',
    consignee: 'R K MARBLE & GRANITE', material: 'Marble Slabs',
    billingType: 'Per Tonne', weight: 1.000, rate: 2.00, freight: 2.00, biltyAmount: 20000.00,
    billNo: '', partyPaid: 2.0, partyDue: 0.0, ownerDue: 0.0,
    tripStatus: 'Settled', status: 'Settled', colorTheme: 'green'
  },
  {
    id: 'TRIP_20260820_NEG_187', grNo: '2026-2027--187_TTC', shortGrNo: '-187_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-08-20', date: '2026-08-20',
    truckNo: 'RJ52GA6148', truckOwner: 'Mukesh Gurjar 6148', ownerName: 'Mukesh Gurjar 6148',
    driver: 'Mukesh Gurjar 6148', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi',
    consignor: 'Banwari Vaishnav', reference: 'Banwari Vaishnav',
    consignee: 'Delhi Marble Market', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 56.000, rate: 1250.00, freight: 70000.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 70000.0, partyDue: 0.0, ownerDue: 0.0,
    tripStatus: 'Cancelled', status: 'Cancelled', colorTheme: 'red'
  },
  {
    id: 'TRIP_20260820_1796', grNo: '2026-2027-1796_TTC', shortGrNo: '1796_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-08-20', date: '2026-08-20',
    truckNo: 'RJ52GA7391', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad',
    driver: 'Mukesh Gurjar Badgaon', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)',
    consignor: 'Kunal Micron Vijay Jain', reference: 'Kunal Micron Vijay Jain',
    consignee: 'Berger Paints India Ltd.', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 80.000, rate: 2250.00, freight: 180000.00, biltyAmount: 0.0,
    billNo: '247', partyPaid: 177000.0, partyDue: 3000.0, ownerDue: 3000.00,
    tripStatus: 'Cheque Due', status: 'Cheque Due', colorTheme: 'blue'
  },
  // ========================================================
  // AUTHENTIC APPSHEET CARD 3 (TRIPS REGISTER) SCREENSHOT DATASET
  // Matching crop_check_0.png & screencapture-appsheet-start-...-14_19_30.png
  // ========================================================
  // --- 14/10/2026 (1 Trip) ---
  {
    id: 'TRIP_20261014_2483', grNo: '2026-2027-2483_TTC', shortGrNo: '2483_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-14', date: '2026-10-14',
    truckNo: 'RJ52GA7728', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat',
    driver: 'Rajendra Kumar 7728', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Jhajjar (Haryana)', deliveryAddress: 'BirlaNu Ltd. Jhajjar',
    consignor: 'Balwant Yadav R.B. Dyes & Chemicals', reference: 'Balwant Yadav R.B. Dyes & Chemicals',
    consignee: 'BirlaNu Ltd. Jhajjar Putty Plant', material: 'Dolomite Powder',
    billingType: 'Per Tonne', weight: 82.000, rate: 1450.00, freight: 118900.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 118900.00, ownerDue: 118900.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  // --- 13/10/2026 (20 Trips) ---
  {
    id: 'TRIP_20261013_2456', grNo: '2026-2027-2456_TTC', shortGrNo: '2456_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ01GE1235', truckOwner: 'Kalu Ram Yadav Shrinagar', ownerName: 'Kalu Ram Yadav Shrinagar',
    driver: 'Hansraj 1235', driverMobile: '9829123456',
    origin: 'Rajsamand (Raj.)', destination: 'Ghaziabad (U.P.)', deliveryAddress: 'Sharda Paint Industries Ghaziabad',
    consignor: 'Om Saini', reference: 'Om Saini', consignee: 'Sharda Paint Industries',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 100.870, rate: 1580.00, freight: 159375.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 159375.00, ownerDue: 159375.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2455', grNo: '2026-2027-2455_TTC', shortGrNo: '2455_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB5964', truckOwner: 'Shree Mahaveer Transport Co.', ownerName: 'Shree Mahaveer Transport Co.',
    driver: 'Kushiram Gurjar', driverMobile: '9672109876',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Ananta Marble & Granite Delhi',
    consignor: 'Durga Marble Shahdara Delhi', reference: 'Durga Marble Shahdara Delhi',
    consignee: 'Ananta Marble & Granite', material: 'Marble Slabs',
    billingType: 'Per Tonne', weight: 80.000, rate: 1500.00, freight: 120000.00, biltyAmount: 20000.00,
    billNo: '', partyPaid: 0.0, partyDue: 120000.00, ownerDue: 120000.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2466', grNo: '2026-2027-2466_TTC', shortGrNo: '2466_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB2590', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad',
    driver: 'Kalu Gurjar Hindoli', driverMobile: '9928345678',
    origin: 'Rajsamand (Raj.)', destination: 'Lucknow (U.P.)', deliveryAddress: 'Phenobond India Pvt. Ltd. Lucknow',
    consignor: 'Bharat Mineral Pasoond', reference: 'Bharat Mineral Pasoond',
    consignee: 'Phenobond India Pvt. Ltd.', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 42.300, rate: 2050.00, freight: 86715.00, biltyAmount: 86715.00,
    billNo: '', partyPaid: 0.0, partyDue: 86715.00, ownerDue: 86715.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2465', grNo: '2026-2027-2465_TTC', shortGrNo: '2465_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB2590', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad',
    driver: 'Kalu Gurjar Hindoli', driverMobile: '9928345678',
    origin: 'Rajsamand (Raj.)', destination: 'Lucknow (U.P.)', deliveryAddress: 'Phenobond India Pvt. Ltd. Lucknow',
    consignor: 'Bharat Mineral Pasoond', reference: 'Bharat Mineral Pasoond',
    consignee: 'Phenobond India Pvt. Ltd.', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 42.000, rate: 2050.00, freight: 86100.00, biltyAmount: 86100.00,
    billNo: '', partyPaid: 0.0, partyDue: 86100.00, ownerDue: 86100.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_228', grNo: '2026-2027-228_SMTC', shortGrNo: '228_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ14GK1136', truckOwner: 'Sitaram Meena', ownerName: 'Sitaram Meena',
    driver: 'Banti Meena tonk', driverMobile: '9828765432',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Berger Paints India Ltd. Sandila',
    consignor: 'Rajesh Rao Udaipur', reference: 'Rajesh Rao Udaipur',
    consignee: 'Berger Paints India Ltd.', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 80.000, rate: 2200.00, freight: 207680.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 207680.00, ownerDue: 207680.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_230', grNo: '2026-2027-230_SMTC', shortGrNo: '230_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB0724', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat',
    driver: 'Ramkishore Swami', driverMobile: '9414123890',
    origin: 'Rajsamand (Raj.)', destination: 'Neemrana (Raj.)', deliveryAddress: 'Sakarni Plaster Neemrana',
    consignor: 'Sudhir Mishra Sarkani ka...', reference: 'Sudhir Mishra Sarkani ka...',
    consignee: 'SAKARNI PLASTER (INDIA) PVT. LTD.', material: 'Gypsum Powder',
    billingType: 'Per Tonne', weight: 106.100, rate: 1130.00, freight: 141474.00, biltyAmount: 141473.00,
    billNo: '', partyPaid: 0.0, partyDue: 141474.00, ownerDue: 141474.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2478', grNo: '2026-2027-2478_TTC', shortGrNo: '2478_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB3484', truckOwner: 'Deepak Dhabas', ownerName: 'Deepak Dhabas',
    driver: 'Dhanraj Meena 0986', driverMobile: '9784561234',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Shabroc India Kanpur',
    consignor: 'Kamal Ramchandhani', reference: 'Kamal Ramchandhani',
    consignee: 'SHABROC INDIA', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 40.000, rate: 1850.00, freight: 74000.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 74000.00, ownerDue: 74000.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2471', grNo: '2026-2027-2471_TTC', shortGrNo: '2471_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB2509', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat',
    driver: 'Aasharam Gurjar', driverMobile: '9636987123',
    origin: 'Rajsamand (Raj.)', destination: 'Lucknow (U.P.)', deliveryAddress: 'Aawa Industries Lucknow',
    consignor: 'Abhishek Nayati', reference: 'Abhishek Nayati',
    consignee: 'AAWA INDUSTRIES PRIVATE LIMITED', material: 'Tiles / Goods',
    billingType: 'Per Tonne', weight: 1.000, rate: 2100.00, freight: 2100.00, biltyAmount: 25000.00,
    billNo: '', partyPaid: 0.0, partyDue: 2100.00, ownerDue: 2100.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2476', grNo: '2026-2027-2476_TTC', shortGrNo: '2476_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ32GD8541', truckOwner: 'Suresh Khatana', ownerName: 'Suresh Khatana',
    driver: 'suresh khatana 8541', driverMobile: '9828554433',
    origin: 'Rajsamand (Raj.)', destination: 'Cheeka (Haryana)', deliveryAddress: 'Maharaja Marble Cheeka',
    consignor: 'Laxman Gurjar Kelwa', reference: 'Laxman Gurjar Kelwa',
    consignee: 'M/S MAHARAJA MARBLE', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 1.000, rate: 1700.00, freight: 1700.00, biltyAmount: 20000.00,
    billNo: '', partyPaid: 0.0, partyDue: 1700.00, ownerDue: 1700.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2458', grNo: '2026-2027-2458_TTC', shortGrNo: '2458_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ32GC2937', truckOwner: 'Hansraj Gurjar Paota', ownerName: 'Hansraj Gurjar Paota',
    driver: 'Hansraj Gurjar Paota', driverMobile: '9783112233',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Rainbow Stones Delhi',
    consignor: 'Pankit Jain Delhi', reference: 'Pankit Jain Delhi',
    consignee: 'RAINBOW STONES', material: 'Granite Blocks',
    billingType: 'Per Tonne', weight: 32.930, rate: 2690.00, freight: 88582.00, biltyAmount: 30000.00,
    billNo: '', partyPaid: 0.0, partyDue: 88582.00, ownerDue: 88582.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2464', grNo: '2026-2027-2464_TTC', shortGrNo: '2464_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ32GD3696', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat',
    driver: 'Nand Singh', driverMobile: '9829998877',
    origin: 'Rajsamand (Raj.)', destination: 'Sikandrabad (U.P.)', deliveryAddress: 'Akross Coatings Sikandrabad',
    consignor: 'Rishi Aggarwal Maniyana', reference: 'Rishi Aggarwal Maniyana',
    consignee: 'AKROSS COATINGS PRIVATE LIMITED', material: 'Powder Goods',
    billingType: 'Per Tonne', weight: 42.000, rate: 2250.00, freight: 94500.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 94500.00, ownerDue: 94500.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2480', grNo: '2026-2027-2480_TTC', shortGrNo: '2480_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ01GE0121', truckOwner: 'Dinesh Yadav Shrinagar', ownerName: 'Dinesh Yadav Shrinagar',
    driver: 'Abhay Kumar Dhanka', driverMobile: '9928114477',
    origin: 'Rajsamand (Raj.)', destination: 'Haridwar (U.K.)', deliveryAddress: 'Rana Marble Haridwar',
    consignor: 'Ramniwas ji Nilkant Marb...', reference: 'Ramniwas ji Nilkant Marb...',
    consignee: 'RANA MARBLE & GRANITE', material: 'Marble Goods',
    billingType: 'Per Tonne', weight: 1.000, rate: 1700.00, freight: 1700.00, biltyAmount: 25000.00,
    billNo: '', partyPaid: 0.0, partyDue: 1700.00, ownerDue: 1700.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2479', grNo: '2026-2027-2479_TTC', shortGrNo: '2479_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB3484', truckOwner: 'Deepak Dhabas', ownerName: 'Deepak Dhabas',
    driver: 'Dhanraj Meena 0986', driverMobile: '9784561234',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Rohit Chemicals Kanpur',
    consignor: 'Kamal Ramchandhani', reference: 'Kamal Ramchandhani',
    consignee: 'ROHIT CHEMICALS', material: 'Chemical Minerals',
    billingType: 'Per Tonne', weight: 56.230, rate: 1850.00, freight: 104026.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 104026.00, ownerDue: 104026.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2477', grNo: '2026-2027-2477_TTC', shortGrNo: '2477_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ01GD3708', truckOwner: 'Lalaram Choudhary Shrinagar', ownerName: 'Lalaram Choudhary Shrinagar',
    driver: 'Raju Munim', driverMobile: '9414223344',
    origin: 'Rajsamand (Raj.)', destination: 'Baheri (U.P.)', deliveryAddress: 'Neera Marble Baheri',
    consignor: 'Mahaveer Minerals', reference: 'Mahaveer Minerals',
    consignee: 'Neera Marble & Paints', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 1.000, rate: 1700.00, freight: 1700.00, biltyAmount: 25000.00,
    billNo: '', partyPaid: 0.0, partyDue: 1700.00, ownerDue: 1700.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2470', grNo: '2026-2027-2470_TTC', shortGrNo: '2470_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ32GE5388', truckOwner: 'Billo Kasana', ownerName: 'Billo Kasana',
    driver: 'Deva Bhaya', driverMobile: '9672334455',
    origin: 'Rajsamand (Raj.)', destination: 'Kandhala (U.P.)', deliveryAddress: 'Rana Tiles Kandhala',
    consignor: 'Rasid Rana Kandla', reference: 'Rasid Rana Kandla',
    consignee: 'Rana Tiles', material: 'Ceramic Goods',
    billingType: 'Per Tonne', weight: 87.000, rate: 1550.00, freight: 134850.00, biltyAmount: 25000.00,
    billNo: '', partyPaid: 0.0, partyDue: 134850.00, ownerDue: 134850.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2481', grNo: '2026-2027-2481_TTC', shortGrNo: '2481_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB5058', truckOwner: 'Shree Mahaveer Transport Co.', ownerName: 'Shree Mahaveer Transport Co.',
    driver: 'Dinesh Yadav 7729', driverMobile: '9828119900',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Shreekant Marbles Delhi',
    consignor: 'Anil Sharda', reference: 'Anil Sharda',
    consignee: 'Shreekant Marbles', material: 'Marble Goods',
    billingType: 'Per Tonne', weight: 1.000, rate: 1030.00, freight: 1030.00, biltyAmount: 20000.00,
    billNo: '', partyPaid: 0.0, partyDue: 1030.00, ownerDue: 1030.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2473', grNo: '2026-2027-2473_TTC', shortGrNo: '2473_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB5967', truckOwner: 'Shree Mahaveer Transport Co.', ownerName: 'Shree Mahaveer Transport Co.',
    driver: 'Lokesh Choudhary', driverMobile: '9636112233',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Jay Chemical Kanpur',
    consignor: 'Ankush Bansal Jaipur', reference: 'Ankush Bansal Jaipur',
    consignee: 'M/S Jay Chemical Works', material: 'Chemical Minerals',
    billingType: 'Per Tonne', weight: 104.700, rate: 1850.00, freight: 193695.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 193695.00, ownerDue: 193695.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2468', grNo: '2026-2027-2468_TTC', shortGrNo: '2468_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB4586', truckOwner: 'Shree Mahaveer Transport Co.', ownerName: 'Shree Mahaveer Transport Co.',
    driver: 'Narendra Kumar Raiya', driverMobile: '9929887766',
    origin: 'Rajsamand (Raj.)', destination: 'Roorkee (U.K.)', deliveryAddress: 'Aggarwal Organic Roorkee',
    consignor: 'Gagan Bang', reference: 'Gagan Bang',
    consignee: 'AGGARWAL ORGANIC CHEMICALS', material: 'Chemical Powder',
    billingType: 'Per Tonne', weight: 90.040, rate: 1900.00, freight: 171076.00, biltyAmount: 171076.00,
    billNo: '', partyPaid: 0.0, partyDue: 171076.00, ownerDue: 171076.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2474', grNo: '2026-2027-2474_TTC', shortGrNo: '2474_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB3867', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat',
    driver: 'Pratap Singh', driverMobile: '9413221100',
    origin: 'Rajsamand (Raj.)', destination: 'Hathras (U.P.)', deliveryAddress: 'Shakti Enterprises Hathras',
    consignor: 'Kailash Agarwal Alwar', reference: 'Kailash Agarwal Alwar',
    consignee: 'SHAKTI ENTERPRISES', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 92.000, rate: 1620.00, freight: 149040.00, biltyAmount: 149040.00,
    billNo: '', partyPaid: 0.0, partyDue: 149040.00, ownerDue: 149040.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261013_2475', grNo: '2026-2027-2475_TTC', shortGrNo: '2475_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-13', date: '2026-10-13',
    truckNo: 'RJ52GB2587', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad',
    driver: 'Kirshan Saini', driverMobile: '9829778899',
    origin: 'Rajsamand (Raj.)', destination: 'Karnal (Haryana)', deliveryAddress: 'Sun Coating Karnal',
    consignor: 'Virsun Industries', reference: 'Virsun Industries',
    consignee: 'Sun Coating and Chemicals', material: 'Coating Minerals',
    billingType: 'Per Tonne', weight: 85.000, rate: 1700.00, freight: 144500.00, biltyAmount: 144500.00,
    billNo: '', partyPaid: 0.0, partyDue: 144500.00, ownerDue: 144500.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  // --- 12/10/2026 (4 Trips) ---
  {
    id: 'TRIP_20261012_2444', grNo: '2026-2027-2444_TTC', shortGrNo: '2444_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-12', date: '2026-10-12',
    truckNo: 'RJ52GB6041', truckOwner: 'Kailash Dhabas', ownerName: 'Kailash Dhabas',
    driver: 'Manraj Meena 7719', driverMobile: '9784112233',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Kapsons India Kanpur',
    consignor: 'Rishi Kapur Kapsons India', reference: 'Rishi Kapur Kapsons India',
    consignee: 'Kapsons India', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 101.190, rate: 1800.00, freight: 182142.00, biltyAmount: 182142.00,
    billNo: '', partyPaid: 0.0, partyDue: 182142.00, ownerDue: 182142.00,
    tripStatus: 'Cheque due', status: 'Due', colorTheme: 'mustard'
  },
  {
    id: 'TRIP_20261012_2443', grNo: '2026-2027-2443_TTC', shortGrNo: '2443_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-12', date: '2026-10-12',
    truckNo: 'RJ52GB2588', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad',
    driver: 'Ratan Gurjar 5578', driverMobile: '9828665544',
    origin: 'Rajsamand (Raj.)', destination: 'Jhajjar (Haryana)', deliveryAddress: 'BirlaNu Jhajjar Plant',
    consignor: 'Balwant Yadav R.B. Dyes & Chemicals', reference: 'Balwant Yadav R.B. Dyes & Chemicals',
    consignee: 'BirlaNu Ltd. Jhajjar Putty Plant', material: 'Dolomite Powder',
    billingType: 'Per Tonne', weight: 82.000, rate: 1450.00, freight: 118900.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 0.0, partyDue: 118900.00, ownerDue: 118900.00,
    tripStatus: 'Off loading', status: 'Due', colorTheme: 'pink'
  },
  {
    id: 'TRIP_20261012_2438', grNo: '2026-2027-2438_TTC', shortGrNo: '2438_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-12', date: '2026-10-12',
    truckNo: 'RJ52GB4506', truckOwner: 'Shree Mahaveer Transport Co.', ownerName: 'Shree Mahaveer Transport Co.',
    driver: 'Devraj Gurjar', driverMobile: '9414556677',
    origin: 'Rajsamand (Raj.)', destination: 'Bahadurgarh (Haryana)', deliveryAddress: 'Sugan Chand Murari Lal Bahadurgarh',
    consignor: 'Jawahar Minerals Alwar', reference: 'Jawahar Minerals Alwar',
    consignee: 'Sugan Chand Murari Lal', material: 'Mineral Powder',
    billingType: 'Per Tonne', weight: 90.500, rate: 1500.00, freight: 135750.00, biltyAmount: 70000.00,
    billNo: '', partyPaid: 19300.00, partyDue: 116450.00, ownerDue: 135750.00,
    tripStatus: 'Transit', status: 'Due', colorTheme: 'blue'
  },
  {
    id: 'TRIP_20261012_2437', grNo: '2026-2027-2437_TTC', shortGrNo: '2437_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-12', date: '2026-10-12',
    truckNo: 'RJ52GB5963', truckOwner: 'Shree Mahaveer Transport Co.', ownerName: 'Shree Mahaveer Transport Co.',
    driver: 'Trilok Saini', driverMobile: '9636778899',
    origin: 'Rajsamand (Raj.)', destination: 'Bhiwadi (Raj.)', deliveryAddress: 'Home Pride Adhesive Bhiwadi',
    consignor: 'Ritesh Sharma Madhusudan', reference: 'Ritesh Sharma Madhusudan',
    consignee: 'Home Pride Adhesive Pvt. Ltd.', material: 'Powder Goods',
    billingType: 'Per Tonne', weight: 91.490, rate: 1450.00, freight: 132661.00, biltyAmount: 141810.00,
    billNo: '', partyPaid: 0.0, partyDue: 132661.00, ownerDue: 132661.00,
    tripStatus: 'Transit', status: 'Due', colorTheme: 'blue'
  },

  // --- 10/10/2026 (Total: Rs. 1,112,655.00) ---
  {
    id: 'OPEN_20261010_01', grNo: '2026-2027-2411_TTC', shortGrNo: '2411_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GA7310', truckOwner: 'Laxmi Prakash Jat', driver: 'Mukesh Gurjar', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sikandrabad (U.P.)', deliveryAddress: 'Industrial Area Sikandrabad',
    consignor: 'Mukesh Jhangid Dwarkesh', consignee: 'Berger Paints India Ltd.', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 41.0, rate: 2250.0, freight: 92250.0, biltyAmount: 92250.0,
    billNo: '', partyPaid: 0.0, partyDue: 92250.0, ownerDue: 92250.0, status: 'Open',
    reference: 'Mukesh Jhangid Dwarkesh', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261010_02', grNo: '2026-2027-2422_TTC', shortGrNo: '2422_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GB3572', truckOwner: 'Deepak Dhabas', driver: 'Ram Singh', driverMobile: '9828230105',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'UPSIDC Sandila',
    consignor: 'Kunal Micron Vijay Jain', consignee: 'Berger Paints India Ltd.', material: 'Dolomite Powder',
    billingType: 'Per Tonne', weight: 82.0, rate: 2250.0, freight: 184500.0, biltyAmount: 184500.0,
    billNo: '', partyPaid: 0.0, partyDue: 184500.0, ownerDue: 184500.0, status: 'Open',
    reference: 'Kunal Micron Vijay Jain', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261010_03', grNo: '2026-2027-224_SMTC', shortGrNo: '224_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GA9428', truckOwner: 'Laxmi Prakash Jat', driver: 'Sukhdev Gurjar', driverMobile: '9828230106',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Phase 2 Sandila',
    consignor: 'Rajesh Rao Udaipur', consignee: 'Berger Paints India Ltd.', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 82.0, rate: 2200.0, freight: 212872.0, biltyAmount: 212872.0,
    billNo: '', partyPaid: 0.0, partyDue: 212872.0, ownerDue: 212872.0, status: 'Open',
    reference: 'Rajesh Rao Udaipur', colorTheme: 'purple'
  },
  {
    id: 'OPEN_20261010_04', grNo: '2026-2027-2419_TTC', shortGrNo: '2419_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GA8732', truckOwner: 'Rameshwar Prasad', driver: 'Kailash Meena', driverMobile: '9828230107',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area',
    consignor: 'Tanuj Kothari Udaipur', consignee: 'Berger Paints India Ltd.', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 42.0, rate: 2600.0, freight: 109200.0, biltyAmount: 109200.0,
    billNo: '', partyPaid: 0.0, partyDue: 109200.0, ownerDue: 109200.0, status: 'Open',
    reference: 'Tanuj Kothari Udaipur', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261010_05', grNo: '2026-2027-223_SMTC', shortGrNo: '223_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GA8615', truckOwner: 'Sitaram Meena', driver: 'Prakash Jat', driverMobile: '9828230108',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area',
    consignor: 'Rajesh Rao Udaipur', consignee: 'Berger Paints India Ltd.', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 82.0, rate: 2200.0, freight: 212872.0, biltyAmount: 212872.0,
    billNo: '', partyPaid: 0.0, partyDue: 212872.0, ownerDue: 212872.0, status: 'Open',
    reference: 'Rajesh Rao Udaipur', colorTheme: 'purple'
  },
  {
    id: 'OPEN_20261010_06', grNo: '2026-2027-225_SMTC', shortGrNo: '225_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GA8678', truckOwner: 'Rameshwar Prasad', driver: 'Lala Ram', driverMobile: '9828230109',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area',
    consignor: 'Rajesh Rao Udaipur', consignee: 'Berger Paints India Ltd.', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 42.0, rate: 2570.0, freight: 127369.0, biltyAmount: 127369.0,
    billNo: '', partyPaid: 0.0, partyDue: 127369.0, ownerDue: 127369.0, status: 'Open',
    reference: 'Rajesh Rao Udaipur', colorTheme: 'purple'
  },
  {
    id: 'OPEN_20261010_07', grNo: '2026-2027-2423_TTC', shortGrNo: '2423_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-10', date: '2026-10-10',
    truckNo: 'RJ52GB0721', truckOwner: 'Laxmi Prakash Jat', driver: 'Dinesh Gurjar', driverMobile: '9828230110',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Panki Industrial Area',
    consignor: 'Rishi Kapur Kapsons India', consignee: 'Kapsons India', material: 'Chemical Goods',
    billingType: 'Per Tonne', weight: 96.44, rate: 1800.0, freight: 173592.0, biltyAmount: 173592.0,
    billNo: '', partyPaid: 0.0, partyDue: 173592.0, ownerDue: 173592.0, status: 'Open',
    reference: 'Rishi Kapur Kapsons India', colorTheme: 'gold'
  },

  // --- 09/10/2026 (Total: Rs. 1,446,854.00) ---
  {
    id: 'OPEN_20261009_01', grNo: '2026-2027-2397_TTC', shortGrNo: '2397_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GA7719', truckOwner: 'Deepak Dhabas', driver: 'Suraj Bhan', driverMobile: '9828230111',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Panki Phase 1',
    consignor: 'Rishi Kapur Kapsons India', consignee: 'Kapsons India', material: 'Chemical Powder',
    billingType: 'Per Tonne', weight: 94.62, rate: 1800.0, freight: 170316.0, biltyAmount: 170316.0,
    billNo: '', partyPaid: 0.0, partyDue: 170316.0, ownerDue: 170316.0, status: 'Open',
    reference: 'Rishi Kapur Kapsons India', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_02', grNo: '2026-2027-219_SMTC', shortGrNo: '219_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB2274', truckOwner: 'Govind Choudhary', driver: 'Om Prakash', driverMobile: '9828230112',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'UPSIDC Sandila',
    consignor: 'Rajesh Rao Udaipur', consignee: 'Berger Paints India Ltd.', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 80.0, rate: 2200.0, freight: 207680.0, biltyAmount: 207680.0,
    billNo: '', partyPaid: 0.0, partyDue: 207680.0, ownerDue: 207680.0, status: 'Open',
    reference: 'Rajesh Rao Udaipur', colorTheme: 'purple'
  },
  {
    id: 'OPEN_20261009_03', grNo: '2026-2027-2390_TTC', shortGrNo: '2390_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ32GD8541', truckOwner: 'Suresh Khatana', driver: 'Kailash Chand', driverMobile: '9828230113',
    origin: 'Rajsamand (Raj.)', destination: 'Panipat (Haryana)', deliveryAddress: 'Industrial Area Panipat',
    consignor: 'Kailash Agarwal Alwar', consignee: 'PARAS CHEMICALS', material: 'Dolomite Powder',
    billingType: 'Per Tonne', weight: 85.0, rate: 1720.0, freight: 146200.0, biltyAmount: 146200.0,
    billNo: '', partyPaid: 0.0, partyDue: 146200.0, ownerDue: 146200.0, status: 'Open',
    reference: 'Kailash Agarwal Alwar', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_04', grNo: '2026-2027-220_SMTC', shortGrNo: '220_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB2590', truckOwner: 'Rameshwar Prasad', driver: 'Babulal', driverMobile: '9828230114',
    origin: 'Rajsamand (Raj.)', destination: 'Neemrana (Raj.)', deliveryAddress: 'RIICO Neemrana',
    consignor: 'Sudhir Mishra Sarkani ka...', consignee: 'SAKARNI PLASTER (INDI...', material: 'Plaster of Paris',
    billingType: 'Per Tonne', weight: 99.7, rate: 1130.0, freight: 132940.0, biltyAmount: 132939.0,
    billNo: '', partyPaid: 0.0, partyDue: 132940.0, ownerDue: 132940.0, status: 'Open',
    reference: 'Sudhir Mishra Sarkani ka...', colorTheme: 'purple'
  },
  {
    id: 'OPEN_20261009_05', grNo: '2026-2027-2415_TTC', shortGrNo: '2415_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GA0837', truckOwner: 'Panchuram Gurjar', driver: 'Mahendra Singh', driverMobile: '9828230115',
    origin: 'Rajsamand (Raj.)', destination: 'Dehradun (U.K.)', deliveryAddress: 'Transport Nagar Dehradun',
    consignor: 'Rakesh Bihari', consignee: 'Amit Marbles', material: 'Marble Slabs',
    billingType: 'Per Tonne', weight: 49.29, rate: 2450.0, freight: 120761.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 120761.0, ownerDue: 120761.0, status: 'Open',
    reference: 'Rakesh Bihari', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_06', grNo: '2026-2027-2410_TTC', shortGrNo: '2410_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB5058', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Rajendra Kumar', driverMobile: '9828230116',
    origin: 'Rajsamand (Raj.)', destination: 'Baraut (U.P.)', deliveryAddress: 'Baraut Mandi',
    consignor: 'Mahendra Sharma', consignee: 'Jain Marble House', material: 'Marble Blocks',
    billingType: 'Per Tonne', weight: 87.0, rate: 1500.0, freight: 130500.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 130500.0, ownerDue: 130500.0, status: 'Open',
    reference: 'Mahendra Sharma', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_07', grNo: '2026-2027-2409_TTC', shortGrNo: '2409_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GA6603', truckOwner: 'Laxmi Prakash Jat', driver: 'Daya Ram', driverMobile: '9828230117',
    origin: 'Rajsamand (Raj.)', destination: 'SAHIBABAD (U.P.)', deliveryAddress: 'Site 4 Sahibabad',
    consignor: 'Tarachand Kumawat Nira...', consignee: 'MIRAGE MARBLES PVT. LTD.', material: 'Granite Tiles',
    billingType: 'Fixed', weight: 1.0, rate: 1600.0, freight: 1600.0, biltyAmount: 30000.0,
    billNo: '', partyPaid: 0.0, partyDue: 1600.0, ownerDue: 1600.0, status: 'Open',
    reference: 'Tarachand Kumawat Nira...', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_08', grNo: '2026-2027-2394_TTC', shortGrNo: '2394_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GA6366', truckOwner: 'Rameshwar Prasad', driver: 'Bheema Ram', driverMobile: '9828230118',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Transport Nagar',
    consignor: 'Mahaveer Tholiya', consignee: 'M/S KUBER MARBLES AN...', material: 'Marble Tiles',
    billingType: 'Fixed', weight: 1.0, rate: 1900.0, freight: 1900.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 1900.0, ownerDue: 1900.0, status: 'Open',
    reference: 'Mahaveer Tholiya', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_09', grNo: '2026-2027-2412_TTC', shortGrNo: '2412_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ01GC2159', truckOwner: 'Mahendra Rawat Shrinag...', driver: 'Shankar Rawat', driverMobile: '9828230119',
    origin: 'Rajsamand (Raj.)', destination: 'Roorkee (U.K.)', deliveryAddress: 'Roorkee Bypass',
    consignor: 'Manoj Sharma', consignee: 'Dayal Marbles Tiles Uttar...', material: 'Marble Powder',
    billingType: 'Fixed', weight: 1.0, rate: 1650.0, freight: 1650.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 1650.0, ownerDue: 1650.0, status: 'Open',
    reference: 'Manoj Sharma', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_10', grNo: '2026-2027-2413_TTC', shortGrNo: '2413_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GA8679', truckOwner: 'Rameshwar Prasad', driver: 'Kalu Ram', driverMobile: '9828230120',
    origin: 'Rajsamand (Raj.)', destination: 'Kundanpur Lalaganj (U.P.)', deliveryAddress: 'Lalaganj Mandi',
    consignor: 'Dhanraj GoldenRajkumar', consignee: 'URP WALIYULLAH', material: 'Marble Goods',
    billingType: 'Per Tonne', weight: 42.0, rate: 3000.0, freight: 117600.0, biltyAmount: 117600.0,
    billNo: '', partyPaid: 47600.0, partyDue: 70000.0, ownerDue: 70000.0, status: 'Open',
    reference: 'Dhanraj GoldenRajkumar', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_11', grNo: '2026-2027-2417_TTC', shortGrNo: '2417_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ32GE5388', truckOwner: 'Billo Kasana', driver: 'Sunil Gurjar', driverMobile: '9828230121',
    origin: 'Rajsamand (Raj.)', destination: 'Kotputli (Raj.)', deliveryAddress: 'Kotputli Bypass',
    consignor: 'Mangal Choudhary', consignee: 'Sai Marble', material: 'Marble Chips',
    billingType: 'Fixed', weight: 1.0, rate: 2.0, freight: 2.0, biltyAmount: 20000.0,
    billNo: '', partyPaid: 0.0, partyDue: 2.0, ownerDue: 2.0, status: 'Open',
    reference: 'Mangal Choudhary', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_12', grNo: '2026-2027-2407_TTC', shortGrNo: '2407_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB3867', truckOwner: 'Laxmi Prakash Jat', driver: 'Dhanraj', driverMobile: '9828230122',
    origin: 'Rajsamand (Raj.)', destination: 'Keshwana (Raj.)', deliveryAddress: 'RIICO Keshwana',
    consignor: 'Pranjal Malani', consignee: 'Ncl Builtek Limited', material: 'Dolomite Powder',
    billingType: 'Per Tonne', weight: 100.5, rate: 1210.0, freight: 121605.0, biltyAmount: 121605.0,
    billNo: '', partyPaid: 0.0, partyDue: 121605.0, ownerDue: 121605.0, status: 'Open',
    reference: 'Pranjal Malani', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_13', grNo: '2026-2027--253_TTC', shortGrNo: '-253_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB4507', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Raju Gurjar', driverMobile: '9828230123',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Mangolpur Kalan',
    consignor: 'Satish Kumar Jhanwar', consignee: 'Delhi Depot', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 81.0, rate: 1550.0, freight: 125550.0, biltyAmount: 125550.0,
    billNo: '', partyPaid: 0.0, partyDue: 125550.0, ownerDue: 125550.0, status: 'Open',
    reference: 'Satish Kumar Jhanwar', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261009_14', grNo: '2026-2027-2414_TTC', shortGrNo: '2414_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ14GH0366', truckOwner: 'Laxmi Prakash Jat', driver: 'Satveer Singh', driverMobile: '9828230124',
    origin: 'Rajsamand (Raj.)', destination: 'Gurugram (Haryana)', deliveryAddress: 'Sector 37 Gurugram',
    consignor: 'Kothari Marble Saprav Na...', consignee: 'R.K. Infratech', material: 'Marble Tiles',
    billingType: 'Fixed', weight: 1.0, rate: 72140.0, freight: 72140.0, biltyAmount: 72140.0,
    billNo: '', partyPaid: 0.0, partyDue: 72140.0, ownerDue: 72140.0, status: 'Open',
    reference: 'Kothari Marble Saprav Na...', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_15', grNo: '2026-2027-2418_TTC', shortGrNo: '2418_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ01GC4865', truckOwner: 'Shankar Singh Rawat Shr...', driver: 'Shankar Singh', driverMobile: '9828230125',
    origin: 'Rajsamand (Raj.)', destination: 'Mohali (Punjab)', deliveryAddress: 'Phase 7 Mohali',
    consignor: 'Nilesh Malani', consignee: 'GOYAL INDUSTRIES', material: 'Marble Goods',
    billingType: 'Per Tonne', weight: 80.0, rate: 1750.0, freight: 140000.0, biltyAmount: 76000.0,
    billNo: '', partyPaid: 0.0, partyDue: 140000.0, ownerDue: 131200.0, status: 'Open',
    reference: 'Nilesh Malani', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_16', grNo: '2026-2027-2424_TTC', shortGrNo: '2424_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB5640', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Manish Jat', driverMobile: '9828230126',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Mangolpur Kalan',
    consignor: 'Anil Sharda', consignee: 'Shivansh Marble', material: 'Marble Tiles',
    billingType: 'Fixed', weight: 1.0, rate: 1030.0, freight: 1030.0, biltyAmount: 10000.0,
    billNo: '', partyPaid: 0.0, partyDue: 1030.0, ownerDue: 1030.0, status: 'Open',
    reference: 'Anil Sharda', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_17', grNo: '2026-2027-2425_TTC', shortGrNo: '2425_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ52GB5640', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Manish Jat', driverMobile: '9828230126',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Mangolpur Kalan',
    consignor: 'Anil Sharda', consignee: 'Shreekant Marbles', material: 'Marble Tiles',
    billingType: 'Fixed', weight: 1.0, rate: 1030.0, freight: 1030.0, biltyAmount: 10000.0,
    billNo: '', partyPaid: 0.0, partyDue: 1030.0, ownerDue: 1030.0, status: 'Open',
    reference: 'Anil Sharda', colorTheme: 'gold'
  },
  {
    id: 'OPEN_20261009_18', grNo: '2026-2027-2402_TTC', shortGrNo: '2402_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ26GA8214', truckOwner: 'Sitaram Meena', driver: 'Mukesh Meena', driverMobile: '9828230127',
    origin: 'Rajsamand (Raj.)', destination: 'Bareilly (U.P.)', deliveryAddress: 'Bareilly Mandi',
    consignor: 'Sitaram Meena', consignee: 'Kishangarh Makrana Mar...', material: 'Marble Blocks',
    billingType: 'Fixed', weight: 1.0, rate: 1950.0, freight: 1950.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 1950.0, ownerDue: 1950.0, status: 'Open',
    reference: 'Sitaram Meena', colorTheme: 'gold'
  },

  // --- 08/10/2026 (Total: Rs. 2,499,075.00) ---
  {
    id: 'OPEN_20261008_01', grNo: '2026-2027-2384_TTC', shortGrNo: '2384_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB2510', truckOwner: 'Laxmi Prakash Jat', driver: 'Dhanraj Gurjar', driverMobile: '9828230128',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Mangolpur Kalan',
    consignor: 'Oswal Mineral Amet', consignee: 'Taple Industries', material: 'Mineral Powder',
    billingType: 'Per Tonne', weight: 85.5, rate: 1730.0, freight: 147915.0, biltyAmount: 147915.0,
    billNo: '', partyPaid: 0.0, partyDue: 147915.0, ownerDue: 147915.0, status: 'Open',
    reference: 'Oswal Mineral Amet', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_02', grNo: '2026-2027-2381_TTC', shortGrNo: '2381_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ32GD3696', truckOwner: 'Laxmi Prakash Jat', driver: 'Raju Jat', driverMobile: '9828230129',
    origin: 'Rajsamand (Raj.)', destination: 'Noida (U.P.)', deliveryAddress: 'Sector 63 Noida',
    consignor: 'Satyajeet Khatri', consignee: 'Gajindra Polytech', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 42.68, rate: 2150.0, freight: 91762.0, biltyAmount: 91762.0,
    billNo: '', partyPaid: 0.0, partyDue: 91762.0, ownerDue: 91762.0, status: 'Open',
    reference: 'Satyajeet Khatri', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_03', grNo: '2026-2027-2391_TTC', shortGrNo: '2391_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ08GB2298', truckOwner: 'Pratap Singh', driver: 'Gopal Singh', driverMobile: '9828230130',
    origin: 'Rajsamand (Raj.)', destination: 'Shahjahanpur (U.P.)', deliveryAddress: 'Shahjahanpur Mandi',
    consignor: 'Shivraj Dan Jalore', consignee: 'V. P. CONSTRUCTION', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 53.0, rate: 2600.0, freight: 87800.0, biltyAmount: 50000.0,
    billNo: '', partyPaid: 0.0, partyDue: 87800.0, ownerDue: 87800.0, status: 'Open',
    reference: 'Shivraj Dan Jalore', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_04', grNo: '2026-2027-218_SMTC', shortGrNo: '218_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB5641', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Manga Ram', driverMobile: '9828230131',
    origin: 'Rajsamand (Raj.)', destination: 'Ghaziabad (U.P.)', deliveryAddress: 'Loni Industrial Area',
    consignor: 'Shubham Chemical Ghazi...', consignee: 'Shubham Chemicals', material: 'Chemicals',
    billingType: 'Per Tonne', weight: 95.5, rate: 1550.0, freight: 174670.0, biltyAmount: 174670.0,
    billNo: '', partyPaid: 0.0, partyDue: 174670.0, ownerDue: 174670.0, status: 'Open',
    reference: 'Shubham Chemical Ghazi...', colorTheme: 'purple'
  },
  {
    id: 'OPEN_20261008_05', grNo: '2026-2027-2387_TTC', shortGrNo: '2387_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB4573', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Kalu Ram', driverMobile: '9828230132',
    origin: 'Rajsamand (Raj.)', destination: 'Kanpur (U.P.)', deliveryAddress: 'Panki Phase 2',
    consignor: 'Mohan Ji Kishangarh', consignee: 'M/S Ansh Marble', material: 'Marble Powder',
    billingType: 'Per Tonne', weight: 98.28, rate: 1900.0, freight: 186732.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 186732.0, ownerDue: 186732.0, status: 'Open',
    reference: 'Mohan Ji Kishangarh', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_06', grNo: '2026-2027-2403_TTC', shortGrNo: '2403_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GA8733', truckOwner: 'Rameshwar Prasad', driver: 'Kailash Meena', driverMobile: '9828230133',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area',
    consignor: 'Indore Devendra Soni Ma...', consignee: 'Berger Paints India Ltd.', material: 'Calcite Powder',
    billingType: 'Per Tonne', weight: 42.0, rate: 2700.0, freight: 113400.0, biltyAmount: 113400.0,
    billNo: '', partyPaid: 0.0, partyDue: 113400.0, ownerDue: 113400.0, status: 'Open',
    reference: 'Indore Devendra Soni Ma...', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_07', grNo: '2026-2027-2399_TTC', shortGrNo: '2399_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB2588', truckOwner: 'Rameshwar Prasad', driver: 'Mahesh Jat', driverMobile: '9828230134',
    origin: 'Rajsamand (Raj.)', destination: 'Bhiwadi (Raj.)', deliveryAddress: 'RIICO Bhiwadi',
    consignor: 'Aahish Aggarwal Alwar', consignee: 'Alcolite India Road Safet...', material: 'Road Safety Materials',
    billingType: 'Per Tonne', weight: 82.2, rate: 1450.0, freight: 119190.0, biltyAmount: 119190.0,
    billNo: '', partyPaid: 0.0, partyDue: 119190.0, ownerDue: 119190.0, status: 'Open',
    reference: 'Aahish Aggarwal Alwar', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_08', grNo: '2026-2027-2392_TTC', shortGrNo: '2392_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB5964', truckOwner: 'Shree Mahaveer Transpo...', driver: 'Lalit Kumar', driverMobile: '9828230135',
    origin: 'Rajsamand (Raj.)', destination: 'Khatauli (U.P.)', deliveryAddress: 'Sugar Mill Khatauli',
    consignor: 'Jagdish Teli', consignee: 'M/S Shiba Marble Tile Ho...', material: 'Marble Tiles',
    billingType: 'Per Tonne', weight: 90.7, rate: 1600.0, freight: 145120.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 145120.0, ownerDue: 145120.0, status: 'Open',
    reference: 'Jagdish Teli', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_09', grNo: '2026-2027-2389_TTC', shortGrNo: '2389_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GA7333', truckOwner: 'Laxmi Prakash Jat', driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Jhajjar (Haryana)', deliveryAddress: 'Jhajjar Bypass',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignee: 'BirlaNu Ltd. Jhajjar Putt...', material: 'Dyes & Chemicals',
    billingType: 'Per Tonne', weight: 81.0, rate: 1450.0, freight: 117450.0, biltyAmount: 117450.0,
    billNo: '', partyPaid: 0.0, partyDue: 117450.0, ownerDue: 117450.0, status: 'Open',
    reference: 'Balwant Yadav R.B. Dyes ...', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_10', grNo: '2026-2027-2401_TTC', shortGrNo: '2401_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ01GE0121', truckOwner: 'Dinesh Yadav Shrinagar', driver: 'Dinesh Yadav', driverMobile: '9828230137',
    origin: 'Rajsamand (Raj.)', destination: 'Haridwar (U.K.)', deliveryAddress: 'SIIDCUL Haridwar',
    consignor: 'Vishnu Khandelwal', consignee: 'M/S Hari Om Marble and ...', material: 'Marble Blocks',
    billingType: 'Per Tonne', weight: 102.0, rate: 1700.0, freight: 173400.0, biltyAmount: 25000.0,
    billNo: '', partyPaid: 0.0, partyDue: 173400.0, ownerDue: 173400.0, status: 'Open',
    reference: 'Vishnu Khandelwal', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_11', grNo: '2026-2027-2404_TTC', shortGrNo: '2404_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB2587', truckOwner: 'Rameshwar Prasad', driver: 'Raju Gurjar', driverMobile: '9828230138',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Mangolpur Kalan',
    consignor: 'Chintu Bansal', consignee: 'Om Shanti Marbles and G...', material: 'Granite Slabs',
    billingType: 'Per Tonne', weight: 82.98, rate: 1500.0, freight: 124470.0, biltyAmount: 20000.0,
    billNo: '', partyPaid: 0.0, partyDue: 124470.0, ownerDue: 124470.0, status: 'Open',
    reference: 'Chintu Bansal', colorTheme: 'magenta'
  },
  {
    id: 'OPEN_20261008_12', grNo: '2026-2027-2406_TTC', shortGrNo: '2406_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ52GB2508', truckOwner: 'Laxmi Prakash Jat', driver: 'Daya Ram', driverMobile: '9828230139',
    origin: 'Rajsamand (Raj.)', destination: 'Delhi', deliveryAddress: 'Mangolpur Kalan',
    consignor: 'Anil Sharda', consignee: 'Madhav Marble', material: 'Marble Tiles',
    billingType: 'Fixed', weight: 1.0, rate: 10000.0, freight: 10000.0, biltyAmount: 10000.0,
    billNo: '', partyPaid: 0.0, partyDue: 10000.0, ownerDue: 10000.0, status: 'Open',
    reference: 'Anil Sharda', colorTheme: 'magenta'
  },
  // ========================================================
  // AUTHENTIC APPSHEET CARD 8 (RATE DIFFERENCE) DATASET
  // Matching screencapture-appsheet-start-...-18_30_45.png & detail views
  // Featuring authentic teal bullets (#01cebc), red Owner Due (#cc0b0b),
  // and gold Bill bullets (#c3b15a).
  // ========================================================
  // --- 12/10/2026 (Owner Due sum: ₹ 5,800.00) ---
  {
    id: 'RATE_DIFF_20261012_2460', grNo: '2026-2027-2460_TTC', shortGrNo: '2460_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-12', date: '2026-10-12', tripEndDate: '2026-10-22',
    truckNo: 'RJ32GC0997', truckOwner: 'Dinesh Yadav Shrinagar', ownerName: 'Dinesh Yadav Shrinagar', ownerMobile: '9828230137', ownerMobile2: '9462495071',
    driver: 'Mukesh Gurjar 0997', driverMobile: '9636592233', driverMobile2: '9784687522',
    origin: 'Rajsamand (Raj.)', destination: 'Sonepat (Haryana)', deliveryAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'BirlaNu Ltd.', consigneeGstin: '06AABCB0976E2ZS', consigneeMobile: '9151068884', consigneeMobile2: '9415044003',
    material: 'Dolomite Powder', billingType: 'Per Tonne', weight: 92.800, rate: 1300.00, freight: 120640.00, biltyAmount: 120640.00,
    billNo: '', partyPaid: 120640.00, partyDue: 0.00, ownerDue: 5800.00, ownerFreight: 120640.00, ownerTotalPayment: 120640.00, ownerBalance: 5800.00,
    rateDiff: 5800.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal',
    payments: [
      { id: 'TOP_2460_1', date: '2026-10-12', paymentDate: '2026-10-12', amount: 114840.00, amountPaid: 114840.00, mode: 'Cheque', description: '2460_TTC', beneficiary: 'Dinesh Yadav Shrinagar', paidTo: 'Truck Owner', fromBank: 'MTC', toBank: 'IDBI' },
      { id: 'TOP_2460_2', date: '2026-10-12', paymentDate: '2026-10-12', amount: 4600.00, amountPaid: 4600.00, mode: 'Online Payment', description: '2460_TTC', beneficiary: 'Dinesh Yadav Shrinagar', paidTo: 'Truck Owner', fromBank: 'MTC', toBank: 'SBI' }
    ],
    debts: [
      { id: 'DEBT_2460_1', type: 'Commission', amount: 2000.00, description: 'Commission 2460_TTC' },
      { id: 'DEBT_2460_2', type: 'Other', amount: 4400.00, description: 'Other 2460_TTC' }
    ]
  },
  // --- 09/10/2026 (Owner Due sum: ₹ 5,000.00) ---
  {
    id: 'RATE_DIFF_20261009_2418', grNo: '2026-2027-2418_TTC', shortGrNo: '2418_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-09', date: '2026-10-09',
    truckNo: 'RJ01GC4865', truckOwner: 'Bhagwan Singh Jat', ownerName: 'Bhagwan Singh Jat', ownerMobile: '9828230125',
    driver: 'Shankar Singh Rawat', driverMobile: '9828230125',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Phase 2 Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 80.000, rate: 1900.00, freight: 152000.00, biltyAmount: 76000.00,
    billNo: '', partyPaid: 152000.00, partyDue: 0.00, ownerDue: 5000.00, ownerFreight: 152000.00, ownerTotalPayment: 152000.00, ownerBalance: 5000.00,
    rateDiff: 5000.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 08/10/2026 (Owner Due sum: ₹ 7,397.00) ---
  {
    id: 'RATE_DIFF_20261008_2396', grNo: '2026-2027-2396_TTC', shortGrNo: '2396_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ01GE1235', truckOwner: 'Mukesh Somani', ownerName: 'Mukesh Somani', ownerMobile: '9414659401',
    driver: 'Mukesh Gurjar', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Bhilwara (Raj.)', deliveryAddress: 'Atun Road Bhilwara',
    consignor: 'Mukesh Somani', consignorAddress: 'Bhilwara Bypass', consignorGstin: '08AABCS9988D1Z2',
    reference: 'Mukesh Somani', referenceMobile: '9414659401',
    consignee: 'Sangam India Ltd.', consigneeGstin: '08AAACS1122D1Z3',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 90.000, rate: 1600.00, freight: 144000.00, biltyAmount: 144000.00,
    billNo: '', partyPaid: 144000.00, partyDue: 0.00, ownerDue: 1440.00, ownerFreight: 144000.00, ownerTotalPayment: 144000.00, ownerBalance: 1440.00,
    rateDiff: 1440.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20261008_2400', grNo: '2026-2027-2400_TTC', shortGrNo: '2400_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-08', date: '2026-10-08',
    truckNo: 'RJ32GC0997', truckOwner: 'Dinesh Yadav Shrinagar', ownerName: 'Dinesh Yadav Shrinagar', ownerMobile: '9828230137',
    driver: 'Mukesh Gurjar 0997', driverMobile: '9636592233',
    origin: 'Rajsamand (Raj.)', destination: 'Sonepat (Haryana)', deliveryAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'BirlaNu Ltd.', consigneeGstin: '06AABCB0976E2ZS',
    material: 'Dolomite Powder', billingType: 'Per Tonne', weight: 95.300, rate: 1300.00, freight: 123890.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 123890.00, partyDue: 0.00, ownerDue: 5957.00, ownerFreight: 123890.00, ownerTotalPayment: 123890.00, ownerBalance: 5957.00,
    rateDiff: 5957.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 06/10/2026 (Owner Due sum: ₹ 5,597.00) ---
  {
    id: 'RATE_DIFF_20261006_2375', grNo: '2026-2027-2375_TTC', shortGrNo: '2375_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-06', date: '2026-10-06',
    truckNo: 'RJ01GC2159', truckOwner: 'Mahendra Rawat Shrinagar', ownerName: 'Mahendra Rawat Shrinagar', ownerMobile: '9784175913',
    driver: 'Kaluram Jat Shrinagar', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Hapur (U.P.)', deliveryAddress: 'Modi Nagar Road Hapur',
    consignor: 'Sunita Sharma', consignorAddress: 'Hapur Industrial Area', consignorGstin: '09AAACS4455E1Z1',
    reference: 'Sunita Sharma', referenceMobile: '9784175913',
    consignee: 'Modi Naturals Ltd.', consigneeGstin: '09AABCM8899F1Z2',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 96.000, rate: 1375.00, freight: 132000.00, biltyAmount: 82000.00,
    billNo: '', partyPaid: 132000.00, partyDue: 0.00, ownerDue: 5597.00, ownerFreight: 132000.00, ownerTotalPayment: 132000.00, ownerBalance: 5597.00,
    rateDiff: 5597.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 05/10/2026 (Owner Due sum: ₹ 6,573.00) ---
  {
    id: 'RATE_DIFF_20261005_2353', grNo: '2026-2027-2353_TTC', shortGrNo: '2353_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-05', date: '2026-10-05',
    truckNo: 'RJ32GC0997', truckOwner: 'Dinesh Yadav Shrinagar', ownerName: 'Dinesh Yadav Shrinagar', ownerMobile: '9828230137',
    driver: 'Mukesh Gurjar 0997', driverMobile: '9636592233',
    origin: 'Rajsamand (Raj.)', destination: 'Sonepat (Haryana)', deliveryAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'BirlaNu Ltd.', consigneeGstin: '06AABCB0976E2ZS',
    material: 'Dolomite Powder', billingType: 'Per Tonne', weight: 101.200, rate: 1300.00, freight: 131560.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 131560.00, partyDue: 0.00, ownerDue: 6573.00, ownerFreight: 131560.00, ownerTotalPayment: 131560.00, ownerBalance: 6573.00,
    rateDiff: 6573.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 04/10/2026 (Owner Due sum: ₹ 274.00) ---
  {
    id: 'RATE_DIFF_20261004_2344', grNo: '2026-2027-2344_TTC', shortGrNo: '2344_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-04', date: '2026-10-04',
    truckNo: 'RJ52GB0964', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 93.480, rate: 1800.00, freight: 168264.00, biltyAmount: 168264.00,
    billNo: '', partyPaid: 168264.00, partyDue: 0.00, ownerDue: 274.00, ownerFreight: 168264.00, ownerTotalPayment: 168264.00, ownerBalance: 274.00,
    rateDiff: 274.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 03/10/2026 (Owner Due sum: ₹ 4,333.00) ---
  {
    id: 'RATE_DIFF_20261003_2321', grNo: '2026-2027-2321_TTC', shortGrNo: '2321_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-03', date: '2026-10-03',
    truckNo: 'RJ52GA3498', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 100.700, rate: 1800.00, freight: 181800.00, biltyAmount: 181800.00,
    billNo: '306', partyPaid: 181800.00, partyDue: 0.00, ownerDue: 1813.00, ownerFreight: 181800.00, ownerTotalPayment: 181800.00, ownerBalance: 1813.00,
    rateDiff: 1813.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20261003_2325', grNo: '2026-2027-2325_TTC', shortGrNo: '2325_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-03', date: '2026-10-03',
    truckNo: 'RJ32GD8541', truckOwner: 'Rameshwar Prasad', ownerName: 'Rameshwar Prasad', ownerMobile: '9828230138',
    driver: 'Raju Gurjar', driverMobile: '9828230138',
    origin: 'Rajsamand (Raj.)', destination: 'Bahadurgarh (Haryana)', deliveryAddress: 'M.I.E. Bahadurgarh',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'Somany Ceramics Ltd.', consigneeGstin: '06AAACS8899D1Z4',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 84.000, rate: 1200.00, freight: 100800.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 100800.00, partyDue: 0.00, ownerDue: 2520.00, ownerFreight: 100800.00, ownerTotalPayment: 100800.00, ownerBalance: 2520.00,
    rateDiff: 2520.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 01/10/2026 (Owner Due sum: ₹ 4,855.00) ---
  {
    id: 'RATE_DIFF_20261001_2283', grNo: '2026-2027-2283_TTC', shortGrNo: '2283_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-01', date: '2026-10-01',
    truckNo: 'RJ52GA7338', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar 0366', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 83.400, rate: 1800.00, freight: 150120.00, biltyAmount: 150120.00,
    billNo: '310', partyPaid: 150120.00, partyDue: 0.00, ownerDue: 1501.00, ownerFreight: 150120.00, ownerTotalPayment: 150120.00, ownerBalance: 1501.00,
    rateDiff: 1501.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20261001_2296', grNo: '2026-2027-2296_TTC', shortGrNo: '2296_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-01', date: '2026-10-01',
    truckNo: 'RJ52GB1214', truckOwner: 'Bhagwan Singh Jat', ownerName: 'Bhagwan Singh Jat', ownerMobile: '9828230125',
    driver: 'Shankar Singh', driverMobile: '9828230125',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 69.700, rate: 1800.00, freight: 125460.00, biltyAmount: 125460.00,
    billNo: '', partyPaid: 125460.00, partyDue: 0.00, ownerDue: 1254.00, ownerFreight: 125460.00, ownerTotalPayment: 125460.00, ownerBalance: 1254.00,
    rateDiff: 1254.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20261001_2297', grNo: '2026-2027-2297_TTC', shortGrNo: '2297_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-10-01', date: '2026-10-01',
    truckNo: 'RJ52GA7333', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9571272336',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Bahadurgarh (Haryana)', deliveryAddress: 'M.I.E. Bahadurgarh',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'Somany Ceramics Ltd.', consigneeGstin: '06AAACS8899D1Z4',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 70.000, rate: 1200.00, freight: 84000.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 84000.00, partyDue: 0.00, ownerDue: 2100.00, ownerFreight: 84000.00, ownerTotalPayment: 84000.00, ownerBalance: 2100.00,
    rateDiff: 2100.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 30/09/2026 (Owner Due sum: ₹ 1,877.00) ---
  {
    id: 'RATE_DIFF_20260930_2266', grNo: '2026-2027-2266_TTC', shortGrNo: '2266_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-30', date: '2026-09-30',
    truckNo: 'RJ52GA9994', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 104.300, rate: 1800.00, freight: 187740.00, biltyAmount: 187740.00,
    billNo: '316', partyPaid: 187740.00, partyDue: 0.00, ownerDue: 1877.00, ownerFreight: 187740.00, ownerTotalPayment: 187740.00, ownerBalance: 1877.00,
    rateDiff: 1877.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 29/09/2026 (Owner Due sum: ₹ 1,762.00) ---
  {
    id: 'RATE_DIFF_20260929_2273', grNo: '2026-2027-2273_TTC', shortGrNo: '2273_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-29', date: '2026-09-29',
    truckNo: 'RJ14GH0366', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar 0366', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 97.900, rate: 1800.00, freight: 176220.00, biltyAmount: 176220.00,
    billNo: '', partyPaid: 176220.00, partyDue: 0.00, ownerDue: 1762.00, ownerFreight: 176220.00, ownerTotalPayment: 176220.00, ownerBalance: 1762.00,
    rateDiff: 1762.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 28/09/2026 (Owner Due sum: ₹ 5,837.00) ---
  {
    id: 'RATE_DIFF_20260928_2245', grNo: '2026-2027-2245_TTC', shortGrNo: '2245_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-28', date: '2026-09-28',
    truckNo: 'RJ52GA7339', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 60.000, rate: 2000.00, freight: 120000.00, biltyAmount: 120000.00,
    billNo: '', partyPaid: 120000.00, partyDue: 0.00, ownerDue: 1200.00, ownerFreight: 120000.00, ownerTotalPayment: 120000.00, ownerBalance: 1200.00,
    rateDiff: 1200.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20260928_2251', grNo: '2026-2027-2251_TTC', shortGrNo: '2251_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-28', date: '2026-09-28',
    truckNo: 'RJ52GA7333', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9571272336',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 39.800, rate: 1800.00, freight: 71700.00, biltyAmount: 71700.00,
    billNo: '', partyPaid: 71700.00, partyDue: 0.00, ownerDue: 717.00, ownerFreight: 71700.00, ownerTotalPayment: 71700.00, ownerBalance: 717.00,
    rateDiff: 717.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20260928_201', grNo: '2026-2027-201_SMTC', shortGrNo: '201_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-28', date: '2026-09-28',
    truckNo: 'RJ52GB1214', truckOwner: 'Bhagwan Singh Jat', ownerName: 'Bhagwan Singh Jat', ownerMobile: '9828230125',
    driver: 'Shankar Singh', driverMobile: '9828230125',
    origin: 'Rajsamand (Raj.)', destination: 'Sikandrabad (U.P.)', deliveryAddress: 'UPSIDC Sikandrabad',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'Orient Bell Ltd.', consigneeGstin: '09AABCO5566G1Z3',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 98.000, rate: 1000.00, freight: 98000.00, biltyAmount: 98000.00,
    billNo: '', partyPaid: 98000.00, partyDue: 0.00, ownerDue: 3920.00, ownerFreight: 98000.00, ownerTotalPayment: 98000.00, ownerBalance: 3920.00,
    rateDiff: 3920.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 27/09/2026 (Owner Due sum: ₹ 11,440.00) ---
  {
    id: 'RATE_DIFF_20260927_2239', grNo: '2026-2027-2239_TTC', shortGrNo: '2239_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-27', date: '2026-09-27',
    truckNo: 'RJ01GC2159', truckOwner: 'Mahendra Rawat Shrinagar', ownerName: 'Mahendra Rawat Shrinagar', ownerMobile: '9784175913',
    driver: 'Kaluram Jat Shrinagar', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9784175913',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 88.000, rate: 1300.00, freight: 114400.00, biltyAmount: 114400.00,
    billNo: '', partyPaid: 114400.00, partyDue: 0.00, ownerDue: 11440.00, ownerFreight: 114400.00, ownerTotalPayment: 114400.00, ownerBalance: 11440.00,
    rateDiff: 11440.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 25/09/2026 (Owner Due sum: ₹ 16,486.00) ---
  {
    id: 'RATE_DIFF_20260925_2211', grNo: '2026-2027-2211_TTC', shortGrNo: '2211_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-25', date: '2026-09-25',
    truckNo: 'RJ52GB0964', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 49.600, rate: 1800.00, freight: 89280.00, biltyAmount: 89280.00,
    billNo: '', partyPaid: 89280.00, partyDue: 0.00, ownerDue: 893.00, ownerFreight: 89280.00, ownerTotalPayment: 89280.00, ownerBalance: 893.00,
    rateDiff: 893.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20260925_199', grNo: '2026-2027-199_SMTC', shortGrNo: '199_SMTC', transport: 'SMTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-25', date: '2026-09-25',
    truckNo: 'RJ32GC0997', truckOwner: 'Dinesh Yadav Shrinagar', ownerName: 'Dinesh Yadav Shrinagar', ownerMobile: '9828230137',
    driver: 'Mukesh Gurjar 0997', driverMobile: '9636592233',
    origin: 'Rajsamand (Raj.)', destination: 'Sonepat (Haryana)', deliveryAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029',
    consignor: 'Balwant Yadav R.B. Dyes ...', consignorAddress: 'B-4/244 B, Safdarjung Enclave, New Delhi - 110029', consignorGstin: '07AAUFB4244E1ZS',
    reference: 'Balwant Yadav R.B. Dyes ...', referenceMobile: '9887479777',
    consignee: 'BirlaNu Ltd.', consigneeGstin: '06AABCB0976E2ZS',
    material: 'Dolomite Powder', billingType: 'Per Tonne', weight: 82.880, rate: 1200.00, freight: 99456.00, biltyAmount: 0.0,
    billNo: '', partyPaid: 99456.00, partyDue: 0.00, ownerDue: 4973.00, ownerFreight: 99456.00, ownerTotalPayment: 99456.00, ownerBalance: 4973.00,
    rateDiff: 4973.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20260925_2216', grNo: '2026-2027-2216_TTC', shortGrNo: '2216_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-25', date: '2026-09-25',
    truckNo: 'RJ01GE0121', truckOwner: 'Dinesh Yadav Shrinagar', ownerName: 'Dinesh Yadav Shrinagar', ownerMobile: '9828230137',
    driver: 'Dinesh Yadav', driverMobile: '9828230137',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9828230137',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 88.500, rate: 1200.00, freight: 106200.00, biltyAmount: 106200.00,
    billNo: '', partyPaid: 106200.00, partyDue: 0.00, ownerDue: 10620.00, ownerFreight: 106200.00, ownerTotalPayment: 106200.00, ownerBalance: 10620.00,
    rateDiff: 10620.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 23/09/2026 (Owner Due sum: ₹ 17,170.00) ---
  {
    id: 'RATE_DIFF_20260923_2235', grNo: '2026-2027-2235_TTC', shortGrNo: '2235_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-23', date: '2026-09-23',
    truckNo: 'RJ14GH0366', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar 0366', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9414659401',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 88.000, rate: 1300.00, freight: 114400.00, biltyAmount: 114400.00,
    billNo: '', partyPaid: 114400.00, partyDue: 0.00, ownerDue: 5730.00, ownerFreight: 114400.00, ownerTotalPayment: 114400.00, ownerBalance: 5730.00,
    rateDiff: 5730.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20260923_2192', grNo: '2026-2027-2192_TTC', shortGrNo: '2192_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-23', date: '2026-09-23',
    truckNo: 'RJ52GA3498', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9414659401',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 88.000, rate: 1300.00, freight: 114400.00, biltyAmount: 114400.00,
    billNo: '', partyPaid: 114400.00, partyDue: 0.00, ownerDue: 11440.00, ownerFreight: 114400.00, ownerTotalPayment: 114400.00, ownerBalance: 11440.00,
    rateDiff: 11440.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- 20/09/2026 (Owner Due sum: ₹ 22,880.00) ---
  {
    id: 'RATE_DIFF_20260920_2155', grNo: '2026-2027-2155_TTC', shortGrNo: '2155_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-20', date: '2026-09-20',
    truckNo: 'RJ52GA7338', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Vijay Gurjar 0366', driverMobile: '9828230104',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9414659401',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 88.000, rate: 1300.00, freight: 114400.00, biltyAmount: 114400.00,
    billNo: '269', partyPaid: 114400.00, partyDue: 0.00, ownerDue: 11440.00, ownerFreight: 114400.00, ownerTotalPayment: 114400.00, ownerBalance: 11440.00,
    rateDiff: 11440.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20260920_2156', grNo: '2026-2027-2156_TTC', shortGrNo: '2156_TTC', transport: 'TTC',
    financialYear: '2026-2027', tripStartDate: '2026-09-20', date: '2026-09-20',
    truckNo: 'RJ01GC4865', truckOwner: 'Bhagwan Singh Jat', ownerName: 'Bhagwan Singh Jat', ownerMobile: '9828230125',
    driver: 'Shankar Singh Rawat', driverMobile: '9828230125',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9828230125',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 88.000, rate: 1300.00, freight: 114400.00, biltyAmount: 114400.00,
    billNo: '', partyPaid: 114400.00, partyDue: 0.00, ownerDue: 11440.00, ownerFreight: 114400.00, ownerTotalPayment: 114400.00, ownerBalance: 11440.00,
    rateDiff: 11440.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  // --- FY 2025-2026 (Owner Due sum: ₹ 778,900.00) ---
  {
    id: 'RATE_DIFF_20250515_121', grNo: '2025-2026-121_MTC', shortGrNo: '121_MTC', transport: 'MTC',
    financialYear: '2025-2026', tripStartDate: '2025-05-15', date: '2025-05-15',
    truckNo: 'RJ01GC2159', truckOwner: 'Mahendra Rawat Shrinagar', ownerName: 'Mahendra Rawat Shrinagar', ownerMobile: '9784175913',
    driver: 'Kaluram Jat Shrinagar', driverMobile: '9784175913',
    origin: 'Rajsamand (Raj.)', destination: 'Bawal (Haryana)', deliveryAddress: 'HSIIDC Growth Centre Bawal',
    consignor: 'Vishnu Khandelwal', consignorAddress: 'Nathdwara Road Rajsamand', consignorGstin: '08AAPFV6677H1Z5',
    reference: 'Vishnu Khandelwal', referenceMobile: '9784175913',
    consignee: 'Asahi India Glass Ltd.', consigneeGstin: '06AABCA1234D1Z8',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 100.000, rate: 1500.00, freight: 150000.00, biltyAmount: 150000.00,
    billNo: '', partyPaid: 150000.00, partyDue: 0.00, ownerDue: 450000.00, ownerFreight: 150000.00, ownerTotalPayment: 150000.00, ownerBalance: 450000.00,
    rateDiff: 450000.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  },
  {
    id: 'RATE_DIFF_20250620_145', grNo: '2025-2026-145_MTC', shortGrNo: '145_MTC', transport: 'MTC',
    financialYear: '2025-2026', tripStartDate: '2025-06-20', date: '2025-06-20',
    truckNo: 'RJ52GA3498', truckOwner: 'Laxmi Prakash Jat', ownerName: 'Laxmi Prakash Jat', ownerMobile: '9414659401',
    driver: 'Dhanraj Jat', driverMobile: '9828230136',
    origin: 'Rajsamand (Raj.)', destination: 'Sandila (U.P.)', deliveryAddress: 'Industrial Area Sandila',
    consignor: 'RBL Natural Resources Ltd.', consignorAddress: 'Plot No. G-1-30, IID Centre, Kaladwas, Udaipur', consignorGstin: '08AAACR5148L1Z9',
    reference: 'RBL Natural Resources Ltd.', referenceMobile: '9887479777',
    consignee: 'Berger Paints India Ltd.', consigneeGstin: '09AABCB0976E2ZS',
    material: 'Marble Powder', billingType: 'Per Tonne', weight: 80.000, rate: 1800.00, freight: 144000.00, biltyAmount: 144000.00,
    billNo: '', partyPaid: 144000.00, partyDue: 0.00, ownerDue: 328900.00, ownerFreight: 144000.00, ownerTotalPayment: 144000.00, ownerBalance: 328900.00,
    rateDiff: 328900.00, isRateDiff: true, status: 'Rate Difference', tripStatus: 'Transit', colorTheme: 'teal'
  }
];

