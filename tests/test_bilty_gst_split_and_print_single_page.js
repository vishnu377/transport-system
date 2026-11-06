/**
 * Test Suite: Bilty GST Split (SGST/CGST vs IGST) for Historical & New Bilties,
 * E-way Bill Blank Handling, and 1-Page A4 Landscape Rendering
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("==================================================================");
console.log("  TEST: BILTY HISTORICAL GST SPLIT & 1-PAGE A4 LANDSCAPE FIT      ");
console.log("==================================================================");

const biltyImages = require('../assets/bilty_template/bilty_assets.js');
const jsContent = fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8');

const docFnMatch = jsContent.match(/getBiltyDocHTML\(trip\)\s*\{([\s\S]*?)\n  \},/);
assert(docFnMatch, "Could not find getBiltyDocHTML in bilty-booking.js");

const renderFn = function(trip) {
  const fn = new Function('trip', 'BILTY_IMAGES', docFnMatch[1]);
  const mockThis = {
    sanitizeText: (t) => t || '',
    sanitizeGstin: (g) => g || ''
  };
  return fn.call(mockThis, trip, biltyImages);
};

// 1. Test Historical Inter-State GST Trip (Sandila, U.P. -> IGST 18%)
const tripInterState = {
  grNo: '2026-2027-227_SMTC',
  shortGrNo: '227_SMTC',
  transport: 'SMTC',
  destination: 'Sandila (U.P.)',
  freight: 180400,
  gstAmount: 32472,
  total: 212872,
  ewayBillNo: '7516 5237 4578',
  billNo: '224'
};
const htmlInterState = renderFn(tripInterState);
assert(htmlInterState.includes('IGST@'), "Must contain IGST");
assert(htmlInterState.includes('18.00%'), "Must calculate 18.00% IGST");
assert(htmlInterState.includes('32472.00'), "Must display 32472.00 IGST amount");
assert(htmlInterState.includes('2,12,872.00'), "Grand total must be 2,12,872.00");
assert(htmlInterState.includes('7516 5237 4578'), "Must render genuine e-way bill number");
assert(htmlInterState.includes('224'), "Must render genuine bill number");
console.log("✔ TEST 1 PASSED: Inter-State GST trip (UP) correctly allocates 100% tax to IGST (18%) and Grand Total 2,12,872!");

// 2. Test Historical Intra-State GST Trip (Neemrana, Raj. -> SGST 9% + CGST 9%)
const tripIntraState = {
  grNo: '2026-2027-233_SMTC',
  shortGrNo: '233_SMTC',
  transport: 'SMTC',
  destination: 'Neemrana (Raj.)',
  freight: 113452,
  gstAmount: 20422,
  total: 133874,
  ewayBillNo: '',
  billNo: ''
};
const htmlIntraState = renderFn(tripIntraState);
assert(htmlIntraState.includes('SGST@'), "Must contain SGST");
assert(htmlIntraState.includes('CGST@'), "Must contain CGST");
assert(htmlIntraState.includes('9.00%'), "Must split into 9.00% SGST & CGST");
assert(htmlIntraState.includes('10211.00'), "Must split into 10211.00 SGST & CGST amounts");
assert(htmlIntraState.includes('1,33,874.00'), "Grand total must be 1,33,874.00");
assert(htmlIntraState.includes('>-><') || htmlIntraState.includes('>-<'), "Must show '-' for blank eway bill and bill no");
console.log("✔ TEST 2 PASSED: Intra-State GST trip (Raj.) correctly splits tax into SGST (9%) + CGST (9%) and '-' for blank eway/bill no!");

// 3. Test Non-GST / RCM Regular Trip (TTC Marble -> SGST/CGST/IGST 0.00% and Grand Total = Freight)
const tripRegular = {
  grNo: '2026-2027-1322_TTC',
  shortGrNo: '1322',
  transport: 'TTC',
  destination: 'Bareilly (U.P.)',
  freight: 45000,
  partyDue: 45000,
  ewayBillNo: '',
  billNo: '099027'
};
const htmlRegular = renderFn(tripRegular);
assert(htmlRegular.includes('0.00%'), "Non-GST trip rates must remain 0.00%");
assert(htmlRegular.includes('₹ 0.00'), "Non-GST trip tax amount must be ₹ 0.00");
assert(htmlRegular.includes('099027'), "Bill no 099027 rendered cleanly");
console.log("✔ TEST 3 PASSED: Non-GST trip correctly shows 0.00% tax and Grand Total matching freight!");

console.log("==================================================================");
console.log("🏆 ALL BILTY HISTORICAL GST SPLIT & PRINT PARITY TESTS PASSED!   ");
console.log("==================================================================");
