/**
 * Global Application UI Controller & Utilities
 * MTC & TTC Logistics Management System
 */

const AuthService = {
  getCurrentUser() {
    return {
      id: "usr_1",
      name: "Owner / Admin",
      email: "admin@ttclogistics.com",
      role: "SUPER_ADMIN"
    };
  },

  logout() {
    if (typeof AppUI !== 'undefined' && AppUI.showToast) {
      AppUI.showToast("Direct access mode active (No login required).", "info");
    }
  }
};

const AppUI = {
  // Render Sidebar dynamically based on current page
  renderSidebar(activePage = 'dashboard') {
    const isInsidePages = window.location.pathname.includes('/pages/');
    const basePath = isInsidePages ? '../' : './';
    const pagesPath = isInsidePages ? './' : './pages/';

    const sidebarHTML = `
      <div class="brand-header">
        <div class="brand-icon">🚛</div>
        <div class="brand-text">
          <h5>MTC & TTC</h5>
          <small>Logistics ERP System</small>
        </div>
      </div>
      <div class="sidebar-nav">
        <div class="nav-section-title">Core Operations</div>
        <a href="${basePath}index.html" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''}">
          <i class="bi bi-speedometer2"></i> Executive Dashboard
        </a>
        <a href="${pagesPath}trips.html" class="sidebar-link ${activePage === 'trips' ? 'active' : ''}">
          <i class="bi bi-truck"></i> Trips & Dispatch
        </a>
        <a href="${pagesPath}bilty-booking.html" class="sidebar-link ${activePage === 'bilty' ? 'active' : ''}">
          <i class="bi bi-file-earmark-text"></i> Bilty (LR) Booking
        </a>
        <a href="${pagesPath}eway-bills.html" class="sidebar-link ${activePage === 'eway' ? 'active' : ''}">
          <i class="bi bi-shield-exclamation"></i> E-Way Bills & Validity
        </a>
        <a href="${pagesPath}pod-register.html" class="sidebar-link ${activePage === 'pod' ? 'active' : ''}">
          <i class="bi bi-card-checklist"></i> POD (पावती) Register
        </a>

        <div class="nav-section-title mt-3">Master Directories</div>
        <a href="${pagesPath}parties.html" class="sidebar-link ${activePage === 'parties' ? 'active' : ''}">
          <i class="bi bi-building"></i> Parties Master
        </a>
        <a href="${pagesPath}owners.html" class="sidebar-link ${activePage === 'owners' ? 'active' : ''}">
          <i class="bi bi-person-badge"></i> Truck Owners
        </a>
        <a href="${pagesPath}drivers.html" class="sidebar-link ${activePage === 'drivers' ? 'active' : ''}">
          <i class="bi bi-person-vcard"></i> Drivers Master
        </a>
        <a href="${pagesPath}fleet-maintenance.html" class="sidebar-link ${activePage === 'fleet' ? 'active' : ''}">
          <i class="bi bi-shield-check"></i> Fleet & Documents
        </a>
        <a href="${pagesPath}brokers.html" class="sidebar-link ${activePage === 'brokers' ? 'active' : ''}">
          <i class="bi bi-people"></i> Brokers / Dallal
        </a>

        <div class="nav-section-title mt-3">Accounts & Billing</div>
        <a href="${pagesPath}gst-invoices.html" class="sidebar-link ${activePage === 'gst' ? 'active' : ''}">
          <i class="bi bi-receipt-cutoff"></i> GST Freight Invoices
        </a>
        <a href="${pagesPath}payments.html" class="sidebar-link ${activePage === 'payments' ? 'active' : ''}">
          <i class="bi bi-cash-coin"></i> Party & Owner Paid
        </a>
        <a href="${pagesPath}cheques.html" class="sidebar-link ${activePage === 'cheques' ? 'active' : ''}">
          <i class="bi bi-credit-card-2-front"></i> Cheques Register
        </a>
        <a href="${pagesPath}cash-register.html" class="sidebar-link ${activePage === 'cash' ? 'active' : ''}">
          <i class="bi bi-wallet2"></i> Shahpura Cash & DEF
        </a>
        <a href="${pagesPath}diesel-register.html" class="sidebar-link ${activePage === 'diesel' ? 'active' : ''}">
          <i class="bi bi-fuel-pump"></i> Diesel Pump Register
        </a>
        <a href="${pagesPath}ledger.html" class="sidebar-link ${activePage === 'ledger' ? 'active' : ''}">
          <i class="bi bi-journal-bookmark"></i> Financial Ledger
        </a>

        <div class="nav-section-title mt-3">System & Data</div>
        <a href="${pagesPath}data-tools.html" class="sidebar-link ${activePage === 'data-tools' ? 'active' : ''}">
          <i class="bi bi-database-down"></i> Excel Import & Backup
        </a>
      </div>
    `;

    const sidebarEl = document.getElementById('sidebar');
    if (sidebarEl) {
      sidebarEl.innerHTML = sidebarHTML;
    }
  },

  // Render Logged-in User profile pill in top navbar (Disabled)
  renderNavbarUser() {
    const userContainer = document.getElementById('topbar-user-profile');
    if (userContainer) {
      userContainer.remove();
    }
  },

  // Role Management (Disabled - Full access for all)
  getActiveRole() {
    return 'SUPER_ADMIN';
  },

  initRoleSelector() {},

  switchUserRole() {},

  applyRolePermissions() {},

  // Currency Formatter (INR Format: ₹1,80,000.00)
  formatCurrency(amount) {
    const num = Number(amount) || 0;
    return '₹' + num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  // Date Formatter (DD/MM/YYYY)
  formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },

  // Global Toast Notification
  showToast(message, type = 'success') {
    let toastContainer = document.getElementById('global-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'global-toast-container';
      toastContainer.style.position = 'fixed';
      toastContainer.style.top = '20px';
      toastContainer.style.right = '20px';
      toastContainer.style.zIndex = '99999';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-primary';
    const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';

    toast.className = `toast align-items-center text-white ${bgClass} border-0 show shadow mb-2`;
    toast.role = 'alert';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icon} fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  },

  // Toggle Mobile Navigation
  toggleMobileNav() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }
};

// Initialize common interactions when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', AppUI.toggleMobileNav);
  }
});
