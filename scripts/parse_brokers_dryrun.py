import json
import glob
import os
import re

slice_files = sorted(glob.glob(r'scripts\broker_ocr_json\*.json'))

all_brokers = []
seen_keys = set()

def clean_phone(raw):
    if not raw:
        return ""
    # Common OCR letter-to-digit substitutions
    t = raw.strip()
    # Replace known OCR artifacts
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
    # If phone has 91 prefix (12 digits), strip 91
    if len(phone) == 12 and phone.startswith('91'):
        phone = phone[2:]
    return phone

# Common Indian cities to detect location from name
CITIES = [
    "Udaipur", "Alwar", "Agra", "Noida", "Delhi", "Kishangarh", "Khatauli", "Loni", "Gunjol", "Dadri",
    "Jaipur", "Rajsamand", "Bhilwara", "Chittorgarh", "Makrana", "Jodhpur", "Bikaner", "Kota", "Ajmer",
    "Faridabad", "Ghaziabad", "Gurgaon", "Gurugram", "Meerut", "Mathura", "Aligarh", "Hathras", "Firozabad",
    "Kanpur", "Lucknow", "Varanasi", "Moradabad", "Bareilly", "Saharanpur", "Muzaffarnagar", "Rohtak",
    "Panipat", "Sonipat", "Karnal", "Hisar", "Ambala", "Ludhiana", "Jalandhar", "Amritsar", "Chandigarh",
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Morbi", "Indore", "Bhopal", "Gwalior", "Jabalpur",
    "Mangolpuri", "Bhaggat", "Kankroli", "Amet", "Nathdwara", "Kelwa", "Charbhuja"
]

def extract_location(name):
    for city in CITIES:
        if re.search(r'\b' + re.escape(city) + r'\b', name, re.IGNORECASE):
            return city
    return ""

ignore_names = [
    "name", "brokers", "home", "search", "resources", "number", "mobile", "mobile no", "no.", "i", "mtcandttc"
]

for s_path in slice_files:
    with open(s_path, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = d.get('words', [])
    
    # Filter table area: x between 50 and 1200
    table_words = [w for w in words if 50 <= w['x'] <= 1200 and w['y'] >= 100]
    
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
        name_words = [w['text'] for w in r_words if w['x'] < 680]
        mob1_words = [w['text'] for w in r_words if 680 <= w['x'] < 850]
        mob2_words = [w['text'] for w in r_words if w['x'] >= 850]
        
        raw_name = " ".join(name_words).strip()
        raw_mob1 = " ".join(mob1_words).strip()
        raw_mob2 = " ".join(mob2_words).strip()
        
        name_lower = raw_name.lower()
        if not raw_name or len(raw_name) < 2:
            continue
        if any(raw_name.lower() == ig for ig in ignore_names):
            continue
        if "number 103" in name_lower or "home >" in name_lower or name_lower.startswith("search"):
            continue
        # Check if name is purely just the word "Name"
        if raw_name.strip().lower() in ["name", "mobile", "mobile no.", "mobile no. 1", "number"]:
            continue
            
        clean_m1 = clean_phone(raw_mob1)
        clean_m2 = clean_phone(raw_mob2)
        
        # Deduplication key
        dedup_key = f"{raw_name.lower()}_{clean_m1}"
        if dedup_key in seen_keys:
            continue
        seen_keys.add(dedup_key)
        
        loc = extract_location(raw_name)
        
        all_brokers.append({
            "name": raw_name,
            "mobile": clean_m1,
            "mobile1": clean_m2,
            "location": loc,
            "commissionRate": "₹2,000 / Trip"
        })

print(f"Total unique brokers extracted: {len(all_brokers)}")
print("\nFirst 15 Brokers:")
for b in all_brokers[:15]:
    print(f"  {b['name']:35} | Mob: {b['mobile']:12} | Mob2: {b['mobile1']:12} | Loc: {b['location']}")

print("\nLast 15 Brokers:")
for b in all_brokers[-15:]:
    print(f"  {b['name']:35} | Mob: {b['mobile']:12} | Mob2: {b['mobile1']:12} | Loc: {b['location']}")

with open('scripts/extracted_brokers.json', 'w', encoding='utf-8') as f:
    json.dump(all_brokers, f, indent=2, ensure_ascii=False)
print("\nSaved extracted brokers to scripts/extracted_brokers.json")
