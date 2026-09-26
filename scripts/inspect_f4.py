from PIL import Image
import os

folder = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all data download'
files = sorted(os.listdir(folder))
f4_path = os.path.join(folder, files[4])

im = Image.open(f4_path)
print(f"File 4 size: {im.size}")

crop = im.crop((0, 0, im.width, min(2500, im.height)))
crop.save(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\file4_slice1.png')
print("Saved file4_slice1.png")
