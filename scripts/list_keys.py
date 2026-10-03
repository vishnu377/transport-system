import glob
import re

keys = set()
for f in glob.glob('js/**/*.js', recursive=True):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    for m in re.finditer(r'localStorage\.[a-zA-Z]+\([\'"]([^\'"]+)[\'"]', c):
        keys.add(m.group(1))

print("=== All LocalStorage Keys ===")
for k in sorted(keys):
    print(k)
