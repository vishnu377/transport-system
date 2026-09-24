# -*- coding: utf-8 -*-
"""
Reconstruct all ledger debt records directly from the OCR bounding box JSONs.
Applies clean domain normalization for trucks, parties, amounts, and dates.
"""
import json
import re
import os

# Clean truck number helper
def clean_truck(t):
    if not t:
        return ""
    t = t.upper().replace(' ', '').replace('-', '').replace('_', '').replace('.', '')
    # Common OCR fixes
    t = t.replace('R3S', 'RJ5').replace('RJS', 'RJ5').replace('RO5', 'RJ5').replace('RAS', 'RJ5').replace('R05', 'RJ5')
    t = t.replace('J52', 'RJ52').replace('S2G', 'RJ52G').replace('A52', 'RJ52').replace('352', 'RJ52')
    t = t.replace('J14', 'RJ14').replace('314', 'RJ14')
    # If starts with 52G..., add RJ
    if t.startswith('52G') or t.startswith('52C'):
        t = 'RJ' + t
    # Fix letter O vs 0
    m = re.match(r'^(RJ\d\d[A-Z]{1,2})(\d{3,4})$', t)
    if m:
        return m.group(1) + m.group(2)
    return t

# Clean party/borrower name
def clean_borrower(b):
    if not b:
        return "Shree Mahaveer Transport Company"
    b_low = b.lower()
    if "mah" in b_low or "veer" in b_low or "shree" in b_low or "spo_" in b_low or "tran" in b_low:
        return "Shree Mahaveer Transport Company"
    if "laxmi" in b_low or "prakash" in b_low or "oat" in b_low or "jat" in b_low or "3 at" in b_low:
        return "Laxmi Prakash Jat"
    if "ramesh" in b_low or "war" in b_low or "prasad" in b_low or "sad" in b_low:
        return "Rameshwar Prasad"
    if "khandelwal" in b_low or "vishnu" in b_low:
        return "Vishnu Khandelwal"
    if "sampat" in b_low:
        return "Sampat Dhangid"
    if "rajasthan" in b_low:
        return "Rajasthan Marble"
    if "dataram" in b_low:
        return "Rameshwar Prasad"
    if "tejaram" in b_low:
        return "Laxmi Prakash Jat"
    return b.strip()

# Clean debt type
def clean_type(t):
    t_low = t.lower()
    if "comm" in t_low or "co" in t_low:
        return "Commission"
    if "oth" in t_low or "0th" in t_low:
        return "Other"
    if "load" in t_low or "lead" in t_low or "ing" in t_low:
        return "Loading"
    if "adv" in t_low:
        return "Advance"
    if "diesel" in t_low:
        return "Diesel"
    return "Commission"

def parse_amount(val_str):
    if not val_str:
        return 0.0
    val_str = val_str.replace('e', '').replace('t', '').replace('g', '').replace('$', '').replace('₹', '')
    val_str = val_str.replace('O', '0').replace('o', '0').replace('m', '0').replace('C', '0').replace('c', '0')
    val_str = re.sub(r'[^\d\.\-]', '', val_str)
    try:
        return float(val_str)
    except:
        return 0.0

print("Helper functions ready.")
