import json
import glob
import os
import re

slice_files = sorted(glob.glob(r'scripts\driver_ocr_json\*.json'))

all_drivers = []
seen_keys = set()

def clean_phone(raw):
    if not raw:
        return ""
    t = raw.strip()
    sub_map = {'B': '8', 'b': '8', 'S': '5', 's': '5', 'O': '0', 'o': '0', 'I': '1', 'l': '1', 'Z': '2'}
    cleaned_chars = []
    for c in t:
        if c.isdigit():
            cleaned_chars.append(c)
        elif c in sub_map:
            cleaned_chars.append(sub_map[c])
        elif c in ['-', ' ', '/', '+', '(', ')']:
            continue
    phone = "".join(cleaned_chars)
    if len(phone) == 12 and phone.startswith('91'):
        phone = phone[2:]
    return phone

ignore_header_words = [
    "driver", "owner", "name", "mobile", "mobile no", "no.", "i", "1'", "home", "search", "resources", "drivers"
]

for s_path in slice_files:
    with open(s_path, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = d.get('words', [])
    
    # Filter table area
    table_words = [w for w in words if 50 <= w['x'] <= 1650 and w['y'] >= 100]
    
    # Cluster into rows
    rows = {}
    for w in table_words:
        matched_y = None
        for y_k in rows.keys():
            if abs(w['y'] - y_k) <= 14:
                matched_y = y_k
                break
        if matched_y is None:
            matched_y = w['y']
            rows[matched_y] = []
        rows[matched_y].append(w)
        
    for y in sorted(rows.keys()):
        r_words = sorted(rows[y], key=lambda w: w['x'])
        
        owner_words = [w['text'] for w in r_words if 50 <= w['x'] < 620]
        driver_words = [w['text'] for w in r_words if 620 <= w['x'] < 1250]
        mob1_words = [w['text'] for w in r_words if 1250 <= w['x'] < 1430]
        mob2_words = [w['text'] for w in r_words if w['x'] >= 1430]
        
        raw_owner = " ".join(owner_words).strip()
        raw_driver = " ".join(driver_words).strip()
        raw_mob1 = " ".join(mob1_words).strip()
        raw_mob2 = " ".join(mob2_words).strip()
        
        # Sometimes if driver name is long or placed slightly to the left or owner is absent:
        # Check if driver name is empty but owner has words:
        if not raw_driver and raw_owner:
            # If raw_owner doesn't look like a known owner or is the only text
            pass
            
        driver_lower = raw_driver.lower()
        if not raw_driver or len(raw_driver) < 2:
            continue
            
        # Ignore header rows
        if any(driver_lower == ig for ig in ignore_header_words):
            continue
        if "driver owner" in raw_owner.lower() or "mobile no" in raw_mob1.lower():
            continue
            
        clean_m1 = clean_phone(raw_mob1)
        clean_m2 = clean_phone(raw_mob2)
        
        # Deduplication
        dedup_key = f"{raw_driver.lower()}_{clean_m1}"
        if dedup_key in seen_keys:
            continue
        seen_keys.add(dedup_key)
        
        all_drivers.append({
            "name": raw_driver,
            "ownerName": raw_owner if raw_owner else "Independent / Unassigned",
            "mobile": clean_m1,
            "mobile1": clean_m2,
            "licenseNo": ""
        })

print(f"Total unique drivers extracted: {len(all_drivers)}")

print("\nFirst 15 Drivers:")
for dr in all_drivers[:15]:
    print(f"  Driver: {dr['name']:32} | Mob: {dr['mobile']:12} | Owner: {dr['ownerName']}")

print("\nLast 15 Drivers:")
for dr in all_drivers[-15:]:
    print(f"  Driver: {dr['name']:32} | Mob: {dr['mobile']:12} | Owner: {dr['ownerName']}")

with open('scripts/extracted_drivers.json', 'w', encoding='utf-8') as f:
    json.dump(all_drivers, f, indent=2, ensure_ascii=False)

print("\nSaved extracted drivers to scripts/extracted_drivers.json")
