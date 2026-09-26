from PIL import Image
import os

folder = r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\all data download'
files = sorted(os.listdir(folder))
f0_path = os.path.join(folder, files[0])

im = Image.open(f0_path)
print(f"File 0 size: {im.size}")

# Crop first 2500 px
crop1 = im.crop((0, 0, im.width, min(2500, im.height)))
crop1.save(r'C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\file0_slice1.png')
print("Saved file0_slice1.png")
