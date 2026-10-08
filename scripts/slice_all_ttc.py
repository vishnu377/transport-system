import os
from PIL import Image

folder = r'C:\Users\HP\Downloads\TTC AND SMTC SCREENSHORTS'
files = {
    3: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-10.png',
    4: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-2.png',
    5: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-3.png',
    6: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-4.png',
    7: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-5.png',
    8: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-6.png',
    9: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-7.png',
    10: 'screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-07-15_11_13-9.png',
}

slice_h = 2400
overlap = 100
step = slice_h - overlap

for idx, fname in files.items():
    p = os.path.join(folder, fname)
    if not os.path.exists(p):
        print(f"Not found: {p}")
        continue
    out_dir = f'scripts/ttc_slices/img_{idx:02d}'
    os.makedirs(out_dir, exist_ok=True)
    im = Image.open(p)
    y = 0
    s_idx = 0
    while y < im.height:
        h = min(slice_h, im.height - y)
        crop = im.crop((0, y, im.width, y + h))
        crop_path = os.path.join(out_dir, f'slice_{s_idx:02d}_{y}_{y+h}.png')
        crop.save(crop_path)
        y += step
        s_idx += 1
    print(f"Image {idx} ({fname}): created {s_idx} slices in {out_dir}")

print("All slicing complete!")
