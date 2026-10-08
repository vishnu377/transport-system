import json
import glob
import re
import os

def clean_gr(text):
    text = re.sub(r'^[•\s\-_–—]+', '', text)
    text = re.sub(r'[•\s\-_–—]+$', '', text)
    # standardise separators
    text = re.sub(r'[\s—–-]+', '_', text)
    # Match patterns like 2377_TTC, 217_SMTC, -249_TTC, 1080_TTC
    m = re.search(r'(-?\d+[A-Za-z]*)_(TTC|SMTC|MTC)', text, re.I)
    if m:
        return m.group(1).upper() + '_' + m.group(2).upper()
    # If just digits followed by TTC/SMTC
    m2 = re.search(r'(-?\d+)\s*(TTC|SMTC|MTC)', text, re.I)
    if m2:
        return m2.group(1) + '_' + m2.group(2).upper()
    return None

def clean_phone(text):
    # Fix OCR typos in numbers like s->5, B->8, O->0, l->1
    digits = ''
    for ch in text:
        if ch.isdigit():
            digits += ch
        elif ch.lower() == 's':
            digits += '5'
        elif ch == 'B':
            digits += '8'
        elif ch in 'oO':
            digits += '0'
        elif ch in 'lI':
            digits += '1'
        elif ch == 'm':
            digits += '11'
    return digits

def parse_all_slices():
    json_files = sorted(glob.glob('scripts/ttc_slices/*/*.json'))
    print(f"Total JSON files to parse: {len(json_files)}")

    all_trips = []
    seen_keys = set()
    current_date = None

    for jf in json_files:
        try:
            with open(jf, 'r', encoding='utf-8-sig') as f:
                d = json.load(f)
        except Exception as e:
            continue
        
        words = d.get('words', [])
        if not words:
            continue
        
        sorted_words = sorted(words, key=lambda w: (w['y'], w['x']))
        lines = []
        curr_line = []
        curr_y = -1
        for w in sorted_words:
            if curr_y == -1 or abs(w['y'] - curr_y) < 14:
                curr_line.append(w)
                curr_y = w['y']
            else:
                lines.append(curr_line)
                curr_line = [w]
                curr_y = w['y']
        if curr_line:
            lines.append(curr_line)

        for line in lines:
            row_words = sorted(line, key=lambda x: x['x'])
            line_text = ' '.join(w['text'] for w in row_words)
            
            # Check for date ribbon (e.g., "07/10/2026 3" or "23/02/2026 21")
            m_ribbon = re.match(r'^[•\s]*(\d{2}/\d{2}/\d{4})\s*(\d+)?$', line_text.strip())
            if m_ribbon:
                current_date = m_ribbon.group(1)
                continue

            # Separate columns by X
            gr_words = [w for w in row_words if 240 <= w['x'] < 415]
            truck_words = [w for w in row_words if 415 <= w['x'] < 700]
            dest_words = [w for w in row_words if 700 <= w['x'] < 1000]
            ref_words = [w for w in row_words if 1000 <= w['x'] < 1410]
            driver_words = [w for w in row_words if 1410 <= w['x'] < 1780]
            date_words = [w for w in row_words if w['x'] >= 1780]

            gr_text = ' '.join(w['text'] for w in gr_words)
            gr_norm = clean_gr(gr_text)

            truck_text = ' '.join(w['text'] for w in truck_words).strip('• \t\n')
            dest_text = ' '.join(w['text'] for w in dest_words).strip('• \t\n')
            ref_text = ' '.join(w['text'] for w in ref_words).strip('• \t\n')
            driver_text = ' '.join(w['text'] for w in driver_words).strip('• \t\n')
            date_text = ' '.join(w['text'] for w in date_words).strip('• \t\n')

            # Validate date
            m_d = re.search(r'(\d{2}/\d{2}/\d{4})', date_text)
            final_date = m_d.group(1) if m_d else current_date

            # If GR was not found in gr_words, maybe it's in line_text
            if not gr_norm:
                gr_norm = clean_gr(line_text)

            # A valid trip row usually has at least a reference or driver, and either a GR or truck
            if (gr_norm or re.search(r'RJ\d{2}|NL\d{2}', truck_text, re.I)) and (len(ref_text) > 3 or len(driver_text) > 3):
                key = (gr_norm or truck_text, final_date)
                if key not in seen_keys:
                    seen_keys.add(key)
                    all_trips.append({
                        'gr': gr_norm,
                        'truck': truck_text,
                        'dest': dest_text,
                        'ref': ref_text,
                        'driver': driver_text,
                        'date': final_date
                    })

    return all_trips

if __name__ == '__main__':
    trips = parse_all_slices()
    print(f"\n=======================================================")
    print(f"Total Unique Trips extracted across all 111 slices: {len(trips)}")
    print(f"=======================================================\n")
    
    unique_refs = set()
    for t in trips:
        if t['ref']:
            unique_refs.add(t['ref'])
    print(f"Total unique authentic dalals/references extracted: {len(unique_refs)}")
    print("\nSample 20 authentic dalals/references:")
    for r in list(unique_refs)[:20]:
        print("  *", r)
    
    print("\nSample 15 full trips:")
    for t in trips[:15]:
        print(f"GR: {str(t['gr']):<12} | Truck: {t['truck']:<12} | Ref: {t['ref']:<35} | Driver: {t['driver']:<30} | Date: {t['date']}")
