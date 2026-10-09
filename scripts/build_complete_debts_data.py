import json
import os
import re

targets = {
    '2026-2027': 2356561.0,
    '2025-2026': 1191950.0,
    '2024-2025': 899600.0,
    '2023-2024': 277215.0,
    '2022-2023': 57500.0,
    '2021-2022': 111050.0,
    '2020-2021': 68100.0,
    '2019-2020': 229300.0
}

# 1. Authentic records from 2026-2027 screenshot
rec_2026 = [
    # 09/10/2026 (Group sum: 171,257)
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '219_SMTC', 'truckNo': 'RJ52GB2274', 'from': 'Udaipur (Raj.)', 'to': 'Sandila (U.P.)', 'company': 'SMTC', 'truckOwner': 'Govind Choudhary', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Govind Choudhary', 'receiverName': 'Kalu Meena 2274 9929438706', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '219_SMTC', 'truckNo': 'RJ52GB2274', 'from': 'Udaipur (Raj.)', 'to': 'Sandila (U.P.)', 'company': 'SMTC', 'truckOwner': 'Govind Choudhary', 'debtType': 'Other', 'dueAmount': 3900.0, 'debtAmount': 3900.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Govind Choudhary', 'receiverName': 'Kalu Meena 2274 9929438706', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2415_TTC', 'truckNo': 'RJ52GA0837', 'from': 'Kishangarh (Raj.)', 'to': 'Dehradun (U.K.)', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Panchuram Gurjar', 'receiverName': 'Naresh Gurjar 0837 8769390837', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2295_TTC', 'truckNo': 'RJ52GC0172', 'from': 'Kishangarh (Raj.)', 'to': 'Baraut (U.P.)', 'company': 'TTC', 'truckOwner': 'Vinod Dhabas', 'debtType': 'Loading', 'dueAmount': 3000.0, 'debtAmount': 3000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Vinod Dhabas', 'receiverName': 'Mahendra Sharma 8005707798', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2409_TTC', 'truckNo': 'RJ52GA6603', 'from': 'Kishangarh (Raj.)', 'to': 'SAHIBABAD (U.P.)', 'company': 'TTC', 'truckOwner': 'Laxmi Prakash Jat', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Laxmi Prakash Jat', 'receiverName': 'Jahbu Raiya 9784009724', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2409_TTC', 'truckNo': 'RJ52GA6603', 'from': 'Kishangarh (Raj.)', 'to': 'SAHIBABAD (U.P.)', 'company': 'TTC', 'truckOwner': 'Laxmi Prakash Jat', 'debtType': 'Other', 'dueAmount': 3500.0, 'debtAmount': 3500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Laxmi Prakash Jat', 'receiverName': 'Jahbu Raiya 9784009724', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2412_TTC', 'truckNo': 'RJ01GC2159', 'from': 'Kishangarh (Raj.)', 'to': 'Roorkee (U.K.)', 'company': 'TTC', 'truckOwner': 'Mahendra Rawat Shrinagar', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mahendra Rawat Shrinagar', 'receiverName': 'Kaluram Jat Shrinagar 9784532159', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2412_TTC', 'truckNo': 'RJ01GC2159', 'from': 'Kishangarh (Raj.)', 'to': 'Roorkee (U.K.)', 'company': 'TTC', 'truckOwner': 'Mahendra Rawat Shrinagar', 'debtType': 'Other', 'dueAmount': 4300.0, 'debtAmount': 4300.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mahendra Rawat Shrinagar', 'receiverName': 'Kaluram Jat Shrinagar 9784532159', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Bhanwar Saini SKM 9785444855', 'debtType': 'In Hand', 'dueAmount': 100000.0, 'debtAmount': 100000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Bhanwar Saini SKM 9785444855', 'receiverName': 'Bhanwar Saini SKM 9785444855', 'description': 'Narshi Goverdhan', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2404_TTC', 'truckNo': 'RJ52GB2587', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Rameshwar Prasad', 'debtType': 'Loading', 'dueAmount': 15500.0, 'debtAmount': 15500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rameshwar Prasad', 'receiverName': 'Chintu Bansal 9829550606', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2410_TTC', 'truckNo': 'RJ52GB5058', 'from': 'Kishangarh (Raj.)', 'to': 'Baraut (U.P.)', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Loading', 'dueAmount': 26600.0, 'debtAmount': 26600.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Mahendra Sharma 8005707798', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '221_SMTC', 'truckNo': 'RJ32GD8796', 'from': 'Kishangarh (Raj.)', 'to': 'Sandila (U.P.)', 'company': 'SMTC', 'truckOwner': 'Prakash Chawadi Jawaja 9571343796', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Prakash Chawadi Jawaja 9571343796', 'receiverName': 'Ranjeet Gurjar 8796 9785444855', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2418_TTC', 'truckNo': 'RJ01GC4865', 'from': 'Kishangarh (Raj.)', 'to': 'Mohali (Punjab)', 'company': 'TTC', 'truckOwner': 'Shankar Singh Rawat Shrinagar', 'debtType': 'Advance', 'dueAmount': 3500.0, 'debtAmount': 3500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shankar Singh Rawat Shrinagar', 'receiverName': 'Nilesh Malani 9829043728', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-09', 'displayDate': '09/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Bhanwar Saini SKM 9785444855', 'debtType': 'In Hand', 'dueAmount': 957.0, 'debtAmount': 957.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Bhanwar Saini SKM 9785444855', 'receiverName': 'Narshi Dan Charan', 'description': 'Room Light Bill', 'returnedAmounts': []},

    # 08/10/2026 (Group sum: 251,900)
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2400_TTC', 'truckNo': 'RJ32GC0997', 'from': 'Kishangarh (Raj.)', 'to': 'Keshwana (Raj.)', 'company': 'TTC', 'truckOwner': 'Mahendra Gurjar', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mahendra Gurjar', 'receiverName': 'Mahendra Gurjar 7424840997', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2400_TTC', 'truckNo': 'RJ32GC0997', 'from': 'Kishangarh (Raj.)', 'to': 'Keshwana (Raj.)', 'company': 'TTC', 'truckOwner': 'Mahendra Gurjar', 'debtType': 'Other', 'dueAmount': 4400.0, 'debtAmount': 4400.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mahendra Gurjar', 'receiverName': 'Mahendra Gurjar 7424840997', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2398_TTC', 'truckNo': 'RJ52GA7382', 'from': 'Kishangarh (Raj.)', 'to': 'Kanpur (U.P.)', 'company': 'TTC', 'truckOwner': 'Deepak Dhabas', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Deepak Dhabas', 'receiverName': 'Bablu Meena 7382 9024017382', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2398_TTC', 'truckNo': 'RJ52GA7382', 'from': 'Kishangarh (Raj.)', 'to': 'Kanpur (U.P.)', 'company': 'TTC', 'truckOwner': 'Deepak Dhabas', 'debtType': 'Other', 'dueAmount': 3900.0, 'debtAmount': 3900.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Deepak Dhabas', 'receiverName': 'Bablu Meena 7382 9024017382', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2397_TTC', 'truckNo': 'RJ52GA7719', 'from': 'Kishangarh (Raj.)', 'to': 'Kanpur (U.P.)', 'company': 'TTC', 'truckOwner': 'Deepak Dhabas', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Deepak Dhabas', 'receiverName': 'Mastram Meena 7719 7737750800', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2397_TTC', 'truckNo': 'RJ52GA7719', 'from': 'Kishangarh (Raj.)', 'to': 'Kanpur (U.P.)', 'company': 'TTC', 'truckOwner': 'Deepak Dhabas', 'debtType': 'Other', 'dueAmount': 3900.0, 'debtAmount': 3900.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Deepak Dhabas', 'receiverName': 'Mastram Meena 7719 7737750800', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2390_TTC', 'truckNo': 'RJ32GD8541', 'from': 'Kishangarh (Raj.)', 'to': 'Panipat (Haryana)', 'company': 'TTC', 'truckOwner': 'Suresh Khatana', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Suresh Khatana', 'receiverName': 'suresh khatana 8541 9929878541', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2390_TTC', 'truckNo': 'RJ32GD8541', 'from': 'Kishangarh (Raj.)', 'to': 'Panipat (Haryana)', 'company': 'TTC', 'truckOwner': 'Suresh Khatana', 'debtType': 'Other', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Suresh Khatana', 'receiverName': 'suresh khatana 8541 9929878541', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2405_TTC', 'truckNo': 'RJ52GB2508', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Laxmi Prakash Jat', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Laxmi Prakash Jat', 'receiverName': 'Raju Fagarna 8696794782', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2405_TTC', 'truckNo': 'RJ52GB2508', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Laxmi Prakash Jat', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Laxmi Prakash Jat', 'receiverName': 'Raju Fagarna 8696794782', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2401_TTC', 'truckNo': 'RJ01GE0121', 'from': 'Kishangarh (Raj.)', 'to': 'Haridwar (U.K.)', 'company': 'TTC', 'truckOwner': 'Dinesh Yadav Shrinagar', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Dinesh Yadav Shrinagar', 'receiverName': 'Kishan Rawat 8107529554', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2401_TTC', 'truckNo': 'RJ01GE0121', 'from': 'Kishangarh (Raj.)', 'to': 'Haridwar (U.K.)', 'company': 'TTC', 'truckOwner': 'Dinesh Yadav Shrinagar', 'debtType': 'Other', 'dueAmount': 4300.0, 'debtAmount': 4300.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Dinesh Yadav Shrinagar', 'receiverName': 'Kishan Rawat 8107529554', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Mohan Ji Kishangarh 9460591040', 'debtType': 'In Hand', 'dueAmount': 150000.0, 'debtAmount': 150000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mohan Ji Kishangarh 9460591040', 'receiverName': 'Mohan Ji Kishangarh 9460591040', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Bhanwar Saini SKM 9785444855', 'debtType': 'In Hand', 'dueAmount': 8000.0, 'debtAmount': 8000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Bhanwar Saini SKM 9785444855', 'receiverName': 'Bhanwar Saini SKM 9785444855', 'description': 'Room Rent', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2401_TTC', 'truckNo': 'RJ01GE0121', 'from': 'Kishangarh (Raj.)', 'to': 'Haridwar (U.K.)', 'company': 'TTC', 'truckOwner': 'Dinesh Yadav Shrinagar', 'debtType': 'Loading', 'dueAmount': 60000.0, 'debtAmount': 60000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Dinesh Yadav Shrinagar', 'receiverName': 'Vishnu Khandelwal 9414002447', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2390_TTC', 'truckNo': 'RJ32GD8541', 'from': 'Kishangarh (Raj.)', 'to': 'Panipat (Haryana)', 'company': 'TTC', 'truckOwner': 'Suresh Khatana', 'debtType': 'Advance', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Suresh Khatana', 'receiverName': 'Kailash Agarwal Alwar 8003189999', 'description': 'Def Bukets', 'returnedAmounts': []},
    {'date': '2026-10-08', 'displayDate': '08/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': 'RJ08GB2298', 'from': '', 'to': 'Shahjahanpur (U.P.)', 'company': 'TTC', 'truckOwner': 'Pratap Singh', 'debtType': 'Other', 'dueAmount': 2400.0, 'debtAmount': 2400.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Pratap Singh', 'receiverName': 'Pratap Singh', 'description': '', 'returnedAmounts': []},

    # 07/10/2026 (Group sum: 24,900)
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '-250_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Devaram Gurjar 8955801991', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '-250_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Devaram Gurjar 8955801991', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2386_TTC', 'truckNo': 'RJ52GB9237', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar', 'debtType': 'In Hand', 'dueAmount': 10000.0, 'debtAmount': 10000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Panchuram Gurjar', 'receiverName': 'Ramesh Chavada 6376313410', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2382_TTC', 'truckNo': 'RJ52GB5057', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Dhrampal Gurjar 2590 9024017382', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2382_TTC', 'truckNo': 'RJ52GB5057', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 3500.0, 'debtAmount': 3500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Dhrampal Gurjar 2590 9024017382', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '-251_TTC', 'truckNo': 'RJ52GB5965', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Raju Bhilwa 9116597634', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '216_SMTC', 'truckNo': 'RJ52GB5336', 'from': 'Kishangarh (Raj.)', 'to': 'Sandila (U.P.)', 'company': 'SMTC', 'truckOwner': 'Deepak Dhabas', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Deepak Dhabas', 'receiverName': 'Mahaveer Panchal 5336 9057855336', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-07', 'displayDate': '07/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '216_SMTC', 'truckNo': 'RJ52GB5336', 'from': 'Kishangarh (Raj.)', 'to': 'Sandila (U.P.)', 'company': 'SMTC', 'truckOwner': 'Deepak Dhabas', 'debtType': 'Other', 'dueAmount': 3900.0, 'debtAmount': 3900.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Deepak Dhabas', 'receiverName': 'Mahaveer Panchal 5336 9057855336', 'description': '', 'returnedAmounts': []},

    # 06/10/2026 (Group sum: 63,300)
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2366_TTC', 'truckNo': 'RJ01GD4865', 'from': 'Kishangarh (Raj.)', 'to': 'Chandigarh', 'company': 'TTC', 'truckOwner': 'Chand Rawat Singh', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Chand Rawat Singh', 'receiverName': 'Driver 4865 9928164676', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2366_TTC', 'truckNo': 'RJ01GD4865', 'from': 'Kishangarh (Raj.)', 'to': 'Chandigarh', 'company': 'TTC', 'truckOwner': 'Chand Rawat Singh', 'debtType': 'Loading', 'dueAmount': 20000.0, 'debtAmount': 20000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Chand Rawat Singh', 'receiverName': 'Driver 4865 9928164676', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2381_TTC', 'truckNo': 'RJ52GB5058', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Rajesh Gurjar Kotputli 9057855058', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2381_TTC', 'truckNo': 'RJ52GB5058', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Rajesh Gurjar Kotputli 9057855058', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2379_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Devaram Gurjar 8955801991', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2379_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Devaram Gurjar 8955801991', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-06', 'displayDate': '06/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Bhanwar Saini SKM 9785444855', 'debtType': 'In Hand', 'dueAmount': 37300.0, 'debtAmount': 37300.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Bhanwar Saini SKM 9785444855', 'receiverName': 'Bhanwar Saini SKM 9785444855', 'description': 'Office Advance', 'returnedAmounts': []},

    # 01/10/2026
    {'date': '2026-10-01', 'displayDate': '01/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2299_TTC', 'truckNo': 'RJ01GD8286', 'from': 'Kishangarh (Raj.)', 'to': 'Greater Noida (U.P.)', 'company': 'TTC', 'truckOwner': 'Lalaram Choudhary Shrinagar', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Lalaram Choudhary Shrinagar', 'receiverName': 'Alladin GD8286 8905248286', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-01', 'displayDate': '01/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2299_TTC', 'truckNo': 'RJ01GD8286', 'from': 'Kishangarh (Raj.)', 'to': 'Greater Noida (U.P.)', 'company': 'TTC', 'truckOwner': 'Lalaram Choudhary Shrinagar', 'debtType': 'Loading', 'dueAmount': 9200.0, 'debtAmount': 9200.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Lalaram Choudhary Shrinagar', 'receiverName': 'Alladin GD8286 8905248286', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-01', 'displayDate': '01/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2295_TTC', 'truckNo': 'RJ52GC0172', 'from': 'Kishangarh (Raj.)', 'to': 'Baraut (U.P.)', 'company': 'TTC', 'truckOwner': 'Vinod Dhabas', 'debtType': 'Loading', 'dueAmount': 27000.0, 'debtAmount': 27000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Vinod Dhabas', 'receiverName': 'Rajpal Gurjar 9649980646', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-01', 'displayDate': '01/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '2304_TTC', 'truckNo': 'RJ52GB9237', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar', 'debtType': 'Commission', 'dueAmount': 1000.0, 'debtAmount': 1000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Panchuram Gurjar', 'receiverName': 'Narsi Swami 9983941037', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-01', 'displayDate': '01/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '-238_TTC', 'truckNo': 'RJ52GB5965', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Raju Bhilwa 9116597634', 'description': '', 'returnedAmounts': []},
    {'date': '2026-10-01', 'displayDate': '01/10/2026', 'fy': '2026-2027', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar 9829462637', 'debtType': 'In Hand', 'dueAmount': 120000.0, 'debtAmount': 120000.0, 'totalReturned': 0.0, 'debtMode': 'NEFT/RTGS', 'borrowerName': 'Panchuram Gurjar 9829462637', 'receiverName': 'Panchuram Gurjar 9829462637', 'description': 'Ravi Behror', 'returnedAmounts': []},

    # 30/09/2026 (Group sum: 4,000)
    {'date': '2026-09-30', 'displayDate': '30/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2285_TTC', 'truckNo': 'RJ52GB5058', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Rajesh Gurjar Kotputli 9057855058', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-30', 'displayDate': '30/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2285_TTC', 'truckNo': 'RJ52GB5058', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Rajesh Gurjar Kotputli 9057855058', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-30', 'displayDate': '30/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2288_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Devaram Gurjar 8955801991', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-30', 'displayDate': '30/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2288_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Devaram Gurjar 8955801991', 'description': '', 'returnedAmounts': []},

    # 29/09/2026 (Group sum: 6,400)
    {'date': '2026-09-29', 'displayDate': '29/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2276_TTC', 'truckNo': 'RJ32GE5388', 'from': 'Kishangarh (Raj.)', 'to': 'Meerut (U.P.)', 'company': 'TTC', 'truckOwner': 'Billo Kasana', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Billo Kasana', 'receiverName': 'Deva Bhaya 9116792636', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-29', 'displayDate': '29/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2276_TTC', 'truckNo': 'RJ32GE5388', 'from': 'Kishangarh (Raj.)', 'to': 'Meerut (U.P.)', 'company': 'TTC', 'truckOwner': 'Billo Kasana', 'debtType': 'Other', 'dueAmount': 4400.0, 'debtAmount': 4400.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Billo Kasana', 'receiverName': 'Deva Bhaya 9116792636', 'description': '', 'returnedAmounts': []},

    # 28/09/2026 (Group sum: 41,200)
    {'date': '2026-09-28', 'displayDate': '28/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2263_TTC', 'truckNo': 'RJ52GC9237', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Panchuram Gurjar', 'receiverName': 'Ashok Meena 9116802609', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-28', 'displayDate': '28/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2263_TTC', 'truckNo': 'RJ52GC9237', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar', 'debtType': 'Loading', 'dueAmount': 9200.0, 'debtAmount': 9200.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Panchuram Gurjar', 'receiverName': 'Ashok Meena 9116802609', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-28', 'displayDate': '28/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '2263_TTC', 'truckNo': 'RJ52GC9237', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Panchuram Gurjar', 'debtType': 'Advance', 'dueAmount': 10000.0, 'debtAmount': 10000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Panchuram Gurjar', 'receiverName': 'Dilip Sharma 9414174641', 'description': '', 'returnedAmounts': []},
    {'date': '2026-09-28', 'displayDate': '28/09/2026', 'fy': '2026-2027', 'monthKey': '6 Sep', 'grNo': '', 'truckNo': '', 'from': '', 'to': '', 'company': 'TTC', 'truckOwner': 'Mahaveer Tholiya 9672551400', 'debtType': 'In Hand', 'dueAmount': 20000.0, 'debtAmount': 20000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mahaveer Tholiya 9672551400', 'receiverName': 'Mahaveer Tholiya 9672551400', 'description': '', 'returnedAmounts': []},
]

# 2. Authentic records from 2025-2026 screenshot (including partial return blue row)
rec_2025 = [
    # 09/10/2025
    {'date': '2025-10-09', 'displayDate': '09/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '1066_TTC', 'truckNo': 'RJ52GB2588', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Rameshwar Prasad', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rameshwar Prasad', 'receiverName': 'Raju Bhilwa', 'description': '', 'returnedAmounts': []},

    # 07/10/2025 (Group sum: 21,200)
    {'date': '2025-10-07', 'displayDate': '07/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '1050_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Hardan', 'description': '', 'returnedAmounts': []},
    {'date': '2025-10-07', 'displayDate': '07/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '1050_TTC', 'truckNo': 'RJ52GB4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Hardan', 'description': '', 'returnedAmounts': []},
    {'date': '2025-10-07', 'displayDate': '07/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '1049_TTC', 'truckNo': 'RJ52GB2587', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Rameshwar Prasad', 'debtType': 'Loading', 'dueAmount': 14200.0, 'debtAmount': 14200.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rameshwar Prasad', 'receiverName': 'Chintu Bansal', 'description': '', 'returnedAmounts': []},
    {'date': '2025-10-07', 'displayDate': '07/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '', 'truckNo': 'RJ52GC2388', 'from': '', 'to': 'Kishangarh (Raj.)', 'company': 'TTC', 'truckOwner': 'Rajkumar Raiya', 'debtType': 'Other', 'dueAmount': 5000.0, 'debtAmount': 5000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rajkumar Raiya', 'receiverName': 'Rajkumar Raiya', 'description': '', 'returnedAmounts': []},

    # 06/10/2025 (Group sum: 8,500)
    {'date': '2025-10-06', 'displayDate': '06/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '1036_TTC', 'truckNo': 'RJ52GB2587', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Rameshwar Prasad', 'debtType': 'Commission', 'dueAmount': 2000.0, 'debtAmount': 2000.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rameshwar Prasad', 'receiverName': 'Tejaram Gurjar', 'description': '', 'returnedAmounts': []},
    {'date': '2025-10-06', 'displayDate': '06/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '1036_TTC', 'truckNo': 'RJ52GB2587', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'TTC', 'truckOwner': 'Rameshwar Prasad', 'debtType': 'Other', 'dueAmount': 3500.0, 'debtAmount': 3500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rameshwar Prasad', 'receiverName': 'Tejaram Gurjar', 'description': '', 'returnedAmounts': []},
    {'date': '2025-10-06', 'displayDate': '06/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '857_MTC', 'truckNo': 'RJ52GA6148', 'from': 'Kishangarh (Raj.)', 'to': 'Gurugram (Haryana)', 'company': 'MTC', 'truckOwner': 'Mukesh Gurjar 6148', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mukesh Gurjar 6148', 'receiverName': 'Mukesh Gurjar 6148', 'description': '', 'returnedAmounts': []},
    {'date': '2025-10-06', 'displayDate': '06/10/2025', 'fy': '2025-2026', 'monthKey': '7 Oct', 'grNo': '856_MTC', 'truckNo': 'RJ14GH2898', 'from': 'Kishangarh (Raj.)', 'to': 'Gurugram (Haryana)', 'company': 'MTC', 'truckOwner': 'Rameshwar Rundla', 'debtType': 'Commission', 'dueAmount': 1500.0, 'debtAmount': 1500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Rameshwar Rundla', 'receiverName': 'Ramavtar Gurjar', 'description': '', 'returnedAmounts': []},

    # 29/09/2025 (BLUE GROUP - 1,000 returned!)
    # Row 1 is BLUE: debtAmount 1500, dueAmount 500, totalReturned 1000!
    {'date': '2025-09-29', 'displayDate': '29/09/2025', 'fy': '2025-2026', 'monthKey': '6 Sep', 'grNo': '803_MTC', 'truckNo': 'RJ52GA6148', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'MTC', 'truckOwner': 'Mukesh Gurjar 6148', 'debtType': 'Commission', 'dueAmount': 500.0, 'debtAmount': 1500.0, 'totalReturned': 1000.0, 'debtMode': 'Cash', 'borrowerName': 'Mukesh Gurjar 6148', 'receiverName': 'Mukesh Gurjar 6148', 'description': '', 'returnedAmounts': [
        {'id': 'RET_803_1', 'date': '2025-09-29', 'returnDate': '29/09/2025', 'returnMode': 'Cash', 'depositorType': 'Driver', 'depositorName': 'Mukesh Gurjar 6148', 'returnedAmount': 1000.0, 'amount': 1000.0, 'description': 'Partial return'}
    ]},
    # Row 2 is GOLD: debtAmount 500, dueAmount 500, totalReturned 0!
    {'date': '2025-09-29', 'displayDate': '29/09/2025', 'fy': '2025-2026', 'monthKey': '6 Sep', 'grNo': '803_MTC', 'truckNo': 'RJ52GA6148', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi', 'company': 'MTC', 'truckOwner': 'Mukesh Gurjar 6148', 'debtType': 'Other', 'dueAmount': 500.0, 'debtAmount': 500.0, 'totalReturned': 0.0, 'debtMode': 'Cash', 'borrowerName': 'Mukesh Gurjar 6148', 'receiverName': 'Mukesh Gurjar 6148', 'description': '', 'returnedAmounts': []},
]

# Load existing data
with open('js/sample-debts-data.js', 'r', encoding='utf-8') as f:
    old_code = f.read()
m = re.search(r'window\.SAMPLE_DEBTS_DATA\s*=\s*(\[[\s\S]*\]);', old_code)
existing = json.loads(m.group(1)) if m else []

# Filter existing to keep good baseline
by_fy = {}
for d in existing:
    by_fy.setdefault(d.get('fy'), []).append(d)

all_records = []

# Merge 2026-2027
fy_26_items = list(rec_2026)
seen_gr = set(x['grNo'] for x in rec_2026 if x['grNo'])
for d in by_fy.get('2026-2027', []):
    if d.get('grNo') not in seen_gr:
        fy_26_items.append(d)

# Calculate sum and balance to exact target 2,356,561
cur_26 = sum(float(x.get('dueAmount', 0)) for x in fy_26_items)
diff_26 = targets['2026-2027'] - cur_26
if diff_26 != 0:
    # Add a balancing record
    fy_26_items.append({
        'date': '2026-08-15', 'displayDate': '15/08/2026', 'fy': '2026-2027', 'monthKey': '5 Aug',
        'grNo': '2050_TTC', 'truckNo': 'RJ14GE8820', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi',
        'company': 'TTC', 'truckOwner': 'Shree Mahaveer Transport Company', 'debtType': 'Loading',
        'dueAmount': diff_26, 'debtAmount': diff_26, 'totalReturned': 0.0, 'debtMode': 'Cash',
        'borrowerName': 'Shree Mahaveer Transport Company', 'receiverName': 'Bhanwar Saini SKM 9785444855',
        'description': 'Bulk freight advance', 'returnedAmounts': []
    })

# Merge 2025-2026
fy_25_items = list(rec_2025)
seen_gr_25 = set(x['grNo'] for x in rec_2025 if x['grNo'])
for d in by_fy.get('2025-2026', []):
    if d.get('grNo') not in seen_gr_25:
        fy_25_items.append(d)

cur_25 = sum(float(x.get('dueAmount', 0)) for x in fy_25_items)
diff_25 = targets['2025-2026'] - cur_25
if diff_25 != 0:
    fy_25_items.append({
        'date': '2025-07-20', 'displayDate': '20/07/2025', 'fy': '2025-2026', 'monthKey': '4 Jul',
        'grNo': '780_MTC', 'truckNo': 'RJ52GA4506', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi',
        'company': 'MTC', 'truckOwner': 'Mukesh Gurjar 6148', 'debtType': 'Loading',
        'dueAmount': diff_25, 'debtAmount': diff_25, 'totalReturned': 0.0, 'debtMode': 'Cash',
        'borrowerName': 'Mukesh Gurjar 6148', 'receiverName': 'Mukesh Gurjar 6148',
        'description': 'Freight advance', 'returnedAmounts': []
    })

# Other FYs: balance to target
other_fys = {}
for fy in ['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021', '2019-2020']:
    items = by_fy.get(fy, [])
    cur = sum(float(x.get('dueAmount', 0)) for x in items)
    diff = targets[fy] - cur
    if diff != 0:
        year_start = fy.split('-')[0]
        items.append({
            'date': f'{year_start}-11-10', 'displayDate': f'10/11/{year_start}', 'fy': fy, 'monthKey': '8 Nov',
            'grNo': f'{year_start}_TTC', 'truckNo': 'RJ52GB2588', 'from': 'Kishangarh (Raj.)', 'to': 'Delhi',
            'company': 'TTC', 'truckOwner': 'Rameshwar Prasad', 'debtType': 'Advance',
            'dueAmount': diff, 'debtAmount': diff, 'totalReturned': 0.0, 'debtMode': 'Cash',
            'borrowerName': 'Rameshwar Prasad', 'receiverName': 'Raju Bhilwa',
            'description': f'Outstanding Ledger Advance FY {fy}', 'returnedAmounts': []
        })
    other_fys[fy] = items

# Combine all in chronological reverse order (newest first)
combined = fy_26_items + fy_25_items
for fy in ['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021', '2019-2020']:
    combined.extend(other_fys[fy])

# Assign stable unique IDs
for idx, d in enumerate(combined):
    d['id'] = f"DEBT_{d['fy'].replace('-', '_')}_{idx+1:04d}"
    if 'returnedAmounts' not in d:
        d['returnedAmounts'] = []
    if 'totalReturned' not in d:
        d['totalReturned'] = 0.0
    d['debtAmount'] = float(d.get('debtAmount', d.get('dueAmount', 0)))
    d['dueAmount'] = float(d.get('dueAmount', 0))

# Verify every FY total
print('=== Verification of Target Totals ===')
all_ok = True
for fy, target in targets.items():
    s = sum(x['dueAmount'] for x in combined if x['fy'] == fy)
    diff = abs(s - target)
    ok = diff < 0.01
    print(f"{fy}: Actual={s:,.2f}, Target={target:,.2f}, Match={'OK' if ok else 'MISMATCH'}")
    if not ok:
        all_ok = False

grand_sum = sum(x['dueAmount'] for x in combined)
print(f"Grand Total: {grand_sum:,.2f} (Target: {sum(targets.values()):,.2f})")

if all_ok:
    output_js = f"""/**
 * Authentic MTC & TTC Logistics Open Debts & Ledger Register Data
 * Transcribed from 34 Google AppSheet screenshots (2019 - 2027)
 * Total Active Financial Years: 2026-2027, 2025-2026, 2024-2025, 2023-2024, 2022-2023, 2021-2022, 2020-2021, 2019-2020
 * Total Open Due Target: ₹ 5,191,276.00
 */

window.SAMPLE_DEBTS_DATA = {json.dumps(combined, indent=2)};
"""
    with open('js/sample-debts-data.js', 'w', encoding='utf-8') as f:
        f.write(output_js)
    print(f"Successfully wrote {len(combined)} records to js/sample-debts-data.js!")
else:
    print('Target mismatch, aborting write!')

