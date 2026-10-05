import os
from PIL import Image

src_img = r"C:\Users\HP\Downloads\screencapture-appsheet-start-cf2764d3-c4ba-4814-b33b-d57bf6c1cbf2-2026-10-06-01_06_41.png"
out_dir = r"C:\Users\HP\Desktop\transport-system\assets\appsheet_icons"
os.makedirs(out_dir, exist_ok=True)

im = Image.open(src_img)

# Items with their center coordinates (approx icon width ~80x80)
# Column 1: x_center ~ 335
# Column 2: x_center ~ 1155
items = [
    # (name, x1, y1, x2, y2)
    ("bilty_booking", 290, 245, 375, 330),
    ("ledger", 290, 350, 375, 435),
    ("trips", 290, 505, 375, 590),
    ("cheques", 290, 610, 375, 695),
    ("to_be_created", 290, 710, 375, 795),
    ("parties", 290, 810, 375, 895),
    ("owners", 290, 915, 375, 1000),
    ("def_urea", 290, 1075, 375, 1160),
    ("shahpura", 290, 1175, 375, 1260),
    
    # Column 2
    ("pdf", 1110, 245, 1195, 330),
    ("brokers", 1110, 350, 1195, 435),
    ("drivers", 1110, 450, 1195, 535),
    ("partnership", 1110, 555, 1195, 640)
]

for name, x1, y1, x2, y2 in items:
    crop = im.crop((x1, y1, x2, y2))
    crop_path = os.path.join(out_dir, f"{name}.png")
    crop.save(crop_path)
    print(f"Saved icon: {name}.png ({crop.size})")

print("All AppSheet icons successfully extracted!")
