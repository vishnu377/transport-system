# -*- coding: utf-8 -*-
import os
import re

# 1. Update pages/owners.html
with open('pages/owners.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add CSS for Full Row Status Colors, Sidebar Hide/Unhide, and Inner Card Expansion
extra_css = """
    /* Sidebar Hide / Unhide Toggle */
    body.sidebar-hidden #sidebar,
    body.sidebar-hidden .appsheet-rail {
      display: none !important;
    }
    body.sidebar-hidden #main-content {
      margin-left: 0 !important;
      width: 100% !important;
    }
    #sidebar-toggle {
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.15s ease;
    }
    #sidebar-toggle:hover {
      background-color: #f1f3f4;
    }

    /* Full Row Background Colors matching authentic status colors */
    .appsheet-row.row-status-yellow {
      background-color: #fef9c3 !important; /* Soft bright yellow */
      border-left: 5px solid #eab308 !important;
    }
    .appsheet-row.row-status-yellow:hover {
      background-color: #fef08a !important;
    }

    .appsheet-row.row-status-purple {
      background-color: #f3e8ff !important; /* Soft bright purple */
      border-left: 5px solid #a855f7 !important;
    }
    .appsheet-row.row-status-purple:hover {
      background-color: #e9d5ff !important;
    }

    .appsheet-row.row-status-blue {
      background-color: #dbeafe !important; /* Soft bright blue */
      border-left: 5px solid #3b82f6 !important;
    }
    .appsheet-row.row-status-blue:hover {
      background-color: #bfdbfe !important;
    }

    .appsheet-row.row-status-pink {
      background-color: #fce7f3 !important; /* Soft bright pink */
      border-left: 5px solid #ec4899 !important;
    }
    .appsheet-row.row-status-pink:hover {
      background-color: #fbcfe8 !important;
    }

    .appsheet-row.row-status-slate {
      background-color: #f1f5f9 !important; /* Soft bright slate */
      border-left: 5px solid #64748b !important;
    }
    .appsheet-row.row-status-slate:hover {
      background-color: #e2e8f0 !important;
    }

    .appsheet-row.row-status-cyan {
      background-color: #cffafe !important; /* Soft bright cyan */
      border-left: 5px solid #06b6d4 !important;
    }
    .appsheet-row.row-status-cyan:hover {
      background-color: #a5f3fc !important;
    }

    .appsheet-row[class*="row-status-"] td {
      background-color: transparent !important;
    }

    /* AppSheet Panel Action Buttons (Add, Edit) */
    .btn-appsheet-panel-action {
      background: #ffffff;
      border: 1px solid var(--appsheet-border);
      border-radius: 4px;
      font-size: 0.78rem;
      font-weight: 500;
      color: #3c4043;
      padding: 3px 10px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s ease;
    }
    .btn-appsheet-panel-action:hover {
      background: #f1f3f4;
      border-color: #bdc1c6;
      color: #202124;
    }
    .btn-appsheet-panel-action.btn-action-gold {
      background-color: var(--appsheet-gold);
      border-color: var(--appsheet-gold);
      color: #ffffff;
    }
    .btn-appsheet-panel-action.btn-action-gold:hover {
      background-color: var(--appsheet-gold-hover);
      border-color: var(--appsheet-gold-hover);
      color: #ffffff;
    }

    /* Inner Card Expansion */
    .trip-detail-card.is-inner-expanded {
      grid-column: 1 / -1 !important;
      box-shadow: 0 4px 14px rgba(60,64,67,0.18) !important;
    }
"""

if '/* Full Row Background Colors' not in html:
    html = html.replace('</style>', extra_css + '\n  </style>')

# Update sidebar toggle button in header
old_sidebar_btn = '<button id="sidebar-toggle" class="btn btn-light d-lg-none" title="Toggle Sidebar">\n          <i class="bi bi-list fs-5"></i>\n        </button>'
new_sidebar_btn = '<button id="sidebar-toggle" class="btn btn-light border-0 p-1 me-1" title="Toggle Sidebar (Hide / Unhide)" onclick="OwnersModule.toggleSidebar()">\n          <i class="bi bi-list fs-4 text-dark"></i>\n        </button>'

if old_sidebar_btn in html:
    html = html.replace(old_sidebar_btn, new_sidebar_btn)
else:
    # regex replace if whitespace differs
    html = re.sub(
        r'<button id="sidebar-toggle"[^>]*>.*?<\/button>',
        new_sidebar_btn,
        html,
        flags=re.DOTALL
    )

# Add Interactive Drawers for Trip Details Edit, Debt Add/Edit, and Payment Add/Edit
drawers_html = """
  <!-- AppSheet Slide Drawer: Edit Trip Details -->
  <div class="appsheet-drawer-backdrop" id="tripDrawerBackdrop" onclick="OwnersModule.closeTripDrawer()"></div>
  <aside class="appsheet-drawer" id="tripDrawer">
    <div class="drawer-header">
      <div class="drawer-header-left">
        <button type="button" class="drawer-close-btn" onclick="OwnersModule.closeTripDrawer()" title="Close">
          <i class="bi bi-x fs-4"></i>
        </button>
        <h5 class="drawer-title" id="tripDrawerTitle">Edit Trip Details</h5>
      </div>
      <div class="drawer-header-right">
        <button type="button" class="btn-drawer-cancel" onclick="OwnersModule.closeTripDrawer()">Cancel</button>
        <button type="submit" form="tripDrawerForm" class="btn-drawer-save">
          <i class="bi bi-check2 me-1"></i> Save
        </button>
      </div>
    </div>
    <form id="tripDrawerForm" onsubmit="OwnersModule.saveTripDrawer(event)">
      <div class="drawer-body">
        <input type="hidden" id="drawer-trip-id">
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">G.R. No.</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-gr" class="appsheet-form-control font-monospace" readonly>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Truck No. *</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-truck" class="appsheet-form-control font-monospace fw-bold text-uppercase" required>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Owner Name</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-owner" class="appsheet-form-control">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Status *</label>
          <div class="appsheet-form-input-wrap">
            <select id="drawer-trip-status" class="appsheet-form-control" required onchange="OwnersModule.handleTripStatusChange(this.value)">
              <option value="Transit">Transit (Yellow)</option>
              <option value="POD Sent/ Bill Generated">POD Sent/ Bill Generated (Purple)</option>
              <option value="Party Payment Pending">Party Payment Pending (Blue)</option>
              <option value="Off Loading">Off Loading (Pink)</option>
              <option value="Cheque Due">Cheque Due (Slate)</option>
              <option value="Truck Owner Payment Pending">Truck Owner Payment Pending (Cyan)</option>
            </select>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Origin</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-origin" class="appsheet-form-control">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Destination</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-dest" class="appsheet-form-control">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Material</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-mat" class="appsheet-form-control">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Weight (MT)</label>
          <div class="appsheet-form-input-wrap">
            <input type="number" step="0.001" id="drawer-trip-weight" class="appsheet-form-control font-monospace">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Rate (₹)</label>
          <div class="appsheet-form-input-wrap">
            <input type="number" step="0.01" id="drawer-trip-rate" class="appsheet-form-control font-monospace">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Total Freight (₹)</label>
          <div class="appsheet-form-input-wrap">
            <input type="number" step="0.01" id="drawer-trip-freight" class="appsheet-form-control font-monospace">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Owner Due (₹) *</label>
          <div class="appsheet-form-input-wrap">
            <input type="number" step="0.01" id="drawer-trip-due" class="appsheet-form-control font-monospace fw-bold text-danger" required>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Driver Name</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-trip-driver" class="appsheet-form-control">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Driver Mobile</label>
          <div class="appsheet-form-input-wrap">
            <input type="tel" id="drawer-trip-driver-mob" class="appsheet-form-control font-monospace">
          </div>
        </div>
      </div>
    </form>
  </aside>

  <!-- AppSheet Slide Drawer: Add / Edit Debt -->
  <div class="appsheet-drawer-backdrop" id="debtDrawerBackdrop" onclick="OwnersModule.closeDebtDrawer()"></div>
  <aside class="appsheet-drawer" id="debtDrawer">
    <div class="drawer-header">
      <div class="drawer-header-left">
        <button type="button" class="drawer-close-btn" onclick="OwnersModule.closeDebtDrawer()" title="Close">
          <i class="bi bi-x fs-4"></i>
        </button>
        <h5 class="drawer-title" id="debtDrawerTitle">Add Open Debt</h5>
      </div>
      <div class="drawer-header-right">
        <button type="button" class="btn-drawer-cancel" onclick="OwnersModule.closeDebtDrawer()">Cancel</button>
        <button type="submit" form="debtDrawerForm" class="btn-drawer-save">
          <i class="bi bi-check2 me-1"></i> Save Debt
        </button>
      </div>
    </div>
    <form id="debtDrawerForm" onsubmit="OwnersModule.saveDebtDrawer(event)">
      <div class="drawer-body">
        <input type="hidden" id="drawer-debt-trip-id">
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Debt Type *</label>
          <div class="appsheet-form-input-wrap">
            <select id="drawer-debt-type" class="appsheet-form-control" required>
              <option value="Commission">Commission</option>
              <option value="Other">Other Advance</option>
              <option value="Diesel">Diesel Advance</option>
              <option value="Toll">Toll / RTO</option>
            </select>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Debt Amount (₹) *</label>
          <div class="appsheet-form-input-wrap">
            <input type="number" step="0.01" id="drawer-debt-amount" class="appsheet-form-control font-monospace fw-bold" placeholder="2500" required>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Payment Mode *</label>
          <div class="appsheet-form-input-wrap">
            <select id="drawer-debt-mode" class="appsheet-form-control" required>
              <option value="Cash">Cash</option>
              <option value="Online">Online / UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Borrower Name</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-debt-borrower" class="appsheet-form-control">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Receiver Name</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-debt-receiver" class="appsheet-form-control" placeholder="Bajrang Meena 7297032726">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Description</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-debt-desc" class="appsheet-form-control" placeholder="Advance on Loading">
          </div>
        </div>
      </div>
    </form>
  </aside>

  <!-- AppSheet Slide Drawer: Add / Edit Payment -->
  <div class="appsheet-drawer-backdrop" id="paymentDrawerBackdrop" onclick="OwnersModule.closePaymentDrawer()"></div>
  <aside class="appsheet-drawer" id="paymentDrawer">
    <div class="drawer-header">
      <div class="drawer-header-left">
        <button type="button" class="drawer-close-btn" onclick="OwnersModule.closePaymentDrawer()" title="Close">
          <i class="bi bi-x fs-4"></i>
        </button>
        <h5 class="drawer-title" id="paymentDrawerTitle">Record Payment</h5>
      </div>
      <div class="drawer-header-right">
        <button type="button" class="btn-drawer-cancel" onclick="OwnersModule.closePaymentDrawer()">Cancel</button>
        <button type="submit" form="paymentDrawerForm" class="btn-drawer-save">
          <i class="bi bi-check2 me-1"></i> Save Payment
        </button>
      </div>
    </div>
    <form id="paymentDrawerForm" onsubmit="OwnersModule.savePaymentDrawer(event)">
      <div class="drawer-body">
        <input type="hidden" id="drawer-payment-trip-id">
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Amount Paid (₹) *</label>
          <div class="appsheet-form-input-wrap">
            <input type="number" step="0.01" id="drawer-payment-amount" class="appsheet-form-control font-monospace fw-bold text-success" required>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Payment Date *</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-payment-date" class="appsheet-form-control font-monospace" required>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Payment Mode *</label>
          <div class="appsheet-form-input-wrap">
            <select id="drawer-payment-mode" class="appsheet-form-control" required>
              <option value="NEFT/RTGS">NEFT/RTGS</option>
              <option value="Cheque">Cheque</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Beneficiary / Bank</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-payment-bank" class="appsheet-form-control" placeholder="TTC">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Paid To</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-payment-paidto" class="appsheet-form-control" placeholder="Transporter / Owner">
          </div>
        </div>
        <div class="appsheet-form-row">
          <label class="appsheet-form-label">Description / Cheque No.</label>
          <div class="appsheet-form-input-wrap">
            <input type="text" id="drawer-payment-desc" class="appsheet-form-control">
          </div>
        </div>
      </div>
    </form>
  </aside>
"""

if 'id="tripDrawer"' not in html:
    html = html.replace('<!-- Bootstrap 5 Bundle JS -->', drawers_html + '\n  <!-- Bootstrap 5 Bundle JS -->')

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated pages/owners.html with CSS, Sidebar Toggle, and Action Drawers!')
