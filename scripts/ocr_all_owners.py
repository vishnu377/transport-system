from PIL import Image
import os
import subprocess
import json

Image.MAX_IMAGE_PIXELS = None

folder = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all data download'
files = sorted([f for f in os.listdir(folder) if f.endswith('.png')])
out_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\owners_ocr'
slices_dir = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\owners_slices'
os.makedirs(out_dir, exist_ok=True)
os.makedirs(slices_dir, exist_ok=True)

# File 0: Truck Owners Master Directory
f0_path = os.path.join(folder, files[0])
im0 = Image.open(f0_path)
width, height = im0.size
slice_height = 2500
num_slices = (height + slice_height - 1) // slice_height
print(f"File 0: {width}x{height} -> {num_slices} slices")

for s_idx in range(num_slices):
    y_start = s_idx * slice_height
    y_end = min(y_start + slice_height, height)
    slice_img_path = os.path.join(slices_dir, f"file0_slice_{s_idx}.png")
    slice_json_path = os.path.join(out_dir, f"file0_slice_{s_idx}.json")
    
    if not os.path.exists(slice_json_path):
        slice_im = im0.crop((0, y_start, width, y_end))
        slice_im.save(slice_img_path)
        cmd = ["powershell", "-ExecutionPolicy", "Bypass", "-File", "scripts/ocr_image.ps1", "-ImagePath", slice_img_path, "-OutJsonPath", slice_json_path]
        subprocess.run(cmd)
        print(f"  Processed file0_slice_{s_idx} (y={y_start}..{y_end})")
    else:
        print(f"  file0_slice_{s_idx}.json already exists")

print("File 0 OCR complete!")
