# -*- coding: utf-8 -*-
import re

with open('pages/owners.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. CSS Insertion
css_target = ".dot-cyan { background-color: #00bfa5; }"
css_replacement = """    .dot-cyan { background-color: #00bcd4; }
    .dot-blue { background-color: #1a73e8; }
    .dot-pink { background-color: #e91e63; }
    .dot-green { background-color: #2e7d32; }
    .dot-yellow { background-color: #e5a823; }
    .dot-purple { background-color: #9c27b0; }
    .dot-slate { background-color: #607d8b; }

    /* Badge Status */
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.78rem;
      font-weight: 500;
    }
    .badge-status-yellow { background: #fff8e1; color: #b78103; border: 1px solid #ffe082; }
    .badge-status-purple { background: #f3e5f5; color: #7b1fa2; border: 1px solid #e1bee7; }
    .badge-status-blue { background: #e8f0fe; color: #1967d2; border: 1px solid #aecbfa; }
    .badge-status-pink { background: #fce4ec; color: #c2185b; border: 1px solid #f8bbd0; }
    .badge-status-slate { background: #eceff1; color: #455a64; border: 1px solid #cfd8dc; }
    .badge-status-cyan { background: #e0f7fa; color: #00838f; border: 1px solid #80deea; }

    /* Owner Due Split Layout */
    .owners-due-split {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 14px;
      align-items: stretch;
      min-height: calc(100vh - 130px);
    }
    @media (max-width: 900px) {
      .owners-due-split {
        grid-template-columns: 1fr;
      }
    }

    .open-trip-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 16px;
      align-items: stretch;
      margin-bottom: 24px;
    }

    .trip-detail-card {
      background: #ffffff;
      border: 1px solid var(--appsheet-border);
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(60,64,67,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.15s ease, border-color 0.15s ease;
    }
    .trip-detail-card.is-clickable {
      cursor: pointer;
    }
    .trip-detail-card.is-clickable:hover {
      box-shadow: 0 3px 8px rgba(60,64,67,0.16);
      border-color: #bdc1c6;
    }
    .trip-detail-card-header {
      padding: 12px 18px;
      background: #fbfbfb;
      border-bottom: 1px solid var(--appsheet-border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .trip-detail-card-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #202124;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .trip-detail-card-body {
      padding: 16px 20px;
      flex: 1;
    }
    .trip-field-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 8px 0;
      border-bottom: 1px solid #f1f3f4;
      font-size: 0.88rem;
    }
    .trip-field-row:last-child {
      border-bottom: none;
    }
    .trip-field-label {
      color: #5f6368;
      font-weight: 500;
      flex: 0 0 140px;
    }
    .trip-field-value {
      color: #202124;
      font-weight: 500;
      text-align: right;
      flex: 1;
      word-break: break-word;
    }
    .appsheet-summary-item.active {
      background-color: #f1f3f4 !important;
      border-left: 3px solid var(--appsheet-gold);
    }
    .appsheet-summary-item.active .fw-semibold {
      color: #000 !important;
      font-weight: 700 !important;
    }"""

# Replace the 4 dot colors with our expanded list and rules
dot_block = """.dot-cyan { background-color: #00bfa5; }
    .dot-blue { background-color: #1a73e8; }
    .dot-pink { background-color: #e91e63; }
    .dot-green { background-color: #2e7d32; }"""

if dot_block in html:
    html = html.replace(dot_block, css_replacement)
elif css_target in html:
    html = html.replace(css_target, css_replacement)

# 2. Add Views HTML
views_html = """
      <!-- VIEW 3: Owner Due Split Table View (Exact Match to screencapture-appsheet-start-...-19_33_45.png) -->
      <div id="viewOwnerDueList" style="display: none;">
        <div class="owners-due-split">
          <!-- Left Column: Year Filter Card -->
          <div class="appsheet-panel" style="height: 100%; border-radius: 6px;">
            <div class="appsheet-panel-header">
              <h6 class="appsheet-panel-title">Owner Due</h6>
            </div>
            <div class="appsheet-panel-subheader">
              <span class="fw-semibold">Year</span>
            </div>
            <div class="appsheet-summary-list">
              <!-- All -->
              <div class="appsheet-summary-item active" id="due-year-tab-ALL" onclick="OwnersModule.selectDueYear('ALL')">
                <span class="fw-semibold text-dark">All</span>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-light text-dark border small" id="due-year-count-ALL">489</span>
                  <i class="bi bi-chevron-right text-muted small"></i>
                </div>
              </div>
              <!-- 2026-2027 -->
              <div class="appsheet-summary-item" id="due-year-tab-2026-2027" onclick="OwnersModule.selectDueYear('2026-2027')">
                <div>
                  <span class="appsheet-dot dot-cyan"></span>
                  <span class="fw-semibold text-dark">2026-2027</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="summary-amount" id="due-year-amount-2026-2027">₹ 30,021,934.22</span>
                  <i class="bi bi-chevron-right text-muted small"></i>
                </div>
              </div>
              <!-- 2025-2026 -->
              <div class="appsheet-summary-item" id="due-year-tab-2025-2026" onclick="OwnersModule.selectDueYear('2025-2026')">
                <div>
                  <span class="appsheet-dot dot-blue"></span>
                  <span class="fw-semibold text-dark">2025-2026</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="summary-amount" id="due-year-amount-2025-2026">₹ 1,641,456.00</span>
                  <i class="bi bi-chevron-right text-muted small"></i>
                </div>
              </div>
              <!-- 2024-2025 -->
              <div class="appsheet-summary-item" id="due-year-tab-2024-2025" onclick="OwnersModule.selectDueYear('2024-2025')">
                <div>
                  <span class="appsheet-dot dot-pink"></span>
                  <span class="fw-semibold text-dark">2024-2025</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="summary-amount" id="due-year-amount-2024-2025">₹ 12,221.00</span>
                  <i class="bi bi-chevron-right text-muted small"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Owner Due Table Panel -->
          <div class="appsheet-panel" style="height: 100%; border-radius: 6px;">
            <div class="appsheet-panel-header">
              <div class="d-flex align-items-center gap-2">
                <h6 class="appsheet-panel-title">Owner Due</h6>
                <span class="badge bg-secondary-subtle text-secondary fw-medium" id="due-active-year-badge">All</span>
              </div>
              <div class="appsheet-panel-tools">
                <div class="appsheet-search-box-sm d-none d-sm-flex align-items-center border rounded px-2 py-1 bg-white">
                  <i class="bi bi-search text-muted small me-1"></i>
                  <input type="text" id="search-owner-dues" class="border-0 outline-none small" placeholder="Search dues..." onkeyup="OwnersModule.handleDueSearch(this.value)" style="outline: none; width: 140px; font-size: 0.82rem;">
                </div>
                <i class="bi bi-funnel" title="Filter" onclick="OwnersModule.focusDueSearch()"></i>
                <button class="btn btn-sm btn-outline-secondary py-0 px-2" style="font-size: 0.78rem;" onclick="OwnersModule.exportOwnerDuesCSV()">
                  <i class="bi bi-download me-1"></i> CSV
                </button>
              </div>
            </div>

            <!-- Table Header Subline -->
            <div class="appsheet-panel-subheader">
              <div>
                <span class="fw-semibold">Date</span>
                <span class="appsheet-chip-number" id="owner-dues-header-count">Number 489</span>
              </div>
              <span class="text-muted small" id="owner-dues-showing-text">489 records</span>
            </div>

            <!-- Owner Due Table Wrap -->
            <div class="appsheet-table-wrap">
              <table class="appsheet-table">
                <thead>
                  <tr>
                    <th style="min-width: 125px;">Date</th>
                    <th style="min-width: 130px;">Owner Due</th>
                    <th style="min-width: 135px;">Truck No.</th>
                    <th style="min-width: 180px;">Name</th>
                    <th style="min-width: 140px;">Destination</th>
                    <th style="min-width: 90px;">Company</th>
                    <th style="min-width: 190px;">Party Name</th>
                    <th style="min-width: 140px;">Driver</th>
                    <th style="width: 30px;"></th>
                  </tr>
                </thead>
                <tbody id="owner-dues-tbody">
                  <tr>
                    <td colspan="9" class="text-center py-5 text-muted">
                      <div class="spinner-border spinner-border-sm text-secondary me-2"></div> Loading owner dues...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Docked Pagination Footer -->
            <div class="appsheet-panel-footer border-top px-3 py-2">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted" style="font-size: 0.82rem;">
                <div class="d-flex align-items-center gap-2">
                  <span id="due-pagination-info" class="fw-medium text-dark">1 - 50 of 489</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="small">Rows:</span>
                  <select id="due-page-size-select" class="form-select form-select-sm py-0 px-2 text-muted" style="width: auto; font-size: 0.82rem; height: 28px;" onchange="OwnersModule.changeDuePageSize(this.value)">
                    <option value="50" selected>50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div class="d-flex align-items-center gap-1">
                  <button type="button" class="btn btn-sm btn-light border py-0 px-2" id="btn-due-page-first" title="First Page" onclick="OwnersModule.goToDuePage(1)">
                    <i class="bi bi-chevron-double-left small"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-light border py-0 px-2" id="btn-due-page-prev" title="Previous Page" onclick="OwnersModule.prevDuePage()">
                    <i class="bi bi-chevron-left small"></i>
                  </button>
                  <span class="mx-2 small text-dark fw-medium" id="due-pagination-page-num">Page 1 of 10</span>
                  <button type="button" class="btn btn-sm btn-light border py-0 px-2" id="btn-due-page-next" title="Next Page" onclick="OwnersModule.nextDuePage()">
                    <i class="bi bi-chevron-right small"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-light border py-0 px-2" id="btn-due-page-last" title="Last Page" onclick="OwnersModule.goToDueLastPage()">
                    <i class="bi bi-chevron-double-right small"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 4: Open Trip Details (Inner Cards Grid based on 6 Color Categories) -->
      <div id="viewOpenTripDetails" style="display: none;">
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-light border" onclick="OwnersModule.backToDueList()">
              <i class="bi bi-arrow-left me-1"></i> Back to Owner Due
            </button>
            <span class="fw-bold fs-5 text-dark" id="trip-details-gr-title">Trip Details</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span id="trip-details-status-badge"></span>
          </div>
        </div>

        <!-- Dynamic Grid of Cards matching user's 6 color categories -->
        <div class="open-trip-cards-grid" id="open-trip-cards-container">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- VIEW 5: Consignor & Consignee Details Full Sheet -->
      <div id="viewOpenTripPartyDetails" style="display: none;">
        <div class="mb-3">
          <button class="btn btn-sm btn-light border" onclick="OwnersModule.backToTripDetails()">
            <i class="bi bi-arrow-left me-1"></i> Back to Trip Details
          </button>
        </div>
        <div class="appsheet-details-card" style="max-width: 680px; margin: 12px auto;">
          <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <h5 class="m-0 fw-bold text-dark"><i class="bi bi-building me-2 text-primary"></i>Consignor & Consignee Details</h5>
            <span class="badge bg-light text-secondary border font-monospace" id="party-sheet-gr-no">-</span>
          </div>
          <div id="party-details-card-content">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>

      <!-- VIEW 6: Trip Payment Full Details Sheet -->
      <div id="viewTripPaymentDetails" style="display: none;">
        <div class="mb-3">
          <button class="btn btn-sm btn-light border" onclick="OwnersModule.backToTripDetails()">
            <i class="bi bi-arrow-left me-1"></i> Back to Trip Details
          </button>
        </div>
        <div class="appsheet-details-card" style="max-width: 680px; margin: 12px auto;">
          <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <h5 class="m-0 fw-bold text-dark"><i class="bi bi-cash-stack me-2 text-success"></i>Trip Truck Owner Payment Details</h5>
            <span class="badge bg-light text-secondary border font-monospace" id="payment-sheet-gr-no">-</span>
          </div>
          <div id="payment-details-card-content">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>
"""

# Insert views before </main>
if '</main>' in html and 'viewOwnerDueList' not in html:
    html = html.replace('</main>', views_html + '\n    </main>')

# 3. Add script tag for sample-owner-dues-data.js if missing
if 'sample-owner-dues-data.js' not in html:
    html = html.replace(
        '<script src="../js/sample-truck-owners-data.js"></script>',
        '<script src="../js/sample-truck-owners-data.js"></script>\n  <script src="../js/sample-owner-dues-data.js"></script>'
    )

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated pages/owners.html successfully!')
