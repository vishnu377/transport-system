import re

def check_file(filename):
    text = open(filename, encoding='utf-8').read()
    matches = set(re.findall(r'"driver":\s*"([^"]+)"', text))
    print(f'File {filename}: {len(matches)} distinct drivers. Has "Assigned Driver"? {"Assigned Driver" in matches}')

check_file('js/sample-trips-data.js')
check_file('js/sample-truck-owners-data.js')
