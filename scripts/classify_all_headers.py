import os
import subprocess
import json

header_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\headers'
headers = sorted([f for f in os.listdir(header_dir) if f.startswith('header_') and f.endswith('.png')])

print(f"Running OCR classification on {len(headers)} image headers...")

results = {}

for f in headers:
    img_path = os.path.join(header_dir, f)
    cmd = [
        "powershell",
        "-ExecutionPolicy", "Bypass",
        "-File", "scripts/ocr_image.ps1",
        "-ImagePath", img_path
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        out = proc.stdout.strip()
        if out.startswith('{'):
            data = json.loads(out)
            lines = data.get('lines', [])
            full_text = " ".join(lines).lower()
            
            # Classification logic
            category = "Unknown"
            if "cheque" in full_text or "chq" in full_text:
                category = "Cheques"
            elif "owner" in full_text or "truck" in full_text:
                category = "Truck Owners"
            elif "trip" in full_text or "bilty" in full_text:
                category = "Trips"
            
            results[f] = {
                'category': category,
                'lines': lines[:8]
            }
            print(f"{f}: [{category}] -> {lines[:4]}")
        else:
            print(f"{f}: Failed to parse JSON")
    except Exception as e:
        print(f"{f}: Error: {e}")

out_json = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\header_classifications.json'
with open(out_json, 'w', encoding='utf-8') as jf:
    json.dump(results, jf, indent=2)

print(f"\nSaved classifications to {out_json}")
