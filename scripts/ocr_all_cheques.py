from PIL import Image
import os
import subprocess
import json

Image.MAX_IMAGE_PIXELS = None

folder = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all data download'
files = sorted([f for f in os.listdir(folder) if f.endswith('.png')])
out_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_ocr'
slices_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\cheques_slices'
os.makedirs(out_dir, exist_ok=True)
os.makedirs(slices_dir, exist_ok=True)

# 1. OCR Bounced 52 and 53 if not yet saved
for idx in [52, 53]:
    out_json = os.path.join(out_dir, f'bounced_{idx}.json')
    if not os.path.exists(out_json):
        p = os.path.join(folder, files[idx])
        cmd = ["powershell", "-ExecutionPolicy", "Bypass", "-File", "scripts/ocr_image.ps1", "-ImagePath", p, "-OutJsonPath", out_json]
        subprocess.run(cmd)
        print(f"OCR'd bounced {idx}")
    else:
        print(f"bounced_{idx}.json already exists")

# 2. Slice and OCR Cleared: 54, 55, 56
for idx in [54, 55, 56]:
    f = files[idx]
    p = os.path.join(folder, f)
    im = Image.open(p)
    width, height = im.size
    slice_height = 2500
    num_slices = (height + slice_height - 1) // slice_height
    print(f"File {idx}: {width}x{height} -> {num_slices} slices")
    
    for s_idx in range(num_slices):
        y_start = s_idx * slice_height
        y_end = min(y_start + slice_height, height)
        slice_img_path = os.path.join(slices_dir, f"cleared_{idx}_slice_{s_idx}.png")
        slice_json_path = os.path.join(out_dir, f"cleared_{idx}_slice_{s_idx}.json")
        
        if not os.path.exists(slice_json_path):
            slice_im = im.crop((0, y_start, width, y_end))
            slice_im.save(slice_img_path)
            cmd = ["powershell", "-ExecutionPolicy", "Bypass", "-File", "scripts/ocr_image.ps1", "-ImagePath", slice_img_path, "-OutJsonPath", slice_json_path]
            subprocess.run(cmd)
            print(f"  Processed cleared_{idx}_slice_{s_idx} (y={y_start}..{y_end})")
        else:
            print(f"  cleared_{idx}_slice_{s_idx}.json already exists")

print("All cheques sliced and OCR completed!")
