/**
 * Staff & Multi-User Accounts Management Module
 */

const UsersModule = {
  allUsers: [],
  currentRoleFilter: 'ALL',

  async init() {
    AppUI.renderSidebar('users');
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async loadData() {
    this.allUsers = await dbService.getAll('users');
  },

  updateKPIs() {
    let totalCount = this.allUsers.length;
    let adminCount = 0;
    let operatorCount = 0;
    let activeCount = 0;

    this.allUsers.forEach(u => {
      if (u.role === 'SUPER_ADMIN') adminCount++;
      else if (u.role === 'BRANCH_MUNSHI') operatorCount++;

      if (u.status !== 'Inactive') activeCount++;
    });

    const elTotal = document.getElementById('kpi-users-total');
    const elAdmins = document.getElementById('kpi-users-admins');
    const elOperators = document.getElementById('kpi-users-operators');
    const elActive = document.getElementById('kpi-users-active');

    if (elTotal) elTotal.innerText = totalCount;
    if (elAdmins) elAdmins.innerText = `${adminCount} Admins`;
    if (elOperators) elOperators.innerText = `${operatorCount} Munshis`;
    if (elActive) elActive.innerText = `${activeCount} Active`;
  },

  renderTable() {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;

    const roleFilter = document.getElementById('role-filter')?.value || 'ALL';
    const searchQuery = (document.getElementById('user-search')?.value || '').toLowerCase().trim();

    const filtered = this.allUsers.filter(u => {
      if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
      if (searchQuery) {
        const text = `${u.name} ${u.email} ${u.branch} ${u.firm} ${u.mobile}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i> No staff accounts found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(u => {
      let roleBadge = '';
      if (u.role === 'SUPER_ADMIN') {
        roleBadge = '<span class="badge bg-primary"><i class="bi bi-shield-lock-fill me-1"></i>Super Admin</span>';
      } else if (u.role === 'BRANCH_MUNSHI') {
        roleBadge = '<span class="badge bg-warning text-dark"><i class="bi bi-building me-1"></i>Branch Munshi</span>';
      } else {
        roleBadge = '<span class="badge bg-info text-dark"><i class="bi bi-calculator me-1"></i>Accountant</span>';
      }

      const isActive = u.status !== 'Inactive';

      return `
        <tr>
          <td>
            <div class="fw-bold text-dark">${u.name}</div>
            <small class="text-muted">Created: ${AppUI.formatDate(u.createdAt || '')}</small>
          </td>
          <td>
            <span class="font-monospace fw-semibold text-primary">${u.email}</span>
          </td>
          <td>${roleBadge}</td>
          <td>
            <div class="small fw-semibold">${u.branch || 'Head Office'}</div>
            <small class="text-muted">${u.firm || 'All Firms'}</small>
          </td>
          <td class="font-monospace small">${u.mobile || '-'}</td>
          <td>
            <span class="badge ${isActive ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
              <i class="bi ${isActive ? 'bi-check-circle' : 'bi-slash-circle'} me-1"></i>
              ${isActive ? 'Active' : 'Inactive (Blocked)'}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary py-0 px-2" title="Edit Staff" onclick="UsersModule.openEditUserModal('${u.id}')">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-outline-warning py-0 px-2" title="Reset Password" onclick="UsersModule.openResetPasswordModal('${u.id}')">
                <i class="bi bi-key"></i>
              </button>
              <button class="btn ${isActive ? 'btn-outline-secondary' : 'btn-outline-success'} py-0 px-2" title="${isActive ? 'Deactivate Account' : 'Activate Account'}" onclick="UsersModule.toggleStatus('${u.id}')">
                <i class="bi ${isActive ? 'bi-pause-circle' : 'bi-play-circle'}"></i>
              </button>
              ${u.role !== 'SUPER_ADMIN' ? `
                <button class="btn btn-outline-danger py-0 px-2" title="Delete User" onclick="UsersModule.deleteUser('${u.id}')">
                  <i class="bi bi-trash"></i>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openAddUserModal() {
    const form = document.getElementById('form-user');
    if (form) form.reset();

    document.getElementById('usr-id').value = '';
    document.getElementById('modalUserTitle').innerHTML = '<i class="bi bi-person-plus me-2"></i> Create New Staff Account';
    document.getElementById('usr-password').required = true;

    const modal = new bootstrap.Modal(document.getElementById('modalAddUser'));
    modal.show();
  },

  openEditUserModal(id) {
    const u = this.allUsers.find(user => String(user.id) === String(id));
    if (!u) return;

    document.getElementById('usr-id').value = u.id;
    document.getElementById('modalUserTitle').innerHTML = '<i class="bi bi-pencil-square me-2"></i> Edit Staff Account: ' + u.name;
    document.getElementById('usr-name').value = u.name || '';
    document.getElementById('usr-email').value = u.email || '';
    document.getElementById('usr-password').value = u.password || '';
    document.getElementById('usr-password').required = false;
    document.getElementById('usr-mobile').value = u.mobile || '';
    document.getElementById('usr-role').value = u.role || 'BRANCH_MUNSHI';
    document.getElementById('usr-branch').value = u.branch || 'Shahpura Yard';
    document.getElementById('usr-firm').value = u.firm || 'All Firms (TTC + MTC + SMTC)';
    document.getElementById('usr-status').value = u.status || 'Active';

    const modal = new bootstrap.Modal(document.getElementById('modalAddUser'));
    modal.show();
  },

  async saveUser(e) {
    e.preventDefault();
    const id = document.getElementById('usr-id').value;
    const name = document.getElementById('usr-name').value.trim();
    const email = document.getElementById('usr-email').value.trim().toLowerCase();
    const password = document.getElementById('usr-password').value;
    const mobile = document.getElementById('usr-mobile').value.trim();
    const role = document.getElementById('usr-role').value;
    const branch = document.getElementById('usr-branch').value.trim();
    const firm = document.getElementById('usr-firm').value;
    const status = document.getElementById('usr-status').value;

    const userData = {
      name,
      email,
      password,
      mobile,
      role,
      branch,
      firm,
      status
    };

    if (id) {
      await dbService.update('users', id, userData);
      AppUI.showToast(`Staff account for ${name} updated!`, "success");
    } else {
      userData.createdAt = new Date().toISOString();
      await dbService.add('users', userData);
      AppUI.showToast(`New staff account for ${name} created!`, "success");
    }

    const modalEl = document.getElementById('modalAddUser');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  openResetPasswordModal(id) {
    const u = this.allUsers.find(user => String(user.id) === String(id));
    if (!u) return;

    document.getElementById('reset-user-id').value = u.id;
    document.getElementById('reset-user-name').innerText = u.name;
    document.getElementById('new-password-input').value = '';

    const modal = new bootstrap.Modal(document.getElementById('modalResetPassword'));
    modal.show();
  },

  async saveNewPassword(e) {
    e.preventDefault();
    const id = document.getElementById('reset-user-id').value;
    const newPassword = document.getElementById('new-password-input').value;

    await dbService.update('users', id, { password: newPassword });

    const modalEl = document.getElementById('modalResetPassword');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    AppUI.showToast("Staff password updated successfully!", "success");
    await this.loadData();
  },

  async toggleStatus(id) {
    const u = this.allUsers.find(user => String(user.id) === String(id));
    if (!u) return;

    const newStatus = u.status === 'Inactive' ? 'Active' : 'Inactive';
    await dbService.update('users', u.id, { status: newStatus });

    AppUI.showToast(`Account for ${u.name} marked as ${newStatus}!`, "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  },

  async deleteUser(id) {
    const u = this.allUsers.find(user => String(user.id) === String(id));
    if (!u) return;

    if (!confirm(`Are you sure you want to permanently delete the login account for ${u.name}?`)) return;

    await dbService.delete('users', id);
    AppUI.showToast(`Staff account deleted`, "info");
    await this.loadData();
    this.renderTable();
    this.updateKPIs();
  }
};

document.addEventListener('DOMContentLoaded', () => UsersModule.init());
