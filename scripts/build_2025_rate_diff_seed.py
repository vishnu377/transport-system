# -*- coding: utf-8 -*-
import json

trips_2025 = [
  # 31/03/2026 ₹ 9,638.00
  {'grNo': '2791_TTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 155000, 'weight': 100.000, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1550, 'truckOwner': 'Pradhan Choudhary', 'startDate': '31/03/2026'},
  {'grNo': '2816_TTC', 'billNo': '', 'truckNo': 'RJ01GC3507', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2400, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 1008, 'truckOwner': 'Kalu Ram Yadav Shrinagar', 'startDate': '31/03/2026'},
  {'grNo': '2827_TTC', 'billNo': '14', 'truckNo': 'RJ52GA9438', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 138040, 'weight': 78.880, 'rate': 1750, 'consignee': 'Kapsons India', 'ownerDue': 1380, 'truckOwner': 'Kailash Dhabas', 'startDate': '31/03/2026'},
  {'grNo': '2817_TTC', 'billNo': '', 'truckNo': 'RJ33GA6732', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2600, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5700, 'truckOwner': 'Jagdamba Transport', 'startDate': '31/03/2026'},

  # 30/03/2026 ₹ 15,867.00
  {'grNo': '2800_TTC', 'billNo': '', 'truckNo': 'RJ52GB4737', 'destination': 'Delhi', 'reference': 'Chotu Ji Choudhary Venk...', 'biltyAmount': 14000, 'weight': 1.000, 'rate': 0, 'consignee': 'JCR Marbles and Granites', 'ownerDue': 14000, 'truckOwner': 'Panchuram Gurjar', 'startDate': '30/03/2026'},
  {'grNo': '2793_TTC', 'billNo': '', 'truckNo': 'RJ52GB0772', 'destination': 'Delhi', 'reference': 'Vineet Oswal Marble', 'biltyAmount': 20000, 'weight': 57.900, 'rate': 1950, 'consignee': 'Oswal Granites', 'ownerDue': 200, 'truckOwner': 'Vinod Dhabas', 'startDate': '30/03/2026'},
  {'grNo': '2808_TTC', 'billNo': '8', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 166653, 'weight': 95.230, 'rate': 1750, 'consignee': 'Kapsons India', 'ownerDue': 1667, 'truckOwner': 'Shishram Meena', 'startDate': '30/03/2026'},

  # 28/03/2026 ₹ 7,470.00
  {'grNo': '2782_TTC', 'billNo': '', 'truckNo': 'RJ01GE0121', 'destination': 'Hapur (U.P.)', 'reference': 'Jitendra Goyal', 'biltyAmount': 144210, 'weight': 87.400, 'rate': 1600, 'consignee': 'GARG PAINT AND KALI DE...', 'ownerDue': 30, 'truckOwner': 'Dinesh Yadav Shrinagar', 'startDate': '28/03/2026'},
  {'grNo': '2769_TTC', 'billNo': '', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kalyan Meena', 'startDate': '28/03/2026'},

  # 27/03/2026 ₹ 10,182.00
  {'grNo': '2755_TTC', 'billNo': '', 'truckNo': 'RJ01GC2159', 'destination': 'Bulandshahar (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 146475, 'weight': 94.500, 'rate': 1650, 'consignee': 'Shivagarh Soap and Che...', 'ownerDue': 4725, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '27/03/2026'},
  {'grNo': '554_SMTC', 'billNo': '1', 'truckNo': 'RJ52GB5146', 'destination': 'Sandila (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 78.730, 'rate': 2150, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1328, 'truckOwner': 'Kailash Dhabas', 'startDate': '27/03/2026'},
  {'grNo': '2758_TTC', 'billNo': '', 'truckNo': 'RJ32GD3413', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Rishi Aggarwal Maniyana', 'biltyAmount': 0, 'weight': 42.400, 'rate': 2250, 'consignee': 'AKROSS COATINGS PRIVA...', 'ownerDue': 885, 'truckOwner': 'Kailash Dhabas', 'startDate': '27/03/2026'},
  {'grNo': '2752_TTC', 'billNo': '9', 'truckNo': 'RJ52GA7720', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1050, 'truckOwner': 'Kailash Dhabas', 'startDate': '27/03/2026'},
  {'grNo': '2759_TTC', 'billNo': '', 'truckNo': 'RJ14GP1978', 'destination': 'Jhajjar (Haryana)', 'reference': 'Anuj Maloo Happy Minera...', 'biltyAmount': 0, 'weight': 75.290, 'rate': 1430, 'consignee': 'BirlaNu Ltd. Jhajjar Putt...', 'ownerDue': 2194, 'truckOwner': 'Bhanu', 'startDate': '27/03/2026'},

  # 26/03/2026 ₹ 1,300.00
  {'grNo': '-346_TTC', 'billNo': '', 'truckNo': 'RJ01GC2191', 'destination': 'Noida (U.P.)', 'reference': 'Anil Tyagi', 'biltyAmount': 0, 'weight': 50.000, 'rate': 1900, 'consignee': '', 'ownerDue': 1300, 'truckOwner': 'Kalu Ram Yadav Shrinagar', 'startDate': '26/03/2026'},

  # 25/03/2026 ₹ 16,507.00
  {'grNo': '2716_TTC', 'billNo': '', 'truckNo': 'RJ52GB5521', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '25/03/2026'},
  {'grNo': '2715_TTC', 'billNo': '', 'truckNo': 'RJ52GA7296', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '25/03/2026'},
  {'grNo': '2737_TTC', 'billNo': '', 'truckNo': 'RJ52GC1572', 'destination': 'Noida (U.P.)', 'reference': 'Yogesh Solanki Granite J...', 'biltyAmount': 158782, 'weight': 81.130, 'rate': 1800, 'consignee': 'STONEX GLOBAL CORPO...', 'ownerDue': 1431, 'truckOwner': 'Vinod Dhabas', 'startDate': '25/03/2026'},
  {'grNo': '2723_TTC', 'billNo': '', 'truckNo': 'RJ52GB3237', 'destination': 'Delhi', 'reference': 'Krishna Kanhaiya Mineral...', 'biltyAmount': 92378, 'weight': 41.990, 'rate': 2200, 'consignee': 'M/S Mohan Infinity', 'ownerDue': 196, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '25/03/2026'},

  # 24/03/2026 ₹ 17,153.00
  {'grNo': '2699_TTC', 'billNo': '', 'truckNo': 'RJ01GD6036', 'destination': 'Khanna (Punjab)', 'reference': 'Ganpati Minerals', 'biltyAmount': 149600, 'weight': 80.000, 'rate': 1870, 'consignee': 'Hirock Industries', 'ownerDue': 1865, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '24/03/2026'},
  {'grNo': '2688_TTC', 'billNo': '', 'truckNo': 'RJ52GB5522', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '24/03/2026'},
  {'grNo': '2710_TTC', 'billNo': '', 'truckNo': 'RJ52GA3137', 'destination': 'Rudrapur (U.K.)', 'reference': 'SHREE RAM GRANITMARM...', 'biltyAmount': 90896, 'weight': 34.960, 'rate': 2600, 'consignee': 'NCC LIMITED', 'ownerDue': 155, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '24/03/2026'},
  {'grNo': '2708_TTC', 'billNo': '342', 'truckNo': 'RJ52GB1837', 'destination': 'Rohtak (Haryana)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 42.000, 'rate': 1850, 'consignee': 'ASIAN PAINTS LTD.', 'ownerDue': 2856, 'truckOwner': 'Panchuram Gurjar', 'startDate': '24/03/2026'},
  {'grNo': '2705_TTC', 'billNo': '', 'truckNo': 'RJ01GC3456', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 1029, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '24/03/2026'},
  {'grNo': '2714_TTC', 'billNo': '', 'truckNo': 'RJ01GD0821', 'destination': 'Sirsa (H.R.)', 'reference': 'Kailash Agarwal Alwar', 'biltyAmount': 0, 'weight': 90.800, 'rate': 1700, 'consignee': 'Arya Paints & Chemicals', 'ownerDue': 3890, 'truckOwner': 'Sattu Kumawat Shrinagar', 'startDate': '24/03/2026'},
  {'grNo': '2711_TTC', 'billNo': '', 'truckNo': 'RJ32GE2072', 'destination': 'Kanpur (U.P.)', 'reference': 'Ajay Singh Chouhan Gunj...', 'biltyAmount': 107199, 'weight': 41.350, 'rate': 2580, 'consignee': 'ASIAN PAINTS PPG PRIVA...', 'ownerDue': -82, 'truckOwner': 'Vinod Dhabas', 'startDate': '24/03/2026'},

  # 23/03/2026 ₹ 7,564.00
  {'grNo': '2684_TTC', 'billNo': '336', 'truckNo': 'RJ52GB3735', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 178745, 'weight': 101.510, 'rate': 1750, 'consignee': 'Kapsons India', 'ownerDue': 3777, 'truckOwner': 'Kallu Meena', 'startDate': '23/03/2026'},
  {'grNo': '2687_TTC', 'billNo': '343', 'truckNo': 'RJ52GA5396', 'destination': 'Kanpur (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 35.000, 'rate': 2500, 'consignee': 'Asian Paints Ltd.', 'ownerDue': 875, 'truckOwner': 'Raju Gurjar', 'startDate': '23/03/2026'},
  {'grNo': '2695_TTC', 'billNo': '', 'truckNo': 'RJ42GA3374', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Om Saini', 'biltyAmount': 152912, 'weight': 95.570, 'rate': 1600, 'consignee': 'Aneeb Chemicals Pvt. Ltd.', 'ownerDue': 2912, 'truckOwner': 'Balveer Yadav', 'startDate': '23/03/2026'},

  # 22/03/2026 ₹ 7,440.00
  {'grNo': '2674_TTC', 'billNo': '', 'truckNo': 'RJ52GB5523', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Manish Lunayat', 'startDate': '22/03/2026'},

  # 21/03/2026 ₹ 3,950.00
  {'grNo': '2658_TTC', 'billNo': '335', 'truckNo': 'RJ52GA8567', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1050, 'truckOwner': 'Vinod Dhabas', 'startDate': '21/03/2026'},
  {'grNo': '2669_TTC', 'billNo': '', 'truckNo': 'RJ01GC3507', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2450, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 2900, 'truckOwner': 'Kalu Ram Yadav Shrinagar', 'startDate': '21/03/2026'},

  # 20/03/2026 ₹ 20,765.00
  {'grNo': '2627_TTC', 'billNo': '', 'truckNo': 'RJ52GB5524', 'destination': 'Sandila (U.P.)', 'reference': 'Indore Devendra Soni Ma...', 'biltyAmount': 0, 'weight': 41.000, 'rate': 2600, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5125, 'truckOwner': 'Manish Lunayat', 'startDate': '20/03/2026'},
  {'grNo': '2640_TTC', 'billNo': '', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 8000, 'truckOwner': 'Kalyan Meena', 'startDate': '20/03/2026'},
  {'grNo': '2629_TTC', 'billNo': '', 'truckNo': 'RJ26GA8214', 'destination': 'Unnao (U.P.)', 'reference': 'Kamal Ramchandnani', 'biltyAmount': 0, 'weight': 93.120, 'rate': 1980, 'consignee': 'PROMOIS INTERNATIONA...', 'ownerDue': 7640, 'truckOwner': 'Sitaram Meena', 'startDate': '20/03/2026'},

  # 19/03/2026 ₹ 55.00
  {'grNo': '2639_TTC', 'billNo': '', 'truckNo': 'RJ52GA1770', 'destination': 'Tohana (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 27500, 'weight': 55.000, 'rate': 1000, 'consignee': 'PARMOD KUMAR ASHWINI...', 'ownerDue': 55, 'truckOwner': 'Panchuram Gurjar', 'startDate': '19/03/2026'},

  # 18/03/2026 ₹ 2,200.00
  {'grNo': '2616_TTC', 'billNo': '332', 'truckNo': 'RJ52GB5147', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1050, 'truckOwner': 'Kailash Dhabas', 'startDate': '18/03/2026'},
  {'grNo': '2624_TTC', 'billNo': '', 'truckNo': 'RJ52GB5523', 'destination': 'Noida (U.P.)', 'reference': 'Satyajeet Khatri', 'biltyAmount': 87318, 'weight': 41.580, 'rate': 2100, 'consignee': 'Gajindra Polytech', 'ownerDue': 166, 'truckOwner': 'Kailash Dhabas', 'startDate': '18/03/2026'},
  {'grNo': '2623_TTC', 'billNo': '', 'truckNo': 'RJ52GA7296', 'destination': 'Unnao (U.P.)', 'reference': 'Virsun Industries', 'biltyAmount': 98400, 'weight': 41.000, 'rate': 2400, 'consignee': 'M.H. ENTERPRISES', 'ownerDue': 984, 'truckOwner': 'Kailash Dhabas', 'startDate': '18/03/2026'},

  # 16/03/2026 ₹ 9,336.00
  {'grNo': '2580_TTC', 'billNo': '', 'truckNo': 'RJ52GA3137', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 35.000, 'rate': 2300, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 805, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '16/03/2026'},
  {'grNo': '2583_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Barabanki (U.P.)', 'reference': 'Virsun Industries', 'biltyAmount': 179151, 'weight': 85.310, 'rate': 2100, 'consignee': 'New Vanshika Agroindus...', 'ownerDue': 8531, 'truckOwner': 'Shishram Meena', 'startDate': '16/03/2026'},

  # 15/03/2026 ₹ 8,150.00
  {'grNo': '547_SMTC', 'billNo': '525', 'truckNo': 'RJ01GC2036', 'destination': 'Karnal (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 46521, 'weight': 41.500, 'rate': 950, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 1660, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '15/03/2026'},
  {'grNo': '548_SMTC', 'billNo': '526', 'truckNo': 'RJ01GC2036', 'destination': 'Ashandh Haryana', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 15133, 'weight': 13.500, 'rate': 950, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 540, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '15/03/2026'},
  {'grNo': '2572_TTC', 'billNo': '', 'truckNo': 'RJ14GF8137', 'destination': 'Gurugram (Haryana)', 'reference': 'Mahesh Jinjwadiya', 'biltyAmount': 20000, 'weight': 35.000, 'rate': 2000, 'consignee': 'Shree Vinayak Stone', 'ownerDue': 5950, 'truckOwner': 'Panchuram Gurjar', 'startDate': '15/03/2026'},

  # 14/03/2026 ₹ 2,000.00
  {'grNo': '2546_TTC', 'billNo': '322', 'truckNo': 'RJ52GA7037', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 2000, 'truckOwner': 'Heera Lal Saradhana', 'startDate': '14/03/2026'},

  # 13/03/2026 ₹ 12,690.00
  {'grNo': '2534_TTC', 'billNo': '', 'truckNo': 'RJ01GD4236', 'destination': 'Haridwar (U.K.)', 'reference': 'Madan sahu', 'biltyAmount': 148574, 'weight': 80.310, 'rate': 1800, 'consignee': 'Arosun Paints Coating (I...', 'ownerDue': 12690, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '13/03/2026'},

  # 12/03/2026 ₹ 3,100.00
  {'grNo': '2505_TTC', 'billNo': '', 'truckNo': 'RJ48GA3365', 'destination': 'Jhajjar (Haryana)', 'reference': 'Shyam Sharma', 'biltyAmount': 0, 'weight': 78.360, 'rate': 1400, 'consignee': 'BirlaNu Ltd. Jhajjar Putt...', 'ownerDue': 1596, 'truckOwner': 'Surendra Dhabas', 'startDate': '12/03/2026'},
  {'grNo': '2527_TTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 150350, 'weight': 97.000, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1504, 'truckOwner': 'Pradhan Choudhary', 'startDate': '12/03/2026'},

  # 11/03/2026 ₹ 3,985.00
  {'grNo': '2515_TTC', 'billNo': '305', 'truckNo': 'RJ42GA3374', 'destination': 'Noida (U.P.)', 'reference': 'Gajendra Auddichya', 'biltyAmount': 128800, 'weight': 80.500, 'rate': 1600, 'consignee': 'KNIGHT BUILDING SOLUT...', 'ownerDue': 3985, 'truckOwner': 'Balveer Yadav', 'startDate': '11/03/2026'},

  # 10/03/2026 ₹ 1,000.00
  {'grNo': '2488_TTC', 'billNo': '', 'truckNo': 'RJ01GD0421', 'destination': 'Nasrullapur (U.K.)', 'reference': 'Shubham Laddha', 'biltyAmount': 25000, 'weight': 91.500, 'rate': 1600, 'consignee': 'M/S CENTURY MARBLE & ...', 'ownerDue': 1000, 'truckOwner': 'Dinesh Yadav', 'startDate': '10/03/2026'},

  # 09/03/2026 ₹ 5,720.00
  {'grNo': '2481_TTC', 'billNo': '', 'truckNo': 'RJ52GA6549', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5720, 'truckOwner': 'Sitaram Meena', 'startDate': '09/03/2026'},

  # 07/03/2026 ₹ 7,440.00
  {'grNo': '2457_TTC', 'billNo': '323', 'truckNo': 'RJ52GB4487', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '07/03/2026'},

  # 06/03/2026 ₹ 996.00
  {'grNo': '2447_TTC', 'billNo': '', 'truckNo': 'RJ01GD0501', 'destination': 'Meerut (U.P.)', 'reference': 'Prakash Nakum', 'biltyAmount': 129120, 'weight': 80.700, 'rate': 1600, 'consignee': 'Solcrete', 'ownerDue': 996, 'truckOwner': 'Amit Rajpurohit', 'startDate': '06/03/2026'},

  # 05/03/2026 ₹ 4,538.00
  {'grNo': '2438_TTC', 'billNo': '', 'truckNo': 'RJ01GD0421', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 69913, 'weight': 90.500, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 4538, 'truckOwner': 'Dinesh Yadav', 'startDate': '05/03/2026'},

  # 04/03/2026 ₹ 8,000.00
  {'grNo': '2429_TTC', 'billNo': '', 'truckNo': 'RJ52GA7721', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 4000, 'truckOwner': 'Kailash Dhabas', 'startDate': '04/03/2026'},
  {'grNo': '2431_TTC', 'billNo': '', 'truckNo': 'RJ52GB5146', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 4000, 'truckOwner': 'Kailash Dhabas', 'startDate': '04/03/2026'},

  # 02/03/2026 ₹ 3,200.00
  {'grNo': '2414_TTC', 'billNo': '', 'truckNo': 'RJ01GE0121', 'destination': 'Nanauta (U.P.)', 'reference': 'Mahendra Sharma', 'biltyAmount': 25000, 'weight': 84.160, 'rate': 1600, 'consignee': 'Rajasthan Marble & Grani...', 'ownerDue': 400, 'truckOwner': 'Dinesh Yadav Shrinagar', 'startDate': '02/03/2026'},
  {'grNo': '2415_TTC', 'billNo': '', 'truckNo': 'RJ01GD3707', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 40.000, 'rate': 2350, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 2800, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '02/03/2026'},

  # 01/03/2026 ₹ 3,696.00
  {'grNo': '2403_TTC', 'billNo': '', 'truckNo': 'RJ01GD0421', 'destination': 'Hapur (U.P.)', 'reference': 'Jitendra Goyal', 'biltyAmount': 126704, 'weight': 79.000, 'rate': 1600, 'consignee': 'GARG PAINT AND KALI DE...', 'ownerDue': -304, 'truckOwner': 'Dinesh Yadav', 'startDate': '01/03/2026'},
  {'grNo': '2407_TTC', 'billNo': '', 'truckNo': 'RJ52GB5147', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 4000, 'truckOwner': 'Kailash Dhabas', 'startDate': '01/03/2026'},

  # 28/02/2026 ₹ 4,000.00
  {'grNo': '2395_TTC', 'billNo': '', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 4000, 'truckOwner': 'Kalyan Meena', 'startDate': '28/02/2026'},

  # 27/02/2026 ₹ 13,355.00
  {'grNo': '2380_TTC', 'billNo': '', 'truckNo': 'RJ30GA5058', 'destination': 'Lucknow (U.P.)', 'reference': 'Naveen Jain', 'biltyAmount': 25000, 'weight': 48.930, 'rate': 2600, 'consignee': 'Sri Hari Stone Company', 'ownerDue': 4900, 'truckOwner': 'Kaluram Daroga', 'startDate': '27/02/2026'},
  {'grNo': '530_SMTC', 'billNo': '507', 'truckNo': 'RJ01GD0521', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 187655, 'weight': 102.600, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1590, 'truckOwner': 'Kishan Rawat GD0521', 'startDate': '27/02/2026'},
  {'grNo': '2391_TTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 143840, 'weight': 92.800, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1439, 'truckOwner': 'Pradhan Choudhary', 'startDate': '27/02/2026'},
  {'grNo': '2382_TTC', 'billNo': '292', 'truckNo': 'RJ52GB4487', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 147600, 'weight': 82.000, 'rate': 1800, 'consignee': 'Kapsons India', 'ownerDue': 1476, 'truckOwner': 'Kailash Dhabas', 'startDate': '27/02/2026'},
  {'grNo': '2377_TTC', 'billNo': '', 'truckNo': 'RJ52GA7720', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 79.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 3950, 'truckOwner': 'Kailash Dhabas', 'startDate': '27/02/2026'},

  # 26/02/2026 ₹ 1,478.00
  {'grNo': '2365_TTC', 'billNo': '', 'truckNo': 'RJ42GA3374', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 147715, 'weight': 95.300, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1478, 'truckOwner': 'Balveer Yadav', 'startDate': '26/02/2026'},

  # 24/02/2026 ₹ 2,177.00
  {'grNo': '2339_TTC', 'billNo': '', 'truckNo': 'RJ52GB5172', 'destination': 'Meerut (U.P.)', 'reference': 'Ajay Export Ajay Aggarw...', 'biltyAmount': 102125, 'weight': 80.700, 'rate': 1250, 'consignee': 'Sanmati Paints & Chemic...', 'ownerDue': 2177, 'truckOwner': 'Vinod Dhabas', 'startDate': '24/02/2026'},

  # 22/02/2026 ₹ 2,554.00
  {'grNo': '2285_TTC', 'billNo': '', 'truckNo': 'RJ01GD2469', 'destination': 'Faridabad (Haryana)', 'reference': 'Sanjay Parikh', 'biltyAmount': 0, 'weight': 86.000, 'rate': 1430, 'consignee': 'M91- Faridabad', 'ownerDue': 2554, 'truckOwner': 'Pradeep Yadav', 'startDate': '22/02/2026'},

  # 21/02/2026 ₹ 11,986.00
  {'grNo': '527_SMTC', 'billNo': '508', 'truckNo': 'RJ14GK1136', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 201270, 'weight': 82.390, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 4912, 'truckOwner': 'Sitaram Meena', 'startDate': '21/02/2026'},
  {'grNo': '2268_TTC', 'billNo': '', 'truckNo': 'RJ48GA3365', 'destination': 'Palwal (Haryana)', 'reference': 'Kailash Agarwal Alwar', 'biltyAmount': 0, 'weight': 90.800, 'rate': 1500, 'consignee': 'Nagal Enterprises', 'ownerDue': 4994, 'truckOwner': 'Surendra Dhabas', 'startDate': '21/02/2026'},
  {'grNo': '2283_TTC', 'billNo': '', 'truckNo': 'RJ01GD4569', 'destination': 'Chandigarh', 'reference': 'Virsun Industries', 'biltyAmount': 127840, 'weight': 75.000, 'rate': 1700, 'consignee': 'R & D CHEMICALS', 'ownerDue': 1275, 'truckOwner': 'Pradeep Yadav', 'startDate': '21/02/2026'},
  {'grNo': '2292_TTC', 'billNo': '', 'truckNo': 'RJ52GA3137', 'destination': 'Sikandrabad (U.P.)', 'reference': '20 Microns Udaipur', 'biltyAmount': 80500, 'weight': 35.000, 'rate': 2300, 'consignee': 'SHALIMAR PAINTS LTD-\'S...', 'ownerDue': 805, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '21/02/2026'},

  # 20/02/2026 ₹ 17,493.00
  {'grNo': '2264_TTC', 'billNo': '', 'truckNo': 'RJ52GA7296', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '20/02/2026'},
  {'grNo': '2263_TTC', 'billNo': '', 'truckNo': 'RJ26GA8214', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Sitaram Meena', 'startDate': '20/02/2026'},
  {'grNo': '2265_TTC', 'billNo': '', 'truckNo': 'RJ01GD0711', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2250, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 945, 'truckOwner': 'Pradeep Yadav', 'startDate': '20/02/2026'},
  {'grNo': '525_SMTC', 'billNo': '504', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 0, 'weight': 83.500, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 680, 'truckOwner': 'Kalyan Meena', 'startDate': '20/02/2026'},
  {'grNo': '2266_TTC', 'billNo': '', 'truckNo': 'RJ52GB4746', 'destination': 'Jhajjar (Haryana)', 'reference': 'Jitendra Goyal', 'biltyAmount': 113582, 'weight': 81.000, 'rate': 1220, 'consignee': 'BirlaNu Ltd. Jhajjar Putt...', 'ownerDue': 988, 'truckOwner': 'Surendra Dhabas', 'startDate': '20/02/2026'},

  # 19/02/2026 ₹ 23,880.00
  {'grNo': '2234_TTC', 'billNo': '', 'truckNo': 'RJ52GB2274', 'destination': 'Sandila (U.P.)', 'reference': 'Sharif Tajmahal Marble', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Govind Choudhary', 'startDate': '19/02/2026'},
  {'grNo': '2247_TTC', 'billNo': '', 'truckNo': 'RJ52GA7294', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '19/02/2026'},
  {'grNo': '2251_TTC', 'billNo': '', 'truckNo': 'RJ33GA3088', 'destination': 'Aligarh (U.P.)', 'reference': 'Aahish Aggarwal Alwar', 'biltyAmount': 0, 'weight': 63.840, 'rate': 1600, 'consignee': 'CHIRAG WATER PROOFIN...', 'ownerDue': 9000, 'truckOwner': 'Jagdamba Transport', 'startDate': '19/02/2026'},

  # 18/02/2026 ₹ 7,990.00
  {'grNo': '521_SMTC', 'billNo': '502', 'truckNo': 'RJ52GA6549', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 201661, 'weight': 82.560, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 550, 'truckOwner': 'Sitaram Meena', 'startDate': '18/02/2026'},
  {'grNo': '2232_TTC', 'billNo': '', 'truckNo': 'RJ52GB5147', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '18/02/2026'},

  # 16/02/2026 ₹ 82.00
  {'grNo': '2216_TTC', 'billNo': '280', 'truckNo': 'RJ52GA5396', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Mukesh Jhangid Dwarke...', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 82, 'truckOwner': 'Raju Gurjar', 'startDate': '16/02/2026'},

  # 15/02/2026 ₹ 1,859.00
  {'grNo': '2189_TTC', 'billNo': '', 'truckNo': 'RJ32GC0997', 'destination': 'Bahadurgarh (Haryana)', 'reference': 'Jawahar Minerals Alwar', 'biltyAmount': 70000, 'weight': 79.000, 'rate': 1450, 'consignee': 'Sugan Chand Murari Lal', 'ownerDue': 446, 'truckOwner': 'Mahendra Gurjar', 'startDate': '15/02/2026'},
  {'grNo': '2200_TTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Dadri (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 141360, 'weight': 91.200, 'rate': 1550, 'consignee': 'Pawan Traders', 'ownerDue': 1413, 'truckOwner': 'Pradhan Choudhary', 'startDate': '15/02/2026'},

  # 14/02/2026 ₹ 2,830.00
  {'grNo': '2185_TTC', 'billNo': '', 'truckNo': 'RJ01GE0121', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 70973, 'weight': 91.300, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 2830, 'truckOwner': 'Dinesh Yadav Shrinagar', 'startDate': '14/02/2026'},

  # 13/02/2026 ₹ 18,343.00
  {'grNo': '2179_TTC', 'billNo': '', 'truckNo': 'RJ01GD0421', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Oswal Mineral Amet', 'biltyAmount': 148715, 'weight': 90.130, 'rate': 1650, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 3397, 'truckOwner': 'Dinesh Yadav', 'startDate': '13/02/2026'},
  {'grNo': '2175_TTC', 'billNo': '', 'truckNo': 'RJ52GB5146', 'destination': 'Barabanki (U.P.)', 'reference': 'Virsun Industries', 'biltyAmount': 169386, 'weight': 80.660, 'rate': 2100, 'consignee': 'New Vanshika Agroindus...', 'ownerDue': 14946, 'truckOwner': 'Kailash Dhabas', 'startDate': '13/02/2026'},

  # 11/02/2026 ₹ 6,984.00
  {'grNo': '2150_TTC', 'billNo': '', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5720, 'truckOwner': 'Kalyan Meena', 'startDate': '11/02/2026'},
  {'grNo': '514_SMTC', 'billNo': '493', 'truckNo': 'RJ52GA7721', 'destination': 'Sandila (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2150, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1264, 'truckOwner': 'Kailash Dhabas', 'startDate': '11/02/2026'},

  # 10/02/2026 ₹ 6,608.00
  {'grNo': '513_SMTC', 'billNo': '490', 'truckNo': 'RJ52GB5147', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 0, 'weight': 82.260, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 708, 'truckOwner': 'Kailash Dhabas', 'startDate': '10/02/2026'},
  {'grNo': '2140_TTC', 'billNo': '', 'truckNo': 'RJ32GD3413', 'destination': 'Jaunpur (U.P.)', 'reference': 'Durgesh Meena Udaipur', 'biltyAmount': 147000, 'weight': 42.000, 'rate': 3500, 'consignee': 'M/s Radhe Shyam Alumin...', 'ownerDue': 5900, 'truckOwner': 'Kailash Dhabas', 'startDate': '10/02/2026'},

  # 09/02/2026 ₹ 19,561.00
  {'grNo': '2126_TTC', 'billNo': '', 'truckNo': 'RJ52GA9434', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 83.170, 'rate': 1850, 'consignee': 'M/S. PRABHU MENERALS...', 'ownerDue': 1786, 'truckOwner': 'Kailash Dhabas', 'startDate': '09/02/2026'},
  {'grNo': '511_SMTC', 'billNo': '481', 'truckNo': 'RJ01GE0121', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 182900, 'weight': 100.000, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1550, 'truckOwner': 'Dinesh Yadav Shrinagar', 'startDate': '09/02/2026'},
  {'grNo': '2122_TTC', 'billNo': '', 'truckNo': 'RJ01GC2159', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 152675, 'weight': 97.750, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1455, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '09/02/2026'},
  {'grNo': '2115_TTC', 'billNo': '', 'truckNo': 'RJ01GD0921', 'destination': 'Zirukpur (Punjab)', 'reference': 'Vinay Sharma', 'biltyAmount': 158650, 'weight': 83.500, 'rate': 1950, 'consignee': 'Radiant Solutions', 'ownerDue': 12825, 'truckOwner': 'Sattu Kumawat Shrinagar', 'startDate': '09/02/2026'},
  {'grNo': '2120_TTC', 'billNo': '', 'truckNo': 'RJ01GD0711', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2250, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 945, 'truckOwner': 'Pradeep Yadav', 'startDate': '09/02/2026'},
  {'grNo': '2117_TTC', 'billNo': '274', 'truckNo': 'RJ52GB2274', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 40.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1000, 'truckOwner': 'Govind Choudhary', 'startDate': '09/02/2026'},

  # 08/02/2026 ₹ 5,720.00
  {'grNo': '2113_TTC', 'billNo': '', 'truckNo': 'RJ14GK1136', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5720, 'truckOwner': 'Sitaram Meena', 'startDate': '08/02/2026'},

  # 07/02/2026 ₹ 10,994.00
  {'grNo': '2103_TTC', 'billNo': '', 'truckNo': 'RJ52GA3137', 'destination': 'Noida (U.P.)', 'reference': 'Satyajeet Khatri', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2100, 'consignee': 'Gajindra Polytech', 'ownerDue': 20, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '07/02/2026'},
  {'grNo': '2099_TTC', 'billNo': '271', 'truckNo': 'RJ30GA5058', 'destination': 'Sandila (U.P.)', 'reference': 'Kunal Micron Vijay Jain', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1050, 'truckOwner': 'Kaluram Daroga', 'startDate': '07/02/2026'},
  {'grNo': '503_SMTC', 'billNo': '486', 'truckNo': 'RJ52GA7294', 'destination': 'Sandila (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 78.000, 'rate': 2300, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7644, 'truckOwner': 'Kailash Dhabas', 'startDate': '07/02/2026'},
  {'grNo': '2109_TTC', 'billNo': '', 'truckNo': 'RJ52GC3337', 'destination': 'Gorakhpur (U.P.)', 'reference': 'Bherulal Teli', 'biltyAmount': 25000, 'weight': 41.000, 'rate': 3000, 'consignee': 'MARBLE HOUSE', 'ownerDue': 1000, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '07/02/2026'},
  {'grNo': '2104_TTC', 'billNo': '', 'truckNo': 'RJ01GD0711', 'destination': 'Hathras (U.P.)', 'reference': 'Shree Durga Enterprises...', 'biltyAmount': 40000, 'weight': 82.000, 'rate': 1560, 'consignee': 'Shri Durga Enterprises', 'ownerDue': 1280, 'truckOwner': 'Amit Rajpurohit', 'startDate': '07/02/2026'},

  # 06/02/2026 ₹ 17,632.00
  {'grNo': '505_SMTC', 'billNo': '478', 'truckNo': 'RJ01GD0797', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2100, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 14994, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '06/02/2026'},
  {'grNo': '2088_TTC', 'billNo': '', 'truckNo': 'RJ52GB5336', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 63288, 'weight': 85.500, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 1134, 'truckOwner': 'Deepak Dhabas', 'startDate': '06/02/2026'},
  {'grNo': '504_SMTC', 'billNo': '480', 'truckNo': 'RJ01GE0069', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 159306, 'weight': 87.100, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1504, 'truckOwner': 'Pradeep Yadav', 'startDate': '06/02/2026'},

  # 05/02/2026 ₹ 7,344.00
  {'grNo': '2076_TTC', 'billNo': '', 'truckNo': 'RJ26GA8214', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5720, 'truckOwner': 'Sitaram Meena', 'startDate': '05/02/2026'},
  {'grNo': '2080_TTC', 'billNo': '', 'truckNo': 'RJ52GB5147', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 82.700, 'rate': 1850, 'consignee': 'M/S. PRABHU MENERALS...', 'ownerDue': 1624, 'truckOwner': 'Kailash Dhabas', 'startDate': '05/02/2026'},

  # 04/02/2026 ₹ 7,000.00
  {'grNo': '2062_TTC', 'billNo': '', 'truckNo': 'RJ52GB3485', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Oswal Mineral Amet', 'biltyAmount': 145776, 'weight': 91.110, 'rate': 1600, 'consignee': 'M/S Goodwill Sales Corpo...', 'ownerDue': 5968, 'truckOwner': 'Deepak Dhabas', 'startDate': '04/02/2026'},
  {'grNo': '2066_TTC', 'billNo': '', 'truckNo': 'RJ08GB2298', 'destination': 'Sandila (U.P.)', 'reference': 'Virsun Industries', 'biltyAmount': 103200, 'weight': 43.000, 'rate': 2400, 'consignee': 'New Vanshika Agroindus...', 'ownerDue': 1032, 'truckOwner': 'Pratap Singh', 'startDate': '04/02/2026'},

  # 03/02/2026 ₹ 8,859.00
  {'grNo': '2051_TTC', 'billNo': '', 'truckNo': 'RJ01GD6069', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 141825, 'weight': 91.500, 'rate': 1550, 'consignee': 'Pawan Traders', 'ownerDue': 1419, 'truckOwner': 'Pradeep Yadav', 'startDate': '03/02/2026'},
  {'grNo': '2043_TTC', 'billNo': '', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kalyan Meena', 'startDate': '03/02/2026'},

  # 02/02/2026 ₹ 2,969.00
  {'grNo': '2040_TTC', 'billNo': '', 'truckNo': 'RJ01GD4236', 'destination': 'Khanna (Punjab)', 'reference': 'Ganpati Minerals', 'biltyAmount': 172938, 'weight': 92.480, 'rate': 1870, 'consignee': 'Hirock Industries', 'ownerDue': 2969, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '02/02/2026'},

  # 01/02/2026 ₹ 1,747.00
  {'grNo': '2021_TTC', 'billNo': '', 'truckNo': 'RJ52GA3498', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 98.240, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1747, 'truckOwner': 'Kallu Meena', 'startDate': '01/02/2026'},

  # 31/01/2026 ₹ 5,726.00
  {'grNo': '2010_TTC', 'billNo': '', 'truckNo': 'RJ52GA7296', 'destination': 'Kanpur (U.P.)', 'reference': 'Maruti minrals udaipur', 'biltyAmount': 0, 'weight': 83.600, 'rate': 1900, 'consignee': 'Glow Line Company', 'ownerDue': 5726, 'truckOwner': 'Kailash Dhabas', 'startDate': '31/01/2026'},

  # 30/01/2026 ₹ 11,368.00
  {'grNo': '494_SMTC', 'billNo': '473', 'truckNo': 'RJ52GA7382', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 175950, 'weight': 96.200, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1031, 'truckOwner': 'Deepak Dhabas', 'startDate': '30/01/2026'},
  {'grNo': '1995_TTC', 'billNo': '', 'truckNo': 'RJ52GA9438', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '30/01/2026'},
  {'grNo': '1991_TTC', 'billNo': '', 'truckNo': 'RJ52GB3485', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 141825, 'weight': 91.500, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1419, 'truckOwner': 'Deepak Dhabas', 'startDate': '30/01/2026'},
  {'grNo': '1998_TTC', 'billNo': '', 'truckNo': 'RJ01GD0521', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 147715, 'weight': 95.300, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1478, 'truckOwner': 'Kishan Rawat GD0521', 'startDate': '30/01/2026'},

  # 29/01/2026 ₹ 1,681.00
  {'grNo': '1974_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 91.330, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1681, 'truckOwner': 'Shishram Meena', 'startDate': '29/01/2026'},

  # 28/01/2026 ₹ 24,665.00
  {'grNo': '1960_TTC', 'billNo': '249', 'truckNo': 'RJ52GA7721', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 165612, 'weight': 89.520, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1693, 'truckOwner': 'Kailash Dhabas', 'startDate': '28/01/2026'},
  {'grNo': '1959_TTC', 'billNo': '', 'truckNo': 'RJ52GA4594', 'destination': 'Delhi', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 99000, 'weight': 55.000, 'rate': 1800, 'consignee': 'Bansal Traders', 'ownerDue': 9800, 'truckOwner': 'Kailash Chawari', 'startDate': '28/01/2026'},
  {'grNo': '1966_TTC', 'billNo': '', 'truckNo': 'RJ01GD0711', 'destination': 'Hathras (U.P.)', 'reference': 'Shree Durga Enterprises...', 'biltyAmount': 40000, 'weight': 91.900, 'rate': 1560, 'consignee': 'Shri Durga Enterprises', 'ownerDue': 1434, 'truckOwner': 'Amit Rajpurohit', 'startDate': '28/01/2026'},
  {'grNo': '1963_TTC', 'billNo': '', 'truckNo': 'RJ52GC3337', 'destination': 'Delhi', 'reference': 'Deepak Jain', 'biltyAmount': 137760, 'weight': 86.100, 'rate': 1600, 'consignee': 'JKG Distribution', 'ownerDue': 1378, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '28/01/2026'},
  {'grNo': '1968_TTC', 'billNo': '', 'truckNo': 'RJ33GB8912', 'destination': 'Gaya (Bhiar)', 'reference': 'Himanshu Chemtech Kan...', 'biltyAmount': 84400, 'weight': 42.000, 'rate': 3200, 'consignee': 'Green Cosmetic', 'ownerDue': 9660, 'truckOwner': 'Kanhaya Lal Jat 8912', 'startDate': '28/01/2026'},
  {'grNo': '1964_TTC', 'billNo': '', 'truckNo': 'RJ32GD8541', 'destination': 'Karnal (Haryana)', 'reference': 'Virsun Industries', 'biltyAmount': 70000, 'weight': 1.000, 'rate': 0, 'consignee': 'Virsun Industries Rajsam...', 'ownerDue': 700, 'truckOwner': 'Suresh Khatana', 'startDate': '28/01/2026'},

  # 27/01/2026 ₹ 3,533.00
  {'grNo': '1946_TTC', 'billNo': '', 'truckNo': 'RJ27GE3088', 'destination': 'Kanpur (U.P.)', 'reference': 'Sunil Ostie', 'biltyAmount': 144892, 'weight': 78.320, 'rate': 1850, 'consignee': 'M/S. PRABHU MENERALS...', 'ownerDue': 3533, 'truckOwner': 'Jagdamba Transport', 'startDate': '27/01/2026'},

  # 26/01/2026 ₹ 3,996.00
  {'grNo': '1938_TTC', 'billNo': '', 'truckNo': 'RJ14GK1136', 'destination': 'Kanpur (U.P.)', 'reference': 'Ankush Bansal Jaipur', 'biltyAmount': 0, 'weight': 95.000, 'rate': 1850, 'consignee': 'M/S Jay Chemical Works', 'ownerDue': 1758, 'truckOwner': 'Sitaram Meena', 'startDate': '26/01/2026'},
  {'grNo': '488_SMTC', 'billNo': '469', 'truckNo': 'RJ01GC2159', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 166073, 'weight': 90.800, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1408, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '26/01/2026'},
  {'grNo': '487_SMTC', 'billNo': '464', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 199072, 'weight': 81.465, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 830, 'truckOwner': 'Kalyan Meena', 'startDate': '26/01/2026'},

  # 25/01/2026 ₹ 10,385.00
  {'grNo': '1933_TTC', 'billNo': '', 'truckNo': 'RJ42GA3374', 'destination': 'Dadri (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 143498, 'weight': 91.400, 'rate': 1550, 'consignee': 'Pawan Traders', 'ownerDue': 1416, 'truckOwner': 'Balveer Yadav', 'startDate': '25/01/2026'},
  {'grNo': '1921_TTC', 'billNo': '', 'truckNo': 'RJ52GA9438', 'destination': 'Barabanki (U.P.)', 'reference': 'Virsun Industries', 'biltyAmount': 2100, 'weight': 80.240, 'rate': 2100, 'consignee': 'New Vanshika Agroindus...', 'ownerDue': 8969, 'truckOwner': 'Kailash Dhabas', 'startDate': '25/01/2026'},

  # 24/01/2026 ₹ 825.00
  {'grNo': '1902_TTC', 'billNo': '', 'truckNo': 'RJ01GE0121', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 82500, 'weight': 100.000, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 825, 'truckOwner': 'Dinesh Yadav', 'startDate': '24/01/2026'},

  # 23/01/2026 ₹ 3,480.00
  {'grNo': '1893_TTC', 'billNo': '243', 'truckNo': 'RJ52GA3498', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 177045, 'weight': 94.970, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1885, 'truckOwner': 'Kallu Meena', 'startDate': '23/01/2026'},
  {'grNo': '1888_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 96.590, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1595, 'truckOwner': 'Shishram Meena', 'startDate': '23/01/2026'},

  # 22/01/2026 ₹ 11,021.00
  {'grNo': '477_SMTC', 'billNo': '459', 'truckNo': 'RJ01GC2159', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 165525, 'weight': 90.500, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1403, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '22/01/2026'},
  {'grNo': '473_SMTC', 'billNo': '455', 'truckNo': 'RJ52GB5146', 'destination': 'Sandila (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2300, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7840, 'truckOwner': 'Kailash Dhabas', 'startDate': '22/01/2026'},
  {'grNo': '1865_TTC', 'billNo': '', 'truckNo': 'RJ51GA5442', 'destination': 'Delhi', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 99000, 'weight': 55.000, 'rate': 1800, 'consignee': 'Bansal Traders', 'ownerDue': 350, 'truckOwner': 'Pappu Gurjar Bhilwara', 'startDate': '22/01/2026'},
  {'grNo': '478_SMTC', 'billNo': '458', 'truckNo': 'RJ01GD0711', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 165525, 'weight': 90.500, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1428, 'truckOwner': 'Amit Rajpurohit', 'startDate': '22/01/2026'},

  # 21/01/2026 ₹ 2,575.00
  {'grNo': '1860_TTC', 'billNo': '', 'truckNo': 'RJ01GD0797', 'destination': 'Hathras (U.P.)', 'reference': 'Kailash Agarwal Alwar', 'biltyAmount': 106575, 'weight': 72.500, 'rate': 1470, 'consignee': 'Shakti Enterprises', 'ownerDue': 2575, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '21/01/2026'},

  # 19/01/2026 ₹ 4,186.00
  {'grNo': '1841_TTC', 'billNo': '', 'truckNo': 'RJ01GD6834', 'destination': 'Haridwar (U.K.)', 'reference': 'Deepak Samdhani', 'biltyAmount': 184760, 'weight': 99.870, 'rate': 1800, 'consignee': 'Arosun Paints Coating (I...', 'ownerDue': 3506, 'truckOwner': 'Rakesh Vaishnav', 'startDate': '19/01/2026'},
  {'grNo': '1830_TTC', 'billNo': '', 'truckNo': 'RJ01GD6036', 'destination': 'Dera Bassi (Punjab)', 'reference': 'Ganpati Minerals', 'biltyAmount': 155230, 'weight': 81.700, 'rate': 1900, 'consignee': 'ADHEX CHEMICALS LLP', 'ownerDue': 680, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '19/01/2026'},

  # 18/01/2026 ₹ 7,842.00
  {'grNo': '1810_TTC', 'billNo': '', 'truckNo': 'RJ01GD4865', 'destination': 'Ludhiana (Punjab)', 'reference': 'Ganpati Minerals', 'biltyAmount': 143055, 'weight': 76.500, 'rate': 1870, 'consignee': 'Hirock Industries', 'ownerDue': 3065, 'truckOwner': 'Chand Rawat Singh', 'startDate': '18/01/2026'},
  {'grNo': '467_SMTC', 'billNo': '467', 'truckNo': 'RJ01GC2036', 'destination': 'Karnal (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 123310, 'weight': 55.000, 'rate': 1900, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 2208, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '18/01/2026'},
  {'grNo': '1812_TTC', 'billNo': '', 'truckNo': 'RJ01GD0421', 'destination': 'Faridabad (Haryana)', 'reference': 'Sanjay Parikh', 'biltyAmount': 0, 'weight': 86.500, 'rate': 1430, 'consignee': 'M91- Faridabad', 'ownerDue': 2569, 'truckOwner': 'Dinesh Yadav', 'startDate': '18/01/2026'},

  # 16/01/2026 ₹ 1,909.00
  {'grNo': '1786_TTC', 'billNo': '224', 'truckNo': 'RJ52GB3735', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 177915, 'weight': 96.170, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1907, 'truckOwner': 'Kallu Meena', 'startDate': '16/01/2026'},
  {'grNo': '1793_TTC', 'billNo': '', 'truckNo': 'RJ52GB4027', 'destination': 'Haridwar (U.K.)', 'reference': 'Vishnu Khandelwal', 'biltyAmount': 25000, 'weight': 1.000, 'rate': 2, 'consignee': 'M/S Hari Om Marble and ...', 'ownerDue': 2, 'truckOwner': 'Suresh Palsaniya', 'startDate': '16/01/2026'},

  # 14/01/2026 ₹ 14,112.00
  {'grNo': '458_SMTC', 'billNo': '438', 'truckNo': 'RJ01GD0797', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2100, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 14112, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '14/01/2026'},

  # 12/01/2026 ₹ 1,838.00
  {'grNo': '1741_TTC', 'billNo': '', 'truckNo': 'RJ01GC4211', 'destination': 'Raikot (P.B.)', 'reference': 'Ajay Export Ajay Aggarw...', 'biltyAmount': 0, 'weight': 80.100, 'rate': 1900, 'consignee': 'PIDILITE INDUSTRIES LIM...', 'ownerDue': 1838, 'truckOwner': 'Balveer Yadav', 'startDate': '12/01/2026'},

  # 11/01/2026 ₹ 1,592.00
  {'grNo': '1724_TTC', 'billNo': '', 'truckNo': 'RJ52GB0986', 'destination': 'Moradabad (U.P.)', 'reference': 'Mohd. Afraz', 'biltyAmount': 147320, 'weight': 73.660, 'rate': 2000, 'consignee': 'M/S Arteriors Manufactu...', 'ownerDue': 1592, 'truckOwner': 'Deepak Dhabas', 'startDate': '11/01/2026'},

  # 09/01/2026 ₹ 9,366.00
  {'grNo': '1700_TTC', 'billNo': '227', 'truckNo': 'RJ51GB5442', 'destination': 'Jhajjar (Haryana)', 'reference': 'Balwant Yadav R.B. Dyes ...', 'biltyAmount': 0, 'weight': 80.000, 'rate': 1400, 'consignee': 'BirlaNu Ltd. Jhajjar Putt...', 'ownerDue': 7080, 'truckOwner': 'Pappu Gurjar Bhilwara', 'startDate': '09/01/2026'},
  {'grNo': '1701_TTC', 'billNo': '228', 'truckNo': 'RJ32GC0997', 'destination': 'Jhajjar (Haryana)', 'reference': 'Balwant Yadav R.B. Dyes ...', 'biltyAmount': 0, 'weight': 80.500, 'rate': 1400, 'consignee': 'BirlaNu Ltd. Jhajjar Putt...', 'ownerDue': 693, 'truckOwner': 'Mahendra Gurjar', 'startDate': '09/01/2026'},
  {'grNo': '1680_TTC', 'billNo': '213', 'truckNo': 'RJ52GB3237', 'destination': 'Rohtak (Haryana)', 'reference': 'Gajendra Auddichya', 'biltyAmount': 0, 'weight': 42.800, 'rate': 2000, 'consignee': 'MK Industries', 'ownerDue': 1593, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '09/01/2026'},

  # 07/01/2026 ₹ 6,606.00
  {'grNo': '1663_TTC', 'billNo': '', 'truckNo': 'RJ01GD0501', 'destination': 'Bulandshahr (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 97650, 'weight': 108.500, 'rate': 1650, 'consignee': 'Shivagarh Soap and Che...', 'ownerDue': 6184, 'truckOwner': 'Amit Rajpurohit', 'startDate': '07/01/2026'},
  {'grNo': '447_SMTC', 'billNo': '432', 'truckNo': 'RJ52GA7294', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 195408, 'weight': 81.220, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 422, 'truckOwner': 'Kailash Dhabas', 'startDate': '07/01/2026'},

  # 06/01/2026 ₹ 4,078.00
  {'grNo': '1660_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 103.210, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1872, 'truckOwner': 'Shishram Meena', 'startDate': '06/01/2026'},
  {'grNo': '1664_TTC', 'billNo': '', 'truckNo': 'RJ01GD0711', 'destination': 'Alwar (Raj.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 102840, 'weight': 85.700, 'rate': 1200, 'consignee': 'Jawahar Minerals Indust...', 'ownerDue': 1028, 'truckOwner': 'Amit Rajpurohit', 'startDate': '06/01/2026'},
  {'grNo': '1669_TTC', 'billNo': '', 'truckNo': 'RJ01GD0521', 'destination': 'Meerut (U.P.)', 'reference': 'Ajay Export', 'biltyAmount': 109575, 'weight': 87.660, 'rate': 1250, 'consignee': 'Sanmati Paints & Chemic...', 'ownerDue': 1178, 'truckOwner': 'Kishan Rawat GD0521', 'startDate': '06/01/2026'},

  # 05/01/2026 ₹ 1,462.00
  {'grNo': '1653_TTC', 'billNo': '', 'truckNo': 'RJ52GB3928', 'destination': 'Dadri (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 141159, 'weight': 91.070, 'rate': 1550, 'consignee': 'Pawan Traders', 'ownerDue': 1410, 'truckOwner': 'Bodu Shekhawat', 'startDate': '05/01/2026'},
  {'grNo': '1387_MTC', 'billNo': '', 'truckNo': 'NL01AF9064', 'destination': 'Bundi (Raj.)', 'reference': 'Ganpat Lohar', 'biltyAmount': 67501, 'weight': 96.430, 'rate': 700, 'consignee': 'Malbros impex pvt ltd.', 'ownerDue': 52, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '05/01/2026'},

  # 04/01/2026 ₹ 7,770.00
  {'grNo': '1628_TTC', 'billNo': '', 'truckNo': 'RJ01GD0521', 'destination': 'Bhiwadi (Raj.)', 'reference': 'Kailash Agarwal Alwar', 'biltyAmount': 0, 'weight': 84.000, 'rate': 1400, 'consignee': 'Alcolite India Road Safet...', 'ownerDue': 1200, 'truckOwner': 'Kishan Rawat GD0521', 'startDate': '04/01/2026'},
  {'grNo': '438_SMTC', 'billNo': '428', 'truckNo': 'RJ26GA8214', 'destination': 'Sandila (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2150, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 6272, 'truckOwner': 'Sitaram Meena', 'startDate': '04/01/2026'},
  {'grNo': '441_SMTC', 'billNo': '430', 'truckNo': 'RJ52GB4487', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 195408, 'weight': 82.682, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 131, 'truckOwner': 'Kailash Dhabas', 'startDate': '04/01/2026'},
  {'grNo': '1625_TTC', 'billNo': '', 'truckNo': 'RJ01GC4301', 'destination': 'Noida (U.P.)', 'reference': 'Satyajeet Khatri', 'biltyAmount': 0, 'weight': 50.280, 'rate': 2100, 'consignee': 'Gajindra Polytech', 'ownerDue': 167, 'truckOwner': 'Prahlad Jat', 'startDate': '04/01/2026'},

  # 03/01/2026 ₹ 14,489.00
  {'grNo': '1616_TTC', 'billNo': '', 'truckNo': 'RJ52GA9438', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 5720, 'truckOwner': 'Kailash Dhabas', 'startDate': '03/01/2026'},
  {'grNo': '1615_TTC', 'billNo': '', 'truckNo': 'RJ01GD0713', 'destination': 'Ludhiana (Punjab)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2250, 'consignee': 'Grasim Industries Limite...', 'ownerDue': 945, 'truckOwner': 'Pradeep Yadav', 'startDate': '03/01/2026'},
  {'grNo': '1612_TTC', 'billNo': '', 'truckNo': 'RJ01GD0501', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 71238, 'weight': 91.500, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 1214, 'truckOwner': 'Amit Rajpurohit', 'startDate': '03/01/2026'},
  {'grNo': '1624_TTC', 'billNo': '', 'truckNo': 'RJ52GA7721', 'destination': 'Lucknow (U.P.)', 'reference': 'Himanshu Chemtech Kan...', 'biltyAmount': 162000, 'weight': 81.000, 'rate': 2000, 'consignee': 'CHEM TECH INDIA', 'ownerDue': 5130, 'truckOwner': 'Kailash Dhabas', 'startDate': '03/01/2026'},
  {'grNo': '1630_TTC', 'billNo': '', 'truckNo': 'RJ42GA3374', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 149935, 'weight': 95.500, 'rate': 1550, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1480, 'truckOwner': 'Balveer Yadav', 'startDate': '03/01/2026'},

  # 01/01/2026 ₹ 1,240.00
  {'grNo': '1594_TTC', 'billNo': '', 'truckNo': 'RJ01GD4569', 'destination': 'Blabgrah (Hariyana)', 'reference': 'Kailash Agarwal Alwar', 'biltyAmount': 124050, 'weight': 82.700, 'rate': 1500, 'consignee': 'Lakshay Enterprises', 'ownerDue': 1240, 'truckOwner': 'Pradeep Yadav', 'startDate': '01/01/2026'},

  # 30/12/2025 ₹ 1,606.00
  {'grNo': '1565_TTC', 'billNo': '', 'truckNo': 'RJ01GD0711', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Apex Minerals Mokhamp...', 'biltyAmount': 0, 'weight': 103.640, 'rate': 1550, 'consignee': 'Ashtech Industries', 'ownerDue': 1606, 'truckOwner': 'Amit Rajpurohit', 'startDate': '30/12/2025'},

  # 29/12/2025 ₹ 3,300.00
  {'grNo': '1553_TTC', 'billNo': '', 'truckNo': 'RJ27GE3031', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2500, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1050, 'truckOwner': 'Jagdamba Transport', 'startDate': '29/12/2025'},
  {'grNo': '1380_MTC', 'billNo': '', 'truckNo': 'RJ01GD0521', 'destination': 'Keshwana (Raj.)', 'reference': 'Jitendra Goyal', 'biltyAmount': 92619, 'weight': 75.300, 'rate': 1230, 'consignee': 'Myk Laticrete India P Ltd', 'ownerDue': 619, 'truckOwner': 'Kishan Rawat GD0521', 'startDate': '29/12/2025'},
  {'grNo': '1383_MTC', 'billNo': '', 'truckNo': 'RJ01GD2469', 'destination': 'Khanna (Punjab)', 'reference': 'Ajay Export Ajay Aggarw...', 'biltyAmount': 0, 'weight': 82.460, 'rate': 1870, 'consignee': 'Hirock Industries', 'ownerDue': 1631, 'truckOwner': 'Pradeep Yadav', 'startDate': '29/12/2025'},

  # 28/12/2025 ₹ 3,099.00
  {'grNo': '429_SMTC', 'billNo': '416', 'truckNo': 'RJ14GK1136', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 196433, 'weight': 80.420, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 434, 'truckOwner': 'Sitaram Meena', 'startDate': '28/12/2025'},
  {'grNo': '1373_MTC', 'billNo': '', 'truckNo': 'RJ01GE0069', 'destination': 'Faridabad (Haryana)', 'reference': 'Sanjay Parikh', 'biltyAmount': 0, 'weight': 91.100, 'rate': 1530, 'consignee': 'M91- Faridabad', 'ownerDue': 2665, 'truckOwner': 'Pradeep Yadav', 'startDate': '28/12/2025'},

  # 27/12/2025 ₹ 13,317.00
  {'grNo': '427_SMTC', 'billNo': '415', 'truckNo': 'RJ26GA4713', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 200293, 'weight': 82.000, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 6247, 'truckOwner': 'Kalyan Meena', 'startDate': '27/12/2025'},
  {'grNo': '426_SMTC', 'billNo': '414', 'truckNo': 'RJ01GD0501', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Shubham Chemical Ghazi...', 'biltyAmount': 182900, 'weight': 100.000, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1550, 'truckOwner': 'Amit Rajpurohit', 'startDate': '27/12/2025'},
  {'grNo': '1361_MTC', 'billNo': '', 'truckNo': 'RJ52GA9438', 'destination': 'Kanpur (U.P.)', 'reference': 'Ashok Singhal', 'biltyAmount': 156000, 'weight': 80.000, 'rate': 1950, 'consignee': 'M/S Swastik Chemicals', 'ownerDue': 5520, 'truckOwner': 'Kailash Dhabas', 'startDate': '27/12/2025'},

  # 25/12/2025 ₹ 7,440.00
  {'grNo': '1520_TTC', 'billNo': '', 'truckNo': 'RJ52GA7906', 'destination': 'Sandila (U.P.)', 'reference': 'Tanuj Kothari Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2200, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 7440, 'truckOwner': 'Kailash Dhabas', 'startDate': '25/12/2025'},

  # 24/12/2025 ₹ 1,517.00
  {'grNo': '1513_TTC', 'billNo': '', 'truckNo': 'RJ52GA7721', 'destination': 'Kanpur (U.P.)', 'reference': 'Himanshu Chemtech Kan...', 'biltyAmount': 151700, 'weight': 82.000, 'rate': 1850, 'consignee': 'CHEM TECH INDIA', 'ownerDue': 1517, 'truckOwner': 'Kailash Dhabas', 'startDate': '24/12/2025'},

  # 23/12/2025 ₹ 3,054.00
  {'grNo': '1343_MTC', 'billNo': '', 'truckNo': 'RJ52GB3083', 'destination': 'Haridwar (U.K.)', 'reference': 'Madan sahu', 'biltyAmount': 141120, 'weight': 78.400, 'rate': 1800, 'consignee': 'Arosun Paints Coating (I...', 'ownerDue': 2174, 'truckOwner': 'Hari Palsaniya', 'startDate': '23/12/2025'},
  {'grNo': '417_SMTC', 'billNo': '395', 'truckNo': 'RJ52GA9434', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 0, 'weight': 80.600, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 880, 'truckOwner': 'Kailash Dhabas', 'startDate': '23/12/2025'},

  # 22/12/2025 ₹ 6,184.00
  {'grNo': '412_SMTC', 'billNo': '386', 'truckNo': 'RJ01GD3707', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2100, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1698, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '22/12/2025'},
  {'grNo': '1496_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 92.580, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1711, 'truckOwner': 'Shishram Meena', 'startDate': '22/12/2025'},
  {'grNo': '1338_MTC', 'billNo': '', 'truckNo': 'RJ01GC2159', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 81175, 'weight': 99.000, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 2775, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '22/12/2025'},

  # 19/12/2025 ₹ 1,197.00
  {'grNo': '407_SMTC', 'billNo': '379', 'truckNo': 'RJ01GD3269', 'destination': 'Sikandrabad (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 42.000, 'rate': 2100, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 1197, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '19/12/2025'},

  # 18/12/2025 ₹ 1,496.00
  {'grNo': '1320_MTC', 'billNo': '', 'truckNo': 'RJ01GC2159', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 151505, 'weight': 96.500, 'rate': 1570, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 1496, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '18/12/2025'},

  # 17/12/2025 ₹ 4,621.00
  {'grNo': '1309_MTC', 'billNo': '', 'truckNo': 'RJ01GC4211', 'destination': 'Raikot (P.B.)', 'reference': 'Ajay Export', 'biltyAmount': 0, 'weight': 88.000, 'rate': 1435, 'consignee': 'PIDILITE INDUSTRIES LIM...', 'ownerDue': 953, 'truckOwner': 'Balveer Yadav', 'startDate': '17/12/2025'},
  {'grNo': '1464_TTC', 'billNo': '', 'truckNo': 'RJ52GA9434', 'destination': 'Lucknow (U.P.)', 'reference': 'Bharat Mineral Pascond', 'biltyAmount': 169400, 'weight': 84.700, 'rate': 2000, 'consignee': 'Phenobond India Pvt. Ltd.', 'ownerDue': 3345, 'truckOwner': 'Kailash Dhabas', 'startDate': '17/12/2025'},
  {'grNo': '1311_MTC', 'billNo': '', 'truckNo': 'RJ01GD0797', 'destination': 'Khurali (P.B.)', 'reference': 'Ajay Export Ajay Aggarw...', 'biltyAmount': 129500, 'weight': 70.000, 'rate': 1850, 'consignee': 'SHIV RAJ COATING', 'ownerDue': 323, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '17/12/2025'},

  # 16/12/2025 ₹ 15,534.00
  {'grNo': '1304_MTC', 'billNo': '157', 'truckNo': 'RJ52GA6549', 'destination': 'Lucknow (U.P.)', 'reference': 'Gajendra Auddichya', 'biltyAmount': 0, 'weight': 91.030, 'rate': 2050, 'consignee': 'Descon Infrastructures ...', 'ownerDue': 9009, 'truckOwner': 'Sitaram Meena', 'startDate': '16/12/2025'},
  {'grNo': '1459_TTC', 'billNo': '', 'truckNo': 'RJ14GK1136', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 88.620, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1030, 'truckOwner': 'Sitaram Meena', 'startDate': '16/12/2025'},
  {'grNo': '1307_MTC', 'billNo': '', 'truckNo': 'RJ27GD4839', 'destination': 'Noida (U.P.)', 'reference': 'Satyajeet Khatri', 'biltyAmount': 95392, 'weight': 43.360, 'rate': 2200, 'consignee': 'Gajindra Polytech', 'ownerDue': 4417, 'truckOwner': 'Jagdamba Transport', 'startDate': '16/12/2025'},
  {'grNo': '1308_MTC', 'billNo': '', 'truckNo': 'RJ01GD0669', 'destination': 'Noida (U.P.)', 'reference': 'Neeraj Mehta Udaipur', 'biltyAmount': 88830, 'weight': 42.400, 'rate': 2100, 'consignee': 'Shree Balaji Traders', 'ownerDue': 1078, 'truckOwner': 'Pradeep Yadav', 'startDate': '16/12/2025'},

  # 15/12/2025 ₹ 1,012.00
  {'grNo': '393_SMTC', 'billNo': '378', 'truckNo': 'RJ52GA7721', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 0, 'weight': 82.510, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 1012, 'truckOwner': 'Kailash Dhabas', 'startDate': '15/12/2025'},

  # 14/12/2025 ₹ 11,434.00
  {'grNo': '1295_MTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Om Saini', 'biltyAmount': 142120, 'weight': 91.690, 'rate': 1550, 'consignee': 'Sharda Paint Industries', 'ownerDue': 98, 'truckOwner': 'Pradhan Choudhary', 'startDate': '14/12/2025'},
  {'grNo': '1296_MTC', 'billNo': '', 'truckNo': 'RJ52GB4746', 'destination': 'Delhi', 'reference': 'Shree Sharan Associates', 'biltyAmount': 132496, 'weight': 82.810, 'rate': 1600, 'consignee': 'Jai Ambey Marble', 'ownerDue': 8296, 'truckOwner': 'Surendra Dhabas', 'startDate': '14/12/2025'},
  {'grNo': '388_SMTC', 'billNo': '372', 'truckNo': 'RJ52GB3928', 'destination': 'Hapur (U.P.)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 80.000, 'rate': 1600, 'consignee': 'Shri Ram Traders', 'ownerDue': 3040, 'truckOwner': 'Bodu Shekhawat', 'startDate': '14/12/2025'},

  # 13/12/2025 ₹ 10,722.00
  {'grNo': '1284_MTC', 'billNo': '', 'truckNo': 'RJ01GE0121', 'destination': 'Alwar (Raj.)', 'reference': 'Vishal Parikh', 'biltyAmount': 81175, 'weight': 99.000, 'rate': 1325, 'consignee': 'Stark Paints Private Limi...', 'ownerDue': 5722, 'truckOwner': 'Dinesh Yadav', 'startDate': '13/12/2025'},
  {'grNo': '1282_MTC', 'billNo': '', 'truckNo': 'RJ52GA3137', 'destination': 'Gurugram (Haryana)', 'reference': 'Vimal porwal Mohi', 'biltyAmount': 18000, 'weight': 35.400, 'rate': 1850, 'consignee': 'Jineshwar Stone', 'ownerDue': 5000, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '13/12/2025'},

  # 12/12/2025 ₹ 10,888.00
  {'grNo': '1278_MTC', 'billNo': '', 'truckNo': 'RJ14GK1136', 'destination': 'Kanpur (U.P.)', 'reference': 'Himanshu Chemtech Kan...', 'biltyAmount': 170000, 'weight': 85.000, 'rate': 2000, 'consignee': 'CHEM TECH INDIA', 'ownerDue': 5408, 'truckOwner': 'Sitaram Meena', 'startDate': '12/12/2025'},
  {'grNo': '384_SMTC', 'billNo': '366', 'truckNo': 'RJ01GD6708', 'destination': 'Karnal (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 55.000, 'rate': 1900, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 820, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '12/12/2025'},
  {'grNo': '1277_MTC', 'billNo': '', 'truckNo': 'RJ51GB5442', 'destination': 'Bhiwadi (Raj.)', 'reference': 'Mukesh Saini Super Micr...', 'biltyAmount': 0, 'weight': 78.650, 'rate': 1400, 'consignee': 'Ncl Builtek Limited', 'ownerDue': 960, 'truckOwner': 'Pappu Gurjar Bhilwara', 'startDate': '12/12/2025'},
  {'grNo': '1280_MTC', 'billNo': '', 'truckNo': 'RJ52GA7294', 'destination': 'DAUSA (Raj.)', 'reference': 'Himanshu Chemtech Kan...', 'biltyAmount': 168000, 'weight': 84.000, 'rate': 2000, 'consignee': 'CHEM TECH INDIA', 'ownerDue': 3700, 'truckOwner': 'Kailash Dhabas', 'startDate': '12/12/2025'},

  # 10/12/2025 ₹ 20,002.00
  {'grNo': '375_SMTC', 'billNo': '368', 'truckNo': 'RJ52GA7720', 'destination': 'Sandila (U.P.)', 'reference': 'Rajesh Rao Udaipur', 'biltyAmount': 0, 'weight': 80.000, 'rate': 2300, 'consignee': 'Berger Paints India Ltd.', 'ownerDue': 12607, 'truckOwner': 'Kailash Dhabas', 'startDate': '10/12/2025'},
  {'grNo': '1414_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 0, 'weight': 97.580, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1805, 'truckOwner': 'Shishram Meena', 'startDate': '10/12/2025'},
  {'grNo': '1263_MTC', 'billNo': '', 'truckNo': 'RJ52GA7384', 'destination': 'Bhiwadi (Raj.)', 'reference': 'Pilot Minerals', 'biltyAmount': 127320, 'weight': 84.880, 'rate': 1500, 'consignee': 'Home Pride Adhesive Pvt...', 'ownerDue': 5590, 'truckOwner': 'Surya Pratap Singh', 'startDate': '10/12/2025'},

  # 09/12/2025 ₹ 4,807.00
  {'grNo': '1256_MTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Dadri (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 134850, 'weight': 87.000, 'rate': 1550, 'consignee': 'Shivam Marbles Dadri', 'ownerDue': 1349, 'truckOwner': 'Pradhan Choudhary', 'startDate': '09/12/2025'},
  {'grNo': '1261_MTC', 'billNo': '', 'truckNo': 'RJ01GE0121', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 152918, 'weight': 97.400, 'rate': 1570, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 3458, 'truckOwner': 'Dinesh Yadav', 'startDate': '09/12/2025'},

  # 08/12/2025 ₹ 15,319.00
  {'grNo': '1236_MTC', 'billNo': '', 'truckNo': 'RJ01GC6036', 'destination': 'Ludhiana (Punjab)', 'reference': 'Ganpati Minerals', 'biltyAmount': 158015, 'weight': 84.500, 'rate': 1870, 'consignee': 'Hirock Industries', 'ownerDue': 589, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '08/12/2025'},
  {'grNo': '1242_MTC', 'billNo': '', 'truckNo': 'RJ14GR5822', 'destination': 'Naimisharanya Sitapur (...', 'reference': 'Manish Chhabra Luckno...', 'biltyAmount': 37900, 'weight': 10.080, 'rate': 0, 'consignee': 'BHOLE BABA SANT AASS...', 'ownerDue': 5900, 'truckOwner': 'Warish Khan', 'startDate': '08/12/2025'},
  {'grNo': '373_SMTC', 'billNo': '409', 'truckNo': 'RJ01GC2159', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 180304, 'weight': 95.500, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1480, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '08/12/2025'},
  {'grNo': '1243_MTC', 'billNo': '', 'truckNo': 'RJ52GB2536', 'destination': 'Faridabad (Haryana)', 'reference': 'Shree Sharan Associates', 'biltyAmount': 120480, 'weight': 75.130, 'rate': 1600, 'consignee': 'Jai Ambey Marble', 'ownerDue': 7350, 'truckOwner': 'Surendra Dhabas', 'startDate': '08/12/2025'},

  # 07/12/2025 ₹ 4,965.00
  {'grNo': '370_SMTC', 'billNo': '355', 'truckNo': 'RJ08GB2298', 'destination': 'Sandila (U.P.)', 'reference': 'Camila Minerals', 'biltyAmount': 147753, 'weight': 60.490, 'rate': 2070, 'consignee': 'Vinayak Logistics India P...', 'ownerDue': 2545, 'truckOwner': 'Pratap Singh', 'startDate': '07/12/2025'},
  {'grNo': '371_SMTC', 'billNo': '408', 'truckNo': 'RJ01GD0421', 'destination': 'Ghaziabad (U.P.)', 'reference': 'MRL Infra Jetpura', 'biltyAmount': 165011, 'weight': 87.400, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1355, 'truckOwner': 'Dinesh Yadav', 'startDate': '07/12/2025'},
  {'grNo': '1234_MTC', 'billNo': '', 'truckNo': 'RJ51GA5442', 'destination': 'Bhiwadi (Raj.)', 'reference': 'Mukesh Saini Super Micr...', 'biltyAmount': 0, 'weight': 86.100, 'rate': 1400, 'consignee': 'Home Pride Adhesive Pvt...', 'ownerDue': 1065, 'truckOwner': 'Pappu Gurjar Bhilwara', 'startDate': '07/12/2025'},

  # 06/12/2025 ₹ 4,000.00
  {'grNo': '1227_MTC', 'billNo': '', 'truckNo': 'RJ52GA7294', 'destination': 'Lucknow (U.P.)', 'reference': 'Aahish Aggarwal Alwar', 'biltyAmount': 0, 'weight': 80.030, 'rate': 2050, 'consignee': 'M/S EXCEL ENTERPRISES', 'ownerDue': 4000, 'truckOwner': 'Kailash Dhabas', 'startDate': '06/12/2025'},

  # 05/12/2025 ₹ 1,558.00
  {'grNo': '1226_MTC', 'billNo': '', 'truckNo': 'RJ26GA8214', 'destination': 'Kanpur (U.P.)', 'reference': 'Maruti Minchem Udaipur', 'biltyAmount': 0, 'weight': 82.000, 'rate': 1900, 'consignee': 'Glow Line Company', 'ownerDue': 1558, 'truckOwner': 'Sitaram Meena', 'startDate': '05/12/2025'},

  # 04/12/2025 ₹ 5,599.00
  {'grNo': '359_SMTC', 'billNo': '337', 'truckNo': 'RJ01GD4269', 'destination': 'HASSANGARH Haryana', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 50.000, 'rate': 1700, 'consignee': 'HARIDAS TRADERS', 'ownerDue': 3260, 'truckOwner': 'Pradeep Yadav', 'startDate': '04/12/2025'},
  {'grNo': '1219_MTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Alwar (Raj.)', 'reference': 'Jawahar Minerals Alwar', 'biltyAmount': 98450, 'weight': 89.500, 'rate': 1100, 'consignee': 'Jawahar Minerals Indust...', 'ownerDue': 985, 'truckOwner': 'Pradhan Choudhary', 'startDate': '04/12/2025'},
  {'grNo': '1221_MTC', 'billNo': '', 'truckNo': 'RJ01GD6195', 'destination': 'Dadri (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 126108, 'weight': 81.360, 'rate': 1550, 'consignee': 'Shivam Marbles Dadri', 'ownerDue': 1354, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '04/12/2025'},

  # 03/12/2025 ₹ 9,885.00
  {'grNo': '1212_MTC', 'billNo': '', 'truckNo': 'RJ01GD6834', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Oswal Mineral Amet', 'biltyAmount': 137120, 'weight': 85.700, 'rate': 1600, 'consignee': 'Zchem Polymers India Pv...', 'ownerDue': 9885, 'truckOwner': 'Rakesh Vaishnav', 'startDate': '03/12/2025'},

  # 02/12/2025 ₹ 1,875.00
  {'grNo': '1373_TTC', 'billNo': '130', 'truckNo': 'RJ52GA3498', 'destination': 'Kanpur (U.P.)', 'reference': 'Rishi Kapur Kapsons India', 'biltyAmount': 187405, 'weight': 101.300, 'rate': 1850, 'consignee': 'Kapsons India', 'ownerDue': 1875, 'truckOwner': 'Kallu Meena', 'startDate': '02/12/2025'},

  # 01/12/2025 ₹ 3,920.00
  {'grNo': '1367_TTC', 'billNo': '', 'truckNo': 'RJ52GB4486', 'destination': 'Lucknow (U.P.)', 'reference': 'Krishna Micron Jetpura', 'biltyAmount': 156800, 'weight': 78.400, 'rate': 2000, 'consignee': 'Phenobond India Pvt. Ltd.', 'ownerDue': 3920, 'truckOwner': 'Kailash Dhabas', 'startDate': '01/12/2025'},

  # 30/11/2025 ₹ 12,969.00
  {'grNo': '1194_MTC', 'billNo': '', 'truckNo': 'RJ01GC2159', 'destination': 'Dadri (U.P.)', 'reference': 'Pavan Bansal Dadri', 'biltyAmount': 140787, 'weight': 90.830, 'rate': 1550, 'consignee': 'Shivam Marbles Dadri', 'ownerDue': 1453, 'truckOwner': 'Mahendra Rawat Shrinag...', 'startDate': '30/11/2025'},
  {'grNo': '346_SMTC', 'billNo': '349', 'truckNo': 'RJ42GA3374', 'destination': 'Ghaziabad (U.P.)', 'reference': 'Ganpati Minerals', 'biltyAmount': 176528, 'weight': 93.500, 'rate': 1550, 'consignee': 'Shubham Chemicals', 'ownerDue': 1450, 'truckOwner': 'Balveer Yadav', 'startDate': '30/11/2025'},
  {'grNo': '345_SMTC', 'billNo': '327', 'truckNo': 'RJ52GA4594', 'destination': 'Karnal (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 10.000, 'rate': 1950, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 110, 'truckOwner': 'Kailash Chawari', 'startDate': '30/11/2025'},
  {'grNo': '349_SMTC', 'billNo': '326', 'truckNo': 'RJ52GA4594', 'destination': 'Pundari (H.R.)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 14.000, 'rate': 1950, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 1754, 'truckOwner': 'Kailash Chawari', 'startDate': '30/11/2025'},
  {'grNo': '348_SMTC', 'billNo': '325', 'truckNo': 'RJ52GA4594', 'destination': 'Pundari (H.R.)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 10.000, 'rate': 1950, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 580, 'truckOwner': 'Kailash Chawari', 'startDate': '30/11/2025'},
  {'grNo': '350_SMTC', 'billNo': '324', 'truckNo': 'RJ52GA4594', 'destination': 'Pundari (H.R.)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 8.000, 'rate': 1950, 'consignee': 'TIRUPATI CEMENT AGENC...', 'ownerDue': 1288, 'truckOwner': 'Kailash Chawari', 'startDate': '30/11/2025'},
  {'grNo': '351_SMTC', 'billNo': '321', 'truckNo': 'RJ52GB3237', 'destination': 'Panipat (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 55.000, 'rate': 1750, 'consignee': 'PRINCE SALES CORPORA...', 'ownerDue': 5000, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '30/11/2025'},
  {'grNo': '1193_MTC', 'billNo': '', 'truckNo': 'RJ52GB6172', 'destination': 'Bhiwadi (Raj.)', 'reference': 'Pilot Minerals', 'biltyAmount': 122955, 'weight': 81.970, 'rate': 1500, 'consignee': 'Home Pride Adhesive Pvt...', 'ownerDue': 1334, 'truckOwner': 'Vinod Dhabas', 'startDate': '30/11/2025'},

  # 29/11/2025 ₹ 8,548.00
  {'grNo': '1187_MTC', 'billNo': '', 'truckNo': 'RJ01GC0951', 'destination': 'Aligarh (U.P.)', 'reference': 'Kaku Minerals Alwar', 'biltyAmount': 0, 'weight': 89.000, 'rate': 1600, 'consignee': 'CHIRAG WATER PROOFIN...', 'ownerDue': 424, 'truckOwner': 'Pradhan Choudhary', 'startDate': '29/11/2025'},
  {'grNo': '340_SMTC', 'billNo': '317', 'truckNo': 'RJ52GB5336', 'destination': 'Jhajjar (Haryana)', 'reference': 'Balwant Yadav R.B. Dyes ...', 'biltyAmount': 0, 'weight': 81.500, 'rate': 600, 'consignee': 'BirlaNu Ltd. Jhajjar Putt...', 'ownerDue': 8124, 'truckOwner': 'Deepak Dhabas', 'startDate': '29/11/2025'},

  # 28/11/2025 ₹ 6,330.00
  {'grNo': '337_SMTC', 'billNo': '318', 'truckNo': 'RJ01GD5387', 'destination': 'Tonana (H.R.)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 35.000, 'rate': 1900, 'consignee': 'PARMOD KUMAR ASHWINI...', 'ownerDue': 670, 'truckOwner': 'Prahlad Jat', 'startDate': '28/11/2025'},
  {'grNo': '336_SMTC', 'billNo': '319', 'truckNo': 'RJ01GD5387', 'destination': 'Uklana Mandi (Haryana)', 'reference': 'Sudhir Mishra Sarkani ka...', 'biltyAmount': 0, 'weight': 20.000, 'rate': 1900, 'consignee': 'PARVESH MARBLES', 'ownerDue': 1741, 'truckOwner': 'Prahlad Jat', 'startDate': '28/11/2025'},
  {'grNo': '1347_TTC', 'billNo': '', 'truckNo': 'RJ52GB0964', 'destination': 'Kanpur (U.P.)', 'reference': 'Ankush Bansal Jaipur', 'biltyAmount': 0, 'weight': 91.600, 'rate': 1850, 'consignee': 'M/S Jay Chemical Works', 'ownerDue': 1695, 'truckOwner': 'Shishram Meena', 'startDate': '28/11/2025'},
  {'grNo': '1185_MTC', 'billNo': '', 'truckNo': 'RJ01GD3707', 'destination': 'Noida (U.P.)', 'reference': 'Satyajeet Khatri', 'biltyAmount': 0, 'weight': 42.070, 'rate': 2100, 'consignee': 'Gajindra Polytech', 'ownerDue': 2224, 'truckOwner': 'Lalaram Choudhary Shri...', 'startDate': '28/11/2025'},

  # 27/11/2025 ₹ 1,370.00
  {'grNo': '1168_MTC', 'billNo': '', 'truckNo': 'RJ32GC7697', 'destination': 'Delhi', 'reference': 'Kailash Agarwal Alwar', 'biltyAmount': 0, 'weight': 90.800, 'rate': 1510, 'consignee': 'MADAN CHEMICALS', 'ownerDue': 1370, 'truckOwner': 'Billo Kasana', 'startDate': '27/11/2025'},

  # 03/10/2025 ₹ 10,000.00
  {'grNo': '831_MTC', 'billNo': '', 'truckNo': 'RJ52GB3237', 'destination': 'Panchkula (Haryana)', 'reference': 'Mangilal Udaipur Gurgao...', 'biltyAmount': 30000, 'weight': 69.520, 'rate': 2350, 'consignee': 'HIMALAY MARBLES & GR...', 'ownerDue': 10000, 'truckOwner': 'Radhyeshyam Gurjar', 'startDate': '03/10/2025'},

  # 14/07/2025 ₹ 9,200.00
  {'grNo': '586_TTC', 'billNo': '', 'truckNo': 'RJ32GC2937', 'destination': 'Pantran Fatada (Punjab)', 'reference': 'Anil Maheswari Chittorga...', 'biltyAmount': 20000, 'weight': 54.300, 'rate': 1900, 'consignee': 'BALAJI MARBLE', 'ownerDue': 9200, 'truckOwner': 'Hansraj Gurjar Paota', 'startDate': '14/07/2025'},

  # 29/05/2025 ₹ 9,000.00
  {'grNo': '285_TTC', 'billNo': '', 'truckNo': 'RJ01GC3456', 'destination': 'Noida (U.P.)', 'reference': 'Anmol Marmo Morchana', 'biltyAmount': 99000, 'weight': 49.980, 'rate': 0, 'consignee': 'Kuldeep Kumar Contract...', 'ownerDue': 9000, 'truckOwner': 'Kanhaiya Lal Vaishnav', 'startDate': '29/05/2025'}
]

total_owner_due = sum(t['ownerDue'] for t in trips_2025)
print(f'Total trips in 2025-2026: {len(trips_2025)}')
print(f'Sum of 2025-2026 trips: {total_owner_due}')
