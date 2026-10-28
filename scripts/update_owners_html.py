# -*- coding: utf-8 -*-
import os, re

with open('pages/owners.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Add CSS for .appsheet-3col-layout and .appsheet-col
col_css = '''
    /* Google AppSheet Exact 3-Column Layout for Open Trip Details */
    .appsheet-3col-layout {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1024px) {
      .appsheet-3col-layout {
        grid-template-columns: 1fr;
      }
    }
    .appsheet-3col-layout .appsheet-panel.panel-expanded {
      grid-column: 1 / -1 !important;
      width: 100% !important;
    }
    .appsheet-col {
      min-width: 0;
    }
'''

if '.appsheet-3col-layout' not in text:
    text = text.replace('</style>', col_css + '\n  </style>', 1)

# Ensure viewOpenTripDetails has clean header and container
old_open_trip = re.search(r'<div id="viewOpenTripDetails".*?</div>\s*</div>\s*(?=<div id="viewOpenTripPartyDetails")', text, re.DOTALL)
if old_open_trip:
    clean_open_trip = '''<div id="viewOpenTripDetails" style="display: none;">
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-light border" onclick="OwnersModule.backToDueList()">
              <i class="bi bi-arrow-left me-1"></i> Back to Owner Due
            </button>
            <span class="fw-bold fs-6 text-dark" id="trip-details-gr-title">Open Trip Details</span>
          </div>
        </div>

        <div class="appsheet-3col-layout" id="open-trip-cards-container">
          <!-- Dynamically populated according to color category -->
        </div>
      </div>'''
    text = text.replace(old_open_trip.group(0), clean_open_trip, 1)

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated pages/owners.html with appsheet-3col-layout!")
