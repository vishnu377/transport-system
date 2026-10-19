/**
 * Test Suite: cheques_dashboard
 * Verifies Cheques 5-Cards Dashboard authentic Google AppSheet functionality:
 * - 5 Cards Dashboard structure: Due, Bounced, Cleared, Not Used, All Cheques
 * - Card 1 Due mini-table with authentic Pink (#e91e63) and Mustard (#b59a2a) rows
 * - Exact badge amounts across Bounced, Cleared, Not Used, and All Cheques
 * - View toggling between Dashboard and Register view
 * - Zero localStorage (100% Firestore / in-memory state)
 */

const fs = require('fs');
const assert = require('assert');

console.log('--- Running Cheques 5-Cards Dashboard Test Suite ---');

// 1. Verify HTML Structure in pages/cheques.html
const htmlContent = fs.readFileSync('pages/cheques.html', 'utf8');

assert(htmlContent.includes('id="cheques-view-dashboard"'), '#cheques-view-dashboard must exist in pages/cheques.html');
assert(htmlContent.includes('id="cheques-view-register"'), '#cheques-view-register must exist in pages/cheques.html');
assert(htmlContent.includes('id="card-cheques-due"'), 'Card 1 Due must exist');
assert(htmlContent.includes('id="card-cheques-bounced"'), 'Card 2 Bounced must exist');
assert(htmlContent.includes('id="card-cheques-cleared"'), 'Card 3 Cleared must exist');
assert(htmlContent.includes('id="card-cheques-notused"'), 'Card 4 Not Used must exist');
assert(htmlContent.includes('id="card-cheques-all"'), 'Card 5 All Cheques must exist');

// Check Badges
assert(htmlContent.includes('id="card-bounced-badge-2026"'), 'Bounced 2026 badge must exist');
assert(htmlContent.includes('id="card-cleared-badge-2026"'), 'Cleared 2026 badge must exist');
assert(htmlContent.includes('id="card-notused-badge-2026"'), 'Not Used 2026 badge must exist');
assert(htmlContent.includes('id="card-allchq-badge-2026"'), 'All Cheques 2026 badge must exist');

// Check Due table element
assert(htmlContent.includes('id="chq-due-tbody"'), 'Due table body #chq-due-tbody must exist');
assert(htmlContent.includes('.cheques-dashboard-grid'), 'Must include .cheques-dashboard-grid CSS');
assert(htmlContent.includes('.chq-theme-pink'), 'Must include .chq-theme-pink CSS');
assert(htmlContent.includes('.chq-theme-mustard'), 'Must include .chq-theme-mustard CSS');

console.log('✔ pages/cheques.html: 5-Cards Dashboard layout, Due table, and badge containers verified.');

// 2. Verify Sample Data in js/sample-cheques-data.js
global.window = {};
require('../js/sample-cheques-data.js');
const chequesData = window.INITIAL_CHEQUES_DATA;
assert(Array.isArray(chequesData) && chequesData.length > 700, `Expected >700 cheques, found ${chequesData ? chequesData.length : 0}`);

const dueCheques = chequesData.filter(c => c.status === 'Due');
assert(dueCheques.length >= 2, `Expected at least 2 Due cheques, found ${dueCheques.length}`);

const chq144 = dueCheques.find(c => c.chequeNo === '000144');
assert(chq144, 'Cheque 000144 must exist in Due cheques');
assert.strictEqual(chq144.amount, 20000, 'Cheque 000144 amount must be 20000');
assert.strictEqual(chq144.bankName, 'Bandhan Bank', 'Cheque 000144 bank must be Bandhan Bank');
assert.strictEqual(chq144.firm, 'TTC', 'Cheque 000144 firm must be TTC');
assert.strictEqual(chq144.shortGrNo, '2426', 'Cheque 000144 shortGrNo must be 2426');
assert.strictEqual(chq144.truckNo, 'RJ52GB5053', 'Cheque 000144 truck must be RJ52GB5053');
assert.strictEqual(chq144.destination, 'Delhi', 'Cheque 000144 destination must be Delhi');

