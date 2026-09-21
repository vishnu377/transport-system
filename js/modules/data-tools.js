/**
 * Data Tools Module
 * Handles Bulk CSV/Excel Imports, Template Downloads, and Full Database Backup/Restore
 * Enhanced with direct SheetJS (.xlsx) parser & 1-Click Mosa Ji Excel Data Loader
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
    const target = document.getElementById('import-target')?.value || 'trips';
    let csvContent = '';
    let filename = '';

    if (target === 'trips') {
      csvContent = "Start Date,Truck No.,G.R.No.,Destination,G.R. No.,Weight,Rate,Freight,Paid,Due,Year,Month,Bill No.,Address,Loading Charges,Is GST Paid by Party?,GST Amount,GST Due Amount,N_G.R.No.\n" +
                   "2026-09-14,RJ52GA7309,2079,Noida (U.P.),2026-2027-2079_TTC,42.36,2150,91074,0,91074,2026-2027,2026-09,INV-001,\"C-25, Phase-2, Noida (U.P.)-201305\",0,Yes,4553.70,0,2079_TTC\n" +
                   "2026-09-15,RJ52GA9546,2051,Sandila (U.P.),2026-2027-2051_TTC,80.00,2250,180000,0,180000,2026-2027,2026-09,INV-002,\"Plot No. B4 & B5, Industrial Area, Sandila\",0,No,0,0,2051_TTC";
      filename = "trips_bilty_template.csv";
    } else if (target === 'parties') {
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

    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    if (isExcel && typeof XLSX !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
          this.parseExcelObjects(jsonRows);
        } catch (err) {
          console.error("Excel parse error:", err);
          AppUI.showToast("Could not parse Excel file. Please ensure it is a valid .xlsx file.", "danger");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // CSV parse
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseCsvText(e.target.result);
      };
      reader.readAsText(file);
    }
  },

  parseExcelObjects(rows) {
    if (!rows || rows.length === 0) {
      AppUI.showToast("The selected Excel sheet has no rows!", "warning");
      return;
    }

    this.parsedRows = rows;
    const headers = Object.keys(rows[0]);

    // Render Preview
    const previewBox = document.getElementById('import-preview-section');
    const thead = document.getElementById('preview-thead');
    const tbody = document.getElementById('preview-tbody');
    const label = document.getElementById('preview-count-label');

    label.innerText = `${rows.length.toLocaleString('en-IN')} Rows Detected in Excel`;
    thead.innerHTML = `<tr>${headers.slice(0, 8).map(h => `<th>${h}</th>`).join('')}</tr>`;

    const sample = rows.slice(0, 5);
    tbody.innerHTML = sample.map(r => `
      <tr>${headers.slice(0, 8).map(h => `<td>${r[h] !== undefined ? r[h] : '-'}</td>`).join('')}</tr>
    `).join('');

    previewBox.classList.remove('d-none');
    document.getElementById('btn-start-import').disabled = false;
  },

  parseCsvText(text) {
    const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      AppUI.showToast("The selected CSV file has no data rows!", "danger");
      return;
    }

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

    this.parseExcelObjects(rows);
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

    if (target === 'trips') {
      // High-performance bulk import for trips
      statusText.innerText = `Preparing ${total.toLocaleString('en-IN')} bilties for import...`;
      progressBar.style.width = '30%';

      const existingTrips = await dbService.getAll('trips');
      const tripMap = new Map();
      existingTrips.forEach(t => tripMap.set(t.grNo || t.id, t));

      for (let i = 0; i < total; i++) {
        const r = this.parsedRows[i];
        const grNo = r['G.R. No.'] || r.grNo || r['G.R.No.'] || `TRIP_${Date.now()}_${i}`;
        const shortGr = r['N_G.R.No.'] || r.shortGrNo || '';
        const year = r.Year || r.financialYear || '2026-2027';

        let transport = 'TTC';
        const grUpper = String(grNo).toUpperCase();
        if (grUpper.includes('SMTC') || grUpper.includes('MAHAVEER')) transport = 'SMTC';
        else if (grUpper.includes('MTC')) transport = 'MTC';

        const weight = Number(r.Weight || r.weight) || 0;
        const rate = Number(r.Rate || r.rate) || 0;
        const freight = Number(r.Freight || r.freight) || (weight * rate);
        const paid = Number(r.Paid || r.partyPaid) || 0;
        const due = Number(r.Due || r.partyDue) || (freight - paid);

        const tripItem = {
          id: `TRIP_IMP_${Date.now()}_${i}`,
          grNo: String(grNo),
          grSeq: String(r['G.R.No.'] || r.grSeq || ''),
          shortGrNo: String(shortGr),
          transport: transport,
          biltyType: "Regular",
          financialYear: String(year),
          tripStartDate: String(r['Start Date'] || r.tripStartDate || new Date().toISOString().split('T')[0]),
          truckNo: String(r['Truck No.'] || r.truckNo || '').toUpperCase().replace(/\s+/g, ''),
          truckOwner: String(r['Truck No.'] || r.truckNo || '') + ' Owner',
          driver: "Assigned Driver",
          driverMobile: "",
          origin: "Rajsamand (Raj.)",
          destination: String(r.Destination || r.destination || ''),
          deliveryAddress: String(r.Address || r.deliveryAddress || ''),
          consignor: "MTC & TTC Logistics Consignor",
          consignee: String(r.Destination || r.destination || ''),
          material: "Marble Powder / Goods",
          billingType: "Per Tonne",
          weight: weight,
          rate: rate,
          freight: freight,
          loadingCharges: Number(r['Loading Charges'] || r.loadingCharges) || 0,
          billNo: String(r['Bill No.'] || r.billNo || ''),
          isGstPaidByParty: String(r['Is GST Paid by Party?'] || r.isGstPaidByParty || 'No'),
          gstAmount: Number(r['GST Amount'] || r.gstAmount) || 0,
          gstDueAmount: Number(r['GST Due Amount'] || r.gstDueAmount) || 0,
          partyPaid: paid,
          partyDue: due,
          ownerDue: freight * 0.9,
          commission: 0,
          status: due <= 0 ? 'Settled' : 'Transit'
        };

        tripMap.set(tripItem.grNo, tripItem);

        if (i % 500 === 0) {
          const percent = Math.round((i / total) * 60) + 30;
          progressBar.style.width = `${percent}%`;
          statusText.innerText = `Processed ${i} of ${total} records...`;
        }
      }

      const mergedList = Array.from(tripMap.values());
      localStorage.setItem('tms_trips', JSON.stringify(mergedList));
      progressBar.style.width = '100%';
      statusText.innerText = `Success! ${total} bilties imported into Trips Register.`;
      AppUI.showToast(`Successfully imported ${total} bilties into Trips Register!`, "success");
      await this.updateRecordCounts();
      return;
    }

    // Standard imports for parties, truckOwners, drivers, brokers
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
        const truckList = String(trucksRaw).split(/[\s,;/]+/).filter(t => t.trim().length > 0);
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

      if (i % 10 === 0 || i === total - 1) {
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

  // 1-Click Mosa Ji Excel Data Loader
  async loadMosaJiExcelData() {
    if (typeof window === 'undefined' || !window.INITIAL_EXCEL_TRIPS) {
      AppUI.showToast("Dataset file not found! Please check sample-trips-data.js.", "danger");
      return;
    }

    const tripsCount = window.INITIAL_EXCEL_TRIPS.length;
    const trucksCount = window.INITIAL_EXCEL_TRUCKS ? window.INITIAL_EXCEL_TRUCKS.length : 74;

    const btn = document.querySelector('button[onclick="DataToolsModule.loadMosaJiExcelData()"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Loading ${tripsCount.toLocaleString('en-IN')} Bilties...`;
    }

    try {
      localStorage.setItem('tms_trips', JSON.stringify(window.INITIAL_EXCEL_TRIPS));
      if (window.INITIAL_EXCEL_TRUCKS) {
        const existingOwners = JSON.parse(localStorage.getItem('tms_truckOwners') || '[]');
        localStorage.setItem('tms_truckOwners', JSON.stringify([...existingOwners, ...window.INITIAL_EXCEL_TRUCKS]));
      }
      localStorage.setItem('tms_excel_imported_v1', 'true');

      AppUI.showToast(`Success! ${tripsCount.toLocaleString('en-IN')} Bilties and ${trucksCount} Trucks loaded into the system!`, "success");
      await this.updateRecordCounts();

      if (btn) {
        btn.className = 'btn btn-outline-success fw-bold w-100 py-2';
        btn.innerHTML = `<i class="bi bi-check2-all me-1"></i> ${tripsCount.toLocaleString('en-IN')} Bilties & ${trucksCount} Trucks Loaded!`;
      }
    } catch (err) {
      console.error("Error loading Excel data:", err);
      AppUI.showToast("Failed to load Excel data: " + err.message, "danger");
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `⚡ 1-Click: Load Mosa Ji's 5,103 Real Bilties & 74 Trucks Now`;
      }
    }
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
      'gstInvoices', 'podRecords', 'dieselSlips',
      'ewayBills', 'fleetCompliance', 'users'
    ];

    const backupData = {
      system: "MTC & TTC Logistics TMS ERP",
      version: "2.0",
      backupTimestamp: new Date().toISOString(),
      data: {}
    };

    for (const col of collections) {
      backupData.data[col] = await dbService.getAll(col);
    }

    const jsonStr = JSON.stringify(backupData, null, 2);
    const filename = `TTC_TMS_Full_Backup_${new Date().toISOString().split('T')[0]}.json`;
    this.triggerDownload(jsonStr, filename, 'application/json');
    AppUI.showToast("Full system backup downloaded successfully!", "success");
  },

  // Restore Database from JSON
  restoreJsonBackup() {
    const fileInput = document.getElementById('restore-file');
    const file = fileInput.files[0];
    if (!file) {
      AppUI.showToast("Please choose a valid .json backup file first!", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (!backup.data) {
          throw new Error("Invalid backup structure");
        }

        if (confirm("Restore will overwrite your current local records with this backup. Do you want to proceed?")) {
          for (const col in backup.data) {
            localStorage.setItem(`tms_${col}`, JSON.stringify(backup.data[col]));
          }
          AppUI.showToast("Database restored successfully!", "success");
          await this.updateRecordCounts();
        }
      } catch (err) {
        AppUI.showToast("Failed to restore backup: Invalid JSON file.", "danger");
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
