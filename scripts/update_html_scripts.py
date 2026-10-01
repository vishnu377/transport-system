import glob
import re
import os

pages = sorted(glob.glob('pages/*.html')) + ['index.html']

for file_path in pages:
    with open(file_path, 'r', encoding='utf-8') as fp:
        content = fp.read()

    is_root = (file_path == 'index.html')
    prefix = './js/' if is_root else '../js/'

    # 1. Remove all existing sample-*.js script tags
    content = re.sub(r'[ \t]*<script src="[^"]*sample-[^"]*\.js[^"]*"></script>\r?\n?', '', content)

    # 2. Universal 6-script master data block
    master_block = (
        f'  <!-- Universal Master Data Assets (Guaranteed 100% Offline & Fresh Git Deploy Resilience) -->\n'
        f'  <script src="{prefix}sample-parties-data.js"></script>\n'
        f'  <script src="{prefix}sample-truck-owners-data.js"></script>\n'
        f'  <script src="{prefix}sample-drivers-data.js"></script>\n'
        f'  <script src="{prefix}sample-trips-data.js"></script>\n'
        f'  <script src="{prefix}sample-debts-data.js"></script>\n'
        f'  <script src="{prefix}sample-cheques-data.js"></script>\n'
    )

    # 3. Locate db-service.js tag and prepend master_block
    db_pattern = re.compile(r'([ \t]*<script src="[^"]*db-service\.js[^"]*"></script>)')
    match = db_pattern.search(content)

    if match:
        content = content[:match.start()] + master_block + content[match.start():]
        with open(file_path, 'w', encoding='utf-8') as fp:
            fp.write(content)
        print(f"SUCCESS: Updated {file_path}")
    else:
        print(f"WARNING: No db-service.js tag found in {file_path}")

print("\n--- Verification Scan ---")
for file_path in pages:
    with open(file_path, 'r', encoding='utf-8') as fp:
        c = fp.read()
    count = c.count('sample-')
    print(f"{file_path:30} has {count} sample scripts")
