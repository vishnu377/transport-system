import os
from PIL import Image
import subprocess
import json
import re

Image.MAX_IMAGE_PIXELS = None

folder = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all data download'
files = sorted([f for f in os.listdir(folder) if f.endswith('.png')])

out_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr'
os.makedirs(out_dir, exist_ok=True)

# 1. OCR Bounced files: 51, 52, 53 directly
bounced_data = []
for idx in [51, 52, 53]:
    f = files[idx]
    p = os.path.join(folder, f)
    cmd = [
        "powershell",
        "-ExecutionPolicy", "Bypass",
        "-File", "scripts/ocr_image.ps1",
        "-ImagePath", p
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    out = proc.stdout.strip()
    if out.startswith('{'):
        d = json.loads(out)
        out_json_file = os.path.join(out_dir, f'bounced_{idx}.json')
        with open(out_json_file, 'w', encoding='utf-8') as jf:
            json.dump(d, jf, indent=2)
        print(f"Saved OCR for bounced file {idx}: {len(d.get('lines', []))} lines")

print("Done bounced OCR!")
