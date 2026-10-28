# -*- coding: utf-8 -*-
import os, re

with open('scripts/deploy_exact_appsheet_js.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace renderOwnerDueTable with Date Groups and the authentic 9 columns
old_render_match = re.search(r'  renderOwnerDueTable\(\) \{.*?\n  updateDuePaginationUI\(', text, re.DOTALL)
if not old_render_match:
    print("Could not find renderOwnerDueTable block!")
    exit(1)

new_render = '''  renderOwnerDueTable() {
    const tbody = document.getElementById('owner-dues-tbody');
    if (!tbody) return;

    const filtered = this.getFilteredOwnerDues();
    const totalCount = this.allOwnerDues.length;
    const filteredCount = filtered.length;
    const totalPages = this.getDueTotalPages();

    if (this.dueCurrentPage > totalPages) {
      this.dueCurrentPage = totalPages;
    }

    const headerCount = document.getElementById('owner-dues-header-count');
    if (headerCount) headerCount.innerText = `Number ${filteredCount}`;

    const showingText = document.getElementById('owner-dues-showing-text');
    if (showingText) {
      if (this.dueSearchQuery || this.selectedDueYear !== 'ALL') {
        showingText.innerText = `${filteredCount} of ${totalCount} records`;
      } else {
        showingText.innerText = `${totalCount} records`;
      }
    }

    if (filteredCount === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-1"></i> No matching owner due records found for ${this.selectedDueYear}.
          </td>
        </tr>
      `;
      this.updateDuePaginationUI(0, 0, 0, 1, 1);
      return;
    }

    let pageItems = [];
    let startIdx = 0;
    let endIdx = 0;

    if (this.duePageSize === 'all') {
      pageItems = filtered;
      startIdx = 1;
      endIdx = filteredCount;
    } else {
      startIdx = (this.dueCurrentPage - 1) * this.duePageSize + 1;
      endIdx = Math.min(this.dueCurrentPage * this.duePageSize, filteredCount);
      pageItems = filtered.slice(startIdx - 1, endIdx);
    }

    // Pre-calculate date group totals matching AppSheet
    const dateTotals = {};
    filtered.forEach(item => {
      const dt = item.tripDate || item.tripStartDate || item.date || '-';
      dateTotals[dt] = (dateTotals[dt] || 0) + Number(item.dueAmount || item.ownerDue || 0);
    });

    let html = '';
    let lastRenderedDate = null;

    pageItems.forEach(d => {
      const safeTripId = String(d.id || d.grNo);
      const col = d.color || 'yellow';
      const dt = d.tripDate || d.tripStartDate || d.date || '-';
      const refName = d.reference || d.partyName || d.consignee?.name || '-';
      const ownerVal = d.ownerName || d.owner || '-';

      // Insert Date Group Header if date changed
      if (dt !== lastRenderedDate) {
        lastRenderedDate = dt;
        const groupTotal = dateTotals[dt] || Number(d.dueAmount || d.ownerDue || 0);
        html += `
          <tr class="appsheet-date-group-header">
            <td colspan="9">
              <div class="d-flex align-items-center justify-content-between">
                <span><i class="bi bi-caret-down-fill me-1 text-secondary"></i> ${dt}</span>
                <span class="font-monospace fw-bold">${this.formatCurrency(groupTotal)}</span>
              </div>
            </td>
          </tr>
        `;
      }

      // PURI KI PURI ROW KA COLOR AATA HAI (.row-status-${col})
      html += `
        <tr class="appsheet-row row-status-${col}" onclick="OwnersModule.showOpenTripDetails('${safeTripId}')" style="cursor: pointer;" title="Status: ${d.status}">
          <!-- 1. G.R.No. with status dot -->
          <td class="font-monospace fw-bold text-primary">
            <span class="appsheet-dot dot-${col} me-1"></span>
            ${d.grNo || '-'}
          </td>

          <!-- 2. Trip Start Date -->
          <td>
            <span class="text-dark fw-medium">${dt}</span>
          </td>

          <!-- 3. Owner Due Amount -->
          <td>
            <span class="fw-bold font-monospace text-dark">${this.formatCurrency(d.dueAmount || d.ownerDue || 0)}</span>
          </td>

          <!-- 4. Truck No. -->
          <td>
            <span class="fw-bold font-monospace text-dark">${d.truckNo || '-'}</span>
          </td>

          <!-- 5. Owner -->
          <td>
            <div class="fw-semibold text-dark text-truncate" style="max-width: 170px;" title="${ownerVal}">${ownerVal}</div>
          </td>

          <!-- 6. Destination -->
          <td>
            <div class="text-secondary text-truncate" style="max-width: 130px;" title="${d.destination || ''}">${d.destination || '-'}</div>
          </td>

          <!-- 7. Transport -->
          <td>
            <span class="badge bg-white text-dark border font-monospace shadow-sm">${d.transport || 'TTC'}</span>
          </td>

          <!-- 8. Reference -->
          <td>
            <div class="text-dark text-truncate fw-medium" style="max-width: 180px;" title="${refName}">${refName}</div>
          </td>

          <!-- 9. Driver -->
          <td>
            <div class="text-muted text-truncate" style="max-width: 130px;" title="${d.driver || ''}">${d.driver || '-'}</div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
    this.updateDuePaginationUI(startIdx, endIdx, filteredCount, this.dueCurrentPage, totalPages);
  },

  updateDuePaginationUI('''

old_segment = old_render_match.group(0)
text = text.replace(old_segment, new_render, 1)

with open('scripts/deploy_exact_appsheet_js.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated scripts/deploy_exact_appsheet_js.py successfully!")
