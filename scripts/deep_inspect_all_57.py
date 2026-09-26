import os
import subprocess
import json

header_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\headers'
headers = sorted([f for f in os.listdir(header_dir) if f.startswith('header_') and f.endswith('.png')])

print("Deep analyzing breadcrumbs and titles across all 57 files...")

all_info = []

for f in headers:
    img_path = os.path.join(header_dir, f)
    cmd = [
        "powershell",
        "-ExecutionPolicy", "Bypass",
        "-File", "scripts/ocr_image.ps1",
        "-ImagePath", img_path
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
        out = proc.stdout.strip()
        if out.startswith('{'):
            data = json.loads(out)
            words = data.get('words', [])
            
            # Extract words between y=70 and y=190 (the breadcrumbs & title line)
            title_words = [w['text'] for w in words if 60 <= w['y'] <= 210]
            title_str = " ".join(title_words)
            
            all_info.append({
                'file': f,
                'title': title_str,
                'sample_lines': data.get('lines', [])[:10]
            })
            print(f"{f}: {title_str[:60]}")
    except Exception as e:
        print(f"{f}: Error {e}")

with open(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all_57_titles.json', 'w', encoding='utf-8') as out_f:
    json.dump(all_info, out_f, indent=2, ensure_ascii=False)

print("\nDone analyzing titles!")
