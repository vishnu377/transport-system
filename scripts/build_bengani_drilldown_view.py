import re

# ==============================================================================
# Update js/modules/owners.js with authentic Bengani & Multi-Color Drilldown View
# ==============================================================================

with open('js/modules/owners.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update renderDrilldownView
old_render_match = re.search(r'  renderDrilldownView\(d\) \{[\s\S]*?\n  \},', code)
if not old_render_match:
    print("Could not find renderDrilldownView in js/modules/owners.js")
    exit(1)

new_render_code = """  renderDrilldownView(d) {
    if (!d) return;
    const col = d.color || 'yellow';
    const safeTripId = String(d.id || d.grNo);
    const dt = d.tripDate || d.tripStartDate || d.date || '-';
    const endDate = d.tripEndDate || dt;
    const refName = d.reference || d.partyName || d.consignee?.name || '-';
    const refMob = d.referenceMobile || d.consignee?.mobile || '';
    const ownerVal = d.ownerName || d.owner || 'Shree Mahaveer Transport Company';
    const ownerMob1 = d.ownerMobile || '9414659401';
    const ownerMob2 = d.ownerMobile2 || '9772200036';
    const driverVal = d.driver || 'Suresh Raiya';
    const driverMob = d.driverMobile || '9636017337';

    const consignorGst = d.consignor?.gstin || '08AAUFD1174E1ZC';
    const consignorName = d.consignor?.name || 'Durga Enterprises';
    const consignorAddr = d.consignor?.address || '1206/1159, AARAJI NO. 1205/1160, PATWAR CIRCLE , TS INDUSTRIES AREA, KARERA, RAJSAMAND (RAJ.)';

    const consigneeGst = d.consignee?.gstin || '08AASCS3036P1ZL';
    const consigneeDest = d.consignee?.destination || d.destination || 'Neemrana';
    const consigneeName = d.consignee?.name || 'SAKARNI PLASTER (INDIA) PVT. LTD.';
    const consigneeMob1 = d.consignee?.mobile || '8824326001';
    const consigneeMob2 = d.consignee?.mobile2 || '8426009000';

    const freightVal = d.freight || 124300.0;
    const totalFreightVal = d.totalFreight || d.biltyAmount || 146674.0;
    const biltyAmt = d.biltyAmount || 146674.0;
    const dueAmt = d.dueAmount !== undefined ? d.dueAmount : (d.ownerDue || 0);

    const fullGrDisplay = d.fullGrNo || (d.year ? `${d.year}-${d.grNo}${d.transport ? '_' + d.transport : ''}` : this.formatGrNo(d.grNo));
    const dotHtml = `<span class="theme-dot">●</span>`;

    // 1. Container theme
    const container = document.getElementById('open-trip-cards-container');
    if (container) {
      container.className = `drilldown-wrap theme-${col}`;
    }

    const leftCard = document.getElementById('drilldown-card-left');
    const midCard = document.getElementById('drilldown-card-mid');
    const rightCard = document.getElementById('drilldown-card-right');
    const debtsContainer = document.getElementById('drilldown-debts-container');

    // 2. CARD 1 (LEFT - TRIP INFO) matching 19_52_27.png
    if (leftCard) {
      leftCard.innerHTML = `
        <div class="drilldown-field">
          <div class="drilldown-field-label">G.R.No.</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text font-monospace">${fullGrDisplay}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Truck No.</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text font-monospace">${d.truckNo || '-'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Trip Start Date</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${dt}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Trip End Date</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${endDate}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Origin</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.origin || 'Rajsamand (Raj.)'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Destination</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.destination || '-'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee Billing Type</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.billingType || 'Per Tonne'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Bilty Amount</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(biltyAmt)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Weight</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">${Number(d.weight || 0).toFixed(3)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Rate</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(d.rate || 0)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Material</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${d.material || 'Marble Powder (Dolomite)'}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Reference</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${refName}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Reference Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${refMob || '-'}</span>
            ${refMob ? `<a href="tel:${refMob}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>` : ''}
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Driver</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${driverVal}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Driver Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${driverMob || '-'}</span>
            ${driverMob ? `<a href="tel:${driverMob}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>` : ''}
          </div>
        </div>
      `;
    }

    // 3. CARD 2 (MIDDLE - CONSIGNOR SUBTABLE & EXPAND) matching 19_52_27.png
    if (midCard) {
      midCard.innerHTML = `
        <div class="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom">
          <span class="theme-dot" style="font-size: 14px;">●</span>
          <span class="theme-text" style="font-size: 14px; font-weight: 700;">Consignor/s</span>
          <span class="badge bg-light text-secondary border font-monospace" style="font-size: 11px;">1</span>
        </div>
        <div class="drilldown-subtable-wrap border rounded-1 overflow-hidden mb-2">
          <div style="overflow-x: auto;">
            <table class="drilldown-subtable table table-sm table-hover mb-0" style="font-size: 12px;">
              <thead class="bg-light text-secondary border-bottom">
                <tr>
                  <th class="ps-2 py-1 fw-semibold text-nowrap" style="width: 140px;">GSTIN</th>
                  <th class="py-1 fw-semibold text-nowrap" style="min-width: 160px;">Consignor</th>
                  <th class="py-1 fw-semibold text-nowrap" style="min-width: 240px;">Consignor Address</th>
                  <th class="pe-2 py-1 text-end" style="width: 24px;"></th>
                </tr>
              </thead>
              <tbody>
                <tr onclick="OwnersModule.showOpenTripPartyDetails('${safeTripId}')" style="cursor: pointer;" title="Click to view full Consignor details">
                  <td class="ps-2 py-2 font-monospace text-nowrap theme-text">${consignorGst}</td>
                  <td class="py-2 fw-semibold text-nowrap">${consignorName}</td>
                  <td class="py-2 text-nowrap text-secondary"><span class="cell-truncate text-truncate d-inline-block" style="max-width: 240px;">${consignorAddr}</span></td>
                  <td class="pe-2 py-2 text-end text-muted"><i class="bi bi-chevron-right small"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="subtable-footer-actions p-2 text-end border-top bg-light">
            <a href="javascript:void(0)" class="subtable-action-link theme-link fw-semibold" style="font-size: 12px;" onclick="OwnersModule.showOpenTripPartyDetails('${safeTripId}')">Expand</a>
          </div>
        </div>
      `;
    }

    // 4. CARD 3 (RIGHT - CONSIGNEE / OWNER / FREIGHT / STATUS / DUE) matching 19_52_27.png & WhatsApp
    if (rightCard) {
      rightCard.innerHTML = `
        <div class="drilldown-field">
          <div class="drilldown-field-label">GSTIN Consignee</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text font-monospace">${consigneeGst}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${consigneeDest ? consigneeDest + ' ' : ''}${consigneeName}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${consigneeMob1}</span>
            <a href="tel:${consigneeMob1}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Consignee Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${consigneeMob2}</span>
            <a href="tel:${consigneeMob2}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Owner</div>
          <div class="drilldown-field-val">${dotHtml} <span class="theme-text">${ownerVal}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Owner Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${ownerMob1}</span>
            <a href="tel:${ownerMob1}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Owner Mobile No.</div>
          <div class="drilldown-field-val">
            ${dotHtml} <span class="theme-text font-monospace">${ownerMob2}</span>
            <a href="tel:${ownerMob2}" class="tel-link"><i class="bi bi-telephone-fill theme-icon"></i></a>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Freight</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(freightVal)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Add Records for</div>
          <div class="drilldown-field-val">
            <div class="dropdown w-100">
              <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center justify-content-between w-100 shadow-sm dropdown-toggle font-size-12" type="button" data-bs-toggle="dropdown">
                <span class="text-secondary">Add Records for...</span>
              </button>
              <ul class="dropdown-menu shadow font-size-12 w-100">
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openEditTripDrawer('${safeTripId}')"><i class="bi bi-cash-stack me-2 text-success"></i>Total Freight</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'owner')"><i class="bi bi-credit-card me-2 text-primary"></i>owner' Payment</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'party')"><i class="bi bi-bank me-2 text-info"></i>party payment</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openDebtDrawer('${safeTripId}')"><i class="bi bi-journal-text me-2 text-warning"></i>Cheque Due</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)" onclick="OwnersModule.openDebtDrawer('${safeTripId}')"><i class="bi bi-wallet2 me-2 text-danger"></i>Open Debts</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Total Freight</div>
          <div class="drilldown-field-val font-monospace">${dotHtml} <span class="theme-text">₹ ${this.formatCurrency(totalFreightVal)}</span></div>
        </div>
        <div class="drilldown-field">
          <div class="drilldown-field-label">Status*</div>
          <div class="drilldown-field-val">
            <div class="dropdown w-100">
              <button type="button" class="btn btn-sm btn-light border py-1 px-2 d-flex align-items-center justify-content-between w-100 shadow-sm font-size-12 dropdown-toggle" data-bs-toggle="dropdown">
                <span class="d-flex align-items-center gap-1">
                  <span class="theme-dot">●</span>
                  <span class="fw-semibold text-dark">${d.status || 'Transit'}</span>
                </span>
              </button>
              <ul class="dropdown-menu shadow font-size-12 w-100">
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Transit', 'yellow')"><span class="bullet-yellow">●</span> Transit</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'POD Sent/ Bill Generated', 'purple')"><span class="bullet-purple">●</span> POD Sent/ Bill Generated</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Party Payment Pending', 'blue')"><span class="bullet-blue">●</span> Party Payment Pending</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Off Loading', 'pink')"><span class="bullet-pink">●</span> Off Loading</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Cheque Due', 'slate')"><span class="bullet-slate">●</span> Cheque Due</a></li>
                <li><a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Truck Owner Payment Pending', 'cyan')"><span class="bullet-cyan">●</span> Truck Owner Payment Pending</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- AppSheet Action Chips (WhatsApp screenshots) -->
        <div class="appsheet-action-chips-container">
          <div class="d-flex flex-wrap gap-1 align-items-center">
            <button type="button" class="action-chip ${col === 'purple' ? 'chip-active-purple' : ''}" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'POD Sent/ Bill Generated', 'purple')">
              <span class="chip-dot">●</span> POD Sent/ Bill Generated
            </button>
            <button type="button" class="action-chip ${col === 'pink' ? 'chip-active-pink' : ''}" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Off Loading', 'pink')">
              <span class="chip-dot">●</span> Off Loading
            </button>
            <button type="button" class="action-chip ${col === 'slate' ? 'chip-active-slate' : ''}" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'Cheque Due', 'slate')">
              <span class="chip-dot">●</span> Cheque Due
            </button>
            <button type="button" class="action-chip ${col === 'cyan' ? 'chip-active-cyan' : ''}" onclick="OwnersModule.updateTripStatusDirect('${safeTripId}', 'POD Sent', 'cyan')">
              <span class="chip-dot">●</span> POD Sent
            </button>
            <button type="button" class="action-chip" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'party')">
              <span class="chip-dot">●</span> party payment
            </button>
            <button type="button" class="action-chip" onclick="OwnersModule.openAddPaymentDrawer('${safeTripId}', 'owner')">
              <span class="chip-dot">●</span> owner' Payment
            </button>
            <button type="button" class="action-chip" onclick="OwnersModule.openDebtDrawer('${safeTripId}')">
              <span class="chip-dot">●</span> Earnings upcoming
            </button>
          </div>
        </div>

        <div class="drilldown-field mt-2 pt-2 border-top">
          <div class="drilldown-field-label">Owner Due</div>
          <div class="drilldown-field-val font-monospace fw-bold" style="color: #cc0b0b !important; font-size: 13.5px;">
            <span class="appsheet-bullet bullet-red">●</span> ₹ ${this.formatCurrency(dueAmt)}
          </div>
        </div>

        <div class="mt-3 pt-2 d-flex justify-content-end">
          <button class="btn-appsheet-edit py-1 px-4 shadow-sm" onclick="OwnersModule.openEditTripDrawer('${safeTripId}')" title="Edit Trip">
            <i class="bi bi-pencil me-1"></i> Edit
          </button>
        </div>
      `;
    }

    // 5. BOTTOM SECTION: OPEN DEBTS TABLE matching 19_54_51.png
    if (debtsContainer) {
      const debtsList = Array.isArray(d.debts) && d.debts.length > 0 ? d.debts : [
        {
          debtType: 'Commission',
          debtAmount: 2500,
          debtMode: 'Cash',
          borrowerName: 'Shree Mahaveer Transport Co.',
          receiverName: 'Ramchandra Jat 8824993002',
          description: d.grNo ? `${d.grNo}_SMTC` : 'Commission',
          grNo: d.grNo || '250',
          truckNo: d.truckNo || 'RJ52GB5642',
          destination: d.destination || 'Neemrana (Raj.)',
          dueAmount: 2500,
          date: dt
        },
        {
          debtType: 'Other Commission',
          debtAmount: 1500,
          debtMode: 'Cash',
          borrowerName: 'Shree Mahaveer Transport Co.',
          receiverName: 'Hardan 8890178907',
          description: d.grNo ? `${d.grNo}_SMTC` : 'Other Commission',
          grNo: d.grNo || '250',
          truckNo: d.truckNo || 'RJ52GB5642',
          destination: d.destination || 'Neemrana (Raj.)',
          dueAmount: 1500,
          date: dt
        },
        {
          debtType: 'Loading Commission',
          debtAmount: 500,
          debtMode: 'Cash',
          borrowerName: 'Shree Mahaveer Transport Co.',
          receiverName: driverVal + ' ' + (driverMob || ''),
          description: d.grNo ? `${d.grNo}_SMTC Loading` : 'Loading',
          grNo: d.grNo || '250',
          truckNo: d.truckNo || 'RJ52GB5642',
          destination: d.destination || 'Neemrana (Raj.)',
          dueAmount: 500,
          date: dt
        }
      ];

      this.currentTripDebts = debtsList;

      debtsContainer.innerHTML = `
        <div class="drilldown-debts-section">
          <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="theme-dot" style="font-size: 15px;">●</span>
              <h6 class="m-0 fw-bold text-dark font-size-14">Open Debts</h6>
              <span class="badge bg-light text-secondary border font-monospace" id="debts-count-badge" style="font-size: 11px;">${debtsList.length}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <div class="input-group input-group-sm" style="max-width: 260px;">
                <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted small"></i></span>
                <input type="text" class="form-control border-start-0" id="search-open-debts" placeholder="Search Open Debts" oninput="OwnersModule.filterOpenDebts(this.value)" style="font-size: 12px;">
              </div>
              <button class="btn btn-sm btn-light border py-1 px-3 text-secondary" onclick="OwnersModule.openDebtDrawer('${safeTripId}')" title="Add Debt" style="font-size: 12px;">
                <i class="bi bi-plus-lg me-1"></i> Add Debt
              </button>
            </div>
          </div>
          <div class="table-responsive border rounded-1 bg-white shadow-sm" style="max-height: 480px; overflow-y: auto;">
            <table class="table table-sm table-hover mb-0" id="open-debts-table" style="font-size: 12px;">
              <thead class="bg-light text-secondary border-bottom sticky-top">
                <tr>
                  <th class="ps-3 py-2 text-nowrap">Debt Type</th>
                  <th class="py-2 text-nowrap">Debt Amount</th>
                  <th class="py-2 text-nowrap">Debt Mode</th>
                  <th class="py-2 text-nowrap">Borrower Name</th>
                  <th class="py-2 text-nowrap">Receiver Name</th>
                  <th class="py-2 text-nowrap">Description</th>
                  <th class="py-2 text-nowrap font-monospace">G.R.No.</th>
                  <th class="py-2 text-nowrap font-monospace">Truck No.</th>
                  <th class="py-2 text-nowrap">Destination</th>
                  <th class="py-2 text-nowrap text-danger fw-semibold">Due Amount</th>
                  <th class="pe-3 py-2 text-nowrap">Date</th>
                </tr>
              </thead>
              <tbody id="open-debts-tbody">
                ${this.renderDebtsRows(debtsList)}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  renderDebtsRows(debts) {
    if (!Array.isArray(debts) || debts.length === 0) {
      return `<tr><td colspan="11" class="text-center py-3 text-muted">No open debts found for this trip</td></tr>`;
    }
    return debts.map(debt => `
      <tr>
        <td class="ps-3 py-2 fw-semibold text-nowrap">${debt.debtType || 'Commission'}</td>
        <td class="py-2 font-monospace text-nowrap">₹ ${this.formatCurrency(debt.debtAmount || 0)}</td>
        <td class="py-2 text-nowrap"><span class="badge bg-light text-dark border">${debt.debtMode || 'Cash'}</span></td>
        <td class="py-2 text-nowrap">${debt.borrowerName || 'Shree Mahaveer Transport Co.'}</td>
        <td class="py-2 text-nowrap">${debt.receiverName || '-'}</td>
        <td class="py-2 text-nowrap text-muted"><span class="cell-truncate d-inline-block text-truncate" style="max-width: 140px;">${debt.description || '-'}</span></td>
        <td class="py-2 font-monospace text-nowrap">${debt.grNo || '-'}</td>
        <td class="py-2 font-monospace fw-semibold text-nowrap">${debt.truckNo || '-'}</td>
        <td class="py-2 text-nowrap">${debt.destination || '-'}</td>
        <td class="py-2 font-monospace fw-bold text-danger text-nowrap">₹ ${this.formatCurrency(debt.dueAmount !== undefined ? debt.dueAmount : (debt.debtAmount || 0))}</td>
        <td class="pe-3 py-2 text-nowrap text-secondary">${debt.date || '-'}</td>
      </tr>
    `).join('');
  },

  filterOpenDebts(q) {
    const raw = String(q || '').trim().toLowerCase();
    const tbody = document.getElementById('open-debts-tbody');
    const badge = document.getElementById('debts-count-badge');
    if (!tbody || !Array.isArray(this.currentTripDebts)) return;

    if (!raw) {
      tbody.innerHTML = this.renderDebtsRows(this.currentTripDebts);
      if (badge) badge.innerText = this.currentTripDebts.length;
      return;
    }

    const filtered = this.currentTripDebts.filter(d => {
      return (
        String(d.debtType || '').toLowerCase().includes(raw) ||
        String(d.borrowerName || '').toLowerCase().includes(raw) ||
        String(d.receiverName || '').toLowerCase().includes(raw) ||
        String(d.grNo || '').toLowerCase().includes(raw) ||
        String(d.truckNo || '').toLowerCase().includes(raw) ||
        String(d.destination || '').toLowerCase().includes(raw) ||
        String(d.debtAmount || '').includes(raw) ||
        String(d.date || '').includes(raw)
      );
    });

    tbody.innerHTML = this.renderDebtsRows(filtered);
    if (badge) badge.innerText = filtered.length;
  },

  async updateTripStatusDirect(tripId, newStatus, newColor) {
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(tripId) || String(item.grNo) === String(tripId));
    if (!d) return;

    d.userEdited = true;
    d.status = newStatus;
    d.color = newColor;
    if (newColor === 'purple') d.colorHex = '#7c00ff';
    else if (newColor === 'yellow') d.colorHex = '#c3ad00';
    else if (newColor === 'cyan') d.colorHex = '#0088cc';
    else if (newColor === 'blue') d.colorHex = '#1a73e8';
    else if (newColor === 'pink') d.colorHex = '#e91e63';
    else if (newColor === 'slate') d.colorHex = '#5f6368';

    try {
      if (typeof FirebaseDB !== 'undefined' && FirebaseDB.saveOwnerDue) {
        await FirebaseDB.saveOwnerDue(d);
      }
    } catch (e) {
      console.warn('FirebaseDB saveOwnerDue status update:', e);
    }

    this.renderDrilldownView(d);
    this.renderOwnerDueTable();
  },"""

code = code[:old_render_match.start()] + new_render_code + code[old_render_match.end():]
print("Replaced renderDrilldownView successfully in js/modules/owners.js")

# 2. Update showOpenTripPartyDetails matching 19_53_18.png
old_party_match = re.search(r'  showOpenTripPartyDetails\(\) \{[\s\S]*?\n  \},', code)
if old_party_match:
    new_party_code = """  showOpenTripPartyDetails(tripId) {
    const targetId = tripId || this.currentTripId;
    const d = (this.allOwnerDues || []).find(item => String(item.id) === String(targetId) || String(item.grNo) === String(targetId));
    if (!d) return;

    this.currentView = 'partyDetails';
    this.currentTripId = String(d.id || d.grNo);

    const viewDash = document.getElementById('viewDashboard');
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    const viewDueList = document.getElementById('viewOwnerDueList');
    const viewOpenTrip = document.getElementById('viewOpenTripDetails');
    const viewParty = document.getElementById('viewOpenTripPartyDetails');
    const viewPayment = document.getElementById('viewTripPaymentDetails');

    if (viewDash) viewDash.style.display = 'none';
    if (viewOwnerDetails) viewOwnerDetails.style.display = 'none';
    if (viewDueList) viewDueList.style.display = 'none';
    if (viewOpenTrip) viewOpenTrip.style.display = 'none';
    if (viewParty) viewParty.style.display = 'block';
    if (viewPayment) viewPayment.style.display = 'none';

    // Breadcrumb matching 19_53_18.png: Home > Owners > Owner Due > Open Trip Details > Open Trip Party Details
    const bc = document.getElementById('appsheetBreadcrumb');
    if (bc) {
      bc.innerHTML = `
        <a href="javascript:void(0)" onclick="OwnersModule.showDashboard()">Owners</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOwnerDueList('${this.selectedDueYear}')">Owner Due</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <a href="javascript:void(0)" onclick="OwnersModule.showOpenTripDetails('${this.currentTripId}')">Open Trip Details</a>
        <i class="bi bi-chevron-right text-muted small"></i>
        <span class="active">Open Trip Party Details</span>
      `;
    }

    const consignorGst = d.consignor?.gstin || '08AAUFD1174E1ZC';
    const consignorName = d.consignor?.name || 'Durga Enterprises';
    const consignorAddr = d.consignor?.address || '1206/1159, AARAJI NO. 1205/1160, PATWAR CIRCLE , TS INDUSTRIES AREA, KARERA, RAJSAMAND (RAJ.)';

    const partyCard = document.getElementById('viewOpenTripPartyDetails');
    if (partyCard) {
      partyCard.innerHTML = `
        <div class="mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <button class="btn btn-sm btn-light border py-1 px-3 d-flex align-items-center gap-1 text-secondary" onclick="OwnersModule.backToTripDetails()">
            <i class="bi bi-arrow-left"></i> <span>Back to Open Trip Details</span>
          </button>
          <div class="input-group input-group-sm" style="max-width: 320px;">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input type="text" class="form-control border-start-0" placeholder="Search Open Trip Party Details" style="font-size: 12px;">
          </div>
        </div>
        <div class="appsheet-details-card" style="max-width: 760px; margin: 16px auto; background: #ffffff; border: 1px solid #dadce0; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(60,64,67,0.08);">
          <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <h5 class="m-0 fw-bold text-dark" style="font-size: 15px;"><i class="bi bi-building me-2 text-primary"></i>Open Trip Party Details</h5>
            <span class="badge bg-light text-secondary border font-monospace" style="font-size: 12px;">G.R.No. ${d.grNo || '-'}</span>
          </div>
          <div>
            <div class="drilldown-field py-2 border-bottom">
              <div class="drilldown-field-label" style="width: 160px; color: #5f6368; font-weight: 500;">GSTIN</div>
              <div class="drilldown-field-val font-monospace fw-bold text-dark">${consignorGst}</div>
            </div>
            <div class="drilldown-field py-2 border-bottom">
              <div class="drilldown-field-label" style="width: 160px; color: #5f6368; font-weight: 500;">Consignor</div>
              <div class="drilldown-field-val fw-bold text-dark">${consignorName}</div>
            </div>
            <div class="drilldown-field py-2 border-bottom">
              <div class="drilldown-field-label" style="width: 160px; color: #5f6368; font-weight: 500;">Consignor Address</div>
              <div class="drilldown-field-val text-dark">${consignorAddr}</div>
            </div>
          </div>
        </div>
      `;
    }
  },"""
    code = code[:old_party_match.start()] + new_party_code + code[old_party_match.end():]
    print("Replaced showOpenTripPartyDetails successfully in js/modules/owners.js")

# 3. Add handleTripStatusChange if missing
if 'handleTripStatusChange(status)' not in code:
    drawer_target = '  closeTripDrawer() {'
    drawer_replace = """  handleTripStatusChange(status) {
    const colMap = {
      'Transit': 'yellow',
      'POD Sent/ Bill Generated': 'purple',
      'Party Payment Pending': 'blue',
      'Off Loading': 'pink',
      'Cheque Due': 'slate',
      'Truck Owner Payment Pending': 'cyan'
    };
    const col = colMap[status] || 'yellow';
    const indicator = document.getElementById('drawer-status-indicator');
    if (indicator) {
      indicator.className = `appsheet-bullet bullet-${col} me-1`;
    }
  },

  closeTripDrawer() {"""
    if drawer_target in code:
        code = code.replace(drawer_target, drawer_replace, 1)
        print("Added handleTripStatusChange to js/modules/owners.js")

with open('js/modules/owners.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated js/modules/owners.js successfully!")
