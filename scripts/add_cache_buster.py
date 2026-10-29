with open('pages/owners.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('<script src="../js/sample-owner-dues-data.js"></script>', '<script src="../js/sample-owner-dues-data.js?v=20261029_lock"></script>')
c = c.replace('<script src="../js/db-service.js"></script>', '<script src="../js/db-service.js?v=20261029_lock"></script>')
c = c.replace('<script src="../js/modules/owners.js"></script>', '<script src="../js/modules/owners.js?v=20261029_lock"></script>')

with open('pages/owners.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated script tags with cache buster in pages/owners.html successfully')
