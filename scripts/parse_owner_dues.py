import json
import glob
import os
import re

slices = sorted(glob.glob(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\dues_ocr\file4_slice_*.json'),
                key=lambda x: int(os.path.basename(x).split('_')[2].split('.')[0]))

def clean_amount(txt):
    if not txt:
        return 0.0
    txt = txt.replace('e', '').replace('&', '').replace('t', '').replace('Q', '').replace('?', '').strip()
    txt = re.sub(r'^[^\d]+', '', txt)
    txt = re.sub(r'[oO]', '0', txt)
    txt = txt.replace(',', '')
    try:
        val = float(txt)
        return val
    except:
        return 0.0

def clean_truck_no(txt):
    if not txt:
        return ""
    txt = txt.upper().replace(' ', '').replace('-', '').replace('.', '')
    if txt.startswith('R3') or txt.startswith('RO') or txt.startswith('RD') or txt.startswith('RB'):
        txt = 'RJ' + txt[2:]
    return txt

owner_dues = []
seen_dues = set()

for s_idx, s in enumerate(slices):
    with open(s, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = [w for w in d.get('words', []) if (s_idx > 0 or w['y'] >= 300) and w['x'] >= 500]
    
    rows = {}
    for w in words:
        matched_y = None
        for y_k in rows.keys():
            if abs(w['y'] - y_k) <= 18:
                matched_y = y_k
                break
        if matched_y is None:
            matched_y = w['y']
            rows[matched_y] = []
        rows[matched_y].append(w)
        
    for y in sorted(rows.keys()):
        r_words = sorted(rows[y], key=lambda w: w['x'])
        
        # Check if there is a truck number: x ~ 1050-1200
        truck_words = [clean_truck_no(w['text']) for w in r_words if w['x'] >= 1050 and w['x'] < 1220 and ('RJ' in clean_truck_no(w['text']) or len(w['text']) >= 8)]
        if not truck_words:
            continue
        truck_no = truck_words[0]
        
        # GR No: x ~ 600-720
        gr_words = [w['text'].replace(',', '') for w in r_words if w['x'] >= 600 and w['x'] < 730 and re.match(r'^-?\d{1,5}$', w['text'].replace(',', ''))]
        gr_no = gr_words[0] if gr_words else ""
        
        # Trip Date: x ~ 730-880
        date_words = [w['text'] for w in r_words if w['x'] >= 730 and w['x'] < 890 and re.match(r'^\d{2}/\d{2}/\d{4}$', w['text'])]
        trip_date = date_words[0] if date_words else "25/09/2026"
        
        # Due Amount: x ~ 890-1050
        amt_words = [w['text'] for w in r_words if w['x'] >= 890 and w['x'] < 1060 and (',' in w['text'] or '.' in w['text'] or re.search(r'\d{3,}', w['text']) or 'oo' in w['text'].lower())]
        due_amt = clean_amount(amt_words[0]) if amt_words else 0.0
        
        # Owner Name: x ~ 1220-1500
        name_words = [w['text'] for w in r_words if w['x'] >= 1220 and w['x'] < 1520 and not re.match(r'^\d', w['text'])]
        owner_name = " ".join(name_words).replace('...', '').strip()
        
        # Destination: x ~ 1520-1780
        dest_words = [w['text'] for w in r_words if w['x'] >= 1520 and w['x'] < 1780 and w['text'] not in ['TTC', 'MTC', 'SMTC']]
        destination = " ".join(dest_words).strip()
        
        # Transport: x ~ 1780-1880
        trans_words = [w['text'] for w in r_words if w['text'] in ['TTC', 'MTC', 'SMTC']]
        transport = trans_words[0] if trans_words else "TTC"
        
        # Reference / Party: x ~ 1880-2180
        ref_words = [w['text'] for w in r_words if w['x'] >= 1880 and w['x'] < 2180]
        reference = " ".join(ref_words).strip()
        
        # Driver: x >= 2180
        driver_words = [w['text'] for w in r_words if w['x'] >= 2180]
        driver = " ".join(driver_words).strip()
        
        key = f"{gr_no}_{truck_no}_{due_amt}"
        if key in seen_dues:
            continue
        seen_dues.add(key)
        
        owner_dues.append({
            'grNo': gr_no,
            'tripDate': trip_date,
            'dueAmount': due_amt,
            'truckNo': truck_no,
            'ownerName': owner_name,
            'destination': destination,
            'transport': transport,
            'reference': reference,
            'driver': driver
        })

print(f"Extracted {len(owner_dues)} Owner Due entries from File 4!")
for d in owner_dues[:15]:
    print(f"  GR:{d['grNo']:5s} | Date:{d['tripDate']} | Rs.{d['dueAmount']:9,.2f} | {d['truckNo']:10s} | {d['ownerName'][:20]:20s} | {d['destination'][:15]:15s} | {d['driver']}")

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all_owner_dues.json', 'w', encoding='utf-8') as f:
    json.dump(owner_dues, f, indent=2)
print("Saved all_owner_dues.json successfully!")
