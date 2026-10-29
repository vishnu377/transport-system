# Script to apply authentic Bengani (Purple) and multi-color 3-card drilldown view
# Based on screenshots in C:\Users\HP\Downloads\owners second card owner due\bengani color

import re

# ========================================================
# 1. UPDATE pages/owners.html CSS and Layout
# ========================================================
with open('pages/owners.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add / Update Drilldown CSS styles for Bengani and other themes
new_css = """
    /* --- Google AppSheet Exact Bengani (Purple) & Multi-Color Drilldown View --- */
    .theme-purple .theme-dot { color: #7c00ff !important; }
    .theme-purple .theme-text { color: #7c00ff !important; font-weight: 600; }
    .theme-purple .theme-icon { color: #7c00ff !important; }
    .theme-purple .theme-link { color: #7c00ff !important; text-decoration: none; }
    .theme-purple .theme-link:hover { text-decoration: underline; }
    .theme-purple .drilldown-subtable td.theme-text { color: #7c00ff !important; }

    /* AppSheet Quick Action Chips (from WhatsApp screenshots) */
    .appsheet-action-chips-container {
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #f1f3f4;
    }
    .action-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      font-size: 11.5px;
      font-weight: 500;
      border-radius: 14px;
      border: 1px solid #dadce0;
      background: #ffffff;
      color: #3c4043;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      white-space: nowrap;
      text-decoration: none;
      line-height: 1.3;
    }
    .action-chip:hover {
      background: #f8f9fa;
      border-color: #bdc1c6;
      color: #202124;
    }
    .action-chip .chip-dot {
      font-size: 9px;
    }
    .action-chip.chip-active-purple {
      background: #f3e8ff;
      border-color: #7c00ff;
      color: #7c00ff;
      font-weight: 600;
    }
    .action-chip.chip-active-purple .chip-dot {
      color: #7c00ff;
    }
    .action-chip.chip-active-pink {
      background: #fce4ec;
      border-color: #e91e63;
      color: #e91e63;
      font-weight: 600;
    }
    .action-chip.chip-active-pink .chip-dot {
      color: #e91e63;
    }
    .action-chip.chip-active-slate {
      background: #f1f3f4;
      border-color: #5f6368;
      color: #3c4043;
      font-weight: 600;
    }
    .action-chip.chip-active-slate .chip-dot {
      color: #5f6368;
    }
    .action-chip.chip-active-yellow {
      background: #fef9e7;
      border-color: #c3ad00;
      color: #bfa100;
      font-weight: 600;
    }
    .action-chip.chip-active-yellow .chip-dot {
      color: #c3ad00;
    }
    .action-chip.chip-active-cyan {
      background: #e1f5fe;
      border-color: #0088cc;
      color: #0088cc;
      font-weight: 600;
    }
    .action-chip.chip-active-cyan .chip-dot {
      color: #0088cc;
    }
    .action-chip.chip-active-blue {
      background: #e8f0fe;
      border-color: #1a73e8;
      color: #1a73e8;
      font-weight: 600;
    }
    .action-chip.chip-active-blue .chip-dot {
      color: #1a73e8;
    }

    /* Open Debts Section (19_54_51.png) */
    .drilldown-debts-section {
      background: #ffffff;
      border: 1px solid var(--appsheet-border);
      border-radius: 4px;
      padding: 14px 18px;
      box-shadow: 0 1px 2px rgba(60,64,67,0.06);
      margin-top: 16px;
    }
    #open-debts-table th {
      font-size: 11.5px;
      font-weight: 600;
      color: #5f6368;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dadce0;
      padding: 7px 10px;
    }
    #open-debts-table td {
      font-size: 11.5px;
      color: #202124;
      padding: 6.5px 10px;
      border-bottom: 1px solid #f1f3f4;
      white-space: nowrap;
    }
    #open-debts-table tr:hover td {
      background-color: #f8f9fa;
    }
"""

if '/* --- Google AppSheet Exact Bengani (Purple) & Multi-Color Drilldown View --- */' not in html:
    # Insert right before </style>
    style_end = html.find('</style>')
    if style_end != -1:
        html = html[:style_end] + new_css + html[style_end:]
        print("Added new CSS rules to pages/owners.html")

# Ensure drilldown-debts-container is inside viewOpenTripDetails
if 'id="drilldown-debts-container"' not in html:
    target_drilldown_end = '<!-- Card 3 (Right - Consignee & Owner Details & Actions) -->\n            <div class="drilldown-card" id="drilldown-card-right"></div>\n          </div>\n        </div>'
    replace_drilldown_end = '<!-- Card 3 (Right - Consignee & Owner Details & Actions) -->\n            <div class="drilldown-card" id="drilldown-card-right"></div>\n          </div>\n          <!-- Below: Open Debts Table (matching 19_54_51.png) -->\n          <div id="drilldown-debts-container"></div>\n        </div>'
    if target_drilldown_end in html:
        html = html.replace(target_drilldown_end, replace_drilldown_end, 1)
        print("Added drilldown-debts-container to pages/owners.html (LF)")
    else:
        target_drilldown_end_crlf = target_drilldown_end.replace('\n', '\r\n')
        replace_drilldown_end_crlf = replace_drilldown_end.replace('\n', '\r\n')
        if target_drilldown_end_crlf in html:
            html = html.replace(target_drilldown_end_crlf, replace_drilldown_end_crlf, 1)
            print("Added drilldown-debts-container to pages/owners.html (CRLF)")

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("pages/owners.html updated successfully!")
