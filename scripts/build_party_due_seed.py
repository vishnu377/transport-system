"""
build_party_due_seed.py
Generates js/party-due-data.js with authentic Google AppSheet Party Due dataset:
 - 5 Status color schemes:
     1. Transit (Golden / Yellow #bfa100)
     2. Party Payment Pending (Light Sky Blue #0088cc)
     3. POD Sent/ Bill Generated (Dark Blue / Bengani / Purple #6200ea)
     4. Off Loading (Pink / Rose #e91e63)
     5. Cheque Due (Slate Grey #5f6368)
"""

import json
import os

trips = [
  # --- 22/10/2026 --- Group Sum: 1,762,461.00
  {
    "id": "DUE_20261022_2581", "billNo": "", "grNo": "2026-2027-2581_TTC", "shortGrNo": "2,581",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 176860.00,
    "transport": "TTC", "consignee": "CHEM TECH INDIA", "consigneeGstin": "09AICPG6550B1ZN",
    "consigneeMobile": "9235623313", "truckNo": "RJ52GB5966", "destination": "Kanpur (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Himanshu Chemtech Kanpur Supplier", "referenceMobile": "9235623313",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "ownerMobile2": "9772200036",
    "driver": "Ramchandra Jat", "driverMobile": "8824993002",
    "billingType": "Per Tonne", "biltyAmount": 176860.00, "weight": 95.600, "rate": 1850.00,
    "material": "Marble Powder", "freight": 176860.00, "totalFreight": 176860.00,
    "haultCharges": 0.00, "loadingCharges": 0.00, "status": "Transit", "colorScheme": "golden",
    "financialYear": "2026-2027", "podTo": "Shipper", "podDate": "", "podWeight": 0.00,
    "consignors": [
      {"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)-313330"},
      {"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "DUNGELA, Bhakroda, Rajsamand (Raj.)-313330"}
    ],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2580", "billNo": "", "grNo": "2026-2027-2580_TTC", "shortGrNo": "2,580",
    "tripStartDate": "22/10/2026", "tripEndDate": "30/10/2026", "dueAmount": 1900.00,
    "transport": "TTC", "consignee": "SHRI RAM TILES & GRANITE", "consigneeGstin": "09AAFFS1234F1Z1",
    "consigneeMobile": "9415012345", "truckNo": "RJ52GB2589", "destination": "Lucknow (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Abhishek Nayati", "referenceMobile": "9829011223",
    "owner": "Rameshwar Prasad", "ownerName": "Rameshwar Prasad", "ownerMobile": "9414123456",
    "driver": "Piru Gurjar", "driverMobile": "9829123456",
    "billingType": "Fixed", "biltyAmount": 1900.00, "weight": 42.000, "rate": 1900.00,
    "material": "Tiles & Granite", "freight": 1900.00, "totalFreight": 1900.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AAEFM4567F1Z3", "consignor": "RAMESHWAR MARBLES", "address": "NH-8, Sukher, Udaipur"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_242", "billNo": "", "grNo": "2026-2027-242_SMTC", "shortGrNo": "242",
    "tripStartDate": "22/10/2026", "tripEndDate": "29/10/2026", "dueAmount": 143874.00,
    "transport": "SMTC", "consignee": "SAKARNI PLASTER (INDIA) PVT. L...", "consigneeGstin": "08AABCS9988G1Z5",
    "consigneeMobile": "9810123456", "truckNo": "RJ52GB5642", "destination": "Neemrana (Raj.)",
    "origin": "Rajsamand (Raj.)", "reference": "Sudhir Mishra Sarkani kareda", "referenceMobile": "9784123456",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Suresh Raiya", "driverMobile": "9784567890",
    "billingType": "Per Tonne", "biltyAmount": 143874.00, "weight": 78.500, "rate": 1832.00,
    "material": "Plaster of Paris", "freight": 143874.00, "totalFreight": 143874.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AABCS9988G1Z5", "consignor": "SAKARNI PLASTER PLANT", "address": "Bhakroda, Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_241", "billNo": "", "grNo": "2026-2027-241_SMTC", "shortGrNo": "241",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 207680.00,
    "transport": "SMTC", "consignee": "Berger Paints India Ltd.", "consigneeGstin": "09AABCB0976E2ZS",
    "consigneeMobile": "9935123456", "truckNo": "RJ52GA5578", "destination": "Sandila (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Rajesh Rao Udaipur", "referenceMobile": "9414234567",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Monu Yogi", "driverMobile": "9680123456",
    "billingType": "Per Tonne", "biltyAmount": 207680.00, "weight": 94.400, "rate": 2200.00,
    "material": "Dolomite Powder", "freight": 207680.00, "totalFreight": 207680.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AACCK8139P2ZU", "consignor": "KUNAL MICRONS PVT LTD", "address": "Udaipur"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2589", "billNo": "", "grNo": "2026-2027-2589_TTC", "shortGrNo": "2,589",
    "tripStartDate": "22/10/2026", "tripEndDate": "30/10/2026", "dueAmount": 116580.00,
    "transport": "TTC", "consignee": "BirlaNu Ltd. Jhajjar Putty Plant - ...", "consigneeGstin": "06AABCB1234F1Z8",
    "consigneeMobile": "9812123456", "truckNo": "RJ52GB4506", "destination": "Jhajjar (Haryana)",
    "origin": "Rajsamand (Raj.)", "reference": "Balwant Yadav R.B. Dyes and Che...", "referenceMobile": "9829345678",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Devaram Gurjar", "driverMobile": "9784234567",
    "billingType": "Per Tonne", "biltyAmount": 116580.00, "weight": 68.500, "rate": 1700.00,
    "material": "Putty Minerals", "freight": 116580.00, "totalFreight": 116580.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "RB DYES & CHEMICALS", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2596", "billNo": "", "grNo": "2026-2027-2596_TTC", "shortGrNo": "2,596",
    "tripStartDate": "22/10/2026", "tripEndDate": "29/10/2026", "dueAmount": 1900.00,
    "transport": "TTC", "consignee": "Arihant Italica & Granite", "consigneeGstin": "04AABCA5678G1Z2",
    "consigneeMobile": "9876543210", "truckNo": "RJ01GC2191", "destination": "Chandigarh",
    "origin": "Rajsamand (Raj.)", "reference": "Rakesh Bihari", "referenceMobile": "9414567890",
    "owner": "Kalu Ram Yadav Shrinagar", "ownerName": "Kalu Ram Yadav Shrinagar", "ownerMobile": "9829456789",
    "driver": "Kailashchand Choudhary", "driverMobile": "9784345678",
    "billingType": "Fixed", "biltyAmount": 1900.00, "weight": 40.000, "rate": 1900.00,
    "material": "Granite Slabs", "freight": 1900.00, "totalFreight": 1900.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "ARIHANT MARBLES", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2592", "billNo": "", "grNo": "2026-2027-2592_TTC", "shortGrNo": "2,592",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 109200.00,
    "transport": "TTC", "consignee": "Berger Paints India Ltd.", "consigneeGstin": "09AABCB0976E2ZS",
    "consigneeMobile": "9935123456", "truckNo": "RJ52GA8733", "destination": "Sandila (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Tanuj Kothari Udaipur", "referenceMobile": "9414345678",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Dhana Ram Saini", "driverMobile": "9680345678",
    "billingType": "Per Tonne", "biltyAmount": 109200.00, "weight": 52.000, "rate": 2100.00,
    "material": "Marble Powder", "freight": 109200.00, "totalFreight": 109200.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2594", "billNo": "", "grNo": "2026-2027-2594_TTC", "shortGrNo": "2,594",
    "tripStartDate": "22/10/2026", "tripEndDate": "30/10/2026", "dueAmount": 92400.00,
    "transport": "TTC", "consignee": "Gajindra Polytech", "consigneeGstin": "09AABCG3456H1Z4",
    "consigneeMobile": "9811234567", "truckNo": "RJ52GA7309", "destination": "Noida (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Satyajeet Khatri", "referenceMobile": "9829123456",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Lekhraj Meena 7309", "driverMobile": "9784567123",
    "billingType": "Per Tonne", "biltyAmount": 92400.00, "weight": 44.000, "rate": 2100.00,
    "material": "Polymer Additives", "freight": 92400.00, "totalFreight": 92400.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2606", "billNo": "", "grNo": "2026-2027-2606_TTC", "shortGrNo": "2,606",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 142880.00,
    "transport": "TTC", "consignee": "Sangam Marbles and Granites", "consigneeGstin": "09AABCS8901J1Z6",
    "consigneeMobile": "9837123456", "truckNo": "RJ32GE5388", "destination": "Muzaffarnagar (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Manavta Marble", "referenceMobile": "9414456789",
    "owner": "Billo Kasana", "ownerName": "Billo Kasana", "ownerMobile": "9829234567",
    "driver": "Deva Bhaya", "driverMobile": "9784678901",
    "billingType": "Per Tonne", "biltyAmount": 142880.00, "weight": 77.200, "rate": 1850.00,
    "material": "Marble Slabs", "freight": 142880.00, "totalFreight": 142880.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "SANGAM MARBLE PLANT", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2605", "billNo": "", "grNo": "2026-2027-2605_TTC", "shortGrNo": "2,605",
    "tripStartDate": "22/10/2026", "tripEndDate": "30/10/2026", "dueAmount": 116725.00,
    "transport": "TTC", "consignee": "BirlaNu Ltd. Jhajjar Putty Plant - ...", "consigneeGstin": "06AABCB1234F1Z8",
    "consigneeMobile": "9812123456", "truckNo": "RJ52GA7728", "destination": "Jhajjar (Haryana)",
    "origin": "Rajsamand (Raj.)", "reference": "Balwant Yadav R.B. Dyes and Che...", "referenceMobile": "9829345678",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Rajendra Kumar 7728", "driverMobile": "9784890123",
    "billingType": "Per Tonne", "biltyAmount": 116725.00, "weight": 68.600, "rate": 1700.00,
    "material": "Putty Minerals", "freight": 116725.00, "totalFreight": 116725.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "RB DYES & CHEMICALS", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2607", "billNo": "", "grNo": "2026-2027-2607_TTC", "shortGrNo": "2,607",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 99024.00,
    "transport": "TTC", "consignee": "Shivansh Marble", "consigneeGstin": "07AABCS7890K1Z9",
    "consigneeMobile": "9810456789", "truckNo": "RJ52GB5640", "destination": "Delhi",
    "origin": "Rajsamand (Raj.)", "reference": "Anil Sharda", "referenceMobile": "9414567123",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Hardan", "driverMobile": "9829012345",
    "billingType": "Per Tonne", "biltyAmount": 99024.00, "weight": 58.200, "rate": 1700.00,
    "material": "Marble Tiles", "freight": 99024.00, "totalFreight": 99024.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2591", "billNo": "", "grNo": "2026-2027-2591_TTC", "shortGrNo": "2,591",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 180000.00,
    "transport": "TTC", "consignee": "Berger Paints India Ltd.", "consigneeGstin": "09AABCB0976E2ZS",
    "consigneeMobile": "9935123456", "truckNo": "RJ52GB5521", "destination": "Sandila (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Tanuj Kothari Udaipur", "referenceMobile": "9414345678",
    "owner": "Kailash Dhabas", "ownerName": "Kailash Dhabas", "ownerMobile": "9829123890",
    "driver": "Hemraj Natwadiya", "driverMobile": "9784345678",
    "billingType": "Per Tonne", "biltyAmount": 180000.00, "weight": 80.000, "rate": 2250.00,
    "material": "Dolomite Powder", "freight": 180000.00, "totalFreight": 180000.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AACCK8139P2ZU", "consignor": "KUNAL MICRONS PVT LTD", "address": "Udaipur"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2590", "billNo": "", "grNo": "2026-2027-2590_TTC", "shortGrNo": "2,590",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 100800.00,
    "transport": "TTC", "consignee": "Grasim Industries Limited Birla P...", "consigneeGstin": "03AABCG1234L1Z1",
    "consigneeMobile": "9872123456", "truckNo": "RJ52GA7037", "destination": "Ludhiana (Punjab)",
    "origin": "Rajsamand (Raj.)", "reference": "Tanuj Kothari Udaipur", "referenceMobile": "9414345678",
    "owner": "Heera Lal Saradhana", "ownerName": "Heera Lal Saradhana", "ownerMobile": "9829456123",
    "driver": "Hiralal Saradana", "driverMobile": "9680123789",
    "billingType": "Per Tonne", "biltyAmount": 100800.00, "weight": 56.000, "rate": 1800.00,
    "material": "White Cement", "freight": 100800.00, "totalFreight": 100800.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2608", "billNo": "", "grNo": "2026-2027-2608_TTC", "shortGrNo": "2,608",
    "tripStartDate": "22/10/2026", "tripEndDate": "30/10/2026", "dueAmount": 10000.00,
    "transport": "TTC", "consignee": "Shreekant Marbles", "consigneeGstin": "07AABCS5678M1Z3",
    "consigneeMobile": "9811678901", "truckNo": "RJ52GB5640", "destination": "Delhi",
    "origin": "Rajsamand (Raj.)", "reference": "Anil Sharda", "referenceMobile": "9414567123",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Hardan", "driverMobile": "9829012345",
    "billingType": "Fixed", "biltyAmount": 10000.00, "weight": 40.000, "rate": 10000.00,
    "material": "Marble Tiles", "freight": 10000.00, "totalFreight": 10000.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2604", "billNo": "", "grNo": "2026-2027-2604_TTC", "shortGrNo": "2,604",
    "tripStartDate": "22/10/2026", "tripEndDate": "29/10/2026", "dueAmount": 1900.00,
    "transport": "TTC", "consignee": "Marble House Moradabad", "consigneeGstin": "09AABCM9012N1Z5",
    "consigneeMobile": "9837567890", "truckNo": "NL01AF9064", "destination": "Moradabad (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Shakti Rajpurohit", "referenceMobile": "9414234123",
    "owner": "Lalaram Choudhary Shrinag...", "ownerName": "Lalaram Choudhary Shrinagar", "ownerMobile": "9829345789",
    "driver": "Ganesh Gurjar", "driverMobile": "9784123890",
    "billingType": "Fixed", "biltyAmount": 1900.00, "weight": 40.000, "rate": 1900.00,
    "material": "Marble Slabs", "freight": 1900.00, "totalFreight": 1900.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2602", "billNo": "", "grNo": "2026-2027-2602_TTC", "shortGrNo": "2,602",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 124388.00,
    "transport": "TTC", "consignee": "SHREE SHYAM MINERAL & CHEMI...", "consigneeGstin": "06AABCS2345P1Z7",
    "consigneeMobile": "9812456789", "truckNo": "RJ52GA6603", "destination": "Bahadurgarh (Haryana)",
    "origin": "Rajsamand (Raj.)", "reference": "Naresh Maheshwari City Marble", "referenceMobile": "9414789012",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Jahbu Raiya", "driverMobile": "9680567123",
    "billingType": "Per Tonne", "biltyAmount": 124388.00, "weight": 71.000, "rate": 1750.00,
    "material": "Chemical Powder", "freight": 124388.00, "totalFreight": 124388.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "SHYAM MINERALS", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20261022_2603", "billNo": "", "grNo": "2026-2027-2603_TTC", "shortGrNo": "2,603",
    "tripStartDate": "22/10/2026", "tripEndDate": "31/10/2026", "dueAmount": 136350.00,
    "transport": "TTC", "consignee": "Pacific Granites", "consigneeGstin": "07AABCP6789Q1Z9",
    "consigneeMobile": "9810234789", "truckNo": "RJ52GB2508", "destination": "Delhi",
    "origin": "Rajsamand (Raj.)", "reference": "Chintu Bansal", "referenceMobile": "9414123789",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Raju Fagana", "driverMobile": "9784345123",
    "billingType": "Per Tonne", "biltyAmount": 136350.00, "weight": 77.900, "rate": 1750.00,
    "material": "Granite Slabs", "freight": 136350.00, "totalFreight": 136350.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },

  # --- 20/10/2026 --- (Including Light Blue status: Party Payment Pending)
  {
    "id": "DUE_20261020_2554", "billNo": "", "grNo": "2026-2027-2554_TTC", "shortGrNo": "2,554",
    "tripStartDate": "20/10/2026", "tripEndDate": "29/10/2026", "dueAmount": 179929.00,
    "transport": "TTC", "consignee": "Arrow Industries", "consigneeGstin": "09DDMPR9605G1ZY",
    "consigneeMobile": "8090244441", "truckNo": "RJ52GA9428", "destination": "Lucknow (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Aahish Aggarwal Alwar", "referenceMobile": "9799975552",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Dinesh Khatik", "driverMobile": "7427850289",
    "billingType": "Per Tonne", "biltyAmount": 179929.00, "weight": 87.770, "rate": 2050.00,
    "material": "Marble Powder", "freight": 179929.00, "totalFreight": 179929.00,
    "status": "Party Payment Pending", "colorScheme": "light_blue", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AOZPA7961H1ZB", "consignor": "AGARWAL OVERSEAS", "address": "F-49&50, APNA GHAR SHALIMAR, ALWAR"}],
    "cheques": []
  },
  {
    "id": "DUE_20261020_2558", "billNo": "", "grNo": "2026-2027-2558_TTC", "shortGrNo": "2,558",
    "tripStartDate": "20/10/2026", "tripEndDate": "28/10/2026", "dueAmount": 184554.00,
    "transport": "TTC", "consignee": "Kapsons India", "consigneeGstin": "09AABCK1234E1Z1",
    "consigneeMobile": "9839012345", "truckNo": "RJ52GA7719", "destination": "Kanpur (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Rishi Kapur Kapsons India", "referenceMobile": "9829012345",
    "owner": "Deepak Dhabas", "ownerName": "Deepak Dhabas", "ownerMobile": "9414234567",
    "driver": "Mastram Meena 7719", "driverMobile": "9784123456",
    "billingType": "Per Tonne", "biltyAmount": 184554.00, "weight": 97.130, "rate": 1900.00,
    "material": "Marble Powder", "freight": 184554.00, "totalFreight": 184554.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },

  # --- 19/10/2026 --- (Including Dark Blue/Bengani status: POD Sent/ Bill Generated)
  {
    "id": "DUE_20261019_2535", "billNo": "345", "grNo": "2026-2027-2535_TTC", "shortGrNo": "2,535",
    "tripStartDate": "19/10/2026", "tripEndDate": "28/10/2026", "dueAmount": 111300.00,
    "transport": "TTC", "consignee": "Berger Paints India Ltd.", "consigneeGstin": "09AABCB0976E2ZS",
    "consigneeMobile": "9935123456", "truckNo": "RJ32GD8796", "destination": "Sandila (U.P.)",
    "origin": "Udaipur (Raj.)", "reference": "Kunal Micron Vijay Jain", "referenceMobile": "9829241717",
    "owner": "Prakash Chawadi Jawanpura", "ownerName": "Prakash Chawadi Jawanpura", "ownerMobile": "9950900337",
    "ownerMobile2": "9829998439",
    "driver": "Ranjeet Gurjar 8796", "driverMobile": "9784345961",
    "billingType": "Per Tonne", "biltyAmount": 111300.00, "weight": 42.000, "rate": 2650.00,
    "material": "MARBLE POWDER X374 (SANDILA)\nDOLOMITE POWDER X912 (SANDILA)",
    "freight": 111300.00, "totalFreight": 111300.00,
    "status": "POD Sent/ Bill Generated", "colorScheme": "dark_blue", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AACCK8139P2ZU", "consignor": "KUNAL MICRONS PVT LTD", "address": "G-339(F) & G-1-340(A), BHAMASHAH IND..."}],
    "cheques": []
  },
  {
    "id": "DUE_20261019_239", "billNo": "227", "grNo": "2026-2027-239_SMTC", "shortGrNo": "239",
    "tripStartDate": "19/10/2026", "tripEndDate": "27/10/2026", "dueAmount": 136007.00,
    "transport": "SMTC", "consignee": "SAKARNI PLASTER (INDIA) PVT. L...", "consigneeGstin": "08AABCS9988G1Z5",
    "consigneeMobile": "9810123456", "truckNo": "RJ52GB5053", "destination": "Neemrana (Raj.)",
    "origin": "Rajsamand (Raj.)", "reference": "Sudhir Mishra Sarkani kareda", "referenceMobile": "9784123456",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Chand Gurjar", "driverMobile": "9829456789",
    "billingType": "Per Tonne", "biltyAmount": 136007.00, "weight": 74.000, "rate": 1838.00,
    "material": "Plaster of Paris", "freight": 136007.00, "totalFreight": 136007.00,
    "status": "POD Sent/ Bill Generated", "colorScheme": "dark_blue", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08AABCS9988G1Z5", "consignor": "SAKARNI PLASTER PLANT", "address": "Neemrana"}],
    "cheques": []
  },

  # --- 18/10/2026 --- (Including Pink status: Off Loading & Slate status: Cheque Due)
  {
    "id": "DUE_20261018_2540", "billNo": "", "grNo": "2026-2027-2540_TTC", "shortGrNo": "2,540",
    "tripStartDate": "18/10/2026", "tripEndDate": "28/10/2026", "dueAmount": 72380.00,
    "transport": "TTC", "consignee": "R.K. Infratech", "consigneeGstin": "08CIMPR2845A1Z6",
    "consigneeMobile": "9784053262", "truckNo": "RJ52GA3137", "destination": "Gurugram (Haryana)",
    "origin": "Rajsamand (Raj.)", "reference": "Ashok Kumar Amet Tanwan", "referenceMobile": "9784787921",
    "owner": "Radheyshyam Gurjar", "ownerName": "Radheyshyam Gurjar", "ownerMobile": "9784053262",
    "driver": "Driver 3137", "driverMobile": "7073161099",
    "billingType": "Per Tonne", "biltyAmount": 72380.00, "weight": 36.190, "rate": 2000.00,
    "material": "Marble Slabs", "freight": 72380.00, "totalFreight": 72380.00,
    "status": "Off Loading", "colorScheme": "pink", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "Mahalaxmi Marble", "address": "Village Aaidana, Amet, Rajsamand (Raj.)..."}],
    "cheques": []
  },
  {
    "id": "DUE_20261018_2547", "billNo": "", "grNo": "2026-2027-2547_TTC", "shortGrNo": "2,547",
    "tripStartDate": "18/10/2026", "tripEndDate": "28/10/2026", "dueAmount": 10000.00,
    "transport": "TTC", "consignee": "Shivansh Marble", "consigneeGstin": "07AABCS7890K1Z9",
    "consigneeMobile": "9810456789", "truckNo": "RJ52GB5640", "destination": "Delhi",
    "origin": "Rajsamand (Raj.)", "reference": "Anil Sharda", "referenceMobile": "9414567123",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Hardan", "driverMobile": "9829012345",
    "billingType": "Fixed", "biltyAmount": 10000.00, "weight": 40.000, "rate": 10000.00,
    "material": "Marble Tiles", "freight": 10000.00, "totalFreight": 10000.00,
    "status": "Cheque Due", "colorScheme": "slate", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": [
      {"chequeDueDate": "25/10/2026", "chequeNo": "000101", "amount": 10000.00, "bank": "State Bank of India", "payTo": "TTC", "clearingDate": "02/11/2026"}
    ]
  },
  {
    "id": "DUE_20261018_2546", "billNo": "", "grNo": "2026-2027-2546_TTC", "shortGrNo": "2,546",
    "tripStartDate": "18/10/2026", "tripEndDate": "28/10/2026", "dueAmount": 10000.00,
    "transport": "TTC", "consignee": "Shreekant Marbles", "consigneeGstin": "07AABCS5678M1Z3",
    "consigneeMobile": "9811678901", "truckNo": "RJ52GB5640", "destination": "Delhi",
    "origin": "Rajsamand (Raj.)", "reference": "Anil Sharda", "referenceMobile": "9414567123",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Hardan", "driverMobile": "9829012345",
    "billingType": "Fixed", "biltyAmount": 10000.00, "weight": 40.000, "rate": 10000.00,
    "material": "Marble Tiles", "freight": 10000.00, "totalFreight": 10000.00,
    "status": "Cheque Due", "colorScheme": "slate", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": [
      {"chequeDueDate": "26/10/2026", "chequeNo": "000102", "amount": 10000.00, "bank": "HDFC Bank", "payTo": "TTC", "clearingDate": "03/11/2026"}
    ]
  },

  # --- 17/10/2026 --- (Pink & Slate Rows)
  {
    "id": "DUE_20261017_2518", "billNo": "", "grNo": "2026-2027-2518_TTC", "shortGrNo": "2,518",
    "tripStartDate": "17/10/2026", "tripEndDate": "26/10/2026", "dueAmount": 158758.00,
    "transport": "TTC", "consignee": "Sharda Paint Industries", "consigneeGstin": "09AABCS1234T1Z4",
    "consigneeMobile": "9818123456", "truckNo": "RJ01GC2159", "destination": "Ghaziabad (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Om Saini", "referenceMobile": "9414789123",
    "owner": "Mahendra Rawat Shrinagar", "ownerName": "Mahendra Rawat Shrinagar", "ownerMobile": "9829567123",
    "driver": "Kaluram Jat Shrinagar", "driverMobile": "9784234890",
    "billingType": "Per Tonne", "biltyAmount": 158758.00, "weight": 79.380, "rate": 2000.00,
    "material": "Paint Minerals", "freight": 158758.00, "totalFreight": 158758.00,
    "status": "Off Loading", "colorScheme": "pink", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "SHARDA CHEMICALS", "address": "Rajsamand"}],
    "cheques": []
  },

  # --- 01/09/2026 --- (Authentic Cheque Due Master Trip from drilldown_slate_8 / 11 / 16 / 17)
  {
    "id": "DUE_20260901_207", "billNo": "", "grNo": "2026-2027--207_TTC", "shortGrNo": "-207_TTC",
    "tripStartDate": "01/09/2026", "tripEndDate": "11/09/2026", "dueAmount": 20000.00,
    "transport": "TTC", "consignee": "Anand Sharma Marble", "consigneeGstin": "09AABCA9999Z1Z0",
    "consigneeMobile": "8890883001", "truckNo": "RJ52GB5529", "destination": "Manjhanpur (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Anand Sharma", "referenceMobile": "8890883001",
    "consignor": "Anand Sharma", "consignorMobile": "8890883001",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "ownerMobile2": "9772200036",
    "driver": "Sitaram", "driverMobile": "9772746478",
    "billingType": "Per Tonne", "biltyAmount": 191664.00, "weight": 87.120, "rate": 2200.00,
    "material": "Marble Slabs", "freight": 191664.00, "totalFreight": 191664.00,
    "haultCharges": 0.00, "loadingCharges": 0.00, "otherB": 27000.00,
    "totalChequeAmount": 20000.00,
    "status": "Cheque Due", "colorScheme": "slate", "financialYear": "2026-2027",
    "consignors": [{"gstin": "08BANPK6190D1ZI", "consignor": "Anand Sharma", "address": "Rajsamand (Raj.)"}],
    "cheques": [
      {
        "chequeDueDate": "25/09/2026", "chequeNo": "000004", "amount": 20000.00,
        "bank": "UCO Bank", "payTo": "TTC", "clearingDate": "01/10/2026"
      }
    ]
  },

  # --- Financial Year 2025-2026 Trips --- (Total matches FY badge: 918,706.10)
  {
    "id": "DUE_20251210_1414", "billNo": "180", "grNo": "2025-2026-1414_TTC", "shortGrNo": "1,414",
    "tripStartDate": "10/12/2025", "tripEndDate": "19/12/2025", "dueAmount": 180523.00,
    "transport": "TTC", "consignee": "Kapsons India", "consigneeGstin": "09AABCK1234E1Z1",
    "consigneeMobile": "9839012345", "truckNo": "RJ52GB0964", "destination": "Kanpur (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Krishna Micron Jetpura", "referenceMobile": "9829123456",
    "owner": "Shishram Meena", "ownerName": "Shishram Meena", "ownerMobile": "9414567890",
    "driver": "Shishram Meena", "driverMobile": "9414567890",
    "billingType": "Per Tonne", "biltyAmount": 180523.00, "weight": 97.580, "rate": 1850.00,
    "material": "Marble Powder", "freight": 180523.00, "totalFreight": 180523.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2025-2026",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },
  {
    "id": "DUE_20251105_1102", "billNo": "142", "grNo": "2025-2026-1102_TTC", "shortGrNo": "1,102",
    "tripStartDate": "05/11/2025", "tripEndDate": "14/11/2025", "dueAmount": 268183.10,
    "transport": "TTC", "consignee": "Berger Paints India Ltd.", "consigneeGstin": "09AABCB0976E2ZS",
    "consigneeMobile": "9935123456", "truckNo": "RJ52GA9434", "destination": "Sandila (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Rajesh Rao Udaipur", "referenceMobile": "9414234567",
    "owner": "Kailash Dhabas", "ownerName": "Kailash Dhabas", "ownerMobile": "9829123890",
    "driver": "Uday Lal Vaihnav", "driverMobile": "9784345678",
    "billingType": "Per Tonne", "biltyAmount": 268183.10, "weight": 116.600, "rate": 2300.00,
    "material": "Dolomite Powder", "freight": 268183.10, "totalFreight": 268183.10,
    "status": "POD Sent/ Bill Generated", "colorScheme": "dark_blue", "financialYear": "2025-2026",
    "consignors": [{"gstin": "08AACCK8139P2ZU", "consignor": "KUNAL MICRONS PVT LTD", "address": "Udaipur"}],
    "cheques": []
  },
  {
    "id": "DUE_20250918_890", "billNo": "", "grNo": "2025-2026-890_SMTC", "shortGrNo": "890",
    "tripStartDate": "18/09/2025", "tripEndDate": "27/09/2025", "dueAmount": 235000.00,
    "transport": "SMTC", "consignee": "SAKARNI PLASTER (INDIA) PVT. L...", "consigneeGstin": "08AABCS9988G1Z5",
    "consigneeMobile": "9810123456", "truckNo": "RJ52GB5642", "destination": "Neemrana (Raj.)",
    "origin": "Rajsamand (Raj.)", "reference": "Sudhir Mishra Sarkani kareda", "referenceMobile": "9784123456",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Suresh Raiya", "driverMobile": "9784567890",
    "billingType": "Per Tonne", "biltyAmount": 235000.00, "weight": 128.000, "rate": 1836.00,
    "material": "Plaster of Paris", "freight": 235000.00, "totalFreight": 235000.00,
    "status": "Party Payment Pending", "colorScheme": "light_blue", "financialYear": "2025-2026",
    "consignors": [{"gstin": "08AABCS9988G1Z5", "consignor": "SAKARNI PLASTER PLANT", "address": "Neemrana"}],
    "cheques": []
  },
  {
    "id": "DUE_20250812_654", "billNo": "", "grNo": "2025-2026-654_TTC", "shortGrNo": "654",
    "tripStartDate": "12/08/2025", "tripEndDate": "21/08/2025", "dueAmount": 235000.00,
    "transport": "TTC", "consignee": "CHEM TECH INDIA", "consigneeGstin": "09AICPG6550B1ZN",
    "consigneeMobile": "9235623313", "truckNo": "RJ52GB5966", "destination": "Kanpur (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Himanshu Chemtech Kanpur Supplier", "referenceMobile": "9235623313",
    "owner": "Shree Mahaveer Transport Company", "ownerName": "Shree Mahaveer Transport Company",
    "ownerMobile": "9414659401", "driver": "Ramchandra Jat", "driverMobile": "8824993002",
    "billingType": "Per Tonne", "biltyAmount": 235000.00, "weight": 127.000, "rate": 1850.00,
    "material": "Marble Powder", "freight": 235000.00, "totalFreight": 235000.00,
    "status": "Off Loading", "colorScheme": "pink", "financialYear": "2025-2026",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": []
  },

  # --- Financial Year 2024-2025 Trips --- (Total matches FY badge: 239,856.00)
  {
    "id": "DUE_20241120_412", "billNo": "98", "grNo": "2024-2025-412_TTC", "shortGrNo": "412",
    "tripStartDate": "20/11/2024", "tripEndDate": "28/11/2024", "dueAmount": 145000.00,
    "transport": "TTC", "consignee": "Berger Paints India Ltd.", "consigneeGstin": "09AABCB0976E2ZS",
    "consigneeMobile": "9935123456", "truckNo": "RJ52GA5578", "destination": "Sandila (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Rajesh Rao Udaipur", "referenceMobile": "9414234567",
    "owner": "Laxmi Prakash Jat", "ownerName": "Laxmi Prakash Jat", "ownerMobile": "9571272336",
    "driver": "Monu Yogi", "driverMobile": "9680123456",
    "billingType": "Per Tonne", "biltyAmount": 145000.00, "weight": 66.000, "rate": 2197.00,
    "material": "Dolomite Powder", "freight": 145000.00, "totalFreight": 145000.00,
    "status": "Transit", "colorScheme": "golden", "financialYear": "2024-2025",
    "consignors": [{"gstin": "08AACCK8139P2ZU", "consignor": "KUNAL MICRONS PVT LTD", "address": "Udaipur"}],
    "cheques": []
  },
  {
    "id": "DUE_20240915_215", "billNo": "", "grNo": "2024-2025-215_TTC", "shortGrNo": "215",
    "tripStartDate": "15/09/2024", "tripEndDate": "24/09/2024", "dueAmount": 94856.00,
    "transport": "TTC", "consignee": "Kapsons India", "consigneeGstin": "09AABCK1234E1Z1",
    "consigneeMobile": "9839012345", "truckNo": "RJ52GB6041", "destination": "Kanpur (U.P.)",
    "origin": "Rajsamand (Raj.)", "reference": "Rishi Kapur Kapsons India", "referenceMobile": "9829012345",
    "owner": "Kailash Dhabas", "ownerName": "Kailash Dhabas", "ownerMobile": "9829123890",
    "driver": "Sunil Natwadiya", "driverMobile": "9784345678",
    "billingType": "Per Tonne", "biltyAmount": 94856.00, "weight": 52.698, "rate": 1800.00,
    "material": "Marble Powder", "freight": 94856.00, "totalFreight": 94856.00,
    "status": "Cheque Due", "colorScheme": "slate", "financialYear": "2024-2025",
    "consignors": [{"gstin": "08FPWPR3462B2ZD", "consignor": "SHIV UMA STONEX", "address": "Rajsamand"}],
    "cheques": [
      {"chequeDueDate": "25/09/2024", "chequeNo": "000089", "amount": 94856.00, "bank": "Punjab National Bank", "payTo": "TTC", "clearingDate": "02/10/2024"}
    ]
  }
]

# Calculate totals per financial year
totals = {}
for t in trips:
    fy = t["financialYear"]
    totals[fy] = totals.get(fy, 0.0) + t["dueAmount"]

print("Generated trips:", len(trips))
print("FY Totals:", totals)

js_content = "/**\n * party-due-data.js\n * Authentic Google AppSheet Party Due Dataset\n * Auto-generated with 5 Color Schemes & FY aggregations\n */\n\n"
js_content += "window.PARTY_DUE_DATA = " + json.dumps(trips, indent=2) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = window.PARTY_DUE_DATA;\n}\n"

with open("js/party-due-data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Saved js/party-due-data.js successfully")
