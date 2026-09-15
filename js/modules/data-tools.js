/**
 * Data Tools Module
 * Handles Bulk CSV/Excel Imports, Template Downloads, and Full Database Backup/Restore
 */

const DataToolsModule = {
  parsedRows: [],
  selectedFile: null,

  async init() {
    AppUI.renderSidebar('data-tools');
    await this.updateRecordCounts();
  },

  async updateRecordCounts() {
    const parties = await dbService.getAll('parties');
    const owners = await dbService.getAll('truckOwners');
    const trips = await dbService.getAll('trips');
    const payments = await dbService.getAll('payments');
    const cheques = await dbService.getAll('cheques');
    const diesel = await dbService.getAll('dieselSlips');

    const setVal = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.innerText = count.toLocaleString('en-IN');
    };

    setVal('cnt-parties', parties.length);
    setVal('cnt-owners', owners.length);
    setVal('cnt-trips', trips.length);
    setVal('cnt-payments', payments.length);
    setVal('cnt-cheques', cheques.length);
    setVal('cnt-diesel', diesel.length);
  },

  onTargetChange() {
    // Reset file input & preview
    const fileInput = document.getElementById('import-file');
    if (fileInput) fileInput.value = '';
    this.parsedRows = [];
    document.getElementById('import-preview-section').classList.add('d-none');
    document.getElementById('btn-start-import').disabled = true;
  },

  downloadTemplate() {
    const target = document.getElementById('import-target')?.value || 'parties';
    let csvContent = '';
    let filename = '';

    if (target === 'parties') {
      csvContent = "Name,GSTIN,Address,Mobile,ContactPerson,DueAmount,PaidAmount\n" +
                   "Berger Paints India Ltd.,09AABCB0976E2ZS,\"Sandila Industrial Area, Hardoi, UP\",9414659401,Logistics Head,540000,294671469\n" +
                   "Bholenath Minerals,08MWJPK6870R1Z6,\"Industrial Area, Rajsamand, Raj.\",9829241717,Bholenath Ji,180000,15480000";
      filename = "parties_import_template.csv";
    } else if (target === 'truckOwners') {
      csvContent = "Name,Mobile,Mobile1,Trucks,DueAmount,Type\n" +
                   "Laxmi Prakash Jat,9571272336,9828230022,\"RJ52GA7310 RJ52GA7335\",466800,Market\n" +
                   "MTC Fleet (Self),9414312586,9414011332,\"RJ52GA7729 RJ52GA8678\",0,Self";
      filename = "truck_owners_import_template.csv";
    } else if (target === 'drivers') {
      csvContent = "Name,Mobile,OwnerName,LicenseNo\n" +
                   "Kaluram Jat,9784175913,Laxmi Prakash Jat,RJ-01-2018-00912\n" +
                   "Rk Dewanda,6376140149,Pappu Badak,RJ-52-2020-00451";
      filename = "drivers_import_template.csv";
    } else if (target === 'brokers') {
      csvContent = "Name,Mobile,Location,CommissionRate\n" +
                   "Kunal Micron Vijay Jain,9829241717,Rajsamand,₹2000 / Trip\n" +
                   "Rajesh Rao,7023678976,Udaipur,₹1500 / Trip";
      filename = "brokers_import_template.csv";
    }

    this.triggerDownload(csvContent, filename, 'text/csv;charset=utf-8;');
  },

  onFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      this.parseCsvText(text);
    };
    reader.readAsText(file);
  },

  parseCsvText(text) {
    const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      AppUI.showToast("The selected CSV file has no data rows!", "danger");
      return;
    }

    // Parse CSV handling quotes
    const parseRow = (line) => {
      const result = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
          result.push(cur.trim());
          cur = '';
        } else {
          cur += c;
        }
      }
      result.push(cur.trim());
      return result;
    };

    const headers = parseRow(lines[0]);
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseRow(lines[i]);
      if (values.length === headers.length || values.length >= 2) {
        const rowObj = {};
        headers.forEach((h, idx) => {
          rowObj[h] = values[idx] || '';
        });
        rows.push(rowObj);
      }
    }

    this.parsedRows = rows;

    // Render Preview
    const previewBox = document.getElementById('import-preview-section');
    const thead = document.getElementById('preview-thead');
    const tbody = document.getElementById('preview-tbody');
    const label = document.getElementById('preview-count-label');

    label.innerText = `${rows.length.toLocaleString()} Rows Detected for Import`;
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

    const sample = rows.slice(0, 5);
    tbody.innerHTML = sample.map(r => `
      <tr>${headers.map(h => `<td>${r[h] || '-'}</td>`).join('')}</tr>
    `).join('');

    previewBox.classList.remove('d-none');
    document.getElementById('btn-start-import').disabled = false;
  },

  async processImport() {
    if (this.parsedRows.length === 0) return;

    const target = document.getElementById('import-target').value;
    const progressBox = document.getElementById('import-progress-box');
    const progressBar = document.getElementById('import-progress-bar');
    const statusText = document.getElementById('import-progress-status');
    const btn = document.getElementById('btn-start-import');

    progressBox.classList.remove('d-none');
    btn.disabled = true;

    const total = this.parsedRows.length;
    let imported = 0;

    for (let i = 0; i < total; i++) {
      const r = this.parsedRows[i];
      let itemData = {};

      if (target === 'parties') {
        itemData = {
          name: r.Name || r.name || 'Unnamed Party',
          gstin: r.GSTIN || r.gstin || '',
          address: r.Address || r.address || '',
          mobile: r.Mobile || r.mobile || '',
          contactPerson: r.ContactPerson || r.contactPerson || '',
          dueAmount: Number(r.DueAmount || r.dueAmount) || 0,
          paidAmount: Number(r.PaidAmount || r.paidAmount) || 0
        };
      } else if (target === 'truckOwners') {
        const trucksRaw = r.Trucks || r.trucks || '';
        const truckList = trucksRaw.split(/[\s,;/]+/).filter(t => t.trim().length > 0);
        itemData = {
          name: r.Name || r.name || 'Unnamed Owner',
          mobile: r.Mobile || r.mobile || '',
          mobile1: r.Mobile1 || r.mobile1 || '',
          trucks: truckList,
          dueAmount: Number(r.DueAmount || r.dueAmount) || 0,
          type: r.Type || r.type || 'Market'
        };
      } else if (target === 'drivers') {
        itemData = {
          name: r.Name || r.name || 'Driver',
          mobile: r.Mobile || r.mobile || '',
          ownerName: r.OwnerName || r.ownerName || '',
          licenseNo: r.LicenseNo || r.licenseNo || ''
        };
      } else if (target === 'brokers') {
        itemData = {
          name: r.Name || r.name || 'Broker',
          mobile: r.Mobile || r.mobile || '',
          location: r.Location || r.location || '',
          commissionRate: r.CommissionRate || r.commissionRate || ''
        };
      }

      await dbService.add(target, itemData);
      imported++;

      if (i % 5 === 0 || i === total - 1) {
        const percent = Math.round((imported / total) * 100);
        progressBar.style.width = `${percent}%`;
        statusText.innerText = `Importing ${imported} of ${total} records (${percent}%)...`;
      }
    }

    AppUI.showToast(`Successfully imported ${imported} records into ${target}!`, "success");
    statusText.innerText = `Complete! ${imported} records imported successfully.`;
    progressBar.classList.remove('progress-bar-animated');

    await this.updateRecordCounts();
  },

  // Export any collection as CSV
  async exportCollectionToCsv(collectionName) {
    const items = await dbService.getAll(collectionName);
    if (!items || items.length === 0) {
      AppUI.showToast(`No records found in ${collectionName} to export!`, "info");
      return;
    }

    const headers = Object.keys(items[0]).filter(k => k !== 'id');
    let csv = headers.join(',') + '\n';

    items.forEach(row => {
      const line = headers.map(h => {
        let val = row[h];
        if (Array.isArray(val)) val = val.join(' ');
        if (val === null || val === undefined) val = '';
        val = String(val).replace(/"/g, '""');
        if (val.includes(',') || val.includes('\n')) {
          val = `"${val}"`;
        }
        return val;
      }).join(',');
      csv += line + '\n';
    });

    const filename = `${collectionName}_export_${new Date().toISOString().split('T')[0]}.csv`;
    this.triggerDownload(csv, filename, 'text/csv;charset=utf-8;');
    AppUI.showToast(`Exported ${items.length} records to ${filename}!`, "success");
  },

  // Full Database JSON Backup
  async downloadFullJsonBackup() {
    const collections = [
      'parties', 'truckOwners', 'drivers', 'brokers', 'trips',
      'payments', 'cheques', 'cashBook', 'defUrea',
      'gstInvoices', 'podRecords', 'dieselSlips'
    ];

    const backupData = {
      app: "MTC & TTC Logistics ERP",
      version: "1.2.0",
      backupTimestamp: new Date().toISOString(),
      data: {}
    };

    for (const col of collections) {
      backupData.data[col] = await dbService.getAll(col);
    }

    const jsonStr = JSON.stringify(backupData, null, 2);
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `MTC_TTC_Logistics_FullBackup_${dateStr}.json`;

    this.triggerDownload(jsonStr, filename, 'application/json;charset=utf-8;');
    AppUI.showToast("Full system backup downloaded successfully!", "success");
  },

  // Restore from JSON
  restoreJsonBackup() {
    const fileInput = document.getElementById('restore-file');
    const file = fileInput?.files[0];
    if (!file) {
      AppUI.showToast("Please choose a valid .json backup file first!", "danger");
      return;
    }

    if (!confirm("Are you sure you want to restore the database from this backup? Existing data will be preserved or merged.")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const backupObj = JSON.parse(e.target.result);
        if (!backupObj || !backupObj.data) {
          throw new Error("Invalid backup format!");
        }

        for (const col in backupObj.data) {
          const rows = backupObj.data[col];
          if (Array.isArray(rows)) {
            for (const item of rows) {
              await dbService.add(col, item);
            }
          }
        }

        AppUI.showToast("Database restored successfully from backup!", "success");
        await this.updateRecordCounts();
      } catch (err) {
        AppUI.showToast(`Restore failed: ${err.message}`, "danger");
      }
    };
    reader.readAsText(file);
  },

  triggerDownload(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

document.addEventListener('DOMContentLoaded', () => DataToolsModule.init());
