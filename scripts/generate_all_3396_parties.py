import openpyxl
import json
import re
import os

print("=== Generating Master Dataset for ALL 3,396 Parties ===")

# Locate Excel file
primary_path = r'C:\Users\HP\Downloads\partiesparties\Parties_GST_Data.xlsx'
fallback_path = r'C:\Users\HP\Downloads\Parties_GST_Data.xlsx'
excel_path = primary_path if os.path.exists(primary_path) else fallback_path

print(f"Reading from: {excel_path}")
wb = openpyxl.load_workbook(excel_path, data_only=True)
ws = wb['Parties GST Data']

# Load existing due/paid maps from current sample-parties-data.js to preserve ledger links
sample_parties_file = r'C:\Users\HP\.gemini\antigravity\scratch\transport-system\js\sample-parties-data.js'
existing_dues = {}
existing_paids = {}

if os.path.exists(sample_parties_file):
    with open(sample_parties_file, 'r', encoding='utf-8') as f:
        text = f.read()
    if 'window.INITIAL_EXCEL_PARTIES = ' in text:
        json_part = text.split('window.INITIAL_EXCEL_PARTIES = ')[1].strip().rstrip(';')
        try:
            curr_parties = json.loads(json_part)
            for p in curr_parties:
                p_name = (p.get('name') or '').strip().lower()
                p_gstin = (p.get('gstin') or '').strip().upper()
                due = float(p.get('dueAmount') or 0)
                paid = float(p.get('paidAmount') or 0)
                if due > 0:
                    if p_name: existing_dues[p_name] = due
                    if p_gstin: existing_dues[p_gstin] = due
                if paid > 0:
                    if p_name: existing_paids[p_name] = paid
                    if p_gstin: existing_paids[p_gstin] = paid
        except Exception as e:
            print(f"Notice: Could not parse previous json: {e}")

print(f"Preserved existing ledger links: {len(existing_dues)} due balances, {len(existing_paids)} paid amounts")

# Garbage patterns for GSTIN and Address
garbage_strings = {'none', '<', 'eee', 'eeee', '', ' eee', 'eee', 'eeee', ':', '#name?', 'na', 'n/a', '.'}

