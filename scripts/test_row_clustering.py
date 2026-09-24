# -*- coding: utf-8 -*-
import json
import re

def parse_image_rows(json_path):
    with open(json_path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
        
    words = data.get('words', [])
    # Sort words by Y, then by X
    # Group words into lines by Y coordinate threshold
    words.sort(key=lambda w: (w['y'], w['x']))
    
    lines = []
    current_line = []
    current_y = None
    
    for w in words:
        # Ignore top navigation / headers (Y < 70)
        if w['y'] < 60:
            continue
            
        if current_y is None:
            current_y = w['y']
            current_line.append(w)
        elif abs(w['y'] - current_y) <= 12: # same row
            current_line.append(w)
            # Update running average Y
            current_y = sum(x['y'] for x in current_line) / len(current_line)
        else:
            # New line
            current_line.sort(key=lambda x: x['x'])
            lines.append(current_line)
            current_line = [w]
            current_y = w['y']
            
    if current_line:
        current_line.sort(key=lambda x: x['x'])
        lines.append(current_line)
        
    # Format each line as text with X positions
    formatted = []
    for l in lines:
        line_text = " ".join(w['text'] for w in l)
        avg_y = sum(w['y'] for w in l) / len(l)
        formatted.append((avg_y, line_text, l))
        
    return formatted

rows = parse_image_rows("scripts/ocr_ledger_all/WhatsApp_Image_2026-09-23_at_4_10_30_PM.json")
print(f"Total rows detected: {len(rows)}")
for y, text, words in rows[:35]:
    print(f"Y={y:4.0f} | {text}")

