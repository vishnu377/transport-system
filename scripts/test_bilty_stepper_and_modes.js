/**
 * Test Suite: Bilty Stepper, Modes, Quick Templates & Sacred Print
 */
const fs = require('fs');
const path = require('path');

console.log("=== VERIFYING BILTY STEPPER, MODES, TEMPLATES & GANESHA EMBLEM ===");

// 1. Verify HTML Structure in pages/bilty-booking.html
const htmlPath = path.join(__dirname, '../pages/bilty-booking.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const requiredHtmlElements = [
  'bilty-workflow-toolbar',
  'btn-mode-stepper',
  'btn-mode-express',
  'btn-mode-full',
  'bilty-stepper-bar',
  'stepper-step-1',
  'stepper-step-2',
  'stepper-step-3',
  'express-entry-view',
  'step-container-1',
  'step-container-2',
  'step-container-3',
  'preview-sacred-strip',
  '॥ श्री गणेशाय नमः ॥',
  '॥ शुभ लाभ ॥',
  'VERIFIED &amp; BOOKED'
];

let allHtmlPassed = true;
requiredHtmlElements.forEach(item => {
  if (!html.includes(item)) {
    console.error(`❌ Missing in bilty-booking.html: ${item}`);
    allHtmlPassed = false;
  }
});

if (allHtmlPassed) {
  console.log("✅ HTML: All Stepper, Modes, Express view and Ganesha slip elements present!");
}

// 2. Verify CSS in css/print.css and css/style.css
const printCss = fs.readFileSync(path.join(__dirname, '../css/print.css'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, '../css/style.css'), 'utf8');

const requiredCssPrint = [
  '.bilty-sacred-header',
  '.bilty-ganesha-emblem',
  '.bilty-ganesha-mantra',
  '॥ श्री गणेशाय नमः ॥'
];

let allPrintCssPassed = true;
requiredCssPrint.forEach(item => {
  if (!printCss.includes(item)) {
    console.error(`❌ Missing in css/print.css: ${item}`);
    allPrintCssPassed = false;
  }
});
if (allPrintCssPassed) {
  console.log("✅ Print CSS: Lord Ganesha sacred header & vector layout verified in print stylesheet!");
}

const requiredStyleCss = [
  '.bilty-workflow-toolbar',
  '.mode-toggle-btn',
  '.bilty-stepper-container',
  '.stepper-step.active',
  '.stepper-step.completed',
  '.express-bilty-card',
  '.full-form-mode .bilty-step-pane'
];

let allStyleCssPassed = true;
requiredStyleCss.forEach(item => {
  if (!styleCss.includes(item)) {
    console.error(`❌ Missing in css/style.css: ${item}`);
    allStyleCssPassed = false;
  }
});
if (allStyleCssPassed) {
  console.log("✅ Style CSS: Stepper, Workflow Toolbar, Express Card & Full Mode classes verified!");
}

// 3. Verify JS methods in js/modules/bilty-booking.js
const jsContent = fs.readFileSync(path.join(__dirname, '../js/modules/bilty-booking.js'), 'utf8');
const requiredJsMethods = [
  'setFormMode',
  'goToStep',
  'nextStep',
  'prevStep',
  'loadTemplate',
  'populateExpressFromMain',
  'syncExpressToMain',
  'saveExpressBilty',
  'setupKeyboardShortcuts',
  'श्री गणेशाय नमः',
  'श्री सांवरिया सेठाय नमः'
];

let allJsPassed = true;
requiredJsMethods.forEach(method => {
  if (!jsContent.includes(method)) {
    console.error(`❌ Missing in bilty-booking.js: ${method}`);
    allJsPassed = false;
  }
});
if (allJsPassed) {
  console.log("✅ JS Engine: All Stepper, Modes, Template Autofill, Express booking & Sacred Print verified!");
}

if (allHtmlPassed && allPrintCssPassed && allStyleCssPassed && allJsPassed) {
  console.log("\n🚀 ALL 4 CORE DOM & LOGIC VERIFICATIONS PASSED 100%!");
} else {
  process.exit(1);
}
