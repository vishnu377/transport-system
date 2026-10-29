# 1. Update js/db-service.js
with open('js/db-service.js', 'r', encoding='utf-8') as f:
    db_code = f.read()

old_db_cloud = """    // 2. Cloud items from Firebase Cloud Firestore
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (!d || d.isRateDiff || d.status === 'Rate Difference') continue;
        const cgr = cleanGr(d.grNo || d.shortGrNo || d.id);
        if (!cgr || deletedSet.has(String(d.id)) || deletedSet.has(cgr)) continue;
        d.grNo = cgr;
        const existing = dueMap.get(cgr) || {};
        dueMap.set(cgr, { ...existing, ...d, grNo: cgr });
      }
    }"""

new_db_cloud = """    // 2. Cloud items from Firebase Cloud Firestore (Overlay ONLY authentic user edits, drop rogue/stale trips)
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (!d || d.isRateDiff || d.status === 'Rate Difference') continue;
        const cgr = cleanGr(d.grNo || d.shortGrNo || d.id);
        if (!cgr || deletedSet.has(String(d.id)) || deletedSet.has(cgr)) continue;
        // Strict guard: 2024-2025 has ONLY GR 1502. Discard obsolete mock trips (1900-1905)
        if (d.year === '2024-2025' && cgr !== '1502') continue;
        // Only overlay on existing authentic master trips
        if (dueMap.has(cgr)) {
          d.grNo = cgr;
          const existing = dueMap.get(cgr) || {};
          dueMap.set(cgr, { ...existing, ...d, grNo: cgr });
        }
      }
    }"""

if old_db_cloud in db_code:
    db_code = db_code.replace(old_db_cloud, new_db_cloud)
    print("Replaced cloud items block in js/db-service.js (LF)")
else:
    old_db_cloud_crlf = old_db_cloud.replace('\n', '\r\n')
    if old_db_cloud_crlf in db_code:
        db_code = db_code.replace(old_db_cloud_crlf, new_db_cloud.replace('\n', '\r\n'))
        print("Replaced cloud items block in js/db-service.js (CRLF)")
    else:
        print("Could not find old_db_cloud in js/db-service.js")

with open('js/db-service.js', 'w', encoding='utf-8') as f:
    f.write(db_code)

# 2. Update js/modules/owners.js
with open('js/modules/owners.js', 'r', encoding='utf-8') as f:
    owners_code = f.read()

old_owners_init = """    // 2. Load Owner Dues (Dynamic Direct Firebase Cloud Firestore with master asset fallback)
    try {
      if (typeof FirebaseDB !== 'undefined') {
        let dues = null;
        if (typeof FirebaseDB.getAll === 'function') dues = await FirebaseDB.getAll('ownerDues');
        else if (typeof FirebaseDB.getAllOwnerDues === 'function') dues = await FirebaseDB.getAllOwnerDues();
        if (dues && dues.length > 0) {
          this.allOwnerDues = dues;
        }
      }
    } catch (e) {
      console.warn('FirebaseDB getAllOwnerDues fallback:', e);
    }

    if (!this.allOwnerDues || this.allOwnerDues.length === 0) {
      if (typeof window.SAMPLE_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.SAMPLE_OWNER_DUES));
      } else if (typeof window.INITIAL_OWNER_DUES !== 'undefined') {
        this.allOwnerDues = JSON.parse(JSON.stringify(window.INITIAL_OWNER_DUES));
      } else {
        this.allOwnerDues = [];
      }
    }

    // Strict deduplication by clean canonical GR number (never duplicate or show _TTC)
    const cleanDuesMap = new Map();
    (this.allOwnerDues || []).forEach(d => {
      if (!d || d.isRateDiff || d.status === 'Rate Difference') return;
      const cgr = this.canonicalGr(d.grNo || d.id);
      if (!cgr) return;
      d.grNo = cgr;
      if (!cleanDuesMap.has(cgr)) {
        cleanDuesMap.set(cgr, d);
      }
    });
    this.allOwnerDues = Array.from(cleanDuesMap.values());"""

new_owners_init = """    // 2. Load Owner Dues from Authentic Master Dataset (Single Source of Truth)
    let masterDues = [];
    if (typeof window.SAMPLE_OWNER_DUES !== 'undefined' && Array.isArray(window.SAMPLE_OWNER_DUES)) {
      masterDues = JSON.parse(JSON.stringify(window.SAMPLE_OWNER_DUES));
    } else if (typeof window.INITIAL_OWNER_DUES !== 'undefined' && Array.isArray(window.INITIAL_OWNER_DUES)) {
      masterDues = JSON.parse(JSON.stringify(window.INITIAL_OWNER_DUES));
    }

    const cleanDuesMap = new Map();
    masterDues.forEach(d => {
      if (!d || d.isRateDiff || d.status === 'Rate Difference') return;
      const cgr = this.canonicalGr(d.grNo || d.id);
      if (!cgr) return;
      // Guard: 2024-2025 has strictly ONLY GR 1502
      if (d.year === '2024-2025' && cgr !== '1502') return;
      d.grNo = cgr;
      cleanDuesMap.set(cgr, d);
    });

    // Overlay user edits from Firebase Cloud Firestore / Local DB without corrupting totals
    try {
      if (typeof FirebaseDB !== 'undefined') {
        let cloudDues = null;
        if (typeof FirebaseDB.getAllOwnerDues === 'function') cloudDues = await FirebaseDB.getAllOwnerDues();
        else if (typeof FirebaseDB.getAll === 'function') cloudDues = await FirebaseDB.getAll('ownerDues');
        if (Array.isArray(cloudDues)) {
          cloudDues.forEach(d => {
            if (!d || d.isRateDiff || d.status === 'Rate Difference') return;
            const cgr = this.canonicalGr(d.grNo || d.shortGrNo || d.id);
            if (!cgr) return;
            // Reject any rogue 2024-2025 trips other than 1502
            if (d.year === '2024-2025' && cgr !== '1502') return;
            // Only overlay on existing authentic master trips
            if (cleanDuesMap.has(cgr)) {
              const existing = cleanDuesMap.get(cgr);
              cleanDuesMap.set(cgr, { ...existing, ...d, grNo: cgr });
            }
          });
        }
      }
    } catch (e) {
      console.warn('FirebaseDB getAllOwnerDues overlay fallback:', e);
    }

    this.allOwnerDues = Array.from(cleanDuesMap.values());"""

