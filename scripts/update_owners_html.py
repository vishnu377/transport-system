# -*- coding: utf-8 -*-
import os, re

with open('pages/owners.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix CSS:
# - Hide Card 1 footer when not expanded
# - Remove harsh blue button styles, set exact Google AppSheet buttons
# - Date group header styling
# - Full row coloring transparent td

custom_css = '''
    /* Google AppSheet Exact Buttons */
    .btn-appsheet-add,
    .btn-appsheet-edit {
      background-color: #ffffff !important;
      color: #3c4043 !important;
      font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      font-weight: 500;
      font-size: 0.82rem;
      line-height: 1.2;
      padding: 0.32rem 0.85rem;
      border-radius: 4px;
      border: 1px solid #dadce0 !important;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      letter-spacing: 0.2px;
      box-shadow: 0 1px 2px rgba(60,64,67,0.08);
      transition: background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }
    .btn-appsheet-add:hover,
    .btn-appsheet-edit:hover {
      background-color: #f1f3f4 !important;
      border-color: #bdc1c6 !important;
      color: #202124 !important;
      box-shadow: 0 1px 3px rgba(60,64,67,0.15);
    }
    .btn-appsheet-panel-action {
      background: #ffffff;
      border: 1px solid #dadce0;
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

    /* Hide Card 1 Pagination in Dashboard Normal View (Only show when expanded!) */
    #cardTruckOwners:not(.panel-expanded) .appsheet-panel-footer {
      display: none !important;
    }
    #cardTruckOwners.panel-expanded .appsheet-panel-footer {
      display: flex !important;
    }
    #cardTruckOwners:not(.panel-expanded) .appsheet-table-wrap {
      max-height: 480px;
      overflow-y: auto;
    }

    /* Google AppSheet Date Group Header */
    .appsheet-date-group-header td {
      background-color: #f8f9fa !important;
      font-size: 0.84rem;
      font-weight: 600;
      color: #202124;
      padding: 7px 14px !important;
      border-top: 1px solid #e8eaed !important;
      border-bottom: 1px solid #dadce0 !important;
    }

    /* Full Row Coloring for Owner Due table */
    .row-status-yellow { background-color: #fefce8 !important; border-left: 4px solid #eab308 !important; }
    .row-status-purple { background-color: #faf5ff !important; border-left: 4px solid #a855f7 !important; }
    .row-status-blue   { background-color: #f0f9ff !important; border-left: 4px solid #0284c7 !important; }
    .row-status-pink   { background-color: #fdf2f8 !important; border-left: 4px solid #ec4899 !important; }
    .row-status-slate  { background-color: #f8fafc !important; border-left: 4px solid #64748b !important; }
    .row-status-cyan   { background-color: #ecfeff !important; border-left: 4px solid #06b6d4 !important; }

    .appsheet-row[class*="row-status-"] td {
      background-color: transparent !important;
    }
    .appsheet-row[class*="row-status-"]:hover {
      filter: brightness(0.97);
    }
'''

# Insert custom css right before </style>
if '</style>' in content:
    content = content.replace('</style>', custom_css + '\n  </style>', 1)

# 2. Fix the duplicate open-trip-cards-container and misplaced div
bad_block = '''        <!-- Authentic Google AppSheet 3-Panel Grid Layout (Panel 1: Trip Details, Panel 2: Consignor/s 1, Panel 3: Payment/Debts) -->
        <div class="appsheet-3panel-grid" id="open-trip-cards-container">
          <!-- Dynamically populated with stacked key-value items -->
        </div>
      </div>

        <!-- Dynamic Grid of Cards matching user's 6 color categories -->
        <div class="open-trip-cards-grid" id="open-trip-cards-container">
          <!-- Populated dynamically -->
        </div>
      </div>'''

clean_block = '''        <!-- Authentic Google AppSheet 3-Panel Grid Layout (Panel 1: Trip Details, Panel 2: Consignor/s 1, Panel 3: Payment/Debts) -->
        <div class="appsheet-3panel-grid" id="open-trip-cards-container">
          <!-- Dynamically populated with stacked key-value items -->
        </div>
      </div>'''

if bad_block in content:
    content = content.replace(bad_block, clean_block, 1)

# 3. Update viewOwnerDueList table headers to match Google AppSheet screenshot 19_33_45.png
old_due_header = '''                <thead>
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
                </thead>'''

new_due_header = '''                <thead>
                  <tr>
                    <th style="min-width: 100px;">G.R.No.</th>
                    <th style="min-width: 120px;">Trip Start Date</th>
                    <th style="min-width: 130px;">Owner Due</th>
                    <th style="min-width: 135px;">Truck No.</th>
                    <th style="min-width: 180px;">Owner</th>
                    <th style="min-width: 140px;">Destination</th>
                    <th style="min-width: 90px;">Transport</th>
                    <th style="min-width: 190px;">Reference</th>
                    <th style="min-width: 140px;">Driver</th>
                  </tr>
                </thead>'''

if old_due_header in content:
    content = content.replace(old_due_header, new_due_header, 1)

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated pages/owners.html successfully!")
