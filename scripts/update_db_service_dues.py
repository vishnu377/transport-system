with open('js/db-service.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """    const dueMap = new Map();
    const deletedSet = this.deletedIds.ownerDues || new Set();

    // 1. Base Dues
    for (const d of baseDues) {
      if (d && d.id && !deletedSet.has(String(d.id))) {
        dueMap.set(String(d.id), d);
      }
    }

    // 2. Cloud items from Firebase Cloud Firestore
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (!d || !d.id || deletedSet.has(String(d.id))) continue;
        const existing = dueMap.get(String(d.id)) || {};
        dueMap.set(String(d.id), { ...existing, ...d });
      }
    }

    // 3. In-memory session dues
    if (this.sessionStore.ownerDues) {
      this.sessionStore.ownerDues.forEach((d, id) => {
        if (!d || deletedSet.has(String(id))) return;
        const existing = dueMap.get(String(id)) || {};
        dueMap.set(String(id), { ...existing, ...d });
      });
    }"""

replacement = """    const cleanGr = gr => {
      if (!gr && gr !== 0) return '';
      return String(gr).replace(/^\\d{4}-\\d{4}-/, '').replace(/_(TTC|SMTC|MTC)$/i, '').replace(/,/g, '').trim();
    };

    const dueMap = new Map();
    const deletedSet = this.deletedIds.ownerDues || new Set();

    // 1. Base Dues
    for (const d of baseDues) {
      const cgr = cleanGr(d.grNo || d.id);
      if (cgr && !deletedSet.has(String(d.id)) && !deletedSet.has(cgr)) {
        d.grNo = cgr;
        dueMap.set(cgr, d);
      }
    }

    // 2. Cloud items from Firebase Cloud Firestore
    if (Array.isArray(cloudItems)) {
      for (const d of cloudItems) {
        if (!d || d.isRateDiff || d.status === 'Rate Difference') continue;
        const cgr = cleanGr(d.grNo || d.shortGrNo || d.id);
        if (!cgr || deletedSet.has(String(d.id)) || deletedSet.has(cgr)) continue;
        d.grNo = cgr;
        const existing = dueMap.get(cgr) || {};
        dueMap.set(cgr, { ...existing, ...d, grNo: cgr });
      }
    }

    // 3. In-memory session dues
    if (this.sessionStore.ownerDues) {
      this.sessionStore.ownerDues.forEach((d, id) => {
        if (!d) return;
        const cgr = cleanGr(d.grNo || id);
        if (!cgr || deletedSet.has(String(id)) || deletedSet.has(cgr)) return;
        d.grNo = cgr;
        const existing = dueMap.get(cgr) || {};
        dueMap.set(cgr, { ...existing, ...d, grNo: cgr });
      });
    }"""

target_crlf = target.replace('\n', '\r\n')
replacement_crlf = replacement.replace('\n', '\r\n')

if target in code:
    code = code.replace(target, replacement)
    print("Replaced in js/db-service.js (LF)")
elif target_crlf in code:
    code = code.replace(target_crlf, replacement_crlf)
    print("Replaced in js/db-service.js (CRLF)")
else:
    print("Could not find target in js/db-service.js")

with open('js/db-service.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved js/db-service.js")
