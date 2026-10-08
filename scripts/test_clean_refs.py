import re
import sys
sys.path.insert(0, 'scripts')
from analyze_all_ocr_trips import parse_all_slices

def clean_ref(ref_str):
    if not ref_str:
        return ""
    # remove leading/trailing non-alphanumeric except spaces
    ref_str = re.sub(r'^[•\s\-_–—]+', '', ref_str)
    ref_str = re.sub(r'[•\s\-_–—]+$', '', ref_str)

    # If ends with mobile-like token
    words = ref_str.split()
    if not words:
        return ""
    
    last_word = words[-1]
    # Check if last word looks like phone number with possible OCR misreads
    if re.search(r'[\dBsSolIZm]{8,12}', last_word, re.I):
        # clean phone
        p = last_word.replace('B', '8').replace('s', '5').replace('S', '5')
        p = p.replace('o', '0').replace('O', '0').replace('l', '1').replace('I', '1').replace('i', '1')
        p = p.replace('Z', '2').replace('m', '11')
        p = re.sub(r'\D', '', p)
        if len(p) >= 10:
            words[-1] = p[:10]
        ref_str = ' '.join(words)
    
    return ref_str.strip()

def clean_driver(drv_str):
    if not drv_str:
        return ""
    drv_str = re.sub(r'^[•\s\-_–—]+', '', drv_str)
    drv_str = re.sub(r'[•\s\-_–—]+$', '', drv_str)
    return clean_ref(drv_str)

ocr_trips = parse_all_slices()
print(f"Sample 30 cleaned references:")
for t in ocr_trips[:30]:
    c_ref = clean_ref(t['ref'])
    c_drv = clean_driver(t['driver'])
    print(f"GR: {str(t['gr']):<12} | Ref: {c_ref:<40} | Drv: {c_drv:<35} | Date: {t['date']}")