const chq365 = dueCheques.find(c => c.chequeNo === '217365');
assert(chq365, 'Cheque 217365 must exist in Due cheques');
assert.strictEqual(chq365.amount, 25000, 'Cheque 217365 amount must be 25000');
assert(chq365.bankName.includes('Ujjivan'), 'Cheque 217365 bank must be Ujjivan');
assert.strictEqual(chq365.firm, 'TTC', 'Cheque 217365 firm must be TTC');
assert.strictEqual(chq365.shortGrNo, '2435', 'Cheque 217365 shortGrNo must be 2435');
assert.strictEqual(chq365.truckNo, 'RJ52GB5054', 'Cheque 217365 truck must be RJ52GB5054');
assert.strictEqual(chq365.destination, 'Meerut (U.P.)', 'Cheque 217365 destination must be Meerut (U.P.)');

console.log('✔ js/sample-cheques-data.js: Authentic Due cheques 000144 and 217365 verified.');

// 3. Verify ChequesModule in js/modules/cheques.js
const chequesJs = fs.readFileSync('js/modules/cheques.js', 'utf8');

assert(!chequesJs.includes('localStorage.setItem'), 'Zero localStorage: cheques.js must not persist to localStorage');
assert(chequesJs.includes('viewMode: \'dashboard\''), 'Default viewMode must be dashboard');
assert(chequesJs.includes('renderDashboard()'), 'Must define renderDashboard()');
assert(chequesJs.includes('goToDashboardView()'), 'Must define goToDashboardView()');
assert(chequesJs.includes('goToCardView('), 'Must define goToCardView()');
assert(chequesJs.includes('goToDueView('), 'Must define goToDueView()');
assert(chequesJs.includes('renderDueMiniTable()'), 'Must define renderDueMiniTable()');
assert(chequesJs.includes('renderDueListTable()'), 'Must define renderDueListTable()');
assert(chequesJs.includes('viewDueChequeDetails('), 'Must define viewDueChequeDetails()');
assert(chequesJs.includes('openEditDrawer('), 'Must define openEditDrawer()');
assert(chequesJs.includes('saveDrawerEdit()'), 'Must define saveDrawerEdit()');
assert(chequesJs.includes('goToBouncedView('), 'Must define goToBouncedView()');
assert(chequesJs.includes('goToClearedView('), 'Must define goToClearedView()');
assert(chequesJs.includes('goToNotUsedView('), 'Must define goToNotUsedView()');
assert(chequesJs.includes('goToAllChequesView('), 'Must define goToAllChequesView()');

// Check authentic amounts in dictionary
assert(chequesJs.includes('255000.00'), 'Must define authentic Bounced 2026 amount 255000.00');
assert(chequesJs.includes('467450.00'), 'Must define authentic Bounced 2025 amount 467450.00');
assert(chequesJs.includes('454735.00'), 'Must define authentic Bounced 2024 amount 454735.00');
assert(chequesJs.includes('5124183.00'), 'Must define authentic Cleared 2026 amount 5124183.00');
assert(chequesJs.includes('10154004.00'), 'Must define authentic Cleared 2025 amount 10154004.00');
assert(chequesJs.includes('4947105.80'), 'Must define authentic Cleared 2024 amount 4947105.80');
assert(chequesJs.includes('80000.00'), 'Must define authentic Not Used 2026 amount 80000.00');
assert(chequesJs.includes('487809.00'), 'Must define authentic Not Used 2025 amount 487809.00');
assert(chequesJs.includes('171500.00'), 'Must define authentic Not Used 2024 amount 171500.00');
assert(chequesJs.includes('5504183.00'), 'Must define authentic All Cheques 2026 amount 5504183.00');
assert(chequesJs.includes('11909263.00'), 'Must define authentic All Cheques 2025 amount 11909263.00');
assert(chequesJs.includes('5573340.80'), 'Must define authentic All Cheques 2024 amount 5573340.80');

// Verify HTML contains Due List, Due Details, and Edit drawer
assert(htmlContent.includes('id="cheques-view-due-list"'), '#cheques-view-due-list must exist');
assert(htmlContent.includes('id="cheques-view-due-detail"'), '#cheques-view-due-detail must exist');
assert(htmlContent.includes('id="chq-detail-card-body"'), '#chq-detail-card-body must exist');
assert(htmlContent.includes('id="offcanvasEditCheque"'), '#offcanvasEditCheque must exist');
assert(htmlContent.includes('id="due-detail-actions"'), '#due-detail-actions must exist');

