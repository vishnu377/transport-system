import json
import glob
import re
import os
import sys

sys.path.insert(0, 'scripts')
from test_clean_refs import clean_ref, clean_driver

def parse_mtc_slice(json_path):
    with open(json_path, 'r', encoding='utf-8-sig') as f:
        d = json.load(f)
    words = d.get('words', [])
    if not words:
        return []
    
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

    current_date = None
    trips = []

    for line in lines:
        row_words = sorted(line, key=lambda x: x['x'])
        line_text = ' '.join(w['text'] for w in row_words)

        m_ribbon = re.match(r'^[•\s]*(\d{2}/\d{2}/\d{4})\s*(\d+)?$', line_text.strip())
        if m_ribbon:
            current_date = m_ribbon.group(1)
            continue

        # In MTC AppSheet:
        # X: 240-415: GR No (e.g. 1406_MTC, 1405_MTC)
        # X: 415-700: Truck No
        # X: 700-1000: To (Destination)
        # X: 1000-1410: Reference
        # X: 1410-1780: Driver
        # X: >=1780: Date
        gr_words = [w for w in row_words if 240 <= w['x'] < 415]
        truck_words = [w for w in row_words if 415 <= w['x'] < 700]
        dest_words = [w for w in row_words if 700 <= w['x'] < 1000]
        ref_words = [w for w in row_words if 1000 <= w['x'] < 1410]
        driver_words = [w for w in row_words if 1410 <= w['x'] < 1780]
        date_words = [w for w in row_words if w['x'] >= 1780]

        gr_raw = ' '.join(w['text'] for w in gr_words).strip('• \t\n')
        m_gr = re.search(r'(-?\d+[A-Za-z]*)_MTC', gr_raw.replace(' ', '_'), re.I)
        if not m_gr:
            m_gr = re.search(r'(-?\d+[A-Za-z]*)_MTC', line_text.replace(' ', '_'), re.I)

        truck_raw = ' '.join(w['text'] for w in truck_words).strip('• \t\n')
        dest_raw = ' '.join(w['text'] for w in dest_words).strip('• \t\n')
        ref_raw = ' '.join(w['text'] for w in ref_words).strip('• \t\n')
        driver_raw = ' '.join(w['text'] for w in driver_words).strip('• \t\n')
        date_raw = ' '.join(w['text'] for w in date_words).strip('• \t\n')

        m_d = re.search(r'(\d{2}/\d{2}/\d{4})', date_raw)
        final_date = m_d.group(1) if m_d else current_date

        if (m_gr or re.search(r'RJ\d{2}|HR\d{2}', truck_raw, re.I)) and (ref_raw or driver_raw):
            trips.append({
                'gr': m_gr.group(0).upper() if m_gr else None,
                'truck': truck_raw,
                'dest': dest_raw,
                'ref': clean_ref(ref_raw),
                'driver': clean_driver(driver_raw),
                'date': final_date
            })

    return trips

if __name__ == '__main__':
    all_mtc_files = sorted(glob.glob('scripts/mtc_slices/*/*.json'))
    print(f"Total MTC JSON files: {len(all_mtc_files)}")
    all_extracted = []
    seen = set()
    for f in all_mtc_files:
        tr = parse_mtc_slice(f)
        for t in tr:
            key = (t['gr'] or t['truck'], t['date'])
            if key not in seen:
                seen.add(key)
                all_extracted.append(t)
    print(f"Total unique MTC trips extracted: {len(all_extracted)}")
    print("\nSample top 15 extracted MTC trips:")
    for t in all_extracted[:15]:
        print(f"GR: {str(t['gr']):<12} | Truck: {t['truck']:<12} | Ref: {t['ref']:<35} | Driver: {t['driver']:<30} | Date: {t['date']}")
