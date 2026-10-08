/**
 * Authentic Cash Ledger Daily Register Dataset
 * Extracted from Google AppSheet Cash Ledger (07/10/2026 to 30/09/2024)
 * Total Daily Entries: 736
 */

const SAMPLE_CASH_LEDGER_DATA = [
  {
    "date": "08/10/2026",
    "amountReceived": 169300.0,
    "expense": 9445.0,
    "debt": 251900.0,
    "availableCash": 2033995.0,
    "previousDayAvailableCash": 2126040.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "08 Oct 2026"
  },
  {
    "date": "07/10/2026",
    "amountReceived": 84100.0,
    "expense": 100310.0,
    "debt": 30800.0,
    "availableCash": 2126040.0,
    "previousDayAvailableCash": 2173050.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "07 Oct 2026"
  },
  {
    "date": "06/10/2026",
    "amountReceived": 77000.0,
    "expense": 106342.0,
    "debt": 69600.0,
    "availableCash": 2173050.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "06 Oct 2026"
  },
  {
    "date": "05/10/2026",
    "amountReceived": 95100.0,
    "expense": 1985.0,
    "debt": 35900.0,
    "availableCash": 2271992.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "05 Oct 2026"
  },
  {
    "date": "04/10/2026",
    "amountReceived": -7400.0,
    "expense": 165040.0,
    "debt": 16900.0,
    "availableCash": 2214777.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "04 Oct 2026"
  },
  {
    "date": "03/10/2026",
    "amountReceived": 103800.0,
    "expense": 1600.0,
    "debt": 69300.0,
    "availableCash": 2404117.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "03 Oct 2026"
  },
  {
    "date": "02/10/2026",
    "amountReceived": 272500.0,
    "expense": 101560.0,
    "debt": 59700.0,
    "availableCash": 2371217.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "02 Oct 2026"
  },
  {
    "date": "01/10/2026",
    "amountReceived": 100300.0,
    "expense": 1700.0,
    "debt": 21000.0,
    "availableCash": 2259977.0,
    "fy": "2026-2027",
    "monthKey": "2026-10",
    "displayDate": "01 Oct 2026"
  },
  {
    "date": "30/09/2026",
    "amountReceived": 76200.0,
    "expense": 2460.0,
    "debt": 36700.0,
    "availableCash": 2182377.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "30 Sep 2026"
  },
  {
    "date": "29/09/2026",
    "amountReceived": 72100.0,
    "expense": 93138.0,
    "debt": 20400.0,
    "availableCash": 2145337.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "29 Sep 2026"
  },
  {
    "date": "28/09/2026",
    "amountReceived": 116300.0,
    "expense": 750.0,
    "debt": 56500.0,
    "availableCash": 2186775.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "28 Sep 2026"
  },
  {
    "date": "27/09/2026",
    "amountReceived": 58300.0,
    "expense": 1575.0,
    "debt": 212200.0,
    "availableCash": 2127725.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "27 Sep 2026"
  },
  {
    "date": "26/09/2026",
    "amountReceived": 120200.0,
    "expense": 610.0,
    "debt": 19300.0,
    "availableCash": 2283200.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "26 Sep 2026"
  },
  {
    "date": "25/09/2026",
    "amountReceived": 60500.0,
    "expense": 120.0,
    "debt": 16000.0,
    "availableCash": 2182910.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "25 Sep 2026"
  },
  {
    "date": "24/09/2026",
    "amountReceived": 48100.0,
    "expense": 100600.0,
    "debt": 33800.0,
    "availableCash": 2138530.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "24 Sep 2026"
  },
  {
    "date": "23/09/2026",
    "amountReceived": 47300.0,
    "expense": 16930.0,
    "debt": 9800.0,
    "availableCash": 2224830.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "23 Sep 2026"
  },
  {
    "date": "22/09/2026",
    "amountReceived": 125500.0,
    "expense": 1410.0,
    "debt": 56800.0,
    "availableCash": 2204260.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "22 Sep 2026"
  },
  {
    "date": "21/09/2026",
    "amountReceived": 193500.0,
    "expense": 200920.0,
    "debt": 81700.0,
    "availableCash": 2136970.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "21 Sep 2026"
  },
  {
    "date": "20/09/2026",
    "amountReceived": 190700.0,
    "expense": 8175.0,
    "debt": 29000.0,
    "availableCash": 2226090.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "20 Sep 2026"
  },
  {
    "date": "19/09/2026",
    "amountReceived": 428300.0,
    "expense": 151705.0,
    "debt": 43600.0,
    "availableCash": 2072565.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "19 Sep 2026"
  },
  {
    "date": "18/09/2026",
    "amountReceived": 274100.0,
    "expense": 55150.0,
    "debt": 14600.0,
    "availableCash": 1839570.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "18 Sep 2026"
  },
  {
    "date": "17/09/2026",
    "amountReceived": 53200.0,
    "expense": 1760.0,
    "debt": 149000.0,
    "availableCash": 1635220.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "17 Sep 2026"
  },
  {
    "date": "16/09/2026",
    "amountReceived": 54855.0,
    "expense": 60000.0,
    "debt": 1932780.0,
    "availableCash": 1732780.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "16 Sep 2026"
  },
  {
    "date": "15/09/2026",
    "amountReceived": 103000.0,
    "expense": 625.0,
    "debt": 69500.0,
    "availableCash": 1978035.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "15 Sep 2026"
  },
  {
    "date": "14/09/2026",
    "amountReceived": 122400.0,
    "expense": 268545.0,
    "debt": 900.0,
    "availableCash": 1945160.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "14 Sep 2026"
  },
  {
    "date": "13/09/2026",
    "amountReceived": 125800.0,
    "expense": 267912.0,
    "debt": 126000.0,
    "availableCash": 2092205.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "13 Sep 2026"
  },
  {
    "date": "12/09/2026",
    "amountReceived": 181800.0,
    "expense": 60884.0,
    "debt": 27500.0,
    "availableCash": 2161117.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "12 Sep 2026"
  },
  {
    "date": "11/09/2026",
    "amountReceived": 65800.0,
    "expense": 90.0,
    "debt": 8400.0,
    "availableCash": 2067701.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "11 Sep 2026"
  },
  {
    "date": "10/09/2026",
    "amountReceived": 189000.0,
    "expense": 5675.0,
    "debt": 173700.0,
    "availableCash": 2010391.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "10 Sep 2026"
  },
  {
    "date": "09/09/2026",
    "amountReceived": 184600.0,
    "expense": 252720.0,
    "debt": 217200.0,
    "availableCash": 23584756.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "09 Sep 2026"
  },
  {
    "date": "08/09/2026",
    "amountReceived": 120700.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 23870076.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "08 Sep 2026"
  },
  {
    "date": "07/09/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 23749376.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "07 Sep 2026"
  },
  {
    "date": "06/09/2026",
    "amountReceived": 400.0,
    "expense": 657275.0,
    "debt": 17700.0,
    "availableCash": 23749376.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "06 Sep 2026"
  },
  {
    "date": "05/09/2026",
    "amountReceived": 112600.0,
    "expense": 95.0,
    "debt": 222500.0,
    "availableCash": 24423951.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "05 Sep 2026"
  },
  {
    "date": "04/09/2026",
    "amountReceived": 23000.0,
    "expense": 190150.0,
    "debt": 2100.0,
    "availableCash": 24533946.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "04 Sep 2026"
  },
  {
    "date": "03/09/2026",
    "amountReceived": 231300.0,
    "expense": 22560.0,
    "debt": 359900.0,
    "availableCash": 24703196.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "03 Sep 2026"
  },
  {
    "date": "02/09/2026",
    "amountReceived": 52400.0,
    "expense": 0.0,
    "debt": 21000.0,
    "availableCash": 24854356.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "02 Sep 2026"
  },
  {
    "date": "01/09/2026",
    "amountReceived": 7200.0,
    "expense": 810.0,
    "debt": 64200.0,
    "availableCash": 24822956.0,
    "fy": "2026-2027",
    "monthKey": "2026-09",
    "displayDate": "01 Sep 2026"
  },
  {
    "date": "31/08/2026",
    "amountReceived": 79100.0,
    "expense": 650.0,
    "debt": 58400.0,
    "availableCash": 24880766.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "31 Aug 2026"
  },
  {
    "date": "30/08/2026",
    "amountReceived": 75500.0,
    "expense": 90.0,
    "debt": 27000.0,
    "availableCash": 24860716.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "30 Aug 2026"
  },
  {
    "date": "29/08/2026",
    "amountReceived": 25000.0,
    "expense": 52030.0,
    "debt": 15000.0,
    "availableCash": 24812306.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "29 Aug 2026"
  },
  {
    "date": "28/08/2026",
    "amountReceived": 7500.0,
    "expense": 0.0,
    "debt": 500.0,
    "availableCash": 24854336.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "28 Aug 2026"
  },
  {
    "date": "27/08/2026",
    "amountReceived": 177600.0,
    "expense": 225620.0,
    "debt": 0.0,
    "availableCash": 24847336.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "27 Aug 2026"
  },
  {
    "date": "26/08/2026",
    "amountReceived": 0.0,
    "expense": 154655.0,
    "debt": 0.0,
    "availableCash": 24895356.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "26 Aug 2026"
  },
  {
    "date": "25/08/2026",
    "amountReceived": 183200.0,
    "expense": 634665.0,
    "debt": -2261330.0,
    "availableCash": 25050011.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "25 Aug 2026"
  },
  {
    "date": "24/08/2026",
    "amountReceived": 49900.0,
    "expense": 0.0,
    "debt": 51500.0,
    "availableCash": 23240146.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "24 Aug 2026"
  },
  {
    "date": "23/08/2026",
    "amountReceived": 0.0,
    "expense": 1440.0,
    "debt": 15800.0,
    "availableCash": 23241746.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "23 Aug 2026"
  },
  {
    "date": "22/08/2026",
    "amountReceived": 184400.0,
    "expense": 855.0,
    "debt": 20400.0,
    "availableCash": 23258986.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "22 Aug 2026"
  },
  {
    "date": "21/08/2026",
    "amountReceived": 604800.0,
    "expense": 52555.0,
    "debt": 47700.0,
    "availableCash": 23095841.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "21 Aug 2026"
  },
  {
    "date": "20/08/2026",
    "amountReceived": 103200.0,
    "expense": 3806.0,
    "debt": 84200.0,
    "availableCash": 22591296.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "20 Aug 2026"
  },
  {
    "date": "19/08/2026",
    "amountReceived": 60000.0,
    "expense": 21070.0,
    "debt": 47700.0,
    "availableCash": 22576102.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "19 Aug 2026"
  },
  {
    "date": "18/08/2026",
    "amountReceived": 513500.0,
    "expense": 50.0,
    "debt": -19500.0,
    "availableCash": 22584872.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "18 Aug 2026"
  },
  {
    "date": "17/08/2026",
    "amountReceived": 45300.0,
    "expense": 21450940.0,
    "debt": 93564.0,
    "availableCash": 22051922.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "17 Aug 2026"
  },
  {
    "date": "16/08/2026",
    "amountReceived": 130000.0,
    "expense": 267360.0,
    "debt": 61400.0,
    "availableCash": 4503378.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "16 Aug 2026"
  },
  {
    "date": "15/08/2026",
    "amountReceived": 65400.0,
    "expense": 0.0,
    "debt": 85800.0,
    "availableCash": 4702138.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "15 Aug 2026"
  },
  {
    "date": "14/08/2026",
    "amountReceived": 80600.0,
    "expense": 15330.0,
    "debt": 35000.0,
    "availableCash": 4722538.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "14 Aug 2026"
  },
  {
    "date": "13/08/2026",
    "amountReceived": 62200.0,
    "expense": 0.0,
    "debt": 39700.0,
    "availableCash": 4692268.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "13 Aug 2026"
  },
  {
    "date": "12/08/2026",
    "amountReceived": 64800.0,
    "expense": 22720.0,
    "debt": 13500.0,
    "availableCash": 4669768.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "12 Aug 2026"
  },
  {
    "date": "11/08/2026",
    "amountReceived": 266700.0,
    "expense": 2003.0,
    "debt": 162600.0,
    "availableCash": 4641188.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "11 Aug 2026"
  },
  {
    "date": "10/08/2026",
    "amountReceived": 39000.0,
    "expense": 0.0,
    "debt": -296500.0,
    "availableCash": 4539091.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "10 Aug 2026"
  },
  {
    "date": "09/08/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 4203591.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "09 Aug 2026"
  },
  {
    "date": "08/08/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 4203591.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "08 Aug 2026"
  },
  {
    "date": "07/08/2026",
    "amountReceived": 248800.0,
    "expense": 27110.0,
    "debt": 28400.0,
    "availableCash": 4203591.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "07 Aug 2026"
  },
  {
    "date": "06/08/2026",
    "amountReceived": 109200.0,
    "expense": 373390.0,
    "debt": 5500.0,
    "availableCash": 4010301.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "06 Aug 2026"
  },
  {
    "date": "05/08/2026",
    "amountReceived": 110250.0,
    "expense": 347955.0,
    "debt": 15000.0,
    "availableCash": 4279991.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "05 Aug 2026"
  },
  {
    "date": "04/08/2026",
    "amountReceived": 207100.0,
    "expense": 1848.0,
    "debt": 26800.0,
    "availableCash": 4532696.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "04 Aug 2026"
  },
  {
    "date": "03/08/2026",
    "amountReceived": 7020.0,
    "expense": 1910.0,
    "debt": 29700.0,
    "availableCash": 4354244.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "03 Aug 2026"
  },
  {
    "date": "02/08/2026",
    "amountReceived": 35200.0,
    "expense": 12095.0,
    "debt": 89850.0,
    "availableCash": 4378834.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "02 Aug 2026"
  },
  {
    "date": "01/08/2026",
    "amountReceived": 17600.0,
    "expense": 255670.0,
    "debt": -5100.0,
    "availableCash": 4230179.0,
    "fy": "2026-2027",
    "monthKey": "2026-08",
    "displayDate": "01 Aug 2026"
  },
  {
    "date": "31/07/2026",
    "amountReceived": 57800.0,
    "expense": 208530.0,
    "debt": 102000.0,
    "availableCash": 4463149.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "31 Jul 2026"
  },
  {
    "date": "30/07/2026",
    "amountReceived": 66000.0,
    "expense": 2480.0,
    "debt": 62000.0,
    "availableCash": 4715879.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "30 Jul 2026"
  },
  {
    "date": "29/07/2026",
    "amountReceived": 99600.0,
    "expense": 2615.0,
    "debt": 33700.0,
    "availableCash": 4714359.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "29 Jul 2026"
  },
  {
    "date": "28/07/2026",
    "amountReceived": 116900.0,
    "expense": 12.0,
    "debt": 45200.0,
    "availableCash": 4651074.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "28 Jul 2026"
  },
  {
    "date": "27/07/2026",
    "amountReceived": 300.0,
    "expense": 80.0,
    "debt": 1400.0,
    "availableCash": 4579386.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "27 Jul 2026"
  },
  {
    "date": "26/07/2026",
    "amountReceived": 156100.0,
    "expense": 450.0,
    "debt": 87300.0,
    "availableCash": 4580566.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "26 Jul 2026"
  },
  {
    "date": "25/07/2026",
    "amountReceived": 69000.0,
    "expense": 1630.0,
    "debt": 38800.0,
    "availableCash": 4512216.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "25 Jul 2026"
  },
  {
    "date": "24/07/2026",
    "amountReceived": 138100.0,
    "expense": 188.0,
    "debt": 42750.0,
    "availableCash": 4483646.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "24 Jul 2026"
  },
  {
    "date": "23/07/2026",
    "amountReceived": 162400.0,
    "expense": 104680.0,
    "debt": -178400.0,
    "availableCash": 4388484.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "23 Jul 2026"
  },
  {
    "date": "22/07/2026",
    "amountReceived": 248300.0,
    "expense": 0.0,
    "debt": 66800.0,
    "availableCash": 3836799.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "22 Jul 2026"
  },
  {
    "date": "21/07/2026",
    "amountReceived": 1261700.0,
    "expense": 0.0,
    "debt": 57000.0,
    "availableCash": 3655299.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "21 Jul 2026"
  },
  {
    "date": "20/07/2026",
    "amountReceived": 0.0,
    "expense": 22828.0,
    "debt": 2000.0,
    "availableCash": 2450599.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "20 Jul 2026"
  },
  {
    "date": "19/07/2026",
    "amountReceived": 111100.0,
    "expense": 3870.0,
    "debt": 15300.0,
    "availableCash": 2475427.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "19 Jul 2026"
  },
  {
    "date": "18/07/2026",
    "amountReceived": 105200.0,
    "expense": 1890.0,
    "debt": 22400.0,
    "availableCash": 2383497.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "18 Jul 2026"
  },
  {
    "date": "17/07/2026",
    "amountReceived": 363200.0,
    "expense": 60.0,
    "debt": 52100.0,
    "availableCash": 2302587.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "17 Jul 2026"
  },
  {
    "date": "16/07/2026",
    "amountReceived": 71200.0,
    "expense": 620.0,
    "debt": 24300.0,
    "availableCash": 1991547.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "16 Jul 2026"
  },
  {
    "date": "15/07/2026",
    "amountReceived": 146800.0,
    "expense": 270540.0,
    "debt": 2131500.0,
    "availableCash": 1945267.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "15 Jul 2026"
  },
  {
    "date": "14/07/2026",
    "amountReceived": 700.0,
    "expense": 145.0,
    "debt": 1400.0,
    "availableCash": 4200507.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "14 Jul 2026"
  },
  {
    "date": "13/07/2026",
    "amountReceived": 0.0,
    "expense": 560.0,
    "debt": 214400.0,
    "availableCash": 4201352.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "13 Jul 2026"
  },
  {
    "date": "12/07/2026",
    "amountReceived": 72700.0,
    "expense": 0.0,
    "debt": 63300.0,
    "availableCash": 4416312.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "12 Jul 2026"
  },
  {
    "date": "11/07/2026",
    "amountReceived": 333600.0,
    "expense": 1490.0,
    "debt": 220800.0,
    "availableCash": 4406912.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "11 Jul 2026"
  },
  {
    "date": "10/07/2026",
    "amountReceived": 50600.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 4978282.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "10 Jul 2026"
  },
  {
    "date": "09/07/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 4927682.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "09 Jul 2026"
  },
  {
    "date": "08/07/2026",
    "amountReceived": 96400.0,
    "expense": 5570.0,
    "debt": 84800.0,
    "availableCash": 4927682.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "08 Jul 2026"
  },
  {
    "date": "07/07/2026",
    "amountReceived": 212100.0,
    "expense": 650.0,
    "debt": 58200.0,
    "availableCash": 24921652.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "07 Jul 2026"
  },
  {
    "date": "06/07/2026",
    "amountReceived": 58700.0,
    "expense": 2670.0,
    "debt": 15400.0,
    "availableCash": 6104997.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "06 Jul 2026"
  },
  {
    "date": "05/07/2026",
    "amountReceived": 57000.0,
    "expense": 63.0,
    "debt": 70400.0,
    "availableCash": 6064367.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "05 Jul 2026"
  },
  {
    "date": "04/07/2026",
    "amountReceived": 70700.0,
    "expense": 530.0,
    "debt": 84600.0,
    "availableCash": 6077830.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "04 Jul 2026"
  },
  {
    "date": "03/07/2026",
    "amountReceived": 41400.0,
    "expense": 289305.0,
    "debt": 10500.0,
    "availableCash": 6092260.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "03 Jul 2026"
  },
  {
    "date": "02/07/2026",
    "amountReceived": 151300.0,
    "expense": 24340.0,
    "debt": 127900.0,
    "availableCash": 6350665.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "02 Jul 2026"
  },
  {
    "date": "01/07/2026",
    "amountReceived": 0.0,
    "expense": 192660.0,
    "debt": 261500.0,
    "availableCash": 6351605.0,
    "fy": "2026-2027",
    "monthKey": "2026-07",
    "displayDate": "01 Jul 2026"
  },
  {
    "date": "30/06/2026",
    "amountReceived": 0.0,
    "expense": 2945.0,
    "debt": 273300.0,
    "availableCash": 6805765.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "30 Jun 2026"
  },
  {
    "date": "29/06/2026",
    "amountReceived": 64700.0,
    "expense": 570.0,
    "debt": 30200.0,
    "availableCash": 7082010.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "29 Jun 2026"
  },
  {
    "date": "28/06/2026",
    "amountReceived": 2220100.0,
    "expense": 214110.0,
    "debt": 19800.0,
    "availableCash": 7048080.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "28 Jun 2026"
  },
  {
    "date": "27/06/2026",
    "amountReceived": 145800.0,
    "expense": 160.0,
    "debt": 38000.0,
    "availableCash": 5061890.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "27 Jun 2026"
  },
  {
    "date": "26/06/2026",
    "amountReceived": 68200.0,
    "expense": 0.0,
    "debt": 118800.0,
    "availableCash": 4954250.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "26 Jun 2026"
  },
  {
    "date": "25/06/2026",
    "amountReceived": 43700.0,
    "expense": 540.0,
    "debt": 55900.0,
    "availableCash": 5004850.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "25 Jun 2026"
  },
  {
    "date": "24/06/2026",
    "amountReceived": 0.0,
    "expense": 27470.0,
    "debt": 52400.0,
    "availableCash": 5017590.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "24 Jun 2026"
  },
  {
    "date": "23/06/2026",
    "amountReceived": 209500.0,
    "expense": 167285.0,
    "debt": 71500.0,
    "availableCash": 5097460.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "23 Jun 2026"
  },
  {
    "date": "22/06/2026",
    "amountReceived": 86600.0,
    "expense": 530.0,
    "debt": 64900.0,
    "availableCash": 5126745.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "22 Jun 2026"
  },
  {
    "date": "21/06/2026",
    "amountReceived": 125500.0,
    "expense": 0.0,
    "debt": 169300.0,
    "availableCash": 5105575.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "21 Jun 2026"
  },
  {
    "date": "20/06/2026",
    "amountReceived": 2131000.0,
    "expense": 10.0,
    "debt": 0.0,
    "availableCash": 5149375.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "20 Jun 2026"
  },
  {
    "date": "19/06/2026",
    "amountReceived": 68300.0,
    "expense": 2.0,
    "debt": 22900.0,
    "availableCash": 3018385.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "19 Jun 2026"
  },
  {
    "date": "18/06/2026",
    "amountReceived": 176300.0,
    "expense": 189505.0,
    "debt": -54500.0,
    "availableCash": 2972987.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "18 Jun 2026"
  },
  {
    "date": "17/06/2026",
    "amountReceived": 49200.0,
    "expense": 24070.0,
    "debt": -27600.0,
    "availableCash": 2931692.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "17 Jun 2026"
  },
  {
    "date": "16/06/2026",
    "amountReceived": 0.0,
    "expense": 660.0,
    "debt": 22000.0,
    "availableCash": 2878962.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "16 Jun 2026"
  },
  {
    "date": "15/06/2026",
    "amountReceived": 0.0,
    "expense": 3350.0,
    "debt": 84400.0,
    "availableCash": 2901622.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "15 Jun 2026"
  },
  {
    "date": "14/06/2026",
    "amountReceived": 0.0,
    "expense": 251840.0,
    "debt": 60100.0,
    "availableCash": 2989372.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "14 Jun 2026"
  },
  {
    "date": "13/06/2026",
    "amountReceived": 197000.0,
    "expense": 0.0,
    "debt": 21800.0,
    "availableCash": 6018787.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "13 Jun 2026"
  },
  {
    "date": "12/06/2026",
    "amountReceived": 265500.0,
    "expense": 310.0,
    "debt": 50700.0,
    "availableCash": 5843587.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "12 Jun 2026"
  },
  {
    "date": "11/06/2026",
    "amountReceived": 120100.0,
    "expense": 5805.0,
    "debt": 507900.0,
    "availableCash": 5629097.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "11 Jun 2026"
  },
  {
    "date": "10/06/2026",
    "amountReceived": 248200.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 6022702.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "10 Jun 2026"
  },
  {
    "date": "09/06/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5774502.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "09 Jun 2026"
  },
  {
    "date": "08/06/2026",
    "amountReceived": 267100.0,
    "expense": 0.0,
    "debt": 148870.0,
    "availableCash": 5774502.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "08 Jun 2026"
  },
  {
    "date": "07/06/2026",
    "amountReceived": 0.0,
    "expense": 210.0,
    "debt": -12200.0,
    "availableCash": 5656272.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "07 Jun 2026"
  },
  {
    "date": "06/06/2026",
    "amountReceived": 7800.0,
    "expense": 9895.0,
    "debt": 14500.0,
    "availableCash": 5644282.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "06 Jun 2026"
  },
  {
    "date": "05/06/2026",
    "amountReceived": 4600.0,
    "expense": 1365.0,
    "debt": 500.0,
    "availableCash": 5660877.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "05 Jun 2026"
  },
  {
    "date": "04/06/2026",
    "amountReceived": 244900.0,
    "expense": 1270.0,
    "debt": -420600.0,
    "availableCash": 5658142.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "04 Jun 2026"
  },
  {
    "date": "03/06/2026",
    "amountReceived": 274100.0,
    "expense": 1320.0,
    "debt": 31500.0,
    "availableCash": 4993912.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "03 Jun 2026"
  },
  {
    "date": "02/06/2026",
    "amountReceived": 232900.0,
    "expense": 104830.0,
    "debt": 107000.0,
    "availableCash": 2873632.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "02 Jun 2026"
  },
  {
    "date": "01/06/2026",
    "amountReceived": 1612300.0,
    "expense": 27420.0,
    "debt": 181500.0,
    "availableCash": 2852562.0,
    "fy": "2026-2027",
    "monthKey": "2026-06",
    "displayDate": "01 Jun 2026"
  },
  {
    "date": "31/05/2026",
    "amountReceived": 0.0,
    "expense": 1515.0,
    "debt": 29800.0,
    "availableCash": 1449182.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "31 May 2026"
  },
  {
    "date": "30/05/2026",
    "amountReceived": 590200.0,
    "expense": 2275199.0,
    "debt": 775600.0,
    "availableCash": 1480497.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "30 May 2026"
  },
  {
    "date": "29/05/2026",
    "amountReceived": 134600.0,
    "expense": 20.0,
    "debt": 287300.0,
    "availableCash": 3941096.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "29 May 2026"
  },
  {
    "date": "28/05/2026",
    "amountReceived": 43200.0,
    "expense": 1.0,
    "debt": 6700.0,
    "availableCash": 3021165.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "28 May 2026"
  },
  {
    "date": "27/05/2026",
    "amountReceived": 4500.0,
    "expense": 10.0,
    "debt": -3400.0,
    "availableCash": 2984666.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "27 May 2026"
  },
  {
    "date": "26/05/2026",
    "amountReceived": 290100.0,
    "expense": 4660.0,
    "debt": 32400.0,
    "availableCash": 2976776.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "26 May 2026"
  },
  {
    "date": "25/05/2026",
    "amountReceived": 0.0,
    "expense": 11825.0,
    "debt": 34700.0,
    "availableCash": 2723736.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "25 May 2026"
  },
  {
    "date": "24/05/2026",
    "amountReceived": 0.0,
    "expense": 1480.0,
    "debt": 40700.0,
    "availableCash": 2770261.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "24 May 2026"
  },
  {
    "date": "23/05/2026",
    "amountReceived": 127800.0,
    "expense": 0.0,
    "debt": 122300.0,
    "availableCash": 2812441.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "23 May 2026"
  },
  {
    "date": "22/05/2026",
    "amountReceived": 110800.0,
    "expense": 19.0,
    "debt": 48200.0,
    "availableCash": 2806941.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "22 May 2026"
  },
  {
    "date": "21/05/2026",
    "amountReceived": 46100.0,
    "expense": 237320.0,
    "debt": 0.0,
    "availableCash": 5513621.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "21 May 2026"
  },
  {
    "date": "20/05/2026",
    "amountReceived": 22000.0,
    "expense": 1415.0,
    "debt": 78000.0,
    "availableCash": 5704841.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "20 May 2026"
  },
  {
    "date": "19/05/2026",
    "amountReceived": 146900.0,
    "expense": 9245.0,
    "debt": 246800.0,
    "availableCash": 5762256.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "19 May 2026"
  },
  {
    "date": "18/05/2026",
    "amountReceived": 424300.0,
    "expense": 36.0,
    "debt": 8800.0,
    "availableCash": 5871401.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "18 May 2026"
  },
  {
    "date": "17/05/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 671770.0,
    "availableCash": 5455937.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "17 May 2026"
  },
  {
    "date": "16/05/2026",
    "amountReceived": 85800.0,
    "expense": 86790.0,
    "debt": -2100000.0,
    "availableCash": 6127707.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "16 May 2026"
  },
  {
    "date": "15/05/2026",
    "amountReceived": 225900.0,
    "expense": 2274.0,
    "debt": 18100.0,
    "availableCash": 4028697.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "15 May 2026"
  },
  {
    "date": "14/05/2026",
    "amountReceived": 114900.0,
    "expense": 1495.0,
    "debt": 4000.0,
    "availableCash": 3582971.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "14 May 2026"
  },
  {
    "date": "13/05/2026",
    "amountReceived": 78300.0,
    "expense": 1305.0,
    "debt": 109400.0,
    "availableCash": 3473566.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "13 May 2026"
  },
  {
    "date": "12/05/2026",
    "amountReceived": 0.0,
    "expense": 2110.0,
    "debt": -15900.0,
    "availableCash": 3505971.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "12 May 2026"
  },
  {
    "date": "11/05/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 3492181.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "11 May 2026"
  },
  {
    "date": "10/05/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 23281411.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "10 May 2026"
  },
  {
    "date": "09/05/2026",
    "amountReceived": 180500.0,
    "expense": 413420.0,
    "debt": 275700.0,
    "availableCash": 23281411.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "09 May 2026"
  },
  {
    "date": "08/05/2026",
    "amountReceived": 0.0,
    "expense": 660.0,
    "debt": 62300.0,
    "availableCash": 23790031.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "08 May 2026"
  },
  {
    "date": "07/05/2026",
    "amountReceived": 77700.0,
    "expense": 2125.0,
    "debt": 17900.0,
    "availableCash": 23852991.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "07 May 2026"
  },
  {
    "date": "06/05/2026",
    "amountReceived": 84700.0,
    "expense": 22365.0,
    "debt": 126000.0,
    "availableCash": 25634955.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "06 May 2026"
  },
  {
    "date": "05/05/2026",
    "amountReceived": 0.0,
    "expense": 1765.0,
    "debt": 168700.0,
    "availableCash": 25698620.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "05 May 2026"
  },
  {
    "date": "04/05/2026",
    "amountReceived": 262100.0,
    "expense": 21060.0,
    "debt": 211400.0,
    "availableCash": 25869085.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "04 May 2026"
  },
  {
    "date": "03/05/2026",
    "amountReceived": 79500.0,
    "expense": 1220.0,
    "debt": 7500.0,
    "availableCash": 25839445.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "03 May 2026"
  },
  {
    "date": "02/05/2026",
    "amountReceived": 257400.0,
    "expense": 31295.0,
    "debt": 27500.0,
    "availableCash": 25768665.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "02 May 2026"
  },
  {
    "date": "01/05/2026",
    "amountReceived": 13600.0,
    "expense": 23555.0,
    "debt": 46600.0,
    "availableCash": 25570060.0,
    "fy": "2026-2027",
    "monthKey": "2026-05",
    "displayDate": "01 May 2026"
  },
  {
    "date": "30/04/2026",
    "amountReceived": 367700.0,
    "expense": 193075.0,
    "debt": 44100.0,
    "availableCash": 25626615.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "30 Apr 2026"
  },
  {
    "date": "29/04/2026",
    "amountReceived": 156100.0,
    "expense": 11.0,
    "debt": 23700.0,
    "availableCash": 25496090.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "29 Apr 2026"
  },
  {
    "date": "28/04/2026",
    "amountReceived": 31300.0,
    "expense": 2150.0,
    "debt": 23900.0,
    "availableCash": 25363701.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "28 Apr 2026"
  },
  {
    "date": "27/04/2026",
    "amountReceived": 158200.0,
    "expense": 21030.0,
    "debt": 43500.0,
    "availableCash": 25358451.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "27 Apr 2026"
  },
  {
    "date": "26/04/2026",
    "amountReceived": 193300.0,
    "expense": 80.0,
    "debt": 59200.0,
    "availableCash": 25264781.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "26 Apr 2026"
  },
  {
    "date": "25/04/2026",
    "amountReceived": 2135900.0,
    "expense": 21280.0,
    "debt": 16400.0,
    "availableCash": 25130761.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "25 Apr 2026"
  },
  {
    "date": "24/04/2026",
    "amountReceived": 69300.0,
    "expense": 569.0,
    "debt": 45900.0,
    "availableCash": 23032541.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "24 Apr 2026"
  },
  {
    "date": "23/04/2026",
    "amountReceived": 383400.0,
    "expense": 5.0,
    "debt": 67600.0,
    "availableCash": 23009710.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "23 Apr 2026"
  },
  {
    "date": "22/04/2026",
    "amountReceived": 69300.0,
    "expense": 0.0,
    "debt": 206600.0,
    "availableCash": 22693915.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "22 Apr 2026"
  },
  {
    "date": "21/04/2026",
    "amountReceived": 110200.0,
    "expense": 0.0,
    "debt": 107800.0,
    "availableCash": 22831215.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "21 Apr 2026"
  },
  {
    "date": "20/04/2026",
    "amountReceived": 9500.0,
    "expense": 0.0,
    "debt": 286100.0,
    "availableCash": 22828815.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "20 Apr 2026"
  },
  {
    "date": "19/04/2026",
    "amountReceived": 245200.0,
    "expense": 0.0,
    "debt": 65700.0,
    "availableCash": 2825915.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "19 Apr 2026"
  },
  {
    "date": "18/04/2026",
    "amountReceived": -165300.0,
    "expense": 0.0,
    "debt": 364200.0,
    "availableCash": 138824.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "18 Apr 2026"
  },
  {
    "date": "17/04/2026",
    "amountReceived": 54800.0,
    "expense": 9330.0,
    "debt": 65700.0,
    "availableCash": 668324.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "17 Apr 2026"
  },
  {
    "date": "16/04/2026",
    "amountReceived": 57300.0,
    "expense": 150690.0,
    "debt": 204600.0,
    "availableCash": 688554.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "16 Apr 2026"
  },
  {
    "date": "15/04/2026",
    "amountReceived": 62200.0,
    "expense": 90.0,
    "debt": 211400.0,
    "availableCash": 986544.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "15 Apr 2026"
  },
  {
    "date": "14/04/2026",
    "amountReceived": 0.0,
    "expense": 1.0,
    "debt": 235500.0,
    "availableCash": 1135834.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "14 Apr 2026"
  },
  {
    "date": "13/04/2026",
    "amountReceived": 0.0,
    "expense": 1120.0,
    "debt": -171100.0,
    "availableCash": 1371335.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "13 Apr 2026"
  },
  {
    "date": "12/04/2026",
    "amountReceived": 61000.0,
    "expense": 1150.0,
    "debt": 21800.0,
    "availableCash": 1201355.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "12 Apr 2026"
  },
  {
    "date": "11/04/2026",
    "amountReceived": -2124400.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1163305.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "11 Apr 2026"
  },
  {
    "date": "10/04/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 3287705.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "10 Apr 2026"
  },
  {
    "date": "09/04/2026",
    "amountReceived": 55600.0,
    "expense": 365.0,
    "debt": 24800.0,
    "availableCash": 3287705.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "09 Apr 2026"
  },
  {
    "date": "08/04/2026",
    "amountReceived": 100100.0,
    "expense": 145.0,
    "debt": 34600.0,
    "availableCash": 3257270.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "08 Apr 2026"
  },
  {
    "date": "07/04/2026",
    "amountReceived": 0.0,
    "expense": 835.0,
    "debt": 118300.0,
    "availableCash": 3191915.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "07 Apr 2026"
  },
  {
    "date": "06/04/2026",
    "amountReceived": 246700.0,
    "expense": 255131.0,
    "debt": -492051.0,
    "availableCash": 3311050.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "06 Apr 2026"
  },
  {
    "date": "05/04/2026",
    "amountReceived": 148000.0,
    "expense": 21280.0,
    "debt": 35800.0,
    "availableCash": 2827430.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "05 Apr 2026"
  },
  {
    "date": "04/04/2026",
    "amountReceived": 609900.0,
    "expense": 50190.0,
    "debt": 37800.0,
    "availableCash": 2736510.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "04 Apr 2026"
  },
  {
    "date": "03/04/2026",
    "amountReceived": 102800.0,
    "expense": 100270.0,
    "debt": -2600.0,
    "availableCash": 2214600.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "03 Apr 2026"
  },
  {
    "date": "02/04/2026",
    "amountReceived": 52300.0,
    "expense": 0.0,
    "debt": 24900.0,
    "availableCash": 22209470.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "02 Apr 2026"
  },
  {
    "date": "01/04/2026",
    "amountReceived": 80400.0,
    "expense": 16650.0,
    "debt": 52000.0,
    "availableCash": 2101507.0,
    "fy": "2026-2027",
    "monthKey": "2026-04",
    "displayDate": "01 Apr 2026"
  },
  {
    "date": "31/03/2026",
    "amountReceived": 46500.0,
    "expense": 4413.0,
    "debt": 47500.0,
    "availableCash": 2089757.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "31 Mar 2026"
  },
  {
    "date": "30/03/2026",
    "amountReceived": 68000.0,
    "expense": 23008.0,
    "debt": 25000.0,
    "availableCash": 2095170.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "30 Mar 2026"
  },
  {
    "date": "29/03/2026",
    "amountReceived": 0.0,
    "expense": 85.0,
    "debt": 30300.0,
    "availableCash": 2075178.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "29 Mar 2026"
  },
  {
    "date": "28/03/2026",
    "amountReceived": 0.0,
    "expense": 67560.0,
    "debt": 22000.0,
    "availableCash": 2105563.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "28 Mar 2026"
  },
  {
    "date": "27/03/2026",
    "amountReceived": 252500.0,
    "expense": 45.0,
    "debt": 26000.0,
    "availableCash": 2195123.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "27 Mar 2026"
  },
  {
    "date": "26/03/2026",
    "amountReceived": 0.0,
    "expense": 21060.0,
    "debt": 472300.0,
    "availableCash": 1968668.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "26 Mar 2026"
  },
  {
    "date": "25/03/2026",
    "amountReceived": 403200.0,
    "expense": 75.0,
    "debt": 527500.0,
    "availableCash": 2462028.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "25 Mar 2026"
  },
  {
    "date": "24/03/2026",
    "amountReceived": 100100.0,
    "expense": 870.0,
    "debt": 13000.0,
    "availableCash": -17745597.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "24 Mar 2026"
  },
  {
    "date": "23/03/2026",
    "amountReceived": 0.0,
    "expense": 1980.0,
    "debt": 65500.0,
    "availableCash": -17831827.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "23 Mar 2026"
  },
  {
    "date": "22/03/2026",
    "amountReceived": 9000.0,
    "expense": 255.0,
    "debt": 156500.0,
    "availableCash": -17764347.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "22 Mar 2026"
  },
  {
    "date": "21/03/2026",
    "amountReceived": 56300.0,
    "expense": 595.0,
    "debt": 60000.0,
    "availableCash": -17616592.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "21 Mar 2026"
  },
  {
    "date": "20/03/2026",
    "amountReceived": 576000.0,
    "expense": 101805.0,
    "debt": 0.0,
    "availableCash": -17612297.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "20 Mar 2026"
  },
  {
    "date": "19/03/2026",
    "amountReceived": 66000.0,
    "expense": 22980.0,
    "debt": 21059200.0,
    "availableCash": -18086492.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "19 Mar 2026"
  },
  {
    "date": "18/03/2026",
    "amountReceived": 193900.0,
    "expense": 22004.0,
    "debt": 10500.0,
    "availableCash": 2929688.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "18 Mar 2026"
  },
  {
    "date": "17/03/2026",
    "amountReceived": 177000.0,
    "expense": 1129.0,
    "debt": 275500.0,
    "availableCash": 2768292.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "17 Mar 2026"
  },
  {
    "date": "16/03/2026",
    "amountReceived": 58500.0,
    "expense": 0.0,
    "debt": 17500.0,
    "availableCash": 2867921.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "16 Mar 2026"
  },
  {
    "date": "15/03/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": -33000.0,
    "availableCash": 2860430.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "15 Mar 2026"
  },
  {
    "date": "14/03/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 2827430.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "14 Mar 2026"
  },
  {
    "date": "13/03/2026",
    "amountReceived": 56000.0,
    "expense": 224194.0,
    "debt": 16500.0,
    "availableCash": 2827430.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "13 Mar 2026"
  },
  {
    "date": "12/03/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 3012124.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "12 Mar 2026"
  },
  {
    "date": "11/03/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 3012124.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "11 Mar 2026"
  },
  {
    "date": "10/03/2026",
    "amountReceived": 89000.0,
    "expense": 21378.0,
    "debt": 20800.0,
    "availableCash": 3012124.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "10 Mar 2026"
  },
  {
    "date": "09/03/2026",
    "amountReceived": 0.0,
    "expense": 879.0,
    "debt": 277000.0,
    "availableCash": 2965302.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "09 Mar 2026"
  },
  {
    "date": "08/03/2026",
    "amountReceived": 0.0,
    "expense": 6129329.0,
    "debt": 0.0,
    "availableCash": -2311472.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "08 Mar 2026"
  },
  {
    "date": "07/03/2026",
    "amountReceived": 258700.0,
    "expense": 276.0,
    "debt": 12500.0,
    "availableCash": 3817857.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "07 Mar 2026"
  },
  {
    "date": "06/03/2026",
    "amountReceived": 0.0,
    "expense": 2968.0,
    "debt": 41300.0,
    "availableCash": 3571933.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "06 Mar 2026"
  },
  {
    "date": "05/03/2026",
    "amountReceived": 42500.0,
    "expense": 420.0,
    "debt": 11500.0,
    "availableCash": 3616201.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "05 Mar 2026"
  },
  {
    "date": "04/03/2026",
    "amountReceived": 3600.0,
    "expense": 1180.0,
    "debt": 1000.0,
    "availableCash": 3585621.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "04 Mar 2026"
  },
  {
    "date": "03/03/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 50000.0,
    "availableCash": 3584201.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "03 Mar 2026"
  },
  {
    "date": "02/03/2026",
    "amountReceived": 32000.0,
    "expense": 39240.0,
    "debt": 14500.0,
    "availableCash": 3634201.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "02 Mar 2026"
  },
  {
    "date": "01/03/2026",
    "amountReceived": 105500.0,
    "expense": 24503.0,
    "debt": 312500.0,
    "availableCash": 3655941.0,
    "fy": "2025-2026",
    "monthKey": "2026-03",
    "displayDate": "01 Mar 2026"
  },
  {
    "date": "28/02/2026",
    "amountReceived": 0.0,
    "expense": 37370.0,
    "debt": -5500.0,
    "availableCash": 3887444.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "28 Feb 2026"
  },
  {
    "date": "27/02/2026",
    "amountReceived": 2161000.0,
    "expense": 125.0,
    "debt": 47000.0,
    "availableCash": 3919314.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "27 Feb 2026"
  },
  {
    "date": "26/02/2026",
    "amountReceived": 28300.0,
    "expense": 53.0,
    "debt": 21500.0,
    "availableCash": 1805439.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "26 Feb 2026"
  },
  {
    "date": "25/02/2026",
    "amountReceived": 46500.0,
    "expense": 232680.0,
    "debt": 47500.0,
    "availableCash": 1798692.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "25 Feb 2026"
  },
  {
    "date": "24/02/2026",
    "amountReceived": 22000.0,
    "expense": 22010.0,
    "debt": 92000.0,
    "availableCash": 2032372.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "24 Feb 2026"
  },
  {
    "date": "23/02/2026",
    "amountReceived": 49500.0,
    "expense": 2480.0,
    "debt": 68000.0,
    "availableCash": 2124382.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "23 Feb 2026"
  },
  {
    "date": "22/02/2026",
    "amountReceived": 0.0,
    "expense": 20.0,
    "debt": 11500.0,
    "availableCash": 22076262.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "22 Feb 2026"
  },
  {
    "date": "21/02/2026",
    "amountReceived": 134400.0,
    "expense": 8510.0,
    "debt": 26500.0,
    "availableCash": 22087782.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "21 Feb 2026"
  },
  {
    "date": "20/02/2026",
    "amountReceived": 88000.0,
    "expense": 3755.0,
    "debt": 100000.0,
    "availableCash": 21988392.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "20 Feb 2026"
  },
  {
    "date": "19/02/2026",
    "amountReceived": 90500.0,
    "expense": 17.0,
    "debt": 132500.0,
    "availableCash": 22004147.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "19 Feb 2026"
  },
  {
    "date": "18/02/2026",
    "amountReceived": 52500.0,
    "expense": 10.0,
    "debt": 4900.0,
    "availableCash": 45663580.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "18 Feb 2026"
  },
  {
    "date": "17/02/2026",
    "amountReceived": 32500.0,
    "expense": 240.0,
    "debt": 1500.0,
    "availableCash": 45615990.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "17 Feb 2026"
  },
  {
    "date": "16/02/2026",
    "amountReceived": 0.0,
    "expense": 27450.0,
    "debt": 50600.0,
    "availableCash": 45585230.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "16 Feb 2026"
  },
  {
    "date": "15/02/2026",
    "amountReceived": 0.0,
    "expense": 1630.0,
    "debt": 27800.0,
    "availableCash": 45663280.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "15 Feb 2026"
  },
  {
    "date": "14/02/2026",
    "amountReceived": 48500.0,
    "expense": 0.0,
    "debt": 55000.0,
    "availableCash": 45692710.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "14 Feb 2026"
  },
  {
    "date": "13/02/2026",
    "amountReceived": 0.0,
    "expense": 21020.0,
    "debt": 900.0,
    "availableCash": 45699210.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "13 Feb 2026"
  },
  {
    "date": "12/02/2026",
    "amountReceived": 0.0,
    "expense": 2.0,
    "debt": 24500.0,
    "availableCash": 45721130.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "12 Feb 2026"
  },
  {
    "date": "11/02/2026",
    "amountReceived": 127000.0,
    "expense": 40.0,
    "debt": 25000.0,
    "availableCash": 45745632.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "11 Feb 2026"
  },
  {
    "date": "10/02/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 45643672.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "10 Feb 2026"
  },
  {
    "date": "09/02/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 45643672.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "09 Feb 2026"
  },
  {
    "date": "08/02/2026",
    "amountReceived": 35500.0,
    "expense": 310.0,
    "debt": 23500.0,
    "availableCash": 45643672.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "08 Feb 2026"
  },
  {
    "date": "07/02/2026",
    "amountReceived": 58500.0,
    "expense": 1040.0,
    "debt": 104700.0,
    "availableCash": 45631982.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "07 Feb 2026"
  },
  {
    "date": "06/02/2026",
    "amountReceived": 133500.0,
    "expense": 3420.0,
    "debt": 0.0,
    "availableCash": 45679222.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "06 Feb 2026"
  },
  {
    "date": "05/02/2026",
    "amountReceived": 2199000.0,
    "expense": 0.0,
    "debt": 230900.0,
    "availableCash": 45549142.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "05 Feb 2026"
  },
  {
    "date": "04/02/2026",
    "amountReceived": 80500.0,
    "expense": 70550.0,
    "debt": 10100.0,
    "availableCash": 43581042.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "04 Feb 2026"
  },
  {
    "date": "03/02/2026",
    "amountReceived": 65600.0,
    "expense": 85.0,
    "debt": 19000.0,
    "availableCash": 43581192.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "03 Feb 2026"
  },
  {
    "date": "02/02/2026",
    "amountReceived": 93200.0,
    "expense": 570.0,
    "debt": 67600.0,
    "availableCash": 43534677.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "02 Feb 2026"
  },
  {
    "date": "01/02/2026",
    "amountReceived": 21062000.0,
    "expense": 0.0,
    "debt": 13000.0,
    "availableCash": 43509647.0,
    "fy": "2025-2026",
    "monthKey": "2026-02",
    "displayDate": "01 Feb 2026"
  },
  {
    "date": "31/01/2026",
    "amountReceived": 662500.0,
    "expense": 670940.0,
    "debt": -196000.0,
    "availableCash": 22460647.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "31 Jan 2026"
  },
  {
    "date": "30/01/2026",
    "amountReceived": 119100.0,
    "expense": 1390.0,
    "debt": 29500.0,
    "availableCash": 22273087.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "30 Jan 2026"
  },
  {
    "date": "29/01/2026",
    "amountReceived": 160500.0,
    "expense": 21460.0,
    "debt": 42800.0,
    "availableCash": 22184877.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "29 Jan 2026"
  },
  {
    "date": "28/01/2026",
    "amountReceived": 151800.0,
    "expense": 2745.0,
    "debt": 68500.0,
    "availableCash": 22088637.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "28 Jan 2026"
  },
  {
    "date": "27/01/2026",
    "amountReceived": 155000.0,
    "expense": 780.0,
    "debt": 38000.0,
    "availableCash": 22008082.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "27 Jan 2026"
  },
  {
    "date": "26/01/2026",
    "amountReceived": 149000.0,
    "expense": 1615.0,
    "debt": 52500.0,
    "availableCash": 21891862.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "26 Jan 2026"
  },
  {
    "date": "25/01/2026",
    "amountReceived": 0.0,
    "expense": 240.0,
    "debt": 42700.0,
    "availableCash": 21796977.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "25 Jan 2026"
  },
  {
    "date": "24/01/2026",
    "amountReceived": 284200.0,
    "expense": 0.0,
    "debt": 68200.0,
    "availableCash": 21839917.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "24 Jan 2026"
  },
  {
    "date": "23/01/2026",
    "amountReceived": 272656.0,
    "expense": 200546.0,
    "debt": 47500.0,
    "availableCash": 21623917.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "23 Jan 2026"
  },
  {
    "date": "22/01/2026",
    "amountReceived": 269900.0,
    "expense": 630.0,
    "debt": 30000.0,
    "availableCash": 21599307.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "22 Jan 2026"
  },
  {
    "date": "21/01/2026",
    "amountReceived": 9500.0,
    "expense": 1010.0,
    "debt": 275700.0,
    "availableCash": 21360037.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "21 Jan 2026"
  },
  {
    "date": "20/01/2026",
    "amountReceived": 66000.0,
    "expense": 0.0,
    "debt": 37600.0,
    "availableCash": 21627247.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "20 Jan 2026"
  },
  {
    "date": "19/01/2026",
    "amountReceived": 17100.0,
    "expense": 21045.0,
    "debt": 66900.0,
    "availableCash": 21598847.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "19 Jan 2026"
  },
  {
    "date": "18/01/2026",
    "amountReceived": 84800.0,
    "expense": 4170.0,
    "debt": 0.0,
    "availableCash": 21669692.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "18 Jan 2026"
  },
  {
    "date": "17/01/2026",
    "amountReceived": 290700.0,
    "expense": 410.0,
    "debt": 36600.0,
    "availableCash": 21589062.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "17 Jan 2026"
  },
  {
    "date": "16/01/2026",
    "amountReceived": 144100.0,
    "expense": 509540.0,
    "debt": 386300.0,
    "availableCash": 21335372.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "16 Jan 2026"
  },
  {
    "date": "15/01/2026",
    "amountReceived": 98600.0,
    "expense": 445.0,
    "debt": 27600.0,
    "availableCash": 22087112.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "15 Jan 2026"
  },
  {
    "date": "14/01/2026",
    "amountReceived": 109700.0,
    "expense": 2590.0,
    "debt": 74000.0,
    "availableCash": 3344962.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "14 Jan 2026"
  },
  {
    "date": "13/01/2026",
    "amountReceived": 0.0,
    "expense": 158930.0,
    "debt": 69500.0,
    "availableCash": 3311852.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "13 Jan 2026"
  },
  {
    "date": "12/01/2026",
    "amountReceived": 0.0,
    "expense": 420.0,
    "debt": 70800.0,
    "availableCash": 3540282.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "12 Jan 2026"
  },
  {
    "date": "11/01/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 3611502.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "11 Jan 2026"
  },
  {
    "date": "10/01/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 3611502.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "10 Jan 2026"
  },
  {
    "date": "09/01/2026",
    "amountReceived": 222600.0,
    "expense": 27350.0,
    "debt": 51800.0,
    "availableCash": 3611502.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "09 Jan 2026"
  },
  {
    "date": "08/01/2026",
    "amountReceived": 124000.0,
    "expense": 18310.0,
    "debt": 53200.0,
    "availableCash": 3468052.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "08 Jan 2026"
  },
  {
    "date": "07/01/2026",
    "amountReceived": 52800.0,
    "expense": 215950.0,
    "debt": 22500.0,
    "availableCash": 3415562.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "07 Jan 2026"
  },
  {
    "date": "06/01/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 198300.0,
    "availableCash": 3601212.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "06 Jan 2026"
  },
  {
    "date": "05/01/2026",
    "amountReceived": 172600.0,
    "expense": 12180.0,
    "debt": 274100.0,
    "availableCash": 3799512.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "05 Jan 2026"
  },
  {
    "date": "04/01/2026",
    "amountReceived": 7600.0,
    "expense": 7835.0,
    "debt": 19100.0,
    "availableCash": 3913192.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "04 Jan 2026"
  },
  {
    "date": "03/01/2026",
    "amountReceived": 2113300.0,
    "expense": 347650.0,
    "debt": 68300.0,
    "availableCash": 3932527.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "03 Jan 2026"
  },
  {
    "date": "02/01/2026",
    "amountReceived": 83200.0,
    "expense": 50.0,
    "debt": 25000.0,
    "availableCash": 2235177.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "02 Jan 2026"
  },
  {
    "date": "01/01/2026",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 31800.0,
    "availableCash": 2177027.0,
    "fy": "2025-2026",
    "monthKey": "2026-01",
    "displayDate": "01 Jan 2026"
  },
  {
    "date": "31/12/2025",
    "amountReceived": 229100.0,
    "expense": 940.0,
    "debt": 34800.0,
    "availableCash": 2208827.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "31 Dec 2025"
  },
  {
    "date": "30/12/2025",
    "amountReceived": 292500.0,
    "expense": 0.0,
    "debt": 35500.0,
    "availableCash": 2015467.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "30 Dec 2025"
  },
  {
    "date": "29/12/2025",
    "amountReceived": 287200.0,
    "expense": 29740.0,
    "debt": 28600.0,
    "availableCash": 1758467.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "29 Dec 2025"
  },
  {
    "date": "28/12/2025",
    "amountReceived": 415300.0,
    "expense": 0.0,
    "debt": 110600.0,
    "availableCash": 1529607.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "28 Dec 2025"
  },
  {
    "date": "27/12/2025",
    "amountReceived": 171500.0,
    "expense": 275.0,
    "debt": 106600.0,
    "availableCash": 1224907.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "27 Dec 2025"
  },
  {
    "date": "26/12/2025",
    "amountReceived": 0.0,
    "expense": 2180.0,
    "debt": 76100.0,
    "availableCash": 1160282.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "26 Dec 2025"
  },
  {
    "date": "25/12/2025",
    "amountReceived": 55000.0,
    "expense": 540.0,
    "debt": 59000.0,
    "availableCash": 1238562.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "25 Dec 2025"
  },
  {
    "date": "24/12/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 29800.0,
    "availableCash": 1243102.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "24 Dec 2025"
  },
  {
    "date": "23/12/2025",
    "amountReceived": 65000.0,
    "expense": 1250.0,
    "debt": 338500.0,
    "availableCash": 45902.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "23 Dec 2025"
  },
  {
    "date": "22/12/2025",
    "amountReceived": 96800.0,
    "expense": 1.0,
    "debt": 52600.0,
    "availableCash": 1220652.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "22 Dec 2025"
  },
  {
    "date": "21/12/2025",
    "amountReceived": 43100.0,
    "expense": 2150.0,
    "debt": 34300.0,
    "availableCash": 1194769.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "21 Dec 2025"
  },
  {
    "date": "20/12/2025",
    "amountReceived": 64600.0,
    "expense": 18.0,
    "debt": 45600.0,
    "availableCash": 1188119.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "20 Dec 2025"
  },
  {
    "date": "19/12/2025",
    "amountReceived": 75500.0,
    "expense": 4750.0,
    "debt": 11000.0,
    "availableCash": 1169137.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "19 Dec 2025"
  },
  {
    "date": "18/12/2025",
    "amountReceived": 163300.0,
    "expense": 156910.0,
    "debt": 86100.0,
    "availableCash": 1109387.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "18 Dec 2025"
  },
  {
    "date": "17/12/2025",
    "amountReceived": 122200.0,
    "expense": 15.0,
    "debt": 73130.0,
    "availableCash": 1189097.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "17 Dec 2025"
  },
  {
    "date": "16/12/2025",
    "amountReceived": 57300.0,
    "expense": 430.0,
    "debt": 10500.0,
    "availableCash": 1140042.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "16 Dec 2025"
  },
  {
    "date": "15/12/2025",
    "amountReceived": 167100.0,
    "expense": 1890.0,
    "debt": 205900.0,
    "availableCash": 1354080.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "15 Dec 2025"
  },
  {
    "date": "14/12/2025",
    "amountReceived": 81900.0,
    "expense": 0.0,
    "debt": 41900.0,
    "availableCash": 1394770.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "14 Dec 2025"
  },
  {
    "date": "13/12/2025",
    "amountReceived": 0.0,
    "expense": 657.0,
    "debt": 56000.0,
    "availableCash": 1354770.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "13 Dec 2025"
  },
  {
    "date": "12/12/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1411427.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "12 Dec 2025"
  },
  {
    "date": "11/12/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1411427.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "11 Dec 2025"
  },
  {
    "date": "10/12/2025",
    "amountReceived": 217100.0,
    "expense": 630.0,
    "debt": 34100.0,
    "availableCash": 1411427.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "10 Dec 2025"
  },
  {
    "date": "09/12/2025",
    "amountReceived": 95200.0,
    "expense": 145385.0,
    "debt": 195235.0,
    "availableCash": 1229057.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "09 Dec 2025"
  },
  {
    "date": "08/12/2025",
    "amountReceived": 0.0,
    "expense": 445.0,
    "debt": 50500.0,
    "availableCash": 1305677.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "08 Dec 2025"
  },
  {
    "date": "07/12/2025",
    "amountReceived": 65900.0,
    "expense": 109720.0,
    "debt": 60900.0,
    "availableCash": 1356622.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "07 Dec 2025"
  },
  {
    "date": "06/12/2025",
    "amountReceived": 125500.0,
    "expense": 2670.0,
    "debt": 12500.0,
    "availableCash": 1461342.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "06 Dec 2025"
  },
  {
    "date": "05/12/2025",
    "amountReceived": 61300.0,
    "expense": 30.0,
    "debt": 170790.0,
    "availableCash": 1351012.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "05 Dec 2025"
  },
  {
    "date": "04/12/2025",
    "amountReceived": 145800.0,
    "expense": 520.0,
    "debt": 130100.0,
    "availableCash": 1460532.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "04 Dec 2025"
  },
  {
    "date": "03/12/2025",
    "amountReceived": 211300.0,
    "expense": 5210.0,
    "debt": 9200.0,
    "availableCash": 1445352.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "03 Dec 2025"
  },
  {
    "date": "02/12/2025",
    "amountReceived": 54300.0,
    "expense": 21710.0,
    "debt": 300.0,
    "availableCash": 1248462.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "02 Dec 2025"
  },
  {
    "date": "01/12/2025",
    "amountReceived": 247935.0,
    "expense": 208940.0,
    "debt": 122000.0,
    "availableCash": 67172.0,
    "fy": "2025-2026",
    "monthKey": "2025-12",
    "displayDate": "01 Dec 2025"
  },
  {
    "date": "30/11/2025",
    "amountReceived": 0.0,
    "expense": 1890.0,
    "debt": 21000.0,
    "availableCash": 1478077.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "30 Nov 2025"
  },
  {
    "date": "29/11/2025",
    "amountReceived": 64900.0,
    "expense": 70.0,
    "debt": 12900.0,
    "availableCash": 1500967.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "29 Nov 2025"
  },
  {
    "date": "28/11/2025",
    "amountReceived": 59900.0,
    "expense": 40.0,
    "debt": 45500.0,
    "availableCash": 1449037.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "28 Nov 2025"
  },
  {
    "date": "27/11/2025",
    "amountReceived": 88600.0,
    "expense": 1180.0,
    "debt": 45300.0,
    "availableCash": 1434677.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "27 Nov 2025"
  },
  {
    "date": "26/11/2025",
    "amountReceived": 106000.0,
    "expense": 11130.0,
    "debt": 102600.0,
    "availableCash": 1392557.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "26 Nov 2025"
  },
  {
    "date": "25/11/2025",
    "amountReceived": 0.0,
    "expense": 37.0,
    "debt": 44900.0,
    "availableCash": 1400287.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "25 Nov 2025"
  },
  {
    "date": "24/11/2025",
    "amountReceived": 143700.0,
    "expense": 0.0,
    "debt": 47000.0,
    "availableCash": 742532.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "24 Nov 2025"
  },
  {
    "date": "23/11/2025",
    "amountReceived": 267100.0,
    "expense": 990.0,
    "debt": 13600.0,
    "availableCash": 645832.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "23 Nov 2025"
  },
  {
    "date": "22/11/2025",
    "amountReceived": 69400.0,
    "expense": 510.0,
    "debt": 67400.0,
    "availableCash": 393322.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "22 Nov 2025"
  },
  {
    "date": "21/11/2025",
    "amountReceived": 139700.0,
    "expense": 152880.0,
    "debt": 6500.0,
    "availableCash": 391832.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "21 Nov 2025"
  },
  {
    "date": "20/11/2025",
    "amountReceived": 82800.0,
    "expense": 4820.0,
    "debt": 15600.0,
    "availableCash": 411512.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "20 Nov 2025"
  },
  {
    "date": "19/11/2025",
    "amountReceived": 291400.0,
    "expense": 55.0,
    "debt": 39600.0,
    "availableCash": 349132.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "19 Nov 2025"
  },
  {
    "date": "18/11/2025",
    "amountReceived": 7500.0,
    "expense": 30.0,
    "debt": 23800.0,
    "availableCash": 97387.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "18 Nov 2025"
  },
  {
    "date": "17/11/2025",
    "amountReceived": 2171850.0,
    "expense": 21340.0,
    "debt": 20500.0,
    "availableCash": 944417.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "17 Nov 2025"
  },
  {
    "date": "16/11/2025",
    "amountReceived": 107600.0,
    "expense": 21070.0,
    "debt": 69500.0,
    "availableCash": 794407.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "16 Nov 2025"
  },
  {
    "date": "15/11/2025",
    "amountReceived": 0.0,
    "expense": 240.0,
    "debt": 35800.0,
    "availableCash": 57377.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "15 Nov 2025"
  },
  {
    "date": "14/11/2025",
    "amountReceived": 54600.0,
    "expense": 21410.0,
    "debt": 103500.0,
    "availableCash": 684717.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "14 Nov 2025"
  },
  {
    "date": "13/11/2025",
    "amountReceived": 83400.0,
    "expense": 2141315.0,
    "debt": 311535.0,
    "availableCash": 35027.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "13 Nov 2025"
  },
  {
    "date": "12/11/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1373102.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "12 Nov 2025"
  },
  {
    "date": "11/11/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1373102.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "11 Nov 2025"
  },
  {
    "date": "10/11/2025",
    "amountReceived": 6700.0,
    "expense": 540.0,
    "debt": 66200.0,
    "availableCash": 1373102.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "10 Nov 2025"
  },
  {
    "date": "09/11/2025",
    "amountReceived": 39400.0,
    "expense": 1140.0,
    "debt": 11600.0,
    "availableCash": 1433142.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "09 Nov 2025"
  },
  {
    "date": "08/11/2025",
    "amountReceived": 63000.0,
    "expense": 25295.0,
    "debt": 27500.0,
    "availableCash": 1406482.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "08 Nov 2025"
  },
  {
    "date": "07/11/2025",
    "amountReceived": 115100.0,
    "expense": 0.0,
    "debt": 45000.0,
    "availableCash": 1396277.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "07 Nov 2025"
  },
  {
    "date": "06/11/2025",
    "amountReceived": 122300.0,
    "expense": 470.0,
    "debt": 66000.0,
    "availableCash": 1326177.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "06 Nov 2025"
  },
  {
    "date": "05/11/2025",
    "amountReceived": 287500.0,
    "expense": 58480.0,
    "debt": 34000.0,
    "availableCash": 1270347.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "05 Nov 2025"
  },
  {
    "date": "04/11/2025",
    "amountReceived": 79700.0,
    "expense": 20.0,
    "debt": 25400.0,
    "availableCash": 1075327.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "04 Nov 2025"
  },
  {
    "date": "03/11/2025",
    "amountReceived": 797000.0,
    "expense": 492390.0,
    "debt": 48600.0,
    "availableCash": 1021047.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "03 Nov 2025"
  },
  {
    "date": "02/11/2025",
    "amountReceived": 130000.0,
    "expense": 4760.0,
    "debt": 52700.0,
    "availableCash": 765037.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "02 Nov 2025"
  },
  {
    "date": "01/11/2025",
    "amountReceived": 9100.0,
    "expense": 30.0,
    "debt": 5500.0,
    "availableCash": 692497.0,
    "fy": "2025-2026",
    "monthKey": "2025-11",
    "displayDate": "01 Nov 2025"
  },
  {
    "date": "31/10/2025",
    "amountReceived": 79300.0,
    "expense": 0.0,
    "debt": 7300.0,
    "availableCash": 688927.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "31 Oct 2025"
  },
  {
    "date": "30/10/2025",
    "amountReceived": 59400.0,
    "expense": 21420.0,
    "debt": 11100.0,
    "availableCash": 2632927.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "30 Oct 2025"
  },
  {
    "date": "29/10/2025",
    "amountReceived": 103900.0,
    "expense": 155375.0,
    "debt": 145200.0,
    "availableCash": 2586047.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "29 Oct 2025"
  },
  {
    "date": "28/10/2025",
    "amountReceived": 53800.0,
    "expense": 875.0,
    "debt": 236500.0,
    "availableCash": 582722.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "28 Oct 2025"
  },
  {
    "date": "27/10/2025",
    "amountReceived": 2800.0,
    "expense": 6011.0,
    "debt": 5500.0,
    "availableCash": 766297.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "27 Oct 2025"
  },
  {
    "date": "26/10/2025",
    "amountReceived": 8600.0,
    "expense": 30.0,
    "debt": 221100.0,
    "availableCash": 1075597.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "26 Oct 2025"
  },
  {
    "date": "25/10/2025",
    "amountReceived": 53300.0,
    "expense": 4680.0,
    "debt": 35800.0,
    "availableCash": 1288127.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "25 Oct 2025"
  },
  {
    "date": "24/10/2025",
    "amountReceived": 172900.0,
    "expense": 0.0,
    "debt": 3400.0,
    "availableCash": 1277407.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "24 Oct 2025"
  },
  {
    "date": "23/10/2025",
    "amountReceived": 0.0,
    "expense": 2150.0,
    "debt": 5900.0,
    "availableCash": 1107907.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "23 Oct 2025"
  },
  {
    "date": "22/10/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1115957.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "22 Oct 2025"
  },
  {
    "date": "21/10/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1115957.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "21 Oct 2025"
  },
  {
    "date": "20/10/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1115957.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "20 Oct 2025"
  },
  {
    "date": "19/10/2025",
    "amountReceived": 19900.0,
    "expense": 573350.0,
    "debt": 106500.0,
    "availableCash": 1115957.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "19 Oct 2025"
  },
  {
    "date": "18/10/2025",
    "amountReceived": 2900.0,
    "expense": 33220.0,
    "debt": 0.0,
    "availableCash": 1775907.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "18 Oct 2025"
  },
  {
    "date": "17/10/2025",
    "amountReceived": 46500.0,
    "expense": 1890.0,
    "debt": 42500.0,
    "availableCash": 1806227.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "17 Oct 2025"
  },
  {
    "date": "16/10/2025",
    "amountReceived": 296200.0,
    "expense": 1270.0,
    "debt": 94500.0,
    "availableCash": 1804117.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "16 Oct 2025"
  },
  {
    "date": "15/10/2025",
    "amountReceived": 129200.0,
    "expense": 66730.0,
    "debt": 34500.0,
    "availableCash": 21783687.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "15 Oct 2025"
  },
  {
    "date": "14/10/2025",
    "amountReceived": 240000.0,
    "expense": 21405.0,
    "debt": 143700.0,
    "availableCash": 21755717.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "14 Oct 2025"
  },
  {
    "date": "13/10/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 21680822.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "13 Oct 2025"
  },
  {
    "date": "12/10/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 21829632.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "12 Oct 2025"
  },
  {
    "date": "11/10/2025",
    "amountReceived": 159400.0,
    "expense": 1220.0,
    "debt": 19300.0,
    "availableCash": 21829632.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "11 Oct 2025"
  },
  {
    "date": "10/10/2025",
    "amountReceived": 216100.0,
    "expense": 50.0,
    "debt": 86600.0,
    "availableCash": 21690752.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "10 Oct 2025"
  },
  {
    "date": "09/10/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 89500.0,
    "availableCash": 21561302.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "09 Oct 2025"
  },
  {
    "date": "08/10/2025",
    "amountReceived": 203200.0,
    "expense": 0.0,
    "debt": 107200.0,
    "availableCash": 21650802.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "08 Oct 2025"
  },
  {
    "date": "07/10/2025",
    "amountReceived": 35900.0,
    "expense": 0.0,
    "debt": 138200.0,
    "availableCash": 1927597.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "07 Oct 2025"
  },
  {
    "date": "06/10/2025",
    "amountReceived": 76300.0,
    "expense": 5448.0,
    "debt": 14500.0,
    "availableCash": 2029897.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "06 Oct 2025"
  },
  {
    "date": "05/10/2025",
    "amountReceived": 313700.0,
    "expense": 80.0,
    "debt": 65100.0,
    "availableCash": 1973545.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "05 Oct 2025"
  },
  {
    "date": "04/10/2025",
    "amountReceived": 278600.0,
    "expense": 1610.0,
    "debt": 93700.0,
    "availableCash": 1725025.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "04 Oct 2025"
  },
  {
    "date": "03/10/2025",
    "amountReceived": 119800.0,
    "expense": 220950.0,
    "debt": 0.0,
    "availableCash": 1541735.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "03 Oct 2025"
  },
  {
    "date": "02/10/2025",
    "amountReceived": 254000.0,
    "expense": 3140.0,
    "debt": 282100.0,
    "availableCash": 1642885.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "02 Oct 2025"
  },
  {
    "date": "01/10/2025",
    "amountReceived": 80200.0,
    "expense": 2060.0,
    "debt": 20500.0,
    "availableCash": 1674125.0,
    "fy": "2025-2026",
    "monthKey": "2025-10",
    "displayDate": "01 Oct 2025"
  },
  {
    "date": "30/09/2025",
    "amountReceived": 126500.0,
    "expense": 1260.0,
    "debt": 31200.0,
    "availableCash": 1616485.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "30 Sep 2025"
  },
  {
    "date": "29/09/2025",
    "amountReceived": 54100.0,
    "expense": 1830.0,
    "debt": 25000.0,
    "availableCash": 1522445.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "29 Sep 2025"
  },
  {
    "date": "28/09/2025",
    "amountReceived": 121600.0,
    "expense": 23480.0,
    "debt": 22000.0,
    "availableCash": 1495175.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "28 Sep 2025"
  },
  {
    "date": "27/09/2025",
    "amountReceived": 92400.0,
    "expense": 21280.0,
    "debt": 28500.0,
    "availableCash": 1419055.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "27 Sep 2025"
  },
  {
    "date": "26/09/2025",
    "amountReceived": 57300.0,
    "expense": 13379.0,
    "debt": 101800.0,
    "availableCash": 1365435.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "26 Sep 2025"
  },
  {
    "date": "25/09/2025",
    "amountReceived": 38600.0,
    "expense": 12255.0,
    "debt": 1000.0,
    "availableCash": 1423314.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "25 Sep 2025"
  },
  {
    "date": "24/09/2025",
    "amountReceived": 72800.0,
    "expense": 1220.0,
    "debt": 83800.0,
    "availableCash": 1397969.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "24 Sep 2025"
  },
  {
    "date": "23/09/2025",
    "amountReceived": 86800.0,
    "expense": 570.0,
    "debt": 70500.0,
    "availableCash": 1108989.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "23 Sep 2025"
  },
  {
    "date": "22/09/2025",
    "amountReceived": 185600.0,
    "expense": 1170.0,
    "debt": 44700.0,
    "availableCash": 1093259.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "22 Sep 2025"
  },
  {
    "date": "21/09/2025",
    "amountReceived": 9400.0,
    "expense": 60.0,
    "debt": 15000.0,
    "availableCash": 953529.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "21 Sep 2025"
  },
  {
    "date": "20/09/2025",
    "amountReceived": 4500.0,
    "expense": 22365.0,
    "debt": 28400.0,
    "availableCash": 959189.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "20 Sep 2025"
  },
  {
    "date": "19/09/2025",
    "amountReceived": 117300.0,
    "expense": 2756.0,
    "debt": 55150.0,
    "availableCash": 1005454.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "19 Sep 2025"
  },
  {
    "date": "18/09/2025",
    "amountReceived": 130235.0,
    "expense": 610.0,
    "debt": 33600.0,
    "availableCash": 946060.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "18 Sep 2025"
  },
  {
    "date": "17/09/2025",
    "amountReceived": 273900.0,
    "expense": 8312.0,
    "debt": 18500.0,
    "availableCash": 850035.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "17 Sep 2025"
  },
  {
    "date": "16/09/2025",
    "amountReceived": 0.0,
    "expense": 746.0,
    "debt": 29500.0,
    "availableCash": 802947.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "16 Sep 2025"
  },
  {
    "date": "15/09/2025",
    "amountReceived": 56800.0,
    "expense": 285715.0,
    "debt": 480235.0,
    "availableCash": 1208856.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "15 Sep 2025"
  },
  {
    "date": "14/09/2025",
    "amountReceived": 102100.0,
    "expense": 201490.0,
    "debt": 48500.0,
    "availableCash": 1918006.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "14 Sep 2025"
  },
  {
    "date": "13/09/2025",
    "amountReceived": 84900.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 2065896.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "13 Sep 2025"
  },
  {
    "date": "12/09/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1980996.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "12 Sep 2025"
  },
  {
    "date": "11/09/2025",
    "amountReceived": 91600.0,
    "expense": 1390.0,
    "debt": 18500.0,
    "availableCash": 1980996.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "11 Sep 2025"
  },
  {
    "date": "10/09/2025",
    "amountReceived": 88400.0,
    "expense": 57.0,
    "debt": 61300.0,
    "availableCash": 1909286.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "10 Sep 2025"
  },
  {
    "date": "09/09/2025",
    "amountReceived": 45200.0,
    "expense": 0.0,
    "debt": 109000.0,
    "availableCash": 1882243.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "09 Sep 2025"
  },
  {
    "date": "08/09/2025",
    "amountReceived": 96800.0,
    "expense": 260.0,
    "debt": 81300.0,
    "availableCash": 1946043.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "08 Sep 2025"
  },
  {
    "date": "07/09/2025",
    "amountReceived": 56000.0,
    "expense": 430.0,
    "debt": 22300.0,
    "availableCash": 1930803.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "07 Sep 2025"
  },
  {
    "date": "06/09/2025",
    "amountReceived": 87800.0,
    "expense": 2.0,
    "debt": 27000.0,
    "availableCash": 1131420.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "06 Sep 2025"
  },
  {
    "date": "05/09/2025",
    "amountReceived": 101800.0,
    "expense": 0.0,
    "debt": 50500.0,
    "availableCash": 1070622.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "05 Sep 2025"
  },
  {
    "date": "04/09/2025",
    "amountReceived": 2100.0,
    "expense": 286380.0,
    "debt": 55300.0,
    "availableCash": 1019322.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "04 Sep 2025"
  },
  {
    "date": "03/09/2025",
    "amountReceived": 42400.0,
    "expense": 852.0,
    "debt": 30600.0,
    "availableCash": 1358902.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "03 Sep 2025"
  },
  {
    "date": "02/09/2025",
    "amountReceived": 228300.0,
    "expense": 27650.0,
    "debt": 26500.0,
    "availableCash": 1347954.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "02 Sep 2025"
  },
  {
    "date": "01/09/2025",
    "amountReceived": 49600.0,
    "expense": 325.0,
    "debt": 79900.0,
    "availableCash": 1173804.0,
    "fy": "2025-2026",
    "monthKey": "2025-09",
    "displayDate": "01 Sep 2025"
  },
  {
    "date": "31/08/2025",
    "amountReceived": 65000.0,
    "expense": 0.0,
    "debt": 80500.0,
    "availableCash": 1204429.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "31 Aug 2025"
  },
  {
    "date": "30/08/2025",
    "amountReceived": 269300.0,
    "expense": 245690.0,
    "debt": 27400.0,
    "availableCash": 1219929.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "30 Aug 2025"
  },
  {
    "date": "29/08/2025",
    "amountReceived": 7500.0,
    "expense": 1682.0,
    "debt": 223500.0,
    "availableCash": 1223719.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "29 Aug 2025"
  },
  {
    "date": "28/08/2025",
    "amountReceived": 0.0,
    "expense": 2260.0,
    "debt": 217300.0,
    "availableCash": 1441401.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "28 Aug 2025"
  },
  {
    "date": "27/08/2025",
    "amountReceived": 0.0,
    "expense": 1840.0,
    "debt": 147100.0,
    "availableCash": 1660961.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "27 Aug 2025"
  },
  {
    "date": "26/08/2025",
    "amountReceived": 117900.0,
    "expense": 1440.0,
    "debt": 97400.0,
    "availableCash": 1809901.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "26 Aug 2025"
  },
  {
    "date": "25/08/2025",
    "amountReceived": 57100.0,
    "expense": 1260.0,
    "debt": 47300.0,
    "availableCash": 1987076.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "25 Aug 2025"
  },
  {
    "date": "24/08/2025",
    "amountReceived": 4600.0,
    "expense": 65.0,
    "debt": 24300.0,
    "availableCash": 1978536.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "24 Aug 2025"
  },
  {
    "date": "23/08/2025",
    "amountReceived": 86150.0,
    "expense": 0.0,
    "debt": 200.0,
    "availableCash": 1998301.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "23 Aug 2025"
  },
  {
    "date": "22/08/2025",
    "amountReceived": 31800.0,
    "expense": 221280.0,
    "debt": 24000.0,
    "availableCash": 1912351.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "22 Aug 2025"
  },
  {
    "date": "21/08/2025",
    "amountReceived": 81800.0,
    "expense": 2950.0,
    "debt": 0.0,
    "availableCash": 2125831.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "21 Aug 2025"
  },
  {
    "date": "20/08/2025",
    "amountReceived": -9700.0,
    "expense": 460.0,
    "debt": 122000.0,
    "availableCash": 2046981.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "20 Aug 2025"
  },
  {
    "date": "19/08/2025",
    "amountReceived": 0.0,
    "expense": 1255.0,
    "debt": 2000.0,
    "availableCash": 2179141.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "19 Aug 2025"
  },
  {
    "date": "18/08/2025",
    "amountReceived": 59700.0,
    "expense": 1215.0,
    "debt": 51000.0,
    "availableCash": 2182396.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "18 Aug 2025"
  },
  {
    "date": "17/08/2025",
    "amountReceived": 48500.0,
    "expense": 2590.0,
    "debt": 81550.0,
    "availableCash": 2174911.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "17 Aug 2025"
  },
  {
    "date": "16/08/2025",
    "amountReceived": 4300.0,
    "expense": 340.0,
    "debt": 57110.0,
    "availableCash": 1506481.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "16 Aug 2025"
  },
  {
    "date": "15/08/2025",
    "amountReceived": 134800.0,
    "expense": 154920.0,
    "debt": 31300.0,
    "availableCash": 1559631.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "15 Aug 2025"
  },
  {
    "date": "14/08/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1611051.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "14 Aug 2025"
  },
  {
    "date": "13/08/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1611051.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "13 Aug 2025"
  },
  {
    "date": "12/08/2025",
    "amountReceived": 60800.0,
    "expense": 830.0,
    "debt": 57300.0,
    "availableCash": 1611051.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "12 Aug 2025"
  },
  {
    "date": "11/08/2025",
    "amountReceived": 63600.0,
    "expense": 389550.0,
    "debt": 143000.0,
    "availableCash": 21658831.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "11 Aug 2025"
  },
  {
    "date": "10/08/2025",
    "amountReceived": 700.0,
    "expense": 0.0,
    "debt": 14500.0,
    "availableCash": 22127781.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "10 Aug 2025"
  },
  {
    "date": "09/08/2025",
    "amountReceived": 222500.0,
    "expense": 50.0,
    "debt": 2000.0,
    "availableCash": 22141581.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "09 Aug 2025"
  },
  {
    "date": "08/08/2025",
    "amountReceived": 57300.0,
    "expense": 157420.0,
    "debt": 107500.0,
    "availableCash": 21921131.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "08 Aug 2025"
  },
  {
    "date": "07/08/2025",
    "amountReceived": 2141600.0,
    "expense": 17.0,
    "debt": 41500.0,
    "availableCash": 22128751.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "07 Aug 2025"
  },
  {
    "date": "06/08/2025",
    "amountReceived": 94900.0,
    "expense": 21220.0,
    "debt": 164000.0,
    "availableCash": 2071451.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "06 Aug 2025"
  },
  {
    "date": "05/08/2025",
    "amountReceived": 162200.0,
    "expense": 98440.0,
    "debt": 23800.0,
    "availableCash": 2161771.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "05 Aug 2025"
  },
  {
    "date": "04/08/2025",
    "amountReceived": 162800.0,
    "expense": 380.0,
    "debt": 74000.0,
    "availableCash": 2121811.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "04 Aug 2025"
  },
  {
    "date": "03/08/2025",
    "amountReceived": 232700.0,
    "expense": 2950.0,
    "debt": 132700.0,
    "availableCash": 2033391.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "03 Aug 2025"
  },
  {
    "date": "02/08/2025",
    "amountReceived": 0.0,
    "expense": 3640.0,
    "debt": 32000.0,
    "availableCash": 1936341.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "02 Aug 2025"
  },
  {
    "date": "01/08/2025",
    "amountReceived": 74200.0,
    "expense": 3920.0,
    "debt": 24500.0,
    "availableCash": 1971981.0,
    "fy": "2025-2026",
    "monthKey": "2025-08",
    "displayDate": "01 Aug 2025"
  },
  {
    "date": "31/07/2025",
    "amountReceived": 140000.0,
    "expense": 1220.0,
    "debt": 36500.0,
    "availableCash": 1926201.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "31 Jul 2025"
  },
  {
    "date": "30/07/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 34500.0,
    "availableCash": 1823921.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "30 Jul 2025"
  },
  {
    "date": "29/07/2025",
    "amountReceived": 273800.0,
    "expense": 2100750.0,
    "debt": 53000.0,
    "availableCash": -217979.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "29 Jul 2025"
  },
  {
    "date": "28/07/2025",
    "amountReceived": 107300.0,
    "expense": 4550.0,
    "debt": 93400.0,
    "availableCash": 1661971.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "28 Jul 2025"
  },
  {
    "date": "27/07/2025",
    "amountReceived": 5100.0,
    "expense": 620.0,
    "debt": 23500.0,
    "availableCash": 1652621.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "27 Jul 2025"
  },
  {
    "date": "26/07/2025",
    "amountReceived": 0.0,
    "expense": 660.0,
    "debt": 40500.0,
    "availableCash": 846372.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "26 Jul 2025"
  },
  {
    "date": "25/07/2025",
    "amountReceived": 0.0,
    "expense": 650.0,
    "debt": 40500.0,
    "availableCash": 887532.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "25 Jul 2025"
  },
  {
    "date": "24/07/2025",
    "amountReceived": 145800.0,
    "expense": 1610.0,
    "debt": 18300.0,
    "availableCash": 928682.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "24 Jul 2025"
  },
  {
    "date": "23/07/2025",
    "amountReceived": 23000.0,
    "expense": 24933.0,
    "debt": 237300.0,
    "availableCash": 802792.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "23 Jul 2025"
  },
  {
    "date": "22/07/2025",
    "amountReceived": -21200.0,
    "expense": 221020.0,
    "debt": 54800.0,
    "availableCash": 1042025.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "22 Jul 2025"
  },
  {
    "date": "21/07/2025",
    "amountReceived": 0.0,
    "expense": 1103.0,
    "debt": 0.0,
    "availableCash": 1339045.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "21 Jul 2025"
  },
  {
    "date": "20/07/2025",
    "amountReceived": 32400.0,
    "expense": 1620.0,
    "debt": 83400.0,
    "availableCash": 1340148.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "20 Jul 2025"
  },
  {
    "date": "19/07/2025",
    "amountReceived": 9000.0,
    "expense": 0.0,
    "debt": 22000.0,
    "availableCash": 1392768.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "19 Jul 2025"
  },
  {
    "date": "18/07/2025",
    "amountReceived": 7500.0,
    "expense": 1156.0,
    "debt": 12500.0,
    "availableCash": 1405768.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "18 Jul 2025"
  },
  {
    "date": "17/07/2025",
    "amountReceived": 505000.0,
    "expense": 0.0,
    "debt": -121500.0,
    "availableCash": 1411924.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "17 Jul 2025"
  },
  {
    "date": "16/07/2025",
    "amountReceived": 0.0,
    "expense": 1190.0,
    "debt": 23500.0,
    "availableCash": 785424.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "16 Jul 2025"
  },
  {
    "date": "15/07/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 810114.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "15 Jul 2025"
  },
  {
    "date": "14/07/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 810114.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "14 Jul 2025"
  },
  {
    "date": "13/07/2025",
    "amountReceived": 163000.0,
    "expense": 3640.0,
    "debt": 351500.0,
    "availableCash": 810114.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "13 Jul 2025"
  },
  {
    "date": "12/07/2025",
    "amountReceived": 0.0,
    "expense": 43.0,
    "debt": 112900.0,
    "availableCash": 1002254.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "12 Jul 2025"
  },
  {
    "date": "11/07/2025",
    "amountReceived": 62500.0,
    "expense": 210.0,
    "debt": 70000.0,
    "availableCash": 1115197.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "11 Jul 2025"
  },
  {
    "date": "10/07/2025",
    "amountReceived": 24500.0,
    "expense": 272490.0,
    "debt": 0.0,
    "availableCash": 1122907.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "10 Jul 2025"
  },
  {
    "date": "09/07/2025",
    "amountReceived": 79800.0,
    "expense": 420920.0,
    "debt": 282000.0,
    "availableCash": 1525897.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "09 Jul 2025"
  },
  {
    "date": "08/07/2025",
    "amountReceived": 64000.0,
    "expense": 238755.0,
    "debt": 41600.0,
    "availableCash": 2149017.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "08 Jul 2025"
  },
  {
    "date": "07/07/2025",
    "amountReceived": 0.0,
    "expense": 2108120.0,
    "debt": 25500.0,
    "availableCash": 16572.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "07 Jul 2025"
  },
  {
    "date": "06/07/2025",
    "amountReceived": 95400.0,
    "expense": 5665.0,
    "debt": 147400.0,
    "availableCash": 2150192.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "06 Jul 2025"
  },
  {
    "date": "05/07/2025",
    "amountReceived": 84500.0,
    "expense": 0.0,
    "debt": 93800.0,
    "availableCash": 2207857.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "05 Jul 2025"
  },
  {
    "date": "04/07/2025",
    "amountReceived": 65600.0,
    "expense": 13340.0,
    "debt": 27500.0,
    "availableCash": 2217157.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "04 Jul 2025"
  },
  {
    "date": "03/07/2025",
    "amountReceived": 217500.0,
    "expense": 480.0,
    "debt": 12000.0,
    "availableCash": 2192397.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "03 Jul 2025"
  },
  {
    "date": "02/07/2025",
    "amountReceived": 86800.0,
    "expense": 21544.0,
    "debt": 6000.0,
    "availableCash": 1967377.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "02 Jul 2025"
  },
  {
    "date": "01/07/2025",
    "amountReceived": 64000.0,
    "expense": 0.0,
    "debt": 84400.0,
    "availableCash": 1908121.0,
    "fy": "2025-2026",
    "monthKey": "2025-07",
    "displayDate": "01 Jul 2025"
  },
  {
    "date": "30/06/2025",
    "amountReceived": 30670.0,
    "expense": 0.0,
    "debt": 114370.0,
    "availableCash": 1761721.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "30 Jun 2025"
  },
  {
    "date": "29/06/2025",
    "amountReceived": 60900.0,
    "expense": 250880.0,
    "debt": 40500.0,
    "availableCash": 1845421.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "29 Jun 2025"
  },
  {
    "date": "28/06/2025",
    "amountReceived": 58200.0,
    "expense": 2420.0,
    "debt": 226000.0,
    "availableCash": 2075901.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "28 Jun 2025"
  },
  {
    "date": "27/06/2025",
    "amountReceived": 0.0,
    "expense": 1260.0,
    "debt": 23100.0,
    "availableCash": 2246121.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "27 Jun 2025"
  },
  {
    "date": "26/06/2025",
    "amountReceived": 61000.0,
    "expense": 1080.0,
    "debt": 3500.0,
    "availableCash": 2368781.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "26 Jun 2025"
  },
  {
    "date": "25/06/2025",
    "amountReceived": 105500.0,
    "expense": 330.0,
    "debt": 14500.0,
    "availableCash": 2312361.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "25 Jun 2025"
  },
  {
    "date": "24/06/2025",
    "amountReceived": 137300.0,
    "expense": 0.0,
    "debt": 22700.0,
    "availableCash": 2221691.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "24 Jun 2025"
  },
  {
    "date": "23/06/2025",
    "amountReceived": 257353.0,
    "expense": 15.0,
    "debt": 47500.0,
    "availableCash": 1988202.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "23 Jun 2025"
  },
  {
    "date": "22/06/2025",
    "amountReceived": 2151500.0,
    "expense": 10.0,
    "debt": 72000.0,
    "availableCash": 1778364.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "22 Jun 2025"
  },
  {
    "date": "21/06/2025",
    "amountReceived": 56000.0,
    "expense": 19110.0,
    "debt": 12000.0,
    "availableCash": -301126.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "21 Jun 2025"
  },
  {
    "date": "20/06/2025",
    "amountReceived": 36500.0,
    "expense": 0.0,
    "debt": 5500.0,
    "availableCash": -326016.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "20 Jun 2025"
  },
  {
    "date": "19/06/2025",
    "amountReceived": 6000.0,
    "expense": 21310.0,
    "debt": 293200.0,
    "availableCash": -357016.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "19 Jun 2025"
  },
  {
    "date": "18/06/2025",
    "amountReceived": 0.0,
    "expense": 5530.0,
    "debt": 73200.0,
    "availableCash": -48506.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "18 Jun 2025"
  },
  {
    "date": "17/06/2025",
    "amountReceived": 128000.0,
    "expense": 405.0,
    "debt": 7000.0,
    "availableCash": 30224.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "17 Jun 2025"
  },
  {
    "date": "16/06/2025",
    "amountReceived": 211000.0,
    "expense": 23355.0,
    "debt": 17500.0,
    "availableCash": -90371.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "16 Jun 2025"
  },
  {
    "date": "15/06/2025",
    "amountReceived": 89000.0,
    "expense": 540.0,
    "debt": 14500.0,
    "availableCash": -260516.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "15 Jun 2025"
  },
  {
    "date": "14/06/2025",
    "amountReceived": -106600.0,
    "expense": 2147525.0,
    "debt": -141000.0,
    "availableCash": -334476.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "14 Jun 2025"
  },
  {
    "date": "13/06/2025",
    "amountReceived": 164170.0,
    "expense": 2709.0,
    "debt": 130240.0,
    "availableCash": 1778649.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "13 Jun 2025"
  },
  {
    "date": "12/06/2025",
    "amountReceived": 65000.0,
    "expense": 212640.0,
    "debt": 38500.0,
    "availableCash": 1747428.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "12 Jun 2025"
  },
  {
    "date": "11/06/2025",
    "amountReceived": 278200.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1933568.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "11 Jun 2025"
  },
  {
    "date": "10/06/2025",
    "amountReceived": 33400.0,
    "expense": 0.0,
    "debt": 262500.0,
    "availableCash": 1655368.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "10 Jun 2025"
  },
  {
    "date": "09/06/2025",
    "amountReceived": 63800.0,
    "expense": 897.0,
    "debt": 63400.0,
    "availableCash": 1884468.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "09 Jun 2025"
  },
  {
    "date": "08/06/2025",
    "amountReceived": 140000.0,
    "expense": 236238.0,
    "debt": -48700.0,
    "availableCash": 1886965.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "08 Jun 2025"
  },
  {
    "date": "07/06/2025",
    "amountReceived": 20800.0,
    "expense": 1435.0,
    "debt": 5500.0,
    "availableCash": 1934503.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "07 Jun 2025"
  },
  {
    "date": "06/06/2025",
    "amountReceived": 3600.0,
    "expense": 1040.0,
    "debt": 69800.0,
    "availableCash": 1920638.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "06 Jun 2025"
  },
  {
    "date": "05/06/2025",
    "amountReceived": 199200.0,
    "expense": 690.0,
    "debt": -95000.0,
    "availableCash": -748122.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "05 Jun 2025"
  },
  {
    "date": "04/06/2025",
    "amountReceived": 0.0,
    "expense": 217630.0,
    "debt": 2121500.0,
    "availableCash": -1041632.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "04 Jun 2025"
  },
  {
    "date": "03/06/2025",
    "amountReceived": 0.0,
    "expense": 69780.0,
    "debt": 228100.0,
    "availableCash": 1297498.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "03 Jun 2025"
  },
  {
    "date": "02/06/2025",
    "amountReceived": 4500.0,
    "expense": 18725.0,
    "debt": 54200.0,
    "availableCash": 1595378.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "02 Jun 2025"
  },
  {
    "date": "01/06/2025",
    "amountReceived": 76300.0,
    "expense": 2755.0,
    "debt": 2000.0,
    "availableCash": 1663803.0,
    "fy": "2025-2026",
    "monthKey": "2025-06",
    "displayDate": "01 Jun 2025"
  },
  {
    "date": "31/05/2025",
    "amountReceived": 69500.0,
    "expense": 21990.0,
    "debt": 32000.0,
    "availableCash": 1592258.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "31 May 2025"
  },
  {
    "date": "30/05/2025",
    "amountReceived": 8000.0,
    "expense": 311390.0,
    "debt": 45000.0,
    "availableCash": 1576748.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "30 May 2025"
  },
  {
    "date": "29/05/2025",
    "amountReceived": 144800.0,
    "expense": 30905.0,
    "debt": 102500.0,
    "availableCash": 1925138.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "29 May 2025"
  },
  {
    "date": "28/05/2025",
    "amountReceived": 40500.0,
    "expense": 52348.0,
    "debt": 13300.0,
    "availableCash": 1913743.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "28 May 2025"
  },
  {
    "date": "27/05/2025",
    "amountReceived": 255500.0,
    "expense": 40380.0,
    "debt": 15000.0,
    "availableCash": 1938891.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "27 May 2025"
  },
  {
    "date": "26/05/2025",
    "amountReceived": 567600.0,
    "expense": 0.0,
    "debt": 66000.0,
    "availableCash": 1539541.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "26 May 2025"
  },
  {
    "date": "25/05/2025",
    "amountReceived": 102800.0,
    "expense": 870.0,
    "debt": 52000.0,
    "availableCash": 1037941.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "25 May 2025"
  },
  {
    "date": "24/05/2025",
    "amountReceived": 98300.0,
    "expense": 211520.0,
    "debt": 19500.0,
    "availableCash": 988011.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "24 May 2025"
  },
  {
    "date": "23/05/2025",
    "amountReceived": 52800.0,
    "expense": 211865.0,
    "debt": 5500.0,
    "availableCash": 1120731.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "23 May 2025"
  },
  {
    "date": "22/05/2025",
    "amountReceived": 0.0,
    "expense": 163915.0,
    "debt": 54000.0,
    "availableCash": 1285296.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "22 May 2025"
  },
  {
    "date": "21/05/2025",
    "amountReceived": 51300.0,
    "expense": 10.0,
    "debt": 53400.0,
    "availableCash": 1289211.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "21 May 2025"
  },
  {
    "date": "20/05/2025",
    "amountReceived": 97100.0,
    "expense": 9670.0,
    "debt": 4300.0,
    "availableCash": 1292221.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "20 May 2025"
  },
  {
    "date": "19/05/2025",
    "amountReceived": 0.0,
    "expense": 1.0,
    "debt": 77300.0,
    "availableCash": 1459091.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "19 May 2025"
  },
  {
    "date": "18/05/2025",
    "amountReceived": 67200.0,
    "expense": 16650.0,
    "debt": 1500.0,
    "availableCash": 309691.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "18 May 2025"
  },
  {
    "date": "17/05/2025",
    "amountReceived": 255500.0,
    "expense": 60.0,
    "debt": 14500.0,
    "availableCash": 260641.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "17 May 2025"
  },
  {
    "date": "16/05/2025",
    "amountReceived": 0.0,
    "expense": 1780.0,
    "debt": 18500.0,
    "availableCash": 19701.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "16 May 2025"
  },
  {
    "date": "15/05/2025",
    "amountReceived": 59300.0,
    "expense": 201180.0,
    "debt": 129100.0,
    "availableCash": 1526014.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "15 May 2025"
  },
  {
    "date": "14/05/2025",
    "amountReceived": 43100.0,
    "expense": 24410.0,
    "debt": 22800.0,
    "availableCash": 1796994.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "14 May 2025"
  },
  {
    "date": "13/05/2025",
    "amountReceived": 48300.0,
    "expense": 130.0,
    "debt": 13300.0,
    "availableCash": 1801104.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "13 May 2025"
  },
  {
    "date": "12/05/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 1766234.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "12 May 2025"
  },
  {
    "date": "11/05/2025",
    "amountReceived": 248800.0,
    "expense": 2755.0,
    "debt": 18600.0,
    "availableCash": 1766234.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "11 May 2025"
  },
  {
    "date": "10/05/2025",
    "amountReceived": 0.0,
    "expense": 107.0,
    "debt": 52000.0,
    "availableCash": 1538789.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "10 May 2025"
  },
  {
    "date": "09/05/2025",
    "amountReceived": 27000.0,
    "expense": 1935.0,
    "debt": 217300.0,
    "availableCash": 1590896.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "09 May 2025"
  },
  {
    "date": "08/05/2025",
    "amountReceived": 23500.0,
    "expense": 80.0,
    "debt": 22500.0,
    "availableCash": 1783131.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "08 May 2025"
  },
  {
    "date": "07/05/2025",
    "amountReceived": 0.0,
    "expense": 17320.0,
    "debt": 20000.0,
    "availableCash": 1782211.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "07 May 2025"
  },
  {
    "date": "06/05/2025",
    "amountReceived": 23800.0,
    "expense": 5805.0,
    "debt": 800.0,
    "availableCash": 2029931.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "06 May 2025"
  },
  {
    "date": "05/05/2025",
    "amountReceived": 23000.0,
    "expense": 0.0,
    "debt": 114000.0,
    "availableCash": 2012736.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "05 May 2025"
  },
  {
    "date": "04/05/2025",
    "amountReceived": 94100.0,
    "expense": 24910.0,
    "debt": 62700.0,
    "availableCash": 2103736.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "04 May 2025"
  },
  {
    "date": "03/05/2025",
    "amountReceived": 58400.0,
    "expense": 60.0,
    "debt": 30500.0,
    "availableCash": 2097246.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "03 May 2025"
  },
  {
    "date": "02/05/2025",
    "amountReceived": 44800.0,
    "expense": 1320.0,
    "debt": 39300.0,
    "availableCash": 2069406.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "02 May 2025"
  },
  {
    "date": "01/05/2025",
    "amountReceived": 28000.0,
    "expense": 4490.0,
    "debt": 20300.0,
    "availableCash": 5961575.0,
    "fy": "2025-2026",
    "monthKey": "2025-05",
    "displayDate": "01 May 2025"
  },
  {
    "date": "30/04/2025",
    "amountReceived": 34200.0,
    "expense": 15330.0,
    "debt": 31700.0,
    "availableCash": 5958365.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "30 Apr 2025"
  },
  {
    "date": "29/04/2025",
    "amountReceived": 251100.0,
    "expense": 21954.0,
    "debt": 124300.0,
    "availableCash": 5971195.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "29 Apr 2025"
  },
  {
    "date": "28/04/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5866349.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "28 Apr 2025"
  },
  {
    "date": "27/04/2025",
    "amountReceived": 235500.0,
    "expense": 6520.0,
    "debt": 17000.0,
    "availableCash": 5866349.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "27 Apr 2025"
  },
  {
    "date": "26/04/2025",
    "amountReceived": 101400.0,
    "expense": 21960.0,
    "debt": 16500.0,
    "availableCash": 5654369.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "26 Apr 2025"
  },
  {
    "date": "25/04/2025",
    "amountReceived": 53600.0,
    "expense": 2020.0,
    "debt": 2000.0,
    "availableCash": 5591429.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "25 Apr 2025"
  },
  {
    "date": "24/04/2025",
    "amountReceived": 0.0,
    "expense": 78.0,
    "debt": 66000.0,
    "availableCash": 5541849.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "24 Apr 2025"
  },
  {
    "date": "23/04/2025",
    "amountReceived": 0.0,
    "expense": 251590.0,
    "debt": 1400.0,
    "availableCash": 5607927.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "23 Apr 2025"
  },
  {
    "date": "22/04/2025",
    "amountReceived": 122300.0,
    "expense": 241860.0,
    "debt": 35500.0,
    "availableCash": 5860917.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "22 Apr 2025"
  },
  {
    "date": "21/04/2025",
    "amountReceived": 91200.0,
    "expense": 209.0,
    "debt": 19000.0,
    "availableCash": 6015977.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "21 Apr 2025"
  },
  {
    "date": "20/04/2025",
    "amountReceived": 82800.0,
    "expense": 25830.0,
    "debt": 34300.0,
    "availableCash": 5943986.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "20 Apr 2025"
  },
  {
    "date": "19/04/2025",
    "amountReceived": 99800.0,
    "expense": 22170.0,
    "debt": 28100.0,
    "availableCash": 5921316.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "19 Apr 2025"
  },
  {
    "date": "18/04/2025",
    "amountReceived": 176100.0,
    "expense": 2990.0,
    "debt": 116500.0,
    "availableCash": 5871786.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "18 Apr 2025"
  },
  {
    "date": "17/04/2025",
    "amountReceived": 178900.0,
    "expense": 2490.0,
    "debt": 148800.0,
    "availableCash": 5815176.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "17 Apr 2025"
  },
  {
    "date": "16/04/2025",
    "amountReceived": 63500.0,
    "expense": 2930.0,
    "debt": 0.0,
    "availableCash": 5787566.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "16 Apr 2025"
  },
  {
    "date": "15/04/2025",
    "amountReceived": 180800.0,
    "expense": 410.0,
    "debt": 22000.0,
    "availableCash": 5726996.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "15 Apr 2025"
  },
  {
    "date": "14/04/2025",
    "amountReceived": 2143500.0,
    "expense": 40.0,
    "debt": 2144500.0,
    "availableCash": 5568606.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "14 Apr 2025"
  },
  {
    "date": "13/04/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5569646.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "13 Apr 2025"
  },
  {
    "date": "12/04/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5569646.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "12 Apr 2025"
  },
  {
    "date": "11/04/2025",
    "amountReceived": 0.0,
    "expense": 17.0,
    "debt": 1800.0,
    "availableCash": 5569646.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "11 Apr 2025"
  },
  {
    "date": "10/04/2025",
    "amountReceived": 26100.0,
    "expense": 1341.0,
    "debt": 2426035.0,
    "availableCash": 5571463.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "10 Apr 2025"
  },
  {
    "date": "09/04/2025",
    "amountReceived": 111800.0,
    "expense": 25.0,
    "debt": 36900.0,
    "availableCash": 7972739.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "09 Apr 2025"
  },
  {
    "date": "08/04/2025",
    "amountReceived": 468000.0,
    "expense": 6050.0,
    "debt": 128800.0,
    "availableCash": 7897864.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "08 Apr 2025"
  },
  {
    "date": "07/04/2025",
    "amountReceived": 54300.0,
    "expense": 505.0,
    "debt": 800.0,
    "availableCash": 7564714.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "07 Apr 2025"
  },
  {
    "date": "06/04/2025",
    "amountReceived": 105500.0,
    "expense": 290.0,
    "debt": 16000.0,
    "availableCash": 7511719.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "06 Apr 2025"
  },
  {
    "date": "05/04/2025",
    "amountReceived": 9800.0,
    "expense": 745.0,
    "debt": 17500.0,
    "availableCash": 7422509.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "05 Apr 2025"
  },
  {
    "date": "04/04/2025",
    "amountReceived": 63000.0,
    "expense": 460.0,
    "debt": 17500.0,
    "availableCash": 7430954.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "04 Apr 2025"
  },
  {
    "date": "03/04/2025",
    "amountReceived": 32000.0,
    "expense": 10915.0,
    "debt": 15500.0,
    "availableCash": 7385914.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "03 Apr 2025"
  },
  {
    "date": "02/04/2025",
    "amountReceived": 114900.0,
    "expense": 1855.0,
    "debt": 611000.0,
    "availableCash": 7380329.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "02 Apr 2025"
  },
  {
    "date": "01/04/2025",
    "amountReceived": 276700.0,
    "expense": 43330.0,
    "debt": 211000.0,
    "availableCash": 7878284.0,
    "fy": "2025-2026",
    "monthKey": "2025-04",
    "displayDate": "01 Apr 2025"
  },
  {
    "date": "31/03/2025",
    "amountReceived": 0.0,
    "expense": 830.0,
    "debt": 46500.0,
    "availableCash": 7903014.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "31 Mar 2025"
  },
  {
    "date": "30/03/2025",
    "amountReceived": 60400.0,
    "expense": 12623.0,
    "debt": 4000.0,
    "availableCash": 7950344.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "30 Mar 2025"
  },
  {
    "date": "29/03/2025",
    "amountReceived": 40300.0,
    "expense": 1090.0,
    "debt": 1700.0,
    "availableCash": 7906567.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "29 Mar 2025"
  },
  {
    "date": "28/03/2025",
    "amountReceived": 53200.0,
    "expense": 24928.0,
    "debt": 58000.0,
    "availableCash": 7869057.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "28 Mar 2025"
  },
  {
    "date": "27/03/2025",
    "amountReceived": 2249800.0,
    "expense": 2200360.0,
    "debt": 47600.0,
    "availableCash": 7898785.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "27 Mar 2025"
  },
  {
    "date": "26/03/2025",
    "amountReceived": 262500.0,
    "expense": 51170.0,
    "debt": 63600.0,
    "availableCash": 7896945.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "26 Mar 2025"
  },
  {
    "date": "25/03/2025",
    "amountReceived": 153500.0,
    "expense": 24905.0,
    "debt": 128400.0,
    "availableCash": 7749215.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "25 Mar 2025"
  },
  {
    "date": "24/03/2025",
    "amountReceived": 20300.0,
    "expense": 620.0,
    "debt": 9200.0,
    "availableCash": 7749020.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "24 Mar 2025"
  },
  {
    "date": "23/03/2025",
    "amountReceived": 0.0,
    "expense": 1390.0,
    "debt": 219000.0,
    "availableCash": 7794220.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "23 Mar 2025"
  },
  {
    "date": "22/03/2025",
    "amountReceived": 76000.0,
    "expense": 220.0,
    "debt": 500.0,
    "availableCash": 8014610.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "22 Mar 2025"
  },
  {
    "date": "21/03/2025",
    "amountReceived": 13500.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 7939330.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "21 Mar 2025"
  },
  {
    "date": "20/03/2025",
    "amountReceived": 81800.0,
    "expense": 1510.0,
    "debt": 161000.0,
    "availableCash": 7925830.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "20 Mar 2025"
  },
  {
    "date": "19/03/2025",
    "amountReceived": 42500.0,
    "expense": 650.0,
    "debt": 111890.0,
    "availableCash": 8006540.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "19 Mar 2025"
  },
  {
    "date": "18/03/2025",
    "amountReceived": 287800.0,
    "expense": 220.0,
    "debt": 20300.0,
    "availableCash": 8076580.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "18 Mar 2025"
  },
  {
    "date": "17/03/2025",
    "amountReceived": 68300.0,
    "expense": 390.0,
    "debt": 86500.0,
    "availableCash": 7809300.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "17 Mar 2025"
  },
  {
    "date": "16/03/2025",
    "amountReceived": 237400.0,
    "expense": 1095.0,
    "debt": 37200.0,
    "availableCash": 7827890.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "16 Mar 2025"
  },
  {
    "date": "15/03/2025",
    "amountReceived": 0.0,
    "expense": 220.0,
    "debt": 0.0,
    "availableCash": 7628785.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "15 Mar 2025"
  },
  {
    "date": "14/03/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 7629005.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "14 Mar 2025"
  },
  {
    "date": "13/03/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 7629005.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "13 Mar 2025"
  },
  {
    "date": "12/03/2025",
    "amountReceived": 184200.0,
    "expense": 115.0,
    "debt": 234000.0,
    "availableCash": 7629005.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "12 Mar 2025"
  },
  {
    "date": "11/03/2025",
    "amountReceived": 56924.0,
    "expense": 131960.0,
    "debt": 380624.0,
    "availableCash": 7828920.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "11 Mar 2025"
  },
  {
    "date": "10/03/2025",
    "amountReceived": 64800.0,
    "expense": 211770.0,
    "debt": 276000.0,
    "availableCash": 28064580.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "10 Mar 2025"
  },
  {
    "date": "09/03/2025",
    "amountReceived": 59900.0,
    "expense": 21020.0,
    "debt": 21600.0,
    "availableCash": 28487550.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "09 Mar 2025"
  },
  {
    "date": "08/03/2025",
    "amountReceived": -20700.0,
    "expense": 408790.0,
    "debt": 10100.0,
    "availableCash": 28470270.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "08 Mar 2025"
  },
  {
    "date": "07/03/2025",
    "amountReceived": 106000.0,
    "expense": 2990.0,
    "debt": 17500.0,
    "availableCash": -810940.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "07 Mar 2025"
  },
  {
    "date": "06/03/2025",
    "amountReceived": 0.0,
    "expense": 530.0,
    "debt": 17000.0,
    "availableCash": -896450.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "06 Mar 2025"
  },
  {
    "date": "05/03/2025",
    "amountReceived": 39300.0,
    "expense": 0.0,
    "debt": 74300.0,
    "availableCash": -878920.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "05 Mar 2025"
  },
  {
    "date": "04/03/2025",
    "amountReceived": 0.0,
    "expense": 218050.0,
    "debt": -150000.0,
    "availableCash": -843920.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "04 Mar 2025"
  },
  {
    "date": "03/03/2025",
    "amountReceived": 69100.0,
    "expense": 151880.0,
    "debt": 4000.0,
    "availableCash": -775870.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "03 Mar 2025"
  },
  {
    "date": "02/03/2025",
    "amountReceived": 285100.0,
    "expense": 0.0,
    "debt": 60400.0,
    "availableCash": -689090.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "02 Mar 2025"
  },
  {
    "date": "01/03/2025",
    "amountReceived": 3500.0,
    "expense": 540.0,
    "debt": 117500.0,
    "availableCash": -913790.0,
    "fy": "2024-2025",
    "monthKey": "2025-03",
    "displayDate": "01 Mar 2025"
  },
  {
    "date": "28/02/2025",
    "amountReceived": 443700.0,
    "expense": 6830.0,
    "debt": 39000.0,
    "availableCash": -799250.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "28 Feb 2025"
  },
  {
    "date": "27/02/2025",
    "amountReceived": 435200.0,
    "expense": 2270240.0,
    "debt": 1000.0,
    "availableCash": -1197120.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "27 Feb 2025"
  },
  {
    "date": "26/02/2025",
    "amountReceived": 358600.0,
    "expense": 129935.0,
    "debt": 413600.0,
    "availableCash": 638920.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "26 Feb 2025"
  },
  {
    "date": "25/02/2025",
    "amountReceived": 133600.0,
    "expense": 1.0,
    "debt": 226500.0,
    "availableCash": 823855.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "25 Feb 2025"
  },
  {
    "date": "24/02/2025",
    "amountReceived": 78200.0,
    "expense": 2980.0,
    "debt": 165300.0,
    "availableCash": 7840605.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "24 Feb 2025"
  },
  {
    "date": "23/02/2025",
    "amountReceived": 0.0,
    "expense": 8520.0,
    "debt": 45500.0,
    "availableCash": 7930685.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "23 Feb 2025"
  },
  {
    "date": "22/02/2025",
    "amountReceived": 132500.0,
    "expense": 2590.0,
    "debt": 76800.0,
    "availableCash": 7984705.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "22 Feb 2025"
  },
  {
    "date": "21/02/2025",
    "amountReceived": 81600.0,
    "expense": 21030.0,
    "debt": 67500.0,
    "availableCash": 7931595.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "21 Feb 2025"
  },
  {
    "date": "20/02/2025",
    "amountReceived": 54800.0,
    "expense": 640.0,
    "debt": 62800.0,
    "availableCash": 7938525.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "20 Feb 2025"
  },
  {
    "date": "19/02/2025",
    "amountReceived": 716.0,
    "expense": 630.0,
    "debt": 90300.0,
    "availableCash": 7947165.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "19 Feb 2025"
  },
  {
    "date": "18/02/2025",
    "amountReceived": 124050.0,
    "expense": 28380.0,
    "debt": 127600.0,
    "availableCash": 8037379.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "18 Feb 2025"
  },
  {
    "date": "17/02/2025",
    "amountReceived": 172500.0,
    "expense": 1120.0,
    "debt": 392000.0,
    "availableCash": 8069309.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "17 Feb 2025"
  },
  {
    "date": "16/02/2025",
    "amountReceived": 90300.0,
    "expense": 21370.0,
    "debt": 54000.0,
    "availableCash": 8289929.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "16 Feb 2025"
  },
  {
    "date": "15/02/2025",
    "amountReceived": 0.0,
    "expense": 211090.0,
    "debt": 210500.0,
    "availableCash": 8274999.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "15 Feb 2025"
  },
  {
    "date": "14/02/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 223000.0,
    "availableCash": 8550209.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "14 Feb 2025"
  },
  {
    "date": "13/02/2025",
    "amountReceived": 160400.0,
    "expense": 29020.0,
    "debt": 80700.0,
    "availableCash": 8773209.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "13 Feb 2025"
  },
  {
    "date": "12/02/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 8722529.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "12 Feb 2025"
  },
  {
    "date": "11/02/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 8722529.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "11 Feb 2025"
  },
  {
    "date": "10/02/2025",
    "amountReceived": 0.0,
    "expense": 1585.0,
    "debt": 39300.0,
    "availableCash": 28073026.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "10 Feb 2025"
  },
  {
    "date": "09/02/2025",
    "amountReceived": 119500.0,
    "expense": 1270.0,
    "debt": 149000.0,
    "availableCash": 28113911.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "09 Feb 2025"
  },
  {
    "date": "08/02/2025",
    "amountReceived": 123400.0,
    "expense": 60.0,
    "debt": 68200.0,
    "availableCash": 28144681.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "08 Feb 2025"
  },
  {
    "date": "07/02/2025",
    "amountReceived": 256000.0,
    "expense": 0.0,
    "debt": 100.0,
    "availableCash": 28089541.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "07 Feb 2025"
  },
  {
    "date": "06/02/2025",
    "amountReceived": 55500.0,
    "expense": 20190.0,
    "debt": 44200.0,
    "availableCash": 27833641.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "06 Feb 2025"
  },
  {
    "date": "05/02/2025",
    "amountReceived": 42000.0,
    "expense": 0.0,
    "debt": 2134400.0,
    "availableCash": 27842531.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "05 Feb 2025"
  },
  {
    "date": "04/02/2025",
    "amountReceived": 74700.0,
    "expense": 653.0,
    "debt": 34500.0,
    "availableCash": 29934931.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "04 Feb 2025"
  },
  {
    "date": "03/02/2025",
    "amountReceived": 96900.0,
    "expense": 1720.0,
    "debt": 0.0,
    "availableCash": 29895384.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "03 Feb 2025"
  },
  {
    "date": "02/02/2025",
    "amountReceived": 50900.0,
    "expense": 410.0,
    "debt": 47100.0,
    "availableCash": 29800204.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "02 Feb 2025"
  },
  {
    "date": "01/02/2025",
    "amountReceived": 606800.0,
    "expense": 450510.0,
    "debt": 176900.0,
    "availableCash": 29796814.0,
    "fy": "2024-2025",
    "monthKey": "2025-02",
    "displayDate": "01 Feb 2025"
  },
  {
    "date": "31/01/2025",
    "amountReceived": 61500.0,
    "expense": 685.0,
    "debt": 42500.0,
    "availableCash": 29817424.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "31 Jan 2025"
  },
  {
    "date": "30/01/2025",
    "amountReceived": 113400.0,
    "expense": 306169.0,
    "debt": 41500.0,
    "availableCash": 29799109.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "30 Jan 2025"
  },
  {
    "date": "29/01/2025",
    "amountReceived": 134000.0,
    "expense": 1080.0,
    "debt": 16500.0,
    "availableCash": 30033378.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "29 Jan 2025"
  },
  {
    "date": "28/01/2025",
    "amountReceived": 93000.0,
    "expense": 0.0,
    "debt": 113000.0,
    "availableCash": 29916958.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "28 Jan 2025"
  },
  {
    "date": "27/01/2025",
    "amountReceived": 0.0,
    "expense": 269540.0,
    "debt": 119600.0,
    "availableCash": 29936958.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "27 Jan 2025"
  },
  {
    "date": "26/01/2025",
    "amountReceived": 0.0,
    "expense": 490.0,
    "debt": 0.0,
    "availableCash": 30326098.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "26 Jan 2025"
  },
  {
    "date": "25/01/2025",
    "amountReceived": 64500.0,
    "expense": 211660.0,
    "debt": 12000.0,
    "availableCash": 30326588.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "25 Jan 2025"
  },
  {
    "date": "24/01/2025",
    "amountReceived": 88800.0,
    "expense": 26120.0,
    "debt": 2000.0,
    "availableCash": 30485748.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "24 Jan 2025"
  },
  {
    "date": "23/01/2025",
    "amountReceived": 84000.0,
    "expense": 1505.0,
    "debt": 11000.0,
    "availableCash": 30425068.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "23 Jan 2025"
  },
  {
    "date": "22/01/2025",
    "amountReceived": 48300.0,
    "expense": 380.0,
    "debt": 36000.0,
    "availableCash": 30353573.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "22 Jan 2025"
  },
  {
    "date": "21/01/2025",
    "amountReceived": 33300.0,
    "expense": 13730.0,
    "debt": 51000.0,
    "availableCash": 30341653.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "21 Jan 2025"
  },
  {
    "date": "20/01/2025",
    "amountReceived": 110000.0,
    "expense": 0.0,
    "debt": 40500.0,
    "availableCash": 30373083.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "20 Jan 2025"
  },
  {
    "date": "19/01/2025",
    "amountReceived": 57100.0,
    "expense": 40.0,
    "debt": 22000.0,
    "availableCash": 30303583.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "19 Jan 2025"
  },
  {
    "date": "18/01/2025",
    "amountReceived": 256500.0,
    "expense": 1570.0,
    "debt": 5500.0,
    "availableCash": 30268523.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "18 Jan 2025"
  },
  {
    "date": "17/01/2025",
    "amountReceived": 60000.0,
    "expense": 5620.0,
    "debt": 141700.0,
    "availableCash": 30019093.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "17 Jan 2025"
  },
  {
    "date": "16/01/2025",
    "amountReceived": 106900.0,
    "expense": 21380.0,
    "debt": 28500.0,
    "availableCash": 30106413.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "16 Jan 2025"
  },
  {
    "date": "15/01/2025",
    "amountReceived": 2113300.0,
    "expense": 5950.0,
    "debt": 104100.0,
    "availableCash": 30049393.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "15 Jan 2025"
  },
  {
    "date": "14/01/2025",
    "amountReceived": 45000.0,
    "expense": 1570.0,
    "debt": 0.0,
    "availableCash": 28046143.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "14 Jan 2025"
  },
  {
    "date": "13/01/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 28002713.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "13 Jan 2025"
  },
  {
    "date": "12/01/2025",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 28002713.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "12 Jan 2025"
  },
  {
    "date": "11/01/2025",
    "amountReceived": 125700.0,
    "expense": 66330.0,
    "debt": 1000.0,
    "availableCash": 9818328.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "11 Jan 2025"
  },
  {
    "date": "10/01/2025",
    "amountReceived": 0.0,
    "expense": 20.0,
    "debt": 31600.0,
    "availableCash": 9759958.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "10 Jan 2025"
  },
  {
    "date": "09/01/2025",
    "amountReceived": 0.0,
    "expense": 660.0,
    "debt": 0.0,
    "availableCash": 9791578.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "09 Jan 2025"
  },
  {
    "date": "08/01/2025",
    "amountReceived": 292200.0,
    "expense": 2990.0,
    "debt": 455800.0,
    "availableCash": 9792238.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "08 Jan 2025"
  },
  {
    "date": "07/01/2025",
    "amountReceived": 0.0,
    "expense": 560.0,
    "debt": 52000.0,
    "availableCash": 9958828.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "07 Jan 2025"
  },
  {
    "date": "06/01/2025",
    "amountReceived": 585500.0,
    "expense": 860.0,
    "debt": 126600.0,
    "availableCash": 10011388.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "06 Jan 2025"
  },
  {
    "date": "05/01/2025",
    "amountReceived": 72800.0,
    "expense": 22520.0,
    "debt": 0.0,
    "availableCash": 9553348.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "05 Jan 2025"
  },
  {
    "date": "04/01/2025",
    "amountReceived": 4100.0,
    "expense": 39990.0,
    "debt": 0.0,
    "availableCash": 9503068.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "04 Jan 2025"
  },
  {
    "date": "03/01/2025",
    "amountReceived": 0.0,
    "expense": 630.0,
    "debt": 17000.0,
    "availableCash": 9538958.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "03 Jan 2025"
  },
  {
    "date": "02/01/2025",
    "amountReceived": 2427700.0,
    "expense": 30160.0,
    "debt": 67500.0,
    "availableCash": 9556588.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "02 Jan 2025"
  },
  {
    "date": "01/01/2025",
    "amountReceived": 117400.0,
    "expense": 460.0,
    "debt": 329300.0,
    "availableCash": 7226548.0,
    "fy": "2024-2025",
    "monthKey": "2025-01",
    "displayDate": "01 Jan 2025"
  },
  {
    "date": "31/12/2024",
    "amountReceived": 0.0,
    "expense": 21540.0,
    "debt": 39500.0,
    "availableCash": 7438908.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "31 Dec 2024"
  },
  {
    "date": "30/12/2024",
    "amountReceived": 47600.0,
    "expense": 1559.0,
    "debt": 0.0,
    "availableCash": 7499948.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "30 Dec 2024"
  },
  {
    "date": "29/12/2024",
    "amountReceived": 56000.0,
    "expense": 2076.0,
    "debt": 159000.0,
    "availableCash": 630807.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "29 Dec 2024"
  },
  {
    "date": "28/12/2024",
    "amountReceived": 104800.0,
    "expense": 80.0,
    "debt": 127000.0,
    "availableCash": 735883.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "28 Dec 2024"
  },
  {
    "date": "27/12/2024",
    "amountReceived": 25300.0,
    "expense": 30.0,
    "debt": 66000.0,
    "availableCash": 758163.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "27 Dec 2024"
  },
  {
    "date": "26/12/2024",
    "amountReceived": 0.0,
    "expense": 1790.0,
    "debt": 1000.0,
    "availableCash": 25648656.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "26 Dec 2024"
  },
  {
    "date": "25/12/2024",
    "amountReceived": 0.0,
    "expense": 340.0,
    "debt": 2000.0,
    "availableCash": 25651446.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "25 Dec 2024"
  },
  {
    "date": "24/12/2024",
    "amountReceived": 287300.0,
    "expense": 120.0,
    "debt": 10500.0,
    "availableCash": 25653786.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "24 Dec 2024"
  },
  {
    "date": "23/12/2024",
    "amountReceived": 149300.0,
    "expense": 37.0,
    "debt": 16300.0,
    "availableCash": 25377106.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "23 Dec 2024"
  },
  {
    "date": "22/12/2024",
    "amountReceived": 313100.0,
    "expense": 21420.0,
    "debt": 38000.0,
    "availableCash": 25244143.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "22 Dec 2024"
  },
  {
    "date": "21/12/2024",
    "amountReceived": 16500.0,
    "expense": 2390.0,
    "debt": 25000.0,
    "availableCash": 24990463.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "21 Dec 2024"
  },
  {
    "date": "20/12/2024",
    "amountReceived": 174100.0,
    "expense": 71430.0,
    "debt": 137700.0,
    "availableCash": 25001353.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "20 Dec 2024"
  },
  {
    "date": "19/12/2024",
    "amountReceived": 208600.0,
    "expense": 30.0,
    "debt": 65000.0,
    "availableCash": 25036383.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "19 Dec 2024"
  },
  {
    "date": "18/12/2024",
    "amountReceived": 106500.0,
    "expense": 48080.0,
    "debt": 44200.0,
    "availableCash": 24892813.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "18 Dec 2024"
  },
  {
    "date": "17/12/2024",
    "amountReceived": 248000.0,
    "expense": 50530.0,
    "debt": 11500.0,
    "availableCash": 24878593.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "17 Dec 2024"
  },
  {
    "date": "16/12/2024",
    "amountReceived": 201800.0,
    "expense": 10630.0,
    "debt": 29700.0,
    "availableCash": 24692623.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "16 Dec 2024"
  },
  {
    "date": "15/12/2024",
    "amountReceived": 0.0,
    "expense": 175970.0,
    "debt": 62000.0,
    "availableCash": 24531153.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "15 Dec 2024"
  },
  {
    "date": "14/12/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 24769123.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "14 Dec 2024"
  },
  {
    "date": "13/12/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 24769123.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "13 Dec 2024"
  },
  {
    "date": "12/12/2024",
    "amountReceived": 44300.0,
    "expense": 45.0,
    "debt": 71000.0,
    "availableCash": 24769123.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "12 Dec 2024"
  },
  {
    "date": "11/12/2024",
    "amountReceived": 0.0,
    "expense": 66730.0,
    "debt": 2135100.0,
    "availableCash": 24795868.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "11 Dec 2024"
  },
  {
    "date": "10/12/2024",
    "amountReceived": 74800.0,
    "expense": 480.0,
    "debt": 287000.0,
    "availableCash": 26997698.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "10 Dec 2024"
  },
  {
    "date": "09/12/2024",
    "amountReceived": 150600.0,
    "expense": 50845.0,
    "debt": 7000.0,
    "availableCash": 9033427.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "09 Dec 2024"
  },
  {
    "date": "08/12/2024",
    "amountReceived": 3200.0,
    "expense": 26810.0,
    "debt": 28400.0,
    "availableCash": 8940672.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "08 Dec 2024"
  },
  {
    "date": "07/12/2024",
    "amountReceived": 2396500.0,
    "expense": 1160.0,
    "debt": 32400.0,
    "availableCash": 8992682.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "07 Dec 2024"
  },
  {
    "date": "06/12/2024",
    "amountReceived": 67700.0,
    "expense": 107430.0,
    "debt": 220100.0,
    "availableCash": 6629742.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "06 Dec 2024"
  },
  {
    "date": "05/12/2024",
    "amountReceived": 69500.0,
    "expense": 80.0,
    "debt": 104100.0,
    "availableCash": 6889572.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "05 Dec 2024"
  },
  {
    "date": "04/12/2024",
    "amountReceived": 111000.0,
    "expense": 640.0,
    "debt": 10500.0,
    "availableCash": 6924252.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "04 Dec 2024"
  },
  {
    "date": "03/12/2024",
    "amountReceived": 184100.0,
    "expense": 24884.0,
    "debt": 99500.0,
    "availableCash": 6824392.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "03 Dec 2024"
  },
  {
    "date": "02/12/2024",
    "amountReceived": 70300.0,
    "expense": 218230.0,
    "debt": 77300.0,
    "availableCash": 6764676.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "02 Dec 2024"
  },
  {
    "date": "01/12/2024",
    "amountReceived": 49500.0,
    "expense": 1185.0,
    "debt": 0.0,
    "availableCash": 6989906.0,
    "fy": "2024-2025",
    "monthKey": "2024-12",
    "displayDate": "01 Dec 2024"
  },
  {
    "date": "30/11/2024",
    "amountReceived": 675200.0,
    "expense": 221070.0,
    "debt": 7200.0,
    "availableCash": 6941591.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "30 Nov 2024"
  },
  {
    "date": "29/11/2024",
    "amountReceived": 245800.0,
    "expense": 90.0,
    "debt": 22100.0,
    "availableCash": 6494661.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "29 Nov 2024"
  },
  {
    "date": "28/11/2024",
    "amountReceived": 85000.0,
    "expense": 1170.0,
    "debt": 20300.0,
    "availableCash": 6271051.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "28 Nov 2024"
  },
  {
    "date": "27/11/2024",
    "amountReceived": 0.0,
    "expense": 21060.0,
    "debt": 31000.0,
    "availableCash": 6207521.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "27 Nov 2024"
  },
  {
    "date": "26/11/2024",
    "amountReceived": 66300.0,
    "expense": 0.0,
    "debt": 49300.0,
    "availableCash": 6259581.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "26 Nov 2024"
  },
  {
    "date": "25/11/2024",
    "amountReceived": 96000.0,
    "expense": 49660.0,
    "debt": 232500.0,
    "availableCash": 6242581.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "25 Nov 2024"
  },
  {
    "date": "24/11/2024",
    "amountReceived": 204000.0,
    "expense": 119990.0,
    "debt": 251600.0,
    "availableCash": 6428741.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "24 Nov 2024"
  },
  {
    "date": "23/11/2024",
    "amountReceived": 82200.0,
    "expense": 1.0,
    "debt": 16500.0,
    "availableCash": 6596331.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "23 Nov 2024"
  },
  {
    "date": "22/11/2024",
    "amountReceived": 287500.0,
    "expense": 2590.0,
    "debt": 235500.0,
    "availableCash": 6530632.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "22 Nov 2024"
  },
  {
    "date": "21/11/2024",
    "amountReceived": 68800.0,
    "expense": 0.0,
    "debt": 241300.0,
    "availableCash": 6481222.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "21 Nov 2024"
  },
  {
    "date": "20/11/2024",
    "amountReceived": 248600.0,
    "expense": 170875.0,
    "debt": 222000.0,
    "availableCash": 6226923.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "20 Nov 2024"
  },
  {
    "date": "19/11/2024",
    "amountReceived": 225000.0,
    "expense": 76250.0,
    "debt": 46300.0,
    "availableCash": 6371198.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "19 Nov 2024"
  },
  {
    "date": "18/11/2024",
    "amountReceived": 475400.0,
    "expense": 720.0,
    "debt": 15500.0,
    "availableCash": 6268748.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "18 Nov 2024"
  },
  {
    "date": "17/11/2024",
    "amountReceived": 93000.0,
    "expense": 125.0,
    "debt": 19500.0,
    "availableCash": 5809568.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "17 Nov 2024"
  },
  {
    "date": "16/11/2024",
    "amountReceived": 222300.0,
    "expense": 475.0,
    "debt": 22800.0,
    "availableCash": 5736193.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "16 Nov 2024"
  },
  {
    "date": "15/11/2024",
    "amountReceived": 85000.0,
    "expense": 1230.0,
    "debt": 30500.0,
    "availableCash": 5537168.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "15 Nov 2024"
  },
  {
    "date": "14/11/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5483898.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "14 Nov 2024"
  },
  {
    "date": "13/11/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5483898.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "13 Nov 2024"
  },
  {
    "date": "12/11/2024",
    "amountReceived": 0.0,
    "expense": 15390.0,
    "debt": 124300.0,
    "availableCash": 5483898.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "12 Nov 2024"
  },
  {
    "date": "11/11/2024",
    "amountReceived": 2133000.0,
    "expense": 6620.0,
    "debt": 2285700.0,
    "availableCash": 5623588.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "11 Nov 2024"
  },
  {
    "date": "10/11/2024",
    "amountReceived": 89900.0,
    "expense": 288610.0,
    "debt": 87100.0,
    "availableCash": 5782908.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "10 Nov 2024"
  },
  {
    "date": "09/11/2024",
    "amountReceived": 0.0,
    "expense": 540.0,
    "debt": 639500.0,
    "availableCash": 6068718.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "09 Nov 2024"
  },
  {
    "date": "08/11/2024",
    "amountReceived": 2900.0,
    "expense": 530.0,
    "debt": 25800.0,
    "availableCash": 6708758.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "08 Nov 2024"
  },
  {
    "date": "07/11/2024",
    "amountReceived": 1039800.0,
    "expense": 22040.0,
    "debt": 44300.0,
    "availableCash": 6732188.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "07 Nov 2024"
  },
  {
    "date": "06/11/2024",
    "amountReceived": 104400.0,
    "expense": 50.0,
    "debt": 22800.0,
    "availableCash": 5758728.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "06 Nov 2024"
  },
  {
    "date": "05/11/2024",
    "amountReceived": 260100.0,
    "expense": 3471.0,
    "debt": 167100.0,
    "availableCash": 5677178.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "05 Nov 2024"
  },
  {
    "date": "04/11/2024",
    "amountReceived": 42600.0,
    "expense": 218473.0,
    "debt": 14400.0,
    "availableCash": 5587649.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "04 Nov 2024"
  },
  {
    "date": "03/11/2024",
    "amountReceived": 299100.0,
    "expense": 0.0,
    "debt": 1500.0,
    "availableCash": 5777922.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "03 Nov 2024"
  },
  {
    "date": "02/11/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 2500.0,
    "availableCash": 5480322.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "02 Nov 2024"
  },
  {
    "date": "01/11/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 5482822.0,
    "fy": "2024-2025",
    "monthKey": "2024-11",
    "displayDate": "01 Nov 2024"
  },
  {
    "date": "31/10/2024",
    "amountReceived": 7300.0,
    "expense": 0.0,
    "debt": 1500.0,
    "availableCash": 5482822.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "31 Oct 2024"
  },
  {
    "date": "30/10/2024",
    "amountReceived": 19200.0,
    "expense": 0.0,
    "debt": 1700.0,
    "availableCash": 5477022.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "30 Oct 2024"
  },
  {
    "date": "29/10/2024",
    "amountReceived": 0.0,
    "expense": 12270.0,
    "debt": 56800.0,
    "availableCash": 5459522.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "29 Oct 2024"
  },
  {
    "date": "28/10/2024",
    "amountReceived": 27500.0,
    "expense": 30830.0,
    "debt": 1020700.0,
    "availableCash": 5528592.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "28 Oct 2024"
  },
  {
    "date": "27/10/2024",
    "amountReceived": 29000.0,
    "expense": 2895.0,
    "debt": 219000.0,
    "availableCash": 6552622.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "27 Oct 2024"
  },
  {
    "date": "26/10/2024",
    "amountReceived": 398300.0,
    "expense": 208.0,
    "debt": 58000.0,
    "availableCash": 6745517.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "26 Oct 2024"
  },
  {
    "date": "25/10/2024",
    "amountReceived": 250900.0,
    "expense": 56.0,
    "debt": 326800.0,
    "availableCash": 6405425.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "25 Oct 2024"
  },
  {
    "date": "24/10/2024",
    "amountReceived": 70100.0,
    "expense": 0.0,
    "debt": 157000.0,
    "availableCash": 6481381.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "24 Oct 2024"
  },
  {
    "date": "23/10/2024",
    "amountReceived": 88300.0,
    "expense": 11930.0,
    "debt": 18500.0,
    "availableCash": 6568281.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "23 Oct 2024"
  },
  {
    "date": "22/10/2024",
    "amountReceived": 42100.0,
    "expense": 12.0,
    "debt": 69800.0,
    "availableCash": 6510411.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "22 Oct 2024"
  },
  {
    "date": "21/10/2024",
    "amountReceived": 597400.0,
    "expense": 364728.0,
    "debt": 25100.0,
    "availableCash": 6538123.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "21 Oct 2024"
  },
  {
    "date": "20/10/2024",
    "amountReceived": 120300.0,
    "expense": 12120.0,
    "debt": 6000.0,
    "availableCash": 6330551.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "20 Oct 2024"
  },
  {
    "date": "19/10/2024",
    "amountReceived": 202700.0,
    "expense": 610.0,
    "debt": 243000.0,
    "availableCash": 6228371.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "19 Oct 2024"
  },
  {
    "date": "18/10/2024",
    "amountReceived": 50700.0,
    "expense": 560.0,
    "debt": 171200.0,
    "availableCash": 6269281.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "18 Oct 2024"
  },
  {
    "date": "17/10/2024",
    "amountReceived": 126200.0,
    "expense": 8370.0,
    "debt": 84800.0,
    "availableCash": 6390341.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "17 Oct 2024"
  },
  {
    "date": "16/10/2024",
    "amountReceived": 346100.0,
    "expense": 138060.0,
    "debt": 113000.0,
    "availableCash": 6357311.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "16 Oct 2024"
  },
  {
    "date": "15/10/2024",
    "amountReceived": 477000.0,
    "expense": 65610.0,
    "debt": 65600.0,
    "availableCash": 6262271.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "15 Oct 2024"
  },
  {
    "date": "14/10/2024",
    "amountReceived": 187200.0,
    "expense": 51020.0,
    "debt": 282600.0,
    "availableCash": 5916481.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "14 Oct 2024"
  },
  {
    "date": "13/10/2024",
    "amountReceived": 156200.0,
    "expense": 350.0,
    "debt": 401800.0,
    "availableCash": 6062901.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "13 Oct 2024"
  },
  {
    "date": "12/10/2024",
    "amountReceived": 408600.0,
    "expense": 470.0,
    "debt": 160100.0,
    "availableCash": 6308851.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "12 Oct 2024"
  },
  {
    "date": "11/10/2024",
    "amountReceived": 271700.0,
    "expense": 198850.0,
    "debt": 176500.0,
    "availableCash": 6060821.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "11 Oct 2024"
  },
  {
    "date": "10/10/2024",
    "amountReceived": 367100.0,
    "expense": 4280.0,
    "debt": 177400.0,
    "availableCash": 6164471.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "10 Oct 2024"
  },
  {
    "date": "09/10/2024",
    "amountReceived": 63500.0,
    "expense": 80314.0,
    "debt": 177300.0,
    "availableCash": 5979051.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "09 Oct 2024"
  },
  {
    "date": "08/10/2024",
    "amountReceived": 164900.0,
    "expense": 3069.0,
    "debt": 409200.0,
    "availableCash": 6173165.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "08 Oct 2024"
  },
  {
    "date": "07/10/2024",
    "amountReceived": 216000.0,
    "expense": 2400.0,
    "debt": 278000.0,
    "availableCash": 6420534.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "07 Oct 2024"
  },
  {
    "date": "06/10/2024",
    "amountReceived": 307000.0,
    "expense": 1530.0,
    "debt": 418100.0,
    "availableCash": 6484934.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "06 Oct 2024"
  },
  {
    "date": "05/10/2024",
    "amountReceived": 179600.0,
    "expense": 30840.0,
    "debt": 96600.0,
    "availableCash": 6597564.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "05 Oct 2024"
  },
  {
    "date": "04/10/2024",
    "amountReceived": 278100.0,
    "expense": 600.0,
    "debt": 232300.0,
    "availableCash": 6545404.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "04 Oct 2024"
  },
  {
    "date": "03/10/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 6500204.0,
    "fy": "2024-2025",
    "monthKey": "2024-10",
    "displayDate": "03 Oct 2024"
  },
  {
    "date": "30/09/2024",
    "amountReceived": 0.0,
    "expense": 0.0,
    "debt": 0.0,
    "availableCash": 6500204.0,
    "fy": "2024-2025",
    "monthKey": "2024-09",
    "displayDate": "30 Sep 2024"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SAMPLE_CASH_LEDGER_DATA };
}
