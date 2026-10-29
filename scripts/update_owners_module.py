with open('js/modules/owners.js', 'r', encoding='utf-8') as f:
    code = f.read()

idx = code.find('const standardText =')
if idx != -1:
    end_idx = code.find('return false;', idx) + len('return false;')
    old_block = code[idx:end_idx]
    new_block = """const fields = [grRaw, grFormatted, dt, truck, owner, dest, trans, ref, driver, st, due, dueFormatted];
        for (const f of fields) {
          const fl = f.toLowerCase();
          if (fl.includes(rawQ)) return true;
          const cleanF = fl.replace(/,/g, '').replace(/\\s+/g, '');
          if (cleanF.includes(cleanQ)) return true;
        }

        // Alternate date format matching (e.g. 29-10-2026 vs 29/10/2026)
        if (dt.replace(/\\//g, '-').includes(rawQ) || dt.replace(/-/g, '/').includes(rawQ)) return true;

        return false;"""
    code = code[:idx] + new_block + code[end_idx:]
    print("Replaced standardText with per-field search logic successfully!")
    with open('js/modules/owners.js', 'w', encoding='utf-8') as f:
        f.write(code)
else:
    print("Could not find const standardText =")