// 4. Verify Card 2 (Bounced) HTML Elements & Views (Levels 1 to 5)
assert(htmlContent.includes('id="cheques-view-bounced-list"'), '#cheques-view-bounced-list must exist');
assert(htmlContent.includes('id="cheques-view-bounced-trip-detail"'), '#cheques-view-bounced-trip-detail must exist');
assert(htmlContent.includes('id="cheques-view-bounced-cheque-detail"'), '#cheques-view-bounced-cheque-detail must exist');
assert(htmlContent.includes('id="cheques-view-bounced-open-debts"'), '#cheques-view-bounced-open-debts must exist');
assert(htmlContent.includes('id="offcanvasUpdateTripDetails"'), '#offcanvasUpdateTripDetails drawer must exist');
assert(htmlContent.includes('id="bounced-table-tbody"'), '#bounced-table-tbody must exist');
assert(htmlContent.includes('id="bounced-trip-details-content"'), '#bounced-trip-details-content must exist');
assert(htmlContent.includes('id="bounced-trip-cheques-tbody"'), '#bounced-trip-cheques-tbody must exist');
assert(htmlContent.includes('id="bounced-open-debts-tbody"'), '#bounced-open-debts-tbody must exist');
assert(htmlContent.includes('id="bounced-list-actions"'), '#bounced-list-actions must exist');
assert(htmlContent.includes('id="bounced-trip-actions"'), '#bounced-trip-actions must exist');
assert(htmlContent.includes('id="bounced-debts-actions"'), '#bounced-debts-actions must exist');

// 5. Verify Cheque 000004 and Bounced Cheques in Sample Data
const bouncedCheques = chequesData.filter(c => c.status === 'Bounced');
assert.strictEqual(bouncedCheques.length, 43, `Expected 43 bounced cheques, found ${bouncedCheques.length}`);

const chq000004 = bouncedCheques.find(c => c.chequeNo === '000004');
assert(chq000004, 'Cheque 000004 must exist in Bounced cheques');
assert.strictEqual(chq000004.amount, 20000, 'Cheque 000004 amount must be 20000');
assert.strictEqual(chq000004.bankName, 'UCO Bank', 'Cheque 000004 bank must be UCO Bank');
assert.strictEqual(chq000004.shortGrNo, '-207', 'Cheque 000004 shortGrNo must be -207');
assert.strictEqual(chq000004.truckNo, 'RJ52GB5529', 'Cheque 000004 truckNo must be RJ52GB5529');
assert.strictEqual(chq000004.destination, 'Manjhanpur (U.P.)', 'Cheque 000004 destination must be Manjhanpur (U.P.)');

// 6. Verify Bounced Methods in cheques.js
assert(chequesJs.includes('goToBouncedView('), 'Must define goToBouncedView()');
assert(chequesJs.includes('filterBouncedByYear('), 'Must define filterBouncedByYear()');
assert(chequesJs.includes('renderBouncedTable()'), 'Must define renderBouncedTable()');
assert(chequesJs.includes('viewBouncedTripDetails('), 'Must define viewBouncedTripDetails()');
assert(chequesJs.includes('viewBouncedChequeDetails('), 'Must define viewBouncedChequeDetails()');
assert(chequesJs.includes('viewBouncedOpenDebts()'), 'Must define viewBouncedOpenDebts()');
assert(chequesJs.includes('renderBouncedOpenDebts()'), 'Must define renderBouncedOpenDebts()');
assert(chequesJs.includes('openUpdateTripDrawer()'), 'Must define openUpdateTripDrawer()');
assert(chequesJs.includes('saveTripDetailsEdit()'), 'Must define saveTripDetailsEdit()');
assert(chequesJs.includes('updateTripStatusFromSelect('), 'Must define updateTripStatusFromSelect()');

console.log('✔ Card 2 Bounced: All 5 levels (split view, trip details, cheque details, edit drawer, open debts) verified.');
console.log('✔ All Cheques Dashboard, Card 1 Due & Card 2 Bounced tests PASSED 100%!');

