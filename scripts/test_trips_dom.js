const fs = require('fs');

const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity/scratch/transport-system/pages/trips.html', 'utf8');

// Check key IDs
const requiredIds = [
  'fy-pill-group',
  'active-fy-badge',
  'stat-open-due',
  'stat-open-count',
  'stat-settled-freight',
  'stat-settled-count',
  'stat-total-trips',
  'stat-total-freight',
  'stat-gst-amt',
  'stat-gst-cnt',
  'stat-rate-diff',
  'wtab-open',
  'wtab-settled',
  'wtab-all',
  'badge-count-open',
  'badge-count-settled',
  'badge-count-all',
  'tab-ttc-smtc',
  'tab-mtc',
  'tab-firm-all',
  'search-trips',
  'btn-clear-search',
  'trips-tbody',
  'items-per-page',
  'pagination-info',
  'pagination-controls',
  'tripDetailModal',
  'trip-detail-content',
  'nav-btn-prev',
  'nav-btn-next',
  'modal-btn-print',
  'modal-btn-edit',
  'modal-btn-wa',
  'recordPaymentModal',
  'record-owner-payment-form',
  'rop-trip-id',
  'rop-gr-no',
  'rop-firm',
  'rop-disp-gr',
  'rop-disp-truck',
  'rop-disp-owner',
  'rop-disp-due',
  'rop-date',
  'rop-amount',
  'rop-mode',
  'rop-bank',
  'rop-ref',
  'rop-remarks',
  'tripPrintModal',
  'trip-print-preview',
  'btn-share-whatsapp'
];

let missing = [];
requiredIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    missing.push(id);
  }
});

if (missing.length > 0) {
  console.error('FAIL: Missing element IDs:', missing);
  process.exit(1);
}

console.log(`PASS: All ${requiredIds.length} critical DOM element IDs are present in pages/trips.html!`);
