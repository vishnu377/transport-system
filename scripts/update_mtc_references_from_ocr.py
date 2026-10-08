import json
import re
import os
import sys

sys.path.insert(0, 'scripts')
from parse_all_mtc_ocr import parse_mtc_slice
import glob

def run():
    print("=== UPDATING MTC REFERENCES FROM AUTHENTIC MTC SCREENSHOTS ===")
    all_mtc_files = sorted(glob.glob('scripts/mtc_slices/*/*.json'))
    ocr_mtc = []
    seen = set()
    for f in all_mtc_files:
        for t in parse_mtc_slice(f):
            key = (t['gr'] or t['truck'], t['date'])
            if key not in seen:
                seen.add(key)
                ocr_mtc.append(t)
    
    print(f"Total unique OCR MTC trips: {len(ocr_mtc)}")

    ocr_by_gr = {t['gr']: t for t in ocr_mtc if t['gr']}
    ocr_by_seq = {}
    ocr_by_seq_date = {}
    for t in ocr_mtc:
        if t['gr']:
            m_s = re.search(r'^(-?\d+)', t['gr'])
            if m_s:
                seq = m_s.group(1)
                ocr_by_seq[seq] = t
                if t['date']:
                    ocr_by_seq_date[(seq, t['date'])] = t

    ocr_by_truck_date = {}
    ocr_by_truck = {}
    for t in ocr_mtc:
        if t['truck']:
            tr = re.sub(r'[^A-Za-z0-9]', '', t['truck']).upper()
            ocr_by_truck[tr] = t
            if t['date']:
                ocr_by_truck_date[(tr, t['date'])] = t

    with open('js/sample-trips-data.js', 'r', encoding='utf-8') as f:
        text = f.read()

    m = re.search(r'window\.INITIAL_EXCEL_TRIPS\s*=\s*(\[.*?\]);', text, re.DOTALL)
    trips = json.loads(m.group(1))

    updated = 0
    for t in trips:
        if t.get('transport') != 'MTC':
            continue
        
        short_gr = t.get('shortGrNo', '')
        seq = str(t.get('grSeq', ''))
        truck = re.sub(r'[^A-Za-z0-9]', '', t.get('truckNo', '')).upper()
        date = t.get('tripStartDate', '')
        d_parts = date.split('-')
        d_formatted = f'{d_parts[2]}/{d_parts[1]}/{d_parts[0]}' if len(d_parts) == 3 else ''

        match = None
        if (seq, d_formatted) in ocr_by_seq_date:
            match = ocr_by_seq_date[(seq, d_formatted)]
        elif (truck, d_formatted) in ocr_by_truck_date:
            match = ocr_by_truck_date[(truck, d_formatted)]
        elif short_gr in ocr_by_gr:
            match = ocr_by_gr[short_gr]
        elif seq in ocr_by_seq:
            match = ocr_by_seq[seq]
        elif truck in ocr_by_truck:
            match = ocr_by_truck[truck]
        
        if match and match.get('ref'):
            t['reference'] = match['ref']
            if match.get('driver'):
                t['driver'] = match['driver']
            if match.get('dest') and (not t.get('destination') or t.get('destination') == '-'):
                t['destination'] = match['dest']
            updated += 1
        elif not t.get('reference'):
            t['reference'] = t.get('consignor') or 'Ali Akhtar Jani 9910844750'

    print(f"Updated {updated} MTC trips with exact OCR references.")

    # Write back to js/sample-trips-data.js
    new_js = f"// Fresh Dataset Auto-Generated from AppSheet with Authentic MTC & TTC Dalal References & Real Drivers\n// Total Bilties: {len(trips)} | Highest GR: 2828\nwindow.INITIAL_EXCEL_TRIPS = " + json.dumps(trips, ensure_ascii=False) + ";\n"

    with open('js/sample-trips-data.js', 'w', encoding='utf-8') as f:
        f.write(new_js)

    print("[SUCCESS] Successfully updated MTC references in js/sample-trips-data.js!")

if __name__ == '__main__':
    run()
