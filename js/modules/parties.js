/**
 * Parties Master Module (3,350+ Consignors, Consignees & Clients)
 * MTC & TTC Logistics Management System
 */

const PartiesModule = {
  allParties: [],
  filteredParties: [],
  currentPage: 1,
  itemsPerPage: 50,
  activeFilter: 'all',
  stateFilter: '',
  searchQuery: '',
  currentEditId: null,

  async init() {
    if (typeof AppUI !== 'undefined') {
      AppUI.renderSidebar('parties');
    }

    // Auto-clean any legacy corrupted 'Unnamed Party' entries from localStorage
    try {
      ['tms_custom_parties', 'tms_parties'].forEach(key => {
        const val = localStorage.getItem(key);
        if (val) {
          const arr = JSON.parse(val);
          if (Array.isArray(arr)) {
            const cleaned = arr.filter(p => p && p.name && p.name !== 'Unnamed Party');
            if (cleaned.length !== arr.length) {
              localStorage.setItem(key, JSON.stringify(cleaned));
            }
          }
        }
      });
    } catch (e) {}

    await this.loadParties();
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('search-parties');
    if (searchInput) {
      // Debounced search for instant response across 3,350+ records
      let debounceTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          this.searchQuery = (e.target.value || '').trim();
          const clearBtn = document.getElementById('btn-clear-search');
          if (clearBtn) clearBtn.style.display = this.searchQuery ? 'block' : 'none';
          this.currentPage = 1;
          this.applyFilters();
        }, 150);
      });
    }

    const partyForm = document.getElementById('party-form');
    if (partyForm) {
      partyForm.addEventListener('submit', (e) => this.saveParty(e));
    }
  },

  clearSearch() {
    const searchInput = document.getElementById('search-parties');
    if (searchInput) {
      searchInput.value = '';
      this.searchQuery = '';
    }
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) clearBtn.style.display = 'none';
    this.currentPage = 1;
    this.applyFilters();
  },

  async loadParties() {
    this.allParties = await dbService.getAll('parties');
    this.updateSummary(this.allParties);
    this.applyFilters();
  },

  updateSummary(parties) {
    const totalParties = parties.length;
    const gstParties = parties.filter(p => p.gstin && p.gstin.trim() && !p.gstin.startsWith('URP')).length;
    const totalDue = parties.reduce((sum, p) => sum + (Number(p.dueAmount) || 0), 0);
    const totalPaid = parties.reduce((sum, p) => sum + (Number(p.paidAmount) || 0), 0);
    const mobileCount = parties.filter(p => p.mobile && p.mobile.trim()).length;

    const countEl = document.getElementById('stat-total-parties');
    const gstEl = document.getElementById('stat-gst-parties');
    const dueEl = document.getElementById('stat-total-due');
    const paidEl = document.getElementById('stat-total-paid');

    if (countEl) countEl.innerText = totalParties.toLocaleString('en-IN');
    if (gstEl) gstEl.innerText = gstParties.toLocaleString('en-IN');
    if (dueEl) dueEl.innerText = AppUI.formatCurrency(totalDue);
    if (paidEl) paidEl.innerText = AppUI.formatCurrency(totalPaid);

    // Update Quick Filter pill counts
    const countAllEl = document.getElementById('count-all');
    const countDueEl = document.getElementById('count-due');
    const countPaidEl = document.getElementById('count-paid');
    const countMobileEl = document.getElementById('count-mobile');

    const dueCount = parties.filter(p => (Number(p.dueAmount) || 0) > 0).length;
    const paidCount = parties.filter(p => (Number(p.paidAmount) || 0) > 0).length;

    if (countAllEl) countAllEl.innerText = totalParties.toLocaleString('en-IN');
    if (countDueEl) countDueEl.innerText = dueCount.toLocaleString('en-IN');
    if (countPaidEl) countPaidEl.innerText = paidCount.toLocaleString('en-IN');
    if (countMobileEl) countMobileEl.innerText = mobileCount.toLocaleString('en-IN');
  },

  setQuickFilter(filter) {
    this.activeFilter = filter;
    this.currentPage = 1;

    // Update active pill button classes
    ['all', 'due', 'paid', 'mobile'].forEach(f => {
      const btn = document.getElementById(`btn-filter-${f}`);
      if (btn) {
        if (f === filter) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });

    this.applyFilters();
  },

  onStateChange(state) {
    this.stateFilter = state || '';
    this.currentPage = 1;
    this.applyFilters();
  },

  setItemsPerPage(val) {
    this.itemsPerPage = val === 'all' ? 999999 : Number(val);
    this.currentPage = 1;
    this.renderCurrentPage();
  },

  applyFilters() {
    const q = this.searchQuery.toLowerCase();
    const sf = this.stateFilter.toLowerCase();
    const filter = this.activeFilter;

    this.filteredParties = this.allParties.filter(party => {
      // 1. Quick Filter condition
      if (filter === 'due' && (Number(party.dueAmount) || 0) <= 0) return false;
      if (filter === 'paid' && (Number(party.paidAmount) || 0) <= 0) return false;
      if (filter === 'mobile' && (!party.mobile || !party.mobile.trim())) return false;

      // 2. State filter condition
      if (sf) {
        const stateStr = ((party.state || '') + ' ' + (party.address || '')).toLowerCase();
        if (!stateStr.includes(sf)) return false;
      }

      // 3. Search query condition (multi-field matching)
      if (q) {
        const searchCorpus = [
          party.name || '',
          party.gstin || '',
          party.mobile || '',
          party.city || '',
          party.state || '',
          party.address || '',
          party.contactPerson || ''
        ].join(' ').toLowerCase();

        // Support multiple keywords separated by space
        const keywords = q.split(/\s+/).filter(Boolean);
        for (const kw of keywords) {
          if (!searchCorpus.includes(kw)) return false;
        }
      }

      return true;
    });

    this.renderCurrentPage();
  },

  renderCurrentPage() {
    const totalItems = this.filteredParties.length;
    const perPage = this.itemsPerPage;
    const totalPages = Math.ceil(totalItems / perPage) || 1;

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    const startIndex = (this.currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);
    const pageItems = this.filteredParties.slice(startIndex, endIndex);

    this.renderTable(pageItems, startIndex);
    this.renderPagination(totalItems, startIndex, endIndex, totalPages);
  },

  renderTable(parties, startIndex = 0) {
    const tbody = document.getElementById('parties-tbody');
    if (!tbody) return;

    if (!parties || parties.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
            <div class="fw-semibold">No parties matching your filter or search.</div>
            <div class="small">Try clearing search keywords or switching filters.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = parties.map((party, index) => {
      const rowNum = startIndex + index + 1;
      const due = Number(party.dueAmount) || 0;
      const paid = Number(party.paidAmount) || 0;
      
      // Clean GSTIN badge
      let gstinBadge = `<span class="text-muted small">N/A</span>`;
      if (party.gstin) {
        const isUrpHolder = party.gstin.startsWith('URP');
        const badgeColor = isUrpHolder ? 'bg-secondary-subtle text-secondary' : 'bg-primary-subtle text-primary border border-primary-subtle';
        gstinBadge = `
          <div class="d-flex align-items-center gap-1">
            <span class="badge ${badgeColor} badge-gst text-truncate" style="max-width: 105px;" title="${party.gstin}">${party.gstin}</span>
            <i class="bi bi-clipboard copy-btn small text-muted" title="Copy GSTIN" onclick="PartiesModule.copyText('${party.gstin}')"></i>
          </div>
        `;
      }

      // Contact & Phone
      let contactHtml = '<span class="text-muted small">-</span>';
      if (party.mobile || party.contactPerson) {
        const cleanMobile = (party.mobile || '').replace(/[^0-9, ]/g, '').split(/[, ]+/)[0];
        contactHtml = `
          <div class="fw-semibold text-dark text-truncate" style="font-size: 0.8rem;" title="${party.contactPerson || 'Office'}">${party.contactPerson || 'Office'}</div>
          ${party.mobile ? `
            <div class="d-flex align-items-center gap-1 mt-1 text-truncate">
              <a href="tel:${cleanMobile}" class="text-decoration-none small text-primary d-inline-flex align-items-center gap-1 text-truncate" title="${party.mobile}">
                <i class="bi bi-telephone-fill" style="font-size: 0.7rem;"></i> ${cleanMobile}
              </a>
              ${cleanMobile.length >= 10 ? `
                <a href="https://wa.me/91${cleanMobile.slice(-10)}" target="_blank" class="text-success small ms-1" title="WhatsApp Message">
                  <i class="bi bi-whatsapp"></i>
                </a>
              ` : ''}
            </div>
          ` : ''}
        `;
      }

      // Location badges
      let locationBadge = '';
      if (party.state) {
        locationBadge += `<span class="badge bg-light text-dark border me-1" style="font-size: 0.68rem; padding: 2px 5px;">${party.state}</span>`;
      }
      if (party.city) {
        locationBadge += `<span class="badge bg-light text-secondary border" style="font-size: 0.68rem; padding: 2px 5px;">${party.city}</span>`;
      }

      return `
        <tr>
          <td class="text-center text-muted small fw-semibold">${rowNum}</td>
          <td style="overflow: hidden;">
            <div class="d-flex align-items-center gap-1 text-truncate">
              <span class="party-name-link fw-bold text-truncate" title="${party.name}">${party.name}</span>
              <i class="bi bi-clipboard copy-btn small text-muted flex-shrink-0 ms-1" title="Copy Name" onclick="PartiesModule.copyText('${(party.name || '').replace(/'/g, "\\'")}')"></i>
            </div>
            ${locationBadge ? `<div class="mt-1">${locationBadge}</div>` : ''}
            <small class="text-muted d-block text-truncate mt-1" title="${party.address || ''}">
              <i class="bi bi-geo-alt me-1"></i>${party.address || 'Address not listed'}
            </small>
          </td>
          <td>${gstinBadge}</td>
          <td style="overflow: hidden;">${contactHtml}</td>
          <td class="text-end text-nowrap">
            ${due > 0 
              ? `<span class="text-danger fw-bold" style="font-size: 0.85rem;">${AppUI.formatCurrency(due)}</span>` 
              : `<span class="text-muted small">₹0</span>`}
          </td>
          <td class="text-end text-nowrap">
            ${paid > 0 
              ? `<span class="text-success fw-bold" style="font-size: 0.85rem;">${AppUI.formatCurrency(paid)}</span>` 
              : `<span class="text-muted small">₹0</span>`}
          </td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-sm btn-light border p-1" title="Edit Party" onclick="PartiesModule.editParty('${party.id}')">
                <i class="bi bi-pencil text-primary" style="font-size: 0.75rem;"></i>
              </button>
              <button class="btn btn-sm btn-light border p-1" title="Delete Party" onclick="PartiesModule.deleteParty('${party.id}')">
                <i class="bi bi-trash text-danger" style="font-size: 0.75rem;"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderPagination(totalItems, startIndex, endIndex, totalPages) {
    const infoEl = document.getElementById('pagination-info');
    const controlsEl = document.getElementById('pagination-controls');

    if (infoEl) {
      if (totalItems === 0) {
        infoEl.innerHTML = `Showing 0 to 0 of 0 parties`;
      } else {
        infoEl.innerHTML = `Showing <strong>${startIndex + 1}</strong> to <strong>${endIndex}</strong> of <strong>${totalItems.toLocaleString('en-IN')}</strong> parties`;
      }
    }

    if (!controlsEl) return;
    if (totalPages <= 1) {
      controlsEl.innerHTML = '';
      return;
    }

    let html = '';

    // Previous Button
    html += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" onclick="PartiesModule.goToPage(${this.currentPage - 1})" aria-label="Previous">
          <i class="bi bi-chevron-left"></i>
        </button>
      </li>
    `;

    // Smart Sliding Window Pagination
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, this.currentPage - delta); i <= Math.min(totalPages - 1, this.currentPage + delta); i++) {
      range.push(i);
    }

    // Always show First Page
    html += `
      <li class="page-item ${this.currentPage === 1 ? 'active' : ''}">
        <button class="page-link" onclick="PartiesModule.goToPage(1)">1</button>
      </li>
    `;

    if (range[0] > 2) {
      html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    // Intermediate Pages
    range.forEach(page => {
      html += `
        <li class="page-item ${this.currentPage === page ? 'active' : ''}">
          <button class="page-link" onclick="PartiesModule.goToPage(${page})">${page}</button>
        </li>
      `;
    });

    if (range[range.length - 1] < totalPages - 1) {
      html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    // Always show Last Page
    if (totalPages > 1) {
      html += `
        <li class="page-item ${this.currentPage === totalPages ? 'active' : ''}">
          <button class="page-link" onclick="PartiesModule.goToPage(${totalPages})">${totalPages}</button>
        </li>
      `;
    }

    // Next Button
    html += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" onclick="PartiesModule.goToPage(${this.currentPage + 1})" aria-label="Next">
          <i class="bi bi-chevron-right"></i>
        </button>
      </li>
    `;

    controlsEl.innerHTML = html;
  },

  goToPage(page) {
    this.currentPage = page;
    this.renderCurrentPage();
    // Smoothly scroll back to top of table
    const tableEl = document.querySelector('.card.border-0.shadow-sm');
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  copyText(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (typeof AppUI !== 'undefined') {
        AppUI.showToast(`Copied to clipboard: "${text}"`, 'success');
      }
    }).catch(() => {
      alert(`Copied: ${text}`);
    });
  },

  openAddModal() {
    this.currentEditId = null;
    document.getElementById('party-modal-title').innerText = "Add New Party (Customer / Consignor)";
    document.getElementById('party-form').reset();
    document.getElementById('party-id').value = "";
    const modal = new bootstrap.Modal(document.getElementById('partyModal'));
    modal.show();
  },

  async editParty(id) {
    const party = await dbService.getById('parties', id);
    if (!party) return;

    this.currentEditId = id;
    document.getElementById('party-modal-title').innerText = "Edit Party Details";
    document.getElementById('party-id').value = party.id;
    document.getElementById('party-name').value = party.name || "";
    document.getElementById('party-gstin').value = party.gstin || "";
    document.getElementById('party-contact').value = party.contactPerson || "";
    document.getElementById('party-mobile').value = party.mobile || "";
    document.getElementById('party-city').value = party.city || "";
    document.getElementById('party-state').value = party.state || "";
    document.getElementById('party-address').value = party.address || "";
    document.getElementById('party-due').value = party.dueAmount || 0;
    document.getElementById('party-paid').value = party.paidAmount || 0;

    const modal = new bootstrap.Modal(document.getElementById('partyModal'));
    modal.show();
  },

  async saveParty(e) {
    e.preventDefault();
    const partyData = {
      name: document.getElementById('party-name').value.trim(),
      gstin: document.getElementById('party-gstin').value.trim().toUpperCase(),
      contactPerson: document.getElementById('party-contact').value.trim(),
      mobile: document.getElementById('party-mobile').value.trim(),
      city: document.getElementById('party-city').value.trim(),
      state: document.getElementById('party-state').value.trim(),
      address: document.getElementById('party-address').value.trim(),
      dueAmount: Number(document.getElementById('party-due').value) || 0,
      paidAmount: Number(document.getElementById('party-paid').value) || 0
    };

    if (!partyData.name) {
      AppUI.showToast("Party Name is required!", "danger");
      return;
    }

    if (this.currentEditId) {
      await dbService.update('parties', this.currentEditId, partyData);
      AppUI.showToast("Party details updated successfully!", "success");
    } else {
      await dbService.add('parties', partyData);
      AppUI.showToast("New party added successfully!", "success");
    }

    const modalEl = document.getElementById('partyModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    await this.loadParties();
  },

  async deleteParty(id) {
    if (confirm("Are you sure you want to delete this party from the master register?")) {
      await dbService.delete('parties', id);
      AppUI.showToast("Party deleted successfully!", "success");
      await this.loadParties();
    }
  },

  exportToCSV() {
    const listToExport = this.filteredParties.length > 0 ? this.filteredParties : this.allParties;
    if (listToExport.length === 0) {
      AppUI.showToast("No party data to export!", "warning");
      return;
    }

    const headers = ["ID", "Party / Company Name", "GSTIN", "Contact Person", "Mobile", "City", "State", "Full Address", "Due Amount (₹)", "Paid Amount (₹)"];
    
    const rows = listToExport.map(p => [
      `"${(p.id || '').replace(/"/g, '""')}"`,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${(p.gstin || '').replace(/"/g, '""')}"`,
      `"${(p.contactPerson || '').replace(/"/g, '""')}"`,
      `"${(p.mobile || '').replace(/"/g, '""')}"`,
      `"${(p.city || '').replace(/"/g, '""')}"`,
      `"${(p.state || '').replace(/"/g, '""')}"`,
      `"${(p.address || '').replace(/"/g, '""')}"`,
      p.dueAmount || 0,
      p.paidAmount || 0
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `Parties_Master_Export_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    AppUI.showToast(`Exported ${listToExport.length} parties to CSV successfully!`, "success");
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => PartiesModule.init());