if old_owners_init in owners_code:
    owners_code = owners_code.replace(old_owners_init, new_owners_init)
    print("Replaced init() block in js/modules/owners.js (LF)")
else:
    old_owners_init_crlf = old_owners_init.replace('\n', '\r\n')
    if old_owners_init_crlf in owners_code:
        owners_code = owners_code.replace(old_owners_init_crlf, new_owners_init.replace('\n', '\r\n'))
        print("Replaced init() block in js/modules/owners.js (CRLF)")
    else:
        print("Could not find old_owners_init in js/modules/owners.js")

# Also update setupFirestoreListeners() ownerDues block
old_fs_listener = """      // 2. Real-time dynamic Firestore sync for ownerDues
      db.collection('ownerDues').onSnapshot(snapshot => {
        if (!snapshot || snapshot.empty) return;
        const duesMap = new Map();
        (this.allOwnerDues || []).forEach(d => {
          const cgr = this.canonicalGr(d.grNo || d.id);
          if (cgr) duesMap.set(cgr, d);
        });
        snapshot.docChanges().forEach(change => {
          const docData = { id: change.doc.id, ...change.doc.data() };
          if (docData.isRateDiff || docData.status === 'Rate Difference') return; // Ignore rate differences
          const cgr = this.canonicalGr(docData.grNo || docData.shortGrNo || docData.id);
          if (!cgr) return;
          docData.grNo = cgr;
          if (change.type === 'removed') {
            duesMap.delete(cgr);
          } else {
            const existing = duesMap.get(cgr) || {};
            duesMap.set(cgr, { ...existing, ...docData, grNo: cgr });
          }
        });
        this.allOwnerDues = Array.from(duesMap.values());
        this.updateDueSummaryStats();
        this.renderOwnerDueTable();
      }, err => {
        console.warn('Realtime ownerDues listener:', err);
      });"""

new_fs_listener = """      // 2. Real-time dynamic Firestore sync for ownerDues
      db.collection('ownerDues').onSnapshot(snapshot => {
        if (!snapshot || snapshot.empty) return;
        const duesMap = new Map();
        (this.allOwnerDues || []).forEach(d => {
          const cgr = this.canonicalGr(d.grNo || d.id);
          if (cgr) duesMap.set(cgr, d);
        });
        snapshot.docChanges().forEach(change => {
          const docData = { id: change.doc.id, ...change.doc.data() };
          if (docData.isRateDiff || docData.status === 'Rate Difference') return; // Ignore rate differences
          const cgr = this.canonicalGr(docData.grNo || docData.shortGrNo || docData.id);
          if (!cgr) return;
          // Guard: 2024-2025 has strictly ONLY GR 1502
          if (docData.year === '2024-2025' && cgr !== '1502') return;
          // Only update existing authentic master trips
          if (!duesMap.has(cgr)) return;

          docData.grNo = cgr;
          if (change.type === 'removed') {
            // Keep authentic trips
          } else {
            const existing = duesMap.get(cgr) || {};
            duesMap.set(cgr, { ...existing, ...docData, grNo: cgr });
          }
        });
        this.allOwnerDues = Array.from(duesMap.values());
        this.updateDueSummaryStats();
        this.renderOwnerDueTable();
      }, err => {
        console.warn('Realtime ownerDues listener:', err);
      });"""

if old_fs_listener in owners_code:
    owners_code = owners_code.replace(old_fs_listener, new_fs_listener)
    print("Replaced onSnapshot block in js/modules/owners.js (LF)")
else:
    old_fs_listener_crlf = old_fs_listener.replace('\n', '\r\n')
    if old_fs_listener_crlf in owners_code:
        owners_code = owners_code.replace(old_fs_listener_crlf, new_fs_listener.replace('\n', '\r\n'))
        print("Replaced onSnapshot block in js/modules/owners.js (CRLF)")
    else:
        print("Could not find old_fs_listener in js/modules/owners.js")

with open('js/modules/owners.js', 'w', encoding='utf-8') as f:
    f.write(owners_code)

# 3. Update pages/owners.html header count and showing text to 593
with open('pages/owners.html', 'r', encoding='utf-8') as f:
    html_code = f.read()

html_code = html_code.replace('Number 602', 'Number 593')
html_code = html_code.replace('602 records', '593 records')

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(html_code)

print("Saved all updates successfully!")
