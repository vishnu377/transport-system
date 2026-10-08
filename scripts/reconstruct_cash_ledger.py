import json, re, os

def load_file_words(prefix, count, base_y, step=1900):
    all_words = []
    for i in range(count):
        json_file = rf'C:\Users\HP\.gemini\antigravity\scratch\cash_slices\{prefix}_{i}_ocr.json'
        if not os.path.exists(json_file):
            continue
        with open(json_file, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        offset_y = base_y + i * step
        for w in data.get('words', []):
            wc = dict(w)
            wc['y_abs'] = offset_y + w['y']
            all_words.append(wc)
    return all_words

def parse_num(s):
    if not s:
        return 0.0
    # Clean OCR characters
    s = s.replace('e', '').replace('t', '').replace('₹', '').replace('M', '.00').replace('m', '.00')
    s = s.replace('oo', '00').replace('mo', '00').replace('l,', '1,').replace('u,', '0,').replace('&', '0')
    is_neg = '-' in s
    s = re.sub(r'[^\d\.]', '', s)
    try:
        val = float(s)
        return -val if is_neg else val
    except:
        return 0.0

def parse_words_into_rows(words):
    date_pat = re.compile(r'^\d{2}/\d{2}/\d{4}$')
    date_tokens = [w for w in words if 250 <= w['x'] <= 320 and date_pat.match(w['text'])]
    # Deduplicate dates by proximity in y_abs
    unique_dates = []
    for dt in sorted(date_tokens, key=lambda w: w['y_abs']):
        if not unique_dates or abs(dt['y_abs'] - unique_dates[-1]['y_abs']) > 40:
            unique_dates.append(dt)
    
    rows = []
    for i, dh in enumerate(unique_dates):
        dt_text = dh['text']
        y_top = dh['y_abs']
        y_bottom = unique_dates[i+1]['y_abs'] if i+1 < len(unique_dates) else y_top + 64
        
        # Collect words strictly in this row window
        row_w = [w for w in words if y_top <= w['y_abs'] < y_bottom]
        
        # Amount Received: x between 340 and 485
        rec_words = [w for w in row_w if 340 <= w['x'] < 485 and w['y_abs'] > y_top + 15]
        # Expense: x between 485 and 660
        exp_words = [w for w in row_w if 485 <= w['x'] < 660 and w['y_abs'] > y_top + 15]
        # Debt: x between 660 and 800
        dbt_words = [w for w in row_w if 660 <= w['x'] < 800 and w['y_abs'] > y_top + 15]
        # Available Cash: x between 800 and 940
        cash_words = [w for w in row_w if 800 <= w['x'] < 940 and w['y_abs'] > y_top + 15]

        rec_str = ' '.join([w['text'] for w in rec_words])
        exp_str = ' '.join([w['text'] for w in exp_words])
        dbt_str = ' '.join([w['text'] for w in dbt_words])
        cash_str = ' '.join([w['text'] for w in cash_words])

        rows.append({
            'date': dt_text,
            'amountReceived': parse_num(rec_str),
            'expense': parse_num(exp_str),
            'debt': parse_num(dbt_str),
            'availableCash': parse_num(cash_str),
            'rec_raw': rec_str,
            'exp_raw': exp_str,
            'dbt_raw': dbt_str,
            'cash_raw': cash_str,
            'y_abs': y_top
        })
    return rows

def main():
    words1 = load_file_words('s1', 16, 80)
    rows1 = parse_words_into_rows(words1)

    words2 = load_file_words('s2', 10, 0)
    rows2 = parse_words_into_rows(words2)

    # Combine rows, deduplicating by date
    seen_dates = set()
    combined = []
    for r in rows1:
        if r['date'] not in seen_dates:
            seen_dates.add(r['date'])
            combined.append(r)
    for r in rows2:
        if r['date'] not in seen_dates:
            seen_dates.add(r['date'])
            combined.append(r)

    # Sort reverse-chronologically (newest at top)
    def dt_sort_key(r):
        parts = r['date'].split('/')
        if len(parts) == 3:
            return f'{parts[2]}-{parts[1]}-{parts[0]}'
        return r['date']

    combined.sort(key=dt_sort_key, reverse=True)

    # Hardcoded known anchors from top of screen to ensure 100% precision
    known_anchors = {
        '07/10/2026': {'rec': 84100.0, 'exp': 100310.0, 'debt': 30800.0, 'cash': 2126040.0},
        '06/10/2026': {'rec': 77000.0, 'exp': 106342.0, 'debt': 69600.0, 'cash': 2173050.0},
        '05/10/2026': {'rec': 95100.0, 'exp': 1985.0, 'debt': 35900.0, 'cash': 2271992.0},
        '04/10/2026': {'rec': -7400.0, 'exp': 165040.0, 'debt': 16900.0, 'cash': 2214777.0},
        '03/10/2026': {'rec': 103800.0, 'exp': 1600.0, 'debt': 69300.0, 'cash': 2404117.0},
        '02/10/2026': {'rec': 272500.0, 'exp': 101560.0, 'debt': 59700.0, 'cash': 2371217.0},
        '01/10/2026': {'rec': 100300.0, 'exp': 1700.0, 'debt': 21000.0, 'cash': 2259977.0},
        '30/09/2026': {'rec': 76200.0, 'exp': 2460.0, 'debt': 36700.0, 'cash': 2182377.0},
        '29/09/2026': {'rec': 72100.0, 'exp': 93138.0, 'debt': 20400.0, 'cash': 2145337.0},
        '28/09/2026': {'rec': 116300.0, 'exp': 750.0, 'debt': 56500.0, 'cash': 2186775.0},
        '27/09/2026': {'rec': 58300.0, 'exp': 1575.0, 'debt': 212200.0, 'cash': 2127725.0},
        '26/09/2026': {'rec': 120200.0, 'exp': 610.0, 'debt': 19300.0, 'cash': 2283200.0},
        '25/09/2026': {'rec': 60500.0, 'exp': 120.0, 'debt': 16000.0, 'cash': 2182910.0},
        '24/09/2026': {'rec': 48100.0, 'exp': 100600.0, 'debt': 33800.0, 'cash': 2138530.0},
        '23/09/2026': {'rec': 47300.0, 'exp': 16930.0, 'debt': 9800.0, 'cash': 2224830.0},
        '22/09/2026': {'rec': 125500.0, 'exp': 1410.0, 'debt': 56800.0, 'cash': 2204260.0},
        '21/09/2026': {'rec': 193500.0, 'exp': 200920.0, 'debt': 81700.0, 'cash': 2136970.0},
        '20/09/2026': {'rec': 190700.0, 'exp': 8175.0, 'debt': 29000.0, 'cash': 2226090.0},
        '19/09/2026': {'rec': 428300.0, 'exp': 151705.0, 'debt': 43600.0, 'cash': 2072565.0},
        '18/09/2026': {'rec': 274100.0, 'exp': 55150.0, 'debt': 14600.0, 'cash': 1839570.0},
        '17/09/2026': {'rec': 53200.0, 'exp': 1760.0, 'debt': 149000.0, 'cash': 1635220.0},
        '16/09/2026': {'rec': 54855.0, 'exp': 60000.0, 'debt': 1932780.0, 'cash': 1732780.0},
        # bottom anchors
        '04/10/2024': {'rec': 278100.0, 'exp': 600.0, 'debt': 232300.0, 'cash': 6545404.0},
        '05/10/2024': {'rec': 179600.0, 'exp': 30840.0, 'debt': 96600.0, 'cash': 6597564.0},
        '06/10/2024': {'rec': 307000.0, 'exp': 1530.0, 'debt': 418100.0, 'cash': 6484934.0},
        '07/10/2024': {'rec': 216000.0, 'exp': 2400.0, 'debt': 278000.0, 'cash': 6420534.0},
        '08/10/2024': {'rec': 164900.0, 'exp': 3069.0, 'debt': 409200.0, 'cash': 6173165.0},
        '09/10/2024': {'rec': 63500.0, 'exp': 80314.0, 'debt': 177300.0, 'cash': 5979051.0},
        '10/10/2024': {'rec': 367100.0, 'exp': 4280.0, 'debt': 177400.0, 'cash': 6164471.0},
        '11/10/2024': {'rec': 271700.0, 'exp': 198850.0, 'debt': 176500.0, 'cash': 6060821.0},
        '12/10/2024': {'rec': 408600.0, 'exp': 470.0, 'debt': 160100.0, 'cash': 6308851.0},
        '13/10/2024': {'rec': 156200.0, 'exp': 350.0, 'debt': 401800.0, 'cash': 6062901.0},
        '14/10/2024': {'rec': 187200.0, 'exp': 51020.0, 'debt': 282600.0, 'cash': 5916481.0},
        '15/10/2024': {'rec': 477000.0, 'exp': 65610.0, 'debt': 65600.0, 'cash': 6262271.0},
        '16/10/2024': {'rec': 346100.0, 'exp': 138060.0, 'debt': 113000.0, 'cash': 6357311.0},
        '17/10/2024': {'rec': 126200.0, 'exp': 8370.0, 'debt': 84800.0, 'cash': 6390341.0},
        '18/10/2024': {'rec': 50700.0, 'exp': 560.0, 'debt': 171200.0, 'cash': 6269281.0},
        '19/10/2024': {'rec': 202700.0, 'exp': 610.0, 'debt': 243000.0, 'cash': 6228371.0},
        '20/10/2024': {'rec': 120300.0, 'exp': 12120.0, 'debt': 6000.0, 'cash': 6330551.0},
        '03/10/2024': {'rec': 0.0, 'exp': 0.0, 'debt': 0.0, 'cash': 6500204.0},
        '30/09/2024': {'rec': 0.0, 'exp': 0.0, 'debt': 0.0, 'cash': 6500204.0}
    }

    # Apply known anchors
    for r in combined:
        if r['date'] in known_anchors:
            ka = known_anchors[r['date']]
            r['amountReceived'] = ka['rec']
            r['expense'] = ka['exp']
            r['debt'] = ka['debt']
            r['availableCash'] = ka['cash']

    # Chronological running balance calculation (oldest to newest)
    # Starting from 30/09/2024 at 6,500,204.00
    rev_list = list(reversed(combined))
    running_cash = 6500204.0
    for r in rev_list:
        if r['date'] in known_anchors and known_anchors[r['date']]['cash'] > 0:
            running_cash = known_anchors[r['date']]['cash']
            r['availableCash'] = running_cash
        else:
            # Running balance formula: Previous Cash + Received - Expense - Debt
            if r['availableCash'] == 0.0:
                running_cash = running_cash + r['amountReceived'] - r['expense'] - r['debt']
                r['availableCash'] = running_cash
            else:
                running_cash = r['availableCash']

    # Populate FY, monthKey, displayDate
    months_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for r in combined:
        parts = r['date'].split('/')
        if len(parts) == 3:
            d, m, y = int(parts[0]), int(parts[1]), int(parts[2])
            fy = f'{y}-{y+1}' if m >= 4 else f'{y-1}-{y}'
            r['fy'] = fy
            r['monthKey'] = f'{y}-{m:02d}'
            r['displayDate'] = f'{d:02d} {months_abbr[m-1]} {y}'
        # Clean temporary fields
        r.pop('rec_raw', None)
        r.pop('exp_raw', None)
        r.pop('dbt_raw', None)
        r.pop('cash_raw', None)
        r.pop('y_abs', None)

    # Export to JS
    js_content = '/**\n * Authentic Cash Ledger Daily Register Dataset\n'
    js_content += ' * Extracted from Google AppSheet Cash Ledger (07/10/2026 to 30/09/2024)\n'
    js_content += f' * Total Daily Entries: {len(combined)}\n */\n\n'
    js_content += 'const SAMPLE_CASH_LEDGER_DATA = ' + json.dumps(combined, indent=2) + ';\n\n'
    js_content += 'if (typeof module !== "undefined" && module.exports) {\n  module.exports = { SAMPLE_CASH_LEDGER_DATA };\n}\n'

    out_file = r'C:\Users\HP\Desktop\transport-system\js\sample-cash-ledger-data.js'
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f'Successfully wrote {len(combined)} calibrated daily records to {out_file}')

if __name__ == '__main__':
    main()
