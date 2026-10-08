import json
import re
import os
import sys
sys.path.insert(0, 'scripts')
from analyze_all_ocr_trips import parse_all_slices

# 1. Load OCR trips
ocr_trips = parse_all_slices()
print(f"Total OCR trips: {len(ocr_trips)}")

# Index OCR trips by GR and by Truck+Date
ocr_by_gr = {}
ocr_by_seq = {}
ocr_by_truck_date = {}

for t in ocr_trips:
    gr = t['gr']
    if gr:
        ocr_by_gr[gr] = t
        m = re.match(r'^(-?\d+)', gr)
        if m:
            ocr_by_seq[m.group(1)] = t
    
    if t['truck'] and t['date']:
        tr = re.sub(r'[^A-Za-z0-9]', '', t['truck']).upper()
        ocr_by_truck_date[(tr, t['date'])] = t

print(f"Indexed by GR: {len(ocr_by_gr)}")
print(f"Indexed by Seq: {len(ocr_by_seq)}")
print(f"Indexed by Truck+Date: {len(ocr_by_truck_date)}")

# 2. Load INITIAL_EXCEL_TRIPS
with open('js/sample-trips-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'window\.INITIAL_EXCEL_TRIPS\s*=\s*(\[.*?\]);', text, re.DOTALL)
trips = json.loads(m.group(1))

print(f"Total trips in sample-trips-data.js: {len(trips)}")
ttc_trips = [t for t in trips if t.get('transport') in ['TTC', 'SMTC']]
print(f"Total TTC/SMTC trips: {len(ttc_trips)}")

matched_gr = 0
matched_seq = 0
matched_truck = 0
unmatched = 0

for t in ttc_trips:
    short_gr = t.get('shortGrNo', '')
    seq = t.get('grSeq', '')
    truck = re.sub(r'[^A-Za-z0-9]', '', t.get('truckNo', '')).upper()
    date = t.get('tripStartDate', '') # YYYY-MM-DD
    # convert date to DD/MM/YYYY for matching
    d_parts = date.split('-')
    d_formatted = f"{d_parts[2]}/{d_parts[1]}/{d_parts[0]}" if len(d_parts) == 3 else ''

    if short_gr in ocr_by_gr:
        matched_gr += 1
    elif seq in ocr_by_seq:
        matched_seq += 1
    elif (truck, d_formatted) in ocr_by_truck_date:
        matched_truck += 1
    else:
        unmatched += 1

print(f"Matched by exact shortGrNo: {matched_gr}")
print(f"Matched by grSeq: {matched_seq}")
print(f"Matched by truck+date: {matched_truck}")
print(f"Unmatched: {unmatched}")
