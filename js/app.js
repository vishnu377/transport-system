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

    // 1. Google AppSheet 48px Slim Icon Rail HTML
    const railHTML = `
      <button class="appsheet-rail-btn" title="Search / Filter" onclick="AppUI.focusSearchOrOpenDrawer()">
        <i class="bi bi-funnel"></i>
      </button>
      <a href="${basePath}index.html" class="appsheet-rail-btn ${(activePage === 'dashboard' || activePage === 'home') ? 'active' : ''}" title="Home Portal">
        <i class="bi bi-house-door-fill"></i>
      </a>
      <button class="appsheet-rail-btn" title="About System" onclick="AppUI.showAboutModal()">
        <i class="bi bi-info-circle"></i>
      </button>
      <button class="appsheet-rail-btn" title="Support & Feedback" onclick="AppUI.showFeedbackModal()">
        <i class="bi bi-chat-square-dots"></i>
      </button>
      <div class="mt-auto mb-2">
        <button class="appsheet-rail-btn" id="appsheet-rail-grid-btn" title="All Modules (Navigation Drawer)" onclick="AppUI.toggleNavDrawer()">
          <i class="bi bi-grid-3x3-gap fs-5"></i>
        </button>
      </div>
    `;

    // Populate #sidebar if present
    const sidebarEl = document.getElementById('sidebar');
    if (sidebarEl) {
      sidebarEl.className = 'appsheet-rail';
      sidebarEl.innerHTML = railHTML;
    }

    // Populate .appsheet-rail if present (for pages using aside.appsheet-rail)
    const railEl = document.querySelector('aside.appsheet-rail');
    if (railEl && railEl !== sidebarEl) {
      railEl.innerHTML = railHTML;
    }

    // 2. Remove legacy dark tmsNavDrawer if present
    const oldTmsDrawer = document.getElementById('tmsNavDrawer');
    if (oldTmsDrawer) {
      oldTmsDrawer.remove();
    }

    // 3. Inject / Update Authentic Google AppSheet Offcanvas Navigation Drawer
    let drawerEl = document.getElementById('appsheetNavDrawer');
    if (!drawerEl) {
      drawerEl = document.createElement('div');
      drawerEl.className = 'offcanvas offcanvas-start offcanvas-appsheet';
      drawerEl.tabIndex = -1;
      drawerEl.id = 'appsheetNavDrawer';
      drawerEl.setAttribute('aria-labelledby', 'drawerTitleGlobal');
      document.body.appendChild(drawerEl);
    }

    drawerEl.innerHTML = `
      <div class="offcanvas-header">
        <div class="d-flex align-items-center gap-2">
          <span class="fs-4">🚛</span>
          <h6 class="offcanvas-title mb-0 fw-bold" id="drawerTitleGlobal">MTC & TTC Logistics</h6>
        </div>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body p-2">
        <a href="${basePath}index.html" class="drawer-link ${(activePage === 'dashboard' || activePage === 'home') ? 'active' : ''}">
          <i class="bi bi-house-door-fill text-warning"></i> AppSheet Home Portal
        </a>

        <!-- 1 Bilty -->
        <div class="drawer-nav-section text-warning">1 Bilty</div>
        <a href="${pagesPath}bilty-booking.html" class="drawer-link ${activePage === 'bilty' ? 'active' : ''}">
          <i class="bi bi-file-earmark-plus text-warning"></i> Bilty Booking
        </a>
        <a href="${pagesPath}ledger.html" class="drawer-link ${activePage === 'ledger' ? 'active' : ''}">
          <i class="bi bi-journal-bookmark text-danger"></i> Ledger (खाताबही)
        </a>

        <!-- 2 Trip -->
        <div class="drawer-nav-section text-info">2 Trip</div>
        <a href="${pagesPath}trips.html" class="drawer-link ${activePage === 'trips' ? 'active' : ''}">
          <i class="bi bi-truck text-primary"></i> Trips
        </a>
        <a href="${pagesPath}cheques.html" class="drawer-link ${activePage === 'cheques' ? 'active' : ''}">
          <i class="bi bi-credit-card-2-front text-warning"></i> Cheques
        </a>
        <a href="${pagesPath}trips.html?view=to_be_created" class="drawer-link ${activePage === 'to_be_created' ? 'active' : ''}">
          <i class="bi bi-calculator text-info"></i> To be Created (पेंडिंग बिल्टी)
        </a>
        <a href="${pagesPath}parties.html" class="drawer-link ${activePage === 'parties' ? 'active' : ''}">
          <i class="bi bi-building text-success"></i> Parties Master (3,396)
        </a>
        <a href="${pagesPath}owners.html" class="drawer-link ${activePage === 'owners' ? 'active' : ''}">
          <i class="bi bi-person-badge text-secondary"></i> Owners (586 गाड़ी मालिक)
        </a>

        <!-- 3 Shahpura -->
        <div class="drawer-nav-section text-success">3 Shahpura</div>
        <a href="${pagesPath}cash-register.html#def-urea" class="drawer-link ${activePage === 'def_urea' ? 'active' : ''}">
          <i class="bi bi-droplet-half text-info"></i> DEF Urea
        </a>
        <a href="${pagesPath}cash-register.html" class="drawer-link ${(activePage === 'shahpura' || activePage === 'cash') ? 'active' : ''}">
          <i class="bi bi-wallet2 text-success"></i> Shahpura (Cash Book)
        </a>

        <!-- 1 Resources -->
        <div class="drawer-nav-section text-secondary">1 Resources</div>
        <a href="${pagesPath}bilty-booking.html#pdf" class="drawer-link ${activePage === 'pdf' ? 'active' : ''}">
          <i class="bi bi-file-earmark-pdf text-danger"></i> PDF (बिल्टी प्रिंट्स)
        </a>
        <a href="${pagesPath}brokers.html" class="drawer-link ${activePage === 'brokers' ? 'active' : ''}">
          <i class="bi bi-people text-primary"></i> Brokers (764 दलाल)
        </a>
        <a href="${pagesPath}drivers.html" class="drawer-link ${activePage === 'drivers' ? 'active' : ''}">
          <i class="bi bi-person-vcard text-info"></i> Drivers (888 ड्राइवर)
        </a>
        <a href="${pagesPath}settlement.html#partnership" class="drawer-link ${activePage === 'partnership' ? 'active' : ''}">
          <i class="bi bi-diagram-3 text-warning"></i> Partnership
        </a>

        <!-- More Operations -->
        <div class="drawer-nav-section text-muted">More Operations</div>
        <a href="${pagesPath}settlement.html" class="drawer-link ${activePage === 'settlement' ? 'active' : ''}">
          <i class="bi bi-patch-check-fill text-warning"></i> Trips Settlement
        </a>
        <a href="${pagesPath}eway-bills.html" class="drawer-link ${activePage === 'eway' ? 'active' : ''}">
          <i class="bi bi-shield-exclamation text-warning"></i> E-Way Bills & Validity
        </a>
        <a href="${pagesPath}pod-register.html" class="drawer-link ${activePage === 'pod' ? 'active' : ''}">
          <i class="bi bi-card-checklist text-info"></i> POD (पावती) Register
        </a>
        <a href="${pagesPath}gst-invoices.html" class="drawer-link ${activePage === 'gst' ? 'active' : ''}">
          <i class="bi bi-receipt-cutoff text-success"></i> GST Freight Invoices
        </a>
        <a href="${pagesPath}diesel-register.html" class="drawer-link ${activePage === 'diesel' ? 'active' : ''}">
          <i class="bi bi-fuel-pump text-danger"></i> Diesel Register
        </a>
      </div>
    `;

    // 4. Inject Modals (About, Feedback, User Profile)
    this.ensureGlobalModals();

    // 5. Connect Topbar Hamburger toggles & Mobile Floating Grid Button
    this.bindHamburgerToggles();
    this.injectMobileFloatingNav();
  },

  // Toggle AppSheet Navigation Drawer (Works globally on Desktop and Mobile)
  toggleNavDrawer() {
    const drawerEl = document.getElementById('appsheetNavDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsOffcanvas.toggle();
    }
  },

  // Inject Mobile Floating Grid Button (Same square icon for mobile screens)
  injectMobileFloatingNav() {
    if (document.getElementById('mobile-grid-nav-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'mobile-grid-nav-btn';
    btn.className = 'btn btn-dark shadow rounded-circle d-md-none position-fixed bottom-0 start-0 m-3';
    btn.style.cssText = 'width: 44px; height: 44px; z-index: 1045; background: #202124; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2);';
    btn.title = 'All Modules (Navigation Drawer)';
    btn.innerHTML = '<i class="bi bi-grid-3x3-gap fs-5 text-white"></i>';
    btn.onclick = (e) => {
      e.preventDefault();
      this.toggleNavDrawer();
    };
    document.body.appendChild(btn);
  },

  // Focus Search Box or Open Drawer
  focusSearchOrOpenDrawer() {
    const searchInput = document.querySelector('#search-home-input, #bilty-search-input, #trips-search-input, #ledger-search-input, input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
      if (this.showToast) {
        this.showToast('Search activated. Type keywords to filter.', 'info');
      }
    } else {
      this.toggleNavDrawer();
    }
  },

  // Ensure Global Modals Exist in DOM
  ensureGlobalModals() {
    // 1. About Modal
    if (!document.getElementById('appsheetAboutModal')) {
      const aboutDiv = document.createElement('div');
      aboutDiv.id = 'appsheetAboutModal';
      aboutDiv.className = 'modal fade';
      aboutDiv.tabIndex = -1;
      aboutDiv.setAttribute('aria-hidden', 'true');
      aboutDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-bottom pb-2">
              <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                <span>🚛</span> MTC & TTC Logistics ERP
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
              <div class="text-center mb-3">
                <div class="badge bg-warning text-dark px-3 py-2 fs-6 mb-2">v2026.1 Google AppSheet Edition</div>
                <p class="text-muted small">Centralized Multi-Firm Fleet & Accounting ERP System</p>
              </div>
              <div class="list-group list-group-flush border rounded mb-3">
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-truck text-primary me-2"></i> Trips & Dispatches</span>
                  <span class="badge bg-primary rounded-pill">6,677 Active</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-building text-success me-2"></i> Parties Master</span>
                  <span class="badge bg-success rounded-pill">3,396 Records</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-person-badge text-secondary me-2"></i> Truck Owners</span>
                  <span class="badge bg-secondary rounded-pill">586 Records</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-people text-info me-2"></i> Transport Brokers</span>
                  <span class="badge bg-info text-dark rounded-pill">764 Records</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-person-vcard text-dark me-2"></i> Fleet Drivers</span>
                  <span class="badge bg-dark rounded-pill">888 Records</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-cloud-check-fill text-success me-2"></i> Database Source</span>
                  <span class="badge bg-light text-success border fw-bold">Live Firebase Cloud</span>
                </div>
              </div>
              <div class="alert alert-light border small text-muted mb-0">
                Firms: <strong>Marwar Transport Co. (MTC)</strong> & <strong>The Tata Cargo (TTC)</strong><br>
                Hubs: Kotputli, Shahpura, Jaipur
              </div>
            </div>
            <div class="modal-footer border-0 pt-0">
              <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(aboutDiv);
    }

    // 2. Feedback & Support Modal
    if (!document.getElementById('appsheetFeedbackModal')) {
      const feedbackDiv = document.createElement('div');
      feedbackDiv.id = 'appsheetFeedbackModal';
      feedbackDiv.className = 'modal fade';
      feedbackDiv.tabIndex = -1;
      feedbackDiv.setAttribute('aria-hidden', 'true');
      feedbackDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-bottom pb-2">
              <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                <i class="bi bi-chat-square-dots text-primary"></i> Help & Direct Support
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
              <p class="text-muted small mb-3">Connect directly with logistics support via WhatsApp, Phone call or send an instant message.</p>
              
              <div class="d-grid gap-2 mb-3">
                <a href="https://wa.me/919829241717?text=Hello%20MTC%20TTC%20Logistics%20Support" target="_blank" class="btn btn-success d-flex align-items-center justify-content-center gap-2 py-2">
                  <i class="bi bi-whatsapp fs-5"></i> Chat on WhatsApp (+91 9829241717)
                </a>
                <a href="tel:+919829241717" class="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 py-2">
                  <i class="bi bi-telephone-fill"></i> Call Hotline (+91 9829241717)
                </a>
              </div>

              <hr class="my-3">

              <div>
                <label class="form-label fw-bold small text-dark">Send Quick Feedback / Suggestion</label>
                <textarea id="feedback-text-input" class="form-control mb-2" rows="3" placeholder="Enter your feedback, idea, or issue..."></textarea>
                <button type="button" class="btn btn-primary w-100" onclick="AppUI.submitFeedback()">
                  <i class="bi bi-send-fill me-1"></i> Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(feedbackDiv);
    }

    // 3. User Profile Modal
    if (!document.getElementById('appsheetUserProfileModal')) {
      const userDiv = document.createElement('div');
      userDiv.id = 'appsheetUserProfileModal';
      userDiv.className = 'modal fade';
      userDiv.tabIndex = -1;
      userDiv.setAttribute('aria-hidden', 'true');
      userDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content border-0 shadow text-center p-3">
            <div class="modal-header border-0 pb-0 justify-content-end">
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body pt-0">
              <div class="mx-auto mb-2" style="width: 58px; height: 58px; border-radius: 50%; background: #bfa15f; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700;">
                S
              </div>
              <h6 class="fw-bold mb-0 text-dark">Sachin</h6>
              <small class="text-muted d-block mb-3">Super Admin (Master Access)</small>
              
              <div class="p-2 border rounded bg-light text-start small mb-3">
                <div class="d-flex justify-content-between py-1 border-bottom">
                  <span class="text-muted">Role:</span>
                  <span class="fw-bold text-dark">Super Admin</span>
                </div>
                <div class="d-flex justify-content-between py-1 border-bottom">
                  <span class="text-muted">Company:</span>
                  <span class="fw-bold text-dark">MTC & TTC Transport</span>
                </div>
                <div class="d-flex justify-content-between py-1">
                  <span class="text-muted">All Modules:</span>
                  <span class="badge bg-success">13 Unlocked</span>
                </div>
              </div>

              <button type="button" class="btn btn-outline-secondary btn-sm w-100" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(userDiv);
    }
  },

  // Bind Hamburger & Grid Buttons to AppSheet Drawer
  bindHamburgerToggles() {
    const toggles = document.querySelectorAll('#sidebar-toggle, .btn-hamburger, #appsheet-rail-grid-btn, #mobile-grid-nav-btn');
    toggles.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.toggleNavDrawer();
      };
    });
  },

  // Modal Triggers
  showAboutModal() {
    this.ensureGlobalModals();
    const modalEl = document.getElementById('appsheetAboutModal');
    if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  showFeedbackModal() {
    this.ensureGlobalModals();
    const modalEl = document.getElementById('appsheetFeedbackModal');
    if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  showUserProfile() {
    this.ensureGlobalModals();
    const modalEl = document.getElementById('appsheetUserProfileModal');
    if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  },

  submitFeedback() {
    const input = document.getElementById('feedback-text-input');
    const val = input ? input.value.trim() : '';
    if (!val) {
      this.showToast('Please type your feedback before sending.', 'info');
      return;
    }
    const modalEl = document.getElementById('appsheetFeedbackModal');
    if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }
    if (input) input.value = '';
    this.showToast('✓ Thank you! Your feedback has been recorded.', 'success');
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

  // Toggle Mobile Navigation / Drawer
  toggleMobileNav() {
    this.toggleNavDrawer();
  }
};

window.AppUI = AppUI;

// Initialize common interactions when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  AppUI.bindHamburgerToggles();
  AppUI.injectMobileFloatingNav();
});

