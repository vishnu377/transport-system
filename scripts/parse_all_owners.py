import json
import glob
import os
import re

slices = sorted(glob.glob(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\owners_ocr\file0_slice_*.json'),
                key=lambda x: int(os.path.basename(x).split('_')[2].split('.')[0]))

owners_list = []
seen_trucks = set()

def clean_truck_no(txt):
    txt = txt.upper().replace(' ', '').replace('-', '').replace('.', '')
    # Replace common OCR misreads in prefix: R3 -> RJ, RO -> RJ
    if txt.startswith('R3') or txt.startswith('RO') or txt.startswith('RD') or txt.startswith('RB'):
        txt = 'RJ' + txt[2:]
    return txt

for s_idx, s in enumerate(slices):
    with open(s, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = d.get('words', [])
    
    # Filter words: in table area (x >= 250, x <= 1500)
    # Exclude header rows in slice 0 (y < 250)
    table_words = [w for w in words if (s_idx > 0 or w['y'] >= 250) and w['x'] >= 250 and w['x'] <= 1600]
    
    rows = {}
    for w in table_words:
        matched_y = None
        for y_key in rows.keys():
            if abs(w['y'] - y_key) <= 18:
                matched_y = y_key
                break
        if matched_y is None:
            matched_y = w['y']
            rows[matched_y] = []
        rows[matched_y].append(w)
        
    for y in sorted(rows.keys()):
        row_words = sorted(rows[y], key=lambda w: w['x'])
        
        # Identify truck number
        truck_no = None
        for w in row_words:
            t = clean_truck_no(w['text'])
            if re.match(r'^(RJ|NL|HR|PB|UP|DL|GJ|MP)\d{2}[A-Z]{1,2}\d{3,4}$', t):
                truck_no = t
                break
            elif re.match(r'^[A-Z0-9]{8,11}$', t) and ('RJ' in t or 'NL' in t or 'GA' in t or 'GB' in t or 'GD' in t or 'GC' in t):
                truck_no = t
                break
                
        if not truck_no:
            continue
            
        if truck_no in seen_trucks:
            continue
        seen_trucks.add(truck_no)
        
        # Name: words between truck (x ~ 330) and phone (x ~ 780)
        name_words = [w['text'] for w in row_words if w['x'] > 450 and w['x'] < 750]
        name = " ".join(name_words).strip()
        if not name or name == 'All':
            name = "Truck Owner (" + truck_no + ")"
            
        # Mobile 1: x around 750 to 930
        phone_words = [w['text'] for w in row_words if w['x'] >= 750 and w['x'] < 930]
        mobile = phone_words[0] if phone_words else ""
        mobile = re.sub(r'[^0-9]', '', mobile)
        
        # Mobile 2: x >= 930
        phone2_words = [w['text'] for w in row_words if w['x'] >= 930 and w['x'] < 1150]
        mobile2 = phone2_words[0] if phone2_words else ""
        mobile2 = re.sub(r'[^0-9]', '', mobile2)
        
        owners_list.append({
            'truckNo': truck_no,
            'name': name,
            'mobile': mobile,
            'mobile1': mobile2,
            'slice': s_idx,
            'y': y
        })

print(f"Successfully extracted {len(owners_list)} truck owners!")
for o in owners_list[:20]:
    print(f"  {o['truckNo']:12s} | {o['name']:25s} | {o['mobile']:12s} | {o['mobile1']}")
