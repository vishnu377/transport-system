import json
import re

def parse_slice(json_path):
    with open(json_path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    words = data.get('words', [])
    if not words:
        return []
    
    # Sort words by y then x
    sorted_words = sorted(words, key=lambda w: (w['y'], w['x']))
    
    # Cluster into lines
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
        
        # Check if date ribbon: e.g. "07/10/2026 3" or "06/10/2026 20"
        m_date = re.match(r'^(\d{2}/\d{2}/\d{4})\s*(\d+)?', line_text)
        if m_date and len(row_words) <= 3:
            current_date = m_date.group(1)
            continue
        
        # Check for GR number: e.g. 2377_TTC, 217_SMTC, -249 _ TTC, 2366-TTC
        # Clean text
        # Columns roughly:
        # X: 300-380: GR No
        # X: 410-600: Truck No
        # X: 750-950: To (Destination)
        # X: 1000-1400: Reference
        # X: 1400-1780: Driver
        # X: 1780-1920: Date

        gr_words = [w for w in row_words if 280 <= w['x'] < 415]
        truck_words = [w for w in row_words if 415 <= w['x'] < 700]
        dest_words = [w for w in row_words if 700 <= w['x'] < 1000]
        ref_words = [w for w in row_words if 1000 <= w['x'] < 1410]
        driver_words = [w for w in row_words if 1410 <= w['x'] < 1780]
        date_words = [w for w in row_words if w['x'] >= 1780]

        gr_raw = ' '.join(w['text'] for w in gr_words).strip('• \t\n')
        # Clean GR
        gr_clean = re.sub(r'[\s—–-]+', '_', gr_raw)
        gr_clean = gr_clean.replace('__', '_').strip('_')
        
        # Sometimes GR is like -249_TTC or 238B_TTC
        m_gr = re.search(r'(-?\d+[A-Za-z]*)_(TTC|SMTC|MTC)', gr_clean, re.I)
        
        truck_raw = ' '.join(w['text'] for w in truck_words).strip('• \t\n')
        dest_raw = ' '.join(w['text'] for w in dest_words).strip('• \t\n')
        ref_raw = ' '.join(w['text'] for w in ref_words).strip('• \t\n')
        driver_raw = ' '.join(w['text'] for w in driver_words).strip('• \t\n')
        date_raw = ' '.join(w['text'] for w in date_words).strip('• \t\n')

        # If line has truck or reference or driver and date
        if (m_gr or re.search(r'RJ\d{2}', truck_raw, re.I)) and (ref_raw or driver_raw):
            trips.append({
                'gr': m_gr.group(0) if m_gr else gr_clean,
                'truck': truck_raw,
                'dest': dest_raw,
                'ref': ref_raw,
                'driver': driver_raw,
                'date': date_raw or current_date,
                'y': line[0]['y']
            })

    return trips

if __name__ == '__main__':
    trips = parse_slice('scripts/ttc_slices/img_11/slice_00_0_2400.json')
    print(f"Extracted {len(trips)} trips from slice 0:")
    for t in trips:
        print(f"GR: {t['gr']:<12} | Truck: {t['truck']:<12} | Ref: {t['ref']:<35} | Driver: {t['driver']:<30} | Date: {t['date']}")
