import openpyxl
import json
import re

excel_path = r'C:\Users\HP\Downloads\Parties_GST_Data.xlsx'
wb = openpyxl.load_workbook(excel_path, data_only=True)
sheet = wb['Parties GST Data']

parties = []
seen_keys = set()

# Garbage patterns to exclude
garbage_patterns = [
    r'^[<>\?,\.\s\-_:]+$',
    r'^[\s]+$',
    r'EEE+',
    r'^\s*<\s*$'
]

def is_garbage(val):
    if not val:
        return True
    s = str(val).strip()
    if len(s) <= 1:
        return True
    for p in garbage_patterns:
        if re.search(p, s, re.IGNORECASE):
            return True
    return False

for r in range(2, sheet.max_row + 1):
    sno = sheet.cell(r, 1).value
    gstin = sheet.cell(r, 2).value
    addr = sheet.cell(r, 3).value
    pname = sheet.cell(r, 4).value
    mob = sheet.cell(r, 5).value
    mob1 = sheet.cell(r, 6).value

    # If pname is empty, check if gstin is actually the party name
    if (not pname or is_garbage(pname)) and gstin and len(str(gstin)) > 15 and not is_garbage(gstin):
        # Could be name in GSTIN column (e.g. "National Logistics Transport Company")
        pname = gstin
        gstin = None

    if not pname or is_garbage(pname):
        continue

    name_clean = str(pname).strip()
    gstin_clean = str(gstin).strip().upper() if gstin and not is_garbage(gstin) else ''
    addr_clean = str(addr).strip() if addr and not is_garbage(addr) else ''
    
    # Clean mobiles
    mob_clean = str(mob).strip() if mob and not is_garbage(mob) else ''
    mob1_clean = str(mob1).strip() if mob1 and not is_garbage(mob1) else ''
    
    mobiles = []
    if mob_clean and mob_clean != 'None':
        mobiles.append(mob_clean)
    if mob1_clean and mob1_clean != 'None' and mob1_clean not in mobiles:
        mobiles.append(mob1_clean)
    mobile_str = ', '.join(mobiles)

    # City / State extraction from address
    city = ''
    state = ''
    if addr_clean:
        # Match pattern like "City (State)" or "City, State"
        m = re.search(r'([A-Za-z\s]+)\s*\(([A-Za-z\.\s]+)\)', addr_clean)
        if m:
            city = m.group(1).strip()
            state = m.group(2).strip()

    party_obj = {
        'id': f'PARTY_{len(parties)+1:05d}',
        'name': name_clean,
        'gstin': gstin_clean,
        'address': addr_clean,
        'city': city,
        'state': state,
        'mobile': mobile_str,
        'contactPerson': '',
        'dueAmount': 0.0,
        'paidAmount': 0.0
    }

    parties.append(party_obj)

print(f'Total clean parties extracted: {len(parties)}')

# Save to js/sample-parties-data.js
output_js = 'C:/Users/HP/.gemini/antigravity/scratch/transport-system/js/sample-parties-data.js'
with open(output_js, 'w', encoding='utf-8') as f:
    f.write('// Auto-generated Parties Master Dataset from Parties_GST_Data.xlsx\n')
    f.write(f'// Total Verified Parties: {len(parties)}\n')
    f.write('window.INITIAL_EXCEL_PARTIES = ')
    json.dump(parties, f, ensure_ascii=False)
    f.write(';\n')

print(f'Successfully written to {output_js}')
