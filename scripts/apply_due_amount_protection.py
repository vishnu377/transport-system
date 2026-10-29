# Update js/db-service.js and js/modules/owners.js to protect authentic master due amounts

# 1. Update js/db-service.js
with open('js/db-service.js', 'r', encoding='utf-8') as f:
    db_code = f.read()

target_db = """        // Only overlay on existing authentic master trips
        if (dueMap.has(cgr)) {
          d.grNo = cgr;
          const existing = dueMap.get(cgr) || {};
          dueMap.set(cgr, { ...existing, ...d, grNo: cgr });
        }"""

replace_db = """        // Only overlay on existing authentic master trips
        if (dueMap.has(cgr)) {
          const existing = dueMap.get(cgr) || {};
          const dueAmt = d.userEdited ? Number(d.dueAmount ?? d.ownerDue ?? existing.dueAmount) : existing.dueAmount;
          dueMap.set(cgr, {
            ...existing,
            ...d,
            dueAmount: dueAmt,
            ownerDue: dueAmt,
            year: existing.year,
            grNo: cgr
          });
        }"""

if target_db in db_code:
    db_code = db_code.replace(target_db, replace_db, 1)
    print("Replaced in js/db-service.js (LF)")
else:
    target_db_crlf = target_db.replace('\n', '\r\n')
    if target_db_crlf in db_code:
        db_code = db_code.replace(target_db_crlf, replace_db.replace('\n', '\r\n'), 1)
        print("Replaced in js/db-service.js (CRLF)")
    else:
        print("Could not find target_db in js/db-service.js")

with open('js/db-service.js', 'w', encoding='utf-8') as f:
    f.write(db_code)

# 2. Update js/modules/owners.js
with open('js/modules/owners.js', 'r', encoding='utf-8') as f:
    owners_code = f.read()

target_init_overlay = """            // Only overlay on existing authentic master trips
            if (cleanDuesMap.has(cgr)) {
              const existing = cleanDuesMap.get(cgr);
              cleanDuesMap.set(cgr, { ...existing, ...d, grNo: cgr });
            }"""

replace_init_overlay = """            // Only overlay on existing authentic master trips
            if (cleanDuesMap.has(cgr)) {
              const existing = cleanDuesMap.get(cgr);
              const dueAmt = d.userEdited ? Number(d.dueAmount ?? d.ownerDue ?? existing.dueAmount) : existing.dueAmount;
              cleanDuesMap.set(cgr, {
                ...existing,
                ...d,
                dueAmount: dueAmt,
                ownerDue: dueAmt,
                year: existing.year,
                grNo: cgr
              });
            }"""

if target_init_overlay in owners_code:
    owners_code = owners_code.replace(target_init_overlay, replace_init_overlay, 1)
    print("Replaced init overlay in js/modules/owners.js (LF)")
else:
    target_init_overlay_crlf = target_init_overlay.replace('\n', '\r\n')
    if target_init_overlay_crlf in owners_code:
        owners_code = owners_code.replace(target_init_overlay_crlf, replace_init_overlay.replace('\n', '\r\n'), 1)
        print("Replaced init overlay in js/modules/owners.js (CRLF)")
    else:
        print("Could not find target_init_overlay in js/modules/owners.js")

target_fs_overlay = """          if (change.type === 'removed') {
            // Keep authentic trips
          } else {
            const existing = duesMap.get(cgr) || {};
            duesMap.set(cgr, { ...existing, ...docData, grNo: cgr });
          }"""

replace_fs_overlay = """          if (change.type === 'removed') {
            // Keep authentic trips
          } else {
            const existing = duesMap.get(cgr) || {};
            const dueAmt = docData.userEdited ? Number(docData.dueAmount ?? docData.ownerDue ?? existing.dueAmount) : existing.dueAmount;
            duesMap.set(cgr, {
              ...existing,
              ...docData,
              dueAmount: dueAmt,
              ownerDue: dueAmt,
              year: existing.year,
              grNo: cgr
            });
          }"""

if target_fs_overlay in owners_code:
    owners_code = owners_code.replace(target_fs_overlay, replace_fs_overlay, 1)
    print("Replaced fs overlay in js/modules/owners.js (LF)")
else:
    target_fs_overlay_crlf = target_fs_overlay.replace('\n', '\r\n')
    if target_fs_overlay_crlf in owners_code:
        owners_code = owners_code.replace(target_fs_overlay_crlf, replace_fs_overlay.replace('\n', '\r\n'), 1)
        print("Replaced fs overlay in js/modules/owners.js (CRLF)")
    else:
        print("Could not find target_fs_overlay in js/modules/owners.js")

# Mark userEdited = true in saveTripDrawer when user modifies trip
save_drawer_target = """    d.status = getVal('drawer-trip-status') || d.status;"""
save_drawer_replace = """    d.userEdited = true;
    d.status = getVal('drawer-trip-status') || d.status;"""

if save_drawer_target in owners_code:
    owners_code = owners_code.replace(save_drawer_target, save_drawer_replace, 1)
    print("Added d.userEdited = true in saveTripDrawer")

with open('js/modules/owners.js', 'w', encoding='utf-8') as f:
    f.write(owners_code)

print("Updates saved successfully.")
