import os
from PIL import Image

output_dir = r"C:\Users\HP\Desktop\transport-system\scripts\broker_slices"
os.makedirs(output_dir, exist_ok=True)

files = [
    (r"C:\Users\HP\Downloads\screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-05-15_21_31.png", "img1"),
    (r"C:\Users\HP\Downloads\screencapture-appsheet-start-e89e7720-9941-4e5b-9d6e-492b8b82de3d-2026-10-05-15_21_31-2.png", "img2")
]

slice_height = 2000
overlap = 100  # small overlap to avoid splitting a row

slice_index = 0
metadata = []

for file_path, prefix in files:
    if not os.path.exists(file_path):
        print(f"Warning: {file_path} not found!")
        continue
    
    print(f"Processing {file_path}...")
    im = Image.open(file_path)
    w, h = im.size
    print(f"Dimensions: {w} x {h}")
    
    y = 0
    sub_idx = 0
    while y < h:
        current_h = min(slice_height, h - y)
        crop_box = (0, y, w, y + current_h)
        slice_crop = im.crop(crop_box)
        slice_filename = f"slice_{prefix}_{sub_idx:02d}.png"
        slice_path = os.path.join(output_dir, slice_filename)
        slice_crop.save(slice_path)
        
        metadata.append({
            "filename": slice_filename,
            "path": slice_path,
            "prefix": prefix,
            "sub_idx": sub_idx,
            "y_offset": y,
            "height": current_h,
            "width": w
        })
        print(f"  Saved {slice_filename}: y={y} to {y + current_h}")
        
        y += slice_height - overlap
        sub_idx += 1

print(f"Total slices created: {len(metadata)}")