def clean_str(val):
    if val is None:
        return ''
    s = str(val).strip()
    # Remove leading/trailing stray quotes or symbols
    s = re.sub(r'^[‘“"\'\s—–\|]+', '', s)
    s = re.sub(r'[’”"\'\s—–\|]+$', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def is_garbage(val):
    if not val:
        return True
    s = str(val).strip().lower()
    if s in garbage_strings or len(s) <= 1:
        return True
    if re.fullmatch(r'^[<>\?,\.\s\-_:\|\^~`!@#\$%&\*\(\)=\+]+$', s):
        return True
    if re.search(r'eee{2,}', s):
        return True
    return False

def extract_mobiles(val1, val2):
    mobiles = []
    combined = f"{val1 or ''} {val2 or ''}"
    parts = re.split(r'[,/;\s]+', combined)
    for p in parts:
        digits = re.sub(r'\D', '', p)
        if len(digits) == 10 and digits[0] in '6789':
            if digits not in mobiles:
                mobiles.append(digits)
        elif len(digits) == 11 and digits.startswith('0') and digits[1] in '6789':
            d10 = digits[1:]
            if d10 not in mobiles:
                mobiles.append(d10)
        elif len(digits) == 12 and digits.startswith('91') and digits[2] in '6789':
            d10 = digits[2:]
            if d10 not in mobiles:
                mobiles.append(d10)
    return ', '.join(mobiles)

def extract_city_state(addr):
    city = ''
    state = ''
    if not addr:
        return city, state
    
    # Common state patterns in Indian logistics
    states_dict = {
        'raj': 'Raj.',
        'rajasthan': 'Raj.',
        'u.p': 'U.P.',
        'uttar pradesh': 'U.P.',
        'up': 'U.P.',
        'haryana': 'Haryana',
        'delhi': 'Delhi',
        'punjab': 'Punjab',
        'uk': 'UK',
        'uttarakhand': 'UK',
        'gujrat': 'Gujrat',
        'gujarat': 'Gujrat',
        'm.p': 'M.P.',
        'madhya pradesh': 'M.P.',
        'bihar': 'Bihar',
        'a.p': 'A.P.',
        'andhra pradesh': 'A.P.',
        'maharashtra': 'Maharashtra'
    }

    # Match "City (State)" or "City, State"
    m = re.search(r'([A-Za-z\s]+)\s*\(([A-Za-z\.\s]+)\)', addr)
    if m:
        c_candidate = m.group(1).strip()
        s_candidate = m.group(2).strip().lower().replace('.', '')
        # Clean city candidate (take last 2-3 words if long address)
        c_words = c_candidate.split(',')[-1].strip()
        city = c_words if len(c_words) < 30 else ''
        for k, v in states_dict.items():
            if k in s_candidate:
                state = v
                break
    
    if not state:
        addr_lower = addr.lower()
        for k, v in states_dict.items():
            if f"({k}" in addr_lower or f" {k}." in addr_lower or f" {k}-" in addr_lower or f" {k} " in addr_lower:
                state = v
                break
    
    return city, state

all_parties = []

for r in range(2, 3398): # Exactly 3396 rows: 2 to 3397
    sno = r - 1
    party_id = f"PARTY_{sno:05d}"
    
    gstin_raw = ws.cell(r, 2).value
    addr_raw = ws.cell(r, 3).value
    name_raw = ws.cell(r, 4).value
    m1_raw = ws.cell(r, 5).value
    m2_raw = ws.cell(r, 6).value

    # 1. Clean GSTIN
    gstin_clean = clean_str(gstin_raw)
    is_gstin_invalid = is_garbage(gstin_clean)

    # 2. Clean Name
    name_clean = clean_str(name_raw)

    # Check if GSTIN contains party name (e.g. National Logistics Transport Company)
    if (not name_clean or is_garbage(name_clean)) and not is_gstin_invalid and len(gstin_clean) > 15:
        if not re.match(r'^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$', gstin_clean):
            name_clean = gstin_clean
            gstin_clean = ''
            is_gstin_invalid = True

    # Check S.No 2 (08AHIPP2722L1Z1 in Kishangarh)
    if (not name_clean or is_garbage(name_clean)):
        if gstin_clean and re.match(r'^[0-9]{2}[A-Z]{5}[0-9]{4}', gstin_clean):
            name_clean = f"Party ({gstin_clean})"
        elif addr_raw and 'Paze' in str(addr_raw):
            name_clean = "Paze Enterprises"
        else:
            name_clean = f"Party #{sno}"

    # Ensure GSTIN format
    if is_gstin_invalid:
        gstin_clean = ''
    else:
        gstin_clean = gstin_clean.upper()

    # 3. Clean Address
    addr_clean = clean_str(addr_raw)
    if is_garbage(addr_clean):
        addr_clean = ''

    # 4. Extract Mobile numbers
    mobile_clean = extract_mobiles(m1_raw, m2_raw)

    # 5. Extract City & State
    city_clean, state_clean = extract_city_state(addr_clean)

    # 6. Cross-reference Ledger Dues and Payments
    due_amt = 0.0
    paid_amt = 0.0

    name_lower = name_clean.lower()
    gstin_upper = gstin_clean.upper()

    if name_lower in existing_dues:
        due_amt = existing_dues[name_lower]
    elif gstin_upper and gstin_upper in existing_dues:
        due_amt = existing_dues[gstin_upper]

    if name_lower in existing_paids:
        paid_amt = existing_paids[name_lower]
    elif gstin_upper and gstin_upper in existing_paids:
        paid_amt = existing_paids[gstin_upper]

    party_obj = {
        'id': party_id,
        'sno': sno,
        'name': name_clean,
        'gstin': gstin_clean,
        'address': addr_clean,
        'city': city_clean,
        'state': state_clean,
        'mobile': mobile_clean,
        'contactPerson': '',
        'dueAmount': round(due_amt, 2),
        'paidAmount': round(paid_amt, 2)
    }

    all_parties.append(party_obj)

print(f"Total processed parties: {len(all_parties)}")
if len(all_parties) != 3396:
    print(f"ERROR: Expected 3396 parties, got {len(all_parties)}")
    exit(1)

# Summary calculations
total_due = sum(p['dueAmount'] for p in all_parties)
total_paid = sum(p['paidAmount'] for p in all_parties)
with_gst = sum(1 for p in all_parties if p['gstin'] and not p['gstin'].startswith('URP'))
with_mob = sum(1 for p in all_parties if p['mobile'])
with_due = sum(1 for p in all_parties if p['dueAmount'] > 0)
with_paid = sum(1 for p in all_parties if p['paidAmount'] > 0)

print(f"Data Summary for all 3,396 parties:")
print(f" - Total Parties: {len(all_parties)}")
print(f" - GST Registered: {with_gst}")
print(f" - With Valid Mobile: {with_mob}")
print(f" - Parties with Due: {with_due} (Rs. {total_due:,.2f})")
print(f" - Parties with Paid: {with_paid} (Rs. {total_paid:,.2f})")

# Write to js/sample-parties-data.js
output_js = r'C:\Users\HP\.gemini\antigravity\scratch\transport-system\js\sample-parties-data.js'
with open(output_js, 'w', encoding='utf-8') as f:
    f.write('// Auto-generated Parties Master Dataset from Parties_GST_Data.xlsx\n')
    f.write(f'// Total Parties in Master Register: {len(all_parties)}\n')
    f.write('window.INITIAL_EXCEL_PARTIES = ')
    json.dump(all_parties, f, ensure_ascii=False)
    f.write(';\n')

print(f"SUCCESS: Saved all 3,396 parties to {output_js}!")
